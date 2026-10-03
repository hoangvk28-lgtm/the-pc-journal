import pool from "@/data/pcj-pool/gpu.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 28 GPU fact sheets: more partner cards for the RTX 50, RTX 40, RX 9000, RX 7000 and Arc B series, for use
 * with gpuRangeSchema. Source: Amazon Creators API titles and feature bullets (data/pcj-pool/gpu.json), reviewed by
 * hand. Fields the listing omits are left undefined; renewed, bundle, decoration-only and workstation listings are
 * skipped. The MSI RTX 4060 Ventus 2X listing says GDDR6X, which contradicts the chip, so its memory type is left out.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const DP21 = "3 x DisplayPort 2.1b, 1 x HDMI 2.1b";

export const expand28GpuFacts = withPool(pool as Record<string, { img?: string; price?: string }>, [
  // RTX 5090
  F("B0DS2X13PH", "ASUS TUF Gaming GeForce RTX 5090 32GB OC Edition", "ASUS TUF 5090", { chip: "RTX 5090", vram: 32, mem: "GDDR7", slots: 2.5, sff: true }, ["a dual BIOS switch for Quiet or Performance", "0dB fan stop at light loads"]),
  F("B0GK7GWKT2", "ASUS ROG Astral GeForce RTX 5090 OC Edition", "ROG Astral 5090", { chip: "RTX 5090", vram: 32, mem: "GDDR7", outputs: "3 x DisplayPort 2.1b, 2 x HDMI 2.1b" }, ["a quad-fan cooler", "3352 AI TOPS and a 512-bit memory bus"]),
  // RTX 5080
  F("B0DS2R6948", "Gigabyte GeForce RTX 5080 Gaming OC 16G", "Gigabyte 5080 Gaming OC", { chip: "RTX 5080", vram: 16, mem: "GDDR7" }, ["a WINDFORCE cooling system", "a PCIe 5.0 interface"]),
  F("B0DTJFZ4YS", "PNY GeForce RTX 5080 OC Triple-Fan", "PNY 5080 OC", { chip: "RTX 5080", vram: 16, mem: "GDDR7" }, ["triple 100mm axial fans", "VelocityX software for tuning"]),
  F("B0DYRZZJZ1", "PNY GeForce RTX 5080 Triple-Fan", "PNY 5080", { chip: "RTX 5080", vram: 16, mem: "GDDR7" }, ["triple 100mm axial fans", "VelocityX software for tuning"]),
  F("B0DTJDR3V9", "PNY GeForce RTX 5080 Epic-X RGB OC Triple-Fan", "PNY 5080 Epic-X", { chip: "RTX 5080", vram: 16, mem: "GDDR7" }, ["triple 100mm axial fans", "Epic-X RGB lighting"]),
  F("B0DTZ48TCY", "ZOTAC Gaming GeForce RTX 5080 Solid OC", "Zotac 5080 Solid OC", { chip: "RTX 5080", vram: 16, mem: "GDDR7", boost: "2640MHz", outputs: DP21 }, ["three 100mm BladeLink fans", "a dual BIOS and metal backplate"]),
  F("B0DSWQNGYF", "MSI GeForce RTX 5080 16G Ventus 3X OC White", "MSI 5080 Ventus 3X White", { chip: "RTX 5080", vram: 16, mem: "GDDR7" }, ["a white finish", "a 256-bit memory interface"]),
  F("B0DSXGNFJL", "MSI GeForce RTX 5080 16G Gaming Trio OC White", "MSI 5080 Gaming Trio White", { chip: "RTX 5080", vram: 16, mem: "GDDR7" }, ["a white finish", "a 256-bit memory interface"]),
  F("B0FKX6LPR6", "ASUS ROG Astral GeForce RTX 5080 White OC Edition", "ROG Astral 5080 White", { chip: "RTX 5080", vram: 16, mem: "GDDR7", boost: "2790MHz (OC mode)", slots: 3.8 }, ["a quad-fan cooler with a vapor chamber", "GPU Guard support hardware"]),
  // RTX 5070 Ti
  F("B0DXL7GSYC", "PNY GeForce RTX 5070 Ti OC Triple-Fan", "PNY 5070 Ti OC", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7" }, ["triple 90mm axial fans", "VelocityX software for tuning"]),
  F("B0DXL8NFLF", "PNY GeForce RTX 5070 Ti Epic-X RGB OC Triple-Fan", "PNY 5070 Ti Epic-X", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7" }, ["triple 90mm axial fans", "Epic-X RGB lighting"]),
  F("B0GVJMM4VR", "PNY GeForce RTX 5070 Ti OC Triple Fan", "PNY 5070 Ti Triple Fan", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", boost: "2572MHz" }, ["a 2572MHz boost clock", "a 256-bit memory interface"]),
  F("B0F67GQBVT", "PNY GeForce RTX 5070 Ti 16GB Triple Fan", "PNY 5070 Ti 16GB", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", boost: "2452MHz" }, ["up to 896GB/s of memory bandwidth", "a 2452MHz boost clock"]),
  F("B0G44WJ2LX", "Gigabyte GeForce RTX 5070 Ti WINDFORCE OC V2 16G", "Gigabyte 5070 Ti Windforce V2", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7" }, ["a WINDFORCE cooling system", "a reinforced structure"]),
  F("B0DVGVZZYY", "ASUS Prime GeForce RTX 5070 Ti OC Edition", "ASUS Prime 5070 Ti OC", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", slots: 2.5, sff: true }, ["a 2.5-slot design", "SFF-Ready sizing"]),
  F("B0DWMJSGCM", "ASUS TUF Gaming GeForce RTX 5070 Ti White OC Edition", "ASUS TUF 5070 Ti White", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", boost: "2610MHz (OC mode)", slots: 3.125 }, ["a white finish", "ASUS GPU Guard and a support bracket"]),
  F("B0F4RLW8X4", "ASUS ROG Strix GeForce RTX 5070 Ti OC Edition", "ROG Strix 5070 Ti", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", boost: "2625MHz (OC mode)", slots: 3.2 }, ["a vapor chamber with MaxContact design", "0dB fan stop at light loads"]),
  F("B0FP7H2FFY", "MSI GeForce RTX 5070 Ti 16G MLG Edition OC", "MSI 5070 Ti MLG", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", boost: "2580MHz" }, ["a TRI FROZR 4 cooler", "STORMFORCE fans"]),
  F("B0DWH7F8KX", "MSI GeForce RTX 5070 Ti 16G Trio OC Plus", "MSI 5070 Ti Trio OC Plus", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", boost: "2580MHz" }, ["a TRI FROZR 4 cooler", "STORMFORCE fans"]),
  F("B0DZZ6VGJW", "MSI GeForce RTX 5070 Ti 16G Shadow 3X", "MSI 5070 Ti Shadow 3X", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", boost: "2467MHz", sff: true }, ["TORX Fan 5.0 blades", "SFF-Ready sizing"]),
  F("B0GXF847X5", "ZOTAC Gaming GeForce RTX 5070 Ti Solid CORE OC White Edition", "Zotac 5070 Ti Solid Core White", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", slots: 2.5, outputs: DP21 }, ["three 90mm BladeLink fans", "a white finish with SPECTRA RGB"]),
  F("B0F4485KVY", "ZOTAC Gaming GeForce RTX 5070 Ti Solid SFF OC", "Zotac 5070 Ti Solid SFF OC", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", boost: "2482MHz", sff: true, outputs: DP21 }, ["a bundled GPU support stand", "three 90mm BladeLink fans"]),
  // RTX 5070
  F("B0FFKWFMYM", "ASUS Prime GeForce RTX 5070 12GB White OC Edition", "ASUS Prime 5070 White", { chip: "RTX 5070", vram: 12, mem: "GDDR7", boost: "2587MHz (OC mode)", slots: 2.5, sff: true }, ["a 2.5-slot design", "a dual BIOS switch"]),
  F("B0FG6164PS", "ASUS Dual GeForce RTX 5070 12GB OC Edition", "ASUS Dual 5070 OC", { chip: "RTX 5070", vram: 12, mem: "GDDR7", boost: "2572MHz (OC mode)" }, ["0dB fan stop at light loads", "a dual BIOS switch"]),
  F("B0DYPGBX6J", "PNY GeForce RTX 5070 Epic-X RGB OC Triple-Fan", "PNY 5070 Epic-X", { chip: "RTX 5070", vram: 12, mem: "GDDR7", sff: true }, ["triple 90mm axial fans", "SFF-Ready sizing"]),
  F("B0G26Y3H2R", "PNY GeForce RTX 5070 OC Triple Fan", "PNY 5070 OC", { chip: "RTX 5070", vram: 12, mem: "GDDR7", boost: "2587MHz", sff: true }, ["a 2587MHz boost clock", "SFF-Ready sizing"]),
  F("B0F59N58GV", "PNY GeForce RTX 5070 12GB Triple Fan", "PNY 5070 Triple Fan", { chip: "RTX 5070", vram: 12, mem: "GDDR7", boost: "2512MHz" }, ["up to 672GB/s of memory bandwidth", "a 2512MHz boost clock"]),
  F("B0F7XHBT13", "NVIDIA GeForce RTX 5070 Founders Edition", "RTX 5070 Founders Edition", { chip: "RTX 5070", vram: 12, mem: "GDDR7" }, ["NVIDIA's own Founders Edition design"]),
  // RTX 5060 Ti
  F("B0F4RZDFD5", "ASUS Prime GeForce RTX 5060 Ti 16GB", "ASUS Prime 5060 Ti 16GB", { chip: "RTX 5060 Ti", vram: 16, mem: "GDDR7", slots: 2.5, sff: true }, ["a 2.5-slot design", "a dual BIOS switch"]),
  F("B0F4RVCY79", "ASUS Prime GeForce RTX 5060 Ti 16GB OC Edition", "ASUS Prime 5060 Ti 16GB OC", { chip: "RTX 5060 Ti", vram: 16, mem: "GDDR7", slots: 2.5, sff: true }, ["a 2.5-slot design", "0dB fan stop at light loads"]),
  F("B0G1FVLWSG", "ASUS Dual GeForce RTX 5060 Ti 16GB White OC Edition", "ASUS Dual 5060 Ti 16GB White", { chip: "RTX 5060 Ti", vram: 16, mem: "GDDR7", slots: 2.5 }, ["a white finish", "dual ball fan bearings"]),
  F("B0F45KGZPY", "MSI GeForce RTX 5060 Ti 16G Shadow 2X OC", "MSI 5060 Ti 16G Shadow 2X", { chip: "RTX 5060 Ti", vram: 16, mem: "GDDR7", sff: true }, ["TORX Fan 5.0 blades", "SFF-Ready sizing"]),
  F("B0F5B8KQJR", "Gigabyte GeForce RTX 5060 Ti WINDFORCE OC 8G", "Gigabyte 5060 Ti Windforce 8G", { chip: "RTX 5060 Ti", vram: 8, mem: "GDDR7" }, ["a WINDFORCE cooling system", "a 128-bit memory interface"]),
  F("B0F5B89RF5", "Gigabyte GeForce RTX 5060 Ti Gaming OC 8G", "Gigabyte 5060 Ti Gaming OC 8G", { chip: "RTX 5060 Ti", vram: 8, mem: "GDDR7" }, ["a WINDFORCE cooling system", "a 128-bit memory interface"]),
  F("B0F4YRNHSJ", "PNY GeForce RTX 5060 Ti 8GB OC Dual-Fan", "PNY 5060 Ti 8GB", { chip: "RTX 5060 Ti", vram: 8, mem: "GDDR7" }, ["a dual-fan cooler", "an out-of-the-box overclock"]),
  F("B0GK8J4MGD", "ZOTAC Gaming GeForce RTX 5060 Ti 8GB Twin Edge OC", "Zotac 5060 Ti Twin Edge 8GB", { chip: "RTX 5060 Ti", vram: 8, mem: "GDDR7", slots: 2, sff: true, outputs: DP21 }, ["two 90mm BladeLink fans", "a 2-slot SFF-ready body"]),
  F("B0F4RXQS6M", "ASUS Prime GeForce RTX 5060 Ti 8GB OC Edition", "ASUS Prime 5060 Ti 8GB OC", { chip: "RTX 5060 Ti", vram: 8, mem: "GDDR7", slots: 2.5, sff: true }, ["a 2.5-slot design", "0dB fan stop at light loads"]),
  // RTX 5060
  F("B0FRC51HMF", "ASUS Dual GeForce RTX 5060 8GB White OC Edition", "ASUS Dual 5060 White", { chip: "RTX 5060", vram: 8, mem: "GDDR7", sff: true }, ["a white finish", "a dual BIOS switch"]),
  F("B0F76KGH6B", "ASUS Prime GeForce RTX 5060 8GB OC Edition", "ASUS Prime 5060 OC", { chip: "RTX 5060", vram: 8, mem: "GDDR7", slots: 2.5, sff: true }, ["a 2.5-slot design", "0dB fan stop at light loads"]),
  F("B0F77GW9RK", "ASUS TUF Gaming GeForce RTX 5060 8GB OC Edition", "ASUS TUF 5060 OC", { chip: "RTX 5060", vram: 8, mem: "GDDR7", boost: "2677MHz (OC mode)", slots: 3.1 }, ["military-grade components with a protective PCB coating", "ASUS GPU Guard support hardware"]),
  // RTX 5050
  F("B0FFVFD58L", "MSI GeForce RTX 5050 8G Shadow 2X OC", "MSI 5050 Shadow 2X", { chip: "RTX 5050", vram: 8, mem: "GDDR6" }, ["TORX Fan 5.0 blades", "a reinforcing backplate"]),
  F("B0FG8J867N", "Gigabyte GeForce RTX 5050 OC Low Profile 8G", "Gigabyte 5050 Low Profile", { chip: "RTX 5050", vram: 8, mem: "GDDR6", length: 182, lp: true, sff: true }, ["a 182mm low-profile card", "support for up to four displays"]),
  // RX 9070 XT
  F("B0DW4FGLCC", "XFX Mercury AMD Radeon RX 9070 XT OC Magnetic Air Edition", "XFX Mercury 9070 XT", { chip: "RX 9070 XT", vram: 16, mem: "GDDR6", boost: "3100MHz" }, ["a Magnetic Air triple-fan cooler", "a boost clock of up to 3100MHz"]),
  F("B0DRPRZMK2", "Sapphire Pulse AMD Radeon RX 9070 XT Gaming 16GB", "Sapphire Pulse 9070 XT", { chip: "RX 9070 XT", vram: 16, mem: "GDDR6" }, ["64 compute units on RDNA 4", "FSR 4 AI upscaling support"]),
  F("B0DTHMPWFR", "Sapphire Pulse AMD Radeon RX 9070 XT Gaming (11348-03-20G)", "Sapphire Pulse 9070 XT 20G", { chip: "RX 9070 XT", vram: 16, mem: "GDDR6" }, ["16GB of GDDR6 on RDNA 4"]),
  F("B0FSB21RG7", "ASUS Prime Radeon RX 9070 XT 16GB White OC Edition", "ASUS Prime 9070 XT White", { chip: "RX 9070 XT", vram: 16, mem: "GDDR6", boost: "3030MHz (OC mode)", slots: 2.5 }, ["a white finish", "a 2.5-slot design"]),
  F("B0CVVLV5TV", "PowerColor Hellhound AMD Radeon RX 9070 XT 16GB", "PowerColor Hellhound 9070 XT", { chip: "RX 9070 XT", vram: 16, mem: "GDDR6" }, ["16GB of GDDR6"]),
  // RX 9070 GRE
  F("B0GZPV8T9Q", "ASUS ATS Radeon RX 9070 GRE 12GB OC Edition", "ASUS ATS 9070 GRE", { chip: "RX 9070 GRE", vram: 12, mem: "GDDR6", slots: 2.5 }, ["a 2.5-slot design", "a dual BIOS switch"]),
  F("B0H1DPHY43", "Sapphire Pulse AMD Radeon RX 9070 GRE Gaming OC", "Sapphire Pulse 9070 GRE", { chip: "RX 9070 GRE", vram: 12, mem: "GDDR6" }, ["12GB of GDDR6 on RDNA 4"]),
  F("B0H2X24HGM", "Gigabyte Gaming Radeon RX 9070 GRE 12GB", "Gigabyte Gaming 9070 GRE", { chip: "RX 9070 GRE", vram: 12, mem: "GDDR6" }, ["a dual BIOS for Performance or Silent", "a WINDFORCE cooling system with RGB lighting"]),
  F("B0H2PSG4J3", "PowerColor Reaper AMD Radeon RX 9070 GRE 12GB", "PowerColor Reaper 9070 GRE", { chip: "RX 9070 GRE", vram: 12, mem: "GDDR6" }, ["12GB of GDDR6"]),
  // RX 9060 XT
  F("B0F91KM1CK", "Gigabyte Radeon RX 9060 XT Gaming OC 16G", "Gigabyte 9060 XT Gaming OC 16G", { chip: "RX 9060 XT", vram: 16, mem: "GDDR6" }, ["a WINDFORCE cooling system with Hawk fans", "RGB lighting"]),
  F("B0FLH14CMK", "ASUS Dual Radeon RX 9060 XT 16GB White Edition", "ASUS Dual 9060 XT 16GB White", { chip: "RX 9060 XT", vram: 16, mem: "GDDR6", slots: 2.5 }, ["a white finish", "dual ball fan bearings"]),
  F("B0F9LN5VZ6", "Sapphire Pulse AMD Radeon RX 9060 XT Gaming OC 16GB", "Sapphire Pulse 9060 XT 16GB", { chip: "RX 9060 XT", vram: 16, mem: "GDDR6" }, ["16GB of GDDR6 on RDNA 4"]),
  F("B0FC5ZQKJ8", "XFX Swift AMD Radeon RX 9060 XT OC Triple Fan 16GB", "XFX Swift 9060 XT 16GB", { chip: "RX 9060 XT", vram: 16, mem: "GDDR6", boost: "3320MHz" }, ["a triple-fan SWFT cooler", "a boost clock of up to 3320MHz"]),
  F("B0F8PBS1BX", "XFX Swift AMD Radeon RX 9060 XT OC White Triple Fan 16GB", "XFX Swift 9060 XT White", { chip: "RX 9060 XT", vram: 16, mem: "GDDR6", boost: "3320MHz" }, ["a white triple-fan SWFT cooler", "a boost clock of up to 3320MHz"]),
  F("B0FFNF5J8Y", "XFX Mercury AMD Radeon RX 9060 XT OC White 16GB", "XFX Mercury 9060 XT White", { chip: "RX 9060 XT", vram: 16, mem: "GDDR6", boost: "3320MHz" }, ["a white triple-fan MERC cooler", "a boost clock of up to 3320MHz"]),
  F("B0H84YPD63", "ASRock Radeon RX 9060 XT Challenger Pro 16GB OC", "ASRock Challenger Pro 9060 XT", { chip: "RX 9060 XT", vram: 16, mem: "GDDR6", boost: "3290MHz" }, ["a factory overclock to 3290MHz", "a triple-fan cooler with a customizable LED indicator"]),
  F("B0F8PDPX81", "XFX Swift AMD Radeon RX 9060 XT OC Gaming Edition 8GB", "XFX Swift 9060 XT 8GB", { chip: "RX 9060 XT", vram: 8, mem: "GDDR6", boost: "3320MHz" }, ["a dual-fan SWFT cooler", "a boost clock of up to 3320MHz"]),
  F("B0F7HSLY47", "Gigabyte Radeon RX 9060 XT Gaming OC 8G", "Gigabyte 9060 XT Gaming OC 8G", { chip: "RX 9060 XT", vram: 8, mem: "GDDR6", boost: "3320MHz" }, ["a dual BIOS for Performance or Silent", "a WINDFORCE cooling system with RGB lighting"]),
  F("B0F8PSH3Q9", "ASUS Prime Radeon RX 9060 XT 8GB OC Edition", "ASUS Prime 9060 XT 8GB", { chip: "RX 9060 XT", vram: 8, mem: "GDDR6", slots: 2.5 }, ["a 2.5-slot design", "0dB fan stop at light loads"]),
  // Intel Arc
  F("B0DNMH4KQM", "Sparkle Intel Arc B580 Titan OC 12GB", "Sparkle Arc B580 Titan", { chip: "Arc B580", vram: 12, mem: "GDDR6" }, ["a metal backplate and a card-sag bracket", "a blue breathing light"]),
  F("B0DR337DJG", "Sparkle Intel Arc B570 Guardian OC 10GB", "Sparkle Arc B570 Guardian", { chip: "Arc B570", vram: 10, mem: "GDDR6" }, ["TORN Cooling 2.0 with an axial fan", "a metal backplate"]),
  F("B0DW9GM74Z", "Sparkle Intel Arc B570 Guardian Luna OC", "Sparkle Arc B570 Luna", { chip: "Arc B570", vram: 10, mem: "GDDR6" }, ["10GB of GDDR6", "1 x HDMI and 3 x DisplayPort outputs"]),
  F("B0DTC5QFN6", "Acer Nitro Intel Arc B570 OC 10GB", "Acer Nitro Arc B570", { chip: "Arc B570", vram: 10, mem: "GDDR6" }, ["a dual-fan Frostblade cooler", "18 Xe2 cores"]),
  // RTX 4090 and 4080 Super
  F("B0CJKMNZQX", "Gigabyte GeForce RTX 4090 WINDFORCE V2 24G", "Gigabyte 4090 Windforce V2", { chip: "RTX 4090", vram: 24, mem: "GDDR6X" }, ["three WINDFORCE fans", "a 384-bit memory interface"]),
  F("B0D36DDFGL", "MSI GeForce RTX 4080 Super 16G Ventus 3X OC", "MSI 4080 Super Ventus 3X", { chip: "RTX 4080 Super", vram: 16, mem: "GDDR6X", boost: "2595MHz" }, ["a 2595MHz boost clock", "a 256-bit memory interface"]),
  // RTX 4070 Ti Super
  F("B0FK2D6P4P", "ASUS TUF Gaming GeForce RTX 4070 Ti Super BTF White OC Edition", "ASUS TUF 4070 Ti Super BTF White", { chip: "RTX 4070 Ti Super", vram: 16, mem: "GDDR6X" }, ["a white BTF design"]),
  F("B0CSK393CR", "Gigabyte GeForce RTX 4070 Ti Super WINDFORCE OC 16G", "Gigabyte 4070 Ti Super Windforce OC", { chip: "RTX 4070 Ti Super", vram: 16, mem: "GDDR6X" }, ["three WINDFORCE fans", "a protective metal backplate"]),
  F("B0CSK87B4R", "Gigabyte GeForce RTX 4070 Ti Super Eagle OC 16G", "Gigabyte 4070 Ti Super Eagle", { chip: "RTX 4070 Ti Super", vram: 16, mem: "GDDR6X" }, ["a dual BIOS and a protective metal backplate", "a 4-year warranty with online registration"]),
  F("B0CSJVCD3Y", "Gigabyte GeForce RTX 4070 Ti Super Gaming OC 16G", "Gigabyte 4070 Ti Super Gaming OC", { chip: "RTX 4070 Ti Super", vram: 16, mem: "GDDR6X" }, ["a dual BIOS", "a protective metal backplate"]),
  F("B0CSGCTMT2", "MSI GeForce RTX 4070 Ti Super 16G Gaming X Slim", "MSI 4070 Ti Super Gaming X Slim", { chip: "RTX 4070 Ti Super", vram: 16, mem: "GDDR6X" }, ["a slimmer Gaming X cooler", "a 256-bit memory interface"]),
  F("B0D1B5DDVS", "ASUS Dual GeForce RTX 4070 Ti Super OC Edition", "ASUS Dual 4070 Ti Super OC", { chip: "RTX 4070 Ti Super", vram: 16, mem: "GDDR6X", slots: 2.56 }, ["a 2.56-slot design", "dual ball fan bearings"]),
  F("B0CS3X3DTG", "ASUS TUF Gaming GeForce RTX 4070 Ti Super OC Edition", "ASUS TUF 4070 Ti Super OC", { chip: "RTX 4070 Ti Super", vram: 16, mem: "GDDR6X" }, ["an Axial-tech fan that ASUS rates for 21% more airflow", "OC mode clocks"]),
  // RTX 4070 Super
  F("B0D363JYTH", "PNY GeForce RTX 4070 Super 12GB", "PNY 4070 Super", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X" }, ["a PNY reference-style card"]),
  F("B0D3JCQSJH", "Gigabyte GeForce RTX 4070 Super WINDFORCE OC 12G", "Gigabyte 4070 Super Windforce OC", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X" }, ["three WINDFORCE fans", "a 192-bit memory interface"]),
  F("B0CSJWWDS7", "Gigabyte GeForce RTX 4070 Super Gaming OC 12G", "Gigabyte 4070 Super Gaming OC", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X" }, ["a dual BIOS", "a 4-year warranty with online registration"]),
  F("B0CQTNRTWR", "Gigabyte GeForce RTX 4070 Super WINDFORCE OC", "Gigabyte 4070 Super Windforce", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X", boost: "2505MHz" }, ["a 2505MHz boost clock", "a metal backplate"]),
  F("B0DZNJHF83", "Gigabyte GeForce RTX 4070 Super AERO OC", "Gigabyte 4070 Super AERO", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X", boost: "2565MHz" }, ["a 2565MHz boost clock", "a white AERO finish"]),
  F("B0CSHFM3D5", "MSI GeForce RTX 4070 Super 12G Ventus 3X OC", "MSI 4070 Super Ventus 3X", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X", boost: "2520MHz" }, ["a 2520MHz boost clock", "a 192-bit memory interface"]),
  F("B0CS7MBND4", "MSI GeForce RTX 4070 Super 12G Gaming X Slim", "MSI 4070 Super Gaming X Slim", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X", boost: "2655MHz" }, ["a slimmer Gaming X cooler", "a 2655MHz boost clock"]),
  F("B0CS77KMC2", "MSI GeForce RTX 4070 Super 12G Ventus 2X White OC", "MSI 4070 Super Ventus 2X White", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X" }, ["a white two-fan design", "a 192-bit memory interface"]),
  F("B0D3J8RM26", "ASUS Dual GeForce RTX 4070 Super OC Edition", "ASUS Dual 4070 Super OC", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X" }, ["a dual-fan cooler", "DLSS 3 support"]),
  F("B0CQPWN1GF", "ASUS ROG Strix GeForce RTX 4070 Super OC Edition", "ROG Strix 4070 Super", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X", slots: 3.12 }, ["a 3.12-slot design", "a diecast shroud, frame and backplate"]),
  // RTX 4070
  F("B0C3SPXZJ8", "NVIDIA GeForce RTX 4070 Founders Edition", "RTX 4070 Founders Edition", { chip: "RTX 4070", vram: 12, mem: "GDDR6X" }, ["NVIDIA's own Founders Edition design"]),
  F("B0C1PDHK2K", "PNY GeForce RTX 4070 12GB XLR8 Gaming Verto Epic-X RGB", "PNY 4070 XLR8 Verto", { chip: "RTX 4070", vram: 12, mem: "GDDR6X", boost: "2475MHz" }, ["a triple-fan cooler with Epic-X RGB lighting", "a 2475MHz boost clock"]),
  F("B0BZTF7LFK", "ASUS Dual GeForce RTX 4070 OC Edition 12GB", "ASUS Dual 4070 OC", { chip: "RTX 4070", vram: 12, mem: "GDDR6X" }, ["IP5X dust resistance", "a 144-hour validation program"]),
  // RTX 4060 Ti and 4060
  F("B0BRYMYSMZ", "ASUS Dual GeForce RTX 4060 Ti OC Edition 8GB", "ASUS Dual 4060 Ti OC", { chip: "RTX 4060 Ti", vram: 8, mem: "GDDR6" }, ["an Axial-tech fan with a smaller hub for longer blades", "OC Edition clocks"]),
  F("B0D3KNKR2B", "Gigabyte GeForce RTX 4060 Ti WINDFORCE OC 8G", "Gigabyte 4060 Ti Windforce 8G", { chip: "RTX 4060 Ti", vram: 8, mem: "GDDR6" }, ["two WINDFORCE fans", "a 128-bit memory interface"]),
  F("B0CG2MX5H9", "PNY GeForce RTX 4060 Ti 16GB Verto Dual Fan", "PNY 4060 Ti 16GB Verto", { chip: "RTX 4060 Ti", vram: 16, mem: "GDDR6", boost: "2535MHz" }, ["a dual-fan cooler", "a 2535MHz boost clock"]),
  F("B0C5SDCMF3", "ASUS Dual GeForce RTX 4060 Ti White OC Edition 8GB", "ASUS Dual 4060 Ti White", { chip: "RTX 4060 Ti", vram: 8, mem: "GDDR6" }, ["a white finish", "an Axial-tech fan design"]),
  F("B0C7W8GZMJ", "MSI GeForce RTX 4060 Ventus 2X Black 8G OC", "MSI 4060 Ventus 2X Black", { chip: "RTX 4060", vram: 8 }, ["TORX Fan 4.0 blades", "Zero Frozr fan stop and a reinforcing backplate"]),
  F("B0C8K441T1", "Gigabyte GeForce RTX 4060 Eagle OC 8G", "Gigabyte 4060 Eagle OC", { chip: "RTX 4060", vram: 8, mem: "GDDR6" }, ["three WINDFORCE fans and a dual BIOS", "a protective metal backplate"]),
  F("B0DHJDQPC9", "ASUS Dual GeForce RTX 4060 V2 OC Edition", "ASUS Dual 4060 V2 OC", { chip: "RTX 4060", vram: 8, mem: "GDDR6" }, ["a 2-slot dual-fan design", "DLSS 3 support"]),
  // Radeon RX 7000
  F("B0BSPTZ4VQ", "Sapphire Pulse Radeon RX 7900 XTX Gaming OC 24GB", "Sapphire Pulse 7900 XTX", { chip: "RX 7900 XTX", vram: 24, mem: "GDDR6" }, ["24GB of GDDR6"]),
  F("B0BNLSDRKB", "XFX Radeon RX 7900 XT Gaming 20GB", "XFX 7900 XT Gaming", { chip: "RX 7900 XT", vram: 20, mem: "GDDR6" }, ["an AMD triple-fan cooling solution"]),
  F("B0CGHQ32S2", "Gigabyte Radeon RX 7800 XT Gaming OC 16G", "Gigabyte 7800 XT Gaming OC", { chip: "RX 7800 XT", vram: 16, mem: "GDDR6" }, ["three WINDFORCE fans", "RGB Fusion lighting and a metal backplate"]),
  F("B0DCPBWGPD", "XFX Speedster SWFT210 Radeon RX 7800 XT", "XFX Speedster SWFT210 7800 XT", { chip: "RX 7800 XT", vram: 16, mem: "GDDR6", boost: "2430MHz" }, ["a dual-fan cooler", "a boost clock of up to 2430MHz"]),
  F("B0CJGP4P4V", "PowerColor Fighter AMD Radeon RX 7800 XT 16GB", "PowerColor Fighter 7800 XT", { chip: "RX 7800 XT", vram: 16, mem: "GDDR6" }, ["16GB of GDDR6"]),
  F("B0CGM92TW8", "XFX Speedster QICK319 RX 7800 XT CORE", "XFX QICK319 7800 XT", { chip: "RX 7800 XT", vram: 16, mem: "GDDR6" }, ["a triple-fan QICK cooler"]),
  F("B0CGC5P7H3", "Gigabyte Radeon RX 7700 XT Gaming OC 12G", "Gigabyte 7700 XT Gaming OC", { chip: "RX 7700 XT", vram: 12, mem: "GDDR6" }, ["three WINDFORCE fans", "RGB Fusion lighting and a metal backplate"]),
  F("B0CHK2345D", "ASRock Radeon RX 7700 XT Challenger 12GB OC", "ASRock Challenger 7700 XT", { chip: "RX 7700 XT", vram: 12, mem: "GDDR6" }, ["0dB silent cooling at light loads"]),
  F("B0D9WY8GS1", "Gigabyte Radeon RX 7600 XT Gaming OC 16G", "Gigabyte 7600 XT Gaming OC", { chip: "RX 7600 XT", vram: 16, mem: "GDDR6" }, ["three WINDFORCE fans", "a 128-bit memory interface"]),
  F("B0DR25XD68", "XFX Speedster SWFT210 Radeon RX 7600", "XFX Speedster SWFT210 7600", { chip: "RX 7600", vram: 8, mem: "GDDR6" }, ["a dual-fan SWFT cooler"]),
  F("B0C626FFG2", "ASRock Radeon RX 7600 Challenger 8GB OC", "ASRock Challenger 7600", { chip: "RX 7600", vram: 8, mem: "GDDR6", boost: "2695MHz" }, ["a 2695MHz boost clock", "0dB silent cooling and a metal backplate"]),
]);
