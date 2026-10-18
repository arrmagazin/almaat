---
description: Absorb pending input/yt-*.md transcripts into docs/, then archive each to done/
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(ls:*), Bash(git:*), Bash(rg:*), Bash(wc:*), Bash(mv:*)
---

# yt-absorb

Worker 2 of the YouTube pipeline: consume the transcripts that `/yt-fetch` wrote.

## Procedure

1. Glob `input/*.md`. No matches → report "idle" and stop.
2. Process files one at a time, alphabetical order. Per file:
   a. Read `.claude/commands/absorb.md` and execute its Procedure with this single file as the scope.
   b. After the file's absorb report, `mv input/<*>.md done/` — this command authorizes the archive, so move without asking (it overrides absorb's "ask before archiving" rule). If the procedure already moved the file, skip the `mv`.
3. Finish with one summary line per file: destination doc(s), claims kept / merged / dropped.

## Hard rules

- Complete step 2b for a file before starting the next file — progress must survive interruption.
- A transcript that yields nothing new still gets archived to `done/`; only a failed absorb leaves the file in `input/` for the next run.
