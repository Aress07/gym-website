"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, MenuIcon, PhoneIcon, CloseIcon } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const other: Locale = locale === "fr" ? "en" : "fr";

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy text-white md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs font-medium sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span>{dict.topbar.location}</span>
            <span aria-hidden="true" className="text-white/40">•</span>
            <span>{dict.topbar.freeTrial}</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-pink"
            >
              <FacebookIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-pink"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>
            <a href={SITE.telHref} className="hidden items-center gap-1.5 hover:text-pink lg:flex">
              <PhoneIcon className="h-3.5 w-3.5" />
              {SITE.phone}
            </a>
            <Link
              href={`/${other}`}
              className="rounded-full border border-white/30 px-2.5 py-0.5 font-semibold transition-colors hover:border-pink hover:text-pink"
            >
              {dict.nav.language}
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_4px_20px_rgba(9,1,134,0.12)]" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
          <a href="#top" className="flex shrink-0 items-center gap-2 lg:gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-navy lg:h-13 lg:w-13">
              <Image
                src="/images/logo.webp"
                alt={SITE.name}
                width={52}
                height={52}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="leading-tight">
              <span className="block font-extrabold tracking-tight text-navy uppercase">
                {SITE.name}
              </span>
              <span className="hidden min-[400px]:block text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-pink lg:text-xs">
                Danse · Fitness · Pilates
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main">
            {dict.nav &&
              [
                { label: dict.nav.about, href: "#apropos" },
                { label: dict.nav.classes, href: "#cours" },
                { label: dict.nav.teachers, href: "#professeurs" },
                { label: dict.nav.schedule, href: "#planning" },
                { label: dict.nav.reviews, href: "#avis" },
                { label: dict.nav.contact, href: "#contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-ink transition-colors hover:text-pink"
                >
                  {item.label}
                </a>
              ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-pink px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-magenta lg:inline-flex"
            >
              {dict.nav.trial}
            </a>
            <a
              href={SITE.telHref}
              aria-label={SITE.phone}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy ring-1 ring-navy/20 transition-colors hover:bg-navy hover:text-white lg:hidden"
            >
              <PhoneIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy ring-1 ring-navy/20 lg:hidden"
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-white lg:hidden">
          <nav className="flex flex-col px-6 py-6" aria-label="Menu mobile">
            {[
              { label: dict.nav.about, href: "#apropos" },
              { label: dict.nav.classes, href: "#cours" },
              { label: dict.nav.teachers, href: "#professeurs" },
              { label: dict.nav.schedule, href: "#planning" },
              { label: dict.nav.reviews, href: "#avis" },
              { label: dict.nav.contact, href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-sky py-4 text-lg font-semibold text-ink transition-colors hover:text-pink"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-pink px-6 py-3.5 text-base font-bold text-white"
            >
              {dict.nav.trial}
            </a>
            <div className="mt-8 flex items-center justify-between">
              <a href={SITE.telHref} className="flex items-center gap-2 text-sm font-semibold text-navy">
                <PhoneIcon className="h-4 w-4" />
                {SITE.phone}
              </a>
              <Link
                href={`/${other}`}
                onClick={() => setOpen(false)}
                className="rounded-full border border-navy/20 px-4 py-2 text-sm font-semibold text-navy"
              >
                {dict.nav.language} · {dict.nav.languageLabel}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}