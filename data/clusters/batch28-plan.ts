import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 28 keyword plan: per-game GPU and CPU guides from the PCGameCheck list. Each game's official Steam requirements
 * live in data/game-requirements.ts; the guide compares its picks with that list. Filters are matched to the game's
 * recommended tier and each entry has its own price band or sort so the product sets differ.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const chip = (f: Fact, r: RegExp) => r.test(s(f, "chip"));
const nv = (f: Fact) => chip(f, /^RTX/);
const nv4050 = (f: Fact) => chip(f, /^RTX (40|50)/);
const amd = (f: Fact) => chip(f, /^RX/);
const modern = (f: Fact) => chip(f, /^(RTX (40|50)|RX (7|9)|Arc B)/);
const sock = (f: Fact, r: RegExp) => r.test(s(f, "socket"));
const E = (slug: string, kw: string, g: PlanItem["g"], where: PlanItem["where"], sort: string, seo: string, lead: string, close: string): PlanItem => ({ slug, kw, g, where, sort, seo, lead, close });

export const PLAN: PlanItem[] = [
  // ---------------- GPUs by game ----------------
  E("best-gpu-for-god-of-war", "gpu for god of war", "gpu", (f) => n(f, "vram") >= 8 && p(f) <= 300, "price", "Best GPUs for God of War",
    "God of War's recommended tier names a 6GB card, so 8GB of video memory leaves headroom for higher texture settings. Every pick has at least 8GB and cost $300 or less, ordered from the lowest price.", "Check that your power supply has the PCIe connectors the card needs before you order."),
  E("best-gpu-for-god-of-war-ragnarok", "gpu for god of war ragnarok", "gpu", (f) => nv(f) && n(f, "vram") >= 8 && p(f) > 300 && p(f) <= 450, "-price", "Best GPUs for God of War Ragnarok",
    "God of War Ragnarök supports DLSS, FSR and XeSS upscaling, and its recommended tier sits at the RTX 2060 Super level. Every pick is an RTX card with at least 8GB of video memory that cost between $300 and $450.", "Open the game's upscaling menu first; it is the cheapest way to add headroom."),
  E("best-gpu-for-the-last-of-us-part-i", "gpu for the last of us part i", "gpu", (f) => n(f, "vram") >= 12 && p(f) <= 520, "price", "Best GPUs for The Last of Us Part I",
    "The Last of Us Part I names 8GB of video memory for its recommended tier, and higher texture presets use more. Every pick has at least 12GB and cost $520 or less, ordered from the lowest price.", "Watch the in-game memory meter when you raise texture quality."),
  E("best-gpu-for-ghost-of-tsushima", "gpu for ghost of tsushima", "gpu", (f) => chip(f, /^RX (7|9)/) && p(f) >= 270 && p(f) <= 650, "-price", "Best GPUs for Ghost of Tsushima",
    "Ghost of Tsushima lists an RTX 2060 or RX 5600 XT as its recommended card and supports FSR 3 as well as DLSS. Every pick is a Radeon RX 7000 or 9000 series card that cost between $270 and $650.", "Frame generation needs a decent base frame rate, so judge it after you lower a few settings."),
  E("best-gpu-for-indiana-jones-and-the-great-circle", "gpu for indiana jones and the great circle", "gpu", (f) => modern(f) && !chip(f, /^RX 76/) && n(f, "vram") >= 12 && p(f) >= 450 && p(f) <= 900, "price", "Best GPUs for Indiana Jones Great Circle",
    "Indiana Jones and the Great Circle requires a card with hardware ray tracing, and its recommended tier names an RTX 3080 Ti or RX 7700 XT. Every pick has at least 12GB of video memory and cost between $450 and $900.", "Confirm the card's ray tracing support on the maker's page rather than assuming it."),
  E("best-gpu-for-kingdom-come-deliverance-ii", "gpu for kingdom come deliverance ii", "gpu", (f) => chip(f, /^(RTX (4070|5070)|RX (7800|9070))/) && p(f) <= 850, "-vram", "Best GPUs for Kingdom Come: Deliverance II",
    "Kingdom Come: Deliverance II lists an RTX 4070 or RX 7800 XT for its recommended tier alongside 32GB of system memory. Every pick is an RTX 4070, RTX 5070, RX 7800 or RX 9070 class card that cost $850 or less, ordered by video memory.", "Plan for 32GB of system RAM too, since the game's recommended tier asks for it."),
  E("best-gpu-for-monster-hunter-world", "gpu for monster hunter world", "gpu", (f) => nv(f) && n(f, "vram") >= 8 && p(f) <= 260, "price", "Best GPUs for Monster Hunter World",
    "Monster Hunter: World dates from 2018 and its recommended tier names a GTX 1060, so the card matters less than a steady frame rate on a full-screen monitor. Every pick is an RTX card with at least 8GB that cost $260 or less.", "A modest card is enough here; spend leftover budget on a faster monitor or an SSD."),
  E("best-gpu-for-resident-evil-2", "gpu for resident evil 2", "gpu", (f) => chip(f, /^(Arc|RX (6|76))/) && p(f) <= 330, "price", "Best GPUs for Resident Evil 2",
    "Resident Evil 2 recommends a GTX 1060 or RX 480 class card. Every pick is an Intel Arc or older-generation Radeon card that cost $330 or less, ordered from the lowest price.", "Check the card's driver support for older DirectX 11 games before buying a first-generation Arc."),
  E("best-gpu-for-dead-space-2023", "gpu for dead space 2023", "gpu", (f) => n(f, "vram") >= 16 && p(f) <= 600, "price", "Best GPUs for Dead Space",
    "The 2023 Dead Space remake is DirectX 12 only and recommends an RTX 2070 or RX 6700 XT class card. Every pick carries 16GB of video memory and cost $600 or less, ordered from the lowest price.", "Confirm your Windows version is up to date, since the game requires DirectX 12."),
  E("best-gpu-for-marvels-spider-man-remastered", "gpu for marvels spider man remastered", "gpu", (f) => nv4050(f) && p(f) >= 330 && p(f) <= 650, "price", "Best GPUs for Spider-Man Remastered",
    "Marvel's Spider-Man Remastered lists a GTX 1060 6GB or RX 580 8GB for its recommended tier. Every pick is an RTX 40 or 50 series card that cost between $330 and $650.", "Turn ray-traced reflections on last; they are the setting that asks the most of the card."),
  E("best-gpu-for-sekiro", "gpu for sekiro", "gpu", (f) => p(f) <= 230, "-price", "Best GPUs for Sekiro",
    "Sekiro: Shadows Die Twice recommends a GTX 970 or RX 570, so even entry-level current cards clear its list. Every pick cost $230 or less, ordered from the highest price.", "Compare the card with the recommended GTX 970 or RX 570 before paying more."),
  E("best-gpu-for-hitman-world-of-assassination", "gpu for hitman world of assassination", "gpu", (f) => (amd(f) || chip(f, /^Arc/)) && p(f) > 250 && p(f) <= 520, "price", "Best GPUs for Hitman World of Assassination",
    "Hitman World of Assassination recommends a GTX 1070 or RX Vega 56, so most current mid-range cards clear that tier. Every pick is a Radeon RX or Intel Arc card that cost between $250 and $520.", "Check the recommended 16GB of system RAM as well as the card."),
  E("best-gpu-for-half-life-alyx", "gpu for half life alyx", "gpu", (f) => n(f, "vram") >= 12 && p(f) >= 380 && p(f) <= 700, "-vram", "Best GPUs for Half-Life: Alyx",
    "Half-Life: Alyx runs on SteamVR and lists a GTX 1660 or RX Vega 56 for its recommended tier. Every pick has at least 12GB of video memory and cost between $380 and $700, ordered by memory.", "Check your headset's own requirements; some need a DisplayPort or USB-C video output."),
  E("best-gpu-for-metaphor-refantazio", "gpu for metaphor refantazio", "gpu", (f) => n(f, "vram") >= 8 && p(f) > 230 && p(f) <= 330, "-price", "Best GPUs for Metaphor: ReFantazio",
    "Metaphor: ReFantazio lists a GTX 970, RX 480 or Arc A380 with 4GB for its recommended tier. Every pick has at least 8GB of video memory and cost between $230 and $330, ordered from the highest price.", "The game requires a CPU with AVX support, which any recent processor has."),
  E("best-gpu-for-persona-3-reload", "gpu for persona 3 reload", "gpu", (f) => chip(f, /^RTX (30|40|50)/) && p(f) <= 300, "-vram", "Best GPUs for Persona 3 Reload",
    "Persona 3 Reload recommends a GTX 1650 or R9 290X with 4GB of video memory, so a current RTX entry card is plenty. Every pick is an RTX 30, 40 or 50 series card that cost $300 or less.", "Keep the money for a controller or monitor; the game is light on the graphics card."),
  E("best-gpu-for-deathloop", "gpu for deathloop", "gpu", (f) => amd(f) && n(f, "vram") >= 12 && p(f) <= 520, "-price", "Best GPUs for Deathloop",
    "Deathloop lists an RTX 2060 or RX 5700 for its recommended tier. Every pick is a Radeon RX card with at least 12GB of video memory that cost $520 or less.", "Compare the card with the recommended RTX 2060 or RX 5700 first."),
  E("best-gpu-for-devil-may-cry-5", "gpu for devil may cry 5", "gpu", (f) => nv(f) && p(f) >= 200 && p(f) <= 330, "price", "Best GPUs for Devil May Cry 5",
    "Devil May Cry 5 recommends a GTX 1060 6GB or RX 480 8GB and Capcom suggests an Xinput gamepad. Every pick is an RTX card that cost between $200 and $330, ordered from the lowest price.", "Plug in an Xinput-compatible controller; the game is built around one."),
  E("best-gpu-for-hi-fi-rush", "gpu for hi fi rush", "gpu", (f) => (amd(f) || chip(f, /^Arc/)) && n(f, "vram") >= 8 && p(f) <= 260, "price", "Best GPUs for Hi-Fi Rush",
    "Hi-Fi Rush lists an RTX 2070, RX 6600 or Arc A750 for its recommended tier. Every pick is a Radeon RX or Intel Arc card with at least 8GB of video memory that cost $260 or less.", "Check the card against the recommended RTX 2070, RX 6600 or Arc A750 first."),
  E("best-gpu-for-psychonauts-2", "gpu for psychonauts 2", "gpu", (f) => nv(f) && p(f) <= 250, "price", "Best GPUs for Psychonauts 2",
    "Psychonauts 2 recommends a GTX 1060 or RX 580 with 6GB of video memory. Every pick is an RTX card that cost $250 or less, ordered from the lowest price.", "Check that the card has at least 6GB; some entry cards carry less."),
  E("best-gpu-for-the-talos-principle-2", "gpu for the talos principle 2", "gpu", (f) => n(f, "vram") >= 12 && p(f) >= 300 && p(f) <= 550, "-vram", "Best GPUs for The Talos Principle 2",
    "The Talos Principle 2 recommends 8GB or more of video memory and an RTX 3070, RX 6800 or Arc B580 class card. Every pick has at least 12GB and cost between $300 and $550, ordered by memory.", "The game does not support Intel integrated graphics, so a discrete card is required."),
  E("best-gpu-for-dragons-dogma-2", "gpu for dragons dogma 2", "gpu", (f) => modern(f) && n(f, "vram") >= 12 && p(f) >= 450 && p(f) <= 800, "-price", "Best GPUs for Dragon's Dogma 2",
    "Dragon's Dogma 2 lists an RTX 2080 or RX 6700 for its recommended tier and a stronger card for ray tracing. Every pick has at least 12GB of video memory and cost between $450 and $800.", "Treat ray tracing as optional and test the base settings first."),
  E("best-gpu-for-satisfactory", "gpu for satisfactory", "gpu", (f) => (nv(f) || amd(f)) && n(f, "vram") >= 8 && p(f) <= 420, "-vram", "Best GPUs for Satisfactory",
    "Satisfactory recommends an RTX 2070 or RX 5700. Every pick is an RTX or Radeon RX card with at least 8GB of video memory that cost $420 or less.", "Check the recommended 16GB of system RAM as well as the card."),

  // ---------------- CPUs by game ----------------
  E("best-cpu-for-red-dead-redemption-2", "cpu for red dead redemption 2", "cpu", (f) => n(f, "cores") >= 6 && p(f) <= 200, "price", "Best CPUs for Red Dead Redemption 2",
    "Red Dead Redemption 2 lists a quad-core Core i7-4770K or Ryzen 5 1500X for its recommended tier. Every pick has at least six cores and cost $200 or less, ordered from the lowest price.", "Check the board's socket and BIOS version before buying a processor from a newer generation."),
  E("best-cpu-for-resident-evil-4-2023", "cpu for resident evil 4 2023", "cpu", (f) => n(f, "cores") >= 6 && p(f) > 150 && p(f) <= 270, "-boost", "Best CPUs for Resident Evil 4",
    "The Resident Evil 4 remake recommends a Ryzen 5 3600 or Core i7-8700 with 16GB of RAM. Every pick has at least six cores and cost between $150 and $270, ordered by boost clock.", "Pair the processor with a card from the same price tier so neither holds the other back."),
  E("best-cpu-for-dragons-dogma-2", "cpu for dragons dogma 2", "cpu", (f) => n(f, "cores") >= 8 && (sock(f, /AM5/) || sock(f, /LGA1700/)) && p(f) <= 350, "price", "Best CPUs for Dragon's Dogma 2",
    "Dragon's Dogma 2 recommends 16GB of RAM and names a Core i7-10700 or Ryzen 5 3600X. Every pick has at least eight cores on an AM5 or LGA1700 socket and cost $350 or less.", "Pair the processor with fast DDR5 or well-timed DDR4 to match the board you choose."),
  E("best-cpu-for-satisfactory", "cpu for satisfactory", "cpu", (f) => n(f, "cores") >= 6 && sock(f, /AM4/) && !/5500/.test(f.name) && p(f) <= 300, "-cores", "Best CPUs for Satisfactory",
    "Satisfactory lists a Ryzen 5 5600X or Core i5-12400 with six physical cores for its recommended tier, and big factories add simulation load. Every pick is an AM4 processor with at least six cores that cost $300 or less.", "AM4 boards need a BIOS update for some of the newer chips, so check your board's support list."),
  E("best-cpu-for-total-war-warhammer-ii", "cpu for total war warhammer ii", "cpu", (f) => n(f, "cores") >= 8 && p(f) >= 250, "-cores", "Best CPUs for Total War: Warhammer II",
    "Total War: Warhammer II lists a Core i5-4570 for its recommended tier, so any current processor clears it. Every pick has at least eight cores and cost $250 or more, ordered by core count.", "Compare core counts and boost clocks together before picking."),
  E("best-cpu-for-crusader-kings-iii", "cpu for crusader kings iii", "cpu", (f) => n(f, "cores") >= 6 && sock(f, /LGA1700/) && p(f) <= 250, "price", "Best CPUs for Crusader Kings III",
    "Crusader Kings III lists a Core i5-4670K or Ryzen 5 2400G for its recommended tier. Every pick is an LGA1700 processor with at least six cores that cost $250 or less.", "Compare boost clocks as well as core counts."),
  E("best-cpu-for-europa-universalis-iv", "cpu for europa universalis iv", "cpu", (f) => n(f, "cores") >= 6 && sock(f, /AM4/), "-boost", "Best CPUs for Europa Universalis IV",
    "Europa Universalis IV lists a Core i3 3240 or FX 8120 for its recommended tier. Every pick is an AM4 processor with at least six cores, ordered by boost clock.", "Compare boost clocks as well as core counts."),
  E("best-cpu-for-ghost-of-tsushima", "cpu for ghost of tsushima", "cpu", (f) => n(f, "cores") >= 6 && sock(f, /AM5/) && p(f) <= 300, "price", "Best CPUs for Ghost of Tsushima",
    "Ghost of Tsushima lists a Core i5-8600 or Ryzen 5 3600 for its recommended tier. Every pick is an AM5 processor with at least six cores that cost $300 or less, ordered from the lowest price.", "AM5 boards use DDR5 only, so budget for the memory as well."),
  E("best-cpu-for-the-last-of-us-part-i", "cpu for the last of us part i", "cpu", (f) => n(f, "cores") >= 8 && sock(f, /LGA1700/) && p(f) <= 400, "price", "Best CPUs for The Last of Us Part I",
    "The Last of Us Part I lists a Ryzen 5 3600X or Core i7-8700 for its recommended tier with 16GB of RAM. Every pick is an LGA1700 processor with at least eight cores that cost $400 or less.", "Keep the install on an SSD, which the game recommends."),
  E("best-cpu-for-god-of-war", "cpu for god of war", "cpu", (f) => n(f, "cores") >= 6 && p(f) <= 170, "-cores", "Best CPUs for God of War",
    "God of War lists a Core i5-6600K or Ryzen 5 2400G for its recommended tier. Every pick has at least six cores and cost $170 or less, ordered by core count.", "At this price, check that the board you already own supports the processor before ordering."),
  E("best-cpu-for-the-witcher-3", "cpu for the witcher 3", "cpu", (f) => n(f, "cores") >= 6 && f.specs.igpu === true && p(f) <= 200, "price", "Best CPUs for The Witcher 3",
    "The Witcher 3 lists a Core i5-7400 or Ryzen 5 1600 for its recommended tier with 8GB of RAM. Every pick has at least six cores and integrated graphics and cost $200 or less.", "Integrated graphics let you start the PC before a graphics card arrives."),
  E("best-cpu-for-mass-effect-legendary-edition", "cpu for mass effect legendary edition", "cpu", (f) => n(f, "cores") >= 8 && (sock(f, /AM5/) || sock(f, /LGA1700/)) && p(f) <= 260, "-boost", "Best CPUs for Mass Effect Legendary Edition",
    "Mass Effect Legendary Edition lists a Core i7-7700 or Ryzen 7 3700X for its recommended tier. Every pick has at least eight cores on an AM5 or LGA1700 socket and cost $260 or less, ordered by boost clock.", "Keep the 120GB install on an SSD; the trilogy loads noticeably faster from one."),
  E("best-cpu-for-street-fighter-6", "cpu for street fighter 6", "cpu", (f) => n(f, "cores") >= 6 && sock(f, /LGA1700/) && p(f) > 150 && p(f) <= 350, "-price", "Best CPUs for Street Fighter 6",
    "Street Fighter 6 lists a Core i7-8700 or Ryzen 5 3600 for its recommended tier. Every pick is an LGA1700 processor with at least six cores that cost between $150 and $350.", "Check the board socket and BIOS before ordering."),
];
