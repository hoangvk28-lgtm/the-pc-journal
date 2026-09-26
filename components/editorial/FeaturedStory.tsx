import Image from "next/image";
import Link from "next/link";
import { ArticleMetadata } from "./ArticleMetadata";

interface FeaturedStoryProps {
  eyebrow: string;
  headline: string;
  dek: string;
  /** Present only when the featured article is published; without it the hero is a text-led introduction. */
  href?: string;
  cta?: string;
  image?: string;
  imageAlt?: string;
  readTime?: string;
  /** Text-led fallback links to existing content. */
  links?: { label: string; href: string }[];
}

/**
 * Compact editorial hero. With an image: text left, 3:2 image right, sized so the
 * next section starts above the fold on a typical desktop. Without one: a text-led introduction.
 */
export function FeaturedStory(p: FeaturedStoryProps) {
  const withImage = !!(p.image && p.href);
  return (
    <section
      aria-labelledby="featured-story"
      className={`grid gap-6 pt-5 sm:pt-8 ${withImage ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-12" : "max-w-3xl"}`}
    >
      <div className="min-w-0 lg:py-2">
        <p className="eyebrow">{p.eyebrow}</p>
        <h1 id="featured-story" className="mt-3 max-w-[16ch] text-[2.125rem] leading-[1.1] [text-wrap:balance] sm:text-[2.75rem] lg:text-[2.875rem] xl:text-[3.125rem]">
          {p.href ? (
            <Link prefetch={false} href={p.href} className="text-ink transition-colors hover:text-brand focus-ring">
              {p.headline}
            </Link>
          ) : p.headline}
        </h1>
        <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-relaxed sm:text-lg">{p.dek}</p>
        {p.href ? (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              prefetch={false}
              href={p.href}
              className="group inline-flex min-h-12 shrink-0 items-center gap-2 bg-brand px-6 text-[0.9375rem] font-semibold !text-white transition-colors hover:bg-brand-dark focus-ring"
            >
              {p.cta ?? "Read the guide"}
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <ArticleMetadata author="The PC Journal" readTime={p.readTime} />
          </div>
        ) : (
          p.links && p.links.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {p.links.map((l) => (
                <li key={l.href}><Link prefetch={false} href={l.href} className="inline-flex min-h-11 items-center border border-border bg-surface px-4 font-medium !text-ink hover:border-brand focus-ring">{l.label}</Link></li>
              ))}
            </ul>
          )
        )}
      </div>

      {withImage && (
        <Link prefetch={false} href={p.href!} tabIndex={-1} aria-hidden className="group order-first block lg:order-none">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-[#ebe7df] lg:aspect-[3/2]">
            <Image
              src={p.image!}
              alt={p.imageAlt ?? ""}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 680px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </Link>
      )}
    </section>
  );
}
