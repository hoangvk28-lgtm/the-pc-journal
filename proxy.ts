import { NextRequest, NextResponse } from "next/server";
import { publishedArticles, PC_CATEGORIES } from "@/lib/pc-content";

const publicPages = new Set([
  "/", "/guides", "/how-we-review", "/about-the-pc-journal",
  "/affiliate-disclosure", "/privacy-policy", "/robots.txt", "/sitemap.xml",
  "/pc-mark.svg", "/pc-og.svg", "/pc-apple-icon.png", "/pc-logo.png", "/pc-icon-512.png", "/favicon-16x16.png", "/favicon-32x32.png",
]);
const guideSlugs = new Set(publishedArticles.map((a) => a.slug));
const topicSlugs = new Set<string>(PC_CATEGORIES);

export function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  if (/Bytespider|CCBot/i.test(ua)) return new NextResponse("Forbidden", { status: 403 });

  const pathname = request.nextUrl.pathname;
  // Old Office Journal pages remain in the clone for editorial review, but are
  // absent from this publication's public inventory.
  const publicPath = publicPages.has(pathname)
    || (pathname.startsWith("/guides/") && guideSlugs.has(pathname.slice("/guides/".length)))
    || (pathname.startsWith("/topics/") && topicSlugs.has(pathname.slice("/topics/".length)));
  // Template fixtures (sample data) only when explicitly enabled for development.
  const fixturePath = pathname.startsWith("/dev/fixtures/") && process.env.PCJ_ENABLE_FIXTURES === "true";
  const infrastructurePath = pathname.startsWith("/_next/") || pathname.startsWith("/images/pcj/")
    || (pathname.startsWith("/admin") && !!process.env.ADMIN_EMAIL && !!process.env.ADMIN_PASSWORD && !!process.env.SESSION_SECRET)
    || (pathname.startsWith("/api/admin") && !!process.env.ADMIN_EMAIL && !!process.env.ADMIN_PASSWORD && !!process.env.SESSION_SECRET);
  if (!publicPath && !fixturePath && !infrastructurePath) return new NextResponse("Not Found", { status: 404 });

  const response = NextResponse.next();
  if (process.env.SITE_LAUNCHED !== "true" || fixturePath || pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image).*)"] };
