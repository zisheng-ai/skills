# Story Short Write

Load this reference when the user asks to write a short story (短篇), flash fiction, or platform-specific standalone piece.

## Core Principles

1. **Emotion before story**: Lock the target reader emotion before plotting. All structure serves that emotion.
2. **One twist, total commitment**: Every line of setup exists for the twist. No sub-plots, no world-building.
3. **Every sentence earns its place**: If a sentence doesn't advance plot, build toward the twist, or raise emotion — cut it.
4. **Opening 3 sentences are everything**: Hook or lose the reader. Ending creates shareability.
5. **Default first-person**: `我` creates the strongest reader identification for web fiction platforms.

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

### Phase 1: Lock the emotion and framework

Answer before writing any prose:

```
Target emotion: {choose one from the table above}
One-line premise: {protagonist + predicament + reversal + emotional landing}
Core twist: {one sentence}
Opening hook: {first 3 sentences — must contain suspense or conflict}
Closing echo: {final sentence — must have resonance or impact}
```

Save as `content/短篇/{短篇标题}/设定.md` from the project root.

### Phase 2: Beat outline

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

Save as `content/短篇/{短篇标题}/小节大纲.md` from the project root.

### Phase 3: Write prose

Write full prose section by section following the beat outline. Save all to `content/短篇/{短篇标题}/正文.md` from the project root.

Prose formatting:
- Adjacent paragraphs: single `\n` between them — no blank lines
- Dialogue: half-width double quotes `""` by default; platform quote style as agreed
- Section markers: `### 1.` / `### 2.` — consistent throughout
- No `……` or `——` — rewrite as action, short sentence, or line break

## Short Story Quality Checks

- Hook (first 3 sentences): contains a question, conflict, or unusual detail?
- Twist: arrives from setup, not from nowhere?
- Ending: has one image or line that lingers?
- No consecutive 3+ sentences with identical syntactic structure.
- Total word count is within platform target (盐言: 8,000–15,000; 七猫短篇: 10,000–20,000).

## Reference Book Integration

If the user has a reference book to emulate:

1. Read `{短篇标题}/对标/{书名}/拆文报告.md` and `写作手法.md`.
2. Extract: twist positioning, pacing of misdirection, sentence-level technique.
3. Add a brief "Reference Summary" section at the bottom of `设定.md`.
4. During Phase 3, pull 1–2 specific techniques per section from the摘要 — do not copy, emulate.

If no reference exists, use the genre emotion table to select a structural template before writing.

## Platform-Specific Notes

| Platform | Word target | POV default | Quote style |
| --- | --- | --- | --- |
| 盐言 | 8,000–15,000 | First person | 「」 |
| 七猫短篇 | 10,000–20,000 | First person | "" |
| 晋江短篇 | 5,000–30,000 | First or third | "" |
| 番茄短篇 | 6,000–20,000 | First person | "" |
