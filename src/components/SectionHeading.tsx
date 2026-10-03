export function SectionHeading({ id, eyebrow, title, light = false }: { id: string; eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="text-center">
      <p className={`font-display text-xs font-extrabold uppercase tracking-[0.18em] ${light ? "text-yellow" : "text-charcoal/70"}`}>
        {eyebrow}
      </p>
      <h2 id={id} className={`mt-2 font-display text-3xl font-black uppercase sm:text-4xl ${light ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 bg-yellow" aria-hidden="true" />
    </div>
  );
}
