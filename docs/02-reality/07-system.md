---
title: "Systems"
description: "Things as queues of presentations over a flow: the participants, the communication that couples them, and what the whole exhibits that no part does."
keywords: [reality, system, participant, communication]
---

# Systems

## Thing and Trajectory

Transition(Thing)
: a change of `State` of a `Thing` between consecutive `Step` — a triple of moment, before-state, after-state.

> `Transition(Thing) := (Step[i], State(Thing, Step[i]), State(Thing, Step[i+1]))`

---

Trajectory(Thing)
: the track of a `Thing`'s `States` across its `Step`s.

> `Trajectory(Thing) := [State(Thing, Step[i]) for Step[i] in indices(Thing)]`

*NOTE*: the realized `Trajectory` is one sample path of the `Flow`; the space of possible `Trajectorys` is the [`Circuit`](02-process.md#parts-of-a-process)'s support unrolled. A `Trajectory` is a function of `Thing` only where every `Step` is a point mass.

## System and Participant

System
: a `Set` of `Participants` coupled by mutual `Communication`.

> `System := {Participant} :: ∀P ∈ System: ∃Q ∈ System: Communication(P → Q) ≠ 0 ∧ Communication(Q → P) ≠ 0`

---

Participant
: a `Thing` that produces `Communication` toward another `Thing`.

> `Participant(P) :: P IS Thing ∧ ∃Q ≠ P: Communication(P → Q) ≠ 0`

*NOTE*: the atomic unit of a `System` — defined by its role in the network of `Communication`, not by its internal structure. Every `Participant` is a [`Source`](../01-math/01-sets.md#sets): it must produce output in order to communicate.

---

State of a Participant
: the `State` of a `Participant` at a given `Step`.

> `State(U, Step) :: State over the Views of U at Step`

*NOTE*: what `Behavior` projects outward and what `Attention` of others receives.

## Communication

Communication
: projection of one `Participant`'s `Behavior` into another's `Attention`.

> `Communication(A → B) := Behavior(A) . Attention(B)`

*NOTE*: asymmetric: `A → B ≠ B → A`. Operates across a single `Step` — A's output at `Step[i]` becomes B's input at `Step[i+1]`.

---

Behavior
: a `Participant`'s projection of its own `State` toward other `Participant`s.

> `Behavior(A) :: State(A) ⇒ View`

*NOTE*: the sending half — the externally-visible aspect of a `Participant` — what it contributes to the `System`.

---

Attention
: a `Participant`'s selection of *other* `Participant`s' `Behavior` into its own `State`.

> `Attention(B) :: View ⇒ State(B)`

*NOTE*: the receiving half. `Attention` is selective: not every available `Behavior` enters a `Participant`'s input.

## Coupling

Environment
: the part of the `System` that has mutual `Communication` with a `Participant`.

> `Environment(P) := {Q ∈ System : Communication(P → Q) ≠ 0 ∧ Communication(Q → P) ≠ 0}`

*NOTE*: the `Participant`'s local neighborhood — the subset of the `System` it actually exchanges `Behavior`/`Attention` with.

---

Interface
: a constraint on the `Behavior` of `Participants` relative to each other.

> `Interface :: admissible(Behavior, Attention) ⇒ {0, 1}`

*NOTE*: a behavioral contract — a formal specification of admissible `Communication` patterns.

---

Coupling
: the persistence of mutual `Communication` between two `Participants` across multiple `Step`s.

> `Coupling(A, B) := | {Step[i] : Communication(A → B) ≠ 0 ∧ Communication(B → A) ≠ 0 at Step[i]}|`

---

Feedback
: a `Composition` in which a `Participant`'s `Behavior` flows, through other `Participant`s, back into its own `Attention`.

> `Feedback(A) :: ∃ path A → ... → A in the Coupling graph`

*NOTE*: positive `Feedback` amplifies divergence from a `State`; negative `Feedback` restores it.

## The Whole

Emergence
: a `Behavior` of a `System` not present in any individual `Participant`.

> `Emergence :: Behavior(System) ⊄ ⋃ Behavior(Participant)`

*NOTE*: the signature of `System`s: the whole exhibits properties no part can. Not predictable from the `State` of individual `Participants` alone — it must be observed under `Communication`.

---

Equilibrium
: a `State` of the `System` at which all `Communication` among `Participants` balance, yielding a [`Halt`](02-process.md#landmarks-of-a-flow) for the whole.

> `Equilibrium :: Circuit(State_sys) = δ_Step`

*NOTE*: the system-level `Halt`. Disturbance by external `Communication` yields either return to the same `Equilibrium` (stable), drift to a different one (metastable), or unbounded divergence (unstable).
