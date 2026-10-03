# Axis Interiors website

Marketing site for [Axis Interiors](https://www.axisinteriors.co.nz), built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4, and deployed on Vercel.

## Local development

Requires Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY to test the contact form
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (run after a build or `next dev`, which generate route types) |

## Where things live

- `src/lib/site.ts` — business details, services and portfolio photos. Edit here to change the address, phone, hours, service copy or project photos; the page, metadata and structured data all read from it.
- `src/components/` — page sections.
- `src/app/actions.ts` — contact form Server Action (sends email via Resend).
- `src/lib/contact-schema.ts` — contact form validation (tested in `contact-schema.test.ts`).
- `src/app/layout.tsx` — SEO metadata, fonts, Google Tag Manager.
- `src/app/sitemap.ts`, `robots.ts`, `opengraph-image.jpg`, `icon.png` — SEO files served at the site root.
- `public/images/` — logo, hero and portfolio photos (served optimised through `next/image`).

## Deploying to Vercel

1. Push this repository to GitHub, then in Vercel choose **Add New → Project** and import it. The Next.js preset needs no changes.
2. Under **Settings → Environment Variables**, add (for Production and Preview):
   - `RESEND_API_KEY` — from [resend.com/api-keys](https://resend.com/api-keys)
   - `CONTACT_TO_EMAIL` — e.g. `info@axisinteriors.co.nz`
   - `CONTACT_FROM_EMAIL` — e.g. `Axis Interiors Website <website@axisinteriors.co.nz>`
3. Under **Settings → Domains**, add `www.axisinteriors.co.nz` as the primary domain and `axisinteriors.co.nz` redirecting to it. Update DNS at your registrar as Vercel instructs, then remove the site from Netlify.

## One-time setup outside the code

- **Resend:** add and verify the `axisinteriors.co.nz` domain (SPF/DKIM DNS records) so the form can send from it. Until the env vars are set, the form shows visitors the phone number and email instead.
- **Google Analytics:** the site loads GTM container `GTM-P6SXB2F`. Universal Analytics no longer works, so add a GA4 Configuration tag in GTM and publish the container.
- **Google Search Console:** verify the `www` domain and submit `https://www.axisinteriors.co.nz/sitemap.xml`.
- **Google Business Profile:** keep the address and phone identical to `src/lib/site.ts`.
