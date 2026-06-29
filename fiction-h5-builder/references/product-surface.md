# Product Surface

## Default Product

Build a reader-facing fiction product. The core job is: find a work, open it, and read comfortably. Keep the product intentionally small by default.

Do not show creator tooling, AI writing workflows, prompt panels, analysis reports, "powered by" labels, or any feature that a reader would not understand or want. These are disqualifying if they appear without an explicit request.

## Required Information Architecture

A complete lightweight fiction H5 template has exactly these pages:

### Home / Work List
- Site title and optional tagline (1 line).
- Book grid or list: cover, title, author, genre tag(s), status badge, latest chapter or update date.
- "Continue reading" card at the top if reading progress exists for any book (nice-to-have but strongly recommended).
- No ranking, trending, categories, or recommendation algorithms by default.

### Book Detail
- Cover image (or CSS placeholder).
- Title, author, genre tags, status (Ongoing / Completed / Hiatus).
- Synopsis (2–5 sentences or a `<details>` expand for longer).
- Stats row: word count, chapter count, last updated.
- Primary action: "Start reading" (first chapter) or "Continue reading" (last read chapter).
- Chapter catalog below the detail — or a scrollable drawer triggered by a button.

### Chapter Catalog
- Ordered list of chapters with chapter number and title.
- Volume / arc group headers when available (bold or uppercase divider label).
- Current chapter highlighted.
- "Locked" state only if user explicitly requests a paywall UI.
- Accessible from the book detail page and from inside the reader.

### Reader
- Chapter title at the top.
- Chapter body prose.
- Progress indicator (scroll rail).
- Navigation: previous chapter, next chapter — accessible at top and bottom, or via tap zones.
- Settings trigger: font size, line height, theme.
- Catalog trigger: slide-in drawer with chapter list.
- End-of-chapter prompt: "Next: [Next Chapter Title]" with a tap/click target.

## URL Structure

```
/                          # home / work list
/book/[slug]               # book detail
/book/[slug]/chapters      # chapter catalog (optional separate page)
/book/[slug]/chapter/[n]  # reader
```

For static builds, use this structure as file paths:
```
index.html
book/[slug]/index.html
book/[slug]/chapter/[n]/index.html
```

Avoid query-string-based routing for primary navigation — it breaks deep-linking and browser history.

## Navigation Patterns

Mobile:
- Top bar: back navigation, current context label. Minimal. No hamburger menu on the reader page.
- Bottom bar on reader: previous chapter / progress label / next chapter.
- Chapter catalog: full-height or half-height bottom sheet, swipe-to-dismiss.
- Reader settings: bottom sheet, swipe-to-dismiss.

Desktop:
- Horizontal nav bar. No bottom bar.
- Reader: optional fixed left sidebar for chapter catalog (visible at ≥ 1024px).
- Reader settings: inline panel or floating popover to the right of the reading column.

Back navigation:
- Reader → Book detail (or catalog).
- Book detail → Home.
- Catalog → Book detail.

## Empty States

| State | Message |
| --- | --- |
| No books on home | "No titles yet. Check back soon." |
| No chapters in a book | "No chapters published yet. Check back soon." |
| Chapter not found | "This chapter isn't available yet." + link to catalog |
| Reading progress cleared | (silent — just show "Start reading") |
| Load error | "Couldn't load this chapter. Try refreshing." |

Empty states must always include a navigation affordance — never a dead end.

## Nice-to-Have Modules

Add these only when the brief asks or when they clearly add reader value:

- Continue reading card (strongly recommended even without explicit request).
- Recently updated feed on the home page.
- Simple language switcher for multilingual sites.
- Search (only if there are more than ~10 books).
- Offline reading hint for PWA builds.

## Out-of-Scope By Default

Do not add any of these unless explicitly requested:

- Ranking, trending, or recommendation systems.
- Category or genre browse pages.
- Bookshelf or reading list management.
- Reading history log.
- Full-text search.
- Comments or social features.
- Payment, subscription, or chapter unlock.
- User accounts or login.
- Author dashboard or writing tools.
- Analytics dashboard.

## Content Tone

Site copy must feel editorial and calm:

- Use: "Start reading", "Continue reading", "Latest update", "Chapter list", "Reading progress", "Completed", "Ongoing", "Hiatus".
- Avoid: "AI generated", "one-click creation", "super explosive", "powered by", any marketing superlatives, any technical implementation terminology.
- Error messages: direct and helpful, not apologetic or technical.

## Desktop Adaptation

Desktop must use a different layout, not a stretched phone screen:

- Home/work list: wider grid (4–6 columns), `max-width: 1200px`, centered with generous padding.
- Book detail: 2-column layout at ≥ 768px — cover + info left, catalog right (or below).
- Reader: centered column, `max-width: 680px` for Latin, `max-width: 600px` for CJK. Side catalog at ≥ 1024px.
- Latin characters per line in the reader: 60–76 characters. Never allow the full viewport width.
- Navigation bar horizontal, not bottom-anchored.
