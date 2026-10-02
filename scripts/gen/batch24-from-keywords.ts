/**
 * Builds data/clusters/batch24-plan.ts from DeskFinds keyword slugs (topics only; no text is copied).
 * Each slug is parsed into modifiers; a keyword is kept only when every token is understood,
 * so purpose keywords with no separating spec ("for-movies", "for-students") are held.
 */
import fs from "node:fs";
const [inFile, outFile, heldFile] = process.argv.slice(2);
const slugs = fs.readFileSync(inFile, "utf8").trim().split(/\r?\n/);
const h = (s: string) => { let x = 0; for (const c of s) x = (x * 31 + c.charCodeAt(0)) >>> 0; return x; };
const pk = <T,>(a: T[], s: string) => a[h(s) % a.length];
const q = (s: string) => JSON.stringify(s);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
type Cond = { code: string; desc: string; lead: string[]; sort?: string; seo?: string };
type Out = { slug: string; kw: string; g: string; conds: Cond[]; sort: string; seo: string };
const out: Out[] = []; const held: string[] = [];
const BRANDS: Record<string, string> = { acer: "Acer", asus: "ASUS", aoc: "AOC", benq: "BenQ", dell: "Dell", gigabyte: "GIGABYTE", hp: "HP", lenovo: "Lenovo", lg: "LG", msi: "MSI", samsung: "Samsung", viewsonic: "ViewSonic", koorui: "KOORUI", ktc: "KTC", alienware: "Alienware", crua: "CRUA", zowie: "ZOWIE", razer: "Razer", logitech: "Logitech", redragon: "Redragon", steelcase: "Steelcase" };
const NOISE = new Set(["best", "the", "with", "for", "and", "a"]);
const under = (t: string[]) => { const i = t.indexOf("under"); return i >= 0 && /^\d+$/.test(t[i + 1] ?? "") ? Number(t[i + 1]) : 0; };

function parse(slug: string, nouns: string[], rules: [RegExp, (m: RegExpMatchArray) => Cond | null][]): Cond[] | null {
  let rest = slug.replace(/^best-/, "");
  const conds: Cond[] = [];
  for (const [re, f] of rules) {
    const m = rest.match(re);
    if (!m) continue;
    const c = f(m); if (!c) return null;
    conds.push(c); rest = rest.replace(m[0], "-");
  }
  const left = rest.split("-").filter((w) => w && !NOISE.has(w) && !nouns.includes(w));
  return left.length ? null : conds;
}
const priceRule: [RegExp, (m: RegExpMatchArray) => Cond] = [/under-(\d+)/, (m) => ({ code: `p(f) <= ${m[1]}`, desc: `cost $${m[1]} or less when we checked`, lead: [`Under $${m[1]}, the trade-offs are sharper, so it helps to know which spec you can give up.`, `A $${m[1]} ceiling rules out the premium models, which makes the differences between the rest matter more.`], sort: "-" })];
const brandRule = (g: string): [RegExp, (m: RegExpMatchArray) => Cond | null] => [new RegExp(`^(${Object.keys(BRANDS).join("|")})-`), (m) => ({ code: `/^${BRANDS[m[1]]}\\b/i.test(f.name)`, desc: `is made by ${BRANDS[m[1]]}`, lead: [`${BRANDS[m[1]]}'s ${g} range is wide, so the model number decides what you get.`, `Within ${BRANDS[m[1]]}'s line-up, panel and refresh rate vary more than the badge suggests.`] })];

// ---------------- Monitors ----------------
const monRules: [RegExp, (m: RegExpMatchArray) => Cond | null][] = [
  brandRule("monitor"), priceRule,
  [/(?:^|-)(\d{2,3})hz(?=-|$)/, (m) => { const n = +m[1]; return n <= 60 ? null : { code: `n(f, "hz") >= ${n}`, desc: `refreshes at ${n}Hz or more`, lead: [`${n}Hz is the line where motion starts to look noticeably smoother for this kind of setup.`, `A ${n}Hz panel only pays off when your GPU can hold frame rates near that figure.`], sort: "price" }; }],
  [/(?:^|-)(\d{2})(?:-(\d))?-inch(?=-|$)/, (m) => { const n = +(m[2] ? `${m[1]}.${m[2]}` : m[1]); return { code: `size(f) >= ${n - 0.6} && size(f) <= ${n + 0.6}`, desc: `measures about ${n} inches`, lead: [`At ${n} inches, pixel density decides how sharp text and games look from a normal seat.`, `${n}-inch screens fit a standard desk depth, but resolution changes how close you can sit.`] }; }],
  [/(?:^|-)(4k)(?=-|$)/, () => ({ code: `s(f, "res") === "3840x2160"`, desc: "is 4K", lead: ["4K needs a strong GPU for games, but it gives the sharpest desktop at this size.", "A 4K panel quadruples the pixels of 1080p, so plan for upscaling in demanding games."] })],
  [/(?:^|-)(1440p|2k)(?=-|$)/, () => ({ code: `s(f, "res") === "2560x1440"`, desc: "is 1440p", lead: ["1440p is the balance point between sharpness and frame rate for most mid-range GPUs.", "A 1440p screen asks far less of the GPU than 4K while looking clearly sharper than 1080p."] })],
  [/(?:^|-)1080p(?=-|$)/, () => ({ code: `s(f, "res") === "1920x1080"`, desc: "is 1080p", lead: ["1080p keeps frame rates high on modest graphics cards.", "A 1080p panel is the cheapest way to reach high refresh rates."] })],
  [/(?:^|-)qd-oled(?=-|$)/, () => ({ code: `/QD-OLED/.test(s(f, "panel"))`, desc: "uses a QD-OLED panel", lead: ["QD-OLED pairs per-pixel contrast with brighter, more saturated colour than older OLED.", "QD-OLED panels light each pixel on its own, so blacks stay black next to bright highlights."] })],
  [/(?:^|-)oled(?=-|$)/, () => ({ code: `/OLED/.test(s(f, "panel"))`, desc: "uses an OLED panel", lead: ["OLED switches pixels almost instantly, which keeps fast motion clear.", "OLED gives true blacks, but static taskbars and HUDs need some care against burn-in."] })],
  [/(?:^|-)mini-led(?=-|$)/, () => ({ code: `/mini ?LED/i.test(t(f)) && !/\\bTV\\b/.test(f.name)`, desc: "uses a Mini LED backlight", lead: ["Mini LED reaches high HDR brightness without OLED's burn-in risk."] })],
  [/(?:^|-)ips(?=-|$)/, () => ({ code: `/IPS/.test(s(f, "panel"))`, desc: "uses an IPS panel", lead: ["IPS panels keep colour consistent at an angle, which helps with shared or wide screens.", "IPS trades some contrast for accurate colour and wide viewing angles."] })],
  [/(?:^|-)va(?=-|$)/, () => ({ code: `/^VA/.test(s(f, "panel"))`, desc: "uses a VA panel", lead: ["VA panels give deeper blacks than IPS at a lower price than OLED."] })],
  [/(?:^|-)curved(?=-|$)/, () => ({ code: `/curved|\\d{3,4}R\\b/i.test(t(f))`, desc: "is curved", lead: ["A curve keeps the edges of a wide screen closer to your eyes.", "Curved screens matter most when you sit close to a large or wide panel."] })],
  [/(?:^|-)flat(?=-|$)/, () => ({ code: `!/curved|\\d{3,4}R\\b/i.test(t(f))`, desc: "is flat", lead: ["A flat screen keeps straight lines straight, which suits design and spreadsheet work as well as games."] })],
  [/(?:^|-)(ultrawide|extra-wide)(?=-|$)/, () => ({ code: `/^(3440|5120|3840x1600|2560x1080)/.test(s(f, "res"))`, desc: "is an ultrawide", lead: ["An ultrawide replaces a dual-monitor setup without a bezel in the middle.", "Ultrawides add horizontal space, but check that your games support 21:9 or 32:9."] })],
  [/(?:^|-)(portable)(?=-|$)/, () => ({ code: `size(f) > 0 && size(f) <= 18`, desc: "is a portable screen of 18 inches or less", lead: ["A portable monitor adds a second screen to a laptop, handheld or console on the move.", "Portable monitors run from one cable in most cases, so check that your device outputs video over USB-C."] })],
  [/(?:^|-)usb-c(?=-|$)/, () => ({ code: `f.specs.usbc === true || /USB-C|Type-C/i.test(t(f))`, desc: "accepts video over USB-C", lead: ["A USB-C monitor can carry video, data and charging over one cable to a laptop.", "With USB-C, a single cable can drive the screen and keep a laptop charged."] })],
  [/(?:^|-)hdmi-2-1(?=-|$)/, () => ({ code: `/HDMI 2\\.1/.test(t(f))`, desc: "has HDMI 2.1", lead: ["HDMI 2.1 lets consoles run 4K at 120Hz over one cable."] })],
  [/(?:^|-)(hdr)(?=-|$)/, () => ({ code: `!!s(f, "hdr")`, desc: "supports HDR", lead: ["HDR support varies widely; the certification level tells you more than the HDR label."] })],
  [/(?:^|-)(nvidia-g-sync|g-sync)(?=-|$)/, () => ({ code: `/G-SYNC/.test(s(f, "sync"))`, desc: "lists G-SYNC support", lead: ["G-SYNC support keeps NVIDIA cards tear-free when frame rates move around."] })],
  [/(?:^|-)(fastest|fast)(?=-|$)/, () => ({ code: `n(f, "hz") >= 240`, desc: "refreshes at 240Hz or more", lead: ["Speed in a monitor means refresh rate and pixel response together, not just one number."], sort: "-hz" })],
  [/(?:^|-)(budget|entry-level)(?=-|$)/, () => ({ code: `p(f) <= 300`, desc: "cost $300 or less when we checked", lead: ["A budget screen should still get the basics right: a stable stand, a sharp panel and the inputs you need."], sort: "price" })],
  [/(?:^|-)pink(?=-|$)/, () => ({ code: `/pink/i.test(f.name)`, desc: "comes in pink", lead: ["A coloured monitor shell is a style choice, so the panel underneath still decides the value."] })],
  [/(?:^|-)(height-adjustable)(?=-|$)/, () => ({ code: `/height/i.test(s(f, "stand"))`, desc: "has a height-adjustable stand", lead: ["A height-adjustable stand saves buying a monitor arm when you want the screen at eye level."] })],
  [/(?:^|-)(vertical)(?=-|$)/, () => ({ code: `/pivot/i.test(s(f, "stand"))`, desc: "pivots to portrait", lead: ["A pivoting stand turns the screen to portrait for code, documents and chat."] })],
  [/(?:^|-)(large)(?=-|$)/, () => ({ code: `size(f) >= 32`, desc: "measures 32 inches or more", lead: ["Large screens need more desk depth; sit far enough back to take in the whole panel."] })],
  [/(?:^|-)(gaming)(?=-|$)/, () => ({ code: `n(f, "hz") >= 120`, desc: "refreshes at 120Hz or more", lead: ["For gaming, refresh rate and response time matter more than colour extras."] })],
  [/(?:^|-)(for-ps5-pro|for-ps5|for-xbox-series-x|for-xbox-series-s|for-nintendo-switch)(?=-|$)/, (m) => ({ code: /switch/.test(m[1]) ? `n(f, "hz") >= 60 && !!s(f, "res")` : `/HDMI 2\\.1/.test(t(f))`, desc: /switch/.test(m[1]) ? "has a standard HDMI input" : "can run 4K at 120Hz from a console", lead: [/switch/.test(m[1]) ? "The Switch outputs 1080p in the dock, so a fast 1080p or 1440p screen covers it." : "Current consoles reach 120Hz only over HDMI 2.1, which narrows the list quickly."] })],
];
const monSkip = /privacy|shel|riser|-arm|light-bar|stand|mount|studio|air-quality|kvm|dock|extender|standing-desk|mini-pc|copy-holder|document|sticky|smart-display|power-strip|ups-|ring-light|cpu|8k|micro-led|qled|dolby|thunderbolt|displayport|kvm|speakers|webcam|for-mac|for-movies|eye|work|editing|external|dual|foldable|frameless|glossy|99-srgb|touchscreen|hdmi-portable|pass-through|vesa|portrait|bright|lightweight|coding|surface|photo|90w|setup|wall|projector/;

for (const slug of slugs) {
  let conds: Cond[] | null = null; let g = "";
  if (/monitor/.test(slug) && !monSkip.test(slug)) { g = "monitor"; conds = parse(slug, ["monitor", "monitors"], monRules); }
  else if (/(task|office|desk|computer)-chairs?|ergonomic-chair|executive-office-chair|leather-office-chair|mesh-office-chair/.test(slug) && !/kneel|drafting|cushion|mat|bike|conference|cup/.test(slug)) {
    g = "chair";
    conds = parse(slug, ["task", "office", "chair", "chairs", "desk", "computer", "home"], [
      priceRule,
      [/(?:^|-)mesh(?=-|$)/, () => ({ code: `/mesh/i.test(s(f, "material"))`, desc: "has a mesh back", lead: ["Mesh breathes better than foam and leather on long, warm days."] })],
      [/(?:^|-)fabric(?=-|$)/, () => ({ code: `/fabric|velvet/i.test(s(f, "material"))`, desc: "is upholstered in fabric", lead: ["Fabric stays cooler than PU leather and does not peel over time."] })],
      [/(?:^|-)leather(?=-|$)/, () => ({ code: `/leather/i.test(s(f, "material"))`, desc: "is upholstered in PU or faux leather", lead: ["Leather-look upholstery wipes clean easily but runs warmer than mesh."] })],
      [/(?:^|-)(with-adjustable-lumbar-support|with-adjustable-lumbar)(?=-|$)/, () => ({ code: `/adjust|way|depth|level/i.test(s(f, "lumbar"))`, desc: "has adjustable lumbar support", lead: ["Adjustable lumbar support lets you place the curve where your lower back actually is."] })],
      [/(?:^|-)with-lumbar-support(?=-|$)/, () => ({ code: `!!s(f, "lumbar")`, desc: "includes lumbar support", lead: ["Some form of lumbar support helps keep the lower back from rounding over a long day."] })],
      [/(?:^|-)(with-footrests?|reclining-.*with-footrests)(?=-|$)/, () => ({ code: `f.specs.footrest === true || /footrest/i.test(t(f))`, desc: "has a footrest", lead: ["A pull-out footrest turns a desk chair into somewhere to rest between sessions."] })],
      [/(?:^|-)(with-flip-up-arms)(?=-|$)/, () => ({ code: `/flip/i.test(s(f, "arms"))`, desc: "has flip-up arms", lead: ["Flip-up arms let the chair slide under a desk or make room to sit cross-legged."] })],
      [/(?:^|-)(with-3d-armrests)(?=-|$)/, () => ({ code: `/[345]D/.test(s(f, "arms"))`, desc: "has 3D or better armrests", lead: ["Armrests that move in three or more directions support your forearms at the keyboard."] })],
      [/(?:^|-)(with-headrests?)(?=-|$)/, () => ({ code: `/headrest/i.test(t(f))`, desc: "has a headrest", lead: ["A headrest matters most if you lean back to read or take calls."] })],
      [/(?:^|-)(reclining)(?=-|$)/, () => ({ code: `n(f, "recline") >= 135`, desc: "reclines to 135° or more", lead: ["A deep recline is useful for breaks, but check the tilt lock holds at upright too."] })],
      [/(?:^|-)(heavy-duty|for-big-and-tall-users|for-heavy-people)(?=-|$)/, () => ({ code: `n(f, "capacity") >= 350`, desc: "is rated for 350 lb or more", lead: ["Weight ratings are the starting point for a heavy-duty chair, alongside a wide seat and a Class 4 gas lift."], sort: "-capacity" })],
      [/(?:^|-)400-lbs(?=-|$)/, () => ({ code: `n(f, "capacity") >= 400`, desc: "is rated for 400 lb or more", lead: ["A 400 lb rating needs a reinforced base and gas lift, not just thicker padding."] })],
      [/(?:^|-)(ergonomic|premium-ergonomic)(?=-|$)/, () => ({ code: `!!s(f, "lumbar") && !!s(f, "arms")`, desc: "has lumbar support and adjustable arms", lead: ["An ergonomic chair earns the name through adjustment: lumbar, arms and seat height that fit you."] })],
    ]);
  } else if (/vertical-mice|vertical-mouse(?!-pad)/.test(slug)) {
    g = "wmouse";
    conds = parse(slug, ["vertical", "mice", "mouse"], [
      priceRule,
      [/(?:^|-)wireless(?=-|$)/, () => ({ code: `!/^wired/i.test(s(f, "connection"))`, desc: "is wireless", lead: ["A wireless vertical mouse keeps the cable from tugging at the raised shape."] })],
      [/(?:^|-)wired(?=-|$)/, () => ({ code: `/^wired/i.test(s(f, "connection"))`, desc: "is wired", lead: ["A wired vertical mouse never needs charging and has no receiver to lose."] })],
      [/(?:^|-)bluetooth(?=-|$)/, () => ({ code: `/Bluetooth/i.test(s(f, "connection"))`, desc: "connects over Bluetooth", lead: ["Bluetooth frees a USB port, which matters on laptops with only one or two."] })],
      [/(?:^|-)multi-device(?=-|$)/, () => ({ code: `/devices/i.test(s(f, "connection"))`, desc: "pairs with more than one device", lead: ["Multi-device pairing lets one vertical mouse switch between a laptop and a desktop."] })],
      [/(?:^|-)left-handed(?=-|$)/, () => ({ code: `/left/i.test(t(f))`, desc: "is made for the left hand", lead: ["Left-handed vertical mice are rare, so check the shape before buying."] })],
      [/(?:^|-)ergonomic(?=-|$)/, () => ({ code: `true`, desc: "has a vertical grip", lead: ["A vertical grip turns the forearm to a handshake position instead of palm-down."] })],
    ]);
  } else if (/mouse-pads?|desk-pads?|desk-mat/.test(slug) && !/vertical|trackball|wireless-charging|carpal|mmo|anime|cute|custom|artisan|cork|velvet|gel|memory-foam|logitech|razer|redragon|steelseries/.test(slug)) {
    g = "pad";
    conds = parse(slug, ["mouse", "pad", "pads", "desk", "mat"], [
      priceRule,
      [/(?:^|-)(xxxl|xxl|xl|large)(?=-|$)/, (m) => ({ code: `n(f, "width") >= ${{ xxxl: 1000, xxl: 900, xl: 800, large: 700 }[m[1]]}`, desc: `is at least ${{ xxxl: 1000, xxl: 900, xl: 800, large: 700 }[m[1]]}mm wide`, lead: ["A wide desk pad keeps the keyboard and mouse on one surface."], sort: "-width" })],
      [/(?:^|-)glass(?=-|$)/, () => ({ code: `/glass/i.test(s(f, "surface"))`, desc: "has a glass surface", lead: ["Glass pads glide fast and never fray, but they are louder than cloth."] })],
      [/(?:^|-)leather(?=-|$)/, () => ({ code: `/leather/i.test(s(f, "surface"))`, desc: "has a leather surface", lead: ["A leather desk pad looks tidy in an office and wipes clean."] })],
      [/(?:^|-)(rgb|with-led-lights)(?=-|$)/, () => ({ code: `/RGB|LED/i.test(t(f))`, desc: "has RGB lighting", lead: ["RGB pads need a free USB port, so plan the cable route first."] })],
      [/(?:^|-)stitched-edge(?=-|$)/, () => ({ code: `/stitch/i.test(s(f, "edge"))`, desc: "has stitched edges", lead: ["Stitched edges stop a cloth pad from fraying where your wrist rests."] })],
      [/(?:^|-)(waterproof)(?=-|$)/, () => ({ code: `/water/i.test(t(f))`, desc: "lists a water-resistant surface", lead: ["A water-resistant coating saves the pad from the first spilled drink."] })],
      [/(?:^|-)(for-small-desks|for-small-desk|small-desk)(?=-|$)/, () => ({ code: `n(f, "width") > 0 && n(f, "width") <= 800`, desc: "is 800mm wide or less", lead: ["On a small desk, measure the free width before ordering a large pad."] })],
      [/(?:^|-)(gaming)(?=-|$)/, () => ({ code: `/cloth|speed|control|balance|glass|hard/i.test(s(f, "surface"))`, desc: "has a gaming surface", lead: ["A gaming pad's surface sets how much your mouse glides or stops."] })],
    ]);
  } else if (/chair-mats?/.test(slug) && !/corner/.test(slug)) {
    g = "floormat";
    conds = parse(slug, ["chair", "mat", "mats", "for", "office"], [
      priceRule,
      [/(?:^|-)(thick-carpet|high-pile-carpet)(?=-|$)/, () => ({ code: `/carpet/i.test(s(f, "floor")) && n(f, "thick") >= 3`, desc: "is rated for carpet and at least 3mm thick", lead: ["Thick carpet needs a stiffer mat, or the casters sink and the mat cracks."] })],
      [/(?:^|-)carpet(?=-|$)/, () => ({ code: `/carpet/i.test(s(f, "floor"))`, desc: "is made for carpet", lead: ["Carpet mats use cleats or a rigid base so they do not slide under casters."] })],
      [/(?:^|-)(hardwood-floors|hard-floor)(?=-|$)/, () => ({ code: `/hard/i.test(s(f, "floor"))`, desc: "is made for hard floors", lead: ["On hard floors, a mat protects the finish from caster wear and grit."] })],
      [/(?:^|-)rolling(?=-|$)/, () => ({ code: `true`, desc: "suits rolling chairs", lead: ["A chair mat lets casters roll freely instead of digging in."] })],
    ]);
  } else if (/portable-ssds?/.test(slug)) {
    g = "storage";
    conds = parse(slug, ["portable", "ssd", "ssds"], [
      priceRule,
      [/(?:^|-)(\d+)(gb|tb)(?=-|$)/, (m) => { const c = m[2] === "tb" ? +m[1] : +m[1] / 1000; return { code: `f.specs.kind === "SSD" && Math.abs(n(f, "capacity") - ${c}) < 0.05`, desc: `holds ${m[1]}${m[2].toUpperCase()}`, lead: [`${m[1]}${m[2].toUpperCase()} is the capacity that decides how many games or projects travel with you.`] }; }],
      [/(?:^|-)(fast|usb-3-2-gen-2|nvme)(?=-|$)/, () => ({ code: `f.specs.kind === "SSD" && n(f, "read") >= 1000`, desc: "reads at 1,000MB/s or more", lead: ["Fast portable SSDs only reach their speed on a 10Gbps or faster USB port."], sort: "-read" })],
      [/(?:^|-)(waterproof|rugged)(?=-|$)/, (m) => ({ code: m[1] === "waterproof" ? `f.specs.kind === "SSD" && /water|IP\d/i.test(s(f, "rugged"))` : `f.specs.kind === "SSD" && !!s(f, "rugged") && !/none/i.test(s(f, "rugged"))`, desc: "lists drop or water resistance", lead: ["A rugged shell matters when the drive travels in a bag."] })],
      [/(?:^|-)(encrypted|password-protected)(?=-|$)/, () => ({ code: `f.specs.kind === "SSD" && /encrypt|password|AES/i.test(s(f, "security"))`, desc: "has password protection or encryption", lead: ["Hardware encryption protects files if the drive is lost."] })],
      [/(?:^|-)(budget|reliable|ultra-compact)(?=-|$)/, (m) => m[1] === "budget" ? { code: `f.specs.kind === "SSD" && p(f) <= 100`, desc: "cost $100 or less when we checked", lead: ["Budget portable SSDs still beat hard drives on speed and shock resistance."], sort: "price" } : null],
      [/(?:^|-)(for-pcs|for-ps5|for-xbox-series-x-and-s|for-steam-deck|for-backups)(?=-|$)/, (m) => ({ code: `f.specs.kind === "SSD"`, desc: "is a USB SSD", lead: [{ "for-pcs": "On a PC, use a rear USB port rated at 10Gbps to reach full speed.", "for-ps5": "The PS5 stores PS4 games on USB drives, while PS5 games can only be moved there to save space.", "for-xbox-series-x-and-s": "Xbox Series consoles play older games from USB drives but need the internal or expansion card for Series titles.", "for-steam-deck": "The Steam Deck's USB-C port accepts a portable SSD for extra game storage.", "for-backups": "For backups, capacity and a reliable cable matter more than peak speed." }[m[1]]!] })],
    ]);
    if (conds && !conds.length) conds.push({ code: `f.specs.kind === "SSD"`, desc: "is a USB SSD", lead: ["A portable SSD is smaller and faster than any external hard drive."] });
  } else if (/studio-monitors?$|studio-monitors-(under|for-pc)/.test(slug)) {
    g = "speaker";
    conds = parse(slug, ["studio", "monitor", "monitors", "for", "pc", "desks"], [priceRule]);
    if (conds) conds.push({ code: `/studio/i.test(s(f, "form"))`, desc: "is a studio monitor", lead: ["Studio monitors aim for flat, accurate sound rather than boosted bass."] });
  }
  const BASE: Record<string, Cond> = {
    wmouse: { code: `/vertical/i.test(t(f))`, desc: "has a vertical grip", lead: [] },
    storage: { code: `f.specs.kind === "SSD"`, desc: "is a USB SSD", lead: [] },
    chair: { code: `!/gaming|floor|rocker|racing/i.test(f.name)`, desc: "is an office-style chair rather than a gaming chair", lead: [] },
  };
  if (g && conds && conds.length && BASE[g] && !conds.some((c) => c.code === BASE[g].code || c.code.includes(BASE[g].code))) conds.push(BASE[g]);
  if (!g) { held.push(`${slug}\tout of scope or no data`); continue; }
  if (!conds || !conds.length) { held.push(`${slug}\tno spec separates it (${g})`); continue; }
  const kw = slug.replace(/^best-/, "").replace(/-/g, " ");
  const sort = conds.map((c) => c.sort).find(Boolean) ?? (g === "monitor" ? "-hz" : "price");
  out.push({ slug, kw, g, conds, sort: sort === "-" ? (g === "monitor" ? "-hz" : g === "pad" ? "-width" : "price") : sort, seo: "" });
}

const NOUN: Record<string, string> = { monitor: "monitor", chair: "chair", wmouse: "mouse", pad: "pad", floormat: "mat", storage: "drive", speaker: "monitor pair" };
const ORDER: Record<string, string> = { price: "from the lowest price", "-price": "from the highest price", "-hz": "by refresh rate", hz: "by refresh rate", "-width": "from the widest", "-capacity": "by weight rating", "-read": "by read speed" };
const CLOSE: Record<string, string[]> = {
  monitor: ["Check that your GPU has the port the monitor needs for its full refresh rate.", "Set the refresh rate in Windows display settings; many screens start at 60Hz.", "Measure desk depth before buying a larger screen.", "Use the cable in the box; older cables can cap the refresh rate."],
  chair: ["Set seat height first, then arms, then lumbar.", "Check seat height against your desk height before buying.", "Tighten every bolt again after the first week of use."],
  wmouse: ["Give a vertical mouse a week before judging it; the grip takes time to get used to.", "Lower pointer speed at first while your hand adjusts to the angle."],
  pad: ["Wash cloth pads by hand in cool water to keep the base intact.", "Measure your free desk width before ordering."],
  floormat: ["Let a rolled mat lie flat for a day before use.", "Measure the area your chair actually rolls over."],
  storage: ["Use the shortest cable that reaches; long cables can drop speed.", "Format the drive in exFAT if you move it between Windows and macOS."],
  speaker: ["Place monitors at ear height, angled toward your head.", "Keep them a few inches off the wall to tame bass build-up."],
};
const titled = (s: string) => s.replace(/\b(\w)/g, (c) => c.toUpperCase()).replace(/\b(\d+)hz\b/gi, "$1Hz").replace(/\bOled\b/g, "OLED").replace(/\bQd\b/g, "QD").replace(/\bUsb C\b/g, "USB-C").replace(/\bIps\b/g, "IPS").replace(/\bVa\b/g, "VA").replace(/\bSsds?\b/g, (m) => m.toUpperCase()).replace(/\b(\d+)(Gb|Tb)\b/g, (_, a, b) => a + b.toUpperCase()).replace(/\bHdmi 2 1\b/g, "HDMI 2.1").replace(/\b4k\b/gi, "4K").replace(/\b2k\b/gi, "2K").replace(/\b(\d+) Inch\b/g, "$1-Inch").replace(/\bUnder (\d+)/g, "Under $$$1").replace(/\bPs5\b/g, "PS5").replace(/\bRgb\b/g, "RGB").replace(/\bXl\b|\bXxl\b|\bXxxl\b/g, (m) => m.toUpperCase()).replace(/\bHdr\b/g, "HDR").replace(/\bG Sync\b/g, "G-SYNC").replace(/\bMsi\b|\bAoc\b|\bLg\b|\bHp\b|\bKtc\b|\bCrua\b|\bZowie\b|\bAsus\b/g, (m) => m.toUpperCase()).replace(/\bBenq\b/g, "BenQ").replace(/\bViewsonic\b/g, "ViewSonic").replace(/\bGigabyte\b/g, "GIGABYTE").replace(/\bKoorui\b/g, "KOORUI").replace(/\b(\d+) Lbs\b/g, "$1 lbs").replace(/\b(\d+) (\d) Inch/g, "$1.$2-Inch");
const lines = out.map((o) => {
  const lead1 = pk(o.conds[0].lead, o.slug);
  const desc = o.conds.map((c) => c.desc);
  const every = `Every ${NOUN[o.g]} here ${desc.length > 1 ? desc.slice(0, -1).join(", ") + " and " + desc[desc.length - 1] : desc[0]}, ordered ${ORDER[o.sort] ?? "by price"}.`;
  const FIX: [RegExp, string][] = [[/\bSSDS\b/g, "SSDs"], [/\b(\d+)(tb|gb)\b/gi, "$1__$2"], [/\bQD OLED\b/g, "QD-OLED"], [/\bPcs\b/g, "PCs"], [/\bPc\b/g, "PC"], [/\bNvme\b/g, "NVMe"], [/\bMini Led\b/g, "Mini LED"], [/\bLed\b/g, "LED"], [/\bUsb 3 2 Gen 2\b/g, "USB 3.2 Gen 2"], [/\b3d\b/g, "3D"], [/\bFlip Up\b/g, "Flip-Up"], [/\bLeft Handed\b/g, "Left-Handed"], [/\bMulti Device\b/g, "Multi-Device"], [/\bEntry Level\b/g, "Entry-Level"], [/\bExtra Wide\b/g, "Extra-Wide"], [/\bHeavy Duty\b/g, "Heavy-Duty"], [/\bHeight Adjustable\b/g, "Height-Adjustable"], [/\bStitched Edge\b/g, "Stitched-Edge"], [/\bPassword Protected\b/g, "Password-Protected"], [/\bNvidia\b/g, "NVIDIA"], [/ (For|With|And) /g, " $1 "], [/\bBest Fastest\b/, "The Fastest"]];
  let seo = `Best ${titled(o.kw)}`;
  for (const [a, b] of FIX) seo = seo.replace(a, b);
  seo = seo.replace(/(\d+)__(tb|gb)/gi, (_, d, u) => d + u.toUpperCase()).replace(/ (For|With|And) /g, (m) => m.toLowerCase());
  if (seo.length > 43) seo = seo.replace(/ Gaming /, " ").replace(/ Monitors$/, "s").replace(/Monitors/, "Screens");
  if (seo.length > 43) { held.push(`${o.slug}\ttitle too long`); return ""; }
  const where = o.conds.map((c) => `(${c.code})`).join(" && ");
  return `  E(${q(o.slug)}, ${q(o.kw)}, ${q(o.g)}, (f) => ${where}, ${q(o.sort)}, ${q(seo)},\n    ${q(`${lead1} ${cap(every)}`)}, ${q(pk(CLOSE[o.g], o.slug + "c"))}),`;
}).filter(Boolean);
const head = `import type { Fact } from "@/lib/pc-compose/generic";
import type { PlanItem } from "./batch17-plan";

/**
 * Batch 24 keyword plan: topics taken from the DeskFinds keyword list (slugs only; no DeskFinds text, ratings or
 * picks are reused). Generated by scripts/_gen24.ts, which parses each slug into spec filters and holds any keyword
 * with a token no spec separates. Products come from this site's reviewed fact sheets.
 */
const s = (f: Fact, k: string) => String(f.specs[k] ?? "");
const n = (f: Fact, k: string) => (typeof f.specs[k] === "number" ? (f.specs[k] as number) : 0);
const t = (f: Fact) => \`\${f.name} \${f.short} \${f.notes.join(" ")} \${Object.values(f.specs).join(" ")}\`;
const p = (f: Fact) => Number(String(f.price ?? "").replace(/[^0-9.]/g, "")) || Infinity;
const size = (f: Fact) => Number(s(f, "size")) || 0;
const E = (slug: string, kw: string, g: PlanItem["g"], where: PlanItem["where"], sort: string, seo: string, lead: string, close: string): PlanItem => ({ slug, kw, g, where, sort, seo, lead, close });

export const PLAN: PlanItem[] = [
`;
fs.writeFileSync(outFile, head + lines.join("\n") + "\n];\n");
fs.writeFileSync(heldFile, held.join("\n"));
const by: Record<string, number> = {}; for (const o of out) by[o.g] = (by[o.g] ?? 0) + 1;
console.log("planned", lines.length, by, "held", held.length);
