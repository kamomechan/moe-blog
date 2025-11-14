import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [new URL("https://t.vndb.org/**")],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-pretty-code",
      "rehype-slug",
      "rehype-autolink-headings",
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
