---
title: "Numerals"
description: "Natural numbers (Number), rationals (Ratio, Rational), intervals, sequences, and selections."
keywords: [math, numerals]
---

# Numerals

## Natural Numbers

---

**`Singleton`** := `fixed` `Arrow`.

> `Singleton(c) := [c,c]`

*NOTE*: `Singleton` is also a `Set` with exactly one `Element`.

---

**`Plus`** := The `Azon` that responds to a `Tik` with its `Singleton`.

> `Plus := x → {x}`

---

**`Power`** := `Composition` of an `Azon` with itself or with its preceding Iteron.

> `A^0 := Unit`, `A^1 := A`, `A^n := A.A^(n-1)`

---

**`Induction<A>`** := `Set` of all `Powers` of `Azon`.

> `Induction := { Unit, A, A², A³, ... }`

---

**`Numerals`** := `Induction` of `Plus`.

> `Numerals := Induction<Plus>`

---

**`Number`** := `Element` of `Numerals`.

> `n ∈ Numerals`

---

**`Total Order`** := property of `Numbers` that for any `a, b` exactly one of `a < b`, `a = b`, `a > b` holds.

> `∀a, b: (a < b) ∨ (a = b) ∨ (b < a)`

## Rational Numbers

**`Add`** (`+`) := `Composition` of two `Numbers`, as `Powers` of `Plus`.

> `n + m := Plus^n.Plus^m`

---

**`Times`** (`·`) := `Iteron` of a `Number` by another.

> `n · m := (Plus^n)^m`

---

**`Ratio`** := `Arrow` between two `Numbers` with a non-unit `Tok`.

> `Ratio := [p, q], q ≠ Unit` — written `p/q`

---

**`Proportion`** := `Equivalence` of `Ratios` by cross-multiplication.

> `[p, q] ≃ [r, s] := (p·s = r·q)`

---

**`Rational`** := `Set` of all `Proportion`-equivalent `Ratios`.

> `p/q := {[r, s] : p·s = r·q}`

*NOTE*: every `Number` `n` is the `Rational` `n/1`; `Total Order` extends to `Rationals` by `p/q < r/s := (p·s < r·q)`.

## Ranges

**`Interval`** := `Set` of all `Numbers` less than `N`.

> `Interval(N) := {n : n < N}`

---

**`Ray`** := `Set` of all `Numbers` strictly not less than `N`.

> `Ray(N) := {n : n >= N}`

---

**`Range`** := `Set` of all `Numbers` strictly greater than `N` and at most `M`, with `N < M`.

> `Range(N, M) := {n : N < n ≤ M}`

## Sequentals

**`Tuple`** := `Azon` over `Interval`.

> `Tuple<N> :: Azon :: DOM = Interval(N)`

---

**`Queue`** := `Azon` over `Ray`.

> `Queue :: Azon :: DOM = Ray(N)`

---

**`Scoring`** := `Azon` into `Numerals`.

> `Scoring :: Azon :: COD ⊆ Numerals`

---

**`Vector`** := `Scoring` `Tuple`.

> `Vector :: Scoring :: DOM = Interval(N), COD ⊆ Numerals`

## Abstraction

**`Mask`** := `Injective` `Tuple` of length `n` into an `Interval` of length `m > n`.

> `Mask := Interval(n) ⇒ Interval(m::m > n)`

---

**`Abstraction`** := `Composition` of a `Mask` with a `Tuple`.

> `Abstraction := Mask.Tuple`

## Matrices

**`Matrix`** (2D-array) := A `Tuple` of `Tuples`.

> `Matrix :: Interval(n) ⇒ Tuple`

---

**`Flat`** := A `Tuple` built from a `Matrix` by joining each constituent `Tuple` end-to-end.

> `⊕ :: Matrix ⇒ Tuple`
