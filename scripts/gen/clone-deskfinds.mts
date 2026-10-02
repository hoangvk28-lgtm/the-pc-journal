/**
 * Clones DeskFinds (smartspace-picks) Best X guides into The PC Journal's BestGuide format, at the user's request.
 * Light audit for this site's rules: no star ratings, review counts or tested claims; no automatic "Best Overall";
 * this site's own Amazon links (no DeskFinds tag); no links back to DeskFinds slugs; year-free titles.
 * Usage: npx tsx scripts/gen/clone-deskfinds.ts <slug list> <out.json>
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SRC = "C:/Users/ADMIN/Downloads/Roo-Code-main/smartspace-picks/data/guides";
const [listFile, outFile] = process.argv.slice(2);
const slugs = fs.readFileSync(listFile, "utf8").trim().split(/\r?\n/).map((l) => l.split("\t")[0]).filter(Boolean);

const BANNED = /\b(stars?|star rating|ratings?|reviews?|reviewers?|buyer feedback|customer feedback|we tested|tested by us|hands-on|in our lab|deskfinds)\b/i;
const sentences = (s: string) => s.split(/(?<=[.!?])\s+(?=[A-Z0-9"“])/);
const clean = (s: string) => sentences(String(s ?? "")).filter((x) => !BANNED.test(x)).join(" ").replace(/\s+/g, " ").trim();
const cleanList = (a: unknown[] = []) => a.map((x) => clean(String(x))).filter(Boolean);
const titleCase = (s: string) => s.replace(/^\d+\s+/, "").replace(/\s+(in|for)\s+20\d\d\b.*$/i, "").replace(/\s+20\d\d\b/, "").trim();
const asinOf = (u: string) => (String(u).match(/\/dp\/([A-Z0-9]{10})/) ?? [])[1];

function category(slug: string): string {
  if (/monitor(?!-(arm|shel|riser|stand|light|mount|privacy|copy))|display|screen/.test(slug) && !/air-quality|studio|privacy/.test(slug)) return "monitors";
  if (/ssd|egpu|gpu|cpu-(?!stand)|motherboard|ram|psu|power-suppl|cooler|enclosure|nas|das/.test(slug)) return "components";
  if (/dock|kvm|mini-pc|build/.test(slug)) return "upgrades";
  return "peripherals";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = Record<string, any>;
const out: Any[] = [];
const skipped: string[] = [];
for (const slug of slugs) {
  const file = path.join(SRC, `${slug}.ts`);
  if (!fs.existsSync(file)) { skipped.push(`${slug}\tno source file`); continue; }
  let m: Any;
  try { m = await import(pathToFileURL(file).href); } catch (e) { skipped.push(`${slug}\timport failed`); continue; }
  const products = (m.products ?? []).map((p: Any, i: number) => {
    const asin = asinOf(p.amazonUrl);
    if (!asin) return null;
    const badge = /best overall/i.test(p.badge) ? (i === 0 ? "Top Pick" : "Strong Alternative") : String(p.badge ?? "Worth a Look");
    return {
      id: asin.toLowerCase(), rank: 0, badge, name: String(p.name), asin, price: String(p.price ?? ""),
      imageUrl: String(p.imageUrl ?? ""), amazonUrl: `https://www.amazon.com/dp/${asin}`,
      description: clean(p.description), specs: cleanList(p.specs), pros: cleanList(p.pros), cons: cleanList(p.cons),
      bestFor: clean(p.bestFor ? `Best for ${p.bestFor}` : "").replace(/^Best for /, "") || "Readers comparing this category.",
      summary: sentences(clean(p.description))[0] ?? "",
    };
  }).filter(Boolean).map((p: Any, i: number) => ({ ...p, rank: i + 1 }));
  // Badges must be unique within a guide.
  const seen = new Set<string>();
  for (const p of products) { let b = p.badge, n = 2; while (seen.has(b)) b = `${p.badge} ${n++}`; p.badge = b; seen.add(b); }
  if (products.length < 3) { skipped.push(`${slug}\tfewer than 3 Amazon picks`); continue; }
  const h1 = titleCase(String(m.guideTitle ?? m.metaTitle ?? slug));
  let seo = String(m.metaTitle ?? h1).replace(/\s*\|.*$/, "").replace(/\s+20\d\d\b/, "").trim();
  if (seo.length > 43) seo = seo.replace(/^Best /, "").length <= 43 ? seo.replace(/^Best /, "") : seo.slice(0, 43).replace(/\s+\S*$/, "");
  const intro = cleanList(m.introParagraphs);
  const meta = clean(m.metaDescription);
  const first = products[0];
  out.push({
    slug, type: "best-guide", status: "published", category: category(slug),
    seoTitle: seo, title: `The ${h1.replace(/^The /, "")}`, breadcrumbLabel: seo,
    mainKeyword: String(m.mainKeyword ?? slug.replace(/^best-/, "").replace(/-/g, " ")),
    dek: meta || intro[0] || h1, metaDescription: meta.length >= 120 && meta.length <= 160 ? meta : undefined,
    teaser: intro[0] ?? meta, updatedAt: m.lastUpdated, readTime: m.readTime ? `${String(m.readTime).replace(/\s*read$/, "")} read` : undefined,
    introParagraphs: intro.length ? intro : [meta],
    products,
    howWeEvaluated: (m.howWeEvaluated ?? []).map((e: Any) => ({ title: String(e.title), description: clean(e.description) })).filter((e: Any) => e.description),
    buyingCriteria: (m.buyingCriteria ?? []).map((c: Any) => ({ criterion: String(c.criterion), explanation: clean(c.explanation) })).filter((c: Any) => c.explanation),
    howToChoose: (m.howToChoose ?? []).map((s: Any) => ({ ...s, intro: s.intro ? clean(s.intro) : undefined, note: s.note ? clean(s.note) : undefined })),
    faq: (m.faq ?? []).map((q: Any) => ({ q: String(q.q), a: clean(q.a) })).filter((q: Any) => q.a && !BANNED.test(q.q)),
    bottomLine: [`Start with the ${first.name}${first.badge ? `, our ${first.badge}` : ""}, then compare it with the other picks on the spec that matters most to you.`],
    related: [],
  });
}
// Option C: drop back-section texts shared verbatim by more than 10 cloned guides, add Skip if, keep complete guides only.
const count = new Map<string, number>();
const texts = (g: Any) => [...g.faq.map((q: Any) => q.q), ...g.faq.map((q: Any) => q.a), ...g.buyingCriteria.map((c: Any) => c.explanation), ...g.howWeEvaluated.map((e: Any) => e.description), ...g.howToChoose.flatMap((h: Any) => [h.intro, h.note])].filter(Boolean);
for (const g of out) for (const t of new Set(texts(g))) count.set(t, (count.get(t) ?? 0) + 1);
let budget = 0;
const ok = (t?: string) => !t || (count.get(t) ?? 0) <= 10 || (budget-- > 0);
const kept: Any[] = [];
for (const g of out) {
  budget = 2;
  g.faq = g.faq.filter((q: Any) => ((count.get(q.q) ?? 0) <= 10 && (count.get(q.a) ?? 0) <= 10) || budget-- > 0);
  g.buyingCriteria = g.buyingCriteria.filter((c: Any) => ok(c.explanation));
  g.howWeEvaluated = g.howWeEvaluated.filter((e: Any) => ok(e.description));
  g.howToChoose = g.howToChoose.map((h: Any) => ({ ...h, intro: ok(h.intro) ? h.intro : undefined, note: ok(h.note) ? h.note : undefined }));
  for (const p of g.products) {
    const specSet = new Set(p.specs.map((s: string) => s.toLowerCase()));
    const pros = p.pros.filter((x: string) => !specSet.has(x.toLowerCase()));
    if (pros.length >= 3) p.pros = pros;
    if (p.cons[0]) p.skipIf = `Skip it if ${p.cons[0].charAt(0).toLowerCase()}${p.cons[0].slice(1).replace(/\.$/, "")}.`;
  }
  if (g.faq.length >= 5 && g.buyingCriteria.length >= 5 && g.howWeEvaluated.length >= 3) kept.push(g);
  else skipped.push(`${g.slug}\tincomplete after removing shared text`);
}
out.length = 0; out.push(...kept);
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(out));
console.log("cloned", out.length, "skipped", skipped.length);
fs.writeFileSync(outFile.replace(/\.json$/, "-skipped.txt"), skipped.join("\n"));
