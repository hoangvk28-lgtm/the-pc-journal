import { wave1Extras } from "./monitors-builds-wave1-extra";
import type { GuideModule, InformationalGuide, PcCategory, SourceRef } from "@/lib/pc-content/types";

/**
 * Wave 1 informational guides for the monitors, pc-builds and upgrades hubs.
 * Every figure here is a published standard, a connector specification or arithmetic
 * (pixel counts, pixels per inch). Anything that varies by model is written as
 * "what to check and where", never as a guess.
 */

interface Spec {
  slug: string;
  category: PcCategory;
  subtopic: string;
  seoTitle: string;
  title: string;
  dek: string;
  metaDescription: string;
  teaser: string;
  readTime: string;
  related: string[];
  sources: SourceRef[];
  modules: GuideModule[];
}

const mk = (s: Spec): InformationalGuide => ({
  type: "guide",
  status: "published",
  author: { name: "The PC Journal", url: "/about-the-pc-journal" },
  ...s,
});

const src = (id: string, label: string, url: string, publisher: string, kind: SourceRef["kind"] = "reference"): SourceRef => ({
  id,
  label,
  url,
  publisher,
  kind,
});

const VESA = src("vesa", "VESA: DisplayPort and Adaptive-Sync", "https://vesa.org/", "VESA", "manufacturer");
const HDMI = src("hdmi", "HDMI Forum and HDMI Licensing Administrator", "https://www.hdmi.org/", "HDMI Licensing Administrator", "manufacturer");
const USBIF = src("usbif", "USB Implementers Forum", "https://www.usb.org/", "USB-IF", "manufacturer");
const NVIDIA = src("nvidia", "NVIDIA G-SYNC monitors", "https://www.nvidia.com/", "NVIDIA", "manufacturer");
const AMD = src("amd", "AMD FreeSync technology", "https://www.amd.com/", "AMD", "manufacturer");
const DHDR = src("displayhdr", "VESA DisplayHDR", "https://displayhdr.org/", "VESA", "manufacturer");
const MS = src("ms", "Microsoft Support", "https://support.microsoft.com/", "Microsoft", "manufacturer");

/* ───────────────────────────── 1 ───────────────────────────── */
const hdmiVsDp = mk({
  slug: "hdmi-2-1-vs-displayport-for-high-refresh-monitors",
  category: "monitors",
  subtopic: "gaming-monitors",
  seoTitle: "HDMI 2.1 vs DisplayPort for High Refresh",
  title: "HDMI 2.1 vs DisplayPort 1.4 vs 2.1 for High-Refresh Monitors",
  dek: "A fast panel only reaches its refresh rate if the cable, the monitor port and the graphics card output all carry enough bandwidth. Here is how to check each link.",
  metaDescription:
    "Compare HDMI 2.1, DisplayPort 1.4 and DisplayPort 2.1 bandwidth, learn when DSC is needed, and check which port gets your monitor to its full refresh rate.",
  teaser: "Check the monitor port, the graphics card output and the cable for the resolution and refresh rate you want.",
  readTime: "8 min read",
  related: ["monitor-refresh-rate-explained", "is-a-high-refresh-rate-monitor-worth-it-for-work-and-gaming", "how-to-choose-a-4k-monitor", "how-to-choose-a-graphics-card-for-4k-gaming"],
  sources: [VESA, HDMI],
  modules: [
    {
      kind: "key-takeaway",
      body: "For 1080p or 1440p at 144 Hz and above, DisplayPort 1.4 is enough for most monitors. For 4K above 120 Hz, you need either Display Stream Compression on a 48 Gbps HDMI 2.1 or DisplayPort 1.4 link, or a DisplayPort 2.1 link with a monitor and graphics card that both support it. The refresh rate printed on the box only applies to the specific port and cable that carry that signal.",
    },
    {
      kind: "explanation",
      heading: "Why the port matters as much as the panel",
      paragraphs: [
        "A monitor receives every pixel of every frame over a single cable. The data rate is roughly width times height times refresh rate times bits per pixel, plus some overhead for timing. Double the refresh rate and you double the data. That is why a monitor can accept 4K at 60 Hz over a modest connection and need something much faster for 4K at 144 Hz.",
        "Each standard has a fixed ceiling. HDMI 2.0 tops out at 18 Gbps. DisplayPort 1.4 carries 32.4 Gbps on the wire, which works out to about 25.9 Gbps of usable video data after encoding overhead. HDMI 2.1 raises the ceiling to 48 Gbps, and DisplayPort 2.1 offers link rates of 40, 54 or 80 Gbps depending on the tier (UHBR10, UHBR13.5 or UHBR20).",
        "When a signal does not fit, the system has three options: drop the refresh rate, reduce colour detail with chroma subsampling, or compress the stream. Compression is called Display Stream Compression, or DSC. It is designed to be visually lossless and is how most 4K high-refresh monitors work over DisplayPort 1.4 and HDMI 2.1 today.",
      ],
    },
    {
      kind: "explanation",
      heading: "Where each standard fits",
      paragraphs: [
        "DisplayPort 1.4 comfortably handles 1440p at very high refresh rates and 4K up to about 120 Hz at 8 bits per colour without compression. Beyond that, 4K at 144 Hz needs more than its usable bandwidth, so monitors lean on DSC or fall back to chroma subsampling. If your monitor and graphics card both support DSC, the fallback is invisible in normal use.",
        "HDMI 2.1 matters most for TVs and consoles, but PC monitors increasingly include it. A full 48 Gbps implementation can carry 4K at 120 Hz without compression. Be careful with the label: the HDMI 2.1 name does not by itself guarantee a 48 Gbps data rate, and some monitors implement a lower rate, so the maximum resolution and refresh rate listed for that specific port is the number to trust.",
        "DisplayPort 2.1 is the option for the very top of the market, such as 4K at 240 Hz and higher without relying on compression. It only helps if both ends support it at a matching tier. A monitor with a UHBR13.5 port paired with a card that stops at UHBR10 will negotiate down to the slower rate.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Port ceilings at a glance",
      intro: "Figures are the link rates defined by each standard. Real limits depend on the exact monitor and graphics card implementation.",
      columns: ["Standard", "Link rate", "Typical use"],
      rows: [
        ["HDMI 2.0", "18 Gbps", "4K at 60 Hz, 1080p or 1440p at high refresh on some monitors"],
        ["DisplayPort 1.4", "32.4 Gbps raw (about 25.9 Gbps usable)", "1440p at 240 Hz and above, 4K at 120 to 144 Hz with DSC"],
        ["HDMI 2.1", "Up to 48 Gbps (FRL)", "4K at 120 Hz and consoles; confirm the rate for each monitor"],
        ["DisplayPort 2.1", "40, 54 or 80 Gbps (UHBR10, 13.5, 20)", "4K at 240 Hz and ultra-high-resolution displays"],
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Check the whole chain before you buy",
      intro: "A refresh rate is only guaranteed when every link supports it.",
      items: [
        { label: "Monitor ports", how: "On the manufacturer's spec page, find the maximum resolution and refresh rate listed separately for each HDMI and DisplayPort input. They are often different." },
        { label: "Graphics card outputs", how: "Open the card's spec page and note the HDMI and DisplayPort versions, and whether DSC is supported. Older cards may only offer DisplayPort 1.4 or HDMI 2.0." },
        { label: "Cable", how: "For HDMI 2.1 at full rate, buy a cable labelled Ultra High Speed. For DisplayPort 2.1 at high link rates, look for VESA DP40, DP54 or DP80 certified cables. Older cables can force a lower rate." },
        { label: "Operating system", how: "In Windows, open Settings, System, Display, Advanced display and confirm the refresh rate. Then look at your GPU control panel to see whether DSC or reduced chroma is active." },
      ],
    },
    {
      kind: "mistakes",
      items: [
        { mistake: "Plugging the monitor into the motherboard's video output instead of the graphics card.", instead: "Use the graphics card ports on the rear of the card. The motherboard outputs drive the integrated graphics and are often limited to lower rates." },
        { mistake: "Assuming the cable that came with a monitor suits every mode.", instead: "Use the cable the manufacturer recommends for the top refresh rate, and swap it before blaming the monitor if the maximum rate is missing from the menu." },
        { mistake: "Treating HDMI 2.1 on the product page as proof of 4K at 144 Hz.", instead: "Read the port table for the supported resolution and refresh rate on that input, and confirm your graphics card output matches." },
        { mistake: "Ignoring that some features require a specific port.", instead: "Check whether variable refresh rate, HDR or full refresh is available on both HDMI and DisplayPort, or only one of them." },
      ],
    },
    {
      kind: "choose-if",
      heading: "Which connection to use",
      options: [
        { choice: "Use DisplayPort", when: ["You are connecting a PC and the monitor offers DisplayPort at your target rate.", "You want the widest compatibility with variable refresh rate on desktop graphics cards."] },
        { choice: "Use HDMI 2.1", when: ["The monitor lists your target rate on its HDMI 2.1 input and the card has a matching output.", "You also connect a console, or only one DisplayPort is free."] },
        { choice: "Aim for DisplayPort 2.1", when: ["You are buying a 4K monitor above 144 Hz and want to avoid compression.", "Your graphics card supports the same UHBR tier as the monitor."] },
      ],
    },
    {
      kind: "explanation",
      heading: "Reading a monitor's port table",
      paragraphs: [
        "Manufacturers usually list the top mode for each input in a table or footnote, for example one figure for DisplayPort and a lower one for HDMI. If the page gives only one headline number, assume it applies to the best port and look for the exact input in the manual, which often has a supported-timings list.",
        "Note also whether the headline figure assumes DSC. A monitor that reaches its maximum only with compression needs a graphics card that supports it, and DSC can limit the number of monitors a card can drive at once on some hardware. Check your card's multi-monitor notes if you plan a dual setup.",
        "Finally, consider your own use. If you play competitive games at 1080p or 1440p, DisplayPort 1.4 is already comfortable. The extra headroom of newer standards matters most at 4K and above, or when you want uncompressed output.",
      ],
    },
    {
      kind: "next-steps",
      items: [
        { label: "Best 144Hz monitors", href: "/guides/best-144hz-monitors" },
        { label: "Best 240Hz monitors", href: "/guides/best-240hz-monitors" },
        { label: "Best 4K 144Hz monitors", href: "/guides/best-4k-144hz-monitors" },
      ],
    },
  ],
});

/* ───────────────────────────── 2 ───────────────────────────── */
const vrr = mk({
  slug: "g-sync-vs-freesync-vs-hdmi-vrr",
  category: "monitors",
  subtopic: "gaming-monitors",
  seoTitle: "G-SYNC vs FreeSync vs HDMI VRR Explained",
  title: "G-SYNC vs FreeSync vs HDMI VRR: What Actually Differs",
  dek: "All three reduce tearing by letting the monitor follow your graphics card's frame rate. The differences are in certification, supported ports and low-frame-rate behaviour.",
  metaDescription:
    "Understand G-SYNC, G-SYNC Compatible, FreeSync and HDMI VRR, which graphics cards and ports each works with, and how to turn variable refresh on correctly.",
  teaser: "Find out which variable refresh rate label matters for your graphics card and how to confirm it is switched on.",
  readTime: "7 min read",
  related: ["monitor-refresh-rate-explained", "is-a-high-refresh-rate-monitor-worth-it-for-work-and-gaming", "hdmi-2-1-vs-displayport-for-high-refresh-monitors", "choose-a-pc-monitor"],
  sources: [NVIDIA, AMD, VESA, HDMI],
  modules: [
    {
      kind: "key-takeaway",
      body: "Variable refresh rate (VRR) lets the monitor wait for each frame instead of refreshing on a fixed schedule, which removes tearing without the lag of classic V-sync. Modern NVIDIA and AMD graphics cards can both drive most adaptive-sync monitors, so the useful question is what the monitor was validated for and which port you will use, not which logo is on the box.",
    },
    {
      kind: "explanation",
      heading: "What variable refresh rate does",
      paragraphs: [
        "A fixed 144 Hz monitor refreshes every 6.9 milliseconds whether or not the graphics card has finished a frame. If a new frame lands mid-refresh you see tearing, a horizontal split between two images. Turning on V-sync avoids that, but then a frame that misses its slot waits for the next refresh, which adds delay and visible stutter.",
        "With VRR the display refreshes when the frame is ready, within a range the panel supports. As long as your frame rate stays inside that range, there is no tearing and no waiting. Below the bottom of the range, a feature called low framerate compensation repeats frames to keep the panel inside its limits, and it usually needs the maximum refresh rate to be at least about double the minimum.",
        "VRR does not make a game run faster. It makes uneven frame delivery look smoother. If your graphics card already holds a locked frame rate that matches the refresh rate, you will notice little difference.",
      ],
    },
    {
      kind: "explanation",
      heading: "The names, sorted out",
      paragraphs: [
        "VESA Adaptive-Sync is the open standard for VRR over DisplayPort, and HDMI VRR is the equivalent feature in the HDMI 2.1 specification. FreeSync is AMD's branding built on those standards. AMD runs tiers on top of the base certification, including FreeSync Premium, which adds minimum refresh and low-framerate requirements, and a further tier aimed at HDR.",
        "G-SYNC is NVIDIA's branding and comes in two forms. Monitors with a dedicated NVIDIA module are sold as G-SYNC, with the module controlling the panel directly. Monitors without the module that NVIDIA has validated are marked G-SYNC Compatible, and they use the standard adaptive-sync features. NVIDIA also uses a G-SYNC Ultimate tier for monitors validated for HDR.",
        "For you, this means a G-SYNC Compatible or FreeSync monitor connected by DisplayPort will normally work with either vendor's current graphics cards. A module-based G-SYNC monitor is built around NVIDIA hardware, so check its documentation if you ever plan to switch to an AMD card.",
      ],
    },
    {
      kind: "decision-table",
      heading: "How the labels compare",
      columns: ["Label", "What it means", "Check this"],
      rows: [
        ["VESA Adaptive-Sync", "Open VRR standard over DisplayPort", "Confirm the monitor lists the VRR range"],
        ["FreeSync / FreeSync Premium", "AMD certification built on adaptive-sync, with tiers", "Which ports support it and the refresh range"],
        ["G-SYNC Compatible", "NVIDIA-validated adaptive-sync monitor", "Whether validation was done over DisplayPort or HDMI"],
        ["G-SYNC (module)", "NVIDIA module controls the display", "Confirm vendor support if you may change graphics brand"],
        ["HDMI VRR", "VRR defined in HDMI 2.1", "Requires a graphics card and monitor that both support it"],
      ],
    },
    {
      kind: "steps",
      heading: "Turn variable refresh on and confirm it works",
      steps: [
        { title: "Enable it in the monitor menu", body: "Look for a setting named Adaptive-Sync, FreeSync or VRR in the on-screen display. On some monitors it is off by default, and some features such as certain overdrive modes can disable it." },
        { title: "Enable it in the graphics driver", body: "In the NVIDIA Control Panel, open Set up G-SYNC and tick the option for your display. In AMD Software, turn on FreeSync for the monitor. Use the monitor's own port settings as the starting point." },
        { title: "Check the Windows setting", body: "In Settings, System, Display, Graphics, look for Variable refresh rate under the default graphics settings. It matters mostly for games running in windowed or borderless modes." },
        { title: "Verify in a game", body: "Set the game to exclusive full screen or borderless if the driver supports it, turn off any frame cap above the monitor's maximum, and use a driver or monitor overlay to see whether the refresh rate follows the frame rate." },
      ],
    },
    {
      kind: "mistakes",
      items: [
        { mistake: "Buying on the logo without checking the refresh range.", instead: "Look at the minimum and maximum VRR range on the spec sheet. A narrow range limits how well the feature works at low frame rates." },
        { mistake: "Capping frame rate exactly at the monitor's maximum.", instead: "Set a limit a few frames under the maximum so that frame times do not spill out of the VRR range and fall back to V-sync behaviour." },
        { mistake: "Assuming HDMI offers VRR on every monitor that has an HDMI port.", instead: "Check that the HDMI input specifically lists VRR, and use DisplayPort when the monitor offers it for the wider tested support." },
        { mistake: "Ignoring brightness changes on some panels.", instead: "Some panels, notably certain OLED models, can show small brightness shifts when frame rate swings widely. Read reviews that cover this behaviour for the exact monitor." },
      ],
    },
    {
      kind: "choose-if",
      heading: "Which label to prioritise",
      options: [
        { choice: "G-SYNC Compatible or FreeSync over DisplayPort", when: ["You have a recent NVIDIA or AMD graphics card and want broad compatibility.", "You may switch graphics brands in a later upgrade."] },
        { choice: "Module-based G-SYNC", when: ["You are committed to NVIDIA graphics and the monitor's reviews describe a benefit you care about, such as behaviour at low frame rates."] },
        { choice: "HDMI VRR", when: ["You connect a console or a card that lacks a suitable DisplayPort, and the monitor's HDMI 2.1 input documents VRR support."] },
      ],
    },
    {
      kind: "explanation",
      heading: "VRR and frame-rate caps",
      paragraphs: [
        "VRR works best when frame times are steady. Without a limiter, a game that renders above the monitor's maximum refresh rate leaves the VRR window, and the driver falls back to V-sync or tearing depending on your settings. A frame cap a few frames below the maximum keeps you inside the window.",
        "Where you set the cap matters. In-game limiters usually give the most even frame pacing, while driver-level limiters are convenient for games without an option. Running both at once is unnecessary and can add confusion when you test.",
        "If you see flicker or brightness changes with VRR, try the monitor's other adaptive-sync modes, update the monitor firmware if the maker offers one, and test with the cable and port the maker recommends. Persistent problems on one specific model are worth checking against independent reviews before you return it.",
      ],
    },
    {
      kind: "next-steps",
      items: [
        { label: "Best G-SYNC monitors", href: "/guides/best-g-sync-monitors" },
        { label: "Best FreeSync monitors", href: "/guides/best-freesync-monitors" },
        { label: "Best 165Hz monitors", href: "/guides/best-165hz-monitors" },
      ],
    },
  ],
});

/* ───────────────────────────── 3 ───────────────────────────── */
const burnIn = mk({
  slug: "oled-monitor-burn-in-warranty-and-prevention",
  category: "monitors",
  subtopic: "oled-monitors",
  seoTitle: "OLED Monitor Burn-In: Warranty and Care",
  title: "OLED Monitor Burn-In: What Warranties Cover and How to Lower the Risk",
  dek: "Burn-in is the main long-term question with an OLED monitor. The answer depends on how you use it and what the warranty actually says.",
  metaDescription:
    "Learn how OLED burn-in happens, what separates it from image retention, what to read in a monitor warranty, and practical settings that lower the risk.",
  teaser: "Read a warranty for burn-in wording and set up Windows so a static desktop does not wear one part of the panel.",
  readTime: "8 min read",
  related: ["oled-vs-ips-monitor", "is-a-oled-monitor-worth-it-for-work-and-gaming", "choose-a-pc-monitor", "is-a-high-refresh-rate-monitor-worth-it-for-work-and-gaming"],
  sources: [DHDR, VESA],
  modules: [
    {
      kind: "key-takeaway",
      body: "OLED pixels produce their own light and wear with use, so elements that stay in one place for thousands of hours can age faster than their surroundings. Burn-in risk is highest for static desktop content such as taskbars and docked windows. Read the warranty for the word burn-in, the length of cover and the remedy before you buy, and then adjust how Windows shows static elements.",
    },
    {
      kind: "explanation",
      heading: "What burn-in is, and what it is not",
      paragraphs: [
        "Each pixel in an OLED panel is an organic emitter. Like any light source, it gets slightly dimmer the more it is used and the brighter it runs. Burn-in is uneven ageing: pixels that displayed the same bright shape for a long time end up dimmer than their neighbours, and the shape becomes faintly visible on a uniform colour.",
        "Image retention is different. It is a temporary ghost of a recent image that fades after the panel shows other content or after the monitor runs a compensation cycle. If a faint image disappears after a while, it was retention. If it stays after a refresh cycle and a few hours of varied content, it is closer to permanent wear.",
        "Real-world risk depends on content, brightness and hours. A monitor used mainly for video, games with moving scenes and mixed work is under much less localised stress than one that shows the same spreadsheet, toolbar or heads-up display at high brightness all day. Nobody can give you a safe number of hours, and that is why the warranty text matters.",
      ],
    },
    {
      kind: "explanation",
      heading: "How the monitor protects itself",
      paragraphs: [
        "Most OLED monitors include several protections. Pixel shift moves the image by a few pixels every so often so that edges are not drawn on exactly the same pixels. Automatic brightness limiting reduces the brightness of large bright areas, and some models dim static content after a period of inactivity.",
        "Many also run a panel-compensation or pixel-refresh routine that measures and evens out pixel wear. These routines often run while the monitor is in standby and the power is still connected. If you switch the monitor off at a power strip every night, the routine may never get the chance to run, so check the manual for how and when it runs.",
        "You can usually find these options in the on-screen menu under settings named Pixel Shift, Panel Care, Screen Saver or Pixel Refresh. Names differ by manufacturer, and the manual describes both what each does and any limits, such as a prompt that appears after a number of hours of use.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "What to read in the warranty",
      intro: "Warranty terms differ widely between brands and even between models from the same brand.",
      items: [
        { label: "Is burn-in named?", how: "Some manufacturers state that burn-in is covered, and others describe it as normal wear or image retention that is excluded. Search the warranty document for the word burn-in, not just the product page." },
        { label: "Length of cover", how: "Check the number of years and whether it is the same for the panel and the rest of the monitor. Look for any region differences." },
        { label: "Remedy", how: "Find out whether the remedy is repair, replacement or refund, and who pays for shipping. The process matters as much as the headline number of years." },
        { label: "Conditions", how: "Look for conditions such as maximum brightness, required use of the built-in protections, or a requirement that the product is used in a specific way." },
        { label: "Registration", how: "Check whether you must register the product and keep the receipt, and whether the cover follows the original purchaser only." },
      ],
    },
    {
      kind: "steps",
      heading: "Reduce static-image wear on Windows",
      steps: [
        { title: "Hide or auto-hide the taskbar", body: "In Settings, Personalization, Taskbar, taskbar behaviours, turn on automatic hiding. The taskbar is one of the most persistent static shapes on a desktop." },
        { title: "Use dark mode and a changing wallpaper", body: "Dark themes light fewer pixels. A slideshow wallpaper or a plain dark background means desktop icons do not sit on one bright image." },
        { title: "Set a short screen-off time", body: "Under Power and battery settings, set the screen to turn off after a few minutes of inactivity, and use a screen saver only if the monitor manual recommends one." },
        { title: "Let the standby routine run", body: "After a long session, put the monitor in standby rather than cutting power, and do not interrupt a compensation cycle that the manual says to allow." },
        { title: "Avoid maximum brightness for static work", body: "Use a lower brightness for documents and code, and keep high brightness for HDR video and games where content keeps moving." },
      ],
    },
    {
      kind: "mistakes",
      items: [
        { mistake: "Relying on the number of years alone.", instead: "Read what is excluded. A long cover that excludes burn-in does not help in the one case you are worried about." },
        { mistake: "Cutting power at the wall every night.", instead: "Check the manual. Many routines run in standby, and cutting power can prevent them from completing." },
        { mistake: "Leaving a static window in one place all day.", instead: "Move windows occasionally, use auto-hide for toolbars, or keep a regular IPS monitor for long static work and use the OLED for games and video." },
        { mistake: "Reading every faint ghost as permanent damage.", instead: "Run the standby refresh, show varied content for a while and check again before you contact support." },
      ],
    },
    {
      kind: "choose-if",
      heading: "Is OLED right for your usage",
      options: [
        { choice: "OLED is a good fit", when: ["Most of your screen time is games, video and mixed content.", "You are willing to use auto-hide, dark themes and standby routines."] },
        { choice: "Consider a mini-LED or IPS monitor", when: ["Your screen shows the same office application or toolbar for many hours a day.", "The warranty for the OLED you like excludes burn-in."] },
      ],
    },
    {
      kind: "explanation",
      heading: "Brightness, content and how long it takes",
      paragraphs: [
        "Wear depends on how much light each pixel emits over its life. A white window at high brightness asks far more of the pixels than a dark interface at moderate brightness, so lowering desktop brightness and using dark themes slows uneven ageing without changing how games and video look in HDR.",
        "Different sub-pixel colours do not age at the same rate, which is why long-term wear can show up as a colour tint around a static shape rather than a plain grey shadow. Panel designers address this with layer structure, materials and compensation, and the details differ between panel types, so manufacturers' technical pages and independent long-term tests are the places to read.",
        "Treat any stress test with caution. A test that runs one static image at maximum brightness for weeks shows the limit, not your usage. Use it to compare models if the test conditions are clear, and then judge by your own mix of content.",
      ],
    },
    {
      kind: "next-steps",
      items: [
        { label: "Best OLED gaming monitors", href: "/guides/best-oled-gaming-monitors" },
        { label: "Best QD-OLED monitors", href: "/guides/best-qd-oled-monitors" },
        { label: "Best mini-LED monitors", href: "/guides/best-mini-led-monitors" },
      ],
    },
  ],
});

/* ───────────────────────────── 4 ───────────────────────────── */
const portable = mk({
  slug: "will-my-laptop-drive-a-usb-c-portable-monitor",
  category: "monitors",
  subtopic: "portable-monitors",
  seoTitle: "USB-C Portable Monitor Compatibility",
  title: "USB-C DisplayPort Alt Mode: Will My Laptop Drive a Portable Monitor?",
  dek: "A USB-C port is not always a video port. Check three things on the laptop side, and two on the cable and monitor side, before you order.",
  metaDescription:
    "Find out whether your laptop's USB-C port supports DisplayPort Alt Mode, how portable monitors get power, and what to do if the screen stays blank.",
  teaser: "Identify a video-capable USB-C port, understand the power draw and fall back to HDMI when USB-C will not work.",
  readTime: "7 min read",
  related: ["usb-hub-vs-usb-c-dock", "how-to-choose-a-usb-c-dock-for-a-desktop-setup", "choose-a-pc-monitor", "monitor-refresh-rate-explained"],
  sources: [USBIF, VESA],
  modules: [
    {
      kind: "key-takeaway",
      body: "A portable monitor with a single USB-C cable only works if the laptop's USB-C port can output video, usually through DisplayPort Alternate Mode, Thunderbolt or USB4, and can supply enough power. Many USB-C ports carry only data and charging. Confirm the port type in the laptop's specifications, then use a cable that supports video, and keep an HDMI route in mind as a backup.",
    },
    {
      kind: "explanation",
      heading: "USB-C is a connector, not a capability",
      paragraphs: [
        "The USB-C shape only describes the plug. What a port can do depends on the controller behind it. One port may offer data at 480 Mbps and charging only, while another on the same laptop may offer fast data, charging and video.",
        "Video over USB-C usually works in one of three ways. DisplayPort Alternate Mode sends a native DisplayPort signal over the same pins. Thunderbolt 3, Thunderbolt 4 and USB4 ports carry DisplayPort as part of their protocol and are normally video-capable. Some devices instead use a separate technology that compresses the screen over USB data, which needs a driver and is not what a plain portable monitor expects.",
        "When a laptop maker lists DisplayPort or a small DP logo next to a USB-C port, or states Thunderbolt or USB4 for that port, you can expect video output. If the specification only says USB 3.2 or a charging symbol, do not assume it will work.",
      ],
    },
    {
      kind: "explanation",
      heading: "Power, cables and bandwidth",
      paragraphs: [
        "Most portable monitors are powered from the USB-C connection, so the laptop is supplying power as well as video. That is fine for most modern laptops, but a laptop on battery will drain faster, and a port with a limited power budget may not run the screen at high brightness. Many portable monitors include a second USB-C port for power pass-through so that you can plug in a charger to feed both devices.",
        "The cable matters. A charge-only cable has no video lanes at all. A cable with data but not video-rated wiring may also fail. Use the cable supplied with the monitor first. If you replace it, choose one that explicitly says it supports video or full-featured USB-C, and keep the length short, since long passive cables are more likely to fail at high refresh rates.",
        "Resolution and refresh rate depend on the lanes available. A DisplayPort Alt Mode connection can use all four high-speed lanes for video, or two lanes for video and two for USB data. Two lanes support fewer pixels per second, which is why a monitor that offers a high refresh rate on a dedicated video-only connection can fall back to a lower rate when it is also providing a USB hub.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Confirm the laptop side",
      items: [
        { label: "Port markings", how: "Look beside each USB-C port for a DisplayPort logo, a Thunderbolt lightning symbol or a USB4 mark. Markings vary, so also check the model's spec sheet." },
        { label: "Spec sheet wording", how: "Search the laptop's specifications for DisplayPort, Thunderbolt or USB4 and note which ports have it. Many laptops enable video on only one of several USB-C ports." },
        { label: "Power budget", how: "Check how much power the port can deliver to peripherals. If the specs do not say, assume you will need to power the monitor from a separate adapter on a battery-sensitive laptop." },
        { label: "Windows display detection", how: "Open Settings, System, Display and select Detect. If the monitor shows up but flickers, try a different USB-C port and cable before changing settings." },
      ],
    },
    {
      kind: "steps",
      heading: "If the screen stays blank",
      steps: [
        { title: "Try another USB-C port", body: "On laptops with several USB-C ports, only one or two may support video. The port marked with a Thunderbolt or DisplayPort symbol is the first to try." },
        { title: "Swap the cable", body: "Use the cable that shipped with the monitor, or a certified full-featured cable, and avoid long extension cables or charge-only leads." },
        { title: "Connect external power", body: "If the monitor has a power-only USB-C port, plug a charger into it. A brief flash and then nothing is a common sign of insufficient bus power." },
        { title: "Use the mini-HDMI or HDMI route", body: "Many portable monitors include a mini-HDMI input. An HDMI cable and separate USB power works on laptops without video over USB-C." },
        { title: "Update graphics and chipset drivers", body: "Install the latest graphics, chipset and Thunderbolt or USB4 drivers from the laptop maker, and update the laptop's BIOS if the maker lists a display fix." },
      ],
    },
    {
      kind: "mistakes",
      items: [
        { mistake: "Buying on the basis that the laptop has a USB-C port.", instead: "Confirm DisplayPort Alt Mode, Thunderbolt or USB4 support for the exact port before ordering." },
        { mistake: "Using a phone-charging cable.", instead: "Use a cable that lists video or full-featured support, and keep it short." },
        { mistake: "Expecting full brightness from a laptop on battery power.", instead: "Plug in the laptop charger, or power the monitor through its own power input." },
        { mistake: "Forgetting that a desktop graphics card rarely has USB-C video.", instead: "For a desktop PC, use HDMI or DisplayPort on the graphics card, and look for a portable monitor with a full-size or mini HDMI input." },
      ],
    },
    {
      kind: "explanation",
      heading: "Using a portable monitor with a desktop, console or phone",
      paragraphs: [
        "A desktop graphics card normally has HDMI and DisplayPort rather than USB-C video, so a portable monitor with a mini-HDMI or full-size HDMI input is the simplest match. Power it from a USB port or a wall adapter and use a standard HDMI cable.",
        "A DisplayPort-to-USB-C adapter or cable can work for a monitor that accepts DisplayPort Alt Mode, but the direction matters and some adapters are one-way. Check that the adapter states it converts from DisplayPort to USB-C for a display, and expect to supply power separately.",
        "Consoles and phones differ. Some handhelds and phones support video over USB-C and some do not, and some game consoles output only over HDMI. Check the device maker's page for USB-C display output before you rely on a single cable.",
      ],
    },
    {
      kind: "next-steps",
      items: [
        { label: "Best portable USB-C monitors", href: "/guides/best-portable-usb-c-monitors" },
        { label: "Best portable monitors", href: "/guides/best-portable-monitors" },
        { label: "Best portable monitor for laptop gaming", href: "/guides/best-portable-monitor-for-laptop-gaming" },
      ],
    },
  ],
});

/* ───────────────────────────── 5 ───────────────────────────── */
const ppi = mk({
  slug: "monitor-size-and-pixel-density-for-text",
  category: "monitors",
  subtopic: "monitors-general",
  seoTitle: "Monitor Size and Pixel Density for Text",
  title: "Monitor Size, Resolution and Pixel Density: Sharp Text at Your Distance",
  dek: "Sharpness comes from pixels per inch and how far you sit, not resolution alone. Work it out from the numbers on the spec sheet.",
  metaDescription:
    "Calculate pixels per inch for common monitor sizes and resolutions, see what 109 PPI and 163 PPI mean for text, and pick a size that suits your desk.",
  teaser: "Use a simple pixels-per-inch calculation to compare monitors and pick a size that suits how far you sit.",
  readTime: "7 min read",
  related: ["24-vs-27-vs-32-inch-monitor", "1080p-vs-1440p-vs-4k-monitor", "choose-a-pc-monitor", "how-to-choose-a-4k-monitor"],
  sources: [MS],
  modules: [
    {
      kind: "key-takeaway",
      body: "Pixel density is the diagonal resolution in pixels divided by the diagonal size in inches. A 27-inch 1440p monitor is about 109 pixels per inch, a 27-inch 4K monitor is about 163, and a 32-inch 1080p-class panel falls near 69. Text looks cleaner as density rises, but a higher number only helps if you can sit close enough to see it and your operating system scales the interface sensibly.",
    },
    {
      kind: "explanation",
      heading: "How to calculate pixel density",
      paragraphs: [
        "Take the square root of width squared plus height squared, in pixels, and divide it by the diagonal in inches. A 2560 by 1440 panel has a diagonal of about 2,937 pixels, so at 27 inches the result is about 109 PPI, and at 32 inches it falls to about 92 PPI. A 3840 by 2160 panel has a diagonal of about 4,406 pixels, which gives about 163 PPI at 27 inches and about 138 PPI at 32 inches.",
        "The same arithmetic explains why a large 1080p monitor looks soft. A 1920 by 1080 panel has a diagonal near 2,203 pixels, so 24 inches gives about 92 PPI and 27 inches only about 82 PPI. Each pixel is larger and easier to see, and curved diagonal strokes in text show stepping.",
        "Because the calculation needs only the resolution and size, you can use it on any monitor, including ultrawide models. A 34-inch 3440 by 1440 panel is about 110 PPI, close to a 27-inch 1440p monitor, and a 49-inch 5120 by 1440 super-ultrawide is about 109 PPI.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Common sizes and approximate density",
      intro: "Calculated from the published resolution and diagonal. Real panels vary slightly with their exact active area.",
      columns: ["Size and resolution", "Approx. PPI", "What to expect for text"],
      rows: [
        ["24-inch, 1920 x 1080", "92", "Usable at arm's length; pixel structure visible up close"],
        ["27-inch, 1920 x 1080", "82", "Noticeably soft for text work"],
        ["24-inch, 2560 x 1440", "122", "Crisp, small interface at 100% scaling"],
        ["27-inch, 2560 x 1440", "109", "A common balance for games and office work"],
        ["32-inch, 2560 x 1440", "92", "Larger image at the cost of sharpness"],
        ["32-inch, 3840 x 2160", "138", "Sharp text, comfortable at moderate scaling"],
        ["27-inch, 3840 x 2160", "163", "Very sharp; needs scaling above 100%"],
        ["34-inch, 3440 x 1440", "110", "Similar sharpness to 27-inch 1440p, wider view"],
      ],
    },
    {
      kind: "explanation",
      heading: "Viewing distance and scaling",
      paragraphs: [
        "A higher pixel density only improves what you see when your eyes can resolve the individual pixels. Sit further back and a 92 PPI panel and a 163 PPI panel look more alike. Sit a typical desk distance away, usually somewhere between an arm's length and a little less, and the differences in text edges become easy to see, especially for small fonts.",
        "Scaling turns extra pixels into smoother text instead of smaller text. On Windows, open Settings, System, Display and look at the Scale setting. On a 27-inch 4K monitor, 150 percent gives you an effective workspace of 2560 by 1440 with much sharper characters. On a 32-inch 4K monitor, 125 percent gives about 3072 by 1728 and 150 percent gives about 2560 by 1440.",
        "Older applications may not scale well and can look blurred. If that applies to software you use daily, test your own applications on a monitor you can return before committing to a very high density.",
      ],
    },
    {
      kind: "steps",
      heading: "Pick a size and resolution for your desk",
      steps: [
        { title: "Measure your seated distance", body: "Sit as you normally do and measure from your eyes to where the screen will sit. If it is under about 60 cm, a 24 to 27-inch monitor is easier to take in without moving your head." },
        { title: "Decide on the workspace you need", body: "Think in effective pixels after scaling. If you want the equivalent of 2560 by 1440 workspace with sharper text, a 27-inch 4K monitor at 150 percent does that." },
        { title: "Check what the graphics card must drive", body: "A 4K image has 8,294,400 pixels, which is 2.25 times a 1440p image at 3,686,400. If you game at the native resolution, check that your graphics card suits it." },
        { title: "Compare the calculated PPI", body: "Run the calculation for each candidate and compare the PPI. Two monitors at similar density will feel similar, whatever the box says about resolution." },
      ],
    },
    {
      kind: "mistakes",
      items: [
        { mistake: "Choosing a 32-inch monitor at 1440p for text work.", instead: "At about 92 PPI the text looks coarser. Consider 4K at 32 inches, or a 27-inch 1440p monitor." },
        { mistake: "Setting 4K at 100 percent scaling on a 27-inch monitor.", instead: "Use 125 to 150 percent so that text is readable. Sharper text is the benefit of the extra pixels." },
        { mistake: "Judging sharpness by resolution alone.", instead: "Compare the calculated pixels per inch for each candidate at its screen size." },
        { mistake: "Ignoring desk depth.", instead: "A large monitor on a shallow desk makes edges hard to see. Measure first, and allow for any monitor arm." },
      ],
    },
    {
      kind: "explanation",
      heading: "Reading, coding and image work at different densities",
      paragraphs: [
        "People who read and write for hours care most about text edges. Higher density gives smoother curves in small fonts, which is why many writers and programmers prefer 4K at 27 or 32 inches with scaling, or 1440p at 27 inches as a lower-cost step.",
        "Image and video work depends on whether you need to see detail at 100 percent. A 4K panel shows more of a photograph without zooming, while a 1080p panel shows less. If colour accuracy matters, density is secondary to the panel's colour coverage and calibration.",
        "For games, density matters less than frame rate. A lower-density monitor can feel fine at normal gaming distance, and a higher-density one asks more of the graphics card. Think about what you do most hours of the day before choosing.",
      ],
    },
    {
      kind: "next-steps",
      items: [
        { label: "Best 27-inch 4K monitors", href: "/guides/best-27-inch-4k-monitors" },
        { label: "Best 32-inch 4K monitors", href: "/guides/best-32-inch-4k-monitors" },
        { label: "Best monitors for home office", href: "/guides/best-monitors-for-home-office" },
      ],
    },
  ],
});

/* ───────────────────────────── 6 ───────────────────────────── */
const hdr = mk({
  slug: "displayhdr-ratings-explained-for-pc-monitors",
  category: "monitors",
  subtopic: "monitors-general",
  seoTitle: "DisplayHDR Ratings Explained for Monitors",
  title: "DisplayHDR 400, 600, 1000 and True Black: What the HDR Ratings Mean",
  dek: "HDR10 on the box is a signal format. The DisplayHDR tier tells you something about brightness, local dimming and black level.",
  metaDescription:
    "Learn what DisplayHDR 400, 600, 1000 and True Black ratings certify, why HDR10 support alone proves little, and how to set up HDR in Windows.",
  teaser: "Tell a monitor that accepts an HDR signal from one that displays HDR well, and set up Windows HDR properly.",
  readTime: "7 min read",
  related: ["oled-vs-ips-monitor", "choose-a-pc-monitor", "is-a-oled-monitor-worth-it-for-work-and-gaming", "hdmi-2-1-vs-displayport-for-high-refresh-monitors"],
  sources: [DHDR, MS],
  modules: [
    {
      kind: "key-takeaway",
      body: "A monitor that advertises HDR10 can accept an HDR signal, but that alone says nothing about how bright it gets or how well it controls light across the screen. VESA's DisplayHDR certification adds tested tiers: DisplayHDR 400, 500, 600, 1000 and 1400 for LCD, and True Black 400, 500 and 600 for self-emissive panels such as OLED. Higher tiers mean more peak brightness, and DisplayHDR 600 and above require local dimming.",
    },
    {
      kind: "explanation",
      heading: "HDR10 versus a certified tier",
      paragraphs: [
        "HDR10 is a way of sending video: it carries a wider range of brightness and colour information than standard video. A monitor can advertise HDR10 simply because it can read that signal and map it onto its own, limited panel. This is sometimes called HDR input support rather than real HDR performance.",
        "DisplayHDR is a VESA certification programme. Manufacturers submit a monitor to defined tests, and passing sets a tier. The number in the name corresponds to the minimum peak brightness in nits (candelas per square metre) that the display must sustain in the test patterns, such as 400, 600 or 1000.",
        "Because the tiers are tested, they are more informative than a general HDR label. They are still a minimum bar, not a ranking of picture quality, and two monitors with the same tier can differ in panel type, contrast and colour. Use the tier as a filter, and use independent measurements for the details.",
      ],
    },
    {
      kind: "decision-table",
      heading: "What the main tiers imply",
      intro: "Peak brightness in nits refers to the minimum the certification requires. Check VESA's published criteria for the full list of tests.",
      columns: ["Tier", "Panel type", "What it generally means"],
      rows: [
        ["DisplayHDR 400", "LCD", "Entry level: HDR signal support with modest brightness and no local dimming requirement"],
        ["DisplayHDR 500 / 600", "LCD", "Higher peak brightness; DisplayHDR 600 requires local dimming"],
        ["DisplayHDR 1000 / 1400", "LCD", "High peak brightness, usually with many local dimming zones"],
        ["DisplayHDR True Black 400 / 500 / 600", "OLED and other self-emissive", "Very deep blacks, with peak brightness limits set for these panels"],
      ],
    },
    {
      kind: "explanation",
      heading: "Why local dimming and panel type matter",
      paragraphs: [
        "An LCD monitor uses a backlight that shines through the panel. Without local dimming, one backlight lights the whole screen, so bright highlights and dark areas share the same light and blacks look grey. Local dimming divides the backlight into zones that can dim independently. More zones generally mean better control, though the behaviour depends on the implementation, and some monitors show a halo around bright objects on dark backgrounds.",
        "An OLED panel lights each pixel itself, so a black pixel is off. That explains why the True Black tiers have much lower peak brightness numbers than the LCD tiers while still looking contrasty in a dark room. In a bright room, the higher peak brightness of a high-tier LCD can look more impressive.",
        "Peak brightness is also only available for part of the screen or part of the time. Many displays limit brightness when large areas are bright. Reviews that list brightness for a small window and for a full-screen white image, as well as black level and zone count, give a more honest picture.",
      ],
    },
    {
      kind: "steps",
      heading: "Set up HDR in Windows",
      steps: [
        { title: "Turn HDR on", body: "Open Settings, System, Display, select the monitor, and switch Use HDR to On. Some monitors also need an HDR option enabled in their on-screen menu." },
        { title: "Adjust SDR content brightness", body: "In the same HDR settings page, use the SDR content brightness slider so that desktop windows do not look washed out." },
        { title: "Calibrate", body: "Install the Windows HDR Calibration app from the Microsoft Store and follow its steps to set the brightness levels the monitor can reach." },
        { title: "Use game and app settings", body: "Many games have their own HDR calibration screen. Set the maximum brightness there to the value the monitor can reach, so that highlights do not clip." },
      ],
    },
    {
      kind: "mistakes",
      items: [
        { mistake: "Treating HDR10 support as an HDR feature.", instead: "Look for a DisplayHDR tier or independent measurements of peak brightness and local dimming." },
        { mistake: "Leaving HDR on all the time on a monitor with weak HDR.", instead: "Turn it off for desktop use if colours look washed out, and enable it for games or video that benefit." },
        { mistake: "Comparing tiers across different panel types by number.", instead: "A True Black 400 OLED and a DisplayHDR 400 LCD behave very differently in a dark room. Compare black level as well as peak brightness." },
        { mistake: "Ignoring the connection.", instead: "Check that the port you use supports HDR at your refresh rate, since some inputs limit it." },
      ],
    },
    {
      kind: "explanation",
      heading: "Reading independent HDR measurements",
      paragraphs: [
        "When you read a review, look for several numbers rather than one. Peak brightness in a small window shows highlights, a larger window and full-screen white show how brightness drops with bigger bright areas, and black level shows contrast. Local dimming zone count and any blooming photos help with LCD models.",
        "Colour volume matters as well. A wide gamut with good brightness gives richer colour in HDR, and gamut coverage figures are usually listed as a percentage of DCI-P3 or Rec. 2020. Treat these as the reviewer's measurements and note the test conditions.",
        "Finally, remember the content. Not every game or video is mastered well for HDR, so a modest HDR tier can look fine in some titles and poor in others. Test with the content you actually watch if the retailer's return policy allows it.",
      ],
    },
    {
      kind: "next-steps",
      items: [
        { label: "Best monitors with HDR", href: "/guides/best-monitors-with-hdr" },
        { label: "Best HDR 4K monitors", href: "/guides/best-hdr-4k-monitors" },
        { label: "Best mini-LED monitors", href: "/guides/best-mini-led-monitors" },
      ],
    },
  ],
});

/* ───────────────────────────── 7 ───────────────────────────── */
const uwRes = mk({
  slug: "ultrawide-monitor-resolutions-explained",
  category: "monitors",
  subtopic: "ultrawide-monitors",
  seoTitle: "Ultrawide Monitor Resolutions Explained",
  title: "Ultrawide Monitor Resolutions: 2560x1080, 3440x1440, 3840x1600 and 5120x1440",
  dek: "Ultrawide names hide very different pixel counts. Compare them to the workload your graphics card and desk can handle.",
  metaDescription:
    "Compare common ultrawide resolutions by pixel count against 1440p and 4K, see what each demands from a graphics card, and check game and app support.",
  teaser: "Use pixel counts to see how heavy each ultrawide format is for your graphics card, and what to check in games.",
  readTime: "7 min read",
  related: ["how-to-choose-an-ultrawide-monitor", "is-a-ultrawide-monitor-worth-it-for-work-and-gaming", "monitor-size-and-pixel-density-for-text", "how-to-choose-a-graphics-card-for-1440p-gaming"],
  sources: [VESA],
  modules: [
    {
      kind: "key-takeaway",
      body: "Ultrawide covers several formats. 3440 by 1440 has about 34 percent more pixels than standard 1440p, and 5120 by 1440 has exactly twice as many. 5120 by 2160 carries 11,059,200 pixels, more than a 4K display, so it needs a more capable graphics card. Pick the format by its pixel count and the supported aspect ratios in the games and applications you use.",
    },
    {
      kind: "explanation",
      heading: "What the labels mean",
      paragraphs: [
        "Marketing speaks of 21:9 and 32:9, but the true ratios are a little different. A 3440 by 1440 panel is 2.39:1, which is sold as 21:9. A 5120 by 1440 panel is 32:9 and is the same height as a 1440p monitor, with twice the width.",
        "Other formats you will see include 2560 by 1080, 3840 by 1600 and 5120 by 2160. These are often called UWFHD, UWQHD+ and 5K2K respectively, but names differ between brands, so always read the pixel dimensions on the spec sheet.",
        "Height decides how much vertical space you get for documents, and width decides how much of a scene you see. A 1440-pixel-high panel gives the same vertical room as a 27-inch 1440p monitor, whereas 1080 pixels of height is the same as a standard 1080p monitor.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Pixel counts compared",
      intro: "Pixel counts are simple multiplication. The last column is the ratio to a standard 2560 by 1440 display.",
      columns: ["Resolution", "Total pixels", "Versus 2560 x 1440"],
      rows: [
        ["2560 x 1080", "2,764,800", "About 0.75x"],
        ["2560 x 1440", "3,686,400", "1.00x (baseline)"],
        ["3440 x 1440", "4,953,600", "About 1.34x"],
        ["3840 x 1600", "6,144,000", "About 1.67x"],
        ["5120 x 1440", "7,372,800", "2.00x"],
        ["3840 x 2160", "8,294,400", "2.25x"],
        ["5120 x 2160", "11,059,200", "About 3.00x"],
      ],
    },
    {
      kind: "explanation",
      heading: "What each format asks of your PC",
      paragraphs: [
        "Pixel count gives a rough guide to graphics workload because the card has to shade each pixel. A 3440 by 1440 game is closer to a 1440p workload than to 4K, but with about a third more pixels, so a card that suits 1440p will need some headroom. A 5120 by 1440 display roughly doubles the load, and 5120 by 2160 exceeds 4K.",
        "The processor is affected less by resolution but still plays a role in games that render a wider field of view. In fast competitive games running at very high frame rates, the CPU is more likely to be the limit than the display's resolution.",
        "The cable and port matter on wide panels too. A 5120 by 1440 monitor at a high refresh rate carries a large amount of data per frame, so check the port details covered in our guide to HDMI and DisplayPort for high refresh rates.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Check software support before you buy",
      items: [
        { label: "Game aspect ratio support", how: "Search the game's page on PCGamingWiki for the words ultrawide and 32:9. Some titles stretch the image, crop the top and bottom or add black bars." },
        { label: "Cutscenes and menus", how: "Many games show cutscenes in 16:9 with black bars on the sides, even where gameplay supports ultrawide." },
        { label: "Window layouts", how: "On Windows 11, open Snap layouts by hovering over the maximise button and look at the supported arrangements. A wide panel suits three columns of windows." },
        { label: "Video calls and screen sharing", how: "Check whether your meeting software shares a single window or a whole wide screen, since some share the entire panel by default." },
      ],
    },
    {
      kind: "mistakes",
      items: [
        { mistake: "Reading 'ultrawide' as one resolution.", instead: "Compare the pixel dimensions and the pixel count so that you know the graphics workload." },
        { mistake: "Expecting every game to fill the screen.", instead: "Check ultrawide support for your most-played games before buying." },
        { mistake: "Buying a 2560 by 1080 ultrawide for sharp text.", instead: "At 34 inches the density is low. Look for 3440 by 1440 or higher if text clarity matters." },
        { mistake: "Overlooking desk width.", instead: "A 34-inch ultrawide is roughly 80 cm wide and a 49-inch model is roughly 115 cm wide. Measure your desk and arm space first." },
      ],
    },
    {
      kind: "choose-if",
      heading: "Which format suits you",
      options: [
        { choice: "3440 x 1440", when: ["You want a single wide screen that replaces two small monitors.", "Your graphics card already handles 1440p well."] },
        { choice: "5120 x 1440", when: ["You want the equivalent of two 1440p monitors without a bezel, and you sit far enough back to see it all."] },
        { choice: "3840 x 1600 or 5120 x 2160", when: ["You want more vertical room and sharper text, and your graphics card can handle roughly 6 to 11 million pixels."] },
      ],
    },
    {
      kind: "explanation",
      heading: "Working on an ultrawide",
      paragraphs: [
        "For work, the width suits spreadsheets with many columns, timelines in video editors and several documents side by side. Windows Snap layouts and the manufacturer's window-management tools split the screen into zones, and some monitors include a picture-by-picture mode for two inputs.",
        "A curved panel reduces the distance your eyes travel to the edges. Curvature is written as a radius in millimetres, such as 1800R, where a smaller number is a tighter curve. A flat ultrawide is also an option, especially for work where straight lines matter.",
        "Consider a monitor arm and your desk depth. A wide monitor needs room to sit at a comfortable distance, and an arm can pull it forward or push it back as you need.",
      ],
    },
    {
      kind: "next-steps",
      items: [
        { label: "Best 34-inch gaming monitors", href: "/guides/best-34-inch-gaming-monitors" },
        { label: "Best ultrawide gaming monitors", href: "/guides/best-ultrawide-gaming-monitors" },
        { label: "Best ultrawide monitors for work", href: "/guides/best-ultrawide-monitors-for-work" },
      ],
    },
  ],
});

/* ───────────────────────────── 8 ───────────────────────────── */
const scaling4k = mk({
  slug: "windows-display-scaling-for-4k-monitors",
  category: "monitors",
  subtopic: "4k-monitors",
  seoTitle: "Windows Display Scaling for 4K Monitors",
  title: "Windows Display Scaling for 4K Monitors: 100%, 125%, 150% and Blurry Apps",
  dek: "A 4K monitor gives you sharper text only when scaling is set well. Choose a percentage, fix blurry applications and check chroma settings.",
  metaDescription:
    "Choose the right Windows scaling for a 4K monitor at 27 and 32 inches, fix blurry apps, and check that HDMI is not reducing colour detail on your desktop.",
  teaser: "Pick a scale percentage for your 4K monitor, fix blurry programs and confirm full colour detail over the cable.",
  readTime: "7 min read",
  related: ["how-to-choose-a-4k-monitor", "is-a-4k-monitor-worth-it-for-work-and-gaming", "monitor-size-and-pixel-density-for-text", "hdmi-2-1-vs-displayport-for-high-refresh-monitors"],
  sources: [MS, HDMI],
  modules: [
    {
      kind: "key-takeaway",
      body: "At 100 percent scaling a 4K monitor shows tiny interface elements. Most people use 125 to 175 percent, which keeps the extra sharpness while restoring readable size. A 27-inch 4K monitor at 150 percent gives the workspace of a 2560 by 1440 screen, and a 32-inch 4K at 125 to 150 percent suits most seating distances. If text looks fuzzy, check the scaling of the application and the chroma format on the cable.",
    },
    {
      kind: "explanation",
      heading: "What scaling does",
      paragraphs: [
        "Windows scaling draws the interface larger without changing the number of pixels the monitor shows. At 150 percent, a button that would be 100 pixels wide at 100 percent is drawn 150 pixels wide. The result is that text and icons use more pixels per character, so edges are smoother.",
        "To find the effective workspace, divide the real resolution by the scale. For 3840 by 2160, 125 percent gives about 3072 by 1728, 150 percent gives 2560 by 1440 and 200 percent gives 1920 by 1080. Windows offers steps such as 100, 125, 150 and 175 percent in Settings, System, Display, Scale.",
        "Higher density makes scaling more useful. At 27 inches, 4K is about 163 pixels per inch, so most users want 150 percent or more. At 32 inches it is about 138, and 125 to 150 percent is common. Choose by comfort at your normal seating distance, not by a rule.",
      ],
    },
    {
      kind: "steps",
      heading: "Set it up well",
      steps: [
        { title: "Pick a starting scale", body: "Open Settings, System, Display and select the monitor. Try the Windows recommended value first, then compare one step lower and one step higher on text you read every day." },
        { title: "Sign out and back in", body: "Some applications only apply the new scale after you sign out, which avoids mixed-size windows." },
        { title: "Fix a blurry application", body: "Right-click the application's executable, open Properties, Compatibility, Change high DPI settings, and try Override high DPI scaling behaviour with Application or System (Enhanced). Close and reopen the program." },
        { title: "Use the clear text tools", body: "Search for ClearType in the Start menu and run the text tuner. It adjusts how Windows draws text on your specific display." },
        { title: "Set the browser zoom separately", body: "Browsers have their own zoom level. If web pages look too small after changing Windows scaling, adjust the browser zoom instead of changing the Windows scale again." },
      ],
    },
    {
      kind: "explanation",
      heading: "Blurry text that is not scaling",
      paragraphs: [
        "If text looks soft even at a sensible scale, the cause can be colour compression. HDMI 2.0 has a limit of 18 Gbps, which carries 4K at 60 Hz in full 8-bit RGB, but not the same signal at 10 bits per colour. At higher refresh rates or bit depths the connection can fall back to chroma subsampling such as 4:2:2 or 4:2:0. That reduces colour detail and makes thin coloured text look fringed.",
        "Check this in your graphics driver's display settings, where the output colour format and bit depth are listed, or in the monitor's information screen. If it is not RGB or 4:4:4, try a lower refresh rate, use DisplayPort, or use a cable that supports the full bandwidth of your connection.",
        "Also check that the monitor is running at its native resolution of 3840 by 2160. In Settings, Display, Advanced display the active signal resolution should show that value. Running at 2560 by 1440 on a 4K panel blurs everything because the image has to be resampled.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Starting points by size",
      intro: "These are common starting points, not rules. Test on your own text and seating distance.",
      columns: ["4K monitor", "Typical scale", "Effective workspace"],
      rows: [
        ["27-inch", "150%", "2560 x 1440"],
        ["27-inch (close seating, small text)", "175%", "About 2194 x 1234"],
        ["32-inch", "125%", "About 3072 x 1728"],
        ["32-inch (more comfortable text)", "150%", "2560 x 1440"],
        ["43-inch and larger", "100%", "3840 x 2160"],
      ],
    },
    {
      kind: "mistakes",
      items: [
        { mistake: "Staying at 100 percent and leaning forward.", instead: "Use scaling. The extra pixels exist to make text clearer, not to make everything smaller." },
        { mistake: "Setting a custom scale far from the offered steps.", instead: "Stick to the percentage steps Windows offers, because custom values often cause blurry applications." },
        { mistake: "Setting a lower resolution to get larger text.", instead: "Keep the native resolution and raise the scale. A lower resolution is resampled and looks soft." },
        { mistake: "Blaming the monitor for fuzzy colour fringes.", instead: "Check the cable, port and colour format before you assume the panel is poor." },
      ],
    },
    {
      kind: "explanation",
      heading: "Mixed setups and multiple monitors",
      paragraphs: [
        "Windows can apply a different scale to each monitor, so a 4K monitor at 150 percent can sit next to a 1080p monitor at 100 percent. Dragging a window between them usually works, but some older applications blur when they cross the boundary or when you move them between screens.",
        "If you use a laptop with its own screen, you may see three different scales. Choose one scale per monitor in Settings, System, Display and avoid dragging windows between screens where an application misbehaves. Closing and reopening an application on the target screen often fixes blur.",
        "Remote desktop and screen-sharing tools can also change how a high-density screen looks to others. If you present often, test sharing with the scale you intend to use.",
      ],
    },
    {
      kind: "next-steps",
      items: [
        { label: "Best 4K monitors", href: "/guides/best-4k-monitors" },
        { label: "Best 27-inch 4K monitors", href: "/guides/best-27-inch-4k-monitors" },
        { label: "Best USB-C 4K monitors", href: "/guides/best-usb-c-4k-monitors" },
      ],
    },
  ],
});

/* ───────────────────────────── 9 ───────────────────────────── */
const prebuiltLeaves = mk({
  slug: "what-a-prebuilt-pc-listing-leaves-out",
  category: "pc-builds",
  subtopic: "prebuilt-pcs",
  seoTitle: "What a Prebuilt PC Listing Leaves Out",
  title: "What a Prebuilt PC Product Page Leaves Out: PSU, Motherboard and RAM Layout",
  dek: "The processor and graphics card get the headline. The parts that decide noise, stability and upgrade room are often the ones left unnamed.",
  metaDescription:
    "Check the power supply, motherboard, memory layout, storage and cooling a prebuilt PC does not name, and verify them after delivery with built-in Windows tools.",
  teaser: "Know which unnamed parts to ask about before you buy a prebuilt, and how to confirm them once it arrives.",
  readTime: "8 min read",
  related: ["how-to-choose-a-prebuilt-gaming-pc-without-overpaying", "how-to-upgrade-a-prebuilt-gaming-pc-ram-storage-and-limits", "how-to-check-pc-part-compatibility-before-you-buy", "choose-a-pc-power-supply"],
  sources: [MS, src("ark", "Intel Product Specifications (ARK)", "https://ark.intel.com/", "Intel", "manufacturer")],
  modules: [
    {
      kind: "key-takeaway",
      body: "A prebuilt PC's product page almost always names the processor, graphics card, memory size and storage size. It often says little about the power supply, motherboard model, memory configuration, drive type and cooler. Those parts decide how loud the system is, how easily you can upgrade it and how it handles load, so ask for them in writing, or check the product's manual and support pages, before you buy.",
    },
    {
      kind: "explanation",
      heading: "The parts that tend to go unnamed",
      paragraphs: [
        "A product page has limited space and the headline parts sell the system, so the supporting parts are often summarised in general terms like 'high-efficiency power supply' or 'gaming motherboard'. Those phrases carry no information you can check. A named model, wattage and efficiency rating do.",
        "The power supply sets the ceiling for upgrades and affects reliability. Ask for the make, model, wattage and 80 PLUS tier, and whether it has the PCIe connectors for a larger graphics card later. The motherboard decides how many memory slots, M.2 slots and fan headers you will have, and which processors it can accept. The chipset name is the minimum you want to see.",
        "Memory is the third. A kit of two sticks and a single stick of the same total size behave differently, and a system with all slots already filled leaves no room to expand. Storage can be a fast NVMe drive or a slower SATA drive, and the page may say only 'SSD'.",
      ],
    },
    {
      kind: "decision-table",
      heading: "What to ask for, and why",
      columns: ["Part", "What to look for", "Why it matters"],
      rows: [
        ["Power supply", "Brand, model, wattage, 80 PLUS tier, connectors", "Upgrade room, noise and stability under load"],
        ["Motherboard", "Model name and chipset", "Memory slots, M.2 slots, BIOS support for later CPUs"],
        ["Memory", "Number of sticks, speed, free slots", "Dual-channel performance and expansion"],
        ["Storage", "NVMe or SATA, size, free M.2 slots", "Load times and room for a second drive"],
        ["CPU cooler", "Air or liquid, size, model", "Sustained clock speeds and fan noise"],
        ["Case", "Front intake, fan count, GPU clearance", "Cooling and room for a larger graphics card"],
        ["Wi-Fi and ports", "Wi-Fi standard, USB-C, front I/O", "Connectivity you may otherwise add later"],
      ],
    },
    {
      kind: "explanation",
      heading: "Proprietary parts and upgrade limits",
      paragraphs: [
        "Some systems from large manufacturers use proprietary power supplies, motherboard layouts or case fittings. These can limit what you can replace later because standard retail parts may not fit or connect. The manufacturer's service manual or the support pages for the exact model number usually show what is standard and what is not.",
        "Look for the photos or the support page's parts list, and check whether the supply is a standard ATX unit or a smaller form factor with a fixed layout. If the manufacturer's documentation gives a maximum power supply wattage or a note on supported graphics cards, that is the real upgrade ceiling.",
        "Also read the warranty. Some brands restrict what you may change without affecting cover, and others do not. If you plan to upgrade, find that wording before you buy, and note how long the warranty runs for each part.",
      ],
    },
    {
      kind: "steps",
      heading: "Verify the system after it arrives",
      steps: [
        { title: "Check the processor and memory", body: "Open Task Manager, Performance, then CPU and Memory. The Memory tab shows speed and 'Slots used', so you can confirm whether the memory is running in two slots of four or two of two." },
        { title: "Read system information", body: "Press Windows+R, type msinfo32 and press Enter. Note the BaseBoard product, BIOS version and installed memory." },
        { title: "Identify the graphics card", body: "Open Task Manager, Performance, GPU. It lists the exact model and dedicated memory, which you can compare with the product page." },
        { title: "Check storage type", body: "In Task Manager, Performance, Disk, the type is shown as SSD. For NVMe versus SATA, open Device Manager, Disk drives, and look up the model name on the drive maker's site." },
        { title: "Open the case if the warranty allows", body: "Read the label on the power supply for its model and wattage. Check free memory slots, free M.2 slots and fan connectors." },
      ],
    },
    {
      kind: "mistakes",
      items: [
        { mistake: "Comparing prebuilts by CPU and GPU only.", instead: "Compare the power supply, memory configuration and drive type, since two systems with the same headline parts can differ in these." },
        { mistake: "Accepting 'gaming motherboard' as a part name.", instead: "Ask for the model or at least the chipset, so that you can check BIOS support and slot counts." },
        { mistake: "Overlooking a single memory stick.", instead: "Check that the memory is listed as two sticks. A single stick can reduce performance in games and applications that use memory bandwidth." },
        { mistake: "Not checking the return window.", instead: "Verify the parts in the first days using the steps above, while you can still return the system if it differs from what you expected." },
      ],
    },
    {
      kind: "explanation",
      heading: "Warranty, returns and software",
      paragraphs: [
        "Check who stands behind the system. A single warranty from the system builder is simpler than a collection of separate part warranties, and the length and process differ between sellers. Read what the warranty says about opening the case and replacing parts.",
        "Look at the software too. Some prebuilts install trial software, manufacturer utilities or additional launchers. Many can be uninstalled in Settings, Apps, and a clean Windows install is an option if you prefer, as long as you keep the drivers and licence information.",
        "Finally, ask how the system is shipped. A heavy graphics card can sag or move in transit, so check for support brackets, packaging and any removal instructions in the box before powering on.",
      ],
    },
    {
      kind: "next-steps",
      items: [
        { label: "Best prebuilt gaming PCs", href: "/guides/best-prebuilt-gaming-pc" },
        { label: "Best gaming PCs under $1000", href: "/guides/best-gaming-pc-under-1000" },
        { label: "Best power supplies", href: "/guides/best-power-supplies" },
      ],
    },
  ],
});

/* ───────────────────────────── 10 ───────────────────────────── */
const firstBoot = mk({
  slug: "first-boot-checklist-after-building-a-pc",
  category: "pc-builds",
  subtopic: "pc-build-guides",
  seoTitle: "First Boot Checklist After Building a PC",
  title: "First Boot Checklist After Building a PC: BIOS, Memory, Fans and Drivers",
  dek: "The first boot is where most build problems appear. Work through the same short list each time, and you will find the cause faster.",
  metaDescription:
    "Follow a step-by-step first boot checklist after building a PC: check connectors, enter the BIOS, enable XMP or EXPO, install Windows and test temperatures.",
  teaser: "Check connectors, BIOS settings, memory speed and temperatures in a sensible order after a new build powers on.",
  readTime: "8 min read",
  related: ["how-to-plan-your-first-pc-build", "xmp-vs-expo-what-they-do-and-how-to-use-them", "how-to-check-motherboard-bios-compatibility", "pc-won-t-boot-step-by-step-diagnosis"],
  sources: [MS],
  modules: [
    {
      kind: "key-takeaway",
      body: "Before you press the power button, confirm that the CPU power connector, the 24-pin motherboard connector, the graphics card power cables and the front panel header are seated, and that the display cable is plugged into the graphics card. On first boot, enter the BIOS, confirm that the processor, memory and drives are recognised, update the BIOS if needed, then enable the memory profile and install Windows and the drivers.",
    },
    {
      kind: "check-your-pc",
      heading: "Before the first power-on",
      intro: "Five minutes here saves an hour later.",
      items: [
        { label: "CPU power", how: "Confirm the 8-pin or 4+4-pin EPS cable is plugged into the CPU power header near the top of the motherboard, not into a PCIe power connector." },
        { label: "24-pin motherboard connector", how: "It should click into place at the edge of the board. Check that the latch is fully engaged." },
        { label: "Graphics card power", how: "Use the cables the power supply maker provides for the card, and use separate cables for each connector where the manufacturer recommends it. Seat the 12VHPWR or 12V-2x6 connector fully if your card uses it." },
        { label: "Memory", how: "Both sticks should be in the slots the motherboard manual recommends for two modules, with the clips closed." },
        { label: "Front panel header", how: "Power switch and reset wires go on the small header with a layout diagram printed on the board or in the manual." },
        { label: "Display cable", how: "Plug the monitor into the graphics card's ports, not the motherboard's rear video outputs." },
      ],
    },
    {
      kind: "steps",
      heading: "First boot, in order",
      steps: [
        { title: "Power on with only what you need", body: "Boot with the CPU, cooler, memory, graphics card and one drive. Keep extra cables, drives and add-in cards out until the system boots." },
        { title: "Enter the BIOS", body: "Press Delete or F2 on startup, as your board manual states. Confirm the CPU name, the memory capacity and the connected drives." },
        { title: "Check the BIOS version", body: "Compare the version with the manufacturer's page for your board and CPU. A board needs a recent version for newer processors. Use the manufacturer's flash tool, and follow its power-safety notes." },
        { title: "Enable the memory profile", body: "Switch on XMP or EXPO so that memory runs at its rated speed. Without it, memory commonly runs at a lower default speed." },
        { title: "Check fans and temperatures", body: "In the BIOS monitor page, check that the CPU fan reports a speed and that the idle CPU temperature is reasonable. Fan headers labelled CPU_FAN and AIO_PUMP are for the cooler." },
        { title: "Install Windows", body: "Create installation media with Microsoft's media creation tool on another computer, set the USB drive first in the boot menu and install onto the intended drive." },
        { title: "Install drivers", body: "Get the chipset driver from AMD or Intel or your board maker, the graphics driver from NVIDIA or AMD, and the network and audio drivers from the board maker if Windows Update does not supply them." },
      ],
    },
    {
      kind: "explanation",
      heading: "What the common first-boot symptoms usually point to",
      paragraphs: [
        "If the system powers on and fans spin but nothing appears on screen, check that the display cable is plugged into the graphics card and reseat the memory. Many motherboards have diagnostic LEDs labelled CPU, DRAM, VGA and BOOT, or a two-digit code display. The manual lists what each indicates, and the one that stays lit shows where the check starts.",
        "If the system does not respond when you press the power button, the front panel header or the power supply switch is the first suspect. If it powers on for a second and turns off, look for a missing CPU power cable, a short from a loose standoff or a cooler that is not seated properly.",
        "Memory training can take a minute on first boot with some modern platforms, especially after enabling a profile. A black screen for a short time can be normal, so wait a couple of minutes before you reset the system.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Quick symptom guide",
      columns: ["Symptom", "First thing to check", "Where to look"],
      rows: [
        ["No power at all", "Power supply switch and front panel header", "Power supply rear, board manual"],
        ["Fans spin, no display", "Monitor cable in the graphics card, memory seating", "Rear of the case, memory slots"],
        ["Boots, then shuts down", "CPU power cable and cooler contact", "Top of the board, cooler mounting"],
        ["BIOS missing a drive", "Cable seating or the M.2 slot sharing lanes with another port", "Board manual storage page"],
        ["Memory shows a low speed", "XMP or EXPO disabled", "BIOS memory settings"],
      ],
    },
    {
      kind: "mistakes",
      items: [
        { mistake: "Plugging the monitor into the motherboard.", instead: "Use the graphics card's outputs when a dedicated card is installed." },
        { mistake: "Skipping the BIOS update when a new CPU needs it.", instead: "Check the board's CPU support list before buying, and use the manufacturer's flash method if the board cannot boot with an older BIOS." },
        { mistake: "Leaving the memory profile off.", instead: "Enable XMP or EXPO, then confirm the speed in Task Manager under Performance, Memory." },
        { mistake: "Installing from a drive that is not set in the boot order.", instead: "Use the one-time boot menu key listed in the board manual." },
      ],
    },
    {
      kind: "explanation",
      heading: "Stress and stability checks",
      paragraphs: [
        "After Windows and the drivers are installed, run the system under load to look for faults. A few runs of a game or a benchmark tool show whether temperatures stay in a normal range and whether the system crashes. Watch the CPU and GPU temperatures with a monitoring tool and compare them with the maker's stated maximum.",
        "Memory problems can cause random crashes after a clean install. If you see them, try the memory without the profile enabled, update the BIOS and run a memory test such as the Windows Memory Diagnostic or a bootable test tool for several passes.",
        "Save a system restore point or a full image when everything works. It gives you a known-good state to return to if a later driver or update causes problems.",
      ],
    },
    {
      kind: "next-steps",
      items: [
        { label: "Best power supplies", href: "/guides/best-power-supplies" },
        { label: "Best PC cases", href: "/guides/best-pc-cases" },
        { label: "Best motherboards", href: "/guides/best-motherboards" },
      ],
    },
  ],
});

/* ───────────────────────────── 11 ───────────────────────────── */
const miniVsSff = mk({
  slug: "mini-pc-vs-small-form-factor-pc-build",
  category: "pc-builds",
  subtopic: "mini-pcs",
  seoTitle: "Mini PC vs Building a Small-Form-Factor PC",
  title: "Mini PC vs Building a Small-Form-Factor PC: Upgrade Room, Power and Noise",
  dek: "Both are small. One arrives complete with fixed limits, the other asks you to plan clearances and parts in exchange for a real graphics card.",
  metaDescription:
    "Compare a mini PC with a mini-ITX small-form-factor build on graphics, upgrades, power supply, cooling and noise to decide which route suits your desk.",
  teaser: "Decide between a ready-made mini PC and a Mini-ITX build by what you need to upgrade, cool and power.",
  readTime: "7 min read",
  related: ["how-to-choose-a-mini-pc-without-overpaying", "how-to-plan-a-small-form-factor-pc", "atx-vs-micro-atx-vs-mini-itx", "how-to-upgrade-a-mini-pc-ram-storage-and-limits"],
  sources: [src("intel", "Intel Product Specifications (ARK)", "https://ark.intel.com/", "Intel", "manufacturer")],
  modules: [
    {
      kind: "key-takeaway",
      body: "A mini PC is a complete, compact computer, usually with a mobile processor, integrated graphics, an external power adapter and limited upgrade options. A small-form-factor build uses a Mini-ITX motherboard, a standard desktop processor and often a full-size graphics card inside a compact case. Choose the mini PC for quiet, low-power everyday use, and the build when you need a dedicated graphics card or want to replace parts over time.",
    },
    {
      kind: "explanation",
      heading: "What you are really comparing",
      paragraphs: [
        "A mini PC is designed around one thermal and power budget. The processor is often a laptop-class chip, the memory uses SO-DIMM sticks or is soldered to the board, and the power comes from an external brick. The maker has already matched cooling to those parts, which is why mini PCs tend to be simple to set up and compact.",
        "A Mini-ITX build uses a 170 mm by 170 mm motherboard, a standard desktop processor and a separate power supply, usually SFX or SFX-L, in a case that is still small but larger than most mini PCs. You can choose each part, but you also take on the compatibility work: graphics card length and thickness, cooler height and cable routing.",
        "Neither is better in general. The right choice follows the workload. A mini PC suits browsing, office work, media playback and light creative work, while a small build suits gaming with a dedicated card or a workstation that needs more memory or storage than a mini PC accepts.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Mini PC versus Mini-ITX build",
      columns: ["Factor", "Mini PC", "Mini-ITX build"],
      rows: [
        ["Graphics", "Integrated, or a mobile graphics chip in some models", "Any card that fits the case length and slot thickness"],
        ["Memory", "SO-DIMM sticks or soldered; check the maximum", "Desktop memory; Mini-ITX boards often have two slots"],
        ["Storage", "One or two M.2 slots in many models", "Board M.2 slots plus drive bays, depending on the case"],
        ["Power", "External adapter, low sustained draw", "SFX or SFX-L power supply, sized for the graphics card"],
        ["Upgrade path", "Memory and storage; the processor is usually fixed", "Every part can be replaced, within clearance limits"],
        ["Setup effort", "Plug in and install the system", "Select parts, check clearances, assemble and install"],
        ["Noise", "Depends on the cooler; some are fanless", "Depends on the case, cooler and graphics card"],
      ],
    },
    {
      kind: "check-your-pc",
      heading: "What to check for each route",
      items: [
        { label: "Mini PC: memory type and ceiling", how: "On the maker's spec page, find whether memory is soldered, how many SO-DIMM slots there are and the maximum capacity listed." },
        { label: "Mini PC: display outputs", how: "Count the HDMI, DisplayPort and USB-C video ports and read the maximum resolution and refresh rate listed for each." },
        { label: "Mini PC: sustained power", how: "Look for the processor's configurable power limits and any cooling notes. A chip's headline speed only holds if the cooler can sustain it." },
        { label: "Build: case limits", how: "Take the maximum graphics card length, card thickness in slots, CPU cooler height and power supply form factor from the case maker's specification page." },
        { label: "Build: power supply", how: "Read the graphics card maker's recommended power and connector requirements and choose an SFX or SFX-L unit with the right cables." },
      ],
    },
    {
      kind: "mistakes",
      items: [
        { mistake: "Expecting a mini PC to take a desktop graphics card later.", instead: "Most do not have a PCIe slot. If a dedicated card matters, plan a Mini-ITX build from the start." },
        { mistake: "Buying a Mini-ITX case without checking card thickness.", instead: "Compare the card's slot width and length with the case's stated limits, and leave space for airflow." },
        { mistake: "Ignoring the memory ceiling.", instead: "Check the maximum capacity and whether it is dual-channel before choosing a mini PC for heavier multitasking." },
        { mistake: "Choosing an SFX power supply by wattage only.", instead: "Check connectors, cable length and the manufacturer's size for the power supply form factor." },
      ],
    },
    {
      kind: "choose-if",
      heading: "Which route suits you",
      options: [
        { choice: "A mini PC", when: ["You mainly do office work, browsing and media, and want a small, low-power system.", "You are fine with memory and storage upgrades only."] },
        { choice: "A Mini-ITX build", when: ["You want a dedicated graphics card for gaming or rendering.", "You plan to replace the graphics card or processor later."] },
      ],
    },
    {
      kind: "explanation",
      heading: "Cooling, noise and placement",
      paragraphs: [
        "Small systems have little room for airflow, so where you put them matters. A mini PC on a desk with its vents covered by a monitor stand or shelf will run hotter and louder than one with clear space around it. Check the maker's guidance on ventilation.",
        "A small build gives you more control over noise. You can choose a larger, slower fan, a low-profile cooler that fits the case and a graphics card with a cooler suited to a tight case. The cost is that you must check the clearances and the airflow direction yourself.",
        "Think about your power source and cables too. A mini PC has one small brick, while a build needs a mains cable, and a small case with an SFX power supply can have cramped cable routing that makes assembly slower.",
      ],
    },
    {
      kind: "next-steps",
      items: [
        { label: "Best compact mini PCs", href: "/guides/best-compact-mini-pc" },
        { label: "Best small-form-factor PCs", href: "/guides/best-small-form-factor-pc" },
        { label: "Best Mini-ITX cases", href: "/guides/best-mini-itx-cases" },
        { label: "Best Mini-ITX motherboards", href: "/guides/best-mini-itx-motherboards" },
      ],
    },
  ],
});

/* ───────────────────────────── 12 ───────────────────────────── */
const activation = mk({
  slug: "windows-activation-and-bitlocker-after-a-pc-upgrade",
  category: "upgrades",
  subtopic: "upgrade-guides",
  seoTitle: "Windows Activation After a PC Upgrade",
  title: "Windows Activation and BitLocker After a PC Upgrade: What to Do Before and After",
  dek: "Swapping a graphics card or memory rarely matters. Replacing the motherboard can unsettle activation and drive encryption, so prepare first.",
  metaDescription:
    "Find out which PC upgrades can affect Windows activation or trigger a BitLocker recovery prompt, and what to back up and link before replacing a motherboard.",
  teaser: "Link your licence, back up your recovery key and know which upgrades can trigger activation or encryption prompts.",
  readTime: "7 min read",
  related: ["upgrade-an-existing-pc", "how-to-clone-windows-to-a-new-ssd", "how-to-check-motherboard-bios-compatibility", "how-to-check-cpu-and-motherboard-compatibility"],
  sources: [MS],
  modules: [
    {
      kind: "key-takeaway",
      body: "Replacing a graphics card, memory or a drive does not normally affect Windows activation. Replacing the motherboard is the change most likely to, because a digital licence is identified by hardware, with the motherboard as the main part. Before a major upgrade, link your licence to your Microsoft account, save your BitLocker recovery key somewhere other than the PC, and read the manufacturer's notes on firmware and TPM changes.",
    },
    {
      kind: "explanation",
      heading: "How activation relates to your hardware",
      paragraphs: [
        "Windows 10 and 11 normally activate with a digital licence rather than a visible key. When the system activates, Microsoft's servers record a hardware profile against the licence. Small changes such as more memory, a new graphics card or a new drive usually keep the system recognised.",
        "Replacing the motherboard changes the main identifier, so Windows may report that it is no longer activated. A licence linked to your Microsoft account can often be reassigned using the activation troubleshooter. Where the licence came with a prebuilt PC, or was an OEM licence tied to the original device, the licence terms may not allow transfer, so read Microsoft's licence terms for the type of licence you hold.",
        "Check your status in Settings, System, Activation. It shows whether Windows is activated and whether the licence is linked to a Microsoft account. Make that check before you upgrade, not after.",
      ],
    },
    {
      kind: "explanation",
      heading: "Why BitLocker or Device Encryption can prompt for a key",
      paragraphs: [
        "BitLocker and Device Encryption protect the drive and normally unlock automatically using the PC's TPM, a security chip, or its firmware equivalent. If the system detects a change to the hardware or boot configuration that it does not expect, it can ask for the recovery key before it will unlock the drive.",
        "Changes that can trigger the prompt include replacing the motherboard, changing the processor on a platform where the TPM is built into the firmware, clearing the TPM, or sometimes updating the BIOS. Moving the drive to another PC will also ask for the key.",
        "Without the key you cannot unlock the drive. Check whether encryption is on in Settings, Privacy and security, Device encryption, or in Control Panel under BitLocker Drive Encryption. If it is, back up the recovery key before the upgrade.",
      ],
    },
    {
      kind: "steps",
      heading: "Before you change the motherboard or processor",
      steps: [
        { title: "Link the licence", body: "In Settings, System, Activation, sign in with a Microsoft account if the licence is not linked. A linked digital licence is easier to reactivate after a hardware change." },
        { title: "Save the BitLocker recovery key", body: "Sign in at the Microsoft account recovery key page, or use Control Panel, BitLocker Drive Encryption, Back up your recovery key. Keep a copy off the PC, for instance on a different device or printed." },
        { title: "Suspend protection if needed", body: "In BitLocker settings, choose Suspend protection before a BIOS update or a firmware change, then resume it afterwards, if the manufacturer's notes call for it." },
        { title: "Back up your data", body: "Make a backup of documents and any files you cannot replace. If you intend to move to a new drive, see our guide on cloning Windows to a new SSD." },
        { title: "Note your key and licence type", body: "If you bought a retail key or the PC has an OEM licence, note which one, because that decides whether you can reuse it on a new board." },
      ],
    },
    {
      kind: "steps",
      heading: "After the upgrade",
      steps: [
        { title: "Check activation", body: "Open Settings, System, Activation. If Windows says it is not activated, choose Troubleshoot and then 'I changed hardware on this device recently'." },
        { title: "Sign in with the same account", body: "The troubleshooter needs the Microsoft account the licence is linked to. Select the device from the list and reactivate." },
        { title: "Enter the recovery key if asked", body: "If Windows shows a blue recovery screen at boot, enter the 48-digit key you saved. After it starts, re-enable protection if you suspended it." },
        { title: "Install chipset and graphics drivers", body: "Use the board maker's chipset driver and the current graphics driver. A fresh motherboard may need updated storage and network drivers as well." },
      ],
    },
    {
      kind: "decision-table",
      heading: "Which upgrades can affect activation or encryption",
      intro: "This is general guidance. Behaviour depends on your licence type, Windows version and security settings.",
      columns: ["Change", "Activation", "BitLocker prompt"],
      rows: [
        ["Graphics card", "Normally unaffected", "Unlikely"],
        ["Memory", "Normally unaffected", "Unlikely"],
        ["New or additional drive", "Normally unaffected", "Only if you move the boot drive"],
        ["BIOS update", "Normally unaffected", "Possible, depends on firmware and settings"],
        ["Processor swap", "Usually unaffected", "Possible where the TPM is firmware-based"],
        ["Motherboard replacement", "May require reactivation", "Likely to ask for the key"],
      ],
    },
    {
      kind: "mistakes",
      items: [
        { mistake: "Starting a motherboard swap without the recovery key.", instead: "Save it to your Microsoft account or print it first. Without it, the drive may be unrecoverable." },
        { mistake: "Assuming every licence transfers.", instead: "Identify whether you have a retail, OEM or account-linked licence and read the licence terms." },
        { mistake: "Flashing the BIOS with protection still active.", instead: "Follow the manufacturer's notes and suspend BitLocker if they call for it." },
        { mistake: "Leaving the key only on the PC you are upgrading.", instead: "Store it on another device, in your Microsoft account or on paper." },
      ],
    },
    {
      kind: "explanation",
      heading: "Storage changes and clean installs",
      paragraphs: [
        "When you replace the boot drive, you can clone Windows to the new drive or install fresh. A clone keeps your applications and settings, but the new drive must be at least large enough for the used space, and activation is normally unaffected because the motherboard is unchanged.",
        "For a clean install, Windows normally reactivates automatically once it connects to the internet if the hardware is unchanged. During setup you may be asked for a product key. If you have a digital licence linked to your Microsoft account, you can skip that step and sign in later.",
        "If you are selling or giving away a drive, decrypt it or reset the PC from Settings, System, Recovery so that no recovery key or personal data stays on it.",
      ],
    },
    {
      kind: "next-steps",
      items: [
        { label: "Best 1TB NVMe SSDs", href: "/guides/best-1tb-nvme-ssd" },
        { label: "Best motherboards", href: "/guides/best-motherboards" },
        { label: "Best SSDs", href: "/guides/best-ssds" },
      ],
    },
  ],
});

const base: InformationalGuide[] = [
  hdmiVsDp,
  vrr,
  burnIn,
  portable,
  ppi,
  hdr,
  uwRes,
  scaling4k,
  prebuiltLeaves,
  firstBoot,
  miniVsSff,
  activation,
];

const deepen = (g: InformationalGuide): InformationalGuide => {
  const extra = wave1Extras[g.slug];
  if (!extra) return g;
  const last = g.modules.length - 1;
  const closing = g.modules[last]?.kind === "next-steps" ? [g.modules[last]] : [];
  return { ...g, modules: [...g.modules.slice(0, closing.length ? last : g.modules.length), ...extra, ...closing] };
};

export const monitorsBuildsWave1Guides: InformationalGuide[] = base.map(deepen);
