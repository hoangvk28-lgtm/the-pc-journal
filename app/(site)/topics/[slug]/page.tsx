import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { topics } from "@/data/pc-publication";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleCardMedium } from "@/components/editorial/ArticleCards";
import { articlesInCategory, categoryHref, categoryLabel, PC_CATEGORIES, type PcCategory } from "@/lib/pc-content";
import { toCardView } from "@/lib/pc-content/views";
import { articlesInSubtopic, liveSubtopics } from "@/lib/pc-content/linking";
import { subtopicHref } from "@/lib/pc-content/subtopics";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() { return topics.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const topic = topics.find((item) => item.slug === slug);
  if (!topic) return {};
  // A topic with no published articles stays reachable from navigation but is not indexed.
  const empty = articlesInCategory(topic.slug as PcCategory).length === 0;
  return buildMetadata({ title: `${topic.title} Guides`, description: topic.summary, path: `/topics/${slug}`, noIndex: empty });
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const topic = topics.find((item) => item.slug === slug);
  if (!topic) notFound();
  const category = topic.slug as PcCategory;
  const articles = articlesInCategory(category);
  const otherTopics = PC_CATEGORIES.filter((c) => c !== category);
  const hubs = liveSubtopics().filter((s) => s.category === category);
  // With hubs, the category page lists hubs plus a short "start here" set instead of every guide.
  const featured = hubs.length > 0 ? [...articles.filter((a) => a.type !== "best-guide"), ...articles.filter((a) => a.type === "best-guide")].slice(0, 6) : articles;

  return <div className="mx-auto w-full max-w-[1280px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
    <Breadcrumbs crumbs={[{ label: topic.title }]} />
    <header className="mt-6 max-w-3xl">
      <p className="eyebrow">Topic</p>
      <h1 className="mt-2 text-[2.25rem] leading-tight sm:text-5xl">{topic.title}</h1>
      <p className="mt-4 text-lg leading-relaxed">{topic.summary}</p>
    </header>

    {hubs.length > 0 && (
      <nav aria-labelledby="topic-hubs" className="mt-10">
        <h2 id="topic-hubs" className="border-b border-ink pb-3 text-[1.75rem]">Browse {topic.title.toLowerCase()} by topic</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hubs.map((s) => (
            <li key={s.slug} className="group relative border border-border bg-surface p-5 hover:border-brand">
              <Link prefetch={false} href={subtopicHref(s)} className="text-[1.125rem] font-semibold !text-ink group-hover:!text-brand focus-ring after:absolute after:inset-0">{s.title}</Link>
              <p className="mt-2 line-clamp-3 text-sm text-ink-secondary">{s.intro}</p>
              <p className="mt-3 font-mono text-xs text-brand">{articlesInSubtopic(s).length} guides</p>
            </li>
          ))}
        </ul>
      </nav>
    )}

    <section aria-labelledby="topic-articles" className="mt-10">
      <h2 id="topic-articles" className="border-b border-ink pb-3 text-[1.75rem]">{articles.length > 0 ? (hubs.length > 0 ? "Start here" : `${topic.title} guides`) : "Guides in progress"}</h2>
      {articles.length > 0 ? (
        <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((a) => <ArticleCardMedium key={a.slug} article={toCardView(a)} />)}
        </div>
      ) : (
        <p className="mt-5 max-w-2xl">We have not published a {topic.title.toLowerCase()} guide yet. Articles appear here once their research and compatibility notes have been reviewed. Meanwhile, the checklist below covers what to verify first.</p>
      )}
    </section>

    <section aria-labelledby="checklist" className="mt-14 border-t border-border pt-8">
      <h2 id="checklist" className="text-2xl">What to check first</h2>
      <ol className="mt-5 grid gap-4 md:grid-cols-3">{topic.checklist.map((item, index) => <li key={item} className="border border-border bg-surface p-5"><span className="font-mono text-xs text-brand">0{index + 1}</span><p className="mt-3 font-medium text-ink">{item}</p></li>)}</ol>
    </section>

    <nav aria-labelledby="other-topics" className="mt-14 border-t border-border pt-8">
      <h2 id="other-topics" className="text-2xl">Other topics</h2>
      <ul className="mt-4 flex flex-wrap gap-3">
        {otherTopics.map((c) => <li key={c}><Link prefetch={false} href={categoryHref(c)} className="inline-flex min-h-11 items-center border border-border bg-surface px-4 font-medium !text-ink hover:border-brand hover:!text-brand focus-ring">{categoryLabel(c)}</Link></li>)}
      </ul>
    </nav>
  </div>;
}
