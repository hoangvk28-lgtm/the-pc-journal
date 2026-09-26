# The PC Journal — CLAUDE.md

@AGENTS.md

---

## 0. Communication Rules

- **Always address the user as "cậu"** in every response, without exception.
- **Every internal `<Link>` from `next/link` must include `prefetch={false}`, no exceptions.** Default prefetching fires background requests for every link in the viewport; on the sister site (The Office Journal) this ran ISR reads ~50x above real pageviews. Add it by default to every new page or component.
- This repo was cloned from The Office Journal (WorkCocoon). Anything under `legacy/`, `docs/legacy-office-assets/`, `data/guides/`, `data/guides.ts`, `components/guide/`, `lib/public-guides.ts` and similar is **inherited office inventory**, not part of this publication. Do not route, link, reuse text from, or "fix" it unless the user asks.

---

## 1. Project Overview

- **Site name:** The PC Journal (`SITE_NAME` in `lib/seo.ts`)
- **Domain:** `NEXT_PUBLIC_SITE_URL`, fallback `https://thepcjournal.com`. Confirm the final canonical host (www or bare) before launch.
- **Repo:** `https://github.com/hoangvk28-lgtm/the-pc-journal` (`origin`). The remote `office-journal` points at the old site; never push there.
- **Business model:** affiliate content site. Retailer links are inactive until this site's own Amazon Associates tag is configured.
- **Niche:** research-based PC decisions: building, upgrading and choosing compatible hardware for a stated workload and budget.
- **Voice:** precise, calm, technically informed, approachable. Teasers say what the reader can decide or check (BIOS support, PSU connectors, GPU clearance, monitor inputs and refresh support), not vague "better performance".
- **Launch state:** pre-launch. `SITE_LAUNCHED=false` keeps robots `Disallow: /`, an `X-Robots-Tag: noindex` header, meta noindex and an empty sitemap. See `docs/PCJ-LAUNCH-AUDIT.md` for the launch gate.

---

## 2. Tech Stack

- **Next.js 16.2.6** (App Router), **React 19.2.4**, **TypeScript 5**, **Tailwind CSS 4** (`@tailwindcss/postcss`). This is NOT the Next.js in your training data. Read `node_modules/next/dist/docs/` before writing framework code.
- Route gating lives in **`proxy.ts`** (the Next 16 replacement for middleware).
- Design tokens are in `app/globals.css` (`@theme`): cobalt `--color-brand #315fc3`, ink `#252b35`, background `#faf9f6`, Georgia display and Segoe UI body. Keep the restrained palette. No neon, RGB gradients, glow or "gamer" decoration.
- Supabase, the admin panel and iron-session are inherited and inactive. Do not connect the Office Journal Supabase project.

---

## 3. Public Routes (the whole public inventory)

| Route | Source |
|---|---|
| `/` | `app/(site)/page.tsx`; slots in `data/homepage-pc.ts` |
| `/guides` | all published articles, grouped by category |
| `/guides/[slug]` | `ArticleTemplate` → Guide or Buying Guide template |
| `/topics/[slug]` | the 5 categories; **noindex while a category has no published article** |
| `/about-the-pc-journal`, `/how-we-review`, `/affiliate-disclosure`, `/privacy-policy` | static pages |
| `/dev/fixtures/[slug]` | template fixtures; only when `PCJ_ENABLE_FIXTURES=true`, always noindex |

`proxy.ts` returns 404 for everything else, including all old office routes. Public files must be listed in its `publicPages` set (or live under `/images/pcj/`). **When you add a public asset or page, update `proxy.ts`**, or it 404s.

---

## 4. Content Model — `lib/pc-content/`

All articles are typed records. **Never hand-write an article page. Add a record and let the template render it.**

- `types.ts`: `PcArticle = InformationalGuide | BuyingGuide`, the categories, evidence and source types.
- `validate.ts`: `validateArticle()`, `resolveRetailerHref()`, `displayableEvidence()`.
- `index.ts`: the registry (`allArticles`), `publishedArticles` (status `published` **and** zero validation errors), `relatedArticles()`, `articleHref()`, `categoryHref()`.
- `views.ts`: `toCardView()` for listing cards.
- Records: `data/pc-articles.ts` (the 6 published guides, whose body text comes from `data/pc-publication.ts`). New articles go in their own file and are added to `allArticles`.

### Five primary categories (fixed)
`components`, `pc-builds`, `upgrades`, `monitors`, `peripherals`. Each article has exactly **one**. "Guide", "Buying Guide", "Comparison" and "Best X" are **formats**, never categories. The homepage may group categories visually ("PC Builds & Upgrades"), but each keeps its own link.

### Shared fields
`slug`, `type`, `status` (`published | draft | fixture`), `category`, `seoTitle` (may differ from the H1 `title`), `dek`, `metaDescription?`, `teaser?` (homepage and card excerpt), `author?`, `publishedAt?` / `updatedAt?` (**only when accurate; omitted dates are not rendered**), `readTime?`, `hero?` / `thumbnail?` (src + alt), `sources?`, `related?`.

### Informational Guide (`type: "guide"`)
`modules[]`, used only where relevant: `key-takeaway` (renders above the TOC, so it answers the question first), `check-your-pc`, `explanation` (optional `evidence`), `steps` (no heading means each step becomes its own H2 and TOC entry), `compatibility`, `decision-table`, `choose-if`, `mistakes`, `next-steps`, `callout`. Never hard-code universal advice. Outcomes depend on workload and current configuration.

### Best X Buying Guide (`type: "buying-guide"`)
`scope`, `researchBasis`, `specColumns` (**category-specific, with units**; columns nobody fills are dropped), `products[]`, `compatibilityChecklist`, `howWeChose`, `whatToLookFor`, `alsoConsidered?`, `conclusion { summary, paths }`, `limitations`, and optionally `testingRecord` and `scoringSystem`.
Each product: exact `model`, `label?` + `labelReason` (required together, no duplicates, **never auto-assign "Best Overall" to the first pick**), `verdict`, `bestFor`, `skipIf`, `specs` (each value cites a `sourceId`), `compatibilityChecks` (≥1), `evidence[]`, `pros`, `cons`, `alternative?`, `retailer?`, `score?`.

### Evidence, testing, scores, affiliate links (enforced in code)
- Evidence basis is one of `manufacturer-spec | third-party-test | pcj-measurement | editorial`, and is shown to the reader as a label.
- `third-party-test` needs a valid source **and** `conditions` (system, settings, resolution, driver/firmware). `pcj-measurement` needs the article's `testingRecord`. Anything missing is **hidden and flagged**, never rendered with an empty citation.
- "Tested", "our benchmarks", "hands-on review", "in our lab", "we measured" are validation errors unless `testingRecord` exists. The default is **research-based, no hands-on testing claimed**.
- **Never generate** FPS, temperatures, noise, power draw, scores or test conditions. Numbers come from a cited source or they do not appear.
- The Office Journal Fit Score is **not** used here. A `score` renders only if the article declares a documented `scoringSystem`.
- Retailer CTAs render only when `AMAZON_PAAPI_PARTNER_TAG` (this site's own tag) is set and the URL is a valid Amazon URL. The affiliate disclosure shows only when at least one CTA renders. Never reuse the Office Journal tag. Articles must read fine with no CTA.
- No retailer "buy" buttons on the homepage. It links to editorial guides.

### Validate before every publish
```bash
npx tsx scripts/validate-pc-content.ts   # exits 1 on any error in a non-fixture article
```
Fixture errors are expected (the GPU fixture deliberately contains an unsourced test, an undocumented score and a draft link).

### Fixtures
`data/fixtures/pc-fixtures.ts` holds sample data: fictional products and example.com sources. They are never `published`, never listed or in the sitemap, and have no Article schema. View them with `PCJ_ENABLE_FIXTURES=true npm run start` → `/dev/fixtures/sample-gpu-buying-guide` and `/dev/fixtures/sample-minimal-guide`.

---

## 5. Homepage (`app/(site)/page.tsx` + `data/homepage-pc.ts`)

Every slot resolves against `publishedArticles`, and nothing is invented to fill space:
- **Hero:** `heroSlug` if published, with image and CTA. Otherwise a text-led introduction linking to existing pages.
- **Latest PC Guides:** the layout follows the count (1 compact card / 2 balanced cards / 3+ lead plus supporting). "View all" appears only if `/guides` has more.
- **Start Here:** ordered reading path (`startHere[]`), each item with a distinct reason. Step 3 "Check compatibility" still needs a dedicated article.
- **Buying Guides:** renders only when a published `buying-guide` exists.
- **Topic modules:** render only with ≥2 articles not already shown elsewhere on the page.
- Cards without an image are text-led (top rule), never an empty beige frame.

---

## 6. SEO Rules

- Always use `buildMetadata({ title, description, path, image?, noIndex?, type? })` from `lib/seo.ts`. Never append `| The PC Journal` yourself.
- **Title budget:** the site appends `" | The PC Journal"` (17 chars), so keep `seoTitle` **≤ 43 characters** for a ≤ 60-character total. Check with `seoTitle.length + 17 <= 60`; do not eyeball it.
- **Meta description: 120–160 characters**, unique per page, one sentence on what the page helps decide. Check the length in code. (The 6 existing guides' `dek`s are under 120 and still need a `metaDescription`.)
- Canonical URLs come from `buildMetadata`, with no trailing slash. Never change a published slug without a 301 in `next.config.ts`.
- **Schema** (emitted by `ArticleShell`): `Article` (author is the Organization when the byline is the publisher; a `Person` only for a real, credited person), `BreadcrumbList` (Home → Category → Article), and `ItemList` for buying guides (model names and anchors only). **Forbidden:** `FAQPage`, `Review`/`AggregateRating` with editorial or invented values, prices or offers.
- Breadcrumbs always follow the primary category.

---

## 7. Editorial Honesty

- Approved language: "we researched", "based on manufacturer documentation", "an independent review found … (conditions)". Never "we tested / we tried / in our lab" without a documented testing record.
- Compatibility claims name what to check (exact model, board revision, BIOS version, connector, clearance), not "should be compatible".
- Avoid "future-proof", "ultimate", unsupported FPS claims and teasers that restate the title.
- Do not copy Office Journal text, product data, imagery, authors, scores, badges, affiliate tags or schema claims.

---

## 8. Images

- Use `next/image` with non-empty, descriptive `alt`, and `priority` on hero/LCP images.
- PC imagery lives in `public/images/pcj/` (whitelisted by `proxy.ts`). Label AI or illustrative images with `hero.caption: "Illustrative image"`.
- Logo: `public/pc-logo.png` (transparent, header and footer). Favicons: `favicon-16x16.png`, `favicon-32x32.png`, `pc-icon-512.png`. Apple: `pc-apple-icon.png`. Source file: `logo the pc journal.png` in the repo root.
- Do not hotlink Amazon images outside PA API terms.

---

## 9. Commands

```bash
npm run dev                                   # dev server
npm run build && npm run start                # production build (the build also type-checks)
PCJ_ENABLE_FIXTURES=true npm run start        # include /dev/fixtures/*
npx tsc --noEmit                              # type-check
npm run lint                                  # 0 errors required (inherited warnings in old scripts are known)
npx tsx scripts/validate-pc-content.ts        # content validation
```

### Pre-commit gate for pages, content or schema
1. `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass.
2. `scripts/validate-pc-content.ts` has no errors outside fixtures.
3. Open the changed page in a real browser at ~390px and desktop: no horizontal overflow, no empty image frames, no console errors, TOC anchors resolve. A passing type-check does not prove the page renders correctly.
4. Title has no double suffix; canonical is correct; noindex is where expected.

### Reporting format
```
Files changed: [paths]
SEO impact: [none | low | medium | high — why]
Redirects added: [none | list]
Schema changes: [none | describe]
Build status: [passed | not verified]
```

---

## 10. Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical origin, no trailing slash |
| `SITE_LAUNCHED` | `true` only after the launch gate in `docs/PCJ-LAUNCH-AUDIT.md` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | this site's own IDs (unset = inactive) |
| `AMAZON_PAAPI_PARTNER_TAG` (+ access and secret keys) | this site's own Associates tag; enables retailer CTAs |
| `PCJ_ENABLE_FIXTURES` | `true` to serve `/dev/fixtures/*` (never in production) |
| `ADMIN_*`, `SESSION_SECRET`, `SUPABASE_*` | inherited, inactive; only with a dedicated project |

Never commit `.env.local` or real secrets.

---

## 11. Do Not

- Push to the `office-journal` remote or reuse its analytics, affiliate tag, Supabase or IndexNow key.
- Publish fixtures or mock articles, or create empty indexable pages to fill a grid.
- Add `FAQPage`, `AggregateRating` or `Review` schema, or fake prices, scores or test data.
- Change a published slug without a 301.
- Commit `.env.local`.

---

## 12. Open Items Before Launch

- The first Best X articles (exact models, cited specs, attributed tests with conditions, label reasons).
- A "Check compatibility" guide for Start Here step 3, and a first Peripherals article.
- A unique image per article (6 guides currently share 5 images) and `metaDescription`s for the 6 guides.
- This site's Amazon tag, GA4 and Search Console, contact channel, final domain, and a new IndexNow key; then `SITE_LAUNCHED=true`.
- Optional cleanup: remove the inherited office inventory (`data/guides/`, legacy components and scripts) once any PC-relevant pieces are salvaged.
