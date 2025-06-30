import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Define protected paths that require authentication
  const protectedPaths = ["/home", "/home/messages", "/home/contacts"]

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`),
  )

  // If it's a protected path and there's no token, redirect to login
  if (isProtectedPath && !token) {
    const url = new URL("/", request.url)
    url.searchParams.set("error", "SessionRequired")
    return NextResponse.redirect(url)
  }

  // If it's the login page and there's a token, redirect to home
  if (request.nextUrl.pathname === "/" && token) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/", "/home", "/home/messages/:path*", "/home/contacts/:path*"],
}
