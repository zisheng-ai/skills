# QA Checklist

Run this checklist before any final delivery. For unattended execution, automate every check that can be automated; screenshots are captured programmatically and only surfaced when a check fails.

## Pre-Launch Gate

Run these checks before go-live. These are **not** blockers for development preview.

- [ ] `content/` has ≥ 5 book directories (initial site launch).
- [ ] Each book has ≥ 10 chapter files in `content/{book-title}/chapters/` (中篇 minimum).
- [ ] Each chapter is ≥ 1,500 Chinese characters or 1,200 English words — no stub content.
- [ ] `outline/outline.md` exists and contains a real arc outline (not empty or stub-only).
- [ ] `world/worldbuilding.md` exists and describes the world, genre, and tone.
- [ ] `tracking/context.md` exists and reflects the last written chapter.
- [ ] Cover image generated for each book: `public/covers/{book-title}/cover_v1.png`.
- [ ] Site logo generated: `public/logo.png` (apiyi) or `public/logo.svg` (SVG fallback).
- [ ] Favicon generated: `public/favicon-32x32.png` (apiyi) or `public/favicon.svg` (SVG fallback).

If any launch asset is missing, attempt to generate it automatically (Phase 3 / Phase 6). Only if generation fails, log the missing asset and continue; do not stop the pipeline.

## Automated Verification (run without user input)

Run the build and start the production server, then verify routes programmatically. The stack is fixed to Next.js (see `tech-stack.md`). Package manager is pnpm.

```bash
set -e

# Build
pnpm run build

# Start server in background and capture its port
pnpm run start > /tmp/fiction-server.log 2>&1 &
SERVER_PID=$!

# Wait for server to be ready; extract the port it bound to
PORT=""
for i in $(seq 1 30); do
  PORT=$(grep -oE 'http://localhost:[0-9]+' /tmp/fiction-server.log | head -1 | cut -d: -f3)
  [ -n "$PORT" ] && break
  sleep 1
done
[ -z "$PORT" ] && PORT=3000

# Pick the first book slug from content/
BOOK_SLUG=$(find content -maxdepth 2 -type d -name chapters | head -1 | xargs dirname | xargs basename)
[ -z "$BOOK_SLUG" ] && { echo "ERROR: no book found in content/"; kill $SERVER_PID; exit 1; }

BASE="http://localhost:${PORT}"
FAIL=0

check() {
  local name="$1"
  shift
  if "$@"; then
    echo "✓ $name"
  else
    echo "✗ $name"
    FAIL=1
  fi
}

# Route smoke tests (curl -sf already silences progress; no > /dev/null so check() can print ✓/✗)
check "home responds" curl -sf "${BASE}/"
check "book detail responds" curl -sf "${BASE}/book/${BOOK_SLUG}/"
check "chapter reader responds" curl -sf "${BASE}/book/${BOOK_SLUG}/chapter/1/"

# Content checks
check "chapter content renders" sh -c "curl -s '${BASE}/book/${BOOK_SLUG}/chapter/1/' | grep -q '<p>'"
check "next/finish link present" sh -c "curl -s '${BASE}/book/${BOOK_SLUG}/chapter/1/' | grep -qE 'Next chapter|Finish'"
# Only test prev-chapter link if chapter 2 actually exists
CHAPTER2_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${BASE}/book/${BOOK_SLUG}/chapter/2/")
if [ "$CHAPTER2_STATUS" = "200" ]; then
  check "prev chapter link present" sh -c "curl -s '${BASE}/book/${BOOK_SLUG}/chapter/2/' | grep -qiE 'Previous|上一章|Prev'"
else
  echo "- prev chapter link (skipped — only 1 chapter found)"
fi

kill $SERVER_PID

if [ "$FAIL" -ne 0 ]; then
  echo "ERROR: QA automated checks failed."
  exit 1
fi

echo "QA automated checks passed."
```

If the project uses `output: 'export'` (static export), replace the server start with serving the `dist/` or `out/` folder and point curl at that URL.

- [ ] Build completes without errors.
- [ ] TypeScript passes with no errors (`tsc --noEmit`) if applicable.
- [ ] All required pages respond with HTTP 200.
- [ ] Chapter content renders (`<p>` tags present).
- [ ] Navigation links present on reader (previous / next / finish).
- [ ] No `console.error` output in normal use.

## Visual QA (automated capture, human review only on failure)

Use a headless browser or screenshot tool if available (e.g. Playwright, Puppeteer). If none is installed, skip screenshot capture and rely on the curl smoke tests above. Do not present screenshots to the user unless an automated check fails.

### Required viewports

| Viewport | Page |
| --- | --- |
| 390 × 844 | Home / work list |
| 390 × 844 | Book detail |
| 390 × 844 | Reader (default theme) |
| 375 × 667 | Reader (small screen) |
| 1366 × 900 | Home / work list |
| 1366 × 900 | Reader |

### Automated inspections

For each captured screenshot, run programmatic checks where possible:

- Text clipping: assert no `scrollWidth > clientWidth` on body text elements.
- Touch targets: assert interactive elements are ≥ 44×44px.
- Contrast: assert body text and metadata meet WCAG AA (4.5:1) using computed styles.
- Image loading: assert cover images have naturalWidth > 0.

If all automated checks pass, mark the section complete without user review. If a check fails, show only the failing screenshot and a concise description of the problem.

## Theme Checks

Automate with headless browser:

- [ ] Toggle theme and verify `data-theme` attribute updates.
- [ ] Read computed colors and assert contrast ≥ 4.5:1 for body and metadata.
- [ ] No pure `#fff` or `#000` background in any default theme.
- [ ] Theme preference persists after reload (`localStorage` value preserved).

## Reader Controls

Automate with headless browser:

- [ ] Previous chapter link navigates to the previous chapter.
- [ ] Next chapter link navigates to the next chapter.
- [ ] Dark mode toggle switches themes and persists.
- [ ] Reading position is saved and restored on return.

## Multilingual Checks

For each target language:

- [ ] `<html lang="xx">` is set correctly.
- [ ] Reader body uses the correct language font stack.
- [ ] No garbled CJK characters.

## Accessibility Checks

Run `axe-core` or equivalent programmatically:

- [ ] No interactive `<div>` or `<span>` without keyboard role.
- [ ] Icon-only buttons have `aria-label`.
- [ ] Focus outlines visible on keyboard-navigable elements.
- [ ] `user-scalable=no` is not present.

## Content and Copy Checks

Automated grep over build output:

- [ ] No "lorem ipsum", "Coming soon", "TODO", "[BOOK TITLE]" on rendered pages.
- [ ] No reader-visible copy mentions AI, Markdown, parser, prompt, or skill.
- [ ] Logo exists: `public/logo.png` (apiyi path) or `public/logo.svg` (SVG fallback).
- [ ] Favicon exists: `public/favicon-32x32.png` (apiyi path) or `public/favicon.svg` (SVG fallback).
- [ ] End-of-chapter and end-of-book states render correctly.

## Performance Spot Check

- [ ] Initial JS bundle is below 200KB gzipped.
- [ ] No uncompressed image over 200KB on the home page.
- [ ] No external font CDN requests on the reader page unless explicitly required.