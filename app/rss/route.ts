import preview from "@/app/lib/preview";

export const dynamic = "force-static";

export function GET() {
  const title = "moe-blog";
  const description =
    "Discussing visual novels and moe culture, with occasional posts on open-source projects.";
  const link = "https://tia-chan.top";
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
 <title>${title}</title>
 <description>${description}</description>
 <link>${link}</link>
 ${preview.map(({ data: item }) => {
   return `<item>
    <title>${item.title}</title>
    <description>${item.description}</description>
    <link>${link}${item.href}</link>
    <pubDate>${item.date}</pubDate>
    <guid isPermaLink="false">${link}${item.href}</guid>
 </item>`;
 })}
</channel>
</rss>`;
  const headers = new Headers({ "content-type": "application/xml" });
  return new Response(rss, { headers });
}
