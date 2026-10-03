/**
 * Batch 31 build copy: the two-sentence lead, the verdict clause and the close tip are written per build after its parts are known.
 * Numbers named here are figures the fact sheets state; the compatibility table and swap rows are computed from the same sheets.
 */
export interface BuildCopy {
  /** Noun phrase used inside sentences: "home office PC". */
  purpose: string;
  /** Two sentences: a build-specific buying point, then what every part shares. */
  lead: string;
  /** Clause after "centres on ...;" in the bottom line. */
  verdict: string;
  /** One practical tip. */
  close: string;
  roles?: Partial<Record<"cpu" | "gpu" | "mb" | "ram" | "ssd" | "psu" | "case" | "cooler", string>>;
  budgetNote?: string;
  faq?: { q: string; a: string }[];
}

export const BUILD_COPY: Record<string, BuildCopy> = {
  "best-600-home-office-pc-build": {
    purpose: "home office PC",
    lead: "An office PC lives or dies on its integrated graphics, its memory and a drive that boots fast, not on a graphics card, so this build puts the money there. Every part is on the same LGA1700 DDR4 platform, and the processor's own graphics drive the monitor.",
    verdict: "it spends on the platform and leaves a graphics card out until a task asks for one.",
    close: "Choose the cable for your monitor first: an office build with no graphics card depends on the motherboard's HDMI or DisplayPort output.",
  },
  "best-750-small-office-compact-pc-build": {
    purpose: "compact office PC",
    lead: "A compact office PC is chosen first by the desk space it leaves free, so this build starts from the 21.3-litre Lian Li B4-mATX and a processor that brings its own graphics and its own cooler. Every part is AM4 with DDR4, and the Micro-ATX board and the ATX power supply sit within the limits the case lists.",
    verdict: "it puts the savings into a small case and a 1TB drive, and leaves a graphics card out.",
    close: "Check the case's listed width, depth and height against your desk; the 21.3L volume figure alone does not say which side is longest.",
  },
  "best-900-mini-itx-office-pc-build": {
    purpose: "Mini-ITX office PC",
    lead: "A Mini-ITX office PC trades expansion for size, so its parts list is tighter than a mid-tower's: two memory slots, one graphics slot and a case picked for the supply it takes. Every part is on AM5 with DDR5, the Ryzen 5 8600G drives the monitor with its integrated graphics, and the Thermaltake Tower 250 lists support for an ATX or SFX power supply, so a standard ATX unit fits.",
    verdict: "it spends on a Mini-ITX board and DDR5 memory, keeps a standard ATX supply and skips a graphics card.",
    close: "DDR5 kits are the volatile price in this build, so check the memory listing again on the day you order, and buy a two-stick kit because the board has two memory slots.",
  },
  "best-850-budget-gaming-pc-build": {
    purpose: "budget gaming PC",
    lead: "At this price the graphics card decides what the PC can do, so the Radeon RX 9060 XT gets the largest share and a six-core AM4 chip with a cooler in the box fills the processor slot. Every part is on AM4 with DDR4, and the supply and case limits are checked against the card's recommended figures in the table below.",
    verdict: "it spends on the card first and accepts a 500GB drive.",
    close: "Look up the exact card's length on its maker's page: boards built on the same chip differ in size, and the case limit in the compatibility table is what the card has to clear.",
  },
  "best-1000-mid-range-gaming-pc-build": {
    purpose: "mid-range gaming PC",
    lead: "A mid-range build pairs the graphics card with a processor that will not hold it back and a tower cooler above the bottom of the range, so the Core i5-14400F gets an aftermarket tower. Every part sits on LGA1700 with DDR4, the processor lists no integrated graphics, and the card is the only display output.",
    verdict: "it favours ten processor cores and a tower cooler over a faster drive.",
    close: "The Core i5-14400F has no integrated graphics, so install the graphics card before the first boot and plug the monitor into the card, not the motherboard.",
  },
  "best-1250-quiet-gaming-pc-build": {
    purpose: "quiet gaming PC",
    lead: "A quiet gaming PC is built around the parts that make the noise, which are the cooler, the case and the power supply fan, so this one pairs a Noctua tower with a be quiet! case and a be quiet! supply that lists a fan-stop mode. Every part sits on AM4 with DDR4, and the listings for the cooler, case and supply talk about low noise rather than about lighting.",
    verdict: "it spends on the cooler, case and power supply first and on the graphics card second.",
    close: "Noise also depends on fan curves, so set one in the BIOS once the PC is built; the listings give no measured noise figures, and neither do we.",
  },
  "best-1500-high-end-gaming-pc-build": {
    purpose: "high-end gaming PC",
    lead: "At this tier the platform choice starts to matter: DDR5 on AM5 costs more up front but keeps the board open to later Ryzen chips, so this build starts from the Ryzen 5 7600 and a Radeon RX 7700 XT with 12GB of memory. Every part is on AM5 with DDR5, and the 16GB kit is the main compromise because DDR5 kits are priced high at the time of writing.",
    verdict: "it takes the AM5 upgrade path and a 12GB graphics card, and accepts 16GB of memory to stay in budget.",
    close: "Price a 32GB kit before ordering: the DDR5 premium is the biggest swing in this build, and the memory-type check stays green for any DDR5 kit.",
  },
  "best-1750-advanced-gaming-pc-build": {
    purpose: "advanced gaming PC",
    lead: "This tier spends where the money shows, on a Radeon RX 7900 XT with 20GB of memory, and saves by staying on AM4, where a 32GB DDR4 kit costs far less than a DDR5 one. Every part works on AM4 with DDR4, and the 1000W supply sits well above the card's recommended power.",
    verdict: "it spends on the graphics card and 32GB of cheaper DDR4, and accepts that AM4 has no newer processors coming.",
    close: "AM4 is a finished platform. If you expect to change the processor in a couple of years, the AM5 builds in this series cost more now but keep that option open.",
  },
  "best-2000-premium-gaming-pc-build": {
    purpose: "premium gaming PC",
    lead: "A premium build pairs a cache-heavy processor with a capable card, so the Ryzen 5 7600X3D with 96MB of L3 cache sits beside a Radeon RX 9070 GRE with 12GB of memory. Every part is on AM5 with DDR5, the 32GB kit is two 16GB sticks, and the supply lists two native 12V-2x6 connectors.",
    verdict: "it spends on cache, a 12GB card and a full 32GB of DDR5 rather than on a larger drive.",
    close: "DDR5 pricing is the swing factor in this tier, so check the memory listing on the day you order and price a 16GB kit against it.",
  },
  "best-2500-extreme-4k-gaming-pc-build": {
    purpose: "4K gaming PC",
    lead: "A 4K target leans on video memory and a power budget, so this build puts a 16GB Radeon RX 9070 XT beside a Ryzen 7 7800X3D and a 360mm liquid cooler. Every part is on AM5 with DDR5, the 2TB drive holds a large library, and the 1000W supply sits above the card's recommendation.",
    verdict: "it spends on a 16GB card and a 2TB drive and cools the processor with a 360mm radiator.",
    close: "Choose the monitor before the PC: 4K play needs a display whose inputs accept the card's DisplayPort or HDMI version at the refresh rate you want, and the total here excludes the monitor.",
  },
  "best-3000-elite-rgb-gaming-pc-build": {
    purpose: "RGB gaming PC",
    lead: "An RGB build puts its money where the lighting is visible, so the Kingston FURY Beast RGB memory, the Corsair iCUE LINK Titan 360 RX cooler and the white Lancool 207 case carry the look, with a 24GB Radeon RX 7900 XTX and a Ryzen 7 9850X3D underneath. Every part is on AM5 with DDR5, and the lighting parts come from different makers, so check which control software each one uses.",
    verdict: "it spends on the visible lighting parts and a 24GB card, and keeps a 1TB drive.",
    close: "Count the lighting headers on the motherboard against the fans and strips in the case before you order, because addressable 5V and standard 12V lighting use different connectors.",
  },
  "best-3500-ultimate-gaming-pc-build": {
    purpose: "ultimate gaming PC",
    lead: "The ultimate tier is where one component takes the largest share, and here it is the GeForce RTX 5080 with 16GB of GDDR7, paired with Intel's Core Ultra 7 265K on LGA1851 rather than a Ryzen. Every part is on LGA1851 with DDR5, and the 1000W supply lists a 12V-2x6 connector for the card.",
    verdict: "it spends on the RTX 5080 and a 20-core Intel chip, and cools the processor with a 360mm radiator.",
    close: "A Core Ultra 200S chip needs a board with the right BIOS. Check the Z890 board maker's CPU support list for the version the 265K requires before you build.",
  },
  "best-5000-dream-machine-gaming-pc-build": {
    purpose: "dream-machine gaming PC",
    lead: "A dream machine at this price is about headroom: a 16-core Ryzen 9 9950X3D, a GeForce RTX 5080 and 64GB of DDR5, with a 360mm liquid cooler and a Titanium-rated supply to carry them. Every part is on AM5 with DDR5, and the supply keeps a margin above the card's recommended power.",
    verdict: "it spends on the 16-core processor and 64GB of memory rather than on a bigger case or more storage.",
    close: "If gaming is the only use, the 32GB memory swap and a cheaper processor are the first places to save; the extra cores and 64GB mainly help video, rendering and virtual machines.",
  },
  "best-10000-supreme-creator-pc-build": {
    purpose: "supreme creator PC",
    lead: "At this tier the graphics card is the build: the GeForce RTX 5090 with 32GB of GDDR7 takes nearly three quarters of the parts total, and every other part is chosen so that it does not hold the card back. Every part is on AM5 with DDR5, the 64GB kit and 16-core Ryzen 9 9950X3D cover creator work, and the 1200W supply sits above the 1000W the chip's maker recommends.",
    verdict: "it commits almost three quarters of the budget to the graphics card and keeps the rest at sensible parts.",
    close: "The RTX 5090 has the highest recommended power of any card in this series. Use the supply's native 12V-2x6 cable rather than an adapter, and check the case's card-length limit on its maker's page because this card's listing gives no length.",
  },
  "best-2000-high-end-creator-pc-build": {
    purpose: "high-end creator PC",
    lead: "A creator build spends on cores, memory and storage before graphics, so a 12-core Ryzen 9 9900X, 32GB of DDR5 and a 2TB drive take priority, with an Intel Arc B580 driving the display. Every part is on AM5 with DDR5, and the 360mm liquid cooler suits a processor rated at 120W.",
    verdict: "it puts the money into cores, memory and a 2TB drive, and keeps the graphics card modest.",
    close: "Check your editing software's list of supported graphics cards before ordering: GPU-accelerated features depend on the card and the application, and this guide makes no performance claims.",
  },
  "best-1000-content-creation-pc-build": {
    purpose: "content creation PC",
    lead: "A $1000 content-creation build gets more from 32GB of memory and an eight-core processor than from a graphics card, so the Ryzen 7 5700G brings eight cores with integrated graphics and the memory kit is 32GB. Every part is on AM4 with DDR4, and the open PCIe slot leaves room to add a graphics card later.",
    verdict: "it spends on 32GB of memory and eight cores and leaves the graphics card for later.",
    close: "The integrated graphics drive the display, so add a graphics card first if your editing software relies on one; the board's PCIe slot and the supply's connectors are the two things to check before you do.",
  },
  "best-1250-stock-trading-pc-build": {
    purpose: "stock trading PC",
    lead: "A trading desk needs monitor outputs and memory for many charts more than it needs gaming speed, so the Arc B580 is chosen for the outputs its listing names and the build carries 32GB of DDR4. Every part is on AM4, the card lists at least four outputs, and the eight-core Ryzen 7 5700X keeps its cores for the trading platform and the browser.",
    verdict: "it spends on display outputs and 32GB of memory, not on gaming performance.",
    close: "Match the card's output types to your monitors: DisplayPort and HDMI versions must suit each monitor's inputs, and adapters add cost.",
  },
  "best-1000-home-theater-pc-build": {
    purpose: "home theater PC",
    lead: "A home theater PC is judged by what it connects to the television, so this build uses the Ryzen 7 8700G's integrated graphics instead of a card, in a compact case with a Mini-ITX board. Every part is on AM5 with DDR5, the Jonsbo D31 Mesh lists support for an ATX or SFX power supply, and the build adds no graphics card.",
    verdict: "it relies on integrated graphics and spends on a 1TB drive for a local media library.",
    close: "Check the television's HDMI input and the motherboard's HDMI output together: 4K output at higher refresh rates depends on matching HDMI versions, and the listings differ.",
  },
  "best-1250-compact-mini-itx-gaming-pc-build": {
    purpose: "compact Mini-ITX gaming PC",
    lead: "A Mini-ITX gaming build starts from what the case allows: the NR200P V2 takes an SFX supply and a card up to its listed length, so every part is checked against those two limits. Every part is on AM5 with DDR5, the Arc A580's 271mm length is listed, and the cooler is a low-profile tower chosen for the board's tight space.",
    verdict: "it spends on the small case, the SFX supply and DDR5, and accepts an 8GB Arc A580 as the graphics card.",
    close: "SFX supplies cost more per watt than ATX, so check the case's listed power-supply type before you swap the supply.",
  },
  "best-1500-high-end-mini-itx-gaming-pc-build": {
    purpose: "Mini-ITX gaming PC",
    lead: "This Mini-ITX build avoids an SFX supply by using the Lian Li A3-mATX, whose listing allows an ATX power supply, so a standard unit sits next to a 12GB Arc B580. Every part is on AM5 with DDR5, the card's 249mm length is listed, and the Ryzen 5 7600X3D brings 96MB of L3 cache.",
    verdict: "it pairs a cache-heavy six-core chip with a 12GB card and an ATX supply.",
    close: "A low-profile cooler such as the AXP120-X67 suits the 7600X3D's 65W rating, but the case listing gives no cooler height limit, so check the case page before ordering.",
  },
  "best-2000-premium-mini-itx-gaming-pc-build": {
    purpose: "premium Mini-ITX gaming PC",
    lead: "A premium Mini-ITX build needs a card whose length is stated, and the Radeon RX 7800 XT Challenger with 16GB lists 267mm, well inside the Lian Li A3-mATX's listed 415mm limit. Every part is on AM5 with DDR5, the B850I Edge TI is a Mini-ITX board, and the low-profile ID-COOLING IS-55 keeps the cooler within a small case.",
    verdict: "it spends on a 16GB card and 32GB of DDR5 inside a compact case.",
    close: "The 1000W supply is larger than this card needs. A smaller ATX supply that still passes the headroom row would cost less if you do not plan a bigger card.",
  },
  "best-3000-extreme-mini-itx-gaming-pc-build": {
    purpose: "extreme Mini-ITX gaming PC",
    lead: "An extreme Mini-ITX build needs every millimetre accounted for, and the ASUS Prime RTX 5070 Ti lists a 306mm length, a 2.5-slot cooler and a 750W recommendation, so this guide can check each of them. Every part is on AM5 with DDR5, and the 240mm Thermalright Frozen Notte liquid cooler mounts in a case that lists radiators up to 360mm.",
    verdict: "it spends on a 16GB RTX 5070 Ti and a 2TB drive and cools the processor with a 240mm radiator.",
    close: "Check the radiator position against the memory height and the card's slot thickness in the case manual; the listings give the radiator size but not the clearance at the front or top.",
  },
};
