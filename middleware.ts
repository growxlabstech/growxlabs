import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. Admin/Co-Admin Protection
    if (path.startsWith("/admin")) {
      if (!["ADMIN", "CO_ADMIN"].includes(token?.role as string)) {
        return NextResponse.redirect(new URL("/client/dashboard", req.url));
      }
    }

    // 2. Client Portal Protection
    if (path.startsWith("/client")) {
      if (token?.role !== "CLIENT") {
        return NextResponse.redirect(new URL("/admin/leads", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/client/:path*",
    "/onboarding/:path*",
  ],
};
