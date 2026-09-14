import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { SITE } from "@/lib/site";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const columns: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: dict.footer.adults,
      links: [
        { label: "Danses de salon", href: "#cours" },
        { label: "Rock'n'Roll & Swing", href: "#cours" },
        { label: "Salsa · Bachata · Kizomba", href: "#cours" },
        { label: "Street Jazz", href: "#cours" },
        { label: "Fitness", href: "#cours" },
        { label: "Pilates", href: "#cours" },
      ],
    },
    {
      title: dict.footer.kids,
      links: [
        { label: "Éveil · Initiation · Multi-Arts", href: "#cours" },
        { label: "Danse contemporaine", href: "#cours" },
        { label: "K-Pop", href: "#cours" },
      ],
    },
    {
      title: dict.footer.wellness,
      links: [
        { label: dict.footer.info, href: "#apropos" },
        { label: dict.footer.privacy, href: `/${locale}/politique-de-confidentialite` },
        { label: dict.footer.legal, href: `/${locale}/mentions-legales` },
      ],
    },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white">
                <Image
                  src="/images/logo.webp"
                  alt={SITE.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </span>
              <span>
                <span className="block text-lg font-extrabold uppercase tracking-tight">{SITE.name}</span>
                <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-pink">
                  Danse · Fitness · Pilates
                </span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/70">{dict.footer.tagline}</p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-pink"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-pink"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-1">
              <p className="text-sm font-extrabold uppercase tracking-wider text-orange">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-pink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-pink" />
            <div className="text-sm text-white/70">
              <p className="font-bold text-white">{SITE.address.street}</p>
              <p>{SITE.address.city}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 sm:justify-end">
            <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-pink" />
            <div className="text-sm text-white/70">
              <a href={SITE.telHref} className="font-bold text-white hover:text-pink">
                {SITE.phoneDisplay}
              </a>
              <p>{dict.location.hoursValue}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-8 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name} — {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/mentions-legales`} className="hover:text-pink">
              {dict.footer.legal}
            </Link>
            <Link href={`/${locale}/politique-de-confidentialite`} className="hover:text-pink">
              {dict.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}