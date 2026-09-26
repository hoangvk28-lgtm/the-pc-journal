import pool from "@/data/pcj-pool/prebuilt.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Prebuilt gaming PCs. A listing qualifies only when it states the CPU model, the GPU model with its
 * VRAM, the RAM and the SSD capacity. PSU wattage, efficiency and warranty are recorded only when the
 * listing states them. Dropped: listings with a vague CPU ("Core i5", "Ryzen 7"), no VRAM figure
 * (MXZ RTX 4070 range, Alienware, ROG NUC, ROG GR70, MSI Codex Z2), or no RAM figure (Cooler Master
 * NR2 Pro), plus mini PCs with laptop-class GPUs.
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const num = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : undefined);
const tb = (gb: number) => (gb >= 1000 ? `${gb / 1000}TB` : `${gb}GB`);

export const prebuiltSchema: CategorySchema = {
  id: "prebuilt",
  plural: "Prebuilt PCs",
  fields: [
    { key: "gpu", label: "Graphics card", fmt: (v) => String(v), strength: (v) => `A ${v} graphics card` },
    { key: "vram", label: "VRAM", noun: "VRAM", better: "higher", superlative: ["most", "least"], fmt: (v) => `${v}GB`,
      strength: (v) => (Number(v) >= 12 ? `${v}GB of VRAM for high texture settings` : undefined),
      weakness: (v) => (Number(v) <= 8 ? `${v}GB of VRAM can force lower texture settings in newer games at 1440p` : undefined) },
    { key: "cpu", label: "Processor", fmt: (v) => String(v), strength: (v) => (/X3D/.test(String(v)) ? `An ${v} with 3D V-Cache` : undefined) },
    { key: "ram", label: "Memory", noun: "memory", better: "higher", superlative: ["most", "least"], fmt: (v) => `${v}GB`,
      strength: (v) => (Number(v) >= 32 ? `${v}GB of RAM` : undefined),
      weakness: (v) => (Number(v) <= 16 ? `${v}GB of RAM is enough for games but tight alongside streaming or editing` : undefined) },
    { key: "ramType", label: "Memory type", fmt: (v) => String(v) },
    { key: "ssd", label: "SSD", noun: "SSD capacity", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => tb(Number(v)),
      strength: (v) => (Number(v) >= 2000 ? `A ${tb(Number(v))} SSD` : undefined),
      weakness: (v) => (Number(v) <= 512 ? `A ${v}GB SSD fills quickly with modern games` : undefined) },
    { key: "psu", label: "Power supply", noun: "power supply wattage", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}W`,
      strength: (v) => `A listed ${v}W power supply` },
    { key: "psuCert", label: "PSU rating", fmt: (v) => String(v), strength: (v) => `An ${v} power supply` },
    { key: "warranty", label: "Warranty", fmt: (v) => String(v) },
    { key: "color", label: "Case colour", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const n = f.short;
    const vram = num(f, "vram"), ram = num(f, "ram"), psu = num(f, "psu");
    s.push(`Check the ${n}'s listed ports against your monitor: most graphics cards use DisplayPort and HDMI, so match the cable to the refresh rate you want.`);
    if (psu) s.push(`The ${psu}W power supply is what the listing states; check its connectors before a later GPU upgrade.`);
    else s.push(`The ${n}'s listing does not state PSU wattage, so ask the seller before planning a GPU upgrade.`);
    if (ram && ram <= 16) s.push(`With ${ram}GB installed, check for free memory slots before adding more.`);
    if (vram && vram <= 8) s.push(`At ${vram}GB of VRAM, 1080p is the comfortable target for new games.`);
    return s;
  },
  criteria: [
    { id: "gpu", title: "Start with the graphics card", body: "The GPU decides gaming performance more than any other part. Match it to your monitor: an RTX 5060 class card suits 1080p, an RTX 5070 suits 1440p, and 4K high-refresh play needs an RTX 5080 or above.\n\nCheck the VRAM figure too; 8GB cards can need lower texture settings in newer games." },
    { id: "cpu", title: "Pair a sensible processor", body: "A current six- or eight-core CPU is enough for most games. X3D chips with extra cache help at high frame rates, while older or unnamed CPUs are a warning sign in a listing." },
    { id: "memory-storage", title: "Check memory and storage", body: "16GB of RAM runs games; 32GB leaves room for streaming, browsers and editing. A 1TB SSD holds a handful of large games, so plan for a second drive if you keep a big library." },
    { id: "psu", title: "Look for a named power supply", body: "A listing that states wattage and an 80 Plus rating is easier to trust and to upgrade later. When a listing is silent, ask before buying." },
    { id: "warranty", title: "Read the warranty terms", body: "Prebuilt warranties vary from one year of parts and labor to three years. Check who handles repairs and whether shipping is covered." },
    { id: "listing", title: "Trust specific listings", body: "Prefer listings that name every part: CPU model, GPU model and VRAM, RAM, SSD and PSU. Vague terms like \"Core i7\" or \"brand may vary\" leave room for weaker parts." },
  ],
  faq: [
    { id: "prebuilt-vs-diy", q: "Is a prebuilt cheaper than building a PC?", a: "Sometimes. Prebuilts include Windows, assembly and a system warranty; building yourself can cost less but you handle part choices and support." },
    { id: "upgrade", q: "Can I upgrade a prebuilt later?", a: "Usually. Check the power supply wattage and connectors, the case's GPU clearance and free RAM slots before buying a part." },
    { id: "ram-16-32", q: "Is 16GB of RAM enough for gaming?", a: "For most games, yes. 32GB helps when you stream, keep many browser tabs open or edit video alongside gaming." },
    { id: "vram", q: "How much VRAM do I need?", a: "8GB works at 1080p with some texture compromises in newer games; 12GB to 16GB is more comfortable at 1440p and 4K." },
    { id: "brand-may-vary", q: "What does \"brand may vary\" mean in a listing?", a: "The builder may ship an equivalent part from a different maker. The model and capacity should match; ask the seller if it matters to you." },
    { id: "bloatware", q: "Do prebuilt PCs come with extra software?", a: "Some do. Check the listing for trial software, and remove what you do not need after setup." },
  ],
  evaluated: [
    { title: "Stated parts", description: "We included only listings that name the CPU, the GPU with its VRAM, the RAM and the SSD capacity." },
    { title: "Balance", description: "We compared how the CPU, memory and storage match the graphics card's class." },
    { title: "Power and upgrades", description: "We recorded PSU wattage and rating where listed, which decides later GPU upgrades." },
    { title: "Price and warranty", description: "We compared prices at the time of writing and the warranty terms each listing states." },
  ],
};

const Y1 = "1 year parts and labor";
export const prebuiltFacts = withPool(pool as Pool, [
  // Under $1,000 and budget
  F("B0FCYPWLSN", "STGAubron Gaming PC (Ryzen 5 5500, RTX 3060 12GB)", "STGAubron R5 5500 RTX 3060", { cpu: "Ryzen 5 5500", gpu: "RTX 3060", vram: 12, ram: 16, ramType: "DDR4", ssd: 1000 }, ["12GB of VRAM on an older RTX 3060 at a sub-$900 price at the time of writing"]),
  F("B0CRHVTG34", "MXZ Gaming PC (Core i5-12400F, RTX 4060)", "MXZ i5-12400F RTX 4060", { cpu: "Core i5-12400F", gpu: "RTX 4060", vram: 8, ram: 16, ramType: "DDR4-3200", ssd: 500, psu: 550 }, ["six RGB fans listed"]),
  F("B0GZNFHK95", "Skytech Gaming PC (Ryzen 5 5500, RTX 3050)", "Skytech R5 5500 RTX 3050", { cpu: "Ryzen 5 5500", gpu: "RTX 3050", vram: 6, ram: 16, ssd: 1000, warranty: Y1 }, ["a one-year parts and labor warranty from Skytech"]),
  F("B0FNR773ZJ", "ZYNEEX Prebuilt Gaming PC (Ryzen 5 5500, RTX 3050 6GB)", "ZYNEEX R5 5500 RTX 3050", { cpu: "Ryzen 5 5500", gpu: "RTX 3050", vram: 6, ram: 16, ramType: "DDR4-3200", ssd: 1000 }, ["ARGB air cooling and Wi-Fi listed"]),
  F("B0FCYVNZ16", "STGAubron Gaming PC (Ryzen 7 5700X, RTX 3050 6GB)", "STGAubron R7 5700X RTX 3050", { cpu: "Ryzen 7 5700X", gpu: "RTX 3050", vram: 6, ram: 16, ramType: "DDR4", ssd: 1000 }, ["an eight-core Ryzen 7 5700X"]),
  F("B0FJRRXGYS", "HELLOLAND King White Prebuilt Gaming PC (Ryzen 5 5500, RX 6500 XT 4GB)", "HELLOLAND King White", { cpu: "Ryzen 5 5500", gpu: "RX 6500 XT", vram: 4, ram: 16, ramType: "DDR4-3200", ssd: 1000, warranty: Y1, color: "White" }, ["a white case with five RGB fans", "a one-year parts and labor warranty"]),
  F("B0F1457YSB", "STGAubron Gaming PC (Ryzen 5 5500, RTX 3050 6GB, 512GB)", "STGAubron R5 5500 RTX 3050", { cpu: "Ryzen 5 5500", gpu: "RTX 3050", vram: 6, ram: 16, ramType: "DDR4", ssd: 512 }, ["the lowest price among the listings we considered at the time of writing"]),
  F("B0GT8RMQ9S", "iBUYPOWER Element SE (Ryzen 5 8400F, RTX 3050 6GB)", "Element SE", { cpu: "Ryzen 5 8400F", gpu: "RTX 3050", vram: 6, ram: 16, ramType: "DDR5", ssd: 1000 }, ["a current AM5 Ryzen 5 8400F with DDR5 memory"]),
  F("B0GLDVNNFG", "STORMCRAFT Sirius Gaming PC (Core i5-14400F, RTX 5060)", "STORMCRAFT Sirius", { cpu: "Core i5-14400F", gpu: "RTX 5060", vram: 8, ram: 16, ramType: "DDR4", ssd: 1000, psu: 650, psuCert: "80 Plus Gold" }, ["a current RTX 5060 near $1,100 at the time of writing"]),
  // $1,000 to $1,500
  F("B0H27NNNK4", "KOTIN Gaming PC (Ryzen 7 8700F, RTX 5060 Ti 8GB)", "KOTIN 8700F RTX 5060 Ti", { cpu: "Ryzen 7 8700F", gpu: "RTX 5060 Ti", vram: 8, ram: 16, ramType: "DDR5", ssd: 1000, psu: 650, psuCert: "80 Plus Gold", warranty: "1 year limited" }, ["an eight-core Ryzen 7 8700F on AM5"]),
  F("B0H5VKQ3PR", "LXZ Prebuilt Gaming PC (Ryzen 7 8700F, RTX 5060)", "LXZ 8700F RTX 5060", { cpu: "Ryzen 7 8700F", gpu: "RTX 5060", vram: 8, ram: 16, ramType: "DDR5", ssd: 1000, psu: 650, color: "White" }, ["a white Dreamer case with a tempered glass side"]),
  F("B0H1VDTQWR", "Skytech Gaming PC (Ryzen 5 8400F, RTX 5060)", "Skytech 8400F RTX 5060", { cpu: "Ryzen 5 8400F", gpu: "RTX 5060", vram: 8, ram: 16, ssd: 1000, warranty: Y1 }, ["an AM5 platform with room for later CPU upgrades"]),
  F("B0DXVK2SLY", "CyberPowerPC Gaming PC (Ryzen 7 8700F, RTX 5060 Ti 8GB)", "CyberPowerPC 8700F RTX 5060 Ti", { cpu: "Ryzen 7 8700F", gpu: "RTX 5060 Ti", vram: 8, ram: 16, ramType: "DDR5", ssd: 1000, warranty: Y1 }, ["a PCIe 4.0 NVMe SSD"]),
  F("B0GYD2SV83", "KOTIN Prebuilt Gaming PC (Ryzen 7 9700X, RTX 5060 Ti 8GB)", "KOTIN 9700X RTX 5060 Ti", { cpu: "Ryzen 7 9700X", gpu: "RTX 5060 Ti", vram: 8, ram: 16, ramType: "DDR5", ssd: 1000, psu: 650, psuCert: "80 Plus Gold", warranty: Y1 }, ["a Zen 5 Ryzen 7 9700X"]),
  F("B0FNMKGVCB", "iBUYPOWER Scale (Core i5-14400F, RTX 4060 8GB)", "iBUYPOWER Scale", { cpu: "Core i5-14400F", gpu: "RTX 4060", vram: 8, ram: 16, ramType: "DDR5-5200", ssd: 1000 }, ["DDR5 memory with RGB"]),
  // RTX 5060
  F("B0G2RDTD1Y", "Skytech Gaming PC (Ryzen 7 5700, RTX 5060, 32GB)", "Skytech 5700 RTX 5060 32GB", { cpu: "Ryzen 7 5700", gpu: "RTX 5060", vram: 8, ram: 32, ssd: 1000, warranty: Y1 }, ["32GB of RAM at an RTX 5060 price"]),
  F("B0DXVDC556", "CyberPowerPC Gaming PC (Core i5-14400F, RTX 5060 8GB)", "CyberPowerPC i5 RTX 5060", { cpu: "Core i5-14400F", gpu: "RTX 5060", vram: 8, ram: 16, ramType: "DDR5", ssd: 1000, warranty: Y1 }, ["a PCIe 4.0 NVMe SSD"]),
  F("B0FW4Q6G91", "iBUYPOWER Element Black (Ryzen 7 8700F, RTX 5060 8GB)", "Element Black", { cpu: "Ryzen 7 8700F", gpu: "RTX 5060", vram: 8, ram: 32, ramType: "DDR5-5200", ssd: 1000 }, ["32GB of DDR5 RGB memory"]),
  F("B0DXV56CDD", "CyberPowerPC Gamer Master (Ryzen 5 8400F, RTX 5060 8GB)", "Gamer Master 8400F", { cpu: "Ryzen 5 8400F", gpu: "RTX 5060", vram: 8, ram: 16, ramType: "DDR5", ssd: 1000 }, ["an AM5 platform"]),
  F("B0G2RDZ7F1", "Skytech Gaming PC (Core i5-14400F, RTX 5060, White)", "Skytech i5 RTX 5060 White", { cpu: "Core i5-14400F", gpu: "RTX 5060", vram: 8, ram: 16, ssd: 1000, warranty: Y1, color: "White" }, ["a white Archangel 5 case with tempered glass"]),
  // $1,500 to $2,000
  F("B0GZKJVFXH", "Skytech Rampage Gaming PC (Core i5-14400F, RTX 5070 12GB)", "Skytech Rampage", { cpu: "Core i5-14400F", gpu: "RTX 5070", vram: 12, ram: 24, ramType: "DDR5-6000", ssd: 1000, psu: 850, psuCert: "80 Plus Gold", warranty: Y1 }, ["an 850W Gold ATX 3 power supply with room for a later GPU"]),
  F("B0FR4CLBC2", "Skytech King 95 Gaming PC (Ryzen 7 7700, RTX 4070 Super 12GB)", "Skytech King 95", { cpu: "Ryzen 7 7700", gpu: "RTX 4070 Super", vram: 12, ram: 16, ramType: "DDR5-6000", ssd: 1000, psu: 750, psuCert: "80 Plus Gold", warranty: Y1, color: "White" }, ["a white Montech King 95 case"]),
  F("B0GYXT94QS", "WIWB Gaming Desktop (Core i7-14700KF, RTX 4070 12GB)", "WIWB i7 RTX 4070", { cpu: "Core i7-14700KF", gpu: "RTX 4070", vram: 12, ram: 16, ramType: "DDR5", ssd: 1000 }, ["a Core i7-14700KF, an unlocked chip"]),
  F("B0GP66WN2J", "MSI Codex R2 (Core i5-14400F, RTX 5070 12GB)", "MSI Codex R2", { cpu: "Core i5-14400F", gpu: "RTX 5070", vram: 12, ram: 32, ramType: "DDR5", ssd: 1000 }, ["air cooling and Wi-Fi 6E listed"]),
  F("B0G2RDWN5F", "Skytech Archangel 5 Gaming PC (Ryzen 7 7700X, RTX 5070 12GB)", "Skytech Archangel 5", { cpu: "Ryzen 7 7700X", gpu: "RTX 5070", vram: 12, ram: 32, ramType: "DDR5-6000", ssd: 1000, psu: 750, psuCert: "80 Plus Gold", warranty: Y1, color: "White" }, ["a 360mm ARGB AIO cooler", "a white Archangel 5 case"]),
  F("B0GX8V3P8H", "KOTIN Prebuilt Gaming PC (Ryzen 7 7800X3D, RTX 5060 Ti 8GB)", "KOTIN 7800X3D", { cpu: "Ryzen 7 7800X3D", gpu: "RTX 5060 Ti", vram: 8, ram: 32, ramType: "DDR5", ssd: 1000, psu: 650, psuCert: "80 Plus Gold", warranty: Y1 }, ["a gaming-focused X3D CPU with a mid-range GPU to upgrade later"]),
  // RTX 5070
  F("B0H55PPW4K", "KOTIN Gaming PC (Ryzen 7 9800X3D, RTX 5070 12GB)", "KOTIN 9800X3D RTX 5070", { cpu: "Ryzen 7 9800X3D", gpu: "RTX 5070", vram: 12, ram: 32, ramType: "DDR5", ssd: 1000, psu: 850, psuCert: "80 Plus Gold", warranty: Y1 }, ["an 850W Gold power supply"]),
  F("B0H7WXCF8D", "Skytech Gaming PC (Ryzen 7 9800X3D, RTX 5070, 2TB)", "Skytech 9800X3D RTX 5070", { cpu: "Ryzen 7 9800X3D", gpu: "RTX 5070", vram: 12, ram: 32, ssd: 2000, warranty: Y1 }, ["a 2TB SSD"]),
  F("B0GS17LMD4", "iBUYPOWER Y40 (Ryzen 7 9800X3D, RTX 5070 12GB)", "iBUYPOWER Y40", { cpu: "Ryzen 7 9800X3D", gpu: "RTX 5070", vram: 12, ram: 32, ramType: "DDR5-5200", ssd: 1000 }, ["32GB of DDR5-5200 memory"]),
  F("B0GQZ2PKBM", "KOTIN Prebuilt Gaming PC (Ryzen 7 9700X, RTX 5070 12GB)", "KOTIN 9700X RTX 5070", { cpu: "Ryzen 7 9700X", gpu: "RTX 5070", vram: 12, ram: 32, ramType: "DDR5", ssd: 1000, psu: 850, psuCert: "80 Plus Gold" }, ["an 850W Gold power supply"]),
  F("B0GP2ZPSLJ", "iBUYPOWER Element (Core i7-14700F, RTX 5070 12GB)", "Element i7 RTX 5070", { cpu: "Core i7-14700F", gpu: "RTX 5070", vram: 12, ram: 32, ramType: "DDR5", ssd: 1000 }, ["a Core i7-14700F with 32GB of DDR5"]),
  F("B0DXVFWSS7", "CyberPowerPC Gaming PC (Ryzen 9 9900X, RTX 5070 12GB)", "CyberPowerPC 9900X RTX 5070", { cpu: "Ryzen 9 9900X", gpu: "RTX 5070", vram: 12, ram: 32, ramType: "DDR5", ssd: 1000, warranty: Y1 }, ["a 12-core Ryzen 9 9900X"]),
  // RTX 5070 Ti
  F("B0H14YTD1G", "KOTIN Gaming PC (Ryzen 7 9800X3D, RTX 5070 Ti 16GB)", "KOTIN 9800X3D RTX 5070 Ti", { cpu: "Ryzen 7 9800X3D", gpu: "RTX 5070 Ti", vram: 16, ram: 32, ramType: "DDR5", ssd: 1000, psu: 850, psuCert: "80 Plus Gold", warranty: Y1 }, ["an 850W Gold power supply"]),
  F("B0FBL4CR6T", "STORMCRAFT Skyhawk PRO (Ryzen 7 9800X3D, RTX 5070 Ti 16GB)", "STORMCRAFT Skyhawk PRO", { cpu: "Ryzen 7 9800X3D", gpu: "RTX 5070 Ti", vram: 16, ram: 32, ramType: "DDR5", ssd: 2000, psu: 850, psuCert: "80 Plus Gold" }, ["a 2TB SSD with an 850W Gold power supply"]),
  F("B0F4KJLYT2", "Skytech Gaming PC (Ryzen 7 9800X3D, RTX 5070 Ti, 2TB)", "Skytech 9800X3D RTX 5070 Ti", { cpu: "Ryzen 7 9800X3D", gpu: "RTX 5070 Ti", vram: 16, ram: 32, ssd: 2000, warranty: Y1 }, ["a 2TB SSD"]),
  F("B0GRGHJXLL", "Skytech O11 Vision Gaming PC (Ryzen 7 9850X3D, RTX 5070 Ti 16GB)", "Skytech O11 Vision", { cpu: "Ryzen 7 9850X3D", gpu: "RTX 5070 Ti", vram: 16, ram: 32, ramType: "DDR5-5600", ssd: 2000, psu: 850, psuCert: "80 Plus Gold", warranty: Y1, color: "White" }, ["a white Lian Li O11 Vision case"]),
  // RTX 5080
  F("B0GS3K5JHK", "ZOTAC MEK Gaming PC (Ryzen 7 9800X3D, RTX 5080 16GB)", "ZOTAC MEK", { cpu: "Ryzen 7 9800X3D", gpu: "RTX 5080", vram: 16, ram: 32, ramType: "DDR5-6000", ssd: 2000, psu: 850, psuCert: "80 Plus Gold", warranty: "1 year complete system" }, ["built by ZOTAC, which also makes the graphics card"]),
  F("B0H2FZ3J4W", "ZOTAC MEK Apocalypse (Ryzen 7 9800X3D, RTX 5080 16GB, White)", "ZOTAC MEK Apocalypse", { cpu: "Ryzen 7 9800X3D", gpu: "RTX 5080", vram: 16, ram: 32, ramType: "DDR5-6000", ssd: 2000, psu: 850, psuCert: "80 Plus Gold", warranty: "1 year complete system", color: "White" }, ["a white chassis with a white Special Edition GPU"]),
  F("B0GR8ZP38W", "STORMCRAFT Phantom (Ryzen 7 9800X3D, RTX 5080 16GB)", "STORMCRAFT Phantom", { cpu: "Ryzen 7 9800X3D", gpu: "RTX 5080", vram: 16, ram: 32, ramType: "DDR5", ssd: 2000, psu: 850, psuCert: "80 Plus Gold" }, ["an 850W Gold power supply"]),
  F("B0DVZY7V6Z", "Velztorm Black Praetix 3D (Ryzen 7 9800X3D, RTX 5080 16GB)", "Velztorm Praetix 3D", { cpu: "Ryzen 7 9800X3D", gpu: "RTX 5080", vram: 16, ram: 32, ramType: "DDR5", ssd: 2000, psu: 1000, warranty: "1 year manufacturer" }, ["a liquid-cooled CPU in a Y60 case", "a 1000W power supply"]),
  F("B0F6MY44CT", "Skytech Azure 3 (Ryzen 7 9800X3D, RTX 5080 16GB)", "Skytech Azure 3", { cpu: "Ryzen 7 9800X3D", gpu: "RTX 5080", vram: 16, ram: 32, ramType: "DDR5-6000", ssd: 2000, psu: 850, psuCert: "80 Plus Gold", warranty: Y1 }, ["an 850W Gold ATX 3 power supply"]),
  F("B0GPWNQN9H", "Skytech Gaming PC (Ryzen 7 9850X3D, RTX 5080, 2TB)", "Skytech 9850X3D RTX 5080", { cpu: "Ryzen 7 9850X3D", gpu: "RTX 5080", vram: 16, ram: 32, ssd: 2000, warranty: Y1 }, ["the newer Ryzen 7 9850X3D"]),
  // RTX 5090
  F("B0GYC57VWQ", "MAINGEAR MG-1 Champion (Ryzen 7 9850X3D, RTX 5090 32GB)", "MAINGEAR MG-1", { cpu: "Ryzen 7 9850X3D", gpu: "RTX 5090", vram: 32, ram: 32, ramType: "DDR5", ssd: 2000, psu: 1250, psuCert: "80 Plus Gold", warranty: "1 year limited" }, ["a 1250W Gold power supply"]),
  F("B0GZHT6FYP", "HP OMEN MAX 45L (Ryzen 9 9900X3D, RTX 5090 32GB)", "OMEN MAX 45L", { cpu: "Ryzen 9 9900X3D", gpu: "RTX 5090", vram: 32, ram: 64, ramType: "DDR5", ssd: 4000, psu: 1200 }, ["64GB of RAM and a 4TB SSD"]),
  F("B0GJ9PTBZG", "Panorama XL (Ryzen 7 9800X3D, RTX 5090 32GB, 64GB)", "Panorama XL", { cpu: "Ryzen 7 9800X3D", gpu: "RTX 5090", vram: 32, ram: 64, ramType: "DDR5", ssd: 2000, warranty: "3 years" }, ["a three-year warranty"]),
  F("B0HJ552GX4", "Skytech Gaming PC (Ryzen 9 9950X3D, RTX 5090)", "Skytech 9950X3D RTX 5090", { cpu: "Ryzen 9 9950X3D", gpu: "RTX 5090", vram: 32, ram: 32, ssd: 2000, warranty: Y1 }, ["a 16-core Ryzen 9 9950X3D"]),
]);
