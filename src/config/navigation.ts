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
      { label: 'Iniciar sesión', href: '/login', variant: 'ghost' },
      { label: 'Registrarse', href: '/register', variant: 'primary' },
    ],
  },

  /**
   * Footer Navigation
   * 4 columnas: Solución, Infraestructura, Legal, Empresa. (Careers, Testimonials, Changelog, Roadmap ocultos.)
   */
  footer: {
    solucion: [
      { label: 'Demo', href: '/demo' },
      { label: 'Producto', href: '/features' },
      { label: 'Precio', href: '/pricing' },
      { label: 'Clientes', href: '/customers' },
    ],
    infraestructura: [
      { label: 'Estado', href: '/status' },
      { label: 'Seguridad', href: '/security' },
      { label: 'Buenas prácticas', href: '/security#stack-tecnico' },
      { label: 'Automatizaciones', href: '/docs#automatizaciones' },
    ],
    legal: [
      { label: 'Privacidad', href: '/privacy' },
      { label: 'Términos', href: '/terms' },
      { label: 'Habeas data', href: '/docs#informacion-legal' },
      { label: 'Disclaimer contable', href: '/docs#informacion-legal' },
    ],
    empresa: [
      { label: 'Nosotros', href: '/about' },
      { label: 'Contacto', href: '/contact' },
      { label: 'Preguntas frecuentes', href: '/faq' },
      { label: 'Blog', href: '/blog' },
    ],
  },
};
