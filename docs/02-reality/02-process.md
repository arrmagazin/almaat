---
title: "Dynamic Processes"
description: "The Process as a controlled Queue of Words: its Circuit, the kinds of Circuit, the landmarks of a Flow, and what a Flow settles into over many Steps."
keywords: [reality, process, circuit, flow, ergodic]
---

# Dynamic Processes

## Parts of a Process

---

Process
: `Flow` produced by some `Generator` from initial `[Moment...]{0..n}`.

> `Process<Generator> := Queue :: Moment[i+n+1] = Generator(Queue[i..i+n] : ∀i > n)`

---

State
: the `Event` a `Process` is in at a given `Moment`.

> `State(t) := Event :: Moment[t] ∈ Event`

---

Ingress
: the `State` presented to a `Controller<Schema>` at a given `Step`, typed by that `Schema`.

## Kinds of Circuit

---

Generator
: an `Azon` that responds to a `Ingress` with a next `Moment`.

> `Generator := Ingress ⇒ Moment`

---

Circuit
: `Set` of `MutuallyExclusiveEvents` with same-sized `Contexts` under `Normalization`.

> `Circuit := {Event} :: Normalization`

*NOTE*: a [`Conditional Distribution`](../01-math/09-probability.md#conditioning) whose conditions are the `Contexts` of one length `n` — the `Circuit` responds to the last `n` `Words` with a `PD` over the next. The `Chain Rule` turns it into a `Probability Measure` over whole `Flows`.

*DEF*: a `Circuit` is **memoryless** if its distribution depends only on the present `State`, not on prior history: `P(State[i+1] | State[i], ..., State[0]) = P(State[i+1] | State[i])`.

*NOTE*: any finite-history process is recovered by enlarging the `State` to encode it.

---

*DEF*: a `Circuit` is **context-free** if its distribution does not depend on the `Context` at all — for all `Conditional Events` with the same `Event`, the `Probability` is the same.

*NOTE*: its `Flow` is a [`Sample`](../01-math/09-probability.md#limit-laws): `Independent` draws from one `Distribution`, to which the `Law of Large Numbers` and `Central Limit Theorem` apply directly. A context-free `Circuit` is `memoryless` with nothing to remember.

---

TransitionMatrix
: a [`Stochastic Matrix`](../01-math/09-probability.md#measure) of transition probabilities between `State`s.

> `T[i][j] := P(State → j | State = i) :: rows sum to 1`

*NOTE*: a Markov kernel — the transition rule of a `memoryless` `Flow`. Where the `Circuit` is `memoryless`, the `Flow` is a Markov chain: the `Circuit` is the kernel, the `Flow` is the process it unrolls. Multi-`State` evolution is matrix power — the `k`-step distribution is `T^k`.

---

*DEF*: a `Circuit` is **deterministic** if its distribution is a [`Point Mass`](../01-math/09-probability.md#measure) — one `State` carries all the probability: `∃Point<i> :: i → PD(x) = x IS Point ? 1 : 0`.

---

*DEF*: a `Circuit` is **periodic** if it is a `Flow` composed of infinite repetitions of a `Plan`: `∃m, k: ∀n > k, State[m+n] = State[n]`.

## Landmarks of a Flow

Circumstances
: the `State` bearing on a `Plan`'s evaluation that the `Plan` does not determine.

*NOTE*: what an actor does not set — outcome, timing, and other participants' responses. `Circumstances` is what a `Paradigm` must track: see [Evolution](15-evolution.md).

---

Potency
: an evaluation of a `Plan`, under given `Circumstances`.

*NOTE*: written `Potency(Plan, Circumstances)` for one `Plan`, `Potency(Paradigm, Circumstances)` for the `Paradigm` as a whole, and `Potency(Plan, Paradigm, Circumstances)` where a `Plan` is evaluated within a specific `Paradigm`.

---

Future<State>
: `Set` of `State` accessible from a given `State`.

> `Future<State> := { M :: Plan reachable from State }`

---

Halt / Absorbing State
: a `State` whose `Circuit` distribution is the `Point Mass` on itself — once entered, never left.

> `Circuit(State) = δ_Step`, `P(State | State) = 1`, `T[i][i] = 1`

*NOTE*: a fixed point at the `Flow` level. A `Flow` may contain several; which one absorbs is itself random. Compatible with `AXIOM-2` because the distribution `δ_Step` is distinct from `State`.

---

Bifurcation
: a `State` whose `Circuit` distribution has more than one `State` in its [`Support`](../01-math/09-probability.md#measure).

> `|support(Circuit(State))| > 1`

*NOTE*: a weighted branch — the `Circuit` assigns each next `State` its transition probability. The realized choice samples from that distribution; `Communication` from outside the `State` biases the weights. [`Crisis`](15-evolution.md) is a `State` at a `Bifurcation`.

## Long-Run Behavior

Recurrent
: a `State` returned to with probability 1.

> `recurrent(State) ⟺ P(return to State) = 1`

---

Transient
: a `State` eventually abandoned — returned to with probability less than 1.

> `transient(State) ⟺ P(return to State) < 1`

*NOTE*: recurrent `State` are the long-run support of the `Flow`; the stochastic generalization of a `Circuit`. Transient `State` carry only the approach.

---

Stationary Distribution
: a `Probability Distribution` over `State` left unchanged by the `Circuit`'s `TransitionMatrix` `T`.

> `π T = π`, `Σ π = 1`

*NOTE*: the stochastic [`Equilibrium`](07-system.md#the-whole): applying the `Circuit` reproduces the same distribution. Not a single resting `State` but a stable *mixture* of `State`.

---

Ergodic
: the `Flow` converges to a unique `Stationary Distribution` regardless of the starting `State`.

> `lim T^k → π` for every initial `State`

*NOTE*: requires irreducibility (every `State` reachable) and aperiodicity (no fixed cycle length). The long-run fraction of time in each `State` equals `π`, independent of where the `Flow` began.
