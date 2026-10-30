import type { GuideModule, InformationalGuide, SourceRef } from "@/lib/pc-content/types";

const AUTHOR = { name: "The PC Journal", url: "/about-the-pc-journal" };

const src = (id: string, label: string, url: string, publisher: string): SourceRef => ({
  id,
  label,
  url,
  publisher,
  kind: "reference",
});

const USB_IF = src("usb-if", "USB Implementers Forum", "https://www.usb.org", "USB-IF");
const BT_SIG = src("bt-sig", "Bluetooth Technology Overview", "https://www.bluetooth.com", "Bluetooth SIG");
const WIFI = src("wifi-alliance", "Wi-Fi Alliance", "https://www.wi-fi.org", "Wi-Fi Alliance");
const VESA = src("vesa", "VESA standards", "https://vesa.org", "VESA");
const TIA = src("tia", "Telecommunications Industry Association", "https://tiaonline.org", "TIA");
const MS = src("ms-docs", "Microsoft Learn", "https://learn.microsoft.com", "Microsoft");

const next = (items: [string, string][]): GuideModule => ({
  kind: "next-steps",
  heading: "Where to go next",
  items: items.map(([label, slug]) => ({ label, href: `/guides/${slug}` })),
});

export const peripheralsWave1Guides: InformationalGuide[] = [
  /* 1 */
  {
    slug: "mouse-polling-rate-and-dpi-explained",
    type: "guide",
    status: "published",
    category: "peripherals",
    subtopic: "mice",
    seoTitle: "Mouse Polling Rate and DPI Explained",
    title: "Mouse polling rate and DPI: what each number changes",
    dek: "Two figures dominate mouse spec sheets, and they describe different things. Here is what each one controls and when a bigger number stops helping.",
    metaDescription:
      "Learn what mouse DPI and polling rate actually do, how to convert them into a sensitivity you can compare, and when 4000 or 8000 Hz is worth the CPU cost.",
    teaser: "Work out your own effective sensitivity and decide whether a 1000 Hz or 8000 Hz mouse suits your PC and games.",
    author: AUTHOR,
    readTime: "8 min read",
    sources: [MS, USB_IF],
    related: [
      "how-to-choose-a-gaming-mouse",
      "gaming-mouse-features-explained-what-is-worth-paying-for",
      "best-low-latency-mouse",
      "best-gaming-mouse-8000hz",
      "best-wireless-mouse",
    ],
    modules: [
      {
        kind: "key-takeaway",
        body: "DPI sets how far the cursor moves for each inch you move the mouse; polling rate sets how often the mouse reports that movement to the PC. A 800 to 1600 DPI setting with a 1000 Hz polling rate covers most desks and games, so the larger figures on a box mainly matter if you already know your sensitivity or play at very high refresh rates.",
      },
      {
        kind: "explanation",
        heading: "DPI: counts per inch, not quality",
        paragraphs: [
          "DPI (dots per inch, also written CPI for counts per inch) is the number of movement counts the sensor reports for every inch the mouse travels. At 800 DPI, moving the mouse one inch sends 800 counts; at 1600 DPI it sends 1,600. The operating system and the game then turn those counts into cursor or crosshair movement.",
          "That means DPI is a sensitivity dial, not a sharpness or accuracy rating. A mouse that tops out at 16,000 DPI is not necessarily more precise than one that stops at 8,000, because almost nobody runs a sensor near its ceiling. What is worth checking is whether the sensor stays consistent across the DPI steps you actually use, which a maker's spec sheet or an independent measurement can show and a headline maximum cannot.",
          "To compare settings between mice or between games, multiply DPI by the in-game sensitivity value. A 800 DPI mouse at an in-game value of 0.5 gives the same effective sensitivity (400) as a 400 DPI mouse at 1.0, provided the game scales linearly. Many shooters publish their sensitivity formula, so look up the game rather than assuming.",
        ],
      },
      {
        kind: "explanation",
        heading: "Polling rate: how often the PC hears from the mouse",
        paragraphs: [
          "Polling rate is measured in hertz. At 125 Hz the mouse reports every 8 ms, at 500 Hz every 2 ms and at 1000 Hz every 1 ms. Faster rates shorten the gap: 2000 Hz is 0.5 ms, 4000 Hz is 0.25 ms and 8000 Hz is 0.125 ms.",
          "Going from 125 Hz to 1000 Hz is a visible change in how smooth a fast flick feels, because the cursor path is sampled far more often. Beyond 1000 Hz the gains shrink quickly. The benefit depends on the display refresh rate, the game's input handling and how fast you move, so it is a conditional upgrade rather than a universal one.",
          "Higher rates also cost something. Each report is a small interrupt for the CPU, and at 4000 or 8000 Hz that load can be noticeable in games that already push a processor hard. Wireless mice at high rates drain the battery faster, and the maker's stated battery life is usually quoted at a lower rate, so read which setting the figure refers to.",
        ],
      },
      {
        kind: "decision-table",
        heading: "Which settings suit which use",
        intro: "These are starting points to adjust, not rules. Your desk space, hand speed and monitor all move the answer.",
        columns: ["Use", "Typical DPI range", "Polling rate to look for"],
        rows: [
          ["Office work, spreadsheets, web", "800 to 1600 on a 1080p or 1440p display; higher only on 4K if the cursor feels slow", "125 to 1000 Hz; the default is fine"],
          ["Low-sensitivity shooters with a large mouse pad", "400 to 1600, tuned with in-game sensitivity", "1000 Hz as the baseline, 2000 Hz or more if you want to try it"],
          ["Fast-paced games on 240 Hz or faster displays", "800 to 1600 for most players", "1000 Hz, and 4000 to 8000 Hz only if your CPU has headroom"],
          ["Creative work and precise selection", "800 to 3200 with pointer speed lowered in Windows if needed", "1000 Hz; sensor consistency matters more"],
          ["Wireless, battery-conscious use", "800 to 1600", "500 to 1000 Hz to stretch battery life"],
        ],
      },
      {
        kind: "steps",
        heading: "Find a setting that fits you",
        intro: "Do this once and the spec sheet becomes much easier to read.",
        steps: [
          {
            title: "Start at 800 DPI",
            body: "Set the mouse to 800 DPI and leave Windows pointer speed at its default notch. In Settings, Bluetooth & devices, Mouse, check that Enhance pointer precision is off if you want movement to scale in a straight line.",
          },
          {
            title: "Judge the cursor on a real desktop",
            body: "Sweep across the full width of your screen. If you must lift and reposition the mouse several times, raise DPI a step; if small moves overshoot, lower it.",
          },
          {
            title: "Lock the DPI, then tune in the game",
            body: "Keep the mouse DPI fixed and change only the in-game sensitivity. That keeps your cursor on the desktop and your aim in a shooter consistent, and makes the effective sensitivity (DPI multiplied by in-game value) easy to record.",
          },
          {
            title: "Test polling rate last",
            body: "If your mouse offers 2000 Hz or higher, try it in the games you play. Plug the receiver or cable into a port on the motherboard's rear I/O, watch your CPU usage and keep the setting only if play feels better and frame pacing does not get worse.",
          },
        ],
      },
      {
        kind: "mistakes",
        heading: "Common mistakes",
        items: [
          { mistake: "Buying on the maximum DPI figure", instead: "Treat it as marketing and look for the sensor model, the DPI steps you will use and the polling rates the mouse supports." },
          { mistake: "Changing DPI and in-game sensitivity at the same time", instead: "Fix one and tune the other so you can tell what changed." },
          { mistake: "Plugging a high-polling mouse into a front-panel port or an unpowered hub", instead: "Use a rear motherboard port, so the USB controller and cabling are as direct as possible." },
          { mistake: "Assuming 8000 Hz is always better", instead: "Check that your CPU, game and display make use of it; at 144 Hz, 1000 Hz is already well above the frame rate." },
        ],
      },
      next([
        ["How to choose a gaming mouse", "how-to-choose-a-gaming-mouse"],
        ["Gaming mouse features worth paying for", "gaming-mouse-features-explained-what-is-worth-paying-for"],
        ["Best 8000 Hz gaming mice", "best-gaming-mouse-8000hz"],
        ["Best low-latency mice", "best-low-latency-mouse"],
      ]),
    ],
  },

  /* 2 */
  {
    slug: "wired-vs-2-4-ghz-vs-bluetooth-mice-and-keyboards",
    type: "guide",
    status: "published",
    category: "peripherals",
    subtopic: "mice",
    seoTitle: "Wired vs 2.4 GHz vs Bluetooth Peripherals",
    title: "Wired, 2.4 GHz dongle or Bluetooth: which connection for a mouse or keyboard?",
    dek: "The three connection types behave differently in the BIOS, with latency, with multiple devices and with battery life. A short guide to matching one to your desk.",
    metaDescription:
      "Compare wired, 2.4 GHz dongle and Bluetooth for PC mice and keyboards: BIOS access, latency, multi-device pairing, battery life and how to avoid interference.",
    teaser: "Decide which connection fits your setup, and which settings to check before you rely on a wireless mouse or keyboard.",
    author: AUTHOR,
    readTime: "7 min read",
    sources: [BT_SIG, USB_IF],
    related: [
      "how-to-choose-a-gaming-mouse",
      "best-wireless-mouse",
      "best-wireless-keyboard",
      "how-to-choose-a-bluetooth-adapter-for-a-pc",
      "how-to-fix-random-usb-disconnects",
    ],
    modules: [
      {
        kind: "key-takeaway",
        body: "Use a cable or a 2.4 GHz dongle for anything where timing matters, such as games, and keep Bluetooth for a second computer, a laptop or a tidy desk. A wired or dongle device also works in the BIOS, which a Bluetooth-only one often does not.",
      },
      {
        kind: "explanation",
        heading: "What each connection actually is",
        paragraphs: [
          "A wired mouse or keyboard talks to the PC over USB using the standard human interface device class. There is no battery, no pairing step and no radio, which is why it is the default for troubleshooting and for BIOS or recovery screens.",
          "A 2.4 GHz wireless device uses a small USB receiver, often called a dongle, that is paired to the device by the maker. The radio protocol is proprietary, so the mouse only works with its own receiver, but the dongle presents itself to the PC as an ordinary USB input device. Makers typically tune these links for low and steady latency, which is why gaming wireless mice use them.",
          "Bluetooth uses the PC's own Bluetooth radio, or an adapter, and the standard profile for input devices. Nothing extra is plugged in, one device can often pair with several computers and the radio is built into phones and tablets as well. The trade-off is that the connection is managed by the operating system, so the behaviour depends on your Bluetooth adapter and driver.",
        ],
      },
      {
        kind: "decision-table",
        heading: "How they compare",
        columns: ["", "Wired USB", "2.4 GHz dongle", "Bluetooth"],
        rows: [
          ["Works in BIOS and recovery", "Yes, almost always", "Usually, since it appears as a USB device; confirm on the maker's page", "Often not, until the OS loads"],
          ["Latency behaviour", "Direct, no radio", "Designed for low, steady latency", "Varies with adapter, driver and device; check the maker's stated rates"],
          ["Battery", "None needed", "Rechargeable or AA/AAA; check stated life and the polling rate it assumes", "Often the longest life, since the radio is power-frugal"],
          ["Uses a USB port", "Yes", "Yes, for the dongle", "No, if the PC already has Bluetooth"],
          ["Multiple computers", "Swap the cable", "One receiver per device unless the maker supports pairing more", "Many models store two or three pairings"],
          ["Interference", "None", "Shares the 2.4 GHz band with Wi-Fi and other devices", "Same band, with frequency hopping"],
        ],
      },
      {
        kind: "choose-if",
        heading: "Which one to pick",
        options: [
          { choice: "Wired", when: ["You play competitive games or want zero battery maintenance", "You need to enter the BIOS or recovery menus without fuss", "You use the same mouse or keyboard on one desktop every day"] },
          { choice: "2.4 GHz dongle", when: ["You want a cable-free desk but still care about latency", "Your device supports a stated polling rate you intend to use", "You have a free USB port close to the mouse or keyboard"] },
          { choice: "Bluetooth", when: ["You switch between a desktop, a laptop and a tablet", "You prefer not to use a USB port or carry a dongle", "You mainly work in documents and the web rather than fast games"] },
        ],
      },
      {
        kind: "steps",
        heading: "Setting up a wireless device so it stays reliable",
        steps: [
          { title: "Put the dongle on a short extension", body: "Plug the receiver into a USB port or a short extension cable near the mouse, on the desk surface rather than behind the case. A shorter, clearer path helps the link." },
          { title: "Keep it away from USB 3 traffic", body: "Fast USB 3 drives and hubs near the dongle can add noise in the 2.4 GHz band. If the mouse stutters, move the dongle away from them." },
          { title: "Check the Bluetooth adapter and driver", body: "Open Device Manager, find the Bluetooth radio and confirm the driver is current from the PC or motherboard maker. Different adapters can behave differently with the same mouse." },
          { title: "Read the polling and battery fine print", body: "Battery life is quoted under specific conditions. Look for the polling rate, lighting setting and connection type behind the number." },
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Buying a Bluetooth-only keyboard for a PC you may need to repair", instead: "Keep a wired keyboard or a dongle model for BIOS and recovery work." },
          { mistake: "Losing the dongle and assuming the device is dead", instead: "Check whether the maker sells a replacement receiver or supports re-pairing before you buy a new mouse." },
          { mistake: "Putting everything on a single unpowered USB hub", instead: "Connect wireless receivers to a rear motherboard port or a powered hub." },
        ],
      },
      next([
        ["Best wireless mice", "best-wireless-mouse"],
        ["Best wireless keyboards", "best-wireless-keyboard"],
        ["How to choose a Bluetooth adapter for a PC", "how-to-choose-a-bluetooth-adapter-for-a-pc"],
        ["Fixing random USB disconnects", "how-to-fix-random-usb-disconnects"],
      ]),
    ],
  },

  /* 3 */
  {
    slug: "keyboard-layouts-compared-full-size-tkl-75-65-60",
    type: "guide",
    status: "published",
    category: "peripherals",
    subtopic: "keyboards",
    seoTitle: "Keyboard Sizes: Full, TKL, 75%, 65%, 60%",
    title: "Keyboard layouts compared: full-size, TKL, 75%, 65% and 60%",
    dek: "Smaller boards free desk space and shorten the reach to the mouse, but each size removes specific keys. Here is exactly what goes missing at every step.",
    metaDescription:
      "See which keys full-size, TKL, 75%, 65% and 60% keyboards drop, how function layers work and how to pick a size for gaming, spreadsheets or a small desk.",
    teaser: "Check which keys you use daily before you pick a size, and learn how function layers replace the ones that disappear.",
    author: AUTHOR,
    readTime: "8 min read",
    sources: [MS, USB_IF],
    related: [
      "how-to-choose-a-mechanical-keyboard",
      "mechanical-keyboard-features-explained-what-is-worth-paying-for",
      "best-tkl-keyboards",
      "best-75-percent-keyboards",
      "best-65-percent-keyboards",
    ],
    modules: [
      {
        kind: "key-takeaway",
        body: "Pick the smallest layout that still has every key you press without thinking. If you type numbers all day, a full-size or a numpad on the side is the practical choice; if you mostly game or write, a TKL or 75% board gives you the space back without giving up the function row.",
      },
      {
        kind: "explanation",
        heading: "What each size removes",
        paragraphs: [
          "A full-size keyboard is typically 104 keys on an ANSI layout (105 on ISO). It has the main block, the function row, the navigation cluster of Insert, Home, Page Up, Delete, End and Page Down, the arrow keys and the number pad on the right.",
          "A tenkeyless (TKL) board, usually 87 keys, removes only the number pad. It keeps the function row, the navigation cluster and the arrows, so it is the closest step down and the one with the fewest compromises. A 75% board, roughly 80 to 84 keys depending on the model, keeps the function row and arrows but squeezes the navigation keys into a single column on the right and brings them closer to the main block.",
          "A 65% board, about 67 to 68 keys, drops the function row but keeps the arrow keys and a short column of navigation keys. A 60% board, commonly 61 keys, drops the arrows, the navigation keys and the function row as well. Those keys are not gone, since makers usually place them on a second layer reached with an Fn key, but you will press two keys instead of one.",
        ],
      },
      {
        kind: "decision-table",
        heading: "Layout at a glance",
        intro: "Key counts vary a little by maker and by ANSI or ISO, so treat the figures as approximate and check each model's product page.",
        columns: ["Layout", "Approx. keys", "Function row", "Arrow keys", "Number pad"],
        rows: [
          ["Full-size", "104 to 105", "Yes", "Yes", "Yes"],
          ["TKL (80%)", "About 87", "Yes", "Yes", "No"],
          ["75%", "About 80 to 84", "Yes, compact", "Yes", "No"],
          ["65%", "About 67 to 68", "No, on a layer", "Yes", "No"],
          ["60%", "About 61", "No, on a layer", "No, on a layer", "No"],
        ],
      },
      {
        kind: "explanation",
        heading: "Function layers and what they cost you",
        paragraphs: [
          "Compact boards rely on layers. Holding Fn changes what the main keys send, so the number row can become F1 to F12 and an I, J, K, L diamond can become arrow keys. The mapping is set by the keyboard's firmware, and many boards let you remap it with a configuration tool or open-source firmware.",
          "The cost is muscle memory and speed. Shortcuts that use function keys, such as F2 to rename or F5 to refresh, take two hands on a 60% board. If you use arrow keys with a modifier, for example Shift plus Arrow to select text, layers can make that awkward. Try a few of your regular shortcuts on a layout diagram before buying.",
          "Software can matter too. Some compact keyboards store the layer in on-board memory, so the remap works on any computer. Others rely on a desktop utility that must be running. If you use the keyboard at work or on a shared PC, check where the settings are stored.",
        ],
      },
      {
        kind: "choose-if",
        heading: "Choose by how you use the desk",
        options: [
          { choice: "Full-size", when: ["You enter numbers or use a numeric keypad for accounting or data work", "Your desk is wide enough that the keyboard does not push the mouse away", "You want every dedicated key without layers"] },
          { choice: "TKL", when: ["You want your mouse closer for low-sensitivity play", "You rarely use the number pad but still use Home, End and Page keys", "You want the least compromise from a smaller board"] },
          { choice: "75%", when: ["You want a compact board but still need F1 to F12 on their own row", "You like a dedicated arrow cluster", "You can live with a column of tightly spaced navigation keys"] },
          { choice: "65% or 60%", when: ["You write, code or game and rarely touch function keys", "Your desk is small or you carry the keyboard", "You are comfortable learning a layer for the missing keys"] },
        ],
      },
      {
        kind: "mistakes",
        heading: "Common mistakes",
        items: [
          { mistake: "Buying a 60% board for spreadsheet work", instead: "Count how many times a day you type digits or navigate with arrows; if it is often, step up to a 75% or TKL, or add a separate number pad." },
          { mistake: "Assuming compact means the same key spacing", instead: "Check the layout image. Some 75% boards squeeze the right-hand column and move the arrows, which can cause stray presses." },
          { mistake: "Ignoring ISO versus ANSI", instead: "Confirm the Enter key shape and the left-hand Shift length match what you are used to, and that keycaps are available for it." },
        ],
      },
      next([
        ["Best TKL keyboards", "best-tkl-keyboards"],
        ["Best 75% keyboards", "best-75-percent-keyboards"],
        ["Best 65% keyboards", "best-65-percent-keyboards"],
        ["How to choose a mechanical keyboard", "how-to-choose-a-mechanical-keyboard"],
      ]),
    ],
  },

  /* 4 */
  {
    slug: "usb-vs-xlr-microphones",
    type: "guide",
    status: "published",
    category: "peripherals",
    subtopic: "microphones",
    seoTitle: "USB vs XLR Microphones for PC",
    title: "USB vs XLR microphones: what each needs and what each gives you",
    dek: "One plugs into the PC and works; the other needs extra hardware but can grow with your setup. A guide to the hardware, the cost and who each one suits.",
    metaDescription:
      "Compare USB and XLR microphones for PC: what extra gear XLR needs, what phantom power is, how gain works and which fits streaming, calls or recording.",
    teaser: "Work out whether an interface and phantom power are worth it, or whether a USB mic already covers what you record.",
    author: AUTHOR,
    readTime: "8 min read",
    sources: [USB_IF, MS],
    related: [
      "how-to-choose-a-usb-microphone-for-your-pc",
      "usb-microphone-features-explained-what-is-worth-paying-for",
      "best-usb-microphones",
      "best-xlr-microphones",
      "how-to-plan-a-streaming-pc",
    ],
    modules: [
      {
        kind: "key-takeaway",
        body: "A USB microphone has the preamp and analog-to-digital converter built in, so it plugs into the PC and records. An XLR microphone is analog and needs an audio interface or mixer, which costs more and takes more space but lets you change mics, add more voices and upgrade parts one at a time.",
      },
      {
        kind: "explanation",
        heading: "What is inside each type",
        paragraphs: [
          "A USB microphone contains the capsule that picks up sound, a small preamp that boosts the signal and a converter that turns it into digital audio. The PC sees it as an audio device and Windows routes it like any other input. You usually adjust input level in Windows or in the maker's software, and some models add a headphone jack for zero-latency monitoring.",
          "An XLR microphone outputs a balanced analog signal over a three-pin XLR cable. That signal is very small, so it needs a preamp, which you get in an audio interface, a mixer or a similar device. The interface also converts the signal to digital and connects to the PC, often by USB.",
          "Two terms are worth knowing. Phantom power is a 48 volt supply sent down the XLR cable that condenser microphones need; most dynamic microphones do not use it. Gain is the amount of boost the preamp applies, and a dynamic mic generally needs more of it than a condenser, so check that an interface offers enough clean gain for the mic you want.",
        ],
      },
      {
        kind: "decision-table",
        heading: "Side by side",
        columns: ["", "USB microphone", "XLR microphone"],
        rows: [
          ["Extra hardware", "None, apart from a stand or arm", "Audio interface or mixer, plus an XLR cable"],
          ["Setup", "Plug in and select it in Windows", "Connect cable, set gain, enable phantom power if the mic is a condenser"],
          ["Upgrade path", "Replace the whole microphone", "Change the mic, interface or cable separately"],
          ["Multiple voices", "One USB mic per person, handled in software", "Several inputs on one interface, depending on the model"],
          ["Cost to start", "One purchase", "At least two purchases, often more"],
          ["Desk footprint", "Small", "A mic, an arm and an interface box"],
        ],
      },
      {
        kind: "choose-if",
        heading: "Which one fits",
        options: [
          { choice: "USB", when: ["You mainly use calls, meetings, voice chat or light streaming", "You want one purchase and no extra box on the desk", "You do not plan to record several people at once"] },
          { choice: "XLR", when: ["You plan to add a second microphone or a guest", "You want to swap the mic later without replacing the preamp", "You are building a setup that will grow with a mixer or other audio gear"] },
          { choice: "A hybrid mic with USB and XLR outputs", when: ["You want to start on USB and move to an interface later", "You are not sure how your setup will develop", "Check that the maker states both outputs and which features work on each one"] },
        ],
      },
      {
        kind: "steps",
        heading: "Getting a clean signal either way",
        steps: [
          { title: "Choose the room before the mic", body: "Echo and keyboard noise reach the microphone before any hardware can help. A softer room, a closer mic and a pop filter often matter more than price." },
          { title: "Set the polar pattern deliberately", body: "Cardioid picks up mainly what is in front. Omnidirectional and bidirectional patterns suit shared recording but pick up more of the room. Check which patterns your mic offers." },
          { title: "Set gain with your speaking voice", body: "Speak at your normal volume and set the input so peaks stay below clipping. Raising gain too far adds noise as well as volume." },
          { title: "Use headphones to monitor", body: "Monitor through headphones to avoid feedback with speakers, and use the mic's direct monitoring where it is offered." },
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Buying a condenser XLR mic without checking phantom power on the interface", instead: "Confirm the interface lists 48V phantom power before you order the mic." },
          { mistake: "Choosing XLR for a single-voice call setup out of habit", instead: "A USB mic avoids the extra cost and the interface learning curve." },
          { mistake: "Judging a mic only on its spec sheet", instead: "Check its polar patterns, how it connects and how its gain, headphone jack and mute control work." },
        ],
      },
      next([
        ["Best USB microphones", "best-usb-microphones"],
        ["Best XLR microphones", "best-xlr-microphones"],
        ["How to choose a USB microphone", "how-to-choose-a-usb-microphone-for-your-pc"],
        ["Planning a streaming PC", "how-to-plan-a-streaming-pc"],
      ]),
    ],
  },

  /* 5 */
  {
    slug: "headset-connection-types-for-pc-ps5-and-xbox",
    type: "guide",
    status: "published",
    category: "peripherals",
    subtopic: "headsets",
    seoTitle: "Headset Connections for PC, PS5 and Xbox",
    title: "Headset connection types for PC, PS5 and Xbox",
    dek: "3.5 mm, USB, a 2.4 GHz dongle and Bluetooth each work differently across a PC and the two consoles. Read this before you buy a headset for more than one.",
    metaDescription:
      "Learn how 3.5 mm, USB, 2.4 GHz and Bluetooth headsets connect to a PC, PS5 and Xbox, what a TRRS jack and a splitter do, and what to check before buying.",
    teaser: "Check the connection type, the jack wiring and the platform listing so one headset works on the devices you own.",
    author: AUTHOR,
    readTime: "8 min read",
    sources: [BT_SIG, USB_IF, MS],
    related: [
      "how-to-choose-a-pc-headset",
      "pc-headset-features-explained-what-is-worth-paying-for",
      "best-headsets-for-pc",
      "best-bluetooth-headsets",
      "best-headsets-for-calls",
    ],
    modules: [
      {
        kind: "key-takeaway",
        body: "A headset with a 3.5 mm plug is the most widely compatible choice, but a PC may need a splitter or a combined jack, and a console takes it through the controller. USB and 2.4 GHz models are easy on a PC but are tied to the platform the maker lists, and consoles are the most restrictive, so read the platform line on the product page.",
      },
      {
        kind: "explanation",
        heading: "The four connections",
        paragraphs: [
          "A 3.5 mm analog headset has no electronics beyond the speakers and mic. The sound card or motherboard audio does the conversion. That is why it works almost anywhere, from a PC to a console controller to a phone, as long as the plug wiring matches the socket.",
          "A USB headset has its own small sound card and mic converter inside the cable. The PC treats it as a separate audio device, which bypasses the motherboard's audio. It tends to be simple to use on a desktop and often includes volume and mute controls that talk to Windows or to a maker's app.",
          "A 2.4 GHz wireless headset uses a dongle, usually USB, to talk to the headset on a proprietary radio link. Many models are built for one platform and may not work on another, so confirm the dongle supports the device you want. Bluetooth headsets pair directly to a phone, tablet or PC, but they carry a delay that can make games and video feel off, and the mic quality can drop when the headset switches to a call profile.",
        ],
      },
      {
        kind: "explanation",
        heading: "TRS, TRRS and why a PC jack can be confusing",
        paragraphs: [
          "A plug with two black rings (TRRS) carries left audio, right audio, ground and a microphone on one connector. A plug with one ring (TRS) carries only audio. Many phones, consoles and laptops use a single combined socket that expects TRRS.",
          "Most desktop PCs still have two separate sockets, a green one for headphones and a pink one for a microphone. A single-plug headset needs a splitter that turns one TRRS plug into two TRS plugs, one for each socket. Some TRRS wiring standards also differ in which contact carries the mic and the ground, so a headset and a splitter should be listed for the same PC use.",
          "If the PC has a front-panel combined jack, check the motherboard or case manual to see which wiring it expects. A USB headset avoids the wiring question entirely.",
        ],
      },
      {
        kind: "decision-table",
        heading: "What usually works where",
        intro: "Console support changes over time and by model, so use this table to know what to look for, then confirm on the maker's compatibility page.",
        columns: ["Connection", "PC", "PS5", "Xbox Series X|S"],
        rows: [
          ["3.5 mm single TRRS plug", "Needs a combined jack or a splitter", "Plugs into the DualSense controller", "Plugs into the controller's 3.5 mm port"],
          ["USB wired", "Works with most PCs", "Many models work; check the maker's list", "Usually limited; check the maker's list before buying"],
          ["2.4 GHz dongle", "Works if the dongle is listed for PC", "Only if the dongle is listed for PS5", "Only if listed for Xbox; Xbox models often use a console-specific radio"],
          ["Bluetooth", "Works with a Bluetooth adapter", "Not generally supported for audio; check the console's current settings", "Not generally supported for audio"],
        ],
      },
      {
        kind: "check-your-pc",
        heading: "Before you buy",
        items: [
          { label: "Jack type on your PC", how: "Look at the rear panel for green and pink sockets, or the case's front panel for one combined headset socket." },
          { label: "Platform line on the product page", how: "Find the exact consoles and operating systems the maker lists for the headset and dongle." },
          { label: "Mic and chat support", how: "Check that the mic works on the platform. Some headsets deliver game audio on a console but not voice chat." },
          { label: "Charging and cable length", how: "Wireless headsets usually charge over USB-C. A wired headset needs a cable that reaches the controller or the case." },
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Plugging a single-plug headset into a pink mic jack", instead: "Use a splitter or choose a USB headset, because one socket cannot carry both mic and audio from a TRRS plug." },
          { mistake: "Assuming a USB dongle works on any console", instead: "Check the maker's compatibility page for your exact console; support is decided per model." },
          { mistake: "Using Bluetooth for competitive play", instead: "Choose a wired or 2.4 GHz model, where the maker states a low and steady delay." },
        ],
      },
      next([
        ["How to choose a PC headset", "how-to-choose-a-pc-headset"],
        ["Best headsets for PC", "best-headsets-for-pc"],
        ["Best Bluetooth headsets", "best-bluetooth-headsets"],
        ["Best headsets for calls", "best-headsets-for-calls"],
      ]),
    ],
  },

  /* 6 */
  {
    slug: "usb-speed-names-for-external-ssds-decoded",
    type: "guide",
    status: "published",
    category: "peripherals",
    subtopic: "external-storage",
    seoTitle: "USB 3.2, USB4 and Thunderbolt Speeds",
    title: "USB speed names decoded for external SSDs: USB 3.2 Gen 2, USB4 and Thunderbolt",
    dek: "The same USB-C plug can carry 480 Mbps or 40 Gbps. Learn the names, the real speed behind each and how to check your port and cable.",
    metaDescription:
      "Decode USB 3.2 Gen 1, Gen 2, Gen 2x2, USB4 and Thunderbolt speeds for external SSDs, and and check your port and cable so you get the speed you paid for.",
    teaser: "Match a portable SSD to a port and cable that can actually deliver its speed, and know which names mean the same thing.",
    author: AUTHOR,
    readTime: "9 min read",
    sources: [USB_IF, MS],
    related: [
      "nvme-vs-sata-ssd",
      "how-to-install-and-set-up-a-external-ssd",
      "best-external-ssd",
      "best-nvme-portable-ssds",
      "how-to-fix-random-usb-disconnects",
    ],
    modules: [
      {
        kind: "key-takeaway",
        body: "The speed of an external SSD is set by the slowest of three things: the drive, the port and the cable. USB 3.2 Gen 1 is 5 Gbps, Gen 2 is 10 Gbps, Gen 2x2 is 20 Gbps, USB4 is 20 or 40 Gbps and Thunderbolt 3 and 4 are 40 Gbps, so a USB-C plug alone tells you nothing about speed.",
      },
      {
        kind: "explanation",
        heading: "The names, in plain terms",
        paragraphs: [
          "USB naming was relabelled several times. What was once called USB 3.0 is now USB 3.2 Gen 1 and runs at 5 Gbps. What was USB 3.1 Gen 2 is now USB 3.2 Gen 2 at 10 Gbps. USB 3.2 Gen 2x2 uses two lanes to reach 20 Gbps, but it is less common on PCs and needs both the port and the drive to support it. USB 2.0 is still found on some ports at 480 Mbps.",
          "USB4 is built on the Thunderbolt 3 protocol and runs at 20 Gbps or 40 Gbps depending on the port. Thunderbolt 3 and Thunderbolt 4 are 40 Gbps, with Thunderbolt 4 setting a higher minimum set of features. A newer generation of USB4 and Thunderbolt reaches 80 Gbps, but those ports are only on recent hardware and the matching SSDs are rare.",
          "Gbps are bits, not bytes. Divide by eight to estimate megabytes per second and then subtract overhead. A 5 Gbps link tops out near 500 MB/s in practice, a 10 Gbps link near 1,000 MB/s and a 20 or 40 Gbps link is faster still, if the SSD can use it.",
        ],
      },
      {
        kind: "decision-table",
        heading: "Quick reference",
        intro: "Figures are the link speeds in the standards. Real-world file copies are lower because of protocol overhead, the SSD controller and the files themselves.",
        columns: ["Name", "Link speed", "Practical ceiling", "What it suits"],
        rows: [
          ["USB 2.0", "480 Mbps", "About 40 MB/s", "Mice, keyboards; too slow for an SSD"],
          ["USB 3.2 Gen 1 (old USB 3.0)", "5 Gbps", "Around 400 to 450 MB/s", "Hard drives, entry-level portable SSDs"],
          ["USB 3.2 Gen 2", "10 Gbps", "Up to about 1,000 MB/s", "Most portable NVMe SSDs"],
          ["USB 3.2 Gen 2x2", "20 Gbps", "Up to about 2,000 MB/s", "Faster NVMe SSDs, on supported ports"],
          ["USB4 (20 or 40 Gbps)", "20 or 40 Gbps", "Depends on the port and SSD", "High-speed SSDs, docks"],
          ["Thunderbolt 3 / 4", "40 Gbps", "Depends on the SSD", "Fast NVMe SSDs and docks"],
        ],
      },
      {
        kind: "steps",
        heading: "Check what you actually have",
        steps: [
          { title: "Read the port label or the manual", body: "Look at your motherboard or laptop manual for the exact speed of each USB-C and USB-A port. A lightning-bolt symbol often means Thunderbolt, and an SS with 5, 10 or 20 marks the speed, but not every maker labels ports." },
          { title: "Check the cable", body: "A charging cable can be limited to USB 2.0 speed. Use the cable that came with the SSD, or one rated for the speed you want. For 40 Gbps, look for a cable that says it supports 40 Gbps, and keep it short." },
          { title: "Check what the drive is rated for", body: "The product page should give the interface speed and, if given, sequential read and write. Make sure the stated speed is on the same interface you will use." },
          { title: "Run a real copy", body: "Copy a large file and watch the transfer rate in Windows. If it sits near 400 MB/s, the link is probably running at 5 Gbps, so check the port and the cable." },
        ],
      },
      {
        kind: "compatibility",
        heading: "Compatibility notes",
        notes: [
          "The USB-C connector is only a shape. It can carry USB 2.0, USB 3.2 at 5, 10 or 20 Gbps, USB4 and Thunderbolt, so identify the speed from the port's specification, not from the plug.",
          "USB4 and Thunderbolt drives generally fall back to slower speeds on older ports, but a drive that needs a Thunderbolt-only feature may not work at all, so confirm the maker's compatibility notes.",
          "SATA SSDs inside a portable enclosure are limited by SATA at roughly 550 MB/s, so a 20 Gbps port will not make them faster.",
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Paying for a 20 Gbps drive and using a 5 Gbps port", instead: "Match the SSD to the fastest port you actually have, or buy the cheaper 10 Gbps model." },
          { mistake: "Using the phone charging cable", instead: "Use the cable in the box, or a cable marked for the right speed." },
          { mistake: "Reading Gbps as MB/s", instead: "Divide by eight, then allow for overhead." },
        ],
      },
      next([
        ["Best external SSDs", "best-external-ssd"],
        ["Best NVMe portable SSDs", "best-nvme-portable-ssds"],
        ["NVMe vs SATA SSD", "nvme-vs-sata-ssd"],
        ["Installing and setting up an external SSD", "how-to-install-and-set-up-a-external-ssd"],
      ]),
    ],
  },

  /* 7 */
  {
    slug: "portable-ssd-vs-external-hard-drive",
    type: "guide",
    status: "published",
    category: "peripherals",
    subtopic: "external-storage",
    seoTitle: "Portable SSD vs External Hard Drive",
    title: "Portable SSD vs external hard drive: which one for backups, games and carrying files",
    dek: "An external hard drive gives more space for the money; a portable SSD gives speed and shock tolerance. Here is how to decide based on what you put on the drive.",
    metaDescription:
      "Compare a portable SSD and an external hard drive for backups, game libraries and travel: speed, capacity, durability, power draw and when to use each.",
    teaser: "Decide whether bulk backup capacity or fast, shock-tolerant storage is the better fit for how you use an external drive.",
    author: AUTHOR,
    readTime: "7 min read",
    sources: [USB_IF],
    related: [
      "nvme-vs-sata-ssd",
      "how-to-install-and-set-up-a-external-ssd",
      "best-external-ssd",
      "best-external-hard-drive",
    ],
    modules: [
      {
        kind: "key-takeaway",
        body: "Use an external hard drive when you need a lot of space for backups and archives at the lowest cost per terabyte, and a portable SSD when you will open files from it, carry it around or run games or projects off it. For anything you cannot afford to lose, one drive is not a backup in either case.",
      },
      {
        kind: "explanation",
        heading: "What changes between the two",
        paragraphs: [
          "An external hard drive stores data on spinning platters read by a moving head. Because of that, access is slower, especially for lots of small files, and the drive is more sensitive to knocks while it is running. In exchange, large capacities cost less per terabyte, so it is the usual choice for archives and full-system backups.",
          "A portable SSD uses flash memory with no moving parts. It starts instantly, handles many small files well and tolerates movement better, which suits a drive you slip into a bag. It costs more per terabyte, and the available capacities at a given budget are usually lower.",
          "Both connect by USB, and the interface speed sets the ceiling. A hard drive will not use more than a 5 Gbps link, while an SSD can use a faster port, so check the port and cable if you want the speed you paid for. The related guide on USB speed names explains how.",
        ],
      },
      {
        kind: "decision-table",
        heading: "Side by side",
        columns: ["", "Portable SSD", "External hard drive"],
        rows: [
          ["Speed", "Much faster for large and small files; limited by the USB link", "Slower, especially with many small files"],
          ["Cost per terabyte", "Higher", "Lower"],
          ["Capacity options", "Commonly 500 GB to a few TB", "Often available in larger sizes"],
          ["Shock and vibration", "No moving parts, so it handles movement better", "More sensitive while running"],
          ["Noise", "Silent", "Audible spinning and seeking"],
          ["Power", "Usually bus-powered with low draw", "Many 2.5-inch models are bus-powered; some larger 3.5-inch drives need a wall adapter"],
        ],
      },
      {
        kind: "choose-if",
        heading: "Which one fits",
        options: [
          { choice: "Portable SSD", when: ["You edit video or photos directly from the drive", "You carry the drive between computers", "You want to run a game library or a project that loads a lot of small files"] },
          { choice: "External hard drive", when: ["You store backups, archives or media you rarely open", "You need many terabytes without a large budget", "The drive sits on a desk and is not moved while running"] },
          { choice: "Both", when: ["You want a fast drive for current work and a larger one for a second copy", "You follow a backup plan with more than one copy and at least one stored elsewhere"] },
        ],
      },
      {
        kind: "steps",
        heading: "Set up a backup that does not rely on one drive",
        steps: [
          { title: "Keep a second copy", body: "A common rule is three copies on two kinds of media with one off-site. Even a single extra copy on a different drive reduces the risk of one failure wiping out your files." },
          { title: "Label and date it", body: "Write what the drive holds and when it was last updated, so you know which copy is current." },
          { title: "Eject before unplugging", body: "Use Safely Remove Hardware in Windows. Pulling the cable mid-write can corrupt files on both types of drive." },
          { title: "Check the files occasionally", body: "Open a few files from the backup. A copy you have never opened may not be the copy you think it is." },
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Treating one external drive as a backup of your only copy", instead: "Make sure the files exist in at least two places." },
          { mistake: "Buying a hard drive for a game library or video editing", instead: "Use an SSD where load times and scrubbing speed matter." },
          { mistake: "Moving a running hard drive", instead: "Let it spin down or eject it first." },
        ],
      },
      next([
        ["Best external SSDs", "best-external-ssd"],
        ["Best external hard drives", "best-external-hard-drive"],
        ["NVMe vs SATA SSD", "nvme-vs-sata-ssd"],
        ["Setting up an external SSD", "how-to-install-and-set-up-a-external-ssd"],
      ]),
    ],
  },

  /* 8 */
  {
    slug: "how-to-size-an-office-chair-to-your-height-and-desk",
    type: "guide",
    status: "published",
    category: "peripherals",
    subtopic: "desk-setup",
    seoTitle: "How to Size an Office Chair to Your Desk",
    title: "How to size an office chair to your height and your desk",
    dek: "A chair that fits is a matter of measurements: seat height range, seat depth, armrest height and weight rating. Here is how to take them before you order.",
    metaDescription:
      "Measure seat height, seat depth, desk clearance and weight rating before you buy an office chair, so it adjusts to fit you and slides under your desk.",
    teaser: "Take four measurements and compare them with a chair's stated seat height range, seat depth, armrest travel and weight rating.",
    author: AUTHOR,
    readTime: "7 min read",
    related: [
      "best-office-chairs",
      "best-desk-chairs",
      "best-mesh-chairs",
      "best-gaming-chairs",
      "best-monitor-arm",
    ],
    modules: [
      {
        kind: "key-takeaway",
        body: "Measure first, then check the chair's stated adjustment ranges against those numbers. The four that decide fit are the seat height range, the seat depth, the armrest height range and the weight rating, and your desk height decides how high you need to sit and whether the armrests can slide underneath.",
      },
      {
        kind: "explanation",
        heading: "Seat height and your desk",
        paragraphs: [
          "Start with the desk, since the chair has to match it. Measure from the floor to the underside of the desktop for knee clearance, and to the top of the desktop for the working surface. Many standard desks are around 29 to 30 inches (73 to 76 cm) high, but that varies, so measure yours.",
          "Then measure from the floor to the back of your knee while wearing the shoes you normally wear. A seat height range that includes that number lets you rest your feet flat on the floor with your knees roughly level with your hips. Compare it with the maker's stated range, which is usually given as the lowest and highest seat height.",
          "If the chair's lowest seat height is still higher than your measurement, you will need a footrest. If the highest setting is too low to reach the desk surface at a comfortable arm angle, consider a taller chair, a higher desk or an adjustable-height desk.",
        ],
      },
      {
        kind: "explanation",
        heading: "Seat depth, armrests and the back",
        paragraphs: [
          "Seat depth is the distance from the back of the seat to the front edge. A common guide is to leave a gap of a few finger widths between the front edge and the back of your knees when your back touches the backrest. Some chairs have a seat slide, which moves the cushion forward or back and helps people who are shorter or taller than average.",
          "Armrests should let your forearms rest while your shoulders stay relaxed and your elbows are near a right angle at the keyboard. Look for a height range, and check whether the arms can pivot or slide so they fit under the desk edge. A chair with fixed, wide arms may not roll in close.",
          "For the back, check the stated backrest height, the range of any adjustable lumbar support and the recline options. The figures are a way to compare shapes, and the best check is whether the chair adjusts to the position you want.",
        ],
      },
      {
        kind: "check-your-pc",
        heading: "Measurements to take",
        intro: "Use a tape measure and write the numbers down. Compare them with the chair's specifications.",
        items: [
          { label: "Floor to desk top", how: "Measure to the surface where your hands and keyboard sit. This sets the target elbow height." },
          { label: "Floor to underside of desk", how: "Measure to the lowest point of the desk frame or drawer so the armrests and your legs can fit." },
          { label: "Floor to back of knee", how: "Measure while seated with your feet flat. Compare with the chair's lowest and highest seat heights." },
          { label: "Seat depth fit", how: "Sit back and check the gap between the seat edge and the back of the knee. Compare with the chair's stated seat depth." },
          { label: "Your weight against the rating", how: "Check the maker's stated weight capacity and that the gas lift is listed for it." },
        ],
      },
      {
        kind: "choose-if",
        heading: "Chair types by situation",
        options: [
          { choice: "A mesh task chair", when: ["Your room runs warm", "You want a wide range of adjustments", "You sit for long stretches and want the seat to adapt to you"] },
          { choice: "A larger or high-capacity chair", when: ["Your weight or height is near the upper end of standard chairs", "Check the stated weight rating and seat width", "Look for a tested gas lift and a wide seat"] },
          { choice: "A gaming-style chair", when: ["You like a high back and bolstered shape", "Check that the seat height and armrest ranges still match your measurements", "Look at the stated adjustments rather than the styling"] },
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Buying by looks and reading the adjustment ranges later", instead: "Check the seat height range, seat depth and armrest range first." },
          { mistake: "Ignoring the desk height", instead: "If the desk is fixed and high, a chair with a higher maximum seat height and a footrest may be needed." },
          { mistake: "Assuming an adjustable lumbar support fixes a poor fit", instead: "Treat it as one adjustment among several, and consider talking to a clinician or an ergonomics professional if you have a particular concern." },
        ],
      },
      next([
        ["Best office chairs", "best-office-chairs"],
        ["Best mesh chairs", "best-mesh-chairs"],
        ["Best desk chairs", "best-desk-chairs"],
        ["Best gaming chairs", "best-gaming-chairs"],
      ]),
    ],
  },

  /* 9 */
  {
    slug: "how-to-choose-a-monitor-arm-vesa-weight-and-desk-clamps",
    type: "guide",
    status: "published",
    category: "peripherals",
    subtopic: "desk-setup",
    seoTitle: "Monitor Arm Guide: VESA, Weight and Clamps",
    title: "How to choose a monitor arm: VESA pattern, weight range and desk clamps",
    dek: "A monitor arm only works if your monitor's mounting holes, its weight and your desk edge all fit. This guide takes you through each check.",
    metaDescription:
      "Check VESA mounting patterns, the weight range of a gas-spring arm, desk thickness and clamp type before you buy a monitor arm for a PC desk.",
    teaser: "Confirm your monitor's VESA holes, weight and size against an arm, and check your desk can take a clamp or a grommet mount.",
    author: AUTHOR,
    readTime: "7 min read",
    sources: [VESA],
    related: [
      "best-monitor-arm",
      "best-monitor-arms",
      "how-to-set-up-dual-monitors",
      "24-vs-27-vs-32-inch-monitor",
      "best-desk-chairs",
    ],
    modules: [
      {
        kind: "key-takeaway",
        body: "Match three things: the VESA hole pattern on the back of the monitor (commonly 75 x 75 mm or 100 x 100 mm), the arm's stated weight range, and a desk edge that suits the clamp or grommet mount. If any of them does not fit, the arm will not hold the monitor safely.",
      },
      {
        kind: "explanation",
        heading: "VESA mounts and what they mean",
        paragraphs: [
          "VESA is the standard for the pattern of screw holes on the back of a monitor. The pattern is given as the distance between holes in millimetres, such as 75 x 75 or 100 x 100. Most desktop monitors that support mounting use one of those two, and larger or older screens may use others.",
          "Check the monitor's manual or specification page for a VESA mount line. Some monitors have no VESA holes at all, and some hide them behind a cover or a recessed back panel that needs an adapter or longer screws. Curved and ultrawide monitors can have a pattern that matches the standard but a weight or a curve that limits which arms are suitable.",
          "Also read the arm's page for the supported pattern. An arm that lists only 100 x 100 does not mount a 75 x 75 monitor without a plate, and the plate's own rating should cover the load.",
        ],
      },
      {
        kind: "explanation",
        heading: "Weight range, arm type and your desk",
        paragraphs: [
          "Gas-spring arms balance the monitor's weight with a spring and let you move the screen with one hand. They work only within a stated weight range per arm, so compare it with the monitor's weight with the stand removed. If the monitor is lighter than the minimum, it can drift upward; if it is heavier than the maximum, the arm may sag.",
          "Static arms have no spring and hold a position once set. They tend to suit lighter monitors or users who adjust rarely. Dual arms hold two monitors on one pole or on two separate arms, and the weight range applies to each screen. Check the maximum screen size in inches as well as the weight, especially for ultrawide models.",
          "Then look at the desk. A clamp grips the desk edge and works with the stated thickness range, while a grommet mount passes through a hole in the desk. Glass tops, hollow or thin desks, and edges with a lip or a rail can make a clamp unsuitable, so check the maker's clearance diagram.",
        ],
      },
      {
        kind: "check-your-pc",
        heading: "What to look up first",
        items: [
          { label: "VESA pattern", how: "Find it in the monitor manual or specification page. Check whether the holes are accessible or recessed." },
          { label: "Monitor weight without stand", how: "Look for the listed weight without the stand, as the arm carries the panel only." },
          { label: "Screen size and shape", how: "Check the arm's maximum diagonal and whether it lists curved or ultrawide screens." },
          { label: "Desk edge and thickness", how: "Measure thickness at the mounting spot and note any lip, drawer or back rail." },
          { label: "Cable and port access", how: "Make sure the arm's position still lets you reach the ports and that cables have slack." },
        ],
      },
      {
        kind: "steps",
        heading: "Installing an arm",
        steps: [
          { title: "Mount the base first", body: "Attach the clamp or grommet and tighten it according to the manual. Test it with a light tug before you hang the screen." },
          { title: "Fit the VESA plate", body: "Attach the plate to the monitor with the supplied screws, using spacers if the back is recessed. Do not substitute longer screws without checking the depth." },
          { title: "Hang and set the tension", body: "With a helper if the monitor is large, mount the monitor and adjust the tension so it stays put at the height you want." },
          { title: "Route the cables", body: "Leave enough slack for the full range of movement and secure the cables along the arm." },
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Using the monitor's weight with the stand included", instead: "Use the listed weight without the stand." },
          { mistake: "Clamping to a thin or hollow desk", instead: "Check thickness and the desk's construction, and consider a grommet mount or a support plate." },
          { mistake: "Forgetting the VESA pattern", instead: "Verify the pattern first, and use an adapter only if the arm's maker allows it." },
        ],
      },
      next([
        ["Best monitor arms", "best-monitor-arms"],
        ["Best single monitor arm", "best-monitor-arm"],
        ["How to set up dual monitors", "how-to-set-up-dual-monitors"],
        ["24 vs 27 vs 32 inch monitors", "24-vs-27-vs-32-inch-monitor"],
      ]),
    ],
  },

  /* 10 */
  {
    slug: "wi-fi-6-vs-wi-fi-6e-vs-wi-fi-7-for-pc",
    type: "guide",
    status: "published",
    category: "peripherals",
    subtopic: "networking",
    seoTitle: "Wi-Fi 6 vs Wi-Fi 6E vs Wi-Fi 7 for PC",
    title: "Wi-Fi 6 vs Wi-Fi 6E vs Wi-Fi 7: what a PC owner needs to know",
    dek: "Each generation adds something specific: a new band, wider channels or the ability to use two bands at once. Here is what changes and what your router and PC both need.",
    metaDescription:
      "Compare Wi-Fi 6, Wi-Fi 6E and Wi-Fi 7 for a desktop PC: bands, channel width, router and adapter requirements, and when a cable is still the better choice.",
    teaser: "Check the router, the PC's adapter and the driver before you pay for a newer Wi-Fi generation.",
    author: AUTHOR,
    readTime: "8 min read",
    sources: [WIFI, MS],
    related: [
      "how-to-choose-a-pcie-wi-fi-card",
      "how-to-choose-a-usb-wi-fi-adapter",
      "how-to-choose-a-gaming-router",
      "how-to-choose-a-mesh-wi-fi-system",
      "how-to-fix-wi-fi-drops-on-a-pc",
    ],
    modules: [
      {
        kind: "key-takeaway",
        body: "Wi-Fi 6 (802.11ax) works on the 2.4 and 5 GHz bands, Wi-Fi 6E adds the 6 GHz band, and Wi-Fi 7 (802.11be) adds wider 320 MHz channels in 6 GHz and multi-link operation. You see the benefit only when both the router and the PC adapter support the generation, and your internet plan and walls limit the result.",
      },
      {
        kind: "explanation",
        heading: "What each generation changes",
        paragraphs: [
          "Wi-Fi 5 (802.11ac) works on 5 GHz. Wi-Fi 6 (802.11ax) brought OFDMA, which lets a router serve several devices in one transmission, and 1024-QAM, which carries more data per signal. It runs on 2.4 and 5 GHz, so it improves how a busy home network shares airtime rather than adding a new band.",
          "Wi-Fi 6E is Wi-Fi 6 with access to the 6 GHz band. That band is less crowded and has more room for wide channels, and it is used only by devices that support it. It does not reach as far through walls as 2.4 GHz, so distance matters more.",
          "Wi-Fi 7 adds 4096-QAM, channels up to 320 MHz in the 6 GHz band and multi-link operation, where a device uses more than one band or channel at the same time. These features need a Wi-Fi 7 router and a Wi-Fi 7 adapter, and the benefit depends on signal quality and on your internet speed.",
        ],
      },
      {
        kind: "decision-table",
        heading: "At a glance",
        columns: ["", "Wi-Fi 6", "Wi-Fi 6E", "Wi-Fi 7"],
        rows: [
          ["Standard", "802.11ax", "802.11ax with 6 GHz", "802.11be"],
          ["Bands", "2.4 and 5 GHz", "2.4, 5 and 6 GHz", "2.4, 5 and 6 GHz"],
          ["Widest channel", "160 MHz", "160 MHz", "320 MHz in 6 GHz"],
          ["Notable features", "OFDMA, 1024-QAM", "Adds the 6 GHz band", "4096-QAM, multi-link operation"],
          ["Needs on the PC", "Wi-Fi 6 adapter and driver", "Wi-Fi 6E adapter, driver and OS support", "Wi-Fi 7 adapter, driver and OS support"],
        ],
      },
      {
        kind: "check-your-pc",
        heading: "What to check before upgrading",
        items: [
          { label: "Your router's generation and bands", how: "Open the router's admin page or its box label. Check that it lists the 6 GHz band for 6E or Wi-Fi 7." },
          { label: "Your PC's adapter", how: "In Device Manager, open Network adapters and note the model. Search the maker's page for supported standards and bands." },
          { label: "Operating system and driver", how: "6 GHz support needs a driver and an OS release that enable it. Check the adapter maker's page for the required Windows version." },
          { label: "Your internet plan", how: "A faster Wi-Fi link does not exceed what your internet provider delivers, so compare it with your plan speed." },
          { label: "Distance and walls", how: "Test the signal at your desk. A 6 GHz signal falls off faster, and a nearby router or a wired access point may help more than a new adapter." },
        ],
      },
      {
        kind: "choose-if",
        heading: "Which one makes sense",
        options: [
          { choice: "Stay on Wi-Fi 6", when: ["Your router is already Wi-Fi 6 and your signal at the desk is strong", "Your internet plan is well within what Wi-Fi 6 delivers", "You mainly browse, stream and play online games"] },
          { choice: "Move to Wi-Fi 6E", when: ["Your 5 GHz band is crowded by neighbours", "Your router is close to your PC", "You can use an adapter with a supported driver"] },
          { choice: "Consider Wi-Fi 7", when: ["You are buying a new router and PC adapter together", "You have a fast internet plan and a close signal", "You want to be on the latest generation when you replace hardware"] },
          { choice: "Use Ethernet", when: ["The PC is fixed and you can run a cable", "You play latency-sensitive games or move large files", "You want a connection that does not depend on signal strength"] },
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Buying a Wi-Fi 7 adapter and keeping an older router", instead: "The link falls back to the router's generation, so upgrade the router as well or expect no gain." },
          { mistake: "Ignoring driver and OS support", instead: "Check the adapter page for the supported Windows version." },
          { mistake: "Blaming the generation for weak signal", instead: "Distance, walls and interference matter more; try repositioning the router or using a wire." },
        ],
      },
      next([
        ["How to choose a PCIe Wi-Fi card", "how-to-choose-a-pcie-wi-fi-card"],
        ["How to choose a gaming router", "how-to-choose-a-gaming-router"],
        ["How to choose a mesh Wi-Fi system", "how-to-choose-a-mesh-wi-fi-system"],
        ["Fixing Wi-Fi drops on a PC", "how-to-fix-wi-fi-drops-on-a-pc"],
      ]),
    ],
  },

  /* 11 */
  {
    slug: "ethernet-cable-categories-cat5e-cat6-cat6a-explained",
    type: "guide",
    status: "published",
    category: "peripherals",
    subtopic: "networking",
    seoTitle: "Ethernet Cable Types: Cat5e, Cat6, Cat6a",
    title: "Ethernet cable categories explained: Cat5e, Cat6 and Cat6a for a PC",
    dek: "For a home PC, the cable category rarely limits you until you pass 1 Gbps. Learn the speeds and distances each category is rated for and what else to check.",
    metaDescription:
      "Compare Cat5e, Cat6 and Cat6a Ethernet cables by speed and distance, and learn what to check on length, conductors and ports for a gaming or workstation PC.",
    teaser: "Check which category you actually need for 1, 2.5 or 10 Gbps, and what a cable and your ports must support.",
    author: AUTHOR,
    readTime: "7 min read",
    sources: [TIA],
    related: [
      "how-to-choose-a-network-switch-for-your-pc-setup",
      "how-to-choose-a-usb-ethernet-adapter",
      "how-to-choose-a-gaming-router",
      "powerline-ethernet-explained",
      "how-to-fix-wi-fi-drops-on-a-pc",
    ],
    modules: [
      {
        kind: "key-takeaway",
        body: "Cat5e is rated for 1 Gbps over 100 meters, Cat6 does 1 Gbps to 100 meters and 10 Gbps over shorter runs, and Cat6a does 10 Gbps to 100 meters. For most home desks, a good Cat6 or Cat6a patch cable is plenty, and the router, switch and PC ports usually limit speed before the cable does.",
      },
      {
        kind: "explanation",
        heading: "What the category means",
        paragraphs: [
          "The category describes the frequency a twisted-pair cable is certified to carry, and so the speeds it supports at a given length. Cat5e is rated to 100 MHz and suits 1000BASE-T, which is gigabit Ethernet. Cat6 is rated to 250 MHz and Cat6a to 500 MHz.",
          "For distance, the standard run for gigabit and for 10-gigabit on Cat6a is 100 meters. Cat6 can carry 10 Gbps, but only over shorter distances of about 55 meters in good conditions, which is far more than a home desk needs. Multi-gigabit speeds of 2.5 and 5 Gbps are designed to work over existing Cat5e and Cat6 cabling.",
          "Higher categories such as Cat7 and Cat8 appear in shops. Cat8 is designed for short data-center links at 25 or 40 Gbps over about 30 meters, so it is not needed for a home PC. Cat7 is not a category recognised by the main cabling standards bodies, so a cable sold only as Cat7 deserves a closer look at its rating and construction.",
        ],
      },
      {
        kind: "decision-table",
        heading: "Category quick reference",
        intro: "Ratings are for standard twisted-pair cable with RJ45 plugs. Actual speed also depends on the ports and gear at both ends.",
        columns: ["Category", "Rated frequency", "Typical speed", "Notes"],
        rows: [
          ["Cat5e", "100 MHz", "1 Gbps to 100 m; 2.5 Gbps supported by the multi-gig standard", "Fine for most home gigabit links"],
          ["Cat6", "250 MHz", "1 Gbps to 100 m; 10 Gbps over shorter runs", "A common choice for new patch cables"],
          ["Cat6a", "500 MHz", "10 Gbps to 100 m", "Thicker, often shielded; useful for longer 10 Gbps runs"],
          ["Cat8", "2000 MHz", "25 or 40 Gbps over short links", "Meant for data centers, not home PCs"],
        ],
      },
      {
        kind: "check-your-pc",
        heading: "What your cable has to match",
        items: [
          { label: "Your PC's Ethernet port speed", how: "In Windows, open Settings, Network & internet, Ethernet to see the link speed, or check the motherboard spec for 1, 2.5 or 10 Gbps." },
          { label: "Your router or switch ports", how: "Look at the label on each port or the product page. A 1 Gbps port limits the link to 1 Gbps whatever cable you use." },
          { label: "Cable length", how: "Measure the path from the router or switch to the PC, including bends, and allow some slack." },
          { label: "Conductor material", how: "Look for solid or stranded copper. Avoid cables marked copper-clad aluminium (CCA) for network use." },
          { label: "Plug and boot fit", how: "Check that the plug fits the port and that a clip is intact so the cable seats firmly." },
        ],
      },
      {
        kind: "compatibility",
        heading: "Compatibility notes",
        notes: [
          "Cables of any category are interchangeable at a speed they all support. A Cat5e cable works in a Cat6 port and the link runs at the lowest rated speed.",
          "Solid-core cable suits long fixed runs inside walls. Stranded cable is more flexible and suits patch cables that you move around the desk.",
          "Shielded cables only help if the shield is grounded properly end to end. For a typical home run, an unshielded cable of the right category works well.",
          "If a link runs at 100 Mbps when you expect 1 Gbps, try another cable and port before you change anything else, since a damaged cable or a bad plug is a common cause.",
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Paying for Cat8 for a home desk", instead: "Match the cable to the ports at each end; Cat6 or Cat6a covers 1 to 10 Gbps." },
          { mistake: "Upgrading the cable and keeping a 1 Gbps router port", instead: "Check every port in the path." },
          { mistake: "Buying the cheapest cable of unknown make", instead: "Check it states its category and conductor material." },
        ],
      },
      next([
        ["How to choose a network switch", "how-to-choose-a-network-switch-for-your-pc-setup"],
        ["How to choose a USB Ethernet adapter", "how-to-choose-a-usb-ethernet-adapter"],
        ["How to choose a gaming router", "how-to-choose-a-gaming-router"],
        ["Powerline Ethernet explained", "powerline-ethernet-explained"],
      ]),
    ],
  },

  /* 12 */
  {
    slug: "pc-speaker-connections-3-5mm-usb-optical-bluetooth",
    type: "guide",
    status: "published",
    category: "peripherals",
    subtopic: "speakers",
    seoTitle: "PC Speaker Connections Compared",
    title: "PC speaker connections compared: 3.5 mm, USB, optical and Bluetooth",
    dek: "How speakers connect decides which PC ports you use, where the audio is converted and how much delay you hear. Read the connection options before you choose a pair.",
    metaDescription:
      "Compare 3.5 mm analog, USB, optical and Bluetooth connections for PC speakers, including surround support, audio delay and which ports your motherboard needs.",
    teaser: "Match a speaker's inputs to the ports on your PC and check what each connection can and cannot do.",
    author: AUTHOR,
    readTime: "7 min read",
    sources: [BT_SIG, USB_IF],
    related: [
      "how-to-choose-desktop-speakers-for-a-pc",
      "desktop-speaker-features-explained-what-is-worth-paying-for",
      "best-pc-speakers",
      "best-pc-soundbars",
      "best-2-1-speakers",
    ],
    modules: [
      {
        kind: "key-takeaway",
        body: "A 3.5 mm cable is the simplest and works on nearly every PC, USB speakers bring their own digital-to-analog converter, optical carries digital audio but only some formats, and Bluetooth is convenient but adds delay. Check which inputs the speakers have and which outputs your motherboard offers before you buy.",
      },
      {
        kind: "explanation",
        heading: "Where the sound gets converted",
        paragraphs: [
          "All speakers need an analog signal in the end. What changes between connections is where the digital audio from the PC is converted to analog. With a 3.5 mm cable, the conversion happens in the PC's sound hardware, so the audio quality depends on the motherboard or sound card. With USB, the speakers or a small adapter do the conversion, which bypasses the motherboard's audio.",
          "Optical (TOSLINK, also called S/PDIF) sends digital audio as light, with the speakers or an amplifier doing the conversion. Because it is optical, it cannot pick up electrical noise from the PC. It is limited to two-channel PCM or compressed formats such as Dolby Digital and DTS, and does not carry the lossless multi-channel formats that HDMI can.",
          "Bluetooth sends compressed audio wirelessly. Codec support varies, and the link adds delay that can be noticeable in games and in video that is not compensated. It suits music and casual use, and it frees you from cables.",
        ],
      },
      {
        kind: "decision-table",
        heading: "Connections compared",
        columns: ["Connection", "What the PC needs", "Strength", "Watch for"],
        rows: [
          ["3.5 mm analog", "A green line-out jack, or three jacks for 5.1", "Simple; works anywhere", "Hum or buzz if the cable picks up noise; quality depends on the PC's audio"],
          ["USB", "A free USB port", "Built-in converter; plug and play", "Some speakers use USB only for power, so check that it carries audio"],
          ["Optical (TOSLINK)", "An optical output on the motherboard or sound card", "Digital link with no electrical noise", "Stereo PCM or compressed surround only; many boards lack the port"],
          ["Bluetooth", "A Bluetooth adapter or built-in radio", "No cable; works with phones as well", "Delay, codec support and pairing behaviour vary"],
          ["HDMI or HDMI ARC", "An HDMI output or a monitor with an audio return", "Carries more formats; common on soundbars", "Check the port and the cable on both devices"],
        ],
      },
      {
        kind: "check-your-pc",
        heading: "What to check on your PC",
        items: [
          { label: "Rear audio jacks", how: "Look at the motherboard's rear panel: a green port is front output, and a 5.1 setup uses the green, black and orange ports." },
          { label: "Optical out", how: "A square or round port with a small flap or plug is TOSLINK. Check the motherboard manual before relying on it." },
          { label: "Free USB ports", how: "Confirm a free port for USB speakers, and a second one if you also use a USB headset or microphone." },
          { label: "Bluetooth radio", how: "Open Device Manager and look for a Bluetooth entry. If it is missing, you will need an adapter." },
        ],
      },
      {
        kind: "choose-if",
        heading: "Which connection suits you",
        options: [
          { choice: "3.5 mm analog", when: ["You want the simplest setup", "Your motherboard has a good line-out", "You may use the speakers with other devices"] },
          { choice: "USB", when: ["Your PC audio is noisy or you want to bypass it", "You have a laptop or small PC with limited jacks", "You want one cable for power and sound where the maker states it"] },
          { choice: "Optical", when: ["You have an optical output and a receiver with an optical input", "You want a digital link that ignores electrical noise", "You mainly use stereo or compressed surround"] },
          { choice: "Bluetooth", when: ["You mainly play music from several devices", "You prefer no cables", "You can accept some delay with video and games"] },
        ],
      },
      {
        kind: "mistakes",
        heading: "Mistakes to avoid",
        items: [
          { mistake: "Assuming a USB cable always carries audio", instead: "Read the product page to see whether the port is for audio, power or both." },
          { mistake: "Expecting optical to carry every surround format", instead: "Check the formats the speakers and the PC both support." },
          { mistake: "Choosing Bluetooth for gaming speakers", instead: "Use a wired or dongle link when delay matters." },
        ],
      },
      next([
        ["How to choose desktop speakers", "how-to-choose-desktop-speakers-for-a-pc"],
        ["Best PC speakers", "best-pc-speakers"],
        ["Best PC soundbars", "best-pc-soundbars"],
        ["Best 2.1 speakers", "best-2-1-speakers"],
      ]),
    ],
  },
];
