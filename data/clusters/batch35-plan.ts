import fs from "node:fs";
import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 35: niche guides. RAM by CPU, mice and keyboards by game and layout, monitors by use, headsets and earbuds for handhelds.
 * Filters read listed specs; where a guide needs a listing statement ("rapid trigger", "Switch 2") the filter reads the Amazon
 * pool text for that ASIN. Slugs that already exist in the registry (best-keyboards-for-programming) are not repeated.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const E = (slug: string, kw: string, g: PlanItem["g"], where: PlanItem["where"], sort: string, seo: string, lead: string, close: string): PlanItem => ({ slug, kw, g, where, sort, seo, lead, close });

const poolText = new Map<string, string>();
for (const file of fs.readdirSync("data/pcj-pool").filter((x) => x.endsWith(".json"))) {
  const pool = JSON.parse(fs.readFileSync(`data/pcj-pool/${file}`, "utf-8")) as Record<string, { title?: string; features?: string[] }>;
  for (const [asin, r] of Object.entries(pool)) poolText.set(asin, `${poolText.get(asin) ?? ""} ${r.title ?? ""} ${(r.features ?? []).join(" ")}`);
}
const listed = (re: RegExp) => (f: Fact) => re.test(poolText.get(f.asin) ?? "");

const ddr5 = (f: Fact) => s(f, "gen") === "DDR5";
const expo = (f: Fact) => /EXPO/.test(s(f, "profiles"));
const xmp = (f: Fact) => /XMP/.test(s(f, "profiles"));
const wiredKb = (f: Fact) => /^wired/i.test(s(f, "connection"));
const overEar = (f: Fact) => !/in-ear/i.test(s(f, "design")) && !/in-ear|earbud|\bIEM\b/i.test(f.name);
const rapid = (f: Fact) => /hall|magnetic|analog/i.test(`${s(f, "switch")} ${f.name}`) && listed(/rapid trigger/i)(f);
const notPortable = (f: Fact) => !/portable|touch/i.test(f.name) && n(f, "size") >= 21;
const res = (f: Fact) => s(f, "res");

export const PLAN: PlanItem[] = [
  // ---------------- RAM by CPU ----------------
  E("best-ram-for-ryzen-5-9600x", "RAM for Ryzen 5 9600X", "ram", (f) => ddr5(f) && expo(f) && n(f, "capacity") === 32 && n(f, "speed") === 6000, "cl", "Best RAM for Ryzen 5 9600X",
    "The Ryzen 5 9600X is an AM5 processor, so it takes DDR5 only; check your motherboard's memory support list for the speed it validates. Every kit here is a 32GB DDR5-6000 set that lists an AMD EXPO profile.",
    "Enable EXPO in the BIOS after the first boot; until you do, the kit runs at a slower default speed."),
  E("best-ram-for-ryzen-9-9950x3d", "RAM for Ryzen 9 9950X3D", "ram", (f) => ddr5(f) && expo(f) && n(f, "capacity") >= 32, "-capacity", "Best RAM for Ryzen 9 9950X3D",
    "A 16-core processor like the Ryzen 9 9950X3D is often bought for rendering and heavy multitasking, so capacity is the first spec to settle. Every kit here is DDR5 with an AMD EXPO profile and holds 32GB or more.",
    "Two modules are easier on the memory controller than four; buy the full capacity as one two-module kit rather than adding sticks later."),
  E("best-ram-for-core-ultra-7-265k", "RAM for Core Ultra 7 265K", "ram", (f) => ddr5(f) && xmp(f) && n(f, "speed") >= 6400, "-speed", "Best RAM for Core Ultra 7 265K",
    "Core Ultra 200S processors use the LGA 1851 socket and DDR5 only, so DDR4 kits will not fit the board. Every kit here lists an Intel XMP profile and is rated DDR5-6400 or faster.",
    "Check the board maker's memory support list for the speed your exact motherboard validates; a faster kit can run at a lower speed."),
  E("best-ram-for-ryzen-7-7800x3d", "RAM for Ryzen 7 7800X3D", "ram", (f) => ddr5(f) && expo(f) && n(f, "capacity") === 32 && n(f, "cl") > 0 && n(f, "cl") <= 32, "-price", "Best RAM for Ryzen 7 7800X3D",
    "The Ryzen 7 7800X3D came out with the first AM5 boards, so update the BIOS before you fit a fast kit. Every kit here is a 32GB DDR5 set with an EXPO profile and a CAS latency of 32 or lower.",
    "If the system will not boot at the rated speed, update the BIOS first and then re-enable EXPO."),
  E("best-ram-for-core-ultra-9-285k", "RAM for Core Ultra 9 285K", "ram", (f) => ddr5(f) && xmp(f) && n(f, "capacity") >= 32, "-capacity", "Best RAM for Core Ultra 9 285K",
    "The Core Ultra 9 285K is a 24-core LGA 1851 processor that takes DDR5 only, so the kit decision is mostly capacity and rated speed. Every kit here lists an Intel XMP profile and holds 32GB or more.",
    "Use two modules and check your board's support list; four modules often run at lower speeds than two."),

  // ---------------- Mice by game and grip ----------------
  E("best-gaming-mice-for-valorant", "gaming mice for Valorant", "gmouse", (f) => /2\.4|lightspeed|hyperspeed|slipstream|wireless/i.test(s(f, "connection")) && n(f, "weight") > 0 && n(f, "weight") <= 62, "-polling", "Best Gaming Mice for Valorant",
    "Valorant rewards a mouse you can start and stop with little effort, so a low weight and a stable wireless link matter more than a long button list. Every mouse here connects without a cable and lists a weight of 62g or less.",
    "Pair a light mouse with a mouse pad whose surface you like; glide and control change more with the pad than with a few grams."),
  E("best-gaming-mice-for-cs2", "gaming mice for CS2", "gmouse", (f) => /^wired/i.test(s(f, "connection")) && n(f, "weight") > 0 && n(f, "weight") <= 70, "weight", "Best Gaming Mice for CS2",
    "Counter-Strike 2 players often want a plain, light mouse with a shape they can hold for hours. Every mouse here is wired and lists a weight of 70g or less, so there is no battery to recharge.",
    "Check the shape against your hand size and grip before the spec sheet; a mouse that fits beats a lighter one that does not."),
  E("best-gaming-mice-for-apex-legends", "gaming mice for Apex Legends", "gmouse", (f) => n(f, "buttons") >= 6 && n(f, "buttons") <= 13 && !/left/i.test(s(f, "shape") + f.name), "-buttons", "Best Gaming Mice for Apex Legends",
    "Apex Legends has several abilities and items to reach in a fight, so extra thumb buttons can save a keyboard reach. Every mouse here lists between 6 and 13 buttons, enough for binds without the grid of an MMO mouse.",
    "Bind only the actions you reach for in a fight; more buttons than you remember to use just add accidental presses."),
  E("best-gaming-mice-for-fingertip-grip", "gaming mice for fingertip grip", "gmouse", (f) => n(f, "weight") > 0 && n(f, "weight") <= 60 && /compact|symmetrical|ambidextrous/i.test(s(f, "shape")), "weight", "Best Gaming Mice for Fingertip Grip",
    "A fingertip grip lifts the palm off the mouse, so a small, light, symmetrical shape is easier to move with the fingers. Every mouse here lists a weight of 60g or less and a compact, symmetrical or ambidextrous shape.",
    "Measure your hand from the wrist crease to the middle fingertip and compare it with the listed length before ordering."),

  // ---------------- Keyboards by game and layout ----------------
  E("best-gaming-keyboards-for-valorant", "gaming keyboards for Valorant", "gkb", (f) => /60%|65%|68|75%/.test(s(f, "layout")) && /hall|magnetic|optical|analog/i.test(s(f, "switch")), "-polling", "Best Gaming Keyboards for Valorant",
    "A compact board leaves more desk width for mouse swings, and adjustable actuation lets you tune how far a key travels before it registers. Every keyboard here has a 60%, 65% or 75% layout with Hall effect, magnetic or optical switches.",
    "Try a lower actuation point only after you are used to the board; shallow settings register accidental touches."),
  E("best-gaming-keyboards-for-cs2", "gaming keyboards for CS2", "gkb", (f) => /TKL|tenkeyless/i.test(s(f, "layout")) && wiredKb(f) && !/membrane/i.test(s(f, "switch")), "price", "Best Gaming Keyboards for CS2",
    "Counter-Strike 2 uses a handful of movement and utility keys, and a tenkeyless board keeps the mouse hand free. Every keyboard here is a wired tenkeyless model, so there is no pairing step before a match.",
    "Check that the keyboard stores its settings on board if you play on more than one PC."),
  E("best-rapid-trigger-keyboards", "rapid trigger keyboards", "gkb", rapid, "-polling", "Best Rapid Trigger Keyboards",
    "Rapid trigger resets a key as soon as it moves back up instead of at a fixed point, which only works on Hall effect or other magnetic-sensor switches. Every keyboard here uses magnetic switches and lists rapid trigger in its description.",
    "Rapid trigger is set in the maker's software or web tool, so check that it supports your operating system before you buy."),
  E("best-96-percent-keyboards", "96% keyboards", "gkb", (f) => /96|98|1800/.test(s(f, "layout")) && f.asin !== "B0F6376QK8", "-polling", "Best 96% Keyboards",
    "A 96% keyboard keeps the number pad and arrow keys but removes the gaps of a full-size board, which saves about an inch of desk width. Every keyboard here is listed with a 96%, 98-key or 1800-style layout.",
    "Check where the keys you use most sit; a 96% board squeezes the arrow cluster and some keycap sets will not fit."),
  E("best-alice-layout-keyboards", "Alice layout keyboards", "gkb", (f) => /alice/i.test(s(f, "layout")), "price", "Best Alice Layout Keyboards",
    "An Alice layout splits the main key block into two angled halves on one board, so your wrists sit closer to a natural angle. Every keyboard here is listed with an Alice layout.",
    "Expect a week or two to adjust; the angled halves change where your hands rest on the home row."),
  E("best-split-keyboards", "split keyboards", "gkb", (f) => /split|corne|sofle/i.test(s(f, "layout")) && !/alice/i.test(s(f, "layout")), "-price", "Best Split Keyboards",
    "A split keyboard separates the two halves so your shoulders and forearms can stay wider, and some models add tenting. Every keyboard here is listed with a split layout and is not an Alice-style single board.",
    "Check whether the halves link by cable or wirelessly and whether the layout matches the keys you already type."),

  // ---------------- Chairs ----------------
  E("best-gaming-chairs-for-heavy-people", "gaming chairs for heavy people", "chair", (f) => /gaming/i.test(f.name) && n(f, "capacity") >= 350, "-capacity", "Best Gaming Chairs for Heavy People",
    "A chair for a heavier person needs a stated weight rating, a wide enough seat and a base that is rated for it. Every chair here is a gaming chair with a listed weight capacity of 350 lb or more.",
    "Check the seat width and the gas-lift class as well as the weight rating, and leave margin above your own weight."),

  // ---------------- Monitors ----------------
  E("best-480hz-monitors", "480Hz monitors", "monitor", (f) => n(f, "hz") >= 480 && n(f, "hz") !== 500, "-hz", "Best 480Hz Monitors",
    "A 480Hz monitor only shows its speed if your graphics card can render that many frames, so it suits older or lighter games. Every monitor here lists a 480Hz or faster refresh rate and is not one of the 500Hz models.",
    "Use DisplayPort and the cable in the box; some models only reach the top refresh rate over one input."),
  E("best-500hz-monitors", "500Hz monitors", "monitor", (f) => n(f, "hz") === 500, "price", "Best 500Hz Monitors",
    "At 500Hz the display refreshes every two milliseconds, and the panel type decides how clean fast motion looks. Every monitor here lists a 500Hz refresh rate.",
    "Check which input carries 500Hz on the exact model; some limit it to DisplayPort."),
  E("best-oled-monitors-under-500", "OLED monitors under $500", "monitor", (f) => /OLED/.test(s(f, "panel")) && notPortable(f) && p(f) <= 500, "price", "Best OLED Monitors Under $500",
    "OLED monitors under $500 are mostly 27-inch 1440p models, and the question is how much refresh rate and brightness the budget buys. Every monitor here uses an OLED panel and cost $500 or less when we checked.",
    "Look at the warranty terms for burn-in cover, and turn on the panel-care features the maker provides."),
  E("best-1440p-monitors-under-200", "1440p monitors under $200", "monitor", (f) => res(f) === "2560x1440" && notPortable(f) && p(f) <= 200, "-hz", "Best 1440p Monitors Under $200",
    "At this price a 1440p monitor trades some panel quality for resolution, so refresh rate and panel type are what separate them. Every monitor here has a 2560x1440 resolution and cost $200 or less when we checked.",
    "Check the stand: at this price many models tilt only, so plan for a monitor arm if height matters."),
  E("best-monitors-for-photo-editing", "monitors for photo editing", "monitor", (f) => /P3|Adobe/.test(s(f, "gamut")) && /calibrat|delta e/i.test(f.notes.join(" ")) && notPortable(f) && n(f, "hz") <= 160 && !/ROG|Odyssey|Alienware|Nitro|UltraGear|MAG|MPG|CUNPU/i.test(f.name), "price", "Best Monitors for Photo Editing",
    "Photo editing needs a panel that covers the colour space you work in and is calibrated before it reaches you. Every monitor here lists a colour gamut figure and factory calibration or a Delta E accuracy figure.",
    "A factory report does not replace a calibration tool; if prints matter, calibrate the screen with a colorimeter."),
  E("best-monitors-for-programming", "monitors for programming", "monitor", (f) => res(f) === "3840x2160" && /IPS/.test(s(f, "panel")) && n(f, "size") >= 24 && n(f, "size") <= 32 && p(f) <= 450 && notPortable(f) && n(f, "hz") <= 120 && !/ROG|Odyssey|Alienware|Nitro|UltraGear|MAG|MPG|CUNPU/i.test(f.name), "price", "Best Monitors for Programming",
    "Code stays readable at smaller sizes on a sharper screen, and a 4K IPS panel gives plenty of room for an editor and a terminal side by side. Every monitor here is a 3840x2160 IPS model that cost $450 or less.",
    "Set operating system scaling to 125% or 150% rather than leaving text tiny, and check the stand for height and pivot."),
  E("best-monitors-for-macbook-pro", "monitors for MacBook Pro", "monitor", (f) => !!f.specs.usbc && listed(/thunderbolt|mac-ready|for macbook|mac color|for mac\b/i)(f) && notPortable(f) && n(f, "hz") < 200, "price", "Best Monitors for MacBook Pro",
    "A monitor for a MacBook Pro should carry video and charge the laptop over one USB-C or Thunderbolt cable, so the power delivery figure matters. Every monitor here has a USB-C or Thunderbolt input and lists 90W or more of power or Mac-specific tuning.",
    "Check the MacBook's charger wattage against the monitor's power delivery, and use the cable in the box."),
  E("best-monitors-for-nintendo-switch-2", "monitors for Nintendo Switch 2", "monitor", (f) => n(f, "hz") >= 120 && n(f, "hz") <= 240 && (res(f) === "1920x1080" || res(f) === "2560x1440") && notPortable(f) && p(f) <= 400, "-hz", "Best Monitors for Nintendo Switch 2",
    "Nintendo lists Switch 2 output as 4K at up to 60Hz or up to 120Hz at 1080p and 1440p over HDMI, so a 1080p or 1440p monitor with a 120Hz or faster refresh rate can show its fastest mode. Every monitor here is 1080p or 1440p, lists 120Hz or more and cost $400 or less.",
    "Confirm the monitor has an HDMI input that carries 120Hz at its resolution; some models limit HDMI to a lower refresh rate than DisplayPort."),
  E("best-ultrawide-monitors-for-work", "ultrawide monitors for work", "monitor", (f) => n(f, "size") >= 34 && /3440|5120/.test(res(f)) && !!f.specs.usbc && !/OLED/.test(s(f, "panel")), "price", "Best Ultrawide Monitors for Work",
    "An ultrawide replaces a pair of side-by-side windows with one panel, and a USB-C input charges and connects a laptop on one cable. Every monitor here is a 34-inch or larger ultrawide with a USB-C connection.",
    "Check how many pixels sit on the vertical axis; 1440 lines suits most work, but a 1080-line ultrawide is not the same."),
  E("best-dual-monitor-setups", "dual monitor setups", "monitor", (f) => /IPS/.test(s(f, "panel")) && n(f, "size") >= 23.8 && n(f, "size") <= 27 && p(f) <= 130 && /bezel/i.test(f.notes.join(" ")) && notPortable(f), "-hz", "Best Monitors for Dual Monitor Setups",
    "Two matching monitors look best with thin bezels and the same panel type, so buy two of the same model. Every monitor here is a 24 to 27-inch IPS model with a slim bezel that cost $130 or less, so a pair stays affordable.",
    "Buy both monitors in one order if you can; panels from different batches can differ slightly in colour."),

  // ---------------- Headsets and earbuds ----------------
  E("best-gaming-headsets-for-nintendo-switch-2", "gaming headsets for Nintendo Switch 2", "headset", (f) => overEar(f) && listed(/switch 2/i)(f), "price", "Best Gaming Headsets for Nintendo Switch 2",
    "Switch 2 has a 3.5mm jack and a USB-C port, and wireless headsets need a dongle that the console accepts. Every headset here lists Nintendo Switch 2 in its title or description.",
    "Check whether the headset is wired or needs its own USB-C dongle, and whether the mic works in the Switch 2 voice chat you use."),
  E("best-gaming-headsets-for-steam-deck", "gaming headsets for Steam Deck", "headset", (f) => overEar(f) && f.asin !== "B0B9W8MQ8J" && /bluetooth|3\.5mm|usb-c|usb/i.test(s(f, "connection")) && n(f, "driver") >= 40, "-battery", "Best Gaming Headsets for Steam Deck",
    "Steam Deck has a 3.5mm headphone jack, USB-C and Bluetooth, so wired and wireless headsets can all connect. Every headset here lists a 3.5mm, USB or Bluetooth connection and a 40mm or larger driver.",
    "A USB dongle takes the Deck's only USB-C port unless you use a dock, so a Bluetooth or 3.5mm headset keeps the port free."),
  E("best-wireless-earbuds-for-gaming", "wireless earbuds for gaming", "headset", (f) => /true wireless/i.test(s(f, "design")) && listed(/low.?latency|game mode|gaming mode|2\.4 ?g/i)(f), "-battery", "Best Wireless Earbuds for Gaming",
    "Ordinary Bluetooth earbuds add delay that you notice in games, so look for a 2.4GHz dongle or a stated low-latency mode. Every pair here is a true wireless set that lists a 2.4GHz dongle or a low-latency or gaming mode.",
    "Latency figures come from the makers; test the pair in the game you play, and keep the dongle plugged in for the low-latency mode."),
];
