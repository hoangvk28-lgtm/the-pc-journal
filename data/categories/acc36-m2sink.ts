import ssdPool0 from "@/data/pcj-pool/ssd36.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 36 M.2 SSD heatsinks. Figures come from each listing title or bullets;
 * fans and GPU-listed thermal pastes. Every figure comes from the listing title or bullets. Dropped on purpose: HR10 fan
 * speed (bullets disagree), HATMINI and AuyiHomu 8-port hubs (title and bullets give different port counts), PTM7950 pads
 * (reseller-style listings with no brand) and thermal pads whose listings state no thickness or size.
 */
type Pool = Record<string, { img?: string; price?: string }>;
const pool = ssdPool0 as Pool;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

/* ------------------------------------------------------------------------------------------ M.2 SSD heatsinks */

export const m2SinkSchema: CategorySchema = {
  id: "m2-heatsink",
  plural: "M.2 SSD Heatsinks",
  fields: [
    { key: "kind", label: "Cooling", fmt: (v) => String(v), strength: (v) => (/Active/.test(String(v)) ? "active cooling with a small fan" : undefined) },
    { key: "material", label: "Material", fmt: (v) => String(v), strength: (v) => `${v}` },
    { key: "heatpipes", label: "Heat pipes", noun: "heat pipe count", better: "higher", superlative: ["most", "fewest"], fmt: (v) => String(v), rule: { label: "Most Heat Pipes", bestFor: ["Hot Gen4 and Gen5 drives under sustained writes.", "Open cases with room above the slot."] }, strength: (v) => (Number(v) >= 2 ? `${v} heat pipes` : undefined) },
    { key: "height", label: "Height", noun: "height", better: "lower", superlative: ["shortest", "tallest"], fmt: (v) => `${v}mm`, rule: { label: "Lowest Profile", bestFor: ["Boards with a graphics card close to the M.2 slot.", "Tight cases and thin builds."] }, strength: (v) => (Number(v) <= 5 ? `a low ${v}mm height` : undefined), weakness: (v) => (Number(v) >= 40 ? `A tall ${v}mm body that can foul a graphics card or CPU cooler` : undefined) },
    { key: "ps5", label: "PS5 fit", fmt: (v) => (v ? "Listed for PS5" : "Not listed"), strength: (v) => (v ? "a listed fit for the PS5's M.2 bay" : undefined) },
    { key: "laptop", label: "Laptop use", fmt: (v) => (v ? "Listed for laptops" : "Desktop only"), strength: (v) => (v ? "a low-profile design for laptops" : undefined), weakness: (v) => (v === false ? "Listed for desktops only, not laptops" : undefined) },
    { key: "install", label: "Fitting", fmt: (v) => String(v) },
    { key: "pads", label: "Thermal pads", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s = ["It is made for M.2 2280 drives; check that your drive is 2280 and note whether it is single- or double-sided."];
    if (f.specs.height) s.push(`It stands ${f.specs.height}mm tall, so check the gap between your M.2 slot and the graphics card or CPU cooler.`);
    s.push("A drive that already has a heatsink, or a board with a built-in M.2 cover, needs only one of the two; fit just the one that clears your case.");
    return s;
  },
  criteria: [
    { id: "need", title: "Check whether you need one", body: "Many motherboards include M.2 heatsinks, and some SSDs ship with their own. An extra heatsink helps most on hot Gen4 or Gen5 drives with no cover." },
    { id: "height", title: "Measure the clearance", body: "Tall heatsinks can touch a graphics card or CPU cooler. Check the gap above the M.2 slot, and avoid thick sinks on the slot directly under the GPU." },
    { id: "sides", title: "Match single- and double-sided drives", body: "Double-sided drives carry chips on both faces and need a sink with pads on both sides, or a clamp that fits the extra thickness." },
    { id: "laptop", title: "Laptops need a very thin sink", body: "A laptop's lid often leaves 1 to 2mm over the drive, so only thin copper or graphite films fit. Check each listing's minimum height." },
    { id: "ps5", title: "PS5 bays have size limits", body: "The PS5's bay accepts heatsinks within Sony's size limits. Choose a sink listed for the console and check the dimensions." },
    { id: "pads", title: "Thermal pad contact matters", body: "A heatsink works through its thermal pad. Make sure the pad covers the controller and NAND, and peel off every film before fitting." },
  ],
  faq: [
    { id: "boost", q: "How much will a heatsink lower SSD temperatures?", a: "Makers claim 5 to 30°C, but results depend on airflow and the drive. A heatsink mainly helps a drive hold its speed during long writes." },
    { id: "double", q: "Can I use a heatsink on a drive that already has one?", a: "No. Use one or the other; stacking them adds height and can block the slot cover." },
    { id: "fan", q: "Is an active (fan) heatsink worth it?", a: "Only for very hot drives or cases with no airflow. A fan adds noise and needs a header." },
    { id: "warranty", q: "Will a heatsink void my SSD warranty?", a: "A pad-and-clip heatsink that you can remove normally does not. Check your drive maker's terms before using adhesive." },
    { id: "gen3", q: "Do Gen3 drives need one?", a: "Rarely. Gen3 drives run cooler than Gen4 and Gen5 models, so a heatsink matters less." },
  ],
  evaluated: [
    { title: "Cooling design", description: "We recorded material, heat pipes and any fan each listing describes." },
    { title: "Clearance", description: "We noted height and fit claims for desktops, laptops and the PS5." },
    { title: "Fitting", description: "We checked how each heatsink attaches and which pads come in the box." },
    { title: "Price", description: "We compared heatsinks against the price at the time of writing." },
  ],
};

export const m2SinkFacts: Record<string, Fact> = withPool(pool, [
  F("B076YZMQR5", "GLOTRENDS Low-Profile M.2 SSD Heatsink", "GLOTRENDS low-profile", { kind: "Passive", material: "an aluminium body", height: 3, ps5: true, laptop: false, install: "Metal clasps or rubber bands, no screws", pads: "One low-viscosity pad" }, ["a 22x70x3mm body", "tool-less fitting in under a minute", "a stated 5 to 20°C cut in peak temperatures, by the maker's claim"]),
  F("B08YRSZPH8", "be quiet! MC1 M.2 SSD Cooler", "be quiet! MC1", { kind: "Passive", ps5: true, install: "Clip-on" }, ["a fit for single- and double-sided M.2 2280 modules", "dimensions the maker says suit the PS5's bay"]),
  F("B08YRVM51Q", "be quiet! MC1 Pro M.2 SSD Cooler", "be quiet! MC1 Pro", { kind: "Passive", material: "an aluminium body with an integrated heat pipe", heatpipes: 1 }, ["a matte black anodised finish", "a fit for single- and double-sided M.2 2280 modules", "a mounting system for a secure fit"]),
  F("B0CYSNSSF8", "ARCTIC M2 Pro M.2 SSD Heatsink", "ARCTIC M2 Pro", { kind: "Passive", ps5: true, install: "A click mechanism with no screws or rubber bands", pads: "Two TP-3 pads" }, ["a design that ARCTIC says meets Sony's PS5 and PS5 Slim specifications", "a fit for single- and double-sided SSDs", "two precisely fitting TP-3 pads"]),
  F("B09HRN8QXY", "Thermalright M.2 Pro Heatsink (8mm heat pipe)", "Thermalright M.2 Pro", { kind: "Passive", material: "an aluminium body with an 8mm copper heat pipe", heatpipes: 1, height: 11.7, install: "Clips", pads: "Double-layer silicone pads" }, ["a 75 x 22.7 x 11.7mm body", "an anodised, sandblasted aluminium finish", "partial compatibility with M.2 2260 and 2242 drives"]),
  F("B0C4GX886D", "Thermalright HR10 2280 PRO Heatsink (with fan)", "Thermalright HR10 PRO", { kind: "Active (30mm PWM fan)", material: "stainless steel and aluminium fins", heatpipes: 4, height: 43.8, install: "Clamp", pads: "14.8W/mK pads on both sides" }, ["four 5mm heat pipes", "a 30mm 4-pin PWM fan with a 50cm cable", "a note that it does not support ITX back-mounted M.2 slots"]),
  F("B09WTPL9DR", "Thermalright HR09 2280 Heatsink", "Thermalright HR09", { kind: "Passive", material: "an aluminium body with a 6mm heat pipe", heatpipes: 1, height: 48, install: "Clips with six adjustable-height screws", pads: "14.8W/mK double-sided pads" }, ["a stated 10 to 30°C cooling effect, by the maker's claim", "a groove design that adds fin area", "adjustable-height screws for drives of different thickness"]),
  F("B0BNZYFW88", "Thermalright TR-M.2 Type A B Heatsink", "Thermalright TR-M.2", { kind: "Passive", material: "an anodised aluminium body", height: 13, laptop: false, install: "Double-sided clips with four screws", pads: "Silicone pads on both sides" }, ["a 70 x 24 x 13mm body", "a stated 10 to 30°C cooling effect, by the maker's claim", "a design for desktop M.2 slots"]),
  F("B08BMM18R2", "SABRENT Rocket M.2 2280 Heatsink", "SABRENT Rocket heatsink", { kind: "Passive", material: "copper and aluminium", laptop: false, install: "Thermal tape and screws", pads: "Thermal tape" }, ["a fit for single- and double-sided M.2 2280 drives", "a screwdriver in the box", "a design for desktop computers"]),
  F("B0BJ7VYJPH", "SABRENT Rocket Gaming Edition M.2 Heatsink", "SABRENT Gaming Edition", { kind: "Passive", material: "an aluminium body with copper heat pipes", heatpipes: 3, install: "A built-in M.2 screw" }, ["a top shaped to increase surface area for case airflow", "a fit for single- and double-sided M.2 2280 drives", "everything needed in the box"]),
  F("B0BQ6SG6C5", "NewHail M.2 2280 Heatsink with 40mm PWM Fan", "NewHail fan heatsink", { kind: "Active (40mm PWM fan)", material: "aluminium with copper heat pipes", heatpipes: 3, install: "Thermal tape and screws", pads: "A thermal pad" }, ["a 40mm PWM fan that reaches 8,500RPM", "three 4.5mm copper heat pipes into the upper and lower fins", "a 12V design for desktops, for NVMe 2280 drives only"]),
  F("B07YC1HTFR", "Laptop NVMe M.2 Copper Heatsink (2-pack)", "Copper laptop heatsink", { kind: "Passive", material: "pure copper", height: 1.5, laptop: true, install: "Rubber ring or insulating sticker", pads: "0.5mm and 1mm pads" }, ["a minimum installation height of 1.5mm", "a stated 10 to 20°C cooling effect, by the maker's claim", "two heatsinks in the pack"]),
  F("B09DBF8FX1", "Double-Sided Aluminium M.2 2280 Heatsink (PS5/PC)", "Double-sided clip heatsink", { kind: "Passive", material: "a silver-plated aluminium alloy", height: 10, ps5: true, install: "A double-sided clip", pads: "Thermal silicone pads" }, ["anodised, silver-plated aluminium that helps eliminate static", "a stated 10 to 20°C cooling effect, by the maker's claim", "a listed fit for single-sided drives and the PS5"]),
  F("B09HSQQWCL", "SABRENT M.2 NVMe PS5 Heatsink (SB-PSHS)", "SABRENT PS5 heatsink", { kind: "Passive", material: "CNC aluminium", ps5: true, install: "Screws and thermal tape" }, ["a heatsink that replaces the PS5's native cover", "a sandwich design that spreads pressure evenly", "an installation guide in the box"]),
]);

