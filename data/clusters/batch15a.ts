import { keyboardSchema, mouseSchema } from "@/data/categories/peripherals";
import { workMouseSchema } from "@/data/categories/input";
import { mice13cFacts } from "@/data/categories/mice13c";
import { quietKeyboards15aFacts, verticalMice15aFacts } from "@/data/categories/input15a";
import type { Entry } from "./batch12-lib";
import { factory } from "./batch13c-lib";

/** Batch 15a: guru sitemap 45 mouse and keyboard keywords, one article per keyword. Rank order is editorial. */

const gm = factory(mouseSchema, mice13cFacts, "peripherals", {
  B0G12HGHGM: "Logitech's PRO X2 Superstrike adds haptic click feedback to the PRO shape, so the click feel is set in software rather than fixed by the switch. It pairs that with a Hero 2 sensor and 8kHz polling over Lightspeed.",
  B0F3QCXL82: "Razer's DeathAdder V4 Pro keeps the long right-handed DeathAdder shape at 56g, with 8000Hz wireless polling. Its Gen-4 optical switches are rated for 100 million clicks and the scroll wheel is optical too.",
  B0CVR5DM26: "ASUS's ROG Strix Impact III Wireless is a 57g ambidextrous shape with a 36K sensor and switches you can replace. ASUS lists up to 618 hours of battery life, and it pairs over Bluetooth with up to three devices.",
  B0BXBC26X8: "Razer's Basilisk V3 X HyperSpeed is a right-handed mouse with a built-in thumb rest and nine programmable buttons. It runs on one AA battery, which Razer rates at up to 535 hours over Bluetooth.",
  B0F6B4TY2W: "SteelSeries's Rival 3 Wireless Gen 2 connects over 2.4GHz for games and Bluetooth for a laptop, powered by a single AAA battery. Its switches are rated for 60 million clicks.",
  B0916N2LPZ: "Razer's Orochi V2 is a compact mobile mouse under 60g that takes either one AA or one AAA battery. Razer lists up to 950 hours on Bluetooth, and it was the lowest-priced mouse here at the time of writing.",
  B0943HXDVM: "Logitech's wired G502 X has 13 programmable controls on an 89g body, with Lightforce hybrid optical-mechanical switches. The DPI-shift button can be reversed or removed.",
  B0B6XTDJS1: "The wired DeathAdder V3 trims Razer's right-handed shape to 59g and supports 8000Hz polling over its cable. It uses a Focus Pro 30K optical sensor.",
  B093LSC9KY: "SteelSeries's Prime is a 69g wired esports mouse with optical magnetic switches rated for 100 million clicks, the highest click rating among these wired picks. It was also the lowest-priced of the six at the time of writing.",
  B0C51J2ZXN: "Razer's Cobra is a compact 58g wired mouse with Gen-3 optical switches rated for 90 million clicks. Sensitivity adjusts in 50 DPI steps.",
  B0DHYNCKKK: "Glorious's Model O 2 Mini is a 49g symmetrical wired mouse with a 26K sensor, the lightest listed weight here. Glorious lists it for palm, claw and fingertip grips.",
  B0BX52PCJ5: "HyperX's wired Pulsefire Haste 2 weighs 53g and supports 8000Hz polling, with four pieces of grip tape in the box. It uses a 26K sensor.",
});

const vm = factory(workMouseSchema, verticalMice15aFacts, "peripherals", {
  B07FNJB8TT: "Logitech's MX Vertical sets the hand at 57 degrees with a thumb rest and a textured rubber surface. A cursor speed switch changes sensitivity with one press, and Logitech says the shape fits a variety of hand sizes.",
  B09J1TB35S: "Logitech's Lift is a smaller vertical mouse sized for small to medium right hands, with whisper-quiet clicks and a SmartWheel. It connects over Bluetooth LE or a Logi Bolt receiver and Logitech lists up to two years of battery life.",
  B09J1SYX5B: "The Lift Left mirrors Logitech's Lift for the left hand, with the thumb rest sculpted on the other side. The quiet clicks, SmartWheel and two-year battery rating are the same.",
  B0DVD5RTZ5: "Razer's Pro Click V2 Vertical adds a base support that raises the wrist off the desk, plus six buttons and 18-zone lighting. It connects to up to five devices over HyperSpeed, Bluetooth or cable, and a 5-minute charge gives three working days.",
  B0DCBW3B3T: "ProtoArc's EM11 NL is a 58-degree vertical mouse for hands under 7.5 inches, with silent left and right buttons. It recharges over USB-C and pairs with three devices across two Bluetooth channels and a 2.4GHz receiver.",
  B00FPAVUHC: "Anker's wired vertical mouse is the simplest way to try the handshake grip: a 5.3oz body on a 1.5m USB cable with nothing to charge. It has next and previous page buttons and an 18-month warranty.",
});

const qk = factory(keyboardSchema, quietKeyboards15aFacts, "peripherals", {
  B08YRRLV25: "Cherry's MX 3.0S uses Cherry's own MX2A Silent Red switches, linear switches with no click that Cherry describes as quiet. The housing is extruded aluminium and each switch is rated for more than 50 million actuations.",
  B0C7KFZ5TL: "ASUS lines the ROG Strix Scope II 96 Wireless with sound-dampening foam and pads under each switch, and ships it with pre-lubed ROG NX Snow linear switches. The 96% layout keeps a number pad in a body only 1 cm wider than an 80% board.",
  B0FWCG4NDG: "SOLAKAKA's KI99 Pro pairs silent switches with a gasket mount and five noise-reducing layers, the most direct quiet-first design here. It is a 96% wireless board with PBT keycaps and a 10,000mAh battery.",
  B0H9CC8JCZ: "Razer's Reclusa X Mini is a wired 65% board with dual-layer silicone dampening and a PPS plate to cut resonance. Its Orange tactile switches are, per Razer, engineered for quieter actuation, and the sockets are hot-swappable.",
  B0CZ6SMBR4: "Redragon's K686 PRO uses a gasket mount with five layers of noise dampening for a softer, quieter bottom-out. It connects over USB-C, Bluetooth or 2.4GHz, and its hot-swap sockets take 3-pin or 5-pin switches.",
  B09FTNMT84: "SteelSeries's Apex 3 TKL uses what SteelSeries calls whisper-quiet gaming switches, rated for over 20 million keypresses. It is a wired tenkeyless board with IP32 water and dust resistance.",
});

const RM = ["best-gaming-mouse", "best-fps-gaming-mouse", "best-affordable-gaming-mouse", "best-razer-gaming-mouse", "best-logitech-gaming-mouse"];
const RW = ["best-mouse-for-work", "best-mice-for-programming", "best-bluetooth-wireless-mouse"];
const RK = ["best-gaming-keyboard", "best-tkl-keyboards", "best-keyboards-for-work"];

export const batch15a: Entry[] = [
  gm({
    slug: "best-wireless-gaming-mice", kw: "wireless gaming mice",
    seo: "Best Wireless Gaming Mice", title: "The Best Wireless Gaming Mice for Every Grip and Budget",
    meta: "Six wireless gaming mice compared on weight, battery life, polling rate and shape, from a compact travel mouse to 8kHz esports picks.",
    dek: "Six wireless gaming mice, from a 56g esports shape to a thumb-rest mouse that runs for months on one AA battery.",
    teaser: "Compare listed weight, battery life and polling rate; wireless mice now differ more in shape and power source than in speed.",
    intro: [
      "A 2.4GHz wireless gaming mouse is no longer a compromise for most players; the practical differences are weight, shape, battery life and whether it charges or takes a replaceable cell. These six cover rechargeable esports mice, a long-life ambidextrous shape and two battery-powered options that go months between swaps.",
      "We researched each mouse from its Amazon listing and the maker's stated specifications. We did not test them, and where a listing leaves out a figure, such as weight, we say so rather than estimate it.",
    ],
    bottom: [
      "The Logitech PRO X2 Superstrike and Razer DeathAdder V4 Pro are the two for competitive play, with 8kHz wireless polling; pick the DeathAdder for a right-handed shape and the lower listed weight, and the Logitech for adjustable haptic clicks. The ASUS ROG Strix Impact III Wireless is the ambidextrous choice, with replaceable switches and a 618-hour battery rating.",
      "If you would rather not charge at all, the Razer Basilisk V3 X HyperSpeed suits palm grip on one AA battery, the SteelSeries Rival 3 Wireless Gen 2 covers a PC and a laptop on one AAA, and the Razer Orochi V2 is the compact travel pick at the lowest price here.",
    ],
    picks: [
      ["B0G12HGHGM", "Best for Click Feel", "haptic click feedback with 8kHz wireless polling", "Competitive players who want to tune how a click feels."],
      ["B0F3QCXL82", "Lightest Listed Weight", "56g, the lightest listed weight here, with 8000Hz wireless polling", "Right-handed players who flick-aim in shooters."],
      ["B0CVR5DM26", "Best Ambidextrous Pick", "a 57g ambidextrous shape with replaceable switches and up to 618 hours of listed battery life", "Left-handed players and anyone who swaps hands."],
      ["B0BXBC26X8", "Best for Palm Grip", "a right-handed shape with a built-in thumb rest and 9 programmable buttons", "Palm-grip players in MMOs and single-player games."],
      ["B0F6B4TY2W", "Best for PC and Laptop", "2.4GHz for games and Bluetooth for a second device on one AAA battery", "Players who move one mouse between a desktop and a laptop."],
      ["B0916N2LPZ", "Best for Travel", "a compact shape under 60g with up to 950 hours on Bluetooth", "Laptop gaming away from the desk."],
    ],
    prio: ["wireless", "shape", "weight"], related: RM.slice(0, 3),
  }),
  gm({
    slug: "best-wired-gaming-mouse", kw: "wired gaming mouse",
    seo: "Best Wired Gaming Mice", title: "The Best Wired Gaming Mice",
    meta: "Six wired gaming mice compared on weight, switches, polling rate and buttons, from a 49g compact mouse to a 13-button Logitech.",
    dek: "Six wired gaming mice, from a 49g compact shape to Logitech's 13-button G502 X, compared on weight, switches and polling.",
    teaser: "Compare weight, switch ratings and button count; a cable removes battery weight and charging, so these trade on shape and feel.",
    intro: [
      "A wired mouse never needs charging, carries no battery weight and usually costs less than its wireless twin. Several wired mice now also support 8000Hz polling over the cable. The useful differences are shape, weight, switch type and how many buttons you need.",
      "We compared six wired mice using the specifications in their Amazon listings and makers' pages. We did not test them ourselves, and a missing figure in a listing is noted rather than filled in.",
    ],
    bottom: [
      "The Logitech G502 X is the pick if you use extra buttons, with 13 programmable controls. The Razer DeathAdder V3 suits right-handed shooter players with 8000Hz polling, and the SteelSeries Prime lists the highest-rated switches here at the lowest price when we checked.",
      "For lighter mice, the Glorious Model O 2 Mini is the lightest at 49g, the HyperX Pulsefire Haste 2 adds 8000Hz polling and grip tape, and the Razer Cobra is a compact all-rounder with fine DPI steps.",
    ],
    picks: [
      ["B0943HXDVM", "Most Buttons", "13 programmable controls, the most listed here", "MMO, MOBA and productivity macros on one mouse."],
      ["B0B6XTDJS1", "Best Right-Handed Shape", "the DeathAdder ergonomic shape refined with esports players, with 8000Hz polling", "Right-handed palm and claw grips in shooters."],
      ["B093LSC9KY", "Longest-Rated Switches", "optical magnetic switches rated for 100 million clicks", "Heavy clickers who keep a mouse for years."],
      ["B0DHYNCKKK", "Lightest Listed Weight", "a 49g symmetrical shape, the lightest listed here", "Small to medium hands and fingertip or claw grip."],
      ["B0BX52PCJ5", "Best Value 8K Polling", "8000Hz polling on a 53g wired mouse with grip tape in the box", "Players who want high polling without a flagship price."],
      ["B0C51J2ZXN", "Best Compact All-Rounder", "a 58g compact shape with sensitivity adjustable in 50 DPI steps", "Most grip styles on a smaller desk."],
    ],
    prio: ["shape", "weight", "polling"], related: [RM[1], RM[3], RM[4]],
  }),
  vm({
    slug: "best-vertical-ergonomic-mouse", kw: "vertical ergonomic mouse",
    seo: "Best Vertical Ergonomic Mice", title: "The Best Vertical Ergonomic Mice",
    meta: "Six vertical ergonomic mice compared on grip angle, hand size, connection and battery, including a left-handed model and a wired option.",
    dek: "Six vertical mice that turn the hand to a handshake position, including a left-handed Logitech and a wired Anker under $20.",
    teaser: "Check the listed hand size and grip angle first; a vertical mouse that is too small or too large undoes the point of buying one.",
    intro: [
      "A vertical mouse turns your hand to a handshake position instead of palm-down, which reduces forearm twist for people who feel strain from a flat mouse. Expect a week or so to adjust. The biggest mistake is buying the wrong size, so check the hand-size guidance each maker gives.",
      "We researched six vertical mice from their Amazon listings and makers' specifications. We did not test them, and we make no medical claims; if you have pain, a clinician is the right person to advise on it.",
    ],
    bottom: [
      "The Logitech MX Vertical is the pick for one-press cursor speed changes on a 57-degree shape, while the Logitech Lift is the smaller, quieter option Logitech sizes for small to medium hands, and the Lift Left is the rare left-handed model.",
      "The Razer Pro Click V2 Vertical adds a wrist base, six buttons and five-device switching. The ProtoArc EM11 NL is the budget rechargeable pick for hands under 7.5 inches, and the Anker wired vertical mouse is the cheapest way to find out whether the grip works for you.",
    ],
    picks: [
      ["B07FNJB8TT", "Best Cursor Control", "a cursor speed switch that changes DPI with one press, on a 57-degree shape", "Right-handed users who switch between detail work and big screens."],
      ["B09J1TB35S", "Best for Smaller Hands", "a shape Logitech sizes for small to medium right hands, with whisper-quiet clicks", "Small to medium hands in shared offices."],
      ["B09J1SYX5B", "Best Left-Handed", "a left-handed version of the Lift with the thumb rest mirrored", "Left-handed users, who have few vertical options."],
      ["B0DVD5RTZ5", "Most Devices", "switching between up to 5 devices over HyperSpeed, Bluetooth or cable", "Multi-computer desks and light gaming."],
      ["B0DCBW3B3T", "Best Budget Rechargeable", "a USB-C rechargeable battery and silent main buttons under $30 at the time of writing", "Hands under 7.5 inches on a budget."],
      ["B00FPAVUHC", "Best Wired Option", "a wired USB connection with nothing to charge", "Trying a vertical grip for the least money."],
    ],
    prio: ["hand-size", "shape", "quiet"], related: RW,
  }),
  qk({
    slug: "best-quiet-gaming-keyboard", kw: "quiet gaming keyboard",
    seo: "Best Quiet Gaming Keyboards", title: "The Best Quiet Gaming Keyboards",
    meta: "Six quiet gaming keyboards compared on silent switches, dampening foam, layout and connection, for late-night play and shared rooms.",
    dek: "Six gaming keyboards with silent switches or built-in dampening, from Cherry's MX2A Silent Red to gasket-mounted wireless boards.",
    teaser: "Look for silent switches or listed dampening layers; lighting and polling matter less than how loudly each key bottoms out.",
    intro: [
      "Most keyboard noise comes from two places: the switch itself, and the keycap and plate ringing when a key bottoms out. Silent switches add pads to soften the first; foam, silicone and gasket mounts deal with the second. The quietest boards do both.",
      "Every keyboard here lists at least one quiet feature: silent switches, dampening layers or both. We researched them from their Amazon listings and makers' specifications, did not test them ourselves, and name the specific quiet feature in each pick's label.",
    ],
    bottom: [
      "The Cherry MX 3.0S is the pick for silent switches from the switch maker itself, and the SOLAKAKA KI99 Pro combines silent switches with five noise-reducing layers in a wireless 96% board. The ASUS ROG Strix Scope II 96 Wireless adds dampening foam, PBT keycaps and a stated 1,500-hour battery on 2.4GHz.",
      "For smaller desks, the Razer Reclusa X Mini is a dampened 65% board with hot-swap sockets, and the Redragon K686 PRO brings a gasket mount and tri-mode connection for less. The SteelSeries Apex 3 TKL is the simple wired option with spill resistance.",
    ],
    picks: [
      ["B08YRRLV25", "Best Silent Switches", "Cherry MX2A Silent Red linear switches rated for more than 50 million actuations", "Players who want silence built into the switch."],
      ["B0FWCG4NDG", "Quietest-by-Design Wireless", "silent switches plus a gasket structure with five noise-reducing layers", "Late-night gaming next to someone asleep."],
      ["B0C7KFZ5TL", "Best Full-Function Wireless", "a 96% layout with a number pad, sound-dampening foam and a stated 1,500 hours on 2.4GHz", "A wireless board that keeps a number pad."],
      ["B0H9CC8JCZ", "Best Compact Dampened Board", "dual-layer silicone dampening and a PPS plate in a 65% layout", "Small desks and players who plan to swap switches."],
      ["B0CZ6SMBR4", "Best Budget Gasket Board", "a gasket mount with 5-layer noise dampening and tri-mode connection", "A softer, quieter sound on a mid-range budget."],
      ["B09FTNMT84", "Best Spill-Resistant Pick", "whisper-quiet switches with IP32 water and dust resistance", "Desks where drinks sit next to the keyboard."],
    ],
    prio: ["switch", "layout", "connection"], related: RK,
  }),
];
