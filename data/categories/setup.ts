import pool from "@/data/pcj-pool/setup.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { str, withPool } from "./helpers";

const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const P = pool as Record<string, { img?: string; price?: string }>;

/* ───────────────────────────── Gaming desks ───────────────────────────── */

export const deskSchema: CategorySchema = {
  id: "gaming-desks",
  plural: "Desks",
  fields: [
    { key: "width", label: "Width", noun: "width", better: "higher", superlative: ["widest", "narrowest"], fmt: (v) => `${v} in`,
      rule: { label: "Most Desk Space", bestFor: ["Multi-monitor setups and large keyboards.", "Desks that also hold a full tower."] } },
    { key: "capacity", label: "Load capacity", noun: "load rating", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} lb` },
    { key: "type", label: "Type", fmt: (v) => String(v) },
    { key: "height", label: "Height range", fmt: (v) => String(v) },
    { key: "power", label: "Power", fmt: (v) => String(v), strength: (v) => (String(v) !== "None listed" ? `Built-in ${v}` : undefined) },
  ],
  compat: (f) => {
    const t = str(f, "type"), s: string[] = [];
    if (/electric/i.test(t)) s.push("As a motorised standing desk, leave slack in monitor and PC cables for the full height range, and keep a tower on the floor or a stand that moves with the desk.");
    if (/L-shaped|reversible/i.test(t)) s.push("Measure the corner first: a reversible L-shaped desk can be set up either way, but the return still needs wall clearance on that side.");
    if (/showcase/i.test(t)) s.push("Putting the PC on the desk shows it off but adds heat and fan noise at ear level; check the stand's size against your case.");
    s.push("Check that the desk depth leaves an arm's length between your eyes and the monitor.");
    return s;
  },
  criteria: [
    { id: "size", title: "Measure the room and your setup", body: "Width decides how many monitors fit; depth decides whether a monitor sits at a comfortable distance. Around 24 inches deep is a practical minimum for one large monitor.\n\nMeasure your monitors, speakers and PC before choosing." },
    { id: "standing", title: "Standing desks need cable slack", body: "Electric desks change height, so every cable to the wall and floor needs slack. Memory presets make switching positions quick.\n\nIf your PC stays on the floor, route cables along a tray that moves with the desk." },
    { id: "stability", title: "Stability and load rating", body: "Thicker desktops and steel frames reduce wobble when you type. A stated load rating tells you whether monitors, arms and a PC are safe on top.\n\nAdd the weight of everything you will place on the desk." },
    { id: "lshape", title: "L-shaped and reversible layouts", body: "L-shaped desks separate a gaming area from a work or streaming area. Reversible designs let you choose which side the return sits on.\n\nThey need more floor space than a straight desk." },
    { id: "extras", title: "Useful extras versus gimmicks", body: "Built-in power outlets, cable trays and monitor shelves help. LED strips and cup holders are mostly style.\n\nPrioritise cable management; it matters every day." },
    { id: "height", title: "Desk height and ergonomics", body: "With your arms relaxed, your elbows should sit roughly level with the desk. Fixed desks suit average heights; adjustable desks suit everyone else.\n\nIf you are much taller or shorter than average, consider an adjustable desk." },
  ],
  faq: [
    { id: "size", q: "What size gaming desk do I need?", a: "Around 48 inches wide fits one or two monitors; 55 inches or more suits multi-monitor setups. Depth matters as much as width." },
    { id: "standing-worth", q: "Is a standing desk worth it for gaming?", a: "It helps if you spend long hours at the desk and want to change position. It costs more and needs cable planning." },
    { id: "pc-on-desk", q: "Should the PC go on the desk?", a: "On the desk shows it off and keeps dust down; on the floor keeps noise and heat away. On a standing desk, the PC must move with it or have long cables." },
    { id: "assembly", q: "How hard are gaming desks to assemble?", a: "Most take 30 to 90 minutes with two people. Electric desks add a control box and motor wiring." },
    { id: "l-shape", q: "Is an L-shaped desk worth it?", a: "If you game and work at the same desk, yes. It separates the two areas but needs a corner and more floor space." },
    { id: "wobble", q: "How do I reduce desk wobble?", a: "Tighten all bolts after a week, keep the desk level, and avoid extending standing desks to their maximum height with heavy loads." },
  ],
  evaluated: [
    { title: "Size", description: "We compared listed width and layout, since they decide how many monitors and peripherals fit." },
    { title: "Stability", description: "We noted desktop thickness, frame type and listed load ratings." },
    { title: "Adjustability", description: "We recorded height ranges and presets for standing desks." },
    { title: "Practical extras", description: "We checked for power outlets, storage and cable management." },
  ],
};

export const deskFacts = withPool(P, [
  F("B0DWMJCQBX", "Veken 55-Inch Electric Standing Desk", "Veken 55-inch", { width: 55, type: "Electric standing", height: "About 28.3 to 46 in", power: "None listed" }, ["a motor rated under 52dB", "memory presets for sitting and standing heights"]),
  F("B0C3M9RD8Q", "SEDETA 67-Inch L-Shaped Gaming Desk with Pegboard", "SEDETA 67-inch", { width: 67, type: "L-shaped, reversible", power: "Power outlet" }, ["a pegboard for accessories", "conversion to a 94.5-inch two-person desk"]),
  F("B0DZWPVRWT", "Huuger 63-Inch L-Shaped Desk", "Huuger 63-inch", { width: 63, capacity: 220, type: "L-shaped, reversible", power: "Power outlets" }, ["a 0.95-inch thick waterproof desktop"]),
  F("B0D9QK989N", "AODK 59-Inch Gaming Desk with PC Showcase Stand", "AODK 59-inch", { width: 59, type: "Reversible with PC showcase stand" }, ["a raised stand for panoramic fish-tank PC cases", "three drawers and a side display shelf"]),
  F("B0FJ1NYG71", "Korfile 48-Inch Gaming Desk", "Korfile 48-inch", { width: 48, type: "Straight", power: "Power outlet" }, ["LED lighting", "a carbon fiber finish"]),
  F("B0B41YH9B6", "ErGear 48 x 24-Inch Electric Standing Desk", "ErGear 48-inch", { width: 48, type: "Electric standing", height: "About 28.35 to 46 in", power: "None listed" }, ["memory presets", "a steel frame"]),
]);

/* ───────────────────────────── Laptop screen extenders ───────────────────────────── */

export const extenderSchema: CategorySchema = {
  id: "screen-extenders",
  plural: "Extenders",
  fields: [
    { key: "screens", label: "Added screens", noun: "number of added screens", better: "higher", superlative: ["most", "fewest"], fmt: (v) => `${v}`, strength: (v) => (Number(v) >= 2 ? "Adds two screens" : "Adds one extra screen"),
      rule: { label: "Most Screen Space", bestFor: ["Laptop users who want a three-screen workspace.", "Traders, analysts and coders who need side-by-side windows."] } },
    { key: "size", label: "Screen size", noun: "screen size", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v} in`, strength: (v) => `${v}-inch screens` },
    { key: "weight", label: "Weight", noun: "weight", better: "lower", superlative: ["lightest", "heaviest"], fmt: (v) => `${v} lb`,
      rule: { label: "Most Portable", bestFor: ["Frequent travellers.", "Carrying the setup between home and office."] } },
    { key: "fits", label: "Fits laptops", fmt: (v) => String(v), strength: (v) => (/d/.test(String(v)) ? `Fits ${v}` : undefined) },
    { key: "panel", label: "Panel", fmt: (v) => String(v), strength: (v) => (/IPS/.test(String(v)) ? `${v} panel` : `${v} resolution`), weakness: (v) => (/60Hz/.test(String(v)) ? "60Hz office panel, not for fast games" : undefined) },
  ],
  compat: (f) => {
    const s = ["Before buying, check that your laptop's USB-C port outputs video (DisplayPort Alt Mode); otherwise you will need an HDMI port and a separate power cable."];
    if (Number(f.specs.screens) >= 2) s.push("Driving two extra screens needs two video outputs or a laptop that supports multiple external displays over one port; many base-model MacBooks support only one external display.");
    if (/stacked/i.test(str(f, "fits"))) s.push("A stacked design adds screens above rather than beside the laptop, which saves desk width.");
    return s;
  },
  criteria: [
    { id: "ports", title: "Check your laptop's video outputs", body: "Screen extenders need video from the laptop, usually over USB-C with DisplayPort Alt Mode or HDMI. Not every USB-C port carries video.\n\nLook for a DisplayPort or Thunderbolt symbol next to the port, or check the laptop's spec sheet." },
    { id: "multi", title: "Triple setups need two outputs", body: "A triple extender adds two screens, which needs two video signals. Some laptops, including many base-model MacBooks, support only one external display.\n\nCheck your laptop's external display limit first." },
    { id: "fit", title: "Match the laptop size range", body: "Extenders clip or rest behind the laptop lid and list a supported size range, such as 13 to 17.3 inches.\n\nMeasure your laptop and check the lid can carry the extra weight." },
    { id: "power", title: "Power draw and battery", body: "Extra screens draw power from the laptop over USB-C, which shortens battery life. Some need a separate power supply.\n\nPlan to stay near an outlet for long sessions." },
    { id: "brightness", title: "Brightness and panel type", body: "IPS panels keep colours consistent at an angle. Portable screens are often dimmer than laptop screens, so brightness figures help if you work near windows." },
    { id: "weight", title: "Weight for travel", body: "Dual extenders weigh around 2 to 3 pounds; triple models more. If you commute with it, weight matters more than size." },
  ],
  faq: [
    { id: "mac", q: "Do screen extenders work with MacBooks?", a: "Yes, over USB-C, but many base-model MacBooks support only one external display, so a triple extender may mirror one screen." },
    { id: "driver", q: "Do I need to install drivers?", a: "Most plug-and-play models need no drivers when connected over USB-C video or HDMI." },
    { id: "power", q: "Can a laptop power a screen extender?", a: "Often, over USB-C, but it drains the battery faster. Some models need extra power, especially with two screens." },
    { id: "fit", q: "Will it fit my laptop?", a: "Check the listed laptop size range and whether your lid can carry the added weight." },
    { id: "portable-vs", q: "Screen extender or portable monitor?", a: "Extenders attach to the laptop for a compact multi-screen setup; a portable monitor stands on its own and is easier to position." },
    { id: "gaming", q: "Are screen extenders good for gaming?", a: "Most are 60Hz office panels. They suit guides, chat and streaming tools rather than the main game." },
  ],
  evaluated: [
    { title: "Screen count and size", description: "We recorded how many screens each model adds and their size." },
    { title: "Portability", description: "We compared listed weight and thickness." },
    { title: "Laptop fit", description: "We noted the supported laptop size range and mounting design." },
    { title: "Panel details", description: "We compared panel type, resolution and brightness where listed." },
  ],
};

export const extenderFacts = withPool(P, [
  F("B0CFKLK9JY", "KEFEYA 14-Inch Laptop Screen Extender", "KEFEYA 14-inch", { screens: 1, size: 14, panel: "1080p IPS, 60Hz" }, ["180-degree rotation for sharing the screen", "plug-and-play setup without drivers"]),
  F("B0GK6VF7WH", "Vixtan 14-Inch Triple Laptop Screen Extender", "Vixtan 14-inch triple", { screens: 2, size: 14, weight: 3.0, fits: "13 to 17.3 in laptops", panel: "1080p IPS" }, ["a 0.3-inch thin body", "height adjustment and 180-degree rotation"]),
  F("B0HC749WS5", "Rizpak 15.6-Inch Triple Laptop Screen Extender", "Rizpak 15.6-inch triple", { screens: 2, size: 15.6, fits: "12 to 17.3 in laptops", panel: "1080p IPS" }, ["a 0.19-inch slim profile", "a freestanding aluminum stand"]),
  F("B0FNRNK72C", "InnoView 15.6-Inch Dual Stacked Portable Monitor", "InnoView dual stacked", { screens: 2, size: 15.6, fits: "Stacked, freestanding", panel: "1920 x 1080" }, ["0 to 315-degree screen rotation", "a foldable design"]),
  F("B0G3X999FY", "14.2-Inch Ultra-Portable Laptop Screen Extender", "14.2-inch ultra-portable", { screens: 1, size: 14.2, weight: 1.87, fits: "14 to 17.3 in laptops", panel: "1080p IPS, 300 nits" }, ["a 226-degree adjustable viewing angle"]),
]);
