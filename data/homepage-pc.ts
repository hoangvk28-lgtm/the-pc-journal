/**
 * Homepage editorial slots. Slugs are resolved against published articles at
 * render time; anything unpublished is skipped, so slots fill as content ships.
 */

export const heroSlug = "plan-a-pc-build";
export const heroHeadline = "Plan a PC build around the work you actually do";

/** Reading path for newcomers. Each entry names the step it covers and a distinct reason to read. */
export const startHere: { slug: string; step: string; reason: string }[] = [
  { slug: "plan-a-pc-build", step: "Define workload and budget", reason: "Turn your games, applications and display into a target and a complete budget." },
  { slug: "choose-pc-components", step: "Understand component roles", reason: "Learn what each part is responsible for and which constraints it brings." },
  // Step 3 ("Check compatibility") has no dedicated article yet; the two guides above and below cover it.
  { slug: "upgrade-an-existing-pc", step: "Plan a build or an upgrade", reason: "Already own a PC? Find the actual limit before replacing parts." },
];
