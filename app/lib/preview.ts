import path from "node:path";
import { readdirSync } from "node:fs";
import * as matter from "gray-matter";

const rootPath = process.cwd();
const articlesDir = path.join(rootPath, "articles");
const filenameInArticles = readdirSync(articlesDir);

const preview = filenameInArticles.map((filename) => {
  const articlePath = path.join(articlesDir, filename, "index.md");
  const result = matter.read(articlePath);
  result.data.href = path.join("/post/", filename);
  return result;
});

// desc sort
preview.sort((a, b) => {
  const dateA: Date = a.data.date;
  const dateB: Date = b.data.date;
  const timeA = dateA.getTime();
  const timeB = dateB.getTime();
  if (timeA - timeB > 0) {
    return -1;
  } else if (timeA - timeB < 0) {
    return 1;
  }
  return 0;
});

export default preview;
