import { SectionHeading } from "@/components/section-heading";
import { CarIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { SITE } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

export function Location({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className="scroll-mt-28 bg-blush py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.location.eyebrow}
          title={dict.location.title}
          lead={dict.location.lead}
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ul className="space-y-4">
              <li className="flex items-start gap-4 rounded-card border border-white bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink text-white">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-extrabold text-navy">{dict.location.title}</p>
                  <p className="mt-1 text-sm text-grey">{SITE.address.street}</p>
                  <p className="text-sm text-grey">{SITE.address.city}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-card border border-white bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-royal text-white">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-extrabold text-navy">{dict.location.hours}</p>
                  <p className="mt-1 text-sm text-grey">{dict.location.hoursValue}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-card border border-white bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                  <CarIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-extrabold text-navy">{dict.location.parking}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-card border border-white bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange text-ink">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-extrabold text-navy">{dict.location.phone}</p>
                  <a href={SITE.telHref} className="mt-1 block text-sm font-semibold text-pink hover:underline">
                    {SITE.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-card border border-white bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint text-navy">
                  <MailIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-extrabold text-navy">{dict.location.email}</p>
                  <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm font-semibold text-pink hover:underline">
                    {SITE.email}
                  </a>
                </div>
              </li>
            </ul>
            <a
              href={SITE.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-royal"
            >
              <MapPinIcon className="h-4 w-4" />
              {dict.location.directions}
            </a>
          </div>
          <div className="overflow-hidden rounded-card border border-white bg-white lg:col-span-3">
            <iframe
              src={SITE.mapsEmbed}
              title={`ADRENAL'IN — ${SITE.address.city}`}
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0 lg:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}