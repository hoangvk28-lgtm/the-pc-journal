import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCardMedium } from "@/components/editorial/ArticleCards";
import { articlesInCategory, categoryHref, categoryLabel, PC_CATEGORIES } from "@/lib/pc-content";
import { toCardView } from "@/lib/pc-content/views";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "PC Guides", description: "Research-based PC guides to planning a build, upgrading an existing PC and choosing compatible components, monitors and peripherals.", path: "/guides" });

export default function GuidesPage() {
  const groups = PC_CATEGORIES.map((c) => ({ category: c, articles: articlesInCategory(c) })).filter((g) => g.articles.length > 0);
  return <div className="mx-auto w-full max-w-[1280px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
    <p className="eyebrow">The guide library</p>
    <h1 className="mt-2 text-[2.25rem] leading-tight sm:text-5xl">PC guides</h1>
    <p className="mt-4 max-w-2xl text-lg">Research-based starting points for real build and upgrade decisions. Product recommendations appear only after their evidence and compatibility notes have been reviewed.</p>
    {groups.map((g) => (
      <section key={g.category} aria-labelledby={`g-${g.category}`} className="mt-12">
        <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-ink pb-3">
          <h2 id={`g-${g.category}`} className="text-[1.75rem]">{categoryLabel(g.category)}</h2>
          <Link prefetch={false} href={categoryHref(g.category)} className="shrink-0 text-sm font-medium focus-ring">Topic page <span aria-hidden>→</span></Link>
        </div>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {g.articles.map((a) => <ArticleCardMedium key={a.slug} article={toCardView(a)} />)}
        </div>
      </section>
    ))}
  </div>;
}
