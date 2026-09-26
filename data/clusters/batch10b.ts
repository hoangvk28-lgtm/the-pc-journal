import { mbIntelSchema, mbxFacts as F, mbxSchema as S } from "@/data/categories/platform-ext";
import type { CategorySchema } from "@/lib/pc-compose/generic";
import { L, mk, research, type Entry } from "./batch10-shared";

/** Batch 10b: motherboards for a specific CPU. Asin order = editorial rank. */
type Lbl = ReturnType<typeof L>;
type CpuSpec = {
  slug: string; cpu: string; short: string; seoTitle: string; schema: CategorySchema;
  dek: string; metaDescription: string; teaser: string; intro: string; bottom: string;
  asins: string[]; labels: Record<string, Lbl>; fit?: Record<string, string>; pri: string[]; related: string[];
};

const cpu = (c: CpuSpec): Entry =>
  mk(c.schema, F, {
    slug: c.slug, seoTitle: c.seoTitle, title: `The Best Motherboards for the ${c.cpu}`, breadcrumbLabel: `Best ${c.short} Motherboards`, mainKeyword: `best motherboard for ${c.short.toLowerCase()}`,
    dek: c.dek, metaDescription: c.metaDescription, teaser: c.teaser,
    asins: c.asins, labels: c.labels, fit: c.fit,
    intro: [c.intro, `We compared ${c.asins.length} boards for it. ${research}`],
    bottomLine: [c.bottom], priorityCriteria: c.pri, related: c.related,
  });

const amdRel = ["best-motherboards", "best-am5-motherboards", "best-ram-for-gaming"];
const intelRel = ["best-motherboards", "best-z790-motherboards", "best-ram-for-gaming"];

export const batch10b: Entry[] = [
  cpu({
    slug: "best-motherboards-for-ryzen-9-7950x", cpu: "Ryzen 9 7950X", short: "Ryzen 9 7950X", seoTitle: "Best Motherboards for Ryzen 9 7950X", schema: S,
    dek: "Six AM5 boards with strong power stages for a 16-core Ryzen 9 7950X, compared on VRM layout, M.2 slots and connectivity.",
    metaDescription: "Six AM5 motherboards for the 16-core Ryzen 9 7950X compared on power stage layout, M.2 slots, USB4 and networking, to keep all cores fed under sustained load.",
    teaser: "A 16-core chip rewards strong power stages; prioritise the VRM layout, then storage and ports.",
    intro: "The Ryzen 9 7950X has 16 cores and draws heavily under all-core work such as rendering. Boards with more and stronger power stages hold its clocks with less heat.",
    bottom: "The Strix X870E-E has the most headroom. The TUF X870E-PLUS and TUF X870-PLUS offer 80A stages for less, and the TUF B650E-PLUS is the budget route.",
    asins: ["B0DDZNZF76", "B0FDSD77GP", "B0DGB8Q19Y", "B0DPLQWLBD", "B0BDTHQTJV", "B0F7VZS6FG"],
    labels: {
      B0DDZNZF76: L("Most Headroom", "an 18+2+2 layout, five M.2 slots and USB4", "Heavy rendering and compile work."),
      B0FDSD77GP: L("Best Value X870E", "a 16+2+1 layout of 80A stages on X870E", "Most 7950X builds."),
      B0F7VZS6FG: L("Best Budget", "80A stages and BIOS Flashback on B650E", "Keeping the board budget down."),
    },
    pri: ["vrm", "chipset"], related: ["best-x870e-motherboards", "best-am5-motherboards", "best-motherboards"],
  }),
  cpu({
    slug: "best-motherboards-for-ryzen-9-7950x3d", cpu: "Ryzen 9 7950X3D", short: "Ryzen 9 7950X3D", seoTitle: "Best Motherboards for Ryzen 9 7950X3D", schema: S,
    dek: "Six AM5 boards for the 16-core Ryzen 9 7950X3D compared on power stages, M.2 slots, USB4 and networking for mixed gaming and creative work.",
    metaDescription: "Six AM5 motherboards for the Ryzen 9 7950X3D compared on power stages, M.2 slots, USB4 and networking, for a PC that games and renders on one 16-core chip.",
    teaser: "The 7950X3D mixes gaming and work; pick a board with enough M.2 slots and ports for both.",
    intro: "The Ryzen 9 7950X3D pairs 3D V-Cache for games with 16 cores for work. It needs the latest AMD chipset driver so games land on the cache cores; the board matters for storage and ports.",
    bottom: "The X870E Carbon and Strix X870E-E suit a flagship build. The X870 AORUS Elite adds a five-year warranty, and the B850 Tomahawk MAX keeps costs down.",
    asins: ["B0DG3QW9TJ", "B0DDZNZF76", "B0DGVC3DDW", "B0DPLP33YR", "B0BDV6RR2K", "B0DT58JK2W"],
    labels: {
      B0DG3QW9TJ: L("Best Flagship", "USB4, Wi-Fi 7 and PCIe 5.0 graphics and M.2 slots on X870E", "Creators who game."),
      B0DGVC3DDW: L("Longest Warranty", "a five-year warranty with four M.2 slots", "Long-term builds."),
      B0DT58JK2W: L("Best Value", "four M.2 slots, 5Gbps LAN and Wi-Fi 7 on B850", "Keeping the board budget down."),
    },
    pri: ["m2", "io"], related: ["best-x870e-motherboards", "best-ram-for-ryzen-7-9800x3d", "best-motherboards"],
  }),
  cpu({
    slug: "best-motherboards-for-ryzen-9-7900x3d", cpu: "Ryzen 9 7900X3D", short: "Ryzen 9 7900X3D", seoTitle: "Best Motherboards for Ryzen 9 7900X3D", schema: S,
    dek: "Six AM5 boards for the 12-core Ryzen 9 7900X3D compared on power stages, M.2 slots, networking and price.",
    metaDescription: "Six AM5 motherboards for the 12-core Ryzen 9 7900X3D compared on power stages, M.2 slots, Wi-Fi and wired LAN, to balance board cost against a cache-heavy CPU.",
    teaser: "The 7900X3D runs cooler than a 7950X; a mid-range board with good networking covers it.",
    intro: "The Ryzen 9 7900X3D has 12 cores, six of them with 3D V-Cache. It draws less power than the 7950X, so a mid-range X870 or B850 board covers it.",
    bottom: "The X870E Tomahawk MAX PZ is the most connected board here. The TUF B850-PLUS and X870 Tomahawk suit most builds, and the X670E Gaming Plus saves money.",
    asins: ["B0FVQ3NN4C", "B0DPLPLR88", "B0DG3HK897", "B0DRTTJ5D6", "B0CRF81BBC", "B0BH7GTY9C"],
    labels: {
      B0FVQ3NN4C: L("Most Connected", "four M.2 slots, 5Gbps LAN, Wi-Fi 7 and USB4 with display output", "Builds with many devices."),
      B0DPLPLR88: L("Best Value", "a 14+2+1 layout of 80A stages and Wi-Fi 7 on B850", "Most 7900X3D builds."),
      B0CRF81BBC: L("Lowest-Cost X670E", "the X670E chipset with a 14+2+1 layout at a low price", "Builders who want PCIe 5.0 lanes for less."),
    },
    pri: ["chipset", "network"], related: amdRel,
  }),
  cpu({
    slug: "best-motherboards-for-ryzen-7-7800x3d", cpu: "Ryzen 7 7800X3D", short: "Ryzen 7 7800X3D", seoTitle: "Best Motherboards for Ryzen 7 7800X3D", schema: S,
    dek: "Six AM5 boards for the Ryzen 7 7800X3D gaming chip compared on M.2 slots, networking, size and price.",
    metaDescription: "Six AM5 motherboards for the Ryzen 7 7800X3D compared on M.2 slots, Wi-Fi, wired LAN, size and price, to spend on the graphics card rather than the board.",
    teaser: "The 7800X3D is an efficient eight-core; a B850 or B650 board is plenty, so spend the savings on the GPU.",
    intro: "The Ryzen 7 7800X3D is an eight-core gaming chip that draws modest power. It gains nothing from a flagship board, so choose by ports, storage and case size.",
    bottom: "The B850 Tomahawk MAX suits most 7800X3D builds. The Strix B850-I fits a small case, and the B650 Tomahawk saves money with little lost.",
    asins: ["B0DT58JK2W", "B0DPLP33YR", "B0DG3HK897", "B0BHCCNSRH", "B0DHCQ1MPZ", "B0DQBT2DZ8"],
    labels: {
      B0DT58JK2W: L("Best All-Round", "four M.2 slots, 5Gbps LAN and Wi-Fi 7 on B850", "Most 7800X3D builds."),
      B0DHCQ1MPZ: L("Best Mini-ITX", "Wi-Fi 7 and a 10+2+1 layout on Mini-ITX", "Small-form-factor gaming PCs."),
      B0BHCCNSRH: L("Best Budget", "Wi-Fi 6E and 2.5Gbps LAN on B650", "Spending more on the GPU."),
    },
    pri: ["chipset", "network"], related: ["best-motherboards-for-ryzen-7-9800x3d", "best-ram-for-ryzen-7-9800x3d", "best-mini-itx-motherboards"],
  }),
  cpu({
    slug: "best-motherboards-for-ryzen-7-7700x", cpu: "Ryzen 7 7700X", short: "Ryzen 7 7700X", seoTitle: "Best Motherboards for Ryzen 7 7700X", schema: S,
    dek: "Six AM5 boards for the eight-core Ryzen 7 7700X compared on power stages, M.2 slots, networking and size.",
    metaDescription: "Six AM5 motherboards for the eight-core Ryzen 7 7700X compared on power stages, M.2 slots, Wi-Fi and size, to choose a mid-range board that fits your case.",
    teaser: "The 7700X runs well on a mid-range board; compare M.2 slots and networking over power stages.",
    intro: "The Ryzen 7 7700X is an eight-core chip for gaming and everyday work. Mid-range B850 and B650 boards power it comfortably.",
    bottom: "The B850 Gaming Plus is the value pick with 5Gbps LAN. The TUF B850-PLUS adds stronger power stages, and the B850M Steel Legend fits Micro-ATX cases.",
    asins: ["B0DQBT2DZ8", "B0DPLPLR88", "B0BH7GTY9C", "B0DGB9VXRY", "B0DRTW2FR3", "B0CXPXBF2M"],
    labels: {
      B0DQBT2DZ8: L("Best Value", "5Gbps LAN, Wi-Fi 7 and a PCIe 5.0 M.2 slot at an entry B850 price", "Most 7700X builds."),
      B0DGB9VXRY: L("Best for USB4", "USB4 at a low X870 price", "USB4 drives and docks."),
      B0DRTW2FR3: L("Best Micro-ATX", "Wi-Fi 7 and three M.2 slots on Micro-ATX", "Compact builds."),
    },
    pri: ["chipset", "m2"], related: amdRel,
  }),
  cpu({
    slug: "best-motherboards-for-ryzen-5-7600x", cpu: "Ryzen 5 7600X", short: "Ryzen 5 7600X", seoTitle: "Best Motherboards for Ryzen 5 7600X", schema: S,
    dek: "Six budget-to-mid AM5 boards for the six-core Ryzen 5 7600X compared on M.2 slots, networking and price.",
    metaDescription: "Six AM5 motherboards for the six-core Ryzen 5 7600X compared on M.2 slots, Wi-Fi, wired LAN and price, to keep a mid-range gaming build on budget.",
    teaser: "A six-core 7600X needs no premium board; save on the board and keep a PCIe 5.0 M.2 slot if you can.",
    intro: "The Ryzen 5 7600X is a six-core chip that runs well on budget boards. The board budget is better spent on a graphics card.",
    bottom: "The PRO B850-P keeps Wi-Fi 7 and 5Gbps LAN cheaply. The B650 AORUS Elite AX is the stronger B650 board, and the B850 Pro-A suits wired desks.",
    asins: ["B0DQB38PL5", "B0BH7GTY9C", "B0CB6XZ7RH", "B0DS6M1ZRN", "B0DRTWM32Q", "B0FDLC6X93"],
    labels: {
      B0DQB38PL5: L("Best Value", "Wi-Fi 7 and 5Gbps LAN on an entry B850 board", "Most 7600X builds."),
      B0FDLC6X93: L("Best White", "a white finish with Wi-Fi 7 and three M.2 slots", "White builds."),
      B0DS6M1ZRN: L("Best for Wired Desks", "a 14+2+1 layout and 2.5Gbps LAN without Wi-Fi", "Desks with a network cable."),
    },
    pri: ["bios", "network"], related: amdRel,
  }),
  cpu({
    slug: "best-motherboards-for-ryzen-5-7600", cpu: "Ryzen 5 7600", short: "Ryzen 5 7600", seoTitle: "Best Motherboards for Ryzen 5 7600", schema: S,
    dek: "Six low-cost AM5 boards for the 65W Ryzen 5 7600 compared on M.2 slots, networking, size and warranty.",
    metaDescription: "Six low-cost AM5 motherboards for the 65W Ryzen 5 7600 compared on M.2 slots, Wi-Fi, wired LAN, size and warranty, for a budget gaming build on AM5.",
    teaser: "The 65W 7600 runs on the cheapest AM5 boards; choose by Wi-Fi, M.2 slots and case size.",
    intro: "The Ryzen 5 7600 is a 65W six-core chip, the easiest AM5 processor to power. Even entry-level boards handle it.",
    bottom: "The B650M PG Lightning is the lowest-cost route. The B650 Gaming Plus WiFi adds ATX size, and the B850M Gaming X adds a five-year warranty.",
    asins: ["B0CJT9KKSD", "B0CB6XZ7RH", "B0DQB38PL5", "B0FBTKLKGJ", "B0DQLHLVLK", "B0BHCCNSRH"],
    labels: {
      B0CJT9KKSD: L("Lowest Price", "the lowest price here with Wi-Fi 6E and BIOS Flashback", "The tightest budgets."),
      B0DQLHLVLK: L("Longest Warranty", "a five-year warranty on Micro-ATX", "Long-term compact builds."),
      B0DQB38PL5: L("Best Networking", "Wi-Fi 7 and 5Gbps LAN at a budget price", "Fast home networks."),
    },
    pri: ["bios", "m2"], related: ["best-budget-am5-motherboards", "best-motherboards", "best-ram-for-gaming"],
  }),
  cpu({
    slug: "best-motherboards-for-intel-core-i5-13400f", cpu: "Intel Core i5-13400F", short: "Core i5-13400F", seoTitle: "Best Motherboards for Core i5-13400F", schema: mbIntelSchema,
    dek: "Six B760 boards for the locked Core i5-13400F compared on DDR4 or DDR5 support, M.2 slots, Wi-Fi and size.",
    metaDescription: "Six B760 motherboards for the locked Core i5-13400F compared on DDR4 or DDR5 support, M.2 slots, Wi-Fi and size, to build a budget gaming PC for less.",
    teaser: "A locked 13400F cannot overclock, so a B760 board is all it needs; pick DDR4 or DDR5 first.",
    intro: "The Core i5-13400F is a locked chip with no integrated graphics, so a Z790 board adds nothing. B760 boards run it at full speed.",
    bottom: "The B760 Gaming Plus WiFi is the budget DDR5 pick, the B760 AORUS Elite AX the stronger one. The B760M-AYW WiFi D4 II suits DDR4 reuse.",
    asins: ["B0FBTJZJ9F", "B0BSB6MZ2L", "B0FP3MRTC1", "B0CK582LX5", "B0BZTB5LKJ", "B0CX1GPFW4"],
    labels: {
      B0FBTJZJ9F: L("Best Value DDR5", "DDR5, Wi-Fi 6E and 2.5Gbps LAN at a low price", "Most 13400F builds."),
      B0BSB6MZ2L: L("Best Features", "a 12+1+1 layout, three M.2 slots and Q-Flash Plus", "Builders who want more storage."),
      B0FP3MRTC1: L("Best for DDR4", "DDR4, Wi-Fi 6 and 2.5Gbps LAN on Micro-ATX", "Reusing DDR4 memory."),
    },
    pri: ["intel-memory", "intel-chipset"], related: ["best-budget-intel-motherboards", "best-b760-motherboards", "best-ddr4-ram"],
  }),
  cpu({
    slug: "best-motherboards-for-intel-core-i5-13600k", cpu: "Intel Core i5-13600K", short: "Core i5-13600K", seoTitle: "Best Motherboards for Core i5-13600K", schema: mbIntelSchema,
    dek: "Six LGA1700 boards for the unlocked Core i5-13600K compared on chipset, power stages, M.2 slots and memory type.",
    metaDescription: "Six LGA1700 motherboards for the unlocked Core i5-13600K compared on chipset, power stages, M.2 slots and DDR4 or DDR5, to decide whether Z790 is worth it.",
    teaser: "Z790 unlocks overclocking on the 13600K; a B760 board runs it at stock for less.",
    intro: "The Core i5-13600K is unlocked, so a Z790 board lets you tune it. At stock settings a good B760 board runs it too.",
    bottom: "The Z790 Pro RS WiFi is the value Z790 pick, the Z790 Tomahawk MAX the more complete one. The PRO B760-P DDR4 suits builders reusing memory.",
    asins: ["B0BM38QB9W", "B0CTNPZLNH", "B0CJSL89T2", "B0G3TWBHYC", "B0BSB6MZ2L", "B0BRQSWSFQ"],
    labels: {
      B0BM38QB9W: L("Best Value Z790", "four M.2 slots and a 14+1+1 layout at a low Z790 price", "Most 13600K builds."),
      B0CJSL89T2: L("Most Complete", "five M.2 slots, Wi-Fi 7 and a 16+1+1 layout", "Builders who want every feature."),
      B0BRQSWSFQ: L("Best for DDR4", "DDR4 support with Wi-Fi 6E and 2.5Gbps LAN", "Reusing DDR4 memory."),
    },
    pri: ["intel-chipset", "intel-memory"], related: intelRel,
  }),
  cpu({
    slug: "best-motherboards-for-intel-core-i5-14600k", cpu: "Intel Core i5-14600K", short: "Core i5-14600K", seoTitle: "Best Motherboards for Core i5-14600K", schema: mbIntelSchema,
    dek: "Six LGA1700 boards for the Core i5-14600K compared on chipset, power stages, M.2 slots and BIOS readiness.",
    metaDescription: "Six LGA1700 motherboards for the unlocked Core i5-14600K compared on chipset, power stages, M.2 slots and BIOS support, to run a 14th Gen chip safely.",
    teaser: "Update the BIOS for 14th Gen first; then Z790 for tuning or B760 for stock settings.",
    intro: "The Core i5-14600K uses LGA1700 and needs a BIOS that supports 14th Gen. Z790 boards let you tune it; B760 boards run it at stock.",
    bottom: "The Z790 Tomahawk MAX is the most complete board here. The Z790 Pro RS saves money, and the Z790-AYW WiFi W II suits white builds.",
    asins: ["B0CJSL89T2", "B0BM38QB9W", "B0G3TWBHYC", "B0FBB9TQ5L", "B0BSB6MZ2L", "B0CTNPZLNH"],
    labels: {
      B0CJSL89T2: L("Best All-Round", "five M.2 slots, Wi-Fi 7 and a 16+1+1 layout", "Most 14600K builds."),
      B0BM38QB9W: L("Best Value", "four M.2 slots and a 14+1+1 layout at a low Z790 price", "Keeping costs down."),
      B0FBB9TQ5L: L("Best White", "a white finish with three M.2 slots", "White builds."),
    },
    pri: ["intel-bios", "intel-chipset"], related: intelRel,
  }),
  cpu({
    slug: "best-motherboards-for-intel-core-i7-13700k", cpu: "Intel Core i7-13700K", short: "Core i7-13700K", seoTitle: "Best Motherboards for Core i7-13700K", schema: mbIntelSchema,
    dek: "Six LGA1700 boards for the 16-core Core i7-13700K compared on power stages, M.2 slots and networking.",
    metaDescription: "Six LGA1700 motherboards for the 16-core Core i7-13700K compared on power stages, M.2 slots, Wi-Fi and wired LAN, to hold boost clocks under heavy loads.",
    teaser: "A Core i7 draws far more than an i5 under load; favour boards with a strong listed power layout.",
    intro: "The Core i7-13700K has 16 cores and draws heavily under all-core work. Boards with stronger power stages hold its clocks with less heat.",
    bottom: "The PRO Z790-A WiFi II and Z790 Tomahawk MAX suit most builds. The Strix Z790-E adds headroom, and the TUF B760-PLUS runs the chip at stock for less.",
    asins: ["B0G3TWBHYC", "B0CJSL89T2", "B0BG6KQPWD", "B0DD5RJLZ8", "B0BJYYFP3X", "B0BVKYWPFT"],
    labels: {
      B0G3TWBHYC: L("Best Value", "80A power stages and four Gen4 M.2 slots", "Most 13700K builds."),
      B0BG6KQPWD: L("Most Headroom", "an 18+1 layout and Thunderbolt 4 support", "Sustained all-core work."),
      B0DD5RJLZ8: L("Best for Wi-Fi 7", "Wi-Fi 7 with a 14+1 layout", "Wireless desks."),
    },
    pri: ["intel-power", "intel-chipset"], related: intelRel,
  }),
  cpu({
    slug: "best-motherboards-for-intel-core-i7-14700k", cpu: "Intel Core i7-14700K", short: "Core i7-14700K", seoTitle: "Best Motherboards for Core i7-14700K", schema: mbIntelSchema,
    dek: "Six Z790 boards for the 20-core Core i7-14700K compared on power stages, M.2 slots, BIOS support and networking.",
    metaDescription: "Six Z790 motherboards for the 20-core Core i7-14700K compared on power stages, M.2 slots, BIOS support and Wi-Fi, to pair a 14th Gen chip with the right board.",
    teaser: "The 14700K has 20 cores; pick a Z790 board with a strong power layout and update the BIOS first.",
    intro: "The Core i7-14700K has 20 cores, four more than the 13700K, and draws heavily under load. Update the BIOS for 14th Gen and favour stronger power stages.",
    bottom: "The Z790 Tomahawk MAX suits most 14700K builds. The Strix Z790-E adds headroom, and the Z790 Pro RS keeps costs down.",
    asins: ["B0CJSL89T2", "B0BG6KQPWD", "B0G3TWBHYC", "B0F8PR49WV", "B0BM38QB9W", "B0CTNPZLNH"],
    labels: {
      B0CJSL89T2: L("Best All-Round", "five M.2 slots, Wi-Fi 7 and a 16+1+1 layout", "Most 14700K builds."),
      B0BG6KQPWD: L("Most Headroom", "an 18+1 layout", "Sustained all-core work."),
      B0BM38QB9W: L("Best Value", "a 14+1+1 layout and four M.2 slots at a low Z790 price", "Keeping costs down."),
    },
    pri: ["intel-power", "intel-bios"], related: intelRel,
  }),
  cpu({
    slug: "best-motherboards-for-intel-core-i9-13900k", cpu: "Intel Core i9-13900K", short: "Core i9-13900K", seoTitle: "Best Motherboards for Core i9-13900K", schema: mbIntelSchema,
    dek: "Six Z790 boards for the 24-core Core i9-13900K compared on power stages, M.2 slots and connectivity.",
    metaDescription: "Six Z790 motherboards for the 24-core Core i9-13900K compared on power stages, M.2 slots and connectivity, with BIOS microcode checks before daily use.",
    teaser: "A Core i9 needs strong power stages and the latest BIOS microcode; start there.",
    intro: "The Core i9-13900K has 24 cores and the highest power draw in the 13th Gen range. Strong power stages and the latest BIOS microcode matter more than extras.",
    bottom: "The Strix Z790-E has the strongest listed power layout here. The Z790 Tomahawk MAX and PRO Z790-A WiFi II cost less, and the Gaming WIFI7 suits wireless desks.",
    asins: ["B0BG6KQPWD", "B0CJSL89T2", "B0G3TWBHYC", "B0DD5RJLZ8", "B0BJYYFP3X", "B0F8PR49WV"],
    labels: {
      B0BG6KQPWD: L("Strongest Power", "an 18+1 layout, five M.2 slots and Thunderbolt 4 support", "Sustained all-core work."),
      B0CJSL89T2: L("Best Value", "a 16+1+1 layout, five M.2 slots and Wi-Fi 7", "Most 13900K builds."),
      B0G3TWBHYC: L("Best 80A Board", "80A power stages at a mid-range price", "Balancing power and price."),
    },
    pri: ["intel-power", "intel-bios"], related: intelRel,
  }),
  cpu({
    slug: "best-motherboards-for-intel-core-i9-14900k", cpu: "Intel Core i9-14900K", short: "Core i9-14900K", seoTitle: "Best Motherboards for Core i9-14900K", schema: mbIntelSchema,
    dek: "Six Z790 boards for the Core i9-14900K compared on power stages, M.2 slots, BIOS support and networking.",
    metaDescription: "Six Z790 motherboards for the Intel Core i9-14900K compared on power stages, M.2 slots, BIOS support and networking, to run a 24-core chip safely.",
    teaser: "The 14900K is the hungriest LGA1700 chip; pick strong power stages and apply Intel's latest BIOS.",
    intro: "The Core i9-14900K has 24 cores and the highest boost clocks on LGA1700. Apply the latest BIOS with Intel's default power limits, and favour stronger power stages.",
    bottom: "The Strix Z790-E has the most headroom. The Z790 Tomahawk MAX suits most builds, and the Z790 MAX Gaming WIFI7 fits wireless desks.",
    asins: ["B0BG6KQPWD", "B0CJSL89T2", "B0F8PR49WV", "B0G3TWBHYC", "B0BM38QB9W", "B0FBB9TQ5L"],
    labels: {
      B0BG6KQPWD: L("Most Headroom", "an 18+1 layout and five M.2 slots", "Sustained all-core work."),
      B0CJSL89T2: L("Best All-Round", "a 16+1+1 layout, five M.2 slots and Wi-Fi 7", "Most 14900K builds."),
      B0F8PR49WV: L("Best Wireless", "Wi-Fi 7 and a USB 20Gbps port", "Wireless desks."),
    },
    pri: ["intel-bios", "intel-power"], related: intelRel,
  }),
];
