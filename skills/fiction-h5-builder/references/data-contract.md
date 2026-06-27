# Data Contract

## Purpose

This skill always generates real content — never mock data. If the user has no existing manuscript, run the writing phases first to produce actual chapters, then build the site.

Fiction projects use a filesystem-based directory structure (see below). The Next.js site reads those files directly at build time — no JSON intermediate, no pre-build scripts.

## Loader Strategy

| Scenario | Loader |
| --- | --- |
| Fiction writing directory co-located with Next.js project | **@content-collections** |

## Content Layer (@content-collections)

Use [`@content-collections`](https://www.content-collections.dev/) as the content layer. It hooks into `next dev` / `next build` automatically — drop files into `content/`, rebuild, done. No manual `fs` reads, no hand-written parsers. Chapters become fully-typed objects via auto-generated types.

**Install:**

```bash
yarn add @content-collections/core @content-collections/next
```

**Project layout:**

```
my-novel-site/
├── content/                      ← all fiction writing content
│   ├── {书名}/                   ← long-form book directory
│   │   ├── 正文/
│   │   │   ├── 第001章_开始.md
│   │   │   └── 第002章_发展.md
│   │   ├── 大纲/                 ← writing internal, never read by content-collections
│   │   ├── 设定/                 ← writing internal
│   │   └── 追踪/                 ← writing internal
│   └── 短篇/                     ← short stories
│       └── {title}/
│           └── 正文.md
├── public/
│   └── covers/                   ← cover images, served as static assets
│       └── {书名}/
│           └── 封面/
│               └── 封面_v1.png
├── .active-book                  ← e.g. "content/我的小说"
├── content-collections.ts        ← collection definitions
├── src/
│   ├── app/
│   │   ├── page.tsx              ← chapter catalog
│   │   └── reader/[chapter]/
│   │       └── page.tsx          ← reader page with prev/next
│   └── lib/
│       └── active-book.ts        ← reads .active-book (one fs call, build-time only)
└── tailwind.config.ts
```

**`content-collections.ts`:**

```ts
import { defineCollection, defineConfig } from '@content-collections/core'

const chapters = defineCollection({
  name: 'chapters',
  directory: 'content',
  include: '*/正文/*.md',          // long-form: content/{书名}/正文/第NNN章.md
  schema: z => ({
    title: z.string().optional(),
    chapter: z.coerce.number().optional(),
    wordCount: z.coerce.number().optional(),
    publishedAt: z.string().optional(),
    status: z.enum(['published', 'draft']).default('published'),
  }),
  transform: doc => {
    const [bookSlug] = doc._meta.path.split('/')
    const filename = doc._meta.fileName
    const orderMatch = filename.match(/第?0*(\d+)[章节回]?/)
    const order = doc.chapter ?? (orderMatch ? Number(orderMatch[1]) : 0)
    const title = doc.title
      ?? filename.replace(/^第?\d+[章节回]?_?/, '').replace(/\.md$/, '')
    return { ...doc, bookSlug, order, title }
  },
})

const shortStories = defineCollection({
  name: 'shortStories',
  directory: 'content/短篇',
  include: '*/正文.md',            // short-form: content/短篇/{title}/正文.md
  schema: z => ({
    title: z.string().optional(),
    wordCount: z.coerce.number().optional(),
    publishedAt: z.string().optional(),
  }),
  transform: doc => {
    const storyTitle = doc._meta.path.split('/')[0]
    return { ...doc, storyTitle, title: doc.title ?? storyTitle }
  },
})

export default defineConfig({
  collections: [chapters, shortStories],
})
```

**`next.config.ts`:**

```ts
import { withContentCollections } from '@content-collections/next'
const nextConfig = { /* ... */ }
export default withContentCollections(nextConfig)
```

**Usage in pages:**

```ts
import { allChapters } from 'content-collections'
import fs from 'fs'

// Read active book at build time (one call, never at runtime)
const activeBook = fs.existsSync('.active-book')
  ? fs.readFileSync('.active-book', 'utf8').trim().replace('content/', '')
  : null

export async function generateStaticParams() {
  const chapters = allChapters
    .filter(ch => !activeBook || ch.bookSlug === activeBook)
    .sort((a, b) => a.order - b.order)
  return chapters.map((_, i) => ({ chapter: String(i + 1) }))
}
```

- Writing internals (`大纲/`, `设定/`, `追踪/`, `拆文库/`) are excluded by the `include` glob — they never appear in generated types.
- Adding a new book: create `content/{书名}/正文/` and write chapters. `next build` picks them up automatically.
- Adding a new short story: create `content/短篇/{title}/正文.md`. No config change needed.
- Generated types live in `.content-collections/` — add to `.gitignore`.

## Data Models

```ts
type Language = "en" | "es" | "ja" | "ko" | "zh";

type Book = {
  id: string;
  slug: string;
  title: string;
  author?: string;
  language: Language;
  description: string;
  cover?: string;          // URL or relative path to cover image
  genres: string[];
  status: "ongoing" | "completed" | "hiatus";
  wordCount?: number;
  chapterCount?: number;
  latestChapterId?: string;
  updatedAt?: string;      // ISO 8601
  featured?: boolean;      // true for the .active-book
  sourceType?: "fiction-long" | "fiction-short" | "cms";
  sourcePath?: string;     // relative path to the book's source directory
};

type Volume = {
  id: string;
  bookId: string;
  order: number;
  title: string;
};

type Chapter = {
  id: string;
  bookId: string;
  volumeId?: string;       // optional arc/volume grouping
  order: number;
  title: string;
  language?: Language;     // per-chapter language (may differ from the book's language)
  sourcePath?: string;     // relative path to source .md file
  content: string;         // rendered body text (Markdown or HTML)
  wordCount?: number;
  publishedAt?: string;    // ISO 8601
  status?: "published" | "draft";
};

type ReadingProgress = {
  bookId: string;
  chapterId: string;
  scrollPercent: number;   // 0–1, position within the chapter
  updatedAt: string;       // ISO 8601
};

```

## Fiction Project Directory Structure

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
.active-book   # contains relative path, e.g. "content/我的小说"
```

## Field Mapping

```text
正文/第001章_章名.md   →  Chapter { content, title, order }
短篇/{title}/正文.md   →  Book (one chapter, status: "completed")
大纲/大纲.md           →  internal only; not shown to readers
设定/角色/*.md         →  internal only; optional public character page if user requests
追踪/*.md              →  internal only
封面 output            →  Book.cover  (saved to public/covers/<书名>/封面/封面_v1.png, served as /covers/<书名>/封面/封面_v1.png)
.active-book           →  Book.featured = true, sort to first position
```

## Chapter Frontmatter Schema

Prefer this frontmatter in each chapter `.md`:

```md
---
title: "Chapter 1: The Night Ferry"
chapter: 1
bookId: night-ferry
language: en
wordCount: 3240
publishedAt: 2026-06-23
status: published
---

Chapter prose starts here.
```

Fields: `title` (string), `chapter` or `order` (number), `bookId` (string), `language` (Language), `wordCount` (number), `publishedAt` (ISO date string), `status` (`"published"` | `"draft"`).

## Rendering Rules

- Sanitize all Markdown/HTML before rendering user-provided content. Never render raw HTML from chapter files as trusted HTML without sanitization.
- Preserve paragraph breaks (`\n\n` → `<p>` tags or double line break).
- Do not render author notes (bracketed `【...】` or `（...）` prefixed with `作者`) inside the main prose column unless requested.
- Exclude internal writing files from all reader-facing routes by default.
- Handle missing or empty `content` gracefully: show "This chapter has no content yet." instead of a blank page.

## Pagination and Loading

- For co-located Next.js projects: use `generateStaticParams` with `getChapters()` to pre-render each chapter at build time. One route per chapter, zero runtime filesystem reads.
- For client-side apps: fetch chapter content on demand when the reader enters the route.
- Do not load all chapter content into a single bundle. A book with 100 chapters should not load all 100 on the home page.
- Prefetch the next chapter's content when the reader reaches 80% scroll depth in the current chapter.
