import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 18 keyword plan (guru sitemap 67). Same rules as batch17-plan.ts: each entry gets its own filter or sort,
 * a lead that says what every pick has in common, and one practical closing tip.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const t = (f: Fact) => `${f.name} ${f.short} ${f.notes.join(" ")} ${Object.values(f.specs).join(" ")}`;
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const re = (r: RegExp) => (f: Fact) => r.test(t(f));
const wired = (f: Fact) => /^wired/i.test(s(f, "connection")) && !/2\.4|bluetooth|wireless/i.test(s(f, "connection"));
const wireless = (f: Fact) => /2\.4|bluetooth|lightspeed|hyperspeed|slipstream|wireless|receiver/i.test(s(f, "connection"));
const tower = (f: Fact) => !/mini|integrated|laptop-class/i.test(t(f));
const ssdKind = (f: Fact) => s(f, "kind") === "SSD";

export const PLAN: PlanItem[] = [
  // ---------------- Price-capped peripherals ----------------
  { slug: "best-gaming-microphone-under-150", kw: "gaming microphone under 150", g: "mic", where: (f) => p(f) <= 150, sort: "-price", seo: "Best Gaming Microphones Under $150",
    lead: "Under $150 you can choose between a USB microphone that plugs straight into the PC and an XLR microphone that needs an interface. Every pick here was $150 or less at the time of writing.", close: "A cardioid pattern and a close mic position do more for voice chat than a pricier capsule." },
  { slug: "best-cheap-gaming-microphones-under-50", kw: "cheap gaming microphones under 50", g: "mic", where: (f) => p(f) <= 50, sort: "price", seo: "Best Gaming Microphones Under $50",
    lead: "Under $50, a USB microphone with a cardioid pattern is a clear upgrade over a headset mic. Every pick was $50 or less at the time of writing.", close: "Add a pop filter or foam cover; it costs little and cuts plosives." },
  { slug: "best-streaming-webcam-under-100", kw: "streaming webcam under 100", g: "webcam", where: (f) => p(f) <= 100, sort: "-fps", seo: "Best Streaming Webcams Under $100",
    lead: "Under $100, a streaming webcam can still reach 1080p at 60fps with autofocus. Every pick was $100 or less, ordered by frame rate.", close: "Light your face from the front; it improves a budget webcam more than any setting." },
  { slug: "best-mechanical-keyboard-under-150", kw: "mechanical keyboard under 150", g: "gkb", where: (f) => p(f) <= 150 && !!s(f, "switch"), sort: "-price", seo: "Best Mechanical Keyboards Under $150",
    lead: "Between $100 and $150, mechanical keyboards add wireless, hot-swap sockets, gasket mounts or magnetic switches. Every pick has its switches and was $150 or less at the time of writing.", close: "Hot-swap sockets let you change the feel later without buying a new board." },
  { slug: "best-gaming-keyboard-under-100", kw: "gaming keyboard under 100", g: "gkb", where: (f) => p(f) <= 100, sort: "-polling", seo: "Best Gaming Keyboards Under $100",
    lead: "Under $100, gaming keyboards now include magnetic switches with rapid trigger as well as budget mechanical boards. Every pick was $100 or less, ordered by polling rate.", close: "Choose the layout first; a compact board leaves more room for the mouse." },
  { slug: "best-gaming-chair-under-300", kw: "gaming chair under 300", g: "chair", where: (f) => p(f) <= 300 && p(f) >= 150, sort: "-price", seo: "Best Gaming Chairs Under $300",
    lead: "Between $150 and $300, gaming chairs gain better armrests, built-in or adjustable lumbar support and higher weight ratings. Every pick sits in that range at the time of writing.", close: "Check the listed seat height against your desk before buying." },
  { slug: "best-wireless-gaming-mice-under-50", kw: "wireless gaming mice under 50", g: "gmouse", where: (f) => wireless(f) && p(f) <= 50, sort: "weight", seo: "Best Wireless Gaming Mice Under $50",
    lead: "Under $50, wireless gaming mice usually run on 2.4GHz dongles and some add Bluetooth. Every pick was $50 or less, ordered from the lightest listed weight.", close: "AA or AAA-powered mice avoid charging but weigh more with the cell fitted." },

  // ---------------- Microphones by type ----------------
  { slug: "best-broadcast-microphones", kw: "broadcast microphones", g: "mic", where: (f) => /dynamic/i.test(s(f, "capsule")), sort: "-price",
    lead: "Broadcast microphones are usually dynamic, which rejects room noise and suits speaking close to the mic. Every pick has a dynamic capsule, from the premium end down.", close: "Dynamic mics need gain; an XLR model may need an interface with plenty of it or an inline booster." },
  { slug: "best-dynamic-microphones-for-podcasting", kw: "dynamic microphones for podcasting", g: "mic", where: (f) => /dynamic/i.test(s(f, "capsule")), sort: "price", seo: "Best Dynamic Microphones for Podcasting",
    lead: "Dynamic microphones pick up less of the room, which helps when two hosts share a table. Every pick has a dynamic capsule, ordered from the lowest listed price.", close: "Keep the mic a hand's width from your mouth for a consistent level." },
  { slug: "best-xlr-microphones-for-streaming", kw: "xlr microphones for streaming", g: "mic", where: (f) => /xlr/i.test(s(f, "conn")), sort: "price", seo: "Best XLR Microphones for Streaming",
    lead: "An XLR microphone plugs into an audio interface or mixer, which adds gain control and room to upgrade later. Every pick has an XLR connection.", close: "Budget for an interface or a mixer; an XLR mic cannot plug straight into a PC." },
  { slug: "best-usb-condenser-microphones", kw: "usb condenser microphones", g: "mic", where: (f) => /usb/i.test(s(f, "conn")) && /condenser/i.test(s(f, "capsule")), sort: "-price", seo: "Best USB Condenser Microphones",
    lead: "USB condenser microphones capture detail and plug straight into a PC, but they also hear more of the room. Every pick is a USB condenser mic.", close: "Treat a bare room with soft furnishings; condensers pick up echo." },

  // ---------------- Mice ----------------
  { slug: "best-mice-with-side-buttons", kw: "mice with side buttons", g: "gmouse", where: (f) => n(f, "buttons") >= 6, sort: "-buttons",
    lead: "Side buttons put reload, push-to-talk or browser back within thumb reach. Every pick has six or more buttons, ordered by button count.", close: "Remap side buttons in the maker's software; most default to back and forward." },
  { slug: "best-ergonomic-gaming-mice", kw: "ergonomic gaming mice", g: "gmouse", where: (f) => /ergonomic|thumb/i.test(s(f, "shape")), sort: "-price",
    lead: "Ergonomic gaming mice are sculpted for one hand so the palm rests on the shell. Every pick has an ergonomic shape or a thumb rest, from the premium end down.", close: "Match the size to your hand; an ergonomic shape that is too small forces a claw grip." },
  { slug: "best-lightweight-gaming-mice", kw: "lightweight gaming mice", g: "gmouse", where: (f) => n(f, "weight") > 0 && n(f, "weight") <= 60, sort: "price",
    lead: "Lightweight gaming mice at 60g or less take less effort to flick and stop. Every pick has a weight of 60g or less, ordered from the lowest listed price.", close: "Honeycomb shells save weight but collect dust; solid shells are easier to clean." },

  // ---------------- Keyboards ----------------
  { slug: "best-low-profile-mechanical-keyboards", kw: "low profile mechanical keyboards", g: "gkb", where: re(/low.?profile/i), sort: "price",
    lead: "Low-profile mechanical keyboards shorten the switches and keycaps, so your wrists sit lower without a wrist rest. Every pick has low-profile switches or keys.", close: "Low-profile switches use their own keycaps; standard keycap sets will not fit." },
  { slug: "best-magnetic-switch-keyboards", kw: "magnetic switch keyboards", g: "gkb", where: (f) => /hall|magnetic|\bHE\b/i.test(s(f, "switch")), sort: "price",
    lead: "Magnetic (Hall effect) switches measure how far a key is pressed, so you can set the actuation point and use rapid trigger. Every pick has magnetic or Hall effect switches.", close: "Rapid trigger helps most in shooters where you strafe and stop quickly." },
  { slug: "best-hall-effect-keyboards", kw: "hall effect keyboards", g: "gkb", where: (f) => /hall|magnetic|\bHE\b/i.test(s(f, "switch")), sort: "-polling",
    lead: "Hall effect keyboards sense key position with magnets instead of metal contacts. Every pick has Hall effect or magnetic switches, ordered by polling rate.", close: "Set actuation per key in the software; deeper settings reduce accidental presses while typing." },

  // ---------------- Headsets ----------------
  { slug: "best-detachable-mic-headsets", kw: "detachable mic headsets", g: "headset", where: (f) => re(/detach|removable/i)(f) && !/none/i.test(s(f, "mic")) && !/in-ear/i.test(s(f, "design")), sort: "price",
    lead: "A detachable microphone lets a gaming headset double as everyday headphones. Every pick has a detachable or removable mic.", close: "Keep the mic port cover if one is supplied; it keeps dust out when the mic is off." },
  { slug: "best-wireless-gaming-headsets-2-4ghz", kw: "wireless gaming headsets 2.4ghz", g: "headset", where: (f) => /2\.4|lightspeed|hyperspeed/i.test(s(f, "connection")), sort: "-battery", seo: "Best 2.4GHz Wireless Gaming Headsets",
    lead: "A 2.4GHz dongle gives lower delay than Bluetooth, which matters in games. Every pick has a 2.4GHz connection, ordered by listed battery life.", close: "Plug the dongle into a front USB port or an extension to avoid dropouts." },

  // ---------------- Webcams, streaming ----------------
  { slug: "best-1080p-60fps-webcams", kw: "1080p 60fps webcams", g: "webcam", where: (f) => n(f, "fps") >= 60, sort: "price", seo: "Best 1080p 60fps Webcams",
    lead: "1080p at 60fps gives smooth motion on stream without the bandwidth of 4K. Every pick has 60fps or higher.", close: "60fps needs enough light; in a dim room many webcams drop to 30fps automatically." },
  { slug: "best-webcams-with-autofocus", kw: "webcams with autofocus", g: "webcam", where: (f) => /auto|pdaf|tracking/i.test(s(f, "focus")), sort: "-price",
    lead: "Autofocus keeps you sharp as you lean in or hold up an object; phase-detect (PDAF) is the fastest type. Every pick has autofocus, PDAF or AI tracking.", close: "Fixed-focus webcams can look sharper if you stay at one distance." },
  { slug: "best-4k-streaming-webcams", kw: "4k streaming webcams", g: "webcam", where: (f) => /4k/i.test(s(f, "res")), sort: "-fps", seo: "Best 4K Streaming Webcams",
    lead: "A 4K webcam gives room to crop and zoom while still sending a sharp 1080p stream. Every pick has 4K, ordered by frame rate.", close: "4K needs a USB 3 port; check before plugging into a hub." },
  { slug: "best-stream-deck-controllers", kw: "stream deck controllers", g: "stream", where: (f) => /controller/i.test(s(f, "type")), sort: "price",
    lead: "A stream controller puts scene changes, mutes and macros on physical keys. Every pick is a stream controller, ordered from the lowest listed price.", close: "Start with a small key count; plugins and folders stretch it further." },
  { slug: "best-4k-capture-cards", kw: "4k capture cards", g: "stream", where: (f) => /capture/i.test(s(f, "type")), sort: "-price", seo: "Best 4K Capture Cards",
    lead: "A 4K capture device brings a 4K HDMI source into your PC. Console capture cards add passthrough to a TV or monitor; camera dongles such as the Cam Link 4K do not, so check which type each pick is.", close: "Most streams go out at 1080p, so for consoles 4K passthrough matters more than 4K capture." },

  // ---------------- Streaming gear (new facts in stream18.ts) ----------------
  { slug: "best-budget-capture-cards-under-50", kw: "budget capture cards under 50", g: "stream", where: (f) => /capture/i.test(s(f, "type")) && p(f) <= 50, sort: "price", seo: "Best Capture Cards Under $50",
    lead: "Under $50, USB capture cards record 1080p at 60fps from a console or camera, and some pass the signal through to a TV. Every pick was $50 or less at the time of writing.", close: "Budget cards rely on USB 3.0; plug them into a blue or USB 3 port, not a 2.0 hub." },
  { slug: "best-usb-c-capture-cards", kw: "usb-c capture cards", g: "stream", where: (f) => /capture/i.test(s(f, "type")) && /usb-c/i.test(s(f, "conn")), sort: "price", seo: "Best USB-C Capture Cards",
    lead: "A USB-C capture card connects straight to a modern laptop without an adapter. Every pick has a USB-C connection.", close: "Check the laptop's USB-C port supports data at USB 3 speed, not charging only." },
  { slug: "best-internal-pcie-capture-cards", kw: "internal pcie capture cards", g: "stream", where: (f) => /pcie/i.test(`${s(f, "type")} ${s(f, "conn")}`), sort: "price", seo: "Best Internal PCIe Capture Cards",
    lead: "An internal PCIe capture card sits in a desktop's expansion slot, freeing a USB port and cutting cable clutter. Every pick is an internal PCIe card.", close: "Check for a free PCIe slot that is not blocked by the graphics card." },
  { slug: "best-audio-interfaces-for-streaming", kw: "audio interfaces for streaming", g: "stream", where: (f) => /interface/i.test(s(f, "type")), sort: "price",
    lead: "An audio interface connects an XLR microphone to the PC and gives you a gain knob and headphone monitoring. Every pick is a USB audio interface.", close: "Dynamic mics such as the SM7B need plenty of gain; check the interface's listed gain or add an inline booster." },
  { slug: "best-streaming-key-lights", kw: "streaming key lights", g: "stream", where: (f) => /key light/i.test(s(f, "type")), sort: "price",
    lead: "A key light is the main light on your face; a soft, adjustable panel fixes more webcam problems than a new camera. Every pick is a key light or panel.", close: "Place the light slightly above eye level and off to one side for a natural look." },
  { slug: "best-green-screens-for-streaming", kw: "green screens for streaming", g: "stream", where: (f) => /green screen/i.test(s(f, "type")), sort: "price",
    lead: "A green screen lets streaming software replace the background cleanly. Every pick is a chroma key backdrop, from pop-up panels to pull-down screens.", close: "Light the screen evenly and sit a few feet in front of it to avoid green spill." },
  { slug: "best-streaming-camera-mounts", kw: "streaming camera mounts", g: "stream", where: (f) => /camera mount/i.test(s(f, "type")), sort: "price",
    lead: "A camera mount lifts a webcam or camera off the monitor, so you can frame the shot from above or the side. Every pick is a desk mount or stand with a standard camera thread.", close: "Check the clamp opening against your desk thickness before buying." },

  // ---------------- Webcams, fans, SSDs, headphones (new facts in misc18.ts) ----------------
  { slug: "best-webcams-with-tripod", kw: "webcams with tripod", g: "webcam", where: re(/tripod/i), sort: "price",
    lead: "A webcam with a tripod can sit on the desk, a shelf or beside the monitor instead of clipping to the screen. Every pick includes a tripod.", close: "A tripod thread also lets you move the webcam to a mic arm or camera mount later." },
  { slug: "best-webcams-with-ring-light", kw: "webcams with ring light", g: "webcam", where: re(/ring light/i), sort: "price",
    lead: "A webcam with a built-in ring light brightens your face without a separate lamp. Every pick has a built-in ring or fill light.", close: "A built-in ring light is close to the lens, so it can reflect in glasses; tilt the camera slightly if it does." },
  { slug: "best-140mm-pc-fans", kw: "140mm pc fans", g: "fan", where: (f) => /140\s?mm/i.test(f.name), sort: "price", seo: "Best 140mm PC Fans",
    lead: "A 140mm fan moves more air at a lower speed than a 120mm fan, which keeps noise down. Every pick is a 140mm fan.", close: "Check your case and radiator mounts accept 140mm fans before buying." },
  { slug: "best-2230-ssds-for-steam-deck", kw: "2230 ssds for steam deck", g: "ssd", where: (f) => /2230/.test(s(f, "pcie")), sort: "price", seo: "Best 2230 SSDs for Steam Deck",
    lead: "The Steam Deck and similar handhelds take the short M.2 2230 SSD size. Every pick is a 2230 NVMe drive.", close: "Back up before swapping, and reuse the Deck's original shielding on the new drive." },
  { slug: "best-planar-magnetic-headphones", kw: "planar magnetic headphones", g: "headset", where: re(/planar/i), sort: "price",
    lead: "Planar magnetic headphones drive a thin diaphragm across its whole surface, which gives fast, detailed sound. Every pick is a planar magnetic design.", close: "Most planar headphones have no microphone; add a desk mic or use the ROG Kithara's boom mic for voice chat." },

  // ---------------- Chairs (new facts in misc18.ts) ----------------
  { slug: "best-chairs-with-bluetooth-speakers", kw: "chairs with bluetooth speakers", g: "chair", where: re(/speaker/i), sort: "price", seo: "Best Gaming Chairs with Bluetooth Speakers",
    lead: "Gaming chairs with built-in speakers put sound right behind your head without a desk speaker. Every pick has built-in Bluetooth speakers.", close: "Bluetooth adds delay; use a headset or desk speakers for competitive games." },
  { slug: "best-white-gaming-chairs", kw: "white gaming chairs", g: "chair", where: (f) => /white/i.test(`${f.name} ${f.notes.join(" ")}`), sort: "price",
    lead: "A white gaming chair suits a white desk setup. Every pick has a white, off-white or white-accented finish.", close: "White PU leather shows marks sooner; wipe it regularly with a damp cloth." },
  { slug: "best-chairs-for-women", kw: "chairs for women", g: "chair", where: (f) => /pink|cat ear/i.test(`${f.name} ${f.notes.join(" ")}`), sort: "price", seo: "Best Pink and Pastel Gaming Chairs",
    lead: "Anyone can sit in any chair; this list covers the pink and pastel gaming chairs people often look for under this search. Choose on seat height and support first, then finish.", close: "Check the listed seat height; shorter users need a seat that lowers enough for feet to rest flat." },

  // ---------------- Speakers ----------------
  { slug: "best-rgb-gaming-speakers", kw: "rgb gaming speakers", g: "speaker", where: re(/rgb|lighting|chroma/i), sort: "price",
    lead: "RGB gaming speakers add lighting that can match a keyboard and mouse. Every pick has RGB or lighting effects.", close: "Lighting does not change the sound; compare inputs and form first." },
  { slug: "best-usb-powered-pc-speakers", kw: "usb powered pc speakers", g: "speaker", where: (f) => /usb/i.test(s(f, "inputs")) && !/hdmi/i.test(s(f, "inputs")), sort: "price",
    lead: "USB-powered speakers run from the PC with no wall adapter. Every pick has USB power or audio.", close: "USB power limits volume; bookshelf speakers with their own supply play louder." },
  { slug: "best-bluetooth-pc-speakers", kw: "bluetooth pc speakers", g: "speaker", where: (f) => /bluetooth/i.test(s(f, "inputs")) && !/hdmi/i.test(s(f, "inputs")), sort: "-price",
    lead: "Bluetooth PC speakers also play music from a phone or tablet. Every pick has Bluetooth alongside a wired input for the PC.", close: "Use the wired input for games; Bluetooth adds delay." },
  { slug: "best-2-1-pc-speakers-with-subwoofer", kw: "2.1 pc speakers with subwoofer", g: "speaker", where: (f) => /2\.1|subwoofer/i.test(s(f, "form")) && !/soundbar/i.test(s(f, "form")), sort: "price", seo: "Best 2.1 PC Speakers with Subwoofer",
    lead: "A 2.1 set adds a separate subwoofer for bass that small desk speakers cannot reach. Every pick is a 2.1 system.", close: "Put the subwoofer on the floor near a wall for fuller bass." },

  // ---------------- Monitors ----------------
  { slug: "best-aoc-gaming-monitors", kw: "aoc gaming monitors", g: "monitor", where: re(/\bAOC\b/), sort: "-hz", seo: "Best AOC Gaming Monitors",
    lead: "AOC covers everything from budget 1080p screens to QD-OLED panels. Every pick is an AOC monitor, ordered by refresh rate.", close: "AOC model names encode size and panel; check the exact letters before buying." },
  { slug: "best-32-inch-4k-monitors", kw: "32 inch 4k monitors", g: "monitor", where: (f) => s(f, "res") === "3840x2160" && n(f, "size") >= 31 && n(f, "size") <= 32.5, sort: "-hz", seo: "Best 32-Inch 4K Monitors",
    lead: "At 32 inches, 4K gives a sharp picture at normal desk distance without scaling tricks. Every pick is a 31.5 to 32-inch 4K panel, ordered by refresh rate.", close: "4K at high refresh needs a strong GPU; upscaling helps." },
  { slug: "best-ultrawide-gaming-monitors", kw: "ultrawide gaming monitors", g: "monitor", where: (f) => /3440|5120|2560x1080/.test(s(f, "res")), sort: "price",
    lead: "Ultrawide monitors stretch the view sideways for racing, flight and strategy games. Every pick has an ultrawide resolution.", close: "Check each game supports 21:9 or 32:9 before buying." },
  { slug: "best-qd-oled-monitors", kw: "qd-oled monitors", g: "monitor", where: (f) => /qd-oled/i.test(s(f, "panel")), sort: "-hz", seo: "Best QD-OLED Monitors",
    lead: "QD-OLED panels combine per-pixel black levels with bright, saturated colour. Every pick has a QD-OLED panel, ordered by refresh rate.", close: "Use the monitor's pixel-refresh features to reduce burn-in risk." },

  // ---------------- Storage ----------------
  { slug: "best-budget-external-ssds", kw: "budget external ssds", g: "storage", where: ssdKind, sort: "price",
    lead: "Budget external SSDs still beat hard drives for speed and toughness. Every pick is an SSD, ordered from the lowest listed price.", close: "Check whether the price is for 1TB or 2TB before comparing." },
  { slug: "best-rugged-portable-ssds", kw: "rugged portable ssds", g: "storage", where: (f) => ssdKind(f) && re(/rugged|ip\d|drop|shock/i)(f), sort: "-read",
    lead: "Rugged portable SSDs add drop, dust or water ratings for field work. Every pick has a ruggedness or IP rating, ordered by read speed.", close: "IP ratings apply only with port covers closed." },
  { slug: "best-external-ssds-for-ps5", kw: "external ssds for ps5", g: "storage", where: ssdKind, sort: "-capacity", seo: "Best External SSDs for PS5",
    lead: "The PS5 can store and play PS4 games from an external USB drive, and store PS5 games there to move back internally. These SSDs are ordered by capacity.", close: "Use a rear USB port on the PS5; front ports are slower on some models." },
  { slug: "best-budget-nvme-ssds", kw: "budget nvme ssds", g: "ssd", sort: "price", seo: "Best Budget NVMe SSDs",
    lead: "A budget NVMe SSD is still several times faster than SATA. These are ordered from the lowest listed price.", close: "DRAM-less drives are fine for games; heavy file work benefits from DRAM." },
  { slug: "best-4tb-nvme-ssds", kw: "4tb nvme ssds", g: "ssd", where: (f) => n(f, "capacity") >= 4, sort: "price", seo: "Best 4TB NVMe SSDs",
    lead: "A 4TB NVMe SSD holds a large game library in one slot. Every pick has 4TB.", close: "Check the TBW rating if you write large files often." },
  { slug: "best-ssds-for-ps5", kw: "ssds for ps5", g: "ssd", where: (f) => /PCIe (4|5)\.0/i.test(s(f, "pcie")), sort: "-read", seo: "Best Internal SSDs for PS5",
    lead: "The PS5's expansion slot takes a PCIe 4.0 M.2 SSD, and Sony recommends a heatsink. Every pick has PCIe 4.0 or newer, ordered by read speed.", close: "Fit a low-profile heatsink if the drive ships without one." },
  { slug: "best-pcie-5-0-ssds", kw: "pcie 5.0 ssds", g: "ssd", where: (f) => /5\.0/i.test(s(f, "pcie")), sort: "-read", seo: "Best PCIe 5.0 SSDs",
    lead: "PCIe 5.0 SSDs double the sequential speed of Gen4 drives on a supported M.2 slot. Every pick has PCIe 5.0, ordered by read speed.", close: "Gen5 drives run hot; use the motherboard's heatsink or the drive's own." },

  // ---------------- Fans, cases ----------------
  { slug: "best-pc-fan-3-pack", kw: "pc fan 3 pack", g: "fan", where: (f) => n(f, "pack") >= 3, sort: "price", seo: "Best PC Fan 3-Packs",
    lead: "A three-pack fills a case front or a 360mm radiator in one purchase. Every pick comes in a pack of three or more.", close: "Daisy-chain or reverse-blade versions tidy cables in glass cases." },
  { slug: "best-high-static-pressure-fans", kw: "high static pressure fans", g: "fan", where: (f) => n(f, "pressure") > 0, sort: "-pressure",
    lead: "Static pressure pushes air through radiators and dense filters. Every pick has a static pressure figure, ordered from the highest.", close: "Use high-pressure fans on radiators and airflow fans on open vents." },
  { slug: "best-quiet-pc-case-fans", kw: "quiet pc case fans", g: "fan", where: (f) => { const db = Number((s(f, "noise").match(/([\d.]+)\s*dB/i) ?? [])[1]); return db > 0 && db <= 25; }, sort: "price",
    lead: "Quiet fans balance airflow against noise. Every pick has a maximum noise figure of 25 dB(A) or lower, ordered from the lowest listed price.", close: "Run fans on a fan curve; most noise comes from spinning faster than needed." },
  { slug: "best-argb-pc-fans", kw: "argb pc fans", g: "fan", where: (f) => /argb/i.test(s(f, "argb")), sort: "-cfm", seo: "Best ARGB PC Fans",
    lead: "ARGB fans have individually addressable LEDs that sync with the motherboard. Every pick has ARGB lighting, ordered by airflow.", close: "Check your motherboard has a 5V 3-pin ARGB header, not only 12V RGB." },

  // ---------------- Cases, GPUs, prebuilts ----------------
  { slug: "best-phanteks-pc-cases", kw: "phanteks pc cases", g: "pcCase", where: re(/phanteks/i), sort: "price",
    lead: "Phanteks makes airflow and showcase cases from the XT to the NV series. Every pick is a Phanteks case.", close: "Check GPU length and radiator support against your parts list." },
  { slug: "best-powercolor-graphics-cards", kw: "powercolor graphics cards", g: "gpu", where: re(/powercolor/i), sort: "-vram",
    lead: "PowerColor builds only AMD Radeon cards, from Hellhound to Red Devil. Every pick is a PowerColor card, ordered by VRAM.", close: "Radeon cards use 8-pin power; count your PSU's PCIe cables." },
  { slug: "best-pny-graphics-cards", kw: "pny graphics cards", g: "gpu", where: re(/\bpny\b/i), sort: "-vram",
    lead: "PNY builds NVIDIA GeForce cards, including compact and XLR8 models. Every pick is a PNY card, ordered by VRAM.", close: "Check card length; PNY's high-end models are long." },
  { slug: "best-cyberpowerpc-gaming-pcs", kw: "cyberpowerpc gaming pcs", g: "prebuilt", where: re(/cyberpower/i), sort: "price", seo: "Best CyberPowerPC Gaming PCs",
    lead: "CyberPowerPC sells prebuilt systems from RTX 5060 entry builds upward. Every pick is a CyberPowerPC listing that names its CPU, GPU, memory and SSD.", close: "Confirm the warranty terms before you buy." },
  { slug: "best-prebuilt-gaming-pc-under-500", kw: "prebuilt gaming pc under 500", g: "prebuilt", where: (f) => p(f) <= 500, sort: "-ram", seo: "Best Prebuilt Gaming PCs Under $500",
    lead: "Under $500, most gaming PCs are mini PCs with integrated or laptop-class graphics rather than towers with a desktop card. Every pick was $500 or less at the time of writing.", close: "At this price, expect lighter games and esports titles at modest settings." },
  { slug: "best-prebuilt-gaming-pc-under-800", kw: "prebuilt gaming pc under 800", g: "prebuilt", where: (f) => p(f) <= 800, sort: "-vram", seo: "Best Prebuilt Gaming PCs Under $800",
    lead: "Under $800, a prebuilt gaming PC targets 1080p. Every pick was $800 or less at the time of writing, ordered by VRAM.", close: "Check whether a listing uses a desktop GPU or integrated graphics." },
  { slug: "best-prebuilt-gaming-pc-1200-dollar", kw: "prebuilt gaming pc 1200 dollar", g: "prebuilt", where: (f) => tower(f) && p(f) >= 1000 && p(f) <= 1300, sort: "-vram", seo: "Best $1,200 Prebuilt Gaming PCs",
    lead: "Around $1,200, prebuilt towers pair RTX 5060-class cards with mid-range CPUs. Every pick was listed between $1,000 and $1,300 at the time of writing.", close: "Prices move often; compare the GPU class first." },
  { slug: "best-prebuilt-gaming-pc-1500-dollar", kw: "prebuilt gaming pc 1500 dollar", g: "prebuilt", where: (f) => tower(f) && p(f) > 1300 && p(f) <= 1700, sort: "-vram", seo: "Best $1,500 Prebuilt Gaming PCs",
    lead: "Around $1,500, prebuilt towers reach 12GB and 16GB graphics cards for 1440p. Every pick was listed between $1,300 and $1,700.", close: "32GB of RAM is worth it if you stream or edit alongside gaming." },
  { slug: "best-prebuilt-gaming-pc-2000-dollar", kw: "prebuilt gaming pc 2000 dollar", g: "prebuilt", where: (f) => tower(f) && p(f) > 1700 && p(f) <= 2300, sort: "-vram", seo: "Best $2,000 Prebuilt Gaming PCs",
    lead: "Around $2,000, prebuilt towers step up to RTX 5070-class cards and faster CPUs. Every pick was listed between $1,700 and $2,300.", close: "At this level, check the PSU wattage for future upgrades." },
  { slug: "best-prebuilt-gaming-pc-5000-dollar-and-up", kw: "prebuilt gaming pc 5000 dollar and up", g: "prebuilt", where: (f) => p(f) >= 4500, sort: "-vram", seo: "Best Prebuilt Gaming PCs $5,000 and Up",
    lead: "At $5,000 and above, prebuilt systems use flagship graphics cards, top CPUs and large SSDs. Every pick was or near that level at the time of writing.", close: "At this price, a custom build or a boutique builder is worth comparing." },
  { slug: "best-gaming-pc-for-esports", kw: "gaming pc for esports", g: "prebuilt", where: (f) => tower(f) && p(f) <= 1500, sort: "-vram",
    lead: "Esports titles run at high frame rates on mid-range hardware, so the budget is better spent on a fast monitor. Every pick is a tower under $1,500.", close: "Pair it with a 240Hz or faster monitor to see the frame rate." },
  { slug: "best-gaming-pc-for-streaming", kw: "gaming pc for streaming", g: "prebuilt", where: (f) => tower(f) && n(f, "ram") >= 32 && /RTX/i.test(s(f, "gpu")), sort: "price",
    lead: "NVIDIA RTX cards include a hardware encoder that streaming apps can use, which frees the CPU. Every pick has an RTX card and 32GB or more of RAM.", close: "Select the NVENC encoder in OBS to use the graphics card for encoding." },
  { slug: "best-gaming-pc-for-blender-3d-rendering", kw: "gaming pc for blender 3d rendering", g: "prebuilt", where: (f) => n(f, "vram") >= 16 && n(f, "ram") >= 32, sort: "-vram", seo: "Best Gaming PCs for Blender Rendering",
    lead: "Blender's Cycles renderer uses the GPU and its VRAM, so large scenes need 16GB or more. Every pick has 16GB or more of VRAM and 32GB or more of RAM.", close: "Check that your render engine supports your GPU's API (CUDA/OptiX or HIP)." },
  { slug: "best-gaming-pc-for-stable-diffusion-ai-image-generation", kw: "gaming pc for stable diffusion", g: "prebuilt", where: (f) => /RTX/i.test(s(f, "gpu")) && n(f, "vram") >= 16, sort: "price", seo: "Best Gaming PCs for Stable Diffusion",
    lead: "Local image generation leans on VRAM, and most tools are tuned for NVIDIA cards. Every pick has an RTX card with 16GB or more of VRAM.", close: "More VRAM allows larger images and models without running out of memory." },
  { slug: "best-gaming-pc-for-flight-simulator-2024-dcs-world", kw: "gaming pc for flight simulator", g: "prebuilt", where: (f) => /X3D|i7|i9|Ultra 7|Ultra 9|Ryzen 9/i.test(s(f, "cpu")) && n(f, "vram") >= 12, sort: "-vram", seo: "Best Gaming PCs for Flight Simulator",
    lead: "Flight simulators load both the CPU and the GPU heavily, especially in busy airports and with VR. Every pick pairs a high-end CPU with 12GB or more of VRAM.", close: "32GB or more of RAM helps in dense scenery and with add-ons." },
  { slug: "best-gaming-pc-for-console-emulation", kw: "gaming pc for console emulation", g: "prebuilt", where: (f) => tower(f) && /X3D|i7|i9|Ultra 7|Ultra 9|Ryzen 7|Ryzen 9/i.test(s(f, "cpu")), sort: "price",
    lead: "Emulating newer consoles leans on single-thread CPU speed more than on the graphics card. Every pick has a Ryzen 7, Ryzen 9, Core i7, Core i9 or Core Ultra 7/9 class CPU.", close: "Only emulate games you own, and check each emulator's hardware notes." },

  // ---------------- Chairs and arms ----------------
  { slug: "best-chairs-with-4d-armrests", kw: "chairs with 4d armrests", g: "chair", where: (f) => /4d|5d/i.test(s(f, "arms")), sort: "price", seo: "Best Chairs with 4D Armrests",
    lead: "4D armrests move up, down, forward, back and pivot, so they fit a desk and a keyboard position. Every pick has 4D or 5D armrests.", close: "Set armrest height level with the desk so your shoulders relax." },
  { slug: "best-rocking-gaming-chairs", kw: "rocking gaming chairs", g: "chair", where: re(/rock/i), sort: "price",
    lead: "Rocking gaming chairs let you lean back and forth during breaks. Every pick has a rocking mode.", close: "Lock the tilt when you work to keep a stable posture." },
  { slug: "best-chairs-for-tall-people", kw: "chairs for tall people", g: "chair", where: re(/6'[1-9]|6'1[01]|big and tall|b&t/i), sort: "-capacity",
    lead: "Taller users need a higher seat, a taller backrest and a seat deep enough to support the thighs. Every pick has a height range reaching over six feet or a big-and-tall design.", close: "Check the seat-height maximum against your leg length." },
  { slug: "best-chairs-with-headrest-pillow", kw: "chairs with headrest pillow", g: "chair", where: re(/headrest|neck pillow|head pillow/i), sort: "price",
    lead: "A headrest or neck pillow supports your head when you recline. Every pick has a headrest or neck pillow.", close: "An adjustable headrest fits more heights than a fixed one." },
  { slug: "best-gaming-recliner-chairs", kw: "gaming recliner chairs", g: "chair", where: (f) => n(f, "recline") >= 150, sort: "-recline",
    lead: "Gaming recliners lean back to 150 degrees or more for breaks and films. Every pick has a recline of at least 150 degrees.", close: "A deep recline needs clear floor space behind the chair." },
  { slug: "best-premium-monitor-arms", kw: "premium monitor arms", g: "arm", sort: "-price",
    lead: "Premium monitor arms add smoother gas springs, higher weight limits and cable routing. This set runs from the premium end down.", close: "Match the arm's weight range to your monitor, or it will drift." },
  { slug: "best-triple-monitor-arms", kw: "triple monitor arms", g: "arm", where: (f) => Number(s(f, "screens").match(/\d+/)?.[0] ?? 0) >= 3, sort: "price",
    lead: "Triple monitor arms hold three screens on one clamp. Every pick has support for three or more monitors.", close: "Check the desk can carry the combined weight at the clamp point." },
  { slug: "best-heavy-duty-monitor-arms-for-ultrawide", kw: "heavy duty monitor arms for ultrawide", g: "arm", where: (f) => n(f, "load") >= 33, sort: "-load", seo: "Best Heavy-Duty Monitor Arms",
    lead: "Ultrawide monitors are heavy and wide, so the arm needs a high weight limit. Every pick has a load of at least 33 lbs (about 15kg) per arm, ordered by capacity.", close: "Tighten the spring tension after mounting so the screen holds its height." },
];
