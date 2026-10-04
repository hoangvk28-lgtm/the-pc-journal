import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/** Batch 36: handheld and storage guides plus USB expansion and Switch 2 capture. New fact sheets live in data/categories/acc36-*.ts. */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const E = (slug: string, kw: string, g: PlanItem["g"], where: PlanItem["where"], sort: string, seo: string, lead: string, close: string): PlanItem => ({ slug, kw, g, where, sort, seo, lead, close });

const m2230 = (f: Fact) => /2230/.test(s(f, "pcie"));
const m2242 = (f: Fact) => /2242/.test(s(f, "pcie"));
const sata = (f: Fact) => /SATA/.test(s(f, "pcie"));

export const PLAN: PlanItem[] = [
  E("best-ssds-for-rog-ally", "ssds for rog ally", "ssd36", (f) => m2230(f) && n(f, "capacity") >= 1 && n(f, "read") > 0, "-read", "Best SSDs for ROG Ally",
    "The original ROG Ally takes a short M.2 2230 drive, so a standard 2280 SSD will not fit. We ordered 1TB and 2TB 2230 drives by listed read speed, since the Ally's PCIe 4.0 slot can use it.",
    "Check whether you own the original ROG Ally or the ROG Ally X before ordering; the X ships with a longer 2280 slot and takes different drives."),
  E("best-ssds-for-steam-deck-oled", "ssds for steam deck oled", "ssd36", (f) => m2230(f) && !f.specs.heatsink, "-capacity", "Best SSDs for Steam Deck OLED",
    "The Steam Deck OLED takes a single-sided M.2 2230 NVMe drive, and a drive with no added heatsink leaves the original shield and thermal pad in place. Every pick is a 2230 drive without a bulky heatsink, ordered from the most capacity down.",
    "Back up your library, move the Deck's original shield and thermal pad across to the new drive, and reinstall SteamOS from Valve's recovery image."),
  E("best-ssds-for-legion-go", "ssds for legion go", "ssd36", m2242, "price", "Best SSDs for Legion Go",
    "The Lenovo Legion Go uses a short M.2 2242 SSD, which is shorter than the 2280 drives in most PCs and longer than 2230. Every pick here is a 2242 NVMe drive, and Transcend and Corsair list the Legion Go by name.",
    "Confirm the 2242 length on your own unit and Lenovo's guidance before buying, and do not mix up 2242 with the 2230 drives sold for other handhelds."),
  E("best-ssds-for-gaming-laptops", "ssds for gaming laptops", "ssd36", (f) => !!f.specs.laptop && !m2230(f) && !m2242(f) && !f.specs.heatsink, "-read", "Best SSDs for Gaming Laptops",
    "A gaming laptop takes a bare M.2 2280 drive, since the lid leaves little room for a tall heatsink. Every pick lists laptop use, and we ordered them from the highest listed read speed down.",
    "Check whether your laptop has a second M.2 slot, whether it is PCIe 4.0, and whether the chassis allows double-sided drives before you buy."),
  E("best-m2-ssd-heatsinks", "m.2 ssd heatsinks", "m2sink", () => true, "height", "Best M.2 SSD Heatsinks",
    "A heatsink helps a fast M.2 drive hold its speed during long writes when your motherboard has no cover for it. We ordered these standalone heatsinks from the lowest listed height up, which matters most when a graphics card sits close to the slot.",
    "Measure the clearance above the M.2 slot, especially under a graphics card, and peel every film off the thermal pad before you fit it."),
  E("best-sata-ssds", "sata ssds", "ssd36", (f) => sata(f) && n(f, "capacity") < 8 && n(f, "read") > 0, "-read", "Best SATA SSDs",
    "A SATA SSD is the simplest upgrade for an older desktop, a laptop with a 2.5-inch bay or a secondary game drive. Every pick uses the SATA III interface, so rated speeds sit between 500MB/s and 560MB/s, so we ordered them by listed read speed and then by price.",
    "Check that you have a free 2.5-inch bay or bracket plus a SATA data port and a SATA power connector before you order."),
  E("best-8tb-ssds", "8tb ssds", "ssd36", (f) => n(f, "capacity") === 8, "price", "Best 8TB SSDs",
    "An 8TB SSD holds a very large game library or video archive on one drive. Every pick is listed at 8TB, and they range from SATA to PCIe 5.0, so check the slot and heat requirements.",
    "Check that your motherboard has an M.2 slot with room for the drive, and note the price per terabyte against two 4TB drives."),
  E("best-nas-hard-drives", "nas hard drives", "nas", () => true, "-capacity", "Best NAS Hard Drives",
    "A NAS drive is built for years of 24/7 use inside a multi-drive enclosure, with firmware and vibration handling that desktop drives lack. We ordered these by capacity and noted recording type, workload rating and warranty from each listing.",
    "Check your NAS maker's compatibility list for the exact drive model, and keep a second copy of anything you cannot replace."),
  E("best-usb-c-hubs-for-pc", "usb-c hubs for pc", "hub", () => true, "-ports", "Best USB-C Hubs for PC",
    "A USB-C hub moves your ports onto the desk, which helps a desktop PC where the rear I/O is out of reach. We ordered these from the most ports down, and several include their own power adapters.",
    "Check that your PC's USB-C port supports data, and whether it supports video, before relying on a hub's HDMI port."),
  E("best-pcie-usb-expansion-cards", "pcie usb expansion cards", "usbcard", () => true, "-ports", "Best PCIe USB Expansion Cards",
    "A PCIe USB card adds ports to a desktop that has run out, with stronger power delivery than a hub. We ordered these by port count, and noted the speed of each port and which slot it needs.",
    "Count your free PCIe lanes and check which slots share bandwidth with M.2 drives before choosing a card with 10Gbps or 20Gbps ports."),
  E("best-microsd-cards-for-steam-deck", "microsd cards for steam deck", "microsd", (f) => n(f, "capacity") >= 256, "-read", "Best microSD Cards for Steam Deck",
    "The Steam Deck reads standard microSD cards over UHS-I, so an A2-rated UHS-I card is the right target and microSD Express would add cost without adding speed. We ordered cards from 256GB up by listed read speed.",
    "Format the card from the Deck's own settings, and keep your most-played games on the internal drive, which is faster than any microSD card."),
  E("best-capture-cards-for-switch-2", "capture cards for switch 2", "stream36", (f) => !!f.specs.switch2, "price", "Best Capture Cards for Switch 2",
    "The Nintendo Switch 2 has been on sale since June 2025, and capture cards need explicit support for it. Every pick lists Switch 2 compatibility in its title or bullets, and we ordered them from the lowest price up.",
    "Switch 2 docked output can reach 4K60 with HDR, so check each card's pass-through limits and use the HDMI cable and dock that came with your console."),
];
