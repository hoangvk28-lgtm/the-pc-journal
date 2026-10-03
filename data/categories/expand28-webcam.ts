import pool from "@/data/pcj-pool/setup.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 28 webcam fact sheets for webcam13eSchema: Logitech, Razer, Insta360, OBSBOT, EMEET, Anker, Dell and ring-light
 * models. Resolution, frame rate, sensor, focus and privacy features come from the listing titles and bullets and are
 * reviewed by hand; unstated fields stay undefined or "Not stated". Renewed units, bundles and conference-room cameras
 * are skipped.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const expand28WebcamFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  F("B07K986YLL", "Logitech C920S HD Pro", "Logitech C920S", { res: "1080p30", fps: 30, sensor: "Not stated", focus: "Autofocus", privacy: "Privacy shutter" }, ["a glass lens", "stereo microphones"]),
  F("B09DVGV7BH", "Logitech C920e", "Logitech C920e", { res: "1080p30", fps: 30, sensor: "Not stated", focus: "Autofocus", privacy: "Attachable privacy screen" }, ["Zoom and Microsoft Teams certification"]),
  F("B07JGCBXYY", "Logitech C922 Pro Stream", "Logitech C922", { res: "1080p30 or 720p60", sensor: "Not stated" }, ["1080p at 30fps or 720p at 60fps"]),
  F("B0BXGFFSL1", "Logitech Brio 101", "Logitech Brio 101", { res: "1080p30", sensor: "Not stated", privacy: "Privacy slide" }, ["a built-in privacy slide"]),
  F("B0BMQQQHC2", "Logitech Brio 505", "Logitech Brio 505", { res: "1080p30", sensor: "Not stated", privacy: "Privacy shutter" }, ["auto light correction", "a business-focused webcam"]),
  F("B09WHTMF23", "Logitech Brio 501", "Logitech Brio 501", { res: "1080p30", sensor: "Not stated", privacy: "Privacy cover" }, ["auto light correction", "a Show Mode that angles the camera down at your desk"]),
  F("B0CX8S8JLX", "Logitech MX Brio", "Logitech MX Brio", { res: "4K30, 1080p60", fps: 60, sensor: "Not stated", focus: "Autofocus", privacy: "Privacy protector" }, ["noise-reducing microphones", "AI-enhanced image quality"]),
  F("B08LBMVJYM", "Logitech StreamCam (USB-C)", "Logitech StreamCam", { res: "1080p60", fps: 60, sensor: "Not stated" }, ["a USB-C connection", "an integrated microphone"]),
  F("B09MFMTMPD", "Anker PowerConf C200", "Anker C200", { res: "2K", sensor: "Not stated", privacy: "Privacy cover" }, ["low-light correction"]),
  // OBSBOT, Razer, Insta360
  F("B0D9W7J9SK", "OBSBOT Meet 2", "OBSBOT Meet 2", { res: "4K", sensor: "1/2in CMOS", focus: "Autofocus, AI framing" }, ["AI framing"]),
  F("B0DQ8TNZ4J", "OBSBOT Meet SE", "OBSBOT Meet SE", { res: "1080p100", fps: 100, sensor: "Not stated", focus: "AI framing" }, ["1080p at 100fps", "staggered HDR"]),
  F("B0C3B6ZR1V", "OBSBOT Tiny 2", "OBSBOT Tiny 2", { res: "4K", sensor: "1/1.5in CMOS", focus: "PTZ AI tracking, all-pixel autofocus" }, ["voice and gesture control", "a 0.3-second autofocus"]),
  F("B0CT6FFK4R", "Razer Kiyo Pro Ultra", "Kiyo Pro Ultra", { res: "4K30", fps: 30, sensor: "Sony 1/1.2in STARVIS 2", privacy: "Built-in shutter" }, ["a large sensor with a 2.9 micron pixel size", "HDR at 30fps"]),
  F("B0FNC1F2MR", "Razer Kiyo V2 X", "Kiyo V2 X", { res: "1440p60", fps: 60, sensor: "Not stated", focus: "Autofocus", privacy: "Integrated privacy shutter" }, ["a universal pivoting mount"]),
  F("B0FNBN5PB3", "Razer Kiyo V2", "Kiyo V2", { res: "4K30", fps: 30, sensor: "Sony STARVIS" }, ["HDR support", "adjustable ISO and shutter speed"]),
  F("B0G3T1QKWL", "Insta360 Link 2 Pro", "Link 2 Pro", { res: "4K", sensor: "1/1.3in", focus: "PTZ AI tracking" }, ["DeskView, Whiteboard and 4K Portrait modes", "directional noise-cancelling microphones"]),
  F("B0G3SSQMJQ", "Insta360 Link 2C Pro", "Link 2C Pro", { res: "4K", sensor: "1/1.3in", focus: "AI auto framing" }, ["HDR and low-light performance"]),
  F("B0DNK381B3", "Insta360 Link 2C", "Link 2C", { res: "4K", sensor: "1/2in", focus: "PDAF, AI auto framing", privacy: "Privacy switch" }, ["HDR", "AI noise-cancelling microphone"]),
  F("B0FPR2G17Z", "Insta360 Link 2", "Link 2", { res: "4K", sensor: "1/2in", focus: "PDAF, PTZ AI tracking" }, ["gesture control", "AI noise-cancelling microphone"]),
  // EMEET, NexiGo, Dell and others
  F("B0CJHZ92P6", "EMEET C960 4K", "EMEET C960 4K", { res: "4K", sensor: "Not stated", focus: "PDAF" }, ["a 73-degree field of view", "dual omnidirectional microphones"]),
  F("B0CY2C7H6S", "EMEET NOVA 4K", "EMEET NOVA 4K", { res: "4K30", fps: 30, sensor: "Not stated", focus: "PDAF" }, ["dual omnidirectional microphones"]),
  F("B0FQC1SQM2", "EMEET C60E Dual-Camera 4K", "EMEET C60E", { res: "4K", sensor: "1/2.8in CMOS", focus: "PDAF" }, ["a dual-camera wide-angle and telephoto design", "up to 11x hybrid zoom"]),
  F("B0G6L2WHKG", "EMEET S600L 4K with Ring Light", "EMEET S600L", { res: "4K", sensor: "1/2in", focus: "PDAF" }, ["a ring light that syncs with image capture"]),
  F("B0H5QGQYTP", "NexiGo N960E Plus 4K with Ring Light", "NexiGo N960E Plus", { res: "4K30, 1080p60", fps: 60, sensor: "1/2.5in CMOS", focus: "ToF autofocus" }, ["a ring light and RF remote"]),
  F("B09QKR8P6T", "Angetube 862Pro Streaming Webcam with Ring Light", "Angetube 862Pro", { res: "1080p60", fps: 60, sensor: "Not stated", focus: "Autofocus" }, ["a multi-function ring light"]),
  F("B098GXD82C", "Dell UltraSharp 4K Webcam WB7022", "Dell WB7022", { res: "4K", sensor: "Sony STARVIS", focus: "Autofocus" }, ["HDR", "Teams certification"]),
  F("B0C3WQQH6Q", "Dell 2K QHD Webcam WB3023", "Dell WB3023", { res: "2K", sensor: "Sony", privacy: "Sliding privacy shutter" }, ["a noise-reduction microphone"]),
  F("B08VJ48J91", "AVerMedia Live Streamer CAM 315", "AVerMedia CAM 315", { res: "1080p60", fps: 60, sensor: "Not stated", focus: "Fixed focus", privacy: "Sliding privacy shutter" }, ["an adjustable field of view"]),
  F("B09S2B2QX2", "Lenovo 510 FHD Webcam", "Lenovo 510 FHD", { res: "1080p30", sensor: "1/2.9in RGB", privacy: "Sliding privacy shutter" }, ["4x digital zoom and a 95-degree wide angle", "360-degree pan and tilt"]),
  F("B0FQ57MYVH", "AOC 4K Webcam", "AOC 4K Webcam", { res: "4K", sensor: "Not stated", privacy: "Sliding lens cover" }, ["a noise-cancelling microphone"]),
  F("B0GJD6PHTZ", "Acer A610 1080p Webcam", "Acer A610", { res: "1080p30", sensor: "Not stated", privacy: "Privacy cover" }, ["built-in microphones"]),
  F("B0DSPJPRXD", "EMEET C960 1080p Webcam", "EMEET C960 1080p", { res: "1080p30", sensor: "Not stated", focus: "Fixed focus", privacy: "Privacy cover" }, ["a 90-degree field of view", "two microphones"]),
]);
