import pool from "@/data/pcj-pool/monitors.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { monitorFacts } from "./monitors";
import { withPool } from "./helpers";

/**
 * Batch 12 monitor fact sheets: 32-inch gaming, 4K OLED, 165Hz and ASUS ProArt listings.
 * Reviewed by hand from the Amazon listing bullets; unclear fields are left undefined.
 * Dropped: ProArt PA279CV (listing bullets describe a 23.8-inch 1080p panel, contradicting the
 * title), Sceptre E248B (listing states both 165Hz and 180Hz), MSI MAG 321UPD E14 (native 4K
 * refresh rate not stated).
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const Q = "2560x1440", K = "3840x2160", H = "1920x1080";

export const monitorExtFacts: Record<string, Fact> = {
  ...monitorFacts,
  ...withPool(pool as Pool, [
    // 32-inch and 4K OLED
    F("B0DY2YQ439", "Samsung Odyssey OLED G8 G81SF 32-inch", "Odyssey G8 G81SF", { size: 32, res: K, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", sync: "G-SYNC Compatible, FreeSync Premium Pro" }, ["a Glare Free coating Samsung lists as 54% less glossy than standard anti-reflection film", "logo and taskbar detection to dim static elements"]),
    F("B0CV26XVMD", "ASUS ROG Swift PG32UCDM", "PG32UCDM", { size: 32, res: K, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", gamut: "99% DCI-P3", sync: "G-SYNC Compatible", usbc: true, warranty: 3 }, ["a 3-year warranty that lists burn-in coverage", "90W USB-C power delivery"]),
    F("B0CTSC3VS4", "MSI MPG 321URX QD-OLED", "MPG 321URX", { size: 31.5, res: K, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", usbc: true }, ["a built-in KVM with picture-in-picture", "HDMI 2.1 and DisplayPort 1.4a inputs"]),
    F("B0FLQLPNNH", "LG UltraGear 32GX850A-B", "32GX850A", { size: 32, res: K, hz: 165, panel: "OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", sync: "G-SYNC, FreeSync Premium Pro" }, ["a dual mode that switches to 1080p at 330Hz", "a glossy screen finish"]),
    F("B0D9HY3JH2", "MSI MAG 321UP QD-OLED", "MAG 321UP", { size: 32, res: K, hz: 165, panel: "QD-OLED", resp: 0.03, sync: "FreeSync Premium Pro" }, ["an HDMI 2.1 input with full 48Gbps bandwidth for 4K at 165Hz", "a console mode"]),
    F("B0D2FSYS5J", "LG UltraGear 32GS60QC-B", "32GS60QC", { size: 32, res: Q, hz: 180, resp: 1, hdr: "HDR10", gamut: "99% sRGB", sync: "FreeSync" }, ["a 1000R curved screen", "two HDMI inputs and one DisplayPort"]),
    F("B09ZH1Q6TT", "Samsung Odyssey Neo G7 32-inch", "Odyssey Neo G7", { size: 32, res: K, hz: 165, resp: 1, sync: "G-SYNC Compatible, FreeSync Premium Pro" }, ["a Mini LED backlight Samsung calls Quantum Matrix", "a 1000R curved screen", "Samsung's own Quantum HDR2000 rating rather than a VESA DisplayHDR tier"]),
    // 165Hz
    F("B0GVPJ1DHG", "LG UltraGear evo 27GM950B-B", "27GM950B", { size: 27, res: "5120x2880", hz: 165, panel: "IPS", hdr: "DisplayHDR 1000", gamut: "99% DCI-P3" }, ["a Mini LED backlight with 9,216 LEDs", "5K resolution for very sharp text at 27 inches"]),
    F("B0CP7TNX8C", "Amazon Basics 24-inch 165Hz Gaming Monitor", "Amazon Basics 24", { size: 23.8, res: H, hz: 165, panel: "IPS", resp: 1 }, ["adaptive sync support", "VESA mounting"]),
    F("B0DFJXNTG8", "Westinghouse 24-inch Curved 165Hz Gaming Monitor", "Westinghouse 24 Curved", { size: 24, res: H, hz: 165, panel: "VA", resp: 1, gamut: "110% sRGB", sync: "FreeSync" }, ["a 3000:1 contrast ratio from its VA panel", "a 1500R curved screen", "built-in speakers"]),
    // ASUS ProArt
    F("B088BC5HKF", "ASUS ProArt PA248QV", "PA248QV", { size: 24, res: "1920x1200", panel: "IPS", gamut: "100% sRGB / Rec. 709", warranty: 3 }, ["Calman Verified with Delta E below 2", "a 16:10 aspect ratio with extra vertical space", "two more warranty years with online registration"]),
    F("B088BC5HMM", "ASUS ProArt PA278QV", "PA278QV", { size: 27, res: Q, panel: "IPS", gamut: "100% sRGB / Rec. 709", warranty: 3 }, ["Calman Verified with Delta E below 2", "DisplayPort, HDMI, DVI-D and Mini DP inputs plus a USB hub", "two more warranty years with online registration"]),
    F("B08LCPY1TR", "ASUS ProArt PA278CV", "PA278CV", { size: 27, res: Q, panel: "IPS", gamut: "100% sRGB / Rec. 709", usbc: true, stand: "tilt, swivel, pivot and height adjustment", warranty: 3 }, ["65W USB-C power delivery", "DisplayPort daisy-chaining", "Calman Verified with Delta E below 2"]),
    F("B0B8YSL9RD", "ASUS ProArt PA329CRV", "PA329CRV", { size: 31.5, res: K, panel: "IPS", hdr: "DisplayHDR 400", gamut: "98% DCI-P3", usbc: true, warranty: 3 }, ["96W USB-C power delivery", "Calman Verified with Delta E below 2", "DisplayPort MST output for a second screen"]),
    F("B0H3Y8VM5Q", "ASUS ProArt PA279CDV", "PA279CDV", { size: 26.5, res: K, hz: 120, panel: "QD-OLED", resp: 0.1, hdr: "DisplayHDR True Black 400", gamut: "99% DCI-P3", usbc: true, stand: "tilt, swivel, pivot and height adjustment", warranty: 3 }, ["Calman Verified with Delta E below 1.5", "96W USB-C power delivery", "a built-in KVM for two computers"]),
  ]),
};
