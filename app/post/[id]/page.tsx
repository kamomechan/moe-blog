import preview from "@/app/lib/preview";
import { marked } from "marked";
import getRenderer from "@/app/lib/renderer";

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const [article] = preview.filter((article) => {
    if (id === article.data.id) {
      return true;
    }
    return false;
  });
  return {
    title: article.data.title,
    description: article.data.description,
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
  const renderer = getRenderer(id);
  marked.use({ renderer });
  const html = marked.parse(article.content);
  const date = article.data.date.toISOString().split("T")[0];
  const editedDate = article.data.edit?.toISOString().split("T")[0];
  return (
    <>
      <h1 className="text-center text-[13vw] text-[#3f80b5] pt-[17.8vw] lg:text-[5.2vw] lg:pt-[2.9vw]">
        Posts
      </h1>
      <article className="w-[89vw] m-[6.5vw_auto] p-[7.8vw_6.5vw_3.2vw] rounded-[1.3vw] shadow-[0_2.6041666667vw_2.6041666667vw_rgba(71,80,104,.14)] lg:w-[50vw] lg:m-[3vw_auto_5vw] lg:p-[3.1vw_4vw_2vw] lg:shadow-[0_1.0416666667vw_1.0416666667vw_rgba(71,80,104,.14)] lg:rounded-[0.5vw]">
        <div
          className="prose prose-headings:text-[#3f80b5] prose-custom"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <time className="text-[#3876a8] text-[0.8rem] mt-4 flex justify-end lg:mt-8">
          {editedDate ? `Last edited on ${editedDate}` : `Created on ${date}`}
        </time>
      </article>
    </>
  );
}
