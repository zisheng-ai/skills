# Tech Stack Decision

## Stack

Always use **Next.js + Tailwind CSS + DaisyUI + @content-collections**. No exceptions.

- App Router + `output: 'export'` for static hosting. Switch to full SSR only when dynamic content genuinely requires server rendering per request.
- Fiction content is managed by `@content-collections`. Define collections in `content-collections.ts` → import fully-typed `allChapters` / `allShortStories` directly in pages. No manual `fs` reads, no hand-written parsers.
- Adding new content = drop files into `content/`, run `next build`. Zero config change.

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

- Always use TypeScript. Use the data models in `references/data-contract.md` as the type baseline.

## State Management

- Reader preferences (font size, theme, density): `localStorage` for prototypes, user settings API for real products.
- Reading progress: `localStorage` for prototypes, durable backend for real products.
- Do not add Redux, Zustand, Jotai, or any state library. React state is sufficient.

## Deployment

| Mode | Default deployment target |
| --- | --- |
| Next.js export | Vercel, Netlify, Cloudflare Pages |
| Next.js SSR | Vercel |
| Docker/VPS | Only if user specifies |

Do not set up CI/CD or deployment pipelines unless the user asks. Describe the deploy target in the output but leave execution to the user.
