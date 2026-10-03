import pool from "@/data/pcj-pool/cpu.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 28 CPU fact sheets for cpuSchema. Source: Amazon Creators API titles and feature bullets
 * (data/pcj-pool/cpu.json), reviewed by hand. Only values the listing states are recorded: thread counts, cache, TDP,
 * memory type, integrated graphics and bundled cooler are left undefined when the listing does not say. Renewed,
 * motherboard-bundle, retailer-bundle and OEM-tray listings are skipped.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const expand28CpuFacts = withPool(pool as Record<string, { img?: string; price?: string }>, [
  // AMD AM4
  F("B0H41D4KFT", "AMD Ryzen 7 5800X3D", "Ryzen 7 5800X3D", { cores: 8, threads: 16, boost: 4.5, socket: "AM4", memory: "DDR4", cooler: false }, ["AMD 3D V-Cache with 100MB of total cache", "a drop-in upgrade for X570 and B550 boards"]),
  F("B0D6NNDQ92", "AMD Ryzen 7 5800XT", "Ryzen 7 5800XT", { cores: 8, threads: 16, boost: 4.8, socket: "AM4", memory: "DDR4", cooler: true }, ["an unlocked Zen 3 chip with 36MB of cache", "a Wraith Prism RGB cooler in the box"]),
  F("B0D6NMCZG1", "AMD Ryzen 9 5900XT", "Ryzen 9 5900XT", { cores: 16, threads: 32, boost: 4.8, socket: "AM4", memory: "DDR4", cooler: false }, ["16 Zen 3 cores with 72MB of cache", "PCIe 4.0 on the AM4 platform"]),
  F("B0815Y8J9N", "AMD Ryzen 9 5950X", "Ryzen 9 5950X", { cores: 16, threads: 32, boost: 4.9, socket: "AM4", memory: "DDR4", cooler: false }, ["16 cores with 72MB of cache", "a liquid cooler recommended by AMD"]),
  F("B091J3NYVF", "AMD Ryzen 7 5700G", "Ryzen 7 5700G", { cores: 8, threads: 16, boost: 4.6, socket: "AM4", memory: "DDR4", igpu: true }, ["Radeon graphics built in for 1080p play without a graphics card", "20MB of cache"]),
  F("B0BZH5ZLM9", "AMD Ryzen 5 5500", "Ryzen 5 5500", { cores: 6, threads: 12, boost: 4.2, tdp: 65, socket: "AM4", memory: "DDR4", cooler: true }, ["a 65W TDP with 19MB of cache", "a Wraith Stealth cooler in the box"]),
  F("B0HGMTDZM7", "AMD Ryzen 5 5500F", "Ryzen 5 5500F", { cores: 6, threads: 12, boost: 4.2, tdp: 65, socket: "AM4", memory: "DDR4", cooler: true, igpu: false }, ["a Wraith Stealth cooler in the box", "DDR4-3200 support and 19MB of cache"]),
  F("B0FQPCRG7P", "AMD Ryzen 7 5700", "Ryzen 7 5700", { cores: 8, threads: 16, boost: 4.6, l3: 16, tdp: 65, socket: "AM4", memory: "DDR4", cooler: true }, ["a 65W TDP", "a Wraith Spire cooler in the box"]),
  F("B0815XFSGK", "AMD Ryzen 7 5800X", "Ryzen 7 5800X", { cores: 8, threads: 16, boost: 4.7, socket: "AM4", memory: "DDR4", cooler: false }, ["an unlocked 8-core chip with 36MB of cache", "PCIe 4.0 on X570 and B550 boards"]),
  F("B0FT526Y4Q", "AMD Ryzen 7 5700X", "Ryzen 7 5700X", { cores: 8, threads: 16, l3: 32, tdp: 65, socket: "AM4", memory: "DDR4" }, ["32MB of L3 cache at a 65W TDP", "DDR4-3200 dual-channel support"]),
  F("B0CQ4DTJYX", "AMD Ryzen 5 5600GT", "Ryzen 5 5600GT", { cores: 6, threads: 12, boost: 4.6, socket: "AM4", memory: "DDR4", cooler: true }, ["integrated Radeon graphics", "a Wraith Stealth cooler in the box"]),
  // AMD AM5
  F("B0GTRTJSNZ", "AMD Ryzen 9 9950X3D2 Dual Edition", "Ryzen 9 9950X3D2", { socket: "AM5" }, ["AMD's Dual Edition 3D V-Cache model"]),
  F("B0HCW62DRF", "AMD Ryzen 7 9700X", "Ryzen 7 9700X", { cores: 8, threads: 16, boost: 5.5, socket: "AM5" }, ["an AM5 processor with a 3.8GHz base and 5.5GHz boost"]),
  F("B0BMQHSCVF", "AMD Ryzen 7 7700", "Ryzen 7 7700", { cores: 8, threads: 16, socket: "AM5", cooler: true }, ["an AMD Wraith Prism RGB cooler in the box", "an unlocked 8-core AM5 processor"]),
  F("B0BTRRNK7T", "AMD Ryzen 9 7900X3D", "Ryzen 9 7900X3D", { cores: 12, threads: 24, boost: 5.5, socket: "AM5", memory: "DDR5", cooler: false }, ["3D V-Cache aimed at gaming and creator work", "a liquid cooler recommended by AMD"]),
  F("B0BTRH9MNS", "AMD Ryzen 9 7950X3D", "Ryzen 9 7950X3D", { cores: 16, threads: 32, boost: 5.7, socket: "AM5", memory: "DDR5", cooler: false }, ["3D V-Cache aimed at gaming and creator work", "a liquid cooler recommended by AMD"]),
  F("B0BBHD5D8Y", "AMD Ryzen 9 7950X", "Ryzen 9 7950X", { cores: 16, threads: 32, l3: 64, socket: "AM5", igpu: true }, ["16MB of L2 plus 64MB of L3 cache", "a 5nm process with Radeon Graphics built in"]),
  F("B0D2RWZ2LK", "AMD Ryzen 5 7500F", "Ryzen 5 7500F", { cores: 6, threads: 12, boost: 5.0, socket: "AM5", memory: "DDR5" }, ["a low-cost Zen 4 entry to AM5", "DDR5 memory support"]),
  F("B0D2JD6P86", "AMD Ryzen 5 8400F", "Ryzen 5 8400F", { cores: 6, threads: 12, boost: 4.7, socket: "AM5", memory: "DDR5" }, ["a 6-core Zen 4 chip for AM5", "DDR5 memory support"]),
  F("B0CQ4JV8D5", "AMD Ryzen 5 8500G", "Ryzen 5 8500G", { cores: 6, threads: 12, boost: 5.0, socket: "AM5", memory: "DDR5", cooler: true, igpu: true }, ["a Wraith Stealth cooler in the box", "Radeon graphics built in"]),
  F("B0CQ4JBKW3", "AMD Ryzen 7 8700G", "Ryzen 7 8700G", { cores: 8, threads: 16, boost: 5.1, socket: "AM5", memory: "DDR5", cooler: true, igpu: true }, ["AMD's fastest integrated graphics in a desktop chip at launch", "a Wraith Spire cooler in the box"]),
  // Intel
  F("B0DT7CW7VR", "Intel Core Ultra 5 225F", "Core Ultra 5 225F", { cores: 10, boost: 4.9, l3: 22, socket: "LGA1851", igpu: false }, ["6 P-cores plus 4 E-cores", "PCIe 5.0 and 4.0 support on Intel 800-series boards"]),
  F("B0CQ3142LB", "Intel Core i5-14400F", "Core i5-14400F", { socket: "LGA1700", igpu: false }, ["an F-series chip that needs a graphics card"]),
  F("B0CQ2ZVCWV", "Intel Core i3-14100F", "Core i3-14100F", { l3: 12, socket: "LGA1700", igpu: false }, ["12MB of cache", "an F-series chip that needs a graphics card"]),
  F("B0CQ1S3L53", "Intel Core i3-14100", "Core i3-14100", { cores: 4, boost: 4.7, l3: 12, socket: "LGA1700", cooler: true }, ["4 performance cores and no E-cores", "an Intel Laminar RM1 cooler in the box"]),
  F("B0CQ27H8VY", "Intel Core i5-14500", "Core i5-14500", { cores: 14, boost: 5.0, l3: 20, socket: "LGA1700", memory: "DDR4 or DDR5", cooler: true }, ["6 P-cores plus 8 E-cores", "an Intel Laminar RM1 cooler in the box"]),
  F("B0CQ1QJZM2", "Intel Core i7-14700", "Core i7-14700", { cores: 20, boost: 5.4, l3: 33, socket: "LGA1700", cooler: true }, ["8 P-cores plus 12 E-cores", "an Intel Laminar RM1 cooler in the box"]),
  F("B0CQ1P2TRN", "Intel Core i7-14700F", "Core i7-14700F", { cores: 20, boost: 5.4, l3: 33, socket: "LGA1700", memory: "DDR4 or DDR5" }, ["8 P-cores plus 12 E-cores", "DDR4 and DDR5 memory support"]),
  F("B0CQ24VW72", "Intel Core i9-14900", "Core i9-14900", { cores: 24, boost: 5.8, l3: 36, socket: "LGA1700", cooler: true }, ["8 P-cores plus 16 E-cores", "an Intel Laminar RH1 cooler in the box"]),
  F("B0BCF54SR1", "Intel Core i9-13900K", "Core i9-13900K", { cores: 24, boost: 5.8, l3: 36, socket: "LGA1700", igpu: true }, ["8 P-cores plus 16 E-cores", "integrated Intel UHD Graphics 770"]),
  F("B0BPXCRWB2", "Intel Core i9-13900KS", "Core i9-13900KS", { cores: 24, boost: 6.0, l3: 36, socket: "LGA1700" }, ["up to 6.0GHz out of the box", "8 P-cores plus 16 E-cores"]),
  F("B0BCF57FL5", "Intel Core i7-13700K", "Core i7-13700K", { cores: 16, boost: 5.4, l3: 30, socket: "LGA1700", igpu: true }, ["8 P-cores plus 8 E-cores", "integrated Intel UHD Graphics 770"]),
  F("B0BCDL7F5W", "Intel Core i7-13700KF", "Core i7-13700KF", { cores: 16, boost: 5.4, l3: 30, socket: "LGA1700", igpu: false }, ["8 P-cores plus 8 E-cores", "no integrated graphics"]),
  F("B0BG63WLG3", "Intel Core i5-13600K", "Core i5-13600K", { cores: 14, boost: 5.1, socket: "LGA1700" }, ["a 3.5GHz base clock with 5.1GHz turbo", "20 PCIe lanes from the CPU"]),
  F("B0BN61LYFB", "Intel Core i5-13400F", "Core i5-13400F", { cores: 10, threads: 16, boost: 4.6, socket: "LGA1700", igpu: false }, ["10 cores and 16 threads", "a 2.5GHz base clock with 4.6GHz turbo"]),
  F("B09FXDLX95", "Intel Core i9-12900K", "Core i9-12900K", { cores: 16, boost: 5.2, l3: 30, socket: "LGA1700", igpu: true }, ["8 P-cores plus 8 E-cores", "integrated Intel UHD 770 graphics"]),
  F("B09FWYK5M9", "Intel Core i9-12900KF", "Core i9-12900KF", { cores: 16, boost: 5.2, l3: 30, socket: "LGA1700", igpu: false }, ["8 P-cores plus 8 E-cores", "no integrated graphics"]),
  F("B09FXNVDBJ", "Intel Core i7-12700K", "Core i7-12700K", { cores: 12, boost: 5.0, l3: 25, socket: "LGA1700", igpu: true }, ["8 P-cores plus 4 E-cores", "integrated Intel UHD graphics"]),
  F("B09FXFJW2F", "Intel Core i5-12600KF", "Core i5-12600KF", { cores: 10, boost: 4.9, l3: 16, socket: "LGA1700", igpu: false }, ["6 P-cores plus 4 E-cores", "no integrated graphics"]),
  F("B0B8H5XV8L", "Intel Core i5-12600K", "Core i5-12600K", { cores: 10, boost: 4.9, socket: "LGA1700" }, ["6 P-cores plus 4 E-cores", "an unlocked 125W chip"]),
  F("B09NMPD8V2", "Intel Core i5-12400", "Core i5-12400", { boost: 4.4, l3: 18, socket: "LGA1700" }, ["18MB of cache", "a 2.5GHz base clock with 4.4GHz turbo"]),
  F("B0F2GJF5D3", "Intel Core i3-12100", "Core i3-12100", { cores: 4, boost: 4.3, l3: 12, socket: "LGA1700", igpu: true }, ["UHD Graphics 730", "a 4-core part for entry-level builds"]),
]);
