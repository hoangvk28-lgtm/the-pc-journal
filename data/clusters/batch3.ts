import type { CategorySchema, Fact, GenericArticleConfig } from "@/lib/pc-compose/generic";
import { cpuFacts, cpuSchema } from "@/data/categories/cpu";
import { aioFacts, aioSchema, airFacts, airSchema, pasteFacts, pasteSchema } from "@/data/categories/cooling";

/**
 * Batch 3: CPUs and CPU cooling. Asin order = editorial rank; takes, intro and bottom line
 * are written per article from the fact sheets in data/categories/cpu.ts and cooling.ts.
 */
const updatedAt = "2026-09-26";
const L = (badge: string, reason: string, bestFor: string) => ({ badge, reason, bestFor });
const research = "This is a research-based comparison built from maker specifications; we did not test these parts ourselves.";

export const batch3: { cfg: GenericArticleConfig; schema: CategorySchema; facts: Record<string, Fact> }[] = [
  {
    schema: cpuSchema, facts: cpuFacts,
    cfg: {
      slug: "best-cpus-for-gaming", category: "components", updatedAt,
      seoTitle: "Best CPUs for Gaming", title: "The Best CPUs for Gaming", breadcrumbLabel: "Best CPUs for Gaming", mainKeyword: "best cpu for gaming",
      dek: "Six gaming CPUs from AMD and Intel compared on cache, cores, boost clock, platform and cooling needs, from X3D chips to budget six-cores.",
      metaDescription: "Six gaming CPUs from AMD and Intel compared on L3 cache, cores, boost clocks, socket and cooler needs, so you can match a chip to your GPU and budget.",
      teaser: "Check the socket and the cooler first; cache size matters more for games than core count.",
      asins: ["B0DKFMSMYK", "B0BTZB7F88", "B0DFK2MH2D", "B0CGJ9STNF", "B0D6NN6TM7", "B0DFK8HHK4"],
      labels: {
        B0DKFMSMYK: L("Best for Gaming", "96MB of L3 cache with 8 cores on AM5", "High-refresh gaming with a fast graphics card."),
        B0BTZB7F88: L("Best Value X3D", "the same 96MB L3 cache as the 9800X3D at a lower boost clock", "Gamers who want 3D V-Cache without paying for the newest chip."),
        B0DFK2MH2D: L("Best Intel Pick", "20 cores on the current LGA1851 platform", "Builders who game and also run heavy multi-threaded work."),
        B0D6NN6TM7: L("Best Budget AM5", "a 65W rating on AM5", "A budget gaming build with an upgrade path."),
        B0DFK8HHK4: L("Cheapest Way Onto LGA1851", "14 cores on Intel's current socket", "Intel gaming builds on a budget with a graphics card."),
      },
      takes: {
        B0DKFMSMYK: "The Ryzen 7 9800X3D pairs AMD's 3D V-Cache with eight Zen 5 cores, and games that lean on cache respond to it more than to extra cores. It is the chip to pair with a high-end graphics card when the CPU would otherwise hold frame rates back.",
        B0BTZB7F88: "The Ryzen 7 7800X3D has the same 96MB of L3 cache as its successor with an older core design and lower clocks. On the same AM5 socket, it is the way into X3D gaming for less.",
        B0DFK2MH2D: "The Core Ultra 7 265K is Intel's strongest all-rounder here, with 20 cores for games plus background work, on the LGA1851 socket. It suits a builder who wants an Intel platform and a lot of multi-threaded headroom.",
        B0CGJ9STNF: "The Core i5-14600K runs on LGA1700, so it works with DDR4 or DDR5 boards and suits upgraders already on that socket. Its 14 cores give good headroom for a mid-range gaming build.",
        B0D6NN6TM7: "The Ryzen 5 9600X brings six Zen 5 cores to AM5 at a 65W rating, which keeps cooling simple. It suits a budget build now that can take an X3D chip later without changing boards.",
        B0DFK8HHK4: "The Core Ultra 5 245KF is the entry to LGA1851, with 14 cores and no integrated graphics. It needs a graphics card to show a picture, which every gaming build has anyway.",
      },
      intro: [
        "For games, the CPU decides how high frame rates can go once the graphics card is no longer the limit. Large L3 cache helps many games more than extra cores, which is why AMD's X3D chips lead most gaming comparisons.",
        `We compared six CPUs on cache, cores, clocks, socket and cooler requirements. ${research}`,
        "Pick the platform first: AM5 and LGA1851 are current sockets, while LGA1700 suits upgraders who already own a board.",
      ],
      bottomLine: [
        "The Ryzen 7 9800X3D is the strongest gaming pick, and the 7800X3D delivers the same cache for less. The Core Ultra 7 265K is the Intel choice for mixed gaming and heavy work.",
        "The Ryzen 5 9600X and Core Ultra 5 245KF are the budget entry points on current sockets, and the Core i5-14600K suits LGA1700 upgraders.",
      ],
      priorityCriteria: ["gpu-first", "cache"], related: ["best-amd-cpus-for-gaming", "best-cpu-coolers", "choose-pc-components"],
    },
  },
  {
    schema: cpuSchema, facts: cpuFacts,
    cfg: {
      slug: "best-amd-cpus-for-gaming", category: "components", updatedAt,
      seoTitle: "Best AMD CPUs for Gaming", title: "The Best AMD CPUs for Gaming", breadcrumbLabel: "Best AMD CPUs for Gaming", mainKeyword: "best amd cpu for gaming",
      dek: "Six AMD Ryzen CPUs for gaming compared on 3D V-Cache, cores, power and socket, from the 16-core 9950X3D to an AM4 upgrade chip.",
      metaDescription: "Six AMD Ryzen CPUs for gaming compared on 3D V-Cache, core count, power rating and AM5 or AM4 socket, from flagship X3D chips to a budget AM4 upgrade.",
      teaser: "Decide between AM5 and an AM4 upgrade first, then choose how much X3D cache your games can use.",
      asins: ["B0DKFMSMYK", "B0DVZSG8D5", "B0G8JMLXNQ", "B0D6NMDNNX", "B0BMQJWBDM", "B08166SLDF"],
      labels: {
        B0DKFMSMYK: L("Best AMD Gaming CPU", "96MB of L3 cache on eight cores", "Gaming builds with a high-end graphics card."),
        B0DVZSG8D5: L("Best for Gaming and Work", "16 cores with 128MB of L3 cache", "Players who also render, compile or edit video."),
        B0BMQJWBDM: L("Best Budget AM5", "a bundled cooler and 65W rating", "A first AM5 build on a tight budget."),
        B08166SLDF: L("Best AM4 Upgrade", "a drop-in upgrade for existing AM4 boards", "Owners of older Ryzen systems who want to keep their board and DDR4."),
      },
      takes: {
        B0DKFMSMYK: "The Ryzen 7 9800X3D puts all eight cores on a single cache-stacked die, so every game thread sees the full 96MB of L3. For a gaming-first build it is the AMD chip to buy.",
        B0DVZSG8D5: "The Ryzen 9 9950X3D adds a second eight-core die to the X3D formula, giving 16 cores for work while keeping 3D V-Cache for games. It suits a single machine that must game and render.",
        B0G8JMLXNQ: "The Ryzen 7 9850X3D is a higher-clocked version of the eight-core X3D design. It targets players who want the most gaming headroom AMD offers in an eight-core chip.",
        B0D6NMDNNX: "The Ryzen 7 9700X gives eight Zen 5 cores at a 65W rating without the X3D cache. It is the quieter, cooler-running choice when a build balances games with everyday work.",
        B0BMQJWBDM: "The Ryzen 5 7600 is the cheapest way onto AM5 here and ships with a Wraith Stealth cooler. Six cores are enough for most games paired with a mid-range graphics card.",
        B08166SLDF: "The Ryzen 5 5600X is for AM4 owners: it drops into existing boards after a BIOS update and keeps your DDR4. It includes a Wraith Stealth cooler but has no integrated graphics.",
      },
      intro: [
        "AMD's gaming line splits into X3D chips, with stacked cache for games, and standard Ryzen chips that run cooler and cost less. The socket also matters: AM5 is AMD's current platform, while AM4 still makes sense as an upgrade path.",
        `We compared six Ryzen CPUs on cache, cores, power rating and socket. ${research}`,
      ],
      bottomLine: [
        "The Ryzen 7 9800X3D is the gaming pick, the 9950X3D covers gaming plus heavy work, and the 9850X3D pushes clocks higher on the same eight-core X3D design.",
        "The Ryzen 7 9700X and Ryzen 5 7600 are sensible AM5 builds on a budget, and the Ryzen 5 5600X extends the life of an AM4 system.",
      ],
      priorityCriteria: ["cache", "platform"], related: ["best-cpus-for-gaming", "best-cpu-coolers", "upgrade-an-existing-pc"],
    },
  },
  {
    schema: cpuSchema, facts: cpuFacts,
    cfg: {
      slug: "best-cpus-for-240hz-gaming", category: "components", updatedAt,
      seoTitle: "Best CPUs for 240Hz Gaming", title: "The Best CPUs for 240Hz Competitive Gaming", breadcrumbLabel: "Best CPUs for 240Hz Gaming", mainKeyword: "best cpu for 240hz gaming",
      dek: "Six CPUs for 240Hz esports gaming compared on cache, boost clock, cores and platform, where the CPU sets the frame-rate ceiling.",
      metaDescription: "Six CPUs for 240Hz competitive gaming compared on L3 cache, boost clock, cores and platform, since the CPU sets the frame-rate ceiling in esports titles.",
      teaser: "At 240Hz in esports titles the CPU is usually the limit; cache and clock speed decide how close you get.",
      asins: ["B0G8JMLXNQ", "B0CGJ41C9W", "B0DFKC99VL", "B0BBHHT8LY", "B0D6NN6TM7", "B0BBJDS62N"],
      labels: {
        B0G8JMLXNQ: L("Best for 240Hz", "96MB of L3 cache with the highest X3D boost clock here", "Competitive players chasing the highest frame rates."),
        B0BBHHT8LY: L("Best Value Eight-Core", "eight Zen 4 cores boosting to 5.4GHz on AM5", "Esports players who want eight cores without X3D pricing."),
        B0DFKC99VL: L("Best Intel for High Refresh", "24 cores and Intel's highest boost clock here", "Intel builds that also stream or run heavy work."),
        B0BBJDS62N: L("Best Budget for 240Hz", "six fast cores on AM5", "Esports titles on a budget build."),
      },
      takes: {
        B0G8JMLXNQ: "The Ryzen 7 9850X3D combines AMD's 96MB of L3 cache with the highest clocks of the eight-core X3D chips. For competitive games that run far above 144Hz, it is the chip most likely to keep frame times steady.",
        B0CGJ41C9W: "The Core i7-14700K runs on LGA1700 with high clocks and 20 cores. It is a strong high-refresh option for Intel owners with a compatible board and a capable cooler.",
        B0DFKC99VL: "The Core Ultra 9 285K is Intel's flagship on LGA1851, with 24 cores and high single-threaded clocks. It suits competitive players who also stream from the same machine.",
        B0BBHHT8LY: "The Ryzen 7 7700X brings eight Zen 4 cores with high clocks to AM5 at a lower price than the X3D chips. It gives esports titles plenty of headroom without the cache premium.",
        B0D6NN6TM7: "The Ryzen 5 9600X is a six-core Zen 5 chip rated at 65W. Esports titles rarely use more than six cores, so it handles high refresh rates on a modest budget.",
        B0BBJDS62N: "The Ryzen 5 7600X is the least expensive route to 240Hz here, with six Zen 4 cores on AM5. It needs an aftermarket cooler, since none is included.",
      },
      intro: [
        "At 240Hz, many competitive games are limited by the CPU rather than the graphics card, especially at 1080p with lowered settings. Cache and single-threaded speed matter more here than core count.",
        `We compared six CPUs on cache, boost clock, cores and platform. ${research}`,
      ],
      bottomLine: [
        "The Ryzen 7 9850X3D is the pick for the highest frame rates, and the Core Ultra 9 285K and Core i7-14700K are the Intel options with room for streaming.",
        "The Ryzen 7 7700X, Ryzen 5 9600X and Ryzen 5 7600X reach high refresh rates in esports titles for less.",
      ],
      priorityCriteria: ["cache", "gpu-first"], related: ["best-cpus-for-gaming", "choose-a-pc-monitor", "best-cpu-coolers"],
    },
  },
  {
    schema: cpuSchema, facts: cpuFacts,
    cfg: {
      slug: "best-cpus-for-gaming-and-streaming", category: "components", updatedAt,
      seoTitle: "Best CPUs for Gaming and Streaming", title: "The Best CPUs for Gaming and Streaming", breadcrumbLabel: "Best CPUs for Streaming", mainKeyword: "best cpu for gaming and streaming",
      dek: "Six CPUs for playing and streaming on one PC compared on cores, threads, cache and power, for builds that encode while they game.",
      metaDescription: "Six CPUs for gaming and streaming on one PC compared on cores, threads, cache and power rating, for players who encode, record and play on one machine.",
      teaser: "If your graphics card handles encoding, you need fewer cores than you think; count threads only for CPU encoding.",
      asins: ["B0DVZSG8D5", "B0D6NNRBGP", "B0D6NN87T8", "B0BBJ59WJ4", "B0DFK2MH2D", "B0CGJ41C9W"],
      labels: {
        B0DVZSG8D5: L("Best for Gaming and Streaming", "16 cores plus 128MB of L3 cache", "Single-PC streamers who want top gaming performance too."),
        B0D6NNRBGP: L("Most Threads", "16 cores and 32 threads without X3D pricing", "CPU-encoded streams and heavy video work."),
        B0BBJ59WJ4: L("Best Value 12-Core", "12 cores on AM5 at a lower price than the newer 9900X", "Streamers on a budget who want many cores."),
      },
      takes: {
        B0DVZSG8D5: "The Ryzen 9 9950X3D is the one chip here that leads in both halves of the job: 16 cores for encoding and 3D V-Cache for games. It suits streamers who refuse to trade frame rates for stream quality.",
        B0D6NNRBGP: "The Ryzen 9 9950X gives 16 cores and 32 threads without the X3D premium. It is the better buy when CPU encoding and editing matter more than the last few frames per second.",
        B0D6NN87T8: "The Ryzen 9 9900X steps down to 12 cores on Zen 5. It leaves plenty of threads for an encoder alongside a game, with a lower power rating than the 16-core chips.",
        B0BBJ59WJ4: "The Ryzen 9 7900X has 12 Zen 4 cores on AM5. It is a cheaper way to the same thread count as the 9900X, at a higher power rating.",
        B0DFK2MH2D: "The Core Ultra 7 265K has 20 cores and an integrated GPU with Quick Sync, which can take on encoding or recording work. It fits streamers who prefer Intel's platform.",
        B0CGJ41C9W: "The Core i7-14700K also has 20 cores and Quick Sync, on the LGA1700 socket. It suits streamers upgrading an existing Intel board.",
      },
      intro: [
        "Streaming from the same PC you play on adds an encoding job on top of the game. Modern graphics cards encode with little impact, so extra cores matter most if you encode on the CPU, record in high quality or run many apps at once.",
        `We compared six CPUs with 12 or more cores on threads, cache, power and platform. ${research}`,
      ],
      bottomLine: [
        "The Ryzen 9 9950X3D is the best pick for gaming and streaming on one PC, and the Ryzen 9 9950X is the value choice for CPU encoding.",
        "The Ryzen 9 9900X and 7900X offer 12 cores for less, and the Core Ultra 7 265K and Core i7-14700K are the Intel options with Quick Sync.",
      ],
      priorityCriteria: ["cores", "cooling"], related: ["best-cpus-for-gaming", "best-360mm-aio-coolers", "choose-pc-components"],
    },
  },
  {
    schema: airSchema, facts: airFacts,
    cfg: {
      slug: "best-cpu-coolers", category: "components", updatedAt,
      seoTitle: "Best CPU Air Coolers", title: "The Best CPU Air Coolers", breadcrumbLabel: "Best CPU Air Coolers", mainKeyword: "best cpu cooler",
      dek: "Six CPU air coolers compared on heat pipes, fan size, height and socket support, from budget dual towers to Noctua's flagship.",
      metaDescription: "Six CPU air coolers compared on heat pipes, fan size, height, RAM clearance and AM5 or LGA1851 support, from budget dual towers to flagship models.",
      teaser: "Measure your case's cooler height limit and your RAM height before comparing heat pipes.",
      asins: ["B0BNDTJVPL", "B0D5B6MXJF", "B09LGY38L4", "B0CJY3DYQ3", "B09VG6NBSJ", "B08WPDD6GD"],
      labels: {
        B0BNDTJVPL: L("Best Value Dual Tower", "seven heat pipes and two fans at a budget price", "Most gaming builds with a mid-range to high-end CPU."),
        B0D5B6MXJF: L("Best Premium Air Cooler", "eight heat pipes and two 140mm fans", "Hot CPUs in quiet builds with a roomy case."),
        B09LGY38L4: L("Best Budget Cooler", "a dual-tower design at an entry-level price", "Budget builds that still want two fans."),
        B08WPDD6GD: L("Best Single Tower", "a slim single tower that keeps RAM slots clear", "Builds with tall RAM or a narrow case."),
      },
      takes: {
        B0BNDTJVPL: "The Phantom Spirit 120 SE packs seven heat pipes and two 120mm fans into a 154mm-tall dual tower. Thermalright rates it for CPUs up to 280W, which covers most gaming chips with room to spare.",
        B0D5B6MXJF: "The NH-D15 G2 is Noctua's flagship: eight heat pipes, two 140mm fans and a six-year warranty. Its offset design keeps the top PCIe slot clear, but it is a large cooler, so check your case first.",
        B09LGY38L4: "The Peerless Assassin 120 SE is the budget dual tower most builders reach for, with six heat pipes and two 120mm fans. Thermalright does not list its height on Amazon, so check the spec page before buying for a narrow case.",
        B0CJY3DYQ3: "The Dark Rock Pro 5 is be quiet!'s quiet-first dual tower, with seven heat pipes, Silent Wings fans and a switch that trades speed for silence. Check its height on be quiet!'s site against your case.",
        B09VG6NBSJ: "The Freezer 36 is a single tower with fans in push-pull and a contact frame for Intel LGA1851 and LGA1700. Its six-year warranty matches Noctua's.",
        B08WPDD6GD: "The NH-U12S redux is a slim single tower with one 120mm fan. It sits clear of the RAM slots and suits 65W to mid-range CPUs in narrower cases.",
      },
      intro: [
        "A good air cooler handles almost any gaming CPU quietly, with no pump to wear out. Size is the real constraint: tower coolers need case height, and wide dual towers can overhang the RAM.",
        `We compared six air coolers on heat pipes, fans, height and socket support. ${research}`,
      ],
      bottomLine: [
        "The Thermalright Phantom Spirit 120 SE is the best value for most builds, and the Noctua NH-D15 G2 is the premium choice for hot CPUs. The Peerless Assassin 120 SE is the budget dual tower.",
        "The be quiet! Dark Rock Pro 5 prioritises silence, the Arctic Freezer 36 suits Intel builds, and the Noctua NH-U12S redux fits narrow cases.",
      ],
      priorityCriteria: ["height", "tdp"], related: ["best-low-profile-cpu-coolers", "best-240mm-aio-coolers", "best-thermal-pastes"],
    },
  },
  {
    schema: airSchema, facts: airFacts,
    cfg: {
      slug: "best-low-profile-cpu-coolers", category: "components", updatedAt,
      seoTitle: "Best Low-Profile CPU Coolers", title: "The Best Low-Profile CPU Coolers", breadcrumbLabel: "Best Low-Profile CPU Coolers", mainKeyword: "best low profile cpu cooler",
      dek: "Six low-profile CPU coolers from 37mm to 70mm tall compared on height, fan size and socket support for small form factor builds.",
      metaDescription: "Six low-profile CPU coolers from 37mm to 70mm tall compared on height, fan size, heat pipes and socket support, for small form factor and slim builds.",
      teaser: "Your case's cooler height limit decides the shortlist; match the fan size to your CPU's power rating.",
      asins: ["B075SF5QQ8", "B09TGSCHYV", "B0BFPRYB5Y", "B0CKVZ2NZ1", "B0BB621NMK", "B075SG1T3X"],
      labels: {
        B075SF5QQ8: L("Best for 70mm Cases", "a 120mm fan on a 70mm cooler with a six-year warranty", "Small cases with 70mm or more of cooler clearance."),
        B09TGSCHYV: L("Best Value Low Profile", "six heat pipes and a 120mm fan at 67mm", "Budget SFF builds with a 65W to mid-range CPU."),
        B0BFPRYB5Y: L("Best Around 60mm", "five heat pipes and a 120mm fan at 57mm", "Cases with roughly 60mm of cooler clearance."),
        B0BB621NMK: L("Best Under 50mm", "a 47mm height with four heat pipes", "Very slim cases below 50mm of clearance."),
        B075SG1T3X: L("Slimmest Cooler", "a 37mm height", "The slimmest AMD builds."),
      },
      takes: {
        B075SF5QQ8: "The NH-L12S fits a slim 120mm fan onto a 70mm cooler, and the fan can sit above or below the fins to clear tall RAM. It covers AM5 and LGA1851 with a six-year warranty.",
        B09TGSCHYV: "The AXP120-X67 fits six heat pipes and a 15mm-thick 120mm fan into 67mm. It is the value choice for small cases with a 65W or mid-range CPU.",
        B0BFPRYB5Y: "The IS-55 is a 57mm cooler with five heat pipes and a slim 120mm fan, listed for AM5 and LGA1851. It fits cases too short for the 67mm to 70mm coolers.",
        B0CKVZ2NZ1: "The NH-L9x65 uses a 92mm fan on a 95x95mm footprint that keeps clear of the RAM and first PCIe slot. It is a tidy fit for mini-ITX boards with a 65W CPU.",
        B0BB621NMK: "The AXP90-X47 is 47mm tall with four heat pipes and a 92mm fan. It is the slimmest option here with an AM5 listing.",
        B075SG1T3X: "The NH-L9a-AM4 is just 37mm tall. The maker specifies AM4 only; AM5 shares the mounting, but confirm support on Noctua's site before an AM5 build.",
      },
      intro: [
        "Low-profile coolers let small and slim cases run a desktop CPU, but they trade height for cooling capacity. The right one is the largest that fits your case's cooler height limit.",
        `We compared six coolers from 37mm to 70mm tall on height, fan size, heat pipes and sockets. ${research}`,
      ],
      bottomLine: [
        "The Noctua NH-L12S is the pick for cases with 70mm of clearance, and the Thermalright AXP120-X67 is the value choice. The ID-Cooling IS-55 fits cases around 60mm.",
        "Below that, the Noctua NH-L9x65, Thermalright AXP90-X47 and Noctua NH-L9a-AM4 fit progressively slimmer builds with lower-power CPUs.",
      ],
      priorityCriteria: ["height", "ram"], related: ["best-cpu-coolers", "best-thermal-pastes", "plan-a-pc-build"],
    },
  },
  {
    schema: aioSchema, facts: aioFacts,
    cfg: {
      slug: "best-360mm-aio-coolers", category: "components", updatedAt,
      seoTitle: "Best 360mm AIO Coolers", title: "The Best 360mm AIO Liquid Coolers", breadcrumbLabel: "Best 360mm AIO Coolers", mainKeyword: "best 360mm aio",
      dek: "Six 360mm AIO liquid coolers compared on pump, fan speeds, cabling, displays and socket support for high-power CPUs.",
      metaDescription: "Six 360mm AIO liquid coolers compared on pump and fan speeds, cabling, LCD screens and AM5 or LGA1851 support, for cooling high-power CPUs quietly.",
      teaser: "Confirm your case takes a 360mm radiator at the top or front before comparing pumps and screens.",
      asins: ["B0DLWGG85P", "B0DF7C4YPQ", "B0D6BFBLTK", "B0F5SZK3WX", "B0F8HTLRND", "B0DM4BRSV5"],
      labels: {
        B0DLWGG85P: L("Best 360mm AIO", "offset mounting, a VRM fan and a contact frame for Intel", "High-power CPUs in performance-focused builds."),
        B0DF7C4YPQ: L("Simplest Setup", "daisy-chained fans with no software required", "Builders who want an AIO without a hub or app."),
        B0D6BFBLTK: L("Best for Corsair Ecosystems", "a one-cable iCUE LINK hub", "Builds already using Corsair iCUE LINK."),
        B0F5SZK3WX: L("Best with a Display", "a 1.54-inch pump-head LCD", "Showcase builds that want a temperature readout."),
        B0F8HTLRND: L("Best Budget 360mm", "a 2800 RPM pump and 2000 RPM fans at a budget price", "Budget builds with a hot CPU."),
      },
      takes: {
        B0DLWGG85P: "The Liquid Freezer III Pro 360 is built around cooling rather than lighting: offset mounting over the CPU hotspot, a contact frame for Intel and a small fan for the board's power stages. Its fan cables run inside the tube sleeve for a tidy build.",
        B0DF7C4YPQ: "The Nautilus 360 RS keeps things simple: its fans daisy-chain and connect straight to the motherboard, with no hub or software needed. Corsair rates the pump at 20 dBA.",
        B0D6BFBLTK: "The Titan 360 RX runs pump and fans through one iCUE LINK hub, with fans up to 2100 RPM and a zero RPM mode. It fits builds already in Corsair's ecosystem.",
        B0F5SZK3WX: "The Kraken Plus 360 adds a 1.54-inch LCD to NZXT's pump for temperatures or custom images, with zero RPM fan control through NZXT CAM.",
        B0F8HTLRND: "The Aqua Elite 360 V6 is the budget route to a 360mm radiator, listing a 2800 RPM pump and 2000 RPM fans. It suits a hot CPU when the budget is tight.",
        B0DM4BRSV5: "The Coreliquid A13 360 moves the pump into the radiator, leaving a slim block on the CPU. Its 390mm tubes give room for front or top mounting.",
      },
      intro: [
        "A 360mm AIO spreads heat over three fans, so high-power CPUs can hold their boost clocks with the fans at modest speeds. It needs a case that fits the radiator at the top or front.",
        `We compared six 360mm AIOs on pumps, fans, cabling, extras and socket support. ${research}`,
      ],
      bottomLine: [
        "The Arctic Liquid Freezer III Pro 360 is the pick for cooling, and the Corsair Nautilus 360 RS is the simplest to install. The Corsair Titan 360 RX and NZXT Kraken Plus 360 suit software-managed and display-focused builds.",
        "The Thermalright Aqua Elite 360 V6 is the budget choice, and the MSI Coreliquid A13 360 moves the pump off the CPU.",
      ],
      priorityCriteria: ["radiator-fit", "cpu-heat"], related: ["best-280mm-aio-coolers", "best-240mm-aio-coolers", "best-cpu-coolers"],
    },
  },
  {
    schema: aioSchema, facts: aioFacts,
    cfg: {
      slug: "best-280mm-aio-coolers", category: "components", updatedAt,
      seoTitle: "Best 280mm AIO Coolers", title: "The Best 280mm AIO Liquid Coolers", breadcrumbLabel: "Best 280mm AIO Coolers", mainKeyword: "best 280mm aio",
      dek: "Five 280mm AIO liquid coolers compared on pump, 140mm fans, displays, cabling and socket support for cases that fit two large fans.",
      metaDescription: "Five 280mm AIO liquid coolers compared on pump speed, 140mm fans, displays, cabling and socket support, for cases that fit a 280mm radiator.",
      teaser: "A 280mm radiator needs 140mm fan mounts; check your case before weighing screens and software.",
      asins: ["B09W2GLV3D", "B0F5SJS2JB", "B0C6Q25HTR", "B0FG7LGDDL", "B0FNMP513T"],
      labels: {
        B09W2GLV3D: L("Best Value 280mm", "a 2900 RPM pump and 140mm fans at a budget price", "Budget builds that fit a 280mm radiator."),
        B0F5SJS2JB: L("Best with an LCD", "a 1.54-inch LCD with zero RPM fans", "Showcase builds with NZXT CAM."),
        B0FG7LGDDL: L("Largest Display", "a 2.88-inch IPS screen", "Builds centred on the pump-head screen."),
        B0FNMP513T: L("Quiet-Focused Pick", "Pure Wings 3 fans and a PWM pump with a six-pole motor", "Quiet builds without RGB software."),
      },
      takes: {
        B09W2GLV3D: "The FX280 PRO SE keeps its details simple: a 2900 RPM pump rated at 25dB(A), two 140mm fans at 300 to 1800 RPM and 400mm tubes. It is the value route to a 280mm radiator.",
        B0F5SJS2JB: "The Kraken Plus 280 pairs 140mm fans with NZXT's 1.54-inch LCD pump head and zero RPM mode. It suits builders who want a display without a separate controller.",
        B0C6Q25HTR: "The H115i RGB runs pump and fans through Corsair's iCUE LINK hub, with fans up to 2000 RPM and zero RPM mode. It belongs in Corsair-based builds.",
        B0FG7LGDDL: "The Galahad II LCD 280 has the largest screen here, a 2.88-inch IPS panel, on an Asetek pump rated up to 3600 RPM. Its fans use wireless lighting and speed control.",
        B0FNMP513T: "The Pure Loop 3 280 is be quiet!'s low-noise take, with Pure Wings 3 fans that daisy-chain and a PWM pump. It suits quiet builds that skip RGB software.",
      },
      intro: [
        "A 280mm AIO uses two 140mm fans, which move air at lower speeds than 120mm fans. It is a good middle ground between 240mm and 360mm for cases with 140mm mounts.",
        `We compared five 280mm AIOs on pumps, fans, cabling, displays and socket support. ${research} We limited the list to five because too few other 280mm listings state enough detail to compare.`,
      ],
      bottomLine: [
        "The ID-Cooling FX280 PRO SE is the value pick, the NZXT Kraken Plus 280 and Lian Li Galahad II LCD 280 suit display builds, and the Corsair H115i RGB fits iCUE setups.",
        "The be quiet! Pure Loop 3 280 is the choice for quiet builds.",
      ],
      priorityCriteria: ["radiator-fit", "cabling"], related: ["best-360mm-aio-coolers", "best-240mm-aio-coolers", "best-cpu-coolers"],
    },
  },
  {
    schema: aioSchema, facts: aioFacts,
    cfg: {
      slug: "best-240mm-aio-coolers", category: "components", updatedAt,
      seoTitle: "Best 240mm AIO Coolers", title: "The Best 240mm AIO Liquid Coolers", breadcrumbLabel: "Best 240mm AIO Coolers", mainKeyword: "best 240mm aio",
      dek: "Six 240mm AIO liquid coolers compared on pump and fan speed, cabling, displays and socket support for mid-size cases.",
      metaDescription: "Six 240mm AIO liquid coolers compared on pump and fan speed, cabling, LCD screens and socket support, for gaming CPUs in mid-size and compact cases.",
      teaser: "A 240mm radiator fits most cases; check socket support and how many fan headers the cooler needs.",
      asins: ["B0F6M1MR4P", "B0C6PX2BW1", "B0F5S84X8P", "B0CCNS5NZ9", "B0DM4CBKFY"],
      labels: {
        B0F6M1MR4P: L("Best Value 240mm", "a pump up to 5300 RPM and 2000 RPM fans", "Budget gaming builds with a mid-size case."),
        B0FRPMHJGX: L("Simplest Setup", "daisy-chained fans with no software required", "Builders who want a clean install without a hub."),
        B0C6PX2BW1: L("Fastest Fans", "fans up to 2400 RPM with zero RPM mode", "Corsair iCUE builds that want headroom."),
        B0F5S84X8P: L("Best with a Display", "a 1.54-inch pump-head LCD", "Compact showcase builds."),
        B0CCNS5NZ9: L("Budget Low-Speed Pick", "1500 RPM fans and a pump rated for 40,000 hours", "Budget builds that favour lower fan speeds."),
      },
      takes: {
        B0F6M1MR4P: "The Frozen Notte 240 offers a pump up to 5300 RPM and 2000 RPM fans at a budget price. Thermalright recommends a case wider than 250mm, so check the width.",
        B0FRPMHJGX: "The Nautilus 240 RS runs its daisy-chained fans straight from the motherboard, with no hub or app, and a pump Corsair rates at 20 dBA.",
        B0C6PX2BW1: "The H100i RGB lists the fastest fans here at 2400 RPM, with zero RPM mode for idle. It runs through Corsair's iCUE LINK hub.",
        B0F5S84X8P: "The Kraken Plus 240 brings NZXT's 1.54-inch LCD pump head to a 240mm radiator for smaller cases.",
        B0CCNS5NZ9: "The Aqua Elite 240 V3 is a budget AIO with a 2800 RPM pump rated for 40,000 hours and 1500 RPM fans, which favour quiet over headroom.",
        B0DM4CBKFY: "The Coreliquid A13 240 puts the pump in the radiator and uses 390mm tubes, which makes front mounting easy in compact cases.",
      },
      intro: [
        "A 240mm AIO fits nearly every mid-size case and handles most gaming CPUs. The differences between models are mostly in fan speed, cabling and extras.",
        `We compared six 240mm AIOs on pumps, fans, cabling and socket support. ${research}`,
      ],
      bottomLine: [
        "The Thermalright Frozen Notte 240 is the value pick, the Corsair Nautilus 240 RS is the simplest install and the Corsair H100i RGB has the most fan headroom.",
        "The NZXT Kraken Plus 240 adds a display, the Thermalright Aqua Elite 240 V3 is the quiet budget choice, and the MSI Coreliquid A13 240 suits front mounting.",
      ],
      priorityCriteria: ["cpu-heat", "cabling"], related: ["best-280mm-aio-coolers", "best-360mm-aio-coolers", "best-cpu-coolers"],
    },
  },
  {
    schema: pasteSchema, facts: pasteFacts,
    cfg: {
      slug: "best-thermal-pastes", category: "components", updatedAt,
      seoTitle: "Best Thermal Pastes for CPUs", title: "The Best Thermal Pastes for CPUs and GPUs", breadcrumbLabel: "Best Thermal Pastes", mainKeyword: "best thermal paste",
      dek: "Seven thermal pastes compared on durability, conductivity, tube size and what comes in the box, for CPU installs and GPU repasting.",
      metaDescription: "Seven thermal pastes compared on pump-out resistance, electrical safety, tube size and included tools, for new CPU installs and GPU repasting jobs.",
      teaser: "Good pastes differ by a few degrees; durability and a non-conductive formula matter more than headline figures.",
      asins: ["B0FT2XSPSN", "B09VDL3CW6", "B0DSTWDYD2", "B07MZ45X9G", "B011F7W3LU", "B0BPKTNPL3", "B0BFF1T9PD"],
      labels: {
        B0FT2XSPSN: L("Most Durable Pick", "a formula built against pump-out and dry-out", "Hot CPUs you do not want to repaste."),
        B09VDL3CW6: L("Best Value", "4g of non-conductive paste suited to direct-die use", "Regular builders and GPU repasting."),
        B07MZ45X9G: L("Easiest to Apply", "no spreading needed, with three wipes included", "First-time builders."),
        B011F7W3LU: L("Best Small Tube", "a 1g syringe with spatula", "A single build or remount."),
      },
      takes: {
        B0FT2XSPSN: "MX-7 is Arctic's dense, high-filler paste, built to resist pump-out and drying on hot CPUs. It cannot be spread by hand, so apply a dot and let the cooler's pressure do the work.",
        B09VDL3CW6: "MX-6 is the dependable all-rounder: 4g of non-conductive paste that Arctic says beats MX-4, with a consistency suited to bare GPU dies. It is the value choice for regular use.",
        B0DSTWDYD2: "Duronaut is Thermal Grizzly's long-life paste, built to minimise pump-out and sold with a spatula. It suits high-power CPUs that run hot for hours.",
        B07MZ45X9G: "NT-H2 comes with three cleaning wipes and needs no spreading. Noctua rates it for up to five years on the CPU, which suits builders who set it and forget it.",
        B011F7W3LU: "Kryonaut is the long-standing enthusiast paste, sold here as a 1g syringe with a spatula. It is enough for one or two large CPUs.",
        B0BPKTNPL3: "TF7 offers 12.8 W/mK and a wide temperature range in a non-conductive formula. It is a low-cost option for a CPU or GPU repaste.",
        B0BFF1T9PD: "XTM70 includes an applicator kit and three wipes, with a low viscosity that spreads easily. Corsair rates it for CPUs up to 250W and beyond.",
      },
      intro: [
        "Among reputable thermal pastes, temperatures usually differ by only a few degrees. What separates them is how long they last on a hot CPU, whether they are safe if they spill and how easy they are to apply.",
        `We compared seven pastes on the maker's durability claims, electrical safety, tube size and included tools. ${research} Conductivity figures are the makers' own and are not measured on a common standard, so we do not rank on them.`,
      ],
      bottomLine: [
        "Arctic MX-7 is the pick for durability on hot CPUs, and MX-6 is the best value for regular builds and GPU repasting. Thermal Grizzly Duronaut is the other long-life option.",
        "Noctua NT-H2 is the easiest to apply, Kryonaut suits a single build, and Thermalright TF7 and Corsair XTM70 are low-cost alternatives.",
      ],
      priorityCriteria: ["gap", "durability"], related: ["best-cpu-coolers", "best-low-profile-cpu-coolers", "upgrade-an-existing-pc"],
    },
  },
];
