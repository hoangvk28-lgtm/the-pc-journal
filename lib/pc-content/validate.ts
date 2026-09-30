import type { BestGuide, EvidenceItem, PcArticle, SourceRef } from "./types";
import { PC_CATEGORIES } from "./types";

export interface ValidationIssue {
  slug: string;
  severity: "error" | "warning";
  field: string;
  message: string;
}

const TESTING_WORDS = /\b(we tested|tested by us|our benchmarks?|hands-on review|in our lab|we measured|we tried)\b/i;
const DASHES = /[—–]/;

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/** Evidence the guide template may display: sourced where required, conditioned where tests are cited. */
export function displayableEvidence(item: EvidenceItem, sources: SourceRef[] | undefined): boolean {
  if (item.basis === "editorial") return !!item.claim.trim();
  const source = item.sourceId ? sources?.find((s) => s.id === item.sourceId) : undefined;
  if (!source || !isHttpUrl(source.url)) return false;
  if (item.basis === "third-party-test" && !item.conditions?.trim()) return false;
  return item.basis !== "pcj-measurement";
}

function validateBestGuide(a: BestGuide, push: (s: ValidationIssue["severity"], f: string, m: string) => void) {
  if (a.products.length < 3) push("error", "products", "A Best X guide needs at least 3 picks.");
  const badges = a.products.map((p) => p.badge.trim().toLowerCase());
  if (new Set(badges).size !== badges.length) push("error", "products.badge", "Duplicate pick labels.");
  const asins = a.products.map((p) => p.asin);
  if (new Set(asins).size !== asins.length) push("error", "products.asin", "Duplicate ASINs.");
  a.products.forEach((p, i) => {
    const f = `products.${p.id}`;
    if (p.rank !== i + 1) push("warning", `${f}.rank`, "Ranks should follow list order.");
    if (!/^[A-Z0-9]{10}$/.test(p.asin)) push("error", `${f}.asin`, "Invalid ASIN.");
    if (!p.amazonUrl.includes(`/dp/${p.asin}`)) push("error", `${f}.amazonUrl`, "Amazon URL does not match the ASIN.");
    if (!isHttpUrl(p.imageUrl)) push("error", `${f}.imageUrl`, "Missing product image from the Amazon API.");
    if (!p.description.includes("\n\n")) push("warning", `${f}.description`, "Description should have a verdict plus at least one paragraph.");
    if (!p.bestFor.trim() || !p.skipIf?.trim()) push("error", `${f}.bestFor`, "Best for and Skip if are required.");
    if (p.pros.length < 3) push("error", `${f}.pros`, "At least 3 pros.");
    if (p.cons.length < 2) push("warning", `${f}.cons`, "At least 2 cons.");
    if (p.specs.length < 3) push("warning", `${f}.specs`, "At least 3 key specs.");
  });
  if (a.buyingCriteria.length < 5) push("error", "buyingCriteria", "At least 5 buying criteria.");
  if (a.faq.length < 5) push("error", "faq", "At least 5 FAQ entries.");
  if (a.howWeEvaluated.length < 3) push("error", "howWeEvaluated", "At least 3 evaluation criteria.");
  if (a.bottomLine.length === 0) push("error", "bottomLine", "Bottom line is required.");
  if (a.seoTitle.length + 17 > 60) push("error", "seoTitle", `SEO title is ${a.seoTitle.length + 17} chars with suffix (max 60).`);
  const md = a.metaDescription ?? a.dek;
  if (md.length < 120 || md.length > 160) push("error", "metaDescription", `Meta description is ${md.length} chars (120 to 160).`);
}

/** Validates one article against the publication rules. Errors block publication. */
export function validateArticle(a: PcArticle, publishedSlugs: Set<string>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const push = (severity: ValidationIssue["severity"], field: string, message: string) => issues.push({ slug: a.slug, severity, field, message });

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug)) push("error", "slug", "Slug must be lowercase kebab-case.");
  if (!a.title.trim() || !a.seoTitle.trim()) push("error", "title", "Missing visible title or SEO title.");
  if (!a.dek.trim()) push("error", "dek", "Missing dek.");
  if (!PC_CATEGORIES.includes(a.category)) push("error", "category", "Unknown primary category.");
  if (a.hero && (!a.hero.src.trim() || !a.hero.alt.trim())) push("error", "hero", "Hero image needs src and alt text.");
  a.sources?.forEach((s) => { if (!isHttpUrl(s.url)) push("error", `sources.${s.id}`, "Source URL is invalid."); });
  a.related?.forEach((slug) => { if (!publishedSlugs.has(slug)) push("warning", "related", `Related article "${slug}" is not published; it will be dropped.`); });

  const text = JSON.stringify(a);
  if (TESTING_WORDS.test(text)) push("error", "copy", "Testing language used; this publication does not claim hands-on testing.");
  if (DASHES.test(text)) push("warning", "copy", "Em or en dash in copy.");

  if (a.type === "best-guide") validateBestGuide(a, push);
  else if (a.type === "long-form") { if (!a.body.trim()) push("error", "body", "A guide needs body content."); }
  else if (a.modules.length === 0) push("error", "modules", "A guide needs at least one content module.");
  return issues;
}
