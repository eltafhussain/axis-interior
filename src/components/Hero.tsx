import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[600px] items-center overflow-hidden bg-navy-dark md:min-h-[680px]">
      <Image
        src="/images/hero.jpg"
        alt="Axis Interiors painter rolling fresh paint onto an interior wall"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-[rgb(8_22_66/0.74)]" aria-hidden="true" />
      {/* Top padding clears the fixed header that sits over the photo. */}
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-20 text-center text-white">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-yellow">
          Auckland interior specialists
        </p>
        <h1 className="mt-4 font-display text-4xl font-black uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
          Gib stopping, tiling <br className="hidden sm:inline" />
          &amp; painting in Auckland
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">
          Smooth walls, clean finishes and reliable trades for homes, renovations and commercial fit-outs.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#contact"
            className="rounded bg-yellow px-6 py-3.5 font-display font-extrabold uppercase tracking-wide text-navy shadow-lg transition-colors hover:bg-yellow-light"
          >
            Get a free quote <span aria-hidden="true">→</span>
          </a>
          <a
            href="#services"
            className="rounded border-2 border-white/70 px-6 py-3 font-display font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Our services
          </a>
        </div>
      </div>
    </section>
  );
}
