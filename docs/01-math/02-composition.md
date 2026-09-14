---
title: "Composition"
description: "The Arrow and the Composition that feeds one Azon's output into another — associativity, bijection, wel-consumption, Identity, Null."
keywords: [math, composition]
---

# Composition

## Definitions

Arrow
: an `Azon` that responds with `Object` only once - to the `Subject`, otherwise - `emptily`.

> `Arrow[Subject, Object] := x → (x IS Subject ? Object : Zero)`

---

Composition
: The `Azon` built on `Arrow` by *assuming* the output of `Subject` as the input of the `Object`.

> `.[a,b] := x → b(a(x))`

*NOTE*: `Composition` is **`associative`** by construction.

> `(A.B).C = A.(B.C)`

## Identity and Null

---

Identity<A>
: Composition-preserving (neutral) `Azon` for A.

> `Id :: Id.A = A.Id = A`

*NOTE*: `Unit` is the *universal* `Identity` (may be even restricted to `DOM(A)` on the left, `COD(A)` on the right).

---

Null
: Composition-absorbing (annihilating) `Azon`.

> `Null.A = A.Null = Null`

*NOTE*: `Zero` is *universal* `Null`.

## Properties

Fitted
: a `Composition` whose `Object` is `valent` on the entire output of its `Subject`:

> `A.B :: COD(A) = DOM(B)`.

*NOTE*: `Fitted` *is* `Surjective` with the target `Set` supplied by the `Object` — `Fitted(A.B) ⟺ Surjective(A, DOM(B))`.

Bijective
: `Azon` for which there *exists* an (`Azon`:= **`Inverse`**) whose left and right `Composition` give the `Domain` and `Codomain` of the `Azon`.

> `A.A⁻¹ = DOM(A) ∧ A⁻¹.A = COD(A)`

*NOTE*: `Bijective` splits into `Injective` and `Fitted` — the first gives the `Inverse` its uniqueness, the second its totality; neither side is left unreached.

> `Bijective(A) ⟺ Injective(A) ∧ Fitted(A.A⁻¹) ∧ Fitted(A⁻¹.A)`

## Currying

---

Currying
: `Azon` from `Azons` over `[x,y]` into an `Azons` that responds to `x` with another `Azon` awaiting `y`.

> `curry :: ([x,y] → z) ≃ (x → (y → z))`

*NOTE*: both sides respond with the same `z`; `Currying` unfolds any arity into a chain of single-`Tik` `Azons`.

---

Partial Application
: The `Azon` obtained by supplying some, but not all, of the `Tiks` a curried `Azon` expects.

> `PartialApp(A, x) := curry(A)(x)`

*NOTE*: the result is an `Azon` of reduced arity, still awaiting the remaining `Tiks`.
