import type { GuideModule } from "@/lib/pc-content/types";

/** Third-pass modules inserted before each guide's "next-steps" module. */
export const componentsExtraE: Record<string, GuideModule[]> = {
  "will-this-gpu-fit-my-case-and-psu": [
    {
      kind: "steps",
      heading: "Install the card and its cables without strain",
      steps: [
        { title: "Power down and discharge", body: "Switch the PSU off, unplug it, and hold the power button for a few seconds so stored charge drains before you touch any part." },
        { title: "Remove the slot covers it needs", body: "A thick card can need three covers removed. Take out the screws, not the case's trim." },
        { title: "Seat the card, then the cables", body: "Press the card into the slot until the latch clicks, screw the bracket down, then route each power cable with a gentle bend and a firm click at the card end." },
        { title: "Close the case and check", body: "Make sure the side panel does not press on the plug. Boot, install the graphics driver from the card maker, and watch for stable behaviour in a demanding game or benchmark you already use." },
      ],
    },
    {
      kind: "explanation",
      heading: "When the card is long but your case has space elsewhere",
      paragraphs: [
        "Some cases allow a longer card if you remove a drive cage or front fan, and the manual usually states the figure with and without them. If you rely on that, confirm that the airflow you give up is acceptable for your parts. Vertical mounts with a riser change the space equation, but the riser and the glass panel clearance add their own checks.",
      ],
    },
  ],

  "cpu-name-suffixes-explained-k-kf-f-x-x3d-g": [
    {
      kind: "explanation",
      heading: "Generation, release and what a new number means",
      paragraphs: [
        "A higher model number inside one family usually means a faster chip of that generation, but across generations the pattern does not always hold. A newer lower-tier chip can beat an older higher-tier one in some work, and lose in other work. Compare reviews of the exact models for the tasks you care about, and check core counts, cache and power limits on the maker's pages.",
        "Check the platform at the same time. A new chip may need a newer socket, a newer chipset and a different memory type, which changes the cost of the whole upgrade. Write down the socket and memory type of your current board before you shop for a chip.",
      ],
    },
  ],

  "motherboard-m-2-sata-and-pcie-lane-sharing-explained": [
    {
      kind: "choose-if",
      heading: "Which route to take when your plan does not fit",
      options: [
        { choice: "Re-plan with the board you have", when: ["Only one or two ports are affected", "You can move SATA drives to unaffected ports", "You have a spare M.2 slot that avoids the conflict"] },
        { choice: "Choose a different board", when: ["Your layout needs more full-speed slots than the board provides", "The manual lists several conflicts for your parts", "You can return or exchange the board"] },
        { choice: "Add a controller card", when: ["You only need more SATA ports", "A free slot with enough lanes is available", "The card is listed as compatible with your operating system"] },
      ],
    },
  ],

  "how-to-check-ram-compatibility-with-your-motherboard": [
    {
      kind: "explanation",
      heading: "Reading the labels on a memory kit",
      paragraphs: [
        "A kit's label lists the memory type (DDR4 or DDR5), the total capacity, the number of modules, the rated speed and timings, and the voltage. The speed and timings are what the maker validated with its profile, and the part number lets you search the board's QVL. The profile type, such as Intel XMP or AMD EXPO, is printed on the packaging or the product page.",
        "Voltage matters because very high-voltage profiles can be harder on the memory controller of some chips. If a maker or platform vendor recommends a ceiling for your CPU, stay at or below it, and treat any figure beyond the vendor's guidance as a risk you accept.",
      ],
    },
    {
      kind: "mistakes",
      heading: "Purchase errors worth avoiding",
      items: [
        { mistake: "Ordering laptop memory for a desktop", instead: "Laptop modules are shorter and use a different form factor, so match SO-DIMM or DIMM to your machine." },
        { mistake: "Buying a kit with a single module for a dual-channel plan", instead: "Check the module count on the kit's title, because one stick gives single-channel operation." },
        { mistake: "Ignoring the CPU's own speed rating", instead: "Compare the CPU's supported memory speed on its product page with the kit you want." },
      ],
    },
  ],

  "front-panel-usb-c-and-motherboard-headers-explained": [
    {
      kind: "steps",
      heading: "Connect every front-panel cable in a sensible order",
      steps: [
        { title: "Lay out the cables", body: "Sort the front-panel plugs by type: power and reset switches, LEDs, audio, USB 2.0, USB 3.0 and USB-C." },
        { title: "Find each header in the manual", body: "The board's diagram shows each header's pin layout and its position near the board edge." },
        { title: "Connect the large keyed plugs first", body: "Seat USB 3.0 and USB-C first, since they are the bulkiest and hardest to reach once smaller plugs are in." },
        { title: "Finish with the small switch and LED plugs", body: "Follow the manual's diagram for polarity on LED pins, and check that the power button wires land on the right pair." },
      ],
    },
  ],

  "how-to-check-cpu-cooler-compatibility": [
    {
      kind: "check-your-pc",
      heading: "Gather these four numbers before you click buy",
      items: [
        { label: "Your CPU socket", how: "Look it up on the processor's product page or the board's specification list, not from the chip's name alone." },
        { label: "The case's maximum cooler height and radiator list", how: "Read the case's specification page, and the manual if the page omits radiator positions." },
        { label: "Your memory module height", how: "Read the kit's product page, since taller decorative modules need more clearance." },
        { label: "The cooler's own spec page", how: "Look for height, memory clearance, supported sockets and the weight, which affects how it mounts." },
      ],
    },
    {
      kind: "explanation",
      heading: "Weight, airflow and the case you pair it with",
      paragraphs: [
        "A heavy tower cooler can stress the board in a case that is moved often, so check the maker's advice on transport, and consider whether a lighter cooler suits a PC you carry to events. Coolers also depend on case airflow, so a quiet cooler in a case with restricted intake can run warmer than the same cooler in an open one.",
        "Look at where your fans blow. A tower cooler moves air front to back, and a top-mounted radiator pushes warm air upward, so matching those directions with the case's own fans avoids fighting airflow.",
      ],
    },
  ],

  "pcie-slots-explained-x1-x4-x16-and-what-fits": [
    {
      kind: "explanation",
      heading: "Risers, brackets and cards that do not sit in the slot",
      paragraphs: [
        "A riser cable lets you mount a card away from its slot, as in a vertical graphics card layout. Choose a riser rated for the generation and lane count your card needs, since a low-quality riser can force a lower generation or cause errors. If the card then runs at a lower speed than expected, check the BIOS setting for the slot generation and try another riser before blaming the card.",
        "Brackets and slot covers matter too. A card with a thick cooler can block the neighbouring slot, and a case with fewer expansion slots than your card needs will not close properly. Count the case's slots as part of your plan, along with the board's.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "See what each slot in your PC is doing right now",
      items: [
        { label: "Graphics card link", how: "GPU-Z shows the bus interface and the current link width and generation, and its render test raises the link to full speed so you can read it." },
        { label: "Other cards", how: "Device Manager lists installed expansion devices, and the properties page of many shows the slot it uses." },
        { label: "What the board allows", how: "The manual's expansion table lists each slot's electrical width and generation, plus which slots share lanes." },
      ],
    },
    {
      kind: "mistakes",
      heading: "Planning mistakes for a multi-card PC",
      items: [
        { mistake: "Counting slots without counting their thickness", instead: "Measure the space each card uses so that no card blocks another card's airflow or access." },
        { mistake: "Putting a heat-producing card right under the graphics card", instead: "Leave a gap where you can, and check temperatures after the first long session." },
        { mistake: "Ignoring power for the extra card", instead: "Check whether the card needs a power plug from the PSU and whether a free one exists." },
      ],
    },
  ],
};
