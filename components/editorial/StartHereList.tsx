import Link from "next/link";

export interface StartHereItem {
  step: string;
  reason: string;
  href: string;
  title: string;
}

/** Numbered reading path for readers new to PC decisions. Text-led rows with full-width tap targets. */
export function StartHereList({ id, title, intro, items }: { id: string; title: string; intro?: string; items: StartHereItem[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="border-b border-ink pb-3 text-[1.5rem] min-[360px]:text-[1.75rem]">{title}</h2>
      {intro && <p className="mt-3 text-[0.9375rem] text-ink-secondary">{intro}</p>}
      <ol className="mt-2 divide-y divide-border">
        {items.map((item, i) => (
          <li key={item.href} className="group relative grid grid-cols-[2rem_1fr] gap-3 py-4">
            <span aria-hidden className="font-[family-name:var(--font-display)] text-2xl leading-7 text-brand">{i + 1}</span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-secondary">{item.step}</p>
              <h3 className="mt-1 text-[1.0625rem] leading-snug">
                <Link prefetch={false} href={item.href} className="text-ink transition-colors group-hover:text-brand focus-ring after:absolute after:inset-0 after:content-['']">
                  <span className="sr-only">Step {i + 1}: </span>{item.title}
                </Link>
              </h3>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-secondary">{item.reason}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
