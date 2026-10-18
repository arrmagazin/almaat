---
title: "Structures"
description: "The Structure: a Set equipped with Operations constrained by Laws, and the standard algebras built from them — magmas, ringoids, and lattices."
keywords: [math, structures]
---
## Definitions

---

Dependency<Form, SourceMask, TargetMask> *(Zaleznasc\*)*
: `Azon` that responds

- to the `Slice` of a `Point` under (one `Mask` =: **`SourceMask`**)
- with the `Slice` of the *same* `Point` under (another `Mask` =: **`TargetMask`**),
for *every* `Point` of the `Form`.

> `Dependency<D,Form,SourceMask,TargetMask> :: p ∈ Form ⟹ D[SourceMask.p] IS TargetMask.p`

*NOTE*: the `Form` holds the `Dependency` only if the response is single-valued — `Points` sharing an `Slice` under `SourceMask` share it under `TargetMask` too.

---

KeyMask<Origin> *(Zrez Kliuchow\*)*
: `Mask` whose `Slice` responds *back* with its own `Point`, for *every* `Point` of the `Origin`.

> `KeyMask<M,Origin> :: |{ D -> (|Origin ∖ { p -> (D[M.p] IS p)[p] }| < 1)[D] }| > 0`

*NOTE*: equivalently, `Dependency<D, Origin, M, Id>` holds for some `D` — the `Slice` determines the whole `Point`. Hence the `Mask` is `Bijective` from the `Origin` onto its `View`: distinct `Points` never share an `Slice`.

---

Key<KeyMask> *(Kliuch\*)*
: `Slice` of a `Point` under a `KeyMask`.

> `Key<M,Origin,p> = M.p, KeyMask<M,Origin>, p ∈ Origin`

*NOTE*: a `Key` identifies its `Point` — no two `Points` of the `Origin` carry the same `Key`, and the `View` under a `KeyMask` is the `Set` of all `Keys` of the `Origin`.

---

Operation<Sⁿ> *(Aperacyja\*)*
: `Dependency` *from* `S×ⁿ` *into* `S`.

> `Operation<O,S,n> :: O: { x -> (Tuple<x,n> ∧ COD<x> ⊆ S)[x] } ⇒ S`

| Term | Arity | Signature | Examples |
| --- | --- | --- | --- |
| **Constant** | `0-ary` | `Operation<O,S,0>` | `unit { * -> 1 }`, `zero { * -> 0 }` |
| **Unary** | `1-ary` | `O: S ⇒ S` | `inc { a -> a + 1 }`, `neg { a -> 0 − a }`, `inv { a -> 1 / a }`, `⊥ { a -> ![a] }` |
| **Binary** | `2-ary` | `O: S × S ⇒ S` | `add { (a, b) -> a + b }`, `mul { (a, b) -> a · b }`, `∧`, `∨` |
| **n-ary** | `n-ary` | `Operation<O,S,n>` | `combine` over a `Tuple` of `n` operands |

---

Law *(Zakon\*)*
: a `Predicate` on the `Dependencies`.

> `Law<L,B,Basis> :: B ⊆ Basis, D ⊆ B ⟹ (L[D] IS U ∨ L[D] IS Z)`

*NOTE*: in the table `O` is the `Operation` (or relation) a `Law` constrains and `P` a second one; `O[(a, b)]` is the response to the `Tuple` `(a, b)`. A row's name, as a family over its `Operations` and the `Set` `S` (`Associative<O,S>`, `Distributive<O,P,S>`), states its formula; a name of two words is written as one (`PartialOrder`, `AbelianGroup`).

| Law | Formula | Notes |
| --- | --- | --- |
| **Neutral** | `\|S ∩ { e -> (\|S ∖ { a -> (O[(e, a)] IS a ∧ O[(a, e)] IS a)[a] }\| < 1)[e] }\| > 0` | Some element `e` leaves every operand unchanged, from both sides |
| **Inverse** | `a ∈ S ⟹ \|S ∩ { b -> (O[(a, b)] IS e ∧ O[(b, a)] IS e)[b] }\| > 0` | Every element is undoable; requires `Neutral` |
| **Idempotent** | `O[(a, a)] = a` | Repeating an operand has no effect |
| **Reflexive** | `a ∈ S ⟹ O[(a, a)]` | For relations: every element relates to itself |
| **Symmetric** | `{a, b} ⊆ S ⟹ (O[(a, b)] ⟹ O[(b, a)])` | For relations; with reflexivity and transitivity, defines an equivalence |
| **Antisymmetric** | `({a, b} ⊆ S ∧ O[(a, b)] ∧ O[(b, a)]) ⟹ a IS b` | Distinguishes orders from equivalences |
| **Transitive** | `({a, b, c} ⊆ S ∧ O[(a, b)] ∧ O[(b, c)]) ⟹ O[(a, c)]` | Chains relate |
| **Equivalence** | `Reflexive<O,S>, Symmetric<O,S>, Transitive<O,S>` | Partitions `S` into classes of interchangeable elements; defines a setoid |
| **Partial order** | `Reflexive<O,S>, Antisymmetric<O,S>, Transitive<O,S>` | Orders `S` without requiring every pair to be comparable; defines a poset |
| **Associative** | `O[(O[(a, b)], c)] = O[(a, O[(b, c)])]` | Order of grouping is irrelevant |
| **Commutative** | `O[(a, b)] = O[(b, a)]` | Order of operands is irrelevant |
| **Distributive** | `O[(a, P[(b, c)])] = P[(O[(a, b)], O[(a, c)])]` | One operation distributes over another |
| **Absorption** | `O[(a, P[(a, b)])] = a, P[(a, O[(a, b)])] = a` | Couples two operations in a lattice |
| **Latin square** | `{a, b} ⊆ S ⟹ (\|S ∩ { x -> (O[(a, x)] IS b)[x] }\| IS 1 ∧ \|S ∩ { y -> (O[(y, a)] IS b)[y] }\| IS 1)` | Unique left- and right-solutions; defines a quasigroup |
| **Jacobi** | `O[(a, O[(b, c)])] + O[(b, O[(c, a)])] + O[(c, O[(a, b)])] = 0` | A weakened associativity used in Lie algebras |

---

Structure *(Stroj)*
: `Set` of `Dependencies` under the `Law`.

> `Structure<S,L> :: L[S] IS U`

## Common Structures

Pointed Unary System
: `Structure` having `Units` with unary `Operation`.

> `zero = { * -> 0 }, unit = { * -> 1 }, inv = { 1 | * -> 0 | 1 }`

---

POSet
: partially ordered `Set`.

> `POSet<S,R> :: PartialOrder<R,S>`

---

Setoid
: `Set` with Equivalence.

> `Setoid<S,R> :: Equivalence<R,S>`

*NOTE*: `Setoid` and `Poset` differ by one `Law`: Symmetric gives equivalence, Antisymmetric gives partial order.

### Magma and Descendants

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
: `Semi-group` with a `unit` (LR-identity).

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
