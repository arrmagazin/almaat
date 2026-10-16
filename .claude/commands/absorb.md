---
description: Merge key insights from input/ into the right docs/ files — deduped, terse, structured
argument-hint: "[file or glob under input/ — default: all]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(ls:*), Bash(git:*), Bash(rg:*), Bash(wc:*)
---

# absorb

Merge key insights from `input/` into the `docs/` files that already own the topic.
Sources are raw and long; `docs/` is short and canonical. Absorb collapses the first into the second.

## Procedure

1. **Scope.** Sources = `$ARGUMENTS` if given, else every file in `input/`. List them with size and language.
2. **Read the spec.** `docs/CLAUDE.md` is authoritative — translate → reduce → route → reindex. Where its
   folder map disagrees with the tree, trust the tree.
3. **Extract claims.** Per source, produce a flat list of standalone claims: one sentence each, English,
   plain terms, reusing existing `Terms`. Aim for 5–20 per source regardless of source length.
   Drop: anecdotes, repetition, hype, self-promotion, unverifiable assertions, filler, calls to action.
   Note deliberate drops — they go in the report.
4. **Dedupe — the primary constraint.** Dedupe the claim list against itself, then each claim against
   `docs/` (grep the Term and its synonyms across all sections, not just the expected folder). Three outcomes:
   - already stated → drop it;
   - stated weaker or partially → **sharpen the existing line in place**; never add a parallel section;
   - genuinely new → route it.
5. **Route.** Embed into the existing file whose intro already covers the topic. Create a new file only when
   none does — then follow Naming, banner, and intro rules in `docs/CLAUDE.md`. One insight, one home:
   cross-link instead of restating in a second file.
6. **Write terse.** Declarative, short sentences, basic terminology. Definitions go in
   `Term | Definition | Formula | Notes` tables. No narrative framing, no "this section", no attribution to
   the source, no hedging. Never paste raw source. New text must be indistinguishable in voice from the
   surrounding file.
7. **Structurize.** Group routed claims under one heading at the file's existing level, ordered
   definition → mechanism → practice. Fold loose additions into existing headings when one fits.
8. **Reindex.** A new canonical Term with a Belarusian form carries it on its definition line, `Term *(Form)*`. New, retitled, or rescoped files → `INDEX.md` and the section `index.md`. Verify every relative link resolves.
9. move move the consumed transcript into `done/`
10. **Report.** A table of source → destination file(s) → claims kept / merged / dropped, plus one line on
   each notable drop. Leave `input/` untouched; ask before deleting or archiving a consumed source.

## Hard rules

- Non-duplication beats completeness. In doubt, sharpen an existing line rather than add one.
- Additive only: never delete existing `docs/` content to make room; supersede a line by rewriting it.
- No new file when an existing one fits. No new folder, ever, without asking.
- Verbatim quotation goes as a `>` blockquote right after the claim it supports, `— Author` at the end; never repeat one.
- A source that yields nothing new is a valid result — say so, change nothing.
- dropped unverifiable, suspictious, controversial, clickbait content.
- use plain english, no fluffy or rare words, target to non-native B1 speakers.

## Done when

Every claim is dropped, merged, or routed; indexes and links resolve; the diff reads as if the material had
always been there.
