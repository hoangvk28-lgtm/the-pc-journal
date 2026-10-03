import type { Fact } from "@/lib/pc-compose/generic";
import { keyboardSchema, mouseSchema } from "@/data/categories/peripherals";
import { workKeyboardSchema, workMouseSchema } from "@/data/categories/input";
import { headsetSchema } from "@/data/categories/headsets";
import { headsets13cFacts } from "@/data/categories/headsets13c";
import { expand28HeadsetFacts } from "@/data/categories/expand28-headset";
import { keyboards13cFacts } from "@/data/categories/keyboards13c";
import { quietKeyboards15aFacts, verticalMice15aFacts } from "@/data/categories/input15a";
import { expand28KeyboardFacts } from "@/data/categories/expand28-keyboard";
import { btKeyboards16aFacts, ergoMice16aFacts, razerWireless16aFacts } from "@/data/categories/misc16a";
import { comboSchema, combo13eFacts } from "@/data/categories/combos13e";
import { chairSchema } from "@/data/categories/chairs13d";
import { chairs15cFacts } from "@/data/categories/chairs15c";
import { expand28ChairFacts } from "@/data/categories/expand28-chair";
import { padSchema, pad13dFacts } from "@/data/categories/mousepads13d";
import { armSchema, arm13dFacts, riserSchema, riser13dFacts } from "@/data/categories/arms13d";
import { floorMatSchema, floorMat13dFacts } from "@/data/categories/desk13d";
import { monitorSchema } from "@/data/categories/monitors";
import { monitors15eFacts } from "@/data/categories/monitors15e";
import { expand28MonitorFacts } from "@/data/categories/expand28-monitor";
import { storage13eSchema } from "@/data/categories/storage13e";
import { storage15dFacts } from "@/data/categories/storage15d";
import { expand28StorageFacts } from "@/data/categories/expand28-storage";
import { speaker13eSchema } from "@/data/categories/audio13e";
import { webcam13eSchema, stream13eSchema, stream13eFacts } from "@/data/categories/creator13e";
import { speakers15bFacts, webcams15bFacts } from "@/data/categories/av15b";
import { gpuRangeSchema, gpuFacts } from "@/data/categories/gpu";
import { gpuExtFacts } from "@/data/categories/gpu-ext";
import { expand28GpuFacts } from "@/data/categories/expand28-gpu";
import { cpuSchema, cpuFacts } from "@/data/categories/cpu";
import { expand28CpuFacts } from "@/data/categories/expand28-cpu";
import { mbxSchema, mbxFacts, ramxSchema, ramxFacts, ssdxSchema, ssdxFacts } from "@/data/categories/platform-ext";
import { prebuiltSchema, prebuiltFacts } from "@/data/categories/prebuilt";
import { caseSchema } from "@/data/categories/cases";
import { caseExtFacts } from "@/data/categories/cases-ext";
import { fanSchema, fanFacts } from "@/data/categories/fans";
import { fans31Facts } from "@/data/categories/fans31";
import { mic13eFacts } from "@/data/categories/audio13e";
import { mic16aSchema } from "@/data/categories/misc16a";
import { stream18Facts } from "@/data/categories/stream18";
import { webcams18Facts, fans18Facts, ssd18Facts, cases18Facts, arms18Facts, planar18Facts, chairs18Facts } from "@/data/categories/misc18";
import { airSchema, airFacts, aioSchema, aioFacts, pasteSchema, pasteFacts } from "@/data/categories/cooling";
import { psuGenericSchema, psuGenericFacts } from "@/data/categories/psu-generic";
import { paste20Facts } from "@/data/categories/paste20";
import { air20Facts, cases20Facts, speakers20Facts } from "@/data/categories/misc20";
import { expand28SsdFacts } from "@/data/categories/expand28-ssd";
import { fill34SsdFacts } from "@/data/categories/fill34-ssd";
import { fill34StorageFacts } from "@/data/categories/fill34-storage";
import { fill34SpeakerFacts } from "@/data/categories/fill34-speaker";
import { fill34MonitorFacts } from "@/data/categories/fill34-monitor";
import { fill34WorkMouseFacts } from "@/data/categories/fill34-mouse";
import { fill34GpuFacts } from "@/data/categories/fill34-gpu";
import { expand28GamingMouseFacts, expand28WorkMouseFacts } from "@/data/categories/expand28-mouse";
import { expand28WebcamFacts } from "@/data/categories/expand28-webcam";
import { expand28PadFacts } from "@/data/categories/expand28-pad";
import { expand28CaseFacts } from "@/data/categories/expand28-case";
import { expand28SpeakerFacts } from "@/data/categories/expand28-speaker";
import type { Group } from "./batch17-lib";

/** Fact groups for the batch 17 pipeline: each pairs a schema with the reviewed facts older guides already use. */
const only = (facts: Record<string, Fact>, keep: (f: Fact) => boolean) => Object.fromEntries(Object.entries(facts).filter(([, f]) => keep(f)));

/** Radiator-fan variant of the case-fan schema: static pressure leads the ranking and carries the rule label. */
const pressureField = fanSchema.fields.find((f) => f.key === "pressure")!;
const fanRadSchema: typeof fanSchema = {
  ...fanSchema, id: "radiator-fan", plural: "Radiator Fans",
  fields: [
    { ...pressureField, rule: { label: "Highest Static Pressure", bestFor: ["Dense radiators and fine dust filters.", "Radiators where air has to push through tight fins."] } },
    ...fanSchema.fields.filter((f) => f.key !== "pressure").map((f) => (f.key === "cfm" ? { ...f, rule: undefined } : f)),
  ],
};

/** 140mm variant of the case-fan schema: the shared compatibility text names 140mm mounts instead of 120mm. */
const fan140Schema: typeof fanSchema = {
  ...fanSchema, id: "case-fan-140", plural: "140mm Case Fans",
  compat: (f, all) => fanSchema.compat(f, all).map((s) => s.replace("120mm mounts", "140mm mounts")),
};

export const GROUPS = {
  gmouse: { schema: mouseSchema, facts: { ...razerWireless16aFacts, ...expand28GamingMouseFacts }, category: "peripherals", noun: "gaming mice", related: ["best-gaming-mouse", "best-wireless-gaming-mice", "best-fps-gaming-mouse"] },
  wmouse: { schema: workMouseSchema, facts: { ...verticalMice15aFacts, ...ergoMice16aFacts, ...expand28WorkMouseFacts, ...fill34WorkMouseFacts }, category: "peripherals", noun: "mice", related: ["best-mouse-for-work", "best-bluetooth-wireless-mouse", "best-vertical-ergonomic-mouse"] },
  gkb: { schema: keyboardSchema, facts: { ...quietKeyboards15aFacts, ...expand28KeyboardFacts }, category: "peripherals", noun: "keyboards", related: ["best-gaming-keyboard", "best-quiet-gaming-keyboard", "best-tkl-keyboards"] },
  wkb: { schema: workKeyboardSchema, facts: only(btKeyboards16aFacts, (f) => !(f.asin in keyboards13cFacts)), category: "peripherals", noun: "keyboards", related: ["best-keyboards-for-work", "best-compact-wireless-keyboard", "best-wireless-keyboard-with-touchpad"] },
  combo: { schema: comboSchema, facts: combo13eFacts, category: "peripherals", noun: "keyboard and mouse combos", related: ["best-gaming-keyboard-mouse-combos", "best-silent-wireless-mouse-keyboard-combos", "best-dell-wireless-keyboard-and-mouse"] },
  headset: { schema: headsetSchema, facts: { ...planar18Facts, ...expand28HeadsetFacts }, category: "peripherals", noun: "headsets", related: ["best-gaming-headset", "best-wireless-gaming-headset", "best-budget-gaming-headset"] },
  chair: { schema: chairSchema, facts: only({ ...chairs18Facts, ...expand28ChairFacts }, (f) => !f.specs.ages && !/kid|teen|child|youth/i.test(f.name)), category: "peripherals", noun: "chairs", related: ["best-office-chair-for-lower-back-pain", "best-gaming-chair", "best-ergo-chair-for-gaming"] },
  pad: { schema: padSchema, facts: { ...pad13dFacts, ...expand28PadFacts }, category: "peripherals", noun: "mouse pads", related: ["best-gaming-mousepad", "best-desk-mats-for-gaming", "best-big-mouse-pad"] },
  arm: { schema: armSchema, facts: arms18Facts, category: "peripherals", noun: "monitor arms", related: ["best-monitor-arm", "best-dual-monitor-arms", "best-monitor-arms-for-desk"] },
  riser: { schema: riserSchema, facts: riser13dFacts, category: "peripherals", noun: "monitor stands", related: ["best-monitor-stand-riser", "best-computer-stand-for-desk", "best-monitor-arm"] },
  floormat: { schema: floorMatSchema, facts: floorMat13dFacts, category: "peripherals", noun: "chair mats", related: ["best-floor-mat-for-office-chair", "best-office-chair-for-lower-back-pain", "best-gaming-chair"] },
  monitor: { schema: monitorSchema, facts: { ...monitors15eFacts, ...expand28MonitorFacts, ...fill34MonitorFacts }, category: "monitors", noun: "monitors", related: ["best-gaming-monitor", "best-1440p-gaming-monitor", "best-oled-gaming-monitors"] },
  storage: { schema: storage13eSchema, facts: { ...storage15dFacts, ...expand28StorageFacts, ...fill34StorageFacts }, category: "peripherals", noun: "external drives", related: ["best-external-ssd", "best-portable-ssd-drive", "best-external-storage-for-laptop"] },
  speaker: { schema: speaker13eSchema, facts: { ...speakers15bFacts, ...speakers20Facts, ...expand28SpeakerFacts, ...fill34SpeakerFacts }, category: "peripherals", noun: "speakers", related: ["best-pc-speakers", "best-speakers-for-gaming-pc", "best-gaming-speaker-bar"] },
  webcam: { schema: webcam13eSchema, facts: { ...webcams18Facts, ...expand28WebcamFacts }, category: "peripherals", noun: "webcams", related: ["best-webcam-for-streaming", "best-4k-webcams", "best-webcams-streaming"] },
  stream: { schema: stream13eSchema, facts: stream18Facts, category: "peripherals", noun: "streaming devices", related: ["best-streaming-gear-for-pc", "best-webcam-for-streaming", "best-streaming-gear-for-gaming"] },
  gpu: { schema: gpuRangeSchema, facts: { ...gpuFacts, ...gpuExtFacts, ...expand28GpuFacts, ...fill34GpuFacts }, category: "components", noun: "graphics cards", related: ["best-graphics-cards", "best-graphics-cards-for-1440p", "best-budget-graphics-cards"] },
  cpu: { schema: cpuSchema, facts: { ...cpuFacts, ...expand28CpuFacts }, category: "components", noun: "processors", related: ["best-cpus-for-gaming", "best-amd-cpus-for-gaming", "best-budget-cpus"] },
  mb: { schema: mbxSchema, facts: mbxFacts, category: "components", noun: "motherboards", related: ["best-motherboards-for-ryzen-7-9800x3d", "best-am5-motherboards", "best-b850-motherboards"] },
  ram: { schema: ramxSchema, facts: ramxFacts, category: "components", noun: "memory kits", related: ["best-ram-for-gaming", "best-ddr5-ram", "best-ddr4-ram"] },
  ssd: { schema: ssdxSchema, facts: { ...ssd18Facts, ...expand28SsdFacts, ...fill34SsdFacts }, category: "components", noun: "SSDs", related: ["best-ssds-for-gaming", "best-ssds", "best-2tb-gen4-ssds"] },
  prebuilt: { schema: prebuiltSchema, facts: prebuiltFacts, category: "pc-builds", noun: "gaming PCs", related: ["best-prebuilt-gaming-pcs", "best-prebuilt-gaming-pcs-under-1000", "best-mini-pcs-for-gaming"] },
  fan: { schema: fanSchema, facts: { ...fans18Facts, ...fans31Facts }, category: "components", noun: "case fans", related: ["best-case-fans", "best-argb-case-fans", "best-pc-cooling-fan"] },
  fan140: { schema: fan140Schema, facts: { ...fans18Facts, ...fans31Facts }, category: "components", noun: "140mm case fans", related: ["best-140mm-pc-fans", "best-case-fans", "best-quiet-pc-case-fans"] },
  fanrad: { schema: fanRadSchema, facts: { ...fans18Facts, ...fans31Facts }, category: "components", noun: "radiator fans", related: ["best-high-static-pressure-fans", "best-360mm-aio-coolers", "best-case-fans"] },
  pcCase: { schema: caseSchema, facts: { ...cases18Facts, ...cases20Facts, ...expand28CaseFacts }, category: "components", noun: "PC cases", related: ["best-pc-cases", "best-pc-case-for-gaming", "best-white-pc-cases"] },
  mic: { schema: mic16aSchema, facts: mic13eFacts, category: "peripherals", noun: "microphones", related: ["best-microphone-for-gaming", "best-usb-microphones", "best-xlr-microphones"] },
  air: { schema: airSchema, facts: { ...airFacts, ...air20Facts }, category: "components", noun: "air coolers", related: ["best-air-coolers", "best-cpu-coolers", "best-low-profile-cpu-coolers"] },
  aio: { schema: aioSchema, facts: aioFacts, category: "components", noun: "liquid coolers", related: ["best-360mm-aio-coolers", "best-240mm-aio-coolers", "best-cpu-coolers"] },
  paste: { schema: pasteSchema, facts: { ...pasteFacts, ...paste20Facts }, category: "components", noun: "thermal pastes", related: ["best-thermal-pastes", "best-cpu-coolers", "best-air-coolers"] },
  psu: { schema: psuGenericSchema, facts: psuGenericFacts, category: "components", noun: "power supplies", related: ["best-power-supplies", "best-850w-power-supplies", "best-sfx-power-supplies"] },
} satisfies Record<string, Group>;

export type GroupId = keyof typeof GROUPS;
