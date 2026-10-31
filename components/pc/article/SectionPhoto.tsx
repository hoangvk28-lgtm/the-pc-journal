import Image from "next/image";
import type { SectionPhoto as Photo } from "@/lib/guide-hero";

/** A real photo inside a guide section; the alt text doubles as the caption. */
export function SectionPhoto({ photo, className = "mt-8" }: { photo?: Photo; className?: string }) {
  if (!photo) return null;
  return (
    <figure className={className}>
      <div className="relative aspect-[16/9] overflow-hidden bg-surface">
        <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 800px) 100vw, 760px" className="object-cover" />
      </div>
      <figcaption className="mt-2 text-sm text-ink-secondary">{photo.alt}</figcaption>
    </figure>
  );
}
