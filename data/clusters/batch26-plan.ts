import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 26 keyword plan (guru sitemaps 22/23). Most keywords in that list repeat guides the site already has
 * (see docs/batch26-held-keywords.md). This plan keeps the per-game CPU guides and a few use-case keyword guides.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const t = (f: Fact) => `${f.name} ${f.short} ${f.notes.join(" ")} ${Object.values(f.specs).join(" ")}`;
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
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
];
