#!/usr/bin/env node
/**
 * parse-oh-story-claudecode.mjs
 *
 * Parses an oh-story-claudecode writing directory and outputs a site-data.json
 * conforming to the SiteData type in references/data-contract.md.
 *
 * Usage:
 *   node parse-oh-story-claudecode.mjs <source-dir> [output-file]
 *
 * If output-file is omitted, writes to stdout.
 */
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] || ".");
const output = process.argv[3] ? path.resolve(process.argv[3]) : null;

// Directories that are internal to oh-story-claudecode and must never appear in reader routes.
const INTERNAL_DIRS = new Set([".git", "node_modules", "拆文库", "对标", "大纲", "设定", "追踪", "参考资料"]);

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[\s_/]+/g, "-")
    .replace(/[^\p{Letter}\p{Number}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "book";
}

function parseFrontmatter(raw) {
  if (!raw.startsWith("---\n")) return [{}, raw];
  const end = raw.indexOf("\n---", 4);
  if (end === -1) return [{}, raw];
  const block = raw.slice(4, end).trim();
  const body = raw.slice(raw.indexOf("\n", end + 4) + 1);
  const meta = {};
  for (const line of block.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) meta[match[1]] = match[2].replace(/^["']|["']$/g, "").trim();
  }
  return [meta, body];
}

function titleFromFilename(file) {
  const base = path.basename(file, ".md");
  // "第001章_序章" → "第1章 序章", "001_Prologue" → "Prologue"
  return base
    .replace(/^第?\s*0*(\d+)\s*[章节回]?[_\-\s]*/u, (_, n) => `第${n}章 `)
    .replace(/^\d+[_\-\s]+/, "")
    .trim() || base;
}

function orderFromFilename(file, fallback) {
  const base = path.basename(file);
  const match = base.match(/第?\s*0*(\d+)\s*[章节回]?/u) || base.match(/^(\d+)/);
  return match ? Number(match[1]) : fallback;
}

function firstHeading(body) {
  const match = body.match(/^#{1,2}\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function countWords(text) {
  const cjk = (text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu) || []).length;
  const latin = (text.replace(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu, " ").match(/[A-Za-zÀ-ÿ0-9]+/g) || []).length;
  return cjk + latin;
}

/**
 * Infer language from text content when not specified in frontmatter.
 * Returns "zh" | "ja" | "ko" | "en".
 */
function detectLanguage(text, sample = 500) {
  const s = text.slice(0, sample);
  const han = (s.match(/\p{Script=Han}/gu) || []).length;
  const hiragana = (s.match(/\p{Script=Hiragana}/gu) || []).length;
  const katakana = (s.match(/\p{Script=Katakana}/gu) || []).length;
  const hangul = (s.match(/\p{Script=Hangul}/gu) || []).length;
  if (hangul > 10) return "ko";
  if (hiragana > 5 || katakana > 5) return "ja";
  if (han > 20) return "zh";
  return "en";
}

async function fileExists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    process.stderr.write(`Warning: cannot read directory ${dir}: ${err.message}\n`);
    return [];
  }
  const files = [];
  for (const entry of entries) {
    if (INTERNAL_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function parseChapter(file, bookId, fallbackOrder) {
  let raw;
  try {
    raw = await readFile(file, "utf8");
  } catch (err) {
    process.stderr.write(`Warning: cannot read ${file}: ${err.message}\n`);
    return null;
  }
  const [meta, body] = parseFrontmatter(raw);
  const title = meta.title || firstHeading(body) || titleFromFilename(file);
  const order = Number(meta.chapter || meta.order || orderFromFilename(file, fallbackOrder));
  const language = meta.language || detectLanguage(body);
  return {
    id: `${bookId}-${String(order).padStart(4, "0")}`,
    bookId,
    order,
    title,
    language,
    sourcePath: path.relative(root, file),
    content: body.trim(),
    wordCount: Number(meta.wordCount || meta.word_count || countWords(body)),
    publishedAt: meta.publishedAt || meta.published_at || "",
    status: meta.status || "published",
  };
}

async function parseLongBook(bookDir) {
  const proseDir = path.join(bookDir, "正文");
  let names;
  try {
    names = await readdir(proseDir);
  } catch {
    return null;
  }
  const files = names
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(proseDir, name));
  if (!files.length) return null;

  const dirTitle = path.basename(bookDir);
  const id = slugify(dirTitle);

  const rawChapters = await Promise.all(
    files.map((file, index) => parseChapter(file, id, index + 1))
  );
  const chapters = rawChapters
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);

  if (!chapters.length) return null;

  const language = chapters[0].language || "zh";
  const latestChapter = chapters.at(-1);

  return {
    id,
    slug: id,
    title: dirTitle,
    language,
    description: "",
    genres: [],
    status: "ongoing",
    chapterCount: chapters.length,
    wordCount: chapters.reduce((sum, ch) => sum + ch.wordCount, 0),
    latestChapterId: latestChapter?.id || "",
    updatedAt: latestChapter?.publishedAt || "",
    featured: false,
    sourceType: "oh-story-claudecode-long",
    sourcePath: path.relative(root, bookDir),
    chapters,
  };
}

async function parseShortBook(file) {
  const dirTitle = path.basename(path.dirname(file));
  const id = slugify(dirTitle);
  const chapter = await parseChapter(file, id, 1);
  if (!chapter) return null;

  // Use the book title as the chapter title if the chapter title is just "正文"
  if (chapter.title === "正文" || chapter.title === dirTitle) {
    chapter.title = dirTitle;
  }

  return {
    id,
    slug: id,
    title: dirTitle,
    language: chapter.language || "zh",
    description: "",
    genres: ["short"],
    status: "completed",
    chapterCount: 1,
    wordCount: chapter.wordCount,
    latestChapterId: chapter.id,
    updatedAt: chapter.publishedAt || "",
    featured: false,
    sourceType: "oh-story-claudecode-short",
    sourcePath: path.relative(root, path.dirname(file)),
    chapters: [chapter],
  };
}

async function main() {
  if (!(await fileExists(root))) {
    process.stderr.write(`Error: source directory not found: ${root}\n`);
    process.exit(1);
  }

  const allFiles = await walk(root);

  // Long-form books: directories that contain a 正文/ subdirectory with .md files
  const proseDirs = new Set(
    allFiles
      .filter((file) => file.endsWith(".md") && path.basename(path.dirname(file)) === "正文")
      .map((file) => path.dirname(path.dirname(file)))
  );

  // Short stories: 短篇/{title}/正文.md
  const shortFiles = allFiles.filter((file) => {
    const parts = path.relative(root, file).split(path.sep);
    return parts.length >= 3 && parts[0] === "短篇" && parts.at(-1) === "正文.md";
  });

  const books = [];

  for (const dir of proseDirs) {
    const book = await parseLongBook(dir);
    if (book) books.push(book);
  }

  for (const file of shortFiles) {
    const book = await parseShortBook(file);
    if (book) books.push(book);
  }

  // Mark the active book and sort it first
  let activeBook = "";
  const activeFile = path.join(root, ".active-book");
  if (await fileExists(activeFile)) {
    activeBook = (await readFile(activeFile, "utf8")).trim();
    const active = books.find((b) => b.sourcePath === activeBook);
    if (active) active.featured = true;
  }

  books.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.title.localeCompare(b.title, "zh-Hans-CN");
  });

  if (!books.length) {
    process.stderr.write(`Warning: no books found in ${root}\n`);
    process.stderr.write(`Expected: directories with 正文/*.md, or 短篇/*/正文.md\n`);
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    sourceRoot: root,
    activeBook,
    books,
  };

  const json = JSON.stringify(payload, null, 2);
  if (output) {
    await writeFile(output, json + "\n", "utf8");
    process.stderr.write(`Wrote ${books.length} book(s) to ${output}\n`);
  } else {
    process.stdout.write(json + "\n");
  }
}

main().catch((error) => {
  process.stderr.write(`Fatal: ${error.message}\n`);
  process.exit(1);
});
