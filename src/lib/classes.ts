export type ClassId =
  | "danses-de-salon"
  | "rocknroll-swing"
  | "sbk"
  | "street-jazz"
  | "contemporaine"
  | "enfants"
  | "kpop"
  | "fitness"
  | "pilates";

export const CLASS_IMAGES: Record<ClassId, string> = {
  "danses-de-salon": "/images/hero-danses-salon.webp",
  "rocknroll-swing": "/images/hero-rocknroll.webp",
  sbk: "/images/hero-sbk.webp",
  "street-jazz": "/images/hero-streetjazz.webp",
  contemporaine: "/images/dance-class.webp",
  enfants: "/images/studio-hall.webp",
  kpop: "/images/kpop.webp",
  fitness: "/images/fitness-class.webp",
  pilates: "/images/pilates-class.webp",
};

export const HERO_IMAGES = [
  "/images/hero-danses-salon.webp",
  "/images/hero-rocknroll.webp",
  "/images/hero-sbk.webp",
  "/images/hero-streetjazz.webp",
  "/images/hero-fitness.webp",
  "/images/hero-pilates.webp",
] as const;

export const GALLERY_IMAGES = [
  { src: "/images/kpop.webp", alt: "Cours K-Pop ADRENAL'IN" },
  { src: "/images/hero-streetjazz.webp", alt: "Street jazz ADRENAL'IN" },
  { src: "/images/hero-danses-salon.webp", alt: "Danses de salon ADRENAL'IN" },
  { src: "/images/hero-fitness.webp", alt: "Fitness ADRENAL'IN" },
  { src: "/images/hero-pilates.webp", alt: "Pilates ADRENAL'IN" },
  { src: "/images/hero-sbk.webp", alt: "Salsa Bachata Kizomba ADRENAL'IN" },
  { src: "/images/hero-rocknroll.webp", alt: "Rock'n'roll swing ADRENAL'IN" },
  { src: "/images/dance-class.webp", alt: "Danse contemporaine ADRENAL'IN" },
] as const;

export const CLASS_STYLES: Record<ClassId, { chip: string; accent: string }> = {
  "danses-de-salon": { chip: "bg-cherry text-white", accent: "text-cherry" },
  "rocknroll-swing": { chip: "bg-magenta text-white", accent: "text-magenta" },
  sbk: { chip: "bg-royal text-white", accent: "text-royal" },
  "street-jazz": { chip: "bg-pink text-white", accent: "text-pink" },
  contemporaine: { chip: "bg-navy text-white", accent: "text-navy" },
  enfants: { chip: "bg-orange text-ink", accent: "text-orange" },
  kpop: { chip: "bg-royal text-white", accent: "text-royal" },
  fitness: { chip: "bg-pink text-white", accent: "text-pink" },
  pilates: { chip: "bg-mint text-ink", accent: "text-navy" },
};