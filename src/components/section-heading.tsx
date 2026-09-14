export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : "text-left"} max-w-3xl`}>
      <p
        className={`inline-block rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] ${
          dark ? "bg-orange text-ink" : "bg-sky text-navy"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.6rem] ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-4 text-base sm:text-lg ${dark ? "text-white/85" : "text-grey"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}