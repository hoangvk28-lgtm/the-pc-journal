import { cpuFacts, cpuSchema } from "@/data/categories/cpu";
import { psuGenericFacts, psuGenericSchema } from "@/data/categories/psu-generic";
import { L, maker, type Entry } from "./batch12-lib";

/**
 * Batch 12a: separate articles for GPU variants that batch 11 covered together (RTX 4080 Super,
 * RTX 4070 Ti Super, RTX 4070 Super, RTX 4060 Ti, RX 7600 XT). Each uses a different product mix
 * and emphasis from its sibling. Asin order = editorial rank.
 */
const cpu = maker(cpuSchema, cpuFacts, "components");
const psu = maker(psuGenericSchema, psuGenericFacts, "components", {
  B0DLFM4YNM: "Seasonic's Focus GX-750 offers a native 12V-2x6 cable, a Cybenetics Platinum rating and a 135mm fan that stops at low load. It was one of the pricier 750W units here at the time of writing.",
});

const CPU_WE = "We compared six processors on L3 cache, core count, rated power and platform, using AMD and Intel specifications. We did not benchmark them.";
const PSU_WE = "We compared wattage, connectors and ratings from the power supply listings against NVIDIA's guidance; we did not load-test these units.";

export const batch12: Entry[] = [
  cpu({
    slug: "best-cpus-for-rtx-4080-super", seoTitle: "Best CPUs for the RTX 4080 Super", title: "The Best CPUs for the RTX 4080 Super", breadcrumbLabel: "Best CPUs for RTX 4080 Super", mainKeyword: "best cpu for rtx 4080 super",
    dek: "Six processors for an RTX 4080 Super, weighted toward high-refresh 1440p, where the CPU sets the frame-rate ceiling more often than at 4K.",
    metaDescription: "Six CPUs to pair with an RTX 4080 Super, compared on L3 cache, boost clock and platform, with a focus on high-refresh 1440p where the processor matters most.",
    teaser: "At 1440p and 240Hz an RTX 4080 Super often waits on the CPU; the X3D chips close that gap.",
    asins: ["B0G8JMLXNQ", "B0DKFMSMYK", "B0BTZB7F88", "B0DWGWN8GY", "B0H2Z7VF4G", "B0CVZGD5M6"],
    labels: {
      B0G8JMLXNQ: L("Best for 1440p at 240Hz", "96MB of L3 with a 5.6GHz boost, the highest boost among the eight-core X3D chips here", "High-refresh 1440p monitors."),
      B0DKFMSMYK: L("Best Balance", "eight Zen 5 cores with 96MB of L3", "Most RTX 4080 Super builds."),
      B0BTZB7F88: L("Best Value X3D", "96MB of L3 on the Zen 4 platform", "Putting more of the budget into the card."),
      B0DWGWN8GY: L("Best for Streaming", "twelve cores with 128MB of L3", "Gaming and encoding on one PC."),
      B0H2Z7VF4G: L("Best Intel LGA1851 Pick", "twenty cores without integrated graphics", "New Intel builds."),
      B0CVZGD5M6: L("Best LGA1700 Upgrade", "twenty cores that drop into Z690 and Z790 boards", "Upgrading an existing Intel PC."),
    },
    intro: ["The RTX 4080 Super is quick enough at 1440p that a mid-range processor can hold it back in fast shooters and simulation games. Large L3 caches and high boost clocks help most there.", CPU_WE],
    bottomLine: ["The Ryzen 7 9850X3D gives an RTX 4080 Super the most headroom at high refresh rates, and the 9800X3D is the balanced choice. The 7800X3D saves money, the 9900X3D suits streamers, and the Core Ultra 7 265KF or i7-14700KF cover Intel builds."],
    priorityCriteria: ["cache", "gpu-first", "platform"], related: ["best-cpus-for-rtx-4080", "best-rtx-4080-super-graphics-cards", "best-cpus-for-1440p-gaming"],
  }),
  cpu({
    slug: "best-cpus-for-rtx-4070-ti-super", seoTitle: "Best CPUs for the RTX 4070 Ti Super", title: "The Best CPUs for the RTX 4070 Ti Super", breadcrumbLabel: "Best CPUs for RTX 4070 Ti Super", mainKeyword: "best cpu for rtx 4070 ti super",
    dek: "Six processors for an RTX 4070 Ti Super, chosen to balance CPU cost against a 16GB card aimed at 1440p and entry 4K.",
    metaDescription: "Six CPUs to pair with an RTX 4070 Ti Super, compared on cache, cores, rated power and platform cost, so a 1440p or entry 4K build stays balanced on budget.",
    teaser: "An RTX 4070 Ti Super rarely needs a flagship CPU; a fast eight-core chip keeps it busy.",
    asins: ["B0DKFMSMYK", "B0BTZB7F88", "B0D6NMDNNX", "B0BBHHT8LY", "B0CGJ4MLC8", "B0DFK8HHK4"],
    labels: {
      B0DKFMSMYK: L("Most Headroom", "eight Zen 5 cores with 96MB of L3", "High-refresh 1440p."),
      B0BTZB7F88: L("Best Match for a 4070 Ti Super", "96MB of L3 on eight cores below the 9800X3D's price", "Most RTX 4070 Ti Super builds."),
      B0D6NMDNNX: L("Best Low-Power Eight-Core", "eight Zen 5 cores at a 65W rating", "Quiet or compact builds."),
      B0BBHHT8LY: L("Best Budget Eight-Core AM5", "eight Zen 4 cores with a 5.4GHz boost", "Saving for the card."),
      B0CGJ4MLC8: L("Best LGA1700 Value", "fourteen cores with DDR4 or DDR5 support", "Intel builds reusing memory."),
      B0DFK8HHK4: L("Best LGA1851 Entry", "fourteen cores on Intel's current socket", "New Intel builds on a budget."),
    },
    intro: ["The RTX 4070 Ti Super carries 16GB of memory and sits between 1440p and 4K. At 4K the card does most of the work, so the CPU budget can shrink; at high-refresh 1440p cache matters again.", CPU_WE],
    bottomLine: ["The Ryzen 7 7800X3D is the best-matched CPU for an RTX 4070 Ti Super, and the 9800X3D adds headroom. The 9700X and 7700X cost less, and the i5-14600KF or Core Ultra 5 245KF cover Intel builds."],
    priorityCriteria: ["gpu-first", "platform", "cache"], related: ["best-cpus-for-rtx-4070-ti", "best-rtx-4070-ti-super-graphics-cards", "best-cpus-for-4k-gaming"],
  }),
  cpu({
    slug: "best-cpus-for-rx-7600-xt", seoTitle: "Best CPUs for the RX 7600 XT", title: "The Best CPUs for the RX 7600 XT", breadcrumbLabel: "Best CPUs for RX 7600 XT", mainKeyword: "best cpu for rx 7600 xt",
    dek: "Six budget and mid-range processors for an RX 7600 XT, whose 16GB of memory suits a build meant to last a few years.",
    metaDescription: "Six CPUs to pair with an RX 7600 XT, compared on cores, cache, bundled coolers and platform, for a 1080p build with 16GB of video memory and room to upgrade.",
    teaser: "The RX 7600 XT's 16GB of memory suits a longer-lived build; pick a platform with an upgrade path.",
    asins: ["B0BMQJWBDM", "B0D6NN6TM7", "B0CQ1Y7KHV", "B09VCHR1VH", "B09VCHQHZ6", "B0B2X1KDNS"],
    labels: {
      B0BMQJWBDM: L("Best Match for an RX 7600 XT", "six AM5 cores with a cooler in the box", "New builds with an upgrade path."),
      B0D6NN6TM7: L("Best Zen 5 Pick", "six Zen 5 cores at a 65W rating", "Builds that may take a faster card later."),
      B0CQ1Y7KHV: L("Best Intel Pick", "ten cores on LGA1700 with DDR4 or DDR5 support", "Intel builds on B760."),
      B09VCHR1VH: L("Best AM4 Value", "six cores with a Wraith Stealth cooler on AM4", "Upgrading an existing AM4 PC."),
      B09VCHQHZ6: L("Best Eight-Core AM4", "eight cores at a 65W rating on DDR4", "Streaming on a budget."),
      B0B2X1KDNS: L("Lowest-Cost Intel Pick", "six performance cores with DDR4 support", "The tightest Intel budgets."),
    },
    intro: ["The RX 7600 XT uses the same chip as the RX 7600 but doubles its memory to 16GB. That makes it a card people keep longer, so the platform under it matters as much as today's frame rates.", CPU_WE],
    bottomLine: ["The Ryzen 5 7600 is the best partner for an RX 7600 XT, with a cooler included and AM5's upgrade path. The 9600X adds Zen 5, the i5-14400F covers Intel, and the Ryzen 5 5600 or 5700X suit AM4 owners."],
    priorityCriteria: ["platform", "cooling", "gpu-first"], related: ["best-cpus-for-rx-7600", "best-rx-7600-graphics-cards", "best-budget-cpus"],
  }),
  psu({
    slug: "best-power-supplies-for-rtx-4080-super", seoTitle: "Best PSUs for the RTX 4080 Super", title: "The Best Power Supplies for the RTX 4080 Super", breadcrumbLabel: "Best PSUs for RTX 4080 Super", mainKeyword: "best psu for rtx 4080 super",
    dek: "Six 750W and 850W units with native 12V-2x6 cables for the RTX 4080 Super, weighted toward 850W for builds with a high-power CPU.",
    metaDescription: "Six 750W and 850W power supplies with native 12V-2x6 cables for the RTX 4080 Super, compared on efficiency, depth and warranty above NVIDIA's 750W guidance.",
    teaser: "NVIDIA recommends 750W for the RTX 4080 Super; 850W covers a hungry CPU as well.",
    asins: ["B0DVJNMCR1", "B0GCRW4ZK2", "B0DGB1HF7C", "B0GRV3GFZS", "B0FFQN6344", "B0FBX9VS3B"],
    labels: {
      B0DVJNMCR1: L("Most Efficient 850W", "Platinum ratings from both 80 Plus and Cybenetics", "Quiet, efficient builds."),
      B0GCRW4ZK2: L("Shortest 850W", "a 125mm depth, the shortest here", "Cases with a cramped PSU bay."),
      B0DGB1HF7C: L("Best White Pick", "a white 850W unit with a 10-year warranty", "White builds."),
      B0GRV3GFZS: L("Best Budget 850W", "850W with a native 12V-2x6 cable in a 140mm body", "Keeping cost down."),
      B0FFQN6344: L("Best for Power Spikes", "support for large GPU power spikes on an 850W Gold unit", "High-power CPU and GPU pairs."),
      B0FBX9VS3B: L("Best 750W Option", "750W with Cybenetics Platinum and four PCIe 8-pin connectors", "Builds with a 65W or 120W CPU."),
    },
    intro: ["NVIDIA recommends a 750W power supply for the RTX 4080 Super, which uses a single 16-pin connector. This guide leans toward 850W because many 4080 Super builds pair it with a high-power CPU.", PSU_WE],
    bottomLine: ["be quiet!'s Power Zone 2 850W is the efficient choice for an RTX 4080 Super. Super Flower's Leadex VIII suits shallow PSU bays, ASRock's SL-850GW suits white builds, and darkFlash's DG850 keeps cost down."],
    priorityCriteria: ["wattage", "efficiency", "fit"], related: ["best-power-supplies-for-rtx-4080", "best-850w-power-supplies", "best-rtx-4080-super-graphics-cards"],
  }),
  psu({
    slug: "best-power-supplies-for-rtx-4070-ti-super", seoTitle: "Best PSUs for the RTX 4070 Ti Super", title: "The Best Power Supplies for the RTX 4070 Ti Super", breadcrumbLabel: "Best PSUs for RTX 4070 Ti Super", mainKeyword: "best psu for rtx 4070 ti super",
    dek: "Six 750W and 850W units with native 12V-2x6 cables for the RTX 4070 Ti Super, compared on warranty, depth and price.",
    metaDescription: "Six 750W and 850W power supplies with native 12V-2x6 cables for the RTX 4070 Ti Super, above NVIDIA's 700W guidance and compared on warranty, depth and price.",
    teaser: "NVIDIA recommends 700W for the RTX 4070 Ti Super; a 750W unit with a native 16-pin cable fits.",
    asins: ["B0DG78SHF2", "B0FLG9Y4HZ", "B0H14KK47V", "B0DJ6DGHCP", "B0GRV3GFZS", "B0DGB1HF7C"],
    labels: {
      B0DG78SHF2: L("Best Match for a 4070 Ti Super", "750W with a 90-degree 12V-2x6 cable and a 10-year warranty", "Most RTX 4070 Ti Super builds."),
      B0FLG9Y4HZ: L("Best Corsair Pick", "a fully modular ATX 3.1 unit with Cybenetics Gold", "Corsair builds."),
      B0H14KK47V: L("Best Budget 750W", "750W in a 140mm body with a native 12V-2x6 cable", "Keeping cost down."),
      B0DJ6DGHCP: L("Best Quiet 850W", "850W with a Smart Zero Fan mode", "Quiet builds with headroom."),
      B0GRV3GFZS: L("Best Compact 850W", "850W in a 140mm body", "Short PSU bays."),
      B0DGB1HF7C: L("Best White Pick", "a white 850W unit with a 10-year warranty", "White builds."),
    },
    intro: ["NVIDIA recommends a 700W power supply for the RTX 4070 Ti Super, which uses a 16-pin 12V-2x6 connector. A 750W unit covers most builds, and 850W adds room for a high-power CPU.", PSU_WE],
    bottomLine: ["ASRock's PG-750G is the best-matched unit for an RTX 4070 Ti Super here. Corsair's RM750x is the fully modular alternative, darkFlash's DG750 is the budget pick, and the 850W units add headroom."],
    priorityCriteria: ["wattage", "connector", "warranty"], related: ["best-power-supplies-for-rtx-4070-ti", "best-750w-power-supplies", "best-rtx-4070-ti-super-graphics-cards"],
  }),
  psu({
    slug: "best-power-supplies-for-rtx-4070-super", seoTitle: "Best PSUs for the RTX 4070 Super", title: "The Best Power Supplies for the RTX 4070 Super", breadcrumbLabel: "Best PSUs for RTX 4070 Super", mainKeyword: "best psu for rtx 4070 super",
    dek: "Six 650W and 750W units with native 12V-2x6 cables for the RTX 4070 Super, which NVIDIA pairs with 650W.",
    metaDescription: "Six 650W and 750W power supplies with native 12V-2x6 cables for the RTX 4070 Super, matched to NVIDIA's 650W guidance and compared on warranty and price.",
    teaser: "NVIDIA recommends 650W for the RTX 4070 Super; most partner cards use a 16-pin plug.",
    asins: ["B0H6NLHFZ9", "B0CC3QBGDL", "B0DM2GN35Q", "B0FBX9VS3B", "B0H14KK47V", "B0DG78SHF2"],
    labels: {
      B0H6NLHFZ9: L("Best Match for an RTX 4070 Super", "650W with a native 12V-2x6 and a 10-year warranty", "Most RTX 4070 Super builds."),
      B0CC3QBGDL: L("Best Warranty at 750W", "a 10-year warranty on a fully modular 750W unit", "Long-term builds."),
      B0DM2GN35Q: L("Best White Pick", "a white fully modular 650W unit", "White builds."),
      B0FBX9VS3B: L("Most Efficient 750W", "Cybenetics Platinum with four PCIe 8-pin connectors", "Quiet builds."),
      B0H14KK47V: L("Best Compact 750W", "750W in a 140mm body", "Short PSU bays."),
      B0DG78SHF2: L("Best Cable Routing", "a 90-degree 12V-2x6 cable with a temperature sensor", "Tight cable runs beside the side panel."),
    },
    intro: ["NVIDIA recommends a 650W power supply for the RTX 4070 Super. Most partner cards use a 16-pin 12V-2x6 connector, so a native cable avoids the adapter in the box.", PSU_WE],
    bottomLine: ["Montech's Century II 650W is the best-matched unit for an RTX 4070 Super, with a 10-year warranty. MSI's A750GL adds headroom with the same warranty length, and SAMA's GT650 White suits white builds."],
    priorityCriteria: ["wattage", "connector", "warranty"], related: ["best-power-supplies-for-rtx-4070", "best-650w-power-supplies", "best-rtx-4070-super-graphics-cards"],
  }),
  psu({
    slug: "best-power-supplies-for-rtx-4060-ti", seoTitle: "Best PSUs for the RTX 4060 Ti", title: "The Best Power Supplies for the RTX 4060 Ti", breadcrumbLabel: "Best PSUs for RTX 4060 Ti", mainKeyword: "best psu for rtx 4060 ti",
    dek: "Five 550W to 750W units for the RTX 4060 Ti, which NVIDIA pairs with 550W, chosen with a later card upgrade in mind.",
    metaDescription: "Five 550W to 750W power supplies for the RTX 4060 Ti, matched to NVIDIA's 550W guidance and compared on connectors, warranty and room for a later upgrade.",
    teaser: "NVIDIA recommends 550W for the RTX 4060 Ti; a 650W or 750W unit leaves room for the next card.",
    asins: ["B0H6NJWPJ8", "B0DM2HP39G", "B0F2TNT86D", "B0DP9M9VWD", "B0H14KK47V"],
    labels: {
      B0H6NJWPJ8: L("Best Match for an RTX 4060 Ti", "550W Gold with a 10-year warranty", "Builds that will keep this card."),
      B0DM2HP39G: L("Best Budget 750W", "750W with Japanese capacitors and an ECO silent mode", "Leaving room for a bigger card."),
      B0F2TNT86D: L("Best for 8-Pin Cards", "three PCIe 8-pin connectors plus a 12V-2x6", "RTX 4060 Ti cards with an 8-pin plug."),
      B0DP9M9VWD: L("Best Cable Kit", "a native 12V-2x6 plus a 12V-2x6 to dual 8-pin cable", "Switching between card types."),
      B0H14KK47V: L("Best Compact 750W", "750W in a 140mm body", "Short PSU bays."),
    },
    intro: ["NVIDIA recommends a 550W power supply for the RTX 4060 Ti. Most versions use one 8-pin plug, but some partner cards use a 16-pin connector, so check your card before choosing cables.", PSU_WE],
    bottomLine: ["Montech's Century II 550W is enough for an RTX 4060 Ti and carries a 10-year warranty. If you plan a bigger card later, SAMA's GT750 or darkFlash's DG750 add headroom at a small premium."],
    priorityCriteria: ["wattage", "connector", "warranty"], related: ["best-power-supplies-for-rtx-4060", "best-550w-power-supplies", "best-rtx-4060-ti-graphics-cards"],
  }),
];
