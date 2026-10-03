import pool from "@/data/pcj-pool/speakers.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Fill 34: desktop speakers at or below $60 for speaker13eSchema. Listing titles and bullets only, reviewed by hand.
 * `peak` is recorded only where the listing calls the figure peak power; RMS figures go in the notes. Entries for ASINs
 * that already exist in an earlier speaker file replace them with fuller facts. Renewed units, colour duplicates and
 * no-name sound bars are skipped.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const fill34SpeakerFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  F("B0076A12M2", "Logitech Z313", "Z313", { form: "2.1 with subwoofer", sub: "Compact subwoofer", extras: "Headphone jack on the control pod" }, ["25W RMS", "a control pod for volume and headphones", "a subwoofer that connects to the computer and the speakers"]),
  F("B00006B9W1", "Cyber Acoustics CA-3090", "CA-3090", { form: "2.1 with subwoofer", peak: 18, woofer: 4, sub: "4in side-firing ported subwoofer", extras: "Control pod with bass level on the subwoofer" }, ["9W RMS", "2in satellite drivers", "a one-year warranty"]),
  F("B07NSGX3VK", "Cyber Acoustics CA-2890BT", "CA-2890BT", { form: "Desktop soundbar", inputs: "USB, Bluetooth 5.0", sub: "None", extras: "Built-in microphone with mute" }, ["5W output", "a clip-on design that attaches to the bottom of a monitor", "speakerphone calls"]),
  F("B00EZ9XLEY", "Logitech Z150", "Z150", { form: "Stereo pair", peak: 6, inputs: "3.5mm, two devices at once", sub: "None", extras: "Headphone jack" }, ["2in drivers", "one knob for power and volume"]),
  F("B07X3KFV3F", "Redragon GS550", "GS550", { form: "Stereo pair", inputs: "USB power, 3.5mm audio and mic cables", sub: "None", extras: "Red LED backlight, volume knob" }, ["a 31in cable between the two speakers", "a power and volume knob"]),
  F("B08V1F3TFB", "Redragon GS510", "GS510", { form: "Stereo pair", inputs: "USB power, 3.5mm audio and mic cables", sub: "None", extras: "4 touch-controlled RGB modes, volume knob" }, ["a 39in cable between the two speakers", "full-range drivers"]),
  F("B0FN75F42W", "Redragon GS515", "GS515", { form: "Desktop soundbar", peak: 10, inputs: "Bluetooth 5.3, wired", sub: "None", extras: "6 RGB presets, control dial" }, ["dual 50mm full-range drivers", "a bar that fits under a monitor"]),
  F("B0FWKF6GFT", "NSY Audio Powered Speakers", "NSY Audio 60W", { form: "Stereo pair", inputs: "Bluetooth 5.3, RCA, USB-C, 3.5mm AUX", sub: "None", extras: "Front-panel dial" }, ["a stated 60W maximum", "3in drivers in MDF enclosures", "bookshelf-style cabinets"]),
  F("B0D8L415P9", "Creative Pebble SE", "Pebble SE", { form: "Stereo pair", inputs: "USB-C power, 3.5mm audio", sub: "None", extras: "7 RGB presets, volume knob" }, ["up to 4.4W RMS with passive radiators", "a 4.6in orb-shaped body", "drivers angled up at 45 degrees"]),
  F("B07VVP8BGD", "Creative Pebble V2", "Pebble V2", { form: "Stereo pair", inputs: "USB-C power, 3.5mm audio", sub: "None", extras: "Gain switch" }, ["2in full-range drivers with rear passive radiators", "a gain mode for more volume on a 10W USB port", "drivers angled up at 45 degrees"]),
  F("B077XF3XJK", "Creative Pebble", "Pebble", { form: "Stereo pair", inputs: "USB power, 3.5mm audio", sub: "None" }, ["far-field drivers with rear passive radiators", "drivers angled up at 45 degrees", "front volume control"]),
  F("B07DDK3W5D", "Amazon Basics Stereo Speakers", "Amazon Basics 2.0", { form: "Stereo pair", inputs: "USB power, 3.5mm", sub: "None", extras: "In-line volume control, blue LED" }, ["a bottom bass radiator", "a metal finish with a padded base"]),
  F("B074KJ6JQW", "Logitech Z207", "Z207", { form: "Stereo pair", inputs: "Bluetooth 4.2, 3.5mm", sub: "None", extras: "Headphone jack on the speaker" }, ["Easy-Switch between two audio devices", "one powered driver and one passive radiator per speaker", "on-speaker pairing and volume controls"]),
  F("B07NWLWM9B", "Creative Pebble Plus", "Pebble Plus", { form: "2.1 with subwoofer", woofer: 4, sub: "4in down-firing ported subwoofer", inputs: "USB power, 3.5mm" }, ["8W RMS in high-gain mode with a 5V 2A adapter", "2in drivers angled up at 45 degrees", "front volume controls"]),
  F("B0145MVJUS", "Cyber Acoustics CA-3610", "CA-3610", { form: "2.1 with subwoofer", peak: 62, woofer: 5.25, sub: "5.25in down-firing ported subwoofer", inputs: "3.5mm" }, ["30W RMS", "dual 2in titanium drivers in each satellite", "a control pod with a bass knob"]),
]);
