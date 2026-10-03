import pool from "@/data/pcj-pool/setup.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 28 mouse pad fact sheets for padSchema: XL, XXL and 3XL desk mats, RGB, glass and waterproof pads, wrist-rest
 * pads and small budget pads. Sizes (inches), thickness (mm) and surface come from the listing titles and bullets and are
 * reviewed by hand; unstated fields stay undefined. Edition-skin duplicates and renewed listings are skipped.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const expand28PadFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  // Cloth and desk mats
  F("B0D1T1HZCC", "SteelSeries QcK XXL", "SteelSeries QcK XXL", { surface: "Micro-woven cloth" }, ["a micro-woven cloth surface tuned for low and high DPI"]),
  F("B00WAA2704", "SteelSeries QcK", "SteelSeries QcK", { surface: "Micro-woven cloth" }, ["a micro-woven cloth surface tuned for low and high DPI"]),
  F("B07DG64YL9", "Razer Goliathus Extended Chroma", "Goliathus Extended Chroma", { surface: "Micro-textured cloth", extra: "Chroma RGB" }, ["16.8 million colours of Chroma RGB lighting"]),
  F("B0B7L3V3NT", "Razer Goliathus Chroma 3XL", "Goliathus Chroma 3XL", { surface: "Micro-textured cloth", extra: "Chroma RGB" }, ["a 3XL desk-sized surface"]),
  F("B088539GLT", "Razer Gigantus V2 Medium", "Gigantus V2 Medium", { thick: 3, surface: "Cloth" }, ["a high-density rubber foam base"]),
  F("B08JH7H1NG", "Corsair MM300 Pro Extended", "MM300 Pro Extended", { width: 36.6, depth: 11.8, thick: 3, surface: "Cloth", edge: "Stitched", extra: "Spill-proof" }, ["a stain-resistant surface", "stitched anti-fray edges"]),
  F("B08QSNNV5H", "Corsair MM700 RGB Extended", "MM700 RGB Extended", { width: 36.6, depth: 15.8, thick: 4, surface: "Cloth", extra: "RGB, two USB ports" }, ["360-degree three-zone RGB lighting", "a built-in two-port USB hub"]),
  F("B0BG53VQ4Y", "Corsair MM700 RGB Extended 3XL", "MM700 RGB 3XL", { width: 48, depth: 24, surface: "Cloth", extra: "RGB" }, ["a 1,220mm x 610mm surface that covers the whole desk"]),
  F("B0BHMKVF1P", "Logitech G640", "Logitech G640", { width: 23.6, depth: 18.1, thick: 3, surface: "Cloth" }, ["a large cloth surface for low-DPI play"]),
  F("B0BHMMH9KM", "Logitech G740", "Logitech G740", { surface: "Cloth" }, ["a thick cushioned build"]),
  F("B01DKTP3PY", "Logitech G440 Hard", "Logitech G440", { surface: "Hard" }, ["a hard surface for high-DPI mice"]),
  F("B08G6C9ZHD", "Glorious Elements Ice XL", "Glorious Elements XL", { width: 17, depth: 15, surface: "Glass-infused cloth" }, ["a flexible glass-infused cloth surface"]),
  F("B0DJ9TTWCR", "Glorious GMP 2 XL", "Glorious GMP 2 XL", { surface: "Micro-weave cloth", edge: "Stitched", extra: "Spill-resistant" }, ["a low-profile stitched edge", "a spill-resistant barrier"]),
  F("B0DJ9VBF4G", "Glorious GMP 2 XXL", "Glorious GMP 2 XXL", { surface: "Micro-weave cloth", edge: "Stitched", extra: "Spill-resistant" }, ["a spill-resistant barrier"]),
  F("B0DJ9RYXMS", "Glorious GMP 2 3XL", "Glorious GMP 2 3XL", { surface: "Micro-weave cloth", edge: "Stitched", extra: "Spill-resistant" }, ["a 3XL desk-sized surface"]),
  F("B0C4ZPBNNV", "Keychron XL Desk Mat", "Keychron XL", { width: 35.4, depth: 15.7, thick: 3, surface: "Micro-weave cloth", edge: "Stitched" }, ["a non-slip rubber base"]),
  F("B0CKMFL9CC", "Waterproof Fabric Desk Pad 31.5 x 15.7", "waterproof desk pad", { width: 31.5, depth: 15.7, surface: "Fabric", extra: "Waterproof" }, ["a waterproof fabric surface"]),
  F("B0CKWYGJJ4", "Rinaze XXL Topographic Mouse Pad", "Rinaze XXL", { width: 35.4, depth: 15.7, surface: "Cloth", edge: "Stitched", extra: "Washable" }, ["flat-stitched anti-fray edges", "a washable surface"]),
  F("B0CKTX5LFX", "LifeTrim Huge 46 x 17 Mouse Pad", "LifeTrim 46in", { width: 46, depth: 17, thick: 5, surface: "Cloth" }, ["a 5mm thick cushioned build"]),
  F("B08RY7FQR1", "Traverse Ridge 46-inch Mouse Pad", "Traverse Ridge 46in", { width: 46, depth: 17.3, thick: 5, surface: "Speed poly", edge: "Stitched", extra: "Water-resistant, washable" }, ["a 6mm stitched edge"]),
  F("B09YY4KXBJ", "Pulsar ParaSpeed v2 XXL", "Pulsar ParaSpeed v2 XXL", { surface: "Speed fabric", extra: "Waterproof" }, ["a fast-glide surface that is easy to clean"]),
  F("B0FTQCQLTQ", "ASUS ROG Sheath II XXL", "ROG Sheath II XXL", { width: 35.4, depth: 15.7, surface: "Cloth", edge: "Stitched" }, ["flat-stitched anti-fray edges"]),
  F("B08LP6YDDM", "ASUS ROG Scabbard II Extended", "ROG Scabbard II Extended", { width: 35.4, depth: 14.7, thick: 3, surface: "Smooth glide", edge: "Stitched", extra: "Water, oil and dust resistant" }, ["flat-stitched edges", "a desk-pad size"]),
  F("B09FDK6VJF", "ASUS ROG Scabbard II Medium", "ROG Scabbard II Medium", { width: 14.2, depth: 10.2, surface: "Smooth glide", edge: "Stitched", extra: "Water, oil and dust resistant" }, ["flat-stitched edges"]),
  // Glass
  F("B0FPLHQB5T", "Esport Tempered Glass Mouse Pad", "tempered glass pad", { thick: 3, surface: "Tempered glass" }, ["a micro-etched tempered glass surface 3mm thick"]),
  F("B0G3756D1M", "Glazir Glass Gaming Mouse Pad", "Glazir glass pad", { width: 13.7, depth: 9.8, surface: "Tempered glass" }, ["a micro-etched tempered glass surface"]),
  F("B0DR4JR11L", "XVX White Glass Mouse Pad 4.0", "XVX glass pad", { surface: "Tempered glass" }, ["a non-slip rubber base", "a micro-etched surface"]),
  // RGB
  F("B07L4BGL3D", "BladeHawks RGB Extended Mouse Pad", "BladeHawks RGB", { width: 31.5, depth: 12, surface: "Micro-textured cloth", extra: "RGB, waterproof" }, ["seven static modes plus effects"]),
  F("B0GLYLLPZ3", "HUADO RGB Mouse Pad", "HUADO RGB", { width: 31.5, depth: 11.8, thick: 4, surface: "Cloth", edge: "Stitched", extra: "RGB, waterproof" }, ["14 light modes", "a one-button controller"]),
  F("B09TP5RG9L", "Gimars RGB Mouse Pad with Wrist Rest", "Gimars RGB wrist rest", { width: 12, depth: 10, extra: "RGB, memory foam wrist rest" }, ["10 RGB lighting modes", "a memory foam wrist rest"]),
  // Wrist rest and small pads
  F("B085XRMSTT", "EooCoo Ergonomic Mouse Pad with Wrist Rest", "EooCoo wrist rest", { extra: "Memory foam wrist rest" }, ["a textured surface with memory foam wrist support"]),
  F("B06X3W3TM4", "Amazon Basics Ergonomic Mouse Pad with Wrist Support", "Amazon Basics wrist support", { extra: "Gel wrist support" }, ["a gel-filled cushion", "a non-slip rubber base"]),
  F("B0G4R1C8F1", "PVIPCZ Sloped Memory Foam Wrist Rest Pad", "PVIPCZ sloped wrist rest", { extra: "Memory foam wrist rest" }, ["a sloped memory foam wrist rest"]),
  F("B0CW1KJ6BF", "TECKNET Small Mouse Pad", "TECKNET small pad", { edge: "Stitched", extra: "Waterproof" }, ["a waterproof coating", "durable stitched edges"]),
  F("B078CQ311V", "MROCO 3-Pack Mouse Pad", "MROCO 3-pack", { width: 11, depth: 8.5, thick: 3, edge: "Stitched", extra: "Waterproof" }, ["three pads in the pack", "reinforced stitched edges"]),
  F("B09DV56338", "Logitech Studio Series Small", "Logitech Studio small", { width: 9, depth: 8, surface: "Fine-weave cloth", edge: "Stitched", extra: "Spill-repellent" }, ["flat-stitched anti-fray edges"]),
]);
