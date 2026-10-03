import pool from "@/data/pcj-pool/headsets.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 28 headset fact sheets for headsetSchema: current SteelSeries, Razer, Logitech, Corsair, HyperX, ASUS, Turtle
 * Beach and JBL gaming headsets, open-back and noise-cancelling models, and a few ANC headphones for the headphone
 * guides. Listing titles and bullets only, reviewed by hand; battery, driver, weight, connection, design and mic stay
 * undefined when the listing does not state them. Renewed units, colour duplicates, kids' models and no-name brands
 * are skipped.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const expand28HeadsetFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  // SteelSeries
  F("B0GS77JQLF", "SteelSeries Arctis Nova Pro Omni", "Arctis Nova Pro Omni", { connection: "2.4GHz, Bluetooth, 3xUSB, line-in" }, ["active noise cancellation", "neodymium magnetic drivers"]),
  F("B0GX1QKC33", "SteelSeries Arctis Nova Pro Wireless", "Arctis Nova Pro Wireless", { connection: "2.4GHz and Bluetooth simultaneously" }, ["active noise cancellation that detects when you want to hear your surroundings", "neodymium magnetic drivers"]),
  F("B09ZWF9BCJ", "SteelSeries Arctis Nova Pro (wired)", "Arctis Nova Pro wired", { mic: "ClearCast Gen 2 noise-cancelling" }, ["360-degree spatial audio"]),
  F("B0CD8T9QF1", "SteelSeries Arctis Nova 7P Wireless", "Arctis Nova 7P", { connection: "2.4GHz, Bluetooth", mic: "Retractable" }, ["Tempest 3D Audio support on PlayStation", "USB-C fast charge giving 6 hours from a short charge"]),
  F("B0GM3QZHFX", "SteelSeries Arctis Nova 7P Wireless Gen 2", "Arctis Nova 7P Gen 2", { battery: 50, connection: "2.4GHz and Bluetooth simultaneously" }, ["real-time app control", "neodymium magnetic drivers"]),
  F("B0FRNNXWNK", "SteelSeries Arctis Nova 7 Wireless Gen 2", "Arctis Nova 7 Gen 2", { battery: 50, connection: "2.4GHz and Bluetooth simultaneously" }, ["Sonar AI voice enhancement on PC", "a plug-and-play USB-C dongle"]),
  F("B0FRP6CMZ5", "SteelSeries Arctis Nova 7X Wireless Gen 2", "Arctis Nova 7X Gen 2", { battery: 50, connection: "2.4GHz and Bluetooth simultaneously" }, ["a plug-and-play USB-C dongle", "neodymium magnetic drivers"]),
  F("B0DFSBNN77", "SteelSeries Arctis Nova 5 Wireless", "Arctis Nova 5", { connection: "2.4GHz and Bluetooth 5.3", mic: "Retractable ClearCast 2.X" }, ["8 hours a day for a week on a charge", "USB-C fast charge giving 6 hours from 15 minutes"]),
  F("B0D2YC9GM9", "SteelSeries Arctis Nova 5X Wireless", "Arctis Nova 5X", { connection: "2.4GHz and Bluetooth 5.3", mic: "Retractable ClearCast 2.X" }, ["on-ear ChatMix and Quick-Switch controls", "USB-C fast charge"]),
  F("B0D2YBKD62", "SteelSeries Arctis Nova 5P Wireless", "Arctis Nova 5P", { connection: "2.4GHz and Bluetooth 5.3", mic: "Retractable ClearCast 2.X" }, ["on-ear ChatMix and Quick-Switch controls", "a compact USB-C dongle"]),
  F("B0F956KHT9", "SteelSeries Arctis Nova 3X Wireless", "Arctis Nova 3X", { battery: 40, weight: 260, connection: "Wireless USB-C dongle" }, ["a stretchy headband", "15 minutes of charging for up to 9 hours"]),
  F("B0F956KS26", "SteelSeries Arctis Nova 3P Wireless", "Arctis Nova 3P", { battery: 40, weight: 260, connection: "Wireless USB-C dongle" }, ["a stretchy headband", "15 minutes of charging for up to 9 hours"]),
  F("B0B7X65SX2", "SteelSeries Arctis Nova 3 (USB-C)", "Arctis Nova 3", { connection: "USB-C", mic: "ClearCast Gen 2 noise-cancelling" }, ["360-degree spatial audio", "RGB lighting"]),
  F("B0B8QMW657", "SteelSeries Arctis Nova 1P", "Arctis Nova 1P", { connection: "Wired 3.5mm", mic: "Bidirectional noise-cancelling" }, ["a 3.5mm jack for consoles"]),
  // Razer
  F("B0BY1FXC9N", "Razer BlackShark V2 Pro Wireless", "BlackShark V2 Pro", { battery: 70, driver: 50, connection: "HyperSpeed 2.4GHz wireless", mic: "Detachable" }, ["TriForce Titanium 50mm drivers"]),
  F("B0F3QDLZKG", "Razer BlackShark V3 Pro Wireless ANC", "BlackShark V3 Pro", { driver: 50, connection: "2.4GHz, Bluetooth 5.3, USB, 3.5mm", mic: "Detachable HyperClear Full Band" }, ["hybrid active noise cancellation", "THX Spatial Audio with 7.1.4 surround"]),
  F("B0GHBFJKZ4", "Razer BlackShark V3 Wireless (Xbox)", "BlackShark V3 Xbox", { driver: 50, connection: "2.4GHz and Bluetooth", mic: "Detachable HyperClear Super Wideband" }, ["TriForce Titanium Gen-2 drivers", "7.1.4 surround on PC"]),
  F("B09PZG4R17", "Razer BlackShark V2 X", "BlackShark V2 X", { driver: 50, weight: 240, connection: "Wired 3.5mm" }, ["passive noise cancellation", "memory foam ear cushions"]),
  F("B0D9ZV97P6", "Razer Kraken V4 Wireless", "Kraken V4", { driver: 40, connection: "2.4GHz, Bluetooth, USB", mic: "Retractable HyperClear Super Wideband" }, ["THX Spatial Audio with 7.1 surround", "a game and chat mix dial"]),
  F("B0D9ZQTZ8N", "Razer Kraken V4 X", "Kraken V4 X", { driver: 40, connection: "Wired USB-C and USB-A", mic: "Retractable HyperClear cardioid" }, ["7.1 surround sound"]),
  F("B0DG3L8WMM", "Razer Kraken V4 Pro", "Kraken V4 Pro", { driver: 40, connection: "2.4GHz, Bluetooth, USB, 3.5mm", mic: "Retractable HyperClear Super Wideband" }, ["an OLED control hub", "TriForce Bio-Cellulose drivers"]),
  F("B0DN85FTCN", "Razer Kraken V4 Wireless (40mm)", "Kraken V4 40mm", { driver: 40, connection: "2.4GHz, Bluetooth, USB", mic: "Retractable super wideband" }, ["9-zone RGB lighting"]),
  F("B0FJ4JBW5J", "Razer Kraken Kitty V3 Pro", "Kraken Kitty V3 Pro", { driver: 40, connection: "2.4GHz, Bluetooth 5.3, USB", mic: "Retractable HyperClear Super Wideband" }, ["removable Kitty ears with RGB", "THX Spatial Audio"]),
  F("B0DJDZG9KJ", "Razer Barracuda X Chroma", "Barracuda X Chroma", { driver: 40, weight: 285, connection: "2.4GHz and Bluetooth simultaneously", mic: "Detachable HyperClear cardioid" }, ["Chroma RGB lighting"]),
  F("B09XZXRFPX", "Razer Barracuda X Wireless", "Barracuda X", { battery: 50, driver: 40, weight: 250, connection: "2.4GHz or Bluetooth", mic: "Detachable HyperClear cardioid" }, ["a 250g ergonomic design"]),
  F("B0D7YMGSDX", "Razer Kraken Kitty V2 BT", "Kraken Kitty V2 BT", { battery: 40, driver: 40, connection: "Bluetooth 5.2", mic: "Beamforming" }, ["Kitty ears with Chroma RGB", "a Bluetooth gaming mode"]),
  // Logitech
  F("B0DMQ16T9R", "Logitech G Pro X 2 Lightspeed", "G Pro X 2", { battery: 50, driver: 50, connection: "Lightspeed, Bluetooth, USB, 3.5mm", mic: "Detachable 6mm cardioid" }, ["50mm graphene drivers", "DTS Headphone:X 2.0"]),
  F("B081PP4CB6", "Logitech G Pro X Wireless Lightspeed", "G Pro X Wireless", { connection: "Lightspeed 2.4GHz" }, ["a choice of leatherette or breathable ear pads", "passive noise isolation"]),
  F("B0G12HGD6R", "Logitech G325 Lightspeed", "G325", { weight: 212, connection: "Lightspeed 2.4GHz, Bluetooth" }, ["a 212g lightweight build", "Bluetooth for handhelds"]),
  F("B08KKZ8S36", "Logitech G335 Wired", "G335", { driver: 40, weight: 240, connection: "Wired 3.5mm", mic: "Flip-to-mute" }, ["a suspension headband", "a colourful, lightweight build"]),
  F("B08XB57J8Z", "Logitech G733 Lightspeed", "G733", { weight: 278, connection: "Lightspeed 2.4GHz", mic: "Blue VO!CE" }, ["a suspension headband", "Lightsync RGB"]),
  F("B0FFXZ9XQ4", "Logitech G Astro A20 X", "Astro A20 X", { driver: 40, connection: "Lightspeed, Bluetooth, USB-C wired" }, ["PRO-G audio drivers", "a weight under 300g"]),
  F("B08KY2WFGP", "Logitech G535 Lightspeed", "G535", { battery: 33, driver: 40, weight: 236, connection: "Lightspeed 2.4GHz" }, ["a 236g build", "a flip-to-mute mic"]),
  F("B0GD2N1R2J", "Logitech G Astro A50 with Base Station", "Astro A50", { battery: 24, driver: 40, connection: "Wireless base station, Bluetooth" }, ["a PLAYSYNC audio switcher base station", "Bluetooth dual-device mixing"]),
  // Corsair
  F("B0FWRXJR85", "Corsair HS80 RGB Wireless", "HS80 RGB Wireless", { driver: 50, connection: "Slipstream 2.4GHz wireless" }, ["Dolby Atmos support", "custom-tuned neodymium drivers"]),
  F("B0D5Z1C5TB", "Corsair HS80 MAX Wireless", "HS80 MAX", { battery: 65, connection: "2.4GHz and Bluetooth" }, ["130 hours on Bluetooth with RGB off", "Dolby Atmos"]),
  F("B09YHQWHKV", "Corsair HS80 RGB USB", "HS80 RGB USB", { driver: 50, connection: "Wired USB" }, ["Dolby Audio 7.1"]),
  F("B0BSNZFWYC", "Corsair HS55 Wireless", "HS55 Wireless", { battery: 24, driver: 50, weight: 266, connection: "2.4GHz and Bluetooth" }, ["Dolby 7.1 surround", "adjustable leatherette ear pads"]),
  F("B0GY57QM6L", "Corsair HS35 v3 Wireless", "HS35 v3 Wireless", { battery: 30, connection: "2.4GHz, Bluetooth, wired", mic: "Detachable omnidirectional" }, ["three connection modes"]),
  F("B0DG8WY6MX", "Corsair Virtuoso MAX Wireless", "Virtuoso MAX", { driver: 50, connection: "Simultaneous 2.4GHz and Bluetooth" }, ["50mm graphene drivers", "active noise cancellation and Dolby Atmos"]),
  F("B0FL2N7G8V", "Corsair Void v2 MAX Wireless", "Void v2 MAX", { battery: 70, driver: 50, connection: "2.4GHz and Bluetooth simultaneously" }, ["70 hours over 2.4GHz"]),
  F("B09BXZKNDB", "Corsair Virtuoso RGB Wireless XT", "Virtuoso XT", { driver: 50, connection: "Slipstream wireless, Bluetooth aptX HD", mic: "Detachable 9.5mm omnidirectional" }, ["broadcast-grade detachable mic"]),
  F("B0CY5VSLL3", "Corsair HS35 Surround v2", "HS35 Surround v2", { driver: 50, connection: "Wired 3.5mm", mic: "Flexible omnidirectional" }, ["Dolby 7.1 surround"]),
  F("B09YHQ3Y61", "Corsair HS65 Surround", "HS65 Surround", { driver: 50, weight: 282, connection: "Wired 3.5mm" }, ["Dolby 7.1 surround"]),
  // HyperX
  F("B0DQQT2ZS3", "HyperX Cloud III (wired)", "Cloud III", { driver: 53, connection: "Wired (USB and 3.5mm)", mic: "Noise-cancelling" }, ["angled 53mm drivers", "memory foam ear cushions"]),
  F("B0FP1SW8P5", "HyperX Cloud Flight 2", "Cloud Flight 2", { battery: 100, connection: "2.4GHz, Bluetooth" }, ["up to 150 hours over Bluetooth", "an Instant Pair mode"]),
  F("B0F844LMG3", "HyperX Cloud III S Wireless", "Cloud III S", { driver: 53, connection: "2.4GHz, Bluetooth", mic: "10mm" }, ["up to 200 hours in Bluetooth mode", "angled 53mm drivers"]),
  F("B09Z6PM1PV", "HyperX Cloud Alpha Wireless", "Cloud Alpha Wireless", { connection: "2.4GHz wireless", mic: "Noise-canceling" }, ["a dual chamber driver design", "DTS Headphone:X spatial audio"]),
  F("B0BJDQ5VHD", "HyperX Cloud Stinger 2 Wireless", "Stinger 2 Wireless", { battery: 20, connection: "2.4GHz wireless", mic: "Swivel-to-mute noise-cancelling" }, ["a swivel-to-mute microphone"]),
  F("B0BCFKG49M", "HyperX Cloud Stinger 2 Core", "Stinger 2 Core", { driver: 40, weight: 275, connection: "Wired", mic: "Swivel-to-mute" }, ["DTS Headphone:X"]),
  // ASUS
  F("B0DGZY13L6", "ASUS ROG Delta II Wireless", "ROG Delta II", { driver: 50, connection: "2.4GHz, Bluetooth, 3.5mm wired", mic: "Detachable 10mm boom" }, ["titanium-plated 50mm drivers", "24-bit/96kHz audio over 2.4GHz"]),
  F("B0CKM584T6", "ASUS ROG Delta S Wireless", "ROG Delta S Wireless", { battery: 25, driver: 50, connection: "2.4GHz and Bluetooth", mic: "AI beamforming" }, ["a 15-minute charge for 3 hours of use"]),
  F("B0DNTLYK6Z", "ASUS ROG Pelta Wireless", "ROG Pelta", { driver: 50, weight: 309, connection: "2.4GHz and Bluetooth", mic: "Detachable 10mm boom" }, ["up to 70 hours on 2.4GHz with RGB off"]),
  F("B09M17Q9QP", "ASUS TUF Gaming H1 Wireless", "TUF Gaming H1 Wireless", { driver: 40, weight: 287, connection: "2.4GHz via USB-C" }, ["virtual 7.1 surround", "a Discord-certified mic"]),
  F("B0HD4PC5T9", "ASUS ROG Pelta Core Wired", "ROG Pelta Core", { driver: 50, weight: 300, connection: "Wired", mic: "Detachable 10mm super-wideband boom" }, ["titanium-plated drivers", "game-specific EQ presets"]),
  // Turtle Beach
  F("B0DB9HZVZV", "Turtle Beach Stealth 700 Wireless", "Stealth 700", { driver: 60, connection: "2.4GHz, Bluetooth 5.2" }, ["60mm Eclipse dual drivers", "a 10-band EQ in the app"]),
  F("B0GN4NBD2V", "Turtle Beach Stealth Pro II", "Stealth Pro II", { battery: 80, driver: 60, connection: "Wireless with charging dock" }, ["active noise cancellation", "hot-swappable batteries"]),
  F("B0CYWFH5Y9", "Turtle Beach Stealth 600 Wireless", "Stealth 600", { driver: 50 }, ["50mm Nanoclear drivers", "a 10-band EQ in the app"]),
  F("B0DVZ9ZDMD", "Turtle Beach Stealth 500 Wireless", "Stealth 500", { battery: 40, driver: 40 }, ["quick charge", "a 10-band EQ in the app"]),
  F("B0CWS6WV23", "Turtle Beach Recon 70 Wired", "Recon 70", { driver: 40, connection: "Wired", mic: "Flip-to-mute" }, ["40mm speakers"]),
  F("B0D13VX3S6", "Turtle Beach Atlas Air", "Atlas Air", { battery: 50, driver: 40, weight: 301, design: "Open-back" }, ["a floating earcup", "Waves 3D Audio"]),
  // JBL, Audeze, beyerdynamic and others
  F("B09VB2JMBQ", "JBL Quantum 810 Wireless", "JBL Quantum 810", { battery: 43, driver: 50, connection: "2.4GHz wireless, Bluetooth" }, ["active noise cancelling", "a game and chat balance control"]),
  F("B0FHBT137F", "JBL Quantum 910X Wireless", "JBL Quantum 910X", { battery: 37, driver: 50 }, ["active noise cancelling", "a game and chat balance dial"]),
  F("B0GNCV2XX3", "JBL Quantum 650X", "JBL Quantum 650X", { driver: 50, mic: "6mm cardioid noise-cancelling boom" }, ["50mm carbon dynamic drivers", "customization through JBL QuantumENGINE"]),
  F("B09TBGDMCZ", "JBL Quantum 610 Wireless", "JBL Quantum 610", { battery: 40, driver: 50 }, ["a wireless over-ear design"]),
  F("B0FHBV7NCT", "JBL Quantum 360X Wireless", "JBL Quantum 360X", { battery: 22, driver: 40 }, ["a game and chat balance dial"]),
  F("B084CZDX61", "JBL Quantum 400", "JBL Quantum 400", { connection: "Wired" }, ["a Discord-certified game and chat balance dial", "JBL QuantumSURROUND and DTS"]),
  F("B09V9ZBGBB", "JBL Quantum TWS", "JBL Quantum TWS", { design: "In-ear" }, ["true adaptive noise cancelling", "an ambient-aware mode"]),
  F("B0H8VW5LMW", "Audeze Maxwell 2 (PlayStation)", "Audeze Maxwell 2", {}, ["a noise cancelling mode added to the Maxwell design"]),
  F("B0BP6BC17P", "Audeze Maxwell Wireless", "Audeze Maxwell", {}, ["a wireless gaming headset for PlayStation, Mac, PC and Switch"]),
  F("B0CYSWTLZY", "beyerdynamic MMX 300 Pro", "MMX 300 Pro", { driver: 45, connection: "Wired 3.5mm", design: "Closed-back", mic: "Condenser" }, ["a plug-in design with no software needed", "closed-back isolation"]),
  F("B0DB632R62", "beyerdynamic MMX 330 Pro", "MMX 330 Pro", { driver: 45, connection: "Wired 3.5mm", design: "Open-back", mic: "Condenser" }, ["open-back staging", "a plug-in design with no software needed"]),
  F("B0FQKZ2Q9S", "Sony INZONE H3", "INZONE H3", { connection: "Wired 3.5mm" }, ["a wired over-ear design for PS5"]),
  F("B099KPHR5B", "EPOS H3Pro Hybrid", "EPOS H3Pro", { connection: "Wireless" }, ["a built-in ANC slider"]),
  F("B09FPG6PT9", "EPOS H6Pro Open Acoustic", "EPOS H6Pro", { design: "Open-back" }, ["a lightweight headband"]),
  F("B0DSQWH9BR", "PlayStation Pulse Elite", "Pulse Elite", { connection: "Wireless" }, ["a PlayStation first-party design"]),
  F("B0B4BQH8D1", "RIG 800 Pro HX (Xbox)", "RIG 800 Pro HX", { battery: 60, driver: 40, connection: "Wireless base station", mic: "Flip-up noise-cancelling" }, ["a multi-function base station"]),
  F("B09QNNDPYZ", "Audio-Technica ATH-GDL3", "ATH-GDL3", { driver: 45, weight: 220, design: "Open-back" }, ["a sub-220g build"]),
  F("B0GHP8581X", "FIFINE H18V Lite Open Back", "FIFINE H18V Lite", { driver: 53, connection: "Wired", design: "Open-back" }, ["breathable open-back earcups"]),
  F("B0DWD3GVJL", "Skullcandy Crusher PLYR 720", "Crusher PLYR 720", { driver: 40, design: "Open-back" }, ["an open-back design", "app-based Enhanced Sound Perception"]),
  // Noise-cancelling headphones
  F("B0C3HCD34R", "Soundcore by Anker Q20i", "Soundcore Q20i", { battery: 40, driver: 40, mic: "None" }, ["hybrid active noise cancelling", "60 hours with ANC off"]),
  F("B0CCZ26B5V", "Bose QuietComfort Headphones", "Bose QuietComfort", { battery: 24, mic: "Included" }, ["noise cancelling with an awareness mode", "USB-C charging"]),
  F("B0FKCZVX5B", "Sennheiser Momentum 4 Wireless", "Momentum 4", { battery: 60, driver: 42 }, ["adaptive noise cancellation with transparency", "aptX Adaptive"]),
  F("B0F3PQHWTZ", "Sony WH-1000XM6", "WH-1000XM6", {}, ["an HD noise-cancelling processor QN3"]),
  F("B0GLMHCQ7P", "JBL Live 780NC", "JBL Live 780NC", { battery: 80 }, ["true adaptive noise cancelling 2.0", "six microphones"]),
  F("B0GTKFB6LK", "FiiO JT7 Planar Magnetic", "FiiO JT7", { design: "Over-ear planar magnetic" }, ["a 95x86mm planar driver", "a foldable lightweight design"]),
  F("B0GT6GXC7H", "Sony INZONE Buds", "INZONE Buds", { battery: 12, design: "In-ear" }, ["active noise canceling with transparency mode", "48 hours with the case"]),
]);
