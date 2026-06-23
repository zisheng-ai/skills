# Niche Opportunity Researcher

Use this reference during phase 1 to find niches with search demand and real user utility.

## Inputs

- Target language and country or market
- Batch size
- Preferred monetization path, usually AdSense
- Exclusions such as YMYL, adult, gambling, crypto, or regulated topics

## Candidate Rules

Prefer niches where a small site can provide concrete utility:

- calculators
- generators
- checkers
- converters
- comparison tables
- checklist libraries
- templates
- troubleshooting guides
- local or procedural explainers

Avoid niches that are too broad, too regulated, too dependent on scraped content, or impossible to make useful without proprietary data.

## Scoring

Score each candidate from 1 to 5:

| Field | Meaning |
| --- | --- |
| search_intent_strength | Users have a clear problem and search wording |
| utility_potential | The site can solve something, not only summarize |
| content_depth | There are enough supporting pages without repetition |
| competition_gap | Existing results leave room for a better tool or clearer answer |
| adsense_safety | Topic is generally advertiser-safe and policy-safe |
| build_effort | Lower effort earns a higher score |

## Output

Write `outputs/niches.json`:

```json
[
  {
    "slug": "example-calculator",
    "title": "Example Calculator",
    "market": "en-us",
    "user_problem": "What the user is trying to solve",
    "primary_asset": "calculator | generator | checker | template library | directory",
    "seed_keywords": ["keyword one", "keyword two"],
    "supporting_page_angles": ["angle one", "angle two"],
    "score": {
      "search_intent_strength": 4,
      "utility_potential": 5,
      "content_depth": 4,
      "competition_gap": 3,
      "adsense_safety": 5,
      "build_effort": 4
    },
    "risks": ["risk one"],
    "decision": "select | reject | needs research"
  }
]
```

Select only candidates with strong utility potential and no major policy or traffic-quality risk.
