# QA Checklist

Run this checklist before any final delivery. Do not skip sections for "simple" builds — each section catches a different class of failure.

## Pre-Build Gate

Run these checks before writing any site code. If any fails, complete the writing phase first — do not proceed.

- [ ] `content/` has ≥ 5 book directories (initial site launch).
- [ ] Each book has ≥ 10 chapter files in `content/{book-title}/chapters/` (中篇 minimum).
- [ ] Each chapter is ≥ 2,000 Chinese characters or 1,500 English words — no stub content.
- [ ] `outline/outline.md` exists and contains a real arc outline (not empty or stub-only).
- [ ] `world/worldbuilding.md` exists and describes the world, genre, and tone.
- [ ] `tracking/context.md` exists and reflects the last written chapter.
- [ ] Cover image generated for each book: `public/covers/{book-title}/cover/cover_v1.png`.
- [ ] Site logo generated: `public/logo.svg`.
- [ ] Favicon generated: `public/favicon-32x32.png`.

## Build and Technical Checks

- [ ] Build completes without errors (`npm run build`, `yarn build`, or equivalent).
- [ ] TypeScript passes with no errors (`tsc --noEmit`) if the project uses TypeScript.
- [ ] Lint passes with no errors.
- [ ] All routes respond without console errors on load.
- [ ] All required pages exist: home/work list, book detail, reader.
- [ ] Navigation between pages works in both directions (home → book → chapter → back).
- [ ] Static data loads before any dynamic features are tested.
- [ ] No `console.error` output in normal use.

## Mobile Screenshots

Capture at minimum:

| Viewport | Page |
| --- | --- |
| 390 × 844 | Home / work list |
| 390 × 844 | Book detail |
| 390 × 844 | Book detail (scrolled to chapter list) |
| 390 × 844 | Reader (default theme, default font size) |
| 390 × 844 | Reader settings sheet open |
| 430 × 932 | Reader (large screen mobile) |
| 375 × 667 | Reader (small screen — iPhone SE) |

Inspect each screenshot for:

- [ ] Text clipping or overflow anywhere.
- [ ] Bottom navigation bar covering body text.
- [ ] Overcrowded or illegible book cards.
- [ ] Low contrast text (body, metadata, labels).
- [ ] Controls too small to tap (minimum 44×44px touch target).
- [ ] Reader body line length comfortable for reading (not too wide, not too narrow).
- [ ] Reader line height comfortable (not compressed, not double-spaced).
- [ ] Safe-area insets respected at the bottom.
- [ ] Cover images load and display correctly.

## Desktop Screenshots

Capture at minimum:

| Viewport | Page |
| --- | --- |
| 1366 × 900 | Home / work list |
| 1366 × 900 | Book detail |
| 1366 × 900 | Reader |
| 1440 × 900 | Reader (wide screen) |

Inspect each screenshot for:

- [ ] Not a stretched phone layout. Desktop has its own grid/column logic.
- [ ] Reader column is not too wide. Max ~680px for Latin, ~600px for CJK.
- [ ] Whitespace is purposeful, not just leftover gaps from mobile layout.
- [ ] Navigation is horizontal, not a bottom bar.
- [ ] Hover states visible on interactive elements.
- [ ] Side catalog or settings panel renders correctly if implemented.

## Theme Checks

Check all enabled themes (Light and Dark are required; Sepia is optional and only tested if implemented).

- [ ] Light and Dark themes pass WCAG AA (4.5:1) contrast for body text.
- [ ] Light and Dark themes pass WCAG AA (4.5:1) contrast for metadata text (`--muted` on `--base`).
- [ ] If Sepia is implemented, it passes WCAG AA for body and metadata text.
- [ ] No pure `#fff` or `#000` background in any default theme.
- [ ] Theme switching is instant with no transition delay.
- [ ] Saved theme preference persists after page reload.
- [ ] Cover images are legible in dark theme (add a subtle border if the cover has a light edge).

## Reader Controls

### Required (always check)

- [ ] Previous chapter link works at the start of a chapter.
- [ ] Next chapter link works at the end of a chapter (and via the end-of-chapter prompt).
- [ ] Dark mode toggle switches between Light and Dark themes and persists.
- [ ] Reading position is saved and restored on return to the same chapter.

### Optional (check only if implemented)

- [ ] Font size: 4+ steps work without breaking layout.
- [ ] Line height: options work and persist.
- [ ] Sepia theme: works and persists.
- [ ] Chapter catalog drawer opens and closes, lists all chapters, and navigates correctly.
- [ ] Progress indicator updates on scroll.

## Multilingual Checks

Test with sample titles and labels in each target language.

| Language | Sample title |
| --- | --- |
| English | `The Archive Beneath the Rain` |
| Spanish | `La ciudad que olvidó sus nombres` |
| Japanese | `雨の記録者` |
| Korean | `비의 기록자` |

For each language used:
- [ ] `<html lang="xx">` is set correctly.
- [ ] Book title does not overflow the card in the work list.
- [ ] All navigation labels display correctly without clipping.
- [ ] Reader body uses the correct system font stack for the language.
- [ ] No garbled or missing CJK characters.
- [ ] Line breaking is correct (no orphaned punctuation, no mid-word breaks in CJK).

## Accessibility Checks

- [ ] All interactive controls use `<button>` or `<a>`, not `<div>` or `<span>`.
- [ ] All icon-only buttons have an `aria-label`.
- [ ] Focus outlines are visible on all keyboard-navigable elements.
- [ ] Page navigation works with keyboard (Tab, Enter, Arrow keys).
- [ ] Browser pinch-to-zoom is not disabled (`user-scalable=no` must not be present).
- [ ] No motion in the reading surface (no scroll-triggered animations on content).

## Content and Copy Checks

- [ ] No lorem ipsum anywhere.
- [ ] No placeholder text ("Coming soon", "TODO", "[BOOK TITLE]") on any reader-visible page.
- [ ] Site has a real generated logo (`public/logo.svg`) — not placeholder text or default Next.js icon.
- [ ] Favicon is a real generated asset (`public/favicon-32x32.png`) — not the default Next.js favicon.
- [ ] Favicon wired up in `layout.tsx` via Next.js `metadata.icons`.
- [ ] No reader-visible copy mentions AI, Markdown, parser, prompt, or skill.
- [ ] All empty states show a helpful message and a navigation affordance.
- [ ] End-of-chapter state shows "Next: [Chapter Title]" and navigates correctly.
- [ ] End-of-book state shows a completion message and links back to the book detail.

## Performance Spot Check

- [ ] Initial page load on simulated Slow 3G in Chrome DevTools completes without blocking the first content paint for more than 3 seconds.
- [ ] No uncompressed images over 200KB loaded on the home page.
- [ ] Initial JS bundle is below 200KB gzipped (check in Network tab).
- [ ] No external font CDN requests on the reader page unless explicitly required.
