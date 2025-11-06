import preview from "@/app/lib/preview";
import Link from "next/link";
export default function Home() {
  const articles = preview.map((article) => {
    return article.data;
  });

  return (
    <>
      <h1 className="text-center text-[13vw] text-[#3f80b5] pt-[17.8vw]">
        Posts
      </h1>
      <div className="grid mt-[6.5vw] mb-[10vw] ml-auto mr-auto w-[89vw] grid-cols-[1fr] auto-rows-[minmax(30vw,1fr)] gap-y-[10vw]">
        {articles.map((article) => {
          return (
            <Link
              href={article.href}
              key={article.title}
              className="relative rounded-[1.3vw] shadow-[0_2.6041666667vw_2.6041666667vw_rgba(71,80,104,.14)]"
            >
              <div className="text-[#445f86] text-center text-[5.6vw] line-clamp-2 m-[6.6vw_2vw]">
                {article.title}
              </div>
              <div className="absolute right-[2vw] bottom-[1vw] text-[#6c5b67] text-[3.5vw]">
                {article.date.toISOString().split("T")[0]}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
