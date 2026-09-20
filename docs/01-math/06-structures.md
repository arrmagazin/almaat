---
title: "Structures"
description: "The Structure: a Set equipped with Operations constrained by Laws, and the standard algebras built from them — magmas, ringoids, and lattices."
keywords: [math, structures]
---
## Definitions

---

Dependency<Form, SourceMask, TargetMask>
: `Azon` that responds

- to the `Slice` of a `Point` under (one `Mask` =: **`SourceMask`**)
- with the `Slice` of the *same* `Point` under (another `Mask` =: **`TargetMask`**),
for *every* `Point` of the `Form`.

> `Dependency<Form, SourceMask, TargetMask> := SourceMask.p → TargetMask.p :: ∀p ∈ Form`

*NOTE*: the `Form` holds the `Dependency` only if the response is single-valued — `Points` sharing an `Slice` under `SourceMask` share it under `TargetMask` too.

---

KeyMask<Origin>
: `Mask` whose `Slice` responds *back* with its own `Point`, for *every* `Point` of the `Origin`.

> `KeyMask<Origin> :: ∀p ∈ Origin: ∃(KeyMask.p → p)`

*NOTE*: equivalently, `Dependency<Origin, Mask, Identity>` holds — the `Slice` determines the whole `Point`. Hence the `Mask` is `Bijective` from the `Origin` onto its `View`: distinct `Points` never share an `Slice`.

---

Key<KeyMask>
: `Slice` of a `Point` under a `KeyMask`.

> `Key<KeyMask> := KeyMask.p :: p ∈ Origin`

*NOTE*: a `Key` identifies its `Point` — no two `Points` of the `Origin` carry the same `Key`, and the `View` under a `KeyMask` is the `Set` of all `Keys` of the `Origin`.

---

Operation<Sⁿ>
: `Dependency` *from* `S×ⁿ` *into* `S`.

> `Operation<S> := S^ⁿ ⇒ S`

| Term | Arity | Signature | Examples |
| --- | --- | --- | --- |
| **Constant** | `0-ary` | `() ⇒ S` | `unit: () => 1`, `zero: () => 0` |
| **Unary** | `1-ary` | `S ⇒ S` | `inc: a => a+1`, `neg: a => -a`, `inv: a => a⁻¹`, `⊥: a => ¬a` |
| **Binary** | `2-ary` | `S × S ⇒ S` | `add: (a,b) => a+b`, `mul: (a,b) => a·b`, `∧, ∨` |
| **n-ary** | `n-ary` | `Sⁿ ⇒ S` | `combine: (a₁, …, aₙ) => …` |

---

Law
: a `Predicate` on the `Dependencies`.

> `Law<B ⊆ Basis> := Predicate<{ Dependency }>`

| Law | Formula | Notes |
| --- | --- | --- |
| **Inverse** | `∀a ∈ S: ∃a⁻¹ ∈ S: a * a⁻¹ = a⁻¹ * a = e` | Every element is undoable; requires identity |
| **Idempotent** | `a * a = a` | Repeating an operand has no effect |
| **Reflexive** | `∀a ∈ S: a * a` holds | For relations: every element relates to itself |
| **Symmetric** | `∀a, b ∈ S: a * b ⟹ b * a` | For relations; with reflexivity and transitivity, defines an equivalence |
| **Antisymmetric** | `∀a, b ∈ S: (a * b ∧ b * a) ⟹ a = b` | Distinguishes orders from equivalences |
| **Transitive** | `∀a, b, c ∈ S: (a * b ∧ b * c) ⟹ a * c` | Chains relate |
| **Equivalence** | `Reflexive ∧ Symmetric ∧ Transitive` | Partitions `S` into classes of interchangeable elements; defines a setoid |
| **Partial order** | `Reflexive ∧ Antisymmetric ∧ Transitive` | Orders `S` without requiring every pair to be comparable; defines a poset |
| **Associative** | `(a * b) * c = a * (b * c)` | Order of grouping is irrelevant |
| **Commutative** | `a * b = b * a` | Order of operands is irrelevant |
| **Distributive** | `a * (b ⊕ c) = (a * b) ⊕ (a * c)` | One operation distributes over another |
| **Absorption** | `a ∨ (a ∧ b) = a` and `a ∧ (a ∨ b) = a` | Couples two operations in a lattice |
| **Latin square** | `∀a, b ∈ S: ∃! x, y ∈ S: a * x = b ∧ y * a = b` | Unique left- and right-solutions; defines a quasigroup |
| **Jacobi** | `a * (b * c) + b * (c * a) + c * (a * b) = 0` | A weakened associativity used in Lie algebras |

---

Structure
: `Set` of `Dependencies` under the `Law`.

> `Structure<Dependencies,Law> := S{ Dependency } :: Law(S) === T`

## Common Structures

Pointed Unary System
: `Structure` having `Units` with unary `Operation`.

> `zero: () => 0, unit: () => 1, inv: (x) => x == 1 ? 0 : 1`

---

POSet
: partially ordered `Set`.

> `≤: (a,b) => (a < b) ? T : F :: Partial order`

---

Setoid
: `Set` with Equivalence.

> `eq: (a,b) => a == b ? T : F :: Equivalence`

*NOTE*: `Setoid` and `Poset` differ by one `Law`: Symmetric gives equivalence, Antisymmetric gives partial order.

### Magma and Descendants

Magma / Groupoid
: `Structure` with a single binary `Operation`.

> `op: (a,b) => c`

---

Quasi-group
: `Magma` under the Latin square `Law`.

> `∃! x, y: a * x = b ∧ y * a = b`

---

Loop
: `Quasi-group` with identity.

> `Loop :: Quasi-group :: ∃e ∈ S: e * a = a * e = a`

---

Semi-group
: `associative` `Magma`.

> `combine: a,b => (...) => b(a(...))`

---

Semi-lattice
: idempotent and commutative `Semi-group`.

> `Semi-lattice :: Semi-group :: Idempotent + Commutative`

---

Monoid
: `Semi-group` with a `unit` (LR-identity).

> `unit: () => 1`

---

Group
: `Monoid` with an `inverse` (LR-inverse).

> `inverse: a => -a`

---

Abelian Group
: `Group` with commutative `sum`.

> `sum: (a,b) => c :: Associative + Commutative`

## Ringoid Structures

Ringoid
: `Set` with `add` and `multiply`, multiplication distributing over addition.

> `Ringoid := (S, +, ·) :: a·(b + c) = a·b + a·c`

---

Semiring
: `Ringoid` that is also a `Monoid` under each `Operation`.

> `Semiring :: Ringoid :: Monoid(S, +) ∧ Monoid(S, ·)`

---

Near-ring
: `Set` whose `add` is a `Group` and whose `multiply` is a `Semi-group`, distributing on one side only.

> `Near-ring := (S, +, ·) :: Group(S, +) ∧ Semi-group(S, ·) ∧ (a + b)·c = a·c + b·c`

---

Ring
: `Semiring` whose `add` is an `Abelian Group`.

> `Ring :: Semiring :: Abelian Group(S, +)`

---

Boolean Ring
: commutative `Ring` with idempotent multiplication.

> `Boolean Ring :: Ring :: a·b = b·a ∧ a·a = a`

---

Field
: commutative `Ring` with a multiplicative `inverse` for every nonzero element.

> `Field :: Ring :: a·b = b·a ∧ ∀a ≠ 0: ∃a⁻¹ ∈ S: a·a⁻¹ = 1`

## Lattice Structures

Lattice
: `Poset` with `∧` (meet, infimum) and `∨` (join, supremum).

> `Lattice :: Commutative + Associative + Absorption`

---

Complete Lattice
: `Lattice` with arbitrary meets and joins.

> `Complete Lattice :: Lattice :: ∀K ⊆ S: ∃⋀K ∧ ∃⋁K`

---

Bounded Lattice
: `Lattice` with `1` (greatest, top) and `0` (least, bottom).

> `0 ≤ x ≤ 1 :: ∀x ∈ S`

---

Complemented Lattice
: `Bounded Lattice` with unary `⊥` complementation.

> `a ∨ a⊥ = 1 ∧ a ∧ a⊥ = 0`

---

Distributive Lattice
: `Lattice` where meet and join distribute over each other.

> `Distributive Lattice :: Lattice :: a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)`

---

Boolean Algebra
: `Complemented Lattice` that is also a `Distributive Lattice`.

> `Boolean Algebra :: Complemented Lattice ∧ Distributive Lattice`
