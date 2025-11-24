"use server";

import { z } from "zod";
import sql from "./db";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  id: z.string(),
  post_id: z.string(),
  parent_id: z.nullable(
    z.uuid({ version: "v4", error: "If you are a bot, please leave :(" })
  ),
  content: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Please enter a comment" : "Not a string",
    })
    .trim()
    .min(1, { error: "You cannot just enter spaces." }),
  created_at: z.string(),
});

const AddComment = FormSchema.omit({
  id: true,
  post_id: true,
  created_at: true,
});

export type State = {
  errors?: {
    content?: string[];
    parent_id?: string[];
  };
  message?: string | null;
};

export async function addComment(
  postId: string,
  prevState: State | undefined,
  formData: FormData
) {
  const rawFormData = {
    content: formData.get("content"),
    parent_id: formData.get("parent_id") || null, // may be ""
  };
  const validatedFields = AddComment.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Missing fields, failed to add comment",
    };
  }

  const { content, parent_id } = validatedFields.data;

  try {
    if (parent_id) {
      await sql`
          INSERT INTO comments (post_id,parent_id,content)
          VALUES (${postId},${parent_id},${content})
        `;
    } else {
      await sql`
          INSERT INTO comments (post_id,content)
          VALUES (${postId},${content})
        `;
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Database error: Fail to add comment",
    };
  }
  revalidatePath(`/post/${postId}`);
}
