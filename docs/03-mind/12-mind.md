---
title: "Mind"
description: "Mind as a System of Neuron and Sensor — thought as state, memory as disposition, and the social origin of the inner voice."
keywords: [mind]
---

# Mind

## The Substrate

In a `System`, a [`Source`](../0-math/01-sets.md#sets) is any `Azon` characterized primarily by the values it produces for other `Participant`s.

---

**`Mind`** := A `System` of `Neuron` and `Sensor`.

> `Mind := System over {Neuron, Sensor}`

*NOTE*: A `Mind` is a `System` whose **`State`** is `Thought` (the distribution of weights across `Neuron`s), whose internal **`Communication`** is the weighted signals between `Neuron`s, and whose **`Behavior`** is the projection of `Thought` into actions or expressed words (speech, motor output, writing).

---

**`Sensor`** := A `Source` that outputs a numerical Weight in response to external `Communication`.

> `Sensor :: external-Communication ⇒ Weight ∈ Number`

*NOTE*: Within the `Mind`'s internal topology, `Sensor` is a `Source` (origin): it converts `Communication` from outside the `Mind` into an internal `Signal`.

---

**`Neuron`** := A `Source` that outputs a numerical Weight equal to the weighted sum of evaluations of `Neuron`s/`Sensors` in its Context.

> `Neuron(N) := ∑ wᵢ · Nᵢ` over Context

*NOTE*: Each `Neuron` is a tiny weighted `Composition` over its Context.

---

**`Thought`** := A distribution of Weight across `Neuron`s.

> `Thought :: Neuron ⇒ Weight`

*NOTE*: The internal representation — the pattern of activation across the network. `Thought` is the `Mind`'s `State`, not its `Behavior`.

---

**`Signal`** := A distribution of Weight across `Sensor`s.

> `Signal :: Sensor ⇒ Weight`

*NOTE*: The external stimulus pattern — the input projection from the `Environment` into the `Mind`.

---

**`Codebook`** := the mapping a `Mind` holds between `Signal` and `Thought`.

> `Codebook :: Signal ↔ Thought`

*NOTE*: what encodes a `Thought` for transmission and decodes an arriving `Signal`. Two `Minds` communicate reliably only where their `Codebooks` agree.

---

**`Message`** := A `Signal` intended by a `Source` to be decoded by a receiver's `Codebook`.

> `Message := Signal under (sender intent, receiver Codebook)`

*NOTE*: The unit `Communication` exchanges. A `Message` is a `Signal` viewed *under* a sender's intent and a receiver's decoding apparatus — not raw sensory pattern but pattern shaped for transmission.

---

**`Memory`** := A persistent modification of `Neuron` weights such that prior `Thought` can be re-evoked by partial `Signal`.

> `Memory :: Signal_partial ⇒ Thought_re-evoked`

*NOTE*: Compression of past `Signals` into the structure of the `Mind` itself. `Memory` is not storage of past `Thought` — it is the *disposition to reproduce them*. Re-evocation is reconstruction, not retrieval.

## The Social Origin of Mind

Lev Vygotsky's account of where the *content* of `Thought` comes from — above all the verbal inner voice: the higher functions of a `Mind` are assembled from *outside*, out of other people's `Communication`, and only later fold inward.

- **Two floors.** *Natural* functions (involuntary attention, mechanical memory) are shared with animals. *Higher* functions — voluntary attention, logical memory, planning, will — are distinctly human, and are the ones that need explaining.
- **Interpsychic → intrapsychic.** Every higher function appears twice: first *between* people as shared `Communication`, then *within* one person as private `Thought`. Your attention, memory, and conscience were first a relation with someone else that later became you.
- **The sign as a psychological tool.** A physical tool (axe, hammer) is aimed outward at the world; a *sign* — a word, a number, a knot tied to remember — is a tool aimed *inward*, at one's own `Mind`. (See [Naming](05-knowledge.md#naming).)
- **Internalization.** A sign starts as an external prop in the hand; then the same operation runs silently in the `Mind` — the tool "grows in" and disappears into the personality.
- **Inner speech.** The near-constant inner voice is *former external dialogue*, condensed and turned inward. You think in a language you did not invent, with words and intonations you absorbed. The competing voices when you deliberate are the interiorized [Socium](../8-socium/30-socium.md); the voice of [`Conscience`](../4-human/21-human.md) is appropriated foreign speech you now call your own. This does not deny the person — it shows what the person is *made of*.
- **Thought is accomplished, not merely expressed, in the word.** A `Thought` does not pre-exist as a finished packet the word wraps; until uttered — even inwardly — it is a vague cloud of intention, *born* in the act of saying it. So dialogue does not exchange the ready-made; it jointly produces what neither party held before.
- **Zone of proximal development.** The gap between what a `Mind` can do alone and what it can do with help. Instruction should run *ahead* of development, waking what is ripening rather than drilling what has already matured — the applied side is [Learning](../7-mastery/09-learning.md).

*Implication.* If a `Mind` is assembled from outside through word and sign by describable laws, the same account describes how to influence one: whoever controls the signs a mind learns to think with shapes not just its opinions but the *structure* of its thought. The social origin of mind is therefore also a security concern (see [Security](../8-sustain/06-security.md)) — the human parallel to alignment in artificial minds.

## Sources

- Lev Vygotsky, "Thinking and Speech" — cultural-historical psychology and the social origin of mind, with A. Luria and A. Leontiev.
