import webcamPool from "@/data/pcj-pool/webcams.json";
import streamingPool from "@/data/pcj-pool/streaming.json";
import lightingPool from "@/data/pcj-pool/lighting.json";
import micPool from "@/data/pcj-pool/microphones.json";
import keyboardPool from "@/data/pcj-pool/keyboards.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { str, withPool } from "./helpers";

/** Batch 13e webcams, streaming gear, LED strips and keyboard switches. Only listed claims are recorded. */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

/* ---------------- Webcams ---------------- */
export const webcam13eSchema: CategorySchema = {
  id: "webcams-13e",
  plural: "Webcams",
  fields: [
    { key: "res", label: "Top resolution", fmt: (v) => String(v) },
    { key: "fps", label: "Max frame rate", noun: "top frame rate", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v}fps` },
    { key: "sensor", label: "Sensor", fmt: (v) => String(v) },
    { key: "focus", label: "Focus and framing", fmt: (v) => String(v) },
    { key: "privacy", label: "Privacy", fmt: (v) => String(v), weakness: (v) => (/none/i.test(String(v)) ? "no built-in privacy shutter" : undefined) },
  ],
  compat: (f) => {
    const s: string[] = [];
    if (/4k/i.test(str(f, "res"))) s.push("4K output needs a USB 3 port and an app that accepts 4K; most video-call apps send 1080p or less.");
    if (/ptz|gimbal/i.test(str(f, "focus"))) s.push("Its motorized gimbal needs clearance above the monitor to tilt and pan.");
    if (/usb-c/i.test(str(f, "port"))) s.push("It connects over USB-C; use a USB-C port or the adapter the maker specifies.");
    return s;
  },
  criteria: [
    { id: "resolution", title: "Resolution versus frame rate", body: "4K helps when you crop or zoom, but streams and calls usually send 1080p. For smooth motion on stream, 1080p60 matters more than 4K30." },
    { id: "sensor", title: "Sensor size and low light", body: "A larger sensor gathers more light, so it keeps noise down in a dim room. Good lighting still helps any webcam more than a bigger sensor." },
    { id: "focus", title: "Autofocus and framing", body: "Phase-detect autofocus (PDAF) holds focus quickly. AI framing crops to follow you; a motorized PTZ gimbal physically turns the camera." },
    { id: "privacy", title: "Privacy shutter", body: "A physical shutter or lens cover gives certainty the camera is off. Gimbal cameras can often point down instead." },
    { id: "software", title: "Software controls", body: "Manual exposure, white balance and saved settings keep the image consistent across apps. Check the software runs on your system." },
    { id: "mount", title: "Mounting", body: "Most webcams clip to a monitor. A tripod thread lets you place the camera at eye level or off to the side." },
  ],
  faq: [
    { id: "4k-worth", q: "Is a 4K webcam worth it for calls?", a: "Mostly for the extra framing room and detail when cropping. Most call apps compress the image to 1080p or lower." },
    { id: "camera", q: "Should I use a camera instead?", a: "A mirrorless camera with a capture device gives a better image with more cost and setup. A good webcam is simpler for most desks." },
    { id: "mic", q: "Are webcam mics good enough?", a: "For calls, often yes. For streaming, a separate mic sounds clearer." },
    { id: "light", q: "Why does my webcam look grainy?", a: "Usually the room is too dim. Face a window or add a key light before upgrading the camera." },
    { id: "obs", q: "Do these work with OBS?", a: "Standard USB webcams appear as video sources in OBS and other streaming apps." },
    { id: "mac", q: "Do they work on a Mac?", a: "Most USB webcams work on macOS, but companion software can be Windows-only; check the product page." },
  ],
  evaluated: [
    { title: "Resolution and frame rate", description: "We recorded listed maximum resolution and frame rate." },
    { title: "Sensor", description: "We noted sensor sizes and types where listed." },
    { title: "Focus and framing", description: "We checked autofocus type, AI framing and PTZ tracking." },
    { title: "Privacy and extras", description: "We checked for shutters, microphones and software controls." },
  ],
};

export const webcam13eFacts = withPool(webcamPool as Pool, [
  F("B09NBWWP79", "Logitech Brio 4K Webcam", "Brio 4K", { res: "4K30", fps: 60, sensor: "Not stated", focus: "Autofocus, 5x digital zoom", privacy: "Privacy shade" }, ["65, 78 and 90-degree field-of-view settings", "Windows Hello face sign-in", "dual microphones"]),
  F("B0DVZG36J8", "Elgato Facecam 4K", "Facecam 4K", { res: "4K60", fps: 60, sensor: "Sony STARVIS 2", focus: "Fixed", privacy: "Lens cap" }, ["4K60 output with HDR", "49mm threads for lens filters", "onboard memory for settings"]),
  F("B0CZ6XY78Y", "OBSBOT Tiny 2 Lite 4K PTZ Webcam", "Tiny 2 Lite", { res: "4K30", sensor: "1/2in", focus: "PTZ AI tracking", privacy: "Points down" }, ["AI tracking on a motorized gimbal", "gesture control", "preset positions"]),
  F("B0DDTGY8FG", "Insta360 Link 2C 4K Webcam", "Link 2C", { res: "4K30", sensor: "1/2in", focus: "PDAF, AI auto framing", privacy: "Magnetic privacy cover" }, ["phase-detect autofocus", "HDR", "AI noise cancelling on the mic"]),
  F("B0DDTH3HX8", "Insta360 Link 2 4K PTZ Webcam", "Link 2", { res: "4K30", sensor: "1/2in", focus: "PTZ AI tracking", privacy: "Points down" }, ["a PTZ gimbal with AI tracking", "a 1/2in sensor", "gesture control"]),
  F("B0CYQ5P6T7", "EMEET S600 4K Webcam", "EMEET S600", { res: "4K30", fps: 60, sensor: "Sony 1/2.55in", focus: "PDAF", privacy: "Privacy cover" }, ["a Sony sensor", "phase-detect autofocus", "a privacy cover"]),
  F("B0FNBLG4SB", "Razer Kiyo V2 4K Webcam", "Kiyo V2", { res: "4K30", sensor: "Sony STARVIS", focus: "AI framing", privacy: "Not stated" }, ["HDR", "ISO and shutter control in Synapse", "AI framing"]),
  F("B0CW1S7XP5", "Elgato Facecam MK.2", "Facecam MK.2", { res: "1080p60", fps: 60, sensor: "Not stated", focus: "Fixed", privacy: "Privacy shutter" }, ["uncompressed 1080p60 output", "HDR at 1080p30", "a built-in privacy shutter"]),
  F("B0FNBLG4SD", "Razer Kiyo V2 X Webcam", "Kiyo V2 X", { res: "1440p60", fps: 60, sensor: "Not stated", focus: "Autofocus", privacy: "Privacy shutter" }, ["1440p at 60fps", "a built-in microphone", "a privacy shutter"]),
  F("B01LXCDPPK", "Logitech C922x Pro Stream Webcam", "C922x", { res: "1080p30", fps: 60, sensor: "Not stated", focus: "Autofocus", privacy: "None" }, ["720p60 for smoother motion", "dual microphones", "a long track record as a streaming webcam"]),
  F("B0DQ196WLW", "OBSBOT Meet SE Webcam", "Meet SE", { res: "1080p100", fps: 150, sensor: "1/2.8in", focus: "Autofocus", privacy: "Not stated" }, ["1080p at 100fps", "720p at 150fps", "a 1/2.8in sensor"]),
  F("B09XRC3N91", "Elgato Facecam", "Facecam", { res: "1080p60", fps: 60, sensor: "Not stated", focus: "Fixed", privacy: "Lens cover" }, ["an f/2.4 lens", "an 82-degree field of view", "settings stored in onboard memory"]),
  F("B0DMF4GLR8", "OBSBOT Tiny SE Webcam", "Tiny SE", { res: "1080p100", fps: 100, sensor: "Not stated", focus: "PTZ AI tracking", privacy: "Points down" }, ["PTZ AI tracking", "1080p at 100fps", "a compact gimbal"]),
]);

/* ---------------- Streaming gear ---------------- */
export const stream13eSchema: CategorySchema = {
  id: "streaming-13e",
  plural: "Streaming gear",
  fields: [
    { key: "type", label: "Type", fmt: (v) => String(v) },
    { key: "does", label: "What it does", fmt: (v) => String(v) },
    { key: "conn", label: "Connection", fmt: (v) => String(v) },
    { key: "key", label: "Key figure", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const t = str(f, "type");
    if (/capture/i.test(t)) s.push("A capture card needs the console or second PC's HDMI output and a free USB port on the streaming PC; check which USB version it needs.");
    if (/controller/i.test(t)) s.push("It needs Elgato's Stream Deck software on Windows or macOS.");
    if (/arm/i.test(t)) s.push("Check the desk edge thickness against the clamp range, and the mic's weight and thread.");
    if (/light/i.test(t)) s.push("Check its mounting method against your monitor or desk.");
    return s;
  },
  criteria: [
    { id: "capture", title: "Do you need a capture card", body: "Streaming a PC game from the same PC needs no capture card. A capture card is for consoles, a second PC or a camera." },
    { id: "controls", title: "Stream controls", body: "A Stream Deck puts scene changes, mute and alerts on physical keys. The number of keys decides how much fits on one page." },
    { id: "audio", title: "Audio first", body: "Viewers forgive a soft image sooner than bad audio. A decent mic on an arm is often the best first upgrade." },
    { id: "light", title: "Light your face", body: "A key light lets any webcam run a faster shutter and cleaner image. Mount it off to one side of the camera." },
    { id: "usb", title: "USB bandwidth", body: "Capture cards and 4K cameras use a lot of USB bandwidth. Give them their own port rather than a shared hub." },
    { id: "passthrough", title: "Passthrough for consoles", body: "Passthrough lets you play on your TV or monitor without capture delay. Check the refresh rate and HDR support it passes through." },
  ],
  faq: [
    { id: "start", q: "What should I buy first for streaming?", a: "Usually a microphone, then lighting, then a better camera. Controllers and capture cards depend on your setup." },
    { id: "obs", q: "Does this gear work with OBS?", a: "Capture cards and cameras appear as sources in OBS; Stream Deck has OBS integration." },
    { id: "console", q: "Can I stream a console without a capture card?", a: "Consoles can stream directly to some platforms, but a capture card lets you add overlays and a camera on the PC." },
    { id: "one-pc", q: "Is one PC enough to game and stream?", a: "For most games, yes, especially with hardware encoding on a modern GPU." },
    { id: "hdr", q: "Do I need HDR capture?", a: "Only if you record HDR footage. Most live streams are SDR." },
    { id: "lights", q: "How many lights do I need?", a: "One key light makes the biggest difference. A second light or backlight adds separation." },
  ],
  evaluated: [
    { title: "Role", description: "We grouped each item by what it does in a streaming setup." },
    { title: "Connection", description: "We recorded HDMI, USB and mounting details." },
    { title: "Key figures", description: "We noted resolution, key counts, reach and brightness where listed." },
    { title: "Setup needs", description: "We checked what else each item needs to work." },
  ],
};

const streamPool = { ...(streamingPool as Pool), ...(lightingPool as Pool), ...(micPool as Pool) };
export const stream13eFacts = withPool(streamPool, [
  F("B097QZGRCQ", "Logitech Litra Glow Streaming Light", "Litra Glow", { type: "Key light", does: "Front light for your face", conn: "USB", key: "TrueSoft light" }, ["TrueSoft diffused light", "a three-way monitor mount", "G HUB brightness and temperature control"]),
  F("B07K3FN5MR", "Elgato Cam Link 4K", "Cam Link 4K", { type: "Camera capture", does: "Turns a camera into a webcam", conn: "HDMI in, USB out", key: "1080p60 or 4K30" }, ["support for cameras with clean HDMI output", "1080p60 or 4K capture", "a dongle-sized body"]),
  F("B0H7WSY1TG", "Elgato Game Capture Neo", "Game Capture Neo", { type: "Game capture card", does: "Captures a console or second PC", conn: "HDMI in and out, USB", key: "1080p60 capture, 4K60 HDR passthrough" }, ["4K60 HDR passthrough", "1080p60 capture", "driver-free setup"]),
  F("B0CPFWXMBL", "Elgato 4K X Capture Card", "4K X", { type: "Game capture card", does: "Captures a console or second PC", conn: "HDMI 2.1, USB 3.2 Gen 2", key: "4K144 with VRR passthrough" }, ["HDMI 2.1", "4K at up to 144Hz", "VRR passthrough"]),
  F("B07XB6VNLJ", "Elgato HD60 S+ Capture Card", "HD60 S+", { type: "Game capture card", does: "Captures a console or second PC", conn: "HDMI in and out, USB", key: "1080p60 HDR10 capture" }, ["4K60 HDR10 passthrough", "1080p60 HDR10 capture", "Flashback recording"]),
  F("B09738CV2G", "Elgato Stream Deck MK.2", "Stream Deck MK.2", { type: "Stream controller", does: "Physical keys for scenes and actions", conn: "USB", key: "15 LCD keys" }, ["15 customizable LCD keys", "a detachable stand", "plugins for OBS and other apps"]),
  F("B0CVY4566H", "Elgato Stream Deck Neo", "Stream Deck Neo", { type: "Stream controller", does: "Physical keys for scenes and actions", conn: "USB", key: "8 keys, 2 touch points" }, ["eight LCD keys", "two touch points for page switching", "a small info bar"]),
  F("B0BJL8SJ59", "Elgato Stream Deck +", "Stream Deck +", { type: "Stream controller", does: "Keys and dials for audio and scenes", conn: "USB", key: "8 keys, 4 dials, touch strip" }, ["four dials", "a touch strip", "eight LCD keys"]),
  F("B07DYRS1WH", "Elgato Stream Deck Mini", "Stream Deck Mini", { type: "Stream controller", does: "Physical keys for scenes and actions", conn: "USB", key: "6 keys" }, ["six LCD keys", "a compact footprint", "the lowest price tier among Stream Decks"]),
  F("B0C45H4WG9", "FIFINE BM88 Low-Profile Mic Arm", "BM88 arm", { type: "Mic arm", does: "Holds a mic near your mouth", conn: "Desk clamp 0.8-2.4in", key: "29in reach" }, ["a low-profile design that stays below eye line", "1/4, 3/8 and 5/8in threads", "a clamp for desks 0.8 to 2.4in thick"]),
  F("B09JBVR5B4", "RODE PSA1+ Professional Boom Arm", "PSA1+", { type: "Mic arm", does: "Holds a mic near your mouth", conn: "Desk clamp up to 70mm", key: "Mics 0.25-1.2kg" }, ["spring damping", "support for mics from 0.25 to 1.2kg", "a clamp for desks up to 70mm"]),
  F("B0GYDFGCCQ", "Elgato Key Light Air MK.2", "Key Light Air", { type: "Key light", does: "Front light for your face", conn: "USB-C power, desk clamp 60-88cm", key: "2100 lumens" }, ["a CRI above 94", "a 2900 to 7000K range", "USB-C PD power"]),
  F("B0CVYHHPX6", "Elgato Wave Neo USB Microphone", "Wave Neo", { type: "Microphone", does: "Captures your voice", conn: "USB", key: "Tap-to-mute" }, ["tap-to-mute", "a headphone jack", "a high-rise stand"]),
]);

/* ---------------- LED strips ---------------- */
export const strip13eSchema: CategorySchema = {
  id: "led-strips-13e",
  plural: "LED strips",
  fields: [
    { key: "length", label: "Length", noun: "length", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v}ft` },
    { key: "color", label: "Color type", fmt: (v) => String(v) },
    { key: "control", label: "Control", fmt: (v) => String(v) },
    { key: "music", label: "Music sync", fmt: (v) => String(v) },
    { key: "cut", label: "Cuttable", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const c = str(f, "control");
    if (/wi-fi/i.test(c)) s.push("Wi-Fi control usually needs a 2.4GHz network; check your router before setup.");
    if (/bridge/i.test(c)) s.push("Some features need the Hue Bridge; Bluetooth control works without it at shorter range.");
    if (!/wi-fi|matter|alexa/i.test(c)) s.push("There is no voice-assistant support, so control stays in the app or remote.");
    s.push("Measure the run first and plan where the power adapter plugs in.");
    return s;
  },
  criteria: [
    { id: "rgbic", title: "RGB or RGBIC", body: "Plain RGB strips show one color at a time. RGBIC strips address segments separately, so they can show gradients and moving effects." },
    { id: "length", title: "Measure the run", body: "Measure around the desk, shelf or ceiling before buying. Longer reels often come as two halves with separate controllers." },
    { id: "control", title: "App, remote or smart home", body: "An IR remote works without setup; an app adds scenes and timers; Wi-Fi or Matter strips work with voice assistants." },
    { id: "cob", title: "COB for no dots", body: "COB strips pack LEDs so densely that the light looks continuous, which matters where the strip is visible." },
    { id: "adhesive", title: "Adhesive and mounting", body: "Clean the surface before sticking; textured walls and heat reduce adhesion. Diffuser channels hide dots and help mounting." },
    { id: "cutting", title: "Cutting and extending", body: "Cut only at marked points. Extending a strip may need the maker's connectors and can exceed the power supply." },
  ],
  faq: [
    { id: "pc-sync", q: "Can LED strips sync with my PC RGB?", a: "Only if the maker's software supports it. Most smart strips run separately from motherboard RGB." },
    { id: "cut-reuse", q: "Can I reuse a cut piece?", a: "Usually not without extra connectors and a controller; the cut end has no power input." },
    { id: "heat", q: "Do LED strips get hot?", a: "They get warm, not hot. Avoid sealing them against insulation or inside tight enclosures." },
    { id: "power", q: "Can I power them from USB?", a: "Some short strips can; longer strips need the included adapter." },
    { id: "stick", q: "Why do strips fall off?", a: "Dust, grease, textured paint and heat weaken the tape. Clean with alcohol and add clips if needed." },
    { id: "eyes", q: "Is bias lighting behind a monitor helpful?", a: "Many people find a soft backlight reduces the contrast between a bright screen and a dark room." },
  ],
  evaluated: [
    { title: "Length and type", description: "We recorded listed length and whether a strip is RGB, RGBIC or COB." },
    { title: "Control", description: "We checked app, remote, Wi-Fi and smart-home support." },
    { title: "Effects", description: "We noted music sync and scene counts." },
    { title: "Installation", description: "We checked cutting points and included covers or channels." },
  ],
};

export const strip13eFacts = withPool(lightingPool as Pool, [
  F("B0991Q94KP", "Govee RGBIC LED Strip Lights 16.4ft", "Govee 16.4ft", { length: 16.4, color: "RGBIC", control: "App, Bluetooth", music: "11 music modes, built-in mic" }, ["more than 64 scene modes", "a built-in microphone for music sync", "segment color control"]),
  F("B0991KSWN9", "Govee RGBIC LED Strip Lights 16.4ft (Alexa and Google)", "Govee 16.4ft Wi-Fi", { length: 16.4, color: "RGBIC", control: "App, Wi-Fi, Alexa, Google Assistant", music: "Yes" }, ["voice control through Alexa or Google Assistant", "AI lighting effects in the app", "segment color control"]),
  F("B099S9DXT7", "Govee RGBIC LED Strip Lights 32.8ft", "Govee 32.8ft", { length: 32.8, color: "RGBIC", control: "App, Bluetooth", music: "Yes" }, ["a 32.8ft run", "segment color control", "app scenes"]),
  F("B09YQ73BWF", "Govee RGBIC LED Strip Lights 65.6ft", "Govee 65.6ft", { length: 65.6, color: "RGBIC", control: "App", music: "Yes" }, ["a 65.6ft run for a whole room", "segment color control", "app scenes"]),
  F("B09VBZC2CX", "Govee 100ft LED Strip Lights (2 x 50ft)", "Govee 100ft", { length: 100, color: "RGB", control: "App, Wi-Fi, Alexa, Google Assistant", music: "Yes" }, ["two 50ft reels", "Alexa and Google Assistant support", "a note that it is not waterproof"]),
  F("B0D736VXNX", "Govee RGBIC LED Strip with Covers 32.8ft", "Govee with covers", { length: 32.8, color: "RGBIC", control: "App, Wi-Fi, Bluetooth", music: "Yes", cut: "Yes" }, ["60 LEDs per meter", "a diffuser channel that hides the dots", "50 color segments"]),
  F("B0H6MDZC4R", "Govee COB Strip Light 2 32.8ft", "Govee COB Strip 2", { length: 32.8, color: "COB RGBIC", control: "App, Wi-Fi, Matter, Alexa, Google, SmartThings", music: "Yes" }, ["840 LEDs per meter for a dotless line", "a 1000 to 10000K white range", "Matter support"]),
  F("B0D7M46RND", "Govee COB Strip Light Pro 9.8ft", "Govee COB Pro", { length: 9.8, color: "COB RGBICW", control: "App, Wi-Fi, Matter, HomeKit", music: "Yes", cut: "Every 8cm" }, ["1260 LEDs per meter", "a dedicated white channel", "Matter and HomeKit support"]),
  F("B07N1CMGQQ", "Govee Smart RGB LED Strip 16.4ft", "Govee smart RGB", { length: 16.4, color: "RGB (single color at a time)", control: "App, Wi-Fi, Alexa, Google Assistant", music: "Yes" }, ["150 LEDs", "Alexa and Google Assistant support", "the simplest Govee strip here"]),
  F("B09V366BDY", "KSIPZE 100ft LED Strip Lights", "KSIPZE 100ft", { length: 100, color: "RGB", control: "App, IR remote", music: "Yes" }, ["an IR remote plus app control", "music sync", "a timer"]),
  F("B0DN1K2RLD", "DAYBETTER 110ft LED Strip Lights", "DAYBETTER 110ft", { length: 110, color: "RGB", control: "App, 44-key IR remote", music: "Phone-mic sync" }, ["a 44-key IR remote", "music sync through the phone microphone", "a timer"]),
  F("B0D328GL5M", "Philips Hue Solo Lightstrip 10ft", "Hue Solo", { length: 10, color: "RGBWW", control: "App, Bluetooth, Hue Bridge (optional)", music: "Via Hue Bridge", cut: "Yes" }, ["1700 lumens", "tunable white as well as color", "use without a Bridge over Bluetooth"]),
  F("B0G3CWMTT6", "Philips Hue Essential Lightstrip 16ft", "Hue Essential", { length: 16, color: "RGBIC", control: "App, Alexa, Google, Apple Home", music: "Via Hue Bridge" }, ["segmented RGBIC color", "Alexa, Google and Apple Home support", "Hue app scenes"]),
]);

/* ---------------- Switches ---------------- */
export const switch13eSchema: CategorySchema = {
  id: "switches-13e",
  plural: "Switches",
  fields: [
    { key: "type", label: "Switch type", fmt: (v) => String(v) },
    { key: "force", label: "Actuation force", noun: "actuation force", better: "lower", superlative: ["lightest", "heaviest"], fmt: (v) => `${v}gf` },
    { key: "life", label: "Rated life", noun: "rated lifespan", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v} million keystrokes` },
    { key: "count", label: "Pack size", fmt: (v) => `${v} switches` },
    { key: "pins", label: "Pins", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const p = str(f, "pins");
    if (/5-pin/i.test(p) && !/3/.test(p)) s.push("Five-pin switches fit five-pin hot-swap boards; on a three-pin board, clip the two plastic side pins first.");
    else s.push("Check that your keyboard has hot-swap sockets for MX-style switches before buying.");
    s.push("Check the pack count against your keyboard's key count; a full-size board needs about 104.");
    return s;
  },
  criteria: [
    { id: "hotswap", title: "Hot-swap sockets first", body: "You can only swap switches without soldering if your keyboard has hot-swap sockets. Check the board supports MX-style switches and 3-pin or 5-pin." },
    { id: "force", title: "Actuation force", body: "Lighter switches (35 to 45gf) need less effort; heavier ones (55gf and up) reduce accidental presses. Force is a personal preference." },
    { id: "feel", title: "Linear, tactile or silent", body: "Linear switches travel smoothly; tactile ones have a bump you can feel; silent versions add dampening to soften the bottom-out and return." },
    { id: "count", title: "Buy enough switches", body: "A 60% board needs about 61 switches, a 75% about 84, a full-size about 104. Buy a few spares." },
    { id: "lube", title: "Factory lube", body: "Many switches now come factory lubed, which smooths travel. Hand lubing is optional." },
    { id: "noise", title: "Noise also depends on the board", body: "Keycaps, plate and case foam change the sound as much as the switch. Silent switches help most on hard desks." },
  ],
  faq: [
    { id: "gf-cn", q: "Are gf and cN the same?", a: "Almost: 1 cN is about 1.02gf, so a 45cN switch feels close to a 45gf one." },
    { id: "mix", q: "Can I mix switch types on one board?", a: "Yes, on a hot-swap board. Some people use heavier switches on the spacebar or lighter ones on gaming keys." },
    { id: "gaming", q: "Are tactile switches worse for gaming?", a: "Not inherently. Linear switches are popular for games, but tactile switches work fine; preference matters most." },
    { id: "silent-gaming", q: "Do silent switches feel mushy?", a: "The dampening softens the bottom-out, which some people describe as muted. It is the trade-off for less noise." },
    { id: "tools", q: "What do I need to swap switches?", a: "A switch puller, usually included with the keyboard or the pack. Pull straight up to avoid bending pins." },
    { id: "low-profile", q: "Do these fit low-profile keyboards?", a: "No. These are full-height MX-style switches; low-profile boards need their own switch types." },
  ],
  evaluated: [
    { title: "Switch type", description: "We recorded linear, tactile or silent types." },
    { title: "Force", description: "We only included packs that state an actuation force." },
    { title: "Lifespan", description: "We noted the rated keystroke life where listed." },
    { title: "Fit", description: "We checked pin count and pack size." },
  ],
};

export const switch13eFacts = withPool(keyboardPool as Pool, [
  F("B0BNGMFBYL", "Keychron K Pro Silent Red Switches (110 pack)", "Silent K Pro Red", { type: "Silent linear", force: 45, life: 50, count: 110, pins: "3-pin and 5-pin" }, ["a 110-switch pack", "fit in both 3-pin and 5-pin sockets", "a dampened silent design"]),
  F("B0FYRGWPGL", "Cherry MX2A Silent Red Switches", "MX2A Silent Red", { type: "Silent linear", force: 45, life: 50, count: 36, pins: "Not stated" }, ["Cherry's MX2A silent design", "a 45cN force", "a 36-switch pack"]),
  F("B0CJY6RV2V", "Akko Fairy Silent Linear Switches", "Akko Fairy", { type: "Silent linear", force: 50, life: 50, count: 45, pins: "Not stated" }, ["a silent linear design", "a 45-switch pack", "a 50gf force"]),
  F("B0F9XXFRMT", "Gateron Cream Silent Linear Switches", "Gateron Cream Silent", { type: "Silent linear", force: 45, life: 60, pins: "Not stated" }, ["a bottom-out sound Gateron rates at least 70% lower", "a 60 million keystroke rating", "a 45gf force"]),
  F("B0H71LHM67", "KiiBOOM Mossy Silent Linear Switches", "KiiBOOM Mossy", { type: "Silent linear", force: 37, life: 50, count: 100, pins: "5-pin" }, ["a light 37gf force", "a 100-switch pack", "five-pin stems"]),
  F("B0GWR54CN8", "Outemu Pomelo Silent Tactile Switches", "Outemu Pomelo", { type: "Silent tactile", force: 35, count: 20, pins: "Not stated" }, ["a silent tactile bump", "the lightest force here at 35gf", "a 20-switch sample pack"]),
  F("B0CF8DWDGF", "Gateron G Pro 3.0 Brown Switches", "G Pro 3.0 Brown", { type: "Tactile", force: 55, life: 100, pins: "3-pin and 5-pin" }, ["a 100 million keystroke rating", "fit in 3-pin and 5-pin sockets", "a factory-lubed design"]),
  F("B0F9FJDWGZ", "Keychron Banana Tactile Switches (110 pack)", "Keychron Banana", { type: "Tactile", force: 57, count: 110, pins: "5-pin" }, ["a 110-switch pack", "five-pin stems", "a 57gf force"]),
  F("B0DCHZL4PQ", "Gateron Quinn Tactile Switches", "Gateron Quinn", { type: "Tactile", force: 59, life: 80, pins: "Not stated" }, ["an 80 million keystroke rating", "a 59gf force", "a pronounced tactile bump"]),
  F("B0CTH9GJB8", "Durock Ice King T1 Tactile Switches", "Ice King T1", { type: "Tactile", force: 58, life: 60, count: 90, pins: "Not stated" }, ["a 68g bottom-out force", "a 90-switch pack", "a 60 million keystroke rating"]),
  F("B0CBTLK5Z5", "Akko Lavender Purple Tactile Switches", "Lavender Purple", { type: "Tactile", force: 40, life: 60, pins: "Not stated" }, ["a light 40gf tactile force", "a 60 million keystroke rating", "Akko's CS series design"]),
  F("B0FYR9Z777", "Cherry MX2A Brown Switches", "MX2A Brown", { type: "Tactile", force: 55, life: 100, count: 36, pins: "Not stated" }, ["a 100 million keystroke rating", "a 55cN force", "a 36-switch pack"]),
]);
