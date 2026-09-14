---
title: "Sets, Equivalence, Topology"
description: "Set and its Elements, the equivalence relations that compare Azons, and the topological structures over Collections of Sets."
keywords: [math, sets]
---

# Sets, Equivalence, Topology

## Sets

Set
: an `Azon` whose `Toks` are either `fixed` or `empty`.

> `Set := x → (x | Zero)`

---

Element
: a `valent` `Tok` of a `Set`.

> `a ∈ S ⟺ S(a) = a`

*DEF*: An `Element` **belongs to** a `Set`; it is *inside* not *outside*.

*DEF*: the `Set` **contains** the `Element`.

*NOTE*: By `AXIOM-2`: s`∉ S`. By `AXIOM-1`: `0 ∉ S` and s`∉ 0`.

*NOTE*: `Unit` as a Set contains all `Azons` except itself and `Zero`: `∀x ∉ {0, 1}: x ∈ 1`.

---

Subset
: A `Set` all of whose `Elements` belong to a reference `Set`.

> `A ⊆ B :: ∀x: x ∈ A ⟹ x ∈ B`

*NOTE*: Reflexive: s`⊆ S`. Transitive: `A ⊆ B ∧ B ⊆ C ⟹ A ⊆ C`. Min/Max: `0 ⊆ S ⊆ 1`.

## Domain and Codomain

---

Domain
: `Set` of `valent` `Tiks` of an `Azon`.

> `DOM(A) := {x : A(x) ≠ 0}`

---

Codomain
: `Set` of `valent` `Toks` of an `Azon`.

> `COD(A) := {y : ∃x, A(x) = y ∧ y ≠ 0}`

---

*DEF*: An `Azon` is **`Endogenous*`** if `DOM(A) = COD(A)`.

*NOTE*: Any `Set` is endogenous.

---

*DEF*: `Azons` are **`Endemic`** if `DOM(A₁) = DOM(A₂) ∧ COD(A₁) = COD(A₂)`.

*NOTE*: Let say: `Azon` *from* `Domain` *into* `Codomain` and use *⇒* to note it: `A := DOM(A) ⇒ COD(A)`.

---

*DEF*: `Azon` is **`Injective`** if distinct `Tiks` never respond with the same `Tok`.

> `Injective(A: x → y) := A(x) = A(y) ⟹ x = y`

---

*DEF*: `Azon` is **`Surjective`** *onto* a given `Set` when its `Codomain` *is* that `Set`.

> `Surjective(A, S) := COD(A) == S`

*NOTE*: the `Set` must be given — `Codomain` *is* the image, so every `Azon` is `Surjective` onto its own `Codomain`.

## Presence and Absence

Presence
: `Set` of all `Azon` whose `Domain` or `Codomain` contains the reference `Azon`.

> `APPEAR(a) := {X : a ∈ DOM(X) ∨ a ∈ COD(X)}`

*NOTE*: The existential scope of an entity — every context in which it participates.

---

Universe
: `Set` closed under `Presence`.

> `P :: ∀k ∈ P, APPEAR(k) ⊆ P`

*NOTE*: The Universe of discourse for logical reasoning — every entity's full set of contexts is also inside.

---

Complement
: Set of all Elements of Universe that do NOT belongs to the reference `Set`.

> `!S := {x ∈ P : x ∉ S}`

*NOTE*: Always relative to a `Universe`.

---

Absence
: `Set` of all `Azons` that do NOT belongs to the `Universe`.

> `Absence := {x : x ∉ P}`

*NOTE*: `Complement` is complement *within* `P`; `Absence` is complement *of* `P` — the impossible relative to a given Universe of discourse.

## Topology

Collection
: A `Set` of `Set`s.

> `K := {S₁, S₂, ..., Sₙ}`

---

Intersection
: `Set` of `Elements` which belong to every `Set` of the `Collection`.

> `⋂K := {x : ∀S ∈ K, x ∈ S}`

*DEF*: A `Collection` is **non-intersecting** if no two of its `Sets` share an `Element`: `∀S₁ ≠ S₂ ∈ K: ⋂{S₁, S₂} = 0`.

*DEF*: for two `Set`s, `A ∩ B := ⋂{A, B}` — the binary form used where a `Collection` is not needed.

---

Union
: `Set` of `Elements` which belong to at least one `Set` of the `Collection`.

> `⋃K := {x : ∃S ∈ K, x ∈ S}`

*DEF*: A `Collection` is **saturated to `S`** if `⋃K = S`.

*DEF*: for two `Set`s, `A ∪ B := ⋃{A, B}` — the binary form.

---

Set-Difference
: `Set` of `Elements` in the `Union` of the `Collection` but NOT in the reference `Set`.

> `SetDiff(K, S) := {x : x ∈ ⋃K ∧ x ∉ S}`

---

PowerSet
: The `Collection` of all `Subset` of the reference `Set`.

> `2^S := {Q : Q ⊆ S}`

---

Cluster
: A `Collection` of (`Sets` := **`Fragment`**) that is non-intersecting AND saturated to a reference `Set`.

> `Cluster(S) :: K{ F } (∀F₁ ≠ F₂ ∈ K: ⋂{F₁, F₂} = 0) ∧ ⋃K = S`

*NOTE*: A partition — mutually disjoint `Sets` whose `Union` covers the reference `Set`.

*NOTE*: `{!S, S}` is a `Cluster` saturated to the `Universe` `P`.

---

Taxon
: A `Cluster` of the `Domain` of `Azon` split by shared values of its `Codomain`.

> `Taxon(A) := Cluster(Domain) :: ∧ ∀F ∈ Cluster: ∀a, b ∈ F: A(a) = A(b)`

## Equivalence Relations

Intensional Distinguishability
: There exists an `Azon`-probe that responds to `a` and `b` with different values.

> `DIFF(a, b) := ∃x: x(a) ≠ x(b)`

---

Extensional Equivalence
: No `Azon` in the `Universe` receives different responses from `a` and `b`.

> `EEQ(a, b) := ¬∃x: a(x) ≠ b(x)`

---

Total Equality
: Both Intensionally non-Distinguishable by probes AND Extensionally equivalent in response.

> `a = b := ¬DIFF(a, b) ∧ EEQ(a, b)`

---

Partial Equality
: The `Set` of inputs on which two `Azon` respond total-equally.

> `PEQ(a, b) := {x : a(x) = b(x)}`

*NOTE*: Two `Azon` are **partially-equal** up to `PEQ` precision.

*SEE ALSO*:

- [Identity of Indiscernibles (Wikipedia)](https://en.wikipedia.org/wiki/Identity_of_indiscernibles) — Leibniz's principle, here adapted to dual `Azon`.
- [Extensionality (Wikipedia)](https://en.wikipedia.org/wiki/Extensionality) — basis for `EEQ`.
- [Intension (Wikipedia)](https://en.wikipedia.org/wiki/Intension) — counterpart concept driving `DIFF`.
- [Equivalence relation (Wikipedia)](https://en.wikipedia.org/wiki/Equivalence_relation) — reflexivity, symmetry, transitivity of `=`.
- [Equality (mathematics) (Wikipedia)](https://en.wikipedia.org/wiki/Equality_(mathematics)) — broader survey of equality notions.
