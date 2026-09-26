import type { CategorySchema, Fact, GenericArticleConfig } from "@/lib/pc-compose/generic";
import { hddFacts, hddSchema, mbFacts, mbSchema, ramFacts, ramSchema, ssdFacts, ssdSchema } from "@/data/categories/platform";

/**
 * Batch 4: motherboards, memory and storage. Asin order = editorial rank; takes, intro and
 * bottom line are written per article from the fact sheets in data/categories/platform.ts.
 */
const updatedAt = "2026-09-26";
const L = (badge: string, reason: string, bestFor: string) => ({ badge, reason, bestFor });
const research = "This is a research-based comparison built from maker specifications; we did not test these parts ourselves.";

export const batch4: { cfg: GenericArticleConfig; schema: CategorySchema; facts: Record<string, Fact> }[] = [
  {
    schema: mbSchema, facts: mbFacts,
    cfg: {
      slug: "best-motherboards", category: "components", updatedAt,
      seoTitle: "Best Motherboards for Gaming PCs", title: "The Best Motherboards for Gaming PCs", breadcrumbLabel: "Best Motherboards", mainKeyword: "best motherboard",
      dek: "Six ATX motherboards for AM5 and Intel LGA1851 compared on M.2 slots, networking, power delivery and value for a new gaming build.",
      metaDescription: "Six ATX motherboards for AMD AM5 and Intel LGA1851 compared on M.2 slots, Wi-Fi, wired LAN and power delivery, to pick a board for a gaming build.",
      teaser: "Pick the socket for your CPU first; then count M.2 slots and check networking rather than chasing chipset names.",
      asins: ["B0DT58JK2W", "B0DPLPLR88", "B0DRTTJ5D6", "B0DQLHVQSF", "B0DQB38PL5", "B0DH6SF5LB"],
      labels: {
        B0DT58JK2W: L("Best AM5 Board", "four M.2 slots, 5Gbps LAN and Wi-Fi 7 on B850", "Most Ryzen gaming builds."),
        B0DQLHVQSF: L("Longest Warranty", "a five-year warranty on a B850 board", "Builders who plan to keep a board for years."),
        B0DQB38PL5: L("Best Budget AM5", "5Gbps LAN and Wi-Fi 7 on an entry-level B850 board", "Budget Ryzen builds."),
        B0DH6SF5LB: L("Best Intel Board", "four M.2 slots and 5Gbps LAN on LGA1851", "Core Ultra 200S builds."),
      },
      takes: {
        B0DT58JK2W: "The B850 Tomahawk MAX covers what most Ryzen builds need: four M.2 slots, 5Gbps Ethernet and Wi-Fi 7 on a reinforced PCIe 5.0 graphics slot. It is the board to start from unless you need something specific.",
        B0DPLPLR88: "The TUF B850-PLUS lists a 14+2+1 layout of 80A power stages and a front USB-C header for 10Gbps ports. It suits builders who want sturdy power delivery for a 12- or 16-core Ryzen.",
        B0DRTTJ5D6: "The B850 Steel Legend pairs four M.2 slots with a PCIe 5.0 M.2 slot and a white finish. It fits light-themed builds that still need plenty of storage.",
        B0DQLHVQSF: "The B850 AORUS Elite WIFI7 stands out for Gigabyte's five-year warranty and a 14+2+2 power layout. It trades one M.2 slot against the Tomahawk for that longer cover.",
        B0DQB38PL5: "The PRO B850-P keeps Wi-Fi 7 and 5Gbps LAN on a budget board, with tool-free M.2 clips. Three M.2 slots are enough for most gaming builds.",
        B0DH6SF5LB: "The Z890 Tomahawk is the Intel pick, with four M.2 slots, 5Gbps LAN and Wi-Fi 7 for Core Ultra 200S chips. It runs only LGA1851 processors, not older 12th to 14th Gen chips.",
      },
      intro: [
        "A motherboard does not change frame rates, but it decides what you can connect: how many SSDs, how fast the network runs and how well it powers a high-end CPU.",
        `We compared six ATX boards on M.2 slots, networking, power delivery and warranty. ${research}`,
      ],
      bottomLine: [
        "The MSI B850 Tomahawk MAX WiFi is the pick for most Ryzen builds, and the MSI PRO B850-P WiFi is the budget option with the same fast networking. The MSI Z890 Tomahawk WiFi is the Intel choice.",
        "The ASUS TUF B850-PLUS favours power delivery, the ASRock B850 Steel Legend suits white builds, and the Gigabyte B850 AORUS Elite carries the longest warranty.",
      ],
      priorityCriteria: ["chipset", "m2"], related: ["best-x870e-motherboards", "best-motherboards-for-ryzen-7-9800x3d", "choose-pc-components"],
    },
  },
  {
    schema: mbSchema, facts: mbFacts,
    cfg: {
      slug: "best-x870e-motherboards", category: "components", updatedAt,
      seoTitle: "Best X870E Motherboards", title: "The Best X870E Motherboards", breadcrumbLabel: "Best X870E Motherboards", mainKeyword: "best x870e motherboard",
      dek: "Six X870E motherboards for AM5 compared on M.2 slots, USB4, networking and power delivery, from the TUF X870E-PLUS to E-ATX flagships.",
      metaDescription: "Six AMD X870E motherboards compared on M.2 slots, USB4, wired LAN, Wi-Fi 7 and power stages, for high-end Ryzen builds that need more expansion.",
      teaser: "X870E buys expansion, not speed; check you need the extra M.2 slots and USB4 before paying for it.",
      asins: ["B0DGVSW4FD", "B0DDZNZF76", "B0DG3QW9TJ", "B0DGVBM73J", "B0FDSD77GP", "B0DFP2Q3TM"],
      labels: {
        B0DGVSW4FD: L("Best X870E Board", "5Gbps LAN, USB4, four M.2 slots and a five-year warranty", "High-end Ryzen builds that use every port."),
        B0DDZNZF76: L("Most M.2 Slots", "five M.2 slots and an 18+2+2 power layout", "Builds with many SSDs."),
        B0FDSD77GP: L("Best Value X870E", "four M.2 slots and 16+2+1 80A stages on a TUF board", "X870E features at a lower price."),
        B0DFP2Q3TM: L("Best E-ATX Pick", "E-ATX size with USB4 and support for 256GB of DDR5", "Large cases and workstation-style builds."),
      },
      takes: {
        B0DGVSW4FD: "The X870E AORUS Master lists the fullest connectivity here, with 5Gbps LAN, USB4, Wi-Fi 7 and four M.2 slots, plus Gigabyte's five-year warranty. It suits a high-end Ryzen build that will use all of it.",
        B0DDZNZF76: "The Strix X870E-E has five M.2 slots, the most here, and an 18+2+2 power layout for 16-core chips. It is the pick for builds that keep adding SSDs.",
        B0DG3QW9TJ: "The X870E Carbon pairs PCIe 5.0 graphics and M.2 slots with USB4 and Wi-Fi 7. MSI's listing does not state its M.2 count, so check the spec page if storage matters.",
        B0DGVBM73J: "The X870E AORUS Elite keeps four M.2 slots, USB4 and a 16+2+2 layout at a lower price than the Master, with 2.5Gbps rather than 5Gbps Ethernet.",
        B0FDSD77GP: "The TUF X870E-PLUS brings X870E's four M.2 slots and a 16+2+1 layout of 80A stages to a more affordable board. USB4 is not stated in its listing.",
        B0DFP2Q3TM: "The X870E Taichi is an E-ATX board with USB4, Wi-Fi 7 and four M.2 slots. Check your case lists E-ATX support before choosing it.",
      },
      intro: [
        "X870E is AMD's top AM5 chipset. It runs the same CPUs as B850 at the same speed, but adds PCIe 5.0 lanes, USB4 and room for more devices.",
        `We compared six X870E boards on M.2 slots, USB4, networking, power delivery and size. ${research}`,
      ],
      bottomLine: [
        "The Gigabyte X870E AORUS Master is the most complete board here, and the ASUS ROG Strix X870E-E has the most M.2 slots. The ASUS TUF X870E-PLUS is the value way into X870E.",
        "The MSI X870E Carbon and Gigabyte X870E AORUS Elite sit between them, and the ASRock X870E Taichi suits large E-ATX builds.",
      ],
      priorityCriteria: ["chipset", "vrm"], related: ["best-motherboards", "best-motherboards-for-ryzen-7-9800x3d", "best-cpus-for-gaming-and-streaming"],
    },
  },
  {
    schema: mbSchema, facts: mbFacts,
    cfg: {
      slug: "best-mini-itx-motherboards", category: "components", updatedAt,
      seoTitle: "Best Mini-ITX Motherboards", title: "The Best Mini-ITX Motherboards for AM5", breadcrumbLabel: "Best Mini-ITX Motherboards", mainKeyword: "best mini itx motherboard",
      dek: "Five AM5 Mini-ITX motherboards compared on M.2 slots, networking, Wi-Fi and power delivery for small form factor gaming builds.",
      metaDescription: "Five AM5 Mini-ITX motherboards compared on M.2 slots, Wi-Fi 7, wired LAN and power stages, for compact gaming builds in small form factor cases.",
      teaser: "Mini-ITX leaves one PCIe slot and two memory slots; choose on networking and M.2 layout.",
      asins: ["B0DHCQ1MPZ", "B0FC9CZTXL", "B0DQNRGMWH", "B0H862GP41", "B0CKWVHW69"],
      labels: {
        B0H862GP41: L("Best for Fast USB", "a rear USB 20Gbps port on Mini-ITX", "SFF builds with fast external drives."),
        B0DHCQ1MPZ: L("Best Mini-ITX Board", "a 10+2+1 power layout with Wi-Fi 7 and two M.2 slots", "High-end SFF builds."),
        B0FC9CZTXL: L("Fastest Networking", "5Gbps LAN on a Mini-ITX board", "SFF builds on fast wired networks."),
        B0CKWVHW69: L("Best Budget Mini-ITX", "the B650 chipset with a PCIe 5.0 M.2 slot", "Budget SFF builds."),
      },
      takes: {
        B0DHCQ1MPZ: "The Strix B850-I lists the strongest power layout of the Mini-ITX boards here, 10+2+1, with Wi-Fi 7 and two M.2 slots. It handles a high-end Ryzen chip in a small case.",
        B0FC9CZTXL: "The B850I Edge TI is the only board here with 5Gbps Ethernet, alongside Wi-Fi 7 and two M.2 slots. Its white finish suits light-themed small builds.",
        B0DQNRGMWH: "The B850I AORUS PRO lists memory support up to DDR5-8400 when overclocked, with Wi-Fi 7 and 2.5Gbps LAN. Gigabyte's listing does not state its M.2 count.",
        B0H862GP41: "The TUF B850I brings a rear USB 20Gbps port and two M.2 slots, with Wi-Fi 6E rather than Wi-Fi 7.",
        B0CKWVHW69: "The B650I Lightning uses the older B650 chipset at a lower price, keeping a PCIe 5.0 M.2 slot and Wi-Fi 6E. It suits budget small builds with a mid-range CPU.",
      },
      intro: [
        "A Mini-ITX board packs a desktop platform into 17cm square, with one graphics slot and two memory slots. The differences are in networking, M.2 layout and how much power they deliver.",
        `We compared five AM5 Mini-ITX boards on those points. ${research} We did not include LGA1851 Mini-ITX boards because the listings on Amazon were spare-part or incomplete listings.`,
      ],
      bottomLine: [
        "The ASUS ROG Strix B850-I is the pick for high-end small builds, and the MSI B850I Edge TI has the fastest networking. The ASRock B650I Lightning is the budget choice.",
        "The Gigabyte B850I AORUS PRO and ASUS TUF B850I sit between them.",
      ],
      priorityCriteria: ["m2", "network"], related: ["best-low-profile-cpu-coolers", "best-motherboards", "plan-a-pc-build"],
    },
  },
  {
    schema: mbSchema, facts: mbFacts,
    cfg: {
      slug: "best-motherboards-for-ryzen-7-9800x3d", category: "components", updatedAt,
      seoTitle: "Best Motherboards for the Ryzen 7 9800X3D", title: "The Best Motherboards for the Ryzen 7 9800X3D and 7800X3D", breadcrumbLabel: "Best 9800X3D Motherboards", mainKeyword: "best motherboard for 9800x3d",
      dek: "Six AM5 motherboards for the Ryzen 7 9800X3D and 7800X3D, from a budget B850 to X870E, compared on M.2, networking and power.",
      metaDescription: "Six AM5 motherboards for the Ryzen 7 9800X3D and 7800X3D compared on M.2 slots, networking, USB4 and power stages, from budget B850 to X870E boards.",
      teaser: "An eight-core X3D chip does not need a flagship board; spend on the features you will use.",
      asins: ["B0DPLP33YR", "B0FVQ3NN4C", "B0FRV5XHVQ", "B0DT58JK2W", "B0DRTVDVVK", "B0DG3QW9TJ"],
      labels: {
        B0DPLP33YR: L("Best for Most 9800X3D Builds", "four M.2 slots, Wi-Fi 7 and a 14+2+2 layout on B850", "Gaming-first 9800X3D builds."),
        B0FVQ3NN4C: L("Best X870E for X3D", "5Gbps LAN, USB4 and four M.2 slots", "X3D builds that want every feature."),
        B0DRTVDVVK: L("Best Budget Pick", "four M.2 slots on an entry-level B850 board", "Spending the budget on the GPU instead."),
      },
      takes: {
        B0DPLP33YR: "The Strix B850-A gives a 9800X3D everything it needs: a 14+2+2 power layout, four M.2 slots and Wi-Fi 7, without X870E pricing. Its white finish suits light-themed builds.",
        B0FVQ3NN4C: "The X870E Tomahawk MAX PZ adds USB4 with display output, 5Gbps LAN and four M.2 slots. It is the step up when you want X870E features.",
        B0FRV5XHVQ: "The X870E AORUS PRO X3D is Gigabyte's board branded for X3D chips, with an 18+2+2 layout, USB4 and four M.2 slots in a white ICE finish.",
        B0DT58JK2W: "The B850 Tomahawk MAX is a strong mid-range match, with four M.2 slots, 5Gbps LAN and Wi-Fi 7 on B850.",
        B0DRTVDVVK: "The B850 Pro RS keeps four M.2 slots and a 14+2+1 layout on a budget board, with Wi-Fi 6E. It leaves more money for the graphics card.",
        B0DG3QW9TJ: "The X870E Carbon is the premium MSI option with USB4 and Wi-Fi 7, for builds that want a high-end board to match a high-end chip.",
      },
      intro: [
        "The Ryzen 7 9800X3D and 7800X3D are eight-core chips rated at 120W, so any current AM5 board powers them comfortably. The choice comes down to storage, networking and budget.",
        `We compared six AM5 boards on M.2 slots, networking, USB4 and power stages. ${research} Update the BIOS if the board predates your chip.`,
      ],
      bottomLine: [
        "The ASUS ROG Strix B850-A is the pick for most 9800X3D and 7800X3D builds, and the ASRock B850 Pro RS saves money for the graphics card. The MSI X870E Tomahawk MAX PZ is the X870E step up.",
        "The Gigabyte X870E AORUS PRO X3D, MSI B850 Tomahawk MAX and MSI X870E Carbon are strong alternatives.",
      ],
      priorityCriteria: ["bios", "chipset"], related: ["best-cpus-for-gaming", "best-ram-for-ryzen-7-9800x3d", "best-x870e-motherboards"],
    },
  },
  {
    schema: ramSchema, facts: ramFacts,
    cfg: {
      slug: "best-ram-for-gaming", category: "components", updatedAt,
      seoTitle: "Best RAM for Gaming", title: "The Best DDR5 RAM for Gaming", breadcrumbLabel: "Best RAM for Gaming", mainKeyword: "best ram for gaming",
      dek: "Six DDR5 kits for gaming PCs compared on speed, CAS latency, capacity and EXPO or XMP support, from 32GB CL30 kits to 64GB.",
      metaDescription: "Six DDR5 memory kits for gaming PCs compared on speed, CAS latency, capacity and EXPO or XMP profiles, from 32GB CL30 kits to a 64GB kit for creators.",
      teaser: "32GB of DDR5-6000 CL30 in two sticks covers most gaming builds; check EXPO or XMP for your platform.",
      asins: ["B0CYHC58P6", "B0BPTKD797", "B0DD295CNY", "B0D2JLWLWZ", "B0B72827G5", "B0C5M6SJYW"],
      labels: {
        B0CYHC58P6: L("Best Overall RAM", "DDR5-6000 CL30 with EXPO and XMP in a low-profile design", "Most AMD and Intel gaming builds."),
        B0BPTKD797: L("Best RGB Kit", "DDR5-6000 CL30 with RGB and both profiles", "Builds with lighting."),
        B0D2JLWLWZ: L("Best Budget Kit", "EXPO and XMP on a DDR5-6000 kit", "Budget builds that still want 6000MT/s."),
        B0C5M6SJYW: L("Best 64GB Kit", "64GB at DDR5-6000 CL30", "Gaming plus video editing or heavy multitasking."),
      },
      takes: {
        B0CYHC58P6: "The FURY Beast kit hits the common target of DDR5-6000 at CL30 with both EXPO and XMP, in a low-profile heatspreader that clears big coolers. It suits nearly any gaming build.",
        B0BPTKD797: "The Vengeance RGB matches that 6000 CL30 rating and adds lighting, with both profiles for AMD or Intel. It is the pick for builds with a glass panel.",
        B0DD295CNY: "The Flare X5 runs 6000 CL30 at 1.35V, the lowest voltage here, and is tuned for AMD with an EXPO profile. It is a quiet-looking match for Ryzen builds.",
        B0D2JLWLWZ: "The Crucial Pro kit runs 6000MT/s at CL36 with both profiles. Its looser timings cost a little latency in exchange for a lower price.",
        B0B72827G5: "The FURY Renegade kit runs faster at 6400MT/s CL32, which suits Intel Core Ultra builds. Its listing names XMP only, so AM5 boards may need manual settings.",
        B0C5M6SJYW: "The Vengeance 64GB kit doubles capacity at 6000 CL30. It suits players who also edit video or keep many apps open.",
      },
      intro: [
        "For gaming, 32GB of DDR5 in two sticks is the sensible default, and DDR5-6000 at CL30 is the usual target on AMD. Beyond that, lighting, height and platform profiles separate the kits.",
        `We compared six kits on speed, latency, capacity and profile support. ${research}`,
      ],
      bottomLine: [
        "The Kingston FURY Beast DDR5-6000 CL30 is the pick for most builds, and the Corsair Vengeance RGB is its lit equivalent. The G.Skill Flare X5 suits AMD builds and the Crucial Pro saves money.",
        "The Kingston FURY Renegade suits Intel builds, and the Corsair Vengeance 64GB kit covers creators.",
      ],
      priorityCriteria: ["sweet-spot", "capacity"], related: ["best-ram-for-ryzen-7-9800x3d", "best-motherboards", "choose-pc-components"],
    },
  },
  {
    schema: ramSchema, facts: ramFacts,
    cfg: {
      slug: "best-ram-for-ryzen-7-9800x3d", category: "components", updatedAt,
      seoTitle: "Best RAM for the Ryzen 7 9800X3D", title: "The Best RAM for the Ryzen 7 9800X3D", breadcrumbLabel: "Best RAM for 9800X3D", mainKeyword: "best ram for 9800x3d",
      dek: "Six DDR5-6000 EXPO kits for the Ryzen 7 9800X3D compared on CAS latency, capacity and profiles, from CL26 to a 64GB kit.",
      metaDescription: "Six DDR5-6000 kits for the Ryzen 7 9800X3D compared on CAS latency, capacity and EXPO support, from CL26 enthusiast kits to value CL30 and 64GB options.",
      teaser: "Stay at DDR5-6000 with an EXPO profile; tighter timings matter less on an X3D chip with 96MB of cache.",
      asins: ["B0DGRFBN96", "B0CYM58GFS", "B0F1X98W1B", "B0DGZJ3RTS", "B0C4NM8NMC", "B0CGQ3KS8X"],
      labels: {
        B0DGRFBN96: L("Best for the 9800X3D", "DDR5-6000 CL28 with an EXPO profile", "9800X3D builds that want tight timings without extreme pricing."),
        B0F1X98W1B: L("Tightest Timings", "CL26 at DDR5-6000", "Enthusiasts tuning every nanosecond."),
        B0C4NM8NMC: L("Best No-RGB Kit", "6000 CL30 with EXPO and XMP and no lighting", "Clean builds and large air coolers."),
        B0CGQ3KS8X: L("Best 64GB Kit", "64GB at DDR5-6000 CL30 with EXPO", "9800X3D builds that also handle creative work."),
      },
      takes: {
        B0DGRFBN96: "The Trident Z5 Neo RGB CL28 kit keeps the 9800X3D's preferred 6000MT/s speed with tighter timings than CL30 kits, and an EXPO profile sets it up in one click.",
        B0CYM58GFS: "The FURY Beast RGB is a dependable 6000 CL30 kit with EXPO and XMP and Kingston's infrared lighting sync.",
        B0F1X98W1B: "The Trident Z5 Royal Neo runs CL26 at 6000MT/s, the tightest timings here, at 1.45V. The gain over CL30 is small on an X3D chip, so it is for enthusiasts.",
        B0DGZJ3RTS: "The Viper Elite 5 RGB is a 6000 CL30 kit with EXPO and XMP. It is a straightforward, lower-cost RGB option.",
        B0C4NM8NMC: "The T-Create Expert kit runs 6000 CL30 with no lighting and a 10-layer PCB. It suits builds that value a plain look.",
        B0CGQ3KS8X: "The Flare X5 64GB kit brings 64GB at 6000 CL30 with EXPO. It suits a 9800X3D machine that also edits video.",
      },
      intro: [
        "The Ryzen 7 9800X3D works best with DDR5-6000, which keeps memory and controller in sync. Its 96MB of L3 cache also reduces how much tight memory timings matter compared with non-X3D chips.",
        `We compared six EXPO kits at 6000MT/s on latency, capacity and profiles. ${research}`,
      ],
      bottomLine: [
        "The G.Skill Trident Z5 Neo RGB CL28 is the pick for most 9800X3D builds, and the Kingston FURY Beast RGB and Patriot Viper Elite 5 RGB are value CL30 options.",
        "The Trident Z5 Royal Neo CL26 is for enthusiasts, the TEAMGROUP T-Create Expert suits plain builds, and the G.Skill Flare X5 64GB covers creators.",
      ],
      priorityCriteria: ["sweet-spot", "latency"], related: ["best-motherboards-for-ryzen-7-9800x3d", "best-cpus-for-gaming", "best-ram-for-gaming"],
    },
  },
  {
    schema: ssdSchema, facts: ssdFacts,
    cfg: {
      slug: "best-ssds-for-gaming", category: "components", updatedAt,
      seoTitle: "Best 2TB NVMe SSDs for Gaming", title: "The Best 2TB NVMe SSDs for Gaming", breadcrumbLabel: "Best SSDs for Gaming", mainKeyword: "best ssd for gaming",
      dek: "Six 2TB NVMe SSDs compared on PCIe generation, read and write speeds, DRAM cache and heatsinks, from value PCIe 4.0 to PCIe 5.0.",
      metaDescription: "Six 2TB NVMe SSDs for gaming PCs compared on PCIe 4.0 or 5.0, rated read and write speeds, DRAM cache and heatsink options, from value to flagship.",
      teaser: "A fast PCIe 4.0 drive loads games about as quickly as PCIe 5.0; spend on capacity first.",
      asins: ["B0BHJJ9Y77", "B0B7CKZGN6", "B0C91X5DZL", "B0DHLCRF91", "B0DX2DPJZ5", "B0F3BD1W6R"],
      labels: {
        B0F3BD1W6R: L("Fastest Reads", "14,900MB/s rated reads, the highest here", "Large file work on a PCIe 5.0 board."),
        B0DHLCRF91: L("Most Flexible Lanes", "support for PCIe 4.0 x4 or PCIe 5.0 x2", "Boards that share M.2 lanes."),
        B0BHJJ9Y77: L("Best Gaming SSD", "7,450MB/s reads with DRAM cache on PCIe 4.0", "Most gaming PCs."),
        B0B7CKZGN6: L("Best with a Heatsink", "an included heatsink on a 7,300MB/s drive", "Boards without an M.2 cover."),
        B0C91X5DZL: L("Best Value", "7,400MB/s reads and a 1,500TBW rating", "Budget builds that want speed."),
        B0DX2DPJZ5: L("Best PCIe 5.0 SSD", "14,700MB/s reads with DRAM cache", "Creative work on a PCIe 5.0 board."),
      },
      takes: {
        B0BHJJ9Y77: "The 990 PRO sits near the top of PCIe 4.0 speeds at 7,450MB/s reads, with DRAM cache to hold speed under heavy writes. It is the drive to pick for a gaming PC.",
        B0B7CKZGN6: "The SN850X with heatsink lists 7,300MB/s reads and comes ready for boards without an M.2 cover. Skip the heatsink version if your board has one.",
        B0C91X5DZL: "The NM790 reaches 7,400MB/s reads with a 1,500TBW rating and no DRAM, using host memory instead. For games that trade-off rarely shows.",
        B0DHLCRF91: "The 990 EVO Plus can run on PCIe 4.0 x4 or PCIe 5.0 x2 lanes, which suits boards that share lanes. Its 7,250MB/s reads keep it close to the fastest Gen4 drives.",
        B0DX2DPJZ5: "The 9100 PRO doubles PCIe 4.0 speeds at 14,700MB/s reads with DRAM cache. It helps large file work more than game loading.",
        B0F3BD1W6R: "The SN8100 lists the fastest reads here at 14,900MB/s. Like the 9100 PRO, it needs a PCIe 5.0 slot to reach them.",
      },
      intro: [
        "An NVMe SSD makes the biggest difference to how quickly games and Windows load, and 2TB is a sensible size for a modern library. Above PCIe 4.0 speeds, game load times change little.",
        `We compared six 2TB drives on PCIe generation, rated speeds, DRAM cache and heatsink options. ${research}`,
      ],
      bottomLine: [
        "The Samsung 990 PRO is the pick for gaming, the WD_BLACK SN850X suits boards without a heatsink, and the Lexar NM790 is the value choice.",
        "The Samsung 990 EVO Plus is flexible on lanes, and the Samsung 9100 PRO and WD_BLACK SN8100 are for PCIe 5.0 builds.",
      ],
      priorityCriteria: ["gen4", "capacity"], related: ["best-4tb-ssds", "best-hard-drives-for-gaming", "best-motherboards"],
    },
  },
  {
    schema: ssdSchema, facts: ssdFacts,
    cfg: {
      slug: "best-4tb-ssds", category: "components", updatedAt,
      seoTitle: "Best 4TB SSDs for a Large Game Library", title: "The Best 4TB SSDs for a Large Game Library", breadcrumbLabel: "Best 4TB SSDs", mainKeyword: "best 4tb ssd",
      dek: "Six 4TB NVMe SSDs compared on speed, endurance, DRAM cache and PCIe generation, for game libraries that no longer fit on 2TB.",
      metaDescription: "Six 4TB NVMe SSDs compared on rated speed, TBW endurance, DRAM cache and PCIe generation, for large game libraries without uninstalling to make room.",
      teaser: "At 4TB, endurance and price per terabyte matter as much as peak speed.",
      asins: ["B0CHGT1KFJ", "B0C91RNCDV", "B0D9WTKV1B", "B0DHLBDSP7", "B0D7MLB76V", "B0CTSSMTZK"],
      labels: {
        B0DHLBDSP7: L("Best for Secondary Slots", "support for PCIe 4.0 x4 or PCIe 5.0 x2 at 4TB", "A second M.2 slot with shared lanes."),
        B0D9WTKV1B: L("Best 4TB with Heatsink", "an included heatsink at 4TB", "4TB builds on boards without an M.2 cover."),
        B0CHGT1KFJ: L("Best 4TB SSD", "7,450MB/s reads with DRAM cache", "Large libraries on a fast PCIe 4.0 drive."),
        B0C91RNCDV: L("Highest Endurance", "a 3,000TBW rating", "Heavy writers and value seekers."),
        B0D7MLB76V: L("Best Budget 4TB", "4TB with a 1,200TBW rating at a lower cost", "Bulk game storage on a budget."),
        B0CTSSMTZK: L("Best PCIe 5.0 4TB", "14,100MB/s reads with a five-year warranty", "Creators with a PCIe 5.0 board."),
      },
      takes: {
        B0CHGT1KFJ: "The 990 PRO 4TB keeps its 7,450MB/s reads and DRAM cache at double the capacity. It is the fast, safe choice for a large library.",
        B0C91RNCDV: "The NM790 4TB lists a 3,000TBW rating, the highest here, with 7,400MB/s reads. It is DRAM-less, which rarely matters for games.",
        B0D9WTKV1B: "The SN850X 4TB with heatsink offers 7,300MB/s reads ready for boards without an M.2 cover.",
        B0DHLBDSP7: "The 990 EVO Plus 4TB runs on PCIe 4.0 x4 or PCIe 5.0 x2 with 7,250MB/s reads, a good fit for secondary M.2 slots.",
        B0D7MLB76V: "The WD Blue SN5000 is the slowest drive here at 5,500MB/s reads, but still loads games quickly. It is the budget way to 4TB.",
        B0CTSSMTZK: "The T705 4TB is a PCIe 5.0 drive with 14,100MB/s reads, Micron TLC NAND and a five-year warranty. It needs a Gen5 slot and good cooling.",
      },
      intro: [
        "With major games passing 100GB, a 4TB SSD holds a large library without juggling installs. At this size, endurance and value matter as much as peak speed.",
        `We compared six 4TB drives on speed, endurance, DRAM cache and PCIe generation. ${research}`,
      ],
      bottomLine: [
        "The Samsung 990 PRO 4TB is the pick, the Lexar NM790 4TB has the highest endurance rating, and the WD Blue SN5000 is the budget option.",
        "The WD_BLACK SN850X and Samsung 990 EVO Plus are solid alternatives, and the Crucial T705 suits PCIe 5.0 builds.",
      ],
      priorityCriteria: ["capacity", "endurance"], related: ["best-ssds-for-gaming", "best-hard-drives-for-gaming", "upgrade-an-existing-pc"],
    },
  },
  {
    schema: hddSchema, facts: hddFacts,
    cfg: {
      slug: "best-hard-drives-for-gaming", category: "components", updatedAt,
      seoTitle: "Best Hard Drives for Gaming PCs", title: "The Best Hard Drives for Gaming PCs", breadcrumbLabel: "Best Hard Drives", mainKeyword: "best hard drive for gaming",
      dek: "Four 3.5-inch hard drives from 4TB to 10TB compared on spindle speed, cache, recording method and warranty, for bulk game and media storage.",
      metaDescription: "Four 3.5-inch hard drives from 4TB to 10TB compared on RPM, cache, CMR recording and warranty, for bulk game libraries, recordings and backups on a PC.",
      teaser: "Keep current games on an SSD; a hard drive suits the backlog, recordings and backups.",
      asins: ["B085RV9B1N", "B0F4R3YCL6", "B07XQ18JJW", "B07D9C7SQH"],
      labels: {
        B085RV9B1N: L("Best Gaming Hard Drive", "7200 RPM with CMR recording in 8TB", "Bulk game libraries."),
        B0F4R3YCL6: L("Largest Capacity", "10TB with a 512MB cache and CMR", "Recordings and large media libraries."),
        B07D9C7SQH: L("Best Budget Drive", "4TB at the lowest cost here", "Basic bulk storage."),
      },
      takes: {
        B085RV9B1N: "The X300 8TB is sold for gaming PCs, pairing 7200 RPM with CMR recording and a 256MB cache. It is the hard drive to pick for a large backlog.",
        B0F4R3YCL6: "The Red Plus 10TB is the largest drive here, with CMR recording, a 512MB cache and a 3-year warranty. Its NAS rating suits always-on use.",
        B07XQ18JJW: "The IronWolf 8TB spins at 7200 RPM with a 3-year warranty. It is built for NAS use but works in any desktop.",
        B07D9C7SQH: "The BarraCuda 4TB runs at 5400 RPM with a 256MB cache and a 190MB/s transfer rate. It is basic, cheap bulk storage.",
      },
      intro: [
        "Hard drives are far slower than SSDs, but they still cost less per terabyte. In a gaming PC they suit the games you rarely play, recordings and backups.",
        `We compared four 3.5-inch drives from 4TB to 10TB on spindle speed, cache, recording method and warranty. ${research}`,
      ],
      bottomLine: [
        "The Toshiba X300 8TB is the pick for game storage, the WD Red Plus 10TB has the most room, and the Seagate BarraCuda 4TB is the budget choice.",
        "The Seagate IronWolf 8TB is the NAS-rated alternative at 7200 RPM.",
      ],
      priorityCriteria: ["role", "rpm"], related: ["best-ssds-for-gaming", "best-4tb-ssds", "plan-a-pc-build"],
    },
  },
];
