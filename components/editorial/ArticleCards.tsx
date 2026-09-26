import Link from "next/link";
import type { ArticleView } from "@/lib/homepage";
import { EditorialImage } from "./EditorialImage";
import { ArticleMetadata } from "./ArticleMetadata";

const headlineLink =
  "text-ink transition-colors group-hover:text-brand focus-ring after:absolute after:inset-0 after:content-['']";

/** Cards without an image are text-led: a strong top rule replaces the image frame, never an empty box. */
const textLed = "border-t-2 border-ink pt-4";

/** Lead story within a department: image, larger headline, excerpt. */
export function ArticleCardLarge({ article, headingLevel = "h3" }: { article: ArticleView; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className={`group relative ${article.image ? "" : textLed}`}>
      {article.image && <EditorialImage src={article.image} alt={article.imageAlt} aspect="aspect-[16/9]" sizes="(max-width: 1024px) 100vw, 640px" />}
      <p className={`eyebrow ${article.image ? "mt-4" : ""}`}>{article.eyebrow}</p>
      <H className="mt-2 text-[1.5rem] leading-tight [text-wrap:balance] sm:text-[1.75rem]">
        <Link prefetch={false} href={article.href} className={headlineLink}>
          {article.title}
        </Link>
      </H>
      <p className="mt-3 line-clamp-3 text-base leading-relaxed">{article.excerpt}</p>
      <ArticleMetadata className="mt-3" author={article.author} date={article.date} readTime={article.readTime} />
    </article>
  );
}

/** Standard grid card: image (optional), eyebrow, headline, excerpt, metadata. */
export function ArticleCardMedium({
  article,
  showExcerpt = true,
  eager,
  className = "",
}: {
  article: ArticleView;
  showExcerpt?: boolean;
  eager?: boolean;
  className?: string;
}) {
  return (
    <article className={`group relative ${article.image ? "" : textLed} ${className}`}>
      {article.image && <EditorialImage eager={eager} src={article.image} alt={article.imageAlt} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 400px" />}
      <p className={`eyebrow ${article.image ? "mt-3" : ""}`}>{article.eyebrow}</p>
      <h3 className="mt-1.5 text-[1.25rem] leading-snug [text-wrap:balance]">
        <Link prefetch={false} href={article.href} className={headlineLink}>
          {article.title}
        </Link>
      </h3>
      {showExcerpt && <p className="mt-2 line-clamp-3 text-base leading-relaxed">{article.excerpt}</p>}
      <ArticleMetadata className="mt-2.5" author={article.author} date={article.date} readTime={article.readTime} />
    </article>
  );
}

/**
 * Supporting story: text-led row with an optional thumbnail on the right.
 * Thumbnails stay small on every width so supporting stories never outgrow the lead.
 */
export function ArticleCardCompact({ article, showExcerpt = false }: { article: ArticleView; showExcerpt?: boolean }) {
  return (
    <article className="group relative flex items-start gap-4 py-4">
      <div className="min-w-0 flex-1">
        <p className="eyebrow">{article.eyebrow}</p>
        <h3 className="mt-1 text-[1.125rem] leading-snug [text-wrap:balance]">
          <Link prefetch={false} href={article.href} className={headlineLink}>
            {article.title}
          </Link>
        </h3>
        {showExcerpt && <p className="mt-1.5 line-clamp-2 text-[0.9375rem] leading-relaxed">{article.excerpt}</p>}
        <ArticleMetadata className="mt-1.5" date={article.date} readTime={article.readTime} />
      </div>
      {article.image && (
        <EditorialImage src={article.image} alt="" aspect="aspect-[4/3]" className="w-24 shrink-0 sm:w-28" sizes="112px" />
      )}
    </article>
  );
}
