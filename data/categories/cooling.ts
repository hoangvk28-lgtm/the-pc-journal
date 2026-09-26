import pool from "@/data/pcj-pool/cooling.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const sockets = (f: Fact) => String(f.specs.sockets ?? "");

const airCriteria = [
  { id: "height", title: "Check the cooler height against your case", body: "Every case lists a maximum CPU cooler height. Tower coolers run from about 150mm to 170mm, and low-profile coolers from under 40mm to about 70mm.\n\nLeave a few millimetres for the side panel." },
  { id: "ram", title: "Watch RAM clearance", body: "Large towers and low-profile coolers can overhang the memory slots. Tall RAM heatsinks may force you to raise a fan or pick a slimmer cooler.\n\nMakers publish RAM clearance figures; check them against your memory's height." },
  { id: "tdp", title: "Size the cooler to the CPU", body: "A 65W chip runs well on a single tower or a good low-profile cooler. Chips rated at 120W to 170W need a dual tower or an AIO to hold their boost clocks without loud fans." },
  { id: "socket", title: "Confirm the mounting kit", body: "Check that the cooler lists your socket: AM5 and AM4 share mounting, while Intel LGA1851 and LGA1700 share hole spacing. Older coolers may need a free or paid adapter." },
  { id: "noise", title: "Bigger fans can spin slower", body: "140mm fans move the same air as 120mm fans at lower speed, so larger coolers are often quieter at the same load.\n\nFan curves in the BIOS matter as much as the cooler." },
  { id: "warranty", title: "Warranty reflects fan life", body: "Coolers have few failure points besides the fans. Longer warranties, such as Noctua's and Arctic's six years, cover the parts most likely to wear." },
];
const airFaq = [
  { id: "air-vs-aio", q: "Is an air cooler as good as an AIO?", a: "A large dual-tower cooler matches many 240mm AIOs and has no pump to fail. AIOs help with very hot CPUs and free up space around the socket." },
  { id: "paste", q: "Do I need to buy thermal paste?", a: "Most coolers include paste, and some ship it pre-applied. Buy a tube only if you plan to remount the cooler." },
  { id: "ram-height", q: "Will a tower cooler block my RAM?", a: "Some do. Check the maker's RAM clearance figure against your memory's height, especially with tall heatsinks or RGB modules." },
  { id: "am5", q: "Do AM4 coolers fit AM5?", a: "Yes, AM5 keeps AM4's mounting, so most AM4 coolers fit. Check the maker's compatibility list to be sure." },
  { id: "orientation", q: "Which way should the fans face?", a: "Point the airflow from the front of the case towards the rear exhaust fan. Most tower coolers mount this way by default." },
  { id: "65w", q: "What cooler does a 65W CPU need?", a: "A single-tower cooler handles it easily; a good low-profile cooler works in small cases." },
];
const airEvaluated = [
  { title: "Fit", description: "We compared listed heights and footprints, since case and RAM clearance decide what fits." },
  { title: "Cooling hardware", description: "We noted heat pipes, fan size and fan count from each listing." },
  { title: "Sockets", description: "We checked that each listing names current AM5 and Intel LGA1851 support." },
  { title: "Support", description: "We recorded warranty length where the listing states it." },
];

/** Tower and low-profile air coolers. */
export const airSchema: CategorySchema = {
  id: "air-cooler",
  plural: "Coolers",
  fields: [
    { key: "pipes", label: "Heat pipes", noun: "heat pipe count", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v}`, strength: (v) => (Number(v) >= 7 ? `${v} heat pipes` : undefined) },
    { key: "fan", label: "Fan size", noun: "fan size", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}mm`, strength: (v) => (Number(v) >= 140 ? `${v}mm fans that can spin slower for the same airflow` : undefined), weakness: (v) => (Number(v) <= 92 ? `${v}mm fan limits how much heat it can move quietly` : undefined) },
    { key: "height", label: "Height", noun: "height", better: "lower", superlative: ["lowest", "tallest"], fmt: (v) => `${v}mm`, strength: (v) => (Number(v) <= 47 ? `Very low ${v}mm height for slim cases` : undefined), weakness: (v) => (Number(v) >= 165 ? `${v}mm height rules out many mid-size cases` : undefined) },
    { key: "warranty", label: "Warranty", noun: "warranty", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v}-year`, strength: (v) => (Number(v) >= 6 ? `${v}-year warranty` : undefined) },
    { key: "fans", label: "Fans included", fmt: (v) => String(v), strength: (v) => (Number(v) >= 2 ? "Two fans included" : undefined) },
    { key: "sockets", label: "Sockets named", fmt: (v) => String(v), strength: (v) => (/AM5/.test(String(v)) && /1851/.test(String(v)) ? "Listed for both AM5 and Intel LGA1851" : undefined) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const h = Number(f.specs.height ?? 0);
    if (h && h <= 70) s.push(`At ${h}mm tall it suits slim and small form factor cases, but a cooler this low sits close to the memory, so check your RAM height against the maker's clearance figure.`);
    else if (h) s.push(`Check that your case lists at least ${h}mm of CPU cooler clearance before ordering.`);
    const so = sockets(f);
    if (so && !/AM5/.test(so)) s.push(`The listing names ${so} only; AM5 uses the same mounting as AM4, but confirm on the maker's compatibility list.`);
    else if (so && !/1851/.test(so)) s.push("The listing names AM5 but not Intel LGA1851, so check the maker's site if you are building on Core Ultra.");
    return s;
  },
  criteria: airCriteria,
  faq: airFaq,
  evaluated: airEvaluated,
};

/** All-in-one liquid coolers. Radiator size is fixed per article. */
export const aioSchema: CategorySchema = {
  id: "aio",
  plural: "AIO coolers",
  fields: [
    { key: "fanRpm", label: "Max fan speed", noun: "maximum fan speed", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} RPM` },
    { key: "pumpRpm", label: "Max pump speed", noun: "pump speed", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} RPM` },
    { key: "fan", label: "Fan size", fmt: (v) => `${v}mm` },
    { key: "lcd", label: "Pump display", fmt: (v) => (v ? String(v) : "No"), strength: (v) => (v ? `${v} pump-head display for temperatures or images` : undefined) },
    { key: "zeroRpm", label: "Zero RPM mode", fmt: (v) => (v ? "Yes" : "Not listed"), strength: (v) => (v ? "Zero RPM mode stops the fans at light load" : undefined) },
    { key: "vrmFan", label: "VRM fan", fmt: (v) => (v ? "Yes" : "No"), strength: (v) => (v ? "Built-in fan that cools the motherboard's power stages" : undefined) },
    { key: "cabling", label: "Cabling", fmt: (v) => String(v), strength: (v) => (v ? `${v}` : undefined) },
    { key: "software", label: "Software", fmt: (v) => String(v), weakness: (v) => (v ? `Lighting and display control need ${v}` : undefined) },
    { key: "tubes", label: "Tube length", fmt: (v) => `${v}mm` },
    { key: "sockets", label: "Sockets named", fmt: (v) => String(v), strength: (v) => (/AM5/.test(String(v)) && /1851/.test(String(v)) ? "Listed for both AM5 and Intel LGA1851" : undefined) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const rad = Number(f.specs.rad ?? 0);
    if (rad) s.push(`Check that your case lists ${rad}mm radiator support at the front or top, and allow for the radiator's thickness plus fans above the motherboard's heatsinks.`);
    const so = sockets(f);
    if (/1851/.test(so)) s.push("Its listing names AM5 and Intel LGA1851 support.");
    else s.push("The listing does not spell out LGA1851 mounting, so confirm it on the maker's site for a Core Ultra build.");
    if (f.specs.software) s.push(`Plan to install ${f.specs.software} for lighting${f.specs.lcd ? " and display" : ""} control; fan and pump speed can also run from the motherboard's headers.`);
    return s;
  },
  criteria: [
    { id: "radiator-fit", title: "Confirm radiator support in your case", body: "Cases list which radiator sizes fit at the front, top and side. A top mount also has to clear the motherboard's heatsinks and tall RAM.\n\nCheck the case's clearance figure for radiator plus fans." },
    { id: "pump-position", title: "Mount the pump below the radiator's top", body: "Air collects at the highest point of the loop. Keep the radiator's top edge above the pump, or tubes-down at the front, to avoid pump noise and wear." },
    { id: "cpu-heat", title: "Match radiator size to the CPU", body: "A 240mm radiator handles most gaming CPUs. 280mm and 360mm units give more headroom for 170W chips and let fans run slower." },
    { id: "cabling", title: "Count the cables and headers", body: "Some AIOs daisy-chain fans or run everything through one hub; others need several fan headers and a USB header. Check what your motherboard has free." },
    { id: "software", title: "Software is optional but useful", body: "LCD screens and lighting usually need the maker's software. Pump and fan speeds can run from motherboard headers instead." },
    { id: "lifespan", title: "AIOs have a finite life", body: "Pumps and coolant age over years of use. Warranty length is a fair guide to how long the maker expects the unit to last." },
  ],
  faq: [
    { id: "vs-air", q: "Is an AIO better than an air cooler?", a: "For CPUs rated at 170W or more, a 280mm or 360mm AIO usually runs cooler or quieter. For 65W to 120W chips, a good dual-tower air cooler is often just as effective." },
    { id: "leak", q: "Do AIO coolers leak?", a: "Leaks are rare with current sealed units, and several makers cover damage under warranty. Check the terms for your model." },
    { id: "orientation", q: "Should the radiator be at the front or top?", a: "Either works. Top-mounted exhausts keep warm air out of the case; front-mounted intake gives the CPU cooler air. Keep the pump below the radiator's top." },
    { id: "headers", q: "Where do I plug in the pump?", a: "Use the motherboard's AIO_PUMP or CPU_FAN header, set to full speed or DC mode as the maker recommends." },
    { id: "maintenance", q: "Does an AIO need maintenance?", a: "Only dusting the radiator. The loop is sealed and is not meant to be refilled." },
    { id: "lcd", q: "Is an LCD pump head worth it?", a: "Only for looks or quick temperature readouts. It does not change cooling performance." },
  ],
  evaluated: [
    { title: "Fit and mounting", description: "We checked radiator size and listed socket support, including AM5 and LGA1851." },
    { title: "Pump and fans", description: "We noted listed pump and fan speeds and fan size." },
    { title: "Setup", description: "We compared cabling, hubs and the software each unit needs." },
    { title: "Extras", description: "We recorded pump displays, VRM fans and zero RPM modes where listed." },
  ],
};

/** Thermal pastes. */
export const pasteSchema: CategorySchema = {
  id: "paste",
  plural: "Pastes",
  fields: [
    { key: "grams", label: "Amount", noun: "tube size", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}g`, strength: (v) => (Number(v) >= 4 ? `${v}g is enough for several applications` : undefined), weakness: (v) => (Number(v) <= 1 ? `${v}g covers only a couple of large CPUs` : undefined) },
    { key: "wmk", label: "Conductivity", fmt: (v) => `${v} W/mK (maker's figure)`, strength: (v) => `Maker-rated ${v} W/mK conductivity` },
    { key: "nonConductive", label: "Electrically non-conductive", fmt: (v) => (v ? "Yes" : "Not listed"), strength: (v) => (v ? "Electrically non-conductive, so spills are harmless" : undefined) },
    { key: "extras", label: "In the box", fmt: (v) => String(v), strength: (v) => (v ? `Includes ${v}` : undefined) },
    { key: "spread", label: "Application", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s = ["Clean off old paste with isopropyl alcohol first, then apply a pea-sized dot or a thin line on the heatspreader; on large Intel chips an X or a line covers the longer die better."];
    if (/cannot be spread|do not spread|no need to spread/i.test(String(f.specs.spread ?? ""))) s.push("Do not pre-spread it; let the cooler's mounting pressure distribute it.");
    return s;
  },
  criteria: [
    { id: "gap", title: "Differences between good pastes are small", body: "Among reputable pastes, temperatures usually differ by a few degrees at most. Mounting pressure and application matter as much as the paste." },
    { id: "durability", title: "Durability matters on hot CPUs", body: "Some pastes pump out or dry over thermal cycles. Pastes built for long-term stability suit high-power CPUs you do not want to remount often." },
    { id: "conductive", title: "Choose non-conductive paste", body: "Non-conductive pastes are safe if a little spills onto nearby parts. Avoid liquid metal unless you know the risks." },
    { id: "amount", title: "Buy the amount you will use", body: "One large CPU uses about 0.2g to 0.5g. A 1g tube covers a couple of builds; 4g or more suits regular remounts or several machines." },
    { id: "viscosity", title: "Thicker pastes are harder to spread", body: "High-performance pastes are often thick. Warming the tube in your hand makes them easier to apply." },
    { id: "gpu", title: "GPU repasting needs more care", body: "Graphics card dies are bare, so non-conductive paste and a thin, even layer matter more. Some pastes are sold specifically for direct-die use." },
  ],
  faq: [
    { id: "how-often", q: "How often should I replace thermal paste?", a: "Only when you remove the cooler or temperatures rise over time. Many pastes last several years on a desktop CPU." },
    { id: "included", q: "Is the paste that comes with my cooler good enough?", a: "Usually yes. Aftermarket paste helps most when remounting or when the included paste has run out." },
    { id: "amount", q: "How much paste should I use?", a: "About a pea-sized dot on most desktop CPUs. Too much mostly spills out; too little leaves gaps." },
    { id: "clean", q: "How do I remove old paste?", a: "Wipe it off with a lint-free cloth and 90% or stronger isopropyl alcohol, then let it dry." },
    { id: "gpu", q: "Can I use CPU paste on a graphics card?", a: "Yes, if it is non-conductive. Apply a thin, even layer on the bare die." },
    { id: "liquid-metal", q: "Should I use liquid metal instead?", a: "Only if you know the risks. It is electrically conductive and damages aluminium, so it is not a drop-in replacement." },
  ],
  evaluated: [
    { title: "Durability", description: "We looked for maker claims on pump-out and long-term stability." },
    { title: "Safety", description: "We checked that each paste is listed as electrically non-conductive." },
    { title: "Value", description: "We compared tube sizes and what comes in the box." },
    { title: "Application", description: "We noted spreaders, wipes and the maker's application guidance." },
  ],
};

const air = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => F(asin, name, short, specs, notes);
export const airFacts = withPool(pool as Pool, [
  air("B09LGY38L4", "Thermalright Peerless Assassin 120 SE", "Peerless Assassin 120 SE", { pipes: 6, fan: 120, fans: 2, sockets: "AM5, AM4, Intel" }, ["a dual-tower heatsink", "a 25.6dB(A) noise rating"]),
  air("B0BNDTJVPL", "Thermalright Phantom Spirit 120 SE", "Phantom Spirit 120 SE", { pipes: 7, fan: 120, fans: 2, height: 154, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a dual-tower heatsink", "a rating of 105W to 280W"]),
  air("B0D5B6MXJF", "Noctua NH-D15 G2", "NH-D15 G2", { pipes: 8, fan: 140, fans: 2, warranty: 6, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["an offset design whose recessed lower fins clear the top PCIe slot", "59mm RAM clearance with one fan fitted", "NT-H2 paste in the box"]),
  air("B0CJY3DYQ3", "be quiet! Dark Rock Pro 5", "Dark Rock Pro 5", { pipes: 7, fans: 2 }, ["a Speed Switch for quiet or performance fan modes", "Silent Wings PWM fans"]),
  air("B09VG6NBSJ", "ARCTIC Freezer 36", "Freezer 36", { pipes: 4, fan: 120, fans: 2, warranty: 6, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a push-pull single tower", "a contact frame for LGA1851 and LGA1700"]),
  air("B08WPDD6GD", "Noctua NH-U12S redux", "NH-U12S redux", { fan: 120, fans: 1, height: 158, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a slim single tower that does not overhang the RAM slots"]),
  air("B075SG1T3X", "Noctua NH-L9a-AM4", "NH-L9a-AM4", { fan: 92, fans: 1, height: 37, warranty: 6, sockets: "AM4" }, ["a compact footprint that clears RAM and PCIe slots on AMD boards"]),
  air("B075SF5QQ8", "Noctua NH-L12S", "NH-L12S", { fan: 120, fans: 1, height: 70, warranty: 6, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["an NF-A12x15 slim fan that can mount above or below the fins"]),
  air("B0BB621NMK", "Thermalright AXP90-X47", "AXP90-X47", { pipes: 4, fan: 92, fans: 1, height: 47, sockets: "AM5, AM4, Intel" }, ["a 22.4dB(A) noise rating"]),
  air("B09TGSCHYV", "Thermalright AXP120-X67", "AXP120-X67", { pipes: 6, fan: 120, fans: 1, height: 67, sockets: "AM5, AM4, Intel" }, ["a 15mm-thick 120mm fan", "a 26.1dB(A) noise rating"]),
  air("B0BFPRYB5Y", "ID-COOLING IS-55", "IS-55", { pipes: 5, fan: 120, fans: 1, height: 57, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a 15mm-thick 120mm fan"]),
  air("B0CKVZ2NZ1", "Noctua NH-L9x65 chromax.black", "NH-L9x65", { fan: 92, fans: 1, height: 65, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a 95x95mm footprint that stays clear of the RAM", "an all-black chromax finish"]),
  air("B09P4KH7QK", "Thermalright Peerless Assassin 120 SE ARGB White", "Peerless Assassin 120 SE White", { pipes: 6, fan: 120, fans: 2, sockets: "AM5, AM4, Intel" }, ["a white heatsink with white ARGB fans", "a 25.6dB(A) noise rating"]),
  air("B0FHPQBMMD", "Thermalright Phantom Spirit 120 Digital EVO", "Phantom Spirit 120 Digital EVO", { pipes: 7, fan: 120, fans: 2, height: 160, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a magnetic ARGB display panel that shows CPU temperature", "TRCC control software"]),
  air("B0FJ86XY93", "Thermalright Phantom Spirit 120 Digital SNOW", "Phantom Spirit 120 Digital SNOW", { pipes: 7, fan: 120, fans: 2, height: 160, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["an all-white finish", "a magnetic ARGB display panel that shows CPU temperature"]),
  air("B0DR8PSFHB", "Thermalright Peerless Assassin 120 Digital ARGB White", "Peerless Assassin 120 Digital White", { pipes: 6, fan: 120, fans: 2, height: 162, sockets: "AM5, AM4, Intel" }, ["a magnetic digital display board", "a 25.6dB(A) noise rating"]),
  air("B0CJY2QS2W", "be quiet! Dark Rock Elite", "Dark Rock Elite", { pipes: 7, fan: 135, fans: 2 }, ["a height-adjustable front fan for tall RAM", "a Speed Switch for quiet or performance modes", "a 25.8dB(A) maximum noise rating"]),
  air("B0GXFKVHC6", "be quiet! Dark Rock Pro 6", "Dark Rock Pro 6", { pipes: 7, fan: 135, fans: 2 }, ["a 300W TDP rating", "an active mode switch for maximum cooling or quiet operation"]),
  air("B07PN4RDW3", "Noctua NH-U12A", "NH-U12A", { pipes: 7, fan: 120, fans: 2, height: 158, warranty: 6 }, ["two NF-A12x25 fans on a single tower", "full RAM and PCIe clearance"]),
  air("B00L7UZMAK", "Noctua NH-D15", "NH-D15", { pipes: 6, fan: 140, fans: 2, warranty: 6 }, ["two NF-A15 140mm fans", "NT-H1 paste in the box"]),
  air("B0D1CGL7D1", "ID-COOLING FROZN A620 PRO SE", "Frozn A620 Pro SE", { pipes: 6, fan: 120, fans: 2, height: 157 }, ["a 260W rating", "40mm clearance for standard RAM"]),
  air("B0DWZF7K1Y", "be quiet! Pure Rock Pro 3 Black", "Pure Rock Pro 3", { pipes: 6, fan: 120, fans: 1 }, ["a 250W TDP rating", "a Pure Wings 3 PWM fan", "six black-coated heat pipes"]),
  air("B0D3NXLZ1T", "be quiet! Dark Rock 5", "Dark Rock 5", { pipes: 6, fan: 120, fans: 1 }, ["an asymmetrical heatsink that clears RAM and VRM heatsinks", "a Silent Wings 4 fan", "a simplified mounting system"]),
]);

const aio = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => F(asin, name, short, specs, notes);
export const aioFacts = withPool(pool as Pool, [
  // 360mm
  aio("B0DLWGG85P", "ARCTIC Liquid Freezer III Pro 360", "Liquid Freezer III Pro 360", { rad: 360, fan: 120, vrmFan: true, cabling: "Fan cables routed inside the tube sleeving", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["P12 PRO fans", "native offset mounting toward the CPU hotspot", "a contact frame for LGA1851 and LGA1700"]),
  aio("B0DF7C4YPQ", "CORSAIR Nautilus 360 RS ARGB", "Nautilus 360 RS", { rad: 360, fan: 120, cabling: "Daisy-chained fans that connect straight to the motherboard", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a pump rated at 20 dBA"]),
  aio("B0D6BFBLTK", "CORSAIR iCUE LINK TITAN 360 RX RGB", "Titan 360 RX", { rad: 360, fan: 120, fanRpm: 2100, zeroRpm: true, cabling: "One-cable iCUE LINK hub for pump and fans", software: "iCUE", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a FlowDrive pump with a three-phase motor", "pre-mounted RX RGB fans"]),
  aio("B0DM4BRSV5", "MSI MAG CORELIQUID A13 360", "Coreliquid A13 360", { rad: 360, pumpRpm: 3800, tubes: 390, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a split-flow radiator with the pump built into it", "ceramic pump bearings"]),
  aio("B0F5SZK3WX", "NZXT Kraken Plus 360", "Kraken Plus 360", { rad: 360, fan: 120, lcd: "1.54-inch", zeroRpm: true, software: "NZXT CAM", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["NZXT's Turbine pump", "a single breakout cable from the pump cap"]),
  aio("B0F8HTLRND", "Thermalright Aqua Elite 360 V6 ARGB", "Aqua Elite 360 V6", { rad: 360, fan: 120, fanRpm: 2000, pumpRpm: 2800, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a round ARGB pump head"]),
  // 280mm
  aio("B0F5SJS2JB", "NZXT Kraken Plus 280", "Kraken Plus 280", { rad: 280, fan: 140, lcd: "1.54-inch", zeroRpm: true, software: "NZXT CAM", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["NZXT's Turbine pump", "a single breakout cable from the pump cap"]),
  aio("B0C6Q25HTR", "CORSAIR iCUE LINK H115i RGB", "H115i RGB", { rad: 280, fan: 140, fanRpm: 2000, zeroRpm: true, cabling: "One-cable iCUE LINK hub for pump and fans", software: "iCUE", sockets: "AM5, AM4, LGA1700" }, ["QX140 RGB fans", "a 20-LED pump cap"]),
  aio("B09W2GLV3D", "ID-COOLING FX280 PRO SE", "FX280 PRO SE", { rad: 280, fan: 140, fanRpm: 1800, pumpRpm: 2900, tubes: 400, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a 27mm aluminium radiator", "a pump rated at 25dB(A)"]),
  aio("B0FG7LGDDL", "LIAN LI Galahad II LCD 280", "Galahad II LCD 280", { rad: 280, fan: 140, pumpRpm: 3600, lcd: "2.88-inch IPS", cabling: "Wireless fan lighting and speed control", software: "L-Connect", sockets: "AM5, AM4, Intel" }, ["an 8th-generation Asetek pump", "2.4GHz wireless TL fans"]),
  aio("B0FNMP513T", "be quiet! Pure Loop 3 280mm", "Pure Loop 3 280", { rad: 280, fan: 140, cabling: "Daisy-chained PWM fans", sockets: "AM5, AM4, Intel" }, ["a PWM pump with a six-pole motor", "Pure Wings 3 fans"]),
  // 240mm
  aio("B0F6M1MR4P", "Thermalright Frozen Notte 240 V2", "Frozen Notte 240", { rad: 240, fan: 120, fanRpm: 2000, pumpRpm: 5300, sockets: "AM5, AM4, Intel" }, ["a pump rated for 40,000 hours", "braided tubing"]),
  aio("B0FRPMHJGX", "CORSAIR Nautilus 240 RS ARGB", "Nautilus 240 RS", { rad: 240, fan: 120, cabling: "Daisy-chained fans that connect straight to the motherboard", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a pump rated at 20 dBA"]),
  aio("B0F5S84X8P", "NZXT Kraken Plus 240 RGB", "Kraken Plus 240", { rad: 240, fan: 120, lcd: "1.54-inch", software: "NZXT CAM", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["NZXT's Turbine pump", "RGB fans"]),
  aio("B0C6PX2BW1", "CORSAIR iCUE LINK H100i RGB", "H100i RGB", { rad: 240, fan: 120, fanRpm: 2400, zeroRpm: true, cabling: "One-cable iCUE LINK hub for pump and fans", software: "iCUE", sockets: "AM5, AM4, LGA1700" }, ["QX120 RGB fans", "a 20-LED pump cap"]),
  aio("B0CCNS5NZ9", "Thermalright Aqua Elite 240 V3", "Aqua Elite 240 V3", { rad: 240, fan: 120, fanRpm: 1500, pumpRpm: 2800, sockets: "AM5, AM4, Intel" }, ["an octagonal ARGB pump head", "a pump rated for 40,000 hours"]),
  aio("B0DM4CBKFY", "MSI MAG CORELIQUID A13 240", "Coreliquid A13 240", { rad: 240, pumpRpm: 3800, tubes: 390, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a split-flow radiator with the pump built into it", "ceramic pump bearings"]),
  aio("B0DLWFCVSD", "ARCTIC Liquid Freezer III Pro 360 A-RGB", "Liquid Freezer III Pro 360 A-RGB", { rad: 360, fan: 120, vrmFan: true, cabling: "Fan cables routed inside the tube sleeving", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["P12 PRO A-RGB fans", "native offset mounting toward the CPU hotspot", "a contact frame for LGA1851 and LGA1700"]),
  aio("B0DPHSLXSS", "ARCTIC Liquid Freezer III Pro 420 A-RGB", "Liquid Freezer III Pro 420", { rad: 420, fan: 140, vrmFan: true, cabling: "Fan cables routed inside the tube sleeving", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["P14 PRO fans", "native offset mounting", "a contact frame for LGA1851 and LGA1700"]),
  aio("B0F5SCG6QC", "NZXT Kraken Plus 360 RGB White", "Kraken Plus 360 RGB White", { rad: 360, fan: 120, lcd: "1.54-inch", software: "NZXT CAM", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a white finish with RGB fans", "NZXT's Turbine pump"]),
  aio("B0D9GWQPDM", "NZXT Kraken Elite 360 RGB White", "Kraken Elite 360", { rad: 360, fan: 120, lcd: "2.72-inch IPS", software: "NZXT CAM", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a 640x640 LCD with a 60Hz refresh rate", "a white finish"]),
  aio("B0FLTZ2SHM", "NZXT Kraken Core 360 RGB", "Kraken Core 360", { rad: 360, fan: 120, software: "NZXT CAM", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a single-cable connection from the pump", "adjustable fan control"]),
  aio("B0DF7G8JFP", "CORSAIR Nautilus 360 RS ARGB White", "Nautilus 360 RS White", { rad: 360, fan: 120, cabling: "Daisy-chained fans that connect straight to the motherboard", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a white finish", "a pump rated at 20 dBA"]),
  aio("B0D6BCSFNC", "CORSAIR iCUE LINK TITAN 360 RX RGB White", "Titan 360 RX White", { rad: 360, fan: 120, fanRpm: 2100, zeroRpm: true, cabling: "One-cable iCUE LINK hub for pump and fans", software: "iCUE", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a white finish", "a FlowDrive pump with a three-phase motor"]),
  aio("B0H421RM64", "CORSAIR iCUE LINK TITAN II 360 RX RGB", "Titan II 360 RX", { rad: 360, fan: 120, cabling: "One-cable iCUE LINK hub for pump and fans", software: "iCUE", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a FlowDrive Gen 2 pump", "RX II fans on a unified frame"]),
  aio("B0H41KS9N4", "CORSAIR iCUE LINK TITAN II 360 RX RGB White", "Titan II 360 RX White", { rad: 360, fan: 120, cabling: "One-cable iCUE LINK hub for pump and fans", software: "iCUE", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a white finish", "a FlowDrive Gen 2 pump"]),
  aio("B0CKMS3J1N", "LIAN LI Galahad II LCD 360 White", "Galahad II LCD 360", { rad: 360, fan: 120, pumpRpm: 3600, lcd: "2.88-inch IPS", software: "L-Connect", sockets: "AM5, AM4, Intel" }, ["SL-INF daisy-chain fans", "a white finish"]),
  aio("B0CDF6GYM1", "LIAN LI Galahad II Trinity 360 White", "Galahad II Trinity 360", { rad: 360, fan: 120, software: "L-Connect", sockets: "AM5, AM4, Intel" }, ["a 27mm radiator", "three interchangeable pump cap designs", "SL-INF fans"]),
  aio("B0FPCVCTS5", "Lian Li HydroShift II LCD-S 360 CL White", "HydroShift II LCD-S 360", { rad: 360, fan: 120, fanRpm: 2200, zeroRpm: true, lcd: "3.4-inch IPS", software: "L-Connect", sockets: "AM5, AM4, Intel" }, ["adjustable tube routing", "a slim 24mm radiator", "a white finish"]),
  aio("B0DPNQS3Q5", "ASUS ROG Ryujin III ARGB Extreme White", "Ryujin III Extreme White", { rad: 360, fan: 120, lcd: "3.5-inch", vrmFan: true, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["an Asetek Gen8 V2 pump", "a fan in the pump housing that cools the VRM area", "a white finish"]),
  aio("B0FM1V3Q3F", "ASUS TUF Gaming LC III ARGB 360", "TUF Gaming LC III 360", { rad: 360, fan: 120, tubes: 400, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["pre-installed integrated fans", "reinforced sleeved tubing"]),
  aio("B0F6W6Z669", "ASUS Prime LC 360 ARGB White Edition", "Prime LC 360 White", { rad: 360, fan: 120, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["an infinity-mirror pump cap", "reinforced sleeved tubing", "a white finish"]),
  aio("B0C4C421RZ", "Cooler Master 360L Core ARGB", "360L Core", { rad: 360, fan: 120, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a Gen S dual-chamber pump", "CryoFuze paste in the box"]),
  aio("B0CZMPHCPG", "ID-COOLING FX360 PRO", "FX360 PRO", { rad: 360, fan: 120, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a 350W rating", "simple fan cable management"]),
  aio("B0FVFJZZV6", "Thermalright Peerless Vision 360 ARGB", "Peerless Vision 360", { rad: 360, fan: 120, lcd: "3.95-inch", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a magnetic screen with a 60Hz refresh rate", "splice-connected fans"]),
  aio("B0BDF5514F", "Thermalright Frozen Notte 360 White ARGB V2", "Frozen Notte 360 White", { rad: 360, fan: 120, pumpRpm: 5300, tubes: 450, sockets: "AM5, AM4, Intel" }, ["a white radiator and fans"]),
  aio("B0F8BKKJJQ", "Thermalright Aqua Elite 360 V6 ARGB White", "Aqua Elite 360 V6 White", { rad: 360, fan: 120, fanRpm: 2000, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a white radiator with a round ARGB pump head", "a fourth-generation pump head", "TL-N12W white fans"]),
  aio("B0DM4SRF7K", "MSI MAG CORELIQUID A13 360 White", "Coreliquid A13 360 White", { rad: 360, tubes: 390, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a split-flow radiator with the pump built into it", "a white finish"]),
  aio("B0DWZJNH28", "be quiet! Silent Loop 3 360mm", "Silent Loop 3 360", { rad: 360, fan: 120, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["three Silent Wings 4 high-speed fans", "a dampened, adjustable pump", "Threadripper cold-plate coverage"]),
  aio("B0BLJGW838", "Thermalright Frozen Notte 240 White ARGB", "Frozen Notte 240 White", { rad: 240, fan: 120, pumpRpm: 5300, sockets: "AM5, AM4, Intel" }, ["a white radiator and fans", "a mirror-finish copper base", "ARGB lighting on the pump and fans"]),
  aio("B0H843VVKM", "CORSAIR Nautilus II 240 RS ARGB White", "Nautilus II 240 RS White", { rad: 240, fan: 120, cabling: "Daisy-chained fans that connect straight to the motherboard", sockets: "AM5, AM4, LGA1851, LGA1700" }, ["RS II fans on a unified frame", "a white finish"]),
]);

const paste = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => F(asin, name, short, specs, notes);
export const pasteFacts = withPool(pool as Pool, [
  paste("B09VDL3CW6", "ARCTIC MX-6 (4g)", "MX-6", { grams: 4, nonConductive: true }, ["lower thermal resistance than ARCTIC's MX-4, by the maker's measure", "a viscosity suited to direct-die GPU use"]),
  paste("B0FT2XSPSN", "ARCTIC MX-7 (4g)", "MX-7", { grams: 4, nonConductive: true, spread: "Cannot be spread by hand; cooler pressure distributes it" }, ["a dense, high-filler formula", "resistance to pump-out, dry-out and bleeding"]),
  paste("B011F7W3LU", "Thermal Grizzly Kryonaut (1g)", "Kryonaut", { grams: 1, extras: "a syringe and spatula" }, ["a maker claim that it does not dry out at 80°C"]),
  paste("B07MZ45X9G", "Noctua NT-H2 (3.5g)", "NT-H2", { grams: 3.5, extras: "three cleaning wipes", spread: "No need to spread before mounting" }, ["a recommended usage time of up to five years on the CPU", "enough for around 3 to 20 applications"]),
  paste("B0DSTWDYD2", "Thermal Grizzly Duronaut (2g)", "Duronaut", { grams: 2, nonConductive: true, extras: "a TG Spatula Pro" }, ["aluminium microparticles and zinc oxide nanoparticles", "a formula built to minimise pump-out"]),
  paste("B0BPKTNPL3", "Thermalright TF7 (2g)", "TF7", { grams: 2, wmk: 12.8, nonConductive: true }, ["a rated range of -150°C to 250°C"]),
  paste("B0BFF1T9PD", "Corsair XTM70 (3g)", "XTM70", { grams: 3, extras: "an applicator kit and three cleaning wipes" }, ["a low-viscosity formula", "a rating for processors up to 250W TDP and beyond"]),
]);
