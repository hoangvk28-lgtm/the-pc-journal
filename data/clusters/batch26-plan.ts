import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 26 keyword plan (guru sitemaps 22/23). Most keywords in that list repeat guides the site already has
 * (see docs/batch26-held-keywords.md). This plan keeps the per-game CPU guides and a few use-case keyword guides.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const wirelessMouse = (f: Fact) => /2\.4|bluetooth|lightspeed|hyperspeed|slipstream|wireless|receiver/i.test(s(f, "connection"));
const modern = (f: Fact) => s(f, "socket") !== "LGA1151";

const E = (slug: string, kw: string, g: PlanItem["g"], where: PlanItem["where"], sort: string, seo: string, lead: string, close: string): PlanItem => ({ slug, kw, g, where, sort, seo, lead, close });

export const PLAN: PlanItem[] = [
  E("best-cpu-for-fortnite", "cpu for fortnite", "cpu", (f) => modern(f) && n(f, "cores") >= 6 && p(f) <= 260 && n(f, "boost") >= 5, "-boost", "Best CPUs for Fortnite",
    "Fortnite leans on a few fast cores, so boost clock matters more than core count. Every pick has six or more cores, boosts to 5.0GHz or more and cost $260 or less.", "Use performance mode with a high-refresh monitor; the CPU is the limit at low settings."),
  E("best-cpu-for-apex-legends", "cpu for apex legends", "cpu", (f) => modern(f) && n(f, "cores") >= 8 && n(f, "boost") >= 5.3, "-l3", "Best CPUs for Apex Legends",
    "Apex Legends runs on an older engine that favours cache and clock speed in big fights. Every pick has at least eight cores and boosts to 5.3GHz or more, ordered by L3 cache.", "Cap the frame rate just under your monitor's refresh rate for steadier frame times."),
  E("best-cpu-for-call-of-duty-warzone", "cpu for call of duty warzone", "cpu", (f) => modern(f) && n(f, "cores") >= 8 && n(f, "threads") >= 16 && n(f, "boost") >= 5.4, "price", "Best CPUs for Call of Duty: Warzone",
    "Warzone is one of the most CPU-heavy shooters, with large maps and many players. Every pick has eight or more cores and 16 or more threads and boosts to 5.4GHz or more, ordered from the lowest price.", "Keep the shader cache enabled and install the game on an NVMe SSD."),
  E("best-cpu-for-counter-strike-2", "cpu for counter strike 2", "cpu", (f) => modern(f) && n(f, "l3") >= 32 && n(f, "boost") >= 5.4 && n(f, "cores") <= 12, "-boost", "Best CPUs for Counter-Strike 2",
    "Counter-Strike 2 is limited by one or two fast cores, so clock speed and cache decide frame rates. Every pick has 32MB or more of L3 and boosts to 5.4GHz or more, ordered by boost clock.", "A 360Hz monitor needs a CPU that holds frame rates well above 400 in this game."),
  E("best-cpu-for-dota-2", "cpu for dota 2", "cpu", (f) => modern(f) && p(f) <= 200 && n(f, "cores") >= 6, "-boost", "Best CPUs for Dota 2",
    "Dota 2 depends more on the processor than the graphics card in late-game fights. Every pick has six or more cores and cost $200 or less, ordered by boost clock.", "Spend the rest of the budget on faster RAM before a bigger GPU."),
  E("best-cpu-for-elden-ring", "cpu for elden ring", "cpu", (f) => modern(f) && n(f, "cores") >= 6 && p(f) <= 240 && s(f, "memory") !== "DDR4", "-l3", "Best CPUs for Elden Ring",
    "Elden Ring is capped at 60fps by default, so any modern six-core chip is enough and the savings can go to the GPU. Every pick is a chip for a DDR5-capable platform with at least six cores that cost $240 or less.", "Put spare budget into the GPU; the 60fps cap means a faster CPU rarely adds frame rate."),
  E("best-cpu-for-escape-from-tarkov", "cpu for escape from tarkov", "cpu", (f) => n(f, "l3") >= 96, "-l3", "Best CPUs for Escape From Tarkov",
    "Tarkov is CPU-bound on its large maps and benefits from big cache more than most games. Every pick has 96MB or more of L3 cache, ordered by cache size.", "Install Tarkov on an SSD; load times on large maps are long on a hard drive."),
  E("best-cpu-for-helldivers-2", "cpu for helldivers 2", "cpu", (f) => modern(f) && n(f, "cores") >= 8 && n(f, "threads") >= 16 && p(f) <= 350, "-threads", "Best CPUs for Helldivers 2",
    "Helldivers 2 spawns large groups of enemies, which use many threads. Every pick has eight or more cores and 16 or more threads and cost $350 or less, ordered by thread count.", "Keep the game on an SSD and update the GPU driver before big patches."),
  E("best-cpu-for-minecraft", "cpu for minecraft", "cpu", (f) => modern(f) && n(f, "boost") >= 5.5, "price", "Best CPUs for Minecraft",
    "Minecraft is mostly single-thread limited, so a high boost clock helps with big worlds and mods. Every pick boosts to 5.5GHz or more, ordered from the lowest price.", "Allocate more RAM to the Java launcher when you run heavy modpacks."),
  E("best-cpu-for-overwatch-2", "cpu for overwatch 2", "cpu", (f) => modern(f) && p(f) <= 180 && n(f, "cores") >= 6, "-boost", "Best CPUs for Overwatch 2",
    "Overwatch 2 runs on a modest CPU, and high frame rates come from clock speed. Every pick has six or more cores and cost $180 or less, ordered by boost clock.", "Pair it with a high-refresh monitor; a 144Hz screen wastes a fast CPU."),
  E("best-cpu-for-rocket-league", "cpu for rocket league", "cpu", (f) => modern(f) && p(f) <= 170 && n(f, "cores") >= 6, "price", "Best CPUs for Rocket League",
    "Rocket League is a light esports title, so a budget six-core chip drives very high frame rates. Every pick has six or more cores and cost $170 or less, ordered from the lowest price.", "Check whether the chip includes a cooler before you add one to the cart."),
  E("best-cpu-for-microsoft-flight-simulator-2024", "cpu for microsoft flight simulator 2024", "cpu", (f) => modern(f) && n(f, "l3") >= 64 && n(f, "boost") >= 5.2, "-boost", "Best CPUs for Flight Simulator 2024",
    "Microsoft Flight Simulator 2024 pushes one main thread hard and also streams scenery data. Every pick has 64MB or more of L3 cache and boosts to 5.2GHz or more, ordered by boost clock.", "Use 32GB of RAM for large photogrammetry cities."),
  E("best-gaming-keyboards-for-fps", "gaming keyboards for fps", "gkb", (f) => /TKL|60%|65%|75%|68-key|compact/i.test(s(f, "layout")) && (n(f, "polling") >= 8000 || /optical|hall|magnetic/i.test(s(f, "switch"))), "-polling", "Best Gaming Keyboards for FPS Games",
    "Shooters reward fast key response and desk space for wide mouse swipes. Every pick is a compact or TKL board with 8000Hz polling or optical or magnetic switches, ordered by polling rate.", "Set the actuation point low only for movement keys; accidental presses cost rounds."),
  E("best-gaming-monitors-for-small-desk", "gaming monitors for small desk", "monitor", (f) => (Number(s(f, "size")) || 0) > 0 && (Number(s(f, "size")) || 0) <= 25 && n(f, "hz") >= 144, "-hz", "Best Gaming Monitors for Small Desks",
    "A small desk limits how big a screen you can sit in front of. Every pick is 25 inches or smaller with a refresh rate of 144Hz or more, ordered by refresh rate.", "Check the stand footprint; a monitor arm frees desk depth."),
  E("best-gaming-keyboards-for-small-hands", "gaming keyboards for small hands", "gkb", (f) => /60%|61|65%|68-key|compact/i.test(s(f, "layout")), "price", "Best Gaming Keyboards for Small Hands",
    "A 60% or 65% board is narrower, so your hands travel less between the keys and the mouse. Every pick has a compact layout of 68 keys or fewer, ordered from the lowest price.", "Check the layout for a dedicated arrow cluster if you rely on it; some 60% boards hide arrows behind a layer."),
  // ---- Per-keyword extras ----
  E("best-cpu-for-minecraft-2026", "cpu for minecraft 2026", "cpu", (f) => modern(f) && n(f, "boost") >= 5.4 && p(f) <= 300, "-boost", "Best Value CPUs for Minecraft",
    "Minecraft modpacks and large servers lean on one fast core, so value chips with high boost clocks do well. Every pick boosts to 5.4GHz or more and cost $300 or less, ordered by boost clock.", "Pair it with 32GB of RAM if you run heavy modpacks."),
  E("best-cpu-for-modern-warfare-3", "cpu for modern warfare 3", "cpu", (f) => modern(f) && n(f, "cores") >= 8 && p(f) <= 400, "-boost", "Best CPUs for Modern Warfare 3",
    "Modern Warfare 3 uses several cores in big multiplayer matches. Every pick has eight or more cores and cost $400 or less, ordered by boost clock.", "Keep the game on an SSD and the shader cache enabled."),
  E("best-cpu-for-warzone-2026", "cpu for warzone 2026", "cpu", (f) => modern(f) && n(f, "l3") >= 96, "price", "Best X3D CPUs for Warzone",
    "Warzone responds to large caches on its biggest maps. Every pick has 96MB or more of L3 cache, ordered from the lowest price.", "Update the BIOS first; X3D chips need recent AGESA versions."),
  E("best-budget-cpus-for-gaming", "budget cpus for gaming", "cpu", (f) => modern(f) && p(f) <= 190 && n(f, "cores") >= 6, "-cores", "Best Budget CPUs by Core Count",
    "A budget CPU should have six cores at least so it does not hold back a mid-range GPU. Every pick has six or more cores and cost $190 or less, ordered by core count.", "Check the platform cost; a cheap CPU on a costly board saves little."),
  E("best-amd-cpus-for-gaming-2026", "amd cpus for gaming", "cpu", (f) => /Ryzen/.test(f.short) && s(f, "socket") === "AM5" && p(f) <= 400, "-cores", "Best AM5 Ryzen CPUs for Gaming",
    "AM5 is AMD's current socket and the path to future Ryzen upgrades. Every pick is a Ryzen on AM5 that cost $400 or less, ordered by core count.", "Buy a B650 or B850 board; X870 adds little for gaming."),
  E("best-1440p-gaming-monitors-2026", "1440p gaming monitors", "monitor", (f) => s(f, "res") === "2560x1440" && n(f, "hz") >= 165 && n(f, "hz") <= 200 && /IPS/.test(s(f, "panel")), "price", "Best 1440p 165-200Hz IPS Gaming Monitors",
    "A 1440p IPS between 165 and 200Hz suits mid-range GPUs. Every pick is a 1440p IPS panel at 165 to 200Hz, ordered from the lowest price.", "Check for USB-C or a height-adjustable stand if you also work on it."),
  E("best-24-inch-gaming-monitors", "24 inch gaming monitors", "monitor", (f) => (Number(s(f, "size")) || 0) >= 23.5 && (Number(s(f, "size")) || 0) <= 25 && n(f, "hz") >= 240, "price", "Best 24-Inch 240Hz Gaming Monitors",
    "A 24 or 25-inch 240Hz monitor is the esports standard. Every pick is between 23.8 and 25 inches at 240Hz or more, ordered from the lowest price.", "Use DisplayPort for 240Hz and a short cable."),
  E("best-360hz-gaming-monitors", "360hz gaming monitors", "monitor", (f) => n(f, "hz") >= 360, "-hz", "Best 360Hz and Faster Gaming Monitors",
    "Above 360Hz, your CPU and settings limit what you see. Every pick is 360Hz or faster, ordered by refresh rate.", "Check that your game can hold 360fps before paying for it."),
  E("best-gaming-monitors-under-300", "gaming monitors under 300", "monitor", (f) => p(f) <= 300 && n(f, "hz") >= 240, "price", "Best 240Hz Gaming Monitors Under $300",
    "240Hz monitors have fallen under $300, mostly at 1080p. Every pick is 240Hz or faster and cost $300 or less, ordered from the lowest price.", "Enable overdrive at a medium setting."),
  E("best-60-percent-gaming-keyboards", "60 percent gaming keyboards", "gkb", (f) => /60%|61/.test(s(f, "layout")) && /linear|tactile|red|brown|blue/i.test(s(f, "switch")), "price", "Best 60% Mechanical Gaming Keyboards",
    "A 60% board drops the arrows and function row to free mouse room. Every pick is a 60% layout with traditional mechanical switches, ordered from the lowest price.", "Learn the function layer before you buy; arrows move there."),
  E("best-gaming-keyboards-for-typing", "gaming keyboards for typing", "gkb", (f) => /PBT/i.test(s(f, "keycaps")) && !/hall|magnetic/i.test(s(f, "switch")), "-polling", "Best PBT-Keycap Gaming Keyboards",
    "PBT keycaps keep their texture over long typing sessions. Every pick has PBT keycaps and non-magnetic switches, ordered by polling rate.", "Choose tactile or quiet linear switches for typing comfort."),
  E("best-gaming-keyboards-under-50", "gaming keyboards under 50", "gkb", (f) => p(f) <= 50 && /60|65|68|75|compact|TKL/i.test(s(f, "layout")), "price", "Best Compact Gaming Keyboards Under $50",
    "A compact board under $50 saves desk space and money. Every pick is a compact or TKL layout that cost $50 or less, ordered from the lowest price.", "Check whether the keycaps and switches are replaceable."),
  E("best-gaming-mice-under-30", "gaming mice under 30", "gmouse", (f) => p(f) <= 30 && !wirelessMouse(f), "-dpi", "Best Wired Gaming Mice Under $30",
    "A wired mouse under $30 avoids battery trade-offs entirely. Every pick is wired and cost $30 or less, ordered by maximum DPI.", "Leave DPI at 800 to 1600 for aiming; extra headroom is for desktop use."),
  E("best-gaming-pc-build-750", "750 dollar gaming pc", "prebuilt", (f) => p(f) >= 700 && p(f) <= 900 && !/integrated|laptop/i.test(s(f, "gpu")), "-ssd", "Best Gaming PCs Around $750 to $900",
    "Around $750 to $900 you get entry-level RTX 3050 and RX 6000 systems. Every pick cost between $700 and $900 and has a dedicated GPU, ordered by SSD size.", "Look at the SSD and RAM; they decide how long the PC stays comfortable."),
  E("best-2000-gaming-pc-build-2026", "2000 dollar gaming pc", "prebuilt", (f) => p(f) >= 1900 && p(f) <= 2150 && n(f, "vram") >= 12, "-ram", "Best Gaming PCs Around $2,000",
    "Around $2,000 you find RTX 5070 and RX 9070 systems. Every pick cost between $1,900 and $2,150 with 12GB or more of video memory, ordered by installed memory.", "Choose a system with a PSU rating you can confirm."),
  E("best-2500-gaming-pc-build-2026", "2500 dollar gaming pc", "prebuilt", (f) => p(f) >= 2300 && p(f) <= 2700 && n(f, "vram") >= 12, "-vram", "Best Gaming PCs Around $2,500",
    "Around $2,500 you reach RTX 5070 Ti and RX 9070 XT systems. Every pick cost between $2,300 and $2,700, ordered by video memory.", "A 9800X3D CPU pairs well with this tier for esports."),
  E("best-3000-gaming-pc-build-2026", "3000 dollar gaming pc", "prebuilt", (f) => p(f) >= 2800 && p(f) <= 3300 && n(f, "vram") >= 16, "-ssd", "Best Gaming PCs Around $3,000",
    "Around $3,000 you reach RTX 5070 Ti and RTX 5080 class systems. Every pick has 16GB or more of video memory and cost between $2,800 and $3,300, ordered by SSD size.", "Look at the case airflow; high-end parts need it."),
  E("best-4000-gaming-pc-build-2026", "4000 dollar gaming pc", "prebuilt", (f) => p(f) >= 3600 && p(f) <= 4400, "-ram", "Best Gaming PCs Around $4,000",
    "Around $4,000 you get RTX 5080 systems with 32GB or more of memory. Every pick cost between $3,600 and $4,400, ordered by installed memory.", "Check the PSU wattage; 850W is the minimum for an RTX 5080."),
  E("best-5000-gaming-pc-build-2026", "5000 dollar gaming pc", "prebuilt", (f) => p(f) >= 4600 && p(f) <= 9000, "price", "Best Gaming PCs From $4,600 Up",
    "Above $4,600 you are buying an RTX 5090 or a premium brand. Every pick cost $4,600 or more, ordered from the lowest price.", "Make sure the warranty covers parts and labour."),
  E("best-build-baldurs-gate-3-2026", "gaming pc for baldurs gate 3", "prebuilt", (f) => p(f) >= 1000 && p(f) <= 1500 && n(f, "ram") >= 16 && n(f, "vram") >= 8, "-ssd", "Best Gaming PCs for Baldur's Gate 3",
    "Baldur's Gate 3 is large, so storage and memory matter as much as the GPU. Every pick cost between $1,000 and $1,500 with 16GB or more of RAM, ordered by SSD size.", "Install the game on the SSD; Act 3 loads slowly from a hard drive."),
  E("best-build-cyberpunk-2077-2026", "gaming pc for cyberpunk 2077", "prebuilt", (f) => /RTX 5070|RTX 4070|RX 9070/.test(s(f, "gpu")) && p(f) <= 2300, "price", "Best Gaming PCs for Cyberpunk 2077",
    "Cyberpunk 2077 with ray tracing needs a strong GPU with upscaling support. Every pick has an RTX 4070, RTX 5070 or RX 9070-class GPU and cost $2,300 or less, ordered from the lowest price.", "Turn on DLSS or FSR before lowering ray tracing."),
  E("best-build-stalker-2-2026", "gaming pc for stalker 2", "prebuilt", (f) => n(f, "vram") >= 12 && n(f, "ram") >= 32 && p(f) <= 2400, "price", "Best Gaming PCs for Stalker 2",
    "Stalker 2 is demanding on both CPU and memory. Every pick has 12GB or more of video memory and 32GB of RAM and cost $2,400 or less, ordered from the lowest price.", "Use an SSD and upscaling; the game stutters on slow storage."),
  E("best-build-starfield-2026", "gaming pc for starfield", "prebuilt", (f) => /Ryzen 7 7800X3D|Ryzen 7 9800X3D|Ryzen 7 9700X|Core i7|Core Ultra 7/.test(s(f, "cpu")) && n(f, "vram") >= 12 && p(f) <= 2800, "price", "Best Gaming PCs for Starfield",
    "Starfield leans on the CPU in cities. Every pick has a Ryzen 7 or Core i7 class CPU with 12GB or more of video memory and cost $2,800 or less, ordered from the lowest price.", "Keep the game on the fastest SSD you have."),
];
