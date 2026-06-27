# Mobile UI And Visual Quality

## Aesthetic Direction

Default to refined editorial reading product:

- Calm, low-saturation palette.
- Strong text hierarchy.
- Crisp surfaces with small radii.
- Subtle borders over heavy shadows.
- Book covers clear enough to inspect.
- Sparse but useful metadata.

Before implementation, use `design-system.md` to choose the project-specific tone, palette, type roles, layout concept, and signature element. This file defines the quality floor; `design-system.md` defines the brief-specific point of view.

## Avoid

- Loud purple/red/orange gradients as the main identity.
- Decorative glassmorphism panels.
- Large glowing orbs, blurred blobs, or template SaaS hero patterns.
- Dense ad-like cards.
- Tiny text under 12px for metadata.
- Body fonts that feel playful, handwritten, or display-only.
- Whole-screen marketing hero before the actual reading product.

## Components

Use familiar controls:

- Simple top bar or bottom bar with only necessary reader navigation.
- Work list cards or rows for the home page.
- Chapter list for the detail page or a reader drawer.
- Sliders/steppers for reader size/density.
- Drawer or sheet for chapter catalog/settings on mobile.
- Side panel for catalog/settings on desktop.

## Spacing

- Mobile page padding: 14-18px.
- Cards: radius 6-8px, no nested cards.
- Book grids: 2-3 columns on mobile if cover-first, or a simple vertical list for text-first sites; 4-6 columns on desktop only when there are enough works.
- List rows: enough height for title, metadata, and progress without crowding.

## Imagery

Use real or generated cover-like bitmap imagery when available. If no images are available, create restrained CSS cover placeholders with title, genre, and author. Do not use abstract hero graphics as the main book visual.

## Desktop

Desktop should feel like a reading web app:

- Discovery pages can use a wider grid.
- Reader pages should prioritize text measure over filling width.
- Use optional left chapter nav and right settings panel only if they reduce friction.
