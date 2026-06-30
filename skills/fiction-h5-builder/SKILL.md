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
- Mobile first — not mobile only. Design and code for mobile first, then enhance for tablet and desktop with `min-width` breakpoints. Social traffic is 90% mobile so 390px must work perfectly; desktop must still get a purposeful layout.
- One deliberate visual choice per build. Everything else supports reading.
- Prefer the simplest tech choice that meets the brief. Complexity needs a reason.
- Fixed good typography beats user-adjustable bad typography.
- Content language determines layout, font, and line-flow decisions.
- Realistic content only. Never ship placeholder text to readers.
- Load only the references needed for the current task phase.

## Content-to-Site Promise

This skill delivers a Next.js-blog-style experience:

1. Novel files live in `content/` inside the Next.js project root.
2. `next dev` / `next build` picks them up automatically — no scripts, no JSON generation.
3. Adding a new book = create `content/{book-title}/chapters/` and write chapters. Rebuild. Done.

All writing phase outputs MUST be saved to the correct path under `content/` from the project root. `@content-collections` reads `content/` at build time and generates typed collections automatically.

## Build Pipeline

All work starts with Phase 0. After that, Track A (content) and Track B (site) run in parallel.

### Phase 0 — Setup

Reference: `references/story-setup.md`
Output: directory structure, naming conventions, GitHub private repo, submodule registration. Skip if the project directory already exists.

**GitHub + Submodule setup (run once per new site):**

```bash
# 1. Initial commit inside the new site directory
git add -A && git commit -m "feat: initial commit"

# 2. Create private GitHub repo and push (account: zisheng-ai)
gh repo create zisheng-ai/{site-name} --private --source=. --remote=origin --push

# 3. Register as submodule in the fictions parent repo
git -C /Users/zisheng/Desktop/zisheng-ai/fictions submodule add --force \
  https://github.com/zisheng-ai/{site-name}.git {site-name}

# 4. Commit the submodule entry in the parent repo
git -C /Users/zisheng/Desktop/zisheng-ai/fictions add .gitmodules {site-name}
git -C /Users/zisheng/Desktop/zisheng-ai/fictions commit -m "feat: add {site-name} as submodule"
git -C /Users/zisheng/Desktop/zisheng-ai/fictions push
```

Replace `{site-name}` with the actual project directory name (kebab-case). Skip this block if the site already has a remote configured.

### Track A — Content

Starts after Phase 0. Runs in parallel with Track B.

| Phase | Name | Reference | Output |
| --- | --- | --- | --- |
| A0 | Niche Research | `fiction-niche-researcher.md` | `outputs/{site-slug}/{book-slug}/niche-research.json` |
| A1 | Write | see modes below | chapters, outline, world, tracking |
| A2 | Cover | `story-cover.md` + `cover-styles.md` | `public/covers/{book-title}/cover/cover_v1.png` per book |
| A3 | Quality Pass | `story-review.md` + `story-deslop.md` | review report, AI flavor removed |

A0 runs once per book (not once per site). Required for each new book unless the user has explicitly stated the genre, tropes, and premise. A0's `differentiation_angle` and `competitive_brief` feed directly into A1's story brief.

**A1 modes — pick exactly one per session:**

- **Long-form:** `references/story-long-write.md` → `chapters/ch-NNN-{title}.md` + `tracking/`
- **Short-form:** `references/story-short-write.md` → `prose.md`, `setup.md`, `beat-outline.md`
- **Import:** `references/story-import.md` → split chapters, reconstructed `world/`, `outline/`, `tracking/`

A3 is optional unless the user requests a review or the quality gate fails.

### Track B — Site

Starts after Phase 0. Runs in parallel with Track A.

| Phase | Name | Reference | Output |
| --- | --- | --- | --- |
| B1 | Stack | `tech-stack.md` | chosen stack with one-line rationale |
| B2 | Design | `design-system.md` | tone, palette, type system, `public/logo.svg`, `public/favicon.svg` |
| B3 | Data | `data-contract.md` | content-collections schema |
| B4 | Build | `ui-components.md` + `reader-ux.md` | working site with all required pages |
| B5 | Performance | `performance.md` | Core Web Vitals targets met, images optimized |
| B6 | QA | `qa-checklist.md` | automated QA pass; screenshots on failure only |

B1 → B2 → B3 → B4 are sequential. B5 and B6 run in parallel against the same build — run `pnpm run build` once, then check both.

**B4 gate:** at least one book with ≥ 10 chapters must exist before starting B4. B1–B3 may run while writing is still in progress.

Optional phases (load only when the brief requires):
- `references/internationalization.md` — when target language is not the build default
- `references/product-surface.md` — when IA or URL structure needs formal documentation

### Parallel-safe pairs

| What | Notes |
| --- | --- |
| Track A + Track B | Both start after Phase 0; fully independent |
| Multiple books in A1 | All books run concurrently |
| Chapters within a book (A1) | Expand outline first → parallel chapters → continuity pass |
| Covers across books (A2) | Batch all books in one round, not one-at-a-time |
| B2 + B3 | Design tokens and data schema are independent |
| B5 + B6 | Share one `pnpm run build` — do not run two concurrent builds |

### Pre-Launch Gate

All of the following must be true before go-live (after B6 passes):

| Check | Required location |
| --- | --- |
| ≥ 5 book directories | `content/{book-title}/` |
| Each book has 10–20 chapters, and **no two books share the same count** | `content/{book-title}/chapters/` |
| Each chapter meets its type target (see Pacing Guidelines in `story-long-write.md`); word counts must vary naturally across chapters — never identical | A1 output |
| `outline/outline.md` exists and non-empty | A1 output |
| `world/worldbuilding.md` exists and non-empty | A1 output |
| `tracking/context.md` exists | A1 output |
| Cover image for every book | `public/covers/{book-title}/cover/cover_v1.png` |

If any book is missing a cover at launch time, run A2 immediately — do not prompt the user.

### Scope-to-phase mapping

| User intent | Phases to run |
| --- | --- |
| "Write a novel" / "Continue writing" / `/story-long-write` | 0 (skip if exists), A1 long-form, A3 (if requested) |
| "Write a short story" / `/story-short-write` | 0 (skip if exists), A1 short-form, A3 (if requested) |
| "Add one book to existing site" | A1 long-form (single book), A2 (single book) |
| "Generate covers" / `/story-cover` | A2 only |
| "Import manuscript" / `/story-import` | A1 import only |
| "Review prose" / `/story-review` | A3 only |
| "Build the site" / full pipeline | 0 → Track A + Track B in parallel |

For review and redesign tasks, start at the relevant phase and load only the references covering the failing areas.

## Environment Prerequisites

This skill requires Claude Code. Before doing anything else, verify the Bash tool is available:

```bash
echo "claude-code-ok"
```

If the Bash tool is unavailable (not a Claude Code session), stop immediately and output:
```
ERROR: fiction-h5-builder requires Claude Code. Re-invoke from a Claude Code session.
```

**Cover image generation (A2):** Calls `https://api.apiyi.com/v1/images/generations` with model `gpt-image-2-vip` via curl. Requires `APIYI_API_KEY` in the environment. If not set, Claude generates a styled SVG cover as fallback — no external API required.

```bash
[ -n "$APIYI_API_KEY" ] && echo "apiyi path" || echo "SVG fallback"
```

**Logo and favicon (B2):** Same `APIYI_API_KEY` check as A2. If set, generates PNG assets via `gpt-image-2-vip`; if not set, yellow warning + Claude writes SVG fallback.

## Phase Execution Protocol

Execute phases one at a time. Track progress with the best mechanism available in the current environment:

**If `TaskCreate` / `TaskUpdate` are available** (Claude Code): use them. Create tasks only for the phases that will actually run in this session. Do not create tasks for phases outside the current scope. Flip a task to `in_progress` when entering that phase and `completed` when done. Use `TaskGet` on re-entry to restore state.

**Phase naming convention:**
- Full pipeline: use phase IDs in task titles, e.g. "A2: Cover", "B4: Build".
- Single-function triggers (`/story-cover`, `/story-import`, `/story-review`, etc.): use descriptive titles — "Cover Generation", "Manuscript Import", "Prose Review".

**If those tools are not available** (other agents / API): print a compact text progress block only when a phase runs. For `/story-cover`, output something like:

```
[ Fiction H5 Builder — Cover Generation ]
▶ Cover
```

**Orchestration — use `Agent` for all delegation:**

Use the `Agent` tool for every delegation task, whether single or parallel. To run tasks concurrently, send multiple `Agent` tool calls in a single response — the runtime executes them in parallel automatically. Do not use `Workflow`.

| Situation | Use |
| --- | --- |
| Single chapter rewrite, single cover retry | One `Agent` call |
| A1 — multiple books in parallel | Multiple `Agent` calls in one response, one per book |
| A1 — chapters within a book | Expand outline first → multiple `Agent` calls in one response (one per chapter) → continuity pass |
| A2 — cover batch across all books | Multiple `Agent` calls in one response, one per book |
| Track A + Track B launched together | Two `Agent` calls in one response |
| B5 + B6 against the same build | Two `Agent` calls in one response |

**Model selection:**

**If the `Agent` tool is available** (Claude Code — guaranteed by the prerequisite check above): delegate all chapter and prose generation with `model: 'haiku'`. Never write fiction content directly in the main context. Never prompt the user to switch models manually.

**If the `Agent` tool is not available**: write chapters sequentially in the main context. Skip parallel multi-book and multi-chapter spawning; write one chapter at a time following the Single Chapter Writing Process in `story-long-write.md`. Note: this is a degraded mode — quality and speed are both reduced.

Track B phases carry no model override and inherit the session model regardless.

**Rules (apply in both modes):**
- **Within a phase: act autonomously.** Invoke all required tools (image generation, file writes, bash commands) without asking the user. Never surface a "please run X" or "待处理" prompt mid-phase — just do it.
- **Between phases: summarize and continue.** At each phase boundary, print a one-line summary of what was produced and move to the next phase. Do not wait for user confirmation unless the user explicitly says to pause.
- Parallel-safe phases may be executed in the same turn — announce both at the start and summarize both at the end.
- Sequential phases run back-to-back without pausing for confirmation.
- Load each phase's reference file only when entering that phase.
- If a phase is skipped, mark it done with a note explaining why, then continue.
- On re-entry, restore or reprint current state before proceeding.

## Quality Gates

Do not deliver a build if any of these are true.

**Reading product:**
- Chapter content contains lorem ipsum or generic placeholder text.
- Reader background is pure white (`#fff`) or pure black (`#000`), or a tinted hue that makes the page feel pink / rosy / flashy.
- Next chapter button is missing, broken, or below 60px height.
- Next button uses a muted or dark color instead of a vivid warm fill (hot pink / magenta / coral).
- A "Previous" button appears in the reader nav.
- Table of contents button is missing from the reader nav.
- Chapter content fails to load or shows a blank page.

**Visual quality:**
- Loud gradients, fake glass panels, glowing orbs, or heavy drop shadows on any surface.
- Light theme `--color-base-100/200/300` tinted pink, rosy, or any vivid hue — use warm neutral tones only (ivory, linen, parchment: e.g. `#F9F7F3` / `#F0EBE3` / `#E4DDD4`).
- Body font is decorative, handwritten, or a novelty display face.
- Body text is below 17px on mobile or below 17px on desktop.
- Body text fails WCAG AA contrast (4.5:1) against the page background.
- Desktop is a stretched phone layout with no layout adaptation.

**Content and language:**
- `<html lang>` is missing or set to the wrong locale.
- Font stack does not include appropriate language fallbacks for the target language.
- Any reader-visible copy mentions AI, Markdown, parser, prompt, skill, or generation.

**Content completeness:**
- Site launches with fewer than 5 books.
- Any book has fewer than 10 chapters or more than 20 chapters.
- All books share the same chapter count — each book must differ.
- Any chapter falls below its type's minimum (see Pacing Guidelines in `story-long-write.md`).
- All chapters in a book have the same word count — natural variation is required.
- `outline/outline.md` is missing or empty for any published book.
- `world/worldbuilding.md` is missing or empty for any published book.
- Cover image is missing for any book in the reader at launch time. (Development preview may use CSS placeholders; final launch requires real covers.)
- Logo is missing or is the default Next.js placeholder at launch time. Required: `public/logo.png` (apiyi path) or `public/logo.svg` (SVG fallback).
- Favicon is missing or is the default Next.js favicon at launch time. Required: `public/favicon-32x32.png` (apiyi path) or `public/favicon.svg` (SVG fallback).

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
- Required reader controls: fixed bottom bar with TOC (ghost) + Next → (vivid warm fill, min 60px height); no Previous button; dark mode toggle (DaisyUI `data-theme`); resume-last-chapter via localStorage.
- Add font size control or reading progress indicator only when the brief explicitly asks for them.
- Do not add ranking, bookshelf, favorites/bookmarks, search, payment, comments, social sharing, or account modules unless explicitly requested.
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
- `story-cover.md` + `cover-styles.md` — cover generation via apiyi `gpt-image-2-vip` (SVG fallback if no API key).

**Site build references (load for publishing tasks):**
- `tech-stack.md` — choose the implementation stack before writing any code.
- `design-system.md` — plan design identity before building any UI.
- `data-contract.md` — define data models and @content-collections setup.
- `ui-components.md` — visual and component quality floor during build.
- `reader-ux.md` — chapter page UX requirements during build.
- `performance.md` — Core Web Vitals, loading strategy, image optimization.
- `qa-checklist.md` — final automated QA and screenshot verification (failures only).
- `product-surface.md` — IA and URL structure (optional, load when needed).
- `internationalization.md` — language and font decisions (optional, load when needed).

## Output Contract

```
<project>/
  content/                      # all writing outputs live here
    {book-title}/
      chapters/                 # ch-001-{title}.md, ch-002-{title}.md, ...
      world/                    # worldbuilding.md, characters/, map.md
      outline/                  # outline.md
      tracking/                 # context.md, threads.md, timeline.md
  src/app/
    page.tsx                    # home: book list
    book/[slug]/
      page.tsx                  # book detail: synopsis + chapter list
      chapter/[n]/
        page.tsx                # chapter reader: content + prev/next
  content-collections.ts        # collection schema definitions
  src/lib/
  src/components/
    BookCard.tsx
    ChapterNav.tsx
    ThemeToggle.tsx             # DaisyUI data-theme switcher
  public/
    covers/                     # cover images (A2)
    logo.png / logo.svg         # site logo — PNG if APIYI_API_KEY set, else SVG (B2)
    favicon-32x32.png / favicon.svg  # favicon (B2)
```

Cover images (`public/covers/{book-title}/cover/cover_v1.png`) are generated in A2 via apiyi (or SVG fallback). Logo and favicon follow the same pattern in B2 — PNG via apiyi if `APIYI_API_KEY` is set, SVG written by Claude otherwise. During development only, CSS placeholders are acceptable — never ship without real assets.

For a review or redesign task, the output is a findings report and patch set, not a full scaffold.

## Collaboration With Other Skills

The skills listed in **Merged Skills** below are already integrated — no separate installation needed. Use their capabilities directly.

This skill's reader-comfort requirements and QA gates take priority over any visual suggestion. Accept aesthetic feedback only when it does not reduce reading comfort, reduce contrast, or add visual noise to the chapter surface.

## Merged Skills

Skills that have been absorbed into this skill. When a source skill releases an update, review the diff against the corresponding reference files listed here and sync any improvements.

| Skill | Source | Merged into | Notes |
| --- | --- | --- | --- |
| frontend-design | `frontend-design@claude-plugins-official` | `references/ui-components.md`, `references/design-system.md` | Visual component specs, typography system, responsive layout patterns, dark mode implementation |
| taste-skill | `taste-skill@claude-plugins-official` | `references/design-system.md`, `references/ui-components.md` | Aesthetic judgment, genre-specific visual direction, signature element discipline, anti-default design discipline |
| oh-story-claudecode | `https://github.com/worldwonderer/oh-story-claudecode` | `references/story-setup.md`, `references/story-long-write.md`, `references/story-short-write.md`, `references/story-import.md`, `references/story-review.md`, `references/story-deslop.md`, `references/story-cover.md` | Fiction writing pipeline: trend scan, deconstruct/analyze, write (long-form + short-form), project setup, AI-flavor removal, manuscript import, prose review, cover generation. Site build, UI components, and reader UX are fiction-h5-builder's own additions not present in the source. **Source is in Chinese** — sync is not a strict diff; requires reading the upstream changes, translating, and adapting into the English reference files. Local adaptations and additions have been made on top of the source; do not overwrite them unless there is a compelling upstream reason. When in doubt, preserve the local version. |
