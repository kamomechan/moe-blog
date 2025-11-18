import preview from "@/app/lib/preview";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'query' is required." },
      { status: 400 }
    );
  }
  const result = preview
    .map((item) => item.data)
    .filter((article) => {
      return (
        article.title.includes(query) || article.description.includes(query)
      );
    });
  return NextResponse.json(JSON.stringify(result), { status: 200 });
}
