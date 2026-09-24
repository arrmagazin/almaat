---
title: "Azon in formal notation"
description: "Azon is the framework's sole primitive: an assignment from every Arg to a corresponding Spond, constrained by three axioms."
keywords: [math, azon]
---

Notation
: way of express `Azon` by meaningful `sequence of <terms> and "symbols"`:

- definition given as: `<T> ":=" <T> [ "|" <T> ] "->" <T> [ "|" <T> ]`, where
  - ":=" split name from defining expression
  - "->" split args expression from spond expression
  - "|" in args encodes `any other than priors`
  - "-" in args encodes hole arg to define a spond which never happen
  - "*" in args encodes the last anonumous arg for default case
  - "|" in sponds encodes `corresponding to arg in same position`
- referred `Spond` of `Az` for given `Arg` expresed as `<Az> "[" <Arg> "]"`
- sameness of Azes is expressed
  - implicitly by the same `<T>` terms
  - or explicitly by `<T> "IS" <T>` , `<T> "ISNT" <T>` , `<T> "IN" <T>|||`
- recurrsive nature of `Az` can be expressed by `[ <T> ] "(" <T> "->" <T> ")"` inline with "parens".
- class of Azon expressed by declaring params :  `A<P,,,> :: EXPR(P)`

---
Azon
: any `Az` within definitions below:

```bash

  # zero
  0 := x -> 0 

  # identity
  id := x -> x   

  # unit                                  
  1 := 1|x -> 0|x 

  # set                                  
  1 := 0|1|x0|x1 -> 0|0|0|x1 

  # axiomator
  X<Z,E,A> :: ((Z|E|A|-|*) -> (Z|Z|Z|A|X<Z,E>[A[*]])) 

  # azon
  A :: X<0, 1, A>

```

---

Useful shortcuts

```bash
                                                        
  # composer, short `A.B` => `C[A, B]`
  C := A -> B -> x -> B[A[x]]                      
  
  # indicator 
  B := (0|*) -> (0|1)                            
  
  # invertor, short `!x`
  I := (0|*) -> (1|0)                                  
  
  # predicate, short `[[C]]`
  P<C, A> := A . C . B                     
  
  # tautology
  T := a -> b -> ((a | b | *) -> (b | a | *))        
  

  # disjunct, short `a ∨ b`
  ∨<a,b> := x -> [[ (0|x1 -> b[x]|1)[a[x]] ]] 
  
  # conjunct, short `a ∧ b`
  ∧<a,b> := x -> [[ (0|x1 -> 0|b[x])[a[x]] ]] 
   
  # imply, short `a ⟹ b`
  ⟹<a,b> := x -> [[ (0|x1 -> 1|b[x])[a[x]] ]] 
  
  # intensional equality `a === b`
  IE<A, B> := x -> T[x[A], x[B]]               
  
  # extensional equality `a == b`
  EE<A, B> := x -> T[A[x], B[x]]               
  
  # total equality `a = b`
  EQ<A, B> := IE<A, B> ∧ EE<A, B>             
```
