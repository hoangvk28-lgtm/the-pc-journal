import type { InformationalGuide } from "@/lib/pc-content/types";

/**
 * DEVELOPMENT FIXTURES. SAMPLE DATA ONLY.
 *
 * These records exist to exercise the article templates. Product names are
 * deliberately fictional and sources point at example.com. They have status
 * "fixture", are excluded from every public listing and the sitemap, and are
 * only served under /dev/fixtures/* when PCJ_ENABLE_FIXTURES=true (always noindex).
 * Never change their status to "published".
 */

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

export const fixtures = [sampleMinimalGuide];
