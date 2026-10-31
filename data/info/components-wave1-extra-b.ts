import type { GuideModule } from "@/lib/pc-content/types";

/** Extra modules (graphics card names, CPU suffixes, M.2 sharing, RAM) inserted before each guide's "next-steps" module. */
export const componentsExtraB: Record<string, GuideModule[]> = {
  "how-to-read-graphics-card-names-ti-super-xt-oc": [
    {
      kind: "explanation",
      heading: "Generation numbers and tier numbers",
      paragraphs: [
        "On NVIDIA's GeForce RTX cards, the digits before the last two usually mark the generation, such as the 30, 40 and 50 series, and the last two digits mark the tier inside it, from entry-level up to the x90 cards. AMD's Radeon RX cards follow a similar pattern with the 6000, 7000 and 9000 series. Compare tiers only within the same generation, since a higher tier in an older series is not guaranteed to beat a lower tier in a newer one.",
        "The prefix tells you the product line. RTX is NVIDIA's current consumer brand, GTX is the older line without ray tracing hardware, and RX is AMD's consumer gaming line. Workstation lines carry different names, so a card labelled Radeon Pro or an RTX workstation name is not a gaming card at a different price.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Common suffixes and the question to ask about each",
      columns: ["Name element", "What it usually signals", "What to verify"],
      rows: [
        ["Ti", "A step-up chip variant within a tier", "Core count and memory against the base card on the maker's spec page"],
        ["SUPER", "A refresh of a tier, usually with more cores or memory", "Whether it replaces or sits beside the base model"],
        ["XT or XTX (AMD)", "A faster variant of the same family", "Memory size and board power, which can differ"],
        ["OC", "A factory clock offset by the partner", "The boost clock against the reference clock, and the cooler it comes with"],
        ["Memory amount in the title", "The VRAM capacity", "Whether a cheaper variant of the same name has less memory"],
      ],
    },
    {
      kind: "steps",
      heading: "Comparing two similar-looking listings",
      steps: [
        { title: "Strip the name to the chip", body: "Remove brand, cooler line and OC wording until you reach the GPU name and memory size. If both listings share that, they use the same silicon." },
        { title: "Open both product pages", body: "Compare boost clock, board power, length, slot thickness and the number of power connectors. Differences there are the real differences between the cards." },
        { title: "Read an independent review of the cooler", body: "Partners use the same chip with different coolers, so a review of the exact model tells you about noise and temperature that the name cannot." },
      ],
    },
    {
      kind: "explanation",
      heading: "Desktop and laptop cards share names, not specs",
      paragraphs: [
        "A laptop graphics chip with the same name as a desktop card is a separate configuration with its own core count, memory and power budget. Laptop makers also set the power limit per model, so two laptops with the same GPU name can perform differently. If you are reading a laptop spec sheet, look for the power limit the maker states and treat the GPU name as a starting point only.",
        "For a desktop purchase this matters when you compare a guide, a benchmark or a forum post. Confirm that any figures you rely on describe the desktop card and the same memory size you are considering.",
      ],
    },
  ],

  "cpu-name-suffixes-explained-k-kf-f-x-x3d-g": [
    {
      kind: "explanation",
      heading: "Reading a full model name, step by step",
      paragraphs: [
        "Take a name such as Core i7-14700KF. The brand and tier are Core i7, the digits 14700 identify the generation and the specific chip, and the KF tells you the chip is unlocked and has no integrated graphics. For an AMD name like Ryzen 7 7800X3D, the first digit of the number points to the series, the middle digits to the tier, and X3D to the stacked cache variant. Always confirm the exact chip on Intel ARK or AMD's product page, because the letters alone leave room for differences in cores, clocks and power.",
        "Mobile chips use different suffixes again. Letters such as U, H and HX mark power classes in laptops, which often matter more than the model number. A desktop reader who sees these suffixes is looking at laptop parts, which solder to the board and cannot be swapped into a desktop socket.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Which suffix suits which build",
      columns: ["Build", "Suffix to consider", "Check first"],
      rows: [
        ["Gaming PC with a discrete graphics card", "F, KF or an X3D chip", "That the board has a free GPU slot and that a spare display adapter exists for troubleshooting"],
        ["Office or media PC with no graphics card", "A chip with integrated graphics, such as non-F Intel or a G-series Ryzen", "That the board has video outputs wired to the CPU"],
        ["Overclocking enthusiast", "Intel K or KF on a board that supports it", "Whether the chipset allows CPU overclocking and the cooler can handle extra heat"],
        ["Compact, low-power PC", "A lower-power model with a T suffix where Intel offers one", "That the model is sold in the form you are buying"],
        ["Mainly games that favour cache", "AMD X3D", "Independent game benchmarks for the titles you play"],
      ],
    },
    {
      kind: "steps",
      heading: "Confirm a CPU works in your motherboard",
      steps: [
        { title: "Match the socket", body: "Intel and AMD both change sockets between generations. Check that your board's socket matches the chip's socket on its spec page." },
        { title: "Check the CPU support list", body: "Open the board maker's support page and find the processor list. It names the chips supported and the minimum BIOS version required." },
        { title: "Update the BIOS first if needed", body: "If the list says a newer BIOS is needed, update before installing the chip, using the maker's instructions and the current CPU where possible." },
      ],
    },
    {
      kind: "mistakes",
      heading: "Suffix mistakes that surprise buyers",
      items: [
        { mistake: "Buying an F chip and then finding no video output", instead: "Plan a graphics card or keep a way to display video before you remove the old setup." },
        { mistake: "Paying for K on a board that cannot overclock", instead: "Check the chipset's overclocking support, since a locked chipset leaves the unlocked multiplier unused." },
        { mistake: "Assuming X3D wins every task", instead: "Compare benchmarks for your own applications, because extra cache helps some workloads far more than others." },
      ],
    },
  ],

  "motherboard-m-2-sata-and-pcie-lane-sharing-explained": [
    {
      kind: "explanation",
      heading: "The chipset link, and why bandwidth is shared even when nothing is disabled",
      paragraphs: [
        "Drives and slots attached to the chipset share a single connection back to the CPU. That link is wide enough for ordinary use, but if you run a large copy between two chipset drives while also using chipset SATA ports and a network card, those devices share it. Where the manual marks an M.2 slot as CPU-attached, a drive there avoids that shared link.",
        "Lane sharing is a separate matter. It is a wiring choice by the board maker: a pair of connectors uses the same lanes, so using one switches off or narrows the other. Both situations show up as slower or missing drives, so it helps to know which of the two you are chasing.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Common sharing patterns and how they usually appear in a manual",
      columns: ["Pattern", "What the manual footnote usually says", "What to do"],
      rows: [
        ["M.2 slot and SATA ports", "A named M.2 slot disables specific SATA ports when populated, sometimes only for SATA-type M.2 drives", "Move your hard drives to unaffected ports, or pick a different slot"],
        ["M.2 slot and a PCIe slot", "A lower PCIe slot is disabled or narrowed when a particular slot is used", "Keep the PCIe card away from the affected slot, or use another M.2 socket"],
        ["M.2 slot and the GPU slot", "The graphics slot drops from x16 to x8 when a CPU-attached M.2 slot is filled", "Check the manual for that mode and weigh the small impact for your card"],
        ["Two M.2 slots on the chipset", "Both share the same chipset link", "Avoid heavy simultaneous transfers if speed matters"],
      ],
    },
    {
      kind: "steps",
      heading: "Plan a drive layout before you buy",
      steps: [
        { title: "List every device", body: "Write down each M.2 drive, SATA drive, expansion card and graphics card you intend to install." },
        { title: "Map them to ports", body: "Use the manual's storage section and block diagram to give every device a port and mark its lanes." },
        { title: "Look for conflict footnotes", body: "Search for the words 'disabled', 'shares bandwidth' and 'when populated'. Each hit is a rule that may affect your plan." },
        { title: "Check the result in the BIOS", body: "After assembly, open the BIOS storage page to confirm every drive appears. A missing device is the first sign of a conflict." },
      ],
    },
    {
      kind: "check-your-pc",
      heading: "If a drive has gone missing",
      items: [
        { label: "The drive appears in the BIOS but not in Windows", how: "Open Disk Management. A new drive may need to be initialised and formatted before it appears in File Explorer." },
        { label: "The drive does not appear anywhere", how: "Check the manual for a sharing rule that disables its port. Reseat the drive and the screw, and try another slot." },
        { label: "SATA ports stop working after adding an M.2 drive", how: "Look for a footnote naming those ports. Move the SATA cables to ports the manual does not list." },
        { label: "The drive is slower than expected", how: "Check the negotiated link in a tool such as CrystalDiskInfo and compare it with the slot's rating." },
      ],
    },
  ],

  "how-to-check-ram-compatibility-with-your-motherboard": [
    {
      kind: "steps",
      heading: "A step-by-step compatibility check",
      steps: [
        { title: "Identify the memory type your board takes", body: "Boards accept either DDR4 or DDR5 and not both. The product page and manual state the type and the number of slots." },
        { title: "Open the memory QVL", body: "On the board maker's support page, find the list of tested kits. Search by the kit's part number, or filter by capacity and speed. Some lists are PDFs, so use your viewer's search." },
        { title: "Compare speed to what the CPU supports", body: "The CPU's official spec page states the memory speeds it supports. Rated speeds above that depend on the memory profile and the board." },
        { title: "Check profile support", body: "Intel boards use XMP profiles and AMD boards use EXPO or XMP, depending on the kit. The kit's page states which profiles are included." },
        { title: "Check the BIOS version", body: "A newer BIOS can improve memory compatibility. Read the release notes for the board and update with the maker's guidance." },
      ],
    },
    {
      kind: "explanation",
      heading: "What an unlisted kit means",
      paragraphs: [
        "A kit on the QVL has been tested by the board maker on that board, which is the strongest indication available. A kit that is not listed may simply have been released after the list was last updated, or a near-identical kit may have been tested instead. Treat missing from the list as a reason to look more closely, not as proof of failure.",
        "If you choose an unlisted kit, favour one from a maker that publishes its own compatibility tool, buy from a seller with a straightforward return policy, and test the system after installing, as described below.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "After you install the memory",
      items: [
        { label: "Does the PC boot", how: "A first boot can take longer than usual while the board trains the memory. Wait a few minutes before assuming it has failed." },
        { label: "Is the capacity correct", how: "Open Task Manager, Performance, Memory. It shows the total, the speed and the slots used." },
        { label: "Is the speed what you paid for", how: "If Task Manager shows a lower speed, enter the BIOS and enable the kit's XMP or EXPO profile." },
        { label: "Is it stable", how: "Run a memory test such as the Windows Memory Diagnostic or a bootable tester through at least one full pass." },
      ],
    },
    {
      kind: "mistakes",
      heading: "Mistakes that lead to unstable memory",
      items: [
        { mistake: "Mixing kits to reach a total capacity", instead: "Buy a single matched kit for the total you need, because two different kits may not agree on timings." },
        { mistake: "Using the wrong slots", instead: "With two modules on a four-slot board, follow the manual's slot order, which usually names slots two and four." },
        { mistake: "Forcing a profile that fails", instead: "If the PC will not boot after enabling a profile, clear the BIOS settings and try a lower speed." },
      ],
    },
  ],
};
