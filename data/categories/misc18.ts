import webcamPool from "@/data/pcj-pool/webcams.json";
import fanPool from "@/data/pcj-pool/fans.json";
import storagePool from "@/data/pcj-pool/storage.json";
import casePool from "@/data/pcj-pool/cases.json";
import armPool from "@/data/pcj-pool/monitor-arms.json";
import headsetPool from "@/data/pcj-pool/headsets.json";
import chairPool from "@/data/pcj-pool/chairs.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { webcams15bFacts } from "./av15b";
import { fanFacts } from "./fans";
import { ssdxFacts } from "./platform-ext";
import { caseExtFacts } from "./cases-ext";
import { arm13dFacts } from "./arms13d";
import { headsets13cFacts } from "./headsets13c";
import { chairs15cFacts } from "./chairs15c";
import { withPool } from "./helpers";

/**
 * Batch 18 fact sheets for keywords that had no products: webcams with tripods or ring lights, quiet and 140mm fans,
 * 2230 SSDs, Phanteks cases, triple monitor arms, planar magnetic headphones and chairs (speakers, white, pink).
 * Listing claims only. Dropped: a "140mm" Phanteks T30 listing whose bullets give 120mm, adapters and accessory kits,
 * OEM pulls with no speed figures, and a cooling-fan chair (only one listing).
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const webcams18Facts: Record<string, Fact> = {
  ...webcams15bFacts,
  ...withPool(webcamPool as Pool, [
    F("B0D81H5TM8", "OBSBOT Tiny 2 Lite 4K PTZ Webcam with Mini Tripod", "Tiny 2 Lite", { res: "4K", sensor: "1/2in CMOS", focus: "PTZ AI tracking with auto zoom" }, ["a mini tripod in the box", "close-up and upper-body tracking modes", "preset PTZ positions"]),
    F("B0DS2JXD26", "OBSBOT Tiny SE 1080p PTZ Webcam with Mini Tripod", "Tiny SE with tripod", { res: "1080p100", fps: 120, focus: "PDAF, PTZ AI tracking" }, ["1080p at 100fps and 720p at 120fps", "a mini tripod in the box", "gesture control and 4x digital zoom"]),
    F("B0CP6BG9QW", "EMEET C960 4K Webcam with Tripod", "C960 4K with tripod", { res: "4K" }, ["a tripod adjustable from 6.7 to 18.5 inches", "a 360-degree swivel head", "a 1/4-inch screw for other cameras"]),
    F("B0DQD5844Q", "Pro QHD 2K 60fps Webcam with Tripod", "2K60 webcam with tripod", { res: "2K60", fps: 60, focus: "Autofocus" }, ["a tripod in the box", "dual microphones with a 10-foot pickup", "low-light correction"]),
    F("B0DQCW3L6D", "Pro HD 1080p 30fps Webcam with Tripod", "1080p webcam with tripod", { res: "1080p30", fps: 30, focus: "Autofocus" }, ["a tripod in the box", "dual noise-reducing microphones", "low-light correction"]),
    F("B08VJ25PL1", "Tewiky Full HD Webcam with Rotatable Tripod", "Tewiky", { res: "1080p30", fps: 30, privacy: "Privacy cover" }, ["a rotatable tripod", "a wide-angle lens", "a noise-cancelling microphone"]),
    F("B0F5QJZH1Q", "Galyimage 4K Webcam with Ring Light", "Galyimage ring light", { res: "4K30, 1080p60", fps: 60, focus: "TOF autofocus" }, ["a built-in ring light with three color temperatures", "dual noise-cancelling microphones", "stepless dimming"]),
    F("B0GYQXZKZM", "Angetube 967 Ultra 4K Webcam with Ring Light", "Angetube ring light", { res: "4K30, 1080p60", fps: 60, privacy: "Privacy shutter" }, ["a built-in ring light with three brightness levels", "a privacy shutter", "4K at 30fps or 1080p at 60fps"]),
  ]),
};

export const fans18Facts: Record<string, Fact> = {
  ...fanFacts,
  ...withPool(fanPool as Pool, [
    F("B092DNHCGT", "Noctua NF-A12x25 LS-PWM 120mm", "NF-A12x25 LS-PWM", { pack: 1, rpm: 1200, noise: "12.1 dB(A)", zero: true, argb: "None" }, ["a 12.1 dB(A) maximum", "a fan that stops at 0% PWM", "a low-speed 1200 RPM maximum"]),
    F("B0FC63C7TG", "Noctua NF-A12x25 G2 LS-PWM 120mm", "NF-A12x25 G2 LS-PWM", { pack: 1, rpm: 1100, zero: true, argb: "None" }, ["a 1100 RPM maximum for ultra-quiet builds", "a fan that stops at 0% PWM", "anti-vibration mounts and a radiator gasket"]),
    F("B07CG2PGY6", "Noctua NF-P12 redux-1700 PWM 120mm", "NF-P12 redux", { pack: 1, rpm: 1700, noise: "25.1 dB(A)", argb: "None" }, ["a pressure-optimised blade design", "a rated life above 150,000 hours", "a low price for a Noctua fan"]),
    F("B0FVXTFQCC", "ARCTIC P12 Pro LN 5-Pack 120mm", "P12 Pro LN 5-pack", { pack: 5, rpm: 2000, bearing: "Fluid-dynamic", zero: true, argb: "None" }, ["a low-noise tuning from 450 to 2000 RPM", "five fans in the box", "a fan that stops below 5% PWM"]),
    F("B00CP6QLY6", "Noctua NF-A14 PWM 140mm", "NF-A14 PWM", { pack: 1, rpm: 1500, noise: "24.6 dB(A)", argb: "None" }, ["a 140mm square frame suited to radiators", "Flow Acceleration Channels", "a rated life above 150,000 hours"]),
    F("B0DDY14DQD", "Noctua NF-A14x25 G2 PWM 140mm", "NF-A14x25 G2", { pack: 1, rpm: 1500, argb: "None" }, ["a 300 to 1500 RPM range", "a Progressive-Bend impeller", "a 140mm fan for cases, coolers and radiators"]),
    F("B00KF7O58G", "Noctua NF-P14s redux-1500 PWM 140mm", "NF-P14s redux", { pack: 1, rpm: 1500, noise: "25.8 dB(A)", argb: "None" }, ["a square frame for radiators", "a rated life above 150,000 hours", "a lower price than the NF-A14"]),
    F("B0BSLKR3LH", "Thermalright TL-C14 140mm PWM Fan", "TL-C14", { pack: 1, rpm: 1500, cfm: 74.3, pressure: 2.0, noise: "26.6 dB(A)", bearing: "S-FDB", argb: "None" }, ["74.3 CFM of rated airflow", "an S-FDB bearing", "a budget price"]),
    F("B0DGGKQFM6", "Thermalright TL-C14C-S X3 140mm ARGB 3-Pack", "TL-C14C-S X3", { pack: 3, rpm: 1500, cfm: 75.8, pressure: 1.93, noise: "26.4 dB(A)", bearing: "S-FDB", argb: "ARGB" }, ["three 140mm ARGB fans", "75.8 CFM of rated airflow", "an S-FDB bearing"]),
    F("B0D49P65L2", "CORSAIR RS140 140mm PWM Fan Dual Pack", "RS140 2-pack", { pack: 2, rpm: 1700, cfm: 95.5, bearing: "Magnetic dome", argb: "None" }, ["daisy-chain connection from one header", "95.5 CFM of rated airflow", "AirGuide anti-vortex vanes"]),
    F("B0B74CP6X2", "be quiet! Silent Wings Pro 4 140mm PWM High-Speed", "Silent Wings Pro 4 140mm", { pack: 1, rpm: 3000, argb: "None" }, ["a speed switch for medium, high and ultra-high modes", "a funnel-shaped outlet for high pressure", "a 6-pole motor"]),
  ]),
};

export const ssd18Facts: Record<string, Fact> = {
  ...ssdxFacts,
  ...withPool(storagePool as Pool, [
    F("B0D61SDZD2", "Crucial P310 2TB M.2 2230 SSD", "P310 2TB 2230", { capacity: 2, read: 7100, write: 6000, pcie: "PCIe 4.0 x4 (M.2 2230)" }, ["an M.2 2230 size for the Steam Deck and ROG Ally", "listed compatibility with the Steam Deck, ROG Ally and Surface", "7,100MB/s rated reads"]),
    F("B0DBPTR3G3", "Fikwot FX953 1TB M.2 2230 SSD", "FX953 1TB 2230", { capacity: 1, read: 5000, pcie: "PCIe 4.0 x4 (M.2 2230)" }, ["an M.2 2230 size", "a graphite heat-spreader label", "listed use in the Steam Deck"]),
    F("B0C4KVG7R6", "TEAMGROUP MP44S 1TB M.2 2230 SSD", "MP44S 1TB 2230", { capacity: 1, read: 5000, write: 3500, pcie: "PCIe 4.0 x4 (M.2 2230)" }, ["an M.2 2230 size", "an SLC cache", "a graphene heat-dissipation label"]),
  ]),
};

export const cases18Facts: Record<string, Fact> = {
  ...caseExtFacts,
  ...withPool(casePool as Pool, [
    F("B0GSC8FM8R", "Phanteks EX5 ATX Multi-Chamber Case", "EX5", { rad: 360, fans: 1, boards: "ATX, Micro-ATX" }, ["a multi-chamber layout that feeds each component fresh air", "one S25-120 fan included", "support for 360mm AIO coolers"]),
    F("B0GSBW9HZT", "Phanteks EX5 Plus with 360 AIO", "EX5 Plus", { rad: 360, fans: 1, boards: "ATX, Micro-ATX" }, ["a 360mm AIO cooler included", "a multi-chamber layout", "one extra chassis fan included"]),
    F("B0GSBQKQPH", "Phanteks EX5 MAX with 360 LCD AIO", "EX5 MAX", { rad: 360, fans: 1, boards: "ATX, Micro-ATX" }, ["a 360mm AIO with a 6-inch LCD included", "a multi-chamber layout", "one extra chassis fan included"]),
    F("B086YM73V2", "Phanteks XT View Matrix Mid-Tower", "XT View Matrix", { boards: "ATX, rear-connector ATX", glass: "Tempered glass front and side", usbc: true }, ["a 600-LED matrix display on the front", "support for rear-connector motherboards", "a front USB-C 3.2 Gen 2 port"]),
    F("B0HH1NR49J", "Phanteks Enthoo Pro 2 Server V2 Full Tower", "Enthoo Pro 2 Server", { rad: 480, boards: "Up to SSI-EEB" }, ["all-metal mesh panels", "support for 480mm and 360mm radiators and 11 PCI slots", "room for up to 10 HDDs or 11 SSDs"]),
  ]),
};

export const arms18Facts: Record<string, Fact> = {
  ...arm13dFacts,
  ...withPool(armPool as Pool, [
    F("B084RF63FK", "HUANUO Triple Monitor Mount (17-32 in)", "HUANUO triple 32", { screen: 32, screens: "3", mount: "Clamp or grommet" }, ["arms for three 17 to 32 inch screens", "swivel, tilt and rotation", "clamp or grommet mounting"]),
    F("B07VRB86RQ", "WALI Triple Monitor Mount (13-32 in)", "WALI triple", { screen: 32, load: 19.8, screens: "3", mount: "Dual C-clamp" }, ["a dual C-clamp for stability", "19.8 lbs per arm", "fit for flat or curved screens"]),
    F("B0CHMPTPW4", "HUANUO Triple Monitor Mount (13-27 in)", "HUANUO triple 27", { screen: 27, load: 19.8, screens: "3" }, ["19.8 lbs per arm", "a full range of tilt and swivel", "a lower price than HUANUO's 32-inch version"]),
    F("B0CHF3PC58", "MOUNT PRO Triple Monitor Mount (13-32 in)", "MOUNT PRO triple", { screen: 32, load: 19.8, screens: "3" }, ["a 28-inch pole reaching 36.3 inches", "tilt from +90 to -90 degrees", "fit for flat and curved screens"]),
    F("B0DX7D7QXV", "WALI Stacked Triple Monitor Mount (13-34 in)", "WALI stacked triple", { screen: 34, load: 19.8, screens: "3, stacked" }, ["a stacked layout with a 32.1-inch pole", "a maximum height of 41.4 inches", "support for 34-inch screens"]),
    F("B087BWV232", "MOUNTUP Triple Monitor Desk Mount (up to 27 in)", "MOUNTUP triple", { screen: 27, screens: "3" }, ["tilt and swivel of 90 degrees each way", "360-degree rotation", "a standing pole design"]),
    F("B0C79D7Z7T", "VIVO Triple Pneumatic Monitor Mount (17-32 in)", "VIVO triple pneumatic", { screen: 32, load: 17.6, screens: "3", spring: "Pneumatic" }, ["pneumatic arms for tool-free height changes", "17.6 lbs per arm", "a C-clamp"]),
  ]),
};

export const planar18Facts: Record<string, Fact> = {
  ...headsets13cFacts,
  ...withPool(headsetPool as Pool, [
    F("B08Z2SK5C4", "HIFIMAN HE400SE Planar Magnetic Headphones", "HE400SE", { connection: "Wired", design: "Open-back planar magnetic", mic: "None" }, ["Stealth Magnets", "a full-size open-back design", "a lower price than HIFIMAN's Sundara"]),
    F("B0BF58RZQK", "HIFIMAN SUNDARA Closed-Back Planar Headphones", "Sundara Closed-Back", { connection: "Wired", design: "Closed-back planar magnetic", mic: "None" }, ["a closed-back design that leaks less sound", "beechwood ear cups", "a detachable cable"]),
    F("B07BY82GLL", "HIFIMAN SUNDARA Planar Magnetic Headphones", "Sundara", { connection: "Wired", design: "Open-back planar magnetic", mic: "None" }, ["a diaphragm 80% thinner than the HE400 series", "a full-size over-ear design", "open-back sound"]),
    F("B09PH1N67T", "HIFIMAN Edition XS Planar Magnetic Headphones", "Edition XS", { connection: "Wired", design: "Open-back planar magnetic", mic: "None" }, ["Stealth Magnets", "a NEO supernano diaphragm", "an adjustable headband"]),
    F("B07DJ2ZBB3", "HIFIMAN Ananda Planar Magnetic Headphones", "Ananda", { connection: "Wired", design: "Open-back planar magnetic", mic: "None" }, ["high sensitivity for phones and portable players", "Stealth Magnets", "a detachable cable"]),
    F("B0GG53SPJC", "ASUS ROG Kithara Planar Magnetic Gaming Headphones", "ROG Kithara", { driver: 100, connection: "Wired", design: "Open-back planar magnetic", mic: "On-cable MEMS boom mic" }, ["100mm HIFIMAN planar drivers tuned by ROG", "a full-band MEMS boom microphone", "an open-back design"]),
    F("B0FJX4CG4M", "Fosi Audio i5 Open-Back Planar Magnetic Headphones", "Fosi i5", { driver: 97, connection: "Wired", design: "Open-back planar magnetic", mic: "None" }, ["a 97mm diaphragm", "CNC metal and walnut construction", "multi-axis pivoting ear cups"]),
  ]),
};

export const chairs18Facts: Record<string, Fact> = {
  ...chairs15cFacts,
  ...withPool(chairPool as Pool, [
    // Bluetooth speaker chairs
    F("B0HBC1SGJ4", "Mr IRONSTONE RGB Gaming Chair with Bluetooth Speakers", "IRONSTONE speaker chair", { lumbar: "Vibration lumbar cushion", footrest: "Yes" }, ["built-in Bluetooth speakers", "RGB lighting along the chair edges", "an SGS-tested gas lift"]),
    F("B0HDMVDQHY", "Mr IRONSTONE Massage Gaming Chair with Bluetooth Speakers", "IRONSTONE massage speaker chair", { lumbar: "Vibration massage", footrest: "Yes" }, ["built-in Bluetooth speakers", "vibration massage in the seat, back and lumbar", "RGB lighting"]),
    F("B0FDK6N842", "GTPLAYER Gaming Chair with Bluetooth 5.3 Speakers", "GTPLAYER BT 5.3 chair", { arms: "3D", footrest: "Yes" }, ["dual Bluetooth 5.3 speakers in the backrest", "3D adjustable armrests", "an adjustable reclining backrest"]),
    F("B0H28ZLTMD", "GTPLAYER ACE-PRO Music Gaming Chair", "GTPLAYER ACE-PRO", { recline: 150, footrest: "Yes" }, ["built-in speakers with app support and Bluetooth control", "a 150-degree recline", "a memory-foam backrest"]),
    F("B0C8TX6V7D", "RGB Gaming Chair with Bluetooth Speakers (Blue)", "RGB speaker chair", { recline: 135, arms: "Linkage", lumbar: "Massage pillow" }, ["two Bluetooth speakers", "RGB lights with a remote", "a two-motor massage lumbar pillow"]),
    F("B0G1RTTB54", "Gaming Chair with Bluetooth Speakers and Lights", "budget speaker chair", { recline: 135, footrest: "Retractable" }, ["Bluetooth-compatible speakers", "LED lights on the back and seat edge", "a retractable footrest"]),
    F("B0DRV2238Q", "GTPLAYER GTP-800 RGB Gaming Chair with Speakers", "GTP-800", { footrest: "Retractable" }, ["dual Bluetooth 5.1 speakers", "customizable RGB lighting", "a retractable padded footrest"]),
    // White and pink chairs
    F("B0C2VXW8L9", "Homall Ergonomic Gaming Chair (White)", "Homall white", { lumbar: "Massage pillow", footrest: "Yes" }, ["a white finish", "a BIFMA-certified metal base", "a massage lumbar pillow"]),
    F("B0HDK2QLF7", "JECQCUPG Gaming Chair with Footrest (Arctic White)", "Arctic White chair", { arms: "Synchronized", footrest: "Yes" }, ["an Arctic White finish", "a 51cm wingless seat", "foam and pocket-spring cushioning"]),
    F("B0GSPDRHW1", "GTPLAYER Gaming Chair (Off-White)", "GTPLAYER off-white", {}, ["an off-white finish", "a shaping-foam seat cushion", "360-degree swivel casters"]),
    F("B0DFGKV4YZ", "Yaheetech Gaming Chair (Pink and White)", "Yaheetech pink-white", { arms: "Linkage", lumbar: "Massage pillow", footrest: "Retractable" }, ["a pink and white finish", "a massage lumbar pillow", "ventilated faux leather"]),
    F("B0H5B8QYVY", "N-GEN Gaming Chair with Footrest (Pink White)", "N-GEN pink-white", { recline: 135, arms: "Linkage", footrest: "Retractable", material: "PU leather" }, ["a pink and white finish", "a 90 to 135 degree recline", "a retractable footrest"]),
    F("B0HD779T3H", "N-GEN Big and Tall Gaming Chair (Pink)", "N-GEN pink B&T", { capacity: 400, recline: 135, footrest: "Retractable" }, ["a pink finish", "a 400 lb weight capacity", "an extra-wide seat for cross-legged sitting"]),
    F("B0FXX8K1B9", "GTPLAYER Pink Cat Ear Gaming Chair", "GTPLAYER cat ear", { lumbar: "Memory-foam pillow", footrest: "Curved", material: "Velvet" }, ["a pink velvet finish with cat ears", "a memory-foam and pocket-spring seat", "a curved footrest"]),
    F("B0D9B3H7ZR", "MEENICE Pink Cat Ear Gaming Chair", "MEENICE cat ear", { recline: 145, lumbar: "Paw pillow", footrest: "Yes", material: "Fabric" }, ["a pink finish with cat ears", "a 145-degree recline", "a steel-reinforced backrest"]),
  ]),
};
