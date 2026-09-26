import type { BuyingGuide, InformationalGuide } from "@/lib/pc-content/types";

/**
 * DEVELOPMENT FIXTURES. SAMPLE DATA ONLY.
 *
 * These records exist to exercise the article templates. Product names are
 * deliberately fictional and sources point at example.com. They have status
 * "fixture", are excluded from every public listing and the sitemap, and are
 * only served under /dev/fixtures/* when PCJ_ENABLE_FIXTURES=true (always noindex).
 * Never change their status to "published".
 */

const sampleSources = [
  { id: "mfr-a", label: "Sample GPU A specification page (placeholder)", url: "https://example.com/sample-gpu-a/specs", publisher: "Example Manufacturer", kind: "manufacturer" as const },
  { id: "mfr-b", label: "Sample GPU B specification page (placeholder)", url: "https://example.com/sample-gpu-b/specs", publisher: "Example Manufacturer", kind: "manufacturer" as const },
  { id: "mfr-c", label: "Sample GPU C Extended Edition specification page (placeholder)", url: "https://example.com/sample-gpu-c/specs", publisher: "Example Manufacturer", kind: "manufacturer" as const },
  { id: "review-1", label: "Independent review of Sample GPU A (placeholder)", url: "https://example.com/reviews/sample-gpu-a", publisher: "Example Review Site", kind: "third-party-test" as const },
  { id: "case-doc", label: "Example case manual, GPU clearance table (placeholder)", url: "https://example.com/case-manual", publisher: "Example Case Maker", kind: "manufacturer" as const },
];

export const sampleBuyingGuide: BuyingGuide = {
  slug: "sample-gpu-buying-guide",
  type: "buying-guide",
  status: "fixture",
  category: "components",
  seoTitle: "SAMPLE: Graphics Cards for 1440p Gaming",
  title: "Sample buying guide: graphics cards for 1440p gaming in a mid-size case",
  dek: "Template fixture with fictional products. It exercises every Best X module, including hidden states for unsupported evidence, scores and retailer links.",
  teaser: "Fixture only.",
  author: { name: "The PC Journal" },
  readTime: "9 min read",
  scope: "Fictional graphics cards for 1440p gaming at high settings in a mid-tower case with a single 8-pin or 16-pin power connector available.",
  researchBasis: "Fixture text: in a real article this states which manufacturer documents and attributed third-party tests were reviewed, and when. No hands-on testing is implied.",
  specColumns: [
    { key: "vram", label: "VRAM", unit: "GB" },
    { key: "length", label: "Card length", unit: "mm" },
    { key: "slots", label: "Slot width" },
    { key: "power", label: "Power connector" },
    { key: "outputs", label: "Display outputs" },
  ],
  products: [
    {
      id: "a",
      model: "Sample GPU A 12GB OC Edition (rev. 2.0, fictional)",
      label: "Best fit for most 1440p builds",
      labelReason: "Fixture reason: the only pick that fits the stated case clearance and power connector while matching the stated workload.",
      verdict: "The sample pick that satisfies every stated constraint in this fixture scenario.",
      bestFor: "1440p high-settings gaming in a mid-tower with at least 300 mm of GPU clearance.",
      skipIf: "Your case clearance is under 300 mm or your power supply lacks a native 8-pin PCIe connector.",
      image: { src: "/images/pcj/pc-upgrade.webp", alt: "Illustrative graphics card photograph (fixture)" },
      specs: {
        vram: { value: 12, sourceId: "mfr-a" },
        length: { value: 285, sourceId: "mfr-a" },
        slots: { value: "2.5-slot", sourceId: "mfr-a" },
        power: { value: "1× 8-pin PCIe", sourceId: "mfr-a" },
        outputs: { value: "3× DisplayPort 1.4a, 1× HDMI 2.1", sourceId: "mfr-a" },
      },
      compatibilityChecks: [
        "Compare the 285 mm card length with your case's documented GPU clearance, including any front radiator.",
        "Confirm your power supply has a native 8-pin PCIe connector.",
        "A 2.5-slot cooler blocks the slot directly below it.",
      ],
      evidence: [
        { claim: "Board length and power connector as listed by the manufacturer.", basis: "manufacturer-spec", sourceId: "mfr-a" },
        { claim: "Fixture: reported results at 1440p from an attributed review.", basis: "third-party-test", sourceId: "review-1", conditions: "Fixture conditions: stated test CPU, driver version, 1440p, high preset, upscaling off." },
        { claim: "Fixture: an unsourced test claim. This must be hidden and flagged by validation.", basis: "third-party-test" },
      ],
      pros: ["Fits most mid-towers", "Single 8-pin connector", "Four display outputs"],
      cons: ["2.5-slot cooler blocks a slot", "Fixture: no measured noise data"],
      alternative: { model: "Sample GPU B 8GB (fictional)", tradeOff: "Shorter and cheaper, but less VRAM headroom for the stated workload." },
      retailer: { retailer: "amazon", url: "https://www.amazon.com/dp/B000000000" },
      score: 8.7,
    },
    {
      id: "b",
      model: "Sample GPU B 8GB (fictional)",
      label: "Best for compact cases",
      labelReason: "Fixture reason: the shortest listed card in this sample set.",
      verdict: "A shorter sample card for cases where clearance, not budget, is the limit.",
      bestFor: "Compact cases with 240 to 280 mm of GPU clearance.",
      skipIf: "You play titles that the stated workload says need more than 8 GB of VRAM at your settings.",
      specs: {
        vram: { value: 8, sourceId: "mfr-b" },
        length: { value: 228, sourceId: "mfr-b" },
        slots: { value: "2-slot", sourceId: "mfr-b" },
        power: { value: "1× 8-pin PCIe", sourceId: "mfr-b" },
        outputs: { value: "3× DisplayPort 1.4a, 1× HDMI 2.1", sourceId: "mfr-b" },
      },
      compatibilityChecks: ["Check the case manual for GPU clearance with the front fans installed."],
      evidence: [{ claim: "Dimensions as listed by the manufacturer.", basis: "manufacturer-spec", sourceId: "mfr-b" }],
      pros: ["228 mm long", "Two-slot cooler"],
      cons: ["8 GB of VRAM"],
    },
    {
      id: "c",
      model: "Sample GPU C Extended Edition 16GB Triple-Fan Overclocked (fictional, very long model name to test wrapping)",
      verdict: "Listed without a label because this fixture gives no defensible reason for one.",
      bestFor: "Full-tower cases with more than 340 mm of GPU clearance.",
      skipIf: "Your power supply has no native 16-pin connector and you do not want to rely on an adapter.",
      specs: {
        vram: { value: 16, sourceId: "mfr-c" },
        length: { value: 336, sourceId: "mfr-c" },
        slots: { value: "3.5-slot", sourceId: "mfr-c" },
        power: { value: "1× 16-pin (12V-2x6)", sourceId: "mfr-c" },
        outputs: { value: "3× DisplayPort 2.1, 1× HDMI 2.1", sourceId: "mfr-c" },
      },
      compatibilityChecks: ["Confirm a native 16-pin (12V-2x6) cable or the adapter the manufacturer supplies.", "Check sag support and clearance for a 3.5-slot cooler."],
      evidence: [{ claim: "Editorial interpretation: overkill for the stated 1440p scope.", basis: "editorial" }],
      pros: ["16 GB of VRAM", "DisplayPort 2.1 outputs"],
      cons: ["336 mm long", "3.5-slot cooler", "Needs a 16-pin connector"],
    },
  ],
  compatibilityChecklist: [
    "Measure GPU clearance with the case manual, including front radiators and drive cages.",
    "Count the native PCIe power connectors on your exact power supply model.",
    "Confirm slot width against the slots you need below the card.",
    "Check your monitor's inputs match the card's outputs at the refresh rate you want.",
  ],
  howWeChose: [
    { title: "Scope first", body: "Fixture text: picks were limited to cards that match the stated resolution, case and connector scope." },
    { title: "Documentation", body: "Fixture text: dimensions and connectors come from manufacturer pages, cited per value." },
    { title: "Attributed tests", body: "Fixture text: performance evidence is shown only with its source and test conditions." },
  ],
  whatToLookFor: [
    { title: "Clearance before speed", body: "Fixture text: a faster card that does not fit is not an option." },
    { title: "Power connectors", body: "Fixture text: check the exact PSU model, not its wattage label." },
  ],
  alsoConsidered: [{ model: "Sample GPU D (fictional)", reason: "Excluded in this fixture because its manufacturer page lists no board length." }],
  conclusion: {
    summary: "Fixture conclusion: choose by the constraint that limits you first.",
    paths: [
      { if: "Your case has at least 300 mm of clearance", then: "Sample GPU A" },
      { if: "Your case is compact", then: "Sample GPU B" },
    ],
  },
  limitations: ["All products and sources in this fixture are fictional.", "The score on Sample GPU A is intentionally hidden because no scoring system is documented."],
  sources: sampleSources,
  related: ["check-a-graphics-card-upgrade", "choose-a-pc-power-supply", "a-draft-that-does-not-exist"],
};

/** Minimal guide: required fields only, no optional modules, no hero image, no dates. */
export const sampleMinimalGuide: InformationalGuide = {
  slug: "sample-minimal-guide",
  type: "guide",
  status: "fixture",
  category: "upgrades",
  seoTitle: "SAMPLE: Minimal guide",
  title: "Sample guide: should you upgrade your GPU or CPU first?",
  dek: "Template fixture with only required fields. It checks that the guide template renders cleanly without a hero, dates, sources or related articles.",
  modules: [
    { kind: "key-takeaway", body: "Fixture text: the answer depends on which part limits your stated workload. Check it before buying either." },
    {
      kind: "choose-if",
      heading: "Choose this if",
      options: [
        { choice: "Graphics card first", when: ["Fixture: GPU usage stays near its limit in your game at your settings.", "Fixture: you are raising resolution or refresh rate."] },
        { choice: "CPU first", when: ["Fixture: GPU usage is well below its limit while frame pacing is poor.", "Fixture: the workload is simulation-heavy or CPU-bound by design."] },
      ],
    },
  ],
};

export const fixtures = [sampleBuyingGuide, sampleMinimalGuide];
