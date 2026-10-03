import mbPool from "@/data/pcj-pool/motherboard.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 31: parts added for the PC build guides. Every field below comes from the Amazon listing title or bullets
 * (read by hand); a field the listing does not state is left out, never inferred from the product family.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const mb31Facts: Record<string, Fact> = withPool(mbPool as Record<string, { img?: string; price?: string }>, [
  F("B09K4QMPL9", "ASUS TUF Gaming B550-PLUS WiFi II", "TUF B550-PLUS II", { socket: "AM4", chipset: "B550", form: "ATX", mem: "DDR4", m2: 2, lan: 2.5, wifi: "Wi-Fi 6" }, ["8+2 DrMOS power stages", "BIOS Flashback", "one PCIe 4.0 x4 M.2 slot"]),
  F("B0DXWWWTH8", "GIGABYTE B550 Eagle WIFI6", "B550 Eagle WIFI6", { socket: "AM4", chipset: "B550", form: "ATX", mem: "DDR4", m2: 2, lan: 1, wifi: "Wi-Fi 6" }, ["10+3 phase digital VRM", "a USB 3.2 Gen 1 Type-C port", "EZ-Latch tool-free fittings"]),
  F("B0BTTZFQTP", "GIGABYTE B550M K", "B550M K", { socket: "AM4", chipset: "B550", form: "Micro-ATX", mem: "DDR4", m2: 2, lan: 1 }, ["one PCIe 4.0 M.2 slot and one PCIe 3.0 M.2 slot", "four USB 3.2 Gen 1 ports"]),
  F("B0FDLCT35H", "GIGABYTE B550M DS3H AC R2", "B550M DS3H AC R2", { socket: "AM4", chipset: "B550", form: "Micro-ATX", mem: "DDR4", m2: 2, lan: 1, wifi: "Wi-Fi 5" }, ["a reinforced PCIe 4.0 x16 slot", "WiFi EZ Plug", "one PCIe 4.0 M.2 slot and one PCIe 3.0 M.2 slot"]),
  F("B0BDCZRBD6", "MSI PRO B550M-VC WiFi", "PRO B550M-VC", { socket: "AM4", chipset: "B550", form: "Micro-ATX", mem: "DDR4", wifi: "Wi-Fi 6E" }, ["a Lightning Gen4 x4 M.2 slot with M.2 Shield Frozr", "HDMI and DisplayPort video outputs", "Bluetooth 5.2"]),
  F("B0H2C1VYZ7", "MSI PRO B550M-P", "PRO B550M-P", { socket: "AM4", chipset: "B550", form: "Micro-ATX", mem: "DDR4", m2: 2, lan: 1 }, ["one M.2 Gen4 x4 slot and one M.2 Gen3 x4 slot", "a PCIe 4.0 x16 slot with Steel Armor"]),
  F("B0DQLK2RF3", "GIGABYTE B860I AORUS PRO ICE", "B860I AORUS PRO ICE", { socket: "LGA1851", chipset: "B860", form: "Mini-ITX", mem: "DDR5", m2: 2, lan: 2.5, wifi: "Wi-Fi 7" }, ["Thunderbolt 4", "an 80A SPS VRM", "a PCIe 5.0 graphics slot"]),
  F("B0DK7KTY8K", "GIGABYTE Z890I AORUS Ultra", "Z890I AORUS Ultra", { socket: "LGA1851", chipset: "Z890", form: "Mini-ITX", mem: "DDR5", lan: 2.5, wifi: "Wi-Fi 7" }, ["Thunderbolt 4 and a USB 3.2 Gen 2 Type-C port", "a 105A SPS VRM", "a reinforced PCIe 5.0 slot with EZ-Latch Plus"]),
]);
