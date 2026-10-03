import cpuPool from "@/data/pcj-pool/cpu.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 31: further reviewed parts, and corrected sheets for listings an earlier batch recorded only partly.
 * Fields come from the listing title and bullets; a field the listing does not state is left out.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
type Pool = Record<string, { img?: string; price?: string }>;

export const extra31Facts: Record<string, Fact> = {
  ...withPool(cpuPool as Pool, [
    F("B0CQ1S3L53", "Intel Core i3-14100", "Core i3-14100", { cores: 4, threads: 8, boost: 4.7, l3: 12, socket: "LGA1700", memory: "DDR4 or DDR5", cooler: true, igpu: true }, ["Intel UHD Graphics 730 on the chip", "an Intel Laminar RM1 cooler in the box", "four performance cores and no efficiency cores"]),
  ]),
};
