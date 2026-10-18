---
title: "Sets, Equivalence, Topology"
description: "Set and its Elements, the equivalence relations that compare Azons, and the topological structures over Collections of Sets."
keywords: [math, sets]
---
## Sets

Set *(Sito)*
: `Azon` responds `fixed` or `empty`.

> `Set { * -> ( * | Z ) }`

---

Element *(Druska)*
: a `valent` `Spond` of a `Set`.

---

belongs to
: An `Element` is *inside* a `Set`, not *outside*.

> `∈<S> { x -> #[S[x]] }` — short `x ∈ S`

*NOTE*: For a `valent` `x`, `x ∈ S` is `S[x] IS x`. The short form puts the `Arg` on the left: `x ∈ S` is `∈<S>[x]`.

---

not belongs to
: the negation of `belongs to`.

> `∉<S> = ∈<S>.!` — short `x ∉ S`

---

contains
: the converse, said of the `Set` toward the `Element`.

> `∋<x> { S -> (x ∈ S)[S] }` — short `S ∋ x`

*NOTE*: By `AXIOM-2`: `S ∉ S`. By `AXIOM-1`: `Z ∉ S` and `S ∉ Z`.

*NOTE*: `Unit` as a `Set` contains all `Azons` except itself and `Zero`: `x ∉ {Z, U} ⟹ x ∈ U`.

*NOTE*: `Singleton` is also a `Set` with exactly one `Element`.

---

Cardinality
: how many `Elements` a `Set` has.

> `|S|`

*NOTE*: Counting needs `Numbers` (see [Numerals](04-numerals.md)), but two readings are used before them: `|S| > 0` — `S` has an `Element`; `|S| < 1` — `S` has none. They give *some* and *every* without quantifiers: some `Element` of `S` is in `E` when `|S ∩ E| > 0`, and every one is when `|S ∖ E| < 1`.

---

Subset *(Qastka)*
: A `Set` all of whose `Elements` belong to a reference `Set`.

> `A ⊆ B ⟺ A.B == A`

**DEF**: `∖<A,B> = A.{ x -> (x ∉ B)[x] }` — short `A ∖ B`, the `Elements` of `A` that are not in `B`: what `A` lets out passes on only where `B` would absorb it.

*NOTE*: Passing through `B` changes nothing `A` lets out. Counted, the same is `|A ∖ B| < 1`: nothing of `A` is left outside `B`.

*NOTE*: Reflexive: `S ⊆ S`. Transitive: `(A ⊆ B ∧ B ⊆ C) ⟹ A ⊆ C`. Min/Max: `Z ⊆ S`, `S ⊆ U`.

## Domain and Codomain

Domain *(Pryjom)*
: `Set` of the `Args` that get a `valent` `Spond` from an `Azon`.

> `DOM<A> { x -> (A.#)[x][x] }`

*NOTE*: `A.#` is `A`'s own test: `Unit` where `A` gives a `valent` `Spond`, `Zero` elsewhere. Applied to the `Arg` once more, it passes the `Arg` on or absorbs it.

---

Codomain *(Vydaqa)*
: `Set` of the `valent` `Sponds` of an `Azon`.

> `COD<A> { y -> (|DOM<A.@<y>>| > 0)[y] }`

*NOTE*: `DOM<A.@<y>>` is the `Set` of `Args` that `A` sends to `y`; `y` is in the `Codomain` when that `Set` has an `Element`.

---

Endogenous
: An `Azon` whose `Domain` and `Codomain` coincide.

> `Endogenous<A> :: DOM<A> == COD<A>`

*NOTE*: Any `Set` is `Endogenous`.

---

Endemic
: `Azons` sharing both `Domain` and `Codomain`.

> `Endemic<A₁,A₂> :: DOM<A₁> == DOM<A₂>, COD<A₁> == COD<A₂>`

*NOTE*: An `Azon` goes *from* its `Domain` *into* its `Codomain`, noted with *⇒*: `A: DOM<A> ⇒ COD<A>`. In general `A: X ⇒ Y` says `DOM<A> ⊆ X, COD<A> ⊆ Y`.

---

Injective *(Adnaznaqnae\*)*
: `Azon` whose distinct `Args` never get with the same `Spond`.

> `Injective<A> :: ({x, y} ⊆ DOM<A> ∧ A[x] IS A[y]) ⟹ x IS y`

---

Surjective *(Nakryvalnae\*)*
: `Azon` *onto* a given `Set` — its `Codomain` *is* that `Set`.

> `Surjective<A,S> :: COD<A> == S`

*NOTE*: the `Set` must be given — `Codomain` *is* the image, so every `Azon` is `Surjective` onto its own `Codomain`.

## Presence and Absence

Presence
: `Set` of all `Azon` whose `Domain` or `Codomain` contains the reference `Azon`.

> `APPEAR<a> { X -> (a ∈ DOM<X> ∨ a ∈ COD<X>)[X] }`

*NOTE*: The existential scope of an entity — every context in which it participates.

---

Universe
: `Set` closed under `Presence`.

> `Universe<P> :: k ∈ P ⟹ APPEAR<k> ⊆ P`

*NOTE*: The `Universe` of discourse for logical reasoning — every entity's full set of contexts is also inside.

---

Complement *(Reshta)*
: `Set` of all `Elements` of `Universe` that do NOT belongs to the reference `Set`.

> `∁<P,S> { x -> (x ∈ P ∧ x ∉ S)[x] }`

*NOTE*: Always relative to a `Universe`.

---

Absence *(Nigda)*
: `Set` of all `Azons` that do NOT belongs to the `Universe`.

> `Absence<P> { x -> (x ∉ P)[x] }`

*NOTE*: `Complement` is complement *within* `P`; `Absence` is complement *of* `P` — the impossible relative to a given `Universe` of discourse.

## Topology

Collection *(Kupa)*
: A `Set` of `Set`s.

> `K = {S₁, S₂, …, Sₙ}`

---

Intersection *(Vseqa)*
: `Set` of `Elements` which belong to every `Set` of the `Collection`.

> `⋂<K> { x -> (|K ∖ ∋<x>| < 1)[x] }`

non-intersecting
: A `Collection` no two of whose `Sets` share an `Element`.

> `non-intersecting<K> :: ({S₁, S₂} ⊆ K ∧ x ∈ S₁ ∧ x ∈ S₂) ⟹ S₁ IS S₂`

**DEF**: for two `Set`s, `∩<A,B> = ⋂<{A, B}>` — short `A ∩ B`, the binary form used where a `Collection` is not needed.

---

Union *(Sojma)*
: `Set` of `Elements` which belong to at least one `Set` of the `Collection`.

> `⋃<K> { x -> (|K ∩ ∋<x>| > 0)[x] }`

saturated to S
: A `Collection` whose `Union` *is* the reference `Set`.

> `saturated<K,S> :: ⋃<K> = S`

**DEF**: for two `Set`s, `∪<A,B> = ⋃<{A, B}>` — short `A ∪ B`, the binary form.

---

Set-Difference *(Dapasok)*
: `Set` of `Elements` in the `Union` of the `Collection` but NOT in the reference `Set`.

> `SetDiff<K,S> { x -> (x ∈ ⋃<K> ∧ x ∉ S)[x] }`

---

PowerSet *(Gurba)*
: The `Collection` of all `Subset` of the reference `Set`.

> `2^S { Q -> (Q ⊆ S)[Q] }`

---

Cluster *(Kryga)*
: A `Collection` of (`Sets` =: **`Fragment`**) that is `non-intersecting` AND saturated to a reference `Set`.

> `Cluster<K,S> :: non-intersecting<K>, saturated<K,S>`

*NOTE*: A partition — mutually disjoint `Sets` whose `Union` covers the reference `Set`.

*NOTE*: `{∁<P,S>, S}` is a `Cluster` saturated to the `Universe` `P`: `Cluster<{∁<P,S>, S}, P>`.

---

Taxon
: A `Cluster` of the `Domain` of an `Azon`, one `Fragment` per `Spond`: two `Args` share a `Fragment` exactly when they get the same `Spond`.

> `Taxon<K,A> :: Cluster<K, DOM<A>>, (F ∈ K ∧ {a, b} ⊆ F) ⟹ A[a] IS A[b], ({F₁, F₂} ⊆ K ∧ a ∈ F₁ ∧ b ∈ F₂ ∧ A[a] IS A[b]) ⟹ F₁ IS F₂`
