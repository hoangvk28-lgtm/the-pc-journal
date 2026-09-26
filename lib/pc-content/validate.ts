import { AMAZON_TAG, withAmazonTag } from "@/lib/affiliate";
import type { BuyingGuide, EvidenceItem, PcArticle, ProductRecommendation, RetailerLink, SourceRef } from "./types";
import { PC_CATEGORIES } from "./types";

export interface ValidationIssue {
  slug: string;
  severity: "error" | "warning";
  field: string;
  message: string;
}

const TESTING_WORDS = /\b(we tested|tested by us|our benchmarks?|hands-on review|in our lab|we measured)\b/i;

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/** A retailer link renders only when The PC Journal's own affiliate configuration exists for that retailer. */
export function resolveRetailerHref(link?: RetailerLink): string | undefined {
  if (!link || !isHttpUrl(link.url)) return undefined;
  if (link.retailer === "amazon") {
    if (!AMAZON_TAG) return undefined;
    const host = new URL(link.url).hostname;
    if (!/(^|\.)amazon\.[a-z.]+$/i.test(host)) return undefined;
    return withAmazonTag(link.url);
  }
  return undefined; // no other retailer programme is configured
}

/** Evidence the template may display: sourced where a source is required, conditioned where tests are cited. */
export function displayableEvidence(item: EvidenceItem, sources: SourceRef[] | undefined, article: Pick<BuyingGuide, "testingRecord"> | object): boolean {
  if (item.basis === "editorial") return !!item.claim.trim();
  const source = item.sourceId ? sources?.find((s) => s.id === item.sourceId) : undefined;
  if (!source || !isHttpUrl(source.url)) return false;
  if (item.basis === "third-party-test" && !item.conditions?.trim()) return false;
  if (item.basis === "pcj-measurement" && !("testingRecord" in article && article.testingRecord)) return false;
  return true;
}

function validateProduct(a: BuyingGuide, p: ProductRecommendation, issues: ValidationIssue[]) {
  const push = (severity: ValidationIssue["severity"], field: string, message: string) =>
    issues.push({ slug: a.slug, severity, field: `products.${p.id}.${field}`, message });
  if (!p.model.trim()) push("error", "model", "Missing exact product model.");
  if (!p.verdict.trim() || !p.bestFor.trim() || !p.skipIf.trim()) push("error", "verdict", "Verdict, Best for and Skip if are required.");
  if (p.label && !p.labelReason?.trim()) push("error", "label", `Label "${p.label}" has no documented reason.`);
  if (p.compatibilityChecks.length === 0) push("error", "compatibilityChecks", "A hardware recommendation needs at least one compatibility check.");
  for (const [key, spec] of Object.entries(p.specs)) {
    if (!a.specColumns.some((c) => c.key === key)) push("warning", `specs.${key}`, "Spec is not a declared column for this article.");
    if (!a.sources?.some((s) => s.id === spec.sourceId)) push("error", `specs.${key}`, "Spec value has no matching source.");
  }
  p.evidence.forEach((e, i) => {
    if (!displayableEvidence(e, a.sources, a)) push("error", `evidence.${i}`, `Evidence (${e.basis}) is missing a valid source, test conditions or a testing record; it will be hidden.`);
  });
  if (p.score !== undefined && !a.scoringSystem) push("error", "score", "Score present but the article has no documented scoring system; it will be hidden.");
  if (p.retailer && !isHttpUrl(p.retailer.url)) push("error", "retailer", "Retailer URL is not a valid http(s) URL.");
  if (p.pros.length === 0 || p.cons.length === 0) push("warning", "pros/cons", "Pros and cons should both be present.");
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
  if (TESTING_WORDS.test(text) && !(a.type === "buying-guide" && a.testingRecord)) push("error", "copy", "Testing language used without a documented testing record.");

  if (a.type === "buying-guide") {
    if (!a.scope.trim() || !a.researchBasis.trim()) push("error", "scope", "Scope and research basis are required.");
    if (a.products.length === 0) push("error", "products", "A buying guide needs at least one recommendation.");
    const labels = a.products.map((p) => p.label?.trim().toLowerCase()).filter(Boolean);
    if (new Set(labels).size !== labels.length) push("error", "products.label", "Duplicate recommendation labels.");
    const ids = a.products.map((p) => p.id);
    if (new Set(ids).size !== ids.length) push("error", "products.id", "Duplicate product ids.");
    a.products.forEach((p) => validateProduct(a, p, issues));
    if (a.compatibilityChecklist.length === 0) push("error", "compatibilityChecklist", "Compatibility checklist is required.");
    if (a.limitations.length === 0) push("warning", "limitations", "State the limits of the research.");
  } else {
    if (a.modules.length === 0) push("error", "modules", "A guide needs at least one content module.");
  }
  return issues;
}
