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
- **Domain:** canonical host is `https://www.thepcjournal.com` (`NEXT_PUBLIC_SITE_URL`, same fallback in `lib/seo.ts`); the bare domain 301-redirects to www (`next.config.ts`). Contact: contact@thepcjournal.com.
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
| `/dev/preview/[slug]` | drafts for review and template fixtures; only when `PCJ_ENABLE_PREVIEW=true`, always noindex |

`proxy.ts` returns 404 for everything else, including all old office routes. Public files must be listed in its `publicPages` set (or live under `/images/pcj/`). **When you add a public asset or page, update `proxy.ts`**, or it 404s.

---

## 4. Content Model — `lib/pc-content/`

All articles are typed records. **Never hand-write an article page. Add a record and let the template render it.**

- `types.ts`: `PcArticle = InformationalGuide | BuyingGuide`, the categories, evidence and source types.
- `validate.ts`: `validateArticle()`, `resolveRetailerHref()`, `displayableEvidence()`.
- `index.ts`: the registry (`allArticles`), `publishedArticles` (status `published` **and** zero validation errors), `relatedArticles()`, `articleHref()`, `categoryHref()`.
- `views.ts`: `toCardView()` for listing cards.
- Records: `data/pc-articles.ts` (the 6 published guides, whose body text comes from `data/pc-publication.ts`) and `data/pc-buying-guides.ts` (Best X articles; published at `/guides/<slug>`). New articles go in their own file and are added to `allArticles`.

### Five primary categories (fixed)
`components`, `pc-builds`, `upgrades`, `monitors`, `peripherals`. Each article has exactly **one**. "Guide", "Buying Guide", "Comparison" and "Best X" are **formats**, never categories. The homepage may group categories visually ("PC Builds & Upgrades"), but each keeps its own link.

### Shared fields
`slug`, `type`, `status` (`published | draft | fixture`), `category`, `seoTitle` (may differ from the H1 `title`), `dek`, `metaDescription?`, `teaser?` (homepage and card excerpt), `author?`, `publishedAt?` / `updatedAt?` (**only when accurate; omitted dates are not rendered**), `readTime?`, `hero?` / `thumbnail?` (src + alt), `sources?`, `related?`.

### Informational Guide (`type: "guide"`)
`modules[]`, used only where relevant: `key-takeaway` (renders above the TOC, so it answers the question first), `check-your-pc`, `explanation` (optional `evidence`), `steps` (no heading means each step becomes its own H2 and TOC entry), `compatibility`, `decision-table`, `choose-if`, `mistakes`, `next-steps`, `callout`. Never hard-code universal advice. Outcomes depend on workload and current configuration.

### Best X guide (`type: "best-guide"`) — The Office Journal template, no substitutes
Best X articles render with `components/pc/article/BestGuidePage.tsx`, a direct adaptation of The Office Journal's `components/guide/RichGuidePage.tsx` using the same editorial components (`GuideQuickPicks`, `GuideProductPick`, `GuideToc`). Section order: header (breadcrumb, eyebrow, H1, dek, byline, disclosure) → intro → Quick Picks → Our Picks → How We Chose → What to Look For → How to Choose (tables, incl. "By price at the time of writing") → FAQ → Bottom Line → Related Guides, with the sticky "On this page" rail. **Do not invent a different Best X layout.**
Data lives in `data/pc-buying-guides.ts` (`BestGuide`/`BestProduct` in `types.ts`): per pick `badge`, exact `name`, `asin`, `summary`, `description` (first sentence = verdict pull quote, then "

" paragraphs = Why we like it), `bestFor`, `skipIf`, `specs`, `pros` (≥3), `cons`. At least 3 picks, 5 buying criteria, 5 FAQs, a bottom line. Labels must be unique and justified in the copy; no automatic "Best Overall".

### Product data comes from the Amazon Creators API — not web scraping
- Credentials live only in `.env.local` (gitignored): `AMAZON_PAAPI_ACCESS_KEY`, `AMAZON_PAAPI_SECRET_KEY`, `AMAZON_PAAPI_PARTNER_TAG=thepcjournal-20`.
- Run `node scripts/pcj-amazon-search.mjs <out.json> "exact model 1" "exact model 2" …` to get ASIN, title, image, price and feature bullets, then record the picks in `data/pc-amazon-snapshot.ts`. Images and `amazonUrl` come from that snapshot; prices are never rendered except as "at the time of writing" tiers.
- Use web research sparingly, only for measured third-party data (e.g. Cybenetics via Hardware Busters, TFTCentral), and attribute it inline in the copy. Products not sold on Amazon cannot be picks.
- Never display Amazon star ratings or review counts.

### Batch pipeline for keyword clusters (Best X at scale)
1. **Pool (append-only):** `node scripts/pcj-amazon-search.mjs data/pcj-pool/<cluster>.json "query" …` merges results by ASIN; never overwrite.
2. **Facts:** `node scripts/pcj-extract-psu-facts.mjs <pool> ASIN…` proposes fields; review by hand into `data/pc-facts/<cluster>.ts`. Leave a field undefined when the listing omits or contradicts it. One record per ASIN, reused across articles.
3. **Config:** `data/clusters/<cluster>-cluster.ts`: slug, titles, meta, tags (sub-cluster), ASINs in editorial rank order, editorial `labels` (reason must be a fact), intro and bottom line written per article. No two articles may share an identical product set; avoid 3+ shared picks. Merge near-synonym keywords instead of forcing different products.
4. **Descriptions:** write per article in `data/clusters/<cluster>-descriptions.ts` from the fact sheet. The composer's template text is only a fallback and the validator flags it.
5. **Compose:** `lib/pc-compose/<cluster>.ts` assigns rule labels only to strict winners, builds specs/pros/cons/skip-if from facts, rotates criteria and FAQ from `lib/pc-compose/<cluster>-pool.ts` by slug seed and sub-cluster tags, and builds the How to Choose tables. Register the composed guides in `lib/pc-content/index.ts`.
5b. **Other categories use the generic composer** (`lib/pc-compose/generic.ts`): a category file in `data/categories/` defines the schema (fields with ranking direction, rule labels, strengths/weaknesses, a `compat` function, criteria/FAQ/How-we-chose pools) plus reviewed facts; a batch file in `data/clusters/` holds per-article configs with ranked ASINs, editorial labels, a 2-3 sentence `take` per pick, intro and bottom line. Each "Why we like it" = take + ranking against every other pick on each listed spec + category compatibility checks + trade-off naming the pick that covers its weakness (target 100+ words per pick). `node scripts/pcj-feature-digest.mjs <pool> ASIN…` prints bullet headlines and numbers for writing facts.
6. **Check:** `npx tsx scripts/validate-pc-content.ts` (per-article rules plus cross-article product overlap, 8-word phrases repeated in 4+ guides, listing-bullet artifacts, truncation, template fallbacks), then build and open several pages at 390px and desktop.

### Keyword-list pipeline (batch 17+, the default for any list of more than ~10 keywords)
Hand-writing picks, takes and labels per article costs roughly 10x more than this pipeline; hand-write only a small review sample (5-10 guides) when the user wants to judge quality first.
1. **Inventory the list.** Strip the year suffix, drop out-of-scope keywords (§5b), then diff against the **registry** (`registry` from `@/lib/pc-content`), never by grepping `data/` (that also matches the inherited Office Journal guides) or only `data/clusters/` (it misses `data/pc-buying-guides.ts`; `best-850w-power-supplies` was nearly duplicated that way).
2. **Map each keyword to a group** in `data/clusters/batch17-groups.ts` (a schema plus the reviewed facts older guides use). If no group has facts for it, it is a new-data keyword: search Amazon, add a schema and reviewed facts first (§4 steps 1-2), then add a group.
3. **Write one plan entry per keyword** in `data/clusters/batch17-plan.ts`: `slug`, `kw`, `g` (group), `where` (filter on listed specs/notes), `sort` (`price`, `-price`, `<spec>`, `-<spec>`), optional `seo` when "Best <Kw>" exceeds 43 chars, plus a keyword-specific `lead` (1-2 sentences of buying advice, including what every pick has in common) and `close` (one practical tip). Near-synonym keywords need a **different filter or sort**, so their product sets and ordering differ.
4. **Run the planner:** first reset `data/clusters/batch17.ts` to `export const batch17: Entry[] = [];` (the planner imports the registry, so a broken batch17 blocks it), then `MSYS_NO_PATHCONV=1 npx tsx scripts/pcj-plan-batch.ts`. It filters and sorts each group, picks up to 5 products sharing at most 2 with any existing guide (relaxing to 3 only when a group runs out), skips keywords with fewer than 3 candidates and writes `batch17.ts` with explicit ASINs. Add thin listings (fewer than 3 listed strengths) to its `EXCLUDE` set instead of padding them.
5. **Runtime** (`data/clusters/batch17-lib.ts`): takes reuse the editorial take written for the same ASIN in any earlier batch, else an auto take built from listed facts; labels are rule winners (composer), then strict winners on other ranked specs, "Lowest Price Here", "Premium Pick", a clean unique value ("Flip-up Armrests"), then neutral badges whose reason is a listed highlight. Titles fix casing ("MacBook", "SSD", "PS5", "120Hz"); meta descriptions are tried in several lengths until one fits 120-160.
6. **Check** as in step 6 above, plus: count shared-pick warnings with exact slug matching (substring grep over-counts), print a sample of articles per group (`badge | words | pros | cons`) and read one auto-take product in full.
7. **Next list:** the planner is hard-coded to `batch17-plan.ts` → `batch17.ts`, and re-running it regenerates batch 17's published picks. For a new list, add `batch18-plan.ts` / `batch18.ts` (reusing `batch17-lib.ts` and the groups), point the planner at them via a parameter, and register the new batch in `lib/pc-content/index.ts`.

### Validate before every publish
```bash
npx tsx scripts/validate-pc-content.ts   # exits 1 on any error in a non-fixture article
```
Fixture errors are expected (the GPU fixture deliberately contains an unsourced test, an undocumented score and a draft link).

### Fixtures
`data/fixtures/pc-fixtures.ts` holds sample data: fictional products and example.com sources. They are never `published`, never listed or in the sitemap, and have no Article schema. View them with `PCJ_ENABLE_PREVIEW=true npm run start` → `/dev/preview/sample-gpu-buying-guide` and `/dev/preview/sample-minimal-guide`.

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

## 5b. Lessons Learned (September 2026 sessions) — read before building or batching guides

**Templates and scope**
- Best X articles must use The Office Journal layout (`BestGuidePage`, adapted from `RichGuidePage`). A custom "buying guide" template was built once and rejected by the user. Check existing repo components and the user's reference articles before designing anything new.
- Filter keyword lists to real "best" roundups inside the five topics. Drop vs/comparison, deals/Black Friday, "is it worth it", how-to, laptops and software. Merge near-synonym keywords (e.g. "keyboard for work" + "keyboard for office work") instead of forcing different products.

**Data sourcing and token cost**
- Get product data from the Amazon Creators API first (`scripts/pcj-amazon-search.mjs`, one call per query, append-only pools). Heavy WebFetch/WebSearch burned session usage and many review sites (RTINGS, TechSpot, PC Gamer, MSI) block or truncate fetches anyway.
- Use web research only for a few measured third-party figures, attributed inline. Products not sold on Amazon (e.g. Wooting) cannot be picks.
- Credentials live only in `.env.local`; the site tag is `thepcjournal-20`. Never commit keys.

**Facts must be verified, not assumed**
- Listings contradict themselves (ATX 3.0 vs 3.1 in title vs bullets), carry reseller errors (an MX Master 3S listing claimed "ambidextrous" and "laser sensor"), or are empty (Turtle Beach Stealth 600 Gen 3). Leave a field undefined, pick the official listing, or drop the product.
- Regex extraction is only a proposal: it misread a 450W GPU-rail figure as the PSU wattage and a fan size as a depth. Review every extracted field.
- Do not add plausible details the listing doesn't state (retractable or detachable mics, flip-to-mute, fan counts, Bluetooth). Drop prices that look anomalous (a $160 550W unit) rather than recommend them.
- If too few products have a verified spec, drop the topic (the "140mm compact PSU" article was cut) instead of padding it.

**Writing quality**
- Template sentences cannot avoid cross-article duplication at scale: even with 3-5 variants, 8-word phrases repeated across 5-10 guides. The validator catches this; fix it with data-driven sentences and per-article writing, not more synonyms.
- "Why we like it" needs substance (target 100+ words per pick). Use the four-layer structure: an editorial take (2-3 sentences, product-specific), ranking against every other pick on each listed spec with the leader named, category compatibility checks, and a trade-off naming the pick that covers the weakness.
- Do not copy the Best Finds Reviews pattern: its longer text came from pasted marketing bullets, truncated pros, identical filler sentences and invented hands-on impressions ("learning curve eases after a few uses"). Length is not value.
- Labels: rules assign a label only to a strict winner; otherwise write an editorial label whose reason is a listed fact. Never auto-assign "Best Overall" to rank 1; rank order is editorial, not rule order.
- Avoid redundancy: notes already covered by the editorial take are skipped; avoid doubled nouns ("2.5-slot slot width") and awkward skip-if phrasing.
- Do not pad pros/cons or specs to hit a count when a listing is thin; a validator warning is acceptable.

**Depth and uniqueness at scale (batches 14-17)**
- Uniqueness comes from different products and different reasons, not synonyms. Every article must have its own filter or sort and a lead that says what all its picks share ("every chair lists adjustable lumbar support"). Two keywords that would pick the same products are one article.
- Depth comes from complete facts. Each unset field turns into a "not stated in its listing" con and weakens the ranking sentences. When writing facts, read the **title as well as the bullets**: the ASUS VG27AQM5A title said G-SYNC and the Samsung G6 title said 3-year warranty, but both were missing from facts; the ELABEST X100 listing gave 300 lbs and seat height that the facts left out. Fixing a shared fact sheet improves every guide that uses it.
- Record units the schema expects: battery in months vs hours, speaker `peak` only for figures called peak (RMS goes in notes), layout only when stated. Never infer layout, battery hours, wired/wireless or weight from the product family.
- Auto takes (built from specs and notes) are the weakest part of a pipeline guide. When a batch introduces many new ASINs, write 2-3 sentence takes for them in the batch lib's take map; the editorial take is the pull quote and the first thing a reader sees.
- Comparative claims ("lightest", "longest battery", "cheapest", "only") must be checked against every pick in that article. A 10-guide review found five overstatements: "4000 DPI highest" (a 30K mouse was in the set), "longest battery" (a rival listed more hours), "medium to large hands" (the listing said "a variety of hand sizes"), a switch described beyond its listing, and "longest battery" among keyboards whose rivals stated no figure.
- Composer cons must make sense for the product: no battery con for wired-only products (fixed in `comparativeCons`), and a real weakness (e.g. "No subwoofer") beats "Costs more than X". Add schema `weakness` functions rather than accepting price-only cons.
- Labels must read like editorial badges. Machine badges from raw values ("USB 3.0 (USB-A) Pick", "Compact, ambidextrous Pick", "EM11 NL Pick") were rejected; the batch17 labeller only uses short, clean values and otherwise falls back to neutral badges with a factual reason.
- Filter out wrong-audience items by name as well as by field: a kids' chair without an `ages` field landed in "best budget gaming chair".
- Medical keywords (back pain, carpal tunnel) get an SEO title about support or comfort, a lead that sends pain to a clinician, and no claim that a product relieves anything.

**Reader-facing voice (Sept 2026 fix)**
- Product copy talks about the product and the reader, not about Amazon listings. Never write "the listing also calls out/highlights", "its listing does not state", "lists <field>: <value>", "It shares yes for footrest", "Look elsewhere if this is a problem for your setup". Use "It stands out for…", "You also get…", "The maker doesn't state…", "Skip it if price comes first: the X cost less when we checked." Research-method sentences in the intro may still mention listings.
- Templates must not turn schema fields into prose as "label: value". Descriptive comparisons only use short, concrete values ("3D armrests", "a USB-C connection"); yes/no flags, category labels (type/does/kind/form) and long descriptions stay in the spec table.
- Scan for these phrases across the registry after any composer or batch change (`scanphr` pattern: `/\b(the|its) listing\b|shares (yes|no)|Look elsewhere if|lists [a-z ]+: [A-Z]/i`), including text after `\n\n` in source strings, which `\b` regexes miss.

**Unique openings and sections (batch 19 fix)**
- Each batch19-plan `lead` must be 2 sentences: a keyword-specific buying point, then what every pick shares. A lone "Every pick…" sentence was rejected as samey.
- `batch17-lib.ts` builds the dek (price span plus spec leader), the method line (combinatorial, named fields), badge reasons and `extraFaq`/`extraCriteria` from each guide's own picks; the composer shows these before 3-4 pooled category items. Never go back to one fixed dek/method template.
- Measure 8-word repeats across the new batch by section (dek, intro, desc, pros, FAQ, criteria) before shipping.

**"Why we like it" length and paragraphing (user request, Sept 2026)**
- Keep "Why we like it" length even across picks and across guides (target 100-160 words per pick); no pick should be a one-paragraph stub next to 200-word neighbours.
- Write paragraphs of about three sentences each. Do not split the text into one-sentence paragraphs (e.g. a lone "It also offers X." or a lone price-position line); merge short layers (notes, compatibility, price position, trade-off) into the neighbouring paragraph when composing.
- Enforced in code since Sept 2026: `whyParagraphs()` in `lib/pc-compose/generic.ts` packs sentences into 2-4-sentence paragraphs (the renderer splits the take's first sentence off as the verdict, so the rest of the take shares a paragraph), drops sentences that restate an earlier one (60% stemmed-word overlap), trims to 160 words and only then tops up to 100 with novel, pick-specific extras. Never pad with label-restating filler ("That is why it carries the X label").
- When a product's facts are too thin to reach 100 words, add 1-3 sentences for that ASIN in `data/clusters/why-extra.ts`, written from listing bullets that the description does not already use (not marketing copy, no invented positions or features). Measure every batch: median, <100, >160 and one-sentence paragraphs, using the renderer's verdict split.

**Process and cost (batches 14-17)**
- The planner and validator are the quality gate for scale. After each run, read a sample per group (labels, word counts, cons, one full description) before building; the validator does not catch awkward labels, wrong-audience picks or empty-sounding cons.
- Subagents can hit the account's weekly limit (HTTP 429) and stop before writing anything. Check that their files changed before assuming work was done, and review everything an agent writes: agent output in these batches missed a G-SYNC field and duplicated an existing slug.
- A batch that throws at import time (e.g. a builder with 0 candidates) breaks the whole site build and the validator. Always run `npx tsc --noEmit` and the validator after adding a batch.
- Python 3.12 is installed at `/c/Users/ADMIN/AppData/Local/Programs/Python/Python312/python.exe` (not on PATH in older shells); Node/tsx scripts are usually enough.

**Technical gotchas**
- An `sr-only` span inside a horizontally scrollable table escaped the scroll box and caused mobile page overflow. Scroll wrappers must be `relative`.
- Git Bash rewrites "/" paths passed to node (e.g. to "C:/Program Files/Git/"); use `MSYS_NO_PATHCONV=1`.
- Chrome headless has a minimum window width, so use the DevTools-protocol script with device emulation to check 360-430px layouts.
- Rebuild before restarting `next start`; stale `.next/types` can reference renamed routes.
- The user wants review links at the real URL (`/guides/<slug>`), not a preview route.

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
PCJ_ENABLE_PREVIEW=true npm run start        # include /dev/preview/*
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
| `PCJ_ENABLE_PREVIEW` | `true` to serve `/dev/preview/*` (never in production) |
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
