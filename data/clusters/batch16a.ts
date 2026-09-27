import { mouseSchema } from "@/data/categories/peripherals";
import { workKeyboardSchema, workMouseSchema } from "@/data/categories/input";
import { comboSchema, combo13eFacts } from "@/data/categories/combos13e";
import { mic13eFacts } from "@/data/categories/audio13e";

import { btKeyboards16aFacts, ergoMice16aFacts, mic16aSchema, razerWireless16aFacts } from "@/data/categories/misc16a";
import type { Entry } from "./batch12-lib";
import { factory } from "./batch13c-lib";

/** Batch 16a: guru sitemap 45 keywords, one article per keyword. Rank order is editorial. */

const combos = factory(comboSchema, combo13eFacts, "peripherals", {
  B0FDG55BPG: "Redragon's 75% combo connects both pieces over 2.4GHz, Bluetooth or cable, and backs them with a 4000mAh keyboard battery and a 700mAh mouse battery. The mouse reaches 12,800 DPI through software, and the 75% board leaves more room for mouse sweeps than a full-size one.",
  B0H32KD4WQ: "The K719 PRO combo is Redragon's showpiece: a gasket-mount mechanical keyboard with a small TFT screen built in, paired with a nine-button 8000 DPI mouse. Both are tri-mode, so the set can move between a PC over the dongle and a laptop over Bluetooth.",
  B0DH2H1DS9: "Redragon's S142 puts four onboard macro keys on a wireless K515 PRO membrane keyboard, with 26 anti-ghosting keys for overlapping inputs. The included wireless mouse tops out at 4800 DPI, and one receiver covers the set.",
  B0DL9WC26F: "RisoPhy's set gives a receiver-based full-size keyboard a metal top panel and RGB lighting, and both pieces charge over USB-C instead of taking disposable cells. The rechargeable mouse steps up to 3200 DPI.",
  B0D99WMLQV: "CHONCHOW's wireless set is a 104-key RGB keyboard with a 2500mAh battery and a rechargeable mouse with a 500mAh cell, on one 2.4GHz receiver. It was the lowest-priced set here at the time of writing.",
});

const razer = factory(mouseSchema, razerWireless16aFacts, "peripherals", {
  B0B6XZLNHQ: "Razer's DeathAdder V3 Pro is the 63g wireless version of the long right-handed DeathAdder, refined with esports players and fitted with a Focus Pro 30K sensor. It charges over USB-C and connects over HyperSpeed 2.4GHz.",
  B0D4RF55QK: "The DeathAdder V3 HyperSpeed trims the same family to 55g and uses a 26K sensor instead of the Pro's 30K. Razer rates it for up to 100 hours per charge, and polling can be raised to 8000Hz by adding the HyperPolling Wireless Dongle.",
  B0FSG67VPX: "Razer's Viper V3 Pro SE is a 54g esports mouse with the Focus Pro 35K Gen-2 sensor, which tracks on glass and adjusts in 1-DPI steps. It ships with a 1000Hz USB-A dongle and is rated for up to 95 hours per charge.",
  B0FD5DP9CC: "The Cobra HyperSpeed is a 62g mouse Razer describes as suiting most grip styles, and it connects three ways: HyperSpeed, Bluetooth or USB-C. Razer offers up to 110 hours on the dongle and 170 on Bluetooth, and it can charge wirelessly on Razer's dock or puck, sold separately.",
  B0BGJT87N2: "Razer's Naga V2 HyperSpeed is the MMO mouse of the group, with 19 programmable buttons and a HyperScroll wheel that switches between free-spin and tactile modes. It takes a replaceable battery, which Razer rates at 250 hours on HyperSpeed and 400 on Bluetooth.",
  B0916N2LPZ: "The Orochi V2 is Razer's compact mobile mouse, under 60g and powered by one AA or AAA battery in a hybrid slot. Razer offers up to 950 hours on Bluetooth, and it was the lowest-priced Razer here at the time of writing.",
});

const mics = factory(mic16aSchema, mic13eFacts, "peripherals", {
  B0DG9X4WHW: "HyperX's QuadCast 2 S is a USB condenser with four polar patterns, tap-to-mute and a headphone jack, wrapped in more than 100 addressable RGB LEDs. It adds a multifunction knob, and the stand includes a shock mount.",
  B0GGYLFHPS: "Elgato's Wave:3 MK.2 is built around keeping loud moments usable: Clipguard 2.0 guards against distortion, automatic gain evens out levels, and onboard DSP handles processing. It connects over USB-C, with capacitive mute on top and a headphone jack.",
  B0CVYHHPX6: "Elgato's Wave Neo sits on a high-rise stand that lifts the capsule toward your mouth instead of leaving it low behind the keyboard. It adds tap-to-mute and a headphone jack, and it was the lowest-priced Elgato here at the time of writing.",
  B07QLNYBG9: "Blue's Yeti Nano puts two capsules in a smaller body than the Yeti, with cardioid for solo play and omni for a room. It keeps a mute button and a headphone jack on the desk stand.",
  B0CCV74CL7: "TONOR's TC310+ comes as a kit with a boom arm, so the mic can sit near your mouth without taking desk space. Tap-to-mute and four RGB modes round it out on a USB connection.",
  B09JG62KDJ: "FIFINE's A6V bundles a tripod, shock mount and pop filter with a USB condenser that samples at up to 192kHz. Its RGB ring switches off when muted, which makes a live or muted mic easy to see mid-game.",
});

const btKeys = factory(workKeyboardSchema, btKeyboards16aFacts, "peripherals", {
  B0BT4DP7SC: "Logitech's K380s is a compact Bluetooth keyboard with round, quiet scooped keys that pairs with three devices. Logitech offers up to 36 months on its batteries, and the Fn keys can be customised in Logi Options+.",
  B098JPSVKY: "The MX Keys Mini packs spherically dished Perfect Stroke keys into a compact Bluetooth LE board with no number pad. Its backlight comes on as your hands approach, and dedicated dictation, mic-mute and emoji keys sit on the top row.",
  B0F37LY1FN: "Logitech's K250 keeps a number pad inside a compact frame and connects over Bluetooth. It adds deep-profile keys, a spill-resistant design and adjustable tilt legs, with a battery rating of up to 12 months.",
  B0BKW3LB2B: "The MX Keys S is the full-size member of Logitech's MX line, with spherically dished scissor keys and a number pad. It pairs over Bluetooth or a Logi Bolt receiver with up to three devices, and Smart Actions shortcuts run through Logi Options+.",
  B0BTNY72VD: "Logitech's Wave Keys curves the key rows into a wave and adds a cushioned memory-foam palm rest. It connects over Bluetooth or Logi Bolt and is certified by United States Ergonomics.",
  B09LK63PKB: "The MX Mechanical Mini for Mac is a 75% low-profile board with Tactile Quiet mechanical switches and a Mac key layout. It connects over Bluetooth LE to three devices, and Logitech offers up to 15 days per charge with the backlight on.",
});

const ergoMice = factory(workMouseSchema, ergoMice16aFacts, "peripherals", {
  B0BBQ3ZYNY: "Logitech's Ergo M575S is a right-handed thumb trackball, so the mouse body stays still and the thumb moves the cursor. It connects over Bluetooth or Logi Bolt and Logitech rates it for up to 18 months on its battery.",
  B09KX66ZCD: "The Signature M650 is a contoured right-handed mouse Logitech sizes for small to medium hands, with silent clicks and customisable side buttons. It pairs over Bluetooth or Logi Bolt, and the maker specifies Windows, macOS, Linux, ChromeOS, iPadOS and Android.",
  B087Z6LSHW: "Logitech's M720 is a full-size right-handed mouse with six buttons that switches between three computers at a press. It connects over Bluetooth or a Unifying receiver and is rated for up to 24 months per battery.",
  B0D2JGKRMM: "Lenovo's Yoga Pro Mouse is a right-handed ergonomic shape with silent main buttons and programmable side and top buttons. It pairs with two devices over Bluetooth 5.1 and recharges over USB-C.",
  B07YVMXLQC: "Kensington's Orbit is a finger-operated trackball with a scroll ring around the ball, a detachable wrist rest and an ambidextrous design. Its two buttons can be reassigned in Kensington's software, and it was the lowest-priced pick here at the time of writing.",
});

export const batch16a: Entry[] = [
  combos({
    slug: "best-wireless-gaming-keyboard-and-mouse", kw: "wireless gaming keyboard and mouse",
    seo: "Best Wireless Gaming Keyboard and Mouse", title: "The Best Wireless Gaming Keyboard and Mouse Sets",
    meta: "Five wireless gaming keyboard and mouse sets compared on tri-mode support, battery capacity, mouse DPI and layout, from a macro-key set to a TFT-screen board.",
    dek: "Five wireless gaming keyboard and mouse sets, from a budget rechargeable pair to a tri-mode Redragon with a screen in the keyboard.",
    teaser: "Check the connection first: tri-mode sets add Bluetooth and a cable to the receiver, while single-receiver sets are simpler and cheaper.",
    intro: [
      "Buying a gaming keyboard and mouse as a set saves a USB port and usually money, but the sets differ more than their photos suggest. Some connect only through one 2.4GHz receiver, others add Bluetooth and a cable; some list battery capacity in mAh and others leave it out.",
      "We researched five wireless sets from their Amazon listings. We did not test them, and where a listing does not state a figure, such as a battery capacity, we leave it out rather than estimate it.",
    ],
    bottom: [
      "The Redragon 75% combo is the most rounded choice, with tri-mode connection and the largest batteries of these five. The Redragon K719 PRO combo adds a gasket-mount board with a TFT screen for more money, and the Redragon S142 suits MMO and strategy players who want macro keys.",
      "For a full-size board that charges instead of taking batteries, the RisoPhy set adds a metal top panel, and the CHONCHOW wireless set covers the same need at the lowest price here at the time of writing.",
    ],
    picks: [
      ["B0FDG55BPG", "Best Tri-Mode Value", "tri-mode connection with a 4000mAh keyboard battery and a 700mAh mouse battery", "Players who switch between a PC and a laptop."],
      ["B0H32KD4WQ", "Best Premium Set", "a gasket-mount keyboard with a built-in TFT screen and a nine-button 8000 DPI mouse", "A desk centrepiece with room in the budget."],
      ["B0DH2H1DS9", "Best for Macros", "four onboard macro keys and 26 anti-ghosting keys", "MMO and strategy players."],
      ["B0DL9WC26F", "Best Metal Build", "a metal top panel with USB-C charging for both pieces", "A full-size board that feels sturdier."],
      ["B0D99WMLQV", "Best Budget Rechargeable", "a 2500mAh keyboard battery and 500mAh mouse battery at the lowest price here", "A first wireless gaming setup."],
    ],
    prio: ["connection", "battery", "gaming", "layout", "mouse"],
    related: ["best-wireless-gaming-keyboard-and-mouse-combo", "best-gaming-keyboard-mouse-combos", "best-redragon-keyboards-and-mice"],
  }),
  razer({
    slug: "best-razer-wireless-mouse", kw: "razer wireless mouse",
    seo: "Best Razer Wireless Mice", title: "The Best Razer Wireless Mice",
    meta: "Six Razer wireless mice compared on weight, sensor, battery life, buttons and connection, from a 54g Viper to a 19-button Naga for MMO players.",
    dek: "Six Razer wireless mice, from a 54g Viper for shooters to a 19-button Naga and a travel Orochi that runs on one AA battery.",
    teaser: "Choose the Razer shape first, then weigh battery life and connection; sensor figures past 26K matter far less than fit.",
    intro: [
      "Razer's wireless range covers most shapes a player could want: the right-handed DeathAdder, the Viper, the Cobra, the MMO Naga and the travel-sized Orochi. Within a family, the models differ mainly in weight, sensor and how long they run between charges.",
      "We researched six Razer wireless mice from their Amazon listings and Razer's stated specifications. We did not test them. Where a listing leaves out a figure, such as the Naga's weight, we leave it blank.",
    ],
    bottom: [
      "The Viper V3 Pro SE is the pick for shooters who want a 54g mouse with a 35K sensor, and the DeathAdder V3 HyperSpeed is the lighter DeathAdder at 55g. The DeathAdder V3 Pro keeps the same shape with a 30K sensor.",
      "The Cobra HyperSpeed is the one to buy if you want Bluetooth as well as the dongle on a 62g body. The Naga V2 HyperSpeed is for MMO hotbars, and the Orochi V2 is the travel pick, running on a single AA or AAA battery.",
    ],
    picks: [
      ["B0FSG67VPX", "Best for Shooters", "a 54g body with a Focus Pro 35K Gen-2 sensor and 1-DPI steps", "Flick aiming in competitive shooters."],
      ["B0D4RF55QK", "Best Light DeathAdder", "a 55g DeathAdder shape with an upgrade path to 8000Hz polling", "DeathAdder fans who want less weight."],
      ["B0B6XZLNHQ", "Best Proven DeathAdder", "a 63g DeathAdder with a Focus Pro 30K sensor", "Players who want the Pro sensor on the classic shape."],
      ["B0FD5DP9CC", "Best Tri-Mode Razer", "HyperSpeed, Bluetooth and USB-C, with up to 170 hours on Bluetooth", "One mouse for a gaming PC and a laptop."],
      ["B0BGJT87N2", "Best for MMOs", "19 programmable buttons and a HyperScroll wheel", "MMO hotbars and macro-heavy games."],
      ["B0916N2LPZ", "Best for Travel", "a compact body under 60g that runs on one AA or AAA battery", "Laptop bags and gaming away from the desk."],
    ],
    prio: ["shape", "weight", "wireless", "buttons"],
    related: ["best-razer-gaming-mouse", "best-wireless-gaming-mice", "best-mmo-gaming-mice"],
  }),
  mics({
    slug: "best-microphone-for-gaming", kw: "microphone for gaming",
    seo: "Best Microphones for Gaming", title: "The Best Microphones for Gaming",
    meta: "Six USB microphones for gaming compared on polar pattern, mute controls, monitoring and mounting, from a boom-arm kit to Elgato's Wave:3 MK.2.",
    dek: "Six USB microphones for game chat and streaming, compared on mute controls, monitoring and how they mount at the desk.",
    teaser: "Look for an easy mute and a way to get the mic close to your mouth; both matter more in game chat than headline sample rates.",
    intro: [
      "A desk microphone is the usual upgrade from a headset mic for game chat and streaming. For gaming, the practical questions are how quickly you can mute, whether you can hear yourself through a headphone jack, and whether the mic can sit close to your mouth without picking up every keystroke.",
      "Every pick here is a USB microphone, so none needs an audio interface. We researched them from their Amazon listings and makers' specifications and did not test them ourselves.",
    ],
    bottom: [
      "The HyperX QuadCast 2 S is the pick for streamers who want four polar patterns and lighting, while the Elgato Wave:3 MK.2 suits players who get loud, with Clipguard 2.0 and automatic gain. The Elgato Wave Neo is the simpler Elgato, with a high-rise stand that brings it closer to your mouth.",
      "The Blue Yeti Nano adds an omni pattern for a room of players. On a tighter budget, the TONOR TC310+ includes a boom arm, and the FIFINE A6V comes with a shock mount and pop filter and makes its mute state easy to see.",
    ],
    picks: [
      ["B0DG9X4WHW", "Best for Streaming", "four polar patterns, tap-to-mute and more than 100 addressable RGB LEDs", "Streamers who want the mic to be part of the setup."],
      ["B0GGYLFHPS", "Best for Loud Moments", "Clipguard 2.0 anti-distortion with automatic gain", "Players who shout during clutch rounds."],
      ["B0CVYHHPX6", "Best Closer Placement", "a high-rise stand that lifts the mic toward your mouth", "Desks without room for a boom arm."],
      ["B07QLNYBG9", "Best for Group Play", "two capsules with cardioid and omni patterns", "Couch co-op and shared rooms."],
      ["B0CCV74CL7", "Best Boom Arm Kit", "a boom arm in the box with tap-to-mute", "Keeping the mic off a crowded desk."],
      ["B09JG62KDJ", "Clearest Mute State", "an RGB ring that turns off when muted, plus a shock mount and pop filter", "A first mic on a small budget."],
    ],
    prio: ["mute", "mounting", "pattern", "dynamic-condenser"],
    related: ["best-microphone-for-gaming-pc", "best-cheap-gaming-mic", "best-usb-microphones"],
  }),
  btKeys({
    slug: "best-bluetooth-wireless-keyboard", kw: "bluetooth wireless keyboard",
    seo: "Best Bluetooth Wireless Keyboards", title: "The Best Bluetooth Wireless Keyboards",
    meta: "Six Bluetooth wireless keyboards compared on layout, key type, device pairing and battery rating, from a compact K380s to a full-size MX Keys S.",
    dek: "Six Bluetooth keyboards for everyday work, from a pocketable three-device K380s to a low-profile mechanical board for Mac.",
    teaser: "Decide whether you need a number pad and how many devices you switch between; battery ratings differ by years, not days.",
    intro: [
      "A Bluetooth keyboard frees a USB port and can switch between a desktop, a laptop and a tablet without a receiver. The choices that matter are layout, whether you want a number pad, key feel, how many devices it remembers and whether it runs on disposable batteries or recharges.",
      "We researched six Bluetooth keyboards from their Amazon listings and makers' specifications. We did not test them, and a figure a listing does not give, such as a device count, is left blank rather than assumed.",
    ],
    bottom: [
      "The Logitech K380s is the pick for most people who switch between devices, with a 36-month battery rating across three devices. The MX Keys Mini adds backlighting and dictation and mute keys in a compact size, and the K250 is the budget pick that keeps a number pad.",
      "For a full-size board, the MX Keys S adds a number pad and Logi Bolt as a backup to Bluetooth. The Wave Keys suits typists who want a curved layout and palm rest, and the MX Mechanical Mini for Mac is the mechanical option with a Mac layout.",
    ],
    picks: [
      ["B0BT4DP7SC", "Best Multi-Device Value", "three-device pairing with a battery rating of up to 36 months", "Switching between a laptop, tablet and phone."],
      ["B098JPSVKY", "Best Compact Backlit", "backlighting that turns on as your hands approach, plus dictation and mic-mute keys", "Small desks and evening work."],
      ["B0F37LY1FN", "Best Budget With Number Pad", "a number pad in a compact frame with a spill-resistant design", "Data entry on a small budget."],
      ["B0BKW3LB2B", "Best Full-Size", "a full-size layout with Bluetooth or Logi Bolt and three-device pairing", "Spreadsheets and all-day typing."],
      ["B0BTNY72VD", "Best Ergonomic Layout", "a wave key layout with a cushioned memory-foam palm rest", "Typists who want a palm rest built in."],
      ["B09LK63PKB", "Best Mechanical for Mac", "Tactile Quiet mechanical switches with a Mac key layout", "Mac users who want mechanical keys."],
    ],
    prio: ["multi", "battery", "noise", "ergonomics"],
    related: ["best-keyboards-for-work", "best-bluetooth-wireless-mouse", "best-mouse-for-work"],
  }),
  ergoMice({
    slug: "best-ergonomic-computer-mouse", kw: "ergonomic computer mouse",
    seo: "Best Ergonomic Computer Mice", title: "The Best Ergonomic Computer Mice",
    meta: "Five ergonomic computer mice compared on shape, trackball or sculpted design, battery rating and multi-device support, with no vertical mice in the mix.",
    dek: "Five ergonomic mice that are not vertical: two trackballs and three contoured shapes, from Logitech, Lenovo and Kensington.",
    teaser: "If a vertical mouse feels too tall, a trackball or contoured mouse is the alternative; match the shape and hand size first.",
    intro: [
      "An ergonomic mouse does not have to be vertical. Trackballs keep the body still and move the cursor with a thumb or fingers, and contoured mice support the hand in a flatter position than a vertical model. Both are worth a look if a handshake grip feels awkward.",
      "We researched five mice from their Amazon listings and makers' specifications. We did not test them and make no medical claims; for pain or injury, a clinician is the right person to advise. For vertical mice, see our separate guide.",
    ],
    bottom: [
      "The Logitech Ergo M575S is the pick for a thumb trackball, with an 18-month battery rating and Bluetooth or Logi Bolt. The Kensington Orbit is the finger-operated alternative with a scroll ring, at the lowest price here at the time of writing.",
      "Among conventional shapes, the Signature M650 suits small to medium hands and quiet offices, the M720 switches between three computers, and the Lenovo Yoga Pro Mouse is the rechargeable option with silent main buttons.",
    ],
    picks: [
      ["B0BBQ3ZYNY", "Best Thumb Trackball", "a right-handed thumb trackball with an 18-month battery rating", "Cramped desks and users who want the mouse to stay still."],
      ["B09KX66ZCD", "Best for Smaller Hands", "a right-handed shape sized for small to medium hands, with silent clicks", "Quiet offices and smaller hands."],
      ["B087Z6LSHW", "Best Multi-Computer", "switching between three computers at the touch of a button", "Desks with a desktop and a laptop."],
      ["B0D2JGKRMM", "Best Rechargeable", "a USB-C rechargeable battery with silent left and right buttons", "Users who would rather charge than buy batteries."],
      ["B07YVMXLQC", "Best Finger Trackball", "a finger-operated trackball with a scroll ring and detachable wrist rest", "Left- or right-handed users on small desks."],
    ],
    prio: ["shape", "hand-size", "quiet", "multi"],
    related: ["best-vertical-ergonomic-mouse", "best-mouse-for-work", "best-mice-for-programming"],
  }),
];
