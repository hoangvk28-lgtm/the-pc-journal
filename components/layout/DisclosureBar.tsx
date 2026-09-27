import Link from "next/link";

/** Site-wide affiliate disclosure strip, shown directly under the header on every page (Wirecutter-style). */
export function DisclosureBar() {
  return (
    <aside aria-label="Affiliate disclosure" className="border-b border-black/10 bg-black/[0.03]">
      <p className="mx-auto max-w-[1120px] px-4 py-2.5 text-center text-[0.8125rem] leading-snug text-ink-secondary sm:px-6 lg:px-8">
        We research everything we recommend. When you buy through our links, we may earn a commission.{" "}
        <Link prefetch={false} href="/affiliate-disclosure" className="whitespace-nowrap font-medium !text-ink hover:underline">
          Learn more ›
        </Link>
      </p>
    </aside>
  );
}
