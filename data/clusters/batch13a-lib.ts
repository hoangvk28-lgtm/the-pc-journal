import pool from "@/data/pcj-pool/prebuilt.json";
import { prebuiltFacts, prebuiltSchema } from "@/data/categories/prebuilt";
import type { Fact } from "@/lib/pc-compose/generic";
import { maker, type Entry } from "./batch12-lib";

/**
 * Batch 13a: prebuilt and mini gaming PC roundups, one article per keyword. Every pick comes from
 * data/categories/prebuilt.ts, where a listing qualifies only when it names the CPU, the GPU with VRAM
 * (or integrated graphics, stated as such), the RAM and the SSD capacity.
 *
 * Each article states its candidate filter and rank order; `pickSet` then keeps product sets distinct
 * from every earlier article (including batch 12e). Labels are assigned only when a listed fact
 * singles a pick out within the article; takes are written from each fact sheet.
 */
type PoolRec = { title?: string; brand?: string; price?: string };
const P = pool as Record<string, PoolRec>;
export const all = Object.values(prebuiltFacts);
export const price = (f: Fact) => Number((f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
export const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
export const s = (f: Fact, k: string) => (f.specs[k] === undefined ? "" : String(f.specs[k]));
export const brand = (f: Fact, re: RegExp) => re.test(`${P[f.asin]?.brand ?? ""} ${P[f.asin]?.title ?? ""} ${f.name}`);
export const integrated = (f: Fact) => /integrated/.test(s(f, "gpu"));
export const laptopGpu = (f: Fact) => /laptop-class|145W/.test(s(f, "gpu"));
export const MINI = new Set(["B0GHYMV62Q", "B0FXYN72L1", "B0FQV2P16Q", "B0D8BBF849"]);
export const mini = (f: Fact) => integrated(f) || MINI.has(f.asin);
export const tower = (f: Fact) => !mini(f);
export const x3d = (f: Fact) => /X3D/.test(s(f, "cpu"));
export const white = (f: Fact) => s(f, "color") === "White";
const tb = (gb: number) => (gb >= 1000 ? `${gb / 1000}TB` : `${gb}GB`);

// Product sets already used (batch 12e), so no article repeats a set.
const used = new Set<string>([
  ["B0H55PPW4K", "B0GZKJVFXH", "B0FBL4CR6T", "B0GS3K5JHK", "B0DXV56CDD", "B0GYC57VWQ"],
  ["B0FCYPWLSN", "B0CRHVTG34", "B0GZNFHK95", "B0FNR773ZJ", "B0FCYVNZ16"],
  ["B0FCYPWLSN", "B0GLDVNNFG", "B0GT8RMQ9S", "B0F1457YSB", "B0FJRRXGYS"],
  ["B0H27NNNK4", "B0H1VDTQWR", "B0G2RDTD1Y", "B0DXVK2SLY", "B0FNMKGVCB", "B0DXVDC556"],
  ["B0GP66WN2J", "B0G2RDWN5F", "B0GYXT94QS", "B0FR4CLBC2", "B0GX8V3P8H", "B0FW4Q6G91"],
  ["B0G2RDWN5F", "B0H5VKQ3PR", "B0G2RDZ7F1", "B0FR4CLBC2", "B0GRGHJXLL", "B0H2FZ3J4W", "B0FJRRXGYS"],
  ["B0FW4Q6G91", "B0GLDVNNFG", "B0DXV56CDD", "B0H1VDTQWR", "B0H5VKQ3PR", "B0G2RDZ7F1"],
  ["B0H7WXCF8D", "B0GQZ2PKBM", "B0GS17LMD4", "B0DXVFWSS7", "B0GP2ZPSLJ"],
  ["B0FBL4CR6T", "B0H14YTD1G", "B0GRGHJXLL", "B0F4KJLYT2"],
  ["B0GS3K5JHK", "B0F6MY44CT", "B0DVZY7V6Z", "B0GR8ZP38W", "B0GPWNQN9H", "B0H2FZ3J4W"],
  ["B0GYC57VWQ", "B0GZHT6FYP", "B0GJ9PTBZG", "B0HJ552GX4"],
].map((a) => [...a].sort().join()));

/** Takes the first `count` candidates; if that set is taken, swaps in later candidates until it is new. */
export function pickSet(slug: string, cands: Fact[], count: number): string[] {
  const ids = cands.map((f) => f.asin);
  if (ids.length < 3) throw new Error(`batch13a ${slug}: only ${ids.length} candidates`);
  const k = Math.min(count, ids.length);
  const base = ids.slice(0, k);
  const tries = [base];
  for (let j = k; j < ids.length; j++) for (let pos = k - 1; pos >= 0; pos--) tries.push(base.map((x, i) => (i === pos ? ids[j] : x)));
  for (const set of tries) {
    const key = [...set].sort().join();
    if (!used.has(key)) { used.add(key); return set; }
  }
  throw new Error(`batch13a ${slug}: no distinct product set`);
}

// ---------- Takes, written from each fact sheet ----------
const hash = (t: string) => [...t].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const art = (w: string) => (/^(RTX|RX|Arc|8|11|18)/.test(w) ? "an" : "a");

function gpuPhrase(f: Fact) {
  const g = s(f, "gpu"), v = n(f, "vram");
  if (integrated(f)) return `${g.replace(" (integrated)", "")} integrated graphics`;
  if (/laptop-class/.test(g)) return `a laptop-class ${g.replace(" (laptop-class)", "")} with ${v}GB of VRAM`;
  if (/145W/.test(g)) return `a full-power 145W RTX 5060 with ${v}GB of VRAM`;
  return `${art(g)} ${g} with ${v}GB of VRAM`;
}

function takeFor(f: Fact): string {
  const cpu = s(f, "cpu"), ram = n(f, "ram"), rt = s(f, "ramType"), ssd = tb(n(f, "ssd"));
  const mem = `${ram}GB of ${rt || "RAM"}`;
  const v = hash(f.asin) % 3;
  const first = v === 0 ? `${f.short} pairs ${art(cpu)} ${cpu} with ${gpuPhrase(f)}, plus ${mem} and a ${ssd} SSD.`
    : v === 1 ? `The ${f.short} build pairs ${art(cpu)} ${cpu}, ${gpuPhrase(f)}, ${mem} and a ${ssd} SSD.`
    : `Inside the ${f.short} are ${art(cpu)} ${cpu} and ${gpuPhrase(f)}, backed by ${mem} and ${ssd} of SSD storage.`;
  const extra: string[] = [];
  if (f.notes[0]) extra.push(`It also comes with ${f.notes[0]}.`);
  if (integrated(f)) extra.push("There is no separate graphics card, so plan on lighter games and esports titles at modest settings.");
  else if (/laptop-class/.test(s(f, "gpu"))) extra.push("A laptop-class GPU runs at lower power than the desktop card with the same name.");
  else if (n(f, "psu") && !f.notes.join(" ").includes(`${n(f, "psu")}W`)) extra.push(`The power supply is rated at ${n(f, "psu")}W${s(f, "psuCert") ? ` (${s(f, "psuCert")})` : ""}.`);
  else if (!n(f, "psu")) extra.push("Its PSU wattage isn't published, so ask the seller before a GPU upgrade.");
  return [first, ...extra.slice(0, 2)].join(" ");
}
export const takes: Record<string, string> = Object.fromEntries(all.map((f) => [f.asin, takeFor(f)]));
const pc = maker(prebuiltSchema, prebuiltFacts, "pc-builds", takes);

// ---------- Labels: a label only when a listed fact singles the pick out ----------
type Lab = { badge: string; reason: string; bestFor: string };
function strictMax(fs: Fact[], key: string, f: Fact) {
  const v = n(f, key);
  return v > 0 && fs.every((o) => o === f || n(o, key) < v);
}
function labelsFor(fs: Fact[], ctx: string): Record<string, Lab> {
  const out: Record<string, Lab> = {};
  const usedBadges = new Set<string>();
  const cheapest = [...fs].sort((a, b) => price(a) - price(b));
  const onlyOne = (pred: (f: Fact) => boolean, f: Fact) => pred(f) && fs.filter(pred).length === 1;
  for (const f of fs) {
    const g = s(f, "gpu").replace(/ \(.*\)/, ""), cpu = s(f, "cpu");
    const opts: [boolean, Lab][] = [
      [strictMax(fs, "vram", f), { badge: "Most VRAM", reason: `${n(f, "vram")}GB of VRAM on the ${g}`, bestFor: "High texture settings at 1440p and above." }],
      [onlyOne(x3d, f), { badge: "Gaming-Focused CPU", reason: `a ${cpu} with 3D V-Cache`, bestFor: "High-refresh play where the CPU matters." }],
      [strictMax(fs, "ram", f), { badge: "Most Memory", reason: `${n(f, "ram")}GB of RAM`, bestFor: "Gaming alongside streaming, browsers or editing." }],
      [strictMax(fs, "ssd", f), { badge: "Most Storage", reason: `a ${tb(n(f, "ssd"))} SSD`, bestFor: "Large game libraries." }],
      [strictMax(fs, "psu", f), { badge: "Largest Listed PSU", reason: `a ${n(f, "psu")}W power supply${s(f, "psuCert") ? ` rated ${s(f, "psuCert")}` : ""}`, bestFor: "A bigger graphics card later." }],
      [onlyOne((x) => /3 years|2 years/.test(s(x, "warranty")), f), { badge: "Longest Warranty", reason: `a ${s(f, "warranty")} warranty`, bestFor: "Long-term ownership." }],
      [onlyOne(white, f), { badge: "White Build", reason: "a white case", bestFor: "Matching a white desk setup." }],
      [onlyOne((x) => !!s(x, "warranty"), f), { badge: "Stated Warranty", reason: `a ${s(f, "warranty")} warranty in the listing`, bestFor: "Buyers who want support terms in writing." }],
      [cheapest[0] === f && price(f) < price(cheapest[1]), { badge: "Lowest Price Here", reason: `the lowest price among these ${ctx} at the time of writing`, bestFor: "Keeping the budget tight." }],
      [onlyOne((x) => s(x, "gpu") === s(f, "gpu"), f) && !integrated(f), { badge: `${g} Pick`, reason: `${art(g)} ${g} with ${n(f, "vram")}GB of VRAM`, bestFor: n(f, "vram") >= 12 ? "1440p gaming." : "1080p gaming." }],
      [onlyOne((x) => s(x, "cpu") === cpu, f), { badge: `${cpu.replace(/^(Core|Ryzen) /, "$1 ")} Pick`, reason: `${art(cpu)} ${cpu} processor`, bestFor: "Buyers who prefer this CPU platform." }],
    ];
    const hit = opts.find(([ok, l]) => ok && !usedBadges.has(l.badge));
    if (hit) { out[f.asin] = hit[1]; usedBadges.add(hit[1].badge); }
  }
  // The composer has only three distinct fallback labels, so with four or more unlabeled picks each
  // remaining pick gets a label naming the combination of listed parts that sets it apart here.
  const rest = fs.filter((f) => !out[f.asin]);
  if (rest.length > 3) {
    for (const f of rest) {
      const g = s(f, "gpu").replace(/ \(.*\)/, ""), cpu = s(f, "cpu").replace(/^(Ryzen \d|Core) /, "");
      const opts: [string, string][] = [
        [`${g} + ${cpu}`, `${art(g)} ${g} paired with ${art(s(f, "cpu"))} ${s(f, "cpu")}`],
        [`${g} + ${tb(n(f, "ssd"))} SSD`, `${art(g)} ${g} with a ${tb(n(f, "ssd"))} SSD`],
        [`${g} + ${n(f, "ram")}GB RAM`, `${art(g)} ${g} with ${n(f, "ram")}GB of RAM`],
        [`${f.short} Pick`, `the ${f.short} configuration's parts`],
      ];
      const key = (x: Fact, i: number) => {
        const gx = s(x, "gpu").replace(/ \(.*\)/, "");
        return [`${gx}|${s(x, "cpu")}`, `${gx}|${n(x, "ssd")}`, `${gx}|${n(x, "ram")}`, x.asin][i];
      };
      const i = opts.findIndex(([b], k) => !usedBadges.has(b) && fs.filter((x) => key(x, k) === key(f, k)).length === 1);
      if (i >= 0) { out[f.asin] = { badge: opts[i][0], reason: opts[i][1], bestFor: integrated(f) ? "Light and older games at modest settings." : n(f, "vram") >= 12 ? "1440p gaming." : "1080p gaming." }; usedBadges.add(opts[i][0]); }
    }
  }
  return out;
}

// ---------- Article builder ----------
const WE = [
  "We compared the parts each listing names: CPU, graphics card and VRAM, memory, storage and, where stated, the power supply and warranty. We did not test these systems, and we skipped listings that leave a core part vague.",
  "Every pick names its CPU model, graphics, memory and SSD capacity in the listing; we left out renewed units and listings that hide a part behind \"brand may vary\". We researched the listings and did not test the machines.",
  "Our comparison uses what each seller states, not hands-on testing. Listings without a named CPU, a GPU with its VRAM, a RAM figure or an SSD size were dropped, as were renewed units and outlier prices.",
];
const REL = ["best-prebuilt-gaming-pcs", "best-graphics-cards-for-1440p", "best-gaming-monitors"];
const CRIT = [["gpu", "memory-storage", "listing"], ["gpu", "cpu", "psu"], ["memory-storage", "warranty", "gpu"], ["listing", "gpu", "warranty"], ["cpu", "gpu", "memory-storage"], ["psu", "gpu", "listing"]];

export type A = {
  slug: string; kw: string; seo?: string; h1?: string; crumb?: string;
  cands: Fact[]; count: number;
  /** One or two sentences written for this keyword. */
  lead: string; teaser: string; close: string;
  what: string; // noun phrase for the meta and dek, e.g. "gaming PCs under $1,000"
  ctx?: string; crit?: string[]; rel?: string[];
};
const title = (kw: string) => kw.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bPc(s?)\b/g, "PC$1").replace(/\bRtx\b/g, "RTX").replace(/\bAmd\b/g, "AMD").replace(/\bHp\b/g, "HP").replace(/\bMsi\b/g, "MSI").replace(/\bX3d\b/gi, "X3D").replace(/\bIbuypower\b/gi, "iBUYPOWER").replace(/\bCyberpowerpc\b/gi, "CyberPowerPC").replace(/\b4k\b/gi, "4K").replace(/(\d{4})x3d/gi, "$1X3D").replace(/\bTi\b/g, "Ti");
const joinList = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const NUM = ["zero", "one", "two", "Three", "Four", "Five", "Six"];

export function build(a: A): Entry {
  const asins = pickSet(a.slug, a.cands, a.count);
  const fs = asins.map((x) => prebuiltFacts[x]);
  const labels = labelsFor(fs, a.ctx ?? "picks");
  const seoTitle = a.seo ?? `Best ${title(a.kw)}`;
  if (seoTitle.length > 43) throw new Error(`batch13a ${a.slug}: seoTitle ${seoTitle.length} chars`);
  const h1 = a.h1 ?? `The Best ${title(a.kw)}`;
  const N = NUM[fs.length];
  const metaOpts = [
    `${N} ${a.what} compared on graphics card, VRAM, processor, memory, SSD capacity and the power supply or warranty each listing states.`,
    `${N} ${a.what} compared on graphics card, VRAM, processor, memory, SSD and warranty, using only listings that name every core part.`,
    `${N} ${a.what} compared on GPU, VRAM, CPU, memory and storage, using only listings that name every part.`,
    `${N} ${a.what} compared on GPU, VRAM, CPU, RAM and SSD.`,
  ];
  const metaDescription = metaOpts.find((m) => m.length >= 120 && m.length <= 160);
  if (!metaDescription) throw new Error(`batch13a ${a.slug}: meta length ${metaOpts.map((m) => m.length).join("/")}`);
  const gpus = [...new Set(fs.map((f) => s(f, "gpu").replace(/ \(.*\)/, "")))];
  const dek = `${N} ${a.what}, from ${gpus.length > 1 ? `${gpus[0]} to ${gpus[gpus.length - 1]}` : `${gpus[0]} configurations`}, each with its CPU, graphics, memory and storage named.`;
  const lines = fs.map((f) => (labels[f.asin] ? `the ${f.short} for ${labels[f.asin].reason}` : undefined)).filter(Boolean) as string[];
  const bottom = [`Our first pick is the ${fs[0].short}${labels[fs[0].asin] ? `, chosen for ${labels[fs[0].asin].reason}` : ""}. ${lines.length > 1 ? `Look at ${joinList(lines.slice(1))} if those matter more to you.` : ""}`.trim(), a.close];
  const idx = hash(a.slug);
  return pc({
    slug: a.slug, seoTitle, title: h1, breadcrumbLabel: a.crumb ?? seoTitle, mainKeyword: a.kw.toLowerCase(),
    dek, metaDescription, teaser: a.teaser, asins, labels,
    intro: [a.lead, WE[idx % WE.length]], bottomLine: bottom,
    priorityCriteria: a.crit ?? CRIT[idx % CRIT.length],
    related: [...(a.rel ?? []), ...REL].filter((x) => x !== a.slug).filter((x, i, arr) => arr.indexOf(x) === i).slice(0, 3),
  });
}

// ---------- Candidate helpers ----------
export const by = {
  priceAsc: (a: Fact, b: Fact) => price(a) - price(b),
  priceDesc: (a: Fact, b: Fact) => price(b) - price(a),
  vram: (a: Fact, b: Fact) => n(b, "vram") - n(a, "vram") || price(a) - price(b),
  ram: (a: Fact, b: Fact) => n(b, "ram") - n(a, "ram") || price(a) - price(b),
  ssd: (a: Fact, b: Fact) => n(b, "ssd") - n(a, "ssd") || price(a) - price(b),
  /** VRAM per dollar, a rough value order. */
  value: (a: Fact, b: Fact) => (n(b, "vram") + n(b, "ram") / 4) / price(b) - (n(a, "vram") + n(a, "ram") / 4) / price(a),
};
export const where = (pred: (f: Fact) => boolean, sort: (a: Fact, b: Fact) => number, rotate = 0) => {
  const l = all.filter(pred).sort(sort);
  return [...l.slice(rotate), ...l.slice(0, rotate)];
};
export const within = (lo: number, hi: number) => (f: Fact) => price(f) >= lo && price(f) <= hi;
