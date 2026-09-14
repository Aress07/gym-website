"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { HERO_IMAGES } from "@/lib/classes";
import { getDictionary, type Locale } from "@/lib/i18n";

const AUTOPLAY_MS = 6000;

export function HeroSlider({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const slides = dict.hero.slides;
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [slides.length]);

  return (
    <section id="top" className="relative h-[calc(100svh-4rem)] min-h-[600px] w-full overflow-hidden bg-navy lg:h-[calc(100svh-6.5rem)]">
      <div className="absolute inset-0">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={src}
              alt={slides[i].tag}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-navy/40" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-16 sm:px-6 sm:pb-0 lg:px-8">
        <div key={index} className="max-w-3xl animate-fade-up text-white">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-ink">
            {dict.hero.eyebrow}
          </p>
          <span className="mb-3 block text-sm font-bold uppercase tracking-[0.28em] text-orange">
            {slides[index].tag}
          </span>
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight drop-shadow sm:text-6xl lg:text-7xl">
            {dict.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium text-white/90 sm:text-lg">
            {dict.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(255,30,162,0.45)] transition-all hover:bg-magenta sm:justify-start"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <a
              href="#cours"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white hover:text-navy sm:justify-start"
            >
              {dict.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Précédent"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-pink"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.tag}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${dict.hero.title} ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-pink" : "w-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Suivant"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-pink"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}