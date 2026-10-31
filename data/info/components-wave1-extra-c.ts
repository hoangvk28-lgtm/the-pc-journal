import type { GuideModule } from "@/lib/pc-content/types";

/** Extra modules (front-panel USB-C, CPU coolers, PCIe slots) inserted before each guide's "next-steps" module. */
export const componentsExtraC: Record<string, GuideModule[]> = {
  "front-panel-usb-c-and-motherboard-headers-explained": [
    {
      kind: "explanation",
      heading: "Why a front USB-C port can be dead on arrival",
      paragraphs: [
        "A case with a USB-C port on its front panel only works if the motherboard has a matching internal connector. That connector is a small, keyed 20-pin socket, usually called a Key-A or USB Type-E header, and it is separate from the older 19-pin USB 3.0 header and the 9-pin USB 2.0 header. A board without it leaves the case's USB-C cable with nowhere to connect.",
        "Because the case and the board come from different makers, the mismatch is easy to miss when you shop. Look for the Key-A header or a front USB-C line in the motherboard's internal connector list before you commit to a case that advertises a front USB-C port.",
      ],
    },
    {
      kind: "decision-table",
      heading: "What to do for each combination of case and board",
      columns: ["Case front panel", "Motherboard", "Outcome and options"],
      rows: [
        ["USB-C cable", "Key-A header present", "Connects directly. Speed follows the header's rating, which the board's manual states"],
        ["USB-C cable", "Only a 19-pin USB 3.0 header", "Not directly compatible. Some makers sell an adapter or a PCIe card, and results depend on the product"],
        ["USB-A ports only", "Any board with a USB 3.0 header", "Works at the header's speed, with no USB-C connector at the front"],
        ["USB-C cable", "USB 3.2 Gen 2x2 header", "Works, and the front port can reach the header's top speed if the cable and device also support it"],
      ],
    },
    {
      kind: "steps",
      heading: "Test the front port once it is connected",
      steps: [
        { title: "Check that Windows sees a device", body: "Plug in a known-good USB-C flash drive or phone and open Device Manager. Look under Universal Serial Bus controllers for a new entry." },
        { title: "Compare speeds", body: "Copy a large file to a fast external SSD on the front port and again on a rear port with the same speed rating. A large gap points to a header limit or an inferior cable." },
        { title: "Try another cable and device", body: "Many USB-C cables are limited to older speeds. Test with a cable marked for the speed you want before suspecting the header." },
        { title: "Update chipset drivers and BIOS", body: "Install the board maker's current chipset drivers, and check BIOS release notes for USB fixes." },
      ],
    },
    {
      kind: "mistakes",
      heading: "Header mistakes to avoid",
      items: [
        { mistake: "Forcing a plug into a socket of the wrong shape", instead: "Match the key and pin count. USB headers are keyed so they should go in only one way, and force can bend pins." },
        { mistake: "Expecting charging speeds from the front port", instead: "Check whether the case and board state power delivery. A data header does not promise fast charging." },
        { mistake: "Using a data-only header for video", instead: "Front USB-C headers carry USB data. A display needs DisplayPort or HDMI from the graphics card or the board's rear outputs." },
      ],
    },
  ],

  "how-to-check-cpu-cooler-compatibility": [
    {
      kind: "steps",
      heading: "Measure your own limits, with or without a spec sheet",
      steps: [
        { title: "Find the case's cooler height limit", body: "The case maker lists a maximum CPU cooler height. If it is missing, measure from the top of the CPU socket area to the inside of the side panel and subtract a margin." },
        { title: "Add the fans to the cooler height", body: "The cooler's listed height normally includes its fan. A taller fan or clip adds a few millimetres, so leave 5 to 10 mm of margin below the case limit." },
        { title: "Measure your memory", body: "Standard modules are shorter than tall decorative ones. Compare your module height with the cooler's stated memory clearance, particularly for the slot nearest the socket." },
        { title: "Check radiator mount positions", body: "For an all-in-one cooler, find the case page that names where each radiator size fits, because front and top support can differ." },
      ],
    },
    {
      kind: "decision-table",
      heading: "Common cooler and case combinations",
      columns: ["Scenario", "What can go wrong", "Check"],
      rows: [
        ["Large tower cooler in a compact case", "The side panel will not close", "Cooler height against the case's stated limit, with margin"],
        ["Dual-tower cooler with tall memory", "The first memory slot is blocked", "Memory clearance on the cooler spec, or raise the fan"],
        ["360 mm radiator at the top of a mid-tower", "Radiator hits memory or the board's top components", "The case page and the cooler's radiator thickness plus fan"],
        ["Mini-ITX build", "Few options fit", "Search by the case's supported low-profile or AIO sizes"],
        ["Older case with a new platform", "Backplate or socket mounting does not align", "Cooler's socket list and mounting kit"],
      ],
    },
    {
      kind: "explanation",
      heading: "Installation points that listings leave out",
      paragraphs: [
        "Some coolers need a backplate behind the motherboard, which can be hard to fit if the case has a small cutout behind the socket. Check whether the case has an opening there before you buy a cooler that needs it, or plan to mount the cooler with the board outside the case first.",
        "Apply a small amount of thermal paste, or use the pre-applied paste if the cooler ships with it, and remove any plastic film from the cold plate. Plug the fan header into the CPU fan connector, and check in the BIOS that the CPU temperature is sensible a few minutes after the first boot.",
      ],
    },
    {
      kind: "choose-if",
      heading: "Air or liquid for your build",
      options: [
        { choice: "Air cooler", when: ["You want few moving parts and a simple installation", "Your case has clear height and memory space", "You prefer a cooler that does not depend on a pump"] },
        { choice: "All-in-one liquid cooler", when: ["Your case is tight above the socket, or your memory is tall", "You have a confirmed radiator mount of the right size", "You are happy to check pump and fan wiring and the maker's warranty terms"] },
      ],
    },
  ],

  "pcie-slots-explained-x1-x4-x16-and-what-fits": [
    {
      kind: "explanation",
      heading: "Lane budgets: why not everything runs at full width",
      paragraphs: [
        "Mainstream desktop CPUs provide a limited pool of PCIe lanes for the graphics slot and the main M.2 slot, and the chipset provides more for the rest. Boards share that pool between slots, so a slot that looks like x16 may be wired for fewer lanes. The manual's specification table lists each slot as, for example, x16 or x4 electrical, and those figures are the ones to plan with.",
        "More lanes help cards that move a lot of data, such as graphics cards, NVMe adapters and fast network cards. A card that needs little bandwidth, such as a basic sound card or a USB controller, runs well in an x1 slot.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Which slot for which card",
      columns: ["Card", "Usual lanes", "What to check"],
      rows: [
        ["Graphics card", "x16, with x8 acceptable in some cases", "That the card's length and thickness fit, and which slot is wired to the CPU"],
        ["NVMe adapter card", "x4 or more for multiple drives", "Whether the slot and board support splitting the slot into separate links"],
        ["Fast network card", "x1 to x4, depending on the model", "The card's stated lane requirement"],
        ["Capture card", "x1 to x4, depending on the model", "The slot's generation and the card's stated needs"],
        ["Sound or USB card", "x1", "Space next to the graphics card"],
      ],
    },
    {
      kind: "steps",
      heading: "Install an extra card without losing something else",
      steps: [
        { title: "Read the slot table in the manual", body: "Note each slot's electrical width and which slots share lanes with M.2 sockets or SATA ports." },
        { title: "Choose the slot with the right width", body: "Put the card in a slot that matches its needs. Keep the graphics card's slot free of interference from other cards." },
        { title: "Check the spacing", body: "A thick graphics card can cover the slot below it. Count slots from the graphics card down and pick one that remains open." },
        { title: "Confirm it in Windows", body: "Use Device Manager or the card's own software to see that it is detected, and a tool such as GPU-Z to read a graphics card's link width." },
      ],
    },
    {
      kind: "mistakes",
      heading: "Slot mistakes to avoid",
      items: [
        { mistake: "Assuming an open-ended x1 slot accepts any card", instead: "Only slots with an open end accept longer cards, and the board maker should say so in the manual." },
        { mistake: "Using a riser or adapter without checking its rating", instead: "Check the adapter's stated generation and lane count, because a poor riser can cause instability." },
        { mistake: "Reading the length of a slot as its speed", instead: "Check the electrical width and generation in the manual instead of judging by how long the slot looks." },
      ],
    },
  ],
};
