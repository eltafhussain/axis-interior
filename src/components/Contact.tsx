import type { ReactNode } from "react";
import { fullAddress, mapEmbedUrl, mapUrl, site } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-navy py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading id="contact-heading" eyebrow="Get in touch" title="Contact us" light />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-6">
            <ul className="space-y-5">
              <ContactItem icon={<PhoneIcon className="size-5" />} label="Phone">
                <a href={site.phone.href} className="hover:text-yellow">{site.phone.display}</a>
              </ContactItem>
              <ContactItem icon={<MailIcon className="size-5" />} label="Email">
                <a href={`mailto:${site.email}`} className="break-all hover:text-yellow">{site.email}</a>
              </ContactItem>
              <ContactItem icon={<PinIcon className="size-5" />} label="Address">
                <address className="not-italic">
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-yellow">
                    {fullAddress}
                  </a>
                </address>
              </ContactItem>
              <ContactItem icon={<ClockIcon className="size-5" />} label="Hours">
                {site.hours.label}
              </ContactItem>
            </ul>
            <iframe
              src={mapEmbedUrl}
              title={`Map showing ${site.name} at ${fullAddress}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full flex-1 rounded-lg border-0 bg-white/10 lg:min-h-64"
            />
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded bg-yellow text-navy">{icon}</span>
      <div>
        <p className="font-display text-xs font-extrabold uppercase tracking-widest text-yellow">{label}</p>
        <div className="mt-0.5 text-lg font-semibold">{children}</div>
      </div>
    </li>
  );
}
