# Virex - SaaS Theme for Astro

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready SaaS theme for Astro. Designed to help you go from idea to launch quickly, Virex includes marketing pages, documentation, and a dashboard UI. Built with a strong focus on performance, simplicity, and easy customization.

## Demo

![Light Mode](./screenshots/light-mode.webp)
![Dark Mode](./screenshots/dark-mode.webp)

**Live Demo**: [https://virex.erland.me](https://virex.erland.me)

## Features

- **Astro** with TypeScript and Tailwind CSS v4
- **Content Collections** for blog, docs, changelog, and testimonials
- **Dashboard Layout System** with sidebar navigation, reusable components, and example pages
- **Blog** with pagination, tag filtering, and reading time
- **Documentation** with auto-generated sidebar navigation
- **Design Tokens** for easy brand customization (OKLCH color system)
- **Dark Mode** with system preference detection and localStorage persistence
- **SEO-ready** setup: meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap, and RSS
- **Feature Flags** to enable or disable sections (blog, docs, changelog, testimonials, roadmap)
- **Contact Form** with validation and multiple backend options (Netlify, Formspree, custom)
- **Legal Pages** for privacy policy and terms of service
- **Accessibility** with semantic HTML, focus states, and reduced motion support
- **200,000+ Icons** via astro-icon (Lucide + Simple Icons included)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/erlandv/virex.git
cd virex

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to see your site.

## Key Features

### Marketing Pages

A complete set of landing pages designed for SaaS marketing and conversion.

**Includes**: hero sections, feature grids, pricing tables, testimonials, FAQs, contact forms, team pages, case studies, and integrations showcases.

### Dashboard System

A flexible dashboard layout with sidebar navigation, reusable UI components, and example pages for common SaaS workflows.

**Includes**: Overview, settings, projects pages • StatCard, DataTable, Chart, Modal, Toast components • Full light/dark mode support

**Routes**: `/dashboard`, `/dashboard/settings/*`, `/dashboard/projects`

> **Note**: Dashboard pages use starter templates with sample data. Authentication is not included and must be implemented by the user.

### Content Management

Built-in content collections for blog posts, documentation, changelog entries, and testimonials with full Markdown and MDX support.

**Includes**: paginated blog with tags • auto-generated docs sidebar • changelog timeline • testimonials grid

### Developer Experience

A smooth developer experience with TypeScript, Tailwind CSS v4, and a clean project structure.

**Path aliases**: `@dashboard/*`, `@dashboard-ui/*`, `@components/*`, `@sections/*`, `@forms/*`, `@ui/*`, `@layout/*`

**Tools**: ESLint and Prettier configured • type-safe development • fast reload with Astro dev server

## Documentation

Full documentation is available in the [`docs/`](./docs/) folder:

1. **[Getting Started](./docs/01-getting-started.md)** - Installation and project structure
2. **[Configuration](./docs/02-configuration.md)** - Site settings and feature flags
3. **[Customization](./docs/03-customization.md)** - Design tokens, branding, and theming
4. **[Content Guide](./docs/04-content-guide.md)** - Managing blog, docs, changelog, and testimonials
5. **[Components](./docs/05-components.md)** - Icons, forms, and UI components
6. **[Pages](./docs/06-pages.md)** - Available pages and routing
7. **[Authentication](./docs/07-authentication.md)** - Authentication guidance
8. **[Deployment](./docs/08-deployment.md)** - Deploying to Vercel, Netlify, or Cloudflare
9. **[Dashboard](./docs/09-dashboard.md)** - Dashboard layouts and components

## Project Structure

```
src/
├── components/     # Reusable UI components
├── config/         # Site configuration
├── content/        # Blog, docs, changelog, testimonials
├── layouts/        # Page layouts
├── lib/            # Utilities and types
├── pages/          # Route pages
└── styles/         # Design tokens and global styles
```

## Configuration

All configuration files are located in `src/config/`:

| File | Purpose |
|------|---------|
| `site.ts` | Site name, description, URL, social links |
| `features.ts` | Enable or disable sections |
| `navigation.ts` | Header and footer navigation |
| `contact.ts` | Contact information and methods |
| `content.ts` | Announcement bar and newsletter text |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build the site for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix lint issues automatically |
| `npm run format` | Format files with Prettier |
| `npm run format:check` | Check formatting |
| `npm run check` | Run lint, format check, and Astro checks |

## License

Virex Theme is free for personal and commercial use under the [MIT License](./LICENSE). Attribution is not required, but a link back to this repository is always appreciated.
