import Link from "next/link";
import type { ArticleView } from "@/lib/homepage";
import { SectionHeader } from "./SectionHeader";
import { ArticleCardLarge, ArticleCardCompact } from "./ArticleCards";

interface DepartmentSectionProps {
  id: string;
  title: string;
  /** Each grouped category keeps its own destination. */
  categories: { label: string; href: string }[];
  articles: ArticleView[];
}

/** Topic module: one lead story plus compact supporting stories. Renders nothing without at least two articles. */
export function DepartmentSection({ id, title, categories, articles }: DepartmentSectionProps) {
  if (articles.length < 2) return null;
  const headingId = `${id}-heading`;
  const [lead, ...rest] = articles;

  return (
    <section aria-labelledby={headingId} className="py-12 lg:py-14">
      <SectionHeader id={headingId} title={title} href={categories.length === 1 ? categories[0].href : undefined} />
      {categories.length > 1 && (
        <ul className="-mt-2 mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.href}>
              <Link prefetch={false} href={c.href} className="inline-flex min-h-10 items-center border border-border bg-surface px-3.5 text-sm font-medium !text-ink hover:border-brand hover:!text-brand focus-ring">
                {c.label} <span aria-hidden className="ml-1.5">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
        <ArticleCardLarge article={lead} />
        <div className="divide-y divide-border border-t border-border lg:border-t-0">
          {rest.slice(0, 4).map((a) => <ArticleCardCompact key={a.slug} article={a} />)}
        </div>
      </div>
    </section>
  );
}
