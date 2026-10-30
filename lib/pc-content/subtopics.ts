import type { PcCategory } from "./types";

/**
 * Sub-topic hubs under each primary category (/topics/<category>/<subtopic>).
 * An article belongs to the sub-topic whose pattern matches earliest in its slug
 * (ties go to the longer match), so "best-cpu-for-rtx-4070" is a CPU guide and
 * "best-cpu-cooler-for-..." a cooler guide. `subtopic` on a record overrides this.
 */
export interface Subtopic {
  slug: string;
  category: PcCategory;
  title: string;
  /** Hub H1 and card label, e.g. "Graphics Cards". */
  seoTitle: string;
  metaDescription: string;
  /** 2-3 sentence hub introduction: what the hub helps decide and what to check. */
  intro: string;
  /** What a reader should verify first; rendered as the hub checklist. */
  checklist: string[];
  pattern: RegExp;
  /** Sub-topics whose guides answer compatibility questions for this one. */
  compat: string[];
}

export const SUBTOPICS: Subtopic[] = [
  // ── Components
  {
    slug: "graphics-cards", category: "components", title: "Graphics Cards", seoTitle: "Graphics Card Guides",
    metaDescription: "Graphics card guides by resolution, budget and workload, with the power, connector and case clearance checks to make before you buy a GPU.",
    intro: "Pick a graphics card by the resolution and refresh rate you actually play at, then check that your power supply, case and CPU can carry it. These guides cover GPUs by budget, by game and by creative workload.",
    checklist: ["Card length and slot width against your case's GPU clearance", "PSU wattage and the power connector the card needs (8-pin or 12V-2x6)", "The resolution and refresh rate of the monitor it will drive"],
    pattern: /(^|-)(gpus?|graphics-cards?|rtx|rx-\d|radeon|geforce|arc-[ab]\d|video-cards?)(-|$)/,
    compat: ["power-supplies", "pc-cases", "processors", "gaming-monitors"],
  },
  {
    slug: "processors", category: "components", title: "Processors", seoTitle: "CPU Guides",
    metaDescription: "CPU guides for gaming, streaming and creative work, with the socket, chipset, BIOS and cooler checks to make before you pick a processor.",
    intro: "A processor choice fixes your socket, motherboard chipset and memory type, so start with the platform, then the workload. These guides compare CPUs by budget, by GPU pairing and by task.",
    checklist: ["Socket and chipset support on the motherboard (AM5, LGA 1700, LGA 1851)", "BIOS version needed for the CPU on an older board", "Whether the box includes a cooler, and the cooler's rated TDP"],
    pattern: /(^|-)(cpus?|processors?|ryzen|core-(i\d|ultra)|intel-core|threadripper|apus?)(-|$)/,
    compat: ["motherboards", "cpu-coolers", "memory", "graphics-cards"],
  },
  {
    slug: "motherboards", category: "components", title: "Motherboards", seoTitle: "Motherboard Guides",
    metaDescription: "Motherboard guides by socket, chipset and form factor, with the BIOS, M.2 slot, VRM and case-fit checks to make before you choose a board.",
    intro: "The motherboard decides which CPUs, memory and storage your PC can use now and after an upgrade. These guides compare boards by socket, chipset and form factor.",
    checklist: ["Socket and chipset for your CPU, plus the BIOS version that supports it", "Form factor (ATX, micro-ATX, Mini-ITX) against your case", "M.2 slot count and which slots share lanes with SATA or the GPU"],
    pattern: /(^|-)(motherboards?|mobos?|b\d50|x\d70|z\d90|chipsets?)(-|$)/,
    compat: ["processors", "memory", "pc-cases", "storage"],
  },
  {
    slug: "memory", category: "components", title: "Memory (RAM)", seoTitle: "RAM Guides",
    metaDescription: "RAM guides covering DDR4 and DDR5 kits by capacity and speed, with the motherboard QVL, EXPO/XMP and cooler-clearance checks to make first.",
    intro: "Memory has to match your motherboard's DDR generation before speed or capacity matter. These guides compare RAM kits by capacity, speed and platform.",
    checklist: ["DDR4 or DDR5, as your motherboard requires", "Kit speed against the board and CPU's supported range (EXPO or XMP)", "Module height against a large air cooler"],
    pattern: /(^|-)(ram|memory|ddr\d|dimms?|so-dimm)(-|$)/,
    compat: ["motherboards", "processors", "cpu-coolers"],
  },
  {
    slug: "storage", category: "components", title: "SSDs and Storage", seoTitle: "SSD and Storage Guides",
    metaDescription: "Internal SSD and storage guides by interface and workload, with the M.2 length, PCIe generation, heatsink and slot-sharing checks to make first.",
    intro: "Internal storage choices start with the slot: M.2 NVMe, SATA or a 3.5-inch bay. These guides compare drives by interface, capacity and workload.",
    checklist: ["M.2 length (2280) and the PCIe generation of the slot", "Whether a heatsink fits under the GPU or the board's own cover", "Whether the M.2 slot disables SATA ports on your board"],
    pattern: /(^|-)(ssds?|nvme|m-2|hard-drives?|hdds?|internal-storage|sata)(-|$)/,
    compat: ["motherboards", "external-storage"],
  },
  {
    slug: "power-supplies", category: "components", title: "Power Supplies", seoTitle: "Power Supply Guides",
    metaDescription: "Power supply guides by wattage and form factor, with the GPU connector, ATX 3.x, efficiency and case-length checks to make before you buy a PSU.",
    intro: "Size a power supply from the GPU and CPU you will run, then check the connectors and the space in your case. These guides compare PSUs by wattage, form factor and GPU pairing.",
    checklist: ["Total wattage with headroom for your GPU and CPU", "Native 12V-2x6 (12VHPWR) cable or the 8-pin count your GPU needs", "PSU length and form factor (ATX or SFX) against your case"],
    pattern: /(^|-)(psus?|power-suppl(y|ies)|\d{3,4}w|sfx)(-|$)/,
    compat: ["graphics-cards", "pc-cases", "processors"],
  },
  {
    slug: "pc-cases", category: "components", title: "PC Cases", seoTitle: "PC Case Guides",
    metaDescription: "PC case guides by size and airflow, with the GPU length, cooler height, radiator and motherboard form-factor checks to make before you buy.",
    intro: "A case has to fit every other part: the motherboard form factor, the GPU's length, the cooler's height and the radiator. These guides compare cases by size, airflow and build style.",
    checklist: ["Motherboard form factor support", "Maximum GPU length and CPU cooler height", "Radiator sizes supported at the top and front"],
    pattern: /(^|-)(cases?|casing|chassis|towers?)(-|$)/,
    compat: ["motherboards", "graphics-cards", "cpu-coolers", "power-supplies"],
  },
  {
    slug: "cpu-coolers", category: "components", title: "CPU Coolers and Cooling", seoTitle: "CPU Cooler Guides",
    metaDescription: "CPU cooler, AIO, case fan and thermal paste guides, with the socket bracket, cooler height, radiator fit and RAM clearance checks to make first.",
    intro: "Cooling choices depend on the CPU's heat output and the space in your case. These guides cover air coolers, AIO liquid coolers, case fans and thermal paste.",
    checklist: ["Mounting bracket for your socket (AM5, LGA 1700, LGA 1851)", "Cooler height or radiator size against your case", "Clearance over tall RAM modules"],
    pattern: /(^|-)(coolers?|cpu-coolers?|aios?|liquid-cool(ers?|ing)|thermal-(pastes?|pads?)|case-fans?|fans?|fan-hubs?|heatsinks?|cooling)(-|$)/,
    compat: ["processors", "pc-cases", "memory"],
  },
  // ── PC builds
  {
    slug: "prebuilt-pcs", category: "pc-builds", title: "Prebuilt Gaming PCs", seoTitle: "Prebuilt Gaming PC Guides",
    metaDescription: "Prebuilt gaming PC guides by budget and GPU, with the PSU, motherboard, RAM layout and upgrade-path checks to make before you buy a prebuilt.",
    intro: "A prebuilt is only as good as the parts the listing names and the ones it leaves out. These guides compare prebuilt gaming desktops by budget, GPU and upgrade room.",
    checklist: ["Exact GPU and CPU model, not just the series", "PSU wattage and brand, which listings often omit", "Free RAM slots and M.2 slots for later upgrades"],
    pattern: /(^|-)(prebuilt|pre-built|gaming-(pcs?|desktops?|computers?)|desktops?|computers?|pcs|rigs?|alienware|cyberpower|ibuypower|skytech)(-|$)/,
    compat: ["graphics-cards", "gaming-monitors", "upgrade-guides"],
  },
  {
    slug: "pc-build-guides", category: "pc-builds", title: "PC Build Guides", seoTitle: "PC Build Guides",
    metaDescription: "PC build guides by budget and workload, with the part-compatibility checks (socket, PSU, case clearance) that keep a build list from failing.",
    intro: "A build list works only when every part fits the others. These guides cover complete builds by budget and workload, and the checks that hold them together.",
    checklist: ["CPU socket, motherboard chipset and BIOS version line up", "PSU wattage and connectors cover the GPU", "Case fits the GPU length, cooler height and board size"],
    pattern: /(^|-)(builds?|build-a-pc|parts-list|plan(-a)?)(-|$)/,
    compat: ["processors", "graphics-cards", "motherboards", "power-supplies", "pc-cases"],
  },
  {
    slug: "mini-pcs", category: "pc-builds", title: "Mini and Small Form Factor PCs", seoTitle: "Mini PC and SFF Guides",
    metaDescription: "Mini PC and small form factor guides, with the RAM, storage, display output and cooling limits to check before you buy a compact desktop.",
    intro: "Compact PCs trade upgrade room and cooling for desk space. These guides compare mini PCs and small form factor builds by workload and ports.",
    checklist: ["Whether RAM and storage are socketed or soldered", "Display outputs and how many monitors it drives", "Power adapter rating and sustained cooling"],
    pattern: /(^|-)(mini-pcs?|mini|itx|sff|small-form-factor|compact|nuc)(-|$)/,
    compat: ["monitors-general", "upgrade-guides"],
  },
  // ── Upgrades
  {
    slug: "upgrade-guides", category: "upgrades", title: "Upgrade Guides", seoTitle: "PC Upgrade Guides",
    metaDescription: "PC upgrade guides for RAM, storage, GPU and PSU swaps, with the slot, BIOS, connector and clearance checks to make before you open the case.",
    intro: "An upgrade starts with what your PC already has: free slots, the PSU's connectors and the BIOS version. These guides walk through common upgrades and their limits.",
    checklist: ["Free RAM and M.2 slots, and what each slot supports", "PSU wattage and spare connectors", "BIOS version before a CPU swap"],
    pattern: /(^|-)(upgrades?|install|set-up|how-to)(-|$)/,
    compat: ["memory", "storage", "graphics-cards", "power-supplies"],
  },
  // ── Monitors
  {
    slug: "4k-monitors", category: "monitors", title: "4K Monitors", seoTitle: "4K Monitor Guides",
    metaDescription: "4K monitor guides for gaming, consoles and creative work, with the HDMI 2.1, DisplayPort, scaling and GPU-headroom checks to make first.",
    intro: "4K pays off when your GPU or console can drive it and the panel size makes the detail visible. These guides compare 4K monitors by use, size and refresh rate.",
    checklist: ["HDMI 2.1 or DisplayPort 1.4/2.1 for 4K at high refresh", "GPU headroom for 4K in your games", "Panel size and Windows scaling at your viewing distance"],
    pattern: /(^|-)(4k|uhd|2160p)(-|$)/,
    compat: ["graphics-cards", "gaming-monitors"],
  },
  {
    slug: "oled-monitors", category: "monitors", title: "OLED Monitors", seoTitle: "OLED Monitor Guides",
    metaDescription: "OLED and QD-OLED monitor guides, with the burn-in warranty, text clarity, brightness and refresh-rate checks to make before you buy one.",
    intro: "OLED panels give per-pixel contrast and fast response, with trade-offs in text fringing, brightness and burn-in care. These guides compare OLED monitors by size and use.",
    checklist: ["Burn-in coverage in the warranty", "Subpixel layout if you read a lot of text", "Refresh rate and the input needed to reach it"],
    pattern: /(^|-)(oled|qd-oled|woled)(-|$)/,
    compat: ["graphics-cards", "gaming-monitors"],
  },
  {
    slug: "ultrawide-monitors", category: "monitors", title: "Ultrawide and Curved Monitors", seoTitle: "Ultrawide Monitor Guides",
    metaDescription: "Ultrawide and curved monitor guides, with the desk depth, curvature, GPU load and game-support checks to make before you go wider than 16:9.",
    intro: "Ultrawide and curved screens need desk depth, GPU headroom and games or apps that support the aspect ratio. These guides compare them by size and use.",
    checklist: ["Desk depth and width for the panel", "Aspect ratio support in your main games or apps", "GPU headroom for the extra pixels"],
    pattern: /(^|-)(ultrawide|ultra-wide|curved|super-ultrawide|34-inch|49-inch)(-|$)/,
    compat: ["graphics-cards", "monitor-accessories"],
  },
  {
    slug: "portable-monitors", category: "monitors", title: "Portable Monitors", seoTitle: "Portable Monitor Guides",
    metaDescription: "Portable monitor guides for laptops, consoles and travel, with the USB-C DisplayPort Alt Mode, power draw and stand checks to make first.",
    intro: "A portable monitor depends on your laptop's USB-C port carrying video and enough power. These guides compare portable displays by size, input and power.",
    checklist: ["USB-C port with DisplayPort Alt Mode on your laptop", "Whether the screen needs a separate power source", "Stand or case design for where you will use it"],
    pattern: /(^|-)(portable|travel|laptop-monitors?)(-|$)/,
    compat: ["monitors-general"],
  },
  {
    slug: "gaming-monitors", category: "monitors", title: "Gaming Monitors", seoTitle: "Gaming Monitor Guides",
    metaDescription: "Gaming monitor guides by resolution, refresh rate and console, with the input, VRR and GPU-pairing checks to make before you buy a display.",
    intro: "A gaming monitor should match the frame rates your GPU or console delivers. These guides compare gaming displays by resolution, refresh rate and platform.",
    checklist: ["Refresh rate your GPU can reach at that resolution", "Inputs for the frame rate you want (DisplayPort or HDMI 2.1)", "VRR support for your GPU or console (G-SYNC, FreeSync, HDMI VRR)"],
    pattern: /(^|-)(gaming|\d{3}hz|1440p|1080p|ps5|xbox|esports|fps)(-|$)/,
    compat: ["graphics-cards", "4k-monitors", "monitor-accessories"],
  },
  {
    slug: "monitors-general", category: "monitors", title: "Monitors for Work and Everyday Use", seoTitle: "Work and Office Monitor Guides",
    metaDescription: "Monitor guides for work, office and everyday use, with the USB-C power delivery, ergonomic stand and text-clarity checks to make before you buy.",
    intro: "A work monitor should suit your laptop's ports, your desk and hours of reading text. These guides compare monitors for office work, Mac setups and everyday use.",
    checklist: ["USB-C with enough power delivery for your laptop", "Height, tilt and swivel adjustment on the stand", "Pixel density for sharp text at your screen size"],
    pattern: /(^|-)(monitors?|displays?|screens?)(-|$)/,
    compat: ["monitor-accessories", "portable-monitors"],
  },
  // ── Peripherals
  {
    slug: "mice", category: "peripherals", title: "Mice", seoTitle: "Mouse Guides",
    metaDescription: "Gaming and work mouse guides by grip, weight and connection, with the hand-size, sensor and software checks to make before you buy a mouse.",
    intro: "Choose a mouse by grip, hand size and connection first; sensor numbers matter less than the shape. These guides compare gaming and work mice by use and budget.",
    checklist: ["Shape and size against your hand and grip", "Wired, 2.4 GHz or Bluetooth, and battery life", "Weight and button count for your games or apps"],
    pattern: /(^|-)(mouse|mice)(-|$)/,
    compat: ["mouse-pads", "keyboards"],
  },
  {
    slug: "mouse-pads", category: "peripherals", title: "Mouse Pads and Desk Mats", seoTitle: "Mouse Pad Guides",
    metaDescription: "Mouse pad and desk mat guides by surface, size and thickness, with the desk-fit and mouse-feet checks to make before you buy a pad.",
    intro: "A pad's surface sets how fast and controlled the mouse glides, and its size has to suit your desk and sensitivity. These guides compare pads and desk mats.",
    checklist: ["Pad size against desk space and your sensitivity", "Speed or control surface for your aim style", "Stitched edges and base grip"],
    pattern: /(^|-)(mouse-pads?|mousepads?|desk-mats?|pads?)(-|$)/,
    compat: ["mice"],
  },
  {
    slug: "keyboards", category: "peripherals", title: "Keyboards", seoTitle: "Keyboard Guides",
    metaDescription: "Keyboard guides by layout, switch type and connection, with the OS-compatibility, hot-swap and desk-space checks to make before you buy.",
    intro: "Start with layout and switch type, then connection and OS support. These guides compare mechanical, wireless and work keyboards by size and use.",
    checklist: ["Layout (full-size, TKL, 75%, 65%) for your desk and number-pad needs", "Switch type and whether switches are hot-swappable", "Mac or Windows key legends and software support"],
    pattern: /(^|-)(keyboards?|keypads?|switches)(-|$)/,
    compat: ["mice", "desk-setup"],
  },
  {
    slug: "headsets", category: "peripherals", title: "Headsets and Headphones", seoTitle: "Headset Guides",
    metaDescription: "Gaming and work headset guides by connection and platform, with the mic, console compatibility and comfort checks to make before you buy.",
    intro: "A headset has to connect to every device you use, and its mic has to suit your calls or streams. These guides compare headsets and headphones by platform and use.",
    checklist: ["Connection (USB, 2.4 GHz, Bluetooth, 3.5 mm) for each device you use", "Console compatibility listed by the maker", "Mic type and weight for long sessions"],
    pattern: /(^|-)(headsets?|headphones?|head-phones?|earbuds?|iems?|in-ear(-monitors?)?)(-|$)/,
    compat: ["microphones", "speakers"],
  },
  {
    slug: "microphones", category: "peripherals", title: "Microphones", seoTitle: "Microphone Guides",
    metaDescription: "USB and XLR microphone guides for streaming, calls and podcasts, with the polar pattern, mount and interface checks to make before you buy.",
    intro: "A microphone choice comes down to connection (USB or XLR), polar pattern and the room you record in. These guides compare mics for streaming, calls and podcasts.",
    checklist: ["USB or XLR, and whether you need an audio interface", "Polar pattern for a noisy or quiet room", "Mount thread for a boom arm or stand"],
    pattern: /(^|-)(microphones?|mics?)(-|$)/,
    compat: ["streaming-gear", "headsets"],
  },
  {
    slug: "streaming-gear", category: "peripherals", title: "Webcams and Streaming Gear", seoTitle: "Webcam and Streaming Guides",
    metaDescription: "Webcam, capture card and stream controller guides, with the resolution, USB bandwidth and software-support checks to make before you buy.",
    intro: "Streaming and video-call gear depends on USB bandwidth, software support and your lighting. These guides compare webcams, capture cards and stream controllers.",
    checklist: ["Resolution and frame rate you will actually stream or call at", "USB port type and bandwidth (USB 3.0 for 4K capture)", "Support in OBS, Teams, Zoom or your console"],
    pattern: /(^|-)(webcams?|cameras?|capture(-cards?)?|stream(ing)?-decks?|streaming|ring-lights?|key-lights?)(-|$)/,
    compat: ["microphones", "graphics-cards"],
  },
  {
    slug: "speakers", category: "peripherals", title: "PC Speakers", seoTitle: "PC Speaker Guides",
    metaDescription: "PC speaker guides by size, connection and desk space, with the input, subwoofer and power checks to make before you buy desktop speakers.",
    intro: "Desktop speakers have to suit your inputs, desk space and whether you want a subwoofer. These guides compare PC and computer speakers by size and use.",
    checklist: ["Inputs (USB, 3.5 mm, optical, Bluetooth) your PC offers", "Desk space for the speakers and any subwoofer", "Whether they need a separate power outlet"],
    pattern: /(^|-)(speakers?|studio-monitors?|soundbars?|subwoofers?|sound-cards?|dacs?)(-|$)/,
    compat: ["headsets"],
  },
  {
    slug: "controllers", category: "peripherals", title: "Controllers", seoTitle: "PC Controller Guides",
    metaDescription: "PC controller guides by connection and platform, with the Xinput, Steam Input, drift-resistant stick and battery checks to make before you buy.",
    intro: "A PC controller should connect the way you play and be recognised by your games. These guides compare gamepads, flight sticks and racing wheels.",
    checklist: ["Wired, 2.4 GHz or Bluetooth, and Xinput support", "Stick type (Hall effect or standard potentiometer)", "Battery life or rechargeable pack"],
    pattern: /(^|-)(controllers?|gamepads?|joysticks?|flight-sticks?|racing-wheels?|wheels?|hotas)(-|$)/,
    compat: ["headsets"],
  },
  {
    slug: "external-storage", category: "peripherals", title: "External Storage", seoTitle: "External SSD and Drive Guides",
    metaDescription: "External SSD and portable drive guides, with the USB port speed, cable, console support and file-system checks to make before you buy one.",
    intro: "External drive speed is capped by the port it plugs into. These guides compare portable SSDs, hard drives and flash drives by speed, capacity and device support.",
    checklist: ["USB port speed on your PC or console (USB 3.2 Gen 2, USB4, Thunderbolt)", "Console or Mac support if you need it", "Capacity against your backup or game library"],
    pattern: /(^|-)(external-(hard-drives?|ssds?|drives?|storage)|portable-ssds?|ssd-portable|portable-drives?|microsd(-cards?)?|flash-drives?|usb-drives?|thumb-drives?|nas)(-|$)/,
    compat: ["storage", "usb-hubs-docks"],
  },
  {
    slug: "usb-hubs-docks", category: "peripherals", title: "USB Hubs, Docks and KVM Switches", seoTitle: "USB Hub and Dock Guides",
    metaDescription: "USB hub, docking station and KVM switch guides, with the port bandwidth, display output and power delivery checks to make before you buy.",
    intro: "Hubs and docks share one port's bandwidth among every device you plug in. These guides compare USB hubs, docks and KVM switches by ports and display support.",
    checklist: ["Host port type (USB-C, Thunderbolt, USB-A) and its bandwidth", "Number of displays and refresh rate supported", "Power delivery wattage for your laptop"],
    pattern: /(^|-)(hubs?|usb-hubs?|docks?|docking-stations?|kvms?|kvm-switch(es)?|adapters?|cables?)(-|$)/,
    compat: ["external-storage", "monitors-general"],
  },
  {
    slug: "desk-setup", category: "peripherals", title: "Chairs, Desks and Desk Setup", seoTitle: "Gaming Chair and Desk Guides",
    metaDescription: "Gaming chair, desk and monitor arm guides, with the size, weight capacity, adjustment and desk-clamp checks to make before you buy.",
    intro: "Chairs, desks and arms have to fit your body, your room and your monitors. These guides compare gaming and office chairs, desks and monitor arms by size and adjustment.",
    checklist: ["Weight capacity and seat dimensions for your height", "Adjustments you will use (lumbar, armrests, seat depth)", "Desk thickness and VESA load for monitor arms"],
    pattern: /(^|-)(chairs?|seats?|desks?|monitor-arms?|arms?|footrests?|stands?|standing-desks?|risers?)(-|$)/,
    compat: ["monitor-accessories", "keyboards"],
  },
  {
    slug: "monitor-accessories", category: "peripherals", title: "Monitor Arms and Accessories", seoTitle: "Monitor Arm and Mount Guides",
    metaDescription: "Monitor arm, mount and light bar guides, with the VESA pattern, weight range and desk-clamp checks to make before you mount a display.",
    intro: "Mounts and accessories have to match your monitor's VESA pattern and weight. These guides compare monitor arms, mounts and light bars.",
    checklist: ["VESA pattern (75 or 100) on your monitor", "Weight and size range of the arm", "Desk clamp or grommet fit"],
    pattern: /(^|-)(monitor-(mounts?|arms?|stands?|light-bars?)|vesa|light-bars?)(-|$)/,
    compat: ["desk-setup", "monitors-general"],
  },
  {
    slug: "networking", category: "peripherals", title: "Networking and Wi-Fi", seoTitle: "PC Networking Guides",
    metaDescription: "Router, mesh Wi-Fi, network switch and powerline guides for a PC setup, with the Wi-Fi standard, port speed and coverage checks to make first.",
    intro: "A fast PC still waits on its network. These guides cover routers, mesh systems, switches and powerline adapters, and how to match them to your connection and rooms.",
    checklist: ["Your internet plan speed and the router's WAN port", "Wi-Fi standard on both router and PC (Wi-Fi 6, 6E, 7)", "Wired option (Ethernet run, powerline or MoCA) for the gaming PC"],
    pattern: /(^|-)(routers?|mesh-(wi-fi|wifi|routers?|systems?|networks?)|wi-fi|wifi|network(-switch(es)?)?|ethernet|powerline|surge-protectors?|ups)(-|$)/,
    compat: ["expansion-cards"],
  },
  {
    slug: "expansion-cards", category: "components", title: "Expansion Cards and PC Accessories", seoTitle: "Expansion Card and PC Add-on Guides",
    metaDescription: "PCIe Wi-Fi card, USB expansion card, riser cable and RGB/fan controller guides, with the slot, header and lane checks to make before you buy.",
    intro: "Add-on cards and controllers depend on free PCIe slots, motherboard headers and lane sharing. These guides cover Wi-Fi and USB cards, risers, UPS units and lighting or fan controllers.",
    checklist: ["A free PCIe slot of the right size, and whether it shares lanes", "Motherboard headers (ARGB 5V, PWM fan, USB) the add-on needs", "Clearance next to the GPU"],
    pattern: /(^|-)(pcie(?!-[0-9])|pci-e(?!-[0-9])|riser|wifi-cards?|usb-expansion|expansion-cards?|a?rgb-controllers?|rgb-led-strips?|fan-hubs?|controllers?|ups|surge-protectors?|microsd(-cards?)?)(-|$)/,
    compat: ["motherboards", "networking"],
  },
];

/**
 * Informational guides whose slugs name no product noun. Keep this short: prefer
 * fixing a pattern when a whole family of slugs is missed.
 */
const OVERRIDES: Record<string, string> = {
  "choose-pc-components": "pc-build-guides",
  "how-much-vram-do-you-need": "graphics-cards",
  "when-is-integrated-graphics-enough-for-a-pc": "graphics-cards",
  "atx-vs-micro-atx-vs-mini-itx": "motherboards",
  "how-to-check-pc-part-compatibility-before-you-buy": "pc-build-guides",
  "xmp-vs-expo-what-they-do-and-how-to-use-them": "memory",
  "80-plus-ratings-explained": "power-supplies",
  "ups-vs-surge-protector-for-a-pc": "expansion-cards",
  "pc-airflow-explained": "cpu-coolers",
  "pc-won-t-boot-step-by-step-diagnosis": "upgrade-guides",
  "pc-turns-on-but-no-display": "upgrade-guides",
  "why-your-pc-randomly-shuts-down": "upgrade-guides",
  "why-is-my-pc-storage-full": "upgrade-guides",
  "why-are-my-pc-fans-so-loud": "upgrade-guides",
  "how-to-plan-a-home-office-pc": "pc-build-guides",
  "how-to-plan-a-streaming-pc": "pc-build-guides",
  "how-to-plan-a-video-editing-pc": "pc-build-guides",
  "how-to-choose-drives-for-a-nas": "storage",
  "how-to-choose-a-game-drive-for-pc": "storage",
  "how-to-choose-a-windows-boot-drive": "storage",
  "how-to-choose-a-pcie-usb-expansion-card": "networking",
  "how-to-choose-a-pcie-wi-fi-card": "networking",
  "how-to-choose-a-all-in-one-pc-without-overpaying": "prebuilt-pcs",
  "how-to-choose-a-workstation-pc-without-overpaying": "prebuilt-pcs",
  "best-pc-for-video-editing": "prebuilt-pcs",
};

const byCategory = new Map<PcCategory, Subtopic[]>();
for (const s of SUBTOPICS) byCategory.set(s.category, [...(byCategory.get(s.category) ?? []), s]);

export const subtopicsIn = (c: PcCategory) => byCategory.get(c) ?? [];
export const getSubtopic = (slug: string) => SUBTOPICS.find((s) => s.slug === slug);
export const subtopicHref = (s: Subtopic) => `/topics/${s.category}/${s.slug}`;

/** The sub-topic for an article: an explicit override, else the earliest (then longest) pattern match within its category. */
export function classify(a: { slug: string; category: PcCategory; subtopic?: string }): Subtopic | undefined {
  const o = a.subtopic ?? OVERRIDES[a.slug];
  if (o) return getSubtopic(o);
  const key = a.slug.replace(/^best-/, "");
  let best: { s: Subtopic; at: number; len: number } | undefined;
  for (const s of subtopicsIn(a.category)) {
    const m = s.pattern.exec(key);
    if (!m) continue;
    const at = m.index, len = m[0].length;
    if (a.category === "monitors") return s; // monitors: list order, specific panels before "gaming"
    if (!best || at < best.at || (at === best.at && len > best.len)) best = { s, at, len };
  }
  return best?.s;
}
