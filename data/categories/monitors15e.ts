import pool from "@/data/pcj-pool/monitors.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { monitors13cFacts } from "./monitors13c";
import { withPool } from "./helpers";

/** Batch 15e monitor fact sheets. Listing claims only, reviewed by hand; unstated fields stay undefined. */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const Q = "2560x1440";

export const monitors15eFacts: Record<string, Fact> = {
  ...monitors13cFacts,
  ...withPool(pool as Pool, [
    F("B0F7KC4XGJ", "CRUA 27-inch QHD 240Hz IPS Gaming Monitor (White)", "CRUA 27 QHD", { size: 27, res: Q, hz: 240, panel: "IPS", gamut: "120% sRGB", sync: "FreeSync" }, ["HDMI 2.0 and DisplayPort 1.4 inputs", "built-in speakers", "a white finish with 75x75mm VESA mounting"]),
    F("B0GT2JP76J", "AOC Q27GAZDV 27-inch QD-OLED Gaming Monitor", "Q27GAZDV", { size: 27, res: Q, hz: 240, panel: "QD-OLED", resp: 0.03, gamut: "110% DCI-P3", sync: "G-SYNC Compatible", stand: "height, tilt, swivel and pivot" }, ["HDMI 2.1 and DisplayPort 1.4 inputs for PC, PS5 and Xbox Series X", "a USB 3.2 hub", "VESA mount compatibility"]),
  ]),
};
