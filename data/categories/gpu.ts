import pool from "@/data/pcj-pool/gpu.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { str, withPool } from "./helpers";

const cap1 = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

/** RTX 5070 Ti partner cards: same GPU and 16GB GDDR7, so size, cooling and power guidance separate them. */
export const gpuSchema: CategorySchema = {
  id: "rtx-5070-ti",
  plural: "Cards",
  fields: [
    { key: "length", label: "Length", noun: "length", better: "lower", superlative: ["shortest", "longest"], fmt: (v) => `${v}mm`, strength: (v) => (Number(v) <= 310 ? `Compact ${v}mm length` : undefined), weakness: (v) => (Number(v) >= 330 ? `Long ${v}mm card needs a roomy case` : undefined),
      rule: { label: "Shortest Listed Card", bestFor: ["Cases with tight GPU clearance.", "Small form factor builds."] } },
    { key: "slots", label: "Slot width", noun: "cooler", better: "lower", superlative: ["slimmest", "thickest"], fmt: (v) => `${v}-slot`, strength: (v) => (Number(v) <= 2 ? "Dual-slot design" : undefined), weakness: (v) => (Number(v) >= 2.5 ? `${v}-slot cooler blocks the slot below` : undefined),
      rule: { label: "Slimmest Card", bestFor: ["Builds that need the slot below the card.", "Compact cases with limited width."] } },
    { key: "fans", label: "Fans", fmt: (v) => String(v), strength: (v) => cap1(String(v)) },
    { key: "psu", label: "Recommended PSU", fmt: (v) => `${v}W or more`, strength: (v) => (Number(v) <= 650 ? `Modest ${v}W PSU recommendation` : undefined), weakness: (v) => (Number(v) >= 750 ? `Needs a ${v}W or larger PSU` : undefined) },
    { key: "sff", label: "SFF-Ready", fmt: (v) => (v ? "Yes" : "No"), strength: (v) => (v ? "NVIDIA SFF-Ready label" : undefined) },
    { key: "outputs", label: "Outputs", fmt: (v) => String(v), strength: (v) => (/2.1/.test(String(v)) ? "DisplayPort 2.1b outputs" : undefined) },
  ],
  compat: (f) => {
    const s = ["Like every RTX 5070 Ti, it takes power through a 16-pin 12V-2x6 connector; use a native cable from an ATX 3.1 power supply or the adapter in the box, and seat it fully."];
    if (f.specs.length !== undefined) s.push(`Compare its ${f.specs.length}mm length with your case's GPU clearance, allowing for front fans or a radiator.`);
    else s.push("The maker doesn't state a length here, so check the exact dimensions on the maker's spec page against your case.");
    if (f.specs.sff) s.push("The SFF-Ready label means it meets NVIDIA's size guidance for small cases, but still check the exact dimensions.");
    if (f.specs.psu !== undefined) s.push(`The maker recommends at least a ${f.specs.psu}W power supply.`);
    return s;
  },
  criteria: [
    { id: "same-gpu", title: "Every card uses the same GPU", body: "All RTX 5070 Ti cards share the same chip and 16GB of GDDR7 memory. Factory overclocks change performance by a few percent at most.\n\nChoose on size, cooling, noise and price rather than small clock differences." },
    { id: "clearance", title: "Measure case clearance", body: "Card lengths vary by several centimetres between models. Check the case's maximum GPU length, and remember front fans or radiators reduce it.\n\nSlot width matters too if you use the slot below." },
    { id: "power", title: "Plan the power connector", body: "The RTX 5070 Ti uses a 16-pin 12V-2x6 connector. A native cable from an ATX 3.1 power supply is the tidiest option; otherwise use the included adapter.\n\nSeat the plug fully and avoid sharp bends near the connector." },
    { id: "psu-size", title: "Follow the maker's PSU guidance", body: "Partner cards list a recommended power supply, typically 650W to 750W for this GPU. Use your exact card's figure." },
    { id: "cooling", title: "Bigger coolers run quieter", body: "Triple-fan, thicker coolers usually run cooler and quieter than slim dual-fan designs, at the cost of size." },
    { id: "sag", title: "Support heavy cards", body: "Long, heavy cards can sag and stress the slot. Some include a support bracket; otherwise buy one." },
  ],
  faq: [
    { id: "psu", q: "What power supply does an RTX 5070 Ti need?", a: "Check your exact card's recommendation; partner cards typically list 650W to 750W. A native 12V-2x6 cable is ideal." },
    { id: "oc", q: "Are factory-overclocked cards worth more?", a: "The difference is usually small. Cooling, noise and size matter more than a modest clock bump." },
    { id: "sff", q: "What does SFF-Ready mean?", a: "It is NVIDIA's label for cards within its size guidance for small form factor cases. Still check your case's exact clearance." },
    { id: "vs-5070", q: "Is the RTX 5070 Ti worth it over the RTX 5070?", a: "It has 16GB of memory against 12GB, which helps at higher resolutions and settings. Check the price gap when you buy." },
    { id: "adapter", q: "Can I use the included power adapter?", a: "Yes. A native 12V-2x6 cable is tidier, but the adapter supplied with the card is designed for it." },
    { id: "outputs", q: "How many monitors can it drive?", a: "Most RTX 5070 Ti cards offer three DisplayPort outputs and one HDMI output. Check the exact card's listing." },
  ],
  evaluated: [
    { title: "Size", description: "We compared listed length and slot width, since they decide whether a card fits your case." },
    { title: "Cooling", description: "We noted fan count and cooler design as described by each maker." },
    { title: "Power guidance", description: "We recorded each maker's recommended power supply where listed." },
    { title: "Extras", description: "We checked for SFF-Ready status, support brackets, dual BIOS and outputs." },
  ],
};

export const gpuFacts = withPool(pool as Record<string, { img?: string; price?: string }>, [
  F("B0DS6V7L5M", "ASUS Prime GeForce RTX 5070 Ti OC", "ASUS Prime", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", boost: "2527MHz (OC mode)", power: "16-pin 12V-2x6", length: 306, slots: 2.5, fans: "3 axial fans", psu: 750, sff: true }, ["a dual BIOS switch between quiet and performance modes", "0dB fan stop at light load", "a 2527MHz OC-mode boost clock"]),
  F("B0FST71VP9", "MSI RTX 5070 Ti Ventus 3X PZ OC", "MSI Ventus 3X", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", boost: "2482MHz", outputs: "3 x DisplayPort 2.1a, 1 x HDMI 2.1b", fans: "3 TORX Fan 5.0", sff: true }, ["nickel-plated square core pipes", "TORX Fan 5.0 blades"]),
  F("B0DTR7GWG6", "GIGABYTE RTX 5070 Ti Eagle OC SFF", "Gigabyte Eagle SFF", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", sff: true }, ["a PCIe 5.0 interface"]),
  F("B0GXFGKWQX", "ZOTAC RTX 5070 Ti Solid SFF OC", "Zotac Solid SFF", { chip: "RTX 5070 Ti", vram: 16, mem: "GDDR7", slots: 2, fans: "3 x 90mm BladeLink", sff: true, outputs: "3 x DisplayPort 2.1b, 1 x HDMI 2.1b" }, ["a metal backplate", "a bundled GPU support stand"]),
  F("B0GWK2K7PL", "PNY RTX 5070 Ti Slim Dual-Fan OC", "PNY Slim", { slots: 2, fans: "2 x 120mm" }, ["a dual-slot slim design", "PNY VelocityX tuning software"]),
  F("B0DV9GMDLR", "MSI RTX 5070 Ti Gaming Trio OC Plus", "MSI Gaming Trio", { length: 338, fans: "3 fans (FROZR 4)", psu: 650 }, ["MSI's FROZR 4 cooler"]),
  // Batch 6: graphics cards across the range. Only figures stated in each listing.
  F("B0GK8N9DR7", "ZOTAC Gaming GeForce RTX 5080 Solid CORE OC", "Zotac RTX 5080 Solid Core", { chip: "RTX 5080", vram: 16, mem: "GDDR7", slots: 2.5, outputs: "3 x DisplayPort 2.1b, 1 x HDMI 2.1b" }, ["three 90mm BladeLink fans over a vapor chamber", "a bundled GPU support stand", "a metal backplate and reinforced frame", "FREEZE fan stop at idle"]),
  F("B0DS2QG2KW", "GIGABYTE Radeon RX 9070 XT Gaming OC 16G", "Gigabyte RX 9070 XT Gaming OC", { chip: "RX 9070 XT", vram: 16, mem: "GDDR6" }, ["a WINDFORCE cooler with Hawk fans", "server-grade thermal conductive gel", "RGB lighting"]),
  F("B0DYG7KB27", "MSI Gaming RTX 5070 12G Ventus 3X OC", "MSI RTX 5070 Ventus 3X", { chip: "RTX 5070", vram: 12, mem: "GDDR7", boost: "2557MHz", outputs: "3 x DisplayPort 2.1a, 1 x HDMI 2.1b" }, ["three TORX Fan 5.0 fans", "a nickel-plated copper baseplate", "a vented metal backplate"]),
  F("B0F8B59WP7", "ASRock Radeon RX 9060 XT Challenger 16GB OC", "ASRock RX 9060 XT Challenger 16GB", { chip: "RX 9060 XT", vram: 16, mem: "GDDR6", boost: "3290MHz", length: 249, slots: 2, power: "1 x 8-pin", psu: 550 }, ["32 compute units", "20Gbps memory on a 128-bit bus", "0dB fan stop at light load"]),
  F("B0DNV4NWF7", "ASRock Intel Arc B580 Challenger 12GB OC", "Arc B580 Challenger", { chip: "Arc B580", vram: 12, mem: "GDDR6", boost: "2740MHz", length: 249, slots: 2, power: "1 x 8-pin", psu: 650, outputs: "3 x DisplayPort 2.1, 1 x HDMI 2.1a" }, ["a 192-bit memory bus at 19Gbps", "dual-fan cooling with 0dB fan stop"]),
  F("B0FBX7FB1T", "ASRock Radeon RX 9060 XT Challenger 8GB OC", "ASRock RX 9060 XT Challenger 8GB", { chip: "RX 9060 XT", vram: 8, mem: "GDDR6", boost: "3290MHz", outputs: "DisplayPort 2.1a, HDMI 2.1b" }, ["32 compute units with third-generation ray tracing", "a dual-fan cooler with 0dB fan stop", "20Gbps memory on a 128-bit bus"]),
  F("B0DQYM2MHX", "ASRock Intel Arc B570 Challenger 10GB OC", "Arc B570 Challenger", { chip: "Arc B570", vram: 10, mem: "GDDR6", boost: "2600MHz", power: "1 x 8-pin", outputs: "3 x DisplayPort 2.1, 1 x HDMI 2.1a" }, ["a 160-bit memory bus at 19Gbps", "0dB fan stop"]),
  F("B0FG97XMNG", "ZOTAC Gaming GeForce RTX 5050 Twin Edge OC", "Zotac RTX 5050 Twin Edge", { chip: "RTX 5050", vram: 8, mem: "GDDR6", slots: 2, power: "1 x 8-pin", sff: true, outputs: "3 x DisplayPort 2.1b, 1 x HDMI 2.1b" }, ["two 90mm BladeLink fans", "a pass-through airflow design", "a metal backplate"]),
  F("B0F8LDHQ7Y", "GIGABYTE GeForce RTX 5060 WINDFORCE OC 8G", "Gigabyte RTX 5060 Windforce", { chip: "RTX 5060", vram: 8, mem: "GDDR7" }, ["a dual-fan WINDFORCE cooler", "a PCIe 5.0 interface"]),
  F("B0G6FCDZMK", "ASRock Radeon RX 7600 Challenger Pro 8GB OC", "ASRock RX 7600 Challenger Pro", { chip: "RX 7600", vram: 8, mem: "GDDR6", boost: "2695MHz", length: 303, slots: 2.5, power: "1 x 8-pin", psu: 550, outputs: "3 x DisplayPort 1.4a, 1 x HDMI 2.1" }, ["a triple-fan cooler with 0dB fan stop", "32MB of Infinity Cache", "a PCIe 4.0 x8 interface", "a metal backplate"]),
  F("B0DTTKCTRD", "ASRock Radeon RX 9070 Challenger 16GB OC", "ASRock RX 9070 Challenger", { chip: "RX 9070", vram: 16, mem: "GDDR6", boost: "2520MHz", length: 290, slots: 2.5, power: "2 x 8-pin", psu: 700 }, ["56 compute units", "a 256-bit memory bus at 20Gbps", "a triple-fan cooler with 0dB fan stop"]),
  F("B0DS6WPTLL", "ASUS Prime GeForce RTX 5070 12GB OC", "ASUS Prime RTX 5070", { chip: "RTX 5070", vram: 12, mem: "GDDR7", boost: "2587MHz (OC mode)", slots: 2.5, sff: true }, ["a quiet/performance dual BIOS switch", "dual-ball fan bearings", "a phase-change GPU thermal pad"]),
  F("B0DW4FRCQR", "XFX Swift Radeon RX 9070 XT Triple Fan Gaming Edition", "XFX Swift RX 9070 XT", { chip: "RX 9070 XT", vram: 16, mem: "GDDR6", boost: "2970MHz", outputs: "1 x HDMI, 3 x DisplayPort" }, ["an XFX SWFT triple-fan cooler"]),
  F("B0F7WB6LSH", "ASUS Dual GeForce RTX 5060 Ti 16GB OC", "ASUS Dual RTX 5060 Ti 16GB", { chip: "RTX 5060 Ti", vram: 16, mem: "GDDR7", boost: "2632MHz (OC mode)", slots: 2.5 }, ["a quiet/performance dual BIOS", "0dB fan stop", "dual-ball fan bearings"]),
  F("B0FC2XXSG5", "XFX Swift Radeon RX 9060 XT OC Gaming Edition 16GB", "XFX Swift RX 9060 XT 16GB", { chip: "RX 9060 XT", vram: 16, mem: "GDDR6", boost: "3320MHz", outputs: "1 x HDMI, 2 x DisplayPort" }, ["an XFX SWFT dual-fan cooler"]),
  F("B0GK7DH248", "ASUS TUF Gaming GeForce RTX 5090", "ASUS TUF RTX 5090", { chip: "RTX 5090", vram: 32, mem: "GDDR7", outputs: "3 x DisplayPort 2.1b, 2 x HDMI 2.1b" }, ["a 512-bit memory bus at 28Gbps", "21,760 CUDA cores", "a GPU holder in the box"]),
  F("B0GVGP3JG3", "MSI Gaming RTX 5080 16G Ventus 3X OC Black", "MSI RTX 5080 Ventus 3X", { chip: "RTX 5080", vram: 16, mem: "GDDR7", boost: "2640MHz", outputs: "3 x DisplayPort 2.1a, 1 x HDMI 2.1b" }, ["a 256-bit memory interface", "a 7680 x 4320 maximum digital resolution"]),
  F("B0DQSMMCSH", "ASUS TUF Gaming GeForce RTX 5080 16GB OC", "ASUS TUF RTX 5080", { chip: "RTX 5080", vram: 16, mem: "GDDR7", boost: "2730MHz (OC mode)", length: 348, slots: 3.6, power: "16-pin 12V-2x6", psu: 850 }, ["military-grade components", "a protective PCB coating", "a phase-change GPU thermal pad"]),
  F("B0DTT7CPWV", "ASRock Radeon RX 9070 XT Steel Legend 16GB", "ASRock RX 9070 XT Steel Legend", { chip: "RX 9070 XT", vram: 16, mem: "GDDR6", boost: "2970MHz", length: 298, slots: 2.9, power: "2 x 8-pin", psu: 800, outputs: "DisplayPort 2.1a, HDMI 2.1b" }, ["64 compute units", "Polychrome SYNC lighting", "a reinforced metal frame"]),
  F("B0DRRMZDH6", "ASUS Prime Radeon RX 9070 XT 16GB OC", "ASUS Prime RX 9070 XT", { chip: "RX 9070 XT", vram: 16, mem: "GDDR6", boost: "3030MHz (OC mode)", slots: 2.5 }, ["a quiet/performance BIOS switch", "0dB fan stop", "dual-ball fan bearings"]),
  F("B0DXLBTL4B", "XFX Swift Radeon RX 9070 OC Triple Fan Gaming Edition", "XFX Swift RX 9070", { chip: "RX 9070", vram: 16, mem: "GDDR6", boost: "2700MHz", outputs: "1 x HDMI, 3 x DisplayPort" }, ["an XFX SWFT triple-fan cooler"]),
  F("B0F91K2KBX", "GIGABYTE Radeon RX 9060 XT Gaming OC 8G", "Gigabyte RX 9060 XT Gaming OC 8GB", { chip: "RX 9060 XT", vram: 8, mem: "GDDR6" }, ["a WINDFORCE cooler with Hawk fans", "server-grade thermal conductive gel", "RGB lighting"]),
  F("B0FKSMSGMD", "ZOTAC Gaming GeForce RTX 5060 Ti 16GB Twin Edge OC White Edition", "Zotac RTX 5060 Ti Twin Edge White", { chip: "RTX 5060 Ti", vram: 16, mem: "GDDR7", slots: 2, power: "1 x 8-pin", sff: true, outputs: "3 x DisplayPort 2.1b, 1 x HDMI 2.1b" }, ["a white shroud", "two 90mm BladeLink fans", "FREEZE fan stop"]),
  F("B0F8PR9L3X", "ASUS Dual GeForce RTX 5060 8GB OC", "ASUS Dual RTX 5060", { chip: "RTX 5060", vram: 8, mem: "GDDR7", boost: "2565MHz (OC mode)", slots: 2.5, sff: true, outputs: "HDMI 2.1b, DisplayPort 2.1b" }, ["axial-tech fans with a barrier ring"]),
  F("B0FFXT3TRD", "ASUS Dual GeForce RTX 5050 8GB OC", "ASUS Dual RTX 5050", { chip: "RTX 5050", vram: 8, mem: "GDDR6", boost: "2677MHz (OC mode)", slots: 2, sff: true }, ["a quiet/performance dual BIOS", "0dB fan stop", "dual-ball fan bearings"]),
  F("B0FSNZ686T", "ASUS GeForce RTX 5060 LP BRK 8GB OC", "ASUS RTX 5060 LP BRK", { chip: "RTX 5060", vram: 8, mem: "GDDR7", boost: "2580MHz (OC mode)", lp: true }, ["IP5X dust resistance", "dual-ball fan bearings"]),
  F("B0GK8N1SND", "ZOTAC Gaming GeForce RTX 5060 Low Profile", "Zotac RTX 5060 Low Profile", { chip: "RTX 5060", vram: 8, mem: "GDDR7", slots: 2, power: "1 x 8-pin", lp: true, sff: true, outputs: "3 x DisplayPort 2.1b, 1 x HDMI 2.1b" }, ["40mm fans with composite heatpipes", "a metal backplate"]),
  F("B0CDJLSZ73", "Gigabyte GeForce RTX 4060 OC Low Profile 8G", "Gigabyte RTX 4060 Low Profile", { chip: "RTX 4060", vram: 8, mem: "GDDR6", lp: true }, ["three WINDFORCE fans", "a dual BIOS", "DLSS 3 support"]),
  F("B0CTJZCJH1", "MSI Gaming RTX 3050 LP 6G OC", "MSI RTX 3050 LP", { chip: "RTX 3050", vram: 6, mem: "GDDR6", boost: "1492MHz", lp: true, outputs: "1 x DisplayPort 1.4a, 2 x HDMI 2.1a" }, ["14Gbps memory on a 96-bit bus", "two HDMI 2.1a outputs"]),
  F("B0DS6V1YSY", "ASUS SFF-Ready Prime GeForce RTX 5070", "ASUS SFF-Ready Prime RTX 5070", { chip: "RTX 5070", vram: 12, mem: "GDDR7", slots: 2.5, sff: true, outputs: "HDMI 2.1, DisplayPort 2.1" }, ["a dual BIOS", "a phase-change GPU thermal pad", "a three-year warranty"]),
  F("B0DTQMLX4F", "GIGABYTE GeForce RTX 5070 WINDFORCE OC SFF 12G", "Gigabyte RTX 5070 Windforce SFF", { chip: "RTX 5070", vram: 12, mem: "GDDR7", sff: true }, ["a WINDFORCE cooler", "a 192-bit memory interface"]),
  F("B0GZR4P62R", "ASUS Prime GeForce RTX 5080 EVO 16GB OC", "ASUS Prime RTX 5080 EVO", { chip: "RTX 5080", vram: 16, mem: "GDDR7", boost: "2685MHz (OC mode)", slots: 2.5, sff: true }, ["a MaxContact heat spreader with 5% more contact area", "a quiet/performance dual BIOS", "0dB fan stop"]),
  F("B0DS6S98ZF", "ASUS TUF Gaming GeForce RTX 5070 12GB GDDR7 OC Edition", "ASUS TUF RTX 5070", { chip: "RTX 5070", vram: 12, mem: "GDDR7", boost: "2640MHz (OC mode)", slots: 3.125 }, ["military-grade components and a protective PCB coating", "an ASUS GPU Guard bracket against sag", "a phase-change thermal pad"]),
  F("B0FSSYTD49", "ASRock Radeon RX 9070 XT Challenger 16GB OC", "ASRock RX 9070 XT Challenger", { chip: "RX 9070 XT", vram: 16, mem: "GDDR6", boost: "2970MHz", outputs: "3 x DisplayPort 2.1a, 1 x HDMI 2.1b" }, ["64 compute units", "a 256-bit memory bus", "a triple-fan cooler with 0dB fan stop"]),
  F("B0DS2QZC9P", "GIGABYTE Radeon RX 9070 Gaming OC 16G", "Gigabyte RX 9070 Gaming OC", { chip: "RX 9070", vram: 16, mem: "GDDR6" }, ["a WINDFORCE cooler with Hawk fans", "server-grade thermal conductive gel", "RGB lighting"]),
  F("B0F8L93H53", "ASUS ROG Strix GeForce RTX 5070 12GB OC", "ROG Strix RTX 5070", { chip: "RTX 5070", vram: 12, mem: "GDDR7", boost: "2685MHz (OC mode)", slots: 3.2 }, ["a vapor chamber with MaxContact", "digital power control with 15K capacitors", "Aura Sync ARGB lighting", "a protective PCB coating"]),
  F("B0F77H7NBK", "ASUS Prime GeForce RTX 5060 8GB", "ASUS Prime RTX 5060", { chip: "RTX 5060", vram: 8, mem: "GDDR7", boost: "2527MHz (OC mode)", slots: 2.5, sff: true }, ["a quiet/performance dual BIOS switch", "0dB fan stop", "dual-ball fan bearings"]),
  F("B0F8B462JH", "ASRock Radeon RX 9060 XT Steel Legend 8GB OC", "ASRock RX 9060 XT Steel Legend", { chip: "RX 9060 XT", vram: 8, mem: "GDDR6", boost: "3320MHz", outputs: "DisplayPort 2.1a, HDMI 2.1b" }, ["a triple-fan cooler with 0dB fan stop", "a reinforced metal backplate", "20Gbps memory on a 128-bit bus"]),
  F("B0F4RRQ2WY", "ASUS TUF Gaming GeForce RTX 5060 Ti 8GB OC", "ASUS TUF RTX 5060 Ti 8GB", { chip: "RTX 5060 Ti", vram: 8, mem: "GDDR7", boost: "2692MHz (OC mode)", slots: 3.1 }, ["military-grade components", "a protective PCB coating", "the ASUS GPU Guard"]),
  F("B0C5S9CHMG", "Gigabyte Radeon RX 7600 Gaming OC 8G", "Gigabyte RX 7600 Gaming OC", { chip: "RX 7600", vram: 8, mem: "GDDR6", outputs: "1 x HDMI 2.1, 2 x DisplayPort 2.1" }, ["three WINDFORCE fans", "RGB Fusion lighting", "a metal backplate"]),
  F("B0FG8JRDQ6", "GIGABYTE GeForce RTX 5050 WINDFORCE OC 8G", "Gigabyte RTX 5050 Windforce", { chip: "RTX 5050", vram: 8, mem: "GDDR6" }, ["a dual-fan WINDFORCE cooler", "a PCIe 5.0 interface"]),
]);

const num6 = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : undefined);

/** Graphics cards across chips and price tiers (batch 6). */
export const gpuRangeSchema: CategorySchema = {
  id: "gpu",
  plural: "Cards",
  fields: [
    { key: "chip", label: "GPU", fmt: (v) => String(v) },
    { key: "vram", label: "VRAM", noun: "video memory", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}GB`,
      strength: (v) => (Number(v) >= 24 ? `${v}GB of VRAM, room for large local AI models as well as games` : Number(v) >= 16 ? `${v}GB of VRAM for high-resolution textures` : Number(v) >= 10 ? `${v}GB of VRAM, more than 8GB cards` : undefined),
      weakness: (v) => (Number(v) <= 8 ? `${v}GB of VRAM may force lower texture settings in some recent games` : undefined) },
    { key: "mem", label: "Memory", fmt: (v) => String(v), strength: (v) => (v === "GDDR7" ? "Faster GDDR7 memory" : undefined) },
    { key: "length", label: "Length", noun: "card length", better: "lower", superlative: ["shortest", "longest"], fmt: (v) => `${v}mm`, strength: (v) => (Number(v) <= 260 ? `Short ${v}mm length suits compact cases` : undefined), weakness: (v) => (Number(v) >= 330 ? `A ${v}mm length needs a roomy case` : undefined) },
    { key: "slots", label: "Thickness", noun: "cooler thickness", better: "lower", superlative: ["slimmest", "thickest"], fmt: (v) => `${v}-slot`, strength: (v) => (Number(v) <= 2 ? "Dual-slot cooler leaves the next slot free" : undefined), weakness: (v) => (Number(v) >= 3 ? `Its ${v}-slot cooler covers the slots below` : undefined) },
    { key: "psu", label: "Recommended PSU", noun: "recommended power supply", better: "lower", superlative: ["lowest", "highest"], fmt: (v) => `${v}W`, strength: (v) => (Number(v) <= 600 ? `A modest ${v}W PSU recommendation` : undefined), weakness: (v) => (Number(v) >= 800 ? `Calls for a ${v}W or larger PSU` : undefined) },
    { key: "power", label: "Power connector", fmt: (v) => String(v), strength: (v) => (String(v) === "1 x 8-pin" ? "A single 8-pin power connector" : undefined), weakness: (v) => (/16-pin/.test(String(v)) ? "Needs a 16-pin 12V-2x6 power cable" : /2 x 8-pin/.test(String(v)) ? "Needs two 8-pin PCIe power cables" : undefined) },
    { key: "boost", label: "Boost clock", fmt: (v) => String(v) },
    { key: "lp", label: "Low profile", fmt: (v) => (v ? "Yes" : "No"), strength: (v) => (v ? "Low-profile design for slim desktops" : undefined) },
    { key: "sff", label: "SFF-Ready", fmt: (v) => (v ? "Yes" : "No"), strength: (v) => (v ? "Carries NVIDIA's SFF-Ready label" : undefined) },
    { key: "outputs", label: "Outputs", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const n = f.short;
    const len = num6(f, "length"), sl = num6(f, "slots"), psu = num6(f, "psu");
    const pw = f.specs.power === undefined ? "" : String(f.specs.power);
    if (len && sl) s.push(`Measure for ${len}mm and ${sl} slots before ordering the ${n}.`);
    else if (len) s.push(`The ${n} is ${len}mm long; compare that with your case's GPU limit.`);
    else if (sl) s.push(`The ${n} occupies ${sl} slots, but no length is published, so check the maker's spec page against your case.`);
    else s.push(`No dimensions are published for the ${n}; get length and thickness from the maker's page first.`);
    if (pw) s.push(`Power for the ${n} comes through ${pw}${psu ? `, with ${psu}W the maker's minimum PSU` : ""}.`);
    else if (psu) s.push(`${n}: the maker suggests a PSU of ${psu}W or more.`);
    else s.push(`Its power connector and recommended PSU are not published, so confirm both for the ${n} with the maker.`);
    if (f.specs.lp) s.push(`Half-height cases need the low-profile bracket; confirm it ships with the ${n}.`);
    if (f.specs.sff && !f.specs.lp) s.push(`SFF-Ready is NVIDIA's size guideline, not a guarantee the ${n} fits every small case.`);
    return s;
  },
  criteria: [
    { id: "resolution", title: "Match the card to your monitor", body: "Resolution and refresh rate decide how much GPU you need. A 1080p screen at 144Hz asks far less than 1440p at 165Hz or 4K.\n\nBuy for the monitor you use now or will buy soon, not for a resolution you may never run." },
    { id: "vram", title: "Treat 8GB of VRAM as the floor", body: "Some recent games already push past 8GB at high texture settings. Cards with 12GB or 16GB give more room, especially at 1440p and above.\n\nTwo versions of the same chip can differ only in memory; check the capacity in the exact model name." },
    { id: "fit", title: "Check length and thickness", body: "Partner cards of the same GPU can differ by several centimetres. Compare the card's length with the case's GPU clearance, allowing for front fans or a radiator, and check how many slots it covers." },
    { id: "power", title: "Plan the power connector and PSU", body: "Cards use one or two 8-pin PCIe plugs or a single 16-pin 12V-2x6 plug. Confirm your power supply has the right cables and meets the maker's recommended wattage." },
    { id: "platform", title: "Pair it with a balanced CPU", body: "A fast card with an old CPU can stall at high frame rates, especially at 1080p. At 4K the GPU does most of the work, so the CPU matters less." },
    { id: "features", title: "Compare upscaling and encoders", body: "NVIDIA cards support DLSS, AMD cards FSR and Intel cards XeSS. Each game supports a different mix, so check the titles you play.\n\nStreamers should also compare hardware video encoders." },
    { id: "outputs", title: "Count the display outputs", body: "Most cards offer three DisplayPort outputs and one HDMI, but some swap that balance. Check that the ports match your monitors, TV or VR headset." },
    { id: "noise", title: "Cooler size affects noise", body: "Larger triple-fan coolers usually run quieter under load than compact dual-fan designs. A 0dB mode stops the fans at light load." },
  ],
  faq: [
    { id: "psu", q: "How big a power supply do I need?", a: "Use the maker's recommendation for your exact card, then add headroom if you run a high-power CPU. Also check the connectors, not just the wattage." },
    { id: "brand", q: "Do partner cards of the same GPU perform differently?", a: "Only slightly. Factory overclocks add a few percent at most; cooling, noise, size and price differ more." },
    { id: "8gb", q: "Is an 8GB graphics card still enough?", a: "For 1080p with tuned texture settings, often yes. For 1440p or high textures in new games, 12GB or 16GB is safer." },
    { id: "pcie", q: "Will a PCIe 5.0 card work in a PCIe 4.0 or 3.0 slot?", a: "Yes, the interface is backward compatible. Cards with a narrow x8 link can lose some performance on PCIe 3.0 boards." },
    { id: "cpu", q: "Will my CPU hold the card back?", a: "It depends on resolution and the games you play. At 1080p and high refresh rates the CPU matters more; at 4K the GPU sets the limit." },
    { id: "amd-nvidia", q: "Should I choose AMD or NVIDIA?", a: "Compare price and memory at your budget first, then features such as DLSS or FSR support in your games and hardware encoding if you stream." },
    { id: "sag", q: "Do I need a GPU support bracket?", a: "Long, heavy cards can sag and stress the slot. Some come with a support stand or bracket; otherwise one is inexpensive to add." },
  ],
  evaluated: [
    { title: "GPU and memory", description: "We compared the chip, video memory capacity and memory type stated in each listing." },
    { title: "Fit", description: "We recorded length and slot thickness where the maker lists them, plus low-profile and SFF-Ready status." },
    { title: "Power", description: "We noted the power connector and recommended power supply where listed." },
    { title: "Cooling and extras", description: "We checked cooler design, fan-stop modes, dual BIOS, support brackets and display outputs." },
    { title: "Price tier", description: "We grouped picks by price at the time of writing rather than by listed clock speed." },
  ],
};

