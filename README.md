# ALMAAT

A general-purpose framework for cognitive modeling, written as a layered knowledge base in Markdown.

It builds one ontology from a single irreducible primitive — the `Azon`, an ability that responds to each given `Tik` with a specific `Tok` — and never introduces a term it has not defined. `Set`, `Graph`, `Numerals` and `Language` are built from that primitive; `Process`, `System` and `Evolution` put it in motion; `Knowledge`, `Agent` and `Mind` make it know and act. The applied sections then carry that same vocabulary into a life: mastery, the collective, and the body.

It is for anyone who wants a single consistent vocabulary for thinking about minds, systems and how to live — read straight through, or entered at any file through the index.

## Read it

- [`docs/welcome.md`](docs/welcome.md) — the entry page, layers at a glance.
- [`docs/INDEX.md`](docs/INDEX.md) — every section and every file, each with its one-line description.

## Sections

Content lives in `docs/`, one folder per ontological layer or applied domain. The leading digit places a folder in the ontology's order; numbers rise roughly with depth, and the two applied folders keep their own numbering.

| Folder | Topic |
|---|---|
| [`0-math/`](docs/0-math) | Formal foundations: `Azon`, `Set`, `Composition`, `Graph`, `Numerals`, `Structures`, the presentational view, formal `Language` |
| [`1-reality/`](docs/1-reality) | Dynamics and metaphysics: `Process`, `System`, `Probability`, `Entropy`, `Evolution`, `Limits`, `Being` |
| [`2-mind/`](docs/2-mind) | Knowing: `Knowledge`, `Proof`, `Computation`, `Reasoning`, agency, free will, `Intellect`, `Mind`, the scientific method |
| [`4-human/`](docs/4-human) | The human: `Rajdo`, truth and faith, happiness and greatness, the `Animal`, the self and death, the manifesto |
| [`7-mastery/`](docs/7-mastery) | The disciplines: mindset, vision, discipline, habits, environment, attention, productivity, learning |
| [`8-socium/`](docs/8-socium) | The collective: ecology, culture, influence, identity, conformism, power |
| [`8-sustain/`](docs/8-sustain) | Defense: security, frame, de-escalation, manipulation, reading people, boundaries |
| [`9-vitality/`](docs/9-vitality) | The body: vitality, recovery, nutrition, energy |

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
