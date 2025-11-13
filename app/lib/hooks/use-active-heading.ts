"use client";

import { HeadingType } from "@/app/lib/definitions";
import { useEffect, useState } from "react";

export default function useActiveHeading(headings: HeadingType[]) {
  const [activeHeading, setActiveHeading] = useState<HeadingType | null>(null);

  useEffect(() => {
    if (!headings) return;
    const observerMap = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        // Record the intersection status of elements
        entries.forEach((entry) => {
          observerMap.set(entry.target.id, entry.isIntersecting);
        });
        // Query the first observed heading
        const activeElement = headings.find((heading) =>
          observerMap.get(heading.id)
        );
        if (activeElement) {
          setActiveHeading(activeElement);
        }
      },
      {
        rootMargin: "0px 0px -80% 0px",
      }
    );

    // Set observer elements
    headings.forEach((heading) => {
      const observerTarget = document.getElementById(heading.id);
      if (observerTarget) {
        observer.observe(observerTarget);
        // Initial value
        observerMap.set(heading.id, false);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  return activeHeading;
}
