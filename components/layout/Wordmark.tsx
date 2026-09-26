import Image from "next/image";
import Link from "next/link";

export function Wordmark({ size = "md" }: { size?: "md" | "sm" }) {
  const md = size === "md";
  return (
    <Link prefetch={false} href="/" aria-label="The PC Journal, home" className="inline-flex min-w-0 items-center gap-2.5 focus-ring sm:gap-3">
      <Image src="/pc-logo.png" alt="" width={256} height={256} className={md ? "h-9 w-9 shrink-0 sm:h-11 sm:w-11" : "h-8 w-8"} priority={md} />
      <span className="flex min-w-0 flex-col justify-center">
        <span className={`whitespace-nowrap font-semibold uppercase leading-none tracking-[-0.035em] text-ink ${md ? "text-[1.3125rem] sm:text-[1.625rem] xl:text-[1.8125rem]" : "text-lg"}`}>
          The <span className="text-brand">PC</span> Journal
        </span>
        {md && (
          <span className="mt-1.5 hidden whitespace-nowrap text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.16em] text-ink-secondary md:block">
            Understand your hardware. Build with confidence.
          </span>
        )}
      </span>
    </Link>
  );
}
