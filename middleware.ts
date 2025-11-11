import { auth } from "@/auth";

export default auth((req) => {
  // /write 페이지 보호
  if (req.nextUrl.pathname.startsWith("/write") && !req.auth) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/write/:path*", "/api/posts/:path*"],
};
