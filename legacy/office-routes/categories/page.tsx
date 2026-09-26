import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { MIGRATED_CATEGORY_TO_SILO } from "@/lib/migrated-silos";
import { categories } from "@/data/categories";
import { getPublicProducts } from "@/lib/public-products";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "All Categories -- Small Space Products | The Office Journal",
  description:
    "Browse all product categories: desk setup, dorm essentials, small room storage, and more. Find the right buying guide for your space.",
  path: "/categories",
});

const CATEGORY_ICONS: Record<string, string> = {
  "desk-setup":        "🖥️",
  "dorm-essentials":   "🎓",
  "small-room-storage":"📦",
  "compact-home-office":"💼",
  "budget-finds":      "💰",
};

export default async function CategoriesPage() {
  const products = await getPublicProducts();

  return (
    <Container className="py-12">
      <Breadcrumbs
        crumbs={[{ label: "Categories", href: "/categories" }]}
      />

      <div className="mt-6 mb-10 max-w-2xl">
        <h1 className="text-4xl font-bold text-ink tracking-tight mb-3">All Categories</h1>
        <p className="text-ink-secondary leading-relaxed text-lg">
          Browse products and buying guides by category. Each category covers a specific small-space need with scored recommendations and comparison tables.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const catProducts = products.filter((p) => p.categorySlug === cat.slug);
          const icon = CATEGORY_ICONS[cat.slug] ?? "📋";
          return (
            <Link prefetch={false}
              key={cat.slug}
              href={MIGRATED_CATEGORY_TO_SILO[cat.slug] ? `/${MIGRATED_CATEGORY_TO_SILO[cat.slug]}` : `/categories/${cat.slug}`}
              className="group flex flex-col gap-4 p-6 bg-white rounded-card border border-border hover:border-brand/40 hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${cat.color}18` }}
                >
                  {icon}
                </div>
                <div>
                  <h2 className="font-bold text-ink text-base group-hover:text-brand transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-ink-muted">{cat.subcategories.length} subcategories</p>
                </div>
              </div>

              <p className="text-sm text-ink-secondary leading-relaxed flex-1">
                {cat.shortDescription}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-ink-muted">{catProducts.length} products evaluated</span>
                <span className="text-xs font-semibold text-brand group-hover:text-brand-dark transition-colors">
                  Browse &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
