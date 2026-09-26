import type { ArticleView } from "@/lib/homepage";
import type { PcArticle } from "./types";
import { articleHref, categoryLabel } from "./index";

/** Card view for listings. Excerpts use the decision-focused teaser; images are optional (cards go text-led without one). */
export function toCardView(a: PcArticle): ArticleView {
  const img = a.thumbnail ?? a.hero;
  return {
    slug: a.slug,
    href: articleHref(a),
    title: a.title,
    excerpt: a.teaser ?? a.dek,
    image: img?.src,
    imageAlt: img?.alt ?? "",
    eyebrow: `${categoryLabel(a.category)}${a.type === "buying-guide" ? " · Buying Guide" : ""}`,
    author: "",
    date: a.updatedAt ?? "",
    readTime: a.readTime ?? "",
  };
}
