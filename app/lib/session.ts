import "server-only";
import { SignJWT, jwtVerify } from "jose";
import type { PayloadType } from "./definitions";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: PayloadType) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Fail to verify session");
  }
}

export async function createSession({
  id,
  role,
}: {
  id?: string[];
  role: string;
}) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await (id ? encrypt({ id, role }) : encrypt({ role }));
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  const payload = await decrypt(session);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  if (!payload) {
    return null;
  }

  const newSession = await encrypt(payload as PayloadType);

  cookieStore.set("session", newSession, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
