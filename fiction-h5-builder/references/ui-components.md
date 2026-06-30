# UI And Visual Quality (Mobile-First Responsive)

**Mobile-first means responsive — not mobile-only.** Write styles for mobile first, then layer in `min-width` breakpoints to enhance the layout for tablet and desktop. Every component spec in this file covers all three breakpoints. Desktop must have a distinct, purposeful layout — not a stretched phone screen.

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

**ALL same-origin navigation — MUST use `window.location.href`, never `<Link>` or plain `<a href>`:**

Next.js App Router intercepts ALL same-origin `<a>` clicks after hydration (including plain `<a href>`, not just `<Link>`) and performs soft SPA navigation. Soft navigation does NOT reload the page, so the browser shows no progress bar, GPT/AdSense scripts don't re-run, and ads don't fill. **Only `window.location.href` bypasses the router interception and guarantees a true page reload with the blue browser progress bar.**

This applies to every navigation between pages:
- Bottom bar "Next →" and "Table of contents" buttons
- Book detail "Start reading" CTA and "Continue from Chapter X" (ResumeReading)
- Chapter list items on the book detail page
- TOCDrawer chapter items
- BookCard (→ book detail page)
- Home page featured "Read now" CTA
- Inline "Next chapter →" and "Back to book page →" in chapter body

**Pattern for `'use client'` components** — add `onClick` directly:

```tsx
<a
  href={`/book/${bookSlug}/chapter/${nextChapter}`}
  onClick={(e) => { e.preventDefault(); window.location.href = `/book/${bookSlug}/chapter/${nextChapter}` }}
  className={...}
>
  Next →
</a>
```

**Pattern for server components** — use the `HardLink` client component (server components cannot have `onClick`):

```tsx
// src/components/HardLink.tsx
'use client'
import type { CSSProperties, ReactNode } from 'react'
export default function HardLink({ href, className, style, children }: {
  href: string; className?: string; style?: CSSProperties; children: ReactNode
}) {
  return (
    <a href={href} className={className} style={style}
      onClick={(e) => { e.preventDefault(); window.location.href = href }}>
      {children}
    </a>
  )
}

// Usage in server components (page.tsx):
import HardLink from '@/components/HardLink'
<HardLink href={`/book/${slug}/chapter/1`} className="...">Start reading</HardLink>
<HardLink href={`/book/${slug}/chapter/${ch.order}`} className="...">Ch. {ch.order}</HardLink>
```

**The ONLY acceptable use of `<Link>`** is the home logo (`<Link href="/">`). Everything else uses `HardLink` or `<a>` + inline `onClick → window.location.href`.

**BookCard** is a `'use client'` component (needs `useState` for image error fallback), so add `onClick` inline — no need for `HardLink`:

```tsx
// BookCard.tsx — 'use client'
<a
  href={`/book/${slug}`}
  className="group block"
  onClick={(e) => { e.preventDefault(); window.location.href = `/book/${slug}` }}
>
  {/* cover + metadata */}
</a>
```

**ResumeReading** is also `'use client'` — same pattern:
```tsx
<a
  href={`/book/${bookSlug}/chapter/${chapter}`}
  className="..."
  onClick={(e) => { e.preventDefault(); window.location.href = `/book/${bookSlug}/chapter/${chapter}` }}
>
  Continue from Chapter {chapter}
</a>
```

### Book Card (Cover-First Responsive Grid)

The book list uses a responsive grid. The card is the page's primary visual unit; get it right.

**Grid columns:**
- Mobile (< 640px): 1 column
- Tablet (≥ 640px): 2 columns
- Desktop (≥ 1024px): 3 columns, or `repeat(auto-fill, minmax(280px, 1fr))`
- Column gap: 20–24px; row gap: 24–32px

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

**Alternative treatment — Cinematic (use for dark romance, thriller, fantasy):**

Cover image fills the full hero zone unblurred. A dark gradient overlay (bottom 60%) lets text sit directly on the image. Genre pill, title, and CTA are inside the hero zone, not below it.

```
┌─────────────────────────────────────────────┐   ← hero zone (100vw, min-height: 420px)
│  [cover image, object-fit: cover]            │   full-bleed, no blur
│                                              │
│  ░░░░░░░░ dark gradient overlay ░░░░░░░░░░  │   bottom 60%, rgba(0,0,0,0–0.82)
│  Genre pill                                  │
│  Big Title                                   │
│  Author / N Chapters                         │
│  [Start Reading →]                           │
└─────────────────────────────────────────────┘
```

Implementation:
- Hero zone: `position: relative; overflow: hidden; min-height: 420px`
- Background: `<img>` with `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top`
- Gradient overlay: `position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.82) 100%)`
- Text container: `position: relative; z-index: 1; padding: 200px 20px 32px` (pushes text to bottom of zone)
- All text inside zone: white (`#fff`), no need for accent color genre pill — use `rgba(255,255,255,0.15)` backdrop pill instead
- No text below the zone — CTA button is inside

**Third treatment — Gradient wash (use for contemporary romance, sports, billionaire):**

A soft color gradient derived from the book's brand color washes the hero background. The cover floats centered on top. Clean, vibrant, works well in light mode.

```
┌─────────────────────────────────────────────┐   ← hero zone (100vw)
│  [brand color gradient, 160deg, 33% opacity]│   background wash
│         ┌─────────────────┐                  │
│         │  crisp cover    │  ← centered     │
│         │  max-w: 208px   │    float on top  │
│         │  aspect 2:3     │                  │
│         │  radius: 16px   │                  │
│         │  shadow-2xl     │                  │
│         └─────────────────┘                  │
│  Genre pill  (centered below cover)          │
│  Big Title                                   │
│  Author                                      │
│  [Start Reading →]                           │
└─────────────────────────────────────────────┘
```

Implementation:
- Hero zone: `py-14 flex flex-col items-center text-center`
- Background: `background: linear-gradient(160deg, {heroColor}33 0%, transparent 70%)`
- Cover: `relative w-40 sm:w-52 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl mb-8`
- `heroColor` is a hex value stored on the book object (e.g. `#7c3aed`). Required when using gradient style; falls back to `var(--color-primary)` if absent.
- Text sits inside the gradient zone (no separate below-fold for the hero metadata)

**Text below the hero (Atmospheric and Gradient wash):**
- Genre pill: `background: var(--accent-10)` (10% opacity accent), `color: var(--accent)`, `border-radius: 999px`, `font-size: 13px`, `font-weight: 700`, `padding: 4px 14px`
- Title: `font-size: clamp(26px, 6vw, 44px)`, `font-weight: 800`, `letter-spacing: -0.03em`, `line-height: 1.08`
- Author + chapter count: `font-size: 15px`, `--muted`, e.g., "By Jane Foster · 24 Chapters" — **never the raw domain URL**
- Synopsis: `font-size: 16px`, `line-height: 1.8`, max 4 lines with "Read more" toggle
- CTA button: "Start Reading →", `background: var(--accent)`, `color: #fff`, full-width on mobile, `min-height: 56px`, `border-radius: 16px`, `font-weight: 800`, `font-size: 17px`

**Quality bar:** The detail page must look dramatically better than a WordPress novel post. Pick the treatment by genre signal:
- **Atmospheric** — default for most web novel / romance / thriller
- **Cinematic** — dark romance, dark fantasy, horror, mafia: the unblurred cover creates stronger genre impact
- **Gradient wash** — contemporary romance, sports romance, billionaire, light paranormal: vibrant and clean, works well in light mode with a strong brand color

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
- Book grids: 1 column on mobile (< 640px), 2 columns on tablet (≥ 640px), 3 columns on desktop (≥ 1024px). Text-first list layouts use single column at all breakpoints.

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

- Discovery pages: 3-column responsive grid (`repeat(auto-fill, minmax(280px, 1fr))`), `max-width: 1200px`, centered.
- Book detail: 2-column layout (cover + metadata left, catalog right) at ≥ 768px.
- Reader: centered text column, `max-width: 680px` for Latin prose, `max-width: 600px` for CJK. Optional left chapter catalog sidebar at ≥ 1024px.
- Navigation: horizontal nav bar replaces mobile bottom bar. Side panel for settings instead of bottom sheet.
- Mouse hover states must exist on all interactive elements.
- Cursor: `pointer` on all clickable elements.
