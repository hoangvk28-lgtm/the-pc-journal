import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiloHub } from "@/components/sections/SiloHub";
import { getSiloBySlug } from "@/data/silos";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 86400;

const SLUG = "workspace-ideas";

export async function generateMetadata(): Promise<Metadata> {
  const silo = getSiloBySlug(SLUG);
  if (!silo) return {};
  return buildMetadata({
    title: silo.name,
    description: silo.description,
    path: `/${SLUG}`,
  });
}

export default function Page() {
  const silo = getSiloBySlug(SLUG);
  if (!silo) notFound();
  return <SiloHub silo={silo} />;
}
