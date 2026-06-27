#!/usr/bin/env node
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] || ".");
const output = process.argv[3] ? path.resolve(process.argv[3]) : null;

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
  return path.basename(file, ".md").replace(/^第?\s*0*(\d+)\s*[章节回]?[_\-\s]*/u, "第$1章 ");
}

function orderFromFilename(file, fallback) {
  const base = path.basename(file);
  const match = base.match(/第?\s*0*(\d+)\s*[章节回]?/u);
  return match ? Number(match[1]) : fallback;
}

function firstHeading(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function countWords(text) {
  const cjk = (text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu) || []).length;
  const latin = (text.replace(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu, " ").match(/[A-Za-zÀ-ÿ0-9]+/g) || []).length;
  return cjk + latin;
}

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if ([".git", "node_modules", "拆文库", "对标"].includes(entry.name)) continue;
      files.push(...await walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function parseChapter(file, bookId, fallbackOrder) {
  const raw = await readFile(file, "utf8");
  const [meta, body] = parseFrontmatter(raw);
  const title = meta.title || firstHeading(body) || titleFromFilename(file);
  const order = Number(meta.chapter || meta.order || orderFromFilename(file, fallbackOrder));
  return {
    id: `${bookId}-${String(order).padStart(4, "0")}`,
    bookId,
    order,
    title,
    sourcePath: path.relative(root, file),
    content: body.trim(),
    wordCount: Number(meta.wordCount || meta.word_count || countWords(body)),
    publishedAt: meta.publishedAt || meta.published_at || "",
  };
}

async function parseLongBook(bookDir) {
  const proseDir = path.join(bookDir, "正文");
  const files = (await readdir(proseDir))
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(proseDir, name));
  if (!files.length) return null;

  const title = path.basename(bookDir);
  const id = slugify(title);
  const chapters = [];
  for (let index = 0; index < files.length; index += 1) {
    chapters.push(await parseChapter(files[index], id, index + 1));
  }
  chapters.sort((a, b) => a.order - b.order);
  return {
    id,
    slug: id,
    title,
    language: "zh",
    description: "",
    genres: [],
    status: "ongoing",
    wordCount: chapters.reduce((sum, chapter) => sum + chapter.wordCount, 0),
    latestChapterId: chapters.at(-1)?.id || "",
    updatedAt: "",
    sourceType: "oh-story-long",
    sourcePath: path.relative(root, bookDir),
    chapters,
  };
}

async function parseShortBook(file) {
  const title = path.basename(path.dirname(file));
  const id = slugify(title);
  const chapter = await parseChapter(file, id, 1);
  chapter.title = chapter.title === "正文" ? title : chapter.title;
  return {
    id,
    slug: id,
    title,
    language: "zh",
    description: "",
    genres: ["short"],
    status: "completed",
    wordCount: chapter.wordCount,
    latestChapterId: chapter.id,
    updatedAt: chapter.publishedAt || "",
    sourceType: "oh-story-short",
    sourcePath: path.relative(root, path.dirname(file)),
    chapters: [chapter],
  };
}

async function main() {
  const allFiles = await walk(root);
  const longDirs = new Set(
    allFiles
      .filter((file) => file.endsWith(".md") && path.basename(path.dirname(file)) === "正文")
      .map((file) => path.dirname(path.dirname(file)))
  );

  const books = [];
  for (const dir of longDirs) {
    const book = await parseLongBook(dir);
    if (book) books.push(book);
  }

  const shortFiles = allFiles.filter((file) => {
    const parts = path.relative(root, file).split(path.sep);
    return parts.length >= 3 && parts[0] === "短篇" && parts.at(-1) === "正文.md";
  });
  for (const file of shortFiles) {
    books.push(await parseShortBook(file));
  }

  let activeBook = "";
  const activeFile = path.join(root, ".active-book");
  if (await exists(activeFile)) {
    activeBook = (await readFile(activeFile, "utf8")).trim();
  }

  books.sort((a, b) => {
    if (activeBook && a.sourcePath === activeBook) return -1;
    if (activeBook && b.sourcePath === activeBook) return 1;
    return a.title.localeCompare(b.title, "zh-Hans-CN");
  });

  const payload = {
    generatedAt: new Date().toISOString(),
    sourceRoot: root,
    activeBook,
    books,
  };

  const json = JSON.stringify(payload, null, 2);
  if (output) await writeFile(output, json + "\n", "utf8");
  else process.stdout.write(json + "\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
