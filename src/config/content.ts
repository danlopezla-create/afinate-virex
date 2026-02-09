/**
 * Content Strings Configuration
 *
 * @description
 * Configurable text content for various site sections.
 * Modify these to customize messaging without touching component code.
 */

import type { AnnouncementConfig, ContentStrings } from '../lib/types';

/** Announcement bar configuration */
export const announcement: AnnouncementConfig = {
  /** Show/hide the announcement bar */
  enabled: false,

  /** Unique ID - change this to reset dismissal for new announcements */
  id: 'launch-2025',

  /** Announcement text */
  text: '🚀 afinate 2.0 ya está aquí',

  /** Optional link URL */
  href: '/changelog',

  /** Optional link text */
  linkText: 'Ver novedades',

  /** Visual style: 'primary' | 'secondary' | 'gradient' */
  variant: 'primary',

  /** Allow users to dismiss the announcement */
  dismissible: true,
};

/** Configurable content strings for various sections */
export const content: ContentStrings = {
  newsletter: {
    title: 'Mantente informado',
    description: 'Recibe las últimas novedades, consejos y noticias en tu correo.',
    placeholder: 'Introduce tu correo',
    buttonText: 'Suscribirse',
    successMessage: '¡Gracias por suscribirte! Revisa tu bandeja para confirmar.',
    errorMessage: 'Algo salió mal. Por favor, inténtalo de nuevo.',
    privacyNote: 'Respetamos tu privacidad. Cancela la suscripción cuando quieras.',
  },
};
