# Story Cover

Load this reference when the user asks to generate a novel cover (封面, /story-cover, cover generation), or when Phase 3 of the pipeline is entered.

**Execution principle: invoke tools directly. Never surface a "please run X" prompt to the user mid-phase. Call the image generation tool, write the file, log the result — then move on.**

## Phase 3 Entry Check

Before generating any cover, verify Codex is available via Bash:

```bash
which codex >/dev/null 2>&1 && echo "CODEX_OK" || echo "CODEX_MISSING"
```

- If `CODEX_MISSING`: stop immediately and output:
  ```
  ERROR: Phase 3 (Cover) requires Codex CLI on PATH.
  Install: npm install -g @openai/codex — then re-enter Phase 3.
  ```
- If `CODEX_OK`: proceed to B1/B2/B3.

If a cover generation call fails at runtime (Codex auth error or unavailable), stop the batch and report the error. Do not fall back to any other image generation method.

## Modes

| Mode | When to use | What it generates |
|---|---|---|
| **Batch** | Initial site launch — all books written, Pre-Build Gate pending | Covers for every book in `content/` |
| **Single-book** | Adding one new book to an existing site | Cover for one book only (logo/favicon already exist) |

**Default to Batch mode at initial launch.** The Pre-Build Gate requires covers for all ≥5 books. Single-book mode is for incremental updates only.

---

## Batch Mode (initial launch)

### B1 — Discover all books

List every directory in `content/` that is NOT `content/short/` — short stories do not get standalone covers.

```bash
CONTENT_DIR="${CONTENT_DIR:-./content}"
BOOKS=()
for d in "$CONTENT_DIR"/*/; do
  [ -d "$d" ] && [ "$(basename "$d")" != "short" ] && BOOKS+=("$(basename "$d")")
done
printf 'Found %d books:\n' "${#BOOKS[@]}"
printf '  %s\n' "${BOOKS[@]}"
```

If fewer than 5 books are found, stop and return to the writing phase.

### B2 — Resolve pen name (no prompt)

Read the pen name from project files in this order — do not ask the user:

1. `src/lib/books.ts` → first book's `author` field
2. Any `content/{book}/world/worldbuilding.md` → first "Author" line
3. Any `content/{book}/tracking/context.md` → first "Pen name" line

If the pen name cannot be found in any of these files, substitute `"The Author"` as a placeholder and log a warning. Never stop the batch to ask.

### B3 — Generate cover for each book

For each book in `BOOKS`:
1. Read `content/{book-title}/world/worldbuilding.md` to extract genre and tone.
2. Run genre detection (Step 1.5 below) to select cover style.
3. Build the cover prompt (Step 2 below) substituting the book's title, genre, and characters.
4. **Call Codex** via `codex-plugin-cc`. Save output to `public/covers/{book-title}/cover/cover_v1.png`.
5. Log: `✓ {book-title} — cover saved`.

If Codex is unavailable, stop the batch and tell the user: "Cover generation requires Codex (`codex-plugin-cc`). Please ensure Codex is running and retry." Do not fall back to any other method.

### Batch completion checklist

Before handing off to Pre-Build Gate:

- [ ] `public/covers/{book-title}/cover/cover_v1.png` exists for every book in `BOOKS`

Any missing cover is a Pre-Build Gate failure — fix before starting Phase 5 (Stack). Site logo and favicon are generated later in Phase 6 (Design plan) — do not block on them here.

---

## Single-book mode

Use for adding one book to an already-launched site. Skip logo and favicon steps — they already exist.

## Generation Method

**Codex via `codex-plugin-cc` — the only accepted method.**

Call Codex image generation with the prompt from Step 2. Save the result to `public/covers/{book-title}/cover/cover_v1.png`. No API key needed.

If `codex-plugin-cc` is unavailable, stop and tell the user. Do not degrade to Claude native image generation, GPT-Image-2, or any other method. Cover images must be AI-generated via Codex — CSS placeholders are never acceptable as a final output.

## Environment Variables

| Variable | Required | Notes |
|---|---|---|
| `BOOK_DIR` | Yes | Output directory, e.g. `./public/covers/{book-title}` |

## Step 1 — Resolve required info (no prompt)

Must have before proceeding: **book title**, **author pen name**, **BOOK_DIR**.

Derive all three from project files:
- **Book title**: directory name under `content/`
- **Pen name**: see B2 resolution order above (`books.ts` → worldbuilding → context → placeholder)
- **BOOK_DIR**: `public/covers/{book-title}/`

Do not ask the user. Do not fabricate values that cannot be derived.

Cover ratio: **2:3 portrait** (`1024x1536`). This is the standard for self-hosted reading sites.

## Step 1.5 — Genre detection

Scan the book title (and synopsis if available) against the keyword table in `references/cover-styles.md`.
- One match → use it
- Multiple matches → priority order: 仙侠 > 西幻 > 古言 > 现言 > 都市 > 悬疑 > 科幻 > 历史 > 灵异 > 轻小说
- No match → default `都市`

## Step 2 — Build the prompt

All prompt text in English. Structure: text layer + style layer + visual layer.

```
Chinese web novel cover, [genre style from cover-styles.md].
Title text '{book-title}' at top center in [title font style for genre].
Author name '{pen-name}' at bottom center in [author name style for genre].
[genre style tags]. [character description]. [background description].
[color palette]. [lighting].
Professional book cover, high detail digital painting, portrait [ratio] ratio,
keep title and author name inside the central safe area (inner ~85%), no watermark
```

Title font styles and author name styles are in `references/cover-styles.md` per genre.
Offer 2–3 composition variants (close-up portrait / full body / pure scene) on first generation.

## Step 3 — Call Codex

Invoke `codex-plugin-cc` with the prompt from Step 2. Save the returned image to:

```
public/covers/{book-title}/cover/cover_v1.png
public/covers/{book-title}/cover/cover_v1.prompt.txt  ← save the prompt used
```

If the call fails, log the error and stop. Do not silently substitute a placeholder.

## Step 4 — Quality check

| Check | Standard |
|---|---|
| Title legible | Clear, font matches genre |
| Genre match | Visual style matches book |
| Composition | Subject prominent, text not blocking key art |
| Ratio correct | 2:3 portrait |

If unsatisfied: adjust composition variant, color palette, or character description and regenerate.

## Output location

```
public/covers/{book-title}/cover/cover_v1.png        ← served as /covers/{book-title}/cover/cover_v1.png
public/covers/{book-title}/cover/cover_v1.prompt.txt ← prompt used
```

Served from `public/` — no CDN needed. The site builder reads `Book.cover` as `/covers/{book-title}/cover/cover_v1.png`.

---

## Output Location

```
public/covers/{book-title}/cover/cover_v1.png        ← main cover, served as /covers/{book-title}/cover/cover_v1.png
public/covers/{book-title}/cover/cover_v1.prompt.txt ← prompt used
public/covers/{book-title}/cover/cover_v1_upload.png ← platform-cropped version (if UPLOAD_SIZE set)
```

Site logo and favicon are **not** part of this phase. They are generated in Phase 6 (Design plan) via `references/design-system.md`.
