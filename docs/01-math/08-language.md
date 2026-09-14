---
title: "Formal Language"
description: "How a Language is built from binary Code up through Alphabet, Word and Dictionary, the Rules and Grammar that transform them, the Theory derivable from an Axiom, and the four nested classes of Grammar."
keywords: [math, language]
---

# Formal Language

## Codes and Words

Code
: finite `Tuple` of `0` and `1`.

> `Code := [ 0 | 1 ]`

---

Alphabet
: finite `Set` of same-length `Code`s.

> `Alphabet<N> := { Code :: |Code| = N }`

---

Word
: `Tuple` of `Codes` of given `Alphabet`.

> `Word<Alphabet> := [Codeᵢ, ...] :: Codeᵢ ∈ Alphabet`

---

Dictionary
: `Set` of `Words` of the same `Alphabet`.

> `Dictionary<Alphabet> := { Word<Alphabet> }`

---

Text<Dictionary> / Plan
: `Tuple` of `Words` from the same `Dictionary`.

> `Text<Dictionary> : [ Word ∈ Dictionary, ...]`

*NOTE*: read as `Plan` where the `Text` is intended rather than observed.

## Rules and Grammar

Rule
: `Arrow` between `Words` from same `Dictionary`.

> `Rule<Dictionary> := [T, T'] :: T, T' ∈ Dictionary`

---

Grammar
: `Graph` of `Rules` on given `Dictionary`.

> `Grammar<Dictionary> := { Rule<Dictionary> }`

---

Conclusion
: `Composition` of some `Path` in given `Grammar`.

> `Conclusion<Grammar> := Composition([Rule₁, …, Ruleₙ] ∈ Grammar)`

## Theories

Expression
: `Word` produced by a `Conclusion` from a given input `Word`.

> `Expression<Word, Grammar> := Conclusion<Grammar>(Word)`

---

Theory
: `Dictionary` of all `Expressions` derived from the `Word` within the `Grammar`.

> `Theory<Word, Grammar> := { Expression<Word, Grammar> }`

---

Axiom
: `Word` that cannot be expressed in given `Grammar`.

> `Axiom<Grammar> := ¬∃ Theory :: Axiom ∈ Theory`

---

Terminal
: `Word` that nothing can be derived from in given `Grammar`.

> `Terminal<Grammar> := Word :: Theory<Word, Grammar> = Zero`

---

Language
: `Dictionary` of all `Terminals` expressed from given `Axioms` within given `Grammar`.

> `Language<{Axiom}, Grammar> := { Terminal ∈ Theory<A, Grammar> : A ∈ {Axiom} }`

## Classification of Grammars

Unrestricted Grammar
: `Grammar` that constrains its `Rules` in no way.

> `Unrestricted := { Rule[T, T'] }`

---

Context-sensitive Grammar
: `Grammar` whose every `Rule` has an `Object` no shorter than its `Subject`.

> `Context-sensitive := { Rule[T, T'] :: |T| ≤ |T'| }`

---

Context-free Grammar
: `Grammar` whose every `Rule` takes a single non-`Terminal` `Code` as its `Subject`.

> `Context-free := { Rule[T, T'] :: |T| = 1 ∧ T ∉ Terminal }`

---

Regular Grammar
: `Context-free Grammar` whose `Object` carries `Terminal` `Codes` and at most one non-`Terminal`, always at the same end.

> `Regular := { Rule[T, T'] :: |T| = 1 ∧ (T' = [t] ∨ T' = [t, N]) :: t ∈ Terminal, N ∉ Terminal }`

*NOTE*: mirroring every `Rule` to `T' = [N, t]` gives the left-linear form and the same `Language`.

| Grammar | Recognized by | Example `Language` |
| --- | --- | --- |
| **Unrestricted** | a Turing machine | any `Language` a `Conclusion` can enumerate |
| **Context-sensitive** | a linear-bounded automaton | `aⁿbⁿcⁿ` |
| **Context-free** | a pushdown automaton | balanced brackets, `aⁿbⁿ` |
| **Regular** | a finite automaton | `a*b*` |

*NOTE*: the four nest as `Languages` — `Regular ⊂ Context-free ⊂ Context-sensitive ⊂ Unrestricted`. The nesting is one-way: each step buys expressive power and gives up decidability. As `Grammars` the middle pair cross, since a `Context-free Grammar` may respond with the `empty` `Word` and a `Context-sensitive` one may not.
