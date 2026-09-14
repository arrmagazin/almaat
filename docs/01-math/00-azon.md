---
title: "Azon"
description: "Azon is the framework's sole primitive: an ability to respond to each given Tik with a specific Tok, constrained by three axioms."
keywords: [math, azon]
---

## Azon

Ator
: *whoever* able to make *assignments* and *judgements* on them.

Azon
: an *assignment* from every (`Azon` =: **`Intus`**) to a some corresponding (`Azon` =: **`Outus`**)
: - made under the `Axioms` below
: - allows `Plausibility`.
: - allows `Sameness`.

> `Azon := x → y`

---

Sameness
: *judgement* on two `Azons` whether they are *one and the same* or not.

> `(A IS B) ∨ (A ISNT B)`

---

Plausibility
: *judgement* about *condition is plausible* on *(every|some|none)* `Azon`.

> `C :: (∀A: C<A>) ∨ (∃A: C<A>) ∨ (¬∃A: C<A>)`

## Equality

Intensional Distinguishability
: There exists an `Azon`-probe, whose responses to `a` and `b` do not the same.

> `a ≠ b := ∃p: p(a) ISNT p(b)`

*NOTE*: Contrapositive of Leibniz's *indiscernibility of identicals*, `a = b ⟹ ∀F: F(a) IS F(b)`. The probe `x` plays the role of the predicate `F`.

---

Intensional Equality
: Every `Azon`-probe responds to `a` and `b` with coinciding responses; the negation of `Intensional Distinguishability`.

> `a = b := ∀x: x(a) IS x(b)`

*NOTE*: Leibniz's *identity of indiscernibles*, `∀F: F(a) IS F(b) ⟹ a = b`, which second-order logic takes as the definition of equality (*Leibniz equality*). Here the quantifier ranges over `Azon` probes, not over a separate universe of predicates.

---

Extensional Equality
: Every `Azon` receives coinciding responses from `a` and `b`.

> `a == b := ∀x: a(x) IS b(x)`

*NOTE*: ZFC's *axiom of extensionality*, `∀z: z ∈ A IS z ∈ B ⟹ A = B`, and type theory's *function extensionality*, `(∀x: f(x) = g(x)) ⟹ f = g`. For a `Set` the two coincide, since membership *is* the response: `z ∈ S :: S(z) = z`.

---

Total Equality
: Both `Intensional Equality` and `Extensional Equality` hold.

> `a === b := (a = b) ∧ (a == b)`

*NOTE*: The two halves collapse into one in classical set theory, where an object *is* its extension. They stay apart here because an `Azon` is both operand and mapping — probed by `x(a)`, probing by `a(x)`.

## Zero and Unit

Zero
: `Azon` that *always* responds with itself to any `Intus`.

> `Zero := x → Zero`

---

empty
: a response with `Zero`.

> `empty(A, x) :: A(x) ISNT Zero`

---

valent
: any not `empty` response.

> `valent(A, x) :: A(x) ISNT Zero`

---

fixed
: a response with the `Intus` itself.

> `fixed(A, x) :: A(x) IS x`

---

Unit
: `Azon` that *always* responds `fixed`, *except* with `empty` — to itself.

> `Unit := x → (x IS Unit ? Zero : x)`

---

Predicate
: a `Azon` that *always* responds with `Unit` or `Zero`.

> `Predicate := x → (Unit | Zero)`

## Axioms

AXIOM-1 (Halt)
: The response to `Zero` is *always* `Zero`.

> `∀A: A(0) IS 0`

---

AXIOM-2 (Non-Self-Valent)
: The response to oneself is *always* `Zero`.

> `∀A: A(A) IS 0`

---

AXIOM-3 (Non-Self-Generation)
: non-zero `Azon` cannot respond with itself

> `∀A/Zero: A(x) ISNT A`

## SEE ALSO

- [Identity of Indiscernibles (Wikipedia)](https://en.wikipedia.org/wiki/Identity_of_indiscernibles) — `∀x∀y[∀F(Fx IS Fy) → x = y]`; grounds `≠` and `=`.
- [Axiom of Extensionality (Wikipedia)](https://en.wikipedia.org/wiki/Axiom_of_extensionality) — `∀x∀y[∀z(z ∈ x IS z ∈ y) → x = y]`; grounds `==` for a `Set`.
- [Extensionality (Wikipedia)](https://en.wikipedia.org/wiki/Extensionality) — the general principle, including function extensionality: equality by external behaviour rather than internal definition.
- [Intension (Wikipedia)](https://en.wikipedia.org/wiki/Intension) — intension as the properties connoted, extension as the referents: why `x(a)` is the intensional side and `a(x)` the extensional one.
- [Extensional and intensional definitions (Wikipedia)](https://en.wikipedia.org/wiki/Extensional_and_intensional_definitions) — the same contrast applied to definitions: listing instances versus stating conditions.
- [Extensional type theory (nLab)](https://ncatlab.org/nlab/show/extensional+type+theory) — intensional identity is so named because it does *not* validate function extensionality; the reason `==` is the extensional criterion.
- [Equality (mathematics) (Wikipedia)](https://en.wikipedia.org/wiki/Equality_(mathematics)) — broader survey of equality notions.
- [Russell's paradox (Wikipedia)](https://en.wikipedia.org/wiki/Russell%27s_paradox) — `R = {x | x ∉ x} ⟹ (R ∈ R ⟺ R ∉ R)`; the contradiction from unrestricted self-membership that `AXIOM-2` forecloses by fixing `A(A) IS 0`.
