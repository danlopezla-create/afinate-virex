import type { SocialLinks, LegalConfig } from '../lib/types';

/** Site name displayed in header, footer, and meta tags */
export const name = 'afínate';

/** Site description for SEO and meta tags */
export const description = 'Procesos Autónomos para tu Empresa.';

/** Production URL of your site */
export const url = 'https://afinate.com';

/** Author name for meta tags and copyright */
export const author = 'afínate';

/** Path to logo file */
export const logo = '/logo-light-afinate.svg';
export const logoLight = '/logo-light-afinate.svg';
export const logoDark = '/logo-dark-afinate.svg';

/** Path to Open Graph image */
export const ogImage = 'hgtttps://afinate.com/images/og-image.png';

/** Social media links - Actualizado con tu WhatsApp */
export const social: SocialLinks = {
  whatsapp: 'https://wa.me/573113392679',
  instagram: 'https://instagram.com/afinate.ia',
  facebook: 'https://facebook.com/afinate',
  x: 'https://x.com/afinate',
};

/** WhatsApp customer service */
export const whatsappCustomerService = '573113392679';

/** Legal configuration */
export const legal: LegalConfig = {
  privacyEmail: 'danlopezla@gmail.com',
  legalEmail: 'danlopezla@gmail.com',
  lastUpdated: '9 de febrero de 2026',
};

/** * siteConfig Object 
 * Este bloque es CRÍTICO porque tu archivo astro.config.mjs lo importa desde aquí.
 */
export const siteConfig = {
  name,
  description,
  url,
  author,
  logo,
  ogImage,
  social,
  whatsappCustomerService,
  legal,
  features: {
    blog: true,
    docs: true,
    changelog: true,
    testimonials: true,
    roadmap: true,
  },
};