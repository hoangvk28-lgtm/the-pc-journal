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
  /** Guide-specific FAQ and buying criteria, shown before the shared category pool so guides in one category differ. */
  extraFaq?: { q: string; a: string }[];
  extraCriteria?: { title: string; body: string }[];
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
    `It also brings ${phrase(x)}.`,
    `Worth noting too: ${phrase(x)}.`,
    `Another plus is ${phrase(x)}.`,
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
  if ((m = con.match(/^No published (.+)$/i))) return pick([`Skip it if you need to know its ${m[1]} before buying; the maker doesn't publish one.`, `The maker gives no ${m[1]}, so look elsewhere if that figure decides it for you.`, `Pass if a published ${m[1]} matters; this one has none.`, `Its ${m[1]} is not published, which rules it out if you need that number.`], seed + "skipn");
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
    taken.set(order[0].asin, { badge: field.rule.label, reason: `the ${field.superlative?.[0] ?? "best"} ${field.noun ?? lc(field.label)} here (${field.fmt(top!)})`, bestFor: pick(field.rule.bestFor, cfg.slug + field.key) });
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

  const prio = cfg.priorityCriteria ?? [];
  const xc = cfg.extraCriteria ?? [], xf = cfg.extraFaq ?? [];
  const crit = [...xc.map((c, i) => ({ id: `x${i}`, title: c.title, body: c.body })), ...[...prio.map((id) => schema.criteria.find((c) => c.id === id)!).filter(Boolean), ...shuffle(schema.criteria.filter((c) => !prio.includes(c.id)), cfg.slug)].slice(0, xc.length ? 4 : 6)].slice(0, 6);
  const faq = [...xf, ...shuffle(schema.faq, cfg.slug + "faq").slice(0, xf.length ? Math.max(3, 5 - xf.length) : 6)].slice(0, 6);
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
    howToChoose.push({ subheading: "Key specs side by side", intro: "Figures as each maker states them.", table: { headers: [schema.plural.replace(/s$/, ""), ...cmpFields.map((c) => c.label)], rows: facts.map((f) => [f.short, ...cmpFields.map((c) => (f.specs[c.key] !== undefined ? c.fmt(f.specs[c.key]!) : "Not listed"))]) } });
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
