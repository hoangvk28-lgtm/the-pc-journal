import pool from "@/data/pcj-pool/acc37-wifi.json";
import { withPool } from "./helpers";
import { mkSchema, F } from "./acc37-helpers";

/** PCIe Wi-Fi cards. Figures come from each listing's title and bullets; unstated fields stay undefined. */
export const wifiSchema = mkSchema("pcie-wifi", "PCIe Wi-Fi Cards", [
  { key: "std", label: "Wi-Fi standard", fmt: (v) => String(v), strength: (v) => `${v} support` },
  { key: "rate", label: "Rated speed class", noun: "speed class", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} Mbps (maker's class)`, rule: { label: "Highest Rated Speed Class", bestFor: ["A Wi-Fi 6E or Wi-Fi 7 router on the same desk.", "Large transfers over a strong 6GHz link."] } },
  { key: "bt", label: "Bluetooth", noun: "Bluetooth version", better: "higher", superlative: ["newest", "oldest"], fmt: (v) => `Bluetooth ${v}`, strength: (v) => `Bluetooth ${v}` },
  { key: "bands", label: "Bands", fmt: (v) => String(v) },
  { key: "platform", label: "Platform note", fmt: (v) => String(v), weakness: (v) => (/intel only|not for amd/i.test(String(v)) ? "Listed for Intel platforms only" : undefined) },
  { key: "antenna", label: "Antennas", fmt: (v) => String(v) },
], (f) => {
  const s = ["It needs a free PCIe x1 slot and a USB 9-pin header on the motherboard for the Bluetooth link; check the board manual before buying."];
  const std = String(f.specs.std ?? "");
  if (/6E|7/.test(std)) s.push("The 6GHz band only works with a matching Wi-Fi 6E or Wi-Fi 7 router, and Windows 11 or a current driver is usually required.");
  if (/7/.test(std)) s.push("Wi-Fi 7 features such as 320MHz channels and Multi-Link Operation also depend on a Wi-Fi 7 router.");
  if (/intel only|not for amd/i.test(String(f.specs.platform ?? ""))) s.push("The listing limits it to Intel platforms, so do not buy it for an AMD board.");
  return s;
}, [
  ["Match the standard to your router", "A Wi-Fi 7 card on a Wi-Fi 5 router gives you Wi-Fi 5 speeds. Buy for the router you have or will buy soon."],
  ["Speed classes are maximums", "AX3000, AXE5400 or BE9300 add up the maximum rates of every band. A single device on one band gets far less."],
  ["Bluetooth needs a USB header", "Most cards add Bluetooth through an internal USB 9-pin lead. Without a free header, you will only get Wi-Fi."],
  ["Check the platform note", "Some Wi-Fi 7 cards state Intel-only support or Windows 11 only. Check the listing against your board and OS."],
  ["Antenna placement", "External antennas on a magnetic base can move up to the desk top, away from the metal case, for better reception."],
], [
  ["Is a PCIe Wi-Fi card better than USB?", "A PCIe card has stable internal connections and external antennas, and it keeps USB ports free."],
  ["Do I need Wi-Fi 6E or 7?", "Only with a router that supports it. Wi-Fi 6 is plenty for many homes."],
  ["Will it work on Linux?", "Support depends on the chipset and kernel. Check driver notes for the specific chip."],
  ["Does the card also give me Bluetooth?", "The listings state Bluetooth versions, but you must connect the card's USB lead to a header on the board."],
  ["Wi-Fi card or Ethernet?", "A wired Ethernet connection is more stable if you can run a cable; use a card when you cannot."],
], [
  ["Wi-Fi standard", "We recorded the standard each listing states."],
  ["Rated speed class", "We noted the AX or BE rating where the title gives it."],
  ["Bluetooth version", "We recorded the Bluetooth version where stated."],
  ["Platform notes", "We checked for Intel-only or OS limits in the listing."],
]);

export const wifi37Facts = withPool(pool as Record<string, { img?: string; price?: string }>, [
  F("B091HTG6DQ", "GIGABYTE GC-WBAX210 Wi-Fi 6E PCIe Card", "GIGABYTE GC-WBAX210", { std: "Wi-Fi 6E", bt: "5.2", bands: "Tri-band (2.4, 5, 6GHz)" }, ["an Intel AX210 module", "2x2 dual-stream wireless on all three bands", "a listed speed of up to 2400Mbps"]),
  F("B0B1NRGDQ4", "TP-Link AX3000 Wi-Fi 6 PCIe Card", "TP-Link AX3000", { std: "Wi-Fi 6", rate: 3000, bt: "5.2", bands: "Dual band", antenna: "2 high-gain antennas" }, ["standard and low-profile brackets", "OFDMA and MU-MIMO", "WPA3 security"]),
  F("B0B4VH4G1C", "TP-Link AXE5400 Wi-Fi 6E PCIe Card", "TP-Link AXE5400", { std: "Wi-Fi 6E", rate: 5400, bt: "5.3", bands: "Tri-band (2.4, 5, 6GHz)", antenna: "2 high-gain antennas" }, ["an Intel AX210 chipset", "up to 2402Mbps each on the 6GHz and 5GHz bands", "WPA3 security"]),
  F("B0C388Z522", "ASUS PCE-AXE59BT Wi-Fi 6E PCIe Adapter", "ASUS PCE-AXE59BT", { std: "Wi-Fi 6E", rate: 5400, bt: "5.2", bands: "Tri-band (2.4, 5, 6GHz)", antenna: "2 external antennas on a magnetic base" }, ["160MHz channel support", "a magnetised antenna base", "a listed 6GHz band"]),
  F("B0B17BFCGS", "ASUS PCE-AX1800 Wi-Fi 6 PCIe Adapter", "ASUS PCE-AX1800", { std: "Wi-Fi 6", rate: 1800, bt: "5.2", bands: "Dual band", antenna: "2 external antennas" }, ["OFDMA and MU-MIMO", "WPA3 security", "a low entry price"]),
  F("B0DR3Y4FFF", "TP-Link BE9300 Wi-Fi 7 PCIe Card (Archer TBE552E)", "TP-Link BE9300", { std: "Wi-Fi 7", rate: 9300, bt: "5.4", bands: "Tri-band (2.4, 5, 6GHz)", antenna: "2 high-gain antennas" }, ["320MHz channels on the 6GHz band with a Wi-Fi 7 router", "Multi-Link Operation with a Wi-Fi 7 router", "a listed 9.3Gbps total bandwidth"]),
  F("B0D33M6CB7", "GIGABYTE GC-WIFI7 PCIe Card", "GIGABYTE GC-WIFI7", { std: "Wi-Fi 7", rate: 5800, bt: "5.3", bands: "Tri-band (2.4, 5, 6GHz)" }, ["320MHz bandwidth across all three bands", "4K-QAM and Multi-Link Operation", "a listed speed of up to 5800Mbps"]),
  F("B0DLYWPP7X", "ASUS BE6500 PCI-E Wi-Fi 7 Adapter", "ASUS BE6500", { std: "Wi-Fi 7", rate: 6500, bt: "5.4", bands: "Tri-band", platform: "Windows 11 only", antenna: "Adjustable external antennas" }, ["4096-QAM modulation", "MLO, OFDMA and MU-MIMO", "TAA compliance"]),
  F("B0D93H1CCR", "Cudy BE9300 Wi-Fi 7 PCIe Adapter (WE9300S)", "Cudy BE9300", { std: "Wi-Fi 7", rate: 9300, bt: "5.4", bands: "Tri-band (2.4, 5, 6GHz)", platform: "Intel only, Windows 11, USB 9-pin header required", antenna: "Dual detachable antennas on a magnetic base" }, ["an Intel BE200 chipset", "up to 5765Mbps on 6GHz, 2882Mbps on 5GHz and 688Mbps on 2.4GHz", "320MHz channels, MLO and 4K-QAM"]),
  F("B0CV9H8G2P", "ASUS PCE-BE92BT Wi-Fi 7 PCI-E Adapter", "ASUS PCE-BE92BT", { std: "Wi-Fi 7", bt: "5.4", bands: "Includes 6GHz", platform: "Intel motherboards only", antenna: "2 external antennas" }, ["320MHz bandwidth", "WPA3 security", "a freestanding antenna transceiver on a cable"]),
]);
