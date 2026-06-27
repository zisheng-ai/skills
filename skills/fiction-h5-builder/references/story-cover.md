# Story Cover

Load this reference when the user asks to generate a novel cover (封面, /story-cover, cover generation).

## Generation Method

**Primary — Codex via `codex-plugin-cc` (no API key needed):**
Delegate image generation to Codex using the `codex-plugin-cc` plugin installed in this environment. Build the prompt using Steps 1–2 below, then invoke Codex image generation. Save the result to `covers/<书名>/封面/封面_v1.png`.

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
| `UPLOAD_SIZE` | No | — | Platform exact pixels (e.g. `600x800` for 番茄); Step 3.5 center-crops to this |
| `BOOK_DIR` | Yes | — | Output directory, e.g. `./covers/<书名>` |
| `REF_IMAGE` | No | — | Local path or URL for image-to-image mode |

## Step 1 — Collect required info

Must have before proceeding: **book title**, **author pen name**, **target platform**, **BOOK_DIR**.
If any is missing, ask once — do not fabricate.

Platform → size mapping:

| Platform | Upload size | Ratio | GPT_IMAGE_SIZE |
|---|---|---|---|
| 番茄小说 | 600×800 | 3:4 | `768x1024` |
| Others (default) | Per spec | 2:3 | `1024x1536` |

## Step 1.5 — Genre detection

Scan the book title (and synopsis if available) against the keyword table in `references/cover-styles.md`.
- One match → use it
- Multiple matches → priority order: 仙侠 > 西幻 > 古言 > 现言 > 都市 > 悬疑 > 科幻 > 历史 > 灵异 > 轻小说
- No match → default `都市`

## Step 2 — Build the prompt

All prompt text in English. Structure: text layer + style layer + visual layer.

```
Chinese web novel cover, [platform style from cover-styles.md].
Title text '{书名}' at top center in [title font style for genre].
Author name '{笔名}' at bottom center in [author name style for genre].
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

mkdir -p "$BOOK_DIR/封面"
i=1; while [ -f "$BOOK_DIR/封面/封面_v${i}.png" ]; do i=$((i+1)); done
OUT="$BOOK_DIR/封面/封面_v${i}.png"
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
file "$OUT"; ls -lt "$BOOK_DIR/封面/"
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

## Step 3.5 — Export platform upload size (when UPLOAD_SIZE is set)

Center-crop and scale to exact pixels. Does not depend on proxy honoring `GPT_IMAGE_SIZE`.

```bash
SRC="$OUT"; TARGET="${UPLOAD_SIZE:-}"; UP="${SRC%.png}_上传.png"
W="${TARGET%x*}"; H="${TARGET#*x}"
if [ -n "$TARGET" ] && [ -f "$SRC" ]; then
  if command -v magick >/dev/null 2>&1; then
    magick "$SRC" -resize "${W}x${H}^" -gravity center -extent "${W}x${H}" "$UP"
  elif command -v sips >/dev/null 2>&1; then
    cp "$SRC" "$UP"
    sw=$(sips -g pixelWidth "$UP" | awk '/pixelWidth/{print $NF}')
    sh=$(sips -g pixelHeight "$UP" | awk '/pixelHeight/{print $NF}')
    if [ $((sw*H)) -ge $((sh*W)) ]; then sips --resampleHeight "$H" "$UP" >/dev/null
    else sips --resampleWidth "$W" "$UP" >/dev/null; fi
    sips -c "$H" "$W" "$UP" >/dev/null
  fi
  [ -f "$UP" ] && file "$UP"
fi
```

## Step 4 — Quality check

| Check | Standard |
|---|---|
| Title legible | Clear, font matches genre |
| Genre match | Visual style matches book |
| Composition | Subject prominent, text not blocking key art |
| Platform fit | Ratio correct; upload size shows title/author unclipped |

If unsatisfied: adjust composition variant, color palette, or character description and regenerate.

## Output location

```
covers/<书名>/封面/封面_v1.png        ← main output
covers/<书名>/封面/封面_v1.prompt.txt ← prompt used
covers/<书名>/封面/封面_v1_上传.png   ← platform-cropped version (if UPLOAD_SIZE set)
```

The site builder reads `covers/<书名>/封面/封面_v1.png` as `Book.cover`.
