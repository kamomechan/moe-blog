"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

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

  return (
    <nav>
      <button
        className="fixed top-4 right-4 p-8 bg-blue-200 z-20 rounded-4xl cursor-pointer hover:scale-95 hover:opacity-90 transition-[scale,opacity] duration-300"
        onClick={toggleSideBar}
      >
        <div
          className={clsx(
            "absolute top-[40%] right-[30%] h-0.5 w-[40%] bg-white transition-transform duration-300",
            {
              "translate-y-1.5 rotate-45": isOpen,
            }
          )}
        ></div>
        <div
          className={clsx(
            "absolute top-[60%] right-[30%] h-0.5 w-[40%] bg-white transition-transform duration-300",
            {
              "-translate-y-1.5 -rotate-45": isOpen,
            }
          )}
        ></div>
      </button>
      {/* content area color transition */}
      <div
        className={clsx("transition-[background-color] duration-700", {
          "bg-[#53608c80] h-screen w-screen fixed": isOpen,
        })}
        onClick={toggleSideBar}
      ></div>
      <div
        className={clsx(
          "flex flex-col bg-blue-100  w-[75vw] h-screen fixed -right-full pt-20 transition-[right] duration-500",
          {
            "right-0": isOpen,
          }
        )}
      >
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            className="py-4 text-lg text-[#4a6384] pl-[20vw]"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
