import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import createIntlMiddleware from "next-intl/middleware"
import { defaultLocale, localePrefix, locales } from "@/config"

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  defaultLocale,
  localePrefix,
  locales,
})

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin") || pathname === "/login" || pathname.startsWith("/api/auth")) {
    if (pathname.startsWith("/admin")) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      })

      if (!token) {
        const url = new URL("/login", request.url)
        url.searchParams.set("callbackUrl", pathname)
        return NextResponse.redirect(url)
      }
    }

    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    "/",
    "/(ua|en)/:path*",

    "/admin/:path*",
    "/login",
    "/api/auth/:path*",
  ],
}

