import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSlider } from "@/components/hero-slider";
import { TrustStrip } from "@/components/trust-strip";
import { About } from "@/components/about";
import { Classes } from "@/components/classes";
import { PilatesBand } from "@/components/pilates-band";
import { Teachers } from "@/components/teachers";
import { Schedule } from "@/components/schedule";
import { Reviews } from "@/components/reviews";
import { BookingForm } from "@/components/booking-form";
import { Gallery } from "@/components/gallery";
import { Location } from "@/components/location";
import { Footer } from "@/components/footer";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      locale: lang === "fr" ? "fr_FR" : "en_EN",
    },
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.domain}/#studio`,
    name: SITE.name,
    legalName: SITE.legalName,
    description: dict.meta.description,
    url: `${SITE.domain}/${locale}`,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE.domain}/images/logo.webp`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: "Margny-lès-Compiègne",
      postalCode: "60280",
      addressCountry: SITE.address.country,
    },
    sameAs: [SITE.facebook, SITE.instagram],
    openingHours: "Mo-Th 09:00-21:00,Fr 09:00-19:00,Sa 09:00-17:00",
    founder: {
      "@type": "Person",
      name: "Cathy MOHR",
    },
    courses: dict.classes.items.map((c) => ({
      "@type": "Course",
      name: c.title,
      description: c.text,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSlider locale={locale} />
      <TrustStrip dict={dict} />
      <About dict={dict} />
      <Classes dict={dict} />
      <PilatesBand dict={dict} />
      <Teachers dict={dict} />
      <Schedule dict={dict} />
      <Reviews dict={dict} />
      <BookingForm locale={locale} />
      <Gallery dict={dict} />
      <Location dict={dict} />
      <Footer locale={locale} dict={dict} />
    </>
  );
}