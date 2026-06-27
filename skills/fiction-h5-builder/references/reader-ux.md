# Reader UX

## Reading First Principles

The reader is the product. Optimize for long sessions, low fatigue, and fast return to the current chapter.

## Required Reader Controls

- Font size control with at least 4 steps.
- Line height or density control.
- Theme control: light, sepia/paper, dark/night.
- Chapter catalog/drawer.
- Previous and next chapter.
- Reading progress.
- Resume position.
- Tap/click zones or visible controls for navigation when appropriate.

## Default Typography

Use conservative defaults:

- Latin body size: 17-19px on mobile, 18-20px on desktop.
- CJK body size: 17-20px on mobile, 18-21px on desktop.
- Latin line-height: 1.65-1.85.
- Japanese/Korean line-height: 1.75-2.0.
- Paragraph spacing: enough to separate beats, not blog-like large gaps.

## Layout

- Mobile reader padding: 18-22px horizontal.
- Avoid sticky controls that cover text. Bottom bars should be compact and respect safe-area insets.
- Hide heavy chrome during reading if implementing immersive mode.
- Keep chapter title readable but not oversized.
- Reader background should be off-white, paper, or deep neutral dark; never pure high-contrast white/black by default.

## Interaction

- Settings changes should be instant.
- Preserve reader preferences locally for prototypes.
- Preserve reading progress durably for real apps.
- Reader controls must be reachable with one hand on mobile.
- Do not require login before basic reading unless requested.

## Accessibility

- Maintain contrast for body text and controls.
- Use buttons for controls, not clickable divs.
- Ensure focus states exist.
- Do not disable browser zoom.
- Avoid motion in the reading surface.
