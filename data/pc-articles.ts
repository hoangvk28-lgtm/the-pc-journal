import type { GuideModule, InformationalGuide, PcCategory } from "@/lib/pc-content/types";
import { decisionGuides } from "./pc-publication";

/**
 * Published PC Journal articles. The six research guides keep their existing
 * body text (from pc-publication.ts); only homepage-facing teasers and image
 * records are added here.
 */

const categoryBySlug: Record<string, PcCategory> = {
  "PC Builds": "pc-builds",
  Upgrades: "upgrades",
  Components: "components",
  Monitors: "monitors",
  Peripherals: "peripherals",
};

const images: Record<string, { src: string; alt: string }> = {
  "plan-a-pc-build": { src: "/images/pcj/pc-build.webp", alt: "Open desktop PC case with components laid out on a workbench" },
  "upgrade-an-existing-pc": { src: "/images/pcj/pc-upgrade.webp", alt: "Desktop PC with a graphics card being fitted" },
  "choose-pc-components": { src: "/images/pcj/pc-components.webp", alt: "Motherboard, memory, storage and cooling fans laid out on a desk" },
  "check-a-graphics-card-upgrade": { src: "/images/pcj/pc-upgrade.webp", alt: "Desktop PC with a graphics card being fitted" },
  "choose-a-pc-monitor": { src: "/images/pcj/pc-monitors.webp", alt: "Two desktop monitors on a wooden desk" },
  "choose-a-pc-power-supply": { src: "/images/pcj/pc-components.webp", alt: "PC power supply, motherboard and fans laid out on a desk" },
};

/** What the reader can decide or check after reading. Derived from each guide's own steps. */
const teasers: Record<string, string> = {
  "plan-a-pc-build": "Start from your games, applications and display target, then check CPU support lists, BIOS versions, GPU clearance and PSU connectors before you buy.",
  "upgrade-an-existing-pc": "Record your current parts and the slowdown you see first, so the upgrade you buy addresses the real limit.",
  "choose-pc-components": "What each part is responsible for, and the support lists, slot configurations and clearances to check for each one.",
  "check-a-graphics-card-upgrade": "Check whether a new card fits your case, gets the power connectors it needs and addresses the problem you actually see.",
  "choose-a-pc-monitor": "Match size and resolution to your desk, then confirm your graphics outputs support the refresh rate you want.",
  "choose-a-pc-power-supply": "Confirm form factor, case length and the exact connectors your motherboard and graphics card require.",
};

const related: Record<string, string[]> = {
  "plan-a-pc-build": ["choose-pc-components", "choose-a-pc-power-supply", "choose-a-pc-monitor"],
  "upgrade-an-existing-pc": ["check-a-graphics-card-upgrade", "choose-a-pc-power-supply", "choose-pc-components"],
  "choose-pc-components": ["plan-a-pc-build", "choose-a-pc-power-supply", "check-a-graphics-card-upgrade"],
  "check-a-graphics-card-upgrade": ["upgrade-an-existing-pc", "choose-a-pc-power-supply", "choose-a-pc-monitor"],
  "choose-a-pc-monitor": ["check-a-graphics-card-upgrade", "plan-a-pc-build"],
  "choose-a-pc-power-supply": ["choose-pc-components", "check-a-graphics-card-upgrade", "plan-a-pc-build"],
};

const beforeYouBuy: GuideModule = {
  kind: "callout",
  tone: "note",
  heading: "Before you buy",
  body: "Compatibility can depend on the exact model, hardware revision and firmware version. Use the relevant manufacturer documentation for every part in your planned system. If documentation is unclear, ask the manufacturer or retailer before ordering.",
};

export const publishedGuides: InformationalGuide[] = decisionGuides.map((g) => ({
  slug: g.slug,
  type: "guide",
  status: "published",
  category: categoryBySlug[g.category],
  seoTitle: g.title,
  title: g.title,
  dek: g.summary,
  teaser: teasers[g.slug],
  author: { name: "The PC Journal", url: "/about-the-pc-journal" },
  readTime: g.readTime,
  hero: images[g.slug] ? { ...images[g.slug], caption: "Illustrative image" } : undefined,
  related: related[g.slug],
  modules: [
    { kind: "steps", steps: g.steps.map((s) => ({ title: s.title, body: s.body })) },
    beforeYouBuy,
  ],
}));
