---
title: "Azon"
description: "Azon is the framework's sole primitive: an ability to respond to each given Tik with a specific Tok, constrained by three axioms."
keywords: [math, azon]
---
Azon
: an *ability* to assign any (`Azon`:= **`Tik`**) with a corresponding (`Azon`:= **`Tok`**). I is made under to the axioms below

> `Azon := x → y`

---

Zero
: `Azon` that *always* responds with itself to any `Tik`.

> `Zero := x → Zero`

empty
: a response with `Zero`.

> `empty(A, x) :: A(x) = Zero`

valent
: any not `empty` response.

> `valent(A, x) :: A(x) ≠ Zero`

fixed
: a response with the `Tik` itself.

> `fixed(A, x) :: A(x) = x`

Unit
: `Azon` that *always* responds `fixed`, *except* with `empty` — to itself.

> `Unit := x → (x IS Unit ? Zero : x)`

Predicate
: a `Azon` that *always* responds with `Unit` or `Zero`.

> `Predicate := x → (Unit | Zero)`

---

AXIOM-1 (Halt)
: The response to `Zero` is *always* `Zero`.

> `∀A: A(0) = 0`

AXIOM-2 (Non-Self-Valent)
: The response to oneself is *always* `Zero`.

> `∀A: A(A) = 0`

*NOTE*: `AXIOM-2` establishes the fundamental asymmetry that prevents Russell-type paradoxes: no `Azon` may apply to itself with a `valent` response.

AXIOM-3 (Non-Self-Generation)
: non-zero `Azon` cannot respond with itself

> `∀A: A(x) = A ⟹ A = Zero`
