import type { Fact } from "@/lib/pc-compose/generic";
import { keyboardSchema, mouseSchema } from "@/data/categories/peripherals";
import { workKeyboardSchema, workMouseSchema } from "@/data/categories/input";
import { headsetSchema } from "@/data/categories/headsets";
import { headsets13cFacts } from "@/data/categories/headsets13c";
import { keyboards13cFacts } from "@/data/categories/keyboards13c";
import { quietKeyboards15aFacts, verticalMice15aFacts } from "@/data/categories/input15a";
import { btKeyboards16aFacts, ergoMice16aFacts, razerWireless16aFacts } from "@/data/categories/misc16a";
import { comboSchema, combo13eFacts } from "@/data/categories/combos13e";
import { chairSchema } from "@/data/categories/chairs13d";
import { chairs15cFacts } from "@/data/categories/chairs15c";
import { padSchema, pad13dFacts } from "@/data/categories/mousepads13d";
import { armSchema, arm13dFacts, riserSchema, riser13dFacts } from "@/data/categories/arms13d";
import { floorMatSchema, floorMat13dFacts } from "@/data/categories/desk13d";
import { monitorSchema } from "@/data/categories/monitors";
import { monitors15eFacts } from "@/data/categories/monitors15e";
import { storage13eSchema } from "@/data/categories/storage13e";
import { storage15dFacts } from "@/data/categories/storage15d";
import { speaker13eSchema } from "@/data/categories/audio13e";
import { webcam13eSchema, stream13eSchema, stream13eFacts } from "@/data/categories/creator13e";
import { speakers15bFacts, webcams15bFacts } from "@/data/categories/av15b";
import { gpuRangeSchema, gpuFacts } from "@/data/categories/gpu";
import { gpuExtFacts } from "@/data/categories/gpu-ext";
import { cpuSchema, cpuFacts } from "@/data/categories/cpu";
import { mbxSchema, mbxFacts, ramxSchema, ramxFacts, ssdxSchema, ssdxFacts } from "@/data/categories/platform-ext";
import { prebuiltSchema, prebuiltFacts } from "@/data/categories/prebuilt";
import type { Group } from "./batch17-lib";

/** Fact groups for the batch 17 pipeline: each pairs a schema with the reviewed facts older guides already use. */
const only = (facts: Record<string, Fact>, keep: (f: Fact) => boolean) => Object.fromEntries(Object.entries(facts).filter(([, f]) => keep(f)));

export const GROUPS = {
  gmouse: { schema: mouseSchema, facts: razerWireless16aFacts, category: "peripherals", noun: "gaming mice", related: ["best-gaming-mouse", "best-wireless-gaming-mice", "best-fps-gaming-mouse"] },
  wmouse: { schema: workMouseSchema, facts: { ...verticalMice15aFacts, ...ergoMice16aFacts }, category: "peripherals", noun: "mice", related: ["best-mouse-for-work", "best-bluetooth-wireless-mouse", "best-vertical-ergonomic-mouse"] },
  gkb: { schema: keyboardSchema, facts: quietKeyboards15aFacts, category: "peripherals", noun: "keyboards", related: ["best-gaming-keyboard", "best-quiet-gaming-keyboard", "best-tkl-keyboards"] },
  wkb: { schema: workKeyboardSchema, facts: only(btKeyboards16aFacts, (f) => !(f.asin in keyboards13cFacts)), category: "peripherals", noun: "keyboards", related: ["best-keyboards-for-work", "best-compact-wireless-keyboard", "best-wireless-keyboard-with-touchpad"] },
  combo: { schema: comboSchema, facts: combo13eFacts, category: "peripherals", noun: "keyboard and mouse combos", related: ["best-gaming-keyboard-mouse-combos", "best-silent-wireless-mouse-keyboard-combos", "best-dell-wireless-keyboard-and-mouse"] },
  headset: { schema: headsetSchema, facts: headsets13cFacts, category: "peripherals", noun: "headsets", related: ["best-gaming-headset", "best-wireless-gaming-headset", "best-budget-gaming-headset"] },
  chair: { schema: chairSchema, facts: only(chairs15cFacts, (f) => !f.specs.ages && !/kid|teen|child|youth/i.test(f.name)), category: "peripherals", noun: "chairs", related: ["best-office-chair-for-lower-back-pain", "best-gaming-chair", "best-ergo-chair-for-gaming"] },
  pad: { schema: padSchema, facts: pad13dFacts, category: "peripherals", noun: "mouse pads", related: ["best-gaming-mousepad", "best-desk-mats-for-gaming", "best-big-mouse-pad"] },
  arm: { schema: armSchema, facts: arm13dFacts, category: "peripherals", noun: "monitor arms", related: ["best-monitor-arm", "best-dual-monitor-arms", "best-monitor-arms-for-desk"] },
  riser: { schema: riserSchema, facts: riser13dFacts, category: "peripherals", noun: "monitor stands", related: ["best-monitor-stand-riser", "best-computer-stand-for-desk", "best-monitor-arm"] },
  floormat: { schema: floorMatSchema, facts: floorMat13dFacts, category: "peripherals", noun: "chair mats", related: ["best-floor-mat-for-office-chair", "best-office-chair-for-lower-back-pain", "best-gaming-chair"] },
  monitor: { schema: monitorSchema, facts: monitors15eFacts, category: "monitors", noun: "monitors", related: ["best-gaming-monitor", "best-1440p-gaming-monitor", "best-oled-gaming-monitors"] },
  storage: { schema: storage13eSchema, facts: storage15dFacts, category: "peripherals", noun: "external drives", related: ["best-external-ssd", "best-portable-ssd-drive", "best-external-storage-for-laptop"] },
  speaker: { schema: speaker13eSchema, facts: speakers15bFacts, category: "peripherals", noun: "speakers", related: ["best-pc-speakers", "best-speakers-for-gaming-pc", "best-gaming-speaker-bar"] },
  webcam: { schema: webcam13eSchema, facts: webcams15bFacts, category: "peripherals", noun: "webcams", related: ["best-webcam-for-streaming", "best-4k-webcams", "best-webcams-streaming"] },
  stream: { schema: stream13eSchema, facts: stream13eFacts, category: "peripherals", noun: "streaming devices", related: ["best-streaming-gear-for-pc", "best-webcam-for-streaming", "best-streaming-gear-for-gaming"] },
  gpu: { schema: gpuRangeSchema, facts: { ...gpuFacts, ...gpuExtFacts }, category: "components", noun: "graphics cards", related: ["best-graphics-cards", "best-graphics-cards-for-1440p", "best-budget-graphics-cards"] },
  cpu: { schema: cpuSchema, facts: cpuFacts, category: "components", noun: "processors", related: ["best-cpus-for-gaming", "best-amd-cpus-for-gaming", "best-budget-cpus"] },
  mb: { schema: mbxSchema, facts: mbxFacts, category: "components", noun: "motherboards", related: ["best-motherboards-for-ryzen-7-9800x3d", "best-am5-motherboards", "best-b850-motherboards"] },
  ram: { schema: ramxSchema, facts: ramxFacts, category: "components", noun: "memory kits", related: ["best-ram-for-gaming", "best-ddr5-ram", "best-ddr4-ram"] },
  ssd: { schema: ssdxSchema, facts: ssdxFacts, category: "components", noun: "SSDs", related: ["best-ssds-for-gaming", "best-ssds", "best-2tb-gen4-ssds"] },
  prebuilt: { schema: prebuiltSchema, facts: prebuiltFacts, category: "pc-builds", noun: "gaming PCs", related: ["best-prebuilt-gaming-pcs", "best-prebuilt-gaming-pcs-under-1000", "best-mini-pcs-for-gaming"] },
} satisfies Record<string, Group>;

export type GroupId = keyof typeof GROUPS;
