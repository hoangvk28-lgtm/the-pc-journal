import webcamPool from "@/data/pcj-pool/webcams.json";
import speakerPool from "@/data/pcj-pool/speakers.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { webcam13eFacts } from "./creator13e";
import { speaker13eFacts } from "./audio13e";
import { withPool } from "./helpers";

/**
 * Batch 15b fact sheets: streaming webcams and desktop PC speakers. Listing claims only, reviewed by hand.
 * Speaker `peak` holds only figures a listing calls peak; RMS figures stay in the notes so the two are never compared.
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const webcams15bFacts: Record<string, Fact> = {
  ...webcam13eFacts,
  ...withPool(webcamPool as Pool, [
    F("B0CVYHHDLD", "Elgato Facecam Neo Full HD Webcam", "Facecam Neo", { res: "1080p60", fps: 60, privacy: "Privacy shutter" }, ["1080p at 60fps with HDR", "plug-and-play setup with no software needed", "an easy-slide privacy shutter"]),
    F("B0FNBGBJ12", "Razer Kiyo V2 Pro Webcam", "Kiyo V2 Pro", { res: "4K60", fps: 60, sensor: "Sony STARVIS 2, 8.3MP", focus: "AI auto-framing" }, ["4K at 60fps from a Sony STARVIS 2 sensor", "ISO, shutter, gain and field-of-view control in Razer Synapse", "an 86-degree field of view"]),
    F("B0G63LXK6R", "OBSBOT Tiny 3 Lite 4K PTZ Webcam", "Tiny 3 Lite", { res: "4K30 or 1080p120", fps: 120, sensor: "1/2in CMOS", focus: "PDAF, PTZ AI tracking" }, ["1080p at 120fps as well as 4K at 30fps", "a motorized gimbal with AI tracking and voice or gesture control", "a three-microphone array with five audio modes"]),
    F("B0GCYZVCSD", "NexiGo N680E Pro 4K Webcam with Ring Light", "N680E Pro", { res: "4K sensor, 1080p60 streaming", fps: 60, sensor: "Sony 1/2.5in", focus: "PDAF", privacy: "Privacy shutter" }, ["a built-in ring light with three color temperatures and a brightness dial", "dual noise-reducing microphones", "an 80-degree field of view"]),
    F("B0GXT9CXT1", "Acer A640 4K Webcam", "Acer A640", { res: "4K30, 1080p60", fps: 60, sensor: "Sony 1/2.8in", focus: "PDAF", privacy: "Privacy shutter" }, ["4K at 30fps and 1080p at 60fps", "AI noise cancelling on the microphone", "a USB-A to USB-C adapter in the box"]),
    F("B0BFJ4CRKD", "Logitech MX Brio 4K Webcam", "MX Brio", { res: "4K30, 1080p60", fps: 60, focus: "Autofocus", privacy: "Rotating lens cover" }, ["ISO, shutter speed, tint and vibrance controls in Logitech software", "dual beamforming noise-reducing microphones", "a Show Mode that tilts down to film the desk"]),
  ]),
};

export const speakers15bFacts: Record<string, Fact> = {
  ...speaker13eFacts,
  ...withPool(speakerPool as Pool, [
    F("B08F57GSJ7", "Creative Pebble V3 USB-C Desktop Speakers", "Pebble V3", { form: "Stereo pair", inputs: "USB-C (power and audio), Bluetooth 5.0, 3.5mm", sub: "None" }, ["2.25in full-range drivers angled up at 45 degrees", "Clear Dialog processing for speech", "a gain switch for extra volume"]),
    F("B0DXW25R3D", "Creative Pebble Pro USB-C Desktop Speakers", "Pebble Pro", { form: "Stereo pair", peak: 20, inputs: "USB (power and audio), Bluetooth 5.3, 3.5mm", sub: "None, BassFlex tuning", extras: "RGB lighting, 3 effects" }, ["up to 10W RMS and 20W peak with a suitable USB-C power source", "BassFlex tuning for extended bass", "RGB lighting with three effects"]),
    F("B002HWRZ2K", "Logitech Z313 2.1 Speaker System with Subwoofer", "Z313", { form: "2.1 with subwoofer", inputs: "3.5mm", sub: "Compact subwoofer", extras: "Wired control pod" }, ["25W RMS total output", "a control pod on the cable", "a compact subwoofer"]),
    F("B01LXDZ8WB", "Edifier R980T Active Bookshelf Speakers", "R980T", { form: "Bookshelf stereo pair", inputs: "2x AUX (3.5mm and RCA)", sub: "None, front bass reflex port" }, ["24W RMS total output", "wooden enclosures", "two AUX inputs connected at the same time"]),
    F("B06XGG6MFV", "Edifier R1280DB Powered Bluetooth Bookshelf Speakers", "R1280DB", { form: "Bookshelf stereo pair", inputs: "Bluetooth, optical, coaxial, AUX", sub: "None", extras: "Remote control, side bass and treble knobs" }, ["optical and coaxial digital inputs", "a 4in bass driver and 13mm silk dome tweeter per side", "a remote plus bass and treble knobs"]),
    F("B000062VUO", "Klipsch ProMedia 2.1 THX Certified Computer Speakers", "ProMedia 2.1", { form: "2.1 with subwoofer", peak: 200, inputs: "3.5mm", sub: "6.5in side-firing ported subwoofer", extras: "Control pod with volume and subwoofer gain" }, ["THX certification", "MicroTractrix horn tweeters", "a control pod with separate subwoofer gain"]),
  ]),
};
