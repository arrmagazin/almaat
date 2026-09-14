---
title: "Azon"
description: "Azon is the framework's sole primitive: an ability to respond to each given Tik with a specific Tok, constrained by three axioms."
keywords: [math, azon]
---

# Azon

## Definitions

**`Azon`** := an *ability* to assign any (`Azon`:= **`Tik`**) with a corresponding (`Azon`:= **`Tok`**). I is made under to the Axioms below

> `Azon := x → y`

---

**`Zero`** := `Azon` that *always* responds with itself to any `Tik`.

> `Zero := x → Zero`

---

*DEF*: a response with `Zero` is *called* **`empty`**; any other is **`valent`**.

---

**`Unit`** := `Azon` that *always* responds with the `Tik` itself, *except* with `Zero` — to itself.

> `Unit := x → (x IS Unit ? Zero : x)`

---

*DEF*: a response with the `Tik` itself is *called* **`fixed`**.

---

*DEF*: a `Azon` that *always* responds with `Unit` or `Zero` *called* **`Predicate`**.

---

*DEF*: a `Predicate` that responds with `Zero` only to itself *called* **`Principle`**.

## Axioms

**`AXIOM-1`** (Halt) := The response to `Zero` is *always* `Zero`.

> `∀A: A(0) = 0`

---

**`AXIOM-2`** (Non-Self-Valent) := The response to oneself is *always* `Zero`.

> `∀A: A(A) = 0`

`AXIOM-2` establishes the fundamental asymmetry that prevents Russell-type paradoxes: no `Azon` may apply to itself with a valent response.

---

**`AXIOM-3`** (Non-Self-Generation) := non-zero `Azon` cannot respond with itself

> `∀A ≠ 0, x: A(x) ISNT A`
