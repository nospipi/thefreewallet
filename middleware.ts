import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth, BASE_PATH } from "@/auth"

//--------------------------------------------------------------------------

export function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers)
  headers.set("x-current-path", request.nextUrl.pathname)
  return NextResponse.next({ headers })
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

export default auth((req) => {
  const reqUrl = new URL(req.url)
  if (!req.auth && reqUrl?.pathname !== "/") {
    return NextResponse.redirect(
      new URL(
        `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
          reqUrl?.pathname
        )}`,
        req.url
      )
    )
  }
})
