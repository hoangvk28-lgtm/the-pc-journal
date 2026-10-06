import type { PcArticle } from "@/lib/pc-content";

const BY_CATEGORY: Record<string, { src: string; alt: string }> = {
  monitors: { src: "/images/pcj/pc-monitors.webp", alt: "Desktop monitors on monitor arms above a wooden desk with keyboards and mice" },
  components: { src: "/images/pcj/pc-components.webp", alt: "PC components laid out on a workbench ready for a build" },
  "pc-builds": { src: "/images/pcj/pc-build.webp", alt: "An assembled desktop PC with the side panel open" },
  upgrades: { src: "/images/pcj/pc-upgrade.webp", alt: "A desktop PC opened up for a hardware upgrade" },
  peripherals: { src: "/images/pcj/pc-peripherals.webp", alt: "A desk setup with a keyboard, mouse and headset beside a monitor" },
};

/** 16:9 editorial hero for a guide: the article's own hero if set, else its category image (illustrative). */
export function guideHero(article: PcArticle): { src: string; alt: string; caption?: string } {
  if (article.hero) return article.hero;
  const h = BY_CATEGORY[article.category] ?? BY_CATEGORY.components;
  return { ...h, caption: "Illustrative image" };
}
