# Story Setup

Load this reference when the user asks to set up a new writing project or initialize a fiction project directory.

## Project Directory Structure

Long-form novel (长篇) — place under `content/{book-title}/`:

```
content/{book-title}/
├── world/
│   ├── worldbuilding.md
│   ├── characters/
│   │   ├── {protagonist-name}.md
│   │   └── ...
│   └── map.md                 # optional
├── outline/
│   ├── outline.md             # full-book outline
│   └── arc-outlines/          # optional arc-level outlines
├── chapters/
│   ├── ch-001-{title}.md
│   ├── ch-002-{title}.md
│   └── ...
├── reference/
│   └── {reference-title}/
│       ├── teardown.md
│       ├── plot-beats.md
│       └── techniques.md
├── tracking/
│   ├── context.md             # running context for next chapter
│   ├── threads.md
│   ├── timeline.md
│   └── character-status.md
└── resources/                 # optional research
```

Short-form story (短篇) — place under `content/short/{story-title}/`:

```
content/short/{story-title}/
├── setup.md                   # world + characters + emotion target
├── beat-outline.md            # beat-level outline
├── prose.md                   # all prose, single file
└── reference/                 # optional reference books
    └── {book-title}/
        ├── teardown.md
        └── techniques.md
```

## Naming Conventions

- Chapter files: `ch-NNN-{title}.md` — zero-padded to 3 digits minimum (`ch-001`, `ch-010`, `ch-100`)
- Chapter order: derived from filename sort — never rely on frontmatter order alone
- Book root: `content/{book-title}/` — use the book title as the directory name under `content/`
- Short stories: always under `content/short/{story-title}/`

## What the Site Reads vs. Ignores

| Directory | Reader sees it? |
| --- | --- |
| `chapters/ch-NNN-*.md` | Yes — chapter content |
| `public/covers/<book-title>/cover/cover_v1.png` | Yes — served as `/covers/<book-title>/cover/cover_v1.png` |
| `world/`, `outline/`, `tracking/`, `reference/`, `resources/` | Never — writing internals |

Never create routes or expose links to writing-internal directories.

## Initialization Checklist

When setting up a new project:

1. Create the directory structure above with placeholder files.
2. Write a brief `world/worldbuilding.md` (3–5 bullet points: genre, setting, tone, core conflict).
3. Write `world/characters/{protagonist-name}.md` with role, motivation, voice notes.
4. Write `outline/outline.md` with a 10–30 beat arc outline.
5. Create `tracking/context.md` — starts empty; populated after each chapter.
6. If a reference book exists, run `/story-import` or manually create `reference/{book-title}/` files.
