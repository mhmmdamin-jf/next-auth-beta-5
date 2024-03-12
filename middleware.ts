import NextAuth from "next-auth";
import {
  Default_Redirect_Route,
  apiAuthPrefixRoutes,
  authRoutes,
  publicRoutes,
} from "@/routes";
import authConfig from "./auth.config";
const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefixRoutes[0]);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiRoute) {
    return null;
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL(Default_Redirect_Route, nextUrl));
  }
  if (!isLoggedIn) {
    if (!isPublicRoute && !isAuthRoute) {
      let callBackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callBackUrl += encodeURIComponent(nextUrl.search);
      }
      return Response.redirect(
        new URL(`/login?callBackUrl=${callBackUrl}`, nextUrl),
      );
    }
    return null;
  }
  return null;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
