import pool from "@/data/pcj-pool/mice.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 28 mouse fact sheets: gaming mice for mouseSchema (esports, ultralight, MMO, 8K polling, wired and wireless)
 * and office mice for workMouseSchema (Logitech MX, vertical, trackball, silent and compact mice). Weight, DPI, polling,
 * battery and connection come from the listing titles and bullets and are reviewed by hand; unstated fields stay
 * undefined. Gaming battery is in hours; work-mouse battery is in months. Colour-variant, renewed and bundle listings are skipped.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const expand28GamingMouseFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  // Logitech
  F("B0DXXM35BW", "Logitech G Pro X Superlight 2", "G Pro X Superlight 2", { weight: 60, dpi: 44000, polling: 8000, connection: "Lightspeed 2.4GHz" }, ["LIGHTFORCE hybrid switches", "zero-additive PTFE feet"]),
  F("B0CJ4V4TRP", "Logitech G Pro 2 Lightspeed", "G Pro 2 Lightspeed", { dpi: 44000, polling: 8000, connection: "Lightspeed 2.4GHz", shape: "Ambidextrous" }, ["USB-C charging", "a 44K DPI sensor"]),
  F("B0H8BR7BCW", "Logitech G Pro X3 Superstrike", "G Pro X3 Superstrike", { dpi: 48000, polling: 8000, battery: 135 }, ["a 48,000 DPI sensor", "up to 135 hours of battery life"]),
  F("B092CRH1RX", "Logitech G502 X Lightspeed", "G502 X Lightspeed", { connection: "Lightspeed 2.4GHz" }, ["LIGHTFORCE hybrid optical-mechanical switches"]),
  F("B07W6HDB55", "Logitech G502 X Plus Lightspeed", "G502 X Plus", { connection: "Lightspeed 2.4GHz" }, ["LIGHTSYNC RGB", "LIGHTFORCE hybrid switches"]),
  F("B07W6HSTNR", "Logitech G502 X (Wired)", "G502 X Wired", { dpi: 25600, connection: "Wired" }, ["a Hero 25K sensor", "LIGHTFORCE hybrid switches"]),
  F("B086PDW7BB", "Logitech G305 Lightspeed", "G305", { dpi: 12000, battery: 250, connection: "Lightspeed 2.4GHz" }, ["400 IPS tracking", "a 3.4oz build"]),
  F("B07NSVMT22", "Logitech G903 Lightspeed", "G903", { battery: 140, connection: "Lightspeed 2.4GHz" }, ["PowerPlay wireless charging support", "140 hours with RGB on and 180 hours without"]),
  F("B07L4BM851", "Logitech G502 Lightspeed Wireless", "G502 Lightspeed", { connection: "Lightspeed 2.4GHz" }, ["a Hero 16K sensor"]),
  F("B0D27XQL55", "Logitech G203 Wired", "G203", { dpi: 8000, buttons: 6, connection: "Wired" }, ["Lightsync RGB", "on-board memory"]),
  // Razer
  F("B0CW25XR5S", "Razer Viper V3 Pro", "Viper V3 Pro", { weight: 55, polling: 8000, battery: 95, connection: "HyperSpeed 2.4GHz" }, ["8000Hz HyperPolling"]),
  F("B0DT19Z5XL", "Razer Viper V3 Pro 8K (Faker Edition)", "Viper V3 Pro Faker", { weight: 54, polling: 8000, battery: 95, connection: "HyperSpeed 2.4GHz" }, ["8000Hz HyperPolling", "default settings at 1800 DPI"]),
  F("B0BBBXGD7T", "Razer DeathAdder V3 Pro", "DeathAdder V3 Pro", { weight: 63, battery: 90, connection: "HyperSpeed 2.4GHz" }, ["Gen-3 optical switches"]),
  F("B0B6Y3XYFG", "Razer Basilisk V3 Pro", "Basilisk V3 Pro", { buttons: 11, battery: 110, polling: 8000, connection: "HyperSpeed 2.4GHz, Bluetooth, wired" }, ["up to 150 hours on Bluetooth", "a multi-function scroll wheel"]),
  F("B0DG7LDR38", "Razer Basilisk V3 35K (Wired)", "Basilisk V3 35K", { connection: "Wired" }, ["a 35K optical sensor", "an ergonomic shape"]),
  F("B097F8H1MC", "Razer Basilisk V3 (Wired)", "Basilisk V3", { buttons: 11, connection: "Wired" }, ["a multi-function scroll wheel", "11 programmable buttons"]),
  F("B0CBD5LHRC", "Razer Basilisk V3 X HyperSpeed", "Basilisk V3 X", { dpi: 18000, battery: 285, connection: "HyperSpeed 2.4GHz, Bluetooth" }, ["up to 285 hours of battery life", "mechanical switches Gen-2"]),
  F("B0CHTKSHP3", "Razer Cobra (Wired)", "Razer Cobra", { weight: 58, connection: "Wired" }, ["Gen-3 optical switches", "Chroma RGB with underglow"]),
  // SteelSeries, Corsair, HyperX, ASUS
  F("B09W1B5S5W", "SteelSeries Aerox 5 Wireless", "Aerox 5 Wireless", { weight: 74, buttons: 9, battery: 180, connection: "2.4GHz, Bluetooth" }, ["a perforated shell rated IP54"]),
  F("B09VNTCZZN", "SteelSeries Aerox 5", "Aerox 5", { weight: 59, buttons: 9, connection: "Wired" }, ["a perforated shell"]),
  F("B09TTT44PP", "SteelSeries Aerox 3", "Aerox 3", { weight: 59, dpi: 8500, connection: "Wired" }, ["a water-resistant build", "a TrueMove Core optical sensor"]),
  F("B0851H51FC", "SteelSeries Prime", "SteelSeries Prime", { weight: 69, dpi: 18000, connection: "Wired" }, ["magnetic optical switches", "a TrueMove Pro sensor"]),
  F("B093LSMKL3", "SteelSeries Rival 5", "Rival 5", { weight: 85, connection: "Wired" }, ["quick-action side buttons"]),
  F("B0FKGXXVKT", "Corsair M75 Wireless", "Corsair M75 Wireless", { weight: 89, dpi: 26000, connection: "Wireless" }, ["swappable magnetic side buttons", "optical switches"]),
  F("B0CCVYHZ9N", "Corsair Scimitar Elite RGB Wireless", "Scimitar Elite Wireless", { buttons: 16, dpi: 26000, battery: 150, polling: 2000, connection: "Slipstream wireless" }, ["a 16-button MMO layout"]),
  F("B0F6NJYMWF", "Corsair Scimitar Elite Wireless SE", "Scimitar Elite SE", { buttons: 16, polling: 1000, connection: "Wireless" }, ["Stream Deck integration", "a 16-button MMO layout"]),
  F("B09CXQZMHG", "Corsair M65 RGB Ultra", "Corsair M65 RGB Ultra", { dpi: 26000, polling: 8000, connection: "Wired" }, ["adjustable weights", "a native 8,000Hz polling rate"]),
  F("B0BX52K6SH", "HyperX Pulsefire Haste 2 (Wired)", "Pulsefire Haste 2", { weight: 53, buttons: 6, dpi: 26000, polling: 8000, connection: "Wired" }, ["a Hyperflex cable"]),
  F("B0CQPMCBDL", "HyperX Pulsefire Haste 2 Mini", "Pulsefire Haste 2 Mini", { weight: 59, battery: 100, dpi: 26000, connection: "2.4GHz, Bluetooth" }, ["a compact shell"]),
  F("B0DG6DQ2DP", "ASUS ROG Harpe Ace Mini", "ROG Harpe Ace Mini", { weight: 49, dpi: 42000, connection: "Tri-mode wireless", shape: "Right-handed, compact" }, ["track-on-glass sensing"]),
  F("B0FJCSYWK4", "ASUS ROG Harpe II Ace", "ROG Harpe II Ace", { weight: 48, dpi: 42000, polling: 8000, connection: "Wireless" }, ["track-on-glass sensing"]),
  F("B0FJCFFJKX", "ASUS ROG Keris II Origin", "ROG Keris II Origin", { dpi: 42000, connection: "Wireless", shape: "Ergonomic" }, ["a 42,000 DPI sensor"]),
  // Glorious, Pulsar, Endgame Gear, Lamzu, Zowie and others
  F("B0DHYP1V96", "Glorious Model O 2 Mini Wireless", "Model O 2 Mini", { weight: 57, battery: 110, connection: "2.4GHz, Bluetooth, wired", shape: "Compact" }, ["210 hours on Bluetooth"]),
  F("B0CJ5SS889", "Glorious Model O 2 Pro Wireless", "Model O 2 Pro", { dpi: 26000, battery: 80, polling: 4000, connection: "2.4GHz wireless" }, ["35 hours at 4,000Hz polling", "a 26K sensor"]),
  F("B0BLF5NH32", "Glorious Model O 2 Wireless", "Model O 2 Wireless", { weight: 68, dpi: 26000, battery: 110, connection: "2.4GHz, Bluetooth" }, ["210 hours on Bluetooth", "a 650 IPS sensor"]),
  F("B0FVKKP2T8", "Pulsar X2 Crazylight Wireless (Medium)", "Pulsar X2 Crazylight", { weight: 39, dpi: 32000, connection: "Wireless" }, ["a 750 IPS sensor"]),
  F("B0FNDTDVVJ", "Pulsar X2H Wireless", "Pulsar X2H", { weight: 54, dpi: 26000, battery: 100, polling: 1000, connection: "2.4GHz", shape: "Symmetrical" }, ["optical switches"]),
  F("B0DG5YKCDT", "Endgame Gear XM2 8K", "Endgame Gear XM2 8K", { weight: 52, dpi: 26000, polling: 8000, connection: "Wired" }, ["Kailh GX switches", "a PixArt PAW3395 sensor"]),
  F("B0D9BKWP3G", "Lamzu Atlantis Mini Champion Edition", "Lamzu Atlantis Mini", { weight: 51, dpi: 30000, connection: "Wireless", shape: "Symmetrical, compact" }, ["optical switches", "8K polling with the 8K dongle"]),
  F("B0DFGYH6XT", "Lamzu Maya X", "Lamzu Maya X", { weight: 47, dpi: 30000, polling: 8000, connection: "Wireless", shape: "Symmetrical" }, ["a Nordic 52840 MCU", "optical switches"]),
  F("B0F18KGJGS", "Lamzu Inca", "Lamzu Inca", { weight: 40, dpi: 30000, polling: 8000, shape: "Symmetrical" }, ["a Paw3950 sensor", "optical switches"]),
  F("B0DJTXYTPD", "BenQ Zowie S2-DW 4K", "Zowie S2-DW", { weight: 65, polling: 4000, connection: "Wireless", shape: "Symmetrical" }, ["a driverless design", "a 4K enhanced receiver"]),
  F("B0DP842P5C", "BenQ Zowie U2", "Zowie U2", { weight: 60, dpi: 3200, connection: "Wireless" }, ["an enhanced receiver"]),
  F("B0GPWH9RF1", "Keychron G3 8K", "Keychron G3 8K", { weight: 47, dpi: 30000, battery: 160, polling: 8000, connection: "2.4GHz, Bluetooth, wired" }, ["a PAW 3950 sensor"]),
]);

export const expand28WorkMouseFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  F("B0B11LJ69K", "Logitech MX Master 3S (Logi Bolt)", "MX Master 3S", { battery: 18, dpi: 8000, grip: "Sculpted ergonomic", connection: "Bluetooth or Logi Bolt" }, ["an 18-month battery life", "quiet clicks"]),
  F("B0FB21526X", "Logitech MX Master 3S (Bluetooth)", "MX Master 3S Bluetooth", { dpi: 8000, grip: "Sculpted ergonomic", connection: "Bluetooth, 3 devices" }, ["quiet clicks", "an 8,000 DPI sensor that tracks on glass"]),
  F("B0FB4B37CB", "Logitech MX Anywhere 3S", "MX Anywhere 3S", { dpi: 8000, grip: "Compact", connection: "Bluetooth, 3 devices, or Logi Bolt" }, ["quiet clicks", "any-surface tracking"]),
  F("B0CJXQVMHL", "Logitech MX Anywhere 2S", "MX Anywhere 2S", { grip: "Compact", connection: "Bluetooth or Unifying receiver" }, ["a compact travel body"]),
  F("B0B4C3HJPV", "Logitech Lift Vertical Ergonomic", "Logitech Lift", { buttons: 4, grip: "57-degree vertical, right-handed, small to medium hands", connection: "Bluetooth or Logi Bolt" }, ["whisper-quiet clicks", "a SmartWheel"]),
  F("B0D6PTR6MP", "Logitech MX Ergo S", "MX Ergo S", { battery: 4, grip: "Thumb trackball, right-handed", connection: "Bluetooth or Logi Bolt" }, ["up to 120 days per charge", "80% quieter clicks"]),
  F("B0CPSP33T8", "Logitech Signature M550 L", "Signature M550 L", { battery: 24, grip: "Full-size, right-handed", connection: "Bluetooth or Logi Bolt" }, ["SilentTouch clicks", "a large size"]),
  F("B0BT4GFFGR", "Logitech Pebble Mouse 2 M350s", "Pebble 2 M350s", { grip: "Slim, ambidextrous", connection: "Bluetooth, 3 devices" }, ["SilentTouch clicks"]),
  F("B0BXNQK9CM", "Logitech M240 Silent", "Logitech M240", { grip: "Compact, ambidextrous", connection: "Bluetooth" }, ["90% reduced click noise"]),
  F("B0D9N62T62", "Logitech M196", "Logitech M196", { grip: "Compact, ambidextrous", connection: "Bluetooth" }, ["a lightweight travel body"]),
  F("B004YAVF8I", "Logitech M185", "Logitech M185", { grip: "Compact, ambidextrous", connection: "2.4GHz USB receiver" }, ["a compact contoured shape"]),
  F("B0GSXLK8SC", "Logitech Mobi Fold", "Logitech Mobi Fold", { battery: 1, grip: "Foldable, compact", connection: "Bluetooth" }, ["a foldable body", "quiet clicks"]),
  F("B0F9KFSY9G", "DELUX Pocket Mouse MF20", "DELUX MF20", { dpi: 4000, grip: "Sliding, ultra-compact", connection: "2.4GHz and Bluetooth 5.2" }, ["a 2-in-1 sliding design"]),
  F("B0DR1K3DM1", "UGREEN Ergonomic Vertical Mouse", "UGREEN vertical", { buttons: 5, grip: "Vertical, right-handed", connection: "Bluetooth and 2.4GHz" }, ["quiet clicks", "PTFE glide feet"]),
  F("B0DG5SW7F4", "TECKNET Vertical Mouse 4800 DPI", "TECKNET vertical 4800", { dpi: 4800, grip: "Vertical, right-handed", connection: "Bluetooth 5.0/3.0 and 2.4GHz, 3 devices" }, ["a built-in 2.4GHz receiver"]),
  F("B0F1YD86Z6", "TECKNET Vertical Mouse (Rechargeable)", "TECKNET vertical", { battery: 2, grip: "Vertical, right-handed", connection: "Bluetooth 5.0/3.0 and USB-A" }, ["a built-in rechargeable battery", "up to 2 months of use per charge"]),
  F("B0GK95S8ST", "Uineer Vertical Mouse", "Uineer vertical", { grip: "Vertical, right-handed", connection: "Bluetooth 5.0/4.0 and 2.4GHz" }, ["adjustable DPI", "silent buttons"]),
  F("B07BFCVJZC", "Lekvey Vertical Mouse", "Lekvey vertical", { dpi: 1600, grip: "Vertical, right-handed", connection: "2.4GHz USB receiver" }, ["three DPI levels from 800 to 1600"]),
  F("B00BIFNTMC", "Anker Wireless Vertical Mouse", "Anker vertical", { dpi: 1600, grip: "Vertical, right-handed", connection: "2.4GHz USB receiver" }, ["800, 1200 and 1600 DPI settings"]),
  F("B0CW6F9W2K", "JYKEYMOUT Vertical Mouse", "JYKEYMOUT vertical", { dpi: 1600, grip: "Vertical", connection: "Bluetooth 5.2/3.0 and 2.4GHz" }, ["a rechargeable build", "silent buttons"]),
]);
