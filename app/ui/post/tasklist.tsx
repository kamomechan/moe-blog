import type { ClassAttributes, InputHTMLAttributes, JSX } from "react";

export default function Tasklist(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLInputElement> &
    InputHTMLAttributes<HTMLInputElement>
) {
  // Repair accessibility of tasklist
  return <input {...props} aria-label="tasklist" />;
}
