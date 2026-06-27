# Internationalization

## Supported Target Languages

Generated sites may target English, Spanish, Japanese, or Korean. The site must be language-aware from the first implementation pass.

## HTML And Metadata

- Set `<html lang="en">`, `es`, `ja`, or `ko` as appropriate.
- Use language-specific strings for navigation and reader controls when the target language is known.
- If content mixes languages, set `lang` on inline spans or sections when practical.
- Keep dates and numbers locale-aware when using JavaScript formatters.

## Font Stacks

Use system-first stacks unless the project has approved local font assets.

English/Spanish:

```css
font-family: ui-serif, Georgia, "Times New Roman", serif;
```

Japanese:

```css
font-family: "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif CJK JP", serif;
```

Korean:

```css
font-family: "Apple SD Gothic Neo", "Noto Serif CJK KR", "Nanum Myeongjo", serif;
```

UI text:

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

## Language-Specific Reading Notes

English:

- Control line length carefully on desktop.
- Hyphenation may help long text: `hyphens: auto` with correct `lang`.

Spanish:

- Expect longer words and labels than English.
- Avoid narrow fixed-width buttons for navigation labels.

Japanese:

- Default to horizontal writing for H5 unless user asks for vertical layout.
- If vertical mode is requested, use `writing-mode: vertical-rl` and `text-orientation: mixed`, and verify on mobile.
- Avoid aggressive letter spacing for normal horizontal body text.

Korean:

- Use generous line height.
- Avoid forced justification that creates uneven spacing.
- Ensure Hangul line breaking and punctuation do not collide with narrow cards.

## Layout Resilience

- Use flexible grids, not fixed pixel widths.
- Let labels wrap.
- Avoid icon-only controls unless labels are available.
- Test with long titles and short CJK titles.
