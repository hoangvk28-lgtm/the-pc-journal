import type { BestProduct } from "@/lib/pc-content/types";
import { withAmazonTag } from "@/lib/affiliate";
import { SafeImage } from "@/components/editorial/SafeImage";

const REL = "nofollow sponsored noopener noreferrer";

function splitVerdict(description: string) {
  const paras = description.split("\n\n").map((p) => p.trim()).filter(Boolean);
  const first = paras[0] ?? "";
  const m = first.match(/^(.+?[.!?])(\s+|$)([\s\S]*)$/);
  const verdict = m ? m[1] : first;
  const rest = [m?.[3]?.trim(), ...paras.slice(1)].filter((p): p is string => !!p);
  return { verdict, rest };
}

function Label({ children }: { children: React.ReactNode }) {
  return <h4 className="font-[family-name:var(--font-body)] text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-ink">{children}</h4>;
}

function PriceCta({ product, variant }: { product: BestProduct; variant: "early" | "final" }) {
  const base = "inline-flex min-h-12 items-center gap-2 px-5 text-[0.9375rem] font-semibold transition-colors focus-ring";
  const look = variant === "early"
    ? "border border-brand bg-transparent !text-brand hover:bg-brand-light"
    : "bg-brand !text-white hover:bg-brand-dark";
  return (
    <a href={withAmazonTag(product.amazonUrl)} target="_blank" rel={REL} className={`${base} ${look}`}>
      Check price on Amazon
      <span className="sr-only"> for {product.name} (opens in a new tab)</span>
      <span aria-hidden>→</span>
    </a>
  );
}

/**
 * One pick: a compact decision cluster (award, name, verdict, best for / skip if, early CTA),
 * then the technical analysis (why we like it, specs, pros/cons, the catch, final CTA).
 * Desktop: sticky image left, text right. Phones: decision cluster, image, analysis.
 * Exactly two Amazon CTAs; the product name is editorial, not an affiliate link.
 */
export function PcProductPick({ product: p, total }: { product: BestProduct; total: number }) {
  const { verdict, rest } = splitVerdict(p.description);

  return (
    <article id={p.id} aria-labelledby={`${p.id}-name`} className="scroll-mt-32 border-t border-border py-10 first:border-t-0 first:pt-2 lg:scroll-mt-24">
      <div className="grid gap-6 md:grid-cols-[38fr_62fr] md:gap-x-10 md:gap-y-0">
        {/* Decision cluster */}
        <div className="min-w-0 md:col-start-2 md:row-start-1">
          <p className="eyebrow">
            {p.badge}
            <span className="ml-2 font-medium tracking-normal normal-case text-ink-secondary">{p.rank} of {total}</span>
          </p>
          <h3 id={`${p.id}-name`} className="mt-2 text-[1.625rem] leading-tight sm:text-[1.875rem]">{p.name}</h3>
          {verdict && (
            <p className="mt-4 border-l-2 border-ink pl-4 font-[family-name:var(--font-display)] text-[1.1875rem] leading-snug !text-ink">{verdict}</p>
          )}
          <dl className={`mt-5 grid gap-4 border-y border-border py-4 ${p.skipIf ? "sm:grid-cols-2 sm:gap-6" : ""}`}>
            {p.bestFor && (
              <div>
                <dt><Label>Best for</Label></dt>
                <dd className="mt-1.5 text-base leading-relaxed text-ink-secondary">{p.bestFor}</dd>
              </div>
            )}
            {p.skipIf && (
              <div>
                <dt><Label>Skip if</Label></dt>
                <dd className="mt-1.5 text-base leading-relaxed text-ink-secondary">{p.skipIf}</dd>
              </div>
            )}
          </dl>
          <div className="mt-5"><PriceCta product={p} variant="early" /></div>
        </div>

        {/* Image: left column on desktop (sticky), between the two clusters on phones */}
        <div className="md:col-start-1 md:row-span-2 md:row-start-1">
          <div className="md:sticky md:top-28">
          <a
            href={withAmazonTag(p.amazonUrl)}
            target="_blank"
            rel={REL}
            aria-label={`${p.name} on Amazon (opens in a new tab)`}
            className="group relative block aspect-square overflow-hidden bg-[#f1ede6] focus-ring"
          >
            {p.imageUrl && (
              <SafeImage src={p.imageUrl} alt={p.name} fill sizes="(max-width: 768px) 100vw, 320px" className="object-contain p-8 mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.02]" unoptimized />
            )}
          </a>
          </div>
        </div>

        {/* Technical analysis */}
        <div className="min-w-0 md:col-start-2 md:row-start-2 md:mt-10">
          {rest.length > 0 && (
            <section>
              <Label>Why we like it</Label>
              <div className="mt-2 space-y-4">
                {rest.map((para, i) => <p key={i} className="text-base leading-relaxed">{para}</p>)}
              </div>
            </section>
          )}

          {p.specs.length > 0 && (
            <section className="mt-6">
              <Label>Key specs</Label>
              <dl className="mt-2 divide-y divide-border border-y border-border">
                {p.specs.map((s, i) => {
                  const [k, ...v] = s.split(": ");
                  return v.length ? (
                    <div key={i} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-2 text-[0.9375rem] leading-snug">
                      <dt className="text-ink-secondary">{k}</dt>
                      <dd className="text-ink">{v.join(": ")}</dd>
                    </div>
                  ) : (
                    <div key={i} className="py-2 text-[0.9375rem] leading-snug text-ink"><dd>{s}</dd></div>
                  );
                })}
              </dl>
            </section>
          )}

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {p.pros.length > 0 && (
              <section>
                <Label>Pros</Label>
                <ul className="mt-2 space-y-2">
                  {p.pros.map((t, i) => (
                    <li key={i} className="flex gap-2.5 text-base leading-snug text-ink"><span aria-hidden className="mt-px font-semibold text-olive">+</span>{t}</li>
                  ))}
                </ul>
              </section>
            )}
            {p.cons.length > 0 && (
              <section>
                <Label>Cons</Label>
                <ul className="mt-2 space-y-2">
                  {p.cons.map((t, i) => (
                    <li key={i} className="flex gap-2.5 text-base leading-snug text-ink"><span aria-hidden className="mt-px font-semibold text-ink-secondary">−</span>{t}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {p.catch && (
            <section className="mt-6 border-l-2 border-brand pl-4">
              <Label>The catch</Label>
              <p className="mt-1.5 text-base leading-relaxed">{p.catch}</p>
            </section>
          )}

          <div className="mt-8"><PriceCta product={p} variant="final" /></div>
        </div>
      </div>
    </article>
  );
}
