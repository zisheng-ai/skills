# E-E-A-T Site Builder

Use this reference during phase 5 to create trust, ownership, and policy pages. These pages serve two purposes: passing AdSense policy review and building the E-E-A-T signals that affect organic ranking.

---

## Required Pages

Create or verify all of the following. Every page must be linked from the global footer.

### Privacy Policy (AdSense hard requirement)

The Privacy Policy is the most important trust page for AdSense approval. It must explicitly state:

1. The site uses **Google AdSense** to display advertisements.
2. Google uses **cookies** (including the DoubleClick cookie) to serve ads based on user visits.
3. Users can opt out of personalized advertising via **[Google's Ads Settings](https://adssettings.google.com)**.
4. What other data the site collects (email submissions, analytics, session data).
5. Whether the site uses **Google Analytics** or other tracking tools.
6. A link to the **Google Privacy Policy** at `https://policies.google.com/privacy`.

A Privacy Policy that does not mention AdSense and cookies is a blocking issue for approval. Generate the full text, do not link to an external generator and assume it is complete.

### About

States:
- Who runs the site (person, team, or project — no fake credentials)
- What the site helps users do
- Why this site was built (mission or problem statement)
- When the site was launched or last updated

If the owner has not provided identity details, use a transparent brand or project identity and mark all identity placeholders clearly for the owner to fill in before submission.

### Contact

Provide at minimum one of:
- A working email address
- A functional contact form

The contact path must work when tested. Google reviewers will test it. Do not use a non-functional placeholder.

### Terms of Use

Required whenever the site includes interactive tools, user submissions, or calculators that produce outputs users act on. Must cover:
- Acceptable use of the site
- Disclaimer that tool outputs are informational only and not professional advice
- Limitations of liability
- DMCA or content removal policy if the site hosts user-generated content

### Author or Editorial Page (when applicable)

Required when the site publishes substantive advice, how-to content, or YMYL-adjacent topics (health, finance, legal). States:
- Who authored or reviewed the content
- What qualifies them to write on the topic (even if just personal experience)
- When content was last reviewed

If no real author can be named, the About page can serve this role — but the site must still attribute content clearly.

---

## Content Requirements

Every trust page must:

- Be written plainly, not with legal boilerplate no one reads
- Avoid fake biographies, fabricated credentials, or unverifiable authority claims
- Use the same domain (not a subdomain or external hosted page)
- Be indexed (not blocked by `robots.txt` or `noindex`)
- Be reachable from the footer of every page

---

## Go-Live Setup

After trust pages are complete, set up the tools needed for organic growth and AdSense submission timing.

### Google Search Console

1. Add the site as a property in Google Search Console using the domain verification method (preferred) or the HTML tag method.
2. Submit `sitemap.xml` immediately after the site goes live.
3. Use the URL Inspection tool to request indexing for the homepage and primary tool page.
4. Wait 2–4 weeks before running the AdSense readiness audit. Phase 8 requires real GSC impressions and indexed pages before it can return a meaningful verdict.

### Google Analytics (optional but recommended)

Add GA4 to track real user engagement metrics (session duration, return visitors, tool completion events). These signals confirm real user behavior to Google and help identify which pages need improvement.

---

## Output

Create the pages in the site project. Add a checklist to `outputs/<site-slug>/site-brief.md`:

```md
## Trust Pages

- Privacy Policy: done | needs AdSense/cookie language | needs legal review
- About: done | needs owner details
- Contact: done | needs working email or form endpoint
- Terms of Use: done | not applicable | needs review
- Author/editorial info: done | not applicable | needs details

## AdSense Privacy Policy Checklist
- [ ] Mentions Google AdSense by name
- [ ] Mentions cookies / DoubleClick cookie
- [ ] Links to Google Ads Settings opt-out
- [ ] Links to Google Privacy Policy
- [ ] Covers other data collection (analytics, forms)
- [ ] Linked from every page footer
```
