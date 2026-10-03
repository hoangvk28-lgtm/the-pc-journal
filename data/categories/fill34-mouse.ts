import pool from "@/data/pcj-pool/mice.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Fill 34: wireless office and ergonomic mice between $40 and $60 for workMouseSchema. Listing titles and bullets only,
 * reviewed by hand; battery is in months and left undefined where the listing gives hours or nothing. Renewed units
 * and colour variants are skipped (the Logitech MX Anywhere 3S for Mac listing is renewed).
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const fill34WorkMouseFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  F("B0DKBVRBLR", "Logitech Signature Plus M750", "Signature Plus M750", { battery: 24, grip: "Right-handed, small to medium hands", connection: "Bluetooth, up to 3 devices" }, ["a SmartWheel that switches between line-by-line and fast scrolling", "SilentTouch clicks with 90 percent less click noise", "a soft thumb area and rubber side grips", "customizable side buttons"]),
  F("B0DKBW73R3", "Logitech Signature Plus M750 L", "Signature Plus M750 L", { battery: 24, grip: "Right-handed, large hands", connection: "Bluetooth, up to 3 devices" }, ["a SmartWheel that switches between line-by-line and fast scrolling", "SilentTouch clicks", "Flow file transfer between Windows and macOS", "customizable side buttons"]),
  F("B0GSHRCS7L", "Logitech Signature Comfort Plus M850 L", "Signature Comfort Plus M850 L", { battery: 24, grip: "Right-handed, most hand sizes", connection: "Bluetooth, up to 3 devices" }, ["Logitech's first mouse with a built-in palm cushion", "a SmartWheel and quiet clicks", "Easy-Switch pairing with no dongle", "customizable buttons in Logi Options+"]),
  F("B09MYW2ZX5", "Keychron M3 Wireless", "Keychron M3", { dpi: 26000, grip: "Curved, ergonomic shape", connection: "2.4GHz or Bluetooth 5.1" }, ["a PAW3395 sensor with 1000Hz polling", "a 79g body with PTFE feet", "button, macro and DPI remapping in a web app with 5 profiles"]),
  F("B0C2Z75ZP9", "Keychron M3 Mini", "Keychron M3 Mini", { dpi: 26000, grip: "Lightweight, curved shape", connection: "2.4GHz, Bluetooth 5.1 or wired" }, ["a 55g body", "up to 70 hours of battery in the 1K version", "an 80-million-click switch rating", "5 onboard memory profiles"]),
  F("B08J89V8M7", "Microsoft Bluetooth Ergonomic Mouse", "Microsoft Ergonomic Mouse", { buttons: 3, grip: "Ergonomic, with a thumb rest", connection: "Bluetooth" }, ["a soft thumb rest for a natural hand and wrist position", "a machined aluminium scroll wheel", "a Teflon base"]),
  F("B071YZJ1G1", "Logitech MX Master 2S Bluetooth Edition", "MX Master 2S", { connection: "Bluetooth, up to 3 computers" }, ["hyper-fast scrolling", "multi-surface tracking", "a rechargeable battery"]),
  F("B0BBQ3ZYNY", "Logitech Ergo M575S Trackball", "Ergo M575S", { battery: 18, buttons: 3, grip: "Thumb trackball, right-handed", connection: "Bluetooth or Logi Bolt" }, ["25% less forearm muscle strain, per Logitech", "quiet clicks", "Smart Actions shortcuts", "thumb control that keeps the mouse still on the desk"]),
]);
