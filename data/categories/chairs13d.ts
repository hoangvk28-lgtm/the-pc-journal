import chairs from "@/data/pcj-pool/chairs.json";
import type { CategorySchema, Fact } from "@/lib/pc-compose/generic";
import { withPool, str } from "./helpers";

/** Batch 13d chair fact sheets (gaming, big and tall, office, kids). Listing claims only, reviewed by hand. */
const P = chairs as Record<string, { img?: string; price?: string }>;
const F = (asin: string, name: string, short: string, specs: Fact["specs"], notes: string[]) => ({ asin, name, short, specs, notes });

export const chairSchema: CategorySchema = {
  id: "chair",
  plural: "Chairs",
  fields: [
    { key: "capacity", label: "Weight capacity", noun: "weight capacity", better: "higher", superlative: ["highest", "lowest"], fmt: (v) => `${v} lbs`,
      strength: (v) => (Number(v) >= 400 ? `${v} lb weight rating` : undefined), weakness: (v) => (Number(v) <= 250 ? `Lower ${v} lb capacity` : undefined) },
    { key: "recline", label: "Max recline", noun: "recline angle", better: "higher", superlative: ["deepest", "shallowest"], fmt: (v) => `${v}°`,
      strength: (v) => (Number(v) >= 155 ? `Reclines to ${v}°` : undefined), weakness: (v) => (Number(v) <= 120 ? `Recline stops at ${v}°` : undefined) },
    { key: "seat", label: "Seat height", fmt: (v) => String(v) },
    { key: "arms", label: "Armrests", fmt: (v) => String(v), strength: (v) => (/4D|5D|flip/i.test(String(v)) ? `${v} armrests` : undefined) },
    { key: "lumbar", label: "Lumbar support", fmt: (v) => String(v) },
    { key: "footrest", label: "Footrest", fmt: (v) => String(v) },
    { key: "material", label: "Upholstery", fmt: (v) => String(v), strength: (v) => (/mesh|fabric/i.test(String(v)) ? `${v} upholstery` : undefined) },
    { key: "ages", label: "Age range", fmt: (v) => String(v) },
  ],
  compat: (f) => {
    const s: string[] = [];
    if (/flip/i.test(str(f, "arms"))) s.push(`The ${f.short}'s arms flip up, so it can roll closer under a desk with a low front edge.`);
    if (/footrest|pull-out|retractable/i.test(str(f, "footrest"))) s.push(`Leave room behind the desk: the ${f.short}'s footrest needs clear floor space when extended and reclined.`);
    if (/pillow/i.test(str(f, "lumbar"))) s.push(`The ${f.short}'s lumbar support is a strap-on pillow, so position it by hand rather than with a dial.`);
    if (Number(f.specs.capacity) >= 400) s.push(`Check the ${f.short}'s seat width against your hips as well as its weight rating.`);
    if (f.specs.ages) s.push(`The ${f.short} is rated for ${str(f, "ages")}; check seat height against the child's desk.`);
    return s;
  },
  criteria: [
    { id: "capacity", title: "Match the weight rating with margin", body: "A chair's rated capacity covers the base, gas lift and frame. Pick one rated well above your weight, since the rating is a limit, not a comfort target." },
    { id: "seat", title: "Check seat height against your desk", body: "Your feet should rest flat with thighs level. Compare the seat-height range with your desk height and your leg length before buying." },
    { id: "arms", title: "Armrest adjustment decides desk fit", body: "Fixed or linkage arms move together with the backrest. 3D and 4D arms move up, down, in and out; flip-up arms let the chair tuck under a desk." },
    { id: "lumbar", title: "Know what kind of lumbar support you get", body: "Most budget gaming chairs use a strap-on pillow. Built-in or adjustable lumbar sits in the backrest and does not slide around." },
    { id: "recline", title: "Recline and footrests need space", body: "A 155 to 165 degree recline and a pull-out footrest are for breaks. Both need floor space behind and in front of the chair." },
    { id: "material", title: "Upholstery changes heat and wear", body: "PU leather wipes clean but traps heat. Fabric and mesh breathe better. Check the product page rather than the photos." },
  ],
  faq: [
    { id: "gaming-vs-office", q: "Is a gaming chair better than an office chair?", a: "Not by default. Gaming chairs add recline and bucket-seat styling; office chairs often have more seat and lumbar adjustment. Choose by the adjustments you will use." },
    { id: "capacity-real", q: "What does the weight capacity mean?", a: "It is the maker's load limit for the chair. Staying well under it puts less stress on the gas cylinder and base." },
    { id: "footrest-use", q: "Is a footrest worth having?", a: "It helps if you recline to watch or rest. At a desk it stays tucked away, so skip it if floor space is tight." },
    { id: "pillow", q: "Are lumbar pillows adjustable?", a: "Strap-on pillows slide up and down on a strap. They are simple but can shift; built-in lumbar stays put." },
    { id: "assembly", q: "How hard is assembly?", a: "Most chairs arrive with the base, cylinder, seat and backrest separate and bolt together with the included tools. A second person helps with the backrest." },
    { id: "kids-chair", q: "Can a child use an adult gaming chair?", a: "Only if the seat lowers far enough for their feet to rest flat. Chairs listed for kids state a smaller seat or an age range." },
  ],
  evaluated: [
    { title: "Weight capacity", description: "We recorded the load limit stated in each listing and left it blank where none is given." },
    { title: "Adjustment", description: "We noted recline angle, armrest type and seat-height range where listed." },
    { title: "Lumbar and footrest", description: "We checked whether lumbar support is built in or a pillow, and whether a footrest is included." },
    { title: "Upholstery", description: "We noted PU leather, fabric or mesh from the product description." },
  ],
};

export const chair13dFacts: Record<string, Fact> = withPool(P, [
  // Gaming chairs
  F("B0H2HR6XP3", "N-GEN Gaming Chair with Footrest", "N-GEN", { recline: 135, arms: "Linkage", lumbar: "Cushion", footrest: "Retractable", material: "PU leather" }, ["a 90 to 135 degree recline", "linkage armrests that move with the backrest", "a retractable footrest"]),
  F("B0H7XCYWBZ", "Video Gaming Chair for Adults with Footrest", "adult footrest chair", { recline: 150, lumbar: "Adjustable", footrest: "Yes" }, ["a removable headrest", "a recline up to 150 degrees", "adjustable lumbar support"]),
  F("B0DS4GHZKY", "GTPLAYER Gaming Chair with Footrest", "GTPLAYER footrest", { arms: "3D", lumbar: "Pillow", footrest: "Yes", material: "PU leather" }, ["3D armrests", "a headrest pillow and a lumbar pillow", "a footrest"]),
  F("B0BXW9PGZX", "WOTSTA Gaming Chair with Massage Lumbar", "WOTSTA", { recline: 135, lumbar: "Massage pillow", footrest: "Yes" }, ["a massage lumbar pillow", "a 135 degree recline", "a footrest"]),
  F("B0BXW51QVX", "WOTSTA Massage Gaming Chair", "WOTSTA massage", { capacity: 300, recline: 135, lumbar: "Massage pillow", footrest: "Yes" }, ["a 300 lb weight capacity", "a 135 degree recline", "a footrest"]),
  F("B0C4Q7M3VC", "Homall Gaming Chair with Footrest", "Homall footrest", { recline: 135, lumbar: "Massage pillow", footrest: "Extends 29.6 in" }, ["a footrest that extends 29.6 inches", "a massage lumbar pillow", "a 135 degree recline"]),
  F("B01MRZ02TL", "Homall Faux Leather Gaming Chair", "Homall faux leather", { recline: 155, seat: "From 17.3 in", lumbar: "Pillow", material: "Faux leather" }, ["a 90 to 155 degree recline", "a removable headrest", "a seat height from 17.3 inches"]),
  F("B081T1JKN8", "Homall High Back Gaming Chair", "Homall high back", { capacity: 300, recline: 155 }, ["a 300 lb weight capacity", "a recline up to 155 degrees", "a high backrest"]),
  F("B0FP4S6DDL", "DUMOS Gaming Chair with Flip-Up Arms", "DUMOS", { capacity: 275, recline: 135, arms: "Flip-up" }, ["flip-up armrests", "a 90 to 135 degree rocking range", "a 275 lb weight capacity"]),
  F("B0CKCT1KL5", "Sweetcrispy Gaming Chair", "Sweetcrispy", { seat: "18 to 22 in", arms: "Flip-up (92°)", lumbar: "Lumbar support" }, ["armrests that flip up 92 degrees", "an 18 to 22 inch seat height", "lumbar support"]),
  F("B0FDKL2Q8Z", "GTRACING Gaming Chair", "GTRACING", { capacity: 300, recline: 155, arms: "3D", material: "PU leather" }, ["3D armrests", "a 155 degree recline", "a 300 lb weight capacity"]),
  F("B0F9YFX3QN", "GTPLAYER Fabric Gaming Chair with Pocket Springs", "GTPLAYER pocket-spring", { arms: "Linkage", footrest: "Yes", material: "Breathable fabric" }, ["a pocket-spring seat cushion", "breathable fabric upholstery", "linkage armrests and a footrest"]),
  F("B07QGY4VGK", "GTPLAYER Gaming Chair with Bluetooth Speakers", "GTPLAYER speaker chair", { recline: 160, footrest: "Yes" }, ["Bluetooth speakers built into the headrest", "a 160 degree recline", "a footrest"]),
  F("B0DFWG7D4M", "Homall Gaming Chair with Footrest and Massage Lumbar", "Homall massage", { lumbar: "Massage pillow", footrest: "Yes" }, ["a massage lumbar pillow", "a footrest", "a low price for both features"]),
  F("B0FS1KMMZM", "Homall RGB Gaming Chair", "Homall RGB", { lumbar: "Massage pillow" }, ["RGB lighting on the chair", "a massage lumbar pillow"]),
  F("B0BN6RRD5V", "Corsair TC100 Relaxed Leatherette Gaming Chair", "TC100 Relaxed", { arms: "Adjustable", lumbar: "Pillow", material: "Leatherette" }, ["a 100mm gas-lift height range", "a memory-foam neck pillow", "a lumbar pillow"]),
  F("B0BMC359CT", "Corsair T3 Rush Fabric Gaming Chair", "T3 Rush", { arms: "4D", lumbar: "Memory-foam pillow", material: "Fabric" }, ["4D armrests", "a memory-foam lumbar pillow", "a steel base"]),
  F("B0D47CZT4G", "Corsair TC500 Luxe Gaming Chair", "TC500 Luxe", { recline: 135, arms: "5-way Omniflex", lumbar: "Built-in, 4-way", material: "Fabric" }, ["built-in four-way lumbar support", "five-way Omniflex armrests", "a wider, flatter seat and a magnetic neck pillow"]),
  F("B0DP5SY554", "Razer Iskur V2 X Gaming Chair", "Iskur V2 X", { recline: 152, arms: "2D", lumbar: "Built-in arch", material: "Fabric" }, ["a lumbar arch built into the backrest", "a 152 degree recline", "2D armrests"]),
  F("B0BC9VJVVL", "Secretlab Titan Evo Dark Knight Gaming Chair", "Titan Evo", { recline: 165, arms: "4D", lumbar: "Built-in, 4-way", material: "Leatherette" }, ["built-in four-way lumbar adjustment", "4D armrests", "a 165 degree recline"]),
  F("B0DGKVGH8X", "Respawn 110 Pro Gaming Chair", "Respawn 110 Pro", { capacity: 275, recline: 155, footrest: "Yes" }, ["a 155 degree recline", "a footrest", "a 275 lb weight capacity"]),
  F("B0DFFXW22P", "Yaheetech Gaming Chair with Footrest", "Yaheetech", { recline: 135, seat: "19 to 22.6 in", arms: "Linkage", lumbar: "Massage pillow", footrest: "Yes" }, ["a 19 to 22.6 inch seat height", "a massage lumbar pillow", "linkage armrests and a footrest"]),
  F("B0H2YTVWV2", "Huracan Gaming Chair with Footrest", "Huracan", { lumbar: "Pad", footrest: "Yes", material: "PU leather, memory foam" }, ["a memory-foam seat", "a lumbar pad", "a footrest"]),
  F("B0DCHXTGRN", "TUKAKA Massage Gaming Chair", "TUKAKA", { recline: 140, lumbar: "Massage", footrest: "Yes" }, ["a massage function", "a 90 to 140 degree recline", "a footrest"]),
  F("B0GWH5J3SQ", "N-GEN Gaming Chair with Flip-Up Arms", "N-GEN flip-up", { arms: "Flip-up", material: "PU leather" }, ["flip-up armrests", "PU leather upholstery", "a price under $80 at the time of writing"]),
  F("B0FZH918XB", "GTPLAYER Fabric Gaming Chair with Footrest", "GTPLAYER fabric", { recline: 135, footrest: "Yes", material: "Fabric" }, ["fabric upholstery", "a 135 degree recline", "a footrest"]),
  F("B0DL8W5PN8", "Czlolo RGB Gaming Chair", "Czlolo RGB", { capacity: 350, recline: 135, lumbar: "Vibrating massager", footrest: "Yes", ages: "adults and kids" }, ["a 350 lb weight capacity", "a vibrating lumbar massager", "RGB lighting"]),
  F("B0FWRDF6G8", "WENTUM Gaming Chair", "WENTUM", { capacity: 330, seat: "17.7 to 21.7 in", lumbar: "Massage", ages: "kids and adults" }, ["a 330 lb weight capacity", "a 17.7 to 21.7 inch seat height", "a massage lumbar"]),
  // Kids
  F("B071ZQFNPS", "Techni Mobili Kids Desk Chair", "Techni Mobili Kids", { capacity: 140 }, ["a 140 lb weight capacity", "pneumatic height adjustment", "a child-sized seat"]),
  F("B0BHF94V6S", "Amazon Basics Kids Mesh Desk Chair", "Amazon Basics Kids", { lumbar: "Low mesh back", footrest: "Removable", material: "Mesh" }, ["a removable footrest", "BIFMA certification", "a 16.93 inch wide seat"]),
  F("B08GQZHGNK", "GIANTEX Kids Desk Chair", "GIANTEX Kids", { capacity: 250, seat: "16.5 to 21 in", arms: "Armless", ages: "ages 5 to 14" }, ["an armless design", "a 16.5 to 21 inch seat height", "an age range of 5 to 14"]),
  F("B0CM3RBL4M", "Qadory Inflatable Kids Gaming Chair", "Qadory inflatable", { capacity: 300, ages: "ages 4 to 12" }, ["an inflatable floor seat", "a 300 lb weight capacity", "an age range of 4 to 12"]),
  F("B0B3RBJB8Q", "Costzon Kids Gaming Recliner", "Costzon recliner", { capacity: 110, recline: 160, footrest: "0 to 90°", ages: "ages 3 to 12" }, ["a 90 to 160 degree recline", "a footrest that adjusts from 0 to 90 degrees", "an age range of 3 to 12"]),
  F("B0CZRPPT3R", "Kids Ergonomic Desk Chair with Footrest", "kids footrest chair", { seat: "17.3 to 21.3 in", footrest: "Yes", ages: "ages 5 to 13" }, ["a footrest", "a 17.3 to 21.3 inch seat height", "an age range of 5 to 13"]),
  F("B0B9R5264Q", "Inflatable Gaming Chair for Kids and Teens", "inflatable teen chair", { capacity: 220, ages: "kids and teens" }, ["an inflatable floor seat", "a 220 lb weight capacity", "a listing for kids and teens"]),
  F("B0FXFCPDC9", "GTPLAYER Floor Gaming Chair", "GTPLAYER floor chair", { }, ["360-degree swivel", "a folding frame", "a floor-level seat"]),
  F("B08FCSNPV3", "Best Choice Products Floor Rocker Gaming Chair", "Best Choice rocker", {}, ["six backrest positions", "a folding frame with 360-degree swivel", "22.5 x 22 x 30 inch dimensions"]),
  F("B0899BXLXD", "X Rocker Pixel Floor Rocker", "X Rocker Pixel", { capacity: 300 }, ["Bluetooth speakers in the headrest", "a folding frame", "a 300 lb weight capacity"]),
  // Big and tall, heavy duty
  F("B0DXTWTCWS", "GTPLAYER Big and Tall Gaming Chair", "GTPLAYER B&T spring", { capacity: 400, recline: 135, lumbar: "Spring", footrest: "Yes" }, ["a 400 lb weight capacity", "spring lumbar support", "a footrest"]),
  F("B0H14F136K", "GTPLAYER Big and Tall Gaming Chair with Linkage Arms", "GTPLAYER B&T linkage", { capacity: 400, recline: 150, arms: "Linkage", footrest: "Yes" }, ["a 400 lb weight capacity", "a 90 to 150 degree recline", "linkage armrests"]),
  F("B09B3FJHHT", "LEMBERI Big and Tall Gaming Chair with Massage", "LEMBERI massage", { capacity: 400, lumbar: "USB massage" }, ["an extra-wide seat", "a USB-powered massage lumbar", "a 400 lb weight capacity"]),
  F("B07X5WDP2L", "LEMBERI Big and Tall Gaming Chair with Footrest", "LEMBERI footrest", { capacity: 400, footrest: "Yes" }, ["a 400 lb weight capacity", "a footrest"]),
  F("B0DH2BKGRR", "VITESSE Big and Tall Gaming Chair", "VITESSE", { capacity: 400, recline: 155, arms: "Linkage", footrest: "Yes" }, ["a 90 to 155 degree recline", "linkage armrests", "a 400 lb weight capacity"]),
  F("B0DYNW9SW6", "COMHOMA Big and Tall Gaming Chair", "COMHOMA", { recline: 145, lumbar: "Pocket spring", footrest: "Yes" }, ["pocket-spring lumbar support", "a 145 degree recline", "a footrest"]),
  F("B0H262PKQ1", "N-GEN Big and Tall Gaming Chair", "N-GEN B&T", { capacity: 400, recline: 135, footrest: "Yes" }, ["a 400 lb weight capacity", "a 90 to 135 degree recline", "a footrest"]),
  F("B0H7HKB2LN", "Dowinx Big and Tall Gaming Chair", "Dowinx B&T", { capacity: 500, recline: 135, footrest: "Pull-out" }, ["a 500 lb weight capacity", "a pull-out footrest", "a 90 to 135 degree recline"]),
  F("B0GWHYHVSJ", "ATMILD Big and Tall Gaming Chair", "ATMILD", { capacity: 400, recline: 135, footrest: "Yes" }, ["a class-3 gas cylinder", "a 400 lb weight capacity", "a footrest"]),
  F("B0H5WTGFJT", "Stella Mia Big and Tall Gaming Chair", "Stella Mia", { capacity: 500, recline: 165, lumbar: "Pillow", footrest: "Yes" }, ["a 23.6 inch wide seat", "a 165 degree recline", "a 500 lb weight capacity"]),
  F("B0H8LWQ9CB", "CIOMAN Big and Tall Gaming Chair", "CIOMAN", { capacity: 500, lumbar: "Air cushion", footrest: "Yes" }, ["an air-cushion lumbar", "a 500 lb weight capacity", "a footrest"]),
  F("B0HH993S42", "Heavy Duty Big and Tall Chair with 5D Arms (600 lb)", "600 lb 5D chair", { capacity: 600, arms: "5D flip-up" }, ["a 600 lb weight capacity", "5D armrests that flip up"]),
  F("B0GF9TKQTW", "Big and Tall Office Chair with Inflatable Lumbar (500 lb)", "500 lb inflatable-lumbar chair", { capacity: 500, lumbar: "Inflatable" }, ["an inflatable lumbar support", "a 500 lb weight capacity"]),
  F("B0G3V5RQG7", "Heavy Duty Office Chair with Flip-Up Arms (400 lb)", "SGS 400 lb chair", { capacity: 400, arms: "Flip-up" }, ["SGS certification", "flip-up armrests", "a 400 lb weight capacity"]),
  F("B0GYVSG1JG", "DUMOS Big and Tall Mesh Office Chair", "DUMOS mesh B&T", { capacity: 500, arms: "4D metal", material: "Mesh" }, ["a 500 lb weight capacity", "4D metal armrests", "a mesh back"]),
  F("B0H87FW5S4", "Heavy Duty Office Chair with 5D Flip-Up Arms (700 lb)", "700 lb 5D chair", { capacity: 700, arms: "5D flip-up", lumbar: "Air" }, ["a 700 lb weight capacity", "5D flip-up armrests", "an air lumbar support"]),
  F("B0GJCSD4W8", "Big and Tall Office Chair with Inflatable Lumbar (600 lb)", "600 lb inflatable-lumbar chair", { capacity: 600, lumbar: "Inflatable" }, ["a 600 lb weight capacity", "an inflatable lumbar support"]),
  F("B0FRMPDKPR", "Heavy Duty Mesh Office Chair (700 lb)", "700 lb mesh chair", { capacity: 700, recline: 135, arms: "4D", material: "Mesh" }, ["a 700 lb weight capacity", "4D armrests", "a mesh back that rocks to 135 degrees"]),
  F("B0F7QNJP67", "HYLONE Big and Tall Mesh Office Chair", "HYLONE", { capacity: 400, arms: "Flip-up", material: "Mesh" }, ["a listing for users from 5'5\" to 6'2\"", "flip-up armrests", "a 400 lb weight capacity"]),
  F("B0D9VPSQM7", "CAPOT Big and Tall Mesh Office Chair", "CAPOT", { capacity: 400, arms: "4D flip-up", lumbar: "8-level adjustable", material: "Mesh" }, ["8-level lumbar adjustment", "4D armrests that flip up", "a 3-level tilt lock"]),
  F("B0FQN62VY2", "Nexthro Big and Tall Mesh Office Chair", "Nexthro", { capacity: 400, lumbar: "Adjustable", material: "Mesh" }, ["adjustable lumbar support", "a listing for users from 5'4\" to 6'3\"", "a 400 lb weight capacity"]),
  F("B0FF3GMW36", "Big and Tall Office Chair with Footrest (400 lb)", "400 lb footrest chair", { capacity: 400, arms: "Flip-up", footrest: "Yes" }, ["flip-up armrests", "a footrest", "a 400 lb weight capacity"]),
  // Ergonomic office chairs
  F("B0H82J3BL8", "Ergonomic Mesh Office Chair with Footrest (365 lb)", "365 lb mesh recliner", { capacity: 365, recline: 145, footrest: "Yes", material: "Mesh" }, ["a headrest that tilts 45 degrees", "a 90 to 145 degree recline", "a 365 lb weight capacity"]),
  F("B0FL7NTDGC", "GABRYLLY Ergonomic Mesh Chair with Footrest", "GABRYLLY footrest", { capacity: 300, recline: 135, arms: "3D", footrest: "Yes", material: "Mesh" }, ["3D armrests", "a footrest", "a 135 degree recline"]),
  F("B0GRZDXRP4", "Ergonomic Mesh Office Chair with Footrest (275 lb)", "275 lb mesh chair", { capacity: 275, recline: 135, lumbar: "Pillow", footrest: "Yes", material: "Mesh" }, ["a footrest", "a lumbar pillow", "a 90 to 135 degree recline"]),
  F("B0HBR1SLVR", "CYKOV Ergonomic Mesh Chair with Footrest", "CYKOV", { capacity: 350, recline: 135, footrest: "Yes", material: "Mesh" }, ["a 350 lb weight capacity", "a footrest", "a 135 degree recline"]),
  F("B0DPHLWNBG", "ELABEST X100 Ergonomic Office Chair", "ELABEST X100", { capacity: 300, seat: "18.3 to 23 in", arms: "5D flip-up", lumbar: "3D adjustable", footrest: "Yes", material: "Mesh" }, ["3D adjustable lumbar support", "5D flip-up armrests", "a footrest"]),
  F("B0GHWLZF39", "Kslysuty Office Chair with Footrest and Massage Lumbar", "Kslysuty", { lumbar: "USB massage", footrest: "Yes" }, ["a USB massage lumbar", "a footrest"]),
  F("B0H6F2X4WF", "GTPOFFICE Office Chair with Flip-Up Arms", "GTPOFFICE", { arms: "Flip-up (90°)" }, ["armrests that flip up 90 degrees"]),
  F("B0CP22DQQS", "Marsail Ergonomic Mesh Office Chair", "Marsail", { capacity: 330, recline: 120, arms: "3D", material: "Mesh" }, ["a 2D headrest", "3D armrests", "a 330 lb weight capacity"]),
  F("B0DKF26SZR", "MOLENTS Ergonomic Office Chair", "MOLENTS", { recline: 120, arms: "3D" }, ["BIFMA X5.1 certification", "3D armrests", "a 90 to 120 degree recline"]),
  F("B0CG6V2XGS", "TRALT Ergonomic Mesh Office Chair", "TRALT", { capacity: 330, lumbar: "Adjustable", material: "Mesh" }, ["adjustable lumbar support", "a listing for users from 5'4\" to 6'2\"", "a 330 lb weight capacity"]),
  F("B0FR981Z25", "CLOUVOU Ergonomic Mesh Office Chair", "CLOUVOU", { recline: 135, material: "Mesh" }, ["a tilt up to 135 degrees", "a mesh back"]),
  F("B07Y8BXBX8", "GABRYLLY Ergonomic Mesh Chair with Flip-Up Arms", "GABRYLLY flip-up", { capacity: 300, recline: 120, seat: "18.9 to 23.6 in", arms: "Flip-up", material: "Mesh" }, ["an 18.9 to 23.6 inch seat height", "flip-up armrests", "a 300 lb weight capacity"]),
]);
