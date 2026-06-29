# Story Review

Load this reference when the user asks for a review, audit, or quality check of written chapters or a complete manuscript.

## Purpose

Find structural, character, prose, and consistency problems and give actionable revision instructions. The mandate is to find problems — not to validate what works.

## Review Modes

| Mode | When | Scope |
| --- | --- | --- |
| `full` | User explicitly asks for a deep audit | Structure + character + prose + consistency |
| `lean` | Default for pipeline use; fast turnaround | Structure + consistency only |
| `solo` | Single-pass; no sub-agents | All dimensions, inline execution |

Default to `lean` when running as part of the fiction-h5-builder pipeline. Use `full` only when the user asks for it. If no agents are deployed or the environment doesn't support sub-agents, fall back to `solo` automatically and note the fallback in the report.

## Report Header (always output verbatim)

```
Requested Mode: full | lean | solo
Effective Mode: full | lean | solo
Fallback: none | missing agents -> solo | agent tool unavailable -> solo
```

## Review Dimensions

### 1. Structure Audit

- Does each chapter have a hook, escalation, turn, and hook-out?
- Does the chapter end with forward pull (reader wants next chapter)?
- Are any chapters filler — nothing changes from beginning to end?
- Is the arc pacing consistent, or does the middle sag?
- Are all planted foreshadows tracked and resolved (or intentionally open)?

Flag: chapters with no turn, chapters that end on summary/reflection, back-to-back low-stakes chapters.

### 2. Character Audit

- Does each major character have a consistent voice in dialogue?
- Are character motivations coherent across scenes?
- Does any character act against established personality without earned cause?
- Is the protagonist's change arc progressing?

Flag: dialogue that could be spoken by any character interchangeably, unmotivated decisions, characters who disappear mid-arc.

### 3. Prose Audit

Run the Gate A–G scan from `references/story-deslop.md`. Report:

- Overall AI flavor severity (Mild / Moderate / Severe)
- Top 3 recurring patterns
- Worst 2–3 passages (location + problem + suggested fix)

Do not rewrite prose in a review — that is `/story-deslop`'s job. Point to specific lines and describe the fix.

### 4. Consistency Audit

- Are character names, appearance, and traits consistent across chapters?
- Are setting details (geography, distances, time-of-day) internally coherent?
- Does the timeline hold? Check `tracking/timeline.md` if available.
- Are open threads from `tracking/threads.md` accounted for?

Flag: name variants, contradictory descriptions, timeline breaks, unresolved foreshadows that appear forgotten.

## Report Format

```md
## Review Report

Requested Mode: {mode}
Effective Mode: {mode}
Fallback: {reason or "none"}
Scope: {chapters N–M or "full manuscript"}

---

### Structure
{Problems found, with chapter numbers. Actionable fix per problem.}

### Character
{Problems found. Quote the offending dialogue or beat if possible.}

### Prose
AI Flavor: {Mild / Moderate / Severe}
Top patterns: {list}
Worst passages: {location + problem + fix direction}

### Consistency
{Problems found. Quote conflicting details if possible.}

---

### Priority Actions
1. {Highest-impact fix}
2. {Second fix}
3. {Third fix}

### Passed
{What is working well — brief, 3–5 items max.}
```

## What Review Does Not Do

- Does not rewrite prose (use `/story-deslop`)
- Does not generate new content
- Does not validate the story concept — only the execution

## Context Files to Read Before Reviewing

Read only the files relevant to the review scope:

```
Required (if they exist):
  tracking/threads.md                    — to check unresolved threads
  tracking/timeline.md                   — to check timeline coherence
  tracking/character-status.md           — to check character consistency

Load only if needed:
  world/characters/{character-name}.md   — if character voice/behavior is in question
  outline/outline.md                     — if structural pacing is in question
  reference/{book-title}/teardown.md     — if comparing against reference book standard
```
