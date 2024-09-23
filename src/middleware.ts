import { NextRequest, NextResponse, type NextFetchEvent } from "next/server";

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  const response = NextResponse.next();

  // List of paths that do not require authentication
  const publicPaths = [
    "/signin",
    "/register",
    "/forget-password",
    "/assets/img/fulllogo.svg",
  ];

  const staticFileExtensions =
    /\.(css|js|jpg|jpeg|png|gif|svg|webp|ico|bmp|tiff)$/i;

  // Check if the user is logged in by looking for an `isLoggedIn` cookie
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";

  // If the path is public, or the user is logged in, or the request is for a static file, allow the request to proceed
  if (
    publicPaths.includes(request.nextUrl.pathname) ||
    isLoggedIn ||
    staticFileExtensions.test(request.nextUrl.pathname)
  ) {
    return response;
  }

  // If the user is not logged in, redirect them to the login page
  return NextResponse.redirect(new URL("/signin", request.url));
}
