---
title: "Spaces"
description: "The Space as a Tuple of Axis, and the Cluster, Point, Volume, and Place built on it."
keywords: [math, spaces]
---
## Space, Point, Volume

---

Space
: `Tuple` *into* (`Elements` := `Axis`) of `Cluster`.

> `Space<Cluster> := S[a₁, a₂, ..., aₙ] :: ∀i<n, A[i] ∈ Cluster`

---

Point
: `Tuple` of `Elements`, one drawn from corresponding `Axis` of the `Space`.

> `Point<Space> := P[e₁, e₂, ..., eₙ] :: ∀i<n, P[i] ∈ Space[i]`

---

Place
: `Set` of `Points` of same `Space`.

> `Place<Space> := { Point<Space> }`

---

Volume (Cartesian product)
: `Place` of *ALL* `Points` of the `Space`.

> `Volume<Space> ( a₁ × a₂ × ... × aₙ )`

## Partials

---

View
: A `Place` consists of same-`Mask` `Slicea` on ALL `Points` of  (given `Place` := `**Origin**`).

> `View<Place, Mask> := { Mask.Point :: ∀ Point ∈ Place }`

---

Subspace
: `Slice` of `Space`.

> `Subspace<Space, Mask> := Mask.Space`

---

Zone
: `Space` of a subsets of corresponding `Axises` of a given `Space`.

> `Zone<Space> := Z[a₁, a₂, ..., aₙ] :: ∀i<n, Z[i] ⊆ Space[i]`

---

Region
: `Volume` of the `Zone` of `Space`.

> `Region := Set₁ ⊆ COD(a₁) × Set₂ ⊆ COD(a₂) × ... × Setₙ ⊆ COD(aₙ)`

## Endo-space

EndoSpace
: `Space` whose `Cluster` is `Singleton`.

> `S^ⁿ :=  [S, S, ... S)`
---

EndoVolume
: `Volume` in `EndoSpace``.

> `S×ⁿ :=  (S × S × ... × S)`
