import pool from "@/data/pcj-pool/fans.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * 120mm case fans. Only figures stated in each Amazon listing are recorded; airflow, pressure and
 * noise are the makers' own ratings and are left undefined when a listing omits them.
 * Dropped: ARCTIC P12 Pro PST 5-pack at $18.09 (price well below the single-pack pricing pattern).
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const fanSchema: CategorySchema = {
  id: "case-fan",
  plural: "Case Fans",
  fields: [
    { key: "pack", label: "Fans in box", noun: "pack size", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => (Number(v) === 1 ? "1 fan" : `${v} fans`), strength: (v) => (Number(v) >= 3 ? `${v} fans in the box` : undefined), weakness: (v) => (Number(v) === 1 ? "Sold as a single fan, so a full case costs more" : undefined) },
    { key: "rpm", label: "Max speed", noun: "top speed", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} RPM`, strength: (v) => (Number(v) >= 2500 ? `a ${v} RPM top speed for radiators` : undefined) },
    { key: "cfm", label: "Rated airflow", noun: "rated airflow", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} CFM`, rule: { label: "Highest Rated Airflow", bestFor: ["Intake fans in a mesh-front case.", "Moving air through a warm case."] }, strength: (v) => `${v} CFM rated airflow` },
    { key: "pressure", label: "Static pressure", noun: "static pressure", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} mmH2O`, strength: (v) => (Number(v) >= 2 ? `${v} mmH2O static pressure for radiators and filters` : undefined) },
    { key: "noise", label: "Rated noise", fmt: (v) => String(v) },
    { key: "bearing", label: "Bearing", fmt: (v) => String(v), strength: (v) => `a ${v} bearing` },
    { key: "zero", label: "Stops at low PWM", fmt: (v) => (v ? "Yes" : "Not listed"), strength: (v) => (v ? "Stops spinning at very low PWM for silent idle" : undefined) },
    { key: "argb", label: "Lighting", fmt: (v) => String(v), strength: (v) => (v === "None" ? undefined : `${v} lighting`) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const pack = Number(f.specs.pack ?? 1);
    s.push("Check that your case has 120mm mounts in the positions you plan to use, and how many fan headers your motherboard offers.");
    if (pack >= 3) s.push(`With ${pack} fans, use a splitter or hub rather than several headers, and check the header's current rating; each fan's draw is on the label.`);
    if (f.specs.argb && f.specs.argb !== "None") s.push("ARGB lighting needs a 5V 3-pin ARGB header or the included controller; do not connect it to a 12V RGB header.");
    return s;
  },
  criteria: [
    { id: "size", title: "Confirm size and thickness", body: "Most cases take 120mm fans, and many also take 140mm. Standard fans are 25mm thick; thicker 30mm fans can clash with radiators or top-mounted RAM.\n\nCheck your case manual for each mount position." },
    { id: "airflow-pressure", title: "Airflow for open fronts, pressure for radiators", body: "Airflow (CFM) matters behind an open mesh front. Static pressure (mmH2O) matters behind dust filters, dense mesh and radiators. Maker ratings are not measured the same way, so compare within a brand." },
    { id: "noise", title: "Treat noise ratings with care", body: "Rated noise is measured at full speed in the maker's own conditions. A fan that stops or slows at low PWM is quieter at idle than its headline figure suggests." },
    { id: "control", title: "Plan fan control and headers", body: "4-pin PWM fans let the motherboard vary speed with temperature. Several fans on one header need a splitter or hub within the header's current limit." },
    { id: "lighting", title: "Decide on lighting early", body: "ARGB fans add cables and usually a controller. If you want a quiet, plain build, unlit fans are cheaper per fan and simpler to wire." },
    { id: "value", title: "Compare cost per fan", body: "Multi-packs often cost less per fan than singles. Divide the pack price by the number of fans before comparing." },
  ],
  faq: [
    { id: "how-many", q: "How many case fans do I need?", a: "Most mid-tower builds work well with two intakes and one exhaust. Add more only if temperatures or noise at load call for it." },
    { id: "pwm-dc", q: "What is the difference between PWM and DC fans?", a: "PWM (4-pin) fans take a speed signal from the motherboard; DC (3-pin) fans change speed through voltage. PWM usually gives finer control at low speeds." },
    { id: "intake-exhaust", q: "Should I have more intake or exhaust?", a: "Slightly more intake than exhaust keeps positive pressure, which reduces dust entering through unfiltered gaps." },
    { id: "rgb-header", q: "Can I plug ARGB fans into any RGB header?", a: "No. ARGB fans use a 5V 3-pin header; 12V 4-pin RGB headers can damage them. Use the included controller if your board lacks a 5V header." },
    { id: "radiator", q: "Can I use case fans on a radiator?", a: "Yes, if they are the right size. Fans with higher static pressure push air through dense radiator fins more effectively." },
    { id: "140-vs-120", q: "Are 140mm fans better than 120mm?", a: "A 140mm fan moves similar air at lower speed, so it can be quieter. Use them only where the case has 140mm mounts." },
  ],
  evaluated: [
    { title: "Rated performance", description: "We recorded airflow, static pressure and top speed where each listing states them." },
    { title: "Noise and control", description: "We noted rated noise, PWM control and whether the fan stops at low PWM." },
    { title: "Pack value", description: "We compared how many fans come in the box against the price at the time of writing." },
    { title: "Lighting and wiring", description: "We checked lighting type and whether a controller is included." },
  ],
};

export const fanFacts = withPool(pool as Pool, [
  F("B07HC782D5", "ARCTIC P12 PWM PST (5 Pack)", "P12 PWM PST 5-pack", { pack: 5, rpm: 1800, cfm: 56.3, pressure: 2.2, noise: "0.3 sone", zero: true, argb: "None" }, ["PWM Sharing Technology to daisy-chain fans from one header", "a pressure-optimised blade design"]),
  F("B0FC636JBS", "Noctua NF-A12x25 G2 PWM", "NF-A12x25 G2", { pack: 1, rpm: 1800, bearing: "SSO2", zero: true, argb: "None" }, ["anti-vibration mounts, a Low-Noise Adaptor and a splitter cable in the box", "a Sterrox LCP impeller with tight tip clearance", "a listed MTTF above 150,000 hours"]),
  F("B0B6WPS232", "be quiet! Silent Wings 4 120mm PWM", "Silent Wings 4", { pack: 1, bearing: "Fluid-dynamic", argb: "None" }, ["a 6-pole motor for smoother running", "a funnel-shaped frame outlet for higher air pressure", "push-pin or screw mounting"]),
  F("B0B746VB2F", "be quiet! Silent Wings Pro 4 120mm PWM", "Silent Wings Pro 4", { pack: 1, rpm: 3000, bearing: "Fluid-dynamic", argb: "None" }, ["a speed switch with medium, high and ultra-high modes", "a 6-pole motor", "blades tuned for radiators and heatsinks"]),
  F("B0D9M4TV4Q", "Thermalright TL-C12C-S (5 Pack)", "TL-C12C-S 5-pack", { pack: 5, rpm: 1550, cfm: 66.17, pressure: 1.53, noise: "25.6 dBA", bearing: "S-FDB", argb: "ARGB" }, ["55cm cables for daisy-chained PWM control", "17 ARGB lighting modes"]),
  F("B0B4P5S94P", "Lian Li UNI FAN SL-Infinity 120 (3 Pack)", "UNI FAN SL-Infinity", { pack: 3, argb: "ARGB infinity mirror" }, ["interlocking fans that join cables into one run", "a controller that handles up to 16 fans", "40 LEDs per fan"]),
  F("B09B2LNFV4", "Phanteks T30-120", "T30-120", { pack: 1, argb: "None" }, ["a rigid LCP frame and blades", "a switch with three fan profiles", "acoustic tuning toward a lower frequency range, as listed"]),
]);
