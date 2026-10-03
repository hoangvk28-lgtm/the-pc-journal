import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 32: "best <product> under $N" tiers for accessory groups. Each tier filters to a price band (the previous tier's
 * ceiling up to this tier's ceiling, widened where a band holds too few products) and uses a different sort.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const band = (lo: number, hi: number) => (f: Fact) => p(f) > lo && p(f) <= hi;
const E = (slug: string, kw: string, g: PlanItem["g"], where: PlanItem["where"], sort: string, seo: string, lead: string, close: string): PlanItem => ({ slug, kw, g, where, sort, seo, lead, close });

const comboOnly = (f: Fact) => !/touchpad/i.test(s(f, "pointer")) && !/touch keyboard|with touchpad/i.test(f.name);
const wirelessKb = (f: Fact) => /bluetooth|wireless|receiver|bolt|2\.4/i.test(s(f, "connection")) && !/^wired/i.test(s(f, "connection"));
const captureCard = (f: Fact) => /capture card/i.test(s(f, "type"));

type T = [n: number, lo: number, sort: string, first: string, close: string];
const tiers = (slugNoun: string, kw: string, noun: string, g: PlanItem["g"], extra: (f: Fact) => boolean, rows: T[], shared: string): PlanItem[] =>
  rows.map(([n, lo, sort, first, close]) =>
    E(`best-${slugNoun}-under-${n}`, `${kw} under $${n}`, g, (f) => extra(f) && band(lo, n)(f), sort, `Best ${noun} Under $${n}`,
      `${first} ${(lo === 0 ? shared.replace("cost $LO to $N", "cost $N or less") : shared.replace("$LO", String(lo))).replace("$N", String(n))}`, close));

export const PLAN: PlanItem[] = [
  ...tiers("monitor-arms", "monitor arms", "Monitor Arms", "arm", () => true, [
    [30, 0, "price", "Under $30 a monitor arm is usually a single fixed or gas-spring arm for one screen, so the question is whether it holds your monitor's weight.", "Weigh your monitor with the stand removed before you compare the arm's load rating."],
    [40, 30, "-load", "Between $30 and $40 you start to see gas-spring arms with more reach and a higher load rating.", "Check that the VESA pattern on the back of your monitor matches the arm's mounting plate."],
    [50, 40, "price", "Around $50 a monitor arm adds smoother height and tilt adjustment, and some dual-screen designs appear.", "Measure the desk thickness before choosing between a clamp and a grommet mount."],
    [60, 50, "-load", "From $50 to $60 arms tend to add cable management and sturdier steel or aluminium arms.", "Leave room behind the desk, since most arms need a few centimetres of clearance to swing."],
    [80, 60, "-price", "In the $60 to $80 range you can find wider screen support and dual-monitor arms from known makers.", "A dual arm doubles the load on the clamp point, so check the desk can carry it."],
    [100, 60, "price", "Close to $100 the choice is between dual arms and heavy-duty single arms for large or ultrawide monitors.", "Match the arm's stated screen size and weight limit to your largest monitor, not just the one you own today."],
  ], "Every pick cost $LO to $N when we checked and lists the screen sizes and weight it supports."),
  ...tiers("keyboard-and-mouse-combos", "keyboard and mouse combos", "Keyboard and Mouse Combos", "combo", comboOnly, [
    [25, 0, "price", "Under $25 a keyboard and mouse combo is a basic office set, usually membrane keys and a small optical mouse.", "A single receiver for both devices saves a USB port; check how many the set uses."],
    [30, 25, "-price", "Between $25 and $30 sets add a quieter typing feel or a rechargeable battery.", "Rechargeable sets remove battery swaps; AA sets can last longer between changes."],
    [40, 30, "price", "From $30 to $40 you can find full-size sets with a numpad, a palm rest or multimedia keys.", "Decide whether you want a numpad, since compact sets save desk space."],
    [50, 40, "-price", "Between $40 and $50 combos reach the trusted-brand level, with better key feel and longer battery claims.", "Check the range and receiver type if your computer sits under the desk."],
  ], "Every set cost $LO to $N when we checked and includes both a keyboard and a mouse."),
  ...tiers("wireless-keyboards", "wireless keyboards", "Wireless Keyboards", "wkb", wirelessKb, [
    [30, 0, "price", "Under $30 a wireless keyboard is a basic receiver or Bluetooth model for one computer.", "Check whether the battery is replaceable or rechargeable before you buy."],
    [40, 30, "-price", "From $30 to $40 you can find slim Bluetooth boards and some multi-device models.", "If you switch between a PC and a tablet, look for a board that stores several pairings."],
    [50, 35, "price", "Around $50 a wireless keyboard can add multi-device pairing and a sturdier build.", "Try the layout against your habits; compact boards drop the numpad."],
    [60, 40, "-price", "From $40 to $60 wireless keyboards add backlighting or low-profile keys.", "Backlighting shortens battery life, so check the stated hours with the light on."],
    [100, 40, "price", "Up to $100 you reach premium low-profile and mechanical wireless keyboards.", "At this price the key switch and typing feel matter more than the pairing options."],
  ], "Every pick cost $LO to $N when we checked and connects without a cable."),
  ...tiers("case-fans", "case fans", "Case Fans", "fan", () => true, [
    [15, 0, "price", "Under $15 case fans are usually single fans or small multi-packs for plain airflow.", "Match the fan size (120mm or 140mm) to the mounts in your case before ordering."],
    [20, 15, "-cfm", "From $15 to $20 you find multi-packs with better bearings and stated airflow figures.", "Compare airflow in CFM and noise in dBA together; a high CFM fan can be loud."],
    [25, 20, "price", "Around $25 case fans add PWM speed control and addressable lighting on three-packs.", "PWM fans need a four-pin header; check your motherboard or fan hub has enough."],
    [30, 25, "-cfm", "From $25 to $30 the packs lean toward higher airflow and daisy-chained RGB.", "Daisy-chained fans need one ARGB header, so check the connector type."],
    [40, 30, "price", "Up to $40 you reach premium bearings, static-pressure fans for radiators and larger packs.", "Static pressure matters on radiators and dust filters; airflow figures matter for open mesh fronts."],
  ], "Every pick cost $LO to $N when we checked and lists its size and speed."),
  ...tiers("aio-coolers", "AIO coolers", "AIO Coolers", "aio", () => true, [
    [60, 0, "price", "Under $60 an all-in-one liquid cooler is a basic 120mm or 240mm unit aimed at mid-range processors.", "Measure the radiator mounting space in your case first; many compact cases take 240mm at most."],
    [80, 60, "-price", "From $60 to $80 you find 240mm and 280mm radiators with better pumps and quieter fans.", "Check that the cooler lists your CPU socket and that the pump header is available on your board."],
    [100, 80, "price", "Between $80 and $100 you reach 360mm radiators and coolers with a pump-top display.", "A thicker radiator needs room for the fans; check tube length against where the radiator mounts."],
    [120, 80, "-price", "Close to $120 the picks include larger radiators with extra fans and software control.", "Confirm the pump and fan connectors your board has before choosing a unit that needs several."],
  ], "Every pick cost $LO to $N when we checked and is a sealed liquid cooler with a stated radiator size."),
  ...tiers("pc-cases", "PC cases", "PC Cases", "pcCase", () => true, [
    [70, 0, "price", "Under $70 a PC case is usually a simple mid tower with a steel body and one or two included fans.", "Check the GPU and cooler clearance in the specifications, not just the case size name."],
    [80, 70, "-price", "From $70 to $80 you find tempered-glass mid towers with better front airflow.", "Look at the included fan count; extra fans cost more than they appear."],
    [100, 80, "price", "Between $80 and $100 cases add mesh fronts, more fan mounts and radiator support.", "Confirm radiator support if you plan to fit an AIO cooler later."],
    [120, 100, "-price", "Up to $120 cases add better build quality, USB-C front ports and generous cable routing.", "Check the PSU length limit and the motherboard sizes the case supports."],
  ], "Every pick cost $LO to $N when we checked and lists its motherboard support."),
  ...tiers("webcams", "webcams", "Webcams", "webcam", () => true, [
    [40, 0, "price", "Under $40 a webcam is typically 1080p or 720p with a fixed lens, enough for calls.", "Light your face from the front; a cheap webcam improves more from lighting than from a higher price."],
    [50, 30, "-price", "From $30 to $50 you find 1080p webcams with a better microphone or a privacy cover.", "Check whether the camera has a privacy shutter and what it records at 30 fps."],
    [60, 50, "price", "Around $60 webcams add autofocus and a wider field of view.", "A wider lens fits more of the room, which may not suit a busy background."],
    [75, 60, "-price", "From $60 to $75 you reach better sensors and 60 fps options for streaming.", "Check the frame rate at 1080p, since many cameras drop to 30 fps in low light."],
    [120, 75, "price", "Between $75 and $120 webcams offer 2K or 4K resolution and larger sensors.", "A higher resolution needs a USB 3.0 port and more bandwidth to run at full speed."],
    [150, 120, "-price", "Close to $150 the picks are streaming-focused cameras with strong low-light handling and software controls.", "Plan for the camera's software, since many of the best settings sit inside it."],
  ], "Every pick cost $LO to $N when we checked and lists its video resolution."),
  ...tiers("capture-cards", "capture cards", "Capture Cards", "stream", captureCard, [
    [30, 0, "price", "Under $30 a capture card is a basic USB HDMI dongle that records a console or second PC.", "Check the maximum resolution at 60 fps, since many cheap cards pass through but record at lower settings."],
    [40, 30, "-price", "A budget capture card at this price still depends on USB 3.0 for 1080p60.", "Use a USB 3.0 port directly on the computer, not a hub."],
    [60, 30, "price", "Up to $60 a capture card can add passthrough and low-latency preview.", "Look for HDMI passthrough if you want to play on a monitor without delay."],
    [75, 30, "-price", "Around $75 the choice is between a cheap card and the entry level of branded capture devices.", "A brand's software often decides how easily you record, so check its support for your streaming app."],
    [100, 30, "price", "Under $100 you find external capture cards from known makers with passthrough.", "Match the card's input resolution to your console's maximum output."],
    [150, 60, "-price", "From $60 to $150 capture cards add 4K passthrough and internal PCIe options.", "An internal card needs a free PCIe slot; an external one only needs a USB 3.0 port."],
    [200, 100, "price", "Up to $200 you reach 4K60 and HDMI 2.1 capture cards for high-end consoles and PCs.", "Check that your console, cable and PC all support the same HDMI version."],
  ], "Every card cost $LO to $N when we checked and is a dedicated capture card."),
  ...tiers("microphones", "microphones", "Microphones", "mic", () => true, [
    [40, 0, "price", "Under $40 a USB microphone is a simple plug-in condenser for calls and basic streams.", "Place the mic close to your mouth; position matters more than a few dollars of price."],
    [60, 40, "-price", "From $40 to $60 you find condenser mics with a mute button or a headphone output.", "Check whether the mic has a monitoring jack so you can hear yourself without lag."],
    [75, 40, "price", "Around $75 a microphone can offer several pickup patterns and better capsules.", "A cardioid pattern rejects keyboard noise better than an omnidirectional one."],
    [100, 75, "-price", "From $75 to $100 mics from established makers add solid stands and built-in controls.", "Use a pop filter and a boom arm if you plan to speak close to the capsule."],
    [120, 75, "price", "Close to $120 you reach studio-grade USB mics and the cheapest XLR options.", "An XLR mic also needs an audio interface, so add that to the budget."],
  ], "Every pick cost $LO to $N when we checked and lists its connection type."),
];
