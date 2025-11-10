import type { MDXComponents } from "mdx/types";
import Copy from "@/app/ui/copy";

const components: MDXComponents = {
  pre: Copy,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
