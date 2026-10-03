import pool from "@/data/pcj-pool/setup.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 28 PC case fact sheets for caseSchema: NZXT, Lian Li, Corsair, Fractal, be quiet!, Montech, Antec, HYTE and
 * compact micro-ATX cases. Clearance, radiator and fan figures come from the listing bullets and titles and are
 * reviewed by hand; fields stay undefined when the listing does not state them. Colour duplicates, open test benches,
 * cases without a stated form factor and accessories are skipped.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const expand28CaseFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  // NZXT
  F("B0D2MJT1FY", "NZXT H5 Flow RGB", "NZXT H5 Flow RGB", { boards: "ATX", rad: 360 }, ["a compact ATX mid-tower", "a 360mm radiator in front and a 240mm radiator on top"]),
  F("B0CV4R1TWS", "NZXT H7 Flow", "NZXT H7 Flow", { boards: "ATX", rad: 420 }, ["420mm radiators in the front and 360mm on top"]),
  F("B0DQPR34HG", "NZXT H9 Flow RGB+ (White)", "NZXT H9 Flow RGB+", { boards: "ATX", rad: 420 }, ["a dual-chamber layout", "a 420mm radiator on the top and front"]),
  // Lian Li
  F("B0BN3SY5XW", "Lian Li Lancool 216 RGB", "Lancool 216 RGB", { boards: "ATX", gpu: 392, fans: 3, rad: 360 }, ["two 160mm ARGB front fans and a 140mm rear fan", "room for graphics cards up to 180mm tall"]),
  F("B0DHXWYK4J", "Lian Li Lancool 207", "Lancool 207", { boards: "ATX", gpu: 410, fans: 4, rad: 360 }, ["four pre-installed fans", "a compact ATX body"]),
  F("B0F8HLTV22", "Lian Li O11D Mini V2", "O11D Mini V2", { boards: "ATX" }, ["a compact ATX dual-chamber design sold without fans"]),
  F("B0DJPV8XG3", "Lian Li O11 Vision Compact", "O11 Vision Compact", { boards: "ATX" }, ["a back-connect motherboard layout", "a compact ATX body"]),
  F("B0DKSWRH91", "Lian Li A3-mATX", "Lian Li A3-mATX", { boards: "mATX", gpu: 415, rad: 360, volume: 26.3 }, ["four expansion slots", "room for up to ten 120mm fans"]),
  F("B0GX5HP57Y", "Lian Li B4-mATX", "Lian Li B4-mATX", { boards: "mATX", gpu: 358, rad: 360, volume: 21.3, fans: 2 }, ["two slim fans", "a 21.3L body"]),
  // Corsair
  F("B0DFHNV7TK", "Corsair 4000D RS ARGB Frame", "Corsair 4000D RS ARGB", { boards: "ATX", fans: 3 }, ["a modular frame with InfiniRail mounting", "three pre-installed RS fans"]),
  F("B0FJ2ZBK8J", "Corsair 3500X RS ARGB", "Corsair 3500X RS ARGB", { boards: "ATX", glass: "Panoramic tempered glass" }, ["room for up to ten 120mm fans"]),
  F("B0CZVN6KY5", "Corsair 3500X", "Corsair 3500X", { boards: "ATX", rad: 360, glass: "Panoramic tempered glass" }, ["a reverse-connection motherboard layout", "no fans included"]),
  F("B0F3XNXCMV", "Corsair 5000D RS Frame", "Corsair 5000D RS Frame", { boards: "ATX", rad: 420 }, ["a top-mounted 420mm radiator", "room for up to fourteen 120mm fans"]),
  // Fractal and be quiet!
  F("B0CS3T22P8", "Fractal Design Meshify 3", "Meshify 3", { boards: "ATX, up to E-ATX (277mm)", gpu: 349, rad: 360 }, ["a 280mm top radiator and 360mm front radiator", "a high-airflow mesh front"]),
  F("B0FV32RM81", "Fractal Design Pop 2 Vision", "Pop 2 Vision", { boards: "ATX", gpu: 412, fans: 4, rad: 360, glass: "Panoramic glass" }, ["a dual-chamber layout", "four reverse fans included"]),
  F("B099X5XB29", "Fractal Design Torrent RGB", "Fractal Torrent RGB", { boards: "E-ATX" }, ["a high-airflow mid tower with a tempered glass window"]),
  F("B0DGXQL5T9", "be quiet! Pure Base 501", "Pure Base 501", { boards: "ATX", rad: 360 }, ["a 360mm front radiator", "a quiet-focused ATX midi tower"]),
  F("B0DYL7LXMV", "be quiet! Pure Base 501 DX (White)", "Pure Base 501 DX", { boards: "ATX", rad: 360 }, ["ARGB lighting", "a 360mm front radiator"]),
  F("B0C597FL85", "be quiet! Shadow Base 800 FX", "Shadow Base 800 FX", { boards: "ATX" }, ["ARGB lighting on an ATX midi tower"]),
  // Montech, Antec, HYTE and others
  F("B0CB26ZFKV", "Montech Air 903 Max", "Montech Air 903 Max", { boards: "E-ATX", gpu: 400, fans: 4, rad: 360 }, ["four fans included", "radiators up to 360mm at the front and top"]),
  F("B0FWVGN77V", "Montech King 45 Pro", "Montech King 45 Pro", { boards: "ATX", fans: 4, rad: 360, glass: "Panoramic glass" }, ["four ARGB PWM fans", "a top radiator up to 84mm thick"]),
  F("B0F9B5QG9M", "Montech X5", "Montech X5", { boards: "ATX", gpu: 410, fans: 4, rad: 360 }, ["four ARGB fans", "a high-airflow mesh front"]),
  F("B0CWSV3JQR", "Antec C5 ARGB", "Antec C5 ARGB", { boards: "ATX", fans: 7 }, ["seven ARGB PWM fans"]),
  F("B0HBB5N59S", "HYTE Y50 RGB Essential", "HYTE Y50", { boards: "ATX", fans: 4 }, ["a dual-chamber layout", "a 360mm reverse fan array"]),
  F("B0BVJ4ZFPZ", "HYTE Y60", "HYTE Y60", { boards: "ATX", glass: "Panoramic tempered glass" }, ["a dual-chamber layout", "a PCIe 4.0 riser cable"]),
  F("B0DQT995ST", "ARCTIC Xtender VG", "ARCTIC Xtender VG", { rad: 420, glass: "Tempered panorama glass" }, ["support for two 420mm radiators", "a vertical GPU mount"]),
  F("B0G3H9CB4Y", "MUSETEX Vertical GPU Case", "MUSETEX vertical GPU", { boards: "ATX", gpu: 410, fans: 5, rad: 360 }, ["a vertical GPU mounting design", "five PWM ARGB fans"]),
  F("B0DJBCG3RS", "SSUPD Xhuttle", "SSUPD Xhuttle", { boards: "ATX", gpu: 370, psuLen: 190, rad: 360 }, ["a dual-chamber design with vertical GPU airflow", "room for up to ten 120mm fans"]),
]);
