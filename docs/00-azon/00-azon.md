---
title: "Azon"
description: "Azon is the sole primitive of the entire framework."
keywords: [azon]
---

Azon
: *assignment* from every (`Azon` =: **`Arg`**) to corresponding (`Azon` =: **`Spond`**)
: made by *judgement* whether some `Azon` (*IS the same or ISNT* =: **`coincident`**) to some another `Azon`.

> `A := * -> A[*]`

## Axioms

AXIOM-1 (Halt)
: The response to `Zero` is *always* `Zero`.

> `X1<A> := (0 | *) -> (0 | A[*])`

---

AXIOM-2 (Non-Self-Valent)
: The response to the `Azon` itself is *always* `Zero`.

> `X2<A> := (A | *) -> (0 | A[*])`

---

AXIOM-3 (Non-Self-Generation)
: non-zero `Azon` cannot respond with itself

> `X2<A/0> :=  *  -> A[*]/A`

## Equality

Intensional Equality
: Every `Azon`-probe responds to `a` and `b` with coinciding responses; the negation of `Intensional Distinguishability`.

> `IEQ<A,B> := { <A,B> :: x -> x[A] IS x[B]`

*NOTE*: Leibniz's *identity of indiscernibles*, `∀F: F(a) IS F(b) ⟹ a = b`, which second-order logic takes as the definition of equality (*Leibniz equality*). Here the quantifier ranges over `Azon` probes, not over a separate universe of predicates.

---

Extensional Equality
: Every `Azon` receives coinciding responses from `a` and `b`.

> `EEQ<A,B> := { <A,B> :: x -> A[x] IS B[x]`

*NOTE*: ZFC's *axiom of extensionality*, `∀z: z ∈ A IS z ∈ B ⟹ A = B`, and type theory's *function extensionality*, `(∀x: f(x) = g(x)) ⟹ f = g`. For a `Set` the two coincide, since membership *is* the response: `z ∈ S :: S(z) IS z`.

---

Total Equality
: Both `Intensional Equality` and `Extensional Equality` hold.

> `EQ<A,B> := { <A,B> :: IEQ<A,B> AND EEQ<A,B>`

*NOTE*: The two halves collapse into one in classical set theory, where an object *is* its extension. They stay apart here because an `Azon` is both operand and mapping — probed by `x(a)`, probing by `a(x)`.

## Zero and Unit

Zero
: `Azon` that *always* responds with itself.

> `Zero := * -> Zero`

---

*DEF*: response with `Zero` *called* **`empty`**, otherwise **`valent`**.
*DEF*: response with the `Arg` itself *called* **`fixed`**, otherwise **`flexed`**.

---

Unit
: `Azon` that *always* responds `fixed`, *except* with `empty` — to itself.

> `Unit := ( Unit | * ) -> ( Zero | * )`

---

Predicate
: an `Azon` that *always* responds with `Unit` or `Zero`.

> `Predicate := * -> ( Unit | Zero )`

## SEE ALSO

- [Identity of Indiscernibles (Wikipedia)](https://en.wikipedia.org/wiki/Identity_of_indiscernibles) — `∀x∀y[∀F(Fx IS Fy) -> x = y]`; grounds `≠` and `=`.
- [Axiom of Extensionality (Wikipedia)](https://en.wikipedia.org/wiki/Axiom_of_extensionality) — `∀x∀y[∀z(z ∈ x IS z ∈ y) -> x = y]`; grounds `==` for a `Set`.
- [Extensionality (Wikipedia)](https://en.wikipedia.org/wiki/Extensionality) — the general principle, including function extensionality: equality by external behaviour rather than internal definition.
- [Intension (Wikipedia)](https://en.wikipedia.org/wiki/Intension) — intension as the properties connoted, extension as the referents: why `x(a)` is the intensional side and `a(x)` the extensional one.
- [Extensional and intensional definitions (Wikipedia)](https://en.wikipedia.org/wiki/Extensional_and_intensional_definitions) — the same contrast applied to definitions: listing instances versus stating conditions.
- [Extensional type theory (nLab)](https://ncatlab.org/nlab/show/extensional+type+theory) — intensional identity is so named because it does *not* validate function extensionality; the reason `==` is the extensional criterion.
- [Equality (mathematics) (Wikipedia)](https://en.wikipedia.org/wiki/Equality_(mathematics)) — broader survey of equality notions.- [Russell's paradox (Wikipedia)](https://en.wikipedia.org/wiki/Russell%27s_paradox) — `R = {x | x ∉ x} ⟹ (R ∈ R ⟺ R ∉ R)`; the contradiction from unrestricted self-membership that `AXIOM-2` forecloses by fixing `A(A) IS Zero`.
