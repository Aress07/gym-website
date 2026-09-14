import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { CheckIcon, MapPinIcon } from "@/components/icons";
import type { Dictionary } from "@/lib/i18n";

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="apropos" className="scroll-mt-28 bg-white py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="overflow-hidden rounded-card">
              <Image
                src="/images/studio-hall.webp"
                alt="Studio ADRENAL'IN"
                width={1280}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-3 hidden rounded-card border border-sky bg-white px-6 py-5 sm:block lg:-right-6">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <CheckIcon key={i} className="h-4 w-4 text-pink" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-navy">ADRENAL&apos;IN</p>
                  <p className="text-xs text-grey">{dict.stats[2].label}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow={dict.about.eyebrow}
              title={dict.about.title}
              lead={dict.about.lead}
              align="left"
            />
            {dict.about.paragraphs.map((p) => (
              <p key={p} className="mt-4 text-grey">
                {p}
              </p>
            ))}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {dict.about.points.map((point) => (
                <div
                  key={point.title}
                  className="rounded-card border border-sky bg-blush p-5"
                >
                  <p className="text-sm font-extrabold text-navy">{point.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-grey">{point.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
              {dict.about.location.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3.5 py-1.5 text-xs font-semibold text-navy"
                >
                  <MapPinIcon className="h-3.5 w-3.5 text-pink" />
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy">
              <Image
                src="/images/ffd-logo.jpg"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover"
              />
              {dict.about.ffd}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}