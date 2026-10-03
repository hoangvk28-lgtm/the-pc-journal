import pool from "@/data/pcj-pool/storage.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Fill 34: internal NVMe SSDs at or below $120 for ssdxSchema. Listing titles and bullets only, reviewed by hand. Where
 * a title and bullet disagree on a figure (MP44L 500GB write speed) the figure is left out. Entries for ASINs that
 * already exist in expand28-ssd.ts replace them with fuller facts.
 */
const G4 = "PCIe 4.0 x4";
const S = (asin: string, name: string, short: string, capacity: number, read: number | undefined, pcie: string, more: Fact["specs"] = {}, notes: string[] = []) =>
  ({ asin, name, short, specs: { capacity, ...(read ? { read } : {}), pcie, ...more } as Fact["specs"], notes });

export const fill34SsdFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  S("B0GFHS1DHY", "Fikwot FN950 500GB", "Fikwot FN950 500GB", 0.5, 5000, G4, { write: 2400, warranty: 5 }, ["dynamic TLC caching", "adaptive temperature and power-efficiency management", "PS5 and laptop compatibility"]),
  S("B0CM8Q9X5W", "fanxiang S690Q 500GB", "fanxiang S690Q 500GB", 0.5, 4700, G4, { warranty: 5 }, ["a graphene heat-dissipation sticker", "NVMe 1.4 support", "PS5 compatibility"]),
  S("B0GL1R5GTW", "Fikwot FX910 500GB with Heatsink", "Fikwot FX910 500GB", 0.5, 7300, G4, { write: 6200, heatsink: true, dram: false, warranty: 5 }, ["HMB and a smart SLC cache", "DirectStorage and PS5 compatibility"]),
  S("B0DBR9RZLV", "Kingston NV3 500GB", "Kingston NV3 500GB", 0.5, 5000, G4, { write: 3000, warranty: 5 }, ["Acronis cloning software in the box"]),
  S("B0CPN8CHV2", "Acer Predator GM7 512GB", "Predator GM7 512GB", 0.5, 7200, G4, { dram: false }, ["HMB and an SLC cache", "a 12nm power-saving controller with thermal throttling", "NVMe 2.0 support"]),
  S("B0B9Y24ZM5", "Teamgroup MP44L 500GB", "MP44L 500GB", 0.5, 5000, G4, { warranty: 5 }, ["an SLC cache", "a graphene-coated aluminium label under 1mm thick", "a 5-year or TBW-limited warranty"]),
  S("B0DMHS9HQ4", "WD Green SN3000 500GB", "WD Green SN3000 500GB", 0.5, 5000, G4, {}, ["WD nCache 4.0 technology", "a single-sided M.2 2280 design for thin laptops", "free Acronis True Image migration software"]),
]);
