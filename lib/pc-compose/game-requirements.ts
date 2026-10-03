import { GAME_REQUIREMENTS, GAME_SLUGS, type GameReq } from "@/data/game-requirements";
import type { Fact } from "./generic";
import { cap, listJoin } from "./seed";

/**
 * Compares a guide's picks with a game's official requirement list.
 * Only same-brand comparisons are made, and only by generation then model number
 * (a newer generation, a higher or lower model in the same generation). No frame rates are claimed.
 */
type Rank = { vendor: "nvidia" | "amd" | "intel"; gen: number; tier: number; label: string };
const rankCmp = (a: Rank, b: Rank) => a.gen - b.gen || a.tier - b.tier;
const VENDOR_NAME = { nvidia: "NVIDIA", amd: "AMD", intel: "Intel" } as const;

function nvidiaGen(n: number): { gen: number; tier: number } | undefined {
  if (n >= 400 && n <= 999) return { gen: Math.floor(n / 100), tier: n % 100 };
  const g = Math.floor(n / 100);
  return [10, 16, 20, 30, 40, 50].includes(g) ? { gen: g, tier: n % 100 } : undefined;
}
const AMD_GEN: Record<number, number> = { 4: 1, 5: 2 };
const AMD_GEN4: Record<number, number> = { 5: 3, 6: 4, 7: 5, 9: 6 };
const AMD_SUFFIX: Record<string, number> = { XTX: 60, XT: 30, GRE: 15 };

/** Every GPU model a requirement string names, per brand. */
export function parseGpus(s: string): Rank[] {
  const out: Rank[] = [];
  for (const m of s.matchAll(/(?:GTX|RTX)\s*(\d\d)\s*series/gi)) out.push({ vendor: "nvidia", gen: Number(m[1]), tier: 0, label: m[0] });
  for (const m of s.matchAll(/(?:\b(GTX|RTX)\s*(\d{3,4})(?!\d)|(?:GeForce|Nvidia)\s+(\d{3,4})(?!\d))\s*(?:\(?(Ti|Super)\)?)?/gi)) {
    const n = Number(m[2] ?? m[3]);
    const g = nvidiaGen(n);
    if (g) out.push({ vendor: "nvidia", gen: g.gen, tier: g.tier + (m[4] ? 0.5 : 0), label: m[0].trim().replace(/^(GeForce|Nvidia)\s+/i, "") });
  }
  for (const m of s.matchAll(/(?:\bRX|\bAMD)\s*-?(\d{3,4})(?!\d)\s*-?\s*(XTX|XT|GRE)?/gi)) {
    const n = Number(m[1]);
    const gen = n >= 1000 ? AMD_GEN4[Math.floor(n / 1000)] : AMD_GEN[Math.floor(n / 100)];
    if (gen) out.push({ vendor: "amd", gen, tier: (n >= 1000 ? n % 1000 : n % 100) + (m[2] ? AMD_SUFFIX[m[2].toUpperCase()] : 0), label: m[0].trim().replace(/^AMD\s+/i, "AMD ") });
  }
  for (const m of s.matchAll(/RDNA\s*(\d)/gi)) { const g = { 1: 3, 2: 4, 3: 5, 4: 6 }[Number(m[1])]; if (g) out.push({ vendor: "amd", gen: g, tier: 0, label: m[0] }); }
  for (const m of s.matchAll(/Arc\s*([AB])(\d{3})(?!\d)/gi)) out.push({ vendor: "intel", gen: m[1].toUpperCase() === "A" ? 1 : 2, tier: Number(m[2]), label: m[0] });
  for (const m of s.matchAll(/Arc\s*B-Series/gi)) out.push({ vendor: "intel", gen: 2, tier: 0, label: m[0] });
  return out;
}

/** Every CPU model a requirement string names, per brand. */
export function parseCpus(s: string): Rank[] {
  const out: Rank[] = [];
  for (const m of s.matchAll(/Ultra\s*([579])\s*(\d{3})(?!\d)/gi)) out.push({ vendor: "intel", gen: 15, tier: Number(m[1]) * 100000 + Number(m[2]), label: m[0] });
  for (const m of s.matchAll(/Core\s+Ultra\s+Series\s*2/gi)) out.push({ vendor: "intel", gen: 15, tier: 0, label: m[0] });
  for (const m of s.matchAll(/\bi([3579])[-\s]?(\d{4,5})(?!\d)([KFS]{0,2})/gi)) {
    const n = Number(m[2]);
    out.push({ vendor: "intel", gen: Math.floor(n / 1000), tier: Number(m[1]) * 100000 + n, label: `Core i${m[1]}-${m[2]}${m[3].toUpperCase()}` });
  }
  for (const m of s.matchAll(/Coffee Lake/gi)) out.push({ vendor: "intel", gen: 8, tier: 0, label: m[0] });
  for (const m of s.matchAll(/(?:Ryzen\s*(?:R)?|\bR)([3579])\s*(?:PRO\s*)?(\d{4})(?!\d)([A-Z0-9]{0,4})/gi)) {
    const n = Number(m[2]);
    out.push({ vendor: "amd", gen: Math.floor(n / 1000), tier: Number(m[1]) * 100000 + n, label: `Ryzen ${m[1]} ${m[2]}${m[3].toUpperCase()}` });
  }
  for (const m of s.matchAll(/\bZen\s*(\d)/gi)) { const g = { 1: 1, 2: 3, 3: 5, 4: 7, 5: 9 }[Number(m[1])]; if (g) out.push({ vendor: "amd", gen: g, tier: 0, label: m[0] }); }
  return out;
}

function lowest(ranks: Rank[], vendor: Rank["vendor"]): Rank | undefined {
  return ranks.filter((r) => r.vendor === vendor).sort(rankCmp)[0];
}

type Verdict = { c: number; ref: Rank; phrase: string };
function verdict(pick: Rank, ref: Rank): Verdict {
  const sameGen = pick.gen === ref.gen;
  const c = sameGen && ref.tier === 0 ? 0 : rankCmp(pick, ref);
  const phrase = c > 0 ? (sameGen ? `the same generation as the ${ref.label} but a higher model` : `a newer generation than the ${ref.label}`)
    : c === 0 ? (ref.tier === 0 ? `the same generation as the ${ref.label}` : `the same model class as the ${ref.label}`)
    : sameGen ? `the same generation as the ${ref.label} but a lower model` : `an older generation than the ${ref.label}`;
  return { c, ref, phrase };
}

export function gameForSlug(slug: string, explicit?: string): string | undefined {
  const k = explicit ?? GAME_SLUGS[slug];
  return k && GAME_REQUIREMENTS[k] ? k : undefined;
}

export type GameBlock = { intro: string; faq?: { q: string; a: string }; source: { label: string; url: string } };

export function gameBlock(gameKey: string | undefined, slug: string, facts: Fact[], plural: string): GameBlock | undefined {
  const req: GameReq | undefined = gameKey ? GAME_REQUIREMENTS[gameKey] : undefined;
  if (!req) return undefined;
  const kind: "gpu" | "cpu" = /-cpus?-for-/.test(slug) ? "cpu" : "gpu";
  const recHw = kind === "gpu" ? req.rec.gpu : req.rec.cpu;
  if (!recHw) return undefined;
  const minHw = kind === "gpu" ? req.min?.gpu : req.min?.cpu;
  const noun = kind === "gpu" ? "card" : "processor";
  const poss = /s$/.test(req.name) ? `${req.name}'` : `${req.name}'s`;
  const the = (f: Fact) => `the ${f.short}`;
  const names = (fs: Fact[]) => listJoin(fs.map(the));
  const are = (fs: Fact[]) => (fs.length === 1 ? "is" : "are");
  const parse = kind === "gpu" ? parseGpus : parseCpus;
  const recRanks = parse(recHw), minRanks = minHw ? parse(minHw) : [];

  const pickRank = (f: Fact): Rank | undefined => {
    const text = kind === "gpu" ? String(f.specs.chip ?? f.name) : f.name;
    const [r] = parse(text);
    return r;
  };

  const groups = new Map<string, Fact[]>();
  const meets: Fact[] = [], na: Fact[] = [];
  const below = new Map<string, Fact[]>(); // message about the minimum tier -> picks
  const belowAll: Fact[] = [];
  const viaMin = new Map<string, Fact[]>(); // picks whose brand has no rankable recommended card, compared with the minimum card
  const unmatched: Fact[] = [];
  for (const f of facts) {
    const pr = pickRank(f);
    const ref = pr && lowest(recRanks, pr.vendor);
    if (!pr) { unmatched.push(f); continue; }
    const mref = lowest(minRanks, pr.vendor);
    if (!ref) {
      if (mref) { const v = verdict(pr, mref); viaMin.set(v.phrase, [...(viaMin.get(v.phrase) ?? []), f]); }
      else na.push(f);
      continue;
    }
    const v = verdict(pr, ref);
    groups.set(v.phrase, [...(groups.get(v.phrase) ?? []), f]);
    if (v.c >= 0) meets.push(f);
    else {
      belowAll.push(f);
      const mv = mref ? verdict(pr, mref) : undefined;
      const msg = mv ? (mv.c >= 0 ? `clear only the minimum tier (${mv.ref.label}), not the recommended one` : `sit below even the minimum ${mv.ref.label}`) : `fall under the recommended ${noun}`;
      below.set(msg, [...(below.get(msg) ?? []), f]);
    }
  }
  const plur = (fs: Fact[], one: string, many: string) => (fs.length === 1 ? one : many);

  const parts: string[] = [];
  const s1 = `${poss} official PC requirements list ${recHw}${req.rec.ram ? ` and ${req.rec.ram}GB of RAM` : ""} for the recommended tier (source: ${req.source.label}).`;
  if (groups.size) parts.push(`Matching brand to brand, ${[...groups.entries()].map(([phrase, fs]) => `${names(fs)} ${are(fs)} ${phrase}`).join("; ")}.`);
  for (const [msg, fs] of below) parts.push(`${cap(names(fs))} ${plur(fs, msg.replace(/^clear /, "clears ").replace(/^sit /, "sits ").replace(/^fall /, "falls "), msg)}.`);
  if (viaMin.size) {
    const vend = VENDOR_NAME[pickRank(facts.find((f) => [...viaMin.values()].flat().includes(f))!)!.vendor];
    parts.push(`The recommended ${vend} ${noun} in that list isn't one we can rank, but against the minimum tier ${[...viaMin.entries()].map(([phrase, fs]) => `${names(fs)} ${are(fs)} ${phrase}`).join("; ")}.`);
  }
  const noMatch = [...na, ...unmatched];
  if (noMatch.length) {
    const vendors = [...new Set(noMatch.map((f) => pickRank(f)?.vendor).filter(Boolean))] as Rank["vendor"][];
    parts.push(vendors.length === 1 && recRanks.length
      ? `The list names no ${VENDOR_NAME[vendors[0]]} ${noun} we can rank, so ${names(noMatch)} can't be matched against it directly.`
      : `${cap(names(noMatch))} can't be matched directly against that list.`);
  }
  // Video memory, only where the source states it for the recommended tier.
  let vramNote = "", vramOk: Fact[] = [], vramLow: Fact[] = [];
  if (kind === "gpu" && req.rec.vram) {
    const known = facts.filter((f) => typeof f.specs.vram === "number");
    vramLow = known.filter((f) => (f.specs.vram as number) < req.rec.vram!);
    vramOk = known.filter((f) => (f.specs.vram as number) >= req.rec.vram!);
    vramNote = vramLow.length
      ? `On memory, the source cites ${req.rec.vram}GB for the recommended tier; ${names(vramLow)} carr${vramLow.length === 1 ? "ies" : "y"} ${listJoin(vramLow.map((f) => `${f.specs.vram}GB`))}.`
      : known.length ? `The source cites ${req.rec.vram}GB of video memory for the recommended tier, and every pick with a stated figure has at least that (${listJoin([...new Set(known.map((f) => `${f.specs.vram}GB`))])}).` : "";
    if (vramNote) parts.push(vramNote);
  }
  if (req.notes) parts.push(req.notes);
  const intro = [s1, ...parts].join(" ");

  let faq: GameBlock["faq"];
  if (meets.length || belowAll.length || viaMin.size || vramNote) {
    const a: string[] = [];
    if (meets.length) a.push(`In ${poss} list, ${names(meets)} ${plur(meets, "meets", "meet")} the recommended ${noun} on brand, generation and model number.`);
    if (belowAll.length) a.push(`${cap(names(belowAll))} ${plur(belowAll, "does", "do")} not, ${[...below.keys()].every((m) => m.startsWith("clear")) ? "reaching only the minimum tier" : "so compare it with the minimum tier first"}.`);
    if (viaMin.size) a.push(`${cap(names([...viaMin.values()].flat()))} can only be checked against the minimum ${noun}, because the recommended one isn't ranked for that brand.`);
    if (noMatch.length && (meets.length || belowAll.length || viaMin.size)) a.push(`${cap(names(noMatch))} ${plur(noMatch, "is", "are")} outside the brands the list names, so look for an equivalent on ${poss} page.`);
    if (vramNote) a.push(vramLow.length ? `Only ${names(vramOk.length ? vramOk : facts)} ${vramOk.length ? plur(vramOk, "reaches", "reach") : "reaches"} the ${req.rec.vram}GB the source cites.` : `Every pick also reaches the ${req.rec.vram}GB the source cites.`);
    if (req.rec.ram) a.push(`${req.name} also lists ${req.rec.ram}GB of system RAM for that tier, which is separate from the ${noun}.`);
    faq = { q: `Will these ${plural} run ${req.name} at recommended settings?`, a: a.join(" ") };
  }
  return { intro, faq, source: req.source };
}
