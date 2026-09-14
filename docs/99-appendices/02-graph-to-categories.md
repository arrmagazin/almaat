# Correspondence from graphs to Category Theory

**`Category`** := A `Set` of `Azon` closed under `Composition`, containing an `Unit` for each `Domain` / `Codomain` of its members.

> `C ⊆ 1` such that `∀A, B ∈ C: COD(B) ⊆ DOM(A) ⟹ A.B ∈ C`, and `∀X ∈ Obj(C): 1_X ∈ C`

---

**`Object`** := A `Domain` or `Codomain` of some `Azon` in `C` — itself a `Set` (hence an `Azon`, see [01-set](../02-set.md)).

> `Obj(C) := {DOM(A) : A ∈ C} ∪ {COD(A) : A ∈ C}`

---

**`Morphism`** := An `Azon` `A ∈ C`, viewed structurally as `f: DOM(A) → COD(A)`.

> `A: DOM(A) → COD(A)`

*NOTE*: No extra structure — an `Azon` *is* a `Morphism`.

---

**`Identity Morphism`** := The `Azon` that fixes every `Element` of an `Object` `X` and is empty elsewhere — `Unit` localized to `X` (see [00-azon](../00-azon.md)).

> `1_X(a) := (a ∈ X ? a : 0)`

*NOTE*: `A.1_{DOM(A)} = A` and `1_{COD(A)}.A = A`.

---

**`Isomorphism`** := A bijective `Azon` — exactly the **Bijection** case above.

> `A.A⁻¹ = 1_{COD(A)}` and `A⁻¹.A = 1_{DOM(A)}`

---

**`Monoid`** := A `Category` over a single `Object` `X` — every member is endogenous on `X` (see [01-set](../02-set.md)).

> `∀A ∈ M: DOM(A) = COD(A) = X`

---

**`Functor`** := An `Azon` that maps one `Category` into another, preserving `Composition` and `Unit` — equivalent to a **relational `Translation`** (see [02-graph](../03-graph.md)).

> `F(A.B) = F(A).F(B)`, `F(1_X) = 1_{F(X)}`

---

**`Natural Transformation`** := An `Azon` `η` assigning to each `Object` `X` an `Azon` `η_X: F(X) → G(X)` that commutes with two `Functor` `F, G`.

> `∀A ∈ C: η_{COD(A)} . F(A) = G(A) . η_{DOM(A)}`

**Notes:**

- A `Category` is *itself* an `Azon` — specifically a `Set` of `Azon`. Nothing leaves the framework.
- An `Object` is not a separate kind of entity: it is a `Set`, which is an `Azon` (see [01-set](../02-set.md)).
- The categorical axioms (left/right unit, associativity, chain-composability) are exactly the properties of `Composition` listed above — re-named, not re-asserted.
- `Functor` ≡ **relational `Translation`** of [02-graph](../03-graph.md): preserving `Path` is the same condition as preserving `Composition`.
- ALMA does not depend on category theory — but every `Composition`-based chapter (`Derivation` in `Language`, successor in `Number`, `Feedback` in `System`, `Validation` in `Mind`) inherits categorical structure for free.

## References

### Books

- Cormen, Leiserson, Rivest, Stein — *Introduction to Algorithms* (CLRS), 4th ed., MIT Press, 2022.
- Knuth — *The Art of Computer Programming*, vols. 1–4A, Addison-Wesley.
- Sedgewick, Wayne — *Algorithms*, 4th ed., Addison-Wesley, 2011.
- Skiena — *The Algorithm Design Manual*, 3rd ed., Springer, 2020.
- Tarjan — *Data Structures and Network Algorithms*, SIAM, 1983.

### Online

- [Wikipedia: List of data structures](https://en.wikipedia.org/wiki/List_of_data_structures)
- [Wikipedia: List of algorithms](https://en.wikipedia.org/wiki/List_of_algorithms)
- [VisuAlgo](https://visualgo.net) — interactive visualizations of data structures and algorithms.
- [cp-algorithms.com](https://cp-algorithms.com) — algorithm reference for competitive programming.
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com) — complexity summary by structure and operation.
