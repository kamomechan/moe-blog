import { useEffect } from "react";

export default function useAutoScroll(activeId: string | undefined) {
  useEffect(() => {
    if (!activeId) return;
    const activeTOCId = `toc-${activeId}`;
    const activeElement = document.getElementById(activeTOCId);
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeId]);
}
