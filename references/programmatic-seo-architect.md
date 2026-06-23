# Programmatic SEO Architect

Use this reference during phase 3 when a niche supports repeated page patterns.

## Goal

Design page models that are scalable without becoming thin or duplicated. A programmatic page must have a reason to exist beyond keyword variation.

## Required Page Model Fields

For every template, define:

- Page purpose
- Search intent
- Data fields
- Unique computation or transformation
- Required examples
- Required caveats
- Internal links
- Schema markup opportunities
- Thin-content risk
- Minimum completion criteria

## Anti-Thin Rules

Reject a template if:

- The only difference between pages is a title or keyword.
- The page has no unique input, output, example, comparison, or data point.
- It cannot answer why a user would prefer this page over a generic article.
- It depends on unverifiable generated facts.

## Output

Write `outputs/<site-slug>/page-model.md`:

```md
# Page Model

## Template: Calculator Use Case Page

- Purpose:
- Search intent:
- URL pattern:
- Data fields:
- Unique value per page:
- Required sections:
- Internal links:
- Schema:
- Thin-content risks:
- Completion gate:
```

Only approve templates that can create pages a real user would bookmark, share, or use to complete a task.
