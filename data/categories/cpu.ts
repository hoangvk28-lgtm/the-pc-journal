import pool from "@/data/pcj-pool/cpu.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

/**
 * Desktop CPUs. Core counts, boost clocks, L3 cache, rated power, socket, memory, cooler and iGPU
 * follow AMD's and Intel's product pages; listings that quote L2+L3 totals or wrong clocks were
 * checked against those pages. Rated power is AMD's default TDP or Intel's processor base power.
 */
export const cpuSchema: CategorySchema = {
  id: "cpu",
  plural: "Processors",
  fields: [
    { key: "l3", label: "L3 cache", noun: "L3 cache", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}MB`,
      strength: (v) => (Number(v) >= 96 ? `${v}MB of L3 cache from 3D V-Cache` : Number(v) >= 64 ? `${v}MB of L3 cache` : undefined),
      rule: { label: "Largest Game Cache", bestFor: ["Games that are limited by the CPU at high frame rates.", "Players chasing 1% lows in simulation and esports titles."] } },
    { key: "boost", label: "Max boost", noun: "boost clock", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v}GHz`,
      strength: (v) => (Number(v) >= 5.5 ? `${v}GHz maximum boost` : undefined) },
    { key: "cores", label: "Cores / threads", noun: "core count", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} cores`,
      strength: (v) => (Number(v) >= 12 ? `${v} cores for encoding and background work` : undefined),
      weakness: (v) => (Number(v) <= 6 ? `${v} cores leave less headroom for streaming alongside games` : undefined) },
    { key: "tdp", label: "Rated power", noun: "rated power", better: "lower", superlative: ["lowest", "highest"], fmt: (v) => `${v}W`,
      strength: (v) => (Number(v) <= 65 ? `${v}W rating suits a modest air cooler` : undefined),
      weakness: (v) => (Number(v) >= 170 ? `${v}W rating calls for a large air cooler or a 280mm-plus AIO` : undefined) },
    { key: "threads", label: "Threads", fmt: (v) => String(v) },
    { key: "socket", label: "Socket", fmt: (v) => String(v), weakness: (v) => (v === "AM4" ? "AM4 is a final-generation platform with no newer CPUs coming" : undefined) },
    { key: "memory", label: "Memory", fmt: (v) => String(v) },
    { key: "cooler", label: "Cooler in box", fmt: (v) => (v ? "Yes" : "No"), strength: (v) => (v ? "Wraith Stealth cooler in the box" : undefined), weakness: (v) => (v === false ? "No cooler in the box" : undefined) },
    { key: "igpu", label: "Integrated graphics", fmt: (v) => (v ? "Yes" : "No"), strength: (v) => (v ? "Integrated graphics for display output without a graphics card" : undefined), weakness: (v) => (v === false ? "No integrated graphics, so a graphics card is required" : undefined) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const socket = String(f.specs.socket ?? "");
    if (socket === "AM5") s.push(`It needs an AM5 board (A620, B650, B850, X670 or X870 series) and DDR5 memory; ${/^(Ryzen [579] 9|Ryzen 7 98)/.test(f.name.replace("AMD ", "")) ? "a 600-series board may need a BIOS update first, so check the maker's CPU support list for the minimum version" : "check the board's CPU support list for the minimum BIOS version"}.`);
    else if (socket === "AM4") s.push("It drops into an AM4 board with DDR4 memory; older B450 and X470 boards need a BIOS that supports this chip, so check the support list before swapping.");
    else if (socket === "LGA1851") s.push("It needs an LGA1851 board (Intel 800-series chipset) and DDR5 memory; LGA1700 boards and coolers without an LGA1851 mounting kit will not fit.");
    else if (socket === "LGA1151") s.push("It fits only LGA1151 boards with an Intel 300-series chipset and DDR4; 100- and 200-series LGA1151 boards do not support it, and some 300-series boards need a BIOS update first.");
    else if (socket === "LGA1700") s.push("It fits LGA1700 boards (600 and 700 series) with either DDR4 or DDR5, depending on the board; 600-series boards may need a BIOS update for 14th-gen chips.");
    if (f.specs.cooler === false) s.push(Number(f.specs.tdp ?? 0) >= 120 ? "Budget for a dual-tower air cooler or a 240mm-plus AIO, since none is included." : "No cooler is included; a single-tower air cooler is enough at its rating.");
    return s;
  },
  criteria: [
    { id: "gpu-first", title: "Match the CPU to your graphics card and monitor", body: "At 1440p and 4K the graphics card sets most frame rates, so a mid-range CPU is often enough. At 1080p with a high-refresh monitor, the CPU matters much more.\n\nSpend on the part that limits your games, not on the bigger number." },
    { id: "cache", title: "Cache helps games more than clocks", body: "AMD's X3D chips add a large stacked L3 cache that keeps more game data close to the cores. In CPU-limited games that often helps more than a higher boost clock.\n\nThe gain shrinks when the graphics card is the limit." },
    { id: "platform", title: "The socket decides your upgrade path", body: "The socket fixes which motherboards and future CPUs you can use. AM5 has had several CPU generations; AM4 has no newer chips coming.\n\nIf you plan to upgrade later, a current platform is worth a small premium." },
    { id: "cooling", title: "Budget for the cooler", body: "Most unlocked chips ship without a cooler. A 65W part runs well on a basic single tower, while 120W to 170W parts need a dual tower or an AIO to hold their boost clocks.\n\nAdd the cooler to the CPU price when comparing." },
    { id: "cores", title: "Cores matter for streaming and creation", body: "Six and eight cores cover gaming. Streaming with CPU encoding, video editing and compiling benefit from twelve or sixteen.\n\nIf you encode on the graphics card instead, core count matters less." },
    { id: "bios", title: "Check BIOS support before buying", body: "Newer CPUs on older boards may need a BIOS update before the system will start. Check the board's CPU support list for the version you need and whether the board can flash without a CPU installed." },
    { id: "igpu", title: "Integrated graphics are a useful backup", body: "Chips with integrated graphics can drive a display without a graphics card, which helps when troubleshooting or between upgrades. Intel's F and KF models and most AM4 Ryzen chips have none." },
  ],
  faq: [
    { id: "x3d", q: "What does X3D mean on a Ryzen CPU?", a: "It marks AMD's 3D V-Cache chips, which stack extra L3 cache on the processor. Games that are limited by the CPU tend to run faster on them." },
    { id: "cooler-needed", q: "Do I need to buy a separate cooler?", a: "Usually yes. Only some chips, such as the Ryzen 5 7600 and 5600X, include a basic cooler; unlocked high-end models do not." },
    { id: "am4-worth", q: "Is AM4 still worth buying into?", a: "For an upgrade to an existing AM4 system, yes. For a new build, AM5 or LGA1851 gives a longer upgrade path." },
    { id: "bios-update", q: "Will a new CPU work in my current motherboard?", a: "Only if the socket matches and the board's BIOS supports it. Check the maker's CPU support list for the minimum BIOS version." },
    { id: "intel-vs-amd", q: "Should I choose Intel or AMD for gaming?", a: "At the high end, AMD's X3D chips lead in many CPU-limited games. Intel's Core Ultra chips offer more cores for work at similar prices. Choose by workload and platform cost." },
    { id: "ram", q: "What memory should I pair with it?", a: "AM5 and LGA1851 use DDR5; AM4 uses DDR4. For AM5, a 32GB DDR5-6000 kit is a common pairing; check the board's memory support list." },
    { id: "power", q: "What does the rated power figure mean?", a: "It is AMD's default TDP or Intel's base power. Chips can draw more under boost, so size the cooler for sustained loads, not the label alone." },
  ],
  evaluated: [
    { title: "Game-relevant specs", description: "We compared L3 cache, boost clocks and core counts from AMD's and Intel's product pages." },
    { title: "Platform cost", description: "We noted socket, memory type and whether a cooler is included, since they change the real price." },
    { title: "Power and cooling", description: "We recorded each chip's rated power and what cooler class it needs." },
    { title: "Upgrade path", description: "We considered how long each socket is likely to receive new CPUs." },
  ],
};

const amd = (asin: string, name: string, short: string, cores: number, threads: number, boost: number, l3: number, tdp: number, socket: string, extra: { cooler?: boolean; igpu?: boolean }, notes: string[]) =>
  F(asin, name, short, { l3, boost, cores, tdp, threads, socket, memory: socket === "AM4" ? "DDR4" : "DDR5", cooler: extra.cooler ?? false, igpu: extra.igpu ?? socket === "AM5" }, notes);
const intel = (asin: string, name: string, short: string, cores: number, threads: number, boost: number, l3: number, socket: string, igpu: boolean, notes: string[]) =>
  F(asin, name, short, { l3, boost, cores, tdp: 125, threads, socket, memory: socket === "LGA1700" ? "DDR4 or DDR5" : "DDR5", cooler: false, igpu }, notes);

export const cpuFacts = withPool(pool as Record<string, { img?: string; price?: string }>, [
  amd("B0DKFMSMYK", "AMD Ryzen 7 9800X3D", "Ryzen 7 9800X3D", 8, 16, 5.2, 96, 120, "AM5", {}, ["second-generation 3D V-Cache placed under the cores", "an unlocked multiplier, a first for AMD's X3D chips"]),
  amd("B0BTZB7F88", "AMD Ryzen 7 7800X3D", "Ryzen 7 7800X3D", 8, 16, 5.0, 96, 120, "AM5", {}, ["first-generation AM5 3D V-Cache", "the Zen 4 architecture"]),
  amd("B0G8JMLXNQ", "AMD Ryzen 7 9850X3D", "Ryzen 7 9850X3D", 8, 16, 5.6, 96, 120, "AM5", {}, ["a higher-clocked take on the 9800X3D design"]),
  amd("B0DVZSG8D5", "AMD Ryzen 9 9950X3D", "Ryzen 9 9950X3D", 16, 32, 5.7, 128, 170, "AM5", {}, ["3D V-Cache on one of its two core dies", "a design aimed at both games and content creation"]),
  amd("B0D6NMDNNX", "AMD Ryzen 7 9700X", "Ryzen 7 9700X", 8, 16, 5.5, 32, 65, "AM5", {}, ["the Zen 5 architecture"]),
  amd("B0BBHHT8LY", "AMD Ryzen 7 7700X", "Ryzen 7 7700X", 8, 16, 5.4, 32, 105, "AM5", {}, ["the Zen 4 architecture", "a 5nm process", "PCIe 5.0 support on AM5"]),
  amd("B0D6NN6TM7", "AMD Ryzen 5 9600X", "Ryzen 5 9600X", 6, 12, 5.4, 32, 65, "AM5", {}, ["the Zen 5 architecture"]),
  amd("B0BBJDS62N", "AMD Ryzen 5 7600X", "Ryzen 5 7600X", 6, 12, 5.3, 32, 105, "AM5", {}, ["the Zen 4 architecture", "a 5nm process", "PCIe 5.0 support on AM5"]),
  amd("B0BMQJWBDM", "AMD Ryzen 5 7600", "Ryzen 5 7600", 6, 12, 5.1, 32, 65, "AM5", { cooler: true }, ["the Zen 4 architecture", "a 5nm process", "PCIe 5.0 support on AM5"]),
  amd("B08166SLDF", "AMD Ryzen 5 5600X", "Ryzen 5 5600X", 6, 12, 4.6, 32, 65, "AM4", { cooler: true, igpu: false }, ["PCIe 4.0 support on B550 and X570 boards"]),
  amd("B0D6NN87T8", "AMD Ryzen 9 9900X", "Ryzen 9 9900X", 12, 24, 5.6, 64, 120, "AM5", {}, ["the Zen 5 architecture"]),
  amd("B0D6NNRBGP", "AMD Ryzen 9 9950X", "Ryzen 9 9950X", 16, 32, 5.7, 64, 170, "AM5", {}, ["AMD's recommendation of a liquid cooler"]),
  amd("B0BBJ59WJ4", "AMD Ryzen 9 7900X", "Ryzen 9 7900X", 12, 24, 5.6, 64, 170, "AM5", {}, ["the Zen 4 architecture", "a 5nm process", "PCIe 5.0 support on AM5"]),
  intel("B0DFK2MH2D", "Intel Core Ultra 7 265K", "Core Ultra 7 265K", 20, 20, 5.5, 30, "LGA1851", true, ["8 performance and 12 efficient cores", "a built-in NPU for AI features"]),
  intel("B0DFKC99VL", "Intel Core Ultra 9 285K", "Core Ultra 9 285K", 24, 24, 5.7, 36, "LGA1851", true, ["8 performance and 16 efficient cores", "a built-in NPU for AI features"]),
  intel("B0DFK8HHK4", "Intel Core Ultra 5 245KF", "Core Ultra 5 245KF", 14, 14, 5.2, 24, "LGA1851", false, ["6 performance and 8 efficient cores", "Intel 800-series chipset support", "PCIe 5.0 support"]),
  intel("B0CGJ9STNF", "Intel Core i5-14600K", "Core i5-14600K", 14, 20, 5.3, 24, "LGA1700", true, ["6 performance and 8 efficient cores", "support for both DDR4 and DDR5 boards"]),
  intel("B0CGJ41C9W", "Intel Core i7-14700K", "Core i7-14700K", 20, 28, 5.6, 33, "LGA1700", true, ["8 performance and 12 efficient cores", "support for both DDR4 and DDR5 boards"]),
  // Batch 9 additions (core counts, clocks and cache from AMD and Intel specifications)
  amd("B09VCHR1VH", "AMD Ryzen 5 5600", "Ryzen 5 5600", 6, 12, 4.4, 32, 65, "AM4", { cooler: true }, ["a Wraith Stealth cooler in the box", "DDR4 support that keeps an AM4 upgrade cheap"]),
  amd("B09VCHQHZ6", "AMD Ryzen 7 5700X", "Ryzen 7 5700X", 8, 16, 4.6, 32, 65, "AM4", {}, ["eight cores on the DDR4 AM4 platform", "PCIe 4.0 support"]),
  amd("B09VCJ2SHD", "AMD Ryzen 7 5800X3D", "Ryzen 7 5800X3D", 8, 16, 4.5, 96, 105, "AM4", {}, ["3D V-Cache on the AM4 platform", "a drop-in upgrade for many existing AM4 boards after a BIOS update"]),
  amd("B0F9XH8DBP", "AMD Ryzen 5 7600X3D", "Ryzen 5 7600X3D", 6, 12, 4.7, 96, 65, "AM5", { igpu: true }, ["96MB of L3 cache on a six-core chip"]),
  amd("B09VCJ171S", "AMD Ryzen 5 5500", "Ryzen 5 5500", 6, 12, 4.2, 16, 65, "AM4", { cooler: true }, ["a Wraith Stealth cooler in the box", "one of the cheapest six-core desktop chips"]),
  amd("B0CQ4GYTTX", "AMD Ryzen 5 8600G", "Ryzen 5 8600G", 6, 12, 5.0, 16, 65, "AM5", { cooler: true, igpu: true }, ["Radeon 760M integrated graphics"]),
  amd("B0C3T39N6P", "AMD Ryzen 7 7700", "Ryzen 7 7700", 8, 16, 5.3, 32, 65, "AM5", { cooler: true, igpu: true }, ["a Wraith Prism cooler in the box"]),
  amd("B0BMQK718H", "AMD Ryzen 9 7900", "Ryzen 9 7900", 12, 24, 5.4, 64, 65, "AM5", { cooler: true, igpu: true }, ["a Wraith Prism cooler in the box", "12 cores at a 65W rating"]),
  amd("B0DWGWN8GY", "AMD Ryzen 9 9900X3D", "Ryzen 9 9900X3D", 12, 24, 5.5, 128, 120, "AM5", { igpu: true }, ["3D V-Cache on a 12-core chip"]),
  amd("B092L9GF5N", "AMD Ryzen 5 5600G", "Ryzen 5 5600G", 6, 12, 4.4, 16, 65, "AM4", { cooler: true, igpu: true }, ["Radeon integrated graphics"]),
  intel("B0CQ1Y7KHV", "Intel Core i5-14400F", "Core i5-14400F", 10, 16, 4.7, 20, "LGA1700", false, ["6 performance and 4 efficient cores", "DDR4 and DDR5 support", "PCIe 5.0 and 4.0 support"]),
  intel("B0B2X1KDNS", "Intel Core i5-12400F", "Core i5-12400F", 6, 12, 4.4, 18, "LGA1700", false, ["six performance cores", "DDR4 and DDR5 support", "600- and 700-series chipset support"]),
  intel("B0BCDR9M33", "Intel Core i5-13600K", "Core i5-13600K", 14, 20, 5.1, 24, "LGA1700", true, ["6 performance and 8 efficient cores", "an unlocked multiplier"]),
  intel("B0CVZGD5M6", "Intel Core i7-14700KF", "Core i7-14700KF", 20, 28, 5.6, 33, "LGA1700", false, ["8 performance and 12 efficient cores", "an unlocked multiplier"]),
  intel("B0CGJDKLB8", "Intel Core i9-14900K", "Core i9-14900K", 24, 32, 6.0, 36, "LGA1700", true, ["8 performance and 16 efficient cores", "a boost clock of up to 6.0GHz"]),
  intel("B0CGJ4MLC8", "Intel Core i5-14600KF", "Core i5-14600KF", 14, 20, 5.3, 24, "LGA1700", false, ["6 performance and 8 efficient cores", "an unlocked multiplier"]),
  intel("B0DT7CW7VR", "Intel Core Ultra 5 225F", "Core Ultra 5 225F", 10, 10, 4.9, 20, "LGA1851", false, ["6 performance and 4 efficient cores", "PCIe 5.0 support", "Intel 800-series chipset support"]),
  intel("B0H2Z7VF4G", "Intel Core Ultra 7 265KF", "Core Ultra 7 265KF", 20, 20, 5.5, 30, "LGA1851", false, ["8 performance and 12 efficient cores", "an unlocked multiplier"]),
  // LGA1151 (9th gen) for owners of Intel 300-series boards. Only listing-stated figures are recorded.
  F("B089J731BX", "Intel Core i9-9900K", "Core i9-9900K", { boost: 5.0, cores: 8, tdp: 95, threads: 16, socket: "LGA1151", memory: "DDR4", cooler: false }, ["8 cores and 16 threads, the most on this platform", "an unlocked multiplier"]),
  F("B07MGBZWDZ", "Intel Core i9-9900KF", "Core i9-9900KF", { l3: 16, boost: 5.0, cores: 8, tdp: 95, threads: 16, socket: "LGA1151", memory: "DDR4", igpu: false }, ["8 cores and 16 threads with 16MB of cache", "an unlocked multiplier"]),
  F("B07HHN6KBZ", "Intel Core i7-9700K", "Core i7-9700K", { l3: 12, boost: 4.9, cores: 8, tdp: 95, threads: 8, socket: "LGA1151", memory: "DDR4", cooler: false, igpu: true }, ["8 cores without Hyper-Threading", "an unlocked multiplier", "Intel UHD Graphics 630", "DDR4-2666 support up to 64GB"]),
  F("B07S6CRLVD", "Intel Core i7-9700", "Core i7-9700", { boost: 4.7, cores: 8, tdp: 65, threads: 8, socket: "LGA1151", memory: "DDR4" }, ["8 cores at a 65W rating", "a listing note that some boards need a BIOS update first"]),
  F("B07MRCGQQ4", "Intel Core i5-9400F", "Core i5-9400F", { l3: 9, boost: 4.1, cores: 6, tdp: 65, threads: 6, socket: "LGA1151", memory: "DDR4", igpu: false }, ["6 cores at a 65W rating"]),
]);
