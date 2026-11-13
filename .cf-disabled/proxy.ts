import { NextRequest, NextResponse } from "next/server";

const publicPages = new Set([
  "/", "/guides", "/how-we-review", "/about-the-pc-journal",
  "/affiliate-disclosure", "/privacy-policy", "/robots.txt", "/sitemap.xml",
  "/pc-mark.svg", "/pc-og.svg", "/pc-og.png", "/pc-apple-icon.png", "/pc-logo.png", "/pc-icon-512.png", "/favicon-16x16.png", "/favicon-32x32.png",
  "/f734233bb0bf4a4eb7a09e0dfa6a9ec9.txt",
]);
// Keep this file free of content imports: the proxy runs on every request, and importing the
// article registry made each invocation compose 2,000+ guides (Vercel Fluid CPU blew past the
// free tier). Unknown slugs under these prefixes already 404 via `dynamicParams = false`.
const dynamicPrefix = /^\/((guides|topics|author)\/[a-z0-9-]+|topics\/[a-z0-9-]+\/[a-z0-9-]+)$/;

export function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  if (/Bytespider|CCBot/i.test(ua)) return new NextResponse("Forbidden", { status: 403 });

  const pathname = request.nextUrl.pathname;
  // Old Office Journal pages remain in the clone for editorial review, but are
  // absent from this publication's public inventory.
  const publicPath = publicPages.has(pathname)
    || dynamicPrefix.test(pathname);
  // Drafts and fixtures only when preview is explicitly enabled.
  const fixturePath = pathname.startsWith("/dev/preview/") && process.env.PCJ_ENABLE_PREVIEW === "true";
  const infrastructurePath = pathname.startsWith("/_next/") || pathname.startsWith("/images/pcj/")
    || (pathname.startsWith("/admin") && !!process.env.ADMIN_EMAIL && !!process.env.ADMIN_PASSWORD && !!process.env.SESSION_SECRET)
    || (pathname.startsWith("/api/admin") && !!process.env.ADMIN_EMAIL && !!process.env.ADMIN_PASSWORD && !!process.env.SESSION_SECRET);
  if (!publicPath && !fixturePath && !infrastructurePath) return new NextResponse("Not Found", { status: 404 });

  const response = NextResponse.next();
  if (process.env.SITE_LAUNCHED !== "true" || fixturePath || pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image).*)"] };
