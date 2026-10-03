import pool from "@/data/pcj-pool/speakers.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 28 speaker fact sheets for speaker13eSchema: Logitech, Creative, Edifier, Kanto, Audioengine, Razer,
 * SteelSeries and Klipsch desktop speakers, a few soundbars, and studio-monitor pairs from PreSonus, Yamaha, JBL,
 * KRK, Kali, Mackie and M-Audio. Listing titles and bullets only, reviewed by hand. `peak` is recorded only where the
 * listing calls the figure peak power; RMS figures go in the notes. Renewed, bundle and colour-duplicate listings are
 * skipped.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const expand28SpeakerFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  // Logitech
  F("B091FSM3R3", "Logitech Z407", "Z407", { form: "2.1 with subwoofer", peak: 80, sub: "Ported down-firing subwoofer", inputs: "Bluetooth, USB, 3.5mm" }, ["40W RMS", "a wireless control puck", "three connected devices at once"]),
  F("B003VAHYTG", "Logitech Z623", "Z623", { form: "2.1 with subwoofer", peak: 400, sub: "Separate subwoofer", inputs: "3.5mm, RCA" }, ["200W RMS", "THX certification"]),
  F("B011O613W2", "Logitech Z533", "Z533", { form: "2.1 with subwoofer", peak: 120, sub: "Front-facing subwoofer" }, ["60W RMS"]),
  F("B004M18O60", "Logitech Z906", "Z906", { form: "5.1 with subwoofer", peak: 1000, sub: "Separate subwoofer", inputs: "Digital optical, coaxial, 3.5mm, RCA" }, ["500W RMS", "THX, Dolby and DTS decoding"]),
  F("B074KJ6JQW", "Logitech Z207", "Z207", { form: "Stereo pair", inputs: "Bluetooth 4.2, 3.5mm", sub: "None" }, ["on-speaker pairing and volume controls"]),
  F("B01JPOLLKE", "Logitech Z625", "Z625", { form: "2.1 with subwoofer", peak: 400, sub: "Separate subwoofer", inputs: "Optical, 3.5mm, RCA" }, ["200W RMS", "THX certification"]),
  // Creative
  F("B09F9GTKL8", "Creative Pebble V3", "Pebble V3", { form: "Stereo pair", peak: 16, inputs: "USB-C, USB-A, Bluetooth 5.0", sub: "None" }, ["8W RMS", "2.25-inch full-range drivers"]),
  F("B0DG2CQ728", "Creative Pebble Pro", "Pebble Pro", { form: "Stereo pair", peak: 20, inputs: "USB-C", sub: "None", extras: "RGB rings" }, ["10W RMS over USB-C"]),
  F("B0CT8HLXBM", "Creative Pebble X", "Pebble X", { form: "Stereo pair", peak: 30, inputs: "USB-C, Bluetooth 5.3", sub: "None", extras: "RGB lighting" }, ["15W RMS", "more power from a 30W USB PD adapter"]),
  F("B07NWLWM9B", "Creative Pebble Plus", "Pebble Plus", { form: "2.1 with subwoofer", sub: "4in down-firing ported subwoofer", inputs: "USB power, 3.5mm" }, ["8W RMS with a 5V 2A adapter"]),
  F("B001S14DYO", "Creative GigaWorks T40 Series II", "GigaWorks T40 II", { form: "Stereo pair", sub: "None, BasXPort tuning" }, ["front access to controls"]),
  F("B08ZC45CQD", "Creative T60", "T60", { form: "Stereo pair", peak: 60, inputs: "USB-C, Bluetooth 5.0, 3.5mm headset", sub: "None" }, ["30W RMS", "a clear dialog mode"]),
  // Edifier
  F("B0719C132V", "Edifier R1280DB", "R1280DB", { form: "Bookshelf stereo pair", woofer: 4, inputs: "Bluetooth, optical, coaxial", sub: "None" }, ["a 13mm silk dome tweeter"]),
  F("B016P9HJIA", "Edifier R1280T", "R1280T", { form: "Bookshelf stereo pair", woofer: 4, sub: "None" }, ["a 13mm silk dome tweeter", "a remote control"]),
  F("B016PATXSI", "Edifier R1700BT", "R1700BT", { form: "Bookshelf stereo pair", inputs: "Bluetooth", sub: "None" }, ["33W RMS per speaker", "a 55Hz to 20kHz response"]),
  F("B09DKV849B", "Edifier MR4", "MR4", { form: "Studio monitor pair", woofer: 4, inputs: "1/4in TRS, RCA, 3.5mm", sub: "None" }, ["a 1-inch silk dome tweeter"]),
  F("B0DGXRC7MP", "Edifier MR3", "MR3", { form: "Studio monitor pair", woofer: 3.5, inputs: "Bluetooth 5.4, headphone output", sub: "None" }, ["18W RMS per speaker", "a 1-inch tweeter"]),
  F("B0F5B73RGT", "Edifier MR5", "MR5", { form: "Studio monitor pair", woofer: 5, inputs: "Bluetooth 6.0", sub: "None" }, ["110W RMS", "a 5-inch woofer, 3.75-inch mid driver and 1-inch tweeter"]),
  F("B0H2VQ581Y", "Edifier MR4.5", "MR4.5", { form: "Studio monitor pair", woofer: 4.5, inputs: "Balanced XLR and TRS, Bluetooth 6.0", sub: "None" }, ["80W RMS bi-amped", "a front headphone jack"]),
  F("B0CPSNSSB5", "Edifier QR65", "QR65", { form: "Stereo pair", inputs: "Bluetooth 5.3, USB-C", sub: "None", extras: "RGB lighting" }, ["70W RMS", "65W fast charging on each USB-C port"]),
  F("B0DNJ3CG55", "Edifier QR30", "QR30", { form: "Stereo pair", inputs: "Bluetooth 5.4", sub: "None", extras: "RGB lighting" }, ["30W RMS", "2.75-inch long-throw drivers"]),
  F("B0F93VMMSF", "Edifier G2000 Pro", "G2000 Pro", { form: "Stereo pair", peak: 64, inputs: "3.5mm, Bluetooth 5.4, USB-C, USB-A", sub: "None" }, ["32W RMS", "a backward-facing bass port"]),
  F("B09DD12HWN", "Edifier G2000", "G2000", { form: "Stereo pair", peak: 32, woofer: 2.75, inputs: "3.5mm, Bluetooth, USB", sub: "None", extras: "12 RGB effects" }, ["16W RMS", "a subwoofer output"]),
  F("B092HWYHTX", "Edifier Hecate G5000", "Hecate G5000", { form: "Stereo pair", peak: 88, inputs: "Bluetooth, 3.5mm", sub: "None", extras: "RGB lighting" }, ["Hi-Res audio certification"]),
  F("B0D95QG8W4", "Edifier M60", "M60", { form: "Stereo pair", inputs: "Bluetooth 5.3, USB-C, AUX", sub: "None" }, ["66W RMS", "1-inch silk dome tweeters and 3-inch long-throw woofers"]),
  F("B0G8DLJ1PM", "Edifier M90", "M90", { form: "Stereo pair", woofer: 4, inputs: "Bluetooth 6.0, HDMI ARC, optical, AUX, USB-C", sub: "None" }, ["100W RMS from dual Class-D amplifiers"]),
  // Kanto and Audioengine
  F("B0FKLCKYN7", "Kanto YU2", "YU2", { form: "Stereo pair", woofer: 3, inputs: "USB, AUX", sub: "None, subwoofer output" }, ["50W RMS", "a built-in USB DAC"]),
  F("B0CJ41WK2D", "Kanto ORA", "ORA", { form: "Stereo pair", inputs: "Bluetooth", sub: "None" }, ["100W of powered reference sound"]),
  F("B0DH8N25FZ", "Kanto ORA4", "ORA4", { form: "Stereo pair", woofer: 4, inputs: "USB-C, Bluetooth 5.0", sub: "None, subwoofer output" }, ["140W of bi-amplified Class-D power"]),
  F("B07PM5MHKB", "Audioengine A2 Gen 3", "Audioengine A2", { form: "Stereo pair", inputs: "USB-C, RCA, 3.5mm, Bluetooth 5.4", sub: "None" }, ["aptX HD Bluetooth"]),
  F("B01M8NUP1A", "Audioengine A2 HD (HD3)", "Audioengine HD3", { form: "Stereo pair", inputs: "USB, RCA, 3.5mm, Bluetooth aptX HD", sub: "None" }, ["a built-in USB DAC"]),
  F("B08CS1J8YW", "Audioengine HD4", "Audioengine HD4", { form: "Bookshelf stereo pair", inputs: "USB, RCA, 3.5mm, Bluetooth 5.3", sub: "None" }, ["a built-in amplifier", "aptX Adaptive Bluetooth"]),
  // Gaming speakers and soundbars
  F("B0C2XR4CC2", "Razer Nommo V2", "Nommo V2", { form: "2.1 with subwoofer", sub: "5.5in down-firing wired subwoofer", inputs: "Bluetooth", extras: "THX Spatial Audio, Chroma RGB" }, ["a wireless control pod"]),
  F("B078H1T9YD", "Razer Nommo Chroma", "Nommo Chroma", { form: "Stereo pair", woofer: 3, sub: "None", extras: "Chroma RGB, bass knob" }, ["woven glass fiber drivers", "rear-facing bass ports"]),
  F("B07DNSLL24", "Razer Nommo Pro", "Nommo Pro", { form: "2.1 with subwoofer", sub: "Down-firing subwoofer", inputs: "USB, Bluetooth 4.2, optical, 3.5mm", extras: "THX certified, LED control pod" }, ["Dolby virtual surround"]),
  F("B0CSFX9TBH", "Razer Leviathan", "Leviathan", { form: "Desktop soundbar with subwoofer", sub: "Down-firing subwoofer", inputs: "Bluetooth 5.2", extras: "THX Spatial Audio, wireless control pod" }, ["two full-range and multiple drivers in the bar"]),
  F("B09KNWMGKF", "SteelSeries Arena 9", "Arena 9", { form: "5.1 with subwoofer", sub: "6.5in subwoofer", inputs: "Bluetooth, USB", extras: "illuminated, wireless rear speakers" }, ["wireless rear speakers that connect to the subwoofer"]),
  F("B09KNYJL4R", "SteelSeries Arena 7", "Arena 7", { form: "2.1 with subwoofer", sub: "6.5in down-firing subwoofer", inputs: "USB, AUX, optical, Bluetooth", extras: "RGB lighting" }, ["a wired headset port"]),
  F("B09KNYBT4Q", "SteelSeries Arena 3", "Arena 3", { form: "Stereo pair", woofer: 4, sub: "None", inputs: "Bluetooth" }, ["4-inch drivers", "an adjustable tilt stand"]),
  F("B0G1W5JS2D", "Klipsch ProMedia Lumina 2.1", "ProMedia Lumina", { form: "2.1 with subwoofer", sub: "Low-profile subwoofer", inputs: "USB-C, AUX, Bluetooth 5.3", extras: "RGB lighting" }, ["a low-profile subwoofer"]),
  F("B0BQPPQKQ5", "JBL Bar 2.0 All-in-one (MK2)", "JBL Bar 2.0", { form: "2.1 soundbar", inputs: "Bluetooth", sub: "None" }, ["a compact 2.0-channel bar"]),
  F("B0D9YRW67H", "JBL Bar 2.1 Deep Bass MK2", "JBL Bar 2.1 Deep Bass", { form: "2.1 soundbar", sub: "6.5in wireless subwoofer", inputs: "Bluetooth" }, ["300W of total system power"]),
  F("B098825YYZ", "Bose Companion 2 Series III", "Bose Companion 2", { form: "Stereo pair", sub: "None" }, ["a 3.5mm input and PC input"]),
  F("B0145MVJUS", "Cyber Acoustics CA-3610", "CA-3610", { form: "2.1 with subwoofer", peak: 62, sub: "5.25in down-firing ported subwoofer" }, ["30W RMS", "a compact subwoofer for under-desk placement"]),
  F("B0CFZQL45H", "Cyber Acoustics CA-2890PRO", "CA-2890PRO", { form: "Desktop soundbar", inputs: "USB-C, USB-A, Bluetooth", sub: "None" }, ["20W", "a clip for monitors up to 2 inches thick"]),
  F("B094YYYFRM", "Fluance Ai41", "Fluance Ai41", { form: "Bookshelf stereo pair", inputs: "RCA, optical, Bluetooth 5.0", sub: "None, subwoofer output" }, ["a 90W amplifier", "5-inch drivers"]),
  F("B0C2YK59VQ", "Redragon GS520", "GS520", { form: "Stereo pair", sub: "None", extras: "RGB lighting" }, ["a wired 2.0 stereo build"]),
  // Studio monitors
  F("B0D2F4T9RJ", "PreSonus Eris 3.5 (pair)", "Eris 3.5", { form: "Studio monitor pair", woofer: 3.5, sub: "None" }, ["50W of built-in amplification"]),
  F("B0C88YW1ZR", "PreSonus Eris 4.5 Bluetooth", "Eris 4.5 BT", { form: "Studio monitor pair", woofer: 4.5, inputs: "Bluetooth 5.0", sub: "None" }, ["50W of Class A/B power", "a companion 8-inch subwoofer"]),
  F("B0C9LGH6HL", "PreSonus Eris 5BT", "Eris 5BT", { form: "Studio monitor pair", woofer: 5.25, inputs: "Bluetooth 5.0", sub: "None" }, ["100W of Class AB dual amplification"]),
  F("B0GT2JFDD1", "PreSonus Eris E5", "Eris E5", { form: "Studio monitor pair", woofer: 5.25, sub: "None" }, ["80W Class AB bi-amplification"]),
  F("B00II08GZK", "Yamaha HS5 (pair)", "Yamaha HS5", { form: "Studio monitor pair", woofer: 5, sub: "None" }, ["a 70W bi-amplified bass-reflex design"]),
  F("B0CKTR88Y7", "Yamaha HS4 (pair)", "Yamaha HS4", { form: "Studio monitor pair", woofer: 4.5, sub: "None" }, ["a 1-inch dome tweeter"]),
  F("B00CKX9Z92", "Yamaha HS7 (pair)", "Yamaha HS7", { form: "Studio monitor pair", woofer: 7, inputs: "XLR, TRS", sub: "None" }, ["a 95W bi-amp system"]),
  F("B0CKTSZJCV", "Yamaha HS3 (pair)", "Yamaha HS3", { form: "Studio monitor pair", woofer: 3.5, sub: "None" }, ["a 0.75-inch dome tweeter"]),
  F("B088VSBV65", "JBL 305P MkII (pair)", "JBL 305P MkII", { form: "Studio monitor pair", woofer: 5, sub: "None" }, ["a 2-way active design"]),
  F("B0787KRJ9H", "JBL 306P MkII", "JBL 306P MkII", { form: "Single studio monitor", woofer: 6.5, sub: "None" }, ["112W powered 2-way design", "magnetic shielding"]),
  F("B07ZR2G296", "JBL 104-BT (pair)", "JBL 104-BT", { form: "Studio monitor pair", woofer: 4.5, inputs: "Bluetooth 5.0, 3.5mm, RCA, TRS", sub: "None" }, ["30W per speaker"]),
  F("B0CYM2RH6W", "KRK Rokit 5 G5 (pair)", "KRK Rokit 5 G5", { form: "Studio monitor pair", woofer: 5, sub: "None" }, ["a Generation Five powered design"]),
  F("B07YZQ85T3", "KRK Rokit 7 G4 (pair)", "KRK Rokit 7 G4", { form: "Studio monitor pair", woofer: 7, sub: "None" }, ["a Generation Four powered design"]),
  F("B09P9Q9KZX", "KRK Classic 7 (pair)", "KRK Classic 7", { form: "Studio monitor pair", woofer: 7, sub: "None" }, ["a 73W active two-way design"]),
  F("B09MLT8C45", "Kali Audio LP-6 V2", "Kali LP-6 V2", { form: "Single studio monitor", woofer: 6.5, sub: "None" }, ["80W bi-amped", "a 1-inch tweeter"]),
  F("B0CSDVVYBC", "Kali Audio LP-UNF", "Kali LP-UNF", { form: "Studio monitor pair", woofer: 4.5, inputs: "Bluetooth", sub: "None" }, ["a 1-inch tweeter", "an ultra-nearfield design"]),
  F("B0B6CGCNQ1", "Kali Audio IN-5", "Kali IN-5", { form: "Single studio monitor", woofer: 5, sub: "None" }, ["a 3-way coaxial design"]),
  F("B0DFZQGZ37", "Mackie CR3.5BT (pair)", "Mackie CR3.5BT", { form: "Studio monitor pair", woofer: 3.5, inputs: "Bluetooth", sub: "None" }, ["a tone knob"]),
  F("B0DFZW2S9G", "Mackie CR4.5 (pair)", "Mackie CR4.5", { form: "Studio monitor pair", woofer: 4.5, sub: "None" }, ["a tone knob"]),
  F("B083N6HQHJ", "Mackie CR4-X (pair)", "Mackie CR4-X", { form: "Studio monitor pair", woofer: 4.5, inputs: "1/4in, 1/8in, RCA", sub: "None" }, ["50W of stereo power"]),
  F("B0FZLF2S8G", "M-Audio BX5BT (pair)", "M-Audio BX5BT", { form: "Studio monitor pair", woofer: 5, inputs: "Bluetooth 5.0", sub: "None" }, ["240W of bi-amplified power"]),
  F("B09V1FYVTB", "M-Audio BX3BT (pair)", "M-Audio BX3BT", { form: "Studio monitor pair", woofer: 3.5, inputs: "Bluetooth, 1/4in, 1/8in", sub: "None" }, ["a compact Bluetooth monitor pair"]),
  F("B09V1DNBDC", "M-Audio BX4BT (pair)", "M-Audio BX4BT", { form: "Studio monitor pair", woofer: 4.5, inputs: "Bluetooth, 1/4in, 1/8in", sub: "None" }, ["a compact Bluetooth monitor pair"]),
  F("B0DG9Z58CV", "ADAM Audio D3V", "ADAM D3V", { form: "Studio monitor pair", sub: "None" }, ["80W amplifiers"]),
  F("B01C5RZWCQ", "IK Multimedia iLoud Micro Monitor", "iLoud Micro Monitor", { form: "Studio monitor pair", inputs: "Bluetooth", sub: "None" }, ["50W RMS in total"]),
]);
