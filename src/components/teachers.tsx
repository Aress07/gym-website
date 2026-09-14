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
    <section id="professeurs" className="scroll-mt-28 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.teachers.eyebrow}
          title={dict.teachers.title}
          lead={dict.teachers.lead}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.teachers.items.map((teacher) => (
            <div
              key={teacher.name}
              className="group overflow-hidden rounded-card border border-sky bg-white transition-transform hover:-translate-y-1"
            >
              <div className="relative h-72 overflow-hidden bg-sky">
                <Image
                  src={TEACHER_IMAGES[teacher.name]}
                  alt={teacher.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-5 pb-4 pt-10">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange">{teacher.role}</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-extrabold text-navy">{teacher.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-grey">{teacher.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}