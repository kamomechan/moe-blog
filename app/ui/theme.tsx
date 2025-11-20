"use client";

import { toggleTheme } from "@/app/lib/utils";
import clsx from "clsx";
import { useState } from "react";

export default function Theme() {
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);

  return (
    <div className="flex justify-around m-[16vw_auto] bg-[#ffffff40] w-[40vw] rounded-[7vw] p-[1vw_0] lg:m-[3vw_auto] lg:p-[0.2vw_0] lg:w-[10vw]">
      <button
        className={clsx("p-[2vw] lg:p-[0.5vw]", {
          "bg-[#bad6ff] rounded-[7vw]": currentTheme === "light",
        })}
        aria-label="Switch to light theme"
        onClick={() => {
          localStorage.theme = "light";
          toggleTheme();
          setCurrentTheme("light");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-[1.3rem]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      </button>
      <button
        className={clsx("p-[2vw] lg:p-[0.5vw]", {
          "bg-[#bad6ff] rounded-[7vw]": currentTheme === null,
        })}
        aria-label="Switch to system theme"
        onClick={() => {
          localStorage.removeItem("theme");
          toggleTheme();
          setCurrentTheme(null);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-[1.3rem]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>
      </button>
      <button
        className={clsx("p-[2vw] lg:p-[0.5vw]", {
          "bg-[#bad6ff] rounded-[7vw]": currentTheme === "dark",
        })}
        aria-label="Switch to dark theme"
        onClick={() => {
          localStorage.theme = "dark";
          toggleTheme();
          setCurrentTheme("dark");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-[1.3rem]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      </button>
    </div>
  );
}
