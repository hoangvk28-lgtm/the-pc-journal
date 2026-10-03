import type { CategorySchema, Fact, GenericArticleConfig } from "@/lib/pc-compose/generic";
import { gpuFacts, gpuRangeSchema } from "@/data/categories/gpu";

/**
 * Batch 6: graphics cards. Asin order = editorial rank; takes, intro and bottom line
 * are written per article from the fact sheet in data/categories/gpu.ts.
 */
const updatedAt = "2026-09-26";
const L = (badge: string, reason: string, bestFor: string) => ({ badge, reason, bestFor });
const s = gpuRangeSchema, f = gpuFacts;

export const batch6: { cfg: GenericArticleConfig; schema: CategorySchema; facts: Record<string, Fact> }[] = [
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-graphics-cards", category: "components", updatedAt,
      seoTitle: "Best Graphics Cards at Every Budget", title: "The Best Graphics Cards", breadcrumbLabel: "Best Graphics Cards", mainKeyword: "best graphics card",
      dek: "Six graphics cards from an Intel Arc B580 to an RTX 5080, compared on video memory, size, power needs and cooling, one for each budget tier.",
      metaDescription: "Six graphics cards from Intel Arc B580 to RTX 5080 compared on VRAM, card size, power connectors and cooling, so you can match one to your budget and monitor.",
      teaser: "Start with your monitor and budget, then check VRAM, card length and the power plug your PSU must supply.",
      asins: ["B0DS2QG2KW", "B0FST71VP9", "B0GK8N9DR7", "B0DYG7KB27", "B0F8B59WP7", "B0DNV4NWF7"],
      labels: {
        B0DS2QG2KW: L("Best Value High-End", "16GB of GDDR6 on an RX 9070 XT, priced well below the RTX 5080 picks at the time of writing", "1440p high-refresh and entry 4K gaming."),
        B0FST71VP9: L("Best NVIDIA Upper Mid-Range", "an RTX 5070 Ti with 16GB of GDDR7 and the SFF-Ready label", "DLSS users who want 16GB without RTX 5080 pricing."),
        B0GK8N9DR7: L("Fastest Pick", "the RTX 5080, the highest GPU tier in this guide", "4K gaming with ray tracing."),
        B0DYG7KB27: L("Best 12GB NVIDIA Card", "an RTX 5070 with 12GB of GDDR7 and three TORX fans", "1440p gaming on a mid-range budget."),
        B0F8B59WP7: L("Best 16GB for Less", "16GB of VRAM with a 550W PSU recommendation and a 249mm length", "Budget 1440p builds that want memory headroom."),
        B0DNV4NWF7: L("Best Entry Card", "12GB of VRAM and a 249mm, two-slot card from Intel", "First gaming builds on a tight budget."),
      },
      takes: {
        B0DS2QG2KW: "Gigabyte's RX 9070 XT Gaming OC pairs AMD's top RDNA 4 chip with 16GB of GDDR6 and a WINDFORCE cooler. At the time of writing it cost about half as much as the RTX 5080 cards we researched, which makes it the strongest value in the upper tiers.",
        B0FST71VP9: "MSI's Ventus 3X PZ puts the RTX 5070 Ti and 16GB of GDDR7 in a card with NVIDIA's SFF-Ready label. It is the card to pick when DLSS support matters and 12GB feels too tight.",
        B0GK8N9DR7: "Zotac's Solid Core carries the RTX 5080 in a 2.5-slot card with a vapor chamber and a support stand in the box. It is the fastest chip here, and the price reflects that.",
        B0DYG7KB27: "The Ventus 3X is MSI's plain take on the RTX 5070: three TORX fans, a copper baseplate and 12GB of GDDR7. Three DisplayPort 2.1a outputs and one HDMI 2.1b cover most monitor setups.",
        B0F8B59WP7: "ASRock's Challenger gives the RX 9060 XT a full 16GB of memory in a two-slot, 249mm card. The maker offers a 550W power supply and a single 8-pin plug, so it drops into most existing builds.",
        B0DNV4NWF7: "Intel's Arc B580 brings 12GB of GDDR6 to the entry tier, more than the 8GB common at this price. ASRock's Challenger version is 249mm long and needs one 8-pin plug and a 650W PSU.",
      },
      intro: [
        "The right graphics card depends less on which is fastest than on your monitor, your budget and what your case and power supply can take. These six picks cover the main price tiers, from an entry Intel card to an RTX 5080.",
        "Our picks are based on research: maker specifications and Amazon listings, compared side by side. We have not benchmarked these cards ourselves, so check independent reviews for frame rates in the games you play.",
      ],
      bottomLine: [
        "The Gigabyte RX 9070 XT Gaming OC is the value pick for high-end gaming, the MSI RTX 5070 Ti Ventus 3X is the NVIDIA alternative with 16GB, and the Zotac RTX 5080 Solid Core is the fastest card here.",
        "For mid-range 1440p, the MSI RTX 5070 Ventus 3X is the 12GB choice; the ASRock RX 9060 XT 16GB and the Arc B580 cover tighter budgets.",
      ],
      priorityCriteria: ["resolution", "vram"], related: ["best-budget-graphics-cards", "best-graphics-cards-for-1440p", "best-rtx-5070-ti-graphics-cards", "check-a-graphics-card-upgrade"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-budget-graphics-cards", category: "components", updatedAt,
      seoTitle: "Best Budget Graphics Cards", title: "The Best Budget Graphics Cards", breadcrumbLabel: "Best Budget Graphics Cards", mainKeyword: "best budget gpu",
      dek: "Six low-cost graphics cards from Intel, AMD and NVIDIA compared on VRAM, power needs and size, for 1080p gaming without overspending.",
      metaDescription: "Six budget graphics cards from Intel Arc, Radeon and GeForce compared on VRAM, PSU needs, power plugs and size, to find the best 1080p card for the least money.",
      teaser: "At this price, memory varies from 8GB to 12GB; check VRAM before clock speeds.",
      asins: ["B0DNV4NWF7", "B0DQYM2MHX", "B0FBX7FB1T", "B0F8LDHQ7Y", "B0FG97XMNG", "B0G6FCDZMK"],
      labels: {
        B0DNV4NWF7: L("Most VRAM on a Budget", "12GB of VRAM, the most in this guide, with a 650W PSU recommendation", "1080p and light 1440p gaming on a budget."),
        B0DQYM2MHX: L("Cheapest 10GB Card", "10GB of GDDR6 on a 160-bit bus at the lowest price here at the time of writing", "The tightest budgets that still want more than 8GB."),
        B0FBX7FB1T: L("Best Budget AMD", "an RDNA 4 RX 9060 XT with a 3290MHz listed boost", "1080p high-refresh gaming with FSR."),
        B0F8LDHQ7Y: L("Best Budget NVIDIA", "an RTX 5060 with GDDR7 memory", "DLSS 4 support on a budget."),
        B0FG97XMNG: L("Most Compact", "a two-slot, SFF-Ready card with a single 8-pin plug", "Small cases and older power supplies."),
        B0G6FCDZMK: L("Easiest on Power", "a 550W PSU recommendation with 32MB of Infinity Cache", "Upgrading an older PC with a modest power supply."),
      },
      takes: {
        B0DNV4NWF7: "The Arc B580 gives 12GB of memory at a price where most cards stop at 8GB. ASRock's Challenger is a 249mm two-slot card with 0dB fan stop and a single 8-pin plug.",
        B0DQYM2MHX: "The Arc B570 is the B580's cheaper sibling with 10GB of memory on a 160-bit bus. It was the least expensive card here at the time of writing and still offers three DisplayPort 2.1 outputs.",
        B0FBX7FB1T: "ASRock's RX 9060 XT Challenger 8GB brings AMD's RDNA 4 architecture to a budget card with 32 compute units. Its 8GB of memory is the compromise; the 16GB version costs more.",
        B0F8LDHQ7Y: "Gigabyte's RTX 5060 Windforce is the budget route to DLSS 4 and GDDR7 memory. The maker publishes few details, so confirm length and power needs on Gigabyte's spec page before buying.",
        B0FG97XMNG: "Zotac's RTX 5050 Twin Edge is a two-slot, SFF-Ready card with two 90mm fans and one 8-pin plug. It is the smallest NVIDIA option here for a compact case.",
        B0G6FCDZMK: "The RX 7600 is a previous-generation chip, but ASRock's Challenger Pro version asks only for a 550W power supply and uses a triple-fan cooler. Its PCIe 4.0 x8 link is worth noting on older PCIe 3.0 boards.",
      },
      intro: [
        "A budget graphics card has to balance three things: enough memory for current games, a price that makes sense, and power needs your existing PSU can handle. The six cards here come from all three GPU makers.",
        "This comparison is research-based, drawn from maker specifications and Amazon listings rather than our own testing. Prices were checked when the guide was updated and change often.",
      ],
      bottomLine: [
        "The ASRock Arc B580 Challenger is the budget card to beat for memory, and the Arc B570 is the cheapest way to get more than 8GB.",
        "The ASRock RX 9060 XT 8GB and Gigabyte RTX 5060 suit AMD and NVIDIA fans, the Zotac RTX 5050 fits small cases, and the ASRock RX 7600 Challenger Pro is easiest on an older PSU.",
      ],
      priorityCriteria: ["vram", "power"], related: ["best-graphics-cards", "best-graphics-cards-for-1080p", "best-power-supplies-under-100", "check-a-graphics-card-upgrade"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-graphics-cards-for-1440p", category: "components", updatedAt,
      seoTitle: "Best Graphics Cards for 1440p Gaming", title: "The Best Graphics Cards for 1440p Gaming", breadcrumbLabel: "Best GPUs for 1440p", mainKeyword: "best gpu for 1440p",
      dek: "Five graphics cards for 1440p gaming, from an RTX 5060 Ti 16GB to an RX 9070 XT, compared on memory, power needs and cooling.",
      metaDescription: "Five graphics cards for 1440p gaming compared on VRAM, power connectors, PSU needs and cooler size, from the RTX 5060 Ti 16GB up to the Radeon RX 9070 XT.",
      teaser: "1440p is where 12GB to 16GB of VRAM starts to matter; check the power plugs too.",
      asins: ["B0DTTKCTRD", "B0DS6WPTLL", "B0DW4FRCQR", "B0F7WB6LSH", "B0FC2XXSG5"],
      labels: {
        B0DTTKCTRD: L("Best for 1440p", "16GB on a 256-bit bus with a 290mm length and 700W PSU recommendation", "High-refresh 1440p gaming."),
        B0DS6WPTLL: L("Best NVIDIA for 1440p", "an RTX 5070 with 12GB of GDDR7 and a dual BIOS", "DLSS users at 1440p."),
        B0DW4FRCQR: L("Most Headroom", "the RX 9070 XT, the fastest chip in this guide", "1440p at maximum settings and 240Hz monitors."),
        B0F7WB6LSH: L("Best 16GB NVIDIA Value", "16GB of GDDR7 on an RTX 5060 Ti", "1440p with high textures on a mid budget."),
        B0FC2XXSG5: L("Lowest-Priced 16GB Card", "16GB of GDDR6 at the lowest price here at the time of writing", "Entry 1440p builds."),
      },
      takes: {
        B0DTTKCTRD: "ASRock's RX 9070 Challenger is the most completely documented card here: 290mm long, 2.5 slots, two 8-pin plugs and a 700W PSU. Its 16GB of memory on a 256-bit bus suits 1440p at high settings.",
        B0DS6WPTLL: "The ASUS Prime RTX 5070 is a 2.5-slot, SFF-Ready card with a quiet/performance BIOS switch. Its 12GB of GDDR7 is enough for most games at 1440p, though less than the 16GB AMD cards here.",
        B0DW4FRCQR: "XFX's Swift RX 9070 XT uses AMD's top RDNA 4 chip with 16GB of memory and a 2970MHz boost. It is the card to choose for a 240Hz 1440p monitor.",
        B0F7WB6LSH: "The ASUS Dual RTX 5060 Ti 16GB is the lower-cost NVIDIA route to 16GB at 1440p. It is a 2.5-slot card with 0dB fan stop and dual-ball fan bearings.",
        B0FC2XXSG5: "XFX's Swift RX 9060 XT is the cheapest 16GB card in this guide, with a dual-fan cooler and a 3320MHz boost. It suits 1440p at medium to high settings.",
      },
      intro: [
        "1440p is the sweet spot for many gamers: sharper than 1080p without the cost of 4K. It is also where 8GB cards start to run short, so all five picks here have 12GB or more.",
        "We researched these cards from maker specifications and retailer listings; no frame rates here come from our own testing. Check independent reviews for results in your games.",
      ],
      bottomLine: [
        "The ASRock RX 9070 Challenger is the balanced 1440p choice, the XFX RX 9070 XT gives the most headroom, and the ASUS Prime RTX 5070 is the NVIDIA option.",
        "On a smaller budget, the ASUS Dual RTX 5060 Ti 16GB and the XFX RX 9060 XT 16GB keep 16GB of memory for less.",
      ],
      priorityCriteria: ["vram", "resolution"], related: ["best-1440p-gaming-monitors", "best-graphics-cards", "best-graphics-cards-for-4k", "best-750w-power-supplies"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-graphics-cards-for-4k", category: "components", updatedAt,
      seoTitle: "Best Graphics Cards for 4K Gaming", title: "The Best Graphics Cards for 4K Gaming", breadcrumbLabel: "Best GPUs for 4K", mainKeyword: "best gpu for 4k",
      dek: "Five graphics cards for 4K gaming, from the RX 9070 XT to the RTX 5090, compared on VRAM, card size, power plugs and PSU needs.",
      metaDescription: "Five graphics cards for 4K gaming compared on VRAM, length, slot width, power connectors and PSU needs, from the Radeon RX 9070 XT up to the GeForce RTX 5090.",
      teaser: "4K cards are large and power-hungry; measure your case and check the 16-pin cable before you buy.",
      asins: ["B0DQSMMCSH", "B0GVGP3JG3", "B0DS6V7L5M", "B0DTT7CPWV", "B0GK7DH248"],
      labels: {
        B0DQSMMCSH: L("Best for 4K", "an RTX 5080 with 16GB of GDDR7 and a 3.6-slot cooler", "4K gaming with ray tracing."),
        B0GVGP3JG3: L("Best Value RTX 5080", "the RTX 5080 chip at a lower price than the TUF at the time of writing", "4K on NVIDIA without premium cooler pricing."),
        B0DS6V7L5M: L("Best Entry 4K NVIDIA", "an RTX 5070 Ti at 306mm and 2.5 slots with a 750W PSU recommendation", "4K with DLSS in a mid-size case."),
        B0DTT7CPWV: L("Best AMD for 4K", "an RX 9070 XT using two 8-pin plugs instead of a 16-pin connector", "4K on a lower budget with standard PCIe cables."),
        B0GK7DH248: L("Most VRAM", "32GB of GDDR7 on a 512-bit bus", "4K at maximum settings and local AI work."),
      },
      takes: {
        B0DQSMMCSH: "The ASUS TUF RTX 5080 offers every figure a builder needs: 348mm long, 3.6 slots, a 16-pin 12V-2x6 plug and an 850W PSU. Its large cooler and protective PCB coating suit a long-term 4K build.",
        B0GVGP3JG3: "MSI's Ventus 3X Black puts the same RTX 5080 chip and 16GB of GDDR7 in a plainer card. It cost less than the ASUS TUF at the time of writing, but MSI does not list its length in this listing.",
        B0DS6V7L5M: "The ASUS Prime RTX 5070 Ti is the smallest documented 4K option here at 306mm and 2.5 slots. With DLSS, its 16GB of GDDR7 handles 4K in many games at tuned settings.",
        B0DTT7CPWV: "ASRock's RX 9070 XT Steel Legend is the AMD route to 4K, with 16GB of GDDR6 and a reinforced metal frame. It uses two 8-pin plugs, which suits power supplies without a 16-pin cable, but the maker recommends 800W.",
        B0GK7DH248: "The ASUS TUF RTX 5090 is in a class of its own with 32GB of GDDR7 and 21,760 CUDA cores. At the time of writing it cost several times more than the other cards here, so it only makes sense when nothing slower will do.",
      },
      intro: [
        "4K gaming asks the most of a graphics card, and the cards that handle it are long, thick and power-hungry. Before comparing speed, check your case clearance, your PSU wattage and whether it has a 16-pin 12V-2x6 cable.",
        "This is a research-led comparison drawn from maker specifications and listings; we did not measure performance ourselves. Independent reviews give the best view of 4K frame rates.",
      ],
      bottomLine: [
        "The ASUS TUF RTX 5080 is the most complete 4K pick, the MSI Ventus 3X delivers the same chip for less, and the ASUS Prime RTX 5070 Ti is the smaller, cheaper entry to 4K.",
        "The ASRock RX 9070 XT Steel Legend is the AMD choice with standard 8-pin plugs, and the ASUS TUF RTX 5090 is for those who need 32GB and the fastest chip.",
      ],
      priorityCriteria: ["fit", "power"], related: ["best-850w-power-supplies", "best-1000w-power-supplies", "best-graphics-cards-for-1440p", "best-full-tower-cases"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-amd-graphics-cards", category: "components", updatedAt,
      seoTitle: "Best AMD Radeon Graphics Cards", title: "The Best AMD Radeon Graphics Cards", breadcrumbLabel: "Best AMD GPUs", mainKeyword: "best amd gpu",
      dek: "Five Radeon graphics cards from the RX 7600 to the RX 9070 XT, compared on VRAM, size, power plugs and cooling.",
      metaDescription: "Five AMD Radeon graphics cards from the RX 7600 to the RX 9070 XT compared on VRAM, card size, power connectors and PSU needs, for 1080p through 4K builds.",
      teaser: "Radeon cards use standard 8-pin plugs here; check how many your PSU has spare.",
      asins: ["B0DRRMZDH6", "B0DXLBTL4B", "B0DTT7CPWV", "B0F91K2KBX", "B0G6FCDZMK"],
      labels: {
        B0DRRMZDH6: L("Best AMD High-End", "an RX 9070 XT with a 3030MHz OC-mode boost and a 2.5-slot cooler", "1440p and 4K gaming on AMD."),
        B0DXLBTL4B: L("Best Mid-Range Radeon", "16GB of GDDR6 on the RX 9070", "1440p gaming for less than an RX 9070 XT."),
        B0DTT7CPWV: L("Best Documented RX 9070 XT", "a 298mm length, 2.9-slot width and 800W PSU guidance", "Builders who want every fit figure up front."),
        B0F91K2KBX: L("Best Budget Radeon", "an RX 9060 XT with a WINDFORCE cooler", "1080p gaming on RDNA 4."),
        B0G6FCDZMK: L("Lowest Power Needs", "a 550W PSU recommendation", "Older PCs with a smaller power supply."),
      },
      takes: {
        B0DRRMZDH6: "ASUS's Prime RX 9070 XT lists the highest boost clock among these Radeon cards and keeps to 2.5 slots. A quiet/performance BIOS switch and 0dB fan stop make it easy to live with.",
        B0DXLBTL4B: "The RX 9070 keeps 16GB of memory but costs less than the XT. XFX's Swift version uses a triple-fan cooler with a 2700MHz boost and three DisplayPort outputs.",
        B0DTT7CPWV: "ASRock's Steel Legend is the RX 9070 XT to choose when you want to check the fit before buying: 298mm long, 2.9 slots, two 8-pin plugs and an 800W PSU are all listed.",
        B0F91K2KBX: "Gigabyte's RX 9060 XT Gaming OC 8GB is the entry to AMD's RDNA 4 generation, with Hawk fans and RGB lighting. Its 8GB of memory suits 1080p more than 1440p.",
        B0G6FCDZMK: "The RX 7600 is the older RDNA 3 chip, but ASRock's Challenger Pro asks for only a 550W PSU and one 8-pin plug. It is 303mm long, so check clearance in small cases.",
      },
      intro: [
        "AMD's Radeon line runs from budget 1080p cards to the RX 9070 XT, and every card here uses standard 8-pin PCIe power plugs rather than a 16-pin connector. The main choices are how much memory you need and how large a card your case takes.",
        "We compared these five Radeon cards using maker specifications and Amazon listings; the guide is research-based, not a hands-on test. Check FSR support in the games you play.",
      ],
      bottomLine: [
        "The ASUS Prime RX 9070 XT is the best all-round Radeon, the XFX Swift RX 9070 keeps 16GB for less, and the ASRock Steel Legend is the best-documented RX 9070 XT.",
        "For 1080p, the Gigabyte RX 9060 XT 8GB is the current-generation budget pick, and the ASRock RX 7600 Challenger Pro suits older, lower-wattage systems.",
      ],
      priorityCriteria: ["features", "power"], related: ["best-amd-cpus-for-gaming", "best-graphics-cards", "best-graphics-cards-for-4k", "best-750w-power-supplies"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-nvidia-graphics-cards", category: "components", updatedAt,
      seoTitle: "Best NVIDIA GeForce Graphics Cards", title: "The Best NVIDIA GeForce Graphics Cards", breadcrumbLabel: "Best NVIDIA GPUs", mainKeyword: "best nvidia gpu",
      dek: "Six GeForce RTX 50-series cards from the RTX 5050 to the RTX 5090, compared on VRAM, cooler size and power needs.",
      metaDescription: "Six NVIDIA GeForce RTX 50-series cards from RTX 5050 to RTX 5090 compared on VRAM, cooler thickness, power plugs and size, to pick the right tier for you.",
      teaser: "Every card here supports DLSS 4; the choice comes down to memory, size and budget.",
      asins: ["B0GZR4P62R", "B0DS6S98ZF", "B0FKSMSGMD", "B0F8PR9L3X", "B0FFXT3TRD", "B0GK7DH248"],
      labels: {
        B0GZR4P62R: L("Best High-End GeForce", "an RTX 5080 in a 2.5-slot, SFF-Ready card", "4K gaming in a mid-size or compact case."),
        B0DS6S98ZF: L("Best RTX 5070", "a 3.125-slot TUF cooler with a GPU Guard bracket", "Quiet 1440p gaming."),
        B0FKSMSGMD: L("Best White Card", "16GB of GDDR7 in a white, two-slot RTX 5060 Ti", "White-themed builds at 1440p."),
        B0F8PR9L3X: L("Best Mainstream GeForce", "an RTX 5060 with GDDR7 and the SFF-Ready label", "1080p high-refresh gaming."),
        B0FFXT3TRD: L("Best Entry GeForce", "a two-slot RTX 5050 with a dual BIOS", "Budget builds that want DLSS 4."),
        B0GK7DH248: L("Fastest GeForce", "32GB of GDDR7 on the RTX 5090", "Maximum-settings 4K and AI workloads."),
      },
      takes: {
        B0GZR4P62R: "The ASUS Prime RTX 5080 EVO fits NVIDIA's second-fastest chip into 2.5 slots with the SFF-Ready label. A MaxContact heat spreader and 0dB fan stop round it out.",
        B0DS6S98ZF: "The ASUS TUF RTX 5070 trades size for cooling, with a 3.125-slot heatsink and three axial fans. The GPU Guard bracket helps against sag and the PCB carries a protective coating.",
        B0FKSMSGMD: "Zotac's RTX 5060 Ti Twin Edge White pairs 16GB of GDDR7 with a white shroud in a two-slot, SFF-Ready card. It needs only one 8-pin plug.",
        B0F8PR9L3X: "The ASUS Dual RTX 5060 is a 2.5-slot, SFF-Ready card with GDDR7 memory and DisplayPort 2.1b. Its 8GB of memory is best matched to a 1080p monitor.",
        B0FFXT3TRD: "The ASUS Dual RTX 5050 is the least expensive GeForce here, a two-slot card with a dual BIOS and 0dB fan stop. It brings DLSS 4 to budget builds, with 8GB of GDDR6.",
        B0GK7DH248: "The ASUS TUF RTX 5090 is NVIDIA's flagship with 32GB of GDDR7 on a 512-bit bus. It cost many times more than the RTX 5080 cards at the time of writing, so it is for buyers with a specific need.",
      },
      intro: [
        "Every GeForce RTX 50-series card supports DLSS 4 and NVIDIA's video encoder, so the decision is mostly about the chip tier, memory and cooler size. These six cards span the range from the RTX 5050 to the RTX 5090.",
        "The picks come from our research into maker specifications and Amazon listings rather than lab benchmarks. Use independent reviews to compare frame rates between tiers.",
      ],
      bottomLine: [
        "The ASUS Prime RTX 5080 EVO is the high-end pick for most builds, the ASUS TUF RTX 5070 is the quiet 1440p choice, and the Zotac RTX 5060 Ti White gives 16GB for less.",
        "The ASUS Dual RTX 5060 and RTX 5050 cover 1080p budgets, while the ASUS TUF RTX 5090 is only worth its price for the most demanding work.",
      ],
      priorityCriteria: ["features", "vram"], related: ["best-rtx-5070-ti-graphics-cards", "best-graphics-cards", "best-cpus-for-gaming", "best-850w-power-supplies"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-low-profile-graphics-cards", category: "components", updatedAt,
      seoTitle: "Best Low-Profile Graphics Cards", title: "The Best Low-Profile Graphics Cards", breadcrumbLabel: "Best Low-Profile GPUs", mainKeyword: "best low profile gpu",
      dek: "Four half-height graphics cards for slim desktops and office PCs, compared on VRAM, power plugs and outputs.",
      metaDescription: "Four low-profile graphics cards for slim desktops and office PCs compared on VRAM, power connectors, thickness and display outputs, from RTX 3050 to RTX 5060.",
      teaser: "Check the bracket, the slot width and whether your PSU has an 8-pin cable before buying.",
      asins: ["B0FSNZ686T", "B0GK8N1SND", "B0CDJLSZ73", "B0CTJZCJH1"],
      labels: {
        B0FSNZ686T: L("Best Low-Profile Card", "an RTX 5060 with GDDR7 and IP5X dust resistance", "Gaming in a slim desktop."),
        B0GK8N1SND: L("Best Documented Low-Profile", "a two-slot width, one 8-pin plug and four outputs", "Builders who need to confirm fit and power."),
        B0CDJLSZ73: L("Best Previous-Generation Pick", "an RTX 4060 with three fans and a dual BIOS", "Slim PCs where an RTX 5060 costs too much."),
        B0CTJZCJH1: L("Cheapest Low-Profile Card", "the lowest price here with two HDMI 2.1a outputs", "Light gaming and multi-monitor office PCs."),
      },
      takes: {
        B0FSNZ686T: "The ASUS RTX 5060 LP BRK brings the current mainstream GeForce to half-height cases, with GDDR7 memory and IP5X dust resistance. The maker doesn't give thickness or power needs, so check those on the ASUS spec page.",
        B0GK8N1SND: "Zotac's RTX 5060 Low Profile offers a two-slot width, one 8-pin plug and three DisplayPort 2.1b outputs plus HDMI. It uses 40mm fans with composite heatpipes.",
        B0CDJLSZ73: "Gigabyte's RTX 4060 Low Profile is the previous generation, with DLSS 3 rather than DLSS 4. Three WINDFORCE fans and a dual BIOS make it a solid fallback if the RTX 5060 cards are out of stock.",
        B0CTJZCJH1: "MSI's RTX 3050 LP is an entry card with 6GB of memory, fine for older games and esports titles. Two HDMI 2.1a ports and a DisplayPort make it useful in a multi-monitor work PC.",
      },
      intro: [
        "Slim desktops and many office PCs only take half-height cards, which rules out most gaming GPUs. Low-profile cards swap in a short bracket and a smaller cooler, and several now use current chips.",
        "This short list is based on research into maker specifications and listings; we have not fitted these cards ourselves. Check your PC's slot width and power supply before ordering.",
      ],
      bottomLine: [
        "The ASUS RTX 5060 LP BRK is the pick for gaming in a slim case, and the Zotac RTX 5060 Low Profile is the better-documented alternative.",
        "The Gigabyte RTX 4060 Low Profile is a previous-generation fallback, and the MSI RTX 3050 LP suits light gaming and multi-monitor desks.",
      ],
      priorityCriteria: ["fit", "power"], related: ["best-small-form-factor-graphics-cards", "best-low-profile-cpu-coolers", "best-mini-itx-cases", "check-a-graphics-card-upgrade"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-small-form-factor-graphics-cards", category: "components", updatedAt,
      seoTitle: "Best SFF Graphics Cards for Small Builds", title: "The Best Small Form Factor Graphics Cards", breadcrumbLabel: "Best SFF GPUs", mainKeyword: "best sff gpu",
      dek: "Six SFF-Ready graphics cards for Mini-ITX and compact builds, from the RTX 5050 to the RTX 5070 Ti, compared on thickness, memory and power.",
      metaDescription: "Six SFF-Ready graphics cards for Mini-ITX and compact cases compared on thickness, VRAM, power plugs and outputs, from the RTX 5050 up to the RTX 5070 Ti.",
      teaser: "SFF-Ready is a size guideline; still check length and slot width against your case.",
      asins: ["B0GXFGKWQX", "B0DS6V1YSY", "B0FKSMSGMD", "B0DTR7GWG6", "B0DTQMLX4F", "B0FG97XMNG"],
      labels: {
        B0GXFGKWQX: L("Best SFF Card", "an RTX 5070 Ti with 16GB in a two-slot card", "High-end gaming in a Mini-ITX case."),
        B0DS6V1YSY: L("Best SFF RTX 5070", "12GB of GDDR7 with a dual BIOS and a three-year warranty", "1440p in a compact build."),
        B0FKSMSGMD: L("Best Two-Slot 16GB Value", "16GB of GDDR7 on a two-slot RTX 5060 Ti with one 8-pin plug", "Compact builds on a mid budget."),
        B0DTR7GWG6: L("Alternative SFF RTX 5070 Ti", "the RTX 5070 Ti and 16GB with the SFF-Ready label", "Buyers comparing RTX 5070 Ti prices."),
        B0DTQMLX4F: L("Alternative SFF RTX 5070", "an SFF-Ready RTX 5070 with a WINDFORCE cooler", "Gigabyte-based builds."),
        B0FG97XMNG: L("Smallest Budget Pick", "a two-slot RTX 5050 with one 8-pin plug", "Budget Mini-ITX builds."),
      },
      takes: {
        B0GXFGKWQX: "Zotac's RTX 5070 Ti Solid SFF keeps a high-end chip in a two-slot card, the slimmest RTX 5070 Ti here. A support stand and metal backplate come with it.",
        B0DS6V1YSY: "The ASUS SFF-Ready Prime RTX 5070 is a 2.5-slot card with 12GB of GDDR7, a dual BIOS and a three-year warranty listed. It suits 1440p in a compact case.",
        B0FKSMSGMD: "Zotac's RTX 5060 Ti Twin Edge White is a two-slot card with 16GB of memory and a single 8-pin plug, which makes it one of the easiest cards to fit in a small build.",
        B0DTR7GWG6: "Gigabyte's RTX 5070 Ti Eagle OC SFF has the same chip and memory as the Zotac but a sparser listing. Check its length and thickness on Gigabyte's spec page against your case.",
        B0DTQMLX4F: "Gigabyte's RTX 5070 Windforce SFF is an RTX 5070 with NVIDIA's SFF-Ready label and 12GB on a 192-bit bus. It cost more than the ASUS RTX 5070 at the time of writing.",
        B0FG97XMNG: "Zotac's RTX 5050 Twin Edge is the budget SFF option: two slots, two 90mm fans and one 8-pin plug. Its 8GB of GDDR6 limits it to 1080p.",
      },
      intro: [
        "Small form factor builds need graphics cards that fit tight length and width limits. NVIDIA's SFF-Ready label marks cards within its size guideline, but the exact dimensions still decide whether a card fits your case.",
        "These picks rest on research into maker specifications and Amazon listings, not on builds of our own. Confirm dimensions on each maker's page where the listing omits them.",
      ],
      bottomLine: [
        "The Zotac RTX 5070 Ti Solid SFF is the high-end small-build pick, the ASUS SFF-Ready RTX 5070 is the 12GB choice, and the Zotac RTX 5060 Ti White is the easiest 16GB card to fit.",
        "The Gigabyte RTX 5070 Ti Eagle and RTX 5070 Windforce SFF are alternatives when prices shift, and the Zotac RTX 5050 covers budget Mini-ITX builds.",
      ],
      priorityCriteria: ["fit", "noise"], related: ["best-mini-itx-cases", "best-sfx-power-supplies", "best-mini-itx-motherboards", "best-low-profile-graphics-cards"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-graphics-cards-for-1080p", category: "components", updatedAt,
      seoTitle: "Best Graphics Cards for 1080p Gaming", title: "The Best Graphics Cards for 1080p Gaming", breadcrumbLabel: "Best GPUs for 1080p", mainKeyword: "best gpu for 1080p",
      dek: "Five graphics cards for 1080p gaming, from the RTX 5050 to the RTX 5060 Ti, compared on memory, cooler size and outputs.",
      metaDescription: "Five graphics cards for 1080p gaming compared on VRAM, memory type, cooler thickness and outputs, from the RTX 5050 to the RTX 5060 Ti and RX 9060 XT.",
      teaser: "At 1080p, an 8GB card can work well; match the card to your monitor's refresh rate.",
      asins: ["B0F77H7NBK", "B0F8B462JH", "B0F4RRQ2WY", "B0C5S9CHMG", "B0FG8JRDQ6"],
      labels: {
        B0F77H7NBK: L("Best for 1080p", "an RTX 5060 with GDDR7 in a 2.5-slot, SFF-Ready card", "1080p high-refresh gaming."),
        B0F8B462JH: L("Best AMD for 1080p", "an RX 9060 XT with a triple-fan cooler and 3320MHz listed boost", "1080p on AMD with quiet cooling."),
        B0F4RRQ2WY: L("Fastest 1080p Pick", "the RTX 5060 Ti, the highest GPU tier here", "240Hz 1080p monitors."),
        B0C5S9CHMG: L("Best Previous-Generation Value", "an RX 7600 with three WINDFORCE fans", "1080p on a lower budget."),
        B0FG8JRDQ6: L("Lowest-Priced 1080p Card", "an RTX 5050 at the lowest price here at the time of writing", "Entry 1080p builds."),
      },
      takes: {
        B0F77H7NBK: "The ASUS Prime RTX 5060 is a well-rounded 1080p card: GDDR7 memory, a quiet/performance BIOS switch and 0dB fan stop in a 2.5-slot, SFF-Ready design.",
        B0F8B462JH: "ASRock's RX 9060 XT Steel Legend 8GB uses a triple-fan cooler with 0dB fan stop and a reinforced metal backplate. Its 3320MHz boost is the highest among these cards.",
        B0F4RRQ2WY: "The ASUS TUF RTX 5060 Ti 8GB is the fastest chip here and suits high-refresh 1080p. Its 3.1-slot cooler is large for this class, so check the slot below.",
        B0C5S9CHMG: "Gigabyte's RX 7600 Gaming OC is a previous-generation card with three WINDFORCE fans and a metal backplate. It has two DisplayPort 2.1 outputs and one HDMI 2.1.",
        B0FG8JRDQ6: "Gigabyte's RTX 5050 Windforce is the cheapest way into DLSS 4 here. The maker publishes few details, so confirm size and power needs on Gigabyte's page.",
      },
      intro: [
        "1080p is still the most common gaming resolution, and it asks the least of a graphics card. An 8GB card can handle it well at tuned settings, so the choice comes down to refresh rate, budget and cooler size.",
        "We built this list by researching maker specifications and listings, not by running our own benchmarks. For frame rates, check independent reviews of your games.",
      ],
      bottomLine: [
        "The ASUS Prime RTX 5060 is the 1080p card for most people, the ASRock RX 9060 XT Steel Legend is the AMD alternative, and the ASUS TUF RTX 5060 Ti suits 240Hz monitors.",
        "The Gigabyte RX 7600 and RTX 5050 Windforce keep costs down for entry builds.",
      ],
      priorityCriteria: ["resolution", "noise"], related: ["best-budget-graphics-cards", "best-graphics-cards", "best-cpus-for-240hz-gaming", "best-650w-power-supplies"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-gpus-for-ryzen-7-9800x3d", category: "components", updatedAt,
      seoTitle: "Best GPUs for the Ryzen 7 9800X3D", title: "The Best GPUs for the Ryzen 7 9800X3D", breadcrumbLabel: "Best GPUs for 9800X3D", mainKeyword: "best gpu for 9800x3d",
      dek: "Five graphics cards that suit a Ryzen 7 9800X3D or 7800X3D gaming build, from the RX 9070 to the RTX 5080, compared on memory, size and power.",
      metaDescription: "Five graphics cards to pair with a Ryzen 7 9800X3D or 7800X3D, compared on VRAM, cooler size, power plugs and PSU needs, from the RX 9070 to the RTX 5080.",
      teaser: "A fast gaming CPU deserves a card that keeps up; plan PSU wattage for both together.",
      asins: ["B0GZR4P62R", "B0FSSYTD49", "B0DQSMMCSH", "B0F8L93H53", "B0DS2QZC9P"],
      labels: {
        B0GZR4P62R: L("Best Match for the 9800X3D", "an RTX 5080 in a 2.5-slot, SFF-Ready card", "High-refresh 1440p and 4K gaming."),
        B0FSSYTD49: L("Best AMD Pairing", "an RX 9070 XT with 64 compute units and 16GB of GDDR6", "An all-AMD gaming build."),
        B0DQSMMCSH: L("Best Cooled RTX 5080", "a 3.6-slot TUF cooler with a 850W PSU", "Large cases and quiet high-end builds."),
        B0F8L93H53: L("Best RTX 5070 Pairing", "a ROG Strix cooler with a vapor chamber and 3.2-slot heatsink", "1440p high-refresh builds."),
        B0DS2QZC9P: L("Best Value Pairing", "16GB of GDDR6 on the RX 9070 at the lowest price here", "Keeping the budget for the CPU and platform."),
      },
      takes: {
        B0GZR4P62R: "The ASUS Prime RTX 5080 EVO is fast enough that a 9800X3D and the GPU both stay busy at 1440p and above. Its 2.5-slot, SFF-Ready size fits most mid-towers without trouble.",
        B0FSSYTD49: "ASRock's RX 9070 XT Challenger gives an all-AMD build 16GB of memory on a 256-bit bus and a triple-fan cooler with 0dB fan stop. Three DisplayPort 2.1a outputs suit high-refresh monitors.",
        B0DQSMMCSH: "The ASUS TUF RTX 5080 uses the same chip as the Prime EVO but a much larger 3.6-slot cooler, and it has an 850W PSU and a 16-pin plug. Pick it when your case has the room.",
        B0F8L93H53: "The ROG Strix RTX 5070 is a premium take on the RTX 5070, with a vapor chamber, digital power control and ARGB lighting. It suits a 9800X3D build aimed at 1440p rather than 4K.",
        B0DS2QZC9P: "Gigabyte's RX 9070 Gaming OC is the lowest-cost card here, with 16GB of GDDR6 and a WINDFORCE cooler. It leaves more of the budget for the CPU, board and memory.",
      },
      intro: [
        "The Ryzen 7 9800X3D and 7800X3D are among the fastest gaming CPUs, so pairing one with a weak graphics card wastes much of their advantage. These five cards match that class of CPU at 1440p and 4K.",
        "The pairings reflect our research into maker specifications and listings, not tests on our own 9800X3D system. Plan your power supply for the CPU and GPU together.",
      ],
      bottomLine: [
        "The ASUS Prime RTX 5080 EVO is the best all-round partner for a 9800X3D, the ASRock RX 9070 XT Challenger suits an all-AMD build, and the ASUS TUF RTX 5080 is the larger, better-cooled version.",
        "The ROG Strix RTX 5070 targets 1440p, and the Gigabyte RX 9070 Gaming OC keeps the total cost down.",
      ],
      priorityCriteria: ["platform", "power"], related: ["best-motherboards-for-ryzen-7-9800x3d", "best-ram-for-ryzen-7-9800x3d", "best-amd-cpus-for-gaming", "best-850w-power-supplies"],
    },
  },
];
