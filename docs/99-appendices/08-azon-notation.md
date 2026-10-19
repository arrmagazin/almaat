---
title: "Azon Notation"
description: "The formal grammar of the Azon formulas: literal, pattern and response, parameters, application, composition, binders, every and some, arithmetic, relations, and the layout of a definition."
keywords: [appendices, notation, grammar, azon]
---
The formal grammar of the formulas written in [Azon](../01-math/00-azon.md) and [Sets](../01-math/01-sets.md): how an `Azon` is written down, applied, composed, quantified and compared.

## Grammar

EBNF, terminals in quotes. `ident` is any name: a word (`Arr`, `IS`), a letter (`A`, `x`) or a symbol (`#`, `⊤`, `∧`).

```ebnf
statement  = definition | law ;
definition = ident [ params ] ( literal | ":=" law ) ;

params     = "<" ident { "," ident } ">" ;
literal    = "{" patterns "->" responses "}" ;
patterns   = pattern  { "|" pattern } ;
responses  = response { "|" response } ;    (* exactly one response per pattern *)
pattern    = "*" | "-" | ident | "(" ident { "," ident } ")" ;
response   = expr | "(" expr { "|" expr } ")" ;

law        = [ atom "::" ] relation { "," relation } ;
relation   = expr { relop expr } | expr ":" expr "⇒" expr ;
expr       = binder | conn ;
binder     = bindop ident { "," ident } [ ( "∈" | "∉" ) sum ] ":" expr ;
conn       = cmp { connop cmp } ;               (* one connective, or parentheses *)
cmp        = sum { cmpop sum } ;                (* a chain: every neighbour pair holds *)
sum        = prod { sumop prod } ;
prod       = chain { prodop chain } ;
chain      = term { "." term } [ "." "…" "." term ] ;
term       = atom { "[" expr "]" | "^" atom } ;
atom       = ident [ "<" expr { "," expr } ">" ] | literal | enum | tuple
           | "|" expr "|" | "*" | "(" expr ")" ;
enum       = "{" expr { "," expr } [ "," "…" ] "}" ;
tuple      = "(" expr "," expr { "," expr } ")" ;

bindop     = "Σ" | "Π" | "max" | "min" | "argmax" | "argmin" ;
connop     = "∧" | "∨" | "⟹" ;
cmpop      = "IS" | "∈" | "∉" | "∋" | "⊆" | "⊄" | "<" | "≤" | ">" | "≥" ;
sumop      = "+" | "−" | "∪" | "∖" ;
prodop     = "·" | "/" | "×" | "∩" ;
relop      = "=" | "==" | "===" | "⟺" ;
```

## Literal

`{ patterns -> responses }` is an `Azon` written out by its responses.

| Form | Reading |
| --- | --- |
| `{ * -> R }` | every `Arg` gets `R` |
| `{ p1 \| p2 -> r1 \| r2 }` | patterns are tried left to right; the first that matches gives the response at the same position |
| `{ Z \| * -> Z \| U }` | `Zeron` gets `Zeron`, any other `Arg` gets `Uniton` (`Indicator`) |
| `{ * -> ( U \| Z ) }` | a *choice*: the response is one of the listed ones, which one is left open (`Predicate`) |

The `|` inside parentheses lists a choice; the bare `|` pairs patterns with responses by position.

### Patterns

| Pattern | Matches |
| --- | --- |
| `*` | any `Arg`; written last, as the catch-all |
| a bound name — a constant (`Z`, `U`) or a parameter (`s`, `A`) | that `Azon` alone, by `Sameness` |
| a fresh name (`x`) | any `Arg`, and binds the name to it inside the responses |
| `(a, b)` | a `Tuple` of as many `Sponds`, and binds each name to its `Spond` |
| `-` | *never*: no `Arg`; the response at its position is never given (`X3<A> { - \| * -> A \| A[*] }` — no `Arg` gets `A`) |

### Responses

| Response | Reading |
| --- | --- |
| a name (`Z`, `U`, `A`) | that `Azon` |
| `*` | the matched `Arg` itself (`U{ * -> * }`) |
| an expression (`A[*]`, `A[B[x]]`) | the `Azon` it evaluates to, with `*` and bound names standing for the `Arg` |

## Naming and parameters

| Form | Example | Reading |
| --- | --- | --- |
| `N{ … }` | `Z{ * -> Z }` | the literal named `N` |
| `N<P,Q> { … }` | `∧<P,Q> { x -> … }` | a family of `Azons`, one per choice of the parameters |
| `N<a,b>` | `IS<A>`, `Arr<s,U>` | one member of the family: the parameters given |
| `X =: N` | (`Azon` =: **`Arg`**) | the `Azon` in that role is *called* `N` from here on |
| `— short P ∧ Q` | `∧<P,Q>` | a two-parameter family written infix |
| `— short x ∈ S` | `∈<S>[x]` | a one-parameter family applied, written infix: the `Arg` on the left, the parameter on the right |

## Application

| Form | Reading |
| --- | --- |
| `A[x]` | the response of `A` to `x` |
| `A[x][y]` | apply `A` to `x`, then apply that response to `y` — how a response that is itself an `Azon` is used |
| `{ … }[x]` | an unnamed literal applied in place |

Example: `#P[x][#Q[x]]` — `#P` is the `Composition` `#.P`, so `#P[x]` is `Uniton` where `P` holds and `Zeron` elsewhere; `Uniton` then passes `#Q[x]` on and `Zeron` absorbs it, which is `Conjunction`.

*NOTE*: application is always `A[x]`, in prose too (`S[z]`); round brackets `f(x)` appear only inside a quoted classical formula.

## Composition

`A.B` is the `Azon` that feeds `B`'s response to `A`: `.<A,B> { x -> A[B[x]] }`. It reads right to left, the order of application `A[B[x]]`, as the classical `A ∘ B`. `S₁.S₂.….Sₙ` composes the whole list, as the subscripts show.

## Binders and enumeration

| Form | Reading |
| --- | --- |
| `Σi ∈ I: e`, `Πi ∈ I: e` | the sum, the product of `e` over the `Elements` of `I` |
| `max x ∈ S: e`, `min …` | the greatest, the least value of `e` |
| `argmax x ∈ S: e`, `argmin …` | the `Element` that gives it |
| `Σi, j ∈ I: e` | over every pair; one name per bound `Azon` |
| `{a, b}` | the `Set` of the listed `Azons`: `{ a \| b \| * -> a \| b \| Z }` |
| `{S₁, S₂, …, Sₙ}` | the same, the list going on as the subscripts show |

The body `e` reaches to the end of the expression; a binder inside a larger expression is put in parentheses: `(Σi ∈ I: e) + 1`.

A `Set` is written by its responses, as any `Azon`: a predicate applied to the `Arg` passes it on or absorbs it. `{ x -> (x ∈ A ∧ x ∉ B)[x] }` responds with `x` where the predicate holds and with `Zeron` elsewhere — the classical `{x : x ∈ A, x ∉ B}`.

## Every and some

There are no quantifiers. *Every* and *some* come from the `Azon` itself:

| Meaning | In a law | Inside a literal |
| --- | --- | --- |
| every `Azon` | a free name: `(A.B).C = A.(B.C)` holds for every `A`, `B`, `C` | — |
| every `Element` of `S` | `x ∈ S ⟹ e` | `\|S ∖ E\| < 1` |
| some `Element` of `S` | `\|S ∩ E\| > 0` | `\|S ∩ E\| > 0` |
| no `Element` of `S` | `\|S ∩ E\| < 1` | `\|S ∩ E\| < 1` |
| exactly one | `\|S ∩ E\| IS 1` | `\|S ∩ E\| IS 1` |

`E` is the `Set` where `e` holds, `{ x -> (e)[x] }`, and `|S|` is the `Cardinality` (see [Combinatorics](04-numerals-to-combinatorics.md)). A native construction is preferred where one exists: the `Args` that `A` sends to `y` are `DOM<@<y>.A>`, so `COD<A> { y -> #[DOM<@<y>.A>][y] }` needs no count at all.

## Arithmetic and tuples

| Form | Reading |
| --- | --- |
| `0`, `1`, `n` | a `Number`: `n` is `Plus^n`, so `0` is `Uniton` (see [Numerals](../01-math/04-numerals.md)) |
| `A^n`, `A²` | `A` composed with itself `n` times; a superscript is the same power |
| `a + b`, `a − b`, `a · b`, `a / b` | the arithmetic of `Numerals` |
| `a < b`, `a ≤ b`, `a > b`, `a ≥ b` | comparisons of `Numerals` |
| `A × B` | the `Set` of `Tuples` `(a, b)` with `a ∈ A`, `b ∈ B` |
| `A ∖ B` | the `Elements` of `A` that are not in `B` |
| `\|S\|` | the `Cardinality` of `S`: how many `Elements` it has |
| `(a, b)` | the `Tuple` of `a` then `b`: `{ 0 \| 1 \| * -> a \| b \| Z }` |
| `a < x ≤ b` | a chain: every neighbour pair holds |

`·` `/` `×` `∩` bind tighter than `+` `−` `∪` `∖`, as in school arithmetic.

## Relations and laws

| Form | Reading |
| --- | --- |
| `a IS b` | `a` and `b` are the same `Azon` (`Sameness`) |
| `A === B` | `Intensional Equality`: every probe responds alike to `A` and `B` |
| `A == B` | `Extensional Equality`: `A` and `B` respond alike to every `Arg` |
| `A = B` | `Total Equality`: both of the above; also the plain equation of a law |
| `N := e`, `N<a> := e` | `N` *is defined as* `e` (`∉<S> := !S`) |
| `P ⟺ Q` | both hold or neither does |
| `N :: law` | `N` is the `Azon` for which the law holds (`Id :: Id.A = A.Id = A`) |
| `N<A> :: law` | `A` has the property `N` when the law holds (`Endogenous<A> :: DOM<A> == COD<A>`) |
| `law, law` | both laws hold |
| `a = b = c` | a chain: every neighbour pair is equal |
| `A: X ⇒ Y` | `A` goes *from* `X` *into* `Y`: `DOM<A> ⊆ X, COD<A> ⊆ Y` |

A comparison (`cmpop`) is a predicate: it gives `Uniton` or `Zeron` and may sit inside an expression. A relation (`relop`) is a claim about every `Arg` or every probe and stays at the top of a law. A comparison may be defined by a relation: `A ⊆ B ⟺ B.A == A` gives `Uniton` exactly when the relation holds.

## Precedence

Tightest first, as the formulas use it:

1. `[ ]` application and `< >` parameters — `#.@<A>` is `#.(@<A>)`
2. `.` composition — `IS<A> = #.@<A>` compares `IS<A>` with the composite
3. `·`, `/`, `×`, `∩`
4. `+`, `−`, `∪`, `∖`
5. `IS`, `∈`, `∉`, `∋`, `⊆`, `⊄`, `<`, `≤`, `>`, `≥` — `x[A] IS x[B]`, `x ∈ A ∩ B`
6. `∧`, `∨`, `⟹` — `IEQ<A,B>[x] ∧ EEQ<A,B>[x]`; two different ones need parentheses: `(A ⊆ B ∧ B ⊆ C) ⟹ A ⊆ C`
7. binders `Σ`, `Π`, `max`, … — the body reaches to the end
8. `=`, `==`, `===`, `⟺` — `A ⊆ B ⟺ B.A == A`
9. `,` between laws
10. `::`
11. `:=` — `Space<Cluster> := S[…] :: …` defines `Space` by the whole law

## Reserved names

| Name | Azon | Name | Azon |
| --- | --- | --- | --- |
| `Z` | `Zeron` | `U` | `Uniton` |
| `#` | `Indicator` | `!` | `Invertor` |
| `⊤` | `Verum` | `.` | `Composition` |
| `∧` `∨` `⟹` | `Conjunction`, `Disjunction`, `Implication` | `@<s>` | `Singleton` |
| `Arr<s,A>` | `Arrow` | `IS<A>` | `Sameness` |
| `IEQ` `EEQ` `EQ` | the three equalities | `Id`, `Nil` | `Identity`, `Nil` |
| `X1` `X2` `X3` | the axioms as `Azon` filters | `DOM<A>`, `COD<A>` | `Domain`, `Codomain` |
| `∈` `∉` `∋` `⊆` | membership, subset | `∩` `∪` `⋂` `⋃` `∁` | intersection, union, complement |

Role words: `Arg` (what is responded to), `Spond` (the response), `empty` / `valent` (a response that is / is not `Zeron`), `fixed` / `flexed` (a response that is / is not the `Arg`).

## Layout of a definition

Each entry of the text around the formulas follows one layout:

| Element | Markdown | Example |
| --- | --- | --- |
| term, with its native name | definition-list term, native name in italics | `Zero *(Puston)*` |
| native name under consideration | `\*` after the name | `Nil *(Nishto\*)*` |
| meaning | definition line `: …` | `: Azon that always responds with itself.` |
| formula | blockquote of one code span | `` > `Z{ * -> Z }` `` |
| derived term or rule | `**DEF**:` paragraph | `**DEF**: response with Zero called empty` |
| axiom | `AXIOM-n (Name)` term | `AXIOM-1 (Halt)` |
| remark | `*NOTE*:` paragraph | |
| next entry | `---` | |

## SEE ALSO

- [Azon](../01-math/00-azon.md) — the definitions this notation writes.
- [Formal Language](../01-math/08-language.md) — `Grammar` and `Rules` as `Azons`; the grammar above is one instance.
- [Extended Backus–Naur form (Wikipedia)](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) — the metasyntax used in the grammar block.
- [Pattern matching (Wikipedia)](https://en.wikipedia.org/wiki/Pattern_matching) — first-match clauses with a catch-all, the reading of a literal.
- [Currying (Wikipedia)](https://en.wikipedia.org/wiki/Currying) — `A[x][y]`: a response that is itself applied.
