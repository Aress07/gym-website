import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/lib/i18n";

const TEACHER_IMAGES: Record<string, string> = {
  "Cathy MOHR": "/images/cathy.webp",
  "Lopez BROOKLYN": "/images/lopez.webp",
  "Carlotta CHIREUX": "/images/carlotta.webp",
  "Lauryn MATONDO": "/images/lauryn.webp",
};

export function Teachers({ dict }: { dict: Dictionary }) {
  return (
    <section id="professeurs" className="scroll-mt-28 bg-white py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.teachers.eyebrow}
          title={dict.teachers.title}
          lead={dict.teachers.lead}
        />
        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {dict.teachers.items.map((teacher) => (
            <div
              key={teacher.name}
              className="group flex flex-row gap-4 overflow-hidden rounded-card border border-sky bg-white p-3 transition-transform hover:-translate-y-1 sm:flex-col sm:p-0"
            >
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[0.8rem] bg-sky sm:h-60 sm:w-full sm:rounded-none lg:h-72">
                <Image
                  src={TEACHER_IMAGES[teacher.name]}
                  alt={teacher.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 112px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center py-1 sm:flex-none sm:p-5">
                <h3 className="text-[0.95rem] font-extrabold leading-snug text-navy sm:text-lg">{teacher.name}</h3>
                <p className="mt-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-pink sm:mt-1 sm:text-xs">{teacher.role}</p>
                <p className="mt-2 text-[0.8rem] leading-snug text-grey sm:mt-3 sm:text-sm">{teacher.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}