# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm, pnpm, or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/erlandv/virex.git
cd virex

# Install dependencies
npm install

# Start development server
npm run dev
```

Your site will be available at `http://localhost:4321`.

## Import Aliases

The theme uses several path aliases for cleaner imports:

```typescript
// Base alias
import { siteConfig } from '@/config';
import { formatDate } from '@/lib/utils';
import MarketingLayout from '@/layouts/MarketingLayout.astro';

// Component aliases
import Header from '@layout/Header.astro';
import Hero from '@sections/marketing/Hero.astro';
import ContactForm from '@forms/ContactForm.astro';
import ThemeToggle from '@ui/ThemeToggle.astro';
```

### Available Aliases

| Alias | Path |
|-------|------|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@sections/*` | `src/components/sections/*` |
| `@ui/*` | `src/components/ui/*` |
| `@forms/*` | `src/components/forms/*` |
| `@layout/*` | `src/components/layout/*` |

## Sample Content

This theme includes sample content using "Virex" as a fictional SaaS product. Before launching your site, you'll want to replace:

- **Site configuration** in `src/config/` (name, description, URLs, contact info)
- **Blog posts** in `src/content/blog/`
- **Documentation** in `src/content/docs/`
- **Changelog entries** in `src/content/changelog/`
- **Testimonials** in `src/content/testimonials/`
- **Logo and images** in `public/`

You can delete the sample content files and create your own, or edit them as a starting point.

### Removing Sample Content

To start fresh with your own content:

1. Delete all files in `src/content/blog/`
2. Delete all files in `src/content/changelog/`
3. Delete all files in `src/content/testimonials/`
4. Keep or modify files in `src/content/docs/` for your own documentation
5. Replace images in `public/images/` (blog, team, testimonials, logos)
6. Update `public/logo.svg` and `public/favicon.svg` with your brand
7. Replace `public/images/og-image.png` with your Open Graph image (1200x630px)

## Project Structure

```
src/
├── components/
│   ├── common/                 # SEO, OptimizedImage
│   ├── error/                  # Error page components
│   ├── forms/                  # ContactForm, DemoRequestForm, LoginForm, etc.
│   ├── layout/                 # Header, Footer, AnnouncementBar
│   ├── sections/
│   │   ├── content/            # PageHeader, ContentSection, FAQSection, VideoEmbed
│   │   ├── marketing/          # Hero, CTA, FeaturesSection, HowItWorks, BentoGrid, etc.
│   │   ├── pricing/            # PricingTable, ComparisonTable, SecurityBadges, TrustBadges
│   │   ├── product/            # ChangelogList, RoadmapTimeline, StatusOverview
│   │   ├── social-proof/       # TestimonialsSection, CaseStudyCard, StatsSection
│   │   └── team/               # TeamSection, JobListings, ValuesSection
│   └── ui/                     # ThemeToggle, Pagination
├── config/                     # Site configuration
│   ├── index.ts                # Main export (imports all configs)
│   ├── site.ts                 # Site metadata, social links
│   ├── contact.ts              # Contact information
│   ├── navigation.ts           # Header and footer navigation
│   ├── features.ts             # Feature flags
│   └── content.ts              # Announcement bar, newsletter strings
├── content/                    # Content collections (Markdown/MDX)
│   ├── blog/                   # Blog posts
│   ├── docs/                   # Documentation
│   ├── changelog/              # Version history
│   └── testimonials/           # Customer quotes
├── layouts/                    # Page layouts
│   ├── BaseLayout.astro        # HTML shell
│   ├── MarketingLayout.astro   # Marketing pages
│   ├── BlogLayout.astro        # Blog posts
│   ├── DocsLayout.astro        # Documentation
│   └── ErrorLayout.astro       # Error pages
├── lib/                        # Utilities
│   ├── types.ts                # TypeScript interfaces
│   ├── utils.ts                # Helper functions
│   └── validation.ts           # Form validation
├── pages/                      # Route pages
│   ├── blog/                   # Blog with pagination and tags
│   ├── docs/                   # Documentation pages
│   └── ...                     # Other pages
└── styles/
    └── global.css              # Design tokens and global styles
```

## Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro configuration and integrations |
| `src/config/index.ts` | Site branding, navigation, features |
| `src/styles/global.css` | Design tokens and global styles |
| `src/content.config.ts` | Content collection schemas |
| `tsconfig.json` | TypeScript configuration and path aliases |
| `.env.example` | Environment variables template |

## Troubleshooting

### Common Issues

**Icon not found error**
Make sure you're using the correct icon prefix. Lucide icons use `lucide:` prefix:
```astro
<Icon name="lucide:zap" />  <!-- Correct -->
<Icon name="zap" />         <!-- Wrong -->
```

**Dark mode flash on page load**
The theme includes inline script in `BaseLayout.astro` to prevent flash. If you're seeing a flash, ensure the script runs before any content renders.

**Build fails with content collection errors**
Check that your frontmatter matches the schema in `src/content.config.ts`. Required fields must be present and dates must be valid.

**Path alias not working**
Ensure your `tsconfig.json` includes the path aliases. The theme comes pre-configured with aliases for `@/`, `@components/`, `@sections/`, `@ui/`, `@forms/`, and `@layout/`.
