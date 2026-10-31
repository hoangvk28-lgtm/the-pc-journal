import { componentsExtraA } from "./components-wave1-extra-a";
import { componentsExtraB } from "./components-wave1-extra-b";
import { componentsExtraC } from "./components-wave1-extra-c";
import { componentsExtraD } from "./components-wave1-extra-d";
import { componentsExtraE } from "./components-wave1-extra-e";
import { componentsExtraF } from "./components-wave1-extra-f";
import type { InformationalGuide, SourceRef } from "@/lib/pc-content/types";

const author = { name: "The PC Journal", url: "/about-the-pc-journal" };

const ref = (id: string, label: string, url: string, publisher: string, kind: SourceRef["kind"] = "reference"): SourceRef => ({
  id,
  label,
  url,
  publisher,
  kind,
});

const PCISIG = ref("pcisig", "PCI-SIG specifications and news", "https://pcisig.com", "PCI-SIG");
const INTEL_ARK = ref("intel-ark", "Intel Product Specifications (ARK)", "https://ark.intel.com", "Intel", "manufacturer");
const AMD_RYZEN = ref(
  "amd-ryzen",
  "AMD Ryzen desktop processors",
  "https://www.amd.com/en/products/processors/desktops/ryzen.html",
  "AMD",
  "manufacturer",
);
const NVIDIA_GEFORCE = ref(
  "nvidia-geforce",
  "NVIDIA GeForce graphics cards",
  "https://www.nvidia.com/en-us/geforce/graphics-cards/",
  "NVIDIA",
  "manufacturer",
);
const CYBENETICS = ref("cybenetics", "Cybenetics PSU certifications", "https://www.cybenetics.com", "Cybenetics", "third-party-test");
const PLUS80 = ref("80plus", "80 PLUS program", "https://www.clearesult.com/80plus", "CLEAResult");
const NVME = ref("nvme", "NVM Express specifications", "https://nvmexpress.org", "NVM Express");
const JEDEC = ref("jedec", "JEDEC standards", "https://www.jedec.org", "JEDEC");
const USBIF = ref("usbif", "USB Implementers Forum", "https://www.usb.org", "USB-IF");

const baseGuides: InformationalGuide[] = [
  /* ───────────────────────── power-supplies ───────────────────────── */
  {
    slug: "psu-transient-power-spikes-and-atx-3-explained",
    type: "guide",
    status: "published",
    category: "components",
    subtopic: "power-supplies",
    seoTitle: "PSU Power Spikes and ATX 3.x Explained",
    title: "PSU Power Spikes and ATX 3.x: What to Check Beyond Wattage",
    dek: "A wattage figure is only part of what keeps a high-end GPU stable. Here is how short power excursions work and what ATX 3.x changes.",
    metaDescription:
      "Learn how GPU power spikes, CPU power limits and ATX 3.x PSU requirements affect the wattage you buy, and what to verify on the spec sheet first.",
    teaser: "Work out the real peak load of your GPU and CPU, then check whether a PSU states ATX 3.x spike handling and the right cable.",
    author,
    readTime: "9 min read",
    related: [
      "how-much-psu-wattage-does-your-pc-need",
      "80-plus-ratings-explained",
      "gpu-power-connectors-explained",
      "best-gaming-psu-atx3",
    ],
    sources: [PCISIG, PLUS80, CYBENETICS, NVIDIA_GEFORCE],
    modules: [
      {
        kind: "key-takeaway",
        body: "Size a PSU from the sum of your GPU and CPU maximum power, add allowance for the rest of the system, and then look for a unit that states it handles short GPU power excursions, which is what the ATX 3.x requirements describe. A calculator total tells you the steady load; it says nothing about how the PSU copes with brief peaks above it. If you run a card with a 12V-2x6 or 12VHPWR connector, check the cable and the PSU's stated spike handling before you check the wattage again.",
      },
      {
        kind: "explanation",
        heading: "Steady load and short peaks are different numbers",
        paragraphs: [
          "The wattage printed on a PSU label is the continuous output it is designed to supply. The figure a graphics card maker publishes, usually called total board power or typical board power, describes a sustained gaming load. Real draw moves around that figure all the time, and for very short moments, measured in fractions of a millisecond to a few milliseconds, a modern GPU can pull noticeably more than its rated board power.",
          "A PSU with weak protection circuitry can read one of those peaks as an overload and shut down, even when the average load is far below the label. This is why a system can trip a PSU at a total that a calculator calls comfortable. Over-current and over-power protections exist for good reasons, so the fix is a unit built to ride through the peak, not a bypass of the protection.",
          "The ATX 3.0 power supply design guide was written partly for this case. It asks PSUs to tolerate short excursions of GPU power well above the rated figure, up to roughly twice the card's rating for very brief periods, and it standardised the 12VHPWR connector that those cards use. The ATX 3.1 revision followed and moved the connector to its revised 12V-2x6 form. Read the maker's own statement of what the unit supports, because the label ATX 3.x on a box does not tell you the unit's actual limits.",
        ],
      },
      {
        kind: "explanation",
        heading: "Finding the real CPU and GPU numbers",
        paragraphs: [
          "For the GPU, use the maker's board power figure and its recommended PSU wattage from the card's product page. Partner cards with factory overclocks can have higher limits than the reference design, so use the partner model's own spec page when one exists. If the card has a 12V-2x6 or 12VHPWR socket, count it as a connector requirement as well as a wattage one.",
          "For the CPU, the number on the box is not always the number the chip draws. Intel publishes a base power and a maximum turbo power for each desktop processor on its ARK page, and the turbo figure is the one to budget for if your motherboard lets the chip run at it. AMD lists a TDP, and the power limit the chip is allowed to reach can be higher than that figure, so check the processor's product page and your board's power settings. Boards that remove or raise power limits by default can push a chip well past either number.",
          "Add the rest of the system last. Drives, fans, RGB, USB devices, memory and the motherboard together are usually a small share next to a high-end GPU, but a system with many fans, add-in cards and bus-powered devices is not the same as a bare build. A worked illustration: a card rated 285 W plus a CPU limit of 140 W is 425 W; adding roughly 75 W for everything else gives about 500 W of sustained load before any headroom. That is an example with invented parts, not a recommendation.",
        ],
      },
      {
        kind: "steps",
        heading: "A repeatable way to pick the wattage",
        intro: "Do these in order and write the numbers down so you can compare PSUs on the same basis.",
        steps: [
          {
            title: "Record the GPU's board power and the maker's recommended PSU",
            body: "Both are on the card's product page. If the two disagree widely, keep both numbers and use the higher one as a cross-check, not as a target.",
          },
          {
            title: "Record the CPU's maximum power, not its base power",
            body: "Use the maximum turbo power for Intel chips, and look up the allowed power limit for AMD chips if you plan to run with boosting enabled. If you plan to overclock, budget above the stock figure.",
          },
          {
            title: "Add an allowance for the rest of the system",
            body: "Count the drives, fans, add-in cards and USB devices you actually have. Do not add a flat number you cannot justify.",
          },
          {
            title: "Add headroom for peaks and for later upgrades",
            body: "Headroom covers the short excursions and lets the unit run below its limit. How much you add depends on the PSU's stated protections and on whether you expect to change the GPU later.",
          },
          {
            title: "Match connectors before you match price",
            body: "Count the PCIe 8-pin or 12V-2x6 outputs the GPU needs, plus the CPU 8-pin or 4+4-pin outputs the board needs. Confirm the PSU provides them natively, not through an adapter you would have to source.",
          },
        ],
      },
      {
        kind: "decision-table",
        heading: "What to look for by system type",
        intro: "These are starting points for what to verify, not wattage recommendations.",
        columns: ["Your system", "Check first", "Why it matters"],
        rows: [
          [
            "A single high-power GPU with a 12V-2x6 socket",
            "Native 12V-2x6 cable and stated ATX 3.x support",
            "The connector carries most of the card's power and the PSU has to handle its brief peaks.",
          ],
          [
            "A mid-range GPU with 8-pin connectors",
            "Number of PCIe 8-pin outputs and single-rail 12V capacity",
            "Older ATX 2.x units can be a sound match, so the connectors are the main question.",
          ],
          [
            "An unlocked CPU with raised power limits",
            "CPU 8-pin outputs and your board's power settings",
            "Sustained CPU draw can exceed the box TDP when limits are lifted.",
          ],
          [
            "A build you plan to upgrade the GPU in later",
            "Spare PCIe outputs and the cable standard",
            "Replacing a PSU later costs more than choosing the connectors now.",
          ],
        ],
      },
      {
        kind: "mistakes",
        heading: "Common mistakes",
        items: [
          {
            mistake: "Treating the calculator total as the PSU's limit",
            instead: "Use it as the steady load, then compare it with the PSU's wattage and its stated spike handling.",
          },
          {
            mistake: "Buying the largest wattage available to be safe",
            instead: "Pick a size that covers your numbers with margin. An oversized unit costs more and gains little unless you plan upgrades.",
          },
          {
            mistake: "Assuming an 80 PLUS label measures quality",
            instead: "80 PLUS certifies efficiency at set load points. Cybenetics also publishes noise and ripple grades, which cover other parts of the unit.",
          },
          {
            mistake: "Reusing a modular cable from another PSU",
            instead: "Modular sockets are not standardised between brands or even product lines. Use only the cables supplied with the unit.",
          },
        ],
      },
      {
        "kind": "check-your-pc",
        "heading": "Check what your current system actually draws",
        "intro": "Software cannot see microsecond spikes, but it can show you sustained draw and whether your hardware is already near its limits.",
        "items": [
          {
            "label": "GPU power draw under load",
            "how": "Run a game or a graphics benchmark you actually use with HWiNFO or GPU-Z open, and watch the GPU power reading and its maximum. These tools sample about once a second by default, so treat the maximum as a floor for the real peak, not the peak itself."
          },
          {
            "label": "CPU package power",
            "how": "In HWiNFO sensors, find CPU Package Power while running a long all-core task such as a video export. If the value sits well above the box TDP, your board is running with raised limits and the CPU belongs in your budget at that higher number."
          },
          {
            "label": "Your current PSU model and age",
            "how": "The label is on the unit, and many cases show it through the PSU window or on the side facing the rear. Note the wattage, the ATX version if printed, and the manufacture date. Capacitor ageing lowers the real headroom of a unit that has run for many years."
          },
          {
            "label": "Power limit options on your GPU",
            "how": "Most cards let you lower the power limit in the maker's tuning tool. If a restart only happens at full limit, that points toward a PSU margin problem rather than a software fault."
          }
        ]
      },
      {
        "kind": "explanation",
        "heading": "What a spike-related shutdown looks like",
        "paragraphs": [
          "The typical pattern is a PC that powers off or restarts abruptly at the moment a game loads a heavy scene, a benchmark starts or a render begins, while idle and light use are fine. There is usually no blue screen, because the PSU cut output before Windows could react. Fans stop at once and the system may need the power switch on the PSU toggled before it starts again.",
          "Other faults look similar, so rule them out before buying anything. A loose or daisy-chained GPU power cable, a CPU running into thermal shutdown, unstable memory overclocks and a failing PSU all end in sudden shutdowns. Check the event log for a Kernel-Power event 41 entry, which Windows writes after an unexpected power loss, and note whether the problem follows a particular program.",
          "A useful test is to lower the GPU power limit a notch or two, or apply a modest undervolt through the maker's tool, and repeat the trigger. If the shutdowns stop, the unit is probably short on margin for that card. That is a diagnosis, not a cure: it tells you the PSU is the limiting part, and you can then choose between living with a lower limit or replacing the unit."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Cabling choices that change how the PSU copes",
        "paragraphs": [
          "Give each PCIe 8-pin socket on the card its own cable from the PSU, rather than one cable with two plugs on a pigtail, whenever the unit supplies enough separate outputs. A pigtail shares one wire run between two connectors, which adds resistance and voltage drop at the moment of a peak. Cards that draw heavily are where this matters most.",
          "If your GPU uses a 12V-2x6 or 12VHPWR socket and your PSU lacks that output, a maker-supplied adapter is the usual route. Prefer the adapter that came with the card or with the PSU for that purpose, connect every 8-pin lead it asks for, and never plug fewer in than it was built for. The sense wires in the connector tell the card how much power the cable can carry, so a missing lead can force a lower limit or a refusal to start under load.",
          "Keep cables seated fully and avoid sharp bends right behind the plug. Repeated tight bending near a connector stresses the crimp and the contacts. Route the cable with room to curve gently, and check clearance with the side panel before closing the case."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Questions readers ask",
        "paragraphs": [
          "Can an older ATX 2.x PSU run a modern graphics card? Often yes, if it has the right connectors and enough 12V capacity, and many people run them without trouble. The risk is the one described above, where a short excursion trips protection on a unit that was never specified for it. If you see shutdowns only under the heaviest loads, that is the signal to consider an ATX 3.x unit, not a reason to replace a working PSU in advance.",
          "Does ATX 3.x mean the PSU will never shut down? No. It describes a design target for tolerating short excursions, and implementations differ between models. Read the maker's own statement of supported excursion levels and the connector it ships with, and treat third-party measurements as supporting evidence where they exist.",
          "Is a higher wattage the same as better spike handling? Not necessarily. A larger unit often gives more margin because the peak is a smaller share of its capability, but a well-designed 750 W unit can handle a peak better than a poorly designed 1000 W one. Wattage and spike handling are separate lines on the spec sheet.",
          "Should I buy a PSU for the GPU I plan to buy next year? Only if you know the card's connector and power class. Buying one size above your present needs is a reasonable margin; buying for an unknown future part tends to cost more than it saves, because connectors and standards can change in between."
        ]
      },
      {
        "kind": "callout",
        "tone": "note",
        "heading": "When to stop and ask the maker",
        "body": "If a unit is under warranty and shuts down in a way you can reproduce with a card the maker lists as supported, contact the PSU maker's support with your parts list before replacing anything. They can often confirm whether the model is rated for your GPU, and a replacement under warranty costs nothing."
      },
      {
        kind: "next-steps",
        heading: "Where to go next",
        items: [
          { label: "Best ATX 3.0 gaming PSUs", href: "/guides/best-gaming-psu-atx3", text: "Units that state ATX 3.x support." },
          { label: "Best PSUs for high-end GPUs", href: "/guides/best-psus-for-high-end-gpus", text: "For cards with 12V-2x6 connectors." },
          { label: "Best 850W power supplies", href: "/guides/best-850w-power-supplies", text: "A common size for a high-end GPU and a mainstream CPU." },
        ],
      },
    ],
  },
  {
    slug: "12v-2x6-vs-12vhpwr-vs-8-pin-psu-cables",
    type: "guide",
    status: "published",
    category: "components",
    subtopic: "power-supplies",
    seoTitle: "12V-2x6 vs 12VHPWR vs 8-Pin PSU Cables",
    title: "12V-2x6 vs 12VHPWR vs 8-Pin PCIe: What Your PSU Needs to Provide",
    dek: "Three connectors can power a graphics card. This guide covers what each does from the PSU side and what to confirm before buying.",
    metaDescription:
      "Compare 12V-2x6, 12VHPWR and 8-pin PCIe power cables from the PSU side, and learn what to check about native cables, adapters and modular sockets.",
    teaser: "Check whether your PSU has a native 12V-2x6 cable, how 8-pin adapters work and why modular cables are not interchangeable.",
    author,
    readTime: "9 min read",
    related: [
      "gpu-power-connectors-explained",
      "how-much-psu-wattage-does-your-pc-need",
      "choose-a-pc-power-supply",
      "best-psus-for-high-end-gpus",
    ],
    sources: [PCISIG, NVIDIA_GEFORCE, PLUS80],
    modules: [
      {
        kind: "key-takeaway",
        body: "An 8-pin PCIe connector is specified for 150 W, while the 16-pin 12V-2x6 and 12VHPWR connectors carry up to 600 W through one plug. 12V-2x6 is the revised form of 12VHPWR and uses the same plug shape, but with changes to the contact lengths that help the card detect a fully seated plug. For a card that needs this connector, buy a PSU that ships a native 12V-2x6 cable made for that exact model, because modular sockets on the PSU end are not interchangeable between brands.",
      },
      {
        kind: "explanation",
        heading: "What each connector is designed to carry",
        paragraphs: [
          "The 8-pin PCIe power connector has been the standard graphics power plug for years. Its specification allows 150 W per connector, and the PCIe slot itself can supply up to 75 W, which is why cards with one 8-pin socket are generally within a 225 W combined budget and cards with two are within 375 W. The older 6-pin connector is rated for 75 W.",
          "The 12VHPWR connector was defined to deliver up to 600 W through a single 16-pin plug: twelve current-carrying pins and four smaller sideband pins. The sideband pins let the card learn what the PSU or adapter can supply, so that it can limit its own draw if the cable is not rated for the full figure. The tradeoff for fewer cables is that more current runs through each small contact, which makes a fully seated plug and a sensible cable bend more important than they were with 8-pin plugs.",
          "12V-2x6 is the updated version that appears in the ATX 3.1 and PCIe CEM revisions. The plug shape is unchanged, so a 12V-2x6 cable fits a 12VHPWR socket and the other way round, but the sideband pins on the newer connector are recessed. If the plug is not fully seated, the card sees no valid signal and should not draw full power. You will see PSU makers and card makers use both names on their pages, and for a new purchase the 12V-2x6 name is the one to look for.",
        ],
      },
      {
        kind: "explanation",
        heading: "Native cables, adapters and modular sockets",
        paragraphs: [
          "Most graphics cards that use a 16-pin socket ship with an adapter that turns several 8-pin plugs into one 16-pin plug. These work, but they add bulk and extra connections, and the number of 8-pin leads they require can exceed what a smaller PSU has available. A PSU with a native 12V-2x6 cable replaces the adapter with a single run from the PSU to the card.",
          "On the PSU side, the cable plugs into a modular socket, and those sockets are not a shared standard. A cable from one brand, or even from an older model of the same brand, can fit the socket physically and still be wired differently. Using a cable that was not made for your PSU is a real risk to the components, so use the cable supplied with the unit or one that the PSU maker explicitly names for that model.",
          "Check how the cable is rated on the product page. Look for the connector's rated wattage, the wire gauge where it is listed, and whether it is a single 16-pin cable or a pair of 8-pin to 16-pin leads. A card with a 450 W or 600 W rated board expects a cable that can advertise that capacity through the sideband pins.",
        ],
      },
      {
        kind: "check-your-pc",
        heading: "What to confirm before you order",
        intro: "Do these checks against the GPU and PSU product pages, not from memory.",
        items: [
          {
            label: "Which connector the GPU has",
            how: "Read the card's spec page for the power connector line, for example 1x 16-pin or 2x 8-pin. Partner models of the same chip can differ.",
          },
          {
            label: "What the PSU ships in the box",
            how: "Look for native 12V-2x6 or 12VHPWR in the PSU's cable list, and count the PCIe 8-pin outputs separately.",
          },
          {
            label: "Whether the cable is rated for your card",
            how: "Match the cable's stated wattage to the card's board power. If a spec page lists only a connector name, ask the maker for the rating.",
          },
          {
            label: "Where the socket sits and how much space it has",
            how: "Check the clearance between the card's connector and the side panel. A cable that must bend sharply at the plug is a problem even when it is rated correctly.",
          },
        ],
      },
      {
        kind: "decision-table",
        heading: "Connector comparison",
        columns: ["Connector", "Rated power", "Where you will see it", "What to check on the PSU"],
        rows: [
          ["6-pin PCIe", "75 W", "Older and entry-level cards", "That the unit still provides one"],
          ["8-pin PCIe", "150 W", "Most mid-range and many high-end cards", "How many 8-pin outputs there are, and whether they sit on separate cables"],
          ["12VHPWR (16-pin)", "Up to 600 W", "Earlier cards that use the new connector", "A native cable, or an adapter with enough 8-pin leads"],
          ["12V-2x6 (16-pin)", "Up to 600 W", "Newer cards and ATX 3.1 PSUs", "A native cable made for your PSU model"],
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes that cause trouble",
        items: [
          {
            mistake: "Not pushing the 16-pin plug in fully",
            instead: "Seat it until it is flush and the latch is engaged, and look along the connector to confirm there is no gap.",
          },
          {
            mistake: "Bending the cable right next to the plug",
            instead: "Leave a straight run of cable as the maker advises before any bend, and use a case with enough side clearance.",
          },
          {
            mistake: "Chaining a pigtail 8-pin to power two sockets",
            instead: "Use separate cables per socket where the PSU provides them. A daisy-chained lead is a single cable carrying two loads.",
          },
          {
            mistake: "Buying a third-party cable because it fits",
            instead: "Buy only cables the PSU maker names for your model, since fitting a socket does not mean the pinout matches.",
          },
        ],
      },
      {
        "kind": "explanation",
        "heading": "Telling the three connectors apart by sight",
        "paragraphs": [
          "A PCIe 8-pin connector is the familiar rectangular plug with a latch on one side, built for three 12 V pins and several grounds, and it is specified to carry 150 W. A 6-pin is the smaller sibling at 75 W. Cards with several of these connectors, commonly two or three, take the sum, so a card with two 8-pin sockets can draw up to 300 W from the cables plus up to 75 W from the slot.",
          "The 12VHPWR and 12V-2x6 plug is a single compact connector with 12 larger power pins in two rows and a small row of four sideband pins above them. It is specified for up to 600 W. From the outside the two revisions look nearly identical. The change in 12V-2x6 is that the power pins are slightly longer and the sense pins slightly shorter, so that a plug that is not fully seated is less likely to deliver power.",
          "Because the housings are physically compatible, a 12V-2x6 cable can fit a 12VHPWR socket and the other way around. Compatibility on the page is not the same as a guarantee from the maker, so check the card's and PSU's documentation for the cable they intend you to use."
        ]
      },
      {
        "kind": "check-your-pc",
        "heading": "Inspecting the connection you already have",
        "intro": "If your build already uses a 12-pin style connector, these checks take a few minutes with the case open and the PC powered off and unplugged.",
        "items": [
          {
            "label": "Full seating",
            "how": "The plug should sit flush against the socket with no visible gap between the housing and the card's connector, and the latch should have clicked. A plug left slightly out is the commonly reported cause of overheated connectors, so reseat it if you are unsure."
          },
          {
            "label": "Cable bend distance",
            "how": "Look at where the cable leaves the plug. Many card and cable makers publish a minimum straight length before any bend. Check your maker's own figure, and if you cannot reach it, use a cable or adapter designed for a right-angle exit."
          },
          {
            "label": "Which cable is it",
            "how": "Identify whether the cable came from the PSU maker, the card maker or a third party. Use the one specified for your exact PSU model, because pin layouts at the PSU end differ between brands and product lines."
          },
          {
            "label": "Adapter leads",
            "how": "If the card shipped with an adapter, count how many 8-pin leads it wants and confirm that each one is plugged into its own PSU output, not into a splitter."
          },
          {
            "label": "Signs of heat",
            "how": "Look for discolouration, softened plastic or a smell on the plug and socket. If you see them, stop using the card and contact the card and cable makers."
          }
        ]
      },
      {
        "kind": "explanation",
        "heading": "What the sideband pins do",
        "paragraphs": [
          "The four small sideband pins let the cable tell the card how much power it can supply. On adapters that turn several 8-pin leads into one 12-pin plug, the pins are wired so that the number of connected leads sets the limit the card sees. This is why leaving one lead unplugged can lower the allowed power or stop the card working at load.",
          "Native cables from a modern PSU do the same job through the PSU's own design. You do not configure anything, but you should know why the system may behave differently when a cable is swapped for a cheaper lookalike without proper sense wiring."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Choosing between native cable and adapter",
        "paragraphs": [
          "A native 12V-2x6 cable from the PSU maker removes one connection point and usually gives a cleaner run with a shorter path between supply and card. Choose a PSU with this output when you are buying a unit for a card that uses the connector, or when you plan to move to one within the life of the PSU.",
          "An adapter is a sound and ordinary solution for an existing PSU with enough PCIe 8-pin outputs. Its weaknesses are bulk and the extra bend radius needed behind the plug, which matters in narrow cases. Check the clearance between the card's connector and the side panel before you commit, and read the case maker's stated GPU width and connector clearance where one exists."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Questions readers ask",
        "paragraphs": [
          "Can I plug a 12V-2x6 cable into a card that has the older 12VHPWR socket? Physically the connectors are designed to mate, and the revised plug is intended to be backward compatible. Confirm with the card maker if you plan to rely on it.",
          "Do I need a new PSU for a card with a 12-pin connector? Not always. If your PSU has enough 8-pin outputs and the card ships with a suitable adapter, it may work, but check the card maker's minimum PSU wattage and the number of 8-pin leads the adapter needs.",
          "Is it safe to reuse an old modular cable? Not between brands. The PSU-side pin layout differs, and plugging a cable into the wrong socket can damage parts. Use only the cables for your model."
        ]
      },
      {
        "kind": "callout",
        "tone": "caution",
        "heading": "Disconnect power before touching connectors",
        "body": "Switch the PSU off and unplug it from the wall before you reseat any graphics card cable. Press the power button once afterward to discharge stored energy, and do not work on the cable with the PC running."
      },
      {
        kind: "next-steps",
        heading: "Where to go next",
        items: [
          { label: "Best PSUs for high-end GPUs", href: "/guides/best-psus-for-high-end-gpus", text: "Units with native cables for large cards." },
          { label: "Best ATX 3.0 gaming PSUs", href: "/guides/best-gaming-psu-atx3", text: "Units listing ATX 3.x support." },
          { label: "Best fully modular PSUs", href: "/guides/best-fully-modular-psus", text: "Modular units, with the cable caution above." },
        ],
      },
    ],
  },

  /* ───────────────────────── storage ───────────────────────── */
  {
    slug: "pcie-5-vs-pcie-4-ssd-when-the-difference-matters",
    type: "guide",
    status: "published",
    category: "components",
    subtopic: "storage",
    seoTitle: "PCIe 5.0 vs PCIe 4.0 SSD: When It Matters",
    title: "PCIe 5.0 vs PCIe 4.0 SSD: When the Difference Matters",
    dek: "Gen5 drives post bigger sequential numbers, but most desktop work never reaches them. Here is how to decide for your workload.",
    metaDescription:
      "Compare PCIe 5.0 and PCIe 4.0 NVMe SSDs: bandwidth limits, heat, slot lane sharing and the workloads where a Gen5 drive actually helps.",
    teaser: "Check your motherboard's M.2 slots, your cooling and your workload to see whether a Gen5 drive earns its cost over Gen4.",
    author,
    readTime: "9 min read",
    related: ["nvme-vs-sata-ssd", "how-to-choose-an-nvme-ssd", "do-you-need-an-m-2-ssd-heatsink", "ssd-endurance-and-tbw-explained"],
    sources: [PCISIG, NVME, INTEL_ARK, AMD_RYZEN],
    modules: [
      {
        kind: "key-takeaway",
        body: "A PCIe 5.0 x4 link has roughly twice the raw bandwidth of PCIe 4.0 x4, but that only shows up when a task moves very large files in long sequences. For a game library, a boot drive or everyday work, a good Gen4 drive is usually limited by the work you do, not by the interface. Choose Gen5 when you move or edit very large files often, you have a Gen5-capable slot and cooling for it, and the price difference does not cost you capacity.",
      },
      {
        kind: "explanation",
        heading: "What the interface actually changes",
        paragraphs: [
          "PCIe 4.0 runs at 16 GT/s per lane and PCIe 5.0 at 32 GT/s. With the four lanes an M.2 SSD normally uses, that works out to a theoretical ceiling near 8 GB/s for Gen4 and near 16 GB/s for Gen5, before protocol overhead. Real drives sit below those ceilings, and the sequential speeds printed on a product page describe best-case reads and writes on large transfers.",
          "That ceiling is not the only thing that sets how fast a drive feels. Random read latency, behaviour at low queue depth and how the controller handles mixed workloads decide how quickly a PC launches programs, loads a game level or opens a project. Those depend on the controller, the flash and the firmware, and they differ less between Gen4 and Gen5 drives than sequential numbers suggest.",
          "Storage is rarely the limiting part in everyday use either. A load screen or a program launch also spends time on the CPU, on decompression and on the application's own code. When the drive is not the slowest step, a faster drive shortens the wait very little.",
        ],
      },
      {
        kind: "explanation",
        heading: "Heat, slots and lane sharing",
        paragraphs: [
          "Gen5 controllers can draw more power and run hotter than Gen4 ones, which is why many Gen5 drives ship with a sizeable heatsink or ask for active airflow. A drive that throttles under sustained writes can end up slower than a cooler Gen4 drive in the same task. Check the drive's thermal solution against your motherboard's M.2 heatsink and the space around the slot, and see our M.2 heatsink guide for how clearance works.",
          "Not every M.2 slot supports Gen5. Many boards provide one Gen5 slot wired to the CPU and the others at Gen4 from the chipset, and board makers state the generation per slot in the manual. On some boards, populating a Gen5 slot changes how the lanes to the graphics slot or another M.2 slot are shared, so read the lane-sharing notes before you plan a multi-drive layout.",
          "A Gen5 drive also works in a Gen4 slot. It simply runs at Gen4 speed, so buying one ahead of a platform upgrade is possible, but you pay the Gen5 premium without the benefit until the slot catches up. Both generations are backwards and forwards compatible at the link level.",
        ],
      },
      {
        kind: "decision-table",
        heading: "Which workloads can use the extra bandwidth",
        columns: ["Workload", "Gen4 drive", "Gen5 drive"],
        rows: [
          ["Boot drive and everyday apps", "Fully adequate for most users", "Little or no practical gain"],
          ["Game library", "Adequate for current titles; storage rarely sets load time alone", "Helps only where a game's loading is storage-bound and uses fast streaming"],
          ["Editing large video or RAW files", "A strong fit for most projects", "Can shorten large copies and scrubbing of very high bitrate media"],
          ["Large dataset or scratch work", "Capable, check sustained write", "Useful if the task is sequential and cooled well"],
          ["Mixed multi-drive builds", "Easy to place in any M.2 slot", "Needs the one Gen5 slot and a plan for lane sharing"],
        ],
      },
      {
        kind: "check-your-pc",
        heading: "Check before you buy a Gen5 drive",
        items: [
          { label: "Slot generation", how: "Find the slot labelled PCIe 5.0 x4 in the motherboard manual's M.2 table, and note which lanes it takes." },
          { label: "CPU and chipset lanes", how: "Look up your processor on Intel ARK or AMD's product page for the PCIe lane count and generation the CPU provides." },
          { label: "Heatsink and airflow", how: "Compare the drive's heatsink height with the space under your graphics card and the board's included M.2 cover." },
          { label: "Sustained speed, not peak", how: "Prefer reviews that show sustained writes with a heatsink, because peak numbers only describe short bursts." },
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Paying for Gen5 and then using a Gen4 slot", instead: "Confirm the slot generation first, or buy a Gen4 drive and put the money into capacity." },
          { mistake: "Choosing on the sequential number alone", instead: "Compare random performance, sustained write and the drive's endurance rating." },
          { mistake: "Ignoring cooling", instead: "Plan the heatsink and case airflow, since a hot drive may reduce its speed." },
          { mistake: "Buying less capacity to afford Gen5", instead: "Capacity usually serves a library better than extra bandwidth does." },
        ],
      },
      {
        "kind": "explanation",
        "heading": "What the bandwidth numbers mean",
        "paragraphs": [
          "PCIe 4.0 runs each lane at 16 GT/s and PCIe 5.0 at 32 GT/s. An NVMe drive normally uses four lanes, which gives a theoretical ceiling of roughly 7.9 GB/s for PCIe 4.0 x4 and roughly 15.8 GB/s for PCIe 5.0 x4, before protocol overhead. Drive makers print peak sequential read and write figures that approach those ceilings.",
          "Those are best-case figures for large sequential transfers at a high queue depth. Everyday work, such as loading an application, opening a project or booting Windows, is mostly small reads at low queue depths where the interface limit is rarely reached. That is why a faster interface does not translate into proportionally faster everyday use."
        ]
      },
      {
        "kind": "check-your-pc",
        "heading": "Check what your board and slot support",
        "intro": "A fast drive only runs fast when the slot and CPU can carry it.",
        "items": [
          {
            "label": "Which M.2 slot is Gen 5",
            "how": "Open the motherboard manual or product page and find the M.2 section. Boards list each slot's interface and whether it is wired to the CPU or the chipset. On many boards only one slot is PCIe 5.0, and some boards have none."
          },
          {
            "label": "Lane sharing with the graphics slot",
            "how": "Some boards split CPU lanes between the top PCIe slot and a Gen 5 M.2 slot, so populating the M.2 slot can drop the GPU slot from x16 to x8. The manual's lane table states this."
          },
          {
            "label": "What your current drive negotiates",
            "how": "CrystalDiskInfo shows the transfer mode of an NVMe drive, such as PCIe 4.0 x4. If it reports a lower link than expected, the slot, the BIOS setting or the drive is the limit."
          },
          {
            "label": "CPU generation",
            "how": "Look at your CPU's product page on Intel ARK or the AMD site for its PCIe version and lane count, which sets what the CPU-attached slots can do."
          },
          {
            "label": "Heatsink space",
            "how": "Gen 5 drives run hot. Check whether the board's M.2 heatsink is included and whether a large graphics card will cover the slot."
          }
        ]
      },
      {
        "kind": "explanation",
        "heading": "Heat and throttling",
        "paragraphs": [
          "Faster controllers draw more power, and many PCIe 5.0 drives ship with large heatsinks or ask for active airflow. A drive that overheats lowers its speed to protect itself, which can leave it no faster than a good PCIe 4.0 drive in a long transfer. Read the maker's cooling guidance and the thermal throttle behaviour in independent reviews of the exact model.",
          "If your case has little airflow around the M.2 slot, or the slot sits under a graphics card, the cooler PCIe 4.0 drive is often the better engineering choice for that build."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Where Gen 5 can pay off",
        "paragraphs": [
          "The workloads that can use the extra bandwidth are those moving large files between fast sources, for example copying multi-hundred-gigabyte video projects from one NVMe drive to another, working with very large scratch files, or loading large datasets. The source or destination must also be fast, because a transfer is limited by the slower side.",
          "For most gaming, browsing and office use, the real-world gain is small, so compare total cost per terabyte and the risk of throttling before paying more. A Gen 5 drive in a Gen 4 slot works but runs at Gen 4 speed."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Questions readers ask",
        "paragraphs": [
          "Will a Gen 5 drive damage anything in an older board? No. The standard is backward compatible, so the drive links at the highest speed both sides support. You pay for speed you will not use, though.",
          "Does DirectStorage need Gen 5? No. It reduces CPU load for asset loading and is designed to work on fast NVMe drives generally; check each game's own requirements.",
          "Is the price premium falling? Prices change, so compare cost per terabyte at the time you buy rather than relying on any figure printed in an article."
        ]
      },
      {
        "kind": "callout",
        "tone": "note",
        "heading": "A practical rule",
        "body": "Pick the platform and slot first, then pick the drive. If you have a PCIe 4.0 slot and no workload that moves huge files, a high-quality PCIe 4.0 drive from a maker with strong endurance and warranty terms usually serves you better than a hotter, dearer Gen 5 model."
      },
      {
        kind: "next-steps",
        heading: "Where to go next",
        items: [
          { label: "Best PCIe 5.0 SSDs", href: "/guides/best-pcie-5-0-ssds", text: "If your slot and workload justify it." },
          { label: "Best PCIe 4.0 SSDs", href: "/guides/best-pcie-4-0-ssds", text: "Where most builds land." },
          { label: "Best M.2 SSD heatsinks", href: "/guides/best-m2-ssd-heatsinks", text: "Cooling for hotter drives." },
        ],
      },
    ],
  },
  {
    slug: "ssd-dram-cache-slc-cache-and-nand-types-explained",
    type: "guide",
    status: "published",
    category: "components",
    subtopic: "storage",
    seoTitle: "SSD DRAM, SLC Cache and TLC vs QLC",
    title: "SSD DRAM, SLC Cache and NAND Types: What the Spec Sheet Hides",
    dek: "Two SSDs with the same capacity and peak speed can behave very differently after a long write. These are the traits behind that gap.",
    metaDescription:
      "Understand SSD DRAM cache, DRAM-less drives with HMB, SLC write caching and TLC versus QLC NAND, and learn which traits matter for your workload.",
    teaser: "Learn what DRAM, HMB, SLC caching and NAND type mean on a spec sheet, and when each one affects your drive's real behaviour.",
    author,
    readTime: "8 min read",
    related: ["how-to-choose-an-nvme-ssd", "ssd-endurance-and-tbw-explained", "nvme-vs-sata-ssd", "how-to-choose-a-game-drive-for-pc"],
    sources: [NVME, INTEL_ARK],
    modules: [
      {
        kind: "key-takeaway",
        body: "The headline speed of an SSD describes short bursts. How it behaves on long writes and mixed work depends on its NAND type (TLC or QLC), whether it has its own DRAM or borrows system memory through Host Memory Buffer, and how large its SLC write cache is. For a boot drive or a game library, a DRAM-less TLC drive is often fine; for sustained heavy writes, look for a drive that states its sustained behaviour, not only its peak.",
      },
      {
        kind: "explanation",
        heading: "What DRAM does inside an SSD",
        paragraphs: [
          "An SSD keeps a map that translates the addresses the operating system uses into the physical places on the flash where data really lives. A drive with its own DRAM chip holds that map in fast memory. A drive without DRAM keeps most of it on the flash itself and reads parts of it as needed.",
          "To soften the cost, many NVMe drives without DRAM use Host Memory Buffer, a feature in the NVMe standard that lets the drive borrow a small slice of the computer's system memory for the map. This helps random access on typical desktop use. It also means the drive depends on the host supporting the feature, which is normal on current Windows PCs but is not guaranteed in every environment, such as some older systems or a drive placed in an enclosure.",
          "None of this means a DRAM drive is automatically better or a DRAM-less one automatically worse. Controller design, firmware and the flash also matter. The practical reading is that DRAM matters more for workloads that touch the whole drive heavily at random, such as a busy scratch disk or a database, and less for a boot drive and a game library.",
        ],
      },
      {
        kind: "explanation",
        heading: "SLC cache and why write speed changes",
        paragraphs: [
          "Most consumer drives write incoming data quickly by temporarily using part of their flash in a faster, single-bit-per-cell mode called an SLC cache. While the cache has room, writes run at the advertised speed. When it fills during a long copy, the drive has to write directly to the slower multi-bit cells and the speed drops.",
          "The size of the cache can depend on how much of the drive is free, so the same drive can write fast when mostly empty and slower when nearly full. Manufacturers state the cache size for some drives and not for others, so the absence of a figure is a reason to look for a review that tested sustained writes.",
          "For everyday use you rarely notice any of this, since normal writes are small and the cache has time to empty in the background. It shows up when you copy a very large amount of data in one go, such as moving a whole game library or a day of high bitrate footage.",
        ],
      },
      {
        kind: "decision-table",
        heading: "TLC versus QLC",
        intro: "The number refers to how many bits each flash cell stores.",
        columns: ["", "TLC (3 bits per cell)", "QLC (4 bits per cell)"],
        rows: [
          ["Typical position", "Mainstream and performance drives", "Capacity-focused and budget drives"],
          ["Sustained writes", "Generally holds speed better once cache is full", "Often drops further when cache is full"],
          ["Endurance rating", "Commonly higher, so check the TBW for the specific drive", "Commonly lower, so check the TBW for the specific drive"],
          ["Good fit", "Boot drive, game library, mixed work", "Mostly-read libraries, secondary storage"],
        ],
      },
      {
        kind: "check-your-pc",
        heading: "What to read on a product page",
        items: [
          { label: "NAND type", how: "Look for TLC or QLC in the spec table. If it is not stated, check the maker's datasheet or a review." },
          { label: "DRAM or HMB", how: "Check whether the drive lists a DRAM cache or says DRAM-less, and whether it states HMB support." },
          { label: "Endurance (TBW)", how: "Compare the rated terabytes written for the capacity you are buying, because the rating scales with capacity." },
          { label: "Sustained write", how: "Look for a test that writes a large file to a nearly full drive, since that shows cache exhaustion." },
        ],
      },
      {
        kind: "choose-if",
        heading: "Which traits to prioritise",
        options: [
          { choice: "A DRAM-less TLC drive suits you", when: ["You mainly boot Windows, launch apps and load games", "You do not write very large files in one go", "You want a lower price at the same capacity"] },
          { choice: "Look for DRAM and higher endurance", when: ["You run a scratch disk, a database or virtual machines", "You write many gigabytes daily", "You edit large media projects directly from the drive"] },
          { choice: "A QLC drive can work", when: ["The drive mostly stores files you read more than you write", "You want the largest capacity for the price", "You keep a backup of what matters"] },
        ],
      },
      {
        kind: "mistakes",
        heading: "Common mistakes",
        items: [
          { mistake: "Reading peak speed as sustained speed", instead: "Treat the printed numbers as the best case with an empty cache." },
          { mistake: "Rejecting every DRAM-less drive", instead: "Judge it by your workload. HMB handles typical desktop use well on supported systems." },
          { mistake: "Filling the drive to the last gigabyte", instead: "Keep free space, since write caching and wear behaviour both benefit from it." },
        ],
      },
      {
        "kind": "check-your-pc",
        "heading": "Find out what your drive really is",
        "intro": "Marketing names rarely say what memory or cache a drive uses.",
        "items": [
          {
            "label": "Exact model and firmware",
            "how": "CrystalDiskInfo shows the model string and firmware. Use the exact string when you search for reviews, because makers sometimes change controllers or NAND under the same product name."
          },
          {
            "label": "Rated endurance",
            "how": "Look up the TBW or DWPD figure on the maker's data sheet. This is the amount of data written that the warranty covers and it varies a lot between models."
          },
          {
            "label": "Free space",
            "how": "Open File Explorer and check how full the drive is. A drive close to full has little room for dynamic SLC cache, which affects sustained write speed."
          },
          {
            "label": "Sustained write behaviour",
            "how": "Find a review of your exact model that graphs write speed over a long transfer. Those graphs show how fast the drive writes once its cache is full, which is the figure the spec sheet usually omits."
          }
        ]
      },
      {
        "kind": "explanation",
        "heading": "Why speed drops during a long copy",
        "paragraphs": [
          "Most consumer drives write incoming data into a fast mode first. They treat part of the NAND as single-bit-per-cell storage, called an SLC cache, and move it into its final denser form later. A copy that fits inside the cache runs at the quoted speed, then falls to the drive's native write speed when the cache fills.",
          "On TLC drives the drop is often moderate, while on QLC drives it can be steep, because storing four bits per cell is slower to write. The size of the cache can also depend on how much free space the drive has. A fuller drive can have a smaller cache and drop sooner.",
          "This only matters if you write large amounts at a time. Saving documents, installing games and normal browsing seldom exceed the cache, so most people never see the drop. Video editors, people who copy whole libraries, and anyone using the drive as a capture target are the readers who should look at sustained write data."
        ]
      },
      {
        "kind": "explanation",
        "heading": "DRAM-less drives and host memory buffer",
        "paragraphs": [
          "A DRAM chip on the drive stores the table that maps logical addresses to physical locations. Drives without it can keep part of that table in system memory through the NVMe Host Memory Buffer feature, using a modest slice of RAM. For light use that works well, and many good budget drives are built this way.",
          "The trade-off shows under heavy random work and when the drive is mostly full, where a DRAM-equipped drive tends to stay more consistent. If the drive is a scratch or project disk, DRAM is a sensible thing to want. If it is a secondary game library, DRAM-less is often fine."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Questions readers ask",
        "paragraphs": [
          "Is QLC bad? It is not unreliable by definition, but it usually has lower endurance and slower sustained writes than TLC. It suits read-heavy storage such as game libraries and archives.",
          "Does a bigger drive write faster? Often yes within a product line, because a larger drive has more NAND dies working in parallel and a larger cache. Check the maker's table of speeds by capacity.",
          "Does keeping some space free help? Yes. Leaving a reasonable share of the drive free gives the controller room to manage cache and wear, and keeps long writes closer to the best case."
        ]
      },
      {
        kind: "next-steps",
        heading: "Where to go next",
        items: [
          { label: "Best NVMe SSDs for gaming", href: "/guides/best-nvme-ssd-gaming", text: "Boot and game drives." },
          { label: "Best 4TB NVMe SSDs", href: "/guides/best-4tb-nvme-ssds", text: "Where QLC and TLC choices show up." },
          { label: "Best SSDs for OS", href: "/guides/best-ssd-for-os", text: "For boot drives." },
        ],
      },
    ],
  },

  /* ───────────────────────── graphics-cards ───────────────────────── */
  {
    slug: "will-this-gpu-fit-my-case-and-psu",
    type: "guide",
    status: "published",
    category: "components",
    subtopic: "graphics-cards",
    seoTitle: "Will This GPU Fit My Case and PSU?",
    title: "Will This GPU Fit My Case and PSU? A Pre-Purchase Checklist",
    dek: "Length, thickness, connectors and wattage all have to line up. This checklist covers each one with the numbers to look up.",
    metaDescription:
      "Check whether a graphics card fits your case and PSU: card length, slot width, connectors, cable clearance and power requirements, with what to measure.",
    teaser: "Measure case clearance, count slots and connectors, and match the card's power needs to your PSU before you buy.",
    author,
    readTime: "9 min read",
    related: ["gpu-power-connectors-explained", "check-a-graphics-card-upgrade", "how-much-psu-wattage-does-your-pc-need", "how-to-choose-a-pc-case"],
    sources: [NVIDIA_GEFORCE, PCISIG, AMD_RYZEN],
    modules: [
      {
        kind: "key-takeaway",
        body: "A graphics card fits when five things agree: its length and thickness fit the space the case provides, it leaves room for other cards and fans, its power connectors match what the PSU provides, the PSU can carry its load, and the motherboard slot and cooling can support it. Look up the card's exact dimensions on the partner model's own page, since cards built on the same chip vary by several centimetres, and compare them with your case's stated maximum GPU length.",
      },
      {
        kind: "explanation",
        heading: "Length, thickness and what sits in front of the card",
        paragraphs: [
          "Case makers state a maximum GPU length in the spec sheet, but the number can assume that the front fans or a radiator are not installed. If you mount a radiator or thick fans at the front, or a drive cage sits in the card's path, the usable length is shorter than the printed maximum. Measure from the back of the PCIe slot area to the nearest obstacle and compare that with the card's length listed by the card maker.",
          "Thickness is measured in slots. A card may be described as 2.5-slot or 3-slot, which means it covers that many rear expansion positions and extends into the space of the PCIe slots below. That affects whether a second add-in card, such as a capture card or an extra drive adapter, still has a usable slot. It also affects the case's expansion slot count and any vertical mount bracket.",
          "Also check height. Some large cards rise above the top of the PCIe bracket and can press against the side panel or a front-mounted radiator in narrow cases. The card maker gives length, height and thickness, and case makers state width clearance. If any figure is missing, ask the maker before purchase.",
        ],
      },
      {
        kind: "explanation",
        heading: "Connectors, cable bends and the PSU",
        paragraphs: [
          "Read the connector line on the card's spec page, for example one 16-pin or two 8-pin, then count what your PSU actually has on separate cables. The power connector sits on the top edge or the rear end of the card, so the case must leave room for the cable to plug in and run without a sharp bend. A 16-pin plug in particular needs a straight run before the bend, which means narrow cases with little side clearance can be a problem.",
          "Check the wattage next. The card maker gives a recommended PSU size, and your CPU and other parts add to that. Our guide to sizing a PSU shows how to total the numbers. If your PSU is an older design with limited connectors, factor the adapter or replacement into the cost of the card.",
          "Finally, confirm the motherboard slot. Most modern cards use a PCIe x16 slot, usually wired to the CPU, and work at the slot's generation. A card that runs on x8 lanes or an older generation still works, but check the manual in case an M.2 slot or other device shares the lanes. Heavy cards can sag, so a support bracket in a case without a built-in stand helps keep the slot and card undamaged.",
        ],
      },
      {
        kind: "check-your-pc",
        heading: "Measurements to take before you order",
        items: [
          { label: "Free length in the case", how: "Measure from the back of the slot area to the front obstacle, with fans and radiators in place." },
          { label: "Slot count and space below", how: "Count free rear slots and the clearance to the next PCIe slot and the PSU shroud." },
          { label: "Side clearance at the connector", how: "Measure from the card's top edge to the side panel and compare it with the plug and cable bend radius." },
          { label: "Connector count on the PSU", how: "List the free PCIe 8-pin or 12V-2x6 outputs and whether each sits on its own cable." },
          { label: "PSU wattage versus the card and CPU", how: "Use the card maker's recommended PSU wattage and add your CPU's maximum power." },
        ],
      },
      {
        kind: "decision-table",
        heading: "What each mismatch means",
        columns: ["Problem you find", "Effect", "Options"],
        rows: [
          ["Card longer than case allows", "It cannot be installed", "Choose a shorter model, or change the case"],
          ["Card too thick for the slots below", "Blocks another add-in card", "Move the add-in card, or pick a slimmer model"],
          ["Not enough connectors on the PSU", "Card will not power on or runs at a limit", "Use a PSU with the right native cables, or a card with fewer connectors"],
          ["PSU wattage near the limit", "Risk of shutdowns under load", "Step up one size, or pick a lower-power card"],
          ["Tight side clearance", "Cable strain at the connector", "Pick a wider case, or a card with a connector in a different position"],
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Comparing the chip name only", instead: "Look up the partner model's exact dimensions, because cooler designs differ in length and thickness." },
          { mistake: "Forgetting front fans or radiators", instead: "Subtract their depth from the case's stated maximum GPU length." },
          { mistake: "Assuming adapters solve connector shortages", instead: "Count the PSU outputs behind the adapter, since each plug still needs a cable." },
        ],
      },
      {
        "kind": "steps",
        "heading": "Measure instead of guessing",
        "intro": "Four numbers settle most fit questions. Gather them before you order.",
        "steps": [
          {
            "title": "Card length from the maker's page",
            "body": "Use the exact partner model's published length, which includes the cooler and sometimes the backplate. Reference-design numbers are not reliable for a custom card."
          },
          {
            "title": "Case clearance, front to back",
            "body": "Find the maximum GPU length in the case specification and then subtract anything that you plan to mount in front, such as a thick radiator and fans. Some specifications give two figures, one with and one without a front fan."
          },
          {
            "title": "Card thickness and height",
            "body": "Cards are described by slot width, such as two or three slots, and may rise above the bracket. Check the case's expansion slot count and the space between the card and the side panel, and the width of the PSU shroud."
          },
          {
            "title": "Power connector position and bend room",
            "body": "Note where the power socket sits on the card and how much space the cable needs before it meets the side panel. A 12-pin plug at the top edge needs extra room behind it."
          }
        ]
      },
      {
        "kind": "explanation",
        "heading": "Windows tools to identify what you have now",
        "paragraphs": [
          "Press Windows and R, type msinfo32 and read the Components then Display page for the current graphics model. GPU-Z shows the exact card, its bus interface and its BIOS version. In Task Manager's Performance tab, the GPU entry shows the model and dedicated memory.",
          "For the PSU there is no software readout of the model. Read the label on the unit, which gives wattage and the number of connectors printed on the cable sockets. If the PSU is modular, the cable set in the box tells you which PCIe cables you own."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Fits in the case but not the PSU, and the reverse",
        "paragraphs": [
          "A card can physically fit and still lack power. Check the number of PCIe power connectors the card needs and the number your PSU provides on separate cables. A PSU might list four PCIe sockets but only supply two cables, with each carrying two plugs, and the maker's manual shows how each socket is meant to be used.",
          "The reverse also happens: the PSU is fine but a long PSU blocks drive cages or limits cable routing near the card. Add margin to the PSU length figure, and check the case's maximum PSU length."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Questions readers ask",
        "paragraphs": [
          "Can I mount the card vertically to save space? Only with a case and riser designed for it, and you need to confirm that the riser supports the PCIe generation the card uses.",
          "Do I need a support bracket? Heavy cards can sag, which stresses the slot. A bracket or the case's own support helps, and it is cheap compared with replacing a board.",
          "Will a three-slot card block my other slots? Yes, it covers adjacent slots and may block the first of them. Plan your add-in cards around it, as described in our PCIe slots guide."
        ]
      },
      {
        kind: "next-steps",
        heading: "Where to go next",
        items: [
          { label: "Best PC cases for RTX 4090", href: "/guides/best-pc-cases-for-rtx-4090", text: "Cases with room for the largest cards." },
          { label: "Best PSUs for high-end GPUs", href: "/guides/best-psus-for-high-end-gpus", text: "Native cables for large cards." },
          { label: "Best graphics cards", href: "/guides/best-graphics-cards", text: "When you are ready to pick the card." },
        ],
      },
    ],
  },
  {
    slug: "how-to-read-graphics-card-names-ti-super-xt-oc",
    type: "guide",
    status: "published",
    category: "components",
    subtopic: "graphics-cards",
    seoTitle: "How to Read GPU Names: Ti, Super, XT, OC",
    title: "How to Read Graphics Card Names: Ti, Super, XT and OC Editions",
    dek: "The same GPU can appear under several partner names and suffixes. Learn what each part of a card's name tells you.",
    metaDescription:
      "Decode graphics card names: chip family, Ti, Super, XT and XTX suffixes, partner models and OC editions, and what to compare before buying one.",
    teaser: "Separate the GPU chip from the partner's cooler and clock options so you compare like with like.",
    author,
    readTime: "8 min read",
    related: ["how-much-vram-do-you-need", "gpu-power-connectors-explained", "how-to-choose-a-graphics-card-for-1440p-gaming", "will-this-gpu-fit-my-case-and-psu"],
    sources: [NVIDIA_GEFORCE, AMD_RYZEN],
    modules: [
      {
        kind: "key-takeaway",
        body: "A graphics card name has two parts that readers often blur: the GPU the chipmaker designs (for example a GeForce RTX or Radeon RX model with a suffix such as Ti, Super, XT or XTX) and the product the partner builds around it (the brand, the cooler, the clock and the size). Compare the chip model for performance class and the partner product for cooling, noise, size and warranty. Do not compare across suffixes by number alone, because the suffix changes the hardware.",
      },
      {
        kind: "explanation",
        heading: "The chip name",
        paragraphs: [
          "NVIDIA and AMD each name their GPUs with a family, a generation number and a tier. The leading digits normally indicate the generation, and the trailing digits the tier within it. Higher tier numbers in the same generation generally mean more compute units and memory, but the pattern is not identical between the two companies, and it can change from one generation to the next.",
          "Suffixes mark a variant of the tier. NVIDIA has used Ti and Super for versions of a model with more enabled hardware or other changes, while AMD uses XT and XTX for versions above a base model. A suffixed card is a different configuration, so the memory size, memory bus and power figure can differ from the base card. Read the chipmaker's spec page for that exact name.",
          "The memory type and amount are part of the model, but the same name has occasionally shipped in more than one memory size. Always check the VRAM figure and the bus width on the specific card you intend to buy, and use our VRAM guide to decide how much your resolution needs.",
        ],
      },
      {
        kind: "explanation",
        heading: "The partner product",
        paragraphs: [
          "Brands such as ASUS, MSI, Gigabyte, Sapphire and others build cards on the chipmaker's GPU and add their own cooler, board and branding. Two cards with the same chip name can differ in length, thickness, fan count, noise and boost clocks. That is why a partner card's page, not the chip's page, gives the dimensions you need before comparing it with your case.",
          "Labels such as OC, Gaming, Dual, Ventus, Pulse or Nitro are marketing names that differ by brand. OC normally means a factory overclock, which is a small clock increase over the reference figure. The gain from a factory overclock is usually modest compared with the price difference between models, so read what you get for the extra cost, such as a better cooler or a longer warranty.",
          "Some partner lines also change the power connector arrangement or add features like a dual BIOS or a metal backplate. These are specifics, so verify them on the product page and not by assumption from the line name.",
        ],
      },
      {
        kind: "decision-table",
        heading: "What a name element tells you",
        columns: ["Part of the name", "What it usually signals", "Check on the spec page"],
        rows: [
          ["Generation and tier digits", "Product family and performance class", "Compute units or cores, memory size"],
          ["Ti, Super, XT, XTX", "A variant configuration of the tier", "VRAM, memory bus, board power"],
          ["OC, Gaming, Dual, etc.", "Partner marketing line", "Length, thickness, boost clock, warranty"],
          ["Memory size such as 12GB", "VRAM amount", "Whether other sizes of the same name exist"],
        ],
      },
      {
        kind: "choose-if",
        heading: "How to use this when shopping",
        options: [
          { choice: "Compare chip variants first", when: ["You are choosing between tiers of the same generation", "You care about VRAM and resolution", "You want to know what the suffix adds"] },
          { choice: "Compare partner models next", when: ["Two cards share a chip", "Noise, size and warranty differ", "Your case has a length limit"] },
          { choice: "Pay for OC only for a reason", when: ["The price gap is small", "The model has a better cooler or fans", "The longer warranty matters to you"] },
        ],
      },
      {
        kind: "mistakes",
        heading: "Common mistakes",
        items: [
          { mistake: "Assuming Ti or Super only means higher clocks", instead: "Read the spec page, since the hardware configuration changes with the suffix." },
          { mistake: "Comparing partner cards by clock speed alone", instead: "Compare cooling, noise and size, since the clock gap is usually small." },
          { mistake: "Skipping the VRAM line", instead: "Confirm the memory size and bus on the exact listing." },
        ],
      },
      {
        "kind": "check-your-pc",
        "heading": "Identify the card you already own",
        "intro": "Names on boxes and receipts are often shortened. These checks give the exact model.",
        "items": [
          {
            "label": "Task Manager",
            "how": "Open Task Manager, go to Performance and select GPU. The model name and dedicated memory are at the top right, which separates, for example, an 8 GB variant from a 16 GB one."
          },
          {
            "label": "GPU-Z",
            "how": "The free GPU-Z tool lists the GPU chip, memory size and type, bus width and the partner BIOS version. The Lookup button opens a database entry for the exact board."
          },
          {
            "label": "The card's sticker or backplate",
            "how": "The product number printed on the card or its box is the identifier to use when you look up the cooler, power connectors and length on the maker's page."
          },
          {
            "label": "Device Manager",
            "how": "The Display adapters entry confirms the driver sees the same chip you think you bought, which helps when a listing was vague."
          }
        ]
      },
      {
        "kind": "explanation",
        "heading": "Reading the naming layers in order",
        "paragraphs": [
          "A graphics card name stacks several pieces of information. The chip family comes first, such as GeForce RTX or Radeon RX. Then comes a model number, whose first digits normally indicate the generation and whose last digits indicate where the card sits in that generation's range. After that may come a suffix such as Ti, SUPER, XT or XTX, which marks a variant of the same number.",
          "Finally the board partner adds its own series name and sometimes OC or a similar tag, for example a gaming, strix or windforce style label. Those series names describe the cooler, the board and the factory settings, and they differ between partners even for the same chip. Two cards with the same chip can differ in length, thickness, fan count, noise and power connectors.",
          "The one reliable habit is to compare the specification sheet, not the name. Look at memory capacity, memory bus width, memory type, board power and the connector. Those fields describe what the card is, and naming conventions change from one generation to the next."
        ]
      },
      {
        "kind": "explanation",
        "heading": "When one name hides different products",
        "paragraphs": [
          "Some model numbers have been sold with more than one memory capacity, and the capacity alone can change how the card performs in memory-hungry software. Always read the memory figure from the product page, not just from the headline name.",
          "Laptop GPUs often reuse desktop-style names while being different parts with lower power limits. If a listing is for a laptop or a pre-built system, the name does not describe the same product as a desktop card with the same number.",
          "Refurbished and OEM cards sometimes have a different cooler or board than the retail version and may come without the retail accessories or warranty terms. Check what the seller states about the exact model and its warranty."
        ]
      },
      {
        "kind": "explanation",
        "heading": "What OC and factory overclocks are worth",
        "paragraphs": [
          "An OC card is the same chip with a higher clock set at the factory. The gain is typically small and depends on the workload, the power limit and the cooler. The cooler and board quality that usually come with an OC model can matter more than the clock offset, for example in noise.",
          "Pay for an OC card when the cooler, size or noise of that model is what you want. Do not pay a large premium for the clock alone, because most cards can be tuned manually within their own limits."
        ]
      },
      {
        "kind": "choose-if",
        "heading": "How to choose between similar names",
        "options": [
          {
            "choice": "Pick the base model",
            "when": [
              "You want the lowest price for the chip and the card fits your case.",
              "You plan to tune the card yourself or leave it at stock."
            ]
          },
          {
            "choice": "Pick a partner model with a bigger cooler",
            "when": [
              "Noise matters to you and your case has the clearance.",
              "Your workload runs the card at full load for hours."
            ]
          },
          {
            "choice": "Pick the suffix variant",
            "when": [
              "The spec sheet shows more memory or a wider bus that your software uses.",
              "The price gap is small compared with what the spec sheet adds."
            ]
          }
        ]
      },
      {
        kind: "next-steps",
        heading: "Where to go next",
        items: [
          { label: "Best 12GB GPUs", href: "/guides/best-12gb-gpus", text: "A common memory size for 1440p." },
          { label: "Best quiet GPUs", href: "/guides/best-quiet-gpus", text: "When partner cooling matters most." },
          { label: "Best graphics cards", href: "/guides/best-graphics-cards", text: "A general starting list." },
        ],
      },
    ],
  },

  /* ───────────────────────── processors ───────────────────────── */
  {
    slug: "cpu-name-suffixes-explained-k-kf-f-x-x3d-g",
    type: "guide",
    status: "published",
    category: "components",
    subtopic: "processors",
    seoTitle: "CPU Suffixes Explained: K, F, X3D, G",
    title: "CPU Name Suffixes Explained: K, KF, F, X, X3D and G",
    dek: "A letter at the end of a processor name can decide whether you need a graphics card or can overclock. Here is how to read them.",
    metaDescription:
      "Learn what Intel K, KF and F and AMD X, X3D and G processor suffixes mean, and check which one fits your board, cooling and graphics plans.",
    teaser: "Check whether a suffix means unlocked, no integrated graphics or extra cache before you buy a desktop CPU.",
    author,
    readTime: "8 min read",
    related: [
      "how-to-choose-a-cpu-for-your-pc",
      "cpu-specs-explained-cores-threads-clock-speed-cache-and-tdp",
      "how-to-check-cpu-and-motherboard-compatibility",
      "when-is-integrated-graphics-enough-for-a-pc",
    ],
    sources: [INTEL_ARK, AMD_RYZEN],
    modules: [
      {
        kind: "key-takeaway",
        body: "On Intel desktop chips, K usually means the multiplier is unlocked for overclocking, and F means there is no integrated graphics, so you need a separate graphics card. On AMD Ryzen, X marks a higher-clocked variant, X3D a variant with extra stacked L3 cache, and G a chip with stronger integrated graphics. Suffix meanings vary by generation, so confirm each one on the maker's page for the exact model.",
      },
      {
        kind: "explanation",
        heading: "Intel desktop suffixes",
        paragraphs: [
          "A K suffix has long meant an unlocked processor, one whose multiplier can be raised in the firmware for manual overclocking on boards that allow it. Intel's chipsets differ in what they let you do with it, so a K chip on a board that does not support overclocking still runs, but does not gain the ability. Check the chipset's feature list on Intel's page or the board maker's specification.",
          "An F suffix marks a model without integrated graphics. It is sold at a lower price than the matching non-F model, but it cannot output video from the motherboard's display connectors. If you pair it with a graphics card that fails or is removed for troubleshooting, you have no output, so owners of F chips often keep an older card for diagnostics. KF combines both traits: unlocked and without integrated graphics.",
          "Other letters appear in newer lines, such as the S and T marks on some desktop chips. Treat them as model-specific. Intel's ARK page for the chip lists the base power, turbo power and features, which is where you find out what a letter means for that processor.",
        ],
      },
      {
        kind: "explanation",
        heading: "AMD Ryzen suffixes",
        paragraphs: [
          "Ryzen names use X for a variant of a model with higher boost clocks or power limits, and the non-X sibling typically runs at lower power. The difference changes between generations, so use the AMD product page for the specific chip, which lists the base and boost clock and the default TDP.",
          "X3D identifies chips with an extra layer of L3 cache stacked on the processor. Extra cache can help programs that benefit from it, such as some games, and it can behave differently from regular chips in clock behaviour and cooling, so read AMD's page and independent testing for the model you are considering. They are not a general upgrade for every workload.",
          "G typically marks desktop chips with a stronger integrated GPU, and some are built as APUs that combine the processor and graphics. These suit small or budget systems that do not use a separate card. Some AMD desktop chips with no suffix still include a basic integrated GPU for display output, so check the graphics line on the spec page and do not rely on the letter alone.",
        ],
      },
      {
        kind: "decision-table",
        heading: "Quick reference",
        columns: ["Suffix", "Brand", "Typical meaning", "Check on the spec page"],
        rows: [
          ["K", "Intel", "Unlocked multiplier", "Chipset support for overclocking"],
          ["F", "Intel", "No integrated graphics", "That you have a graphics card for display"],
          ["KF", "Intel", "Unlocked and no integrated graphics", "Both of the above"],
          ["X", "AMD", "Higher-clocked variant", "Boost clock and TDP versus the non-X chip"],
          ["X3D", "AMD", "Stacked extra L3 cache", "Cooler requirements and workload fit"],
          ["G", "AMD", "Stronger integrated graphics", "Graphics spec and platform support"],
        ],
      },
      {
        kind: "check-your-pc",
        heading: "Check before you buy",
        items: [
          { label: "Graphics output", how: "Decide whether you will use the integrated GPU. If you will, avoid F-suffix Intel chips." },
          { label: "Overclocking plans", how: "Overclocking needs an unlocked chip and a board that supports it. If you will not overclock, a locked chip is fine." },
          { label: "Cooler fit", how: "Check the cooler's stated support for the chip's power, since boost behaviour sets heat." },
          { label: "Board and BIOS support", how: "Check the board's CPU support list, since a new chip may need a BIOS update." },
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Buying an F chip without a graphics card", instead: "Plan your display output before you save a small amount on the chip." },
          { mistake: "Paying extra for K without overclocking", instead: "Ask whether you will use the unlock. Locked chips run at their rated boost without it." },
          { mistake: "Assuming X3D is better for everything", instead: "Match the extra cache to the programs you run, and read independent tests." },
        ],
      },
      {
        "kind": "check-your-pc",
        "heading": "Find your exact CPU and what it supports",
        "intro": "The suffix is only a hint. The specification page is the source.",
        "items": [
          {
            "label": "Task Manager",
            "how": "Open Task Manager, go to Performance and select CPU. The full model name is at the top, including any suffix."
          },
          {
            "label": "CPU-Z",
            "how": "The CPU tab lists the name, socket, core count and the code name, which helps you open the right product page."
          },
          {
            "label": "Product page",
            "how": "Search the model on Intel ARK or the AMD product page and read the graphics line. Intel lists processor graphics, and an F model shows none. AMD pages state whether the chip has integrated graphics."
          },
          {
            "label": "Motherboard CPU support list",
            "how": "Your motherboard maker's support page lists which CPUs a board accepts and the BIOS version needed. A newer chip in an older board may need a BIOS update first."
          }
        ]
      },
      {
        "kind": "explanation",
        "heading": "Intel suffixes in practice",
        "paragraphs": [
          "On Intel desktop chips, K marks a model with an unlocked multiplier, meaning you can raise the clock on a board that allows it. KF is the same with the integrated graphics disabled. F alone is a locked chip without integrated graphics. T denotes a lower-power variant, and a model with no suffix is a locked chip with graphics.",
          "Overclocking the CPU on Intel needs both an unlocked chip and a board whose chipset supports it, which has traditionally been the higher-end chipsets. Memory tuning rules differ by generation, so check the board's own documentation.",
          "If you do not overclock, the K premium buys little in itself, though K models often are the higher-clocked parts in a line. An F or KF chip needs a graphics card or the screen will stay dark, so keep that in mind for a build that must boot without a GPU installed."
        ]
      },
      {
        "kind": "explanation",
        "heading": "AMD suffixes in practice",
        "paragraphs": [
          "AMD's X marks a higher-clocked model in a family. Most Ryzen desktop chips are unlocked for overclocking, but the practice varies by product, so check the specification. X3D models use stacked cache that raises cache capacity, a design aimed at workloads that benefit from a big cache. Their tuning options are more limited than other chips, and the product page states what is allowed.",
          "G models in several generations pair the CPU with a stronger integrated graphics part and are useful for builds without a separate GPU. Newer desktop Ryzen chips often include a small integrated graphics part as standard, and an F model has none. Read the graphics line on the product page.",
          "AMD sockets have remained in use across several generations, so compatibility depends on the chip generation and the board's BIOS as well as the socket name."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Questions readers ask",
        "paragraphs": [
          "Is a KF chip a bad deal? It is the K chip without integrated graphics, usually at a slightly lower price. It is fine if you have a GPU and do not need a display fallback.",
          "Does X3D always beat a plain X chip? Not in every workload. It helps where extra cache is useful, and other tasks may favour higher clocks or more cores. Look at independent results for your own software.",
          "Do I need a better cooler for a K or X chip? Those chips often draw more power at full load, so check the cooler's stated capacity against the CPU's maximum power."
        ]
      },
      {
        kind: "next-steps",
        heading: "Where to go next",
        items: [
          { label: "Best X3D gaming CPUs", href: "/guides/best-x3d-gaming-cpus", text: "For the cache variants." },
          { label: "Best unlocked CPUs", href: "/guides/best-unlocked-cpus", text: "If you plan to overclock." },
          { label: "Best budget CPUs", href: "/guides/best-budget-cpus", text: "Lower-cost options." },
        ],
      },
    ],
  },

  /* ───────────────────────── motherboards ───────────────────────── */
  {
    slug: "motherboard-m-2-sata-and-pcie-lane-sharing-explained",
    type: "guide",
    status: "published",
    category: "components",
    subtopic: "motherboards",
    seoTitle: "M.2, SATA and PCIe Lane Sharing Explained",
    title: "M.2, SATA and PCIe Lane Sharing: Why a Port Can Go Dark",
    dek: "Some boards disable a SATA port or slow a slot when an M.2 drive is installed. Here is how to read the manual before you plan your drives.",
    metaDescription:
      "Understand how motherboard M.2 slots, SATA ports and PCIe slots share lanes, and how to read the manual's table to plan a multi-drive build.",
    teaser: "Find out which ports a motherboard disables when you fill its M.2 slots, before you buy drives or cards.",
    author,
    readTime: "8 min read",
    related: ["motherboard-chipsets-explained", "how-to-choose-a-motherboard-for-your-pc-build", "how-to-install-an-m-2-ssd", "how-to-choose-an-nvme-ssd"],
    sources: [PCISIG, INTEL_ARK, AMD_RYZEN, NVME],
    modules: [
      {
        kind: "key-takeaway",
        body: "A motherboard has a fixed supply of PCIe lanes from the CPU and the chipset, and some M.2 slots, SATA ports and PCIe slots draw from the same pool. Filling one can disable or slow another. The board's manual has a table that lists these trade-offs, and reading it before you buy drives tells you whether your planned combination works at full speed.",
      },
      {
        kind: "explanation",
        heading: "Where the lanes come from",
        paragraphs: [
          "Lanes come from two places. The processor provides a set number, usually used for the main graphics slot and one or more M.2 slots. The chipset on the motherboard provides more lanes, but they all feed back to the CPU through a single link, so devices on the chipset share that link's bandwidth.",
          "Intel and AMD publish the CPU lane count and the chipset's lane count and generation on their product pages. Board makers decide how to divide them among slots. Two boards on the same chipset can therefore differ in which M.2 slots connect to the CPU and which to the chipset, and in how many of them run at the newest PCIe generation.",
          "This is why a board with four M.2 slots does not necessarily support four fast drives with no trade-off. Some slots run at a lower generation, some share lanes with the graphics slot, and some share with SATA ports.",
        ],
      },
      {
        kind: "explanation",
        heading: "How sharing appears in the manual",
        paragraphs: [
          "Look in the manual for a note near the storage or expansion section. A typical line says that when a given M.2 slot is populated with a drive using the SATA interface, one or two SATA ports are disabled, or that using a certain slot reduces the graphics slot from x16 to x8. The text will name the exact ports and slots affected.",
          "Note that an M.2 slot can support either NVMe or SATA drives, or both, and the sharing rule can apply only for one type. An M.2 SATA drive disabling a SATA port is a common rule, whereas an NVMe drive in the same slot may not. The slot's labelled support in the manual tells you which applies.",
          "Where the manual is unclear, the board maker's specification page or support article is the source. Do not rely on a retailer's summary, since those often drop the footnotes where the sharing rules live.",
        ],
      },
      {
        kind: "steps",
        heading: "Plan your drive layout",
        steps: [
          { title: "List the devices you want", body: "Write down each NVMe drive, SATA drive and add-in card, and the speed you want each to run at." },
          { title: "Find the lane table in the manual", body: "Search the manual for the M.2 and SATA sections and any footnotes about disabled ports or reduced widths." },
          { title: "Place high-speed devices on CPU-connected slots", body: "Use the CPU-connected slot for the fastest drive, and note which slots go through the chipset." },
          { title: "Check what is disabled", body: "Count what you lose, such as SATA ports or graphics lanes, and confirm you can live with it." },
          { title: "Update the BIOS if the board is new to you", body: "Slot behaviour can depend on firmware, so check the board's download page for notes." },
        ],
      },
      {
        kind: "compatibility",
        heading: "Compatibility notes",
        notes: [
          "A graphics card running at x8 instead of x16 is a real configuration, but check how much that costs for your use in independent testing of that card, not from assumption.",
          "Drives and slots negotiate speed, so a Gen5 drive in a Gen4 slot works at Gen4 speed.",
          "Chipset-connected slots share a single uplink to the CPU, so two fast drives copying at once can compete for it.",
          "Some boards use a riser card or an add-in card for extra slots, and these carry their own lane rules.",
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Counting M.2 slots as the number of fast drives", instead: "Check each slot's generation and where it connects." },
          { mistake: "Ignoring SATA port loss", instead: "Count your SATA devices against what remains after the M.2 drives are installed." },
          { mistake: "Trusting a retailer's bullet list", instead: "Read the maker's manual footnotes for the lane rules." },
        ],
      },
      {
        "kind": "check-your-pc",
        "heading": "Read the manual before you plug drives in",
        "intro": "Lane sharing is documented, but the page is easy to miss.",
        "items": [
          {
            "label": "The storage section of the manual",
            "how": "Look for a table or footnote saying that one M.2 slot shares bandwidth with specific SATA ports or with a PCIe slot. It names the ports that are disabled when the slot is used."
          },
          {
            "label": "Slot wiring",
            "how": "Note which slots connect to the CPU and which to the chipset. A CPU-connected slot gets dedicated lanes, while chipset slots share an uplink to the CPU."
          },
          {
            "label": "SATA or NVMe in the M.2 slot",
            "how": "Some M.2 slots take both SATA and NVMe drives and a SATA drive may disable different ports from an NVMe one. Check the manual's wording for each type."
          },
          {
            "label": "What the BIOS reports",
            "how": "Open the BIOS storage page and confirm each drive appears. In Windows, Disk Management lists the drives that were detected."
          }
        ]
      },
      {
        "kind": "explanation",
        "heading": "What sharing looks like when it goes wrong",
        "paragraphs": [
          "A typical symptom is a SATA drive that stops appearing after you add an M.2 drive. The board has routed the lanes to the M.2 slot and turned off the SATA ports that share them. Moving the SATA drive to a different port, or the M.2 drive to a different slot, normally fixes it.",
          "Another case is a graphics card running at x8 instead of x16 after a fast M.2 drive is installed in a slot that takes lanes from the top slot. For most graphics cards the loss is small, but it is worth knowing so you can read the correct number in GPU-Z, which reports the current link width.",
          "Chipset-attached devices all share one link back to the CPU. Several fast drives copying at once between chipset slots can therefore compete for that link, which matters only when you move big files between them."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Planning your drive layout",
        "paragraphs": [
          "Put the fastest drive, usually your operating system and active projects, in the slot wired to the CPU. Put secondary storage on chipset slots or SATA ports. If you need all SATA ports, choose an M.2 slot that does not share with them, or pick an adapter-card solution.",
          "Before buying a board for a storage-heavy build, count the M.2 slots, the SATA ports and the sharing rules together. A board with many connectors on paper may expose fewer when they are all used."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Questions readers ask",
        "paragraphs": [
          "Can I use an M.2 SATA drive in an NVMe-only slot? No. The slot must support SATA to run one.",
          "Does a heatsink cover change anything? It affects temperature, not lanes. Check that it does not block a PCIe slot.",
          "Can an adapter card add more NVMe drives? Yes where the slot has enough lanes, and some cards need the board to support splitting the slot into smaller links, which the manual calls bifurcation."
        ]
      },
      {
        kind: "next-steps",
        heading: "Where to go next",
        items: [
          { label: "Best motherboards with PCIe 5.0", href: "/guides/best-motherboards-with-pcie-5-0", text: "Boards with Gen5 slots." },
          { label: "Best B650 motherboards", href: "/guides/best-b650-motherboards", text: "A common AM5 choice." },
          { label: "Best Z790 motherboards", href: "/guides/best-z790-motherboards", text: "A common Intel choice." },
        ],
      },
    ],
  },

  /* ───────────────────────── memory ───────────────────────── */
  {
    slug: "how-to-check-ram-compatibility-with-your-motherboard",
    type: "guide",
    status: "published",
    category: "components",
    subtopic: "memory",
    seoTitle: "How to Check RAM Compatibility",
    title: "How to Check RAM Compatibility With Your Motherboard and CPU",
    dek: "Memory type, speed, capacity and height all have to match your platform. This checklist shows where to look each one up.",
    metaDescription:
      "Check RAM compatibility step by step: DDR generation, supported speed, capacity per slot, QVL lists and cooler clearance for your CPU and board.",
    teaser: "Use the CPU page, the board's memory table and the QVL to confirm RAM before you order.",
    author,
    readTime: "8 min read",
    related: ["ddr4-vs-ddr5-which-should-you-choose", "xmp-vs-expo-what-they-do-and-how-to-use-them", "two-ram-sticks-vs-four-which-is-better", "how-much-ram-do-you-need"],
    sources: [JEDEC, INTEL_ARK, AMD_RYZEN],
    modules: [
      {
        kind: "key-takeaway",
        body: "RAM compatibility has four layers: the memory generation your motherboard accepts (DDR4 or DDR5, which are not interchangeable), the speeds the CPU and board support, the capacity per module and in total the board allows, and the physical fit including height against your cooler. The motherboard's memory support page and its QVL, the list of kits the maker tested, are the authority, and the processor's page gives the officially supported speed.",
      },
      {
        kind: "steps",
        heading: "Check in this order",
        steps: [
          { title: "Match the generation", body: "DDR4 and DDR5 modules have different notch positions and do not fit each other's slots. Check the board's specification for which one it uses, and note that laptop SODIMM is a different size from desktop DIMM." },
          { title: "Read the CPU's supported memory", body: "Intel ARK and AMD's product page list the memory types and the supported speed for each processor. A kit rated above that speed can run, but the board's memory table and an XMP or EXPO profile decide how." },
          { title: "Open the board's memory support page", body: "Find the maximum total capacity, the maximum capacity per module and the supported speed with two modules and with four." },
          { title: "Search the QVL for your kit", body: "The qualified vendor list names exact kit part numbers the maker tested. A kit that is not on the list can still work, but a listed kit is a lower-risk choice." },
          { title: "Check the physical fit", body: "Compare module height, including any heat spreader, with your CPU cooler's stated memory clearance, especially for large air coolers." },
        ],
      },
      {
        kind: "explanation",
        heading: "Why the kit's rated speed is not a guarantee",
        paragraphs: [
          "A kit sold as DDR5-6000, for example, reaches that figure through a stored profile, called XMP on Intel boards and EXPO on AMD boards. The processor's official memory spec is lower than many kits' rated speed, so the profile counts as an overclock the board has to support. Our XMP and EXPO guide covers turning it on.",
          "The achieved speed depends on the processor's memory controller, the board's layout, the number of modules and their rank. Boards often support a lower speed with four modules than with two, and the board's memory table states these differences. If you plan on four modules, check that table rather than assuming the two-module figure holds.",
          "Capacity follows the same logic. A board may accept a large total capacity only with newer BIOS versions, and some platforms support particular module densities only after an update. The memory support page lists the BIOS version that added each capability.",
        ],
      },
      {
        kind: "check-your-pc",
        heading: "Where to find each answer",
        items: [
          { label: "Generation and slots", how: "Board specification page, memory section: DDR type, number of slots and maximum capacity." },
          { label: "Officially supported speed", how: "Intel ARK or AMD's processor page, memory specifications." },
          { label: "Tested kits", how: "The QVL PDF on the board's support or download page." },
          { label: "Module height versus cooler", how: "The cooler maker's spec page for memory clearance, and the kit's listed height." },
          { label: "Current BIOS", how: "The board's download page for release notes mentioning memory compatibility." },
        ],
      },
      {
        kind: "decision-table",
        heading: "When something does not match",
        columns: ["Situation", "What happens", "What to do"],
        rows: [
          ["Wrong generation", "The module will not seat in the slot", "Buy the right type, or change the platform"],
          ["Kit above CPU's official speed", "Runs at base speed until a profile is enabled", "Enable XMP or EXPO and check stability"],
          ["Kit not on the QVL", "May still work", "Check the maker's forum, or choose a listed kit"],
          ["Four modules at high speed", "Board may lower the speed or fail to train", "Read the four-module speed in the memory table"],
          ["Tall heat spreaders", "May block the cooler", "Check the cooler's clearance figure first"],
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Buying on speed alone", instead: "Check that the board and CPU can run the speed, and at what module count." },
          { mistake: "Mixing kits to reach a capacity", instead: "Use one matched kit, since mixed modules may fail to run at the rated profile." },
          { mistake: "Skipping the BIOS version", instead: "Update before installing a kit, when the board's notes mention memory support." },
        ],
      },
      {
        "kind": "explanation",
        "heading": "DDR4 and DDR5 do not mix",
        "paragraphs": [
          "DDR4 and DDR5 modules have the notch in different places, so one cannot be forced into the other's slot. Your board supports one generation only, and the board's specification page names it. Check this before you check speed or capacity.",
          "The CPU also limits memory. The processor's product page lists supported memory types and a maximum official speed. Speeds above that are overclocks using XMP or EXPO profiles, which the board and chip must handle.",
          "Note the board's maximum capacity and the maximum per slot. Many boards have four slots but a limit for the whole system, and some handle a pair of modules better than four."
        ]
      },
      {
        "kind": "check-your-pc",
        "heading": "See what is installed now",
        "intro": "Check this before ordering an upgrade so you can match or replace sensibly.",
        "items": [
          {
            "label": "Task Manager",
            "how": "The Memory tab on the Performance page shows total capacity, speed, slots used and form factor."
          },
          {
            "label": "CPU-Z",
            "how": "The SPD tab shows each module's size, type, maker and part number, and the Memory tab shows the speed the system actually runs at."
          },
          {
            "label": "BIOS version",
            "how": "Press Win and R, type msinfo32 and read the BIOS version line. Compare it with the latest on the board's support page."
          },
          {
            "label": "Slot labels",
            "how": "The manual shows which slots to fill first for two modules, which is usually the second and fourth from the CPU on a four-slot board."
          }
        ]
      },
      {
        "kind": "explanation",
        "heading": "Enabling the advertised speed",
        "paragraphs": [
          "A kit sold as a high speed often runs slower by default. The speed shown on the box needs an XMP profile on Intel boards or an EXPO profile on AMD boards, turned on in the BIOS. After enabling it, confirm in CPU-Z or Task Manager that the new speed applied.",
          "If the PC fails to start after enabling a profile, the board usually falls back to a safe setting after a few attempts. Clear the CMOS using the board's jumper or button and try a lower speed, or update the BIOS and try again.",
          "Newer platforms may take several minutes at first boot to train memory, with a blank screen and no beep. Wait before assuming the kit is faulty, and look for the board's debug light for a status."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Mixing modules and filling every slot",
        "paragraphs": [
          "Use a matched kit rather than combining separate modules. Two modules from the same kit are tested together, while separate purchases can differ in timings or chips even under the same name.",
          "Filling all four slots usually asks more of the memory controller than two modules, so the stable speed can be lower. The board's memory support list or the CPU maker's guidance states the speeds for each case."
        ]
      },
      {
        "kind": "callout",
        "tone": "note",
        "heading": "Use the qualified vendor list as a guide, not a gate",
        "body": "A kit on the board's memory list was tested with that board. A kit missing from it may still work, particularly if it is newer than the list, but BIOS version and the CPU's memory controller also matter. When in doubt, check the maker's own compatibility tool."
      },
      {
        kind: "next-steps",
        heading: "Where to go next",
        items: [
          { label: "Best RAM for AM5", href: "/guides/best-ram-for-am5", text: "For Ryzen platforms." },
          { label: "Best RAM for Intel", href: "/guides/best-ram-for-intel", text: "For Intel platforms." },
          { label: "Best DDR5 RAM", href: "/guides/best-ddr5-ram", text: "A general DDR5 list." },
        ],
      },
    ],
  },

  /* ───────────────────────── pc-cases ───────────────────────── */
  {
    slug: "front-panel-usb-c-and-motherboard-headers-explained",
    type: "guide",
    status: "published",
    category: "components",
    subtopic: "pc-cases",
    seoTitle: "Front Panel USB-C and Motherboard Headers",
    title: "Case Front Panel USB-C and Motherboard Headers: What Connects to What",
    dek: "A case's USB-C port only works if your motherboard has the matching header. Learn the header types and what to look for.",
    metaDescription:
      "Check case front-panel USB-C compatibility: USB Type-E headers, USB 3.0 19-pin, USB 2.0 and audio headers, with what to confirm on your motherboard.",
    teaser: "Confirm your board has a USB 3.2 Type-E header, and know what the other front-panel connectors need.",
    author,
    readTime: "7 min read",
    related: ["how-to-choose-a-pc-case", "how-to-choose-a-motherboard-for-your-pc-build", "motherboard-chipsets-explained", "usb-hub-vs-usb-c-dock"],
    sources: [USBIF, INTEL_ARK],
    modules: [
      {
        kind: "key-takeaway",
        body: "A front-panel USB-C port on a case is wired to an internal connector, and it only works if your motherboard has a matching header, usually a USB 3.2 Gen 2 or Gen 2x2 Type-E (also called Key-A) 20-pin header. The older 19-pin USB 3.0 header and the 9-pin USB 2.0 header are different connectors, and an adapter will not give you USB-C speeds the board does not provide. Look at the board's header list before you choose a case with USB-C on the front.",
      },
      {
        kind: "explanation",
        heading: "Which connectors a case can ask for",
        paragraphs: [
          "Cases use a small set of internal connectors. The USB 2.0 header is a 9-pin block that gives two USB 2.0 ports per header. The USB 3.0 header is a 19-pin block, with a key to prevent wrong insertion, that gives two Type-A ports at USB 3.x speeds. The USB Type-E header is a 20-pin connector, with a different key, and is the one used for a front-panel USB-C port.",
          "The Type-E header is defined for USB 3.2, and boards describe their header as supporting USB 3.2 Gen 2 or Gen 2x2 speeds, which correspond to 10 Gbps and 20 Gbps links. A case's USB-C port with the matching cable runs at the speed the board header provides, not the speed the case printed on its box if the board is slower. The cable's wiring also supports the flip-orientation feature of USB-C.",
          "Besides USB, cases wire the front audio jack to an HD audio header, and the power button, reset button and LEDs to a block of small pins. Check these exist on your board, in the manual's connector diagram, because very small boards sometimes provide fewer.",
        ],
      },
      {
        kind: "explanation",
        heading: "Power delivery, speed and adapters",
        paragraphs: [
          "A front USB-C port on a case is a data port. Whether it can charge a phone quickly depends on the case and board, and a header does not provide the same power delivery negotiation that a dedicated USB-C charging port does. If fast charging is what you want, read the case maker's statement about it and do not infer it from the connector's shape.",
          "Adapters exist that convert a 19-pin USB 3.0 header to a USB-C connector or add a Type-E header through a PCIe card. They can work, but a PCIe adapter uses a slot and lanes, and a converter from the older header caps the speed at USB 3.0 levels. Check the adapter's stated speed.",
          "If your board has no Type-E header, a case with a front USB-C port will still fit and work as a case, but the port will do nothing. Some case makers include a note on this in the manual, and many list the required header in the specification as a requirement.",
        ],
      },
      {
        kind: "check-your-pc",
        heading: "What to check on the motherboard",
        items: [
          { label: "Type-E header", how: "Look in the manual's connector list for a USB 3.2 Gen 2 Type-E or USB Type-C front panel header." },
          { label: "Speed rating", how: "Note whether it says Gen 2 (10 Gbps) or Gen 2x2 (20 Gbps), then compare it with what your devices can use." },
          { label: "USB 3.0 headers", how: "Count the 19-pin headers for front Type-A ports, since cases often have two." },
          { label: "Audio and panel headers", how: "Confirm the HD audio and the front panel pin blocks are present on small boards." },
        ],
      },
      {
        kind: "decision-table",
        heading: "Header reference",
        columns: ["Header", "Pins", "Typical use", "Notes"],
        rows: [
          ["USB 2.0", "9", "Two USB 2.0 ports, internal devices", "Common on all boards"],
          ["USB 3.0 (Key-A style 19-pin)", "19", "Two front Type-A ports", "Different keying from Type-E"],
          ["USB Type-E (USB 3.2)", "20", "Front USB-C port", "Speed depends on board support"],
          ["HD audio", "9", "Front headphone and mic jack", "Check the case's AC97 or HD cable"],
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Buying a case for its USB-C port on an older board", instead: "Check for a Type-E header first, or plan an adapter with a stated speed." },
          { mistake: "Forcing a connector that does not fit", instead: "The keying exists to stop wrong insertion. Match the header type." },
          { mistake: "Expecting charging speed from the shape of the port", instead: "Read what the case maker states about power delivery." },
        ],
      },
      {
        "kind": "explanation",
        "heading": "Which header feeds the front USB-C port",
        "paragraphs": [
          "A front USB-C port on a case needs a matching header on the motherboard, normally a 20-pin key-A style header that supports USB 3.2 Gen 2 or faster. The cable from the case ends in a small keyed plug that fits only one way. A 19-pin USB 3.0 header is a different connector and cannot run a front USB-C port.",
          "If your board lacks the header, a PCIe adapter card with the header can add it, and some cards add faster USB ports too. Check that the card matches the front port's speed and draws power from the PSU where needed.",
          "The USB 2.0 header is a separate nine-pin connector. It serves older front ports and many internal devices, such as RGB controllers. Plug each cable into its own matching header and never force a plug."
        ]
      },
      {
        "kind": "steps",
        "heading": "Connecting front-panel cables in order",
        "intro": "Do this with the PC off and unplugged, with the board manual open.",
        "steps": [
          {
            "title": "Find the headers in the manual's diagram",
            "body": "The manual labels each header and shows pin one. The cable plugs are keyed, but the manual removes guesswork for the small switch and LED plugs."
          },
          {
            "title": "Connect the USB 3 and USB-C cables",
            "body": "Seat the large keyed plugs firmly into their headers, keeping them away from the graphics card's slot area."
          },
          {
            "title": "Connect audio and USB 2.0",
            "body": "The HD audio plug goes to its header at the board's bottom edge. Match each USB 2.0 plug to a header."
          },
          {
            "title": "Connect the power and reset switches and LEDs",
            "body": "The switch plugs have no polarity. The LED plugs do, so match the plus and minus marks in the manual, or the lights will not turn on."
          }
        ]
      },
      {
        "kind": "explanation",
        "heading": "What speed to expect",
        "paragraphs": [
          "A front USB-C port's speed is limited by the slowest piece: the port on the case, the cable, the header and the controller behind the header. A case that markets USB-C may carry a 10 Gbps link, and a board with only a lower-speed header would reduce it.",
          "Power delivery is another separate question. A front port may carry data at high speed and still not charge a phone as fast as a rear port. Read the case and board specification for charging figures and do not assume them."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Questions readers ask",
        "paragraphs": [
          "Why does my front USB-C port not work? Check that the cable is firmly in the header, that the header is enabled in the BIOS if it has a setting, and that the Windows driver for the board's USB controller is installed.",
          "Can I convert a USB 3.0 header to USB-C? Only with a controller card or hub designed for it. A passive cable cannot change the connector type.",
          "Will a front port match a rear port's speed? Not necessarily. Compare the rear port's controller with the header's controller in the manual."
        ]
      },
      {
        kind: "next-steps",
        heading: "Where to go next",
        items: [
          { label: "Best PC cases with USB-C", href: "/guides/best-pc-cases-with-usb-c", text: "Cases that list a front USB-C port." },
          { label: "Best ATX mid-tower cases", href: "/guides/best-atx-mid-tower-cases", text: "A common size." },
          { label: "Best micro ATX cases", href: "/guides/best-micro-atx-cases", text: "For smaller boards." },
        ],
      },
    ],
  },

  /* ───────────────────────── cpu-coolers ───────────────────────── */
  {
    slug: "how-to-check-cpu-cooler-compatibility",
    type: "guide",
    status: "published",
    category: "components",
    subtopic: "cpu-coolers",
    seoTitle: "How to Check CPU Cooler Compatibility",
    title: "How to Check CPU Cooler Compatibility: Socket, Height, Memory and Radiator",
    dek: "A cooler has to fit the socket, the case, the memory and the board. These are the checks to do before you buy.",
    metaDescription:
      "Check CPU cooler compatibility: socket support lists, cooler height against your case, memory clearance and AIO radiator size, with where to look each up.",
    teaser: "Confirm socket support, cooler height, RAM clearance and radiator mounting from the maker's pages before ordering.",
    author,
    readTime: "8 min read",
    related: ["air-cooler-vs-aio-liquid-cooler", "how-to-apply-thermal-paste-correctly", "pc-airflow-explained", "how-to-choose-a-pc-case"],
    sources: [INTEL_ARK, AMD_RYZEN],
    modules: [
      {
        kind: "key-takeaway",
        body: "A CPU cooler fits when it lists your socket in its supported sockets, is shorter than the case's stated maximum cooler height, leaves room over the memory slots, and, for an AIO, the radiator fits a mounting point in your case. Every one of those is a number on a spec page: the cooler maker's socket list and height, and the case maker's cooler clearance and radiator support table. Check them against each other before you check reviews.",
      },
      {
        kind: "steps",
        heading: "The four fit checks",
        steps: [
          { title: "Socket support", body: "Find your socket name on the CPU's product page, such as LGA 1700 or AM5, then confirm the cooler's page lists that socket and ships with, or offers, the mounting kit for it. Some coolers need a bracket ordered separately for newer sockets." },
          { title: "Cooler height", body: "Case makers list a maximum CPU cooler height in millimetres. Compare it with the cooler's total height, including the fan, and leave a small margin for the side panel." },
          { title: "Memory clearance", body: "Large air coolers can overhang the first memory slot. The cooler maker often lists a memory clearance figure, and your RAM height, with the heat spreader, must stay below it, or the fan can be mounted higher." },
          { title: "Radiator size and position", body: "For an AIO, the case's spec lists which radiator sizes fit at the front, top or rear. Check the thickness of the radiator plus fans, and the clearance over the motherboard and memory when mounted at the top." },
        ],
      },
      {
        kind: "explanation",
        heading: "Sockets and mounting",
        paragraphs: [
          "Mounting hardware differs by socket. AMD's AM4 and AM5 sockets use the same cooler mounting pattern, so most coolers that fit one include or support the other, while Intel's LGA sockets use their own hole spacing that has stayed the same across a few generations. Do not assume this for a particular model, since the cooler's compatibility list states what is actually included.",
          "Some Intel LGA 1700 boards bend slightly over time under the standard retention bracket, and some cooler makers sell a replacement contact frame for it. Whether you need one is a question for the cooler's and the board's documentation, not a default requirement.",
          "Also check whether the cooler has the contact plate and pressure designed for large processors. The cooler's support list and the maker's notes for high-power chips tell you what the cooler is designed for.",
        ],
      },
      {
        kind: "explanation",
        heading: "What the cooling rating does and does not tell you",
        paragraphs: [
          "Makers often print a TDP or wattage rating for the cooler. There is no single standard test behind those numbers, so they cannot be compared reliably between brands. Use them as the maker's own statement, and use independent tests with a stated method to compare noise and temperatures.",
          "For power-hungry processors, the CPU's maximum power matters more than the base TDP. Intel ARK lists the maximum turbo power, and AMD's product pages list the TDP and related limits. A cooler that handles the base figure may be loud when the chip runs at its turbo limit.",
          "Noise depends on the fan and the load. A larger heatsink or radiator can often cool the same heat at a lower fan speed, and that is usually the practical benefit of buying a larger cooler.",
        ],
      },
      {
        kind: "decision-table",
        heading: "Common conflicts and fixes",
        columns: ["Conflict", "Where to see it", "Fix"],
        rows: [
          ["Cooler taller than the case allows", "Case spec: max CPU cooler height", "Choose a shorter cooler or a larger case"],
          ["Cooler blocks the first RAM slot", "Cooler spec: memory clearance", "Move the fan up, use shorter RAM, or choose another cooler"],
          ["Radiator hits the top memory or VRM heatsink", "Case manual and board layout", "Mount at the front, or use a thinner radiator"],
          ["Socket bracket missing", "Cooler's compatibility list", "Order the maker's kit for that socket"],
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Reading the cooler's wattage as a promise", instead: "Treat it as a maker's claim and look for an independent test." },
          { mistake: "Ignoring RAM height", instead: "Check the clearance figure before choosing tall kits." },
          { mistake: "Forgetting the fan on top of the radiator", instead: "Add the fan thickness to the radiator thickness when measuring." },
        ],
      },
      {
        "kind": "check-your-pc",
        "heading": "Gather the numbers for your own build",
        "intro": "Compatibility is a list of five checks. Note each one.",
        "items": [
          {
            "label": "Socket",
            "how": "Your CPU and board name the socket, such as AM5 or LGA1700. The cooler's product page lists the sockets its mounting kit supports. Coolers for one socket often support the next generation if the hole pattern is shared, but confirm on the cooler maker's page."
          },
          {
            "label": "Cooler height versus the case",
            "how": "Find the case's maximum CPU cooler height in its specification. Compare it with the cooler's height from the cooler page and leave a little margin for the side panel."
          },
          {
            "label": "Memory clearance",
            "how": "Tall air coolers can overhang the first memory slot. Check the cooler's stated memory clearance and the height of your memory modules."
          },
          {
            "label": "Radiator support for liquid coolers",
            "how": "The case lists the radiator sizes it can hold at the front, top or rear. Check which positions allow the size you want and how much space the thickness leaves for memory."
          },
          {
            "label": "Cooling capacity versus the CPU",
            "how": "Read the cooler's stated capacity if given and compare it with the CPU's maximum power from its product page."
          }
        ]
      },
      {
        "kind": "explanation",
        "heading": "Air coolers and liquid coolers",
        "paragraphs": [
          "Air coolers have fewer parts to fail and need a case with enough height. Their performance varies mostly with fin area, heat pipes and fan quality, and independent test sites compare them in controlled conditions.",
          "All-in-one liquid coolers move heat to a radiator that you mount in the case. They need a clear mounting position and tubing length that reaches it. The pump and fans add noise sources, so read measured results for the exact model, and check the warranty length."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Installation details that cause trouble",
        "paragraphs": [
          "Check whether the board has a backplate fitted and whether the cooler uses it or needs its own. Fitting a bracket for the wrong socket stops the cooler making full contact.",
          "Apply thermal paste in a small amount as the cooler maker describes and tighten the screws gradually in a cross pattern. Plug the cooler's fan or pump into the header the board labels for the CPU fan so the BIOS can control it."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Questions readers ask",
        "paragraphs": [
          "Can I reuse my old cooler on a new CPU? Only if its kit supports the new socket. If not, the maker may offer a bracket.",
          "Is a bigger cooler always better? A bigger cooler may cool better, but only if it fits the case and memory. A mid-size cooler suits a CPU that does not draw much power.",
          "Why are my temperatures high with a new cooler? Check that the plastic film is removed, that all screws are even and that the fan header reports speed."
        ]
      },
      {
        kind: "next-steps",
        heading: "Where to go next",
        items: [
          { label: "Best air coolers", href: "/guides/best-air-coolers", text: "Heatsink and fan coolers." },
          { label: "Best 360mm AIO coolers", href: "/guides/best-360mm-aio-coolers", text: "For high-power CPUs." },
          { label: "Best CPU coolers for AM5", href: "/guides/best-cpu-coolers-for-am5", text: "Coolers listing AM5 support." },
        ],
      },
    ],
  },

  /* ───────────────────────── expansion-cards ───────────────────────── */
  {
    slug: "pcie-slots-explained-x1-x4-x16-and-what-fits",
    type: "guide",
    status: "published",
    category: "components",
    subtopic: "expansion-cards",
    seoTitle: "PCIe Slots Explained: x1, x4, x16",
    title: "PCIe Slots Explained: x1, x4, x8 and x16, and What Fits Where",
    dek: "A slot's physical size and its wired lanes can differ. Read both before you add a Wi-Fi, USB or capture card.",
    metaDescription:
      "Understand PCIe slot sizes and lane widths, why a long slot can run at x4 or x1, and how to match a Wi-Fi, USB or capture card to the right slot.",
    teaser: "Check each slot's physical size and electrical width in the manual so an add-in card gets the lanes it needs.",
    author,
    readTime: "8 min read",
    related: ["how-to-choose-a-pcie-wi-fi-card", "how-to-choose-a-pcie-usb-expansion-card", "motherboard-m-2-sata-and-pcie-lane-sharing-explained", "ups-vs-surge-protector-for-a-pc"],
    sources: [PCISIG, INTEL_ARK, AMD_RYZEN],
    modules: [
      {
        kind: "key-takeaway",
        body: "A PCIe slot has a physical size (x1, x4, x8 or x16) and an electrical width, the number of lanes actually connected, and the two can differ: many boards have a full-length slot that is wired for only x4 or x1. A card fits any slot at least as long as its own connector and works with whatever lanes are wired, at the slowest generation either side supports. Read the manual's expansion slot table to see the generation and width of each slot before you pair a card with one.",
      },
      {
        kind: "explanation",
        heading: "Physical size and electrical width",
        paragraphs: [
          "The number after the x counts lanes, and the physical connector grows with it, so an x16 connector is the longest. A shorter card can sit in a longer slot, which is why an x1 Wi-Fi card works in an x16 slot. A longer card does not go into a shorter slot unless the slot is open-ended, which some boards use to accept longer cards at reduced width.",
          "The electrical width is separate. Boards often include a second full-length slot that is wired at x4 through the chipset, and short slots that are x1. The manual lists each slot as, for example, PCIe 4.0 x16 or PCIe 3.0 x1, and indicates which ones share lanes. A card in a slot with fewer lanes than it was designed for still runs, but at lower bandwidth.",
          "Generation works the same way. PCIe is backwards and forwards compatible, so a card and slot negotiate to the highest generation both support. A Gen4 card in a Gen3 slot runs at Gen3 speed, and bandwidth per lane roughly doubles with each generation.",
        ],
      },
      {
        kind: "explanation",
        heading: "Matching common cards to slots",
        paragraphs: [
          "Most expansion cards need modest bandwidth. Wi-Fi cards, sound cards and basic USB or SATA controllers generally use x1 lanes, so a chipset-connected x1 slot is a good place for them. Cards that move more data, such as 10 Gigabit network cards, multi-port USB controllers or NVMe adapters, usually specify x4 or more, and the product page lists the width and generation it needs.",
          "Your graphics card should keep the primary CPU-connected x16 slot. Placing another card in a nearby slot may disable lanes or physically block cooler airflow, and the manual's sharing notes tell you if putting a card in a particular slot reduces the graphics slot to x8. A thick graphics card can also cover the slot beneath it, so check which slots stay usable.",
          "Capture cards and some professional cards specify the lanes they need to run at full rate. A card that asks for x4 in a chipset slot that is x1 will either not work or will be limited, which the card's maker usually states in the specification.",
        ],
      },
      {
        kind: "check-your-pc",
        heading: "Before you add a card",
        items: [
          { label: "Slot table in the manual", how: "Note each slot's generation and electrical width, and any lane-sharing footnotes." },
          { label: "The card's requirement", how: "Check the product page for the lane count and generation it asks for." },
          { label: "Space around the slot", how: "Check whether the graphics card covers the slot, and whether the card's bracket is full or low profile." },
          { label: "Driver and BIOS notes", how: "Check the card maker's support page for a minimum BIOS or operating system version." },
        ],
      },
      {
        kind: "decision-table",
        heading: "Which slot for which card",
        columns: ["Card type", "Lanes it usually asks for", "Good slot choice"],
        rows: [
          ["Wi-Fi and Bluetooth", "x1", "Any free slot, such as a chipset x1"],
          ["USB expansion", "x1 to x4, depends on ports", "A slot matching the stated width"],
          ["10 Gigabit network", "x4 or more", "An x4 or wider slot with enough generation"],
          ["NVMe adapter", "x4 per drive, more for multi-drive", "A slot with the full width, ideally CPU-connected"],
          ["Capture card", "x1 to x4, check the model", "The width the maker states"],
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Assuming every long slot is x16", instead: "Check the manual's electrical width, since many are x4 or x1." },
          { mistake: "Putting a bandwidth-hungry card in an x1 slot", instead: "Match the card's lane request to a wired slot." },
          { mistake: "Overlooking lane sharing with M.2", instead: "Read the sharing notes so a new card does not disable a drive." },
        ],
      },
      {
        "kind": "explanation",
        "heading": "Physical size versus electrical lanes",
        "paragraphs": [
          "The x in a slot name counts the lanes it was built for, and a slot can be physically longer than its electrical wiring. A long x16 slot may carry only four lanes and be labelled x16 slot running at x4 in the manual.",
          "A card is designed to fit a slot at least as long as its connector, and many slots are also open at the end so a longer card can rest in them. A card that is shorter than the slot fits and runs at its own width. Cards also negotiate with older slots at older speeds, which works but limits bandwidth."
        ]
      },
      {
        "kind": "check-your-pc",
        "heading": "See what each slot is really doing",
        "intro": "The manual gives the wiring, and software confirms what is negotiated.",
        "items": [
          {
            "label": "The slot table in the manual",
            "how": "It lists each slot's physical size, lane count, PCIe generation and whether it shares lanes with M.2 slots or SATA ports."
          },
          {
            "label": "GPU-Z bus interface",
            "how": "GPU-Z shows the graphics card's current link, such as PCIe x16 4.0. A short render test inside GPU-Z wakes the link up, because it lowers speed at idle."
          },
          {
            "label": "HWiNFO",
            "how": "Its PCIe section shows the width and speed of other devices, so you can check that a network or capture card is on a full link."
          },
          {
            "label": "Case brackets",
            "how": "Count the expansion slots in the case, and check which are covered by the graphics card's cooler."
          }
        ]
      },
      {
        "kind": "explanation",
        "heading": "Which cards suit which slots",
        "paragraphs": [
          "Network cards, sound cards and USB controllers normally need x1 to x4. Capture cards and fast network cards often want x4 or more. NVMe adapter cards use x4 for a single drive. Check each card's own specification for the lane count and generation it needs.",
          "The graphics card should have the best slot, normally the top x16 slot wired to the CPU. Other devices should go to chipset slots unless they need CPU lanes for speed."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Space and spacing",
        "paragraphs": [
          "A large graphics card covers the neighbouring slots. If you plan several add-in cards, check which slots remain clear after the card is in and whether the card's cooler blocks an x1 slot completely.",
          "A card that is longer than the slot can interfere with the case's other parts. Check clearance near the front, and cables near the card's edge."
        ]
      },
      {
        "kind": "explanation",
        "heading": "Questions readers ask",
        "paragraphs": [
          "Can I put an x1 card in an x16 slot? Yes. It will run at x1. The slot supports it, and the wiring is standard.",
          "Can a PCIe 3.0 card use a PCIe 5.0 slot? Yes, at its own speed.",
          "Does a graphics card lose speed in an x8 slot? Often only a small amount, depending on the card and workload, but check independent testing for your model."
        ]
      },
      {
        kind: "next-steps",
        heading: "Where to go next",
        items: [
          { label: "Best PCIe Wi-Fi cards", href: "/guides/best-pcie-wifi-cards", text: "Wi-Fi add-in cards." },
          { label: "Best PCIe USB expansion cards", href: "/guides/best-pcie-usb-expansion-cards", text: "More USB ports." },
          { label: "Best PCIe riser cables", href: "/guides/best-pcie-riser-cables", text: "For vertical mounts." },
        ],
      },
    ],
  },
];

const extras: Record<string, InformationalGuide["modules"]> = { ...componentsExtraA, ...componentsExtraB, ...componentsExtraC };
for (const part of [componentsExtraD, componentsExtraE, componentsExtraF]) for (const [k, v] of Object.entries(part)) extras[k] = [...(extras[k] ?? []), ...v];

export const componentsWave1Guides: InformationalGuide[] = baseGuides.map((g) => {
  const add = extras[g.slug];
  if (!add) return g;
  const i = g.modules.findIndex((m) => m.kind === "next-steps");
  const at = i < 0 ? g.modules.length : i;
  return { ...g, modules: [...g.modules.slice(0, at), ...add, ...g.modules.slice(at)] };
});
