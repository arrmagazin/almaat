---
title: "Azon"
description: "Azon is the framework's sole primitive: an assignment from every Arg to a corresponding Spond, constrained by three axioms."
keywords: [math, azon]
---

## Azon

Az
: *assignment* from every (`Az` =: **`Arg`**) to corresponding (`Az` =: **`Spond`**)
: made under *judgement* on every two `Arrows` whether they (*are the same or not* =: **`Coincidence`**).

---

Notation
: way of definining Az by meaningful `sequence of <terms> and "symbols"`:

- Az defined as: `<T> ":=" <T> "|" <T> "->" <T> "|" <T>`, where
  - ":=" split name from defining expression
  - "->" split args from sponds
  - "|" in args encodes `any other than priors`
  - "|" in sponds encodes `corresponding to arg in same position`
- sameness of Azes is expressed
  - implicitly by the same terms
  - or explicitly by `<T> "IS" <T>` or `<T> "ISNT" <T>`
- recurrsive nature of `Az` can be expressed by `"(" <T> "->" <T> ")"` notation inline with "parens".

---
Azon
: any `Az` within definition below:

```bash

  # zero
  0  := 0|x -> 0|0                                      
  
  # unit
  1  := 1|x -> 0|x                                      
  
  
  # never, short '-'
  N  := N|x -> x|x                            
  
  # apply, short `a[x]`
  A  := a -> 0|1|a|x -> 0|0|0|(y ISNT a)                
  
  # combo, short `a.b`
  C  := a -> b -> x -> b[a[x]]                      
  
  # predicate, short `[[x]]`
  P  := 0|x -> 0|1                                  
  
  # inverse, short `!x`
  I  := 0|x -> 1|0                                  
  
  # axiom, short `!!x`
  T  := y -> x -> y[x] IS 1                  
  
  # disjunct, short `a ∨ b`
  ∨  := a -> b -> x -> [[ (0|x1 -> b[x]|1)[a[x]] ]] 
  
  # conjunct, short `a ∧ b`
  ∧  := a -> b -> x -> [[ (0|x1 -> 0|b[x])[a[x]] ]] 
   
  # imply, short `a ⟹ b`
  ⟹ := a -> b -> x -> [[ (0|x1 -> 1|b[x])[a[x]] ]] #
  
  # intensional equality `a === b`
  IE := a -> b -> x -> (x[a] IS x[b])               
  
  # extensional equality `a == b`
  EE := a -> b -> x -> (a[x] IS b[x])               
  
  # total equality `a = b`
  EQ := a -> b -> (IE[a][b] ∧ EE[a][b])             
```

## Axioms

AXIOM-1 (Halt)
: The response to `Zero` is *always* `Zero`.

> `X1 := a -> 0|x -> a[0|x] = 0|y`

---

AXIOM-2 (Non-Self-Valent)
: The response to oneself is *always* `Zero`.

> `X2 := a -> a|x -> 0|y`

---

AXIOM-3 (Non-Self-Generation)
: non-zero `Azon` cannot respond with itself

> `X3 := a|b|0 -> x -> b|a|0`

---

Plausibility
: *judgement* about *condition is plausible* on *(every|some|none)* `Arg` of `Azon`.

> `C :: (∀A: C<A>) ∨ (∃A: C<A>) ∨ (¬∃A: C<A>)`

## Equality

Intensional Distinguishability
: There exists an `Azon`-probe, whose responses to `a` and `b` do not coincide.

> `a ≠ b := ∃p: p(a) ISNT p(b)`

*NOTE*: Contrapositive of Leibniz's *indiscernibility of identicals*, `a = b ⟹ ∀F: F(a) IS F(b)`. The probe `p` plays the role of the predicate `F`.

---

Intensional Equality
: Every `Azon`-probe responds to `a` and `b` with coinciding responses; the negation of `Intensional Distinguishability`.

> `a = b := ∀x: x(a) IS x(b)`

*NOTE*: Leibniz's *identity of indiscernibles*, `∀F: F(a) IS F(b) ⟹ a = b`, which second-order logic takes as the definition of equality (*Leibniz equality*). Here the quantifier ranges over `Azon` probes, not over a separate universe of predicates.

---

Extensional Equality
: Every `Azon` receives coinciding responses from `a` and `b`.

> `a == b := ∀x: a(x) IS b(x)`

*NOTE*: ZFC's *axiom of extensionality*, `∀z: z ∈ A IS z ∈ B ⟹ A = B`, and type theory's *function extensionality*, `(∀x: f(x) = g(x)) ⟹ f = g`. For a `Set` the two coincide, since membership *is* the response: `z ∈ S :: S(z) IS z`.

---

Equality
: Both `Intensional Equality` and `Extensional Equality` hold.

> `IS :=  a -> b ->  x(a) IS x(b) ∧ a(x) IS b(x) ? Unit : Zero`

*NOTE*: The two halves collapse into one in classical set theory, where an object *is* its extension. They stay apart here because an `Azon` is both operand and mapping — probed by `x(a)`, probing by `a(x)`.

## Zero and Unit

Zero
: `Azon` that *always* responds with itself.

> `Zero := x -> Zero`

---

empty
: a response with `Zero`.

> `empty(A, x) :: A(x) IS Zero`

---

valent
: any not `empty` response.

> `valent(A, x) :: A(x) ISNT Zero`

---

fixed
: a response with the `Arg` itself.

> `fixed(A, x) :: A(x) IS x`

---

Unit
: `Azon` that *always* responds `fixed`, *except* with `empty` — to itself.

> `Unit := x -> (x IS Unit ? Zero : x)`

---

Predicate
: an `Azon` that *always* responds with `Unit` or `Zero`.

> `Predicate := x -> (Unit | Zero)`

## SEE ALSO

- [Identity of Indiscernibles (Wikipedia)](https://en.wikipedia.org/wiki/Identity_of_indiscernibles) — `∀x∀y[∀F(Fx IS Fy) -> x = y]`; grounds `≠` and `=`.
- [Axiom of Extensionality (Wikipedia)](https://en.wikipedia.org/wiki/Axiom_of_extensionality) — `∀x∀y[∀z(z ∈ x IS z ∈ y) -> x = y]`; grounds `==` for a `Set`.
- [Extensionality (Wikipedia)](https://en.wikipedia.org/wiki/Extensionality) — the general principle, including function extensionality: equality by external behaviour rather than internal definition.
- [Intension (Wikipedia)](https://en.wikipedia.org/wiki/Intension) — intension as the properties connoted, extension as the referents: why `x(a)` is the intensional side and `a(x)` the extensional one.
- [Extensional and intensional definitions (Wikipedia)](https://en.wikipedia.org/wiki/Extensional_and_intensional_definitions) — the same contrast applied to definitions: listing instances versus stating conditions.
- [Extensional type theory (nLab)](https://ncatlab.org/nlab/show/extensional+type+theory) — intensional identity is so named because it does *not* validate function extensionality; the reason `==` is the extensional criterion.
- [Equality (mathematics) (Wikipedia)](https://en.wikipedia.org/wiki/Equality_(mathematics)) — broader survey of equality notions.
- [Russell's paradox (Wikipedia)](https://en.wikipedia.org/wiki/Russell%27s_paradox) — `R = {x | x ∉ x} ⟹ (R ∈ R ⟺ R ∉ R)`; the contradiction from unrestricted self-membership that `AXIOM-2` forecloses by fixing `A(A) IS Zero`.
