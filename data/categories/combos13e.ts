import pool from "@/data/pcj-pool/combos.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { str, withPool } from "./helpers";

/**
 * Batch 13e keyboard-and-mouse combos and touchpad keyboards. Only claims stated in each Amazon
 * listing are recorded; fields a listing omits are left undefined.
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const comboSchema: CategorySchema = {
  id: "combo-13e",
  plural: "Combos",
  fields: [
    { key: "connection", label: "Connection", fmt: (v) => String(v), strength: (v) => (/tri-mode|bluetooth.*2\.4|2\.4.*bluetooth/i.test(String(v)) ? "more than one way to connect" : undefined) },
    { key: "kbBattery", label: "Keyboard battery", noun: "keyboard battery rating", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `up to ${v} months`, strength: (v) => (Number(v) >= 36 ? `a keyboard battery rated for up to ${v} months` : undefined) },
    { key: "dpi", label: "Max mouse DPI", noun: "maximum mouse sensitivity", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${Number(v).toLocaleString("en-US")} DPI` },
    { key: "range", label: "Wireless range", noun: "wireless range", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v} ft` },
    { key: "layout", label: "Keyboard layout", fmt: (v) => String(v) },
    { key: "pointer", label: "Mouse or pointer", fmt: (v) => String(v) },
    { key: "lighting", label: "Lighting", fmt: (v) => String(v), weakness: (v) => (/none/i.test(String(v)) ? "no backlighting" : undefined) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const c = str(f, "connection");
    if (/bolt/i.test(c)) s.push("Logi Bolt receivers do not pair with older Unifying devices, so keep the included receiver with this set.");
    else if (/unifying/i.test(c)) s.push("It uses a Unifying receiver, which can also pair other Unifying mice and keyboards.");
    if (/^bluetooth/i.test(c) && !/2\.4|receiver|wired/i.test(c)) s.push("It connects over Bluetooth only, so the PC needs Bluetooth built in or a USB adapter.");
    else if (/2\.4|receiver/i.test(c)) s.push("The receiver is USB-A; a USB-C-only laptop needs an adapter or hub.");
    if (/^wired/i.test(c)) s.push("Both pieces plug in by cable, so plan for two free USB ports near the desk.");
    if (/60%|65%|75%|compact/i.test(str(f, "layout"))) s.push("There is no dedicated number pad, which matters if you enter figures often.");
    if (/touchpad/i.test(str(f, "pointer"))) s.push("The touchpad replaces a mouse; check that your operating system is in the maker's support list for full gesture support.");
    return s;
  },
  criteria: [
    { id: "connection", title: "Receiver, Bluetooth or cable", body: "A USB receiver pairs out of the box and works in the BIOS; Bluetooth frees a port but needs the PC to support it. Tri-mode sets add a cable for charging and play.\n\nMatch the connection to the ports your PC or laptop actually has." },
    { id: "battery", title: "Battery rating and power type", body: "AA and AAA sets list battery life in months; rechargeable sets list hours or days per charge. Long ratings suit office desks, while rechargeable sets suit people who would rather plug in than buy batteries." },
    { id: "layout", title: "Full-size or compact", body: "A full-size board keeps the number pad for spreadsheets. A 60% to 75% board frees room for wide mouse sweeps, which matters more in games than in office work." },
    { id: "noise", title: "Key and click noise", body: "Membrane and silent-switch sets are quieter than mechanical blue or red switches. If you share a room or take calls, look for sets that name a silent or low-noise design." },
    { id: "mouse", title: "Check the mouse shape", body: "Many combo mice are small and ambidextrous. If you have large hands or want side buttons, check the mouse description; a right-handed contoured mouse or one with more buttons may suit you better." },
    { id: "gaming", title: "What gaming sets add", body: "Gaming combos add higher-DPI sensors, anti-ghosting and lighting. They do not make a mouse or keyboard better at office work, and budget gaming sets use membrane or budget switches." },
    { id: "os", title: "Operating system support", body: "Hotkeys and software often target Windows. If you use macOS or ChromeOS, look for a listing that names it, and expect some media keys to behave differently." },
  ],
  faq: [
    { id: "one-receiver", q: "Do the keyboard and mouse share one receiver?", a: "In most receiver-based combos, yes; the listing usually says one receiver pairs both. Keep it safe, since replacements are brand-specific." },
    { id: "gaming-ok", q: "Is a wireless combo fine for gaming?", a: "For casual play, a 2.4GHz receiver is fine. Competitive players often prefer a dedicated gaming mouse with a higher polling rate." },
    { id: "mac", q: "Will a Windows combo work on a Mac?", a: "Basic typing and pointing usually work. Some Windows keys map differently, and software may be Windows-only." },
    { id: "battery-type", q: "Rechargeable or disposable batteries?", a: "Disposable AA and AAA sets run for months and swap in seconds. Rechargeable sets avoid buying batteries but need a cable every few days to weeks, depending on lighting." },
    { id: "lag", q: "Do wireless combos lag?", a: "For typing and everyday use, input delay from a 2.4GHz receiver is not noticeable for most people. Bluetooth can take a moment to wake after sleep." },
    { id: "replace", q: "Can I replace just the mouse later?", a: "Yes. Any mouse works alongside the keyboard; you simply lose the shared receiver for the new mouse." },
    { id: "clean", q: "Are spill-resistant keyboards waterproof?", a: "No. Spill resistance means a small spill can drain away; it does not mean the keyboard can be submerged or rinsed." },
  ],
  evaluated: [
    { title: "Connection", description: "We recorded each set's receiver, Bluetooth or wired connection." },
    { title: "Power", description: "We compared listed battery ratings or rechargeable capacity." },
    { title: "Layout and mouse", description: "We noted the keyboard layout, number pad and mouse shape." },
    { title: "Extras", description: "We checked hotkeys, lighting, anti-ghosting and noise claims in each listing." },
  ],
};

export const combo13eFacts = withPool(pool as Pool, [
  // Logitech
  F("B079JLY5M5", "Logitech MK270 Wireless Keyboard and Mouse Combo", "MK270", { connection: "2.4GHz USB receiver", kbBattery: 36, range: 33, layout: "Full-size with 8 hotkeys", pointer: "Compact ambidextrous mouse", lighting: "None" }, ["a spill-resistant keyboard", "a mouse battery rated for up to 12 months", "eight media and shortcut hotkeys"]),
  F("B01AROOL12", "Logitech MK235 Wireless Keyboard and Mouse Combo", "MK235", { connection: "2.4GHz USB receiver", kbBattery: 36, range: 33, layout: "Full-size with 15 shortcut keys", pointer: "Compact ambidextrous mouse", lighting: "None" }, ["15 shortcut keys", "a mouse battery rated for up to one year", "one receiver for both pieces"]),
  F("B089KV4YYX", "Logitech MK295 Silent Wireless Keyboard and Mouse Combo", "MK295", { connection: "2.4GHz USB receiver", kbBattery: 36, range: 33, layout: "Full-size with numpad", pointer: "SilentTouch mouse", lighting: "None" }, ["SilentTouch keys and clicks Logitech rates at up to 90% less noise", "a mouse battery rated for up to 18 months", "a full-size layout with number pad"]),
  F("B00QXT5T3U", "Logitech MK345 Wireless Keyboard and Mouse Combo", "MK345", { connection: "2.4GHz USB receiver", kbBattery: 36, layout: "Full-size with palm rest", pointer: "Right-handed contoured mouse", lighting: "None" }, ["a built-in palm rest", "a right-handed contoured mouse", "Windows, macOS and ChromeOS support"]),
  F("B0F36RKWDH", "Logitech MK250 Compact Bluetooth Keyboard and Mouse Combo", "MK250", { connection: "Bluetooth", kbBattery: 12, layout: "Compact with numpad", pointer: "Compact mouse", lighting: "None" }, ["no USB receiver to lose", "a compact frame that still has a number pad", "a keyboard battery rated for up to 12 months"]),
  F("B07VD4Q84X", "Logitech MK470 Slim Wireless Keyboard and Mouse Combo", "MK470", { connection: "2.4GHz USB receiver", kbBattery: 36, dpi: 1000, layout: "Slim compact with numpad", pointer: "Slim ambidextrous mouse", lighting: "None" }, ["low-profile scissor keys", "a mouse battery rated for up to 18 months", "12 customizable FN keys"]),
  F("B072JX77X6", "Logitech MK335 Wireless Keyboard and Mouse Combo", "MK335", { connection: "2.4GHz USB receiver", kbBattery: 24, layout: "Full-size with numpad", pointer: "Contoured mouse", lighting: "None" }, ["11 hotkeys plus 4 programmable F-keys", "a mouse battery rated for up to 12 months", "a full-size layout"]),
  F("B0C75QFJMP", "Logitech MK955 Signature Slim Wireless Keyboard and Mouse Combo", "MK955", { connection: "Logi Bolt receiver, Bluetooth", layout: "Full-size slim (K950)", pointer: "M750 L mouse", lighting: "None" }, ["pairing with up to three devices", "a K950 slim keyboard with an M750 L mouse", "both Bolt and Bluetooth connections"]),
  // Dell
  F("B0GVP57N7Z", "Dell KM520 Wireless Keyboard and Mouse", "KM520", { connection: "2.4GHz USB receiver", kbBattery: 36, layout: "Full-size", pointer: "Three-button mouse", lighting: "None" }, ["programmable shortcut keys", "a three-button mouse", "one receiver for both pieces"]),
  F("B0GVP4J6XG", "Dell KM720 Multi-Device Wireless Keyboard and Mouse", "KM720", { connection: "2.4GHz receiver, Bluetooth 5.0", kbBattery: 36, dpi: 4000, layout: "Full-size with 12 programmable F-keys", pointer: "Seven-button mouse", lighting: "None" }, ["mouse sensitivity steps of 1000, 1600, 2400 and 4000 DPI", "a seven-button mouse", "12 programmable F-keys"]),
  F("B0DFMXBS7V", "Dell KM555 Silent Wireless Keyboard and Mouse", "KM555", { connection: "2.4GHz receiver, Bluetooth", layout: "Compact silent", pointer: "Ambidextrous mouse", lighting: "None" }, ["a silent key and click design", "an ambidextrous mouse", "dual-mode connection"]),
  F("B0H6QCWZST", "Dell Pro 5 Wireless Keyboard and Mouse KM526", "KM526", { connection: "2.4GHz USB receiver", kbBattery: 48, dpi: 6000, layout: "Full-size", pointer: "Symmetrical mouse", lighting: "None" }, ["a keyboard battery rated for up to 48 months", "a symmetrical mouse with up to 6K DPI", "a full-size layout"]),
  F("B0BBDNWKLK", "Dell Premier Collaboration Keyboard and Mouse KM900", "KM900", { connection: "2.4GHz receiver, Bluetooth 5.1", dpi: 8000, layout: "Full-size with scissor keys", pointer: "Track-on-glass mouse", lighting: "Proximity backlight" }, ["Zoom certification with dedicated collaboration keys", "a backlight that wakes as your hands approach", "a mouse sensor that tracks on glass, 800 to 8000 DPI"]),
  // Redragon
  F("B0DXTV9BGJ", "Redragon S101M-KS Wireless Keyboard and Mouse Combo", "S101M-KS", { connection: "Tri-mode: 2.4GHz, Bluetooth, wired", dpi: 4800, layout: "Full-size with 10 multimedia keys", pointer: "Seven-button gaming mouse", lighting: "Backlit" }, ["10 multimedia keys", "seven remappable mouse buttons", "mouse polling from 125 to 1000Hz"]),
  F("B0FDVZ5X38", "Redragon S107KS Wireless Gaming Keyboard and Mouse", "S107KS", { connection: "Tri-mode: 2.4GHz, Bluetooth, wired", dpi: 10000, layout: "Full-size", pointer: "65g gaming mouse", lighting: "Backlit" }, ["a 65g mouse rated for up to 200 hours per charge", "25-key anti-ghosting", "1000Hz mouse polling"]),
  F("B0D8MD5RLL", "Redragon S136 K628 PRO 75% Wireless Combo", "S136", { connection: "Tri-mode: 2.4GHz, Bluetooth, wired", dpi: 7200, layout: "75% (78 keys)", pointer: "Gaming mouse", lighting: "RGB" }, ["hot-swap sockets for 3-pin and 5-pin switches", "one dongle shared by keyboard and mouse", "a 78-key K628 PRO keyboard"]),
  F("B0DWMQRK3M", "Redragon S107 Wired Gaming Keyboard and Mouse", "S107", { connection: "Wired USB", dpi: 10000, layout: "Full-size", pointer: "Wired gaming mouse", lighting: "Backlit" }, ["5,000 DPI by button and 10,000 by software", "25-key anti-ghosting", "a 36-month warranty"]),
  F("B0H1HKHPPX", "Redragon BS7552 Low-Profile Wireless Keyboard and Mouse", "BS7552", { connection: "2.4GHz USB receiver", dpi: 4000, layout: "98-key low-profile", pointer: "Wireless mouse", lighting: "White backlight" }, ["a 98-key low-profile layout with number pad", "a pink finish", "mouse sensitivity from 400 to 4000 DPI"]),
  F("B0DH2H1DS9", "Redragon S142 Wireless Gaming Keyboard and Mouse", "S142", { connection: "2.4GHz USB receiver", dpi: 4800, layout: "Full-size K515 PRO membrane", pointer: "Wireless gaming mouse", lighting: "Backlit" }, ["four onboard macro keys", "26 anti-ghosting keys", "a membrane keyboard"]),
  F("B0FDG55BPG", "Redragon 75% Tri-Mode Wireless Keyboard and Mouse Combo", "Redragon 75% combo", { connection: "Tri-mode: 2.4GHz, Bluetooth, wired", dpi: 12800, layout: "75%", pointer: "Rechargeable gaming mouse", lighting: "RGB" }, ["a 4000mAh keyboard battery", "a 700mAh mouse battery", "mouse sensitivity from 100 to 12,800 DPI by software"]),
  F("B0G5YVRDXV", "Redragon BS8773 Low-Profile Mechanical Keyboard and Mouse", "BS8773", { connection: "2.4GHz USB receiver", dpi: 2400, layout: "78-key low-profile mechanical", pointer: "Wireless mouse", lighting: "Blue backlight" }, ["low-profile red switches with a 30g minimum actuation", "a 78-key layout", "mouse steps from 800 to 2400 DPI"]),
  F("B0H32KD4WQ", "Redragon K719 PRO Anime Keyboard and Mouse Combo", "K719 PRO combo", { connection: "Tri-mode: 2.4GHz, Bluetooth, wired", dpi: 8000, layout: "Gasket-mount mechanical with TFT screen", pointer: "Nine-button gaming mouse", lighting: "RGB" }, ["a built-in TFT screen", "a gasket-mount keyboard", "a nine-button 8000 DPI mouse"]),
  // Other gaming combos
  F("B0D99WMLQV", "CHONCHOW Wireless Gaming Keyboard and Mouse Combo", "CHONCHOW wireless", { connection: "2.4GHz USB receiver", layout: "Full-size (104 keys)", pointer: "Rechargeable mouse", lighting: "RGB" }, ["a 2500mAh keyboard battery", "a 500mAh mouse battery", "a 104-key layout"]),
  F("B09BR46F63", "RedThunder K10 Wireless Gaming Keyboard and Mouse", "K10 Wireless", { connection: "2.4GHz USB receiver", dpi: 3200, layout: "Full-size", pointer: "Rechargeable gaming mouse", lighting: "RGB" }, ["a 3000mAh keyboard battery and 800mAh mouse battery", "keys rated for 10 million keystrokes", "limited Mac support, as the maker notes"]),
  F("B0DN5Z2QY7", "CHONCHOW 60% Wireless Keyboard and Mouse Combo", "CHONCHOW 60%", { connection: "2.4GHz USB receiver", layout: "60% (68 keys)", pointer: "Rechargeable mouse", lighting: "RGB" }, ["a 68-key compact layout", "a 2000mAh keyboard battery", "a 500mAh mouse battery"]),
  F("B082V77SZ1", "LexonElec Wireless Gaming Keyboard and Mouse Combo", "LexonElec", { connection: "2.4GHz USB receiver", layout: "Full-size with removable hand rest", pointer: "Rechargeable mouse", lighting: "RGB" }, ["an aluminum top panel", "a 3000mAh keyboard battery", "a removable hand rest"]),
  F("B0B3RJML38", "AULA Wired Gaming Keyboard and Mouse Combo", "AULA combo", { connection: "Wired USB", dpi: 7200, layout: "Full-size with phone holder", pointer: "Wired gaming mouse", lighting: "RGB" }, ["a metal top panel", "a built-in phone holder", "a 7200 DPI mouse"]),
  F("B09N9FR2FH", "RedThunder K10 Wired Gaming Keyboard and Mouse", "K10 Wired", { connection: "Wired USB", dpi: 7200, layout: "Full-size with wrist rest", pointer: "Wired gaming mouse", lighting: "RGB" }, ["a steel plate", "26 anti-ghosting keys", "1000Hz mouse polling"]),
  F("B07TVK8WJP", "Orzly RX250 4-in-1 Gaming Keyboard, Mouse, Pad and Headset", "Orzly RX250", { connection: "Wired USB", dpi: 3200, layout: "Full-size", pointer: "90g ambidextrous mouse", lighting: "Backlit" }, ["a headset and mouse pad in the box", "a 90g ambidextrous mouse", "mouse steps from 1200 to 3200 DPI"]),
  F("B07W6ZTMWP", "MageGee K1 Wired Gaming Keyboard and Mouse", "MageGee K1", { connection: "Wired USB", dpi: 3200, layout: "Full-size (104 keys)", pointer: "Wired gaming mouse", lighting: "Backlit" }, ["a 104-key layout", "a 3200 DPI mouse", "an entry price tier"]),
  F("B07WCLZ1PL", "BlueFinger Wired Gaming Keyboard, Mouse and Pad", "BlueFinger", { connection: "Wired USB", layout: "Full-size (104 keys)", pointer: "Wired gaming mouse", lighting: "Backlit" }, ["a steel plate", "an 11.8 x 9.8 in mouse pad in the box", "a 104-key layout"]),
  F("B0FBWP81MW", "GEODMAER 65% Wired Gaming Keyboard and Mouse", "GEODMAER 65% combo", { connection: "Wired USB", dpi: 7200, layout: "65% (68 keys)", pointer: "Wired gaming mouse", lighting: "RGB" }, ["a 68-key layout with arrow keys", "a 7200 DPI mouse", "a compact footprint"]),
  F("B07DQW1KKB", "CHONCHOW Wired Gaming Keyboard and Mouse", "CHONCHOW wired", { connection: "Wired USB", dpi: 4800, layout: "Full-size", pointer: "Wired gaming mouse", lighting: "Backlit" }, ["19 non-conflict keys", "a 4800 DPI mouse", "a full-size layout"]),
  F("B0DL9WC26F", "RisoPhy Wireless Gaming Keyboard and Mouse", "RisoPhy", { connection: "2.4GHz USB receiver", dpi: 3200, layout: "Full-size with metal panel", pointer: "Rechargeable mouse", lighting: "RGB" }, ["a metal top panel", "USB-C charging", "a 3200 DPI mouse"]),
  F("B09TKH352V", "Trueque Wireless RGB Keyboard and Mouse", "Trueque RGB", { connection: "2.4GHz USB receiver", layout: "Full-size", pointer: "Rechargeable mouse", lighting: "RGB" }, ["a Mac and Windows layout switch", "rechargeable keyboard and mouse", "RGB backlighting"]),
  // Silent combos
  F("B0DLBD36HL", "EDJO Silent Wireless Keyboard and Mouse", "EDJO", { connection: "2.4GHz USB receiver", dpi: 1600, layout: "Full-size silent membrane", pointer: "Silent mouse", lighting: "None" }, ["a silent membrane keyboard", "a battery life claim of up to 365 days", "a 1600 DPI mouse"]),
  F("B0DDT75R2R", "RECCAZR Silent Wireless Keyboard and Mouse", "RECCAZR", { connection: "2.4GHz USB receiver", dpi: 1600, range: 33, layout: "Full-size with 12 multimedia keys", pointer: "Silent mouse", lighting: "None" }, ["12 multimedia keys", "mouse steps of 800, 1200 and 1600 DPI", "a 10m range"]),
  F("B0FSQLVXHR", "QUASIO Silent Wireless Keyboard and Mouse", "QUASIO", { connection: "2.4GHz USB receiver", range: 33, layout: "Full-size", pointer: "Silent mouse", lighting: "None" }, ["a battery life claim of up to 365 days", "a 10m range", "quiet keys and clicks"]),
  F("B0DM7Y6CFD", "Trueque Silent Wireless Keyboard and Mouse with Palm Rest", "Trueque palm rest", { connection: "2.4GHz USB receiver", layout: "Full-size with palm rest and phone holder", pointer: "Silent mouse", lighting: "None" }, ["a mouse the listing rates at 97% less click noise", "a 7.8in phone holder", "a palm rest"]),
  // Touchpad keyboards
  F("B014EUQOGK", "Logitech K400 Plus Wireless Touch Keyboard", "K400 Plus", { connection: "Unifying USB receiver", kbBattery: 18, range: 33, layout: "Compact, no numpad", pointer: "Built-in touchpad (76 x 47mm)", lighting: "None" }, ["a spill-resistant design", "Windows, Android and ChromeOS support", "a 76 x 47mm touchpad"]),
  F("B09KLPJQPD", "Arteck HB305 Bluetooth Keyboard with Touchpad", "Arteck HB305", { connection: "Bluetooth", range: 33, layout: "Compact", pointer: "Built-in touchpad", lighting: "7-color backlight" }, ["USB-C charging", "a 24-month warranty", "a seven-color backlight"]),
  F("B0GSQ1M76R", "Bnnwa Rechargeable Wireless Keyboard with Touchpad", "Bnnwa rechargeable", { connection: "2.4GHz receiver, 2 Bluetooth channels", layout: "Scissor-key compact", pointer: "Built-in touchpad", lighting: "None" }, ["pairing with up to three devices", "a 500mAh battery", "scissor keys"]),
  F("B0DVNCLK7Q", "Adesso Wireless Keyboard with Touchpad", "Adesso", { connection: "2.4GHz USB receiver", range: 30, layout: "Full-size (104 membrane keys)", pointer: "Built-in touchpad", lighting: "None" }, ["13 internet and 8 media hotkeys", "a number pad beside the touchpad", "two AAA batteries"]),
  F("B00BX0YKX4", "Fosmon Mini Wireless Keyboard with Touchpad", "Fosmon mini", { connection: "2.4GHz receiver, Bluetooth 5.2", layout: "Mini handheld", pointer: "Built-in touchpad", lighting: "Backlit" }, ["a rechargeable battery rated for 10 days of use", "50 days of standby", "a handheld size for couch use"]),
  F("B0H7QR5JH6", "CZUR K5S Bluetooth Keyboard with Touchpad", "CZUR K5S", { connection: "Bluetooth, wired", layout: "Compact", pointer: "Built-in touchpad", lighting: "None" }, ["a rechargeable battery", "sleep after 10 minutes idle", "slightly smaller keycaps, as the maker notes"]),
]);
