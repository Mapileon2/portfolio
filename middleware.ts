import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Skip middleware for static files and API routes
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/static") ||
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname.endsWith(".pdf") ||
    req.nextUrl.pathname.endsWith(".jpg") ||
    req.nextUrl.pathname.endsWith(".png") ||
    req.nextUrl.pathname.endsWith(".svg") ||
    req.nextUrl.pathname.endsWith(".ico")
  ) {
    return NextResponse.next()
  }

  // Create a response object that we'll modify and return
  const res = NextResponse.next()

  // Mock authentication: always unauthenticated
  const session = null

  // Store the current URL for potential redirect after login
  const requestUrl = new URL(req.url)
  const redirectTo = requestUrl.pathname + requestUrl.search

  // If user is not signed in and the current path starts with /admin
  // but is not the login page, redirect to login
  if (!session && req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
    // Create URL to redirect to
    const loginUrl = new URL("/admin/login", req.url)

    // Add the original URL as a query parameter to redirect back after login
    if (redirectTo !== "/admin") {
      loginUrl.searchParams.set("redirectTo", redirectTo)
    }
    return NextResponse.redirect(loginUrl)
  }

  // If user is signed in and trying to access login page, redirect to admin dashboard
  if (session && req.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  // For all other cases, continue with the request
  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
