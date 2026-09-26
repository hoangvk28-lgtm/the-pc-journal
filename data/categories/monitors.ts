import pool from "@/data/pcj-pool/monitors.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const RES: Record<string, string> = { "1920x1080": "1080p", "2560x1440": "1440p", "3840x2160": "4K" };

export const monitorSchema: CategorySchema = {
  id: "monitor",
  plural: "Monitors",
  fields: [
    { key: "hz", label: "Refresh rate", noun: "refresh rate", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v}Hz`, rule: { label: "Fastest Refresh", bestFor: ["Competitive shooters where motion clarity matters most.", "Esports players with a GPU that can feed high frame rates."] }, strength: (v) => (Number(v) >= 240 ? `a ${v}Hz refresh rate for fast motion` : Number(v) >= 144 ? `${v}Hz for smoother motion than a 60Hz office screen` : undefined), weakness: (v) => (Number(v) <= 100 ? `a ${v}Hz refresh rate that suits work more than fast games` : undefined) },
    { key: "res", label: "Resolution", fmt: (v) => `${v} (${RES[String(v)] ?? ""})`.replace(" ()", ""), strength: (v) => (v === "3840x2160" ? "4K resolution for sharp text and detail" : v === "2560x1440" ? "1440p resolution, sharper than 1080p at 27 inches" : undefined) },
    { key: "size", label: "Size", noun: "screen size", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v} inches` },
    { key: "panel", label: "Panel", fmt: (v) => String(v), strength: (v) => (/OLED/.test(String(v)) ? `a ${v} panel with per-pixel contrast` : /IPS/.test(String(v)) ? `an ${v} panel with wide viewing angles` : undefined), weakness: (v) => (/OLED/.test(String(v)) ? "OLED burn-in risk with static desktop elements" : v === "VA" ? "a VA panel that can smear dark transitions" : v === "TN" ? "a TN panel with narrower viewing angles" : undefined) },
    { key: "resp", label: "Listed response", fmt: (v) => `${v}ms` },
    { key: "hdr", label: "HDR", fmt: (v) => String(v), strength: (v) => (/600|True Black/.test(String(v)) ? `${v} certification` : undefined), weakness: (v) => (v === "HDR10" ? "HDR10 support without a DisplayHDR certification" : undefined) },
    { key: "gamut", label: "Color gamut", fmt: (v) => String(v), strength: (v) => `${v} colour coverage, as listed` },
    { key: "sync", label: "Adaptive sync", fmt: (v) => String(v), strength: (v) => `${v} to reduce screen tearing` },
    { key: "stand", label: "Stand", fmt: (v) => String(v), strength: (v) => (/height/.test(String(v)) ? `a stand with ${v}` : undefined) },
    { key: "usbc", label: "USB-C", fmt: (v) => (v ? "Yes" : "Not listed"), strength: (v) => (v ? "a USB-C input for laptops" : undefined) },
    { key: "warranty", label: "Warranty", fmt: (v) => `${v}-year`, strength: (v) => (Number(v) >= 3 ? `a ${v}-year warranty` : undefined) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const hz = Number(f.specs.hz ?? 0);
    const res = String(f.specs.res ?? "");
    if (res === "3840x2160" && hz >= 144) s.push(`Reaching ${hz}Hz at 4K needs DisplayPort 1.4 with DSC or HDMI 2.1 on your graphics card, and a GPU able to render well above 100fps at 4K.`);
    else if (res === "2560x1440" && hz >= 240) s.push(`To see ${hz}Hz at 1440p, connect over DisplayPort or HDMI 2.1; older HDMI 2.0 ports cap the refresh rate lower.`);
    else if (res === "1920x1080" && hz >= 144) s.push(`At 1080p, ${hz}Hz is within reach of mid-range graphics cards in esports titles; use DisplayPort if your card's HDMI port is older.`);
    else if (res === "3840x2160") s.push("At 4K, check that your graphics card and cable support 4K at the refresh rate you want before you buy.");
    if (/OLED/.test(String(f.specs.panel))) s.push("Leave the maker's pixel-refresh routines enabled and hide static taskbars to limit burn-in risk.");
    if (f.specs.sync && /G-?SYNC/i.test(String(f.specs.sync))) s.push("G-SYNC Compatible works on NVIDIA cards over DisplayPort, and FreeSync covers AMD cards.");
    return s;
  },
  criteria: [
    { id: "res", title: "Match resolution to your graphics card", body: "1080p suits entry and mid-range cards and high refresh rates. 1440p is the balance for most gaming PCs. 4K needs a high-end card to hold high frame rates.\n\nPick the resolution your card can drive before looking at refresh rate." },
    { id: "hz", title: "Choose a refresh rate you can reach", body: "A higher refresh rate only helps when your PC delivers matching frame rates. 144Hz to 180Hz suits most players; 240Hz and above rewards competitive shooters." },
    { id: "panel", title: "Pick the panel type", body: "IPS offers wide viewing angles and good colour. VA has higher contrast but slower dark transitions. OLED has perfect blacks and very fast response but carries a burn-in risk with static content." },
    { id: "ports", title: "Check ports and cables", body: "High refresh rates at 1440p and 4K need DisplayPort 1.4 or HDMI 2.1. Consoles need HDMI 2.1 for 4K at 120Hz." },
    { id: "hdr", title: "Read HDR labels carefully", body: "HDR10 means the monitor accepts an HDR signal, not that it displays it well. DisplayHDR 600 or True Black 400 certifications say more about real HDR performance." },
    { id: "stand", title: "Consider the stand", body: "A stand with height, tilt and swivel adjustment saves buying a monitor arm. Check VESA mounting if you plan to use one anyway." },
    { id: "size", title: "Size for your desk distance", body: "24 to 25 inches suits 1080p and competitive play at a typical desk. 27 inches pairs well with 1440p and 4K; 32 inches suits 4K at a deeper desk." },
  ],
  faq: [
    { id: "hz-fps", q: "Do I need a GPU that matches the refresh rate?", a: "To benefit fully, yes. A 240Hz monitor still feels smoother at 150fps than a 144Hz one, but the gains shrink when frame rates are far below the refresh rate." },
    { id: "oled-burn", q: "Is OLED burn-in still a problem?", a: "It is a risk with static elements over many hours. Current OLED monitors use pixel-refresh routines to reduce it; check the maker's warranty for burn-in coverage." },
    { id: "gsync", q: "Does a FreeSync monitor work with an NVIDIA card?", a: "Most do as G-SYNC Compatible over DisplayPort. Check the listing or NVIDIA's compatibility list for the model." },
    { id: "hdmi-dp", q: "Should I use HDMI or DisplayPort?", a: "On a PC, DisplayPort usually supports the highest refresh rates. HDMI 2.1 is equivalent and needed for consoles." },
    { id: "1ms", q: "Does a 1ms response time rating matter?", a: "Makers measure response time differently, so compare panel type and independent reviews rather than the headline figure." },
    { id: "size-res", q: "Is 1080p fine on a 27-inch monitor?", a: "It works, but text and detail look softer. 1440p is sharper at 27 inches; 1080p is best at 24 to 25 inches." },
    { id: "hdr-worth", q: "Is HDR worth it on a budget monitor?", a: "Rarely. Budget HDR10 monitors accept HDR but lack the brightness and contrast to show it well. OLED or DisplayHDR 600 models do it better." },
  ],
  evaluated: [
    { title: "Resolution and refresh", description: "We compared listed resolution and refresh rate against the graphics power each needs." },
    { title: "Panel", description: "We noted panel type and the trade-offs it brings for motion, contrast and burn-in." },
    { title: "HDR and colour", description: "We recorded DisplayHDR certifications and listed colour gamut." },
    { title: "Connectivity and stand", description: "We checked ports, USB-C and stand adjustment where the listing states them." },
  ],
};

const Q = "2560x1440", K = "3840x2160", H = "1920x1080";
export const monitorFacts = withPool(pool as Pool, [
  // Gaming monitors (general)
  F("B0CZSGWLD5", "Alienware AW2725DF", "AW2725DF", { size: 26.7, res: Q, hz: 360, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", gamut: "99% DCI-P3", sync: "FreeSync Premium Pro", stand: "swivel and pivot" }, ["a 360Hz QD-OLED panel at 1440p"]),
  F("B0DQQCK3VS", "Samsung Odyssey G7 (G70D) 27-inch 4K", "Odyssey G7 27", { size: 27, res: K, hz: 144, panel: "IPS", resp: 1, hdr: "DisplayHDR 400", sync: "G-SYNC Compatible, FreeSync Premium", stand: "swivel" }, ["Samsung's smart-monitor features listed alongside gaming modes"]),
  F("B0FNQ4B2Z2", "LG UltraGear 27GX704A-B", "27GX704A", { size: 27, res: Q, hz: 240, panel: "OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", sync: "G-SYNC Compatible, FreeSync Premium Pro", stand: "swivel and pivot" }, ["HDMI 2.1 and DisplayPort 1.4 inputs", "a 240Hz OLED panel at a mid-range price at the time of writing"]),
  F("B0BQPZYKH1", "ASUS ROG Strix XG27AQMR", "XG27AQMR", { size: 27, res: Q, hz: 300, panel: "Fast IPS", resp: 1, hdr: "DisplayHDR 600", sync: "G-SYNC Compatible, FreeSync Premium Pro" }, ["DCI-P3 wide colour coverage"]),
  F("B0CZWJG5GZ", "ASUS ROG Strix XG27UCG", "XG27UCG", { size: 27, res: K, hz: 160, panel: "IPS", resp: 1, gamut: "95% DCI-P3", sync: "G-SYNC Compatible", usbc: true, warranty: 3 }, ["a dual mode that switches to 1080p at 320Hz"]),
  F("B0F7R8NMFM", "KTC H27T22C-3", "H27T22C", { size: 27, res: Q, hz: 220, panel: "IPS", resp: 1, hdr: "HDR 400", gamut: "131% sRGB", sync: "FreeSync, G-SYNC" }, ["built-in speakers", "DisplayPort 1.4 and HDMI 2.0 inputs"]),
  // Under $200
  F("B0FF5HXGJK", "AOC Q27G41ZE", "Q27G41ZE", { size: 27, res: Q, hz: 240, panel: "IPS", resp: 0.3, sync: "G-SYNC Compatible" }, ["an overclocked 260Hz mode above its 240Hz native rate", "DisplayPort 1.4 and HDMI 2.0 inputs"]),
  F("B0BZR9TMBJ", "ASUS TUF Gaming VG27AQ3A", "VG27AQ3A", { size: 27, res: Q, hz: 180, panel: "Fast IPS", resp: 1, gamut: "130% sRGB", sync: "FreeSync Premium, G-SYNC Compatible" }, ["built-in speakers"]),
  F("B0DGMQ2M1G", "Dell G2725D", "G2725D", { size: 27, res: Q, hz: 180, gamut: "99% sRGB", sync: "FreeSync" }, ["1440p at 180Hz at one of the lowest prices here at the time of writing"]),
  F("B0H4WTGTXH", "MSI MAG 274QF E20", "MAG 274QF", { size: 27, res: Q, hz: 200, panel: "Rapid IPS", resp: 0.5, sync: "FreeSync Premium, G-SYNC Compatible" }, ["a 200Hz refresh rate at 1440p"]),
  F("B0HFHZCZW8", "Alienware AW2726DL", "AW2726DL", { size: 27, res: Q, hz: 280, panel: "IPS", resp: 1 }, ["a 280Hz 1440p IPS panel"]),
  F("B0F72R4KLC", "ASUS TUF Gaming VG259QMR5A", "VG259QMR5A", { size: 24.5, res: H, hz: 310, panel: "Fast IPS", resp: 0.3, gamut: "99% sRGB", sync: "FreeSync Premium, G-SYNC Compatible", warranty: 3 }, ["a 310Hz refresh rate for esports"]),
  // Cheap 144Hz+
  F("B0FY4LVHYH", "AOC 25G51Z", "25G51Z", { size: 25, res: H, hz: 260, panel: "IPS", resp: 0.5, sync: "G-SYNC Compatible" }, ["an overclocked 260Hz refresh rate"]),
  F("B0DT1HS4N9", "Acer Nitro KG241Y X1", "KG241Y X1", { size: 23.8, res: H, hz: 200, panel: "IPS", resp: 0.5, sync: "FreeSync Premium" }, ["a 200Hz refresh rate under $100 at the time of writing"]),
  F("B0FF5ZQWV6", "AOC 24G42HE", "24G42HE", { size: 24, res: H, hz: 200, panel: "IPS", resp: 0.3, gamut: "116% sRGB", sync: "G-SYNC Compatible" }, ["a 200Hz IPS panel"]),
  F("B0GXCH5GTL", "LG UltraGear 24G414B-B", "24G414B", { size: 24, res: H, hz: 144, panel: "IPS", resp: 1, hdr: "HDR10", gamut: "99% sRGB", sync: "G-SYNC Compatible, FreeSync" }, ["99% sRGB colour coverage"]),
  F("B0GLQXKKVY", "Dell SE2426H", "SE2426H", { size: 23.8, res: H, hz: 144, panel: "IPS", resp: 1, sync: "FreeSync" }, ["a 144Hz IPS panel at the lowest price in this list at the time of writing"]),
  F("B0GTZTV7TP", "GIGABYTE G25F2A", "G25F2A", { size: 24.5, res: H, hz: 240, panel: "SuperSpeed IPS", resp: 1, hdr: "HDR10", gamut: "120% sRGB", sync: "FreeSync Premium" }, ["a 240Hz refresh rate under $100 at the time of writing"]),
  // 1080p under $100
  F("B0H85B13JT", "AOC G24B36N", "G24B36N", { size: 23.8, res: H, hz: 180, panel: "VA", resp: 0.5 }, ["HDMI 2.1 and DisplayPort 1.4 inputs", "an overclocked 180Hz mode above 144Hz native"]),
  F("B0CMW2FYZ2", "ASUS VA24EHF", "VA24EHF", { size: 23.8, res: H, hz: 100, panel: "IPS", resp: 1 }, ["a frameless design suited to dual-monitor setups"]),
  F("B0FJS6GGCT", "Acer SB242Y H1bi", "SB242Y", { size: 23.8, res: H, hz: 100, resp: 4 }, ["the lowest price here at the time of writing"]),
  F("B0FHKDC59F", "LG 24U411A-B", "24U411A", { size: 24, res: H, hz: 120, panel: "IPS", resp: 1, hdr: "HDR10", gamut: "99% sRGB" }, ["a Reader Mode for long reading sessions"]),
  F("B0FSB6WX8J", "Acer Nitro KG251Q X3", "KG251Q X3", { size: 24.5, res: H, hz: 200, resp: 0.5, sync: "FreeSync Premium" }, ["a 200Hz refresh rate under $90 at the time of writing"]),
  F("B0F5RHB9MZ", "AOC 24B35H3", "24B35H3", { size: 24, res: H, hz: 120, panel: "IPS", gamut: "100% sRGB" }, ["100% sRGB colour coverage"]),
  // Cheap 4K
  F("B0F1GF1KFC", "Dell S2725QS", "S2725QS", { size: 27, res: K, hz: 120, panel: "IPS", gamut: "99% sRGB", sync: "FreeSync Premium" }, ["a 120Hz refresh rate at 4K"]),
  F("B0DSR9VPGX", "LG UltraFine 27US500-W", "27US500", { size: 27, res: K, panel: "IPS", hdr: "HDR10", gamut: "90% DCI-P3" }, ["a white borderless design", "a Reader Mode"]),
  F("B0H85RW8H8", "Samsung ViewFinity S7 (S71H) 27-inch", "ViewFinity S7 27", { size: 27, res: K, panel: "IPS", hdr: "HDR10" }, ["4K on a 27-inch IPS panel"]),
  F("B0F1GD9YFN", "Dell S3225QS", "S3225QS", { size: 32, res: K, hz: 120, panel: "VA", gamut: "95% DCI-P3", sync: "FreeSync Premium" }, ["a 32-inch 4K screen at 120Hz"]),
  F("B0H85TLJML", "Samsung ViewFinity S7 (S71H) 32-inch", "ViewFinity S7 32", { size: 32, res: K, panel: "IPS", hdr: "HDR10" }, ["a 32-inch 4K IPS panel"]),
  F("B0GZ61BN6Z", "Samsung ViewFinity S7 (S70H) 27-inch", "ViewFinity S70H", { size: 27, res: K, hdr: "HDR10" }, ["a built-in KVM switch for two computers"]),
  // 4K 144Hz+
  F("B0CZMCR9XD", "MSI MAG 274UPF E2", "MAG 274UPF", { size: 27, res: K, hz: 160, panel: "Rapid IPS", hdr: "HDR 400", sync: "FreeSync, G-SYNC Compatible", stand: "height, swivel and pivot adjustment" }, ["a 160Hz refresh rate at 4K"]),
  F("B0FR671G1H", "GIGABYTE M27UP", "M27UP", { size: 27, res: K, hz: 160, panel: "SuperSpeed IPS", resp: 1, hdr: "DisplayHDR 400", gamut: "125% sRGB" }, ["a dual mode that switches to 1080p at 320Hz"]),
  F("B0GR79KXGX", "ASUS ROG Strix XG27UCSR", "XG27UCSR", { size: 27, res: K, hz: 160, panel: "IPS", resp: 0.3, gamut: "95% DCI-P3", usbc: true, warranty: 3 }, ["a dual mode that switches to 1080p at 324Hz"]),
  F("B0FLL3L9JG", "LG UltraGear 27G810A-B", "27G810A", { size: 27, res: K, hz: 180, panel: "IPS", resp: 1, hdr: "DisplayHDR 400", gamut: "95% DCI-P3", sync: "G-SYNC Compatible, FreeSync Premium", stand: "swivel and pivot" }, ["a dual mode that switches to 1080p at 360Hz", "HDMI 2.1 inputs"]),
  F("B0FDL8QKDW", "GIGABYTE MO27U2", "MO27U2", { size: 27, res: K, hz: 240, panel: "QD-OLED", resp: 0.03, gamut: "99% DCI-P3", sync: "FreeSync Premium Pro" }, ["a 240Hz QD-OLED panel at 4K"]),
  // 360Hz+
  F("B0D1DPFZLZ", "Samsung Odyssey OLED G6 (G60SD)", "Odyssey OLED G6", { size: 27, res: Q, hz: 360, panel: "QD-OLED", resp: 0.03, sync: "FreeSync Premium Pro" }, ["HDMI 2.1 inputs"]),
  F("B0D7NSZRJW", "ASUS ROG Strix XG27ACDNG", "XG27ACDNG", { size: 26.5, res: Q, hz: 360, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400", gamut: "99% DCI-P3", sync: "G-SYNC Compatible", warranty: 3 }, ["a 3-year warranty on an OLED panel"]),
  F("B0CTS1RQ6Y", "MSI MPG 271QRX QD-OLED", "MPG 271QRX", { size: 27, res: Q, hz: 360, panel: "QD-OLED", resp: 0.03, hdr: "DisplayHDR True Black 400" }, ["a built-in KVM switch", "HDMI 2.1 inputs"]),
  F("B0GV5JZG1Q", "BenQ ZOWIE XQ2566X", "XQ2566X", { size: 24.1, res: Q, hz: 360, panel: "Fast TN" }, ["DyAc 3 motion blur reduction for esports"]),
  F("B0D7NXSQ44", "ASUS ROG Swift PG27AQDP", "PG27AQDP", { size: 26.5, res: Q, hz: 480, panel: "WOLED", resp: 0.03, hdr: "DisplayHDR True Black 400", gamut: "99% DCI-P3", sync: "G-SYNC Compatible", warranty: 3 }, ["a 480Hz refresh rate at 1440p"]),
  // 1440p 240Hz
  F("B0D68C1BVS", "MSI MAG 271QPX QD-OLED E2", "MAG 271QPX", { size: 27, res: Q, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "HDR 400", stand: "height adjustment" }, ["a 240Hz QD-OLED panel with a height-adjustable stand"]),
  F("B0H4LST97W", "KTC H27E6S", "H27E6S", { size: 27, res: Q, hz: 240, panel: "Fast IPS", resp: 1, hdr: "HDR400", gamut: "123% sRGB", stand: "swivel and pivot" }, ["an overclocked 275Hz mode", "built-in speakers"]),
  F("B0BCXJ7XXM", "Alienware AW2723DF", "AW2723DF", { size: 27, res: Q, hz: 240, panel: "IPS", resp: 1, hdr: "DisplayHDR 600", gamut: "95% DCI-P3", sync: "G-SYNC Compatible", stand: "height, swivel and pivot adjustment" }, ["an overclocked 280Hz mode"]),
  F("B0GV155YQM", "GIGABYTE GO27Q24G", "GO27Q24G", { size: 27, res: Q, hz: 240, panel: "W-OLED", resp: 0.03 }, ["a 240Hz OLED panel at an entry-level OLED price at the time of writing"]),
  F("B0D682HF6R", "AOC AGON PRO AG276QZD2", "AG276QZD2", { size: 26.5, res: Q, hz: 240, panel: "QD-OLED", resp: 0.03, hdr: "HDR10" }, ["a QD-OLED panel in AOC's AGON PRO line"]),
]);
