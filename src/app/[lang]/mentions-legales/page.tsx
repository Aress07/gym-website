import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/mentions-legales">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).legal.title };
}

export default async function LegalNoticePage({
  params,
}: PageProps<"/[lang]/mentions-legales">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <main className="flex-1 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}`}
            className="inline-block text-sm font-semibold text-pink hover:underline"
          >
            ← {dict.legal.back}
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            {dict.legal.title}
          </h1>
          <div className="mt-10 space-y-10">
            {Object.values(dict.legal.sections).map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-extrabold text-navy">{section.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-grey sm:text-base">
                  {section.text}
                </p>
              </section>
            ))}
            <section>
              <h2 className="text-lg font-extrabold text-navy">ADRENAL&apos;IN</h2>
              <p className="mt-3 text-sm leading-relaxed text-grey sm:text-base">
                {SITE.address.street}, {SITE.address.city}, France — {SITE.phoneDisplay}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}