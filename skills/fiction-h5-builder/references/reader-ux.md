# Reader UX

## Reading First Principles

The reader is the product. Optimize for long sessions, low fatigue, and fast return to the current chapter. Every interaction in the reader must serve the reading act or stay out of the way.

**Ease of reading over visual precision.** If a choice makes prose harder to track, it is wrong regardless of how it looks in a screenshot. The chapter page must feel as effortless to read as a well-formatted paperback — generous body size, ample line-height, neutral background, no chrome competing for attention.

## Required Reader Controls

The default reader ships with a focused set of controls. Add font size, density, or reading progress indicator only when the brief explicitly asks for them. Table of contents is always required.

| Control | Requirement | Notes |
| --- | --- | --- |
| Previous / next chapter | Required | Always visible; must work at end of chapter content; see **Navigation Button Size** below |
| Table of contents | Required | "Table of contents" button in reader nav; links to or opens the chapter catalog |
| Book cover header | Required | Small cover thumbnail in the reader header above the chapter title; omit if no cover image exists |
| End-of-chapter prompt | Required | Clear "Next chapter" CTA at bottom of content |
| Keyboard prev/next | Required on desktop | `←` / `→` arrow keys |
| Error / empty states | Required | See Error States section |
| Dark mode toggle | Required | DaisyUI `data-theme` swap; persists in `localStorage` |
| Resume last chapter | Required | Store last visited chapter slug in `localStorage`; restore on home/detail page |
| Tap zones (mobile) | Recommended | Left/right 15% tap zones for prev/next |

## Navigation Button Size

Prev/next buttons must be large and easy to hit — they are the primary action on the page. Small or cramped nav buttons are a quality gate failure.

- **Minimum height:** 60px on mobile, 64px on desktop.
- **Font size:** 17–19px. Never below 16px.
- **Font weight:** 700–800.
- **Border radius:** 16–18px.
- **Layout:** 2-column grid — TOC/Prev on the left, Next on the right. Next gets the wider column and the primary color fill. Prev/TOC gets a white or neutral fill with a clear border.
- On mobile at ≤ 640px: maintain at least 60px height; reduce font to 17px if needed.

Example layout (end of chapter):

```
[ Table of contents ]  [ Next chapter → ]
   (neutral, outlined)    (primary, filled, wider)
```

When both Prev and Next exist:

```
[ ← Prev ]  [ Table of contents ]  [ Next → ]
```

## Optional Enhancements

Add only when explicitly requested:

| Control | Notes |
| --- | --- |
| Font size | ≥ 4 steps (e.g. 14/16/18/20px) |
| Line height / density | ≥ 2 options: "Compact" and "Comfortable" |
| Theme | Light / Sepia / Dark via DaisyUI themes |
| Reading progress | Visible but not distracting |
| Resume scroll position | Per-chapter scroll restoration |
| Immersive mode | Chrome-hidden reading mode |

## Never Add Without Explicit Request

These features add UI complexity and distract from reading. Omit by default:

- Favorites / bookmarks
- Social sharing buttons
- Comment sections
- User accounts / login
- Bookshelf or reading list management
- Search
- Ranking or recommendation widgets
- Payment or chapter-lock UI

## Default Typography

Use conservative defaults. Readers should not need to adjust settings to find a comfortable starting point.

- **Body font stack (English / Latin):** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`. No external webfont required — the system stack renders crisply at any DPI and loads instantly.
- **CJK body font stack:** `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif`.
- Latin body size: 18–19px on mobile, 19–20px on desktop.
- CJK body size: 17–20px on mobile, 18–21px on desktop.
- Latin line-height: 1.9–2.1 (generous — easier to track across the line).
- Japanese/Korean line-height: 1.85–2.0.
- Paragraph spacing: `1em` top margin between paragraphs. Enough to separate beats without the double-spaced blog-style gap.
- Max line length: 32–38em for Latin prose; narrower for CJK (28–34em) to avoid very long line scanning.

## Layout

- Mobile horizontal padding: 18–22px.
- Sticky controls must not cover body text. Use a compact bottom bar with safe-area insets (`env(safe-area-inset-bottom)`).
- Chapter title: visible at the top but not oversized. `--text-xl` or smaller.
- Reader background: off-white, paper tone, or deep neutral dark. Never pure `#fff` or `#000` in any theme.
- Do not use full-bleed background images behind prose.

## Immersive Mode

If implementing an immersive (chrome-hidden) reading mode:
- Trigger: tap the center of the screen, or scroll past a threshold.
- On hide: animate the top bar and bottom bar out smoothly (200ms, `transform: translateY`).
- On show: single tap or scroll-up restores chrome.
- Progress indicator may remain visible in immersive mode as a thin rail, not a full bar.
- Never hide previous/next controls entirely in immersive mode — they must be accessible with a single tap.

## Theme Implementation

Use DaisyUI's `data-theme` attribute on `<html>` to switch themes. The default reader provides **light and dark**. Add **sepia** only when the brief explicitly asks for it.

```js
// tailwind.config.js
plugins: [require('daisyui')],
daisyui: {
  themes: [
    {
      light: {
        'base-100': '#f9f6f1',
        'base-content': '#1a1814',
      },
    },
    {
      dark: {
        'base-100': '#141210',
        'base-content': '#e8e4de',
      },
    },
  ],
}
```

- Theme change must be instant — no transition delay that makes the UI feel unresponsive.
- Theme preference must persist in `localStorage`.
- Respect `prefers-color-scheme: dark` as the initial default if no saved preference exists.

## Font Size Implementation

Use only when the brief explicitly asks for font size control.

```js
const SIZES = [14, 16, 18, 20, 22]; // px
let current = 2; // default index

function applySize(index) {
  document.documentElement.style.setProperty('--reader-size', SIZES[index] + 'px');
  localStorage.setItem('reader-font-size', index);
}
```

- Font size changes must reflow gracefully without layout breakage.
- Line height should scale proportionally with font size.
- Save preference per reader (not per book).

## Scroll and Navigation

- Default: vertical scroll for H5. Horizontal paging is an optional mode, not the default.
- End-of-chapter: show a clear "Next chapter" prompt at the bottom of content — do not rely on navigation bars alone.
- Resume: on entering a chapter, restore scroll position from `localStorage` if available.
- Chapter transitions: prefer client-side navigation for SPA builds; a brief fade (150ms) is acceptable. Do not animate content in on every paragraph.

## Gestures and Tap Zones (Mobile)

- Left-edge tap (15% width): previous chapter.
- Right-edge tap (15% width): next chapter.
- Center tap: toggle chrome visibility (if implementing immersive mode).
- These zones must not conflict with text selection.
- Swipe left/right for chapter navigation is acceptable as an enhancement, not a requirement.

## Keyboard Shortcuts (Desktop)

- `ArrowLeft` / `ArrowRight` or `←` / `→`: previous / next chapter.
- `F` or `Esc`: toggle immersive mode.
- These shortcuts must not conflict with browser defaults.
- Include a one-time tooltip hint for first-time desktop visitors.

## Interaction Rules

- All settings changes (theme, font size, density) apply instantly with no delay when those controls are present.
- Preserve reader preferences in `localStorage` for prototypes; in a server-side user account for real products.
- Preserve reading position in `localStorage` for prototypes; durable backend for real products.
- Reader controls must be reachable with one thumb on mobile.
- Do not require login before basic reading unless the user explicitly asks for a gated product.
- Do not show ads, pop-ups, or banners inside the reader without explicit user request.

## Accessibility

- Use `<button>` for all interactive controls, not clickable `<div>` or `<span>`.
- Maintain WCAG AA contrast (4.5:1) for body text and controls in all enabled themes.
- Ensure visible `:focus` states on all keyboard-navigable controls.
- Do not disable browser pinch-to-zoom (`user-scalable=no` is forbidden).
- Avoid motion or animations on the reading surface itself. Restrict motion to chrome transitions.
- Use `aria-label` on icon-only controls (prev/next arrows, settings gear).
- Chapter content should be wrapped in `<article>` with an appropriate `aria-label`.

## Empty and Error States

- Chapter not found: "This chapter isn't available yet." with a link back to the catalog.
- Load failure: "Couldn't load this chapter. Try refreshing or check your connection."
- End of book: "You've finished [Book Title]." with a link to the book detail page.
- No chapters yet: "No chapters published yet. Check back soon."

Never show a raw error object or stack trace to the reader.
