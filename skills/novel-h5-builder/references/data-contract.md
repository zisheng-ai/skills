# Data Contract

## Purpose

This skill can generate a site from mock data, Markdown files, or an oh-story style writing directory. Treat oh-story as an upstream content source, not as a visible product concept.

`worldwonderer/oh-story-claudecode` creates filesystem-based novel projects. The H5 site must be able to load those generated novels directly when the user asks for integration.

## Recommended Models

```ts
type Book = {
  id: string;
  slug: string;
  title: string;
  author?: string;
  language: "en" | "es" | "ja" | "ko";
  description: string;
  cover?: string;
  genres: string[];
  status: "ongoing" | "completed" | "hiatus";
  wordCount?: number;
  latestChapterId?: string;
  updatedAt?: string;
};

type Chapter = {
  id: string;
  bookId: string;
  order: number;
  title: string;
  sourcePath?: string;
  content: string;
  wordCount?: number;
  publishedAt?: string;
};

type ReadingProgress = {
  bookId: string;
  chapterId: string;
  percent: number;
  updatedAt: string;
};
```

## oh-story Mapping

The upstream project documents these relevant structures:

Long-form project:

```text
{book-title}/
├── 设定/
├── 大纲/
├── 正文/
│   ├── 第001章_章名.md
│   └── ...
├── 对标/
├── 追踪/
│   ├── 上下文.md
│   ├── 伏笔.md
│   ├── 时间线.md
│   └── 角色状态.md
└── 参考资料/
```

Short-form project:

```text
短篇/{title}/
├── 正文.md
├── 小节大纲.md
└── 拆文库/
```

Active book pointer:

```text
.active-book
```

The `.active-book` file contains the relative path of the current active book, for example `长篇/我的小说`.

```text
正文/第001章_章名.md       -> Chapter.content/title/order
短篇/{标题}/正文.md        -> one Book with one Chapter
大纲/大纲.md              -> internal source only; not shown to readers by default
设定/角色/*.md            -> internal source only; optional public character page if requested
追踪/伏笔.md              -> internal source only
追踪/时间线.md            -> internal source only
封面 output               -> Book.cover
```

## Loader Requirements

When implementing an oh-story loader:

- Scan for directories containing `正文/` with chapter `.md` files.
- Scan `短篇/*/正文.md` and create one-chapter books.
- If `.active-book` exists, mark that book as featured or first in the home page.
- Sort long-form chapters by numeric chapter number from filenames like `第001章_章名.md`.
- Derive chapter titles from frontmatter first, then filename, then first heading.
- Derive book title from frontmatter or directory name.
- Keep `大纲/`, `设定/`, `追踪/`, `对标/`, and `拆文库/` out of reader pages by default.
- Do not expose internal writing notes unless the user explicitly asks for public extras.

Use `scripts/parse-oh-story.mjs` as a baseline parser when working in a Node-capable project. It uses only Node standard libraries and outputs site-ready JSON.

## Markdown Frontmatter

Prefer adding frontmatter to each chapter:

```md
---
title: Chapter 1: The Night Ferry
chapter: 1
bookId: night-ferry
language: en
wordCount: 3240
publishedAt: 2026-06-23
status: published
---

Chapter text...
```

## Rendering Rules

- Sanitize Markdown/HTML before rendering user-provided content.
- Preserve paragraph breaks.
- Avoid rendering author notes inside the main prose unless requested.
- Keep internal outline/setting files out of reader routes by default.
