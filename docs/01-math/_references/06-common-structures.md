---
title: "Common Structures"
description: "The standard algebras built on Structure — setoids, magmas, ringoids, and lattices."
keywords: [appendices, structures, algebra]
---

## Setoids

Pointed Unary System
: `Structure` having `Units` with unary `Operation`.

> `zero := { * -> 0 }, unit := { * -> 1 }, inv := { 1 | * -> 0 | 1 }`

---

POSet
: partially ordered `Set`.

> `POSet<S,R> :: PartialOrder<R,S>`

---

Setoid
: `Set` with Equivalence.

> `Setoid<S,R> :: Equivalence<R,S>`

*NOTE*: `Setoid` and `Poset` differ by one `Law`: Symmetric gives equivalence, Antisymmetric gives partial order.

## Magma and Descendants

Magma / Groupoid
: `Structure` with a single binary `Operation`.

> `Magma<S,O> :: O: S × S ⇒ S`

---

Quasi-group
: `Magma` under the Latin square `Law`.

> `Quasi-group<S,O> :: Magma<S,O>, LatinSquare<O,S>`

---

Loop
: `Quasi-group` with identity.

> `Loop<S,O> :: Quasi-group<S,O>, Neutral<O,S>`

---

Semi-group
: `associative` `Magma`.

> `Semi-group<S,O> :: Magma<S,O>, Associative<O,S>`

*NOTE*: `Composition` is one: `combine { (a, b) -> a.b }`.

---

Semi-lattice
: idempotent and commutative `Semi-group`.

> `Semi-lattice<S,O> :: Semi-group<S,O>, Idempotent<O,S>, Commutative<O,S>`

---

Monoid
: `Semi-group` with a `Uniton` (LR-identity).

> `Monoid<S,O> :: Semi-group<S,O>, Neutral<O,S>`

---

Group
: `Monoid` with an `inverse` (LR-inverse).

> `Group<S,O> :: Monoid<S,O>, Inverse<O,S>`

---

Abelian Group
: `Group` with commutative `sum`.

> `AbelianGroup<S,O> :: Group<S,O>, Commutative<O,S>`

## Ringoid Structures

Ringoid
: `Set` with `add` and `multiply`, multiplication distributing over addition.

> `Ringoid<S,add,mul> :: Distributive<mul,add,S>`

---

Semiring
: `Ringoid` that is also a `Monoid` under each `Operation`.

> `Semiring<S,add,mul> :: Ringoid<S,add,mul>, Monoid<S,add>, Monoid<S,mul>`

---

Near-ring
: `Set` whose `add` is a `Group` and whose `multiply` is a `Semi-group`, distributing on one side only.

> `Near-ring<S,add,mul> :: Group<S,add>, Semi-group<S,mul>, mul[(add[(a, b)], c)] = add[(mul[(a, c)], mul[(b, c)])]`

---

Ring
: `Semiring` whose `add` is an `Abelian Group`.

> `Ring<S,add,mul> :: Semiring<S,add,mul>, AbelianGroup<S,add>`

---

Boolean Ring
: commutative `Ring` with idempotent multiplication.

> `BooleanRing<S,add,mul> :: Ring<S,add,mul>, Commutative<mul,S>, Idempotent<mul,S>`

---

Field
: commutative `Ring` with a multiplicative `inverse` for every nonzero element.

> `Field<S,add,mul> :: Ring<S,add,mul>, Commutative<mul,S>, (a ∈ S ∧ ![a IS 0]) ⟹ |S ∩ { b -> (mul[(a, b)] IS 1)[b] }| > 0`

## Lattice Structures

Lattice
: `Poset` with `∧` (meet, infimum) and `∨` (join, supremum).

> `Lattice<S,meet,join> :: Commutative<meet,S>, Commutative<join,S>, Associative<meet,S>, Associative<join,S>, Absorption<meet,join,S>`

---

Complete Lattice
: `Lattice` with arbitrary meets and joins.

> `CompleteLattice<S,meet,join> :: Lattice<S,meet,join>, K ⊆ S ⟹ (⋀<K> ∈ S ∧ ⋁<K> ∈ S)`

---

Bounded Lattice
: `Lattice` with `1` (greatest, top) and `0` (least, bottom).

> `BoundedLattice<S,meet,join> :: Lattice<S,meet,join>, x ∈ S ⟹ 0 ≤ x ≤ 1`

---

Complemented Lattice
: `Bounded Lattice` with unary `⊥` complementation.

> `ComplementedLattice<S,meet,join,⊥> :: BoundedLattice<S,meet,join>, join[(a, ⊥[a])] = 1, meet[(a, ⊥[a])] = 0`

---

Distributive Lattice
: `Lattice` where meet and join distribute over each other.

> `DistributiveLattice<S,meet,join> :: Lattice<S,meet,join>, Distributive<meet,join,S>`

---

Boolean Algebra
: `Complemented Lattice` that is also a `Distributive Lattice`.

> `BooleanAlgebra<S,meet,join,⊥> :: ComplementedLattice<S,meet,join,⊥>, DistributiveLattice<S,meet,join>`
