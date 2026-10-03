import speakerPool from "@/data/pcj-pool/speakers.json";
import micPool from "@/data/pcj-pool/microphones.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { str, withPool } from "./helpers";

/** Batch 13e speakers, soundbars and microphones. Wattage figures are as each listing states them. */
type Pool = Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const speaker13eSchema: CategorySchema = {
  id: "speakers-13e",
  plural: "Speakers",
  fields: [
    { key: "form", label: "Form", fmt: (v) => String(v) },
    { key: "peak", label: "Peak power", noun: "peak power", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v}W` },
    { key: "woofer", label: "Woofer size", noun: "woofer size", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v}-inch` },
    { key: "inputs", label: "Inputs", fmt: (v) => String(v) },
    { key: "sub", label: "Subwoofer", fmt: (v) => String(v), weakness: (v) => (/^none/i.test(String(v)) ? "No subwoofer, so deep bass comes only from the main drivers" : undefined) },
    { key: "extras", label: "Extras", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const i = str(f, "inputs");
    if (/^usb/i.test(i) && !/aux|3\.5|bluetooth|optical|hdmi/i.test(i)) s.push("It takes both power and audio over USB, so it needs a free USB port on the PC.");
    if (/hdmi|optical/i.test(i) && !/usb|3\.5|aux/i.test(i)) s.push("It connects by HDMI or optical, so a PC needs a graphics-card HDMI output routed as audio or a sound card with optical out; Bluetooth is the simpler route.");
    if (/bluetooth/i.test(i)) s.push("Bluetooth adds some delay, so use a wired input for games.");
    if (/usb power/i.test(i)) s.push("USB supplies power only; sound arrives over the 3.5mm cable.");
    return s;
  },
  criteria: [
    { id: "form", title: "Soundbar or stereo pair", body: "A soundbar sits under a monitor and saves desk width. A stereo pair spreads the sound wider and usually fills a room better at the same price." },
    { id: "inputs", title: "Inputs your PC has", body: "USB speakers need no sound card; 3.5mm works with any PC; Bluetooth frees cables but adds delay; HDMI and optical suit TVs more than desktops." },
    { id: "sub", title: "Do you need a subwoofer", body: "A separate or down-firing subwoofer adds low bass for films and games. In a flat or shared room, a 2.0 set may be the better neighbor." },
    { id: "watts", title: "Read wattage carefully", body: "Peak figures are much higher than RMS (continuous) figures, and brands mix them. Compare like with like, and treat wattage as a rough guide rather than a measure of quality." },
    { id: "size", title: "Measure the desk", body: "Check the width of a soundbar against the monitor stand, and the depth of stereo speakers against the desk edge." },
    { id: "controls", title: "Controls within reach", body: "A front volume knob or a wired control pod saves reaching behind the PC. Some sets rely on software or a remote." },
  ],
  faq: [
    { id: "tv-bar", q: "Can I use a TV soundbar with a PC?", a: "Yes, over Bluetooth, optical or HDMI where the PC supports it. A desktop soundbar with USB or 3.5mm input is simpler at a desk." },
    { id: "rgb", q: "Does RGB lighting affect sound?", a: "No. Lighting is cosmetic; some sets let you turn it off." },
    { id: "latency", q: "Is Bluetooth fine for games?", a: "For casual play it is usable, but it adds delay. A wired input avoids that." },
    { id: "surround", q: "Do virtual surround modes work on PC?", a: "Some need the brand's software or Windows spatial sound settings. Support can differ between Windows and macOS." },
    { id: "headphones", q: "Can I plug headphones into the speakers?", a: "Only if the maker specifies a headphone output. Otherwise, use the PC's own jack." },
    { id: "placement", q: "Where should desk speakers go?", a: "Place stereo speakers either side of the monitor at ear height, angled toward you. Keep a soundbar centered below the screen." },
  ],
  evaluated: [
    { title: "Form and size", description: "We recorded whether each is a soundbar, a stereo pair or a 2.1 set." },
    { title: "Inputs", description: "We checked USB, 3.5mm, Bluetooth, optical and HDMI support." },
    { title: "Power figures", description: "We noted peak and RMS figures, without comparing unlike figures." },
    { title: "Extras", description: "We checked subwoofers, lighting, remotes and headphone outputs." },
  ],
};

export const speaker13eFacts = withPool(speakerPool as Pool, [
  F("B0BCCCNHD8", "Razer Leviathan V2 X PC Soundbar", "Leviathan V2 X", { form: "Desktop soundbar", inputs: "USB-C (power and audio), Bluetooth 5.0", sub: "Two passive radiators", extras: "14 Chroma RGB zones" }, ["two drivers with two passive radiators", "power and audio over one USB-C cable", "a 90dB maximum volume"]),
  F("B09VX86JR6", "Razer Leviathan V2 PC Soundbar with Subwoofer", "Leviathan V2", { form: "Desktop soundbar with subwoofer", inputs: "USB, Bluetooth 5.2", sub: "Down-firing subwoofer", extras: "THX Spatial Audio, 18 RGB zones" }, ["a down-firing subwoofer", "THX Spatial Audio 7.1 virtual surround", "18 Chroma RGB zones"]),
  F("B0CTHBSG6X", "Creative Sound Blaster GS3 Soundbar", "GS3", { form: "Desktop soundbar", peak: 24, inputs: "USB-C, AUX, Bluetooth 5.4", sub: "None", extras: "Headphone output" }, ["a headphone output", "Bluetooth 5.4", "three inputs in a compact bar"]),
  F("B08X6LYPHK", "Redragon GS560 PC Soundbar", "GS560", { form: "Desktop soundbar", inputs: "USB power, 3.5mm audio", sub: "None", extras: "4 lighting modes, volume knob" }, ["a roughly 16in body that fits under most monitors", "a front volume knob", "four lighting modes"]),
  F("B0H2JG26Y2", "Philips Portable Bluetooth Soundbar", "Philips soundbar", { form: "Portable soundbar", peak: 14, inputs: "Bluetooth 5.4", sub: "None", extras: "12-hour battery, built-in mic" }, ["a 12-hour battery", "a built-in microphone for calls", "7W RMS output"]),
  F("B0F5Q1ZJ6C", "Edifier Hecate Gaming Speakers", "Hecate", { form: "Stereo pair", peak: 32, inputs: "USB, AUX, Bluetooth 5.1", sub: "None", extras: "12 RGB effects, 10-degree tilt" }, ["2.75in drivers", "a 10-degree upward tilt", "12 RGB effects"]),
  F("B07B2WLS17", "Logitech G560 LIGHTSYNC PC Gaming Speakers", "G560", { form: "2.1 with subwoofer", peak: 240, inputs: "USB, 3.5mm, Bluetooth", sub: "Separate subwoofer", extras: "DTS:X 2.0, 4 lighting zones" }, ["DTS:X virtual surround on Windows", "four game-driven lighting zones", "a separate subwoofer"]),
  F("B00UAFSN5O", "Edifier G2000 Gaming Speakers", "G2000", { form: "Stereo pair", peak: 32, inputs: "USB, AUX, Bluetooth", sub: "None", extras: "12 RGB effects" }, ["16W RMS output", "three inputs", "12 RGB effects"]),
  F("B0877BPCJM", "Logitech Z407 2.1 Bluetooth Speakers with Subwoofer", "Z407", { form: "2.1 with subwoofer", peak: 80, inputs: "USB, 3.5mm, Bluetooth", sub: "Separate subwoofer", extras: "Wireless control dial" }, ["a wireless control dial with a 30m range", "40W RMS output", "three inputs"]),
  F("B0CT8WJJHD", "Creative Pebble X Plus 2.1 Speakers", "Pebble X Plus", { form: "2.1 with subwoofer", peak: 30, inputs: "USB-C, AUX, Bluetooth 5.3", sub: "Separate subwoofer", extras: "RGB" }, ["15W RMS by default and 30W RMS with a 30W+ USB-C PD adapter", "a compact 2.1 layout", "Bluetooth 5.3"]),
  F("B08GK9LCRW", "Redragon GS520 PC Speakers", "GS520", { form: "Stereo pair", inputs: "USB power, 3.5mm audio", sub: "None", extras: "6 touch RGB modes" }, ["six touch-controlled RGB modes", "USB power", "a low price tier"]),
  // JBL soundbars
  F("B0BQQ2RD1C", "JBL Bar 2.1 Deep Bass MK2", "Bar 2.1 MK2", { form: "2.1 soundbar", peak: 300, inputs: "HDMI ARC, optical, Bluetooth", sub: "6.5in wireless subwoofer", extras: "Dolby Digital" }, ["a 6.5in wireless subwoofer", "Dolby Digital decoding", "the lowest price tier among JBL bars here"]),
  F("B0FHBVS6GC", "JBL Bar 500MK2 5.1 Soundbar", "Bar 500MK2", { form: "5.1 soundbar", peak: 750, inputs: "HDMI eARC, optical, Bluetooth, Wi-Fi", sub: "10in wireless subwoofer", extras: "Dolby Atmos, MultiBeam 3.0" }, ["Dolby Atmos with MultiBeam 3.0", "PureVoice 2.0 dialogue tuning", "HDMI eARC"]),
  F("B0FJRM9GKQ", "JBL Bar 700MK2 Soundbar with Detachable Surrounds", "Bar 700MK2", { form: "7.1 soundbar", peak: 780, inputs: "HDMI eARC, optical, Bluetooth, Wi-Fi", sub: "10in wireless subwoofer", extras: "Detachable surrounds, Dolby Atmos, DTS Virtual:X" }, ["detachable wireless surround speakers", "Dolby Atmos and DTS Virtual:X", "a 10in subwoofer"]),
  F("B0FHBKBMRZ", "JBL Bar 1000MK2 7.1.4 Soundbar", "Bar 1000MK2", { form: "7.1.4 soundbar", inputs: "HDMI eARC, optical, Bluetooth, Wi-Fi", sub: "10in wireless subwoofer", extras: "Detachable surrounds, Dolby Atmos, DTS:X" }, ["a 7.1.4 channel layout with up-firing drivers", "detachable surrounds", "480W RMS output"]),
  F("B0CLMCK8SN", "JBL Bar 800 5.1.2 Soundbar", "Bar 800", { form: "5.1.2 soundbar", peak: 720, inputs: "HDMI eARC, optical, Bluetooth, Wi-Fi", sub: "10in wireless subwoofer", extras: "AirPlay, Chromecast" }, ["AirPlay and Chromecast built in", "a 5.1.2 layout", "a 10in subwoofer"]),
  F("B0FN1JLNCN", "JBL Bar 1300XMK2 11.1.4 Soundbar", "Bar 1300XMK2", { form: "11.1.4 soundbar", peak: 1570, inputs: "HDMI eARC, optical, Bluetooth, Wi-Fi", sub: "12in wireless subwoofer", extras: "Detachable surrounds, Dolby Atmos" }, ["an 11.1.4 channel layout", "a 12in subwoofer", "the highest rated power of the JBL bars here"]),
]);

export const mic13eSchema: CategorySchema = {
  id: "microphones-13e",
  plural: "Microphones",
  fields: [
    { key: "conn", label: "Connection", fmt: (v) => String(v) },
    { key: "capsule", label: "Capsule", fmt: (v) => String(v) },
    { key: "pattern", label: "Polar pattern", fmt: (v) => String(v) },
    { key: "mute", label: "Mute control", fmt: (v) => String(v), weakness: (v) => (/none/i.test(String(v)) ? "no onboard mute" : undefined) },
    { key: "monitor", label: "Headphone monitoring", fmt: (v) => String(v) },
    { key: "mount", label: "In the box", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    const c = str(f, "conn");
    if (/^xlr/i.test(c)) s.push("XLR-only: it needs an audio interface or mixer, plus an XLR cable if one is not included.");
    else if (/xlr/i.test(c)) s.push("It works over USB now and can move to an XLR interface later; an XLR cable may not be included.");
    else s.push("It plugs straight into a USB port and needs no interface.");
    if (/dynamic/i.test(str(f, "capsule")) && /^xlr/i.test(c)) s.push("Low-output dynamic mics may need a high-gain interface or an inline booster.");
    if (/condenser/i.test(str(f, "capsule")) && /^xlr/i.test(c)) s.push("As a condenser it needs 48V phantom power from the interface.");
    return s;
  },
  criteria: [
    { id: "usb-xlr", title: "USB or XLR", body: "USB mics plug straight into the PC. XLR mics need an interface but let you upgrade parts separately. Hybrid mics offer both." },
    { id: "dynamic-condenser", title: "Dynamic or condenser", body: "Dynamic mics pick up less room noise and keyboard clatter, which suits untreated rooms. Condensers capture more detail and more of the room." },
    { id: "pattern", title: "Polar pattern", body: "Cardioid rejects sound from behind and suits one voice. Multi-pattern mics add omni or figure-8 for groups or interviews." },
    { id: "mute", title: "Mute and monitoring", body: "Tap-to-mute and a headphone jack for zero-latency monitoring matter on streams and calls." },
    { id: "mounting", title: "Stand, arm and shock mount", body: "A desk stand picks up bumps. A boom arm and shock mount put the mic closer to your mouth and away from the keyboard." },
    { id: "software", title: "Software and processing", body: "Some mics offer noise reduction, auto gain or limiters in software. Check it runs on your operating system." },
  ],
  faq: [
    { id: "headset", q: "Is a separate mic better than a headset mic?", a: "Usually, yes: a desk mic has a larger capsule and sits in a fixed position. Placement still matters more than price." },
    { id: "keyboard", q: "How do I reduce keyboard noise?", a: "Use a dynamic or cardioid mic, position it close to your mouth and pointed away from the keyboard, and consider a boom arm." },
    { id: "pop", q: "Do I need a pop filter?", a: "It helps with plosive sounds such as P and B. Many mics include a foam cover or internal filter." },
    { id: "interface", q: "What interface do I need for XLR?", a: "Any USB audio interface with an XLR input and enough gain. Condensers also need 48V phantom power." },
    { id: "console", q: "Do USB mics work on consoles?", a: "Some do; check the product page for PS4, PS5 or Xbox support." },
    { id: "distance", q: "How far should I sit from the mic?", a: "About a hand's width to 15cm for most voice mics; dynamic mics often want to be closer." },
  ],
  evaluated: [
    { title: "Connection", description: "We recorded USB, XLR or hybrid connections." },
    { title: "Capsule and pattern", description: "We noted dynamic or condenser capsules and polar patterns." },
    { title: "Controls", description: "We checked mute, gain and headphone monitoring." },
    { title: "Mounting", description: "We noted stands, arms, shock mounts and pop filters in the box." },
  ],
};

export const mic13eFacts = withPool(micPool as Pool, [
  F("B09JG62KDJ", "FIFINE A6V USB Gaming Microphone", "FIFINE A6V", { conn: "USB", capsule: "Condenser", pattern: "Cardioid", mute: "Mute button (RGB off when muted)", monitor: "None stated", mount: "Tripod, shock mount, pop filter" }, ["192kHz sampling", "a gain knob", "an RGB ring that turns off when muted"]),
  F("B0CSYQ7XJW", "FDUCE M160 USB Gaming Microphone", "FDUCE M160", { conn: "USB (USB-C adapter)", capsule: "Condenser", pattern: "Cardioid", mute: "Button", monitor: "Headphone jack", mount: "Tripod" }, ["a headphone monitoring jack", "an included USB-C adapter", "RGB lighting"]),
  F("B0CCV74CL7", "TONOR TC310+ USB Microphone Kit", "TONOR TC310+", { conn: "USB", capsule: "Condenser", pattern: "Cardioid", mute: "Tap", monitor: "None stated", mount: "Boom arm kit" }, ["a boom arm in the box", "tap-to-mute", "four RGB modes"]),
  F("B0CL9BTQRF", "Amazon Basics USB Condenser Microphone", "Amazon Basics mic", { conn: "USB", capsule: "Condenser (14mm)", pattern: "Cardioid", mute: "One-tap", monitor: "None stated", mount: "Stand with shock absorber" }, ["a 14mm diaphragm", "one-tap mute", "a shock absorber"]),
  F("B0BNPJKM79", "MRSDY USB Gaming Microphone", "MRSDY", { conn: "USB", capsule: "Condenser", pattern: "Cardioid", mute: "Button", monitor: "3.5mm jack", mount: "Stand" }, ["noise reduction", "a gain control", "a 3.5mm monitoring jack"]),
  F("B0C46CS37H", "MAONO DGM20S USB Gaming Microphone Kit", "MAONO DGM20S", { conn: "USB", capsule: "Condenser", pattern: "Cardioid", mute: "Button", monitor: "None stated", mount: "Boom arm, shock mount, pop filter" }, ["a boom arm, shock mount and pop filter", "noise reduction", "a gain knob"]),
  F("B06XCKGLTP", "FIFINE K669B USB Microphone", "FIFINE K669B", { conn: "USB (USB-A plug)", capsule: "Condenser", pattern: "Cardioid", mute: "None", monitor: "None stated", mount: "Tripod" }, ["a metal body", "a volume knob", "a 5.9ft cable"]),
  F("B0BMFQP2ZZ", "FIFINE AmpliGame AM8 USB/XLR Dynamic Microphone", "FIFINE AM8", { conn: "USB and XLR", capsule: "Dynamic", pattern: "Cardioid", mute: "Button", monitor: "Headphone jack", mount: "Stand" }, ["a 50Hz to 16kHz response", "an XLR output for later upgrades (XLR cable not included)", "RGB lighting"]),
  F("B0D9MCK4R8", "HyperX QuadCast 2 USB Microphone", "QuadCast 2", { conn: "USB", capsule: "Condenser", pattern: "Multi-pattern", mute: "Tap", monitor: "Headphone jack", mount: "Stand with shock mount" }, ["a 20Hz to 20kHz response", "a 9.84ft cable", "an internal shock mount"]),
  F("B00N1YPXW2", "Logitech G Blue Yeti USB Microphone", "Blue Yeti", { conn: "USB", capsule: "Condenser (three capsules)", pattern: "Cardioid, omni, bidirectional, stereo", mute: "Button", monitor: "Headphone jack", mount: "Desk stand" }, ["four polar patterns", "onboard gain and mute controls", "Blue VO!CE processing in G HUB"]),
  F("B0FLKJ7FH7", "HyperX SoloCast 2 USB Microphone", "SoloCast 2", { conn: "USB", capsule: "Condenser", pattern: "Cardioid", mute: "Tap", monitor: "None stated", mount: "Stand with built-in suspension" }, ["built-in suspension", "a foam pop filter", "3/8in and 5/8in threads for arms"]),
  F("B0CVYHHPX6", "Elgato Wave Neo USB Microphone", "Wave Neo", { conn: "USB", capsule: "Condenser", pattern: "Cardioid", mute: "Tap", monitor: "Headphone jack", mount: "High-rise stand" }, ["a high-rise stand that lifts it toward your mouth", "tap-to-mute", "a headphone jack"]),
  F("B0GGYLFHPS", "Elgato Wave:3 MK.2 USB Microphone", "Wave:3 MK.2", { conn: "USB-C", capsule: "Condenser", pattern: "Cardioid", mute: "Capacitive", monitor: "Headphone jack", mount: "Desk stand" }, ["Clipguard 2.0 anti-distortion", "automatic gain", "onboard DSP"]),
  F("B0BQM4TKF7", "RODE PodMic USB", "PodMic USB", { conn: "USB-C and XLR", capsule: "Dynamic", pattern: "Cardioid", mute: "None", monitor: "Headphone jack", mount: "Swing mount" }, ["APHEX processing onboard", "both USB-C and XLR outputs", "a headphone jack"]),
  F("B0CMZDPST3", "Audio-Technica AT2020USB-X with Boom Arm", "AT2020USB-X", { conn: "USB-C", capsule: "Condenser", pattern: "Cardioid", mute: "Capacitive touch", monitor: "Headphone jack", mount: "Boom arm" }, ["24-bit/96kHz recording", "capacitive touch mute", "a boom arm in the bundle"]),
  F("B07QLNYBG9", "Logitech G Yeti Nano USB Microphone", "Yeti Nano", { conn: "USB", capsule: "Condenser (two capsules)", pattern: "Cardioid, omni", mute: "Button", monitor: "Headphone jack", mount: "Desk stand" }, ["two capsules", "cardioid and omni patterns", "a smaller body than the Yeti"]),
  F("B0DG9X4WHW", "HyperX QuadCast 2 S USB Microphone", "QuadCast 2 S", { conn: "USB", capsule: "Condenser", pattern: "Multi-pattern (4)", mute: "Tap", monitor: "Headphone jack", mount: "Stand with shock mount" }, ["more than 100 addressable RGB LEDs", "four polar patterns", "a multifunction knob"]),
  F("B0CTJ7PVN1", "Shure MV7+ Podcast Microphone", "MV7+", { conn: "USB-C and XLR", capsule: "Dynamic", pattern: "Cardioid", mute: "Touch panel", monitor: "Headphone jack", mount: "Yoke" }, ["an LED touch panel", "auto level and a digital denoiser", "both USB-C and XLR outputs"]),
  F("B0002E4Z8M", "Shure SM7B Dynamic Vocal Microphone", "SM7B", { conn: "XLR", capsule: "Dynamic", pattern: "Cardioid", mute: "None", monitor: "Via interface", mount: "Yoke" }, ["air suspension shock isolation", "a close-talk windscreen", "shielding against hum from monitors"]),
  F("B000CZ0R42", "Shure SM58 Vocal Microphone", "SM58", { conn: "XLR", capsule: "Dynamic", pattern: "Cardioid", mute: "None", monitor: "Via interface", mount: "Stand adapter" }, ["a built-in spherical pop filter", "a metal build", "a cardioid pattern that rejects sound from behind"]),
  F("B07MSCRCVK", "RODE PodMic XLR Dynamic Microphone", "PodMic", { conn: "XLR", capsule: "Dynamic", pattern: "Cardioid", mute: "None", monitor: "Via interface", mount: "Swing mount" }, ["an internal pop filter", "an integrated swing mount", "a design built for broadcast voice"]),
  F("B0006H92QK", "Audio-Technica AT2020 Condenser Microphone", "AT2020", { conn: "XLR", capsule: "Condenser", pattern: "Cardioid", mute: "None", monitor: "Via interface", mount: "Stand mount" }, ["high SPL handling", "a cardioid pattern", "a studio condenser design"]),
  F("B0B8GRCXB6", "Elgato Wave DX Dynamic Microphone", "Wave DX", { conn: "XLR", capsule: "Dynamic", pattern: "Cardioid", mute: "None", monitor: "Via interface", mount: "5/8in mount with adapters" }, ["enough output that Elgato says no booster is needed", "a 5/8in mount with adapters", "a design for speech"]),
  F("B09BZZCGC8", "Shure MV7X XLR Podcast Microphone", "MV7X", { conn: "XLR", capsule: "Dynamic", pattern: "Cardioid", mute: "None", monitor: "Via interface", mount: "Yoke with integrated shock mount" }, ["the MV7 shape in an XLR-only version", "an integrated shock mount", "a yoke mount"]),
  F("B0CKVD62NX", "RODE NT1 Signature Series Condenser Microphone", "NT1 Signature", { conn: "XLR", capsule: "Condenser", pattern: "Cardioid", mute: "None", monitor: "Via interface", mount: "Shock mount, pop filter, cable" }, ["very low self-noise", "a shock mount and pop filter included", "an XLR cable in the box"]),
  F("B074HZFG3P", "NEEWER NW-040 Dynamic Microphone", "NW-040", { conn: "XLR", capsule: "Dynamic", pattern: "Cardioid", mute: "None", monitor: "Via interface", mount: "Clip, XLR cable" }, ["an aluminum body", "an included XLR cable", "a low price tier"]),
  F("B076WWQ4WT", "Sennheiser XS 1 Dynamic Microphone", "XS 1", { conn: "XLR", capsule: "Dynamic", pattern: "Cardioid", mute: "On/off switch", monitor: "Via interface", mount: "Clip, pouch" }, ["an on/off switch", "a carry pouch", "a dynamic capsule for vocals"]),
]);
