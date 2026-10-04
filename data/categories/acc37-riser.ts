import pool from "@/data/pcj-pool/acc37-riser.json";
import { withPool } from "./helpers";
import { mkSchema, F } from "./acc37-helpers";

/** PCIe riser cables for vertical GPU mounts. Figures come from each listing's title and bullets. */
export const riserSchema37 = mkSchema("pcie-riser", "PCIe Riser Cables", [
  { key: "gen", label: "PCIe generation", noun: "PCIe generation", better: "higher", superlative: ["newest", "oldest"], fmt: (v) => `PCIe ${v}.0 x16`, rule: { label: "Newest PCIe Generation", bestFor: ["Gen 5 graphics cards in a vertical mount.", "Builds that should not drop below a card's native link speed."] }, strength: (v) => `A PCIe ${v}.0 x16 link` },
  { key: "len", label: "Cable length", noun: "length", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v}mm` },
  { key: "angle", label: "Connector", fmt: (v) => String(v), strength: (v) => `${v} connector` },
  { key: "shield", label: "Shielding", fmt: (v) => String(v), strength: (v) => `${v} shielding` },
  { key: "bw", label: "Stated bandwidth", fmt: (v) => String(v) },
], (f, all) => {
  const s = ["Measure from the motherboard slot to the card's connector with a string before ordering; a cable that is too short will not reach, and a very long one adds bends."];
  const gen = Number(f.specs.gen ?? 0);
  if (gen === 4) s.push("This is a PCIe 4.0 cable. A PCIe 5.0 graphics card on it will run at Gen 4 speed, which costs little in most games.");
  if (gen === 5) s.push("A Gen 5 cable also works with Gen 4 and Gen 3 cards at their native speed, but it costs more than a Gen 4 cable.");
  if (all.length) s.push("Check that your case's vertical mount bracket leaves room for the cable to bend, and that the slot is the CPU-connected x16 slot.");
  return s;
}, [
  ["Match the generation to the card", "A PCIe 4.0 riser limits a Gen 5 card to Gen 4 speed. Most current games lose very little, but a Gen 5 card in a Gen 5 slot should use a Gen 5 cable."],
  ["Length and routing", "Measure the path, not the straight distance. Longer cables bend more and can be harder to seat cleanly."],
  ["Shielding protects the signal", "High-speed PCIe lanes are sensitive to interference. Look for stated EMI shielding."],
  ["Connector angle", "Right-angle and dual-90 connectors suit different case layouts. Check which way the cable must leave the slot."],
  ["Use the CPU-connected slot", "A riser behind a chipset slot can lose bandwidth. Use the primary x16 slot wired to the CPU."],
], [
  ["Do riser cables reduce GPU performance?", "A well-made one at the correct PCIe generation costs little or nothing. A cheap or mismatched one can cause dropouts or force a lower link speed."],
  ["Does my case support a vertical GPU?", "Only if it has the vertical bracket and slot spacing. A riser alone does not make a case vertical-capable."],
  ["Is PCIe 5.0 needed for a 4.0 card?", "No. A Gen 4 card is fully served by a Gen 4 riser."],
  ["Can a riser cable damage my GPU?", "Seat both ends fully and use shielded cables. Never hot-swap a riser while the PC is powered."],
  ["How long a cable do I need?", "Mid-tower vertical mounts usually need about 200mm. Measure your own case to be sure."],
], [
  ["PCIe generation", "We recorded the generation each listing states."],
  ["Cable length and connector", "We noted length and connector angle."],
  ["Shielding", "We checked for stated EMI shielding."],
  ["Compatibility notes", "We checked listed GPU and platform notes."],
]);

export const riser37Facts = withPool(pool as Record<string, { img?: string; price?: string }>, [
  F("B0BJBG13P7", "GLOTRENDS 200mm PCIe 4.0 x16 GPU Riser Cable", "GLOTRENDS 200mm", { gen: 4, len: 200, angle: "90-degree right-angle", shield: "foil-wrapped differential pairs", bw: "32GB/s per direction, by the listing" }, ["30AWG silver-plated copper conductors", "slide-on installation with no drivers", "no hot swapping"]),
  F("B0C415JCHX", "GLOTRENDS 300mm PCIe 4.0 x16 GPU Riser Cable", "GLOTRENDS 300mm", { gen: 4, len: 300, angle: "90-degree right-angle", shield: "foil-wrapped differential pairs", bw: "32GB/s per direction, by the listing" }, ["extra length for full-tower and custom-loop builds", "30AWG silver-plated copper conductors", "backward compatibility with PCIe 3.0 slots"]),
  F("B0BMGFT7S3", "Corsair Premium PCIe 4.0 x16 Extension Cable 300mm", "Corsair PCIe 4.0 300mm", { gen: 4, len: 300, angle: "90-degree female", shield: "EMI shielded" }, ["a right-angle connector that limits cable strain", "backward compatibility with PCIe 3.0 systems", "Corsair's vertical-mount design"]),
  F("B0DFSBTDCD", "Thermaltake PCIe 4.0 Dual 90-Degree Riser Cable 400mm", "Thermaltake 400mm", { gen: 4, len: 400, angle: "dual 90-degree", shield: "EMI shielded" }, ["a flat cable layout from the dual-angle connectors", "a 3-year warranty", "a 16Gbps rated transmission"]),
  F("B0D9VSN5HY", "Thermaltake PCIe 4.0 Dual 90-Degree Riser Cable 130mm", "Thermaltake 130mm", { gen: 4, len: 130, angle: "dual 90-degree", shield: "EMI shielded" }, ["a short run that minimises bending", "a 3-year warranty", "support for AMD and Intel boards in vertical mounts"]),
  F("B0FJYLM8G8", "LINKUP PCIe 5.0 Riser Cable (20cm, right angle)", "LINKUP PCIe 5.0 20cm", { gen: 5, len: 200, angle: "right-angle", shield: "multilayer shielding", bw: "128GB/s on PCIe 5.0 x16, by the listing" }, ["use with PCIe 4.0 and RX 9070 or RTX 5090 cards, by the listing", "other lengths and connector shapes sold in the same line", "tuned impedance and premium conductors"]),
  F("B0GV53X4CN", "Corsair Premium PCIe 5.0 x16 Riser Cable 175mm", "Corsair PCIe 5.0 175mm", { gen: 5, len: 175, angle: "right-angle", bw: "128GB/s, by the listing" }, ["an ultra-flexible ribbon cable", "a right-angle connector that mounts with two bolts", "a length meant to stay tidy rather than long"]),
  F("B0FX2RZ1MR", "JEYI PCIe 5.0 Riser Cable Vertical GPU Mount", "JEYI PCIe 5.0", { gen: 5, angle: "90 or 180 degree bend", shield: "anti-EMI shielded 29AWG", bw: "128GB/s, by the listing" }, ["a 6-layer PCB with gold-plated pins", "a soft cable that bends 90 or 180 degrees without kinking", "backward compatibility with older PCIe generations"]),
  F("B0GY4LFD83", "RGEEK PCIe 5.0 Riser Cable x16 200mm", "RGEEK PCIe 5.0 200mm", { gen: 5, len: 200, angle: "right-angle", shield: "multi-layer shielding", bw: "128GB/s, validated by a 3DMark PCI Express test, by the listing" }, ["a PC+ABS housing", "a 24cm overall length including connectors", "NVIDIA, AMD and Intel GPU support"]),
  F("B0GYSPN5MY", "ELECNEXUS PCIe 4.0 x16 Riser Cable 100mm", "ELECNEXUS 100mm", { gen: 4, len: 100, shield: "triple-layer EMI shielding", bw: "64GB/s bidirectional, by the listing" }, ["a thickened 6-layer PCB", "75W power delivery through a reinforced 40-pin connector", "gold-plated contacts"]),
]);
