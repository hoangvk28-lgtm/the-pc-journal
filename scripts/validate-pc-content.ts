/**
 * Validates every PC Journal article record, then runs cross-article checks for Best X guides.
 * Usage: npx tsx scripts/validate-pc-content.ts
 * Exits 1 on any error in a non-fixture article.
 */
import { publishedArticles, registry, validationReport } from "../lib/pc-content";
import { fixtures } from "../data/fixtures/pc-fixtures";
import type { BestGuide } from "../lib/pc-content/types";
import { templatedDescriptions } from "../lib/pc-compose/psu";

const fixtureSlugs = new Set(fixtures.map((f) => f.slug));
const issues = validationReport();
const cross: string[] = [];
const best = registry.filter((a): a is BestGuide => a.type === "best-guide");

// 1. Product sets: identical sets are errors; heavy overlap is a warning.
for (let i = 0; i < best.length; i++) for (let j = i + 1; j < best.length; j++) {
  const a = new Set(best[i].products.map((p) => p.asin)), b = best[j].products.map((p) => p.asin);
  const shared = b.filter((x) => a.has(x)).length;
  if (shared === a.size && shared === b.length) cross.push(`ERROR identical product set: ${best[i].slug} = ${best[j].slug}`);
  else if (shared >= 3) cross.push(`WARNING ${shared} shared picks: ${best[i].slug} / ${best[j].slug}`);
}

// 2. Repeated 8-word phrases in article-specific prose and product copy.
const grams = new Map<string, Set<string>>();
const add = (slug: string, text: string) => {
  const w = text.toLowerCase().replace(/[^a-z0-9$%. ]/g, " ").split(/\s+/).filter(Boolean);
  for (let k = 0; k + 8 <= w.length; k++) { const g = w.slice(k, k + 8).join(" "); (grams.get(g) ?? grams.set(g, new Set()).get(g)!).add(slug); }
};
for (const a of best) { [...a.introParagraphs, ...a.bottomLine, ...a.products.map((p) => p.description)].forEach((t) => add(a.slug, t)); }
const repeated = [...grams.entries()].filter(([, s]) => s.size > 3);
for (const [g, s] of repeated.slice(0, 15)) cross.push(`WARNING phrase in ${s.size} guides: "${g}"`);
if (repeated.length > 15) cross.push(`WARNING ... ${repeated.length - 15} more repeated 8-word phrases`);

// Sections after the picks must be written from each guide's own products: a guide may carry at most
// 2 FAQ/criteria/method/table texts that appear verbatim in more than 10 guides (shared general advice).
const backTexts = (a: BestGuide) => [
  ...a.faq.flatMap((q) => [q.q, q.a]), ...a.buyingCriteria.map((c) => c.explanation),
  ...a.howWeEvaluated.map((e) => e.description), ...a.howToChoose.flatMap((h) => [h.intro, h.note]),
].filter((t): t is string => !!t);
const backCount = new Map<string, number>();
for (const a of best) for (const t of new Set(backTexts(a))) backCount.set(t, (backCount.get(t) ?? 0) + 1);
for (const a of best) {
  const shared = [...new Set(backTexts(a))].filter((t) => backCount.get(t)! > 10);
  if (shared.length > 2) cross.push(`ERROR ${a.slug}: ${shared.length} FAQ/criteria/method texts repeated verbatim in 10+ guides, e.g. "${shared[0].slice(0, 70)}"`);
}
for (const t of templatedDescriptions) cross.push(`WARNING template description (write an article-specific one): ${t}`);

// 3. Copy-paste artifacts and truncation.
for (const a of best) for (const p of a.products) {
  for (const t of [p.description, ...p.pros, ...p.cons, ...p.specs, p.bestFor, p.skipIf ?? ""]) {
    if (/[【】]|^[A-Z0-9 &-]{8,}:/.test(t)) cross.push(`ERROR ${a.slug} ${p.id}: listing bullet artifact "${t.slice(0, 60)}"`);
    if (/\b(a|an|the|and|with|for|of|to)\.?$/i.test(t.trim())) cross.push(`ERROR ${a.slug} ${p.id}: truncated "${t.slice(-60)}"`);
  }
}

for (const i of issues) console.log(`${fixtureSlugs.has(i.slug) ? "[fixture] " : ""}${i.severity.toUpperCase()} ${i.slug} ${i.field}: ${i.message}`);
for (const c of cross) console.log(c);
console.log(`\n${publishedArticles.length} published article(s) pass validation; ${best.length} Best X guides cross-checked.`);
const blocking = issues.filter((i) => i.severity === "error" && !fixtureSlugs.has(i.slug)).length + cross.filter((c) => c.startsWith("ERROR")).length;
if (blocking) { console.error(`${blocking} blocking error(s).`); process.exit(1); }
