# Correspondence to Arithmetic

Arithmetic is not introduced as a new primitive — it is *recovered* from `Number`, `Interval`, `Tuple`, and `Concatenation`.

---

**`0`** := `Zero` : `0 := Zero`

---

**`Successor`** :=  `Plusator` :  `succ(n) := n -> {n}`

---

**`1`** := The successor of `Zero` : `1 := succ(0) = {0}`

---

**`Predecessor`** := The `Inverse` of `Successor` on non-zero `Number` : `pred(n) := n -> m :: succ(m) = n , pred(0) = 0`

---

**`Addition`** := `Composition` of two : `a + b :=  a.b`

---

**`Subtraction`** :=  `b - a := c :: a + c =b` — defined only when `a ≤ b`

---

**`Multiplication`** := `Composition` of a `Matrix` of `a` rows, each of length `b` : `a * b := ⊕ (Row_b)^a`

---

**`Exponentiation`** := The count of `Tuple` of length `a` over `BI(b)` — i.e., functions `BI(a) → BI(b)` : `b^a := |{f : BI(a) → BI(b)}|`

---

**`Less-than`** := `Subset` on the Von Neumann encoding.

> `a < b ⟺ a ∈ b ⟺ a ⊊ b`; `a ≤ b ⟺ a ⊆ b`

---

**`Divisibility`** := `a` divides `b` iff some `c` makes `b = a × c`.

> `a ∣ b ⟺ ∃c: b = a × c`

**Properties:**

- **Associativity of `+` and `×`** is inherited from `Concatenation`: `(a + b) + c` and `a + (b + c)` both correspond to the same flattened `Tuple`, and `Concatenation` flattening is associative by [02-graph](../03-graph.md) line 47.
- **Commutativity of `+` and `×`** follows from the bijective re-indexing of `Matrix` rows (a `Selection-Mask` of length `n` onto itself).
- **Distributivity** `a × (b + c) = a × b + a × c` corresponds to splitting a `Matrix` of `a` rows of length `b + c` into two `Matrix` along the column boundary.
- **Order** `≤` coincides with `Subset` on the Von Neumann encoding — so arithmetic order is a *special case* of set inclusion, not an extra relation.

*SEE ALSO*:

- [Peano axioms (Wikipedia)](https://en.wikipedia.org/wiki/Peano_axioms) — recursive definition of `Number` via `Successor`.
- [Von Neumann ordinal (Wikipedia)](https://en.wikipedia.org/wiki/Ordinal_number#Von_Neumann_definition_of_ordinals) — the `n = {0, 1, ..., n-1}` construction.
- [Natural-number arithmetic (Wikipedia)](https://en.wikipedia.org/wiki/Natural_number#Algebraic_properties_satisfied_by_the_natural_numbers) — the algebraic laws recovered above.
