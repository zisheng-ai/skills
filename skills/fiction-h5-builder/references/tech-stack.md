# Tech Stack Decision

## Decision Matrix

Choose the simplest stack that meets all the brief's requirements. Complexity needs a concrete reason.

| Requirement | Recommended Stack |
| --- | --- |
| Quick H5 prototype, no routing, no build step | Static HTML + vanilla CSS/JS |
| Multiple pages, SPA routing, no SEO needed | Vite + vanilla JS or Preact/Svelte |
| Static catalog, SEO matters, oh-story-claudecode JSON pre-built | Next.js with `output: 'export'` or Astro |
| Dynamic routes, ISR, or server API needed | Next.js SSR/ISR |
| Maximum performance, mostly static content | Astro (zero-JS by default) |
| Existing project | Match the existing stack exactly |

## Static HTML/CSS/JS

Use when:
- The output is a demo, ZIP-able preview, or single-page prototype.
- There is one or very few works — no catalog routing needed.
- The user wants host-anywhere output with no build toolchain.
- Time to first readable page matters more than developer ergonomics.

Keep all logic in a minimal ES module. Do not introduce a framework for a prototype that does not need it.

## Next.js

Use when:
- Multiple pages require deep-linkable URLs (`/book/[slug]`, `/book/[slug]/chapter/[id]`).
- oh-story-claudecode content is pre-generated and needs SSG.
- SEO is a requirement for a public-facing fiction site.
- The user's existing project already uses Next.js.
- The site will grow to need dynamic features (user accounts, reading history, payments).

Default to App Router + `output: 'export'` for static hosting. Switch to full SSR only when dynamic content genuinely requires server rendering per request.

## Astro

Use when:
- Performance is the primary concern and interactivity is minimal.
- The site is mostly chapter content that benefits from zero-JS delivery.
- The team or user prefers Astro's island architecture for selective hydration.
- Deployment target is Vercel, Netlify, or Cloudflare Pages with static output.

## Styling

- Default: **Tailwind CSS + DaisyUI**. DaisyUI is a pure-CSS Tailwind plugin — zero JS runtime, no bundle impact.
- Reader themes (light/sepia/dark) use DaisyUI's `data-theme` attribute on `<html>`. Define custom themes in `tailwind.config.js` under `daisyui.themes`.
- Do not layer a separate CSS custom property token system on top of DaisyUI's theme tokens — use DaisyUI's `base-100`, `base-content`, etc. as the token layer.
- Never use inline styles for design decisions.
- Avoid CSS-in-JS runtimes (emotion, styled-components) unless the project already uses them.

```js
// tailwind.config.js
plugins: [require('daisyui')],
daisyui: {
  themes: [
    'light',
    { sepia: { 'base-100': '#f5f0e8', 'base-content': '#3b2f1e' } },
    'dark',
  ],
}
```

## TypeScript

- Use TypeScript if the user's project already uses it or they explicitly ask.
- Do not introduce TypeScript into a vanilla JS prototype — it adds a build requirement without reader-visible benefit.
- If using TypeScript, use the data models in `references/data-contract.md` as the type baseline.

## State Management

- Reader preferences (font size, theme, density): `localStorage` for prototypes, user settings API for real products.
- Reading progress: `localStorage` for prototypes, durable backend for real products.
- Do not add Redux, Zustand, Jotai, or any state library to a prototype. React state or vanilla JS variables are sufficient.

## Deployment

| Stack | Default deployment target |
| --- | --- |
| Static HTML | GitHub Pages, Cloudflare Pages, Netlify Drop |
| Next.js export | Vercel, Netlify, Cloudflare Pages |
| Next.js SSR | Vercel |
| Astro | Vercel, Netlify, Cloudflare Pages |
| Docker/VPS | Only if user specifies |

Do not set up CI/CD or deployment pipelines unless the user asks. Describe the deploy target in the output but leave execution to the user.
