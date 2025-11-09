import path from "node:path";
import { readdirSync } from "node:fs";
import { MetadataType } from "./definitions";

const rootPath = process.cwd();
const articlesDir = path.join(rootPath, "articles");
const filenameInArticles = readdirSync(articlesDir);

const preview = filenameInArticles.map(async (filename) => {
  const articlePath = path.join("@/articles", filename, "index.mdx");
  const {
    metadata: data,
    default: content,
  }: { metadata: MetadataType; default: React.ComponentType } = await import(
    articlePath
  );
  data.id = filename;
  data.href = `/post/${filename}`;
  return { data, content };
});

const resolvedPreview = await Promise.all(preview);

resolvedPreview.sort((a, b) => {
  const dateA = new Date(a.data.date);
  const dateB = new Date(b.data.date);
  const timeA = dateA.getTime();
  const timeB = dateB.getTime();
  if (timeA - timeB > 0) {
    return -1;
  } else if (timeA - timeB < 0) {
    return 1;
  }
  return 0;
});

export default resolvedPreview;
