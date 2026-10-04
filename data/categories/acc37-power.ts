import pool from "@/data/pcj-pool/acc37-power.json";
import { withPool } from "./helpers";
import { mkSchema, F } from "./acc37-helpers";

type Pool = Record<string, { img?: string; price?: string }>;

/** UPS units and surge protectors. Figures come from each listing's title and bullets; unstated fields stay undefined. */
export const upsSchema = mkSchema("ups", "UPS Units", [
  { key: "va", label: "Capacity (VA)", noun: "VA rating", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v}VA` },
  { key: "watts", label: "Capacity (watts)", noun: "wattage", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v}W`, rule: { label: "Highest Wattage", bestFor: ["A gaming PC with a high-wattage graphics card.", "A desk with a PC, monitor and networking gear on battery."] }, strength: (v) => `${v}W of rated output` },
  { key: "wave", label: "Output waveform", fmt: (v) => String(v), strength: (v) => (/pure|pfc/i.test(String(v)) ? `${v} output, suited to active PFC power supplies` : undefined), weakness: (v) => (/simulated/i.test(String(v)) ? "Simulated sine wave output, which some active PFC power supplies handle poorly" : undefined) },
  { key: "battery", label: "Battery-backed outlets", noun: "battery outlets", better: "higher", superlative: ["most", "fewest"], fmt: (v) => `${v} outlets` },
  { key: "surge", label: "Surge-only outlets", fmt: (v) => `${v} outlets` },
  { key: "runtime", label: "Stated runtime", fmt: (v) => String(v) },
  { key: "warranty", label: "Warranty", fmt: (v) => String(v) },
], (f) => {
  const s = ["Add up the real draw of your PC at load plus the monitor and router, and keep it below the unit's watt rating, not its VA rating; the watt figure is the one that limits a PC."];
  if (/simulated/i.test(String(f.specs.wave ?? ""))) s.push("Check your power supply's manual before pairing it with a simulated sine wave unit; some active PFC supplies shut off or reset on battery.");
  return s;
}, [
  ["Size by watts, not VA", "A UPS's VA figure is higher than its usable watts. Compare the watt rating with your PC's peak load."],
  ["Sine wave output suits active PFC supplies", "Most modern PC power supplies use active PFC. A pure or PFC sine wave UPS avoids the risk of a reset on battery."],
  ["Runtime is short on purpose", "A UPS gives minutes, enough to save work and shut down. Runtime drops quickly as load rises."],
  ["Count battery-backed outlets", "Only some outlets are battery-backed. Put the PC, monitor and router on those, and printers on surge-only outlets."],
  ["Battery replacement and warranty", "Look for a user-replaceable battery and a warranty that covers it."],
], [
  ["Do I need a UPS for a gaming PC?", "It helps where outages or brownouts are common, because it gives you time to save and shut down."],
  ["Is a UPS the same as a surge protector?", "No. A surge protector only clips spikes. A UPS also supplies battery power during an outage."],
  ["Can a UPS run my PC through a long outage?", "No. Expect minutes at gaming load; it is for a clean shutdown."],
  ["Is pure sine wave necessary?", "It is the safer match for active PFC power supplies; many simulated units work, but check the PSU manual."],
  ["Where should I plug a laser printer?", "Into a surge-only outlet. Printers draw large peaks that can overload a battery outlet."],
], [
  ["Capacity", "We recorded the VA and watt ratings each listing states."],
  ["Waveform", "We noted sine wave or simulated sine wave output."],
  ["Outlets", "We counted battery-backed and surge-only outlets."],
  ["Warranty and runtime", "We noted stated warranty and runtime figures."],
]);

export const surgeSchema = mkSchema("surge-protector", "Surge Protectors", [
  { key: "joules", label: "Surge rating", noun: "joule rating", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} joules`, rule: { label: "Highest Joule Rating", bestFor: ["A desk with a PC, monitors and a printer.", "Homes with frequent storms or unstable power."] }, strength: (v) => `${v} joules of surge protection` },
  { key: "outlets", label: "AC outlets", noun: "outlet count", better: "higher", superlative: ["most", "fewest"], fmt: (v) => `${v} outlets`, strength: (v) => `${v} AC outlets` },
  { key: "cord", label: "Cord length", noun: "cord length", better: "higher", superlative: ["longest", "shortest"], fmt: (v) => `${v}ft` },
  { key: "usb", label: "USB ports", fmt: (v) => String(v), strength: (v) => (v ? `${v} for charging` : undefined) },
  { key: "extras", label: "Extras", fmt: (v) => String(v) },
], () => ["A surge protector clips voltage spikes but does not keep a PC on in an outage. Keep the total plugged-in load under 15A (1875W), and do not chain strips."], [
  ["Joules show how much it can absorb", "A higher joule rating means the protector can take more surge energy before wearing out. Treat it as one comparison number among several."],
  ["Outlet spacing", "Bulky power bricks block neighbouring outlets. Look for wide spacing or rotating outlets."],
  ["Cord length and plug", "A flat plug sits flush against the wall, which suits tight spots behind a desk."],
  ["USB charging ports", "Built-in USB ports save adapters, but check the stated charging speed."],
  ["Safety listings", "Look for UL or ETL certification, and a breaker or switch for overloads."],
], [
  ["Does a surge protector protect against lightning?", "It can reduce damage from nearby surges, but a direct strike can overwhelm any strip."],
  ["Do surge protectors wear out?", "Yes, they absorb damage over time and should be replaced after major surges."],
  ["Can I plug a space heater into one?", "No. Heaters draw near the strip's 15A limit and belong in a wall outlet."],
  ["Is a UPS better?", "A UPS also supplies battery power in an outage and regulates voltage. A strip is simpler and cheaper."],
  ["How many outlets do I need?", "Count every device at the desk and add a couple of spares."],
], [
  ["Surge rating", "We recorded the joule figure where the listing states it."],
  ["Outlets and cord", "We noted the AC outlet count and cord length."],
  ["USB ports", "We checked for built-in charging ports."],
  ["Safety listings", "We noted UL or ETL certification where stated."],
]);

export const ups37Facts = withPool(pool as Pool, [
  F("B06VY6FXMM", "APC BX1500M UPS (1500VA/900W)", "APC BX1500M", { va: 1500, watts: 900, battery: 5, surge: 5, warranty: undefined }, ["automatic voltage regulation that corrects brownouts without using the battery", "an LCD that shows charge level and estimated runtime", "a user-replaceable battery"]),
  F("B00429N19W", "CyberPower CP1500PFCLCD (1500VA/1000W)", "CyberPower CP1500PFCLCD", { va: 1500, watts: 1000, wave: "PFC sine wave", battery: 6, surge: 6, warranty: "3 years, including the battery" }, ["a colour LCD with battery and power conditions", "automatic voltage regulation", "a $500,000 connected equipment guarantee"]),
  F("B08GRY1W93", "APC BR1500MS2 (1500VA/900W)", "APC BR1500MS2", { va: 1500, watts: 900, wave: "Pure sine wave", battery: 6, surge: 4, runtime: "up to 73 minutes at 100W" }, ["Ethernet and coax surge protection", "front USB-C and USB-A charging ports", "a user-replaceable battery"]),
  F("B0BCMLLSHL", "CyberPower CP1500AVRLCD3 (1500VA/900W)", "CyberPower CP1500AVRLCD3", { va: 1500, watts: 900, wave: "Simulated sine wave", battery: 6, surge: 6, warranty: "3 years, including the battery" }, ["twelve outlets in total", "a colour LCD panel", "free PowerPanel software"]),
  F("B0C4R5JK74", "APC Back-UPS Pro Gaming BGM1500B (1500VA/900W)", "APC Back-UPS Pro Gaming", { va: 1500, watts: 900, wave: "Sine wave", battery: 6, surge: 4 }, ["12 customisable RGB LED colours", "a tilted status display showing runtime and load", "a design aimed at gaming desks"]),
  F("B085JJZDFK", "APC BE850G2 (850VA/450W)", "APC BE850G2", { va: 850, watts: 450, battery: 6, surge: 3, runtime: "up to 35 minutes at 100W", warranty: "3 years" }, ["two USB-A charging ports", "up to $75,000 equipment protection", "a user-replaceable battery"]),
  F("B00429N192", "CyberPower CP1000PFCLCD (1000VA/600W)", "CyberPower CP1000PFCLCD", { va: 1000, watts: 600, wave: "PFC sine wave", battery: 5, surge: 5, warranty: "3 years, including the battery" }, ["a colour LCD panel", "a $350,000 connected equipment guarantee", "support for active PFC and conventional power supplies"]),
  F("B0779KYKLB", "APC BR1000MS (1000VA/600W)", "APC BR1000MS", { va: 1000, watts: 600, wave: "Pure sine wave", battery: 6, surge: 4, runtime: "up to 42 minutes at 100W" }, ["an LCD angled for reading runtime and load", "six battery outlets", "a pure sine wave output"]),
]);

export const surge37Facts = withPool(pool as Pool, [
  F("B0D1XH8NJP", "Amazon Basics 12-Outlet Surge Protector (4000 Joules)", "Amazon Basics 12-outlet", { joules: 4000, outlets: 12, cord: 8 }, ["a 15 amp circuit breaker", "safety shutters on the outlets", "a power switch and a keyhole for wall mounting"]),
  F("B08BJWRZGY", "TROND 13-Outlet Surge Protector (4000J)", "TROND 13-outlet", { joules: 4000, outlets: 13, cord: 5, usb: "4 USB ports (17W total)", extras: "ETL listed" }, ["38mm outlet spacing for large adapters", "a 14AWG copper cord with a flat plug", "UL94 V-0 flame-retardant housing"]),
  F("B08PJTHZJL", "VINTAR 12-Outlet Surge Protector (2 x 4800J)", "VINTAR 12-outlet", { outlets: 12, cord: 6, extras: "ETL certified" }, ["two 4800 joule surge protectors", "four widely spaced outlets", "a 14AWG copper heavy-duty flat-plug cord"]),
  F("B0CZJQDGKX", "4800J Surge Protector with 18 Outlets and 10ft Cord", "18-outlet 4800J strip", { joules: 4800, outlets: 18, cord: 10, usb: "2 USB-A and 2 USB-C (PD 20W)" }, ["grounded and protected indicator lights", "side, top and back mounting", "a flat plug on a 10ft cord"]),
  F("B0BQNB74CF", "Belkin 12-Outlet Surge Protector (3480J)", "Belkin 12-outlet 3480J", { joules: 3480, outlets: 12, cord: 6, usb: "USB-A and USB-C", extras: "UL certified" }, ["a flat plug that sits flush to the wall", "charging for up to 15 devices at once", "a mounting option"]),
  F("B0DB7V938J", "SUPERDANNY 13-Outlet Surge Protector (5000J)", "SUPERDANNY 13-outlet", { joules: 5000, outlets: 13, cord: 6.5, usb: "2 USB-C and 2 USB-A (PD 20W)" }, ["a 45-degree flat plug", "15A and 1875W capacity", "a fire-retardant casing with 8-fold protection"]),
  F("B00AAHT8GK", "Tripp Lite TLP1208SAT Surge Protector (2880J)", "Tripp Lite TLP1208SAT", { joules: 2880, outlets: 12, cord: 8, extras: "UL listed, with Ethernet, phone and coax protection" }, ["four outlets spaced for bulky plugs", "a lifetime limited warranty", "a $250,000 connected equipment insurance"]),
  F("B0C6S6TPRH", "Belkin 12-Outlet Surge Protector with 8ft Flat Plug", "Belkin 12-outlet 8ft", { outlets: 12, cord: 8, extras: "UL certified, 2-year warranty" }, ["a safety indicator light", "widely spaced outlets for large chargers", "housing made with at least 72 percent recycled material"]),
]);
