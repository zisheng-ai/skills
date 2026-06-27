# Performance

## Core Web Vitals Targets

Slow page loads lose readers before the first chapter. Fiction reading sites have no tolerance for sluggish chapter transitions.

| Metric | Target | Notes |
| --- | --- | --- |
| LCP | < 2.5s | First meaningful content on mobile 3G |
| INP | < 200ms | Reader controls (theme switch, font size) must be instant |
| CLS | < 0.1 | Font loading and image loading must not cause visible layout shifts |
| TTFB | < 600ms | For server-rendered routes |

Test on simulated mobile (Moto G4 equivalent) at Slow 3G in Chrome DevTools Lighthouse. Do not test only on fast desktop connections.

## Images

Book covers are the heaviest assets on the home and detail pages.

- Target < 80KB per cover at display size (typically 160×240px on mobile).
- Always set `width` and `height` on `<img>` to prevent CLS during load.
- Use `loading="lazy"` for below-fold covers on the home page.
- Use `fetchpriority="high"` on the first visible cover or the featured book cover.
- Prefer WebP with JPEG fallback via `<picture>`.
- CSS cover placeholders are acceptable when no image is provided. They must use flat color or subtle texture, not heavy gradients or box shadows.

## Fonts

- Prefer system font stacks for body text. Do not load a web font for body reading — system stacks render faster and are often better for CJK.
- If a display font is loaded from a CDN (for titles or the site logo), use `font-display: swap` and add `<link rel="preconnect">` to the font CDN origin.
- Subset any loaded font to the characters actually used (Latin, CJK range as appropriate).
- Never load a CJK web font for body text on mobile. The system stack (Hiragino, Yu Mincho, Noto) is always faster and equally good.
- If a custom reader font is offered as a setting, load it lazily only when the reader selects it.

## Chapter Content Loading

- Never bundle all chapter text into the initial HTML or JS payload.
- For static builds: generate one HTML file or JSON file per chapter and navigate between them.
- For SPA/Next.js: lazy-load chapter content when entering the reader route. Do not prefetch every chapter at book-detail load time.
- Prefetch only the next chapter when the reader reaches 80% of the current chapter.
- Avoid loading the full book catalog on a chapter reader page.

## JavaScript Bundle

- Initial JS on the reader page must be below 200KB gzipped for a prototype.
- Defer any script that is not needed for first paint.
- Do not load analytics, chat widgets, cookie consent banners, or ad scripts on a prototype unless the user explicitly asks.
- Avoid heavy React bundle setups for simple prototypes. Vanilla JS or Preact can deliver the same reading experience at a fraction of the cost.
- If using Next.js, enable `swcMinify` and check the bundle analyzer before delivery.

## CSS

- Inline critical above-the-fold CSS (reader background, font size, body text color).
- Tailwind: configure `content` paths correctly to eliminate unused utility classes.
- Reader theme switching must use CSS custom property value updates, not class-swap-triggered reflows.
- Avoid layout-triggering animations (avoid animating `width`, `height`, `top`, `left`). Use `transform` and `opacity` only.

## Caching

For static builds:
- Recommend `Cache-Control: public, max-age=31536000, immutable` for hashed assets.
- Recommend `Cache-Control: public, max-age=3600` for HTML pages.

## Offline / PWA

Implement a Service Worker only if the user asks for PWA or offline reading support.

When implementing:
- Cache the site shell (HTML, CSS, core JS) on install.
- Cache visited chapters on fetch, using a cache-first strategy for chapter content.
- Cache the home page and last-visited book detail.
- Show an offline fallback page for uncached routes.
- Do not cache chapter content speculatively (pre-cache the whole book) unless the user asks — it wastes mobile data.
