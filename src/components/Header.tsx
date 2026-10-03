"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Our work" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-navy shadow-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <a href="#top" className="rounded bg-white px-2.5 py-1.5" aria-label={`${site.name} home`}>
          <Image src="/images/logo.png" alt={site.name} width={600} height={159} className="h-7 w-auto" priority />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm font-bold text-white/90 transition-colors hover:text-yellow"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.phone.href}
            className="flex items-center gap-2 rounded bg-yellow px-4 py-2 font-display text-sm font-extrabold text-navy transition-colors hover:bg-yellow-light"
          >
            <PhoneIcon className="size-4" />
            {site.phone.display}
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={site.phone.href}
            className="flex size-10 items-center justify-center rounded bg-yellow text-navy"
            aria-label={`Call ${site.phone.display}`}
          >
            <PhoneIcon className="size-5" />
          </a>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded text-white hover:bg-white/10"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-white/10 bg-navy-dark px-4 pb-4 md:hidden"
      >
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display font-bold text-white hover:text-yellow"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
