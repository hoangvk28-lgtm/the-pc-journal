import arms from "@/data/pcj-pool/monitor-arms.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool, str } from "./helpers";

/** Batch 13d monitor arm and riser fact sheets. Listing claims only, reviewed by hand. */
const P = arms as Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const armSchema: CategorySchema = {
  id: "monitor-arm",
  plural: "Monitor Arms",
  fields: [
    { key: "screen", label: "Max screen size", noun: "screen size limit", better: "higher", superlative: ["largest", "smallest"], fmt: (v) => `${v} in`,
      strength: (v) => (Number(v) >= 38 ? `Takes ultrawides up to ${v} inches` : undefined), weakness: (v) => (Number(v) <= 27 ? `Tops out at ${v}-inch screens` : undefined) },
    { key: "load", label: "Max load per arm", noun: "load rating", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} lbs`,
      strength: (v) => (Number(v) >= 26 ? `${v} lb load per arm` : undefined), weakness: (v) => (Number(v) <= 15.4 ? `Lighter ${v} lb limit` : undefined) },
    { key: "screens", label: "Monitors", fmt: (v) => String(v) },
    { key: "spring", label: "Tension", fmt: (v) => String(v) },
    { key: "vesa", label: "VESA", fmt: (v) => String(v) },
    { key: "mount", label: "Mounting", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    s.push(`Check the back of your monitor for a ${str(f, "vesa") || "75x75 or 100x100"} VESA pattern before ordering the ${f.short}; curved and some slim monitors need an adapter.`);
    if (/clamp/i.test(str(f, "mount"))) s.push(`Confirm your desk edge fits the ${f.short}'s clamp range and has no rear lip or drawer rail in the way.`);
    if (/gas|mechanical|spring/i.test(str(f, "spring"))) s.push(`Set the ${f.short}'s spring tension to your monitor's weight; a screen below the minimum load drifts upward.`);
    return s;
  },
  criteria: [
    { id: "weight", title: "Weigh the monitor without its stand", body: "Arm ratings are per arm and include a minimum as well as a maximum. Weigh the panel alone, since the stand is removed." },
    { id: "vesa", title: "Confirm the VESA pattern", body: "Most arms take 75x75 or 100x100mm. Larger ultrawides may use 200x100 or none at all and need an adapter plate." },
    { id: "size", title: "Screen size limits are about leverage", body: "A 34 or 49-inch ultrawide puts more leverage on the joint. Use an arm listed for that size, not only that weight." },
    { id: "mount", title: "Clamp or grommet", body: "C-clamps grip the desk edge within a thickness range. Grommet mounts go through a hole and suit desks with a back lip." },
    { id: "spring", title: "Gas and mechanical springs", body: "Spring-assisted arms let you move the screen with one hand. Pole-mounted arms adjust height with a collar and a tool." },
    { id: "dual", title: "Dual arms and desk depth", body: "Dual arms share one pole or clamp. Check the arm reach against your desk depth so both screens can sit at arm's length." },
  ],
  faq: [
    { id: "vesa-check", q: "How do I know if my monitor fits an arm?", a: "Look for four screw holes on the back, 75mm or 100mm apart. If there are none, the monitor needs a VESA adapter or cannot be mounted." },
    { id: "glass-desk", q: "Can I clamp a monitor arm to a glass desk?", a: "It is not recommended. Clamp arms concentrate force on the desk edge; use a freestanding base instead." },
    { id: "curved", q: "Do monitor arms work with curved screens?", a: "Yes if the curved monitor has a VESA pattern. Some arms list a lower weight limit for curved panels." },
    { id: "drift", q: "Why does my monitor drift up or down?", a: "The spring tension does not match the screen weight. Adjust the tension screw on the arm's elbow or base." },
    { id: "desk-thickness", q: "What desk thickness do clamps fit?", a: "Most ranges fall between about 0.4 and 3 inches. Check the exact range in the product details." },
    { id: "riser-vs-arm", q: "Should I get a monitor arm or a riser?", a: "A riser lifts a monitor on its own stand and needs no VESA mount. An arm frees desk space and adds tilt and swivel." },
  ],
  evaluated: [
    { title: "Load rating", description: "We recorded the per-arm weight range each listing states, including curved-screen limits where given." },
    { title: "Screen size", description: "We noted the maximum screen size, including ultrawide figures." },
    { title: "Mounting", description: "We checked clamp and grommet options and listed desk thickness ranges." },
    { title: "Adjustment", description: "We noted gas, mechanical spring or pole-collar height adjustment." },
  ],
};

export const arm13dFacts: Record<string, Fact> = withPool(P, [
  F("B0FQM6QB48", "ErGear Single Monitor Arm (13-34 in)", "ErGear single", { screen: 34, load: 19.8, screens: "1", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["a 13 to 34 inch screen range", "C-clamp or grommet mounting", "a low price for a 34-inch arm"]),
  F("B07T5SY43L", "HUANUO FlowLift Dual Monitor Stand", "FlowLift Dual", { screen: 32, load: 19.8, screens: "2", spring: "Gas spring", vesa: "75x75 / 100x100", mount: "Dual C-clamp or grommet" }, ["a dual C-clamp for stability", "gas-spring arms", "a 4.4 to 19.8 lb range per arm"]),
  F("B0DGPZR6P1", "WALI Single Monitor Arm (13-34 in)", "WALI single", { screen: 34, load: 26.4, screens: "1", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["a 26.4 lb limit for flat screens", "a separate 19.8 lb limit for curved screens", "screens up to 34 inches"]),
  F("B0FPXFYG17", "ErGear Dual Monitor Arm (13-32 in)", "ErGear dual", { screen: 32, load: 19.8, screens: "2", vesa: "Up to 100x100", mount: "C-clamp or grommet" }, ["a one-piece C-clamp", "an optional bolt-through grommet mount", "a 19.8 lb limit per arm"]),
  F("B07T3KCQ94", "HUANUO FlowLift Single Monitor Mount", "FlowLift Single", { screen: 32, load: 19.8, screens: "1", spring: "Gas spring", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["a gas-spring arm", "a 4.4 to 19.8 lb range", "C-clamp or grommet mounting"]),
  F("B0GK7FVTR4", "HUANUO FlowLift Pro Monitor Arm", "FlowLift Pro", { screen: 32, load: 19.8, screens: "1", spring: "MechaSpring mechanical", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["a MechaSpring mechanical spring", "a 15.4 lb limit for curved screens", "a 19.8 lb limit for flat screens"]),
  F("B0G523STF2", "NB SmooVex Mechanical Spring Monitor Mount", "SmooVex", { screen: 32, screens: "1", spring: "Mechanical spring", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["a mechanical spring instead of gas", "screens up to 32 inches", "C-clamp or grommet mounting"]),
  F("B0GJZNQ417", "ErGear Heavy Duty Ultrawide Monitor Arm (13-49 in)", "ErGear heavy duty", { screen: 49, load: 37.4, screens: "1", vesa: "75x75 / 100x100", mount: "Dual C-clamp or grommet" }, ["a 37.4 lb capacity", "screens up to 49 inches", "a clamp for desks up to 3.15 inches thick"]),
  F("B0DGPT759H", "WALI Dual Monitor Arm (13-32 in)", "WALI dual", { screen: 32, load: 22, screens: "2", mount: "C-clamp or grommet" }, ["a 22 lb limit per arm", "screens up to 32 inches", "C-clamp or grommet mounting"]),
  F("B0CQXMT3QC", "Amazon Basics Gas Spring Single Monitor Arm", "Amazon Basics gas single", { screen: 27, load: 15.4, screens: "1", spring: "Gas spring", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["adjustable gas-spring tension", "a 4.4 to 15.4 lb range", "15 to 27 inch screens"]),
  F("B01N2YFO5Z", "VIVO Dual Monitor Stand with Mechanical Spring Arms", "VIVO dual spring", { screen: 32, load: 19.8, screens: "2", spring: "Mechanical spring", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["mechanical spring arms", "a 4.4 to 19.8 lb range per arm", "17 to 32 inch screens"]),
  F("B009S750LA", "VIVO Dual Monitor Desk Mount (13-30 in)", "VIVO dual pole", { screen: 30, load: 22, screens: "2", spring: "Pole collar", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["a steel pole mount", "a 22 lb limit per arm", "screens from 13 to 30 inches"]),
  F("B0CQXPGNCH", "Amazon Basics Gas Spring Dual Monitor Arm", "Amazon Basics gas dual", { screen: 27, load: 15.4, screens: "2", spring: "Gas spring", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["gas-spring arms", "a 4.4 to 15.4 lb range per arm", "a clamp for desks up to 4 inches thick"]),
  F("B07X262MRK", "HUANUO Premium Dual Monitor Stand with USB (13-40 in)", "HUANUO 40-inch dual", { screen: 40, load: 26.4, screens: "2", vesa: "75x75 / 100x100", mount: "Dual C-clamp or grommet" }, ["screens up to 40 inches", "a 26.4 lb limit per arm", "built-in USB ports"]),
  F("B0C7KQ7MX8", "ErGear Dual Monitor Stand (17-33 in)", "ErGear 33-inch dual", { screen: 33, load: 22, screens: "2", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["a 22 lb limit per arm", "17 to 33 inch screens", "C-clamp or grommet mounting"]),
  F("B082MLVXRR", "ErGear Heavy Duty Dual Monitor Stand", "ErGear pole dual", { screen: 32, load: 17.6, screens: "2", spring: "Pole collar", mount: "C-clamp or grommet" }, ["a 22 inch arm span", "a 16 inch pole", "a 17.6 lb limit per arm"]),
  F("B0859J9FYY", "ErGear Single Monitor Mount (13-32 in)", "ErGear pole single", { screen: 32, load: 17.6, screens: "1", spring: "Pole collar", mount: "C-clamp or grommet" }, ["a steel pole", "a 17.6 lb limit", "the lowest price among the arms here"]),
  F("B00B21TLQU", "VIVO Single Ultrawide Monitor Arm (13-38 in)", "VIVO ultrawide single", { screen: 38, load: 22, screens: "1", spring: "Pole collar", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["ultrawides up to 38 inches", "a 22 lb limit", "up to 16 inches of height adjustment on the pole"]),
  F("B0FRRCGF2Q", "WALI Ultrawide Single Monitor Arm (17-49 in)", "WALI ultrawide", { screen: 49, load: 33, screens: "1", mount: "C-clamp or grommet" }, ["curved screens up to 49 inches", "a 33 lb capacity", "a clamp for desks up to 1.96 inches thick"]),
  F("B07Q8TJ2KL", "Ergotron LX Single Monitor Arm", "Ergotron LX", { screen: 34, load: 25, screens: "1", vesa: "75x75 / 100x100", mount: "Two-piece clamp and grommet" }, ["a 7 to 25 lb range", "13 inches of lift", "a two-piece desk clamp and grommet mount"]),
  F("B0DSJJMRFL", "Ergotron LX Pro Premium Single Monitor Arm", "Ergotron LX Pro", { screen: 34, load: 22, screens: "1", vesa: "75x75 / 100x100", mount: "Two-piece clamp" }, ["a 4 to 22 lb range", "13 inches of lift", "a grommet mount sold separately"]),
  F("B09T78LQYQ", "Ergotron LX Vertical Stacking Dual Monitor Arm", "Ergotron LX vertical dual", { screen: 40, load: 22, screens: "2, stacked", mount: "Two-piece clamp or grommet" }, ["two screens stacked vertically", "a tall pole", "a 7 to 22 lb range per screen"]),
  F("B07Q1NJ15Q", "Ergotron LX Dual Monitor Arm", "Ergotron LX Dual", { screen: 27, load: 20, screens: "2", mount: "Two-piece clamp or grommet" }, ["a 7 to 20 lb range per screen", "13 inches of lift", "a low-profile clamp"]),
  F("B0CQTPZNV8", "Amazon Basics Adjustable Dual Monitor Desk Mount", "Amazon Basics dual", { screen: 32, load: 22, screens: "2", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["a 22 lb limit per arm", "a clamp for desks up to 4.25 inches thick", "screens up to 32 inches"]),
  F("B0CQXL5S4T", "Amazon Basics Adjustable Single Monitor Arm", "Amazon Basics single", { screen: 38, load: 22, screens: "1", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["32-inch screens or 38-inch ultrawides", "a 22 lb limit", "a clamp for desks up to 4.25 inches thick"]),
  F("B07K6TLPNP", "VIVO Premium Aluminum Ultrawide Monitor Arm", "VIVO aluminum ultrawide", { screen: 40, load: 26.4, screens: "1", spring: "Elbow spring", mount: "C-clamp or grommet" }, ["an aluminum arm", "a 26.4 lb flat or 24.2 lb curved limit", "a built-in elbow spring gauge"]),
  F("B0DQ19YC9H", "HUANUO TitanLift Heavy Duty Monitor Arm", "TitanLift", { screen: 49, load: 44, screens: "1", vesa: "Up to 100x100", mount: "Dual C-clamp" }, ["a 6 to 44 lb range", "screens up to 49 inches", "a dual C-clamp"]),
  F("B0CTJYYSML", "HUANUO Single Gas Spring Monitor Arm", "HUANUO gas single", { screen: 32, load: 19.8, screens: "1", spring: "Gas spring", mount: "C-clamp or grommet" }, ["automotive-grade gas spring cores", "a 4.4 to 19.8 lb range", "C-clamp or grommet mounting"]),
  F("B0G257412H", "HUANUO Ultrawide Monitor Arm (13-40 in)", "HUANUO ultrawide", { screen: 40, load: 26.4, screens: "1", mount: "C-clamp or grommet" }, ["screens up to 40 inches", "a 26.4 lb capacity", "a clamp for desks up to 3.15 inches thick"]),
  F("B0855ZBPXD", "HUANUO Stacked Dual Monitor Stand", "HUANUO stacked", { screen: 32, load: 19.8, screens: "2, stacked", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["two screens stacked vertically", "a 4.4 to 19.8 lb range per screen", "17 to 32 inch screens"]),
  F("B0GK6DT5SF", "HUANUO FlowLift Pro Dual Monitor Mount", "FlowLift Pro Dual", { screen: 27, load: 15.4, screens: "2", spring: "MechaSpring mechanical", mount: "Dual C-clamp" }, ["MechaSpring mechanical arms", "a 4.4 to 15.4 lb range per arm", "13 to 27 inch screens"]),
  F("B00C5H5DN0", "VIVO Freestanding Dual Monitor Stand", "VIVO freestanding", { screen: 27, load: 22, screens: "2", vesa: "Up to 100x100", mount: "Freestanding base" }, ["a freestanding 13 x 10 inch base", "no clamp or drilling", "a 22 lb limit per arm"]),
  F("B0BNWDV6R7", "VIVO Heavy Duty Dual Monitor Desk Mount (13-32 in)", "VIVO dual 32", { screen: 32, load: 22, screens: "2", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["a heavy-duty C-clamp", "a 22 lb limit per arm", "13 to 32 inch screens"]),
  F("B078KNH4H7", "VIVO Freestanding Dual Monitor Stand with Glass Base", "VIVO glass base", { screen: 32, load: 22, screens: "2", mount: "Freestanding glass base" }, ["a glass base with no clamp", "a 22 lb limit per screen", "13 to 32 inch screens"]),
  F("B00DGTP57A", "VIVO Dual Vertically Stacked Monitor Mount", "VIVO stacked", { screen: 34, load: 22, screens: "2, stacked", vesa: "75x75 / 100x100", mount: "C-clamp or grommet" }, ["two ultrawides up to 34 inches stacked", "an extra-tall pole", "a 22 lb limit per screen"]),
  F("B0B1962TYX", "VIVO Dual Ultrawide Monitor Desk Mount (27-38 in)", "VIVO dual ultrawide", { screen: 38, load: 22, screens: "2", mount: "C-clamp or grommet" }, ["two ultrawides from 27 to 38 inches", "a 22 lb limit per arm", "a patented arm design"]),
  F("B07DFT56Z7", "VIVO Dual Mechanical Spring Monitor Mount", "VIVO dual mechanical", { screen: 32, load: 19.8, screens: "2", spring: "Mechanical spring", vesa: "Up to 100x100", mount: "C-clamp or grommet" }, ["tension spring arms", "a 4.4 to 19.8 lb range per arm", "17 to 32 inch screens"]),
]);

export const riserSchema: CategorySchema = {
  id: "monitor-riser",
  plural: "Monitor Risers",
  fields: [
    { key: "load", label: "Load", noun: "load rating", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} lbs`, strength: (v) => (Number(v) >= 44 ? `Holds up to ${v} lbs` : undefined) },
    { key: "height", label: "Height", fmt: (v) => String(v) },
    { key: "width", label: "Platform", fmt: (v) => String(v) },
    { key: "storage", label: "Storage", fmt: (v) => String(v), strength: (v) => (/drawer/i.test(String(v)) ? "Built-in drawer" : undefined) },
  ],
  compat: (f) => {
    const s = [`Measure your monitor stand's footprint against the ${f.short}'s platform before ordering.`];
    if (/drawer/i.test(str(f, "storage"))) s.push(`The ${f.short}'s drawer needs clearance in front, so keep the keyboard slightly forward.`);
    return s;
  },
  criteria: [
    { id: "height", title: "Raise the screen to eye level", body: "The top edge of the screen should sit near eye height. Adjustable risers let you pick a height instead of guessing." },
    { id: "footprint", title: "Check the platform size", body: "A monitor stand's base must fit fully on the platform. Dual risers span two screens or a monitor and a laptop." },
    { id: "load", title: "Load ratings are generous", body: "Most monitors weigh under 20 lb with the stand. A higher rating matters for a CRT, a printer or two screens." },
    { id: "storage", title: "Drawers and slots", body: "Drawers and pen holders tidy a small desk; open risers leave room to slide a keyboard underneath." },
    { id: "material", title: "Wood, metal or plastic", body: "Steel and wood feel stiffer; plastic risers are lighter and cheaper. Check that the legs sit flat." },
  ],
  faq: [
    { id: "riser-vs-arm", q: "Should I get a monitor riser or an arm?", a: "A riser needs no VESA mount or clamp. An arm frees more desk space and adds tilt and swivel." },
    { id: "keyboard-under", q: "Can I store a keyboard under a riser?", a: "Yes, if the clearance under the platform is taller than the keyboard. Check the height." },
    { id: "laptop", q: "Can a monitor riser hold a laptop?", a: "Yes. Pair it with an external keyboard and mouse, since the laptop's keyboard will be too high." },
    { id: "two-screens", q: "Will one riser fit two monitors?", a: "Only a dual or extended riser. Measure both stands side by side." },
    { id: "height-right", q: "How high should my monitor be?", a: "The top of the screen at or slightly below eye level for most people. Adjust from there." },
  ],
  evaluated: [
    { title: "Load", description: "We recorded the weight limit." },
    { title: "Height", description: "We noted listed heights and whether they adjust." },
    { title: "Storage", description: "We noted drawers and pen holders." },
    { title: "Platform", description: "We noted listed platform sizes where given." },
  ],
};

export const riser13dFacts: Record<string, Fact> = withPool(P, [
  F("B073VKC134", "HUANUO Monitor Riser with Vented Metal Platform", "HUANUO riser", { load: 44, width: "14.94 in steel plate" }, ["a vented steel platform", "a 44 lb limit", "room for a laptop or printer"]),
  F("B00X4SCCFG", "Amazon Basics Height Adjustable Monitor Stand Riser", "Amazon Basics riser", { load: 22, height: "Adjustable" }, ["adjustable height", "a 22 lb limit", "a platform about 11 inches deep at the center"]),
  F("B0G2RTY746", "WALI Adjustable Computer Monitor Stand", "WALI riser", { load: 44, height: "Adjustable" }, ["a 44 lb (20 kg) limit", "adjustable height", "the lowest price among the risers here"]),
  F("B0GDTXTCWV", "Canyora Monitor Stand Riser with 3 Heights", "Canyora riser", { load: 44, height: "3 settings" }, ["three height settings", "a 44 lb limit"]),
  F("B0DJKSMV2T", "gianotter Dual Monitor Stand Riser with Drawer", "gianotter riser", { storage: "Drawer, 2 pen holders", width: "Dual" }, ["a drawer", "two magnetic pen holders", "a dual-width platform"]),
  F("B0F1YFDDV6", "Spacrea Dual Monitor Stand Riser with Drawer", "Spacrea riser", { storage: "Drawer, 2 pen holders", width: "Dual" }, ["a drawer", "two pen holders", "a dual-width platform"]),
  F("B0DB8F7GDN", "OPNICE 2-Tier Monitor Stand Riser with Drawer", "OPNICE 2-tier", { storage: "Drawer, 2 pen holders", width: "2-tier" }, ["a two-tier platform", "a drawer", "two hanging pen holders"]),
]);
