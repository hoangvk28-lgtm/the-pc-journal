import pool from "@/data/pcj-pool/acc37-desk.json";
import { withPool } from "./helpers";
import { mkSchema, F } from "./acc37-helpers";

type Pool = Record<string, { img?: string; price?: string }>;

/** Monitor light bars and standing desk mats. Figures come from each listing's title and bullets. */
export const lightBarSchema = mkSchema("monitor-light-bar", "Monitor Light Bars", [
  { key: "cri", label: "Colour rendering (CRI)", noun: "colour rendering index", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `CRI ${v}`, rule: { label: "Highest CRI", bestFor: ["Colour-sensitive work next to a monitor.", "Reading and writing at a dark desk."] }, strength: (v) => `A stated CRI of ${v}` },
  { key: "len", label: "Bar length", noun: "bar length", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v} inches` },
  { key: "temp", label: "Colour temperature", fmt: (v) => String(v), strength: (v) => `Adjustable ${v}` },
  { key: "control", label: "Controls", fmt: (v) => String(v) },
  { key: "backlight", label: "Rear backlight", fmt: (v) => (v ? "Yes" : "No"), strength: (v) => (v ? "A rear backlight that softens contrast with the wall" : undefined) },
  { key: "clamp", label: "Monitor fit", fmt: (v) => String(v) },
], (f) => {
  const s = ["It is USB powered, so plug it into a monitor USB port or a powered hub. Check the clamp's stated monitor thickness against your screen, especially on thin or curved panels."];
  if (f.specs.backlight) s.push("Its rear backlight adds ambient light behind the screen; switch it off if it reflects on your wall in a way you dislike.");
  return s;
}, [
  ["The asymmetric beam is the point", "A light bar aims light down at the desk and away from the screen. Check that the listing describes an asymmetric or anti-glare beam."],
  ["Check the clamp against your monitor", "Thin bezels, curved screens and very thick monitors need different clamps. Compare the stated thickness and curvature range."],
  ["Colour temperature and brightness range", "A wide range lets you use warm light in the evening and cool light by day. Stepless dimming gives finer control."],
  ["Auto-dimming and controls", "Auto-dimming sensors, remotes and touch controls save reaching up. Decide what you will actually use."],
  ["Backlight is optional", "A rear light reduces contrast with a dark wall but adds to the cost. Many people prefer a plain front light."],
], [
  ["Do monitor light bars reduce eye strain?", "They reduce the contrast between a bright screen and a dark room. They do not treat any medical condition."],
  ["Will it fit a curved monitor?", "Many do, within a stated curvature. Check the listing for your screen's curve."],
  ["Does it create glare on the screen?", "Asymmetric optics aim the light at the desk, so glare is limited when it is placed correctly."],
  ["How is it powered?", "Over USB, usually from the monitor or the PC."],
  ["Can I use it with a webcam on top?", "A bar and webcam compete for the clamp space on the top edge. Check the bar's camera-friendly design if you need both."],
], [
  ["Colour rendering", "We recorded CRI where the listing states it."],
  ["Size and fit", "We noted bar length and the monitor thickness and curvature the clamp accepts."],
  ["Controls", "We checked touch, remote and auto-dimming features."],
  ["Backlight", "We noted whether it has a rear backlight."],
]);

export const matSchema = mkSchema("standing-mat", "Standing Desk Mats", [
  { key: "thick", label: "Thickness", noun: "thickness", better: "higher", superlative: ["thickest", "thinnest"], fmt: (v) => `${v} inch`, rule: { label: "Thickest Cushion", bestFor: ["Long stretches of standing on a hard floor.", "Offices with tile or laminate floors."] }, strength: (v) => `${v} inch of cushioning` },
  { key: "material", label: "Material", fmt: (v) => String(v), strength: (v) => `A ${String(v).toLowerCase()} build` },
  { key: "size", label: "Size", fmt: (v) => String(v) },
  { key: "grip", label: "Floor grip", fmt: (v) => String(v) },
  { key: "warranty", label: "Warranty", fmt: (v) => String(v) },
], () => ["Place it so both feet sit on it when you stand at the desk, and check the edge is bevelled so your chair or casters do not catch on it."], [
  ["Thickness is not the whole story", "Very thick foam can feel unstable. A moderately thick mat with a firm core encourages more movement."],
  ["Size it to your stance", "You need room for both feet and a little shifting. Compare the stated dimensions against your desk's footprint."],
  ["Look for a bevelled edge", "A sloped edge reduces the chance of tripping."],
  ["Check the grip", "A non-slip base keeps the mat in place on tile and hardwood."],
  ["Cleaning and durability", "A wipeable top lasts longer in an office. Check for stated warranty length."],
], [
  ["Do I need a mat for a standing desk?", "It is a comfort accessory. People who stand for long periods on hard floors often find it useful."],
  ["Can I use a kitchen mat?", "Many are sold for both uses, but a mat made for desk use is usually firmer."],
  ["Will it work with an office chair?", "Only if you keep it clear of the chair's path, because casters can catch on mat edges."],
  ["How thick should a standing mat be?", "Around three-quarters of an inch to an inch is common."],
  ["Is it a medical product?", "No. It adds cushioning but does not treat pain."],
], [
  ["Thickness", "We recorded the stated thickness."],
  ["Material", "We noted foam, cork or leather-top construction."],
  ["Size and grip", "We noted stated dimensions and non-slip features."],
  ["Warranty", "We noted warranty terms where given."],
]);

export const lightBar37Facts = withPool(pool as Pool, [
  F("B0DK59YKRS", "BenQ ScreenBar Halo 2", "BenQ ScreenBar Halo 2", { temp: "2700K to 6500K", control: "Wireless dial controller", backlight: true, clamp: "0.17 to 2.36 inch thick, 1000R to 1800R curved" }, ["an 18-degree anti-glare front light", "automatic on and off with the monitor", "ambient light sensing and a remembered last setting"]),
  F("B0CZ9P1QW9", "BenQ ScreenBar Pro", "BenQ ScreenBar Pro", { control: "Function buttons and an ultrasonic motion sensor", clamp: "0.17 to 2.56 inch thick, 1000R to 1800R curved" }, ["over 1000lx central brightness", "a 500lx range across a 33 x 20 inch area", "asymmetric optics that avoid screen reflection"]),
  F("B076VNFZJG", "BenQ ScreenBar", "BenQ ScreenBar", { cri: 95, control: "Touch controls and auto-dimming", clamp: "0.4 to 1.2 inch thick" }, ["flicker-free, anti-blue-light-hazard LEDs", "500lx across a 23.6 x 11.8 inch area", "a counterweight clamp for ultrawide monitors"]),
  F("B0B6P9J3J5", "Quntis Monitor Light Bar Focus 20.1 inch with Remote", "Quntis Focus 20.1 inch", { len: 20.1, control: "Remote with auto-dimming and a 2-hour rest timer", clamp: "Triple-fold weighted clamp for curved and flat monitors" }, ["a 45-degree asymmetric optical design", "USB power", "a patented triple-fold clamp for curved and irregular monitors"]),
  F("B08DKQ3JG1", "Quntis Computer Monitor Light Bar (Ra98)", "Quntis Ra98 bar", { cri: 98, control: "Auto-dimming and stepless dimming" }, ["78 LED beads", "IEC/TR 62778 and IEC/EN 62471 certification", "an ambient light sensor"]),
  F("B0F9LBFHJZ", "Quntis Curved Monitor Light Bar RGB (34 inch+)", "Quntis Curved RGB bar", { len: 26, temp: "3000K to 6500K", control: "Light sensor and preset brightness levels", backlight: true, clamp: "A reinforced 3-section clamp with a silicone pad" }, ["a design for 34 inch and larger curved monitors", "a foldable dual light bar", "a precision light sensor"]),
  F("B0FT2NN862", "Quntis Monitor Light Bar Pro White (16.1 inch)", "Quntis Pro White", { len: 16.1, control: "Touch and remote with auto-dimming and a 2-hour auto-off timer", clamp: "Screen-mounted three-stage clamp" }, ["a white finish for a clean desk", "stepless dimming", "dual touch and remote control"]),
  F("B0GSPZ797T", "SAMPHON Monitor Light Bar (15.7 inch)", "SAMPHON 15.7 inch", { len: 15.7, temp: "3000K to 6500K", control: "A mechanical switch", clamp: "Counterweight clip" }, ["900 lux central brightness", "a 45-degree asymmetric beam", "stepless dimming across three colour temperatures"]),
  F("B0DRG3WXB3", "YEELIGHT Monitor Light Bar (Ra95)", "YEELIGHT bar", { cri: 95, control: "Touch control and stepless dimming" }, ["250 lumens", "a full-metal body", "a camera-friendly design"]),
  F("B09PQKBFRS", "LYMAX Monitor Light Bar with Wireless Controller", "LYMAX bar", { temp: "2900K to 6000K", control: "A wireless remote (CR2450 battery included)", clamp: "A gravity damper base rather than a pressure clamp" }, ["USB-C power with a 59 inch cord", "flicker-free light aimed at the desk", "a small wireless remote"]),
  F("B0C5JMWZC9", "Quntis Monitor Light Bar IM 15.7 inch with RGB Backlight", "Quntis IM 15.7 inch", { len: 15.7, cri: 95, temp: "3000K to 6500K", control: "Smart memory of the last mode and brightness", backlight: true, clamp: "A triangular counterweight clamp" }, ["24 RGB backlight modes", "five preset brightness levels in the front light", "an asymmetric optical design"]),
]);

export const mat37Facts = withPool(pool as Pool, [
  F("B00V3TO9EK", "Topo by Ergodriven Standing Desk Mat", "Topo", { material: "Moulded terrain surface", grip: "Can be repositioned with one foot" }, ["a terrain surface that encourages movement", "a design made specifically for standing desks", "a handle-like grab edge for moving it"]),
  F("B07X2RP4DG", "FEATOL Anti Fatigue Mat for Standing Desk (9/10 inch)", "FEATOL 9/10 inch", { thick: 0.9, material: "PU leather top over foam", grip: "Non-slip base with bevelled edges" }, ["a PU top resistant to punctures and tears", "seamless low-angle bevelled edges", "use at a standing desk, kitchen counter or workbench"]),
  F("B0797Q5HL7", "ComfiLife Anti Fatigue Floor Mat (3/4 inch)", "ComfiLife 3/4 inch", { thick: 0.75, material: "High-density memory foam", grip: "Non-slip backing" }, ["a stain-resistant surface", "a wipe-clean finish", "use at a desk, kitchen or laundry"]),
  F("B07XH8P34G", "Amazon Basics 3/4 inch Anti-Fatigue Standing Mat (32 x 20 inch)", "Amazon Basics 3/4 inch", { thick: 0.75, material: "High-grade foam", size: "32 x 20 inches" }, ["a rectangular, wipe-clean mat", "a design for standing desks and service counters", "formerly AmazonCommercial"]),
  F("B07STF3P74", "UPLIFT Desk Standing Desk Mat with Heel Grab", "UPLIFT mat", { material: "Rubberised gel foam", grip: "Textured, non-slip exterior with bevelled edges", warranty: "15 years" }, ["a heel grab shape", "an outer material that resists tears and scratches", "a 15-year all-inclusive warranty"]),
  F("B0F5NWQ5Y9", "HEALEG 1 inch Extra Thick Anti Fatigue Mat", "HEALEG 1 inch", { thick: 1, material: "140D polyurethane foam", grip: "Micro-stick non-slip bottom" }, ["a 1 inch cushion", "rolled packaging that takes time to flatten", "use at a standing desk, kitchen or workbench"]),
  F("B0GX1HBMHM", "Rocalt Cushioned Cork Standing Desk Mat", "Rocalt cork mat", { material: "Cork top, PU cushion and SBR base", grip: "SBR non-slip bottom" }, ["a built-in carry handle", "a compact round shape", "a three-layer build"]),
]);
