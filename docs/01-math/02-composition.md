---
title: "Composition"
description: "The Arrow and the Composition that feeds one Azon's output into another — associativity, bijection, wel-consumption, Identity, Null."
keywords: [math, composition]
---

## Properties

Fitted *(Prygnany\*)*
: a `Composition` whose `Object` is `valent` on the entire output of its `Subject`:

> `A.B :: COD(A) = DOM(B)`.

*NOTE*: `Fitted` *is* `Surjective` with the target `Set` supplied by the `Object` — `Fitted(A.B) ⟺ Surjective(A, DOM(B))`.

Bijective *(Uzaemna Adnaznaqnae\*)*
: `Azon` for which there *exists* an (`Azon`=: **`Inverse`**) whose left and right `Composition` give the `Domain` and `Codomain` of the `Azon`.

> `A.A⁻¹ = DOM(A) ∧ A⁻¹.A = COD(A)`

*NOTE*: `Bijective` splits into `Injective` and `Fitted` — the first gives the `Inverse` its uniqueness, the second its totality; neither side is left unreached.

> `Bijective(A) ⟺ Injective(A) ∧ Fitted(A.A⁻¹) ∧ Fitted(A⁻¹.A)`

## Currying

---

Currying *(Karyng\*)*
: `Azon` from `Azons` over `[x,y]` into an `Azons` that responds to `x` with another `Azon` awaiting `y`.

> `curry :: ([x,y] → z) ≃ (x → (y → z))`

*NOTE*: both sides respond with the same `z`; `Currying` unfolds any arity into a chain of single-`Arg` `Azons`.

---

Partial Application *(Qastkovae Padavanne\*)*
: The `Azon` obtained by supplying some, but not all, of the `Args` a curried `Azon` expects.

> `PartialApp(A, x) := curry(A)(x)`

*NOTE*: the result is an `Azon` of reduced arity, still awaiting the remaining `Args`.
