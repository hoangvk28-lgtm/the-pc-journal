import { publishedGuides } from "@/data/pc-articles";
import { draftBuyingGuides } from "@/data/pc-buying-guides";
import { psuCluster } from "@/data/clusters/psu-cluster";
import { composePsuGuide } from "@/lib/pc-compose/psu";
import { fixtures } from "@/data/fixtures/pc-fixtures";
import type { PcArticle, PcCategory } from "./types";
import { CATEGORY_LABELS } from "./types";
import { validateArticle, type ValidationIssue } from "./validate";

export * from "./types";

/** Registry of all article records. Add new articles here. */
const allArticles: PcArticle[] = [...publishedGuides, ...draftBuyingGuides, ...psuCluster.map(composePsuGuide)];

export const registry: readonly PcArticle[] = allArticles;

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

/** Drafts and fixtures are viewable only under /dev/preview when PCJ_ENABLE_PREVIEW=true (always noindex). */
export const previewEnabled = () => process.env.PCJ_ENABLE_PREVIEW === "true";

export function getPreview(slug: string): PcArticle | undefined {
  if (!previewEnabled()) return undefined;
  return fixtures.find((f) => f.slug === slug) ?? allArticles.find((a) => a.slug === slug && a.status === "draft");
}

export function previewSlugs(): { slug: string; status: string; title: string }[] {
  return [...allArticles.filter((a) => a.status === "draft"), ...fixtures].map((a) => ({ slug: a.slug, status: a.status, title: a.title }));
}
