/**
 * Batch 31 build planner: resolves data/clusters/builds31-plan.ts into explicit ASINs in data/clusters/builds31.ts.
 * For each plan it tries graphics cards from the strongest chip down (or integrated graphics), and for each card the processors
 * from the strongest down, and keeps the first combination whose parts pass every compatibility check inside the budget with
 * part quality (a percentile of the compatible, reputable parts) of at least qMin. Run: MSYS_NO_PATHCONV=1 npx tsx scripts/pcj-plan-builds.ts [slug...]
 * Reads the previous output so a slug that is not re-planned keeps its parts.
 */
import fs from "node:fs";
import { PLANS, type BuildPlan } from "@/data/clusters/builds31-plan";
import { GROUPS } from "@/data/clusters/batch17-groups";
import { FACTS, price, boardForm, memGens, ramGen, psuWatts, gpuRecPsu, gpuLength, caseMaxBoard, caseGpuMax, caseCoolerMax, caseRadMax, casePsuForms, coolerSupports, aioRadSize, isAio, checkBuild, totalPrice, roles, chipRank, PSU_HEADROOM, type Build } from "@/data/clusters/builds31-lib";
import type { Fact } from "@/lib/pc-compose/generic";

const all = Object.values(FACTS);
const num = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : undefined);
const str = (f: Fact, k: string) => (f.specs[k] === undefined ? "" : String(f.specs[k]));
const ok = (f: Fact) => price(f) < Infinity;
const CASE_OK = /Cooler Master|CORSAIR|Corsair|NZXT|Lian Li|LIAN LI|Fractal|MONTECH|Montech|Phanteks|be quiet|Thermaltake|Antec|JONSBO|Jonsbo|HYTE|ASUS|SSUPD|ARCTIC|Silverstone|SilverStone/;
const PSU_OK = /CORSAIR|Seasonic|be quiet|MSI|Thermaltake|MONTECH|LIAN LI|ASRock|Cooler Master|NZXT|ASUS|FSP|Super Flower/;
const NEW_MB = /^B0(9K4QMPL9|DXWWWTH8|BTTZFQTP|FDLCT35H|BDCZRBD6|H2C1VYZ7|DQLK2RF3|DK7KTY8K)$/;
const re = (s?: string) => (s ? new RegExp(s, "i") : undefined);
const pick = (xs: Fact[], q: number) => { const s = [...xs].sort((a, b) => price(a) - price(b)); return s[Math.min(s.length - 1, Math.round(q * (s.length - 1)))]; };

/** Number of monitor outputs a listing names ("3 x DisplayPort 2.1, 1 x HDMI" -> 4); undefined when not stated. */
export function outputCount(f: Fact): number | undefined {
  const s = str(f, "outputs");
  if (!s) return undefined;
  const parts = s.split(/,|\band\b|\+/).map((t) => t.trim()).filter(Boolean);
  let n = 0;
  for (const p of parts) { const m = p.match(/(\d+)\s*x/i) ?? p.match(/x\s*(\d+)\b/i); n += m ? Number(m[1]) : 1; }
  return n;
}

function fill(p: BuildPlan, cpu: Fact, gpu: Fact | undefined, q: number, m2k: boolean): Build | null {
  const s = str(cpu, "socket");
  const pin = p.pin ?? {};
  const one = (role: string, asin?: string) => (asin ? FACTS[asin] : undefined);
  const mbs = all.filter((f) => (f.asin in GROUPS.mb.facts || NEW_MB.test(f.asin)) && ok(f) && str(f, "socket") === s && boardForm(f) === p.form && memGens(f).includes(p.gen) && memGens(cpu).includes(p.gen) && (num(f, "m2") ?? 1) >= 1 && (!p.mbRe || re(p.mbRe)!.test(f.name)));
  const knownM2 = mbs.filter((f) => num(f, "m2") !== undefined);
  const mb = one("mb", pin.mb) ?? (mbs.length ? pick(m2k && knownM2.length >= 2 ? knownM2 : mbs, q) : undefined);
  if (!mb) return null;
  const rams = Object.values(GROUPS.ram.facts).filter((f) => ok(f) && ramGen(f) === p.gen && num(f, "capacity") === p.ramCap && (num(f, "speed") ?? 0) >= (p.gen === "DDR5" ? 5600 : 3200) && (!p.ramRe || re(p.ramRe)!.test(f.name)));
  const ram = one("ram", pin.ram) ?? (rams.length ? pick(rams, q) : undefined);
  if (!ram) return null;
  const ssds = Object.values(GROUPS.ssd.facts).filter((f) => ok(f) && num(f, "capacity") === p.ssdCap && !/2230|PS5/.test(f.name) && /PCIe [45]/.test(str(f, "pcie")) && !/PCIe 5/.test(str(f, "pcie")) && (!p.ssdRe || re(p.ssdRe)!.test(f.name)));
  const ssd = one("ssd", pin.ssd) ?? (ssds.length ? pick(ssds, q) : undefined);
  if (!ssd) return null;
  const gl = gpu ? gpuLength(gpu) : undefined;
  const need = gpu ? (gl ?? (gpuRecPsu(gpu) >= 750 ? 400 : 380)) : 0;
  const cases = Object.values(GROUPS.pcCase.facts).filter((f) => ok(f) && caseMaxBoard(f) >= p.form && (!gpu || (caseGpuMax(f) ?? (p.looseCase ? need : 0)) >= need) && CASE_OK.test(f.name) && (!p.caseRe || re(p.caseRe)!.test(f.name)) && (p.form !== 1 || (casePsuForms(f).length > 0 && /ITX/i.test(str(f, "boards")))));
  const knownC = p.cooler === "air" ? cases.filter((f) => caseCoolerMax(f) !== undefined) : cases;
  const cs = one("case", pin.case) ?? (cases.length ? pick(knownC.length >= 3 ? knownC : cases, q) : undefined);
  if (!cs) return null;
  let cooler: Fact | undefined = one("cooler", pin.cooler);
  if (p.cooler !== "stock" && !cooler) {
    const cands = all.filter((f) => ok(f) && (p.cooler === "aio" ? isAio(f) : f.asin in GROUPS.air.facts) && ["yes", "generic"].includes(coolerSupports(f, s)) &&
      (p.cooler === "aio" ? aioRadSize(f) !== undefined && aioRadSize(f)! <= (caseRadMax(cs) ?? 0) && (!p.aio || aioRadSize(f) === p.aio) : num(f, "height") !== undefined && (caseCoolerMax(cs) === undefined || num(f, "height")! <= caseCoolerMax(cs)!)) &&
      (p.form === 1 || p.cooler === "aio" || (num(f, "height") ?? 0) >= 140) && (!p.coolerRe || re(p.coolerRe)!.test(f.name)));
    if (!cands.length) return null;
    cooler = pick(cands, q);
  } else if (p.cooler === "stock" && cpu.specs.cooler !== true) return null;
  const rec = gpu ? gpuRecPsu(gpu) : 400;
  const forms = casePsuForms(cs);
  const psus = Object.values(GROUPS.psu.facts).filter((f) => ok(f) && psuWatts(f) >= rec + PSU_HEADROOM && psuWatts(f) <= rec + (p.psuMax ?? 350) && PSU_OK.test(f.name) && (rec < 650 || (num(f, "hpwr") ?? 0) >= 1) && (forms.length ? forms.includes(str(f, "form")) : str(f, "form") === "ATX") && (!p.psuRe || re(p.psuRe)!.test(f.name)));
  const psu = one("psu", pin.psu) ?? (psus.length ? pick(psus, q) : undefined);
  if (!psu) return null;
  return { cpu, cooler, mb, ram, ssd, gpu, psu, case: cs };
}

function solve(p: BuildPlan): { b: Build; q: number } | null {
  const cpuList = p.cpus.map((a) => { const f = FACTS[a]; if (!f) throw new Error(`${p.slug}: no CPU ${a}`); return f; });
  let gpus: (Fact | undefined)[] = [undefined];
  if (p.gpu) {
    const lo = chipRank({ specs: { chip: p.gpu.min } }  as unknown as Fact), hi = p.gpu.max ? chipRank({ specs: { chip: p.gpu.max } } as unknown as Fact) : 99;
    const byChip = new Map<string, Fact[]>();
    for (const g of Object.values(GROUPS.gpu.facts)) {
      if (!ok(g) || chipRank(g) < lo || chipRank(g) > hi) continue;
      if ((p.knownLen || p.form === 1) && gpuLength(g) === undefined) continue;
      if (p.outputs && (outputCount(g) ?? 0) < p.outputs) continue;
      (byChip.get(str(g, "chip")) ?? byChip.set(str(g, "chip"), []).get(str(g, "chip"))!).push(g);
    }
    gpus = [...byChip.values()].flatMap((xs) => {
      const s = xs.sort((a, b) => price(a) - price(b));
      const known = s.find((g) => gpuLength(g) !== undefined && price(g) <= price(s[0]) * 1.15);
      return [...new Set([known ?? s[0], s[0]])].slice(0, 2);
    });
    gpus.sort((a, b) => chipRank(b!) - chipRank(a!) || price(a!) - price(b!));
  }
  type R = { score: number; b: Build; q: number };
  let bestR: R | undefined;
  for (const g of gpus) {
    for (let ci = 0; ci < cpuList.length; ci++) {
      for (let q = 1; q >= p.qMin - 1e-9; q -= 0.1) {
        let found = false;
        for (const m2k of [true, false]) {
          const b = fill(p, cpuList[ci], g, q, m2k);
          if (!b || totalPrice(b) > p.budget || checkBuild(b).some((c) => !c.ok)) continue;
          // Fewer rows the reader must confirm breaks a tie, but never outranks a stronger card or processor.
          const score = (p.cpuFirst ? ci * 1000 + (g ? chipRank(g) : 0) * 10 + q : (g ? chipRank(g) * 100 : 0) + ci * 10 + q * 5) - checkBuild(b).filter((c) => c.confirm).length * 0.05;
          if (!bestR || score > bestR.score) bestR = { score, b, q };
          found = true;
        }
        if (found) break;
      }
    }
    if (bestR && !p.cpuFirst) break;
  }
  return bestR ? { b: bestR.b, q: bestR.q } : null;
}

const only = new Set(process.argv.slice(2));
const OUT = "data/clusters/builds31.ts";
const prev: Record<string, Record<string, string>> = {};
if (fs.existsSync(OUT)) {
  const t = fs.readFileSync(OUT, "utf-8");
  for (const m of t.matchAll(/^\s+"([a-z0-9-]+)": (\{[^}]*\}),/gm)) prev[m[1]] = JSON.parse(m[2]);
}
const result: Record<string, Record<string, string>> = { ...prev };
for (const p of PLANS) {
  if (only.size && !only.has(p.slug)) continue;
  const r = solve(p);
  if (!r) { console.log(`SKIP ${p.slug}: no build within $${p.budget}`); delete result[p.slug]; continue; }
  const rec: Record<string, string> = {};
  for (const [role, f] of Object.entries({ cpu: r.b.cpu, cooler: r.b.cooler, mb: r.b.mb, ram: r.b.ram, ssd: r.b.ssd, gpu: r.b.gpu, psu: r.b.psu, case: r.b.case })) if (f) rec[role] = f.asin;
  result[p.slug] = rec;
  console.log(`${p.slug}: $${totalPrice(r.b).toFixed(0)} / ${p.budget} (q ${r.q.toFixed(1)})`);
  for (const [role, f] of roles(r.b)) console.log(`   ${role.padEnd(14)} ${f.asin} ${String(f.price).padStart(9)} ${f.name.slice(0, 62)}`);
}
const order = PLANS.map((p) => p.slug).filter((s) => result[s]);
fs.writeFileSync(OUT, `/** Generated by scripts/pcj-plan-builds.ts from builds31-plan.ts. Do not edit by hand; edit the plan and re-run. */\nexport const BUILD_PARTS: Record<string, Record<string, string>> = {\n${order.map((s) => `  "${s}": ${JSON.stringify(result[s])},`).join("\n")}\n};\n`);
console.log(`wrote ${order.length} builds`);
