# Story Deslop

Load this reference when the user asks to remove AI flavor from novel prose, or when prose review detects template patterns.

## Core Philosophy

AI flavor is not a grammar error — it is a style problem: over-polished, symmetrical, over-explained. The goal is to pull text from over-crafted back toward specific, natural, readable. Change the minimum amount to shift the character of the passage.

**Never delete entire paragraphs.** Plot function, foreshadow, character reveals, and tension hooks must survive. If a passage is bad, rewrite it — don't erase it.

## Detection: The 7 Gates

Run the applicable gates based on severity (see Severity Levels below).

| Gate | Problem | Signal |
| --- | --- | --- |
| A | Banned words / high-frequency clichés | "眼中闪过一丝" "深吸一口气" "嘴角勾起一抹" |
| B | Template sentence patterns | 否定铺垫+肯定翻转, "带着…", "声音不大却…", consecutive parallel structures ≥3 |
| C | Telling not showing (psychology) | "他感到" "她意识到" "内心涌起" without grounding action |
| D | Uniform rhythm / paragraph length | Every paragraph 4–6 sentences, identical beat |
| E | Flat dialogue tags | "说道/问道/笑道" on nearly every line |
| F | Moral summary endings | Last paragraph summarizes or moralizes what just happened |
| G | Narrator intrusion / god-view | "她不知道的是…" / "之所以…是因为" / evaluative aside that steps outside character POV |

## Severity Levels

| Level | Quantity signal | Gates to run |
| --- | --- | --- |
| Mild | ≤5 banned words/1,000 chars, no consecutive 3+ templates | A + B |
| Moderate | 6–15 banned words/1,000 chars, or 3+ consecutive templates | A + B + C + D + G |
| Severe | >15 banned words/1,000 chars, or 4+ of the 7 Gates flagged | All 7 Gates + targeted rewrites |

Deletion cap by severity: Mild ≤15%, Moderate ≤25%, Severe ≤35% of the passage. Mark anything borderline `[NEEDS REVIEW]` rather than deleting.

## Natural Writing Benchmarks

| Dimension | Natural web fiction | AI-flavored text |
| --- | --- | --- |
| Paragraph length | 1–3 sentences; occasional 1-sentence standalone | 4–6 sentences, uniform |
| Dialogue tags | 60%+ tagless, action-attributed | Nearly every line tagged |
| Emotion | Body action ("手在抖") | Direct statement ("很紧张") |
| Simile | Everyday ("像哈士奇护食") | Literary ("如寒冰般") |
| Filler words | Colloquial ("嘤" "嘶" "靠") | Almost none |
| Detail | Specific, concrete | Vague and thorough |
| Parallel structure | At most 1–2, never 3+ consecutive | 3–5 in a row is standard |
| Endings | Action or dialogue | Summary or uplift |

## Quick Replacement Reference

| AI-flavored phrase | Natural alternative |
| --- | --- |
| 深吸一口气 | 胸口起伏了一下 / delete |
| 眼中闪过一丝… | 他垂下眼 / 眯起眼 |
| 嘴角勾起一抹… | 笑了一下，没到眼底 / 乐了 |
| 仿佛/犹如/宛若 | 像… / white-describe |
| 不禁… | direct action |
| 缓缓开口 | 说 / action-then-dialogue |

## Three-Pass Method

- **Pass 1 — Deabstract**: Gates A, C (abstract emotion), D (uniform rhythm), G (narrator intrusion)
- **Pass 2 — Deliteralize**: Gates A (literary register), B (sentence templates)
- **Pass 3 — Restore natural voice**: Gates D (short/long rhythm mix), E (dialogue differentiation), F (ending de-moralization), add sensory detail

- Mild: Pass 1 only
- Moderate: Pass 1 + Pass 2
- Severe: All 3 passes + targeted rewrites of worst paragraphs

## Whitelist

If the project root contains `.deslop-whitelist`, skip flagging any phrase that appears there. Format: one entry per line, `#` for comments. Use for world-building terms, character nicknames, or intentional stylistic choices that happen to match banned patterns.

## Deslop Report Format

```
## De-Slop Report

AI flavor level: {mild / moderate / severe}
Gates applied: {A B C ...}
Deletion rate: {X%}

### Change Log
| Location | Gate | Original | Revised | Note |
|----------|------|----------|---------|------|

### [NEEDS REVIEW]
{Any passages marked for human review rather than auto-rewrite}
```
