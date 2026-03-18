import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/feed", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
