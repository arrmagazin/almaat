---
title: "Matter"
description: "Matter as a Tuple of Attributes read over a common Time, and the Attribution, Entity, Content, Keys, Schema, and Quality built on it."
keywords: [reality, matter, attribute, time]
---

# Matter

## Definitions

---

Time
: `Ray` whose `Numbers` order the readings of `Attributes`; a common `Domain` factor shared by every `Attribute` of a `Matter`.

> `Time := Ray`, `t ∈ Time`

---

Attribute
: `Azon` *from* a (`Set` := **`Basis`**) paired with `Time` *into* a `Fragment` of (`Cluster` := **`Palette`**).

> `Attribute<Basis, Time, Palette> :: (Basis × Time) ⇒ elemOf(Palette)`
>
> `DOM(Attribute) == Basis × Time`, `COD(Attribute) ∈ Palette`

---

Matter
: `Tuple` of `Attributes` with the same `Basis`, `Time` and `Palette`.

> `Matter<Basis, Time, Palette> := M[ Attribute<Basis, Time, Palette>, ... ]`

*NOTE*: fixing `t ∈ Time` yields the **`Slide`** `M@t := M[ A(·, t), ... ]`, a `Matter` over `Basis` alone.

static
: A `Matter` whose `Attributes` ignore `t`.

---

Field
: `Volume` of `Space` made from  `Codomains` of respective `Attributes` of the `Matter`.

> `Field<Matter> := ×[COD(Matter[i],... : ∀i < n ]`

---

Attribution
: `Azon`
*from* `Basis` and `Time`
*into* `Volume` of `Codomains` of the `Matter`.

> `Attribution<Matter> := (E ∈ Matter:Basis, t ∈ Matter:Time) → [Matter[i](E, t),... : ∀i < n ]`

---

Entity
: `Element` of the `Basis` of the `Matter`.

> `Entity ∈ Matter:Basis`

---

Moment
: `Set` of `Attributions` of all `Entities` at the given Time.

> `Moment(t) :=  { M[ A(E, t), ... over A in Matter ] : ∀E ∈ Basis }`

---

Flow
: the `Queue` of `Moments` over `Time`.

> `Flow := t -> Moment(t) : ∀E ∈ Basis }`

---

Thing(Entity)
: a `Queue` of `Attributions` of a single `Entity` across a `Flow`.

> `Thing(Entity) := t -> [Attribution(Entity, t)]`

---

Content
: `Set` of every `Entity` whose `Attribution` at a given `t ∈ Time` `Toks` falls within the `Form`.

> `Content(Form, t) := { Entity :: Attribution(Entity, t) ∈ Form }`

*NOTE*: Let say: `Form` *covers* its `Content`.

## Keys, Relations, Schema

KeyAttribute (primary key)
: `Injective` `Attribute` — its singleton `Mask` is a `KeyMask` of the `Matter`.

> `∀a, b ∈ Basis, ∀t ∈ Time: KeyAttribute(a, t) = KeyAttribute(b, t) ⟹ a = b`

---

Reference (foreign key)
: `Attribute` who are `KeyAttribute` of other `Matters`.

---

Schema
: `Graph` of `References` between `Matters`.

> `Schema<{Type}> := ({Type}, {Relation})`

---

Quality<Matter>
: `Azon` *from* `Field` of `Matter`.

---

Principle
: a `Predicate` that responds with `Unit` on given `Form`.

---

Sigma<n>
: smallest `Form` containing an `(n−1)/n` proportion of the `Basis`.

> `Sigma<n> := argmin(|Place|) : |Content(Place, t)| ≥ ((n−1)/n) · |Basis|`

*NOTE*: `|X|` is the count of `Elements` in `X`; `argmin` selects the argument that minimizes the quantity.
