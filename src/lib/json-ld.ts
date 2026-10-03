import { mapUrl, services, site } from "./site";

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/logo.png`,
    image: `${site.url}/opengraph-image.jpg`,
    description: site.description,
    telephone: site.phone.international,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.suburb,
      addressRegion: site.address.city,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", ...site.geo },
    hasMap: mapUrl,
    areaServed: { "@type": "City", name: site.address.city },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hours.days,
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title, description: service.description },
    })),
    sameAs: Object.values(site.social),
  };
}

/** Serialises JSON-LD for inline <script>, escaping `<` so content can't close the tag. */
export function jsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
