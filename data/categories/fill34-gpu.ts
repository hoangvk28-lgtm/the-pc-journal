import pool from "@/data/pcj-pool/gpu.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Fill 34: new-condition graphics cards with 8GB or more of video memory at $350 or less, for gpuRangeSchema. Listing
 * titles and bullets only, reviewed by hand; the Arc A750 Limited Edition listing states only the chip, 8GB and PCIe 4.0.
 * Renewed RX 6600 XT cards, 6GB RTX 3050 cards and PSU bundles are skipped.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const fill34GpuFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  F("B0BJJPCPY2", "Intel Arc A750 Limited Edition 8GB", "Arc A750 Limited Edition", { chip: "Arc A750", vram: 8 }, ["a PCIe 4.0 interface", "Intel's Limited Edition build"]),
  F("B0BJSYQ822", "ASRock Intel Arc A750 Challenger D 8GB OC", "Arc A750 Challenger D", { chip: "Arc A750", vram: 8, mem: "GDDR6", boost: "2200MHz" }, ["a 256-bit memory bus", "a dual-fan cooler with 0dB silent cooling", "a metal backplate"]),
]);
