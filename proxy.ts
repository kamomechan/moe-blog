import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./app/lib/session";

export default async function proxy(req: NextRequest) {
  const state = await updateSession();
  if (state === null) {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
