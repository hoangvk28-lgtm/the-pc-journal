import pool from "@/data/pcj-pool/gpu-brackets.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { str, withPool } from "./helpers";

/**
 * GPU support brackets (anti-sag). Only figures stated in each Amazon listing are recorded.
 * Unbranded listings and near-duplicate colour variants are left out.
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const gpuBracketSchema: CategorySchema = {
  id: "gpu-bracket",
  plural: "GPU Brackets",
  fields: [
    { key: "mount", label: "Mounting", fmt: (v) => String(v), strength: (v) => (/stand/i.test(String(v)) ? "A freestanding design that needs no screws or PCIe slot" : undefined) },
    { key: "hmax", label: "Max support height", noun: "maximum support height", better: "higher", superlative: ["tallest", "lowest"], fmt: (v) => `${v}mm`,
      rule: { label: "Tallest Reach", bestFor: ["Cases with a deep gap between the card and the PSU shroud.", "Graphics cards in a high PCIe slot."] } },
    { key: "height", label: "Height range", fmt: (v) => String(v) },
    { key: "material", label: "Material", fmt: (v) => String(v), strength: (v) => (/zinc|aluminum/i.test(String(v)) ? `${String(v).toLowerCase()} construction` : undefined) },
    { key: "load", label: "Rated support", fmt: (v) => String(v), strength: (v) => `rated for ${v}` },
    { key: "argb", label: "Lighting", fmt: (v) => String(v), strength: (v) => (v === "None" ? undefined : `${v} lighting`) },
    { key: "magnet", label: "Magnetic base", fmt: (v) => (v ? "Yes" : "No"), strength: (v) => (v ? "A magnetic base that holds it on a steel shroud" : undefined) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const mount = str(f, "mount");
    if (/stand/i.test(mount)) s.push(f.specs.hmax ? `Measure from the PSU shroud or case floor to the underside of the card; this stand reaches ${str(f, "height") || `${f.specs.hmax}mm`}.` : "Measure from the PSU shroud or case floor to the underside of the card before ordering.");
    if (/slot/i.test(mount)) s.push("It screws into the case's expansion-slot rail, so check that a free slot position sits below the card.");
    if (/fan/i.test(mount)) s.push("It screws onto a bottom 120mm or 140mm fan position, so the case needs a free fan mount under the card.");
    if (f.specs.argb && f.specs.argb !== "None" && !/Aura/.test(str(f, "argb"))) s.push("The ARGB lead needs a 5V 3-pin header; do not connect it to a 12V 4-pin RGB header.");
    return s;
  },
  criteria: [
    { id: "measure", title: "Measure the gap first", body: "A stand must reach from the PSU shroud or case floor to the bottom of the card. Measure that gap with the card installed and pick a bracket whose range covers it with room to adjust.\n\nA vertical-mounted card needs no bracket." },
    { id: "type", title: "Stand, slot bracket or fan mount", body: "Freestanding stands are the simplest and move between cases. Slot-mounted bars screw into the expansion rail and support the card along its length. Fan-mount braces use a bottom fan position.\n\nPick the one your case layout allows." },
    { id: "weight", title: "Heavier cards need firmer support", body: "Triple-fan cards at 300mm and longer put the most strain on the PCIe slot. Metal construction, a wide pad and a firm lock matter more than looks.\n\nSupport the card near its far end, away from the slot." },
    { id: "fans", title: "Keep clear of the card's fans", body: "The support pad should touch the card's shroud or backplate edge, not a fan blade. Some brackets include pads of different sizes for different fan spacing." },
    { id: "lighting", title: "Lighting adds a cable", body: "ARGB brackets need a 5V 3-pin header or a controller. If your board's headers are already used, a plain metal stand avoids the wiring." },
  ],
  faq: [
    { id: "need", q: "Do I need a GPU support bracket?", a: "Not always. Heavy triple-fan cards in horizontal mounts sag over time, and a bracket reduces strain on the PCIe slot. Lighter dual-fan cards often need none." },
    { id: "harm", q: "Can GPU sag damage my card?", a: "Severe sag can stress the PCIe slot and the card's circuit board over time. A bracket keeps the card level." },
    { id: "vertical", q: "Do I need a bracket with a vertical GPU mount?", a: "No. A vertical mount carries the card's weight through the riser bracket, so a sag bracket is not needed." },
    { id: "included", q: "Did my graphics card come with a support bracket?", a: "Some high-end cards include one. Check the box and the maker's accessory list before buying another." },
    { id: "height", q: "How do I know what height I need?", a: "Measure from where the stand will sit, usually the PSU shroud, to the underside of the card, and choose a range that covers it." },
  ],
  evaluated: [
    { title: "Reach and adjustment", description: "We recorded each bracket's listed height range and how it adjusts." },
    { title: "Build", description: "We noted material and any listed load or card-length rating." },
    { title: "Mounting", description: "We compared freestanding, slot-mounted and fan-mounted designs." },
    { title: "Lighting and wiring", description: "We checked lighting type and connector." },
  ],
};

export const gpuBracketFacts = withPool(pool as Pool, [
  F("B0B173F6RM", "ASUS ROG Herculx GPU Anti-Sag Holder", "ROG Herculx", { mount: "Freestanding stand", hmax: 128, height: "72 to 128mm", material: "Zinc alloy", argb: "Aura Sync ARGB" }, ["toolless setup with an adjustment wheel and release button", "an included spirit level", "a two-year warranty"]),
  F("B0GDPP96DK", "EZDIY-FAB VH90 Adjustable ARGB GPU Support Bracket", "EZDIY-FAB VH90", { mount: "PCIe slot bracket", load: "cards up to 310mm and 1.2kg", argb: "ARGB" }, ["a sliding rail with a lift mechanism", "a PCIe slot reinforcement plate", "a front-mounted metal adjustment knob"]),
  F("B0948RC4GK", "EZDIY-FAB 309EZ ARGB GPU Holder Brace", "EZDIY-FAB 309EZ", { mount: "PCIe slot bracket", material: "Aluminum alloy", argb: "ARGB" }, ["a lengthened, bent arm for long cards", "two rubber pads for different cooler designs", "a fit for cases with seven or more expansion slots"]),
  F("B08YYB3WM2", "upHere G276ARGB GPU Brace", "upHere G276ARGB", { mount: "Adjustable bracket", material: "Iron", argb: "ARGB (5V 3-pin)" }, ["adjustment for both card length and support position", "a 12-month warranty"]),
  F("B09NB9MSWF", "EZDIY-FAB 5V ARGB GPU Support Stand", "EZDIY-FAB ARGB stand", { mount: "Freestanding stand", hmax: 106, height: "67 to 106mm", material: "Aluminum alloy", argb: "ARGB (5V 3-pin)", magnet: true }, ["a compact, lightweight body"]),
  F("B0F2SZYLJ2", "upHere Aluminum Dual Brace GPU Support Bracket (128mm)", "upHere dual brace", { mount: "Bottom fan mount", hmax: 128, material: "Aluminum", argb: "None" }, ["two support arms for heavy cards", "rubber pads on both arms", "screws onto a 120mm or 140mm bottom fan position"]),
  F("B0CZ8B63NM", "upHere GB49K GPU Support Stand (M, 49-80mm)", "upHere GB49K", { mount: "Freestanding stand", hmax: 80, height: "49 to 80mm", material: "Aluminum", argb: "None", magnet: true }, ["tool-free telescopic height adjustment", "a scratch-proof pad"]),
  F("B091CFKQC9", "upHere G276WT White GPU Brace", "upHere G276WT", { mount: "Adjustable bracket", material: "Iron", argb: "None" }, ["a white finish", "adjustment for both card length and support position"]),
]);
