import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/politique-de-confidentialite">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).privacy.title };
}

export default async function PrivacyPolicyPage({
  params,
}: PageProps<"/[lang]/politique-de-confidentialite">) {
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
            ← {dict.privacy.back}
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            {dict.privacy.title}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-grey sm:text-base">
            {dict.privacy.intro}
          </p>
          <div className="mt-10 space-y-10">
            {Object.values(dict.privacy.sections).map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-extrabold text-navy">{section.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-grey sm:text-base">
                  {section.text}
                </p>
              </section>
            ))}
          </div>
          <p className="mt-10 rounded-card border border-sky bg-blush p-5 text-sm text-ink">
            ADRENAL&apos;IN — {SITE.address.street}, {SITE.address.city}, France —{" "}
            <a href={SITE.telHref} className="font-semibold text-pink hover:underline">
              {SITE.phoneDisplay}
            </a>
          </p>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}