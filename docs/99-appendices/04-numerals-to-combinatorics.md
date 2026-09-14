# Correspondence to Combinatorics

Combinatorics is the *counting* discipline over finite `Set` and `Tuple`. Every classical count reduces to a `Cardinality` of a constructed `Set` of `Tuple` or `Selection-Mask`. No new primitive is introduced — all variations (ordered/unordered, with/without repetition) are expressed by adjusting injectivity, surjectivity, and quotient-by-permutation of `Selection-Mask`.

---

**`Cardinality`** := The unique `Number` `n` for which a bijective `Tuple` exists from `BI(n)` onto a finite `Set` `S`.

> `|S| := n`

---

**`Tuple`** := A `Tuple` viewed as an ordered selection from a `Set`.

> `T :: BI(n) → S`

---

**`Permutation`** := A bijective `Tuple` from `BI(n)` onto itself.

> `π :: BI(n) → BI(n)` bijective

---

**`Factorial`** := The count of `Permutation` of `BI(n)`.

> `n! := |{π : BI(n) → BI(n) bijective}|`

*NOTE*: Recurrence: `0! := 1`, `succ(n)! := succ(n) × n!`.

---

**`Arrangement`** := A `Selection-Mask` of length `k` into `BI(n)` (order matters).

> `A(n, k) := n! / (n − k)!`

---

**`Combination`** := A `Selection-Mask` of length `k` into `BI(n)` taken modulo permutation of the source.

> `C(n, k) := A(n, k) / k! = n! / (k! × (n − k)!)`

---

**`Binomial Coefficient`** := The count of `Subset` of size `k` of `BI(n)`.

> `C(n, k) = |{S ⊆ BI(n) : |S| = k}|`

---

**`Power-Count`** := The `Cardinality` of the `Power-Set` of a finite `Set` (see [01-set](../02-set.md)).

> `|2^S| = 2^|S| = ∑_{k=0}^n C(n, k)`

---

**`Multiset`** := A `Grade` whose `Codomain` is `Number` — counts occurrences.

> `M :: S → Number`

*NOTE*: Generalizes `Set` by allowing multiplicity.

---

**`Composition-of-Number`** := A `Tuple` of positive `Number` summing to `n`.

> `[n₁, ..., nₖ] : ∑nᵢ = n, nᵢ > 0`

*NOTE*: An ordered partition of `n`. Distinct from `Composition` of [02-graph](../03-graph.md).

---

**`Partition-of-Number`** := A `Multiset` of positive `Number` summing to `n`.

> `M : ∑(k · M(k)) = n, k > 0`

*NOTE*: An unordered partition of `n`.

**Properties:**

- **Every combinatorial count is an arithmetic `Cardinality`** — so combinatorics is layered *on top of* the arithmetic correspondence above, not parallel to it.
- **`Selection-Mask` is the central primitive.** The twelvefold way of classical combinatorics corresponds exactly to four binary toggles on `Selection-Mask`:
  - is the mask *injective*? (no repetition)
  - is it *surjective*? (every target hit)
  - is the source *quotiented by permutation*? (order ignored)
  - is the target *quotiented by permutation*? (labels ignored)
- **Pascal's identity** `C(n, k) = C(n−1, k−1) + C(n−1, k)` corresponds to partitioning the `Subset` of size `k` by whether they contain a chosen `Element` — i.e., a `Cluster` (see [01-set](../02-set.md)) of the `Power-Set` indexed by membership.
- **Bijective proof.** Equalities between counts (`C(n, k) = C(n, n−k)`, the binomial theorem) are most naturally expressed as bijective `Tuple` between the two `Set` being counted — staying inside the framework rather than appealing to algebraic manipulation.

*SEE ALSO*:

- [Combinatorics (Wikipedia)](https://en.wikipedia.org/wiki/Combinatorics) — overview of the discipline.
- [Twelvefold way (Wikipedia)](https://en.wikipedia.org/wiki/Twelvefold_way) — the four-toggle classification mentioned above.
- [Binomial coefficient (Wikipedia)](https://en.wikipedia.org/wiki/Binomial_coefficient) — Pascal's identity and the binomial theorem.
- [Multiset (Wikipedia)](https://en.wikipedia.org/wiki/Multiset) — formal basis for `Grade` over `Number`.
- [Integer partition (Wikipedia)](https://en.wikipedia.org/wiki/Partition_(number_theory)) — partitions of `n` as `Multiset`.
