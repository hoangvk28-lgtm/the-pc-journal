import pool from "@/data/pcj-pool/input.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { str, withPool } from "./helpers";

const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const P = pool as Record<string, { img?: string; price?: string }>;

/* ───────────────────────────── Keyboards for work ───────────────────────────── */

export const workKeyboardSchema: CategorySchema = {
  id: "work-keyboards",
  plural: "Keyboards",
  fields: [
    { key: "battery", label: "Battery (backlight off)", noun: "battery life", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `up to ${v} months`,
      rule: { label: "Longest Battery Life", bestFor: ["Desks where you would rather never think about charging.", "Offices where the keyboard stays on all day."] },
      strength: (v) => (Number(v) >= 8 ? `Up to ${v} months per charge (backlight off)` : undefined) },
    { key: "devices", label: "Paired devices", noun: "device pairing", better: "higher", superlative: ["most", "fewest"], fmt: (v) => `${v} devices` },
    { key: "layout", label: "Layout", fmt: (v) => String(v) },
    { key: "keys", label: "Key type", fmt: (v) => String(v) },
    { key: "connection", label: "Connection", fmt: (v) => String(v), weakness: (v) => (/wired/i.test(String(v)) ? "Wired only" : undefined) },
    { key: "support", label: "Wrist support", fmt: (v) => String(v), strength: (v) => (String(v) !== "None" ? `${v}` : undefined) },
  ],
  compat: (f) => {
    const c = str(f, "connection"), s: string[] = [];
    if (/bolt/i.test(c)) s.push("It pairs over Bluetooth or Logitech's Logi Bolt receiver; Bolt is not compatible with older Unifying receivers, so keep the one in the box.");
    else if (/bluetooth/i.test(c)) s.push("Check that your computer has Bluetooth, or use the included receiver if there is one.");
    if (/wired/i.test(c)) s.push("Being wired, it needs no pairing or charging, which suits shared desks and IT-managed PCs.");
    if (/split|wave|curved/i.test(str(f, "layout"))) s.push("Ergonomic layouts take a few days to get used to, especially if you type with your hands crossing the centre.");
    if (/mac/i.test(c) || /multi-os/i.test(c)) s.push("It supports Windows and macOS layouts, which helps if you switch between computers.");
    return s;
  },
  criteria: [
    { id: "ergonomics", title: "Choose the shape before the switch", body: "Split, curved and wave layouts keep your wrists straighter than a flat board. They take a few days to learn.\n\nIf you type for most of the day, an ergonomic layout usually matters more than the switch type." },
    { id: "noise", title: "Quiet keys for shared offices", body: "Low-profile scissor keys and quiet mechanical switches keep noise down in open offices and on calls. Clicky switches do not.\n\nIf you share a room, look for listings that describe quiet or silent keys." },
    { id: "multi", title: "Multi-device switching", body: "Keyboards that pair with three devices let you move between a work laptop, a personal PC and a tablet with one key.\n\nCheck whether switching uses Bluetooth, a receiver, or both." },
    { id: "battery", title: "Backlighting cuts battery life", body: "Battery claims usually assume the backlight is off. With it on, runtime can drop from months to days.\n\nIf you want backlighting, prefer USB-C charging so a cable can top it up during the day." },
    { id: "wrist", title: "Wrist rests and tilt", body: "A palm rest reduces wrist extension, and negative tilt can help further. Positive tilt with the rear feet raised usually makes wrist bending worse.\n\nLook for boards with a built-in rest or adjustable tilt." },
    { id: "it", title: "Check IT and security needs", body: "Some workplaces restrict Bluetooth or require encrypted receivers. A wired keyboard avoids pairing problems entirely.\n\nIf your company manages your PC, check which connections it allows." },
  ],
  faq: [
    { id: "mechanical-office", q: "Is a mechanical keyboard OK for the office?", a: "Yes, if the switches are quiet. Tactile quiet or linear switches suit shared spaces better than clicky ones." },
    { id: "ergo-learn", q: "How long does it take to get used to an ergonomic keyboard?", a: "Usually a few days to a couple of weeks, depending on how different the layout is from a flat board." },
    { id: "mac", q: "Will these work with a Mac?", a: "Most wireless work keyboards support macOS, and several switch layouts automatically. Check the product page for Mac key labels." },
    { id: "wired-wireless", q: "Wired or wireless for work?", a: "Wireless keeps the desk tidy and moves between devices; wired needs no charging and suits locked-down office PCs." },
    { id: "numpad", q: "Do I need a number pad?", a: "If you work with spreadsheets or figures, a full-size layout saves time. Otherwise a compact board leaves more room for the mouse." },
    { id: "clean", q: "How do I clean a keyboard safely?", a: "Unplug or switch it off, use compressed air between keys and wipe with a slightly damp cloth. Some office keyboards are rated for alcohol wipes." },
  ],
  evaluated: [
    { title: "Layout and ergonomics", description: "We compared layouts, wrist support and tilt options described in each listing." },
    { title: "Connections", description: "We recorded Bluetooth, receiver and wired options and how many devices each keyboard pairs with." },
    { title: "Battery claims", description: "We compared rated battery life with the backlight off, since that is how makers quote it." },
    { title: "Noise and key feel", description: "We noted key type and whether the listing describes quiet operation." },
  ],
};

export const workKeyboardFacts = withPool(P, [
  F("B0BKW3LB2B", "Logitech MX Keys S", "MX Keys S", { battery: 5, devices: 3, layout: "Full-size, low-profile", keys: "Spherically dished scissor keys", connection: "Bluetooth or Logi Bolt, multi-OS", support: "None" }, ["backlighting that wakes as your hands approach", "Smart Actions shortcuts in Logi Options+"]),
  F("B0BTNY72VD", "Logitech Wave Keys", "Wave Keys", { layout: "Compact wave", keys: "Wave-shaped membrane keys", connection: "Bluetooth or Logi Bolt, multi-OS", support: "Cushioned memory-foam palm rest" }, ["certification by United States Ergonomics", "Easy-Switch between devices"]),
  F("B07ZWK2TQT", "Logitech Ergo K860 Split Keyboard", "Ergo K860", { layout: "Full-size, curved split", keys: "Scooped Perfect Stroke keys", connection: "USB receiver or Bluetooth", support: "Pillowed wrist rest with 0, -4 and -7 degree palm lift" }, ["54% more wrist support than a standard keyboard, per Logitech", "certification by United States Ergonomics"]),
  F("B09LK1P1RD", "Logitech MX Mechanical (Tactile Quiet)", "MX Mechanical", { battery: 10, devices: 3, layout: "Full-size, low-profile", keys: "Tactile Quiet mechanical switches", connection: "Bluetooth or Logi Bolt, multi-OS", support: "None" }, ["smart backlighting that adjusts to room light", "Logitech Flow for moving between computers"]),
  F("B0F9YQYYJ2", "Keychron B6 Pro Ultra-Slim", "Keychron B6 Pro", { battery: 8, layout: "Full-size, ultra-slim", keys: "Quiet scissor keys", connection: "Wireless, multi-device, 1000Hz polling", support: "None" }, ["about 1,200 hours of use per charge, per Keychron", "online key remapping"]),
  F("B07XGD9XJL", "Kensington Pro Fit Ergonomic Wired Keyboard", "Pro Fit", { layout: "Full-size ergonomic", keys: "Quiet keys", connection: "Wired USB" }, ["durability testing to MIL-STD-810H Method 504", "a surface rated for cleaning with alcohol and bleach"]),
]);

/* ───────────────────────────── Mice for programming ───────────────────────────── */

export const workMouseSchema: CategorySchema = {
  id: "work-mice",
  plural: "Mice",
  fields: [
    { key: "battery", label: "Battery life", noun: "battery life", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `up to ${v} months`,
      rule: { label: "Longest Battery Life", bestFor: ["Desks where you want to forget about batteries.", "Users who rarely want to recharge."] } },
    { key: "dpi", label: "Sensor", noun: "sensor resolution", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${Number(v).toLocaleString("en-US")} DPI`,
      rule: { label: "Highest-Resolution Sensor", bestFor: ["Large or multiple high-resolution monitors.", "Users who move the cursor across very wide desktops."] } },
    { key: "buttons", label: "Programmable buttons", noun: "button count", better: "higher", superlative: ["most", "fewest"], fmt: (v) => `${v}` },
    { key: "grip", label: "Grip", fmt: (v) => String(v) },
    { key: "connection", label: "Connection", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const g = str(f, "grip"), c = str(f, "connection"), s: string[] = [];
    if (/vertical/i.test(g)) s.push("Vertical mice put your hand in a handshake position; allow a week to adjust, and check the hand size.");
    if (/trackball/i.test(g)) s.push("A trackball stays still on the desk, so it suits cramped desks, but precise selection takes practice.");
    if (/right/i.test(g)) s.push("It is shaped for right hands only.");
    if (/bolt/i.test(c)) s.push("It connects over Bluetooth or a Logi Bolt receiver; Bolt does not pair with older Unifying receivers.");
    return s;
  },
  criteria: [
    { id: "shape", title: "Pick a shape for your wrist", body: "Standard sculpted mice suit most hands; vertical mice reduce forearm twist; trackballs keep the arm still. Each takes different adjustment time.\n\nIf you have wrist or forearm discomfort, try vertical or trackball first." },
    { id: "scroll", title: "Fast scrolling helps with long files", body: "Free-spinning or magnetic scroll wheels move through long files and logs quickly, then switch to line-by-line for precision.\n\nIf you read long code or spreadsheets, prioritise the scroll wheel." },
    { id: "buttons", title: "Programmable buttons save shortcuts", body: "Extra buttons can run copy, paste, undo or IDE commands. Per-app profiles change them automatically in each program.\n\nCheck that the software runs on your operating system." },
    { id: "multi", title: "Multi-computer control", body: "Some mice switch between computers with a button, and a few can move the cursor and clipboard across machines.\n\nThis helps if you work on a laptop and a desktop at once." },
    { id: "quiet", title: "Quiet clicks for shared rooms", body: "Silent or quiet-click switches reduce noise on calls and in shared offices. The feel is slightly softer." },
    { id: "hand-size", title: "Match the hand size", body: "Makers often state a hand size range, especially for vertical mice. A mouse that is too small forces a claw grip.\n\nMeasure from wrist crease to middle fingertip before buying." },
  ],
  faq: [
    { id: "vertical", q: "Is a vertical mouse better for programmers?", a: "It can reduce forearm twisting for people who feel strain. It takes about a week to get used to." },
    { id: "trackball", q: "Are trackballs good for coding?", a: "They save desk space and keep the arm still. Fine selection takes practice, but many users adapt quickly." },
    { id: "dpi", q: "Does DPI matter for work?", a: "Higher DPI helps on large or high-resolution displays. Most work needs far less than the maximum." },
    { id: "left", q: "Are there left-handed versions?", a: "Many ergonomic mice are right-handed only. Check the product page for a left-handed model." },
    { id: "software", q: "Do I need the maker's software?", a: "Basic use works without it, but button remapping and per-app profiles need the software." },
    { id: "glass", q: "Will it work on a glass desk?", a: "Only mice whose listings mention glass tracking are designed for it. Others may need a mouse pad." },
  ],
  evaluated: [
    { title: "Shape and grip", description: "We grouped each mouse by grip style and noted listed hand sizes." },
    { title: "Productivity features", description: "We compared scroll wheels, programmable buttons and multi-computer control as described by each maker." },
    { title: "Connection and battery", description: "We recorded connection options and rated battery life." },
    { title: "Sensor", description: "We noted listed sensor resolution and surface support." },
  ],
};

export const workMouseFacts = withPool(P, [
  F("B0FC5SJNQX", "Logitech MX Master 4", "MX Master 4", { grip: "Sculpted, right-handed", connection: "USB-C dongle or Bluetooth" }, ["a Haptic Sense panel with customizable feedback", "an Actions Ring overlay for app shortcuts", "a MagSpeed wheel that scrolls 1,000 lines per second"]),
  F("B0G2SG3NFT", "Logitech MX Master 3S", "MX Master 3S", { dpi: 8000, grip: "Sculpted, right-handed", connection: "Bluetooth" }, ["tracking on glass", "Quiet Clicks with 90% less click noise, per Logitech", "Flow control across Windows and macOS computers"]),
  F("B09J1TB35S", "Logitech Lift Vertical", "Lift", { grip: "57-degree vertical, right-handed, small to medium hands", connection: "Bluetooth or Logi Bolt" }, ["whisper-quiet clicks", "certification by leading ergonomists"]),
  F("B0BBQ3ZYNY", "Logitech Ergo M575S Trackball", "Ergo M575S", { battery: 18, buttons: 3, grip: "Thumb trackball, right-handed", connection: "Bluetooth or Logi Bolt" }, ["25% less forearm muscle strain, per Logitech", "Smart Actions shortcuts"]),
  F("B07YVMXLQC", "Kensington Orbit Trackball with Scroll Ring", "Orbit", { buttons: 2, grip: "Finger-operated trackball" }, ["a scroll ring around the ball", "a detachable wrist rest"]),
  F("B0DVD5RTZ5", "Razer Pro Click V2 Vertical", "Pro Click V2 Vertical", { battery: 6, dpi: 30000, buttons: 6, grip: "Vertical with base support", connection: "2.4GHz HyperSpeed or Bluetooth, up to 5 devices" }, ["an AI Prompt Master shortcut button", "18-zone lighting"]),
]);
