---
title: "Probability"
description: "The SampleSpace and its Events, the Probability Measure and Distribution over them, conditioning up to Bayes' Theorem, Random Variables with their moments, and the limit laws over a growing Sample."
keywords: [math, probability, bayes, random variable]
---

# Probability

## Sample Space and Events

SampleSpace
: `Dictionary` whose `Words` are the mutually exclusive outcomes of one trial.

> `SampleSpace := Dictionary<Alphabet>`

*NOTE*: the classical Ω. Discrete here, since a `Dictionary` is a `Set` of `Words`; the continuous case sits outside `01-math`.

---

Outcome
: a `Word` of the `SampleSpace` — what one trial yields.

> `Outcome := ω ∈ SampleSpace`

---

Event
: a `Subset` of a `SampleSpace`.

> `Event := Subset ⊆ SampleSpace`

*NOTE*: an `Event` *occurs* when the `Outcome` belongs to it. The event algebra is the `Set` algebra of [Sets](01-sets.md#topology), with the `SampleSpace` as `Universe`:

| Event | Set form | Formula |
| --- | --- | --- |
| **elementary event** | `Singleton` of an `Outcome` | `{ω}` |
| **certain event** | the `SampleSpace` itself | `SampleSpace` |
| **impossible event** | `Zero` | `0` |
| **A and B** | `Intersection` | `A ∩ B` |
| **A or B** | `Union` | `A ∪ B` |
| **not A** | `Complement` | `!A` |
| **A implies B** | `Subset` | `A ⊆ B` |
| **mutually exclusive** | `non-intersecting` | `A ∩ B = 0` |
| **exhaustive** | saturated to the `SampleSpace` | `⋃K = SampleSpace` |
| **complete group of events** | `Cluster` | `Cluster(SampleSpace)` |

---

Context
: the `Text<SampleSpace>` of `Outcomes` preceding an `Event`, or `Zero` where there is none.

> `Context := Text<SampleSpace> | Zero`

---

Conditional Event
: pair of `Context`, `Event`.

> `Conditional Event<SampleSpace> := [Context, Event]`

*NOTE*: read as *the `Event` given the `Context`* — written `A | Context`. It lives on the space of `Texts` one `Word` longer than the `Context`; with `Context = Zero` it is the plain `Event`.

---

MutuallyExclusiveEvents
: `Set` of `Conditional Events` with the same `Context`, whose `Events` comprise a `Cluster` of the `SampleSpace`.

> `MutuallyExclusiveEvents<Context> := { [Context, Event] } :: {Event} IS Cluster(SampleSpace)`

*NOTE*: the classical *complete group of events*, carried at a `Context` — mutually exclusive *and* exhaustive, so exactly one of its `Events` occurs. The finest one is the `Cluster` of `Singletons`, one per `Outcome`.

## Measure

Probability
: a `Rational` from 0 to 1.

> `Probability := Rational :: 0 ≤ Probability ≤ 1`

*NOTE*: classical theory takes a real number; `01-math` has only `Rationals`, which suffice for a discrete `SampleSpace`. Irrational values enter only through roots and limits.

---

Probability Measure / P
: `Azon` *from* the `PowerSet` of the `SampleSpace` *into* `Probability`, under three axioms.

> `P := 2^SampleSpace ⇒ Probability`

| Axiom | Formula |
| --- | --- |
| **Non-negativity** | `∀A: P(A) ≥ 0` |
| **Normalization** | `P(SampleSpace) = 1` |
| **Additivity** | `A ∩ B = 0 ⟹ P(A ∪ B) = P(A) + P(B)` |

*NOTE*: Kolmogorov's axioms. On a discrete `SampleSpace` every `Subset` is measurable, so the `PowerSet` plays the σ-algebra and finite additivity extends to countable. What follows from them:

| Rule | Formula |
| --- | --- |
| **Impossible** | `P(0) = 0` |
| **Complement** | `P(!A) = 1 − P(A)` |
| **Monotone** | `A ⊆ B ⟹ P(A) ≤ P(B)` |
| **Inclusion–exclusion** | `P(A ∪ B) = P(A) + P(B) − P(A ∩ B)` |
| **Sum over outcomes** | `P(A) = Σ P({ω}) over ω ∈ A` |
| **Laplace** | `P(A) = |A| / |SampleSpace|` when every `Outcome` is equally likely |

---

Probability Space
: pair of a `SampleSpace` and a `Probability Measure` on it.

> `Probability Space := [SampleSpace, P]`

*NOTE*: the classical `(Ω, F, P)` with `F = 2^Ω`.

---

Normalization
: the `Probability` values over a `Cluster` of the `SampleSpace` sum to 1.

> `Σ P(Event) = 1 over Event ∈ Cluster(SampleSpace)`

*NOTE*: Additivity applied to the certain event. Holds for every `MutuallyExclusiveEvents`. Not the `Law of Total Probability`, which is a statement about conditioning.

---

Probability Distribution / PD
: `Azon` that responds with a `Probability` to each `Event` of a `Cluster` of the `SampleSpace`, under `Normalization`.

> `PD<Cluster> := Event ∈ Cluster ⇒ Probability :: Normalization`

*NOTE*: the restriction of `P` to one `Cluster` — a *probability mass function*. Over `MutuallyExclusiveEvents<Context>` it is a conditional one (see `Conditional Distribution`). Conversely, a `PD` over the finest `Cluster` (`Singletons` of `Outcomes`) determines `P` by summation.

---

Stochastic Vector
: `Tuple` of `Probabilities` whose entries sum to 1.

> `Stochastic Vector := [p₀, …, pₙ₋₁] :: Σ pᵢ = 1`

*NOTE*: a `PD` over a `Cluster` indexed by an `Interval` — the same `Azon` in `Tuple` form.

---

Stochastic Matrix
: `Matrix` whose every row is a `Stochastic Vector`.

> `Stochastic Matrix := M :: ∀i: Σⱼ M[i][j] = 1`

*NOTE*: one `PD` per row, the row index being the condition — a `Conditional Distribution` in `Matrix` form. A `Stochastic Vector` `π` times a `Stochastic Matrix` is again a `Stochastic Vector`: `(π M)[j] = Σᵢ π[i] · M[i][j]`.

---

Support
: `Set` of `Events` of a `Cluster` with non-zero `Probability`.

> `support(PD) := { Event ∈ Cluster : PD(Event) > 0 }`

---

Point Mass / δ
: `PD` whose `Support` is a `Singleton`.

> `δ<a> := Event → (a ∈ Event ? 1 : 0)`

*NOTE*: the *degenerate* distribution — certainty about one `Outcome` `a`. Every `Random Variable` under it has `Expected Value` `X(a)` and `Variance` 0.

## Conditioning

Conditional Probability
: the `Probability` of an `Event` A given that an `Event` B of non-zero `Probability` occurred.

> `P(A | B) := P(A ∩ B) / P(B) :: P(B) > 0`

*NOTE*: `P(· | B)` is itself a `Probability Measure`, with B as the new certain event. A `Conditional Event` `[Context, A]` carries `P(A | Context)`.

---

Chain Rule / Multiplication Rule
: the `Probability` of an `Intersection` is the product of successive `Conditional Probabilities`.

> `P(A₁ ∩ A₂ ∩ … ∩ Aₙ) = P(A₁) · P(A₂ | A₁) · … · P(Aₙ | A₁ ∩ … ∩ Aₙ₋₁)`

*NOTE*: the `Probability` of a `Text` is the product of the `Probabilities` of its `Words`, each given its `Context`. This is how a `Conditional Distribution` over single `Outcomes` assigns `Probability` to whole `Texts`.

---

Law of Total Probability / LTP
: the `Probability` of an `Event` is the sum of its `Conditional Probabilities` over a `Cluster`, each weighted by the `Probability` of the condition.

> `P(A) = Σ P(A | Bᵢ) · P(Bᵢ) over Bᵢ ∈ Cluster(SampleSpace)`

*NOTE*: the `Cluster` splits A into `non-intersecting` pieces `A ∩ Bᵢ`; Additivity sums them, the `Chain Rule` factors each. With `A = SampleSpace` it reduces to `Normalization`.

---

Bayes' Theorem
: reverses a `Conditional Probability`: the `Probability` of a hypothesis A given evidence B, from the `Probability` of B given A.

> `P(A | B) = P(B | A) · P(A) / P(B)`, with `P(B) = Σ P(B | Aᵢ) · P(Aᵢ)` over a `Cluster` `{Aᵢ}` of hypotheses

*NOTE*: the roles — `P(A)` the *prior*, `P(B | A)` the *likelihood*, `P(B)` the *evidence* (by the `Law of Total Probability`), `P(A | B)` the *posterior*. Applied step after step, the posterior of one observation is the prior of the next: this is how a `Probability Distribution` is updated by a `Text` of evidence.

---

Independent Events / Independent
: `Events` whose joint `Probability` is the product of their `Probabilities`.

> `Independent(A, B) := P(A ∩ B) = P(A) · P(B)` — equivalently `P(A | B) = P(A)` when `P(B) > 0`

*NOTE*: conditioning on B leaves A unchanged. Not the same as mutually exclusive: `non-intersecting` `Events` of non-zero `Probability` are never `Independent`, since `P(A ∩ B) = 0 ≠ P(A) · P(B)`. A `Set` of `Events` is *mutually* independent when the product rule holds for every `Subset` of it; pairwise independence does not suffice.

---

Conditional Distribution / Kernel
: `Azon` that responds to each condition of a `Set` with a `Probability Distribution` over one and the same `Cluster`.

> `Kernel<C, Cluster> := c ∈ C ⇒ PD<Cluster>`, `Kernel(c)(Event) = P(Event | c)`

*NOTE*: the *transition kernel*. Where `C` is a `Set` of `Contexts`, it assigns each `MutuallyExclusiveEvents<Context>` its `PD`; where `C` and the `Cluster` are indexed by the same `Interval`, it is a `Stochastic Matrix`. The `Chain Rule` unrolls a `Kernel` into a `Probability Measure` over `Texts`.

## Random Variables

Random Variable / RV
: `Azon` *from* the `SampleSpace` *into* the `Rationals`.

> `X := SampleSpace ⇒ Rational`

*NOTE*: a numeric reading of each `Outcome`; the `Outcome` is random, the `Azon` is not. Its `Taxon` — the `Cluster` of the `SampleSpace` by shared value — is the `MutuallyExclusiveEvents` `{X = x}`. Classically a measurable function into ℝ; on a discrete `SampleSpace` every `Azon` is measurable.

---

Indicator
: `Random Variable` responding with 1 on an `Event` and 0 outside it.

> `1<A> := ω → (ω ∈ A ? 1 : 0)`

*NOTE*: the bridge from `Events` to `Random Variables`: `E(1<A>) = P(A)`.

---

Distribution
: the `Probability Distribution` a `Random Variable` induces over its `Taxon`.

> `PD<X>(x) := P(X = x) = P({ω : X(ω) = x})`

*NOTE*: the *law* of X — the pushforward of `P` along X. Two `Random Variables` on different `SampleSpaces` may share a `Distribution`; everything below depends on the `Distribution` alone.

---

Joint Distribution
: the `Distribution` of a `Tuple` of `Random Variables`, over the pairwise `Intersections` of their `Taxons`.

> `PD<X, Y>(x, y) := P(X = x ∩ Y = y)`

*NOTE*: the `Distribution` of each one — its *marginal* — is recovered by summing the other out: `P(X = x) = Σ P(X = x ∩ Y = y) over y`. `Random Variables` are `Independent` when every pair of cells `{X = x}`, `{Y = y}` is — the `Joint Distribution` is the product of the marginals.

---

Expected Value / Mean
: the `Probability`-weighted sum of the values of a `Random Variable`.

> `E(X) := Σ x · P(X = x) over x ∈ COD(X)`

*NOTE*: the centre of mass of the `Distribution`. Linear without any independence: `E(aX + bY) = a·E(X) + b·E(Y)`. For `Independent` X, Y also `E(X · Y) = E(X) · E(Y)`.

---

Variance
: the `Expected Value` of the squared deviation from the `Expected Value`.

> `Var(X) := E[(X − E(X))²] = E(X²) − E(X)²`

*NOTE*: the spread of the `Distribution`. `Var(aX + b) = a² · Var(X)`; `Var(X + Y) = Var(X) + Var(Y) + 2·Cov(X, Y)`, so `Variances` add for `Independent` `Random Variables`.

---

Standard Deviation
: the square root of the `Variance`.

> `SD(X) := √Var(X)`

*NOTE*: spread in the units of X itself. Irrational in general — the one place this file leaves the `Rationals`.

---

Covariance
: the `Expected Value` of the product of two deviations.

> `Cov(X, Y) := E[(X − E(X)) · (Y − E(Y))] = E(X·Y) − E(X)·E(Y)`

*NOTE*: `Independent` `Random Variables` have `Cov = 0`; the converse fails — zero `Covariance` rules out linear dependence only. Divided by the two `Standard Deviations` it is the *correlation* `ρ = Cov(X, Y) / (SD(X) · SD(Y))`, in `[−1, 1]`.

## Named Distributions

| Distribution | Support | `P(X = k)` | `E(X)` | `Var(X)` | Models |
| --- | --- | --- | --- | --- | --- |
| **Uniform** `(n)` | `{1, …, n}` | `1/n` | `(n+1)/2` | `(n²−1)/12` | a fair die; Laplace's equally likely `Outcomes` |
| **Bernoulli** `(p)` | `{0, 1}` | `p^k · (1−p)^(1−k)` | `p` | `p(1−p)` | one trial with two `Outcomes`; the `Indicator` of an `Event` with `P(A) = p` |
| **Binomial** `(n, p)` | `{0, …, n}` | `C(n, k) · p^k · (1−p)^(n−k)` | `np` | `np(1−p)` | count of successes in a `Sample` of `n` Bernoulli trials |
| **Geometric** `(p)` | `{1, 2, …}` | `(1−p)^(k−1) · p` | `1/p` | `(1−p)/p²` | trials until the first success; memoryless |
| **Poisson** `(λ)` | `{0, 1, …}` | `e^(−λ) · λ^k / k!` | `λ` | `λ` | count of rare `Independent` occurrences at rate `λ`; the limit of Binomial as `n → ∞`, `np → λ` |
| **Normal** `(μ, σ²)` | `ℝ` | density `e^(−(x−μ)²/2σ²) / √(2πσ²)` | `μ` | `σ²` | the limit of a `Sample Mean` (`Central Limit Theorem`) |

*NOTE*: Poisson and Normal leave the `Rationals` (`e`, `π`, a density in place of a mass); they are named here as the limits the discrete ones approach.

## Limit Laws

Sample
: `Tuple` (or `Queue`) of `Independent` `Random Variables` sharing one `Distribution`.

> `Sample<n> := [X₁, …, Xₙ] :: Independent ∧ ∀i: PD<Xᵢ> = PD<X>`

*NOTE*: *independent and identically distributed* (i.i.d.) — the same trial repeated with no memory. A `Queue` of two-valued ones is the classical *Bernoulli scheme*.

---

Sample Mean
: the average of a `Sample`.

> `X̄ₙ := (1/n) · Σ Xᵢ over i ≤ n`

*NOTE*: itself a `Random Variable`, with `E(X̄ₙ) = E(X)` and `Var(X̄ₙ) = Var(X) / n` — the spread shrinks as the `Sample` grows. The two laws below unpack this.

---

Law of Large Numbers / LLN
: the `Sample Mean` approaches the `Expected Value` as the `Sample` grows.

> `X̄ₙ → E(X)` as `n → ∞`

*NOTE*: the bridge from `Probability` to frequency: the fraction of trials in which an `Event` A occurs is the `Sample Mean` of its `Indicator`, and converges to `P(A)`. Weak form: `P(|X̄ₙ − E(X)| > ε) → 0` for every `ε > 0`; strong form: convergence with `Probability` 1.

---

Central Limit Theorem / CLT
: for a `Sample` of finite `Variance`, the standardized `Sample Mean` approaches the standard normal distribution as the `Sample` grows.

> `√n · (X̄ₙ − E(X)) / SD(X) → Normal(0, 1)` as `n → ∞`

*NOTE*: the conditions carry the theorem. Without independence, or without finite `Variance`, the limit need not be normal. The error of the `Sample Mean` shrinks as `1/√n` whatever the shape of the `Distribution` — which is why the normal appears wherever many small `Independent` effects add up.
