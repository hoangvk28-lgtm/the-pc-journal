import type { BestProduct } from "@/lib/pc-content/types";
import { withAmazonTag } from "@/lib/affiliate";
import { SafeImage } from "@/components/editorial/SafeImage";

const REL = "nofollow sponsored noopener noreferrer";
const priceLink =
  "inline-flex min-h-11 items-center whitespace-nowrap text-[0.9375rem] font-medium !text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand focus-ring";

function Thumb({ src, size }: { src: string; size: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden bg-[#f1ede6] ${size}`}>
      {src && <SafeImage src={src} alt="" fill sizes="96px" className="object-contain p-2 mix-blend-multiply" unoptimized />}
    </div>
  );
}

/**
 * Quick Picks: "which product should I investigate first?" in seconds.
 * Desktop table (Pick · Why it stands out · Best for · Check price); stacked list on phones.
 */
export function PcQuickPicks({ products }: { products: BestProduct[] }) {
  return (
    <>
      <ol className="divide-y divide-border border-y border-border lg:hidden">
        {products.map((p) => (
          <li key={p.id} className="flex gap-4 py-5">
            <Thumb src={p.imageUrl} size="h-20 w-20" />
            <div className="min-w-0 flex-1">
              <p className="eyebrow">{p.badge}</p>
              <a href={`#${p.id}`} className="mt-1 block font-[family-name:var(--font-display)] text-[1.125rem] font-semibold leading-snug !text-ink focus-ring">{p.name}</a>
              {p.summary && <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink">{p.summary}</p>}
              {p.bestFor && <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink-secondary"><span className="font-semibold text-ink">Best for: </span>{p.bestFor}</p>}
              <a href={withAmazonTag(p.amazonUrl)} target="_blank" rel={REL} className={`mt-1 ${priceLink}`}>
                Check price<span className="sr-only"> for {p.name} on Amazon (opens in a new tab)</span> <span aria-hidden className="ml-1">→</span>
              </a>
            </div>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ink text-[0.8125rem] uppercase tracking-[0.08em] text-ink-secondary">
              <th scope="col" className="py-3 pr-4 font-semibold">Pick</th>
              <th scope="col" className="py-3 pr-4 font-semibold">Why it stands out</th>
              <th scope="col" className="py-3 pr-4 font-semibold">Best for</th>
              <th scope="col" className="py-3 font-semibold"><span className="sr-only">Check price</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id} className="align-top">
                <th scope="row" className="w-[34%] py-4 pr-4 font-normal">
                  <a href={`#${p.id}`} className="group flex items-start gap-4 focus-ring">
                    <Thumb src={p.imageUrl} size="h-16 w-16" />
                    <span className="min-w-0">
                      <span className="eyebrow block">{p.badge}</span>
                      <span className="mt-1 block font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold leading-snug text-ink group-hover:text-brand">{p.name}</span>
                    </span>
                  </a>
                </th>
                <td className="py-4 pr-4 text-[0.9375rem] leading-snug text-ink">{p.summary || "—"}</td>
                <td className="py-4 pr-4 text-[0.9375rem] leading-snug text-ink-secondary">{p.bestFor}</td>
                <td className="py-4 text-right">
                  <a href={withAmazonTag(p.amazonUrl)} target="_blank" rel={REL} className={priceLink}>
                    Check price<span className="sr-only"> for {p.name} on Amazon (opens in a new tab)</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
