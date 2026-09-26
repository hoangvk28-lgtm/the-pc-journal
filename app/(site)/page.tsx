import type { Metadata } from "next";
import { FeaturedStory } from "@/components/editorial/FeaturedStory";
import { ShoppingCategoryStrip } from "@/components/editorial/ShoppingCategoryStrip";
import { LatestGuides } from "@/components/editorial/LatestGuides";
import { StartHereList } from "@/components/editorial/StartHereList";
import { DepartmentSection } from "@/components/editorial/DepartmentSection";
import { ReviewMethodologyBand } from "@/components/editorial/ReviewMethodologyBand";
import { heroHeadline, heroSlug, startHere } from "@/data/homepage-pc";
import { articleHref, categoryHref, categoryLabel, getPublishedArticle, publishedArticles, type PcCategory } from "@/lib/pc-content";
import { toCardView } from "@/lib/pc-content/views";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "The PC Journal",
  description: "Research-based PC guides that help you choose compatible hardware for your workload and budget, and decide which build or upgrade makes sense.",
  path: "/",
});

/** Homepage topic modules. Grouped headings are visual only; every category keeps its own destination. */
const topicGroups: { id: string; title: string; categories: PcCategory[] }[] = [
  { id: "components", title: "Components", categories: ["components"] },
  { id: "builds-upgrades", title: "PC Builds & Upgrades", categories: ["pc-builds", "upgrades"] },
  { id: "monitors-peripherals", title: "Monitors & Peripherals", categories: ["monitors", "peripherals"] },
];

export default function HomePage() {
  // Every slot resolves against published, validated articles; nothing is shown twice
  // except the hero guide, which is also step 1 of the Start Here path.
  const used = new Set<string>();
  const hero = getPublishedArticle(heroSlug);
  if (hero) used.add(hero.slug);

  const startItems = startHere.flatMap((s) => {
    const a = getPublishedArticle(s.slug);
    if (!a) return [];
    used.add(a.slug);
    return [{ step: s.step, reason: s.reason, href: articleHref(a), title: a.title }];
  });

  const buyingGuides = publishedArticles.filter((a) => a.type === "buying-guide" && !used.has(a.slug)).slice(0, 4);
  buyingGuides.forEach((a) => used.add(a.slug));

  const latest = publishedArticles.filter((a) => a.type === "guide" && !used.has(a.slug)).slice(0, 4);
  latest.forEach((a) => used.add(a.slug));

  const modules = topicGroups.map((g) => ({
    ...g,
    links: g.categories.map((c) => ({ label: categoryLabel(c), href: categoryHref(c) })),
    articles: publishedArticles.filter((a) => g.categories.includes(a.category) && !used.has(a.slug)).map(toCardView),
  }));

  const total = publishedArticles.length;

  return <>
    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
      {hero ? (
        <FeaturedStory
          eyebrow={`Featured guide · ${categoryLabel(hero.category)}`}
          headline={heroHeadline}
          dek={hero.teaser ?? hero.dek}
          href={articleHref(hero)}
          image={hero.hero?.src}
          imageAlt={hero.hero?.alt}
          readTime={hero.readTime}
        />
      ) : (
        <FeaturedStory
          eyebrow="The PC Journal"
          headline={heroHeadline}
          dek="We help you choose compatible hardware for your workload and budget, and check the details that decide whether a build or upgrade works."
          links={[{ label: "All guides", href: "/guides" }, { label: "How we research", href: "/how-we-review" }]}
        />
      )}
      <ShoppingCategoryStrip />

      {(latest.length > 0 || startItems.length > 0) && (
        <div className="grid gap-12 py-12 lg:py-14 xl:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] xl:gap-10">
          <LatestGuides
            id="latest-heading"
            title="Latest PC Guides"
            articles={latest.map(toCardView)}
            viewAllHref={total > latest.length ? "/guides" : undefined}
          />
          <div className="xl:border-l xl:border-border xl:pl-10">
            <StartHereList id="start-here-heading" title="Start Here" intro="New to PC decisions? Read these in order." items={startItems} />
          </div>
        </div>
      )}

      {buyingGuides.length > 0 && (
        <div className="border-t border-border py-12 lg:py-14">
          <LatestGuides id="buying-guides-heading" title="Buying Guides" articles={buyingGuides.map(toCardView)} viewAllHref={undefined} />
        </div>
      )}

      {modules.some((m) => m.articles.length >= 2) && (
        <div className="divide-y divide-border border-t border-border">
          {modules.map((m) => <DepartmentSection key={m.id} id={m.id} title={m.title} categories={m.links} articles={m.articles} />)}
        </div>
      )}
    </div>
    <ReviewMethodologyBand />
  </>;
}
