import mice from "@/data/pcj-pool/mice.json";
import kb from "@/data/pcj-pool/keyboards.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { keyboards13cFacts } from "./keyboards13c";
import { workMice13cFacts } from "./mice13c";
import { withPool } from "./helpers";

/**
 * Batch 15a fact sheets: vertical ergonomic mice and quiet gaming keyboards. Listing claims only,
 * reviewed by hand; a field stays undefined when the maker doesn't state it in the unit the schema uses.
 */
const P = { ...(kb as Record<string, { img?: string; price?: string }>), ...(mice as Record<string, { img?: string; price?: string }>) };
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const verticalMice15aFacts: Record<string, Fact> = {
  ...workMice13cFacts,
  ...withPool(P, [
    F("B07FNJB8TT", "Logitech MX Vertical Wireless Ergonomic Mouse", "MX Vertical", { dpi: 4000, grip: "Vertical, right-handed (57°)", connection: "Wireless, USB receiver" }, ["a 57-degree vertical angle with a thumb rest", "a cursor speed switch that changes DPI with one button", "a textured rubber surface"]),
    F("B09J1TB35S", "Logitech Lift Vertical Ergonomic Wireless Mouse", "Lift", { battery: 24, grip: "Vertical, right-handed, small to medium hands (57°)", connection: "Bluetooth LE or Logi Bolt USB receiver" }, ["whisper-quiet clicks", "a SmartWheel for fast or line-by-line scrolling", "customizable buttons within thumb reach"]),
    F("B09J1SYX5B", "Logitech Lift Left Vertical Ergonomic Wireless Mouse", "Lift Left", { battery: 24, grip: "Vertical, left-handed, small to medium hands (57°)", connection: "Bluetooth LE or Logi Bolt USB receiver" }, ["a thumb rest sculpted for left hands", "whisper-quiet clicks", "a SmartWheel for fast or line-by-line scrolling"]),
    F("B0DVD5RTZ5", "Razer Pro Click V2 Vertical Wireless Mouse", "Pro Click V2 Vertical", { battery: 6, buttons: 6, dpi: 30000, grip: "Vertical, right-handed, with base support", connection: "HyperSpeed 2.4GHz, Bluetooth or wired, up to 5 devices" }, ["a base support that raises the wrist off the desk", "3 working days of use from a 5-minute charge", "a Focus Pro 30K sensor that tracks on glass"]),
    F("B0DCBW3B3T", "ProtoArc EM11 NL Wireless Ergonomic Vertical Mouse", "EM11 NL", { dpi: 2400, grip: "Vertical, right-handed, hands under 7.5 in (58°)", connection: "Bluetooth (2 channels) and 2.4GHz, 3 devices" }, ["silent left and right buttons (the wheel and side buttons are not silent)", "a USB-C rechargeable 500mAh battery rated for up to 100 hours", "a stated hand-length limit of 7.5 inches"]),
    F("B00FPAVUHC", "Anker Wired Vertical Ergonomic Mouse", "Anker wired vertical", { dpi: 1600, grip: "Vertical, right-handed", connection: "Wired USB, 1.5m cable" }, ["a 5.3oz body", "an 18-month warranty", "next and previous page buttons"]),
  ]),
};

export const quietKeyboards15aFacts: Record<string, Fact> = {
  ...keyboards13cFacts,
  ...withPool(P, [
    F("B08YRRLV25", "Cherry MX 3.0S Wired Mechanical Gaming Keyboard (MX2A Silent Red)", "MX 3.0S Silent Red", { switch: "Cherry MX2A Silent Red (linear)", connection: "Wired, detachable micro-USB" }, ["Cherry MX2A Silent Red switches rated for more than 50 million actuations", "an extruded aluminium housing", "full N-key rollover and a Windows-key lock"]),
    F("B0C7KFZ5TL", "ASUS ROG Strix Scope II 96 Wireless Gaming Keyboard", "Strix Scope II 96 Wireless", { layout: "96%", switch: "ROG NX Snow linear, pre-lubed, hot-swappable", connection: "2.4GHz, Bluetooth (3 devices), wired", battery: 1500, keycaps: "PBT" }, ["sound-dampening foam and switch-dampening pads", "a number pad in a body 1 cm wider than an 80% board", "a detachable wrist rest"]),
    F("B0FWCG4NDG", "SOLAKAKA KI99 Pro Wireless Mechanical Keyboard (Silent Switch)", "KI99 Pro", { layout: "96%", switch: "Silent switches, hot-swappable (3/5-pin)", connection: "Bluetooth 5.0, 2.4GHz, USB-C", keycaps: "PBT" }, ["a gasket structure with five noise-reducing layers", "a 10,000mAh battery", "a knob for volume, media and lighting"]),
    F("B0H9CC8JCZ", "Razer Reclusa X Mini 65% Mechanical Gaming Keyboard", "Reclusa X Mini", { layout: "65%", switch: "Razer Orange Tactile Gen-3, hot-swappable", connection: "Wired, detachable USB-C", polling: 1000, keycaps: "Doubleshot ABS" }, ["dual-layer silicone dampening and a PPS plate", "switches Razer describes as engineered for quieter actuation", "Snap Tap and Dual-Keypress Priority"]),
    F("B0CZ6SMBR4", "Redragon K686 PRO Wireless Gasket Gaming Keyboard", "K686 PRO", { switch: "Hot-swappable (3/5-pin sockets)", connection: "USB-C, Bluetooth, 2.4GHz" }, ["a gasket mount with 5-layer noise dampening", "one knob for lighting and media", "a blue and white colorway"]),
    F("B09FTNMT84", "SteelSeries Apex 3 TKL RGB Gaming Keyboard", "Apex 3 TKL", { layout: "Tenkeyless", switch: "Whisper-quiet gaming switches", connection: "Wired" }, ["whisper-quiet switches rated for over 20 million keypresses", "IP32 water and dust resistance", "a clickable volume roller and media keys"]),
  ]),
};
