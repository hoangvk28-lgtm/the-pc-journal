import pool from "@/data/pcj-pool/acc37-pads.json";
import { withPool } from "./helpers";
import { mkSchema, F } from "./acc37-helpers";

/** GPU thermal pads. Figures come from each listing's title and bullets; unstated fields stay undefined. */
export const padsSchema = mkSchema("gpu-thermal-pad", "Thermal Pads", [
  { key: "wmk", label: "Conductivity", noun: "rated conductivity", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} W/mK (maker's figure)`, rule: { label: "Highest Rated Conductivity", bestFor: ["Replacing VRAM and VRM pads on a hot graphics card.", "Gap filling where the cooler presses hard on the chips."] }, strength: (v) => `Maker-rated ${v} W/mK conductivity` },
  { key: "thick", label: "Thickness", noun: "thickness", better: "higher", superlative: ["thickest", "thinnest"], fmt: (v) => `${v}mm` },
  { key: "size", label: "Sheet size", fmt: (v) => String(v) },
  { key: "pack", label: "In the box", fmt: (v) => String(v), strength: (v) => `${v} in the box` },
  { key: "nonConductive", label: "Electrically non-conductive", fmt: (v) => (v ? "Yes" : "Not listed"), strength: (v) => (v ? "Electrically non-conductive, so contact with nearby parts is safe" : undefined) },
], (f) => {
  const s = ["Measure the gap between each memory chip and the cooler, or check a teardown for your exact card, before you pick a thickness; the wrong thickness leaves chips uncooled or bows the PCB."];
  if (f.specs.thick) s.push(`This sheet is ${f.specs.thick}mm thick, so it only suits positions where the original pad was about that thickness.`);
  return s;
}, [
  ["Thickness matters more than the headline figure", "A pad that is too thin leaves a gap, and one that is too thick lifts the cooler off the GPU core. Match the original pad thickness for each position."],
  ["Conductivity figures are the maker's own", "W/mK ratings are measured under each maker's conditions, so compare them within a brand and treat a few W/mK as a small real-world difference."],
  ["Look for electrical insulation", "Pads sit against exposed memory and VRM components, so a non-conductive pad avoids shorts if it is cut or shifts."],
  ["Soft pads are harder to handle", "Very soft pads tear easily and stretch when cut. Cut them with a clean blade on a flat surface and handle them by the edges."],
  ["Buy enough sheet", "A graphics card can need pads for memory, VRM and backplate. Check the sheet area against what you are replacing before buying."],
], [
  ["Do I need new thermal pads for my GPU?", "Usually only if you are opening the card to repaste it, or if the memory runs hot and the original pads have hardened or are damaged."],
  ["Can I reuse the old pads?", "Often they tear or compress permanently when removed, so fresh pads of the same thickness are the safer choice."],
  ["Is thermal paste a substitute?", "No. Paste is for the GPU core. Memory and VRM chips sit at different heights and need pads to fill the gap."],
  ["Does a higher W/mK always cool better?", "Not by itself. Contact and the right thickness matter as much as the rating."],
  ["Will opening my card void the warranty?", "On many cards it can. Check the maker's policy before removing the cooler."],
], [
  ["Rated conductivity", "We recorded W/mK where the listing states it."],
  ["Thickness and size", "We noted each sheet's thickness and area."],
  ["Insulation", "We checked whether the listing says the pad is electrically non-conductive."],
  ["Pack contents", "We noted how many pieces come in the box."],
]);

export const pads37Facts = withPool(pool as Record<string, { img?: string; price?: string }>, [
  F("B09JLHRSS9", "Thermalright Odyssey Thermal Pad 1.5mm (85x45mm)", "Odyssey 1.5mm", { wmk: 12.8, thick: 1.5, size: "85 x 45mm", nonConductive: true }, ["a working range of -40 to 200°C, by the maker's claim", "a sheet that can be cut to fit", "a 9.8kV breakdown voltage"]),
  F("B0BGH661Z2", "Thermalright Odyssey Thermal Pad 1mm (85x45mm)", "Odyssey 1mm", { wmk: 12.8, thick: 1, size: "85 x 45mm", nonConductive: true }, ["a working range of -40 to 200°C, by the maker's claim", "a sheet that can be cut to fit", "a 9.8kV breakdown voltage"]),
  F("B0BVDPGNLR", "Thermalright Odyssey Thermal Pad 2.5mm (85x45mm)", "Odyssey 2.5mm", { wmk: 12.8, thick: 2.5, size: "85 x 45mm", nonConductive: true }, ["a working range of -40 to 200°C, by the maker's claim", "a sheet that can be cut to fit", "a 9.8kV breakdown voltage"]),
  F("B06WWDT6RC", "Gelid GP-Extreme Thermal Pad 1.5mm (80x40mm)", "GP-Extreme 1.5mm", { wmk: 12, thick: 1.5, size: "80 x 40mm", nonConductive: true }, ["a non-corrosive, non-hardening and non-toxic pad", "six thickness options from 0.5mm to 3.0mm", "a size aimed at VGA cards, laptops and memory ICs"]),
  F("B07BSPZTNV", "Gelid GP-Extreme Thermal Pad 2.0mm (80x40mm)", "GP-Extreme 2mm", { wmk: 12, thick: 2, size: "80 x 40mm", nonConductive: true }, ["a non-corrosive, non-hardening and non-toxic pad", "six thickness options from 0.5mm to 3.0mm", "a size aimed at VGA cards, laptops and memory ICs"]),
  F("B09V52W7JH", "ARCTIC TP-3 Thermal Pad 1.5mm (120x20mm, 4 Pack)", "TP-3 1.5mm 4-pack", { thick: 1.5, size: "120 x 20mm", pack: "4 strips", nonConductive: true }, ["a silicone and special-filler pad with no metal particles", "very soft material that conforms to chips of different heights", "vibration damping and an insulating, non-capacitive build"]),
  F("B0DVT671RL", "Thermal Grizzly Minus Pad Advance (2 Pack, 100x100mm, 1.0mm)", "Minus Pad Advance", { thick: 1, size: "100 x 100mm", pack: "2 sheets", nonConductive: true }, ["high compressibility for gap filling", "a design aimed at SSDs, GPUs and graphics card coolers"]),
  F("B00ZJSCQF0", "Thermal Grizzly Minus Pad 8 (2 Pack, 120x20mm, 0.5mm)", "Minus Pad 8", { thick: 0.5, size: "120 x 20mm", pack: "2 strips", nonConductive: true }, ["a non-curing formula", "a design aimed at VRAM, SSD controllers and chipsets"]),
  F("B0H17BYRX2", "14.8 W/mK Thermal Pad 4 Pack (100x100mm, 0.5/1/1.5/2mm)", "14.8 W/mK 4-pack", { wmk: 14.8, size: "100 x 100mm", pack: "4 sheets (0.5, 1, 1.5, 2mm)", nonConductive: true }, ["four thicknesses in one box", "a 30 to 40 percent compression ratio, by the listing", "a peel-off film and a cut-to-size sheet"]),
]);
