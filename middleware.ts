import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId");
  const path = request.nextUrl.pathname;

  // Only run on /[sessionId] routes, but not on /[sessionId]/createUser
  if (path.split("/").length === 2 && path !== "/") {
    if (!userId) {
      const url = request.nextUrl.clone();
      url.pathname = `${path}/createUser`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:sessionId",
};
