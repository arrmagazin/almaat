---
title: "Knowledge"
description: "The atomic units of belief — Opinion, Doubt, Thesis, Theory, Name, Concept — and the forms Knowledge is organized into."
keywords: [mind, knowledge]
---
## Units of Belief

Opinion
: An `Expression` of `Language` associated with an evaluation of whether a `View` belongs to `Place`.

> `Opinion :: Expression ⇒ (View × Place ⇒ {0, 1})`

---

Doubt
: A suspended `Opinion` — the recognition that current `Knowledge` is insufficient to evaluate membership of a `View` in a `Place`.

> `Doubt :: Opinion → suspended`

---

Thesis
: A `Set` of `Opinion` in Logic.

> `Thesis := {Opinion}` in Logic

*NOTE*: `Knowledge` derived from pure reason alone — a heuristic conjecture awaiting `Validation`.

---

[`Theory`](../01-math/08-language.md#theories) is the `Dictionary` of `Expressions` derivable within a `Grammar`. A `Mind` holds one interpreted: its `Names` and `Concepts` are `Expressions` of that `Language`, which is a [`Logic`](08-reasoning.md), and they range over a [`Matter`](../02-reality/01-matter.md#definitions) — the `Reality` the `Theory` is about. That pairing is what lets `Opinion` combine into `Thesis`.

## Naming

Name
: An `Expression` of `Language` associated with `Views` (Entities) of the `Matter`.

> `Name :: Expression ⇒ View`

*NOTE*: Picks out particular instances. Complement: `Concept`.

---

Concept
: An `Expression` of `Language` associated with `Place` (regions) of the `Matter`.

> `Concept :: Expression ⇒ Place`

*NOTE*: Denotes categories rather than instances.

## Knowledge Organization

Knowledge
: A `Set` of `Opinions` that a `Mind` uses to predict and act upon `Reality`.

> `Knowledge := {Theory, Concept, Opinion}_validated`

*NOTE*: `Knowledge` is not Being itself — only its representation. Well-formed `Knowledge` has four properties:

- **adequate** — matches observed `View`
- **accessible** — retrievable from `Memory`
- **coherent** — internally non-contradictory
- **predictive** — allows anticipation of future `State`

---

The forms `Knowledge` is organized into:

| Form | Description | Answers |
| --- | --- | --- |
| **Taxonomy** | Hierarchical is-a relations between concepts, grouped by shared characteristics | What are the types of things? |
| **Ontology** | Formal declarative description of a domain: concepts, properties, restrictions | What is there, and how does it relate? |
| **Knowledge Base** | An ontology with individual instances of its classes | Which particular things are there? |
| **Data Model** | Equations describing the behavioral relationships of a physical system | How does it behave? |
| **Domain-Specific Language** | A language tailored to one domain's operations and configurations | How is it expressed? |
