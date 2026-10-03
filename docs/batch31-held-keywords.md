# Batch 31 (techbuyersguru "best" list): written and held keywords

Source: `techbuyersguru-best-urls.csv`, 44 rows marked "Has Best = yes" (34 guides, 10 older articles). Batch 31 wrote **27 guides**: 22 PC builds (`data/clusters/builds31*.ts`), 4 fan guides and 1 keyboard and mouse guide (`data/clusters/batch31*.ts`). Nothing was copied from the competitor: part lists, copy and prices all come from this site's reviewed Amazon listings.

## Group A: PC builds (24 rows -> 22 guides)

Every build is a set of reviewed fact sheets that must pass the checks in `data/clusters/builds31-lib.ts` (socket, memory type, memory kit, M.2 slot, board size in the case, graphics card length, power supply wattage with 100W headroom over the chip maker's recommendation, graphics power connector, power supply format, cooler socket kit, cooler height or radiator size) and a total inside the tier. A build that fails a check throws at import. `scripts/pcj-plan-builds.ts` resolves `builds31-plan.ts` into explicit ASINs; the guides never re-plan on their own.

Tiers follow the prices in our own data at the time of writing, not the competitor's names. DDR5 and large SSDs are expensive in this data, so a few tiers moved:

| Competitor build | Our guide | Why the tier differs |
|---|---|---|
| $600 home office | `best-600-home-office-pc-build` | as listed |
| $750 small office compact | `best-750-small-office-compact-pc-build` | as listed |
| $750 small office Mini-ITX | `best-900-mini-itx-office-pc-build` | An AM5 Mini-ITX board plus 16GB of DDR5 does not fit $750 or $850 here |
| $850 budget gaming | `best-850-budget-gaming-pc-build` | as listed |
| $1000 mid-range gaming | `best-1000-mid-range-gaming-pc-build` | as listed |
| $1250 quiet gaming | `best-1250-quiet-gaming-pc-build` | as listed |
| $1500 high-end gaming | `best-1500-high-end-gaming-pc-build` | as listed |
| $1750 advanced gaming | `best-1750-advanced-gaming-pc-build` | as listed |
| $2000 premium gaming | `best-2000-premium-gaming-pc-build` | as listed |
| $2000 high-end creator | `best-2000-high-end-creator-pc-build` | as listed |
| $2500 extreme 4K | `best-2500-extreme-4k-gaming-pc-build` | as listed |
| $3000/$3500 elite RGB and ultimate (two rows) | `best-3000-elite-rgb-gaming-pc-build`, `best-3500-ultimate-gaming-pc-build` | AMD RGB build and an Intel LGA1851 build, so the product sets differ |
| $5000 dream machine | `best-5000-dream-machine-gaming-pc-build` | as listed |
| $10,000 supreme creator | `best-10000-supreme-creator-pc-build` | as listed |
| $1000 content creation | `best-1000-content-creation-pc-build` | Ryzen 7 5700G with integrated graphics: a $1000 build with a card and 32GB of RAM does not fit |
| $1000 stock trading / content creation | `best-1250-stock-trading-pc-build` | A card with four or more listed outputs plus 32GB of DDR4 does not fit $1000 |
| $1000 high-end 4K home theater | `best-1000-home-theater-pc-build` | as listed (integrated graphics, Mini-ITX) |
| $1000 eSports Mini-ITX | `best-1250-compact-mini-itx-gaming-pc-build` | DDR5 Mini-ITX board, SFX-capable case and a card with a stated length do not fit $1000 |
| $1500 high-end Mini-ITX | `best-1500-high-end-mini-itx-gaming-pc-build` | as listed |
| $2000 premium Mini-ITX | `best-2000-premium-mini-itx-gaming-pc-build` | as listed |
| $3000 extreme Mini-ITX | `best-3000-extreme-mini-itx-gaming-pc-build` | as listed |

### Held

- **$500 ultra-compact NUC build.** The cheapest NUC barebones listing found is $510 before memory and storage, so the tier cannot be met, and the listings do not say which SO-DIMM generation, M.2 length or storage slots the barebones take. Nothing to check compatibility against, so no guide.
- **$10,000 Threadripper content creation build.** TRX50 boards are CEB or E-ATX, no case listing states CEB support, and registered DDR5 kits cost more per 32GB than a whole mid-range build here. The case-fit and memory checks cannot be computed from the listings, so no guide.

## Group B: buyer's guides (10 rows -> 1 guide)

| Competitor guide | Decision |
|---|---|
| Keyboards and mice for office and gaming | Written: `best-keyboard-and-mouse-for-office-and-gaming` (wireless combos with a mouse of 3,200 DPI or more, no pick shared with another combo guide beyond two) |
| Video card buyer's guide | Held: `best-graphics-cards` and the per-chip, per-budget and per-resolution guides exist |
| Monitor buyer's guide | Held: `best-gaming-monitor` and its resolution, panel and refresh-rate siblings exist |
| Speaker and headset buyer's guide | Held: `best-pc-speakers`, `best-gaming-headset` and use-case variants exist |
| PC case buyer's guide | Held: `best-pc-cases` and the size, colour and radiator variants exist |
| CPU cooler and fan buyer's guide | Held: `best-cpu-coolers`, `best-air-coolers`, `best-case-fans` and variants exist |
| Pre-built desktops (office and gaming) | Held: gaming pre-builts have many guides; there is no verified office-desktop data (CPU, RAM and ports of business desktops) |
| Laptop buyer's guide | Held: out of scope (no laptop data) |
| Printer buyer's guide | Held: out of scope |
| Wireless networking buyer's guide | Held: out of scope (no router or Wi-Fi data) |

## Group C: older cooler and fan articles (10 rows -> 4 guides)

Written, with 24 newly reviewed fans in `data/categories/fans31.ts` (every figure taken from the listing text; the ARCTIC P12 Pro single and 5-pack and renewed listings were left out for anomalous prices):

- `best-radiator-fans` (static pressure first, using a radiator-specific schema)
- `best-120mm-case-fans`
- `best-140mm-case-fans` (a 140mm schema, so the compatibility text names 140mm mounts)
- `best-cpu-cooler-fans` (merges "CPU heatsink fan shootout" and "120mm/140mm cooler fan shootout")

Held:

- **Black Friday 2021 deals:** deals content, out of scope.
- **360mm AIO shootout:** `best-360mm-aio-coolers` and `best-360mm-aio-cooler` exist.
- **120mm CPU cooler shootout, best on a budget:** `best-cpu-coolers-under-50`, `best-cpu-coolers-under-30` and `best-single-tower-cpu-coolers` exist; a planner trial produced a set of near-identical four-heat-pipe towers with no height or rating data to tell them apart, so it was dropped.
- **Scythe Fuma 2 review:** a single-product review, not a roundup.
- **120mm/140mm case fan shootout:** covered by `best-120mm-case-fans` and `best-140mm-case-fans`.
- **120mm vs 140mm setup:** a comparison, not a roundup.
- **NH-U14S and NH-D15S take on the best:** a comparison, not a roundup.

## Data added

- 8 motherboards (AM4 B550 and LGA1851 Mini-ITX) in `data/categories/builds31-parts.ts`, one corrected CPU sheet (Core i3-14100) in `builds31-extra.ts`, 24 fans in `fans31.ts`.
- Amazon pools appended: `motherboard.json`, `fans.json`, `cooling.json` (air coolers searched but not used), plus `builds31-nuc.json` and `builds31-trx.json` from the held NUC and Threadripper checks.
- GPU recommended system power: where a listing gives no figure, `CHIP_PSU` in `builds31-lib.ts` holds the chip makers' reference recommendations, and the guides say it is a maker recommendation and to check the exact card.

## Known limits

- Many case and graphics card listings give no length or cooler height, so those rows read "Confirm: ..." in the compatibility table instead of passing silently.
- The planner is not re-run for published builds: `builds31-copy.ts` names parts, so re-planning can desynchronise the copy.
- Three pre-existing generic-composer defects were fixed on the way: the truncated "Pass on it if ... mor rules it out" skip line (`lib/pc-compose/generic.ts`), colour variants and pack-size variants of one fan counting as separate picks, and 140mm guides naming 120mm mounts.
