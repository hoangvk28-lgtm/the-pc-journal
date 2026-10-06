import Link from "next/link";
import Image from "next/image";
import { authorHref, type Author } from "@/lib/authors";

export function AuthorAvatar({ author, size = 56 }: { author: Author; size?: number }) {
  if (author.photo) {
    return <Image src={author.photo} alt={author.name} width={size} height={size} className="shrink-0 rounded-full object-cover" />;
  }
  const initials = author.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full border border-border bg-surface font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold text-ink"
    >
      {initials}
    </span>
  );
}

/** Compact, understated author box at the end of a guide. */
export function AuthorBox({ author }: { author: Author }) {
  return (
    <section aria-labelledby="about-author" className="mt-14 border-t border-border pt-6">
      <h2 id="about-author" className="sr-only">About the author</h2>
      <div className="flex gap-4">
        <AuthorAvatar author={author} />
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-display)] text-[1.125rem] font-semibold leading-snug text-ink">
            <Link prefetch={false} href={authorHref(author)} rel="author" className="!text-ink hover:!text-brand focus-ring">{author.name}</Link>
          </p>
          <p className="text-sm text-ink-secondary">{author.role}</p>
          <p className="mt-2 max-w-[68ch] text-[0.9375rem] leading-relaxed">{author.shortBio}</p>
          <p className="mt-2 text-sm text-ink-secondary">Covers: {author.topics.join(", ")}</p>
          <Link prefetch={false} href={authorHref(author)} className="mt-3 inline-block text-[0.9375rem] font-medium focus-ring">
            View all articles <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
