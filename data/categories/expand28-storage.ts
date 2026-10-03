import pool from "@/data/pcj-pool/storage.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Batch 28 portable and external drive fact sheets for storage13eSchema: portable SSDs from Samsung, SanDisk, Crucial,
 * WD, Seagate, Lexar, Kingston, ADATA and PNY, rugged and encrypted models, budget SSDs and portable hard drives.
 * Capacity, quoted read speed, port, durability and security come from the listing titles and bullets and are reviewed
 * by hand; fields stay undefined or "Not stated" when the listing does not say. Desktop hard drives, renewed units and
 * flash drives are skipped.
 */
const P = (asin: string, name: string, short: string, kind: "SSD" | "HDD", capacity: number, read: number | undefined, port: string, rugged = "Not stated", security = "None stated", notes: string[] = []) =>
  ({ asin, name, short, specs: { kind, capacity, read, port, rugged, security } as Fact["specs"], notes: notes.length ? notes : [`a ${port} connection`] });
const G2 = "USB 3.2 Gen 2 (10Gbps)", G22 = "USB 3.2 Gen 2x2 (20Gbps)";

export const expand28StorageFacts: Record<string, Fact> = withPool(pool as Record<string, { img?: string; price?: string }>, [
  // Samsung
  P("B0874YJP92", "Samsung T7 Portable SSD 1TB", "Samsung T7 1TB", "SSD", 1, 1050, G2, "Not stated", "None stated", ["a reliable pocket-sized build for gaming and creator work"]),
  P("B0874Y5XFG", "Samsung T7 Portable SSD 2TB", "Samsung T7 2TB", "SSD", 2, 1050, G2),
  P("B0CHFSZX9W", "Samsung T9 Portable SSD 4TB", "Samsung T9 4TB", "SSD", 4, undefined, G22, "Not stated", "Encryption via Magician software", ["a USB 3.2 Gen 2x2 interface"]),
  P("B0BHZQGN26", "Samsung T7 Shield Portable SSD 4TB", "Samsung T7 Shield 4TB", "SSD", 4, 1050, G2, "IP65, drop resistant"),
  P("B0CMDJXZ19", "Samsung T5 EVO Portable SSD 4TB", "Samsung T5 EVO 4TB", "SSD", 4, 460, "USB 3.2 Gen 1 (5Gbps)"),
  // SanDisk
  P("B0H6MF2MTN", "SanDisk Extreme Portable SSD 500GB (new model)", "SanDisk Extreme 500GB", "SSD", 0.5, 2000, "USB-C", "IP65, drops up to 3m", "Password, 256-bit AES encryption"),
  P("B0GMX4CN7X", "SanDisk Extreme Portable SSD 2TB (new model)", "SanDisk Extreme 2TB", "SSD", 2, 2000, "USB-C", "IP65, drops up to 3m", "Password, 256-bit AES encryption"),
  P("B0C59G53GS", "SanDisk Extreme Portable SSD 2TB (1050MB/s)", "SanDisk Extreme 2TB 1050", "SSD", 2, 1050, "USB-C (USB 3.2 Gen 2)"),
  P("B08GTYFC37", "SanDisk Extreme Portable SSD 1TB (1050MB/s)", "SanDisk Extreme 1TB 1050", "SSD", 1, 1050, "USB-C (USB 3.2 Gen 2)"),
  P("B0H4M835X3", "SanDisk Extreme Pro Portable SSD 2TB (4000MB/s)", "SanDisk Extreme Pro 2TB", "SSD", 2, 4000, "USB-C", "IP65, drops up to 3m", "Password, 256-bit AES encryption"),
  P("B0H4HKMBB4", "SanDisk Portable SSD 500GB (new model)", "SanDisk Portable 500GB", "SSD", 0.5, 1000, "USB-C", "Drops up to 2m"),
  P("B0H8Z5GY7T", "SanDisk Portable Drive 500GB (600MB/s)", "SanDisk 500GB 600", "SSD", 0.5, 600, "USB-C"),
  // Crucial
  P("B0CK778YL5", "Crucial X9 1TB External SSD", "Crucial X9 1TB", "SSD", 1, undefined, G2),
  P("B0F3377JBN", "Crucial X10 Portable SSD 1TB", "Crucial X10 1TB", "SSD", 1, 2100, "USB-C (USB 3.2)", "IP65, drops up to 3m"),
  P("B0F9FDLKV4", "Crucial X10 Portable SSD 2TB", "Crucial X10 2TB", "SSD", 2, 2100, G22),
  // WD and Seagate
  P("B08F27QGHX", "WD My Passport SSD 1TB", "WD My Passport SSD 1TB", "SSD", 1, 1050, "USB-C", "Drops up to 6.5ft", "Password, 256-bit AES hardware encryption"),
  P("B08F1MRQFD", "WD My Passport SSD 2TB", "WD My Passport SSD 2TB", "SSD", 2, 1050, "USB-C", "Drops up to 6.5ft", "Password, 256-bit AES hardware encryption"),
  P("B09ZRD38D8", "WD P40 Game Drive SSD 1TB", "WD P40 Game Drive 1TB", "SSD", 1, 2000, G22, "Drops up to 2m", "None stated", ["RGB lighting", "a design for consoles and PCs"]),
  P("B07YFGT6L5", "WD_Black P50 Game Drive SSD 500GB", "WD_Black P50 500GB", "SSD", 0.5, undefined, G22, "Not stated", "None stated", ["PlayStation, Xbox, PC and Mac compatibility"]),
  P("B08XKL34XB", "Seagate One Touch SSD 2TB", "Seagate One Touch SSD 2TB", "SSD", 2, 1030, "USB-C", "Not stated", "None stated", ["a six-month Mylio Photo+ subscription"]),
  P("B07HP98FW6", "Seagate Game Drive for Xbox 1TB SSD", "Seagate Game Drive Xbox 1TB", "SSD", 1, undefined, "USB 3.0", "Not stated", "None stated", ["an Xbox-designed portable SSD"]),
  P("B0713WPGLL", "WD Elements Portable 4TB", "WD Elements 4TB", "HDD", 4, undefined, "USB 3.2 Gen 1 (USB 3.0)"),
  P("B06VVS7S94", "WD Elements Portable 1TB", "WD Elements 1TB", "HDD", 1, undefined, "USB 3.0"),
  P("B07VP5WG78", "WD My Passport 4TB", "WD My Passport 4TB", "HDD", 4, undefined, "USB 3.0", "Not stated", "Password protection with hardware encryption"),
  P("B07VSPL8FJ", "WD My Passport for Mac 2TB", "WD My Passport Mac 2TB", "HDD", 2, undefined, "USB-C", "Not stated", "Password protection", ["backup software for Mac"]),
  P("B0CGVZDLDP", "WD_Black P10 Game Drive 2TB", "WD_Black P10 2TB", "HDD", 2, undefined, "USB 3.2 Gen 1", "Not stated", "None stated", ["PlayStation, Xbox and PC compatibility"]),
  P("B07VNTFK87", "WD_Black P10 Game Drive 4TB", "WD_Black P10 4TB", "HDD", 4, undefined, "USB 3.2 Gen 1", "Not stated", "None stated", ["PlayStation, Xbox and PC compatibility"]),
  P("B0BHJKZ8SD", "Seagate Game Drive for PS4/PS5 5TB", "Seagate Game Drive PS 5TB", "HDD", 5, undefined, "USB 3.0", "Not stated", "None stated", ["a design for PlayStation"]),
  // Lexar
  P("B0D813W97R", "Lexar SL500 1TB External SSD", "Lexar SL500 1TB", "SSD", 1, 2000, G22),
  P("B0CVNM6H87", "Lexar SL500 2TB External SSD", "Lexar SL500 2TB", "SSD", 2, 2000, G22),
  P("B0DFZZH6VV", "Lexar Go 1TB Portable SSD", "Lexar Go 1TB", "SSD", 1, 1050, G2, "Not stated", "None stated", ["an ultracompact body"]),
  P("B0DNGJRX1V", "Lexar Professional Go 1TB with Hub", "Lexar Pro Go 1TB", "SSD", 1, undefined, "USB-C (USB 3.2 Gen 2) with 4 USB-C connectors", "IP65, drops up to 1m", "None stated", ["a built-in hub"]),
  P("B0F37WWYY4", "Lexar ES3 1TB Portable SSD", "Lexar ES3 1TB", "SSD", 1, 1050, G2, "Not stated", "256-bit AES encryption via DataShield software"),
  P("B0D1FQMNZZ", "Lexar Armor 700 2TB External SSD", "Lexar Armor 700 2TB", "SSD", 2, 2000, G22, "IP66, drops up to 3m"),
  P("B0FPHRQLD2", "Lexar ES5 2TB Magnetic External SSD", "Lexar ES5 2TB", "SSD", 2, 2000, "USB-C", "IP65, drops up to 3m", "None stated", ["a magnetic back that works with MagSafe phones"]),
  // Kingston, ADATA, PNY
  P("B09F5YHQ1K", "Kingston XS2000 1TB", "Kingston XS2000 1TB", "SSD", 1, 2000, G22, "Not stated", "None stated", ["a pocket-sized body"]),
  P("B09F5WJV8R", "Kingston XS2000 500GB", "Kingston XS2000 500GB", "SSD", 0.5, 2000, G22, "Not stated", "None stated", ["a pocket-sized body"]),
  P("B0CCQB7BN7", "Kingston XS1000 1TB", "Kingston XS1000 1TB", "SSD", 1, 1050, G2, "Not stated", "None stated", ["a pocket-sized body"]),
  P("B0D9HJNR5W", "Kingston XS1000R 1TB", "Kingston XS1000R 1TB", "SSD", 1, 1050, G2, "Not stated", "None stated", ["a pocket-sized body"]),
  P("B09VS3FCQ2", "ADATA SE880 1TB", "ADATA SE880 1TB", "SSD", 1, undefined, "USB-C"),
  P("B0CN8THQMK", "ADATA SD810 512GB", "ADATA SD810 512GB", "SSD", 0.5, 2000, G22, "IP68"),
  P("B0BRSM3SZ8", "ADATA SD820 1TB", "ADATA SD820 1TB", "SSD", 1, undefined, G22),
  P("B01411OUH2", "ADATA HD720 2TB", "ADATA HD720 2TB", "HDD", 2, undefined, "USB 3.0", "IP68, shock resistant"),
  P("B0744NCY4K", "ADATA HD710 Pro 2TB", "ADATA HD710 Pro 2TB", "HDD", 2, undefined, "USB 3.0", "Shockproof, waterproof, dustproof"),
  P("B09RQ92DZT", "PNY Pro Elite V2 1TB", "PNY Pro Elite V2 1TB", "SSD", 1, undefined, G2),
  P("B0CZ4N47M6", "PNY RP60 1TB", "PNY RP60 1TB", "SSD", 1, undefined, G22, "IP65"),
  // Other brands, budget and secure drives
  P("B0DX65SQXF", "Amazon Basics Portable SSD 1TB", "Amazon Basics SSD 1TB", "SSD", 1, 2000, G2, "IP65 water and dust resistant"),
  P("B0DX68TWW4", "Amazon Basics Portable SSD 2TB", "Amazon Basics SSD 2TB", "SSD", 2, 2000, G2, "IP65 water and dust resistant"),
  P("B0H1PFZZ5Y", "nusyn NSP35 Portable SSD 1TB", "nusyn NSP35 1TB", "SSD", 1, 1050, G2, "IP67"),
  P("B0FRMR5JL2", "GARMESE Portable SSD 500GB", "GARMESE 500GB", "SSD", 0.5, 1000, G2),
  P("B0H7VRYZSJ", "OSCOO Touchscreen Encrypted SSD 1TB", "OSCOO touchscreen 1TB", "SSD", 1, 2000, "USB-C", "Not stated", "Hardware encryption, password protection"),
  P("B08MLGC1M6", "iStorage diskAshur M2 SSD", "diskAshur M2", "SSD", 0.25, undefined, "USB 3.2", "Drops up to 4m", "PIN authentication, AES-XTS 256-bit hardware encryption", ["a FIPS-compliant design"]),
  P("B00NTQGZP6", "Apricorn Aegis Padlock 2TB", "Aegis Padlock 2TB", "HDD", 2, undefined, "USB 3.0", "Not stated", "PIN, AES-XTS 256-bit hardware encryption", ["an administrator password feature"]),
  P("B0FBWHM94H", "TWOPAN Fingerprint Nano SSD 512GB", "TWOPAN fingerprint 512GB", "SSD", 0.5, 450, "USB-C", "Not stated", "Fingerprint unlock"),
  P("B082VZLPN3", "Vansuny Portable SSD 250GB", "Vansuny 250GB", "SSD", 0.25, 430, "USB 3.1 Gen 2"),
  P("B0GJRKVMYK", "ORICO M25PRO Portable SSD 256GB", "ORICO M25PRO 256GB", "SSD", 0.25, 460, "USB-C", "Dust and drop resistant"),
  P("B08JKG2TBQ", "Toshiba Canvio Advance 2TB", "Canvio Advance 2TB", "HDD", 2, undefined, "USB 3.0", "Not stated", "Password protection software"),
  P("B08JKCWRTD", "Toshiba Canvio Advance 4TB", "Canvio Advance 4TB", "HDD", 4, undefined, "USB 3.0", "Not stated", "Password protection software"),
  P("B0BQX6NNVC", "Toshiba Canvio Basics 2TB", "Canvio Basics 2TB", "HDD", 2, undefined, "USB 3.0", "Not stated", "None stated", ["reformatting required for Mac"]),
]);
