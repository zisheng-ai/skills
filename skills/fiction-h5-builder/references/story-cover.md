# Story Cover

Load this reference when the user asks to generate a novel cover (封面, /story-cover, cover generation), or when Phase 3 of the pipeline is entered.

**Execution principle: invoke tools directly. Never surface a "please run X" prompt to the user mid-phase. Call the image generation tool, write the file, log the result — then move on.**

## Phase 3 Entry Check

Before generating any cover, verify the `codex@openai-codex` plugin is installed and enabled:

```bash
claude plugin list 2>/dev/null | grep -A3 "codex@openai-codex" | grep "Status:" || echo "PLUGIN_MISSING"
```

- If the output shows `Status: ✔ enabled`: proceed to B1/B2/B3.
- If the output shows `Status: ✘ disabled`: enable it silently without prompting the user:
  ```bash
  claude plugin enable codex@openai-codex
  ```
  Then rerun the check.
- If the output shows `PLUGIN_MISSING` (plugin not installed): install it silently without prompting the user:
  ```bash
  claude plugin marketplace add openai/codex-plugin-cc && claude plugin install codex@openai-codex && claude plugin enable codex@openai-codex
  ```
  Then rerun the check.
- If after installation/enable the plugin is still not enabled, **log a warning and skip Phase 3**. Do not block the rest of the pipeline. Output:
  ```
  WARNING: Codex plugin could not be enabled. Skipping cover generation.
  Re-enter Phase 3 later after installing/enabling codex@openai-codex.
  ```

Do not fall back to any other image generation method.

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

If fewer than 5 books are found, log a warning and continue with whatever books exist. Cover generation is not blocked by the book count — missing covers can be retried later.

### B2 — Resolve pen name (no prompt)

Read the pen name from project files in this order — do not ask the user:

1. `src/lib/books.ts` → first book's `author` field
2. Any `content/{book}/world/worldbuilding.md` → first "Author" line
3. Any `content/{book}/tracking/context.md` → first "Pen name" line

If the pen name cannot be found in any of these files, substitute `"The Author"` as a placeholder and log a warning. Never stop the batch to ask.

### B3 — Generate covers in one batch

Spawn **one** Codex task that generates all covers in parallel. Passing the full book list in a single delegation avoids the per-call overhead of spawning one task per book.

Build a single prompt that lists every book with its title, genre/style tags, and pen name. Ask Codex to generate all `public/covers/{book-title}/cover/cover_v1.png` files and all corresponding `.prompt.txt` files.

Example task text:

```
Generate book covers for the following novels. Each cover must be 1024x1536 portrait PNG.
Save each image to the exact path shown and write the prompt used to the matching .prompt.txt file.

1. Title: {title-1} | Author: {pen-name} | Genre/style: {style-1} | Output: public/covers/{slug-1}/cover/cover_v1.png
2. Title: {title-2} | Author: {pen-name} | Genre/style: {style-2} | Output: public/covers/{slug-2}/cover/cover_v1.png
...
```

After Codex returns, verify each expected file exists. Log `✓ {book-title} — cover saved` for each successful cover and `⚠ {book-title} — cover skipped: {reason}` for any failure.

If the Codex plugin is unavailable, log the failure and skip Phase 3 entirely. Missing covers can be retried later.

### Batch completion checklist

- [ ] Covers exist for as many books as possible.
- [ ] Any failed/skipped covers are logged with the book title and error reason.

Missing covers are not a hard blocker for site build — the site can use CSS placeholders during development. Re-run Phase 3 later when the Codex plugin is fully available. Site logo and favicon are generated in Phase 6 (Design plan) — do not block on them here.

---

## Single-book mode

Use for adding one book to an already-launched site. Skip logo and favicon steps — they already exist.

## Generation Method

**Codex via the `codex@openai-codex` Claude Code plugin — preferred method.**

Delegate the cover generation task to Codex using the plugin. Codex will use its built-in `imagegen` capability with the prompt from Step 2. Save the result to `public/covers/{book-title}/cover/cover_v1.png`.

If the plugin is unavailable or the call fails, skip this cover and continue. Do not degrade to Claude native image generation, GPT-Image-2, or any other method during the main pipeline. A skipped cover can be retried later by re-entering Phase 3. CSS placeholders are acceptable only during development, never as a final launch asset.

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

Use the installed `codex@openai-codex` plugin to delegate cover generation to Codex. Codex will use its built-in `imagegen` capability to produce the cover.

Preferred invocation (when `codex-companion.mjs` is available):

```bash
node "$HOME/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs" task \
  "Generate a 1024x1536 portrait PNG book cover for a Chinese web novel. Title: '{book-title}'. Author: '{pen-name}'. Genre/style: {genre-style}. {prompt-body}. Save the final image to {BOOK_DIR}/cover/cover_v1.png and also write the exact prompt used to {BOOK_DIR}/cover/cover_v1.prompt.txt." \
  --write
```

If the exact path to `codex-companion.mjs` differs in this environment, locate it with:

```bash
find "$HOME/.claude/plugins/cache/openai-codex" -name codex-companion.mjs | head -1
```

Codex may return the image directly or write it to a temporary cache path. After the task completes:
1. Verify `{BOOK_DIR}/cover/cover_v1.png` exists and has portrait dimensions near 1024x1536.
2. If Codex wrote the image to a different path, copy it to `{BOOK_DIR}/cover/cover_v1.png`.
3. Save the prompt text to `{BOOK_DIR}/cover/cover_v1.prompt.txt`.

If the call fails, log the error, skip this book's cover, and continue with the next book. Do not silently substitute a placeholder, and do not block the pipeline on a single failure.

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
