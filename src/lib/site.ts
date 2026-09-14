export const SITE = {
  name: "ADRENAL'IN",
  legalName: "ADRENAL'IN",
  domain: "https://adrenal-in.com",
  description:
    "ADRENAL'IN fondé par Cathy MOHR propose des cours de danse, fitness et pilates à Compiègne, débutants et avancés, en solo et en couple.",
  address: {
    street: "1425 Avenue Octave Butin",
    city: "60280 Margny-lès-Compiègne",
    country: "FR",
  },
  phone: "+33686443643",
  phoneDisplay: "06.86.44.36.43",
  telHref: "tel:+33686443643",
  email: "contact@adrenal-in.com",
  facebook: "https://www.facebook.com/Adrenal.in.danse.fitness/",
  instagram: "https://www.instagram.com/adrenal_in_danse/",
  mapsEmbed:
    "https://www.google.com/maps?q=ADRENAL'IN%201425%20Avenue%20Octave%20Butin%2060280%20Margny-l%C3%A8s-Compi%C3%A8gne&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=ADRENAL'IN+1425+Avenue+Octave+Butin+60280+Margny-lès-Compiègne",
  googleReviews:
    "https://www.google.com/maps/search/?api=1&query=ADRENAL'IN+Margny-lès-Compiègne",
  planningPdf: "/planning-2026-2027.pdf",
  trialPrice: "10€",
  openDays: "Lundi au jeudi : 9h – 21h · Vendredi : 9h – 19h · Samedi : 9h – 17h",
} as const;

export const NAV_LINKS = [
  { id: "apropos", labelKey: "nav.about" },
  { id: "cours", labelKey: "nav.classes" },
  { id: "professeurs", labelKey: "nav.teachers" },
  { id: "planning", labelKey: "nav.schedule" },
  { id: "avis", labelKey: "nav.reviews" },
  { id: "contact", labelKey: "nav.contact" },
] as const;