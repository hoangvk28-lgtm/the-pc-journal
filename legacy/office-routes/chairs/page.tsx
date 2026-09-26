import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiloHub } from "@/components/sections/SiloHub";
import { getSiloBySlug } from "@/data/silos";
import { getCategoryBySlug } from "@/data/categories";
import { getPublicGuidesByCategory } from "@/lib/public-guides";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 86400;

const SLUG = "chairs";

export async function generateMetadata(): Promise<Metadata> {
  const silo = getSiloBySlug(SLUG);
  if (!silo) return {};
  return buildMetadata({
    title: silo.name,
    description: silo.description,
    path: `/${SLUG}`,
  });
}

export default async function Page() {
  const silo = getSiloBySlug(SLUG);
  if (!silo) notFound();

  const category = getCategoryBySlug("chairs");
  const guides = await getPublicGuidesByCategory("chairs", category?.matchSlugs);

  return (
    <SiloHub
      silo={silo}
      guides={guides.map((g) => ({
        slug: g.slug,
        title: g.title,
        description: g.description,
        readTime: g.readTime,
      }))}
    />
  );
}
