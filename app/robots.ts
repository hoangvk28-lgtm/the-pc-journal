import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const allowBots = [
  "GPTBot",
  "ChatGPT-User",
  "Claude-Web",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_LAUNCHED !== "true") return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/", "/_next/image"],
        disallow: ["/admin", "/admin/", "/api/admin", "/api/admin/", "/api/", "/_next/"],
      },
      ...allowBots.map((userAgent) => ({ userAgent, allow: "/" })),
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
