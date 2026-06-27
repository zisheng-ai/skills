# Keyword Cluster Planner

Use this reference during phase 2 to turn a selected niche into a site map.

## Required Clusters

Create these page groups:

- Homepage: the broadest clear intent for the site.
- Tool page: the main interactive asset.
- Supporting pages: at least 10 pages that explain use cases, examples, comparisons, mistakes, formulas, templates, or workflows.
- FAQ pages or sections: long-tail questions with concise answers.

## Page Selection Rules

- Each page must satisfy a distinct search intent.
- Do not create pages that differ only by a swapped adjective, city, or keyword unless there is truly distinct data or logic.
- Prefer pages that help the user make a decision, complete a calculation, generate an output, or understand a concrete example.
- Mark pages that require fresh data or external verification.

## Output

Write `outputs/<site-slug>/site-map.json`:

```json
{
  "site_slug": "example-calculator",
  "homepage": {
    "path": "/",
    "primary_keyword": "example calculator",
    "intent": "calculate a specific thing"
  },
  "tool_pages": [
    {
      "path": "/calculator",
      "primary_keyword": "example calculator",
      "intent": "perform the calculation",
      "inputs": ["input one", "input two"],
      "output": "result description"
    }
  ],
  "supporting_pages": [
    {
      "path": "/guide/example-formula",
      "primary_keyword": "example formula",
      "intent": "understand the formula",
      "unique_value": "worked examples and edge cases"
    }
  ],
  "faq": [
    {
      "question": "common question?",
      "answer_angle": "short direct answer with caveats"
    }
  ]
}
```

If the map cannot reach 10 meaningful supporting pages, return to phase 1 and choose a better niche.
