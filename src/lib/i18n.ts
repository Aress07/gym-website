import { fr, type FrDictionary } from "./dictionaries/fr";
import { en } from "./dictionaries/en";

export type Locale = "fr" | "en";
export type Dictionary = FrDictionary;

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export const locales: Locale[] = ["fr", "en"];
export const defaultLocale: Locale = "fr";

export const isLocale = (value: string): value is Locale =>
  value === "fr" || value === "en";

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}