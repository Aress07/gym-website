import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

export function PilatesBand({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-navy via-[#2a1a7a] to-royal py-14 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="inline-block rounded-full bg-orange px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-ink">
            {dict.pilates.eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
            {dict.pilates.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">{dict.pilates.text}</p>
          <Link
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(255,30,162,0.45)] transition-colors hover:bg-magenta"
          >
            {dict.pilates.cta}
          </Link>
        </div>
        <div className="overflow-hidden rounded-card">
          <Image
            src="/images/pilates-class.webp"
            alt="Cours de pilates ADRENAL'IN"
            width={1280}
            height={960}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}