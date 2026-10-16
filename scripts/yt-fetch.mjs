#!/usr/bin/env node
/**
 * yt-fetch — turn the input/youtube.md checklist into transcript files.
 *
 * Scans input/youtube.md for unchecked items (`- [ ] <url>`); per video:
 *   1. fetch the caption transcript (same yt-dlp machinery as wl-absorb.mjs)
 *   2. write it to input/yt-<id>.md
 *   3. mark the checklist line `- [x]`
 *
 * A video with no usable captions (or a non-YouTube URL) is marked `- [-]` with a note,
 * so a recurring run never retries it. Transient errors leave the line unchecked for retry.
 * The companion worker is /yt-absorb: it absorbs input/yt-*.md into docs/ and archives to done/.
 *
 * Usage:
 *   node scripts/yt-fetch.mjs                # all unchecked items
 *   node scripts/yt-fetch.mjs --count 2      # at most 2 videos this run
 *   node scripts/yt-fetch.mjs --lang nl      # caption language preference (default: en)
 */

import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { ensureYtdlp, parseJson3, pickCaptionTrack, renderTranscript, runVideo } from "./wl-absorb.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SUBS = join(ROOT, "scripts", ".cache", "subs");
const LIST = join(ROOT, "input", "youtube.md");

const VIDEO_ID = /^[\w-]{11}$/;

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

/** Video id from watch/youtu.be/shorts/live/embed URLs, else null. */
export function extractVideoId(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (!/(^|\.)(youtube\.com|youtu\.be)$/.test(parsed.hostname)) return null;
  const candidate = parsed.hostname.endsWith("youtu.be")
    ? parsed.pathname.slice(1)
    : (parsed.searchParams.get("v") ?? parsed.pathname.match(/^\/(?:shorts|live|embed)\/([\w-]+)/)?.[1] ?? "");
  return VIDEO_ID.test(candidate) ? candidate : null;
}

/** Unchecked checklist items → [{ index, url, id }]; id is null for non-YouTube URLs. */
export function scanChecklist(text) {
  const todos = [];
  text.split("\n").forEach((line, index) => {
    const match = line.match(/^\s*[-*]\s+\[ \]\s+(.*)$/);
    if (!match) return;
    const url = match[1].trim().replace(/^<|>$/g, "");
    todos.push({ index, url, id: extractVideoId(url) });
  });
  return todos;
}

/** Flip the first unchecked line containing `url` to `[mark]`; null when none matches. */
export function markByUrl(text, url, mark, note = "") {
  const lines = text.split("\n");
  const index = lines.findIndex((line) => /^\s*[-*]\s+\[ \]\s/.test(line) && line.includes(url));
  if (index === -1) return null;
  lines[index] = lines[index].replace("[ ]", `[${mark}]`) + (note ? ` — ${note}` : "");
  return lines.join("\n");
}

// ── fetch ─────────────────────────────────────────────────────────────────────

/**
 * One video → rendered transcript markdown, or null when no usable captions exist.
 * Re-reads video metadata itself (title/channel/duration) because wl-absorb gets
 * those from the playlist listing, which has no equivalent here.
 */
async function fetchTranscript(ytdlp, videoId, langPref) {
  const url = `https://www.youtube.com/watch?v=${videoId}`;

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

/** Re-read the checklist before every mark, so edits made mid-run are never clobbered. */
async function mark(url, markChar, note = "") {
  const updated = markByUrl(await readFile(LIST, "utf8"), url, markChar, note);
  if (updated === null) throw new Error(`checklist line for ${url} disappeared from input/youtube.md`);
  await writeFile(LIST, updated);
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    const source = await readFile(fileURLToPath(import.meta.url), "utf8");
    console.log(source.slice(source.indexOf("/**"), source.indexOf("*/")).replace(/^\s*\/?\*+ ?/gm, ""));
    return;
  }

  const todos = scanChecklist(await readFile(LIST, "utf8")).slice(0, opts.count);
  if (todos.length === 0) {
    console.log("input/youtube.md has no unchecked items.");
    return;
  }

  await mkdir(SUBS, { recursive: true });
  const ytdlp = await ensureYtdlp();
  let failures = 0;

  for (const todo of todos) {
    console.log(`▸ ${todo.url}`);
    if (!todo.id) {
      await mark(todo.url, "-", "not a YouTube video URL");
      console.log("  · not a YouTube video URL — marked [-]\n");
      continue;
    }
    try {
      const transcript = await fetchTranscript(ytdlp, todo.id, opts.lang);
      if (!transcript) {
        await mark(todo.url, "-", "no captions");
        console.log("  · no captions — marked [-]\n");
        continue;
      }
      await writeFile(join(ROOT, "input", `yt-${todo.id}.md`), transcript.markdown);
      await mark(todo.url, "x");
      console.log(`  ✓ input/yt-${todo.id}.md (${transcript.chunks.length} lines, ${transcript.lang} ${transcript.kind})\n`);
    } catch (err) {
      failures++;
      console.log(`  ✗ ${err.message} — left unchecked for retry\n`);
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
