import pool from "@/data/pcj-pool/storage.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 28 internal SSD fact sheets for ssdxSchema: 500GB to 4TB NVMe drives across Gen3, Gen4 and Gen5, heatsink and
 * PS5 models, and M.2 2230 drives for handhelds. Values come from the listing titles (capacity, quoted read speed,
 * PCIe generation, heatsink, DRAM cache) and are reviewed by hand; write speed, endurance and warranty stay undefined
 * unless the title states them. OEM-tray, renewed, multi-pack, enclosure and anomalous-price listings are skipped.
 */
const G3 = "PCIe 3.0 x4", G4 = "PCIe 4.0 x4", G5 = "PCIe 5.0 x4";
const S = (asin: string, name: string, short: string, capacity: number, read: number, pcie: string, more: Fact["specs"] = {}, notes: string[] = []) =>
  ({ asin, name, short, specs: { capacity, read, pcie, ...more } as Fact["specs"], notes });

export const expand28SsdFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  // Samsung
  S("B0BHJDY57J", "Samsung 990 Pro 2TB with Heatsink", "990 Pro 2TB heatsink", 2, 7450, G4, { heatsink: true }, ["a factory-fitted heatsink"]),
  S("B0BPXRY7N2", "Samsung 990 Pro 2TB", "990 Pro 2TB", 2, 7450, G4, {}, ["a quoted 7,450MB/s read speed"]),
  S("B0BHJGV9WR", "Samsung 990 Pro 1TB with Heatsink", "990 Pro 1TB heatsink", 1, 7450, G4, { heatsink: true }, ["a factory-fitted heatsink"]),
  S("B0DGHB9V34", "Samsung 990 Evo Plus 2TB", "990 Evo Plus 2TB", 2, 0, "PCIe 4.0 x4 or 5.0 x2", {}, ["NVMe 2.0 support"]),
  S("B0DX2G349M", "Samsung 9100 Pro 1TB", "9100 Pro 1TB", 1, 14700, G5, {}, ["a PCIe 5.0 x4 interface"]),
  S("B0DX2FN49V", "Samsung 9100 Pro 2TB with Heatsink", "9100 Pro 2TB heatsink", 2, 14700, G5, { heatsink: true }, ["a factory-fitted heatsink"]),
  S("B0H1NH99GX", "Samsung 990 1TB", "Samsung 990 1TB", 1, 7150, G4, { write: 6450 }, ["a quoted 6,450MB/s write speed"]),
  S("B08RK2SR23", "Samsung 980 Pro 2TB", "980 Pro 2TB", 2, 0, G4, {}, ["a PCIe 4.0 NVMe gaming drive"]),
  S("B08PBFP4NV", "Samsung 980 Pro 1TB", "980 Pro 1TB", 1, 0, G4, {}, ["a PCIe 4.0 NVMe drive"]),
  // WD
  S("B0B3RQDGL7", "WD_Black SN850X 2TB", "SN850X 2TB", 2, 0, G4, {}, ["a gaming NVMe drive sold without a heatsink"]),
  S("B0B7CQ2CHH", "WD_Black SN850X 4TB", "SN850X 4TB", 4, 7300, G4, { write: 6300 }, ["a quoted 6,300MB/s write speed"]),
  S("B0B7CKVCCV", "WD_Black SN850X 1TB", "SN850X 1TB", 1, 7300, G4, { write: 6300 }, ["a quoted 6,300MB/s write speed"]),
  S("B0B7CPSN2K", "WD_Black SN850X 1TB with Heatsink", "SN850X 1TB heatsink", 1, 7300, G4, { write: 6300, heatsink: true }, ["a factory-fitted heatsink"]),
  S("B0G2G7P5FC", "WD_Black SN7100X 2TB", "SN7100X 2TB", 2, 7250, G4, {}, ["a drive built for the ROG Xbox Ally and PCs"]),
  S("B0DN7JK8T4", "WD_Black SN7100 500GB", "SN7100 500GB", 0.5, 6800, G4, {}, ["next-gen TLC 3D NAND"]),
  S("B0DZK9C789", "WD_Black SN7100 4TB", "SN7100 4TB", 4, 7000, G4, { write: 6700 }, ["a quoted 6,700MB/s write speed"]),
  S("B0F3BMBQ75", "WD_Black SN8100 1TB", "SN8100 1TB", 1, 14900, G5, { write: 11000 }, ["a quoted 11,000MB/s write speed"]),
  S("B0F3H14JQG", "WD_Black SN8100 2TB with Heatsink", "SN8100 2TB heatsink", 2, 14900, G5, { heatsink: true }, ["a factory-fitted heatsink"]),
  S("B0D7MLHCQ7", "WD Blue SN5000 1TB", "SN5000 1TB", 1, 0, G4, {}, ["a PCIe 4.0 NVMe drive"]),
  S("B0FJ8VGNK8", "WD Blue SN5100 500GB", "SN5100 500GB", 0.5, 0, G4, {}, ["a PCIe Gen 4.0 NVMe drive"]),
  S("B0DMHS9HQ4", "WD Green SN3000 500GB", "WD Green SN3000 500GB", 0.5, 0, G4, {}, ["a PCIe Gen4 NVMe drive"]),
  S("B0C48B3RGL", "WD_Black SN850P 1TB for PS5", "SN850P 1TB PS5", 1, 7300, G4, { heatsink: true }, ["an officially licensed PS5 storage expansion"]),
  S("B0C47ZX1WB", "WD_Black SN850P 2TB for PS5", "SN850P 2TB PS5", 2, 7300, G4, { heatsink: true }, ["an officially licensed PS5 storage expansion"]),
  S("B0CHJXHVZM", "WD_Black SN770M 1TB (M.2 2230)", "SN770M 1TB", 1, 5150, "PCIe 4.0 x4 (M.2 2230)", {}, ["an M.2 2230 drive for handheld gaming devices"]),
  // Crucial
  S("B0B25ML2FH", "Crucial P3 Plus 2TB", "P3 Plus 2TB", 2, 5000, G4, {}, ["laptop and desktop compatibility"]),
  S("B0DKH285B6", "Crucial P310 2TB", "P310 2TB", 2, 0, G4, {}, ["3D NAND on a PCIe 4.0 x4 interface"]),
  S("B0DC8K6KQD", "Crucial P310 500GB", "P310 500GB", 0.5, 6600, G4, {}, ["laptop, desktop and handheld compatibility"]),
  S("B0DQ9K7S1Q", "Crucial P310 1TB with Heatsink (PS5)", "P310 1TB heatsink", 1, 7100, G4, { heatsink: true }, ["a heatsink for PlayStation 5"]),
  S("B0D61Z8R1W", "Crucial P310 1TB (M.2 2230)", "P310 1TB 2230", 1, 7100, "PCIe 4.0 x4 (M.2 2230)", {}, ["an M.2 2230 drive for handhelds"]),
  S("B0CTRVZKG7", "Crucial T705 2TB", "T705 2TB", 2, 14500, G5, {}, ["TLC NAND at 14,500MB/s"]),
  S("B0CTRV9CVP", "Crucial T705 1TB", "T705 1TB", 1, 13600, G5, {}, ["TLC NAND at 13,600MB/s"]),
  S("B0F9XN4DCC", "Crucial T710 1TB", "T710 1TB", 1, 14900, G5, {}, ["a quoted 14,900MB/s read speed"]),
  S("B0DBBG7CG7", "Crucial T500 4TB", "T500 4TB", 4, 7000, G4, {}, ["TLC NAND for PS5 and PCs"]),
  S("B0CK2S298S", "Crucial T500 1TB with Heatsink (PS5)", "T500 1TB heatsink", 1, 7300, G4, { heatsink: true }, ["a heatsink for PlayStation 5"]),
  S("B0DZ5ZK225", "Crucial P510 1TB", "P510 1TB", 1, 11000, G5, {}, ["TLC NAND on a PCIe 5.0 interface"]),
  S("B0DQSJZTZ5", "Crucial E100 2TB", "E100 2TB", 2, 5000, G4, {}, ["laptop and desktop compatibility"]),
  // Kingston, Lexar, Teamgroup, Corsair and others
  S("B0DBR6TRZQ", "Kingston NV3 2TB", "NV3 2TB", 2, 6000, G4, {}, ["an M.2 2280 NVMe drive"]),
  S("B0DBR9RZLV", "Kingston NV3 500GB", "NV3 500GB", 0.5, 5000, G4, {}, ["an M.2 2280 NVMe drive"]),
  S("B0BJL61R71", "Kingston Fury Renegade 1TB with Heatsink", "Fury Renegade 1TB", 1, 0, G4, { heatsink: true }, ["a heatsink and PS5-ready design"]),
  S("B0F4425DTW", "Kingston Fury Renegade G5 1TB", "Fury Renegade G5 1TB", 1, 14800, G5, {}, ["a PCIe 5.0 M.2 2280 drive"]),
  S("B0BGSWQ4FC", "Kingston KC3000 1TB", "KC3000 1TB", 1, 0, G4, {}, ["an M.2 2280 NVMe drive"]),
  S("B0CJWJSTFW", "Kingston 1TB (M.2 2230)", "Kingston 1TB 2230", 1, 4540, "PCIe 4.0 x4 (M.2 2230)", { write: 4230 }, ["TLC NAND in an M.2 2230 form factor"]),
  S("B0CGKPPZY9", "Lexar NM790 1TB with Heatsink", "NM790 1TB heatsink", 1, 7400, G4, { write: 6500, heatsink: true }, ["a factory-fitted heatsink"]),
  S("B0CGKHGMW5", "Lexar NM790 2TB with Heatsink", "NM790 2TB heatsink", 2, 7400, G4, { write: 6500, heatsink: true }, ["a factory-fitted heatsink"]),
  S("B0F25F4LLY", "Lexar NM1090 Pro 1TB", "NM1090 Pro 1TB", 1, 14000, G5, { write: 10000 }, ["a PCIe Gen 5 drive"]),
  S("B0C5S6T2R8", "Lexar NM710 500GB", "NM710 500GB", 0.5, 5000, G4, {}, ["an M.2 2280 NVMe drive"]),
  S("B0C4KRMKFW", "Teamgroup MP44 1TB", "MP44 1TB", 1, 0, G4, {}, ["an SLC cache design"]),
  S("B0B9Y24ZM5", "Teamgroup MP44L 500GB", "MP44L 500GB", 0.5, 0, G4, {}, ["an SLC cache design"]),
  S("B0BW8BMSX5", "Teamgroup T-Force G50 1TB", "T-Force G50 1TB", 1, 0, G4, {}, ["an InnoGrit controller with SLC caching"]),
  S("B0921KF4JC", "Teamgroup T-Force Cardea A440 1TB", "Cardea A440 1TB", 1, 0, G4, { heatsink: true, dram: true }, ["a graphene and aluminum heatsink", "a DRAM cache"]),
  S("B07XJ2P1LK", "Teamgroup MP33 512GB", "MP33 512GB", 0.5, 1700, G3, {}, ["a PCIe Gen3 drive for budget builds"]),
  S("B0CSG3V9GJ", "Corsair MP600 Elite 1TB", "MP600 Elite 1TB", 1, 7000, G4, {}, ["an M.2 2280 NVMe drive"]),
  S("B0CSG5DXQ9", "Corsair MP600 Elite 2TB with Heatsink", "MP600 Elite 2TB heatsink", 2, 0, G4, { heatsink: true }, ["a PS5-ready design with an included heatsink"]),
  S("B0CM41J7F9", "Corsair MP700 Pro 1TB", "MP700 Pro 1TB", 1, 11700, G5, {}, ["NVMe 2.0 over PCIe Gen5"]),
  S("B0DKP1WH7Y", "Corsair MP700 Elite 1TB", "MP700 Elite 1TB", 1, 10000, G5, {}, ["high-density 3D TLC NAND"]),
  S("B0BZ5TKCWX", "Corsair MP600 Core XT 1TB", "MP600 Core XT 1TB", 1, 0, G4, {}, ["high-density QLC NAND"]),
  S("B0977LW48F", "Seagate FireCuda 530 1TB", "FireCuda 530 1TB", 1, 0, G4, {}, ["NVMe 1.4 with a PS5-compatible design"]),
  S("B0GF2BLZ98", "Seagate FireCuda X1070 2TB", "FireCuda X1070 2TB", 2, 0, G4, {}, ["3D QLC NAND"]),
  S("B08P2B6JKV", "Sabrent Rocket 4 Plus 1TB", "Rocket 4 Plus 1TB", 1, 0, G4, {}, ["a PCIe 4.0 performance drive"]),
  S("B0CXVGC466", "Sabrent Rocket 5 2TB", "Rocket 5 2TB", 2, 14000, G5, {}, ["a PCIe Gen 5 NVMe drive"]),
  S("B0C3ZJ8T6F", "Acer Predator GM7 1TB", "Predator GM7 1TB", 1, 7400, G4, {}, ["NVMe 2.0"]),
  S("B0CPN8CHV2", "Acer Predator GM7 512GB", "Predator GM7 512GB", 0.5, 7200, G4, {}, ["NVMe 2.0"]),
  S("B0F3XKKRRF", "Acer Predator GM9 1TB", "Predator GM9 1TB", 1, 14500, G5, {}, ["NVMe 2.0 over PCIe 5.0"]),
  S("B0D16ZQC3P", "Acer MA200 1TB (M.2 2230)", "Acer MA200 1TB", 1, 5200, "PCIe 4.0 x4 (M.2 2230)", {}, ["an M.2 2230 drive for Steam Deck-class handhelds"]),
  S("B0D176WJ78", "Acer MA200 512GB (M.2 2230)", "Acer MA200 512GB", 0.5, 5200, "PCIe 4.0 x4 (M.2 2230)", {}, ["an M.2 2230 drive for Steam Deck-class handhelds"]),
  S("B0GJSFFLXZ", "SanDisk Optimus 5100 500GB", "Optimus 5100 500GB", 0.5, 0, G4, {}, ["an M.2 2280 NVMe drive"]),
  S("B0GJS98B1Q", "SanDisk Optimus 5100 1TB", "Optimus 5100 1TB", 1, 0, G4, {}, ["an M.2 2280 NVMe drive"]),
  S("B0C9HGVJ11", "Patriot Viper VP4300 Lite 1TB", "VP4300 Lite 1TB", 1, 0, G4, {}, ["a PCIe Gen4 x4 drive"]),
  S("B0CQ5CNF1B", "Patriot Viper VP4000 Mini 500GB (M.2 2230)", "VP4000 Mini 500GB", 0.5, 0, "PCIe 4.0 x4 (M.2 2230)", {}, ["an M.2 2230 drive for handhelds"]),
  S("B0DM1R7KHZ", "BIWIN Black Opal NV7400 1TB", "Black Opal NV7400 1TB", 1, 7450, G4, {}, ["an NVMe M.2 2280 drive"]),
  S("B07ZGJVTZK", "Silicon Power 1TB PCIe Gen3", "Silicon Power 1TB Gen3", 1, 0, G3, {}, ["a PCIe Gen3x4 drive"]),
].map((f) => (f.specs.read === 0 ? { ...f, specs: { ...f.specs, read: undefined } } : f)));
