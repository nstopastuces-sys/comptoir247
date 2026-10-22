// Générateur statique du site COMPTOIR 247 — sans dépendance.
// Usage : node _src/build.mjs
// Chaque page source (_src/pages/*.html) commence par un bloc <!--META {...} META-->.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

/* ------------------------------------------------------------------ */
/* Configuration — à adapter (domaine définitif, e-mail de contact)    */
/* ------------------------------------------------------------------ */
const CONFIG = {
  siteUrl: "https://nstopastuces-sys.github.io/comptoir247", // sans "/" final — remplacer par le nom de domaine définitif
  name: "COMPTOIR 247",
  slogan: "Pour vous servir.",
  email: "contact@comptoir247.fr", // À CONFIRMER
  instagram: "https://www.instagram.com/comptoir247/",
  instagramHandle: "@comptoir247",
  area: "Savoie et alentours",
  locale: "fr_FR",
  lastmod: new Date().toISOString().slice(0, 10),
};

/* ------------------------------------------------------------------ */
/* Icônes (trait, dans l'esprit des visuels Instagram) + logo          */
/* ------------------------------------------------------------------ */
const ICONS = {
  cheese: `<path d="M2.8 10.6 14.2 4.8l7 4.4v9.6H2.8z"/><path d="M2.8 10.6h18.4"/><circle cx="15.6" cy="14.3" r="1.9"/><circle cx="8" cy="14.9" r="1.3"/><circle cx="11.2" cy="17" r=".5" fill="currentColor"/><circle cx="6.2" cy="12.6" r=".5" fill="currentColor"/>`,
  gear: `<circle cx="12" cy="12" r="3.2"/><path d="M10.3 2.8h3.4l.5 2.4a7.4 7.4 0 0 1 1.9 1.1l2.3-.8 1.7 2.9-1.8 1.6a7.4 7.4 0 0 1 0 2.2l1.8 1.6-1.7 2.9-2.3-.8a7.4 7.4 0 0 1-1.9 1.1l-.5 2.4h-3.4l-.5-2.4a7.4 7.4 0 0 1-1.9-1.1l-2.3.8-1.7-2.9 1.8-1.6a7.4 7.4 0 0 1 0-2.2L3.9 8.4l1.7-2.9 2.3.8a7.4 7.4 0 0 1 1.9-1.1z"/>`,
  coldbox: `<path d="M3.5 7.2 12 3l8.5 4.2v9.6L12 21l-8.5-4.2z"/><path d="M3.5 7.2 12 11.4l8.5-4.2M12 11.4V21"/><path d="M7.7 11.6v6M5.2 13.2l5 2.8M10.2 13.2l-5 2.8"/><path d="M16.4 13.6v2.2M16.4 17.4v.1"/>`,
  clock: `<circle cx="12" cy="12" r="9"/><path d="M12 6.8V12h4.2"/>`,
  meat: `<path d="M5.3 7.1c2.9-3.3 9.9-3.4 13.2.2 2.6 2.8 1.6 7.6-1.7 9.9-3.5 2.4-9.1 2.9-11.8.1-2.3-2.4-2.2-7.6.3-10.2z"/><path d="M4.3 13.6c.6 2.3 2.4 3.9 5.3 4.2"/><circle cx="10.6" cy="10.3" r="2"/><path d="M14.5 8.2c1.3.4 2.3 1.4 2.6 2.7"/>`,
  chef: `<path d="M7 13.8c-2.4-.3-4-1.9-4-3.9 0-2.2 1.9-3.9 4.2-3.5.7-2 2.6-3.4 4.8-3.4s4.1 1.4 4.8 3.4c2.3-.4 4.2 1.3 4.2 3.5 0 2-1.6 3.6-4 3.9"/><path d="M7 13.8V20h10v-6.2"/><path d="M7 17h10"/>`,
  leaf: `<path d="M5 19.5C4.6 10.7 9.7 4.8 20 4c.2 9.6-5.3 15.4-15 15.5z"/><path d="M4 21l9.5-10"/>`,
  people: `<circle cx="12" cy="8.2" r="3.1"/><path d="M6.3 20c0-3.3 2.6-6 5.7-6s5.7 2.7 5.7 6z"/><circle cx="5" cy="9.6" r="2.1"/><circle cx="19" cy="9.6" r="2.1"/><path d="M2 17.6c0-2.2 1.3-3.8 3.2-3.8M22 17.6c0-2.2-1.3-3.8-3.2-3.8"/>`,
  shop: `<path d="M3 9.2 4.8 4h14.4L21 9.2"/><path d="M3 9.2c0 1.5 1.1 2.6 2.5 2.6S8 10.7 8 9.2c0 1.5 1.1 2.6 2.5 2.6S13 10.7 13 9.2c0 1.5 1.1 2.6 2.5 2.6S18 10.7 18 9.2c0 1.5 1.1 2.6 1.5 2.6S21 10.7 21 9.2z"/><path d="M4.5 11.8V20h15v-8.2"/><path d="M10 20v-4.6h4V20"/>`,
  hotel: `<path d="M4 20.5V7.5l8-4 8 4v13"/><path d="M2.5 20.5h19"/><path d="M10 20.5v-4h4v4"/><path d="M8 10h1.6M14.4 10H16M8 13.4h1.6M14.4 13.4H16"/>`,
  cutlery: `<path d="M6 3v6.5c0 1.2.9 2 2 2s2-.8 2-2V3M8 3v18"/><path d="M17.5 21V3c-2.3 1.4-3.5 4-3.5 7.2 0 2 1.1 3.3 3.5 3.3"/>`,
  handshake: `<path d="M2 9.5 6 6l3 1.2L12 6l3.4.4L22 10"/><path d="M2 9.5l5.5 6"/><path d="M22 10l-4.6 5"/><path d="M12 6l-3.2 3.5a1.4 1.4 0 0 0 2 2L13 9.4l4.4 5.6a1.4 1.4 0 0 1-2 1.9"/><path d="M15.4 16.9a1.4 1.4 0 0 1-2 1.9l-1-1.1"/><path d="M12.4 17.7a1.4 1.4 0 0 1-2 1.9l-.9-1"/><path d="M9.5 18.6a1.4 1.4 0 0 1-2-1.9l.4-.5"/>`,
  storefront: `<path d="M3.5 8 5 3.5h14L20.5 8"/><path d="M3.5 8h17v1.4a2 2 0 0 1-4 0 2 2 0 0 1-4.2 0 2 2 0 0 1-4.3 0 2 2 0 0 1-4.5 0z"/><path d="M5 11.4V20.5h14v-9.1"/><path d="M8 20.5v-6.5h4.4v6.5"/><circle cx="9.4" cy="16.6" r=".7"/><path d="M14.4 14h2.6v3h-2.6z"/>`,
  vending: `<rect x="4.5" y="2.5" width="15" height="19" rx="1.5"/><path d="M7 5.5h7v10.5H7zM7 9h7M7 12.5h7M10.5 5.5V16"/><path d="M16.5 6v2.6M16.5 10.6v.1M7 18.5h7"/>`,
  lockers: `<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/><path d="M7.4 5.6v1.4M13.4 5.6v1.4M19.4 5.6v1.4M7.4 11.6v1.4M13.4 11.6v1.4M19.4 11.6v1.4M7.4 17.6v1.4M13.4 17.6v1.4M19.4 17.6v1.4"/>`,
  pin: `<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>`,
  card: `<rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M2.5 9.5h19M6 15h4"/>`,
  arrow: `<path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5"/>`,
  check: `<path d="m4.5 12.5 4.5 4.5L19.5 6.5"/>`,
  instagram: `<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r=".9" fill="currentColor"/>`,
  mail: `<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 6.5 9 6.5 9-6.5"/>`,
  menu: `<path d="M3.5 7h17M3.5 12h17M3.5 17h17"/>`,
  close: `<path d="M5.5 5.5l13 13M18.5 5.5l-13 13"/>`,
  sun: `<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/>`,
  key: `<circle cx="8" cy="15" r="4.5"/><path d="m11.2 11.8 9-9M16.5 6.5l2.5 2.5M14 9l2 2"/>`,
  plan: `<path d="M3 5.5 9 3l6 2.5L21 3v15.5L15 21l-6-2.5L3 21z"/><path d="M9 3v15.5M15 5.5V21"/>`,
  egg: `<path d="M12 3c3.5 0 6.5 5.4 6.5 10a6.5 6.5 0 0 1-13 0C5.5 8.4 8.5 3 12 3z"/>`,
  basket: `<path d="M3 10h18l-1.8 9.2a1.6 1.6 0 0 1-1.6 1.3H6.4a1.6 1.6 0 0 1-1.6-1.3z"/><path d="M7.5 10 11 3.5M16.5 10 13 3.5M8.5 13.5v4M12 13.5v4M15.5 13.5v4"/>`,
  dish: `<path d="M3 15.5h18M4.5 15.5a7.5 7.5 0 0 1 15 0"/><path d="M12 8V6.5M10.5 6.5h3M2.5 18.5h19"/>`,
};

// Logo complet (horloge, flèche, écusson de Savoie)
const LOGO_RING = `
  <path d="M22.4 80.6A80 80 0 0 1 72.6 24.8" fill="none" stroke="#e30613" stroke-width="7" stroke-linecap="round"/>
  <path class="mk-tip" d="M88.6 20.1 74.2 16.2 78.9 30.7z" fill="#e30613"/>
  <path d="M113.9 21.2A80 80 0 0 1 177.6 80.6" fill="none" stroke="#e30613" stroke-width="7" stroke-linecap="round"/>
  <path d="M171.9 135.1A80 80 0 0 1 28.1 135.1" fill="none" stroke="#e30613" stroke-width="7" stroke-linecap="round"/>
  <g stroke="#0e0e0e" stroke-width="2.6" stroke-linecap="round">
    <line x1="100" y1="31" x2="100" y2="37" transform="rotate(30 100 100)"/>
    <line x1="100" y1="31" x2="100" y2="37" transform="rotate(60 100 100)"/>
    <line x1="100" y1="31" x2="100" y2="37" transform="rotate(120 100 100)"/>
    <line x1="100" y1="31" x2="100" y2="37" transform="rotate(150 100 100)"/>
    <line x1="100" y1="31" x2="100" y2="37" transform="rotate(210 100 100)"/>
    <line x1="100" y1="31" x2="100" y2="37" transform="rotate(240 100 100)"/>
    <line x1="100" y1="31" x2="100" y2="37" transform="rotate(300 100 100)"/>
    <line x1="100" y1="31" x2="100" y2="37" transform="rotate(330 100 100)"/>
  </g>`;
const LOGO_SHIELD = (cx, cy, s = 1) => `
  <g transform="translate(${cx} ${cy}) scale(${s})">
    <path d="M-8.5 -8h17v7.6c0 6.4-4.2 10-8.5 11.6-4.3-1.6-8.5-5.2-8.5-11.6z" fill="#e30613"/>
    <path d="M-1.6 -5.4h3.2v3.8h3.8v3.2h-3.8v4.6h-3.2v-4.6h-3.8v-3.2h3.8z" fill="#fff"/>
  </g>`;

const SPRITE = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
${Object.entries(ICONS).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`).join("\n")}
<symbol id="logo" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="99" fill="#fff"/>${LOGO_RING}
  <path d="M100 26v40" stroke="#0e0e0e" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M100 30v14" stroke="#0e0e0e" stroke-width="4.4" stroke-linecap="round"/>
  <text x="100" y="107" text-anchor="middle" textLength="182" lengthAdjust="spacingAndGlyphs" font-family="Montserrat, Arial Black, sans-serif" font-weight="800" font-size="25" fill="#0e0e0e">COMPTOIR 247</text>
  <text x="176" y="122" text-anchor="end" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="11.5" fill="#0e0e0e">Pour vous servir<tspan fill="#e30613">.</tspan></text>
  ${LOGO_SHIELD(100, 143, 1)}
  <path d="M100 160v9" stroke="#0e0e0e" stroke-width="4.6" stroke-linecap="round"/>
</symbol>
<symbol id="logo-mark" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="99" fill="#fff"/>
  <path d="M22.4 80.6A80 80 0 0 1 72.6 24.8" fill="none" stroke="#e30613" stroke-width="11" stroke-linecap="round"/>
  <path d="M92 19.2 72 13.5 78.6 33.6z" fill="#e30613"/>
  <path d="M113.9 21.2A80 80 0 1 1 22.4 80.6" fill="none" stroke="#e30613" stroke-width="11" stroke-linecap="round" stroke-dasharray="0" />
  <path d="M100 28v58" stroke="#0e0e0e" stroke-width="7" stroke-linecap="round"/>
  <path d="M100 100l30 18" stroke="#0e0e0e" stroke-width="7" stroke-linecap="round"/>
  ${LOGO_SHIELD(100, 145, 1.55)}
</symbol>
<symbol id="mountains" viewBox="0 0 420 130">
  <path d="M2 126 40 112l30-14 22-16 12-6 14-16 14-14 12-16 8-12 8 10 10 6 14 16 16 12 14 12 12 8 12-12 14-16 14-14 8-6 8 10 14 12 20 16 24 16 30 16 48 20"/>
  <path d="M152 18l-2 12-6 12-4 16M152 18l6 18 10 14 8 16M104 76l6 8M274 34l-4 14-8 14M274 34l8 18 14 18 10 12M200 62l-6 10"/>
</symbol>
</svg>`;

const icon = (name, cls = "") => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
const mountains = (cls = "") => `<svg class="mountains ${cls}" viewBox="0 0 420 130" aria-hidden="true" focusable="false"><path d="M2 126 40 112l30-14 22-16 12-6 14-16 14-14 12-16 8-12 8 10 10 6 14 16 16 12 14 12 12 8 12-12 14-16 14-14 8-6 8 10 14 12 20 16 24 16 30 16 48 20"/><path d="M152 18l-2 12-6 12-4 16M152 18l6 18 10 14 8 16M104 76l6 8M274 34l-4 14-8 14M274 34l8 18 14 18 10 12M200 62l-6 10"/></svg>`;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
const NAV = [
  { key: "exploiter", label: "Nos distributeurs", url: "distributeurs-produits-frais/" },
  { key: "equiper", label: "Équiper les pros", url: "equiper-professionnels/" },
  { key: "about", label: "Qui sommes-nous ?", url: "qui-sommes-nous/" },
];

const btn = (href, label, variant = "") =>
  `<a class="btn ${variant}" href="${href}"><span class="btn__in">${label}${icon("arrow")}</span><span class="btn__door" aria-hidden="true">${label}</span></a>`;

/* ------------------------------------------------------------------ */
/* Données structurées                                                 */
/* ------------------------------------------------------------------ */
const ORG_ID = `${CONFIG.siteUrl}/#organisation`;
const orgSchema = () => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: "COMPTOIR 247",
  alternateName: ["Comptoir 247", "Comptoir247"],
  slogan: "Pour vous servir.",
  description:
    "COMPTOIR 247 exploite des distributeurs automatiques de produits frais et locaux en Savoie et alentours, accessibles 24h/24 et 7j/7, et équipe les professionnels (producteurs, fromagers, bouchers, traiteurs, restaurants, hôtels, commerces, collectivités) qui souhaitent créer leur propre point de vente automatique.",
  url: `${CONFIG.siteUrl}/`,
  logo: `${CONFIG.siteUrl}/assets/img/logo-comptoir247.png`,
  image: `${CONFIG.siteUrl}/assets/img/og-comptoir247.jpg`,
  sameAs: [CONFIG.instagram],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Savoie" },
    { "@type": "AdministrativeArea", name: "Haute-Savoie" },
    { "@type": "AdministrativeArea", name: "Auvergne-Rhône-Alpes" },
  ],
  knowsAbout: [
    "Distributeur automatique de produits frais",
    "Casiers réfrigérés",
    "Vente directe de produits locaux",
    "Circuit court",
    "Point de vente automatique 24h/24",
    "Installation de distributeurs automatiques pour professionnels",
  ],
  contactPoint: { "@type": "ContactPoint", contactType: "customer service", url: `${CONFIG.siteUrl}/contact/`, availableLanguage: "French", areaServed: "FR" },
});
const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": `${CONFIG.siteUrl}/#site`,
  url: `${CONFIG.siteUrl}/`,
  name: "COMPTOIR 247",
  inLanguage: "fr-FR",
  publisher: { "@id": ORG_ID },
});

/* ------------------------------------------------------------------ */
/* Gabarit                                                             */
/* ------------------------------------------------------------------ */
function renderFaq(faq) {
  if (!faq || !faq.length) return "";
  const nbsp = (s) => s.replace(/ ([?!:;»])/g, "&nbsp;$1").replace(/« /g, "«&nbsp;");
  faq = faq.map((q) => ({ q: nbsp(q.q), a: nbsp(q.a) }));
  return `<div class="faq">${faq
    .map(
      (q, i) =>
        `<details${i === 0 ? " open" : ""}><summary><h3 class="sr-heading" style="font:inherit;letter-spacing:inherit;margin:0">${q.q}</h3><i aria-hidden="true"></i></summary><div class="faq__a"><p>${q.a}</p></div></details>`
    )
    .join("")}</div>`;
}

function layout(meta, body) {
  const depth = meta.out.split("/").length - 1;
  // La 404 peut être servie à n'importe quelle profondeur : chemins absolus.
  const root = meta.absolute ? new URL(CONFIG.siteUrl).pathname.replace(/\/?$/, "/") : depth ? "../".repeat(depth) : "./";
  const canonical = `${CONFIG.siteUrl}${meta.url}`;
  const ogImage = `${CONFIG.siteUrl}/assets/img/${meta.ogImage || "og-comptoir247.jpg"}`;
  const strip = (s) => s.replace(/<[^>]+>/g, "");

  const graph = [orgSchema(), websiteSchema(), {
    "@type": "WebPage",
    "@id": `${canonical}#page`,
    url: canonical,
    name: meta.title,
    description: meta.description,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${CONFIG.siteUrl}/#site` },
    about: { "@id": ORG_ID },
    dateModified: CONFIG.lastmod,
    primaryImageOfPage: ogImage,
  }];
  if (meta.breadcrumb) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [{ name: "Accueil", url: "/" }, ...meta.breadcrumb].map((b, i) => ({
        "@type": "ListItem", position: i + 1, name: b.name, item: `${CONFIG.siteUrl}${b.url}`,
      })),
    });
  }
  if (meta.faq && meta.faq.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: meta.faq.map((q) => ({ "@type": "Question", name: strip(q.q), acceptedAnswer: { "@type": "Answer", text: strip(q.a) } })),
    });
  }
  (meta.schema || []).forEach((s) => graph.push(JSON.parse(JSON.stringify(s).replaceAll("{{site}}", CONFIG.siteUrl).replaceAll("{{org}}", ORG_ID))));

  const navHtml = NAV.map(
    (n) => `<li><a class="nav__link" href="${root}${n.url}"${meta.nav === n.key ? ' aria-current="page"' : ""}>${n.label}</a></li>`
  ).join("");

  const crumbs = meta.breadcrumb
    ? `<nav class="breadcrumb" aria-label="Fil d'Ariane"><ol><li><a href="${root}">Accueil</a></li>${meta.breadcrumb
        .map((b, i, a) => (i === a.length - 1 ? `<li aria-current="page">${b.name}</li>` : `<li><a href="${root}${b.url.replace(/^\//, "")}">${b.name}</a></li>`))
        .join("")}</ol></nav>`
    : "";

  const doors = Array.from({ length: 18 }, () => `<span class="curtain__door"></span>`).join("");

  let html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${meta.title}</title>
<meta name="description" content="${meta.description}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${meta.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}">
<meta name="theme-color" content="#ffffff">
<meta name="author" content="COMPTOIR 247">
<meta name="geo.region" content="FR-73">
<meta name="geo.placename" content="Savoie">
<meta property="og:type" content="website">
<meta property="og:locale" content="${CONFIG.locale}">
<meta property="og:site_name" content="COMPTOIR 247">
<meta property="og:title" content="${meta.ogTitle || meta.title}">
<meta property="og:description" content="${meta.description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${meta.ogTitle || meta.title}">
<meta name="twitter:description" content="${meta.description}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${root}assets/img/apple-touch-icon.png">
<link rel="manifest" href="${root}site.webmanifest">
<link rel="preload" href="${root}assets/fonts/montserrat-latin-wght.woff2" as="font" type="font/woff2" crossorigin>
${(meta.preload || []).map((p) => `<link rel="preload" as="image" href="${root}${p}">`).join("\n")}
<link rel="stylesheet" href="${root}assets/css/style.css">
<script>try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('is-arriving')}catch(e){}</script>
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
</head>
<body>
<a class="skip-link" href="#contenu">Aller au contenu</a>
${SPRITE}
<div class="curtain" aria-hidden="true"><div class="curtain__grid">${doors}</div><div class="curtain__brand"><svg viewBox="0 0 200 200"><use href="#logo"/></svg></div></div>
<header class="site-header">
  <div class="wrap site-header__inner">
    <a class="brand" href="${root}" aria-label="COMPTOIR 247 — accueil">
      <svg class="brand__mark" viewBox="0 0 200 200" aria-hidden="true"><use href="#logo-mark"/></svg>
      <span class="brand__text"><span class="brand__name">COMPTOIR 247</span><span class="brand__tag">Pour vous servir<span class="dot">.</span></span></span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav" aria-label="Menu"><svg aria-hidden="true"><use href="#i-menu"/></svg></button>
    <nav class="nav" id="nav" aria-label="Navigation principale">
      <ul class="nav__list">${navHtml}</ul>
      ${btn(`${root}contact/`, "Contact", "btn--small")}
    </nav>
  </div>
</header>
<main id="contenu">
${crumbs ? `<div class="wrap" style="padding-top:22px">${crumbs}</div>` : ""}
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="footer__grid">
      <div>
        <svg class="footer__logo" viewBox="0 0 200 200" role="img" aria-label="Logo COMPTOIR 247 — Pour vous servir."><use href="#logo"/></svg>
        ${mountains("footer__mountains draw")}
        <p class="footer__slogan">Terre de goûts.<br>Terre d'opportunités.</p>
      </div>
      <div>
        <h2>Nos métiers</h2>
        <ul>
          <li><a href="${root}distributeurs-produits-frais/">Distributeurs de produits frais</a></li>
          <li><a href="${root}distributeurs-produits-frais/#accueillir">Accueillir un Comptoir</a></li>
          <li><a href="${root}equiper-professionnels/">Équiper les professionnels</a></li>
          <li><a href="${root}equiper-professionnels/#secteurs">Secteurs accompagnés</a></li>
        </ul>
      </div>
      <div>
        <h2>Comptoir 247</h2>
        <ul>
          <li><a href="${root}qui-sommes-nous/">Qui sommes-nous ?</a></li>
          <li><a href="${root}contact/">Contact</a></li>
          <li><a href="${root}mentions-legales/">Mentions légales &amp; crédits</a></li>
        </ul>
      </div>
      <div>
        <h2>Nous suivre</h2>
        <ul>
          <li><a class="social" href="${CONFIG.instagram}" rel="noopener" target="_blank">${icon("instagram")} ${CONFIG.instagramHandle}</a></li>
          <li style="display:flex;gap:10px;align-items:center">${icon("pin").replace('class=""', 'style="width:22px;height:22px;color:var(--red)"')} ${CONFIG.area}</li>
          <li style="display:flex;gap:10px;align-items:center">${icon("clock").replace('class=""', 'style="width:22px;height:22px;color:var(--red)"')} 24h/24 – 7j/7</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© <span data-year>${new Date().getFullYear()}</span> COMPTOIR 247 — Distributeurs automatiques de produits frais et locaux en Savoie.</span>
      <span>Le bon produit, au bon endroit, au bon moment<span class="dot">.</span></span>
    </div>
  </div>
</footer>
<script src="${root}assets/js/main.js" defer></script>
</body>
</html>
`;

  html = html
    .replaceAll("{{faq}}", renderFaq(meta.faq))
    .replaceAll("{{root}}", root)
    .replace(/\{\{btn:([^|}]+)\|([^|}]+)(?:\|([^}]*))?\}\}/g, (_, h, l, v) => btn(h, l, v || ""))
    .replace(/\{\{icon:([a-z]+)(?:\|([^}]*))?\}\}/g, (_, n, c) => icon(n, c || ""))
    .replace(/\{\{mountains(?:\|([^}]*))?\}\}/g, (_, c) => mountains(c || ""))
    .replaceAll("{{site}}", CONFIG.siteUrl)
    .replaceAll("{{email}}", CONFIG.email)
    .replaceAll("{{insta}}", CONFIG.instagram)
    .replaceAll("{{instaHandle}}", CONFIG.instagramHandle);
  return html;
}

/* ------------------------------------------------------------------ */
/* Build                                                               */
/* ------------------------------------------------------------------ */
const pagesDir = path.join(__dirname, "pages");
const sitemap = [];
for (const file of fs.readdirSync(pagesDir).filter((f) => f.endsWith(".html")).sort()) {
  const src = fs.readFileSync(path.join(pagesDir, file), "utf8");
  const m = src.match(/^<!--META\s*([\s\S]*?)\s*META-->/);
  if (!m) throw new Error(`META manquant dans ${file}`);
  const meta = JSON.parse(m[1]);
  const body = src.slice(m[0].length);
  const out = path.join(ROOT, meta.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, layout(meta, body));
  if (!meta.noindex) sitemap.push({ loc: `${CONFIG.siteUrl}${meta.url}`, priority: meta.priority ?? 0.7 });
  console.log("✓", meta.out);
}

fs.writeFileSync(
  path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${CONFIG.lastmod}</lastmod><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>
`
);
fs.writeFileSync(
  path.join(ROOT, "robots.txt"),
  `# COMPTOIR 247
User-agent: *
Allow: /

# Moteurs de réponse IA (GEO) : bienvenus
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: ${CONFIG.siteUrl}/sitemap.xml
`
);
console.log("✓ sitemap.xml, robots.txt");
