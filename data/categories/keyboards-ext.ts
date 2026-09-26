import pool from "@/data/pcj-pool/peripherals.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { keyboardFacts } from "./peripherals";
import { withPool } from "./helpers";

/**
 * Batch 12 keyboard fact sheets (ASUS and full-size boards), reviewed by hand from listing bullets.
 * Dropped: SteelSeries Apex Pro Gen 3 B0DQQZMNVC (renewed listing), SteelSeries Apex 7 (title and
 * bullets disagree on layout), ASUS ROG Strix Scope II B0CLHLLFBP (layout not stated).
 */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const keyboardExtFacts: Record<string, Fact> = {
  ...keyboardFacts,
  ...withPool(pool as Pool, [
    F("B0C7KFZ5TL", "ASUS ROG Strix Scope II 96 Wireless", "Scope II 96 Wireless", { layout: "96%", switch: "ROG NX Snow linear or NX Storm clicky", connection: "2.4GHz, Bluetooth, wired", battery: 1500, keycaps: "PBT" }, ["hot-swappable pre-lubed switches", "a number pad in a frame ASUS lists as 1cm wider than an 80% board", "sound-dampening foam"]),
    F("B0FGGZK4X7", "ASUS ROG Strix Scope II X", "Scope II X", { layout: "Full-size (100%)", switch: "ROG NX Snow V2 linear or NX Storm V2 clicky", connection: "Wired", keycaps: "Double-shot PBT" }, ["hot-swappable pre-lubed switches", "an aluminium top plate", "a multi-function wheel and streaming hotkeys"]),
    F("B0CP6J59XB", "ASUS ROG Azoth Wireless", "ROG Azoth", { layout: "75%", switch: "ROG NX Snow linear or NX Storm clicky", connection: "2.4GHz, Bluetooth, wired", battery: 2000, keycaps: "Double-shot PBT" }, ["a silicone gasket mount with three layers of foam", "a small OLED display", "a hot-swap PCB with a switch and keycap kit"]),
    F("B0DG7H487F", "ASUS ROG Falchion Ace HFX", "Falchion Ace HFX", { layout: "65%", switch: "ROG HFX Hall effect magnetic", connection: "Wired", polling: 8000, keycaps: "PBT" }, ["actuation adjustable from 0.1 to 4.0mm with Rapid Trigger", "two USB-C ports for switching between two PCs", "a protective cover for travel"]),
    F("B0D9Y83J89", "ASUS TUF Gaming K3 Gen II", "TUF K3 Gen II", { layout: "97-key compact", switch: "Optical-mechanical", connection: "Wired", keycaps: "PBT" }, ["IP57 water and dust resistance", "a silicone gasket mount with dampening foam", "a detachable top plate"]),
    F("B0CG2ZX7J6", "ASUS ROG Falchion Ace", "Falchion Ace", { layout: "65%", switch: "ROG NX mechanical", connection: "Wired", keycaps: "Double-shot PBT" }, ["arrow and navigation keys in a 306mm frame", "lubricated switch stems"]),
    F("B0D631D7N9", "Keychron K10 Max", "K10 Max", { layout: "Full-size (108 keys)", connection: "2.4GHz, Bluetooth, wired", polling: 1000 }, ["QMK firmware with the Keychron Launcher web app for remapping", "Bluetooth pairing with three devices", "acoustic foam"]),
    F("B0GQHDP2SP", "Keychron K10 Ultra 8K", "K10 Ultra 8K", { layout: "Full-size (100%)", connection: "2.4GHz, Bluetooth, wired", polling: 8000, battery: 760 }, ["8000Hz polling in both wired and 2.4GHz modes", "ZMK firmware for remapping", "Bluetooth pairing with three devices"]),
    F("B0BLYKTL78", "Redragon K556 PRO Wireless", "K556 PRO", { layout: "Full-size (104 keys)", switch: "Quiet linear", connection: "2.4GHz, Bluetooth, wired" }, ["an aluminium top frame", "hot-swap sockets for 3-pin and 5-pin switches", "macro software"]),
  ]),
};
