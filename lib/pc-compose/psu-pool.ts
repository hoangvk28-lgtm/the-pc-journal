/**
 * Shared PSU content pool. Each block has two phrasings; `tags` limit it to the sub-clusters
 * where the advice is technically relevant ("all" = every PSU guide).
 */

export type PsuTag = "all" | "low" | "mid" | "high" | "sfx" | "white" | "budget" | "efficiency";

export interface PoolBlock {
  id: string;
  tags: PsuTag[];
  title: [string, string];
  body: [string, string];
}

export const psuCriteria: PoolBlock[] = [
  {
    id: "connectors", tags: ["all"],
    title: ["Count connectors before watts", "Match cables to your graphics card"],
    body: [
      "Your graphics card's spec page lists its power sockets: one 12V-2x6, two 8-pin or three 8-pin. A unit needs a matching cable for each socket, and extra wattage does not help if it has too few.\n\nCheck the exact card model rather than the GPU name, since partner cards with the same chip often use different sockets.",
      "Before comparing wattage, look up the power sockets on your exact graphics card. Each socket needs its own matching cable from the power supply.\n\nPartner cards built on the same GPU can differ, so use the model number, not the chip name.",
    ],
  },
  {
    id: "headroom", tags: ["all"],
    title: ["Size wattage from the card maker's guidance", "Use the GPU maker's recommended wattage"],
    body: [
      "Graphics card makers publish a recommended power supply wattage for each card. Start from that figure for your exact model and add headroom only if you plan a bigger card later.\n\nMore unused wattage does not make a system faster; it mainly adds cost.",
      "The simplest sizing rule is the recommended PSU wattage on your graphics card's spec page. Partner cards sometimes ask for more than the reference design.\n\nBuying far above that figure adds cost without adding performance.",
    ],
  },
  {
    id: "depth", tags: ["low", "mid", "high", "white", "budget", "efficiency"],
    title: ["Check depth against your case", "Measure the PSU bay first"],
    body: [
      "Case manuals list a maximum power supply length. Subtract room for the modular plugs, which stick out of the back of the unit, and for any fan or drive cage behind it.\n\nMost ATX units here are 140mm to 160mm deep; high-wattage units can reach 180mm.",
      "The PSU bay limits length, not just form factor. Leave space behind the unit for cable plugs and any bottom-mounted fan.\n\nIf your case manual lists a maximum PSU length, compare it with the unit's depth before anything else.",
    ],
  },
  {
    id: "hpwr", tags: ["all"],
    title: ["12V-2x6 is a socket change", "Seat the 12V-2x6 plug fully"],
    body: [
      "ATX 3.1 replaced the 12VHPWR socket with 12V-2x6, whose shorter sense pins keep power off until the plug is fully inserted. The cable itself did not change.\n\nPush the plug in until it clicks and avoid bending the cable sharply at the connector.",
      "The 12V-2x6 socket introduced with ATX 3.1 only allows full power once the plug is completely seated. The cable is unchanged from 12VHPWR.\n\nWhichever unit you choose, seat the plug fully and give it a gentle bend radius.",
    ],
  },
  {
    id: "cybenetics", tags: ["all"],
    title: ["Read Cybenetics, not just 80 Plus", "Efficiency badges measure different things"],
    body: [
      "80 Plus checks efficiency at a few load points. Cybenetics measures across many load levels and also rates noise, from A++ down.\n\nWhen a listing gives both, the Cybenetics rating tells you more about everyday use.",
      "An 80 Plus badge and a Cybenetics badge are not the same test. Cybenetics covers more load levels and adds a separate noise rating.\n\nSome units here carry a higher Cybenetics efficiency tier than their 80 Plus badge suggests.",
    ],
  },
  {
    id: "mixing", tags: ["all"],
    title: ["Never reuse old modular cables", "Keep each unit's own cables"],
    body: [
      "Modular cables share a plug at the component end, but the pinout at the power supply end differs between brands and even between models. Corsair's cable-compatibility guidance warns against mixing them.\n\nA cable from an old unit can damage drives, the motherboard or the graphics card.",
      "It is tempting to keep the cables already routed in your case. Don't: pinouts at the PSU end vary between brands and models, and a mismatched cable can destroy components.\n\nUse only the cables supplied with the new unit.",
    ],
  },
  {
    id: "zero-rpm", tags: ["low", "mid", "high", "white", "efficiency", "budget"],
    title: ["Zero-RPM mode for a quiet idle", "Look for a fan that stops at low load"],
    body: [
      "Many units stop their fan at light load and spin it up as demand rises. That keeps a PC silent during browsing and office work.\n\nListings call it zero-RPM, semi-passive, hybrid or Smart Zero Fan; check that the unit you choose has it if idle noise matters.",
      "A semi-passive fan switches off when the load is light, so the power supply makes no noise during everyday tasks.\n\nNot every unit has it, and a listing that doesn't mention it probably runs its fan all the time.",
    ],
  },
  {
    id: "modular-type", tags: ["low", "budget"],
    title: ["Full, semi or non-modular", "Decide how much cable you can live with"],
    body: [
      "Fully modular units let you attach only the cables you need. Semi-modular units fix the main motherboard and CPU cables, and non-modular units fix everything.\n\nIn a small or windowed case, unused fixed cables are harder to hide.",
      "Non-modular power supplies are cheaper but leave every cable attached. Semi-modular units fix only the essential cables; fully modular units fix none.\n\nIf cable space is tight, the extra cost of a modular unit is usually worth it.",
    ],
  },
  {
    id: "warranty", tags: ["all"],
    title: ["Warranty length signals confidence", "Compare warranty terms"],
    body: [
      "Warranties on these units run from five to ten years where the listing states one. A longer term does not prove quality, but it shows how long the maker expects to support the unit.\n\nWhere a listing gives no term, check the maker's site before buying.",
      "A power supply often outlives several upgrades, so warranty length matters. The picks here range from five to ten years where the listing states a term.\n\nIf the term isn't listed, confirm it with the manufacturer.",
    ],
  },
  {
    id: "revisions", tags: ["mid", "high", "white", "efficiency"],
    title: ["Same name, different generation", "Check the revision before buying"],
    body: [
      "Power supply names often carry over between generations, with ATX 3.0 and ATX 3.1 versions sold side by side. The newer version has the 12V-2x6 socket.\n\nCheck for ATX 3.1 and the model year in the listing title.",
      "Several of these model names have shipped in more than one generation. Older ATX 3.0 stock is still sold under similar names.\n\nLook for ATX 3.1 and the release year before adding one to your cart.",
    ],
  },
  {
    id: "sfx-fit", tags: ["sfx"],
    title: ["SFX, SFX-L and ATX brackets", "Know which small form factor your case takes"],
    body: [
      "SFX units are 100mm deep; SFX-L units are longer to fit a 120mm fan. Many small cases accept SFX but not SFX-L.\n\nIf you want to use an SFX unit in an ATX case, you need an adapter bracket; some units include one.",
      "Small cases often specify SFX only. SFX-L is longer, usually for a quieter 120mm fan, and may not fit.\n\nSFX units can go in an ATX case with a bracket, which some makers include.",
    ],
  },
  {
    id: "sfx-noise", tags: ["sfx"],
    title: ["Small fans work harder", "Expect more fan noise from SFX"],
    body: [
      "Most SFX units use a 92mm fan, which has to spin faster than a 120mm or 135mm fan to move the same air. Under a heavy gaming load, that can be audible.\n\nSFX-L units trade length for a larger, quieter fan.",
      "SFX power supplies use small fans, usually 92mm, that spin faster under load. In a compact case with little airflow, they can be the loudest part.\n\nIf noise matters and your case allows it, consider SFX-L.",
    ],
  },
  {
    id: "white-cables", tags: ["white"],
    title: ["White housing is not always white cables", "Check the cables, not just the case"],
    body: [
      "Some white power supplies ship with black or mixed-color cables, which spoils a white build. Listing photos usually show what is included.\n\nCustom sleeved cables are sold separately, but they must be made for your exact unit.",
      "A white housing does not guarantee white cables. Check the product photos and cable list before buying.\n\nIf you plan to add sleeved cables, buy ones made for that specific model.",
    ],
  },
  {
    id: "budget-trade", tags: ["budget", "low"],
    title: ["What cheaper units give up", "Where budget units cut costs"],
    body: [
      "Cheaper units usually save money on fan quality, cable flexibility, warranty length and certification tier. Protection features and a native 12V-2x6 cable are still common.\n\nCompare the warranty and fan listing, since those are the easiest to verify.",
      "Lower prices usually mean a shorter warranty, a simpler fan and fewer certifications. Most still include the key protections and an ATX 3.1 12V-2x6 cable.\n\nThe warranty term is a quick check of how long the maker stands behind it.",
    ],
  },
  {
    id: "efficiency-value", tags: ["efficiency", "high"],
    title: ["What higher efficiency buys you", "Platinum and Titanium in practice"],
    body: [
      "Higher efficiency tiers turn less power into heat, which lets the fan run slower and saves a little electricity under sustained load.\n\nThe benefit grows with long, heavy workloads such as rendering; for a few hours of gaming a day it is modest.",
      "Platinum and Titanium units waste less power as heat. That helps quiet operation and running costs for machines under heavy load for many hours.\n\nFor typical gaming use, efficiency is a secondary factor after fit and connectors.",
    ],
  },
  {
    id: "high-case", tags: ["high"],
    title: ["Big units need big cases", "Plan for length and cables at high wattage"],
    body: [
      "Units above 1000W are often longer and ship with more cables. Some reach 180mm, which rules out many mid-tower cases.\n\nCheck the case's PSU clearance and cable routing space before choosing a high-wattage unit.",
      "High-wattage power supplies tend to be longer and heavier on cables. At 1500W and above, 170mm to 180mm is common.\n\nConfirm your case can take the length with room for cables.",
    ],
  },
];

export const psuFaq: (PoolBlock & { qa: [[string, string], [string, string]] })[] = [
  { id: "adapter", tags: ["all"], title: ["", ""], body: ["", ""], qa: [["Do I need an adapter for a 12V-2x6 graphics card?", "Not with the picks here. Every unit lists a native 12V-2x6 cable or suitable PCIe connectors, so an adapter adds an extra plug for no benefit."], ["Can I use an adapter instead of a native 12V-2x6 cable?", "You can, but a native cable avoids an extra connection point. Where a unit includes a native cable, use it."]] },
  { id: "reuse", tags: ["all"], title: ["", ""], body: ["", ""], qa: [["Can I reuse cables from my old power supply?", "No. Pinouts at the PSU end differ between brands and models, and a mismatched cable can damage components. Use the cables that come with the new unit."], ["Are modular cables interchangeable between brands?", "No. They fit the same sockets on your components but are wired differently at the power supply end. Mixing them can damage hardware."]] },
  { id: "fit", tags: ["all"], title: ["", ""], body: ["", ""], qa: [["How do I know a power supply will fit my case?", "Find the maximum PSU length in your case manual and compare it with the unit's depth, leaving room for the modular plugs."], ["What PSU size does my case take?", "Check the case manual for the supported form factor (ATX or SFX) and maximum length, then compare with the unit's dimensions."]] },
  { id: "platinum-worth", tags: ["all"], title: ["", ""], body: ["", ""], qa: [["Is a Platinum power supply worth paying more for?", "Mainly for heavy, sustained loads or very quiet builds. For typical gaming, fit, connectors and warranty matter more."], ["Does higher efficiency make my PC faster?", "No. Efficiency affects heat, noise and running cost, not performance."]] },
  { id: "atx30", tags: ["all"], title: ["", ""], body: ["", ""], qa: [["Is an ATX 3.0 power supply still fine?", "Yes, if it has the connectors your card needs. ATX 3.1 adds the 12V-2x6 socket, which is the better choice for a new purchase."], ["What changed between ATX 3.0 and ATX 3.1?", "Mainly the GPU power socket: ATX 3.1 uses 12V-2x6, whose shorter sense pins cut power if the plug isn't fully seated."]] },
  { id: "idle-noise", tags: ["low", "mid", "high", "white", "efficiency", "budget"], title: ["", ""], body: ["", ""], qa: [["Will a power supply be silent when I'm not gaming?", "Units with a zero-RPM or semi-passive mode stop their fan at light load. Check the listing for that feature."], ["What does zero-RPM mode mean?", "The fan stays off until the load or temperature rises, so the unit is silent during light work."]] },
  { id: "sfx-in-atx", tags: ["sfx"], title: ["", ""], body: ["", ""], qa: [["Can I put an SFX power supply in an ATX case?", "Yes, with an SFX-to-ATX adapter bracket. Some units, such as the Lian Li SP1000P, include one."], ["Is SFX-L the same size as SFX?", "No. SFX-L is longer to fit a larger fan, so check that your case supports it."]] },
  { id: "sfx-watts", tags: ["sfx"], title: ["", ""], body: ["", ""], qa: [["Is an SFX power supply powerful enough for a high-end GPU?", "SFX units now reach 1000W. Check your card's recommended wattage and connectors, as you would for ATX."], ["Do SFX power supplies run hotter?", "They pack the same power into a smaller body with a smaller fan, so they can be louder under load. Case airflow matters more."]] },
  { id: "white-cables", tags: ["white"], title: ["", ""], body: ["", ""], qa: [["Do white power supplies come with white cables?", "Often, but not always. Check the listing photos and cable list before buying."], ["Can I buy white cables for a black power supply?", "Yes, but only sleeved cables made for that exact model. Generic cables may be wired differently."]] },
  { id: "budget-safe", tags: ["budget", "low"], title: ["", ""], body: ["", ""], qa: [["Is a cheap power supply safe?", "Look for a recognized certification, a native 12V-2x6 cable where needed, and a stated warranty. Those are easy checks on any listing."], ["What should I avoid in a budget power supply?", "Units with no stated certification, no warranty term or missing connectors your card needs."]] },
  { id: "too-much", tags: ["high", "efficiency"], title: ["", ""], body: ["", ""], qa: [["Is a bigger power supply less efficient at low load?", "Very large units can be less efficient at light loads. Choose wattage from your card maker's guidance rather than buying the largest available."], ["Should I buy 1200W just in case?", "Only if your planned hardware needs it. Otherwise it adds cost and size without benefit."]] },
  { id: "dual-12v", tags: ["high"], title: ["", ""], body: ["", ""], qa: [["Why would I need two 12V-2x6 cables?", "Mainly for two high-power graphics cards or workstation builds. Most single-GPU systems need one."], ["Do I need dual 12V-2x6 for one graphics card?", "No. One native 12V-2x6 cable is enough for a single card that uses that socket."]] },
  { id: "low-upgrade", tags: ["low"], title: ["", ""], body: ["", ""], qa: [["Will a 550W or 650W unit limit future GPU upgrades?", "It can. If you expect to move to a higher-power card, check that card's recommended wattage now."], ["Is 650W enough for a mid-range graphics card?", "Often, yes. Check your exact card's recommended PSU wattage and power connectors."]] },
];

export const psuEvaluated: { title: string; variants: [string, string] }[] = [
  { title: "Connectors", variants: ["We checked each unit's native 12V-2x6 cable and PCIe connectors where the listing states them, since they decide which graphics cards it can power without adapters.", "We recorded native 12V-2x6 support and PCIe connector counts from each listing, because connectors decide GPU compatibility."] },
  { title: "Physical fit", variants: ["We noted form factor and depth where listed, since case clearance rules units out before any other factor.", "We recorded form factor and stated length, which decide whether a unit fits your case at all."] },
  { title: "Efficiency certification", variants: ["We compared 80 Plus and Cybenetics tiers as listed, noting where a unit carries both.", "We recorded each listed efficiency certification, separating 80 Plus from Cybenetics ratings."] },
  { title: "Fan and noise", variants: ["We noted fan size, bearing type, zero-RPM modes and any listed Cybenetics noise rating.", "We compared fan size, bearing, semi-passive modes and listed noise certifications."] },
  { title: "Warranty and build", variants: ["We compared warranty length and listed component details such as capacitor ratings.", "We recorded warranty terms and build details stated by each manufacturer."] },
];
