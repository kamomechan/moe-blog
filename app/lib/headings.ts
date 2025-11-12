import { readFileSync } from "node:fs";
import path from "node:path";
import { HeadingType } from "@/app/lib/definitions";
function headings(id: string) {
  const articlePath = path.join(process.cwd(), `articles/${id}/index.mdx`);
  const content = readFileSync(articlePath, { encoding: "utf-8" });
  const reg = /^(#+)\s(.+)$/gm;
  const data: HeadingType[] = [];
  let match;
  while ((match = reg.exec(content)) !== null) {
    const depth = match[1].length;
    const title = match[2];
    // Since rehype-slug plugin change id of title
    const id = match[2].toLowerCase().replace(/\s/g, "-");
    if (depth > 1 && depth < 4) {
      data.push({ depth, title, id });
    }
  }
  return data;
}
export default headings;
