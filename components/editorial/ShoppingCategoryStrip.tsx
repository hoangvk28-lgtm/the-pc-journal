import Link from "next/link";

const categories = [
  { label: "Components", note: "CPU, GPU, memory", href: "/topics/components", path: <><rect x="8" y="8" width="16" height="16" rx="2" /><path d="M12 3v5m8-5v5m-8 16v5m8-5v5M3 12h5m-5 8h5m16-8h5m-5 8h5" /></> },
  { label: "PC Builds", note: "Plan a complete system", href: "/topics/pc-builds", path: <><rect x="6" y="3" width="20" height="26" rx="2" /><path d="M11 8h10M11 13h10m-10 6h3m7 0h1M11 24h10" /></> },
  { label: "Upgrades", note: "Improve your system", href: "/topics/upgrades", path: <><path d="M16 5v22M5 16h22M7 7l4 4m10 10 4 4" /><circle cx="16" cy="16" r="11" /></> },
  { label: "Monitors", note: "Work and play", href: "/topics/monitors", path: <><rect x="3" y="5" width="26" height="18" rx="2" /><path d="M16 23v5M10 28h12" /></> },
  { label: "Peripherals", note: "Keyboard, mouse, more", href: "/topics/peripherals", path: <><rect x="3" y="10" width="26" height="13" rx="2" /><path d="M7 14h2m3 0h2m3 0h2m3 0h2M8 19h16" /></> },
] as const;

export function ShoppingCategoryStrip() {
  return <nav aria-labelledby="browse-topics" className="mt-10 border-y border-border py-5 lg:mt-12">
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-6">
      <h2 id="browse-topics" className="shrink-0 text-[1.375rem] leading-tight xl:w-36">Browse by topic</h2>
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 xl:mx-0 xl:flex-1 xl:overflow-visible xl:px-0">
        {categories.map((item) => <li key={item.label} className="shrink-0 snap-start border-l border-border first:border-l-0 xl:flex-1 xl:shrink xl:first:border-l">
          <Link prefetch={false} href={item.href} className="group flex min-h-12 w-[10rem] items-center gap-3 px-3 py-1.5 text-ink focus-ring xl:w-auto">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-8 w-8 shrink-0 transition-colors group-hover:text-brand">{item.path}</svg>
            <span className="min-w-0"><span className="block text-[0.9375rem] font-semibold leading-tight group-hover:text-brand">{item.label}</span><span className="mt-0.5 hidden text-[0.8125rem] leading-snug text-ink-secondary xl:block">{item.note}</span></span>
          </Link>
        </li>)}
      </ul>
    </div>
  </nav>;
}

