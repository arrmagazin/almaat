---
title: "The Scientific Method"
description: "The empirical route to Scientific Knowledge: the nine criteria a claim must meet, and the five phases that produce it."
keywords: [mind, scientific]
---
## Method

Scientific Method *(Navukovy Sposab\*)*
: A generalized empirical *a posteriori* approach to earning `Scientific Knowledge` from experimental data, with awareness of cognitive abilities and `Bias`.

## Scientific Criteria

Scientific Criteria *(Navukovyja Merki\*)*
: The nine requirements a `Knowledge` claim must satisfy, from Inner Correctness to Reproducibility.

Scientific Knowledge *(Navukovaja Veda\*)*
: `Knowledge` that definitely meets `Scientific Criteria`.

---

| Criterion | Requirement |
| --- | --- |
| **Inner Correctness** | Does not break the axioms of logic |
| **Occam's Razor** | Is minimal in the concepts it uses |
| **Critical Resistance** | Withstands questioning from other points of view: *why*, *what if not*, *what is the alternative*, *what about edge cases* |
| **Fair Principle** | Highlights its own weaknesses and looks for its own incorrectness |
| **Popper Principle** | Offers ways to be dismissed (falsifiability), keeping the door open to revision |
| **Objectiveness** | Stands apart from subjective prejudice and preference |
| **External Consistency** | Does not contradict existing `Knowledge` in the context |
| **Predictability** | Predicts the behavior of the object in question |
| **Reproducibility** | Stays stable when reproduced under the described conditions and steps |

## The Scientific Process

Scientific Process *(Navukovy Praces\*)*
: An iterative process to acquire new *a posteriori* `Knowledge`:

1. **Characterizations** — observations, definitions, and measurements of the subject of inquiry.
2. **Hypotheses** — theoretical, hypothetical explanations of observations and measurements.
3. **Predictions** — inductive and deductive [`Reasoning`](08-reasoning.md) from the hypothesis or theory.
4. **Experiments** — tests of the predictions under described conditions.
5. **Review** — independent scrutiny of all of the above.

```svg
<Panel flow="LR">
  <Node key="start" col="0" row="1" shape="point" />
  <Node key="char" col="1" row="1" label="Characterizations" shape="round" />
  <Node key="hyp" col="2" row="0" label="Hypotheses" shape="round" />
  <Node key="pred" col="2" row="1" label="Predictions" shape="round" />
  <Node key="exp" col="2" row="2" label="Experiments" shape="round" />
  <Node key="know" col="3" row="1" label="Knowledge" shape="round" />
  <Node key="end" col="4" row="1" shape="point" />
  <Edge from="start" to="char" />
  <Edge from="char" to="hyp" label="observed View" fromSide="top" />
  <Edge from="hyp" to="pred" label="Reasoning" />
  <Edge from="pred" to="exp" label="test design" />
  <Edge from="exp" to="char" label="refine / falsify" toSide="bottom" />
  <Edge from="exp" to="know" label="validated" toSide="bottom" />
  <Edge from="know" to="hyp" label="Doubt" fromSide="top" />
  <Edge from="know" to="end" />
</Panel>
```
