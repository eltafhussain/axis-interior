import { services } from "@/lib/site";
import { ServiceIconSvg } from "./Icons";
import { SectionHeading } from "./SectionHeading";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading id="services-heading" eyebrow="What we do" title="Our services" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <li
              key={service.id}
              className="group flex gap-5 rounded-lg border-t-4 border-yellow bg-white p-7 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded bg-navy text-yellow">
                <ServiceIconSvg name={service.icon} className="size-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-extrabold uppercase text-navy">{service.title}</h3>
                <p className="mt-2 leading-relaxed">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
