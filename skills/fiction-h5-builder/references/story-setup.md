# Story Setup

Load this reference when the user asks to set up a new writing project or initialize a fiction project directory.

## Project Directory Structure

Long-form novel (长篇) — place under `content/{书名}/`:

```
content/{书名}/
├── 设定/
│   ├── 世界观.md
│   ├── 角色/
│   │   ├── {主角名}.md
│   │   └── ...
│   └── 地图.md                 # optional
├── 大纲/
│   ├── 大纲.md                 # full-book outline
│   └── 分卷大纲/               # optional arc-level outlines
├── 正文/
│   ├── 第001章_章名.md
│   ├── 第002章_章名.md
│   └── ...
├── 对标/
│   └── {参考书名}/
│       ├── 拆文报告.md
│       ├── 情节节点.md
│       └── 写作手法.md
├── 追踪/
│   ├── 上下文.md               # running context for next chapter
│   ├── 伏笔.md
│   ├── 时间线.md
│   └── 角色状态.md
└── 参考资料/                   # optional research
```

Short-form story (短篇) — place under `content/短篇/{短篇标题}/`:

```
content/短篇/{短篇标题}/
├── 设定.md                     # world + characters + emotion target
├── 小节大纲.md                 # beat-level outline
├── 正文.md                     # all prose, single file
└── 对标/                       # optional reference books
    └── {书名}/
        ├── 拆文报告.md
        └── 写作手法.md
```

## Naming Conventions

- Chapter files: `第NNN章_章名.md` — zero-padded to 3 digits minimum (`第001章`, `第010章`, `第100章`)
- Chapter order: derived from filename sort — never rely on frontmatter order alone
- Book root: `content/{书名}/` — use the book title as the directory name under `content/`
- Short stories: always under `content/短篇/{短篇标题}/`

## Active Book Pointer

```
.active-book   # file at project root, contains relative path e.g. "content/我的小说"
```

When a Next.js site co-locates with the writing directory, the site reads `.active-book` to determine which book's `正文/` to load. Multiple books can co-exist; only the active book is surfaced in the reader.

## What the Site Reads vs. Ignores

| Directory | Reader sees it? |
| --- | --- |
| `正文/第NNN章_*.md` | Yes — chapter content |
| `.active-book` | Yes — determines active book |
| `public/covers/<书名>/封面/封面_v1.png` | Yes — served as `/covers/<书名>/封面/封面_v1.png` |
| `设定/`, `大纲/`, `追踪/`, `对标/`, `参考资料/` | Never — writing internals |

Never create routes or expose links to writing-internal directories.

## Initialization Checklist

When setting up a new project:

1. Create the directory structure above with placeholder files.
2. Write a brief `设定/世界观.md` (3–5 bullet points: genre, setting, tone, core conflict).
3. Write `设定/角色/{主角名}.md` with role, motivation, voice notes.
4. Write `大纲/大纲.md` with a 10–30 beat arc outline.
5. Create `追踪/上下文.md` — starts empty; populated after each chapter.
6. Write `.active-book` at the project root pointing to this book's directory (e.g. `content/我的小说`).
7. If a reference book exists, run `/story-import` or manually create `对标/{书名}/` files.
