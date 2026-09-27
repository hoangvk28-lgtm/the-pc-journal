import mice from "@/data/pcj-pool/mice.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { mic13eSchema } from "./audio13e";
import { keyboards13cFacts, workKeyboards13cFacts } from "./keyboards13c";
import { mice13cFacts, workMice13cFacts } from "./mice13c";
import { withPool } from "./helpers";

/**
 * Batch 16a fact sheets: Razer wireless mice not yet recorded. Listing claims only, reviewed by hand;
 * a field stays undefined when the maker doesn't state it in the unit the schema uses.
 * Combos, microphones, Bluetooth keyboards and ergonomic mice in batch 16a reuse existing fact sheets.
 */
const P = mice as Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const razerWireless16aFacts: Record<string, Fact> = {
  ...mice13cFacts,
  ...withPool(P, [
    F("B0D4RF55QK", "Razer DeathAdder V3 HyperSpeed Wireless Gaming Mouse", "DeathAdder V3 HyperSpeed", { weight: 55, buttons: 8, dpi: 26000, battery: 100, connection: "HyperSpeed 2.4GHz" }, ["Gen-3 optical switches rated for a 90-million-click lifecycle", "an upgrade path to 8000Hz polling with Razer's HyperPolling Wireless Dongle", "USB-C charging"]),
    F("B0FD5DP9CC", "Razer Cobra HyperSpeed Wireless Gaming Mouse", "Cobra HyperSpeed", { weight: 62, buttons: 9, dpi: 26000, battery: 110, connection: "HyperSpeed 2.4GHz, Bluetooth, USB-C (tri-mode)" }, ["up to 170 hours on Bluetooth", "Gen-4 optical switches rated for over 100 million clicks", "an optical scroll wheel", "wireless charging through the Razer Mouse Dock Pro or Wireless Charging Puck, sold separately"]),
    F("B0FSG67VPX", "Razer Viper V3 Pro SE Wireless Gaming Mouse", "Viper V3 Pro SE", { weight: 54, dpi: 35000, battery: 95, polling: 1000, connection: "HyperSpeed 2.4GHz (USB-A dongle)" }, ["a Focus Pro 35K Gen-2 sensor that tracks on glass", "1-DPI step adjustments", "Gen-3 optical switches rated for 90 million clicks"]),
    F("B0BGJT87N2", "Razer Naga V2 HyperSpeed Wireless MMO Gaming Mouse", "Naga V2 HyperSpeed", { buttons: 19, dpi: 30000, battery: 250, connection: "HyperSpeed 2.4GHz, Bluetooth" }, ["up to 400 hours on Bluetooth", "a HyperScroll wheel with free-spin and tactile modes", "Gen-2 mechanical switches rated for up to 60 million clicks"]),
  ]),
};

/** Microphone schema for batch 16a: adds a con when a listing states no headphone monitoring. */
export const mic16aSchema: CategorySchema = {
  ...mic13eSchema,
  fields: mic13eSchema.fields.map((fd) => (fd.key === "monitor" ? { ...fd, weakness: (v: unknown) => (/none stated/i.test(String(v)) ? "No headphone jack listed" : undefined) } : fd)),
};

/** Bluetooth keyboards: Wave Keys lists "up to 3 years battery life" in its connection bullet. */
export const btKeyboards16aFacts: Record<string, Fact> = (() => {
  const all = { ...keyboards13cFacts, ...workKeyboards13cFacts };
  const w = all.B0BTNY72VD;
  return { ...all, B0BTNY72VD: { ...w, specs: { ...w.specs, battery: 36 } } };
})();

/** Ergonomic mice: the Orbit listing states an ambidextrous design. */
export const ergoMice16aFacts: Record<string, Fact> = (() => {
  const o = workMice13cFacts.B07YVMXLQC;
  return { ...workMice13cFacts, B07YVMXLQC: { ...o, specs: { ...o.specs, grip: "Finger-operated trackball, ambidextrous" } } };
})();
