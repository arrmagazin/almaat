#!/usr/bin/env node
/**
 * yt-fetch — turn the "todo" entries of youtube.json into transcript files.
 *
 * Per "todo" entry, in list order:
 *   1. fetch the caption transcript
 *   2. write it to input/yt-<id>.md
 *   3. set the entry's status to "fetched"
 *
 * A video with no usable captions (or a non-YouTube URL) is set to "skipped", and one YouTube
 * reports as unavailable (removed, blocked, private) to "unavailable", each with a `note`,
 * so a recurring run never retries it. Other errors leave the entry "todo" for retry.
 * The companion worker is /yt-absorb: it absorbs input/yt-*.md into docs/ and archives to done/.
 *
 * Usage:
 *   node scripts/yt-fetch.mjs                # all "todo" entries
 *   node scripts/yt-fetch.mjs --count 2      # at most 2 videos this run
 *   node scripts/yt-fetch.mjs --lang nl      # caption language preference (default: en)
 */

import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  CACHE,
  ensureYtdlp,
  extractVideoId,
  parseJson3,
  pickCaptionTrack,
  ROOT,
  readList,
  renderTranscript,
  runVideo,
  watchUrl,
  writeList,
} from "./youtube.mjs";

const SUBS = join(CACHE, "subs");

// ── args ──────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const opts = { lang: "en", count: Infinity };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--lang") opts.lang = argv[++i] ?? "";
    else if (arg === "--count" || arg === "-n") opts.count = Number(argv[++i]);
    else if (arg === "--help" || arg === "-h") opts.help = true;
    else throw new Error(`unknown argument: ${arg}`);
  }
  if (opts.count !== Infinity && (!Number.isInteger(opts.count) || opts.count < 1))
    throw new Error("--count must be a positive integer");
  return opts;
}

// ── pure helpers (unit-tested in yt-fetch.test.mjs) ───────────────────────────

/** "todo" entries → [{ url, id }]; id is null for non-YouTube URLs. */
export function pendingEntries(entries) {
  return entries.filter((e) => e.status === "todo").map((e) => ({ url: e.url, id: extractVideoId(e.url) }));
}

/** yt-dlp's reason for a video that cannot be watched (removed, blocked, private), else null. */
export function unavailableReason(message) {
  return message.match(/(?:Video unavailable|This video is unavailable|Private video)[^\n]*/)?.[0].trim() ?? null;
}

/** Set the status (and a note) of the "todo" entry with `url`; null when none matches. */
export function setStatus(entries, url, status, note = "") {
  const index = entries.findIndex((e) => e.status === "todo" && e.url === url);
  if (index === -1) return null;
  const updated = [...entries];
  updated[index] = { ...entries[index], status, ...(note ? { note } : {}) };
  return updated;
}

// ── fetch ─────────────────────────────────────────────────────────────────────

/**
 * One video → rendered transcript markdown, or null when no usable captions exist.
 * Reads the video metadata (title/channel/duration) itself: a checklist line may carry no title.
 */
async function fetchTranscript(ytdlp, videoId, langPref) {
  const url = watchUrl(videoId);

  const { stdout } = await runVideo(ytdlp, ["-J", "--skip-download", "--no-warnings", url]);
  const info = JSON.parse(stdout);
  const track = pickCaptionTrack({
    manual: Object.keys(info.subtitles ?? {}),
    auto: Object.keys(info.automatic_captions ?? {}),
    langPref,
    videoLanguage: info.language ?? "",
  });
  if (!track) return null;

  await runVideo(ytdlp, [
    "--skip-download",
    "--write-auto-subs",
    "--write-subs",
    "--sub-langs",
    track.lang,
    "--sub-format",
    "json3",
    "--no-warnings",
    "-o",
    join(SUBS, "%(id)s.%(ext)s"),
    url,
  ]);

  const file = (await readdir(SUBS)).find((f) => f === `${videoId}.${track.lang}.json3`);
  if (!file) return null;
  const chunks = parseJson3(await readFile(join(SUBS, file), "utf8"));
  await rm(join(SUBS, file), { force: true });
  if (chunks.length === 0) return null;

  const video = {
    id: videoId,
    title: info.title ?? videoId,
    channel: info.channel ?? info.uploader ?? "",
    duration: info.duration ?? null,
  };
  return { lang: track.lang, kind: track.kind, chunks, markdown: renderTranscript(video, track.lang, chunks) };
}

/** Re-read the list before every update, so edits made mid-run are never clobbered. */
async function mark(url, status, note = "") {
  const updated = setStatus(await readList(), url, status, note);
  if (updated === null) throw new Error(`"todo" entry for ${url} disappeared from youtube.json`);
  await writeList(updated);
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    const source = await readFile(fileURLToPath(import.meta.url), "utf8");
    console.log(source.slice(source.indexOf("/**"), source.indexOf("*/")).replace(/^\s*\/?\*+ ?/gm, ""));
    return;
  }

  const todos = pendingEntries(await readList()).slice(0, opts.count);
  if (todos.length === 0) {
    console.log("youtube.json has no \"todo\" entries.");
    return;
  }

  await mkdir(SUBS, { recursive: true });
  const ytdlp = await ensureYtdlp();
  let failures = 0;

  for (const todo of todos) {
    console.log(`▸ ${todo.url}`);
    if (!todo.id) {
      await mark(todo.url, "skipped", "not a YouTube video URL");
      console.log("  · not a YouTube video URL — skipped\n");
      continue;
    }
    try {
      const transcript = await fetchTranscript(ytdlp, todo.id, opts.lang);
      if (!transcript) {
        await mark(todo.url, "skipped", "no captions");
        console.log("  · no captions — skipped\n");
        continue;
      }
      await writeFile(join(ROOT, "input", `yt-${todo.id}.md`), transcript.markdown);
      await mark(todo.url, "fetched");
      console.log(`  ✓ input/yt-${todo.id}.md (${transcript.chunks.length} lines, ${transcript.lang} ${transcript.kind})\n`);
    } catch (err) {
      const reason = unavailableReason(err.message);
      if (reason) {
        await mark(todo.url, "unavailable", reason);
        console.log(`  · ${reason} — unavailable\n`);
        continue;
      }
      failures++;
      console.log(`  ✗ ${err.message} — left "todo" for retry\n`);
    }
  }

  if (failures > 0) {
    console.log(`Finished with ${failures} failure(s).`);
    process.exitCode = 1;
  }
}

// Run only when invoked directly, so the pure helpers above stay importable for tests.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(`yt-fetch: ${err.message}`);
    process.exit(1);
  });
}
