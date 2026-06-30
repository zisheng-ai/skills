# Performance

## Core Web Vitals Targets

Slow page loads lose readers before the first chapter. Fiction reading sites have no tolerance for sluggish chapter transitions.

| Metric | Target | Notes |
| --- | --- | --- |
| LCP | < 2.5s | Largest contentful paint at the 75th percentile of real users (Google "good" threshold; > 4s is "poor"). On a fiction site the LCP element is usually the first cover image or the chapter's opening heading. |
| INP | < 200ms | Reader controls (theme switch, font size) must be instant |
| CLS | < 0.1 | Font loading and image loading must not cause visible layout shifts |
| TTFB | < 600ms | For server-rendered routes |

### Verification strategy

**Default (fast, unattended):**
- Build the site (`pnpm run build`).
- Check the build output for warnings about large JS bundles or unoptimized images.
- Run automated smoke tests with `curl` against the started server (see `qa-checklist.md`).
- Verify cover images are under 80KB and use WebP/AVIF where possible.

**Deep audit (only when user explicitly asks):**
- Test on simulated mobile (Moto G4 equivalent) at Slow 3G in Chrome DevTools Lighthouse. Do not test only on fast desktop connections.

Do not block the pipeline on a full Lighthouse run by default.

## Images

Book covers are the heaviest assets on the home and detail pages.

- Target < 80KB per cover at display size (typically 160×240px on mobile).
- Always set `width` and `height` on `<img>` to prevent CLS during load.
- Use `loading="lazy"` for below-fold covers on the home page.
- Use `fetchpriority="high"` on the first visible cover image.
- Prefer WebP with JPEG fallback via `<picture>`.
- CSS cover placeholders are acceptable when no image is provided. They must use flat color or subtle texture, not heavy gradients or box shadows.

## Fonts

- Prefer system font stacks for body text. Do not load a web font for body reading — system stacks render faster and are often better for CJK.
- On Next.js, load any display font (titles, logo) via `next/font` instead of a CDN `<link>`. `next/font` self-hosts Google Fonts as static assets served from your own deployment domain — the browser never requests Google at runtime, so no `preconnect` is needed and there is no third-party dependency or GDPR exposure. A failed font download fails the build rather than silently falling back to the Google CDN.
- `font-display: swap` alone does **not** prevent layout shift — the swap from fallback to web font still moves text and counts against CLS. To actually hold CLS near zero, use `next/font` (it applies a size-adjusted fallback metric automatically) or define a fallback with matching `size-adjust`/`ascent-override`. Do not claim swap "fixes" CLS.
- Subset any loaded font to the characters actually used (Latin, CJK range as appropriate). `next/font` with `subsets: ['latin']` handles this.
- Never load a CJK web font for body text on mobile. The system stack (Hiragino, Yu Mincho, Noto) is always faster and equally good.
- If a custom reader font is offered as a setting, load it lazily only when the reader selects it.

## Chapter Content Loading

- Never bundle all chapter text into the initial HTML or JS payload.
- For static builds: generate one HTML file or JSON file per chapter and navigate between them.
- For SPA/Next.js: lazy-load chapter content when entering the reader route. Do not prefetch every chapter at book-detail load time.
- Prefetch only the next chapter when the reader reaches 80% of the current chapter.
- Avoid loading the full book catalog on a chapter reader page.

### Next.js App Router prefetch behavior

Chapter navigation is the hot path; lean on the framework's native prefetching rather than rolling your own.

- **Statically rendered chapter routes** (the `generateStaticParams` + SSG path this skill recommends) are fully prefetched by `<Link>` when they enter the viewport, and cached client-side for ~5 minutes by default. This is what makes prev/next feel instant — no extra code needed.
- **Dynamically rendered chapter routes** are *not* prefetched at all unless a `loading.js` boundary exists, in which case only the shell up to that boundary is prefetched. If your reader must be dynamic, add a `loading.tsx` so the layout/skeleton still prefetches. Prefer SSG to avoid this entirely.
- **Sibling navigation** (chapter N → N+1) reuses the shared parent layout and only fetches the changed leaf segment. Keep the reader chrome (header, nav, settings) in a parent `layout.tsx` so it is not re-fetched on every page turn.
- Next.js maintains a prioritized prefetch queue: links in the viewport first, then links showing hover/touch intent, and links scrolled off-screen are discarded rather than queued forever. A book-detail page with hundreds of chapter links therefore will not thrash the network — but still avoid rendering a 1000-link catalog without virtualization.

## JavaScript Bundle

- Initial JS on the reader page must be below 200KB gzipped for a prototype.
- Defer any script that is not needed for first paint.
- Do not load analytics, chat widgets, cookie consent banners, or ad scripts on a prototype unless the user explicitly asks.
- Avoid heavy React bundle setups for simple prototypes. Vanilla JS or Preact can deliver the same reading experience at a fraction of the cost.
- If using Next.js, enable `swcMinify` and check the bundle analyzer before delivery.

## CSS

- Inline critical above-the-fold CSS (reader background, font size, body text color).
- Tailwind: configure `content` paths correctly to eliminate unused utility classes.
- Reader theme switching must use DaisyUI `data-theme` value updates, not class-swap-triggered reflows.
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
