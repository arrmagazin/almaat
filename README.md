# ALMAAT

A general-purpose framework for cognitive modeling, written as a layered knowledge base in Markdown.

It builds one ontology from a single irreducible primitive — the `Azon`, an ability that responds to each given `Tik` with a specific `Tok` — and never introduces a term it has not defined. `Set`, `Graph`, `Numerals` and `Language` are built from that primitive; `Process`, `System` and `Evolution` put it in motion; `Knowledge`, `Agent` and `Mind` make it know and act. The applied sections then carry that same vocabulary into a life: mastery, the collective, and the body.

It is for anyone who wants a single consistent vocabulary for thinking about minds, systems and how to live — read straight through, or entered at any file through the index.

## Read it

- [`docs/welcome.md`](docs/welcome.md) — the entry page, layers at a glance.
- [`docs/INDEX.md`](docs/INDEX.md) — every section and every file, each with its one-line description.

## Sections

Content lives in `docs/`, one folder per ontological layer or applied domain. The two-digit prefix places a folder in the ontology's order; numbers rise roughly with depth, the applied folders keep their own numbering, and `99-appendices` sits apart at the end.

| Folder | Topic |
|---|---|
| [`01-math/`](docs/01-math) | Formal foundations: `Azon`, `Set`, `Composition`, `Graph`, `Numerals`, `Structures`, the presentational view, formal `Language` |
| [`02-reality/`](docs/02-reality) | Dynamics and metaphysics: `Process`, `System`, `Probability`, `Entropy`, `Evolution`, `Limits`, `Being` |
| [`03-mind/`](docs/03-mind) | Knowing: `Knowledge`, `Proof`, `Computation`, `Reasoning`, agency, free will, `Intellect`, `Mind`, the scientific method |
| [`04-human/`](docs/04-human) | The human: `Rajdo`, truth and faith, happiness and greatness, the `Animal`, the self and death, the manifesto |
| [`05-mastery/`](docs/05-mastery) | The disciplines: mindset, vision, discipline, habits, environment, attention, productivity, learning |
| [`06-socium/`](docs/06-socium) | The collective: ecology, culture, influence, identity, conformism, power |
| [`07-sustain/`](docs/07-sustain) | Defense: security, frame, de-escalation, manipulation, reading people, boundaries |
| [`08-vitality/`](docs/08-vitality) | The body: vitality, recovery, nutrition, energy |
| [`99-appendices/`](docs/99-appendices) | Correspondences from the formal core: predicate logic, category theory, arithmetic, combinatorics, data structures, data normalization, a map of the disciplines |

Four files sit at the root of `docs/`: `welcome.md`, `INDEX.md`, `_quotes.md` (curated quotations, cited by number) and `_translations.md` (each canonical English Term to its Belarusian-rooted equivalent).

Applied software engineering lives in a separate repository, [arrmagazin/engx](https://github.com/arrmagazin/engx).

## Contributing

The content has its own rulebook: [`docs/CLAUDE.md`](docs/CLAUDE.md) — how material is routed, how a Term is defined, what the frontmatter must look like. Read it before editing `docs/`.

Install the hook once, then check your work:

```bash
git config core.hooksPath .githooks
npm run check-docs
```

`check-docs` resolves every relative link and `#anchor` in `docs/`; `npm run check-docs -- --conventions docs` additionally checks frontmatter and headings. The pre-commit hook runs it for you.

Repo-level tooling and layout are in [`CLAUDE.md`](CLAUDE.md) at the root.
