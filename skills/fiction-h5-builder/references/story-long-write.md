# Story Long Write

Load this reference when the user asks to write, continue, or revise long-form novel chapters.

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

## Single Chapter Writing Process

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
- Adjacent paragraphs: single `\n` between them (no blank lines / `\n\n`)
- Dialogue quotes: default half-width double quotes `""`; platform-specific as agreed
- No `……` or `——` in the prose product — rewrite as action, short sentence, or line break
- No chapter summaries or author notes inline

## Pacing Guidelines

| Chapter type | Word count target | Dialogue ratio | Action beats |
| --- | --- | --- | --- |
| Opening chapter | 3,000–4,500 | 20–30% | 3+ |
| Escalation chapter | 2,500–4,000 | 30–50% | 2–4 |
| Climax chapter | 2,000–3,500 | 15–25% | 4–6 |
| Resolution chapter | 1,500–3,000 | 20–40% | 1–2 |

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

## Quality Check Before Saving

- Hook: does it drop into motion? No weather, backstory, or setup.
- Turn: does something change? A chapter where nothing changes is a filler chapter.
- Hook-out: does it create forward pull? Reader must want the next chapter.
- No consecutive paragraphs with identical rhythm or length.
- No three consecutive sentences starting with the same subject.
- Run `/story-deslop` before marking a chapter complete if AI flavor is detected.
