import pool from "@/data/pcj-pool/fans.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 31: more 120mm and 140mm fans, added for the radiator-fan and size-specific guides.
 * Every figure is one the listing title or bullets state; the makers' airflow, pressure and noise ratings are not
 * measured under the same conditions, so guides rank them as ratings. A field a listing omits is left out.
 * Left out on purpose: renewed listings and the ARCTIC P12 Pro 5-pack and single (anomalously low prices).
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const fans31Facts: Record<string, Fact> = withPool(pool as Pool, [
  F("B09XR9LF5N", "CORSAIR AF120 Elite 120mm PWM Fan", "AF120 Elite", { pack: 1, rpm: 1850, cfm: 59.1, pressure: 1.93, noise: "31.5 dBA", bearing: "Fluid dynamic", zero: true, argb: "None" }, ["AirGuide anti-vortex vanes", "support for a Zero RPM mode", "a 400 to 1,850 RPM PWM range"]),
  F("B0D49L67NS", "CORSAIR RS120 120mm PWM Fan (single)", "RS120", { pack: 1, rpm: 2100, cfm: 72.8, pressure: 4.15, bearing: "Magnetic dome", argb: "None" }, ["a daisy-chain connection from one PWM header", "4.15 mmH2O of rated static pressure", "AirGuide anti-vortex vanes"]),
  F("B0D49QX74S", "CORSAIR RS120 120mm PWM Fans (3-pack)", "RS120 3-pack", { pack: 3, rpm: 2100, cfm: 72.8, pressure: 4.15, bearing: "Magnetic dome", argb: "None" }, ["three fans that daisy-chain to one PWM header", "4.15 mmH2O of rated static pressure", "AirGuide anti-vortex vanes"]),
  F("B0CSSXZKJB", "CORSAIR iCUE LINK RX120 RGB 120mm PWM Fans (3-pack with system hub)", "iCUE LINK RX120 3-pack", { pack: 3, rpm: 2100, cfm: 74.2, pressure: 4.38, bearing: "Magnetic dome", argb: "RGB (iCUE LINK)" }, ["an iCUE LINK System Hub in the box", "4.38 mmH2O of rated static pressure", "eight RGB LEDs per fan"]),
  F("B0D49NN28D", "CORSAIR RS140 ARGB 140mm PWM Fans (2-pack)", "RS140 ARGB 2-pack", { pack: 2, rpm: 1700, cfm: 95.5, pressure: 3.46, bearing: "Magnetic dome", argb: "ARGB" }, ["eight LEDs per fan on a +5V ARGB connection", "3.46 mmH2O of rated static pressure", "a daisy-chain connection from one PWM header"]),
  F("B0G39DCF81", "Thermalright TL-M12Q-S X3 120mm ARGB Fans (3-pack)", "TL-M12Q-S X3", { pack: 3, rpm: 2000, cfm: 68.9, pressure: 2.21, argb: "ARGB" }, ["dual-side infinity mirror lighting", "daisy-chained PWM and ARGB connections", "a 2.21 mmH2O pressure rating for radiators"]),
  F("B0BKL1QYP3", "Thermalright TL-C12C X3 120mm PWM Fans (3-pack)", "TL-C12C X3", { pack: 3, rpm: 1550, cfm: 66.17, pressure: 1.53, noise: "25.6 dBA", bearing: "S-FDB", argb: "None" }, ["four silicone corner pads against vibration", "a 25.6 dBA noise rating", "an S-FDB bearing"]),
  F("B0BKKG1ZND", "Thermalright TL-C12C-S X3 120mm ARGB Fans (3-pack)", "TL-C12C-S X3", { pack: 3, rpm: 1550, cfm: 66.17, pressure: 1.53, noise: "25.6 dBA", bearing: "S-FDB", argb: "ARGB" }, ["atomised ARGB blades that diffuse the light", "a 25.6 dBA noise rating", "an S-FDB bearing"]),
  F("B0C8LN919S", "Thermaltake TOUGHFAN 12 Pro 120mm PWM Fan (single)", "TOUGHFAN 12 Pro", { pack: 1, rpm: 2000, cfm: 70.8, pressure: 3.19, noise: "22.6 dBA", bearing: "Hydraulic (second generation)", argb: "None" }, ["0.6mm tip clearance to cut air leakage", "a metal-reinforced motor hub", "a 5-year warranty"]),
  F("B0C8M192HS", "Thermaltake TOUGHFAN 12 Pro 120mm PWM Fans (2-pack)", "TOUGHFAN 12 Pro 2-pack", { pack: 2, rpm: 2000, cfm: 70.8, pressure: 3.19, noise: "22.6 dBA", bearing: "Hydraulic (second generation)", argb: "None" }, ["0.6mm tip clearance to cut air leakage", "a metal-reinforced motor hub", "a 5-year warranty"]),
  F("B0D1C4VGFC", "ID-COOLING AS-120-K Trio 120mm PWM Fans (3-pack)", "AS-120-K Trio", { pack: 3, rpm: 2000, cfm: 58, pressure: 1.94, noise: "27.2 dBA", bearing: "Hydraulic", argb: "None" }, ["a 300 to 2,000 RPM PWM range", "daisy-chain connectors between the fans", "a 27.2 dBA noise rating"]),
  F("B08PYPQ8SB", "ID-COOLING XF-12025-ARGB-TRIO 120mm Fans (3-pack)", "XF-12025 ARGB Trio", { pack: 3, rpm: 1500, cfm: 62, argb: "ARGB" }, ["a 700 to 1,500 RPM PWM range", "5V 3-pin ARGB sync with the motherboard", "an even light diffuser built into the frame"]),
  F("B0H2XBQ3RR", "ID-COOLING AM-120-K 120mm PWM Fan", "AM-120-K", { pack: 1, rpm: 2500, cfm: 79.7, pressure: 3.65, bearing: "Hydraulic", argb: "None" }, ["a 79.7 CFM airflow rating", "a 3.65 mmH2O pressure rating", "a plain black frame without lighting"]),
  F("B0BMTHQ4H4", "Phanteks M25-120 120mm PWM Fan (single)", "M25-120", { pack: 1, rpm: 2000, argb: "None" }, ["a 500 to 2,000 RPM PWM range", "a daisy-chain cable between fans", "tuning for fine mesh filters, heatsinks and radiators"]),
  F("B00KF7PPY4", "Noctua NF-S12B redux-1200 PWM 120mm", "NF-S12B redux", { pack: 1, rpm: 1200, noise: "18.1 dB(A)", argb: "None" }, ["an 18.1 dB(A) noise rating", "a rated life above 150,000 hours", "a low-airflow-resistance blade design"]),
  F("B0BRRX797Z", "Scythe Kaze Flex II 120 PWM Fan (1200 RPM)", "Kaze Flex II 120", { pack: 1, rpm: 1200, cfm: 52.94, pressure: 0.97, noise: "23.8 dBA", bearing: "Fluid dynamic", argb: "None" }, ["a 23.8 dBA noise rating", "a rated life up to 120,000 hours", "eleven airflow-optimised blades"]),
  F("B0B6WPZFBX", "be quiet! Silent Wings 4 120mm PWM High-Speed Fan", "Silent Wings 4 120mm", { pack: 1, noise: "31.2 dB(A)", bearing: "Fluid dynamic", argb: "None" }, ["a 31.2 dB(A) maximum noise rating", "a six-pole motor with three phases", "anti-vibration mounting and screw options"]),
  F("B0B744J87R", "be quiet! Silent Wings 4 140mm PWM High-Speed Fan", "Silent Wings 4 140mm", { pack: 1, noise: "29.3 dB(A)", bearing: "Fluid dynamic", argb: "None" }, ["a 29.3 dB(A) maximum noise rating", "a six-pole motor with three phases", "anti-vibration mounting and screw options"]),
  F("B0CM3Z39J3", "be quiet! Pure Wings 3 120mm PWM High-Speed Fan", "Pure Wings 3 120mm", { pack: 1, bearing: "Rifle", argb: "None" }, ["a frame outlet designed for radiators", "seven airflow-optimised blades", "a rated operating life of 80,000 hours"]),
  F("B0FV3CLQVS", "be quiet! Pure Wings 3 140mm PWM High-Speed Fans (3-pack)", "Pure Wings 3 140mm 3-pack", { pack: 3, pressure: 2.44, bearing: "Rifle", argb: "None" }, ["a closed-loop motor that holds speed against resistance", "up to 2.44 mmH2O of air pressure", "nine airflow-optimised blades"]),
  F("B0D1RK8CWT", "NZXT F120P 120mm Static Pressure PWM Fan", "NZXT F120P", { pack: 1, bearing: "Fluid dynamic", argb: "None" }, ["seven thick blades tuned for static pressure", "a rated life of 60,000 hours", "a chamfered frame that concentrates the airflow"]),
  F("B0BWKZGYXJ", "Cooler Master MF120 Halo² ARGB 120mm PWM Fan", "MF120 Halo2", { pack: 1, rpm: 2050, argb: "ARGB" }, ["dual-loop ARGB rings", "a 0 to 2,050 RPM PWM range", "frosted blades that spread the lighting"]),
  F("B0D9RLC2ZF", "MONTECH AX120 120mm PWM ARGB Fans (3-pack with hub)", "AX120 3-pack", { pack: 3, rpm: 1600, noise: "27.9 dB(A)", bearing: "HDB", argb: "ARGB" }, ["a 6x6 fan hub in the box", "a hexagonal ARGB ring with 20 LEDs", "a 40,000-hour rated life"]),
  F("B08KW6ZSP2", "Fractal Design Aspect 12 PWM 120mm Fan", "Aspect 12 PWM", { pack: 1, rpm: 2000, bearing: "Rifle", argb: "None" }, ["a 500 to 2,000 RPM PWM range", "aerodynamic stator struts", "support for daisy-chaining"]),
]);
