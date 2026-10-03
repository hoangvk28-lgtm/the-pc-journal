import kb from "@/data/pcj-pool/keyboards.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { keyboardFacts } from "./peripherals";
import { keyboardExtFacts } from "./keyboards-ext";
import { workKeyboardFacts } from "./input";
import { withPool } from "./helpers";

/** Batch 13c keyboard fact sheets. Listing claims only; contradictory listings (DIERYA T68SE) were dropped. */
const P = kb as Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const keyboards13cFacts: Record<string, Fact> = {
  ...keyboardFacts,
  ...keyboardExtFacts,
  ...withPool(P, [
    // 60% and 65%
    F("B0DSMWJD6M", "AULA WIN60 HE Magnetic Keyboard", "WIN60 HE", { layout: "60%", switch: "Hall effect magnetic", connection: "Wired", polling: 8000 }, ["rapid trigger with adjustable actuation", "hot-swappable magnetic switches", "a lightweight driver app"]),
    F("B0F62XJWMF", "AULA WIN60 HE PRO Magnetic Keyboard", "WIN60 HE PRO", { layout: "60%", switch: "Hall effect magnetic", connection: "Wired", polling: 8000 }, ["rapid trigger with adjustable actuation", "hot-swappable magnetic switches", "under-LED lighting"]),
    F("B0F2GVF5HC", "Razer Huntsman Mini", "Huntsman Mini", { layout: "60%", switch: "Linear optical", connection: "Wired", keycaps: "Doubleshot PBT" }, ["optical switches with a shorter actuation distance than standard linears, per Razer", "Hypershift for a second layer of key functions", "per-key Chroma RGB"]),
    F("B09BVCVTBC", "Redragon K617 Fizz 60% Keyboard", "K617", { layout: "60%", switch: "Red linear", connection: "Wired" }, ["hot-swap sockets for 3-pin and 5-pin switches", "switches rated for 50 million keypresses", "custom lighting and macro software"]),
    F("B0FGXK7X6F", "Redragon K617 HE Magnetic Keyboard", "K617 HE", { layout: "60%", switch: "Hall effect magnetic", connection: "Wired", polling: 8000 }, ["rapid trigger", "desktop and web-based calibration", "the lowest price among the 8000Hz boards here"]),
    F("B0D3CZYCH2", "GEODMAER 65% Wired Gaming Keyboard", "GEODMAER 65%", { layout: "65% (68 keys)", switch: "Membrane", connection: "Wired" }, ["separate arrow keys", "26-key rollover", "a lockable Windows key"]),
    F("B0H9CC8JCZ", "Razer Reclusa X Mini 65%", "Reclusa X Mini", { layout: "65%", switch: "Razer Orange tactile Gen-3", connection: "Wired", polling: 1000 }, ["hot-swap support for 3-pin and 5-pin switches", "a detachable USB-C cable", "N-key rollover"]),
    F("B098LG3N6R", "MageGee MK-Box 68-Key Keyboard", "MK-Box", { layout: "65% (68 keys)", switch: "Red linear", connection: "Wired" }, ["separate arrow keys in a 68-key frame", "plug-and-play support for Windows, Linux and Mac", "full anti-ghosting"]),
    F("B099PTK6PY", "FANTECH Maxfit61", "Maxfit61", { layout: "60%", switch: "Blue clicky", connection: "Wired" }, ["hot-swap for 3-pin and 5-pin switches from any brand", "switch and keycap pullers in the box", "a detachable USB-C cable"]),
    F("B0FF4C68V3", "DIERYA DK68E 60% Keyboard", "DK68E", { layout: "60%", switch: "Pre-lubed linear", connection: "Wired", polling: 1000 }, ["hot-swap for 3-pin and 5-pin switches", "browser-based remapping on Windows, macOS or Linux", "dampening foam layers"]),
    F("B0C77GZYP6", "Geeky GK61 60% Keyboard", "GK61", { layout: "60% (61 keys)", switch: "Mechanical, hot-swappable", connection: "Wired", polling: 1000 }, ["hot-swap sockets", "macro and remapping software", "Mac and Windows support"]),
    F("B0FBWHYLL3", "DAREU EK60 HE Magnetic Keyboard", "EK60 HE", { layout: "60%", switch: "Hall effect magnetic", connection: "Wired", polling: 8000 }, ["adjustable rapid trigger", "a web driver that supports macOS", "an 8000Hz board near $35 at the time of writing"]),
    F("B0FXG675GK", "NuPhy BH65 Hall Effect Keyboard", "BH65", { layout: "65%", switch: "Hall effect magnetic", connection: "Wired", polling: 8000 }, ["a 16,000Hz key scan rate", "hot-swappable magnetic switches", "per-key actuation and rapid trigger settings"]),
    F("B0DQXT1R29", "Attack Shark X68 HE", "X68 HE", { layout: "65% (68 keys)", switch: "Hall effect magnetic", connection: "Wired", polling: 8000 }, ["dynamic keystrokes with up to 4 actions per key", "rapid trigger", "an adjustable actuation point"]),
    F("B0CG7C1NVP", "Razer Huntsman V3 Pro Mini", "Huntsman V3 Pro Mini", { layout: "60%", switch: "Analog optical Gen-2", connection: "Wired", keycaps: "Doubleshot PBT" }, ["rapid trigger and Snap Tap", "switches rated for 100 million keystrokes", "dual-purpose modifier keys"]),
    F("B0BRSSGBCN", "Logitech G PRO X 60 Lightspeed", "PRO X 60", { layout: "60%", switch: "GX optical", connection: "Lightspeed, Bluetooth, wired" }, ["a choice of tactile or linear optical switches", "a volume roller", "Lightsync RGB"]),
    F("B0H47SVZSR", "Razer Huntsman V3 HE Mini 65%", "Huntsman V3 HE Mini", { layout: "65%", switch: "Hall effect magnetic", connection: "Wired", polling: 8000, keycaps: "Doubleshot PBT" }, ["rapid trigger and Snap Tap", "per-key tuning in Synapse Web", "8000Hz HyperPolling"]),
    F("B0F11HCGST", "SteelSeries Apex Pro Mini Gen 3", "Apex Pro Mini Gen 3", { layout: "60%", switch: "OmniPoint 3.0 Hall effect", connection: "Wired" }, ["Rapid Trigger and Rapid Tap", "a Protection Mode against accidental presses", "OmniPoint 3.0 switches with 20x faster actuation, per SteelSeries"]),
    F("B0B16HC4K8", "SteelSeries Apex 9 Mini", "Apex 9 Mini", { layout: "60%", switch: "OptiPoint optical", connection: "Wired", keycaps: "Doubleshot PBT" }, ["swappable OptiPoint switches", "zero debounce", "a lower price than the Apex Pro Mini"]),
    F("B0CSLLK2XQ", "Razer Huntsman V3 Pro Mini (Analog)", "Huntsman V3 Pro Mini analog", { layout: "60%", switch: "Analog optical Gen-2", connection: "Wired", keycaps: "Doubleshot PBT" }, ["rapid trigger with on-the-fly actuation changes", "an onboard visual guide for adjustments", "a lower listing price than the Esports edition"]),
    // 75% and wireless
    F("B0GXVHQP9H", "AULA F75 HE Wireless", "F75 HE", { layout: "75% (80 keys)", switch: "Hall effect magnetic", connection: "2.4GHz, Bluetooth, wired" }, ["a 4000mAh battery", "a control knob", "hot-swappable switches"]),
    F("B0D14N2QZF", "AULA F75 Pro Wireless", "F75 Pro", { layout: "75%", switch: "LEOBOG Reaper pre-lubed", connection: "2.4GHz, Bluetooth, wired" }, ["a 4000mAh battery", "hot-swap for 3-pin and 5-pin switches", "listed support for PlayStation and Xbox"]),
    F("B0DCVQBMVP", "Keychron K2 HE Wireless", "K2 HE", { layout: "75%", switch: "Gateron Hall effect magnetic", connection: "2.4GHz, Bluetooth, wired", polling: 1000, keycaps: "Shine-through PBT" }, ["rapid trigger and adjustable actuation", "macOS and Windows support", "acoustic foam"]),
    F("B0GQLPPTW5", "Keychron K2 Ultra 8K", "K2 Ultra", { layout: "75%", switch: "Keychron Apex Red linear", connection: "2.4GHz, Bluetooth, wired", polling: 8000, battery: 760, keycaps: "PBT" }, ["8000Hz polling in wired and 2.4GHz modes", "hot-swap for 3-pin and 5-pin switches", "an aluminum frame"]),
    F("B07QCP491R", "Keychron K2 Wireless", "K2", { layout: "75% (84 keys)", switch: "Keychron Super Brown", connection: "Bluetooth, wired", battery: 72 }, ["a Mac layout with extra Windows keycaps", "a 4000mAh battery", "pairing with 3 Bluetooth devices"]),
    F("B08LSJ4RHH", "Keychron K3 Version 2", "K3", { layout: "75%, low-profile", switch: "Low-profile mechanical", connection: "Bluetooth, wired" }, ["a Mac layout with extra Windows keycaps", "pairing with 3 devices", "QMK remapping"]),
    F("B0DBZGH5XM", "Kisnt KN85 Wireless", "KN85", { layout: "75%", switch: "Bsun linear, pre-lubed", connection: "2.4GHz, Bluetooth, wired", keycaps: "PBT" }, ["a 4000mAh battery", "hot-swap for 3-pin and 5-pin switches", "Windows and Mac switching"]),
    F("B0CDX5XGLK", "Redragon K673 PRO Wireless", "K673 PRO", { layout: "75% (81 keys)", connection: "2.4GHz, Bluetooth, wired" }, ["a gasket mount", "a scroll knob", "hot-swap for 3-pin and 5-pin switches"]),
    F("B0FCM4SZ3L", "Redragon K724 PRO Wireless", "K724 PRO", { layout: "75% (81 keys)", switch: "Lubed linear", connection: "2.4GHz, Bluetooth, wired" }, ["a built-in screen and knob", "a gasket mount", "5-layer noise dampening"]),
    F("B086DQP567", "Redragon K530 Pro Draconic", "K530 Pro", { layout: "60% (61 keys)", switch: "Brown tactile", connection: "2.4GHz, Bluetooth, wired" }, ["a side switch between 2.4GHz and two Bluetooth devices", "hot-swap sockets", "a compact 61-key frame"]),
    // Full-size and budget
    F("B07ZGDPT4M", "SteelSeries Apex 3 RGB", "Apex 3", { layout: "Full-size", switch: "Whisper-quiet membrane", connection: "Wired" }, ["IP32 water resistance", "a magnetic wrist rest", "listed support for Xbox Series X|S, PS4 and PS5"]),
    F("B0DRFGNWV1", "Redragon K521 Gaming Keyboard", "K521", { layout: "Full-size (104 keys)", switch: "Membrane", connection: "Wired" }, ["dedicated multimedia keys", "listed support for PS4, PS5, Xbox and macOS", "plug and play with no driver"]),
    F("B0CF3VGQFL", "Redragon K671 Mechanical Keyboard", "K671", { layout: "Full-size", switch: "Red linear, hot-swappable", connection: "Wired" }, ["4 spare switches in the box", "macro editing", "11 backlight modes"]),
    F("B0CDWP1D58", "Redragon K668 Wired Keyboard", "K668", { layout: "Full-size (108 keys)", switch: "Red linear", connection: "Wired" }, ["4 extra hotkeys", "hot-swap for 3-pin and 5-pin switches", "macro and lighting software"]),
    F("B07G11G2X8", "Redragon K580 VATA", "K580", { layout: "Full-size (104 keys)", switch: "Blue clicky", connection: "Wired" }, ["5 dedicated macro keys", "a media wheel", "on-the-fly macro recording without software"]),
    F("B01NAI2TXC", "Redragon K556 Devarajas", "K556", { layout: "Full-size (104 keys)", switch: "Brown tactile", connection: "Wired" }, ["an aluminum top plate", "hot-swap for 3-pin and 5-pin switches", "plug and play on Windows and Mac"]),
    F("B0FDKPF9QJ", "Redragon K745 PRO Wireless", "K745 PRO", { layout: "Full-size (108 keys)", connection: "2.4GHz, Bluetooth, wired", keycaps: "Translucent PBT" }, ["a gasket mount", "4 hotkeys", "hot-swap for 3-pin and 5-pin switches"]),
    F("B0GPX33BS2", "Redragon K768 PRO Wireless", "K768 PRO", { layout: "100 keys", switch: "Custom linear", connection: "2.4GHz, Bluetooth, wired", keycaps: "PBT" }, ["an 8000mAh battery, the largest here", "a control knob", "a gasket mount"]),
    F("B0G56TCBT6", "TECKNET Wireless Gaming Keyboard", "TECKNET wireless", { layout: "Full-size", switch: "Quiet membrane", connection: "2.4GHz, wired" }, ["a 4000mAh rechargeable battery", "quick switching between wired and 2.4GHz", "near-silent keys"]),
    F("B08Z6X4NK3", "Logitech G413 SE", "G413 SE", { layout: "Full-size", switch: "Tactile mechanical", connection: "Wired", keycaps: "PBT" }, ["an aluminum top case", "anti-ghosting on gaming keys", "white LED backlighting"]),
  ]),
};

export const workKeyboards13cFacts: Record<string, Fact> = {
  ...workKeyboardFacts,
  ...withPool(P, [
    // Touchpad keyboards
    F("B0DQ2L1FHJ", "Logitech K400 Plus Wireless Touch Keyboard", "K400 Plus", { battery: 18, devices: 1, layout: "Compact with touchpad", keys: "Quiet low-profile keys", connection: "2.4GHz Unifying receiver" }, ["an integrated touchpad", "a 10m wireless range", "dedicated media hotkeys"]),
    F("B09KLPJQPD", "Arteck HB305 Backlit Bluetooth Touch Keyboard", "Arteck HB305", { layout: "Compact with touchpad", keys: "Backlit keys, 7 colors", connection: "Bluetooth, USB-C charging" }, ["support for Windows, Mac, Android, iPadOS and ChromeOS", "a 24-month warranty", "a 10m wireless range"]),
    F("B07FSKZVRG", "Arteck 2.4G Wireless Touch Keyboard", "Arteck 2.4G", { layout: "Compact with touchpad", keys: "Low-profile keys", connection: "2.4GHz USB receiver, 2 AAA batteries" }, ["a stainless steel build", "media hotkeys", "a 24-month warranty"]),
    F("B0D5CR6Y47", "Bnnwa Multi-Device Keyboard with Touchpad", "Bnnwa multi-device", { devices: 3, layout: "Slim with touchpad", keys: "Low-profile keys", connection: "Bluetooth and 2.4GHz" }, ["switching between 3 devices", "a touchpad lock with Fn", "12 multimedia shortcuts"]),
    F("B0GSQ1M76R", "Bnnwa K905 Rechargeable Touchpad Keyboard", "Bnnwa K905", { devices: 3, layout: "Compact with touchpad", keys: "Low-profile keys", connection: "2.4GHz and two Bluetooth channels" }, ["a built-in 500mAh rechargeable battery", "USB-C charging", "connection to 3 devices at once"]),
    F("B0DVNCLK7Q", "Adesso Wireless Touchpad Keyboard", "Adesso touchpad", { layout: "Full-size (104 keys) with touchpad", keys: "Membrane keys", connection: "2.4GHz USB receiver" }, ["a full number pad next to the touchpad", "13 internet and 8 media hotkeys", "a battery-low indicator"]),
    F("B0H7QR5JH6", "CZUR K5S Touchpad Keyboard", "CZUR K5S", { layout: "Compact with touchpad", keys: "Low-profile keys", connection: "Bluetooth or wired USB" }, ["OS shortcuts for Mac/iOS, Windows and Android", "a rechargeable battery", "a wired mode"]),
    // Compact wireless
    F("B0BT4DP7SC", "Logitech Pebble Keys 2 K380s", "K380s", { battery: 36, devices: 3, layout: "Compact, no number pad", keys: "Quiet scooped round keys", connection: "Bluetooth, multi-OS" }, ["customizable Fn keys in Logi Options+", "a 3-year battery life claim", "auto-sleep"]),
    F("B098JPSVKY", "Logitech MX Keys Mini", "MX Keys Mini", { battery: 5, devices: 3, layout: "Compact, no number pad", keys: "Spherically dished Perfect Stroke keys", connection: "Bluetooth LE, multi-OS" }, ["backlighting that turns on as your hands approach", "dictation, mic mute and emoji keys", "USB-C charging"]),
    F("B0F37LY1FN", "Logitech K250 Compact Bluetooth Keyboard", "K250", { battery: 12, layout: "Compact with number pad", keys: "Deep-profile keys", connection: "Bluetooth" }, ["a number pad in a compact frame", "a spill-resistant design", "adjustable tilt legs"]),
    F("B072N471V4", "TECKNET 2.4G Mini Wireless Keyboard", "TECKNET mini", { battery: 12, layout: "Compact", keys: "Quiet low-travel keys", connection: "2.4GHz USB receiver only" }, ["a 36-month warranty with registration", "media hotkeys", "Windows, Mac, ChromeOS and Linux support"]),
    F("B0F124RMPF", "Macally Compact Wireless Keyboard", "Macally compact", { layout: "Compact (78 keys)", keys: "Slim keys", connection: "2.4GHz USB receiver, 1 AAA battery" }, ["12 shortcut keys", "an on/off switch to save battery", "a battery included in the box"]),
    F("B09LK63PKB", "Logitech MX Mechanical Mini for Mac", "MX Mechanical Mini for Mac", { devices: 3, layout: "Compact 75%, low-profile", keys: "Tactile Quiet mechanical", connection: "Bluetooth LE" }, ["a Mac key layout", "up to 15 days per charge with backlighting on", "Flow control with a matching Logitech mouse"]),
  ]),
};
