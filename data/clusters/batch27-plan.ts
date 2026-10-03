import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 27 keyword plan (guru sitemaps 24-27). Most of that list repeats guides the site already has (held in
 * docs/batch27-held-keywords.md). This plan keeps keywords with a distinct intent that the reviewed fact sheets can
 * support: per-game GPU picks, GPU memory and price tiers, CPU price tiers, motherboard feature tiers, and a few
 * peripheral niches. Each entry has its own filter or sort.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const nv = (f: Fact) => /^RTX/.test(s(f, "chip"));
const nv4050 = (f: Fact) => /^RTX (40|50)/.test(s(f, "chip"));
const amd = (f: Fact) => /^RX/.test(s(f, "chip"));
const E = (slug: string, kw: string, g: PlanItem["g"], where: PlanItem["where"], sort: string, seo: string, lead: string, close: string): PlanItem => ({ slug, kw, g, where, sort, seo, lead, close });

export const PLAN: PlanItem[] = [
  // GPUs by game
  E("best-gpu-for-cyberpunk-2077", "gpu for cyberpunk 2077", "gpu", (f) => nv4050(f) && n(f, "vram") >= 12 && p(f) <= 1500, "-vram", "Best GPUs for Cyberpunk 2077",
    "Cyberpunk 2077's path-traced Overdrive mode runs only on RTX cards, and DLSS frame generation decides how playable it is. Every pick is an RTX 40 or 50 series card with at least 12GB of video memory that cost $1,500 or less, ordered by memory.", "Test the ray-tracing presets with DLSS on before raising the resolution."),
  E("best-gpu-for-alan-wake-2", "gpu for alan wake 2", "gpu", (f) => nv4050(f) && n(f, "vram") >= 16 && p(f) <= 1300, "price", "Best GPUs for Alan Wake 2",
    "Alan Wake 2 needs a card with mesh shader support and offers path tracing on RTX hardware. Every pick is an RTX 40 or 50 series card with 16GB of video memory that cost $1,300 or less, ordered from the lowest price.", "Check the game's mesh shader requirement before reusing an older card."),
  E("best-gpu-for-black-myth-wukong", "gpu for black myth wukong", "gpu", (f) => /^RTX (4070|4080|5070|5080)/.test(s(f, "chip")) && p(f) <= 1100, "-price", "Best GPUs for Black Myth: Wukong",
    "Black Myth: Wukong is an Unreal Engine 5 game with a built-in benchmark and heavy ray-tracing options. Every pick is an RTX 4070, 4080, 5070 or 5080 class card that cost $1,100 or less, ordered from the highest price.", "Run the in-game benchmark tool after each settings change to see the real gain."),
  E("best-gpu-for-counter-strike-2", "gpu for counter strike 2", "gpu", (f) => p(f) <= 350 && n(f, "vram") >= 8, "-price", "Best GPUs for Counter-Strike 2",
    "Counter-Strike 2 on Source 2 depends heavily on the CPU, so a modest card is enough for high refresh rates. Every pick cost $350 or less and has at least 8GB of video memory.", "Spend leftover budget on the processor and a high-refresh monitor."),
  E("best-gpu-for-diablo-4", "gpu for diablo 4", "gpu", (f) => p(f) > 250 && p(f) <= 520 && n(f, "vram") >= 8, "-vram", "Best GPUs for Diablo 4",
    "Diablo 4's high texture packs use plenty of video memory, so memory size matters more than clock speed. Every pick cost between $250 and $520 and has at least 8GB, ordered by memory.", "Install the high-resolution texture pack only if your card has the memory for it."),
  E("best-gpu-for-elden-ring", "gpu for elden ring", "gpu", (f) => p(f) <= 450 && n(f, "vram") >= 8 && /RX|Arc|RTX/.test(s(f, "chip")), "price", "Best GPUs for Elden Ring",
    "Elden Ring is locked to 60fps and has no DLSS, so a mid-range card is enough. Every pick cost $450 or less and has at least 8GB of video memory, ordered from the lowest price.", "Mind the frame cap; a faster card will not raise it, so put the savings elsewhere."),
  E("best-gpu-for-final-fantasy-xiv", "gpu for final fantasy xiv", "gpu", (f) => amd(f) && p(f) <= 700 && n(f, "vram") >= 8, "price", "Best GPUs for Final Fantasy XIV",
    "Final Fantasy XIV runs on a wide range of hardware, so a Radeon card is a straightforward match. Every pick is a Radeon RX card that cost $700 or less, ordered from the lowest price.", "Lower the crowd density setting in cities if frame rates drop."),
  E("best-gpu-for-helldivers-2", "gpu for helldivers 2", "gpu", (f) => /^RX 90|^RTX 50/.test(s(f, "chip")) && n(f, "vram") >= 12 && p(f) <= 850, "-vram", "Best GPUs for Helldivers 2",
    "Helldivers 2 fills the screen with enemies and effects, and it supports both DLSS and FSR upscaling. Every pick is an RTX 50 or RX 9000 series card with at least 12GB of video memory that cost $850 or less.", "Use the game's upscaling options before cutting texture quality."),
  E("best-gpu-for-hogwarts-legacy", "gpu for hogwarts legacy", "gpu", (f) => n(f, "vram") >= 16 && p(f) <= 900, "-price", "Best GPUs for Hogwarts Legacy",
    "Hogwarts Legacy uses a lot of video memory in the castle and open world, especially with ray tracing on. Every pick has 16GB of video memory and cost $900 or less, ordered from the highest price.", "Keep ray tracing on medium; the gain on high costs a lot of frame rate."),
  E("best-gpu-for-marvel-rivals", "gpu for marvel rivals", "gpu", (f) => nv4050(f) && p(f) > 350 && p(f) <= 800, "-price", "Best GPUs for Marvel Rivals",
    "Marvel Rivals is an Unreal Engine 5 hero shooter that supports DLSS upscaling and frame generation. Every pick is an RTX 40 or 50 series card that cost between $350 and $800, ordered from the highest price.", "Turn on DLSS and check input latency if you also enable frame generation."),
  E("best-gpu-for-microsoft-flight-simulator", "gpu for microsoft flight simulator", "gpu", (f) => n(f, "vram") >= 16, "-vram", "Best GPUs for Flight Simulator",
    "Microsoft Flight Simulator streams large photogrammetry scenes, so video memory is the first limit. Every pick has 16GB or more of video memory, ordered by memory size with the largest first.", "Pair the card with a fast CPU; the sim is often CPU-bound over cities."),
  E("best-gpu-for-minecraft-rtx", "gpu for minecraft rtx", "gpu", (f) => nv(f) && n(f, "vram") >= 12 && p(f) <= 800, "price", "Best GPUs for Minecraft RTX",
    "Minecraft RTX adds path-traced lighting that only works on NVIDIA RTX cards. Every pick is an RTX card with at least 12GB of video memory that cost $800 or less, ordered from the lowest price.", "Combine a lower render distance with DLSS to keep ray tracing playable."),
  E("best-gpu-for-monster-hunter-wilds", "gpu for monster hunter wilds", "gpu", (f) => (nv4050(f) || /^RX 9/.test(s(f, "chip"))) && n(f, "vram") >= 16 && p(f) <= 1000, "-price", "Best GPUs for Monster Hunter Wilds",
    "Monster Hunter Wilds is demanding for its visuals and recommends frame generation to hold 60fps. Every pick has 16GB of video memory, is an RTX 40/50 or RX 9000 card and cost $1,000 or less.", "Use upscaling and frame generation as the game suggests before cutting textures."),
  E("best-gpu-for-path-of-exile-2", "gpu for path of exile 2", "gpu", (f) => p(f) > 300 && p(f) <= 600 && n(f, "vram") >= 12, "price", "Best GPUs for Path of Exile 2",
    "Path of Exile 2 stacks particle effects in late-game maps, which stress both the GPU and the CPU. Every pick has at least 12GB of video memory and cost between $300 and $600.", "Reduce effect density in the settings for smoother endgame maps."),
  E("best-gpu-for-resident-evil-4-remake", "gpu for resident evil 4 remake", "gpu", (f) => n(f, "vram") >= 10 && p(f) <= 500, "-vram", "Best GPUs for Resident Evil 4 Remake",
    "The Resident Evil 4 remake shows a video memory warning in its menu and needs more with ray tracing on. Every pick has 10GB or more and cost $500 or less, ordered by memory.", "Watch the in-game memory bar when choosing texture quality."),
  E("best-gpu-for-spider-man-2", "gpu for spider man 2", "gpu", (f) => nv4050(f) && n(f, "vram") >= 12 && p(f) > 450 && p(f) <= 1000, "-price", "Best GPUs for Spider-Man 2",
    "Spider-Man 2's PC release uses ray-traced reflections across a dense city, so it rewards RTX hardware. Every pick is an RTX 40 or 50 series card with 12GB or more that cost between $450 and $1,000.", "Lower the ray-tracing object range if you see stutter while swinging."),
  E("best-gpu-for-stalker-2", "gpu for stalker 2", "gpu", (f) => n(f, "vram") >= 16 && p(f) <= 1000 && /RX 9|RTX 50/.test(s(f, "chip")), "price", "Best GPUs for S.T.A.L.K.E.R. 2",
    "S.T.A.L.K.E.R. 2 is a demanding Unreal Engine 5 game with a large open zone. Every pick is an RTX 50 or RX 9000 series card with 16GB of video memory that cost $1,000 or less, ordered from the lowest price.", "Use temporal upscaling to keep frame rates up in the open zone."),
  E("best-gpu-for-street-fighter-6", "gpu for street fighter 6", "gpu", (f) => p(f) <= 280 && n(f, "vram") >= 6, "-vram", "Best GPUs for Street Fighter 6",
    "Street Fighter 6 is capped at 60fps, so frame rate stability matters more than raw power. Every pick cost $280 or less and has at least 6GB of video memory, ordered by memory.", "Use a wired connection and a fixed 60Hz mode for online matches."),
  E("best-gpu-for-tekken-8", "gpu for tekken 8", "gpu", (f) => p(f) > 280 && p(f) <= 460 && n(f, "vram") >= 8, "price", "Best GPUs for Tekken 8",
    "Tekken 8 is a locked-60 fighting game on Unreal Engine 5 that looks best at high texture settings. Every pick cost between $280 and $460 and has at least 8GB of video memory.", "Run the game at your monitor's native resolution to keep character models sharp."),
  E("best-gpu-for-vr-gaming", "gpu for vr gaming", "gpu", (f) => n(f, "vram") >= 12 && p(f) <= 1300 && (nv4050(f) || /^RX 9/.test(s(f, "chip"))), "-price", "Best GPUs for VR Gaming",
    "VR renders two views at high refresh rates, so frame rate headroom matters more than in flat gaming. Every pick has at least 12GB of video memory and cost $1,300 or less, ordered from the highest price.", "Check your headset's connection port and cable against the card's outputs."),
  E("best-gpu-for-world-of-warcraft", "gpu for world of warcraft", "gpu", (f) => p(f) <= 350 && n(f, "vram") >= 8 && /RX|RTX/.test(s(f, "chip")), "-price", "Best GPUs for World of Warcraft",
    "World of Warcraft depends more on CPU speed than on the graphics card, particularly in raids. Every pick cost $350 or less with at least 8GB, so more of the budget can go to the processor.", "Cap the frame rate and use DirectX 12 for smoother raids."),
  E("best-gpu-for-video-editing-and-gaming", "gpu for video editing gaming", "gpu", (f) => nv(f) && n(f, "vram") >= 16, "-vram", "Best GPUs for Gaming and Video Editing",
    "NVIDIA cards add hardware encoding that speeds up exports in popular editors, which helps when one PC handles both jobs. Every pick is an RTX card with 16GB or more of video memory, ordered by memory.", "Confirm that your editing software supports the card's encoder before you buy."),
  // GPU tiers
  E("best-gpus-with-dlss", "gpus with dlss", "gpu", (f) => nv(f) && p(f) <= 600, "-vram", "Best GPUs with DLSS",
    "DLSS upscaling lifts frame rates on RTX cards, and the RTX 50 series adds multi frame generation. Every pick is an NVIDIA RTX card that cost $600 or less, ordered by video memory.", "Check which DLSS version a game supports; frame generation needs an RTX 40 or 50 card."),
  E("best-8gb-gpus", "8gb gpus", "gpu", (f) => n(f, "vram") === 8, "price", "Best 8GB GPUs",
    "An 8GB card is a fair match for 1080p gaming at medium to high settings. Every pick has exactly 8GB of video memory, ordered from the lowest price.", "Choose a 16GB model of the same chip if you plan to move to 1440p."),
  E("best-gpus-under-1000", "gpus under 1000", "gpu", (f) => p(f) <= 1000 && p(f) > 700, "-vram", "Best GPUs Under $1,000",
    "Between $700 and $1,000 you reach the top of the 1440p range and the entry to 4K gaming. Every pick cost more than $700 and up to $1,000 when we checked, ordered by video memory.", "Check the card's length and power connectors against your case and power supply."),
  E("best-gpus-under-1500", "gpus under 1500", "gpu", (f) => p(f) <= 1500 && p(f) > 1000, "-price", "Best GPUs Under $1,500",
    "Between $1,000 and $1,500 you buy high-end RTX 5070 Ti and RTX 5080 class cards for 4K gaming. Every pick cost more than $1,000 and up to $1,500, ordered from the highest price.", "Plan for a 12V-2x6 connector and a power supply that meets the card's recommendation."),
  E("best-gpus-with-high-fps", "gpus with high fps", "gpu", (f) => nv4050(f) && n(f, "vram") >= 12 && p(f) > 600 && p(f) <= 1200, "price", "Best GPUs for High FPS Gaming",
    "High frame rates come from a fast card paired with a 144Hz or faster monitor. Every pick is an RTX 40 or 50 series card with at least 12GB of video memory that cost between $600 and $1,200, ordered from the lowest price.", "Use DLSS or frame generation in supported games for extra headroom."),
  // CPUs
  E("best-cpus-with-integrated-graphics", "cpus with integrated graphics", "cpu", (f) => f.specs.igpu === true && s(f, "socket") !== "LGA1151", "price", "Best CPUs with Integrated Graphics",
    "A processor with integrated graphics lets you boot and use the PC before buying a graphics card. Every pick has integrated graphics, ordered from the lowest price.", "Check the motherboard's video outputs before relying on integrated graphics."),
  // Motherboards
  E("best-motherboards-with-pcie-5-0", "motherboards with pcie 5 0", "mb", (f) => /X870|B850|X670E|B650E|Z890/.test(s(f, "chipset")), "price", "Best Motherboards with PCIe 5.0",
    "A PCIe 5.0 board prepares you for Gen 5 SSDs and next-generation graphics cards. Every pick uses an X870, B850, X670E, B650E or Z890 chipset, ordered from the lowest price.", "A Gen 5 SSD also needs a CPU and BIOS that support it; check the board's M.2 slot notes."),
  E("best-motherboards-for-esports", "motherboards for esports", "mb", (f) => p(f) <= 190 && /Wi-Fi/.test(s(f, "wifi")), "price", "Best Motherboards for Esports",
    "An esports build needs a stable board with fast networking rather than extra expansion. Every pick has built-in Wi-Fi and cost $190 or less, ordered from the lowest price.", "Use the wired LAN port for matches; keep Wi-Fi for backup."),
  E("best-motherboards-for-multitasking", "motherboards for multitasking", "mb", (f) => n(f, "m2") >= 4, "-m2", "Best Motherboards for Multitasking",
    "Running several apps and drives at once is easier with more M.2 slots and connectivity. Every pick has four or more M.2 slots, ordered by slot count.", "Check which M.2 slots share bandwidth before filling them all."),
  E("best-ddr5-motherboards", "ddr5 motherboards", "mb", (f) => /DDR5/.test(s(f, "mem")) || /AM5|LGA1851/.test(s(f, "socket")), "-lan", "Best DDR5 Motherboards",
    "DDR5 boards use faster memory and are the path on current AMD and Intel platforms. Every pick supports DDR5 memory, ordered by LAN port count.", "Match the memory kit's speed and XMP or EXPO profile to the board's supported list."),
  E("best-intel-motherboards-for-gaming", "intel motherboard for gaming", "mb", (f) => /LGA/.test(s(f, "socket")) && s(f, "form") === "ATX", "-m2", "Best Intel Motherboards for Gaming",
    "An Intel gaming build starts with the socket, LGA1700 for 12th to 14th gen or LGA1851 for Core Ultra. Every pick is a full-size ATX Intel board, ordered by M.2 slot count.", "Check your CPU generation against the socket and BIOS version before buying."),
  E("best-x870-motherboards-for-ryzen-9-9950x3d", "x870 gaming mobo for 9950x3d", "mb", (f) => /X870/.test(s(f, "chipset")) && n(f, "m2") >= 3, "-m2", "Best X870 Boards for Ryzen 9 9950X3D",
    "The Ryzen 9 9950X3D pulls a lot of power under load, so VRM quality and M.2 capacity matter. Every pick is an X870 or X870E board with three or more M.2 slots, ordered by slot count.", "Update the BIOS if the board predates your processor."),
  // PSUs
  E("best-psus-for-home-office", "psus for home office", "psu", (f) => n(f, "watts") <= 750 && f.specs.zero === true, "price", "Best PSUs for Home Office PCs",
    "An office PC spends most of its time at low load, so a zero-RPM fan mode keeps it quiet. Every pick is 750W or less and lists a zero-RPM fan mode, ordered from the lowest price.", "Size the wattage to your parts; a larger unit than needed does not help."),
  E("best-psus-for-esports", "psus for esports", "psu", (f) => n(f, "watts") >= 650 && n(f, "watts") <= 850 && /Gold|Platinum/.test(s(f, "eff")) && s(f, "modular") === "full", "-warranty", "Best PSUs for Esports PCs",
    "An esports PC pairs a mid-range card with a fast CPU, so 650 to 850W is the usual range. Every pick is fully modular with an 80 Plus Gold or Platinum rating, ordered by warranty length.", "Use the separate PCIe cables supplied for the GPU instead of one daisy-chained lead."),
  // SSD, RAM
  E("best-ssds-for-steam-library", "ssd for steam library", "ssd", (f) => n(f, "capacity") >= 2 && /PCIe 4/.test(s(f, "pcie")) && !/2230/.test(s(f, "pcie")), "price", "Best SSDs for a Steam Library",
    "A Steam library grows fast, so capacity matters more than peak speed. Every pick is a PCIe 4.0 drive of 2TB or more, ordered from the lowest price.", "Keep your most-played games on the fastest drive and the rest on bulk storage."),
  E("best-32gb-ddr5-ram", "32gb ddr5 ram", "ram", (f) => n(f, "capacity") === 32 && s(f, "gen") === "DDR5", "-speed", "Best 32GB DDR5 RAM",
    "A 32GB DDR5 kit gives current games and background apps plenty of room. Every pick is a 32GB DDR5 kit, ordered by speed.", "Use two sticks in the recommended slots to keep dual-channel speeds."),
  // Mice, headsets, mics
  E("best-gaming-mice-for-fortnite", "gaming mice for fortnite", "gmouse", (f) => n(f, "weight") > 0 && n(f, "weight") <= 65 && /2\.4|Lightspeed|HyperSpeed|Slipstream|Wireless/i.test(s(f, "connection")), "weight", "Best Gaming Mice for Fortnite",
    "Fortnite rewards fast aim changes and quick building edits, so a light wireless mouse helps. Every pick weighs 65g or less and connects wirelessly, ordered from the lightest.", "Bind building keys to side buttons and test the layout in Creative mode."),
  E("best-gaming-mice-for-league-of-legends", "gaming mice for league of legends", "gmouse", (f) => n(f, "buttons") >= 6 && n(f, "weight") > 0 && n(f, "weight") <= 80, "-buttons", "Best Gaming Mice for League of Legends",
    "League of Legends is a click-heavy game where extra buttons can hold item or ability bindings. Every pick has six or more buttons and weighs 80g or less, ordered by button count.", "Bind the side buttons gradually; muscle memory takes some games."),
  E("best-gaming-mice-for-mac", "gaming mice for mac", "gmouse", (f) => /Bluetooth/i.test(s(f, "connection")), "-battery", "Best Gaming Mice for Mac",
    "Many Macs have few free USB ports for a 2.4GHz dongle, so Bluetooth is the easy route. Every pick supports Bluetooth, ordered by listed battery life.", "Check whether the maker's software runs on macOS before relying on custom buttons."),
  E("best-gaming-headsets-with-boom-mic", "boom mic for gaming", "headset", (f) => /boom/i.test(s(f, "mic")), "price", "Best Gaming Headsets with Boom Mic",
    "A boom mic sits close to your mouth and usually picks up voice better than an inline mic. Every pick lists a boom microphone, ordered from the lowest price.", "Position the boom about two fingers from the corner of your mouth."),
  E("best-over-ear-gaming-headphones", "over ear gaming headphones", "headset", (f) => s(f, "mic") === "None" && !/In-ear/i.test(s(f, "design")), "price", "Best Over-Ear Gaming Headphones",
    "Over-ear headphones suit gamers who already have a desk microphone. Every pick is an over-ear model without a built-in microphone, ordered from the lowest price.", "Pair them with a standalone USB microphone for voice chat."),
  E("best-wired-gaming-earbuds-for-pc", "wired gaming earbuds", "headset", (f) => /In-ear/i.test(s(f, "design")) && /wired|3\.5|usb/i.test(s(f, "connection")) && !/Bluetooth|2\.4/i.test(s(f, "connection")), "-driver", "Best Wired Gaming Earbuds",
    "Wired earbuds avoid battery and latency worries and are light enough for long sessions. Every pick is in-ear and wired, ordered by driver size.", "Check the plug type; some use USB-C instead of a 3.5mm jack."),
  E("best-dynamic-microphones-for-gaming", "dynamic microphones for gaming", "mic", (f) => /Dynamic/i.test(s(f, "capsule")), "price", "Best Dynamic Microphones for Gaming",
    "Dynamic microphones reject background noise better than condensers, which helps in a loud room. Every pick uses a dynamic capsule, ordered from the lowest price.", "Speak close to the capsule; dynamic mics pick up less from a distance."),
  E("best-esports-mouse-pads", "esports mousepads", "pad", (f) => /Speed|Control|Balance/i.test(s(f, "surface")), "price", "Best Esports Mouse Pads",
    "Esports players pick a pad surface for speed or control and want a consistent glide. Every pick lists a speed, control or balanced cloth surface, ordered from the lowest price.", "Clean the surface regularly; dust changes how the mouse glides."),
  E("best-webcams-with-pan-tilt", "webcams with pan tilt", "webcam", (f) => /PTZ/i.test(s(f, "focus")) && !/Tripod/i.test(f.name), "price", "Best Webcams with Pan and Tilt",
    "A pan-tilt webcam follows you or lets you reframe without moving the camera by hand. Every pick lists PTZ tracking, ordered from the lowest price.", "Mount it at eye level and test the tracking in your room's lighting."),
  // Coolers and power supplies
  E("best-360mm-aio-coolers-for-ryzen-9", "aio coolers for ryzen 9", "aio", (f) => n(f, "rad") >= 360 && /AM5/.test(s(f, "sockets")) && !/RX RGB White/.test(f.name), "-fanRpm", "Best 360mm AIO Coolers for Ryzen 9",
    "A Ryzen 9 processor sustains high power under load, so radiator size sets how long it holds its clocks. Every pick has a 360mm or larger radiator and lists AM5 socket support, ordered by fan speed.", "Check the case's radiator mounting limits and RAM clearance before ordering."),
  E("best-air-coolers-for-ryzen-7-9800x3d", "cooler for 9800x3d", "air", (f) => /AM5/.test(s(f, "sockets")) && n(f, "pipes") >= 6 && !/chromax/i.test(f.name), "-pipes", "Best Air Coolers for Ryzen 7 9800X3D",
    "The 9800X3D runs cool for its performance, so a good air cooler is often enough. Every pick lists AM5 support and six or more heat pipes, ordered by heat pipe count.", "Measure your case's CPU cooler height limit against the cooler before ordering."),
  E("best-budget-aio-liquid-coolers", "budget aio liquid coolers", "aio", (f) => p(f) <= 100, "price", "Best Budget AIO Liquid Coolers",
    "A budget all-in-one cooler can outperform a small air cooler without a large price. Every pick cost $100 or less when we checked, ordered from the lowest price.", "Mount the radiator with the pump lower than the radiator top where the case allows."),
  E("best-1000w-psus-for-rtx-5090", "1000w psus rtx 5090", "psu", (f) => n(f, "watts") >= 1000 && n(f, "hpwr") >= 1, "-watts", "Best 1000W+ PSUs for the RTX 5090",
    "An RTX 5090 draws far more power than other cards and uses the 12V-2x6 connector. Every pick is 1000W or more and lists at least one 12V-2x6 connector, ordered by wattage.", "Use the power supply's own 12V-2x6 cable instead of an adapter where possible."),
];
