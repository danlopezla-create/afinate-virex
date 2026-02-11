/**
 * Dashboard Sample Data
 *
 * @description
 * Provides sample data functions for dashboard demonstration.
 * This data is fictional and should be replaced with real API calls.
 */

import type {
  Project,
  TeamMember,
  Metric,
  ChartData,
  BillingPlan,
  PaymentMethod,
  BillingHistoryItem,
} from './types';

/**
 * Get sample projects list
 */
export function getProjects(): Project[] {
  return [
    {
      id: '1',
      name: 'Café El Mirador SAS',
      description: 'Ventas de café especial y tienda en Medellín',
      status: 'active',
      createdAt: new Date('2026-01-05'),
      updatedAt: new Date('2026-02-02'),
      owner: 'Laura González',
    },
    {
      id: '2',
      name: 'Distribuciones Andinas LTDA',
      description: 'Comercialización de alimentos al por mayor',
      status: 'active',
      createdAt: new Date('2026-01-08'),
      updatedAt: new Date('2026-02-03'),
      owner: 'Andrés Pérez',
    },
    {
      id: '3',
      name: 'Servicios Contables La 70',
      description: 'Asesoría contable y tributaria para Pymes',
      status: 'active',
      createdAt: new Date('2026-01-10'),
      updatedAt: new Date('2026-02-04'),
      owner: 'María Fernanda Ríos',
    },
    {
      id: '4',
      name: 'Transporte Rápido Antioquia',
      description: 'Servicios de transporte de carga regional',
      status: 'archived',
      createdAt: new Date('2026-01-02'),
      updatedAt: new Date('2026-02-01'),
      owner: 'Carlos Restrepo',
    },
    {
      id: '5',
      name: 'Clínica Odontológica Sonrisas',
      description: 'Servicios odontológicos integrales en Bogotá',
      status: 'active',
      createdAt: new Date('2026-01-12'),
      updatedAt: new Date('2026-02-05'),
      owner: 'Paula Ramírez',
    },
    {
      id: '6',
      name: 'Constructora Nuevo Horizonte',
      description: 'Proyectos de vivienda de interés social',
      status: 'active',
      createdAt: new Date('2026-01-15'),
      updatedAt: new Date('2026-02-06'),
      owner: 'Juan Camilo Vélez',
    },
    {
      id: '7',
      name: 'Panadería La 10',
      description: 'Punto de venta de panadería y repostería',
      status: 'draft',
      createdAt: new Date('2026-01-03'),
      updatedAt: new Date('2026-01-28'),
      owner: 'Diana López',
    },
    {
      id: '8',
      name: 'Tecnología Norte SAS',
      description: 'Venta y soporte de equipos de cómputo',
      status: 'active',
      createdAt: new Date('2026-01-18'),
      updatedAt: new Date('2026-02-07'),
      owner: 'Felipe Ospina',
    },
    {
      id: '9',
      name: 'Hotel Mirador del Valle',
      description: 'Alojamiento turístico en el eje cafetero',
      status: 'draft',
      createdAt: new Date('2026-01-20'),
      updatedAt: new Date('2026-02-01'),
      owner: 'Natalia Cárdenas',
    },
    {
      id: '10',
      name: 'Importadora Los Andes',
      description: 'Importación y distribución de productos para el hogar',
      status: 'active',
      createdAt: new Date('2026-01-22'),
      updatedAt: new Date('2026-02-08'),
      owner: 'Óscar Valencia',
    },
    {
      id: '11',
      name: 'Centro Médico San José',
      description: 'Servicios de salud de primer y segundo nivel',
      status: 'archived',
      createdAt: new Date('2026-01-04'),
      updatedAt: new Date('2026-01-30'),
      owner: 'Gloria Martínez',
    },
    {
      id: '12',
      name: 'Logística Express Bogotá',
      description: 'Operador logístico urbano',
      status: 'active',
      createdAt: new Date('2026-01-25'),
      updatedAt: new Date('2026-02-09'),
      owner: 'Sergio Muñoz',
    },
  ];
}

/**
 * Get a single project by ID
 */
export function getProject(id: string): Project | undefined {
  return getProjects().find((project) => project.id === id);
}

/**
 * Get sample team members
 */
export function getTeamMembers(): TeamMember[] {
  return [
    {
      id: '1',
      name: 'Sarah Mitchell',
      email: 'sarah@afinate.com',
      role: 'owner',
      joinedAt: new Date('2023-01-15'),
    },
    {
      id: '2',
      name: 'James Chen',
      email: 'james@afinate.com',
      role: 'admin',
      joinedAt: new Date('2023-03-20'),
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      email: 'maria@afinate.com',
      role: 'admin',
      joinedAt: new Date('2023-06-10'),
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david@afinate.com',
      role: 'member',
      joinedAt: new Date('2023-09-05'),
    },
    {
      id: '5',
      name: 'Alex Johnson',
      email: 'alex@afinate.com',
      role: 'member',
      joinedAt: new Date('2024-02-14'),
    },
  ];
}

/**
 * Get dashboard metrics
 */
export function getMetrics(): Metric[] {
  return [
    {
      title: 'Total Projects',
      value: 24,
      trend: {
        value: 12,
        direction: 'up',
      },
      icon: 'folder',
      description: 'Active and archived projects',
    },
    {
      title: 'Active Users',
      value: '1,234',
      trend: {
        value: 8,
        direction: 'up',
      },
      icon: 'users',
      description: 'Monthly active users',
    },
    {
      title: 'Revenue',
      value: '$12,450',
      trend: {
        value: 15,
        direction: 'up',
      },
      icon: 'dollar-sign',
      description: 'Monthly recurring revenue',
    },
    {
      title: 'API Calls',
      value: '45.2K',
      trend: {
        value: 3,
        direction: 'down',
      },
      icon: 'activity',
      description: 'Total API requests this month',
    },
  ];
}

/**
 * Get chart data for overview page
 */
export function getChartData(): ChartData {
  return {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Projects Created',
        data: [3, 5, 2, 8, 6, 4, 7],
        color: '#8b5cf6',
      },
    ],
  };
}

/**
 * Get current billing plan
 */
export function getBillingPlan(): BillingPlan {
  return {
    name: 'Professional',
    price: 49,
    interval: 'month',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
      'Team collaboration',
      'API access',
    ],
    nextBillingDate: new Date('2025-01-25'),
  };
}

/**
 * Get payment method
 */
export function getPaymentMethod(): PaymentMethod {
  return {
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2026,
  };
}

/**
 * Get billing history
 */
export function getBillingHistory(): BillingHistoryItem[] {
  return [
    {
      id: '1',
      date: new Date('2024-12-25'),
      description: 'Professional Plan - December 2024',
      amount: 49,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '2',
      date: new Date('2024-11-25'),
      description: 'Professional Plan - November 2024',
      amount: 49,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '3',
      date: new Date('2024-10-25'),
      description: 'Professional Plan - October 2024',
      amount: 49,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '4',
      date: new Date('2024-09-25'),
      description: 'Professional Plan - September 2024',
      amount: 49,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '5',
      date: new Date('2024-08-25'),
      description: 'Professional Plan - August 2024',
      amount: 49,
      status: 'paid',
      invoiceUrl: '#',
    },
  ];
}
