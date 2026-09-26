import mice from "@/data/pcj-pool/mice.json";
import keyboards from "@/data/pcj-pool/keyboards.json";
import headsets from "@/data/pcj-pool/headsets.json";
import mousepads from "@/data/pcj-pool/mousepads.json";
import lighting from "@/data/pcj-pool/lighting.json";
import streaming from "@/data/pcj-pool/streaming.json";
import microphones from "@/data/pcj-pool/microphones.json";
import webcams from "@/data/pcj-pool/webcams.json";
import speakers from "@/data/pcj-pool/speakers.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { str, withPool } from "./helpers";

/** Batch 13e mixed PC gaming gear roundups (mouse, keyboard, headset, pad, light, mic, camera). */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const gear13eSchema: CategorySchema = {
  id: "gaming-gear-13e",
  plural: "Gear",
  fields: [
    { key: "type", label: "Type", fmt: (v) => String(v) },
    { key: "conn", label: "Connection", fmt: (v) => String(v) },
    { key: "highlight", label: "Key spec", fmt: (v) => String(v) },
    { key: "rgb", label: "Lighting", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const t = str(f, "type");
    const c = str(f, "conn");
    if (/keyboard/i.test(t) && /60%|65%/i.test(str(f, "highlight") + t)) s.push("A 60% or 65% layout drops the number pad and some navigation keys; check you can live without them.");
    if (/headset/i.test(t) && /3\.5mm/i.test(c)) s.push("On a desktop with separate mic and headphone jacks, a single 3.5mm plug needs a splitter.");
    if (/mouse pad/i.test(t)) s.push("Measure the desk: an extended pad should fit under both keyboard and mouse without hanging over the edge.");
    if (/wi-fi/i.test(c)) s.push("Wi-Fi control usually needs a 2.4GHz network.");
    if (/^usb-a|usb \(a\)/i.test(c)) s.push("It plugs into a USB-A port.");
    if (/clamp/i.test(c)) s.push("Check your desk edge thickness against the clamp range.");
    return s;
  },
  criteria: [
    { id: "order", title: "Upgrade in the right order", body: "The mouse, keyboard and headset are the parts you touch and hear all session. Replace whichever frustrates you most first; lighting and extras come later." },
    { id: "mouse-first", title: "Mouse shape before sensor", body: "Every current gaming sensor tracks well enough for most players. Weight, shape and size decide comfort, so pick those first." },
    { id: "keyboard-size", title: "Keyboard size", body: "A 60% or 65% board frees room for the mouse; a full-size one keeps the number pad. Hot-swap sockets let you change switches later." },
    { id: "audio", title: "Headset or separate mic", body: "A headset is the simplest way to get game audio and chat. A separate USB mic sounds clearer if you stream or take calls." },
    { id: "surface", title: "A proper mouse pad", body: "A cloth pad gives consistent tracking and glide. An extended pad covers the keyboard too and keeps the desk tidy." },
    { id: "lighting", title: "Lighting that helps", body: "Bias lighting behind a monitor or a key light for your face does more for a setup than more RGB on the peripherals." },
    { id: "platform", title: "Check platform support", body: "Most gear works on any PC, but software can be Windows-only, and some headsets target consoles as well." },
  ],
  faq: [
    { id: "budget", q: "What should I buy first on a small budget?", a: "A comfortable mouse and a cloth pad. They cost little and change the feel of every game." },
    { id: "brand-match", q: "Do I need all gear from one brand?", a: "No. Matching brands only helps if you want one app to control lighting. Mixing brands works fine." },
    { id: "wireless", q: "Is wireless gear good enough for gaming?", a: "Modern 2.4GHz gaming mice and keyboards are fine for competitive play. Bluetooth modes add delay and suit office use." },
    { id: "rgb-perf", q: "Does RGB improve performance?", a: "No. It is cosmetic; most gear lets you turn it off." },
    { id: "console", q: "Will PC gear work on consoles?", a: "Wired headsets with 3.5mm plugs usually do. Mice and keyboards work only in games that support them." },
    { id: "gift", q: "What makes a good gift?", a: "Items that do not depend on fit or taste, such as a mouse pad, a light or a mic, are the safest. A mouse depends on hand size." },
  ],
  evaluated: [
    { title: "Role in the setup", description: "We chose one item per role so each guide covers a complete desk." },
    { title: "Listed specs", description: "We recorded the key figure each listing states." },
    { title: "Connection", description: "We checked wired, wireless and platform support." },
    { title: "Price tier", description: "We grouped picks by price at the time of writing." },
  ],
};

const merged: Pool = { ...(mice as Pool), ...(keyboards as Pool), ...(headsets as Pool), ...(mousepads as Pool), ...(lighting as Pool), ...(streaming as Pool), ...(microphones as Pool), ...(webcams as Pool), ...(speakers as Pool) };

export const gear13eFacts = withPool(merged, [
  // Mice
  F("B07YN82X3B", "Logitech G203 Wired Gaming Mouse", "G203", { type: "Wired mouse", conn: "USB-A, 2.1m cable", highlight: "8,000 DPI, 6 buttons", rgb: "LIGHTSYNC RGB" }, ["metal-spring-tensioned primary buttons", "five DPI presets", "six programmable buttons in G HUB"]),
  F("B0BX52PCJ5", "HyperX Pulsefire Haste 2 Wired Gaming Mouse", "Haste 2 wired", { type: "Wired mouse", conn: "USB, paracord cable", highlight: "53g, 8000Hz polling", rgb: "RGB" }, ["a solid shell at 53g", "8000Hz polling", "switches rated for 100 million clicks"]),
  F("B0CJ617PWP", "HyperX Pulsefire Haste 2 Wireless Gaming Mouse", "Haste 2 Wireless", { type: "Wireless mouse", conn: "2.4GHz, Bluetooth", highlight: "61g, 100-hour battery", rgb: "None stated" }, ["up to 100 hours of battery life", "a 26K sensor", "2.4GHz and Bluetooth modes"]),
  F("B0F6BDV5Q8", "SteelSeries Rival 3 Gen 2 Gaming Mouse", "Rival 3 Gen 2", { type: "Wired mouse", conn: "USB, paracord cable", highlight: "8,500 DPI TrueMove Core", rgb: "3-zone RGB" }, ["switches rated for 60 million clicks", "a 1.35ms click latency claim", "a paracord-style cable"]),
  // Keyboards
  F("B09BVCVTBC", "Redragon K617 60% Hot-Swap Mechanical Keyboard", "K617", { type: "Wired 60% keyboard", conn: "USB", highlight: "Hot-swap 3-pin and 5-pin", rgb: "RGB, 20 presets" }, ["hot-swap sockets for 3-pin and 5-pin switches", "red linear switches rated for 50 million presses", "macro software"]),
  F("B0H9CC8JCZ", "Razer Reclusa X Mini 65% Mechanical Keyboard", "Reclusa X Mini", { type: "Wired 65% keyboard", conn: "USB", highlight: "Orange tactile switches, hot-swap", rgb: "Per-key Chroma RGB" }, ["a PPS plate with two layers of silicone dampening", "Snap Tap and Dual-Keypress Priority", "south-facing LEDs"]),
  F("B0DSMWJD6M", "AULA WIN60 HE 60% Magnetic Keyboard", "WIN60 HE", { type: "Wired 60% keyboard", conn: "USB", highlight: "Hall effect, 0.02mm rapid trigger", rgb: "RGB" }, ["magnetic Hall effect switches", "rapid trigger down to 0.02mm", "a web-based configuration tool"]),
  // Headsets
  F("B0BDHYF8YS", "HyperX Cloud Stinger 2 Core Gaming Headset", "Stinger 2 Core", { type: "Wired headset", conn: "3.5mm", highlight: "40mm drivers", rgb: "None" }, ["a swivel-to-mute mic", "on-headset volume controls", "a lightweight build"]),
  F("B00YXO5UKY", "Turtle Beach Recon 50 Gaming Headset", "Recon 50", { type: "Wired headset", conn: "3.5mm", highlight: "40mm speakers, removable mic", rgb: "None" }, ["a removable mic", "in-line volume and mute controls", "PC, PlayStation and Xbox support"]),
  F("B0DRM949PC", "JBL Quantum 100M2 Wired Gaming Headset", "Quantum 100M2", { type: "Wired headset", conn: "3.5mm", highlight: "Detachable directional mic", rgb: "None" }, ["a detachable directional mic", "memory-foam padding", "Windows Sonic spatial sound support"]),
  F("B07S9FMPD2", "Turtle Beach Recon Spark Gaming Headset", "Recon Spark", { type: "Wired headset", conn: "3.5mm", highlight: "40mm speakers, flip-to-mute mic", rgb: "None" }, ["a flip-to-mute mic", "on-ear volume controls", "support for spatial audio technologies"]),
  // Mouse pads
  F("B000UEZ36W", "SteelSeries QcK Medium Mouse Pad", "QcK Medium", { type: "Cloth mouse pad", conn: "None", highlight: "320 x 270 x 2mm", rgb: "None" }, ["a micro-woven cloth surface", "a non-slip rubber base", "the lowest price tier here"]),
  F("B0D1T1HZCC", "SteelSeries QcK XXL Mouse Pad", "QcK XXL", { type: "Extended cloth mouse pad", conn: "None", highlight: "XXL desk coverage", rgb: "None" }, ["desk coverage for keyboard and mouse", "a non-slip rubber base", "micro-woven cloth"]),
  F("B0885NTLKJ", "Razer Gigantus V2 Large Mouse Pad", "Gigantus V2 L", { type: "Cloth mouse pad", conn: "None", highlight: "3mm foam, Large", rgb: "None" }, ["3mm high-density foam", "a micro-weave surface", "an anti-slip base"]),
  F("B0BHMN52LY", "Logitech G840 XL Cloth Mouse Pad", "G840 XL", { type: "Extended cloth mouse pad", conn: "None", highlight: "900 x 400 x 3mm", rgb: "None" }, ["a 900 x 400mm surface", "moderate surface friction", "a no-slip rubber base"]),
  F("B08JH8C5T5", "Corsair MM350 PRO Extended XL Mouse Pad", "MM350 PRO", { type: "Extended cloth mouse pad", conn: "None", highlight: "930 x 400mm, 4mm", rgb: "None" }, ["a spill-proof coating", "stitched anti-fray edges", "4mm rubber"]),
  // Lighting, streaming, audio, camera
  F("B0991Q94KP", "Govee RGBIC LED Strip Lights 16.4ft", "Govee 16.4ft", { type: "LED strip", conn: "App, Bluetooth", highlight: "16.4ft RGBIC", rgb: "RGBIC" }, ["11 music modes", "more than 64 scenes", "a built-in microphone for music sync"]),
  F("B0991KSWN9", "Govee RGBIC LED Strip Lights 16.4ft (Alexa and Google)", "Govee 16.4ft Wi-Fi", { type: "LED strip", conn: "App, Wi-Fi", highlight: "16.4ft RGBIC with voice control", rgb: "RGBIC" }, ["Alexa and Google Assistant support", "AI lighting effects", "segment color control"]),
  F("B0G3CWMTT6", "Philips Hue Essential Lightstrip 16ft", "Hue Essential", { type: "LED strip", conn: "App, smart home", highlight: "16ft RGBIC", rgb: "RGBIC" }, ["Alexa, Google and Apple Home support", "segmented color", "Hue app scenes"]),
  F("B0H6MDZC4R", "Govee COB Strip Light 2 32.8ft", "Govee COB Strip 2", { type: "LED strip", conn: "App, Wi-Fi, Matter", highlight: "840 LEDs/m COB", rgb: "COB RGBIC" }, ["a dotless COB line", "a 1000 to 10000K white range", "Matter support"]),
  F("B0BSQXDS71", "Logitech G Litra Beam Key Light", "Litra Beam", { type: "Key light", conn: "USB, Bluetooth", highlight: "2700-6500K", rgb: "None" }, ["TrueSoft full-spectrum light", "onboard controls and saved presets", "a slim bar design"]),
  F("B07DYRS1WH", "Elgato Stream Deck Mini", "Stream Deck Mini", { type: "Stream controller", conn: "USB", highlight: "6 LCD keys", rgb: "None" }, ["six LCD keys", "a compact footprint", "app and game shortcuts"]),
  F("B0CVY4566H", "Elgato Stream Deck Neo", "Stream Deck Neo", { type: "Stream controller", conn: "USB", highlight: "8 keys, 2 touch points", rgb: "None" }, ["eight LCD keys", "two touch points for pages", "an info bar"]),
  F("B0C45H4WG9", "FIFINE BM88 Low-Profile Mic Arm", "BM88 arm", { type: "Mic arm", conn: "Desk clamp 0.8-2.4in", highlight: "29in reach", rgb: "None" }, ["a low-profile design", "1/4, 3/8 and 5/8in threads", "a 29in reach"]),
  F("B07QLNYBG9", "Logitech G Yeti Nano USB Microphone", "Yeti Nano", { type: "USB microphone", conn: "USB", highlight: "Cardioid and omni", rgb: "None" }, ["two capsules", "a headphone output", "a compact body"]),
  F("B0BMFQP2ZZ", "FIFINE AmpliGame AM8 USB/XLR Microphone", "FIFINE AM8", { type: "USB/XLR microphone", conn: "USB and XLR", highlight: "Dynamic capsule", rgb: "RGB" }, ["a dynamic capsule that picks up less room noise", "an XLR output for later (cable not included)", "a headphone jack"]),
  F("B09JG62KDJ", "FIFINE A6V USB Gaming Microphone", "FIFINE A6V", { type: "USB microphone", conn: "USB", highlight: "Mute button, gain knob", rgb: "RGB" }, ["a shock mount and pop filter", "a gain knob", "a mute button that turns the RGB off"]),
  F("B0DG9X4WHW", "HyperX QuadCast 2 S USB Microphone", "QuadCast 2 S", { type: "USB microphone", conn: "USB", highlight: "4 polar patterns", rgb: "100+ aRGB LEDs" }, ["more than 100 addressable RGB LEDs", "tap-to-mute", "a multifunction knob"]),
  F("B0CW1S7XP5", "Elgato Facecam MK.2", "Facecam MK.2", { type: "Webcam", conn: "USB", highlight: "1080p60", rgb: "None" }, ["uncompressed 1080p60", "a privacy shutter", "HDR at 1080p30"]),
  F("B0BCCCNHD8", "Razer Leviathan V2 X PC Soundbar", "Leviathan V2 X", { type: "Soundbar", conn: "USB-C, Bluetooth 5.0", highlight: "Power and audio over USB-C", rgb: "14 Chroma zones" }, ["two drivers and two passive radiators", "a single USB-C cable for power and audio", "a compact width for under a monitor"]),
  F("B08GK9LCRW", "Redragon GS520 PC Speakers", "GS520", { type: "Stereo speakers", conn: "USB power, 3.5mm", highlight: "2.0 stereo", rgb: "6 touch RGB modes" }, ["six touch-controlled RGB modes", "USB power", "a low price tier"]),
  F("B0F5Q1ZJ6C", "Edifier Hecate Gaming Speakers", "Hecate", { type: "Stereo speakers", conn: "USB, AUX, Bluetooth 5.1", highlight: "32W peak", rgb: "12 RGB effects" }, ["2.75in drivers", "a 10-degree tilt", "three inputs"]),
]);
