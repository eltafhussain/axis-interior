# Axis Interiors: Next.js + Vercel migration — design

Date: 2026-10-03 · Status: approved

## Goal

Replace the static Bootstrap/jQuery one-page site with a Next.js site deployed on
Vercel, redesigned in the "Bold trade" direction (mockup A), and fix the SEO and
correctness issues found in the review.

## Decisions

| Topic | Decision |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript), Tailwind CSS v4, `next/font` (Montserrat headings, Open Sans body) |
| Hosting | Vercel, default Next.js preset; no `vercel.json` needed |
| Repo | Rebuild in place at the repo root; old template files removed (kept in git history) |
| Design | Mockup A "Bold trade": navy `#0E2F8A`, yellow `#FDB813`, charcoal `#474747` |
| Hero | Single static hero image (no slideshow), preloaded for LCP |
| Business address | 12 Maybelle Place, Kelston, Auckland 0602, NZ — used everywhere (visible, map, JSON-LD) |
| Trust strip | "Free quotes" and "Mon–Fri 7am–6pm" only. No licensing/insurance or suburb-level service-area claims |
| Contact form | Server Action → Resend email to `CONTACT_TO_EMAIL`; zod validation; honeypot; inline status |
| Analytics | GTM `GTM-P6SXB2F` via `@next/third-parties`; Universal Analytics and Facebook chat removed |

## Page structure (single route `/`)

1. `Header` — sticky navy bar: logo, anchor links (Services, Our work, Contact), yellow phone button. Mobile: toggle button with `aria-expanded`, slide-down menu. Client component.
2. `Hero` — `next/image` (priority) with navy gradient overlay; eyebrow, the page's only `h1`, subtext, "Get a free quote" link to `#contact`.
3. `TrustStrip` — yellow bar with the two approved claims.
4. `Services` (`#services`) — `h2` + four `h3` cards with SVG icons: Gib stopping/coving, Supply & fix, Tiling, Painting. Copy rewritten (no lorem ipsum).
5. `Portfolio` (`#work`) — grid of the six project photos via `next/image` with descriptive alt; click opens a native `<dialog>` lightbox with prev/next and Escape. Client component.
6. `Contact` (`#contact`) — address, phone (`tel:+64212422250`), email; keyless Google Maps embed of the Kelston address (lazy, titled); `ContactForm`.
7. `Footer` — name/address/phone (NAP), Facebook + LinkedIn links with accessible labels, copyright year.

Content (business details, services, portfolio items) lives in `src/lib/site.ts` so metadata, JSON-LD and components share one source of truth.

## Contact form

- `src/app/actions.ts` — `"use server"` `sendContact(prevState, formData)`.
- `src/lib/contact-schema.ts` — zod schema: name (2–100), email, phone (optional), message (10–5000), `company` honeypot must be empty. Pure function `parseContact(formData)` returns `{ ok, data } | { ok: false, fieldErrors }`; unit-tested.
- Honeypot filled → return success without sending (don't tip off bots).
- Sends via Resend with `replyTo` set to the visitor's email. Missing env vars or Resend error → log server-side, return a generic error with the phone number as fallback.
- `ContactForm` client component uses `useActionState`; labelled inputs, per-field errors, `aria-live` status, pending state on the button, form reset on success.
- Env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (documented in `.env.example`).

## SEO

- Metadata API in `layout.tsx`: `metadataBase` `https://www.axisinteriors.co.nz`, keyword-bearing title + description, canonical `/`, Open Graph (`en_NZ`, site name, 1200×630 image), Twitter `summary_large_image`, icons, `theme-color` via `viewport`.
- `opengraph-image.jpg` — 1200×630 crop of the hero photo.
- `src/app/sitemap.ts`, `src/app/robots.ts`.
- JSON-LD `HomeAndConstructionBusiness` rendered in the page: name, url, logo, image, description, telephone, email, PostalAddress (Kelston), `geo`, `openingHoursSpecification` Mo–Fr 07:00–18:00, `sameAs`, `hasMap`.
- `<html lang="en-NZ">`; semantic headings; all images with alt text.

## Performance / best practice

- Images moved to `public/images/` with lowercase names; served via `next/image` (AVIF/WebP, responsive sizes). Logo resized source.
- No runtime JS beyond Header, Portfolio lightbox and ContactForm client components.
- Security headers in `next.config.ts`: HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
- Respect `prefers-reduced-motion`.

## Testing

- Vitest unit tests for `parseContact` (valid input, each invalid field, honeypot).
- `next lint`/ESLint, `tsc --noEmit`, `next build` must pass.
- Manual check: run production server locally, fetch `/`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image.jpg`; confirm title, canonical, JSON-LD and h1 in HTML; screenshot-free visual check by the user.

## Owner follow-ups (outside the code)

- Resend account, verify `axisinteriors.co.nz` DNS, set the three env vars in Vercel.
- Add a GA4 tag in the GTM container.
- Point the domain at Vercel (www primary, apex redirects).
- Keep the Google Business Profile address identical to the site.

## Out of scope

Multi-page service/location pages, a CMS, blog, testimonials.
