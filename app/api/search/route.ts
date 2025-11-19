import preview from "@/app/lib/preview";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const page = searchParams.get("page");

  if (!query || !page) {
    return NextResponse.json(
      { error: "Query parameters 'query' and 'page' are required." },
      { status: 400 }
    );
  }

  const result = preview
    .map((item) => item.data)
    .filter((article) => {
      return (
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
      );
    });

  const itemsPerPage = Number(process.env.ITEMS_PER_PAGE);
  const totalPages = Math.ceil(result.length / itemsPerPage);
  const currentPage = Number(page);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const sliceResult = result.slice(startIndex, endIndex);

  return NextResponse.json(
    { data: JSON.stringify(sliceResult), totalPages: totalPages },
    { status: 200 }
  );
}
