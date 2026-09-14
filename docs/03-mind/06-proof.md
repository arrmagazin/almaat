---
title: "Proof"
description: "The formal apparatus that carries a Thesis to a Proof — formalism, interpretation, satisfaction, and the three bounds every logic runs into."
keywords: [mind, proof, logic]
---

# Proof

**`Proof`** := A [`Conclusion`](../0-math/08-language.md#rules-and-grammar) that yields `Thesis` under a given `Theory`.

> `Proof<Theory> := Conclusion<Theory> :: Conclusion(Axiom) ∈ Thesis`

*NOTE*: Subjects themselves remain inaccessible; we form `Opinion` about their `View` within specific Logics. `Thesis` is defined in [Knowledge](05-knowledge.md), `Theory` in [Formal Language](../0-math/08-language.md#theories).

---

**`Formalism`** := A defined way to construct some theory — a formal or axiomatic system.

> `Formalism := (Axiom, Rule) generating a Theory`

## Interpretation

**`Interpretation`** := A predefined mapping from each formula of a given theory into an external structure.

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
