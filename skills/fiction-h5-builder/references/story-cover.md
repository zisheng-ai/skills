# Story Cover

Load this reference when the user asks to generate a novel cover (封面, /story-cover, cover generation), or when Phase 3 of the pipeline is entered.

**Execution principle: invoke tools directly. Never surface a "please run X" prompt to the user mid-phase. Call the image generation tool, write the file, log the result — then move on.**

## Phase 3 Entry Check

Before generating any cover, verify Codex is installed and authenticated:

```bash
[ -f "$HOME/.codex/auth.json" ] && echo "CODEX_OK" || echo "CODEX_MISSING"
```

- If `CODEX_OK`: proceed to B1/B2/B3.
- If `CODEX_MISSING`: log a warning and skip Phase 3. Do not block the rest of the pipeline.
  ```
  WARNING: Codex not authenticated. Skipping cover generation.
  Run 'codex' once to authenticate, then re-run /story-cover.
  ```

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

### B3 — Generate covers sequentially via companion script

Run one `codex-companion.mjs task` call per book. Codex image generation is inherently sequential (one session at a time), so books are processed one after another. Extract the image from the session log immediately after each call completes.

For each book in `BOOKS`:
1. Read `content/{book-title}/world/worldbuilding.md` to extract genre and tone.
2. Run genre detection (Step 1.5 below) to select cover style.
3. Build the cover prompt (Step 2 below) substituting the book's title, genre, and characters.
4. Record timestamp, call companion script, extract from session log (see Step 3 for full commands).
5. Verify the output file exists.
6. Log: `✓ {book-title} — cover saved` or `⚠ {book-title} — cover skipped: {reason}`.

If Codex is not authenticated, log the failure and skip Phase 3 entirely. Missing covers can be retried later.

### Batch completion checklist

- [ ] Covers exist for as many books as possible.
- [ ] Any failed/skipped covers are logged with the book title and error reason.

Missing covers are not a hard blocker for site build — the site can use CSS placeholders during development. Re-run Phase 3 later when Codex is available. Site logo and favicon are generated in Phase 6 (Design plan) — do not block on them here.

---

## Single-book mode

Use for adding one book to an already-launched site. Skip logo and favicon steps — they already exist.

## Generation Method

Call `codex-companion.mjs task` directly with `--fresh` and an explicit `image_gen` instruction. Do not read files or search the filesystem. After the call completes, extract the base64 image from the Codex session log and write it to disk (see Step 3 for full commands).

If Codex is not authenticated or the call fails, skip this cover and continue. CSS placeholders are acceptable only during development, never as a final launch asset.

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

## Step 3 — Generate cover via Codex image_gen + session log extraction

**How it works:** Codex's `image_gen` tool stores the generated image as base64 in the session log (`~/.codex/sessions/.../*.jsonl`) under the `image_generation_end` event's `result` field — even when Codex itself cannot write it to disk. We call Codex to generate the image, then immediately extract the base64 from the session log and decode it to a file.

### Single-book flow

```bash
# 1. Record the current time as extraction anchor
BEFORE_TS=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
TODAY=$(date +"%Y/%m/%d")
SESSION_DIR="$HOME/.codex/sessions/$TODAY"

# 2. Run Codex image generation (use companion script)
node "$HOME/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs" task \
  "--fresh Use image_gen directly. Do not read any files or explore. Generate a 1024x1536 portrait PNG book cover. {full-prompt-from-step-2}" \
  --write

# 3. Extract base64 from the session log written after BEFORE_TS
mkdir -p {BOOK_DIR}/cover
python3 - <<'PY'
import os, json, base64, glob, sys
from datetime import datetime, timezone

before = datetime.fromisoformat("$BEFORE_TS".replace('Z', '+00:00'))
session_dir = os.path.expanduser("$SESSION_DIR")
out_path = "{BOOK_DIR}/cover/cover_v1_raw.png"

# Find session logs modified after we started
logs = sorted(glob.glob(f"{session_dir}/*.jsonl"), key=os.path.getmtime, reverse=True)
for log_path in logs[:5]:
    mtime = datetime.fromtimestamp(os.path.getmtime(log_path), tz=timezone.utc)
    if mtime < before:
        continue
    with open(log_path) as f:
        for line in f:
            try:
                d = json.loads(line)
                p = d.get('payload', {})
                if p.get('type') == 'image_generation_end' and p.get('result'):
                    img = base64.b64decode(p['result'])
                    os.makedirs(os.path.dirname(out_path), exist_ok=True)
                    with open(out_path, 'wb') as out:
                        out.write(img)
                    print(f"saved {len(img)} bytes to {out_path}")
                    sys.exit(0)
            except Exception:
                pass

print("ERROR: image_generation_end event not found in recent session logs")
sys.exit(1)
PY
```

### Multi-book batch flow

Generate one book at a time (Codex sessions are sequential) but keep the extraction loop tight so total wall time is mainly generation time:

```bash
for bookSlug in "${BOOKS[@]}"; do
  BEFORE_TS=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  node "$HOME/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs" task \
    "--fresh Use image_gen directly. Do not read any files. Generate 1024x1536 portrait PNG cover for '${bookSlug}'. ${resolvedPrompts[$bookSlug]}" \
    --write
  # extract immediately after each generation
  python3 extract_cover.py "$BEFORE_TS" "public/covers/${bookSlug}/cover/cover_v1_raw.png"
done
```

Where `extract_cover.py` is the extraction logic from the single-book flow above, parameterized on `$1` (before timestamp) and `$2` (output path).

### After extraction

1. Verify `{BOOK_DIR}/cover/cover_v1_raw.png` exists (non-zero bytes).
2. Resize to 480×720 for web delivery:
   ```bash
   ffmpeg -i "{BOOK_DIR}/cover/cover_v1_raw.png" -vf scale=480:720 "{BOOK_DIR}/cover/cover_v1.png" -y \
     || sips -z 720 480 "{BOOK_DIR}/cover/cover_v1_raw.png" --out "{BOOK_DIR}/cover/cover_v1.png"
   ```
3. Remove raw file: `rm "{BOOK_DIR}/cover/cover_v1_raw.png"`
4. Write prompt text to `{BOOK_DIR}/cover/cover_v1.prompt.txt`.
5. On failure: log and skip. Do not block the pipeline.

If the call fails, log the error, skip this book's cover, and continue with the next book. Do not silently substitute a placeholder, and do not block the pipeline on a single failure.

## Step 4 — Quality check

| Check | Standard |
|---|---|
| Title legible | Clear, font matches genre |
| Genre match | Visual style matches book |
| Composition | Subject prominent, text not blocking key art |
| Ratio correct | 2:3 portrait |

**Automated pass criteria (unattended):** If `{BOOK_DIR}/cover/cover_v1.png` exists and has portrait dimensions (height > width), mark as passed automatically. Do not regenerate unless the file is missing or obviously corrupt (0 bytes). If regeneration is needed, retry once with the same prompt; on second failure, skip and log the book as needing manual cover review.

## Output Location

```
public/covers/{book-title}/cover/cover_v1.png        ← main cover, served as /covers/{book-title}/cover/cover_v1.png
public/covers/{book-title}/cover/cover_v1.prompt.txt ← prompt used
```

Served from `public/` — no CDN needed. The site builder reads `Book.cover` as `/covers/{book-title}/cover/cover_v1.png`.

Site logo and favicon are **not** part of this phase. They are generated in Phase 6 (Design plan) via `references/design-system.md`.
