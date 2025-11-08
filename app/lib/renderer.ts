import type { Tokens } from "marked";

export default function getRenderer(id: string) {
  const renderer = {
    image({ href, text, title }: Tokens.Image) {
      const absolutePath = href.replace(/\.\/images\//, `/post/${id}/images/`);
      return `<img src="${absolutePath}" alt="${text || ""}" title="${
        title || ""
      }">`;
    },
  };
  return renderer;
}
