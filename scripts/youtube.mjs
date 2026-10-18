/**
 * youtube — the parts the YouTube pipeline scripts share.
 *
 *   - the youtube.json watch list (`readList`, `writeList`, `extractVideoId`)
 *   - the cached standalone yt-dlp and how to run it (`ensureYtdlp`, `run`, `runVideo`)
 *   - caption track choice and transcript rendering (`pickCaptionTrack`, `parseJson3`, `renderTranscript`)
 *
 * Used by wl-absorb.mjs (Watch Later → list) and yt-fetch.mjs (list → transcripts).
 *
 * youtube.json is an array of entries, worked through in order:
 *   { "title": "…", "url": "https://www.youtube.com/watch?v=…", "status": "todo" }
 * `status` is "todo", "fetched" (transcript written), "skipped" (no captions, not YouTube) or
 * "unavailable" (removed, blocked or private); the last two are never retried, `note` says why.
 * `title` is optional, so a hand-added entry needs only `url` and `status`.
 */

import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { access, chmod, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const CACHE = join(ROOT, "scripts", ".cache");
export const COOKIES = join(CACHE, "cookies.txt");
export const LIST = join(ROOT, "youtube.json");

const YTDLP = join(CACHE, "yt-dlp");
const YTDLP_RELEASE = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos";
const CHUNK_SECONDS = 25; // transcript lines are merged into bullets of about this length
const VIDEO_ID = /^[\w-]{11}$/;

// ── watch list ────────────────────────────────────────────────────────────────

export const watchUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

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

/** The watch list; empty when youtube.json does not exist yet. */
export async function readList() {
  return (await exists(LIST)) ? JSON.parse(await readFile(LIST, "utf8")) : [];
}

export async function writeList(entries) {
  await writeFile(LIST, `${JSON.stringify(entries, null, 2)}\n`);
}

// ── yt-dlp ────────────────────────────────────────────────────────────────────

export function run(cmd, args, { cwd = ROOT, capture = true } = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit" });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (d) => {
      stdout += d;
    });
    child.stderr?.on("data", (d) => {
      stderr += d;
    });
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0
        ? resolvePromise({ stdout, stderr })
        : reject(Object.assign(new Error(`${cmd} exited ${code}\n${stderr.trim() || stdout.trim()}`), { code })),
    );
  });
}

export async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function ensureYtdlp() {
  if (await exists(YTDLP)) return YTDLP;
  console.log("· yt-dlp not cached — downloading the standalone macOS build");
  const res = await fetch(YTDLP_RELEASE, { redirect: "follow" });
  if (!res.ok) throw new Error(`yt-dlp download failed: HTTP ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(YTDLP));
  await chmod(YTDLP, 0o755);
  return YTDLP;
}

/**
 * Run yt-dlp against one video. Public videos need no auth — only the playlist calls do —
 * and a signed-in cookie jar can make YouTube answer "The page needs to be reloaded".
 * So try anonymously first and retry with the cookies (age- or member-gated videos) on failure.
 */
export async function runVideo(ytdlp, args) {
  try {
    return await run(ytdlp, args);
  } catch (err) {
    if (!(await exists(COOKIES))) throw err;
    return run(ytdlp, ["--cookies", COOKIES, ...args]);
  }
}

// ── captions ──────────────────────────────────────────────────────────────────

/**
 * Choose one caption track. A popular video carries 150+ auto-translated languages,
 * so this picks a single track rather than letting yt-dlp download the set.
 *
 * An "-orig" track is the caption in a language actually spoken; every other
 * auto-caption is a machine re-translation of it, so "-orig" always wins.
 * A video with dubbed audio carries one "-orig" track per audio language.
 */
export function pickCaptionTrack({ manual = [], auto = [], langPref = "", videoLanguage = "" }) {
  const wanted = [];
  if (langPref) wanted.push(`${langPref}-orig`, langPref);
  for (const lang of new Set([videoLanguage, videoLanguage.split("-")[0]])) {
    if (lang) wanted.push(`${lang}-orig`, lang);
  }

  // With "-orig" tracks present, every other auto track but the spoken languages is a
  // translation — and YouTube answers those with HTTP 429 — so none of them may match.
  const origAuto = auto.filter((l) => l.endsWith("-orig"));
  const spoken = origAuto.length > 0 ? origAuto.flatMap((l) => [l, l.slice(0, -"-orig".length)]) : auto;

  for (const lang of wanted) {
    if (manual.includes(lang)) return { lang, kind: "manual" };
    if (spoken.includes(lang)) return { lang, kind: "auto" };
  }
  // Nothing preferred matched — fall back to whatever original-audio track exists.
  const orig = manual.find((l) => l.endsWith("-orig")) ?? auto.find((l) => l.endsWith("-orig"));
  if (orig) return { lang: orig, kind: manual.includes(orig) ? "manual" : "auto" };
  if (manual.length > 0) return { lang: manual[0], kind: "manual" };
  if (auto.includes("en")) return { lang: "en", kind: "auto" };
  return auto.length > 0 ? { lang: auto[0], kind: "auto" } : null;
}

/** json3 → [{ start (seconds), text }], merged into ~CHUNK_SECONDS bullets. */
export function parseJson3(raw) {
  const events = JSON.parse(raw).events ?? [];
  const lines = [];
  for (const event of events) {
    const text = (event.segs ?? [])
      .map((seg) => seg.utf8 ?? "")
      .join("")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue; // pure-newline padding events
    lines.push({ start: Math.floor((event.tStartMs ?? 0) / 1000), text });
  }

  const chunks = [];
  for (const line of lines) {
    const last = chunks.at(-1);
    if (last && line.start - last.start < CHUNK_SECONDS) last.text += ` ${line.text}`;
    else chunks.push({ start: line.start, text: line.text });
  }
  return chunks;
}

export function timestamp(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function renderTranscript(video, lang, chunks) {
  const url = watchUrl(video.id);
  const meta = [video.channel, video.duration ? timestamp(video.duration) : null, `captions: ${lang}`]
    .filter(Boolean)
    .join(" · ");

  const body = chunks.map((c) => `- [${timestamp(c.start)}](${url}&t=${c.start}s) ${c.text}`).join("\n");
  return `# ${video.title}\n\n${url}\n\n> ${meta}\n\n${body}\n`;
}
