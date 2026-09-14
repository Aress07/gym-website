import { SectionHeading } from "@/components/section-heading";
import { StarIcon } from "@/components/icons";
import { SITE } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

export function Reviews({ dict }: { dict: Dictionary }) {
  return (
    <section id="avis" className="scroll-mt-28 bg-sky py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.reviews.eyebrow}
          title={dict.reviews.title}
          lead={dict.reviews.lead}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {dict.reviews.items.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-card border border-white bg-white p-7"
            >
              <div className="flex gap-1 text-pink">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-6 border-t border-sky pt-4 text-sm font-bold text-navy">
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={SITE.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-navy px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            {dict.reviews.cta}
          </a>
        </div>
      </div>
    </section>
  );
}