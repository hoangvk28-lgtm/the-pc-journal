import type { CategorySchema, Fact, GenericArticleConfig } from "@/lib/pc-compose/generic";
import { caseFacts, caseSchema } from "@/data/categories/cases";

/**
 * Batch 5: PC cases. Asin order = editorial rank; takes, intro and bottom line
 * are written per article from the fact sheet in data/categories/cases.ts.
 */
const updatedAt = "2026-09-26";
const L = (badge: string, reason: string, bestFor: string) => ({ badge, reason, bestFor });
const s = caseSchema, f = caseFacts;

export const batch5: { cfg: GenericArticleConfig; schema: CategorySchema; facts: Record<string, Fact> }[] = [
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-pc-cases", category: "components", updatedAt,
      seoTitle: "Best PC Cases for Airflow and Fit", title: "The Best PC Cases", breadcrumbLabel: "Best PC Cases", mainKeyword: "best pc case",
      dek: "Six ATX mid-towers compared on GPU clearance, radiator support, included fans and layout, from airflow-first designs to a dual-chamber showcase.",
      metaDescription: "Six ATX mid-tower PC cases compared on GPU clearance, radiator support, included fans and layout, so you can pick one that fits your parts and cooling.",
      teaser: "Check GPU length and radiator positions first; included fans decide how much more you spend.",
      asins: ["B0BRP58KHT", "B0DWF95QP7", "B09V878FXQ", "B0DQPPKNSS", "B0DPJ9FD5N", "B0DGXR6TTD"],
      labels: {
        B0BRP58KHT: L("Best Airflow Mid-Tower", "two 160mm front fans and 392mm of GPU room", "Gaming builds with a large graphics card."),
        B0DWF95QP7: L("Most Fans Included", "five fans in the box, including two 170mm front fans", "Builders who want a finished cooling layout on day one."),
        B09V878FXQ: L("Best Looking Airflow Case", "a walnut front with mesh side panels", "A living-room PC that should look like furniture."),
        B0DQPPKNSS: L("Best Dual-Chamber Pick", "420mm radiator support with four fans included", "Showcase builds with a large AIO."),
        B0DPJ9FD5N: L("Most Modular", "a FRAME design with swappable front I/O and InfiniRail fan mounts", "Builders who like to change their layout over time."),
        B0DGXR6TTD: L("Best for Vertical GPUs", "PCIe slots that rotate 90 degrees", "Builds that show the graphics card face-on."),
      },
      takes: {
        B0BRP58KHT: "The Lancool 216 is built around two large 160mm front fans and a clear path to the graphics card, with 392mm of GPU room. Radiators up to 360mm mount on top or at the bottom, which leaves the front free for intake.",
        B0DWF95QP7: "The Lancool 217 ships with five fans, more than any other mid-tower here, so it needs nothing extra before first boot. Its two 170mm front fans can be raised to point at the CPU, and the PSU can mount in two orientations.",
        B09V878FXQ: "The North pairs a walnut front with mesh side panels, and it still takes a 355mm graphics card and a 360mm front radiator. Two 140mm Aspect fans come fitted, enough for a mid-range build. Seven expansion slots and support for ATX, Micro-ATX and Mini-ITX boards keep options open, but GPU room drops to 300mm with a 360mm front radiator.",
        B0DQPPKNSS: "The H9 Flow moves the power supply and drives into a rear chamber, leaving the main compartment for the motherboard, GPU and radiators up to 420mm. Four fans are included, three of them angled 140mm intakes.",
        B0DPJ9FD5N: "The 4000D RS is Corsair's modular FRAME take on its best-known mid-tower: the front I/O panel can be swapped and the InfiniRail mount lets you slide fans to where you need them. Three RS fans are pre-installed. Removing the rail opens side fan mounting, and roof fans up to 140mm fit. Corsair does not list a GPU length or radiator figure in this listing, so check its spec sheet before buying.",
        B0DGXR6TTD: "The Pure Base 501 Airflow is a quieter-minded be quiet! design whose expansion slots rotate for a vertical graphics card. It takes a 360mm radiator at the front and a 240mm on top.",
      },
      intro: [
        "A PC case decides which graphics card and cooler you can use, how much air reaches them and how easy the build is. Most people need an ATX mid-tower, and the differences are in GPU room, radiator positions and how many fans come in the box.",
        `We compared six mid-towers on listed clearances, radiator support, included fans and layout. It is a research-based comparison drawn from maker specifications; we have not built in these mid-towers.`,
      ],
      bottomLine: [
        "The Lian Li Lancool 216 is the airflow pick, the Lancool 217 comes most complete with five fans, and the Fractal North is the one to choose for looks.",
        "The NZXT H9 Flow suits dual-chamber showcase builds, the Corsair 4000D RS suits tinkerers, and the be quiet! Pure Base 501 Airflow handles vertical GPU layouts.",
      ],
      priorityCriteria: ["gpu-fit", "airflow"], related: ["best-budget-pc-cases", "best-tempered-glass-pc-cases", "plan-a-pc-build", "choose-pc-components"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-budget-pc-cases", category: "components", updatedAt,
      seoTitle: "Best Budget PC Cases Under $70", title: "The Best Budget PC Cases Under $70", breadcrumbLabel: "Best Budget PC Cases", mainKeyword: "best budget pc case",
      dek: "Six PC cases under about $70 compared on included fans, radiator support, GPU room and front USB-C, from quiet closed panels to glass showcases.",
      metaDescription: "Six budget PC cases under about $70 compared on included fans, 360mm radiator support, GPU clearance and front USB-C, for a low-cost build that still fits.",
      teaser: "Count the fans in the box: a cheap case with none can cost more once it is ready to use.",
      asins: ["B0D5PHHCK5", "B0D2MK6NML", "B0GBY1GSDX", "B086YDDV6F", "B0DMPFLHJZ", "B0GWK8BPG3"],
      labels: {
        B0D5PHHCK5: L("Best Budget Overall", "420mm GPU room, 175mm cooler height and three fans", "A budget gaming build with a big graphics card."),
        B0D2MK6NML: L("Best Airflow for Less", "a perforated front and PSU shroud feeding air to the GPU", "Budget builds that prioritise GPU temperatures."),
        B0GBY1GSDX: L("Best with USB-C", "front USB-C with three ARGB fans included", "Builders who want modern front I/O on a budget."),
        B086YDDV6F: L("Quietest Budget Pick", "sound-dampening foam on closed panels", "A quiet office or study PC."),
        B0DMPFLHJZ: L("Best for Hidden-Connector Boards", "BTF hidden-connector motherboard support", "Clean builds on ASUS BTF boards."),
        B0GWK8BPG3: L("Cheapest Pick", "the lowest price here with 366mm GPU room", "Micro-ATX builds on the tightest budget."),
      },
      takes: {
        B0D5PHHCK5: "The Montech XR lists the most complete set of figures in this price range: 420mm for the GPU, 175mm for the cooler and 230mm for the power supply. Three ARGB fans come fitted, and the glass front and side show off the build.",
        B0D2MK6NML: "The H5 Flow is NZXT's compact mid-tower, with two fans included and a perforated PSU shroud that lets air reach the bottom of the graphics card. It takes a 360mm radiator at the front.",
        B0GBY1GSDX: "The 3200D RS is Corsair's lowest-cost mid-tower here, yet it has a front USB-C port, three ARGB fans and a GPU support arm. Radiators up to 360mm fit in the roof.",
        B086YDDV6F: "The XT Pro Silent swaps glass for closed panels lined with sound-dampening foam, which suits a PC that sits near you. Three M25 fans come fitted, and a 360mm radiator fits on top.",
        B0DMPFLHJZ: "The A31 is built for ASUS BTF motherboards, which hide their connectors on the back, and it has glass on both sides. It has support for 360mm AIOs but does not state an included fan count.",
        B0GWK8BPG3: "The Q300L V3 is a Micro-ATX case that still fits a 366mm graphics card and a 178mm tower cooler. Its radiator support stops at 240mm, the trade for its size and price.",
      },
      intro: [
        "Budget cases have caught up on clearance: most under $70 now fit large graphics cards and a 360mm radiator. What separates them is how many fans come in the box, front I/O and noise.",
        `We compared six cases priced under about $70 at the time of writing. This research-based comparison uses maker specifications and Amazon listings rather than our own builds.`,
      ],
      bottomLine: [
        "The Montech XR is the most complete budget case, the NZXT H5 Flow favours GPU airflow, and the Corsair 3200D RS adds front USB-C.",
        "The Phanteks XT Pro Silent is the quiet choice, the ASUS A31 suits BTF boards, and the Cooler Master Q300L V3 is the cheapest way to house a Micro-ATX build.",
      ],
      priorityCriteria: ["airflow", "gpu-fit"], related: ["best-pc-cases", "best-micro-atx-cases", "plan-a-pc-build", "best-cpu-coolers"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-micro-atx-cases", category: "components", updatedAt,
      seoTitle: "Best Micro-ATX Cases", title: "The Best Micro-ATX Cases", breadcrumbLabel: "Best Micro-ATX Cases", mainKeyword: "best micro atx case",
      dek: "Six Micro-ATX cases compared on GPU clearance, radiator support, volume and power supply options, from a 21L box to a 435mm-GPU tower.",
      metaDescription: "Six Micro-ATX PC cases compared on GPU length, 360mm radiator support, case volume and PSU options, to build smaller without losing a big graphics card.",
      teaser: "Micro-ATX cases now take full-length graphics cards; check the PSU format and radiator position first.",
      asins: ["B0DFS88R2L", "B0GSWBHYJS", "B0GX5DM6KB", "B0B99HTD3B", "B0BQJ9TSP3", "B0GWDTKZ9V"],
      labels: {
        B0DFS88R2L: L("Best Micro-ATX Case", "415mm GPU room and a 360mm radiator in 26.3L", "A compact gaming build with a large graphics card."),
        B0GSWBHYJS: L("Most GPU Room", "435mm of GPU clearance with front USB-C", "The longest graphics cards in a Micro-ATX build."),
        B0GX5DM6KB: L("Smallest Pick", "a 21.3L volume with two fans included", "Builders who want the smallest Micro-ATX footprint."),
        B0B99HTD3B: L("Best Mesh Airflow", "mesh panels with over 57,000 holes", "Airflow-first compact builds."),
        B0BQJ9TSP3: L("Best for ATX Power Supplies", "ATX or SFX units up to 220mm long", "Builders reusing a long ATX power supply."),
        B0GWDTKZ9V: L("Best Glass Micro-ATX", "a glass side and front with three reverse-rotor fans", "A compact showcase build."),
      },
      takes: {
        B0DFS88R2L: "The A3-mATX fits a 415mm graphics card and a 360mm radiator into 26.3 litres, and the power supply can sit at the front or the side. ATX, SFX and SFX-L units are all listed.",
        B0GSWBHYJS: "The D33 offers 435mm of GPU room and a 172mm cooler limit, the most generous figures in this Micro-ATX group. It also takes back-connect mATX BTF boards and has a front USB-C port.",
        B0GX5DM6KB: "The B4-mATX is the smallest case here at 21.3 litres and still takes a 358mm graphics card. Choosing an SFX power supply frees room for a 360mm AIO; an ATX unit must be 140mm or shorter.",
        B0B99HTD3B: "The Prime AP201 wraps a 33-litre frame in fine mesh for airflow on every side. It takes 338mm graphics cards and a 360mm radiator, with a 32mm gap behind the tray for cables.",
        B0BQJ9TSP3: "The D31 Mesh takes ATX or SFX power supplies up to 220mm long and a 168mm tower cooler. Its GPU limit runs from 330mm to 400mm depending on how you lay out the case.",
        B0GWDTKZ9V: "The 2800X RS-R puts three reverse-rotor intake fans in its side panel so the lit side faces the glass. It has 410mm of GPU room in a Micro-ATX footprint.",
      },
      intro: [
        "Micro-ATX cases save desk space and cost less than most mid-towers, and the best of them now take full-length graphics cards and 360mm radiators. The trade-offs are power supply format, cooler height and fan count.",
        `We compared six Micro-ATX cases on listed clearances, radiator support, volume and power supply options. The comparison is research-based, taken from maker specifications, not from builds of our own.`,
      ],
      bottomLine: [
        "The Lian Li A3-mATX is the best balance of size and support, the JONSBO D33 has the most GPU room, and the Lian Li B4-mATX is the smallest.",
        "The ASUS Prime AP201 is the mesh airflow choice, the JONSBO D31 Mesh suits long ATX power supplies, and the Corsair 2800X RS-R is the compact glass pick.",
      ],
      priorityCriteria: ["psu-form", "gpu-fit"], related: ["best-mini-itx-cases", "best-cube-pc-cases", "best-budget-pc-cases", "plan-a-pc-build"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-mini-itx-cases", category: "components", updatedAt,
      seoTitle: "Best Mini-ITX Cases for SFF Builds", title: "The Best Mini-ITX Cases", breadcrumbLabel: "Best Mini-ITX Cases", mainKeyword: "best mini itx case",
      dek: "Six Mini-ITX cases compared on volume, GPU length, cooler height and power supply format, from a 15L mesh box to a 360mm-radiator tower.",
      metaDescription: "Six Mini-ITX cases compared on volume, GPU length, CPU cooler height and SFX or ATX power supply support, to plan a small form factor build that fits.",
      teaser: "In small cases, cooler height and the power supply format decide the build before the GPU does.",
      asins: ["B0CT7MDNHH", "B0FFBC7QMP", "B0F69PMFL1", "B09DKPXSFJ", "B0BN696NKQ", "B0DCW41WGB"],
      labels: {
        B0CT7MDNHH: L("Best Mini-ITX Case", "357mm GPU room and a 280mm radiator in 18.25L", "A first small form factor gaming build."),
        B0FFBC7QMP: L("Smallest Pick", "a 15L volume with a PCIe 5.0 riser included", "Experienced builders chasing the smallest footprint."),
        B0F69PMFL1: L("Best for 360mm AIOs", "360mm radiator support with SFX or ATX power supplies", "Mini-ITX builds with a high-power CPU."),
        B09DKPXSFJ: L("Best Premium Design", "an 8mm aluminium front with walnut wood", "A living-room PC that has to look good."),
        B0BN696NKQ: L("Best Fabric Design", "a fabric-wrapped exterior with a 180mm top fan", "A quiet-looking PC in a shared room."),
        B0DCW41WGB: L("Best Small Showcase", "270-degree curved glass with a wood veneer", "Compact builds with a short graphics card."),
      },
      takes: {
        B0CT7MDNHH: "The NR200P V2 is the easiest way into small form factor: 18.25 litres, a 357mm GPU limit and a top 280mm radiator position. You choose glass or a vented steel side panel, but it needs an SFX power supply.",
        B0FFBC7QMP: "The Meshroom S V2 is the smallest case here at 15 litres and ships with a PCIe 5.0 riser. The 353mm GPU figure needs its optional 30mm to 50mm feet, and air coolers must be 74mm tall or less.",
        B0F69PMFL1: "The Tower 250 stands upright and takes a 360mm radiator, rare for Mini-ITX, with an SFX bracket preinstalled and ATX support too. Two 120mm fans come fitted on top as exhaust.",
        B09DKPXSFJ: "The Terra wraps a small build in anodised aluminium and walnut, with a stepless spine that shifts 30mm between CPU and GPU space. It takes 322mm graphics cards and has a 20Gbps USB-C port.",
        B0BN696NKQ: "The Mood hides its hardware behind fabric and cools it with a single 180mm top fan. It takes a 325mm GPU and a 280mm radiator, but air coolers stop at 114mm.",
        B0DCW41WGB: "The TK-0 shows its hardware through 270 degrees of curved glass trimmed in wood veneer. Its 230mm GPU limit suits short cards, and it still takes a 137mm tower cooler.",
      },
      intro: [
        "Mini-ITX cases range from shoebox-sized boxes to small towers, and each forces a different set of trade-offs. Cooler height, power supply format and GPU length decide what you can put inside.",
        `We compared six Mini-ITX cases on listed volume, clearances and power supply support. Figures come from maker specifications; this is a research-based comparison, and we did not assemble systems in these cases.`,
      ],
      bottomLine: [
        "The Cooler Master NR200P V2 is the easiest small form factor case to build in, the SSUPD Meshroom S V2 is the smallest, and the Thermaltake Tower 250 takes a 360mm AIO.",
        "The Fractal Terra and Mood are the design-led picks, and the JONSBO TK-0 suits a compact glass build with a short graphics card.",
      ],
      priorityCriteria: ["cooler-fit", "psu-form"], related: ["best-micro-atx-cases", "best-cube-pc-cases", "best-low-profile-cpu-coolers", "plan-a-pc-build"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-full-tower-cases", category: "components", updatedAt,
      seoTitle: "Best Full Tower PC Cases", title: "The Best Full Tower PC Cases", breadcrumbLabel: "Best Full Tower Cases", mainKeyword: "best full tower case",
      dek: "Six full-tower and large cases compared on radiator support, included fans and motherboard size, for E-ATX boards, custom loops and big GPUs.",
      metaDescription: "Six full-tower PC cases compared on radiator support up to 480mm, included fans and E-ATX board support, for custom loops, multiple radiators and big GPUs.",
      teaser: "Only buy a full tower if you need several large radiators, an E-ATX board or many drives.",
      asins: ["B0CJCK95ZC", "B0DDNS2SY3", "B094442NL5", "B09BQLD8ZK", "B086YS7CZK", "B0D9KG1GD9"],
      labels: {
        B0CJCK95ZC: L("Best Full Tower", "413mm GPU room and a 420mm front radiator", "A large air or AIO build that should look understated."),
        B0DDNS2SY3: L("Most Fans Included", "six fans in the box", "Builders who want a complete airflow setup without buying fans."),
        B094442NL5: L("Best for Multiple Radiators", "room for three 360mm radiators at once", "Custom loops and dual-AIO builds."),
        B09BQLD8ZK: L("Best Air Cooling", "two 180mm and three 140mm fans included", "High-power air-cooled builds."),
        B086YS7CZK: L("Best Showcase Full Tower", "near-seamless glass with rear-connect board support", "Custom-loop showpieces."),
        B0D9KG1GD9: L("Largest Radiator Support", "480mm radiators at the front and roof", "Extreme custom loops."),
      },
      takes: {
        B0CJCK95ZC: "The North XL scales Fractal's wood-fronted design up to E-ATX boards, 413mm graphics cards and a 420mm front radiator. Three 140mm Aspect fans come fitted, and a 360mm radiator can go on top at the same time as the front one. With that 420mm front radiator installed, GPU room drops to 380mm.",
        B0DDNS2SY3: "The Flux Pro includes six fans, the most in this guide, and takes a 420mm and a 360mm radiator together. Two reverse fans sit on the PSU shroud to feed the graphics card, and a display shows CPU and GPU temperatures. The power supply mounts rotated 90 degrees, and the case takes E-ATX boards.",
        B094442NL5: "The 7000D Airflow is built for liquid cooling, with room for three 360mm or two 420mm radiators at once. Three 140mm fans and a PWM repeater are included, and 30mm behind the tray eases cable work. A hinged front door gives access to the intake filters, and the interior takes up to twelve 120mm or seven 140mm fans.",
        B09BQLD8ZK: "The Torrent is built around big fans: two 180mm and three 140mm units come in the box. It takes boards up to SSI-EEB, and this version has a solid side panel. Fractal lists the fan positions as movable, so the layout can change with the build. It suits an air-cooled workstation more than a showcase.",
        B086YS7CZK: "The NV9 MKII centres the motherboard behind near-seamless glass with fans around it, and it supports rear-connect boards. It has 420mm and 280mm radiator mounts and 65mm of bottom intake clearance.",
        B0D9KG1GD9: "The 9000D is a super full tower with mounts for 18 120mm fans and 480mm radiators at the front and roof. It is the case for dual-loop builds that nothing smaller can hold, with further radiator mounts of 360mm on the side and 240mm at the rear. The maker doesn't state an included fan count, so budget for fans on top of the case price.",
      },
      intro: [
        "Full towers make sense when a build outgrows a mid-tower: several large radiators, an E-ATX or SSI-EEB board, or a custom loop with room to work. For a single graphics card and one AIO, a mid-tower is usually enough.",
        `We compared six large cases on listed radiator support, included fans and motherboard support. All figures are the makers' own; this is a research-based roundup rather than a hands-on test.`,
      ],
      bottomLine: [
        "The Fractal North XL is the best all-round large case, the Antec Flux Pro comes with the most fans, and the Corsair 7000D Airflow suits multi-radiator builds.",
        "The Fractal Torrent is the air-cooling pick, the Phanteks NV9 MKII is the showcase, and the Corsair 9000D is for the largest custom loops.",
      ],
      priorityCriteria: ["radiator", "motherboard"], related: ["best-pc-cases", "best-360mm-aio-coolers", "plan-a-pc-build", "choose-pc-components"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-cube-pc-cases", category: "components", updatedAt,
      seoTitle: "Best Cube PC Cases", title: "The Best Cube PC Cases", breadcrumbLabel: "Best Cube PC Cases", mainKeyword: "best cube pc case",
      dek: "Five cube and compact dual-chamber cases compared on GPU room, radiator support, fans and glass, for Micro-ATX builds that sit on the desk.",
      metaDescription: "Five cube and compact dual-chamber PC cases compared on GPU clearance, radiator support, included fans and glass, for a Micro-ATX build that sits on a desk.",
      teaser: "Cube cases trade height for width; check desk depth and motherboard support before you buy.",
      asins: ["B0D6WHM5NK", "B0GLP7LRHM", "B0FWV595Q4", "B0CWQK3LMB", "B0CKVZRKRH"],
      labels: {
        B0D6WHM5NK: L("Best Cube Case", "360mm radiators in the roof and bottom plus a 240mm side mount", "A compact liquid-cooled showcase."),
        B0GLP7LRHM: L("Best Value Cube", "410mm GPU room at a low price", "Budget cube builds with a long graphics card."),
        B0FWV595Q4: L("Most Fans Included", "four ARGB fans in the box", "A lit showcase build without buying fans."),
        B0CWQK3LMB: L("Most Portable", "a detachable carrying handle in a 20L case", "LAN parties and moving between rooms."),
        B0CKVZRKRH: L("Best Curved-Glass Design", "double-curved 4mm glass with an aluminium shell", "Desk builds with a short graphics card."),
      },
      takes: {
        B0D6WHM5NK: "The 2500X is Corsair's small dual-chamber case, with wraparound glass and room for nine 120mm fans. Radiators up to 360mm fit in the roof and bottom, which is rare in a Micro-ATX cube, and a 240mm radiator fits on the side. Its dual-chamber layout keeps the power supply and cables out of sight.",
        B0GLP7LRHM: "The O11 Vision-M brings Lian Li's dual-chamber layout to Micro-ATX, with 410mm of GPU room and a 360mm top radiator. It does not take ATX or back-connect boards, and only one fan comes fitted.",
        B0FWV595Q4: "The King 15 PRO puts four ARGB fans behind a 15-degree curved glass panel, with air moving from bottom to top. Its roof takes a 360mm radiator up to 84mm thick.",
        B0CWQK3LMB: "The Z20 is a 20-litre Micro-ATX box with a detachable handle and 2mm steel panels. It takes a 363mm graphics card, a 163mm cooler and ATX, SFX or SFX-L power supplies.",
        B0CKVZRKRH: "The TK-1 is the most sculpted case here, with double-curved glass over an aluminium shell. Its 280mm GPU limit suits shorter cards, but it takes a 165mm tower cooler and a 220mm ATX power supply.",
      },
      intro: [
        "Cube cases sit wide and low, often splitting the power supply into a second chamber so the main compartment stays clear. Most take Micro-ATX boards, and GPU room varies widely between models.",
        `We compared five cube and compact dual-chamber cases on listed clearances, radiator support, fans and glass. This is a research-based comparison of maker specifications; we did not build in these cubes ourselves.`,
      ],
      bottomLine: [
        "The Corsair 2500X is the most capable cube for liquid cooling, the Lian Li O11 Vision-M is the value pick, and the Montech King 15 PRO comes with the most fans.",
        "The JONSBO Z20 is the portable choice, and the JONSBO TK-1 is the design-led pick for a shorter graphics card.",
      ],
      priorityCriteria: ["motherboard", "radiator"], related: ["best-micro-atx-cases", "best-mini-itx-cases", "best-tempered-glass-pc-cases", "plan-a-pc-build"],
    },
  },
  {
    schema: s, facts: f,
    cfg: {
      slug: "best-tempered-glass-pc-cases", category: "components", updatedAt,
      seoTitle: "Best Tempered Glass PC Cases", title: "The Best Tempered Glass PC Cases", breadcrumbLabel: "Best Tempered Glass Cases", mainKeyword: "best tempered glass pc case",
      dek: "Six panoramic glass cases compared on how they breathe, GPU room, radiator support and included fans, so a showcase build still stays cool.",
      metaDescription: "Six tempered glass PC cases compared on airflow paths, GPU clearance, radiator support and included fans, so a panoramic showcase build still runs cool.",
      teaser: "A glass front needs another way in for air; check the side and bottom intake before the looks.",
      asins: ["B0CN95G1YL", "B0CZV22HDF", "B0D73VS65B", "B0C89FCDFP", "B0BQP93GYX", "B0FWWB2MPK"],
      labels: {
        B0CN95G1YL: L("Best Glass Case", "420mm GPU room with six fans and a 10-port controller", "A panoramic build that should run cool out of the box."),
        B0CZV22HDF: L("Best for Back-Connect Boards", "reverse-connection board support with 360mm roof and side radiators", "Cable-free showcase builds."),
        B0D73VS65B: L("Best for Two Radiators", "dual 360mm plus 240mm radiator support", "Liquid-cooled showcase builds."),
        B0C89FCDFP: L("Best Compact Showcase", "three angled intake fans in a compact dual-chamber case", "Smaller desks that still want wraparound glass."),
        B0BQP93GYX: L("Best Vertical GPU Showcase", "a vertical GPU layout with the riser included", "Builds that show the graphics card face-on."),
        B0FWWB2MPK: L("Budget Glass Pick", "curved panoramic glass on a dual-chamber layout", "A glass build on a tighter budget."),
      },
      takes: {
        B0CN95G1YL: "The King 95 PRO curves 4mm glass around the front and side and ships with six fans on a 10-port controller, drawing air in from the side and bottom. It has 420mm for the GPU and 175mm for the cooler.",
        B0CZV22HDF: "The 3500X wraps its front and side in glass and supports reverse-connection motherboards that hide their cables. Radiators up to 360mm fit in the roof and on the side, and it takes boards from Mini-ITX to E-ATX.",
        B0D73VS65B: "The Light Base 600 DX pairs a full glass front and side with dual 360mm plus 240mm radiator support. It fits a 400mm graphics card and a 170mm tower cooler, with an anti-sag bracket included. The dual radiator support means a 360mm CPU cooler and a 240mm GPU loop can run side by side, though the maker doesn't state a fan count.",
        B0C89FCDFP: "The H6 Flow is a compact dual-chamber case whose three included 120mm fans sit at an angle to push air at the GPU. Its top and side panels are patterned for airflow alongside the glass. Moving the power supply into the rear chamber keeps the main compartment clear, which suits a tidy build on a smaller desk than the H9 Flow needs.",
        B0BQP93GYX: "The Y40 turns the graphics card to face the glass using an included riser, and a side 280mm radiator can sit beside it. Two fans come fitted, one under the PSU shroud and one at the rear.",
        B0FWWB2MPK: "The King 45 brings Montech's curved panoramic glass and dual-chamber layout to a lower price. Its roof takes a 360mm radiator up to 84mm thick; the maker doesn't state a fan count.",
      },
      intro: [
        "Tempered glass cases put the build on show, but a glass front blocks the usual intake. The better designs pull air from the side or bottom instead, and some ship with enough fans to do it.",
        `We compared six glass cases on listed airflow paths, clearances, radiator support and included fans. We based this research-based comparison on maker specifications, not on builds of our own.`,
      ],
      bottomLine: [
        "The Montech King 95 PRO is the most complete glass case, the Corsair 3500X suits back-connect builds, and the be quiet! Light Base 600 DX takes two radiators.",
        "The NZXT H6 Flow is the compact choice, the HYTE Y40 shows off a vertical graphics card, and the Montech King 45 is the budget glass option.",
      ],
      priorityCriteria: ["airflow", "radiator"], related: ["best-pc-cases", "best-cube-pc-cases", "best-360mm-aio-coolers", "choose-pc-components"],
    },
  },
];
