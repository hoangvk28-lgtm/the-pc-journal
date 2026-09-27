import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 21 keyword plan (guru sitemaps 12/14/15). Same rules as batch17-plan.ts. Near-synonym workload keywords
 * ("ram/ssd/speakers/chairs for <workload>") are held in docs/batch21-held-keywords.md.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const t = (f: Fact) => `${f.name} ${f.short} ${f.notes.join(" ")} ${Object.values(f.specs).join(" ")}`;
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const re = (r: RegExp) => (f: Fact) => r.test(t(f));

export const PLAN: PlanItem[] = [
  // ---------------- Keyboards and mice ----------------
  { slug: "best-65-percent-keyboards", kw: "65 percent keyboards", g: "gkb", where: (f) => /65%/.test(s(f, "layout")), sort: "price", seo: "Best 65% Keyboards",
    lead: "A 65% board drops the function row and number pad but keeps the arrow keys, which suits gaming and coding alike. Every pick uses a 65% layout, ordered from the lowest price.", close: "Check the function-layer shortcuts before buying; the F-keys move to a second layer." },
  { slug: "best-75-percent-keyboards", kw: "75 percent keyboards", g: "gkb", where: (f) => /75%/.test(s(f, "layout")), sort: "price", seo: "Best 75% Keyboards",
    lead: "A 75% layout keeps the function row and arrow keys in a compact footprint. Every pick uses a 75% layout, ordered from the lowest price.", close: "75% boards often compress the right-hand column; check where Home and End sit." },
  { slug: "best-keyboards-with-oled-display", kw: "keyboards with oled display", g: "gkb", where: re(/screen|display|LCD|OLED/i), sort: "price", seo: "Best Keyboards With a Built-In Screen",
    lead: "A small built-in screen can show battery, connection or custom images without opening software. Every pick has a screen on the keyboard, ordered from the lowest price.", close: "Custom images usually need the maker's app; check it runs on your OS." },
  { slug: "best-white-keyboards", kw: "white keyboards", g: "gkb", where: re(/white/i), sort: "price", seo: "Best White Keyboards",
    lead: "A white keyboard brightens a light-themed desk, though keycaps show dirt sooner. Every pick comes in white, ordered from the lowest price.", close: "PBT keycaps resist yellowing better than ABS on white boards." },
  { slug: "best-keyboards-for-home-office", kw: "keyboards for home office", g: "wkb", where: (f) => n(f, "devices") >= 3 || /quiet/i.test(s(f, "keys")), sort: "price", seo: "Best Keyboards for a Home Office",
    lead: "A home office keyboard should switch between a work laptop and a personal PC and stay quiet on calls. Every pick pairs with three devices or has quiet keys, ordered from the lowest price.", close: "Map the device-switch keys to the machines you use most so switching becomes muscle memory." },
  { slug: "best-mouse-with-long-battery-life", kw: "mouse with long battery life", g: "wmouse", where: (f) => n(f, "battery") >= 6, sort: "-battery", seo: "Best Mice With Long Battery Life",
    lead: "A mouse that runs for months on one battery removes a small but regular annoyance. Every pick is rated for six months or more, ordered by rated battery life.", close: "Battery ratings assume a few hours of use a day; heavy use shortens them." },
  { slug: "best-low-latency-mouse", kw: "low latency mouse", g: "gmouse", where: (f) => n(f, "polling") >= 4000, sort: "-polling", seo: "Best Low-Latency Gaming Mice",
    lead: "Higher polling rates report movement more often, which trims input delay in fast shooters. Every pick polls at 4,000Hz or more, ordered by polling rate.", close: "8,000Hz polling uses more CPU; check your frame rate stays stable after turning it on." },
  { slug: "best-mouse-for-content-creation", kw: "mouse for content creation", g: "wmouse", where: (f) => n(f, "dpi") >= 4000 || n(f, "buttons") >= 6, sort: "-dpi", seo: "Best Mice for Content Creation",
    lead: "Editing on large or high-resolution screens benefits from a precise sensor and programmable buttons for shortcuts. Every pick has a 4,000 DPI or higher sensor or six or more buttons, ordered by DPI.", close: "Map undo, redo and zoom to the side buttons; it saves more time than a faster sensor." },

  // ---------------- Headsets ----------------
  { slug: "best-7-1-surround-sound-headsets", kw: "7.1 surround sound headsets", g: "headset", where: re(/7\.1|surround|spatial|Atmos|DTS/i), sort: "price", seo: "Best 7.1 Surround Sound Headsets",
    lead: "Virtual surround and spatial audio help place footsteps and effects around you in games. Every pick offers 7.1 surround or a spatial audio format, ordered from the lowest price.", close: "Virtual surround works best in games that output multichannel audio; test it on and off." },
  { slug: "best-headsets-for-video-editing", kw: "headsets for video editing", g: "headset", where: re(/open-back|planar|studio/i), sort: "price", seo: "Best Headphones for Video Editing",
    lead: "Editing audio for video calls for accurate, uncoloured sound more than game-tuned bass. Every pick is an open-back, planar or studio-style set, ordered from the lowest price.", close: "Check your mix on speakers or earbuds too; viewers won't hear it on studio headphones." },

  // ---------------- Chairs ----------------
  { slug: "best-chairs-with-lumbar-support", kw: "chairs with lumbar support", g: "chair", where: (f) => /adjustable|built-in|4-way|dynamic|3D/i.test(s(f, "lumbar")), sort: "price", seo: "Best Chairs With Lumbar Support",
    lead: "Built-in or adjustable lumbar support stays in place better than a loose pillow. Every pick has built-in or adjustable lumbar support, ordered from the lowest price.", close: "Set the lumbar at the curve just above your belt line." },
  { slug: "best-chairs-for-small-spaces", kw: "chairs for small spaces", g: "chair", where: (f) => /flip/i.test(s(f, "arms")), sort: "price", seo: "Best Chairs for Small Spaces",
    lead: "In a small room, flip-up armrests let a chair slide fully under the desk when you're done. Every pick has flip-up arms, ordered from the lowest price.", close: "Measure the gap under your desk against the chair's arm height folded down." },
  { slug: "best-rgb-gaming-chairs", kw: "rgb gaming chairs", g: "chair", where: re(/RGB|LED/i), sort: "price", seo: "Best RGB Gaming Chairs",
    lead: "RGB chairs add lighting strips, often with speakers, for a themed setup. Every pick has built-in lighting, ordered from the lowest price.", close: "Check how the lights are powered; USB-powered strips need a free port nearby." },
  { slug: "best-black-chairs", kw: "black chairs", g: "chair", where: re(/black/i), sort: "price", seo: "Best Black Gaming Chairs",
    lead: "An all-black chair hides wear and matches most setups. Every pick comes in black, ordered from the lowest price.", close: "Black PU leather shows dust; a quick wipe keeps it looking new." },
  { slug: "best-chairs-under-400", kw: "chairs under 400", g: "chair", where: (f) => p(f) > 250 && p(f) <= 400, sort: "-capacity", seo: "Best Chairs Under $400",
    lead: "Between $250 and $400, chairs add better armrests, sturdier bases and adjustable lumbar support. Every pick sits in that range, ordered by weight capacity.", close: "Check the warranty on the gas lift; it is the part most likely to fail." },
  { slug: "best-chairs-under-600", kw: "chairs under 600", g: "chair", where: (f) => p(f) > 400 && p(f) <= 600, sort: "-recline", seo: "Best Chairs Under $600",
    lead: "Between $400 and $600, you reach premium gaming chairs and well-built ergonomic designs. Every pick sits in that range, ordered by recline.", close: "At this price, try to confirm the return policy before buying." },
  { slug: "best-foldable-chairs", kw: "foldable chairs", g: "chair", where: re(/fold|floor|rocker/i), sort: "price", seo: "Best Foldable Gaming Chairs",
    lead: "Folding floor chairs store flat when you're done, which suits a shared room. Every pick folds or sits on the floor, ordered from the lowest price.", close: "Floor chairs suit consoles and TVs better than a desk." },

  // ---------------- Monitors ----------------
  { slug: "best-monitors-for-content-creation", kw: "monitors for content creation", g: "monitor", where: (f) => /9\d% DCI-P3|100% DCI|DCI-P3/.test(s(f, "gamut")), sort: "price", seo: "Best Monitors for Content Creation",
    lead: "Content creation for modern displays needs wide DCI-P3 colour coverage. Every pick lists DCI-P3 coverage, ordered from the lowest price.", close: "Calibrate the monitor with a colorimeter for colour-critical work." },
  { slug: "best-monitors-for-video-editing", kw: "monitors for video editing", g: "monitor", where: (f) => /3840x2160|5120/.test(s(f, "res")) && /IPS|OLED/.test(s(f, "panel")), sort: "-size", seo: "Best Monitors for Video Editing",
    lead: "4K footage looks right on a 4K panel, and IPS or OLED keeps colour consistent from any angle. Every pick is 4K or higher on IPS or OLED, ordered by size.", close: "Leave room on screen for the timeline; a 32-inch 4K panel shows more of it." },
  { slug: "best-high-refresh-rate-monitors", kw: "high refresh rate monitors", g: "monitor", where: (f) => n(f, "hz") >= 240, sort: "-hz", seo: "Best High Refresh Rate Monitors",
    lead: "At 240Hz and above, motion clarity improves most in fast shooters. Every pick refreshes at 240Hz or higher, ordered by refresh rate.", close: "Make sure your GPU can reach the frame rate; a 360Hz panel needs 360fps to show its benefit." },
  { slug: "best-mini-led-monitors", kw: "mini led monitors", g: "monitor", where: (f) => /mini ?LED/i.test(t(f)) && !/\bTV\b/.test(f.name), sort: "price", seo: "Best Mini LED Monitors",
    lead: "Mini LED backlights use many dimming zones to deliver bright HDR without OLED burn-in risk. Every pick uses a Mini LED backlight, ordered from the lowest price.", close: "More dimming zones reduce blooming around bright objects on dark backgrounds." },
  { slug: "best-monitors-for-developers", kw: "monitors for developers", g: "monitor", where: (f) => /2560x1440|3840x2160|3440x1440/.test(s(f, "res")) && f.specs.usbc === true, sort: "price", seo: "Best Monitors for Developers",
    lead: "Developers benefit from sharp text and a single USB-C cable to a laptop. Every pick is 1440p or higher with USB-C, ordered from the lowest price.", close: "Check the USB-C port's power delivery covers your laptop's charger wattage." },
  { slug: "best-monitors-for-home-office", kw: "monitors for home office", g: "monitor", where: (f) => /1920x1080|2560x1440/.test(s(f, "res")) && /IPS/.test(s(f, "panel")) && p(f) <= 250, sort: "price", seo: "Best Monitors for a Home Office",
    lead: "A home office monitor needs a clear IPS panel and enough resolution for side-by-side windows, not gaming speed. Every pick is 1080p or 1440p IPS and cost $250 or less.", close: "Set the monitor top at or just below eye level." },

  // ---------------- Storage and memory ----------------
  { slug: "best-ssds-for-video-editing", kw: "ssds for video editing", g: "ssd", where: (f) => n(f, "capacity") >= 2 && n(f, "read") >= 7000, sort: "-capacity", seo: "Best SSDs for Video Editing",
    lead: "Video editing needs capacity for footage and fast reads for scrubbing timelines. Every pick is 2TB or larger and reads at 7,000MB/s or more, ordered by capacity.", close: "Keep footage and cache on a separate drive from the OS for smoother editing." },
  { slug: "best-pcie-4-0-ssds", kw: "pcie 4.0 ssds", g: "ssd", where: (f) => /PCIe 4\.0 x4$/.test(s(f, "pcie")), sort: "-read", seo: "Best PCIe 4.0 SSDs",
    lead: "PCIe 4.0 drives reach about 7,000MB/s and work in almost every current motherboard. Every pick is a PCIe 4.0 x4 drive, ordered by read speed.", close: "A Gen4 drive in a Gen3 slot still works, at roughly half speed." },
  { slug: "best-high-performance-ssds", kw: "high performance ssds", g: "ssd", where: (f) => /5\.0/.test(s(f, "pcie")), sort: "-read", seo: "Best High-Performance SSDs",
    lead: "PCIe 5.0 drives double Gen4 read speeds for large file work. Every pick is a PCIe 5.0 drive, ordered by read speed.", close: "Gen5 drives run hot; use the motherboard's M.2 heatsink." },
  { slug: "best-ssds-under-150", kw: "ssds under 150", g: "ssd", where: (f) => p(f) > 100 && p(f) <= 150, sort: "-capacity", seo: "Best SSDs Under $150",
    lead: "Between $100 and $150, SSDs reach 2TB at Gen4 speeds. Every pick sits in that range, ordered by capacity.", close: "Leave 10 to 20 percent free space to keep write speeds up." },
  { slug: "best-ssds-under-300", kw: "ssds under 300", g: "ssd", where: (f) => p(f) > 150 && p(f) <= 300, sort: "-read", seo: "Best SSDs Under $300",
    lead: "Between $150 and $300, you can buy 4TB Gen4 drives or fast Gen5 models. Every pick sits in that range, ordered by read speed.", close: "Pick capacity first; the speed difference matters less day to day." },
  { slug: "best-64gb-ram", kw: "64gb ram", g: "ram", where: (f) => n(f, "capacity") === 64, sort: "price", seo: "Best 64GB RAM Kits",
    lead: "64GB suits heavy video editing, large datasets and virtual machines. Every pick is a 64GB kit, ordered from the lowest price.", close: "Check your motherboard's supported speed with four DIMMs; it's often lower than with two." },
  { slug: "best-low-latency-ram", kw: "low latency ram", g: "ram", where: (f) => n(f, "cl") > 0 && (s(f, "gen") === "DDR5" ? n(f, "cl") <= 30 : n(f, "cl") <= 16), sort: "cl", seo: "Best Low-Latency RAM",
    lead: "Lower CAS latency at a given speed means faster memory access. Every pick is DDR5 at CL30 or lower, or DDR4 at CL16 or lower, ordered by CAS latency.", close: "Enable EXPO or XMP in the BIOS, or the kit runs at base speed." },
  { slug: "best-ram-for-am5", kw: "ram for am5", g: "ram", where: (f) => s(f, "gen") === "DDR5" && /EXPO/.test(s(f, "profiles")), sort: "price", seo: "Best RAM for AM5",
    lead: "AM5 Ryzen chips run best with DDR5-6000 and an AMD EXPO profile. Every pick is DDR5 with EXPO support, ordered from the lowest price.", close: "DDR5-6000 is AM5's sweet spot; faster kits rarely help." },
  { slug: "best-ram-for-intel", kw: "ram for intel", g: "ram", where: (f) => /XMP/.test(s(f, "profiles")) && s(f, "gen") === "DDR5", sort: "-speed", seo: "Best DDR5 RAM for Intel",
    lead: "Intel's XMP profiles set the rated speed with one BIOS switch. Every pick is DDR5 with XMP support, ordered by speed.", close: "Check your board's memory support list for kits above 6,400MT/s." },
  { slug: "best-ram-with-high-clock-speeds", kw: "ram with high clock speeds", g: "ram", where: (f) => n(f, "speed") >= 6400, sort: "-speed", seo: "Best High-Speed RAM",
    lead: "Kits at 6,400MT/s and above help memory-sensitive work, if the CPU and board can run them. Every pick is rated at 6,400MT/s or faster, ordered by speed.", close: "Test stability with a memory tester after enabling the profile." },
  { slug: "best-ram-under-100", kw: "ram under 100", g: "ram", where: (f) => p(f) <= 100, sort: "-capacity", seo: "Best RAM Under $100",
    lead: "Under $100 you can still buy a 32GB DDR5 kit or fast DDR4. Every pick cost $100 or less, ordered by capacity.", close: "Buy a matched two-stick kit rather than two single sticks." },
  { slug: "best-ram-under-200", kw: "ram under 200", g: "ram", where: (f) => p(f) > 100 && p(f) <= 200, sort: "-speed", seo: "Best RAM Under $200",
    lead: "Between $100 and $200 you reach 32GB kits with tight timings or 64GB kits. Every pick sits in that range, ordered by speed.", close: "Check the heat spreader height against your CPU cooler." },

  // ---------------- Motherboards ----------------
  { slug: "best-microatx-motherboards", kw: "microatx motherboards", g: "mb", where: (f) => /Micro-ATX/.test(s(f, "form")), sort: "-m2", seo: "Best Micro-ATX Motherboards",
    lead: "Micro-ATX boards fit smaller cases while keeping four RAM slots on most models. Every pick is Micro-ATX, ordered by M.2 slot count.", close: "Check PCIe slot spacing if you plan a thick GPU plus an expansion card." },
  { slug: "best-motherboards-under-200", kw: "motherboards under 200", g: "mb", where: (f) => p(f) <= 200, sort: "-m2", seo: "Best Motherboards Under $200",
    lead: "Under $200, boards cover mainstream CPUs with Wi-Fi and enough M.2 slots for most builds. Every pick cost $200 or less, ordered by M.2 slots.", close: "A budget board is fine for a 65W CPU; high-end chips need stronger VRMs." },
  { slug: "best-motherboards-under-300", kw: "motherboards under 300", g: "mb", where: (f) => p(f) > 200 && p(f) <= 300, sort: "-lan", seo: "Best Motherboards Under $300",
    lead: "Between $200 and $300, boards add faster networking, better VRMs and more USB. Every pick sits in that range, ordered by LAN speed.", close: "Check rear USB count; it varies a lot at this price." },
  { slug: "best-workstation-motherboards", kw: "workstation motherboards", g: "mb", where: (f) => /X870E|X670E|Z890/.test(s(f, "chipset")) && n(f, "m2") >= 4, sort: "-price", seo: "Best Workstation Motherboards",
    lead: "A workstation board needs a strong VRM, several M.2 slots and fast networking for long workloads. Every pick uses an X870E, X670E or Z890 chipset with four or more M.2 slots.", close: "Check lane sharing if you'll fill every M.2 slot and add a second GPU." },

  // ---------------- Power supplies and cases ----------------
  { slug: "best-fully-modular-psus", kw: "fully modular psus", g: "psu", where: (f) => s(f, "modular") === "full" && n(f, "watts") <= 850, sort: "price", seo: "Best Fully Modular PSUs",
    lead: "A fully modular PSU lets you fit only the cables you use, including the 24-pin. Every pick is fully modular at 850W or less, ordered from the lowest price.", close: "Never mix modular cables between PSU brands or models." },
  { slug: "best-80-plus-titanium-psus", kw: "80 plus titanium psus", g: "psu", where: (f) => /Titanium/.test(s(f, "eff") + s(f, "cyb")), sort: "price", seo: "Best 80 Plus Titanium PSUs",
    lead: "Titanium units waste the least power as heat, which suits PCs that run long hours. Every pick carries a Titanium rating, ordered from the lowest price.", close: "Titanium pays off most at high load over long hours." },
  { slug: "best-psus-for-high-end-gpus", kw: "psus for high end gpus", g: "psu", where: (f) => n(f, "watts") >= 1000 && (n(f, "hpwr") >= 1 || /12V-2x6/.test(t(f))), sort: "-watts", seo: "Best PSUs for High-End GPUs",
    lead: "Flagship GPUs need a native 12V-2x6 cable and headroom for transient spikes. Every pick is 1000W or more with a 12V-2x6 connector, ordered by wattage.", close: "Seat the 12V-2x6 plug fully and avoid tight bends near the connector." },
  { slug: "best-compact-pc-cases", kw: "compact pc cases", g: "pcCase", where: (f) => n(f, "volume") > 0 && n(f, "volume") <= 30, sort: "volume", seo: "Best Compact PC Cases",
    lead: "Compact cases save desk space but limit GPU length and cooler height. Every pick is 30 litres or smaller, ordered from the smallest.", close: "Check the GPU length, cooler height and PSU format before buying parts." },
  { slug: "best-black-pc-cases", kw: "black pc cases", g: "pcCase", where: (f) => /black/i.test(f.name), sort: "price", seo: "Best Black PC Cases",
    lead: "A black case hides dust and suits dark builds. Every pick is sold in black, ordered from the lowest price.", close: "Black cable extensions finish the look through the glass." },

  // ---------------- GPUs ----------------
  { slug: "best-ray-tracing-gpus", kw: "ray tracing gpus", g: "gpu", where: (f) => /RTX 50|RTX 40/.test(s(f, "chip")) && n(f, "vram") >= 12, sort: "price", seo: "Best GPUs for Ray Tracing",
    lead: "NVIDIA's RTX 40 and 50 series handle ray tracing best, and DLSS keeps frame rates playable. Every pick is an RTX 40 or 50 card with 12GB or more, ordered from the lowest price.", close: "Turn on DLSS or frame generation with ray tracing to keep frame rates up." },
  { slug: "best-3d-rendering-gpus", kw: "3d rendering gpus", g: "gpu", where: (f) => /RTX/.test(s(f, "chip")) && n(f, "vram") >= 16, sort: "-vram", seo: "Best GPUs for 3D Rendering",
    lead: "GPU renderers like Blender Cycles use CUDA or OptiX, and VRAM limits scene size. Every pick is an NVIDIA RTX card with 16GB or more, ordered by VRAM.", close: "Check your renderer's supported GPUs before buying." },
  { slug: "best-gpus-for-beginners", kw: "gpus for beginners", g: "gpu", where: (f) => p(f) <= 400 && s(f, "power") === "1 x 8-pin", sort: "price", seo: "Best GPUs for First Builds",
    lead: "A first GPU should be easy to power and fit. Every pick needs one 8-pin connector and cost $400 or less, ordered from the lowest price.", close: "Install the latest driver from the GPU maker's site before playing." },
  { slug: "best-cad-gpus", kw: "cad gpus", g: "gpu", where: (f) => /RTX/.test(s(f, "chip")) && n(f, "vram") >= 12 && p(f) <= 900, sort: "-vram", seo: "Best GPUs for CAD",
    lead: "CAD viewports need steady drivers and enough VRAM for large assemblies. Every pick is an NVIDIA RTX card with 12GB or more that cost $900 or less.", close: "Check whether your CAD software certifies GeForce or needs a pro card." },

  // ---------------- Speakers, webcams, prebuilt ----------------
  { slug: "best-pc-soundbars", kw: "pc soundbars", g: "speaker", where: (f) => /soundbar/i.test(s(f, "form")) && !/HDMI|TV/i.test(s(f, "inputs") + f.name), sort: "price", seo: "Best PC Soundbars",
    lead: "A desktop soundbar fits under a monitor and runs from USB or 3.5mm without a TV connection. Every pick is a desktop-style soundbar, ordered from the lowest price.", close: "Place it centred under the monitor for the best stereo image." },
  { slug: "best-compact-speakers", kw: "compact speakers", g: "speaker", where: (f) => /stereo pair|studio monitor/i.test(s(f, "form")) && (n(f, "woofer") <= 4 || /Pebble|USB/.test(f.name)), sort: "price", seo: "Best Compact PC Speakers",
    lead: "Compact speakers fit beside a monitor on a small desk. Every pick is a small stereo pair, ordered from the lowest price.", close: "Angle them toward your ears for clearer highs." },
  { slug: "best-webcams-with-built-in-lights", kw: "webcams with built in lights", g: "webcam", where: re(/ring light|built-in light|fill light/i), sort: "price", seo: "Best Webcams With Built-In Lights",
    lead: "A built-in light fixes a dim room without a separate lamp. Every pick has a ring or fill light on the camera, ordered from the lowest price.", close: "Built-in lights help most at arm's length; farther away they fade." },
  { slug: "best-skytech-gaming-pcs", kw: "skytech gaming pcs", g: "prebuilt", where: (f) => /Skytech/i.test(f.name), sort: "price", seo: "Best Skytech Gaming PCs",
    lead: "Skytech builds prebuilt gaming PCs across budgets with mainstream parts. Every pick is a Skytech system, ordered from the lowest price.", close: "Check the exact PSU and RAM configuration; it varies by model." },
  { slug: "best-liquid-cooled-gaming-pcs", kw: "liquid cooled gaming pcs", g: "prebuilt", where: re(/liquid|AIO|water/i), sort: "price", seo: "Best Liquid-Cooled Gaming PCs",
    lead: "A liquid cooler keeps hot CPUs quieter under load. Every pick uses an AIO liquid cooler, ordered from the lowest price.", close: "Check the pump's warranty along with the system warranty." },
  { slug: "best-air-cooled-gaming-pcs", kw: "air cooled gaming pcs", g: "prebuilt", where: re(/air cooler|tower cooler/i), sort: "price", seo: "Best Air-Cooled Gaming PCs",
    lead: "Air-cooled PCs have no pump to fail and suit mid-range CPUs. Every pick uses an air cooler, ordered from the lowest price.", close: "Clean dust from the heatsink every few months." },
];
