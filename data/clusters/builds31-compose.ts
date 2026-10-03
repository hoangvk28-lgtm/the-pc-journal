import type { BestGuide, BestProduct, HowToChooseSection } from "@/lib/pc-content/types";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { cap, hash, listJoin } from "@/lib/pc-compose/seed";
import { GROUPS } from "./batch17-groups";
import { TAKES, autoTake } from "./batch17-lib";
import { WHY_EXTRA } from "./why-extra";
import { PLANS, type BuildPlan } from "./builds31-plan";
import { BUILD_PARTS } from "./builds31";
import { BUILD_COPY, type BuildCopy } from "./builds31-copy";
import { FACTS, checkBuild, chipRank, isAio, price, psuWatts, gpuRecPsu, gpuLength, totalPrice, caseGpuMax, caseCoolerMax, aioRadSize, type Build, type Check } from "./builds31-lib";

const num = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : undefined);
const str = (f: Fact, k: string) => (f.specs[k] === undefined ? "" : String(f.specs[k]));
const lc = (s: string) => (/^[A-Z][a-z]/.test(s) && !/^[A-Z][a-z]+[A-Z]/.test(s) && !/^[A-Z][a-z]+-[A-Z]/.test(s) && !/^(Intel|AMD|Ryzen|Radeon|GeForce|Arc|Noctua|Corsair|Samsung|Kingston|Crucial|Lexar|Thermalright|MSI|ASUS)\b/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const pct = (f: Fact, total: number) => Math.round((price(f) / total) * 100);
const UPDATED = "2026-10-03";
const V = (seed: string, xs: string[]) => xs[hash(seed) % xs.length];
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;
const NUMW = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
/** An editorial take written for another guide may compare against that guide's picks; only context-free ones are reused. */
const contextFree = (t: string | undefined) => (t && !/\b(here|this guide|these|the others|rest of|compared|cheapest|lowest|least expensive)\b/i.test(t) ? t : undefined);
/** Drops sentences that name a monitor, resolution or use case the reuse in another guide would contradict. */
const USE_CASE = /\b(1080p|1440p|4K|\d+Hz|esports|e-sports|streaming|streamers?|creators?|budget gaming|VR|competitive)\b/i;
const useTake = (t: string | undefined) => {
  if (!t) return undefined;
  const sents = t.split(/(?<=[.!?])\s+/);
  if (USE_CASE.test(sents[0])) return undefined;
  return sents.filter((s, i) => i === 0 || !USE_CASE.test(s)).join(" ");
};
const gb = (c: number | undefined) => (c === undefined ? "" : c < 1 ? `${Math.round(c * 1000)}GB` : `${c}TB`);

const SCHEMA: Record<string, CategorySchema> = {
  cpu: GROUPS.cpu.schema, gpu: GROUPS.gpu.schema, mb: GROUPS.mb.schema, ram: GROUPS.ram.schema, ssd: GROUPS.ssd.schema,
  psu: GROUPS.psu.schema, case: GROUPS.pcCase.schema, air: GROUPS.air.schema, aio: GROUPS.aio.schema,
};
const ROLE_BADGE: Record<string, string> = { cpu: "Processor", gpu: "Graphics Card", mb: "Motherboard", ram: "Memory", ssd: "Storage", psu: "Power Supply", case: "Case", cooler: "CPU Cooler" };
const ORDER = ["cpu", "gpu", "mb", "ram", "ssd", "psu", "case", "cooler"] as const;
type R = (typeof ORDER)[number];

function priceBucket(v: number): string {
  if (v < 50) return "Under $50";
  if (v < 100) return "$50 to $100";
  if (v < 250) return "$100 to $250";
  if (v < 500) return "$250 to $500";
  if (v < 1000) return "$500 to $1,000";
  if (v < 2000) return "$1,000 to $2,000";
  return "Over $2,000";
}
/** The "at the time of writing" band for the whole build, in $50 steps. */
function band(total: number): [number, number] { const lo = Math.floor((total - 1) / 50) * 50; return [lo, lo + 50]; }

/** Notes written for another guide may compare against its picks ("the lowest price here"); they are dropped. */
const CONTEXT = /\b(here|this guide|these|the others|rest of|compared|cheapest|lowest|least expensive|best-documented)\b/i;
const cleaned = new Map<string, Fact>();
const clean = (f: Fact): Fact => { let c = cleaned.get(f.asin); if (!c) { c = { ...f, notes: f.notes.filter((n) => !CONTEXT.test(n)) }; cleaned.set(f.asin, c); } return c; };

export function buildFromParts(parts: Record<string, string>): Build {
  const g = (k: string) => { const a = parts[k]; if (!a) return undefined; const f = FACTS[a]; if (!f) throw new Error(`builds31: no fact sheet for ${a}`); return clean(f); };
  const cooler = g("cooler");
  return { cpu: g("cpu")!, cooler, mb: g("mb")!, ram: g("ram")!, ssd: g("ssd")!, gpu: g("gpu"), psu: g("psu")!, case: g("case")!, coolerKind: cooler ? (isAio(cooler) ? "aio" : "air") : undefined };
}
const schemaFor = (role: R, b: Build): CategorySchema => (role === "cooler" ? (b.coolerKind === "aio" ? SCHEMA.aio : SCHEMA.air) : SCHEMA[role]);
const partOf = (b: Build, role: R): Fact | undefined => (role === "cooler" ? b.cooler : (b as unknown as Record<string, Fact | undefined>)[role]);

/* ---------------------------------------------------------------- swaps */

interface Swap { role: R; label: string; alt: Fact; cheaper: boolean }
function swapsFor(b: Build): Swap[] {
  const out: Swap[] = [];
  const base = new Map(checkBuild(b).map((c) => [c.id, c.confirm]));
  const test = (role: R, alt: Fact) => {
    if (role === "cpu" && b.cooler === undefined && alt.specs.cooler !== true) return false;
    if (role === "cpu" && b.gpu === undefined && alt.specs.igpu !== true) return false;
    return checkBuild({ ...b, [role]: alt } as Build).every((c) => c.ok && (!c.confirm || base.get(c.id)));
  };
  const gpu = b.gpu;
  if (gpu) {
    const pool = Object.values(GROUPS.gpu.facts).filter((f) => price(f) < Infinity && chipRank(f) >= 0 && f.asin !== gpu.asin && (num(f, "vram") ?? 0) >= 8 && Math.abs(chipRank(f) - chipRank(gpu)) <= 8 && test("gpu", clean(f)));
    const cheaper = pool.filter((f) => chipRank(f) < chipRank(gpu) && price(f) <= price(gpu) * 0.88 && price(f) >= price(gpu) * 0.45).sort((a, c) => chipRank(c) - chipRank(a) || price(a) - price(c))[0];
    const better = pool.filter((f) => chipRank(f) > chipRank(gpu) && price(f) >= price(gpu) * 1.1 && price(f) <= price(gpu) * 2.2).sort((a, c) => chipRank(a) - chipRank(c) || price(a) - price(c))[0];
    if (cheaper) out.push({ role: "gpu", label: "Spend less on graphics", alt: cheaper, cheaper: true });
    if (better) out.push({ role: "gpu", label: "Spend more on graphics", alt: better, cheaper: false });
  }
  const cpuPool = Object.values(GROUPS.cpu.facts).filter((f) => price(f) < Infinity && str(f, "socket") === str(b.cpu, "socket") && f.asin !== b.cpu.asin && num(f, "cores") !== undefined && test("cpu", f));
  const cores = (f: Fact) => num(f, "cores") ?? 0;
  const l3 = (f: Fact) => num(f, "l3") ?? 0;
  const cheaperC = cpuPool.filter((f) => price(f) <= price(b.cpu) * 0.8 && price(f) >= price(b.cpu) * 0.4 && cores(f) >= 4 && (cores(f) < cores(b.cpu) || l3(f) < l3(b.cpu))).sort((a, c) => price(c) - price(a))[0];
  const betterC = cpuPool.filter((f) => price(f) >= price(b.cpu) * 1.2 && price(f) <= price(b.cpu) * 2.6 && cores(f) >= cores(b.cpu) && (cores(f) > cores(b.cpu) || l3(f) > l3(b.cpu))).sort((a, c) => price(a) - price(c))[0];
  if (cheaperC) out.push({ role: "cpu", label: "Spend less on the processor", alt: cheaperC, cheaper: true });
  if (betterC) out.push({ role: "cpu", label: "Spend more on the processor", alt: betterC, cheaper: false });
  const capR = num(b.ram, "capacity") ?? 0;
  const ramPool = Object.values(GROUPS.ram.facts).filter((f) => price(f) < Infinity && str(f, "gen") === str(b.ram, "gen") && num(f, "capacity") !== capR && (num(f, "speed") ?? 0) >= (str(b.ram, "gen") === "DDR5" ? 5600 : 3200) && test("ram", f));
  const ramUp = ramPool.filter((f) => (num(f, "capacity") ?? 0) > capR && (num(f, "capacity") ?? 0) <= capR * 2).sort((a, c) => price(a) - price(c))[0];
  const ramDown = ramPool.filter((f) => (num(f, "capacity") ?? 0) < capR && (num(f, "capacity") ?? 0) >= 16).sort((a, c) => price(a) - price(c))[0];
  if (ramUp) out.push({ role: "ram", label: `Move to ${num(ramUp, "capacity")}GB of memory`, alt: ramUp, cheaper: false });
  else if (ramDown) out.push({ role: "ram", label: `Drop to ${num(ramDown, "capacity")}GB of memory`, alt: ramDown, cheaper: true });
  const capS = num(b.ssd, "capacity") ?? 0;
  const ssdPool = Object.values(GROUPS.ssd.facts).filter((f) => price(f) < Infinity && !/2230|PS5/.test(f.name) && /PCIe 4/.test(str(f, "pcie")) && !/PCIe 5/.test(str(f, "pcie")) && test("ssd", f));
  const ssdUp = ssdPool.filter((f) => (num(f, "capacity") ?? 0) === Math.max(capS * 2, 1)).sort((a, c) => price(a) - price(c))[0];
  if (ssdUp) out.push({ role: "ssd", label: `Double the storage to ${gb(num(ssdUp, "capacity"))}`, alt: ssdUp, cheaper: false });
  return out;
}
const diffWords = (cur: Fact, alt: Fact, role: R): string => {
  const d = Math.round(((price(alt) - price(cur)) / price(cur)) * 100);
  const rel = `roughly ${Math.abs(d)}% ${d < 0 ? "cheaper" : "dearer"} than the ${cur.short}`;
  const sd = `${cur.asin}${alt.asin}`;
  if (role === "gpu") return `the ${str(alt, "chip")} with ${num(alt, "vram")}GB of ${str(alt, "mem") || "video memory"}, against the ${str(cur, "chip")}'s ${num(cur, "vram")}GB, ${rel}; ${V(sd, ["the power-supply and case checks still pass", "the supply wattage and case length rows stay green", "it still clears the supply and case limits in the table"])}`;
  if (role === "cpu") return `${num(alt, "cores")} cores${num(alt, "l3") && num(cur, "l3") ? ` and ${num(alt, "l3")}MB of L3 cache` : ""} against ${num(cur, "cores")}${num(alt, "l3") && num(cur, "l3") ? ` and ${num(cur, "l3")}MB` : ""}, ${rel}; ${V(sd, ["the socket, memory and cooler checks still pass", "it keeps the same socket, memory type and cooler fit", "the board, memory and cooler rows still hold"])}`;
  if (role === "ram") return `${num(alt, "capacity")}GB at ${num(alt, "speed")}MT/s, ${rel}; ${V(sd, ["the memory-type check still passes", "the same memory generation keeps that row green", "it stays on the generation the board and processor take"])}`;
  return `${gb(num(alt, "capacity"))} on ${str(alt, "pcie").replace(" x4", "")}, ${rel}; ${V(sd, ["the M.2 check still passes", "it uses the same M.2 slot as the current drive", "the board's M.2 row is unaffected"])}`;
};

/* ---------------------------------------------------------------- per-role text */

function roleFacts(role: R, b: Build, f: Fact, total: number): string {
  const s = (k: string) => str(f, k);
  const share = `${pct(f, total)}% of the parts total`;
  switch (role) {
    case "cpu": {
      const bits = [num(f, "cores") && `${num(f, "cores")} cores${num(f, "threads") ? ` and ${num(f, "threads")} threads` : ""}`, num(f, "boost") && `a ${num(f, "boost")}GHz maximum boost`, num(f, "l3") && `${num(f, "l3")}MB of L3 cache`, num(f, "tdp") && `a ${num(f, "tdp")}W rating`].filter(Boolean) as string[];
      const cool = f.specs.cooler === true ? "A cooler comes in the box, so the build adds none." : b.cooler ? `It ships without a cooler, so the build pairs it with the ${b.cooler.short}.` : "";
      const ig = f.specs.igpu === true ? (b.gpu ? " Its integrated graphics stay available as a backup display output." : " Its integrated graphics drive the monitor, so no graphics card is needed.") : "";
      return `The ${f.short} brings ${listJoin(bits)}, and it accounts for ${share}. ${cool}${ig}`.trim();
    }
    case "gpu": {
      const bits = [num(f, "vram") && `${num(f, "vram")}GB of ${s("mem") || "video memory"}`, s("chip") && `the ${s("chip")} chip`, num(f, "slots") && `a ${num(f, "slots")}-slot cooler`, gpuLength(f) && `a ${gpuLength(f)}mm length`, s("power") && `${s("power")} power`].filter(Boolean) as string[];
      return V(`${f.asin}g`, [
        `The ${f.short} gives the build ${listJoin(bits)}, and at ${share} it is the biggest line in the budget. Its chip's maker recommends a ${gpuRecPsu(f)}W supply for the whole system.`,
        `With ${listJoin(bits)}, the ${f.short} is where most of the money goes: ${share}. The ${s("chip")} maker's recommended system power is ${gpuRecPsu(f)}W.`,
        `${cap(listJoin(bits))} come with the ${f.short}, which takes ${share}, more than any other part. For the supply, the maker's guidance for this chip is ${gpuRecPsu(f)}W.`,
      ]);
    }
    case "mb": {
      const bits = [s("chipset") && `the ${s("chipset")} chipset`, s("form") && `${s("form")} size`, num(f, "m2") && `${num(f, "m2")} M.2 slots`, s("wifi") && s("wifi"), num(f, "lan") && `${num(f, "lan")}GbE LAN`].filter(Boolean) as string[];
      return V(`${f.asin}m`, [
        `The ${f.short} is a ${s("socket")} board with ${listJoin(bits)}, taking ${share}. It takes ${s("mem") || (s("socket") === "AM4" ? "DDR4" : "DDR5")} memory only.`,
        `${cap(s("socket"))} is the socket on the ${f.short}, a board with ${listJoin(bits)} that accounts for ${share}; its memory slots accept ${s("mem") || (s("socket") === "AM4" ? "DDR4" : "DDR5")} and nothing else.`,
        `For ${share}, the ${f.short} adds ${listJoin(bits)} on the ${s("socket")} socket, and only ${s("mem") || (s("socket") === "AM4" ? "DDR4" : "DDR5")} sticks fit its slots.`,
      ]);
    }
    case "ram": {
      const bits = [num(f, "capacity") && `${num(f, "capacity")}GB`, s("gen"), num(f, "speed") && `${num(f, "speed")}MT/s`, num(f, "cl") && `CL${num(f, "cl")}`, s("profiles") && `${s("profiles")} profiles`].filter(Boolean) as string[];
      const d5 = s("gen") === "DDR5";
      return V(`${f.asin}r`, [
        `This kit is ${listJoin(bits)} in two sticks and takes ${share}${d5 ? ", a heavy slice because DDR5 is expensive when we checked" : ""}.`,
        `You get ${listJoin(bits)} as a pair of sticks for ${share}${d5 ? "; DDR5 pricing makes memory one of the larger lines in this build" : ""}.`,
        `${cap(listJoin(bits))}, sold as two sticks, accounts for ${share}${d5 ? " and shows how pricey DDR5 is right now" : ""}.`,
      ]);
    }
    case "ssd": {
      const bits = [gb(num(f, "capacity")), s("pcie") && s("pcie").replace(" x4", ""), num(f, "read") && `up to ${num(f, "read")}MB/s sequential reads`, f.specs.dram === true ? "a DRAM cache" : f.specs.dram === false ? "no DRAM cache" : ""].filter(Boolean) as string[];
      return `The ${f.short} offers ${listJoin(bits)} and takes ${share}.`;
    }
    case "psu": {
      const bits = [num(f, "watts") && `${num(f, "watts")}W`, (s("eff") || s("cyb")) && `${s("eff") || s("cyb")} rated`, s("atx") && `ATX ${s("atx")}`, s("form") && `${s("form")} format`, s("modular") && `${s("modular") === "full" ? "fully modular" : `${s("modular")}-modular`} cables`, num(f, "hpwr") && `${NUMW[num(f, "hpwr")!] ?? num(f, "hpwr")} 12V-2x6 connector${(num(f, "hpwr") ?? 0) > 1 ? "s" : ""}`].filter(Boolean) as string[];
      return `The ${f.short} is ${listJoin(bits)} and takes ${share}.`;
    }
    case "case": {
      const bits = [s("boards") && `${s("boards")} boards`, num(f, "gpu") && `graphics cards up to ${num(f, "gpu")}mm`, num(f, "cooler") && `coolers up to ${num(f, "cooler")}mm tall`, num(f, "rad") && `a radiator up to ${num(f, "rad")}mm`, num(f, "fans") && `${plural(num(f, "fans")!, "fan")} in the box`].filter(Boolean) as string[];
      return `The ${f.short} lists room for ${listJoin(bits)} and takes ${share}.`;
    }
    default: {
      const aio = isAio(f);
      const bits = (aio ? [aioRadSize(f) && `a ${aioRadSize(f)}mm radiator`, num(f, "fan") && `${num(f, "fan")}mm fans`, s("sockets") && `${s("sockets")} mounting`] : [num(f, "pipes") && `${num(f, "pipes")} heatpipes`, num(f, "fan") && `a ${num(f, "fan")}mm fan${(num(f, "fans") ?? 1) > 1 ? ` (${num(f, "fans")} supplied)` : ""}`, num(f, "height") && `${num(f, "height")}mm height`, s("sockets") && `${s("sockets")} mounting`]).filter(Boolean) as string[];
      return `The ${f.short} is ${aio ? "a liquid cooler" : "a tower air cooler"} with ${listJoin(bits)}, and it takes ${share}.`;
    }
  }
}

/** Check details that name this part. */
function detailsFor(role: R, f: Fact, checks: Check[]): Check[] {
  const ids: Record<R, string[]> = {
    cpu: ["socket", "memory", "cooler-socket", "igpu"], gpu: ["gpu-length", "psu-watts", "psu-connector"], mb: ["socket", "memory", "m2", "form"],
    ram: ["memory", "capacity"], ssd: ["m2"], psu: ["psu-watts", "psu-connector", "psu-form"], case: ["form", "gpu-length", "psu-form", "cooler-case"], cooler: ["cooler-socket", "cooler-case"],
  };
  return checks.filter((c) => ids[role].includes(c.id) && c.parts.includes(f.short));
}

function extraCons(role: R, b: Build, f: Fact): string[] {
  const out: string[] = [];
  if (role === "cpu" && f.specs.cooler !== true && b.cooler) out.push("No cooler in the box, so the cooler is a separate cost");
  if (role === "gpu" && (num(f, "vram") ?? 99) <= 8) out.push("8GB of video memory is on the small side for the highest texture settings in newer games");
  if (role === "gpu" && gpuLength(f) === undefined) out.push("The listing does not state the card length, so check it against the case limit");
  if (role === "mb" && !str(f, "wifi")) out.push("No Wi-Fi is listed, so the board relies on wired Ethernet");
  if (role === "mb" && num(f, "m2") === undefined) out.push("The listing does not give an M.2 slot count");
  if (role === "ram" && (num(f, "capacity") ?? 99) <= 16) out.push("16GB leaves less headroom than 32GB for heavy browser or creative work");
  if (role === "ssd" && (num(f, "capacity") ?? 9) <= 0.5) out.push("500GB fills quickly once a few large programs or games are installed");
  if (role === "ssd" && /PCIe 3/.test(str(f, "pcie"))) out.push("PCIe 3.0 tops out well below PCIe 4.0 drives");
  if (role === "ssd" && f.specs.dram === undefined) out.push("The listing does not say whether the drive has a DRAM cache");
  if (role === "psu" && /semi|non/i.test(str(f, "modular"))) out.push("Cables that do not fully detach take more routing work in a small case");
  if (role === "psu" && !str(f, "modular")) out.push("The listing does not say whether the cables detach");
  if (role === "cooler" && !isAio(f) && (num(f, "height") ?? 0) >= 155) out.push(`At ${num(f, "height")}mm tall it needs a case with matching clearance`);
  if (role === "cooler" && isAio(f)) out.push("The radiator needs a front or top mount, so it takes case space a tower cooler would not");
  if (role === "case" && caseCoolerMax(f) === undefined) out.push("The listing gives no CPU cooler height limit, so check the case page");
  if (role === "case" && caseGpuMax(f) === undefined) out.push("The listing gives no graphics card length limit");
  return out;
}

function proCon(role: R, b: Build, f: Fact, total: number): { pros: string[]; cons: string[]; specs: string[] } {
  const schema = schemaFor(role, b);
  const missing = (v: unknown) => v === undefined || (typeof v === "string" && /^not (stated|listed)/i.test(v));
  const fix = (t: string) => (/^Intel/.test(f.name) || !/AMD|Ryzen/.test(f.name) ? t.replace(/Wraith Stealth cooler in the box/, "A cooler in the box") : t);
  const pros = [...schema.fields.map((fd) => (!missing(f.specs[fd.key]) ? fd.strength?.(f.specs[fd.key]!) : undefined)).filter(Boolean) as string[], ...f.notes.filter((n) => !/\bhere\b/.test(n)).map((n) => cap(n.replace(/^an? /, "")))].map(fix);
  const cons = [...(schema.fields.map((fd) => (!missing(f.specs[fd.key]) ? fd.weakness?.(f.specs[fd.key]!) : undefined)).filter(Boolean) as string[]), ...extraCons(role, b, f)];
  const toks = (t: string) => new Set(t.toLowerCase().match(/[a-z0-9]{5,}/g) ?? []);
  const overlap = (a: string, b: string) => { const A = toks(a), B = toks(b); let n = 0; for (const x of A) if (B.has(x)) n++; return n; };
  const dedupe = (xs: string[], min: number) => { const out: string[] = []; for (const x of xs.map((y) => y.trim())) if (!out.some((o) => overlap(o, x) >= min || (overlap(o, x) >= 1 && Math.min(toks(o).size, toks(x).size) <= 1))) out.push(x); return out; };
  const c0 = dedupe(cons, 2);
  const uniq = (xs: string[]) => dedupe(xs, 3).filter((p) => !c0.some((c) => overlap(c, p) >= 2));
  const specs = schema.fields.map((fd) => (f.specs[fd.key] !== undefined ? `${fd.label}: ${fd.fmt(f.specs[fd.key]!)}` : "")).filter(Boolean);
  const c = c0;
  if (c.length < 2) c.push(`At ${pct(f, total)}% of the parts total, a swap here moves the whole budget`);
  if (c.length < 2) c.push("Every figure comes from the maker's listing, not from our own testing");
  return { pros: uniq(pros), cons: c, specs };
}
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const SENT = /\b(leave|leaves|is|are|takes|needs|calls|has|have|does|ships|runs|means|fills|relies|tops|gives)\b/;

/* ---------------------------------------------------------------- the guide */

export function composeBuild(plan: BuildPlan, parts: Record<string, string>, copy: BuildCopy, all: { plan: BuildPlan; total: number }[]): BestGuide {
  const b = buildFromParts(parts);
  const checks = checkBuild(b, plan.slug);
  const bad = checks.filter((c) => !c.ok);
  if (bad.length) throw new Error(`builds31 ${plan.slug}: failed checks ${bad.map((c) => c.id + ": " + c.note).join("; ")}`);
  const total = totalPrice(b);
  if (total > plan.budget) throw new Error(`builds31 ${plan.slug}: total ${total.toFixed(0)} over budget ${plan.budget}`);
  const [lo, hi] = band(total);
  const swaps = swapsFor(b);
  const gpu = b.gpu;
  const partList = ORDER.filter((r) => partOf(b, r)).map((r) => ({ role: r, f: partOf(b, r)! }));
  const nParts = partList.length;
  const tier = plan.seo.replace(/^Best /, "");

  const products: BestProduct[] = partList.map(({ role, f }, i) => {
    const schema = schemaFor(role, b);
    const take = useTake(contextFree(TAKES[f.asin])) ?? autoTake(f, schema);
    const dets = detailsFor(role, f, checks);
    const sw = swaps.filter((s) => s.role === role);
    const swapSentences = sw.map((s) => V(`${plan.slug}${f.asin}${s.alt.asin}`, [
      `${s.cheaper ? "To spend less" : "To spend more"}, the ${s.alt.short} is ${diffWords(f, s.alt, role)}.`,
      `${s.cheaper ? "A cheaper route" : "A step up"} is the ${s.alt.short}: ${diffWords(f, s.alt, role)}.`,
      `If the budget ${s.cheaper ? "is tighter" : "allows more"}, the ${s.alt.short} offers ${diffWords(f, s.alt, role)}.`,
    ]));
    const { pros, cons, specs } = proCon(role, b, f, total);
    const confirm = dets.filter((c) => c.confirm).length;
    const paras = [
      take,
      `${roleFacts(role, b, f, total)} ${copy.roles?.[role] ?? ""}`.trim(),
      [...dets.slice(0, 3).map((c) => c.detail), ...swapSentences.slice(0, 1)].join(" "),
    ].filter(Boolean);
    let desc = paras.join("\n\n");
    if (words(desc) < 100 && swapSentences[1]) desc += ` ${swapSentences[1]}`;
    if (words(desc) < 100) {
      const rank = [...partList].sort((a, c) => price(c.f) - price(a.f)).findIndex((x) => x.f.asin === f.asin) + 1;
      const ord = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"][rank - 1];
      desc += " " + V(`${plan.slug}${f.asin}p`, [
        `By price it is the ${ord} largest of the ${NUMW[nParts] ?? nParts} parts (${priceBucket(price(f))} when we checked), which is about ${pct(f, total)}% of the total.`,
        `Ranked by cost it comes ${ord} among the ${NUMW[nParts] ?? nParts} parts, in the ${priceBucket(price(f))} range, so a change here shifts roughly ${pct(f, total)}% of the budget.`,
        `In the ${priceBucket(price(f))} band, it is the ${ord} biggest of the ${NUMW[nParts] ?? nParts} lines, and a different pick would move about ${pct(f, total)}% of the total.`,
      ]);
    }
    if (words(desc) < 100 && WHY_EXTRA[f.asin]) desc += ` ${WHY_EXTRA[f.asin]}`;
    const lab = ROLE_BADGE[role];
    const lead = f.notes.find((n) => !/\bhere\b/.test(n)) ?? pros[0] ?? f.short;
    const con0 = cons[0].replace(/\.$/, "");
    const skip = /^(At \d+%|Every figure)/.test(con0) ? `Skip it if you would rather put that ${pct(f, total)}% of the budget elsewhere.` : SENT.test(con0) ? `Skip it if ${lc(con0)}.` : `Skip it if this is a dealbreaker: ${lc(con0)}.`;
    const nChecks = dets.length;
    return {
      id: f.asin.toLowerCase(), rank: i + 1, badge: lab, name: f.name, asin: f.asin, price: f.price ?? "", imageUrl: f.img ?? "",
      amazonUrl: `https://www.amazon.com/dp/${f.asin}`,
      summary: `${cap(lead.replace(/^an? /, ""))}.`,
      description: desc,
      bestFor: `Buyers assembling a ${copy.purpose} who care about ${lc(lead.replace(/^an? /, ""))}.`,
      skipIf: skip,
      specs,
      pros: (pros.length >= 3 ? pros : [...pros, `${nChecks === 1 ? "Passes the one compatibility check that names it" : `Passes ${nChecks} compatibility checks that name it`} in this build`, `Takes ${pct(f, total)}% of the parts total${confirm ? "" : ", and every figure it is checked on is stated in its listing"}`]).slice(0, 4),
      cons: cons.slice(0, 3),
    };
  });

  const shareRows = partList.map(({ role, f }) => [ROLE_BADGE[role], f.short, `${pct(f, total)}%`, priceBucket(price(f))]);
  const checkRows = checks.map((c) => [c.label, c.parts, c.confirm ? `Confirm: ${c.note}` : c.note]);
  const flagged = checks.filter((c) => c.confirm);
  const swapIntro = V(plan.slug + "si", [
    "Each swap below was re-run through the same checks, so it fits the rest of this build without a new case, board or power supply.",
    "These swaps keep every row of the compatibility table passing, so the case, board and power supply stay as they are.",
    "We re-ran the compatibility checks for each swap, and each one passes with the other parts unchanged.",
    "Every swap here was tested against the same rules as the build itself, and none of them forces another part to change.",
  ]);
  const howToChoose: HowToChooseSection[] = [
    {
      subheading: "Compatibility check",
      intro: `We ran ${checks.length} checks on these ${NUMW[nParts] ?? nParts} parts, and the ${tier} passes every one using the figures in the makers' listings. ${flagged.length ? `${flagged.length === 1 ? "One row asks" : `${cap(NUMW[flagged.length] ?? String(flagged.length))} rows ask`} you to confirm a figure the listing does not give: ${listJoin(flagged.map((c) => lc(c.label)))}.` : "Every row rests on a figure the listings state."}`,
      table: { headers: ["Check", "Parts", "Result"], rows: checkRows },
      note: V(plan.slug + "cn", [
        "A pass means the listed figures agree with each other. Confirm BIOS version, cable lengths and clearances on the makers' pages before you order.",
        "Listings can be wrong or incomplete, so treat each row as a first filter and confirm the BIOS version and clearances on the makers' pages.",
        "These rows compare published figures only. Before ordering, read the board's BIOS notes and the case manual for anything a listing leaves out.",
        "The table checks what the listings state. The board's CPU support list and the case manual still have the final word on BIOS and clearance.",
      ]),
    },
    {
      subheading: "Where the budget goes",
      intro: `Together the parts landed between ${money(lo)} and ${money(hi)} at the time of writing, inside the ${money(plan.budget)} tier.`,
      table: { headers: ["Part", "Pick", "Share of parts total", "Price tier at the time of writing"], rows: shareRows },
    },
    ...(swaps.length ? [{
      subheading: "Swap options that stay compatible",
      intro: swapIntro,
      table: { headers: ["If you want to", "Swap in", "What changes"], rows: swaps.map((s) => [s.label, s.alt.short, diffWords(partOf(b, s.role)!, s.alt, s.role)]) },
    }] : []),
  ];

  const sock = str(b.cpu, "socket");
  const upgrade: Record<string, string> = {
    AM4: "AM4 is a final-generation socket, so the best chips for it are already on sale and the upgrade path ends there.",
    AM5: "AM5 has taken several processor generations, so a later Ryzen can drop into the same board after a BIOS update.",
    LGA1700: "LGA1700 takes 12th, 13th and 14th Gen Core chips only, so it is a platform you buy for what it is today.",
    LGA1851: "LGA1851 takes Core Ultra 200S processors, so check Intel's roadmap before counting on a drop-in upgrade.",
  };
  const ddrRatio = (() => {
    const med = (xs: number[]) => { const s = [...xs].sort((a, c) => a - c); return s[Math.floor(s.length / 2)]; };
    const kit = (gen: string, c: number) => Object.values(GROUPS.ram.facts).filter((f) => str(f, "gen") === gen && num(f, "capacity") === c && price(f) < Infinity).map(price);
    const c = num(b.ram, "capacity") ?? 16;
    const a = kit("DDR5", c), d = kit("DDR4", c);
    return a.length >= 3 && d.length >= 3 ? med(a) / med(d) : undefined;
  })();
  const ramNote = ddrRatio ? `Among the ${num(b.ram, "capacity")}GB kits we reviewed, the typical DDR5 kit cost about ${ddrRatio.toFixed(1)} times the typical DDR4 kit at the time of writing.` : "";
  const gpuCheck = checks.find((c) => c.id === "gpu-length");
  const psuCheck = checks.find((c) => c.id === "psu-watts");
  const coolerCheck = checks.find((c) => c.id === "cooler-case");
  const top3 = [...partList].sort((a, c) => price(c.f) - price(a.f)).slice(0, 3);
  const buyingCriteria = [
    { criterion: "Platform and upgrade path", explanation: `${b.cpu.short} and ${b.mb.short} use ${sock} with ${str(b.ram, "gen")} memory. ${upgrade[sock] ?? ""} ${ramNote}`.trim() },
    { criterion: gpu ? "Power supply headroom" : "Power supply sizing", explanation: psuCheck ? psuCheck.detail : `The ${b.psu.short} is ${psuWatts(b.psu)}W. With integrated graphics and no card, the processor and drives are the only sizeable loads, so the supply has room to spare.` },
    { criterion: "Case fit", explanation: [gpuCheck?.detail, coolerCheck?.detail, checks.find((c) => c.id === "form")?.detail].filter(Boolean).join(" ") },
    { criterion: "Cooling", explanation: b.cooler ? `The ${b.cooler.short} is ${isAio(b.cooler) ? "a closed-loop liquid cooler" : "a tower air cooler"} for a processor with ${num(b.cpu, "tdp") ? `a ${num(b.cpu, "tdp")}W rating` : "no rating stated in its listing"}. ${checks.find((c) => c.id === "cooler-socket")?.detail ?? ""}` : `The ${b.cpu.short} includes a cooler in the box, which is enough at its ${num(b.cpu, "tdp") ? `${num(b.cpu, "tdp")}W` : "rated"} power; add a tower cooler later only if fan noise bothers you.` },
    { criterion: "Storage", explanation: `The ${b.ssd.short} is ${str(b.ssd, "pcie") || "an NVMe drive"} and the ${b.mb.short} ${num(b.mb, "m2") ? `has ${plural(num(b.mb, "m2")!, "M.2 slot")}${num(b.mb, "m2")! > 1 ? ", so a second drive fits later" : ""}` : "needs its M.2 slot confirmed in the manual"}.` },
    { criterion: "Where the money goes", explanation: `The three largest lines are ${listJoin(top3.map(({ role, f }) => `${ROLE_BADGE[role].toLowerCase()} (${pct(f, total)}%)`))}. ${copy.budgetNote ?? ""}`.trim() },
  ].filter((c) => c.explanation);

  const outputs = gpu && str(gpu, "outputs") ? `The ${gpu.short} lists ${str(gpu, "outputs")}.` : "";
  const faq = [
    ...(gpu ? [{ q: `Will the ${gpu.short} fit in the ${b.case.short}?`, a: gpuCheck!.detail }] : []),
    { q: gpu ? `Is ${psuWatts(b.psu)}W enough for the ${gpu.short}?` : `Is the ${b.psu.short} enough without a graphics card?`, a: psuCheck ? psuCheck.detail : `Yes, with room to spare: the ${b.psu.short} is ${psuWatts(b.psu)}W and this build draws power mainly through the processor and drives.` },
    { q: b.cooler ? `Why add the ${b.cooler.short}?` : `Do I need to buy a CPU cooler?`, a: b.cooler ? `The ${b.cpu.short} ${b.cpu.specs.cooler === true ? "includes a cooler, but this build adds a better one." : "does not include a cooler."} ${coolerCheck?.detail ?? ""}` : `No. The ${b.cpu.short} includes a cooler in the box, and the build uses it.` },
    { q: `Why ${str(b.ram, "gen")} and ${num(b.ram, "capacity")}GB of memory?`, a: `${checks.find((c) => c.id === "memory")!.detail} ${ramNote}` },
    { q: "Can I upgrade this build later?", a: `${upgrade[sock] ?? ""} The ${b.case.short} ${num(b.case, "rad") ? `takes up to a ${num(b.case, "rad")}mm radiator` : "has the clearances listed above"}, and the ${b.mb.short} ${num(b.mb, "m2") ? `has ${plural(num(b.mb, "m2")!, "M.2 slot")}` : "has M.2 storage slots"}.` },
    { q: "What is not included in the total?", a: V(plan.slug + "nt", [
      `The total covers the ${NUMW[nParts] ?? nParts} listed parts only. An operating system, monitor, keyboard, mouse, tax and shipping are extra, and they vary by buyer.`,
      `Only the ${NUMW[nParts] ?? nParts} parts above are counted. Windows, a monitor, input devices, tax and shipping are not, so budget for them separately.`,
      `Count the ${NUMW[nParts] ?? nParts} parts in this guide and nothing else: no operating system, display, keyboard or mouse, and no tax or shipping.`,
      `The figure we quote is for the ${NUMW[nParts] ?? nParts} parts only, so a display, peripherals, Windows and delivery costs come on top.`,
    ]) },
    ...(copy.faq ?? []),
    ...(outputs && plan.outputs ? [{ q: "How many monitors can it drive?", a: `${outputs} That is ${plan.outputs} or more outputs, enough for a four-screen desk; older monitors may need an adapter.` }] : []),
  ].filter((q) => q.a).slice(0, 7).map((q) => ({ q: q.q, a: q.a.replace(/\s+/g, " ").trim() }));

  const labels3 = checks.map((c) => lc(c.label));
  const method = V(plan.slug + "m", [
    `Every part below comes from a reviewed fact sheet, and the guide runs ${checks.length} compatibility rules on the set, starting with ${listJoin(labels3.slice(0, 3))}. The parts together landed between ${money(lo)} and ${money(hi)} at the time of writing; nothing here was assembled or benchmarked by us.`,
    `We chose these ${NUMW[nParts] ?? nParts} parts from reviewed listings and ran ${checks.length} checks across them, among them ${listJoin(labels3.slice(0, 3))}. At the time of writing the full set cost between ${money(lo)} and ${money(hi)}, and no figure comes from our own testing.`,
    `This is a research build, not a lab build: the parts were picked from the makers' figures and then checked against each other, beginning with ${listJoin(labels3.slice(0, 3))}. The total fell between ${money(lo)} and ${money(hi)} when we checked.`,
    `${cap(NUMW[nParts] ?? String(nParts))} parts, ${checks.length} checks and one total: the set landed between ${money(lo)} and ${money(hi)} at the time of writing. The checks cover ${listJoin(labels3.slice(0, 3))} and the rest of the table below, using maker figures rather than our own tests.`,
  ]);

  const related = [...all].filter((x) => x.plan.slug !== plan.slug).sort((a, c) => Math.abs(a.plan.budget - plan.budget) - Math.abs(c.plan.budget - plan.budget) || (a.plan.form === plan.form ? -1 : 1)).slice(0, 3).map((x) => x.plan.slug);
  const bottom = [
    `Our ${money(plan.budget)} build centres on ${listJoin([gpu ? `the ${gpu.short} (${str(gpu, "chip")})` : "integrated graphics", `the ${b.cpu.short}`, `the ${b.case.short}`])}; ${copy.verdict}`,
    copy.close,
  ];
  const metas = [
    `A ${tier} of ${NUMW[nParts]} parts with socket, memory, power and case fit checked, plus swaps that stay compatible.`,
    `${cap(NUMW[nParts])} parts for a ${copy.purpose}, with socket, memory, PSU and case fit checked and compatible swaps listed.`,
    `${cap(NUMW[nParts])} checked parts for a ${copy.purpose}: socket, memory, power-supply and case fit verified from listed figures.`,
    `A ${money(plan.budget)} ${copy.purpose}: ${NUMW[nParts]} parts, ${checks.length} compatibility checks and swaps that keep every check passing.`,
  ];
  const metaDescription = metas.find((m) => m.length >= 120 && m.length <= 160) ?? (() => { throw new Error(`builds31 ${plan.slug}: meta lengths ${metas.map((m) => m.length)}`); })();
  if (plan.seo.length > 43) throw new Error(`builds31 ${plan.slug}: seo ${plan.seo.length}`);
  return {
    slug: plan.slug, type: "best-guide", status: "published", category: "pc-builds", seoTitle: plan.seo, title: `The ${plan.seo}`, breadcrumbLabel: plan.seo, mainKeyword: plan.kw,
    dek: `${cap(NUMW[nParts])} parts for a ${copy.purpose}, each checked against the others for socket, memory, power and case fit.`, metaDescription,
    teaser: copy.lead.split(/(?<=\.)\s/)[0], updatedAt: UPDATED, readTime: `${9 + Math.round(nParts / 2)} min read`,
    introParagraphs: [copy.lead, method], products,
    howWeEvaluated: [
      { title: "Compatibility rules", description: V(plan.slug + "cr", [
        `We ran ${checks.length} checks across the parts: ${listJoin(labels3)}.`,
        `The set was tested on paper against ${checks.length} rules (${listJoin(labels3)}) and passes all of them.`,
        `${cap(NUMW[checks.length] ?? String(checks.length))} rules decide whether these parts work together: ${listJoin(labels3)}. Every one passes.`,
      ]) },
      { title: "Price at the time of writing", description: `The parts landed between ${money(lo)} and ${money(hi)} together, inside the ${money(plan.budget)} tier. Prices change daily, so the total can drift.` },
      { title: "Maker figures, not testing", description: V(plan.slug + "mf", [
        "Specifications come from each maker's listing and the chip makers' published power recommendations; we did not build or benchmark this system.",
        "Every figure is a published one, from the listings and the chip makers' power guidance. This guide reports no hands-on build or benchmark.",
        "We worked from what the makers state, plus the chip makers' recommended power figures, and ran no build or benchmark of our own.",
        "The inputs are listing specifications and chip-maker power recommendations; we have not built this machine or measured it.",
      ]) },
      { title: "Headroom", description: gpu ? `The ${b.psu.short} keeps ${psuWatts(b.psu) - gpuRecPsu(gpu)}W above the ${gpuRecPsu(gpu)}W the graphics chip's maker recommends.` : `The ${b.psu.short} is ${psuWatts(b.psu)}W for a system without a graphics card, well above what its parts draw.` },
    ],
    buyingCriteria, howToChoose, faq, bottomLine: bottom, related: [...related, "best-power-supplies", "best-pc-cases"].slice(0, 4),
  };
}

export function allPlansWithTotals(): { plan: BuildPlan; total: number }[] {
  return PLANS.filter((p) => BUILD_PARTS[p.slug]).map((p) => ({ plan: p, total: totalPrice(buildFromParts(BUILD_PARTS[p.slug])) }));
}
export function composeAllBuilds(): BestGuide[] {
  const all = allPlansWithTotals();
  return all.filter(({ plan }) => BUILD_COPY[plan.slug]).map(({ plan }) => composeBuild(plan, BUILD_PARTS[plan.slug], BUILD_COPY[plan.slug], all));
}
