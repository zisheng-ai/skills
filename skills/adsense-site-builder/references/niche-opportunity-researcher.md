# Niche Opportunity Researcher

Use this reference during phase 1 to find niches with real search demand, concrete user utility, and a clear path through AdSense policy review.

## Inputs

- Target language and country or market
- Batch size
- Preferred monetization path (usually AdSense)
- Exclusions (user-stated or policy-mandated)

---

## Step 1: Find Candidates

Generate more candidates than you need — at least 3x the final batch size — before scoring any of them.

### Where to search

**Observe recurring questions:**
- Reddit: search `r/[niche] site:reddit.com` for recurring how-to questions, tool requests, and "is there a site that..." posts
- Quora, Stack Overflow, AnswerThePublic, AlsoAsked — look for questions with no great existing answer
- Hacker News "Ask HN" posts — surfaces tool gaps engineers notice

**Find search volume signals:**
- Google autocomplete — type a seed keyword and read the suggestions; each suggestion is a real search pattern
- Google "People also ask" and "Related searches" — adjacent intents worth their own pages
- Google Trends — confirms demand isn't declining; compare candidates on the same chart
- Ahrefs free keyword explorer or Semrush free tier — estimate keyword difficulty and volume

**Find tool and template gaps:**
- Product Hunt — tools with strong upvotes but no SEO presence are a gap signal
- Chrome Web Store and App Store — browser extensions that solve a problem often have no web equivalent
- SERP analysis — search the seed keyword and check whether the current top results are thin articles, outdated tools, or behind paywalls; a gap is a weak incumbent, not just low domain rating

**Mine communities in the niche:**
- Facebook Groups, Discord servers, subreddits — watch what members ask about repeatedly
- Job boards (Indeed, LinkedIn) — job postings that mention a common tool reveal professional demand

### Candidate types to prefer

Prefer niches where a small site can provide concrete, self-contained utility:

- calculators (financial, health, unit conversion, estimation)
- generators (text, templates, codes, plans)
- converters and formatters
- checklist libraries organized by scenario
- template libraries with copyable content
- comparison tables and decision guides
- troubleshooting guides organized by error message or symptom
- directory listings with filtering

Avoid:
- Topics too broad for a small site to own (e.g., "fitness")
- Topics that require proprietary data you cannot produce
- Topics where the useful content is already locked behind free tools with strong brand moats (e.g., "YouTube thumbnail downloader" — saturated, low CPM)
- Topics dependent on scraped third-party listings without a curation layer

---

## Step 2: Validate Search Demand

Before scoring, confirm there is real search demand for each candidate. A niche with no search signal is not viable regardless of how useful the site could be.

Check all three signals:

1. **Google autocomplete** — the seed keyword appears as an autocomplete suggestion (not just a longer phrase you invented).
2. **At least one existing result in the top 5** that has clear engagement — comments, backlinks, or a high word count on the topic. This proves the market exists.
3. **Supporting keyword set** — you can name at least 8–10 supporting page topics, each with its own search intent. A niche with only 1–2 keyword angles cannot support a site.

Reject candidates that fail any of these three checks.

---

## Step 3: AdSense Policy Safety Assessment

This is the most important gate. A niche that cannot pass AdSense review is disqualified regardless of traffic potential.

### Explicitly banned by AdSense policy

Do not proceed with any niche in these categories:

| Category | Examples |
| --- | --- |
| Adult / sexually explicit | Pornography, escort listings, explicit personal ads |
| Gambling | Online casinos, poker, sports betting, lottery ticket sales |
| Weapons | Firearm sales, ammunition, tactical weapons, silencers |
| Drugs / controlled substances | Recreational drugs, drug buying guides, paraphernalia |
| Tobacco / vaping | Cigarette sales, e-cigarette promotion |
| Hacking / malware | Cracking tools, exploit kits, account takeover guides |
| Counterfeit goods | Replica products, fake documents, piracy |
| Violent or hateful content | Graphic violence, hate groups, harassment tools |
| Copyright infringement | Pirated software, unlicensed streaming, download sites for copyrighted content |

### High-risk categories (harder approval, lower CPM, higher ongoing scrutiny)

These are not banned, but they require extra care. Google applies additional scrutiny and some advertisers exclude these topics. Build into a safer niche unless the utility angle is clearly informational and non-advisory.

| Category | Risk | Safer angle |
| --- | --- | --- |
| Health / medical (YMYL) | Symptom checkers, treatment advice, diagnosis tools | General wellness calculators, BMI, hydration, sleep — avoid symptom → diagnosis flows |
| Legal | Legal advice, contract generation | Checklist guides ("what documents you need"), not "here is your contract" |
| Financial advice | Investment recommendations, loan structuring | Calculators (mortgage, tax estimate, savings) with clear "consult a professional" disclaimers |
| Cryptocurrency | Trading signals, ICO promotion | Technical explainers, fee calculators — avoid price prediction or investment framing |
| Political / news | Partisan commentary, election content | Avoid entirely unless purely factual (e.g., candidate comparison facts) |
| Dating / relationships | Matchmaking, personal ads | General relationship explainers are fine; matchmaking platforms are not |
| Alcohol | Cocktail recipes are borderline | Recipe-only is generally fine; spirits sales or bar directories are riskier |

### Advertiser safety scoring

Beyond policy compliance, assess how attractive the niche is to advertisers. Low advertiser demand means low CPM even after approval.

High advertiser demand (good CPM):
- B2B software, productivity tools, SaaS
- Finance (mortgages, insurance, personal finance calculators)
- Legal services (information only)
- Education and e-learning
- Home improvement, real estate
- Travel planning
- Career and HR tools

Moderate advertiser demand:
- General consumer tools (unit converters, generators)
- Food and cooking
- Hobbies and crafts
- Pet care (general, not veterinary)
- Parenting tools

Lower advertiser demand (thin CPM):
- Entertainment-only content without a decision or purchase adjacent
- Meme or humor sites
- Ultra-local content with no national advertisers

### Traffic quality risk

Some niches attract fraudulent or low-quality traffic patterns that can trigger AdSense policy violations even if the content is fine.

Flag and avoid:
- Niches where the dominant existing sites use traffic exchanges, bot networks, or incentivized visits — these patterns follow the niche
- Niches where the primary audience is other webmasters (e.g., SEO tool aggregators) — high ad-blind, low click-through
- Niches where the expected visit duration is under 10 seconds — low engagement → policy risk

---

## Step 4: Score Candidates

Score each candidate from 1 to 5 on all six dimensions. Only candidates averaging ≥ 3.5 with no dimension below 2 are worth selecting.

| Field | Meaning |
| --- | --- |
| `search_intent_strength` | Users have a clear, recurring problem and consistent search wording |
| `utility_potential` | The site can solve or transform something, not only summarize |
| `content_depth` | At least 10 supporting page angles, each with distinct intent |
| `competition_gap` | Existing top results are weak, thin, outdated, or behind paywalls |
| `adsense_safety` | Topic is policy-compliant, advertiser-safe, and has no traffic-quality red flags |
| `build_effort` | Lower effort relative to the expected output earns a higher score |

`adsense_safety` is a hard gate: any candidate scoring below 3 here is rejected regardless of other scores.

---

## Output

Write `outputs/niches.json`:

```json
[
  {
    "slug": "example-calculator",
    "title": "Example Calculator",
    "market": "en-us",
    "user_problem": "What the user is trying to solve in one sentence",
    "primary_asset": "calculator | generator | checker | template library | directory | comparison hub | checklist hub | tutorial hub",
    "seed_keywords": ["keyword one", "keyword two"],
    "demand_validation": {
      "autocomplete_confirmed": true,
      "existing_results_engaged": true,
      "supporting_page_count": 12
    },
    "supporting_page_angles": ["angle one", "angle two"],
    "adsense_policy_check": {
      "banned_category": false,
      "high_risk_category": false,
      "high_risk_notes": "",
      "advertiser_demand_tier": "high | moderate | low",
      "traffic_quality_risk": "none | low | medium | high"
    },
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

### Decision rules

- **select** — passes demand validation, no banned or high-risk category flags, `adsense_safety` ≥ 3, average score ≥ 3.5, no dimension below 2.
- **reject** — banned category, `adsense_safety` < 3, fails demand validation, or average score < 3.0.
- **needs research** — potentially viable but missing data on one critical dimension; mark and note what to verify before building.

Select only candidates with strong utility potential, confirmed search demand, and a clear path through AdSense policy review.
