import hubs from "@/data/pcj-pool/acc37-hubs.json";
import argb from "@/data/pcj-pool/acc37-argb.json";
import { withPool } from "./helpers";
import { mkSchema, F } from "./acc37-helpers";

type Pool = Record<string, { img?: string; price?: string }>;
const P = { ...(hubs as Pool), ...(argb as Pool) };

/** Fan hubs and ARGB controllers. Figures come from each listing's title and bullets; unstated fields stay undefined. */
export const hubSchema = mkSchema("fan-hub", "Fan Hubs", [
  { key: "ports", label: "Fan ports", noun: "port count", better: "higher", superlative: ["most", "fewest"], fmt: (v) => `${v} ports`, rule: { label: "Most Fan Ports", bestFor: ["Cases with more fans than motherboard headers.", "Builds that group every case fan on one speed curve."] }, strength: (v) => `${v} fan ports` },
  { key: "power", label: "Power input", fmt: (v) => String(v), strength: (v) => (/sata/i.test(String(v)) ? "Takes fan power from a SATA connector instead of the motherboard header" : undefined), weakness: (v) => (/header only/i.test(String(v)) ? "Draws all fan power through one motherboard header" : undefined) },
  { key: "limit", label: "Stated current limit", fmt: (v) => String(v) },
  { key: "fans", label: "Fan types", fmt: (v) => String(v) },
  { key: "mount", label: "Mounting", fmt: (v) => String(v) },
], (f) => {
  const s = ["Plug the hub's input lead into a motherboard fan header (CPU_FAN or a chassis header) so the board can set speed, and keep the total fan current within the header or SATA rating."];
  if (/sata/i.test(String(f.specs.power ?? ""))) s.push("It needs a free SATA power lead from the power supply as well as the header connection.");
  return s;
}, [
  ["Check your fan count against headers", "Most boards have only a few chassis headers. A hub lets one header control many fans, all at the same speed."],
  ["Mind the current limit", "Every fan draws current from the header or the SATA lead. Add up the fan ratings on their labels and stay inside the hub's stated limit."],
  ["SATA power or header power", "A SATA-powered hub keeps load off the motherboard header. A passive splitter pulls everything through one header."],
  ["Speed follows the first port", "On most hubs the motherboard reads the speed signal of one port only, so a mixed set of fans all follow the same PWM signal."],
  ["Mounting and cable length", "Magnets, adhesive and screw holes decide where the hub can live. Short input cables limit placement."],
], [
  ["Can one header run several fans?", "Yes, within its current rating. A hub or splitter does it, but all the fans share one speed signal."],
  ["Do I need a hub with SATA power?", "It is the safer choice for many or high-current fans, because it keeps the header's load low."],
  ["Can I mix 3-pin and 4-pin fans?", "Many hubs accept both, but 3-pin fans cannot be speed-controlled by PWM and may run at full speed."],
  ["Will a hub change fan speed by itself?", "A plain hub does not. It passes along the motherboard's signal, unless it includes a knob or controller."],
  ["Where should I mount a hub?", "Anywhere inside the case that gets short, tidy cable runs to the fans, away from moving blades."],
], [
  ["Port count", "We recorded the number of fan ports each listing states."],
  ["Power and current limits", "We noted SATA input and any stated current limit."],
  ["Fan compatibility", "We checked whether the listing names 3-pin or 4-pin support."],
  ["Mounting", "We noted magnets, adhesive and other mounting."],
]);

export const argbSchema = mkSchema("argb-controller", "ARGB Controllers", [
  { key: "ports", label: "ARGB ports", noun: "port count", better: "higher", superlative: ["most", "fewest"], fmt: (v) => `${v} ports`, rule: { label: "Most ARGB Ports", bestFor: ["Builds with several ARGB fans and strips.", "Boards with only one ARGB header."] }, strength: (v) => `${v} ARGB ports` },
  { key: "control", label: "How you control it", fmt: (v) => String(v), strength: (v) => (/signalrgb|openrgb|remote|button/i.test(String(v)) ? `Control through ${String(v).toLowerCase()}` : undefined) },
  { key: "power", label: "Power input", fmt: (v) => String(v) },
  { key: "pwm", label: "Fan speed ports", fmt: (v) => String(v), strength: (v) => (/pwm/i.test(String(v)) ? "Also expands PWM fan connections" : undefined) },
  { key: "mount", label: "Mounting", fmt: (v) => String(v) },
], () => ["Use it only with 5V 3-pin addressable (ARGB) devices; the 12V 4-pin RGB standard uses a different connector and can damage ARGB parts if mixed up. Line up the arrow or pin 1 marking on each plug."], [
  ["Know your connector", "ARGB is 5V 3-pin with a keyed plug. 12V 4-pin RGB is a different standard and must not be mixed with it."],
  ["Motherboard sync versus a standalone controller", "A hub passes the motherboard's lighting signal to more devices. A standalone controller with a remote or button works without the motherboard software."],
  ["Count the ports you need", "Fans, strips and coolers each take a port. Daisy-chained fans may need fewer ports than you think."],
  ["Power through SATA", "Many LEDs draw more current than one header supports. A hub with SATA power avoids overloading the motherboard."],
  ["Software control", "Some controllers work with SignalRGB or OpenRGB over a USB header, which allows per-device effects but needs the software installed."],
], [
  ["What does an ARGB controller do?", "It splits or replaces the motherboard's ARGB header so you can run more addressable devices, with or without the motherboard software."],
  ["Can I plug ARGB into a 12V RGB header?", "No. The connectors and voltages differ, and the wrong plug can damage the LEDs."],
  ["Do I need a controller if my board has ARGB headers?", "Only if you run out of headers, or you want lighting effects without the motherboard software."],
  ["Does a hub also control fan speed?", "Only combined hubs do. Check whether the listing includes PWM fan ports."],
  ["Can I use two hubs?", "Yes, as long as each ARGB channel stays within its LED limit and every hub gets power."],
], [
  ["Port count", "We recorded the ARGB ports each listing states."],
  ["Control method", "We noted remote, button, software or motherboard-only control."],
  ["Power", "We checked for SATA or USB power inputs."],
  ["Extras", "We checked for PWM ports and magnetic mounting."],
]);

export const hub37Facts = withPool(P, [
  F("B0887VG14J", "ARCTIC Case Fan Hub (10 Port, SATA Powered)", "ARCTIC Case Fan Hub", { ports: 10, power: "SATA plus a 4-pin header", limit: "1A per port, 4.5A input", fans: "4-pin PWM" }, ["synchronous PWM control passed to every fan", "the first slot's RPM read back to the motherboard", "fans powered directly from the power supply"]),
  F("B0BZQ3NXMD", "Noctua NA-FH1 (8 Port)", "Noctua NA-FH1", { ports: 8, power: "SATA plus a 4-pin header", limit: "54W via SATA, 24W via the 4-pin header", fans: "4-pin PWM, 5V and 12V fans", mount: "Magnetic" }, ["short circuit protection", "four strong magnets for steel case panels", "a six-year warranty"]),
  F("B086X6WB4F", "EZDIY-FAB 10-Port PWM Fan Hub", "EZDIY-FAB hub", { ports: 10, power: "SATA plus a 4-pin header", limit: "3A combined", fans: "4-pin PWM and 3-pin DC", mount: "Double-sided tape and a screw hole" }, ["a dedicated FAN1 port for CPU speed detection", "synchronized PWM control on the other nine ports", "3-pin fans run at full speed without PWM control"]),
  F("B0CP9X42LM", "Cable Matters PC Case PWM Fan Hub (1-to-5)", "Cable Matters 1-to-5 hub", { ports: 5, power: "Motherboard header only", fans: "4-pin PWM", mount: "Double-sided tape" }, ["a 16 inch black nylon cable", "every fan runs at the speed set by the first", "no power cable beyond the header"]),
  F("B0D9434MLM", "UMLIFE 4-Pin PWM Fan Hub 1-to-5 (2 Pack)", "UMLIFE 5-way hub", { ports: 5, power: "Motherboard header only", fans: "4-pin PWM and 3-pin", mount: undefined }, ["two hubs in the box", "a 13 inch tin-plated copper cable", "support for 4-pin and 3-pin fans"]),
  F("B0FBRNFLDM", "4-Pin 12V PWM Fan Controller Hub (6 Fans)", "6-fan PWM controller hub", { ports: 6, power: "SATA or a 5.5 x 2.5mm DC input", limit: "2A per port, 5A and 60W combined", fans: "4-pin PWM only" }, ["an adjustable PWM duty cycle from 1 to 99 percent", "a speed knob on the board", "fans not included"]),
]);

export const argb37Facts = withPool(P, [
  F("B09SZBJ5JZ", "Thermalright ARGB Fan Hub Controller (8 Port)", "Thermalright ARGB Hub", { ports: 8, control: "Motherboard sync only", power: "SATA", pwm: "8-port 4-pin PWM expansion", mount: "Adhesive and magnetic" }, ["support for ARGB fans and light bars", "SATA power direct to the hub", "fan speed reading from one marked port"]),
  F("B0CWRJ578K", "ShakingTank 9-Port ARGB PWM Fan Hub", "ShakingTank 9-port hub", { ports: 9, control: "Motherboard sync only", power: "SATA", pwm: "PWM ports on every fan", mount: "Magnetic" }, ["a compact 4.64 x 2.2 inch body", "support for 5V 3-pin ARGB fans and LED strips", "individual PWM speed control on each port"]),
  F("B0C35X4C83", "ARGB PC Fans Controller 4-Port Hub", "4-port ARGB hub", { ports: 4, control: "Push button or motherboard sync", power: "SATA", mount: "Magnetic" }, ["a push button that connects to the case's reset or LED button header", "an option to sync with the motherboard", "independent ARGB control"]),
  F("B0C7BG9RX4", "Thermalright ARGB Hub Controller Rev.A", "Thermalright Rev.A", { ports: 10, control: "Motherboard sync only", power: "SATA", mount: "Adhesive" }, ["a 90 x 46 x 16mm body", "support for ARGB fans and light bars", "five lighting ports on each side"]),
  F("B0FQBZBDCS", "Iesooy Nollie 8 ARGB Controller", "Nollie 8", { ports: 8, control: "SignalRGB and OpenRGB over USB", power: "Dual SATA", mount: "Adhesive" }, ["126 LED beads per channel", "two SATA cables and a USB 9-pin cable in the box", "SignalRGB certification and OpenRGB compatibility"]),
  F("B0GTYZCSHZ", "airgoo 8-Port Magnetic USB ARGB Controller", "airgoo 8-port controller", { ports: 8, control: "SignalRGB and OpenRGB over USB", power: "SATA", mount: "Magnetic" }, ["an auto-resetting safety fuse", "USB 2.0 control with low latency", "support for fan, strip and cooler LEDs"]),
  F("B0DWMR6RXT", "upHere PWM and ARGB Magnetic Fan Hub (9 Port)", "upHere 9-port hub", { ports: 9, control: "Remote", power: "SATA", pwm: "9 PWM fan ports", mount: "Magnetic" }, ["a front RGB panel that syncs with the fans", "a remote, SATA cable and sync cable in the kit", "PWM and ARGB control in one hub"]),
  F("B0CYWX2F35", "Vetroo ARGB and PWM Case Fan Hub with Remote", "Vetroo hub with remote", { ports: 10, control: "Remote", power: "SATA", pwm: "10 PWM fan ports", mount: "Magnetic" }, ["support for up to ten 5V 3-pin ARGB fans", "automatic PWM speed adjustment", "5V 3-pin addressable headers only"]),
  F("B0C3RJZC83", "ARGB Controller Kit with 14-Key Remote", "14-key ARGB controller", { control: "14-key remote, 215 dynamic modes", power: "SATA", mount: undefined }, ["215 dynamic light modes and four static colours", "SATA power input", "tool-free plug and play"]),
]);
