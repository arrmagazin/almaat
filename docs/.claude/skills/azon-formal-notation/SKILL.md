---
name: azon-formal-notation
description: Use when writing Azon formulas; no ∀, ∃, ∃!, ∄.
category: documentation
---

# Azon formal notation

Never write `∀`, `∃`, `∃!`, or `∄` in an Azon formula, grammar rule, or table. Say *every* and *some* with Azon constructions.

- Law level: a free name already means *every* Azon. `∀x ∈ S: e` becomes `x ∈ S ⟹ e`.
- Some `Element` of `S` is in `E`: `|S ∩ E| > 0`. None: `|S ∩ E| < 1`. Exactly one: `|S ∩ E| IS 1`.
- Every `Element` of `S` is in `E`, inside a literal: `|S ∖ E| < 1`. Or write `S ⊆ E` where it fits.
- Prefer a native construction when one exists: `COD<A> { y -> (|DOM<A.@<y>>| > 0)[y] }`, not an existential binder.
- Keep `⊆` as a comparison defined by composition: `A ⊆ B ⟺ A.B == A`.
- `Σ`, `Π`, `max`, `min`, `argmax`, `argmin` binders stay.
- After editing, grep the touched files for `[∀∃∄]` and expect zero hits. Fix any hit before reporting done.

Rationale and the rejected alternatives: see [references/quantifier-rewrites.md](references/quantifier-rewrites.md).
