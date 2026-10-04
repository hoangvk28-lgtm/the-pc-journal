import hubPool from "@/data/pcj-pool/hubs36.json";
import pciePool from "@/data/pcj-pool/pcie36.json";
import capPool from "@/data/pcj-pool/capture36.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 36 PC accessories: USB hubs, PCIe USB cards and Switch 2 capture cards. Every figure comes from the
 * listing title or bullets. Dropped on purpose: Gugxiom PCIe USB card (title and bullets disagree on 5Gbps versus 20Gbps),
 * ELUTENG 8-port card (names 5Gbps-class controllers but claims 10Gbps) and Wi-Fi cards whose bullets name no standard.
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const gbps = (v: number | string | boolean) => `${v}Gbps`;

/* ----------------------------------------------------------------------------------------------- USB-C hubs */

export const hubSchema: CategorySchema = {
  id: "usb-hub",
  plural: "USB-C Hubs",
  fields: [
    { key: "ports", label: "Ports", noun: "port count", better: "higher", superlative: ["most", "fewest"], fmt: (v) => `${v} ports`, rule: { label: "Most Ports", bestFor: ["Desks with many wired peripherals.", "Adding several USB devices from one connection."] } },
    { key: "speed", label: "Data speed per port", noun: "port speed", better: "higher", superlative: ["fastest", "slowest"], fmt: (v) => `up to ${gbps(v)}`, strength: (v) => (Number(v) >= 10 ? `${gbps(v)} data ports for external SSDs` : undefined), weakness: (v) => (Number(v) <= 5 ? "5Gbps ports, so fast external SSDs run below their rating" : undefined) },
    { key: "pd", label: "Charging", noun: "charging power", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `up to ${v}W`, strength: (v) => `up to ${v}W of charging` },
    { key: "powered", label: "Power adapter", fmt: (v) => (v ? "Included" : "Bus-powered"), strength: (v) => (v ? "an included power adapter for stable power to every port" : undefined), weakness: (v) => (v === false ? "Bus-powered, so it shares the host port's power budget" : undefined) },
    { key: "video", label: "Video output", fmt: (v) => String(v), strength: (v) => `${v} output` },
    { key: "ethernet", label: "Ethernet", fmt: (v) => (v ? "Gigabit" : "No"), strength: (v) => (v ? "a Gigabit Ethernet port" : undefined) },
    { key: "cable", label: "Host cable", fmt: (v) => String(v) },
    { key: "warranty", label: "Warranty", noun: "warranty", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v} months`, strength: (v) => (Number(v) >= 18 ? `${Number(v) % 12 === 0 ? `${Number(v) / 12}-year` : `${v}-month`} warranty` : undefined) },
  ],
  compat: (f) => {
    const s = ["It needs a free USB-C port that supports data; on a desktop that is usually on the motherboard's rear I/O or a PCIe USB-C card, so check which you have before ordering."];
    if (f.specs.video) s.push("HDMI output needs a USB-C port that supports DisplayPort Alt Mode, which many desktop motherboard USB-C ports do not; plug your monitor into the graphics card instead if unsure.");
    if (f.specs.powered) s.push("It needs a wall outlet for its adapter; connect the adapter before plugging in power-hungry drives.");
    return s;
  },
  criteria: [
    { id: "host", title: "Check what your PC's USB-C port supports", body: "Many desktop USB-C ports carry data only, with no video or charging. A hub that relies on DisplayPort Alt Mode or Power Delivery will not use those features on such a port." },
    { id: "speed", title: "Match port speed to what you plug in", body: "5Gbps ports suit keyboards, mice, webcams and flash drives. External NVMe SSDs and capture cards benefit from 10Gbps ports, as long as the host port runs at 10Gbps too." },
    { id: "power", title: "Powered hubs handle more devices", body: "A hub with its own adapter can run several drives and chargers together. A bus-powered hub shares one port's power, which can drop devices when several draw current." },
    { id: "bandwidth", title: "Ports share one connection", body: "All ports on a hub share the host connection's bandwidth. Two fast SSDs copying at once will each run slower than one on its own." },
    { id: "cable", title: "Look at cable length and layout", body: "A short attached cable suits a laptop dongle; a desktop hub with a 3 to 4 foot cable can sit on the desk or under a monitor." },
    { id: "control", title: "Per-port switches help a crowded desk", body: "Individual switches or LEDs let you power down a device without unplugging it, which helps with drives and lights that you do not need all day." },
  ],
  faq: [
    { id: "desktop", q: "Do I need a USB-C hub for a desktop PC?", a: "Only if you run out of USB ports or want ports in a reachable spot. A hub moves the sockets to your desk, so you stop reaching behind the tower." },
    { id: "hdmi", q: "Will the HDMI port work on my desktop?", a: "Only if the USB-C port supports DisplayPort Alt Mode. Many desktop motherboards do not, so connect your monitor to the graphics card and keep the hub for data." },
    { id: "charging", q: "Can a hub charge my laptop?", a: "Hubs with pass-through charging can, up to the stated wattage, and part of that power runs the hub. Use a charger with enough wattage for your laptop plus the hub." },
    { id: "hot", q: "Why does my hub get warm?", a: "Aluminium hubs spread heat through the case, so mild warmth is normal under load. Very hot or flickering devices point to an overloaded port." },
    { id: "unpowered", q: "When do I need a powered hub?", a: "When you connect hard drives, several SSDs, or devices that draw more than one port can supply. A powered hub supplies the extra current itself." },
  ],
  evaluated: [
    { title: "Ports and speed", description: "We counted USB-A and USB-C ports and the per-port speed each listing states." },
    { title: "Power", description: "We noted whether a power adapter is included and what charging each hub passes through." },
    { title: "Extras", description: "We recorded video, Ethernet and card-reader ports where listed." },
    { title: "Build and cable", description: "We compared cable length, switches and warranty from the listings." },
  ],
};

export const hubFacts: Record<string, Fact> = withPool(hubPool as Pool, [
  F("B0H4GTDSNV", "Xiaobi 7-Port USB-C Hub (4 USB-A, 3 USB-C)", "Xiaobi 7-port hub", { ports: 7, speed: 5, powered: false, cable: "4ft" }, ["a solid aluminium body that stays cool", "a built-in LED power indicator", "a non-slip rubber base"]),
  F("B0H6LRXLY3", "FIDECO 7-Port USB Hub (4 USB-A, 3 USB-C)", "FIDECO 7-port hub", { ports: 7, speed: 5, powered: false, cable: "4ft" }, ["a 15W USB-C auxiliary power input for demanding devices", "an attached USB-A adapter so it works from either port type", "an angled design that keeps every port visible"]),
  F("B0DT6Z3R4F", "intpw 9-Port Powered USB Hub (10Gbps)", "intpw 9-port hub", { ports: 9, speed: 10, pd: 45, powered: true, cable: "USB-C to C", warranty: 18 }, ["two 45W USB-C charging ports that carry no data", "one USB-C and two USB-A ports at 10Gbps plus four USB-A ports at 5Gbps", "a 28-degree angled aluminium body"]),
  F("B0G11F8FHR", "Rosonway 7-Port Powered USB 3.2 Hub", "Rosonway 7-port hub", { ports: 7, speed: 10, powered: true, cable: "3.3ft detachable" }, ["10Gbps on every one of its four USB-C and three USB-A ports", "an independent switch with an LED for each port", "a detachable USB-C host cable"]),
  F("B0DX6KR79L", "RSHTECH 10-Port Powered USB 3.2 Hub", "RSHTECH 10-port hub", { ports: 10, speed: 10, powered: true, cable: "3.3ft detachable" }, ["six USB-C and four USB-A ports, three of them at 10Gbps", "a 60W adapter", "per-port touch switches with a status LED", "a detachable cable with both USB-A and USB-C connectors"]),
  F("B0G7XW6FKN", "Gitfos 15-in-1 Powered USB 3.2 Hub", "Gitfos 15-in-1 hub", { ports: 15, speed: 10, pd: 100, powered: true }, ["a 100W USB-C PD charging port", "a 65W DC adapter", "a trapezoidal aluminium body for heat dissipation"]),
  F("B0BY27XSJ3", "Belkin 4-Port USB-C Hub (10Gbps)", "Belkin 4-port hub", { ports: 4, speed: 10, pd: 100, powered: false }, ["four USB-C 3.2 Gen 2 ports", "Fast Role Swap to avoid dropouts when a power source is added or removed", "audio device support and pass-through charging"]),
  F("B0C4DFB8RH", "UGREEN 4-Port USB-C Hub (10Gbps)", "UGREEN 4-port hub", { ports: 4, speed: 10, powered: false, cable: "1ft braided" }, ["10Gbps on all four ports at once with UASP-capable SSDs", "an aircraft-grade aluminium shell", "a note that it is not for Thunderbolt monitors, HDMI adapters or DisplayLink docks"]),
  F("B0D1XLNWP2", "UGREEN Revodok Pro 6-in-1 USB-C Hub", "Revodok Pro 6-in-1", { ports: 6, speed: 10, pd: 100, powered: false, video: "4K 60Hz HDMI" }, ["two USB-C and two USB-A ports at 10Gbps", "100W Power Delivery pass-through", "a compact 6-in-1 body"]),
  F("B0DXJQT19B", "Anker 7-in-1 USB-C Hub", "Anker 7-in-1 hub", { ports: 7, speed: 5, pd: 100, powered: false, video: "4K 60Hz HDMI", warranty: 18 }, ["SD and microSD card slots", "a USB-C PD input that charges a laptop up to 85W", "two USB-A and one USB-C data ports at 5Gbps"]),
  F("B087QZVQJX", "Anker 8-in-1 USB-C Hub (555)", "Anker 555 8-in-1", { ports: 8, speed: 10, pd: 85, powered: false, video: "4K 60Hz HDMI", ethernet: true, cable: "7.48in built-in", warranty: 18 }, ["USB-C and USB-A data ports at up to 10Gbps", "a microSD/SD card reader", "support for USB-C, USB4 and Thunderbolt connections"]),
  F("B0DY15GFNG", "UGREEN Revodok Pro 9-in-1 USB-C Hub", "Revodok Pro 9-in-1", { ports: 9, speed: 10, pd: 85, powered: false, video: "4K 60Hz HDMI", ethernet: true }, ["a Gigabit Ethernet port for steadier online play", "an SD and TF card reader", "85W pass-through charging with 15W reserved for the hub"]),
  F("B08NXV94QM", "Plugable 7-in-1 USB-C Hub", "Plugable 7-in-1", { ports: 7, speed: 5, pd: 100, powered: false, video: "4K 60Hz HDMI", ethernet: true, warranty: 24 }, ["simultaneous use of every port", "SD and microSD card slots", "a 2-year warranty with lifetime support from a North American team"]),
  F("B0DZDZXCYC", "Satechi 7-in-1 USB-C Hub with Ethernet", "Satechi 7-in-1", { ports: 7, speed: 10, pd: 80, powered: false, video: "4K 60Hz HDMI", ethernet: true, warranty: 24 }, ["two USB-A 3.2 Gen 2 ports at 10Gbps", "a braided cable with a reinforced neck", "100W power input with up to 80W output"]),
]);

/* ---------------------------------------------------------------------------------------- PCIe USB expansion cards */

export const usbCardSchema: CategorySchema = {
  id: "pcie-usb-card",
  plural: "PCIe USB Cards",
  fields: [
    { key: "ports", label: "Ports", noun: "port count", better: "higher", superlative: ["most", "fewest"], fmt: (v) => `${v} ports`, rule: { label: "Most Ports", bestFor: ["A desk that has outgrown its motherboard ports.", "Plugging in many USB devices at once."] } },
    { key: "usbc", label: "USB-C ports", noun: "USB-C count", better: "higher", superlative: ["most", "fewest"], fmt: (v) => `${v}`, strength: (v) => (Number(v) >= 3 ? `${v} USB-C ports` : undefined) },
    { key: "speed", label: "Speed", noun: "port speed", better: "higher", superlative: ["fastest", "slowest"], fmt: (v) => `up to ${gbps(v)}`, rule: { label: "Fastest Single Port", bestFor: ["External NVMe SSD enclosures.", "High-speed capture and backup drives."] }, strength: (v) => (Number(v) >= 20 ? "a 20Gbps USB 3.2 Gen 2x2 port" : undefined), weakness: (v) => (Number(v) <= 5 ? "5Gbps ports, so fast external SSDs run below their rating" : undefined) },
    { key: "slot", label: "PCIe slot", fmt: (v) => String(v) },
    { key: "power", label: "Power", fmt: (v) => String(v) },
    { key: "lowprofile", label: "Low-profile bracket", fmt: (v) => (v ? "Included" : "Not listed"), strength: (v) => (v ? "a low-profile bracket for slim cases" : undefined) },
    { key: "warranty", label: "Warranty", noun: "warranty", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v}-year`, strength: (v) => (Number(v) >= 2 ? `a ${v}-year warranty` : undefined) },
  ],
  compat: (f) => {
    const s = ["Check for a free PCIe slot of at least the card's lane count; a card needing x4 does not fit an x1 slot unless the slot is open-ended, and an x4 card in a slower slot loses bandwidth."];
    if (f.specs.slot) s.push(`The listing calls for ${f.specs.slot}; check your motherboard manual for which slots share lanes with M.2 drives.`);
    if (/internal|SATA|LP4/i.test(String(f.specs.power ?? ""))) s.push("Connect its SATA or LP4 power input if you plan to run bus-powered drives from every port.");
    return s;
  },
  criteria: [
    { id: "slot", title: "Count your free PCIe lanes", body: "Cards with 10Gbps or 20Gbps ports usually need a PCIe x4 slot, while 5Gbps cards work in x1. Note which slots share lanes with M.2 drives or the graphics card." },
    { id: "controllers", title: "Look at how bandwidth is shared", body: "Many cards place several ports behind one controller, so the ports share its bandwidth. Cards with separate controllers per group keep two fast drives from competing." },
    { id: "power", title: "Plan for bus-powered drives", body: "Slot power covers keyboards and flash drives. External SSDs or hard drives may need the optional SATA or LP4 connector some cards offer." },
    { id: "ports", title: "Choose the port mix you will use", body: "USB-C suits modern drives and cables; USB-A suits older devices. Count what you plug in today before buying the larger card." },
    { id: "bracket", title: "Check the bracket", body: "Low-profile brackets matter in slim and small-form-factor cases. Some cards ship both brackets; others only a full-height one." },
    { id: "os", title: "Check operating system support", body: "Most cards work without drivers on Windows 10 and 11. Some listings state they do not support macOS or older Windows versions." },
  ],
  faq: [
    { id: "front", q: "Can a PCIe USB card feed my case's front USB-C port?", a: "Only a card with an internal USB-C (Type-E) header can. The RIITOP card here has one; most others provide external ports only." },
    { id: "speed", q: "What do 5, 10 and 20Gbps mean in practice?", a: "5Gbps suits most flash drives and webcams. 10Gbps lets fast SATA and NVMe drives approach 1,000MB/s. 20Gbps needs a Gen 2x2 device, which is uncommon." },
    { id: "charging", q: "Will these cards charge my phone quickly?", a: "Slot-powered cards give USB-C ports about 15W at most, and several data-only cards do not support Power Delivery. Use a wall charger for phones." },
    { id: "pcie-version", q: "Does the PCIe version matter?", a: "PCIe 3.0 x4 supports full 10Gbps and 20Gbps cards. In a PCIe 2.0 slot, some run slower, as StarTech's listings note." },
    { id: "boot", q: "Can I boot from a drive on the card?", a: "That depends on your motherboard firmware. Many boards boot from USB cards, but check your BIOS options before relying on it." },
  ],
  evaluated: [
    { title: "Ports and speed", description: "We counted ports by type and recorded each listing's speed figure." },
    { title: "Controllers and slot", description: "We noted the controller, slot width and any bandwidth sharing the listing states." },
    { title: "Power", description: "We recorded slot-only power and optional SATA or LP4 power inputs." },
    { title: "Fit and support", description: "We checked brackets, operating system notes and warranty." },
  ],
};

export const usbCardFacts: Record<string, Fact> = withPool(pciePool as Pool, [
  F("B09ZKNJDNW", "7-Port PCIe USB 3.2 Gen 2 Card (4 USB-A, 3 USB-C)", "7-port USB 3.2 card", { ports: 7, usbc: 3, speed: 10, slot: "a PCIe slot", power: "Slot power only", warranty: 1 }, ["10Gbps shared between each group of ports, 20Gbps in total", "up to 5V/12A of power with no external connector", "a CD with drivers and a 1-year care promise"]),
  F("B08PF8XR73", "7-Port PCIe USB 3.0 Card (5 USB-A, 2 USB-C)", "7-port USB 3.0 card", { ports: 7, usbc: 2, speed: 5, slot: "a PCIe x1, x4, x8 or x16 slot", power: "Slot power only", warranty: 2 }, ["backward compatibility with USB 2.0 and 1.1 devices", "a fit for PCIe x1 up to x16 sockets", "a 2-year product-care promise"]),
  F("B09V6SFDZQ", "7-Port PCIe USB 3.2 Gen 2 Card (5 USB-A, 2 USB-C)", "7-port 10Gbps USB card", { ports: 7, usbc: 2, speed: 10, slot: "a PCIe x4 to x16 slot", power: "Slot power only", warranty: 2 }, ["overcurrent and static protection on every port", "power from the PCIe slot with no external supply", "a 2-year warranty"]),
  F("B0BSG6KWZ9", "GLOTRENDS U6A2C 8-Port PCIe USB 3.0 Card", "GLOTRENDS U6A2C", { ports: 8, usbc: 2, speed: 5, slot: "a PCIe x1 slot", power: "Slot power only" }, ["Renesas UPD720201 and UPD720210 dual controllers", "three isolated 5V/3A power groups", "a standard-profile bracket for full-size towers"]),
  F("B0CM5L6X4K", "8-Port PCIe USB 3.2 Gen 2 Card (4 USB-A, 4 USB-C)", "8-port 10Gbps USB card", { ports: 8, usbc: 4, speed: 10, slot: "a PCIe x4 slot", power: "Slot power only", warranty: 2 }, ["four USB-C and four USB-A ports at 10Gbps", "a fit for desktop PCs, workstations and NAS machines", "a 2-year product-care promise"]),
  F("B0D8WDPD74", "StarTech 5-Port USB 10Gbps PCIe Card", "StarTech 5-port card", { ports: 5, usbc: 4, speed: 10, slot: "a PCIe x4, x8 or x16 slot", power: "Optional SATA power", warranty: 2 }, ["four external USB-C ports and one internal USB-A port", "optional SATA power that supplies 15W per USB-C port", "an ASM3142 controller and a 2-year warranty with lifetime support"]),
  F("B08T6FCF9S", "StarTech 1-Port USB 20Gbps PCIe Card", "StarTech 20Gbps card", { ports: 1, usbc: 1, speed: 20, slot: "a PCIe 3.0 x4 slot", power: "Slot power, 15W", lowprofile: true }, ["an ASMedia ASM3242 controller on four PCIe 3.0 lanes", "UASP support and Multiple INs for storage and hubs", "15W of power for bus-powered drives"]),
  F("B0H7GZCPY8", "GLOTRENDS U3242C1 20Gbps USB-C PCIe Card", "GLOTRENDS 20Gbps card", { ports: 1, usbc: 1, speed: 20, slot: "a PCIe 3.0 x4 slot", power: "Slot power, 15W", lowprofile: true }, ["an ASMedia ASM3242 controller with about 4GB/s upstream", "15W of power with no external connector", "full-height and low-profile brackets in the box"]),
  F("B0D7NK7KG2", "Sonnet Allegro Max USB-C 20Gbps PCIe Card", "Sonnet Allegro Max", { ports: 1, usbc: 1, speed: 20, power: "Slot power, 15W" }, ["a connector raised toward the bracket centre to avoid slot-separator interference", "a resettable overcurrent fuse", "support for macOS Sonoma 14.4 or later on a Mac Pro, plus Windows and Linux"]),
  F("B087G7T234", "StarTech 2-Port USB 10Gbps PCIe Card", "StarTech 2-port card", { ports: 2, usbc: 2, speed: 10, slot: "a PCIe 3.0 x4 slot", power: "Slot power, 15W", lowprofile: true, warranty: 2 }, ["an ASMedia ASM3142 controller on four PCIe 3.0 lanes", "UASP support for storage", "data only, with no DisplayPort Alt Mode or Power Delivery"]),
  F("B00HJZEA2S", "StarTech 4-Port USB 5Gbps PCIe Card", "StarTech 4-port card", { ports: 4, usbc: 0, speed: 5, power: "Optional LP4 or SATA power", warranty: 2 }, ["four independent USB controllers, one for each port", "UASP support that StarTech says is up to 70% faster with a compatible enclosure", "a 2-year warranty with lifetime technical assistance"]),
  F("B0F4JFHYLW", "GLOTRENDS U3142X1 2-Port 10Gbps USB-C Card", "GLOTRENDS 2-port card", { ports: 2, usbc: 2, speed: 10, slot: "a PCIe x1 slot", power: "Slot power, 5V/2A per port", lowprofile: true }, ["an ASM3142 controller with up to 8Gbps of shared upstream bandwidth", "5V/2A of power for each port", "full-height and low-profile brackets in the box"]),
  F("B0CN91GRR7", "RIITOP PCIe 3.0 x4 USB 3.2 Gen2 Card", "RIITOP USB card", { ports: 2, usbc: 1, speed: 10, slot: "a PCIe 3.0 x4 slot", power: "Slot power only", lowprofile: true }, ["an internal Type-E connector for a case's front-panel USB-C", "an internal 19-pin header for front-panel USB 3.0 ports", "ASM3124 and VL822 controllers"]),
  F("B0F4JZQMT1", "GLOTRENDS U3044BG 4-Port PCIe USB 3.0 Card", "GLOTRENDS 4-port card", { ports: 4, usbc: 0, speed: 5, slot: "a PCIe x1 slot", power: "Slot power, 5V/2A per port", lowprofile: true }, ["a Renesas UPD720201 controller with a fuse and capacitor per channel", "an 8cm low-profile and a 12cm standard bracket", "driver-free setup on Windows 11 and 10 and most Linux"]),
]);


/* ---------------------------------------------------------------------------------------- Switch 2 capture cards */

export const capture36Facts: Record<string, Fact> = withPool(capPool as Pool, [
  F("B0F9FN7PYY", "AVerMedia GC311G2 USB-C Game Capture Card", "AVerMedia GC311G2", { type: "Game capture card", does: "Captures a console", conn: "HDMI in and out, USB-C", key: "1080p60 capture with 4K60 HDR pass-through", switch2: true }, ["1440p144 HDR or 1080p240 HDR pass-through", "listed support for Nintendo Switch and Switch 2, PS5, Xbox Series X/S and PCs", "driver-free use with OBS, Camo Studio and AVerMedia Streaming Center"]),
  F("B0CGD86HNB", "AVerMedia Live Gamer Ultra 2.1 GC553G2", "AVerMedia GC553G2", { type: "Game capture card", does: "Captures a console", conn: "HDMI 2.1 in and out, USB-C 10Gbps", key: "4K144 capture on Windows", switch2: true }, ["4K144 HDR/VRR pass-through, or 1440p240 and 1080p360", "listed support for PS5, Xbox Series X/S, Nintendo Switch 2 and PC", "capture on Windows, Mac or iPad"]),
  F("B0H29LQLF6", "JSAUX Capture Card Dock for Nintendo Switch 2, Steam Deck and ROG Ally", "JSAUX capture dock", { type: "Capture card and portable dock", does: "Captures a handheld", conn: "USB-C in, HDMI out, USB-A port", key: "4K30 or 1080p60 recording with 4K60 pass-through", switch2: true }, ["a 100W USB-C PD charging port", "no drivers on Windows, macOS or Linux", "a portable-dock design for handhelds"]),
  F("B0GHV4K8ZF", "Guermok USB-C Capture Card Dock for Switch 2 and Steam Deck", "Guermok capture dock", { type: "Capture card and dock", does: "Captures a handheld or Switch 2 in dock mode", conn: "USB-C in, HDMI out, USB-C capture", key: "MJPEG capture up to 4K60, 2K120 and 1080p120", switch2: true }, ["a low-latency HDMI loop-out up to 4K60", "listed support for Switch 2 in dock mode and Steam", "capture over USB-C"]),
]);
