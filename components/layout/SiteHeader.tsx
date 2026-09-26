import Link from "next/link";
import { departmentNav, secondaryNav } from "@/data/nav";
import { Wordmark } from "./Wordmark";
import { MobileNav } from "./MobileNav";

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden className="h-5 w-5">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

const navLink = "text-[0.9375rem] font-medium !text-ink underline-offset-[6px] decoration-brand decoration-2 hover:underline focus-ring";

// Server component; only the mobile menu toggle ships JS.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:h-[84px] lg:px-8">
        <Wordmark />

        <nav aria-label="Topics" className="hidden lg:block">
          <ul className="flex items-center gap-5 whitespace-nowrap xl:gap-7">
            {departmentNav.map((item) => (
              <li key={item.href}>
                <Link prefetch={false} href={item.href} className={navLink}>{item.label}</Link>
              </li>
            ))}
            <li aria-hidden className="h-5 w-px bg-border-dark" />
            {secondaryNav.slice(0, 1).map((item) => (
              <li key={item.href}>
                <Link prefetch={false} href={item.href} className={`${navLink} !text-ink-secondary`}>All {item.label.toLowerCase()}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            prefetch={false}
            href="/guides"
            aria-label="Browse all guides"
            title="Browse all guides"
            className="grid h-11 w-11 place-items-center !text-ink hover:!text-brand focus-ring"
          >
            <SearchIcon />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
