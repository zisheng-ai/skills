# Story Cover

Load this reference when the user asks to generate a novel cover (封面, /story-cover, cover generation), or when Phase 3 of the pipeline is entered.

**Execution principle: invoke tools directly. Never surface a "please run X" prompt to the user mid-phase. Call the image generation tool, write the file, log the result — then move on.**

## Phase 3 Entry Check

Check whether `APIYI_API_KEY` is set to choose the generation path:

```bash
[ -n "$APIYI_API_KEY" ] && echo "API_PATH=apiyi" || echo "API_PATH=claude_svg"
```

- If set → **apiyi path**: call `https://api.apiyi.com/v1/images/generations` with `gpt-image-2-vip`.
- If not set → print a yellow warning, then use **Claude SVG fallback**:
  ```
  \033[33m⚠ WARNING: APIYI_API_KEY is not set. Falling back to SVG cover generation.\033[0m
  \033[33m  To enable photorealistic covers via gpt-image-2-vip, get an API key at:\033[0m
  \033[33m  https://api.apiyi.com/register/?aff_code=ijv5\033[0m
  \033[33m  Then set: export APIYI_API_KEY="your-key"\033[0m
  ```

Both paths produce a file at `{BOOK_DIR}/cover_v1.png` (or `.svg` for the fallback). Do not block the pipeline in either case.

## Modes

| Mode | When to use | What it generates |
|---|---|---|
| **Batch** | Initial site launch — all books written, Pre-Build Gate pending | Covers for every book in `content/` |
| **Single-book** | Adding one new book to an existing site | Cover for one book only (logo/favicon already exist) |

**Default to Batch mode at initial launch.** The Pre-Launch Gate requires covers for all ≥5 books. Single-book mode is for incremental updates only.

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

If fewer than 5 books are found, log a warning and continue with whatever books exist. Cover generation is not blocked by the book count — missing covers can be retried later.

### B2 — Resolve pen name (no prompt)

Read the pen name from project files in this order — do not ask the user:

1. Any `content/{book}/world/worldbuilding.md` → first "Author" line
2. Any `content/{book}/tracking/context.md` → first "Pen name" line
3. `src/lib/books.ts` → first book's `author` field (only exists after Phase 8 site build)

Note: `src/lib/books.ts` is generated during Phase 8 and will not exist when Phase 3 runs. Try it last, not first.

If the pen name cannot be found in any of these files, substitute `"The Author"` as a placeholder and log a warning. Never stop the batch to ask.

### B3 — Generate covers

For each book in `BOOKS`:
1. Read `content/{book-title}/world/worldbuilding.md` to extract genre and tone.
2. Run genre detection (Step 1.5 below) to select cover style.
3. Build the cover prompt (Step 2 below) substituting the book's title, genre, and characters.
4. Run Step 3 (apiyi curl or Claude SVG fallback).
5. Verify the output file exists.
6. Log: `✓ {book-title} — cover saved` or `⚠ {book-title} — cover skipped: {reason}`.

### Batch completion checklist

- [ ] Covers exist for as many books as possible.
- [ ] Any failed/skipped covers are logged with the book title and error reason.

Missing covers are not a hard blocker for site build — the site can use CSS placeholders during development. Re-run Phase 3 later if needed. Site logo and favicon are generated in Phase 6 (Design plan) — do not block on them here.

---

## Single-book mode

Use for adding one book to an already-launched site. Skip logo and favicon steps — they already exist.

## Generation Method

**apiyi path (preferred):** `curl` to `https://api.apiyi.com/v1/images/generations` with model `gpt-image-2-vip`. Response is base64 PNG, decoded and written to disk with Python. See Step 3.

**Claude SVG fallback:** When `APIYI_API_KEY` is not set, Claude writes a styled SVG cover directly. Acceptable as a launch asset when the API is unavailable.

## Environment Variables

| Variable | Required | Notes |
|---|---|---|
| `APIYI_API_KEY` | No | API key for `api.apiyi.com`. If unset, falls back to SVG cover. Get one at https://api.apiyi.com/register/?aff_code=ijv5 |
| `BOOK_DIR` | Yes | Output directory, e.g. `./public/covers/{book-title}` |

## Step 1 — Resolve required info (no prompt)

Must have before proceeding: **book title**, **author pen name**, **BOOK_DIR**.

Derive all three from project files:
- **Book title**: directory name under `content/`
- **Pen name**: see B2 resolution order above (worldbuilding → context → books.ts → placeholder)
- **BOOK_DIR**: `public/covers/{book-title}/`

Do not ask the user. Do not fabricate values that cannot be derived.

Cover ratio: **2:3 portrait**. Generate at `1024x1536` (smallest portrait size the API supports), then resize down to `480x720` for web delivery. The resized file is what goes into `public/covers/`.

Resize command after generation:
```bash
ffmpeg -i cover_v1_raw.png -vf scale=480:720 cover_v1.png -y
# fallback if ffmpeg unavailable:
sips -z 720 480 cover_v1_raw.png --out cover_v1.png
```

## Step 1.5 — Determine visual register and genre

**First: check the site-level visual register** (set during Phase 6 design plan, or derive from the site's dominant content type):
- If the site is drama/romance-dominant → **Cinematic Drama** register for all covers
- If the site is fantasy/sci-fi-dominant → **Dark Fantasy Illustration** register for all covers
- Record the register and apply it consistently across all books on this site

**Then: detect per-book genre** by scanning the book title (and synopsis if available) against the keyword table in `references/cover-styles.md`.
- One match → use it
- Multiple matches → priority order: 仙侠 > 西幻 > 古言 > 现言 > 都市 > 悬疑 > 科幻 > 历史 > 灵异 > 轻小说
- No match → default to the site's primary genre

The genre determines composition template, color palette, character design, and typography style. The visual register determines render quality language (photorealistic film-still vs. hyperrealistic 3D render).

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

## Step 3 — Generate cover

### apiyi path (APIYI_API_KEY is set)

```bash
BOOK_DIR="public/covers/{book-title}"
mkdir -p "$BOOK_DIR"
PROMPT="{full-prompt-from-step-2}"

IMAGE_URL=$(curl -s https://api.apiyi.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $APIYI_API_KEY" \
  -d "{
    \"model\": \"gpt-image-2-vip\",
    \"prompt\": $(echo "$PROMPT" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read().strip()))'),
    \"n\": 1,
    \"size\": \"1024x1536\"
  }" | python3 -c "import sys,json; print(json.load(sys.stdin)['data'][0]['url'])")

curl -s "$IMAGE_URL" -o "$BOOK_DIR/cover_v1_raw.png"
```

After generation:
```bash
# Resize to 480×720 for web delivery
ffmpeg -i "$BOOK_DIR/cover_v1_raw.png" -vf scale=480:720 "$BOOK_DIR/cover_v1.png" -y \
  || sips -z 720 480 "$BOOK_DIR/cover_v1_raw.png" --out "$BOOK_DIR/cover_v1.png"
rm "$BOOK_DIR/cover_v1_raw.png"
```

Write the prompt to `$BOOK_DIR/cover_v1.prompt.txt`.

On API error: log the response body, skip this book, continue.

### Claude SVG fallback (APIYI_API_KEY not set)

Claude writes a styled SVG cover directly. Size: 480×720 viewBox. Must include:
- Genre-appropriate background gradient (from `cover-styles.md` color palette)
- Book title in large centered text with genre font style
- Author name in smaller text at bottom
- A simple symbolic motif (sword, lotus, city silhouette, etc.) as an SVG shape or path

Output path: `{BOOK_DIR}/cover_v1.svg`

Log per book: `\033[33m⚠ SVG fallback — {book-title}\033[0m`

### B3 batch flow

For each book in `BOOKS`, run Steps 1–3 in sequence. Build the prompt inline per book — do not pre-build a map:

```bash
for bookSlug in "${BOOKS[@]}"; do
  BOOK_DIR="public/covers/${bookSlug}"
  # Steps 1.5 + 2: detect genre, build PROMPT string for this book
  PROMPT="$(build_cover_prompt "$bookSlug")"  # inline per Step 2 template
  # Step 3: apiyi curl or SVG fallback
done
```

`build_cover_prompt` is not a real function — it represents executing Steps 1.5 and 2 inline for each book before the curl call.

## Step 4 — Quality check

| Check | Standard |
|---|---|
| Title legible | Clear, font matches genre |
| Genre match | Visual style matches book |
| Composition | Subject prominent, text not blocking key art |
| Ratio correct | 2:3 portrait |

**Automated pass criteria (unattended):** If `{BOOK_DIR}/cover_v1.png` exists and has portrait dimensions (height > width), mark as passed automatically. Do not regenerate unless the file is missing or obviously corrupt (0 bytes). If regeneration is needed, retry once with the same prompt; on second failure, skip and log the book as needing manual cover review.

## Output Location

```
public/covers/{book-title}/cover_v1.png        ← main cover, served as /covers/{book-title}/cover_v1.png
public/covers/{book-title}/cover_v1.prompt.txt ← prompt used
```

Served from `public/` — no CDN needed. The site builder reads `Book.cover` as `/covers/{book-title}/cover_v1.png`.

Site logo and favicon are **not** part of this phase. They are generated in Phase 6 (Design plan) via `references/design-system.md`.
