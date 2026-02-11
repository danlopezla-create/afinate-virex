/**
 * Contact Page Configuration
 *
 * @description
 * Contact information, methods, and FAQ data for the contact page.
 * Modify these values to customize your contact page content.
 */

import type { ContactInfo, ContactMethod, ContactFAQ } from '../lib/types';

/** Contact information used across contact page and legal pages */
export const contact: ContactInfo = {
  email: 'afinateia@gmail.com',
  supportEmail: 'afinateia@gmail.com',
  salesEmail: 'afinateia@gmail.com',
  address: {
    street: '',
    city: 'Medellín',
    state: 'Antioquia',
    zip: '',
    country: 'Colombia',
  },
};

/** Contact methods displayed on the contact page */
export const contactMethods: ContactMethod[] = [
  {
    icon: 'lucide:mail',
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: 'simple-icons:whatsapp',
    label: 'WhatsApp',
    value: 'Contactar por WhatsApp',
    href: 'https://wa.me/573213902280',
  },
  {
    icon: 'simple-icons:instagram',
    label: 'Instagram',
    value: '@afinate',
    href: 'https://instagram.com/afinate',
  },
  {
    icon: 'simple-icons:facebook',
    label: 'Facebook',
    value: 'afinate',
    href: 'https://facebook.com/afinate',
  },
  {
    icon: 'simple-icons:x',
    label: 'X',
    value: '@afinate',
    href: 'https://x.com/afinate',
  },
];

/** FAQ items displayed on the contact page */
export const contactFAQs: ContactFAQ[] = [
  {
    question: '¿Cuál es el tiempo de respuesta habitual?',
    answer: 'Respondemos la mayoría de consultas en un plazo de 24 horas en días laborables (correo y WhatsApp).',
  },
  {
    question: '¿Puedo contactarlos por WhatsApp?',
    answer:
      'Sí. Puedes escribirnos por WhatsApp para consultas comerciales, soporte o dudas sobre la plataforma. El número está en esta página y en el pie del sitio.',
  },
  {
    question: '¿Cómo reporto un error o una incidencia?',
    answer:
      'Usa el formulario de contacto con asunto "Soporte técnico" o escríbenos a afinateia@gmail.com indicando el problema. Te responderemos para dar seguimiento.',
  },
];
