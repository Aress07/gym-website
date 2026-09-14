import type { Dictionary } from "@/lib/i18n";

export function TrustStrip({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative z-10 -mt-9 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl border border-sky bg-white rounded-2xl overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {dict.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 border-sky px-4 py-6 text-center sm:py-8 [&:not(:last-child)]:border-r [&:nth-child(3)]:border-r-0 [&:nth-child(odd)]:border-b lg:[&:nth-child(odd)]:border-b-0 [&:nth-child(2)]:border-b lg:[&:nth-child(2)]:border-b-0"
            >
              <span className="text-2xl font-black text-pink sm:text-3xl">{stat.value}</span>
              <span className="text-xs font-semibold text-grey sm:text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}