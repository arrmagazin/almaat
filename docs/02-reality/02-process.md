---
title: "Dynamic Processes"
description: "The Process as a controlled Queue of Words: its Circuit, the kinds of Circuit, the landmarks of a Flow, and what a Flow settles into over many Steps."
keywords: [reality, process, circuit, flow, ergodic]
---
## Parts of a Process

---

Process *(Praces\*)*
: `Flow` produced by some `Generator` from its initial `Moments` `Q[0]` to `Q[n]`.

> `Process<Q, G, n> :: DOM<Q> == Time, i ∈ Time ⟹ Q[i + n + 1] IS G[{ j -> (j ≤ n)[Q[i + j]] }]`

---

State *(Stan)*
: the `Event` a `Process` is in at a given `Moment`.

> `State<S, Q, t> :: Q[t] ∈ S`

---

Ingress *(Uvod\*)*
: the `State` presented to a `Controller<Schema>` at a given `Step`, typed by that `Schema`.

## Kinds of Circuit

---

Generator
: an `Azon` that responds to a `Ingress` with a next `Moment`.

> `Generator<G> :: G: Ingress ⇒ Moment`

---

Circuit *(Dvigun)*
: `Set` of `MutuallyExclusiveEvents` with same-sized `Contexts` under `Normalization`.

> `Circuit<C> :: MutuallyExclusiveEvents<C>, Normalization<C>`

*NOTE*: a [`Conditional Distribution`](../01-math/09-probability.md#conditioning) whose conditions are the `Contexts` of one length `n` — the `Circuit` responds to the last `n` `Words` with a `PD` over the next. The `Chain Rule` turns it into a `Probability Measure` over whole `Flows`.

memoryless
: a `Circuit` whose distribution depends only on the present `State`, not on prior history.

> `memoryless<S> :: P<⋂<COD<{ j -> (j ≤ i)[S[j]] }>>>[S[i + 1]] = P<S[i]>[S[i + 1]]`

*NOTE*: `S[i]` is the `State` at `Step` `i`, and `P<B>[A]` is the probability of `A` given `B`. Any finite-history process is recovered by enlarging the `State` to encode it.

---

context-free
: a `Circuit` whose distribution does not depend on the `Context` at all — for all `Conditional Events` with the same `Event`, the `Probability` is the same.

*NOTE*: its `Flow` is a [`Sample`](../01-math/09-probability.md#limit-laws): `Independent` draws from one `Distribution`, to which the `Law of Large Numbers` and `Central Limit Theorem` apply directly. A context-free `Circuit` is `memoryless` with nothing to remember.

---

TransitionMatrix *(Mantra Perexodaw\*)*
: a [`Stochastic Matrix`](../01-math/09-probability.md#measure) of transition probabilities between `State`s.

> `TransitionMatrix<T> :: T[i][j] = P<i>[j], i ∈ DOM<T> ⟹ (Σk ∈ DOM<T[i]>: T[i][k]) IS 1`

*NOTE*: a Markov kernel — the transition rule of a `memoryless` `Flow`. Where the `Circuit` is `memoryless`, the `Flow` is a Markov chain: the `Circuit` is the kernel, the `Flow` is the process it unrolls. Multi-`State` evolution is matrix power — the `k`-step distribution is `T^k`.

---

deterministic
: a `Circuit` whose distribution is a [`Point Mass`](../01-math/09-probability.md#measure) — one `State` carries all the probability.

> `deterministic<C> :: |support<C[i]>| IS 1`

---

periodic
: a `Circuit` that is a `Flow` composed of infinite repetitions of a `Plan`.

> `periodic<S> :: |{ (m, k) -> (|Ray<k + 1> ∖ { n -> (S[m + n] IS S[n])[n] }| < 1)[*] }| > 0`

*NOTE*: `S[i]` is the `State` at `Step` `i`, as in `memoryless`.

## Landmarks of a Flow

Circumstances *(Varunki)*
: the `State` bearing on a `Plan`'s evaluation that the `Plan` does not determine.

*NOTE*: what an actor does not set — outcome, timing, and other participants' responses. `Circumstances` is what a `Paradigm` must track: see [Evolution](15-evolution.md).

---

Potency *(Magna)*
: an evaluation of a `Plan`, under given `Circumstances`.

*NOTE*: written `Potency<Plan, Circumstances>` for one `Plan`, `Potency<Paradigm, Circumstances>` for the `Paradigm` as a whole, and `Potency<Plan, Paradigm, Circumstances>` where a `Plan` is evaluated within a specific `Paradigm`.

---

Future<State> *(Majbutnee)*
: `Set` of `State` accessible from a given `State`.

> `Future<s> { x -> (|Time ∩ { k -> (T^k[s][x] > 0)[k] }| > 0)[x] }`

---

Halt / Absorbing State *(Krant)*
: a `State` whose `Circuit` distribution is the `Point Mass` on itself — once entered, never left.

> `Halt<s> :: C[s] = δ<s>, P<s>[s] = 1, T[s][s] = 1`

*NOTE*: a fixed point at the `Flow` level. A `Flow` may contain several; which one absorbs is itself random. Compatible with `AXIOM-2` because the distribution `δ<s>` is distinct from the `State` `s`.

---

Bifurcation *(Razvoda\*)*
: a `State` whose `Circuit` distribution has more than one `State` in its [`Support`](../01-math/09-probability.md#measure).

> `Bifurcation<s> :: |support<C[s]>| > 1`

*NOTE*: a weighted branch — the `Circuit` assigns each next `State` its transition probability. The realized choice samples from that distribution; `Communication` from outside the `State` biases the weights. [`Crisis`](15-evolution.md) is a `State` at a `Bifurcation`.

## Long-Run Behavior

Recurrent *(Zvarotny\*)*
: a `State` returned to with probability 1.

> `Recurrent<s> :: P<s>[Return<s>] = 1`

*NOTE*: `Return<s>` is the `Event` that the `Flow` comes back to `s`.

---

Transient *(Perexodny\*)*
: a `State` eventually abandoned — returned to with probability less than 1.

> `Transient<s> :: P<s>[Return<s>] < 1`

*NOTE*: recurrent `State` are the long-run support of the `Flow`; the stochastic generalization of a `Circuit`. Transient `State` carry only the approach.

---

Stationary Distribution *(Stalae Razmerkavanne\*)*
: a `Probability Distribution` over `State` left unchanged by the `Circuit`'s `TransitionMatrix` `T`.

> `Stationary<π, T> :: j ∈ DOM<π> ⟹ (Σi ∈ DOM<π>: π[i] · T[i][j]) IS π[j], Σi ∈ DOM<π>: π[i] = 1`

*NOTE*: the stochastic [`Equilibrium`](07-system.md#the-whole): applying the `Circuit` reproduces the same distribution. Not a single resting `State` but a stable *mixture* of `State`.

---

Ergodic *(Ergadyqny\*)*
: the `Flow` converges to a unique `Stationary Distribution` regardless of the starting `State`.

> `Ergodic<T, π> :: i ∈ DOM<T> ⟹ Lim<{ k -> T^k[i] }> IS π`

*NOTE*: `Lim<Q>` is the value a `Queue` `Q` converges to; `i` ranges over every initial `State`.

*NOTE*: requires irreducibility (every `State` reachable) and aperiodicity (no fixed cycle length). The long-run fraction of time in each `State` equals `π`, independent of where the `Flow` began.
