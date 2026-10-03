import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 33: "best <product> under $N" tiers for component and peripheral groups. Each tier filters to a price band (the previous
 * tier's ceiling up to this tier's ceiling, widened where a band holds too few products) and uses a different sort.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const band = (lo: number, hi: number) => (f: Fact) => p(f) > lo && p(f) <= hi;
const E = (slug: string, kw: string, g: PlanItem["g"], where: PlanItem["where"], sort: string, seo: string, lead: string, close: string): PlanItem => ({ slug, kw, g, where, sort, seo, lead, close });

const ssdOnly = (f: Fact) => s(f, "kind") === "SSD";
const overEarMic = (f: Fact) => !/in-ear|earbud|neckband/i.test(s(f, "design") + " " + f.name) && !/^(none|no mic)/i.test(s(f, "mic")) && s(f, "mic") !== "";
const notTv = (f: Fact) => !/\bTV\b|television/i.test(f.name);
const wired = (f: Fact) => !/^wired/i.test(s(f, "connection"));
const notPortable = (f: Fact) => notTv(f) && !/portable/i.test(f.name);
const notSingle = (f: Fact) => !/\(single\)/i.test(f.name);
const adultChair = (f: Fact) => !/kid|child|youth|teen|toddler|stool|drafting/i.test(f.name);

type T = [n: number, lo: number, sort: string, first: string, close: string];
const tiers = (slugNoun: string, kw: string, noun: string, g: PlanItem["g"], extra: (f: Fact) => boolean, rows: T[], shared: string): PlanItem[] =>
  rows.map(([n, lo, sort, first, close]) =>
    E(`best-${slugNoun}-under-${n}`, `${kw} under $${n}`, g, (f) => extra(f) && band(lo, n)(f), sort, `Best ${noun} Under $${n}`,
      `${first} ${(lo === 0 ? shared.replace("cost $LO to $N", "cost $N or less") : shared.replace("$LO", String(lo))).replace("$N", String(n))}`, close));

const any = () => true;

export const PLAN: PlanItem[] = [
  ...tiers("nvme-ssds", "NVMe SSDs", "NVMe SSDs", "ssd", any, [
    [120, 0, "price", "Under $120 an NVMe SSD is usually a 500GB or 1TB drive, enough for the operating system and a few games.", "Check how many free M.2 slots your motherboard has, and whether the slot is PCIe 3.0 or 4.0, before ordering."],
    [150, 0, "-read", "Up to $150 an NVMe SSD is mostly a 500GB or 512GB drive, so rated read speed is the main difference between picks.", "A faster rated drive only helps if the M.2 slot runs at the same PCIe generation."],
    [250, 150, "-capacity", "From $150 to $250 an NVMe SSD is typically a 1TB drive, so read speed, heatsink and PCIe generation are what to compare.", "Decide whether you need space or sequential speed; for game libraries, capacity usually helps more."],
    [400, 250, "price", "Between $250 and $400 you reach 2TB drives and the first PCIe 5.0 models alongside faster PCIe 4.0 drives.", "PCIe 5.0 drives run hot, so check whether your board's M.2 heatsink or the drive's own heatsink fits."],
  ], "Every drive cost $LO to $N when we checked and is an internal NVMe SSD with a stated capacity and read speed."),
  ...tiers("portable-ssds", "portable SSDs", "Portable SSDs", "storage", ssdOnly, [
    [100, 0, "price", "Under $100 a portable SSD is usually a 500GB or 1TB drive over a basic USB connection.", "Plug a portable SSD into a port that matches its speed; a slow port limits any drive."],
    [120, 85, "-read", "Between $85 and $120 you find 1TB drives with a faster stated read speed.", "Look at the cable in the box, since a USB-C to USB-A cable can limit a faster drive."],
    [150, 0, "-capacity", "Up to $150 portable SSDs add more capacity or rugged builds.", "A rugged rating covers drops and dust, but check the stated height and water rating, not just the word."],
    [250, 150, "price", "From $150 to $250 a portable SSD is usually a 1TB drive with a USB-C connection, so port speed and build matter.", "Match the drive's port to your laptop or console; a faster drive wastes its speed on a slower port."],
  ], "Every drive cost $LO to $N when we checked and is a portable SSD, not a hard drive."),
  ...tiers("ram", "RAM", "RAM", "ram", any, [
    [250, 0, "price", "Under $250 RAM kits are mostly 16GB and 32GB DDR5 or DDR4 sets at moderate speeds.", "Match the memory type (DDR4 or DDR5) to your motherboard before looking at speed."],
    [300, 250, "-speed", "From $250 to $300 you find 16GB DDR5 kits and 32GB DDR4 kits at faster speeds.", "Check the motherboard's memory support list; a very fast kit may run slower than its rating."],
    [400, 250, "-capacity", "Up to $400 RAM kits are still 16GB or 32GB, so the decision is mostly between DDR4 and DDR5 platforms.", "Two sticks are easier on the memory controller than four, so prefer a two-module kit over four."],
    [500, 300, "price", "Between $300 and $500 you find 32GB DDR5-6000 kits as well as 16GB kits.", "Enable the XMP or EXPO profile in the BIOS; otherwise the kit runs at a default, slower speed."],
  ], "Every kit cost $LO to $N when we checked and lists its speed, capacity and memory type."),
  ...tiers("motherboards", "motherboards", "Motherboards", "mb", any, [
    [120, 0, "price", "Under $120 a motherboard is usually a B-series or entry chipset board for a mid-range processor.", "Check the CPU socket and the BIOS version; some boards need an update before a newer processor will boot."],
    [150, 119, "-m2", "From $120 to $150 boards add Wi-Fi and move up to B850, B650E and Z790 chipsets.", "Count the M.2 slots and note which share bandwidth with SATA ports before you plan storage."],
    [250, 150, "-lan", "Between $150 and $250 you reach Z890, X870 and B850 boards with Wi-Fi.", "Look at the form factor against your case; ATX boards do not fit small cases."],
  ], "Every board cost $LO to $N when we checked and lists its CPU socket and form factor."),
  ...tiers("power-supplies", "power supplies", "Power Supplies", "psu", any, [
    [75, 0, "price", "Under $75 a power supply is usually a 450W to 650W unit that powers a mid-range gaming PC.", "Add up the graphics card and CPU power ratings, then leave headroom, before picking a wattage."],
    [80, 60, "watts", "Around $80 you find 550W to 750W units from known brands.", "Check that the unit has the PCIe power connectors your graphics card needs."],
    [120, 80, "-watts", "From $80 to $120 power supplies reach 750W to 1000W and several modular designs.", "A modular cable set makes a small case easier to build; check the unit's depth against your case."],
    [250, 120, "-price", "Between $120 and $250 you reach 850W to 1600W units for high-end graphics cards.", "Check for the 12V-2x6 connector if your card uses it, and for a long warranty."],
  ], "Every unit cost $LO to $N when we checked and lists its wattage and form factor."),
  ...tiers("cpus", "CPUs", "CPUs", "cpu", any, [
    [250, 100, "-cores", "Under $250 a CPU covers mid-range processors from both AMD and Intel for gaming and everyday work.", "Match the socket to your motherboard, and check whether the cooler is in the box."],
    [350, 250, "-boost", "From $250 to $350 you find higher-core-count processors from AMD and Intel.", "Check that your motherboard's BIOS supports the processor before you buy."],
  ], "Every processor cost $LO to $N when we checked and lists its core count and socket."),
  ...tiers("graphics-cards", "graphics cards", "Graphics Cards", "gpu", any, [
    [350, 0, "price", "Under $350 a graphics card is aimed at 1080p play, with 4GB to 12GB of video memory.", "Check the card's length and your power supply's connectors before ordering."],
    [1200, 700, "-vram", "Up to $1,200 you reach high-end cards with 16GB or more of video memory for 1440p and 4K play.", "Check case clearance and power connectors; these cards are large and draw a lot of power."],
  ], "Every card cost $LO to $N when we checked and lists its chip and video memory."),
  ...tiers("gaming-mice", "gaming mice", "Gaming Mice", "gmouse", any, [
    [20, 0, "price", "Under $20 a gaming mouse is a wired model with a sensor and a few buttons.", "Look at the stated weight and shape; an ambidextrous design suits both hands."],
    [40, 20, "-dpi", "From $20 to $40 gaming mice add wireless connections and higher sensor ratings.", "A high DPI figure matters less than a stable sensor; keep your sensitivity moderate."],
    [60, 40, "weight", "Between $40 and $60 lighter and wireless gaming mice appear.", "Check the battery hours and the polling rate if you play fast shooters."],
    [80, 50, "-battery", "Up to $80 gaming mice add longer battery life and better polling rates.", "Pick a shape that suits your grip; claw and palm grips prefer different sizes."],
    [120, 80, "-polling", "From $80 to $120 you find lightweight wireless esports mice and MMO mice with high polling rates.", "A high polling rate uses more CPU and battery, so check whether it fits your system."],
  ], "Every mouse cost $LO to $N when we checked and lists its sensor and connection."),
  ...tiers("wireless-mice", "wireless mice", "Wireless Mice", "wmouse", wired, [
    [15, 0, "price", "Under $15 a wireless mouse is a basic 2.4GHz or Bluetooth model for everyday work.", "Check whether the mouse uses a USB receiver, Bluetooth or both."],
    [40, 15, "-battery", "From $15 to $40 you find ergonomic, vertical and multi-device mice.", "A vertical mouse changes your wrist position; give it a few days before judging it."],
    [60, 40, "price", "Between $40 and $60 wireless mice add quieter clicks, multi-device pairing and rechargeable batteries.", "If you switch between a laptop and a PC, check how many devices the mouse stores."],
  ], "Every mouse cost $LO to $N when we checked and connects without a cable."),
  ...tiers("gaming-keyboards", "gaming keyboards", "Gaming Keyboards", "gkb", any, [
    [25, 0, "price", "Under $25 a gaming keyboard is usually a wired board, either a compact 60% layout or a basic full-size one.", "Check whether the keyboard is mechanical or membrane; the key switch decides the typing feel."],
    [30, 20, "-polling", "Between $20 and $30 you start to see compact layouts and mechanical switches.", "Choose between full-size, TKL and 60% layouts based on desk space and numpad use."],
    [40, 30, "price", "From $30 to $40 gaming keyboards add hot-swappable switches and wireless options.", "A hot-swappable board lets you change switches later without soldering."],
    [60, 40, "-battery", "Up to $60 you reach wireless boards and Hall-effect (magnetic) keyboards alongside TKL mechanicals.", "Check the battery hours with the backlight on, since lighting shortens it."],
    [75, 50, "-price", "Between $50 and $75 you find TKL and compact boards from established makers, plus some wireless models.", "Try to match the switch type (linear, tactile or clicky) to how loud you can type."],
    [120, 75, "price", "From $75 to $120 you find Hall-effect analog and wireless mechanical boards.", "Decide whether adjustable actuation matters for the games you play before paying extra."],
  ], "Every keyboard cost $LO to $N when we checked and lists its layout and switch type."),
  ...tiers("gaming-headsets", "gaming headsets", "Gaming Headsets", "headset", overEarMic, [
    [25, 0, "price", "Under $25 a gaming headset is a wired over-ear model with a boom or built-in microphone.", "Check the connector; a 3.5mm headset needs a splitter or one jack on some PCs."],
    [60, 25, "-driver", "From $25 to $60 you find recognisable wired headsets and the first wireless models.", "Check the mic is detachable or has a mute button if you talk often."],
    [75, 45, "weight", "Between $45 and $75 you find lighter headsets and wireless models.", "A lighter headset is more comfortable over long sessions; check the stated weight."],
    [120, 75, "-battery", "From $75 to $120 gaming headsets add 2.4GHz wireless and longer battery life.", "Check that the dongle works with your PC, console or both."],
  ], "Every headset cost $LO to $N when we checked and is an over-ear headset with a microphone."),
  ...tiers("pc-speakers", "PC speakers", "PC Speakers", "speaker", notSingle, [
    [40, 0, "price", "Under $40 PC speakers are small stereo pairs or compact soundbars powered over USB.", "Check how the speakers get power and audio; USB power and a 3.5mm input are the most common."],
    [50, 0, "-woofer", "Around $50 you find larger drivers and sets with Bluetooth.", "Check whether the speaker has a headphone output if you also use a headset."],
    [75, 50, "-peak", "Between $50 and $75 PC speakers are mostly soundbars and compact stereo pairs.", "Position the speakers at ear height and equal distances for the best stereo effect."],
    [120, 70, "-price", "Up to $120 PC speakers include 2.1 sets with a subwoofer, gaming speakers and entry studio monitors.", "A 2.1 set adds bass, but needs a power outlet for the subwoofer as well."],
    [250, 120, "price", "From $120 to $250 you find studio-style and 2.1 systems with better driver sizes.", "Check the inputs; optical, USB and Bluetooth each suit different setups."],
  ], "Every set cost $LO to $N when we checked and is a PC speaker system with its inputs listed."),
  ...tiers("desk-chairs", "desk chairs", "Desk Chairs", "chair", adultChair, [
    [70, 0, "price", "Under $70 a chair is a basic gaming or office model with simple height adjustment.", "Check the weight limit and seat height range against your own height and desk."],
    [80, 55, "-capacity", "From $55 to $80 chairs add flip-up arms and footrests.", "Sit in the chair with your feet flat; check the seat-height range, not just the weight limit."],
    [120, 80, "-recline", "Up to $120 you find chairs with more recline, footrests and adjustable arms.", "Adjustable armrests help keep your shoulders relaxed at the desk."],
    [250, 120, "price", "Between $120 and $250 you find big-and-tall, heavy-duty mesh and ergonomic chairs with higher weight ratings.", "Check the warranty; a chair at this price should stand up to daily use for years."],
  ], "Every chair cost $LO to $N when we checked and is a full-size chair for adults."),
  ...tiers("monitors", "monitors", "Monitors", "monitor", notPortable, [
    [80, 0, "price", "Under $80 a monitor is usually a 24 inch 1080p panel.", "Check the video inputs; many cheap monitors have only HDMI and VGA."],
    [120, 80, "-hz", "Between $80 and $120 you find 1080p gaming monitors with high refresh rates.", "A high refresh rate needs the right cable and port; check DisplayPort or HDMI support."],
    [350, 150, "-size", "From $150 to $350 monitors reach 27 to 34 inch screens, 1440p resolution and ultrawide shapes.", "Check the resolution against your graphics card; 1440p asks more of it than 1080p."],
  ], "Every monitor cost $LO to $N when we checked and lists its size, resolution and refresh rate."),
  ...tiers("air-coolers", "air coolers", "Air Coolers", "air", any, [
    [40, 0, "price", "Under $40 air coolers are budget single- and dual-tower models plus low-profile options for mid-range processors.", "Check the cooler's height against your case's clearance before ordering."],
    [60, 35, "-pipes", "From $35 to $60 you find twin-tower coolers with 120mm fans and some low-profile models.", "Check the RAM clearance; large coolers can block tall memory modules."],
    [80, 55, "-fan", "Up to $80 air coolers include dual-tower models and quiet-focused designs from established brands.", "Confirm the socket support list includes your CPU, including AM5 or LGA1700 and newer."],
  ], "Every cooler cost $LO to $N when we checked and is an air cooler with its socket support listed."),
  ...tiers("mouse-pads", "mouse pads", "Mouse Pads", "pad", any, [
    [15, 0, "price", "Under $15 a mouse pad is a cloth pad, from compact sizes to extended ones.", "Pick a size that fits your mouse swipe; low sensitivity needs more room."],
    [25, 15, "-width", "From $15 to $25 you find larger pads and desk mats with stitched edges.", "Check the base; rubber bases stay put better than plain fabric."],
    [30, 20, "price", "Between $20 and $30 mouse pads add waterproof surfaces, RGB edges and larger sizes.", "A cloth surface gives control, while hard surfaces give speed."],
    [40, 25, "-thick", "Up to $40 you find extended pads and desk mats.", "Measure your desk before choosing an extended pad."],
  ], "Every pad cost $LO to $N when we checked and lists its size and surface."),
];
