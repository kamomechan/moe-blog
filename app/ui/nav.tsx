"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Favs", href: "/favs" },
  { name: "RSS", href: "/rss" },
  { name: "Code", href: "https://github.com/kamomechan/moe-blog" },
];
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleSideBar() {
    setIsOpen(!isOpen);
  }
  const pathname = usePathname();

  return (
    <nav>
      <button
        className="fixed top-[1.8vw] right-[1.8vw] w-[16vw] h-[16vw] bg-[#a8d8ff] z-20 rounded-[50%] cursor-pointer hover:scale-95 hover:opacity-90 transition-[scale,opacity] duration-300 lg:w-20 lg:h-20 lg:top-3 lg:right-3"
        onClick={toggleSideBar}
        aria-label="Navigation menu"
      >
        <div
          className={clsx(
            "absolute h-0.5 w-[40%] bg-white transition-transform duration-300",
            {
              "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2": isOpen,
              "rotate-45": isOpen,
            },
            {
              "top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2": !isOpen,
            }
          )}
        ></div>
        <div
          className={clsx(
            "absolute h-0.5 w-[40%] bg-white transition-transform duration-300",
            {
              "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2": isOpen,
              "-rotate-45": isOpen,
            },
            {
              "top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2": !isOpen,
            }
          )}
        ></div>
      </button>
      {/* content area color transition */}
      <div
        className={clsx("transition-[background-color] duration-700", {
          "bg-[#53608c80] h-screen w-screen fixed z-5 cursor-pointer": isOpen,
        })}
        onClick={toggleSideBar}
        tabIndex={0}
        role="button"
        aria-label={isOpen ? "Close navigation menu" : ""}
      ></div>
      <div
        className={clsx(
          "flex flex-col bg-[#cce1ff] w-[75vw] h-screen fixed z-10 -right-full pt-[26vw] transition-[right] duration-500 lg:w-96 lg:pt-40",
          {
            "right-0": isOpen,
          }
        )}
      >
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            className={clsx(
              "group mt-[9vw] text-[5vw] text-[#47638a] tracking-[0.04em] pl-[21vw] lg:pl-28 lg:mt-10 lg:text-[20px]"
            )}
          >
            <div
              className={clsx(
                "w-[4vw] h-[0.5vw] bg-[#7398ce] relative top-1/2 right-[12%] transition-opacity duration-300 lg:w-5 lg:h-[3px]",
                {
                  "opacity-0": pathname !== link.href,
                  "group-hover:opacity-100": true,
                }
              )}
            ></div>
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
