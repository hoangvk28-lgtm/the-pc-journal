import Link from "next/link";

const principles = [
  { title: "Workload first", body: "We begin with the games, applications, display and existing system behind the decision." },
  { title: "Exact compatibility", body: "Manufacturer support lists and manuals matter more than broad product-family assumptions." },
  { title: "Evidence in context", body: "Specifications, independent tests and editorial interpretation are kept distinct." },
];

export function ReviewMethodologyBand() {
  return <section aria-labelledby="how-we-review" className="border-y border-border bg-surface">
    <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[4fr_8fr] lg:gap-14 lg:px-8 lg:py-14">
      <div>
        <p className="eyebrow !text-brand">Our standards</p>
        <h2 id="how-we-review" className="mt-2 text-[1.75rem] sm:text-[2rem]">How We Research</h2>
        <p className="mt-3">Our current guides are research-based. We explain what we can verify and where evidence is limited.</p>
        <Link prefetch={false} href="/how-we-review" className="group mt-4 inline-block text-sm font-medium focus-ring">Read our methodology <span aria-hidden>→</span></Link>
      </div>
      <ol className="grid gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
        {principles.map((principle, index) => <li key={principle.title} className="border-t border-border pt-4 md:border-t-0 md:px-6 md:pt-0 md:first:pl-0">
          <span aria-hidden className="font-mono text-sm text-brand">0{index + 1}</span>
          <h3 className="mt-1 text-lg">{principle.title}</h3>
          <p className="mt-2 text-base leading-relaxed">{principle.body}</p>
        </li>)}
      </ol>
    </div>
  </section>;
}
