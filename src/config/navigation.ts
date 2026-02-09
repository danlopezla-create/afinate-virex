/**
 * Navigation Configuration
 *
 * @description
 * Centralized navigation configuration for header and footer.
 * All navigation items are defined here for consistency and easy maintenance.
 *
 * Items with a `feature` property will only be shown if that feature is enabled
 * in the site config's feature flags.
 */

import type { Navigation } from '../lib/types';

export const navigation: Navigation = {
  /**
   * Header Navigation
   * - main: Primary navigation links
   * - cta: Call-to-action buttons on the right
   */
  header: {
    main: [
      { label: 'Producto', href: '/features' },
      { label: 'Precio', href: '/pricing' },
      { label: 'Clientes', href: '/customers' },
      { label: 'Seguridad', href: '/security' },
      { label: 'Recursos', href: '/docs', feature: 'docs' },
      { label: 'Blog', href: '/blog', feature: 'blog' },
    ],
    cta: [
      { label: 'Demo', href: '/dashboard', variant: 'ghost' },
      { label: 'Iniciar sesión', href: '/login', variant: 'ghost' },
      { label: 'Registrarse', href: '/register', variant: 'primary' },
    ],
  },

  /**
   * Footer Navigation
   * Organized into 5 columns: Product, Solutions, Resources, Company, Legal
   */
  footer: {
    product: [
      { label: 'Producto', href: '/features' },
      { label: 'Integraciones', href: '/integrations' },
      { label: 'Seguridad', href: '/security' },
      { label: 'Precio', href: '/pricing' },
      { label: 'Preguntas frecuentes', href: '/faq' },
    ],
    solutions: [
      { label: 'Clientes', href: '/customers' },
      { label: 'Solicitar demo', href: '/demo' },
      { label: 'Estado', href: '/status' },
    ],
    resources: [
      { label: 'Recursos', href: '/docs', feature: 'docs' },
      { label: 'Blog', href: '/blog', feature: 'blog' },
      { label: 'Changelog', href: '/changelog', feature: 'changelog' },
      { label: 'Hoja de ruta', href: '/roadmap', feature: 'roadmap' },
    ],
    company: [
      { label: 'Nosotros', href: '/about' },
      { label: 'Carreras', href: '/careers' },
      { label: 'Contacto', href: '/contact' },
      { label: 'Testimonios', href: '/testimonials', feature: 'testimonials' },
    ],
    legal: [
      { label: 'Privacidad', href: '/privacy' },
      { label: 'Términos', href: '/terms' },
    ],
  },
};
