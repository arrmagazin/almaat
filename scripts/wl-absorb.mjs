#!/usr/bin/env node
/**
 * wl-absorb — sync YouTube "Watch Later" with the youtube.json watch list.
 *
 *   1. remove from Watch Later each video whose entry is processed — any status
 *      but "todo": "fetched", "skipped" or "unavailable"
 *   2. append each video not yet listed (under any status) as a "todo" entry,
 *      in playlist order
 *
 * From there the list pipeline takes over: `node scripts/yt-fetch.mjs`, then `/yt-absorb`.
 *
 * Usage:
 *   node scripts/wl-absorb.mjs                   # cookies from Chrome
 *   node scripts/wl-absorb.mjs --browser firefox
 *
 * Requires: a signed-in browser profile on this machine (cookies are read from it).
 * Watch Later is not reachable through the YouTube Data API — it was removed from the
 * API in 2016 — so listing and removal both go through the same private endpoints the
 * web player uses, authenticated with the browser's cookies.
 */

import { createHash } from "node:crypto";
import { chmod, mkdir, readFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  CACHE,
  COOKIES,
  ensureYtdlp,
  exists,
  extractVideoId,
  readList,
  run,
  watchUrl,
  writeList,
} from "./youtube.mjs";

const WL_URL = "https://www.youtube.com/playlist?list=WL";

// ── args ──────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const opts = { browser: "chrome" };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--browser") opts.browser = argv[++i];
    else if (arg === "--help" || arg === "-h") opts.help = true;
    else throw new Error(`unknown argument: ${arg}`);
  }
  return opts;
}

// ── pure helpers (unit-tested in wl-absorb.test.mjs) ──────────────────────────

/** The videos whose entry yt-fetch has processed: any status but "todo". */
export function processedVideos(entries, videos) {
  const processed = new Set(entries.filter((e) => e.status !== "todo").map((e) => extractVideoId(e.url)));
  return videos.filter((v) => processed.has(v.id));
}

/** Append a "todo" entry per video whose id the list does not hold yet. */
export function appendNewVideos(entries, videos) {
  const listed = new Set(entries.map((e) => extractVideoId(e.url)));
  const added = videos.filter((v) => !listed.has(v.id));
  const todo = added.map((v) => ({ title: v.title, url: watchUrl(v.id), status: "todo" }));
  return { entries: [...entries, ...todo], added };
}

// ── Watch Later ───────────────────────────────────────────────────────────────

/**
 * List the whole playlist, exporting the browser's cookie jar on the way. yt-dlp handles
 * the macOS Keychain decryption; the first call in a session may raise a Keychain prompt.
 * The jar is kept for yt-fetch, which retries gated videos with it; it holds a live
 * Google session, so it is chmod 600 and gitignored.
 *
 * The old jar is deleted first: `--cookies` loads an existing file into the jar before
 * the browser's cookies, and Google's rotated session cookies from a past run then
 * make YouTube treat the request as signed out ("The playlist does not exist").
 */
async function listWatchLater(ytdlp, browser) {
  await rm(COOKIES, { force: true });
  const { stdout } = await run(ytdlp, [
    "--cookies-from-browser",
    browser,
    "--cookies",
    COOKIES,
    "--flat-playlist",
    "--dump-single-json",
    "--no-warnings",
    WL_URL,
  ]);
  if (await exists(COOKIES)) await chmod(COOKIES, 0o600);

  return (JSON.parse(stdout).entries ?? [])
    .filter((entry) => entry?.id)
    .map((entry) => ({ id: entry.id, title: entry.title ?? entry.id }));
}

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

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    const source = await readFile(fileURLToPath(import.meta.url), "utf8");
    console.log(source.slice(source.indexOf("/**"), source.indexOf("*/")).replace(/^\s*\/?\*+ ?/gm, ""));
    return;
  }

  await mkdir(CACHE, { recursive: true });
  console.log(`· listing Watch Later with ${opts.browser} cookies`);
  const videos = await listWatchLater(await ensureYtdlp(), opts.browser);

  const processed = processedVideos(await readList(), videos);
  if (processed.length > 0) {
    const jar = await readCookieJar();
    let removed = 0;
    for (const video of processed) {
      try {
        await removeFromWatchLater(video.id, jar);
        removed++;
        console.log(`  - ${video.title}`);
      } catch (err) {
        process.exitCode = 1;
        console.log(`  ✗ ${video.title}: ${err.message}`);
      }
    }
    console.log(`✓ ${removed} of ${processed.length} processed video(s) removed from Watch Later`);
  }

  // Re-read: the removals above take a while, and yt-fetch may have written meanwhile.
  const { entries, added } = appendNewVideos(await readList(), videos);
  if (added.length > 0) {
    await writeList(entries);
    for (const video of added) console.log(`  + ${video.title}`);
  }
  console.log(`✓ ${added.length} of ${videos.length} Watch Later video(s) added to youtube.json`);
}

// Run only when invoked directly, so the pure helpers above stay importable for tests.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(`wl-absorb: ${err.message}`);
    process.exit(1);
  });
}
