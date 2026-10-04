"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { portfolio } from "@/lib/site";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./Icons";
import { SectionHeading } from "./SectionHeading";

export function Portfolio() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const current = portfolio[index];

  function open(i: number) {
    setIndex(i);
    dialogRef.current?.showModal();
  }

  function step(delta: number) {
    setIndex((i) => (i + delta + portfolio.length) % portfolio.length);
  }

  return (
    <section id="work" aria-labelledby="work-heading" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading id="work-heading" eyebrow="Recent projects" title="Our work" />
        <p className="mx-auto mt-6 max-w-2xl text-center">
          Plasterboard, stopping and ceiling work from recent commercial fit-outs across QueensTown.
        </p>
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
          {portfolio.map((item, i) => (
            <li key={item.src}>
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded bg-slate-200 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-yellow"
                aria-label={`View larger: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1152px) 368px, (min-width: 768px) 33vw, 50vw"
                  className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-navy/0 transition-colors group-hover:bg-navy/30" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Project photo viewer"
        className="m-auto max-h-none max-w-none bg-transparent p-0"
        onClick={(event) => event.target === event.currentTarget && dialogRef.current?.close()}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") step(-1);
          if (event.key === "ArrowRight") step(1);
        }}
      >
        <figure className="relative w-[min(92vw,1100px)]">
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="(min-width: 1200px) 1100px, 92vw"
            className="max-h-[80vh] w-full rounded object-contain"
          />
          <figcaption className="mt-3 text-center text-white">
            {current.alt} <span className="text-white/60">({index + 1} of {portfolio.length})</span>
          </figcaption>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
            autoFocus
          >
            <CloseIcon className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => step(-1)}
            className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy/80 text-white hover:bg-navy"
            aria-label="Previous photo"
          >
            <ChevronLeftIcon className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy/80 text-white hover:bg-navy"
            aria-label="Next photo"
          >
            <ChevronRightIcon className="size-6" />
          </button>
        </figure>
      </dialog>
    </section>
  );
}
