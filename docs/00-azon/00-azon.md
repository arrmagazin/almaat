---
title: "Azon"
description: "Azon is the sole primitive of the entire framework."
keywords: [azon]
---


Az
: *assignment* from every (`Az` =: **`Arg`**) to corresponding (`Az` =: **`Spond`**)
: made under *judgement* on every pair of `Az` whether they (*are the same or not* =: **`Coincidence`**).

---

Notation
: way of express `Az` by meaningful `sequence of <terms> and "symbols"`:

- Az defined as: `<T> ":=" <T> [ "|" <T> ] "->" <T> [ "|" <T> ]`, where
  - ":=" split name from defining expression
  - "->" split args expression from spond expression
  - "|" in args encodes `any other than priors`
  - "-" in args encodes hole arg to define a spond which never happen
  - "*" in args encodes the last anonumous arg for default case
  - "|" in sponds encodes `corresponding to arg in same position`
- referred `Spond` of `Az` for given `Arg` expresed as `<Az> "[" <Arg> "]"`
- sameness of Azes is expressed
  - implicitly by the same terms
  - or explicitly by `<T> "IS" <T>` , `<T> "ISNT" <T>` , `<T> "IN" <T>,,,`
- recurrsive nature of `Az` can be expressed by `[ <T> ] "(" <T> "->" <T> ")"` inline with "parens".
- class of Azon expressed by declaring params :  `A<P,,,> := EXPR(P)`

---
Azon
: any `Az` within definitions below:

```bash

  0       := x -> 0   # zero                                  
  1       := 1|x -> 0|x  # unit
  X<Z,E>  := A -> x -> ((Z|E|A|-|*) -> (Z|Z|Z|A|X<Z,E>[A[*]]))[x] # axioms
  Azon<A> := X<0, 1>[A]

```

---

Useful shortcuts

```bash
                                                        
  # combo, short `a.b`
  C<a,b> := x -> b[a[x]]                      
  
  # indicator 
  B := (0|*) -> (0|1)                            
  
  # invertor, short `!x`
  I := (0|*) -> (1|0)                                  
  
  # predicate, short `[[C]]`
  P<C, A> := A . C . B                     
  
  # tautology, short `a === b`
  T<A,B> := x -> (a -> b -> (a | b | *) -> (b | a | *))[A[x], B[x]]        
  

  # disjunct, short `a ∨ b`
  ∨<a,b> := x -> [[ (0|x1 -> b[x]|1)[a[x]] ]] 
  
  # conjunct, short `a ∧ b`
  ∧<a,b> := x -> [[ (0|x1 -> 0|b[x])[a[x]] ]] 
   
  # imply, short `a ⟹ b`
  ⟹<a,b> := x -> [[ (0|x1 -> 1|b[x])[a[x]] ]] #
  
  # intensional equality `a === b`
  IE<a,b> := x -> (x[a] IS x[b])               
  
  # extensional equality `a == b`
  EE<a,b> := x -> (a[x] IS b[x])               
  
  # total equality `a = b`
  EQ<a,b> := (IE[a][b] ∧ EE[a][b])             
```
