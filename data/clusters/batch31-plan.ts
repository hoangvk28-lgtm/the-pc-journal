import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 31 keyword plan (techbuyersguru "best" list, fans, coolers and peripherals). The PC build guides of this batch live in
 * builds31-plan.ts. Only keywords with no equivalent guide in the registry are planned here; see docs/batch31-held-keywords.md.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const t = (f: Fact) => `${f.name} ${f.short} ${f.notes.join(" ")} ${Object.values(f.specs).join(" ")}`;
const size = (f: Fact) => (/140\s?mm|\b140\b/i.test(f.name) ? 140 : /120\s?mm|\b120\b|P12|F120|NF-A12|NF-P12|NF-S12|NF-F12/i.test(f.name) ? 120 : 0);

export const PLAN: PlanItem[] = [
  { slug: "best-radiator-fans", kw: "radiator fans", g: "fanrad", where: (f) => n(f, "pressure") >= 2 || /radiator/i.test(t(f)), sort: "-pressure",
    lead: "A radiator pushes back harder than an open case, so a radiator fan is judged on static pressure, the force that moves air through dense fins, more than on raw airflow. Every pick here lists a pressure rating of at least 2 mmH2O or is described by its maker as built for radiators.",
    close: "Check the radiator's fan size and thickness first: most take 25mm-thick 120mm or 140mm fans, and a thicker 30mm fan can clash with the case or the memory." },
  { slug: "best-120mm-case-fans", kw: "120mm case fans", g: "fan", where: (f) => size(f) === 120 && n(f, "cfm") > 0, sort: "-cfm",
    lead: "The 120mm fan is the default size for case intake and exhaust, so the useful comparison is rated airflow against noise and how many fans you get in the box. Every pick here is a 120mm fan that lists a CFM rating, ordered from the highest rating down.",
    close: "A rating is the maker's own figure at full speed, so choose two or three fans that suit your case's mount positions and let the motherboard's fan curve keep them below full speed." },
  { slug: "best-140mm-case-fans", kw: "140mm case fans", g: "fan140", where: (f) => size(f) === 140, sort: "-pack",
    lead: "A 140mm fan covers more area than a 120mm at the same speed, so it can move similar air more quietly, but it needs a case with 140mm mounts. Every pick here is a 140mm fan, ordered by the number of fans in the box.",
    close: "Look for 140mm mount holes in the front and top of the case before ordering; many cases take 140mm fans only in some positions." },
  { slug: "best-keyboard-and-mouse-for-office-and-gaming", kw: "keyboard and mouse for office and gaming", g: "combo", seo: "Best Keyboard and Mouse, Office and Gaming", where: (f) => n(f, "dpi") >= 3200 && /2\.4|bluetooth|wireless|receiver|bolt/i.test(s(f, "connection")), sort: "-kbBattery",
    lead: "A keyboard and mouse that has to serve both a work day and an evening of games needs a sensor with room above the office default and a battery that outlasts both. Every pair here is wireless and lists a mouse sensitivity of at least 3,200 DPI.",
    close: "Check the keyboard's layout against your desk space and whether the receiver or Bluetooth pairing suits your PC before buying; a full-size keyboard with a number pad takes the most room." },
  { slug: "best-cpu-cooler-fans", kw: "cpu cooler fans", g: "fan", where: (f) => size(f) === 120 && n(f, "pack") <= 2 && (n(f, "pressure") >= 1.5 || n(f, "rpm") >= 1500), sort: "price",
    lead: "A replacement or second fan for a CPU tower or radiator needs enough static pressure to push air through dense fins, and a mounting size that matches the cooler's clips. Every pick here is a 120mm single fan or a two-pack that lists either a pressure rating of 1.5 mmH2O or more or a top speed of 1,500 RPM or more.",
    close: "Measure the fan's thickness against your cooler's clearance and check whether the cooler's clips take the fan's frame before ordering." },
];
