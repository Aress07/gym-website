import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-white px-4 py-24">
      <div className="max-w-md text-center">
        <p className="text-7xl font-black text-pink">404</p>
        <h1 className="mt-4 text-2xl font-extrabold text-navy">
          Page introuvable · Page not found
        </h1>
        <p className="mt-3 text-sm text-grey">
          La page que vous cherchez n&apos;existe pas ou a été déplacée. Regagner la
          page d&apos;accueil. The page you are looking for does not exist.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/fr"
            className="rounded-full bg-pink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-magenta"
          >
            Accueil · Home (FR)
          </Link>
          <Link
            href="/en"
            className="rounded-full border-2 border-navy px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Home (EN)
          </Link>
        </div>
      </div>
    </main>
  );
}