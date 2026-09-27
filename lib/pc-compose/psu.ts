import pool from "@/data/pcj-pool/psu.json";
import { psuFact, type EffTier, type PsuFact } from "@/data/pc-facts/psu";
import type { BestGuide, BestProduct, HowToChooseSection, PcCategory } from "@/lib/pc-content/types";
import { psuCriteria, psuEvaluated, psuFaq, type PsuTag } from "./psu-pool";
import { psuDescriptions } from "@/data/clusters/psu-descriptions";

/** Picks that fell back to the template description (reported by the validator). */
export const templatedDescriptions: string[] = [];
import { cap, hash, listJoin, pick, shuffle } from "./seed";
import { buildWhy, type CategorySchema, type Fact } from "./generic";

const EFF_NAMES = ["", "Bronze", "Gold", "Platinum", "Titanium"];
/** Field definitions for the shared four-layer "Why we like it" builder. */
const psuWhySchema: CategorySchema = {
  id: "psu", plural: "Power supplies",
  fields: [
    { key: "eff", label: "Efficiency", noun: "efficiency tier", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${EFF_NAMES[Number(v)]}` },
    { key: "warranty", label: "Warranty", noun: "warranty", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v}-year` },
    { key: "depth", label: "Length", noun: "length", better: "lower", superlative: ["shortest", "longest"], fmt: (v) => `${v}mm` },
    { key: "pcie", label: "PCIe 6+2", noun: "PCIe 6+2 connector count", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v}` },
    { key: "fan", label: "Fan", noun: "fan size", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}mm` },
  ],
  compat: (f, facts) => {
    const s: string[] = [];
    const k = f.asin + facts.map((x) => x.asin).join("");
    const hp = Number(f.specs.hpwr ?? 0), pc = Number(f.specs.pcie ?? 0);
    const cab = hp === 2 ? "two native 12V-2x6 cables" : "a native 12V-2x6 cable";
    if (hp && pc) s.push(pick([
      `For the graphics card, it has ${cab} and ${pc} PCIe 6+2 connectors, so count the sockets on your exact card before buying.`,
      `GPU power comes from ${cab} plus ${pc} PCIe 6+2 leads; match those against the sockets on your card.`,
      `A 16-pin card uses its ${cab.replace(/^(a|two) native /, "")}, and an 8-pin card can draw on ${pc} PCIe 6+2 connectors.`,
      `Count your card's power sockets first: this unit supplies ${cab} and ${pc} PCIe 6+2 connectors.`,
    ], f.name + k));
    if (f.specs.form === "SFX" || f.specs.form === "SFX-L") s.push(`Confirm your case accepts ${f.specs.form}; many small cases take SFX but not the longer SFX-L.`);
    else if (f.specs.depth !== undefined) s.push(`Compare its ${f.specs.depth}mm length with your case's maximum PSU length, leaving room for the modular plugs.`);
    if (f.specs.atx === undefined) s.push(pick(["Confirm the exact revision supports ATX 3.1, since the product page is not consistent about it.", "The product page mixes ATX 3.0 and 3.1 wording, so check the revision printed on the unit's label or spec page.", "Check which ATX revision your unit ships as; the product page is inconsistent."], k + "a"));
    return s;
  },
  criteria: [], faq: [], evaluated: [],
};
const toWhyFact = (f: PsuFact): Fact => ({ asin: f.asin, name: f.name, short: shortName(f), notes: f.notes,
  specs: { eff: effOf(f) || undefined, warranty: f.warrantyYears, depth: f.depthMm, pcie: f.pcie8, fan: f.fanMm, hpwr: f.hpwr, form: f.form, atx: f.atx } });

/**
 * Composes a Best X PSU guide from fact sheets (data/pc-facts/psu.ts) and the shared pool.
 * Deterministic per slug. Labels are only assigned when a product strictly leads the
 * others in this article on a listed fact; nothing is invented for missing fields.
 */

type PoolItem = { title?: string; img?: string; price?: string };
const poolData = pool as Record<string, PoolItem>;

export interface PsuArticleConfig {
  slug: string;
  seoTitle: string;
  title: string;
  breadcrumbLabel: string;
  mainKeyword: string;
  dek: string;
  metaDescription: string;
  teaser: string;
  tags: PsuTag[];
  asins: string[];
  /** Hand-written, article-specific: the reasoning a template cannot supply. */
  intro: string[];
  bottomLine: string[];
  /**
   * Editorial labels for picks that win no rule outright. The reason must be a fact from the
   * fact sheet; these are the article-specific judgments a rule engine cannot make.
   */
  labels?: Record<string, { badge: string; reason: string; bestFor: string }>;
  /** Criteria ids that must appear first. */
  priorityCriteria?: string[];
  related: string[];
  category?: PcCategory;
  updatedAt: string;
}

const EFF_RANK: Record<EffTier, number> = { Titanium: 4, Platinum: 3, Gold: 2, Bronze: 1 };
const LAMBDA_RANK = { "A++": 4, "A+": 3, A: 2, "A-": 1 } as const;
const effOf = (f: PsuFact) => Math.max(f.cybenetics ? EFF_RANK[f.cybenetics] : 0, f.eff80 ? EFF_RANK[f.eff80] : 0);
const effLabel = (f: PsuFact) =>
  f.cybenetics && f.eff80 && f.cybenetics !== f.eff80 ? `80 Plus ${f.eff80}, Cybenetics ${f.cybenetics}`
    : f.cybenetics ? `Cybenetics ${f.cybenetics}` : f.eff80 ? `80 Plus ${f.eff80}` : "";
const priceNum = (asin: string) => Number((poolData[asin]?.price ?? "").replace(/[^0-9.]/g, "")) || undefined;
const shortName = (f: PsuFact) => f.name.replace(/\s*\((?:ATX 3\.1|2024|2025)[^)]*\)/g, "").trim();

interface Rule {
  label: string;
  /** Higher = better; undefined = not applicable. */
  score: (f: PsuFact, asin: string) => number | undefined;
  reason: (f: PsuFact, all: PsuFact[]) => string;
  /** Phrasing variants; one is chosen per article and product by seed. */
  verdict: ((f: PsuFact) => string)[];
  bestFor: string[];
}

const rules: Rule[] = [
  { label: "Most Efficient", score: (f) => effOf(f) || undefined,
    reason: (f) => `the highest efficiency certification here (${effLabel(f)})`,
    verdict: [(f) => `its ${effLabel(f)} rating means less power lost as heat under sustained load`, (f) => `no other unit here offers a higher efficiency tier than its ${effLabel(f)}`, (f) => `it tops this group on efficiency, with ${effLabel(f)} listed`],
    bestFor: ["Machines that run heavy loads for hours, where efficiency and heat matter.", "Builds under long, sustained load where wasted heat adds up.", "Buyers who weigh running cost and heat over price."] },
  { label: "Quietest Rated", score: (f) => (f.lambda ? LAMBDA_RANK[f.lambda] : undefined),
    reason: (f) => `the best listed Cybenetics noise class in this group (LAMBDA ${f.lambda})`,
    verdict: [(f) => `it carries a Cybenetics LAMBDA ${f.lambda} noise rating, the best listed here`, (f) => `its LAMBDA ${f.lambda} noise class beats every other rating in this group`, (f) => `on listed noise ratings it leads, at LAMBDA ${f.lambda}`],
    bestFor: ["Quiet builds where the power supply should never be the loudest part.", "Silent-PC builds and bedrooms or studios.", "Anyone who notices fan noise during long sessions."] },
  { label: "Longest Warranty", score: (f) => f.warrantyYears,
    reason: (f) => `the longest warranty in this comparison (${f.warrantyYears} years)`,
    verdict: [(f) => `it is backed by a ${f.warrantyYears}-year warranty, the longest here`, (f) => `no other pick here offers a warranty as long as its ${f.warrantyYears} years`, (f) => `its ${f.warrantyYears}-year warranty outlasts every other term in this group`],
    bestFor: ["Buyers who keep a power supply through several upgrades.", "Builders who want the longest cover for the money.", "A PC you expect to keep running for most of a decade."] },
  { label: "Most Compact", score: (f) => (f.depthMm ? -f.depthMm : undefined),
    reason: (f) => `the shortest stated length here (${f.depthMm}mm)`,
    verdict: [(f) => `at ${f.depthMm}mm it is the shortest unit here`, (f) => `its ${f.depthMm}mm length is the shortest stated in this group`, (f) => `it leaves the most room behind the PSU, at just ${f.depthMm}mm long`],
    bestFor: ["Cases with a tight PSU bay or a fan mounted behind the power supply.", "Compact mid-towers where every millimetre behind the PSU counts.", "Builds with a bottom fan or drive cage near the PSU."] },
  { label: "Most GPU Connectors", score: (f) => f.pcie8,
    reason: (f) => `the most PCIe 6+2 connectors here (${f.pcie8})`,
    verdict: [(f) => `it has ${f.pcie8} PCIe 6+2 connectors, more than any other pick here`, (f) => `with ${f.pcie8} PCIe 6+2 connectors, it covers the widest range of graphics cards here`, (f) => `its ${f.pcie8} listed PCIe 6+2 connectors lead this group`],
    bestFor: ["Graphics cards that still use several 8-pin connectors.", "Owners of older cards with three or more 8-pin sockets.", "Builds that may swap between 8-pin and 12V-2x6 cards."] },
  { label: "Best for Two 12V-2x6 Cards", score: (f) => (f.hpwr && f.hpwr >= 2 ? f.hpwr : undefined),
    reason: () => "two native 12V-2x6 cables",
    verdict: [() => "it ships with two native 12V-2x6 cables", () => "it is the only unit here with two native 12V-2x6 cables", () => "two native 12V-2x6 cables set it apart in this group"],
    bestFor: ["Workstations or builds with two cards that use 12V-2x6.", "Dual-GPU builds using current graphics cards.", "Workstations planning a second high-power card."] },
  { label: "Best Budget Pick", score: (_f, a) => { const p = priceNum(a); return p ? -p : undefined; },
    reason: () => "the lowest price in this group when we checked",
    verdict: [() => "it was the least expensive unit here when we checked", () => "it had the lowest price in this group when this guide was updated", () => "it undercut every other pick here on price when we checked"],
    bestFor: ["Budget builds that still need the core features.", "Builders who would rather put the savings into the graphics card.", "A first build on a tight budget."] },
  { label: "Quietest at Idle", score: (f) => (f.zeroRpm ? 1 : undefined),
    reason: () => "the only fan here listed to stop at low load",
    verdict: [() => "its fan can stop completely at light load", () => "it is the only unit here listed with a fan that switches off at low load", () => "its zero-RPM mode keeps it silent during light work"],
    bestFor: ["PCs that spend most of their time on light work.", "Machines that idle for long periods between heavy tasks.", "Quiet desks where idle noise matters."] },
  { label: "Largest Fan", score: (f) => f.fanMm,
    reason: (f) => `the largest fan here (${f.fanMm}mm)`,
    verdict: [(f) => `its ${f.fanMm}mm fan is the largest here`, (f) => `no other unit in this group offers a fan bigger than its ${f.fanMm}mm`, (f) => `it uses the biggest fan listed here, at ${f.fanMm}mm`],
    bestFor: ["Buyers who want a large, slow-spinning fan.", "Builds where a larger, slower fan helps keep noise down.", "Warm cases where airflow through the PSU matters."] },
];

/** A rule applies only if exactly one product has the top score and at least two products have a value. */
function strictWinner(rule: Rule, facts: PsuFact[], asins: string[], taken: Set<string>): string | undefined {
  const scored = facts.map((f, i) => ({ asin: asins[i], s: rule.score(f, asins[i]) })).filter((x) => x.s !== undefined) as { asin: string; s: number }[];
  if (scored.length < 2 && !(rule.label === "Quietest at Idle" || rule.label === "Best for Two 12V-2x6 Cards")) return undefined;
  if (scored.length === 0) return undefined;
  const top = Math.max(...scored.map((x) => x.s));
  const winners = scored.filter((x) => x.s === top);
  if (winners.length !== 1 || taken.has(winners[0].asin)) return undefined;
  if ((rule.label === "Quietest at Idle" || rule.label === "Best for Two 12V-2x6 Cards") && scored.length !== 1) return undefined;
  return winners[0].asin;
}

const FALLBACKS = ["Well-Rounded Choice", "Solid Alternative", "Worth Considering", "Also Recommended", "Good Value Option"];

function strengths(f: PsuFact): string[] {
  const s: string[] = [];
  if (effOf(f) >= 3) s.push(`${effLabel(f)} efficiency`);
  else if (effLabel(f)) s.push(`${effLabel(f)} certified`);
  if (f.warrantyYears && f.warrantyYears >= 7) s.push(`${f.warrantyYears}-year warranty`);
  if (f.zeroRpm) s.push("Fan stops at low load");
  if (f.hpwr && f.hpwr >= 2) s.push("Two native 12V-2x6 cables");
  else if (f.hpwr) s.push("Native 12V-2x6 cable");
  if (f.pcie8 && f.pcie8 >= 3) s.push(`${f.pcie8} PCIe 6+2 connectors`);
  if (f.depthMm && f.depthMm <= 140) s.push(`Short ${f.depthMm}mm body`);
  if (f.bearing === "fluid dynamic" || f.bearing === "magnetic levitation" || f.bearing === "dual ball") s.push(`${cap(f.bearing)} bearing fan`);
  if (f.lambda) s.push(`Cybenetics LAMBDA ${f.lambda} noise rating`);
  if (f.modular === "full") s.push("Fully modular cables");
  for (const n of f.notes) s.push(cap(n.replace(/^an? /, "")));
  return [...new Set(s)];
}

function weaknesses(f: PsuFact, facts: PsuFact[]): string[] {
  const w: string[] = [];
  if (f.depthMm && f.depthMm >= 160) w.push(`${f.depthMm}mm long`);
  if (f.modular === "non") w.push("Non-modular cables");
  if (f.modular === "semi") w.push("Semi-modular, not fully modular");
  if (f.eff80 === "Bronze" && !f.cybenetics) w.push("Only 80 Plus Bronze");
  if (f.atx === "3.0") w.push("ATX 3.0, not 3.1");
  if (f.bearing === "rifle") w.push("Rifle-bearing fan");
  if (f.form === "SFX" && f.fanMm && f.fanMm <= 92) w.push("Small 92mm fan works harder under load");
  if (f.form === "SFX-L") w.push("SFX-L is longer than standard SFX");
  if (!f.warrantyYears) w.push("No published warranty term");
  if (!f.zeroRpm && facts.some((x) => x.zeroRpm)) w.push("No zero-RPM mode");
  if (!effLabel(f)) w.push("No published efficiency tier");
  if (!f.atx) w.push("ATX version not stated consistently");
  return w;
}

function specsOf(f: PsuFact): string[] {
  const s = [`Form factor: ${f.form}${f.atx ? `, ATX ${f.atx}` : ""}`];
  if (effLabel(f)) s.push(`Efficiency: ${effLabel(f)}`);
  if (f.depthMm) s.push(`Length: ${f.depthMm}mm`);
  if (f.fanMm) s.push(`Fan: ${f.fanMm}mm${f.bearing ? ` ${f.bearing} bearing` : ""}${f.zeroRpm ? ", zero-RPM mode" : ""}`);
  else if (f.zeroRpm) s.push("Fan: zero-RPM mode");
  if (f.hpwr || f.pcie8) s.push(`GPU cables: ${[f.hpwr ? `${f.hpwr}× 12V-2x6` : "", f.pcie8 ? `${f.pcie8}× PCIe 6+2` : ""].filter(Boolean).join(", ")}`);
  if (f.modular) s.push(`Cabling: ${f.modular === "full" ? "fully modular" : f.modular === "semi" ? "semi-modular" : "non-modular"}`);
  if (f.warrantyYears) s.push(`Warranty: ${f.warrantyYears} years`);
  return s;
}

/** One sentence comparing this pick with a neighbour on facts both listings state. */
function comparison(f: PsuFact, other: PsuFact, seed: string): string | undefined {
  const o = shortName(other);
  const v = (opts: string[]) => pick(opts, seed + opts.length + o);
  const cands: string[] = [];
  if (f.depthMm && other.depthMm && f.depthMm !== other.depthMm) {
    const d = Math.abs(f.depthMm - other.depthMm);
    cands.push(f.depthMm < other.depthMm
      ? v([`It is ${d}mm shorter than the ${o}`, `Next to the ${o}, it saves ${d}mm of length`, `It needs ${d}mm less space than the ${o}`])
      : v([`It is ${d}mm longer than the ${o}`, `It needs ${d}mm more space than the ${o}`, `Compared with the ${o}, it is ${d}mm longer`]));
  }
  if (f.warrantyYears && other.warrantyYears && f.warrantyYears !== other.warrantyYears)
    cands.push(v([`Its ${f.warrantyYears}-year warranty compares with ${other.warrantyYears} years on the ${o}`, `The ${o} carries ${other.warrantyYears} years of cover; this one carries ${f.warrantyYears}`, `Warranty is ${f.warrantyYears} years here versus ${other.warrantyYears} on the ${o}`]));
  if (effOf(f) && effOf(other) && effOf(f) !== effOf(other))
    cands.push(v([`It is rated ${effLabel(f)}, against ${effLabel(other)} for the ${o}`, `The ${o} is rated ${effLabel(other)}; this unit is rated ${effLabel(f)}`, `On efficiency it carries ${effLabel(f)}, where the ${o} carries ${effLabel(other)}`]));
  if (f.zeroRpm !== other.zeroRpm && (f.zeroRpm || other.zeroRpm))
    cands.push(f.zeroRpm
      ? v([`Unlike the ${o}, it has a fan that stops at low load`, `It adds a zero-RPM fan mode that the ${o} does not mention`, `Where the ${o} has no fan-stop mode, this one does`])
      : v([`The ${o} offers a zero-RPM fan mode; this one does not`, `It lacks the fan-stop mode for the ${o}`, `If idle silence matters, note that the ${o} offers a zero-RPM mode and this one does not`]));
  if ((f.pcie8 ?? 0) !== (other.pcie8 ?? 0) && f.pcie8 && other.pcie8)
    cands.push(v([`It has ${f.pcie8} PCIe 6+2 connectors to the ${o}'s ${other.pcie8}`, `The ${o} has ${other.pcie8} PCIe 6+2 connectors against ${f.pcie8} here`]));
  if (f.watts !== other.watts)
    cands.push(v([`At ${f.watts}W it sits ${f.watts > other.watts ? "above" : "below"} the ${watt(other)} ${o}`, `It offers ${f.watts}W, ${f.watts > other.watts ? "more" : "less"} than the ${watt(other)} ${o}`]));
  if (cands.length === 0) return undefined;
  return pick(cands, seed) + ".";
}
const watt = (f: PsuFact) => `${f.watts}W`;

const VERDICT_OPENERS = [
  (n: string, why: string) => `The ${n} is the pick here because ${why}.`,
  (n: string, why: string) => `Choose the ${n} if that matters to you: ${why}.`,
  (n: string, why: string) => `The ${n} earns its place because ${why}.`,
];
const NOTE_LEADS = [
  (n: string) => `It also comes with ${n}.`,
  (n: string) => `Other listed details include ${n}.`,
  (n: string) => `Beyond that, it comes with ${n}.`,
];
const CAVEAT_LEADS = [
  (c: string) => `The trade-off: ${c}.`,
  (c: string) => `Keep in mind: ${c}.`,
  (c: string) => `One thing to check: ${c}.`,
];

const WARRANTY_V = ["the maker doesn't publish a warranty term here, so confirm it before buying", "no warranty length is given; check the maker's site", "you will need to look up the warranty term, since the listing omits it"];
const ZERO_V = ["it has no mentioned zero-RPM fan mode", "the fan is not listed as stopping at low load", "there is no fan-stop mode in its listing, so expect some idle noise"];
function caveatSentence(w: string[], seed = ""): string {
  const map: Record<string, string> = {
    "No published warranty term": "WARRANTY",
    "No zero-RPM mode": "ZERO",
    "Non-modular cables": "every cable is fixed, which makes a small case harder to tidy",
    "Semi-modular, not fully modular": "the main cables are fixed rather than detachable",
    "Only 80 Plus Bronze": "Bronze efficiency means more heat under sustained load than Gold units",
    "ATX 3.0, not 3.1": "it is listed as ATX 3.0 rather than 3.1",
    "Rifle-bearing fan": "it uses a rifle-bearing fan rather than a fluid dynamic one",
    "Small 92mm fan works harder under load": "its 92mm fan has to spin faster under heavy load",
    "SFX-L is longer than standard SFX": "SFX-L is longer than SFX, so check your case supports it",
    "No published efficiency tier": "the maker doesn't state an efficiency certification",
    "ATX version not stated consistently": "the product page is inconsistent about ATX 3.0 or 3.1, so check the exact revision",
  };
  const first = w.find((x) => map[x]) ?? w.find((x) => /mm long/.test(x));
  if (!first) return "";
  const val = map[first];
  if (val === "WARRANTY") return pick(WARRANTY_V, seed + "w");
  if (val === "ZERO") return pick(ZERO_V, seed + "z");
  return val ?? `at ${first.replace(" long", "")} it needs a roomy PSU bay`;
}

const SKIP: Record<string, string> = {
  "No published warranty term": "You want a clearly stated warranty term before buying.",
  "No zero-RPM mode": "You want a fan that stops at idle; none is rated for this unit.",
  "Non-modular cables": "Your case is small and you need to remove unused cables.",
  "Semi-modular, not fully modular": "You want every cable detachable for a clean build.",
  "Only 80 Plus Bronze": "Heat and efficiency under long, heavy loads matter to you.",
  "ATX 3.0, not 3.1": "You want a current ATX 3.1 unit with the 12V-2x6 socket.",
  "Rifle-bearing fan": "You prefer a fluid dynamic bearing fan for long service life.",
  "Small 92mm fan works harder under load": "You want the quietest possible unit under sustained heavy load.",
  "SFX-L is longer than standard SFX": "Your case only accepts standard SFX units.",
  "No published efficiency tier": "You want a stated efficiency certification.",
  "ATX version not stated consistently": "You need confirmed ATX 3.1 support without checking the revision.",
};
function skipIf(w: string[]): string {
  const k = w.find((x) => SKIP[x]);
  if (k) return SKIP[k];
  const len = w.find((x) => /mm long/.test(x));
  return len ? `Your case cannot take a ${len.replace(" long", "")} power supply.` : "Look at the other picks if you need a feature not covered above.";
}

export function composePsuGuide(cfg: PsuArticleConfig): BestGuide {
  const facts = cfg.asins.map(psuFact);
  const taken = new Set<string>();
  const labelled: { asin: string; label: string; rule?: Rule }[] = [];
  for (const r of rules) {
    const w = strictWinner(r, facts, cfg.asins, taken);
    if (w) { taken.add(w); labelled.push({ asin: w, label: r.label, rule: r }); }
  }
  let fb = hash(cfg.slug) % FALLBACKS.length;
  for (const a of cfg.asins) {
    if (taken.has(a)) continue;
    const m = cfg.labels?.[a];
    if (m) labelled.push({ asin: a, label: m.badge, rule: { label: m.badge, score: () => undefined, reason: () => m.reason, verdict: [() => `it offers ${m.reason}`, () => `it stands out for ${m.reason}`, () => `of the picks here, it is the one with ${m.reason}`], bestFor: [m.bestFor] } });
    else labelled.push({ asin: a, label: FALLBACKS[fb++ % FALLBACKS.length] });
  }
  // Editorial rank follows the config order, not rule order.
  labelled.sort((x, y) => cfg.asins.indexOf(x.asin) - cfg.asins.indexOf(y.asin));

  const products: BestProduct[] = labelled.map(({ asin, label, rule }, i) => {
    const f = psuFact(asin);
    const seed = `${cfg.slug}:${asin}`;
    const neighbour = psuFact(labelled[i === 0 ? 1 : i - 1].asin);
    const why = rule ? pick(rule.verdict, seed + "v")(f) : `it combines ${listJoin(strengths(f).slice(0, 2).map((s) => s.toLowerCase()))}`;
    const verdict = pick(VERDICT_OPENERS, seed)(shortName(f), why);
    const cmp = comparison(f, neighbour, seed);
    const notes = f.notes.length ? pick(NOTE_LEADS, seed + "n")(listJoin(f.notes)) : "";
    const w = weaknesses(f, facts);
    const cav = caveatSentence(w, seed);
    const p2 = [cmp, notes].filter(Boolean).join(" ");
    const p3 = [cav ? pick(CAVEAT_LEADS, seed + "c")(cav) : "", `It suits ${rule ? pick(rule.bestFor, seed + "b").charAt(0).toLowerCase() + pick(rule.bestFor, seed + "b").slice(1) : `a ${f.watts}W ${f.form} build that needs ${strengths(f)[0]?.toLowerCase() ?? "a reliable unit"}.`}`].filter(Boolean).join(" ");
    const pros = strengths(f).slice(0, 4);
    const cons = w.slice(0, 3);
    return {
      id: asin.toLowerCase(),
      rank: i + 1,
      badge: label,
      name: f.name,
      asin,
      price: poolData[asin]?.price ?? "",
      imageUrl: poolData[asin]?.img ?? "",
      amazonUrl: `https://www.amazon.com/dp/${asin}`,
      summary: rule ? cap(rule.reason(f, facts)) + "." : `${cap(strengths(f)[0] ?? "A balanced option")}, among other listed strengths.`,
      description: psuDescriptions[cfg.slug]?.[asin] ? buildWhy(toWhyFact(f), facts.map(toWhyFact), psuWhySchema, seed, psuDescriptions[cfg.slug][asin].replace(/\n\n/g, " ")) : (templatedDescriptions.push(`${cfg.slug}:${asin}`), buildWhy(toWhyFact(f), facts.map(toWhyFact), psuWhySchema, seed, [verdict, p2, p3].filter(Boolean).join(" "))),
      bestFor: (rule ? pick(rule.bestFor, seed + "b") : undefined) ?? `A ${f.watts}W ${f.form} build that values ${strengths(f).slice(0, 2).map((s) => s.toLowerCase()).join(" and ")}.`,
      skipIf: skipIf(w),
      specs: specsOf(f),
      pros: pros.length >= 3 ? pros : [...pros, "ATX 3.x compatible", "Native GPU power support"].slice(0, 3),
      cons: cons.length >= 2 ? cons : [...cons, ...(f.lambda ? [] : ["No Cybenetics noise class"]), ...(f.depthMm ? [] : ["Length not published"]), "Premium price for the feature set"].slice(0, 2),
    };
  });

  const allowed = (tags: PsuTag[]) => tags.includes("all") || tags.some((t) => cfg.tags.includes(t));
  const variant = (id: string) => (hash(`${cfg.slug}:${id}`) % 2) as 0 | 1;
  const prio = cfg.priorityCriteria ?? [];
  const crit = [
    ...prio.map((id) => psuCriteria.find((c) => c.id === id)!).filter(Boolean),
    ...shuffle(psuCriteria.filter((c) => allowed(c.tags) && !prio.includes(c.id)), cfg.slug),
  ].slice(0, 6);
  const faq = shuffle(psuFaq.filter((q) => allowed(q.tags)), cfg.slug + "faq").slice(0, 6);
  const evaluated = shuffle(psuEvaluated, cfg.slug + "eval").slice(0, 4);

  const priceRows = (() => {
    const priced = products.map((p) => ({ name: shortName(psuFact(p.asin)), v: priceNum(p.asin) })).filter((x) => x.v) as { name: string; v: number }[];
    const bucket = (v: number) => (v < 70 ? "Under $70" : v < 100 ? "About $70 to $100" : v < 150 ? "About $100 to $150" : v < 250 ? "About $150 to $250" : "Over $250");
    const order = ["Under $70", "About $70 to $100", "About $100 to $150", "About $150 to $250", "Over $250"];
    const groups = new Map<string, string[]>();
    for (const p of priced.sort((a, b) => a.v - b.v)) groups.set(bucket(p.v), [...(groups.get(bucket(p.v)) ?? []), p.name]);
    return order.filter((o) => groups.has(o)).map((o) => [o, groups.get(o)!.join(", ")]);
  })();

  const howToChoose: HowToChooseSection[] = [
    { subheading: "By priority", table: { headers: ["Priority", "Consider", "Why"], rows: labelled.filter((l) => l.rule).map((l) => [pick(l.rule!.bestFor, `${cfg.slug}:${l.asin}b`).replace(/\.$/, ""), shortName(psuFact(l.asin)), cap(l.rule!.reason(psuFact(l.asin), facts))]) } },
  ];
  const gpuRows = products.map((p) => { const f = psuFact(p.asin); return [shortName(f), f.hpwr ? `${f.hpwr}` : "Not listed", f.pcie8 ? `${f.pcie8}` : "Not listed"]; });
  if (gpuRows.some((r) => r[1] !== "Not listed" || r[2] !== "Not listed"))
    howToChoose.push({ subheading: "By graphics card cables", intro: "Counts as stated in each listing; check your card's power sockets against them.", table: { headers: ["Power supply", "Native 12V-2x6", "PCIe 6+2"], rows: gpuRows } });
  if (priceRows.length > 1)
    howToChoose.push({ subheading: "By price at the time of writing", intro: "Prices change often; these tiers reflect Amazon prices when this guide was updated.", table: { headers: ["Price tier", "Power supplies"], rows: priceRows } });

  return {
    slug: cfg.slug,
    type: "best-guide",
    status: "published",
    category: cfg.category ?? "components",
    seoTitle: cfg.seoTitle,
    title: cfg.title,
    breadcrumbLabel: cfg.breadcrumbLabel,
    mainKeyword: cfg.mainKeyword,
    dek: cfg.dek,
    metaDescription: cfg.metaDescription,
    teaser: cfg.teaser,
    updatedAt: cfg.updatedAt,
    readTime: `${8 + Math.round(products.length / 2)} min read`,
    introParagraphs: cfg.intro,
    products,
    howWeEvaluated: evaluated.map((e) => ({ title: e.title, description: e.variants[variant(e.title)] })),
    buyingCriteria: crit.map((c) => ({ criterion: c.title[variant(c.id)], explanation: c.body[variant(c.id)] })),
    howToChoose,
    faq: faq.map((q) => { const [qq, aa] = q.qa[variant(q.id)]; return { q: qq, a: aa }; }),
    bottomLine: cfg.bottomLine,
    related: cfg.related,
  };
}
