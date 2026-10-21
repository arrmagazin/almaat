# ALMAAT

A general-purpose layered knowledge base and vocabulary for cognitive modeling.

Read it at <https://almaat.web.app>.

## Site and book

This repo hosts the site and builds the book, with tooling from the sibling checkout
`../arrmatura-books` (see its `site/README.md`).

| Command | What it does |
| --- | --- |
| `npm run release` | Publishes doc changes: bump, `gen`, commit, push, tag, deploy. Needs a clean `main` |
| `npm run book` | `build/almaat.epub` and `.pdf` from `docs/` |
| `npm start` / `npm run stop` | Serves `www/` on :8091, rebuilds the UI on change, opens the browser / frees :8091 |
| `npm run build` | `www/dist/` (gitignored): the UI bundle from `index.ts`, which calls `launchBook`, and its CSS |

- `www/` is the Firebase public root. `index.html`, `service-worker.js` and `onload.js` are
  written by `npm run gen` from `package.json`; never edit them by hand.
- `package.json` `book` (metadata) and `book/cover.png` are the book's inputs.
- The site reads `docs/` from jsDelivr at the tag of `package.json` `version`.
