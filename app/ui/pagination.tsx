"use client";

import { generatePagination } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Pagination({
  currentPage,
  totalPages,
  customQuery,
}: {
  currentPage: number;
  totalPages: number;
  customQuery?: string;
}) {
  const allPages = generatePagination(currentPage, totalPages);
  const pathname = usePathname();
  // / or /favs or empty
  const basePath = pathname.replace(/\/\d+$/, "");
  const cleanPath = basePath === "/" ? "/" : basePath.replace(/\/$/, "");

  return (
    <div className="flex items-center justify-center mb-[7vw] lg:mb-[3vw]">
      {allPages.length > 1 &&
        allPages.map((page, index) => {
          if (page === "..." && index === 0) {
            return <span key={"left-ellipsis"}>{page}</span>;
          }
          if (page === "..." && index === allPages.length - 1) {
            return <span key={"right-ellipsis"}>{page}</span>;
          }

          let href;
          // Handle /favs and / paths
          if (!pathname.includes("/search")) {
            if (page === 1) {
              // cleanPath may be an empty string
              href = cleanPath || "/";
            } else {
              href = cleanPath === "/" ? `/${page}` : `${cleanPath}/${page}`;
            }
          } else {
            // Handle /search path
            href = `${pathname}?page=${page}&query=${customQuery}`;
          }
          return (
            <Link
              href={href}
              key={page}
              aria-label={
                page === currentPage - 1
                  ? "Previous page"
                  : page === currentPage + 1
                  ? "Next page"
                  : page === currentPage
                  ? "Current page"
                  : `Go to page ${page}`
              }
              className={clsx(
                "text-[4.4vw] w-[9.1vw] h-[9.1vw] m-[0_1.9vw] flex items-center justify-center lg:w-[2.3vw] lg:h-[2.3vw] lg:text-[1vw] lg:m-[0_1.2vw]",
                {
                  "bg-[#a8d8ff57] text-[#0d67ae] rounded-[100px] pointer-events-none":
                    page === currentPage,
                },
                {
                  "text-[#455374]": page !== currentPage,
                }
              )}
            >
              {page}
            </Link>
          );
        })}
    </div>
  );
}
