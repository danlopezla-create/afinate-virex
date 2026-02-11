/**
 * Dashboard Navigation Configuration
 *
 * @description
 * Defines the sidebar navigation structure for dashboard pages.
 * Supports nested navigation (up to 2 levels) and section headers.
 */

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: string; // Lucide icon name
  children?: DashboardNavItem[];
}

export interface DashboardNavSection {
  title?: string; // Optional section header
  items: DashboardNavItem[];
}

export const dashboardNavigation: DashboardNavSection[] = [
  {
    items: [
      {
        label: 'Resumen',
        href: '/dashboard',
        icon: 'layout-dashboard',
      },
    ],
  },
  {
    title: 'Agentes',
    items: [
      {
        label: 'Lucía',
        href: '/dashboard/projects',
        icon: 'folder',
      },
      {
        label: 'Sofía',
        href: '/dashboard/settings/team',
        icon: 'users',
      },
      {
        label: 'María',
        href: '/dashboard/maria',
        icon: 'briefcase',
      },
    ],
  },
  {
    title: 'Ajustes',
    items: [
      {
        label: 'Ajustes',
        href: '/dashboard/settings',
        icon: 'settings',
        children: [
          {
            label: 'Profile',
            href: '/dashboard/settings/profile',
            icon: 'user',
          },
          {
            label: 'Billing',
            href: '/dashboard/settings/billing',
            icon: 'credit-card',
          },
        ],
      },
    ],
  },
];
