import mice from "@/data/pcj-pool/mice.json";
import kb from "@/data/pcj-pool/keyboards.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { mouseFacts } from "./peripherals";
import { workMouseFacts } from "./input";
import { withPool } from "./helpers";

/** Batch 13c mouse fact sheets (gaming and everyday). Listing claims only, reviewed by hand. */
const P = { ...(kb as Record<string, { img?: string; price?: string }>), ...(mice as Record<string, { img?: string; price?: string }>) };
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const mice13cFacts: Record<string, Fact> = {
  ...mouseFacts,
  ...withPool(P, [
    // Budget wired
    F("B094PS5RZQ", "Razer DeathAdder Essential Wired Gaming Mouse", "DeathAdder Essential", { buttons: 5, dpi: 6400, connection: "Wired", shape: "Right-handed ergonomic" }, ["mechanical switches rated for 10 million clicks", "dedicated DPI buttons for on-the-fly changes", "macro assignment through Razer Synapse"]),
    F("B0C1T2HL7L", "ASUS TUF Gaming M3 Gen II Wired Mouse", "TUF M3 Gen II", { weight: 59, dpi: 8000, connection: "Wired", shape: "Right-handed ergonomic" }, ["IP56 water and dust resistance", "an antibacterial coating on the shell and buttons", "a DPI button with four sensitivity levels"]),
    F("B07YN82X3B", "Logitech G203 Wired Gaming Mouse", "G203", { buttons: 6, dpi: 8000, connection: "Wired" }, ["mechanical primary buttons tensioned with metal springs", "up to 5 DPI presets cycled from the middle button", "G HUB software for sensitivity profiles"]),
    F("B0895BG8QP", "Logitech G102 2nd Gen Lightsync Gaming Mouse", "G102", { buttons: 6, dpi: 8000, connection: "Wired" }, ["the classic six-button G shape", "metal spring tensioning on the primary buttons", "Lightsync RGB lighting"]),
    F("B08SJ5Z8JL", "Redragon M612 Wired RGB Gaming Mouse", "M612", { dpi: 8000, connection: "Wired", shape: "Right-handed ergonomic" }, ["remappable buttons through Redragon software", "RGB backlighting", "a low price even among budget wired mice"]),
    F("B0F6BDV5Q8", "SteelSeries Rival 3 Gen 2 Gaming Mouse", "Rival 3 Gen 2", { weight: 77, dpi: 8500, connection: "Wired" }, ["a TrueMove Core optical sensor", "switches rated for 60 million clicks", "SteelSeries GG software for DPI and lighting"]),
    F("B0CV8QWVYX", "Lenovo M210 RGB Wired Gaming Mouse", "Lenovo M210", { weight: 75, dpi: 8000, connection: "Wired" }, ["RGB lighting", "support for Windows and ChromeOS", "a DPI button for quick sensitivity changes"]),
    // Lightweight and FPS
    F("B093LSC9KY", "SteelSeries Prime Wired Esports Mouse", "SteelSeries Prime", { weight: 69, buttons: 5, dpi: 18000, connection: "Wired" }, ["optical magnetic switches rated for 100 million clicks", "a TrueMove Pro sensor with 18K CPI", "a streamlined shape built for FPS play"]),
    F("B0C51J2ZXN", "Razer Cobra Wired Gaming Mouse", "Cobra", { weight: 58, dpi: 8500, connection: "Wired" }, ["Gen-3 optical switches rated for 90 million clicks", "sensitivity adjustable in 50 DPI steps", "a compact shape for most grip styles"]),
    F("B0F9B79WBR", "Glorious Model O Eternal Wired Gaming Mouse", "Model O Eternal", { weight: 55, buttons: 6, connection: "Wired", shape: "Ambidextrous" }, ["a honeycomb shell", "mechanical switches rated for 80 million clicks", "Glorious CORE software for remapping"]),
    F("B07VMM5LKH", "Glorious Model O- (Minus) Wired Gaming Mouse", "Model O-", { weight: 58, buttons: 6, connection: "Wired", shape: "Ambidextrous, compact" }, ["a size Glorious lists for medium and small hands", "a honeycomb shell", "a flexible braided cable"]),
    F("B0DHYNCKKK", "Glorious Model O 2 Mini Wired Gaming Mouse", "Model O 2 Mini", { weight: 49, dpi: 26000, connection: "Wired", shape: "Symmetrical, compact" }, ["a symmetrical shape Glorious lists for palm, claw and fingertip grips", "a 26K optical sensor", "motion sync support"]),
    F("B0BX52PCJ5", "HyperX Pulsefire Haste 2 Wired Gaming Mouse", "Pulsefire Haste 2", { weight: 53, dpi: 26000, polling: 8000, connection: "Wired" }, ["four pieces of included grip tape", "a 26K sensor", "8000Hz polling on a wired budget mouse"]),
    F("B0B6XTDJS1", "Razer DeathAdder V3 Wired Gaming Mouse", "DeathAdder V3", { weight: 59, polling: 8000, connection: "Wired", shape: "Right-handed ergonomic" }, ["the DeathAdder ergonomic shape refined with esports players", "8000Hz HyperPolling", "a Focus Pro 30K optical sensor"]),
    F("B0CF4L9LPR", "Attack Shark X3 Wireless Gaming Mouse", "Attack Shark X3", { weight: 49, dpi: 26000, battery: 200, connection: "2.4GHz, Bluetooth, wired" }, ["a PixArt PAW3395 sensor", "Kailh GM 8.0 switches rated for 80 million clicks", "lift-off distance and polling set in software"]),
    F("B0F1MQDS4J", "Redragon M725 Wireless Gaming Mouse", "M725", { weight: 49, buttons: 5, dpi: 8000, connection: "2.4GHz, Bluetooth, wired", shape: "Symmetrical" }, ["a honeycomb shell", "5 onboard configuration modes", "tri-mode connection at a budget price"]),
    // Wireless gaming
    F("B09ZY348SY", "Redragon M810 PRO Wireless Gaming Mouse", "M810 PRO", { dpi: 10000, polling: 1000, battery: 45, connection: "2.4GHz, wired" }, ["remappable buttons through software", "RGB lighting", "a rechargeable battery"]),
    F("B0F6B4TY2W", "SteelSeries Rival 3 Wireless Gen 2", "Rival 3 Wireless Gen 2", { dpi: 18000, battery: 200, connection: "2.4GHz, Bluetooth" }, ["up to 450 hours on Bluetooth", "runs on a single AAA battery", "switches rated for 60 million clicks"]),
    F("B0D2BJTX1L", "HyperX Pulsefire Haste 2 Core Wireless", "Haste 2 Core Wireless", { weight: 70, dpi: 12000, battery: 100, connection: "2.4GHz, Bluetooth" }, ["runs on one AAA battery", "dual wireless modes", "a lighter budget version of the Haste 2 shape"]),
    F("B0CJ617PWP", "HyperX Pulsefire Haste 2 Wireless", "Haste 2 Wireless", { weight: 61, dpi: 26000, battery: 100, connection: "2.4GHz, Bluetooth" }, ["a 26K sensor", "included grip tape", "dual wireless modes"]),
    F("B0DSQ4L7VK", "HyperX Pulsefire Saga Pro Wireless", "Pulsefire Saga Pro", { weight: 72, battery: 90, polling: 4000, connection: "2.4GHz, Bluetooth, wired" }, ["interchangeable magnetic shell parts for different grips", "4000Hz polling", "a modular design unique among these picks"]),
    F("B07X828YG9", "HyperX Pulsefire Dart Wireless", "Pulsefire Dart", { dpi: 16000, battery: 50, connection: "2.4GHz, wired", shape: "Right-handed ergonomic" }, ["Qi wireless charging", "padded leatherette side grips", "a large right-handed shape"]),
    F("B07B9TVQ82", "HyperX Pulsefire Surge RGB Wired", "Pulsefire Surge", { buttons: 6, dpi: 16000, connection: "Wired" }, ["Omron switches rated for 50 million clicks", "a 360-degree RGB ring", "onboard memory for settings"]),
    F("B07NSSPV9S", "Logitech G703 Lightspeed Wireless", "G703", { weight: 95, battery: 35, connection: "Lightspeed 2.4GHz", shape: "Right-handed ergonomic" }, ["PowerPlay wireless charging support", "an optional 10g weight", "a Hero sensor"]),
    F("B07QKC4WWD", "Logitech G502 Lightspeed Wireless", "G502 Lightspeed", { buttons: 11, dpi: 25600, connection: "Lightspeed 2.4GHz" }, ["adjustable weights", "a hyper-fast scroll wheel", "PowerPlay wireless charging support"]),
    F("B0943HXDVM", "Logitech G502 X Wired Gaming Mouse", "G502 X", { weight: 89, buttons: 13, connection: "Wired" }, ["Lightforce hybrid optical-mechanical switches", "a Hero 25K sensor", "a reversible DPI-shift button"]),
    F("B0G12HGHGM", "Logitech G PRO X2 Superstrike Wireless", "PRO X2 Superstrike", { dpi: 44000, polling: 8000, connection: "Lightspeed 2.4GHz" }, ["haptic click feedback", "a Hero 2 sensor", "8kHz wireless polling"]),
    F("B0B6XZLNHQ", "Razer DeathAdder V3 Pro Wireless", "DeathAdder V3 Pro", { weight: 63, dpi: 30000, battery: 90, connection: "HyperSpeed 2.4GHz", shape: "Right-handed ergonomic" }, ["a Focus Pro 30K sensor", "the DeathAdder shape refined with esports players", "USB-C charging"]),
    F("B0F3QCXL82", "Razer DeathAdder V4 Pro Wireless", "DeathAdder V4 Pro", { weight: 56, polling: 8000, battery: 150, connection: "HyperSpeed 2.4GHz", shape: "Right-handed ergonomic" }, ["8000Hz wireless polling", "an optical scroll wheel", "Gen-4 optical switches rated for 100 million clicks"]),
    F("B0CVRGCGWJ", "Razer Viper V3 Pro Wireless", "Viper V3 Pro", { weight: 54, dpi: 35000, polling: 8000, battery: 95, connection: "HyperSpeed 2.4GHz", shape: "Symmetrical" }, ["a Focus Pro 35K sensor", "8000Hz wireless polling", "a symmetrical esports shape"]),
    F("B0CF4DJM7F", "Razer Viper V3 HyperSpeed Wireless", "Viper V3 HyperSpeed", { weight: 82, dpi: 30000, battery: 280, connection: "HyperSpeed 2.4GHz" }, ["a Focus Pro 30K sensor", "runs on a single AA battery", "a lower price than the Viper V3 Pro"]),
    F("B0CVR5DM26", "ASUS ROG Strix Impact III Wireless", "Strix Impact III Wireless", { weight: 57, dpi: 36000, battery: 618, connection: "2.4GHz, Bluetooth", shape: "Ambidextrous" }, ["a 36K ROG AimPoint sensor", "replaceable switches", "Bluetooth pairing with up to 3 devices"]),
    F("B0BLFMS36J", "Glorious Model O 2 Wireless", "Model O 2 Wireless", { weight: 68, dpi: 26000, battery: 110, connection: "2.4GHz, Bluetooth", shape: "Ambidextrous" }, ["up to 210 hours on Bluetooth", "a BAMF 2.0 26K sensor", "smaller shell holes than the original Model O Wireless"]),
    F("B0916N2LPZ", "Razer Orochi V2 Wireless", "Orochi V2", { dpi: 18000, battery: 425, connection: "HyperSpeed 2.4GHz, Bluetooth" }, ["up to 950 hours on Bluetooth", "a hybrid slot for one AA or AAA battery", "a compact mobile shape under 60g"]),
    F("B0FMX627VP", "Acer Dual-Mode Wireless Gaming Mouse", "Acer dual-mode", { dpi: 24000, battery: 40, connection: "2.4GHz, Bluetooth" }, ["a rechargeable battery", "dual wireless modes", "a budget price"]),
    // Ergonomic, large hands, palm grip
    F("B09C13PZX7", "Razer Basilisk V3 Wired Gaming Mouse", "Basilisk V3", { buttons: 11, dpi: 26000, connection: "Wired", shape: "Right-handed ergonomic with thumb rest" }, ["a thumb rest built into the shell", "a HyperScroll tilt wheel", "Chroma RGB underglow"]),
    F("B0DG837JYP", "Razer Basilisk V3 Pro 35K Wireless", "Basilisk V3 Pro 35K", { buttons: 13, dpi: 35000, battery: 140, polling: 8000, connection: "HyperSpeed 2.4GHz, Bluetooth, wired", shape: "Right-handed ergonomic with thumb rest" }, ["13 programmable controls", "a HyperScroll tilt wheel", "8000Hz wireless polling"]),
    F("B0BXBC26X8", "Razer Basilisk V3 X HyperSpeed", "Basilisk V3 X HyperSpeed", { buttons: 9, dpi: 18000, battery: 285, connection: "HyperSpeed 2.4GHz, Bluetooth", shape: "Right-handed ergonomic with thumb rest" }, ["up to 535 hours on Bluetooth", "runs on a single AA battery", "a thumb rest shape"]),
    F("B0G1CPTN1F", "Corsair Ironclaw Wireless SE", "Ironclaw Wireless SE", { buttons: 10, battery: 285, connection: "Slipstream 2.4GHz, Bluetooth", shape: "Right-handed, for larger hands" }, ["an asymmetric shape Corsair lists for larger hands and palm grip", "up to 532 hours in its low-power mode", "surface calibration"]),
    F("B0FJ54Q9DH", "Redragon Large Wireless Gaming Mouse", "Redragon large", { dpi: 12800, connection: "2.4GHz, Bluetooth, wired", shape: "Right-handed, for big hands" }, ["finger rests on both sides", "Bluetooth pairing with 3 devices", "a 1000mAh battery"]),
    F("B0BKKTBMYV", "E-YOOSO X-31 Large Wireless Mouse", "E-YOOSO X-31", { buttons: 6, dpi: 4800, connection: "2.4GHz", shape: "Right-handed, large" }, ["a large body with forward and back buttons", "a selectable 125Hz or 250Hz polling rate", "the lowest price among the large mice here"]),
    F("B0C51934VF", "Razer Cobra Pro Wireless", "Cobra Pro", { buttons: 10, dpi: 30000, battery: 100, connection: "HyperSpeed 2.4GHz, Bluetooth" }, ["up to 170 hours on Bluetooth", "10 programmable controls in a compact shell", "5 onboard memory profiles"]),
    // Ambidextrous and left-handed
    F("B0CL14NJZY", "EVGA X10 Wired Gaming Mouse", "EVGA X10", { buttons: 9, dpi: 8200, connection: "Wired", shape: "Ambidextrous" }, ["an ambidextrous shape for left or right hands", "a laser sensor", "adjustable weights"]),
    F("B0FQV4HTN2", "Pulsar X3 LHD Crazylight Mini", "Pulsar X3 LHD Mini", { dpi: 32000, connection: "Wireless", shape: "Left-handed, compact" }, ["a true left-handed shape", "a palm-claw hybrid shape", "symmetrical button height"]),
    F("B00EO2ECUY", "Razer Naga Left-Handed Edition", "Naga Left-Handed", { buttons: 12, dpi: 8200, connection: "Wired", shape: "Left-handed" }, ["a 12-button thumb grid mirrored for the left hand", "a laser sensor", "Razer Synapse macro support"]),
    F("B0CTN13WT1", "Corsair M75 Wired Gaming Mouse", "M75 Wired", { weight: 74, dpi: 26000, connection: "Wired", shape: "Ambidextrous" }, ["swappable side buttons for left or right hands", "a 26K optical sensor", "RGB lighting"]),
    // MMO
    F("B0F6NGCDFN", "Corsair Scimitar Elite Wireless SE", "Scimitar Elite Wireless SE", { buttons: 16, dpi: 33000, connection: "Slipstream 2.4GHz, Bluetooth, wired" }, ["a 12-button side panel", "Stream Deck integration", "a 33K sensor"]),
    F("B088B3ZM76", "Redragon M913 Impact Elite Wireless MMO Mouse", "M913", { buttons: 16, dpi: 16000, connection: "2.4GHz, wired" }, ["12 side buttons", "a rechargeable battery", "a budget price for a wireless MMO mouse"]),
    F("B0FVRPBJDF", "Redragon M913 MAX Wireless MMO Mouse", "M913 MAX", { dpi: 26000, connection: "2.4GHz, wired" }, ["a 12-button side panel", "a 26K sensor, up from the M913's 16K", "remappable keys through software"]),
    F("B07XP4K152", "UtechSmart Venus Pro Wireless MMO Mouse", "Venus Pro", { buttons: 16, dpi: 16000, connection: "2.4GHz, wired" }, ["12 thumb buttons set at different angles", "a 1000mAh rechargeable battery", "wired mode over a 1.5m cable"]),
    F("B0CKN2NSYL", "Redragon Wireless MMO Gaming Mouse", "Redragon wireless MMO", { buttons: 16, dpi: 16000, battery: 70, connection: "2.4GHz, wired" }, ["16 macro-programmable buttons", "up to 70 hours per charge", "an ergonomic right-handed shape"]),
    F("B0D3PNVQWK", "Redragon Wired MMO Gaming Mouse", "Redragon wired MMO", { buttons: 19, dpi: 12400, connection: "Wired" }, ["19 macro-programmable buttons", "a 12400 DPI sensor", "no battery to charge"]),
    F("B0H4SBT4SH", "Razer Naga V3 Pro Wireless", "Naga V3 Pro", { dpi: 50000, battery: 155, connection: "HyperSpeed 2.4GHz, Bluetooth" }, ["swappable side plates for MMO, MOBA and FPS layouts", "up to 280 hours on Bluetooth", "a 50K sensor"]),
  ]),
};

export const workMice13cFacts: Record<string, Fact> = {
  ...workMouseFacts,
  ...withPool(P, [
    F("B0BXNR9DB6", "Logitech M240 Silent Bluetooth Mouse", "M240", { battery: 18, grip: "Compact, ambidextrous", connection: "Bluetooth" }, ["silent clicks", "a 10m Bluetooth range", "no USB receiver needed"]),
    F("B0D9N7RY1D", "Logitech M196 Bluetooth Mouse", "M196", { battery: 12, grip: "Compact, ambidextrous", connection: "Bluetooth" }, ["a lightweight travel size", "an AA battery in the box", "pair-and-play Bluetooth setup"]),
    F("B087Z6LSHW", "Logitech M720 Triathlon Multi-Device Mouse", "M720", { battery: 24, buttons: 6, grip: "Full-size, right-handed", connection: "Bluetooth or Unifying receiver, 3 devices" }, ["switching between 3 computers at the touch of a button", "Logitech Flow across computers", "a Unifying receiver for up to 6 Logitech devices"]),
    F("B0BPY4ZQXG", "Logitech MX Anywhere 3S", "MX Anywhere 3S", { dpi: 8000, grip: "Compact", connection: "Bluetooth, 3 devices" }, ["tracking on glass", "a rechargeable USB-C battery", "a MagSpeed scroll wheel"]),
    F("B0CVFJ1YSX", "Logitech MX Anywhere 3S for Mac", "MX Anywhere 3S for Mac", { dpi: 8000, grip: "Compact", connection: "Bluetooth LE, 3 devices" }, ["a Mac version tuned for macOS and iPadOS", "tracking on glass", "a rechargeable USB-C battery"]),
    F("B09KX66ZCD", "Logitech Signature M650", "Signature M650", { battery: 24, grip: "Right-handed, small to medium hands", connection: "Bluetooth or Logi Bolt" }, ["customizable side buttons", "silent clicks", "support for Windows, macOS, Linux, ChromeOS, iPadOS and Android"]),
    F("B0DJH1DPCC", "Lenovo WL310 Bluetooth Silent Mouse", "Lenovo WL310", { dpi: 1600, grip: "Ergonomic", connection: "Bluetooth 5.0" }, ["silent clicks", "1000, 1200 and 1600 DPI steps", "no USB receiver needed"]),
    F("B0DL72PK1P", "Apple Magic Mouse (USB-C)", "Magic Mouse", { battery: 1, grip: "Low-profile, ambidextrous", connection: "Bluetooth" }, ["a Multi-Touch surface for gestures", "a rechargeable battery that Apple says lasts about a month", "native macOS support"]),
    F("B0CW9T3RJR", "TECKNET Silent Dual-Mode Wireless Mouse", "TECKNET silent", { dpi: 4800, buttons: 6, grip: "Compact, small to medium hands", connection: "Bluetooth and 2.4GHz, 2 devices" }, ["silent left and right clicks", "a slide switch between two devices", "six DPI steps"]),
    F("B01JPOLKDW", "Logitech M330 Silent Plus", "M330 Silent Plus", { battery: 18, grip: "Full-size, right-handed", connection: "2.4GHz USB receiver" }, ["silent clicks", "an auto-sleep power-saving mode", "plug-and-play USB receiver"]),
    F("B0CP3HTHLZ", "TECKNET Rechargeable Dual-Mode Mouse", "TECKNET rechargeable", { battery: 3, grip: "Compact", connection: "Bluetooth and 2.4GHz, 2 devices" }, ["a built-in rechargeable battery", "a 1.5 to 2 hour full charge", "a slide switch between two devices"]),
    F("B0D2JGKRMM", "Lenovo Yoga Pro Mouse", "Yoga Pro Mouse", { battery: 2, dpi: 4000, grip: "Ergonomic, right-handed", connection: "Bluetooth 5.1, 2 devices" }, ["a USB-C rechargeable battery", "silent left and right buttons", "programmable side and top buttons"]),
    F("B0DCVP49FN", "Uineer Rechargeable Wireless Mouse", "Uineer rechargeable", { dpi: 2400, grip: "Compact", connection: "2.4GHz USB receiver" }, ["a visual battery level display", "a built-in rechargeable battery", "four DPI steps"]),
  ]),
};
