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
    href: 'https://wa.me/',
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
    question: '¿Cuál es su tiempo de respuesta habitual?',
    answer: 'Respondemos la mayoría de consultas en un plazo de 24 horas en días laborables.',
  },
  {
    question: '¿Ofrecen soporte telefónico?',
    answer:
      'El soporte telefónico está disponible para clientes Enterprise. El resto puede contactarnos por correo o Discord.',
  },
  {
    question: '¿Cómo reporto un error?',
    answer: 'Use el formulario con el asunto "Soporte técnico" o abra un issue en nuestro GitHub.',
  },
];
