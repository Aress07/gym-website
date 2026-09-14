"use client";

import { useEffect, useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "adrenalin-cookie-choice";

export function CookieBar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return;
    const id = window.setTimeout(() => setVisible(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  const choose = (value: string) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-sky bg-white/95 p-4 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-ink">{dict.cookie.text}</p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("accept")}
            className="rounded-full bg-pink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-magenta"
          >
            {dict.cookie.accept}
          </button>
          <button
            type="button"
            onClick={() => choose("decline")}
            className="rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-sky"
          >
            {dict.cookie.decline}
          </button>
        </div>
      </div>
    </div>
  );
}