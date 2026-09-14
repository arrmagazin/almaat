---
title: "Computation"
description: "Reasoning mechanized: Data carried through Transformers by a Runtime, expressed as a Program, prescribed by an Algorithm, and judged against a Specification."
keywords: [mind, computation]
---

# Computation

**`Computation`** := The process of [`Reasoning`](08-reasoning.md) by executing `Dataflow` on given input by some real `Runtime` until the outcome is evaluated.

## Data and Transformers

**`Data`** := A `Text` that contains some `Information`.

---

**`Information`** := A `Message` encoded in `Data` that has precise influence on a receiver.

---

**`Transformation`** := Replacing input data with output data in some deterministic way.

---

**`Transformer`** := A specific circuit that deterministically consumes input data, transforms it, and provides output data under some `Algorithm`.

---

**`Dataflow`** := Interdependent exchange of computed data between `Transformers` over time.

---

**`Runtime`** := A system of transformers able to execute dataflow — recognize, store, access, interpret, and transform `Data`.

---

**`Runtime-Contract`** := Conditions and limitations that guarantee predictable `Runtime` behavior; errors reported when violated.

## Program

**`Program`** := Text in some formal language interpreted by a `Runtime` as instructions for `Data` transformations.

---

**`Referential Transparency`** := Ensuring an expression can be replaced with its value without changing program behavior.

---

**`Equivalence`** (`≡`) := Ensuring two expressions can be safely swapped in program text.

---

**`Equational Reasoning`** := Ability to infer truths about a system from its parts; possible when composed of expressions devoid of side effects.

## Algorithm and Correctness

**`Algorithm`** := A prescription for how to apply certain transformations on data pursuing a specific goal; may halt with terminal output or never halt.

---

**`Specification`** := Formal properties used to outline expected output of an algorithm in correspondence to its input.

---

**`Correctness`** := Satisfaction of an algorithm's actual computation with respect to a priori defined specification.
