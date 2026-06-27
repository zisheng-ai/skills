---
name: adsense-site-builder
description: builds and audits adsense-ready niche websites from idea to launch. use when asked to create one or many websites for adsense approval or monetization, including niche validation, keyword planning, site architecture, useful page or tool creation, trust pages, technical seo, adsense readiness review, and safe initial traffic plans without invalid traffic tactics.
---

# AdSense Site Builder

## Overview

Use this skill as the single entrypoint for building AdSense-ready niche websites. Treat the referenced files as staged submodules: load only the reference needed for the current phase, produce its required handoff artifact, then advance to the next phase.

## Operating Principles

- Build websites for real users first, monetization second.
- Prefer useful tools, templates, directories, comparison hubs, checklists, tutorials, calculators, generators, and explainers over generic article farms.
- Reject tactics that depend on traffic exchanges, bot traffic, paid traffic packages, forced ad interactions, or thin AI-generated pages.
- Keep every output inspectable: write assumptions, inputs, quality gates, and next actions into project files.
- Do not mark a site ready until it has clear utility, trustworthy identity pages, technical SEO basics, and a safe distribution plan.

## Site Building Pipeline

Run these phases in order unless the user explicitly starts from an existing artifact.

| Phase | Load Reference | Required Output |
| --- | --- | --- |
| 1. niche validation | `references/niche-opportunity-researcher.md` | `outputs/niches.json` |
| 2. keyword and site planning | `references/keyword-cluster-planner.md` | `outputs/<site>/site-map.json` |
| 3. site model design | `references/programmatic-seo-architect.md` | `outputs/<site>/page-model.md` |
| 4. useful site build | `references/useful-site-builder.md` | working site/app files |
| 5. trust and policy pages | `references/eeat-site-builder.md` | about/contact/privacy/terms/author pages |
| 6. readiness audit | `references/adsense-readiness-auditor.md` | `outputs/<site>/adsense-readiness-report.md` |
| 7. launch planning | `references/distribution-launcher.md` | `outputs/<site>/launch-plan.md` |

## Default Batch Workflow

When the user asks to create multiple sites:

1. Ask only for missing hard constraints: target language, country/market, preferred tech stack, and batch size. If the user does not answer, default to English, United States/global, static Next.js or Astro, and 3 sites.
2. Generate at least 3x more niche candidates than the requested number of sites.
3. Score and select the strongest candidates before creating any site files.
4. Choose the right site pattern for each candidate: tool site, template library, directory, comparison hub, checklist hub, tutorial hub, or hybrid.
5. For each selected site, create a folder with planning artifacts, source files, and audit reports.
6. Stop or revise when any phase fails a quality gate. Do not continue by silently lowering the bar.

## Quality Gates

A site is not ready if any of these are true:

- The primary value is generic text that could exist on thousands of similar sites.
- The core site has no interactive utility, original data transformation, useful template, curated directory value, concrete checklist, tutorial depth, or decision support.
- The content is mostly keyword-stuffed, copied, spun, or undifferentiated AI prose.
- The Privacy Policy does not explicitly mention Google AdSense, cookies, and the Google Ads Settings opt-out link.
- The site lacks an About page, Contact path, Privacy Policy, Terms, and clear authorship or site ownership.
- The launch plan depends on purchased traffic packages, bot-like visits, click incentives, or traffic exchange networks.
- Technical basics are missing: indexable pages, sitemap.xml, robots.txt, canonical URLs, descriptive title tags (50–60 chars), meta descriptions (150–160 chars), schema markup, internal links, mobile layout, and Core Web Vitals within acceptable range.
- The readiness audit has not been run, or it returned "not ready" or "needs revision" and those issues were not resolved.

## Output Contract

Use this structure unless the user provides a repository convention:

```txt
outputs/
  niches.json
  <site-slug>/
    site-brief.md
    site-map.json
    page-model.md
    adsense-readiness-report.md
    launch-plan.md
```

For actual web projects, follow the user's repository structure. If starting from scratch, create a separate app folder for each site and keep `outputs/<site-slug>/` as the planning and audit record.

## Reference Loading

Load references only when entering that phase:

- Use `niche-opportunity-researcher.md` to choose or validate niches.
- Use `keyword-cluster-planner.md` to turn a niche into site architecture.
- Use `programmatic-seo-architect.md` to define page templates, non-thin page variation, and a deliberate visual direction.
- Use `useful-site-builder.md` to implement the primary site experience.
- Use `eeat-site-builder.md` to create trust and policy pages.
- Use `adsense-readiness-auditor.md` before submission or after major changes.
- Use `distribution-launcher.md` after the site passes readiness checks.

## Safe Traffic Rule

Recommend traffic sources that create real user intent: organic search, community answers, directories, newsletters, short educational videos, Pinterest for visual topics, and small paid tests only when they target legitimate users. Do not recommend traffic packages, bots, automated browsing, ad-click incentives, or anything designed to manipulate ad impressions or clicks.

## Example Request

> Build 3 English niche websites for AdSense readiness.

Run the full pipeline. Produce niche candidates, select 3, choose the right site pattern for each, build useful pages or tools, create supporting pages, run readiness audits, and generate launch plans. Do not use unsafe traffic tactics.
