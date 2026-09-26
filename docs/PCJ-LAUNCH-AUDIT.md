# The PC Journal: clone audit and launch notes

## Positioning and design

The public site now presents build, upgrade and compatibility decisions for PC readers. It uses a warm neutral background, graphite text, cobalt accent, Inter type and a PCJ mark. The home page contains six research-based decision guides and five useful topic pages. It does not claim original benchmarks or hands-on testing.

## Inherited content inventory

- **Relevant, requiring substantive review:** mini PC, gaming monitor, display and PC peripheral guide files under `data/guides/`; associated product records and images. These are held behind the public route gate. Product-specific rankings, prices, review labels, authorship and compatibility claims must be checked before adapting them.
- **Potentially relevant, requiring research:** general monitor, keyboard and setup articles; comparison templates; existing product tables. Reuse components after a PC-specific evidence and accessibility pass.
- **Irrelevant to this publication:** office chairs, desks, lighting, dorm and workspace articles; legacy About, contact, author, reviews, categories, deals, office silos and their old routes. They remain in the clone for editorial inventory but return 404 through `proxy.ts` on the public site. Do not bulk redirect them to the PC home page.

The new sitemap lists only the new PC pages and is empty while `SITE_LAUNCHED` is false. The proxy also sends `X-Robots-Tag: noindex, nofollow` before launch. A dedicated PC site must not point at the Office Journal Supabase project.

## Content and article system

The six published guides explain a decision process and do not rank products. `lib/pc-buying-guide.ts` defines a stricter contract for future Best X articles: workload, budget, existing system, category criteria, evidence, fit, skip conditions, exact compatibility checks, limits and alternatives. `isPublishablePcGuide` requires these fields. `HardwareComparisonTable` keeps model names and column headings readable on mobile.

## Integrations held inactive

- Amazon Associates tag: provide a **confirmed tag for this site** before adding tracked links. Creators API credentials for another application were used only during an earlier diagnostic and are not copied here.
- Analytics, Clarity and Search Console: create identifiers for this publication. The Office Journal analytics ID was removed.
- Newsletter: no signup appears because the clone's form had no backend.
- Contact: configure a publisher contact channel before launch. The inherited WorkCocoon email is not used.
- Admin: configure ADMIN_EMAIL, ADMIN_PASSWORD and SESSION_SECRET together; the public proxy blocks admin routes until then.
- Supabase: connect a separate project only after reviewing schema and publication workflow.
- IndexNow cron: disabled. Generate a new key and revise its URL inventory before enabling.

## Launch gate

Keep `SITE_LAUNCHED=false` on staging. Before setting it to `true`, confirm the domain and canonical host, publisher contact and privacy details, the editorial review of any product recommendations, the correct affiliate tag, and the production analytics choices. Production deployment is not part of this work.
