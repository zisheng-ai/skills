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
| 1a. Write (long-form) | `references/story-long-write.md` | Chapters in `chapters/ch-NNN-{title}.md`, updated `tracking/` |
| 1b. Write (short-form) | `references/story-short-write.md` | `prose.md`, `setup.md`, `beat-outline.md` |
| 2. Import manuscript | `references/story-import.md` | Split chapters, `world/`, `outline/`, `tracking/` reconstructed |
| 3. Cover | `references/story-cover.md` + `references/cover-styles.md` | Cover image `public/covers/{book-title}/cover/cover_v1.png` for each book; skipped covers are retried later |
| 4. Quality pass | `references/story-review.md` + `references/story-deslop.md` | Review report, prose with AI flavor removed |

Phase 1a and 1b are mutually exclusive — run the one that matches the project type, skip the other. These phases are skipped entirely when the user starts from existing Markdown files.

### Parallel Pipeline

Writing and site build run on two independent tracks that start together after Phase 0:

| Track | Phases | Can start when |
| --- | --- | --- |
| Writing | 1 → 2 → 3 → 4 | Phase 0 complete |
| Site setup | 5 → 6 → 7 | Phase 0 complete |
| Site build | 8 → 9 → 10 | Track "Site setup" complete AND ≥ 1 book with ≥ 10 chapters exists |

Do not wait for all books to finish before starting Phase 5. Do not wait for site setup to finish before continuing to write. Add books to `content/` incrementally as they are completed — the site builder picks them up automatically.

### Pre-Launch Gate

All of the following must be true before go-live (after Phase 10 QA passes). These are launch requirements, not build-start requirements.

| Check | Required location |
| --- | --- |
| `content/` has ≥ 5 book directories | `content/{book-title}/` per book |
| Each book has ≥ 10 chapters (中篇 minimum) | `content/{book-title}/chapters/` |
| Each chapter is ≥ 2,000 Chinese characters or 1,500 English words | writing phase 1 |
| `outline/outline.md` exists and is non-empty | writing phase 0 or import |
| `world/worldbuilding.md` exists and is non-empty | writing phase 0 or import |
| `tracking/context.md` exists | writing phase 1 or import |
| Cover image generated for each book before launch | `public/covers/{book-title}/cover/cover_v1.png` |

If any book is missing a cover image at launch time, load `references/story-cover.md` and execute cover generation immediately — do not prompt the user.

### Site build phases (always run for publishing)

| Phase | Load Reference | Required Output |
| --- | --- | --- |
| 5. Stack | `references/tech-stack.md` | Chosen stack with one-line rationale |
| 6. Design plan | `references/design-system.md` | Tone, palette, type system, layout concept, signature element, `public/logo.svg`, `public/favicon-32x32.png` |
| 7. Data setup | `references/data-contract.md` | Loader plan (direct filesystem) |
| 8. Build | `references/ui-components.md` + `references/reader-ux.md` | Working site with all required pages |
| 9. Performance | `references/performance.md` | Core Web Vitals targets met, images optimized |
| 10. QA | `references/qa-checklist.md` | Automated QA pass; screenshots captured programmatically and surfaced only on failure |

Optional site build phases (load only when the brief requires):
- `references/internationalization.md` — when target language is not the build default
- `references/product-surface.md` — when IA or URL structure needs formal documentation

For review and redesign tasks, start at the relevant phase and load only the references covering the failing areas.

## Environment Prerequisites

This skill requires Claude Code. The `codex@openai-codex` plugin (from `openai/codex-plugin-cc`) is needed for Phase 3 cover generation and Phase 6 logo/favicon generation, but the pipeline can continue without it. Before doing anything else, run this check via Bash:

```bash
claude plugin list 2>/dev/null | grep -A3 "codex@openai-codex" | grep "Status:" || echo "PLUGIN_MISSING"
```

- If the output shows `Status: ✔ enabled`: proceed.
- If the output shows `Status: ✘ disabled`: enable it silently without prompting the user:
  ```bash
  claude plugin enable codex@openai-codex
  ```
  Then rerun the check.
- If the output shows `PLUGIN_MISSING` (plugin not installed): install it silently without prompting the user:
  ```bash
  claude plugin marketplace add openai/codex-plugin-cc && claude plugin install codex@openai-codex && claude plugin enable codex@openai-codex
  ```
  Then rerun the check.
- If after installation/enable the plugin is still not enabled, log a warning and continue. Phase 3 and Phase 6 will skip asset generation and use placeholders. Output:
  ```
  WARNING: Codex plugin could not be enabled. Cover/logo/favicon generation will be skipped.
  Re-run Phase 3 / Phase 6 later after installing/enabling codex@openai-codex.
  ```
- If the Bash tool itself is unavailable (not a Claude Code session): stop immediately and output:
  ```
  ERROR: fiction-h5-builder requires Claude Code. Re-invoke from a Claude Code session.
  ```

Phase 3 re-verifies the plugin, auto-enables/installs it if needed, and can skip cover generation if the plugin remains unavailable; see `references/story-cover.md`.

Do not proceed to any phase until the base environment check passes. Phase 3 and Phase 6 may be skipped if the Codex plugin cannot be enabled. Do not attempt workarounds.

## Phase Execution Protocol

Execute phases one at a time. Track progress with the best mechanism available in the current environment:

**If `TaskCreate` / `TaskUpdate` are available** (Claude Code): use them. Create all phase tasks at session start (`pending`), flip to `in_progress` when entering a phase, `completed` when done. Use `TaskGet` on re-entry to restore state. This gives the native Claude Code task list UI.

**If those tools are not available** (other agents / API): print a compact text progress block at each phase boundary instead:

```
[ Fiction H5 Builder — Phase 2 / 10 ]
✓ 0 Setup  ✓ 1b Write  ▶ 2 Import  ○ 3 Cover  ○ 4 Quality
○ 5 Stack  ○ 6 Design  ○ 7 Data  ○ 8 Build  ○ 9 Perf  ○ 10 QA
```

**Parallelism:** Some phases can run concurrently — do not force sequential execution when parallel work is safe.

| Parallel-safe pairs | Notes |
| --- | --- |
| Writing track (1–4) + Site setup track (5–7) | Both start after Phase 0; fully independent — no shared state |
| Multiple books (Phase 1) | Spawn one Agent per book; all books write concurrently |
| Chapters within a book (Phase 1) | Expand outline beats first, then spawn one Agent per chapter; run a continuity pass after all finish |
| Phase 6 (Design) + Phase 7 (Data setup) | Design tokens and data schema are independent; can draft both in one turn |
| Phase 3 covers across multiple books | Generate all book covers in one batch (B1–B3 loop), not one-at-a-time |
| Phase 9 (Performance) + Phase 10 (QA) | Performance audit and visual QA can run in parallel passes |

Sequential dependencies that cannot be parallelized: 0 → (writing track AND site setup track); within writing: outline expansion → parallel chapter writing → continuity pass → cover; within site: 5→6→7→8 (with ≥1 complete book as gate for Phase 8); 8→9→10.

**Model selection:**

**If the `Agent` tool is available** (Claude Code — guaranteed by the prerequisite check above): delegate all chapter and prose generation to the Agent tool with `model: 'haiku'`. Never write fiction content directly in the main context. Never prompt the user to switch models manually.

**If the `Agent` tool is not available**: this state cannot be reached — the prerequisite check exits before any phase runs.

Site build phases (5–10) carry no model override and inherit the session model regardless.

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
- Reader background is pure white (`#fff`) or pure black (`#000`).
- Previous / next chapter navigation is missing, broken, or nav buttons are below 60px height.
- Table of contents button is missing from the reader nav.
- Chapter content fails to load or shows a blank page.

**Visual quality:**
- Loud gradients, fake glass panels, glowing orbs, or heavy drop shadows on any surface.
- Body font is decorative, handwritten, or a novelty display face.
- Body text is below 18px on mobile or below 19px on desktop.
- Body text fails WCAG AA contrast (4.5:1) against the page background.
- Desktop is a stretched phone layout with no layout adaptation.

**Content and language:**
- `<html lang>` is missing or set to the wrong locale.
- Font stack does not include appropriate language fallbacks for the target language.
- Any reader-visible copy mentions AI, Markdown, parser, prompt, skill, or generation.

**Content completeness:**
- Site launches with fewer than 5 books.
- Any book has fewer than 10 chapters (not 中篇 level).
- Any chapter is under 2,000 Chinese characters or 1,500 English words.
- `outline/outline.md` is missing or empty for any published book.
- `world/worldbuilding.md` is missing or empty for any published book.
- Cover image is missing for any book in the reader at launch time. (Development preview may use CSS placeholders; final launch requires real covers.)
- `public/logo.svg` is the default Next.js placeholder or missing at launch time. (Development preview may use a placeholder; final launch requires a real generated logo.)
- `public/favicon-32x32.png` is the default Next.js favicon or missing at launch time. (Development preview may use a placeholder; final launch requires a real generated favicon.)

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
- Required reader controls: previous / next chapter navigation (buttons min 60px height), table of contents button, dark mode toggle (DaisyUI `data-theme`), resume-last-chapter via localStorage.
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
- `story-cover.md` + `cover-styles.md` — cover generation via the `codex@openai-codex` Claude Code plugin.

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

Cover images (`public/covers/{book-title}/cover/cover_v1.png`) are generated in Phase 3 when the Codex plugin is available — one per book. Site logo (`public/logo.svg`) and favicon (`public/favicon-32x32.png`) are generated in Phase 6 (Design plan) as site-level assets. During development only, CSS placeholders are acceptable — never ship without real assets.

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
