# Product Surface

## Default Product

Build a reader-facing fiction product. The core job is choosing a work and reading comfortably. Keep the product intentionally small by default.

Do not show creator tooling, AI writing workflows, prompt panels, analysis reports, or "powered by skill" labels unless the user explicitly asks for an author product.

## Required Information Architecture

For a complete lightweight novel H5 template, include:

- Home/work list: site title, short intro if useful, available works, latest update per work.
- Book detail: cover, title, author, tags, status, synopsis, latest chapter, catalog entry, start/continue button.
- Chapter catalog: ordered list, volume grouping when available, locked/free state only if requested.
- Reader: chapter title, content, progress, catalog, previous/next, settings.

Do not include ranking, category, bookshelf, history, search, payment, comments, or account modules unless the user explicitly asks for them.

## Nice-to-Have Modules

- Search.
- Continue reading card.
- Recently updated feed.
- Offline/cache hint for PWA projects.
- Simple language switcher for multilingual sites.

## Content Tone

The site copy should feel editorial and calm. Prefer "Start reading", "Continue reading", "Latest update", "Chapter list", "Reading progress". Avoid over-selling copy such as "AI generated", "one-click creation", or "super explosive traffic".

## Desktop Adaptation

Desktop must not be a stretched phone screen. Use:

- Max-width content shell for the work list and detail pages.
- Grid cards for book lists.
- Reader layout with centered text column and optional side catalog/settings.
- Reader text measure around 62-76 Latin characters per line; for CJK, avoid overly long lines by keeping the reading column narrower.
