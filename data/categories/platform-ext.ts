import mbPool from "@/data/pcj-pool/motherboard.json";
import ramPool from "@/data/pcj-pool/ram.json";
import storagePool from "@/data/pcj-pool/storage.json";
import type { CategorySchema, Fact, FieldDef } from "@/lib/pc-compose/generic";
import { mbFacts, mbSchema, ramFacts, ramSchema, ssdFacts, ssdSchema } from "./platform";
import { withPool } from "./helpers";

/**
 * Batch 10 extensions: LGA1700 and DDR4-aware schemas plus extra hand-reviewed fact sheets.
 * Existing records in platform.ts are reused unchanged; fields left undefined were not stated
 * (or were contradicted) by the listing.
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

/* ---------------------------------------------------------------- Motherboards */

const mbExtraFields: FieldDef[] = [
  { key: "mem", label: "Memory type", fmt: (v) => String(v), weakness: (v) => (v === "DDR4" ? "Takes DDR4 only, not DDR5 kits" : undefined) },
  { key: "chipset", label: "Chipset", fmt: (v) => String(v) },
];

function boardCompat(f: Fact): string[] {
  const s: string[] = [];
  if (f.specs.socket === "AM5") s.push("It uses AMD's AM5 socket, so it takes Ryzen 7000, 8000 and 9000 chips; a board built before a CPU's launch may need a BIOS update first, so check whether it supports BIOS Flashback.");
  else if (f.specs.socket === "LGA1700") s.push("It uses Intel's LGA1700 socket for 12th, 13th and 14th Gen Core processors; check the CPU support list for the BIOS version your chip needs, since early boards shipped before 14th Gen launched.");
  else s.push("It uses Intel's LGA1851 socket for Core Ultra 200S processors, not older 12th to 14th Gen chips.");
  if (f.specs.mem === "DDR4") s.push("It takes DDR4 memory only, so reuse or buy a DDR4 kit; DDR5 sticks do not fit its slots.");
  if (f.specs.form === "Mini-ITX") s.push("As a Mini-ITX board it has one PCIe x16 slot and two memory slots, so plan for a two-stick memory kit and check the case's cooler and GPU limits.");
  else if (f.specs.form === "Micro-ATX") s.push("As a Micro-ATX board it fits smaller cases but has fewer expansion slots than ATX; check the gap between the GPU and the lower slots.");
  else if (f.specs.form === "E-ATX") s.push("Confirm your case offers E-ATX support; many mid-towers stop at ATX.");
  if (f.specs.m2 !== undefined) s.push("Check the manual for which M.2 slots share lanes with SATA ports or the second PCIe slot before filling them all.");
  return s;
}

/** AM5 and mixed-platform boards: the batch 4 criteria and FAQ, with LGA1700-aware compatibility. */
export const mbxSchema: CategorySchema = { ...mbSchema, id: "motherboard-x", fields: [...mbSchema.fields, ...mbExtraFields], compat: boardCompat };

/** Intel LGA1700 and LGA1851 boards: Intel-specific criteria and FAQ. */
export const mbIntelSchema: CategorySchema = {
  ...mbxSchema,
  id: "motherboard-intel",
  criteria: [
    { id: "intel-chipset", title: "Z-series for K chips, B-series for the rest", body: "Z790 and Z890 boards let you overclock an unlocked K processor and usually carry stronger power delivery. B760 boards run the same chips at stock settings for less money.\n\nA Core i5-13400F or 14400F loses nothing on a B760 board." },
    { id: "intel-power", title: "Power delivery for Core i7 and i9", body: "Core i7 and i9 chips draw far more power under all-core load than a Core i5. Boards with more and stronger power stages hold boost clocks with less heat; check the power stage layout before pairing one with a budget board." },
    { id: "intel-memory", title: "Check DDR4 or DDR5 before you buy", body: "LGA1700 boards come in DDR4 and DDR5 versions that look alike; the model name usually carries D4 for DDR4. Buy the board that matches the memory you plan to use." },
    { id: "intel-bios", title: "Confirm BIOS support for 14th Gen", body: "Boards made before 14th Gen launched may need a BIOS update to run a 14th Gen chip, and Intel's microcode updates for 13th and 14th Gen stability arrive through BIOS releases. Update to the latest BIOS before daily use." },
    { id: "m2", title: "Count M.2 slots", body: "Most games now install to NVMe drives. Count how many M.2 slots you need now and later, and check which ones share lanes with other ports." },
    { id: "network", title: "Networking matters for daily use", body: "Wi-Fi 7 and 5Gbps Ethernet help only if your router supports them, but built-in Wi-Fi saves a PCIe card." },
    { id: "io", title: "Check the rear and front I/O", body: "Count USB ports you use every day and confirm a front USB-C header if your case has a USB-C port. Thunderbolt ports matter only for Thunderbolt docks and drives." },
  ],
  faq: [
    { id: "z-vs-b", q: "Do I need a Z790 board for a Core i7-14700K?", a: "Only to overclock it or to get stronger power delivery. A good B760 board runs a 14700K at stock settings, though the cheapest boards may lower its sustained boost." },
    { id: "bios14", q: "Will a 13th Gen board run a 14th Gen CPU?", a: "Yes on the same LGA1700 socket, after a BIOS update if the board shipped before 14th Gen launched. Check the board's CPU support list." },
    { id: "ddr4", q: "Can I use DDR4 on an LGA1700 board?", a: "Only on a DDR4 version of the board. DDR4 and DDR5 slots are keyed differently, so a board takes one type or the other." },
    { id: "lga1851", q: "Will these boards take Core Ultra processors?", a: "Z890 and B860 boards use LGA1851 for Core Ultra 200S. LGA1700 boards (Z790, B760) take 12th to 14th Gen chips only." },
    { id: "wifi", q: "Is built-in Wi-Fi worth it?", a: "Yes if you cannot run a cable. Otherwise wired Ethernet is more consistent." },
    { id: "ram-slots", q: "Should I fill all four memory slots?", a: "Two sticks usually run faster and more reliably on DDR5. Buy a two-stick kit with the capacity you need." },
    { id: "form", q: "What size motherboard should I buy?", a: "ATX fits most mid-towers and has the most slots. Micro-ATX suits smaller cases with fewer expansion needs." },
  ],
};

const board = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => F(asin, name, short, specs, notes);

export const mbxFacts: Record<string, Fact> = {
  ...mbFacts,
  ...withPool(mbPool as Pool, [
    // AM5 B650 / B650E
    board("B0BHCCNSRH", "MSI MAG B650 Tomahawk WiFi", "B650 Tomahawk", { socket: "AM5", chipset: "B650", form: "ATX", lan: 2.5, wifi: "Wi-Fi 6E" }, ["Lightning M.2 support", "Bluetooth 5.3 alongside Wi-Fi 6E", "HDMI and DisplayPort outputs for Ryzen chips with graphics"]),
    board("B0BHJKR3BV", "ASUS TUF Gaming B650-PLUS WiFi", "TUF B650-PLUS", { socket: "AM5", chipset: "B650", form: "ATX", wifi: "Wi-Fi 6" }, ["14 power stages", "a rear USB 3.2 Gen 2x2 Type-C port", "Aura Sync lighting headers"]),
    board("B0BH7GTY9C", "GIGABYTE B650 AORUS Elite AX", "B650 AORUS Elite AX", { socket: "AM5", chipset: "B650", form: "ATX", lan: 2.5, wifi: "Wi-Fi 6E", vrm: "14+2+1" }, ["a PCIe 5.0 M.2 slot", "EZ-Latch for tool-free graphics card removal", "Q-Flash BIOS updating"]),
    board("B0CXPXBF2M", "ASRock B650 Steel Legend WiFi", "B650 Steel Legend", { socket: "AM5", chipset: "B650", form: "ATX", lan: 2.5, wifi: "Wi-Fi 6E", vrm: "14+2+1" }, ["BIOS Flashback", "memory support up to DDR5-7200 (OC)", "a white and silver finish"]),
    board("B0CB6XZ7RH", "MSI B650 Gaming Plus WiFi", "B650 Gaming Plus", { socket: "AM5", chipset: "B650", form: "ATX", lan: 2.5, wifi: "Wi-Fi 6E", vrm: "12+2+1" }, ["Bluetooth 5.3 alongside Wi-Fi 6E", "HDMI and DisplayPort outputs", "one of the lowest prices here for an ATX AM5 board"]),
    board("B0BHMW8R6S", "ASUS ROG Strix B650-A Gaming WiFi", "Strix B650-A", { socket: "AM5", chipset: "B650", form: "ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "12+2" }, ["a rear USB 3.2 Gen 2x2 Type-C port", "a white and silver finish", "Aura Sync lighting"]),
    board("B0F7VZS6FG", "ASUS TUF Gaming B650E-PLUS WiFi", "TUF B650E-PLUS", { socket: "AM5", chipset: "B650E", form: "ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "12+2+1" }, ["80A DrMOS power stages", "BIOS Flashback", "PCIe 5.0 support from the B650E chipset"]),
    board("B0F25ML4CK", "ASUS B650E MAX Gaming WiFi W", "B650E MAX Gaming W", { socket: "AM5", chipset: "B650E", form: "ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "8+2+1" }, ["a white PCB", "a rear USB 10Gbps Type-C port", "BIOS Flashback"]),
    board("B0FBMMDMY6", "ASUS TUF Gaming B650E-E WiFi", "TUF B650E-E", { socket: "AM5", chipset: "B650E", form: "ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "8+2+1" }, ["a rear USB 20Gbps Type-C port", "BIOS Flashback", "80A DrMOS power stages"]),
    board("B0CJT9KKSD", "ASRock B650M PG Lightning WiFi", "B650M PG Lightning", { socket: "AM5", chipset: "B650", form: "Micro-ATX", lan: 2.5, wifi: "Wi-Fi 6E", vrm: "6+2+1" }, ["BIOS Flashback", "memory support up to DDR5-7200 (OC)", "the lowest price among the AM5 boards here"]),
    board("B0FBTKLKGJ", "MSI PRO B650-S WiFi V1", "PRO B650-S", { socket: "AM5", chipset: "B650", form: "ATX", m2: 2, lan: 2.5, wifi: "Wi-Fi 6E" }, ["two PCIe 4.0 x16-size slots", "memory support to DDR5-6000 (OC)", "Wi-Fi 6E and 2.5Gbps Ethernet"]),
    // AM5 B850
    board("B0DPLQWLBD", "ASUS ROG Strix B850-F Gaming WiFi", "Strix B850-F", { socket: "AM5", chipset: "B850", form: "ATX", m2: 4, wifi: "Wi-Fi 7", vrm: "16+2+2" }, ["19 USB ports in total", "a rear USB 20Gbps Type-C port"]),
    board("B0DQBT2DZ8", "MSI B850 Gaming Plus WiFi", "B850 Gaming Plus", { socket: "AM5", chipset: "B850", form: "ATX", m2: 3, lan: 5, wifi: "Wi-Fi 7" }, ["a PCIe 5.0 M.2 slot", "memory support to DDR5-8200 (OC)", "a second PCIe 4.0 x16-size slot"]),
    board("B0FDLC6X93", "GIGABYTE B850 Eagle WIFI7 ICE", "B850 Eagle ICE", { socket: "AM5", chipset: "B850", form: "ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 7", vrm: "8+2+2", warranty: 3 }, ["a white ICE finish", "EZ-Latch for tool-free card removal"]),
    board("B0DQLJWRDX", "GIGABYTE B850 Eagle WIFI6E", "B850 Eagle", { socket: "AM5", chipset: "B850", form: "ATX", m2: 3, lan: 1, wifi: "Wi-Fi 6E", vrm: "8+2+2", warranty: 5 }, ["EZ-Latch for tool-free card removal", "a PCIe 5.0 slot"]),
    board("B0DS6M1ZRN", "ASRock B850 Pro-A", "B850 Pro-A", { socket: "AM5", chipset: "B850", form: "ATX", lan: 2.5, vrm: "14+2+1" }, ["BIOS Flashback", "memory support to DDR5-8000 (OC)", "no Wi-Fi, which keeps the price down for wired setups"]),
    board("B0F6HB62B4", "ASUS TUF Gaming B850-E WiFi", "TUF B850-E", { socket: "AM5", chipset: "B850", form: "ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "8+2+1" }, ["rear USB 20Gbps and 10Gbps Type-C ports", "BIOS Flashback", "three M.2 slots"]),
    board("B0DRTW2FR3", "ASRock B850M Steel Legend WiFi", "B850M Steel Legend", { socket: "AM5", chipset: "B850", form: "Micro-ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 7", vrm: "12+2+1" }, ["a PCIe 5.0 M.2 slot", "BIOS Flashback", "a white and silver finish"]),
    board("B0DQLHLVLK", "GIGABYTE B850M Gaming X WIFI6E", "B850M Gaming X", { socket: "AM5", chipset: "B850", form: "Micro-ATX", m2: 2, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "10+2+2", warranty: 5 }, ["EZ-Latch for tool-free card removal", "a PCIe 5.0 slot"]),
    board("B0FTNXMLRQ", "ASUS TUF Gaming B850M-PLUS WIFI7", "TUF B850M-PLUS", { socket: "AM5", chipset: "B850", form: "Micro-ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 7", vrm: "14+2+1" }, ["80A DrMOS power stages", "a rear USB 20Gbps Type-C port", "a front USB 10Gbps Type-C header"]),
    board("B0DRTWM32Q", "ASRock B850M Pro RS WiFi", "B850M Pro RS", { socket: "AM5", chipset: "B850", form: "Micro-ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "8+2+1" }, ["a PCIe 5.0 M.2 slot", "BIOS Flashback", "three M.2 slots in a Micro-ATX size"]),
    board("B0GP6DW3QP", "ASUS ROG Strix B850-F Gaming WIFI7 NEO", "Strix B850-F NEO", { socket: "AM5", chipset: "B850", form: "ATX", m2: 4, lan: 5, wifi: "Wi-Fi 7", vrm: "16+2+2" }, ["ASUS DIMM Fit memory tuning", "a rear USB 20Gbps Type-C port"]),
    board("B0FR6948FR", "MSI PRO B850-S WIFI6E", "PRO B850-S", { socket: "AM5", chipset: "B850", form: "ATX", lan: 2.5, wifi: "Wi-Fi 6E" }, ["a PCIe 5.0 M.2 slot", "memory support to DDR5-8200 (OC)"]),
    // AM5 X870
    board("B0DG3HK897", "MSI MAG X870 Tomahawk WiFi", "X870 Tomahawk", { socket: "AM5", chipset: "X870", form: "ATX", lan: 5, wifi: "Wi-Fi 7", usb4: true }, ["a PCIe 5.0 M.2 slot", "Bluetooth 5.4 alongside Wi-Fi 7"]),
    board("B0DGB8Q19Y", "ASUS TUF Gaming X870-PLUS WiFi", "TUF X870-PLUS", { socket: "AM5", chipset: "X870", form: "ATX", m2: 4, lan: 2.5, wifi: "Wi-Fi 7", vrm: "16+2+1", usb4: true }, ["80A SPS power stages", "a rear USB 20Gbps Type-C port"]),
    board("B0DGVC3DDW", "GIGABYTE X870 AORUS Elite WIFI7", "X870 AORUS Elite", { socket: "AM5", chipset: "X870", form: "ATX", m2: 4, lan: 2.5, wifi: "Wi-Fi 7", usb4: true, warranty: 5 }, ["EZ-Latch for tool-free card removal", "a PCIe 5.0 graphics slot"]),
    board("B0DF12WKQY", "ASUS ROG Strix X870-A Gaming WiFi", "Strix X870-A", { socket: "AM5", chipset: "X870", form: "ATX", m2: 4, wifi: "Wi-Fi 7", vrm: "16+2+2", usb4: true }, ["a Dynamic OC Switcher", "Q-Release Slim graphics card release", "a white and silver finish"]),
    board("B0DG4FK9HP", "ASRock X870 Steel Legend WiFi", "X870 Steel Legend", { socket: "AM5", chipset: "X870", form: "ATX", wifi: "Wi-Fi 7", vrm: "14+2+1", usb4: true }, ["memory support to DDR5-8000 (OC)", "a white and silver finish"]),
    board("B0DG3SSGLF", "MSI PRO X870-P WiFi", "PRO X870-P", { socket: "AM5", chipset: "X870", form: "ATX", m2: 3, lan: 5, wifi: "Wi-Fi 7", usb4: true }, ["a PCIe 5.0 M.2 slot", "Bluetooth 5.4 alongside Wi-Fi 7"]),
    board("B0DGB9VXRY", "ASRock X870 Pro RS WiFi", "X870 Pro RS", { socket: "AM5", chipset: "X870", form: "ATX", wifi: "Wi-Fi 7", vrm: "14+2+1", usb4: true }, ["memory support to DDR5-8000 (OC)", "one of the lowest X870 prices here"]),
    board("B0F8JZJ2ZJ", "ASUS X870 MAX Gaming WIFI7 W", "X870 MAX Gaming W", { socket: "AM5", chipset: "X870", form: "ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 7", vrm: "12+2+1", usb4: true }, ["an 8-layer white PCB", "BIOS Flashback", "Q-Release graphics card release"]),
    board("B0FCP1RKTG", "ASRock X870 Pro-A WiFi", "X870 Pro-A", { socket: "AM5", chipset: "X870", form: "ATX", lan: 2.5, wifi: "Wi-Fi 7", vrm: "16+2+1", usb4: true }, ["two rear USB4 Type-C ports", "memory support to DDR5-8000 (OC)"]),
    // AM5 X670E
    board("B0BDTHQTJV", "ASUS ROG Strix X670E-E Gaming WiFi", "Strix X670E-E", { socket: "AM5", chipset: "X670E", form: "ATX", m2: 4, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "18+2" }, ["heatsinks on all four M.2 slots", "a rear USB 3.2 Gen 2x2 port", "AI Cooling II fan tuning"]),
    board("B0BDV6RR2K", "ASUS ROG Strix X670E-A Gaming WiFi", "Strix X670E-A", { socket: "AM5", chipset: "X670E", form: "ATX", m2: 4, wifi: "Wi-Fi 6E", vrm: "16+2" }, ["heatsinks on all four M.2 slots", "a white and silver finish", "AI Cooling II fan tuning"]),
    board("B0CRF81BBC", "MSI X670E Gaming Plus WiFi", "X670E Gaming Plus", { socket: "AM5", chipset: "X670E", form: "ATX", lan: 2.5, wifi: "Wi-Fi 6E", vrm: "14+2+1" }, ["PCIe 5.0 support from the X670E chipset", "Bluetooth 5.3 alongside Wi-Fi 6E"]),
    board("B0BF6VKQP4", "ASUS Prime X670E-PRO WiFi", "Prime X670E-PRO", { socket: "AM5", chipset: "X670E", form: "ATX", m2: 4, lan: 2.5, wifi: "Wi-Fi 6E", usb4: true }, ["a rear USB 3.2 Gen 2x2 Type-C port", "an understated silver finish"]),
    board("B0BDTK4SLH", "ASUS ROG Strix X670E-F Gaming WiFi", "Strix X670E-F", { socket: "AM5", chipset: "X670E", form: "ATX", m2: 4, wifi: "Wi-Fi 6E", vrm: "18+2" }, ["heatsinks on all four M.2 slots", "AI Cooling II fan tuning"]),
    board("B0B6Q4X5NF", "MSI MEG X670E ACE", "X670E ACE", { socket: "AM5", chipset: "X670E", form: "E-ATX", wifi: "Wi-Fi 6E" }, ["MSI's flagship MEG styling", "Bluetooth 5.3 alongside Wi-Fi 6E", "PCIe 5.0 lanes from the X670E chipset"]),
    // LGA1851 Z890
    board("B0DGWNVCHL", "ASUS TUF Gaming Z890-PLUS WiFi", "TUF Z890-PLUS", { socket: "LGA1851", chipset: "Z890", form: "ATX", m2: 4, lan: 2.5, wifi: "Wi-Fi 7", vrm: "16+1+2+1" }, ["a Thunderbolt 4 Type-C port", "TUF component and cooling design"]),
    board("B0DGWHZKMC", "ASUS ROG Strix Z890-A Gaming WiFi", "Strix Z890-A", { socket: "LGA1851", chipset: "Z890", form: "ATX", m2: 5, lan: 2.5, wifi: "Wi-Fi 7", vrm: "16+2+1+2" }, ["Thunderbolt 4 ports", "AI overclocking tools", "a white and silver finish"]),
    board("B0DGWRK1PN", "ASUS ROG Strix Z890-E Gaming WiFi", "Strix Z890-E", { socket: "LGA1851", chipset: "Z890", form: "ATX", m2: 7, wifi: "Wi-Fi 7", vrm: "18+2+1+2" }, ["Thunderbolt 4 ports", "AI overclocking, cooling and networking tools"]),
    board("B0D66D6GW9", "ASUS TUF Gaming Z890-PRO WiFi", "TUF Z890-PRO", { socket: "LGA1851", chipset: "Z890", form: "ATX", m2: 4, lan: 2.5, wifi: "Wi-Fi 7", vrm: "16+1+2+1" }, ["a Thunderbolt 4 Type-C port", "M.2 cooling on the main slot"]),
    board("B0DPY5WKGF", "MSI PRO Z890-S WiFi White", "PRO Z890-S White", { socket: "LGA1851", chipset: "Z890", form: "ATX", m2: 3, lan: 2.5, wifi: "Wi-Fi 7" }, ["a PCIe 5.0 M.2 slot", "memory support to DDR5-8600 (OC)", "a white finish"]),
    board("B0DGWWRTPV", "ASUS ROG Maximus Z890 Hero", "Maximus Z890 Hero", { socket: "LGA1851", chipset: "Z890", form: "ATX", wifi: "Wi-Fi 7", vrm: "22+2+1+2" }, ["three PCIe 5.0 M.2 slots", "Thunderbolt 4 ports"]),
    board("B0DTCR75Z3", "ASUS ROG Strix Z890-H Gaming WiFi", "Strix Z890-H", { socket: "LGA1851", chipset: "Z890", form: "ATX", m2: 4, lan: 5, wifi: "Wi-Fi 7", vrm: "16+2+1+2" }, ["AI overclocking tools", "a PCIe 5.0 graphics slot"]),
    board("B0H2B5NTL5", "MSI MAG Z890 Tomahawk WiFi II", "Z890 Tomahawk II", { socket: "LGA1851", chipset: "Z890", form: "ATX", m2: 4, lan: 5, wifi: "Wi-Fi 7" }, ["a PCIe 5.0 M.2 slot", "memory support to DDR5-9200 (OC)"]),
    // LGA1700 Z790
    board("B0CJSL89T2", "MSI MAG Z790 Tomahawk MAX WiFi", "Z790 Tomahawk MAX", { socket: "LGA1700", chipset: "Z790", form: "ATX", mem: "DDR5", m2: 5, lan: 2.5, wifi: "Wi-Fi 7", vrm: "16+1+1" }, ["Bluetooth 5.4 alongside Wi-Fi 7", "a PCIe 5.0 graphics slot"]),
    board("B0G3TWBHYC", "MSI PRO Z790-A WiFi II", "PRO Z790-A II", { socket: "LGA1700", chipset: "Z790", form: "ATX", mem: "DDR5", m2: 4, lan: 2.5, wifi: "Wi-Fi 6E" }, ["80A SPS power stages", "memory support to DDR5-7800 (OC)"]),
    board("B0BG6KQPWD", "ASUS ROG Strix Z790-E Gaming WiFi", "Strix Z790-E", { socket: "LGA1700", chipset: "Z790", form: "ATX", mem: "DDR5", m2: 5, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "18+1" }, ["a PCIe 5.0 M.2 slot", "Thunderbolt 4 support", "a front-panel USB 3.2 port"]),
    board("B0DD5RJLZ8", "ASUS Z790 Gaming WIFI7", "Z790 Gaming WIFI7", { socket: "LGA1700", chipset: "Z790", form: "ATX", mem: "DDR5", m2: 3, lan: 1, wifi: "Wi-Fi 7", vrm: "14+1" }, ["a rear USB 3.2 Gen 2x2 Type-C port", "a front USB-C header"]),
    board("B0CTNPZLNH", "GIGABYTE Z790 Eagle AX", "Z790 Eagle AX", { socket: "LGA1700", chipset: "Z790", form: "ATX", mem: "DDR5", m2: 3, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "12+1+1" }, ["EZ-Latch for tool-free card removal", "Q-Flash BIOS updating", "Wi-Fi 6E and 2.5Gbps Ethernet"]),
    board("B0FBB9TQ5L", "ASUS Z790-AYW WiFi W II", "Z790-AYW W II", { socket: "LGA1700", chipset: "Z790", form: "ATX", mem: "DDR5", m2: 3, lan: 2.5, wifi: "Wi-Fi 6", vrm: "12+1" }, ["a white finish", "two rear USB 10Gbps Type-C ports", "2.5Gbps Ethernet"]),
    board("B0F8PR49WV", "ASUS Z790 MAX Gaming WIFI7", "Z790 MAX Gaming", { socket: "LGA1700", chipset: "Z790", form: "ATX", mem: "DDR5", m2: 3, lan: 1, wifi: "Wi-Fi 7", vrm: "14+1" }, ["a rear USB 20Gbps Type-C port", "a PCIe 5.0 graphics slot"]),
    board("B0BJYYFP3X", "ASRock Z790 PG Sonic", "Z790 PG Sonic", { socket: "LGA1700", chipset: "Z790", mem: "DDR5", lan: 2.5, vrm: "14+1+1" }, ["Killer 2.5G Ethernet", "a Sonic-themed design"]),
    board("B0BM38QB9W", "ASRock Z790 Pro RS WiFi", "Z790 Pro RS", { socket: "LGA1700", chipset: "Z790", form: "ATX", mem: "DDR5", m2: 4, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "14+1+1" }, ["memory support to DDR5-7200 (OC)", "one of the lowest Z790 prices here"]),
    // LGA1700 B760
    board("B0FBTJZJ9F", "MSI B760 Gaming Plus WiFi V1", "B760 Gaming Plus", { socket: "LGA1700", chipset: "B760", form: "ATX", mem: "DDR5", m2: 2, lan: 2.5, wifi: "Wi-Fi 6E" }, ["Bluetooth 5.3 alongside Wi-Fi 6E", "HDMI and DisplayPort outputs", "2.5Gbps Ethernet"]),
    board("B0BSB6MZ2L", "GIGABYTE B760 AORUS Elite AX", "B760 AORUS Elite AX", { socket: "LGA1700", chipset: "B760", form: "ATX", mem: "DDR5", m2: 3, lan: 2.5, wifi: "Wi-Fi 6E", vrm: "12+1+1" }, ["Q-Flash Plus BIOS updating without a CPU", "EZ-Latch for tool-free card removal", "Wi-Fi 6E and 2.5Gbps Ethernet"]),
    board("B0BVKYWPFT", "ASUS TUF Gaming B760-PLUS WiFi", "TUF B760-PLUS", { socket: "LGA1700", chipset: "B760", form: "ATX", mem: "DDR5", m2: 3, lan: 2.5, wifi: "Wi-Fi 6" }, ["memory support to DDR5-7200", "TUF Protection component design", "three M.2 slots"]),
    board("B0BZTB5LKJ", "ASUS Prime B760M-A AX", "Prime B760M-A", { socket: "LGA1700", chipset: "B760", form: "Micro-ATX", mem: "DDR5", m2: 2, lan: 2.5, wifi: "Wi-Fi 6" }, ["a front USB 3.2 Gen 1 Type-C header", "DisplayPort output", "2.5Gbps Ethernet"]),
    board("B0CK582LX5", "ASRock B760M PG Riptide WiFi", "B760M PG Riptide", { socket: "LGA1700", chipset: "B760", form: "Micro-ATX", mem: "DDR5", lan: 2.5, wifi: "Wi-Fi 6E", vrm: "14+1+1" }, ["front and rear USB-C", "memory support to DDR5-7200 (OC)"]),
    board("B0BRQSWSFQ", "MSI PRO B760-P WiFi DDR4", "PRO B760-P DDR4", { socket: "LGA1700", chipset: "B760", form: "ATX", mem: "DDR4", lan: 2.5, wifi: "Wi-Fi 6E" }, ["Bluetooth 5.3 alongside Wi-Fi 6E", "HDMI and DisplayPort outputs", "2.5Gbps Ethernet"]),
    board("B0BZ9T4KF6", "MSI PRO B760M-P DDR4", "PRO B760M-P DDR4", { socket: "LGA1700", chipset: "B760", form: "Micro-ATX", mem: "DDR4" }, ["HDMI and DisplayPort outputs", "a low price for a board that reuses DDR4"]),
    board("B0FP3MRTC1", "ASUS B760M-AYW WiFi D4 II", "B760M-AYW D4", { socket: "LGA1700", chipset: "B760", form: "Micro-ATX", mem: "DDR4", m2: 2, lan: 2.5, wifi: "Wi-Fi 6" }, ["a PCIe 5.0 x16 graphics slot", "a front USB 5Gbps port"]),
    board("B0BQWRCNT8", "ASRock B760 Pro RS", "B760 Pro RS", { socket: "LGA1700", chipset: "B760", form: "ATX", mem: "DDR5", lan: 2.5, vrm: "10+1+1" }, ["a PCIe 5.0 graphics slot", "front and rear USB-C", "memory support to DDR5-7200 (OC)"]),
    board("B0CX1GPFW4", "ASRock B760M Pro-A/D4 WiFi", "B760M Pro-A/D4 WiFi", { socket: "LGA1700", chipset: "B760", form: "Micro-ATX", mem: "DDR4", lan: 2.5, wifi: "Wi-Fi 6E", vrm: "7+1+1" }, ["memory support to DDR4-5333 (OC)", "Dr.MOS power stages", "Wi-Fi 6E and 2.5Gbps Ethernet"]),
    board("B0D2CZGTSY", "ASRock B760M Pro-A D4", "B760M Pro-A D4", { socket: "LGA1700", chipset: "B760", form: "Micro-ATX", mem: "DDR4", m2: 2, lan: 2.5, vrm: "7+1+1" }, ["memory support to DDR4-5333 (OC)", "no Wi-Fi, for wired desks", "2.5Gbps Ethernet"]),
  ]),
};

/* ---------------------------------------------------------------- Memory */

const ramFields: FieldDef[] = ramSchema.fields.map((f) => {
  if (f.key === "speed") return { ...f, fmt: (v) => `${v}MT/s`, strength: (v) => (Number(v) === 6000 ? "6000MT/s, the usual sweet spot for AM5" : Number(v) >= 7000 ? `${v}MT/s rating for Intel builds tuned for speed` : undefined) };
  if (f.key === "cl") return { ...f, strength: (v) => (Number(v) <= 30 ? `Tight CL${v} timings` : Number(v) === 16 ? "CL16 timings, tight for DDR4-3200" : undefined), weakness: (v) => (Number(v) >= 40 ? `Loose CL${v} timings` : undefined) };
  if (f.key === "profiles") return { ...f, weakness: (v) => (v === "XMP" ? "XMP profile only, so AM5 boards may need manual timings" : undefined) };
  return f;
});

function memCompat(f: Fact): string[] {
  const s = ["Enable the memory profile in the BIOS after installing it; without it, the kit runs at a slower default speed."];
  if (f.specs.gen === "DDR4") s.push("It is a DDR4 kit, so it fits AM4 boards and LGA1700 boards sold in DDR4 versions; it does not fit AM5, LGA1851 or any DDR5 board.");
  else s.push("It is a DDR5 kit for AM5, LGA1851 and DDR5 versions of LGA1700 boards; it does not fit DDR4 slots.");
  if (f.specs.volt !== undefined && Number(f.specs.volt) > 1.4) s.push(`Its ${f.specs.volt}V rating is higher than most kits, so check that your board lists this kit or its speed on the memory support list.`);
  if (f.specs.rgb) s.push("RGB heatspreaders are taller than plain ones, so check the clearance under a large tower cooler.");
  return s;
}

export const ramxSchema: CategorySchema = {
  ...ramSchema,
  id: "ram-x",
  fields: [...ramFields, { key: "gen", label: "Memory type", fmt: (v) => String(v) }, { key: "color", label: "Colour", fmt: (v) => String(v) }],
  compat: memCompat,
  criteria: [
    ...ramSchema.criteria,
    { id: "intel-speed", title: "Intel chips take faster kits", body: "13th and 14th Gen Core chips handle 6400MT/s and faster DDR5 more readily than AM5, especially on Z790 boards. Check the board's memory support list above 6400MT/s." },
    { id: "16gb", title: "16GB is the floor, not the target", body: "A 16GB two-stick kit runs most games but leaves little room for a browser and chat in the background. Plan to move to 32GB when budget allows." },
  ],
};

/** DDR4 and budget memory: its own criteria and FAQ. */
export const ramD4Schema: CategorySchema = {
  ...ramxSchema,
  id: "ram-ddr4",
  criteria: [
    { id: "ddr4-fit", title: "DDR4 only fits DDR4 boards", body: "DDR4 kits fit AM4 boards and LGA1700 boards sold in DDR4 versions. AM5 and Core Ultra boards take DDR5 only, so check your board before buying." },
    { id: "ddr4-speed", title: "3200 to 3600MT/s is the DDR4 range to buy", body: "Ryzen 5000 chips favour 3600MT/s; Intel 12th to 14th Gen chips on DDR4 boards run 3200 to 3600MT/s comfortably. Faster DDR4 kits gain little." },
    { id: "latency", title: "Lower CAS latency helps", body: "At the same speed, a lower CL number means lower latency. CL16 at 3200MT/s and CL18 at 3600MT/s land in the same place." },
    { id: "capacity", title: "32GB is the gaming default", body: "32GB covers games with browsers and chat running. 16GB still works for lighter use and tight budgets." },
    { id: "two-sticks", title: "Buy one two-stick kit", body: "Two matched sticks run dual-channel and set up more easily than mixing kits. Buy the capacity you need in one kit." },
    { id: "height", title: "Watch heatspreader height", body: "Tall or RGB heatspreaders can clash with large tower coolers. Low-profile kits avoid the problem." },
  ],
  faq: [
    { id: "ddr4-am5", q: "Can I use DDR4 on an AM5 board?", a: "No. AM5 supports DDR5 only, and DDR4 and DDR5 slots are keyed differently." },
    { id: "ddr4-worth", q: "Is DDR4 still worth buying?", a: "Yes for upgrading an AM4 or DDR4 LGA1700 system. For a new build on AM5 or Core Ultra you need DDR5." },
    { id: "16-vs-32", q: "Is 16GB enough for gaming?", a: "For many games, yes, but 32GB gives room for background apps and newer titles. Buy 32GB if the budget allows." },
    { id: "xmp", q: "What happens if I don't enable XMP or EXPO?", a: "The kit runs at a slower default speed. Enable the profile in the BIOS to get the rated speed." },
    { id: "mix", q: "Can I add a kit to the memory I already have?", a: "It often fails to run at the rated speed. Buying one kit with all the capacity you need is safer." },
    { id: "rgb", q: "Does RGB memory perform differently?", a: "No. RGB adds lighting and height, not speed." },
  ],
};

export const ramxFacts: Record<string, Fact> = {
  ...Object.fromEntries(Object.entries(ramFacts).map(([k, f]) => [k, { ...f, specs: { ...f.specs, gen: "DDR5" } }])),
  ...withPool(ramPool as Pool, [
    // DDR5 32GB kits
    F("B0C4G6XQQL", "G.SKILL Trident Z5 Neo RGB 32GB (2x16GB) DDR5-6000 CL30", "Trident Z5 Neo RGB CL30", { gen: "DDR5", speed: 6000, cl: 30, capacity: 32, volt: 1.35, profiles: "EXPO and XMP", rgb: true }, ["timings of 30-38-38-96", "a matte black heatspreader"]),
    F("B0FCLPDV1N", "KLEVV Bolt V 32GB (2x16GB) DDR5-6000 CL30", "Bolt V", { gen: "DDR5", speed: 6000, cl: 30, capacity: 32, volt: 1.35, profiles: "EXPO and XMP", color: "White" }, ["SK Hynix A-die memory", "a white heatspreader without lighting"]),
    F("B0DSVSS2ML", "KLEVV Urbane V RGB 32GB (2x16GB) DDR5-6000 CL30", "Urbane V RGB", { gen: "DDR5", speed: 6000, cl: 30, capacity: 32, volt: 1.35, profiles: "EXPO and XMP", rgb: true }, ["SK Hynix A-die memory"]),
    F("B0D4NLSP87", "Patriot Viper Venom 32GB (2x16GB) DDR5-6000 CL30", "Viper Venom 32GB", { gen: "DDR5", speed: 6000, cl: 30, capacity: 32 }, ["a plain heatspreader with no lighting", "a lower price than most CL30 kits here"]),
    F("B0DPR9ZDRM", "Patriot Viper Elite 5 32GB (2x16GB) DDR5-6000 CL30", "Viper Elite 5", { gen: "DDR5", speed: 6000, cl: 30, capacity: 32 }, ["a non-RGB version of the Viper Elite 5", "one of the lowest CL30 prices here"]),
    F("B0FQMLKVLS", "Crucial Pro 32GB (2x16GB) DDR5-6400 CL32", "Crucial Pro 6400", { gen: "DDR5", speed: 6400, cl: 32, capacity: 32, profiles: "EXPO and XMP", color: "Black" }, ["Micron memory from Crucial's parent company", "a plain black heatspreader"]),
    F("B0FQNB9WBD", "Crucial Pro 32GB (2x16GB) DDR5-6400 CL32 White", "Crucial Pro 6400 White", { gen: "DDR5", speed: 6400, cl: 32, capacity: 32, profiles: "EXPO and XMP", color: "White" }, ["Micron memory from Crucial's parent company", "a white heatspreader without lighting"]),
    F("B0CTHXMYL8", "Crucial Pro 32GB (2x16GB) DDR5-6000 CL36", "Crucial Pro 6000", { gen: "DDR5", speed: 6000, cl: 36, capacity: 32, profiles: "EXPO and XMP", color: "Black" }, ["a plain black heatspreader", "Micron memory from Crucial's parent company"]),
    F("B0B72BM63Q", "Kingston FURY Renegade RGB 32GB (2x16GB) DDR5-6400 CL32", "FURY Renegade RGB", { gen: "DDR5", speed: 6400, cl: 32, capacity: 32, profiles: "XMP", rgb: true }, ["Kingston's infrared RGB syncing", "Intel XMP 3.0 tuning"]),
    F("B0D95ZYN8N", "Silicon Power Value 32GB (2x16GB) DDR5-6000 CL30", "SP Value DDR5", { gen: "DDR5", speed: 6000, cl: 30, capacity: 32, volt: 1.35 }, ["a plain heatspreader", "CL30 timings at a value-line name"]),
    F("B0BFGB2D2Z", "G.SKILL Flare X5 32GB (2x16GB) DDR5-6000 CL36", "Flare X5 CL36", { gen: "DDR5", speed: 6000, cl: 36, capacity: 32, volt: 1.35, profiles: "EXPO and XMP", lowProfile: true }, ["a short, low-profile heatspreader", "timings of 36-36-36-96"]),
    F("B0BJP3MRW1", "G.SKILL Trident Z5 Neo 64GB (2x32GB) DDR5-6000 CL30", "Trident Z5 Neo 64GB", { gen: "DDR5", speed: 6000, cl: 30, capacity: 64, volt: 1.4, profiles: "EXPO" }, ["timings of 30-40-40-96", "a non-RGB Trident Z5 Neo heatspreader"]),
    F("B0CYH8MD2Y", "Kingston FURY Beast 64GB (2x32GB) DDR5-6400 CL32", "FURY Beast 64GB", { gen: "DDR5", speed: 6400, cl: 32, capacity: 64, profiles: "EXPO" }, ["a plain heatspreader"]),
    F("B0BNTRRLYP", "TEAMGROUP T-Force Vulcan 32GB (2x16GB) DDR5-6000 CL38", "T-Force Vulcan", { gen: "DDR5", speed: 6000, cl: 38, capacity: 32, profiles: "XMP" }, ["a low heatspreader without lighting", "XMP 3.0 tuning for Intel 600 and 700 series boards"]),
    F("B09LHPZK4P", "TEAMGROUP T-Force Delta RGB 32GB (2x16GB) DDR5-6400 CL40", "Delta RGB 6400", { gen: "DDR5", speed: 6400, cl: 40, capacity: 32, rgb: true }, ["a design listed for Z690-class Intel boards"]),
    F("B0BG5LZQ6M", "TEAMGROUP T-Force Delta RGB 32GB (2x16GB) DDR5-7200 CL34", "Delta RGB 7200", { gen: "DDR5", speed: 7200, cl: 34, capacity: 32, profiles: "XMP", rgb: true }, ["SK Hynix A-die memory", "XMP 3.0 tuning for Intel 600 and 700 series boards"]),
    F("B0BMQSYM65", "Kingston FURY Renegade RGB 32GB (2x16GB) DDR5-7200 CL38", "FURY Renegade 7200", { gen: "DDR5", speed: 7200, cl: 38, capacity: 32, profiles: "XMP", rgb: true }, ["Kingston's infrared RGB syncing", "Intel XMP 3.0 tuning"]),
    F("B0D5GJJBHC", "G.SKILL Trident Z5 Royal 32GB (2x16GB) DDR5-6400 CL32", "Trident Z5 Royal", { gen: "DDR5", speed: 6400, cl: 32, capacity: 32, volt: 1.4, profiles: "XMP", rgb: true }, ["timings of 32-39-39-102", "a silver Royal-series lightbar"]),
    F("B0BJ7X9P1W", "G.SKILL Trident Z5 RGB 64GB (2x32GB) DDR5-6400 CL32", "Trident Z5 RGB 64GB", { gen: "DDR5", speed: 6400, cl: 32, capacity: 64, volt: 1.4, profiles: "XMP", rgb: true }, ["timings of 32-39-39-102"]),
    F("B0F6T9TKVQ", "TEAMGROUP T-Force Delta RGB 64GB (2x32GB) DDR5-6400 CL30", "Delta RGB 64GB", { gen: "DDR5", speed: 6400, cl: 30, capacity: 64, profiles: "XMP", rgb: true }, ["Micron M-die memory"]),
    // White kits
    F("B0CYHBTSHF", "Kingston FURY Beast White 32GB (2x16GB) DDR5-6000 CL30", "FURY Beast White", { gen: "DDR5", speed: 6000, cl: 30, capacity: 32, color: "White" }, ["a white heatspreader without lighting"]),
    F("B0CYM3WSHX", "Kingston FURY Beast White RGB 32GB (2x16GB) DDR5-6000 CL30", "FURY Beast White RGB", { gen: "DDR5", speed: 6000, cl: 30, capacity: 32, profiles: "EXPO and XMP", rgb: true, color: "White" }, ["Kingston's infrared RGB syncing"]),
    F("B0DX6P486P", "TEAMGROUP T-Force Delta RGB White 32GB (2x16GB) DDR5-6000 CL38", "Delta RGB White", { gen: "DDR5", speed: 6000, cl: 38, capacity: 32, profiles: "EXPO and XMP", rgb: true, color: "White" }, ["a wide RGB lightbar", "one of the lowest prices among the white kits"]),
    F("B0CB78Y7DC", "G.SKILL Trident Z5 RGB White 32GB (2x16GB) DDR5-6000 CL36", "Trident Z5 RGB White", { gen: "DDR5", speed: 6000, cl: 36, capacity: 32, volt: 1.35, profiles: "EXPO and XMP", rgb: true, color: "White" }, ["a matte white heatspreader", "timings of 36-36-36-96"]),
    F("B0BZJKC2NJ", "Kingston FURY Renegade White RGB 32GB (2x16GB) DDR5-6400 CL32", "FURY Renegade White", { gen: "DDR5", speed: 6400, cl: 32, capacity: 32, profiles: "XMP", rgb: true, color: "White" }, ["Kingston's infrared RGB syncing", "Intel XMP 3.0 tuning"]),
    // 16GB DDR5 kits
    F("B0GQC6MV6C", "CORSAIR Vengeance RGB RS 16GB (2x8GB) DDR5-6000", "Vengeance RGB RS 16GB", { gen: "DDR5", speed: 6000, capacity: 16, profiles: "EXPO and XMP", rgb: true }, ["iCUE lighting control"]),
    F("B0GJ81P1YP", "Patriot Viper Venom 16GB (2x8GB) DDR5-6000 CL36", "Viper Venom 16GB", { gen: "DDR5", speed: 6000, cl: 36, capacity: 16 }, ["a plain heatspreader with no lighting", "the lowest price among the 16GB DDR5 kits here"]),
    F("B0GJFTS22V", "CORSAIR Vengeance 16GB (2x8GB) DDR5-6000", "Vengeance 16GB", { gen: "DDR5", speed: 6000, capacity: 16, profiles: "EXPO and XMP" }, ["a low heatspreader without lighting"]),
    F("B0G7QGPPJH", "G.SKILL Flare X5 16GB (2x8GB) DDR5-5600 CL36", "Flare X5 16GB", { gen: "DDR5", speed: 5600, cl: 36, capacity: 16, volt: 1.2, profiles: "EXPO", lowProfile: true }, ["a 1.20V rating", "timings of 36-36-36-89"]),
    F("B0CS358LZ5", "TEAMGROUP Elite 16GB (2x8GB) DDR5-5600 CL46", "TEAMGROUP Elite DDR5", { gen: "DDR5", speed: 5600, cl: 46, capacity: 16 }, ["a plain JEDEC-style module that runs without a profile", "no heatspreader lighting"]),
    F("B09T8VWV2R", "Kingston FURY Beast 16GB (2x8GB) DDR5-5600 CL40", "FURY Beast 16GB", { gen: "DDR5", speed: 5600, cl: 40, capacity: 16, profiles: "XMP" }, ["Intel XMP 3.0 tuning", "a plain black heatspreader"]),
    F("B0BC8QBWHY", "TEAMGROUP Elite Plus 16GB (2x8GB) DDR5-4800 CL40", "Elite Plus DDR5", { gen: "DDR5", speed: 4800, cl: 40, capacity: 16, volt: 1.1 }, ["a 1.1V standard-voltage rating", "runs at its rated speed without a profile"]),
    // DDR4 kits
    F("B07RW6Z692", "CORSAIR Vengeance LPX 32GB (2x16GB) DDR4-3200 CL16", "Vengeance LPX 32GB", { gen: "DDR4", speed: 3200, cl: 16, capacity: 32, volt: 1.35, profiles: "XMP 2.0", lowProfile: true }, ["timings of 16-20-20-38", "a low-profile heatspreader"]),
    F("B082DGZJ9C", "CORSAIR Vengeance RGB PRO 32GB (2x16GB) DDR4-3600 CL18", "Vengeance RGB PRO", { gen: "DDR4", speed: 3600, cl: 18, capacity: 32, volt: 1.35, rgb: true }, ["timings of 18-22-22-42", "iCUE lighting control"]),
    F("B081374T3G", "G.SKILL Ripjaws V 32GB (2x16GB) DDR4-3600 CL18", "Ripjaws V", { gen: "DDR4", speed: 3600, cl: 18, capacity: 32, volt: 1.35, profiles: "XMP 2.0" }, ["timings of 18-22-22-42", "a black heatspreader"]),
    F("B0CLTB9PL6", "G.SKILL Ripjaws V 32GB (2x16GB) DDR4-3600 CL18 White", "Ripjaws V White", { gen: "DDR4", speed: 3600, cl: 18, capacity: 32, volt: 1.35, profiles: "XMP 2.0", color: "White" }, ["timings of 18-22-22-42", "a white heatspreader"]),
    F("B091FKD2N3", "TEAMGROUP T-Create Expert 32GB (2x16GB) DDR4-3600 CL18", "T-Create Expert DDR4", { gen: "DDR4", speed: 3600, cl: 18, capacity: 32 }, ["a 10-layer PCB", "no lighting"]),
    F("B07PV7GL6C", "Silicon Power Turbine 32GB (2x16GB) DDR4-3200 CL16", "SP Turbine", { gen: "DDR4", speed: 3200, cl: 16, capacity: 32, volt: 1.35 }, ["a plain heatspreader", "one of the lowest prices among the 32GB DDR4 kits here"]),
    F("B09HRS8JKN", "PNY 32GB (2x16GB) DDR4-3200 CL16 Low Profile", "PNY Low Profile", { gen: "DDR4", speed: 3200, cl: 16, capacity: 32, lowProfile: true }, ["a low-profile design"]),
    F("B07Y4ZZ7LQ", "CORSAIR Vengeance LPX 64GB (2x32GB) DDR4-3200 CL16", "Vengeance LPX 64GB", { gen: "DDR4", speed: 3200, cl: 16, capacity: 64, volt: 1.35, lowProfile: true }, ["timings of 16-20-20-38", "a low-profile heatspreader"]),
    F("B08PJNVWNZ", "TEAMGROUP T-Force Vulcan Z 16GB (2x8GB) DDR4-3200 CL16", "Vulcan Z 16GB", { gen: "DDR4", speed: 3200, cl: 16, capacity: 16 }, ["a low grey heatspreader"]),
    F("B07RS1G6XW", "CORSAIR Vengeance LPX 16GB (2x8GB) DDR4-3200 CL16", "Vengeance LPX 16GB", { gen: "DDR4", speed: 3200, cl: 16, capacity: 16, volt: 1.35, lowProfile: true }, ["timings of 16-20-20-38"]),
    F("B086X2SWTT", "TEAMGROUP Elite 16GB (2x8GB) DDR4-3200 CL22", "TEAMGROUP Elite DDR4", { gen: "DDR4", speed: 3200, cl: 22, capacity: 16, volt: 1.2 }, ["a 1.2V standard-voltage module", "a fallback to 2933 or 2666MT/s on older boards"]),
    F("B0887QSHQC", "Patriot Signature Line 16GB (2x8GB) DDR4-3200", "Signature Line", { gen: "DDR4", speed: 3200, capacity: 16 }, ["a plain module without a heatspreader", "the lowest price among the kits here", "16GB as two 8GB modules for dual-channel"]),
  ]),
};

/* ---------------------------------------------------------------- Storage */

export const ssdxSchema: CategorySchema = { ...ssdSchema, id: "ssd-x" };

export const ssdxFacts: Record<string, Fact> = {
  ...ssdFacts,
  ...withPool(storagePool as Pool, [
    F("B0BHJF2VRN", "Samsung 990 PRO 1TB", "990 PRO 1TB", { capacity: 1, read: 7450, write: 6900, pcie: "PCIe 4.0 x4" }, ["the highest rated reads among the 1TB Gen4 drives here", "Samsung Magician software for firmware updates"]),
    F("B0DN7CYYSD", "WD_BLACK SN7100 1TB", "SN7100 1TB", { capacity: 1, read: 7250, write: 6900, pcie: "PCIe 4.0 x4" }, ["next-generation TLC NAND", "a design aimed at handhelds and laptops as well as desktops"]),
    F("B0C9213GBX", "Lexar NM790 1TB", "NM790 1TB", { capacity: 1, read: 7400, write: 6500, tbw: 1000, pcie: "PCIe 4.0 x4", dram: false }, ["a 1,000TBW endurance rating on the 1TB model", "HMB in place of onboard DRAM", "7,400MB/s rated reads, near the PCIe 4.0 ceiling"]),
    F("B0CK39YR9V", "Crucial T500 1TB", "T500 1TB", { capacity: 1, read: 7300, write: 6800, pcie: "PCIe 4.0 x4" }, ["Micron TLC NAND", "a design for laptops and desktops", "6,800MB/s rated writes"]),
    F("B0DHLFWBQ1", "Samsung 990 EVO Plus 1TB", "990 EVO Plus 1TB", { capacity: 1, read: 7150, write: 6300, pcie: "PCIe 4.0 x4 or 5.0 x2" }, ["a design that runs on PCIe 4.0 x4 or PCIe 5.0 x2 lanes", "Samsung Magician software for firmware updates"]),
    F("B0FJ8QFWBQ", "WD Blue SN5100 1TB", "SN5100 1TB", { capacity: 1, read: 7100, pcie: "PCIe 4.0 x4", warranty: 5 }, ["a five-year limited warranty", "the lowest price among the 1TB TLC-class drives here"]),
    F("B0DBR3DZWG", "Kingston NV3 1TB", "NV3 1TB", { capacity: 1, read: 6000, pcie: "PCIe 4.0 x4", warranty: 5 }, ["the lowest price among the 1TB drives here", "6,000MB/s rated reads on PCIe 4.0"]),
    F("B0DC8VPSHV", "Crucial P310 1TB", "P310 1TB", { capacity: 1, read: 7100, write: 6000, pcie: "PCIe 4.0 x4" }, ["an Acronis data migration bundle", "a design that also suits handheld consoles"]),
    F("B0DN6ZQ3PD", "WD_BLACK SN7100 2TB", "SN7100 2TB", { capacity: 2, read: 7250, write: 6900, pcie: "PCIe 4.0 x4" }, ["next-generation TLC NAND", "the highest rated writes among the 2TB Gen4 drives here"]),
    F("B0CK2TC9XQ", "Crucial T500 2TB", "T500 2TB", { capacity: 2, read: 7400, write: 7000, pcie: "PCIe 4.0 x4" }, ["Micron TLC NAND", "an Acronis data migration bundle"]),
    F("B0H1N9X2QR", "Samsung 990 2TB", "990 2TB", { capacity: 2, read: 7250, write: 6450, pcie: "PCIe 4.0 x4" }, ["Samsung Magician software for firmware updates", "7,250MB/s rated reads, near the PCIe 4.0 ceiling"]),
    F("B0DC8RVRBZ", "Crucial P310 2TB", "P310 2TB", { capacity: 2, read: 7100, write: 6000, pcie: "PCIe 4.0 x4" }, ["an Acronis data migration bundle", "one of the lowest 2TB prices here"]),
    F("B0FJ8QMW4H", "WD Blue SN5100 2TB", "SN5100 2TB", { capacity: 2, read: 7100, pcie: "PCIe 4.0 x4", warranty: 5 }, ["a five-year limited warranty"]),
    F("B0C3VCD5Z8", "TEAMGROUP MP44 2TB", "MP44 2TB", { capacity: 2, read: 7000, write: 6000, pcie: "PCIe 4.0 x4" }, ["SLC caching for bursts of writes", "a slim graphene label for laptops", "7,000MB/s rated reads"]),
    F("B0CB8JJR7F", "Acer Predator GM7 2TB", "Predator GM7 2TB", { capacity: 2, read: 7400, write: 6500, pcie: "PCIe 4.0 x4", dram: false }, ["HMB in place of onboard DRAM", "listed PS5 compatibility", "7,400MB/s rated reads, near the PCIe 4.0 ceiling"]),
    F("B0F9XMYR15", "Crucial T710 2TB", "T710 2TB", { capacity: 2, read: 14900, write: 13800, pcie: "PCIe 5.0 x4", warranty: 5 }, ["Micron TLC NAND", "a five-year warranty"]),
    F("B0F4455L4R", "Kingston FURY Renegade G5 2TB", "FURY Renegade G5", { capacity: 2, write: 14000, pcie: "PCIe 5.0 x4" }, ["rated writes up to 14,000MB/s"]),
    // Corsair
    F("B0BWYX6BQ3", "Corsair MP600 PRO LPX 1TB", "MP600 PRO LPX 1TB", { capacity: 1, read: 7100, pcie: "PCIe 4.0 x4", heatsink: true }, ["a low-profile heatsink sized for the PS5 bay"]),
    F("B0CSG8QMNG", "Corsair MP600 Elite 1TB with Heatsink", "MP600 Elite 1TB", { capacity: 1, read: 7000, write: 6500, pcie: "PCIe 4.0 x4", heatsink: true }, ["high-density 3D TLC NAND", "a heatsink version listed for PS5"]),
    F("B0CSG68HF4", "Corsair MP600 Elite 2TB", "MP600 Elite 2TB", { capacity: 2, read: 7000, write: 6500, pcie: "PCIe 4.0 x4" }, ["high-density 3D TLC NAND", "a bare drive for boards with their own M.2 heatsink"]),
    F("B0DVCCJQ4K", "Corsair MP600 CORE XT 2TB", "MP600 CORE XT 2TB", { capacity: 2, read: 5900, write: 5000, pcie: "PCIe 4.0 x4" }, ["QLC NAND, which trades sustained write speed for price"]),
    F("B0CM42DVBR", "Corsair MP700 PRO 2TB", "MP700 PRO 2TB", { capacity: 2, read: 12400, write: 11800, pcie: "PCIe 5.0 x4" }, ["high-density TLC NAND", "NVMe 2.0 support", "12,400MB/s rated reads on PCIe 5.0"]),
    F("B0DKNY3HRV", "Corsair MP700 Elite 2TB", "MP700 Elite 2TB", { capacity: 2, read: 10000, write: 8500, pcie: "PCIe 5.0 x4" }, ["DirectStorage support", "high-density 3D TLC NAND", "a lower price than the MP700 PRO 2TB"]),
    F("B0FV33S11L", "Corsair MP700 PRO XT 2TB", "MP700 PRO XT 2TB", { capacity: 2, read: 14900, write: 14500, pcie: "PCIe 5.0 x4" }, ["the highest rated writes among the drives here", "DirectStorage support"]),
  ]),
};
