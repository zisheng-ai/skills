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

## What To Avoid

Any of these is a quality gate failure:

- Loud purple/red/orange gradients as the primary identity.
- Decorative glassmorphism or frosted glass panels.
- Large glowing orbs, blurred blobs, or SaaS hero graphic patterns.
- Dense ad-card layouts with 4+ metadata lines per row.
- Body text below 16px.
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
- Height: 48–56px + `env(safe-area-inset-bottom)`.
- Content: prev chapter, progress label, next chapter. Settings or catalog may appear here if not in the top bar.
- Must not cover body text. Use `padding-bottom` on the content area to prevent overlap.

### Book Card (Cover-First Grid)
- Cover aspect ratio: 2:3 (portrait).
- Cover container: radius 4–6px, `overflow: hidden`.
- Title: 2-line clamp beneath the cover. `--text-sm` or `--text-base`.
- Metadata: 1 line below title. Genre tag and status or update date. `--text-xs`, `--muted` color.
- Tap area: entire card including metadata.

### Book Row (Text-First List)
- Row height: auto, minimum 72px.
- Left: small cover thumbnail (48×72px) or genre accent strip (8px wide).
- Right: title, author, 1-line synopsis or latest chapter name, metadata.
- Divider: `1px` `--muted` border between rows, or `8px` gap without border.

### Chapter List Row
- Height: auto, minimum 48px.
- Content: chapter number, title, optional publish date or word count (right-aligned).
- Volume/arc grouping: sticky or bold section header between groups. `--text-sm`, uppercase, `--muted`.
- Locked chapters (if requested): lock icon, grayed text. Do not show paywall UI by default.

### Reader Settings Sheet
- Trigger: settings icon in reader navigation.
- Delivery: bottom sheet on mobile (slides up from bottom, `max-height: 60vh`), side drawer or inline panel on desktop.
- Content order: theme picker, font size stepper, line height picker, optional font family picker.
- Theme picker: 3 clearly labeled swatches (Light / Sepia / Dark). Not just color dots — include a label.
- Font size: stepper with A− / A+ buttons and current size label. Not a slider.
- Dismiss: tap outside, swipe down, or explicit close button.

### Progress Indicator
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

- Implement via CSS custom property swap on `[data-theme="dark"]` (see `reader-ux.md`).
- Check that all three themes pass WCAG AA contrast for body text AND metadata text.
- Cover images should render clearly on both light and dark backgrounds — add a `1px` border or subtle shadow to covers on dark theme if the cover has a white or light edge.
- Borders: swap from `--muted` light to a darker border token in dark mode.

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
