import pool from "@/data/pcj-pool/paste.json";
import type { Fact } from "@/lib/pc-compose/generic";
import { withPool } from "./helpers";

/**
 * Thermal pastes added in batch 20 from the Creators API pool (data/pcj-pool/paste.json). Every field is taken from the
 * listing's title or bullets; fields a listing omits are left undefined. Corsair TM30 (B07KQ1T158) was dropped because
 * its bullets are copied from the XTM50 listing.
 */
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const paste20Facts = withPool(pool as Record<string, { img?: string; price?: string }>, [
  F("B07L9BDY3T", "ARCTIC MX-4 (4g)", "MX-4", { grams: 4, nonConductive: true, kind: "Carbon microparticle", life: 8 }, ["a formula ARCTIC says lasts at least eight years once applied", "a consistency ARCTIC pitches at first-time builders"]),
  F("B0795DP124", "ARCTIC MX-4 with Spatula (4g)", "MX-4 with spatula", { grams: 4, nonConductive: true, kind: "Carbon microparticle", extras: "a spatula" }, ["an authenticity code on every pack", "metal-free carbon microparticles"]),
  F("B09VDLH5M6", "ARCTIC MX-6 (8g)", "MX-6 8g", { grams: 8, nonConductive: true }, ["lower thermal resistance than ARCTIC's MX-4, by the maker's measure", "a viscosity suited to direct-die GPU and console chips", "neither electrically conductive nor capacitive"]),
  F("B09VDKSMQL", "ARCTIC MX-6 with MX Cleaner (4g)", "MX-6 with cleaner", { grams: 4, nonConductive: true, extras: "six MX Cleaner wipes" }, ["lower thermal resistance than ARCTIC's MX-4, by the maker's measure", "a viscosity suited to direct-die GPU and console chips"]),
  F("B0FT2TC2NW", "ARCTIC MX-7 (8g)", "MX-7 8g", { grams: 8, nonConductive: true, spread: "Cannot be spread by hand; cooler pressure distributes it" }, ["a dense, high-filler formula", "resistance to pump-out, dry-out and bleeding over repeated heat cycles"]),
  F("B0FT2TYMR6", "ARCTIC MX-7 with MX Cleaner (4g)", "MX-7 with cleaner", { grams: 4, nonConductive: true, extras: "MX Cleaner wipes", spread: "Cannot be spread by hand; cooler pressure distributes it" }, ["a dense, high-filler formula", "a thin bond line that forms under mounting pressure without trapped air"]),
  F("B002CQU14A", "Noctua NT-H1 (3.5g)", "NT-H1", { grams: 3.5, life: 5, apps: "About 3 to 20", spread: "No need to spread before mounting" }, ["cleanup with a dry paper towel, no alcohol needed", "a recommended storage time of up to three years"]),
  F("B0B1DMJQZ1", "Noctua NT-H1 SW Edition (3.5g)", "NT-H1 SW", { grams: 3.5, life: 5, apps: "About 3 to 20", extras: "a spatula and three cleaning wipes" }, ["a rated usage time of up to five years on a CPU or GPU", "wipes that remove old paste without a separate cleaner"]),
  F("B07MZ5GQBM", "Noctua NT-H2 (10g)", "NT-H2 10g", { grams: 10, life: 5, apps: "About 9 to 60", extras: "10 cleaning wipes", spread: "No need to spread before mounting" }, ["the second generation of Noctua's NT-H1", "enough for dozens of mainstream CPUs"]),
  F("B0BGS99833", "Noctua NT-H2 AM5 Edition (3.5g)", "NT-H2 AM5", { grams: 3.5, life: 5, apps: "About 3 to 20", extras: "an AM5 paste guard and three cleaning wipes" }, ["an NA-TPG1 guard that keeps paste out of the AM5 heatspreader's cut-outs", "the second generation of Noctua's NT-H1"]),
  F("B00ZJSF5LM", "Thermal Grizzly Kryonaut (5.55g)", "Kryonaut 5.55g", { grams: 5.55, extras: "a syringe and spatula" }, ["a maker claim that it does not dry out at 80°C", "a formula Thermal Grizzly aims at overclockers"]),
  F("B08T1K4NJ1", "Thermal Grizzly Kryonaut Extreme (2g)", "Kryonaut Extreme", { grams: 2, apps: "Up to 12 CPUs", extras: "a syringe and applicator" }, ["stability up to 80°C, by the maker's claim", "Thermal Grizzly's highest-conductivity non-metal paste"]),
  F("B00ZJSXE2Y", "Thermal Grizzly Hydronaut (3.9g)", "Hydronaut", { grams: 3.9, extras: "a syringe" }, ["a maker-rated thermal resistance of 0.0076 K/W", "a formula that does not harden, by the maker's claim"]),
  F("B08G1MLG42", "Thermal Grizzly Conductonaut Liquid Metal (1g)", "Conductonaut", { grams: 1, kind: "Liquid metal" }, ["up to 10 times the conductivity of standard greases, by the maker's claim", "a warning that it must not touch aluminium parts"]),
  F("B0872KVM1S", "Cooler Master MasterGel Pro V2", "MasterGel Pro V2", { wmk: 9 }, ["a 1.5mL tube", "a formula that spreads and wipes off without scratching the surface"]),
  F("B0DB6LS65K", "Cooler Master CryoFuze 5 (3g)", "CryoFuze 5", { grams: 3, nonConductive: true, kind: "Nanoparticle" }, ["a hydrophobic formula that repels moisture", "a non-corrosive, oxidation-resistant compound", "six colour options"]),
  F("B07V3GTMCS", "Corsair XTM50 (5g)", "XTM50", { grams: 5, nonConductive: true, kind: "Zinc oxide", extras: "an application stencil and spreader" }, ["a low-viscosity compound that fills fine surface channels", "zero volatile compounds, by the maker's claim"]),
  F("B0DC6QYXHP", "Corsair XTM60 (3g)", "XTM60", { grams: 3, extras: "an applicator card" }, ["a low-viscosity formula for an even layer", "resistance to drying and cracking over time"]),
  F("B0GPQCQPGW", "Gelid Solutions GC5 (3.5g)", "GC5", { grams: 3.5, nonConductive: true, kind: "Nano diamond-ceramic" }, ["resistance to pump-out and drying under sustained load", "a non-curing, non-corrosive formula"]),
  F("B0BXLFTZDK", "Gelid Solutions GC-4 (3.5g)", "GC-4", { grams: 3.5, maxTemp: 150 }, ["a rated range of -30°C to 150°C", "a non-curing formula"]),
  F("B0D9W7DT2B", "Thermalright TF8 EX (2.9g)", "TF8 EX", { grams: 2.9, wmk: 14, nonConductive: true, maxTemp: 380 }, ["a metal-free, non-corrosive formula", "a blue paste colour that shows the coverage"]),
  F("B0B14DH28P", "Thermalright TFX (2g)", "TFX", { grams: 2, wmk: 14.3, maxTemp: 300 }, ["a thick consistency the maker acknowledges", "a low-volatility grease built for long service"]),
  F("B0087X728K", "Arctic Silver 5 (3.5g)", "Arctic Silver 5", { grams: 3.5, kind: "Micronized silver" }, ["99.9% pure micronized silver with ceramic particles", "a compound that will not separate, run or bleed"]),
  F("B0087X73AM", "Arctic Silver Ceramique 2 (2.7g)", "Ceramique 2", { grams: 2.7, nonConductive: true, kind: "Ceramic" }, ["2 to 10 degrees lower full-load temperatures, by the maker's claim", "a compound that will not separate, run or bleed"]),
  F("B0BPM8K6RN", "be quiet! DC2 Thermal Grease (3g)", "DC2", { grams: 3, wmk: 7.5, maxTemp: 120, apps: "About 9", extras: "a spatula" }, ["a rated range of -20°C to 120°C", "the paste be quiet! supplies with its Dark Rock coolers"]),
  F("B0H5G1HBVF", "Kingpin Cooling KPx (3g)", "KPx", { grams: 3, nonConductive: true }, ["a formula developed by overclocker Vince \"Kingpin\" Lucido", "a paste that spreads evenly without separating"]),
  F("B0DK3HQL4V", "ID-COOLING Frost X45 (4g)", "Frost X45", { grams: 4, wmk: 15.2, nonConductive: true }, ["a metal-free formula", "resistance to drying, cracking and separation"]),
  F("B0G3TV4VMQ", "ID-COOLING Frost X55 Core (4g)", "Frost X55 Core", { grams: 4, wmk: 16.2, nonConductive: true }, ["a metal-free formula", "resistance to drying, cracking and separation"]),
  F("B0DSTW6P8B", "Thermal Grizzly Duronaut (6g)", "Duronaut 6g", { grams: 6, nonConductive: true, kind: "Aluminium and zinc oxide particles", extras: "a TG Spatula Pro" }, ["a formula built to minimise pump-out", "a paste that does not harden over time"]),
]);
