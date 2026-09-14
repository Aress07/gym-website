import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { InstagramIcon } from "@/components/icons";
import { GALLERY_IMAGES } from "@/lib/classes";
import { SITE } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

export function Gallery({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-white py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.gallery.eyebrow}
          title={dict.gallery.title}
          lead={dict.gallery.lead}
        />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {GALLERY_IMAGES.map((image, i) => (
            <a
              key={image.src}
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-card"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-navy/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <InstagramIcon className="h-8 w-8 text-white" />
              </div>
              <span className="sr-only">{i + 1}</span>
            </a>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-magenta"
          >
            <InstagramIcon className="h-4 w-4" />
            {dict.gallery.cta}
          </a>
        </div>
      </div>
    </section>
  );
}