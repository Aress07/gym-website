"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary, type Locale } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error" | "config";

export function BookingForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (key: string) => String(data.get(key) ?? "").trim();
    const payload = {
      site: "adrenalin-website",
      name: text("name"),
      email: text("email"),
      phone: text("phone"),
      course: text("course"),
      level: text("level"),
      slot: text("slot"),
      message: text("message"),
      lang: locale,
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.phone ||
      !payload.course ||
      !payload.level ||
      !payload.slot
    ) {
      setStatus("error");
      return;
    }

    const url = process.env.NEXT_PUBLIC_SHEETS_API_URL;
    if (!url) {
      setStatus("config");
      return;
    }

    try {
      const endpoint = new URL(url);
      const token = process.env.NEXT_PUBLIC_SHEETS_API_TOKEN;
      if (token) endpoint.searchParams.set("token", token);
      const response = await fetch(endpoint.toString(), {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-sky bg-white px-4 py-3 text-sm text-ink placeholder:text-grey outline-none transition-colors focus:border-pink";

  return (
    <section id="reservation" className="scroll-mt-28 bg-navy py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.booking.eyebrow}
          title={dict.booking.title}
          lead={dict.booking.lead}
          dark
        />
        <form
          onSubmit={onSubmit}
          className="mt-12 rounded-card border border-white/10 bg-white p-6 sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-navy">{dict.booking.name}</span>
              <input name="name" type="text" required placeholder={dict.booking.namePlaceholder} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-navy">{dict.booking.phone}</span>
              <input name="phone" type="tel" required placeholder={dict.booking.phonePlaceholder} className={inputClass} />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-bold text-navy">{dict.booking.email}</span>
              <input name="email" type="email" required placeholder={dict.booking.emailPlaceholder} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-navy">{dict.booking.course}</span>
              <select name="course" required defaultValue="" className={`${inputClass} appearance-none`}>
                <option value="" disabled>
                  {dict.booking.coursePlaceholder}
                </option>
                {dict.classes.formOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-navy">{dict.booking.level}</span>
              <select name="level" required defaultValue="" className={`${inputClass} appearance-none`}>
                <option value="" disabled>
                  {dict.booking.levelPlaceholder}
                </option>
                {dict.booking.levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-bold text-navy">{dict.booking.slot}</span>
              <input name="slot" type="text" required placeholder={dict.booking.slotPlaceholder} className={inputClass} />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-bold text-navy">{dict.booking.message}</span>
              <textarea name="message" rows={3} placeholder={dict.booking.messagePlaceholder} className={inputClass} />
            </label>
          </div>

          <label className="mt-5 flex items-start gap-3 text-xs text-grey">
            <input name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-pink" />
            {dict.booking.consent}
          </label>

          <div className="mt-6">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-full bg-pink px-8 py-4 text-sm font-bold text-white transition-all hover:bg-magenta disabled:cursor-wait disabled:opacity-60"
            >
              {status === "submitting" ? dict.booking.submitting : dict.booking.submit}
            </button>
          </div>

          {status === "success" && (
            <p className="mt-4 rounded-xl bg-mint p-4 text-sm font-semibold text-navy">{dict.booking.success}</p>
          )}
          {status === "config" && (
            <p className="mt-4 rounded-xl bg-cream p-4 text-sm font-semibold text-ink">{dict.booking.configError}</p>
          )}
          {status === "error" && (
            <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-ink">{dict.booking.error}</p>
          )}
        </form>
      </div>
    </section>
  );
}