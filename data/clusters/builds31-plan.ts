/**
 * Batch 31 build plans (techbuyersguru "best" list, PC builds). Each plan says what the build is for and what the planner may choose from;
 * scripts/pcj-plan-builds.ts resolves it against the reviewed fact sheets into explicit ASINs (data/clusters/builds31.ts).
 * Copy (lead, close, labels) lives in builds31-copy.ts, written after the parts are known.
 */
export interface BuildPlan {
  slug: string;
  /** Short title, at most 43 characters. */
  seo: string;
  kw: string;
  budget: number;
  /** Candidate processors, lowest preference first. */
  cpus: string[];
  /** Graphics card chip range; false for integrated graphics. */
  gpu: false | { min: string; max?: string };
  /** Board size: 1 Mini-ITX, 2 Micro-ATX, 3 ATX. */
  form: 1 | 2 | 3;
  gen: "DDR4" | "DDR5";
  ramCap: number;
  ssdCap: number;
  cooler: "stock" | "air" | "aio";
  aio?: number;
  /** Lowest part-quality percentile the planner may fall back to. */
  qMin: number;
  /** Fixed picks the planner must keep. */
  pin?: Partial<Record<"cpu" | "cooler" | "mb" | "ram" | "ssd" | "gpu" | "psu" | "case", string>>;
  caseRe?: string; psuRe?: string; coolerRe?: string; mbRe?: string; ramRe?: string; ssdRe?: string;
  /** Require a stated card length (small cases). */
  knownLen?: boolean;
  /** Minimum number of monitor outputs the graphics card must list. */
  outputs?: number;
  /** Highest PSU wattage above the card's recommendation. */
  psuMax?: number;
  /** Rank processors before graphics cards (creator and workstation builds). */
  cpuFirst?: boolean;
  /** Accept a case whose listing gives no graphics card length limit (the guide then asks the reader to confirm it). */
  looseCase?: boolean;
}

export const PLANS: BuildPlan[] = [
  { slug: "best-600-home-office-pc-build", seo: "Best $600 Home Office PC Build", kw: "600 dollar home office pc build", budget: 600, cpus: ["B0CQ1S3L53"], gpu: false, form: 2, gen: "DDR4", ramCap: 16, ssdCap: 0.5, cooler: "stock", qMin: 0.1 },
  { slug: "best-750-small-office-compact-pc-build", seo: "Best $750 Small Office Compact PC Build", kw: "750 dollar small office compact pc build", budget: 750, cpus: ["B092L9GF5N"], gpu: false, form: 2, gen: "DDR4", ramCap: 16, ssdCap: 1, cooler: "stock", qMin: 0.1, caseRe: "A3-mATX|B4-mATX|Q300L|QUBE 340|D31|Z20|AP201|O11 Vision-M" },
  { slug: "best-900-mini-itx-office-pc-build", seo: "Best $900 Mini-ITX Office PC Build", kw: "900 dollar mini itx office pc build", budget: 900, cpus: ["B0CQ4JV8D5", "B0CQ4GYTTX"], gpu: false, form: 1, gen: "DDR5", ramCap: 16, ssdCap: 0.5, cooler: "stock", qMin: 0.1, caseRe: "Tower 250|TK-1|Meshroom|Mood", ramRe: "Kingston|Crucial|TEAMGROUP|CORSAIR" },
  { slug: "best-850-budget-gaming-pc-build", seo: "Best $850 Budget Gaming PC Build", kw: "850 dollar budget gaming pc build", budget: 850, cpus: ["B09VCJ171S", "B09VCHR1VH"], gpu: { min: "RTX 5050" }, form: 2, gen: "DDR4", ramCap: 16, ssdCap: 0.5, cooler: "stock", qMin: 0 },
  { slug: "best-1000-mid-range-gaming-pc-build", seo: "Best $1000 Mid-Range Gaming PC Build", kw: "1000 dollar mid range gaming pc build", budget: 1000, cpus: ["B09VCHR1VH", "B09VCHQHZ6", "B0CQ1Y7KHV"], gpu: { min: "RTX 5050" }, form: 2, gen: "DDR4", ramCap: 16, ssdCap: 1, cooler: "air", qMin: 0 },
  { slug: "best-1250-quiet-gaming-pc-build", seo: "Best $1250 Quiet Gaming PC Build", kw: "1250 dollar quiet gaming pc build", budget: 1250, cpus: ["B09VCHR1VH", "B09VCHQHZ6"], gpu: { min: "RTX 5050" }, form: 2, gen: "DDR4", ramCap: 16, ssdCap: 1, cooler: "air", qMin: 0.3, coolerRe: "Noctua|be quiet", caseRe: "Pure Base 501|Define 7", looseCase: true, psuRe: "be quiet|Seasonic|CORSAIR" },
  { slug: "best-1500-high-end-gaming-pc-build", seo: "Best $1500 High-End Gaming PC Build", kw: "1500 dollar high end gaming pc build", budget: 1500, cpus: ["B0BMQJWBDM", "B0F9XH8DBP", "B0C3T39N6P"], gpu: { min: "RTX 5060" }, form: 2, gen: "DDR5", ramCap: 16, ssdCap: 1, cooler: "air", qMin: 0.3 },
  { slug: "best-1750-advanced-gaming-pc-build", seo: "Best $1750 Advanced Gaming PC Build", kw: "1750 dollar advanced gaming pc build", budget: 1750, cpus: ["B09VCHQHZ6", "B0H41D4KFT"], gpu: { min: "RTX 5060 Ti" }, form: 3, gen: "DDR4", ramCap: 32, ssdCap: 1, cooler: "air", qMin: 0.3 },
  { slug: "best-2000-premium-gaming-pc-build", seo: "Best $2000 Premium Gaming PC Build", kw: "2000 dollar premium gaming pc build", budget: 2000, cpus: ["B0F9XH8DBP", "B0BTZB7F88", "B0DKFMSMYK"], gpu: { min: "RTX 5060 Ti" }, form: 3, gen: "DDR5", ramCap: 32, ssdCap: 1, cooler: "air", qMin: 0.4 },
  { slug: "best-2500-extreme-4k-gaming-pc-build", seo: "Best $2500 Extreme 4K Gaming PC Build", kw: "2500 dollar 4k gaming pc build", budget: 2500, cpus: ["B0BTZB7F88", "B0DKFMSMYK"], gpu: { min: "RTX 5070" }, form: 3, gen: "DDR5", ramCap: 32, ssdCap: 2, cooler: "aio", aio: 360, qMin: 0.4 },
  { slug: "best-3000-elite-rgb-gaming-pc-build", seo: "Best $3000 Elite RGB Gaming PC Build", kw: "3000 dollar rgb gaming pc build", budget: 3000, cpus: ["B0DKFMSMYK", "B0G8JMLXNQ"], gpu: { min: "RTX 5070" }, form: 3, gen: "DDR5", ramCap: 32, ssdCap: 1, cooler: "aio", aio: 360, qMin: 0.5, coolerRe: "iCUE|NZXT|Lian Li|ASUS|ARGB|RGB", caseRe: "Lian Li|NZXT|Corsair|HYTE|Montech King", ramRe: "RGB" },
  { slug: "best-3500-ultimate-gaming-pc-build", seo: "Best $3500 Ultimate Gaming PC Build", kw: "3500 dollar ultimate gaming pc build", budget: 3500, cpus: ["B0DFK2MH2D", "B0DFKC99VL"], gpu: { min: "RTX 5070 Ti" }, form: 3, gen: "DDR5", ramCap: 32, ssdCap: 2, cooler: "aio", aio: 360, qMin: 0.5 },
  { slug: "best-5000-dream-machine-gaming-pc-build", seo: "Best $5000 Dream Machine Gaming PC Build", kw: "5000 dollar dream machine gaming pc build", budget: 5000, cpus: ["B0DWGWN8GY", "B0DVZSG8D5"], gpu: { min: "RTX 5080" }, form: 3, gen: "DDR5", ramCap: 64, ssdCap: 2, cooler: "aio", aio: 360, qMin: 0.5 },
  { slug: "best-10000-supreme-creator-pc-build", seo: "Best $10,000 Supreme Creator PC Build", kw: "10000 dollar creator pc build", budget: 10000, cpus: ["B0D6NNRBGP", "B0DVZSG8D5"], gpu: { min: "RTX 5090" }, form: 3, gen: "DDR5", ramCap: 64, ssdCap: 2, cooler: "aio", aio: 360, qMin: 0.1, cpuFirst: true },
  { slug: "best-2000-high-end-creator-pc-build", seo: "Best $2000 High-End Creator PC Build", kw: "2000 dollar creator pc build", budget: 2000, cpus: ["B0D6NN87T8", "B0D6NNRBGP"], gpu: { min: "RTX 5050", max: "RTX 5060" }, form: 3, gen: "DDR5", ramCap: 32, ssdCap: 2, cooler: "aio", aio: 360, qMin: 0.2, cpuFirst: true },
  { slug: "best-1000-content-creation-pc-build", seo: "Best $1000 Content Creation PC Build", kw: "1000 dollar content creation pc build", budget: 1000, cpus: ["B091J3NYVF"], gpu: false, form: 2, gen: "DDR4", ramCap: 32, ssdCap: 1, cooler: "air", qMin: 0.1, cpuFirst: true },
  { slug: "best-1250-stock-trading-pc-build", seo: "Best $1250 Stock Trading PC Build", kw: "1250 dollar stock trading pc build", budget: 1250, cpus: ["B09VCHR1VH", "B09VCHQHZ6"], gpu: { min: "RX 6500 XT" }, form: 2, gen: "DDR4", ramCap: 32, ssdCap: 1, cooler: "air", qMin: 0.1, outputs: 4 },
  { slug: "best-1000-home-theater-pc-build", seo: "Best $1000 Home Theater PC Build", kw: "1000 dollar home theater pc build", budget: 1000, cpus: ["B0CQ4GYTTX", "B0CQ4JBKW3"], gpu: false, form: 1, gen: "DDR5", ramCap: 16, ssdCap: 1, cooler: "stock", qMin: 0, caseRe: "Tower 250|Terra|Mood|TK-1|D31|D33|Meshroom|A3-mATX", ramRe: "Kingston|Crucial|TEAMGROUP|CORSAIR|Patriot" },
  { slug: "best-1250-compact-mini-itx-gaming-pc-build", seo: "Best $1250 Mini-ITX Gaming PC Build", kw: "1250 dollar mini itx gaming pc build", budget: 1250, cpus: ["B0BMQJWBDM"], gpu: { min: "Arc A580" }, form: 1, gen: "DDR5", ramCap: 16, ssdCap: 0.5, cooler: "air", qMin: 0.1, knownLen: true },
  { slug: "best-1500-high-end-mini-itx-gaming-pc-build", seo: "Best $1500 Mini-ITX Gaming PC Build", kw: "1500 dollar mini itx gaming pc build", budget: 1500, cpus: ["B0BMQJWBDM", "B0F9XH8DBP"], gpu: { min: "RTX 5050" }, form: 1, gen: "DDR5", ramCap: 16, ssdCap: 1, cooler: "air", qMin: 0.1, knownLen: true, ramRe: "Kingston|Crucial|TEAMGROUP", ssdRe: "Samsung|WD|Lexar|Crucial|Kingston", caseRe: "Tower 250|Terra|Mood|TK-1|D31|D33|Meshroom|A3-mATX|Xhuttle", psuRe: "CORSAIR|Cooler Master|ASUS|Thermaltake|MSI|ASRock|NZXT|be quiet|Super Flower|MONTECH" },
  { slug: "best-2000-premium-mini-itx-gaming-pc-build", seo: "Best $2000 Premium Mini-ITX Gaming PC Build", kw: "2000 dollar mini itx gaming pc build", budget: 2000, cpus: ["B0F9XH8DBP", "B0BTZB7F88"], gpu: { min: "RTX 5060 Ti" }, form: 1, gen: "DDR5", ramCap: 32, ssdCap: 1, cooler: "air", qMin: 0.2, knownLen: true },
  { slug: "best-3000-extreme-mini-itx-gaming-pc-build", seo: "Best $3000 Extreme Mini-ITX Gaming PC Build", kw: "3000 dollar mini itx gaming pc build", budget: 3000, cpus: ["B0BTZB7F88", "B0DKFMSMYK"], gpu: { min: "RTX 5070" }, form: 1, gen: "DDR5", ramCap: 32, ssdCap: 2, cooler: "aio", aio: 240, qMin: 0.3, knownLen: true },
];
