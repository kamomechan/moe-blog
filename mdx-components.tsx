import type { MDXComponents } from "mdx/types";
import Copy from "@/app/ui/post/copy";
import Tasklist from "./app/ui/post/tasklist";

const components: MDXComponents = {
  pre: Copy,
  input: Tasklist,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
