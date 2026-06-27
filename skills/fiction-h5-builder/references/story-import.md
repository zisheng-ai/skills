# Story Import

Load this reference when the user wants to import an existing novel (partial or complete) into the standard project structure so it can be continued and published.

## Purpose

Reverse-engineer a user-provided manuscript into a complete writing project — `设定/`, `大纲/`, `正文/`, `追踪/` — so that the story can be continued using `/story-long-write` or `/story-short-write`, and published using the fiction-h5-builder pipeline.

The deliverable is a **writable project**, not just an analysis.

## Phase 1: Confirm the Source

Ask the user:
1. Book title and source file path (or paste text directly)
2. Genre and target platform (起点 / 番茄 / 晋江 / other)
3. Is the manuscript complete or partial? If partial, which chapter is the last?
4. Is the last chapter complete or a fragment?
5. Does the user want a full writable project (can continue writing) or just a structural analysis?

Auto-detect:
- Total chapter count and word count from the file
- Chapter delimiter format (e.g. `第N章`, `Chapter N`, `###`)
- Length classification (see below)

Confirm detections with the user before proceeding.

## Length Classification

| Signal | Long-form (长篇) | Short-form (短篇) |
| --- | --- | --- |
| Explicit chapter markers | Multiple discrete chapters | Single file or ≤3 chapters |
| Word count | >30,000 characters | ≤30,000 characters |
| User declaration | "长篇" / "长篇小说" | "短篇" / "短故事" |

User declaration overrides auto-detection. Confirm classification with the user.

## Phase 2: Structural Analysis

### Long-form analysis

For each chapter (or sampled chapters for very long manuscripts):

1. Extract: chapter number, title, opening beat, closing beat, major events
2. Identify: recurring characters + their relationships
3. Map: foreshadows planted and resolved
4. Extract: world-building rules (geography, systems, factions)
5. Identify: the author's prose style signals (sentence length, dialogue density, rhythm patterns)

Output to:
```
{书名}/对标/{书名}/
├── 拆文报告.md      — summary: arc structure, turning points, pacing
├── 情节节点.md      — beat-level chapter map
└── 写作手法.md      — prose technique, dialogue style, chapter hook patterns
```

### Short-form analysis

1. Identify the target emotion and the twist
2. Map setup beats and misdirection
3. Extract the hook sentence and the ending image
4. Identify prose techniques used

Output to `{短篇标题}/对标/{书名}/` with same three files.

## Phase 3: Build the Writing Project

After analysis, construct the writable project.

### Long-form project structure

```
content/{书名}/
├── 设定/
│   ├── 世界观.md          — extracted from the manuscript
│   └── 角色/{名}.md       — one file per major character
├── 大纲/
│   └── 大纲.md            — reconstructed arc outline (beat-level, chapter-referenced)
├── 正文/
│   ├── 第001章_章名.md    — split from source, zero-padded
│   └── ...
├── 对标/{书名}/            — from Phase 2 analysis
├── 追踪/
│   ├── 上下文.md           — last chapter's ending + open threads
│   ├── 伏笔.md             — all open foreshadows with chapter references
│   ├── 时间线.md           — inferred chronology
│   └── 角色状态.md         — character state at the end of the imported manuscript
└── 参考资料/               # optional research files
```

### Short-form project structure

```
content/短篇/{短篇标题}/
├── 设定.md               — emotion target + characters + world notes
├── 小节大纲.md            — beat outline of the imported story
├── 正文.md               — full prose
└── 对标/{书名}/           — from Phase 2 analysis
```

## Chapter Splitting Rules (Long-form)

When the source is a single file with chapter markers:

1. Split on the chapter delimiter (detect from first occurrence)
2. Name each file `第NNN章_{章名}.md` — zero-pad to 3 digits minimum
3. Strip chapter headers from prose body (the filename carries the number)
4. Add frontmatter if chapter title is available:
   ```md
   ---
   title: "章名"
   chapter: N
   ---
   ```
5. Do not modify prose content during splitting — import as-is, deslop separately

## Tracking File Reconstruction

`追踪/上下文.md` — write the last chapter's final beat and identify 2–3 open threads the next chapter must address.

`追踪/伏笔.md` — list all foreshadows found during analysis: what was planted, where, whether resolved.

`追踪/时间线.md` — reconstruct key timeline points (character ages, story days elapsed, seasonal markers).

`追踪/角色状态.md` — for each major character: current location, emotional state, key relationships as of the last imported chapter.

## Post-Import Checklist

- [ ] All chapter files named with correct zero-padded numbers
- [ ] `设定/世界观.md` contains enough to orient a writer continuing the story
- [ ] `大纲/大纲.md` shows where the story is and what is planned next
- [ ] `追踪/上下文.md` is ready to hand off to `/story-long-write`
- [ ] `追踪/伏笔.md` captures all unresolved threads
- [ ] Analysis assets in `对标/` (not deleted — they feed future writing decisions)

## What Import Does Not Do

- Does not edit or improve the imported prose (use `/story-deslop`)
- Does not review quality (use `/story-review`)
- Does not generate new chapters
- Does not modify the original source file
