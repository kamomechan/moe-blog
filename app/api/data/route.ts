import { fetchCommentsByPostId } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get("postId");
  if (!postId) {
    return NextResponse.json(
      {
        error: "Query parameters 'postId' are required.",
      },
      { status: 400 }
    );
  }
  const comments = await fetchCommentsByPostId(postId);

  return NextResponse.json(
    { comments: JSON.stringify(comments) },
    { status: 200 }
  );
}
