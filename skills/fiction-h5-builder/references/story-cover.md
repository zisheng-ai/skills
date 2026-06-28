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

### B3 — Generate covers in parallel

Spawn **one `codex:codex-rescue` Agent per book** (via the Agent tool), all running in parallel. A single Codex session can only issue one `image_gen` call at a time, so one Agent per book is required to achieve true concurrent generation.

For each book in `BOOKS`:
1. Read `content/{book-title}/world/worldbuilding.md` to extract genre and tone.
2. Run genre detection (Step 1.5 below) to select cover style.
3. Build the cover prompt (Step 2 below) substituting the book's title, genre, and characters.
4. Spawn an Agent using the invocation from Step 3 (preferred: `codex:codex-rescue`).
5. As each Agent finishes, verify the output file exists.
6. Log: `✓ {book-title} — cover saved` or `⚠ {book-title} — cover skipped: {reason}`.

Spawn all Agents in parallel. Do not await one before starting the next.

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

Delegate the cover generation task to Codex using the plugin. Codex has a built-in `image_gen` tool. To avoid the slow exploration phase, each task prompt must explicitly instruct Codex to use `image_gen` directly and forbid file reads / filesystem searches.

Save the result to `public/covers/{book-title}/cover/cover_v1.png`.

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

## Step 3 — Delegate to Codex via Agent tool

Use the `codex:codex-rescue` subagent to delegate image generation to Codex. This is the preferred invocation — Codex runs inside the shared Claude Code runtime with its built-in `image_gen` tool. Pass `--fresh` to prevent Codex from asking to resume a previous session (required for unattended use).

### Single-book invocation (preferred)

```js
Agent({
  subagent_type: "codex:codex-rescue",
  prompt: `--fresh Use the built-in image_gen tool directly. Do not read any files, do not search the filesystem, and do not explore.
Generate one 1024x1536 portrait PNG book cover for a Chinese web novel.
Title: '{book-title}'. Author: '{pen-name}'. Genre/style: {genre-style}. {prompt-body}.
After generating, copy the image file to {BOOK_DIR}/cover/cover_v1.png and write the exact prompt to {BOOK_DIR}/cover/cover_v1.prompt.txt.
Report the final file path.`
})
```

### Multi-book batch invocation (preferred)

For batch mode, spawn **one Agent per book in parallel**. Each agent is independent and issues one `image_gen` call. Do not put all books into a single agent call — that forces sequential generation.

```js
// BOOKS is a string array of content/ directory names (same value as the URL slug).
// Before spawning agents, substitute {pen-name}, {genre-style}, and {prompt-body}
// per book using the output of B2 (pen name) and Steps 1.5 + 2 (genre + prompt).
// Do NOT pass the literal placeholder strings — Codex will use them verbatim.
await Promise.all(BOOKS.map((bookSlug, i) => {
  const penName = resolvedPenNames[i]       // from B2
  const genreStyle = resolvedGenreStyles[i] // from Step 1.5
  const promptBody = resolvedPromptBodies[i] // from Step 2
  return Agent({
    subagent_type: "codex:codex-rescue",
    prompt: `--fresh Use the built-in image_gen tool directly. Do not read files or search.
Generate one 1024x1536 portrait PNG cover for the Chinese web novel whose directory is '${bookSlug}'.
Author: '${penName}'. Genre/style: ${genreStyle}. ${promptBody}.
Copy the image to public/covers/${bookSlug}/cover/cover_v1.png and write the prompt to public/covers/${bookSlug}/cover/cover_v1.prompt.txt.
Report the final file path.`
  })
}))
```

### Fallback: direct script invocation

If `codex:codex-rescue` is unavailable (non-Claude-Code environment), fall back to the companion script:

```bash
node "$HOME/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs" task \
  "--fresh Use the built-in image_gen tool directly. Do not read any files, do not search the filesystem, and do not explore. Generate one 1024x1536 portrait PNG book cover for a Chinese web novel. Title: '{book-title}'. Author: '{pen-name}'. Genre/style: {genre-style}. {prompt-body}. After generating, copy the image file to {BOOK_DIR}/cover/cover_v1.png and write the exact prompt to {BOOK_DIR}/cover/cover_v1.prompt.txt. Report the final file path." \
  --write
```

### Required constraints in every prompt

- `--fresh` (prevents session-resume prompts)
- `Use the built-in image_gen tool directly.`
- `Do not read any files, do not search the filesystem, and do not explore.`
- Exact output path for the PNG.
- Exact output path for the `.prompt.txt`.

### After the task completes

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

**Automated pass criteria (unattended):** If `{BOOK_DIR}/cover/cover_v1.png` exists and has portrait dimensions (height > width), mark as passed automatically. Do not regenerate unless the file is missing or obviously corrupt (0 bytes). If regeneration is needed, retry once with the same prompt; on second failure, skip and log the book as needing manual cover review.

## Output Location

```
public/covers/{book-title}/cover/cover_v1.png        ← main cover, served as /covers/{book-title}/cover/cover_v1.png
public/covers/{book-title}/cover/cover_v1.prompt.txt ← prompt used
```

Served from `public/` — no CDN needed. The site builder reads `Book.cover` as `/covers/{book-title}/cover/cover_v1.png`.

Site logo and favicon are **not** part of this phase. They are generated in Phase 6 (Design plan) via `references/design-system.md`.
