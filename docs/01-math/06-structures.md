---
title: "Structures"
description: "The Structure: a Set of Dependencies under a Law — Dependency, Key, Operation, and the Laws that constrain them."
keywords: [math, structures]
---

Dependency *(Zalezhnost)*
: `Azon` that responds

- to the `Slice` of a `Point` under (one `Mask` =: **`SourceMask`**)
- with the `Slice` of the *same* `Point` under (another `Mask` =: **`TargetMask`**),
for *every* `Point` of the `Form`.

> `Dependency<D,Form,SourceMask,TargetMask> :: p ∈ Form ⟹ D[p.SourceMask] IS p.TargetMask`

*NOTE*: the `Form` holds the `Dependency` only if the response is single-valued — `Points` sharing an `Slice` under `SourceMask` share it under `TargetMask` too.

---

KeyMask *(Zrez Kliuchow\*)*
: `Mask` whose `Slice` responds *back* with its own `Point`, for *every* `Point` of the `Origin`.

> `KeyMask<M,Origin> :: |{ D -> (|Origin ∖ { p -> (D[p.M] IS p)[p] }| < 1)[D] }| > 0`

*NOTE*: equivalently, `Dependency<D, Origin, M, Id>` holds for some `D` — the `Slice` determines the whole `Point`. Hence the `Mask` is `Bijective` from the `Origin` onto its `View`: distinct `Points` never share an `Slice`.

---

Key *(Kliuch\*)*
: `Slice` of a `Point` under a `KeyMask`.

> `Key<M,Origin,p> := p.M, KeyMask<M,Origin>, p ∈ Origin`

*NOTE*: a `Key` identifies its `Point` — no two `Points` of the `Origin` carry the same `Key`, and the `View` under a `KeyMask` is the `Set` of all `Keys` of the `Origin`.

---

Operation *(Aperacyja\*)*
: `Dependency` *from* `S×ⁿ` *into* `S`.

> `Operation<O,Sⁿ> :: O: { x -> (Tuple<x,n> ∧ COD<x> ⊆ S)[x] } ⇒ S`

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

## SEE ALSO

- [Common Structures](_references/06-common-structures.md) — the standard algebras built on Structure: setoids, magmas, ringoids, and lattices.
