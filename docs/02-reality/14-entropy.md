---
title: "Entropy"
description: "Entropy is the bridge between the State of a System and the passage of Steps: Order is never free, and a System holds Entropy back only by drawing Communication from its Environment."
keywords: [reality, entropy, order, self-organization]
---
## Measure

Entropy *(Entrapija\*)*
: a measure of the uncertainty in the `State` of a `System` `S` at `Step` `i` — the count of micro-configurations of [`Participant`](07-system.md#system-and-participant)s consistent with one observed macro-`State`.

> `Entropy<S,i> = Σx ∈ State<S,i>: P[x] · log[1 / P[x]]`

*NOTE*: high `Entropy` means many indistinguishable `State`s, so the macro-`State` carries little information about the micro-`State`. The Boltzmann (counting) and Shannon (information) forms coincide when every micro-`State` is equally likely. Maximal at [`Equilibrium`](07-system.md#the-whole).

---

Order *(Lad\*)*
: the complement of `Entropy`, counted from the greatest `Entropy` `S` reaches over its `Step`s — the degree to which a `System`'s macro-`State` constrains the `State` of its `Participant`s.

> `Order<S,i> = (max j: Entropy<S,j>) − Entropy<S,i>`

*NOTE*: structure, pattern, distinguishability — what makes a `System` more than noise. Sometimes called *negentropy*. Sustained only against `Dissipation`.

## Direction

Dissipation *(Rassejvanne\*)*
: the tendency of an isolated `System` — one with no `Environment` — to lose `Order` across `Step`s.

> `Dissipation<S> :: Environment<S> IS Z ⟹ Entropy<S, i + 1> ≥ Entropy<S,i>`

*NOTE*: the Second Law as a `Flow` property: with no external `Communication`, `Order` never increases and the `System` drifts toward `Equilibrium`. This is the `System`-level arrow of time.

---

Self-Organization *(Samaarganizacyja\*)*
: a local decrease of `Entropy` in an open `System`, paid for by a greater increase of `Entropy` in its [`Environment`](07-system.md#coupling).

> `Self-Organization<S,i> :: Entropy<S, i + 1> < Entropy<S,i> ∧ Entropy<S ∪ Environment<S>, i> < Entropy<S ∪ Environment<S>, i + 1>`

*NOTE*: the mechanism behind [`Emergence`](07-system.md#the-whole) of `Order` — life, learning, every durable structure. Not a violation of `Dissipation`: `Order` is imported from the `Environment` and `Entropy` is exported back to it.
