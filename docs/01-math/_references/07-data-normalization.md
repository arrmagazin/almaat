---
title: "Correspondence to Data Normalization"
description: "The relational normal forms 1NF to BCNF stated over Schema, Type, Presentation, and Relation."
keywords: [appendices, normalization, relational, schema]
---
The primitives above align with the classical relational normal forms. `Schema` is the database schema; an `Type` is a normalized table; a `Presentation` is a row; a `Relation` carries foreign-key links.

---

1NF
: Atomic values; no repeating groups.

*NOTE*: `Point := [v₁, ..., vₙ]` with `vᵢ ∈ COD(pᵢ)` — each coordinate is a single element of its Attribute's `Codomain`, atomic by construction.

---

2NF
: 1NF and every non-key attribute depends on the whole `Key`.

*NOTE*: An `Type` whose non-`Key` Attributes are functions of the full `Key` only; partial dependencies force decomposition into separate `Type` linked by `Relation`.

---

3NF
: 2NF and no transitive dependency between non-key attributes.

*NOTE*: Non-`Key` Attributes depend on the `Key` directly, not via another non-`Key` Attribute; transitive chains are factored into their own `Type`.

---

BCNF
: Every functional determinant is a `Key`.

*NOTE*: For every functional dependency `X → Y` within an `Type`, `X` is a `Key` (injective Attribute or Attribute composite).

A fully normalized `Schema` is therefore a `Structure` of `Type` in BCNF, with every inter-table link expressed as a `Relation` over `Key` Attributes and every `Tuple` denoting one inter-entity connection.

```svg
<Panel flow="LR">
  <Node key="raw" col="0" row="0" label="Unnormalized" />
  <Node key="nf1" col="1" row="0" label="1NF" note="atomic values" />
  <Node key="nf2" col="2" row="0" label="2NF" note="full Key dependency" />
  <Node key="nf3" col="2" row="1" label="3NF" note="no transitive dependency" />
  <Node key="bcnf" col="1" row="1" label="BCNF" note="determinant is Key" />
  <Node key="schema" col="0" row="1" label="Schema of Type" note="linked by Relation" />
  <Edge from="raw" to="nf1" />
  <Edge from="nf1" to="nf2" />
  <Edge from="nf2" to="nf3" />
  <Edge from="nf3" to="bcnf" />
  <Edge from="bcnf" to="schema" />
</Panel>
```
