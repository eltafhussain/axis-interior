import { fullAddress, site } from "@/lib/site";
import { FacebookIcon, LinkedInIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="border-t-4 border-yellow bg-navy-dark text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center text-sm md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-display font-extrabold text-white">{site.name}</p>
          <p>
            {fullAddress} · <a href={site.phone.href} className="hover:text-yellow">{site.phone.display}</a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on Facebook`}
            className="flex size-9 items-center justify-center rounded bg-white/10 hover:bg-yellow hover:text-navy"
          >
            <FacebookIcon className="size-4" />
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on LinkedIn`}
            className="flex size-9 items-center justify-center rounded bg-white/10 hover:bg-yellow hover:text-navy"
          >
            <LinkedInIcon className="size-4" />
          </a>
        </div>
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
