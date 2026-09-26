import pool from "@/data/pcj-pool/gpu.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 11 GPU fact sheets: RTX 40 and RX 7000 partner cards, budget cards and extra ASUS and
 * Zotac listings, for use with gpuRangeSchema. Source: Amazon Creators API titles and feature
 * bullets (data/pcj-pool/gpu.json), reviewed by hand. Fields the listing omits or contradicts are
 * left undefined (e.g. MSI RTX 4080 titles say 384-bit, the bullets 256-bit; bullets are used).
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const gpuExtFacts = withPool(pool as Record<string, { img?: string; price?: string }>, [
  // RTX 4090
  F("B0CPKNYX6G", "MSI GeForce RTX 4090 Gaming Slim 24G", "MSI 4090 Gaming Slim", { chip: "RTX 4090", vram: 24, mem: "GDDR6X" }, ["16,384 CUDA cores on a 384-bit memory bus", "a slimmer cooler than MSI's Gaming X Trio"]),
  F("B0BHD9TS9Q", "ASUS TUF Gaming GeForce RTX 4090 OC Edition", "ASUS TUF 4090", { chip: "RTX 4090", vram: 24, mem: "GDDR6X", boost: "2595MHz (OC mode)" }, ["Axial-tech fans that ASUS rates for 23% more airflow", "a 2595MHz boost clock in OC mode"]),
  F("B09YCLG5PB", "MSI GeForce RTX 4090 Gaming X Trio 24G", "MSI 4090 Gaming X Trio", { chip: "RTX 4090", vram: 24, mem: "GDDR6X", boost: "2595MHz" }, ["a TRI FROZR 3 cooler with a copper baseplate", "TORX Fan 5.0 blades linked by ring arcs"]),
  F("B0BGT61797", "ASUS ROG Strix GeForce RTX 4090 OC Edition", "ROG Strix 4090", { chip: "RTX 4090", vram: 24, mem: "GDDR6X" }, ["a vapor chamber with a milled heatspreader", "Axial-tech fans scaled up for more airflow"]),
  F("B0BHBTJ2X2", "PNY GeForce RTX 4090 Verto Triple Fan", "PNY 4090 Verto", { chip: "RTX 4090", vram: 24, mem: "GDDR6X", boost: "2520MHz" }, ["16,384 CUDA cores and up to 1,008GB/s of memory bandwidth", "reference 2520MHz boost clock"]),
  // RTX 4080 Super
  F("B0CQPZTRL3", "ASUS TUF Gaming GeForce RTX 4080 Super OC Edition", "ASUS TUF 4080 Super", { chip: "RTX 4080 Super", vram: 16, mem: "GDDR6X", boost: "2640MHz (OC mode)" }, ["a 2640MHz boost clock in OC mode", "Axial-tech fans that ASUS rates for 23% more airflow"]),
  F("B0CS6Y6Y7M", "PNY GeForce RTX 4080 Super XLR8 Verto Epic-X RGB OC", "PNY 4080 Super XLR8", { chip: "RTX 4080 Super", vram: 16, mem: "GDDR6X", boost: "2595MHz", slots: 3.5 }, ["10,240 CUDA cores and 736GB/s of memory bandwidth", "a 2595MHz boost clock"]),
  F("B0CQTN1CQH", "Gigabyte GeForce RTX 4080 Super WINDFORCE V2", "Gigabyte 4080 Super Windforce V2", { chip: "RTX 4080 Super", vram: 16, mem: "GDDR6X", outputs: "3 x DisplayPort 1.4a, 1 x HDMI 2.1a" }, ["a WINDFORCE triple-fan cooler", "a metal backplate"]),
  F("B0CVNM2LBK", "NVIDIA GeForce RTX 4080 Super Founders Edition", "RTX 4080 Super Founders Edition", { chip: "RTX 4080 Super", vram: 16, mem: "GDDR6X", boost: "2.55GHz" }, ["NVIDIA's own Founders Edition design", "a 2.55GHz boost clock"]),
  F("B0CQTP6J3Z", "Gigabyte GeForce RTX 4080 Super Gaming OC", "Gigabyte 4080 Super Gaming OC", { chip: "RTX 4080 Super", vram: 16, mem: "GDDR6X", boost: "2595MHz" }, ["a dual BIOS switch", "RGB Fusion lighting and a metal backplate"]),
  F("B0CSKBG4T3", "Gigabyte GeForce RTX 4080 Super AERO OC 16G", "Gigabyte 4080 Super AERO", { chip: "RTX 4080 Super", vram: 16, mem: "GDDR6X" }, ["an anti-sag bracket in the box", "a dual BIOS switch", "a white-themed AERO finish"]),
  // RTX 4080
  F("B0BMZ9TGH1", "NVIDIA GeForce RTX 4080 Founders Edition", "RTX 4080 Founders Edition", { chip: "RTX 4080", vram: 16, mem: "GDDR6X", boost: "2.51GHz" }, ["NVIDIA's own Founders Edition design", "9,728 CUDA cores"]),
  F("B0BL668N1X", "MSI GeForce RTX 4080 16GB Gaming X Trio", "MSI 4080 Gaming X Trio", { chip: "RTX 4080", vram: 16, mem: "GDDR6X", psu: 850, outputs: "3 x DisplayPort 1.4a, 1 x HDMI 2.1" }, ["an 850W recommended PSU with a stated 750W minimum", "a TRI FROZR 3 triple-fan cooler"]),
  F("B0BXFRQ3GR", "MSI GeForce RTX 4080 16GB Gaming X Trio White", "MSI 4080 Gaming X Trio White", { chip: "RTX 4080", vram: 16, mem: "GDDR6X", boost: "2610MHz", outputs: "3 x DisplayPort 1.4a, 1 x HDMI 2.1" }, ["a white shroud and backplate", "a 2610MHz boost clock"]),
  // RTX 4070 Ti Super
  F("B0D6ZN2P1J", "MSI GeForce RTX 4070 Ti Super 16G Ventus 3X Black OC", "MSI 4070 Ti Super Ventus 3X", { chip: "RTX 4070 Ti Super", vram: 16, mem: "GDDR6X", boost: "2655MHz", outputs: "2 x DisplayPort 1.4a, 2 x HDMI 2.1a" }, ["two HDMI 2.1a outputs for a TV and a monitor", "a 2655MHz boost clock"]),
  F("B0DBD9W9RY", "ZOTAC Gaming GeForce RTX 4070 Ti Super Solid OC", "Zotac 4070 Ti Super Solid OC", { chip: "RTX 4070 Ti Super", vram: 16, mem: "GDDR6X", boost: "2640MHz", outputs: "3 x DisplayPort 1.4a, 1 x HDMI 2.1a" }, ["three 100mm fans with FREEZE fan stop", "a bundled GPU support stand"]),
  F("B0CS6YS9S7", "PNY GeForce RTX 4070 Ti Super XLR8 Verto Epic-X RGB OC", "PNY 4070 Ti Super XLR8", { chip: "RTX 4070 Ti Super", vram: 16, mem: "GDDR6X", boost: "2655MHz", slots: 3.3 }, ["8,448 CUDA cores and 672GB/s of memory bandwidth", "a 2655MHz boost clock"]),
  F("B0CRW19Z5D", "ZOTAC Gaming GeForce RTX 4070 Ti Super Trinity Black Edition", "Zotac 4070 Ti Super Trinity Black", { chip: "RTX 4070 Ti Super", vram: 16, mem: "GDDR6X" }, ["a bundled GPU support stand", "FREEZE fan stop at light load"]),
  F("B0DC6HYBYR", "Gigabyte GeForce RTX 4070 Ti Super WINDFORCE MAX OC", "Gigabyte 4070 Ti Super Windforce MAX", { chip: "RTX 4070 Ti Super", vram: 16, mem: "GDDR6X" }, ["a WINDFORCE triple-fan cooler", "an optimized heatsink design"]),
  // RTX 4070 Ti
  F("B0C8ZLMKP9", "Gigabyte GeForce RTX 4070 Ti WINDFORCE OC 12G", "Gigabyte 4070 Ti Windforce", { chip: "RTX 4070 Ti", vram: 12, mem: "GDDR6X" }, ["a WINDFORCE triple-fan cooler", "a protective metal backplate"]),
  F("B0BRKSXF4K", "PNY GeForce RTX 4070 Ti Verto Triple Fan", "PNY 4070 Ti Verto", { chip: "RTX 4070 Ti", vram: 12, mem: "GDDR6X", boost: "2610MHz" }, ["7,680 CUDA cores and 504GB/s of memory bandwidth", "a triple-fan cooler"]),
  F("B0BQCVTSR3", "ZOTAC Gaming GeForce RTX 4070 Ti Trinity OC", "Zotac 4070 Ti Trinity OC", { chip: "RTX 4070 Ti", vram: 12, mem: "GDDR6X", boost: "2625MHz", outputs: "3 x DisplayPort 1.4a, 1 x HDMI 2.1a" }, ["three 90mm fans with FREEZE fan stop", "SPECTRA 2.0 ARGB lighting"]),
  F("B0CHBRB5CB", "MSI GeForce RTX 4070 Ti 12GB Gaming X Slim", "MSI 4070 Ti Gaming X Slim", { chip: "RTX 4070 Ti", vram: 12, mem: "GDDR6X", boost: "2745MHz", outputs: "3 x DisplayPort 1.4a, 1 x HDMI 2.1a" }, ["a 2745MHz boost clock, the highest of the 4070 Ti cards here", "a slimmer Gaming X cooler"]),
  F("B0BRR1MPTX", "Gigabyte GeForce RTX 4070 Ti AERO OC 12G", "Gigabyte 4070 Ti AERO", { chip: "RTX 4070 Ti", vram: 12, mem: "GDDR6X" }, ["a dual BIOS switch", "an anti-sag bracket in the box"]),
  // RTX 4070 Super
  F("B0CSJV61BN", "Gigabyte GeForce RTX 4070 Super WINDFORCE OC 12G", "Gigabyte 4070 Super Windforce", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X" }, ["a WINDFORCE triple-fan cooler", "graphene nano lubricant in the fans"]),
  F("B0CVCKX2GD", "ASUS Dual GeForce RTX 4070 Super EVO OC Edition", "ASUS Dual 4070 Super EVO", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X", boost: "2550MHz (OC mode)", slots: 2.5 }, ["0dB fan stop at light load", "a 2.5-slot dual-fan cooler"]),
  F("B0CSBDWT1W", "ZOTAC Gaming GeForce RTX 4070 Super Twin Edge", "Zotac 4070 Super Twin Edge", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X", boost: "2475MHz", outputs: "3 x DisplayPort 1.4a, 1 x HDMI 2.1a" }, ["two 90mm fans with FREEZE fan stop", "a metal backplate"]),
  F("B0CS3YQZQH", "MSI GeForce RTX 4070 Super 12G Ventus 2X OC", "MSI 4070 Super Ventus 2X", { chip: "RTX 4070 Super", vram: 12, mem: "GDDR6X", length: 242, slots: 2.1, psu: 650, sff: true }, ["ZERO FROZR fan stop", "an openwork backplate"]),
  // RTX 4070
  F("B0BZHCQ6PF", "Gigabyte GeForce RTX 4070 WINDFORCE OC 12G", "Gigabyte 4070 Windforce", { chip: "RTX 4070", vram: 12, mem: "GDDR6X" }, ["a dual BIOS switch", "an anti-sag bracket in the box"]),
  F("B0DG42QD5H", "MSI GeForce RTX 4070 Ventus 3X E1 12G OC", "MSI 4070 Ventus 3X E1", { chip: "RTX 4070", vram: 12, mem: "GDDR6", boost: "2520MHz", outputs: "3 x DisplayPort 1.4a, 1 x HDMI 2.1a" }, ["a triple-fan Ventus cooler", "GDDR6 memory rather than the GDDR6X on other 4070 cards"]),
  F("B0BZDYZ4V5", "Gigabyte GeForce RTX 4070 WINDFORCE OC 12GB", "Gigabyte 4070 Windforce OC", { chip: "RTX 4070", vram: 12, mem: "GDDR6X", boost: "2490MHz", psu: 650 }, ["a 650W recommended PSU", "a WINDFORCE cooler"]),
  F("B0BZB7DS7Q", "MSI GeForce RTX 4070 12GB Ventus 2X OC", "MSI 4070 Ventus 2X", { chip: "RTX 4070", vram: 12, mem: "GDDR6X", outputs: "3 x DisplayPort 1.4a, 1 x HDMI 2.1" }, ["a dual-fan Ventus cooler", "three DisplayPort outputs"]),
  // RTX 4060 Ti 8GB
  F("B0CBW16TL3", "Gigabyte GeForce RTX 4060 Ti WINDFORCE OC 8G", "Gigabyte 4060 Ti Windforce", { chip: "RTX 4060 Ti", vram: 8, mem: "GDDR6" }, ["a dual-fan WINDFORCE cooler", "a 128-bit memory bus", "a factory overclock"]),
  F("B0DPH9V2P8", "ASUS Dual GeForce RTX 4060 Ti V2 OC Edition 8GB", "ASUS Dual 4060 Ti V2", { chip: "RTX 4060 Ti", vram: 8, mem: "GDDR6", boost: "2595MHz (OC mode)", slots: 2, sff: true }, ["0dB fan stop at light load", "a 2595MHz boost clock in OC mode"]),
  F("B0C5BQ1HM6", "Gigabyte GeForce RTX 4060 Ti Eagle 8G", "Gigabyte 4060 Ti Eagle", { chip: "RTX 4060 Ti", vram: 8, mem: "GDDR6" }, ["a dual BIOS switch", "three WINDFORCE fans", "a 128-bit memory bus"]),
  F("B0C42GBMNZ", "ASUS Dual GeForce RTX 4060 Ti OC Edition 8GB", "ASUS Dual 4060 Ti", { chip: "RTX 4060 Ti", vram: 8, mem: "GDDR6", slots: 2.5 }, ["a 2.5-slot dual-fan cooler", "Axial-tech fans", "an HDMI 2.1 output"]),
  F("B0CVPHDLTD", "ASUS Dual GeForce RTX 4060 Ti EVO OC Edition 8GB", "ASUS Dual 4060 Ti EVO", { chip: "RTX 4060 Ti", vram: 8, mem: "GDDR6", boost: "2595MHz (OC mode)" }, ["the EVO revision of ASUS's dual-fan cooler", "a 2595MHz boost clock in OC mode", "an HDMI 2.1 output"]),
  // RTX 4060
  F("B0D6CYLHW1", "ASUS Dual GeForce RTX 4060 V2 OC Edition", "ASUS Dual 4060 V2", { chip: "RTX 4060", vram: 8, mem: "GDDR6", boost: "2535MHz (OC mode)" }, ["a 2535MHz boost clock in OC mode", "an HDMI 2.1a output", "a dual-fan cooler"]),
  F("B0C8JZNLZL", "Gigabyte GeForce RTX 4060 WINDFORCE OC 8G", "Gigabyte 4060 Windforce", { chip: "RTX 4060", vram: 8, mem: "GDDR6" }, ["a dual BIOS switch", "a dual-fan WINDFORCE cooler", "a 128-bit memory bus"]),
  F("B0CD14QQXH", "ASUS Dual GeForce RTX 4060 OC White Edition", "ASUS Dual 4060 White", { chip: "RTX 4060", vram: 8, mem: "GDDR6", slots: 2.5 }, ["a white shroud for light-themed builds", "a dual BIOS switch", "a 2.5-slot dual-fan cooler"]),
  // RX 7900 XTX
  F("B0BMWSRM7W", "PowerColor Hellhound AMD Radeon RX 7900 XTX", "PowerColor Hellhound 7900 XTX", { chip: "RX 7900 XTX", vram: 24, mem: "GDDR6", length: 320, psu: 800, outputs: "3 x DisplayPort 2.1, 1 x HDMI 2.1" }, ["DisplayPort 2.1 outputs", "an 800W minimum PSU stated in the listing"]),
  F("B0BTPK5J68", "ASRock Radeon RX 7900 XTX Phantom Gaming OC 24GB", "ASRock 7900 XTX Phantom Gaming", { chip: "RX 7900 XTX", vram: 24, mem: "GDDR6", boost: "2615MHz", psu: 800 }, ["96MB of Infinity Cache", "0dB silent cooling at light load"]),
  F("B0BR6JWP1Q", "Sapphire Nitro+ AMD Radeon RX 7900 XTX Vapor-X", "Sapphire Nitro+ 7900 XTX", { chip: "RX 7900 XTX", vram: 24, mem: "GDDR6", boost: "2680MHz", length: 320, slots: 3.5, outputs: "2 x DisplayPort, 2 x HDMI" }, ["a Vapor-X vapor chamber cooler", "two HDMI and two DisplayPort outputs"]),
  F("B0BR6HZZ6Z", "Sapphire Pulse AMD Radeon RX 7900 XTX", "Sapphire Pulse 7900 XTX", { chip: "RX 7900 XTX", vram: 24, mem: "GDDR6", boost: "2525MHz", length: 313, slots: 2.7 }, ["a 2.7-slot cooler, thinner than the Nitro+", "a 313mm length"]),
  // RX 7900 XT
  F("B0BMNGT8XM", "Sapphire AMD Radeon RX 7900 XT 20GB", "Sapphire 7900 XT", { chip: "RX 7900 XT", vram: 20, mem: "GDDR6", slots: 3, outputs: "2 x DisplayPort, 1 x HDMI, 1 x USB-C" }, ["a USB-C display output", "a 3-slot reference-style cooler"]),
  F("B0BTPJBSBV", "ASRock Radeon RX 7900 XT Phantom Gaming OC 20GB", "ASRock 7900 XT Phantom Gaming", { chip: "RX 7900 XT", vram: 20, mem: "GDDR6", boost: "2450MHz", power: "2 x 8-pin" }, ["80MB of Infinity Cache", "a triple-fan Phantom Gaming cooler"]),
  F("B0CST1D8CD", "ASRock Radeon RX 7900 XT Phantom Gaming White 20GB OC", "ASRock 7900 XT Phantom Gaming White", { chip: "RX 7900 XT", vram: 20, mem: "GDDR6" }, ["a white shroud and backplate", "a 320-bit memory bus"]),
  F("B0BMWHCGBZ", "PowerColor AMD Radeon RX 7900 XT", "PowerColor 7900 XT", { chip: "RX 7900 XT", vram: 20, mem: "GDDR6", boost: "2400MHz", psu: 750 }, ["a 750W minimum PSU stated in the listing", "a reference 2400MHz boost clock"]),
  F("B0BR6L7TKR", "Sapphire Pulse AMD Radeon RX 7900 XT", "Sapphire Pulse 7900 XT", { chip: "RX 7900 XT", vram: 20, mem: "GDDR6", boost: "2450MHz", length: 313, slots: 2.7 }, ["a 313mm length", "a 2.7-slot triple-fan cooler"]),
  // RX 7800 XT
  F("B0CHK3929K", "ASRock Radeon RX 7800 XT Challenger 16GB OC", "ASRock 7800 XT Challenger", { chip: "RX 7800 XT", vram: 16, mem: "GDDR6", boost: "2475MHz", length: 267, slots: 2.5, power: "2 x 8-pin", psu: 750 }, ["a 267mm length", "a dual-fan Challenger cooler"]),
  F("B0CHK343YR", "ASRock Radeon RX 7800 XT Steel Legend 16GB OC", "ASRock 7800 XT Steel Legend", { chip: "RX 7800 XT", vram: 16, mem: "GDDR6", boost: "2520MHz", power: "2 x 8-pin", psu: 700 }, ["a white-and-silver Steel Legend finish", "a 700W recommended PSU"]),
  F("B0CFWM1LNH", "Sapphire Pulse AMD Radeon RX 7800 XT", "Sapphire Pulse 7800 XT", { chip: "RX 7800 XT", vram: 16, mem: "GDDR6", boost: "2430MHz", length: 280, slots: 2.5 }, ["a 280mm length", "a 2.5-slot dual-fan cooler"]),
  F("B0DQF23NLJ", "PowerColor Twin Fan AMD Radeon RX 7800 XT", "PowerColor 7800 XT Twin Fan", { chip: "RX 7800 XT", vram: 16, mem: "GDDR6", length: 260, power: "2 x 8-pin", psu: 750 }, ["a 260mm length, the shortest 7800 XT here", "a dual-fan cooler"]),
  F("B0CGRMJF6C", "Gigabyte Radeon RX 7800 XT Gaming OC 16G", "Gigabyte 7800 XT Gaming OC", { chip: "RX 7800 XT", vram: 16, mem: "GDDR6", boost: "2565MHz", psu: 700, outputs: "2 x DisplayPort, 2 x HDMI" }, ["two HDMI and two DisplayPort outputs", "a WINDFORCE triple-fan cooler"]),
  F("B0CFX69R1R", "Sapphire Nitro+ AMD Radeon RX 7800 XT", "Sapphire Nitro+ 7800 XT", { chip: "RX 7800 XT", vram: 16, mem: "GDDR6", boost: "2565MHz", length: 320, slots: 3 }, ["a 2565MHz boost clock", "a 3-slot triple-fan Nitro+ cooler"]),
  // RX 7600 XT and RX 7600
  F("B0CSVJZNNX", "Gigabyte Radeon RX 7600 XT Gaming OC 16G", "Gigabyte 7600 XT Gaming OC", { chip: "RX 7600 XT", vram: 16, mem: "GDDR6", outputs: "2 x DisplayPort, 2 x HDMI" }, ["three WINDFORCE fans", "two HDMI and two DisplayPort outputs"]),
  F("B0CRZBXYVQ", "XFX Speedster SWFT210 Radeon RX 7600 XT Core", "XFX 7600 XT SWFT210", { chip: "RX 7600 XT", vram: 16, mem: "GDDR6", boost: "2755MHz", outputs: "1 x HDMI, 3 x DisplayPort" }, ["a 2755MHz boost clock", "a dual-fan SWFT210 cooler"]),
  F("B0C59RVD98", "XFX Speedster SWFT210 Radeon RX 7600 8GB", "XFX 7600 SWFT210", { chip: "RX 7600", vram: 8, mem: "GDDR6", boost: "2655MHz", outputs: "1 x HDMI, 3 x DisplayPort" }, ["a 2655MHz boost clock", "a dual-fan SWFT210 cooler", "three DisplayPort outputs"]),
  F("B0DKPGQT97", "ASUS Dual Radeon RX 7600 EVO OC Edition 8GB", "ASUS Dual 7600 EVO", { chip: "RX 7600", vram: 8, mem: "GDDR6", boost: "2715MHz", slots: 2.5 }, ["0dB fan stop at light load", "a 2715MHz boost clock", "a 2.5-slot dual-fan cooler"]),
  // Budget
  F("B09J8VCFWN", "ASRock Radeon RX 6600 Challenger D 8GB", "ASRock RX 6600 Challenger D", { chip: "RX 6600", vram: 8, mem: "GDDR6", length: 269, power: "1 x 8-pin", outputs: "3 x DisplayPort 1.4, 1 x HDMI 2.1" }, ["0dB silent cooling at light load", "a PCIe 4.0 x8 interface", "a dual-fan cooler"]),
  F("B09RHQNT5K", "ASRock Radeon RX 6500 XT Phantom Gaming D 4GB OC", "ASRock RX 6500 XT", { chip: "RX 6500 XT", vram: 4, mem: "GDDR6", boost: "2820MHz", power: "1 x 8-pin", psu: 400 }, ["0dB silent cooling at light load", "a metal backplate", "a 400W minimum PSU"]),
  F("B0CJGSP9R7", "ASRock Intel Arc A580 Challenger 8GB OC", "ASRock Arc A580 Challenger", { chip: "Arc A580", vram: 8, mem: "GDDR6", length: 271, slots: 2.4, power: "2 x 8-pin", psu: 650, outputs: "3 x DisplayPort 2.0, 1 x HDMI 2.0b" }, ["a 256-bit memory bus", "0dB silent cooling at light load", "XeSS upscaling support"]),
  F("B0DQK4XSC7", "Gigabyte GeForce RTX 3050 WINDFORCE OC V2 6G", "Gigabyte RTX 3050 Windforce", { chip: "RTX 3050", vram: 6, mem: "GDDR6" }, ["a dual-fan WINDFORCE cooler", "DLSS support", "second-generation RT cores"]),
  F("B0CTK1SFVD", "MSI GeForce RTX 3050 Ventus 2X 6G OC", "MSI RTX 3050 Ventus 2X", { chip: "RTX 3050", vram: 6, mem: "GDDR6", boost: "1492MHz", outputs: "1 x DisplayPort 1.4a, 2 x HDMI 2.1a" }, ["two HDMI 2.1a outputs", "a dual-fan Ventus cooler", "DLSS support"]),
  // Extra ASUS and Zotac listings
  F("B0DS6WGWMK", "ASUS TUF Gaming GeForce RTX 5070 Ti 16GB", "ASUS TUF 5070 Ti", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", boost: "2610MHz (OC mode)", slots: 3.125 }, ["a phase-change GPU thermal pad", "a protective PCB coating"]),
  F("B0FSB9GY9Q", "ASUS ProArt GeForce RTX 5080 16GB OC Edition", "ASUS ProArt 5080", { chip: "RTX 5080", vram: 16, mem: "GDDR7", boost: "2730MHz (OC mode)", slots: 2.5 }, ["an integrated USB Type-C port", "a vapor chamber heatsink"]),
  F("B0DQSD7YQC", "ASUS ROG Astral GeForce RTX 5080 16GB OC Edition", "ROG Astral 5080", { chip: "RTX 5080", vram: 16, mem: "GDDR7", boost: "2790MHz (OC mode)", length: 357, slots: 3.8, power: "16-pin 12V-2x6", psu: 850 }, ["four Axial-tech fans", "a vapor chamber with a milled heatspreader"]),
  F("B0F7W1KVT3", "ASUS Dual GeForce RTX 5060 Ti 8GB OC Edition", "ASUS Dual 5060 Ti 8GB", { chip: "RTX 5060 Ti", vram: 8, mem: "GDDR7", boost: "2632MHz (OC mode)", slots: 2.5, sff: true }, ["a dual BIOS switch with Quiet and Performance profiles", "0dB fan stop at light load", "dual ball fan bearings"]),
  F("B0FLHBFFX4", "ASUS Dual Radeon RX 9060 XT 16GB", "ASUS Dual 9060 XT 16GB", { chip: "RX 9060 XT", vram: 16, mem: "GDDR6", boost: "3250MHz (OC mode)", slots: 2.5 }, ["a dual BIOS switch with Quiet and Performance profiles", "0dB fan stop at light load"]),
  F("B0F8PPT3G1", "ASUS Prime Radeon RX 9060 XT 16GB OC Edition", "ASUS Prime 9060 XT 16GB", { chip: "RX 9060 XT", vram: 16, mem: "GDDR6", boost: "3330MHz (OC mode)", slots: 2.5 }, ["a dual BIOS switch", "dual ball fan bearings"]),
  F("B0H3MCRPSV", "ASUS Prime Radeon RX 9070 GRE EVO OC Edition", "ASUS Prime 9070 GRE", { chip: "RX 9070 GRE", vram: 12, mem: "GDDR6", boost: "2880MHz (OC mode)", slots: 2.5 }, ["a phase-change GPU thermal pad", "a dual BIOS switch"]),
  F("B0DZF2QZSM", "ZOTAC Gaming GeForce RTX 5070 Solid OC", "Zotac 5070 Solid OC", { chip: "RTX 5070", vram: 12, mem: "GDDR7", boost: "2542MHz", outputs: "3 x DisplayPort 2.1b, 1 x HDMI 2.1b" }, ["three 90mm fans with FREEZE fan stop", "a bundled GPU support stand"]),
  F("B0GXFFZCRP", "ZOTAC Gaming GeForce RTX 5060 Ti 16GB Twin Edge OC", "Zotac 5060 Ti 16GB Twin Edge", { chip: "RTX 5060 Ti", vram: 16, mem: "GDDR7", slots: 2, power: "1 x 8-pin", sff: true, outputs: "3 x DisplayPort 2.1b, 1 x HDMI 2.1b" }, ["two 90mm fans with FREEZE fan stop", "a metal backplate"]),
  F("B0GQZG6VVC", "ZOTAC Gaming GeForce RTX 5080 Solid OC White Edition", "Zotac 5080 Solid OC White", { chip: "RTX 5080", vram: 16, mem: "GDDR7", outputs: "3 x DisplayPort 2.1b, 1 x HDMI 2.1b" }, ["a dual BIOS switch", "three 100mm fans over a vapor chamber", "a bundled GPU support stand"]),
]);
