import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { CookieBar } from "@/components/cookie-bar";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";

  if (!isLocale(lang)) notFound();

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <CookieBar locale={locale} />
    </>
  );
}