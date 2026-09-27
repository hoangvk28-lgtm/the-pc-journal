import pool from "@/data/pcj-pool/external-storage.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { str, withPool } from "./helpers";

/** Batch 13e external hard drives and portable SSDs. Read speeds are manufacturer maximums. */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const storage13eSchema: CategorySchema = {
  id: "external-storage-13e",
  plural: "Drives",
  fields: [
    { key: "kind", label: "Drive type", fmt: (v) => String(v) },
    { key: "capacity", label: "Capacity (as reviewed)", noun: "capacity", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}TB` },
    { key: "read", label: "Max read speed", noun: "rated read speed", better: "higher", superlative: ["fastest", "slowest"], fmt: (v) => `${Number(v).toLocaleString("en-US")}MB/s`, strength: (v) => (Number(v) >= 2000 ? `rated reads up to ${Number(v).toLocaleString("en-US")}MB/s` : undefined) },
    { key: "port", label: "Connection", fmt: (v) => String(v) },
    { key: "rugged", label: "Durability claim", fmt: (v) => String(v) },
    { key: "security", label: "Security", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const p = str(f, "port");
    if (/gen 2x2/i.test(p)) s.push("Its top speed needs a USB 3.2 Gen 2x2 (20Gbps) port; most laptops and all Macs run it at 10Gbps speeds instead.");
    if (/usb-a|3\.0|gen 1/i.test(p) && !/usb-c/i.test(p)) s.push("It connects by USB-A; a USB-C-only laptop such as a MacBook Air needs an adapter or a USB-C cable.");
    if (/reformat/i.test(str(f, "mac"))) s.push("It ships formatted for Windows, so a Mac user reformats it (exFAT for both systems, APFS for Time Machine).");
    if (str(f, "kind") === "HDD") s.push("As a spinning hard drive it is slower than an SSD and less tolerant of knocks while running.");
    return s;
  },
  criteria: [
    { id: "ssd-hdd", title: "SSD or hard drive", body: "A portable hard drive gives the most terabytes per dollar and suits backups. A portable SSD is several times faster, lighter and more tolerant of drops, which suits working files and games." },
    { id: "port", title: "Match the port", body: "A 1,050MB/s SSD needs USB 3.2 Gen 2 (10Gbps); a 2,000MB/s SSD needs Gen 2x2 (20Gbps), which few laptops and no Macs offer. On a slower port the drive simply runs at the port's speed." },
    { id: "capacity", title: "Size for what you store", body: "1TB suits documents and a few games. 2TB or more suits photo libraries, video and large game libraries. Hard drives reach larger sizes for the money." },
    { id: "format", title: "Mac and Windows formatting", body: "Many drives ship formatted for Windows. On a Mac, reformat to APFS for Time Machine, or exFAT to share the drive with a Windows PC." },
    { id: "rugged", title: "Drop and water ratings", body: "IP ratings and drop heights are manufacturer claims. They matter for drives that travel in bags; a drive that stays on a desk needs less." },
    { id: "encryption", title: "Password and encryption", body: "Hardware encryption with a password protects a drive that could be lost. Software-only encryption depends on an app being available on each computer." },
  ],
  faq: [
    { id: "games", q: "Can I run PC games from an external SSD?", a: "Yes. Launchers such as Steam can add a library folder on an external drive. Load times depend on the drive and port; an SSD on a 10Gbps port is far quicker than a hard drive." },
    { id: "backup", q: "Is a portable SSD good for backups?", a: "It works, but a hard drive gives more capacity per dollar for backups. Keep a second copy somewhere else for anything irreplaceable." },
    { id: "capacity-shows-less", q: "Why does my 1TB drive show less space?", a: "Drive makers count 1TB as one trillion bytes; Windows counts in binary units, so it shows about 931GB. No space is missing." },
    { id: "console", q: "Will these work with PS5 or Xbox?", a: "Consoles can store and play older-generation games from USB drives. Current-generation games usually must run from internal storage; check the console's own rules." },
    { id: "cable", q: "Does the cable matter?", a: "Yes. Use the included cable or one rated for the drive's speed; a charging-only or USB 2.0 cable limits transfers." },
    { id: "lifespan", q: "How long do portable drives last?", a: "It depends on use and handling. Check the warranty length as a signal of the maker's confidence, and replace a drive that reports errors." },
  ],
  evaluated: [
    { title: "Drive type and speed", description: "We recorded whether each drive is an SSD or hard drive and its read speed." },
    { title: "Connection", description: "We checked the USB standard and connector each maker names." },
    { title: "Durability", description: "We noted listed drop, water and dust claims." },
    { title: "Security and extras", description: "We checked for password protection, encryption and backup software." },
  ],
};

export const storage13eFacts = withPool(pool as Pool, [
  // Hard drives
  F("B07CRG94G3", "Seagate Portable 2TB External Hard Drive", "Seagate Portable 2TB", { kind: "HDD", capacity: 2, port: "USB 3.0 (USB-A)", rugged: "Not stated", security: "None stated" }, ["an 18in USB 3.0 cable", "drag-and-drop file saving on Windows and Mac", "a low price per terabyte"]),
  F("B07CRG7BBH", "Seagate Portable 1TB External Hard Drive", "Seagate Portable 1TB", { kind: "HDD", capacity: 1, port: "USB 3.0 (USB-A)", rugged: "Not stated", security: "None stated", mac: "reformat for Mac" }, ["PC, Mac, PlayStation and Xbox compatibility", "one year of Rescue data recovery", "the lowest price tier among Seagate drives here"]),
  F("B094QZMM69", "Seagate One Touch 2TB Portable Hard Drive with Password", "One Touch 2TB", { kind: "HDD", capacity: 2, port: "USB 3.0", rugged: "Not stated", security: "Password, hardware encryption" }, ["a brushed-metal enclosure", "scheduled or one-click backups", "a two-year warranty with Rescue data recovery"]),
  F("B0721TN7Z6", "Seagate Expansion Portable 1TB External Hard Drive", "Expansion 1TB", { kind: "HDD", capacity: 1, port: "USB 3.0", rugged: "Not stated", security: "None stated" }, ["a plain plug-in design", "USB 3.0", "a compact enclosure"]),
  F("B07WZYM7RQ", "WD My Passport Ultra for Mac 5TB", "Passport Ultra for Mac", { kind: "HDD", capacity: 5, port: "USB-C (USB 3.1)", rugged: "Not stated", security: "Password, 256-bit AES hardware encryption" }, ["formatting for Mac out of the box", "a metal cover", "a USB-C connection"]),
  F("B00IRV005E", "LaCie Rugged Mini 2TB Portable Hard Drive", "Rugged Mini", { kind: "HDD", capacity: 2, port: "USB 3.0 (USB-A)", rugged: "Drops up to 4ft, dust and water resistant", security: "Password", mac: "reformat for Mac" }, ["drop resistance up to 4ft", "built-in password protection", "a rubber bumper design"]),
  F("B01N7QFZLQ", "LaCie Rugged USB-C 2TB Portable Hard Drive", "Rugged USB-C", { kind: "HDD", capacity: 2, port: "USB-C (USB 3.0 compatible)", rugged: "Drop, shock, dust and rain resistant", security: "None stated" }, ["a native USB-C connection", "Mac and PC compatibility", "resistance to drops, dust and rain"]),
  F("B07VTFN6HM", "WD My Passport 2TB Portable Hard Drive", "My Passport 2TB", { kind: "HDD", capacity: 2, port: "USB 3.0", rugged: "Not stated", security: "Password, hardware encryption" }, ["backup software with ransomware defense", "a three-year limited warranty", "a slim enclosure"]),
  F("B06W55K9N6", "WD Elements 2TB Portable Hard Drive", "WD Elements", { kind: "HDD", capacity: 2, port: "USB 3.2 Gen 1 (5Gbps)", rugged: "Not stated", security: "None stated", mac: "reformat for Mac" }, ["plug-and-play setup", "a small, light enclosure", "USB 3.2 Gen 1"]),
  // SSDs
  F("B088CMBD2Q", "Seagate Ultra Touch SSD 1TB", "Ultra Touch SSD", { kind: "SSD", capacity: 1, port: "USB-C with USB-A adapter", rugged: "Not stated", security: "None stated" }, ["a fabric-covered palm-sized design", "an included USB-A adapter", "an Android app for phone content"]),
  F("B08XKJG9GM", "Seagate One Touch SSD 1TB", "One Touch SSD", { kind: "SSD", capacity: 1, read: 1030, port: "USB-C", rugged: "Not stated", security: "None stated" }, ["a lightweight textile design", "a three-year warranty with Rescue data recovery", "a six-month Mylio Photos+ subscription"]),
  F("B0B2CYCNMG", "YOTUO 1TB Portable External Hard Drive", "YOTUO 1TB", { kind: "HDD", capacity: 1, port: "USB 3.0 and USB-C", rugged: "Silicone sleeve", security: "None stated" }, ["both USB 3.0 and USB-C connections", "a silicone sleeve", "a 0.16kg weight"]),
  F("B0874XN4D8", "Samsung T7 Portable SSD 1TB", "T7 1TB", { kind: "SSD", capacity: 1, read: 1050, port: "USB 3.2 Gen 2 (USB-C)", rugged: "Drops up to 6ft", security: "None stated" }, ["an aluminum unibody", "direct 4K60 video recording from supported cameras and phones", "drop protection up to 6ft"]),
  F("B0874XWW23", "Samsung T7 Portable SSD 2TB", "T7 2TB", { kind: "SSD", capacity: 2, read: 1050, port: "USB 3.2 Gen 2 (USB-C)", rugged: "Drops up to 6ft", security: "None stated" }, ["an aluminum unibody", "PCIe NVMe inside", "drop protection up to 6ft"]),
  F("B09VLK9W3S", "Samsung T7 Shield Portable SSD 1TB", "T7 Shield", { kind: "SSD", capacity: 1, read: 1050, port: "USB 3.2 Gen 2 (USB-C)", rugged: "IP65, drops up to 9.8ft", security: "None stated" }, ["an IP65 water and dust rating", "drop protection up to 9.8ft", "compatibility with PC, Mac, Android and consoles"]),
  F("B0CHFSWM2P", "Samsung T9 Portable SSD 1TB", "T9", { kind: "SSD", capacity: 1, read: 2000, port: "USB 3.2 Gen 2x2 (USB-C)", rugged: "Not stated", security: "Encryption via Magician software" }, ["sustained read and write up to 2,000MB/s", "a Dynamic Thermal Guard heat solution", "Magician software for firmware and health checks"]),
  F("B0GMWYYRQL", "SanDisk Extreme Portable SSD 1TB (2000MB/s)", "SanDisk Extreme 2000", { kind: "SSD", capacity: 1, read: 2000, port: "USB-C", rugged: "IP65, drops up to 3m", security: "None stated" }, ["an IP65 rating", "drop protection up to 3m", "a pocket-sized body"]),
  F("B08HN37XC1", "SanDisk Extreme Portable SSD 2TB (1050MB/s)", "SanDisk Extreme 2TB", { kind: "SSD", capacity: 2, read: 1050, port: "USB 3.2 Gen 2 (USB-C)", rugged: "IP65, drops up to 3m", security: "None stated" }, ["an IP65 water and dust rating", "drop protection up to 3m", "NVMe performance in a small body"]),
  F("B0H4H1SNMY", "SanDisk Portable SSD 1TB", "SanDisk Portable", { kind: "SSD", capacity: 1, read: 1000, port: "USB-C", rugged: "Drops up to 2m", security: "None stated" }, ["drop protection up to 2m", "driver-free USB-C setup", "a slim pocket body"]),
  F("B0CGW1FQV4", "Crucial X9 Portable SSD 1TB", "X9 1TB", { kind: "SSD", capacity: 1, read: 1050, port: "USB-C (USB 3.2)", rugged: "IP55, drops up to 7.5ft", security: "None stated" }, ["an IP55 rating", "drop resistance up to 7.5ft", "a design aimed at casual gamers and everyday use"]),
  F("B0CGW18S6Y", "Crucial X9 Portable SSD 2TB", "X9 2TB", { kind: "SSD", capacity: 2, read: 1050, port: "USB-C (USB 3.2)", rugged: "IP55, drops up to 7.5ft", security: "None stated" }, ["an IP55 rating", "drop resistance up to 7.5ft", "2TB for a larger game library"]),
  F("B0C9WGGZT9", "Crucial X10 Pro Portable SSD 1TB", "X10 Pro", { kind: "SSD", capacity: 1, read: 2100, port: "USB 3.2 Gen 2x2 (USB-C)", rugged: "IP55, drops up to 7.5ft", security: "None stated" }, ["2,000MB/s rated writes", "a lanyard loop and activity light", "Acronis True Image and Mylio Photos+ trials"]),
  F("B0F332MNX7", "Crucial X10 Portable SSD 2TB", "X10 2TB", { kind: "SSD", capacity: 2, read: 2100, port: "USB 3.2 Gen 2x2 (USB-C)", rugged: "IP65, drops up to 9.8ft", security: "None stated" }, ["an IP65 rating", "drop resistance up to 9.8ft", "PS4, PS5 and Xbox compatibility in the listing"]),
  F("B0932J2L8N", "Buffalo External SSD 1TB", "Buffalo SSD", { kind: "SSD", capacity: 1, port: "USB-C and USB-A (USB 3.2)", rugged: "Shock resistant", security: "None stated" }, ["PS4 and PS5 compatibility in the listing", "a three-year warranty when registered", "USB-C and USB-A support"]),
  F("B0DYDHLN81", "Lexar ES3 Portable SSD 1TB", "Lexar ES3", { kind: "SSD", capacity: 1, read: 1050, port: "USB 3.2 Gen 2 (USB-C)", rugged: "Not stated", security: "256-bit AES software encryption" }, ["a 42g weight", "a 10.5mm-thin body", "DataShield encryption software"]),
  F("B08F1VVBL9", "WD My Passport SSD 2TB", "My Passport SSD", { kind: "SSD", capacity: 2, read: 1050, port: "USB 3.2 Gen 2 (USB-C, USB-A adapter)", rugged: "Drops up to 6.5ft", security: "Password, 256-bit AES hardware encryption" }, ["hardware encryption with a password", "drop resistance up to 6.5ft", "a USB-A adapter for older systems"]),
  F("B0FL23M1S1", "GARMESE 1TB External SSD", "GARMESE", { kind: "SSD", capacity: 1, read: 2000, port: "USB 3.2 Gen 2x2 (USB-C, USB-A adapter)", rugged: "Shock resistant", security: "None stated" }, ["a 33g body with a keychain hole", "1,800MB/s rated writes", "an included USB-A adapter"]),
  F("B0BGKXX9TK", "SSK Portable SSD 500GB", "SSK 500GB", { kind: "SSD", capacity: 0.5, read: 1050, port: "USB 3.2 Gen 2 (USB-C and USB-A cables)", rugged: "Not stated", security: "None stated" }, ["both USB-C and USB-A cables", "an activity LED", "an SLC cache for steady transfers"]),
]);
