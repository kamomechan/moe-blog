"use server";

import { z } from "zod";
import sql from "./db";
import bcrypt from "bcrypt";
import type { UserType } from "./definitions";
import { redirect } from "next/navigation";
import { createSession } from "./session";
import { verifySession } from "./dal";

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

export type DeleteState = {
  message?: string | null;
  errors?: string | null;
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
    const session = await verifySession();
    const isAuthor = session?.role === "admin";

    if (parent_id) {
      const result = await sql`
        INSERT INTO comments (post_id,parent_id,author,content)
        VALUES (${postId},${parent_id},${isAuthor},${content})
        RETURNING id
        `;
      if (!session) {
        await createSession({ id: [result[0].id], role: "guest" });
      } else if (!isAuthor) {
        await createSession({
          id: [...session.id!, result[0].id],
          role: "guest",
        });
      }
      return {
        message: `success: ${result[0].id}`,
      };
    } else {
      const result = await sql`
        INSERT INTO comments (post_id,author,content)
        VALUES (${postId},${isAuthor},${content})
        RETURNING id
        `;
      if (!session) {
        await createSession({ id: [result[0].id], role: "guest" });
      } else if (!isAuthor) {
        await createSession({
          id: [...session.id!, result[0].id],
          role: "guest",
        });
      }
      return {
        message: `successfully added: ${result[0].id}`,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Database error: Fail to add comment",
    };
  }
}

export async function deleteComment(id: string, prevState: DeleteState) {
  try {
    const session = await verifySession();

    if (!session) {
      return {
        errors: "No permission.",
      };
    }

    if (session.role === "guest" && !session.id?.includes(id)) {
      return {
        errors: "No permission.",
      };
    }

    await sql`
    DELETE FROM comments WHERE id = ${id}
  `;
    return {
      message: `successfully deleted: ${id}`,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Database error: Fail to delete comment",
    };
  }
}

const EditComment = FormSchema.omit({
  id: true,
  post_id: true,
  created_at: true,
  parent_id: true,
});
export type EditState = {
  message?: string | null;
  errors?: {
    content?: string[];
  };
};

export async function editComment(
  id: string,
  prevState: EditState | undefined,
  formData: FormData
) {
  const rawFormData = {
    content: formData.get("content"),
  };
  const validatedFields = EditComment.safeParse(rawFormData);
  if (!validatedFields.success) {
    return { errors: z.flattenError(validatedFields.error).fieldErrors };
  }
  const { content } = validatedFields.data;

  try {
    const session = await verifySession();

    if (!session) {
      return { errors: { content: ["No permission."] } };
    }

    if (session.role === "guest" && !session.id?.includes(id)) {
      return { errors: { content: ["No permission."] } };
    }

    await sql`
      UPDATE comments
      SET content = ${content}
      WHERE id = ${id}
    `;

    return { message: `successfully edited: ${id}` };
  } catch (error) {
    return {
      message: "Database error: Fail to edit comment",
    };
  }
}

export type LoginState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string | null;
};
const LoginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { error: "You cannot just enter spaces." }),
  password: z
    .string()
    .trim()
    .min(18, { error: "The minimum password length is 18 characters." }),
  email: z.null(),
});
export async function authenticate(
  prevState: LoginState | undefined,
  formData: FormData
) {
  const rawFormData = {
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email") || null, // may be ""
  };
  const validatedFields = LoginSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }
  const { username, password } = validatedFields.data;
  const getUser: UserType[] = await sql`
    SELECT *
    FROM users
    WHERE username = ${username} 
  `;
  if (!getUser[0]) {
    return { message: "Username or password incorrect" };
  }
  const { password: hashPassword } = getUser[0];
  const passwordMatch = await bcrypt.compare(password, hashPassword);
  if (!passwordMatch) {
    return { message: "Username or password incorrect" };
  }

  await createSession({ role: "admin" });
  redirect("/");
}
