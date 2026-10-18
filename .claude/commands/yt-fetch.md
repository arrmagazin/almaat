---
description: Fetch transcripts for the "todo" entries of youtube.json → input/yt-<id>.md, mark each fetched
argument-hint: "[extra flags for scripts/yt-fetch.mjs, e.g. --lang nl --count 2]"
allowed-tools: Bash(node:*), Read
---

# yt-fetch

Worker 1 of the YouTube pipeline (worker 2 is `/yt-absorb`). All logic lives in the script;
do not edit `youtube.json` or write transcript files yourself.

## Procedure

1. Run `node scripts/yt-fetch.mjs $ARGUMENTS` and relay its output.
2. Report one line per video: written (`input/yt-<id>-<title>.md`), skipped (`"skipped"`, no captions), unavailable (`"unavailable"`), or failed.
   No "todo" entries → report "idle" and stop.

## Semantics (handled by the script)

- Success → `"status": "fetched"`; permanent skip (no captions / not a YouTube URL) → `"skipped"` with a `note`;
  a video YouTube reports as unavailable (removed, blocked, private) → `"unavailable"` with the reason as `note`.
- Transient failures stay `"todo"` and are retried on the next run — do not "fix" them by hand.
- `npm run absorb-watch-later` (`scripts/wl-absorb.mjs`) adds new Watch Later videos as `"todo"`
  and removes processed ones from Watch Later.
