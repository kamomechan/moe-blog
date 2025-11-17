"use client";

import clsx from "clsx";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

export default function ImgZoom() {
  const [isOpen, setIsOpen] = useState(false);
  const bgBox = useRef<HTMLDivElement>(null);

  function handleCloneClick(event: Event) {
    event.stopPropagation();
    const imgClone = event.target as HTMLImageElement;
    if (!imgClone) return;
    const boxNode = bgBox.current;
    if (!boxNode) return;
    boxNode.removeChild(imgClone);
    setIsOpen(false);
    imgClone.removeEventListener("click", handleCloneClick);
  }

  const handleBoxClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const boxNode = event.target as HTMLDivElement;
    if (!boxNode) return;
    const imgClone = boxNode.querySelector("img");
    if (!imgClone) return;
    imgClone.removeEventListener("click", handleCloneClick);
    boxNode.removeChild(imgClone);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const imgsNode = document.querySelectorAll(".prose > img");
    if (!imgsNode) return;

    function handleImgClick(event: Event) {
      const imgTarget = event.target as HTMLImageElement;
      const imgClone = imgTarget.cloneNode() as HTMLImageElement;
      imgClone.classList.add("img-zoom");
      imgClone.addEventListener("click", handleCloneClick);
      const boxNode = bgBox.current;
      if (!boxNode) return;
      boxNode.appendChild(imgClone);
      setIsOpen(!isOpen);
    }

    imgsNode.forEach((imgNode) => {
      imgNode.addEventListener("click", handleImgClick);
    });

    return () => {
      imgsNode.forEach((imgNode) => {
        imgNode.removeEventListener("click", handleImgClick);
      });
    };
  }, []);

  return (
    <div
      className={clsx("transition-colors duration-300", {
        "fixed inset-0 bg-[#53608c80] z-30 flex items-center justify-center":
          isOpen,
      })}
      ref={bgBox}
      onClick={handleBoxClick}
    ></div>
  );
}
