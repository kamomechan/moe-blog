import path from "node:path";
import { readdirSync, cpSync, existsSync, mkdirSync } from "node:fs";
import * as matter from "gray-matter";

const rootPath = process.cwd();
const articlesDir = path.join(rootPath, "articles");
const filenameInArticles = readdirSync(articlesDir);

const preview = filenameInArticles.map((filename) => {
  const articlePath = path.join(articlesDir, filename, "index.md");
  const imagesPath = path.join(articlesDir, filename, "images");
  const destPath = path.join(rootPath, "public/post", filename, "images");

  const result = matter.read(articlePath);
  if (existsSync(imagesPath)) {
    if (!existsSync(destPath)) {
      mkdirSync(destPath, { recursive: true });
    }
    cpSync(imagesPath, destPath, { recursive: true });
  }
  result.data.href = path.join("/post/", filename);
  return result;
});
export default preview;
