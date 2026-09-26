# The PC Journal

A PC hardware publication built from The Office Journal codebase. Public pages focus on components, builds, upgrades, monitors and peripherals. The inherited Office Journal content is retained in the repository for review and is blocked from public routes.

## Run locally

1. Copy `.env.example` to `.env.local` and keep `SITE_LAUNCHED=false`.
2. Run `npm ci`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Editorial and launch status

See [docs/PCJ-LAUNCH-AUDIT.md](docs/PCJ-LAUNCH-AUDIT.md) for the content inventory, held integrations and launch gate. Product-specific rankings are not yet published. No affiliate tag, analytics ID, publisher email, or production database has been assumed for this site.

## Validation

Run `npx tsc --noEmit`, `npm run lint`, and `npm run build` after changes. Public page allowlisting is in `proxy.ts`; update it and the sitemap when new content has passed editorial review.