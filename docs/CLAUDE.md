---
title: "ALMAAT — Project Guide"
description: "ALMAAT is a general-purpose framework for cognitive modeling, written as a layered knowledge base in Markdown."
keywords: [almaat]
---

# ALMAAT — Project Guide

ALMAAT is a general-purpose framework for cognitive modeling, written as a layered
knowledge base in Markdown. It builds a single ontology from one irreducible primitive
(the `Azon`) up through `Set`, `Graph`, `Language`, `Sequence`, `Space`, dynamic
`System`, `Mind`, `Agent`, and `Growth`, then applies that ontology to the human,
society, and daily practice.

This file is the authoritative instruction set for working in this repository. Follow it
for every edit. When it conflicts with a one-off request, ask before deviating.

## Core task: ingesting content

The recurring job is **ingesting source material** the user pastes in or points to by URL:

1. **Translate to English.** English Terms are canonical. Render non-English source into
   clear English first.
2. **Reduce to basic terminology.** Rewrite in plain language. Strip jargon, marketing
   tone, and filler. Reuse the framework's own vocabulary (the capitalized `Terms`)
   wherever a concept already has one. Also fill gaps with content from external resources.
3. **Place it in the right file.** Embed it in the existing file whose topic it extends.
   Create a new file only when no existing topic fits (see Routing and Naming below).
4. **Keep the indexes current.** Any new file, or any change to a file's title or scope,
   must be reflected in `INDEX.md` and in the folder's `index.md`. A stale index is a bug.

Never paste raw source. Ingestion means rewriting into the framework's voice.

### Worked example

> Source (pasted, Russian): "Дисциплина важнее мотивации — это привычка, а не черта характера."

- Translate → "Discipline matters more than motivation — it is a habit, not a character trait."
- Reduce → state it plainly in the framework's register, mark concepts as `Terms`.
- Route → this extends self-discipline, so it goes into `05-mastery/04-discipline.md`; no new file.
- Index → no title/scope change, so `INDEX.md` stays as-is. (If scope had widened, update it.)

## Repository layout

Content lives under numbered section folders, each one ontological layer or applied domain:

| Folder         | Domain                                                                         | File numbers      |
|----------------|--------------------------------------------------------------------------------|-------------------|
| `01-math`      | Formal foundations: `Azon`, `Set`, `Composition`, `Graph`, `Numerals`, `Space`, `Structures`, formal `Language`, `Probability`. | `00`–`06`, `08`, `09` |
| `02-reality`   | Dynamics & metaphysics: `Matter`, `Process`, `System`, `Entropy`, `Evolution`, `Limits`, `Being`, transcendence, the given. | `01`, `02`, `07`, `14`–`16`, `22`, `24`, `27` |
| `03-mind`      | Knowing & mind: knowing, `Knowledge`, `Proof`, `Computation`, `Reasoning`, `Teleos`, free will, `Intellect`, `Mind`, the predictive brain, scientific method. | `04`–`13`, `90` |
| `04-human`     | The human: `Human`, `Rajdo` and approaching it, truth & faith, happiness & greatness, `Animal`, the self & death, the `Manifesto`. | `21`, `23`–`26`, `28`, `29`, `98` |
| `05-mastery`   | Mastery and its stages: mastery, mindset, vision, discipline, habits, environment, attention, productivity, learning, luck, clear thinking. | own domain, `01`–`11` |
| `06-socium`    | The collective: socium, ecology, culture, influence, identity, trances, conformism, politics. | `30`–`37`         |
| `07-sustain`   | Sustaining the self: security, frame, de-escalation, manipulation, reading, hostility, boundaries, defense. | own domain, `06`–`13` |
| `08-vitality`  | The body: vitality, recovery, nutrition, energy. | own domain, `02`–`05` |
| `99-appendices`| Appendices: correspondences from the formal core to predicate logic, category theory, arithmetic, combinatorics, data structures, data normalization, and a map of the disciplines. | own domain, `01`–`07` |

The two-digit prefix on a folder (`01-`–`08-`) places it within the ontology's ordering, with
`99-appendices` held apart at the end as a capstone. The sequence is dense: no number is
shared, none is held in reserve. Ontology layers and applied
domains are interleaved — `05-mastery`, `07-sustain` and `08-vitality` sit next to the layer
they apply to. A new folder takes the next free number; inserting one mid-sequence means
renumbering, which cascades through every cross-reference, so don't do it casually.
(Renumbered 2026-09-14 from the one-digit scheme, where `8-` was shared by two folders and
`3-`, `5-`, `6-` were reservations.)

Applied software engineering (formerly `9-engx`) has been extracted into its own repository,
[arrmagazin/engx](https://github.com/arrmagazin/engx). Do not route engineering material here.

Special top-level files, prefixed with `_` or named `welcome`:

- `welcome.md` — the framework's entry page.
- `_quotes.md` — a curated, numbered list of quotations.
- `_translations.md` — canonical English Term → Belarusian-rooted equivalent. Reverse map
  only; English stays canonical in content.
- `INDEX.md` — master content index (all sections and files).

Every section folder additionally carries an `index.md` — that folder's cover page and file
list. See Syncing the indexes below for its shape.

## Routing: where does material go?

1. Identify the layer the material belongs to (formal, dynamic, mind, human, collective,
   mastery/discipline, sustain) and pick that folder.
2. Within the folder, find the file whose frontmatter `description` already covers the
   topic. If one does, embed there.
3. Only if no file fits, create a new one — and update `_translations.md` (if it coins
   canonical Terms), `INDEX.md`, and the folder's `index.md`.

## Naming

Content files are `NN-topic.md`, lowercase hyphenated slug, `NN` a two-digit ordering
number. Across the ontology folders (`01-math`, `02-reality`, `03-mind`, `04-human`,
`06-socium`) the numbers **ascend roughly with ontological depth** — `01-math` `00`–`09`,
`02-reality` `02`–`27`, `03-mind` `04`–`90`, `04-human` `21`–`98`, `06-socium` `30`–`37` —
with `90` and `98` reserved for capstones (the scientific method, the manifesto).

This is **not one global sequence**: those ranges overlap, and eight numbers repeat
across folders (`02`, `04`, `05`, `06`, `07`, `08`, `10`, `24`). The number orders a file
within its own folder and signals roughly where the folder sits; it is not unique
tree-wide. `05-mastery`, `07-sustain`, `08-vitality` and `99-appendices` are applied-domain folders, each
an **independent number space** (`05-mastery` and `99-appendices` restart at `01`; `07-sustain`
keeps `06`–`13` and `08-vitality` keeps `02`–`05` from their pre-split numbering).

When adding a file, take the next free number in that folder's existing range. Do not
renumber existing files just to keep the sequence dense.

## Frontmatter and title

Frontmatter is exactly three fields, in this order: `title`, `description`, `keywords`.
`description` is one sentence; it is quoted, so backticks come out and inner quotes are
escaped. It is what the indexes quote. Do not reintroduce `license`, `created`,
`modified`, or `source` — they were dropped as noise on 2026-08-26.

Every content file then opens with a single H1 title and goes straight into the body:

```markdown
---
title: "Dynamic Processes"
description: "The Process as a controlled Queue of Words: its Circuit, the kinds of Circuit, and the landmarks of a Flow."
keywords: [reality, process, circuit, flow]
---

# Dynamic Processes

## Parts of a Process
```

**No preface.** Nothing sits between the title and the first heading: no intro line
restating the `description`, no spine table, no enumeration of the folder's other files.
Navigation lives in `INDEX.md` and the folder's `index.md`, which are exempt from this rule;
in a content file, cross-reference a specific Term where it is used.

(Banner images were removed on 2026-09-05; content files carry no images.)

## Terminology and formatting

- **Canonical Terms are capitalized and backticked**: `Azon`, `Set`, `Agent`, `Flow`.
  Cross-reference related Terms with relative links, e.g. `[Systems](02-reality/07-system.md)`.
- **Formal definitions are definition lists.** The Term stands alone on its own line — plain,
  no bold, no backticks — and the defining clause follows on the next line after `: `; the
  formula follows as a blockquote, and `---` separates consecutive definitions. See
  `01-math/00-azon.md`, the reference example:

  ```markdown
  Zero
  : `Azon` that *always* responds with itself

  > `Zero := x → Zero`

  ---

  empty
  : a response with `Zero`.

  > `empty(A, x) :: A(x) = Zero`

  valent
  : any not `empty` response.

  > `valent(A, x) :: A(x) ≠ Zero`
  ```

  The term line must not open with `*`, `-`, `+`, `>`, `|`, `#`, a digit-dot or a fence: the
  renderer's pandoc-style extension reads such a line as a block of its own, and the pair
  degrades to one paragraph with a literal colon printed. That is why the Term is plain here
  while every *reference* to it stays backticked.

  (This rule mandated `Term | Definition | Formula | Notes` tables until 2026-08-16, then
  `**`Term`** := clause` prose until 2026-09-14, when all 467 definitions were converted.)
- **Two arrows in formulas** (adopted 2026-09-06). `⇒` is the signature arrow between
  Terms/Sets — a mapping stated at the Set level, introduced in `01-math/01-sets.md`:
  `Operation<S> := S^ⁿ ⇒ S`, `Cognition :: (Signal, Knowledge) ⇒ Knowledge'`.
  `→` is the value-level response between
  concrete stimuli (`Azon := x → y`, `Zero := x → Zero`) and also marks transitions
  (`Paradigm → Paradigm'`), convergence (`n → ∞`), and directional pairs
  (`Communication(P → Q)`) — none of which are signatures. Example lambdas keep JS style
  (`inc: a => a+1`).
- **Tables are for enumerations**, not definitions: parallel lists of moves, forms, biases, or
  comparisons, where every row shares a shape. The applied folders (`05-mastery`, `06-socium`,
  `07-sustain`, `08-vitality`) use them heavily and correctly.
- **Prose** is plain and direct — basic terminology, short sentences, no filler.
  Declarative, defined, unhurried.
- **Backticks mark a defined Term, and nothing else.** A backticked Capitalized name must
  resolve to a definition somewhere in `docs/`. Enumeration tables bold their first column
  without backticks (`**Deduction**`, `**Monoid**`), because those rows name entries, not
  Terms. An external concept the book does not own stays lowercase — *modules*, *vector
  spaces*, *ego depletion*. The declaration site is the one exception: a definition-list term
  line carries its Term plain, for the parser reason above.
- **A definition may only name Terms from its own folder or an earlier one.** Dependencies
  run downward through the layer order above. Where a definition needs a higher-layer Term,
  either the Term belongs lower (move it) or the definition should generalize to a
  lower-layer one — `Freedom` takes a `Participant`, not an `Agent`.
- **Four forms declare a Term**, and all four count:

  ```markdown
  Term                                        the ordinary form
  : clause

  Term / Alias                                two names, one definition
  : clause

  Term (qualifier)                            a qualifier after the Term
  : clause

  … each given (`Azon`:= **`Term`**) …        an inline coinage inside a definiens
  ```

  The inline form names a role within the enclosing definition (`Tik`, `Tok` in
  `01-math/00-azon.md`); it declares the Term without a standalone entry. It attaches
  tight, no space before the paren: `` (`Azon`:= **`Tik`**) ``. It replaced the older
  colon-pair coinage `X:Y` (`Set:Basis`, `Tik:Subject`) on 2026-09-05; no colon-pair
  remains. A Term merely *mentioned* in a definiens, without the marker, is still not
  declared.

  `*DEF*:` was a fifth form — a label introduced in passing — until 2026-09-14, when all 19
  such declarations became definition-list entries. It now marks notation only, never a Term:
  the two survivors in `01-math/01-sets.md` give the binary spellings of `⋂` and `⋃`.
- When a new canonical Term is coined, add it to `_translations.md` under the section for
  the file that defines it. Newly-proposed Belarusian forms get a trailing asterisk
  (`Razvoda*`); the asterisk marks a proposed *form*, not a proposed placement. A compound
  gloss reuses the gloss already assigned to its parts, so it can be decomposed:
  `TransitionMatrix` is `Mantra Perexodaw*` because `Matrix` is `Mantra` and `Transition`
  is `Perexod`.

## Syncing the indexes

To bring `INDEX.md` back in sync after a stretch of content edits, diff against the last
recorded sync baseline instead of re-reading the whole tree:

```bash
git diff <baseline-commit>..HEAD -- docs/
```

This surfaces exactly which `docs/*.md` files were **added, renamed, removed, or
retitled** since the baseline. For each change, update the matching `INDEX.md` entry
(link path, title, and the frontmatter `description`). Then record the new baseline:

- **Last full reconciliation:** 2026-08-27 — `INDEX.md` regenerated from the tree at
  `0e1dc84`. All 71 content files are indexed exactly once; each entry's link text is
  that file's frontmatter `title` and its blurb is the frontmatter `description`,
  quoted character for character and verified by re-extracting both and diffing.
  `01-math/08-language.md` (then numbered `07`) had had no entry at all. This closed a 192-commit revision
  pass over `docs/` that also emptied the undefined-Term class (every backticked
  Capitalized name now resolves to a definition), removed every upward reference from
  a definition to a higher layer, and rebuilt `_translations.md` to 330 rows with no
  duplicate gloss and no row for a Term the book does not define.
- **Baseline commit:** `0e1dc84` (2026-08-27) — the commit at which `INDEX.md` was
  regenerated from frontmatter. Diff from here for the next sync.

Notes:

- INDEX entries are grouped by ontological-layer section; the description text mirrors each
  file's frontmatter `description` (see Frontmatter and title).
- **Navigation lives in two places, and only two.** `INDEX.md` indexes the whole tree; each
  section folder carries an `index.md` that covers just that folder. Both are generated from
  frontmatter — an entry's link text is the target's `title` and its blurb is the target's
  `description`, quoted character for character. Content files carry no navigation: the
  per-folder spine tables were removed on 2026-08-26, and `05-mastery/01-mastery.md` and
  `06-socium/30-socium.md` no longer list their siblings. (`03-mind/04-knowing.md` and
  `07-sustain/01-sustain.md` were deleted; `06-socium/30-socium.md` remains thin at 15 lines.)
- **A section `index.md`** is exempt from the no-preface rule, because it *is* the navigation.
  Its shape: the three frontmatter fields (`title` is the bare section name — `Math`, `Socium`;
  `keywords` is that name lowercased), a single H1, the one-line section blurb, then one bullet
  per content file in the folder, ordered by filename:

  ```markdown
  - [Title](NN-topic.md) — description
  ```

  It never lists itself. `index.md` is not a content file and takes no `NN` number.
  (Added 2026-09-14, generalizing the `07-sustain` and `08-vitality` covers to all eight folders.)
- **Run `npm run check-docs` before committing content edits.** It resolves every relative `.md`
  link and every `#anchor` in `docs/`, and `--conventions <dir>` additionally checks the three
  frontmatter fields and the single H1.
  Pre-existing breakage is listed in `scripts/check-docs.baseline.txt`, so the gate is
  "no new failures"; fix an entry and delete its line.

## Editing checklist

1. Source translated to English and reduced to basic terminology.
2. Content routed to the correct file (or a correctly named new file created).
3. Frontmatter + title conform to the convention above, with no preface between the
   title and the first heading.
4. New Terms backticked in text and, if canonical, added to `_translations.md`.
5. `INDEX.md` and the section's `index.md` updated to match.
6. Relative links checked — they must resolve to real files.
