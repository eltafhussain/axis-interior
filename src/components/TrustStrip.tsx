import { site } from "@/lib/site";
import { CheckIcon, ClockIcon } from "./Icons";

export function TrustStrip() {
  return (
    <div className="bg-yellow text-navy">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-2 px-4 py-4 font-display text-sm font-extrabold uppercase tracking-wide">
        <li className="flex items-center gap-2">
          <CheckIcon className="size-5" />
          Free quotes
        </li>
        <li className="flex items-center gap-2">
          <ClockIcon className="size-5" />
          {site.hours.label}
        </li>
      </ul>
    </div>
  );
}
