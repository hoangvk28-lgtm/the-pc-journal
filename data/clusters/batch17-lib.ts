import type { CategorySchema, Fact, FieldDef } from "@/lib/pc-compose/generic";
import { TAKES20 } from "./batch20-takes";
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
const TAKES: Record<string, string> = { ...TAKES20 };
for (const b of [batch2, batch3, batch4, batch5, batch6, batch7, batch8, batch9, batch10, batch10b, batch10c, batch11, batch11b, batch11c,
  batch12, batch12b, batch12c, batch12d, batch12e, batch13a, batch13a2, batch13a3, batch13a4, batch13a5, batch13b, batch13b2, batch13b3,
  batch13c, batch13c2, batch13c3, batch13c4, batch13d, batch13d2, batch13d3, batch13e, batch13e2, batch13e3, batch13e4, batch14,
  batch15a, batch15b, batch15c, batch15d, batch15e, batch16a].flat() as Entry[]) {
  for (const [k, v] of Object.entries(b.cfg.takes ?? {})) if (v && !TAKES[k]) TAKES[k] = v as string;
}

export type Group = { schema: CategorySchema; facts: Record<string, Fact>; category: PcCategory; noun: string; related: string[] };

const hash = (t: string) => [...t].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const lc = (s: string) => (/^[A-Z][a-z]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const SMALL = new Set(["for", "with", "and", "of", "to", "in", "on", "the", "a", "or"]);
const PROPER: Record<string, string> = { macbook: "MacBook", pc: "PC", pcs: "PCs", ps5: "PS5", ssd: "SSD", ssds: "SSDs", cpu: "CPU", cpus: "CPUs", gpu: "GPU", gpus: "GPUs", amd: "AMD", oled: "OLED", ddr4: "DDR4", ddr5: "DDR5", am4: "AM4", am5: "AM5", usb: "USB", os: "OS", nvidia: "NVIDIA", rgb: "RGB", led: "LED", "9800x3d": "9800X3D", "16gb": "16GB", "120hz": "120Hz", "144hz": "144Hz", xbox: "Xbox", logitech: "Logitech", mac: "Mac", mini: "Mini", rtx: "RTX", tdp: "TDP", psu: "PSU", psus: "PSUs", vr: "VR", cad: "CAD", pcie: "PCIe", youtube: "YouTube", zoom: "Zoom", intel: "Intel", arc: "Arc", b580: "B580", ryzen: "Ryzen", baldurs: "Baldur's", ark: "ARK", i5: "i5", i9: "i9", "12gb": "12GB", "24gb": "24GB", "14600k": "14600K", "245k": "245K", "265k": "265K", "285k": "285K", "7600x": "7600X", "9600x": "9600X", "9700x": "9700X", "9900x3d": "9900X3D", "9950x3d": "9950X3D", "400lb": "400 lb", m2: "M.2" };
const KEEP = new Set(["Roblox", "Apex", "Legends", "League", "Cyberpunk", "Baldur's", "Gate", "VRChat", "Survival", "Ascended", "Core", "Ultra", "Ryzen", "Intel", "Arc", "Zoom", "YouTube", "Mac", "Windows", "Xbox"]);
const kwCase = (s: string) => s.split(" ").map((w) => PROPER[w.toLowerCase()] ?? w).join(" ");
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

/** Field labels that read badly after a value ("Autofocus Focus and Framing", "Wi-Fi 6E Wi-Fi", "White Colour"). */
const BADGE_SKIP = /focus|privacy|resolution|wi-?fi|type|form factor|motherboards|processor|chipset|colou?r|rating|sensor|connector|gpu|memory|hdr|seat height|fans included|warranty|extras|connection/i;
/** "Largest Largest Radiator Size" -> "Largest Radiator Size"; "Most M.2 Slot Count" -> "Most M.2 Slots". */
function supBadge(sup: string, noun: string) {
  let n = title(noun).replace(new RegExp(`^${sup} `, "i"), "");
  if (/^most$/i.test(sup) && / Count$/.test(n)) n = n.replace(/ Count$/, "s");
  return `${cap(sup)} ${n}`;
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
    give(winners[0], supBadge(sup, field.noun ?? field.label), `the ${sup} ${(field.noun ?? lc(field.label)).replace(new RegExp(`^${sup} `, "i"), "")} here (${field.fmt(best as never)})`, `Buyers who put ${field.noun ?? lc(field.label)} first.`);
  }
  // 2. Lowest listed price.
  const byPrice = [...fs].filter((f) => price(f) < Infinity).sort((a, b) => price(a) - price(b));
  if (byPrice.length >= 2 && price(byPrice[0]) < price(byPrice[1]) && !ruleWinners.has(byPrice[0].asin))
    { const lo = byPrice[0], nx = byPrice[1], k = hash(lo.asin + noun), note = lo.notes[0]?.replace(/^(a|an|the) /i, "");
    give(lo, "Lowest Price Here", [`the lowest price among these ${noun} at the time of writing`, `a lower price than the ${nx.short} and the rest when we checked`, `the cheapest way into this group, below the ${nx.short}`, `undercutting the ${nx.short} on price when we checked`, `the lowest price of the group at our last check`][k % 5], [note ? `Getting ${note} for the least money.` : "Keeping the budget tight.", "Spending as little as possible.", "Buyers who would rather put the savings elsewhere in the build.", "Keeping the budget tight."][k % 4]); }
  // 3. Highest listed price: the premium end of the set.
  const top = byPrice[byPrice.length - 1];
  if (byPrice.length >= 3 && price(top) > price(byPrice[byPrice.length - 2]) && !ruleWinners.has(top.asin))
    { const k = hash(top.asin + noun), note = top.notes[0];
    give(top, "Premium Pick", [`the highest-priced pick here at the time of writing${note ? `, with ${note}` : ""}`, `the top of this price range${note ? `, adding ${note}` : ""}`, `${note ? `${note} at ` : ""}the highest price in the group`][k % 3], ["Buyers who want the most complete package.", "Spending more for the fullest feature set.", "Buyers for whom price is not the deciding factor."][k % 3]); }
  // 4. A short, clean descriptive value no other pick shares ("Flip-up Armrests", "Open-back Design").
  for (const f of fs) {
    if (out[f.asin] || ruleWinners.has(f.asin)) continue;
    for (const field of schema.fields.filter((x) => !x.better)) {
      const v = val(f, field.key);
      if (!has(v)) continue;
      const s = String(field.fmt(v as never));
      if (s.length > 16 || /[,()+/;\d]/.test(s) || /^(yes|no)$/i.test(s) || BADGE_SKIP.test(field.label) || fs.filter((o) => String(val(o, field.key) ?? "") === String(v)).length !== 1) continue;
      const badge = (s.toLowerCase().includes(field.label.toLowerCase()) ? title(s) : `${title(s)} ${title(field.label)}`).replace(/\b(\w+) \1\b/gi, "$1");
      if (give(f, badge, `${featureOf(s, field.label)}`, `Buyers who want ${featureOf(s, field.label)}.`)) break;
    }
  }
  // 5. Remaining picks: a neutral badge whose reason is the pick's first listed highlight.
  const spare = ["Also Consider", "Strong Alternative", "Worth a Look", "Solid Runner-Up", "Honourable Mention"];
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

/** Research-method sentence, built from the fields this guide actually ranks so it differs between guides. */
function method(slug: string, fields: string[], missing: string | undefined, noun: string): string {
  const on = joinList(fields.slice(0, 3));
  const gaps = missing ? [`where a maker leaves out ${missing}, we say so`, `a missing ${missing} is flagged, not filled in`, `if a maker skips ${missing}, the guide says so`] : ["where a maker leaves a figure out, we say so", "gaps in the specs are flagged, not filled in", "any figure a maker omits is noted as missing"];
  const gap = gaps[hash(slug + "g") % gaps.length];
  const open = [
    `We ranked these ${noun} on ${on} using manufacturer specifications`,
    `This is a research roundup, not a lab test: ${on} come from each maker's published specs`,
    `Rankings weigh ${on} as the makers state them`,
    `Our comparison rests on published figures for ${on}`,
    `The order reflects ${on} from maker specifications`,
    `We sorted these picks by ${on}, working from the makers' own data`,
  ];
  const close = [
    `nothing here was tested in-house, and ${gap}.`,
    `we did not test these ${noun} ourselves, and ${gap}.`,
    `${gap}, and no figure here comes from our own testing.`,
    `${gap} rather than guess, since we have not benched them.`,
  ];
  return `${open[hash(slug + "m") % open.length]}; ${close[hash(slug + "mc") % close.length]}`;

}
/** Opening dek: names the actual price span and a spec leader, so no two guides share it. */
function dekFor(slug: string, fs: Fact[], schema: CategorySchema, noun: string, fields: string[]): string {
  const N = NUM[fs.length];
  const byP = [...fs].filter((f) => price(f) < Infinity).sort((a, b) => price(a) - price(b));
  const cheap = byP[0]?.short, top = byP[byP.length - 1]?.short;
  let lead: string | undefined; let leadAsin: string | undefined;
  for (const fd of schema.fields.filter((x) => x.better && x.superlative)) {
    const vals = fs.map((f) => num(val(f, fd.key))).filter((x): x is number => x !== undefined);
    if (vals.length < 3) continue;
    const best = fd.better === "higher" ? Math.max(...vals) : Math.min(...vals);
    const w = fs.filter((f) => num(val(f, fd.key)) === best);
    if (w.length === 1) { leadAsin = w[0].asin; lead = `the ${w[0].short} has the ${fd.superlative![0]} ${(fd.noun ?? lc(fd.label)).replace(new RegExp(`^${fd.superlative![0]} `, "i"), "")}`; break; }
  }
  const core = (x: string) => x.toLowerCase().replace(/^(largest|highest|lowest|longest|most|max|maximum) /, "").replace(/ (size|count)$/, "");
  const uniq = fields.filter((x, i) => fields.findIndex((y) => core(y) === core(x)) === i);
  const two = joinList(uniq.slice(0, 2));
  if (lead && leadAsin && leadAsin === byP[0]?.asin) lead = `${lead}, and it also costs the least`;
  const v = [
    `${N} ${noun} compared, from the ${cheap} to the ${top}, with the trade-offs of each named.`,
    `We weighed ${lc(N)} ${noun} on ${two}${lead ? `; ${lead}` : ""}${lead?.endsWith("costs the least") ? "" : `, and the ${cheap} costs the least`}.`,
    `From the ${cheap} to the ${top}: ${lc(N)} ${noun} ranked on ${two}, with who should skip each one.`,
    `${N} ${noun} ranked on ${two}${lead ? `, where ${lead}` : ""}${lead?.endsWith("costs the least") ? "" : `; the ${cheap} is the cheapest route in`}.`,
  ];
  return two ? v[hash(slug + "d") % v.length] : v[0];
}
/** Guide-specific FAQ and criterion built from this guide's own picks, so guides in one category do not share them. */
function extras(s: { slug: string; kw: string; lead: string }, fs: Fact[], schema: CategorySchema, noun: string) {
  const h = (k: string) => hash(s.slug + k);
  const pickOf = <T,>(xs: T[], k: string) => xs[h(k) % xs.length];
  const kw = kwCase(s.kw);
  const extraFaq: { q: string; a: string }[] = [];
  const extraCriteria: { title: string; body: string }[] = [];
  // Ranked fields with at least three stated values, each giving a leader and a spread.
  const spreads = schema.fields.filter((fd) => fd.better && fd.superlative).map((fd) => {
    const have = fs.filter((f) => num(val(f, fd.key)) !== undefined).sort((a, b) => (fd.better === "higher" ? num(val(b, fd.key))! - num(val(a, fd.key))! : num(val(a, fd.key))! - num(val(b, fd.key))!));
    return { fd, have };
  }).filter((x) => x.have.length >= 3 && num(val(x.have[0], x.fd.key)) !== num(val(x.have[x.have.length - 1], x.fd.key)));
  const noun1 = (fd: FieldDef) => (fd.noun ?? lc(fd.label)).replace(new RegExp(`^${fd.superlative![0]} `, "i"), "");
  const fmt = (fd: FieldDef, f: Fact) => String(fd.fmt(val(f, fd.key) as never));
  const sp = spreads[h("f") % Math.max(spreads.length, 1)];
  if (sp) {
    const [a, b] = sp.have, z = sp.have[sp.have.length - 1];
    extraFaq.push({
      q: pickOf([`Which of these ${noun} has the ${sp.fd.superlative![0]} ${noun1(sp.fd)}?`, `Which pick leads on ${noun1(sp.fd)}?`, `How do these ${noun} compare on ${noun1(sp.fd)}?`], "q1"),
      a: pickOf([
        `The ${a.short} leads at ${fmt(sp.fd, a)}, ahead of the ${b.short} at ${fmt(sp.fd, b)}; the ${z.short} sits at the other end with ${fmt(sp.fd, z)}.`,
        `The ${a.short}, at ${fmt(sp.fd, a)}. The ${b.short} follows at ${fmt(sp.fd, b)}, while the ${z.short} has ${fmt(sp.fd, z)}.`,
      ], "a1"),
    });
  }
  const byP = [...fs].filter((f) => price(f) < Infinity).sort((a, b) => price(a) - price(b));
  if (byP.length >= 3) {
    const lo = byP[0], hi = byP[byP.length - 1];
    extraFaq.push({
      q: pickOf([`Which is the cheapest pick in this guide?`, `What is the least I can spend on one of these ${noun}?`, `Which pick costs the least here?`], "q2"),
      a: pickOf([
        `The ${lo.short} cost the least when we checked, and the ${hi.short} sat at the top of the range. Prices move often, so check the current listing before buying.`,
        `The ${lo.short}. It undercut the ${byP[1].short} when we checked, while the ${hi.short} cost the most of the group.`,
        `That was the ${lo.short} at our last check; if you can stretch, the ${byP[1].short} is the next step up and the ${hi.short} the priciest.`,
        `Start with the ${lo.short}, the lowest-priced pick when we checked. The ${hi.short} is the premium end, so the spread between them shows what extra money buys here.`,
        `At our last price check the ${lo.short} was the cheapest pick and the ${hi.short} the most expensive; the ${byP[1].short} was the next step up from the ${lo.short}.`,
      ], "a2"),
    });
  }
  const sp2 = spreads.find((x) => x !== sp);
  if (sp2) {
    const a = sp2.have[0], z = sp2.have[sp2.have.length - 1];
    extraCriteria.push({
      title: pickOf([`How much ${noun1(sp2.fd)} you need`, `Decide on ${noun1(sp2.fd)} first`, `Where these picks differ: ${noun1(sp2.fd)}`], "c1"),
      body: `Among these picks, ${noun1(sp2.fd)} runs from ${fmt(sp2.fd, z)} on the ${z.short} to ${fmt(sp2.fd, a)} on the ${a.short}. ${pickOf(["Settle how much you need before comparing prices, since paying for more rarely helps if your use never reaches it.", "Pick the lowest figure that covers your use; the extra usually costs more than it returns.", "Match this to what you will actually do with it, then let price decide between the picks that qualify."], "c1b")}`,
    });
  }
  return { extraFaq, extraCriteria };
}

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
    ", with the trade-offs of each named.",
    ", using what each maker states, with the trade-offs of each pick named.",
    ", with the gaps in each maker's specs noted.",
    ", with each pick's trade-offs and the pick that covers them named.",
    ", with who each one suits, what it gives up and which pick covers that gap named.",
    ", with who each one suits, what it gives up, which pick covers that gap and what to check before buying.",
    ".",
  ];
  const subject = s.seo && /^Best /.test(s.seo) ? s.seo.replace(/^Best /, "").split(" ").map((w) => PROPER[w.toLowerCase()] ?? (/^[A-Z][a-z]+$/.test(w) && !KEEP.has(w) ? w.toLowerCase() : w)).join(" ") : `${kwCase(s.kw)} picks`;
  const metas = [4, 3, 2, 5].flatMap((k) => tails.map((tail) => `${N} ${subject} compared on ${joinList(ranked.slice(0, k))}${tail}`));
  const metaDescription = metas.find((m) => m.length >= 120 && m.length <= 160);
  if (!metaDescription) throw new Error(`batch17 ${s.slug}: no meta description in 120-160 chars`);
  const dek = dekFor(s.slug, fs, g.schema, g.noun, g.schema.fields.filter((x) => !/^(type|does|kind|form)$/.test(x.key)).filter((x) => x.better && fs.filter((f) => has(val(f, x.key))).length >= 2).map((x) => (x.noun ?? lc(x.label)).replace(/^(largest|highest|lowest|longest|most) /i, "")).concat(ranked.filter((r) => !/^(type|what it does|kind)$/i.test(r))).filter((v, i, a) => a.indexOf(v) === i));
  const missingField = ranked.find((r) => fs.some((f) => val(f, g.schema.fields.find((x) => lc(x.label) === r)!.key) === undefined));
  const lines = fs.slice(1).map((f) => (labels[f.asin] ? `the ${f.short} for ${labels[f.asin].reason}` : undefined)).filter(Boolean) as string[];
  const bottom = [`Our first pick is the ${fs[0].short}${labels[fs[0].asin] ? `, chosen for ${labels[fs[0].asin].reason}` : ""}.${lines.length ? ` Look at ${joinList(lines.slice(0, 3))} if those matter more to you.` : ""}`, s.close];
  const takes = Object.fromEntries(fs.map((f) => [f.asin, TAKES[f.asin] ?? autoTake(f, g.schema)]));
  const prio = s.prio ?? g.schema.criteria.slice(0, 6).filter((_, i) => (hash(s.slug) + i) % 2 === 0).slice(0, 3).map((c) => c.id);
  return {
    schema: g.schema, facts: g.facts,
    cfg: {
      slug: s.slug, category: g.category, updatedAt, seoTitle, title: s.h1 ?? (s.seo && /^Best /.test(s.seo) ? `The ${s.seo}` : `The Best ${title(s.kw)}`), breadcrumbLabel: s.crumb ?? seoTitle,
      mainKeyword: s.kw, dek, metaDescription, teaser: s.teaser ?? s.lead.split(/(?<=\.)\s/)[0], asins: s.asins, labels, takes,
      intro: [s.lead, method(s.slug, ranked, missingField, g.noun)], ...extras(s, fs, g.schema, g.noun), bottomLine: bottom, priorityCriteria: prio,
      related: (s.rel ?? g.related).filter((x) => x !== s.slug).slice(0, 3),
    },
  };
};
