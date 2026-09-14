# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A Markdown knowledge base, not an application.

Content lives under `docs/` as a layered ontology built from one primitive (`Azon`) up through formal foundations, dynamics, mind, the human, mastery, the collective, and the body.

There is no application code and no dependencies. The only generated artifact is the book under `build/`, which is gitignored.

## Authoritative content guide

**For any work inside `docs/` — routing material, naming files, defining Terms, updating the index — read `docs/CLAUDE.md` first and follow it.** It is the authoritative spec for content; do not duplicate or paraphrase its rules here.

When `docs/CLAUDE.md` disagrees with the filesystem (folder names, file numbers, ranges), trust the filesystem and fix the spec. It and `docs/INDEX.md` are authored documents that drift behind a reorganization.

## Layout

- `docs/` — all content. The substantive work happens here.
- `scripts/` — `check-docs.mjs` with `check-docs.baseline.txt`, `wl-absorb.mjs`, `yt-fetch.mjs` with `yt-fetch.test.mjs`, `build_book.ts` with `build_book.test.ts`.
- `book/` — what the book build needs beside `docs/`: `metadata.yaml` (title, author, rights), `epub.css`, `table-rules.lua`, `code-breaks.lua`. Identical copies live in the engx repo; change them in both.
- `.githooks/pre-commit` — runs the checker on any commit touching `docs/`; the file documents its own behaviour. Install once with `git config core.hooksPath .githooks`.
- `input/`, `done/`, `index.json` — staging for the separate `/absorb` workflow, not content.

## Commands

`package.json` is `type: module`, no lockfile.

```bash
npm run check-docs                          # every relative link and #anchor in docs/
npm run check-docs -- --conventions docs    # + frontmatter, no duplicate H1
npm run absorb-watch-later                  # scripts/wl-absorb.mjs
npm run book                                # build/almaat.epub and build/almaat.pdf
npm run book -- --markdown                  # assemble build/almaat.md and verify, render nothing
npm test                                    # builder tests (bun) + yt-fetch tests (node)
```

## The book build

`scripts/build_book.ts` (bun, Node built-ins only) assembles `docs/` into one document and renders it with pandoc; the PDF also needs `xelatex`. It runs standalone, not under `npm run build`, so the site build and deploy stay free of those tools.

What it does that pandoc cannot, each covered in `scripts/build_book.test.ts`:

- **Reading order.** `welcome.md`, then folders in numeric order, each led by its `index.md`, which keeps its heading level and reads as the chapter opener; siblings are demoted one level. Other root files (`_quotes.md`, `_translations.md`) are closing chapters. `docs/CLAUDE.md` and `docs/INDEX.md` are skipped.
- **Title heading.** Docs carry no H1, so the builder opens each body with `# <frontmatter title>`; that heading is the document's anchor.
- **One document, one page.** Each file opens on a fresh page: a raw `\clearpage` block for the PDF, a `.document` class on the opening heading for `book/epub.css`.
- **Unique heading ids.** Every heading gets `{#doc-anchor--section}`, so repeated section names across files never collide.
- **Link rewriting.** Cross-document links become intra-document anchors; a link with no anchor points at the target's title.
- **Normalizing `---`** to `***` and closing `<br>` to `<br/>`, both of which pandoc misreads.
- **Mermaid diagrams** rasterized to `build/diagrams/<hash>.png` by mermaid-cli under `npx`, content-addressed so only changed diagrams re-render. A diagram that fails to render stays a code block.
- **Structure check.** Before rendering, the assembled file is round-tripped through pandoc to HTML and every declared heading id and link target is confirmed to exist.

The file name comes from the package `name`. A cover is generated from `book/metadata.yaml` over `images/cover-bg.png` when that file exists; almaat has none, so the book has no cover.

YouTube pipeline — two Claude commands, designed to run unattended under `/loop`, one session each:

- `/yt-fetch` — runs `node scripts/yt-fetch.mjs`: per unchecked URL in `input/youtube.md`, writes the
  transcript to `input/yt-<id>.md` and marks the line done (`[x]`; `[-]` = permanent skip, never retried).
- `/yt-absorb` — runs the `/absorb` procedure on each `input/yt-*.md`, then archives it to `done/`.

Start with `/loop 10m /yt-fetch` and `/loop 15m /yt-absorb` (or one session: `/loop 15m "run /yt-fetch, then /yt-absorb"`).

`check-docs` ignores failures listed in `scripts/check-docs.baseline.txt`, so the gate is "no new failures". Fix an entry and delete its line by hand. Never run `--write-baseline` to clear a fresh failure: it converts a bug into accepted breakage and nothing downstream can tell the difference.

## Lint

`.markdownlint.json` disables six rules — `MD013` (line length), `MD025` (multiple top-level headings), `MD033` (inline HTML), `MD040` (fenced code language), `MD041` (first line in file should be a top-level heading), and `MD060`. Assume these are intentional; don't reflow paragraphs or chase those rules.
