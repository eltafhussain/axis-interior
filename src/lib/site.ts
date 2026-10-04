/** Single source of truth for business details shown on the page, in metadata and in JSON-LD. */
export const site = {
  name: "Axis Interiors",
  url: "https://www.axisinteriors.co.nz",
  title: "Gib Stopping, Plastering, Tiling & Painting in QueensTown | Axis Interiors",
  description:
    "Axis Interiors is an QueensTown interior contractor specialising in gib stopping and coving, plasterboard supply & fix, tiling and painting for homes and commercial fit-outs. Free quotes.",
  email: "info@axisinteriors.co.nz",
  phone: { display: "021 253 6725", href: "tel:+64212536725", international: "+64 21 253 6725" },
  address: {
    street: "9 Brunswick Street",
    suburb: "QueensTown",
    city: "QueensTown",
    postcode: "9300",
    country: "NZ",
  },
  geo: { latitude: -36.8948317, longitude: 174.6613689 },
  hours: { label: "Mon–Fri 7am–6pm", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
  social: {
    facebook: "https://www.facebook.com/axisinteriors.co/",
    linkedin: "https://www.linkedin.com/company/axis-interiors",
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.suburb}, ${site.address.city} ${site.address.postcode}`;

export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${fullAddress}, New Zealand`)}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${fullAddress}, New Zealand`)}&output=embed`;

export type ServiceIcon = "plaster" | "board" | "tiles" | "roller";

export const services: { id: string; title: string; description: string; icon: ServiceIcon }[] = [
  {
    id: "gib-stopping",
    title: "Gib stopping & coving",
    description:
      "Smooth, paint-ready walls and ceilings for new builds, renovations and commercial fit-outs. We stop, sand and finish plasterboard joins and install cornice and coving.",
    icon: "plaster",
  },
  {
    id: "supply-fix",
    title: "Plasterboard supply & fix",
    description:
      "We measure on site, supply the right amount of plasterboard for your framing and fix it to walls and ceilings, so there's less waste and fewer delays.",
    icon: "board",
  },
  {
    id: "tiling",
    title: "Tiling",
    description:
      "Bathrooms, kitchens, splashbacks and floors. Tiles are set out carefully and laid level, with clean grout lines and a finish that lasts.",
    icon: "tiles",
  },
  {
    id: "painting",
    title: "Painting",
    description:
      "Interior painting for homes and commercial spaces. We prepare surfaces properly, protect your property and finish on schedule.",
    icon: "roller",
  },
];

export const portfolio = [
  { src: "/images/work-1.jpg", alt: "Supermarket exterior at night during a commercial fit-out" },
  { src: "/images/work-2.jpg", alt: "Mezzanine ceiling being lined with plasterboard inside a retail fit-out" },
  { src: "/images/work-3.jpg", alt: "Stopped plasterboard ceiling bulkhead above a supermarket entrance" },
  { src: "/images/work-4.jpg", alt: "Suspended plasterboard ceiling with recessed lighting in a supermarket" },
  { src: "/images/work-5.jpg", alt: "Long supermarket aisle ceiling with stopped plasterboard joins" },
  { src: "/images/work-6.jpg", alt: "Plasterboard ceiling and bulkhead finished over supermarket shelving" },
].map((item) => ({ ...item, width: 1280, height: 960 }));
