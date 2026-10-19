---
title: "Systems"
description: "Things as queues of presentations over a flow: the participants, the communication that couples them, and what the whole exhibits that no part does."
keywords: [reality, system, participant, communication]
---
## Thing and Trajectory

Transition<Thing> *(Perexod)*
: a change of `State` of a `Thing` between consecutive `Step` — a triple of moment, before-state, after-state.

> `Transition<X, i, a, b> :: State<a, X, i>, State<b, X, i + 1>`

---

Trajectory<Thing> *(Trajektoria)*
: the track of a `Thing`'s `States` across its `Step`s.

> `Trajectory<R, X> :: DOM<R> == DOM<X>, i ∈ DOM<X> ⟹ State<R[i], X, i>`

*NOTE*: the realized `Trajectory` is one sample path of the `Flow`; the space of possible `Trajectorys` is the [`Circuit`](02-process.md#parts-of-a-process)'s support unrolled. A `Trajectory` is a function of `Thing` only where every `Step` is a point mass.

## System and Participant

System *(Svarga)*
: a `Set` of `Participants` coupled by mutual `Communication`.

> `System<S> :: P ∈ S ⟹ (Participant<P> ∧ |Environment<P, S>| > 0)`

---

Participant *(Udelnik)*
: a `Thing` that produces `Communication` toward another `Thing`.

> `Participant<P> :: |{ (M, E) -> (P IS Thing<M, E>)[*] }| > 0, |{ Q -> (![Q IS P] ∧ ![Communication<P, Q> IS Z])[Q] }| > 0`

*NOTE*: the atomic unit of a `System` — defined by its role in the network of `Communication`, not by its internal structure. Every `Participant` is a [`Source`](../01-math/01-sets.md#sets): it must produce output in order to communicate.

---

State of a Participant *(Stan Udelnika\*)*
: the `State` of a `Participant` at a given `Step`.

> `State<S, U, i> :: U[i] ∈ S`

*NOTE*: read over the `Views` of `U` at that `Step`; what `Behavior` projects outward and what `Attention` of others receives.

## Communication

Communication *(Uplyv)*
: projection of one `Participant`'s `Behavior` into another's `Attention`.

> `Communication<A, B> := Attention<B>.Behavior<A>`

*NOTE*: asymmetric: `![Communication<A, B> IS Communication<B, A>]`. Operates across a single `Step` — A's output at `Step` `i` becomes B's input at `Step` `i + 1`.

---

Behavior *(Pavoda)*
: a `Participant`'s projection of its own `State` toward other `Participant`s.

> `Behavior<A>: { S -> (|S ∩ COD<A>| > 0)[S] } ⇒ View`

*NOTE*: the sending half — the externally-visible aspect of a `Participant` — what it contributes to the `System`.

---

Attention *(Uvaga)*
: a `Participant`'s selection of *other* `Participant`s' `Behavior` into its own `State`.

> `Attention<B>: View ⇒ { S -> (|S ∩ COD<B>| > 0)[S] }`

*NOTE*: the receiving half. `Attention` is selective: not every available `Behavior` enters a `Participant`'s input.

## Coupling

Environment *(Aserodde)*
: the part of the `System` that has mutual `Communication` with a `Participant`.

> `Environment<P, S> { Q -> (Q ∈ S ∧ ![Communication<P, Q> IS Z] ∧ ![Communication<Q, P> IS Z])[Q] }`

*NOTE*: the `Participant`'s local neighborhood — the subset of the `System` it actually exchanges `Behavior`/`Attention` with.

---

Interface *(Oblik)*
: a constraint on the `Behavior` of `Participants` relative to each other.

> `Interface { (b, a) -> ( U | Z ) }`

*NOTE*: `b` is a `Behavior`, `a` an `Attention`; `Uniton` admits the pair. A behavioral contract — a formal specification of admissible `Communication` patterns.

---

Coupling *(Spluq)*
: the persistence of mutual `Communication` between two `Participants` across multiple `Step`s.

> `Coupling<A, B> := |{ i -> (![Communication<A, B>[i] IS Z] ∧ ![Communication<B, A>[i] IS Z])[i] }|`

*NOTE*: `Communication<A, B>[i]` is that `Communication` at `Step` `i`.

---

Feedback *(Vodguk)*
: a `Composition` in which a `Participant`'s `Behavior` flows, through other `Participant`s, back into its own `Attention`.

> `Feedback<A, G> :: |{ C -> (Cycle<C, G> ∧ Vertex<A, C>)[C] }| > 0`

*NOTE*: `G` is the `Graph` of `Couplings` between `Participants`. Positive `Feedback` amplifies divergence from a `State`; negative `Feedback` restores it.

## The Whole

Emergence *(Uznika\*)*
: a `Behavior` of a `System` not present in any individual `Participant`.

> `Emergence<S> :: Behavior<S> ⊄ ⋃<COD<{ P -> (P ∈ S)[Behavior<P>] }>>`

*NOTE*: the signature of `System`s: the whole exhibits properties no part can. Not predictable from the `State` of individual `Participants` alone — it must be observed under `Communication`.

---

Equilibrium *(Roynja\*)*
: a `State` of the `System` at which all `Communication` among `Participants` balance, yielding a [`Halt`](02-process.md#landmarks-of-a-flow) for the whole.

> `Equilibrium<s> :: C[s] = δ<s>`

*NOTE*: the system-level `Halt`. Disturbance by external `Communication` yields either return to the same `Equilibrium` (stable), drift to a different one (metastable), or unbounded divergence (unstable).
