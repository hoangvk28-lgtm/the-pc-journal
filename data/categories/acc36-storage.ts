import handheldPool from "@/data/pcj-pool/handheld36.json";
import nasPool from "@/data/pcj-pool/nas36.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 36 storage groups: microSD cards for handhelds and 3.5-inch NAS hard drives. Figures come from each listing's title
 * or bullets only. Dropped: renewed listings (SanDisk Gameplay 1TB renewed, WD Red Plus 8TB renewed), the Toshiba N300 10TB
 * (reseller title and a price far above the 12TB WD), the Synology HAT3300 (no speed, cache or warranty stated) and every
 * microSD Express card, because handheld slots such as the Steam Deck's run Express cards at UHS-I speed.
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const mbs = (v: number | string | boolean) => `${Number(v).toLocaleString("en-US")}MB/s`;

export const microsdSchema: CategorySchema = {
  id: "microsd",
  plural: "microSD Cards",
  fields: [
    { key: "capacity", label: "Capacity", noun: "capacity", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => (Number(v) >= 1024 ? `${Number(v) / 1024}TB` : `${v}GB`) },
    { key: "read", label: "Read speed", noun: "rated read speed", better: "higher", superlative: ["fastest", "slowest"], fmt: mbs, rule: { label: "Fastest Rated Reads", bestFor: ["Loading games straight from the card.", "Quick installs and file copies to a handheld."] }, strength: (v) => (Number(v) >= 200 ? `rated reads up to ${mbs(v)}` : undefined) },
    { key: "write", label: "Write speed", noun: "rated write speed", better: "higher", superlative: ["fastest", "slowest"], fmt: mbs },
    { key: "appclass", label: "App class", fmt: (v) => String(v), strength: (v) => (v === "A2" ? "an A2 app-performance rating" : undefined), weakness: (v) => (v === "A1" ? "Only an A1 app rating, so it is slower at launching games from the card" : undefined) },
    { key: "video", label: "Video class", fmt: (v) => String(v) },
    { key: "warranty", label: "Warranty", fmt: (v) => (typeof v === "number" ? `${v}-year` : String(v)), strength: (v) => (typeof v === "number" ? (v >= 5 ? `a ${v}-year warranty` : undefined) : `a ${v} warranty`) },
    { key: "adapter", label: "SD adapter", fmt: (v) => (v ? "Included" : "Not listed"), strength: (v) => (v ? "an SD adapter in the box" : undefined) },
    { key: "switch2", label: "Switch 2", fmt: (v) => (v ? "Listed as compatible" : "Not compatible"), weakness: (v) => (v === false ? "Listed as not compatible with the Nintendo Switch 2" : undefined) },
  ],
  compat: (f) => {
    const s = ["Check your handheld's maximum supported card size; a 1TB card only helps if the device formats it.", "A UHS-I card such as this one works in any standard microSD slot. The usable capacity after formatting is a little below the printed figure."];
    if (f.specs.switch2 === false) s.push("The listing says it is not for the Nintendo Switch 2, which needs a microSD Express card.");
    return s;
  },
  criteria: [
    { id: "uhs", title: "UHS-I is what most handhelds read", body: "Steam Deck-class handhelds read standard microSD cards over a UHS-I connection. Newer microSD Express cards cost more and fall back to UHS-I speed in these slots, so the extra speed goes unused." },
    { id: "a2", title: "Look for an A2 rating", body: "The A2 application class promises faster random reads, which is what loading a game from the card needs. A1 cards work but launch games more slowly." },
    { id: "capacity", title: "Pick capacity for your library", body: "Modern games run from 20GB to over 100GB. 256GB holds a handful; 512GB or 1TB avoids juggling installs. Check your device's supported maximum." },
    { id: "write", title: "Rated speeds are best-case", body: "Maker figures are maximum sequential reads in a fast reader. Real handheld speeds are lower, and write speed matters when you download a game to the card." },
    { id: "genuine", title: "Buy from a reputable seller", body: "Counterfeit cards report a size they do not have. Buy from the maker or an authorised seller, and test a new card with a capacity checker before filling it." },
    { id: "warranty", title: "Warranty and durability", body: "Most makers rate their cards as shock, water, temperature and X-ray proof, and list warranties from three years to lifetime. A long warranty helps if you carry the card around." },
  ],
  faq: [
    { id: "express", q: "Do I need a microSD Express card?", a: "No. Handheld slots such as the Steam Deck's read standard UHS-I cards, and Express cards fall back to UHS-I speed there. Express is for devices such as the Nintendo Switch 2." },
    { id: "a2", q: "Is the A2 rating worth paying for?", a: "For games run from the card, yes. A2 raises random-read performance, which helps load times. The price gap is usually small." },
    { id: "internal", q: "Is a microSD card as fast as the internal SSD?", a: "No. The internal drive reads several times faster, so keep the games you play most on it and use the card for the rest." },
    { id: "format", q: "How do I set up a new card?", a: "Insert it, then format it from the handheld's own settings so the device uses the right file system." },
    { id: "switch", q: "Will these cards work in a Nintendo Switch?", a: "Most UHS-I cards do work in the original Switch, but several listings say they are not for the Switch 2. Check each card's compatibility line." },
  ],
  evaluated: [
    { title: "Speed", description: "We compared the rated read and write speeds each maker states." },
    { title: "App class", description: "We checked for A2 ratings, which matter for running games from the card." },
    { title: "Capacity and price", description: "We compared capacity against the price at the time of writing." },
    { title: "Warranty and compatibility", description: "We noted warranty length and the device compatibility each listing states." },
  ],
};

export const microsdFacts: Record<string, Fact> = withPool({ ...(handheldPool as Pool) }, [
  F("B0G8M74T13", "SanDisk Extreme 512GB microSD", "Extreme 512GB", { capacity: 512, read: 245, write: 170, video: "U3, V30", adapter: false }, ["5K-video-ready U3 and V30 ratings", "a build SanDisk rates temperature, water, shock and X-ray proof", "the SanDisk Memory Zone app for backups"]),
  F("B0G8LLK2HM", "SanDisk Extreme 1TB microSD", "Extreme 1TB", { capacity: 1024, read: 245, write: 170, video: "U3, V30", adapter: false }, ["5K-video-ready U3 and V30 ratings", "a build SanDisk rates temperature, water, shock and X-ray proof", "the SanDisk Memory Zone app for backups"]),
  F("B0CRHVJY88", "SanDisk Gameplay 1TB microSD", "Gameplay 1TB", { capacity: 1024, read: 190, write: 130, appclass: "A2", switch2: false }, ["proprietary technology that SanDisk says goes beyond standard UHS-I speed on compatible devices", "support for AAA, 3D and VR game graphics, by SanDisk's claim", "4K UHD recording support on compatible devices"]),
  F("B0CWPNB3M7", "Samsung EVO Plus 512GB microSD", "EVO Plus 512GB", { capacity: 512, read: 160, appclass: "A2", video: "U3, V30", warranty: 10, adapter: true }, ["6-proof protection with a 10-year limited warranty", "listed use in the original Nintendo Switch and handheld gaming systems", "an SD adapter in the box"]),
  F("B0GQZL37JG", "Samsung T9 512GB microSD", "T9 512GB", { capacity: 512, read: 200, write: 130, video: "U3, V30", warranty: 3 }, ["6-proof durability against water, temperature, X-rays, magnets and drops", "Samsung Magician 9.0 for authenticity checks and card health", "listed use in handheld gaming consoles, laptops and drones"]),
  F("B0DQY9M2FR", "Lexar Play 512GB microSD", "Play 512GB", { capacity: 512, read: 205, write: 140, appclass: "A2", video: "V30", warranty: 5, switch2: false }, ["listed use in portable gaming devices and the original Nintendo Switch", "4K and Full HD video capture and playback", "a five-year limited warranty"]),
  F("B0DQYCG9D6", "Lexar Play 1TB microSD", "Play 1TB", { capacity: 1024, read: 205, write: 140, appclass: "A2", video: "V30", warranty: 5, switch2: false }, ["listed use in portable gaming devices and the original Nintendo Switch", "4K and Full HD video capture and playback", "a five-year limited warranty"]),
  F("B0DV7TWSP2", "Lexar Play Blue 512GB microSD", "Play Blue 512GB", { capacity: 512, read: 160, appclass: "A2", video: "V30", warranty: 5, switch2: false }, ["lifetime access to the Lexar Recovery Tool", "temperature, water and X-ray protection", "a 5-year limited warranty"]),
  F("B0F1DSP4QW", "Lexar Play Blue 1TB microSD", "Play Blue 1TB", { capacity: 1024, read: 160, appclass: "A2", video: "V30", warranty: 5, switch2: false }, ["A2-rated app performance for games and apps", "temperature, water and X-ray protection", "capacities up to 2TB in the range"]),
  F("B0F29YZWSM", "Kingston Canvas Go Plus 256GB microSD", "Canvas Go Plus 256GB", { capacity: 256, read: 200, appclass: "A2", video: "U3, V30", adapter: true }, ["an A2 rating aimed at portable game consoles", "U3 and V30 ratings for 4K recording", "an optional SD adapter in the box"]),
  F("B0F2B1LT72", "Kingston Canvas Go Plus 512GB microSD", "Canvas Go Plus 512GB", { capacity: 512, read: 200, appclass: "A2", video: "U3, V30", adapter: true }, ["an A2 rating aimed at portable game consoles", "U3 and V30 ratings for 4K recording", "an optional SD adapter in the box"]),
  F("B0F2B1YK67", "Kingston Canvas Go Plus 1TB microSD", "Canvas Go Plus 1TB", { capacity: 1024, read: 200, appclass: "A2", video: "U3, V30", adapter: true }, ["an A2 rating aimed at portable game consoles", "U3 and V30 ratings for 4K recording", "an optional SD adapter in the box"]),
  F("B0C65CMZK7", "TEAMGROUP A2 Pro Plus 1TB microSD", "A2 Pro Plus 1TB", { capacity: 1024, read: 160, write: 110, appclass: "A2", video: "U3, V30", adapter: true }, ["a card listed for the Nintendo Switch and Steam Deck", "an SD adapter in the box"]),
  F("B0CF1GPJ83", "Silicon Power Superior Gaming 1TB microSD", "Superior Gaming 1TB", { capacity: 1024, appclass: "A2", video: "U3, V30", warranty: 5, adapter: true }, ["a design listed for the Steam Deck, ROG Ally and Nintendo Switch", "automatic error correction (ECC)", "a 5-year limited manufacturer warranty"]),
  F("B0DM9NP6QS", "PNY PRO Elite Prime 1TB microSD", "PRO Elite Prime 1TB", { capacity: 1024, read: 200, write: 150, appclass: "A2", video: "U3, V30", adapter: true, switch2: false }, ["speeds that PNY quotes with its Performance Prime card reader", "A2 app performance of at least 4,000 read IOPS", "an SD adapter in the box"]),
  F("B08TJTCCV8", "Amazon Basics 512GB microSDXC", "Amazon Basics 512GB", { capacity: 512, read: 100, appclass: "A2", video: "U3, V30", adapter: true, switch2: false }, ["IPX6 water resistance and a -10 to 80°C range", "at least 465GB of usable space on the 512GB card, per the maker", "an SD adapter in the box"]),
]);

/* ------------------------------------------------------------------------------------------------- NAS drives */

export const nasSchema: CategorySchema = {
  id: "nas-drive",
  plural: "NAS Hard Drives",
  fields: [
    { key: "capacity", label: "Capacity", noun: "capacity", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}TB` },
    { key: "rpm", label: "Spindle speed", noun: "spindle speed", better: "higher", superlative: ["fastest", "slowest"], fmt: (v) => `${Number(v).toLocaleString("en-US")} RPM`, strength: (v) => (Number(v) >= 7200 ? "a 7,200 RPM spindle for faster file access" : undefined), weakness: (v) => (Number(v) <= 5900 ? "A slower spindle that trades speed for lower heat and noise" : undefined) },
    { key: "cache", label: "Cache", noun: "cache size", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}MB`, strength: (v) => (Number(v) >= 256 ? `a ${v}MB cache` : undefined) },
    { key: "recording", label: "Recording", fmt: (v) => String(v), strength: (v) => (v === "CMR" ? "CMR recording, which suits RAID arrays" : undefined) },
    { key: "workload", label: "Workload rating", noun: "workload rating", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v}TB/year`, rule: { label: "Highest Workload Rating", bestFor: ["Busy multi-user NAS boxes.", "Arrays that run backups and media serving all day."] }, strength: (v) => `a ${v}TB/year workload rating` },
    { key: "warranty", label: "Warranty", noun: "warranty", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v}-year`, strength: (v) => (Number(v) >= 5 ? `a ${v}-year warranty` : undefined) },
    { key: "mtbf", label: "MTBF", noun: "rated MTBF", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v}M hours` },
    { key: "bays", label: "Rated for up to", fmt: (v) => `${v} bays` },
    { key: "speed", label: "Max transfer rate", noun: "rated transfer rate", better: "higher", superlative: ["fastest", "slowest"], fmt: mbs },
    { key: "rescue", label: "Data recovery", fmt: (v) => `${v} years included`, strength: (v) => `${v} years of Rescue Data Recovery Services` },
  ],
  compat: (f) => {
    const s = ["Check your NAS maker's compatibility list for the exact model; a drive can work in one enclosure and be unsupported in another.", "It is a 3.5-inch SATA drive, so it needs a bay that takes 3.5-inch drives and a SATA connection, which every NAS enclosure provides."];
    if (f.specs.bays) s.push(`The listing rates it for NAS systems of up to ${f.specs.bays} bays, so check your enclosure's bay count against that.`);
    return s;
  },
  criteria: [
    { id: "cmr", title: "Choose CMR for arrays", body: "Conventional magnetic recording suits RAID because writes stay steady while an array rebuilds. Shingled drives can slow sharply under sustained writes, so confirm the recording type before buying." },
    { id: "bays", title: "Match the drive to the bay count", body: "Drives rated for up to 8 bays suit home and small-office boxes. Pro lines add vibration sensors for larger enclosures with many drives spinning together." },
    { id: "rpm", title: "5,400 versus 7,200 RPM", body: "Faster spindles open files sooner but run hotter and louder. For a home media and backup box a slower drive is usually fine; busy multi-user shares benefit from 7,200 RPM." },
    { id: "capacity", title: "Plan capacity with RAID in mind", body: "Redundant arrays give up capacity for protection. Work out usable space for your RAID level, and buy identical drives where you can." },
    { id: "warranty", title: "Warranty and recovery services", body: "NAS drives usually carry three to five years of warranty. Some makers add data recovery services, which can matter when a failure hits a drive that held the only copy." },
    { id: "backup", title: "RAID is not a backup", body: "Redundancy survives a drive failure, not deletion, theft or fire. Keep a second copy of anything important elsewhere." },
  ],
  faq: [
    { id: "desktop", q: "Can I use a desktop hard drive in a NAS?", a: "Many NAS boxes accept them, but NAS drives add firmware and vibration handling for 24/7 use in a multi-drive enclosure, which is why they are the usual recommendation." },
    { id: "smr", q: "What is the difference between CMR and SMR?", a: "CMR writes tracks independently and keeps steady speed in RAID arrays. SMR overlaps tracks to fit more data, which can slow rebuilds and sustained writes." },
    { id: "pro", q: "Do I need a Pro or enterprise-class drive?", a: "Only for busy multi-user NAS systems or large bay counts. Home and small-office use rarely needs the higher workload rating." },
    { id: "same", q: "Should all drives in an array match?", a: "Matching capacity is required for most RAID levels, and matching model and speed keeps behaviour predictable." },
    { id: "ssd", q: "Should I use SSDs instead?", a: "SSDs are faster and quieter but cost far more per terabyte. Hard drives remain the practical choice for bulk NAS storage." },
  ],
  evaluated: [
    { title: "Recording and speed", description: "We compared recording type, spindle speed and cache from each listing." },
    { title: "Workload and bay rating", description: "We noted the workload rating and the NAS bay count each maker states." },
    { title: "Warranty and support", description: "We recorded warranty length and any data recovery service included." },
    { title: "Capacity and price", description: "We compared capacity against the price at the time of writing." },
  ],
};

export const nasFacts: Record<string, Fact> = withPool(nasPool as Pool, [
  F("B0D1V2K4LJ", "WD Red Pro 8TB", "Red Pro 8TB", { capacity: 8, rpm: 7200, cache: 256, recording: "CMR", workload: 550 }, ["a design for RAID-optimised NAS systems with no bay limit", "testing with a wide range of NAS vendors for compatibility", "tuning for high-intensity 24x7 multi-user NAS use"]),
  F("B0D1V42F9B", "WD Red Pro 6TB", "Red Pro 6TB", { capacity: 6, rpm: 7200, cache: 256, recording: "CMR", workload: 550 }, ["a design for RAID-optimised NAS systems with no bay limit", "testing with a wide range of NAS vendors for compatibility", "tuning for high-intensity 24x7 multi-user NAS use"]),
  F("B0F4R3YCL6", "WD Red Plus 10TB", "Red Plus 10TB", { capacity: 10, rpm: 7200, cache: 512, recording: "CMR", workload: 180, warranty: 3, bays: 8 }, ["NASware firmware for NAS compatibility", "a build for small and medium business NAS in a 24x7 environment"]),
  F("B0F4R6SNJG", "WD Red Plus 12TB", "Red Plus 12TB", { capacity: 12, rpm: 7200, cache: 512, recording: "CMR", workload: 180, warranty: 3, bays: 8 }, ["NASware firmware for NAS compatibility", "a build for small and medium business NAS in a 24x7 environment"]),
  F("B0G5YDXKS7", "WD Red Plus 4TB (128MB cache)", "Red Plus 4TB", { capacity: 4, rpm: 5400, cache: 128, recording: "CMR", bays: 8 }, ["NASware firmware tuned for NAS", "a design for continuous operation"]),
  F("B0BDXQ61Z9", "WD Red Plus 6TB", "Red Plus 6TB", { capacity: 6, rpm: 5400, cache: 256, recording: "CMR", workload: 180, warranty: 3, bays: 8 }, ["NASware firmware for NAS compatibility", "a build for small and medium business NAS in a 24/7 environment"]),
  F("B0C4X31Q9F", "WD Red Plus 2TB", "Red Plus 2TB", { capacity: 2, rpm: 5400, cache: 64, recording: "CMR", workload: 180, warranty: 3, bays: 8 }, ["NASware firmware for NAS compatibility", "a build for small and medium business NAS in a 24/7 environment"]),
  F("B084ZV4DXB", "Seagate IronWolf 8TB", "IronWolf 8TB", { capacity: 8, cache: 256, mtbf: 1, warranty: 3, rescue: 3, bays: 8 }, ["IronWolf Health Management monitoring", "less wear, noise and vibration in a NAS enclosure, by Seagate's claim"]),
  F("B09NHV3CK9", "Seagate IronWolf 4TB", "IronWolf 4TB", { capacity: 4, rpm: 5400, cache: 64, recording: "CMR", mtbf: 1, warranty: 3, rescue: 3, bays: 8 }, ["IronWolf Health Management monitoring", "less wear, noise and vibration in a NAS enclosure, by Seagate's claim"]),
  F("B084ZV8YW8", "Seagate IronWolf Pro 4TB", "IronWolf Pro 4TB", { capacity: 4, rpm: 7200, cache: 128, speed: 214, mtbf: 1.2, warranty: 5, rescue: 3, bays: 24 }, ["extra data protection in the event of power loss", "lower power consumption than earlier models, by Seagate's claim", "IronWolf Health Management monitoring"]),
  F("B084ZV1DN6", "Seagate IronWolf Pro 12TB", "IronWolf Pro 12TB", { capacity: 12, rpm: 7200, cache: 256, speed: 250, mtbf: 1.2, warranty: 5, rescue: 3, bays: 24 }, ["extra data protection in the event of power loss", "lower power consumption than earlier models, by Seagate's claim", "IronWolf Health Management monitoring"]),
  F("B0B94PNF7P", "Seagate IronWolf Pro 16TB", "IronWolf Pro 16TB", { capacity: 16, rpm: 7200, cache: 256, recording: "CMR", workload: 550, mtbf: 2.5, warranty: 5, rescue: 3 }, ["AgileArray firmware with dual-plane balancing and time-limited error recovery", "rotational vibration sensors for multi-bay arrays", "IronWolf Health Management monitoring"]),
  F("B07SGGWYC1", "Seagate IronWolf 16TB", "IronWolf 16TB", { capacity: 16, rpm: 7200, cache: 256, recording: "CMR", mtbf: 1, warranty: 3, rescue: 3, bays: 8 }, ["IronWolf Health Management monitoring", "less wear, noise and vibration in a NAS enclosure, by Seagate's claim"]),
  F("B0H5WGGZ9M", "Toshiba N300 16TB", "N300 16TB", { capacity: 16, rpm: 7200, workload: 180, warranty: 3, bays: 8 }, ["integrated rotational vibration sensors", "24/7 operation in 1-to-8-bay NAS systems", "a design for heat protection and long service"]),
]);
