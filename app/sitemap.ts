import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { AUTHORS, authorHref } from "@/lib/authors";
import { articleHref, articlesInCategory, categoryHref, PC_CATEGORIES, publishedArticles } from "@/lib/pc-content";

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.SITE_LAUNCHED !== "true") return [];
  return [
    { url: SITE_URL, priority: 1, changeFrequency: "weekly" },
    { url: `${SITE_URL}/guides`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${SITE_URL}/about-the-pc-journal`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${SITE_URL}/how-we-review`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${SITE_URL}/affiliate-disclosure`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${SITE_URL}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" },
    ...Object.values(AUTHORS).map((a) => ({ url: `${SITE_URL}${authorHref(a)}`, priority: 0.4, changeFrequency: "monthly" as const })),
    // Topic pages are listed only once they have published articles.
    ...PC_CATEGORIES.filter((c) => articlesInCategory(c).length > 0).map((c) => ({ url: `${SITE_URL}${categoryHref(c)}`, priority: 0.7, changeFrequency: "monthly" as const })),
    ...publishedArticles.map((a) => ({
      url: `${SITE_URL}${articleHref(a)}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
      ...(a.updatedAt ? { lastModified: a.updatedAt } : {}),
    })),
  ];
}
