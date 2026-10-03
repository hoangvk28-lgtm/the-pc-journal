import pool from "@/data/pcj-pool/keyboards.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 28 keyboard fact sheets for keyboardSchema: TKL, 60/65/75% and low-profile boards from the major gaming
 * brands, Hall effect and optical boards, and a few ergonomic and macro-key models. Listing titles and bullets only,
 * reviewed by hand; layout, switch, connection, polling and keycap fields stay undefined when the listing does not state
 * them. Switch-only, keycap-only, barebones, renewed and colour-duplicate listings are skipped.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const expand28KeyboardFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  // SteelSeries
  F("B0DF2QL2GK", "SteelSeries Apex Pro TKL Gen 3", "Apex Pro TKL Gen 3", { layout: "TKL", switch: "OmniPoint 3.0 HyperMagnetic", connection: "Wired" }, ["adjustable actuation with Rapid Trigger"]),
  F("B0DW736WVD", "SteelSeries Apex Pro TKL Wireless Gen 3", "Apex Pro TKL Wireless Gen 3", { layout: "TKL", switch: "OmniPoint 3.0 HyperMagnetic", connection: "2.4GHz, Bluetooth" }, ["adjustable actuation with Rapid Trigger", "lag-free 2.4GHz for gaming and Bluetooth for everyday use"]),
  F("B0B9T6S5S4", "SteelSeries Apex 9 TKL", "Apex 9 TKL", { layout: "TKL", switch: "Optical, 2-point actuation", keycaps: "Double-shot PBT" }, ["a removable USB-C cable", "a tenkeyless body that leaves room for mouse swipes"]),
  F("B07VFK33Q6", "SteelSeries Apex 7 TKL", "Apex 7 TKL", { layout: "TKL" }, ["an OLED smart display", "USB passthrough and media controls"]),
  F("B0B16JFF54", "SteelSeries Apex Pro Mini Wireless", "Apex Pro Mini Wireless", { layout: "60%", connection: "2.4GHz, Bluetooth 5.0" }, ["a 60% layout with full-size functionality", "a premium aluminum frame"]),
  // Razer
  F("B0FFJDH7GM", "Razer Huntsman Mini 60% (Linear Optical, White)", "Huntsman Mini", { layout: "60%", switch: "Linear optical", keycaps: "Doubleshot PBT" }, ["oil-resistant keycaps"]),
  F("B0DVD3MKVK", "Razer Huntsman V3 Pro Mini 60%", "Huntsman V3 Pro Mini", { layout: "60%", switch: "Analog optical", keycaps: "Doubleshot PBT" }, ["Rapid Trigger and adjustable actuation", "textured keycaps"]),
  F("B0CG7BWG7J", "Razer Huntsman V3 Pro TKL", "Huntsman V3 Pro TKL", { layout: "TKL", switch: "Analog optical", keycaps: "Doubleshot PBT" }, ["Rapid Trigger and Snap Tap", "a magnetic leatherette wrist rest"]),
  F("B0H7YZCTYF", "Razer Huntsman V3 Pro Low-Profile Tenkeyless", "Huntsman V3 Pro Low-Profile TKL", { layout: "TKL, low-profile", connection: "Wired, detachable USB-C", polling: 8000, keycaps: "Doubleshot PBT" }, ["a 5052 aluminum top plate"]),
  F("B0CSLH4LSK", "Razer Huntsman V3 Pro", "Huntsman V3 Pro", { layout: "Full-size", switch: "Analog optical", keycaps: "Doubleshot PBT" }, ["Rapid Trigger and adjustable actuation", "a brushed aluminum top plate"]),
  F("B0H47Z2J3T", "Razer Huntsman V3 HE Magnetic TKL 8KHz", "Huntsman V3 HE TKL", { layout: "TKL", switch: "Hall effect magnetic", connection: "Wired", polling: 8000, keycaps: "Doubleshot PBT" }, ["Snap Tap and Rapid Trigger"]),
  F("B0C8QYB8W6", "Razer BlackWidow V4 X", "BlackWidow V4 X", { switch: "Razer Yellow linear", keycaps: "Doubleshot ABS" }, ["doubleshot ABS keycaps with extra-thick walls"]),
  F("B0BV4BC7LV", "Razer BlackWidow V4 Pro", "BlackWidow V4 Pro", { switch: "Razer Yellow linear", connection: "Wired", keycaps: "Doubleshot ABS" }, ["doubleshot ABS keycaps with extra-thick walls"]),
  F("B0FD5276Z6", "Razer BlackWidow V4 TKL Wireless", "BlackWidow V4 TKL Wireless", { layout: "TKL", switch: "Razer Orange tactile", connection: "2.4GHz, Bluetooth (3 devices)" }, ["a hot-swappable design"]),
  F("B0CCFY349S", "Razer BlackWidow V4 75%", "BlackWidow V4 75%", { layout: "75%", switch: "Razer Orange tactile" }, ["a hot-swappable design"]),
  F("B0DD5S8TM8", "Razer BlackWidow V4 Pro 75% Wireless", "BlackWidow V4 Pro 75%", { layout: "75%", switch: "Razer Orange tactile", connection: "2.4GHz, Bluetooth (3 devices)" }, ["a hot-swappable design", "HyperSpeed wireless with HyperPolling"]),
  F("B09X6FKCBD", "Razer Ornata V3", "Ornata V3", { layout: "Full-size" }, ["low-profile keys with shorter switches", "UV-coated keycaps"]),
  // Logitech
  F("B0BQBRPZ8M", "Logitech G Pro X TKL Lightspeed (Linear)", "G Pro X TKL Lightspeed", { layout: "TKL", switch: "GX linear", connection: "Lightspeed, Bluetooth, wired", keycaps: "Double-shot" }, ["a tenkeyless body built for esports"]),
  F("B0GFG86YYJ", "Logitech G Pro X TKL Rapid", "G Pro X TKL Rapid", { layout: "TKL", switch: "Magnetic analog", connection: "Wired" }, ["adjustable actuation points"]),
  F("B07QGHK6Q8", "Logitech G213 Prodigy", "G213 Prodigy", { connection: "Wired" }, ["per-key RGB lighting"]),
  F("B0FSF4CY5D", "Logitech G Pro X 60 Lightspeed", "G Pro X 60", { layout: "60%", connection: "Lightspeed wireless" }, ["a 1ms wireless connection", "a carrying case in the box"]),
  F("B08XF4WRG1", "Logitech G Pro Mechanical", "G Pro Mechanical", { layout: "TKL", connection: "Wired, detachable micro-USB" }, ["an ultra-portable tenkeyless design"]),
  F("B08L8BP9KK", "Logitech G915 TKL", "G915 TKL", { layout: "TKL, low-profile", connection: "Lightspeed, Bluetooth", battery: 40 }, ["GL low-profile switches in linear, tactile or clicky", "an aircraft-grade aluminum body"]),
  F("B08Z7J4KV3", "Logitech G413 TKL SE", "G413 TKL SE", { layout: "TKL", switch: "Tactile", keycaps: "PBT" }, ["heat- and wear-resistant PBT keycaps"]),
  F("B092LHVB4N", "Logitech G715", "G715", { layout: "TKL", switch: "GX Brown tactile", connection: "Lightspeed, Bluetooth" }, ["a detachable palm rest", "keycaps and top plates in multiple colours"]),
  F("B0GNZQ5Y1D", "Logitech G512 X 75 TMR", "G512 X 75", { layout: "75%", switch: "TMR linear", keycaps: "Double-shot PBT" }, ["a body made with recycled plastic"]),
  F("B0D1G53TZ2", "Logitech G915 X (Wired, Linear)", "G915 X", { layout: "Full-size", switch: "Low-profile linear", connection: "Wired", keycaps: "Double-shot PBT" }, ["a full-size wired board with an aluminum top plate"]),
  F("B09LJWWX4Y", "Logitech MX Mechanical (Clicky)", "MX Mechanical", { layout: "Full-size", switch: "Low-profile clicky" }, ["a low-profile mechanical design for office work"]),
  F("B0GWLXBJPM", "Logitech G316 X 98 (Linear)", "G316 X 98", { layout: "98%", switch: "Linear, hot-swappable", keycaps: "Double-shot PBT" }, ["a space-saving 98% layout with a number pad"]),
  // Corsair
  F("B0CH3MRGK7", "Corsair K70 Core RGB", "K70 Core", { switch: "MLX Red linear", connection: "Wired", keycaps: "Double-shot ABS" }, ["a bundled palm rest", "SOCD handling for competitive play"]),
  F("B08HR74WV4", "Corsair K100 RGB Optical-Mechanical", "K100 RGB", { layout: "Full-size", switch: "OPX optical", connection: "Wired", polling: 4000, keycaps: "Double-shot PBT" }, ["4,000Hz key scanning"]),
  F("B0D7J3T8LH", "Corsair K70 Core TKL Wireless", "K70 Core TKL Wireless", { layout: "TKL", switch: "MLX Red v2 linear", connection: "Slipstream, Bluetooth", keycaps: "Double-shot ABS" }, ["a pre-lubed switch set"]),
  F("B0D7J5XVXG", "Corsair K70 Core TKL", "K70 Core TKL", { layout: "TKL", switch: "MLX Red v2 linear", connection: "Wired", keycaps: "Double-shot ABS" }, ["a pre-lubed switch set"]),
  F("B0G3QFLBWF", "Corsair MAKR Pro 75", "MAKR Pro 75", { layout: "75%", switch: "Magnetic" }, ["a frame that lets you hot-swap supported magnetic switches"]),
  F("B0D9W9KBT3", "Corsair K65 Plus Wireless 75%", "K65 Plus Wireless", { layout: "75%", switch: "MLX Fusion tactile", connection: "2.4GHz, Bluetooth, wired", keycaps: "Double-shot PBT" }, ["a hot-swappable switch board"]),
  F("B0H2F2C832", "Corsair Skiff 100 Quiet", "Skiff 100 Quiet", { layout: "Full-size", connection: "Wired" }, ["a full-size palm rest"]),
  F("B0FKHPRZ45", "Corsair Vanguard Pro 96", "Vanguard Pro 96", { layout: "96%", switch: "Hall effect magnetic", polling: 8000 }, ["a 96% body about the size of a TKL board"]),
  F("B0GYFMPV83", "Corsair Clipper Pro Mini 60", "Clipper Pro Mini 60", { layout: "60%", switch: "Hall effect", polling: 8000, keycaps: "Double-shot PBT" }, ["a water-resistant build"]),
  F("B0FWRWFNVR", "Corsair K55 RGB Pro", "K55 RGB Pro", { switch: "Membrane", connection: "Wired" }, ["a membrane board with RGB lighting"]),
  // HyperX
  F("B07YMHGP86", "HyperX Alloy Origins Core", "Alloy Origins Core", { layout: "TKL" }, ["software-controlled lighting and macros"]),
  F("B09RB7XB8Q", "HyperX Alloy Origins 65", "Alloy Origins 65", { layout: "65%", switch: "Linear red", keycaps: "Double-shot PBT" }, ["a compact 65% body"]),
  F("B09QP8XH7L", "HyperX Alloy Origins 60", "Alloy Origins 60", { layout: "60%", switch: "Tactile Aqua", keycaps: "Double-shot PBT" }, ["side-printed keycap legends", "a keycap puller and spare Esc keycap"]),
  F("B0CYNZN63J", "HyperX Alloy Rise", "Alloy Rise", { switch: "HyperX linear, hot-swappable", keycaps: "PBT" }, ["a gasket-mounted body", "an ambient light sensor"]),
  F("B0GGQWW7VP", "HyperX Origins 2 1800", "Origins 2 1800", { layout: "1800", switch: "Hot-swappable", polling: 8000 }, ["swappable housing", "5-pin hot-swap sockets"]),
  F("B07HRNKTCM", "HyperX Alloy Core RGB", "Alloy Core RGB", { switch: "Membrane" }, ["quiet, spill-resistant membrane keys"]),
  // ASUS ROG
  F("B0BSKX8W3B", "ASUS ROG Azoth", "ROG Azoth", { layout: "75% TKL", switch: "ROG NX Red, hot-swappable", connection: "2.4GHz, Bluetooth, wired" }, ["a tri-mode build with an OLED panel", "a switch opener, puller and lube kit in the box"]),
  F("B0D45ZHYZJ", "ASUS ROG Azoth Extreme", "ROG Azoth Extreme", { layout: "75% TKL", switch: "ROG NX Snow linear", connection: "2.4GHz, Bluetooth (3 devices), wired", polling: 8000, battery: 1600, keycaps: "PBT" }, ["an aluminum body", "8K polling with the Polling Rate Booster"]),
  F("B09GL8128T", "ASUS ROG Falchion NX", "ROG Falchion NX", { layout: "65%", switch: "ROG NX Brown tactile", connection: "2.4GHz, wired", battery: 450, keycaps: "PBT doubleshot" }, ["wireless Aura Sync RGB lighting"]),
  F("B0CYQD16TC", "ASUS ROG Falchion Ace", "ROG Falchion Ace", { layout: "65%", keycaps: "PBT doubleshot" }, ["NXRD mechanical switches", "a compact white body"]),
  F("B0D9J1933R", "ASUS ROG Falchion RX Low Profile", "ROG Falchion RX", { layout: "65%, low-profile", switch: "ROG RX Red low-profile", connection: "Bluetooth (3 devices), 2.4GHz, wired" }, ["a ROG Omni Receiver for multiple devices"]),
  F("B0CNL7XMC3", "ASUS ROG Strix Scope II 96 Wireless", "ROG Scope II 96", { layout: "96%", connection: "Bluetooth (3 devices), 2.4GHz, wired", battery: 1500 }, ["a detachable wrist rest", "hot-swappable pre-lubed switches"]),
  F("B0CLHLLFBP", "ASUS ROG Strix Scope II", "ROG Scope II", { switch: "ROG RX Red linear optical", keycaps: "PBT doubleshot" }, ["sound-dampening foam", "pre-programmed F1-F5 hotkeys"]),
  F("B09D8M1GJS", "ASUS ROG Strix Scope NX TKL Moonlight White", "ROG Scope NX TKL", { layout: "TKL", switch: "ROG NX Brown tactile", connection: "Wired" }, ["a white aluminum top plate"]),
  F("B08R6D148D", "ASUS ROG Strix Scope RX", "ROG Scope RX", { switch: "Red optical" }, ["USB 2.0 passthrough", "a 2x wider Ctrl key"]),
  F("B0H3QLBS4R", "ASUS ROG Falchion Ace 75 HE", "ROG Falchion Ace 75 HE", { layout: "75% TKL", switch: "ROG HFX V2X magnetic, hot-swappable", connection: "Wired", polling: 8000, keycaps: "PBT double shot" }, ["analog Hall effect switches"]),
  // Keychron
  F("B0DCVPGB9N", "Keychron K2 HE", "Keychron K2 HE", { layout: "75%", switch: "Hall effect magnetic", connection: "Wireless" }, ["a custom Hall effect board"]),
  F("B09YYBPKSS", "Keychron K2 (75%)", "Keychron K2", { layout: "75% (84 keys)", switch: "Hot-swappable", connection: "Bluetooth, wired" }, ["an 84-key wireless mechanical layout"]),
  F("B09TXKLGXN", "Keychron Q3 TKL", "Keychron Q3", { layout: "TKL", connection: "Wired" }, ["a custom QMK/VIA programmable aluminum body with a knob"]),
  F("B0CW52PG6Q", "Keychron V3 Max TKL", "Keychron V3 Max", { layout: "TKL", connection: "2.4GHz, Bluetooth" }, ["QMK programmability"]),
  F("B09TXDQKCK", "Keychron Q1 RGB (Knob)", "Keychron Q1", { layout: "75%", connection: "Wired" }, ["QMK/VIA programmability with a knob"]),
  F("B0CR16KS3F", "Keychron V1 Max", "Keychron V1 Max", { layout: "75%", connection: "Wireless" }, ["QMK programmability with a knob"]),
  F("B0D4YKXSPD", "Keychron Q1 HE", "Keychron Q1 HE", { layout: "75%", switch: "Magnetic", connection: "Wireless" }, ["a QMK custom board"]),
  F("B0FG2MWXCJ", "Keychron K5 Version 2", "Keychron K5 V2", { layout: "Low-profile", connection: "Bluetooth" }, ["a low-profile mechanical design"]),
  F("B09JG7KRC7", "Keychron C2 (Brown)", "Keychron C2", { layout: "Full-size", switch: "Brown tactile", connection: "Wired" }, ["a retro look"]),
  F("B0DT3LPDGP", "Keychron K10", "Keychron K10", { layout: "Full-size (104 keys)", connection: "Bluetooth, wired" }, ["a full-size wireless mechanical board"]),
  // Other brands
  F("B0F3SH26P9", "be quiet! Dark Mount (Tactile)", "be quiet! Dark Mount", { switch: "Tactile, silent" }, ["silent mechanical switches"]),
  F("B0BHKXLDY4", "Cooler Master CK720", "Cooler Master CK720", { layout: "65%", switch: "Kailh Box V2", connection: "Wireless" }, ["a hot-swappable board"]),
  F("B08ZYYS3HK", "Cooler Master SK620", "Cooler Master SK620", { layout: "60%", switch: "Low-profile blue" }, ["a 60% low-profile mechanical board"]),
  F("B0832LSV8N", "Royal Kludge RK61 Wired", "RK61 Wired", { layout: "60% (61 keys)", connection: "Wired" }, ["QMK/VIA programmability with RGB lighting"]),
  F("B07WJJC45T", "MSI Vigor GK30", "MSI Vigor GK30", { layout: "Full-size" }, ["6-zone RGB lighting", "a water-repellent splash-proof body"]),
  F("B019O9BLVY", "Redragon K552P TKL", "Redragon K552P", { layout: "TKL", switch: "Hot-swappable red", connection: "Wired" }, ["18 backlight modes"]),
  F("B09Y2GR6P9", "Ducky One 3 (Cherry Blue)", "Ducky One 3", { layout: "Full-size (100%)", switch: "Cherry MX Blue clicky" }, ["RGB backlighting"]),
  F("B0BSNZ37C9", "Ducky One 3 TKL Aura", "Ducky One 3 TKL", { layout: "TKL (80%)", switch: "Cherry MX Red linear" }, ["RGB backlighting"]),
  F("B09Y2J5516", "Ducky One 3 Mini (Cherry Brown)", "Ducky One 3 Mini", { layout: "60%", switch: "Cherry MX Brown tactile" }, ["RGB backlighting"]),
  F("B0CMXCYMCY", "NuPhy Air75 V2", "NuPhy Air75 V2", { layout: "75%, low-profile", connection: "Bluetooth, 2.4GHz, USB-C" }, ["a portable low-profile build"]),
  F("B09WRSX7JX", "Glorious GMMK Pro 75%", "GMMK Pro", { layout: "75% TKL" }, ["a modular 1.5kg aluminum frame", "Fox switches"]),
  F("B09YZ3BNYP", "Glorious GMMK 2 Full Size", "GMMK 2 Full Size", { layout: "Full-size", switch: "Cherry MX-style linear, hot-swappable" }, ["a hot-swap board"]),
  F("B0DCH5GHVR", "Glorious GMMK 3 Rapid Trigger", "GMMK 3 Rapid Trigger", { switch: "Hall effect", polling: 8000 }, ["hot-swap support for MX and magnetic switches"]),
  F("B0CF1Q4WHT", "Akko 5075B Plus", "Akko 5075B Plus", { layout: "75%", switch: "Creamy, hot-swappable" }, ["a knob and hot-swap sockets"]),
  F("B0GJZYZRG5", "Akko Air 01 Low Profile", "Akko Air 01", { layout: "Low-profile", connection: "Wireless" }, ["a low-profile hot-swappable board"]),
  F("B0DKNWS8X6", "Akko 5098B with Screen", "Akko 5098B", { layout: "Full-size", connection: "Wireless" }, ["a built-in screen", "hot-swappable switches"]),
  F("B0FK59XFKJ", "Epomaker G84 HE", "Epomaker G84 HE", { switch: "Hall effect", connection: "Wireless", polling: 8000 }, ["an 8000mAh battery"]),
  // Macro keys
  F("B08WQX1XS3", "Redragon K550 RGB", "Redragon K550", { layout: "Full-size (104 keys) plus 12 macro keys", connection: "Wired" }, ["12 dedicated macro G keys", "an aluminum top plate"]),
  F("B0CS68QV83", "Redragon K580 Pro", "Redragon K580 Pro", { connection: "Wireless" }, ["macro G keys and a media wheel"]),
]);
