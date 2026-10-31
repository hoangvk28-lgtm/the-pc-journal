import type { GuideModule } from "@/lib/pc-content/types";

/** Extra modules (storage, PSU cables, GPU fit) inserted before each guide's "next-steps" module. */
export const componentsExtraA: Record<string, GuideModule[]> = {
  "12v-2x6-vs-12vhpwr-vs-8-pin-psu-cables": [
    {
      kind: "explanation",
      heading: "Wattage ratings on the cable, not only on the connector",
      paragraphs: [
        "A 12V-2x6 plug is built for up to 600 W, but the cable that ships with a particular PSU is only as capable as the maker rates it. Corsair, for one, documents that some lower-wattage ATX 3.1 units ship a 12V-2x6 cable rated for 450 W rather than 600 W. Read the cable's rating in the PSU manual or product page, and compare it with the board power of the card you plan to run, not with the shape of the plug.",
        "The same logic applies to the 8-pin side. The PCIe specification rates a 6+2-pin connector on the GPU end at 150 W, yet the PSU-side socket for that cable uses a sturdier layout from some makers, and Corsair states that its Type 4 and Type 5 sockets can supply well over 300 W. That is why a single PSU socket can feed a split cable with two 8-pin plugs. Treat that as something to confirm for your exact model, because it depends on the PSU's design and not on the plug you see.",
      ],
    },
    {
      kind: "steps",
      heading: "A short order of checks when a new card arrives",
      steps: [
        { title: "Read the card's connector line", body: "The product page lists either 'one 16-pin' or a number of 8-pin inputs. Note whether the box includes an adapter and what it converts from." },
        { title: "Match it to a cable already in your PSU kit", body: "Open the PSU's box or manual and look for a cable labelled 12V-2x6, 12VHPWR or PCIe. Do not borrow a modular cable from another PSU, even from the same brand, unless the maker confirms the pinout." },
        { title: "Seat, then look", body: "Push the plug in until the latch clicks, then check that the housing sits flush with no visible strip of pins. Look again after the side panel is back on and the case has been moved." },
      ],
    },
  ],

  "pcie-5-vs-pcie-4-ssd-when-the-difference-matters": [
    {
      kind: "explanation",
      heading: "Worked examples with real situations",
      paragraphs: [
        "Take a gamer with a Ryzen or Core desktop, a mid-range graphics card and a library of installed games. If the board has a free Gen4 M.2 slot, a 2 TB Gen4 drive is a natural choice, because the load screens that remain are mostly bound by the CPU and decompression. Putting the saving toward the graphics card or a larger drive usually changes the experience more than the interface does.",
        "Now take a video editor who records high-bitrate footage and copies a project of several hundred gigabytes from one NVMe drive to another each evening. The copy runs as one long sequential transfer, which is exactly where a Gen5 drive can finish sooner, provided the source is also fast and the Gen5 drive stays cool enough to hold its speed. For that person the premium can pay back in minutes saved per session.",
        "A third reader builds a small PC with one M.2 slot under the graphics card. Here the best drive may be a cool, efficient Gen4 model, because a hot Gen5 controller with no airflow can throttle and end up behaving like a slower drive.",
      ],
    },
    {
      kind: "steps",
      heading: "How to confirm what your current drive negotiates",
      intro: "Before paying for a faster interface, check what you have now.",
      steps: [
        { title: "Open CrystalDiskInfo", body: "Select the NVMe drive and read the Transfer Mode line, which reports the link in use, for example PCIe 4.0 x4. If the generation or width is lower than the drive supports, the slot or BIOS is the limit." },
        { title: "Look in the BIOS", body: "Many boards let you force a slot to Auto or to a fixed generation. Leave it on Auto unless the manual advises otherwise." },
        { title: "Compare against your own task", body: "Time a copy that matches your real work, such as a project folder. If it finishes in a time you are happy with, an interface upgrade has little to offer you." },
      ],
    },
    {
      kind: "choose-if",
      heading: "Which one fits you",
      options: [
        { choice: "Gen4 drive", when: ["Your workload is gaming, browsing, office tasks or light editing", "Your slot is Gen4 or your Gen5 slot shares lanes with the graphics card", "You would rather buy more capacity than more bandwidth"] },
        { choice: "Gen5 drive", when: ["You regularly move or edit files measured in hundreds of gigabytes", "You have a CPU-attached Gen5 slot and airflow or a heatsink plan for it", "The price premium is small next to what an idle hour of your time costs"] },
      ],
    },
  ],

  "ssd-dram-cache-slc-cache-and-nand-types-explained": [
    {
      kind: "explanation",
      heading: "Reading a slow copy without panicking",
      paragraphs: [
        "A copy that starts fast and then falls to a crawl is the classic sign that the drive has run out of fast cache, and it is easy to mistake for a failing drive. The controller writes incoming data as single-bit cells first, then folds it into the denser TLC or QLC cells later. When the transfer is larger than the cache, the drive has to write natively while it also clears the backlog, so speed drops to the sustained level.",
        "Several things change how big that cache is. Many drives use a dynamic cache, which borrows free cells, so a nearly full drive has less room to buffer. Larger capacities usually have more flash chips and therefore a larger cache and higher sustained writes. Idle time lets the controller empty the cache in the background, which is why a second copy after a short break can start fast again.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Match the traits to the way you use the drive",
      columns: ["Use", "What matters most", "What matters less"],
      rows: [
        ["Windows boot and apps", "Responsive random reads, reliable firmware", "Peak sequential speed"],
        ["Large game installs and updates", "Sustained write speed and free space", "DRAM on its own"],
        ["Video scratch disk or backups", "Sustained writes over long transfers, TLC over QLC where possible", "Headline read figures"],
        ["Secondary storage for media", "Capacity per dollar, endurance rating", "Cache size"],
      ],
    },
    {
      kind: "steps",
      heading: "How to see sustained behaviour on your own drive",
      steps: [
        { title: "Pick a file larger than the drive's likely cache", body: "A single archive or folder of video that is tens of gigabytes is enough. Copy it from a fast source such as another NVMe drive, not from a hard disk." },
        { title: "Watch the transfer graph", body: "Windows' copy dialog shows throughput. Note the speed at the start, the point it drops and the level it settles at. That settled level is the number to compare between drives." },
        { title: "Leave free space", body: "Keep a good share of the drive empty if you copy large files often, since a dynamic cache needs free cells to work with." },
      ],
    },
    {
      kind: "explanation",
      heading: "Endurance, warranty and what the label cannot tell you",
      paragraphs: [
        "Cell type also feeds into endurance, which makers state as terabytes written (TBW) over the warranty period. Compare the TBW figure at the same capacity, because a 1 TB TLC drive and a 1 TB QLC drive can carry noticeably different ratings. Most home users write far less than the rating in a warranty period, so treat endurance as a tie-breaker, not as a headline reason to avoid QLC.",
        "A product page often omits which NAND and controller are inside, and makers sometimes change components during a model's life. If it matters to you, look for an independent review of the exact capacity you are buying and check whether it reports the cell type and cache behaviour.",
      ],
    },
  ],

  "will-this-gpu-fit-my-case-and-psu": [
    {
      kind: "explanation",
      heading: "Three worked fit scenarios",
      paragraphs: [
        "Consider a mid-tower with a stated maximum card length of 330 mm and a front radiator. A card that measures 320 mm looks like a pass on paper, but a thick front fan stack or radiator can eat into the space. The sensible step is to read the case's note for the radiator position and to leave the 5 to 10 mm margin commonly advised, so a 320 mm card in that case is a check-the-manual situation, not a yes.",
        "Now a compact case that takes a dual-slot card at up to roughly 300 mm. A triple-slot card of the same length can still fail, because the thickness runs into drive cages or the side panel. Check the stated maximum thickness or slot count as well as the length, and check whether a vertical or riser layout changes it.",
        "Finally a prebuilt with a small proprietary PSU. The slot and length may fit, but the PSU may lack a free PCIe cable or the wattage, and some prebuilt supplies use a non-standard shape or pinout. Find the exact model on the label, and ask the system maker what upgrade cards it supports before you buy.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "If the PC will not boot after the install",
      items: [
        { label: "No display and a GPU fan that does not spin", how: "A missing or half-seated power plug is common. Power off, unplug, and reseat every PCIe power plug on the card." },
        { label: "Monitor plugged into the motherboard", how: "Move the cable to a port on the graphics card. Boards with integrated graphics often keep sending video from their own ports." },
        { label: "Card not in the top slot", how: "Use the primary x16 slot named in the manual, and press the card in until the slot latch clicks." },
        { label: "Random restarts only under load", how: "Suspect PSU capacity, a loose connector or heat. Compare the PSU rating against the card maker's recommended wattage." },
      ],
    },
    {
      kind: "mistakes",
      heading: "Fit mistakes that cost a return",
      items: [
        { mistake: "Counting only the card's length", instead: "Also check thickness, how far the card sits from the front fans and the space at the plug end for the cable's bend." },
        { mistake: "Assuming a modular PSU holds every cable", instead: "Count the card's required sockets against the PSU's PCIe or 12V-2x6 cables and check which are in the box." },
        { mistake: "Trusting a calculator alone", instead: "Use it as a second opinion next to the card maker's recommended PSU figure and the PSU label." },
      ],
    },
  ],
};
