import type { BestGuide, BestProduct, HowToChooseSection, PcCategory } from "@/lib/pc-content/types";
import { cap, hash, listJoin, pick, shuffle } from "./seed";

/**
 * Category-agnostic Best X composer.
 * Each pick's "Why we like it" is built from four layers:
 *   1. an editorial take written per article (the verdict pull quote),
 *   2. where the pick ranks on each listed spec against every other pick, naming the leader,
 *   3. category-specific compatibility checks computed from its facts,
 *   4. its weakest listed area and which pick in this guide covers it better.
 * Nothing is inferred beyond the fact sheet; missing values are said to be unlisted.
 */

export type SpecValue = number | string | boolean;

export interface Fact {
  asin: string;
  name: string;
  /** Short name used inside sentences. */
  short: string;
  specs: Record<string, SpecValue | undefined>;
  /** Distinctive listed features, rewritten as noun phrases ("a 57-degree vertical grip"). */
  notes: string[];
  price?: string;
  img?: string;
}

export interface FieldDef {
  key: string;
  label: string;
  /** How a value reads in a sentence and spec list. */
  fmt: (v: SpecValue) => string;
  /** Numeric comparison direction; omit for descriptive fields. */
  better?: "higher" | "lower";
  /** Noun for ranking sentences, e.g. "battery life", "length". */
  noun?: string;
  superlative?: [string, string]; // e.g. ["longest", "shortest"] for best/worst
  rule?: { label: string; bestFor: string[] };
  strength?: (v: SpecValue) => string | undefined;
  weakness?: (v: SpecValue) => string | undefined;
}

export interface PoolItem { id: string; title: string; body: string }

export interface CategorySchema {
  id: string;
  /** Plural noun for tables, e.g. "Headsets". */
  plural: string;
  fields: FieldDef[];
  /** Compatibility and setup sentences for one pick, computed from its facts. */
  compat: (f: Fact, all: Fact[]) => string[];
  criteria: PoolItem[];
  faq: { id: string; q: string; a: string }[];
  evaluated: { title: string; description: string }[];
}

export interface GenericArticleConfig {
  slug: string;
  category: PcCategory;
  seoTitle: string;
  title: string;
  breadcrumbLabel: string;
  mainKeyword: string;
  dek: string;
  metaDescription: string;
  teaser: string;
  updatedAt: string;
  asins: string[];
  labels?: Record<string, { badge: string; reason: string; bestFor: string }>;
  /** Editorial take per pick: 1-2 sentences, the first becomes the pull quote. */
  takes: Record<string, string>;
  intro: string[];
  bottomLine: string[];
  priorityCriteria?: string[];
  related: string[];
}

const num = (v: SpecValue | undefined) => (typeof v === "number" ? v : undefined);
const priceNum = (p?: string) => Number((p ?? "").replace(/[^0-9.]/g, "")) || undefined;

function ranked(field: FieldDef, facts: Fact[]) {
  const withVal = facts.filter((f) => num(f.specs[field.key]) !== undefined);
  const dir = field.better === "lower" ? 1 : -1;
  return withVal.sort((a, b) => dir * (num(a.specs[field.key])! - num(b.specs[field.key])!));
}

/** Layer 2: ranking sentences for up to three numeric fields. */
function rankingSentences(f: Fact, facts: Fact[], schema: CategorySchema, seed: string): string[] {
  const out: string[] = [];
  for (const field of schema.fields) {
    if (!field.better || out.length >= 3) continue;
    const v = num(f.specs[field.key]);
    const order = ranked(field, facts);
    if (v === undefined || order.length < 3) continue;
    const pos = order.findIndex((x) => x.asin === f.asin);
    const leader = order[0], last = order[order.length - 1];
    const noun = field.noun ?? field.label.toLowerCase();
    const [best, worst] = field.superlative ?? (field.better === "higher" ? ["highest", "lowest"] : ["lowest", "highest"]);
    const ties = order.filter((x) => num(x.specs[field.key]) === v).length;
    if (ties > 1) {
      const others = order.filter((x) => x.asin !== f.asin && num(x.specs[field.key]) === v).map((x) => `the ${x.short}`);
      out.push(pick([`Its ${field.fmt(v)} ${noun} matches ${listJoin(others)}.`, `On ${noun} it ties with ${listJoin(others)} at ${field.fmt(v)}.`], seed + field.key));
    } else if (pos === 0) {
      const second = order[1];
      out.push(pick([
        `Its ${field.fmt(v)} ${noun} is the ${best} listed here; the next is the ${second.short} at ${field.fmt(num(second.specs[field.key])!)}.`,
        `No other pick lists a ${best === "highest" || best === "longest" || best === "largest" ? best : best} ${noun}: ${field.fmt(v)}, against ${field.fmt(num(second.specs[field.key])!)} for the ${second.short}.`,
        `On ${noun} it leads this guide at ${field.fmt(v)}, ahead of the ${second.short} (${field.fmt(num(second.specs[field.key])!)}).`,
      ], seed + field.key));
    } else if (pos === order.length - 1) {
      out.push(pick([
        `Its ${field.fmt(v)} ${noun} is the ${worst} of the ${order.length} picks that list one; the ${leader.short} leads at ${field.fmt(num(leader.specs[field.key])!)}.`,
        `On ${noun} it trails the group at ${field.fmt(v)}, while the ${leader.short} lists ${field.fmt(num(leader.specs[field.key])!)}.`,
      ], seed + field.key));
    } else {
      out.push(pick([
        `Its ${field.fmt(v)} ${noun} ranks ${ordinal(pos + 1)} of ${order.length} listed here, behind the ${leader.short} (${field.fmt(num(leader.specs[field.key])!)}) and ahead of the ${last.short} (${field.fmt(num(last.specs[field.key])!)}).`,
        `On ${noun} it sits mid-pack at ${field.fmt(v)}: the ${leader.short} lists ${field.fmt(num(leader.specs[field.key])!)} and the ${last.short} ${field.fmt(num(last.specs[field.key])!)}.`,
      ], seed + field.key));
    }
  }
  return out;
}

const ordinal = (n: number) => ["first", "second", "third", "fourth", "fifth", "sixth"][n - 1] ?? `${n}th`;

/** Layer 4: weakest area and who covers it. */
function tradeOff(f: Fact, facts: Fact[], schema: CategorySchema, seed: string): string | undefined {
  for (const field of schema.fields) {
    if (!field.better) continue;
    const order = ranked(field, facts);
    const v = num(f.specs[field.key]);
    const noun = field.noun ?? field.label.toLowerCase();
    if (order.length >= 2 && v === undefined) {
      const lead = order[0];
      return pick([
        `Its listing does not state ${noun}; if that figure matters, the ${lead.short} lists ${field.fmt(num(lead.specs[field.key])!)}.`,
        `No ${noun} figure appears in its listing, whereas the ${lead.short} states ${field.fmt(num(lead.specs[field.key])!)}.`,
        `Buyers who need a confirmed ${noun} should compare it with the ${lead.short}, which lists ${field.fmt(num(lead.specs[field.key])!)}.`,
        `For a documented ${noun}, look to the ${lead.short} instead: it states ${field.fmt(num(lead.specs[field.key])!)}, while this listing gives no figure.`,
      ], seed + "t");
    }
    if (order.length >= 3 && order[order.length - 1].asin === f.asin) {
      const lead = order[0];
      return pick([
        `The trade-off is ${noun}; for more, the ${lead.short} lists ${field.fmt(num(lead.specs[field.key])!)}.`,
        `It gives ground on ${noun}, where the ${lead.short} lists ${field.fmt(num(lead.specs[field.key])!)}.`,
        `If ${noun} is your priority, the ${lead.short} (${field.fmt(num(lead.specs[field.key])!)}) is the stronger choice.`,
        `${cap(noun)} is its weakest listed area, and the ${lead.short} covers it better at ${field.fmt(num(lead.specs[field.key])!)}.`,
      ], seed + "t");
    }
  }
  return undefined;
}

/** Builds the four-layer "Why we like it" text for one pick (used by category-specific composers too). */
export function buildWhy(f: Fact, facts: Fact[], schema: CategorySchema, seed: string, take: string): string {
  const takeWords = new Set(take.toLowerCase().match(/[a-z0-9]{4,}/g) ?? []);
  const freshNotes = f.notes.filter((n) => { const w = n.toLowerCase().match(/[a-z0-9]{4,}/g) ?? []; return w.filter((x) => takeWords.has(x)).length < Math.max(1, Math.ceil(w.length / 2)); });
  const notes = freshNotes.length ? pick([`The listing also highlights ${listJoin(freshNotes)}.`, `Other listed details include ${listJoin(freshNotes)}.`, `The maker also lists ${listJoin(freshNotes)}.`], seed + "n") : "";
  return [take, [...rankingSentences(f, facts, schema, seed), notes].filter(Boolean).join(" "), schema.compat(f, facts).join(" "), tradeOff(f, facts, schema, seed) ?? ""].filter((x) => x.trim()).join("\n\n");
}

export function composeGuide(cfg: GenericArticleConfig, schema: CategorySchema, factsById: Record<string, Fact>): BestGuide {
  const facts = cfg.asins.map((a) => { const f = factsById[a]; if (!f) throw new Error(`No fact sheet for ${a}`); return f; });

  // Labels: strict winners on rule fields first, then editorial labels.
  const taken = new Map<string, { badge: string; reason: string; bestFor: string }>();
  for (const field of schema.fields) {
    if (!field.rule || !field.better) continue;
    const order = ranked(field, facts);
    if (order.length < 2) continue;
    const top = num(order[0].specs[field.key]);
    if (num(order[1].specs[field.key]) === top || taken.has(order[0].asin)) continue;
    taken.set(order[0].asin, { badge: field.rule.label, reason: `the ${field.superlative?.[0] ?? "best"} listed ${field.noun ?? field.label.toLowerCase()} here (${field.fmt(top!)})`, bestFor: pick(field.rule.bestFor, cfg.slug + field.key) });
  }
  for (const a of cfg.asins) if (!taken.has(a) && cfg.labels?.[a]) taken.set(a, cfg.labels[a]);
  const fallbacks = ["Well-Rounded Choice", "Solid Alternative", "Worth Considering"];
  let fb = hash(cfg.slug) % fallbacks.length;

  const products: BestProduct[] = facts.map((f, i) => {
    const seed = `${cfg.slug}:${f.asin}`;
    const lab = taken.get(f.asin) ?? { badge: fallbacks[fb++ % fallbacks.length], reason: "", bestFor: "" };
    const take = cfg.takes[f.asin];
    const ranking = rankingSentences(f, facts, schema, seed);
    // Skip notes the editorial take already covers (shared distinctive words).
    const takeWords = new Set((take ?? "").toLowerCase().match(/[a-z0-9]{4,}/g) ?? []);
    const freshNotes = f.notes.filter((n) => { const w = n.toLowerCase().match(/[a-z0-9]{4,}/g) ?? []; return w.filter((x) => takeWords.has(x)).length < Math.max(1, Math.ceil(w.length / 2)); });
    const notes = freshNotes.length ? pick([`The listing also highlights ${listJoin(freshNotes)}.`, `Other listed details include ${listJoin(freshNotes)}.`, `The maker also lists ${listJoin(freshNotes)}.`], seed + "n") : "";
    const compat = schema.compat(f, facts);
    const trade = tradeOff(f, facts, schema, seed);
    const paras = [
      take ?? `The ${f.short} is a ${lab.badge.toLowerCase()} in this guide.`,
      [...ranking, notes].filter(Boolean).join(" "),
      compat.join(" "),
      trade ?? "",
    ].filter((p) => p.trim());

    const specs = schema.fields.map((fd) => (f.specs[fd.key] !== undefined ? `${fd.label}: ${fd.fmt(f.specs[fd.key]!)}` : "")).filter(Boolean);
    const pros = [...schema.fields.map((fd) => (f.specs[fd.key] !== undefined ? fd.strength?.(f.specs[fd.key]!) : undefined)).filter(Boolean) as string[], ...f.notes.map((n) => cap(n.replace(/^an? /, "")))];
    const cons = schema.fields.map((fd) => (f.specs[fd.key] !== undefined ? fd.weakness?.(f.specs[fd.key]!) : undefined)).filter(Boolean) as string[];
    const missing = schema.fields.filter((fd) => fd.better && f.specs[fd.key] === undefined && facts.some((o) => o.specs[fd.key] !== undefined)).map((fd) => `${cap(fd.noun ?? fd.label)} not listed`);
    const allCons = [...cons, ...missing];

    return {
      id: f.asin.toLowerCase(),
      rank: i + 1,
      badge: lab.badge,
      name: f.name,
      asin: f.asin,
      price: f.price ?? "",
      imageUrl: f.img ?? "",
      amazonUrl: `https://www.amazon.com/dp/${f.asin}`,
      summary: lab.reason ? cap(lab.reason) + "." : (take?.split(/(?<=\.)\s/)[0] ?? ""),
      description: paras.join("\n\n"),
      bestFor: lab.bestFor || `Buyers who want ${pros[0]?.toLowerCase() ?? "a balanced option"}.`,
      skipIf: allCons[0] ? pick([`Look elsewhere if this is a problem for your setup: ${allCons[0].charAt(0).toLowerCase() + allCons[0].slice(1)}.`, `It is the wrong pick if you can't live with this: ${allCons[0].charAt(0).toLowerCase() + allCons[0].slice(1)}.`], seed + "skip") : "You need a feature its listing does not state.",
      specs,
      pros: [...new Set([...pros, ...(lab.reason ? [cap(lab.reason)] : [])])].slice(0, 4),
      cons: [...new Set(allCons)].slice(0, 3),
    };
  });

  const prio = cfg.priorityCriteria ?? [];
  const crit = [...prio.map((id) => schema.criteria.find((c) => c.id === id)!).filter(Boolean), ...shuffle(schema.criteria.filter((c) => !prio.includes(c.id)), cfg.slug)].slice(0, 6);
  const faq = shuffle(schema.faq, cfg.slug + "faq").slice(0, 6);
  const evaluated = shuffle(schema.evaluated, cfg.slug + "eval").slice(0, 4);

  const cmpFields = schema.fields.filter((fd) => facts.filter((f) => f.specs[fd.key] !== undefined).length >= 2).slice(0, 4);
  const priced = facts.map((f) => ({ s: f.short, v: priceNum(f.price) })).filter((x) => x.v) as { s: string; v: number }[];
  const edges = [50, 100, 150, 250, 500, 1000, 1500, Infinity];
  const bucket = (v: number) => { const i = edges.findIndex((e) => v < e); const lo = i === 0 ? 0 : edges[i - 1]; return i === 0 ? "Under $50" : edges[i] === Infinity ? `Over $${lo}` : `About $${lo} to $${edges[i]}`; };
  const groups = new Map<string, string[]>();
  for (const p of priced.sort((a, b) => a.v - b.v)) groups.set(bucket(p.v), [...(groups.get(bucket(p.v)) ?? []), p.s]);

  const howToChoose: HowToChooseSection[] = [
    { subheading: "By priority", table: { headers: ["Priority", "Consider", "Why"], rows: products.filter((p) => taken.has(p.asin)).map((p) => { const l = taken.get(p.asin)!; return [l.bestFor.replace(/\.$/, ""), factsById[p.asin].short, cap(l.reason)]; }) } },
  ];
  if (cmpFields.length)
    howToChoose.push({ subheading: "Key specs side by side", intro: "Figures as stated in each listing.", table: { headers: [schema.plural.replace(/s$/, ""), ...cmpFields.map((c) => c.label)], rows: facts.map((f) => [f.short, ...cmpFields.map((c) => (f.specs[c.key] !== undefined ? c.fmt(f.specs[c.key]!) : "Not listed"))]) } });
  if (groups.size > 1)
    howToChoose.push({ subheading: "By price at the time of writing", intro: "Prices change often; these tiers reflect Amazon prices when this guide was updated.", table: { headers: ["Price tier", schema.plural], rows: [...groups.entries()].map(([k, v]) => [k, v.join(", ")]) } });

  return {
    slug: cfg.slug, type: "best-guide", status: "published", category: cfg.category,
    seoTitle: cfg.seoTitle, title: cfg.title, breadcrumbLabel: cfg.breadcrumbLabel, mainKeyword: cfg.mainKeyword,
    dek: cfg.dek, metaDescription: cfg.metaDescription, teaser: cfg.teaser, updatedAt: cfg.updatedAt,
    readTime: `${9 + Math.round(products.length / 2)} min read`,
    introParagraphs: cfg.intro, products,
    howWeEvaluated: evaluated,
    buyingCriteria: crit.map((c) => ({ criterion: c.title, explanation: c.body })),
    howToChoose,
    faq: faq.map((q) => ({ q: q.q, a: q.a })),
    bottomLine: cfg.bottomLine,
    related: cfg.related,
  };
}
