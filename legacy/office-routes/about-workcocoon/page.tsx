import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMetadata, SITE_URL } from "@/lib/seo";

// ── Metadata ──────────────────────────────────────────────────────────────────

const baseMeta = buildMetadata({
  title: "About The Office Journal | Small-Space Desk Setup Buying Guides",
  description:
    "The Office Journal helps students, remote workers, and small-space users find practical desk products through research-based buying guides and comparisons.",
  path: "/about-workcocoon",
});

export const metadata: Metadata = {
  ...baseMeta,
  keywords: [
    "The Office Journal",
    "desk finds",
    "what is The Office Journal",
    "The Office Journal reviews",
    "small-space desk setup",
    "workspace buying guides",
    "dorm room desk setup",
    "compact workspace products",
    "desk setup buying guides",
    "Amazon product guides for small spaces",
  ],
  openGraph: {
    ...(baseMeta.openGraph as object),
    title: "About The Office Journal",
    description:
      "Learn what The Office Journal is, who it helps, how recommendations are created, and how the site earns through transparent affiliate links.",
  },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const AUDIENCE = [
  {
    title: "College students",
    desc: "Living in dorms and shared apartments who need to maximize one desk and limited floor space on a student budget.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Remote workers",
    desc: "Setting up a professional home office in a bedroom corner or studio apartment without the budget or space for dedicated office furniture.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    title: "Small apartment renters",
    desc: "Who want organized, functional rooms and can't drill holes, can't add furniture that dominates the room, and need products that work with what they already have.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "First-time renters",
    desc: "Equipping their first place and trying to avoid the expensive mistake of buying something that doesn't fit or doesn't solve the actual problem.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
];

const DIFFERENTIATORS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
    title: "Small-space focused",
    desc: "Every product is evaluated for dorm rooms, apartment desks, and compact setups — not hypothetical large home offices. Physical size, mounting requirements, and space footprint are first-class evaluation criteria.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Clear product comparisons",
    desc: "We use a consistent 1–10 scoring system across five criteria for every product we evaluate. Scores are comparable across categories because the criteria don't change. See our full scoring methodology on the How We Review page.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Practical buying guides",
    desc: "Our guides are structured around real buying decisions: who this is for, what trade-offs exist, what to avoid, and a clear recommendation with reasons. We don't pad guides with irrelevant products to increase affiliate link count.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Fewer, better recommendations",
    desc: "Most buying guides recommend 10–20 products so no reader decision feels wrong. We pick the best 2–5 options and explain clearly why. If you can't choose between the options we recommend, we tell you which one to buy.",
  },
];

const COVERS = [
  { label: "Tablet Stands", href: "/guide/best-tablet-stands" },
  { label: "Tablet Stands for Desk", href: "/guide/best-tablet-stands-for-desk" },
  { label: "Tablet Stands for Bed", href: "/guide/best-tablet-stands-for-bed" },
  { label: "Desk Lamps", href: "/guide/desk-lamps-small-desks" },
  { label: "Monitor Stands", href: "/guide/monitor-stands-small-desks" },
  { label: "Desk Organizers", href: "/guide/desk-organizers-small-desks" },
  { label: "Dorm Essentials", href: "/categories/dorm-essentials" },
  { label: "Small Room Storage", href: "/categories/small-room-storage" },
  { label: "Compact Home Office", href: "/categories/compact-home-office" },
];

const EDITORIAL_STANDARDS = [
  "We disclose affiliate links clearly on every page that contains them.",
  "We do not publish paid placements as independent editorial recommendations.",
  "We do not claim hands-on testing unless clearly and explicitly stated.",
  "We avoid exact prices unless they are verified and maintainable.",
  "We prioritize fit, space constraints, and use case over product quantity.",
  "We update guides when information changes or recommendations no longer make sense.",
];

const FAQ_ITEMS = [
  {
    q: "What is The Office Journal?",
    a: "The Office Journal is a buying guide website focused on small-space desk setups, dorm rooms, and compact workspaces. We publish research-based product comparisons and guides to help people find practical products for tight spaces and realistic budgets.",
  },
  {
    q: "Is The Office Journal an online store?",
    a: "No. The Office Journal is not an online store. We do not sell, stock, or ship products. We publish buying guides and product comparisons with links to retailers where products can be purchased.",
  },
  {
    q: "Does The Office Journal sell products directly?",
    a: "No. The Office Journal does not sell products directly. When you click a product link on The Office Journal, you are taken to a third-party retailer — most commonly Amazon — to complete the purchase there.",
  },
  {
    q: "How does The Office Journal make money?",
    a: "The Office Journal earns a small commission when users purchase products through affiliate links on the site. As an Amazon Associate, The Office Journal earns from qualifying purchases. This does not add any extra cost to you.",
  },
  {
    q: "Are The Office Journal recommendations paid placements?",
    a: "No. Recommendation rankings on The Office Journal are not influenced by commission rates, brand payments, or sponsored placement fees. Products are ranked based on our evaluation criteria. Affiliate commissions fund the site but do not influence which products we recommend.",
  },
  {
    q: "Is The Office Journal part of Amazon?",
    a: "No. The Office Journal is an independent editorial website. The Office Journal is not owned by, affiliated with, or endorsed by Amazon. We participate in the Amazon Associates program, which allows independent publishers to earn commissions on qualifying purchases — but we operate independently.",
  },
  {
    q: "How are The Office Journal recommendations created?",
    a: "Recommendations are based on product specifications, verified buyer feedback patterns, dimensions, mounting requirements, and small-space use cases. Unless explicitly stated otherwise, our guides are research-based — not hands-on lab tests. Our full methodology is explained on the How We Review page.",
  },
  {
    q: 'What does "desk finds" mean?',
    a: '"Desk finds" refers to useful, practical products discovered for desk setups and compact workspaces — similar to the idea of a great "find" when shopping. The Office Journal was built around the idea of surfacing the best products for small-space desk setups that are easy to overlook in typical product roundups.',
  },
];

const START_GUIDES = [
  { label: "Best Tablet Stands", href: "/guide/best-tablet-stands" },
  { label: "Best Tablet Stands for Desk", href: "/guide/best-tablet-stands-for-desk" },
  { label: "Best Tablet Stands for Bed", href: "/guide/best-tablet-stands-for-bed" },
  { label: "Desk Lamps for Small Desks", href: "/guide/desk-lamps-small-desks" },
  { label: "Monitor Stands for Small Desks", href: "/guide/monitor-stands-small-desks" },
  { label: "Desk Organizers for Small Desks", href: "/guide/desk-organizers-small-desks" },
];

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About The Office Journal", item: `${SITE_URL}/about-workcocoon` },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About The Office Journal",
  description:
    "The Office Journal helps students, remote workers, renters, and small-space users find practical desk setup products through research-based buying guides, comparisons, and transparent affiliate recommendations.",
  url: `${SITE_URL}/about-workcocoon`,
  publisher: {
    "@type": "Organization",
    name: "The Office Journal",
    url: SITE_URL,
    sameAs: [`${SITE_URL}/author/deskfinds-editorial-team`],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Office Journal",
  url: SITE_URL,
  description:
    "Independent buying guide website for small-space desk setups, dorm rooms, and compact home offices.",
  publishingPrinciples: `${SITE_URL}/how-we-review`,
  sameAs: [`${SITE_URL}/author/deskfinds-editorial-team`],
};


// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <Container narrow className="py-14">

        {/* ── H1 Hero ────────────────────────────────────────────────── */}
        <header className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">About The Office Journal</span>
          <h1 className="text-4xl font-bold text-ink mt-2 mb-3 tracking-tight">
            Making Small Spaces Work Smarter
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl">
            The Office Journal is a workspace buying guide website for people who need practical product recommendations for dorm rooms, small apartments, bedroom desks, and compact workspaces — built on research, not sponsored rankings.
          </p>
        </header>

        {/* ── What Is The Office Journal ──────────────────────────────────────── */}
        <section className="mb-12 p-6 bg-white rounded-2xl border border-border" aria-labelledby="what-is-deskfinds">
          <h2 id="what-is-deskfinds" className="text-2xl font-bold text-ink mb-4 tracking-tight">What Is The Office Journal?</h2>
          <div className="space-y-3 text-sm text-ink-secondary leading-relaxed">
            <p>
              <strong className="text-ink">The Office Journal is not an online store.</strong> We do not sell products, stock inventory, or process orders. When you click a product link on The Office Journal, you go directly to a third-party retailer — usually Amazon — to buy it there.
            </p>
            <p>
              The Office Journal publishes <strong className="text-ink">buying guides, product comparisons, and review-style content</strong> to help people figure out which products are worth buying before they spend money. Every guide is focused on a specific product category and a specific constraint: small spaces, realistic budgets, and practical use cases.
            </p>
            <p>
              If you have searched for something like <em>&ldquo;best desk lamp for a dorm room&rdquo;</em> or <em>&ldquo;tablet stand that works on a bed&rdquo;</em> and found a The Office Journal article, that is what we do — we research those questions and publish structured answers, not sales pitches.
            </p>
          </div>
        </section>

        {/* ── Mission ───────────────────────────────────────────────── */}
        <section className="mb-12" aria-labelledby="our-mission">
          <h2 id="our-mission" className="text-2xl font-bold text-ink mb-4 tracking-tight">Our Mission</h2>
          <div className="space-y-4 text-sm text-ink-secondary leading-relaxed">
            <p>
              A dorm room, a studio apartment, or a bedroom desk does not have to mean a compromised setup. The right products — chosen specifically for tight spaces — can make a 200-square-foot room as productive and comfortable as a much larger one.
            </p>
            <p>
              The Office Journal exists to help <strong className="text-ink">students, remote workers, first-time renters, and small-space users</strong> find those products without wading through sponsored rankings, vague listicles, or buying guides clearly written without considering what a real dorm desk looks like.
            </p>
          </div>
        </section>

        {/* ── Who The Office Journal Is For ───────────────────────────────────── */}
        <section className="mb-12" aria-labelledby="who-for">
          <h2 id="who-for" className="text-2xl font-bold text-ink mb-2 tracking-tight">Who The Office Journal Is For</h2>
          <p className="text-sm text-ink-secondary mb-6">
            Every guide on The Office Journal is written with one of these people in mind:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AUDIENCE.map((item) => (
              <div key={item.title} className="flex gap-3 p-4 rounded-xl border border-border bg-white">
                <div className="w-9 h-9 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-ink-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── What The Office Journal Covers ──────────────────────────────────── */}
        <section className="mb-12" aria-labelledby="what-covers">
          <h2 id="what-covers" className="text-2xl font-bold text-ink mb-2 tracking-tight">What The Office Journal Covers</h2>
          <p className="text-sm text-ink-secondary mb-5">
            The Office Journal publishes guides across the most common small-space desk setup categories:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {COVERS.map((item) => (
              <Link prefetch={false}
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-white text-sm font-medium text-ink hover:border-brand/40 hover:text-brand transition-colors"
              >
                {item.label}
                <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4">
            Browse all guides at{" "}
            <Link prefetch={false} href="/guide" className="text-brand hover:underline font-medium">workcocoon.com/guide</Link>
            {" "}or by category at{" "}
            <Link prefetch={false} href="/categories/desk-setup" className="text-brand hover:underline font-medium">Desk Setup</Link>
            {", "}
            <Link prefetch={false} href="/categories/dorm-essentials" className="text-brand hover:underline font-medium">Dorm Essentials</Link>
            {", and "}
            <Link prefetch={false} href="/categories/small-room-storage" className="text-brand hover:underline font-medium">Small Room Storage</Link>.
          </p>
        </section>

        {/* ── What Makes The Office Journal Different ────────────────────────── */}
        <section className="mb-12" aria-labelledby="different">
          <h2 id="different" className="text-2xl font-bold text-ink mb-2 tracking-tight">What Makes The Office Journal Different</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-6">
            There are thousands of Amazon product roundup sites. Here is why we think The Office Journal is worth your time:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DIFFERENTIATORS.map((item) => (
              <div key={item.title} className="flex gap-3 p-4 rounded-xl border border-border bg-white">
                <div className="w-9 h-9 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-ink-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4">
            Our scoring criteria are explained in full on{" "}
            <Link prefetch={false} href="/how-we-review" className="text-brand hover:underline font-medium">How We Review</Link>.
          </p>
        </section>

        {/* ── How The Office Journal Research Works ──────────────────────────── */}
        <section className="mb-12" aria-labelledby="research">
          <h2 id="research" className="text-2xl font-bold text-ink mb-4 tracking-tight">How The Office Journal Research Works</h2>
          <div className="space-y-4 text-sm text-ink-secondary leading-relaxed">
            <p>
              For every buying guide, we start by defining the exact small-space context: what are the physical constraints, what does the target buyer already own, and what are they actually trying to solve? We evaluate products against those real constraints — not generic &ldquo;great for home offices&rdquo; claims.
            </p>
            <p>
              Our research draws on:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                "Product specifications and technical dimensions",
                "Space footprint and mounting or installation requirements",
                "Verified buyer feedback patterns (with close attention to negative review patterns that surface real failure modes)",
                "Community discussions where small-room users share what actually works",
                "Small-space use cases specific to the product category",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <svg className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              We are transparent about one important thing:{" "}
              <strong className="text-ink">unless we explicitly state otherwise, our guides are research-based, not hands-on lab tests.</strong>{" "}
              We do not have a testing facility. We believe being honest about this is more useful to you than pretending otherwise.
            </p>
            <p>
              You can read our complete methodology — including all five scoring criteria and what each editorial badge means — on our{" "}
              <Link prefetch={false} href="/how-we-review" className="text-brand hover:text-brand-dark font-medium underline underline-offset-2 transition-colors">
                How We Review page
              </Link>.
            </p>
          </div>
        </section>

        {/* ── Editorial Standards ───────────────────────────────────── */}
        <section className="mb-12" aria-labelledby="standards">
          <h2 id="standards" className="text-2xl font-bold text-ink mb-4 tracking-tight">Our Editorial Standards</h2>
          <div className="p-5 bg-white rounded-2xl border border-border">
            <ul className="space-y-3">
              {EDITORIAL_STANDARDS.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink-secondary">
                  <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-x-5 gap-y-2 text-xs">
              {[
                { label: "How We Review", href: "/how-we-review" },
                { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <Link prefetch={false} key={l.href} href={l.href} className="text-brand hover:underline font-medium">
                  {l.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Affiliate Relationship ────────────────────────────────── */}
        <section className="mb-12 p-5 bg-white rounded-2xl border border-border" aria-labelledby="affiliate">
          <h2 id="affiliate" className="text-lg font-bold text-ink mb-3">Our Affiliate Relationship</h2>
          <div className="space-y-3 text-sm text-ink-secondary leading-relaxed">
            <p>
              The Office Journal may earn a small commission when you purchase through links on this site. This does not add any extra cost to you — affiliate commissions come from the retailer margin, not from a price increase on your end.
            </p>
            <p>
              Recommendation rankings on The Office Journal are not influenced by commission rates. We link to whatever product we genuinely believe is the best choice based on our evaluation criteria. A product that earns a higher commission will not rank higher than one that earns a lower commission if it is not the better product.
            </p>
            <p>
              Affiliate commissions help fund the research, writing, and maintenance of the site. Without them, the site would not exist in its current form.
            </p>
          </div>
          <Link prefetch={false} href="/affiliate-disclosure" className="inline-block mt-3 text-sm font-semibold text-brand hover:text-brand-dark transition-colors">
            Read our full affiliate disclosure →
          </Link>

          {/* Affiliate CTA — single placement, transparent */}
          <div className="mt-5 pt-5 border-t border-border">
            <p className="text-xs text-ink-muted mb-3">
              As an Amazon Associate, The Office Journal may earn from qualifying purchases. This does not add extra cost to you.
            </p>
            <a
              href="https://amzn.to/4a8EGlH"
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium hover:bg-amber-100 transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
              View our current Amazon workspace pick
            </a>
          </div>
        </section>

        {/* ── Start With The Office Journal Guides ───────────────────────────── */}
        <section className="mb-12" aria-labelledby="start-guides">
          <h2 id="start-guides" className="text-2xl font-bold text-ink mb-5 tracking-tight">Start With The Office Journal Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {START_GUIDES.map((guide) => (
              <Link prefetch={false}
                key={guide.href}
                href={guide.href}
                className="group flex items-center justify-between p-4 rounded-xl border border-border bg-white hover:border-brand/40 hover:shadow-sm transition-all"
              >
                <span className="text-sm font-medium text-ink group-hover:text-brand transition-colors">
                  {guide.label}
                </span>
                <svg className="w-4 h-4 text-ink-muted group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <Link prefetch={false} href="/guide" className="text-brand hover:underline font-medium">View all buying guides →</Link>
            <Link prefetch={false} href="/compare" className="text-brand hover:underline font-medium">Compare all products →</Link>
            <Link prefetch={false} href="/deals" className="text-brand hover:underline font-medium">Budget-friendly finds →</Link>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section aria-labelledby="faq">
          <h2 id="faq" className="text-2xl font-bold text-ink mb-5 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-border bg-white overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none list-none font-semibold text-sm text-ink hover:text-brand transition-colors">
                  {item.q}
                  <svg
                    className="w-4 h-4 shrink-0 text-ink-muted transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-sm text-ink-secondary leading-relaxed border-t border-border pt-3">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

      </Container>
    </>
  );
}
