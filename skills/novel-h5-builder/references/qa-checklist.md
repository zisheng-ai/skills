# QA Checklist

## Build Checks

- Run available build/typecheck/lint commands.
- Ensure routes work without console errors.
- Verify static data loads before adding dynamic features.

## Mobile Screenshots

Check at least:

- 390 x 844 home/bookstore.
- 390 x 844 book detail.
- 390 x 844 reader.
- 430 x 932 reader settings/catalog open.

Look for:

- Text clipping.
- Bottom nav covering content.
- Overcrowded cards.
- Low contrast.
- Controls too small to tap.
- Reader line length and line-height.

## Desktop Screenshots

Check at least:

- 1366 x 900 home/bookstore.
- 1366 x 900 reader.

Look for:

- Phone layout awkwardly stretched.
- Reader column too wide.
- Empty whitespace without purpose.
- Navigation too mobile-specific.

## Multilingual Checks

Use sample titles and labels:

English:
`The Archive Beneath the Rain`

Spanish:
`La ciudad que olvidó sus nombres`

Japanese:
`雨の記録者`

Korean:
`비의 기록자`

Confirm:

- Correct `lang`.
- Labels wrap gracefully.
- Book titles do not overflow cards.
- Reader body uses language-appropriate font fallback.

## Reader Comfort Checks

- Light, sepia, and dark themes are readable.
- Font size changes do not break layout.
- Chapter catalog remains usable.
- Progress is visible but not distracting.
- Previous/next controls are obvious.
