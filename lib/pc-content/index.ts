import { publishedGuides } from "@/data/pc-articles";
import { firstFiftyGuides } from "@/data/first-fifty";
import { nextHundredGuides } from "@/data/next-hundred";
import { draftBuyingGuides } from "@/data/pc-buying-guides";
import { psuCluster } from "@/data/clusters/psu-cluster";
import { composePsuGuide } from "@/lib/pc-compose/psu";
import { batch2 } from "@/data/clusters/batch2";
import { batch3 } from "@/data/clusters/batch3";
import { batch4 } from "@/data/clusters/batch4";
import { batch5 } from "@/data/clusters/batch5";
import { batch6 } from "@/data/clusters/batch6";
import { batch7 } from "@/data/clusters/batch7";
import { batch8 } from "@/data/clusters/batch8";
import { batch9 } from "@/data/clusters/batch9";
import { batch10 } from "@/data/clusters/batch10";
import { batch10b } from "@/data/clusters/batch10b";
import { batch10c } from "@/data/clusters/batch10c";
import { batch11 } from "@/data/clusters/batch11";
import { batch11b } from "@/data/clusters/batch11b";
import { batch11c } from "@/data/clusters/batch11c";
import { batch12 } from "@/data/clusters/batch12";
import { batch12b } from "@/data/clusters/batch12b";
import { batch12c } from "@/data/clusters/batch12c";
import { batch12d } from "@/data/clusters/batch12d";
import { batch12e } from "@/data/clusters/batch12e";
import { batch13c } from "@/data/clusters/batch13c";
import { batch13c2 } from "@/data/clusters/batch13c2";
import { batch13c3 } from "@/data/clusters/batch13c3";
import { batch13c4 } from "@/data/clusters/batch13c4";
import { batch13a } from "@/data/clusters/batch13a";
import { batch13a2 } from "@/data/clusters/batch13a2";
import { batch13a3 } from "@/data/clusters/batch13a3";
import { batch13a4 } from "@/data/clusters/batch13a4";
import { batch13a5 } from "@/data/clusters/batch13a5";
import { batch13b } from "@/data/clusters/batch13b";
import { batch13b2 } from "@/data/clusters/batch13b2";
import { batch13b3 } from "@/data/clusters/batch13b3";
import { batch13d } from "@/data/clusters/batch13d";
import { batch13d2 } from "@/data/clusters/batch13d2";
import { batch13d3 } from "@/data/clusters/batch13d3";
import { batch13e } from "@/data/clusters/batch13e";
import { batch13e2 } from "@/data/clusters/batch13e2";
import { batch13e3 } from "@/data/clusters/batch13e3";
import { batch13e4 } from "@/data/clusters/batch13e4";
import { batch14 } from "@/data/clusters/batch14";
import { batch15a } from "@/data/clusters/batch15a";
import { batch15b } from "@/data/clusters/batch15b";
import { batch15c } from "@/data/clusters/batch15c";
import { batch15d } from "@/data/clusters/batch15d";
import { batch15e } from "@/data/clusters/batch15e";
import { batch16a } from "@/data/clusters/batch16a";
import { batch17 } from "@/data/clusters/batch17";
import { batch18 } from "@/data/clusters/batch18";
import { batch19 } from "@/data/clusters/batch19";
import { batch20 } from "@/data/clusters/batch20";
import { batch21 } from "@/data/clusters/batch21";
import { batch22 } from "@/data/clusters/batch22";
import { batch23 } from "@/data/clusters/batch23";
import { batch24 } from "@/data/clusters/batch24";
import { batch25 } from "@/data/clusters/batch25";
import { batch26 } from "@/data/clusters/batch26";
import { batch27 } from "@/data/clusters/batch27";
import { batch28 } from "@/data/clusters/batch28";
import { batch29 } from "@/data/clusters/batch29";
import { batch30 } from "@/data/clusters/batch30";
import { batch31 } from "@/data/clusters/batch31";
import { batch32 } from "@/data/clusters/batch32";
import { composeAllBuilds } from "@/data/clusters/builds31-compose";
import { composeGuide, dedupeDoubled } from "@/lib/pc-compose/generic";
import { fixtures } from "@/data/fixtures/pc-fixtures";
import type { PcArticle, PcCategory } from "./types";
import { CATEGORY_LABELS } from "./types";
import { validateArticle, type ValidationIssue } from "./validate";

export * from "./types";

/** Registry of all article records. Add new articles here. */
const allArticles: PcArticle[] = dedupeDoubled([...publishedGuides, ...firstFiftyGuides, ...nextHundredGuides, ...draftBuyingGuides, ...psuCluster.map(composePsuGuide), ...[...batch2, ...batch3, ...batch4, ...batch5, ...batch6, ...batch7, ...batch8, ...batch9, ...batch10, ...batch10b, ...batch10c, ...batch11, ...batch11b, ...batch11c, ...batch12, ...batch12b, ...batch12c, ...batch12d, ...batch12e, ...batch13c, ...batch13c2, ...batch13c3, ...batch13c4, ...batch13a, ...batch13a2, ...batch13a3, ...batch13a4, ...batch13a5, ...batch13b, ...batch13b2, ...batch13b3, ...batch13d, ...batch13d2, ...batch13d3, ...batch13e, ...batch13e2, ...batch13e3, ...batch13e4, ...batch14, ...batch15a, ...batch15b, ...batch15c, ...batch15d, ...batch15e, ...batch16a, ...batch17, ...batch18, ...batch19, ...batch20, ...batch21, ...batch22, ...batch23, ...batch24, ...batch25, ...batch26, ...batch27, ...batch28, ...batch29, ...batch30, ...batch31, ...batch32].map((b) => composeGuide(b.cfg, b.schema, b.facts)), ...composeAllBuilds()]);

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
