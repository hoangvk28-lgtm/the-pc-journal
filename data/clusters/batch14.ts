import { build, by, where, tower, within, n, s } from "./batch13a-lib";
import type { Fact } from "@/lib/pc-compose/generic";

/**
 * Batch 14: guru keywords still unwritten after batch 13, built from existing prebuilt facts only.
 * Keywords with no qualifying listings yet (gaming PC under $450, HP OMEN and ASUS roundups, RTX 4070
 * Super systems, PC-and-monitor bundles) wait for new Amazon pool data rather than being padded.
 */

// Streaming beside a game: 32GB or more of RAM, no older six-core chips, in the mainstream price band.
const streaming = (f: Fact) => tower(f) && n(f, "ram") >= 32 && !/Ryzen 5 5\d{3}|i5-1[24]400/.test(s(f, "cpu")) && within(1400, 2400)(f);

export const batch14 = [
  build({
    slug: "best-pcs-for-streaming-and-gaming",
    kw: "pcs for streaming and gaming",
    seo: "Best PCs for Streaming and Gaming",
    h1: "The Best Prebuilt PCs for Streaming and Gaming",
    cands: where(streaming, by.vram),
    count: 5,
    what: "prebuilt PCs for streaming and gaming",
    lead: "Streaming while you play adds an encoder, capture software, a browser and chat on top of the game. These five prebuilt systems between $1,400 and $2,400 each list 32GB of RAM and a graphics card with 16GB of VRAM, so the game and the stream are not fighting over memory.",
    teaser: "Five systems between $1,400 and $2,400 with 32GB of RAM and 16GB graphics cards for playing and streaming at once.",
    close: "If you stream with the graphics card's hardware encoder, the GPU matters as much as the CPU; check which encoder your streaming software uses before choosing.",
    crit: ["memory-storage", "cpu", "gpu"],
    rel: ["best-cpus-for-gaming-and-streaming", "best-gaming-pc-streaming-pc", "best-prebuilt-gaming-pcs"],
  }),
];
