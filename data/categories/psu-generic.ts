import pool from "@/data/pcj-pool/psu.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { psuFacts } from "@/data/pc-facts/psu";
import { withPool } from "./helpers";

/**
 * Generic-composer view of the reviewed PSU fact sheets in data/pc-facts/psu.ts, used by the
 * "power supplies for <GPU>" articles. A native 12V-2x6 cable is only claimed when the fact
 * sheet records hpwr >= 1; otherwise the field stays undefined and is reported as unlisted.
 */
const num = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : undefined);
const effRank: Record<string, number> = { Bronze: 1, Gold: 2, Platinum: 3, Titanium: 4 };

export const psuGenericSchema: CategorySchema = {
  id: "psu-generic",
  plural: "Power supplies",
  fields: [
    { key: "watts", label: "Wattage", noun: "rated output", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v}W`,
      strength: (v) => (Number(v) >= 1000 ? `${v}W of rated output for high-power cards` : `A ${v}W rating`) },
    { key: "hpwr", label: "Native 12V-2x6 cables", noun: "native 12V-2x6 cable count", better: "higher", superlative: ["most", "fewest"], fmt: (v) => String(v),
      strength: (v) => (Number(v) >= 2 ? `${v} native 12V-2x6 cables` : Number(v) === 1 ? "A native 12V-2x6 cable for 16-pin cards" : undefined) },
    { key: "pcie8", label: "PCIe 8-pin connectors", noun: "8-pin PCIe connector count", better: "higher", superlative: ["most", "fewest"], fmt: (v) => String(v),
      strength: (v) => (Number(v) >= 4 ? `${v} PCIe 8-pin connectors for older cards` : undefined) },
    { key: "warranty", label: "Warranty", noun: "warranty", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v} years`,
      strength: (v) => (Number(v) >= 10 ? `A ${v}-year warranty` : undefined), weakness: (v) => (Number(v) <= 5 ? `A shorter ${v}-year warranty` : undefined) },
    { key: "depth", label: "Depth", noun: "depth", better: "lower", superlative: ["shallowest", "deepest"], fmt: (v) => `${v}mm`,
      strength: (v) => (Number(v) <= 140 ? `A short ${v}mm body` : undefined), weakness: (v) => (Number(v) >= 180 ? `A ${v}mm depth needs a roomy PSU bay` : undefined) },
    { key: "eff", label: "80 Plus rating", fmt: (v) => String(v), strength: (v) => (effRank[String(v)] >= 3 ? `80 Plus ${v} efficiency` : undefined), weakness: (v) => (v === "Bronze" ? "Only 80 Plus Bronze efficiency" : undefined) },
    { key: "cyb", label: "Cybenetics rating", fmt: (v) => String(v) },
    { key: "atx", label: "ATX version", fmt: (v) => `ATX ${v}`, strength: (v) => (v === "3.1" ? "ATX 3.1 compliance" : undefined) },
    { key: "form", label: "Form factor", fmt: (v) => String(v) },
    { key: "modular", label: "Cabling", fmt: (v) => (v === "full" ? "Fully modular" : v === "semi" ? "Semi-modular" : "Non-modular"), strength: (v) => (v === "full" ? "Fully modular cables" : undefined), weakness: (v) => (v === "non" ? "Fixed, non-modular cables" : undefined) },
    { key: "fan", label: "Fan", fmt: (v) => `${v}mm` },
    { key: "zero", label: "Fan stop", fmt: (v) => (v ? "Yes" : "No"), strength: (v) => (v ? "A fan that stops at low load" : undefined) },
    { key: "color", label: "Colour", fmt: (v) => (v === "white" ? "White" : "Black") },
  ],
  compat: (f) => {
    const s: string[] = [];
    const n = f.short, h = num(f, "hpwr"), p8 = num(f, "pcie8"), d = num(f, "depth");
    if (h) s.push(`The ${n} comes with ${h === 1 ? "a native 12V-2x6 cable" : `${h} native 12V-2x6 cables`}, so a 16-pin card plugs in without an adapter.`);
    else s.push(`The ${n} has no stated native 12V-2x6 cable; confirm the cable kit before pairing it with a 16-pin card.`);
    if (p8) s.push(`It also has ${p8} PCIe 8-pin connectors for cards that use 8-pin power.`);
    if (d) s.push(`At ${d}mm deep, compare it with your case's PSU clearance before buying.`);
    else s.push(`No depth is rated for the ${n}, so check the maker's page against your case's PSU bay.`);
    return s;
  },
  criteria: [
    { id: "wattage", title: "Start from the card maker's PSU figure", body: "NVIDIA and AMD publish a recommended total system power for each card, and partner cards often state their own. Treat that figure as the floor, then add headroom for a high-power CPU.\n\nMore wattage than you need does not harm anything; it mostly costs money." },
    { id: "connector", title: "Match the power connector", body: "Most RTX 40 and RTX 50 cards use a single 16-pin 12V-2x6 (12VHPWR) plug, while many Radeon cards use two or three 8-pin plugs. A native cable avoids bulky adapters.\n\nPush the 16-pin plug fully home and avoid a sharp bend right at the connector." },
    { id: "atx31", title: "Prefer ATX 3.1", body: "ATX 3.1 units are designed for the brief power spikes modern graphics cards produce and ship with the revised 12V-2x6 connector. Older units can still work, but check the maker's guidance for your card." },
    { id: "efficiency", title: "Compare efficiency ratings", body: "80 Plus and Cybenetics ratings describe how much power turns into heat. Gold is the usual target for a gaming PC; Platinum and Titanium run cooler and cost more." },
    { id: "warranty", title: "Use the warranty as a quality signal", body: "Long warranties of seven to twelve years show how long a maker expects a unit to last. A power supply often moves from one build to the next, so the warranty matters." },
    { id: "fit", title: "Check depth and cabling", body: "Deeper units can clash with drive cages or front radiators. Fully modular cables make routing easier in tight cases." },
  ],
  faq: [
    { id: "adapter", q: "Can I use the 16-pin adapter that came with my graphics card?", a: "Yes, if it is the maker's own adapter and every 8-pin plug on it is connected. A native 12V-2x6 cable is tidier and has fewer joins." },
    { id: "headroom", q: "How much headroom should I leave above the recommended wattage?", a: "The card maker's figure already covers a typical system. Add 100 to 150W if you run a high-power CPU or plan a bigger card later." },
    { id: "atx30", q: "Is an ATX 3.0 power supply still fine?", a: "Generally yes. ATX 3.1 mainly revises the connector to 12V-2x6 and relaxes some spike requirements; check your unit's cable is rated for your card." },
    { id: "sfx", q: "Can I use an SFX power supply?", a: "Yes, if the case supports SFX and the unit meets the wattage and connector needs of your card. SFX units cost more per watt." },
    { id: "old", q: "Can I reuse the power supply from my old PC?", a: "Only if it meets the card's wattage and connector needs and is still under warranty or in good health. Very old units lack modern connectors." },
    { id: "efficiency", q: "Does a Platinum unit save much on electricity?", a: "Only a little for most gaming PCs. The main gains are less heat and often a quieter fan." },
  ],
  evaluated: [
    { title: "Wattage", description: "We compared rated output with NVIDIA's or AMD's recommended system power for the card." },
    { title: "Connectors", description: "We recorded native 12V-2x6 cables and PCIe 8-pin connectors where the listing states them." },
    { title: "Standards", description: "We noted ATX version, 80 Plus and Cybenetics ratings." },
    { title: "Build and warranty", description: "We checked depth, modular cabling, fan-stop modes and warranty length." },
    { title: "Price", description: "We grouped picks by price at the time of writing." },
  ],
};

export const psuGenericFacts = withPool(
  pool as Record<string, { img?: string; price?: string }>,
  psuFacts.map((p) => ({
    asin: p.asin,
    name: p.name,
    short: p.name.replace(/\s*\(.*\)$/, ""),
    specs: {
      watts: p.watts, hpwr: p.hpwr, pcie8: p.pcie8, warranty: p.warrantyYears, depth: p.depthMm,
      eff: p.eff80, cyb: p.cybenetics, atx: p.atx, form: p.form, modular: p.modular, fan: p.fanMm, zero: p.zeroRpm, color: p.color,
    },
    notes: p.notes,
  })),
);
