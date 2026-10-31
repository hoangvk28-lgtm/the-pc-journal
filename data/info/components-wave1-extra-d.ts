import type { GuideModule } from "@/lib/pc-content/types";

/** Further modules (second pass) inserted before each guide's "next-steps" module. */
export const componentsExtraD: Record<string, GuideModule[]> = {
  "pcie-5-vs-pcie-4-ssd-when-the-difference-matters": [
    {
      kind: "explanation",
      heading: "Gen5 and the lanes it frees up",
      paragraphs: [
        "One real advantage of the newer interface is that a link at the same speed needs fewer lanes. A PCIe 5.0 x2 link carries about as much as PCIe 4.0 x4, which is why some adapters and compact designs can use fewer lanes for the same ceiling. On a desktop board this rarely changes anything you can see, but it explains why the standard matters for devices packed into limited lane budgets.",
        "DirectStorage is another point readers raise. It is a Microsoft API that lets compatible games load assets with less CPU work, and it is built for fast NVMe drives in general, not for Gen5 specifically. Whether a game uses it, and how much it helps, is up to the game, so check the title you care about before attaching a purchase to it.",
      ],
    },
    {
      kind: "mistakes",
      heading: "Reasoning errors that inflate the spending",
      items: [
        { mistake: "Reading a percentage gain in a synthetic test as a percentage gain in daily use", instead: "Look for tests that time the task you do, such as a project export or a game level load, instead of a drive benchmark alone." },
        { mistake: "Ignoring the second drive", instead: "A copy between two drives is limited by the slower one, so a Gen5 source with a Gen3 or SATA destination gains nothing." },
        { mistake: "Skipping the warranty and endurance rating", instead: "Compare terabytes written and warranty length across the two generations at the same capacity." },
      ],
    },
  ],

  "ssd-dram-cache-slc-cache-and-nand-types-explained": [
    {
      kind: "explanation",
      heading: "Questions readers ask about caches and NAND",
      paragraphs: [
        "Is a drive without DRAM a bad drive? Not by itself. DRAM holds the map that translates the addresses your PC uses into physical locations in the flash. A drive without it can use a small slice of your PC's memory through the host memory buffer feature or keep the map in the controller, and for typical desktop use the difference is often small. It matters more under heavy mixed workloads, so check an independent review before assuming either way.",
        "Does a bigger SLC cache always mean a better drive? A bigger cache delays the slowdown, but once it is full the drive writes at its native speed. A drive with a large cache and slow native writes can look excellent in a short test and disappoint on a long copy, which is why sustained results matter.",
        "Can I tell what NAND a drive uses from its price? Not reliably. QLC drives tend to cost less per terabyte, but pricing moves, and a TLC drive on offer can cost the same. The product page or an independent review is the place to confirm cell type.",
      ],
    },
    {
      kind: "choose-if",
      heading: "Pick by the job the drive will do",
      options: [
        { choice: "A TLC drive with DRAM", when: ["It will hold your operating system and projects you write to often", "You copy large files and want steadier sustained writes", "The price gap per terabyte is small"] },
        { choice: "A QLC or DRAM-less drive", when: ["It will hold games or media that you mostly read", "Capacity per dollar matters more than sustained writes", "You rarely move a hundred gigabytes at a time"] },
      ],
    },
  ],

  "will-this-gpu-fit-my-case-and-psu": [
    {
      kind: "explanation",
      heading: "Reading the PSU label and finding the real limit",
      paragraphs: [
        "The label on the side of a PSU lists the total wattage and the amps available on the 12 V output. Multiply the 12 V amps by 12 to get watts on that output, because modern GPUs and CPUs draw nearly all their power from it. If the label lists more than one 12 V rail, use the combined maximum the maker states and do not add the rails together.",
        "You cannot identify a PSU from Windows, so power the PC down, unplug it and read the label from outside the case. A photo of the label is useful if you later ask a retailer or the maker whether a new card is supported. Never open a PSU, since the capacitors inside can hold a charge after it is unplugged.",
      ],
    },
    {
      kind: "decision-table",
      heading: "What each connector can supply to a card",
      columns: ["Source", "Rated supply", "Note"],
      rows: [
        ["PCIe slot on the motherboard", "Up to 75 W", "Cards with low power needs may use only this"],
        ["6-pin PCIe plug", "75 W", "Less common on current cards"],
        ["8-pin PCIe plug", "150 W", "The PCIe specification figure for the plug on the card side"],
        ["16-pin 12VHPWR or 12V-2x6 plug", "Up to 600 W", "Check the cable's own rating and the card's requirement"],
      ],
    },
  ],

  "how-to-read-graphics-card-names-ti-super-xt-oc": [
    {
      kind: "explanation",
      heading: "Partner brands, reference designs and what you actually receive",
      paragraphs: [
        "NVIDIA sells some cards under its own Founders Edition design, but most graphics cards are built by partners such as ASUS, MSI, Gigabyte and Zotac, and AMD cards come from partners such as Sapphire, PowerColor and XFX. A partner usually has several lines for the same chip, from a plain two-fan design to a large triple-fan flagship with a higher clock. The line name, not the GPU name, tells you which of those you are buying.",
        "A bigger partner card usually means a larger cooler and a longer, thicker body, and sometimes a higher power limit. That is useful for noise and temperature, but it feeds back into the case-fit checks, so compare the card's dimensions with your case before you pick a premium line.",
      ],
    },
    {
      kind: "mistakes",
      heading: "Naming traps that cost money",
      items: [
        { mistake: "Paying extra for OC on its own", instead: "Compare the boost clock against the base card, since the difference is often small and the cooler is the real upgrade." },
        { mistake: "Assuming two cards with the same chip name have the same memory", instead: "Read the memory amount in the title or spec table, because some chips ship in more than one capacity." },
        { mistake: "Trusting a single name element", instead: "Check the full spec sheet. A suffix tells you a family, and the numbers tell you the product." },
      ],
    },
  ],

  "cpu-name-suffixes-explained-k-kf-f-x-x3d-g": [
    {
      kind: "explanation",
      heading: "Questions readers ask about suffixes",
      paragraphs: [
        "Can I overclock a K chip on any board? No. Intel's unlocked chips need a board whose chipset allows CPU overclocking, and the product page for the board says whether it does. A K chip in a board that does not allow it runs at stock settings, so you pay for a feature you cannot use.",
        "Is an F chip worth the saving? It can be, if you will always use a graphics card. The chip omits integrated graphics, which in some cases costs less, so the saving is real, but the lack of integrated output makes troubleshooting harder if the graphics card fails, because there is no fallback video. If you keep an old graphics card as a spare, that risk drops.",
        "Does the G suffix on AMD mean a weaker chip? G chips combine the processor with integrated Radeon graphics, and some have less cache or fewer cores than the same-tier chips without it. Compare the exact specifications when you pick between a G chip and a chip you would pair with a graphics card.",
      ],
    },
    {
      kind: "choose-if",
      heading: "Choose by what the PC must do",
      options: [
        { choice: "Pick a chip with integrated graphics", when: ["You have no discrete graphics card yet", "The PC is for office work, media or a first build you will upgrade later", "You want a fallback if the graphics card fails"] },
        { choice: "Pick an F or KF chip", when: ["A discrete graphics card is already part of the plan", "The cost saving matters to you", "You are comfortable with no integrated video output"] },
      ],
    },
  ],

  "motherboard-m-2-sata-and-pcie-lane-sharing-explained": [
    {
      kind: "explanation",
      heading: "Worked example: planning a three-drive, one-card build",
      paragraphs: [
        "Imagine a board with two M.2 slots, six SATA ports, a graphics card in the top slot and a capture card in a lower slot. You want one fast M.2 drive for Windows, a second M.2 drive for projects and two SATA drives for a media archive. The manual's footnotes might say the second M.2 slot disables two SATA ports, and that using the lower x4 slot shares lanes with the third SATA pair.",
        "Working through that with the notes in hand, you would put the archive drives on SATA ports the footnotes do not name, check whether a capture card in the lower slot conflicts with the second M.2 slot, and confirm everything in the BIOS after assembly. The actual rules differ for every board, so treat this as a method and not as a table to copy.",
        "If a plan cannot be made to fit, the options are a different board with a more generous lane layout, an add-in card for extra ports, or dropping the least-used device.",
      ],
    },
    {
      kind: "mistakes",
      heading: "Planning errors seen in build threads",
      items: [
        { mistake: "Reading only the specification summary", instead: "Open the manual's storage and expansion sections, because the sharing rules usually sit in small footnotes." },
        { mistake: "Assuming a chipset name decides the layout", instead: "Compare the exact board, since makers wire the same chipset in different ways." },
        { mistake: "Filling every M.2 slot at once and testing later", instead: "Add drives one at a time and check the BIOS after each, so the cause of a missing drive is clear." },
      ],
    },
  ],

  "how-to-check-ram-compatibility-with-your-motherboard": [
    {
      kind: "explanation",
      heading: "Capacity, ranks and what a board can address",
      paragraphs: [
        "A board's specification lists the maximum total memory and the largest module it supports, and older boards can need a BIOS update to recognise higher-capacity modules. If you are adding memory to an older machine, check both numbers, along with the memory type and speed rating, before buying. A board that accepts 64 GB in total may state a per-slot limit that decides which module sizes work.",
        "Dual-channel operation needs matched modules in the correct slots, and the manual names which slots to use. A single stick works, but running two matched modules gives the CPU more memory bandwidth, so for most builds two modules of the same kit is a better start than one larger module, if the capacity is the same.",
      ],
    },
    {
      kind: "decision-table",
      heading: "What to do when the symptom appears",
      columns: ["Symptom", "Likely area", "First step"],
      rows: [
        ["No boot after installing new memory", "Seating, slot choice or training time", "Reseat the modules, use the manual's slots and wait several minutes on first boot"],
        ["Only half the capacity shows", "A module not seated, or a slot problem", "Reseat each module and test them one at a time"],
        ["Memory runs below the advertised speed", "Profile not enabled", "Enable XMP or EXPO in the BIOS"],
        ["Crashes after enabling the profile", "Board or CPU cannot hold that speed", "Lower the speed or update the BIOS, and test stability"],
      ],
    },
  ],

  "front-panel-usb-c-and-motherboard-headers-explained": [
    {
      kind: "explanation",
      heading: "Questions readers ask about front headers",
      paragraphs: [
        "Can I use a USB-C front panel on a board without the header? Only through an adapter or an expansion card, and results depend on the product and on the board. Check the adapter's stated speed and what it connects to, since a simple adapter may limit the port to older speeds. A PCIe card with its own controller gives a reliable port, but it uses a slot and needs a manual check of that slot's availability.",
        "Why is my front port slower than the rear? Rear ports may come from a different controller, and the front header may be rated for a lower speed. The board's manual lists each port's rating, so compare the front header's generation with the rear port you tested against.",
        "Do USB 2.0 and USB 3.0 headers still matter? Yes. Many cases also have USB-A ports that use a 19-pin USB 3.0 header, and an audio connector for headphones. Count each connector your case offers and compare it with the headers on the board before building.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Before you buy a case or board",
      items: [
        { label: "List the case's front connectors", how: "The case's specification page lists the cables it provides, such as USB 3.0, USB-C and HD audio." },
        { label: "Count the board's internal headers", how: "The motherboard's internal connector section lists each header and its position on the board." },
        { label: "Match the header generation", how: "Compare the speed ratings so the front port does not end up slower than the one you expect." },
      ],
    },
  ],

  "how-to-check-cpu-cooler-compatibility": [
    {
      kind: "explanation",
      heading: "Questions readers ask about coolers",
      paragraphs: [
        "Will my cooler fit the next CPU socket I buy? Not always. Coolers list the sockets their mounting kits support, and a newer socket may need a different bracket from the maker. Check the cooler's supported-socket list for the socket you plan to use, and ask the maker about a mounting kit if it is not listed.",
        "Is a stock cooler enough? For many mid-range chips the bundled cooler is adequate at stock settings, and some CPUs ship without one. Check the chip's product page to see whether a cooler is included, and consider an aftermarket model if you want lower noise or plan to raise power limits.",
        "Do I need to replace the thermal paste? Coolers ship either with paste on the cold plate or with a small tube. Use what the maker provides unless you have a reason to change it, and spread no more than a small amount in the centre of the processor's heat spreader.",
      ],
    },
    {
      kind: "mistakes",
      heading: "Installation mistakes that raise temperatures",
      items: [
        { mistake: "Leaving the plastic film on the cold plate", instead: "Remove it before mounting, because it blocks contact with the processor." },
        { mistake: "Tightening one screw fully before the others", instead: "Tighten the screws a little at a time in a cross pattern so pressure stays even." },
        { mistake: "Forgetting to connect the fan or pump", instead: "Plug it into the CPU fan header and confirm a sensible reading in the BIOS." },
      ],
    },
  ],

  "pcie-slots-explained-x1-x4-x16-and-what-fits": [
    {
      kind: "explanation",
      heading: "Generations, and why they do not change what fits",
      paragraphs: [
        "Each PCIe generation roughly doubles the bandwidth per lane of the one before. Because generations only change speed, a PCIe 5.0 card fits a PCIe 3.0 slot of the same length and negotiates down to the speed both sides support. A card that is built for fewer lanes than the slot offers simply uses fewer lanes.",
        "The generation matters when lanes are scarce. A graphics card in an x8 slot loses less on a newer generation than on an older one, since each lane carries more. If you are placing a card in a narrower slot, check the generation of that slot in the manual.",
      ],
    },
    {
      kind: "choose-if",
      heading: "Decide where to put a card",
      options: [
        { choice: "The top x16 slot", when: ["It is a graphics card", "The manual shows that slot connected to the CPU", "You have no conflicting M.2 drive"] },
        { choice: "A lower x4 or x1 slot", when: ["It is an expansion card with modest bandwidth needs", "The card's stated lane requirement is within the slot's width", "The slot is not shared with a drive you use"] },
      ],
    },
  ],
};
