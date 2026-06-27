# Useful Site Builder

Use this reference during phase 4 to build the complete site experience: pages, interactive utility, technical SEO files, and ad placement structure. This is the phase that most directly determines whether the site passes AdSense review and earns organic traffic.

Do not finish this phase until every item in the completion gate is checked. A partially built site that proceeds to the audit is a wasted submission attempt.

---

## Step 0: Load the competitive brief

Before choosing a pattern or writing any page, read `competitive_brief` from this site's entry in `outputs/niches.json` (produced in phase 1). It is the differentiation baseline — the build's job is to be measurably better than the incumbents on the specific weaknesses recorded there.

Turn the brief into a checklist before building. Iterate **every entry in the array** and account for each one — Phase 4 is the last build phase before launch, so it is the backstop for all of them regardless of `acts_in_phase`. Route each entry by its token to decide *where* to verify:

- `acts_in_phase: "build"` — write down the concrete on-page requirement it imposes (e.g. "incumbent's top page has no worked examples → mine needs ≥ 3" or "incumbent's CWV is poor → hold LCP < 2.5s and ship a working tool they lack"), and fold it into the relevant page's content outline.
- `acts_in_phase: "keywords"` — confirm the missing sub-topic / page angle made it into the phase 2 cluster and exists as a real page in the site map. If it did not, add the page now.
- `acts_in_phase: "page_model"` — confirm the differentiating tool/asset is in the phase 3 page model and is actually being built. If it was dropped, build it now.
- **Any other value, or a missing/empty `acts_in_phase`** — do not skip it. Treat it as `build` (handle it on-page here), and correct the brief entry's token so the record is clean. An unrecognized token is a defect to fix, never a reason to drop the entry.

Every entry must end the phase in one of two states: **verified present and better than the incumbent**, or — only if genuinely out of scope — explicitly noted with a reason. An entry that is silently absent is a failed gate, not an acceptable omission.

If `competitive_brief` is empty or absent (e.g. the user skipped phase 1), note that the build has no differentiation baseline and apply the content-depth standards below as the floor. Do not invent competitor weaknesses — build to the standards instead.

---

## Site Patterns

Choose the pattern that best fits the niche. Do not default to a mini tool if a richer pattern serves the user better.

| Pattern | Best For | Primary Asset |
| --- | --- | --- |
| Tool site | calculators, converters, generators, checkers | working interactive tool with real output |
| Template library | resumes, emails, Notion pages, docs, prompts | copyable/downloadable templates with preview |
| Directory site | software, resources, datasets, services | curated list with filters and item detail pages |
| Comparison hub | SaaS alternatives, product choices, methods | comparison tables with decision criteria |
| Checklist hub | visa, moving, school, business setup | step-organized checklists with printable format |
| Tutorial hub | coding errors, Excel formulas, software workflows | step-by-step guides with prerequisites and troubleshooting |
| Hybrid site | niches with multiple intents | one primary utility + supporting clusters across types |

---

## Content Depth Standards

These are quality depth guidelines per page type. Google has no official word count minimum — "sufficient content" is the stated standard. The guidance below reflects what depth is typically needed to genuinely answer the user's question at each page type. A page that is thinner than these guidelines is almost always too shallow to satisfy users or earn ranking — but these are not AdSense policy numbers.

### Primary tool or resource page

The most important page on the site. It must:

- Provide a real, functional interactive experience — not a mockup.
- Show clear input controls with helpful labels and defaults.
- Produce a meaningful, specific output — not "your result is 42" without context.
- Include at least 3 worked examples showing different input scenarios.
- Explain the formula, algorithm, or curation logic — not just the result.
- State assumptions and edge cases explicitly.
- Link to at least 3 related supporting guides.
- Include a FAQ section with 5+ questions answered specifically (not generically).

Depth guideline: 800+ words of body content outside the interactive element is typically needed to cover worked examples, edge cases, and FAQ at the depth users expect. Shorter pages are usually shallow.

### Supporting guide pages

Each guide must address exactly one search intent. It must:

- Answer the primary keyword question in the first paragraph.
- Use a clear H2/H3 heading hierarchy covering distinct sub-topics.
- Include at least one fully worked example (numbers, steps, or output).
- Include a "common mistakes" or "when this doesn't apply" section.
- Link back to the primary tool page and to 2–3 related guides.
- End with a clear next action for the reader.

Depth guideline: 700+ words is typically needed to cover a topic at the depth users expect. Shorter guides are usually thin; longer is appropriate for complex topics.

### Template pages

Each template page must:

- Display the complete, ready-to-use template — not a screenshot, not a locked preview.
- Provide a one-click copy button or direct download.
- Explain when to use this template (use case, audience, scenario).
- Include at least one completed example showing real content filled in.
- List customization notes: what to change, what not to.
- State common mistakes when using this template type.
- Link to the category page and to 2–3 related templates.

### Directory and comparison pages

Each item listing or comparison page must:

- Use real, verifiable information — no fabricated data points.
- Apply consistent fields across all items (price, features, pros, cons, best-for).
- State the evaluation criteria and how they were applied.
- Avoid pretending to have tested or used products unless evidence is provided.
- Link to the official source for each listed item.

---

## Ad Placement Structure

Build the ad placement structure into every page template from the start. Do not treat ads as an afterthought.

### Before AdSense approval

Add the AdSense auto-ads script to the `<head>` of every page immediately — this is required for Google to verify site ownership during the review process. Do not add manually placed ad units before approval. Auto-ads will not show until the account is approved; the script presence is what matters for the review.

```html
<!-- AdSense verification script — add to <head> before submission -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
```

Replace `ca-pub-XXXXXXXXXX` with the actual publisher ID. Mark it as a placeholder if the user has not provided one yet.

### Ad placement rules (post-approval)

Follow these placement rules to maximize revenue without triggering policy violations:

| Placement | Rule |
| --- | --- |
| Above the fold | Ads must not occupy more than 30% of the visible viewport on any screen size. Primary content must be visible without scrolling. |
| Below the hero | Place the first ad unit after the primary tool output or after the first 200 words of body content — not before. |
| Within long content | One ad unit every 500–800 words in long-form guides. Never between two consecutive ad units without content in between. |
| Sidebar | Acceptable on desktop only. Must not overlap with the main content column on mobile. |
| After the primary tool | Place one ad unit below the tool result area, after the user has received their output. Do not place ads above the tool inputs where they block the primary experience. |
| Footer | Acceptable. One unit maximum. |
| Between navigation elements | Never. Ads placed inside or immediately adjacent to navigation links risk invalid clicks. |
| Inline with interactive elements | Never. Ads mixed into calculator inputs, template download buttons, or checklist checkboxes are a policy violation. |

### Ad slot placeholders in page templates

During the build phase, mark every intended ad slot with a clear comment so it is easy to activate post-approval:

```html
<!-- AD SLOT: below-tool-result — 728x90 leaderboard desktop / 320x50 mobile -->
<!-- activate after AdSense approval with correct ad unit code -->
```

---

## Technical SEO Implementation

Build all of these into the project during phase 4. Do not leave them for the audit phase.

### sitemap.xml

Generate dynamically or statically. Must include every indexable page with its `<lastmod>` date.

For Next.js, use `next-sitemap`:
```bash
yarn add next-sitemap
```

```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://your-domain.com',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/admin/*'],
}
```

For Astro, enable the built-in sitemap:
```js
// astro.config.mjs
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://your-domain.com',
  integrations: [sitemap()],
});
```

### robots.txt

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://your-domain.com/sitemap.xml
```

### Canonical URLs

Every page must include a self-referencing canonical tag:

```html
<link rel="canonical" href="https://your-domain.com/exact-page-path" />
```

No trailing-slash variation. No query parameters in canonical URLs. Consistent throughout.

### Schema Markup Implementation

Implement schema for each page type. Use JSON-LD in the `<head>`.

**Tool / calculator page:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Tool Name",
  "description": "What this tool does",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

**How-to guide:**
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to [do the thing]",
  "description": "A concise description",
  "step": [
    { "@type": "HowToStep", "name": "Step 1", "text": "Description" },
    { "@type": "HowToStep", "name": "Step 2", "text": "Description" }
  ]
}
```

**FAQ sections:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text."
      }
    }
  ]
}
```

**Article / guide pages:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Page title",
  "datePublished": "2025-01-01",
  "dateModified": "2025-01-01",
  "author": { "@type": "Organization", "name": "Site Name" }
}
```

### Internal Links

Every page must link outward and receive links. Build this from the site-map.json link map.

- Primary tool page: links to 3+ supporting guides.
- Every supporting guide: links back to the primary tool + 2–3 related guides.
- Homepage: links to primary tool, at least 3 guides, and the FAQ page.
- No orphan pages — every page must be reachable from at least one other page.

---

## Core Web Vitals

These affect both organic ranking and AdSense ad performance. Implement from the start; do not retrofit.

| Metric | Target | Implementation |
| --- | --- | --- |
| LCP (Largest Contentful Paint) | < 2.5s | Server-render hero content. Preload the LCP image with `<link rel="preload">`. Avoid lazy-loading the hero image. |
| CLS (Cumulative Layout Shift) | < 0.1 | Specify `width` and `height` on every `<img>`. Reserve space for ad slots with `min-height`. Avoid inserting content above existing content after load. |
| INP (Interaction to Next Paint) | < 200ms | Minimize client-side JavaScript on initial load. Defer non-critical scripts. Run heavy calculations in a Web Worker if they take > 50ms. |

For AdSense specifically: ad units that inject late cause CLS. Reserve the ad slot space before the ad loads:

```css
.ad-slot {
  min-height: 90px; /* leaderboard */
  background: transparent;
}
```

---

## Pattern-Specific Build Requirements

### Tool sites

- All input fields have labels (not just placeholders).
- Form submits without page reload. Results update in place.
- Every edge case produces a meaningful message, not a blank result or NaN.
- The calculation or generation logic is explained below the tool with real examples.
- Include a "How to use this tool" section with step-by-step instructions.
- Test at minimum: zero inputs, extreme inputs, typical inputs, and at least one error case.

### Template libraries

- Templates are copyable with a single click (Clipboard API).
- Each template has a preview mode that shows it filled in with realistic sample data.
- Category pages list all templates with a short description and link to each.
- Download option (TXT or DOCX) for templates longer than 200 words.

### Directory sites

- Inclusion criteria are published on the site (not hidden in the About page).
- Filters work without page reload.
- Each item page has a consistent field set: name, description, URL, category, last verified date.
- Mark data that may be outdated with a "last verified" date.

### Comparison hubs

- Evaluation criteria are stated explicitly before the comparison table.
- Tables render correctly on mobile (horizontal scroll or collapsed layout, not broken columns).
- Each comparison concludes with a "best for" recommendation, not just a neutral data dump.
- Caveats section: note what this comparison does not cover.

### Checklist hubs

- Checklists are printable (CSS print styles) and copyable as plain text.
- Items are organized by phase or deadline, not alphabetically.
- Each item has a short rationale (why this step matters).
- Provide a "download as PDF" or "copy to clipboard" action for each checklist.

### Tutorial hubs

- Every tutorial states prerequisites at the top.
- Steps are numbered. Each step is atomic (one action per step).
- Every tutorial has an "expected result" section showing what success looks like.
- Common errors section with each error message and its fix.
- A "next steps" section linking to the next logical tutorial in the sequence.

---

## Completion Gate

Before advancing to phase 5, verify all of the following:

**Content:**
- [ ] Primary tool or resource works correctly. Tested with at least 3 input scenarios including an edge case.
- [ ] Every entry in `competitive_brief` is accounted for — count the entries, not the tokens. Each is verified present and better than the incumbent on the relevant page, or explicitly noted as out of scope with a reason (or the brief was empty). Entries with an unknown/missing `acts_in_phase` were handled as `build`, not skipped. No entry is silently absent. The site beats the incumbents, not just matches them.
- [ ] All 15+ pages are complete. No placeholder text.
- [ ] Every page meets the content depth standard for its type.
- [ ] No page exists only to target a keyword without adding value for the user.
- [ ] Every page has a distinct H1, title tag (50–60 chars), and meta description (150–160 chars).

**Technical SEO:**
- [ ] sitemap.xml generated and includes all indexable pages.
- [ ] robots.txt present at root and correct.
- [ ] Canonical URLs on every page.
- [ ] Schema markup implemented for the primary tool page, all FAQ sections, and all how-to guides.
- [ ] Internal link map fully implemented. No orphan pages.
- [ ] Alt text on all images.

**Performance:**
- [ ] LCP < 2.5s on mobile (verify with PageSpeed Insights or Lighthouse).
- [ ] CLS < 0.1 (no layout shifts from ad slots or late-loading images).
- [ ] No layout-thrashing JavaScript on page load.

**Ad structure:**
- [ ] AdSense auto-ads script added to `<head>` of every page.
- [ ] Ad slot placeholders marked in page templates with comments.
- [ ] No ads placed above primary content or inside interactive elements.
- [ ] Ad slot CSS reserves minimum height to prevent CLS.

**Mobile:**
- [ ] Site renders correctly at 375px viewport.
- [ ] No horizontal scroll on any page.
- [ ] Touch targets (buttons, links) are at least 44×44px.
- [ ] Font size ≥ 16px for body text.
