---
title: "Matter"
description: "Matter as a Tuple of Attributes read over a common Time, and the Attribution, Entity, Content, Keys, Schema, and Quality built on it."
keywords: [reality, matter, attribute, time]
---
## Definitions

---

Time *(Chasis\*)*
: `Ray` whose `Numbers` order the readings of `Attributes`; a common `Domain` factor shared by every `Attribute` of a `Matter`.

> `Time = Ray<0>, t ∈ Time`

---

Attribute *(Ulastivost\*)*
: `Azon` *from* a (`Set` =: **`Basis`** *(Asnova\*)*) paired with `Time` *into* a `Fragment` of (`Cluster` =: **`Palette`**).

> `Attribute<A, Basis, Time, Palette> :: DOM<A> == Basis × Time, COD<A> ∈ Palette`

---

Matter *(Materia)*
: `Tuple` of `Attributes` with the same `Basis`, `Time` and `Palette`.

> `Matter<M, n, Basis, Time, Palette> :: DOM<M> == Interval<n>, i ∈ Interval<n> ⟹ Attribute<M[i], Basis, Time, Palette>`

*NOTE*: fixing `t ∈ Time` yields the **`Slide`** `Slide<M, t> { i -> { E -> M[i][(E, t)] } }`, a `Matter` over `Basis` alone.

---

static
: A `Matter` whose `Attributes` ignore `t`.

---

Field
: `Volume` of `Space` made from  `Codomains` of respective `Attributes` of the `Matter`.

> `Field<M> = Volume<{ i -> COD<M[i]> }>`

---

Attribution
: `Azon`
*from* `Basis` and `Time`
*into* `Volume` of `Codomains` of the `Matter`.

> `Attribution<M> { (E, t) -> { i -> M[i][(E, t)] } }`

---

Entity *(Asobnik\*)*
: `Element` of the `Basis` of the `Matter`.

> `Entity<E, Basis> :: E ∈ Basis`

---

Moment
: `Set` of `Attributions` of all `Entities` at the given Time.

> `Moment<M, Basis, t> = COD<{ E -> (E ∈ Basis)[Attribution<M>[(E, t)]] }>`

---

Flow *(Rux)*
: the `Queue` of `Moments` over `Time`.

> `Flow<M, Basis> { t -> Moment<M, Basis, t> }`

---

Thing<Entity> *(Shtuka)*
: a `Queue` of `Attributions` of a single `Entity` across a `Flow`.

> `Thing<M, E> { t -> Attribution<M>[(E, t)] }`

---

Content *(Zmest)*
: `Set` of every `Entity` whose `Attribution` `Spond` at a given `t ∈ Time` falls within the `Form`.

> `Content<M, Form, t> { E -> (Attribution<M>[(E, t)] ∈ Form)[E] }`

*NOTE*: Let say: `Form` *covers* its `Content`.

## Keys, Relations, Schema

KeyAttribute (primary key) *(Prykmeta Kliuchow\*)*
: `Injective` `Attribute` — its singleton `Mask` is a `KeyMask` of the `Matter`.

> `KeyAttribute<K, Basis, Time, Palette> :: Attribute<K, Basis, Time, Palette>, ({a, b} ⊆ Basis ∧ t ∈ Time ∧ K[(a, t)] IS K[(b, t)]) ⟹ a IS b`

---

Reference (foreign key) *(Spasylka\*)*
: `Attribute` who are `KeyAttribute` of other `Matters`.

---

Schema *(Skema)*
: `Graph` of `References` between `Matters`.

> `Schema<T, R> = (T, R)`

*NOTE*: `T` is the `Set` of `Matters`, `R` the `Set` of `References` between them.

---

Quality<Matter>
: `Azon` *from* `Field` of `Matter`.

---

Sigma<n> *(Jadro<n>\*)*
: smallest `Form` containing an `(n − 1) / n` proportion of the `Basis`.

> `Sigma<n, M, Basis, t> = argmin F ∈ { Q -> (|Content<M, Q, t>| ≥ ((n − 1) / n) · |Basis|)[Q] }: |F|`

*NOTE*: `|X|` is the count of `Elements` in `X`; `argmin F ∈ S: e` selects the `Element` of `S` that minimizes `e`.
