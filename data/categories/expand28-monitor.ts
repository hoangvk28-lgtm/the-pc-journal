import pool from "@/data/pcj-pool/monitors.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 28 monitor fact sheets for monitorSchema: OLED and QD-OLED, 4K dual-mode, Mini LED, 1440p IPS, esports TN,
 * curved and ultrawide, work and portable panels. Listing titles and bullets only, reviewed by hand; unstated fields stay
 * undefined. Renewed units, bundles, accessories and no-brand panels are skipped. For dual-mode panels, `hz` is the
 * refresh rate at the native resolution and the 1080p rate is in the notes.
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const Q = "2560x1440", K = "3840x2160", H = "1920x1080", U = "3440x1440", W = "1920x1200";

export const expand28MonitorFacts: Record<string, Fact> = withPool(pool as Pool, [
  // OLED and QD-OLED
  F("B0BRBW8KRK", "LG UltraGear 27-inch OLED QHD 240Hz", "LG UltraGear OLED 27", { size: 27, res: Q, hz: 240, panel: "OLED", resp: 0.03, gamut: "98.5% DCI-P3", sync: "G-SYNC Compatible" }, ["a 0.03ms GtG response time"]),
  F("B0GDSC8K2H", "Samsung 27-inch Odyssey OLED G6 (G61SH)", "Odyssey OLED G61SH", { size: 27, res: Q, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "HDR10" }, ["OLED Safeguard thermal modulation against burn-in", "a glare-free screen and Pantone validation"]),
  F("B0FJYRV9TK", "Samsung 27-inch Odyssey OLED G6 (G60SF)", "Odyssey OLED G60SF", { size: 27, res: Q, hz: 500, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 500", sync: "G-SYNC Compatible" }, ["a 500Hz refresh rate that Samsung calls a first for OLED monitors", "1000 nits of peak brightness"]),
  F("B0DHJD894W", "Samsung 27-inch Odyssey OLED G6 (G61SD)", "Odyssey OLED G61SD", { size: 27, res: Q, panel: "QD-OLED", resp: 0.03, sync: "G-SYNC Compatible, FreeSync" }, ["QD-OLED brightness with a wide colour gamut"]),
  F("B0DTR8YY3G", "MSI MAG 271QPX QD-OLED E2", "MAG 271QPX E2", { size: 27, res: Q, hz: 240, panel: "QD-OLED", resp: 0.03 }, ["OLED Care 2.0 against burn-in"]),
  F("B0GKFW9GCV", "GIGABYTE MO27Q2A QD-OLED", "Gigabyte MO27Q2A", { size: 27, res: Q, hz: 280, panel: "QD-OLED", sync: "FreeSync Premium Pro" }, ["an AI-based OLED Care suite against burn-in"]),
  F("B0FWHPY1GJ", "ASUS ROG XG27AQDMGR", "XG27AQDMGR", { size: 26.5, res: Q, hz: 240, panel: "WOLED", resp: 0.03, hdr: "DisplayHDR 400 True Black", gamut: "99% DCI-P3" }, ["a glossy TrueBlack panel", "OLED Care Pro with a proximity sensor that blanks the screen when you leave"]),
  F("B0CZWM44QP", "ASUS ROG XG27AQDMG", "XG27AQDMG", { size: 26.5, res: Q, hz: 240, panel: "WOLED", resp: 0.03 }, ["a third-generation glossy WOLED panel", "a custom heatsink and ROG OLED Anti-flicker technology"]),
  F("B0D7NZHH2K", "ASUS ROG Swift PG27AQDM-R", "PG27AQDM-R", { size: 26.5, res: Q, hz: 240, panel: "OLED", resp: 0.03 }, ["an anti-glare micro-texture coating", "a custom heatsink for heat management"]),
  F("B0DM6SHQTN", "ASUS ROG Swift PG27UCDM", "PG27UCDM", { size: 26.5, res: K, hz: 240, panel: "QD-OLED", resp: 0.03 }, ["a fourth-generation QD-OLED panel", "OLED Anti-Flicker 2.0"]),
  F("B0D7NNK43H", "ASUS ROG Swift PG32UCDP", "PG32UCDP", { size: 32, res: K, hz: 240, panel: "WOLED" }, ["a dual mode with 4K at 240Hz or 1080p at 480Hz", "AI Crosshair and AI Sniper functions"]),
  F("B0F732KMQQ", "ASUS ROG XG32UCWMG", "XG32UCWMG", { size: 32, res: K, hz: 240, panel: "WOLED", sync: "G-SYNC" }, ["a dual mode with 4K at 240Hz or 1080p at 480Hz", "a glossy TrueBlack panel with a proximity-sensor burn-in guard"]),
  F("B0G4P3ZNKN", "MSI MPG 271QR QD-OLED X50", "MPG 271QR X50", { size: 27, res: Q, hz: 500, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 500", gamut: "99% DCI-P3", sync: "FreeSync Premium Pro, G-SYNC Compatible", usbc: true }, ["DisplayPort 2.1 and HDMI 2.1 inputs", "a 98W USB-C port"]),
  F("B0CWPXVQJN", "MSI MAG 271QPX QD-OLED", "MAG 271QPX", { size: 27, res: Q, hz: 360, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", usbc: true }, ["a console mode with HDMI 2.1 at 1440p and 360Hz", "OLED Care 2.0"]),
  F("B0H88F2185", "MSI PRO MAX 271QPX14G QD-OLED", "PRO MAX 271QPX14G", { size: 27, res: Q, hz: 144, panel: "QD-OLED", sync: "FreeSync, G-SYNC Compatible" }, ["a 3-year burn-in warranty", "built-in speakers and Pantone validation"]),
  F("B0FL1JYN7C", "INNOCN GA27M1Q 27-inch QD-OLED 500Hz", "INNOCN GA27M1Q", { size: 27, res: Q, hz: 500, panel: "QD-OLED", resp: 0.03, gamut: "99% DCI-P3", sync: "G-SYNC Compatible" }, ["a 500Hz refresh rate", "a 1,500,000:1 contrast ratio"]),
  F("B0GKF8K19Q", "GIGABYTE MO27Q28GR WOLED", "Gigabyte MO27Q28GR", { size: 27, res: Q, panel: "WOLED", sync: "FreeSync Premium Pro" }, ["a fourth-generation WOLED panel with 1500 nits of peak brightness", "a four-sided borderless design"]),
  F("B0H8QKBQ8X", "Samsung 27-inch Odyssey OLED G7 (G70SH) 4K", "Odyssey OLED G70SH", { size: 27, res: K, hz: 165, panel: "QD-OLED" }, ["a 166 PPI pixel density", "a fourth-generation five-layer QD-OLED panel"]),
  F("B0GWGNWMNB", "Samsung 27-inch Odyssey OLED G8 (G80SH) 4K", "Odyssey OLED G80SH", { size: 27, res: K, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", usbc: true, warranty: 3, stand: "height, tilt, swivel and pivot" }, ["a 96W USB-C port and DisplayPort 2.1", "a 166 PPI pixel density"]),
  F("B0GY62Y41K", "Samsung 32-inch Odyssey OLED G7 (G73SH) 4K", "Odyssey OLED G73SH", { size: 32, res: K, hz: 165, panel: "OLED", resp: 0.03, hdr: "DisplayHDR True Black 400" }, ["a dual mode with 4K at 165Hz or 1080p at 330Hz", "a glossy OLED screen"]),
  F("B0F14PFFPS", "LG UltraGear 32GX870A-B OLED 4K", "LG 32GX870A", { size: 32, res: K, hz: 240, panel: "OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", sync: "G-SYNC Compatible, FreeSync Premium Pro", usbc: true }, ["a dual mode with 4K at 240Hz or 1080p at 480Hz", "DisplayPort 2.1 input"]),
  F("B0DTJRWVVW", "MSI MPG 322URX QD-OLED", "MPG 322URX", { size: 32, res: K, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400" }, ["DisplayPort 2.1a UHBR20 for native 4K at 240Hz", "built-in speakers"]),
  F("B0DPXZ6X7Q", "MSI MPG 321CURX QD-OLED", "MPG 321CURX", { size: 32, res: K, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", sync: "G-SYNC Compatible", usbc: true }, ["a 1700R curve", "a 98W USB-C port and KVM switch"]),
  F("B0DPXZP328", "MSI MAG 321CUP QD-OLED", "MAG 321CUP", { size: 32, res: K, hz: 165, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", gamut: "99% DCI-P3", sync: "G-SYNC Compatible", usbc: true }, ["a 1700R curve", "HDMI 2.1 and a 15W USB-C port"]),
  F("B0HFHZJ6C2", "Alienware 34 AW3426DW QD-OLED", "Alienware AW3426DW", { size: 34, res: U, hz: 280, panel: "QD-OLED", resp: 0.03, sync: "G-SYNC" }, ["an ultrawide QD-OLED panel"]),
  // 4K, Mini LED and dual mode
  F("B0G31Y923T", "ASUS ROG Strix XG27UCGR", "XG27UCGR", { size: 27, res: K, hz: 162, panel: "Fast IPS", resp: 0.3, sync: "G-SYNC" }, ["a dual mode with 4K at 162Hz or 1080p at 485Hz", "ASUS Smart Pixel Enhancement"]),
  F("B0G31RL8YN", "ASUS ROG Strix XG27UCGR-W", "XG27UCGR-W", { size: 27, res: K, hz: 162, panel: "Fast IPS", resp: 0.3, sync: "G-SYNC", usbc: true }, ["a white finish", "a dual mode with 4K at 162Hz or 1080p at 485Hz"]),
  F("B0GTZW9QKG", "GIGABYTE G27U", "Gigabyte G27U", { size: 27, res: K, hz: 160, panel: "SuperSpeed IPS", resp: 1 }, ["a dual mode with 4K at 160Hz or 1080p at 320Hz"]),
  F("B0FVPX9LFN", "MSI MPG 274URDFW E16M", "MPG 274URDFW", { size: 27, res: K, hz: 320, resp: 0.5, hdr: "Mini LED HDR", sync: "FreeSync Premium Pro, G-SYNC Compatible" }, ["a Mini LED backlight with 1,152 local dimming zones", "an AI Dual Mode that switches resolution and refresh rate automatically", "a white finish"]),
  F("B0H72M95QS", "MSI MAG 321UPD E14", "MAG 321UPD", { size: 32, res: K, hz: 320, panel: "IPS", resp: 0.5, sync: "FreeSync Premium" }, ["a dual mode for switching resolution and refresh rate", "a console mode for PS5 and Xbox Series X|S"]),
  F("B0FPYWMSMX", "Samsung 27-inch Odyssey G7 (G70F) 4K", "Odyssey G70F", { size: 27, res: K, hz: 180, panel: "Fast IPS" }, ["a dual mode with 4K at 180Hz or 1080p at 360Hz"]),
  F("B0FN3T4M6H", "Samsung 27-inch Odyssey G7 4K 144Hz", "Odyssey G7 4K 144Hz", { size: 27, res: K, hz: 144, panel: "IPS", resp: 1, hdr: "DisplayHDR 400", sync: "G-SYNC Compatible, FreeSync Premium", stand: "height adjustment" }, ["Ultrawide Game View for non-16:9 output"]),
  // 1440p
  F("B0C63HDHPR", "LG UltraGear 27GR83Q-B", "LG 27GR83Q", { size: 27, res: Q, hz: 240, panel: "IPS", resp: 1, hdr: "DisplayHDR 400", sync: "G-SYNC Compatible, FreeSync Premium", stand: "tilt, height and pivot" }, ["HDMI 2.1 and DisplayPort 1.4 both reach 240Hz", "a 4-pole headphone output with DTS Headphone:X"]),
  F("B0CV24GQ9W", "ASUS ROG XG27ACS", "XG27ACS", { size: 27, res: Q, hz: 180, panel: "Fast IPS", resp: 1, sync: "G-SYNC", usbc: true }, ["ELMB SYNC motion blur reduction with variable refresh rate"]),
  F("B0CZWPFBHS", "ASUS ROG XG27ACMG", "XG27ACMG", { size: 27, res: Q, hz: 270, panel: "Fast IPS", resp: 1, sync: "G-SYNC", usbc: true }, ["a 270Hz refresh rate with overclocking", "ELMB SYNC motion blur reduction"]),
  F("B0FP1KK1Z6", "ASUS ROG XG27ACMES", "XG27ACMES", { size: 27, res: Q, hz: 255, panel: "Fast IPS", resp: 0.3, sync: "G-SYNC" }, ["a 255Hz refresh rate with overclocking", "ELMB SYNC motion blur reduction"]),
  F("B0CZWZLJVQ", "MSI G272QPF E2", "MSI G272QPF E2", { size: 27, res: Q, hz: 180, panel: "Rapid IPS", resp: 1, sync: "Adaptive-Sync", stand: "height adjustment" }, ["a super narrow bezel", "a built-in speaker"]),
  F("B0FKTXF5BX", "MSI MAG 274QRFW X32", "MAG 274QRFW", { size: 27, res: Q, hz: 320, panel: "Rapid IPS", resp: 0.5, sync: "FreeSync Premium, G-SYNC Compatible" }, ["a white finish", "AI Vision for dark-area detail"]),
  F("B0H4WX9WRP", "MSI MAG 274QPF X32", "MAG 274QPF", { size: 27, res: Q, hz: 320, panel: "Rapid IPS", resp: 0.5, sync: "FreeSync Premium, G-SYNC Compatible" }, ["AI Vision for dark-area detail"]),
  F("B0D8LH2VSP", "Acer Nitro KG271U", "Nitro KG271U", { size: 27, res: Q, hz: 180, panel: "IPS", sync: "FreeSync" }, ["a zero-frame design"]),
  F("B0C4Z8RFY9", "Acer Nitro XV271U", "Nitro XV271U", { size: 27, res: Q, hz: 180, panel: "IPS", resp: 0.5, sync: "FreeSync Premium", stand: "height and tilt" }, ["180Hz over DisplayPort and 144Hz over HDMI", "two 2W speakers"]),
  F("B0C1T35BCF", "Acer Nitro XV272U", "Nitro XV272U", { size: 27, res: Q, hz: 240, panel: "IPS", resp: 0.5, sync: "FreeSync Premium", stand: "height and tilt" }, ["240Hz over DisplayPort and 144Hz over HDMI", "two 2W speakers"]),
  F("B0GKFQXR3R", "GIGABYTE M27Q2", "Gigabyte M27Q2", { size: 27, res: Q, hz: 200, panel: "SuperSpeed IPS", resp: 1, gamut: "99% DCI-P3", sync: "FreeSync Premium" }, ["a quantum dot SuperSpeed IPS panel", "210Hz when overclocked"]),
  F("B0CPHW5JQY", "AOC Q27G4XN", "AOC Q27G4XN", { size: 27, res: Q, hz: 180, panel: "VA", resp: 1 }, ["180Hz over DisplayPort 1.4"]),
  F("B0GLV9PML4", "Samsung 27-inch Odyssey G5 (G51F)", "Odyssey G51F", { size: 27, res: Q, hz: 180, resp: 1, hdr: "HDR10" }, ["a QHD panel at 1.7 times the pixel density of Full HD"]),
  F("B0G1DZM5QW", "Samsung 32-inch Odyssey G5 (G50F)", "Odyssey G50F", { size: 32, res: Q, hz: 180, panel: "IPS", resp: 1 }, ["a 32-inch QHD panel with 178-degree viewing angles"]),
  F("B0FNQ6PVPK", "Samsung 27-inch Odyssey G6 (G60F)", "Odyssey G60F", { size: 27, res: Q, panel: "Fast IPS", hdr: "DisplayHDR 400" }, ["a QHD panel at 1.7 times the pixel density of Full HD"]),
  F("B0F7PRGR2H", "KTC H27T22C-3", "KTC H27T22C-3", { size: 27, res: Q, hz: 200, panel: "Fast IPS", resp: 1, sync: "Adaptive-Sync" }, ["220Hz when overclocked over DisplayPort", "built-in speakers"]),
  F("B0D4QVHWPJ", "KTC H27T27S", "KTC H27T27S", { size: 27, res: Q, hz: 144, panel: "VA", sync: "Adaptive-Sync" }, ["a native 4000:1 contrast ratio"]),
  // Curved and ultrawide
  F("B0HF1QZ9F8", "Alienware 34 AW3426DWM", "Alienware AW3426DWM", { size: 34, res: U, hz: 240, panel: "VA", resp: 1 }, ["an ultrawide VA panel"]),
  F("B0BTK1C533", "Sceptre 34-inch C345B-QUT168", "Sceptre C345B-QUT168", { size: 34, res: U, hz: 180, resp: 1, gamut: "99% sRGB" }, ["a 1500R curve", "built-in speakers and two DisplayPort inputs"]),
  F("B0H5MGRZLY", "Sceptre 34-inch C345B-QU240T", "Sceptre C345B-QU240T", { size: 34, res: U, hz: 240, resp: 1, gamut: "100% sRGB" }, ["a 1500R curve", "two HDMI and two DisplayPort inputs"]),
  F("B0H85H25TW", "Samsung 34-inch ViewFinity S5 (S55GH)", "ViewFinity S55GH", { size: 34, res: U, hz: 120, hdr: "HDR10" }, ["a 1800R curve", "a 21:9 aspect ratio for multitasking"]),
  F("B0FSNVNT8Y", "Westinghouse 34-inch curved gaming monitor", "Westinghouse 34 curved", { size: 34, res: U, hz: 180, panel: "VA", resp: 1, gamut: "122% sRGB", sync: "FreeSync Premium" }, ["a 1500R curve", "a 3000:1 contrast ratio"]),
  // Esports and 1080p
  F("B0D3JC9S9M", "BenQ Zowie XL2566X+", "Zowie XL2566X+", { size: 24.1, res: H, hz: 400, panel: "Fast TN" }, ["DyAc 2 motion clarity", "a native Full HD Fast TN panel"]),
  F("B0DKZPJ1X6", "BenQ Zowie XL2546X+", "Zowie XL2546X+", { size: 24.1, res: H, hz: 280, panel: "Fast TN" }, ["DyAc 2 motion clarity"]),
  F("B0FH17K4K8", "BenQ Zowie XL2540X+", "Zowie XL2540X+", { size: 24.1, res: H, hz: 280, panel: "Fast TN" }, ["a Fast TN panel with reduced overshoot"]),
  F("B0CNSD6HXQ", "BenQ Zowie XL2586X", "Zowie XL2586X", { size: 24.1, res: H, hz: 540, panel: "Fast TN" }, ["DyAc 2 motion clarity", "a shielding hood and an XL Setting to Share"]),
  F("B0DK5TZMHV", "BenQ Zowie XL2586X+", "Zowie XL2586X+", { size: 24.1, res: H, hz: 600, panel: "Fast TN" }, ["DyAc 2 motion clarity", "a 600Hz refresh rate"]),
  F("B0F72CM8V8", "ASUS TUF Gaming VG279QML5A", "TUF VG279QML5A", { size: 27, res: H, hz: 240, panel: "Fast IPS", resp: 0.3, sync: "FreeSync Premium, G-SYNC Compatible" }, ["a 0.3ms minimum response time"]),
  F("B0F854GX5H", "ASUS TUF Gaming VG259Q5A", "TUF VG259Q5A", { size: 24.5, res: H, hz: 200, panel: "Fast IPS", resp: 0.3 }, ["ELMB motion blur reduction"]),
  F("B0DJTTB6V9", "Acer Nitro KG251Q Z1", "Nitro KG251Q", { size: 24.5, res: H, hz: 280, sync: "FreeSync Premium" }, ["a zero-frame design"]),
  F("B0G2R49JS4", "Acer Nitro KG240Y W3", "Nitro KG240Y", { size: 23.8, res: H, hz: 240, panel: "IPS", sync: "FreeSync Premium" }, ["a zero-frame IPS panel"]),
  F("B0F6VCDJM9", "Acer Nitro KG271 X1", "Nitro KG271", { size: 27, res: H, hz: 200, panel: "IPS", sync: "FreeSync Premium" }, ["a zero-frame IPS panel"]),
  F("B0H85TQF5M", "Samsung 24-inch Odyssey G3 (G30H)", "Odyssey G30H", { size: 24, res: H, hz: 200, panel: "IPS", hdr: "HDR10" }, ["178-degree IPS viewing angles"]),
  F("B0DVJ3WG52", "LG UltraGear 24GS65F-B", "LG 24GS65F", { size: 24, res: H, hz: 180, panel: "IPS", resp: 1, hdr: "HDR10", sync: "G-SYNC Compatible, FreeSync", stand: "tilt, height and pivot" }, ["a three-side virtually borderless design"]),
  F("B0FTZSXPLY", "MSI MAG 274CF X24", "MAG 274CF", { size: 27, res: H, hz: 240, panel: "Rapid VA", resp: 0.5, sync: "FreeSync Premium" }, ["AI Vision for dark-area detail"]),
  // Work, 4K office and portable
  F("B0D3FGFPPB", "Dell S2725DS", "Dell S2725DS", { size: 27, res: Q, hz: 100, stand: "height, tilt, swivel and pivot" }, ["TUV Rheinland 4-star eye comfort", "dual 5W integrated speakers"]),
  F("B0D5ZMCJYJ", "Samsung 32-inch ViewFinity S6 (S60UD)", "ViewFinity S60UD", { size: 32, res: Q, hz: 100, hdr: "HDR10", usbc: true, stand: "height adjustment" }, ["90W USB-C charging with a built-in LAN port", "daisy-chain support"]),
  F("B0F1Z81K34", "Samsung 32-inch ViewFinity S7 (S70D)", "ViewFinity S70D", { size: 32, res: K, panel: "IPS", hdr: "HDR10" }, ["built-in speakers", "TUV certification"]),
  F("B0DS2TCW9L", "LG 27UP650K-W UltraFine 4K", "LG 27UP650K", { size: 27, res: K, hz: 60, panel: "IPS", resp: 5, hdr: "DisplayHDR 400", gamut: "95% DCI-P3", stand: "tilt, height and pivot" }, ["a white finish", "Reader Mode and flicker-safe backlight"]),
  F("B0DQFF7FBS", "LG 27UP850K-W UltraFine 4K", "LG 27UP850K", { size: 27, res: K, panel: "IPS", hdr: "DisplayHDR 400", gamut: "95% DCI-P3" }, ["a white finish"]),
  F("B0D9R7Q449", "LG 27US500-W UltraFine 4K", "LG 27US500", { size: 27, res: K, panel: "IPS", hdr: "HDR10" }, ["a 1000:1 contrast ratio", "Reader Mode and flicker-safe backlight"]),
  F("B0BQPSX5CR", "ASUS ProArt PA279CRV", "ProArt PA279CRV", { size: 27, res: K, panel: "IPS", gamut: "99% DCI-P3", usbc: true }, ["99% Adobe RGB coverage", "factory calibration to Delta E under 2"]),
  F("B0G31WGV6J", "ASUS ProArt PA278CGRV", "ProArt PA278CGRV", { size: 27, res: Q, hz: 144, panel: "IPS", gamut: "97% DCI-P3", usbc: true }, ["factory calibration to Delta E under 2", "a 144Hz variable refresh rate"]),
  F("B0F3B127L5", "Acer DM431K A 43-inch 4K", "Acer DM431K", { size: 43, res: K, resp: 4 }, ["a 43-inch 4K panel"]),
  F("B0GGGZTSTH", "InnoView 16-inch portable gaming monitor 144Hz", "InnoView 16 portable", { size: 16, res: W, hz: 144, sync: "FreeSync" }, ["a protective sleeve in the box", "an on-screen crosshair assist"]),
  F("B0F38F1PG7", "ARZOPA 16.1-inch portable gaming monitor 144Hz", "ARZOPA 16.1 portable", { size: 16.1, res: H, hz: 144, panel: "IPS", gamut: "106% sRGB" }, ["an anti-glare IPS screen", "178-degree viewing angles"]),
  F("B0G2LL74Q3", "ZefcS 16-inch portable gaming monitor 144Hz", "ZefcS 16 portable", { size: 16, res: W, hz: 144, panel: "IPS", usbc: true }, ["HDR enhancement and a low-blue-light mode"]),
  F("B0H4V1MDSP", "Yxk 16-inch portable gaming monitor 144Hz", "Yxk 16 portable", { size: 16.1, res: W, hz: 144, panel: "IPS" }, ["a 16:10 aspect ratio"]),
  F("B0G5YRPXTV", "AHXJKA 16-inch portable gaming monitor 144Hz", "AHXJKA 16 portable", { size: 16, res: W, hz: 144, gamut: "133% sRGB", sync: "FreeSync" }, ["built-in speakers and VESA mounting", "support for variable refresh rate"]),
]);
