import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { ArrowRightIcon } from "@/components/icons";
import { CLASS_IMAGES, type ClassId } from "@/lib/classes";
import type { Dictionary } from "@/lib/i18n";

export function Classes({ dict }: { dict: Dictionary }) {
  return (
    <section id="cours" className="scroll-mt-28 bg-blush py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.classes.eyebrow}
          title={dict.classes.title}
          lead={dict.classes.lead}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.classes.items.map((item) => {
            const id = item.id as ClassId;
            const tagKey = item.tags[0] as keyof typeof dict.classes.tags;
            return (
              <a
                key={id}
                href="#contact"
                className="group relative overflow-hidden rounded-card border border-white bg-white p-2 transition-all hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden rounded-[0.9rem] sm:h-48">
                  <Image
                    src={CLASS_IMAGES[id]}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-orange px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-ink">
                    {dict.classes.tags[tagKey]}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <h3 className="text-base font-extrabold text-navy">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-grey">{item.text}</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky text-navy transition-colors group-hover:bg-pink group-hover:text-white">
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}