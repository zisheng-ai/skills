# Story Long Write

Load this reference when the user asks to write, continue, or revise long-form novel chapters.

## Core Principles

1. **Emotion-first**: Every chapter has one primary emotional goal. Name it before writing a word.
2. **Validated patterns**: If a reference book exists in `对标/`, extract its technique before inventing new structure.
3. **Modular assembly**: Each chapter = hook + escalation + turn + hook-out. Each beat has a proven formula.
4. **Load only what's needed**: Before writing, read only the files relevant to this chapter's conflict and characters. Never load the full book.

## What to Read Before Each Chapter

```
必读：
  追踪/上下文.md        — previous chapter ending + open threads
  大纲/大纲.md          — this chapter's role in the arc (find by chapter number)

按需读：
  设定/角色/{涉及角色}.md  — only characters appearing in this chapter
  追踪/伏笔.md           — only if this chapter resolves or plants a foreshadow
  对标/{书名}/写作手法.md  — only if a reference technique is needed
```

## Single Chapter Writing Process

1. Read `追踪/上下文.md` — know the exact last beat.
2. Read the chapter's outline entry in `大纲/大纲.md`.
3. Name the chapter's **primary emotion** (tension / release / shock / ache / warmth).
4. Name the chapter's **turn**: what changes from start to end?
5. Write the **hook** (≤3 sentences): drop into motion, not setup.
6. Write the **escalation**: raise stakes through action/dialogue. No passive reflection blocks.
7. Write the **turn**: the moment that changes something — reveal, decision, or loss.
8. Write the **hook-out**: end mid-motion or on an open question. Never summarize.
9. Save to `正文/第NNN章_章名.md` with correct zero-padded number.
10. Update `追踪/上下文.md`: last beat + open threads + any foreshadow planted.
11. Update `追踪/伏笔.md` if foreshadow added or resolved.
12. Update `追踪/角色状态.md` for any character changes.

## Chapter File Format

```md
---
title: "第一章：夜渡"
chapter: 1
---

正文从这里开始，无空行开头。
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

## Context Handoff (`追踪/上下文.md` template)

```md
## 上一章结尾
{最后一个动作或对话，1-3句}

## 下一章起点
{从哪个动作/场景接续}

## 开放线索
- {伏笔/悬念1}
- {伏笔/悬念2}

## 下一章目标情绪
{紧张/释放/震惊/意难平/温暖}
```

Always overwrite `上下文.md` after each chapter. Do not append history — the file is a rolling handoff.

## Quality Check Before Saving

- Hook: does it drop into motion? No weather, backstory, or setup.
- Turn: does something change? A chapter where nothing changes is a filler chapter.
- Hook-out: does it create forward pull? Reader must want the next chapter.
- No consecutive paragraphs with identical rhythm or length.
- No three consecutive sentences starting with the same subject.
- `正文/去AI味`: run `/story-deslop` before marking a chapter complete if AI flavor is detected.
