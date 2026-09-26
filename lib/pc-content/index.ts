import { publishedGuides } from "@/data/pc-articles";
import { fixtures } from "@/data/fixtures/pc-fixtures";
import type { PcArticle, PcCategory } from "./types";
import { CATEGORY_LABELS } from "./types";
import { validateArticle, type ValidationIssue } from "./validate";

export * from "./types";

/** Registry of all article records. Add new articles here. */
const allArticles: PcArticle[] = [...publishedGuides];

/** Published articles that pass validation with no errors. */
export const publishedArticles: PcArticle[] = (() => {
  const slugs = new Set(allArticles.filter((a) => a.status === "published").map((a) => a.slug));
  return allArticles.filter((a) => a.status === "published" && !validateArticle(a, slugs).some((i) => i.severity === "error"));
})();

const publishedSlugs = new Set(publishedArticles.map((a) => a.slug));

export function getPublishedArticle(slug: string): PcArticle | undefined {
  return publishedArticles.find((a) => a.slug === slug);
}

export function articlesInCategory(category: PcCategory): PcArticle[] {
  return publishedArticles.filter((a) => a.category === category);
}

export function articleHref(a: Pick<PcArticle, "slug">): string {
  return `/guides/${a.slug}`;
}

export function categoryHref(category: PcCategory): string {
  return `/topics/${category}`;
}

export function categoryLabel(category: PcCategory): string {
  return CATEGORY_LABELS[category];
}

/** Related articles: declared links first (published only), then same-category articles. */
export function relatedArticles(a: PcArticle, limit = 3): PcArticle[] {
  const declared = (a.related ?? []).filter((s) => publishedSlugs.has(s) && s !== a.slug).map((s) => getPublishedArticle(s)!);
  const sameCategory = publishedArticles.filter((x) => x.category === a.category && x.slug !== a.slug && !declared.includes(x));
  return [...declared, ...sameCategory].slice(0, limit);
}

export function validationReport(): ValidationIssue[] {
  const slugs = new Set(allArticles.filter((a) => a.status === "published").map((a) => a.slug));
  return [...allArticles, ...fixtures].flatMap((a) => validateArticle(a, slugs));
}

export const fixturesEnabled = () => process.env.PCJ_ENABLE_FIXTURES === "true";

export function getFixture(slug: string): PcArticle | undefined {
  return fixturesEnabled() ? fixtures.find((f) => f.slug === slug) : undefined;
}
