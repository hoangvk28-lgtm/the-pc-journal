import chairs from "@/data/pcj-pool/chairs.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { chair13dFacts } from "./chairs13d";
import { withPool } from "./helpers";

/** Batch 15c chair fact sheets: chairs whose listings state adjustable or built-in lumbar support. Listing claims only. */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const chairs15cFacts: Record<string, Fact> = {
  ...chair13dFacts,
  ...withPool(chairs as Record<string, { img?: string; price?: string }>, [
    F("B0DXS1BVCB", "Razer Iskur V2 X Ergonomic Gaming Chair (Light Gray)", "Iskur V2 X Light Gray", { recline: 152, arms: "2D", lumbar: "Built-in arch", material: "Fabric" }, ["an integrated lumbar arch in the backrest", "a widened seat base with reduced edges", "high-density contoured foam cushions"]),
    F("B0H2XNYVQP", "marrap Ergonomic Office Chair", "marrap", { recline: 120, arms: "3D flip-up", lumbar: "Adjustable up/down and forward/back", material: "Mesh" }, ["lumbar support that moves up, down, forward and back", "3D armrests that flip up, slide and rotate 360 degrees", "a mesh back and seat"]),
    F("B0CQLJ32TC", "MUXX.STIL Ergonomic Mesh Office Chair", "MUXX.STIL", { capacity: 264, arms: "Flip-up (90°)", lumbar: "Adjustable cushion", material: "Mesh" }, ["a 15-year warranty", "an adjustable lumbar cushion on an S-shaped backrest", "a U-shaped seat with a waterfall edge"]),
    F("B0CQD3K8PJ", "TRALT Ergonomic Mesh Office Chair", "TRALT mesh", { capacity: 330, seat: "17.7 to 21.7 in", lumbar: "Depth-adjustable", material: "Mesh" }, ["lumbar support that adjusts in depth", "a Class 3 BIFMA-certified gas lift and a metal-core base", "a 19.7 inch wide, 17.3 inch deep seat and a 2-year warranty"]),
    F("B0H8P4FFSG", "DUMOS Executive Mesh Office Chair", "DUMOS executive", { capacity: 300, recline: 120, arms: "Flip-up", lumbar: "Adjustable up/down (mesh)", material: "Mesh" }, ["a headrest adjustable in height and by 42 degrees", "mesh lumbar support that slides up and down", "flip-up armrests"]),
  ]),
};
