import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const authPages = ["/login", "/signup", "/forgotPassword"];
  const protectedPages = ["/change-password"];

  // 1️⃣ Redirect logged-in users away from auth pages
  if (token && authPages.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2️⃣ Redirect unauthenticated users away from protected pages
  if (!token && protectedPages.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/forgotPassword", "/change-password"],
};
