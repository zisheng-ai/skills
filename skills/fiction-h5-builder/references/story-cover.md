# Story Cover

Load this reference when the user asks to generate a novel cover (封面, /story-cover, cover generation), or when Phase 3 of the pipeline is entered.

**Execution principle: invoke tools directly. Never surface a "please run X" prompt to the user mid-phase. Call the image generation tool, write the file, log the result — then move on.**

## Phase 3 Entry Check

**MANDATORY — run this bash command before anything else. Do not skip it. Do not assume the result.**

```bash
[ -n "$APIYI_API_KEY" ] && echo "API_PATH=apiyi" || echo "API_PATH=claude_svg"
```

**If the output is `API_PATH=apiyi` → you MUST use the apiyi curl path below. Generating SVG when the key is present is wrong.**

If the output is `API_PATH=claude_svg` → print the warning below, then use the SVG fallback:
```
\033[33m⚠ WARNING: APIYI_API_KEY is not set. Falling back to SVG cover generation.\033[0m
\033[33m  To enable photorealistic covers via gpt-image-2-vip, get an API key at:\033[0m
\033[33m  https://api.apiyi.com/register/?aff_code=ijv5\033[0m
\033[33m  Then set: export APIYI_API_KEY="your-key"\033[0m
```

Both paths produce a file at `{BOOK_DIR}/cover_v1.png` (or `.svg` for the SVG fallback). Do not block the pipeline in either case.

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

Output path: `public/covers/{book-title}/cover/cover_v1.png` — note the `cover/` subdirectory. Create it with `mkdir -p`.

Resize command after generation:
```bash
ffmpeg -i cover_v1_raw.png -vf scale=480:720 cover_v1.png -y
# fallback if ffmpeg unavailable:
sips -z 720 480 cover_v1_raw.png --out cover_v1.png
```

## Step 1.5 — Determine visual register and genre

**First: check the site-level visual register** (set during Phase 6 design plan, or derive from the site's dominant content type):
- English dark romance / paranormal / vampire / shifter / billionaire → **Dark Romance Editorial** register
- Chinese 都市/现言/悬疑/古言 content → **Cinematic Drama** register
- Chinese 玄幻/仙侠/西幻/科幻 content → **Dark Fantasy Illustration** register
- Record the register and apply it consistently across all books on this site

**Then: detect per-book genre** by scanning the book title (and synopsis if available) against the keyword table in `references/cover-styles.md`.
- EN keywords first (vampire/blood/alpha/billionaire/duke/lord/fated/obsession etc.) → Dark Romance subgenre
- ZH keywords → priority order: 仙侠 > 西幻 > 古言 > 现言 > 都市 > 悬疑 > 科幻 > 历史 > 灵异 > 轻小说
- No match → default to the site's primary genre

**Then: select the composition template** from `references/cover-styles.md` for the detected genre. This step is mandatory — the template determines whether the cover has one or two characters, and what their physical relationship is. Record it before building the prompt.

| Register | Composition options | Default for romance |
|---|---|---|
| Dark Romance Editorial | Possessive Hold, Almost Kiss, After Dark, Intimate Tension | Possessive Hold |
| Cinematic Drama | Power Inversion, Intimate Tension, Rain Shelter, Grand Humiliation | Intimate Tension |
| Dark Fantasy Illustration | Lone Hero, Duo Confrontation | Duo Confrontation for romance arcs |

The genre determines composition template, color palette, character design, and typography style. The visual register determines render quality language.

**For romance genres: allure elements are MANDATORY, not optional.** Load `references/cover-allure-elements.md` and apply the highest-intensity pose from the appropriate genre section. The target is maximum implication within gpt-image-2-vip policy — bodies pressed together, visible skin, explicit physical contact (grip, hold, almost-kiss). A cover where two people are simply standing near each other fails this gate.

- **English romance genres (Dark Romance, Billionaire, Paranormal, Shifter, Vampire, Fantasy Romance, Mafia, Sports, Contemporary):** use Section 六 (English Romance Playbook). Pick the genre-specific prompt formula, select the highest-intensity pose that fits the book's synopsis, and follow the Escalation Strategy if the output looks tame.
- **Chinese web novel genres (都市/现言/甜宠/轻小说):** use Sections 一–三 (uniform types, 壁咚, rain-soaked, bedside morning).

## Step 2 — Build the prompt

All prompt text in English. Structure: register layer + composition layer + character layer + style layer + text layer.

**Step 2a — Choose character count from composition template:**
- Possessive Hold, Almost Kiss, Intimate Tension, Rain Shelter, Power Inversion, Duo Confrontation, Grand Humiliation → **two characters**; describe both explicitly
- Lone Hero, After Dark → **one character**

**Step 2b — Assemble prompt:**

```
[register opening phrase], [composition template description from cover-styles.md].
[character 1 description: gender, position, expression, clothing, key physical detail].
[character 2 description if two-character template: gender, position relative to character 1, expression, clothing].
[background scene: specific location with 2-3 atmospheric details].
[color palette from genre section]. [lighting from genre section].
[genre quality keywords from cover-styles.md].
Title text '{book-title}' [placement: lower third / top center / negative space between figures] in [title font style for genre].
Author name '{pen-name}' [placement] in [author name style for genre].
Professional book cover, photorealistic, portrait orientation 2:3 ratio 1024x1536,
keep title and author name inside the central safe area (inner 85%), no watermark, no extra limbs
```

**Register opening phrases:**
- Dark Romance Editorial: `"Dark romance editorial photography, moody jewel-toned atmosphere,"`
- Cinematic Drama: `"Cinematic photorealistic drama, film-still quality,"`
- Dark Fantasy Illustration: `"Hyperrealistic dark fantasy 3D render,"`

**Two-character prompt discipline:** When the template calls for two characters, both must appear in the prompt with explicit positional language — "male figure standing behind her," "their faces a breath apart," "his hand at her waist." Do not use vague phrases like "a couple" or "two people." Vague character descriptions default to single-character generation.

## Step 3 — Generate cover

### apiyi path (APIYI_API_KEY is set)

```bash
BOOK_DIR="public/covers/{book-title}/cover"
mkdir -p "$BOOK_DIR"

# Write prompt to a temp file to avoid bash variable escaping issues with long strings
PROMPT_FILE=$(mktemp)
cat > "$PROMPT_FILE" << 'PROMPT_CONTENT'
{full-prompt-from-step-2}
PROMPT_CONTENT

PROMPT_JSON=$(python3 -c "import json; print(json.dumps(open('$PROMPT_FILE').read().strip()))")

RESPONSE=$(curl -s --max-time 180 https://api.apiyi.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $APIYI_API_KEY" \
  -d "{\"model\":\"gpt-image-2-vip\",\"prompt\":$PROMPT_JSON,\"n\":1,\"size\":\"1024x1536\"}")

rm -f "$PROMPT_FILE"

# API returns b64_json (not a URL). Decode and write directly.
python3 -c "
import sys, json, base64
r = json.load(sys.stdin)
if 'data' not in r:
    msg = r.get('error', {}).get('message', str(r))
    print('API_ERROR: ' + msg)
    exit(1)
b64 = r['data'][0].get('b64_json', '')
if b64:
    open('$BOOK_DIR/cover_v1_raw.png', 'wb').write(base64.b64decode(b64))
    print('SAVED_B64')
else:
    # fallback: URL path
    url = r['data'][0].get('url', '')
    print('URL: ' + url)
" <<< "$RESPONSE"
```

After generation:
```bash
# Resize to 480×720 for web delivery
ffmpeg -i "$BOOK_DIR/cover_v1_raw.png" -vf scale=480:720 "$BOOK_DIR/cover_v1.png" -y \
  || sips -z 720 480 "$BOOK_DIR/cover_v1_raw.png" --out "$BOOK_DIR/cover_v1.png"
rm -f "$BOOK_DIR/cover_v1_raw.png"
```

Write the prompt to `$BOOK_DIR/cover_v1.prompt.txt`.

**On API error:**
- If error contains `safety_violations=[sexual]`: the prompt triggered the content filter. Rewrite the prompt — remove explicit proximity language ("hand at her waist", "breath apart", "sensual") and replace with mood/atmosphere language ("dramatic tension between them", "powerful emotional stakes"). Retry once with the toned-down prompt.
- On any other error: log the full response, skip this book, continue batch.

### Claude SVG fallback (APIYI_API_KEY not set — confirmed by entry check)

**Only enter this section if the entry check above returned `API_PATH=claude_svg`. If APIYI_API_KEY is set, go back and use the apiyi curl path.**

Claude writes a styled SVG cover directly. Size: 480×720 viewBox. Must include:
- Genre-appropriate background gradient (from `cover-styles.md` color palette)
- Book title in large centered text with genre font style
- Author name in smaller text at bottom
- A simple symbolic motif (sword, lotus, city silhouette, etc.) as an SVG shape or path

Output path: `{BOOK_DIR}/cover_v1.svg`

Log per book: `\033[33m⚠ SVG fallback — {book-title}\033[0m`

### B3 batch flow

For each book in `BOOKS`, run Steps 1–3 in sequence. Write each prompt to a temp file before passing to curl — do not inline long prompts in bash variables (escaping fails silently):

```bash
for bookSlug in "${BOOKS[@]}"; do
  BOOK_DIR="public/covers/${bookSlug}/cover"
  mkdir -p "$BOOK_DIR"
  # Steps 1.5 + 2: detect genre, select composition template, build prompt
  # Write prompt to temp file, then pass via python3 json.dumps() — not via bash variable
  # Step 3: apiyi curl (b64_json decode) or SVG fallback
done
```

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
