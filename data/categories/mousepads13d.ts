import pads from "@/data/pcj-pool/mousepads.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool, str } from "./helpers";

/** Batch 13d mouse pad and desk mat fact sheets. Sizes converted from the listed figure (mm to inches at 25.4mm). */
const P = pads as Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const padSchema: CategorySchema = {
  id: "mousepad",
  plural: "Mouse Pads",
  fields: [
    { key: "width", label: "Width", noun: "width", better: "higher", superlative: ["widest", "narrowest"], fmt: (v) => `${v} in`,
      strength: (v) => (Number(v) >= 35 ? `${v}-inch width covers keyboard and mouse` : undefined), weakness: (v) => (Number(v) < 15 ? `Mouse-only ${v}-inch width` : undefined) },
    { key: "depth", label: "Depth", noun: "depth", better: "higher", superlative: ["deepest", "shallowest"], fmt: (v) => `${v} in` },
    { key: "thick", label: "Thickness", noun: "thickness", better: "higher", superlative: ["thickest", "thinnest"], fmt: (v) => `${v}mm`,
      strength: (v) => (Number(v) >= 4 ? `${v}mm cushioned base` : undefined) },
    { key: "surface", label: "Surface", fmt: (v) => String(v) },
    { key: "edge", label: "Edges", fmt: (v) => String(v), strength: (v) => (/stitch/i.test(String(v)) ? "Stitched edges" : undefined) },
    { key: "extra", label: "Extras", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    if (Number(f.specs.width) >= 35) s.push(`Measure your desk first: the ${f.short} is ${str(f, "width")} inches wide and needs a flat surface for its full length.`);
    else if (Number(f.specs.width) < 20) s.push(`The ${f.short} fits the mouse only, so the keyboard sits on the bare desk at a different height.`);
    if (/glass|hard|polycarbonate/i.test(str(f, "surface"))) s.push(`A hard surface like the ${f.short}'s wears mouse feet faster than cloth; spare skates help.`);
    if (/RGB/i.test(str(f, "extra"))) s.push(`The ${f.short}'s lighting needs a free USB port near the desk edge.`);
    return s;
  },
  criteria: [
    { id: "size", title: "Size to your arm movement and desk", body: "Low-sensitivity players who aim with the arm need a large pad. Extended mats also sit under the keyboard; measure the desk before buying one over 35 inches wide." },
    { id: "surface", title: "Speed, control and balance surfaces", body: "Speed cloths let the mouse glide with less effort; control cloths add friction for stopping. Glass and hard pads are fastest and wear skates sooner." },
    { id: "thickness", title: "Thickness adds cushion", body: "3mm is the common default. 4 to 5mm pads soften the arm on a hard desk; thin 1mm pads keep the mouse lower and suit a keyboard tray." },
    { id: "edges", title: "Stitched edges stop fraying", body: "Stitched or bonded edges keep cloth from peeling at the corners. The stitching can sit slightly raised under the wrist." },
    { id: "base", title: "A rubber base keeps it still", body: "Natural or textured rubber bases grip the desk. Glass pads use silicone feet; thin plastic pads may use adhesive." },
    { id: "care", title: "Spill resistance and cleaning", body: "Water-resistant coatings let spills bead up. Cloth pads can be hand-washed with mild soap and air-dried." },
  ],
  faq: [
    { id: "size-need", q: "What size mouse pad do I need?", a: "It depends on your sensitivity. If you move the mouse more than 12 inches in a full turn, a large or extended pad avoids running off the edge." },
    { id: "desk-mat", q: "What is the difference between a mouse pad and a desk mat?", a: "A desk mat is an extended pad wide enough for the keyboard too, usually 31 to 36 inches or more." },
    { id: "glass", q: "Are glass mouse pads worth it?", a: "They are fast, consistent and easy to clean, but cost more, can be loud and wear mouse feet faster than cloth." },
    { id: "wash", q: "How do I clean a cloth mouse pad?", a: "Rinse with lukewarm water and mild soap, rub gently, then air-dry flat. Avoid the dryer." },
    { id: "thick", q: "Is a thicker mouse pad better?", a: "Thicker pads add cushion on hard desks and absorb small desk bumps. They do not change tracking." },
    { id: "rgb", q: "Do RGB mouse pads affect tracking?", a: "No, the light sits around the edge. They need USB power and add a cable to the desk." },
  ],
  evaluated: [
    { title: "Size", description: "We recorded listed width and depth and converted millimetres to inches." },
    { title: "Thickness", description: "We noted base thickness where the listing gives one." },
    { title: "Surface and edges", description: "We noted cloth type, glass or hard surfaces and stitched edges from the listing." },
    { title: "Extras", description: "We noted lighting, cable management and water resistance where claimed." },
  ],
};

export const pad13dFacts: Record<string, Fact> = withPool(P, [
  F("B0G717LM2Q", "AREYLO Extended Gaming Mouse Pad", "AREYLO", { width: 31.5, depth: 15.7, surface: "Cloth", edge: "Stitched", extra: "Waterproof coating" }, ["stitched edges", "a waterproof coating", "a 31.5 x 15.7 inch size"]),
  F("B08V8BNPR6", "Large Extended Gaming Mouse Pad (31.5 x 15.75 in)", "31.5 x 15.75 pad", { width: 31.5, depth: 15.75, surface: "Cloth", edge: "Stitched", extra: "Water-resistant" }, ["stitched edges", "a water-resistant surface", "a 15.75 inch depth"]),
  F("B0DYK8D295", "Razer Gigantus V2 XXL Mouse Pad", "Gigantus V2 XXL", { thick: 4, surface: "Cloth" }, ["a 4mm thick foam base", "XXL desk coverage"]),
  F("B0885NTLKJ", "Razer Gigantus V2 Large Mouse Pad", "Gigantus V2 Large", { thick: 3, surface: "Cloth" }, ["a 3mm foam base", "a mouse-only large size"]),
  F("B087P6HQDT", "Extended Stitched Gaming Mouse Pad (31.5 x 15.7 in)", "stitched 31.5 x 15.7 pad", { width: 31.5, depth: 15.7, thick: 3, surface: "Cloth", edge: "Stitched" }, ["a 0.12 inch (3mm) base", "stitched edges", "a 31.5 x 15.7 inch size"]),
  F("B0FCFZHSBQ", "Kanagawa Wave Extended Mouse Pad", "Kanagawa", { width: 31.5, depth: 11.8, thick: 3, surface: "Cloth" }, ["a wave-print design", "a 31.5 x 11.8 inch size", "a 3mm base"]),
  F("B0C3ZYQPZY", "DIGSOM Extended Gaming Mouse Pad", "DIGSOM", { width: 31.5, depth: 11.8, thick: 3, surface: "Cloth", extra: "Spill-proof" }, ["a spill-proof surface", "a 31.5 x 11.8 inch size", "a 3mm base"]),
  F("B0BHMN52LY", "Logitech G840 XL Gaming Mouse Pad", "G840 XL", { width: 35.4, depth: 15.7, thick: 3, surface: "Cloth" }, ["a 900 x 400 x 3mm size", "Logitech G branding and a cloth surface"]),
  F("B08JH8C5T5", "Corsair MM350 PRO Extended XL Mouse Pad", "MM350 PRO XL", { width: 36.6, depth: 15.7, thick: 4, surface: "Cloth", edge: "Stitched", extra: "Spill-proof" }, ["a 930 x 400mm size", "a spill-proof cloth", "stitched anti-fray edges"]),
  F("B0BJVBKXGZ", "Sakura Extended Gaming Mouse Pad", "Sakura pad", { width: 31.5, depth: 11.8, thick: 3, surface: "Cloth" }, ["a cherry-blossom print", "a 31.5 x 11.8 inch size", "a 3mm base"]),
  F("B0788LMLZL", "KTRIO Extended Gaming Mouse Pad", "KTRIO", { width: 31.5, depth: 11.8, surface: "Cloth", edge: "Stitched" }, ["stitched edges", "a 31.5 x 11.8 inch size"]),
  F("B0819ZNG4H", "KTRIO XXL Gaming Mouse Pad", "KTRIO XXL", { width: 31.5, depth: 15.7, surface: "Cloth", extra: "Water-resistant" }, ["a water-resistant surface", "a 31.5 x 15.7 inch size", "a cloth surface"]),
  F("B07DFFFNWL", "KTRIO XXXL Gaming Mouse Pad", "KTRIO XXXL", { width: 35.4, depth: 15.7, surface: "Cloth" }, ["a 35.4 x 15.7 inch size", "a low price for its width"]),
  F("B08QFB5KVS", "RGB Extended Gaming Mouse Pad (31.5 x 12 in)", "RGB 31.5 x 12 pad", { width: 31.5, depth: 12, surface: "Cloth", extra: "RGB edge lighting" }, ["RGB edge lighting", "a 31.5 x 12 inch size"]),
  F("B01F0XHA5E", "Cmhoo XXL Extended Mouse Pad", "Cmhoo XXL", { width: 35.4, depth: 15.7, thick: 2.5, surface: "Cloth" }, ["a 35.4 x 15.7 inch size", "a 0.1 inch base"]),
  F("B000UEZ36W", "SteelSeries QcK Medium Mouse Pad", "QcK Medium", { width: 12.6, depth: 10.6, surface: "Cloth" }, ["a 320 x 270mm size", "a cloth surface"]),
  F("B000V7ARAU", "SteelSeries QcK Heavy Mouse Pad", "QcK Heavy", { surface: "Cloth" }, ["an extra-thick base", "a cloth surface"]),
  F("B000UVRU6G", "SteelSeries QcK Large Mouse Pad", "QcK Large", { width: 19.3, depth: 16.5, surface: "Cloth" }, ["a 490 x 420mm size", "a cloth surface"]),
  F("B0DZ1QYD97", "SteelSeries QcK Performance Speed XL", "QcK Speed XL", { width: 34.4, depth: 15.75, thick: 3.5, surface: "Speed cloth" }, ["a speed-tuned cloth", "a 3.5mm base", "a 34.43 x 15.75 inch size"]),
  F("B0DZ1MZB9F", "SteelSeries QcK Performance Speed L", "QcK Speed L", { width: 19.3, depth: 16.5, thick: 3.5, surface: "Speed cloth" }, ["a speed-tuned cloth", "a 3.5mm base", "a mouse-only large size"]),
  F("B0DZ1QB918", "SteelSeries QcK Performance Balance XL", "QcK Balance XL", { thick: 3.5, surface: "Balance cloth" }, ["a balance cloth between speed and control", "a 3.5mm base", "XL desk coverage"]),
  F("B0DZ1PZLKP", "SteelSeries QcK Performance Control XL", "QcK Control XL", { thick: 3.5, surface: "Control cloth" }, ["a control cloth with more stopping friction", "a 3.5mm base", "XL desk coverage"]),
  F("B0HDG5GQT1", "Razer Gigantus V2 Pro 3XL Balance", "Gigantus V2 Pro 3XL", { width: 47.2, depth: 20.9, surface: "Balance cloth" }, ["a 47.2 x 20.9 inch size", "a balance cloth"]),
  F("B0GP4J19K9", "Razer Gigantus V2 Pro Large Balance", "Gigantus V2 Pro Balance", { width: 19.7, depth: 18.9, surface: "Balance cloth" }, ["a 19.69 x 18.90 inch size", "a balance cloth"]),
  F("B0GP4DYHMJ", "Razer Gigantus V2 Pro Large Control", "Gigantus V2 Pro Control", { width: 19.7, depth: 18.9, surface: "Control cloth" }, ["a 19.69 x 18.90 inch size", "a control cloth"]),
  F("B0H4XPNWWP", "Razer Gigantus V2 XXL Wuthering Waves Edition", "Gigantus V2 XXL Wuthering Waves", { width: 37, depth: 16.1, thick: 4, surface: "Cloth" }, ["a 940 x 410mm size", "a 4mm base", "Wuthering Waves artwork"]),
  F("B07QNZTFLM", "Corsair MM350 Champion Series Medium", "MM350 Champion Medium", { width: 12.6, depth: 10.6, thick: 5, surface: "Cloth" }, ["a 5mm thick base", "a 320 x 270mm size"]),
  F("B01798VS4C", "Corsair MM300 Anti-Fray Cloth Mouse Pad", "MM300", { surface: "Cloth", edge: "Stitched" }, ["stitched anti-fray edges", "a cloth surface"]),
  F("B0BHMLWH3Z", "Logitech G240 Cloth Gaming Mouse Pad", "G240", { width: 13.4, depth: 11, thick: 1, surface: "Cloth" }, ["a thin 1mm profile", "a 340 x 280mm size"]),
  F("B0BHMK6B2X", "Logitech G440 Hard Gaming Mouse Pad", "G440", { width: 13.4, depth: 11, thick: 5, surface: "Hard polymer" }, ["a hard low-friction surface", "a 340 x 280 x 5mm size"]),
  F("B07ZDWHL4M", "Razer Firefly V2 Hard RGB Mouse Mat", "Firefly V2", { width: 14, depth: 10.8, thick: 3.6, surface: "Hard", extra: "RGB, cable manager" }, ["Chroma RGB edge lighting", "a built-in cable manager", "a hard surface"]),
  F("B091D5Y2Z7", "Razer Sphex V3 Hard Gaming Mouse Mat", "Sphex V3", { width: 10.6, depth: 8.5, thick: 0.4, surface: "Polycarbonate", extra: "Adhesive base" }, ["an ultra-thin 0.4mm polycarbonate build", "an adhesive base", "a 270 x 215mm size"]),
  F("B0CLHLLQ6P", "ASUS ROG Moonstone Ace L Glass Mouse Pad", "Moonstone Ace L", { width: 19.7, depth: 15.7, surface: "Tempered glass" }, ["a tempered glass surface", "a silicone base", "a 500 x 400mm size"]),
  F("B0D7C37NYB", "XVX Glass Gaming Mouse Pad", "XVX glass", { width: 16.1, depth: 12.2, thick: 3.2, surface: "Glass" }, ["a glass surface", "a 410 x 310 x 3.2mm size", "a lower price than the other glass pads here"]),
  F("B0FY33N3LR", "Wallhack SP-005 Glass Mouse Pad", "Wallhack SP-005", { width: 20.1, depth: 17.3, thick: 2.5, surface: "Glass", extra: "Skates included" }, ["replacement mouse skates in the box", "a 510 x 440mm glass surface", "a 2.5mm profile"]),
  F("B07CZZ12ZZ", "Traverse Ridge Extended Desk Mat", "Traverse Ridge", { width: 36, depth: 12, thick: 5, surface: "Cloth" }, ["a logo-free surface", "a 36 x 12 inch size", "a 5mm base"]),
  F("B0F4KKZZ37", "Cacoy RGB Gaming Desk Mat (36 x 24 in)", "Cacoy RGB", { width: 36, depth: 24, surface: "Cloth", extra: "RGB, 9 modes" }, ["a 36 x 24 inch size", "9 RGB lighting modes"]),
  F("B0CL4R27N5", "Mydours PU Leather Desk Mat", "Mydours leather", { width: 35.4, depth: 15.7, surface: "PU leather" }, ["a wipe-clean PU leather surface", "a 35.4 x 15.7 inch size"]),
  F("B0DLPDWJ9C", "LifeTrim Extended Desk Mat", "LifeTrim", { width: 36, depth: 13, surface: "Cloth" }, ["a 36 x 13 inch size"]),
]);
