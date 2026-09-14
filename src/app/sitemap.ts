import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { SITE } from "@/lib/site";

const staticPaths = [
  "",
  "/mentions-legales",
  "/politique-de-confidentialite",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = staticPaths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${SITE.domain}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.4,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l,
            `${SITE.domain}/${l}${path}`,
          ]),
        ),
      },
    })),
  );

  return [
    { url: SITE.domain, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...entries,
  ];
}