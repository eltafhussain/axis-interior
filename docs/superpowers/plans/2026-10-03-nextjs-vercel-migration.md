# Axis Interiors Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static Bootstrap/jQuery site with a Next.js 16 site for Vercel in the "Bold trade" design, with a Resend-backed contact form and corrected SEO.

**Architecture:** Single static App Router route `/` composed of section components that read business data from one module (`src/lib/site.ts`). Three small client components (header menu, portfolio lightbox, contact form). The contact form posts to a Server Action that validates with a pure, unit-tested zod parser and sends through Resend.

**Tech Stack:** Next.js 16.3, React 19.2, TypeScript 5, Tailwind CSS 4, zod 4, resend 6, @next/third-parties 16, Vitest 4.

**Spec:** `docs/superpowers/specs/2026-10-03-nextjs-vercel-migration-design.md`

## Global Constraints

- Canonical origin: `https://www.axisinteriors.co.nz`
- Address everywhere: 9 Brunswick Street, QueensTown, Auckland 9300, NZ
- Phone display `021 253 6725`, href `tel:+64212536725`; email `info@axisinteriors.co.nz`
- Colours: navy `#0E2F8A`, yellow `#FDB813`, charcoal `#474747`
- Trust strip claims: only "Free quotes" and "Mon–Fri 7am–6pm"
- Exactly one `h1` on the page; all `<img>` via `next/image` with meaningful alt
- GTM container `GTM-P6SXB2F`; no Universal Analytics, no Facebook SDK
- Env vars: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- Package manager: npm

---

## File Structure

```
package.json, tsconfig.json, next.config.ts, eslint.config.mjs, postcss.config.mjs, vitest.config.ts
.env.example, .gitignore, README.md
public/images/{logo.png, hero.jpg, work-1..6.jpg}
src/app/layout.tsx            fonts, metadata, GTM, html shell
src/app/page.tsx              composes sections + JSON-LD
src/app/globals.css           Tailwind import + theme tokens
src/app/actions.ts            "use server" sendContact
src/app/sitemap.ts, robots.ts
src/app/opengraph-image.jpg, icon.png, apple-icon.png
src/lib/site.ts               business data, services, portfolio items
src/lib/contact-schema.ts     parseContact (pure)
src/lib/contact-schema.test.ts
src/lib/json-ld.ts            buildLocalBusinessJsonLd()
src/components/{Header,Hero,TrustStrip,Services,Portfolio,Contact,ContactForm,Footer,Icons}.tsx
```

### Task 1: Scaffold Next.js in place and remove the old site

**Files:** delete `index.html css/ js/ lib/ contactform/ Readme.txt`; move `img/` assets to `public/images/` (lowercase, resized); create config files from create-next-app 16.3.8 output.

- [ ] Copy scaffold config (package.json, tsconfig, next.config.ts, eslint, postcss) into repo root; add deps `zod resend @next/third-parties` and dev deps `vitest`.
- [ ] Resize assets with `sips`: logo to 600px wide, hero 1920 wide JPEG q80, portfolio 1280 JPEG q80, OG image 1200×630 crop of hero, icon 512 and apple-icon 180 from existing PNGs.
- [ ] `git rm` old site files; `.gitignore` adds `node_modules .next out .env*.local next-env.d.ts .vercel`.
- [ ] `npm install`, `npm run build` passes with placeholder page.
- [ ] Commit `chore: scaffold Next.js 16 and remove static template`.

### Task 2: Contact validation (TDD)

**Files:** `src/lib/contact-schema.ts`, `src/lib/contact-schema.test.ts`, `vitest.config.ts`

**Interfaces — Produces:**
```ts
export type ContactInput = { name: string; email: string; phone?: string; message: string };
export type ContactFieldErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>;
export type ParseResult =
  | { ok: true; spam: false; data: ContactInput }
  | { ok: true; spam: true }
  | { ok: false; fieldErrors: ContactFieldErrors };
export function parseContact(formData: FormData): ParseResult;
```

- [ ] Write tests: valid input → ok with trimmed data; empty phone → `phone` undefined; short name, bad email, short message each → matching fieldError; filled `company` honeypot → `{ ok: true, spam: true }`.
- [ ] Run `npx vitest run` → FAIL (module missing).
- [ ] Implement with zod (`name` 2–100, `email` valid ≤200, `phone` optional ≤30 matching `[0-9+()\s-]`, `message` 10–5000).
- [ ] Run → PASS. Commit `feat: contact form validation`.

### Task 3: Server Action

**Files:** `src/app/actions.ts`, `.env.example`

**Interfaces — Produces:**
```ts
export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors };
export async function sendContact(prev: ContactState, formData: FormData): Promise<ContactState>;
```
- [ ] Spam → success without sending. Invalid → error with fieldErrors. Missing env → console.error + generic error mentioning phone. Resend `{ error }` → same generic error. Sends `replyTo` visitor email, subject `Website enquiry from <name>`, text body.
- [ ] `npx tsc --noEmit` passes. Commit.

### Task 4: Site data, layout, SEO

**Files:** `src/lib/site.ts`, `src/lib/json-ld.ts`, `src/app/layout.tsx`, `globals.css`, `sitemap.ts`, `robots.ts`, `next.config.ts` (security headers)

- [ ] `site` object holds the Global Constraints values, `services[]` ({id, title, description, icon}), `portfolio[]` ({src, alt, width, height}).
- [ ] Metadata: title default `Gib Stopping, Plastering, Tiling & Painting in Auckland | Axis Interiors`, canonical `/`, OG/Twitter, `en_NZ`. `viewport.themeColor` navy. `lang="en-NZ"`. GTM via `<GoogleTagManager gtmId>`.
- [ ] JSON-LD per spec; rendered with `<script type="application/ld+json">` escaping `<`.
- [ ] Commit.

### Task 5: Sections

**Files:** all `src/components/*`, `src/app/page.tsx`

- [ ] Header (client): sticky navy, logo on white chip, links, yellow phone CTA; mobile toggle with `aria-expanded`/`aria-controls`, closes on link click and Escape.
- [ ] Hero: `next/image` `priority` `fill` `sizes="100vw"`, navy gradient, eyebrow "Auckland interior specialists", h1, subtext, CTA → `#contact`.
- [ ] TrustStrip, Services (h2 + 4 h3 cards), Portfolio (client, `<dialog>` lightbox, prev/next, arrow keys, Escape), Contact (NAP + titled lazy iframe `https://www.google.com/maps?q=…&output=embed` + ContactForm), ContactForm (client, `useActionState`, labels, errors, `aria-live`, reset on success), Footer.
- [ ] `motion-safe:` for transitions. Commit.

### Task 6: Verify and document

- [ ] `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build` all pass.
- [ ] `npm start`; curl `/`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image.jpg`; assert one `<h1`, canonical link, JSON-LD present, no `.JPG`.
- [ ] README: local dev, env vars, Vercel deploy steps, Resend + GTM + DNS follow-ups.
- [ ] Commit.
