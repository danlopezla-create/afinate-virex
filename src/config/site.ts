/**
 * Site Configuration
 *
 * @description
 * Core site metadata and branding settings.
 * These values can be customized via environment variables or by editing the defaults below.
 */

import type { SocialLinks, LegalConfig } from '../lib/types';

/** Site name displayed in header, footer, and meta tags */
export const name = import.meta.env.SITE_NAME || 'Afinate';

/** Site description for SEO and meta tags */
export const description =
  import.meta.env.SITE_DESCRIPTION || 'La plataforma que escala tu productividad';

/** Production URL of your site (used for sitemap, RSS, canonical URLs) */
export const url = import.meta.env.SITE_URL || 'http://localhost:4321';

/** Author name for meta tags and copyright */
export const author = import.meta.env.SITE_AUTHOR || 'Afinate';

/** Path to logo file (relative to /public); fallback and SEO/JSON-LD (Afinate light) */
export const logo = '/logo-light-afinate.svg';

/** Logo for light theme (black letters, visible on light background) */
export const logoLight = '/logo-light-afinate.svg';

/** Logo for dark theme (white letters, visible on dark background) */
export const logoDark = '/logo-dark-afinate.svg';

/** Path to Open Graph image (relative to /public) */
export const ogImage = '/images/og-image.png';

/** Social media links - Afinate accounts (add real URLs when ready) */
export const social: SocialLinks = {
  whatsapp: 'https://wa.me/',
  instagram: 'https://instagram.com/afinate',
  facebook: 'https://facebook.com/afinate',
  x: 'https://x.com/afinate',
};

/** WhatsApp customer service - Lucia (add real number: 57XXXXXXXXXX for Colombia) */
export const whatsappCustomerService = import.meta.env.WHATSAPP_CUSTOMER_SERVICE || '';

/** Legal configuration for privacy policy and terms pages */
export const legal: LegalConfig = {
  privacyEmail: 'afinateia@gmail.com',
  legalEmail: 'afinateia@gmail.com',
  lastUpdated: '7 de febrero de 2025',
};
