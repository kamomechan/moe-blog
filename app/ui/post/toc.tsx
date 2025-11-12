"use client";

import type { JSX } from "react";
import type { HeadingType } from "@/app/lib/definitions";
import clsx from "clsx";
import { useState } from "react";

export default function Toc({ head }: { head: HeadingType[] }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleToc() {
    setIsOpen(!isOpen);
  }
  return (
    <aside aria-label="Table of content">
      <nav>
        <button
          className="fixed z-20 right-[2.5vw] bottom-[14.5vw] p-[3vw] lg:hidden"
          onClick={toggleToc}
          aria-label="Table Of Content button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 text-[#265377]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
        {head.length > 1 && (
          <>
            <div
              className={clsx("transition-colors duration-700 lg:hidden", {
                "fixed w-screen h-screen top-0 z-5 bg-[#53608c80] cursor-pointer":
                  isOpen,
              })}
              onClick={toggleToc}
              role="button"
              aria-label={isOpen ? "Close table of content" : "placeholder"}
              tabIndex={0}
            ></div>

            <div
              className={clsx(
                "fixed w-[89vw] max-h-[58vh] rounded-2xl bg-[#cce1ff] -right-full top-[21vh] z-10 flex flex-col overflow-auto pt-[4.5vw] pb-[4.5vw] transition-[right] duration-500 lg:right-[1.5vw] lg:w-[22vw] lg:bg-transparent lg:shadow-[0_1.0416666667vw_1.0416666667vw_rgba(71,80,104,.14)] lg:max-h-[47vh] lg:top-[30vh] lg:z-5 lg:p-[1vw_0]",
                {
                  "right-[5.5vw] lg:right-[1.5vw]": isOpen,
                }
              )}
            >
              {head.map((heading) => {
                const { id, title, depth } = heading;
                const HeadingTag = `h${depth}` as keyof JSX.IntrinsicElements;
                return (
                  <a
                    href={`#${id}`}
                    key={title}
                    className={clsx(
                      " text-[#47638a] p-[4.5vw_0_4.5vw_10vw] lg:p-[1vw_0_1vw_3vw] lg:text-[#4f6f8a]",
                      {
                        "text-[5vw] lg:text-[1.1vw]": depth === 2,
                        "text-[4.5vw] pl-[15vw] lg:text-[1vw] lg:pl-[4vw]":
                          depth === 3,
                      }
                    )}
                    onClick={toggleToc}
                  >
                    <HeadingTag key={title}>{title}</HeadingTag>
                  </a>
                );
              })}
            </div>
          </>
        )}
      </nav>
    </aside>
  );
}
