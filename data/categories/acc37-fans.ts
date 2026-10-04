import pool from "@/data/pcj-pool/fans.json";
import { withPool } from "./helpers";
import { F } from "./acc37-helpers";

/** Reverse-blade 120mm case fans added in batch 37. Figures come from each listing's title and bullets; unstated fields stay undefined. */
export const fans37Facts = withPool(pool as Record<string, { img?: string; price?: string }>, [
  F("B0FJS2TH73", "ARCTIC P12 Pro Reverse (120mm)", "P12 Pro Reverse", { pack: 1, rpm: 3000, bearing: "Fluid dynamic", zero: true, argb: "None" }, ["reversed airflow that draws air in from the back side", "high static pressure for radiators and mesh", "a PWM range up to 3000 rpm"]),
  F("B0DB6LBS6T", "ASUS TUF Gaming TR120 ARGB Reverse (3 Pack)", "TUF TR120 reverse", { pack: 3, cfm: 76.3, pressure: 2.75, argb: "ARGB, 16 addressable LEDs per fan" }, ["an extra-thick 28mm frame", "a double-layer LED matrix", "Aura Sync compatibility"]),
  F("B0GC66NV13", "Thermalright TL-M12QR-S X3 Reverse (3 Pack)", "TL-M12QR-S X3", { pack: 3, rpm: 1500, cfm: 47.6, argb: "ARGB with infinity mirror" }, ["a daisy-chain for PWM and ARGB cables", "a reverse layout for side or bottom intake", "4-pin PWM and 3-pin 5V ARGB connections"]),
  F("B0DFPCKZ2Y", "DARKROCK R120 White Reverse Blade (2 Pack)", "DARKROCK R120", { pack: 2, rpm: 1600, noise: "27.7 dBA maximum", bearing: "Hydraulic", argb: "ARGB with infinity mirror" }, ["nine fan blades", "an 800 to 1600 rpm PWM range", "eight rubber pads for low vibration"]),
  F("B0FV39D24F", "be quiet! Pure Wings 3 120mm PWM Reverse (3 Pack)", "Pure Wings 3 Reverse", { pack: 3, bearing: "Rifle", argb: "None" }, ["seven airflow-optimised blades", "an 80,000 hour average lifespan, by the maker", "a design for side or bottom intake in showcase cases"]),
  F("B0C9YKPGZK", "Lian Li UNI FAN SL-Infinity 120 Reverse Blade", "SL-Infinity Reverse", { pack: 1, bearing: "Fluid dynamic", zero: true, argb: "ARGB, 40 LEDs per fan" }, ["an all-around infinity mirror design", "one cable that links up to four fans", "a start and stop mode below set temperatures"]),
  F("B0F1WG529J", "be quiet! Light Wings LX 120mm PWM Reverse", "Light Wings LX Reverse", { pack: 1, bearing: "Rifle", argb: "ARGB, 16 LEDs in the hub" }, ["a frame outlet that limits air leaks", "an ARGB cable with an input and an output", "a 60,000 hour average lifespan, by the maker"]),
  F("B0BZCJ7LLV", "Phanteks D30 120mm Reverse Airflow (3 Pack)", "Phanteks D30 Reverse", { pack: 3, argb: "D-RGB with a Halos ring" }, ["a 30mm thick frame for radiators and mesh", "bridge connectors that link fans", "digital RGB lighting visible from all sides"]),
  F("B0FHQBNFSS", "MUSETEX 120mm PWM ARGB Reverse Blade (3 Pack)", "MUSETEX reverse", { pack: 3, argb: "ARGB" }, ["a 3-pack of black reverse-blade fans", "adjustable speed", "customisable lighting"]),
]);
