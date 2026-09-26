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
    if (f.specs.length !== undefined) s.push(`Compare its ${f.specs.length}mm length with your case's listed GPU clearance, allowing for front fans or a radiator.`);
    else s.push("Its listing does not state a length, so check the exact dimensions on the maker's spec page against your case.");
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
  F("B0DS6V7L5M", "ASUS Prime GeForce RTX 5070 Ti OC", "ASUS Prime", { length: 306, slots: 2.5, fans: "3 axial fans", psu: 750, sff: true }, ["a dual BIOS switch between quiet and performance modes", "0dB fan stop at light load", "a 2527MHz OC-mode boost clock"]),
  F("B0FST71VP9", "MSI RTX 5070 Ti Ventus 3X PZ OC", "MSI Ventus 3X", { fans: "3 TORX Fan 5.0", sff: true }, ["nickel-plated square core pipes", "TORX Fan 5.0 blades"]),
  F("B0DTR7GWG6", "GIGABYTE RTX 5070 Ti Eagle OC SFF", "Gigabyte Eagle SFF", { sff: true }, ["a PCIe 5.0 interface"]),
  F("B0GXFGKWQX", "ZOTAC RTX 5070 Ti Solid SFF OC", "Zotac Solid SFF", { slots: 2, fans: "3 x 90mm BladeLink", sff: true, outputs: "3 x DisplayPort 2.1b, 1 x HDMI 2.1b" }, ["a metal backplate", "a bundled GPU support stand"]),
  F("B0GWK2K7PL", "PNY RTX 5070 Ti Slim Dual-Fan OC", "PNY Slim", { slots: 2, fans: "2 x 120mm" }, ["a dual-slot slim design", "PNY VelocityX tuning software"]),
  F("B0DV9GMDLR", "MSI RTX 5070 Ti Gaming Trio OC Plus", "MSI Gaming Trio", { length: 338, fans: "3 fans (FROZR 4)", psu: 650 }, ["MSI's FROZR 4 cooler"]),
]);
