import { headsetSchema } from "@/data/categories/headsets";
import { headsets13cFacts } from "@/data/categories/headsets13c";
import { webcam13eSchema } from "@/data/categories/creator13e";
import { speaker13eSchema } from "@/data/categories/audio13e";
import { speakers15bFacts, webcams15bFacts } from "@/data/categories/av15b";
import type { Entry } from "./batch12-lib";
import { factory } from "./batch13c-lib";

/** Batch 15b: guru sitemap 45 headset, webcam and speaker keywords, one article per keyword. Rank order is editorial. */

const hs = factory(headsetSchema, headsets13cFacts, "peripherals", {
  B0CXH14PPD: "The PlayStation version of Razer's BlackShark V2 X has the same 240g frame, 50mm TriForce drivers and HyperClear cardioid microphone as the PC model, and its 3.5mm plug works on a PC too. A cardioid mic picks up mostly what is in front of it, which helps in a noisy room.",
  B0DK6N6ZHJ: "Redragon's H888 is the only headset here with three connection modes: 2.4GHz, Bluetooth and a 3.5mm cable. At 168g it is also the lightest listed, and the microphone detaches when you only want headphones.",
  B08TBF4S42: "NUBWO's G06 offers up to 100 hours of battery across 2.4GHz and Bluetooth, the longest battery figure here. It is one of the cheapest ways to go wireless at the time of writing.",
  B0B8Q8P1FY: "SteelSeries's Arctis Nova 1 is the priciest headset here, and it comes from an established gaming-audio maker. It uses a noise-cancelling microphone and a 3.5mm plug that works across PC and consoles, with Tempest 3D audio support on PS5.",
  B0DBLHVGV7: "WIRWTRU's headset weighs 198g and lists ear pads designed for glasses wearers, a detail most budget listings skip. It uses 40mm drivers and a 3.5mm plug for PC and consoles.",
  B0FKTFMH2F: "NUBWO's HG04L pairs a cardioid boom microphone with a 250g frame and a 3.5mm plug. It was the lowest-priced headset here at the time of writing.",
});

const cam = factory(webcam13eSchema, webcams15bFacts, "peripherals", {
  B0CVYHHDLD: "Elgato's Facecam Neo streams 1080p at 60fps with HDR and needs no software to set up. A slide shutter covers the lens when you are off air.",
  B0FNBGBJ12: "Razer's Kiyo V2 Pro records 4K at 60fps from a Sony STARVIS 2 sensor, the top resolution and frame rate combination here. Razer Synapse exposes ISO, shutter, gain and field of view for manual control.",
  B0G63LXK6R: "OBSBOT's Tiny 3 Lite sits on a motorized gimbal that pans and tilts to follow you, and it reaches 1080p at 120fps, the highest frame rate listed here. It also records 4K at 30fps from a 1/2in sensor.",
  B0GCYZVCSD: "NexiGo's N680E Pro builds a ring light into the webcam, with three colour temperatures and a brightness dial. It streams 1080p at 60fps from a Sony 1/2.5in 4K sensor with phase-detect autofocus.",
  B0GXT9CXT1: "Acer's A640 records 4K at 30fps or 1080p at 60fps from a Sony 1/2.8in sensor with phase-detect autofocus. It was the lowest-priced webcam here at the time of writing.",
  B0BFJ4CRKD: "Logitech's MX Brio records 4K at 30fps or 1080p at 60fps and lets you set ISO, shutter speed, tint and vibrance in Logitech's software. A Show Mode tilts it down to film the desk.",
});

const sp = factory(speaker13eSchema, speakers15bFacts, "peripherals", {
  B08F57GSJ7: "Creative's Pebble V3 runs on a single USB-C cable for power and sound, with Bluetooth 5.0 and a 3.5mm input as alternatives. Its 2.25in drivers angle up at 45 degrees toward the listener, and a gain switch adds volume.",
  B0DXW25R3D: "Creative's Pebble Pro keeps the Pebble shape and adds BassFlex tuning, Bluetooth 5.3 and RGB lighting. Creative offers up to 10W RMS and 20W peak when powered from a suitable USB-C source.",
  B002HWRZ2K: "Logitech's Z313 is a simple 2.1 set: two satellites, a compact subwoofer and a control pod on the cable. Logitech offers 25W RMS in total.",
  B01LXDZ8WB: "Edifier's R980T is a wooden bookshelf pair with 24W RMS in total and a front bass port. Two AUX inputs, 3.5mm and RCA, can stay connected at the same time.",
  B06XGG6MFV: "Edifier's R1280DB adds Bluetooth, optical and coaxial inputs to Edifier's bookshelf design, with a 4in bass driver and a 13mm silk dome tweeter on each side. A remote and side knobs handle volume, bass and treble.",
  B000062VUO: "Klipsch's ProMedia 2.1 is THX certified and pairs horn-loaded satellites with a 6.5in side-firing subwoofer. Klipsch offers 200W peak, the highest figure here, and the control pod sets subwoofer level separately.",
});

export const batch15b: Entry[] = [
  hs({
    slug: "best-budget-gaming-headset", kw: "budget gaming headset",
    seo: "Best Budget Gaming Headsets", title: "The Best Budget Gaming Headsets Under $50",
    meta: "Six budget gaming headsets under $50 compared on microphone type, weight, connection and battery, including two wireless options.",
    dek: "Six gaming headsets under $50, including two wireless models, compared on microphone type, weight and connection.",
    teaser: "Check the microphone type and the connection first; under $50, those separate a useful headset from a noisy one.",
    intro: [
      "Under $50, most gaming headsets sound similar enough that the microphone, weight and connection decide which is worth buying. A cardioid microphone rejects more room noise than an omnidirectional one, and a lighter frame is easier to wear through a long session.",
      "We compared six headsets using the specifications in their Amazon listings and prices at the time of writing. We did not test them, and where a listing leaves out a figure such as driver size or battery life we say so.",
    ],
    bottom: [
      "The Razer BlackShark V2 X is the pick for a clear microphone, with a cardioid mic and 50mm drivers. The Redragon H888 is the most flexible, with 2.4GHz, Bluetooth and wired modes at the lightest weight, and the NUBWO G06 lists the longest battery life.",
      "The SteelSeries Arctis Nova 1 is the name-brand wired option, the WIRWTRU headset suits glasses wearers, and the NUBWO HG04L adds a cardioid mic at the lowest price here.",
    ],
    picks: [
      ["B0CXH14PPD", "Best Microphone", "a HyperClear cardioid microphone with 50mm TriForce drivers", "Voice chat in a noisy room."],
      ["B0DK6N6ZHJ", "Most Connection Modes", "2.4GHz, Bluetooth and 3.5mm wired modes with a detachable mic", "One headset for a PC, a phone and a console."],
      ["B08TBF4S42", "Longest Battery Life", "up to 100 hours of listed battery life over 2.4GHz and Bluetooth", "Wireless play without frequent charging."],
      ["B0B8Q8P1FY", "Best Name-Brand Wired", "a noise-cancelling microphone and a multi-system 3.5mm connection", "PC and console players who want an established brand."],
      ["B0DBLHVGV7", "Best for Glasses", "ear pads described as glasses-friendly on a 198g frame", "Glasses wearers on long sessions."],
      ["B0FKTFMH2F", "Lowest Price Here", "a cardioid boom microphone at the lowest price here", "The tightest budgets."],
    ],
    prio: ["mic", "connection", "weight"], related: ["best-gaming-headsets-under-50", "best-gaming-headsets-under-40", "best-cheap-gaming-headset"],
  }),
  cam({
    slug: "best-webcam-for-streaming", kw: "webcam for streaming",
    seo: "Best Webcams for Streaming", title: "The Best Webcams for Streaming",
    meta: "Six streaming webcams compared on resolution, frame rate, sensor, autofocus and lighting, from a 1080p60 Elgato to a 4K60 Razer.",
    dek: "Six streaming webcams, from Elgato's 1080p60 Facecam Neo to Razer's 4K60 Kiyo V2 Pro and an OBSBOT that tracks you on a gimbal.",
    teaser: "Check the frame rate before the resolution; most streams go out at 1080p, so 60fps matters more than 4K30 for smooth motion.",
    intro: [
      "Most streaming platforms deliver 1080p or lower, so a streaming webcam earns its place with smooth frame rates, reliable autofocus and good behaviour in a dim room rather than a 4K label. Each webcam here offers both its resolution and its frame rate.",
      "We researched these six from their Amazon listings and makers' specifications. We did not test them, and each pick's label names the feature that sets it apart.",
    ],
    bottom: [
      "The Elgato Facecam Neo is the straightforward 1080p60 pick with HDR and no software to install. The Razer Kiyo V2 Pro is the step up to 4K60 with full manual control, and the OBSBOT Tiny 3 Lite follows you on a gimbal and reaches 1080p at 120fps.",
      "The NexiGo N680E Pro solves poor lighting with a built-in ring light, the Acer A640 covers 4K30 and 1080p60 for the least money, and the Logitech MX Brio suits streamers who also take calls and want fine image controls.",
    ],
    picks: [
      ["B0CVYHHDLD", "Best 1080p60 Pick", "1080p at 60fps with HDR and no software needed", "New streamers who want a smooth image with no setup."],
      ["B0FNBGBJ12", "Best 4K60", "4K at 60fps from a Sony STARVIS 2 sensor with manual controls", "Streamers who crop, zoom or record in 4K."],
      ["B0G63LXK6R", "Best Tracking", "a motorized gimbal with AI tracking and 1080p at 120fps", "Streamers who move around, stand or demo products."],
      ["B0GCYZVCSD", "Best Built-In Light", "a ring light with three color temperatures and a brightness dial", "Dim rooms without a separate key light."],
      ["B0GXT9CXT1", "Best Budget 4K", "4K30 and 1080p60 with PDAF at the lowest price here", "Starting a stream on a small budget."],
      ["B0BFJ4CRKD", "Best Image Controls", "ISO, shutter, tint and vibrance controls with 4K30 and 1080p60", "Streamers who also run calls and want a consistent image."],
    ],
    prio: ["resolution", "focus", "sensor"], related: ["best-webcams-streaming", "best-4k-webcams", "best-streaming-gear-for-pc"],
  }),
  sp({
    slug: "best-pc-speakers", kw: "pc speakers",
    seo: "Best PC Speakers", title: "The Best PC Speakers for Your Desk",
    meta: "Six PC speakers compared on form, inputs, subwoofer and listed power, from USB-powered Creative Pebbles to a THX-certified Klipsch 2.1 set.",
    dek: "Six desktop speaker sets, from USB-powered Creative Pebbles to Edifier bookshelf pairs and a THX-certified Klipsch 2.1 system.",
    teaser: "Decide between USB-powered, bookshelf and 2.1 sets first; that choice sets the inputs, the desk space and how much bass you get.",
    intro: [
      "PC speakers fall into three groups: small USB-powered pairs that run from the computer, bookshelf pairs with their own power supply and more inputs, and 2.1 sets that add a subwoofer for bass. The right group depends on desk space and whether you also want to play music from a phone or TV.",
      "We compared six sets using the specifications in their Amazon listings. We did not test them, and we keep peak and RMS power figures separate because makers quote them differently.",
    ],
    bottom: [
      "The Creative Pebble V3 is the tidy choice for a small desk, running on one USB-C cable with Bluetooth as a bonus, and the Pebble Pro adds bass tuning and lighting. The Logitech Z313 is the low-cost way to get a subwoofer.",
      "For better sound from music and games, the Edifier R980T is a wooden bookshelf pair with two inputs, the Edifier R1280DB adds Bluetooth, optical and a remote, and the Klipsch ProMedia 2.1 is the pick for room-filling bass.",
    ],
    picks: [
      ["B08F57GSJ7", "Best Single-Cable Setup", "USB-C power and audio on one cable, with Bluetooth 5.0 and 3.5mm as alternatives", "Small desks and laptops docked at a monitor."],
      ["B0DXW25R3D", "Best Compact Bass", "BassFlex tuning with a 20W peak from USB-C power", "Compact desks that still want fuller bass."],
      ["B002HWRZ2K", "Best Budget 2.1", "a compact subwoofer and a wired control pod", "Adding bass on a tight budget."],
      ["B01LXDZ8WB", "Best Wired Bookshelf Pair", "wooden enclosures and two AUX inputs usable at the same time", "A PC and a second source on one pair of speakers."],
      ["B06XGG6MFV", "Most Inputs", "Bluetooth, optical, coaxial and AUX inputs with a remote", "Desks that share speakers between a PC, a phone and a TV."],
      ["B000062VUO", "Highest Listed Peak Power", "a 200W peak with a 6.5in side-firing subwoofer and THX certification", "Games and films at room-filling volume."],
    ],
    prio: ["form", "inputs", "sub"], related: ["best-speakers-for-gaming-pc", "best-gaming-speaker-bar", "best-streaming-gear-for-pc"],
  }),
];
