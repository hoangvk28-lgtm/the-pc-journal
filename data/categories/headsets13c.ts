import pool from "@/data/pcj-pool/headsets.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { headsetFacts } from "./headsets";
import { pcHeadsetFacts } from "./peripherals";
import { withPool } from "./helpers";

/** Batch 13c headset, headphone and IEM fact sheets. Listing claims only, reviewed by hand. */
const P = pool as Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const headsets13cFacts: Record<string, Fact> = {
  ...headsetFacts,
  ...pcHeadsetFacts,
  ...withPool(P, [
    // Budget wired
    F("B01H6GUCCQ", "BENGOO G9000 Stereo Gaming Headset", "BENGOO G9000", { driver: 40, connection: "Wired 3.5mm (USB for LED only)", mic: "Omnidirectional boom" }, ["a USB plug that only powers the LED lights", "a 3.5mm plug that suits controllers and PCs", "one of the lowest prices among these headsets"]),
    F("B09TB15CTL", "Ozeino Wired Gaming Headset", "Ozeino Wired", { connection: "Wired 3.5mm (USB for LED only)", mic: "Boom mic" }, ["a 3.5mm connection for PC and consoles", "a USB plug used only for lighting", "an entry-level price tier"]),
    F("B00YXO5UKY", "Turtle Beach Recon 50 Wired Gaming Headset", "Recon 50", { driver: 40, connection: "Wired 3.5mm", mic: "Removable boom" }, ["an inline volume and mute control", "a removable mic for use as plain headphones", "a light 3.5mm design that plugs into a controller"]),
    F("B0DBLHVGV7", "WIRWTRU Wired Gaming Headset", "WIRWTRU", { driver: 40, weight: 198, connection: "Wired 3.5mm", mic: "Boom mic" }, ["a 198g frame", "ear pads described as glasses-friendly", "a 3.5mm plug for PC and consoles"]),
    F("B0FKTFMH2F", "NUBWO HG04L Wired Gaming Headset", "NUBWO HG04L", { weight: 250, connection: "Wired 3.5mm", mic: "Cardioid boom" }, ["a cardioid microphone", "a 250g frame", "a budget price tier"]),
    F("B0GF6GTTDX", "QXQ Wired Gaming Headset", "QXQ", { driver: 40, connection: "Wired 3.5mm", mic: "Flip-to-mute boom" }, ["a flip-to-mute microphone", "a 3.5mm plug for PC and consoles", "an entry-level price tier"]),
    F("B0C1GTXY5S", "IMYB A36 Wired Gaming Headset", "IMYB A36", { driver: 50, connection: "Wired 3.5mm", mic: "Boom mic" }, ["50mm drivers at a low price", "a 3.5mm connection", "an adjustable headband"]),
    F("B0D3V4HZJV", "syndesmos CM7002 Wired Gaming Headset", "CM7002", { driver: 50, connection: "Wired", mic: "ENC noise-cancelling boom" }, ["50mm drivers", "an ENC noise-cancelling microphone", "a low price tier"]),
    F("B0GS5JQDP7", "Vliveaudax USB Gaming Headset with 7.1 Surround", "Vliveaudax", { driver: 50, connection: "Wired USB sound card", mic: "Boom mic" }, ["a USB sound card", "7.1 virtual surround", "50mm drivers"]),
    F("B0BDHYF8YS", "HyperX Cloud Stinger 2 Core (PlayStation)", "Stinger 2 Core", { driver: 40, connection: "Wired 3.5mm", mic: "Swivel-to-mute boom" }, ["a swivel-to-mute microphone", "40mm directional drivers", "a lightweight over-ear design"]),
    F("B07S9FMPD2", "Turtle Beach Recon Spark Gaming Headset", "Recon Spark", { driver: 40, connection: "Wired 3.5mm", mic: "Flip-to-mute boom" }, ["a flip-to-mute mic", "40mm drivers", "a 3.5mm plug for controllers and PC"]),
    F("B0DRM949PC", "JBL Quantum 100M2 Wired Gaming Headset", "Quantum 100M2", { connection: "Wired 3.5mm", mic: "Detachable directional boom" }, ["a detachable directional mic", "a 3.5mm connection", "JBL QuantumSOUND signature tuning"]),
    F("B0CXH14PPD", "Razer BlackShark V2 X for PlayStation", "BlackShark V2 X PS", { driver: 50, weight: 240, connection: "Wired 3.5mm", mic: "HyperClear cardioid" }, ["a HyperClear cardioid mic", "a 240g frame", "50mm TriForce drivers"]),
    F("B0CXGTGPZQ", "Razer BlackShark V2 X for Xbox", "BlackShark V2 X Xbox", { driver: 50, weight: 240, connection: "Wired 3.5mm", mic: "HyperClear cardioid" }, ["a HyperClear cardioid mic", "a 240g frame", "a 3.5mm plug that works with Xbox controllers"]),
    // Budget wireless
    F("B0DK6N6ZHJ", "Redragon H888 Wireless Gaming Headset", "Redragon H888", { driver: 40, weight: 168, connection: "2.4GHz, Bluetooth, wired 3.5mm", mic: "Detachable boom" }, ["three connection modes", "a 168g frame", "a detachable microphone"]),
    F("B0C4F9JGTJ", "Ozeino Wireless Gaming Headset", "Ozeino Wireless", { battery: 40, driver: 50, connection: "2.4GHz, Bluetooth", mic: "Boom mic" }, ["50mm drivers", "2.4GHz and Bluetooth", "a budget wireless price tier"]),
    F("B08TBF4S42", "NUBWO G06 Wireless Gaming Headset", "NUBWO G06", { battery: 100, connection: "2.4GHz, Bluetooth", mic: "Boom mic" }, ["up to 100 hours of listed battery life", "2.4GHz and Bluetooth modes", "a budget wireless price tier"]),
    F("B0HGR4SDYC", "AOC Wireless Gaming Headset", "AOC", { battery: 45, driver: 50, connection: "2.4GHz, Bluetooth 6.0, wired 3.5mm", mic: "Detachable boom" }, ["three connection modes including Bluetooth 6.0", "a detachable microphone", "50mm drivers"]),
    F("B0CLLJC6QC", "Valorise Wireless Gaming Headset", "Valorise", { battery: 45, connection: "2.4GHz, Bluetooth, wired 3.5mm", mic: "Boom mic" }, ["up to 100 hours on Bluetooth", "45 hours on 2.4GHz", "a 3.5mm wired fallback"]),
    // Mid-range
    F("B09XZZQK6Q", "Razer Barracuda X Wireless", "Barracuda X", { battery: 50, driver: 40, weight: 250, connection: "2.4GHz USB-C, Bluetooth", mic: "Detachable cardioid" }, ["a USB-C dongle that suits phones and handhelds", "a detachable cardioid mic", "a 250g frame"]),
    F("B0CYWD9PSM", "Turtle Beach Stealth 600 Wireless (PlayStation)", "Stealth 600", { battery: 80, driver: 50, connection: "2.4GHz, Bluetooth 5", mic: "Flip-to-mute" }, ["up to 80 hours of listed battery life", "a flip-to-mute mic", "50mm drivers"]),
    F("B0CYWJJLBY", "Turtle Beach Stealth 500 Wireless (PlayStation)", "Stealth 500 PS", { battery: 40, driver: 40, connection: "2.4GHz, Bluetooth", mic: "Flip-to-mute" }, ["2.4GHz and Bluetooth", "a flip-to-mute mic", "a mid price tier"]),
    F("B08R8DT7X6", "Logitech G435 Lightspeed Wireless", "G435", { battery: 18, driver: 40, weight: 165, connection: "Lightspeed 2.4GHz, Bluetooth", mic: "Dual beamforming (built-in)" }, ["a 165g frame", "built-in beamforming mics instead of a boom", "a listing note that it does not support Xbox"]),
    F("B0G12K3GD6", "Logitech G325 Lightspeed Wireless", "G325", { battery: 24, weight: 212, connection: "Lightspeed 2.4GHz, Bluetooth", mic: "Beamforming boom" }, ["a 212g frame", "Lightspeed and Bluetooth", "a beamforming microphone"]),
    F("B07MRMHML9", "Logitech G432 Wired 7.1 Gaming Headset", "G432", { driver: 50, connection: "Wired USB DAC and 3.5mm", mic: "6mm flip-to-mute boom" }, ["a USB DAC with 7.1 surround", "50mm drivers", "a 6mm flip-to-mute mic"]),
    F("B081415GCS", "Logitech G733 Lightspeed Wireless", "G733", { battery: 29, driver: 40, connection: "Lightspeed 2.4GHz", mic: "Detachable with Blue VO!CE" }, ["Blue VO!CE mic filters", "a suspension headband", "Lightsync RGB"]),
    F("B0FH5YWH7B", "Razer BlackShark V3 X HyperSpeed (PC)", "BlackShark V3 X HyperSpeed", { driver: 50, weight: 270, connection: "HyperSpeed 2.4GHz, Bluetooth", mic: "9mm HyperClear" }, ["Gen-2 50mm TriForce drivers", "a 9mm HyperClear mic", "a 270g frame"]),
    F("B0FDNTH3CV", "Razer BlackShark V3 X HyperSpeed (Xbox)", "BlackShark V3 X Xbox", { driver: 50, weight: 270, connection: "HyperSpeed 2.4GHz, Bluetooth", mic: "9mm HyperClear" }, ["an Xbox-licensed version of the V3 X", "Gen-2 50mm drivers", "HyperSpeed and Bluetooth"]),
    F("B0DYVD72P2", "Corsair Void v2 Wireless", "Void v2", { battery: 70, connection: "2.4GHz, Bluetooth", mic: "Omnidirectional boom" }, ["Dolby Atmos support", "NVIDIA Broadcast mic support", "up to 70 hours of listed battery life"]),
    F("B074NBSF9N", "HyperX Cloud Alpha Wired", "Cloud Alpha", { connection: "Wired 3.5mm", mic: "Detachable, noise-cancelling" }, ["dual-chamber drivers", "a detachable mic", "an aluminum frame"]),
    F("B0FJXLBWWT", "HyperX Cloud Alpha 2 Wireless", "Cloud Alpha 2", { battery: 250, driver: 53, connection: "2.4GHz and Bluetooth simultaneously", mic: "Detachable" }, ["up to 250 hours of listed battery life", "simultaneous 2.4GHz and Bluetooth", "53mm drivers"]),
    F("B0C3BSZ56D", "HyperX Cloud III Wired (Red)", "Cloud III Red", { driver: 53, connection: "Wired USB and 3.5mm", mic: "Noise-cancelling with mute LED" }, ["angled 53mm drivers", "a mic mute LED", "USB-C, USB-A and 3.5mm options"]),
    F("B0DB7ZW7J4", "Astro A50 Wireless", "Astro A50", { driver: 40, connection: "Lightspeed base station, Bluetooth", mic: "48kHz flip-to-mute" }, ["graphene drivers", "a base station that switches between three platforms", "a charging dock"]),
    F("B08VFCH2HS", "Logitech G735 Wireless", "G735", { weight: 273, connection: "Lightspeed 2.4GHz, Bluetooth, 3.5mm", mic: "Detachable with Blue VO!CE" }, ["three connection modes", "a detachable Blue VO!CE mic", "a design the maker sizes for smaller heads"]),
    F("B0HF4JWBDP", "Turtle Beach Captain 200 Wireless (Xbox)", "Captain 200", { driver: 50, connection: "Xbox Wireless", mic: "Boom mic" }, ["Xbox Wireless without a dongle", "50mm drivers", "a mid price tier"]),
    // PlayStation
    F("B0CJH8PSBS", "Sony INZONE H5 Wireless", "INZONE H5", { battery: 28, driver: 40, connection: "2.4GHz USB, wired 3.5mm", mic: "Bidirectional boom, AI noise reduction" }, ["AI-based mic noise reduction", "a 3.5mm wired option", "INZONE Hub EQ and spatial sound"]),
    F("B0B1SXW7LB", "Sony INZONE H3 Wired", "INZONE H3", { connection: "Wired 3.5mm", mic: "Flip-to-mute boom" }, ["a flip-to-mute mic", "a soft headband", "spatial sound settings in INZONE Hub"]),
    F("B0CJH3DJ36", "Sony INZONE H9 Wireless ANC", "INZONE H9", { connection: "2.4GHz and Bluetooth simultaneously", mic: "Flip-to-mute boom" }, ["active noise cancelling", "simultaneous 2.4GHz and Bluetooth", "360 Spatial Sound"]),
    F("B0FJ2WXDRY", "Sony INZONE H9 II Wireless ANC", "INZONE H9 II", { connection: "2.4GHz, Bluetooth, 3.5mm", mic: "Detachable cardioid" }, ["the driver unit from the WH-1000XM6", "a detachable cardioid mic", "active noise cancelling"]),
    F("B0FRNHBVFY", "SteelSeries Arctis Nova 7P Wireless Gen 2", "Arctis Nova 7P Gen 2", { battery: 50, connection: "2.4GHz and Bluetooth simultaneously", mic: "ClearCast Gen 2 retractable" }, ["simultaneous 2.4GHz and Bluetooth", "a USB-C dongle with USB-A adapter", "ClearCast Gen 2 noise rejection"]),
    F("B0DFS1DGXR", "SteelSeries Arctis Nova 5P Wireless", "Arctis Nova 5P", { battery: 60, connection: "2.4GHz, Bluetooth 5", mic: "Retractable ClearCast 2.X" }, ["a fully retractable mic", "6 hours of use from a 15-minute charge", "quick-switch between 2.4GHz and Bluetooth"]),
    F("B0DB9LQ7R5", "Turtle Beach Stealth 700 Wireless (PlayStation)", "Stealth 700 PS", { battery: 80, driver: 60, connection: "2.4GHz and Bluetooth 5 simultaneously", mic: "Flip-to-mute" }, ["60mm Eclipse dual drivers", "up to 80 hours of listed battery life", "simultaneous 2.4GHz and Bluetooth"]),
    // Headphones
    F("B00KNPYAEY", "EPOS Sennheiser GAME ZERO", "GAME ZERO", { connection: "Wired 3.5mm", design: "Closed-back", mic: "Flip-to-mute noise-cancelling boom" }, ["a foldable closed-back design", "memory foam ear pads", "a flexible boom mic"]),
    F("B01L1IICR2", "Sennheiser HD 599 Open-Back Headphones", "HD 599", { connection: "Wired 3.5mm and 6.3mm", design: "Open-back", mic: "None" }, ["an around-ear open-back design", "aluminum voice coils", "a detachable cable"]),
    F("B00IT0IHOY", "Sennheiser HD 280 Pro Headphones", "HD 280 Pro", { connection: "Wired 3.5mm", design: "Closed-back", mic: "None" }, ["up to 32 dB of listed passive attenuation", "a closed design for shared rooms", "a foldable frame"]),
    F("B08TCKRRMD", "Sennheiser IE 100 PRO In-Ear Monitors", "IE 100 PRO", { driver: 10, connection: "Wired 3.5mm", design: "In-ear", mic: "None" }, ["a 10mm dynamic broadband transducer", "a slim single-driver shell", "a detachable cable"]),
    F("B0011UB9CQ", "beyerdynamic DT 990 Pro (250 Ohm)", "DT 990 Pro", { connection: "Wired, 250 ohm", design: "Open-back", mic: "None" }, ["a 250-ohm load suited to audio interfaces", "an open-back stereo image", "a studio reference design"]),
    F("B0016MNAAI", "beyerdynamic DT 770 Pro (80 Ohm)", "DT 770 Pro", { connection: "Wired, 80 ohm, 3m cable", design: "Closed-back", mic: "None" }, ["closed-back isolation", "an 80-ohm load", "a 3m cable with a 1/4-inch adapter"]),
    F("B00HVLUR86", "Audio-Technica ATH-M50x", "ATH-M50x", { driver: 45, connection: "Wired, detachable cables", design: "Closed-back", mic: "None" }, ["45mm large-aperture drivers", "detachable cables", "a closed-back studio design"]),
    F("B00HVLUR54", "Audio-Technica ATH-M40x", "ATH-M40x", { driver: 40, connection: "Wired, detachable cables", design: "Closed-back", mic: "None" }, ["40mm drivers", "90-degree swiveling earcups", "detachable cables"]),
    F("B000AJIF4E", "Sony MDR7506", "MDR7506", { driver: 40, connection: "Wired 3.5mm and 6.3mm", design: "Closed-back", mic: "None" }, ["40mm drivers with neodymium magnets", "a closed design", "a foldable build"]),
    F("B08B477BHS", "Philips Open-Back Wired Headphones", "Philips Open-Back", { driver: 50, connection: "Wired 3.5mm with 6.3mm adapter", design: "Open-back", mic: "None" }, ["50mm drivers", "an open-back design", "a 6.3mm adapter"]),
    F("B09FPFN78X", "EPOS H6Pro Open Acoustic", "H6Pro Open", { connection: "Wired 3.5mm", design: "Open-back", mic: "Detachable boom" }, ["an open acoustic design", "a slimmer boom mic", "a detachable mic for use with a separate microphone"]),
    // IEMs
    F("B07QKT3BKR", "KZ ZS10 Pro In-Ear Monitors", "KZ ZS10 Pro", { driver: 10, connection: "Wired 3.5mm", design: "In-ear, 4BA+1DD hybrid", mic: "None" }, ["a five-driver hybrid per side", "four balanced armatures", "a detachable cable"]),
    F("B0FXWW14WZ", "KZ ZS12 PRO 2 USB-C In-Ear Monitors", "KZ ZS12 PRO 2", { driver: 10, connection: "Wired USB-C", design: "In-ear, 5BA+1DD hybrid", mic: "Included" }, ["a six-driver hybrid per side", "a USB-C plug", "a 10mm dynamic bass driver"]),
    F("B0FY5PG8FP", "Kiwi Ears Belle In-Ear Monitors", "Kiwi Ears Belle", { driver: 10, connection: "Wired 3.5mm", design: "In-ear", mic: "None" }, ["a 10mm DLC dynamic driver", "silver-plated cables", "individually matched drivers"]),
    F("B0DWFNMXWY", "CCZ DC03 In-Ear Monitors with Mic", "CCZ DC03", { driver: 10, connection: "Wired 3.5mm", design: "In-ear", mic: "Inline mic" }, ["a 10mm dynamic driver", "an inline mic", "an ear-hook design"]),
    F("B0CRP76PVM", "Moondrop CHU II DSP USB-C In-Ear Monitors", "CHU II DSP", { connection: "Wired USB-C", design: "In-ear", mic: "Inline mic" }, ["a USB-C DSP cable", "an inline mic", "a 0.78mm interchangeable cable"]),
    F("B0HF87N5VC", "Moondrop CHU III In-Ear Monitors", "CHU III", { connection: "Wired 3.5mm", design: "In-ear", mic: "None" }, ["an Al-Mg alloy dome diaphragm", "a small bean-shaped shell", "a 0.78mm 2-pin detachable cable"]),
    F("B0B76YF5CY", "7Hz Salnotes Zero In-Ear Monitors", "7Hz Zero", { driver: 10, connection: "Wired 3.5mm", design: "In-ear", mic: "None" }, ["a 10mm metal composite diaphragm", "a 0.78mm 2-pin cable", "a budget price tier"]),
    F("B09F6GM145", "KZ ZSN Pro X In-Ear Monitors", "KZ ZSN Pro X", { connection: "Wired 3.5mm", design: "In-ear, 1BA+1DD hybrid", mic: "None" }, ["a 1BA+1DD hybrid", "a gold-plated 3.5mm plug", "a detachable cable"]),
    F("B0CM3GGZDZ", "TRUTHEAR x Crinacle Zero:RED", "Zero:RED", { driver: 10, connection: "Wired 3.5mm", design: "In-ear, dual dynamic", mic: "None" }, ["dual dynamic drivers (10mm and 7.8mm)", "a dual-cavity magnetic circuit", "a detachable cable"]),
    F("B0DZH9BHDW", "TRUTHEAR x Crinacle Zero:BLUE2", "Zero:BLUE2", { driver: 10, connection: "Wired 3.5mm", design: "In-ear, dual dynamic", mic: "None" }, ["dual dynamic drivers", "a detachable cable", "a silica diaphragm on the 10mm driver"]),
    F("B0D5QYNSW3", "TRUTHEAR GATE In-Ear Monitors with Mic", "TRUTHEAR GATE", { driver: 10, connection: "Wired 3.5mm", design: "In-ear", mic: "Inline mic" }, ["a 10mm N52 dynamic driver", "a version with an inline mic", "a 0.78mm 2-pin cable"]),
    F("B0CM3G6LJP", "TRUTHEAR Hexa In-Ear Monitors", "Hexa", { connection: "Wired, 0.78mm 2-pin", design: "In-ear, 1DD+3BA hybrid", mic: "None" }, ["a 1DD+3BA hybrid", "a 3D-printed cavity", "a 0.78mm 2-pin cable"]),
    F("B0D48T85PQ", "Yeabomy AK3FILE Wired Gaming Earbuds", "Yeabomy AK3FILE", { driver: 10, connection: "Wired 3.5mm", design: "In-ear" }, ["a 10mm dynamic driver", "a listing aimed at music, gaming and video calls", "the lowest price tier here"]),
  ]),
};
