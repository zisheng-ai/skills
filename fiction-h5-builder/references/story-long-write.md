# Story Long Write

Load this reference when the user asks to write, continue, or revise long-form novel chapters.

## Niche Research Input

Before writing the first chapter of a new book, check `outputs/{site-slug}/{book-slug}/niche-research.json`:

- **Exists** → read `differentiation_angle`, `selected_tropes`, `competitive_brief[].beat_action`, and `producibility` (target chapters, words per chapter, heat level). These constrain the story brief.
- **Does not exist + user gave explicit genre/tropes/premise** → proceed directly; document them in `tracking/context.md`.
- **Does not exist + no explicit brief** → run `fiction-niche-researcher.md` first, then return here.

Continuing an existing book (adding chapters): skip this gate.

## Core Principles

1. **Emotion-first**: Every chapter has one primary emotional goal. Name it before writing a word.
2. **Validated patterns**: If a reference book exists in `reference/`, extract its technique before inventing new structure.
3. **Modular assembly**: Each chapter = hook + escalation + turn + hook-out. Each beat has a proven formula.
4. **Load only what's needed**: Before writing, read only the files relevant to this chapter's conflict and characters. Never load the full book.

## What to Read Before Each Chapter

```
Required:
  tracking/context.md                   — previous chapter ending + open threads
  outline/outline.md                    — this chapter's role in the arc (find by chapter number)

Load only if needed:
  world/characters/{character-name}.md  — only characters appearing in this chapter
  tracking/threads.md                   — only if this chapter resolves or plants a foreshadow
  reference/{book-title}/techniques.md  — only if a reference technique is needed
```

## Parallel Writing (default for new books)

Use this flow whenever writing ≥ 2 chapters from scratch. Single-chapter incremental additions use the sequential process below.

### Step 1 — Expand outline beats

Before spawning any agents, expand `outline/outline.md` so every chapter has a concrete beat entry:

```
Ch-NNN: [primary emotion] | hook: {1-sentence} | turn: {what changes} | hook-out: {open question}
```

All chapters must have this before any parallel writing starts. The beat entries replace `tracking/context.md` as the coordination signal during parallel writing.

### Step 2 — Spawn one Agent per chapter

Spawn all chapter agents concurrently. To avoid redundant file reads, read shared context once in the main context and pass it into each agent's prompt:

- **Read once, share with every agent:**
  - `world/worldbuilding.md`
  - Full expanded `outline/outline.md` (with beat entries for all chapters)
- **Read once, shard per agent:**
  - `world/characters/{character-name}.md` — only for characters appearing in that chapter
- **Coordination signal:** each agent receives the previous chapter's hook-out line from the outline beat.

Each agent writes to `content/{book-title}/chapters/ch-NNN-{title}.md` and returns its own hook-out line.

Use a **single batch Agent call** when the environment supports it (e.g. one Agent invocation carrying the whole chapter list), otherwise spawn individual Agents per chapter. Either way, all chapters must be produced in parallel, not sequentially.

### Step 3 — Lightweight continuity pass

After all chapter agents complete, do a single sequential pass:
1. Read chapters in order; verify hook-out of chapter N matches the opening of chapter N+1.
2. Fix only continuity breaks — do not rewrite prose for style.
3. Write `tracking/context.md` from the final chapter's ending.
4. Update `tracking/threads.md`, `tracking/timeline.md`, `tracking/character-status.md`.

Keep this pass minimal. Do not run a full quality rewrite here; that is Phase 4.

### Multiple books in parallel

Spawn one top-level Agent per book. Pass only that book's `world/`, `outline/`, and character files so each agent starts with a minimal context. Books share no state and can complete in any order.

## Single Chapter Writing Process

Use this for adding one chapter to an existing book (incremental update only).

1. Read `tracking/context.md` — know the exact last beat.
2. Read the chapter's outline entry in `outline/outline.md`.
3. Name the chapter's **primary emotion** (tension / release / shock / ache / warmth).
4. Name the chapter's **turn**: what changes from start to end?
5. Write the **hook** (≤3 sentences): drop into motion, not setup.
6. Write the **escalation**: raise stakes through action/dialogue. No passive reflection blocks.
7. Write the **turn**: the moment that changes something — reveal, decision, or loss.
8. Write the **hook-out**: end mid-motion or on an open question. Never summarize.
9. Save to `content/{book-title}/chapters/ch-NNN-{title}.md` from the project root, with correct zero-padded number.
10. Update `tracking/context.md`: last beat + open threads + any foreshadow planted.
11. Update `tracking/threads.md` if foreshadow added or resolved.
12. Update `tracking/character-status.md` for any character changes.

## Chapter File Format

```md
---
title: "第一章：夜渡"
chapter: 1
---

Prose starts here — no leading blank line.
```

Frontmatter is optional but recommended. The site loader falls back to filename if `title` is absent.

Prose formatting rules:
- Adjacent paragraphs: blank line between them (`\n\n`). Within a paragraph, do not hard-wrap lines. (CommonMark renders a single `\n` as a space, collapsing all paragraphs into one block.)
- Dialogue quotes: half-width double quotes `""`
- No `……` or `——` in the prose product — rewrite as action, short sentence, or line break
- No chapter summaries or author notes inline

## Chapter Count Planning

When writing a new book, decide the total chapter count before expanding the outline. Pick a number in the 10–20 range that fits the story's scope. **Never pick the same number as another book in the same site.** Treat the count as a story decision, not a quota:

- A tight revenge arc might need 11 chapters.
- A slow-burn romance with multiple subplots might need 17.
- A high-stakes thriller with many POVs might run to 20.

Document the chosen count in `outline/outline.md` header before writing any beat entries.

## Pacing Guidelines

Word counts are targets, not uniform quotas. Let each chapter breathe according to its dramatic weight — a chapter that needs 4,200 words should not be trimmed to hit a round number, and a lean 1,800-word chapter is fine if it lands the turn cleanly. Vary lengths across the book so readers feel the rhythm shift.

| Chapter type | Word count range | Dialogue ratio | Action beats |
| --- | --- | --- | --- |
| Opening chapter | 1,800–2,500 | 20–30% | 3+ |
| Escalation chapter | 1,500–2,200 | 30–50% | 2–4 |
| Climax chapter | 1,400–2,000 | 15–25% | 4–6 |
| Resolution chapter | 1,200–1,800 | 20–40% | 1–2 |

## Context Handoff (`tracking/context.md` template)

```md
## Last Chapter Ending
{Final action or dialogue — 1–3 sentences}

## Next Chapter Start
{Which action or scene to continue from}

## Open Threads
- {foreshadow/suspense 1}
- {foreshadow/suspense 2}

## Target Emotion for Next Chapter
{tension / release / shock / lingering regret / warmth}
```

Always overwrite `context.md` after each chapter. Do not append history — the file is a rolling handoff.

## Romance Heat Level

Apply this section whenever the genre is romance or contains a romantic sub-plot (Dark Romance, Billionaire, Paranormal, Shifter, Vampire, Fantasy Romance, Mafia, Sports, Contemporary, or any genre with a central pairing).

### Target Heat Level

**Default: steamy / closed-door at peak, non-graphic.** Matches `fiction-niche-researcher.md` AdSense safety policy.

| Level | Definition | Policy |
|-------|-----------|--------|
| Sweet / closed-door | Tension only; intimacy implied off-page | Always safe |
| **Steamy / closed-door at peak** | **Build tension with sensation, breath, skin, pressure through proximity, touch, and kisses; fade-to-black or closed-door at the peak moment of intimacy — stop before explicit sexual acts** | **Default — use this** |
| Explicit | Describes sex acts in anatomical detail | AdSense violation — never use |

"Closed-door at peak" means: the reader feels the heat building — pulse, breath, contact, charged dialogue — but the camera cuts away at the peak intimate moment. They know what happened; they were not in the room for it. First kisses and make-out buildup are written through; escalated intimacy fades at the threshold.

---

### The 5 Tension Techniques

**1. Slow the clock**
Intimate moments run at 10× the normal time. Break actions into micro-beats. Sentence fragments are correct here — they signal the body overriding the mind.

> *He reached out. Stopped. His fingertips hovered one centimeter from her jaw.*
> *She didn't breathe.*
> *He touched her anyway.*

**2. Body-first, thought-second**
Physical sensation comes before emotional interpretation. Never name the emotion first; let the body report it.

> Wrong: *She felt desire rising in her chest.*
> Right: *Her pulse beat in her throat. She pressed her palm flat to the wall to keep from stepping closer.*

**3. The charged gap**
What isn't said or done carries as much weight as what is. Silence, held breath, and a character's decision NOT to move are tension. Use them.

> *He could have kissed her. They both knew it. He didn't.*

**4. Escalating contact**
Each physical touch must be a step up from the last. Track the progression across the scene and across the chapter arc: eye contact → accidental touch → intentional touch → held contact → skin → breath → lips. Don't skip rungs. Don't repeat rungs.

**5. Internal resistance**
The character wants what they will not admit — to themselves or to the reader. Both the want and the resistance must be legible on the page simultaneously.

> *She told herself it was the wine. It was not the wine. She knew it was not the wine.*

---

### Scene Types and How to Write Them

#### Pre-contact tension (most common — use in every chapter with the pairing present)

Write the charged air before anything happens. Proximity, awareness of the other person's body, involuntary physical response, and the effort to hide it.

Key beats:
- Character notices the other's specific detail (jaw, hands, the way they move) — not generic attractiveness
- Physical symptom: pulse, heat, the urge to close distance or increase it
- Dialogue that says one thing and means another
- One character nearly acts — then doesn't

#### First significant touch

This is a chapter-level event. Give it space. Slow the clock entirely.

- Name every sensation: temperature, pressure, texture, involuntary response
- Show the moment before (held breath, decision) and the moment after (stillness, recalibration)
- Keep internal monologue to short fragments — the body is louder than the mind here

#### Almost-kiss / interrupted moment

The most commercially effective beat in romance. Withhold the payoff.

Structure:
1. Close the distance in increments (half a step, leaning in, the breath mingling)
2. Write the threshold — the millisecond before contact
3. Interrupt (external: phone, knock, third party; or internal: one character pulls back)
4. Show the aftermath — the air after the interruption is charged differently than before

Never interrupt and immediately resolve. The tension from an interrupted moment must carry forward.

#### First kiss

Write through it fully. A first kiss is not a fade point — stay in the scene through contact, response, and separation.

Beats:
- The initiation (who moves first, how)
- The first contact: pressure, heat, the precise physical detail
- The second beat: one person's response — deeper, still, pulling back slightly then returning
- The internal recognition: the character understands something has changed
- The end of the kiss: how they separate, what the air between them feels like now

Keep it under 400 words. Longer is not more intense — it dilutes.

#### Escalated physical scene (make-out, pre-intimacy)

Build the escalation of contact — clothing, hands, skin — with sensory specificity (temperature, texture, pressure). **Fade-to-black or closed-door at the peak moment.** Do not write through the threshold; cut to aftermath or use a warm fade line. This is the AdSense-safe ceiling.

**Fade technique:**
> *His hand found the edge of her dress. She exhaled — barely sound, barely breath.*
> *— and then there was nothing but heat, and his voice saying her name.*

**Cut-to-aftermath technique:**
> *Later, she would not remember who had moved first. She would remember only the window light falling across his collarbone, and how she had not looked away.*

Both are correct. The fade is warmer; the cut is more literary. Match to the chapter's emotional register.

---

### Vocabulary: Use / Avoid

**Use freely:**
`skin`, `heat`, `pulse`, `breath`, `jaw`, `throat`, `collarbone`, `waist`, `hip`, `back`, `hands`, `fingers`, `lips`, `mouth`, `exhale`, `shiver`, `pressure`, `weight`, `warmth`, `close`, `closer`, `the space between them`, `his hands on her`, `her fingers in his shirt / against his chest`

**Use sparingly (once per scene maximum):**
`desire`, `want`, `need`, `ache` — these name the emotion directly; they're most powerful when used once, at the scene's peak

**Avoid (AI cliché or explicitly sexual):**
`throbbing`, `heaving`, `moist`, `quivering`, `manhood`, `womanhood`, `grinding`, `explicit anatomical terms` — any of these kills the scene's credibility or crosses the AdSense line

**Avoid (too vague / closed-door register):**
`they made love` (without any preceding sensation), `one thing led to another`, `the night passed between them` — these are soft fade-outs that feel evasive rather than deliberate

---

### Heat Pacing Across a Full Novel

Romance readers track the heat arc the same way they track plot. Structure it:

| Chapter range | Expected heat beats |
|--------------|---------------------|
| Ch 1–4 | Awareness only. Character notices the other; no physical contact yet. |
| Ch 5–8 | First accidental touch or forced proximity. One interrupted moment. |
| Ch 9–13 | Escalating contact. First significant touch. Almost-kiss or interrupted kiss. |
| Ch 14–16 | First kiss (if not earlier). Scene with real physical escalation. Emotional crisis interrupts. |
| Final 2–3 chapters | Resolution of both emotional and physical tension. Closed-door fade at peak if the arc supports it. |

In an 18-chapter book, the first kiss should land no later than chapter 14. Readers who reach chapter 16 without it begin to feel cheated.

---

### Applying to Parallel Writing

When spawning agents for parallel chapter writing, pass each agent its position in the heat arc:

```
Heat arc position: Ch-{N} of {total}
Expected heat beat this chapter: {awareness only / first touch / almost-kiss / first kiss / escalated contact / aftermath}
Previous heat beat (from tracking/context.md): {last physical beat that happened}
Next expected beat (from outline): {what the reader is waiting for}
```

Agents without this context will default to closed-door or will skip heat beats entirely. Always provide it.

---

## Quality Check Before Saving

- Hook: does it drop into motion? No weather, backstory, or setup.
- Turn: does something change? A chapter where nothing changes is a filler chapter.
- Hook-out: does it create forward pull? Reader must want the next chapter.
- No consecutive paragraphs with identical rhythm or length.
- No three consecutive sentences starting with the same subject.
- If AI flavor is detected, flag the chapter for the Phase 4 deslop pass — do not run `/story-deslop` inline here. Phase 4 (`references/story-deslop.md`) is loaded separately and runs after all chapters are written.

## After All Chapters Written → Cover Generation (automatic, no prompt)

When all planned chapters are complete (or the user's requested batch is done), **immediately load `story-cover.md` and generate the cover** — do not ask whether to proceed. This is always the next step after the final chapter is saved.
