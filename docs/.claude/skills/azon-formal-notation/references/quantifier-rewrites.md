# Quantifier rewrites (Azon)

User decision, mid-episode: "avoid use ∀ and ∃". Options offered: Azon-native (chosen), named predicate families `All<S,P>` / `Some<S,P>`, or binders spelled as words.

Why Azon-native: `|S|` (Cardinality) is defined before Numerals as a two-reading count (`|S| > 0`, `|S| < 1`), so *some* and *every* need no binder.

Examples:
- Subset: `A ⊆ B ⟺ A.B == A`
- Codomain: `COD<A> { y -> (|DOM<A.@<y>>| > 0)[y] }`
- Intersection: `⋂<{S₁, S₂, …, Sₙ}> = S₁.S₂.….Sₙ`, binary `A ∩ B = A.B` (composition of Sets)
- Injective: `({x, y} ⊆ DOM<A> ∧ A[x] IS A[y]) ⟹ x IS y`

Pitfall: a literal `{ x -> V₀ }` means "always responds with V₀"; for a per-element response, write the law form instead.