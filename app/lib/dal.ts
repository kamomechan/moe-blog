import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./session";
import { PayloadType } from "./definitions";

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  const payload = (await decrypt(session)) as PayloadType | undefined;

  if (!payload) {
    return null;
  }

  return payload.id
    ? { id: payload.id, role: payload.role }
    : { role: payload.role };
});
