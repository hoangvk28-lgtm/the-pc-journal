import type { GuideModule } from "@/lib/pc-content/types";

/**
 * Extra modules for the peripherals wave-1 guides, inserted before each guide's "next-steps" module
 * (see data/info/peripherals-wave1.ts). Keyed by slug.
 */
const baseExtra: Record<string, GuideModule[]> = {
  "mouse-polling-rate-and-dpi-explained": [
    {
      kind: "explanation",
      heading: "Why your mouse can feel off even with the right numbers",
      paragraphs: [
        "Many sensitivity complaints trace back to Windows settings, not to the mouse. The pointer speed slider (Settings, Bluetooth & devices, Mouse) defaults to the sixth notch, which maps counts to pixels one to one. Moving it away from that notch, or leaving Enhance pointer precision on, adds scaling or acceleration, so the same hand movement no longer produces the same distance. Most competitive shooters ask players to turn the acceleration option off and use raw input in the game.",
        "The surface matters as much as the sensor. Optical sensors can lose tracking on glass, glossy desks and some very dark or very uniform surfaces. A cloth mouse pad gives a consistent texture, and lift-off distance, the height at which the sensor stops reading when you pick the mouse up, decides whether the cursor jumps when you reposition at low sensitivity. Lift-off figures are published by some independent reviewers and by a few makers, so check one before assuming a mouse behaves well when lifted.",
        "Check where the mouse is plugged in. A dongle or cable on a front-panel port, a hub or a crowded USB controller can add dropped or delayed reports, and a 4000 or 8000 Hz mouse in particular is best connected straight to a rear motherboard port. Some high-rate wireless mice only reach their top rate with their own dongle, so confirm that in the maker's documentation instead of assuming the setting in software is being honoured.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Grip and hand size: shape comes before the sensor",
      intro: "Hand size and grip style decide comfort more reliably than any sensor figure. Measure your hand from the wrist crease to the tip of the middle finger and compare it with the maker's stated length.",
      columns: ["Grip style", "What it looks like", "What to look for in a shape"],
      rows: [
        ["Palm", "The whole palm rests on the mouse, fingers lie flat on the buttons", "A longer body with a raised hump; weight is less critical"],
        ["Claw", "The palm touches the rear and the fingers arch over the buttons", "A mid-length body with the highest point toward the back"],
        ["Fingertip", "Only the fingertips and the base of the thumb touch it", "A short, light mouse; weight becomes noticeable quickly"],
        ["Hybrid or relaxed", "A mix that changes during a session", "A medium shape with a modest hump and supportive side grips"],
      ],
    },
    {
      kind: "choose-if",
      heading: "Quick checks before you buy a high-rate mouse",
      options: [
        {
          choice: "Stay at 1000 Hz if",
          when: [
            "Your CPU is already at high load in the games you play",
            "Your monitor refreshes at 144 Hz or lower and you rarely feel the cursor is choppy",
            "You want the longest wireless battery life",
          ],
        },
        {
          choice: "Try 2000 to 8000 Hz if",
          when: [
            "You play fast shooters on a high-refresh display with CPU headroom",
            "You use a mouse and receiver combination that documents the higher rate",
            "You are willing to compare it against 1000 Hz for a week and switch back if it makes no difference to you",
          ],
        },
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Test your settings in about ten minutes",
      items: [
        { label: "Confirm Windows is not changing your movement", how: "Open the mouse settings, set the pointer speed to the sixth notch and untick Enhance pointer precision, then test in a text editor or desktop." },
        { label: "Find your effective sensitivity", how: "Multiply DPI by the in-game sensitivity value, then use the game's published conversion if you switch titles. Write the number down so you can restore it." },
        { label: "Watch CPU usage at a higher rate", how: "Switch the mouse to its top polling rate, run a demanding game for a few minutes and compare the frame time or CPU graph with the 1000 Hz setting in the same scene." },
        { label: "Read the battery note", how: "On a wireless mouse, look for the polling rate the maker uses when it states battery life; the figure at the top rate is often far lower." },
      ],
    },
    {
      kind: "callout",
      tone: "note",
      heading: "Wrist or hand discomfort",
      body: "A mouse that fits your hand reduces awkward gripping, but we cannot say any shape prevents or relieves pain. If you have persistent aching, tingling or numbness, speak to a doctor or physiotherapist before changing equipment.",
    },
  ],

  "wired-vs-2-4-ghz-vs-bluetooth-mice-and-keyboards": [
    {
      kind: "explanation",
      heading: "Latency: where each connection spends its time",
      paragraphs: [
        "A wired USB device sends reports on a fixed schedule set by the polling rate, so its delay is predictable. A 2.4 GHz receiver uses a proprietary radio link tuned for low delay, and good implementations behave close to a cable in everyday use. Bluetooth is a general-purpose standard built to save power and serve many device types, so reports tend to arrive at a slower or less regular pace and the delay can vary from one model to another.",
        "That variability is the point to remember. Independent reviewers sometimes measure click-to-screen latency for specific products, and the results differ by maker, firmware and mode, so a general rule like 'Bluetooth is slow' is less useful than a measurement for the exact model. If you play fast games, favour a wired connection or a 2.4 GHz receiver and use Bluetooth as the secondary mode for a laptop or tablet.",
        "For typing, a small and consistent delay is rarely noticeable. Many people use Bluetooth keyboards for office work without trouble, while the same connection on a mouse is easier to notice because the pointer is constantly moving.",
      ],
    },
    {
      kind: "explanation",
      heading: "Interference and dropouts: what actually causes them",
      paragraphs: [
        "Both 2.4 GHz receivers and Bluetooth share the 2.4 GHz band with Wi-Fi routers, microwave ovens and many other devices. They hop between channels to avoid busy ones, which is why most setups work without attention, but a crowded desk can still cause stutter. A common offender is a USB 3.x device or hub next to the receiver: Intel has documented that USB 3.0 ports and cables can raise noise in the 2.4 GHz band.",
        "The fixes are simple and free. Move the receiver to a front or side port or onto a short USB extension cable so it sits within a foot or two of the device, keep it away from external drives and hubs, and avoid placing it behind a metal case. If dropouts persist, try a different port on a separate controller before blaming the device.",
        "Bluetooth adds one more factor: your PC's adapter. A weak built-in adapter, a poorly positioned antenna on a desktop motherboard or a cheap USB Bluetooth stick can cause the lag people attribute to the keyboard or mouse. Check which Bluetooth version and antenna arrangement your motherboard or adapter lists.",
      ],
    },
    {
      kind: "compatibility",
      heading: "Compatibility points that catch people out",
      notes: [
        "BIOS and boot menus: a wired keyboard, or a 2.4 GHz receiver that presents itself as a standard keyboard, is the safest choice for entering BIOS. Bluetooth pairing generally does not exist before the operating system loads, so keep a wired keyboard to hand for firmware changes.",
        "Receiver standards: a receiver from one maker normally pairs only with that maker's devices, and some brands use a shared receiver system for several of their products. Check the box or support page before buying a second device and expecting it to share a dongle.",
        "Multi-device Bluetooth: models with several Bluetooth slots let you switch between a PC and a laptop with a key press, but check that the pairing slots are separate from the receiver mode.",
        "Sleep and wake: some wireless keyboards wake the PC with a key press and others do not. If you need this, look for a statement about wake from sleep in the manual.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Battery, charging and upkeep compared",
      columns: ["Connection", "Power", "Things to plan for"],
      rows: [
        ["Wired", "Drawn from the PC", "Cable length, cable drag on a mouse, a free port"],
        ["2.4 GHz", "Battery in the device", "Higher polling rates reduce battery life; a receiver port; charging while using a USB cable is only possible on models that support it"],
        ["Bluetooth", "Battery in the device", "Usually the longest battery life of the wireless options, though it varies by model and lighting or backlight use"],
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Before you buy or pair",
      items: [
        { label: "Count spare USB ports", how: "Confirm a rear USB port is free for the receiver, and note whether a front-panel port is the only option." },
        { label: "Look up your Bluetooth", how: "Open Device Manager and check for a Bluetooth entry; if there is none, your PC has no adapter and a 2.4 GHz receiver or a wired device is simpler." },
        { label: "Check the device list in the manual", how: "Look for which modes work together and whether the maker states a polling rate for each." },
      ],
    },
  ],

  "keyboard-layouts-compared-full-size-tkl-75-65-60": [
    {
      kind: "explanation",
      heading: "What you give up when the board gets smaller",
      paragraphs: [
        "A full-size layout has around 104 keys with a numpad. A tenkeyless (TKL) board removes the numpad and has roughly 87. A 75% layout squeezes the function row, arrow keys and a few navigation keys into a block of about 80 keys or fewer, a 65% drops the function row, and a 60% also drops the arrow keys and navigation cluster, leaving about 61 keys. Exact counts vary by maker, so compare the layout picture before buying.",
        "Keys that disappear usually move to a second layer reached with a function key. That is fine for a key you press rarely, but awkward for something you use all the time. Think about Print Screen, Delete, Home and End, and the arrow keys: if you edit text or spreadsheets, hold a function key to move the cursor becomes tiring quickly.",
        "Desk space is the upside. Removing the numpad moves the mouse closer to your keyboard hand, which helps with low-sensitivity play on a large mouse pad and reduces shoulder reach. Measure your desk and mouse pad before deciding, since a 75% board is not very different in width from a TKL.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Count what you actually press",
      intro: "Spend a work day paying attention, then use this list.",
      items: [
        { label: "Numpad", how: "If you enter numbers daily in spreadsheets or accounting software, a full-size board or a separate numeric pad is worth the width." },
        { label: "Arrow keys and Home, End, Delete", how: "If you navigate documents or code constantly, keep a layout with dedicated arrows; 65% is the first size that does." },
        { label: "Function row", how: "If your software relies on F-key shortcuts, or you use F5 to refresh and F11 for full screen, choose 75% or larger." },
        { label: "Media and volume keys", how: "Smaller boards often hide these on a layer; look for a dedicated knob or key if you adjust volume often." },
      ],
    },
    {
      kind: "decision-table",
      heading: "Other layout details that change what fits",
      columns: ["Detail", "Why it matters", "How to check"],
      rows: [
        ["ANSI or ISO", "ISO has a taller Enter key and an extra key beside left Shift, which changes which keycaps fit", "Compare the Enter key shape in the product images"],
        ["Hot-swap sockets", "They let you change switches without soldering, but only the switch types the sockets support", "Look for 3-pin or 5-pin compatibility in the spec list"],
        ["Keycap sets", "Sets are sold for a layout; a compact board may need non-standard bottom-row sizes", "Match the bottom-row key sizes to the replacement set"],
        ["Programmable layers", "Compact boards depend on remapping software to be usable", "Check that the software runs on your operating system and works without an account"],
      ],
    },
    {
      kind: "mistakes",
      heading: "Layout-specific mistakes",
      items: [
        { mistake: "Buying a 60% board as a first compact keyboard without checking the arrow-key layer", instead: "Try typing a long paragraph using only function-layer navigation, or start with a 65% or 75% board." },
        { mistake: "Assuming a TKL keeps the same keycap set as a full-size board", instead: "Look at the bottom row and right Shift size before ordering aftermarket keycaps." },
        { mistake: "Choosing by smallness alone", instead: "Match the layout to the keys you use daily, then pick the smallest board that still has them." },
      ],
    },
  ],

  "usb-vs-xlr-microphones": [
    {
      kind: "explanation",
      heading: "Sound quality comes from the capsule, the room and your position",
      paragraphs: [
        "The connector is not what decides how a microphone sounds. The capsule, the amount of gain applied, the room you record in and how close you sit decide most of it. A USB microphone has a small converter built in, so its performance depends partly on that internal electronics; an XLR microphone outputs an analogue signal that an audio interface or mixer converts, so the interface becomes the other half of the result.",
        "Mic type matters more than connection for many voices. Dynamic microphones are usually less sensitive and pick up less room noise, which helps in untreated bedrooms and offices. Condenser microphones are more sensitive and capture more detail, but they also capture keyboard clatter, fans and echo. Most microphones used for speech are cardioid, meaning they reject sound from behind, so aim the front at your mouth and the back at your noise source.",
        "Distance is the cheapest upgrade. Speaking a few inches from a microphone, slightly off axis to reduce plosive bursts, usually does more for clarity than changing models. A pop filter and a boom arm that holds the microphone close without touching the desk make the difference audible on any microphone.",
      ],
    },
    {
      kind: "decision-table",
      heading: "What the full cost and setup look like",
      columns: ["Item", "USB microphone", "XLR microphone"],
      rows: [
        ["What you plug into", "A USB port on the PC, and sometimes a phone or tablet", "An audio interface or mixer, then USB to the PC"],
        ["Extra hardware", "A stand or arm", "Interface or mixer, an XLR cable, a stand or arm"],
        ["Power", "From USB", "Some condensers need 48 V phantom power from the interface"],
        ["Upgrade path", "Replace the whole microphone", "Replace the microphone or the interface independently"],
        ["Multiple microphones", "Often awkward on one PC", "Possible with an interface that has several inputs"],
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Compatibility and setup checks",
      items: [
        { label: "Interface inputs", how: "Confirm the interface has an XLR input with enough gain for your microphone; dynamic microphones are quiet and may need more gain than the interface cleanly provides." },
        { label: "Phantom power", how: "If your microphone is a condenser, check that it lists 48 V and that your interface has a phantom switch." },
        { label: "Sample rate", how: "In Windows sound settings, check the format of the input device and match it to your recording or streaming software." },
        { label: "Direct monitoring", how: "Look for a headphone jack on the microphone or interface that lets you hear yourself without delay." },
      ],
    },
    {
      kind: "mistakes",
      heading: "Common mistakes when choosing a microphone",
      items: [
        { mistake: "Picking an XLR microphone but forgetting the interface", instead: "Budget for the interface, cable and arm together before comparing prices." },
        { mistake: "Putting a sensitive condenser in a noisy room", instead: "Use a dynamic microphone close to your mouth, or treat the room first." },
        { mistake: "Assuming USB is only for beginners", instead: "Use USB when you want a simple, single-device setup, and move to XLR when you need several inputs or independent upgrades." },
      ],
    },
  ],

  "headset-connection-types-for-pc-ps5-and-xbox": [
    {
      kind: "explanation",
      heading: "Why the Xbox is the exception",
      paragraphs: [
        "Most wireless headsets that come with a USB transmitter work on a PC and a PlayStation 5 because both accept ordinary USB audio devices. The Xbox does not: it uses its own wireless protocol or a wired connection through the controller, so a standard dongle usually will not connect. A headset that works on Xbox will say so by name on its packaging or support page, often with a transmitter built for that console.",
        "The wired fallback is a 3.5 mm cable. Controllers for the Xbox and PS5 have a headset jack, and many wireless headsets include a cable so they can be used on consoles that do not support their wireless mode. Keep in mind that the controller jack carries only game and chat audio, and that some features, such as sidetone, equalizer presets or the transmitter's mixing knob, may not be available over a cable.",
        "If you use several platforms, look for a headset that lists each console or a model with separate PC and console variants, and compare the compatibility list on the maker's own page. A retailer listing can be copied from another variant, so verify it.",
      ],
    },
    {
      kind: "explanation",
      heading: "Bluetooth, mic quality and the extras that vary",
      paragraphs: [
        "Bluetooth works for music and calls, but it is often not available for game and chat audio on PlayStation and Xbox consoles. On a PC it is fine for videos and meetings, though delay can show in fast games, and the headset's mic quality may drop while the headset is using the call profile. If your headset has both Bluetooth and a dongle, use the dongle for gaming.",
        "Microphone behaviour differs between models. Some have a boom you can detach or flip, others use a fixed mic, and a headset can have a good voice-pickup spec but still sound thin because of the wireless codec. Look for a statement of the mic type, and treat a headset-only comparison of voice samples as the better guide.",
        "A few other details change how a headset behaves across devices: a USB-C or USB-A transmitter, a switch for a game and chat balance, charging while in use, and software that exists only for Windows. Make a list of what you need before comparing.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Platform support at a glance",
      intro: "These are typical patterns; always confirm against the exact model's support page.",
      columns: ["Connection", "PC", "PS5", "Xbox"],
      rows: [
        ["USB dongle (2.4 GHz)", "Usually works", "Usually works if listed", "Only if the model lists Xbox"],
        ["3.5 mm cable", "Works with a jack or an adapter for a combined port", "Works through the controller jack", "Works through the controller jack"],
        ["Bluetooth", "Works for music and calls", "Often not available for game audio", "Usually not available"],
        ["USB wired headset", "Works", "Often works", "Check the list"],
      ],
    },
    {
      kind: "mistakes",
      heading: "Headset-specific mistakes",
      items: [
        { mistake: "Buying a headset marked for 'consoles' without finding the Xbox line", instead: "Search the maker's page for Xbox by name and read what mode is used." },
        { mistake: "Using a single 3.5 mm plug in a PC port that has separate headphone and microphone sockets", instead: "Check whether the plug is a combined four-contact connector; a splitter cable may be needed for a PC with separate colour-coded jacks." },
        { mistake: "Ignoring the transmitter port", instead: "Count your free USB ports and check whether your console needs the USB-A or USB-C transmitter." },
      ],
    },
  ],

  "usb-speed-names-for-external-ssds-decoded": [
    {
      kind: "explanation",
      heading: "What the names mean in plain numbers",
      paragraphs: [
        "USB names changed in 2019: the original USB 3.0 became USB 3.2 Gen 1 at 5 Gbps, USB 3.1 became USB 3.2 Gen 2 at 10 Gbps, and the two-lane mode became USB 3.2 Gen 2x2 at 20 Gbps. The USB-IF later recommended marketing names such as SuperSpeed USB 5Gbps, 10Gbps and 20Gbps, which is clearer, so look for the Gbps figure.",
        "Gigabits per second are not megabytes per second. Dividing by eight and then accounting for encoding and protocol overhead gives a realistic ceiling: roughly 500 MB/s on a 5 Gbps link and somewhat under 1,000 MB/s on a 10 Gbps link. A drive can be slower than its link, so the interface figure is a limit, not a promise.",
        "USB4 and Thunderbolt 3 or 4 offer 40 Gbps, though a drive only benefits when its controller is built for it. Not every USB-C port provides these speeds: the connector shape does not tell you the speed. The motherboard manual or laptop spec sheet states the speed of each port.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Which tier fits which drive",
      columns: ["Link", "Typical drive", "Where it makes sense"],
      rows: [
        ["5 Gbps", "SATA-based portable SSD or a hard drive", "Backups and general file carrying"],
        ["10 Gbps", "NVMe or SATA SSD in a Gen 2 enclosure", "Large photo and video libraries, game storage, project files"],
        ["20 Gbps", "NVMe in a 2x2 enclosure", "Only if your port and drive both support it"],
        ["40 Gbps (USB4 or Thunderbolt)", "High-end NVMe enclosure", "Specialist workflows with a matching port"],
      ],
    },
    {
      kind: "explanation",
      heading: "Why a drive runs below its rated speed",
      paragraphs: [
        "A quoted figure is usually a peak for sequential reads. Small files, a nearly full drive or an SSD whose cache has filled can run much slower, and long copies can slow down when the enclosure heats up. A well-designed drive notes sustained performance; a headline figure alone does not.",
        "The cable matters too. A cable that is rated for charging only, or for 5 Gbps, will cap a faster drive, and long cables can reduce speed. Use the cable supplied with the drive or one marked for the speed you want.",
        "Finally, the port must run at that speed, and the operating system must be using the right driver. In Windows, a mismatch sometimes shows when a drive appears with a lower speed than expected. Try another port before assuming the drive is faulty.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Check your side first",
      items: [
        { label: "Port speed", how: "Look in the motherboard or laptop manual for the Gbps figure of each USB port." },
        { label: "Cable rating", how: "Check that the cable states the speed you need, not just charging power." },
        { label: "Free space", how: "Leave room on the drive; performance can fall when it is almost full." },
      ],
    },
  ],

  "portable-ssd-vs-external-hard-drive": [
    {
      kind: "explanation",
      heading: "Durability and failure: what each drive does badly",
      paragraphs: [
        "A solid-state drive has no moving parts, so a bump while it runs is less likely to damage it than a hard drive with spinning platters and a moving head. That does not make it indestructible: a water splash, cable damage or a failed controller still lose data. A hard drive is more sensitive to knocks while it is spinning and to being moved while it works.",
        "Neither type is a backup on its own. A drive that holds the only copy of your photos is a single point of failure whatever it is made of. The usual rule of thumb is three copies of important data, on two kinds of storage, with one stored elsewhere. A hard drive that lives in a drawer and is updated occasionally works well as the second copy.",
        "Check how the drive is encrypted if it carries sensitive files. Some portable drives include hardware encryption and software; others do not, and you can encrypt with BitLocker in Windows instead.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Cost per terabyte and capacity planning",
      columns: ["Need", "Better fit", "Reason"],
      rows: [
        ["A large archive that rarely changes", "External hard drive", "Hard drives usually cost less per terabyte at larger capacities"],
        ["Editing from the drive", "Portable SSD", "Faster random access helps when a project has many files"],
        ["Games on a console or PC", "Portable SSD", "Load times and data streaming favour solid-state drives; check the console's supported specification"],
        ["Daily commuting and travel", "Portable SSD", "Smaller, lighter and less sensitive to movement"],
        ["Second backup copy", "External hard drive", "Capacity is cheap and speed matters less"],
      ],
    },
    {
      kind: "compatibility",
      heading: "Compatibility notes",
      notes: [
        "Bus power: a 2.5 inch portable hard drive is usually powered from the USB port, but some laptop and hub ports supply too little current. A larger 3.5 inch desktop drive needs its own power adapter.",
        "File system: drives are often formatted for Windows (NTFS) or for compatibility with both Windows and Mac (exFAT). Check the format before using one between machines and consoles.",
        "Console limits: some consoles accept external storage only for specific kinds of games, so read the console maker's guidance before buying a drive for game storage.",
        "Connection: make sure the drive's cable fits your port; USB-C to USB-A cables and adapters are common.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Questions to settle before ordering",
      items: [
        { label: "How big is the data?", how: "Add up your photos, video projects and games, then add room to grow." },
        { label: "How often will it move?", how: "A drive that travels in a bag should handle knocks; one that stays on a desk can be larger." },
        { label: "Where is the other copy?", how: "Decide where the second and third copies of important files live." },
      ],
    },
  ],

  "how-to-size-an-office-chair-to-your-height-and-desk": [
    {
      kind: "explanation",
      heading: "Seat depth, the measurement most people skip",
      paragraphs: [
        "Seat depth decides whether the seat supports your thighs without pressing behind the knees. University ergonomics guidance, such as UCLA's, suggests leaving roughly one to two inches between the front edge of the seat and the back of the knee when you sit with your back against the backrest. If the seat is too deep, you slide forward and lose back support; if it is too shallow, thighs are unsupported.",
        "To check, sit all the way back and slide two fingers behind your knee. If you cannot, the seat is too deep for you. Some chairs have a sliding seat that adjusts this, and the product page will say so; if it does not mention it, assume it is fixed.",
        "Taller people need a longer seat and a taller backrest, while shorter people can find that a standard chair makes the feet hang or the back float away from the support. The maker's size chart, where one exists, usually gives recommended height ranges.",
      ],
    },
    {
      kind: "explanation",
      heading: "Desk height, keyboard height and what the chair has to do",
      paragraphs: [
        "Ergonomic guidance generally suggests feet flat on the floor with thighs roughly parallel to it, elbows close to the sides and forearms about level with the keyboard. If the desk is fixed and too high for you, raising the chair to reach the keyboard can leave your feet in the air. A footrest solves that, and the chair's height range should still be checked against your leg length.",
        "Armrests should let your shoulders relax. Arms set too high lift the shoulders and arms set too low can pull you sideways. Height-adjustable and width-adjustable armrests help, and some models let them pivot to follow your forearms at the keyboard.",
        "Lumbar support should sit where your lower back curves inward. An adjustable lumbar pad or backrest height lets you move it; fixed lumbar shapes suit some people and miss others. If you have a standing desk, make sure the seat height range covers both the sitting height you need and any lower position you use.",
      ],
    },
    {
      kind: "decision-table",
      heading: "What to measure and what to look up",
      columns: ["Measure", "How", "Check against"],
      rows: [
        ["Floor to the back of the knee", "Sit with feet flat, measure to the crease of the knee", "The seat height range, lowest to highest"],
        ["Hip to back of the knee", "Measure along the thigh while seated", "The seat depth; leave a finger-width gap"],
        ["Elbow height seated", "Measure from the seat to the bent elbow", "Armrest height range and desk height"],
        ["Weight", "Your body weight", "The rated weight capacity, plus a margin"],
      ],
    },
    {
      kind: "callout",
      tone: "caution",
      heading: "Back pain and chairs",
      body: "A well-fitted chair makes sitting more comfortable, but it is not a treatment. If you have ongoing pain, numbness or pain that spreads, see a doctor or physiotherapist, and take breaks from sitting regardless of the chair.",
    },
  ],

  "how-to-choose-a-monitor-arm-vesa-weight-and-desk-clamps": [
    {
      kind: "explanation",
      heading: "Reach, height and the shape of your screen",
      paragraphs: [
        "Weight and VESA are not the only checks. Arm reach and height range decide whether the screen can sit at the right distance and eye level. If you have a deep desk, a longer arm helps; on a shallow desk a long arm can bump the wall. Arms often state maximum height and extension in the specification.",
        "Ultrawide and curved monitors need extra attention. They are wide and often heavier at the ends, and the arm's tilt and swivel range can limit how well it holds the screen level. If your display is wider than about 34 inches, look at arms that state support for ultrawide screens and a matching weight rating.",
        "Gas-spring arms balance the monitor's weight with a spring, and they usually have an adjustment screw to set the tension. If a screen falls or rises on its own, the tension is wrong. A monitor at the very top or bottom of the arm's weight range often holds position less well than one near the middle.",
      ],
    },
    {
      kind: "explanation",
      heading: "Clamp, grommet and desk construction",
      paragraphs: [
        "A clamp grips the edge of the desk and needs a flat edge with clear space behind it; some arms state a maximum and minimum desk thickness. A grommet mount goes through a hole in the desk and is common on office desks that already have one. Check the desk is thick and solid enough: a thin or hollow desktop can flex or crack under a heavy arm.",
        "Glass, curved edges, drawers or a lip on the underside can prevent a clamp from sitting flat. Some arms ship with a reinforcing plate you can place under the desk, which spreads the load on thinner surfaces. If the desk is a veneer or particleboard, check the manufacturer's advice.",
        "A wall mount is another option when the desk cannot take a clamp. In that case the wall type matters: plasterboard needs the right anchors and a stud or a rated fixing, and the mount's weight rating applies only when installed as instructed.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Match the arm to the setup",
      columns: ["Setup", "Arm feature to look for", "Check"],
      rows: [
        ["Single 24 to 27 inch monitor", "A single arm with a weight range that covers your screen", "VESA pattern and weight without the stand"],
        ["Two monitors side by side", "A dual arm, or two single arms", "Capacity per screen and overall"],
        ["Ultrawide or curved", "Higher weight rating, strong tilt range", "Screen width against the arm's stated support"],
        ["Thin or unusual desk", "Grommet or a support plate", "Desk thickness and material"],
        ["Standing desk", "Cable slack and a flexible arm", "Range of travel with the desk fully raised"],
      ],
    },
    {
      kind: "mistakes",
      heading: "Arm mistakes to avoid",
      items: [
        { mistake: "Using the monitor's weight with the stand included", instead: "Use the weight without the stand, from the manual or spec page." },
        { mistake: "Ignoring the screws", instead: "Use the screws supplied with the arm and check the monitor manual for the thread and maximum length so you do not damage the panel." },
        { mistake: "Hanging a heavy arm on a thin desk", instead: "Check desk thickness, use a reinforcement plate and confirm with the desk's maker if unsure." },
      ],
    },
  ],

  "wi-fi-6-vs-wi-fi-6e-vs-wi-fi-7-for-pc": [
    {
      kind: "explanation",
      heading: "What each generation adds",
      paragraphs: [
        "Wi-Fi 6 (802.11ax) works on the 2.4 and 5 GHz bands. Wi-Fi 6E extends the same standard to the 6 GHz band, which offers more channels with fewer neighbours. Wi-Fi 7 (802.11be) adds wider 320 MHz channels, a denser modulation and Multi-Link Operation, which lets a device use more than one band at once. These are capabilities, and your real speed depends on your router, your adapter, your distance and your internet plan.",
        "Both ends have to support a feature before it helps. A Wi-Fi 7 router talking to a Wi-Fi 6 adapter falls back to Wi-Fi 6, and a 6E adapter cannot use 6 GHz with a router that lacks it. The 6 GHz band also has a shorter range through walls than 5 GHz, so a room two walls away may do better on 5 GHz anyway.",
        "Operating system and driver support matter for the newer bands. Check the adapter's requirements for the Windows version and driver, since Wi-Fi 7 features need Windows 11 version 24H2 or later according to Microsoft documentation, and 6 GHz needs Windows 11 with a current driver. If you use an older operating system, you may be limited to older features regardless of the hardware.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Choosing by situation",
      columns: ["Situation", "Reasonable choice", "Reason"],
      rows: [
        ["Router is Wi-Fi 5 or 6, no plan to replace it", "A Wi-Fi 6 or 6E adapter", "A newer adapter will not unlock features the router lacks"],
        ["Router supports 6 GHz and the PC is close", "A 6E or 7 adapter", "You can use the less crowded band"],
        ["Building a new PC and a new router", "Wi-Fi 7 if both are available at a price you accept", "Buying both together avoids a mismatch"],
        ["Desktop near the router with a cable run possible", "Ethernet", "A wire avoids radio interference altogether"],
      ],
    },
    {
      kind: "compatibility",
      heading: "Adapter types and what to check",
      notes: [
        "PCIe cards need a free slot and usually have external antennas you can move to a better position. Check the slot size and the headers they use for Bluetooth, normally a USB header.",
        "M.2 modules in the Wi-Fi slot must match the key type (often E-key) and, for some Intel modules, the CNVi interface that only certain boards support. Check the motherboard manual before buying a card.",
        "USB adapters are the simplest option, but they can be limited by the port speed and antenna size. Plug in directly or use a short extension.",
        "Bluetooth is separate from Wi-Fi on many adapters; check that the card includes the version you need and that your board has the USB header it uses.",
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Test before you spend",
      items: [
        { label: "Router model", how: "Look up the router's supported standards and whether it has a 6 GHz band." },
        { label: "Current adapter", how: "Open Device Manager, then Network adapters, and look up the model and its supported standard." },
        { label: "Cable test", how: "Run a wired connection temporarily to see whether the limit is Wi-Fi or your internet plan." },
        { label: "Placement", how: "Move the antennas or the router before spending money; clear line of sight often helps more than a new standard." },
      ],
    },
  ],

  "ethernet-cable-categories-cat5e-cat6-cat6a-explained": [
    {
      kind: "explanation",
      heading: "Speed, distance and why the router often decides",
      paragraphs: [
        "Cat5e carries gigabit Ethernet over runs of up to 100 metres and can carry 2.5 Gbps in many installations. Cat6 handles gigabit over 100 metres and 10 gigabit over shorter runs, commonly stated as up to about 55 metres depending on conditions. Cat6a is rated for 10 gigabit over the full 100 metres and has stricter limits on crosstalk. Higher categories such as Cat7 and Cat8 appear in marketing, but the TIA and IEEE standards that matter for home networks cover up to Cat6a for 10 Gbps, and Cat8 is aimed at short data centre runs.",
        "The cable is only one link in the chain. If your router, switch and PC network port are gigabit, a Cat6a cable will not make the connection faster than 1 Gbps. Many internet plans, too, are below 1 Gbps, so a cable upgrade changes nothing visible. Check the speed labels on the router ports and your PC's network adapter.",
        "For short patch cables between a PC and a router, the category matters less than the quality of the cable. A well-made Cat5e or Cat6 patch cable is fine for gigabit. Where the category matters most is for cables you will run through walls, where replacing them later is expensive.",
      ],
    },
    {
      kind: "decision-table",
      heading: "What to buy for common jobs",
      columns: ["Job", "Reasonable category", "Note"],
      rows: [
        ["PC to router, gigabit internet", "Cat5e or Cat6", "Either is enough; buy a good-quality cable"],
        ["PC to NAS with 2.5 GbE ports", "Cat5e or Cat6", "Check both ports are rated for 2.5 Gbps"],
        ["Run through walls or ceiling", "Cat6 or Cat6a", "Consider future 10 GbE and check the distance"],
        ["10 GbE between machines over a long run", "Cat6a", "Cat6 may not hold 10 Gbps over longer distances"],
        ["Next to power cables or in a noisy area", "Shielded Cat6a, properly grounded", "Shielding only helps if it is terminated correctly"],
      ],
    },
    {
      kind: "mistakes",
      heading: "Cable-buying mistakes",
      items: [
        { mistake: "Paying for Cat8 for a home connection", instead: "Choose Cat6 or Cat6a unless a specific device calls for something else." },
        { mistake: "Buying cheap cable that uses copper-clad aluminium (CCA)", instead: "Look for solid or stranded pure copper conductors in the description; CCA is not recommended for in-wall runs." },
        { mistake: "Using a flat or very thin cable for a long run", instead: "Use round cable for permanent runs and check the stated category on the jacket." },
        { mistake: "Cutting and reterminating without testing", instead: "Test the finished run with a cable tester or by checking the negotiated link speed." },
      ],
    },
    {
      kind: "compatibility",
      heading: "Compatibility checks",
      notes: [
        "Link speed: in Windows, open the adapter status and read the speed. If it shows 100 Mbps on a gigabit setup, suspect a damaged cable, a bad connector or a port limit.",
        "PoE: if you power devices through Ethernet, check the cable's conductor quality, since poor cable can heat and lose power over a long run.",
        "Backward compatibility: all categories work with slower ports; a Cat6a cable in a gigabit port will simply run at gigabit.",
      ],
    },
  ],

  "pc-speaker-connections-3-5mm-usb-optical-bluetooth": [
    {
      kind: "explanation",
      heading: "Where the digital-to-analogue conversion happens",
      paragraphs: [
        "Every speaker needs an analogue signal in the end; the question is who converts it. With a 3.5 mm cable, your PC's onboard audio does it. With USB, the speakers or an adapter do it. With optical, the receiving device does it. A good onboard codec is fine for most people, but electrical noise inside a PC can show up as a hiss or a hum on a cheap or poorly shielded analogue output.",
        "That is why USB or optical can sound cleaner in some setups, though the improvement depends on your motherboard and the speakers. If your system already sounds clean over 3.5 mm, there is usually no reason to change. If you hear buzzing that changes with the mouse or GPU activity, a USB audio device often removes it.",
        "Hum from a loop between the PC and a separate powered device is another cause. Try plugging both into the same power strip or use a ground-loop isolator, and avoid running audio cables alongside power cables.",
      ],
    },
    {
      kind: "explanation",
      heading: "Optical and Bluetooth have their own quirks",
      paragraphs: [
        "Optical (TOSLINK) carries digital audio as light and is immune to electrical interference. It handles two-channel PCM, and compressed surround formats such as Dolby Digital and DTS, but not the high-bitrate or lossless formats. If the speakers do not play, check the Windows sound settings for the format the device accepts, and make sure the output is set to PCM if you only need stereo.",
        "Bluetooth is convenient but compresses audio, and the codec used depends on both devices. SBC is universal, while AAC, aptX and LDAC need support on both ends. Delay can be noticeable when watching video or gaming, although many players compensate for it. Keep Bluetooth for casual listening and use a cable for gaming and editing.",
        "Soundbars and monitors with speakers often use HDMI ARC or the monitor's audio output instead. If your speakers are in a TV or monitor, check whether the input accepts audio from a PC.",
      ],
    },
    {
      kind: "decision-table",
      heading: "Picking by use",
      columns: ["Use", "Connection", "Why"],
      rows: [
        ["Desk speakers, simple setup", "3.5 mm or USB", "Easy and widely supported"],
        ["Noise or hum on analogue", "USB or optical", "Takes conversion away from the PC's onboard audio"],
        ["Soundbar with a TV or monitor", "HDMI ARC or optical", "Match what the soundbar accepts"],
        ["Casual music from a laptop", "Bluetooth", "No cables; accept some delay"],
        ["Gaming or video editing", "Wired", "Avoids Bluetooth delay"],
      ],
    },
    {
      kind: "check-your-pc",
      heading: "Check your jacks and settings",
      items: [
        { label: "Jack colours", how: "On a desktop, green is usually line out for speakers, pink is the microphone and blue is line in; check your motherboard manual." },
        { label: "Default device", how: "In Windows sound settings, set the speakers as the default output and test each device." },
        { label: "Optical port", how: "Look for a square TOSLINK socket on the motherboard or graphics card; if there is none, a USB audio adapter with optical output is an option." },
      ],
    },
  ],
};

const more: Record<string, GuideModule[]> = {};

more["mouse-polling-rate-and-dpi-explained"] = [
  {
    kind: "decision-table",
    heading: "If the cursor misbehaves, check this next",
    intro: "Most sensitivity and stutter complaints have a short list of causes. Work down the list in order and change one thing at a time so you know which fix worked.",
    columns: ["What you see", "Likely cause", "What to check"],
    rows: [
      ["The cursor skips or freezes for a moment", "Dropped reports from a crowded USB path, a weak wireless link or a power-saving setting", "Move the dongle or cable to a rear motherboard port, use a short extension to bring a receiver into line of sight, and turn off USB selective suspend if the mouse sleeps"],
      ["Movement feels different in every game", "Each game has its own sensitivity scale", "Keep DPI fixed and adjust only the in-game value; many shooters publish a sensitivity converter"],
      ["The pointer speeds up when you swipe fast", "Acceleration is on in Windows or in the game", "Untick Enhance pointer precision and look for a raw input option in the game's settings"],
      ["The cursor drifts or jumps on one part of the desk", "Surface texture, glass or a dirty sensor window", "Try a mouse pad, clean the sensor opening and compare on a different surface"],
      ["The game stutters after switching to 4000 or 8000 Hz", "Higher polling rates generate far more input events for the CPU to process", "Drop back to 1000 Hz in the mouse software and compare the same scene"],
      ["The saved DPI changes on its own", "A profile or DPI stage button changed the active stage", "Check the DPI indicator light or the maker's software, and save a default profile to the mouse's onboard memory if it supports one"],
    ],
  },
  {
    kind: "explanation",
    heading: "Mac, consoles and other setups",
    paragraphs: [
      "macOS handles pointer movement with its own tracking speed slider in System Settings under Mouse, and it applies its own acceleration curve, so the same DPI feels different from Windows on the same hardware. Most gaming mouse software, including DPI stage buttons, works from the mouse itself, but some makers' configuration apps are Windows-only or have fewer features on Mac. Check the maker's support page for macOS before buying if you plan to change settings there.",
      "A mouse on a console is a different case. Mouse support on PlayStation 5 and Xbox consoles depends on the individual game, and many games do not read a mouse at all, so confirm that your game lists mouse and keyboard support before planning around it. The polling rate you set on a PC does not carry over; the console decides how it reads the device.",
      "If you use a KVM switch or a USB hub, test the mouse through it at your target polling rate. Some switches and unpowered hubs cap the rate or add delay, so a mouse set to a high polling rate may behave like a slower one. Plugging the mouse directly into the PC for one test session is the quickest way to find out.",
    ],
  },
  {
    kind: "explanation",
    heading: "Questions readers ask most",
    paragraphs: [
      "Is a higher DPI better? No. DPI sets how far the cursor moves for a given hand movement, and the best value is the one that lets you aim comfortably at your usual screen resolution. A higher number only gives finer steps if you lower the in-game sensitivity to compensate, so the two settings are best chosen together.",
      "Does a high polling rate improve aim? It reports your movement more often, which can make the cursor feel smoother on a fast display, but it does not change accuracy. If you cannot tell the difference between 1000 Hz and a higher rate in a blind comparison, the lower rate costs less CPU and, on wireless mice, less battery.",
      "Why does my wireless mouse show a lower battery life than the box says? Makers usually quote battery life at a stated polling rate, light setting and connection mode. Raising the polling rate or turning lighting up shortens that figure, so read the small print under the headline number before comparing two mice.",
    ],
  },
];

more["wired-vs-2-4-ghz-vs-bluetooth-mice-and-keyboards"] = [
  {
    kind: "decision-table",
    heading: "Pick by the job the device does",
    intro: "The right connection depends on what you do at the desk and how many machines share it. Use this as a starting point, then check the specific model's documentation.",
    columns: ["Use", "Connection that usually fits", "Why"],
    rows: [
      ["Fast shooters or rhythm games", "Wired, or 2.4 GHz from the maker's own receiver", "No pairing step and a dedicated radio path keep the signal consistent"],
      ["General office typing and browsing", "Bluetooth or 2.4 GHz", "Latency is rarely noticeable and a free USB port matters more"],
      ["One keyboard shared between a PC and a laptop", "Bluetooth with multiple pairing slots", "You switch hosts with a key press instead of moving a dongle"],
      ["A PC in a cabinet or behind a metal case", "Wired, or a receiver on a short extension cable", "Metal and distance weaken the radio link"],
      ["Entering BIOS or running recovery tools", "Wired, or a 2.4 GHz receiver that behaves as a standard keyboard", "Bluetooth usually has no pairing before Windows loads"],
      ["A couch or media PC across the room", "Bluetooth or 2.4 GHz with a receiver in a front port", "Range matters, and the receiver needs a clear line to the device"],
    ],
  },
  {
    kind: "steps",
    heading: "Fixing a wireless mouse or keyboard that lags or drops",
    intro: "Work through these in order. Each step takes a minute and rules out one cause.",
    steps: [
      { title: "Check the battery first", body: "A low battery causes stuttering and missed keystrokes before it causes a complete shutdown. Replace or charge it, then retest." },
      { title: "Move the receiver closer", body: "Plug the dongle into a short USB extension on the desk so it has a clear view of the device. A rear port behind a metal case can hurt the link." },
      { title: "Separate it from other radios", body: "USB 3.0 ports and some drives produce noise near 2.4 GHz, so try a port away from a fast external drive or a Wi-Fi adapter dongle." },
      { title: "Check the pairing mode", body: "Tri-mode devices have a switch or key for choosing 2.4 GHz or Bluetooth. If the lights show the wrong mode, the device may be talking to another host." },
      { title: "Update the firmware and drivers", body: "The maker's app sometimes carries a firmware update for the mouse, keyboard or receiver. Install it only from the maker's own site." },
      { title: "Re-pair from scratch", body: "On Windows, remove the Bluetooth device in Settings, reset the pairing on the device and add it again. For a dongle, use the maker's pairing tool if one exists." },
    ],
  },
  {
    kind: "explanation",
    heading: "Mac, laptops and consoles",
    paragraphs: [
      "Bluetooth is the usual route on a Mac or laptop with no spare ports, and macOS and Windows handle it differently. A keyboard's modifier keys may need remapping in macOS settings, because Windows-labelled Alt and Windows keys swap roles with Option and Command. Many keyboards ship with a switch or a keyboard-layout toggle for this, so check the manual.",
      "Receivers are another point. Some 2.4 GHz dongles are USB-A only, so a thin laptop with USB-C ports needs an adapter. Confirm the dongle's host support, since some are tested on Windows only.",
      "On consoles, the rules vary. A wired USB keyboard is accepted by most consoles for text entry, while wireless dongles often are not recognised. Treat console use as a separate compatibility check with the console maker's accessories list.",
    ],
  },
  {
    kind: "explanation",
    heading: "Questions readers ask most",
    paragraphs: [
      "Does Bluetooth really add noticeable lag? On many devices the difference is small for typing and browsing, and larger for fast aiming. Latency also depends on the Bluetooth version, the adapter in your PC and whether the maker tuned the device, so published comparisons from vendors are best treated as approximate.",
      "Can I use one receiver for a mouse and a keyboard? Only if the maker designed them to share one. Some brands bundle a combo with one dongle, and others offer a unifying receiver that pairs several devices. A receiver from a different brand will not normally pair.",
      "Is wired still worth it? Yes for a desktop that stays put, since it removes batteries, pairing and radio problems from the picture. The cost is a cable you can feel at the mouse, which good flexible cables reduce.",
    ],
  },
];

more["keyboard-layouts-compared-full-size-tkl-75-65-60"] = [
  {
    kind: "decision-table",
    heading: "Key counts and what each layout keeps",
    intro: "Counts vary by region and maker, so treat them as ranges. Check the listed key count and the picture of the layout before ordering.",
    columns: ["Layout", "Typical key count", "Keeps", "Moves behind Fn or drops"],
    rows: [
      ["Full size", "About 104 to 108", "Everything, including the numpad", "Nothing"],
      ["TKL (80%)", "About 87 to 92", "Function row, arrows, navigation block", "Numpad"],
      ["75%", "About 80 to 84", "Function row, arrows, some navigation keys", "Numpad, most of the navigation block"],
      ["65%", "About 65 to 70", "Arrows, a few navigation keys", "Function row (on the number row), numpad"],
      ["60%", "About 60 to 64", "Main alphanumeric block", "Arrows, function row, navigation keys, numpad"],
    ],
  },
  {
    kind: "steps",
    heading: "Trial a smaller layout before you commit",
    intro: "Moving down a size changes habits, so test it with the keyboard you already own.",
    steps: [
      { title: "Cover or ignore the numpad for a week", body: "Use only the number row and see how often you reach for the numpad. Frequent number entry points to full size or a separate numpad." },
      { title: "Log your arrow and navigation use", body: "Note how often you use Home, End, Page Up, Page Down and Delete in editors and spreadsheets. A 60% layout moves them to Fn layers." },
      { title: "Measure your mouse space", body: "Measure the gap between the keyboard's right edge and your mouse. If you sweep the mouse wide in games, a TKL or smaller board gains that space." },
      { title: "Check the Fn layer map", body: "Read the layer diagram in the manual and see how many shortcuts you would have to relearn." },
      { title: "Plan the keycaps", body: "Layout standards differ in the bottom row and shift keys, so a replacement keycap set may not fit every layout. Check the keycap set's compatibility list." },
    ],
  },
  {
    kind: "explanation",
    heading: "Workloads that change the answer",
    paragraphs: [
      "People who type in spreadsheets, accounting software or data entry tools gain the most from a full-size layout, because the numpad lets one hand enter figures while the other holds a document. If you keep a full-size board but dislike the mouse position, a separate numpad on the left can be a middle path.",
      "Programmers and writers often settle on TKL, 75% or 65%, because arrows, Home and End are used constantly in editors. Check the arrow cluster on the layout: some 65% designs put the arrows close to the right Shift in a way that takes time to learn, and some 75% boards squeeze the function row against the number row.",
      "Gamers who need mouse room often choose TKL or smaller. Check the games you play for key binds that use the numpad, function row or navigation block, because a smaller board needs Fn layers or remapping for them.",
    ],
  },
  {
    kind: "compatibility",
    heading: "Layout labels that catch buyers out",
    notes: [
      "ANSI and ISO: the US ANSI layout has a wide Enter and a long left Shift, while ISO has an L-shaped Enter and a shorter left Shift with an extra key beside it. Keycap sets are made for one or the other, so check both the board and the cap kit.",
      "Hot-swap and keycaps: a board with standard bottom-row sizes accepts more aftermarket sets, while unusual spacebars and right-side modifier sizes limit choice on compact layouts.",
      "Software support: some compact boards depend on the maker's app to remap keys. Check whether remapping is stored on the board or only works while the app runs.",
      "Operating system: Windows and Mac keycaps differ in the modifier row, and many boards offer a switch to flip Alt and Command roles. Check the manual for the layout toggle.",
    ],
  },
  {
    kind: "explanation",
    heading: "Questions readers ask most",
    paragraphs: [
      "Will I miss the function row on a 65% board? That depends on whether you use F-keys for shortcuts, such as F2 to rename or F5 to refresh. On a 65% they sit behind Fn on the number row, so it adds a key press and takes a short time to learn.",
      "Is a 75% just a TKL with less spacing? Close, but the compact grid and a different keycap fit means the feel and the keycap options differ, so look at the layout drawing instead of the label.",
      "Can I add a numpad later? Yes, a separate USB numpad works with any layout, though it adds another cable or receiver.",
    ],
  },
];

more["usb-vs-xlr-microphones"] = [
  {
    kind: "decision-table",
    heading: "Pick by what you record",
    intro: "The connector matters less than whether the setup fits the work. These are starting points, not rules.",
    columns: ["What you record", "Usually a good fit", "What to watch"],
    rows: [
      ["Video calls and meetings on one PC", "USB microphone or a headset", "Position it close to your mouth and away from the keyboard"],
      ["Solo streaming or voice-over", "USB, or XLR with a small interface", "A dynamic capsule suits an untreated room better than a sensitive condenser"],
      ["A two-person podcast in one room", "Two XLR microphones and an interface with two inputs", "Check the interface has two preamps and a headphone output for each person"],
      ["Singing or instruments", "XLR, often a condenser", "Check phantom power, noise and interface input type"],
      ["A laptop used on the move", "USB-C or USB-A mic", "Check the plug type, cable length and whether it works without a driver"],
      ["A room with fans, keyboards or traffic", "A dynamic microphone close to the mouth", "Condensers pick up more of the room, so treat the space or move closer"],
    ],
  },
  {
    kind: "steps",
    heading: "Setting levels in Windows without clipping",
    intro: "A clean level matters more than any microphone upgrade. These steps work for both USB and interface-connected microphones.",
    steps: [
      { title: "Select the right input", body: "Open Settings, System, Sound and pick the microphone under Input. Many headsets and webcams appear as separate devices, so make sure the one you want is chosen." },
      { title: "Turn off auto-levelling where you can", body: "Some drivers and communication apps adjust the level on their own. Disable that in the app's audio settings if it makes your voice pump or fade." },
      { title: "Set gain with your loudest voice", body: "Speak or read at your normal volume, then raise your loudest moment. The meter should peak below the top, not at it. Leave headroom." },
      { title: "Check phantom power", body: "Turn on the interface's 48V button only if your microphone is a condenser that needs it. Dynamic microphones do not need it, and some ribbon models can be damaged by it." },
      { title: "Listen on headphones", body: "Record a short clip and play it back through headphones to check for hiss, popping and room echo before you start a session." },
      { title: "Keep apps from taking control", body: "In the device's Properties, Advanced tab, the exclusive-mode options let one app lock the device. Turn them off if a second app cannot hear the microphone." },
    ],
  },
  {
    kind: "decision-table",
    heading: "If it sounds wrong, check this",
    intro: "Most audio problems come from placement and settings rather than from the microphone.",
    columns: ["What you hear", "Likely cause", "What to try"],
    rows: [
      ["A hiss or constant background noise", "Gain turned up to compensate for a quiet capsule or distance", "Move closer and lower the gain; consider a dynamic microphone or a preamp with more clean gain"],
      ["Harsh popping on P and B sounds", "Plosives hitting the capsule", "Add a pop filter and speak slightly off-axis"],
      ["Boomy, thick low end", "Proximity effect from speaking very close to a directional capsule", "Move back a little or use the low-cut switch if the microphone has one"],
      ["Hollow, echoey room sound", "Hard walls and a distant microphone", "Move closer and add soft furnishings behind the microphone and behind you"],
      ["Distortion when you laugh or shout", "Level too hot at the input", "Lower the gain, not just the Windows slider"],
      ["Keyboard and mouse clicks louder than your voice", "Microphone pointing at the desk or sitting on it", "Use a boom arm or shock mount and aim it away from the keys"],
    ],
  },
  {
    kind: "explanation",
    heading: "USB microphones on Mac and consoles, and XLR adapters",
    paragraphs: [
      "Many USB microphones are class-compliant, which means macOS and Windows use a built-in driver and the device appears without extra software. Check the maker's page, since some offer a companion app for gain or monitoring that is Windows-only or Mac-only. On consoles, USB microphone support is not guaranteed and varies by console and game, so confirm it before buying for that use.",
      "An XLR-to-USB cable is a way to plug an XLR microphone straight into a PC, and it usually contains a small preamp and converter. It is a stopgap rather than a replacement for an interface, and phantom power is typically not provided, so it suits dynamic microphones. Check the cable's listing for gain control and phantom power before you buy it for a condenser.",
      "Hybrid microphones with both USB and XLR outputs let you start on a USB cable and move to an interface later. They are worth considering when you expect your setup to grow, though a hybrid costs more than a plain USB model.",
    ],
  },
  {
    kind: "explanation",
    heading: "Questions readers ask most",
    paragraphs: [
      "Is XLR always better quality? No. Quality depends on the capsule, the preamp, the converter and the room. A well-made USB microphone can beat a cheap XLR microphone plugged into a cheap interface, and an XLR chain gives you more parts to upgrade one at a time.",
      "Do I need an audio interface for a dynamic microphone? Yes for XLR, because the PC has no XLR input. Some dynamic microphones are quiet and need an interface with clean gain, so check the microphone's sensitivity and the interface's maximum gain.",
      "What is the simplest upgrade for bad audio? Often it is distance and room treatment, not hardware. Moving the microphone a hand's width from your mouth, away from the keyboard, usually changes the result more than a new microphone.",
    ],
  },
];

more["headset-connection-types-for-pc-ps5-and-xbox"] = [
  {
    kind: "steps",
    heading: "Setting up a headset on Windows so voice and game audio work",
    intro: "A headset that works on one app and not another is usually pointed at the wrong default device.",
    steps: [
      { title: "Plug in and wait for Windows to finish", body: "A USB headset may install a driver on first use. Give it a moment before you open a game or call." },
      { title: "Choose the playback device", body: "Open Settings, System, Sound, and select the headset under Output. If the headset has a separate chat and game channel, choose the one you want as the default." },
      { title: "Choose the microphone", body: "Select the headset under Input and speak to watch the level meter move. If it does not, check the mute switch on the headset and in Windows." },
      { title: "Check app-level settings", body: "Voice chat apps and games keep their own device choices. Open each app's audio settings and select the headset instead of Default." },
      { title: "Keep the privacy switch in mind", body: "Windows has a microphone privacy setting that can block apps. If an app cannot hear you, check that microphone access is allowed." },
    ],
  },
  {
    kind: "decision-table",
    heading: "Which connection to pick by your main use",
    intro: "Use this as a first pass, then confirm the exact model on the maker's compatibility page.",
    columns: ["Main use", "Connection that usually fits", "Why"],
    rows: [
      ["One desktop PC", "USB or 3.5mm", "Both are simple on a desktop, and USB brings its own sound processing"],
      ["PC plus PS5", "USB with PS5 support, or 3.5mm into the controller", "Many USB headsets work on both, but confirm the PS5 on the box"],
      ["PC plus Xbox", "Xbox Wireless headset or 3.5mm", "Xbox is picky about USB and dongles, so the maker's note on Xbox compatibility decides it"],
      ["All three platforms", "3.5mm wired, or a headset with a documented multi-platform dongle", "The jack is the most widely accepted connection, though a console jack gives less control over chat mix"],
      ["Phone or tablet as well", "Bluetooth in addition to a dongle", "Check that the headset can keep Bluetooth active alongside a PC link"],
      ["A laptop with one combined jack", "USB, Bluetooth or a combined 3.5mm TRRS plug", "A four-pole plug is needed for microphone and audio on one jack"],
    ],
  },
  {
    kind: "explanation",
    heading: "Latency, chat mix and the limits of a 3.5mm jack",
    paragraphs: [
      "A 3.5mm headset has no wireless link and no dongle, so it adds no wireless delay. The tradeoff is that a console controller's jack carries game audio and chat through one simple connection, so you typically get the console's own volume control rather than a separate chat and game balance dial. If you want a game and chat mixer, look for a headset or a base station that documents one.",
      "A wireless headset with a USB dongle uses a radio link that makes its own delay, usually small enough that it is hard to notice for most games. If you notice lip-sync drift in video, try the wired connection or check for a low-latency mode on the headset.",
      "Surround processing is another point to check. PS5 has its own 3D audio feature that works with many headsets, and Windows has spatial sound options. Treat surround claims on the box as the maker's description, and compare them in your own games before paying extra for a feature you may not use.",
    ],
  },
  {
    kind: "compatibility",
    heading: "Compatibility checks before ordering",
    notes: [
      "Console named on the box: look for your exact console, such as PS5 or Xbox Series X|S. A line saying only console compatible does not tell you which.",
      "Dongle type: a USB-A dongle may need an adapter on a laptop with USB-C ports only. The dongle usually pairs with its own headset and not with a different brand.",
      "Controller port: Xbox and PS5 controllers have a 3.5mm port, but a headset with a four-pole TRRS plug is needed for microphone and sound together. A three-pole plug gives sound only.",
      "Battery and charging: check hours at the setting the maker quotes and whether the headset can play while it charges, which matters if you use it for long sessions.",
      "Software: a companion app may be needed for equalizer and microphone options and may be Windows-only. Check before you buy for Mac.",
    ],
  },
  {
    kind: "explanation",
    heading: "Questions readers ask most",
    paragraphs: [
      "Can I use a PS5 headset on a PC? Often yes, if it uses a USB dongle or 3.5mm jack that Windows recognises, though app features may be limited. Check whether the dongle works without the console.",
      "Why does my Xbox not recognise my USB headset? The console accepts only certain accessory types, and many generic USB headsets are not among them. Use a headset the maker lists for Xbox or a 3.5mm headset in the controller.",
      "Does a wireless headset sound worse than a wired one? Not necessarily. Sound quality comes down to the drivers, tuning and the codec or radio link, so compare reviews that describe the specific model, not the connection type alone.",
    ],
  },
];

more["usb-speed-names-for-external-ssds-decoded"] = [
  {
    kind: "steps",
    heading: "Find out what your port and cable can really do",
    intro: "A fast SSD only runs fast if the port, cable and drive all agree. This takes about five minutes.",
    steps: [
      { title: "Read the port label", body: "Look at the spec sheet for your motherboard or laptop. It lists each USB port with a speed, such as 5 Gbps, 10 Gbps, 20 Gbps or 40 Gbps." },
      { title: "Read the drive and cable", body: "Check the SSD's listed interface and whether the supplied cable matches it. A cable rated for a lower speed holds the whole link down." },
      { title: "Plug into the right port", body: "Use the port that the spec sheet says runs at the drive's speed, not just any USB-C port." },
      { title: "Copy a large file", body: "Copy a few gigabytes of one large file and watch the transfer rate in Windows. Many small files will always run slower, so use one big file." },
      { title: "Check Device Manager or System Information", body: "On Windows, Device Manager lists USB controllers and attached drives. On a Mac, System Information, USB shows the negotiated speed for each device." },
      { title: "Try another cable", body: "If the speed is lower than expected, swap in the cable that came with the drive before blaming the port." },
    ],
  },
  {
    kind: "decision-table",
    heading: "Real-world ranges and what limits them",
    intro: "These ranges are approximate and depend on the drive, file type and host. Treat them as an orientation, not a promise.",
    columns: ["Link", "Theoretical rate", "Typical practical ceiling", "What limits it"],
    rows: [
      ["USB 2.0", "480 Mbps", "A few tens of MB per second", "The interface itself"],
      ["USB 5 Gbps (3.2 Gen 1)", "5 Gbps", "Often around 400 to 500 MB/s", "Link speed and protocol overhead"],
      ["USB 10 Gbps (3.2 Gen 2)", "10 Gbps", "Often approaching 1,000 MB/s", "The drive controller, heat and the host"],
      ["USB 20 Gbps (3.2 Gen 2x2)", "20 Gbps", "Higher, only with a matching host port", "Few PCs include a 20 Gbps port"],
      ["USB4 and Thunderbolt", "40 Gbps", "Depends on the enclosure and the drive", "The enclosure's bridge chip and the drive"],
    ],
  },
  {
    kind: "explanation",
    heading: "Consoles, Macs and what the drive is used for",
    paragraphs: [
      "On consoles, an external drive has a narrower job than on a PC. PlayStation 5 can run PlayStation 4 games from a USB drive but plays PS5 titles from its internal or M.2 storage, and Xbox Series X|S uses an external drive for Xbox One and older games while Series games need the internal drive or the maker's expansion card. Check the console maker's storage page for the current rules before buying.",
      "On a Mac, USB-C ports often run at the Thunderbolt or USB4 rate, so a fast drive can reach its rated speed. Older Macs have slower ports, so look up your model's port speeds in its technical specifications. A drive formatted for Windows may need reformatting to work as a Mac boot or backup drive, which erases it, so back up first.",
      "The job decides how much speed matters. Copying a few photos does not benefit much from 10 Gbps, while moving a large video library or running a game library from the drive does. Pay for the tier you can actually use.",
    ],
  },
  {
    kind: "mistakes",
    heading: "More mistakes with USB speed names",
    items: [
      { mistake: "Assuming a USB-C plug means a fast port", instead: "The connector shape says nothing about speed, so look up the port's rating." },
      { mistake: "Buying a 20 Gbps drive for a 10 Gbps port", instead: "The drive will run at the lower speed, so match the drive to the port you own or plan to buy." },
      { mistake: "Using a charging cable for data", instead: "Some USB-C cables carry power with slow data. Use the cable supplied with the drive or one rated for the speed." },
      { mistake: "Judging speed with many small files", instead: "Test with one large file to see the link speed, then judge workloads separately." },
      { mistake: "Forgetting heat", instead: "Some small SSDs slow down during long transfers when they get hot. Check reviews for sustained write results if you move large files often." },
    ],
  },
  {
    kind: "explanation",
    heading: "Questions readers ask most",
    paragraphs: [
      "Is USB 3.2 Gen 2 the same as USB 3.1 Gen 2? Yes, both names refer to 10 Gbps. The USB-IF renamed the standards, and some products still carry the older label.",
      "Will a 10 Gbps SSD work in a 5 Gbps port? Yes, it will connect and run at the lower speed, since USB is backward compatible.",
      "Do I need Thunderbolt for an external SSD? Not for most uses. Thunderbolt and USB4 give a higher ceiling, but a 10 Gbps drive covers most home workloads, so choose faster only if your workload needs it.",
    ],
  },
];

more["portable-ssd-vs-external-hard-drive"] = [
  {
    kind: "decision-table",
    heading: "Match the drive to the job",
    intro: "The right drive depends on how often you touch the files and how much you can lose. These are starting points.",
    columns: ["Job", "Usually a better fit", "Why"],
    rows: [
      ["Carry working files between a desk and a laptop", "Portable SSD", "No moving parts and quick access to many small files"],
      ["Edit video directly from the drive", "Portable SSD at 10 Gbps or faster", "Timeline scrubbing needs fast reads and fast access to many small pieces"],
      ["Keep a large archive of photos or media", "External hard drive", "More capacity per pound or euro spent"],
      ["Run a console game library", "SSD where the console allows it", "Load times and the console's own rules decide, so check the console's storage page"],
      ["A second copy of a backup", "External hard drive", "Capacity is cheap and the drive can stay in a drawer between backups"],
      ["Store files you rarely open", "Either, plus a second copy elsewhere", "No single drive is a backup, whichever type you choose"],
    ],
  },
  {
    kind: "explanation",
    heading: "Shingled recording, sustained writes and what to look for",
    paragraphs: [
      "Hard drives record data in two main ways. Conventional recording writes each track separately, while shingled magnetic recording overlaps tracks to fit more data on a platter. Shingled drives can become much slower when you write a large amount of data in one go, because the drive has to rewrite neighbouring tracks, and many makers do not state the recording method prominently on consumer drives. If you plan to write hundreds of gigabytes at a time, check reviews or the maker's data sheet for the recording method.",
      "Solid-state drives have their own limit. Many portable models write quickly at first into a fast cache and then slow down once the cache fills, and small enclosures can reduce speed when they get warm. For short transfers you may never notice, but for a multi-hour video export, look at sustained write figures in independent reviews and attribute them to the drive and capacity tested.",
      "Capacity affects performance as well as price. A larger SSD usually has more memory chips working in parallel, so two capacities of the same model can have different speeds. Compare the figure for the exact capacity you plan to buy.",
    ],
  },
  {
    kind: "steps",
    heading: "Protect the data on either drive",
    intro: "Storage type is secondary to how you manage the files on it.",
    steps: [
      { title: "Keep two copies on different devices", body: "A common rule is three copies on two kinds of storage, with one off-site. Even two drives in different places is better than one." },
      { title: "Choose a file system on purpose", body: "NTFS suits Windows, APFS and HFS+ suit Mac, and exFAT works on both but lacks some protections. Format to match where you will use the drive." },
      { title: "Turn on encryption if the drive travels", body: "BitLocker on Windows and FileVault or encrypted volumes on Mac can protect the contents if the drive is lost. Keep the recovery key somewhere safe." },
      { title: "Check drive health occasionally", body: "SMART status in the maker's tool or a disk utility can show warnings. It does not predict every failure, so it is not a substitute for a backup." },
      { title: "Eject before unplugging", body: "Use the eject option so the system finishes writing. This matters most for hard drives, which may have data in memory." },
      { title: "Move old data before a drive is old", body: "Plan to copy archives to a new drive every few years, since no storage is guaranteed to last indefinitely." },
    ],
  },
  {
    kind: "explanation",
    heading: "Noise, power and handling",
    paragraphs: [
      "A portable hard drive spins, so it makes a quiet noise and is more sensitive to bumps while it is running. Moving it gently, or waiting for it to stop, matters more than with an SSD. An SSD has no moving parts, so it is quiet and generally tolerates being carried while in use.",
      "Power is the other practical difference. A small hard drive can draw more current to spin up than an SSD, and laptop ports or unpowered hubs sometimes struggle to provide it. If the drive clicks, disconnects or fails to mount, try a port directly on the computer before suspecting the drive. Desktop-size external hard drives have their own power adapter.",
      "Consider a network drive if several computers need the same files. A NAS or a drive on a router can serve a household, though it adds setup and its own backup needs.",
    ],
  },
  {
    kind: "explanation",
    heading: "Questions readers ask most",
    paragraphs: [
      "Is a portable SSD worth the extra cost? It is when you carry the drive, edit from it or want less waiting, and not when the drive sits in a drawer holding a backup. Decide by how often you read it.",
      "How long do portable drives last? There is no single answer, since it depends on use, handling and the drive. That is why a second copy matters more than the type.",
      "Can I use one drive for backup and storage? You can, but then it holds your only copy of those files, so it is not a backup. Keep the backup on a separate drive.",
    ],
  },
];

more["how-to-size-an-office-chair-to-your-height-and-desk"] = [
  {
    kind: "steps",
    heading: "Set a chair to fit you, step by step",
    intro: "Do these in order, because each setting affects the next. Wear the shoes you normally wear at the desk.",
    steps: [
      { title: "Start with the seat height", body: "Stand beside the chair and raise or lower the seat until its top sits just below your kneecap. Sit back and check that your feet are flat and your knees are about level with your hips." },
      { title: "Set the seat depth", body: "Sit with your back against the backrest and see if two to three fingers fit between the back of your knee and the seat front. Use the seat slider if the chair has one." },
      { title: "Adjust the backrest", body: "Position the lumbar support and tilt so the backrest meets your back without pushing you forward. Tilt tension should hold you without a fight." },
      { title: "Set the armrests", body: "Lift them so your forearms rest level with the desk and your shoulders stay relaxed, not hunched." },
      { title: "Adjust the desk or add a footrest", body: "If the chair is right but your forearms are too high or low, change the desk height or add a footrest. Do not raise your shoulders to reach." },
      { title: "Check your screen", body: "Re-set the monitor height after you change the chair. The top of the screen should sit at or just below eye level." },
    ],
  },
  {
    kind: "decision-table",
    heading: "If something feels off, check this",
    intro: "These are fit problems, not medical advice. Persistent discomfort deserves a conversation with a clinician.",
    columns: ["What you notice", "Likely fit issue", "What to try"],
    rows: [
      ["Feet dangle or sit on tiptoes", "The seat is too high for the desk", "Lower the seat or add a footrest, then check the desk height"],
      ["Pressure behind the knees", "The seat is too deep or too high", "Lower the seat, then shorten the depth with the slider"],
      ["Knees sit higher than hips", "The seat is too low", "Raise it and check the desk allows it"],
      ["Shoulders creep up while typing", "The desk or keyboard is too high, or armrests are too high", "Lower the armrests or the keyboard, or raise the chair and add a footrest"],
      ["You lean forward to read", "The screen is too far or too low", "Move the monitor closer and check the height"],
      ["The seat does not reach the correct height", "The chair's range does not fit your height", "Check the stated range or look for a model with a taller or shorter gas lift"],
    ],
  },
  {
    kind: "explanation",
    heading: "Weight rating, materials and shopping for a different build",
    paragraphs: [
      "Check the stated weight rating for the chair and give yourself some margin. A chair used for long days sees the same load every day, so a rating near your weight leaves little spare. Large and tall models list higher ratings and bigger seat sizes, and petite users can find chairs with a shallower seat and lower height range.",
      "Materials change the feel. Mesh backs and seats let air through and give a firmer feel, while foam is softer and warmer. Neither is better for every body, and comfort differs between people, so a return window matters more than the label.",
      "Floor type also matters. Standard casters suit hard floors and can roll too freely on them, while soft casters are made for hard floors and hard ones for carpet. Check which type the chair ships with.",
    ],
  },
  {
    kind: "mistakes",
    heading: "More sizing mistakes",
    items: [
      { mistake: "Ordering by the label on the box", instead: "Check the stated seat height range, seat depth and weight rating against your own measurements." },
      { mistake: "Skipping the desk height", instead: "A chair cannot make up for a desk that is too high or too low, so measure from the floor to the underside of the desk." },
      { mistake: "Ignoring the return policy", instead: "Fit is personal, so check how long you can try the chair and who pays for return shipping." },
      { mistake: "Buying armrests you cannot adjust", instead: "Fixed armrests that clash with the desk edge may force a poor position, so check height and width adjustment." },
    ],
  },
  {
    kind: "explanation",
    heading: "Questions readers ask most",
    paragraphs: [
      "Do I need a footrest? If your feet are flat on the floor after you set the seat height, no. If you have to raise the seat for the desk and your feet no longer reach, a footrest closes the gap.",
      "Is a taller chair better for a tall person? Only if the seat height range and depth match, so look at the range and the depth, not just the label.",
      "How long should it take to get used to a new chair? There is no fixed time, and if it feels wrong after a short trial, adjust it again or return it.",
    ],
  },
];

more["how-to-choose-a-monitor-arm-vesa-weight-and-desk-clamps"] = [
  {
    kind: "steps",
    heading: "Set the tension and position after installing",
    intro: "A gas-spring arm needs adjusting once the monitor is on it.",
    steps: [
      { title: "Mount the monitor with the arm at its lowest", body: "Attach the monitor bracket first, then clamp the arm and hang the monitor. Keep the arm low while you attach so it cannot swing up." },
      { title: "Set the tension", body: "Use the adjustment screw or hex key from the box. Turn it until the monitor stays where you leave it without drifting up or down." },
      { title: "Set height and distance", body: "Place the top of the screen at or just below eye level and about an arm's length away, then adjust for your own comfort." },
      { title: "Check swing and clearance", body: "Move the arm through its range to be sure it does not hit the wall, a second monitor or a standing desk's frame." },
      { title: "Route the cables", body: "Use the arm's cable clips and leave slack for movement so no plug is pulled when the monitor moves." },
      { title: "Recheck the clamp after a week", body: "Clamps can settle on a new desk, so tighten as the manual describes and check the arm still holds." },
    ],
  },
  {
    kind: "decision-table",
    heading: "VESA patterns and what to measure",
    intro: "Always compare the arm's supported patterns with the monitor's, and the arm's weight range with the weight of the monitor without its stand.",
    columns: ["Check", "Where to find it", "What to compare"],
    rows: [
      ["VESA pattern", "The monitor's spec page or the back panel", "Common patterns are 75 x 75 mm and 100 x 100 mm; some larger screens use others"],
      ["Monitor weight without stand", "The monitor's manual or spec sheet", "It must sit inside the arm's rated weight range, not at the extreme end"],
      ["Screen size and width", "The monitor's dimensions", "Check the arm lists support for your screen size, especially ultrawide and curved models"],
      ["Desk edge thickness", "A tape measure at the desk edge", "It must fit the clamp's stated thickness range"],
      ["Space behind the desk", "The gap between the desk and the wall", "Clamps need room, so check the arm's rotation clearance"],
      ["Monitor screw thread", "The monitor manual", "Use the screws supplied or those the manual names, so you do not damage the panel"],
    ],
  },
  {
    kind: "explanation",
    heading: "Ultrawide, curved and dual monitors",
    paragraphs: [
      "Wide and curved screens put weight farther from the arm's pivot, so a rating that works for a flat screen of the same weight may not hold. Look for arms that list ultrawide or heavy screen support, and check that the VESA bracket is wide enough for the monitor's mount.",
      "For two monitors, you can use two single arms or one dual arm on a single clamp. A dual arm saves desk space but loads the clamp more, so check the arm's rating and the desk's strength. Two single arms let you place each screen independently.",
      "If a monitor has no VESA mount, an adapter bracket may fit, though the adapter has its own weight and fit limits. Check the adapter against the monitor's model before buying.",
    ],
  },
  {
    kind: "compatibility",
    heading: "Desk and wall checks",
    notes: [
      "Glass tops: a clamp can crack glass, so use a reinforcement plate or choose a mount that does not squeeze the glass, and check the maker's advice.",
      "Standing desks: check the arm's reach and the desk's travel so the screen does not hit a wall, a shelf or the frame as the desk moves.",
      "Thin or hollow desks: check the clamp pad and the desk's maker note on how much load the edge can take, and use a plate if offered.",
      "Wall mounts: they must be fixed into studs or suitable anchors for your wall, and the wall type decides the hardware, so follow the arm's manual and local advice.",
      "Cable ports: a USB-C monitor may need its cable to follow the arm, so leave enough slack for movement.",
    ],
  },
  {
    kind: "explanation",
    heading: "Questions readers ask most",
    paragraphs: [
      "Can I use a monitor arm if my monitor has no VESA holes? Sometimes, with an adapter plate that attaches to the back of the monitor. Check the adapter for your model and its weight limit.",
      "Why does my monitor sink on its arm? The tension may be too low for the weight, or the monitor may be near the arm's limit. Adjust the tension or choose an arm rated higher.",
      "Is a clamp or a grommet mount better? It depends on your desk. A clamp fits an edge with clear space, while a grommet mount needs a hole and a thick enough desk.",
    ],
  },
];

more["wi-fi-6-vs-wi-fi-6e-vs-wi-fi-7-for-pc"] = [
  {
    kind: "steps",
    heading: "See what your PC is actually using right now",
    intro: "Before changing hardware, look at the link your PC has today. It takes a couple of minutes.",
    steps: [
      { title: "Open the connection details", body: "In Windows 11, open Settings, Network & internet, Wi-Fi, then your network's Properties. The page lists the protocol, network band, link speed and signal strength." },
      { title: "Read the protocol line", body: "It shows Wi-Fi 4, 5, 6, 6E or 7 if the adapter and router negotiate it. A lower generation than you expect means one end does not support the higher one, or the driver does not." },
      { title: "Check the band", body: "2.4 GHz, 5 GHz and 6 GHz appear as the network band. If you expected 6 GHz and see 5, the router may not offer it, or the PC may be too far away." },
      { title: "Compare two rooms", body: "Check the link speed near the router and at the desk. A big gap shows distance and walls matter more than the standard." },
      { title: "Run a wired comparison", body: "If the PC has an Ethernet port, plug in for a minute and compare an internet speed test. A matching result means Wi-Fi is not your bottleneck." },
    ],
  },
  {
    kind: "decision-table",
    heading: "Channel widths and bands in plain terms",
    intro: "These are the maximum capabilities. Real links often use less because of neighbours, walls and regional rules.",
    columns: ["Generation", "Bands", "Widest channel", "Notable extras"],
    rows: [
      ["Wi-Fi 6", "2.4 and 5 GHz", "160 MHz (in 5 GHz, optional)", "Handles busy networks better than Wi-Fi 5"],
      ["Wi-Fi 6E", "2.4, 5 and 6 GHz", "160 MHz", "Adds the 6 GHz band with more room and fewer older devices"],
      ["Wi-Fi 7", "2.4, 5 and 6 GHz", "320 MHz (6 GHz)", "Multi-Link Operation across bands and a denser modulation"],
    ],
  },
  {
    kind: "explanation",
    heading: "Windows and driver requirements, checked",
    paragraphs: [
      "Wi-Fi 6E and Wi-Fi 7 rely on the operating system as well as the adapter. Microsoft's support documentation, as reported by Windows Latest and Neowin, says Wi-Fi 7 is available starting with Windows 11 version 24H2, and an adapter on an earlier release falls back to Wi-Fi 6E features. Adapter makers such as Intel also describe needing a current driver, so check both the Windows version and the driver.",
      "For Wi-Fi 6E, Windows 11 supports the 6 GHz band with a suitable driver, and Windows 10 does not support 6 GHz in the same way, so a PC still on Windows 10 may not get 6E features. Treat this as a check: look up the adapter maker's compatibility page for your Windows version before you buy.",
      "Regional rules matter too. The 6 GHz band is not available the same way in every country, and some countries limit it to lower power or indoor use. Check the router's regional settings and what your country allows.",
    ],
  },
  {
    kind: "explanation",
    heading: "Mac, handhelds and other devices",
    paragraphs: [
      "On a Mac, Wi-Fi support depends on the model, so check Apple's technical specifications for the exact computer. You cannot normally upgrade the card, so the generation your Mac supports is the one you have, and the router still decides what bands are offered.",
      "Gaming handhelds and consoles vary as well. Some support 6 GHz and others only 5 GHz, so check each device's listed standard instead of assuming. A single old device on the network does not slow newer ones to its speed in every case, but it can take more airtime, so keep that in mind for a crowded home.",
      "Security is simpler on the newer bands. The 6 GHz band requires WPA3, so an older device that supports only WPA2 cannot join a 6 GHz network. Check that your devices support WPA3 before moving them.",
    ],
  },
  {
    kind: "explanation",
    heading: "Questions readers ask most",
    paragraphs: [
      "Will Wi-Fi 7 make my internet faster? Not if your plan is slower than your current link. Wi-Fi is limited by the plan, the router and the distance, so a faster standard helps mostly inside your home, for example for large local transfers.",
      "Should I buy a Wi-Fi 7 adapter for a desktop now? If your router supports it and you run Windows 11 24H2 or later, it can make sense. If your router is Wi-Fi 6, a 6E or Wi-Fi 7 adapter still works but you will not get Wi-Fi 7 features.",
      "When is a cable the better answer? When the PC stays at the desk, a cable is steadier and removes distance and interference. See our Ethernet guide for what to buy.",
    ],
  },
];

more["ethernet-cable-categories-cat5e-cat6-cat6a-explained"] = [
  {
    kind: "decision-table",
    heading: "Multi-gig, 2.5 GbE and what each category carries",
    intro: "Multi-gigabit speeds come from the IEEE 802.3bz standard for 2.5 and 5 gigabit over twisted pair. These are the commonly stated limits, so check your device's own notes.",
    columns: ["Speed", "Standard", "Cable normally used", "Distance"],
    rows: [
      ["1 Gbps", "1000BASE-T", "Cat5e or better", "Up to 100 m"],
      ["2.5 Gbps", "2.5GBASE-T", "Cat5e or better", "Up to 100 m"],
      ["5 Gbps", "5GBASE-T", "Cat6 or better", "Up to 100 m"],
      ["10 Gbps", "10GBASE-T", "Cat6a for the full run; Cat6 for shorter runs", "Up to 100 m on Cat6a; about 55 m on Cat6 depending on conditions"],
    ],
  },
  {
    kind: "steps",
    heading: "Check the link speed you are really getting",
    intro: "A cable test takes a minute and shows whether the cable, port or router is the limit.",
    steps: [
      { title: "Look at the link speed", body: "In Windows 11, open Settings, Network & internet, Ethernet. The page lists the link speed, such as 1000 Mbps or 2500 Mbps." },
      { title: "Read the lights on the port", body: "Most ports have a link light and an activity light. Different colours often mean different speeds, so check the manual." },
      { title: "Swap the cable", body: "If the link is below what both ends support, try another cable or a shorter run. A damaged or poorly terminated cable may fall back to a lower speed." },
      { title: "Test a different router port", body: "Some routers have one or two faster ports and the rest at gigabit. Check the router's label." },
      { title: "Copy a large file across the network", body: "Copy a big file between two wired machines and watch the transfer rate against the link speed." },
    ],
  },
  {
    kind: "explanation",
    heading: "NAS, PoE and long in-wall runs",
    paragraphs: [
      "A NAS often has a gigabit or 2.5 gigabit port, and a faster PC connection only helps if the NAS and the switch support it. Check each device's port speed, and check the switch in between, since one gigabit switch sets the whole path to gigabit.",
      "Power over Ethernet sends power and data over the same cable to access points, cameras and some other devices. Use solid copper cable from a reputable source, because copper-clad aluminium cable carries power less well and can run warm. Check that the cable and the PoE equipment are rated for the same PoE standard and wattage.",
      "For runs inside walls, look at the cable's solid or stranded construction. Solid conductors suit fixed wiring, and stranded cable is more flexible for patch leads. Terminate in-wall cable at wall jacks and a patch panel, and test the finished run, since a poor termination can reduce speed.",
    ],
  },
  {
    kind: "compatibility",
    heading: "Labels and ratings worth reading",
    notes: [
      "Shielded and unshielded: shielded cable (STP or FTP) helps in electrically noisy places, but only if the shield is grounded through shielded connectors and jacks. Otherwise an unshielded cable is simpler.",
      "Jacket rating: cables for walls and ceilings carry ratings such as CM, CMR and CMP for fire safety, which you should check against your local building rules.",
      "Cat7 and Cat8: Cat7 is not an official TIA category and uses different connectors, while Cat8 is aimed at short links in data centres. Home use rarely needs either.",
      "Patch cable length: a short cable is rarely a problem, but check the whole channel length including wall runs for 10 Gbps.",
      "Connector quality: a snagless boot helps, but the key point is that the plug is crimped correctly.",
    ],
  },
  {
    kind: "explanation",
    heading: "Questions readers ask most",
    paragraphs: [
      "Do I need Cat6a for gaming? Not for latency or a typical internet plan. A good Cat5e or Cat6 cable carries gigabit, which covers nearly every home connection.",
      "Will a better cable lower my ping? Not in any way you can rely on. A cable that works properly and a stable router matter, and a faulty cable is the exception, not a category issue.",
      "Is Cat5e still fine? Yes, for gigabit and, per the multi-gig standard, 2.5 gigabit over runs up to 100 metres. Choose Cat6 or Cat6a if you pull new cable through walls and want headroom.",
    ],
  },
];

more["pc-speaker-connections-3-5mm-usb-optical-bluetooth"] = [
  {
    kind: "steps",
    heading: "Set your PC to use the right output",
    intro: "Silence or wrong audio often comes from the PC pointed at another device.",
    steps: [
      { title: "Plug the speakers in and power them on", body: "Check the volume knob, the input selector and that any rear power switch is on." },
      { title: "Choose the output in Windows", body: "Open Settings, System, Sound, and choose the speakers under Output. USB and Bluetooth speakers appear as their own device." },
      { title: "Set the default and test", body: "Use the test button in the device's Properties to play a sound through each channel." },
      { title: "Check the format for optical", body: "For optical outputs, open the device Properties and Advanced tab, and pick a format the speakers support, such as 2-channel PCM or Dolby Digital if they decode it." },
      { title: "Check app settings", body: "Some apps and games choose their own output, so confirm that they are not sending sound to a monitor or headset." },
    ],
  },
  {
    kind: "decision-table",
    heading: "If you hear a problem, check this",
    intro: "Most speaker troubles come down to connection, grounding or settings.",
    columns: ["What you hear", "Likely cause", "What to try"],
    rows: [
      ["A hum that changes with the monitor or lights", "A ground loop between the PC and the speakers", "Plug both into the same outlet strip, or try a ground-loop isolator on a 3.5mm connection"],
      ["Hiss at low volume", "A noisy analog path or a high input level", "Lower the PC volume and raise the speaker volume, or try USB or optical"],
      ["Crackling when the PC is busy", "Interference or a cable near the graphics card", "Move the cable away from the power cables and try another port"],
      ["No sound over optical", "The PC is set to a format the speakers cannot decode", "Choose a 2-channel format in the device Properties"],
      ["Delay with video or games over Bluetooth", "Bluetooth adds a short delay", "Use a wired connection or check for a low-latency mode"],
      ["Sound comes from the monitor instead", "The default output is a display's speakers", "Choose the speakers in the sound settings"],
    ],
  },
  {
    kind: "explanation",
    heading: "Jack colours, powered speakers and surround",
    paragraphs: [
      "On many desktop motherboards the 3.5mm jacks are colour coded, with green for the front speakers or line out, pink for the microphone and blue for line in. Surround setups use further jacks for the rear, centre and subwoofer. Check the motherboard manual, since colours are a convention and not every board follows it.",
      "Passive speakers need an amplifier, while powered speakers carry one inside and need a wall power connection. A PC's output is a line signal for powered speakers, and plugging passive speakers straight into a jack gives little volume. Check which type you are buying.",
      "Optical carries two-channel audio or a compressed surround format such as Dolby Digital, but not uncompressed multichannel audio. If you want surround in games, check what the speakers decode and what the PC can send, since a simple stereo pair is often all an optical link needs.",
    ],
  },
  {
    kind: "compatibility",
    heading: "Other ways to connect",
    notes: [
      "USB-C speakers: some use USB audio with their own converter, and some only take power. Check the product page for audio over USB-C.",
      "HDMI and soundbars: a soundbar with HDMI ARC may connect through a monitor or graphics card, so check which port supports audio return and the soundbar's input.",
      "Bluetooth codecs: devices default to a basic codec, and higher-quality ones need both ends to support them. Treat the codec list as the maker's description.",
      "Desktop vs laptop: a laptop with only one combined jack may need an adapter or a USB sound adapter to carry both headset and speaker connections.",
      "Mac: Macs can use USB, Bluetooth and the headphone jack, and optical output varies by model, so check the technical specifications.",
    ],
  },
  {
    kind: "explanation",
    heading: "Questions readers ask most",
    paragraphs: [
      "Is USB better than 3.5mm? It can be, because the speakers do their own conversion and avoid the PC's analog noise. It is not always better, since quality depends on the converter inside the speakers.",
      "Does optical sound better? Optical keeps the signal digital, which avoids electrical noise, but the speakers then do the conversion, so quality depends on them. Many PCs lack an optical port.",
      "Can I use Bluetooth for gaming? You can, though the delay may be noticeable in fast games, so check for a low-latency option or use a cable.",
    ],
  },
];


const more2: Record<string, GuideModule[]> = {};

more2["keyboard-layouts-compared-full-size-tkl-75-65-60"] = [
  {
    kind: "decision-table",
    heading: "Typing habits that point to a size",
    columns: ["If you often", "Look first at", "Check before buying"],
    rows: [
      ["Enter long columns of figures", "Full size, or TKL plus a separate numpad", "Whether the numpad sits where your right hand expects it"],
      ["Jump between lines with Home and End", "TKL, 75% or 65%", "That Home and End are dedicated keys, not Fn combinations"],
      ["Use F2, F5 and F12 for shortcuts", "TKL or 75%", "Whether the function row is full height or squeezed"],
      ["Switch between a laptop and a PC", "65% or 75%", "Wireless modes and a layout close to your laptop's"],
    ],
  },
];

more2["usb-speed-names-for-external-ssds-decoded"] = [
  {
    kind: "decision-table",
    heading: "Reading a product title",
    intro: "Titles mix old and new names. This table turns common phrases into the speed they usually mean.",
    columns: ["Phrase in the title", "Usually means", "Check"],
    rows: [
      ["USB 3.0 or USB 3.1 Gen 1", "5 Gbps", "Whether the drive is rated above that elsewhere on the page"],
      ["USB 3.1 Gen 2 or USB 3.2 Gen 2", "10 Gbps", "That the cable and your port also run at 10 Gbps"],
      ["USB 3.2 Gen 2x2", "20 Gbps", "That your port is labelled 20 Gbps and uses USB-C"],
      ["USB4 or Thunderbolt 3, 4", "Up to 40 Gbps", "The drive's own stated read speed, since the enclosure may be slower"],
      ["Type-C only", "The plug shape, not a speed", "The interface speed in the specifications"],
    ],
  },
  {
    kind: "explanation",
    heading: "Why the drive's stated speed is a ceiling",
    paragraphs: [
      "A maker's read and write figures come from test conditions that suit the drive, such as large sequential files and a cool enclosure. Your own copy of mixed folders will run slower, and the same drive can score differently with different hosts. Use the figure to rank drives, not to predict a transfer time.",
      "UASP, short for USB Attached SCSI Protocol, lets a drive and host move data with less overhead than the older bulk-only mode. Most modern drives and operating systems support it, and a drive that falls back to the older mode can read noticeably slower. If speed is lower than expected on one computer but not another, try a different port and update the chipset driver.",
    ],
  },
];

more2["portable-ssd-vs-external-hard-drive"] = [
  {
    kind: "mistakes",
    heading: "More ways people lose files on external drives",
    items: [
      { mistake: "Keeping the only copy of wedding or family photos on one portable drive", instead: "Copy them to a second drive or a cloud service and check that you can open files from the copy." },
      { mistake: "Formatting a drive while the wrong disk is selected", instead: "Check the drive letter and size in Disk Management or Disk Utility before you erase anything." },
      { mistake: "Moving files to the drive instead of copying them", instead: "Copy first, check the files, then delete the originals if you want the space." },
      { mistake: "Leaving an SSD unplugged for years and assuming it is intact", instead: "Check archives from time to time and refresh the copies, since the makers do not promise unpowered storage lasts forever." },
    ],
  },
  {
    kind: "explanation",
    heading: "Using a portable drive with a Mac, a console or a TV",
    paragraphs: [
      "A drive formatted as NTFS can be read on a Mac but not written to without extra software, and APFS cannot be read by Windows. If you use both, exFAT is the common middle ground, though it has less protection against a sudden disconnect. Choose the format for the computer you use most, and keep a copy elsewhere.",
      "Consoles and smart TVs each have their own rules for external storage, such as the file system they accept and the largest capacity they read. Check the device maker's support page, since reformatting by the console may erase the drive.",
    ],
  },
];

more2["how-to-size-an-office-chair-to-your-height-and-desk"] = [
  {
    kind: "decision-table",
    heading: "Adjustments to look for on the spec page",
    columns: ["Adjustment", "What it changes", "Why it matters when sizing"],
    rows: [
      ["Seat height range", "How low and high the seat goes", "Compare it with your measured seat height and your desk"],
      ["Seat depth slider", "How far the seat pan sits from the backrest", "Lets you leave two to three fingers behind the knee"],
      ["Backrest height or lumbar", "Where the support meets your back", "Fixed shapes fit only some builds"],
      ["Armrest height and width", "Where your forearms rest", "Needed to clear a desk edge"],
      ["Tilt lock and tension", "How the backrest moves with you", "Should hold you without pushing you forward"],
    ],
  },
  {
    kind: "explanation",
    heading: "Working from a dining table, a sofa desk or a shared space",
    paragraphs: [
      "A dining table is usually higher than a desk, so the chair may need to sit higher than its range allows and your feet may no longer reach the floor. A footrest or a firm cushion can help. If the table is far too high, a different working position may suit better than forcing a chair to cope.",
      "In a shared space, several people may use one chair. Look for markings on the height lever, note your settings and check the weight rating covers everyone who uses it.",
    ],
  },
];

more2["how-to-choose-a-monitor-arm-vesa-weight-and-desk-clamps"] = [
  {
    kind: "mistakes",
    heading: "More mistakes to avoid when buying an arm",
    items: [
      { mistake: "Trusting a listing that says fits all monitors", instead: "Check the VESA pattern, the weight range and the screen size against the arm's data sheet." },
      { mistake: "Buying an arm rated right at your monitor's weight", instead: "Leave margin so the spring or friction hinge is not at its limit when you add a webcam or a bar light." },
      { mistake: "Clamping on a desk with a thin lip", instead: "Use the plate or choose a grommet mount, since the clamp needs solid material to grip." },
      { mistake: "Forgetting a monitor's cable stiffness", instead: "Stiff cables can make a monitor tilt on its own, so leave slack and use the clips." },
    ],
  },
  {
    kind: "explanation",
    heading: "Gas spring, mechanical spring and fixed arms",
    paragraphs: [
      "A gas spring arm holds a monitor with a cylinder that you tension with a screw, and it lets you move the screen with one hand. A mechanical spring arm does the same with a coil spring, and a fixed or pole mount holds one height with a simple lock. Check the arm's stated weight range, since each type has a window where it balances well.",
      "A pole mount with a sliding bracket is simple and tends to stay put, but moving the screen takes both hands. If you share a desk and change height often, a spring arm is easier to use.",
    ],
  },
];

more2["wi-fi-6-vs-wi-fi-6e-vs-wi-fi-7-for-pc"] = [
  {
    kind: "mistakes",
    heading: "More mistakes with Wi-Fi upgrades",
    items: [
      { mistake: "Buying a Wi-Fi 7 adapter and keeping a Wi-Fi 5 router", instead: "The adapter will connect at the router's level, so upgrade the router if you want the new features." },
      { mistake: "Putting the router in a cabinet or behind a TV", instead: "Place it high, open and central, since placement often changes more than the standard." },
      { mistake: "Using one band name for everything", instead: "Give the 2.4, 5 and 6 GHz bands separate names for a while to see which one your PC joins." },
      { mistake: "Ignoring the antennas on a desktop card", instead: "Connect the antennas and place them where they can see the room, not behind the case." },
    ],
  },
  {
    kind: "explanation",
    heading: "Desktop adapters: PCIe, M.2 and USB",
    paragraphs: [
      "A PCIe card with external antennas usually gives a desktop the best signal, because the antennas can sit away from the case. An M.2 module often comes on a laptop or a motherboard and needs antennas attached, and a USB adapter is the easiest to fit but can be limited by the USB port.",
      "Many cards combine Wi-Fi with Bluetooth. The Bluetooth part may connect through a USB header or an extra cable, so check the card's instructions or the Bluetooth will not work.",
    ],
  },
];

more2["ethernet-cable-categories-cat5e-cat6-cat6a-explained"] = [
  {
    kind: "mistakes",
    heading: "More cable mistakes",
    items: [
      { mistake: "Buying the cheapest long cable of an unknown brand", instead: "Choose pure copper conductors and a stated category, because cheap cables may use copper-clad aluminium." },
      { mistake: "Bending a cable sharply behind a desk", instead: "Keep gentle curves, since sharp bends can damage the twisted pairs." },
      { mistake: "Running cable beside mains wiring for a long distance", instead: "Cross power cables at an angle and keep some space, especially with unshielded cable." },
      { mistake: "Using a flat cable for a permanent run", instead: "Use flat cable for short desk leads, and round cable where you can." },
    ],
  },
  {
    kind: "decision-table",
    heading: "Which jobs need which cable",
    columns: ["Job", "Reasonable pick", "What to check"],
    rows: [
      ["A console or PC at gigabit", "A tested Cat5e or Cat6 patch lead", "Both ports and the router are gigabit"],
      ["A streaming box in another room", "A new in-wall run of Cat6", "The total length and a tested termination"],
      ["A home office with a 2.5 GbE router", "Cat5e or Cat6 runs, tested", "Each device and switch port speed"],
      ["A shed or garage run", "Outdoor-rated cable, with surge protection", "The jacket rating and local rules"],
      ["A camera or access point", "Cat6 with PoE, solid copper", "The PoE standard and power budget"],
    ],
  },
  {
    kind: "explanation",
    heading: "Finding a bad cable or port",
    paragraphs: [
      "A cable that links at 100 Mbps instead of 1 Gbps often has a broken pair or a poor termination, because gigabit uses all four pairs and the older speed uses two. If the speed is lower than expected, try a second cable, then a second port, and then another device. This isolates the fault without buying anything.",
      "Intermittent drops can come from a loose plug, a cable pinched by a door or a failing port. Reseat both ends and look at the plug's latch, and replace it if it no longer clicks in.",
    ],
  },
];

more2["pc-speaker-connections-3-5mm-usb-optical-bluetooth"] = [
  {
    kind: "mistakes",
    heading: "More connection mistakes",
    items: [
      { mistake: "Using the microphone jack for the speakers", instead: "Use the green line-out jack, or the output the motherboard manual names for speakers." },
      { mistake: "Plugging a stereo plug into a multichannel jack and expecting surround", instead: "Match the number of jacks and the cable to the speaker system's inputs." },
      { mistake: "Running a long unshielded cable beside a power brick", instead: "Keep audio cables away from power supplies and chargers to reduce hum." },
      { mistake: "Leaving the volume at maximum on the PC and at minimum on the speakers", instead: "Set a moderate PC level and use the speaker knob, which usually gives the best balance of noise and headroom." },
    ],
  },
  {
    kind: "decision-table",
    heading: "Picking by setup",
    columns: ["Setup", "Connection that often fits", "Why"],
    rows: [
      ["A desk with powered stereo speakers", "USB or 3.5mm", "Simple, with no extra box"],
      ["A hi-fi receiver near the PC", "Optical or a USB DAC", "Keeps the long run digital"],
      ["A soundbar under a monitor", "USB, optical or HDMI ARC", "Check which inputs the soundbar offers"],
      ["Speakers shared by a PC and a phone", "Bluetooth plus a wired input", "Lets each device connect in its own way"],
      ["A budget 2.0 set for a laptop", "3.5mm or USB", "Both work without drivers"],
    ],
  },
  {
    kind: "explanation",
    heading: "Placing speakers so the connection matters less",
    paragraphs: [
      "Place the two speakers at roughly equal distance from your head and aim them toward your ears. A subwoofer can sit on the floor, away from the desk surface, since a desk can make low notes boom. These changes often matter more than the cable type.",
      "Keep the cable runs short and tidy, and check that each plug is fully inserted, since a half-seated 3.5mm plug can cut one channel.",
    ],
  },
];

export const peripheralsWave1Extra: Record<string, GuideModule[]> = (() => {
  const out: Record<string, GuideModule[]> = { ...baseExtra };
  for (const src of [more, more2]) for (const [slug, mods] of Object.entries(src)) out[slug] = [...(out[slug] ?? []), ...mods];
  return out;
})();
