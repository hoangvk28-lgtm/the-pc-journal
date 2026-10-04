import handheldPool from "@/data/pcj-pool/handheld36.json";
import ssdPool from "@/data/pcj-pool/ssd36.json";
import storagePool from "@/data/pcj-pool/storage.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 36 SSD facts: handheld M.2 2230 and 2242 drives, SATA 2.5-inch drives, 8TB drives and laptop-listed NVMe drives.
 * Every field comes from the listing title or bullets; a field the listing omits or contradicts is left undefined.
 * Dropped on purpose: OEM-new pulls (Micron 2500, Samsung BM9C1, Kingston OM3SGP4), OSCOO 2242 (title and bullets disagree
 * on read speed), Samsung 870 EVO 8TB (price far above the 8TB QVO) and the 8TB Sabrent Rocket 4 Plus (price anomaly).
 */
type Pool = Record<string, { img?: string; price?: string }>;
const pool = { ...(storagePool as Pool), ...(ssdPool as Pool), ...(handheldPool as Pool) };
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const G2230 = "PCIe 4.0 x4 (M.2 2230)";
const G2242 = "PCIe 4.0 x4 (M.2 2242)";
const SATA = "SATA III (2.5-inch)";

export const handheld36Facts: Record<string, Fact> = withPool(pool, [
  // ---- M.2 2230 handheld drives
  F("B0FH4QHSVR", "OSCOO ON1000T 1TB (M.2 2230)", "ON1000T 1TB", { capacity: 1, read: 5200, write: 4800, pcie: G2230 }, ["AES-256 encryption, TRIM and S.M.A.R.T. support", "up to 300K random IOPS", "a graphene heat-spreader label in place of a bulky heatsink"]),
  F("B0GP8YND8T", "SanDisk Optimus GX 7100M 1TB (M.2 2230)", "Optimus GX 7100M", { capacity: 1, read: 7250, write: 6900, pcie: G2230 }, ["8th-generation BiCS TLC NAND", "a power-efficient design SanDisk pitches at handheld battery life", "DirectStorage support", "SanDisk Dashboard Game Mode and Acronis migration software"]),
  F("B0DDN9CJCK", "DATO ARS430 1TB (M.2 2230)", "ARS430 1TB", { capacity: 1, read: 5000, write: 3200, pcie: G2230, heatsink: true, warranty: 5 }, ["an aluminium heatsink that DATO says outperforms graphene labels", "single-sided 3D NAND for thin devices", "thermal-throttling protection"]),
  F("B0DDP2H5VZ", "DATO ARS430 2TB (M.2 2230)", "ARS430 2TB", { capacity: 2, read: 5000, write: 3200, pcie: G2230, heatsink: true, warranty: 5 }, ["an aluminium heatsink that DATO says outperforms graphene labels", "single-sided 3D NAND for thin devices", "2TB in the short 2230 size"]),
  F("B0FD2NQKQ8", "Kingston NV3 500GB (M.2 2230)", "NV3 500GB 2230", { capacity: 0.5, read: 5000, pcie: G2230 }, ["Kingston's Gen 4x4 NVMe in a low-power design", "listed use in handheld gaming devices and small-form-factor PCs"]),
  F("B0FD2LGBZF", "Kingston NV3 1TB (M.2 2230)", "NV3 1TB 2230", { capacity: 1, read: 6000, pcie: G2230 }, ["Kingston's Gen 4x4 NVMe in a low-power design", "listed use in handheld gaming devices and small-form-factor PCs"]),
  F("B0FD2P1L37", "Kingston NV3 2TB (M.2 2230)", "NV3 2TB 2230", { capacity: 2, read: 6000, pcie: G2230 }, ["Kingston's Gen 4x4 NVMe in a low-power design", "listed use in handheld gaming devices and small-form-factor PCs"]),
  F("B0DTJNY6Q6", "KingSpec 2TB (M.2 2230, copper heatsink)", "KingSpec 2TB 2230", { capacity: 2, read: 5000, pcie: G2230, heatsink: true, warranty: 3 }, ["a factory-fitted 1mm copper heatsink", "LDPC error correction on 3D NAND", "lifetime technical support from the maker"]),
  F("B0DZX4T8TB", "fanxiang S630 2TB (M.2 2230)", "S630 2TB", { capacity: 2, read: 5200, write: 4500, tbw: 640, pcie: G2230, warranty: 5 }, ["a graphene heat-dissipation sticker", "3D NAND with a maker-stated 5-year service term", "a reminder that the host must support PCIe 4.0 to reach rated speed"]),
  F("B0BVLNGPYB", "TEAMGROUP MP44S 2TB (M.2 2230)", "MP44S 2TB", { capacity: 2, read: 5000, write: 3500, pcie: G2230 }, ["an SLC cache", "a graphene heat-dissipating label", "a 22 x 30mm form factor"]),
  F("B0DBPZ6LK2", "Fikwot FX953 500GB (M.2 2230)", "FX953 500GB", { capacity: 0.5, read: 4850, write: 3600, tbw: 160, pcie: G2230, warranty: 5 }, ["a graphite heat-dissipation sticker", "3D NAND flash", "listed use in the Steam Deck, ROG Ally and Surface Pro"]),
  F("B0H4RTJMT7", "PNY CS2142 500GB (M.2 2230)", "CS2142 500GB", { capacity: 0.5, read: 5500, write: 4000, pcie: G2230, warranty: 5 }, ["listed support for the ROG Ally, MSI Claw and Steam Deck", "support from a US-based technical team"]),
  // ---- M.2 2242 drives (Legion Go class)
  F("B0D2K9CQNK", "Transcend MTE410S 256GB (M.2 2242)", "MTE410S 256GB", { capacity: 0.25, read: 3300, pcie: G2242, dram: false, warranty: 5 }, ["a 42mm single-sided design", "a DRAM-less, low-power design Transcend says extends battery life", "SLC caching and LDPC error correction", "listed for the Lenovo Legion Go"]),
  F("B0D2KHFC8Y", "Transcend MTE410S 512GB (M.2 2242)", "MTE410S 512GB", { capacity: 0.5, read: 5000, write: 4300, pcie: G2242, dram: false, warranty: 5 }, ["a 42mm single-sided design", "a 2,000,000-hour MTBF rating", "Transcend SSD Scope software for health checks and cloning", "listed for the Lenovo Legion Go"]),
  F("B0D2KKKQL4", "Transcend MTE410S 2TB (M.2 2242)", "MTE410S 2TB", { capacity: 2, read: 5000, pcie: G2242, dram: false, warranty: 5 }, ["a 42mm single-sided design", "SLC caching and LDPC error correction", "listed for the Lenovo Legion Go"]),
  F("B0F5BTQHGM", "Corsair MP600 Micro 1TB (M.2 2242)", "MP600 Micro 1TB", { capacity: 1, read: 7000, write: 6200, pcie: G2242 }, ["high-density 3D TLC NAND", "listed compatibility with the Lenovo Legion Go and thin PCIe 4.0 laptops", "automatic fallback to PCIe 3.0 hosts at reduced speed"]),
  F("B0DJ1D4GTY", "Corsair MP600 Micro 2TB (M.2 2242)", "MP600 Micro 2TB", { capacity: 2, read: 7000, write: 6200, pcie: G2242 }, ["high-density 3D TLC NAND", "listed compatibility with the Lenovo Legion Go and thin PCIe 4.0 laptops", "2TB in the short 2242 size"]),
  F("B0FGCD7PYD", "KingSpec 2TB (M.2 2242)", "KingSpec 2TB 2242", { capacity: 2, read: 3500, pcie: "PCIe 3.0 x4 (M.2 2242)", warranty: 5 }, ["a 42mm slim form factor", "dynamic thermal throttling", "a 1.2M-hour MTBF rating"]),
  F("B0GRCH7ZKG", "Sabrent Rocket 2242 4TB", "Rocket 2242 4TB", { capacity: 4, read: 7300, write: 6400, pcie: G2242 }, ["a Phison E27T controller with TLC NAND", "peak power under 6W", "up to 950K random IOPS"]),
]);

export const sata36Facts: Record<string, Fact> = withPool(pool, [
  F("B07YD579WM", "Crucial BX500 1TB", "BX500 1TB", { capacity: 1, read: 540, pcie: SATA, warranty: 3 }, ["Micron 3D NAND", "a rating of 45x better energy efficiency than a typical hard drive, by Crucial's claim"]),
  F("B08QBJ2YMG", "Samsung 870 EVO 1TB", "870 EVO 1TB", { capacity: 1, read: 560, write: 530, tbw: 600, pcie: SATA, warranty: 5 }, ["AES 256-bit encryption", "Samsung Magician software for firmware updates and health checks", "compatibility testing across chipsets, motherboards and NAS devices"]),
  F("B08QB93S6R", "Samsung 870 EVO 2TB", "870 EVO 2TB", { capacity: 2, read: 560, write: 530, tbw: 2400, pcie: SATA }, ["AES 256-bit TCG Opal encryption", "compatibility testing across chipsets, motherboards and NAS devices", "Samsung Magician software for firmware updates and health checks"]),
  F("B089C6LZ42", "Samsung 870 QVO 2TB", "870 QVO 2TB", { capacity: 2, read: 560, write: 530, pcie: SATA }, ["Samsung's second-generation QLC NAND", "Samsung Magician software for firmware updates and health checks", "Samsung-made DRAM, NAND and firmware"]),
  F("B09ZYQ84CM", "WD Blue SA510 1TB", "SA510 1TB", { capacity: 1, read: 560, pcie: SATA }, ["a 7mm 2.5-inch body for slim laptops"]),
  F("B01N0TQPQB", "Kingston A400 480GB", "A400 480GB", { capacity: 0.48, read: 500, write: 450, pcie: SATA }, ["a 7mm form factor for slim notebooks", "an operating range of 0 to 70°C", "backward compatibility with SATA Rev. 2.0"]),
  F("B07Y5VDNT9", "PNY CS900 1TB", "CS900 1TB", { capacity: 1, read: 535, write: 515, pcie: SATA }, ["ultra-low power consumption", "backward compatibility with SATA II 3Gb/s"]),
  F("B07XZLN9KM", "PNY CS900 500GB", "CS900 500GB", { capacity: 0.5, read: 550, write: 500, pcie: SATA }, ["ultra-low power consumption", "backward compatibility with SATA II 3Gb/s"]),
  F("B08CKFDPJ3", "TEAMGROUP AX2 1TB", "AX2 1TB", { capacity: 1, read: 540, write: 490, pcie: SATA, warranty: 3 }, ["3D NAND TLC", "garbage collection, wear-levelling, ECC, S.M.A.R.T. and TRIM", "quiet, low-power operation"]),
  F("B0CYFSR463", "TEAMGROUP T-Force Vulcan Z 1TB (QLC)", "Vulcan Z 1TB", { capacity: 1, read: 550, write: 470, pcie: SATA }, ["QLC NAND with an SLC cache", "intelligent health monitoring"]),
  F("B09WMSVHD4", "TEAMGROUP T-Force Vulcan Z 2TB (TLC)", "Vulcan Z 2TB", { capacity: 2, read: 550, write: 500, pcie: SATA, warranty: 3 }, ["3D TLC NAND with an SLC cache", "shock and vibration resistance", "a 3-year or TBW limited warranty"]),
  F("B0F42NF2T3", "TEAMGROUP QX 1TB (QLC)", "QX 1TB", { capacity: 1, read: 560, write: 500, tbw: 200, pcie: SATA }, ["QLC NAND with an SLC cache", "a dual-cache design"]),
  F("B0F4Y12GGN", "SanDisk SSD Plus 1TB", "SSD Plus 1TB", { capacity: 1, read: 545, write: 515, pcie: SATA }, ["a 7mm 2.5-inch body", "shock resistance that SanDisk says survives a drop"]),
  F("B0BZMLG2CJ", "SanDisk Ultra 3D 2TB", "Ultra 3D 2TB", { capacity: 2, read: 560, write: 520, pcie: SATA }, ["3D NAND that SanDisk says lasts longer and uses less power", "nCache 2.0 technology", "shock resistance"]),
  F("B0G42FGS7V", "Silicon Power A55 1TB", "A55 1TB", { capacity: 1, pcie: SATA, warranty: 3 }, ["3D NAND with an SLC cache", "a 7mm slim body for ultrabooks"]),
  F("B09XDJ673F", "fanxiang S101 1TB", "S101 1TB", { capacity: 1, read: 520, write: 520, pcie: SATA, warranty: 3 }, ["3D NAND TLC chips", "compatibility with Windows, Linux and macOS"]),
  F("B0BKKSPM9R", "KingSpec 1TB 2.5-inch SATA", "KingSpec 1TB SATA", { capacity: 1, read: 550, write: 520, pcie: SATA, warranty: 3 }, ["3D NAND with TRIM, S.M.A.R.T. and wear levelling", "lifetime technical support from the maker"]),
]);

export const ssd8tb36Facts: Record<string, Fact> = withPool(pool, [
  F("B0D9WT512W", "WD_BLACK SN850X 8TB", "SN850X 8TB", { capacity: 8, read: 7300, write: 6300, pcie: "PCIe 4.0 x4" }, ["SanDisk TLC 3D NAND", "Game Mode 2.0 in WD_BLACK Dashboard", "Adaptive Thermal Management"]),
  F("B0D9WTM2TH", "WD_BLACK SN850X 8TB with Heatsink", "SN850X 8TB heatsink", { capacity: 8, read: 7300, write: 6300, pcie: "PCIe 4.0 x4", heatsink: true }, ["SanDisk TLC 3D NAND", "Game Mode 2.0 in WD_BLACK Dashboard", "Adaptive Thermal Management"]),
  F("B0DY2TB1TD", "Samsung 9100 PRO 8TB", "9100 PRO 8TB", { capacity: 8, read: 14800, write: 13400, pcie: "PCIe 5.0 x4" }, ["2,200K/2,600K random read/write IOPS", "a 5nm controller that Samsung rates 49% more power-efficient than the 990 PRO", "Samsung Magician software for firmware updates and drive health"]),
  F("B0DY2NWFJV", "Samsung 9100 PRO 8TB with Heatsink", "9100 PRO 8TB heatsink", { capacity: 8, read: 14800, write: 13400, pcie: "PCIe 5.0 x4", heatsink: true }, ["a heatsink profile as slim as 0.35 inches", "listed compatibility with PlayStation 5", "a 5nm controller that Samsung rates 49% more power-efficient than the 990 PRO"]),
  F("B0FTMG6Y6X", "WD_BLACK SN8100 8TB with Heatsink", "SN8100 8TB", { capacity: 8, read: 14900, write: 11000, tbw: 4800, pcie: "PCIe 5.0 x4", heatsink: true }, ["a low-profile anodized aluminium heatsink with RGB lighting", "TLC 3D CBA NAND", "fanless cooling"]),
  F("B0GJF1GQFX", "SanDisk Optimus GX PRO 850X 8TB", "GX PRO 850X 8TB", { capacity: 8, tbw: 4800, pcie: "PCIe 4.0 x4" }, ["nCache 4.0 and DirectStorage support", "up to 1.2M random IOPS on the 8TB model", "TCG Opal v2.01 data-at-rest encryption"]),
  F("B0GHZ44FMD", "SanDisk Optimus GX PRO 8100 8TB", "GX PRO 8100 8TB", { capacity: 8, tbw: 4800, pcie: "PCIe 5.0 x4" }, ["8th-generation BiCS TLC CBA NAND", "nCache 4.0", "over 2x the power efficiency of SanDisk's PCIe 4.0 drive, by the maker's claim"]),
  F("B0GHYFY89M", "SanDisk Optimus GX PRO 8100 8TB with Heatsink", "GX PRO 8100 8TB heatsink", { capacity: 8, tbw: 4800, pcie: "PCIe 5.0 x4", heatsink: true }, ["a low-profile anodized aluminium heatsink with RGB lighting", "8th-generation BiCS TLC CBA NAND", "nCache 4.0"]),
  F("B089C3TZL9", "Samsung 870 QVO 8TB", "870 QVO 8TB", { capacity: 8, read: 560, write: 530, tbw: 2880, pcie: SATA }, ["Samsung's second-generation QLC NAND", "a SATA interface that works in older desktops and laptops with a 2.5-inch bay"]),
]);

const LAPTOP_ASINS = new Set(["B0DN7CYYSD", "B0CK39YR9V", "B0DC8VPSHV", "B0DC8RVRBZ", "B0C3VCD5Z8", "B0CK2TC9XQ", "B0B25ML2FH", "B0DQSJZTZ5"]);

/** New laptop-listed NVMe drives (M.2 2280, no heatsink) plus a laptop flag on existing facts whose listing names laptops. */
export const laptop36Facts: Record<string, Fact> = withPool(pool, [
  F("B0B9Y3DB2K", "TEAMGROUP MP44L 1TB", "MP44L 1TB", { capacity: 1, read: 5000, write: 4500, pcie: "PCIe 4.0 x4", warranty: 5, laptop: true }, ["a conductive graphene label under 1mm thick that avoids clearance problems", "an SLC cache", "listed for both desktops and notebooks"]),
  F("B0B9Y24ZM5", "TEAMGROUP MP44L 500GB", "MP44L 500GB", { capacity: 0.5, read: 5000, write: 3700, pcie: "PCIe 4.0 x4", warranty: 5, laptop: true }, ["a conductive graphene label under 1mm thick that avoids clearance problems", "an SLC cache", "listed for both desktops and notebooks"]),
  F("B0CZN1RT44", "TEAMGROUP MP44Q 1TB", "MP44Q 1TB", { capacity: 1, read: 7000, write: 5900, pcie: "PCIe 4.0 x4", warranty: 5, laptop: true }, ["3D QLC NAND for lower cost per terabyte", "a graphene heat-dissipation label", "listed for laptops, desktops, NUCs and NAS"]),
  F("B0C3ZJ8T6F", "Acer Predator GM7 1TB", "Predator GM7 1TB", { capacity: 1, read: 7400, write: 6500, pcie: "PCIe 4.0 x4", dram: false, laptop: true }, ["HMB with an SLC cache in place of onboard DRAM", "thermal throttling and power management for automatic temperature control", "listed for laptops, desktops and PS5"]),
  F("B0DN7JK8T4", "WD_BLACK SN7100 500GB", "SN7100 500GB", { capacity: 0.5, read: 6800, pcie: "PCIe 4.0 x4", laptop: true }, ["next-generation TLC 3D NAND", "up to 100% better power efficiency than the previous generation, by the maker's claim", "a design aimed at laptops and handheld gaming devices"]),
  F("B0BZ5TKCWX", "Corsair MP600 CORE XT 1TB", "MP600 CORE XT 1TB", { capacity: 1, read: 5000, write: 4400, pcie: "PCIe 4.0 x4", laptop: true }, ["high-density 3D QLC NAND", "DirectStorage compatibility", "a listed fit for laptops and notebooks with PCIe Gen4 CPUs"]),
  F("B0FJ8VGNK8", "WD Blue SN5100 500GB", "SN5100 500GB", { capacity: 0.5, read: 6600, pcie: "PCIe 4.0 x4", warranty: 5, laptop: true }, ["a 5-year limited warranty", "Acronis True Image for SanDisk migration software"]),
]);

/** Existing ssd-group facts flagged as laptop-listed. */
export const tagLaptop = (facts: Record<string, Fact>): Record<string, Fact> =>
  Object.fromEntries(Object.entries(facts).map(([k, f]) => [k, LAPTOP_ASINS.has(k) ? { ...f, specs: { ...f.specs, laptop: true } } : f]));
