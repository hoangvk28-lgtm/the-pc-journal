import coolingPool from "@/data/pcj-pool/cooling.json";
import casePool from "@/data/pcj-pool/cases.json";
import speakerPool from "@/data/pcj-pool/speakers.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/** Batch 20 additions from the Creators API: black air coolers, sound-dampened cases and studio monitors. Fields come from each listing's title and bullets only. */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
type Pool = Record<string, { img?: string; price?: string }>;

export const air20Facts = withPool(coolingPool as Pool, [
  F("B07Y87YHRH", "Noctua NH-D15 chromax.black", "NH-D15 chromax.black", { pipes: 6, fan: 140, fans: 2, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["an all-black dual-tower design", "two NF-A15 140mm PWM fans with Low-Noise Adaptors", "NT-H1 paste and the SecuFirm2 mount in the box"]),
  F("B0FXGWKHND", "Noctua NH-D15 G2 chromax.black", "NH-D15 G2 chromax.black", { pipes: 8, fan: 140, fans: 2, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["an all-black finish on Noctua's second-generation NH-D15", "an offset design with 59mm RAM clearance", "two NF-A14x25r G2 PWM fans"]),
  F("B08HM1T6RL", "Noctua NH-D15S chromax.black", "NH-D15S chromax.black", { fan: 140, fans: 1, height: 160, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["an asymmetrical dual-tower heatsink with 65mm RAM clearance", "a single NF-A15 140mm PWM fan", "an all-black finish"]),
  F("B07Y88BNYZ", "Noctua NH-U12S chromax.black", "NH-U12S chromax.black", { fan: 120, fans: 1, height: 158, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a slim tower that does not overhang the RAM slots", "an NF-F12 PWM fan", "an all-black finish"]),
  F("B098XP1Y38", "Noctua NH-U12A chromax.black", "NH-U12A chromax.black", { fan: 120, fans: 2, height: 158, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["two NF-A12x25 PWM fans on a single tower", "full RAM clearance", "an all-black finish"]),
  F("B0CVKZ9T3Q", "Noctua NH-D12L chromax.black", "NH-D12L chromax.black", { fan: 120, fans: 1, height: 145, sockets: "AM5, AM4, LGA1851, LGA1700" }, ["a low 145mm dual-tower design that fits many small-form-factor cases", "full RAM compatibility", "an all-black finish"]),
  F("B0D93R3YY9", "Thermalright Phantom Spirit 120 SE Black", "Phantom Spirit 120 SE Black", { pipes: 7, fan: 120, fans: 2 }, ["a black-coated dual-tower heatsink", "two TL-C12B V2 PWM fans", "S-FDB fan bearings"]),
  F("B09LHBFPJ6", "Thermalright Assassin X120 Refined SE", "Assassin X120 Refined SE", { pipes: 4, fan: 120, fans: 1, height: 148 }, ["a TL-C12C PWM fan", "an aluminium heatsink cover"]),
  F("B0GD1CJ71R", "Thermalright Peerless Assassin 120 Vision MAX ARGB Black", "Peerless Assassin 120 Vision MAX", { pipes: 6, fan: 120, fans: 2 }, ["a magnetic top cover with a 5-inch IPS screen", "fans rated up to 2,150 RPM", "a black finish"]),
]);

export const cases20Facts = withPool(casePool as Pool, [
  F("B08146X79Y", "Fractal Design Define 7", "Define 7", { fans: 3, boards: "E-ATX, ATX, mATX, ITX", glass: "Dark tempered glass side" }, ["industrial high-density sound damping", "room for up to 14 HDDs in its storage layout", "three Dynamic X2 GP-14 fans"]),
  F("B08146GB6Y", "Fractal Design Define 7 XL Solid", "Define 7 XL", { rad: 480, boards: "E-ATX, SSI-EEB, ATX, mATX, ITX" }, ["solid, sound-dampened panels", "room for up to 18 HDDs", "radiators up to 480mm in its open layout"]),
  F("B08NW5741Z", "be quiet! Silent Base 802", "Silent Base 802", { fans: 3, usbc: true }, ["extra-thick noise insulation mats", "interchangeable top and front panels for airflow or silence", "a built-in fan controller"]),
  F("B01N7PGIPS", "be quiet! Pure Base 600", "Pure Base 600", { fans: 2, rad: 360 }, ["two Pure Wings 2 fans", "an adjustable top cover vent", "a three-year warranty"]),
  F("B086YDDV6F", "Phanteks XT Pro Silent", "XT Pro Silent (Phanteks)", { fans: 3, rad: 360, usbc: true }, ["sound-dampening foam on the front and side panels", "support for rear-connector motherboards", "three M25-120 fans"]),
]);

export const speakers20Facts = withPool(speakerPool as Pool, [
  F("B0C88ZB3D9", "PreSonus Eris 3.5 Studio Monitors (pair)", "Eris 3.5", { form: "Studio monitor pair", woofer: 3.5, extras: "High and low acoustic tuning controls" }, ["50 watts of built-in amplification", "1-inch silk-dome tweeters", "an 80Hz to 20kHz frequency range"]),
  F("B0CW16KG33", "KRK ROKIT 5 Generation Five (single)", "ROKIT 5 G5", { form: "Single studio monitor", woofer: 5, inputs: "XLR/TRS combo" }, ["Class D amplifiers", "a low-diffraction baffle for stereo imaging", "foam isolation pads in the box"]),
  F("B075Q5T7Q1", "Yamaha HS5 Studio Monitors (pair)", "HS5", { form: "Studio monitor pair", woofer: 5, inputs: "XLR and TRS" }, ["a 54Hz to 30kHz frequency response", "a 45W plus 25W bi-amp system per speaker", "a voicing aimed at uncoloured sound"]),
  F("B077N2GQXC", "JBL 305P MkII Studio Monitor (single)", "305P MkII", { form: "Single studio monitor", woofer: 5 }, ["a boundary EQ that corrects bass near walls or on a desk", "a Slip Stream bass port", "a 100-hour full-power test on each unit"]),
  F("B09FXG9BLR", "Edifier MR4 Studio Monitors (pair)", "MR4", { form: "Studio monitor pair", woofer: 4, inputs: "TRS, RCA and AUX" }, ["a near-flat response tuned for music creators", "a front headphone output", "a switch between monitor and music modes"]),
  F("B0DFZZ5ZZY", "Mackie CR3.5 Studio Monitors (pair)", "CR3.5", { form: "Studio monitor pair", woofer: 3.5, extras: "Isolation pads and cables" }, ["a tone knob on the front", "a location switch that corrects bass near a wall", "a size aimed at desks and small studios"]),
  F("B00CP4IJH0", "PreSonus Eris E5 Studio Monitor (single)", "Eris E5", { form: "Single studio monitor", woofer: 5.25, inputs: "XLR, TRS and RCA" }, ["80 watts of Class AB bi-amplification", "acoustic tuning controls", "Studio One Prime software included"]),
  F("B08KXTJX16", "M-Audio BX4 Studio Monitors (pair)", "BX4", { form: "Studio monitor pair", woofer: 4.5 }, ["Kevlar woofers with silk-dome tweeters", "a wired, zero-latency connection"]),
  F("B08KXVYGSF", "M-Audio BX3 Studio Monitors (pair)", "BX3", { form: "Studio monitor pair", woofer: 3.5 }, ["Kevlar woofers with silk-dome tweeters", "a wired, zero-latency connection"]),
]);
