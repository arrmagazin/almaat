# Fundamental Data Structures

The concrete data structures used in computing — each an `Azon` already available from
[00-azon](../docs/0-math/00-azon.md), [01-sets](../docs/0-math/01-sets.md),
[03-graphs](../docs/0-math/03-graphs.md) and [04-numerals](../docs/0-math/04-numerals.md),
narrowed by a constraint.

Five carriers are defined upstream and are *not* redefined here:
[`Set`](../docs/0-math/01-sets.md), [`Graph`](../docs/0-math/03-graphs.md),
[`Path`](../docs/0-math/03-graphs.md), [`Cycle`](../docs/0-math/03-graphs.md) and
[`Tree`](../docs/0-math/03-graphs.md).

*NOTE*: the CS-sense FIFO is named `Fifo` here, because `Queue` is already taken — in the
framework a `Queue` is an `Azon` over a `Ray`, an unbounded sequence, not a discipline of ends.

## Indexed

**`Array<X>`** := `Tuple` all of whose `Toks` are `Elements` of a single `Set`.

> `Array<X> :: Tuple :: DOM = Interval(n), COD ⊆ X`

*NOTE*: a `Tuple` is already indexed access; `Array` adds only homogeneity of the `Codomain`.
Because the `Domain` is an `Interval`, an index locates its `Element` without traversal — the
carrier of sorting and searching.

---

**`Linked List<X>`** := `Path` whose `Vertex` are `Elements` of a `Set`.

> `Linked List<X> := Path<G> :: Vertex ⊆ X, ∀V: |out(V)| ≤ 1`

*NOTE*: the same order as an `Array`, reached differently — the `Domain` is not an `Interval`, so
an `Element` is found by walking `Arrows`. Length is not fixed in advance, which is what makes it
the carrier of `Stack` and `Fifo`.

---

**`Stack`** := `Linked List` admitting insertion and removal at the same end.

> `Stack :: push: x → V₀, pop: V₀ → x`

*NOTE*: last in, first out. The single end makes the structure its own undo history — expression
evaluation, backtracking, call frames.

---

**`Fifo`** := `Linked List` admitting insertion at one end and removal at the other.

> `Fifo :: push: x → Vₙ, pop: V₀ → x`

*NOTE*: first in, first out — arrival order is preserved, so the structure is fair. Task
scheduling, event processing, waiting lists.

## Keyed

**`Map<K,V>`** := `Azon` from a `Set` of `Keys` into a `Set` of `Values`.

> `Map<K,V> := k → v :: k ∈ K, v ∈ V`

*NOTE*: `K` must carry a [`KeyMask`](../docs/0-math/06-structures.md) — no two entries share a
`Key`. An `Array` is the `Map` whose `K` is an `Interval`; a dictionary is the `Map` whose `K` is a
`Set` of `Words`.

---

**`Hash Table`** := `Map` reached by `Composition` with a `Scoring` `Azon` sending every `Key` into
an `Interval`.

> `Hash Table := Array.hash :: hash: K ⇒ Interval(m)`

*NOTE*: for `|K| > m` the hash cannot be `Injective`, so distinct `Keys` land in one cell; the cell
holds a `Linked List` of them. Cost stays near-constant while occupancy stays below `m` — the
carrier of database indexes, caches and dictionaries.

---

**`Bloom Filter`** := `Array` of bits marked by `n` distinct hash `Azons`, tested by their
conjunction.

> `add(x) :: ∀i ∈ Interval(n): B[hashᵢ(x)] = 1`
> `test(x) := ⋀ᵢ B[hashᵢ(x)]`

*NOTE*: every stored `Element` tests positive, and so may some others — a negative answer is
certain, a positive one is not. It trades exactness for a size independent of the `Elements`
stored: spell checkers, router tables, deduplication.

## Tree-shaped

**`Trie`** := `Tree` whose `Arrows` are labelled by `Codes` of an `Alphabet`, so each `Path` from
the `Root` spells a `Word`.

> `Trie<Alphabet> := Tree :: label: Arrow ⇒ Alphabet, Path(Root → V) ≃ Word`

*NOTE*: lookup cost follows `Word` length, not the count of stored `Words`, and a shared prefix is
a shared `Path`. String matching, spell checkers, IP routing tables.

---

**`Suffix Tree`** := `Trie` holding every suffix of one `Word`.

> `Suffix Tree<w> := Trie :: {Path(Root → Leaf)} = {suffix(w, i) :: i ∈ Interval(|w|)}`

*NOTE*: every substring of `w` is a prefix of some suffix, hence a `Path` from the `Root` — so
substring search reduces to one descent. Longest repeated substring, occurrence counting.

---

**`Heap`** := `Tree` whose every `Vertex` precedes its children under a `Total Order`.

> `Heap :: ∀V, ∀C ∈ children(V): V ≤ C`

*NOTE*: the order binds parent to child only, never sibling to sibling — a `POSet`, not a sorted
`Array`. The extremum sits at the `Root` and costs nothing to read, which is the whole point:
priority queues, selection, heapsort.

---

**`Balanced Tree<k>`** := `Tree` whose `Root`-to-`Leaf` `Paths` differ in length by at most `k`.

> `Balanced Tree<k> :: ∀P, P' ∈ Path(Root → Leaf): ||P| − |P'|| ≤ k`

*NOTE*: bounding `Path` length is what keeps descent logarithmic in the number of `Vertex`; an
unbalanced `Tree` degenerates into a `Linked List`. The three structures below are three
disciplines for maintaining that bound under insertion.

---

**`B-tree<m>`** := `Balanced Tree<0>` whose `Fan-Out` lies between `m/2` and `m`.

> `B-tree<m> := Balanced Tree<0> :: ∀V ≠ Root: m/2 ≤ |out(V)| ≤ m`

*NOTE*: all `Leaves` sit at one depth, and a wide `Vertex` is sized to one disk block, so height
falls as `log_m` and each level costs a single read. The carrier of on-disk indexes and filesystems.

---

**`AVL Tree`** := `Balanced Tree<1>` with binary `Fan-Out`, measured on subtree height.

> `AVL :: |out(V)| ≤ 2 ∧ ∀V: |height(left(V)) − height(right(V))| ≤ 1`

*NOTE*: the tightest common bound, restored by rotation after each insertion — fast to search,
costlier to write.

---

**`Red-Black Tree`** := binary `Tree` two-coloured so that every `Root`-to-`Leaf` `Path` carries
equally many black `Vertex`, and no red `Vertex` has a red parent.

> `RB :: colour: Vertex ⇒ {red, black} :: ∀P: |black(P)| = const ∧ ¬(red(V) ∧ red(parent(V)))`

*NOTE*: the two rules bound the longest `Path` at twice the shortest — weaker balance than an `AVL Tree`,
bought with fewer rotations per write. The usual choice for in-memory ordered `Maps`.

---

**`Segment Tree<S, op>`** := `Tree` whose `Vertex` are `Ranges` — the `Root` the whole `Range`,
each `Vertex` the `Union` of its children's — carrying `op` folded over its own `Range`.

> `Segment Tree<S, op> :: Root = Range(0, n), V = ⋃ children(V), value(V) = op(S ∩ V)`

*NOTE*: any `Range` decomposes into `O(log n)` such `Vertex`, so a range query is a partial fold
rather than a scan, and a point update repairs one `Path`. Range minimum, sum, and similar queries.

---

**`Fenwick Tree`** := `Array` whose cell `i` holds the `Add`-fold of the `Range` ending at `i` whose
length is the lowest set bit of `i`.

> `Fenwick[i] := Σ S[j] :: i − lowbit(i) < j ≤ i`

*NOTE*: the `Tree` is implied by the binary `Code` of the index and stores no `Arrows` at all —
descent is bit arithmetic on `i`. Half the space of a `Segment Tree`, at the cost of supporting only
invertible `Operations`: prefix sums, running counts.

---

**`K-Tree<Space>`** := `Tree` over a `Space` in which each level splits its `Points` on one `Axis`,
cycling through the `Axes`.

> `K-Tree<Space> :: level(d) splits on Axis(d mod k)`

*NOTE*: each `Vertex` owns a region of the `Space`, so a search prunes whole subtrees whose region
lies farther than the best candidate found. Nearest-neighbour and range search in image processing
and computer graphics.

## Shared

**`Tuple Space`** := `Set` of `Tuples` shared between participants and read by `Mask` rather than by
`Key`.

> `read(Mask, pattern) ⇒ {t ∈ S :: Abstraction(Mask, t) = pattern}`

*NOTE*: the `Mask` leaves positions free, so one read matches a whole `Cluster` of `Tuples` —
addressing by shape, not by identity. This lets participants coordinate without naming each other,
the basis of distributed coordination.
