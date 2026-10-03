import pool from "@/data/pcj-pool/storage.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Fill 34: portable SSDs at or below $150 for storage13eSchema. Listing titles and bullets only, reviewed by hand;
 * unstated fields stay undefined or "Not stated". Entries for ASINs that already exist in expand28-storage.ts replace
 * them with fuller facts. Colour variants, hard drives and sub-512GB drives are not included.
 */
const P = (asin: string, name: string, short: string, capacity: number, read: number | undefined, port: string, rugged = "Not stated", security = "None stated", notes: string[] = []) =>
  ({ asin, name, short, specs: { kind: "SSD", capacity, read, port, rugged, security } as Fact["specs"], notes });
const G2 = "USB 3.2 Gen 2 (10Gbps)", G22 = "USB 3.2 Gen 2x2 (20Gbps)";

export const fill34StorageFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  P("B0D7MFTBYB", "SSK 512GB Portable SSD", "SSK 512GB", 0.5, 550, G2, "Not stated", "None stated", ["USB-C and USB-A connections", "S.M.A.R.T. health monitoring and TRIM", "an SLC cache and an activity LED"]),
  P("B082VZC5JN", "Vansuny 500GB Portable SSD", "Vansuny 500GB", 0.5, 450, "USB 3.1 Gen 2", "Waterproof, shockproof (maker claim)", "None stated", ["a metal body smaller than a palm", "400MB/s rated writes", "a type-A adapter, cable and storage bag in the box"]),
  P("B0GCL9DSNZ", "Orlian 500GB Portable SSD", "Orlian 500GB", 0.5, 500, "USB 3.1 Gen 2", "Waterproof, dustproof, shockproof (maker claim)", "None stated", ["an aluminium alloy body", "450MB/s rated writes", "a USB-C cable and USB-A adapter in the box"]),
  P("B0FRMR5JL2", "GARMESE Portable SSD 500GB", "GARMESE 500GB", 0.5, 1000, G2, "Shock resistant", "None stated", ["a USB-C to USB-A cable and adapter", "plug-and-play use with no drivers", "console compatibility"]),
  P("B0H8Z5GY7T", "SanDisk Portable Drive 500GB (600MB/s)", "SanDisk Portable 500GB", 0.5, 600, "USB-C", "Drops up to 2m", "None stated", ["a pocket-sized body", "no moving parts"]),
  P("B0H4HKMBB4", "SanDisk Portable SSD 500GB (new model)", "SanDisk Portable SSD 500GB", 0.5, 1000, "USB-C", "Drops up to 2m", "None stated", ["a pocket-sized body", "no drivers or setup"]),
  P("B0H1PFZZ5Y", "nusyn NSP35 Portable SSD 1TB", "nusyn NSP35 1TB", 1, 1050, G2, "IP67, drops up to 1.5m", "None stated", ["an alloy housing", "a carabiner loop", "USB-C compatibility with phones and tablets"]),
  P("B0H3XD9351", "SanDisk Portable Drive 1TB (600MB/s)", "SanDisk Portable 1TB", 1, 600, "USB-C", "Drops up to 2m", "None stated", ["a pocket-sized body", "no moving parts"]),
  P("B0DHH81K13", "Verbatim Pocket SSD 1TB", "Verbatim Pocket 1TB", 1, 1000, "USB 3.2 Gen 2", "Not stated", "None stated", ["1,000MB/s rated writes", "a keyring and cable holder", "Nero Backup software for Windows"]),
  P("B093275Z7V", "Buffalo External SSD Stick 1TB", "Buffalo SSD Stick 1TB", 1, 600, "USB 3.2 Gen 2 (USB-C and USB-A)", "Shock resistant, rugged build", "None stated", ["a retractable stick design", "PS4 and PS5 compatibility", "a 3-year warranty when registered"]),
  P("B09F5WJV8R", "Kingston XS2000 500GB", "Kingston XS2000 500GB", 0.5, 2000, G22, "Not stated", "None stated", ["a pocket-sized body", "capacities up to 4TB in the range"]),
  P("B09VS3FCQ2", "ADATA SE880 1TB", "ADATA SE880 1TB", 1, 2000, G22, "Not stated", "None stated", ["support for new-generation game consoles", "a titanium finish"]),
]);
