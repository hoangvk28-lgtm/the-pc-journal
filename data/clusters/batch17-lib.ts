import type { CategorySchema, Fact, FieldDef } from "@/lib/pc-compose/generic";
import type { PcCategory } from "@/lib/pc-content/types";
import { batch2 } from "./batch2";
import { batch3 } from "./batch3";
import { batch4 } from "./batch4";
import { batch5 } from "./batch5";
import { batch6 } from "./batch6";
import { batch7 } from "./batch7";
import { batch8 } from "./batch8";
import { batch9 } from "./batch9";
import { batch10 } from "./batch10";
import { batch10b } from "./batch10b";
import { batch10c } from "./batch10c";
import { batch11 } from "./batch11";
import { batch11b } from "./batch11b";
import { batch11c } from "./batch11c";
import { batch12 } from "./batch12";
import { batch12b } from "./batch12b";
import { batch12c } from "./batch12c";
import { batch12d } from "./batch12d";
import { batch12e } from "./batch12e";
import { batch13a } from "./batch13a";
import { batch13a2 } from "./batch13a2";
import { batch13a3 } from "./batch13a3";
import { batch13a4 } from "./batch13a4";
import { batch13a5 } from "./batch13a5";
import { batch13b } from "./batch13b";
import { batch13b2 } from "./batch13b2";
import { batch13b3 } from "./batch13b3";
import { batch13c } from "./batch13c";
import { batch13c2 } from "./batch13c2";
import { batch13c3 } from "./batch13c3";
import { batch13c4 } from "./batch13c4";
import { batch13d } from "./batch13d";
import { batch13d2 } from "./batch13d2";
import { batch13d3 } from "./batch13d3";
import { batch13e } from "./batch13e";
import { batch13e2 } from "./batch13e2";
import { batch13e3 } from "./batch13e3";
import { batch13e4 } from "./batch13e4";
import { batch14 } from "./batch14";
import { batch15a } from "./batch15a";
import { batch15b } from "./batch15b";
import { batch15c } from "./batch15c";
import { batch15d } from "./batch15d";
import { batch15e } from "./batch15e";
import { batch16a } from "./batch16a";
import { L, updatedAt, type Entry } from "./batch12-lib";

/**
 * Batch 17 pipeline: one article per guru keyword, built from reviewed fact sheets.
 * Picks are resolved offline by scripts/pcj-plan-batch.ts (keyword filter, sort, overlap limit against the
 * whole registry) and written into the batch file as explicit ASIN lists, so each article here is only its
 * keyword, picks and two sentences of keyword-specific copy. Takes reuse the editorial take written for the
 * same product in any earlier batch; products that never had one get a take built from their listed facts.
 * Labels: schema rule labels first (in the composer), then the fact-based labels below; never "Best Overall".
 */
const TAKES: Record<string, string> = {};
for (const b of [batch2, batch3, batch4, batch5, batch6, batch7, batch8, batch9, batch10, batch10b, batch10c, batch11, batch11b, batch11c,
  batch12, batch12b, batch12c, batch12d, batch12e, batch13a, batch13a2, batch13a3, batch13a4, batch13a5, batch13b, batch13b2, batch13b3,
  batch13c, batch13c2, batch13c3, batch13c4, batch13d, batch13d2, batch13d3, batch13e, batch13e2, batch13e3, batch13e4, batch14,
  batch15a, batch15b, batch15c, batch15d, batch15e, batch16a].flat() as Entry[]) {
  for (const [k, v] of Object.entries(b.cfg.takes ?? {})) if (v && !TAKES[k]) TAKES[k] = v as string;
}

export type Group = { schema: CategorySchema; facts: Record<string, Fact>; category: PcCategory; noun: string; related: string[] };

const hash = (t: string) => [...t].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const lc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const SMALL = new Set(["for", "with", "and", "of", "to", "in", "on", "the", "a", "or"]);
const PROPER: Record<string, string> = { macbook: "MacBook", pc: "PC", pcs: "PCs", ps5: "PS5", ssd: "SSD", ssds: "SSDs", cpu: "CPU", cpus: "CPUs", gpu: "GPU", gpus: "GPUs", amd: "AMD", oled: "OLED", ddr4: "DDR4", ddr5: "DDR5", am4: "AM4", am5: "AM5", usb: "USB", os: "OS", nvidia: "NVIDIA", rgb: "RGB", led: "LED", "9800x3d": "9800X3D", "16gb": "16GB", "120hz": "120Hz", "144hz": "144Hz", xbox: "Xbox", logitech: "Logitech", mac: "Mac", mini: "Mini" };
const title = (s: string) => s.split(" ").map((w, i) => PROPER[w.toLowerCase()] ?? (i > 0 && SMALL.has(w.toLowerCase()) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1))).join(" ").replace("Mac Mini", "Mac mini");
const price = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const val = (f: Fact, k: string) => f.specs[k];
const has = (v: unknown) => v !== undefined && v !== null && v !== "" && v !== false && !/^(none|not stated)/i.test(String(v));
const num = (v: unknown) => (typeof v === "number" ? v : undefined);
const joinList = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

function specPhrase(field: FieldDef, v: unknown): string {
  const s = field.fmt(v as never);
  return typeof v === "number" ? `${s} ${lc(field.noun ?? field.label)}`.replace(/\s+/g, " ") : `${lc(field.label)}: ${s}`;
}

/** "Flip-up" + "Armrests" -> "flip-up armrests"; "USB-C" + "Connection" -> "a USB-C connection". */
function featureOf(value: string, label: string): string {
  const v = lc(value.trim()), l = label.toLowerCase();
  const head = l.split(/\s+/).pop()!.replace(/s$/, "");
  const phrase = v.toLowerCase().includes(head) ? v : `${v} ${l}`;
  return /s$/.test(phrase) || /^(a|an|the)\s/.test(phrase) ? phrase : `${/^(?:[aeio]|8|11\b|18\b)/i.test(phrase) ? "an" : "a"} ${phrase}`;
}

/** A take built only from listed facts, for products no earlier batch wrote one for. */
export function autoTake(f: Fact, schema: CategorySchema): string {
  // Lead with what the product gives the reader (its highlights), then the numbers that back it up.
  // Descriptive "field: value" pairs are left to the spec table; they read like a form in prose.
  const nums = schema.fields.filter((x) => typeof val(f, x.key) === "number").slice(0, 2).map((x) => numClaim(x, val(f, x.key) as number));
  const [n0, n1] = f.notes;
  const v = hash(f.asin) % 3;
  const first = n0
    ? v === 0 ? `The ${f.short} stands out for ${n0}${n1 ? `, and it adds ${n1}` : ""}.`
      : v === 1 ? `What the ${f.short} brings to the table is ${n0}${n1 ? `, plus ${n1}` : ""}.`
      : `The ${f.short} is built around ${n0}${n1 ? `, with ${n1} on top` : ""}.`
    : nums.length ? `The ${f.short} ${joinList(nums)}.` : `The ${f.short} is a straightforward ${f.name}.`;
  if (!n0 || !nums.length) return first;
  return `${first} ${v === 2 ? `On the spec sheet, it ${joinList(nums)}` : `It also ${joinList(nums)}`}.`;
}

/** Reviewer phrasing for one numeric spec: "reclines to 135°", "is rated for 400 lbs", "offers an 8,000Hz polling rate". */
function numClaim(field: FieldDef, v: number): string {
  const s = field.fmt(v as never);
  const k = `${field.key} ${field.noun ?? ""} ${field.label}`.toLowerCase();
  if (/capacity|load/.test(k)) return `is rated for ${s}`;
  if (/weight/.test(k)) return `weighs ${s}`;
  if (/battery/.test(k)) return `runs for ${/up to/.test(s) ? s : `up to ${s}`}`;
  if (/recline/.test(k)) return `reclines to ${s}`;
  if (/pack/.test(k)) return `comes as ${s}`;
  const noun = lc(field.noun ?? field.label);
  return `offers ${/^(?:[aeio]|8|11\b|18\b)/i.test(s) ? "an" : "a"} ${s} ${noun}`;
}

function labelsFor(fs: Fact[], schema: CategorySchema, noun: string): Record<string, ReturnType<typeof L>> {
  const out: Record<string, ReturnType<typeof L>> = {};
  const used = new Set<string>();
  const give = (f: Fact, badge: string, reason: string, bestFor: string) => { if (out[f.asin] || used.has(badge) || badge.length > 32) return false; out[f.asin] = L(badge, reason, bestFor); used.add(badge); return true; };
  // Rule fields are labelled by the composer; skip their winners here.
  const ruleWinners = new Set<string>();
  for (const field of schema.fields.filter((x) => x.rule && x.better)) {
    const vals = fs.map((f) => num(val(f, field.key))).filter((x): x is number => x !== undefined);
    if (vals.length < 2) continue;
    const best = field.better === "higher" ? Math.max(...vals) : Math.min(...vals);
    const winners = fs.filter((f) => num(val(f, field.key)) === best);
    if (winners.length === 1) ruleWinners.add(winners[0].asin);
  }
  // 1. Strict winner on a ranked (non-rule) field.
  for (const field of schema.fields.filter((x) => !x.rule && x.better && x.superlative)) {
    const vals = fs.map((f) => num(val(f, field.key))).filter((x): x is number => x !== undefined);
    if (vals.length < 3) continue;
    const best = field.better === "higher" ? Math.max(...vals) : Math.min(...vals);
    const winners = fs.filter((f) => num(val(f, field.key)) === best);
    if (winners.length !== 1 || ruleWinners.has(winners[0].asin)) continue;
    const sup = field.superlative![0];
    give(winners[0], `${cap(sup)} ${title(field.noun ?? field.label)}`, `the ${sup} ${field.noun ?? lc(field.label)} here (${field.fmt(best as never)})`, `Buyers who put ${field.noun ?? lc(field.label)} first.`);
  }
  // 2. Lowest listed price.
  const byPrice = [...fs].filter((f) => price(f) < Infinity).sort((a, b) => price(a) - price(b));
  if (byPrice.length >= 2 && price(byPrice[0]) < price(byPrice[1]) && !ruleWinners.has(byPrice[0].asin))
    give(byPrice[0], "Lowest Price Here", `the lowest price among these ${noun} at the time of writing`, "Keeping the budget tight.");
  // 3. Highest listed price: the premium end of the set.
  const top = byPrice[byPrice.length - 1];
  if (byPrice.length >= 3 && price(top) > price(byPrice[byPrice.length - 2]) && !ruleWinners.has(top.asin))
    give(top, "Premium Pick", `the highest-priced pick here at the time of writing${top.notes[0] ? `, with ${top.notes[0]}` : ""}`, "Buyers who want the most complete package.");
  // 4. A short, clean descriptive value no other pick shares ("Flip-up Armrests", "Open-back Design").
  for (const f of fs) {
    if (out[f.asin] || ruleWinners.has(f.asin)) continue;
    for (const field of schema.fields.filter((x) => !x.better)) {
      const v = val(f, field.key);
      if (!has(v)) continue;
      const s = String(field.fmt(v as never));
      if (s.length > 16 || /[,()+/;]/.test(s) || /^(yes|no)$/i.test(s) || fs.filter((o) => String(val(o, field.key) ?? "") === String(v)).length !== 1) continue;
      const badge = `${title(s)} ${title(field.label)}`.replace(/\b(\w+) \1\b/gi, "$1");
      if (give(f, badge, `${featureOf(s, field.label)}`, `Buyers who want ${featureOf(s, field.label)}.`)) break;
    }
  }
  // 5. Remaining picks: a neutral badge whose reason is the pick's first listed highlight.
  const spare = ["Also Consider", "Strong Alternative", "Worth a Look", "Solid Runner-Up"];
  for (const f of fs) {
    if (out[f.asin] || ruleWinners.has(f.asin) || !f.notes[0]) continue;
    for (const b of spare) if (give(f, b, f.notes[0], `Buyers who want ${f.notes[0].replace(/^(a|an|the) /i, "")}.`)) break;
  }
  return out;
}

export type Spec = {
  slug: string; kw: string; asins: string[];
  /** 1-2 sentences written for this keyword. */
  lead: string; close: string;
  seo?: string; h1?: string; crumb?: string; teaser?: string; rel?: string[]; prio?: string[];
};

const METHOD = [
  "We compared the specifications each Amazon listing states and did not test these ourselves; where a listing leaves a detail out, we say so rather than guess.",
  "Our picks come from researching each listing and the maker's stated specifications, not from hands-on testing, and gaps in a listing are noted rather than filled in.",
  "This roundup is research-based: every figure comes from the product listing, and anything a listing does not state is left out rather than assumed.",
];
const NUM = ["zero", "one", "two", "Three", "Four", "Five", "Six", "Seven"];

export const make = (g: Group) => (s: Spec): Entry => {
  const fs = s.asins.map((a) => { const f = g.facts[a]; if (!f) throw new Error(`batch17 ${s.slug}: no fact sheet for ${a}`); return f; });
  const labels = labelsFor(fs, g.schema, g.noun);
  const seoTitle = s.seo ?? `Best ${title(s.kw)}`;
  if (seoTitle.length > 43) throw new Error(`batch17 ${s.slug}: seoTitle ${seoTitle.length} chars`);
  const N = NUM[fs.length];
  const ranked = g.schema.fields.filter((x) => fs.filter((f) => has(val(f, x.key))).length >= 2).map((x) => lc(x.label));
  const on = joinList(ranked.slice(0, 4));
  const tails = [
    " from their listings, with the trade-offs of each named.",
    ", using only what each maker states, with the trade-offs of each pick named.",
    ", using only specifications and noting where a listing leaves details out.",
    ", using only specifications, with each pick's trade-offs and the pick that covers them named.",
    " from their listings.",
  ];
  const metas = [4, 3, 2, 5].flatMap((k) => tails.map((tail) => `${N} ${s.kw} picks compared on ${joinList(ranked.slice(0, k))}${tail}`));
  const metaDescription = metas.find((m) => m.length >= 120 && m.length <= 160);
  if (!metaDescription) throw new Error(`batch17 ${s.slug}: no meta description in 120-160 chars`);
  const dek = `${N} ${g.noun} for ${s.kw.replace(/^best /, "")}, compared on ${joinList(ranked.slice(0, 3))} as each listing states them.`;
  const lines = fs.slice(1).map((f) => (labels[f.asin] ? `the ${f.short} for ${labels[f.asin].reason}` : undefined)).filter(Boolean) as string[];
  const bottom = [`Our first pick is the ${fs[0].short}${labels[fs[0].asin] ? `, chosen for ${labels[fs[0].asin].reason}` : ""}.${lines.length ? ` Look at ${joinList(lines.slice(0, 3))} if those matter more to you.` : ""}`, s.close];
  const takes = Object.fromEntries(fs.map((f) => [f.asin, TAKES[f.asin] ?? autoTake(f, g.schema)]));
  const prio = s.prio ?? g.schema.criteria.slice(0, 6).filter((_, i) => (hash(s.slug) + i) % 2 === 0).slice(0, 3).map((c) => c.id);
  return {
    schema: g.schema, facts: g.facts,
    cfg: {
      slug: s.slug, category: g.category, updatedAt, seoTitle, title: s.h1 ?? `The Best ${title(s.kw)}`, breadcrumbLabel: s.crumb ?? seoTitle,
      mainKeyword: s.kw, dek, metaDescription, teaser: s.teaser ?? s.lead.split(/(?<=\.)\s/)[0], asins: s.asins, labels, takes,
      intro: [s.lead, METHOD[hash(s.slug) % METHOD.length]], bottomLine: bottom, priorityCriteria: prio,
      related: (s.rel ?? g.related).filter((x) => x !== s.slug).slice(0, 3),
    },
  };
};
