import pool from "@/data/pcj-pool/cases.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { caseFacts } from "./cases";
import { withPool } from "./helpers";

/**
 * Batch 12 case fact sheets: white and ARGB variants plus Cooler Master models, reviewed by hand
 * from the Amazon listing bullets. Fields a listing does not state are left undefined.
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const caseExtFacts: Record<string, Fact> = {
  ...caseFacts,
  ...withPool(pool as Pool, [
    // Cooler Master
    F("B0G2TCY2JD", "Cooler Master QUBE 540", "QUBE 540", { gpu: 415, fans: 1, boards: "ITX, ATX, E-ATX up to 11 inches", glass: "Tempered glass side" }, ["horizontal or vertical orientation with a reversible I/O panel", "a full mesh front panel", "movable carry handles"]),
    F("B0GXBFF58Z", "Cooler Master QUBE 340", "QUBE 340", { gpu: 366, cooler: 178, rad: 240, psuLen: 200, boards: "Micro-ATX", glass: "Tempered glass side" }, ["room for six 120mm or 140mm fans", "magnetic dust filters and carry handles", "a movable I/O panel"]),
    F("B0H1P9L7QT", "Cooler Master HAF II 500", "HAF II 500", { fans: 3, boards: "ATX" }, ["two 220mm front intake fans and a 180mm rear exhaust", "a GPU holder that supports two cards up to 3.6 slots thick", "split-level cable management"]),
    F("B0CT7SDL8V", "Cooler Master NR200P V2 White", "NR200P V2 White", { gpu: 357, rad: 280, volume: 18.25, boards: "Mini-ITX", psu: "SFX only" }, ["a white finish", "a vertical GPU mount with a PCIe 4.0 riser in the box", "tool-free quick-release panels"]),
    // White cases
    F("B0DWF8HY4T", "Lian Li LANCOOL 217 White", "Lancool 217 White", { fans: 5, boards: "ATX" }, ["a white chassis with real wood accents", "two 170mm front fans that can be raised to aim at the CPU", "a 140mm rear fan and two reversed-blade 120mm fans"]),
    F("B0DHXW28RX", "Lian Li LANCOOL 207 White", "Lancool 207 White", { gpu: 410, rad: 360, fans: 4, boards: "ATX" }, ["a white finish", "two 140mm ARGB front fans with infinity mirrors", "an ATX layout in a compact frame with a recessed motherboard tray"]),
    F("B09Y9FSZFX", "Fractal Design North Chalk White", "North Chalk White", { gpu: 355, fans: 2, usbc: true, boards: "ATX, mATX, ITX" }, ["a chalk-white body with an oak front", "mesh side panels", "seven expansion slots"]),
    F("B0C89G9QDK", "NZXT H6 Flow White", "H6 Flow White", { fans: 3, glass: "Wraparound glass panels" }, ["a white dual-chamber layout", "three angled 120mm fans", "perforated top and side panels"]),
    F("B0DQPRVD4C", "NZXT H9 Flow White", "H9 Flow White", { rad: 420, fans: 4, glass: "Wraparound tempered glass" }, ["a white dual-chamber layout", "room for up to ten fans"]),
    F("B0C2JLCV5R", "Corsair 3000D Airflow White", "3000D Airflow White", { gpu: 360, rad: 360, fans: 2 }, ["a white finish", "two fan mounts on the PSU shroud aimed at the GPU", "four-slot GPU support"]),
    // ARGB cases
    F("B0FJ2Y9GK1", "Corsair 3500X RS ARGB White", "3500X RS ARGB", { fans: 3, boards: "Mini-ITX to E-ATX", glass: "Wraparound glass" }, ["three RS120-R ARGB fans on a +5V ARGB header", "mounts for up to ten 120mm fans", "a white finish"]),
    F("B0DFJ9PKK4", "Corsair 4000D RS ARGB FRAME", "4000D RS ARGB", { fans: 3 }, ["three RS ARGB PWM fans with Zero RPM mode", "the FRAME modular panel system", "support for back-connect boards from ASUS, MSI and Gigabyte"]),
    F("B0D5PQTCS9", "Montech XR White", "XR White", { gpu: 420, cooler: 175, psuLen: 230, fans: 3, glass: "Panoramic front and side glass" }, ["two reverse-blade ARGB side fans", "a white chassis with a wood-grain I/O accent"]),
    F("B0CN95B1MS", "Montech King 95 PRO White", "King 95 PRO White", { fans: 6, glass: "Curved 4mm glass front and side" }, ["six ARGB fans with a 10-port controller", "a white dual-chamber layout", "quick-release glass panels"]),
    F("B0FV32421Q", "Fractal Design Pop 2 Vision White RGB", "Pop 2 Vision RGB", { gpu: 412, rad: 360, fans: 4, glass: "Panoramic glass side and front" }, ["four RGB reverse-blade fans", "a white dual-chamber layout", "support for back-connect motherboards"]),
    F("B0D3KTT6KJ", "GAMDIAS AURA GC1 ELITE ARGB", "AURA GC1 ELITE", { gpu: 340, cooler: 160, rad: 360, fans: 4, glass: "Tempered glass side" }, ["four 120mm ARGB fans behind a mesh front", "a tool-free glass side panel"]),
    F("B0D73S23NB", "be quiet! Light Base 600 DX White", "Light Base 600 DX White", { glass: "Windowed front and side" }, ["a large ARGB LED strip synced to the motherboard", "an invertible layout with removable feet", "a white finish"]),
  ]),
};
