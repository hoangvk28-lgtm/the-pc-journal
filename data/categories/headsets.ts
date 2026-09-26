import pool from "@/data/pcj-pool/audio.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { str, withPool } from "./helpers";

/** Headsets and gaming headphones. Facts: Amazon listing claims, reviewed by hand. */
export const headsetSchema: CategorySchema = {
  id: "headsets",
  plural: "Headsets",
  fields: [
    { key: "battery", label: "Battery life", noun: "battery life", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v} hours`,
      rule: { label: "Longest Battery Life", bestFor: ["Players who hate charging mid-week.", "Long sessions away from a charging cable."] },
      strength: (v) => (Number(v) >= 50 ? `Up to ${v} hours of battery life` : undefined), weakness: (v) => (Number(v) < 30 ? `Shorter ${v}-hour battery` : undefined) },
    { key: "driver", label: "Driver size", noun: "driver size", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}mm`,
      rule: { label: "Largest Drivers", bestFor: ["Listeners who want the biggest listed drivers here.", "Players who favour a fuller low end."] },
      strength: (v) => (Number(v) >= 50 ? `${v}mm drivers` : undefined) },
    { key: "weight", label: "Weight", noun: "weight", better: "lower", superlative: ["lightest", "heaviest"], fmt: (v) => `${v}g`,
      rule: { label: "Lightest Build", bestFor: ["Long sessions where clamp and weight add up.", "Players who notice a heavy headset after an hour."] },
      strength: (v) => (Number(v) <= 280 ? `Light ${v}g build` : undefined) },
    { key: "connection", label: "Connection", fmt: (v) => String(v), strength: (v) => (/2.4|lightspeed|hyperspeed/i.test(String(v)) && /bluetooth/i.test(String(v)) ? "Dual wireless: dongle plus Bluetooth" : /wired/i.test(String(v)) ? "No charging or pairing needed" : undefined) },
    { key: "design", label: "Design", fmt: (v) => String(v),
      strength: (v) => (String(v).startsWith("Open") ? "Open-back for a wider soundstage" : undefined),
      weakness: (v) => (String(v).startsWith("Open") ? "Open-back leaks sound both ways" : undefined) },
    { key: "mic", label: "Microphone", fmt: (v) => String(v), weakness: (v) => (String(v).startsWith("None") ? "No built-in microphone" : undefined) },
  ],
  compat: (f) => {
    const c = str(f, "connection"), s: string[] = [];
    if (/xbox wireless/i.test(c)) s.push("It connects to Xbox consoles over Xbox Wireless; on a PC, check the listing for the connection it supports, since Xbox Wireless on Windows usually needs Microsoft's adapter or a built-in radio.");
    else if (/2\.4/i.test(c) && /bluetooth/i.test(c)) s.push(`On a PC, use the ${/lightspeed/i.test(c) ? "Lightspeed" : "2.4GHz"} dongle for games and keep Bluetooth for a phone, since Bluetooth adds latency.`);
    else if (/2\.4/i.test(c)) s.push("It connects through a USB wireless dongle, so keep a free USB port near your desk for the best range.");
    if (/usb/i.test(c) && /3\.5/.test(c)) s.push("USB and 3.5mm options let it move between a PC and a controller.");
    else if (/usb/i.test(c)) s.push("It connects over USB, which also handles the audio processing on your PC.");
    else if (/3\.5/.test(c)) s.push("A 3.5mm plug means it works with a controller or front-panel jack; on PC, a separate mic and headphone jack may need a splitter.");
    if (str(f, "design").startsWith("Open")) s.push("Because it is open-back, other people in the room will hear it, and it will not block outside noise.");
    return s;
  },
  criteria: [
    { id: "connection", title: "Pick the connection first", body: "A 2.4GHz dongle gives the lowest latency for games; Bluetooth is convenient for phones but lags for shooters. Wired headsets have no latency or battery concerns.\n\nIf you play on a console as well as a PC, check which connections each platform supports before buying." },
    { id: "battery", title: "Battery life claims vary with lighting", body: "Makers quote battery life under their own conditions, often with RGB lighting off. A 50-hour claim can drop noticeably with lighting on.\n\nCompare figures at similar settings, and look for fast charging if you forget to plug in." },
    { id: "open-closed", title: "Open-back or closed-back", body: "Open-back headphones sound more spacious and feel cooler, but they leak sound and block little outside noise. Closed-back models isolate better in shared rooms.\n\nChoose open-back only if you play in a quiet room on your own." },
    { id: "mic", title: "Check the microphone type", body: "Detachable microphones let the headset double as everyday headphones. Some audiophile headphones have no microphone at all, so you would need a separate one.\n\nIf you stream or join calls, a cardioid or noise-rejecting mic is worth prioritising." },
    { id: "weight", title: "Weight and clamp matter after an hour", body: "Lighter headsets reduce pressure on the top of the head, and memory foam or fabric pads stay cooler. A difference of 50g is noticeable over long sessions.\n\nIf you wear glasses, look for soft pads that do not press the arms into your head." },
    { id: "surround", title: "Virtual surround is software", body: "7.1 and spatial audio labels usually describe software processing, not extra drivers. They can help locate sounds in some games and hurt music in others.\n\nMake sure you can switch it off in the headset's software." },
    { id: "platform", title: "Console versions are not always interchangeable", body: "Some wireless headsets come in PC, PlayStation and Xbox versions with different dongles. An Xbox-specific model may not connect wirelessly to a PlayStation.\n\nBuy the version that matches every system you plan to use." },
  ],
  faq: [
    { id: "latency", q: "Is Bluetooth good enough for gaming?", a: "For casual games it is fine, but 2.4GHz dongles have noticeably lower latency. Use the dongle for competitive play." },
    { id: "wired-better", q: "Do wired headsets sound better than wireless ones?", a: "Not necessarily. Driver quality and tuning matter more, but wired models avoid compression, latency and charging." },
    { id: "pc-console", q: "Can I use one headset on PC and console?", a: "Many can, but check the connection for each system. Xbox-specific wireless headsets often need a matching adapter or Bluetooth on PC." },
    { id: "open-back", q: "Are open-back headphones good for gaming?", a: "They give a wide, natural soundstage but leak sound and block little noise. They suit quiet rooms, not shared spaces." },
    { id: "mic-separate", q: "Do I need a separate microphone?", a: "Only if your headphones do not include one or you stream. Most gaming headsets include a usable microphone." },
    { id: "surround-on", q: "Should I turn on virtual surround?", a: "Try it in each game. It can help with positioning in some titles and make others sound hollow." },
    { id: "glasses", q: "Are gaming headsets comfortable with glasses?", a: "Softer memory foam pads and lighter clamp help. Look for listings that mention glasses support if it matters to you." },
  ],
  evaluated: [
    { title: "Connection options", description: "We recorded each headset's listed connections, since they decide which systems it works with and how much latency to expect." },
    { title: "Battery and weight", description: "We compared listed battery life and weight where makers state them, noting where lighting affects the battery claim." },
    { title: "Drivers and design", description: "We noted driver size and whether the design is open or closed, which shapes sound and isolation." },
    { title: "Microphone", description: "We checked whether a microphone is included, detachable or noise-rejecting." },
    { title: "Platform support", description: "We checked which consoles and PCs each listing names, and flagged Xbox-specific connections." },
  ],
};

const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const headsetFacts = withPool(pool as Record<string, { img?: string; price?: string }>, [
  // Wireless
  F("B0B3F8V4JG", "Logitech G PRO X 2 Lightspeed Wireless", "G PRO X 2", { battery: 50, driver: 50, connection: "Lightspeed 2.4GHz, Bluetooth, 3.5mm", mic: "Detachable 6mm cardioid" }, ["graphene drivers", "a USB-A dongle with a 3.5mm pass-through port"]),
  F("B0FRNR8Y11", "SteelSeries Arctis Nova 7 Wireless Gen 2", "Arctis Nova 7 Gen 2", { battery: 50, connection: "2.4GHz and Bluetooth simultaneously", mic: "Noise-rejecting" }, ["simultaneous 2.4GHz and Bluetooth audio", "360-degree spatial audio support"]),
  F("B09TRW57WB", "HyperX Cloud Alpha Wireless", "Cloud Alpha Wireless", { battery: 300, connection: "2.4GHz wireless", mic: "Included" }, ["DTS Headphone:X spatial audio", "dual-chamber drivers in a durable aluminum frame"]),
  F("B0CF3LHQSM", "Razer BlackShark V2 HyperSpeed", "BlackShark V2 HyperSpeed", { battery: 70, driver: 50, weight: 280, connection: "HyperSpeed 2.4GHz wireless", mic: "Included" }, ["TriForce Titanium drivers", "an ultra-light 280g frame"]),
  F("B0FFM5SP6M", "Logitech G522 Lightspeed Wireless", "G522", { battery: 60, weight: 280, connection: "Lightspeed 2.4GHz", mic: "48kHz/16-bit" }, ["48kHz/24-bit audio", "a full-bandwidth 48kHz microphone"]),
  F("B0DXQ8X9GT", "HyperX Cloud Jet Dual Wireless", "Cloud Jet", { battery: 25, driver: 40, connection: "2.4GHz dongle and Bluetooth 5.3", mic: "Included" }, ["dual wireless at an entry-level price"]),
  // Wired
  F("B0C3BV19Q3", "HyperX Cloud III Wired", "Cloud III", { driver: 53, connection: "Wired (USB and 3.5mm)", mic: "Upgraded" }, ["angled 53mm drivers", "an upgraded microphone"]),
  F("B086PKMZ21", "Razer BlackShark V2 X", "BlackShark V2 X", { driver: 50, weight: 240, connection: "Wired 3.5mm", mic: "HyperClear cardioid" }, ["passive noise cancellation", "breathable foam ear cushions"]),
  F("B07PDFBJZD", "Logitech G PRO X Wired", "G PRO X", { driver: 50, connection: "Wired (USB sound card and 3.5mm)", mic: "Detachable with Blue VO!CE" }, ["a USB external sound card with EQ profile storage", "an aluminum fork and steel headband"]),
  F("B0GT6CX8MV", "Sony INZONE H6 Air Open-Back", "INZONE H6 Air", { driver: 40, weight: 199, connection: "Wired", design: "Open-back", mic: "Included" }, ["drivers adapted from studio monitor headphones", "a custom RPG and adventure equalizer"]),
  F("B00ENMK1DW", "Philips SHP9500 Open-Back Headphones", "SHP9500", { driver: 50, connection: "Wired 3.5mm, 1.5m cable", design: "Open-back", mic: "None listed" }, ["a double-layered, breathable headband cushion"]),
  F("B00SAYCXWG", "HyperX Cloud II", "Cloud II", { driver: 53, connection: "Wired (USB and 3.5mm)", mic: "Detachable, noise-cancelling" }, ["7.1 virtual surround", "memory foam ear pads and an aluminum frame"]),
  // Xbox
  F("B0DH689JGY", "Xbox Wireless Gaming Headset", "Xbox Wireless Headset", { battery: 20, connection: "Xbox Wireless and Bluetooth LE", mic: "Included" }, ["Dolby Atmos spatial audio support", "dual wireless connectivity"]),
  F("B0DB96KTGL", "Turtle Beach Stealth 700 (Xbox)", "Stealth 700", { driver: 60, connection: "CrossPlay dual transmitter", mic: "Flip-to-mute" }, ["60mm Eclipse dual drivers", "memory foam cushions designed for glasses"]),
  F("B0CYWLSCFW", "Turtle Beach Stealth 500 (Xbox)", "Stealth 500", { battery: 40, driver: 40, connection: "2.4GHz and Bluetooth 5.2", mic: "Included" }, ["a QuickSwitch button between wireless and Bluetooth", "variable mic monitoring"]),
  F("B08LRTS3WJ", "Razer Kaira Wireless (Xbox)", "Kaira", { driver: 50, connection: "Xbox Wireless", mic: "HyperClear cardioid" }, ["an Xbox pairing button and EQ control"]),
  F("B0FRPH94LH", "SteelSeries Arctis Nova 7X Wireless Gen 2", "Arctis Nova 7X Gen 2", { battery: 50, connection: "2.4GHz and Bluetooth simultaneously", mic: "Noise-rejecting" }, ["simultaneous 2.4GHz and Bluetooth audio", "the Xbox version of the Nova 7 Gen 2"]),
  F("B08KS397GY", "HyperX CloudX (Xbox Licensed)", "CloudX", { connection: "Wired 3.5mm", mic: "Included" }, ["official Xbox licensing", "a durable aluminum frame"]),
]);
