---
title: "Proof"
description: "The formal apparatus that carries a Thesis to a Proof — formalism, interpretation, satisfaction, the three bounds every logic runs into, and type theory, where a proof is a program."
keywords: [mind, proof, logic, types]
---
Proof *(Dokaz)*
: A [`Conclusion`](../01-math/08-language.md#rules-and-grammar) that yields `Thesis` under a given `Theory`.

> `Proof<Theory> := Conclusion<Theory> :: Conclusion(Axiom) ∈ Thesis`

*NOTE*: Subjects themselves remain inaccessible; we form `Opinion` about their `View` within specific Logics. `Thesis` is defined in [Knowledge](05-knowledge.md), `Theory` in [Formal Language](../01-math/08-language.md#theories).

---

Formalism *(Farmalizm\*)*
: A defined way to construct some theory — a formal or axiomatic system.

> `Formalism := (Axiom, Rule) generating a Theory`

## Interpretation

Interpretation *(Vytlumaqenne\*)*
: A predefined mapping from each formula of a given theory into an external structure.

> `Interpretation :: Formula ⇒ (Entity | {Predicate})`

A formula maps either to one corresponding entity — *denotation*: extension, referent, example — or to a set of predicates over such entities — *logic*: intension, meaning, sense.

**Formula qualities.** A formula is **satisfied** in a given logic if its corresponding predicate is true. An `Interpretation` that satisfies every formula of a theory is called a **model** of it. A formula is:

- **Logically consistent** if it has at least one satisfied interpretation.
- **Logically valid (logical truth)** if it is satisfied by every interpretation.
- **Logical consequence** of ψ if it is satisfied in every interpretation that satisfies ψ.

## The Bounds of Logic

All logics are bounded along three axes:

1. **Completeness** — ability to prove all truths.
2. **Consistency** — not proving both true and false.
3. **Decidability** — proving belonging to a theory.

Each bound has a cost, and they trade against one another:

| Bound | What it costs to have | What it costs to lack |
| --- | --- | --- |
| **Completeness** | A system with a listable set of axioms, strong enough to prove every truth about arithmetic, cannot also be consistent | Some true statements are unprovable inside the system, and can only be reached by strengthening it |
| **Consistency** | Guaranteeing it limits what the system may assert about itself | An inconsistent system proves everything, so it distinguishes nothing |
| **Decidability** | A procedure that always terminates restricts what the system can express | No general procedure decides membership; some questions run forever |

No logic strong enough to express arithmetic escapes all three at once, and
decidability fails independently of the other two.

## Type Theory

Type theory is a `Formalism` in which every term carries a type. Its basic statement is the
*typing judgment* `t : A` — "term `t` has type `A`": `42 : Nat`, `true : Bool`.

It began as the fix for [Russell's paradox](../00-azon/00-azon.md#see-also): types form a strict
hierarchy, and a collection holds only members of a lower type. So `x ∈ x` cannot even be
written, and the paradox has no way to start (Russell and Whitehead, *Principia Mathematica*).

Four judgments make up the whole system. `Γ` is the context — the assumptions already in force.

| Judgment | Reads |
| --- | --- |
| `Γ ⊢ A type` | `A` is a type |
| `Γ ⊢ t : A` | `t` is a term of type `A` |
| `Γ ⊢ A ≡ B` | types `A` and `B` are equal |
| `Γ ⊢ t ≡ u : A` | terms `t` and `u` of type `A` are equal |

New types are built from simpler ones:

| Type | Notation | A value is |
| --- | --- | --- |
| **Function** | `A ⇒ B` | a rule that turns any `A` into a `B` |
| **Product** | `A × B` | a pair: an `A` and a `B` |
| **Sum** | `A + B` | either an `A` or a `B`, tagged with which |
| **Dependent** | `Vec(n)` | a type that depends on a value — here, a list of exactly `n` items (Martin-Löf, 1970s) |

Set theory and type theory are two different foundations:

| | Set theory | Type theory |
| --- | --- | --- |
| **Base** | first-order logic, plus axioms about sets | its own logic; no separate layer of axioms |
| **Membership** | `x ∈ S` is a claim that can be true or false | `t : A` is fixed when `t` is built |
| **`1 + 1 = 2`** | proved from the axioms | holds by computation: `1 + 1` reduces to `2` |

## Proofs as Programs

The *Curry–Howard correspondence*: a proposition is a type, and a proof of it is a `Program`
of that type. To prove a theorem is to write a program that type-checks; to check the proof is
to type-check the program. This is a formal equivalence, not an analogy.

| Logic | Type theory |
| --- | --- |
| proposition `A` | type `A` |
| proof of `A` | term `t : A` |
| `A` implies `B` | function `A ⇒ B`: turns any proof of `A` into a proof of `B` |
| `A` and `B` | product `A × B`: a pair of the two proofs |
| `A` or `B` | sum `A + B`: a proof of one side, tagged with which |

In practice the type plays the role of a [`Specification`](07-computation.md#algorithm-and-correctness),
and type-checking proves `Correctness` before the program runs. With dependent types the checker
can prove exact properties — a list's length, an index in range — and so rule out whole classes
of bugs. Proof assistants such as Lean, Agda and Coq check every step of a proof this way.

*NOTE*: *Homotopy type theory* reads a type as a space and a proof of `a = b` as a path from
`a` to `b`, which gives equality its own structure.
