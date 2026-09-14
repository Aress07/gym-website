import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default:
      "ADRENAL'IN | Cours de danse, fitness & pilates à Compiègne",
    template: "%s | ADRENAL'IN",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  icons: {
    icon: "/images/logo.webp",
    apple: "/images/logo.webp",
  },
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.domain,
    siteName: SITE.name,
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/images/studio-hall.webp", width: 1280, height: 1024, alt: SITE.name }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}