# Design System Planning

Use this reference before building any new UI or major redesign. Do the design plan first — do not skip to code.

## Design Plan

Before writing any markup, decide the following and record them as a brief `outputs/<site-slug>/design-brief.md`:

1. **Purpose** — What reading job does this site solve? (Serialized fiction discovery, CJK light novel reading, English short story collection, Spanish romance serial, etc.)
2. **Audience** — Casual web novel reader, serialized fiction subscriber, literary reader, language-learner, manga/manhwa crossover reader, etc.
3. **Tone** — Choose exactly one:
   - Refined editorial (calm, typographic, restrained)
   - Quiet literary (warm paper, minimal chrome)
   - Premium serialized fiction (strong cover grid, genre-forward)
   - Modern manga / light-novel adjacent (structured, character-art-friendly)
   - Warm personal library (bookshelf feel, cozy)
4. **Palette** — Define 4–6 named CSS custom property roles (not just "nice colors"):
   - `--base`: page background
   - `--ink`: body text
   - `--muted`: secondary text and borders
   - `--accent`: single genre-aware highlight
   - `--night-base`: dark theme background
   - `--night-ink`: dark theme body text
5. **Type system** — Define three roles:
   - Display: for site title, book titles, chapter headings
   - Reader body: for prose — must be a highly readable serif or CJK system stack
   - UI/utility: for navigation, controls, metadata — system sans-serif
6. **Layout concept** — How do discovery, book detail, and reader layouts differ between H5 and desktop?
7. **Signature element** — One memorable detail connected to reading, books, chapters, or genre (see below).

## Signature Element Rules

Spend all the distinctiveness in one place. A good signature element improves reader orientation, mood, or recognition — not decoration.

Examples that work:
- A chapter progress rail styled as a bookmark ribbon or page-edge marker.
- Book cover cards with a subtle spine shadow and color-coded genre accent strip.
- A reader settings panel that slides in as a "reading lamp" side drawer.
- A "continue reading" card with a short chapter excerpt and a chapter-number marker.
- Desktop reader with a restrained antiquarian left margin rule (visual only, no interaction needed).
- Genre-specific cover accent systems (warm amber for romance, slate for thriller, moss for literary fiction).

Examples that fail:
- A decorative particle animation anywhere on the reader page.
- A split-panel hero with a large illustration above the book catalog.
- A typewriter animation on chapter titles.
- A floating "AI" badge or creation-process callout anywhere.
- Multiple signature elements. One is the rule.

If the signature element does not improve orientation or reading mood, remove it.

## Genre-Specific Visual Direction

| Genre | Tone | Palette cue | Typography cue | Avoid |
| --- | --- | --- | --- | --- |
| Literary fiction | Quiet editorial | Warm paper, slate ink | Old-style serif display, comfortable body serif | Flashy gradients, web-novel genre tropes |
| Serialized web novel | Modern, energetic | Strong cover grid, one saturated accent | Clean sans display, readable body serif | Literary pretension, tiny cover cards |
| Light novel / manga | Character-forward | White or light base, single accent | Bold gothic display, system CJK body | Heavy drop shadows, overly dark backgrounds |
| Romance | Warm, personal | Dusty rose, warm sand, or mauve accent | Rounded serif or italic display face | Cool/corporate palettes |
| Fantasy / historical | Atmospheric | Warm amber, parchment, or deep navy | Humanist serif display, generous line height | Neon or high-saturation accents |
| Thriller / mystery | Taut, focused | Near-black base, single cold accent | High-contrast sans display, tight body | Warm/cozy palettes |
| Short story collection | Calm editorial | High contrast, minimal or no accent | Strong typographic hierarchy, no cover grid needed | Cover-grid layouts when there are no covers |

## Palette Guidance

Default to calm. The reader page inherits these tokens.

- `--base`: warm off-white (`#f9f6f1`), soft paper (`#faf8f4`), or light neutral (`#f8f8f6`). Never `#ffffff`.
- `--ink`: near-black (`#1a1814`), warm dark (`#1c1916`), or deep slate. Never `#000000`.
- `--muted`: warm gray for metadata, borders, placeholders. WCAG AA compliant against `--base`.
- `--accent`: one restrained color that fits the genre. Used 1–2 times per page. Never used as a background.
- `--night-base`: deep warm neutral (`#141210`) or cool dark (`#121416`). Never `#000000`.
- `--night-ink`: soft off-white (`#e8e4de`) or warm light. Never `#ffffff`.
- Sepia: `--sepia-base: #f2ead8`, `--sepia-ink: #3d3220`.

Avoid:
- Cream + terracotta + giant serif as a default answer for every brief.
- Neon + near-black as a default "dark reading" treatment.
- Multiple accent colors. One accent per palette, used sparingly.
- Any pure `#000` / `#fff` in any theme.

## Typography Guidance

Reader body typography matters more than display typography. Get body right before touching anything else.

- Display type: characterful but not decorative. Use for the site logo, book titles, and section headers only.
- Reader body: highly readable. Prefer a classic text serif (Georgia, Palatino) or a properly hinted hosted serif. For CJK, always use system stacks (see `internationalization.md`).
- UI text: `system-ui` stack for all controls, labels, and navigation. Never use display or body fonts for controls.
- Never apply letter-spacing to body or CJK text. Use it only on uppercase UI labels, sparingly.
- Never use decorative, handwritten, or display fonts for chapter prose.

## Typography Scale

```css
:root {
  /* size */
  --text-xs:   12px;   /* word count, metadata */
  --text-sm:   14px;   /* chapter nav labels, tags */
  --text-base: 17px;   /* reader body default (mobile) */
  --text-lg:   19px;   /* reader body large step */
  --text-xl:   22px;   /* chapter title */
  --text-2xl:  28px;   /* book title on detail page */
  --text-3xl:  36px;   /* site title / display */

  /* line height */
  --leading-tight:  1.4;
  --leading-reader: 1.75;  /* reader body default */
  --leading-loose:  2.0;   /* reader large line height */
  --leading-cjk:    1.9;   /* CJK default */
}
```

## Interface Copy Rules

Copy must feel editorial and reader-side. Never mention the implementation.

| Avoid | Use instead |
| --- | --- |
| "Submit" | "Continue reading" |
| "Content management" | "Chapter list" |
| "Operation successful" | "Added to shelf" |
| "No data" | "No books yet. Add a title to start reading." |
| "AI generated" | (never say this) |
| "Powered by oh-story" | (never say this) |
| "Markdown" | (never say this) |
| "Loading..." | "Loading chapter…" or a skeleton screen |

Empty states must tell the reader what to do next, not just that a data structure is empty.

## Self-Critique Before Build

Before writing any markup, check:

- Would this palette and layout still work on a finance dashboard or SaaS landing page? If yes, it is too generic — revise.
- Is the signature element connected to reading, books, chapters, or genre? If not, revise.
- Does anything on the reader page compete with comfortable prose reading? If yes, remove it.
- Does the desktop layout have its own logic, or is it just wider? If just wider, revise.
- Is the type system derived from the audience and genre, or from a generic design kit? If the latter, revise.

## Self-Critique After Build

After taking screenshots:

- Remove one decorative element that was added.
- Increase body text size or line height before adjusting any decorative details.
- Confirm the reader page is calmer and more focused than the home page.
- Confirm the first visible screen shows a usable reading product, not brand theater.
- Confirm no reader-visible copy mentions AI, tools, or implementation details.
