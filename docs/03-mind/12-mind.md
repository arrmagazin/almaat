---
title: "Mind"
description: "Mind as a System of Neuron and Sensor — thought as state, memory as disposition, and the social origin of the inner voice."
keywords: [mind]
---
## The Substrate

In a `System`, a [`Source`](../01-math/01-sets.md#sets) is any `Azon` characterized primarily by the values it produces for other `Participant`s.

---

Mind *(Razvaga)*
: A `System` of `Neuron` and `Sensor`.

> `Mind := System over {Neuron, Sensor}`

*NOTE*: A `Mind` is a `System` whose **`State`** is `Thought` (the distribution of weights across `Neuron`s), whose internal **`Communication`** is the weighted signals between `Neuron`s, and whose **`Behavior`** is the projection of `Thought` into actions or expressed words (speech, motor output, writing).

---

Sensor *(Datqyk)*
: A `Source` that outputs a numerical Weight in response to external `Communication`.

> `Sensor :: external-Communication ⇒ Weight ∈ Number`

*NOTE*: Within the `Mind`'s internal topology, `Sensor` is a `Source` (origin): it converts `Communication` from outside the `Mind` into an internal `Signal`.

---

Neuron *(Nejron)*
: A `Source` that outputs a numerical Weight equal to the weighted sum of evaluations of `Neuron`s/`Sensors` in its Context.

> `Neuron(N) := ∑ wᵢ · Nᵢ` over Context

*NOTE*: Each `Neuron` is a tiny weighted `Composition` over its Context.

*NOTE*: A brain cell works the same way with a threshold. Excitatory inputs push it toward the threshold and inhibitory inputs away; once it crosses, it fires an all-or-none spike, and a stronger stimulus shows as more spikes per second, not bigger ones.[^2]

---

Thought *(Dumka)*
: A distribution of Weight across `Neuron`s.

> `Thought :: Neuron ⇒ Weight`

*NOTE*: The internal representation — the pattern of activation across the network. `Thought` is the `Mind`'s `State`, not its `Behavior`.

---

Signal *(Zyk\*)*
: A distribution of Weight across `Sensor`s.

> `Signal :: Sensor ⇒ Weight`

*NOTE*: The external stimulus pattern — the input projection from the `Environment` into the `Mind`.

---

Codebook *(Kodavik\*)*
: the mapping a `Mind` holds between `Signal` and `Thought`.

> `Codebook :: Signal ↔ Thought`

*NOTE*: what encodes a `Thought` for transmission and decodes an arriving `Signal`. Two `Minds` communicate reliably only where their `Codebooks` agree.

---

Message *(Vestka)*
: A `Signal` intended by a `Source` to be decoded by a receiver's `Codebook`.

> `Message := Signal under (sender intent, receiver Codebook)`

*NOTE*: The unit `Communication` exchanges. A `Message` is a `Signal` viewed *under* a sender's intent and a receiver's decoding apparatus — not raw sensory pattern but pattern shaped for transmission.

---

Memory *(Pamiac)*
: A persistent modification of `Neuron` weights such that prior `Thought` can be re-evoked by partial `Signal`.

> `Memory :: Signal_partial ⇒ Thought_re-evoked`

*NOTE*: Compression of past `Signals` into the structure of the `Mind` itself. `Memory` is not storage of past `Thought` — it is the *disposition to reproduce them*. Re-evocation is reconstruction, not retrieval.

## The Social Origin of Mind

Lev Vygotsky's account of where the *content* of `Thought` comes from — above all the verbal inner voice: the higher functions of a `Mind` are assembled from *outside*, out of other people's `Communication`, and only later fold inward.

- **Two floors.** *Natural* functions (involuntary attention, mechanical memory) are shared with animals. *Higher* functions — voluntary attention, logical memory, planning, will — are distinctly human, and are the ones that need explaining.
- **Interpsychic → intrapsychic.** Every higher function appears twice: first *between* people as shared `Communication`, then *within* one person as private `Thought`. Your attention, memory, and conscience were first a relation with someone else that later became you.
- **The sign as a psychological tool.** A physical tool (axe, hammer) is aimed outward at the world; a *sign* — a word, a number, a knot tied to remember — is a tool aimed *inward*, at one's own `Mind`. (See [Naming](05-knowledge.md#naming).)
- **Internalization.** A sign starts as an external prop in the hand; then the same operation runs silently in the `Mind` — the tool "grows in" and disappears into the personality.
- **Inner speech.** The near-constant inner voice is *former external dialogue*, condensed and turned inward. You think in a language you did not invent, with words and intonations you absorbed. The competing voices when you deliberate are the interiorized [Socium](../06-socium/30-socium.md); the voice of [`Conscience`](../04-human/21-human.md) is appropriated foreign speech you now call your own. This does not deny the person — it shows what the person is *made of*.
- **Thought is accomplished, not merely expressed, in the word.** A `Thought` does not pre-exist as a finished packet the word wraps; until uttered — even inwardly — it is a vague cloud of intention, *born* in the act of saying it. So dialogue does not exchange the ready-made; it jointly produces what neither party held before.
- **Not all thought is verbal.** Asked whether two drawn shapes match, people turn one in imagery, and the answer takes longer the larger the angle. Memory keeps the meaning of what was said, while the exact wording fades within seconds.[^1]
- **Zone of proximal development.** The gap between what a `Mind` can do alone and what it can do with help. Instruction should run *ahead* of development, waking what is ripening rather than drilling what has already matured — the applied side is [Learning](../05-mastery/09-learning.md).

*Implication.* If a `Mind` is assembled from outside through word and sign by describable laws, the same account describes how to influence one: whoever controls the signs a mind learns to think with shapes not just its opinions but the *structure* of its thought. The social origin of mind is therefore also a security concern (see [Security](../07-sustain/06-security.md)) — the human parallel to alignment in artificial minds.

## Sources

- Lev Vygotsky, "Thinking and Speech" — cultural-historical psychology and the social origin of mind, with A. Luria and A. Leontiev.

[^1]: Shepard and Metzler — [Mental rotation of three-dimensional objects](https://doi.org/10.1126/science.171.3972.701) (1971); Stanford Encyclopedia of Philosophy — [Mental imagery: mental rotation](https://plato.stanford.edu/archives/Spr2016/entries/mental-imagery/mental-rotation.html) (2016); Sachs — [Recognition memory for syntactic and semantic aspects of connected discourse](https://link.springer.com/article/10.3758/BF03208784) (1967) · from [Steven Pinker: Linguistics as a Window to Understanding the Brain | Big Think 08:17](https://www.youtube.com/watch?v=Q-B_ONJIEcE&t=497s)
[^2]: John H. Byrne, UTHealth — [Neuroscience Online, chapter 1: resting potentials and action potentials](https://nba.uth.tmc.edu/neuroscience/s1/chapter01.html) (accessed 2026); Newcastle University — [Properties of action potentials](https://teaching.ncl.ac.uk/bms/wiki/index.php/Properties_of_Action_Potentials) (accessed 2026) · from [Intro to Neuroscience 15:28](https://www.youtube.com/watch?v=nlSL7Qg7-Po&t=928s)
