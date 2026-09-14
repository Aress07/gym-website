import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { DownloadIcon } from "@/components/icons";
import { SITE } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

export function Schedule({ dict }: { dict: Dictionary }) {
  return (
    <section id="planning" className="scroll-mt-28 bg-cream py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.schedule.eyebrow}
          title={dict.schedule.title}
          lead={dict.schedule.lead}
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-card border border-white bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-extrabold text-navy">{dict.schedule.planningTitle}</h3>
              <a
                href={SITE.planningPdf}
                className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-royal"
              >
                <DownloadIcon className="h-4 w-4" />
                {dict.schedule.planningPdf}
              </a>
            </div>
            <a href="/images/planning-2026-2027.jpeg" target="_blank" rel="noopener noreferrer" className="group mt-5 block">
              <div className="relative aspect-square overflow-hidden rounded-[0.9rem] bg-sky sm:aspect-[4/5]">
                <Image
                  src="/images/planning-2026-2027.jpeg"
                  alt={dict.schedule.planningTitle}
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-contain object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </a>
            <p className="mt-4 text-center">
              <a
                href="/images/planning-2026-2027.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-pink hover:underline"
              >
                {dict.schedule.planningOpen}
              </a>
            </p>
          </div>

          <div className="rounded-card border border-white bg-white p-6">
            <h3 className="text-xl font-extrabold text-navy">{dict.schedule.tarifsTitle}</h3>
            <div className="mt-4 rounded-[0.9rem] bg-blush p-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-orange px-3.5 py-1.5 text-xs font-extrabold text-ink">
                {dict.schedule.tarifsNote}
              </p>
            </div>
            <div className="relative mt-4 aspect-square overflow-hidden rounded-[0.9rem] bg-sky">
              <Image
                src="/images/tarifs-2026-2027.webp"
                alt={dict.schedule.tarifsTitle}
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-contain object-top"
              />
            </div>
            <div className="mt-6 text-center">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-magenta"
              >
                {dict.schedule.tarifsCta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}