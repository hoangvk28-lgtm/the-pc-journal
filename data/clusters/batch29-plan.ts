import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 29 (CPUs) and batch 30 (GPUs): per-game guides for the lighter, older and indie PC games in the PCGameCheck list.
 * These games publish no demanding recommended tier (or no stable official figures), so no requirements entry is
 * recorded unless the game's Steam page states one in data/game-requirements.ts. The guides are about the cheapest
 * sensible current part. Each game gets a price band and sort chosen by a hash of its slug so product sets differ.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const chip = (f: Fact, r: RegExp) => r.test(s(f, "chip"));

type Band = { where: (f: Fact) => boolean; sort: string; text: string };
const GPU_BANDS: Band[] = [
  { where: (f) => p(f) <= 600, sort: "price", text: "Every pick cost $600 or less, ordered from the lowest price." },
  { where: (f) => p(f) <= 600, sort: "-price", text: "Every pick cost $600 or less, ordered from the highest price." },
  { where: (f) => n(f, "vram") >= 8 && p(f) <= 600, sort: "-vram", text: "Every pick has at least 8GB of video memory and cost $600 or less, ordered by memory." },
  { where: (f) => p(f) > 250 && p(f) <= 650, sort: "price", text: "Every pick cost between $250 and $650, ordered from the lowest price." },
  { where: (f) => chip(f, /^(RX|Arc)/) && p(f) <= 700, sort: "-price", text: "Every pick is a Radeon RX or Intel Arc card that cost $700 or less, ordered from the highest price." },
  { where: (f) => chip(f, /^RTX/) && p(f) <= 650, sort: "price", text: "Every pick is an RTX card that cost $650 or less, ordered from the lowest price." },
  { where: (f) => n(f, "vram") >= 12 && p(f) <= 650, sort: "price", text: "Every pick has at least 12GB of video memory and cost $650 or less, ordered from the lowest price." },
  { where: (f) => p(f) <= 800 && n(f, "vram") >= 16, sort: "-price", text: "Every pick has at least 16GB of video memory and cost $800 or less, ordered from the highest price." },
];
const CPU_BANDS: Band[] = [
  { where: (f) => p(f) <= 200, sort: "price", text: "Every pick cost $200 or less, ordered from the lowest price." },
  { where: (f) => p(f) <= 200, sort: "-cores", text: "Every pick cost $200 or less, ordered by core count." },
  { where: (f) => n(f, "cores") >= 6 && p(f) <= 170, sort: "-boost", text: "Every pick has at least six cores and cost $170 or less, ordered by boost clock." },
  { where: (f) => f.specs.igpu === true && p(f) <= 250, sort: "price", text: "Every pick has integrated graphics and cost $250 or less, ordered from the lowest price." },
  { where: (f) => /AM4/.test(s(f, "socket")) && p(f) <= 250, sort: "price", text: "Every pick is an AM4 processor that cost $250 or less, ordered from the lowest price." },
  { where: (f) => /LGA1700/.test(s(f, "socket")) && p(f) <= 260, sort: "-price", text: "Every pick is an LGA1700 processor that cost $260 or less, ordered from the highest price." },
  { where: (f) => /AM5/.test(s(f, "socket")) && p(f) <= 330, sort: "price", text: "Every pick is an AM5 processor that cost $330 or less, ordered from the lowest price." },
  { where: (f) => n(f, "cores") >= 8 && p(f) <= 300, sort: "price", text: "Every pick has at least eight cores and cost $300 or less, ordered from the lowest price." },
];

const GPU_LEADS = [
  (g: string) => `${g} runs on almost any current graphics card, so the choice comes down to price, memory and outputs.`,
  (g: string) => `${g} does not need a high-end card, which leaves room to choose on price, memory and video outputs.`,
  (g: string) => `${g} is a light PC game, which makes price, memory size and driver support the main buying points for a card.`,
  (g: string) => `For ${g}, the card matters less than the monitor, memory and storage around it, so compare price and memory first.`,
  (g: string) => `${g} sits well within what current cards offer, and the same card also covers heavier games in your library.`,
  (g: string) => `${g} does not push current hardware, so this guide compares cards by price, memory and what they leave for other games.`,
];
const CPU_LEADS = [
  (g: string) => `${g} runs on almost any current processor, so the best choice is the cheapest sensible one.`,
  (g: string) => `You do not need a flagship processor for ${g}; a low-cost current chip clears the game and leaves money for other parts.`,
  (g: string) => `${g} is a light PC game, which makes price and socket support the main buying points for a processor.`,
  (g: string) => `For ${g}, spend on the graphics card, memory or storage rather than the most powerful processor.`,
  (g: string) => `A budget processor is enough for ${g}, and the same chip also covers other lighter games in your library.`,
  (g: string) => `${g} does not push current hardware, so this guide is about the lowest-cost processor that suits a wider library.`,
];
const GPU_CLOSE = [
  "Check the card's power connector against your power supply before ordering.",
  "Match the card's video outputs to your monitor's HDMI or DisplayPort inputs.",
  "Confirm the card fits your case; many budget cards are compact but some are long.",
  "Put leftover budget toward a higher-refresh monitor or an SSD.",
  "Install the latest driver from the maker after the card arrives.",
];
const CPU_CLOSE = [
  "Check the motherboard's socket and BIOS version before ordering a processor.",
  "Confirm the cooler you plan to use fits the socket; some boxed processors include one.",
  "Put leftover budget toward an SSD or more memory.",
  "Check whether the processor has integrated graphics if you are not adding a card yet.",
  "Match the memory type (DDR4 or DDR5) to the board you choose.",
];

const hash = (str: string) => { let h = 7; for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };

/** [slug fragment, display name]; the guide slug is best-<kind>-for-<fragment>. */
export type Game = [string, string];

/** Slugs the planner skipped with their first band; they get a different band (offset 3). */
export const RETRY = new Set<string>(["hyper-demoncpu", "supertuxkartcpu", "the-sims-legacy-collectioncpu", "thief-goldcpu", "splinter-cell-chaos-theorycpu", "victoria-2cpu", "superfighters-deluxecpu", "sub-culturecpu", "championship-manager-03-04cpu", "fallen-hero-rebirthcpu", "death-palettecpu", "mars-first-logisticscpu", "one-night-at-flumptyscpu", "planetarian-hdcpu", "princess-maker-2cpu", "no-case-should-remain-unsolvedcpu", "attack-the-lightcpu", "flowers-le-volume-sur-etecpu", "athanasycpu", "majesty-the-northern-expansioncpu", "siren-head-simulatorcpu", "dungeons-of-dreadrockcpu", "winter-memories-2cpu", "the-enchanted-cave-2cpu"]);
export function build(kind: "gpu" | "cpu", games: Game[], offset = 0): PlanItem[] {
  const bands = kind === "gpu" ? GPU_BANDS : CPU_BANDS;
  const leads = kind === "gpu" ? GPU_LEADS : CPU_LEADS;
  const closes = kind === "gpu" ? GPU_CLOSE : CPU_CLOSE;
  return games.map(([frag, name]) => {
    const h = hash(frag + kind);
    const band = bands[(h + offset + (RETRY.has(frag + kind) ? 3 : 0)) % bands.length];
    return {
      slug: `best-${kind}-for-${frag}`, kw: `${kind} for ${name.toLowerCase()}`, g: kind, where: band.where, sort: band.sort,
      seo: `Best ${kind === "gpu" ? "GPUs" : "CPUs"} for ${name}`,
      lead: `${leads[(h >>> 3) % leads.length](name)} ${band.text}`,
      close: closes[(h >>> 6) % closes.length],
    } as PlanItem;
  });
}

export const CPU_GAMES: Game[] = [
  ["a-hat-in-time", "A Hat in Time"], ["age-of-empires-ii", "Age of Empires II"], ["beat-saber", "Beat Saber"], ["bioshock", "BioShock"],
  ["bioshock-infinite", "BioShock Infinite"], ["blue-prince", "Blue Prince"], ["call-of-duty-4-modern-warfare", "Call of Duty 4"],
  ["company-of-heroes", "Company of Heroes"], ["dark-souls-iii", "Dark Souls III"], ["deltarune", "Deltarune"], ["desert-stalker", "Desert Stalker"],
  ["diablo-2", "Diablo II"], ["disciples-2", "Disciples II"], ["disco-elysium", "Disco Elysium"], ["divinity-original-sin-2", "Divinity: Original Sin 2"],
  ["divinity-original-sin", "Divinity: Original Sin"], ["dominions-5", "Dominions 5"], ["dwarf-fortress", "Dwarf Fortress"], ["emergency-4", "Emergency 4"],
  ["gothic-2", "Gothic II"], ["grand-theft-auto-iv", "Grand Theft Auto IV"], ["hades", "Hades"], ["hades-ii", "Hades II"], ["half-life", "Half-Life"],
  ["holocure", "HoloCure"], ["hyper-demon", "Hyper Demon"], ["i-wanna-be-the-boshy", "I Wanna Be the Boshy"], ["liero", "Liero"],
  ["lil-guardsman", "Lil' Guardsman"], ["mechcommander", "MechCommander"], ["okami-hd", "Okami HD"], ["octopath-traveler-ii", "Octopath Traveler II"],
  ["outer-wilds", "Outer Wilds"], ["persona-5-royal", "Persona 5 Royal"], ["portal-2", "Portal 2"], ["quake", "Quake"], ["quake-ii", "Quake II"],
  ["red-matter-2", "Red Matter 2"], ["rush-rally-3", "Rush Rally 3"], ["starcraft-brood-war", "StarCraft: Brood War"], ["starcraft-ii", "StarCraft II"],
  ["starsector", "Starsector"], ["supertuxkart", "SuperTuxKart"], ["system-shock-2", "System Shock 2"], ["the-binding-of-isaac-repentance", "Binding of Isaac"],
  ["the-elder-scrolls-iv-oblivion", "Oblivion"], ["the-elder-scrolls-v-skyrim", "Skyrim"], ["the-sims-legacy-collection", "The Sims Legacy Collection"],
  ["thief-gold", "Thief Gold"], ["splinter-cell-chaos-theory", "Splinter Cell Chaos Theory"], ["victoria-2", "Victoria 2"], ["worldbox", "WorldBox"],
  ["superfighters-deluxe", "Superfighters Deluxe"], ["starlancer", "Starlancer"], ["sub-culture", "Sub Culture"], ["championship-manager-03-04", "Championship Manager 03/04"],
  ["fallen-hero-rebirth", "Fallen Hero: Rebirth"], ["death-palette", "Death Palette"], ["mars-first-logistics", "Mars First Logistics"],
  ["one-night-at-flumptys", "One Night at Flumpty's"], ["planetarian-hd", "Planetarian HD"], ["pod-gold", "POD Gold"], ["princess-maker-2", "Princess Maker 2"],
  ["shoot-shoot-my-waifu", "Shoot Shoot My Waifu"], ["the-jolly-gangs-spooky-adventure", "Jolly Gang's Spooky Adventure"], ["hide-online", "Hide Online"],
  ["guilty-parade", "Guilty Parade"], ["attack-the-light", "Attack the Light"],
  ["flowers-le-volume-sur-ete", "Flowers: Le Volume sur Ete"], ["athanasy", "Athanasy"], ["majesty-the-northern-expansion", "Majesty"], ["siren-head-simulator", "Siren Head Simulator"],
  ["dungeons-of-dreadrock", "Dungeons of Dreadrock"], ["osake-riesz", "Osake Riesz"], ["winter-memories-2", "Winter Memories 2"], ["the-enchanted-cave-2", "The Enchanted Cave 2"],
];

export const PLAN: PlanItem[] = build("cpu", CPU_GAMES);
