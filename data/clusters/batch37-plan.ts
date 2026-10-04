import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/** Batch 37: PC build accessories (GPU pads and paste, fans, hubs, risers, Wi-Fi cards, power protection, desk) and streaming audio and video. */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const E = (slug: string, kw: string, g: PlanItem["g"], where: PlanItem["where"], sort: string, seo: string, lead: string, close: string): PlanItem => ({ slug, kw, g, where, sort, seo, lead, close });
const gpuPaste = (f: Fact) => /gpu|graphics|direct-die/i.test(`${f.name} ${f.notes.join(" ")}`) && !/liquid metal/i.test(s(f, "kind"));

export const PLAN: PlanItem[] = [
  E("best-thermal-paste-for-gpu", "thermal paste for GPU", "paste", gpuPaste, "-grams", "Best Thermal Paste for GPU",
    "A graphics card repaste needs a paste whose listing names GPU use and that does not conduct electricity if a little spreads onto the board. Every pick here names GPU or graphics-card use in its listing.",
    "Clean the old paste off the core with isopropyl alcohol and keep paste off the memory chips and the pad areas around the die."),
  E("best-thermal-pads-for-gpu", "thermal pads for GPU", "tpad", (f) => f.specs.thick !== undefined, "-wmk", "Best Thermal Pads for GPU",
    "Memory and VRM chips on a graphics card sit at different heights, so the pad's thickness matters as much as its conductivity rating. Every pick here lists its thickness and is sold as electrically non-conductive.",
    "Measure the old pads or look up a teardown of your exact card before buying, because the wrong thickness can leave memory uncooled."),
  E("best-reverse-blade-fans", "reverse blade fans", "revfan", () => true, "-pack", "Best Reverse Blade Fans",
    "Reverse-blade fans move air toward the back of the fan, so the lit side can face the glass panel while the fan still works as an intake. Every pick here is sold as a reverse-blade or reverse-airflow 120mm fan.",
    "Count how many reverse fans your intake positions need; side and bottom intakes are where the reverse design pays off."),
  E("best-pwm-fan-hubs", "PWM fan hubs", "fanhub", () => true, "-ports", "Best PWM Fan Hubs",
    "A fan hub lets one motherboard header run several fans, which matters when a case has more fans than headers. Every pick here lists how many fans it connects and what power it takes.",
    "Add up the current each fan draws from its label and keep the total inside the hub's stated limit."),
  E("best-argb-controllers", "ARGB controllers", "argbctl", (f) => !!s(f, "control"), "-ports", "Best ARGB Controllers",
    "An ARGB controller adds lighting ports or lighting control beyond what the motherboard offers. Every pick here connects 5V 3-pin addressable devices and says how you control it.",
    "Match the 5V 3-pin plugs by their arrow marking; never connect an ARGB hub to a 12V 4-pin RGB header."),
  E("best-pcie-riser-cables", "PCIe riser cables", "riser37", (f) => n(f, "gen") > 0, "-gen", "Best PCIe Riser Cables",
    "A riser cable moves the graphics card to a vertical mount, and the PCIe generation it supports decides whether a new card runs at full speed. Every pick here states its PCIe generation.",
    "Measure the path from the motherboard slot to the card's connector with a string before choosing a length."),
  E("best-pcie-wifi-cards", "PCIe Wi-Fi cards", "wifi", (f) => !!s(f, "std"), "-rate", "Best PCIe Wi-Fi Cards",
    "A PCIe Wi-Fi card swaps a desktop's missing or weak wireless for a card with external antennas, and the Wi-Fi standard has to match your router to matter. Every pick here states its Wi-Fi standard.",
    "Check the board for a free PCIe x1 slot and a USB 9-pin header before you order, because Bluetooth uses that header."),
  E("best-ups-for-gaming-pc", "UPS for a gaming PC", "ups", (f) => n(f, "watts") >= 600 && /sine/i.test(s(f, "wave")), "-watts", "Best UPS for a Gaming PC",
    "A gaming PC needs a UPS rated in watts well above its load, with sine wave output that suits active PFC power supplies. Every pick here states both its watt rating and a sine wave output.",
    "Add the PC's peak draw to the monitor and router, then stay under the unit's watt rating."),
  E("best-surge-protectors-for-pc", "surge protectors for a PC", "surge", (f) => n(f, "joules") >= 2500, "-joules", "Best Surge Protectors for PC",
    "A desk full of a PC, monitors and chargers needs outlets with room for bulky adapters and a stated surge rating. Every pick here lists its joule rating and outlet count.",
    "Plug nothing heavier than the strip's 15A limit into it and do not chain one strip into another."),
  E("best-monitor-light-bars", "monitor light bars", "lightbar", () => true, "-cri", "Best Monitor Light Bars",
    "A monitor light bar aims light at the desk rather than the screen, so the clamp has to fit your monitor and the beam has to be asymmetric. Every pick here sits on the monitor and takes USB power.",
    "Check your monitor's thickness and curvature against the clamp range before buying."),
  E("best-standing-desk-mats", "standing desk mats", "smat", () => true, "-thick", "Best Standing Desk Mats",
    "A standing desk mat adds cushioning under your feet, and thickness and grip decide whether it feels stable. Every pick here is sold for use at a standing desk.",
    "Size it so both feet sit on it, and keep it away from rolling chair casters."),
  E("best-microphones-for-podcasting", "microphones for podcasting", "mic", (f) => /dynamic/i.test(s(f, "capsule")) || /boom|arm/i.test(s(f, "mount")), "price", "Best Microphones for Podcasting",
    "Podcast microphones need to reject room noise and sit close to your mouth, which suits dynamic capsules and boom-arm kits. Every pick here is a dynamic microphone or ships with a boom arm.",
    "Speak a hand's width from the capsule and use a pop filter to keep plosives under control."),
  E("best-xlr-microphones-under-100", "XLR microphones under $100", "mic", (f) => /xlr/i.test(s(f, "conn")) && p(f) <= 100, "-price", "Best XLR Microphones Under $100",
    "An XLR microphone needs an audio interface or mixer, so the microphone is only part of the cost at this price. Every pick here has an XLR output and cost $100 or less when we checked.",
    "Budget for an interface and an XLR cable on top of the microphone."),
  E("best-usb-microphones-under-50", "USB microphones under $50", "mic", (f) => /^usb/i.test(s(f, "conn")) && !/xlr/i.test(s(f, "conn")) && p(f) <= 50, "-price", "Best USB Microphones Under $50",
    "A USB microphone plugs straight into a PC and works without an interface, which suits a first streaming or call setup. Every pick here connects over USB and cost $50 or less when we checked.",
    "Check whether the microphone has a headphone jack if you want to hear yourself without delay."),
  E("best-webcams-for-twitch-streaming", "webcams for Twitch streaming", "webcam", (f) => n(f, "fps") >= 60, "-fps", "Best Webcams for Twitch Streaming",
    "A Twitch webcam is judged on smooth motion at your stream resolution, not on a headline 4K figure. Every pick here lists a frame rate of 60fps or higher.",
    "Set the webcam's resolution and frame rate in OBS rather than leaving the default, and light your face from the front."),
  E("best-webcams-for-zoom", "webcams for Zoom", "webcam", (f) => /1080|2k|4k/i.test(s(f, "res")) && !/none/i.test(s(f, "privacy")), "price", "Best Webcams for Zoom",
    "For Zoom the useful features are a stable 1080p picture and a way to cover the lens between calls. Every pick here lists 1080p or better and a privacy option.",
    "Zoom compresses video, so face a window or lamp instead of spending more on resolution."),
];
