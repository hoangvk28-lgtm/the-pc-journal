import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 34: per-game CPU and GPU guides, monitors / PSUs / cases by graphics card, coolers by processor and motherboards by processor.
 * Requirements for the games live in data/game-requirements.ts. Every entry has its own filter and sort so the product sets differ.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const sock = (f: Fact, r: RegExp) => r.test(s(f, "socket"));
const chip = (f: Fact, r: RegExp) => r.test(s(f, "chip"));
const E = (slug: string, kw: string, g: PlanItem["g"], where: PlanItem["where"], sort: string, seo: string, lead: string, close: string): PlanItem => ({ slug, kw, g, where, sort, seo, lead, close });
const am5 = (f: Fact) => sock(f, /AM5/);
const cores = (f: Fact) => n(f, "cores");

export const PLAN: PlanItem[] = [
  // ---------------- CPUs by game ----------------
  E("best-cpus-for-valorant", "cpu for valorant", "cpu", (f) => cores(f) >= 6 && p(f) <= 180, "-boost", "Best CPUs for Valorant",
    "Valorant is a light, CPU-bound shooter where clock speed and a steady frame time matter more than core count. Every pick has at least six cores and cost $180 or less, ordered by boost clock.", "Check your board's socket and BIOS version before ordering a processor."),
  E("best-cpus-for-league-of-legends", "cpu for league of legends", "cpu", (f) => cores(f) >= 6 && f.specs.igpu === true && p(f) <= 330, "-boost", "Best CPUs for League of Legends",
    "League of Legends runs mostly on one or two fast cores, so even entry processors handle it. Every pick has at least six cores and integrated graphics and cost $330 or less, ordered by boost clock.", "Integrated graphics let you test the PC before a graphics card arrives."),
  E("best-cpus-for-gta-v", "cpu for gta v", "cpu", (f) => cores(f) >= 6 && sock(f, /AM4|LGA1700/) && p(f) <= 220, "-cores", "Best CPUs for GTA V",
    "GTA V dates from 2015 and leans on a few fast cores, with extra threads helping the busy city scenes of Los Santos. Every pick is an AM4 or LGA1700 processor with at least six cores that cost $220 or less, ordered by core count.", "Check the board's socket and BIOS version before ordering, especially for an older AM4 board."),
  E("best-cpus-for-hogwarts-legacy", "cpu for hogwarts legacy", "cpu", (f) => cores(f) >= 8 && am5(f) && p(f) <= 300, "-boost", "Best CPUs for Hogwarts Legacy",
    "Hogwarts Legacy lists a Core i7-8700 or Ryzen 5 3600 and 16GB of RAM for its recommended tier. Every pick is an AM5 processor with at least eight cores that cost $300 or less, ordered by boost clock.", "AM5 boards use DDR5 only, so budget for the memory as well."),
  E("best-cpus-for-starfield", "cpu for starfield", "cpu", (f) => cores(f) >= 8 && sock(f, /AM5|LGA1851/) && p(f) <= 340, "-cores", "Best CPUs for Starfield",
    "Starfield lists a Ryzen 5 3600X or Core i5-10600K for its recommended tier, and its busy cities add processor load. Every pick has at least eight cores on an AM5 or LGA1851 socket and cost $340 or less, ordered by core count.", "Plan for 16GB of RAM, which the recommended tier lists."),
  E("best-cpus-for-palworld", "cpu for palworld", "cpu", (f) => cores(f) >= 6 && sock(f, /LGA1700/) && p(f) <= 260, "-boost", "Best CPUs for Palworld",
    "Palworld lists a Core i5-12400 or Ryzen 5 5600X with 32GB of RAM for its recommended tier. Every pick is an LGA1700 processor with at least six cores that cost $260 or less, ordered by boost clock.", "Check the board's BIOS version before pairing it with a 14th-generation chip."),
  E("best-cpus-for-marvel-rivals", "cpu for marvel rivals", "cpu", (f) => cores(f) >= 8 && (am5(f) || sock(f, /LGA1851/)) && p(f) <= 520, "-l3", "Best CPUs for Marvel Rivals",
    "Marvel Rivals lists a Core i5-10400 or Ryzen 5 5600X for its recommended tier. Every pick has at least eight cores on an AM5 or LGA1851 socket and cost $520 or less, ordered by L3 cache.", "Match the processor to your card's price tier so neither holds the other back."),
  E("best-cpus-for-path-of-exile-2", "cpu for path of exile 2", "cpu", (f) => cores(f) >= 8 && am5(f) && p(f) > 200, "-l3", "Best CPUs for Path of Exile 2",
    "Path of Exile 2 lists a Core i5-10500 or Ryzen 5 3700X for its recommended tier, and larger caches add headroom. Every pick is an AM5 processor with at least eight cores that cost more than $200, ordered by L3 cache.", "Plan for 16GB of RAM, which the recommended tier lists."),
  E("best-cpus-for-monster-hunter-wilds", "cpu for monster hunter wilds", "cpu", (f) => cores(f) >= 10 && sock(f, /LGA1700|LGA1851/) && p(f) <= 340, "price", "Best CPUs for Monster Hunter Wilds",
    "Monster Hunter Wilds lists a Core i5-10400 or Ryzen 5 3600 as its minimum processor and 16GB of RAM. Every pick is an LGA1700 or LGA1851 processor with at least ten cores that cost $340 or less, ordered from the lowest price.", "Confirm the board's chipset and BIOS support the chip generation you pick."),
  E("best-cpus-for-black-myth-wukong", "cpu for black myth wukong", "cpu", (f) => cores(f) >= 6 && sock(f, /AM4/) && p(f) <= 350, "-l3", "Best CPUs for Black Myth: Wukong",
    "Black Myth: Wukong lists a Ryzen 5 5500 or Core i7-9700 for its recommended tier, so AM4 chips can carry it. Every pick is an AM4 processor with at least six cores that cost $350 or less, ordered by L3 cache.", "AM4 boards may need a BIOS update for newer chips, so check the support list."),
  E("best-cpus-for-diablo-4", "cpu for diablo 4", "cpu", (f) => cores(f) >= 6 && sock(f, /LGA1700|AM4/) && p(f) <= 330, "price", "Best CPUs for Diablo 4",
    "Diablo IV's recommended tier lists a Core i5-4670K or Ryzen 1300X with 16GB of RAM, so any chip here clears it. Every pick is an LGA1700 or AM4 processor with at least six cores that cost $330 or less, ordered from the lowest price.", "Plan for 16GB of RAM, which is the recommended tier's figure."),
  E("best-cpus-for-stalker-2", "cpu for stalker 2", "cpu", (f) => cores(f) >= 8 && sock(f, /AM5|LGA1851/) && p(f) > 230, "-boost", "Best CPUs for S.T.A.L.K.E.R. 2",
    "S.T.A.L.K.E.R. 2 lists a Ryzen 7 5800X or Core i7-11700 with 32GB of RAM. Every pick has at least eight cores on an AM5 or LGA1851 socket and cost more than $230, ordered by boost clock.", "Plan for 32GB of RAM, which is the recommended tier's figure."),

  // ---------------- GPUs by game ----------------
  E("best-gpus-for-overwatch-2", "gpu for overwatch 2", "gpu", (f) => chip(f, /^(RTX (30|40|50)|RX (6|7|9)|Arc B)/) && n(f, "vram") >= 8 && p(f) <= 480, "-vram", "Best GPUs for Overwatch 2",
    "Overwatch 2 recommends a GTX 1060 or Arc A770 class card, so current entry cards clear it comfortably. Every pick has at least 8GB of video memory and cost $480 or less, ordered by video memory.", "Pair the card with a 144Hz or faster monitor to use it in a competitive shooter."),
  E("best-gpus-for-valorant", "gpu for valorant", "gpu", (f) => p(f) <= 250 && n(f, "vram") >= 6, "-price", "Best GPUs for Valorant",
    "Valorant is a light shooter, so an entry card is enough and a high-refresh monitor does more for the experience. Every pick has at least 6GB of video memory and cost $250 or less, ordered from the highest price.", "Spend leftover budget on a monitor with a high refresh rate rather than a faster card."),
  E("best-gpus-for-fortnite", "gpu for fortnite", "gpu", (f) => chip(f, /^(RTX (40|50)|RX (7|9))/) && n(f, "vram") >= 8 && p(f) > 280 && p(f) <= 600, "-vram", "Best GPUs for Fortnite",
    "Fortnite supports DLSS, FSR and hardware Lumen ray tracing, so card choice depends on the settings you want. Every pick is an RTX 40 or 50 series or Radeon RX 7000 or 9000 series card that cost between $280 and $600, ordered by video memory.", "Test Fortnite's Performance and DirectX 12 modes before deciding you need a faster card."),

  // ---------------- Monitors by graphics card or game ----------------
  E("best-gaming-monitors-for-counter-strike-2", "gaming monitor for counter-strike 2", "monitor", (f) => /1920x1080|2560x1440/.test(s(f, "res")) && n(f, "hz") >= 240 && p(f) <= 400, "-hz", "Best Gaming Monitors for Counter-Strike 2",
    "Counter-Strike 2 players tend to favour high refresh rates and fast response over resolution. Every pick is a 1080p or 1440p monitor at 240Hz or more that cost $400 or less, ordered by refresh rate.", "Use DisplayPort and set the refresh rate in Windows, not just in the game."),
  E("best-gaming-monitors-for-apex-legends", "gaming monitor for apex legends", "monitor", (f) => /2560x1440/.test(s(f, "res")) && n(f, "hz") >= 144 && n(f, "hz") <= 240 && /IPS/.test(s(f, "panel")), "price", "Best Gaming Monitors for Apex Legends",
    "Apex Legends is fast and its fights are close range, so a smooth 1440p IPS screen helps you track targets. Every pick is a 1440p IPS monitor between 144Hz and 240Hz, ordered from the lowest price.", "Cap the game's frame rate a few frames below the refresh rate to keep it smooth."),
  E("best-gaming-monitors-for-rtx-5070", "gaming monitor for rtx 5070", "monitor", (f) => /2560x1440/.test(s(f, "res")) && n(f, "hz") >= 165 && p(f) > 250 && p(f) <= 600, "-price", "Best Gaming Monitors for RTX 5070",
    "The RTX 5070 is a 1440p card, and a 165Hz or faster 1440p screen lets it show its frame rates. Every pick is a 1440p monitor at 165Hz or more that cost between $250 and $600.", "Use DisplayPort to get the full refresh rate and G-SYNC Compatible support."),
  E("best-gaming-monitors-for-rtx-5070-ti", "gaming monitor for rtx 5070 ti", "monitor", (f) => /3840x2160|3440x1440|5120x1440/.test(s(f, "res")) && n(f, "hz") >= 144 && p(f) <= 700, "price", "Best Gaming Monitors for RTX 5070 Ti",
    "The RTX 5070 Ti handles 4K with upscaling and ultrawide 1440p natively. Every pick is a 4K or ultrawide 1440p monitor at 144Hz or more that cost $700 or less, ordered from the lowest price.", "Turn on DLSS at 4K when a game falls below your monitor's refresh rate."),
  E("best-gaming-monitors-for-rx-9070-xt", "gaming monitor for rx 9070 xt", "monitor", (f) => /FreeSync/.test(s(f, "sync")) && /2560x1440|3440x1440/.test(s(f, "res")) && n(f, "hz") >= 240, "-hz", "Best Gaming Monitors for RX 9070 XT",
    "The RX 9070 XT supports FreeSync, and a 1440p or ultrawide screen at 240Hz gives it a target for its frame rates. Every pick lists FreeSync at 240Hz or more on a 1440p or 3440x1440 panel, ordered by refresh rate.", "Use DisplayPort and enable FreeSync in the Radeon driver."),
  E("best-gaming-monitors-for-rtx-4070", "gaming monitor for rtx 4070", "monitor", (f) => /2560x1440/.test(s(f, "res")) && /G-SYNC/.test(s(f, "sync")) && n(f, "hz") >= 144 && p(f) <= 350, "price", "Best Gaming Monitors for RTX 4070",
    "The RTX 4070 is a 1440p card, and a G-SYNC Compatible monitor keeps the picture smooth when frame rates dip. Every pick is a 1440p monitor listing G-SYNC at 144Hz or more that cost $350 or less.", "Enable G-SYNC in the NVIDIA Control Panel and use DisplayPort."),

  // ---------------- PSUs by graphics card ----------------
  E("best-power-supplies-for-rx-9070-xt", "psu for rx 9070 xt", "psu", (f) => n(f, "watts") >= 850 && n(f, "watts") <= 1000 && n(f, "pcie8") >= 3 && f.specs.form === "ATX", "price", "Best Power Supplies for RX 9070 XT",
    "AMD recommends a 750W power supply for the RX 9070 XT, and many partner cards use three 8-pin connectors. Every pick is an ATX unit of 850W to 1000W with at least three 8-pin PCIe connectors, ordered from the lowest price.", "Count the 8-pin connectors your card needs against the cables the unit includes."),
  E("best-power-supplies-for-rx-9070", "psu for rx 9070", "psu", (f) => n(f, "watts") >= 750 && n(f, "watts") <= 850 && n(f, "pcie8") >= 2 && f.specs.form === "ATX", "-warranty", "Best Power Supplies for RX 9070",
    "AMD recommends 650W for the RX 9070, so 750W to 850W leaves headroom for a hungry processor. Every pick is an ATX unit of 750W to 850W with at least two 8-pin PCIe connectors, ordered by warranty length.", "Use separate PCIe cables for each 8-pin plug where the unit provides them."),
  E("best-power-supplies-for-rtx-5060-ti", "psu for rtx 5060 ti", "psu", (f) => n(f, "watts") >= 650 && n(f, "watts") <= 750 && f.specs.form === "ATX" && p(f) <= 100, "price", "Best Power Supplies for RTX 5060 Ti",
    "NVIDIA recommends a 600W power supply for the RTX 5060 Ti, so 650W to 750W leaves room for the rest of the build. Every pick is an ATX unit of 650W to 750W that cost $100 or less, ordered from the lowest price.", "Check whether your card uses an 8-pin or a 16-pin connector before you order."),
  E("best-power-supplies-for-rtx-5060", "psu for rtx 5060", "psu", (f) => n(f, "watts") >= 550 && n(f, "watts") <= 650 && f.specs.form === "ATX" && p(f) <= 80, "-watts", "Best Power Supplies for RTX 5060",
    "NVIDIA recommends 550W for the RTX 5060, and a unit at or slightly above that fits a budget build. Every pick is an ATX unit of 550W to 650W that cost $80 or less, ordered by wattage.", "Check the card's power connector against the cables in the box."),
  E("best-power-supplies-for-rx-9060-xt", "psu for rx 9060 xt", "psu", (f) => n(f, "watts") >= 550 && n(f, "watts") <= 750 && n(f, "warranty") >= 7, "price", "Best Power Supplies for RX 9060 XT",
    "AMD recommends 500W for the RX 9060 XT, so a 550W to 750W unit leaves a margin. Every pick is a 550W to 750W unit with at least a seven-year warranty, ordered from the lowest price.", "Match the 8-pin or 16-pin connector on your partner card to the unit's cables."),

  // ---------------- Cases by graphics card ----------------
  E("best-pc-cases-for-rtx-5060-ti", "pc case for rtx 5060 ti", "pcCase", (f) => n(f, "gpu") >= 300 && n(f, "volume") > 0 && n(f, "volume") <= 25, "price", "Best PC Cases for RTX 5060 Ti",
    "RTX 5060 Ti cards are short next to high-end models, so compact cases work well. Every pick lists at least 300mm of graphics card clearance in a case of 25 litres or less, ordered from the lowest price.", "Measure your exact card's length against the clearance figure."),
  E("best-pc-cases-for-rx-9070", "pc case for rx 9070", "pcCase", (f) => n(f, "gpu") >= 340 && n(f, "fans") >= 3 && p(f) <= 120, "-gpu", "Best PC Cases for RX 9070",
    "Many RX 9070 partner cards run 300mm or more and fill a thick triple-fan cooler. Every pick lists at least 340mm of graphics card clearance and three or more fans, and cost $120 or less.", "Check the card's length and slot width on the maker's page before choosing a case."),

  // ---------------- Coolers by processor ----------------
  E("best-cpu-coolers-for-ryzen-7-9800x3d", "cooler for ryzen 7 9800x3d", "aio", (f) => /AM5/.test(s(f, "sockets")) && n(f, "rad") >= 280, "-rad", "Best CPU Coolers for Ryzen 7 9800X3D",
    "The Ryzen 7 9800X3D uses the AM5 socket, and a 280mm or larger liquid cooler spreads its heat over a bigger radiator. Every pick lists AM5 support and a radiator of 280mm or more, ordered by radiator size.", "Confirm the radiator fits your case before you order."),
  E("best-cpu-coolers-for-core-ultra-7-265k", "cooler for core ultra 7 265k", "air", (f) => /LGA1851/.test(s(f, "sockets")) && n(f, "pipes") >= 5 && !/chromax/i.test(f.name), "-pipes", "Best CPU Coolers for Core Ultra 7 265K",
    "The Core Ultra 7 265K uses the LGA1851 socket, and its 20 cores give a cooler real work. Every pick lists LGA1851 support and at least five heat pipes, ordered by heat pipe count.", "Check that the cooler ships with the LGA1851 mounting kit."),
  E("best-cpu-coolers-for-core-ultra-9-285k", "cooler for core ultra 9 285k", "aio", (f) => /LGA1851/.test(s(f, "sockets")) && n(f, "rad") >= 280, "-fanRpm", "Best CPU Coolers for Core Ultra 9 285K",
    "The Core Ultra 9 285K has 24 cores and benefits from a large radiator. Every pick lists LGA1851 support and a 280mm or larger radiator, ordered by fan speed.", "Check that the cooler's mounting kit lists LGA1851."),
  E("best-cpu-coolers-for-ryzen-9-9950x3d", "cooler for ryzen 9 9950x3d", "aio", (f) => /AM5/.test(s(f, "sockets")) && n(f, "rad") >= 360, "-pumpRpm", "Best CPU Coolers for Ryzen 9 9950X3D",
    "The Ryzen 9 9950X3D has 16 cores and sustained loads reward a 360mm radiator. Every pick lists AM5 support and a 360mm or larger radiator, ordered by pump speed.", "Check your case supports a 360mm radiator at the front or top."),

  // ---------------- Motherboards by processor ----------------
  E("best-motherboards-for-ryzen-5-9600x", "motherboard for ryzen 5 9600x", "mb", (f) => s(f, "socket") === "AM5" && /B650|B850/.test(s(f, "chipset")) && p(f) <= 200, "price", "Best Motherboards for Ryzen 5 9600X",
    "The Ryzen 5 9600X is a six-core chip, so a B650 or B850 board is a sensible match. Every pick is an AM5 board with a B650 or B850 chipset that cost $200 or less, ordered from the lowest price.", "Check the board's BIOS supports Ryzen 9000 before you order."),
  E("best-motherboards-for-ryzen-7-9700x", "motherboard for ryzen 7 9700x", "mb", (f) => s(f, "socket") === "AM5" && /B850|B650E/.test(s(f, "chipset")) && n(f, "m2") >= 3, "-m2", "Best Motherboards for Ryzen 7 9700X",
    "The Ryzen 7 9700X pairs well with a B850 or B650E board that has room for several drives. Every pick is an AM5 board with B850 or B650E and at least three M.2 slots, ordered by M.2 slot count.", "Confirm Ryzen 9000 support in the board's CPU list."),
  E("best-motherboards-for-ryzen-9-9900x", "motherboard for ryzen 9 9900x", "mb", (f) => s(f, "socket") === "AM5" && /X870|X670E/.test(s(f, "chipset")) && n(f, "lan") >= 2.5, "price", "Best Motherboards for Ryzen 9 9900X",
    "The 12-core Ryzen 9 9900X suits an X870 or X670E board with strong power delivery. Every pick is an AM5 board with X870 or X670E and 2.5G LAN or faster, ordered from the lowest price.", "Check the board's power stage and cooling if you plan to overclock."),
  E("best-motherboards-for-ryzen-9-9950x3d", "motherboard for ryzen 9 9950x3d", "mb", (f) => s(f, "socket") === "AM5" && n(f, "lan") >= 5 && /Wi-Fi 7/.test(s(f, "wifi")), "-m2", "Best Motherboards for Ryzen 9 9950X3D",
    "The Ryzen 9 9950X3D is a 16-core chip, and a board with 5G LAN and Wi-Fi 7 keeps the rest of the platform at its level. Every pick is an AM5 board with 5G LAN and Wi-Fi 7, ordered by M.2 slot count.", "Verify the board's BIOS lists support for the 9950X3D."),
  E("best-motherboards-for-core-ultra-5-245k", "motherboard for core ultra 5 245k", "mb", (f) => s(f, "socket") === "LGA1851" && p(f) <= 230, "price", "Best Motherboards for Core Ultra 5 245K",
    "The Core Ultra 5 245K needs an LGA1851 board, which uses DDR5 memory. Every pick is an LGA1851 board that cost $230 or less, ordered from the lowest price.", "Check the board's chipset: only Z890 boards support overclocking."),
  E("best-motherboards-for-core-ultra-7-265k", "motherboard for core ultra 7 265k", "mb", (f) => s(f, "socket") === "LGA1851" && /Z890/.test(s(f, "chipset")) && p(f) > 230, "-m2", "Best Motherboards for Core Ultra 7 265K",
    "The Core Ultra 7 265K is an unlocked chip, so a Z890 board lets you tune it. Every pick is an LGA1851 Z890 board that cost more than $230, ordered by M.2 slot count.", "Confirm the board's memory support list for the DDR5 kit you plan to use."),
];
