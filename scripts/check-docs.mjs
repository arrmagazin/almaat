#!/usr/bin/env node
// Verifies relative .md links, #anchors, and (optionally) file conventions across docs/.
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve, relative, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(ROOT, "docs");

const args = process.argv.slice(2);
const conventionsDir = args.includes("--conventions") ? args[args.indexOf("--conventions") + 1] : null;
const writeBaseline = args.includes("--write-baseline");
const BASELINE = join(ROOT, "scripts", "check-docs.baseline.txt");

// Known, accepted breakage predating this checker, keyed without line numbers so the
// entries survive edits above them. Anything not listed here fails the build.
const baseline = new Set(
  existsSync(BASELINE)
    ? readFileSync(BASELINE, "utf8")
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#"))
    : [],
);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) out.push(...walk(path));
    else if (entry.endsWith(".md")) out.push(path);
  }
  return out;
}

const withoutFrontmatter = (text) => text.replace(/^---\n[\s\S]*?\n---\n/, "");

// Fenced blocks hold markdown samples. docs/CLAUDE.md documents the heading
// conventions by showing them, so its examples must not be counted as
// the file's own headings.
export const stripFences = (text) => text.replace(/^\s*(`{3,}|~{3,})[\s\S]*?^\s*\1.*$/gm, "");

// docs/CLAUDE.md is the project spec, not content, so convention checks skip it.
export const isContentFile = (relPath) => relPath !== "CLAUDE.md";
const withoutCodeFences = (text) => text.replace(/```[\s\S]*?```/g, "");

// GitHub's slug rule: lowercase, drop everything that is not letter/number/space/hyphen,
// then map each remaining space to one hyphen (spaces are NOT collapsed).
const slugify = (heading) =>
  heading
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s/g, "-");

const anchorsOf = (body) => new Set([...body.matchAll(/^#{1,6}\s+(.+?)\s*$/gm)].map((m) => slugify(m[1])));

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
const files = isMain ? walk(DOCS) : [];
const bodies = new Map(files.map((f) => [f, withoutCodeFences(withoutFrontmatter(readFileSync(f, "utf8")))]));
const anchors = new Map(files.map((f) => [f, anchorsOf(bodies.get(f))]));
const failures = [];
const rel = (f) => relative(ROOT, f);
const fail = (file, line, detail) =>
  failures.push({ key: `${rel(file)} → ${detail}`, display: `${rel(file)}:${line} → ${detail}` });

for (const file of files) {
  const lines = bodies.get(file).split("\n");
  lines.forEach((line, i) => {
    for (const [, target] of line.matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^(https?:|mailto:)/.test(target)) continue;
      const [path, anchor] = target.split("#");
      if (path === "") {
        if (anchor && !anchors.get(file).has(anchor)) fail(file, i + 1, `#${anchor} (no such heading in this file)`);
        continue;
      }
      if (!path.endsWith(".md")) continue;
      const resolved = resolve(dirname(file), path);
      if (!existsSync(resolved)) {
        fail(file, i + 1, `${target} (file not found)`);
        continue;
      }
      if (anchor && !anchors.get(resolved).has(anchor)) fail(file, i + 1, `${target} (no such heading in ${rel(resolved)})`);
    }
  });
}

if (conventionsDir) {
  const REQUIRED = ["title", "description", "keywords"];
  const conventionsRoot = resolve(ROOT, conventionsDir);
  for (const file of walk(conventionsRoot)) {
    const relPath = relative(conventionsRoot, file);
    if (!isContentFile(relPath)) continue;
    const raw = readFileSync(file, "utf8");
    const at = rel(file);
    const cfail = (detail) => failures.push({ key: `${at} → ${detail}`, display: `${at} → ${detail}` });
    const frontmatter = raw.match(/^---\n([\s\S]*?)\n---\n/);
    if (!frontmatter) {
      cfail(`missing frontmatter`);
      continue;
    }
    for (const key of REQUIRED) {
      if (!new RegExp(`^${key}:`, "m").test(frontmatter[1])) cfail(`frontmatter missing "${key}"`);
    }
    const body = withoutFrontmatter(raw);
    // The frontmatter `title` is the only title; a duplicate H1 is a convention failure.
    const h1s = [...stripFences(body).matchAll(/^# (.+)$/gm)];
    if (h1s.length) cfail(`expected no H1 (title lives in frontmatter), found ${h1s.length}`);
  }
}

if (writeBaseline) {
  const header = "# Accepted pre-existing breakage. Keyed as `file → target`, no line numbers.\n# Regenerate: node scripts/check-docs.mjs --write-baseline\n";
  writeFileSync(BASELINE, header + failures.map((f) => f.key).sort().join("\n") + "\n");
  console.log(`Wrote ${failures.length} entries to ${rel(BASELINE)}`);
  process.exit(0);
}

const fresh = failures.filter((f) => !baseline.has(f.key));
const accepted = failures.length - fresh.length;

if (fresh.length) {
  console.error(`${fresh.length} problem(s):\n${fresh.map((f) => `  ${f.display}`).join("\n")}`);
  process.exit(1);
}
console.log(
  `OK — ${files.length} files checked${conventionsDir ? `, conventions enforced in ${conventionsDir}` : ""}` +
    (accepted ? ` (${accepted} baselined problem(s) ignored)` : ""),
);
