import { storage13eSchema } from "@/data/categories/storage13e";
import { storage15dFacts } from "@/data/categories/storage15d";
import type { Entry } from "./batch12-lib";
import { factory } from "./batch13c-lib";

/** Batch 15d: guru sitemap 45 keywords. Rank order is editorial. */

const st = factory(storage13eSchema, storage15dFacts, "peripherals", {
  B0C9WGS6MC: "Crucial's X10 Pro offers 2,100MB/s reads and 2,000MB/s writes, so large exports copy back nearly as fast as they read. It adds IP55 water and dust resistance, a 7.5ft drop rating and password protection built into the drive.",
  B0CHFS9K14: "Samsung's T9 lists sustained read and write speeds up to 2,000MB/s, and Samsung's Dynamic Thermal Guard is meant to hold that pace through long copies. Magician software handles firmware updates, health monitoring and optional encryption.",
  B09VLHR4JC: "Samsung's T7 Shield runs at 10Gbps USB speeds, rated to 1,050MB/s reads, a speed that many laptop USB-C ports support. Its IP65 rating and 9.8ft drop protection suit a drive that lives in a camera bag.",
  B0F38HLNLC: "LaCie's Rugged SSD4 uses a 40Gbps USB connection and offers 4,000MB/s reads and 3,800MB/s writes, the fastest figures here. It is the only 1TB drive in this guide, and it needs a USB4 or Thunderbolt port to reach those speeds.",
  B08XKNBDNJ: "Seagate's One Touch SSD wraps a 2TB drive rated to 1,030MB/s in a light textile cover. It was the lowest-priced drive here at the time of writing and carries a three-year warranty with Rescue data recovery.",
});

export const batch15d: Entry[] = [
  st({
    slug: "best-external-ssd", kw: "external ssd",
    seo: "Best External SSDs", title: "The Best External SSDs",
    meta: "Five external SSDs compared by USB interface, rated read speed, capacity and durability, from 10Gbps drives to a 40Gbps Thunderbolt-compatible model.",
    dek: "Five external SSDs compared by interface, rated read speed and durability, so you can match a drive to the ports your computer has.",
    teaser: "Check which USB speed your computer supports first; a 2,000MB/s or 4,000MB/s drive only reaches its rating on a matching port.",
    intro: [
      "An external SSD's rated speed depends on the port it plugs into. A 10Gbps USB port tops out around 1,050MB/s, a 20Gbps Gen 2x2 port around 2,000MB/s, and only USB4 or Thunderbolt reaches the 4,000MB/s class.",
      "We researched five portable SSDs across those three tiers using their Amazon listings and prices at the time of writing. We did not test them; speeds are manufacturer maximums.",
    ],
    bottom: [
      "The Crucial X10 Pro is the all-round pick, pairing 2,100MB/s reads with IP55 protection and password security. The Samsung T9 suits long transfers on a 20Gbps port, and the LaCie Rugged SSD4 is the choice for USB4 and Thunderbolt computers.",
      "On a 10Gbps laptop, the Samsung T7 Shield adds IP65 and 9.8ft drop protection, while the Seagate One Touch SSD gives 2TB at the lowest price here.",
    ],
    picks: [
      ["B0C9WGS6MC", "Best All-Round", "2,100MB/s reads, 2,000MB/s writes, IP55 and password protection", "Creators who move large files daily"],
      ["B0CHFS9K14", "Best for Long Transfers", "Sustained 2,000MB/s with Dynamic Thermal Guard", "Video projects on a 20Gbps port"],
      ["B0F38HLNLC", "Fastest Listed Speeds", "4,000MB/s reads over USB 40Gbps", "USB4 and Thunderbolt computers"],
      ["B09VLHR4JC", "Best Rugged 10Gbps", "IP65 with 9.8ft drop protection", "Travel and fieldwork"],
      ["B08XKNBDNJ", "Lowest Price Here", "2TB at the lowest price here", "Everyday laptop storage"],
    ],
    prio: ["port", "ssd-hdd", "capacity", "rugged", "encryption", "format"],
    related: ["best-portable-ssd-drive", "best-external-ssd-for-laptop", "best-portable-ssds-for-gaming"],
  }),
];
