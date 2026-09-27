import pool from "@/data/pcj-pool/external-storage.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { storage13eFacts } from "./storage13e";
import { withPool } from "./helpers";

/** Batch 15d fact sheets: 2TB-class portable SSDs. Listing claims only, reviewed by hand. Read speeds are manufacturer maximums. */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const storage15dFacts: Record<string, Fact> = {
  ...storage13eFacts,
  ...withPool(pool as Pool, [
    F("B0CHFS9K14", "Samsung T9 Portable SSD 2TB", "T9 2TB", { kind: "SSD", capacity: 2, read: 2000, port: "USB 3.2 Gen 2x2", rugged: "Not stated", security: "Encryption via Magician software" }, ["sustained read and write speeds up to 2,000MB/s", "a Dynamic Thermal Guard heat solution for long transfers", "support for iPhone 15 Pro ProRes 4K60 recording"]),
    F("B0C9WGS6MC", "Crucial X10 Pro Portable SSD 2TB", "X10 Pro 2TB", { kind: "SSD", capacity: 2, read: 2100, port: "USB 3.2 (USB-C, USB-A supported)", rugged: "IP55, drops up to 7.5ft", security: "SSD password protection" }, ["2,000MB/s rated writes", "a lanyard loop and activity light", "three months of Mylio Photos+ and Acronis True Image"]),
    F("B09VLHR4JC", "Samsung T7 Shield Portable SSD 2TB", "T7 Shield 2TB", { kind: "SSD", capacity: 2, read: 1050, port: "USB 3.2 Gen 2", rugged: "IP65, drops up to 9.8ft", security: "None stated" }, ["an IP65 water and dust rating", "drop protection up to 9.8ft", "Magician software for drive health and firmware updates"]),
    F("B0F38HLNLC", "LaCie Rugged SSD4 1TB", "Rugged SSD4", { kind: "SSD", capacity: 1, read: 4000, port: "USB 40Gbps (Thunderbolt 3, 4 and 5 compatible)", rugged: "IP54, drops up to 3m, 1-ton pressure", security: "None stated" }, ["3,800MB/s rated writes", "compatibility with Thunderbolt 3, 4 and 5 as well as 5-20Gbps USB", "a three-year warranty with Rescue data recovery"]),
    F("B08XKNBDNJ", "Seagate One Touch SSD 2TB", "One Touch SSD 2TB", { kind: "SSD", capacity: 2, read: 1030, port: "USB 3 (as listed)", rugged: "Not stated", security: "None stated" }, ["a lightweight textile-covered design", "a three-year warranty with Rescue data recovery", "a six-month Mylio Photos+ subscription and a Dropbox Backup trial"]),
  ]),
};
