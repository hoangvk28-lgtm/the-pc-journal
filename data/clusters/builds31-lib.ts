import type { Fact } from "@/lib/pc-compose/generic";
import { hash } from "@/lib/pc-compose/seed";
import { GROUPS } from "./batch17-groups";
import { mb31Facts } from "@/data/categories/builds31-parts";
import { extra31Facts } from "@/data/categories/builds31-extra";

/**
 * Batch 31: PC build guides. A build is a set of reviewed fact sheets (one per role) that must pass the checks below.
 * The same checks produce the compatibility table and FAQ in each guide, and a build that fails one throws at import,
 * so no published guide can contain a mismatch the data can see.
 */
export type Role = "cpu" | "cooler" | "mb" | "ram" | "ssd" | "gpu" | "psu" | "case";
export interface Build { cpu: Fact; cooler?: Fact; mb: Fact; ram: Fact; ssd: Fact; ssd2?: Fact; gpu?: Fact; psu: Fact; case: Fact; coolerKind?: "air" | "aio" }

export const FACTS: Record<string, Fact> = {
  ...GROUPS.cpu.facts, ...GROUPS.gpu.facts, ...GROUPS.mb.facts, ...mb31Facts, ...GROUPS.ram.facts, ...GROUPS.ssd.facts,
  ...GROUPS.psu.facts, ...GROUPS.pcCase.facts, ...GROUPS.air.facts, ...GROUPS.aio.facts, ...extra31Facts,
};
export const isAio = (f: Fact) => f.asin in GROUPS.aio.facts || (f.asin in extra31Facts && /\b(120|140|240|280|360|420)\b.*(aio|liquid)|liquid|aio/i.test(f.name));

export const price = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const num = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : undefined);
const str = (f: Fact, k: string) => (f.specs[k] === undefined ? "" : String(f.specs[k]));

/* ------------------------------------------------------------------ normalised views */

/** Board size rank: Mini-ITX 1, Micro-ATX 2, ATX 3, E-ATX 4. */
export function formRank(s: string): number {
  if (/E-ATX|EATX|SSI/i.test(s)) return 4;
  if (/(^|[^a-z])(micro|m)-?ATX/i.test(s) || /mATX/i.test(s)) return 2;
  if (/ATX/i.test(s)) return 3;
  if (/ITX/i.test(s)) return 1;
  return 0;
}
/** Largest board a case lists support for ("mATX, ITX" -> 2, "ATX" -> 3), or 0 when not stated. */
export function caseMaxBoard(f: Fact): number {
  const raw = str(f, "boards");
  if (!raw) return 0;
  // "mATX, Mini-ITX (no ATX ...)": a parenthetical rules sizes out; "with a longer riser" is not native support.
  const s = raw.replace(/\([^)]*\)/g, "").replace(/;.*riser.*$/i, "");
  const top = Math.max(...s.split(/[,;]|\bto\b|\bup to\b/i).map((t) => formRank(t.trim())), 0);
  return /up to 11 inches/i.test(s) ? Math.min(top, 3) : top;
}
export const boardForm = (f: Fact) => formRank(str(f, "form"));
export const FORM_NAME = ["", "Mini-ITX", "Micro-ATX", "ATX", "E-ATX"];

export function memGens(f: Fact): string[] {
  const m = str(f, "memory") || str(f, "mem");
  if (/DDR4/.test(m) && /DDR5/.test(m)) return ["DDR4", "DDR5"];
  if (/DDR4/.test(m)) return ["DDR4"];
  if (/DDR5/.test(m)) return ["DDR5"];
  const s = str(f, "socket");
  if (s === "AM5" || s === "LGA1851") return ["DDR5"];
  if (s === "AM4") return ["DDR4"];
  return [];
}

/** Maker-recommended system power by GPU chip (NVIDIA, AMD and Intel reference specifications). A listing figure above this wins. */
export const CHIP_PSU: Record<string, number> = {
  "RTX 5050": 450, "RTX 5060": 550, "RTX 5060 Ti": 600, "RTX 5070": 650, "RTX 5070 Ti": 750, "RTX 5080": 850, "RTX 5090": 1000,
  "RTX 4060": 550, "RTX 4060 Ti": 550, "RTX 4070": 650, "RTX 4070 Super": 650, "RTX 4070 Ti": 700, "RTX 4070 Ti Super": 700, "RTX 4080": 750, "RTX 4080 Super": 750, "RTX 4090": 850, "RTX 3050": 550,
  "RX 9060 XT": 450, "RX 9070 GRE": 650, "RX 9070": 650, "RX 9070 XT": 750, "RX 7600": 550, "RX 7600 XT": 600, "RX 7700 XT": 700, "RX 7800 XT": 700, "RX 7900 XT": 750, "RX 7900 XTX": 800, "RX 6600": 450, "RX 6500 XT": 400,
  "Arc B570": 550, "Arc B580": 600, "Arc A580": 600,
};
/** Rough performance order of GPU chips, for choosing a card at a budget. Not a benchmark claim. */
export const CHIP_ORDER = ["RX 6500 XT", "RTX 3050", "Arc A580", "RTX 5050", "RX 7600", "Arc B570", "RTX 4060", "Arc B580", "RTX 5060", "RX 7600 XT", "RX 9060 XT", "RTX 4060 Ti", "RTX 5060 Ti", "RX 7700 XT", "RX 7800 XT", "RTX 4070", "RX 9070 GRE", "RTX 5070", "RTX 4070 Super", "RX 9070", "RTX 4070 Ti", "RX 7900 XT", "RTX 4070 Ti Super", "RX 9070 XT", "RTX 5070 Ti", "RX 7900 XTX", "RTX 4080", "RTX 4080 Super", "RTX 5080", "RTX 4090", "RTX 5090"];
export const chipRank = (f: Fact) => CHIP_ORDER.indexOf(str(f, "chip"));
export function gpuRecPsu(f: Fact): number {
  return Math.max(num(f, "psu") ?? 0, CHIP_PSU[str(f, "chip")] ?? 0);
}
export const gpuLength = (f: Fact) => num(f, "length");
export const psuWatts = (f: Fact) => num(f, "watts") ?? 0;
/** Extra watts the build keeps above the maker's recommendation. */
export const PSU_HEADROOM = 100;

export function coolerSupports(c: Fact, socket: string): "yes" | "generic" | "no" | "unknown" {
  const s = str(c, "sockets");
  if (!s) return "unknown";
  if (s.includes(socket)) return "yes";
  if (/^LGA/.test(socket) && /Intel/i.test(s)) return "generic";
  return "no";
}
export function aioRadSize(f: Fact): number | undefined {
  const r = num(f, "rad");
  if (r) return r;
  const m = f.name.match(/\b(120|240|280|360|420)(?:mm)?\b/);
  return m ? Number(m[1]) : undefined;
}
export const caseGpuMax = (f: Fact) => num(f, "gpu");
export const caseCoolerMax = (f: Fact) => num(f, "cooler");
export const caseRadMax = (f: Fact) => num(f, "rad");
/** Power supply formats a case lists, or [] when it does not say. */
export function casePsuForms(f: Fact): string[] {
  const s = str(f, "psu");
  if (!s) return [];
  const out: string[] = [];
  if (/SFX-L/i.test(s)) out.push("SFX-L");
  if (/SFX(?!-L)/i.test(s)) out.push("SFX");
  if (/\bATX\b/i.test(s)) out.push("ATX");
  return out;
}
export const ramGen = (f: Fact) => str(f, "gen");

/* ------------------------------------------------------------------ checks */

export interface Check {
  id: string; label: string; parts: string; ok: boolean;
  /** True when the listings do not give a figure the check needs, so the reader must confirm it. */
  confirm: boolean;
  note: string; detail: string;
}

const join = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const V = (seed: string, id: string, xs: string[]) => xs[hash(`${seed}:${id}`) % xs.length];
const an = (s: string) => (/^(RX|RTX|Arc|[AEIOU])/.test(s) ? "an" : "a");
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;

export function checkBuild(b: Build, seed = ""): Check[] {
  const out: Check[] = [];
  const add = (id: string, label: string, parts: string, ok: boolean, confirm: boolean, note: string, detail: string) => out.push({ id, label, parts, ok, confirm, note, detail });
  const cs = str(b.cpu, "socket"), ms = str(b.mb, "socket");
  const C = b.cpu.short, M = b.mb.short;
  add("socket", "CPU socket", `${C} + ${M}`, cs === ms && !!cs, false, cs === ms ? `Both use ${cs}.` : `${C} is ${cs}, the board is ${ms}.`,
    V(seed, "socket", [
      `The ${C} uses the ${cs} socket and the ${M} board uses ${ms}, so the processor seats in the board directly. Read the board's CPU support list for the BIOS version this chip needs.`,
      `${cs} is the socket on both the ${C} and the ${M}, which is the first thing that has to match. The board maker's support list names the BIOS version this processor needs.`,
      `Both the ${C} and the ${M} are ${cs}, so the chip fits the board without adapters. A newer processor on an older board can need a BIOS update, so the support list is worth a look.`,
    ]));
  const cg = memGens(b.cpu), mg = memGens(b.mb), rg = ramGen(b.ram);
  const memOk = !!rg && cg.includes(rg) && mg.includes(rg);
  add("memory", "Memory type", `${b.ram.short} + ${M} + ${C}`, memOk, false, memOk ? `${rg} on all three.` : `Mismatch: RAM ${rg}, board ${mg.join("/")}, CPU ${cg.join("/")}.`,
    V(seed, "memory", [
      `The ${M} takes ${mg.join(" or ")} and the ${C} supports ${cg.join(" or ")}, so the ${b.ram.short} kit in ${rg} is the matching type. DDR4 and DDR5 sticks are keyed differently, so the wrong type will not seat.`,
      `${rg} is what the ${M} and the ${C} share, and the ${b.ram.short} kit is ${rg}. The two memory generations do not fit each other's slots, so this is a hard match rather than a preference.`,
      `The ${b.ram.short} is a ${rg} kit, the type both the ${M} (${mg.join(" or ")}) and the ${C} (${cg.join(" or ")}) accept. A kit of the other generation would not physically fit the board.`,
    ]));
  const cap = num(b.ram, "capacity");
  if (cap) add("capacity", "Memory kit", b.ram.short, true, false, `${cap}GB in two sticks.`, V(seed, "cap", [
    `The ${b.ram.short} totals ${cap}GB in two sticks, so fit them in the slot pair the board manual names for dual-channel operation.`,
    `${cap}GB arrives as two sticks in the ${b.ram.short} kit; the ${b.mb.short} manual shows which two slots to fill so the memory runs in dual-channel.`,
    `Because the ${b.ram.short} is a two-stick ${cap}GB kit, the board manual's dual-channel slot pair is where it goes.`,
  ]));
  const m2 = num(b.mb, "m2");
  add("m2", "M.2 slot for the SSD", `${b.ssd.short} + ${M}`, m2 === undefined ? true : m2 >= 1, m2 === undefined, m2 === undefined ? "Check the board manual: the listing gives no M.2 count." : `${plural(m2, "M.2 slot")} on the board.`,
    m2 === undefined ? `The listing for the ${M} gives no M.2 slot count, so confirm the slot type in its manual before ordering the ${b.ssd.short}.` : V(seed, "m2", [
      `The ${M} lists ${plural(m2, "M.2 slot")}, so the ${b.ssd.short} has a home${m2 > 1 ? " and a second drive can follow" : ""}. The manual says which slot runs at full PCIe speed.`,
      `${plural(m2, "M.2 slot")} on the ${M} means the ${b.ssd.short} plugs in without an adapter${m2 > 1 ? ", with a slot spare for later" : ""}; check the manual for the slot that gets the fastest lanes.`,
    ]));
  const bf = boardForm(b.mb), cm = caseMaxBoard(b.case);
  add("form", "Board size in the case", `${M} + ${b.case.short}`, cm > 0 && bf > 0 && bf <= cm, cm === 0, cm ? `${FORM_NAME[bf]} board; the case lists ${str(b.case, "boards")}.` : "Case lists no board sizes.",
    cm ? V(seed, "form", [
      `The ${M} is a ${FORM_NAME[bf]} board and the ${b.case.short} lists ${str(b.case, "boards")}, so the board mounts on the standoffs without adapters.`,
      `${FORM_NAME[bf]} is the ${M}'s size, and the ${b.case.short} lists ${str(b.case, "boards")}, so the board has a place on its tray.`,
    ]) : `The ${b.case.short} listing gives no board sizes, so confirm that it takes ${FORM_NAME[bf]} before ordering.`);
  if (b.gpu) {
    const G = b.gpu.short, K = b.case.short;
    const gl = gpuLength(b.gpu), cgm = caseGpuMax(b.case);
    const ok = gl !== undefined && cgm !== undefined ? gl <= cgm : true;
    add("gpu-length", "Graphics card length", `${G} + ${K}`, ok, gl === undefined || cgm === undefined,
      gl !== undefined && cgm !== undefined ? `${gl}mm card, ${cgm}mm limit.` : cgm !== undefined ? `Card length not listed; case limit ${cgm}mm.` : "Neither length is listed.",
      gl !== undefined && cgm !== undefined ? V(seed, "gl", [
        `The ${G} is listed at ${gl}mm and the ${K} takes cards up to ${cgm}mm, which leaves ${cgm - gl}mm before a front fan or radiator.`,
        `${cgm}mm is the longest card the ${K} lists, and the ${G} is ${gl}mm, so there are ${cgm - gl}mm to spare.`,
      ]) : cgm !== undefined ? `The ${K} takes cards up to ${cgm}mm. The listing for the ${G} gives no length, so compare the card's spec page with that limit before ordering.` : `Neither the ${G} nor the ${K} lists a length, so compare both makers' spec pages before ordering.`);
    const rec = gpuRecPsu(b.gpu), w = psuWatts(b.psu);
    add("psu-watts", "Power supply wattage", `${b.psu.short} + ${G}`, w >= rec + PSU_HEADROOM, false, `${w}W unit, ${rec}W recommended for the card.`,
      V(seed, "pw", [
        `The ${G} is ${an(str(b.gpu, "chip"))} ${str(b.gpu, "chip")} card, and its chip maker recommends a ${rec}W system power supply. The ${b.psu.short} is ${w}W, which leaves ${w - rec}W for the processor, drives and fans.`,
        `For ${an(str(b.gpu, "chip"))} ${str(b.gpu, "chip")} card the recommended supply is ${rec}W, and the ${b.psu.short} offers ${w}W, a margin of ${w - rec}W above that figure.`,
        `${rec}W is the system power the ${str(b.gpu, "chip")} maker recommends, so the ${w}W ${b.psu.short} has ${w - rec}W in hand for everything else in the case.`,
      ]));
    const hp = num(b.psu, "hpwr") ?? 0, p8 = num(b.psu, "pcie8");
    const conn = str(b.gpu, "power");
    const nw = ["no", "one", "two", "three", "four"];
    const psuConn = `${hp ? `${nw[hp] ?? hp} 12V-2x6 connector${hp > 1 ? "s" : ""}` : "no 12V-2x6 connector"}${p8 ? ` and ${nw[p8] ?? p8} PCIe 8-pin leads` : ""}`;
    add("psu-connector", "Graphics power connector", `${b.psu.short} + ${G}`, true, !conn,
      conn ? `Card lists ${conn}; the PSU lists ${psuConn}.` : `Card connector not listed; the PSU lists ${psuConn}.`,
      conn ? `The ${G} lists ${conn}, and the ${b.psu.short} lists ${psuConn}, so match the cable to the card's socket.` : `The listing for the ${G} does not name its power connector, while the ${b.psu.short} lists ${psuConn}. Check the card's page for 8-pin or 12V-2x6 and count the leads you need.`);
  } else {
    add("igpu", "Display output without a graphics card", C, b.cpu.specs.igpu === true, false, b.cpu.specs.igpu === true ? "Integrated graphics listed." : "No integrated graphics listed.",
      V(seed, "ig", [
        `The ${C} lists integrated graphics, so the monitor plugs into the motherboard's video output and the build needs no graphics card. Check that the board's HDMI or DisplayPort matches your monitor.`,
        `Integrated graphics on the ${C} drive the display through the ${M}'s own HDMI or DisplayPort, so there is no card to buy; match the port to your monitor's input first.`,
      ]));
  }
  const pf = str(b.psu, "form") || "ATX", cpf = casePsuForms(b.case);
  const pfOk = cpf.length ? cpf.includes(pf) || (pf === "SFX" && cpf.includes("SFX-L")) : pf === "ATX";
  add("psu-form", "Power supply format", `${b.psu.short} + ${b.case.short}`, pfOk, !cpf.length, cpf.length ? `${pf} unit; the case lists ${str(b.case, "psu")}.` : `${pf} unit; the case lists no PSU type.`,
    cpf.length ? `The ${b.psu.short} is a ${pf} unit and the ${b.case.short} lists ${str(b.case, "psu")}, so the supply has a mount${num(b.case, "psuLen") ? ` within the ${num(b.case, "psuLen")}mm length limit` : ""}.` : `The ${b.psu.short} is a standard ${pf} unit, and the ${b.case.short} listing does not name a power supply type${num(b.case, "psuLen") ? ` (its length limit is ${num(b.case, "psuLen")}mm)` : ""}, so confirm ${pf} fits in its manual.`);
  if (b.cooler) {
    const aio = isAio(b.cooler), O = b.cooler.short;
    const sup = coolerSupports(b.cooler, cs);
    add("cooler-socket", "Cooler mounting kit", `${O} + ${C}`, sup === "yes" || sup === "generic", sup === "generic", sup === "yes" ? `Listing names ${cs}.` : sup === "generic" ? "Listing says Intel; confirm the LGA bracket." : "Socket not confirmed.",
      sup === "yes" ? V(seed, "cs", [
        `The ${O} lists ${cs} support (${str(b.cooler, "sockets")}), so its mounting kit fits the ${C}.`,
        `${cs} appears in the ${O}'s supported sockets (${str(b.cooler, "sockets")}), so the bracket for the ${C} comes in its box.`,
      ]) : `The ${O} lists ${str(b.cooler, "sockets")}; the listing says Intel without naming ${cs}, so confirm the ${cs} bracket is in the box.`);
    if (aio) {
      const rs = aioRadSize(b.cooler), rm = caseRadMax(b.case);
      add("cooler-case", "Radiator fit", `${O} + ${b.case.short}`, rs !== undefined && rm !== undefined ? rs <= rm : true, rs === undefined || rm === undefined, rs && rm ? `${rs}mm radiator, ${rm}mm limit.` : "Radiator support not listed.",
        rs && rm ? V(seed, "rc", [
          `The ${O} has a ${rs}mm radiator and the ${b.case.short} lists room for up to ${rm}mm, so it mounts at the front or top as the case manual allows. Check clearance over the memory if it goes on top.`,
          `${rm}mm is the largest radiator the ${b.case.short} lists, and the ${O} needs ${rs}mm, so it fits; a top mount can crowd tall memory, so read the manual for the front mount.`,
        ]) : `The listings do not both give a radiator size, so check the case manual for ${rs ?? "the"}mm radiator support.`);
    } else {
      const h = num(b.cooler, "height"), cm2 = caseCoolerMax(b.case);
      add("cooler-case", "Cooler height", `${O} + ${b.case.short}`, h !== undefined && cm2 !== undefined ? h <= cm2 : true, h === undefined || cm2 === undefined, h && cm2 ? `${h}mm cooler, ${cm2}mm limit.` : h ? `${h}mm cooler; case limit not listed.` : cm2 ? `Cooler height not listed; case limit ${cm2}mm.` : "Neither height is listed.",
        h && cm2 ? V(seed, "ch", [
          `The ${O} stands ${h}mm tall and the ${b.case.short} clears coolers up to ${cm2}mm, which leaves ${cm2 - h}mm to the side panel.`,
          `${cm2}mm is the tallest cooler the ${b.case.short} lists, and the ${O} is ${h}mm, so the panel closes with ${cm2 - h}mm to spare.`,
        ]) : h ? `The ${O} stands ${h}mm tall, but the ${b.case.short} listing gives no cooler height limit, so check the case page for that figure before ordering.` : cm2 ? `The ${b.case.short} clears coolers up to ${cm2}mm; the ${O} listing gives no height, so check the maker's page against that limit.` : "Neither listing gives a height figure, so check the cooler maker's page against the case's limit.");
    }
  } else if (b.cpu.specs.cooler !== true) {
    add("cooler-box", "CPU cooler", C, false, false, "No cooler in the box and none chosen.", "A cooler is needed.");
  }
  return out;
}

export function totalPrice(b: Build): number {
  return [b.cpu, b.cooler, b.mb, b.ram, b.ssd, b.ssd2, b.gpu, b.psu, b.case].filter(Boolean).reduce((s, f) => s + price(f!), 0);
}
export const roles = (b: Build): [string, Fact][] => ([["Processor", b.cpu], ["CPU Cooler", b.cooler], ["Motherboard", b.mb], ["Memory", b.ram], ["Storage", b.ssd], ["Second Drive", b.ssd2], ["Graphics Card", b.gpu], ["Power Supply", b.psu], ["Case", b.case]] as [string, Fact | undefined][]).filter((x): x is [string, Fact] => !!x[1]);
export { join as joinList };
