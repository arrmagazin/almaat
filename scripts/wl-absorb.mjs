#!/usr/bin/env node
/**
 * wl-absorb — drain the YouTube "Watch Later" playlist into the docs.
 *
 * Per video, in order:
 *   1. fetch the auto-caption transcript
 *   2. write it to input/<slug>-<id>.md with a reference back to the video,
 *      then remove the video from Watch Later
 *   3. run `/absorb` on that file with the Claude Code CLI
 *   4. move the file to done/
 *
 * Usage:
 *   node scripts/wl-absorb.mjs                 # 1 video, removal armed
 *   node scripts/wl-absorb.mjs --count 3
 *   node scripts/wl-absorb.mjs --dry-run       # fetch + write only; no removal, no absorb, no move
 *   node scripts/wl-absorb.mjs --keep          # do everything except remove from Watch Later
 *   node scripts/wl-absorb.mjs --no-absorb     # fetch + write + remove; leave the file in input/
 *   node scripts/wl-absorb.mjs --lang nl       # caption language preference (default: any)
 *
 * Requires: a signed-in Chrome profile on this machine (cookies are read from it).
 * Watch Later is not reachable through the YouTube Data API — it was removed from the
 * API in 2016 — so listing and removal both go through the same private endpoints the
 * web player uses, authenticated with cookies exported from Chrome.
 */

import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { chmod, mkdir, readFile, rename, writeFile, access, readdir, rm } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, "scripts", ".cache");
const YTDLP = join(CACHE, "yt-dlp");
const COOKIES = join(CACHE, "cookies.txt");
const LEDGER = join(CACHE, "processed.json");
const INPUT = join(ROOT, "input");
const DONE = join(ROOT, "done");

const WL_URL = "https://www.youtube.com/playlist?list=WL";
const YTDLP_RELEASE = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos";
const CHUNK_SECONDS = 25; // transcript lines are merged into bullets of about this length

const ABSORB_TOOLS = ["Read", "Write", "Edit", "Glob", "Grep", "Bash(ls:*)", "Bash(git:*)", "Bash(rg:*)", "Bash(wc:*)"];

// ── args ──────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const opts = { count: 1, lang: "en", dryRun: false, keep: false, absorb: true, browser: "chrome" };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--count" || arg === "-n") opts.count = Number(argv[++i]);
    else if (arg === "--lang") opts.lang = argv[++i];
    else if (arg === "--browser") opts.browser = argv[++i];
    else if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--keep") opts.keep = true;
    else if (arg === "--no-absorb") opts.absorb = false;
    else if (arg === "--help" || arg === "-h") opts.help = true;
    else throw new Error(`unknown argument: ${arg}`);
  }
  if (!Number.isInteger(opts.count) || opts.count < 1) throw new Error("--count must be a positive integer");
  if (opts.dryRun) {
    opts.keep = true;
    opts.absorb = false;
  }
  return opts;
}

// ── small helpers ─────────────────────────────────────────────────────────────

const log = (...parts) => console.log(...parts);

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

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
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

async function readLedger() {
  try {
    return new Set(JSON.parse(await readFile(LEDGER, "utf8")));
  } catch {
    return new Set();
  }
}

async function writeLedger(ids) {
  await writeFile(LEDGER, `${JSON.stringify([...ids], null, 2)}\n`);
}

// ── yt-dlp ────────────────────────────────────────────────────────────────────

export async function ensureYtdlp() {
  if (await exists(YTDLP)) return YTDLP;
  log("· yt-dlp not cached — downloading the standalone macOS build");
  const res = await fetch(YTDLP_RELEASE, { redirect: "follow" });
  if (!res.ok) throw new Error(`yt-dlp download failed: HTTP ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(YTDLP));
  await chmod(YTDLP, 0o755);
  return YTDLP;
}

/**
 * Export the Chrome cookie jar once per run. yt-dlp handles the macOS Keychain
 * decryption; the first call in a session may raise a Keychain prompt.
 * The resulting file holds a live Google session — it is chmod 600 and gitignored.
 */
async function ensureCookies(browser) {
  log(`· exporting ${browser} cookies`);
  await run(YTDLP, [
    "--cookies-from-browser",
    browser,
    "--cookies",
    COOKIES,
    "--skip-download",
    "--no-warnings",
    "--playlist-items",
    "0",
    WL_URL,
  ]);
  await chmod(COOKIES, 0o600);
  if (!(await exists(COOKIES))) throw new Error("cookie export produced no file");
}

async function listWatchLater(count) {
  const { stdout } = await run(YTDLP, [
    "--cookies",
    COOKIES,
    "--flat-playlist",
    "--dump-single-json",
    "--no-warnings",
    "--playlist-end",
    String(count),
    WL_URL,
  ]);
  const playlist = JSON.parse(stdout);
  return (playlist.entries ?? [])
    .filter((entry) => entry?.id)
    .map((entry) => ({
      id: entry.id,
      title: entry.title ?? entry.id,
      channel: entry.channel ?? entry.uploader ?? "",
      duration: entry.duration ?? null,
    }));
}

/**
 * Choose one caption track. A popular video carries 150+ auto-translated languages,
 * so this picks a single track rather than letting yt-dlp download the set.
 *
 * An "-orig" track is the caption in the language actually spoken; every other
 * auto-caption is a machine re-translation of it, so "-orig" always wins.
 */
export function pickCaptionTrack({ manual = [], auto = [], langPref = "", videoLanguage = "" }) {
  const wanted = [];
  if (langPref) wanted.push(`${langPref}-orig`, langPref);
  if (videoLanguage) wanted.push(`${videoLanguage}-orig`, videoLanguage);

  // With an "-orig" track present, every other auto track but the spoken language is a
  // translation — and YouTube answers those with HTTP 429 — so none of them may match.
  const origAuto = auto.find((l) => l.endsWith("-orig"));
  const spoken = origAuto ? [origAuto, origAuto.slice(0, -"-orig".length)] : auto;

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

/** Download one caption track as json3. Returns { lang, kind, path } or null when none exist. */
async function fetchCaptions(videoId, langPref) {
  const dir = join(CACHE, "subs");
  await mkdir(dir, { recursive: true });
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  const { stdout } = await runVideo(YTDLP, ["-J", "--skip-download", "--no-warnings", url]);
  const info = JSON.parse(stdout);
  const track = pickCaptionTrack({
    manual: Object.keys(info.subtitles ?? {}),
    auto: Object.keys(info.automatic_captions ?? {}),
    langPref,
    videoLanguage: info.language ?? "",
  });
  if (!track) return null;

  await runVideo(YTDLP, [
    "--skip-download",
    "--write-auto-subs",
    "--write-subs",
    "--sub-langs",
    track.lang,
    "--sub-format",
    "json3",
    "--no-warnings",
    "-o",
    join(dir, "%(id)s.%(ext)s"),
    url,
  ]);

  const file = (await readdir(dir)).find((f) => f === `${videoId}.${track.lang}.json3`);
  return file ? { ...track, path: join(dir, file) } : null;
}

// ── transcript formatting ─────────────────────────────────────────────────────

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
  const url = `https://www.youtube.com/watch?v=${video.id}`;
  const meta = [video.channel, video.duration ? timestamp(video.duration) : null, `captions: ${lang}`]
    .filter(Boolean)
    .join(" · ");

  const body = chunks.map((c) => `- [${timestamp(c.start)}](${url}&t=${c.start}s) ${c.text}`).join("\n");
  return `# ${video.title}\n\n${url}\n\n> ${meta}\n\n${body}\n`;
}

export function slugify(title) {
  // NFC, not NFKD: decomposing would split "й" into "и" + a combining mark that the
  // character class then drops, quietly corrupting Cyrillic and other marked scripts.
  return (
    title
      .normalize("NFC")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60)
      .replace(/-+$/, "") || "transcript"
  );
}

// ── Watch Later removal ───────────────────────────────────────────────────────

/** Netscape cookies.txt → { name: value } for youtube.com. */
async function readCookieJar() {
  const jar = {};
  for (const line of (await readFile(COOKIES, "utf8")).split("\n")) {
    if (!line || line.startsWith("#")) continue;
    const [domain, , , , , name, value] = line.split("\t");
    if (domain?.includes("youtube.com") && name) jar[name] = value ?? "";
  }
  return jar;
}

/**
 * YouTube signs its own API calls with SAPISIDHASH: sha1("<ts> <SAPISID> <origin>").
 * Reproducing it is what lets a plain fetch act as the signed-in web client.
 */
function sapisidHash(sapisid, origin) {
  const ts = Math.floor(Date.now() / 1000);
  const hash = createHash("sha1").update(`${ts} ${sapisid} ${origin}`).digest("hex");
  return `SAPISIDHASH ${ts}_${hash}`;
}

async function removeFromWatchLater(videoId, jar) {
  const sapisid = jar.SAPISID ?? jar["__Secure-3PAPISID"] ?? jar["__Secure-1PAPISID"];
  if (!sapisid) throw new Error("no SAPISID cookie — is this Chrome profile signed in to YouTube?");

  const origin = "https://www.youtube.com";
  const cookieHeader = Object.entries(jar)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");

  const res = await fetch(`${origin}/youtubei/v1/browse/edit_playlist?prettyPrint=false`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sapisidHash(sapisid, origin),
      Origin: origin,
      Referer: WL_URL,
      "X-Origin": origin,
      "X-Goog-AuthUser": "0",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({
      context: { client: { clientName: "WEB", clientVersion: "2.20250101.00.00", hl: "en", gl: "US" } },
      playlistId: "WL",
      actions: [{ action: "ACTION_REMOVE_VIDEO_BY_VIDEO_ID", removedVideoId: videoId }],
    }),
  });

  if (!res.ok) throw new Error(`edit_playlist HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const body = await res.json();
  if (body.status !== "STATUS_SUCCEEDED") throw new Error(`edit_playlist returned ${body.status ?? "no status"}`);
}

// ── absorb ────────────────────────────────────────────────────────────────────

async function runAbsorb(relativePath) {
  log(`  → claude -p "/absorb ${relativePath}"`);
  await run("claude", ["-p", `/absorb ${relativePath}`, "--permission-mode", "acceptEdits", "--allowed-tools", ...ABSORB_TOOLS], {
    capture: false,
  });
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    const source = await readFile(fileURLToPath(import.meta.url), "utf8");
    log(source.slice(source.indexOf("/**"), source.indexOf("*/")).replace(/^\s*\/?\*+ ?/gm, ""));
    return;
  }

  await mkdir(CACHE, { recursive: true });
  await mkdir(INPUT, { recursive: true });
  await mkdir(DONE, { recursive: true });

  await ensureYtdlp();
  await ensureCookies(opts.browser);

  const ledger = await readLedger();
  const videos = (await listWatchLater(opts.count + ledger.size)).filter((v) => !ledger.has(v.id)).slice(0, opts.count);

  if (videos.length === 0) {
    log("Watch Later is empty (or everything up front is already processed).");
    return;
  }
  log(`· ${videos.length} video(s) to process${opts.dryRun ? " [dry run]" : ""}\n`);

  const jar = opts.keep ? null : await readCookieJar();
  let failures = 0;

  for (const video of videos) {
    log(`▸ ${video.title}\n  https://www.youtube.com/watch?v=${video.id}`);
    try {
      // 1. transcript
      const captions = await fetchCaptions(video.id, opts.lang);
      if (!captions) {
        log("  ! no captions available — leaving it in Watch Later\n");
        failures++;
        continue;
      }
      const chunks = parseJson3(await readFile(captions.path, "utf8"));
      if (chunks.length === 0) {
        log("  ! caption track is empty — leaving it in Watch Later\n");
        failures++;
        continue;
      }

      // 2. store, then drop it from the playlist
      const name = `${slugify(video.title)}-${video.id}.md`;
      await writeFile(join(INPUT, name), renderTranscript(video, captions.lang, chunks));
      await rm(captions.path, { force: true });
      log(`  ✓ input/${name} (${chunks.length} lines, ${captions.lang} ${captions.kind})`);

      if (opts.keep) {
        // Deliberately not recorded: a --dry-run must stay repeatable, and recording
        // here would make the next real run skip a video still sitting in Watch Later.
        log("  · skipping Watch Later removal (--keep/--dry-run)");
      } else {
        await removeFromWatchLater(video.id, jar);
        ledger.add(video.id);
        await writeLedger(ledger);
        log("  ✓ removed from Watch Later");
      }

      // 3. absorb, 4. archive
      if (opts.absorb) {
        await runAbsorb(`input/${name}`);
        // /absorb may archive the file itself; move it only if it is still in input/.
        if (await exists(join(INPUT, name))) await rename(join(INPUT, name), join(DONE, name));
        log(`  ✓ done/${name}\n`);
      } else {
        log("  · skipping absorb (--no-absorb/--dry-run)\n");
      }
    } catch (err) {
      failures++;
      log(`  ✗ ${err.message}\n`);
    }
  }

  if (failures > 0) {
    log(`Finished with ${failures} failure(s).`);
    process.exitCode = 1;
  }
}

// Run only when invoked directly, so the pure helpers above stay importable for tests.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(`wl-absorb: ${err.message}`);
    process.exit(1);
  });
}
