import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiloHub } from "@/components/sections/SiloHub";
import { getSiloBySlug } from "@/data/silos";
import { buildMetadata } from "@/lib/seo";
import { getPublicGuidesByCategory } from "@/lib/public-guides";
import { canonicalGuidePath } from "@/lib/migrated-silos";
import { DEPARTMENT_MATCH_SLUGS } from "@/lib/departments";

export const revalidate = 86400;

const SLUG = "ergonomics";

export async function generateMetadata(): Promise<Metadata> {
  const silo = getSiloBySlug(SLUG);
  if (!silo) return {};
  return buildMetadata({ title: silo.name, description: silo.description, path: `/${SLUG}` });
}

export default async function Page() {
  const silo = getSiloBySlug(SLUG);
  if (!silo) notFound();
  const guides = await getPublicGuidesByCategory(SLUG, DEPARTMENT_MATCH_SLUGS[SLUG]);
  return (
    <SiloHub
      silo={silo}
      guides={guides.map((g) => ({
        slug: g.slug,
        title: g.title,
        description: g.description,
        readTime: g.readTime,
        href: canonicalGuidePath(g),
      }))}
    />
  );
}
