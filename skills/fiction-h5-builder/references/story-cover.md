# Story Cover

Load this reference when the user asks to generate a novel cover (封面, /story-cover, cover generation), or when Phase 3 of the pipeline is entered.

**Execution principle: invoke tools directly. Never surface a "please run X" prompt to the user mid-phase. Call the image generation tool, write the file, log the result — then move on.**

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
4. **Delegate to Codex** via `codex-plugin-cc`. Save output to `public/covers/{book-title}/cover/cover_v1.png`.
5. Log: `✓ {book-title} — cover saved`.

If Codex is unavailable, fall back to Claude Code native image generation for that book. Continue to the next book regardless — log failures and fix at the end, do not stop the batch.

### Batch completion checklist

Before handing off to Pre-Build Gate:

- [ ] `public/covers/{book-title}/cover/cover_v1.png` exists for every book in `BOOKS`

Any missing cover is a Pre-Build Gate failure — fix before starting Phase 5 (Stack). Site logo and favicon are generated later in Phase 6 (Design plan) — do not block on them here.

---

## Single-book mode

Use for adding one book to an already-launched site. Skip logo and favicon steps — they already exist.

## Generation Method

**Primary — Codex via `codex-plugin-cc` (no API key needed):**
Delegate image generation to Codex using the `codex-plugin-cc` plugin installed in this environment. Build the prompt using Steps 1–2 below, then invoke Codex image generation. Save the result to `public/covers/{book-title}/cover/cover_v1.png`.

**Secondary — Claude native image generation:**
Use Claude's built-in image generation tool directly if `codex-plugin-cc` is unavailable. Build the same prompt from Steps 1–2 and call the image generation tool.

**Fallback — GPT-Image-2 via API (requires `GPT_IMAGE_API_KEY`):**
Use Steps 3–3.5 below only when the user explicitly requests GPT-Image-2 and provides the key.

## Environment Variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `GPT_IMAGE_API_KEY` | No (GPT-Image-2 fallback only) | — | OpenAI or compatible proxy key; not needed for primary Codex/Claude paths |
| `GPT_IMAGE_BASE_URL` | No | `https://api.openai.com/v1` | Override for proxy |
| `GPT_IMAGE_MODEL` | No | `gpt-image-2` | Override only for testing |
| `GPT_IMAGE_SIZE` | No | `1024x1536` | Target ratio hint — many proxies ignore it; Step 3.5 crops to exact size |
| `BOOK_DIR` | Yes | — | Output directory, e.g. `./public/covers/{book-title}` |
| `REF_IMAGE` | No | — | Local path or URL for image-to-image mode |

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

## Step 3 — Call the API

`gpt-image-2` always returns base64. Do NOT include `response_format` in the request body.

### Text-to-image (default — no REF_IMAGE set)

```bash
set -euo pipefail
: "${GPT_IMAGE_API_KEY:?Set GPT_IMAGE_API_KEY first}"
: "${PROMPT:?Set PROMPT first}"
BASE_URL="${GPT_IMAGE_BASE_URL:-https://api.openai.com/v1}"
MODEL="${GPT_IMAGE_MODEL:-gpt-image-2}"
SIZE="${GPT_IMAGE_SIZE:-1024x1536}"
BOOK_DIR="${BOOK_DIR:?Set BOOK_DIR first}"

mkdir -p "$BOOK_DIR/cover"
i=1; while [ -f "$BOOK_DIR/cover/cover_v${i}.png" ]; do i=$((i+1)); done
OUT="$BOOK_DIR/cover/cover_v${i}.png"
RESP=$(mktemp); trap 'rm -f "$RESP"' EXIT

BODY=$(jq -n --arg m "$MODEL" --arg p "$PROMPT" --arg s "$SIZE" \
  '{model:$m,prompt:$p,size:$s}')

curl -fsS --max-time 180 --retry 2 --retry-delay 5 \
  "$BASE_URL/images/generations" \
  -H "Authorization: Bearer $GPT_IMAGE_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$BODY" > "$RESP"

jq -e '.error' "$RESP" >/dev/null 2>&1 && { jq '.error' "$RESP" >&2; exit 1; }
jq -er '.data[0].b64_json // empty' "$RESP" | base64 --decode > "$OUT"
[ -s "$OUT" ] || { echo "empty output" >&2; exit 1; }
printf '%s\n' "$PROMPT" > "${OUT%.png}.prompt.txt"
file "$OUT"; ls -lt "$BOOK_DIR/cover/"
```

### Image-to-image (REF_IMAGE is set)

Uses `/v1/images/edits` with `multipart/form-data`. Replace the curl call above with:

```bash
REF_LOCAL="$REF_IMAGE"
case "$REF_IMAGE" in http://*|https://*)
  REF_TMP=$(mktemp); curl -fsSL --max-time 60 -o "$REF_TMP" "$REF_IMAGE"; REF_LOCAL="$REF_TMP" ;;
esac

curl -fsS --max-time 240 --retry 2 --retry-delay 5 \
  "$BASE_URL/images/edits" \
  -H "Authorization: Bearer $GPT_IMAGE_API_KEY" \
  --form-string "model=$MODEL" --form-string "size=$SIZE" --form-string "prompt=$PROMPT" \
  -F "image=@$REF_LOCAL" > "$RESP"
```

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
public/covers/{book-title}/cover/cover_v1.prompt.txt ← prompt used (for iteration reference)
```

All assets live in `public/` inside the project. No CDN or external upload required. The site builder reads `Book.cover` as `/covers/{book-title}/cover/cover_v1.png` (URL path, served from `public/`).

---

## Output Location

```
public/covers/{book-title}/cover/cover_v1.png        ← main cover, served as /covers/{book-title}/cover/cover_v1.png
public/covers/{book-title}/cover/cover_v1.prompt.txt ← prompt used
public/covers/{book-title}/cover/cover_v1_upload.png ← platform-cropped version (if UPLOAD_SIZE set)
```

Site logo and favicon are **not** part of this phase. They are generated in Phase 6 (Design plan) via `references/design-system.md`.
