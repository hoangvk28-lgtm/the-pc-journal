# Brief: informational hub guides (wave 1)

Goal: support articles that give each sub-topic hub (`lib/pc-content/subtopics.ts`, routed at
`/topics/<category>/<subtopic>`) topical depth, so the hub's buying guides rank. Quality over count:
Google is already looking at 2,300 pipeline-built pages on a new domain; every new page must be
something a reader could not get from the buying guides.

## Read first
- `CLAUDE.md` sections 4, 6, 7 (content model, SEO budgets, editorial honesty). They are binding.
- `lib/pc-content/types.ts` (`InformationalGuide`, `GuideModule`), `components/pc/article/GuideTemplate.tsx`
  (how each module renders), and one existing record in `data/pc-articles.ts` as a style reference.
- `docs/pcj-subtopic-inventory.md`: existing articles per hub. **Never duplicate an existing topic**
  (including the templated `how-to-upgrade-a-…`, `is-a-…-worth-it`, `…-features-explained` long-forms).

## Record format
- One file per agent, e.g. `data/info/<name>.ts`: `export const <name>Guides: InformationalGuide[] = [...]`.
  Do NOT edit `lib/pc-content/index.ts`; the lead registers the file.
- `type: "guide"`, `status: "published"`, the hub's `category`, and `subtopic: "<hub slug>"` (the
  field exists on `ArticleBase`).
- `author: { name: "The PC Journal", url: "/about-the-pc-journal" }`. No dates (`publishedAt`/`updatedAt` omitted).
- `seoTitle` ≤ 43 chars (check in code). `metaDescription` 120-160 chars (check in code), one sentence on
  what the reader can decide. `dek` and `teaser` differ from each other and from the title.
- Slug: lowercase, hyphenated, the natural query ("how-to-choose-psu-wattage", "pcie-5-vs-pcie-4-ssd").
- `related`: 3-5 slugs of **published** articles from the inventory (same hub + a compat hub), checked to exist.
- Modules: start with `key-takeaway` (the direct answer in 2-3 sentences). Then use what fits:
  `check-your-pc`, `explanation` (2-4 paragraphs each), `decision-table`, `choose-if`, `steps`,
  `compatibility`, `mistakes`, `next-steps` (link to 2-4 real `/guides/<slug>` buying guides from the hub).
  Target 1,200-2,000 words. Every section must say something specific: numbers, connector names,
  standards, what to look up and where (spec sheet, QVL, BIOS support list).
- `sources`: 2-5 primary sources you are confident exist (PCI-SIG, JEDEC, Intel ARK, AMD product pages,
  VESA, USB-IF, Cybenetics, 80 PLUS/CLEAResult, Microsoft docs, NVIDIA/AMD spec pages). Use the
  homepage or a stable spec page URL; do not invent deep URLs you cannot verify.

## Accuracy rules (hard)
- Only state facts you are certain of (standards, connector specs, interface bandwidths, socket names).
  If unsure of a number, describe how to check it instead of guessing.
- No "we tested", no invented benchmarks, FPS figures, prices or product claims. No "future-proof",
  "ultimate". No medical claims.
- Advice is conditional on workload and current configuration, never universal.
- Write for a reader, not about "listings". Plain, calm, precise English. Paragraphs of ~3 sentences.
- No phrase reused verbatim across your articles (the validator flags 8-word repeats in 4+ guides).

## Done means
1. `npx tsc --noEmit` passes with your file imported temporarily (or type-annotated so it checks alone).
2. A short script confirms title/meta lengths and that every `related` and `next-steps` href exists in
   the published registry.
3. Report: file path, slugs with word counts, anything you were unsure of and left out.
