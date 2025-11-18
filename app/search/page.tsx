import Search from "@/app/ui/search/search";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <h1 className="text-center text-[13vw] text-[#3f80b5] pt-[17.8vw] lg:text-[5.2vw] lg:pt-[2.9vw]">
        Search
      </h1>
      <Suspense>
        <Search />
      </Suspense>
    </>
  );
}
