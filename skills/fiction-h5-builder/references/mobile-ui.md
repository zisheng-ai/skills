# Mobile UI And Visual Quality

## Aesthetic Direction

Default to refined editorial reading product. This is the quality floor. `design-system.md` defines the brief-specific point of view on top of this floor.

Non-negotiable aesthetic defaults:
- Calm, low-saturation palette.
- Strong text hierarchy with at least 3 visible levels.
- Crisp surfaces with small, consistent border radii (6–8px).
- Subtle `1px` borders over heavy box shadows.
- Book covers clear enough to read title and art at thumbnail size.
- Sparse but useful metadata: genre tag, status, word count or chapter count, update date.
- **Font:** System sans-serif stack site-wide. No external webfont required. English/Latin: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`. This matches the rendering quality users expect from native mobile apps and loads zero extra bytes.

## What To Avoid

Any of these is a quality gate failure:

- Loud purple/red/orange gradients as the primary identity.
- Decorative glassmorphism or frosted glass panels.
- Large glowing orbs, blurred blobs, or SaaS hero graphic patterns.
- Dense ad-card layouts with 4+ metadata lines per row.
- Body text below 18px on mobile or below 19px on desktop.
- Metadata text below 12px.
- Body fonts that are playful, handwritten, or display-only.
- A full-screen marketing hero section before the actual book list.
- Pure black or pure white as any default background.

## Component Specifications

### Top / Navigation Bar
- Height: 48–56px on mobile.
- Content: site title or logo (left), optional action (right). Never more than one action icon.
- On the reader page: title (truncated), catalog trigger, settings trigger. No branding.
- On scroll down: may compress or hide (if implementing immersive mode).

### Bottom Bar (Mobile Reader)
- Height: 60–64px + `env(safe-area-inset-bottom)`. Large tap targets are non-negotiable — this is the primary interaction on the page.
- Content: prev chapter (or TOC when on chapter 1), table of contents, next chapter. Settings or catalog may appear here if not in the top bar.
- Must not cover body text. Use `padding-bottom` on the content area to prevent overlap.
- See `reader-ux.md` **Navigation Button Size** for full button spec.

### Book Card (Cover-First Feed — Mobile Default)

Mobile book lists default to a single-column feed, not a grid. The card is the page's primary visual unit; get it right.

**Cover:**
- Aspect ratio: `3/4` (portrait book cover). Do not use landscape or square.
- Fills full card width. Top corners match card radius (16px). Bottom of image: no radius — the text area sits flush below.
- Genre badge: absolute-positioned at top-right of the cover, `background: rgba(0,0,0,0.55)`, `backdrop-filter: blur(4px)`, white text, `border-radius: 6px`, `font-size: 11px`, `font-weight: 700`, `padding: 3px 9px`. Shows the genre name only (e.g. "Romance", "Thriller").

**Card container:**
- `background: var(--surface)` (white or near-white)
- `border-radius: 16px`
- `box-shadow: 0 2px 16px rgba(0,0,0,0.07)`
- Card gap in the feed: `16px`

**Text area below the cover:**
- Padding: `14px 16px 18px`
- Title: `font-size: 18–20px`, `font-weight: 700`, `line-height: 1.28`, 2-line clamp, `letter-spacing: -0.01em`
- Metadata (second line): `font-size: 13px`, `--muted` color. Shows chapter count + status — e.g., "24 Chapters · Ongoing". **Never show the raw domain URL** as metadata.
- Tap area: entire card.

**Quality bar:** A finished book card should look like it belongs in a native app — not a WordPress blog post list. The genre badge and proper metadata line are non-negotiable.

### Book Row (Text-First List)
- Row height: auto, minimum 72px.
- Left: small cover thumbnail (48×72px) or genre accent strip (8px wide).
- Right: title, author, 1-line synopsis or latest chapter name, metadata.
- Divider: `1px` `--muted` border between rows, or `8px` gap without border.

### Book Detail Hero

The detail page hero is the first impression. It sets the genre mood and drives the reader toward chapter 1. Flat cover-on-white is not acceptable — it reads like a blog post, not a reading product.

**Default treatment — Atmospheric (recommended for web novel, romance, thriller):**

The cover image serves double duty: a blurred, darkened version fills the full-width hero zone as a background atmosphere; the sharp cover floats centered on top.

```
┌─────────────────────────────────────────────┐   ← hero zone (100vw)
│  [blurred + darkened cover, scale(1.08)]    │   background layer
│         ┌─────────────────┐                  │
│         │  crisp cover    │  ← centered     │
│         │  max-w: 200px   │    float on top  │
│         │  aspect 2:3     │                  │
│         │  radius: 18px   │                  │
│         │  shadow heavy   │                  │
│         └─────────────────┘                  │
└─────────────────────────────────────────────┘
           Genre pill  ←  below the zone
           Big Title
           Author / N Chapters
           [Start Reading →]  ←  accent CTA
```

Implementation:
- Hero zone: `position: relative; overflow: hidden`
- Background image layer: same `<img>` src as the cover, `position: absolute; inset: -5%; width: 110%; height: 110%; object-fit: cover; filter: blur(40px) brightness(0.45) saturate(1.4)`
- Cover float: `position: relative; z-index: 1; max-width: 200px; aspect-ratio: 2/3; border-radius: 18px; box-shadow: 0 24px 64px rgba(0,0,0,0.55); margin: 32px auto 28px`
- Hero zone padding bottom: `28px`
- Text below the hero zone sits on the normal page background (not on the dark zone)

**Fallback treatment — Editorial (use when no cover image exists, or for literary fiction):**
- Plain page background
- Centered cover at `max-width: 260px`, `aspect-ratio: 2/3`, `border-radius: 16px`, `box-shadow: 0 8px 32px rgba(0,0,0,0.12)`
- Same text hierarchy below

**Text below the hero (both treatments):**
- Genre pill: `background: var(--accent-10)` (10% opacity accent), `color: var(--accent)`, `border-radius: 999px`, `font-size: 13px`, `font-weight: 700`, `padding: 4px 14px`
- Title: `font-size: clamp(26px, 6vw, 44px)`, `font-weight: 800`, `letter-spacing: -0.03em`, `line-height: 1.08`
- Author + chapter count: `font-size: 15px`, `--muted`, e.g., "By Jane Foster · 24 Chapters" — **never the raw domain URL**
- Synopsis: `font-size: 16px`, `line-height: 1.8`, max 4 lines with "Read more" toggle
- CTA button: "Start Reading →", `background: var(--accent)`, `color: #fff`, full-width on mobile, `min-height: 56px`, `border-radius: 16px`, `font-weight: 800`, `font-size: 17px`

**Quality bar:** The detail page must look dramatically better than a WordPress novel post. The atmospheric blurred-background hero is the minimum standard for web novel builds. Literary or short fiction may use the editorial treatment if it fits the genre tone.

### Chapter List Row
- Height: auto, minimum 48px.
- Content: chapter number, title, optional publish date or word count (right-aligned).
- Volume/arc grouping: sticky or bold section header between groups. `--text-sm`, uppercase, `--muted`.
- Locked chapters (if requested): lock icon, grayed text. Do not show paywall UI by default.

### Reader Settings Sheet

Add only when the brief explicitly asks for font size, line height, or font family controls.

- Trigger: settings icon in reader navigation.
- Delivery: bottom sheet on mobile (slides up from bottom, `max-height: 60vh`), side drawer or inline panel on desktop.
- Content order: theme picker, font size stepper, line height picker, optional font family picker.
- Theme picker: clearly labeled swatches (Light / Dark by default; Light / Sepia / Dark if sepia is enabled). Not just color dots — include a label.
- Font size: stepper with A− / A+ buttons and current size label. Not a slider.
- Dismiss: tap outside, swipe down, or explicit close button.

### Progress Indicator

Add only when the brief explicitly asks for it.

- Style: thin rail at the top or bottom of the reader viewport. 2–3px height. `--accent` color or `--muted`.
- Update: on scroll, tied to scroll percentage within the chapter.
- No numeric percentage label by default — the rail position is sufficient for reading.

## Spacing

- Mobile page padding: 14–18px horizontal for discovery pages.
- Reader horizontal padding: 18–22px (see `reader-ux.md`).
- Card gap: 12–16px in a grid, 0 or 1px divider in a list.
- Card radius: 6–8px. Consistent across the site.
- No nested cards. A card inside a card creates visual noise.
- Book grids: 2 columns on mobile for cover-first layouts; single column list for text-first layouts. 4–6 columns on desktop only when there are enough works to fill the grid.

## Imagery

- Use real or plausible cover-like imagery when available.
- If no cover image is provided, generate a CSS placeholder: flat background using `--accent` or a genre-specific swatch, with the book title and author in white text. No complex gradients.
- Do not use abstract hero graphics or AI-generated illustrations as the primary book visual unless the brief explicitly asks.
- Always constrain image display with explicit width/height to prevent layout shift.

## Dark Mode

- Implement via DaisyUI `data-theme` on `<html>` (see `reader-ux.md`).
- Check that all enabled themes pass WCAG AA contrast for body text AND metadata text.
- Cover images should render clearly on both light and dark backgrounds — add a `1px` border or subtle shadow to covers on dark theme if the cover has a white or light edge.

## Animation and Transition

- Use `transition: opacity 150ms, transform 150ms` for chrome show/hide only.
- Do not animate content or cards on scroll-into-view.
- Theme switching: instant, no crossfade.
- Font size change: instant.
- Chapter navigation: a brief `opacity` fade (100–150ms) between chapters is acceptable.
- No `transition` on `color` or `background-color` during theme switch — it creates a slow burn that feels like a bug.

## Safe Area and Notch Handling

```css
.reader-content {
  padding-bottom: calc(56px + env(safe-area-inset-bottom));
}
.bottom-bar {
  padding-bottom: env(safe-area-inset-bottom);
}
```

Always account for iPhone notch and home-indicator clearance on iOS. Test at 390×844 (iPhone 14) and 393×852 (iPhone 15).

## Desktop Adaptation

Desktop must feel like a different layout, not a stretched phone:

- Discovery pages: wider grid (4–6 columns), `max-width: 1200px`, centered.
- Book detail: 2-column layout (cover + metadata left, catalog right) at ≥ 768px.
- Reader: centered text column, `max-width: 680px` for Latin prose, `max-width: 600px` for CJK. Optional left chapter catalog sidebar at ≥ 1024px.
- Navigation: horizontal nav bar replaces mobile bottom bar. Side panel for settings instead of bottom sheet.
- Mouse hover states must exist on all interactive elements.
- Cursor: `pointer` on all clickable elements.
