import type { ArticleView } from "@/lib/homepage";
import { SectionHeader } from "./SectionHeader";
import { ArticleCardCompact, ArticleCardMedium } from "./ArticleCards";

/**
 * Layout follows the number of real articles:
 *   1 → compact feature card, 2 → two balanced cards, 3+ → lead story with supporting stories.
 */
export function LatestGuides({ id, title, articles, viewAllHref }: { id: string; title: string; articles: ArticleView[]; viewAllHref?: string }) {
  if (articles.length === 0) return null;
  const [lead, ...rest] = articles;

  return (
    <section aria-labelledby={id}>
      <SectionHeader id={id} title={title} href={viewAllHref} />
      {articles.length === 1 && <div className="max-w-xl"><ArticleCardMedium article={lead} /></div>}
      {articles.length === 2 && (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {articles.map((a) => <ArticleCardMedium key={a.slug} article={a} />)}
        </div>
      )}
      {articles.length >= 3 && (
        <div className="grid gap-x-8 gap-y-2 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <ArticleCardMedium article={lead} eager />
          <div className="divide-y divide-border border-t border-border md:border-t-0">
            {rest.slice(0, 3).map((a) => <ArticleCardCompact key={a.slug} article={a} showExcerpt />)}
          </div>
        </div>
      )}
    </section>
  );
}
