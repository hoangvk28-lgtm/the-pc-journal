/**
 * PSU fact sheets. One record per ASIN, reused by every article that includes it.
 * Source: Amazon Creators API listing (title + feature bullets, data/pcj-pool/psu.json),
 * i.e. manufacturer claims, reviewed by hand. Fields are left undefined when the listing
 * does not state them or contradicts itself; the composer never invents a missing value.
 * `notes` are distinctive listed features, rewritten in plain words.
 */

export type EffTier = "Titanium" | "Platinum" | "Gold" | "Bronze";

export interface PsuFact {
  asin: string;
  name: string;
  brand: string;
  watts: number;
  form: "ATX" | "SFX" | "SFX-L";
  /** ATX version as stated consistently in the listing. */
  atx?: "3.0" | "3.1";
  eff80?: EffTier;
  cybenetics?: EffTier;
  /** Cybenetics noise class if the listing states it. */
  lambda?: "A++" | "A+" | "A" | "A-";
  depthMm?: number;
  fanMm?: number;
  bearing?: "fluid dynamic" | "rifle" | "hydraulic" | "dual ball" | "magnetic levitation";
  zeroRpm?: boolean;
  modular?: "full" | "semi" | "non";
  warrantyYears?: number;
  /** Native 12V-2x6 cables. */
  hpwr?: number;
  pcie8?: number;
  color: "black" | "white";
  notes: string[];
}

export const psuFacts: PsuFact[] = [
  // 550W
  { asin: "B0H6NJWPJ8", name: "MONTECH Century II 550W", brand: "Montech", watts: 550, form: "ATX", atx: "3.1", eff80: "Gold", fanMm: 135, zeroRpm: true, modular: "full", warrantyYears: 10, hpwr: 1, color: "black", notes: ["a 10-year warranty, unusual at this wattage", "a 135mm fan that can stop at low load"] },
  { asin: "B0FH6NV36R", name: "LIAN LI RB550", brand: "Lian Li", watts: 550, form: "ATX", atx: "3.1", eff80: "Bronze", fanMm: 135, warrantyYears: 5, color: "black", notes: ["integrated cable management rather than modular cables", "a 135mm fan for low-noise cooling"] },
  { asin: "B0GQ1QGCBT", name: "MONTECH BETA 2 550W", brand: "Montech", watts: 550, form: "ATX", atx: "3.1", eff80: "Bronze", modular: "non", color: "black", notes: ["fixed, non-modular cables that keep the cost down"] },
  { asin: "B0DLH7PRGY", name: "be quiet! Pure Power 12 550W", brand: "be quiet!", watts: 550, form: "ATX", atx: "3.1", eff80: "Gold", fanMm: 120, hpwr: 1, pcie8: 3, color: "black", notes: ["a temperature-controlled 120mm be quiet! fan", "three PCIe 6+2 connectors alongside a native 12V-2x6"] },
  // 650W
  { asin: "B0FLG4M8S2", name: "CORSAIR RM650e (ATX 3.1)", brand: "Corsair", watts: 650, form: "ATX", atx: "3.1", fanMm: 120, bearing: "rifle", modular: "full", color: "black", notes: ["105°C-rated capacitors", "Modern Standby support for fast wake from sleep"] },
  { asin: "B0DP9M9VWD", name: "Seasonic CORE GX-650 (ATX 3.1)", brand: "Seasonic", watts: 650, form: "ATX", atx: "3.1", eff80: "Gold", hpwr: 1, color: "black", notes: ["a 12V-2x6 to dual 8-pin cable in the box", "Seasonic's OptiSink heat-dissipation design"] },
  { asin: "B0H6NLHFZ9", name: "MONTECH Century II 650W", brand: "Montech", watts: 650, form: "ATX", atx: "3.1", eff80: "Gold", fanMm: 135, zeroRpm: true, modular: "full", warrantyYears: 10, hpwr: 1, color: "black", notes: ["a 10-year warranty at a low price", "a 135mm fan with a zero-RPM mode"] },
  { asin: "B0F2TQV194", name: "be quiet! Pure Power 12 650W", brand: "be quiet!", watts: 650, form: "ATX", atx: "3.1", eff80: "Gold", fanMm: 120, hpwr: 1, pcie8: 2, color: "black", notes: ["a temperature-controlled 120mm be quiet! fan", "a single strong 12V rail"] },
  { asin: "B0CFWQBDXQ", name: "Thermaltake Smart BM3 650W", brand: "Thermaltake", watts: 650, form: "ATX", atx: "3.1", eff80: "Bronze", fanMm: 120, bearing: "fluid dynamic", zeroRpm: true, modular: "semi", warrantyYears: 5, color: "black", notes: ["Japanese 105°C main capacitor", "semi-modular cables: fixed main cables, detachable extras"] },
  // 750W
  { asin: "B0FBX9VS3B", name: "be quiet! Pure Power 13 M 750W", brand: "be quiet!", watts: 750, form: "ATX", atx: "3.1", eff80: "Gold", cybenetics: "Platinum", zeroRpm: true, hpwr: 1, pcie8: 4, color: "black", notes: ["four PCIe 6+2 connectors plus a native 12V-2x6", "a fan that switches off completely at low load"] },
  { asin: "B0FLFGGDK3", name: "CORSAIR RM750e (ATX 3.1)", brand: "Corsair", watts: 750, form: "ATX", atx: "3.1", fanMm: 120, bearing: "rifle", modular: "full", color: "black", notes: ["105°C-rated capacitors", "Modern Standby support"] },
  { asin: "B0CC3QBGDL", name: "MSI MAG A750GL PCIE5", brand: "MSI", watts: 750, form: "ATX", atx: "3.1", eff80: "Gold", modular: "full", warrantyYears: 10, hpwr: 1, color: "black", notes: ["a 10-year limited warranty", "a compact body MSI markets for easier fitting"] },
  { asin: "B0DG78SHF2", name: "ASRock Phantom Gaming PG-750G", brand: "ASRock", watts: 750, form: "ATX", atx: "3.1", eff80: "Gold", cybenetics: "Platinum", depthMm: 150, modular: "full", warrantyYears: 10, hpwr: 1, color: "black", notes: ["a 90-degree 12V-2x6 cable with a temperature sensor", "individually braided cables"] },
  { asin: "B0DLFM4YNM", name: "Seasonic Focus GX-750 (ATX 3.1)", brand: "Seasonic", watts: 750, form: "ATX", atx: "3.1", eff80: "Gold", cybenetics: "Platinum", fanMm: 135, bearing: "fluid dynamic", zeroRpm: true, hpwr: 1, color: "black", notes: ["hybrid fan control with a 135mm FDB fan", "Seasonic's OptiSink design"] },
  { asin: "B0FLG9Y4HZ", name: "CORSAIR RM750x (ATX 3.1)", brand: "Corsair", watts: 750, form: "ATX", atx: "3.1", cybenetics: "Gold", modular: "full", hpwr: 1, color: "black", notes: ["embossed cables with low-profile combs", "a native 12V-2x6 cable with no adapter needed"] },
  // 1000W
  { asin: "B0FBXX1D17", name: "be quiet! Pure Power 13 M 1000W", brand: "be quiet!", watts: 1000, form: "ATX", atx: "3.1", eff80: "Gold", cybenetics: "Platinum", zeroRpm: true, hpwr: 1, pcie8: 4, color: "black", notes: ["four PCIe 6+2 connectors plus a native 12V-2x6", "semi-passive cooling at low load"] },
  { asin: "B0FLGMTSRQ", name: "CORSAIR RM1000x (ATX 3.1)", brand: "Corsair", watts: 1000, form: "ATX", atx: "3.1", cybenetics: "Gold", modular: "full", hpwr: 1, color: "black", notes: ["embossed cables with low-profile combs", "a native 12V-2x6 cable"] },
  { asin: "B0FXNTC1S8", name: "MSI MPG A1000GS PCIE5 II", brand: "MSI", watts: 1000, form: "ATX", atx: "3.1", eff80: "Gold", modular: "full", warrantyYears: 10, hpwr: 2, pcie8: 3, color: "black", notes: ["two native 12V-2x6 cables", "server-grade 105°C capacitors throughout"] },
  { asin: "B0FQ6MH33Q", name: "NZXT C1000 Gold Core (ATX 3.1)", brand: "NZXT", watts: 1000, form: "ATX", atx: "3.1", eff80: "Gold", cybenetics: "Platinum", fanMm: 135, bearing: "fluid dynamic", zeroRpm: true, modular: "full", warrantyYears: 7, hpwr: 1, color: "black", notes: ["Cybenetics noise certification listed by NZXT", "a 135mm FDB fan with zero-RPM mode"] },
  { asin: "B0FK3826VH", name: "Thermaltake Toughpower GT 1000W", brand: "Thermaltake", watts: 1000, form: "ATX", atx: "3.1", eff80: "Gold", depthMm: 140, fanMm: 120, bearing: "hydraulic", zeroRpm: true, modular: "full", hpwr: 1, color: "black", notes: ["a 140mm length, short for a 1000W unit", "flat cables for easier routing"] },
  { asin: "B0DPR5RZ1T", name: "CORSAIR RM1000e (2025)", brand: "Corsair", watts: 1000, form: "ATX", atx: "3.1", fanMm: 120, bearing: "rifle", modular: "full", color: "black", notes: ["105°C-rated capacitors", "Modern Standby support"] },
  // 1200W
  { asin: "B0GFB83GPM", name: "be quiet! Pure Power 13 M 1200W", brand: "be quiet!", watts: 1200, form: "ATX", atx: "3.1", eff80: "Gold", cybenetics: "Platinum", zeroRpm: true, hpwr: 1, pcie8: 4, color: "black", notes: ["four PCIe 6+2 connectors plus a native 12V-2x6", "semi-passive cooling at low load"] },
  { asin: "B0FKL76KM6", name: "ASRock Steel Legend SL-1200G", brand: "ASRock", watts: 1200, form: "ATX", atx: "3.1", eff80: "Gold", cybenetics: "Platinum", lambda: "A", fanMm: 135, bearing: "fluid dynamic", modular: "full", warrantyYears: 10, hpwr: 1, color: "black", notes: ["a Cybenetics LAMBDA A noise certification", "a 5V boost function for stable standby voltage"] },
  { asin: "B0CTXR7M69", name: "ASUS TUF Gaming 1200W Gold", brand: "ASUS", watts: 1200, form: "ATX", atx: "3.1", eff80: "Gold", bearing: "dual ball", modular: "full", warrantyYears: 10, color: "black", notes: ["military-grade capacitors and chokes", "a protective PCB coating against moisture and dust"] },
  { asin: "B0F1NF61BQ", name: "CORSAIR HX1200i (2025)", brand: "Corsair", watts: 1200, form: "ATX", atx: "3.1", fanMm: 140, bearing: "fluid dynamic", zeroRpm: true, modular: "full", color: "black", notes: ["monitoring and fan control through Corsair iCUE", "a 140mm FDB fan with zero-RPM mode"] },
  { asin: "B0C571DW23", name: "Seasonic Vertex PX-1200", brand: "Seasonic", watts: 1200, form: "ATX", eff80: "Platinum", fanMm: 135, bearing: "fluid dynamic", zeroRpm: true, modular: "full", hpwr: 1, color: "black", notes: ["Seasonic's hybrid silent fan control", "a 135mm FDB fan"] },
  { asin: "B0CYTK6LNQ", name: "Super Flower Leadex VII XP PRO 1200W", brand: "Super Flower", watts: 1200, form: "ATX", eff80: "Platinum", cybenetics: "Platinum", modular: "full", hpwr: 1, color: "black", notes: ["listed voltage regulation within ±0.5% on the main rails", "flexible ribbon cables"] },
  // 1500W and above
  { asin: "B0F1NGKBK3", name: "CORSAIR HX1500i (2025)", brand: "Corsair", watts: 1500, form: "ATX", atx: "3.1", fanMm: 140, bearing: "fluid dynamic", zeroRpm: true, modular: "full", color: "black", notes: ["monitoring and fan control through Corsair iCUE", "a 140mm FDB fan with zero-RPM mode"] },
  { asin: "B0DNNZ9G46", name: "ASRock Phantom Gaming PG-1600G", brand: "ASRock", watts: 1600, form: "ATX", atx: "3.1", eff80: "Gold", cybenetics: "Platinum", depthMm: 180, fanMm: 135, bearing: "fluid dynamic", modular: "full", warrantyYears: 10, hpwr: 2, pcie8: 8, color: "black", notes: ["two 12V-2x6 cables with temperature monitoring", "a 180mm length that needs a large case"] },
  { asin: "B0C57132H5", name: "Seasonic PRIME PX-1600 (ATX 3.1)", brand: "Seasonic", watts: 1600, form: "ATX", atx: "3.1", eff80: "Platinum", cybenetics: "Titanium", fanMm: 135, bearing: "fluid dynamic", zeroRpm: true, hpwr: 2, color: "black", notes: ["two native 12V-2x6 cables", "a Cybenetics Titanium efficiency rating"] },
  { asin: "B0HF7BB2NF", name: "be quiet! Dark Power Pro 14 IO 1600W", brand: "be quiet!", watts: 1600, form: "ATX", atx: "3.1", eff80: "Titanium", cybenetics: "Titanium", zeroRpm: true, hpwr: 1, color: "black", notes: ["monitoring and control through be quiet!'s IO Center software", "a switchable active or semi-passive fan mode"] },
  { asin: "B0D1VDZST3", name: "NZXT C1500 Platinum (ATX 3.1)", brand: "NZXT", watts: 1500, form: "ATX", atx: "3.1", eff80: "Platinum", cybenetics: "Titanium", fanMm: 140, bearing: "magnetic levitation", zeroRpm: true, modular: "full", hpwr: 2, color: "black", notes: ["digital power control", "a 140mm magnetic-levitation fan"] },
  { asin: "B0DMW5F3GG", name: "Seasonic PRIME TX-1600 Noctua Edition", brand: "Seasonic", watts: 1600, form: "ATX", atx: "3.1", eff80: "Titanium", lambda: "A", zeroRpm: true, modular: "full", hpwr: 1, color: "black", notes: ["a Noctua NF-A12x25 fan with a custom fan curve", "Noctua-themed cabling"] },
  // SFX
  { asin: "B0D45QCZHX", name: "CORSAIR SF750 (2024)", brand: "Corsair", watts: 750, form: "SFX", atx: "3.1", eff80: "Platinum", fanMm: 92, bearing: "fluid dynamic", modular: "full", color: "black", notes: ["a 92mm PWM fan", "105°C-rated Japanese capacitors"] },
  { asin: "B0D45PQ8C4", name: "CORSAIR SF850 (2024)", brand: "Corsair", watts: 850, form: "SFX", atx: "3.0", eff80: "Platinum", fanMm: 92, bearing: "fluid dynamic", modular: "full", color: "black", notes: ["a 92mm PWM fan", "105°C-rated Japanese capacitors"] },
  { asin: "B0FJC6FM1C", name: "LIAN LI SP750 V2", brand: "Lian Li", watts: 750, form: "SFX", atx: "3.1", eff80: "Gold", fanMm: 92, bearing: "fluid dynamic", modular: "full", warrantyYears: 10, hpwr: 1, color: "black", notes: ["a two-tone 12V-2x6 cable that shows whether it is seated", "a 92mm FDB fan"] },
  { asin: "B08LP7B7FM", name: "Cooler Master V750 SFX Gold", brand: "Cooler Master", watts: 750, form: "SFX", atx: "3.1", eff80: "Gold", hpwr: 1, color: "black", notes: ["a 90-degree 12V-2x6 cable for tight cases", "cable lengths cut for small-form-factor builds"] },
  { asin: "B0BZFQZR81", name: "ASUS ROG Loki SFX-L 750W Platinum", brand: "ASUS", watts: 750, form: "SFX-L", eff80: "Platinum", lambda: "A", fanMm: 120, modular: "full", warrantyYears: 10, color: "black", notes: ["a 120mm fan, larger than standard SFX", "ROG heatsinks over key components"] },
  { asin: "B0FN7FJ2CM", name: "LIAN LI SP1000P", brand: "Lian Li", watts: 1000, form: "SFX", eff80: "Platinum", depthMm: 100, zeroRpm: true, color: "black", notes: ["1000W in a standard 100mm-deep SFX body", "an SFX-to-ATX bracket in the box"] },
  // White
  { asin: "B0FLG9RNY4", name: "CORSAIR RM750e White (ATX 3.1)", brand: "Corsair", watts: 750, form: "ATX", atx: "3.1", fanMm: 120, bearing: "rifle", modular: "full", color: "white", notes: ["white housing with matching white cables", "105°C-rated capacitors"] },
  { asin: "B0DGB1HF7C", name: "ASRock Steel Legend SL-850GW White", brand: "ASRock", watts: 850, form: "ATX", atx: "3.1", eff80: "Gold", cybenetics: "Platinum", depthMm: 150, fanMm: 135, modular: "full", warrantyYears: 10, hpwr: 1, color: "white", notes: ["a dual-color 12V-2x6 cable", "a 10-year warranty on a white unit"] },
  { asin: "B0CT41HW5J", name: "MSI MAG A850GL PCIE5 White", brand: "MSI", watts: 850, form: "ATX", atx: "3.1", eff80: "Gold", modular: "full", warrantyYears: 5, hpwr: 1, color: "white", notes: ["white housing and cables", "a 5-year limited warranty on the white version"] },
  { asin: "B0DZXKYWSH", name: "CORSAIR RM1000e White (2025)", brand: "Corsair", watts: 1000, form: "ATX", atx: "3.1", fanMm: 120, bearing: "rifle", modular: "full", color: "white", notes: ["white housing with matching cables", "Modern Standby support"] },
  { asin: "B0DN15R9WR", name: "LIAN LI Edge Gold 1000W White", brand: "Lian Li", watts: 1000, form: "ATX", atx: "3.1", eff80: "Gold", cybenetics: "Gold", hpwr: 1, color: "white", notes: ["a magnetic dust filter over the fan", "an Edge design meant to be shown off in glass cases"] },
  { asin: "B0DM2GN35Q", name: "SAMA GT650 White", brand: "SAMA", watts: 650, form: "ATX", atx: "3.1", fanMm: 120, bearing: "fluid dynamic", zeroRpm: true, modular: "full", hpwr: 1, color: "white", notes: ["an ECO silent mode for low-load quiet", "embossed white cables"] },
  // Under $100
  { asin: "B0H14KK47V", name: "darkFlash DG750", brand: "darkFlash", watts: 750, form: "ATX", atx: "3.1", eff80: "Gold", depthMm: 140, modular: "full", warrantyYears: 5, hpwr: 1, color: "black", notes: ["a 140mm body that leaves room for cables", "a hydraulic-bearing fan"] },
  { asin: "B0GRV3GFZS", name: "darkFlash DG850", brand: "darkFlash", watts: 850, form: "ATX", atx: "3.1", eff80: "Gold", depthMm: 140, modular: "full", warrantyYears: 5, hpwr: 1, color: "black", notes: ["850W in a 140mm body", "multi-protection circuitry"] },
  { asin: "B0DM2HP39G", name: "SAMA GT750", brand: "SAMA", watts: 750, form: "ATX", atx: "3.1", cybenetics: "Gold", fanMm: 120, bearing: "fluid dynamic", zeroRpm: true, modular: "full", hpwr: 1, color: "black", notes: ["Japanese capacitors with an LLC and DC-DC design", "an ECO silent mode for low load"] },
  { asin: "B0FFQN6344", name: "Rosewill VMG 850W", brand: "Rosewill", watts: 850, form: "ATX", eff80: "Gold", fanMm: 120, modular: "full", warrantyYears: 5, hpwr: 1, color: "black", notes: ["listed support for large GPU power excursions", "a compact build Rosewill markets for smaller cases"] },
  { asin: "B0DJ6DGHCP", name: "Thermaltake Toughpower GT 850W", brand: "Thermaltake", watts: 850, form: "ATX", atx: "3.1", eff80: "Gold", zeroRpm: true, modular: "full", warrantyYears: 5, hpwr: 1, color: "black", notes: ["Smart Zero Fan mode", "a single high-amperage 12V rail"] },
  { asin: "B0F2TNT86D", name: "be quiet! Pure Power 12 750W", brand: "be quiet!", watts: 750, form: "ATX", atx: "3.1", eff80: "Gold", fanMm: 120, hpwr: 1, pcie8: 3, color: "black", notes: ["a temperature-controlled 120mm be quiet! fan", "three PCIe 6+2 connectors plus a native 12V-2x6"] },
  // Platinum / Titanium
  { asin: "B0DVJNMCR1", name: "be quiet! Power Zone 2 850W", brand: "be quiet!", watts: 850, form: "ATX", atx: "3.1", eff80: "Platinum", cybenetics: "Platinum", fanMm: 140, zeroRpm: true, hpwr: 1, pcie8: 3, color: "black", notes: ["a 140mm Pure Wings 3 fan that stops at low load", "Platinum rating from both 80 Plus and Cybenetics"] },
  { asin: "B0GCRW4ZK2", name: "Super Flower Leadex VIII Platinum PRO 850W", brand: "Super Flower", watts: 850, form: "ATX", atx: "3.1", cybenetics: "Platinum", depthMm: 125, fanMm: 120, bearing: "fluid dynamic", modular: "full", hpwr: 1, color: "black", notes: ["a 125mm length that Super Flower calls the smallest 850W Platinum ATX unit", "braided ribbon cables"] },
  { asin: "B0DJ1T9VXB", name: "ASUS ROG Strix 1000W Platinum", brand: "ASUS", watts: 1000, form: "ATX", atx: "3.1", eff80: "Platinum", lambda: "A", bearing: "dual ball", zeroRpm: true, modular: "full", warrantyYears: 10, color: "black", notes: ["GaN MOSFETs", "GPU-first voltage sensing for the graphics card rail"] },
  { asin: "B0C571R3V8", name: "Seasonic Vertex PX-1000 (ATX 3.1)", brand: "Seasonic", watts: 1000, form: "ATX", atx: "3.1", eff80: "Platinum", cybenetics: "Platinum", lambda: "A", fanMm: 135, bearing: "fluid dynamic", zeroRpm: true, hpwr: 1, color: "black", notes: ["100% Japanese capacitors", "hybrid fan control with a 135mm FDB fan"] },
  { asin: "B0BV6CWS2Z", name: "be quiet! Dark Power 13 1000W", brand: "be quiet!", watts: 1000, form: "ATX", eff80: "Titanium", color: "black", notes: ["a frameless Silent Wings fan behind a full-mesh front", "a switch between four 12V rails and one single rail"] },
  { asin: "B0D467S15T", name: "FSP Hydro Ti Pro 1000W", brand: "FSP", watts: 1000, form: "ATX", atx: "3.1", eff80: "Titanium", cybenetics: "Titanium", lambda: "A++", depthMm: 150, fanMm: 135, bearing: "fluid dynamic", zeroRpm: true, modular: "full", warrantyYears: 10, hpwr: 1, pcie8: 5, color: "black", notes: ["five PCIe 6+2 connectors plus a 12V-2x6", "a Cybenetics LAMBDA A++ noise certification"] },
];

export const psuFact = (asin: string): PsuFact => {
  const f = psuFacts.find((x) => x.asin === asin);
  if (!f) throw new Error(`No PSU fact sheet for ${asin}`);
  return f;
};
