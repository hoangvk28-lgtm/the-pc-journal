import ergo from "@/data/pcj-pool/ergonomics.json";
import lighting from "@/data/pcj-pool/lighting.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool, str } from "./helpers";

/** Batch 13d desk accessory fact sheets: chair mats, headset stands, bungees, lamps, tower stands. Listing claims only. */
const P = { ...(ergo as Record<string, { img?: string; price?: string }>), ...(lighting as Record<string, { img?: string; price?: string }>) };
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

// ---------- Office chair floor mats ----------
export const floorMatSchema: CategorySchema = {
  id: "chair-mat",
  plural: "Chair Mats",
  fields: [
    { key: "size", label: "Size", fmt: (v) => String(v) },
    { key: "area", label: "Coverage", noun: "coverage", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v} sq in`, strength: (v) => (Number(v) >= 2400 ? "Covers a wide rolling area" : undefined) },
    { key: "thick", label: "Thickness", noun: "thickness", better: "higher", superlative: ["thickest", "thinnest"], fmt: (v) => `${v}mm`, strength: (v) => (Number(v) >= 5 ? `${v}mm thick` : undefined) },
    { key: "floor", label: "Floor type", fmt: (v) => String(v) },
    { key: "lip", label: "Lip", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    if (/carpet/i.test(str(f, "floor"))) s.push(`The ${f.short} grips carpet with studs; check your pile height against the listing before buying.`);
    if (/hard/i.test(str(f, "floor"))) s.push(`The ${f.short} is for hard floors; on carpet it will shift and can crack.`);
    return s;
  },
  criteria: [
    { id: "floor", title: "Carpet and hard floors need different mats", body: "Carpet mats have studs underneath to grip the pile. Hard-floor mats have a smooth or lightly textured base that does not scratch wood." },
    { id: "pile", title: "Match the carpet pile", body: "Thin mats suit low-pile office carpet up to about 1/4 inch. Deeper pile needs a thicker, stiffer mat or it flexes and cracks." },
    { id: "size", title: "Cover the whole rolling zone", body: "Measure where the chair rolls while you work, not just where it sits. 36 x 48 inches is common; larger desks need more." },
    { id: "lip", title: "A lip covers the under-desk area", body: "Mats with a lip extend under the desk where your feet rest. Rectangular mats suit L-shaped desks and tight spaces." },
    { id: "flat", title: "Let it flatten", body: "Rolled mats can curl at first. Lay it flat at room temperature for a day before judging it." },
  ],
  faq: [
    { id: "need", q: "Do I need a chair mat on hardwood?", a: "It prevents casters from scuffing the finish over time. Soft rubber casters are the alternative." },
    { id: "carpet-type", q: "Will a hard-floor mat work on carpet?", a: "No. Without studs it slides and bends, and it can crack under the chair." },
    { id: "curl", q: "Why does my new mat curl?", a: "It was shipped rolled. Lay it flat in a warm room for a day or two, weighed at the corners." },
    { id: "size-pick", q: "What size chair mat do I need?", a: "Measure your rolling area. 36 x 48 inches fits most single desks; larger or L-shaped desks need more." },
    { id: "thick", q: "Is a thicker mat better?", a: "On deeper carpet, yes. On hard floors a thin mat is enough." },
  ],
  evaluated: [
    { title: "Floor type", description: "We noted whether the listing is for carpet, hard floors or both." },
    { title: "Size", description: "We recorded listed dimensions and computed coverage in square inches." },
    { title: "Thickness", description: "We recorded listed thickness where given." },
    { title: "Shape", description: "We noted whether the mat has a lip." },
  ],
};

export const floorMat13dFacts: Record<string, Fact> = withPool(P, [
  F("B0893BD69B", "Kuyal Clear Chair Mat for Hardwood Floor (36 x 48 in)", "Kuyal hard floor", { size: "36 x 48 in", area: 1728, floor: "Hard floor", lip: "No" }, ["a clear finish", "a 36 x 48 inch size", "a hard-floor design"]),
  F("B0CC1ZLDL2", "BesWin Office Chair Mat for Carpet (30 x 48 in)", "BesWin 30 x 48", { size: "30 x 48 in", area: 1440, thick: 2.2, floor: "Carpet" }, ["2.2mm thickness", "3mm studs underneath", "a 30 x 48 inch size"]),
  F("B01N99XMM2", "HON Heavy Duty Chair Mat for Carpet", "HON", { size: "36 x 48 in", area: 1728, thick: 2.2, floor: "Carpet up to 1/4 in", lip: "Yes" }, ["an extended lip", "a 2.2mm plastic mat", "carpet up to 1/4 inch pile"]),
  F("B08FCDNGYB", "Yecaye Office Chair Mat for Hardwood Floor", "Yecaye", { size: "36 x 48 in", area: 1728, thick: 1.8, floor: "Hard floor" }, ["a 48 x 36 inch size", "a 0.07 inch profile", "a hard-floor design"]),
  F("B0C8M2JCHR", "Chair Mat for Low Pile Carpet (47.5 x 35.5 in)", "low-pile carpet mat", { size: "47.5 x 35.5 in", area: 1686, floor: "Carpet up to 1/4 in" }, ["studs on the underside", "low-pile carpet up to 1/4 inch", "a 47.5 x 35.5 inch size"]),
  F("B0F1R227SY", "Staples Office Chair Mat with Lip for Flat-Pile Carpet", "Staples", { size: "48 x 36 in", area: 1728, floor: "Carpet up to 1/8 in", lip: "Yes" }, ["a lip", "flat-pile commercial carpet up to 1/8 inch", "a 48 x 36 inch size"]),
  F("B0CSKKMDSP", "MuArts Thick Crystal Clear Chair Mat", "MuArts", { size: "Four sizes, 32 x 54 to 47 x 59 in", thick: 5, floor: "Carpet or hard floor" }, ["a 1/5 inch thickness", "a 14 lb weighted build", "sizes from 32 x 54 to 47 x 59 inches"]),
  F("B0CC1ZGMKV", "BesWin Office Chair Mat for Carpet (48 x 60 in)", "BesWin 48 x 60", { size: "48 x 60 in", area: 2880, thick: 2.2, floor: "Carpet" }, ["a 48 x 60 inch size", "2.2mm thickness", "3mm studs underneath"]),
  F("B0BNP1BX45", "Gorilla Grip Office Chair Mat for Carpet", "Gorilla Grip", { size: "29 x 47 in", area: 1363, thick: 2.3, floor: "Carpet", lip: "No" }, ["a 400 lb tested load per the listing", "a 0.09 inch thickness", "a 29 x 47 inch size without a lip"]),
]);

// ---------- Headset stands and hangers ----------
export const headsetStandSchema: CategorySchema = {
  id: "headset-stand",
  plural: "Headset Stands",
  fields: [
    { key: "type", label: "Type", fmt: (v) => String(v) },
    { key: "height", label: "Height", noun: "height", better: "higher", superlative: ["tallest", "shortest"], fmt: (v) => `${v} in` },
    { key: "load", label: "Listed load", noun: "load rating", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} lbs` },
    { key: "usb", label: "USB ports", fmt: (v) => String(v), strength: (v) => `USB ports (${v})` },
    { key: "mount", label: "Mounting", fmt: (v) => String(v) },
    { key: "extra", label: "Extras", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    if (/clamp/i.test(str(f, "mount"))) s.push(`Check your desk thickness against the ${f.short}'s clamp range.`);
    if (/adhesive/i.test(str(f, "mount"))) s.push(`Stick the ${f.short} to a clean, smooth underside; textured or dusty surfaces weaken adhesive.`);
    if (f.specs.usb) s.push(`The ${f.short}'s USB ports need a cable to the PC; they are not a substitute for a powered hub.`);
    return s;
  },
  criteria: [
    { id: "type", title: "Desk stand or under-desk hanger", body: "A stand shows the headset on the desk; a hanger clamps or sticks under the edge and frees the surface." },
    { id: "fit", title: "Fit the headband", body: "Wide or heavy headsets need a broad, padded cradle. Check the listed headband width or load." },
    { id: "stability", title: "Weighted bases stop tipping", body: "A heavy headset on a light stand can tip. Look for a weighted or wide base with non-slip pads." },
    { id: "usb", title: "USB ports add a hub", body: "Some stands add USB-A or USB-C ports for a mouse dongle or phone charging. They need a cable to the PC." },
    { id: "mount", title: "Clamp or adhesive", body: "Clamp hangers move easily; adhesive hangers are permanent-ish and need a clean surface." },
  ],
  faq: [
    { id: "need", q: "Do I need a headset stand?", a: "It keeps the headband and cushions from being crushed in a drawer and keeps the cable tidy." },
    { id: "adhesive", q: "Will an adhesive hanger damage my desk?", a: "It can leave residue on removal. Use a clamp hanger on a desk you want to keep clean." },
    { id: "rgb", q: "Do RGB stands need power?", a: "Yes, over USB from the PC or a wall adapter." },
    { id: "controller", q: "Can a stand hold a controller too?", a: "Some add a controller hook. Check the listing for one." },
    { id: "heavy", q: "Will a stand hold a heavy headset?", a: "Most do. A weighted base or a stated load rating is the thing to check." },
  ],
  evaluated: [
    { title: "Type", description: "We sorted stands and under-desk hangers." },
    { title: "Mounting", description: "We noted clamp ranges and adhesive or screw mounting." },
    { title: "Extras", description: "We noted USB ports, lighting and controller hooks." },
    { title: "Load and size", description: "We recorded listed heights and load ratings where given." },
  ],
};

export const headsetStand13dFacts: Record<string, Fact> = withPool(P, [
  F("B01GJQ7N94", "New Bee Headphone Stand", "New Bee stand", { type: "Desk stand", height: 8.85 }, ["an 8.85 inch height", "a small 3.7 inch footprint", "a price under $10 at the time of writing"]),
  F("B07BVK2FQW", "EURPMASK Rotating Clamp-On Headphone Stand", "EURPMASK clamp", { type: "Under-desk hanger", mount: "Clamp, 0.31 to 1.57 in desks" }, ["a spring clamp for desks 0.31 to 1.57 inches thick", "rubber pads on the clamp ends", "a rotating hook"]),
  F("B0CQ2T2SCM", "RGB Headphone Stand with USB-C Ports", "RGB USB-C stand", { type: "Desk stand", height: 9.84, usb: "USB-C data, Type-C charging", extra: "7 light modes" }, ["7 light modes", "USB-C data and charging ports", "a non-slip base"]),
  F("B09XHJBYTJ", "New Bee RGB Aluminum Headphone Stand", "New Bee RGB", { type: "Desk stand", height: 9.53, usb: "USB-A plus USB-C", extra: "RGB, weighted base" }, ["an aluminum build", "USB-C and USB-A ports", "a wide weighted base"]),
  F("B08V58PY4L", "IFYOO RGB Gaming Headset Stand", "IFYOO", { type: "Desk stand", usb: "2x USB 2.0", extra: "RGB, weighted base" }, ["two USB 2.0 ports", "a weighted base", "a rubberized mat"]),
  F("B00P31BMHG", "Elevation Lab The Anchor Under-Desk Headphone Mount", "Anchor", { type: "Under-desk hanger", mount: "3M adhesive" }, ["genuine 3M adhesive", "an under-desk mount", "a small footprint"]),
  F("B07K58D1SL", "Yocice Aluminum Under-Desk Headphone Hanger", "Yocice", { type: "Under-desk hanger", load: 10, mount: "Adhesive or screws" }, ["a 10 lb capacity", "adhesive or screw mounting", "an aluminum hook"]),
  F("B07PFV1NQX", "APPHOME Foldable Clamp Headphone Hanger", "APPHOME", { type: "Under-desk hanger", load: 5, mount: "Screw clamp, 5 to 50mm desks" }, ["a screw clamp for desks 5 to 50mm thick", "a fold-away hook", "room for a sound bar up to 2.1 inches wide"]),
  F("B077BHFSPS", "Dual Aluminum Under-Desk Headset Holder", "dual hook hanger", { type: "Under-desk dual hanger", load: 11, mount: "Adhesive (4.4 lb) or screws (11 lb)" }, ["two hooks", "11 lbs with the included screws", "headbands up to 1.57 inches wide"]),
  F("B07YNN9DSV", "Tilted Nation RGB Headset Stand with Mouse Bungee", "Tilted Nation", { type: "Desk stand", usb: "2x USB 2.0", extra: "Mouse bungee, RGB" }, ["a built-in mouse bungee", "a 2-port USB 2.0 hub", "a weighted base with non-slip grips"]),
  F("B0FPBJ85NV", "UPERGO Walnut Headphone Stand with Controller Holder", "UPERGO walnut", { type: "Desk stand", extra: "Controller holder, storage" }, ["solid walnut wood", "a weighted base", "a controller holder"]),
]);

// ---------- Mouse bungees ----------
export const bungeeSchema: CategorySchema = {
  id: "bungee",
  plural: "Mouse Bungees",
  fields: [
    { key: "arm", label: "Arm", fmt: (v) => String(v) },
    { key: "base", label: "Base", fmt: (v) => String(v) },
    { key: "weight", label: "Weight", noun: "weight", better: "higher", superlative: ["heaviest", "lightest"], fmt: (v) => `${v}g` },
    { key: "extra", label: "Extras", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s = [`A bungee helps only with a wired mouse; if you plan to go wireless, the ${f.short} will sit idle.`];
    if (/adhesive/i.test(str(f, "base"))) s.push(`The ${f.short} sticks down, so pick its spot before removing the backing.`);
    if (/clamp/i.test(str(f, "base"))) s.push(`Check the ${f.short}'s clamp fits your desk edge.`);
    return s;
  },
  criteria: [
    { id: "cable", title: "Worth it only for wired mice", body: "A bungee holds the cable up so it does not drag on the pad. Braided or stiff cables benefit most." },
    { id: "base", title: "Weighted, adhesive or clamp base", body: "Weighted bases can move around the desk. Adhesive bases stay put but are fixed. Clamps sit at the edge." },
    { id: "arm", title: "Spring arm height", body: "The arm should hold the cable just above the pad. Adjustable arms suit different desk layouts." },
    { id: "position", title: "Place it behind and to the side", body: "Most players place it behind the mouse pad, slightly toward the monitor, so the cable has slack." },
    { id: "size", title: "Footprint", body: "Compact bungees fit between keyboard and pad; larger ones add USB ports or lights." },
  ],
  faq: [
    { id: "need", q: "Do I need a mouse bungee?", a: "Only with a wired mouse whose cable drags or snags. Lightweight paracord-style cables need it less." },
    { id: "wireless", q: "Does a bungee help a wireless mouse?", a: "Only when charging it with a cable while you play." },
    { id: "where", q: "Where do I put a mouse bungee?", a: "Behind the pad and slightly toward the screen, with a little slack in the cable." },
    { id: "adhesive", q: "Are adhesive bungees permanent?", a: "They are meant to stay. Some packs include spare adhesive for moving it once." },
    { id: "cable-types", q: "Does it work with thick cables?", a: "Most clips hold standard gaming cables. Check the grip if your cable is unusually thick." },
  ],
  evaluated: [
    { title: "Base", description: "We noted weighted, adhesive or clamp bases." },
    { title: "Arm", description: "We noted spring and height-adjustable arms." },
    { title: "Weight", description: "We recorded listed weights." },
    { title: "Extras", description: "We noted lighting and USB ports." },
  ],
};

export const bungee13dFacts: Record<string, Fact> = withPool(P, [
  F("B0C81FSVCC", "Pulsar Micro Bungee ES", "Pulsar Micro Bungee", { arm: "Flexible silicone", base: "3M VHB adhesive", extra: "Spare adhesive" }, ["a flexible silicone arm", "3M VHB adhesive", "spare adhesive in the pack"]),
  F("B07H6B3QS2", "Hotline Games Mouse Bungee", "Hotline", { arm: "Retractable spring" }, ["a retractable spring arm", "a compact body"]),
  F("B08HCF3W5Q", "Razer Mouse Bungee V3 Chroma", "Bungee V3 Chroma", { arm: "Adjustable spring", base: "Weighted, non-slip feet", extra: "Chroma RGB" }, ["an adjustable spring arm", "a weighted base with non-slip feet", "Chroma RGB lighting"]),
  F("B0B1SHVZZF", "SteelSeries Mouse Bungee", "SteelSeries bungee", { weight: 263, base: "Weighted" }, ["a 263g body", "a 63 x 97 x 88mm size"]),
  F("B09TPMV7M9", "Sisyphy Gaming Mouse Bungee", "Sisyphy", { weight: 198, arm: "Height-adjustable spring, up to 3 in", base: "Weighted, rubber feet" }, ["a spring arm that extends up to 3 inches", "a 7 oz weighted base", "rubber footing"]),
  F("B083TZP5BB", "Endgame Gear MB1 Mouse Bungee", "MB1", { arm: "Height-adjustable", base: "Clamp", extra: "Anti-slip feet" }, ["an adjustable arm height", "a clamp that tightens on the cable", "anti-slip feet"]),
]);

// ---------- Desk lamps ----------
export const lampSchema: CategorySchema = {
  id: "desk-lamp",
  plural: "Desk Lamps",
  fields: [
    { key: "lumens", label: "Brightness", noun: "brightness", better: "higher", superlative: ["brightest", "dimmest"], fmt: (v) => `${v} lm`, strength: (v) => (Number(v) >= 1000 ? `${v} lumens` : undefined) },
    { key: "watts", label: "Power", fmt: (v) => `${v}W` },
    { key: "cct", label: "Color temperature", fmt: (v) => String(v) },
    { key: "levels", label: "Brightness levels", fmt: (v) => String(v) },
    { key: "mount", label: "Mount", fmt: (v) => String(v) },
    { key: "usb", label: "Charging ports", fmt: (v) => String(v), strength: (v) => `Charging ports (${v})` },
  ],
  compat: (f) => {
    const s: string[] = [];
    if (/clamp/i.test(str(f, "mount"))) s.push(`Check your desk edge fits the ${f.short}'s clamp${/in/.test(str(f, "mount")) ? ` (${str(f, "mount").replace(/^clamp,?\s*/i, "")})` : ""}.`);
    if (/USB/i.test(str(f, "power"))) s.push(`The ${f.short} runs from a USB adapter; a weak laptop port may not drive it at full brightness.`);
    return s;
  },
  criteria: [
    { id: "cct", title: "Color temperature range", body: "Around 3000K is warm and suits evenings; 5000 to 6500K is cool and closer to daylight. A wide range lets you match room light." },
    { id: "brightness", title: "Brightness in lumens", body: "Lumens are a better guide than watts. 500 to 800 lumens lights a desk; wider desks or dual monitors benefit from more." },
    { id: "mount", title: "Clamp or base", body: "Clamp lamps free desk space and reach further. Base lamps move easily but take up a corner." },
    { id: "reach", title: "Arm reach and head size", body: "Long arms and wide heads spread light across the whole desk instead of one spot." },
    { id: "extras", title: "Timers, memory and charging ports", body: "Memory recalls the last setting; USB ports charge a phone. Useful, but secondary to the light itself." },
  ],
  faq: [
    { id: "cct-pick", q: "What color temperature is best for a home office?", a: "Many people use around 4000 to 5000K during the day and warmer light in the evening. A lamp with a range lets you choose." },
    { id: "lumens", q: "How many lumens do I need for a desk?", a: "Around 500 to 800 lumens for a typical desk; more for a wide L-shaped desk." },
    { id: "glare", q: "How do I avoid glare on my monitor?", a: "Place the lamp to the side and aim it at the desk, not the screen." },
    { id: "clamp", q: "Will a clamp lamp fit my desk?", a: "Check the listed maximum desk thickness; most fit up to about 2 to 2.75 inches." },
    { id: "watts", q: "Do watts tell me brightness?", a: "Not reliably with LEDs. Look for the lumen figure." },
  ],
  evaluated: [
    { title: "Brightness", description: "We recorded lumens and watts where listed." },
    { title: "Color", description: "We recorded the listed color temperature range and number of levels." },
    { title: "Mounting", description: "We noted clamps, bases and listed desk thickness limits." },
    { title: "Extras", description: "We noted charging ports, remotes and timers." },
  ],
};

export const lamp13dFacts: Record<string, Fact> = withPool(P, [
  F("B0C4JTPPYY", "Airlonv LED Desk Lamp with Clamp", "Airlonv", { cct: "2700K to 6500K", levels: "Stepless", mount: "Clamp, desks up to 2.36 in", power: "USB adapter" }, ["stepless dimming", "a 2700K to 6500K range", "a metal clamp for desks up to 2.36 inches"]),
  F("B0BRCJL4MM", "Pzloz Architect Desk Lamp with Clamp", "Pzloz", { watts: 24, cct: "3000K to 5500K", levels: "5 levels", mount: "Clamp" }, ["a 24W light", "5 color temperatures from 3000K to 5500K", "a clamp for dual-monitor desks"]),
  F("B08923SXXP", "LED Desk Lamp with USB Ports", "USB-port lamp", { cct: "5 colors", levels: "3 levels", mount: "Base", usb: "USB-A and USB-C" }, ["USB-A and USB-C charging ports", "5 light colors", "3 brightness levels"]),
  F("B08LMTQ7ZF", "Lepro LED Desk Lamp", "Lepro", { lumens: 750, watts: 9.5, levels: "5 levels", mount: "Base" }, ["750 lumens from 9.5W", "5 brightness levels", "touch controls"]),
  F("B0D4DG2CG2", "Motumen LED Desk Lamp with Clamp and Remote", "Motumen", { cct: "3000K to 6500K", levels: "5 levels", mount: "Clamp" }, ["a remote with a 32.8 foot range", "5 color temperatures from 3000K to 6500K", "a compact clamp"]),
  F("B0BB5ZBT42", "Voncerus LED Clip-On Desk Lamp", "Voncerus", { cct: "2700K, 4500K, 6500K", levels: "10 levels", mount: "Clamp", power: "USB" }, ["3 color modes from 2700K to 6500K", "10 brightness levels", "a memory function"]),
  F("B0BNHNG5CY", "Micomlan Architect Desk Lamp with Clamp", "Micomlan", { watts: 24, cct: "3000K to 6500K", levels: "5 levels plus stepless", mount: "Clamp" }, ["a 24W light", "stepless 3000K to 6500K tuning", "atmosphere lighting"]),
  F("B0FG7XJWLM", "CHARYJOD Height-Adjustable Architect Desk Lamp", "CHARYJOD", { cct: "3000K to 6500K", levels: "10 levels", mount: "Base", usb: "USB" }, ["10 brightness levels and 5 color temperatures", "50 light combinations", "a height-adjustable arm"]),
  F("B0BKT611XR", "LEPOWER 800LM LED Desk Lamp", "LEPOWER 800LM", { lumens: 800, watts: 12, cct: "5 temperatures", levels: "10 levels", mount: "Base" }, ["800 lumens from 12W", "an RG0 rating under IEC 62778", "a lighting area up to 50 inches"]),
  F("B0FCS5W2WL", "15W LED Desk Lamp with USB Charging Ports", "15W USB lamp", { watts: 15, cct: "3000K, 4500K, 6000K", levels: "5 levels", mount: "Base", usb: "USB-A and USB-C" }, ["USB-A and USB-C charging ports", "4 timer settings", "3 color temperatures"]),
  F("B0GT11HGV9", "ONEMIX 42-inch Desk Lamp with Clamp", "ONEMIX", { lumens: 1800, cct: "3200K to 6500K", levels: "5 levels", mount: "Clamp, desks up to 2.75 in" }, ["1800 lumens from four LED panels", "a 3200K to 6500K range", "a heavy-duty clamp for desks up to 2.75 inches"]),
]);

// ---------- Computer tower stands ----------
export const towerStandSchema: CategorySchema = {
  id: "tower-stand",
  plural: "Computer Stands",
  fields: [
    { key: "load", label: "Listed load", noun: "load rating", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} lbs`, strength: (v) => (Number(v) >= 88 ? `${v} lb rating` : undefined) },
    { key: "width", label: "Case width", fmt: (v) => String(v) },
    { key: "type", label: "Type", fmt: (v) => String(v) },
    { key: "height", label: "Height", fmt: (v) => String(v) },
    { key: "power", label: "Outlets", fmt: (v) => String(v), strength: (v) => `Built-in outlets (${v})` },
    { key: "wheels", label: "Wheels", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s = [`Measure your case width against the ${f.short}'s listed fit before ordering.`];
    if (/desk-side|cart/i.test(str(f, "type"))) s.push(`Leave airflow room: keep the ${f.short}'s case vents clear of the desk and wall.`);
    if (f.specs.power) s.push(`The ${f.short}'s outlets share one wall plug; do not run a high-wattage PC and a space heater from it.`);
    return s;
  },
  criteria: [
    { id: "fit", title: "Measure the case width", body: "Floor stands list a width range. Mid-towers are often 8 to 9 inches wide; full towers can exceed 10." },
    { id: "load", title: "Load rating", body: "Most gaming PCs weigh 20 to 45 lb. A higher rating gives margin for a full tower with a custom loop." },
    { id: "airflow", title: "Lift for airflow and dust", body: "Raising the case off carpet keeps bottom intakes clear and cuts dust." },
    { id: "type", title: "Floor stand or desk-side cart", body: "Low floor stands just lift the tower. Desk-height carts put the case beside the desk with shelves above." },
    { id: "wheels", title: "Wheels need locks", body: "Casters make cleaning easier; locking ones stop the PC rolling when you plug in cables." },
  ],
  faq: [
    { id: "carpet", q: "Should a PC sit on carpet?", a: "It is better lifted. Carpet can block bottom intakes and adds dust." },
    { id: "width", q: "Will my case fit?", a: "Measure its width at the widest point, including feet, and compare with the listed range." },
    { id: "cart", q: "What is a desk-side PC cart?", a: "A taller stand that puts the tower at desk height beside the desk, often with a shelf." },
    { id: "wheels", q: "Are wheeled stands safe?", a: "Yes with locking casters. Lock them before plugging in cables." },
    { id: "outlets", q: "Can I plug my PC into a stand's outlets?", a: "Check the listed rating. They share one wall plug, so avoid adding heaters or other high-draw devices." },
  ],
  evaluated: [
    { title: "Load", description: "We recorded listed load ratings for each shelf." },
    { title: "Fit", description: "We noted listed case width ranges." },
    { title: "Type", description: "We sorted floor stands and desk-height carts." },
    { title: "Extras", description: "We noted outlets, USB ports, hooks and casters." },
  ],
};

export const towerStand13dFacts: Record<string, Fact> = withPool(P, [
  F("B0C4T42TPC", "Adjustable Computer Tower Stand with Wheels", "adjustable tower stand", { load: 88, width: "7.87 to 11.81 in", type: "Floor stand" }, ["an 88 lb rating", "a width that adjusts from 7.87 to 11.81 inches", "a 15.75 inch length"]),
  F("B0FH9MY1TL", "ZUAVIALA Computer Tower Stand with Power Outlet", "ZUAVIALA with outlets", { load: 88, type: "Desk-side cart", height: "21.34 to 28.3 in", power: "2 AC, USB-A, USB-C" }, ["2 AC outlets plus USB-A and USB-C", "six height levels from 21.34 to 28.3 inches", "an 88 lb top and 110 lb lower shelf"]),
  F("B083DMYKC9", "Liitrton Mobile CPU Stand", "Liitrton", { type: "Floor stand", width: "Adjustable" }, ["an adjustable width and length", "a non-slip textured surface", "a low price"]),
  F("B0D69W6H91", "JANE EYRE Height-Adjustable Computer Tower Stand", "JANE EYRE", { load: 90, type: "Desk-side cart", height: "23.03 to 28.3 in", power: "2 AC, 2 USB" }, ["a 90 lb top and 120 lb bottom shelf", "2 AC outlets and 2 USB ports", "4 built-in hooks"]),
  F("B0FNWMM9XN", "PUTORSEN Under-Desk Computer Tower Mount", "PUTORSEN", { load: 66, width: "Up to 10 in", type: "Under-desk mount", height: "5.2 to 11.9 in" }, ["an under-desk mount for mid-towers", "cases up to 10 inches wide", "a 66 lb rating"]),
  F("B0G4WGMT9W", "ZIIWIND 2-Tier Rolling PC Stand", "ZIIWIND", { load: 44, type: "2-tier floor cart", wheels: "Locking casters" }, ["360-degree locking casters", "hooks for a headset", "a second tier"]),
  F("B09SCYSFP9", "EUREKA ERGONOMIC Height-Adjustable PC Stand", "EUREKA", { load: 80, type: "Desk-side cart", height: "23.25 to 33.25 in" }, ["a height range from 23.25 to 33.25 inches in 2 inch steps", "an 80 lb top and 100 lb bottom shelf", "a desk-side design"]),
]);
