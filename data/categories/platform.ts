import mbPool from "@/data/pcj-pool/motherboard.json";
import ramPool from "@/data/pcj-pool/ram.json";
import storagePool from "@/data/pcj-pool/storage.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

/* ---------------------------------------------------------------- Motherboards */

export const mbSchema: CategorySchema = {
  id: "motherboard",
  plural: "Boards",
  fields: [
    { key: "m2", label: "M.2 slots", noun: "M.2 slot count", better: "higher", superlative: ["most", "fewest"], fmt: (v) => `${v}`, strength: (v) => (Number(v) >= 4 ? `${v} M.2 slots for SSD expansion` : undefined), weakness: (v) => (Number(v) <= 2 ? `Only ${v} M.2 slots` : undefined) },
    { key: "lan", label: "Wired LAN", noun: "wired network speed", better: "higher", superlative: ["fastest", "slowest"], fmt: (v) => `${v}Gbps`, strength: (v) => (Number(v) >= 5 ? `${v}Gbps wired Ethernet` : undefined) },
    { key: "wifi", label: "Wi-Fi", fmt: (v) => String(v), strength: (v) => (v === "Wi-Fi 7" ? "Wi-Fi 7 built in" : undefined), weakness: (v) => (v === "Wi-Fi 6E" ? "Wi-Fi 6E rather than Wi-Fi 7" : undefined) },
    { key: "vrm", label: "Power stages", fmt: (v) => String(v), strength: (v) => (/^1[4-9]|^2/.test(String(v)) ? `${v} power stage layout` : undefined) },
    { key: "usb4", label: "USB4", fmt: (v) => (v ? "Yes" : "Not listed"), strength: (v) => (v ? "USB4 ports on the rear panel" : undefined) },
    { key: "form", label: "Form factor", fmt: (v) => String(v), weakness: (v) => (v === "E-ATX" ? "E-ATX size needs a case that lists E-ATX support" : undefined) },
    { key: "warranty", label: "Warranty", fmt: (v) => `${v}-year`, strength: (v) => (Number(v) >= 5 ? `${v}-year warranty` : undefined) },
    { key: "socket", label: "Socket", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    if (f.specs.socket === "AM5") s.push("It uses AMD's AM5 socket, so it takes Ryzen 7000, 8000 and 9000 chips; a board built before a CPU's launch may need a BIOS update first, so check whether it supports BIOS Flashback.");
    else s.push("It uses Intel's LGA1851 socket for Core Ultra 200S processors, not older 12th to 14th Gen chips.");
    if (f.specs.form === "Mini-ITX") s.push("As a Mini-ITX board it has one PCIe x16 slot and two memory slots, so plan for a two-stick memory kit and check the case's cooler and GPU limits.");
    else if (f.specs.form === "E-ATX") s.push("Confirm your case offers E-ATX support; many mid-towers stop at ATX.");
    if (f.specs.m2 !== undefined) s.push("Check the manual for which M.2 slots share lanes with SATA ports or the second PCIe slot before filling them all.");
    return s;
  },
  criteria: [
    { id: "chipset", title: "Match the chipset to your plans", body: "On AM5, B850 covers most gaming builds with PCIe 5.0 for at least one slot. X870E adds more PCIe 5.0 lanes and USB4 for heavy expansion.\n\nFeatures, not frame rates, separate the chipsets." },
    { id: "m2", title: "Count M.2 slots", body: "Most games now install to NVMe drives. Count how many M.2 slots you need now and later, and check which ones share lanes with other ports." },
    { id: "bios", title: "Check BIOS support and Flashback", body: "A board may need a BIOS update before it runs a newer CPU. BIOS Flashback lets you update without a working CPU installed." },
    { id: "network", title: "Networking matters for daily use", body: "Wi-Fi 7 and 5Gbps Ethernet help only if your router supports them, but built-in Wi-Fi saves a PCIe card." },
    { id: "vrm", title: "Power delivery for high-end CPUs", body: "Boards with more and stronger power stages run hot 16-core chips more comfortably. For eight-core gaming CPUs, most current boards are enough." },
    { id: "io", title: "Check the rear and front I/O", body: "Count USB ports you use every day and confirm a front USB-C header if your case has a USB-C port." },
  ],
  faq: [
    { id: "b850-vs-x870e", q: "Do I need X870E for gaming?", a: "No. A B850 board runs the same CPUs at the same speed; X870E adds more PCIe 5.0 lanes, USB4 and expansion." },
    { id: "bios", q: "Will a new board work with my CPU out of the box?", a: "Usually, but check the board's CPU support list. If your chip needs a newer BIOS, BIOS Flashback updates it from a USB drive." },
    { id: "wifi", q: "Is built-in Wi-Fi worth it?", a: "Yes if you cannot run a cable. Otherwise wired Ethernet is more consistent." },
    { id: "ram-slots", q: "Should I fill all four memory slots?", a: "Two sticks usually run faster and more reliably on DDR5. Buy a two-stick kit with the capacity you need." },
    { id: "pcie5", q: "Do I need PCIe 5.0?", a: "Current graphics cards barely benefit. PCIe 5.0 matters more for the fastest SSDs." },
    { id: "form", q: "What size motherboard should I buy?", a: "ATX fits most mid-towers and has the most slots. Micro-ATX and Mini-ITX suit smaller cases with fewer expansion needs." },
  ],
  evaluated: [
    { title: "Platform", description: "We checked socket, chipset and form factor from each listing." },
    { title: "Storage", description: "We counted listed M.2 slots and PCIe 5.0 support." },
    { title: "Connectivity", description: "We compared Wi-Fi, wired LAN speed and USB4." },
    { title: "Power delivery", description: "We noted power stage layouts where the maker lists them." },
  ],
};

export const mbFacts = withPool(mbPool as Pool, [
  F("B0DT58JK2W", "MSI MAG B850 Tomahawk MAX WiFi", "B850 Tomahawk MAX", { socket: "AM5", form: "ATX", m2: 4, lan: 5, wifi: "Wi-Fi 7" }, ["a PCIe 5.0 x16 slot with Steel Armor", "a rear USB 20Gbps Type-C port"]),
  F("B0DPLPLR88", "ASUS TUF Gaming B850-PLUS WiFi", "TUF B850-PLUS", { socket: "AM5", form: "ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 7", vrm: "14+2+1" }, ["80A power stages", "a front USB 10Gbps Type-C header"]),
  F("B0DQLHVQSF", "GIGABYTE B850 AORUS Elite WIFI7", "B850 AORUS Elite", { socket: "AM5", form: "ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 7", vrm: "14+2+2", warranty: 5 }, ["a PCIe 5.0 graphics slot"]),
  F("B0DRTTJ5D6", "ASRock B850 Steel Legend WiFi", "B850 Steel Legend", { socket: "AM5", form: "ATX", m2: 4, lan: 2.5, wifi: "Wi-Fi 7", vrm: "14+2+1" }, ["a PCIe 5.0 M.2 slot", "a white and silver finish"]),
  F("B0DH6SF5LB", "MSI MAG Z890 Tomahawk WiFi", "Z890 Tomahawk", { socket: "LGA1851", form: "ATX", m2: 4, lan: 5, wifi: "Wi-Fi 7" }, ["a PCIe 5.0 graphics slot", "M.2 heatsinks on every slot"]),
  F("B0DQB38PL5", "MSI PRO B850-P WiFi", "PRO B850-P", { socket: "AM5", form: "ATX", m2: 3, lan: 5, wifi: "Wi-Fi 7" }, ["a PCIe 5.0 graphics slot", "tool-free EZ M.2 clips"]),
  F("B0DDZNZF76", "ASUS ROG Strix X870E-E Gaming WiFi", "Strix X870E-E", { socket: "AM5", form: "ATX", m2: 5, wifi: "Wi-Fi 7", vrm: "18+2+2", usb4: true }, ["a rear USB 20Gbps port alongside USB4"]),
  F("B0DG3QW9TJ", "MSI MPG X870E Carbon WiFi", "X870E Carbon", { socket: "AM5", form: "ATX", wifi: "Wi-Fi 7", usb4: true }, ["PCIe 5.0 graphics and M.2 Gen5 slots", "Bluetooth 5 alongside Wi-Fi 7"]),
  F("B0DGVSW4FD", "GIGABYTE X870E AORUS Master", "X870E AORUS Master", { socket: "AM5", form: "ATX", m2: 4, lan: 5, wifi: "Wi-Fi 7", vrm: "16+2+2", usb4: true, warranty: 5 }, ["AMD EXPO memory profile support"]),
  F("B0DFP2Q3TM", "ASRock X870E Taichi", "X870E Taichi", { socket: "AM5", form: "E-ATX", m2: 4, wifi: "Wi-Fi 7", usb4: true }, ["support for up to 256GB of DDR5"]),
  F("B0FDSD77GP", "ASUS TUF Gaming X870E-PLUS WiFi 7", "TUF X870E-PLUS", { socket: "AM5", form: "ATX", m2: 4, wifi: "Wi-Fi 7", vrm: "16+2+1" }, ["80A power stages", "a PCIe 5.0 graphics slot"]),
  F("B0DGVBM73J", "GIGABYTE X870E AORUS Elite WiFi 7", "X870E AORUS Elite", { socket: "AM5", form: "ATX", m2: 4, lan: 2.5, wifi: "Wi-Fi 7", vrm: "16+2+2", usb4: true }, ["AMD EXPO memory profile support"]),
  F("B0DHCQ1MPZ", "ASUS ROG Strix B850-I Gaming WiFi", "Strix B850-I", { socket: "AM5", form: "Mini-ITX", m2: 2, lan: 2.5, wifi: "Wi-Fi 7", vrm: "10+2+1" }, ["a rear USB 20Gbps port", "a PCIe 5.0 graphics slot"]),
  F("B0FC9CZTXL", "MSI MPG B850I Edge TI WiFi", "B850I Edge TI", { socket: "AM5", form: "Mini-ITX", m2: 2, lan: 5, wifi: "Wi-Fi 7" }, ["a PCIe 5.0 graphics slot", "a white finish"]),
  F("B0DQNRGMWH", "GIGABYTE B850I AORUS PRO", "B850I AORUS PRO", { socket: "AM5", form: "Mini-ITX", lan: 2.5, wifi: "Wi-Fi 7", vrm: "8+2+1" }, ["memory support up to DDR5-8400 (OC)", "a PCIe 5.0 graphics slot"]),
  F("B0CKWVHW69", "ASRock B650I Lightning WiFi", "B650I Lightning", { socket: "AM5", form: "Mini-ITX", m2: 2, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "8+2+1" }, ["a PCIe 5.0 M.2 slot", "the older B650 chipset at a lower price"]),
  F("B0H862GP41", "ASUS TUF Gaming B850I WiFi NEO", "TUF B850I", { socket: "AM5", form: "Mini-ITX", m2: 2, lan: 2.5, wifi: "Wi-Fi 6E" }, ["a rear USB 20Gbps port", "a PCIe 5.0 graphics slot"]),
  F("B0DPLP33YR", "ASUS ROG Strix B850-A Gaming WiFi", "Strix B850-A", { socket: "AM5", form: "ATX", m2: 4, lan: 2.5, wifi: "Wi-Fi 7", vrm: "14+2+2" }, ["a rear USB 20Gbps port", "a white and silver finish"]),
  F("B0FRV5XHVQ", "GIGABYTE X870E AORUS PRO X3D ICE", "X870E AORUS PRO X3D", { socket: "AM5", form: "ATX", m2: 4, vrm: "18+2+2", usb4: true }, ["X3D branding aimed at Ryzen X3D builds", "a white ICE finish"]),
  F("B0FVQ3NN4C", "MSI MAG X870E Tomahawk MAX WiFi PZ", "X870E Tomahawk MAX PZ", { socket: "AM5", form: "ATX", m2: 4, lan: 5, wifi: "Wi-Fi 7", usb4: true }, ["a rear USB4 Type-C port with display output", "a PCIe 5.0 graphics slot"]),
  F("B0DRTVDVVK", "ASRock B850 Pro RS WiFi", "B850 Pro RS", { socket: "AM5", form: "ATX", m2: 4, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "14+2+1" }, ["a PCIe 5.0 M.2 slot"]),
]);

/* ---------------------------------------------------------------- Memory */

export const ramSchema: CategorySchema = {
  id: "ram",
  plural: "Kits",
  fields: [
    { key: "cl", label: "CAS latency", noun: "CAS latency", better: "lower", superlative: ["tightest", "loosest"], fmt: (v) => `CL${v}`, strength: (v) => (Number(v) <= 30 ? `Tight CL${v} timings` : undefined), weakness: (v) => (Number(v) >= 36 ? `Looser CL${v} timings` : undefined) },
    { key: "speed", label: "Rated speed", noun: "rated speed", better: "higher", superlative: ["fastest", "slowest"], fmt: (v) => `DDR5-${v}`, strength: (v) => (Number(v) === 6000 ? "DDR5-6000, the usual sweet spot for AM5" : `DDR5-${v} rating`) },
    { key: "capacity", label: "Capacity", noun: "capacity", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}GB (2 sticks)`, strength: (v) => (Number(v) >= 64 ? `${v}GB for heavy multitasking and creative work` : undefined) },
    { key: "volt", label: "Voltage", fmt: (v) => `${v}V` },
    { key: "profiles", label: "Profiles", fmt: (v) => String(v), strength: (v) => (/EXPO/.test(String(v)) && /XMP/.test(String(v)) ? "Both AMD EXPO and Intel XMP profiles" : /EXPO/.test(String(v)) ? "AMD EXPO profile for one-click setup on AM5" : undefined), weakness: (v) => (!/EXPO/.test(String(v)) ? "XMP profile only, so AM5 boards may need manual timings" : undefined) },
    { key: "rgb", label: "RGB", fmt: (v) => (v ? "Yes" : "No") },
    { key: "lowProfile", label: "Low profile", fmt: (v) => (v ? "Yes" : "Not listed"), strength: (v) => (v ? "Low-profile heatspreader that clears large air coolers" : undefined) },
  ],
  compat: (f) => {
    const s = ["Enable the memory profile in the BIOS after installing it; without it, DDR5 runs at a slower default speed."];
    if (f.specs.volt !== undefined && Number(f.specs.volt) > 1.4) s.push(`Its ${f.specs.volt}V rating is higher than most kits, so check that your board lists this kit or its speed on the memory support list.`);
    else s.push("Check your motherboard's memory support list for this exact kit if you want a guaranteed first boot.");
    if (f.specs.rgb) s.push("RGB heatspreaders are taller than plain ones, so check the clearance under a large tower cooler.");
    return s;
  },
  criteria: [
    { id: "sweet-spot", title: "DDR5-6000 is the AM5 sweet spot", body: "AMD's Ryzen 7000 and 9000 chips run memory in sync up to about 6000MT/s. Faster kits often fall out of that sync and gain little.\n\nIntel Core Ultra chips handle higher speeds more comfortably." },
    { id: "latency", title: "Lower CAS latency helps", body: "At the same speed, a lower CL number means lower latency. CL30 at 6000MT/s is a common target for gaming." },
    { id: "capacity", title: "32GB is the gaming default", body: "32GB covers games with browsers and chat running. 64GB suits video editing, large projects and heavy multitasking." },
    { id: "two-sticks", title: "Buy one two-stick kit", body: "Two sticks run faster and more reliably than four on DDR5. Buy the capacity you need in one matched kit." },
    { id: "profiles", title: "Check for EXPO or XMP", body: "EXPO profiles set speed and timings in one click on AMD boards; XMP does the same on Intel. Many kits carry both." },
    { id: "height", title: "Watch heatspreader height", body: "Tall or RGB heatspreaders can clash with large tower coolers. Low-profile kits avoid the problem." },
  ],
  faq: [
    { id: "32-vs-64", q: "Is 32GB enough for gaming?", a: "Yes, for current games with apps in the background. Choose 64GB for creative work or heavy multitasking." },
    { id: "rgb", q: "Does RGB memory perform differently?", a: "No. RGB adds lighting and height, not speed." },
    { id: "expo", q: "What happens if I don't enable EXPO or XMP?", a: "The kit runs at a slower default speed. Enable the profile in the BIOS to get the rated speed." },
    { id: "mix", q: "Can I mix two kits?", a: "It often fails to run at rated speed. Buy one kit with all the capacity you need." },
    { id: "8000", q: "Is DDR5-8000 worth it?", a: "On AM5, rarely; it often runs out of sync with the memory controller. It suits Intel builds tuned for high speeds." },
    { id: "boot", q: "Why does a new DDR5 system take long to boot the first time?", a: "The board trains the memory on first boot, which can take a minute or more. Let it finish." },
  ],
  evaluated: [
    { title: "Speed and timings", description: "We compared listed speed and CAS latency." },
    { title: "Profiles", description: "We checked for AMD EXPO and Intel XMP support." },
    { title: "Capacity", description: "We focused on two-stick 32GB and 64GB kits." },
    { title: "Fit", description: "We noted RGB and low-profile heatspreaders where listed." },
  ],
};

export const ramFacts = withPool(ramPool as Pool, [
  F("B0BPTKD797", "CORSAIR Vengeance RGB DDR5 32GB (2x16GB) 6000 CL30", "Vengeance RGB", { speed: 6000, cl: 30, capacity: 32, volt: 1.4, profiles: "EXPO and XMP", rgb: true }, ["iCUE lighting control"]),
  F("B0CYHC58P6", "Kingston FURY Beast 32GB (2x16GB) DDR5-6000 CL30", "FURY Beast", { speed: 6000, cl: 30, capacity: 32, profiles: "EXPO and XMP", lowProfile: true }, ["a plain heatspreader with no lighting"]),
  F("B0DD295CNY", "G.SKILL Flare X5 32GB (2x16GB) DDR5-6000 CL30", "Flare X5 32GB", { speed: 6000, cl: 30, capacity: 32, volt: 1.35, profiles: "EXPO" }, ["a 1.35V rating, the lowest here", "timings of 30-36-36-96"]),
  F("B0D2JLWLWZ", "Crucial Pro 32GB (2x16GB) DDR5-6000 CL36", "Crucial Pro", { speed: 6000, cl: 36, capacity: 32, profiles: "EXPO and XMP" }, ["Micron memory", "an understated black heatspreader"]),
  F("B0B72827G5", "Kingston FURY Renegade 32GB (2x16GB) DDR5-6400 CL32", "FURY Renegade", { speed: 6400, cl: 32, capacity: 32, profiles: "XMP" }, ["a silver heatspreader", "Intel XMP 3.0 tuning at 6400MT/s"]),
  F("B0C5M6SJYW", "CORSAIR Vengeance 64GB (2x32GB) DDR5-6000 CL30", "Vengeance 64GB", { speed: 6000, cl: 30, capacity: 64, volt: 1.4, profiles: "XMP" }, ["iCUE compatibility for monitoring"]),
  F("B0DGRFBN96", "G.SKILL Trident Z5 Neo RGB 32GB (2x16GB) DDR5-6000 CL28", "Trident Z5 Neo CL28", { speed: 6000, cl: 28, capacity: 32, volt: 1.4, profiles: "EXPO", rgb: true }, ["timings of 28-36-36-96"]),
  F("B0F1X98W1B", "G.SKILL Trident Z5 Royal Neo 32GB (2x16GB) DDR5-6000 CL26", "Trident Z5 Royal Neo", { speed: 6000, cl: 26, capacity: 32, volt: 1.45, profiles: "EXPO", rgb: true }, ["timings of 26-36-36-96", "a Royal-series decorative lightbar"]),
  F("B0CYM58GFS", "Kingston FURY Beast RGB 32GB (2x16GB) DDR5-6000 CL30", "FURY Beast RGB", { speed: 6000, cl: 30, capacity: 32, profiles: "EXPO and XMP", rgb: true }, ["Kingston's infrared RGB syncing"]),
  F("B0DGZJ3RTS", "Patriot Viper Elite 5 RGB 32GB (2x16GB) DDR5-6000 CL30", "Viper Elite 5 RGB", { speed: 6000, cl: 30, capacity: 32, profiles: "EXPO and XMP", rgb: true }, ["RGB lighting on a 6000MT/s CL30 kit"]),
  F("B0C4NM8NMC", "TEAMGROUP T-Create Expert 32GB (2x16GB) DDR5-6000 CL30", "T-Create Expert", { speed: 6000, cl: 30, capacity: 32, profiles: "EXPO and XMP" }, ["a 10-layer PCB", "no lighting"]),
  F("B0CGQ3KS8X", "G.SKILL Flare X5 64GB (2x32GB) DDR5-6000 CL30", "Flare X5 64GB", { speed: 6000, cl: 30, capacity: 64, volt: 1.4, profiles: "EXPO" }, ["timings of 30-40-40-96", "AMD EXPO tuning"]),
]);

/* ---------------------------------------------------------------- Storage */

export const ssdSchema: CategorySchema = {
  id: "ssd",
  plural: "Drives",
  fields: [
    { key: "read", label: "Sequential read", noun: "rated read speed", better: "higher", superlative: ["fastest", "slowest"], fmt: (v) => `${Number(v).toLocaleString("en-US")}MB/s`, strength: (v) => (Number(v) >= 14000 ? `PCIe 5.0 read speeds up to ${Number(v).toLocaleString("en-US")}MB/s` : undefined), weakness: (v) => (Number(v) <= 5500 && Number(v) > 700 ? `Slower ${Number(v).toLocaleString("en-US")}MB/s rated reads` : undefined) },
    { key: "write", label: "Sequential write", noun: "rated write speed", better: "higher", superlative: ["fastest", "slowest"], fmt: (v) => `${Number(v).toLocaleString("en-US")}MB/s` },
    { key: "tbw", label: "Endurance", noun: "rated endurance", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${Number(v).toLocaleString("en-US")}TBW`, strength: (v) => (Number(v) >= 2000 ? `${Number(v).toLocaleString("en-US")}TBW endurance rating` : undefined) },
    { key: "pcie", label: "Interface", fmt: (v) => String(v), weakness: (v) => (/5\.0/.test(String(v)) ? "Needs a PCIe 5.0 M.2 slot to reach its rated speed" : undefined) },
    { key: "dram", label: "DRAM cache", fmt: (v) => (v ? "Yes" : "No (HMB)"), strength: (v) => (v ? "Onboard DRAM cache" : undefined) },
    { key: "heatsink", label: "Heatsink", fmt: (v) => (v ? "Included" : "No"), strength: (v) => (v ? "Heatsink included for boards without one" : undefined) },
    { key: "warranty", label: "Warranty", fmt: (v) => `${v}-year`, strength: (v) => (Number(v) >= 5 ? `${v}-year warranty` : undefined) },
    { key: "capacity", label: "Capacity", fmt: (v) => `${v}TB` },
  ],
  compat: (f) => {
    const form = String(f.specs.pcie);
    if (/SATA/i.test(form)) {
      return ["It is a SATA 2.5-inch drive, so it needs a free 2.5-inch bay or a mounting bracket plus a SATA data port and a SATA power connector from the power supply.", "Its speed is capped by the SATA interface at about 560MB/s, so it runs the same in any SATA III port."];
    }
    if (/2230|2242/.test(form)) {
      const len = /2230/.test(form) ? "2230 (30mm)" : "2242 (42mm)";
      const s = [`It is an M.2 ${len} drive, shorter than the 2280 drives in most desktops; check your device's documentation for the M.2 length it accepts before ordering.`];
      s.push(f.specs.heatsink ? "It ships with its own heatsink, so check the clearance under your handheld's SSD shield or cover before fitting it." : "It has no bulky heatsink, which helps it fit under a handheld's SSD shield; move the original thermal pad or shielding across if your device uses one.");
      return s;
    }
    const s = ["It is an M.2 2280 drive, the standard length on desktop boards; check which of your board's slots it goes in, as some share lanes with SATA ports."];
    if (/5\.0/.test(String(f.specs.pcie))) s.push("Use a PCIe 5.0 M.2 slot, usually the one closest to the CPU, and a board heatsink or the drive's own; in a PCIe 4.0 slot it runs at 4.0 speed.");
    else s.push("It runs at full speed in any PCIe 4.0 M.2 slot and still works, slower, in a PCIe 3.0 slot.");
    if (f.specs.heatsink) s.push("Remove the board's own M.2 cover or skip the drive's heatsink; you only need one.");
    return s;
  },
  criteria: [
    { id: "gen4", title: "PCIe 4.0 is enough for games", body: "Game load times barely change between fast PCIe 4.0 and PCIe 5.0 drives. PCIe 5.0 helps large file copies and creative work." },
    { id: "capacity", title: "Buy more capacity than you think", body: "Many new games need 100GB or more. 2TB is a comfortable minimum for a gaming library; 4TB avoids juggling installs." },
    { id: "dram", title: "DRAM cache helps heavy use", body: "Drives with DRAM cache hold speed better under long writes. DRAM-less drives with HMB are fine for games." },
    { id: "endurance", title: "Endurance is rarely a limit", body: "TBW figures of 1,200 or more far exceed typical gaming writes. Heavy video work benefits from a higher rating." },
    { id: "heat", title: "Cool the drive", body: "Fast drives throttle when hot. Use the motherboard's M.2 heatsink or a heatsink version of the drive." },
    { id: "slot", title: "Check your M.2 slots", body: "Check which slots run at PCIe 5.0 or 4.0, and which disable SATA ports or a PCIe slot when used." },
  ],
  faq: [
    { id: "gen5", q: "Is a PCIe 5.0 SSD worth it for gaming?", a: "Not for load times, which change little. It helps large file transfers and creative work." },
    { id: "heatsink", q: "Do I need an SSD heatsink?", a: "Use one on fast drives. Most boards include M.2 heatsinks; otherwise buy the heatsink version." },
    { id: "dram-less", q: "Are DRAM-less SSDs bad?", a: "No. Modern DRAM-less drives with HMB are fine for games; DRAM helps sustained heavy writes." },
    { id: "clone", q: "Can I clone my old drive to a new SSD?", a: "Yes. Most makers offer free cloning software; check the drive maker's site." },
    { id: "ps5", q: "Can I use these in a PS5?", a: "PCIe 4.0 M.2 drives work in a PS5 with a heatsink that fits the bay. Check Sony's size limits." },
    { id: "capacity", q: "How much storage do I need for games?", a: "2TB suits most players; 4TB suits large libraries without uninstalling." },
  ],
  evaluated: [
    { title: "Speed", description: "We compared rated sequential read and write speeds." },
    { title: "Endurance", description: "We noted TBW ratings and warranty length where listed." },
    { title: "Design", description: "We checked interface, DRAM cache and heatsink options." },
    { title: "Capacity", description: "We compared drives at the same capacity within each guide." },
  ],
};

export const ssdFacts = withPool(storagePool as Pool, [
  F("B0BHJJ9Y77", "Samsung 990 PRO 2TB", "990 PRO 2TB", { capacity: 2, read: 7450, write: 6900, pcie: "PCIe 4.0 x4", dram: true }, ["near-maximum PCIe 4.0 performance, by Samsung's description"]),
  F("B0B7CKZGN6", "WD_BLACK SN850X 2TB with Heatsink", "SN850X 2TB", { capacity: 2, read: 7300, write: 6300, pcie: "PCIe 4.0 x4", heatsink: true }, ["a heatsink version suited to boards without an M.2 cover"]),
  F("B0DHLCRF91", "Samsung 990 EVO Plus 2TB", "990 EVO Plus 2TB", { capacity: 2, read: 7250, write: 6300, pcie: "PCIe 4.0 x4 or 5.0 x2" }, ["a design that runs on PCIe 4.0 x4 or PCIe 5.0 x2 lanes", "Intelligent TurboWrite 2.0 caching for large transfers", "firmware updates through Samsung Magician software"]),
  F("B0C91X5DZL", "Lexar NM790 2TB", "NM790 2TB", { capacity: 2, read: 7400, write: 6500, tbw: 1500, pcie: "PCIe 4.0 x4", dram: false }, ["a 1,500TBW endurance rating on the 2TB model", "lower power draw than DRAM-equipped Gen4 drives, by Lexar's figure"]),
  F("B0DX2DPJZ5", "Samsung 9100 PRO 2TB", "9100 PRO 2TB", { capacity: 2, read: 14700, write: 13400, pcie: "PCIe 5.0 x4", dram: true }, ["in-house controller, DRAM and NAND"]),
  F("B0F3BD1W6R", "WD_BLACK SN8100 2TB", "SN8100 2TB", { capacity: 2, read: 14900, write: 11000, pcie: "PCIe 5.0 x4" }, ["rated write speeds up to 11,000MB/s"]),
  F("B0CHGT1KFJ", "Samsung 990 PRO 4TB", "990 PRO 4TB", { capacity: 4, read: 7450, write: 6900, pcie: "PCIe 4.0 x4", dram: true }, ["near-maximum PCIe 4.0 performance, by Samsung's description"]),
  F("B0D9WTKV1B", "WD_BLACK SN850X 4TB with Heatsink", "SN850X 4TB", { capacity: 4, read: 7300, write: 6300, pcie: "PCIe 4.0 x4", heatsink: true }, ["a heatsink version suited to boards without an M.2 cover"]),
  F("B0DHLBDSP7", "Samsung 990 EVO Plus 4TB", "990 EVO Plus 4TB", { capacity: 4, read: 7250, write: 6300, pcie: "PCIe 4.0 x4 or 5.0 x2" }, ["a design that runs on PCIe 4.0 x4 or PCIe 5.0 x2 lanes", "Intelligent TurboWrite 2.0 caching for large transfers", "firmware updates through Samsung Magician software"]),
  F("B0C91RNCDV", "Lexar NM790 4TB", "NM790 4TB", { capacity: 4, read: 7400, write: 6500, tbw: 3000, pcie: "PCIe 4.0 x4", dram: false }, ["lower power draw than DRAM-equipped Gen4 drives, by Lexar's figure"]),
  F("B0D7MLB76V", "WD Blue SN5000 4TB", "SN5000 4TB", { capacity: 4, read: 5500, tbw: 1200, pcie: "PCIe 4.0 x4" }, ["a 1,200TBW endurance rating on the 4TB model", "Acronis True Image for Western Digital migration software", "a lower price per terabyte than performance drives"]),
  F("B0CTSSMTZK", "Crucial T705 4TB", "T705 4TB", { capacity: 4, read: 14100, write: 12600, pcie: "PCIe 5.0 x4", warranty: 5 }, ["Micron TLC NAND", "an Acronis True Image and Adobe software bundle"]),
]);

export const hddSchema: CategorySchema = {
  id: "hdd",
  plural: "Drives",
  fields: [
    { key: "capacity", label: "Capacity", noun: "capacity", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}TB`, strength: (v) => (Number(v) >= 10 ? `${v}TB of bulk storage` : undefined) },
    { key: "rpm", label: "Spindle speed", noun: "spindle speed", better: "higher", superlative: ["fastest", "slowest"], fmt: (v) => `${v} RPM`, strength: (v) => (Number(v) >= 7200 ? `${v} RPM spindle speed` : undefined), weakness: (v) => (Number(v) < 6000 ? `${v} RPM is slower for game installs` : undefined) },
    { key: "cache", label: "Cache", noun: "cache", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}MB`, strength: (v) => (Number(v) >= 512 ? `${v}MB cache` : undefined) },
    { key: "warranty", label: "Warranty", noun: "warranty", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v}-year`, strength: (v) => (Number(v) >= 3 ? `${v}-year warranty` : undefined), weakness: (v) => (Number(v) <= 2 ? `Shorter ${v}-year warranty` : undefined) },
    { key: "cmr", label: "Recording", fmt: (v) => String(v), strength: (v) => (v === "CMR" ? "CMR recording, which holds write speed better than SMR" : undefined) },
    { key: "use", label: "Designed for", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s = ["It is a 3.5-inch SATA drive, so your case needs a 3.5-inch bay and your board a free SATA port; many new cases have few or no 3.5-inch bays."];
    if (/NAS/.test(String(f.specs.use))) s.push("It is built for always-on NAS use, which also suits a desktop that runs long downloads or backups.");
    s.push("Install games you play most on an SSD and use the hard drive for the rest of the library, recordings and backups.");
    return s;
  },
  criteria: [
    { id: "role", title: "Use a hard drive for bulk storage", body: "Hard drives load games far slower than SSDs. They make sense for a large library you rarely play, video recordings and backups." },
    { id: "rpm", title: "7200 RPM loads faster", body: "7200 RPM drives read faster than 5400 RPM drives, though both are far slower than any SSD." },
    { id: "cmr", title: "Prefer CMR recording", body: "CMR drives keep steady write speeds; SMR drives slow down on large rewrites. Makers list which one they use on many models." },
    { id: "bays", title: "Check your case for 3.5-inch bays", body: "Many modern cases have few or no 3.5-inch bays. Count them before you buy." },
    { id: "capacity", title: "Cost per terabyte favours larger drives", body: "Larger drives usually cost less per terabyte. Buy once rather than adding small drives." },
    { id: "backup", title: "One drive is not a backup", body: "Keep important files in at least two places, such as an external drive or cloud storage." },
  ],
  faq: [
    { id: "games", q: "Can I play games from a hard drive?", a: "Yes, but load times are much longer and some new games require an SSD. Keep current games on an SSD." },
    { id: "nas", q: "Can I use a NAS drive in a desktop?", a: "Yes. NAS drives work in any PC with a SATA port and often carry longer warranties." },
    { id: "noise", q: "Are hard drives noisy?", a: "They make some seek noise, especially 7200 RPM drives. Rubber-mounted bays help." },
    { id: "smr", q: "What is SMR?", a: "Shingled recording packs more data but slows down on large rewrites. CMR drives avoid this." },
    { id: "external", q: "Should I buy an external drive instead?", a: "External drives are portable and good for backups; internal drives are cheaper per terabyte if you have a bay." },
    { id: "life", q: "How long do hard drives last?", a: "Often many years, but any drive can fail. Warranty length is a fair guide to the maker's expectations." },
  ],
  evaluated: [
    { title: "Capacity", description: "We compared capacities from 4TB to 10TB." },
    { title: "Speed", description: "We noted spindle speed, cache and recording method where listed." },
    { title: "Support", description: "We recorded listed warranty length." },
    { title: "Use case", description: "We checked each drive's intended use: desktop, gaming or NAS." },
  ],
};

export const hddFacts = withPool(storagePool as Pool, [
  F("B07D9C7SQH", "Seagate BarraCuda 4TB", "BarraCuda 4TB", { capacity: 4, rpm: 5400, cache: 256, use: "Desktop" }, ["a 190MB/s maximum sustained transfer rate", "free Seagate DiscWizard migration software"]),
  F("B07H289S7C", "Seagate BarraCuda 8TB", "BarraCuda 8TB", { capacity: 8, use: "Desktop" }, ["a 190MB/s sustained transfer rate"]),
  F("B0CMQ8XBBR", "WD Blue 8TB PC Hard Drive", "WD Blue 8TB", { capacity: 8, rpm: 5640, cache: 256, warranty: 2, use: "Desktop" }, ["Western Digital's Acronis True Image edition for cloning"]),
  F("B085RV9B1N", "Toshiba X300 8TB", "X300 8TB", { capacity: 8, rpm: 7200, cache: 256, cmr: "CMR", use: "Gaming and workstation" }, ["a design aimed at gaming PCs and high-end desktops"]),
  F("B07XQ18JJW", "Seagate IronWolf 8TB", "IronWolf 8TB", { capacity: 8, rpm: 7200, cache: 256, warranty: 3, use: "NAS" }, ["a design for NAS and RAID use"]),
  F("B0F4R3YCL6", "WD Red Plus 10TB", "Red Plus 10TB", { capacity: 10, rpm: 7200, cache: 512, warranty: 3, cmr: "CMR", use: "NAS" }, ["a workload rating of up to 180TB per year"]),
]);
