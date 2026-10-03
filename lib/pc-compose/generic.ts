import type { BestGuide, BestProduct, HowToChooseSection, PcCategory } from "@/lib/pc-content/types";
import { cap, hash, listJoin, pick, shuffle } from "./seed";
import { WHY_EXTRA } from "@/data/clusters/why-extra";
import { gameBlock, gameForSlug } from "./game-requirements";

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
  /** Guide-specific FAQ and buying criteria, shown before the shared category pool so guides in one category differ. */
  extraFaq?: { q: string; a: string }[];
  extraCriteria?: { title: string; body: string }[];
  /** Key into data/game-requirements.ts; defaults to the slug table there. */
  game?: string;
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
    if (!field.better || out.length >= 6) continue;
    const v = num(f.specs[field.key]);
    const order = ranked(field, facts);
    if (v === undefined || order.length < 3) continue;
    const pos = order.findIndex((x) => x.asin === f.asin);
    const leader = order[0], last = order[order.length - 1];
    const noun = field.noun ?? lc(field.label);
    const [best, worst] = field.superlative ?? (field.better === "higher" ? ["highest", "lowest"] : ["lowest", "highest"]);
    const ties = order.filter((x) => num(x.specs[field.key]) === v).length;
    if (ties === order.length) continue; // every pick shares it, so the comparison tells the reader nothing
    if (ties > 1) {
      const others = order.filter((x) => x.asin !== f.asin && num(x.specs[field.key]) === v).map((x) => `the ${x.short}`);
      out.push(pick([`It matches ${listJoin(others)} on ${noun} (${field.fmt(v)}).`, `On ${noun} it ties with ${listJoin(others)} at ${field.fmt(v)}.`], seed + field.key));
    } else if (pos === 0) {
      const second = order[1];
      out.push(pick([
        `Its ${field.fmt(v)} ${noun} is the ${best} here; the ${second.short} comes next at ${field.fmt(num(second.specs[field.key])!)}.`,
        `Nothing else here matches its ${field.fmt(v)} ${noun}; the ${second.short} comes closest at ${field.fmt(num(second.specs[field.key])!)}.`,
        `On ${noun} it leads this guide at ${field.fmt(v)}, ahead of the ${second.short} (${field.fmt(num(second.specs[field.key])!)}).`,
      ], seed + field.key));
    } else if (pos === order.length - 1) {
      out.push(pick([
        `Its ${field.fmt(v)} ${noun} is the ${worst} in this group; the ${leader.short} leads at ${field.fmt(num(leader.specs[field.key])!)}.`,
        `On ${noun} it trails the group at ${field.fmt(v)}, while ${claim(field, leader)}.`,
      ], seed + field.key));
    } else {
      out.push(pick([
        `Its ${field.fmt(v)} ${noun} ranks ${ordinal(pos + 1)} of ${order.length} here, behind the ${leader.short} (${field.fmt(num(leader.specs[field.key])!)}) and ahead of the ${last.short} (${field.fmt(num(last.specs[field.key])!)}).`,
        `On ${noun} it sits mid-pack at ${field.fmt(v)}: ${claim(field, leader)}, and the ${last.short} comes in at ${field.fmt(num(last.specs[field.key])!)}.`,
      ], seed + field.key));
    }
  }
  return out;
}

const ordinal = (n: number) => ["first", "second", "third", "fourth", "fifth", "sixth"][n - 1] ?? `${n}th`;

/** A value counts as missing when absent or recorded as "Not stated"/"Not listed". */
const missingVal = (v: SpecValue | undefined) => v === undefined || (typeof v === "string" && (/^not (stated|listed)/i.test(v.trim()) || !v.trim()));
// Lowercase a leading capital for mid-sentence use, but keep brand-style words ("HyperSpeed", "PowerPlay").
const lc = (s: string) => (/^[A-Z][a-z]/.test(s) && !/^[A-Z][a-z]+[A-Z]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);
/** A value short and concrete enough to compare in a sentence. */
const readableValue = (s: string, label = "") => s.trim().toLowerCase() !== label.trim().toLowerCase() && s.length <= 28 && !/,/.test(s) && !/^[\d.,]+$/.test(s.replace(/\s|dpi|hz|mm|g|w$/gi, "")) && !/^(yes|no|none|not listed|not stated)$/i.test(s.trim()) && !/[;:]/.test(s);
/** "3D" + "Armrests" -> "3D armrests"; "Vibration lumbar cushion" + "Lumbar support" -> "a vibration lumbar cushion". */
function featurePhrase(value: string, label: string): string {
  const v = lc(value.trim());
  const head = label.toLowerCase().split(/\s+/).pop()!.replace(/s$/, "");
  if (v.toLowerCase().includes(head)) return /^(a|an|the)\s/i.test(v) || /s$/i.test(v) ? v : `${anArticle(v)} ${v}`;
  const phrase = `${v} ${label.toLowerCase()}`;
  return /s$/i.test(label) || /^(memory|software|cabling|upholstery|lighting)$/.test(head) ? phrase : `${anArticle(v)} ${phrase}`;
}
/** "an 18-inch", "an 8K", "an 11-button", "an OLED", otherwise "a". */
const anArticle = (w: string) => (/^(?:[aeio]|8|11\b|18\b)/i.test(w) || /^[FHLMNRSX](?:[A-Z0-9]|\.\d)/.test(w) ? "an" : "a");

/** Descriptive (non-ranked) fields: where this pick's listed value is unique or shared among the picks. */
function descriptiveSentences(f: Fact, facts: Fact[], schema: CategorySchema, seed: string): string[] {
  const out: string[] = [];
  for (const field of schema.fields) {
    if (field.better || out.length >= 3) continue;
    const v = f.specs[field.key];
    if (missingVal(v) || typeof v === "boolean" || typeof v === "number") continue;
    const listed = facts.filter((o) => !missingVal(o.specs[field.key]) && typeof o.specs[field.key] !== "boolean");
    if (listed.length < 3) continue;
    const mine = field.fmt(v!);
    // Only short, concrete values read well in a comparison ("3D armrests", "USB-C connection");
    // yes/no flags, long descriptions and category labels ("Audio interface") do not.
    if (!readableValue(mine, field.label) || /^(type|does|kind|form)$/.test(field.key)) continue;
    const same = listed.filter((o) => o.asin !== f.asin && field.fmt(o.specs[field.key]!) === mine);
    const diff = listed.filter((o) => field.fmt(o.specs[field.key]!) !== mine && readableValue(field.fmt(o.specs[field.key]!)));
    if (!diff.length) continue;
    const alt = diff[hash(seed + field.key) % diff.length];
    const mineP = featurePhrase(mine, field.label), altP = featurePhrase(field.fmt(alt.specs[field.key]!), field.label);
    if (!same.length) {
      out.push(pick([
        `It is the only pick here with ${mineP}; the ${alt.short} has ${altP} instead.`,
        `You get ${mineP} here, which sets it apart from the ${alt.short} and its ${altP}.`,
        `No other pick in this guide offers ${mineP}; compare the ${alt.short}, which has ${altP}.`,
        `${cap(mineP)} is unique to it among these picks, while the ${alt.short} uses ${altP}.`,
      ], seed + field.key + "d"));
    } else if (same.length <= 2) {
      out.push(pick([
        `Like the ${listJoin(same.map((o) => o.short))}, it has ${mineP}, while the ${alt.short} uses ${altP}.`,
        `It shares ${mineP} with the ${listJoin(same.map((o) => o.short))}; the ${alt.short} goes with ${altP}.`,
      ], seed + field.key + "d"));
    }
  }
  return out;
}

/** Splits prose into sentences without breaking on decimals or model numbers. */
const sentencesOf = (t: string) => t.split(/(?<=[.!?])\s+(?=[A-Z"(])/).map((x) => x.trim()).filter(Boolean);
const wordsIn = (xs: string[]) => xs.join(" ").split(/\s+/).filter(Boolean).length;

/**
 * Extra, pick-specific sentences used only when "Why we like it" would fall under 100 words: who the label suits,
 * strengths not yet mentioned, and the pick's nearest rival on its best ranked spec.
 */
function whyExtras(f: Fact, facts: Fact[], schema: CategorySchema, lab: { badge: string; reason: string; bestFor: string }, seed: string, cons: string[]): string[] {
  const out: string[] = [];
  const others = facts.filter((o) => o.asin !== f.asin);
  // Strengths the listing supports: schema strengths, maker notes and comparative pros.
  const strengths = [
    ...(schema.fields.map((fd) => (!missingVal(f.specs[fd.key]) ? fd.strength?.(f.specs[fd.key]!) : undefined)).filter(Boolean) as string[]),
    ...f.notes.map((n) => n.replace(/^(a|an|the) /i, "")),
    ...comparativePros(f, facts, schema),
  ];
  // Keep brand and product words capitalised ("Logitech Flow"); lower-case only ordinary sentence starts.
  const brand = new Set(f.name.split(/\s+/).map((w) => w.toLowerCase()));
  const phrase = (x: string) => { const t = x.replace(/\.$/, ""); return brand.has(t.split(/\s+/)[0].toLowerCase()) ? t : lc(t); };
  strengths.forEach((x, i) => out.push(pick([
    `Worth noting: ${phrase(x)}.`,
    `You also get this: ${phrase(x)}.`,
    `Another plus: ${phrase(x)}.`,
  ], seed + "xs" + i)));
  // Nearest rival on each ranked spec, so the reader can see how close the alternatives are.
  for (const fd of schema.fields.filter((x) => x.better)) {
    const v = num(f.specs[fd.key]);
    if (v === undefined) continue;
    const near = others.filter((o) => num(o.specs[fd.key]) !== undefined && num(o.specs[fd.key]) !== v).sort((x, y) => Math.abs(num(x.specs[fd.key])! - v) - Math.abs(num(y.specs[fd.key])! - v))[0];
    if (near) out.push(`The nearest alternative on ${fd.noun ?? lc(fd.label)} is the ${near.short} at ${fd.fmt(num(near.specs[fd.key])!)}, against ${fd.fmt(v)} here.`);
  }
  // Who it suits and what to weigh, from this pick's own label and cons.
  if (lab.bestFor) out.push(`It makes the most sense for ${lc(lab.bestFor.replace(/\.$/, ""))}${lab.reason ? `, since it offers ${lab.reason}` : ""}.`);
  if (cons[0]) out.push(`Before buying, weigh one limit: ${lc(cons[0].replace(/\.$/, ""))}.`);
  return out;
}

/**
 * Builds the description: the take's first sentence stays the verdict, and "Why we like it" is packed into paragraphs
 * of about three sentences (never one), kept between roughly 100 and 160 words (the user's rule in CLAUDE.md).
 */
function whyParagraphs(p: { take: string; ranking: string[]; descriptive: string[]; notes: string; compat: string[]; price?: string; trade?: string; extras: string[] }): string[] {
  const takeS = sentencesOf(p.take);
  const verdict = takeS[0] ?? "";
  const groups = [
    [...takeS.slice(1), ...p.ranking],
    [...p.descriptive, ...(p.notes ? [p.notes] : []), ...p.compat],
    [...(p.price ? [p.price] : []), ...(p.trade ? [p.trade] : [])],
  ].map((g) => g.filter((x) => x.trim()));
  const all = () => groups.flat();
  // Drop any sentence that restates an earlier one (e.g. a ranking line and a trade-off naming the same leader).
  {
    const DSTOP = new Set("the and with for its this that from have has into than more when your you are was were over under also about which while only offers offer runs run comes come here group picks pick".split(" "));
    const dk = (t: string) => (t.toLowerCase().match(/\d+(?:\.\d+)?|[a-z]{3,}/g) ?? []).filter((w) => !DSTOP.has(w)).map((w) => w.replace(/(ing|ed|es|s)$/, ""));
    const kept: string[][] = [dk(verdict)];
    for (const g of groups) for (let i = 0; i < g.length; i++) {
      const k = dk(g[i]);
      const dup = k.length >= 3 && kept.some((o) => { const s = new Set(o); return k.filter((w) => s.has(w)).length / k.length >= 0.6; });
      if (dup) { g.splice(i, 1); i--; } else kept.push(k);
    }
  }
  // Too long: drop ranking and descriptive sentences from the end until the text fits.
  // Order: extra descriptive/compat lines, then ranking beyond two, then the price line; the take and trade-off stay.
  const keep0 = takeS.length - 1 + 2;
  while (wordsIn(all()) > 160) {
    if (groups[1].length > 1) groups[1].pop();
    else if (groups[0].length > keep0) groups[0].pop();
    else if (groups[1].length) groups[1].pop();
    else if (groups[2].length > 1) groups[2].shift();
    else if (groups[0].length > takeS.length - 1 + 1) groups[0].pop();
    else break;
  }
  // Too short: add pick-specific extras.
  // An extra is added only if most of its content words (stemmed) are new to this pick's text.
  const STOP = new Set(["also", "brings", "worth", "noting", "another", "plus", "nearest", "alternative", "against", "here", "makes", "most", "sense", "since", "offers", "before", "buying", "weigh", "limit", "with", "that", "this", "than", "from", "your"]);
  const stem = (w: string) => w.replace(/(ing|ed|es|s)$/, "");
  const key = (t: string) => (t.toLowerCase().match(/\d+(?:\.\d+)?|[a-z]{3,}/g) ?? []).filter((w) => !STOP.has(w) && w !== "one" && w !== "the").map(stem);
  for (const x of p.extras) {
    if (wordsIn(all()) >= 100) break;
    const seen = new Set(key([verdict, ...all()].join(" ")));
    const k = key(x);
    if (!k.length || k.filter((w) => seen.has(w)).length * 5 > k.length * 2) continue;
    if (wordsIn([...all(), x]) <= 160) groups[1].push(x);
  }
  // Pack into paragraphs of 2-4 sentences, keeping group order.
  const flat = all();
  const paras: string[][] = [];
  let cur: string[] = [];
  for (const sent of flat) {
    cur.push(sent);
    if (cur.length >= 3) { paras.push(cur); cur = []; }
  }
  if (cur.length) { if (cur.length === 1 && paras.length) paras[paras.length - 1].push(cur[0]); else paras.push(cur); }
  // The first "why" paragraph shares the take's paragraph so the renderer's verdict split leaves no lone sentence.
  const body = paras.map((x) => x.join(" "));
  return [[verdict, body[0] ?? ""].filter(Boolean).join(" "), ...body.slice(1)];
}

/** Turns a con into reader advice ("Skip it if price comes first: ..."), never a raw "not stated" line. */
function skipLine(con: string, seed: string): string {
  let m: RegExpMatchArray | null;
  if ((m = con.match(/^No published (.+)$/i))) return pick([`Skip it if you need to know its ${m[1]} before buying; the maker doesn't publish one.`, `The maker gives no ${m[1]}, so skip it if that figure decides your choice.`, `Pass if a published ${m[1]} matters; this one has none.`, `Its ${m[1]} is not published, which rules it out if you need that number.`], seed + "skipn");
  if ((m = con.match(/^Costs more than the (.+) at the time of writing$/i))) return pick([`Skip it if price comes first: the ${m[1]} cost less when we checked.`, `If budget leads, the ${m[1]} was cheaper at our last price check.`, `Price-first buyers should look at the ${m[1]}, which cost less when we checked.`], seed + "skipp");
  if ((m = con.match(/^(.+?) trails the (.+) \((.+)\)$/i))) return `Skip it if ${lc(m[1])} matters most to you; the ${m[2]} offers ${m[3]}.`;
  const c = con.charAt(0).toLowerCase() + con.slice(1);
  return pick([`Skip it if this is a deal-breaker for you: ${c}.`, `Choose another pick if you can't accept this: ${c}.`, `Pass on it if ${c.replace(/.$/, "")} rules it out for your setup.`, `Look at the others if this bothers you: ${c}.`, `Worth skipping when ${c.replace(/.$/, "")} is a problem.`], seed + "skip");
}

/**
 * Fallback strengths from the product's own stated specs ("9MB L3 cache", "DDR4 memory support"), used only after
 * strengths, notes and comparisons; they are listed facts, not padding. Yes/no flags and negatives are skipped.
 */
function specPros(f: Fact, schema: CategorySchema): string[] {
  const out: string[] = [];
  for (const field of schema.fields) {
    const v = f.specs[field.key];
    if (missingVal(v) || v === false || v === true) continue;
    const s = field.fmt(v!);
    if (/^(no|none)\b/i.test(s) || s.length > 30) continue;
    out.push(cap(typeof v === "number" ? `${s} ${lc(field.noun ?? field.label)}`.replace(/\s+/g, " ") : featurePhrase(s, field.label).replace(/^(a|an) /, "")));
  }
  return out;
}

/** Reviewer-style verb for a spec: "is rated for 300 lbs", "weighs 54g", "reclines to 155°", else "offers". */
function verbFor(field: FieldDef): string {
  const k = `${field.key} ${field.noun ?? ""} ${field.label}`.toLowerCase();
  if (/capacity|load/.test(k)) return "is rated for";
  if (/weight/.test(k)) return "weighs";
  if (/battery/.test(k)) return "runs for";
  if (/recline/.test(k)) return "reclines to";
  if (/length|depth|height|thick|size|width|clearance|volume/.test(k)) return "comes in at";
  return "offers";
}
/** "the X Rocker Pixel is rated for 300 lbs" / "the GTPLAYER has 3D armrests". */
function claim(field: FieldDef, o: Fact): string {
  const v = o.specs[field.key]!;
  return typeof v === "number" ? `the ${o.short} ${verbFor(field)} ${field.fmt(v)}` : `the ${o.short} has ${featurePhrase(field.fmt(v), field.label)}`;
}

/** Price position among the picks, stated only relative to "the time of writing". */
function priceSentence(f: Fact, facts: Fact[], seed: string): string | undefined {
  const priced = facts.filter((o) => priceNum(o.price)).sort((a, b) => priceNum(a.price)! - priceNum(b.price)!);
  const pos = priced.findIndex((o) => o.asin === f.asin);
  if (priced.length < 3 || pos < 0) return undefined;
  const n = priced.length;
  if (priceNum(priced[pos].price) === priceNum(priced[pos === 0 ? 1 : pos - 1].price)) return undefined;
  if (pos === 0) return pick([`It undercut the ${priced[1].short} and every other pick on price at the time of writing.`, `It cost the least of the ${n} picks at the time of writing, with the ${priced[1].short} the next step up.`, `It was the cheapest of the group when we checked; the ${priced[1].short} was the next step up.`, `No other pick here cost less at our last price check, and the ${priced[1].short} was closest.`], seed + "p");
  if (pos === n - 1) return pick([`It was the highest-priced of the ${n} picks at the time of writing, so the case for it rests on what it adds over the ${priced[n - 2].short} and the rest.`, `Only the ${priced[n - 2].short} came close to it on price at the time of writing; it cost the most of the ${n} picks.`, `It was the most expensive pick when we checked, so weigh what it adds over the ${priced[n - 2].short}.`, `At our last price check it topped the group, with the ${priced[n - 2].short} the nearest cheaper option.`], seed + "p");
  return pick([`On price it sat ${ordinal(pos + 1)} of ${n}, between the cheaper ${priced[pos - 1].short} and the pricier ${priced[pos + 1].short}, at the time of writing.`, `It was priced above the ${priced[pos - 1].short} and below the ${priced[pos + 1].short} at the time of writing.`, `Its price falls between the ${priced[pos - 1].short} and the ${priced[pos + 1].short}, based on our last check.`, `When we checked, only the ${priced[pos - 1].short}${pos > 1 ? " and cheaper picks" : ""} cost less, and the ${priced[pos + 1].short} cost more.`], seed + "p");
}

/** Comparative cons derived from the picks' listed facts; each names the pick that covers the gap. */
function comparativeCons(f: Fact, facts: Fact[], schema: CategorySchema): { con: string; alt?: string }[] {
  const out: { con: string; alt?: string }[] = [];
  // A wired-only product has no battery, so an unstated battery figure is not a gap.
  const conn = String(f.specs.connection ?? "");
  const wiredOnly = /\bwired\b/i.test(conn) && !/wireless|bluetooth|2\.4|dongle|receiver|lightspeed|hyperspeed|slipstream/i.test(conn);
  for (const field of schema.fields) {
    const v = f.specs[field.key];
    const noun = field.noun ?? lc(field.label);
    const others = facts.filter((o) => o.asin !== f.asin);
    if (field.key === "battery" && wiredOnly) continue;
    if (missingVal(v)) {
      const src = others.find((o) => !missingVal(o.specs[field.key]) && o.specs[field.key] !== false);
      // A gap is only a real con when most picks state the figure; "In the box not specified" style filler is skipped.
      const stated = facts.filter((o) => !missingVal(o.specs[field.key])).length;
      if (src && field.better && stated * 2 >= facts.length) out.push({ con: field.better ? `No published ${noun.replace(/^listed /, "")}` : `${cap(lc(field.label))} not specified`, alt: `${claim(field, src)}` });
    } else if (v === false) {
      const src = others.find((o) => o.specs[field.key] === true);
      if (src) out.push({ con: `No ${noun}, unlike the ${src.short}`, alt: `the ${src.short} has it` });
    } else if (field.better && typeof v === "number") {
      const order = ranked(field, facts);
      if (order.length >= 3 && order[order.length - 1].asin === f.asin && num(order[0].specs[field.key]) !== v)
        out.push({ con: `${cap(noun)} trails the ${order[0].short} (${field.fmt(num(order[0].specs[field.key])!)})`, alt: `${claim(field, order[0])}` });
    }
  }
  const priced = facts.filter((o) => priceNum(o.price)).sort((a, b) => priceNum(a.price)! - priceNum(b.price)!);
  if (priced.length >= 2 && priceNum(f.price) && priceNum(f.price)! > priceNum(priced[0].price)! && priced[0].asin !== f.asin)
    out.push({ con: `Costs more than the ${priced[0].short} at the time of writing` });
  // Fallback: the first ranked spec where another pick leads it.
  if (!out.length)
    for (const field of schema.fields) {
      const v = num(f.specs[field.key]);
      const order = ranked(field, facts);
      if (!field.better || v === undefined || order.length < 2 || num(order[0].specs[field.key]) === v) continue;
      const lead = order[0], noun = field.noun ?? lc(field.label);
      out.push({ con: `${cap(noun)} of ${field.fmt(v)}, behind the ${lead.short} (${field.fmt(num(lead.specs[field.key])!)})`, alt: `${claim(field, lead)}` });
      break;
    }
  return out;
}

/** Comparative strengths: ranked fields where this pick beats at least one other pick, naming it. */
function comparativePros(f: Fact, facts: Fact[], schema: CategorySchema): string[] {
  const out: string[] = [];
  for (const field of schema.fields) {
    if (!field.better) continue;
    const v = num(f.specs[field.key]);
    const order = ranked(field, facts);
    if (v === undefined || order.length < 2) continue;
    const behind = order.filter((o) => (field.better === "higher" ? num(o.specs[field.key])! < v : num(o.specs[field.key])! > v));
    if (!behind.length || field.strength?.(v)) continue;
    const noun = field.noun ?? lc(field.label);
    const [best] = field.superlative ?? (field.better === "higher" ? ["highest"] : ["lowest"]);
    out.push(behind.length === order.length - 1 ? `${cap(best)} ${noun} of the picks (${field.fmt(v)})` : `${cap(noun)} of ${field.fmt(v)}, ahead of the ${behind[0].short}`);
  }
  // Descriptive values no other pick lists (booleans only when true).
  for (const field of schema.fields) {
    const v = f.specs[field.key];
    if (field.better || missingVal(v) || v === false || field.strength?.(v!)) continue;
    const listed = facts.filter((o) => !missingVal(o.specs[field.key]));
    if (listed.length < 3) continue;
    const mine = field.fmt(v!);
    if (listed.some((o) => o.asin !== f.asin && field.fmt(o.specs[field.key]!) === mine)) continue;
    if (v !== true && (!readableValue(mine, field.label) || /^(type|does|kind|form)$/.test(field.key))) continue;
    out.push(v === true ? `The only pick here with ${lc(field.label)}` : `${cap(featurePhrase(mine, field.label).replace(/^(a|an) /, ""))}, the only one here`);
  }
  return out;
}

/** True when every distinctive word of a label reason already appears in the pros. */
function reasonCovered(reason: string, pros: string[]): boolean {
  const have = new Set(pros.join(" ").toLowerCase().match(/[a-z0-9]{3,}/g) ?? []);
  const stop = new Set(["with", "and", "the", "for", "here", "listed", "built", "that"]);
  return (reason.toLowerCase().match(/[a-z0-9]{3,}/g) ?? []).filter((w) => !stop.has(w)).every((w) => have.has(w));
}

/** Drops phrases that mostly repeat an earlier one (e.g. a label reason restating two pros). */
function dedupePhrases(items: string[]): string[] {
  const seen: Set<string>[] = [];
  const STOP = new Set(["that", "the", "with", "and", "for", "only", "one", "here", "degree", "degrees", "its", "has", "have", "this", "listed", "built", "included"]);
  return items.filter((s) => {
    const w = new Set((s.toLowerCase().match(/[a-z0-9]{2,}/g) ?? []).map((x) => x.replace(/s$/, "")).filter((x) => !STOP.has(x) && x !== "up" && x.length > 1));
    // Near-duplicate of one earlier phrase, or fully contained in earlier phrases combined.
    const single = seen.some((set) => [...w].filter((x) => set.has(x)).length / w.size >= 0.75);
    const union = false;
    if (w.size && (single || union)) return false;
    seen.push(w);
    return true;
  });
}

/** Layer 4: weakest area and who covers it. */
function tradeOff(f: Fact, facts: Fact[], schema: CategorySchema, seed: string): string | undefined {
  for (const field of schema.fields) {
    if (!field.better) continue;
    const order = ranked(field, facts);
    const v = num(f.specs[field.key]);
    const noun = field.noun ?? lc(field.label);
    if (order.length >= 2 && v === undefined) {
      const lead = order[0];
      return pick([
        `The maker doesn't give its ${noun}; if that figure matters, ${claim(field, lead)}.`,
        `There is no published ${noun} figure, whereas ${claim(field, lead)}.`,
        `Buyers who need a confirmed ${noun} should compare it with the ${lead.short}, which ${verbFor(field)} ${field.fmt(num(lead.specs[field.key])!)}.`,
        `If you want a confirmed ${noun}, look to the ${lead.short} instead: it ${verbFor(field)} ${field.fmt(num(lead.specs[field.key])!)}, while this one gives no figure.`,
      ], seed + "t");
    }
    if (order.length >= 3 && order[order.length - 1].asin === f.asin) {
      const lead = order[0];
      return pick([
        `The trade-off is ${noun}; for more, ${claim(field, lead)}.`,
        `It gives ground on ${noun}, where ${claim(field, lead)}.`,
        `If ${noun} is your priority, the ${lead.short} (${field.fmt(num(lead.specs[field.key])!)}) is the stronger choice.`,
        `${cap(noun)} is its weakest area, and the ${lead.short} covers it better at ${field.fmt(num(lead.specs[field.key])!)}.`,
      ], seed + "t");
    }
  }
  return undefined;
}

/** Builds the four-layer "Why we like it" text for one pick (used by category-specific composers too). */
export function buildWhy(f: Fact, facts: Fact[], schema: CategorySchema, seed: string, take: string): string {
  const takeWords = new Set(take.toLowerCase().match(/[a-z0-9]{4,}/g) ?? []);
  const freshNotes = f.notes.filter((n) => { const w = n.toLowerCase().match(/[a-z0-9]{4,}/g) ?? []; return w.filter((x) => takeWords.has(x)).length < Math.max(1, Math.ceil(w.length / 2)); });
  const notes = freshNotes.length ? pick([`You also get ${listJoin(freshNotes)}.`, `It also comes with ${listJoin(freshNotes)}.`, `It also offers ${listJoin(freshNotes)}.`], seed + "n") : "";
  return whyParagraphs({
    take: [take, WHY_EXTRA[f.asin]].filter(Boolean).join(" "),
    ranking: rankingSentences(f, facts, schema, seed), descriptive: [], notes, compat: schema.compat(f, facts),
    trade: tradeOff(f, facts, schema, seed),
    extras: whyExtras(f, facts, schema, { badge: "", reason: "", bestFor: "" }, seed, comparativeCons(f, facts, schema).map((c) => c.con)),
  }).join("\n\n");
}

const PRICE_EDGES = [50, 100, 150, 250, 500, 1000, 1500, Infinity];
function priceBucket(v: number): string {
  const i = PRICE_EDGES.findIndex((e) => v < e);
  const lo = i === 0 ? 0 : PRICE_EDGES[i - 1];
  return i === 0 ? "Under $50" : PRICE_EDGES[i] === Infinity ? `Over $${lo}` : `About $${lo} to $${PRICE_EDGES[i]}`;
}

type Label = { badge: string; reason: string; bestFor: string };

/**
 * FAQ, buying criteria, method and table intros built from this guide's own picks.
 * Pooled category text repeated verbatim across 100+ guides (Sept 2026 audit), so pooled items are
 * now only a small tail; the rest names this guide's products and figures. Prices stay as tiers.
 */
function guideSections(cfg: GenericArticleConfig, facts: Fact[], schema: CategorySchema, taken: Map<string, Label>) {
  const s = cfg.slug;
  const pk = <T,>(xs: T[], k: string) => xs[hash(s + k) % xs.length];
  const plural = lc(schema.plural);
  const N = facts.length;
  const the = (f: Fact) => `the ${f.short}`;
  const nounOf = (fd: FieldDef) => fd.noun ?? lc(fd.label);
  const has = (f: Fact, fd: FieldDef) => !missingVal(f.specs[fd.key]);
  const fmtOf = (f: Fact, fd: FieldDef) => fd.fmt(f.specs[fd.key]!);
  const byPrice = facts.filter((f) => priceNum(f.price)).sort((a, b) => priceNum(a.price)! - priceNum(b.price)!);
  const an = (n: number) => (/^(8|11|18)/.test(String(n)) ? "an" : "a");
  const tierOf = (f: Fact) => priceBucket(priceNum(f.price) ?? 0).replace(/^About /, "").replace(/^Under/, "under").replace(/^Over/, "over");
  /** "buyers who put X first" -> "anyone who puts X first": the verb after "who" takes its third-person form. */
  const fixWho = (bestFor: string) => {
    const t = lc(bestFor.replace(/\.$/, ""));
    return t.replace(/^(buyers|anyone|people|gamers|users|those|players|streamers|creators|readers) (who|that) (\w+)/i, (_m, _n, _w, v: string) => {
      const lv = v.toLowerCase();
      const third = /^(would|can|will|must|should|may|might|could|is|are|was|were|has)$/.test(lv) ? lv : lv === "have" ? "has" : lv === "do" ? "does" : lv === "go" ? "goes" : /(s|sh|ch|x|z)$/.test(lv) ? `${lv}es` : /[^aeiou]y$/.test(lv) ? `${lv.slice(0, -1)}ies` : `${lv}s`;
      return `anyone who ${third}`;
    });
  };

  // Numeric fields where the picks actually differ, most-stated first.
  const numF = schema.fields.filter((fd) => fd.better).map((fd) => ({ fd, order: ranked(fd, facts) }))
    .filter((x) => x.order.length >= 2 && num(x.order[0].specs[x.fd.key]) !== num(x.order[x.order.length - 1].specs[x.fd.key]))
    .sort((a, b) => b.order.length - a.order.length);
  // Descriptive fields with short values or yes/no flags that split the picks.
  const catF = schema.fields.filter((fd) => !fd.better && !/^(type|does|kind|form)$/.test(fd.key)).map((fd) => {
    const groups = new Map<string, Fact[]>();
    for (const f of facts) {
      if (!has(f, fd)) continue;
      const v = f.specs[fd.key]!;
      const key = typeof v === "boolean" ? (v ? "yes" : "no") : /^(yes|no)$/i.test(String(v)) ? String(v).toLowerCase() : fd.fmt(v);
      groups.set(key, [...(groups.get(key) ?? []), f]);
    }
    return { fd, groups };
  }).filter((x) => { const k = [...x.groups.keys()]; const yn = k.filter((v) => /^(yes|no)$/.test(v)).length; return [...x.groups.values()].flat().length >= 2 && (yn === k.length || (yn === 0 && k.every((v) => readableValue(v, x.fd.label)))); });
  const missingOf = (fd: FieldDef) => facts.filter((f) => !has(f, fd));
  const names = (fs: Fact[]) => listJoin(fs.map(the));
  const verb = (fs: Fact[], one: string, many: string) => (fs.length === 1 ? one : many);

  const faq: { q: string; a: string }[] = [];
  // Head-to-head on up to three ranked fields.
  numF.filter(({ fd, order }) => num(order[0].specs[fd.key]) !== num(order[1].specs[fd.key])).slice(0, 3).forEach(({ fd, order }, i) => {
    const [a, b] = order, z = order[order.length - 1], n = nounOf(fd);
    const miss = missingOf(fd);
    const [best] = fd.superlative ?? (fd.better === "higher" ? ["highest"] : ["lowest"]);
    faq.push({
      q: pk([`Which has the ${best} ${n}: ${the(a)} or ${the(b)}?`, `How does ${the(b)} compare with ${the(a)} on ${n}?`, `Is ${the(a)} ahead of ${the(b)} on ${n}?`], `fq${i}`),
      a: ((pct) => pk([
        `${cap(the(a))} ${fd.better === "higher" ? "leads" : "comes out best"} at ${fmtOf(a, fd)}, with ${the(b)} at ${fmtOf(b, fd)}.`,
        `${cap(the(a))} ${fd.better === "higher" ? "tops" : "is lowest on"} ${n} at ${fmtOf(a, fd)}; ${the(b)} follows at ${fmtOf(b, fd)}${pct ? `, ${pct}% apart` : ""}.`,
        `Between the top two, it is ${fmtOf(a, fd)} on ${the(a)} against ${fmtOf(b, fd)} on ${the(b)}${pct ? `, ${an(pct)} ${pct}% difference` : ""}.`,
      ], `fa${i}`))(num(a.specs[fd.key]) && num(b.specs[fd.key]) ? Math.round((Math.abs(num(a.specs[fd.key])! - num(b.specs[fd.key])!) / Math.abs(num(b.specs[fd.key])!)) * 100) : 0)
        + (order.length >= 3 && num(z.specs[fd.key]) !== num(b.specs[fd.key]) ? " " + pk([`${cap(the(z))} is at the other end of this group with ${fmtOf(z, fd)}.`, `The spread runs down to ${the(z)} at ${fmtOf(z, fd)}.`, `${cap(the(z))} closes the ranking at ${fmtOf(z, fd)}.`], `fz${i}`) : "")
        + (miss.length ? ` ${pk([`${cap(names(miss))} ${verb(miss, "doesn't", "don't")} state a ${n} figure, so ${verb(miss, "it sits", "they sit")} outside this comparison`, `No ${n} figure is published for ${names(miss)}, which leaves ${order.length} of ${N} picks ranked here`, `${cap(names(miss))} ${verb(miss, "is", "are")} left out of this ranking because ${verb(miss, "its", "their")} ${n} isn't stated`], `fm${i}`)}${order.length < N ? `; ${order.length} of ${N} picks are ranked` : ""}.`.replace(/(ranked here); \d+ of \d+ picks are ranked/, "$1") : ""),
    });
  });
  // What the premium pick adds over the cheapest one.
  if (byPrice.length >= 2) {
    const lo = byPrice[0], hi = byPrice[byPrice.length - 1];
    const gains = numF.filter(({ fd }) => has(hi, fd) && has(lo, fd) && (fd.better === "higher" ? num(hi.specs[fd.key])! > num(lo.specs[fd.key])! : num(hi.specs[fd.key])! < num(lo.specs[fd.key])!));
    const losses = numF.filter(({ fd }) => has(hi, fd) && has(lo, fd) && !gains.includes(numF.find((x) => x.fd === fd)!) && num(hi.specs[fd.key]) !== num(lo.specs[fd.key]));
    const g = gains.slice(0, 3).map(({ fd }) => `${nounOf(fd)} (${fmtOf(hi, fd)} against ${fmtOf(lo, fd)})`);
    const l = losses.slice(0, 2).map(({ fd }) => `${nounOf(fd)} (${fmtOf(lo, fd)})`);
    if (g.length || l.length)
      faq.push({
        q: pk([`Is ${the(hi)} worth paying more than ${the(lo)}?`, `What does ${the(hi)} add over ${the(lo)}?`], "fp"),
        a: (g.length ? pk([`On paper it adds ${listJoin(g)}.`, `The spec sheets show ${listJoin(g)} in its favour.`, `What it brings is ${listJoin(g)}.`], "fpg")
            : `${cap(the(hi))} matches or trails ${the(lo)} on ${listJoin(numF.filter(({ fd }) => has(hi, fd) && has(lo, fd)).slice(0, 3).map(({ fd }) => nounOf(fd))) || "every ranked spec"}, so the extra spend buys only what the spec sheet doesn't show.`)
          + (l.length ? ` It does not win everywhere: ${the(lo)} still leads on ${listJoin(l)}.` : "")
          + (tierOf(hi) !== tierOf(lo)
            ? pk([` ${cap(the(lo))} sat in the ${tierOf(lo)} tier and ${the(hi)} in the ${tierOf(hi)} tier when we checked`, ` On our last price check ${the(lo)} was in the ${tierOf(lo)} tier and ${the(hi)} in the ${tierOf(hi)} tier`], "fpt") + `${byPrice.length > 2 ? `, with ${byPrice.length - 2} other pick${byPrice.length === 3 ? "" : "s"} between them` : ""}${g.length ? `; pay the difference only if ${listJoin(gains.slice(0, 2).map(({ fd }) => nounOf(fd)))} decide${gains.length === 1 ? "s" : ""} your purchase.` : "."}`
            : ` Both sat in the ${tierOf(lo)} tier when we checked${g.length ? `, so the gains in ${listJoin(gains.slice(0, 2).map(({ fd }) => nounOf(fd)))} cost little extra by tier.` : ", so the choice comes down to features."}`),
      });
  }
  // Why a labelled pick carries its badge.
  const NEUTRAL = /^(Also Consider|Strong Alternative|Worth a Look|Solid Runner-Up|Honourable Mention|Well-Rounded Choice|Solid Alternative|Worth Considering)$/;
  const labelled = ((l) => (l.filter((f) => !/price/i.test(taken.get(f.asin)!.reason)).length ? l.filter((f) => !/price/i.test(taken.get(f.asin)!.reason)) : l))(facts.filter((f) => taken.get(f.asin)?.reason && !NEUTRAL.test(taken.get(f.asin)!.badge)));
  if (labelled.length) {
    const f = pk(labelled, "fl"), l = taken.get(f.asin)!;
    // Where the label rests on a ranked spec this pick leads, say by how much; then what it costs against the cheapest pick.
    const lead = numF.find(({ fd, order }) => order[0].asin === f.asin && order.length >= 2 && num(order[0].specs[fd.key]) !== num(order[1].specs[fd.key]) && l.reason.toLowerCase().includes(nounOf(fd).toLowerCase().replace(/^(largest|highest|lowest|longest|most) /, "")));
    let margin = "";
    if (lead) {
      const second = lead.order[1], a1 = num(f.specs[lead.fd.key])!, a2 = num(second.specs[lead.fd.key])!;
      const pct = a2 ? Math.round((Math.abs(a1 - a2) / Math.abs(a2)) * 100) : 0;
      margin = pk([
        ` On ${nounOf(lead.fd)} it leads ${the(second)}, ${fmtOf(f, lead.fd)} against ${fmtOf(second, lead.fd)}${pct >= 1 ? `, ${an(pct)} ${pct}% margin` : ""}.`,
        ` ${cap(the(second))} is next on ${nounOf(lead.fd)} at ${fmtOf(second, lead.fd)}${pct >= 1 ? `, so this pick's ${fmtOf(f, lead.fd)} is ${pct}% further out` : `, just behind ${fmtOf(f, lead.fd)}`}.`,
      ], "flm");
    }
    const cheapest = byPrice[0];
    let cost = "";
    if (cheapest && cheapest.asin !== f.asin) {
      const behind = numF.filter(({ fd }) => has(f, fd) && has(cheapest, fd) && (fd.better === "higher" ? num(cheapest.specs[fd.key])! > num(f.specs[fd.key])! : num(cheapest.specs[fd.key])! < num(f.specs[fd.key])!)).slice(0, 2);
      cost = behind.length
        ? pk([` The price of that: ${the(cheapest)}, the cheapest pick, still beats it on ${listJoin(behind.map(({ fd }) => `${nounOf(fd)} (${fmtOf(cheapest, fd)} against ${fmtOf(f, fd)})`))}.`, ` It gives up ${listJoin(behind.map(({ fd }) => `${nounOf(fd)} (${fmtOf(f, fd)} against ${fmtOf(cheapest, fd)})`))} to ${the(cheapest)}, the cheapest pick.`], "flc")
        : priceNum(f.price) && tierOf(f) !== tierOf(cheapest) ? ` ${cap(the(cheapest))}, the cheapest pick, sat in the ${tierOf(cheapest)} tier against ${tierOf(f)} here, without out-ranking it on any listed spec.` : "";
    }
    faq.push({
      q: pk([`Why is ${the(f)} our ${l.badge}${/\bpick$/i.test(l.badge) ? "" : " pick"}?`, `What makes ${the(f)} the ${l.badge}?`], "flq"),
      a: `${pk(["It earns the label for", "The label rests on", "It carries the badge for"], "fla")} ${lc(l.reason.replace(/\.$/, ""))}.${margin}${cost}${l.bestFor ? ` ${pk(["It suits", "It is aimed at", "It makes sense for"], "flb")} ${fixWho(l.bestFor)}.` : ""}`,
    });
  }
  // A feature that splits the picks.
  const split = catF.find((x) => x.groups.size >= 2 || (x.groups.has("yes") && [...x.groups.values()].flat().length < N));
  if (split) {
    const { fd, groups } = split, lbl = lc(fd.label);
    const yes = groups.get("yes"), no = groups.get("no");
    const miss = missingOf(fd);
    let a: string;
    if (yes || no) a = `${yes ? `${cap(names(yes))} ${verb(yes, "has", "have")} it` : "None of the picks lists it"}${no ? `; ${names(no)} ${verb(no, "does", "do")} not` : ""}.`;
    else a = [...groups.entries()].map(([v, fs]) => `${names(fs)} ${verb(fs, "uses", "use")} ${/d|[A-Z].*[A-Z]/.test(v) ? v : lc(v)}`).map((x, i) => (i === 0 ? cap(x) : x)).join("; ") + ".";
    if (miss.length) a += ` ${pk([`The maker${miss.length > 1 ? "s" : ""} of ${names(miss)} ${verb(miss, "doesn't", "don't")} state ${lbl}`, `${cap(names(miss))} ${verb(miss, "has", "have")} no ${lbl} listed`], "fsm")}, so ${[...groups.values()].flat().length} of ${N} picks are covered here.`;
    const gs = [...groups.values()];
    const q = yes || no
      ? pk([`Which of these ${plural} have ${lbl}?`, `Does ${the((yes ?? no)![0])} have ${lbl}, and which others do?`], "fsq")
      : `Do ${the(gs[0][0])} and ${the(gs[1]?.[0] ?? gs[0][1] ?? gs[0][0])} differ on ${lbl}?`;
    faq.push({ q, a });
  }
  // Only compat lines that name the pick; generic category advice repeats across too many guides.
  const withCompat = facts.map((f) => ({ f, c: schema.compat(f, facts).filter((l) => l.includes(f.short)) })).filter((x) => x.c.length);
  if (withCompat.length) {
    const x = pk(withCompat, "fc");
    faq.push({ q: pk([`What should I check before buying ${the(x.f)}?`, `Will ${the(x.f)} work with my setup?`], "fcq"), a: x.c.slice(0, 2).join(" ") + ` In this guide it ranks ${ordinal(facts.indexOf(x.f) + 1)} of ${N}${taken.get(x.f.asin) && !NEUTRAL.test(taken.get(x.f.asin)!.badge) ? `, as our ${taken.get(x.f.asin)!.badge} pick` : ""}${(() => {
      const r = numF.find(({ fd, order }) => has(x.f, fd) && order.some((o) => o.asin === x.f.asin));
      if (!r) return "";
      const pos = r.order.findIndex((o) => o.asin === x.f.asin) + 1;
      return `, and ${ordinal(pos)} of ${r.order.length} on ${nounOf(r.fd)} (${fmtOf(x.f, r.fd)})`;
    })()}.` });
  }
  const noted = facts.filter((f) => f.notes.length);
  if (noted.length >= 2 && faq.length < 6) {
    const two = noted.slice(0, 3);
    faq.push({ q: pk([`What extras do ${names(two.slice(0, 2))} include?`, `Beyond the specs, what sets ${names(two.slice(0, 2))} apart?`], "fnq"), a: two.map((f) => `${cap(the(f))}: ${f.notes[0]}.`).join(" ") });
  }
  // More pick-specific questions before any pooled text: a second labelled pick, then two picks' best-for lines.
  const lab2 = labelled.filter((f) => f !== pk(labelled, "fl"));
  if (faq.length < 5 && lab2.length) {
    const f = lab2[0], l = taken.get(f.asin)!;
    faq.push({ q: `Who should choose ${the(f)}?`, a: `${cap(the(f))} carries our ${l.badge} label for ${lc(l.reason.replace(/\.$/, ""))}. It ranks ${ordinal(facts.indexOf(f) + 1)} of ${N} here${priceNum(f.price) ? ` and sat in the ${tierOf(f)} tier at our last price check` : ""}${l.bestFor ? `; it suits ${fixWho(l.bestFor)}` : ""}.` });
  }
  const suited = facts.filter((f) => taken.get(f.asin)?.bestFor);
  if (faq.length < 5 && suited.length >= 2) {
    const [a, b] = [suited[0], suited[suited.length - 1]];
    faq.push({ q: `Should I pick ${the(a)} or ${the(b)}?`, a: `${cap(the(a))} suits ${lc(taken.get(a.asin)!.bestFor.replace(/\.$/, ""))}; ${the(b)} suits ${lc(taken.get(b.asin)!.bestFor.replace(/\.$/, ""))}.` });
  }
  if (faq.length < 5 && noted.length >= 4) {
    const two = noted.slice(-2);
    faq.push({ q: `What else do ${names(two)} offer?`, a: two.map((f) => `${cap(the(f))}: ${f.notes[f.notes.length - 1]}.`).join(" ") });
  }
  // Pooled category questions only fill a guide whose picks give too little to compare (at most one).
  const pooledFaq = shuffle(schema.faq, s + "faq");
  const faqOut = [...faq.slice(0, 6), ...pooledFaq.slice(0, Math.max(0, 5 - faq.length))].slice(0, 6);

  // Buying criteria: ranges from this guide's picks, then a short pooled tail.
  const crit: { title: string; body: string }[] = [];
  numF.slice(0, 3).forEach(({ fd, order }, i) => {
    const a = order[0], z = order[order.length - 1], n = nounOf(fd);
    const pa = priceNum(a.price), pb = priceNum(order[1]?.price);
    const cheaperLeader = order.length >= 3 && pa && pb && pb < pa && num(order[1].specs[fd.key]) !== num(z.specs[fd.key]) ? order[1] : undefined;
    crit.push({
      title: pk([`${cap(n)}`, `How much ${n} you need`, `${cap(n)} across these picks`], `ct${i}`),
      body: ((pct, tops) => pk([
        `Here ${n} runs from ${fmtOf(z, fd)} on ${the(z)} to ${fmtOf(a, fd)} on ${the(a)}${pct ? `, ${an(pct)} ${pct}% spread` : ""}.`,
        `${cap(the(a))} tops ${n} at ${fmtOf(a, fd)} and ${the(z)} sits lowest at ${fmtOf(z, fd)}${tops > 1 ? `; ${tops} picks share the top figure` : ""}.`,
        `Across these ${order.length} picks ${n} spans ${fmtOf(z, fd)} (${the(z)}) to ${fmtOf(a, fd)} (${the(a)}).`,
      ], `cr${i}`))(num(a.specs[fd.key]) && num(z.specs[fd.key]) ? Math.round((Math.abs(num(a.specs[fd.key])! - num(z.specs[fd.key])!) / Math.abs(num(z.specs[fd.key])!)) * 100) : 0, order.filter((o) => num(o.specs[fd.key]) === num(a.specs[fd.key])).length)
        + (cheaperLeader && cheaperLeader.asin !== a.asin ? pk([
          ` ${cap(the(cheaperLeader))} comes second at ${fmtOf(cheaperLeader, fd)}${priceNum(cheaperLeader.price) && priceNum(a.price) ? `, in the ${tierOf(cheaperLeader)} tier against ${tierOf(a)} for ${the(a)}` : " for less money"}.`,
          ` For less, ${the(cheaperLeader)} is the runner-up at ${fmtOf(cheaperLeader, fd)}${priceNum(cheaperLeader.price) && priceNum(a.price) ? ` (${tierOf(cheaperLeader)} tier)` : ""}.`,
        ], `cv${i}`) : pk([` Start with ${the(a)} if ${n} decides it.`, ` ${cap(the(a))} is the pick for ${n}.`, ` If ${n} is your first filter, ${the(a)} sets the ceiling at ${fmtOf(a, fd)}.`], `cl${i}`))
        + (missingOf(fd).length ? ` ${cap(names(missingOf(fd)))} ${verb(missingOf(fd), "gives", "give")} no ${n} figure, so ${order.length} of ${N} picks are compared here.` : ""),
    });
  });
  catF.filter((x) => x !== split).slice(0, 2).forEach(({ fd, groups }) => {
    const parts = [...groups.entries()].map(([v, fs]) => (v === "yes" ? `${names(fs)} ${verb(fs, "has", "have")} it` : v === "no" ? `${names(fs)} ${verb(fs, "goes", "go")} without` : `${names(fs)} ${verb(fs, "lists", "list")} ${/d|[A-Z].*[A-Z]/.test(v) ? v : lc(v)}`));
    if (groups.size < 2 && !groups.has("yes") && !groups.has("no")) return;
    crit.push({ title: cap(lc(fd.label)), body: `${cap(parts.join("; "))}.${(() => {
      const sizes = [...groups.values()].map((g) => g.length).sort((x, y) => y - x);
      const total = sizes.reduce((x, y) => x + y, 0);
      return pk([
        ` Settling ${lc(fd.label)} first narrows ${total} picks to ${listJoin(sizes.map(String)).replace(/, ([^,]+)$/, " or $1").replace(/ and (\d+)$/, " or $1")}.`,
        ` Sort out ${lc(fd.label)} before price: it splits ${total} stated picks into groups of ${listJoin(sizes.map(String))}.`,
        "",
      ], "cc" + fd.key);
    })()}` });
  });
  if (withCompat.length >= 2 && crit.length < 5)
    crit.push({ title: pk(["Fit and compatibility", "What to check at home", "Setup checks"], "cf"), body: withCompat.map((x) => x.c[0]).filter((c, i, arr) => arr.findIndex((o) => o.replace(/the [^,;:.]+?('s)? /gi, "").slice(-40) === c.replace(/the [^,;:.]+?('s)? /gi, "").slice(-40)) === i).slice(0, 3).map(cap).join(" ") });
  if (noted.length >= 2 && crit.length < 5)
    crit.push({ title: pk(["Extras that separate them", "Features beyond the spec table"], "cn"), body: noted.map((f) => ({ f, n: f.notes[f.notes.length > 1 ? 1 : 0] })).filter((x, i, arr) => arr.findIndex((o) => o.n === x.n) === i).slice(-3).map((x) => `${cap(the(x.f))}: ${x.n}.`).join(" ") });
  if (byPrice.length >= 3 && crit.length < 5) {
    const tiers = new Map<string, Fact[]>();
    for (const f of byPrice) { const b = priceBucket(priceNum(f.price)!).replace(/^About /, ""); tiers.set(b, [...(tiers.get(b) ?? []), f]); }
    crit.push({ title: pk(["Budget", "How much to spend", "Where your budget lands"], "cb"), body: tiers.size > 1
      ? [...tiers.entries()].map(([b, fs]) => `${b.toLowerCase().replace(/^under/, "under")} buys ${names(fs)}`).map((x, i) => (i ? x : cap(x))).join("; ") + " at our last check."
      : pk([
        `All ${byPrice.length} sat in the ${tierOf(byPrice[0])} tier when we checked, from ${the(byPrice[0])} at the low end to ${the(byPrice[byPrice.length - 1])} at the top, so decide on features first.`,
        `Price does little to separate these ${byPrice.length}: ${the(byPrice[0])} through ${the(byPrice[byPrice.length - 1])} all landed in the ${tierOf(byPrice[0])} tier, which leaves ${numF[0] ? nounOf(numF[0].fd) : "features"} to decide it.`,
      ], "cbt") });
  }
  const suitsCrit = facts.filter((f) => taken.get(f.asin)?.bestFor && !NEUTRAL.test(taken.get(f.asin)!.badge));
  if (suitsCrit.length >= 2 && crit.length < 5)
    crit.push({ title: pk(["Match the pick to your priority", "Start from what matters most"], "cs"), body: suitsCrit.slice(0, 3).map((f) => `${cap(lc(taken.get(f.asin)!.bestFor.replace(/\.$/, "")))}: ${the(f)}.`).join(" ") });
  const prio = cfg.priorityCriteria ?? [];
  const pooledCrit = crit.length >= 3 ? shuffle(schema.criteria, s) : [...prio.map((id) => schema.criteria.find((c) => c.id === id)!).filter(Boolean), ...shuffle(schema.criteria.filter((c) => !prio.includes(c.id)), s)];
  const critOut = [...crit.slice(0, 5), ...pooledCrit.slice(0, Math.max(0, 5 - crit.length)).map((c) => ({ title: c.title, body: c.body }))].slice(0, 6);

  // How we chose: this guide's fields, shared features and gaps.
  const stated = schema.fields.filter((fd) => facts.filter((f) => has(f, fd)).length >= 2);
  const evaluated: { title: string; description: string }[] = [];
  if (stated.length)
    evaluated.push({
      title: pk(["What we compared", "The figures behind the order", "How these picks were ranked"], "e1"),
      description: `${pk(["We lined up", "We compared", "We set side by side"], "e1a")} ${["zero", "one", "two", "three", "four", "five", "six", "seven"][N] ?? N} ${plural} on ${listJoin(stated.slice(0, 4).map((fd) => nounOf(fd)))}${pk([", using each maker's published specs", " as the makers state them", " from manufacturer specifications"], "e1b")}. ${((full, partial) => pk([
        `Nothing was tested in-house; ${full.length} of the ${stated.length} fields compared are stated for every pick${partial.length ? `, while ${listJoin(partial.slice(0, 2).map((fd) => nounOf(fd)))} ${partial.length > 1 ? "have" : "has"} gaps` : ""}.`,
        `We did not test them in-house, and ${partial.length ? `${listJoin(partial.slice(0, 2).map((fd) => nounOf(fd)))} ${partial.length > 1 ? "are" : "is"} missing for at least one pick` : `all ${stated.length} compared fields are stated for every pick`}.`,
        `These are research figures, not bench results${partial.length ? `: ${missingOf(partial[0]).length} of ${N} picks leave out ${nounOf(partial[0])}` : `, and every compared field is stated for all ${N} picks`}.`,
      ], "e1c"))(stated.filter((fd) => facts.every((f) => has(f, fd))), stated.filter((fd) => !facts.every((f) => has(f, fd))))}`,
    });
  const allStated = stated.filter((fd) => facts.every((f) => has(f, fd)));
  const shared = catF.filter((x) => x.groups.size === 1 && [...x.groups.values()][0].length === N).map((x) => { const [v] = [...x.groups.keys()]; return v === "yes" ? lc(x.fd.label) : v === "no" ? "" : `${v} ${lc(x.fd.label)}`; }).filter(Boolean);
  if (allStated.length || shared.length)
    evaluated.push({
      title: pk(["What every pick has in common", "The shared baseline"], "e2"),
      description: [allStated.length ? `All ${N}, from ${the(facts[0])} to ${the(facts[N - 1])}, state ${listJoin(allStated.slice(0, 3).map((fd) => nounOf(fd)))}` : "", shared.length ? `${allStated.length ? "and" : `All ${N}`} share ${listJoin(shared.slice(0, 2))}` : ""].filter(Boolean).join(" ") + ".",
    });
  const gaps = stated.map((fd) => ({ fd, miss: missingOf(fd) })).filter((x) => x.miss.length && x.miss.length < N);
  const suits = facts.filter((f) => taken.get(f.asin)?.reason);
  if (gaps.length || suits.length) evaluated.push(gaps.length
    ? { title: "Where the specs have gaps", description: gaps.slice(0, 2).map(({ fd, miss }, i) => `${i ? names(miss) : cap(names(miss))} ${verb(miss, "gives", "give")} no ${nounOf(fd)}`).join("; ") + "." }
    : { title: "Who each pick suits", description: suits.slice(0, 3).map((f, i) => `${i ? the(f) : cap(the(f))} for ${lc(taken.get(f.asin)!.reason)}`).join("; ") + "." });
  if (byPrice.length >= 2) {
    const lo = priceBucket(priceNum(byPrice[0].price)!), hi = priceBucket(priceNum(byPrice[byPrice.length - 1].price)!);
    evaluated.push({ title: "Price range", description: lo === hi ? `From ${the(byPrice[0])} to ${the(byPrice[byPrice.length - 1])}, all sat in the ${lo.toLowerCase().replace(/^about /, "")} tier when we checked.` : `At our last check the picks ran from ${the(byPrice[0])} (${lo.toLowerCase().replace(/^about /, "")}) to ${the(byPrice[byPrice.length - 1])} (${hi.toLowerCase().replace(/^about /, "")}).` });
  }
  const evalOut = evaluated.length >= 3 ? evaluated : [...evaluated, ...shuffle(schema.evaluated, s + "eval").slice(0, 3 - evaluated.length)];

  const lead = numF[0];
  const cmpMissing = schema.fields.filter((fd) => facts.filter((f) => f.specs[fd.key] !== undefined).length >= 2).slice(0, 4).some((fd) => facts.some((f) => f.specs[fd.key] === undefined));
  const specIntro = lead
    ? `${cap(the(lead.order[0]))} leads on ${nounOf(lead.fd)} at ${fmtOf(lead.order[0], lead.fd)}, ahead of ${the(lead.order[1])} at ${fmtOf(lead.order[1], lead.fd)}.${cmpMissing ? ((cm) => cm ? ` "Not listed" marks ${nounOf(cm.fd)} where ${names(cm.miss)} ${verb(cm.miss, "leaves", "leave")} the figure out.` : "")(schema.fields.filter((fd) => facts.filter((f) => f.specs[fd.key] !== undefined).length >= 2).slice(0, 4).map((fd) => ({ fd, miss: facts.filter((f) => f.specs[fd.key] === undefined) })).find((x) => x.miss.length)) : ""}`
    : `${cap(the(facts[0]))}, ${the(facts[1])} and the rest, as their makers list them.`;
  const priceIntro = byPrice.length >= 2
    ? pk([
      `${cap(the(byPrice[0]))} was the lowest-priced pick (${tierOf(byPrice[0])}) and ${the(byPrice[byPrice.length - 1])} the highest (${tierOf(byPrice[byPrice.length - 1])}) when we checked; tiers move with Amazon pricing.`,
      `At our last check the cheapest pick, ${the(byPrice[0])}, sat in the ${tierOf(byPrice[0])} tier, ${[...new Set(byPrice.map(tierOf))].length} tier${[...new Set(byPrice.map(tierOf))].length === 1 ? "" : "s"} in all up to ${the(byPrice[byPrice.length - 1])} at ${tierOf(byPrice[byPrice.length - 1])}; Amazon prices move, so recheck before buying.`,
    ], "pi")
    : "Prices change often; these tiers reflect Amazon prices when this guide was updated.";
  return { faq: faqOut, criteria: critOut, evaluated: evalOut, specIntro, priceIntro };
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
    taken.set(order[0].asin, { badge: field.rule.label, reason: `the ${field.superlative?.[0] ?? "best"} ${field.noun ?? lc(field.label)} here (${field.fmt(top!)})`, bestFor: pick(field.rule.bestFor, cfg.slug + field.key) });
  }
  for (const a of cfg.asins) if (!taken.has(a) && cfg.labels?.[a]) taken.set(a, cfg.labels[a]);
  const fallbacks = ["Well-Rounded Choice", "Solid Alternative", "Worth Considering"];
  let fb = hash(cfg.slug) % fallbacks.length;

  const products: BestProduct[] = facts.map((f, i) => {
    const seed = `${cfg.slug}:${f.asin}`;
    const lab = taken.get(f.asin) ?? { badge: fallbacks[fb++ % fallbacks.length], reason: "", bestFor: "" };
    const take = [cfg.takes[f.asin], WHY_EXTRA[f.asin]].filter(Boolean).join(" ") || undefined;
    const ranking = rankingSentences(f, facts, schema, seed);
    // Skip notes the editorial take already covers (shared distinctive words).
    const takeWords = new Set((take ?? "").toLowerCase().match(/[a-z0-9]{4,}/g) ?? []);
    const freshNotes = f.notes.filter((n) => { const w = n.toLowerCase().match(/[a-z0-9]{4,}/g) ?? []; return w.filter((x) => takeWords.has(x)).length < Math.max(1, Math.ceil(w.length / 2)); });
    const notes = freshNotes.length ? pick([`You also get ${listJoin(freshNotes)}.`, `It also comes with ${listJoin(freshNotes)}.`, `It also offers ${listJoin(freshNotes)}.`], seed + "n") : "";
    const compat = schema.compat(f, facts);
    const cmpCons = comparativeCons(f, facts, schema);
    const altCon = cmpCons.find((c) => c.alt);
    const trade = tradeOff(f, facts, schema, seed) ?? (altCon ? pick([
      `The main gap: ${lc(altCon.con)}. If that matters, ${altCon.alt}.`,
      `What it gives up: ${lc(altCon.con)}; by contrast, ${altCon.alt}.`,
    ], seed + "t2") : undefined);
    const paras = whyParagraphs({
      take: take ?? `The ${f.short} is a ${lab.badge.toLowerCase()} in this guide.`,
      ranking, descriptive: descriptiveSentences(f, facts, schema, seed), notes, compat,
      price: priceSentence(f, facts, seed), trade,
      extras: whyExtras(f, facts, schema, lab, seed, cmpCons.map((c) => c.con)),
    });

    const specs = schema.fields.map((fd) => (f.specs[fd.key] !== undefined ? `${fd.label}: ${fd.fmt(f.specs[fd.key]!)}` : "")).filter(Boolean);
    const pros = dedupePhrases([...schema.fields.map((fd) => (!missingVal(f.specs[fd.key]) ? fd.strength?.(f.specs[fd.key]!) : undefined)).filter(Boolean) as string[], ...f.notes.map((n) => cap(n.replace(/^an? /, ""))), ...comparativePros(f, facts, schema)]);
    const cons = schema.fields.map((fd) => (!missingVal(f.specs[fd.key]) ? fd.weakness?.(f.specs[fd.key]!) : undefined)).filter(Boolean) as string[];
    const conKey = (c: string) => c.toLowerCase().replace(/,.*$/, "").replace(/\b(the|a|an|in|of)\b/g, "").replace(/\s+/g, " ").trim();
    const allCons = dedupePhrases([...cons, ...cmpCons.map((c) => c.con)]).filter((c, i, arr) => arr.findIndex((o) => conKey(o) === conKey(c)) === i);

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
      skipIf: allCons[0] ? skipLine(allCons[0], seed) : "Look at the other picks if you need a feature not covered above.",
      specs,
      pros: ((base) => (base.length >= 3 ? base : dedupePhrases([...base, ...specPros(f, schema)])))(dedupePhrases([...pros, ...(lab.reason && (pros.length < 3 || !reasonCovered(lab.reason, pros)) ? [cap(lab.reason)] : [])])).slice(0, 4),
      cons: [...new Set(allCons)].slice(0, 3),
    };
  });

  const gm = gameBlock(gameForSlug(cfg.slug, cfg.game), cfg.slug, facts, lc(schema.plural));
  const sec = guideSections(cfg, facts, schema, taken);
  const crit = sec.criteria, faq = sec.faq, evaluated = sec.evaluated;

  const cmpFields = schema.fields.filter((fd) => facts.filter((f) => f.specs[fd.key] !== undefined).length >= 2).slice(0, 4);
  const priced = facts.map((f) => ({ s: f.short, v: priceNum(f.price) })).filter((x) => x.v) as { s: string; v: number }[];
  const groups = new Map<string, string[]>();
  for (const p of priced.sort((a, b) => a.v - b.v)) groups.set(priceBucket(p.v), [...(groups.get(priceBucket(p.v)) ?? []), p.s]);

  const howToChoose: HowToChooseSection[] = [
    { subheading: "By priority", table: { headers: ["Priority", "Consider", "Why"], rows: products.filter((p) => taken.has(p.asin)).map((p) => { const l = taken.get(p.asin)!; return [l.bestFor.replace(/\.$/, ""), factsById[p.asin].short, cap(l.reason)]; }) } },
  ];
  if (cmpFields.length)
    howToChoose.push({ subheading: "Key specs side by side", intro: sec.specIntro, table: { headers: [schema.plural.replace(/s$/, ""), ...cmpFields.map((c) => c.label)], rows: facts.map((f) => [f.short, ...cmpFields.map((c) => (f.specs[c.key] !== undefined ? c.fmt(f.specs[c.key]!) : "Not listed"))]) } });
  if (groups.size > 1)
    howToChoose.push({ subheading: "By price at the time of writing", intro: sec.priceIntro, table: { headers: ["Price tier", schema.plural], rows: [...groups.entries()].map(([k, v]) => [k, v.join(", ")]) } });

  return dedupeDoubled({
    slug: cfg.slug, type: "best-guide", status: "published", category: cfg.category,
    seoTitle: cfg.seoTitle, title: cfg.title, breadcrumbLabel: cfg.breadcrumbLabel, mainKeyword: cfg.mainKeyword,
    dek: cfg.dek, metaDescription: cfg.metaDescription, teaser: cfg.teaser, updatedAt: cfg.updatedAt,
    readTime: `${9 + Math.round(products.length / 2)} min read`,
    introParagraphs: gm ? [cfg.intro[0], gm.intro, ...cfg.intro.slice(1)] : cfg.intro, products,
    ...(gm ? { sources: [{ id: "game-requirements", label: gm.source.label, url: gm.source.url, kind: "manufacturer" as const, accessed: "2026-10-03" }] } : {}),
    howWeEvaluated: evaluated,
    buyingCriteria: crit.map((c) => ({ criterion: c.title, explanation: c.body })),
    howToChoose,
    faq: [...(gm?.faq ? [gm.faq] : []), ...faq].slice(0, 6).map((q) => ({ q: q.q, a: q.a })),
    bottomLine: cfg.bottomLine,
    related: cfg.related,
  });
}

/**
 * Removes accidental doubled words that templates produce when a field value repeats its noun
 * ("mouse mouse", "mute mute", "Premium Pick pick"). Applied to every text field of a composed guide.
 */
export function dedupeDoubled<T>(v: T): T {
  if (typeof v === "string") return v.replace(/\b([A-Za-z]{3,})(\s+)\1\b/gi, (m, w: string) => (/^(that|had|very|bye)$/i.test(w) ? m : w)).replace(/\b(auto|manual|fixed)(focus|-focus) focus\b/gi, "$1$2") as T;
  if (Array.isArray(v)) return v.map(dedupeDoubled) as T;
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === "asin" || k === "id" || k === "slug" || /url$/i.test(k) ? x : dedupeDoubled(x)])) as T;
  return v;
}
