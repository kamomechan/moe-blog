import { CommentType } from "./definitions";
import sql from "@/app/lib/db";

export async function fetchCommentsByPostId(post_id: string) {
  try {
    const comments = await sql<CommentType[]>`
      SELECT id,parent_id,author,content,created_at
      FROM comments
      WHERE post_id = ${post_id}
      ORDER BY created_at DESC;
    `;
    return comments;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Fail to fetch comments by post_id");
  }
}
