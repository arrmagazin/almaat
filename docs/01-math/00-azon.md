---
title: "Azon"
description: "Azon is the sole primitive of the entire framework."
keywords: [azon]
---

## Kwam, Atos, Azon

Kwam
: *transition* from `Kwam` to `Kwam`.

Atos
: *bearer* of *ability* to *assume sameness or discernibility* over `Kwam`

*NOTE*: obritrary *applying* of such *ability* do *emanates* *plentitude of assignments*.

Azon
: one of *plentitude*, represented as *assignments*
: made from every (`Azon` =: **`Arg`**) to corresponding (`Azon` =: **`Spond`**).
: and noted with syntax defined in [Azon Notation](../99-appendices/09-azon-notation.md)

> `A<x>{ - | x | * -> N | A[x] | A[*] }` - formula sample

## Zeron and Uniton

Zeron *(Puston)*
: `Azon` that *always* responds with itself.

> `Zeron{ * -> Zeron }` - short `Z`

**Def**: `Azon` defined recursively by itself, thus notates *non-constructuctiveness*.

---

**DEF**: response with `Zeron` *called* **`empty`**, *otherwise* **`valent`**.

---

Uniton *(Proston)*
: `Azon` that *always* responds with `Arg`.

> `Uniton{  *  ->  * }` - short `U`

**DEF**: response with the `Arg` itself *called* **`fixed`**, *otherwise* **`flexed`**.

## Composability

Arrow *(Strelka)*
: an `Azon` that has at most one `valent` response.

> `Arr<subj,J> { subj | * -> J[s] | Z }` - in short <subj, obj>

**DEF**: the single `valent` `Arg` (`s` =: **`Subject`**), its response (`A[s]` =: **`Object`**), and the `Azon` that carries one to the other (`A` =: **`Jector`**).

---

Composition *(Tvor)*
: The `Azon` built on top of `Arrow` by using the `Sponds` of the `Object` as the `Args` of the `Subject`.

> `.<A,B> { x -> A[B[x]] }` - in short `A.B`

**NOTE**: `Composition` is **`associative`** by construction.

> `(A.B).C = A.(B.C)`

## Predicates

Predicate *(Bikon)*
: an `Azon` that *always* responds with `Uniton` or `Zeron`.

> `Predicate { * -> ( U | Z ) }`

---

Indicator *(Ukaz)*
: `Predicate` that responds `empty` only to `Zeron`.

> `#{ Z | * -> Z | U }`

**NOTE**: short for `#.A` is `#A`

---

Invertor *(Abrat)*
: `Predicate` that responds with `Uniton` only to `Zeron`.

> `!{ Z | * -> U | Z }`

**NOTE**: short for `!.A` is `!A`

---

Verum
: `Predicate` that *always* responds with `Uniton`.

> `⊤{ * -> U }`

## Connectivity

Conjunction
: `Predicate` that responds with `Q`'s indication where `P` holds, and with `Zeron` elsewhere.

> `∧<P,Q> { x -> #P[x][#Q[x]] }` — short `P ∧ Q`

**NOTE**: `Conjunction` is **`commutative`**.

---

Disjunction
: `Predicate` that responds with `Uniton` where `P` holds, and with `Q`'s indication elsewhere.

> `∨<P,Q> { x -> { Z | U -> U | ⊤ }[#P[x]][#Q[x]] }` — short `P ∨ Q`

**NOTE**: `Disjunction` is **`commutative`**.

---

Implication
: `Predicate` that responds with `Q`'s indication where `P` holds, and with `Uniton` elsewhere.

> `⟹<P,Q> { x -> { Z | U -> ⊤ | U }[#P[x]][#Q[x]] }` — short `P ⟹ Q`

## Constructiveness

AXIOM-1 (Halt)
: The response to `Zeron` is *always* `Zeron`.

> `X1<A> { Z | * -> Z | A[*] }`

---

AXIOM-2 (Anti-Self-Valent)
: The response to the `Azon` itself is *always* `Zeron`.

> `X2<A> { A | * -> Z | A[*] }`

---

AXIOM-3 (Anti-Self-Generation)
: non-zero `Azon` cannot respond with itself

> `X3<A> { - | *  -> A | A[*] }`

## Sameness and Equality

Singleton *(Ton)*
: `fixed` `Arrow` - `Arr<s,U>` — the `Azon` that responds with `s` to `s` alone.

> `@<s>{ s | * -> s | Z }`

---

Sameness *(Tojsamnost)*
: `Predicate` that responds with `Uniton` to `A` alone.

> `IS<A> { A | * -> U | Z }` — short `A IS B`

*NOTE*: `IS<A> := #@<A>` for valent `A`.

*NOTE*: `IS<Z>` is `Invertor` and `IS<Z>.IS<Z>` is `Indicator`.
By `AXIOM-2`, `IS<A>` is never `A` itself, else `A[A]` would be `Uniton`.

---

Intensional Equality *(Sutnasnaja Rownasc\*)*
: Every `Azon`-probe responds to `A` and `B` with coinciding responses; the negation of `Intensional Distinguishability`.

> `IEQ<A,B> { x -> x[A] IS x[B] }` — short `A === B`

*NOTE*: Leibniz's *identity of indiscernibles*, `∀F: F(a) ⟺ F(b) ⟹ a = b`, which second-order logic takes as the definition of equality (*Leibniz equality*). Here the quantifier ranges over `Azon` probes, not over a separate universe of predicates.

---

Extensional Equality *(Zmestavaja Rownasc\*)*
: Every `Azon` receives coinciding responses from `A` and `B`.

> `EEQ<A,B> { x -> A[x] IS B[x] }` — short `A == B`

*NOTE*: ZFC's *axiom of extensionality*, `∀z: z ∈ A ⟺ z ∈ B ⟹ A = B`, and type theory's *function extensionality*, `(∀x: f(x) = g(x)) ⟹ f = g`. For a `Set` the two coincide, since membership *is* the response: `z ∈ S :: S[z] IS z`.

---

Total Equality *(Pownaja Rownasc\*)*
: Both `Intensional Equality` and `Extensional Equality` hold.

> `EQ<A,B> { x -> IEQ<A,B>[x] ∧ EEQ<A,B>[x] }` — short `A = B`

*NOTE*: The two halves collapse into one in classical set theory, where an object *is* its extension. They stay apart here because an `Azon` is both operand and mapping — probed by `x[a]`, probing by `a[x]`.

*NOTE*: `EQ` could be stated recursively — `#[A] ⟺ #[B]`, and `EQ` again on `x[A], x[B]` and on `A[x], B[x]` for every probe `x`. An equation `R = F[R]` is a definition only once a solution is chosen. The least one is empty: an `Azon` answers every probe, so probing never bottoms out. The greatest one is *bisimilarity*, the equality Aczel's AFA gives non-well-founded sets. It keeps only the match on `Zeron` as primitive, but it quantifies over the probes, `EQ` itself among them, and it is not decidable. `IS` is kept as the match instead, so `EQ` stays a constructed `Azon`.

## SEE ALSO

- [Azon Notation](../99-appendices/09-azon-notation.md) — the grammar of the formulas on this page.
- [Identity of Indiscernibles (Wikipedia)](https://en.wikipedia.org/wiki/Identity_of_indiscernibles) — `∀x∀y[∀F(Fx ⟺ Fy) -> x = y]`; grounds `≠` and `=`.
- [Axiom of Extensionality (Wikipedia)](https://en.wikipedia.org/wiki/Axiom_of_extensionality) — `∀x∀y[∀z(z ∈ x ⟺ z ∈ y) -> x = y]`; grounds `==` for a `Set`.
- [Extensionality (Wikipedia)](https://en.wikipedia.org/wiki/Extensionality) — the general principle, including function extensionality: equality by external behaviour rather than internal definition.
- [Intension (Wikipedia)](https://en.wikipedia.org/wiki/Intension) — intension as the properties connoted, extension as the referents: why `x[a]` is the intensional side and `a[x]` the extensional one.
- [Extensional and intensional definitions (Wikipedia)](https://en.wikipedia.org/wiki/Extensional_and_intensional_definitions) — the same contrast applied to definitions: listing instances versus stating conditions.
- [Extensional type theory (nLab)](https://ncatlab.org/nlab/show/extensional+type+theory) — intensional identity is so named because it does *not* validate function extensionality; the reason `==` is the extensional criterion.
- [Equality (mathematics) (Wikipedia)](https://en.wikipedia.org/wiki/Equality_(mathematics)) — broader survey of equality notions.
- [Russell's paradox (Wikipedia)](https://en.wikipedia.org/wiki/Russell%27s_paradox) — `R = {x | x ∉ x} ⟹ (R ∈ R ⟺ R ∉ R)`; the contradiction from unrestricted self-membership that `AXIOM-2` forecloses by fixing `A[A] IS Zeron`.
- [Bisimulation (Wikipedia)](https://en.wikipedia.org/wiki/Bisimulation) — bisimilarity is the union of all bisimulations, the greatest fixed point; the only solution of a recursive `EQ` over `Azon`.
- [Coinduction (Wikipedia)](https://en.wikipedia.org/wiki/Coinduction) — `μF` as the intersection of `F`-closed sets, `νF` as the union of `F`-consistent sets; why a recursive equation names two relations.
- [Non-well-founded set theory (Wikipedia)](https://en.wikipedia.org/wiki/Non-well-founded_set_theory) — AFA: bisimilar sets are equal; the set theory whose equality a recursive `EQ` would reproduce.
- [Mostowski collapse lemma (Wikipedia)](https://en.wikipedia.org/wiki/Mostowski_collapse_lemma) — equality grounded by well-founded recursion; what `Azon` lacks, since `U[x] = x`.
- [Impredicativity (Wikipedia)](https://en.wikipedia.org/wiki/Impredicativity) — a definition that quantifies over what it defines; a recursive `EQ` ranges over probes that include `EQ` itself.
- [Scott–Curry theorem (Wikipedia)](https://en.wikipedia.org/wiki/Scott%E2%80%93Curry_theorem) — equivalence of λ-terms is undecidable; a behavioural `EQ` is never a `Predicate`.
- [Gordon, *A Tutorial on Co-induction and Functional Programming* (1994)](https://www.microsoft.com/en-us/research/wp-content/uploads/1994/01/fp94.pdf) — induction and coinduction derived dually from Tarski–Knaster; bisimilarity coincides with contextual equivalence.
