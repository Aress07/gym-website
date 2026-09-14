import type { Metadata } from "next";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 · ADRENAL'IN",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <head>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: ${montserrat.style.fontFamily}; background: #fff6fe; color: #161619; min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem; }
          .wrap { max-width: 26rem; }
          .code { font-size: 5rem; font-weight: 900; color: #ff1ea2; line-height: 1; }
          h1 { font-size: 1.4rem; font-weight: 800; color: #090186; margin: 1rem 0 0.5rem; }
          p { color: #a3a0a2; font-size: 0.9rem; margin-bottom: 1.5rem; }
          .links { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
          a { display: inline-block; padding: 0.75rem 1.4rem; border-radius: 999px; font-weight: 700; font-size: 0.875rem; text-decoration: none; }
          .primary { background: #ff1ea2; color: #fff; }
          .secondary { border: 2px solid #090186; color: #090186; }
        `}</style>
      </head>
      <body>
        <div className="wrap">
          <p className="code">404</p>
          <h1>Page introuvable · Page not found</h1>
          <p>
            Cette page n&apos;existe pas ou a été déplacée. · The page you are
            looking for does not exist.
          </p>
          <div className="links">
            <Link className="primary" href="/fr">
              Accueil · Home
            </Link>
            <Link className="secondary" href="/en">
              Home (EN)
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}