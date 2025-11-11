"use client";

import type { ClassAttributes, HTMLAttributes } from "react";
import type { JSX } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { setTimeout } from "node:timers";

export default function Copy(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLPreElement> &
    HTMLAttributes<HTMLPreElement>
) {
  const preRef = useRef<HTMLPreElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  function onClick() {
    const preNode = preRef.current;
    if (!preNode) {
      console.log("not preNode");
      return;
    }
    navigator.clipboard.writeText(preNode.textContent);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  function onHover() {
    setHovered(true);
  }

  function onLeave() {
    setHovered(false);
  }

  return (
    <pre
      {...props}
      ref={preRef}
      className="relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <button
        className="absolute right-2 top-2 cursor-pointer"
        onClick={onClick}
        aria-label="Copy code block"
        role="button"
      >
        {hovered &&
          (copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
          ))}
      </button>
      {props.children}
    </pre>
  );
}
