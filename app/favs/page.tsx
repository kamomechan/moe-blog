import getVNList from "@/app/lib/vn-list";
import Image from "next/image";
import { generateFormatNotes } from "../lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "favs",
  description: "My favorite visual novels",
};

export default async function Page() {
  try {
    const data = await getVNList();

    const vndb = "https://vndb.org/";

    return (
      <>
        <h1 className="text-center text-[13vw] text-[#3f80b5] pt-[17.8vw] lg:text-[5.2vw] lg:pt-[2.9vw]">
          Favs
        </h1>
        <ul className="grid w-[93vw] m-[15.5vw_auto_10vw_auto] gap-[10vw_5vw] grid-cols-1 auto-rows-[64vw] lg:grid-cols-2 lg:auto-rows-[25vw] lg:w-[85vw] lg:m-[7.5vw_auto_10vw_auto]">
          {data?.results.map((entry, index) => (
            <li key={index} className="flex">
              <div className="relative flex-5 overflow-hidden">
                <Image
                  src={entry.vn.image?.url || ""}
                  alt="vn image"
                  fill={true}
                  className="rounded-2xl object-cover"
                ></Image>
              </div>
              <div className="flex-5 m-[1.5vw_0_1.5vw_4vw]">
                <div className="font-medium">
                  <a
                    href={`${vndb}${entry.id}`}
                    className="hover:underline line-clamp-1"
                  >
                    {entry.vn.alttitle || entry.vn.title}
                  </a>
                </div>
                <div className="mt-[3vw] text-[#3057b4] lg:mt-[1vw] line-clamp-1">
                  {entry.vn.developers
                    ?.map((item) => item.original || item.name)
                    ?.join("/") || ""}
                </div>
                <div className="mt-[3vw] text-[#535353] lg:mt-[1vw]">
                  {entry.vn.released}
                </div>
                <div
                  className="line-clamp-5 mt-[3vw] text-[#5b5b5b] lg:mt-[1vw] lg:line-clamp-10"
                  dangerouslySetInnerHTML={{
                    __html: generateFormatNotes(entry.vn.description) || "",
                  }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  } catch (error) {
    console.error(error);
  }
}
