---
description: "Start the Ralph loop that revises docs/, then the indexes, README.md and CLAUDE.md"
argument-hint: "[max-iterations]  (default 20)"
allowed-tools: ["Bash", "Read", "Write", "Edit", "Grep", "Glob", "Task", "Skill"]
---

# Revise the docs knowledge base

Preflight (already run):

```!
cd ~/Projects/almaat
grep -qxF '.claude/*.local.md' .gitignore || printf '.claude/*.local.md\n' >> .gitignore
git config core.hooksPath .githooks
echo "--- ledger ---"
if [ -f .claude/docs-revision.local.md ]; then
  echo "EXISTS - loop will RESUME from it. Remaining items:"
  grep -c '^- \[ \]' .claude/docs-revision.local.md || true
else
  echo "ABSENT - loop will start at Phase 0 (audit)."
fi
echo "--- checker ---"
node scripts/check-docs.mjs
echo "--- tree state (anything under docs/ README CLAUDE images scripts is the loop's surface) ---"
git status --porcelain | head
```

Now start the loop: invoke the `ralph-loop:ralph-loop` skill, passing the
pointer prompt below plus two flags. Use `$ARGUMENTS` as the iteration count,
or `20` if `$ARGUMENTS` is empty.

Prompt text (one line, verbatim):

```
Read ~/Projects/almaat/ralph-prompt.md in full - it is the authoritative spec and may have been edited since your last iteration. Then follow its Loop Contract exactly: orient, claim the first unchecked ledger item, do that one item, verify, commit, record. One item per iteration, then stop.
```

Flags: `--max-iterations $ARGUMENTS` (or `20`), and `--completion-promise DONE`.

The prompt is deliberately short. The real spec lives in `ralph-prompt.md`
because the ralph plugin passes its prompt through shell argv and stores it
verbatim, which a multi-KB document does not survive.

## What this does

`ralph-prompt.md` at the repo root is the spec; this command only points the
loop at it. The loop audits `docs/` once, writes a ledger to
`.claude/docs-revision.local.md` (gitignored), then works one ledger item per
iteration through structure and banners, content, coverage, cross-cutting
fixes, review, `docs/INDEX.md` and `docs/CLAUDE.md`, and finally `README.md`
and the root `CLAUDE.md`.

`docs/CLAUDE.md` stays authoritative for content conventions throughout —
`ralph-prompt.md` governs the *loop*, not the *rules of the book*.

## Before the first run

The preflight prints `git status`. If it shows edits under `docs/`, `README.md`,
`CLAUDE.md`, `images/`, or `scripts/`, decide what you want:

- **Commit or stash them** — cleanest. The loop starts on a clean surface.
- **Leave them** — the loop records them in the ledger as yours and works
  around them, but it will strike any item that needs one of those files.

Changes under `input/`, `done/`, or `graphify-out/` need no action.
Those belong to `/absorb` and the loop never touches them.

## Operating it

- **Watch progress:** `cat .claude/docs-revision.local.md`
- **Steer it:** edit the ledger between iterations — reorder items, add one,
  strike one out. The next iteration reads it fresh.
- **Change the rules:** edit `ralph-prompt.md`. It is re-read every iteration.
- **Resume:** if the iteration cap is hit, just run `/revise-docs` again. The
  ledger survives, so the loop picks up where it stopped rather than re-auditing.
- **Stop early:** `/cancel-ralph`.
