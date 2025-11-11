import preview from "@/app/lib/preview";
import type { Metadata } from "next";
import headings from "@/app/lib/headings";
import Toc from "@/app/ui/post/toc";

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const { metadata } = await import(`@/articles/${id}/index.mdx`);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export function generateStaticParams() {
  const articles = preview.map((article) => article.data);
  return articles.map((item) => ({ id: item.id }));
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const [article] = preview.filter((article) => {
    if (article.data.id === id) {
      return true;
    }
    return false;
  });
  const { content: Post } = article;
  const date = article.data.date;
  const editedDate = article.data.edit;
  const head = headings(id);

  return (
    <>
      <h1 className="text-center text-[13vw] text-[#3f80b5] pt-[17.8vw] lg:text-[5.2vw] lg:pt-[2.9vw]">
        Posts
      </h1>
      <article className="w-[89vw] m-[6.5vw_auto] p-[7.8vw_6.5vw_3.2vw] rounded-[1.3vw] shadow-[0_2.6041666667vw_2.6041666667vw_rgba(71,80,104,.14)] lg:w-[50vw] lg:m-[3vw_auto_5vw] lg:p-[3.1vw_4vw_2vw] lg:shadow-[0_1.0416666667vw_1.0416666667vw_rgba(71,80,104,.14)] lg:rounded-[0.5vw]">
        <div className="prose prose-headings:text-[#3f80b5] prose-custom">
          <Post />
        </div>
        <time className="text-[#3876a8] text-[0.8rem] mt-4 flex justify-end lg:mt-8">
          {editedDate ? `Last edited on ${editedDate}` : `Created on ${date}`}
        </time>
      </article>
      <Toc head={head} />
    </>
  );
}
