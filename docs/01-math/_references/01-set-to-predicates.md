---
title: "Correspondence from Sets to Logic of Predicates"
description: "Predicate logic recovered from Set: a Predicate as a truth-test, and the connectives and quantifiers as Set operations."
keywords: [appendices, predicates, logic, quantifiers]
---
A `Predicate` is a `Set` viewed as a truth-test: `P(x) = x` reads *"x satisfies P"*, `P(x) = 0` reads *"x does not satisfy P"*.

Truth and falsity are not a separate Boolean type — they are the *survival* or *erasure* of the input by the filter.

---

Predicate
: A `Set` regarded as a truth-test over the `World`.

> `P(x) ∈ {x, 0}`

*NOTE*: Every `Predicate` *is* a `Set`; every `Set` *is* a `Predicate`.

---

Tautology
: Predicate satisfied by every `Element` of the `World`.

> `⊤ := P`

*NOTE*: The `World` itself, as a `Set`.

---

Contradiction
: Predicate satisfied by no `Azon`.

> `⊥ := 0`

*NOTE*: Coincides with `Zeron`.

---

Conjunction
: Both predicates hold.

> `A ∧ B := A ∩ B`

*NOTE*: Set `Intersection`.

---

Disjunction
: At least one predicate holds.

> `A ∨ B := A ∪ B`

*NOTE*: Set `Union`.

---

Negation
: Predicate fails.

> `¬A := !A`

*NOTE*: `Complement` in the `World` `P`.

---

Implication
: A entails B.

> `A → B :: A ⊆ B`

*NOTE*: Equivalent to `∀x: A(x) = x ⟹ B(x) = x`.

---

Biconditional
: A and B have the same extension.

> `A ↔ B :: A = B`

*NOTE*: Set equality.

---

Universal
: Predicate holds throughout a `Set`.

> `∀x ∈ A: P(x) :: A ⊆ P`

*NOTE*: Reduces to `Subset`.

---

Existential
: Predicate holds somewhere in a `Set`.

> `∃x ∈ A: P(x) :: A ∩ P ≠ 0`

*NOTE*: Non-empty `Intersection`.

```svg
<Panel>
  <Node key="predicate" col="2" row="1" rowspan="3" label="Predicate" shape="circle" tone="primary" />
  <Node key="constants" col="1" row="0" label="Constants" shape="round" />
  <Node key="tautology" col="0" row="0" label="Tautology&#10;⊤ = P" shape="pill" />
  <Node key="contradiction" col="0" row="1" label="Contradiction&#10;⊥ = 0" shape="pill" />
  <Node key="connectives" col="1" row="3" label="Connectives" shape="round" />
  <Node key="conjunction" col="0" row="2" label="Conjunction&#10;A ∩ B" shape="pill" />
  <Node key="disjunction" col="0" row="3" label="Disjunction&#10;A ∪ B" shape="pill" />
  <Node key="negation" col="0" row="4" label="Negation&#10;!A" shape="pill" />
  <Node key="relations" col="3" row="0" label="Relations" shape="round" />
  <Node key="implication" col="4" row="0" label="Implication&#10;A ⊆ B" shape="pill" />
  <Node key="biconditional" col="4" row="1" label="Biconditional&#10;A = B" shape="pill" />
  <Node key="quantifiers" col="3" row="3" label="Quantifiers" shape="round" />
  <Node key="universal" col="4" row="3" label="Universal&#10;A ⊆ P" shape="pill" />
  <Node key="existential" col="4" row="4" label="Existential&#10;A ∩ P ≠ 0" shape="pill" />
  <Edge from="predicate" to="constants" arrow="none" />
  <Edge from="predicate" to="connectives" arrow="none" />
  <Edge from="predicate" to="relations" arrow="none" />
  <Edge from="predicate" to="quantifiers" arrow="none" />
  <Edge from="constants" to="tautology" arrow="none" />
  <Edge from="constants" to="contradiction" arrow="none" />
  <Edge from="connectives" to="conjunction" arrow="none" />
  <Edge from="connectives" to="disjunction" arrow="none" />
  <Edge from="connectives" to="negation" arrow="none" />
  <Edge from="relations" to="implication" arrow="none" />
  <Edge from="relations" to="biconditional" arrow="none" />
  <Edge from="quantifiers" to="universal" arrow="none" />
  <Edge from="quantifiers" to="existential" arrow="none" />
</Panel>
```

*NOTES*:

- Predicates on `P` form a **Boolean algebra** under `∧`, `∨`, `¬`, with `⊤ = P` and `⊥ = 0`.
- **De Morgan:** `!(A ∧ B) = !A ∨ !B`, `!(A ∨ B) = !A ∧ !B`.
- **Excluded middle (within `P`):** `A ∨ !A = P`, `A ∧ !A = 0`.
- **Double negation:** `!!A = A`.
- **Quantifier duality:** `∀x ∈ A: P(x) ⟺ ¬∃x ∈ A: ¬P(x)`.
- **Filter composition equals conjunction:** for any `Set` `A`, `B`: `(A ∘ B)(x) = A(B(x)) = x` iff `x ∈ A ∩ B`. Equivalent to `A ∘ B = A ∩ B`. *This is unique to the filter semantics — it does not hold for the standard 0/1-indicator function.*
- **Commutativity from intersection:** since `∩` is commutative, so is filter composition: `A ∘ B = B ∘ A`.

*SEE ALSO*:

- [First-order logic (Wikipedia)](https://en.wikipedia.org/wiki/First-order_logic) — predicate logic in the classical sense.
- [Algebra of sets (Wikipedia)](https://en.wikipedia.org/wiki/Algebra_of_sets) — operations mirrored above.
- [Boolean algebra (Wikipedia)](https://en.wikipedia.org/wiki/Boolean_algebra) — structure formed by predicates on a fixed `World`.
- [De Morgan's laws (Wikipedia)](https://en.wikipedia.org/wiki/De_Morgan%27s_laws) — duality of `∧`/`∨` under negation.
- [Universal quantification (Wikipedia)](https://en.wikipedia.org/wiki/Universal_quantification) and [Existential quantification (Wikipedia)](https://en.wikipedia.org/wiki/Existential_quantification) — quantifier semantics.
