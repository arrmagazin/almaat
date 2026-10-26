# ALMAAT

A general-purpose layered knowledge base and vocabulary for cognitive modeling.

Read it at <https://almaat.web.app>.

## Site and book

This repo hosts the site and builds the book, with tooling from the sibling checkouts `../arrmatura-books` (book, checks), `../proton` (`ops/build.ts`, `ops/serve.ts`, `ops/index-docs.ts`, base `tsconfig.json`) and `../arrmatura-web` (the hot reload server).

| Command | What it does |
| --- | --- |
| `npm run book` | `build/almaat.epub` and `.pdf` from `docs/` |
| `npm start` / `npm run stop` | Serves `www/` on :8091, rebuilds the UI and the docs index on change, hot-reloads the page over `hotPort`, opens the browser / frees both ports |
| `npm run build` | `www/dist/` (the UI bundle from `index.ts` and its CSS) and `www/index.json` (the docs tree); both gitignored |
| `npm run deploy` | Builds, then deploys `www/` to Firebase Hosting |

- `www/` is the Firebase public root. `index.html`, `service-worker.js` and `onload.js` are
  written by `npm run gen` from `package.json`; never edit them by hand.
- `package.json` `book` (metadata) and `book/cover.png` are the book's inputs.
- The site serves `docs/` itself: `www/docs` is a symlink to `../docs`, and `www/index.json` lists the files under `docs/` that git does not ignore. A deploy publishes the working tree; there is no CDN or tag step.
