import path from "node:path";
import { readdirSync, cpSync, existsSync, mkdirSync } from "node:fs";

const rootPath = process.cwd();
const articlesDir = path.join(rootPath, "articles");
const filenameInArticles = readdirSync(articlesDir);

filenameInArticles.map((filename) => {
  const imagesPath = path.join(articlesDir, filename, "images");
  const destPath = path.join(rootPath, "public/post", filename, "images");

  if (existsSync(imagesPath)) {
    if (!existsSync(destPath)) {
      mkdirSync(destPath, { recursive: true });
    }
    cpSync(imagesPath, destPath, { recursive: true });
  }
});

console.log("Prebuild finished");
