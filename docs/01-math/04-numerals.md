---
title: "Numerals"
description: "Natural numbers (Number), rationals (Ratio, Rational), intervals, sequences, and selections."
keywords: [math, numerals]
---
## Natural Numbers

Plus *(Prybawka\*)*
: The `Azon` that responds to a `Arg` with its `Singleton`.

> `Plus { x -> @<x> }`

---

Power
: `Composition` of an `Azon` with itself or with its preceding Iteron.

> `A^0 = U, A^1 = A, A^n = A.A^(n − 1)`

---

Induction<A>
: `Set` of all `Powers` of `Azon`.

> `Induction<A> = {U, A, A², A³, …}`

---

Numerals *(Liqby)*
: `Induction` of `Plus`.

> `Numerals = Induction<Plus>`

---

Number *(Lik)*
: `Element` of `Numerals`.

> `Number<n> :: n ∈ Numerals`

---

Total Order *(Powny Lad)*
: property of `Numbers` that for any `a, b` exactly one of `a < b`, `a IS b`, `a > b` holds.

> `{a, b} ⊆ Numerals ⟹ (a < b ∨ a IS b ∨ b < a)`

## Rational Numbers

Add (+)
: `Composition` of two `Numbers`, as `Powers` of `Plus`.

> `n + m = Plus^n.Plus^m`

---

Times (·)
: `Iteron` of a `Number` by another.

> `n · m = (Plus^n)^m`

---

Ratio
: `Arrow` between two `Numbers` with a non-unit `Spond`.

> `Ratio<p,q> = (p, q), ![q IS U]` — short `p / q`

---

Proportion
: `Equivalence` of `Ratios` by cross-multiplication.

> `≃<r,s> { (p, q) | * -> p · s IS r · q | Z }` — short `(p, q) ≃ (r, s)`

---

Rational
: `Set` of all `Proportion`-equivalent `Ratios`.

> `Rational<p,q> { (r, s) | * -> (p · s IS r · q)[*] | Z }`

*NOTE*: every `Number` `n` is the `Rational` `Rational<n,1>`; `Total Order` extends to `Rationals` by `p / q < r / s ⟺ p · s < r · q`.

## Ranges

Interval *(Dlina)*
: `Set` of all `Numbers` less than `N`.

> `Interval<N> { n -> (n < N)[n] }`

---

Ray *(Promenj)*
: `Set` of all `Numbers` strictly not less than `N`.

> `Ray<N> { n -> (n ≥ N)[n] }`

---

Range *(Adrezok)*
: `Set` of all `Numbers` strictly greater than `N` and at most `M`, with `N < M`.

> `Range<N,M> { n -> (N < n ≤ M)[n] }`

## Sequentals

Tuple *(Radok)*
: `Azon` over `Interval`.

> `Tuple<A,N> :: DOM<A> == Interval<N>`

---

Queue *(Qerga)*
: `Azon` over `Ray`.

> `Queue<A,N> :: DOM<A> == Ray<N>`

---

Scoring *(Padlik\*)*
: `Azon` into `Numerals`.

> `Scoring<A> :: COD<A> ⊆ Numerals`

---

Vector *(Vektar\*)*
: `Scoring` `Tuple`.

> `Vector<A,N> :: Scoring<A>, Tuple<A,N>`

## Slice

Mask *(Maska)*
: `Injective` `Tuple` of length `n` into an `Interval` of length `m > n`.

> `Mask<A,n,m> :: Tuple<A,n>, Injective<A>, A: Interval<n> ⇒ Interval<m>, m > n`

---

Slice *(Zrez)*
: `Composition` of a `Mask` with a `Tuple`.

> `Slice<M,T> = M.T`

## Matrices

Matrix (2D-array) *(Mantra)*
: A `Tuple` of `Tuples`.

> `Matrix<A,n> :: Tuple<A,n>, i ∈ Interval<n> ⟹ Tuple<A[i], |DOM<A[i]>|>`

---

Flat *(Sklejka)*
: A `Tuple` built from a `Matrix` by joining each constituent `Tuple` end-to-end.

> `⊕ :: Matrix<M,n> ⟹ Tuple<⊕[M], |DOM<⊕[M]>|>`
