"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import type { MetadataType } from "@/app/lib/definitions";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/app/ui/pagination";

export default function Search() {
  const [isData, setIsData] = useState<MetadataType[]>([]);
  const [isTotalPages, setIsTotalPages] = useState(0);
  const [isCurrentPages, setIsCurrentPages] = useState(0);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  async function fetchData(params: URLSearchParams, ignore: boolean) {
    try {
      const response = await fetch(`/api/search?${params.toString()}`);
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }
      const { data, totalPages } = await response.json();

      if (!ignore) {
        setIsData(JSON.parse(data));
        setIsTotalPages(Number(totalPages));
        setIsCurrentPages(Number(params.get("page")));
      }
    } catch (error) {
      console.error(error, "Fetch error of search data");
    }
  }

  // Handling search parameters during initial load and when they change
  useEffect(() => {
    // Avoid `race condition`
    let ignore = false;

    const params = new URLSearchParams(searchParams);
    const value = params.get("query");
    const page = params.get("page");
    if (!page) {
      params.set("page", "1");
    }
    if (value) {
      fetchData(params, ignore);
    } else {
      setIsData([]);
      setIsTotalPages(0);
      setIsCurrentPages(0);
    }

    return () => {
      ignore = true;
    };
  }, [searchParams]);

  const handleChange: ChangeEventHandler<HTMLInputElement> =
    useDebouncedCallback((event) => {
      const value = event.target.value;
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (value) {
        params.set("query", value);
      } else {
        params.delete("query");
        setIsData([]);
      }
      replace(`${pathname}?${params.toString()}`);
    }, 200);

  return (
    <>
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          search
        </label>
        <input
          className="w-[86vw] m-[12vw_auto_12vw_auto] bg-[#a7c4dc69] block rounded-[5vw] py-[2vw] pl-[12vw] lg:p-[0.8vw_0_0.8vw_3vw] lg:w-[48vw] lg:m-[5vw_auto] lg:rounded-[2vw]"
          id="search"
          placeholder="Search posts..."
          onChange={handleChange}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 absolute top-[50%] -translate-y-[50%] left-[10vw] lg:left-[27vw]"
          aria-label="search icon"
          color="#6e6e6e"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      {isData && (
        <div className="grid mt-[6.5vw] mb-[10vw] ml-auto mr-auto w-[89vw] grid-cols-[1fr] auto-rows-[minmax(30vw,1fr)] gap-y-[10vw] lg:gap-[5vw] lg:grid-cols-[repeat(2,1fr)] lg:auto-rows-[minmax(8vw,1fr)] lg:w-[77vw] lg:mt-[2.5vw] lg:mb-[5vw]">
          {isData.map((article) => {
            return (
              <Link
                href={article.href}
                key={article.title}
                className="relative rounded-[1.3vw] shadow-[0_2.6041666667vw_2.6041666667vw_rgba(71,80,104,.14)] lg:shadow-[0_1.0416666667vw_1.0416666667vw_rgba(71,80,104,.14)] lg:hover:opacity-40 lg:transition-opacity lg:duration-300"
              >
                <div className="text-[#445f86] text-center text-[5.6vw] line-clamp-2 m-[6.6vw_2vw] lg:text-[1.6vw] lg:text-[#445F86] lg:m-[2.6vw_2vw]">
                  {article.title}
                </div>
                <div className="absolute right-[2vw] bottom-[1vw] text-[#6c5b67] text-[3.5vw] lg:text-[1vw] lg:bottom-[0.4vw] lg:right-[1vw]">
                  {article.date}
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <Pagination
        currentPage={isCurrentPages}
        totalPages={isTotalPages}
        customQuery={searchParams.get("query")?.toString()}
      />
    </>
  );
}
