// Generates the static file index the opmaat app fetches at /site/index.json.
// The shape mirrors GitHub's recursive git-tree response, which is what the app's
// scopeSiteTree() consumes:
//   { sha, truncated: false, tree: [{ path, type: "blob" | "tree" }] }
//
// Run:  bun scripts/codegen/gen-site-index.ts                  (writes ../dutch-opmaat-docs/index.json)
//       DOCS_ROOT=/some/where bun scripts/codegen/gen-site-index.ts

import fs from "node:fs";
import path from "node:path";

export type SiteTreeEntry = { path: string; type: "blob" | "tree" };
export type SiteIndex = { sha: string; truncated: false; tree: SiteTreeEntry[] };

const INDEX_FILE = "index.json";
const IGNORE = new Set([".git", ".DS_Store", "node_modules", "__pycache__", "build", INDEX_FILE]);

/** Recursively lists every directory (tree) and file (blob) under `dir`, paths relative to it. */
export function walkTree(dir: string, base = ""): SiteTreeEntry[] {
  const out: SiteTreeEntry[] = [];
  for (const name of fs.readdirSync(dir).sort()) {
    if (IGNORE.has(name) || name.startsWith(".")) continue;
    const abs = path.join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (fs.statSync(abs).isDirectory()) {
      out.push({ path: rel, type: "tree" });
      out.push(...walkTree(abs, rel));
    } else {
      out.push({ path: rel, type: "blob" });
    }
  }
  return out;
}

export function buildIndex(root: string): SiteIndex {
  return { sha: "main", truncated: false, tree: walkTree(root) };
}

/** Writes only when the bytes differ, so a redundant run leaves the content repo clean. */
export function writeIndex(root: string): boolean {
  const file = path.join(root, INDEX_FILE);
  const next = `${JSON.stringify(buildIndex(root), null, 2)}\n`;
  if (fs.existsSync(file) && fs.readFileSync(file, "utf8") === next) return false;
  fs.writeFileSync(file, next);
  return true;
}

const meta = (import.meta as any);
if (meta.main) {
  const here = meta.dirname ?? meta.dir;
  const root = path.resolve(path.join( "docs"));
  const changed = writeIndex(root);
  console.log(`${changed ? "✍️  wrote" : "✓  up to date"} ${path.join(root, INDEX_FILE)}`);
}
