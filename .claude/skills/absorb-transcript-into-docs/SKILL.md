---
name: absorb-transcript-into-docs
description: Use when /absorb merges a transcript into docs/.
category: docs-curation
---
Merge a transcript into the existing topic files of `docs/`, keeping only evidence-backed points that are not already there. Edit topic files in place; a new file is the last resort.

## Placement
- Find the topic file and section that owns each point before editing. Start from `docs/index.md` and the section's `index.md`.
- Sharpen an existing line when the source adds a number, threshold or mechanism. Do not add a second line that says the same thing.
- Add a new heading only when no section fits.
- A markup fault on a line you must touch may be fixed, for example two list items joined on one line, which breaks a new link. Name the fix in the report.

## Claims
- Keep claims the source states as established fact. Drop ads, subscriptions, personal stories, unverifiable typologies, and cleanse or detox claims.
- Turn a debunked myth into its corrective fact. Never repeat the myth as a claim.
- If a point contradicts an existing line, report the conflict. Do not overwrite silently.
- Name no speaker unless the captions make the name certain.
- Check every sentence you draft yourself against the source and standard usage, not only the source's claims. Fix or drop a wrong line before the final report, and list it under ❌.
- Calibration examples: `references/myth-verdicts.md`.

## Index and checks
- When a topic description changes, update every index that repeats it, using the Edit tool.
- Run the docs link checker and compare against the repo's check-docs baseline. Only failures absent from the baseline are yours. Pre-existing broken links are reported as ⚠️, not fixed, unless they sit on a line you edit.
- Keep each Bash call to one simple command. Command substitution (`$(...)`), `;`-chained commands and `cd && ...; echo` trigger a permission denial. Save the baseline with one call, then run `npm run -s check-docs 2>&1 | diff BASELINE_FILE -` after the edits. Find the deleting commit in one call with `git log --diff-filter=D --format=%h -1 -- docs/CLAUDE.md`, then read it in a second call with `git show HASH^:docs/CLAUDE.md`.
- The docs spec lives in `docs/CLAUDE.md`. If it is missing, find the deleting commit with `git log --diff-filter=D -- docs/CLAUDE.md` and read the version before it with `git show`.
- If the docs keep a glossary of canonical terms with translations, add any new canonical term there in every language it carries.

## Finish
- Move the consumed input file to `done/`.
- Leave changes uncommitted. Commit and push only after the user says `amen`.
- Report as a table (kept, merged, dropped per file), then the notable drops with reasons, then open conflicts. Use only the markers ✅ ❌ ⚠️.
