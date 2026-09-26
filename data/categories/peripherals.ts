import pool from "@/data/pcj-pool/peripherals.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { headsetSchema } from "./headsets";
import { str, withPool } from "./helpers";

type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

/** Gaming keyboards. Only figures stated in each listing are recorded. */
export const keyboardSchema: CategorySchema = {
  id: "keyboard",
  plural: "Keyboards",
  fields: [
    { key: "layout", label: "Layout", fmt: (v) => String(v),
      strength: (v) => (/TKL|tenkeyless/i.test(String(v)) ? "Tenkeyless layout leaves more room for the mouse" : /60%|65%|75%|68-key/i.test(String(v)) ? `Compact ${v} layout` : undefined),
      weakness: (v) => (/60%/.test(String(v)) ? "No dedicated arrow keys or function row" : /full/i.test(String(v)) ? "Full-size board takes more desk width" : undefined) },
    { key: "switch", label: "Switches", fmt: (v) => String(v),
      strength: (v) => (/hall/i.test(String(v)) ? "Magnetic Hall effect switches" : /mechanical|red|brown|blue|tactile|linear|MLX|GL/i.test(String(v)) ? `${v} switches` : undefined),
      weakness: (v) => (/membrane/i.test(String(v)) ? "Membrane switches, not mechanical" : undefined) },
    { key: "connection", label: "Connection", fmt: (v) => String(v),
      strength: (v) => (/2\.4|lightspeed|slipstream/i.test(String(v)) && /bluetooth/i.test(String(v)) ? "Dongle, Bluetooth and wired modes" : undefined),
      weakness: (v) => (/^wired$/i.test(String(v)) ? "Wired only" : undefined) },
    { key: "polling", label: "Polling rate", noun: "polling rate", better: "higher", superlative: ["fastest", "slowest"], fmt: (v) => `${Number(v).toLocaleString("en-US")}Hz`,
      rule: { label: "Fastest Polling", bestFor: ["Competitive players who want the quickest listed report rate.", "Players pairing it with a high-refresh monitor."] },
      strength: (v) => (Number(v) >= 8000 ? `${Number(v).toLocaleString("en-US")}Hz polling` : undefined) },
    { key: "battery", label: "Battery life", noun: "battery life", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v} hours`,
      strength: (v) => (Number(v) >= 100 ? `Up to ${v} hours per charge` : undefined), weakness: (v) => (Number(v) < 40 ? `Shorter ${v}-hour battery` : undefined) },
    { key: "keycaps", label: "Keycaps", fmt: (v) => String(v), strength: (v) => (/PBT/.test(String(v)) ? "PBT keycaps resist shine" : undefined) },
  ],
  compat: (f) => {
    const s: string[] = [], c = str(f, "connection"), l = str(f, "layout");
    if (/bluetooth/i.test(c)) s.push(`Use the ${f.short}'s dongle or cable for games; Bluetooth suits a laptop or tablet.`);
    else if (/^wired$/i.test(c)) s.push(`The ${f.short} needs a free USB port, so check cable length to your case or monitor hub.`);
    if (Number(f.specs.polling) >= 8000) s.push("High polling rates use more CPU time; drop to 1,000Hz if an older system stutters.");
    if (/60%|68/.test(l)) s.push("Small layouts move keys to a function layer, so check the legend for arrows and F-keys.");
    if (/hall/i.test(str(f, "switch"))) s.push("Adjusting actuation needs the maker's software or web tool on Windows.");
    return s;
  },
  criteria: [
    { id: "layout", title: "Choose the layout before the switch", body: "Full-size boards keep the number pad; tenkeyless drops it and gives the mouse more room. 75% and 65% boards keep arrows in a tighter frame, while 60% boards move arrows and F-keys to a function layer." },
    { id: "switch", title: "Linear, tactile or magnetic", body: "Linear switches travel smoothly, tactile switches have a bump, and clicky switches add a click. Hall effect switches read a magnet, so actuation can be adjusted and rapid trigger resets a key as soon as it rises." },
    { id: "connection", title: "Wired, dongle or Bluetooth", body: "A 2.4GHz dongle is fine for games; Bluetooth adds latency and suits typing on other devices. Wired boards never need charging." },
    { id: "polling", title: "Polling rate is a small factor", body: "1,000Hz is enough for most players. 8,000Hz cuts reporting delay further, but the gain is small and uses more CPU time." },
    { id: "keycaps", title: "Keycap material lasts longer than lighting", body: "PBT keycaps resist the shine that ABS caps develop. Double-shot legends do not wear off." },
    { id: "hotswap", title: "Hot-swap sockets allow switch changes", body: "Hot-swappable boards let you pull and replace switches without soldering. Check whether the sockets take 3-pin or 5-pin switches." },
  ],
  faq: [
    { id: "membrane", q: "Is a membrane keyboard bad for gaming?", a: "No. It is quieter and cheaper, but it feels softer and usually lacks per-key rollover guarantees beyond what the listing states." },
    { id: "he", q: "Do Hall effect switches help in games?", a: "Adjustable actuation and rapid trigger help most in fast strafing games. In slower games the difference is small." },
    { id: "tkl", q: "Should I pick tenkeyless or full-size?", a: "Tenkeyless if you want more mouse room and rarely type numbers; full-size if you enter numbers often." },
    { id: "wireless-lag", q: "Is a wireless keyboard slower?", a: "Not over a 2.4GHz dongle for most players. Bluetooth adds more latency and is better kept for other devices." },
    { id: "8k", q: "Do I need 8,000Hz polling?", a: "No. It is a marginal gain on top of 1,000Hz and can cost battery life and CPU time." },
    { id: "software", q: "Do these keyboards need software?", a: "They work without it, but lighting, macros and actuation settings usually need the maker's app." },
  ],
  evaluated: [
    { title: "Layout and switches", description: "We recorded the layout, the switch type and whether the switches are mechanical, magnetic or membrane." },
    { title: "Connection", description: "We checked wired, dongle and Bluetooth options and listed battery life." },
    { title: "Polling rate", description: "We recorded polling rates where listings state them." },
    { title: "Build", description: "We noted keycap material, frame material and extra controls such as knobs or screens." },
  ],
};

/** Gaming mice. Weights are only recorded when the listing states the mouse weight, not an acceleration figure. */
export const mouseSchema: CategorySchema = {
  id: "mouse",
  plural: "Mice",
  fields: [
    { key: "weight", label: "Weight", noun: "weight", better: "lower", superlative: ["lightest", "heaviest"], fmt: (v) => `${v}g`,
      rule: { label: "Lightest Mouse", bestFor: ["Fast flick aiming.", "Players who lift the mouse often at low sensitivity."] },
      strength: (v) => (Number(v) <= 65 ? `Light ${v}g body` : undefined), weakness: (v) => (Number(v) >= 85 ? `Heavier ${v}g body` : undefined) },
    { key: "buttons", label: "Programmable buttons", noun: "button count", better: "higher", superlative: ["most", "fewest"], fmt: (v) => String(v),
      rule: { label: "Most Buttons", bestFor: ["MMO hotbars on the thumb.", "Macros and editing shortcuts."] },
      strength: (v) => (Number(v) >= 10 ? `${v} programmable buttons` : undefined) },
    { key: "dpi", label: "Max DPI", fmt: (v) => Number(v).toLocaleString("en-US") },
    { key: "battery", label: "Battery life", noun: "battery life", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v} hours`,
      strength: (v) => (Number(v) >= 100 ? `Up to ${v} hours per charge` : undefined), weakness: (v) => (Number(v) < 90 ? `Shorter ${v}-hour battery` : undefined) },
    { key: "polling", label: "Polling rate", noun: "polling rate", better: "higher", superlative: ["fastest", "slowest"], fmt: (v) => `${Number(v).toLocaleString("en-US")}Hz`,
      strength: (v) => (Number(v) >= 4000 ? `${Number(v).toLocaleString("en-US")}Hz polling` : undefined) },
    { key: "connection", label: "Connection", fmt: (v) => String(v),
      strength: (v) => (/2\.4|lightspeed|slipstream|hyperspeed/i.test(String(v)) && /bluetooth/i.test(String(v)) ? "Dongle plus Bluetooth" : /^wired$/i.test(String(v)) ? "No battery to charge" : undefined) },
    { key: "shape", label: "Shape", fmt: (v) => String(v), strength: (v) => (/ambidextrous/i.test(String(v)) ? "Ambidextrous shape" : undefined) },
  ],
  compat: (f) => {
    const s: string[] = [], c = str(f, "connection");
    if (/bluetooth/i.test(c)) s.push(`Keep the ${f.short} on its dongle for games; Bluetooth is for a laptop.`);
    else if (/wireless|lightspeed|slipstream|hyperspeed/i.test(c)) s.push(`The ${f.short}'s dongle works best on a front USB port or an extender near the mouse.`);
    if (Number(f.specs.polling) >= 4000) s.push("Polling above 1,000Hz shortens battery life and needs a CPU with headroom.");
    if (Number(f.specs.buttons) >= 12) s.push("Side-button mapping is done in the maker's software, which runs on Windows.");
    return s;
  },
  criteria: [
    { id: "shape", title: "Shape and grip come first", body: "Palm grips suit longer, higher-backed mice; claw and fingertip grips suit shorter, lighter shells. Ambidextrous shapes fit either hand but often have fewer side buttons." },
    { id: "weight", title: "Weight changes how aim feels", body: "Mice around 60g are easy to flick and lift. Heavier mice feel steadier for tracking. A difference of 10g is noticeable over a long session." },
    { id: "buttons", title: "Count the buttons you will use", body: "MMO mice put 12 or more buttons under the thumb for hotbars. Shooters rarely need more than two side buttons." },
    { id: "wireless", title: "Wireless is no longer a handicap", body: "A 2.4GHz dongle matches a cable for games. Check battery life with lighting on and whether the mouse charges while in use." },
    { id: "dpi", title: "DPI figures past 20,000 do not matter much", body: "Most players use 400 to 3,200 DPI. Very high maximums are marketing; sensor consistency matters more." },
    { id: "polling", title: "High polling rates cost battery", body: "4,000Hz and 8,000Hz modes cut reporting delay slightly but drain wireless batteries faster and use more CPU time." },
  ],
  faq: [
    { id: "dpi-need", q: "What DPI should I use?", a: "Start at 800 or 1,600 DPI and set in-game sensitivity from there. Higher DPI does not improve aim by itself." },
    { id: "wireless-lag", q: "Is a wireless mouse slower?", a: "Not over a 2.4GHz dongle. Bluetooth adds latency and suits office work." },
    { id: "light", q: "Is a lighter mouse always better?", a: "For flick aiming it helps; for slow tracking some players prefer more weight. Grip and shape matter more." },
    { id: "mmo-fps", q: "Can an MMO mouse work for shooters?", a: "It can, but the extra side buttons add weight and make it easy to press the wrong key." },
    { id: "8k", q: "Do I need 8,000Hz polling?", a: "No. It is a small gain on top of 1,000Hz, and it costs battery life and CPU time." },
    { id: "software", q: "Do gaming mice need software?", a: "They work without it, but button mapping, DPI steps and lighting usually need the maker's app." },
  ],
  evaluated: [
    { title: "Weight and shape", description: "We recorded listed weights and whether the shape is right-handed or ambidextrous." },
    { title: "Buttons", description: "We counted programmable buttons where the listing states them." },
    { title: "Connection and battery", description: "We checked dongle, Bluetooth and wired modes and the listed battery life." },
    { title: "Sensor figures", description: "We noted maximum DPI and polling rate, while treating them as secondary." },
  ],
};

export const keyboardFacts = withPool(pool as Pool, [
  F("B07KCRTN9Q", "Redragon K582 Surara RGB Mechanical Keyboard", "K582", { layout: "Full-size (104 keys)", switch: "Red linear", connection: "Wired" }, ["anti-ghosting across all keys", "per-key macro recording"]),
  F("B016MAK38U", "Redragon K552 Kumara Mechanical Keyboard", "K552", { layout: "TKL (87 keys)", switch: "Red linear or brown tactile", connection: "Wired" }, ["anti-ghosting across all keys", "a choice of red or brown switches"]),
  F("B089GN2KBT", "Royal Kludge RK61 Wired Mechanical Keyboard", "RK61", { layout: "60% (61 keys)", switch: "Red linear", connection: "Wired" }, ["hot-swappable switch sockets"]),
  F("B0DT43NNNF", "AULA WIN68 HE Magnetic Switch Keyboard", "WIN68 HE", { layout: "68-key compact", switch: "Hall effect magnetic", connection: "Wired", polling: 8000 }, ["a Hall effect board at a membrane-keyboard price"]),
  F("B0CZ6SMBR4", "Redragon K686 PRO Wireless Mechanical Keyboard", "K686 PRO", { layout: "98-key", connection: "2.4GHz, Bluetooth, wired" }, ["a gasket-mounted plate", "a rotary knob for volume"]),
  F("B0BLGD269Q", "Keychron C1 Pro Wired Mechanical Keyboard", "C1 Pro", { layout: "TKL (80%)", switch: "Brown tactile", connection: "Wired", polling: 1000, keycaps: "Double-shot PBT" }, ["QMK and VIA remapping support"]),
  F("B08HMNS8B3", "HyperX Alloy Origins Core Tenkeyless Mechanical Keyboard", "Alloy Origins Core", { layout: "TKL", switch: "HyperX tactile", connection: "Wired" }, ["an aircraft-grade aluminum body", "a detachable USB-C cable"]),
  F("B0D1DSW8TF", "Logitech G515 Lightspeed TKL Wireless Keyboard", "G515 TKL", { layout: "TKL, low-profile", switch: "Tactile", connection: "Lightspeed, Bluetooth, wired", battery: 36, keycaps: "Double-shot PBT" }, ["a slim low-profile build"]),
  F("B0DJD163HT", "Logitech G PRO X TKL Rapid Keyboard", "PRO X TKL Rapid", { layout: "TKL", switch: "Hall effect magnetic", connection: "Wired" }, ["rapid trigger with adjustable actuation"]),
  F("B0DB1X3LLT", "Logitech G915 X Lightspeed TKL Keyboard", "G915 X TKL", { layout: "TKL, low-profile", connection: "Lightspeed, Bluetooth, wired", keycaps: "Double-shot PBT" }, ["an aluminum top plate", "dedicated media keys and a volume roller"]),
  F("B099Y6TSHF", "Logitech G713 Wired TKL Gaming Keyboard", "G713", { layout: "TKL", connection: "Wired" }, ["dedicated media controls", "an included palm rest"]),
  F("B08Z6X4NK3", "Logitech G413 SE Full-Size Mechanical Keyboard", "G413 SE", { layout: "Full-size", switch: "Tactile mechanical", connection: "Wired", keycaps: "PBT" }, ["an aluminum top case", "anti-ghosting for gaming key combinations"]),
  F("B0D83TJ5RB", "Corsair K70 PRO TKL Wired Keyboard", "K70 PRO TKL", { layout: "TKL", switch: "MGX Hall effect magnetic", connection: "Wired", keycaps: "Double-shot PBT" }, ["rapid trigger support"]),
  F("B0CQ31VFT4", "Corsair K65 Plus Wireless 75% Keyboard", "K65 Plus Wireless", { layout: "75%", switch: "MLX Red linear", connection: "Slipstream 2.4GHz, Bluetooth, wired", battery: 266, keycaps: "PBT" }, ["a gasket-mounted design"]),
  F("B0FKHNFR8G", "Corsair Vanguard 96 Gaming Keyboard", "Vanguard 96", { layout: "96%", connection: "Wired", polling: 8000 }, ["a built-in display", "a 96% layout that keeps the number pad in a smaller frame"]),
  F("B0G3PN1VS4", "Corsair Galleon 100 SD Gaming Keyboard", "Galleon 100 SD", { layout: "Full-size", connection: "Wired", polling: 8000 }, ["built-in Stream Deck keys with a display", "FlashTap SOCD handling"]),
  F("B0FG8DKV2N", "Corsair K55 CORE TKL Gaming Keyboard", "K55 CORE TKL", { layout: "TKL", switch: "Membrane", connection: "Wired", polling: 1000 }, ["dedicated media keys", "12-key rollover"]),
  F("B0CP6BR96G", "Corsair K55 CORE Gaming Keyboard", "K55 CORE", { layout: "Full-size", switch: "Membrane", connection: "Wired", polling: 1000 }, ["dedicated media keys", "12-key rollover"]),
]);

export const mouseFacts = withPool(pool as Pool, [
  F("B0BGJT87N2", "Razer Naga V2 HyperSpeed Wireless MMO Mouse", "Naga V2 HyperSpeed", { buttons: 19, battery: 400, connection: "HyperSpeed 2.4GHz, Bluetooth" }, ["a Focus Pro optical sensor that tracks on glass"]),
  F("B0BGJTLFN5", "Razer Naga V2 Pro Wireless MMO Mouse", "Naga V2 Pro", { battery: 300, connection: "HyperSpeed 2.4GHz, Bluetooth" }, ["a Focus Pro optical sensor that tracks on glass", "the Pro version of Razer's MMO line"]),
  F("B0FWR3P1FT", "Corsair Scimitar RGB Elite Wired MMO Mouse", "Scimitar RGB Elite", { dpi: 18000, connection: "Wired" }, ["a sliding side-button panel", "an 18,000 DPI optical sensor"]),
  F("B0GNC8YQ6L", "Corsair Darkstar Wireless MMO Mouse", "Darkstar", { buttons: 15, dpi: 26000, battery: 80, polling: 2000, connection: "Slipstream 2.4GHz, Bluetooth" }, ["a six-button thumb cluster"]),
  F("B08QVNG4BM", "Razer Naga X Wired MMO Mouse", "Naga X", { buttons: 16, weight: 85, dpi: 18000, connection: "Wired" }, ["optical mouse switches"]),
  F("B07HC4NBQ8", "Redragon M908 Impact RGB MMO Mouse", "M908", { buttons: 18, polling: 1000, connection: "Wired" }, ["a 12-button side panel at a budget price"]),
  F("B09NBWL8J5", "Logitech G PRO X Superlight 2 Wireless Mouse", "PRO X Superlight 2", { weight: 60, dpi: 44000, connection: "Lightspeed 2.4GHz" }, ["a Hero 2 sensor", "Lightforce hybrid optical-mechanical switches"]),
  F("B092CB69Q4", "Logitech G502 X Plus Wireless Mouse", "G502 X Plus", { connection: "Lightspeed 2.4GHz" }, ["a Hero 25K sensor", "Lightforce hybrid switches", "RGB lighting on the classic G502 shape"]),
  F("B0CJ4TPLRM", "Logitech G PRO 2 Lightspeed Wireless Mouse", "G PRO 2", { connection: "Lightspeed 2.4GHz", shape: "Ambidextrous" }, ["a Hero 2 sensor", "Lightforce hybrid switches"]),
  F("B0C84ZD7L6", "Logitech G309 Lightspeed Wireless Mouse", "G309", { weight: 68, buttons: 6, connection: "Lightspeed 2.4GHz, Bluetooth" }, ["68g with a lithium AA cell, 86g with an alkaline one", "a Hero 25K sensor"]),
  F("B07CMS5Q6P", "Logitech G305 Lightspeed Wireless Mouse", "G305", { dpi: 12000, battery: 250, connection: "Lightspeed 2.4GHz" }, ["a Hero sensor", "runs on a single AA battery"]),
  F("B07GBZ4Q68", "Logitech G502 Hero Wired Mouse", "G502 Hero", { buttons: 11, connection: "Wired" }, ["a Hero sensor", "adjustable weights"]),
  F("B0CTN2SRTH", "Corsair M75 Wireless Gaming Mouse", "M75 Wireless", { weight: 89, dpi: 26000, connection: "Wireless", shape: "Ambidextrous" }, ["optical switches"]),
  F("B0G39J5KQQ", "Corsair Sabre v2 PRO Wireless Mouse", "Sabre v2 PRO", { dpi: 33000, battery: 120, polling: 8000, connection: "Slipstream 2.4GHz, Bluetooth, wired" }, []),
  F("B0CV16ZSMY", "Corsair M75 AIR Wireless Gaming Mouse", "M75 AIR", { weight: 60, dpi: 26000, connection: "Wireless" }, ["a 26,000 DPI optical sensor"]),
  F("B0CYHH583P", "Corsair Katar Elite Wireless Gaming Mouse", "Katar Elite Wireless", { weight: 69, dpi: 26000, battery: 110, connection: "Slipstream 2.4GHz, Bluetooth, wired" }, ["up to 60 hours over Bluetooth"]),
  F("B0CHN1DKLV", "Corsair Nightsabre Wireless Gaming Mouse", "Nightsabre", { buttons: 11, dpi: 26000, battery: 100, connection: "Slipstream 2.4GHz, Bluetooth" }, []),
  F("B07Q424WFW", "Corsair Ironclaw RGB Wireless Gaming Mouse", "Ironclaw RGB Wireless", { buttons: 10, dpi: 18000, connection: "Slipstream 2.4GHz, Bluetooth, wired" }, ["a large palm-grip shape"]),
]);

export const pcHeadsetSchema = headsetSchema;
export const pcHeadsetFacts = withPool(pool as Pool, [
  F("B0CXC2L283", "Logitech G535 Lightspeed Wireless Gaming Headset", "G535", { battery: 33, driver: 40, weight: 236, connection: "Lightspeed 2.4GHz" }, ["wireless at a wired-headset price"]),
  F("B0B8PGDMWK", "HyperX Cloud Stinger 2 Gaming Headset", "Cloud Stinger 2", { driver: 50, connection: "Wired" }, ["DTS Headphone:X spatial audio"]),
  F("B08KKBSDTY", "Logitech G335 Wired Gaming Headset", "G335", { driver: 40, weight: 240, connection: "Wired 3.5mm", mic: "Flip-to-mute" }, ["memory foam ear pads"]),
  F("B0BSJYM8FF", "Razer Kraken V3 X Wired USB Gaming Headset", "Kraken V3 X", { driver: 40, weight: 285, connection: "Wired USB" }, ["7.1 surround in Windows", "memory foam cushions"]),
  F("B0B8Q8P1FY", "SteelSeries Arctis Nova 1 Gaming Headset", "Arctis Nova 1", { connection: "Wired 3.5mm", mic: "Noise-cancelling" }, ["Tempest 3D audio support on PS5", "a multi-system 3.5mm connection"]),
  F("B0D412FWZH", "Turtle Beach Recon 70 Wired Gaming Headset", "Recon 70", { driver: 40, connection: "Wired 3.5mm", mic: "Flip-to-mute" }, ["support for PS5 and Xbox over 3.5mm"]),
  F("B0FS9YN8FJ", "Razer BlackShark V3 Pro Wireless ANC Gaming Headset", "BlackShark V3 Pro", { driver: 50, connection: "HyperSpeed 2.4GHz, Bluetooth, 3.5mm", mic: "Detachable" }, ["active noise cancellation"]),
  F("B0FH5XX7GP", "Razer BlackShark V3 Wireless Gaming Headset", "BlackShark V3", { battery: 70, driver: 50, connection: "HyperSpeed 2.4GHz, Bluetooth", mic: "Detachable" }, []),
  F("B0F6NZWPTC", "HyperX Cloud III S Wireless Gaming Headset", "Cloud III S", { battery: 120, driver: 53, connection: "2.4GHz, Bluetooth", mic: "Detachable" }, ["memory foam cushions"]),
  F("B0D2YBQQ1P", "SteelSeries Arctis Nova 5 Wireless Gaming Headset", "Arctis Nova 5", { battery: 60, connection: "2.4GHz, Bluetooth", mic: "Retractable" }, ["USB-C fast charging"]),
  F("B0DG8XHXPD", "Corsair Virtuoso MAX Wireless Gaming Headset", "Virtuoso MAX", { driver: 50, connection: "2.4GHz, Bluetooth" }, ["active noise cancellation", "Dolby Atmos support"]),
  F("B09YHT473M", "Corsair HS65 Surround Wired Gaming Headset", "HS65 Surround", { driver: 50, weight: 282, connection: "Wired 3.5mm, USB", mic: "Flip-to-mute" }, ["Dolby Atmos support"]),
]);
