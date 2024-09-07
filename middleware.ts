import { NextResponse } from "next/server"
import { auth } from "@/auth"

//--------------------------------------------------------------------------

export const config = {
  matcher: [
    // match all routes except static files and APIs
    //"/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/((?!api|_next/static|_next/image|.*\\.png|manifest.webmanifest|favicon.ico|.*\\.server\\.tsx$).*)",
  ],
};

//https://github.com/vercel/next.js/issues/50659

export default auth((req) => {
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);

  const reqUrl = new URL(req.url);
  // Debugging log
  console.log("Intercepted path:", reqUrl.pathname);

  if (!req.auth && reqUrl?.pathname !== "/welcome") {
    console.log("not authenticated");
    return NextResponse.redirect(
      new URL(`/welcome?callbackUrl=${encodeURI(reqUrl?.pathname)}`, req.url)
    );
  }

  return NextResponse.next({
    request: {
      headers: headers, //https://github.com/vercel/next.js/issues/50659#issuecomment-2211256368
    },
  });
});
