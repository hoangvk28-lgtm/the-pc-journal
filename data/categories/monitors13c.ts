import pool from "@/data/pcj-pool/monitors.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { monitorFacts } from "./monitors";
import { monitorExtFacts } from "./monitors-ext";
import { withPool } from "./helpers";

/**
 * Batch 13c monitor fact sheets: ASUS TUF, Dell and Alienware, curved, large, OLED, budget,
 * portable and pivoting monitors. Listing claims only, reviewed by hand; unclear fields are
 * left undefined (for example ASUS Fast IPS response figures cut off in the product description).
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const Q = "2560x1440", K = "3840x2160", H = "1920x1080", UW = "3440x1440";

const base: Record<string, Fact> = { ...monitorFacts, ...monitorExtFacts };
/** Existing facts with an HDMI 2.1 note added from the listing, for console articles. */
const hdmi21 = (asin: string, note: string): Record<string, Fact> =>
  base[asin] ? { [asin]: { ...base[asin], notes: [...base[asin].notes.slice(0, 2), note] } } : {};

export const monitors13cFacts: Record<string, Fact> = {
  ...base,
  ...hdmi21("B0FNQ4B2Z2", "an HDMI 2.1 input for consoles"),
  ...hdmi21("B0FLL3L9JG", "an HDMI 2.1 input for consoles"),
  ...hdmi21("B0D1DPFZLZ", "an HDMI 2.1 input for consoles"),
  ...hdmi21("B0CTS1RQ6Y", "an HDMI 2.1 input for consoles"),
  ...hdmi21("B0CTSC3VS4", "an HDMI 2.1 input for consoles"),
  ...hdmi21("B0D9HY3JH2", "an HDMI 2.1 input for consoles"),
  ...withPool(pool as Pool, [
    // ASUS TUF
    F("B0F73CV58N", "ASUS TUF Gaming VG259QMRL5A", "VG259QMRL5A", { size: 24.5, res: H, hz: 310, panel: "Fast IPS", hdr: "DisplayHDR 400", gamut: "99% sRGB", sync: "FreeSync Premium, G-SYNC Compatible", stand: "height adjustment" }, ["a 310Hz overclocked refresh rate", "DisplayHDR 400 certification", "a height-adjustable stand"]),
    F("B0FP16G94B", "ASUS TUF Gaming VG259QM5A", "VG259QM5A", { size: 24.5, res: H, hz: 240, panel: "Fast IPS", gamut: "99% sRGB", sync: "FreeSync Premium, G-SYNC Compatible", warranty: 3 }, ["240Hz at 1080p", "a 3-year warranty", "99% sRGB coverage"]),
    F("B0F2348Q9Z", "ASUS TUF Gaming VG279QM5A", "VG279QM5A", { size: 27, res: H, hz: 240, panel: "Fast IPS", gamut: "99% sRGB", sync: "FreeSync Premium, G-SYNC Compatible", warranty: 3 }, ["a 27-inch 1080p panel at 240Hz", "a 3-year warranty", "99% sRGB coverage"]),
    F("B0F85B4462", "ASUS TUF Gaming VG249QM5A", "VG249QM5A", { size: 23.8, res: H, hz: 240, panel: "Fast IPS", gamut: "99% sRGB", sync: "FreeSync Premium, G-SYNC Compatible", warranty: 3 }, ["240Hz at a budget price tier", "a 3-year warranty", "99% sRGB coverage"]),
    F("B0F237NSVQ", "ASUS TUF Gaming VG27AQL5A", "VG27AQL5A", { size: 27, res: Q, hz: 210, panel: "Fast IPS", sync: "FreeSync Premium", stand: "height adjustment" }, ["1440p at 210Hz with overclock", "a height-adjustable stand", "a mid price tier for 1440p"]),
    F("B0DHG1GTG2", "ASUS TUF Gaming VG27UQ1A", "VG27UQ1A", { size: 27, res: K, hz: 160, panel: "Fast IPS", resp: 1, hdr: "HDR", gamut: "95% DCI-P3", sync: "G-SYNC Compatible, FreeSync Premium", warranty: 3 }, ["4K at 120Hz for consoles over HDMI", "a 3-year warranty with advance replacement", "95% DCI-P3 coverage"]),
    F("B0DQ9MMZVV", "ASUS TUF Gaming VG32WQ3B", "VG32WQ3B", { size: 31.5, res: Q, hz: 180, panel: "VA", gamut: "90% DCI-P3", sync: "FreeSync", warranty: 3 }, ["a 1500R curved 31.5-inch screen", "a 3-year warranty", "90% DCI-P3 coverage"]),
    F("B0F233D6W1", "ASUS TUF Gaming VG27AQM5A", "VG27AQM5A", { size: 27, res: Q, hz: 300, panel: "Fast IPS", resp: 0.3, gamut: "95% DCI-P3", sync: "G-SYNC, ELMB Sync", warranty: 3 }, ["1440p at 300Hz", "built-in speakers", "a 3-year warranty"]),
    F("B0F234D8G9", "ASUS TUF Gaming VG249QE5A", "VG249QE5A", { size: 23.8, res: H, hz: 146, panel: "IPS" }, ["146Hz with overclock", "an HDMI cable in the box", "the lowest ASUS TUF price tier here"]),
    // Dell and Alienware
    F("B0GD1LMWH3", "Dell 27 Plus S2725DSM", "S2725DSM", { size: 27, res: Q, hz: 144, resp: 1 }, ["dual 3W speakers", "1440p at 144Hz", "HDMI and DisplayPort inputs"]),
    F("B0G4MVZMT6", "Dell 27 Plus S2725HSM", "S2725HSM", { size: 27, res: H, hz: 144, resp: 1 }, ["dual 3W speakers", "144Hz at 1080p", "HDMI connectivity"]),
    F("B0GLRCN2SW", "Dell 27 SE2726H", "SE2726H", { size: 27, res: H, hz: 144, panel: "IPS", resp: 1, sync: "FreeSync" }, ["a 27-inch IPS panel at 144Hz", "wide IPS viewing angles", "a low price for 27 inches"]),
    F("B0GGRKQ494", "Dell 27 SE2726HG 240Hz", "SE2726HG", { size: 27, res: H, hz: 240, panel: "Fast IPS", gamut: "99% sRGB" }, ["240Hz on a 27-inch 1080p panel", "PC and console tear-free play", "99% sRGB coverage"]),
    F("B0GKFLQ9SW", "Dell 24 SE2426HG 240Hz", "SE2426HG", { size: 23.8, res: H, hz: 240, panel: "Fast IPS", gamut: "99% sRGB" }, ["240Hz at a budget price tier", "99% sRGB coverage", "a 23.8-inch size for close desks"]),
    F("B0F1GFD44G", "Dell 27 S2725QC 4K USB-C", "S2725QC", { size: 27, res: K, hz: 120, panel: "IPS", resp: 4, gamut: "99% sRGB", sync: "FreeSync Premium", usbc: true }, ["USB-C with up to 65W power delivery", "4K at 120Hz", "1500:1 contrast"]),
    F("B0CP9MBSXW", "Alienware AW2525HM", "AW2525HM", { size: 24.5, res: H, hz: 320, panel: "IPS", resp: 0.5, gamut: "99% sRGB", sync: "G-SYNC Compatible" }, ["320Hz at 1080p", "a 0.5ms response time", "Alienware styling at a mid price tier"]),
    F("B0DZL719V1", "Alienware 34 Curved AW3425DWM", "AW3425DWM", { size: 34, res: UW, hz: 180, resp: 1, hdr: "DisplayHDR 400", gamut: "95% DCI-P3", sync: "FreeSync Premium" }, ["a 1500R ultrawide curve", "a dedicated console mode", "hardware low blue light"]),
    F("B0F6724X5N", "Alienware 34 QD-OLED AW3425DW", "AW3425DW", { size: 34.2, res: UW, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", gamut: "99% DCI-P3" }, ["an 1800R QD-OLED ultrawide", "1000 nits peak HDR brightness", "240Hz at 3440x1440"]),
    F("B0H8YZPY9D", "Alienware AW2725Q 4K QD-OLED", "AW2725Q", { size: 26.7, res: K, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", gamut: "99% DCI-P3", usbc: true, stand: "height, tilt, swivel and pivot" }, ["Dolby Vision support", "166 PPI at 4K", "USB-C with 15W power delivery"]),
    F("B0C1SDSYV6", "Alienware AW2725QF Dual-Resolution", "AW2725QF", { size: 27, res: K, hz: 180, panel: "IPS", resp: 0.5, hdr: "DisplayHDR 600", gamut: "95% DCI-P3" }, ["a dual mode with 1080p at 360Hz", "Dolby Vision support", "DisplayHDR 600"]),
    // Curved
    F("B0D2FZS3JM", "LG UltraGear 27GS60QC-B Curved", "27GS60QC", { size: 27, res: Q, hz: 180, resp: 1, hdr: "HDR10", gamut: "99% sRGB", sync: "FreeSync" }, ["a steep 1000R curve", "1440p at 180Hz", "a budget 1440p price tier"]),
    F("B0CZWRK33C", "ASUS ROG Strix XG27WCMS Curved", "XG27WCMS", { size: 27, res: Q, hz: 280, hdr: "HDR", gamut: "95% DCI-P3", sync: "G-SYNC Compatible", usbc: true, warranty: 3 }, ["a curved 1440p panel overclocked to 280Hz", "USB-C input", "a 3-year warranty"]),
    F("B0DZ4QJY65", "AOC C24G42E Curved", "C24G42E", { size: 24, res: H, hz: 180, panel: "VA", resp: 0.5, hdr: "HDR" }, ["a 1500R curve", "a three-sided frameless design", "a budget price tier"]),
    F("B0D685N3NV", "AOC C27G4ZH Curved", "C27G4ZH", { size: 27, res: H, hz: 280, panel: "VA", resp: 0.3, hdr: "HDR", stand: "height, tilt and swivel" }, ["280Hz on a 1500R curve", "a height-adjustable stand", "VESA mounting"]),
    F("B0CJVK87Y7", "Acer Nitro EDA270U Curved", "EDA270U", { size: 27, res: Q, hz: 180, hdr: "HDR" }, ["a 1500R curve", "two 2W speakers", "1440p at a budget price tier"]),
    F("B0GN5KBW87", "AOC CU34G4H Curved Ultrawide", "CU34G4H", { size: 34, res: UW, hz: 200, panel: "VA", resp: 0.3, hdr: "HDR", sync: "Adaptive-Sync", stand: "height, tilt and swivel" }, ["a 34-inch 1500R ultrawide", "200Hz at 3440x1440", "a height-adjustable stand"]),
    F("B0FJYNKQ5T", "Samsung Odyssey G7 (G75F) 37-inch", "Odyssey G7 37", { size: 37, res: K, hz: 165, resp: 1, hdr: "DisplayHDR 600" }, ["a 37-inch 1000R curve", "4K at 165Hz", "DisplayHDR 600"]),
    F("B0FJYNVR3R", "Samsung Odyssey G7 (G75F) 40-inch WUHD", "Odyssey G7 40", { size: 40, res: "5120x2160", hz: 180, resp: 1, hdr: "DisplayHDR 600" }, ["a 40-inch 21:9 1000R curve", "180Hz", "DisplayHDR 600"]),
    F("B0DSGJRKCR", "Samsung Odyssey OLED G9 (G91SD) 49-inch", "Odyssey OLED G9", { size: 49, res: "5120x1440", hz: 144, panel: "QD-OLED", resp: 0.03 }, ["a 49-inch Dual QHD panel", "110 pixels per inch", "a height-adjustable stand"]),
    F("B0BP94J8VD", "Alienware AW3423DWF QD-OLED", "AW3423DWF", { size: 34, res: UW, hz: 165, panel: "QD-OLED", resp: 0.1, gamut: "99.3% DCI-P3", stand: "height, tilt, swivel and slant" }, ["an 1800R QD-OLED curve", "switchable DCI-P3 and sRGB modes", "a height-adjustable stand"]),
    F("B07ZSGR4CH", "AOC AGON AG493UCX 49-inch", "AG493UCX", { size: 49, res: "5120x1440", hz: 120, panel: "VA", resp: 1, hdr: "DisplayHDR 400", sync: "Adaptive-Sync", usbc: true }, ["an 1800R 49-inch curve", "USB-C docking", "Dual QHD resolution"]),
    // Large and TV-style
    F("B0BW1VM62Y", "Samsung Odyssey Neo G7 43-inch Smart", "Odyssey Neo G7 43", { size: 43, res: K, hz: 144, resp: 1, hdr: "DisplayHDR 600" }, ["built-in Smart TV apps", "Quantum Mini LED backlighting", "an adjustable on-screen size from 43 down to 20 inches"]),
    F("B0BNM56PF5", "INNOCN 43-inch 4K 144Hz", "INNOCN 43", { size: 43, res: K, hz: 144, hdr: "HDR400", usbc: true, stand: "height adjustment" }, ["built-in stereo speakers", "a height-adjustable stand", "USB-C input"]),
    F("B09ZHQ93VJ", "Samsung M70B 43-inch Smart Monitor", "M70B 43", { size: 43, res: K, hz: 60, resp: 4, hdr: "HDR10", usbc: true }, ["built-in streaming TV apps", "wireless display from phones and laptops", "SmartThings IoT hub"]),
    F("B0GP9FFRMB", "Samsung 43-inch M70H Mini LED Smart TV", "Samsung M70H", { size: 43, res: K, hz: 120, hdr: "Mini LED HDR" }, ["Motion Xcelerator with DLG 120Hz", "a gaming hub for consoles and cloud services", "Samsung TV Plus channels"]),
    // OLED
    F("B0DF786923", "LG UltraGear 27GS93QE OLED", "27GS93QE", { size: 27, res: Q, hz: 240, panel: "OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", sync: "FreeSync Premium", warranty: 2 }, ["an anti-glare low-reflection OLED coating", "a 2-year OLED warranty", "an HDMI 2.1 input"]),
    F("B0CSGWXVBN", "LG UltraGear 27GS95QE OLED", "27GS95QE", { size: 27, res: Q, hz: 240, panel: "OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", sync: "FreeSync Premium", stand: "height, tilt and swivel" }, ["a 1,500,000:1 contrast ratio", "an HDMI 2.1 input", "a height, tilt and swivel stand"]),
    F("B0DWYC5S8X", "MSI MPG 272URX QD-OLED", "MPG 272URX", { size: 26.5, res: K, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", gamut: "99% DCI-P3" }, ["a 4K QD-OLED panel at 26.5 inches", "OLED Care 2.0 in MSI software", "an HDMI 2.1 input"]),
    F("B0CV1Y7NLT", "LG UltraGear 32GS95UE OLED", "32GS95UE", { size: 32, res: K, hz: 240, panel: "OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", sync: "FreeSync Premium Pro" }, ["a dual mode with 1080p at 480Hz", "an HDMI 2.1 input", "4K at 240Hz"]),
    F("B0DPXYZYPT", "MSI MPG 321URXW QD-OLED", "MPG 321URXW", { size: 31.5, res: K, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", gamut: "99% DCI-P3" }, ["up to 1000 nits peak brightness", "a white finish", "an HDMI 2.1 input"]),
    F("B0GWGSNVLT", "Samsung Odyssey OLED G8 (G80SH) 32-inch", "Odyssey OLED G8 G80SH", { size: 32, res: K, hz: 240, panel: "QD-OLED", hdr: "DisplayHDR True Black 500", usbc: true, warranty: 3, stand: "height, pivot, tilt and swivel" }, ["DisplayHDR True Black 500", "USB-C with up to 98W", "OLED Safeguard+ burn-in protection"]),
    // Budget
    F("B097FZG8QQ", "Sceptre 24-inch IPS 180Hz", "Sceptre 24 IPS", { size: 24, res: H, hz: 180, panel: "IPS", resp: 1, gamut: "100% sRGB" }, ["two DisplayPort and two HDMI inputs", "built-in speakers", "a low budget price tier"]),
    F("B0GX78512M", "LG UltraGear 27G414B-B", "27G414B", { size: 27, res: H, hz: 144, panel: "IPS", resp: 1, hdr: "HDR10", gamut: "99% sRGB", sync: "G-SYNC Compatible" }, ["built-in stereo speakers", "a 27-inch IPS panel", "LG Switch app window layouts"]),
    F("B0FG5XLWNV", "MSI PRO MP243L E14", "MP243L", { size: 23.8, res: H, hz: 144, panel: "IPS", sync: "FreeSync" }, ["flicker-free and low blue light modes", "1500:1 contrast", "the lowest price tier among these gaming picks"]),
    F("B0GVVP5K63", "LG UltraGear 27G61ZB-B", "27G61ZB", { size: 27, res: Q, hz: 200, panel: "IPS", resp: 1, hdr: "HDR10", gamut: "99% sRGB", stand: "height, tilt, swivel and pivot" }, ["a height, tilt, swivel and pivot stand", "1440p at 200Hz", "narrow bezels"]),
    F("B09V6PHDG4", "AOC AGON PRO AG275QXL", "AG275QXL", { size: 27, res: Q, hz: 170, panel: "IPS", resp: 1, sync: "G-SYNC Compatible", stand: "height adjustment" }, ["a listing that names PS5, Xbox and Switch", "a height-adjustable stand", "a 1440p IPS panel for MOBA and console play"]),
    F("B0DCNLNBTV", "CUNPU 27-inch 4K 160Hz", "CUNPU 4K", { size: 27, res: K, hz: 160, panel: "Fast IPS", resp: 1, hdr: "HDR400", gamut: "99% DCI-P3", sync: "G-SYNC Compatible, FreeSync" }, ["48Gbps HDMI 2.1 for consoles", "a factory calibration of Delta E under 2", "4K at a budget price tier"]),
    F("B0DT11T36K", "CRUA 32-inch 4K 160Hz Curved", "CRUA 32 4K", { size: 32, res: K, hz: 160, gamut: "120% sRGB", sync: "FreeSync" }, ["a 1500R curve", "built-in speakers", "an HDMI 2.1 input"]),
    // Portable
    F("B0966YYP65", "ASUS ZenScreen MB166C 15.6-inch Portable", "ZenScreen 15.6", { size: 15.6, res: H, panel: "IPS", usbc: true }, ["a kickstand for portrait or landscape", "USB-C or USB-A connection", "an anti-glare surface"]),
    F("B0CH9WTW56", "ARZOPA Z1FC 16.1-inch 144Hz Portable", "ARZOPA Z1FC", { size: 16.1, res: H, hz: 144, panel: "IPS", gamut: "106% sRGB", usbc: true }, ["a built-in kickstand", "portrait and landscape modes", "144Hz for a portable screen"]),
    F("B0FDL2VR2C", "ARZOPA Z3FC 16.1-inch 2.5K 180Hz Portable", "ARZOPA Z3FC", { size: 16.1, res: Q, hz: 180, gamut: "107% sRGB", usbc: true }, ["400 nits brightness", "two USB-C ports and mini HDMI", "a listing that names PS5, Xbox and Steam Deck"]),
    F("B0GHP4MKMP", "VisionOwl 16-inch 2.5K 144Hz Portable", "VisionOwl 16", { size: 16, res: "2560x1600", hz: 144, panel: "IPS", gamut: "110% sRGB", usbc: true }, ["470 nits brightness", "a full-size HDMI port", "a 16:10 aspect ratio"]),
    F("B07ZLY26FW", "cocopar 15.6-inch Portable", "cocopar 15.6", { size: 15.6, res: H, hz: 60, panel: "IPS", usbc: true }, ["VESA mounting holes", "built-in speakers", "single-cable USB-C power and video"]),
    F("B088D8JG3L", "KYY 15.6-inch Portable", "KYY 15.6", { size: 15.6, res: H, panel: "IPS", usbc: true }, ["a PU leather smart cover that doubles as a stand", "two built-in speakers", "mini HDMI and two USB-C ports"]),
    F("B09FL2XL2Y", "TECLAST 16-inch 144Hz Portable", "TECLAST 16", { size: 16, res: "1920x1200", hz: 144, panel: "IPS", gamut: "100% sRGB", sync: "FreeSync", usbc: true }, ["144Hz with FreeSync", "USB-C single-cable video and power", "a 16:10 panel"]),
    // Pivot
    F("B0CMXK5QDD", "CRUA 24.5-inch 200Hz Vertical Monitor", "CRUA 24.5 Pivot", { size: 24.5, res: H, hz: 200, resp: 3, gamut: "120% sRGB", sync: "FreeSync", stand: "height, pivot, swivel and tilt" }, ["a 90-degree pivot for portrait mode", "120mm of height adjustment", "200Hz over DisplayPort"]),
    F("B0GJ7329CK", "HP Series 5 Pro 524pf", "HP 524pf", { size: 24, res: H, panel: "IPS", gamut: "100% sRGB", stand: "height, swivel and pivot" }, ["a height, swivel and pivot stand", "four USB ports", "350 nits brightness"]),
  ]),
};
