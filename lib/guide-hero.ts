import type { PcArticle } from "@/lib/pc-content";
import { classify } from "@/lib/pc-content/subtopics";
import { infoPhotos } from "@/data/info/info-photos";

const BY_CATEGORY: Record<string, { src: string; alt: string }> = {
  monitors: { src: "/images/pcj/pc-monitors.webp", alt: "Desktop monitors on monitor arms above a wooden desk with keyboards and mice" },
  components: { src: "/images/pcj/pc-components.webp", alt: "PC components laid out on a workbench ready for a build" },
  "pc-builds": { src: "/images/pcj/pc-build.webp", alt: "An assembled desktop PC with the side panel open" },
  upgrades: { src: "/images/pcj/pc-upgrade.webp", alt: "A desktop PC opened up for a hardware upgrade" },
  peripherals: { src: "/images/pcj/pc-peripherals.webp", alt: "A desk setup with a keyboard, mouse and headset beside a monitor" },
};

/** Real photos per sub-topic hub (public/images/pcj/hubs/<hub>-<n>.webp). Shown inside guide sections, never as the hero. */
const BY_HUB: Record<string, string[]> = {
  "graphics-cards": [
    "The circuit board on the back of a graphics card",
    "A graphics card's bare circuit board around the GPU die",
  ],
  processors: [
    "A desktop CPU seated in its motherboard socket with the retention frame open",
    "An Intel stock cooler mounted over the CPU socket inside a PC",
  ],
  "prebuilt-pcs": [
    "A desktop PC beside a monitor on a corner gaming desk",
    "A desktop PC and monitor on a desk lit with red and blue lighting",
    "A white desktop PC beside a monitor on a bright home-office desk",
  ],
  "desk-setup": [
    "A desk setup with a monitor riser, ergonomic chair and blue backlight",
    "A desk with a curved monitor, a glass-panel PC and a keyboard",
    "A white desk with an ultrawide monitor, a PC and plants",
    "A wooden desk with a monitor on an arm, a desk mat and a compact keyboard",
  ],
  keyboards: [
    "A compact keyboard and mouse in front of an ultrawide monitor",
    "A close-up of a full-size keyboard with grey keycaps",
    "A grey mechanical keyboard beside a mouse on a wooden desk",
    "A mechanical keyboard with RGB-lit keycaps",
    "A mechanical keyboard with white keycaps in front of an ultrawide monitor",
  ],
  headsets: [
    "A gaming headset beside a desk with backlit speakers",
    "Headphones on a red stand next to an amplifier and bookshelf speakers",
    "Open-back headphones on a stand beside a headphone amplifier",
    "A headset hanging on a PC case next to a monitor",
  ],
  mice: [
    "A hand next to a black wireless mouse on a blue mousepad",
    "A hand holding a light-blue mouse on a red mousepad",
    "A hand on a white gaming mouse, and the same mouse shown from below",
  ],
  "gaming-monitors": [
    "A large monitor showing a game on a low media unit",
    "A gaming monitor on a desk with purple bias lighting",
    "A gaming monitor above a keyboard and mouse on a black desk",
    "A gaming desk with a monitor, a racing-style chair and shelves of figures",
  ],
  "cpu-coolers": [
    "A case with purple-lit front fans and the motherboard area behind them",
    "A tower air cooler with brown fans installed in a PC",
    "A tower air cooler in a case with red-lit fans",
    "An all-in-one liquid cooler pump block above a graphics card",
  ],
  "power-supplies": [
    "A PSU-side 8-pin cable connector held between two fingers",
    "A 24-pin ATX power cable held in a hand",
    "A 24-pin ATX connector seen from the pin side",
    "An 8-pin power connector held up to the camera",
    "Modular cable sockets on the back of a power supply",
    "Power cables routed to a graphics card inside a PC",
  ],
  "4k-monitors": [
    "A 4K monitor showing a detailed landscape wallpaper",
    "A monitor showing a racing game above a compact keyboard",
  ],
  "pc-cases": [
    "Cable management behind the motherboard tray of a PC case",
    "A case interior with a tower cooler and a graphics card installed",
    "An open case with the motherboard installed and the side panel off",
    "A glass-panel PC case with lit fans on a desk",
    "A PC case with red-lit glass panels next to a monitor",
    "A compact black PC case beside a speaker on a desk",
  ],
  storage: [
    "An M.2 SSD going into a motherboard slot",
    "The M.2 slot and standoff on a motherboard",
    "An M.2 SSD installed in a laptop",
    "The M.2 standoff position marked on a Gigabyte motherboard",
    "An M.2 SSD installed on a motherboard",
  ],
  "streaming-gear": [
    "A desk with a microphone arm, a ring light and two monitors",
    "A streaming desk with a ring light, a mic arm and monitors",
    "A gaming room with a lit desk, a monitor and shelves of collectibles",
  ],
  "monitors-general": [
    "A three-monitor work desk beside a laptop",
    "A desk with a monitor showing code next to a laptop",
    "A white desk with two monitors and a laptop",
    "A monitor showing a desktop app in a dim room",
  ],
  memory: [
    "Memory modules installed in a motherboard's DIMM slots",
    "A laptop memory module installed in its SO-DIMM slot",
  ],
  "external-storage": [
    "An M.2 SSD inside a clear external enclosure",
    "A small M.2 SSD next to an external drive enclosure",
    "An M.2 2280 SSD held in a hand",
  ],
  "upgrade-guides": [
    "A hand installing a part on a motherboard",
    "A hand reaching into a PC near the graphics card",
    "A hand holding an M.2 SSD heatsink inside a PC",
    "A USB 3.0 front-panel cable plugged into a motherboard header",
  ],
  "mouse-pads": [
    "A large desk mat under a mechanical keyboard and a white mouse",
    "A green desk mat under a compact keyboard and an ergonomic mouse",
    "A black cloth mousepad with a wireless mouse",
    "A wide black desk mat in front of two monitors and a white PC",
    "An orange desk mat across a desk below a monitor",
  ],
  microphones: [
    "A USB microphone on a desk in front of two monitors",
    "An XLR microphone on a boom arm beside an audio interface",
    "A low-profile boom arm clamped to a desk",
    "A microphone on a short stand between two desktop speakers",
    "A microphone on a boom arm in front of a monitor",
    "A microphone on a stand beside a laptop on a purple desk mat",
    "A microphone on a boom arm above two monitors",
    "A desk with two monitors, a lamp and a boom-arm microphone",
    "A microphone on a boom arm in front of two monitors and an RGB keyboard",
  ],
  "mini-pcs": [
    "A mini PC with cables attached beside a monitor and keyboard",
    "A small form factor PC with its cover off showing the internals",
    "A compact PC in a clear acrylic case on a shelf",
    "A slim black mini PC with a perforated top",
  ],
  "monitor-accessories": [
    "A gas-spring monitor arm mounted to the back of a monitor",
    "A desk with two monitors and a monitor light bar",
    "A monitor light bar above two monitors on a wooden desk",
    "A light bar and two monitors on arms above a keyboard",
    "A desk with a monitor on an arm and a vertical second screen",
    "A monitor on an arm on a desk lit purple",
  ],
  "oled-monitors": [
    "Two monitors side by side showing the same game scene",
    "Two monitors showing a dark game scene side by side",
    "A monitor on a stand in front of lit shelves",
    "A monitor showing red lanterns against a black background",
  ],
  "portable-monitors": [
    "A desk with a main monitor and small extra screens beside it",
    "A monitor beside a vertical second screen",
    "A desk with a laptop, a monitor and a small portable screen",
    "Two monitors side by side on a desk",
  ],
  networking: [
    "A network switch with Ethernet cables in a wall cabinet",
    "A network switch and patch cables mounted on a wall rack",
    "A small router and switch wired together on a shelf",
    "A blue Ethernet cable plugged into a network port",
  ],
  "expansion-cards": [
    "A low-profile PCIe card installed in a PC",
    "A PCIe expansion card held over a board diagram",
    "PCIe riser boards lined up on a desk",
  ],
  "usb-hubs-docks": [
    "USB hubs and a docking station laid out on a desk",
    "A slim USB hub with its cable",
  ],
  "ultrawide-monitors": [
    "An ultrawide monitor on a desk in a dim room",
    "An ultrawide monitor on a white desk beside a PC",
    "A curved ultrawide monitor showing documents",
    "A super-ultrawide monitor between two speakers",
  ],
  speakers: [
    "A wooden desk with a monitor on an arm and small speakers",
    "A keyboard and mouse on a desk mat below a monitor and speaker",
    "Desktop speakers either side of a monitor",
    "White bookshelf speakers either side of a monitor",
  ],
};

function pick(slug: string, n: number): number {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % n;
}

export type SectionPhoto = { src: string; alt: string };

/** In-body photos for a guide: its curated lead photo (informational guides), then its hub set rotated by slug. */
export function sectionPhotos(article: PcArticle): SectionPhoto[] {
  const hub = classify(article)?.slug;
  const alts = hub ? BY_HUB[hub] ?? [] : [];
  const start = pick(article.slug, Math.max(alts.length, 1));
  const set = alts.map((_, k) => {
    const i = (start + k) % alts.length;
    return { src: `/images/pcj/hubs/${hub}-${i + 1}.webp`, alt: alts[i] };
  });
  const lead = infoPhotos[article.slug];
  return lead ? [lead, ...set.filter((p) => p.src !== lead.src)] : set;
}

/** 16:9 editorial hero for a guide: the article's own hero if set, else its category image (illustrative). */
export function guideHero(article: PcArticle): { src: string; alt: string; caption?: string } {
  if (article.hero) return article.hero;
  const h = BY_CATEGORY[article.category] ?? BY_CATEGORY.components;
  return { ...h, caption: "Illustrative image" };
}
