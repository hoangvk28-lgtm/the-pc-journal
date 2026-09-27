import pool from "@/data/pcj-pool/cases.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

type Pool = Record<string, { img?: string; price?: string }>;
const C = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const num = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : undefined);

/** PC cases, from Mini-ITX to full tower. Only figures stated in each listing are recorded. */
export const caseSchema: CategorySchema = {
  id: "case",
  plural: "Cases",
  fields: [
    { key: "gpu", label: "Max GPU length", noun: "GPU clearance", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v}mm`, strength: (v) => (Number(v) >= 400 ? `Room for graphics cards up to ${v}mm long` : undefined), weakness: (v) => (Number(v) <= 330 ? `A ${v}mm GPU limit rules out many triple-fan cards` : undefined) },
    { key: "cooler", label: "Max CPU cooler height", noun: "CPU cooler clearance", better: "higher", superlative: ["tallest", "shortest"], fmt: (v) => `${v}mm`, strength: (v) => (Number(v) >= 165 ? `Takes tower air coolers up to ${v}mm tall` : undefined), weakness: (v) => (Number(v) < 120 ? `A ${v}mm cooler limit means a low-profile cooler or an AIO` : undefined) },
    { key: "rad", label: "Largest radiator", noun: "largest radiator size", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}mm`, strength: (v) => (Number(v) >= 360 ? `Fits a ${v}mm radiator` : undefined), weakness: (v) => (Number(v) <= 240 ? `Radiators top out at ${v}mm` : undefined) },
    { key: "psuLen", label: "Max PSU length", noun: "PSU length limit", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v}mm`, weakness: (v) => (Number(v) <= 160 ? `Power supplies are limited to ${v}mm long` : undefined) },
    { key: "volume", label: "Volume", noun: "volume", better: "lower", superlative: ["smallest", "largest"], fmt: (v) => `${v}L`, strength: (v) => (Number(v) <= 21.5 ? `A compact ${v}L footprint` : undefined) },
    { key: "fans", label: "Fans included", fmt: (v) => String(v), strength: (v) => (Number(v) >= 3 ? `${v} fans included` : undefined), weakness: (v) => (Number(v) <= 1 ? `Only ${v} fan in the box` : undefined) },
    { key: "boards", label: "Motherboards", fmt: (v) => String(v) },
    { key: "psu", label: "PSU type", fmt: (v) => String(v), weakness: (v) => (/SFX/.test(String(v)) && !/ATX/.test(String(v)) ? "Needs an SFX power supply" : undefined) },
    { key: "glass", label: "Glass", fmt: (v) => String(v), strength: (v) => String(v) },
    { key: "usbc", label: "Front USB-C", fmt: (v) => (v ? "Yes" : "Not listed"), strength: (v) => (v ? "A front USB-C port" : undefined) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const n = f.short;
    const gpu = num(f, "gpu"), cool = num(f, "cooler"), rad = num(f, "rad"), psu = num(f, "psuLen");
    if (gpu) s.push(`GPU limit in the ${n}: ${gpu}mm, before front fans.`);
    else s.push(`Confirm GPU length for the ${n} with its maker.`);
    if (cool) s.push(`Coolers: ${cool}mm maximum.`);
    if (rad) s.push(`The ${n} takes ${rad}mm radiators; mind RAM height.`);
    const p = String(f.specs.psu ?? "");
    if (/SFX/.test(p) && !/ATX/.test(p)) s.push(`SFX power only in the ${n}.`);
    else if (psu) s.push(`${psu}mm is the ${n}'s PSU length cap.`);
    const b = String(f.specs.boards ?? "");
    if (b && !/(^|[^-a-zA-Z])ATX/.test(b)) s.push(`Boards: ${b}.`);
    return s;
  },
  criteria: [
    { id: "gpu-fit", title: "Check GPU length and thickness", body: "Large graphics cards run past 330mm and take three or four slots. Compare your card with the case's GPU length figure, and note that front fans or a front radiator often cut it.\n\nVertical mounts need a riser cable and more width." },
    { id: "cooler-fit", title: "Match cooler height to the case", body: "Every case offers a maximum CPU air cooler height. Tall dual-tower coolers need about 160mm to 170mm; small cases may take only a low-profile cooler or an AIO." },
    { id: "radiator", title: "Plan radiator positions early", body: "A case may list a 360mm radiator only at the front or only on top. Top mounts must clear the motherboard heatsinks and tall RAM, and front mounts can shorten the GPU limit." },
    { id: "airflow", title: "Mesh fronts and included fans", body: "Mesh or perforated front panels breathe more easily than solid or glass fronts. Included fans save money; a case with none needs at least two or three before it is ready to use." },
    { id: "psu-form", title: "Confirm the power supply format", body: "Most mid-towers take ATX power supplies, often with a length limit. Small cases may need SFX or SFX-L units, which cost more at the same wattage." },
    { id: "motherboard", title: "Check motherboard size and connector layout", body: "Mini-ITX, Micro-ATX and ATX boards need matching cases. Back-connect boards, which put their connectors on the rear, need a case with cutouts for them." },
  ],
  faq: [
    { id: "mid-vs-full", q: "Do I need a full tower?", a: "Only for very large radiators, E-ATX boards, custom loops or many drives. A good mid-tower fits most gaming builds, including large graphics cards." },
    { id: "glass-heat", q: "Does a glass front make a PC run hotter?", a: "It can, when air has to enter through narrow gaps. Glass-front cases that take air from the side or bottom avoid most of that penalty." },
    { id: "fans-needed", q: "How many case fans do I need?", a: "Two intakes and one exhaust suit most builds. Add more for a hot graphics card or when a radiator sits in an intake position." },
    { id: "itx-hard", q: "Is a Mini-ITX build harder?", a: "It takes more planning: check GPU length, cooler height and power supply format first, and expect tighter cable routing." },
    { id: "back-connect", q: "What is a back-connect case?", a: "One with cutouts for motherboards that put their power and data connectors on the rear. It hides cables but needs a compatible board." },
    { id: "usb-c", q: "Will the front USB-C port work with any motherboard?", a: "It needs a USB-C front-panel header on the motherboard. Most current mid-range boards have one; older or budget boards may not." },
  ],
  evaluated: [
    { title: "Hardware fit", description: "We compared listed GPU length, CPU cooler height and power supply limits." },
    { title: "Cooling layout", description: "We checked radiator sizes and positions, fan mounts and how many fans come in the box." },
    { title: "Size", description: "We noted motherboard support and, where the maker states it, the case volume." },
    { title: "Build features", description: "We recorded front USB-C, glass panels and layout features such as dual chambers." },
  ],
};

export const caseFacts = withPool(pool as Pool, [
  // Mid-towers
  C("B0DWF95QP7", "Lian Li LANCOOL 217", "Lancool 217", { fans: 5, psuLen: 220, boards: "ATX" }, ["two 170mm front fans that can be raised to aim at the CPU", "two 120mm reversed-blade fans and a 140mm rear fan", "two PSU mounting positions", "walnut wood front accents"]),
  C("B09V878FXQ", "Fractal Design North (Mesh)", "North", { gpu: 355, rad: 360, fans: 2, boards: "ATX, mATX, ITX" }, ["a walnut wood front", "mesh side panels", "seven expansion slots", "GPU room of 300mm with a 360mm front radiator"]),
  C("B0BRP58KHT", "Lian Li LANCOOL 216", "Lancool 216", { gpu: 392, rad: 360, fans: 3, boards: "ATX" }, ["two 160mm front fans", "360mm radiator mounts on top and bottom", "a removable top radiator bracket", "mounts for up to ten 120mm fans"]),
  C("B0DPJ9FD5N", "CORSAIR 4000D RS Frame", "4000D RS", { fans: 3 }, ["an InfiniRail front mount for fans up to 200mm", "a modular FRAME design with a swappable front I/O panel", "side fan mounting when the rail is removed"]),
  C("B0DGXR6TTD", "be quiet! Pure Base 501 Airflow", "Pure Base 501", { rad: 360 }, ["a Pure Wings 3 140mm PWM fan", "PCIe slots that rotate 90 degrees for a vertical GPU", "room for a 240mm radiator on top as well as 360mm at the front"]),
  C("B0DQPPKNSS", "NZXT H9 Flow (2025)", "H9 Flow", { rad: 420, fans: 4, glass: "Wraparound tempered glass" }, ["a dual-chamber layout that moves the PSU and drives behind the motherboard", "three angled F140Q fans on the front-right", "perforated steel panels"]),
  C("B0C89FCDFP", "NZXT H6 Flow", "H6 Flow", { fans: 3, glass: "Wraparound glass front and side" }, ["three angled 120mm intake fans", "a compact dual-chamber layout", "airflow-patterned top and side panels"]),
  C("B0CZV22HDF", "CORSAIR 3500X", "3500X", { rad: 360, boards: "Mini-ITX to E-ATX", glass: "Wraparound front and side glass" }, ["mounts for up to ten 120mm fans", "360mm radiators in the roof and side", "reverse-connection motherboard support", "easily removable glass panels"]),
  C("B0CN95G1YL", "MONTECH King 95 PRO", "King 95 PRO", { gpu: 420, cooler: 175, rad: 360, psuLen: 185, fans: 6, glass: "Curved 4mm glass front and side" }, ["a 10-port fan controller", "quick-release glass panels", "a dual-chamber layout"]),
  C("B0D73VS65B", "be quiet! Light Base 600 DX", "Light Base 600 DX", { gpu: 400, cooler: 170, rad: 360, boards: "ATX", glass: "Full glass front and side" }, ["dual 360mm plus 240mm radiator support", "a GPU anti-sag bracket"]),
  C("B0FWWB2MPK", "MONTECH King 45", "King 45", { rad: 360, boards: "ATX", glass: "Curved panoramic glass" }, ["a dual-chamber layout", "top 360mm radiators up to 84mm thick"]),
  C("B0BQP93GYX", "HYTE Y40", "Y40", { rad: 280, fans: 2, glass: "Panoramic tempered glass" }, ["a vertical GPU layout with a riser cable included", "a side 280mm radiator mount with up to 120mm combined thickness"]),
  // Budget
  C("B0D2MK6NML", "NZXT H5 Flow (2024)", "H5 Flow", { rad: 360, fans: 2 }, ["a perforated PSU shroud that feeds air to the GPU", "a 240mm radiator option on top", "built-in cable routing channels"]),
  C("B0D5PHHCK5", "MONTECH XR", "XR", { gpu: 420, cooler: 175, rad: 360, psuLen: 230, fans: 3, usbc: true, glass: "Panoramic front and side glass" }, ["two side-mounted reverse-blade ARGB fans", "mounting for up to nine fans"]),
  C("B0GBY1GSDX", "CORSAIR 3200D RS", "3200D RS", { rad: 360, fans: 3, usbc: true }, ["a built-in GPU anti-sag arm", "room for nine 120mm fans"]),
  C("B086YDDV6F", "Phanteks XT Pro Silent", "XT Pro Silent", { rad: 360, fans: 3 }, ["sound-dampening foam on the closed panels", "seven 120mm fan positions", "an unrestricted top 360mm radiator position"]),
  C("B0DMPFLHJZ", "ASUS A31", "A31", { rad: 360, glass: "Dual-sided tempered glass" }, ["BTF hidden-connector motherboard support", "up to 80mm of AIO clearance", "an 8-degree angled base"]),
  C("B0GWK8BPG3", "Cooler Master Q300L V3", "Q300L V3", { gpu: 366, cooler: 178, rad: 240, psuLen: 200, boards: "Micro-ATX", glass: "Tempered glass side" }, ["mounts for six 120mm or 140mm fans", "a movable front I/O panel"]),
  // Micro-ATX
  C("B0DFS88R2L", "Lian Li A3-mATX (Wood)", "A3-mATX", { gpu: 415, rad: 360, volume: 26.3, boards: "mATX, ITX", psu: "ATX, SFX or SFX-L" }, ["front or side PSU mounting", "mounts for up to ten 120mm fans", "a wood front with steel mesh panels", "four expansion slots"]),
  C("B0BQJ9TSP3", "JONSBO D31 MESH", "D31 Mesh", { cooler: 168, psuLen: 220, boards: "mATX, ITX", psu: "ATX or SFX" }, ["GPU room of 330mm to 400mm depending on layout", "a mesh front", "outer dimensions of 205 x 363 x 452mm"]),
  C("B0B99HTD3B", "ASUS Prime AP201", "Prime AP201", { gpu: 338, rad: 360, psuLen: 180, volume: 33, boards: "Micro-ATX" }, ["mesh panels with over 57,000 1.5mm holes", "a 32mm cable gap behind the tray", "mounts for up to six fans"]),
  C("B0GX5DM6KB", "Lian Li B4-mATX (Mesh)", "B4-mATX", { gpu: 358, rad: 360, psuLen: 140, volume: 21.3, fans: 2, boards: "mATX", psu: "SFX, or ATX up to 140mm" }, ["two slim 120mm fans", "a 360mm AIO when paired with an SFX PSU"]),
  C("B0GSWBHYJS", "JONSBO D33", "D33", { gpu: 435, cooler: 172, rad: 360, usbc: true, boards: "Micro-ATX, Mini-ITX, mATX BTF", psu: "ATX or SFX" }, ["nine fan positions", "a magnetic front grille", "two 3.5-inch and two 2.5-inch drive bays"]),
  C("B0GWDTKZ9V", "CORSAIR 2800X RS-R", "2800X RS-R", { gpu: 410, fans: 3, boards: "Micro-ATX", glass: "Glass side and front" }, ["three reverse-rotor RS120-R intake fans in the side panel", "PWM and ARGB fan headers"]),
  // Mini-ITX
  C("B0CT7MDNHH", "Cooler Master NR200P V2", "NR200P V2", { gpu: 357, rad: 280, volume: 18.25, usbc: true, boards: "Mini-ITX", psu: "SFX only" }, ["a choice of tempered glass or vented steel side panel", "bottom-to-top airflow from a 120mm bottom fan"]),
  C("B0FFBC7QMP", "SSUPD Meshroom S V2", "Meshroom S V2", { cooler: 74, rad: 280, psuLen: 170, volume: 15, usbc: true, boards: "Mini-ITX; mATX and ATX with a longer riser", psu: "SFX, SFX-L or ATX" }, ["a PCIe 5.0 riser cable in the box", "GPUs up to 353mm with optional 30mm to 50mm feet", "4-slot GPU support", "a 20Gbps front USB-C port"]),
  C("B09DKPXSFJ", "Fractal Design Terra", "Terra", { gpu: 322, usbc: true, boards: "Mini-ITX" }, ["an 8mm-thick aluminium front", "30mm of stepless adjustment between CPU and GPU space", "a walnut wood front panel"]),
  C("B0F69PMFL1", "Thermaltake Tower 250", "Tower 250", { rad: 360, fans: 2, boards: "Mini-ITX", psu: "SFX or ATX" }, ["GPUs up to 360mm with the power cover removed", "a preinstalled SFX bracket", "mounts for eight 120mm or five 140mm fans"]),
  C("B0DCW41WGB", "JONSBO TK-0", "TK-0", { gpu: 230, cooler: 137, psuLen: 160, boards: "Mini-ITX", psu: "SFX", glass: "270-degree curved glass" }, ["a 16mm wood veneer", "one 3.5-inch and one 2.5-inch drive bay", "outer dimensions of 235 x 250 x 280mm"]),
  C("B0BN696NKQ", "Fractal Design Mood", "Mood", { gpu: 325, cooler: 114, rad: 280, fans: 1, boards: "Mini-ITX" }, ["a 180mm top fan", "a PCIe 4.0 riser in the box", "a fabric-wrapped exterior"]),
  // Full towers
  C("B0CJCK95ZC", "Fractal Design North XL", "North XL", { gpu: 413, rad: 420, fans: 3, boards: "E-ATX, ATX, mATX, ITX" }, ["three 140mm Aspect PWM fans", "a 360mm top radiator alongside a 420mm front one", "GPU room of 380mm with a 420mm front radiator"]),
  C("B094442NL5", "CORSAIR 7000D Airflow", "7000D Airflow", { rad: 420, fans: 3 }, ["room for three 360mm radiators at once", "a hinged front door", "30mm of cable space behind the motherboard", "a PWM fan repeater"]),
  C("B0DDNS2SY3", "Antec Flux Pro", "Flux Pro", { rad: 420, fans: 6, boards: "E-ATX" }, ["a 420mm and a 360mm radiator at the same time", "two reverse fans on the PSU shroud", "a CPU and GPU temperature display", "a PSU mount rotated 90 degrees"]),
  C("B086YS7CZK", "Phanteks NV9 MKII", "NV9 MKII", { rad: 420 }, ["support for 420mm and 280mm radiators at once", "65mm of bottom intake clearance", "rear-connect motherboard support", "a GPU support bracket"]),
  C("B0D9KG1GD9", "CORSAIR 9000D RGB Airflow", "9000D", { rad: 480 }, ["mounts for up to 18 120mm fans", "360mm side and 240mm rear radiator mounts", "an aluminium InfiniRail fan mount"]),
  C("B09BQLD8ZK", "Fractal Design Torrent (Solid)", "Torrent", { fans: 5, boards: "Up to SSI-EEB and SSI-CEB" }, ["two 180mm and three 140mm fans", "fan positions that can be rearranged", "a solid side panel"]),
  // Cube and compact dual-chamber
  C("B0D6WHM5NK", "CORSAIR 2500X", "2500X", { rad: 360, boards: "mATX", glass: "Wraparound front and side glass" }, ["a dual-chamber layout", "room for nine 120mm fans", "360mm radiators in the roof and bottom plus 240mm on the side"]),
  C("B0CKVZRKRH", "JONSBO TK-1", "TK-1", { gpu: 280, cooler: 165, rad: 240, psuLen: 220, usbc: true, boards: "mATX, Mini-ITX", glass: "Double-curved 4mm glass" }, ["an aluminium alloy shell", "a separated-chamber layout", "outer dimensions of 299 x 310 x 345mm"]),
  C("B0FWV595Q4", "MONTECH King 15 PRO", "King 15 PRO", { rad: 360, fans: 4, boards: "Micro-ATX", glass: "15-degree curved glass" }, ["top 360mm radiators up to 84mm thick", "a bottom-to-top airflow path"]),
  C("B0GLP7LRHM", "Lian Li O11 Vision-M", "O11 Vision-M", { gpu: 410, cooler: 162, rad: 360, psuLen: 182, fans: 1, boards: "mATX, Mini-ITX (no ATX or back-connect)" }, ["a pre-installed 140mm PWM fan in the second chamber", "a dual-chamber layout"]),
  C("B0CWQK3LMB", "JONSBO Z20", "Z20", { gpu: 363, cooler: 163, rad: 240, volume: 20, usbc: true, boards: "Micro-ATX", psu: "ATX, SFX or SFX-L" }, ["a detachable carrying handle", "2mm bent steel panels", "a 240mm top AIO up to 60mm thick"]),
]);
