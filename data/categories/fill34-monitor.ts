import pool from "@/data/pcj-pool/monitors.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Fill 34: desktop 21.5 to 24 inch 1080p monitors at or below $80 for monitorSchema. Listing titles and bullets only,
 * reviewed by hand; unstated fields stay undefined. Portable monitors, TVs, renewed units and accessories are skipped,
 * as are listings whose bullets contradict their title (Sceptre E22 75Hz). The Acer KB242Y G0bi is left out because the
 * KA242Y G0bi lists the same panel specs. Entries for ASINs in an earlier monitor file replace them with fuller facts.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });
const H = "1920x1080";

export const fill34MonitorFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  F("B0C8ZKV5R9", "Philips 241V8LB 24-inch", "Philips 241V8LB", { size: 23.8, res: H, hz: 100, panel: "VA" }, ["a 178-degree viewing angle", "an EasyRead mode for long documents", "a bezel-free look on three sides"]),
  F("B0CVM2GJCN", "Philips 221V8LB 22-inch", "Philips 221V8LB", { size: 21.5, res: H, hz: 100, panel: "VA" }, ["Adaptive-Sync to keep frames smooth", "a 178-degree viewing angle", "a 21.5-inch viewable area"]),
  F("B0DYQX28HR", "Acer KA242Y G0bi", "Acer KA242Y", { size: 23.8, res: H, hz: 120, panel: "IPS", resp: 1, gamut: "99% sRGB", sync: "FreeSync Compatible", stand: "Tilt only (-5 to 25 degrees)" }, ["a 1ms VRB response time", "250 nits of brightness", "HDMI 1.4 and VGA inputs with an HDMI cable included"]),
  F("B0BWSHT473", "Acer KB242Y 75Hz", "Acer KB242Y 75Hz", { size: 23.8, res: H, hz: 75, sync: "AMD FreeSync" }, ["HDMI and VGA inputs"]),
  F("B0FPRDTVMD", "Acer KB220Q H2bi", "Acer KB220Q", { size: 21.5, res: H, hz: 100, resp: 1, sync: "FreeSync Compatible" }, ["a ZeroFrame near bezel-less design", "a 1ms response time"]),
  F("B0G5ZC3NDH", "Acer SB223Q J0bi", "Acer SB223Q", { size: 21.5, res: H, hz: 120, resp: 1 }, ["a ZeroFrame near bezel-less design", "Adaptive-Sync support"]),
  F("B0FPRGSK6J", "Lenovo L22-4e", "Lenovo L22-4e", { size: 21.5, res: H, hz: 100, panel: "IPS", gamut: "99% sRGB", stand: "Tilt only" }, ["a 4ms response time in extreme mode", "a 1300:1 contrast ratio", "VESA wall-mount support"]),
  F("B0FT21HKZ6", "Sceptre E225W-FW144 22-inch", "Sceptre E225W", { size: 22, res: H, hz: 144 }, ["HDMI and DisplayPort inputs", "built-in speakers", "Blue-Light Shift", "a near bezel-free design"]),
  F("B09VD9P2Q3", "KOORUI 24-inch 100Hz VA", "KOORUI 24 VA", { size: 24, res: H, hz: 100, panel: "VA", gamut: "99% sRGB", sync: "Adaptive-Sync", stand: "Tilt only (-5 to 15 degrees)" }, ["a 4000:1 contrast ratio", "TUV Rheinland low blue light and flicker-free certification", "HDMI, VGA and a 3.5mm audio output but no DisplayPort"]),
  F("B0DK468KVS", "Samsung S30GD 24-inch", "Samsung S30GD", { size: 24, res: H, hz: 100, panel: "IPS", stand: "Tilt only" }, ["a Game Mode for adjusting contrast", "reduced blue light and flicker", "an ultra-thin bezel design"]),
  F("B0F9TK1RFC", "SANSUI 24-inch 180Hz", "SANSUI 24 180Hz", { size: 24, res: H, hz: 180, resp: 1, gamut: "110% sRGB", sync: "FreeSync" }, ["HDMI 2.0 and DisplayPort 1.4 inputs that both reach 180Hz", "a 4000:1 contrast ratio", "no built-in speakers"]),
]);
