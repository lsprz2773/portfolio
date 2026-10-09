import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip internal paths and anything with a file extension (favicon, CV, images)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
