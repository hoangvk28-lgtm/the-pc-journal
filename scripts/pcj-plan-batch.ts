/**
 * Batch planner: resolves data/clusters/<batch>-plan.ts into data/clusters/<batch>.ts (batch = batch17 or batch18).
 * For each keyword: filter and sort the group's facts, then pick products greedily so the set shares at most
 * 2 products with every existing guide (relaxing to 3 only when needed). Keywords with fewer than 3 candidates
 * are skipped and reported. Run: MSYS_NO_PATHCONV=1 npx tsx scripts/pcj-plan-batch.ts batch18 (reset that batch file to an empty array first).
 */
import fs from "node:fs";
import { registry } from "@/lib/pc-content";
import { PLAN as PLAN17 } from "@/data/clusters/batch17-plan";
import { PLAN as PLAN18 } from "@/data/clusters/batch18-plan";
import { PLAN as PLAN19 } from "@/data/clusters/batch19-plan";
import { PLAN as PLAN20 } from "@/data/clusters/batch20-plan";
import { PLAN as PLAN21 } from "@/data/clusters/batch21-plan";
import { PLAN as PLAN22 } from "@/data/clusters/batch22-plan";
import { PLAN as PLAN23 } from "@/data/clusters/batch23-plan";
import { PLAN as PLAN24 } from "@/data/clusters/batch24-plan";
import { PLAN as PLAN25 } from "@/data/clusters/batch25-plan";
import { PLAN as PLAN26 } from "@/data/clusters/batch26-plan";
import { PLAN as PLAN27 } from "@/data/clusters/batch27-plan";
import { PLAN as PLAN28 } from "@/data/clusters/batch28-plan";
import { PLAN as PLAN29 } from "@/data/clusters/batch29-plan";
import { PLAN as PLAN30 } from "@/data/clusters/batch30-plan";
import { PLAN as PLAN31 } from "@/data/clusters/batch31-plan";
import { PLAN as PLAN32 } from "@/data/clusters/batch32-plan";
import { PLAN as PLAN33 } from "@/data/clusters/batch33-plan";
import { GROUPS } from "@/data/clusters/batch17-groups";
import type { Fact } from "@/lib/pc-compose/generic";

const BATCH = process.argv[2] ?? "batch17";
const PLAN = ({ batch17: PLAN17, batch18: PLAN18, batch19: PLAN19, batch20: PLAN20, batch21: PLAN21, batch22: PLAN22, batch23: PLAN23, batch24: PLAN24, batch25: PLAN25, batch26: PLAN26, batch27: PLAN27, batch28: PLAN28, batch29: PLAN29, batch30: PLAN30, batch31: PLAN31, batch32: PLAN32, batch33: PLAN33 } as const)[BATCH as "batch17" | "batch18" | "batch19" | "batch20" | "batch21" | "batch22" | "batch23" | "batch24" | "batch25" | "batch26" | "batch27" | "batch28" | "batch29" | "batch30" | "batch31" | "batch32" | "batch33"];
if (!PLAN) throw new Error(`unknown batch ${BATCH}`);

/** Products whose listings are too thin to give three listed strengths; excluded rather than padded. */
import excludeThin from "@/data/clusters/exclude-thin.json";
/** New expand28 products whose facts were too thin for a 100-word "Why we like it" or 3 pros; excluded rather than padded. */
const EXCLUDE = new Set([...excludeThin, "B0FS9YN8FJ", "B0FRPMHJGX", "B0CYHH583P", "B0FS1KMMZM", "B08LRTS3WJ", "B0GJCSD4W8", "B0GF9TKQTW", "B0CMW2FYZ2", "B0F3BD1W6R", "B08PJNVWNZ", "B07RS1G6XW", "B0BHJJ9Y77", "B0FCYVNZ16", "B0H6F2X4WF", "B0HH993S42", "B07H6B3QS2", "B0GP9FFRMB"]);
const planned = new Set(PLAN.map((p) => p.slug));
const existing = new Set((registry as unknown as { slug: string }[]).map((a) => a.slug));
const sets: string[][] = (registry as unknown as { slug: string; products?: { asin: string }[] }[])
  .filter((a) => !planned.has(a.slug) && a.products).map((a) => a.products!.map((p) => p.asin));

const price = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
function sorter(key = "-price") {
  const desc = key.startsWith("-"), k = key.replace(/^-/, "");
  const v = (f: Fact) => (k === "price" ? price(f) : typeof f.specs[k] === "number" ? (f.specs[k] as number) : desc ? -Infinity : Infinity);
  return (a: Fact, b: Fact) => (desc ? v(b) - v(a) : v(a) - v(b)) || price(a) - price(b);
}
const maxShared = (pick: string[]) => Math.max(0, ...sets.map((s) => s.filter((x) => pick.includes(x)).length));
const same = (pick: string[]) => sets.some((s) => s.length === pick.length && s.every((x) => pick.includes(x)));

/** Colour or lighting variants of one product must not count as two picks. */
const colourKey = (f: Fact) => f.name.toLowerCase().replace(/\((single|[0-9]+[- ]pack)[^)]*\)|\b[0-9][- ]pack\b/g, "").replace(/\bfans?\b/g, "").replace(/\((white|black|silver|gr[ae]y|off-white|pink|blue|red|green|purple)[^)]*\)/g, "").replace(/\b(white|black|silver|gr[ae]y|rgb|argb|pink|blue|red|green|purple|reverse|lcd|snow|evo|digital|v2|oc|se)\b/g, "").replace(/\s+/g, " ").trim();
function choose(cands: Fact[], count: number): string[] {
  for (const limit of [2, 3]) {
    const pick: string[] = [];
    const keys = new Set<string>();
    for (const f of cands) {
      if (pick.length >= count) break;
      if (keys.has(colourKey(f))) continue;
      if (maxShared([...pick, f.asin]) <= limit) { pick.push(f.asin); keys.add(colourKey(f)); }
    }
    if (pick.length >= 3 && !same(pick)) return pick;
  }
  return [];
}

// Optional: PREV=<old batch file>. A guide never loses picks on a re-plan: when the new set is smaller than the previous one
// (and every previous ASIN still exists in the group's facts), the previous ASIN list is kept.
const prev = new Map<string, string[]>();
if (process.env.PREV && fs.existsSync(process.env.PREV)) {
  const text = fs.readFileSync(process.env.PREV, "utf-8");
  for (const m of text.matchAll(/slug: "([^"]+)"[^\n]*?asins: \[([^\]]*)\]/g)) prev.set(m[1], [...m[2].matchAll(/"([A-Z0-9]{10})"/g)].map((x) => x[1]));
}
const out: string[] = [];
const skipped: string[] = [];
const usedGroups = new Set<string>();
for (const item of PLAN) {
  if (existing.has(item.slug) && !planned.has(item.slug)) { skipped.push(`${item.slug}: slug already exists`); continue; }
  const g = GROUPS[item.g];
  const cands = Object.values(g.facts).filter((f) => !EXCLUDE.has(f.asin) && price(f) < Infinity && (item.where ? item.where(f) : true)).sort(sorter(item.sort));
  let asins = cands.length >= 3 ? choose(cands, item.count ?? 5) : [];
  const old = prev.get(item.slug);
  if (old && old.length > asins.length && old.every((a) => g.facts[a])) asins = old;
  if (asins.length < 3) { skipped.push(`${item.slug}: ${cands.length} candidates, no valid set`); continue; }
  sets.push(asins);
  usedGroups.add(item.g);
  const extra = [item.seo && `seo: ${JSON.stringify(item.seo)}`, item.h1 && `h1: ${JSON.stringify(item.h1)}`].filter(Boolean).join(", ");
  out.push(`  ${item.g}({ slug: ${JSON.stringify(item.slug)}, kw: ${JSON.stringify(item.kw)}, asins: ${JSON.stringify(asins)},${extra ? ` ${extra},` : ""}\n    lead: ${JSON.stringify(item.lead)},\n    close: ${JSON.stringify(item.close)} }),`);
}

const file = `import { GROUPS } from "./batch17-groups";
import { make } from "./batch17-lib";
import type { Entry } from "./batch12-lib";

/** ${BATCH}: generated by scripts/pcj-plan-batch.ts from ${BATCH}-plan.ts. Do not edit picks by hand; edit the plan and re-run. */
${[...usedGroups].map((g) => `const ${g} = make(GROUPS.${g});`).join("\n")}

export const ${BATCH}: Entry[] = [
${out.join("\n")}
];
`;
fs.writeFileSync(`data/clusters/${BATCH}.ts`, file);
console.log(`wrote ${out.length} articles; skipped ${skipped.length}`);
for (const s of skipped) console.log("  SKIP " + s);
