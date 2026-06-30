# Story Short Write

Load this reference when the user asks to write a short story (短篇) or flash fiction.

## Niche Research Input

Before writing a new short story, check `outputs/{site-slug}/{book-slug}/niche-research.json`:

- **Exists** → read `differentiation_angle`, `selected_tropes`, and `adsense_policy.high_risk_notes`. Anchor the emotional hook and twist to these.
- **Does not exist + user gave explicit genre/premise** → proceed directly.
- **Does not exist + no explicit brief** → run `fiction-niche-researcher.md` first, then return here.

## Core Principles

1. **Emotion before story**: Lock the target reader emotion before plotting. All structure serves that emotion.
2. **One twist, total commitment**: Every line of setup exists for the twist. No sub-plots, no world-building.
3. **Every sentence earns its place**: If a sentence doesn't advance plot, build toward the twist, or raise emotion — cut it.
4. **Opening 3 sentences are everything**: Hook or lose the reader. Ending creates shareability.
5. **Default first-person**: `我` creates the strongest reader identification in web fiction.

## Emotion Targets

Pick one before starting. The entire story structure flows from this choice.

| Target emotion | Best for | Difficulty | Market heat |
| --- | --- | --- | --- |
| Lingering regret (意难平) | Romance, missed connection | Medium | High |
| Twist shock (反转震撼) | Suspense, identity reversal | Hard | High |
| Cathartic release (爽感释放) | Face-slapping, reversal of fortune | Easy | Medium |
| Healing warmth (治愈温暖) | Growth, family, friendship | Medium | Medium |
| Creeping dread (细思极恐) | Psychological, suspense | Hard | Low-Medium |
| Resonant emotion (共鸣感动) | Realist, workplace, marriage | Medium | High |

## Writing Process

### Step 1: Lock the emotion and framework

Answer before writing any prose:

```
Target emotion: {choose one from the table above}
One-line premise: {protagonist + predicament + reversal + emotional landing}
Core twist: {one sentence}
Opening hook: {first 3 sentences — must contain suspense or conflict}
Closing echo: {final sentence — must have resonance or impact}
```

Save as `content/short/{story-title}/setup.md` from the project root.

### Step 2: Beat outline

Write a beat-level outline with section markers. Target 6–12 beats for 8,000–20,000 characters.

```md
### 1. Hook — {action/conflict that hooks immediately}
### 2. Setup — {introduce character situation, raise stakes}
### 3. Misdirection 1 — {first misdirection or setup detail}
### 4. Misdirection 2 — {second misdirection, tighten tension}
### 5. False resolution — {appears to resolve, but raises new question}
### 6. Twist — {the twist, from a single unambiguous moment}
### 7. Resonance — {emotional landing, last image or line}
```

Save as `content/short/{story-title}/beat-outline.md` from the project root.

### Step 3: Write prose

Write full prose section by section following the beat outline. Save all to `content/short/{story-title}/prose.md` from the project root.

Prose formatting:
- Adjacent paragraphs: single `\n` between them — no blank lines
- Dialogue: half-width double quotes `""`
- Section markers: `### 1.` / `### 2.` — consistent throughout
- No `……` or `——` — rewrite as action, short sentence, or line break

## Romance Heat Level (Short Form)

Apply when the genre is romance or the premise has a central pairing.

### Target Heat Level

**Default: steamy / closed-door at peak, non-graphic.** Matches `fiction-niche-researcher.md` AdSense safety policy. Build tension with sensation, breath, skin, pressure — fade at the peak intimate moment; stop before explicit sexual acts.

In short form, heat is almost always tension-only or tension-plus-first-kiss. Escalated intimacy scenes belong in long form (and fade at peak there too). In 8,000–20,000 characters, one well-written almost-kiss or first kiss is worth more than a full scene.

---

### Short-Form Tension Toolkit

**Slow the clock at the peak.** The story can move fast everywhere else. The one charged moment gets full real-time treatment — fragment sentences, micro-beats, every sensation named.

**Body-first, thought-second.** Show the physical symptom before naming the feeling.
> *Her pulse moved into her throat. She stepped back. He followed — one step, no more.*

**The interrupted moment as the story's payoff.** Short romance often resolves at the almost-kiss, not past it. The interruption IS the ending — the reader supplies the rest. This is structurally correct for short form.

**Escalate contact in sequence.** Even in 8,000 characters, track the physical ladder: eye contact → proximity → touch → held contact. Don't jump from eye contact to a kiss without the rungs between.

**Charged dialogue.** Words that mean one thing and signal another. Short form lives here.
> *"You should leave," she said.*
> *He didn't move. "I know."*

---

### Vocabulary

**Use:** `skin`, `heat`, `pulse`, `breath`, `jaw`, `throat`, `hands`, `lips`, `exhale`, `pressure`, `warmth`, `closer`, `the space between them`

**Avoid:** explicit anatomical terms (AdSense violation), `throbbing / heaving / moist / quivering` (cliché), `they made love` without any preceding sensation (too vague)

---

### Heat Positioning in Short Form

| Story section | Heat beat |
|--------------|-----------|
| Setup (first 20%) | Awareness. Character notices — something specific, not generic attractiveness. |
| Rising action (20–70%) | Proximity, accidental or forced contact. Charged dialogue. |
| Climax beat (70–85%) | The almost-kiss, first kiss, or the moment one character admits what they want. |
| Resolution (85–100%) | Emotional landing. The heat is acknowledged or deliberately not — both are valid. |

The heat climax should arrive before the story's emotional climax, not after. Let the physical moment open up the emotional resolution.

---

## Short Story Quality Checks

- Hook (first 3 sentences): contains a question, conflict, or unusual detail?
- Twist: arrives from setup, not from nowhere?
- Ending: has one image or line that lingers?
- No consecutive 3+ sentences with identical syntactic structure.
- Total word count: 8,000–20,000 characters for a self-contained short story.

## After Story Completion → Cover Generation (automatic, no prompt)

When the story passes quality checks, **immediately load `story-cover.md` and generate the cover** — do not ask the user whether to proceed. This is always the next step.

## Reference Book Integration

If the user has a reference book to emulate:

1. Read `{story-title}/reference/{book-title}/teardown.md` and `techniques.md`.
2. Extract: twist positioning, pacing of misdirection, sentence-level technique.
3. Add a brief "Reference Summary" section at the bottom of `setup.md`.
4. During Step 3, pull 1–2 specific techniques per section from the summary — do not copy, emulate.

If no reference exists, use the genre emotion table to select a structural template before writing.

