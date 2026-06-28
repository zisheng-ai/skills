---
name: fiction-h5-builder
description: write fiction and build the reading site end-to-end. use when the user asks to write a novel or short story (long-form novel / 长篇小说, short-form story / 短篇小说, write chapters, continue writing, story setup, import a manuscript, review prose, remove AI flavor), or asks for a mobile-first fiction reading site, web novel H5, work list/detail/catalog/reader pages, markdown chapters, multilingual reading sites in english/spanish/japanese/korean, or a simple fiction site for social traffic campaigns. do not use for creator dashboards, ranking systems, bookshelf platforms, or reader community features unless the user explicitly asks for those.
---

# Fiction H5 Builder

## Three Core Goals

**Goal 0 — Produce quality fiction content.**
Write chapters that readers want to keep reading. Every sentence serves emotion, plot, or character. Remove AI flavor before publishing. Quality prose is the prerequisite for everything else.

**Goal 1 — Deliver a real reading product.**
The site must load fast, read comfortably on mobile, and get out of the reader's way. Discovery pages exist to bring readers to chapters. The chapter page is where users stay or leave.

**Goal 2 — Reading comfort above visual complexity.**
Typography, spacing, and contrast are non-negotiable. Interactive reader controls (theme switcher, font-size stepper) are optional enhancements — not requirements. A well-set fixed type scale beats a broken control panel every time.

## Operating Principles

- The chapter page is the product. Every other page is a path to it.
- Mobile first. Facebook / social traffic is 90% mobile — if it breaks at 390px, it's broken.
- One deliberate visual choice per build. Everything else supports reading.
- Prefer the simplest tech choice that meets the brief. Complexity needs a reason.
- Fixed good typography beats user-adjustable bad typography.
- Content language determines layout, font, and line-flow decisions.
- Realistic content only. Never ship placeholder text to readers.
- Load only the references needed for the current task phase.

## Content-to-Site Promise

This skill delivers a Hexo/Next.js-blog-style experience:

1. Novel files live in `content/` inside the Next.js project root.
2. `next dev` / `next build` picks them up automatically — no scripts, no JSON generation.
3. Adding a new book = create `content/{book-title}/chapters/` and write chapters. Rebuild. Done.

All writing phase outputs MUST be saved to the correct path under `content/` from the project root. `@content-collections` reads `content/` at build time and generates typed collections automatically.

## Build Pipeline

### Writing phases (run when the user has no existing content — always produce real chapters, never mock)

| Phase | Load Reference | Required Output |
| --- | --- | --- |
| 0. Project setup | `references/story-setup.md` | Directory structure, naming conventions |
| 1. Write long-form | `references/story-long-write.md` | Chapters in `chapters/ch-NNN-{title}.md`, updated `tracking/` |
| 1. Write short-form | `references/story-short-write.md` | `prose.md`, `setup.md`, `beat-outline.md` |
| 2. Import manuscript | `references/story-import.md` | Split chapters, `world/`, `outline/`, `tracking/` reconstructed |
| 3. Cover (optional) | `references/story-cover.md` + `references/cover-styles.md` | Cover image in `public/covers/<book-title>/cover/cover_v1.png` |
| 4. Quality pass | `references/story-review.md` + `references/story-deslop.md` | Review report, prose with AI flavor removed |

These phases are skipped entirely when the user starts from existing Markdown files.

### Site build phases (always run for publishing)

| Phase | Load Reference | Required Output |
| --- | --- | --- |
| 4. Stack (site build entry point) | `references/tech-stack.md` | Chosen stack with one-line rationale |
| 5. Design plan | `references/design-system.md` | Tone, palette, type system, layout concept, signature element |
| 6. Data setup | `references/data-contract.md` | Loader plan (direct filesystem) |
| 7. Build | `references/mobile-ui.md` + `references/reader-ux.md` | Working site with all required pages |
| 8. Performance | `references/performance.md` | Core Web Vitals targets met, images optimized |
| 9. QA | `references/qa-checklist.md` | Screenshots at required viewports, checklist passed |

Optional site build phases (load only when the brief requires):
- `references/internationalization.md` — when target language is not the build default
- `references/product-surface.md` — when IA or URL structure needs formal documentation

For review and redesign tasks, start at the relevant phase and load only the references covering the failing areas.

## Quality Gates

Do not deliver a build if any of these are true.

**Reading product:**
- Chapter content contains lorem ipsum or generic placeholder text.
- Reader background is pure white (`#fff`) or pure black (`#000`).
- Previous / next chapter navigation is missing or broken.
- Chapter content fails to load or shows a blank page.

**Visual quality:**
- Loud gradients, fake glass panels, glowing orbs, or heavy drop shadows on any surface.
- Body font is decorative, handwritten, or a novelty display face.
- Body text is below 16px on mobile or below 17px on desktop.
- Body text fails WCAG AA contrast (4.5:1) against the page background.
- Desktop is a stretched phone layout with no layout adaptation.

**Content and language:**
- `<html lang>` is missing or set to the wrong locale.
- Font stack does not include appropriate language fallbacks for the target language.
- Any reader-visible copy mentions AI, Markdown, parser, prompt, skill, or generation.

**Technical:**
- Build errors or console errors exist on page load.
- Routes do not work or data does not load.
- Any required page (home, book detail, reader) is missing.
- Initial JS bundle exceeds 200KB for a prototype.
- Cover images are not optimized (`next/image` or equivalent).

## Non-Negotiables

- Writing internals (`outline/`, `world/`, `tracking/`, `reference/`, `resources/`, `teardowns/`) are never exposed in reader routes, reader-facing URLs, or site navigation. Build the site as if those directories do not exist.
- Reader-facing only by default: no AI labels, writing workflow panels, or "generated by" branding.
- Mobile is the primary target. Desktop must have its own layout logic — not a stretched phone screen.
- Required pages: home / book list, book detail with chapter list, chapter reader.
- Required reader controls: previous / next chapter navigation, dark mode toggle (DaisyUI `data-theme`), resume-last-chapter via localStorage.
- Add font size control, reading progress indicator, or catalog drawer only when the brief explicitly asks for them.
- Do not add ranking, bookshelf, search, payment, comments, or account modules unless explicitly requested.
- Respect content language: set `lang`, use language-appropriate font stacks, handle CJK line flow.
- One deliberate visual signature per build — connected to reading, books, chapters, or genre.

## Performance Baseline

Fast loading is a product requirement for social traffic.

- SSG (`generateStaticParams`) for all chapter and book routes. No runtime filesystem reads.
- Cover images: `next/image` with `priority` on above-the-fold images when covers exist; CSS placeholder when they don't.
- Chapter content: loaded per route, never bundled all-at-once.
- Prefetch next chapter at 80% scroll depth (simple `router.prefetch()` call).
- Initial JS bundle under 200KB.
- LCP target: under 2.5s on a mid-range Android device on 4G.

## Reference Loading

Load references only when entering that phase. Do not preload all references at the start.

**Writing references (load only for content authoring tasks):**
- `story-setup.md` — project directory initialization and naming conventions.
- `story-long-write.md` — long-form chapter writing pipeline, context handoff.
- `story-short-write.md` — short-form story pipeline, emotion-first structure.
- `story-import.md` — import and split an existing manuscript into project structure.
- `story-review.md` — multi-perspective structural and prose review.
- `story-deslop.md` — AI-flavor detection and removal (7 gates).
- `story-cover.md` + `cover-styles.md` — cover generation via GPT-Image-2 or Claude image generation.

**Site build references (load for publishing tasks):**
- `tech-stack.md` — choose the implementation stack before writing any code.
- `design-system.md` — plan design identity before building any UI.
- `data-contract.md` — define data models and @content-collections setup.
- `mobile-ui.md` — visual and component quality floor during build.
- `reader-ux.md` — chapter page UX requirements during build.
- `performance.md` — Core Web Vitals, loading strategy, image optimization.
- `qa-checklist.md` — final QA and screenshot verification.
- `product-surface.md` — IA and URL structure (optional, load when needed).
- `internationalization.md` — language and font decisions (optional, load when needed).

## Output Contract

```
<project>/
  src/app/
    page.tsx                    # home: book list
    book/[slug]/
      page.tsx                  # book detail: synopsis + chapter list
      chapter/[n]/
        page.tsx                # chapter reader: content + prev/next
  content-collections.ts          # collection schema definitions
  src/lib/
  src/components/
    BookCard.tsx
    ChapterNav.tsx
    ThemeToggle.tsx             # DaisyUI data-theme switcher
  public/
    covers/                     # optional: cover images
```

Cover images are optional. When no cover exists, `BookCard` renders a genre-tinted CSS placeholder — never a broken `<img>`.

For a review or redesign task, the output is a findings report and patch set, not a full scaffold.

## Collaboration With Other Skills

If a frontend-design or taste-skill is available, use it for implementation and visual verification. This skill's reader-comfort requirements and QA gates take priority over any visual suggestion from a collaborating skill.

Accept aesthetic feedback only when it does not reduce reading comfort, reduce contrast, or add visual noise to the chapter surface.
