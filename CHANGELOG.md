# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2025-12-24

### Added

- **New Marketing Components**:
  - `HowItWorks` - Step-by-step process visualization
  - `IntegrationsGrid` - Partner integrations showcase with 24 provider logos
  - `SecurityBadges` - Security certifications and compliance badges
  - `VideoEmbed` - Embedded video content for sections
  - `BentoGrid` - Modern grid layout for feature highlights
  - `FeatureHighlight` - Detailed feature presentation
  - `CaseStudyCard` - Customer success story cards

- **New Section Components**:
  - `ChangelogList` - Timeline-based changelog display
  - `ContentSection` - Flexible content layouts with alignment options
  - `FAQSection` - Accordion-style FAQ displays
  - `JobListings` - Career opportunities presentation
  - `PageHeader` - Consistent page title sections
  - `RoadmapTimeline` - Product roadmap visualization
  - `StatsSection` - Metrics and statistics display
  - `StatusOverview` - System status information
  - `TeamSection` - Team member profiles
  - `TestimonialsGrid` - Customer testimonials layout
  - `ValuesSection` - Company values presentation

- **New Pages**:
  - `/customers` - Customer success stories and case studies
  - `/demo` - Demo request form page
  - `/enterprise` - Enterprise features and pricing
  - `/integrations` - Partner integrations showcase
  - `/security` - Security features and compliance information

- **New Forms**:
  - `DemoRequestForm` - Demo request with validation and multi-backend support

- **New Documentation Content**:
  - 8 new documentation guides: edge-network, frameworks, infrastructure, previews, RBAC, rollbacks, SSO, and teams

- **Pricing Enhancements**:
  - `ComparisonTable` - Feature comparison across pricing plans
  - `TrustBadges` - Payment methods and security badges
  - Payment method SVG icons (Visa, Mastercard, Amex, PayPal)

- **Component Enhancements**:
  - Flexible `background` prop for sections (`default`, `muted`, `accent`)
  - Optional `footerLink` prop for FeaturesSection and TestimonialsSection
  - Optional `limit` prop for TestimonialsSection
  - Secondary action button support in CTA component

- **Developer Experience**:
  - Path aliases: `@components/*`, `@sections/*`, `@layout/*`, `@forms/*`, `@ui/*`
  - ESLint configuration with TypeScript and Astro plugin support
  - Prettier configuration with Astro plugin support
  - New npm scripts: `lint`, `lint:fix`, `format`, `format:check`, `check`

### Changed

- **Component Organization**: Reorganized `src/components/sections/` into category-based structure:
  - `content/` - PageHeader, ContentSection, FAQSection
  - `marketing/` - Hero, CTA, LogoCloud, FeaturesSection, Newsletter, HowItWorks, IntegrationsGrid, BentoGrid, FeatureHighlight
  - `pricing/` - PricingTable, ComparisonTable, TrustBadges
  - `product/` - ChangelogList, RoadmapTimeline, StatusOverview
  - `social-proof/` - StatsSection, TestimonialsSection, TestimonialsGrid, CaseStudyCard
  - `team/` - TeamSection, JobListings, ValuesSection
  - `ui/` - ThemeToggle, Pagination (flattened)

- **Navigation**: Centralized all navigation to `src/config/navigation.ts`
  - Header navigation with main links and CTA buttons
  - Footer navigation with Product, Solutions, Resources, Company, and Legal sections
  - Feature-flag filtering for dynamic navigation visibility

- **Layout Components**:
  - Renamed `Navbar.astro` to `Header.astro` with proper `<header>` wrapping `<nav>`
  - Footer legal links now visible on mobile (center aligned with copyright)

- **Astro v6 Compatibility**:
  - Migrated to Content Collections v3 API with glob loaders
  - Updated `z` import from `astro/zod` instead of `astro:content`
  - Replaced `entry.render()` with `render(entry)` function
  - Updated `post.slug` to `post.id` across blog and docs pages

- **Documentation**: Updated all docs in `docs/` folder to reflect current project structure and features

### Updated

- `@iconify-json/lucide` upgraded to v1.2.82
- README with path aliases and updated project structure
- All page templates refactored to use new section components

## [1.2.0] - 2025-12-20

### Added

- **TypeScript Type Annotations**: Comprehensive type safety improvements across the codebase
  - Blog and docs pages with full TypeScript annotations
  - Page components with proper type definitions
  - DocsLayout with comprehensive type annotations
  - BlogLayout slot usage refactored for better type safety

- **Testimonial Card Improvements**: Inline component with initials fallback
  - Avatar now shows initials when image is unavailable
  - Better user experience for missing profile images

### Changed

- **Hero Section**: Enhanced typography and updated homepage messaging
  - Improved visual hierarchy and readability
  - Updated marketing copy for better conversion

- **Features & Testimonials Sections**: Refactored with flexible heading support
  - More customizable section headings
  - Better component composition

- **Content Configuration**: Relocated to root level for better organization
  - Simplified project structure
  - Easier configuration management

- **Environment Configuration**: Simplified setup with improved documentation
  - Cleaner environment variable handling
  - Better developer experience

### Updated

- Dark and light mode screenshots reflecting latest UI changes
- README and documentation improvements

## [1.1.0] - 2025-12-19

### Added

- **Authentication Pages**: Complete auth UI with Login, Register, and Forgot Password pages
  - `LoginForm` component with email/password validation, remember me, demo mode support
  - `RegisterForm` component with full name, email, password, terms agreement validation
  - `ForgotPasswordForm` component for password reset requests
  - `SocialAuthButtons` component for Google/GitHub OAuth buttons
  - All forms support demo mode (simulates success) and custom backend endpoints

- **LogoCloud Component**: Client/partner logo showcase section
  - Three display variants: `default` (static row), `marquee` (animated scroll), `grid`
  - Configurable logo size, grayscale effect, animation speed
  - Placeholder logos included in `public/images/logos/`

- **Newsletter Component**: Standalone newsletter subscription section
  - Extracted from Footer for flexible placement
  - Three variants: `default`, `compact`, `card`
  - Configurable background styles and messaging
  - Demo mode and custom endpoint support

- **Documentation Landing Page**: Interactive docs index page
  - Hero section with quick start buttons
  - Quick links to popular documentation
  - Organized sections with icons and descriptions
  - Help section with support links

- **Navbar Updates**: Added authentication links
  - "Login" text link navigating to `/login`
  - "Get Started" button navigating to `/register`
  - Mobile menu includes auth links with divider

- **Landing Page Updates**:
  - LogoCloud section below Hero ("Trusted by innovative teams")
  - Newsletter section above Footer
  - CTA buttons now link to `/register` instead of `/pricing`

- **Validation Utilities**: New validators in `src/lib/validation.ts`
  - `password(minLength)` - Password minimum length validation
  - `checkbox(fieldName)` - Checkbox required validation

### Changed

- Footer no longer includes Newsletter section (moved to standalone component)
- Documentation reorganized with new authentication guide (`docs/07-authentication.md`)
- Components documentation updated with LogoCloud and Newsletter sections

## [1.0.0] - 2025-12-18

### Added

- Initial release of Virex - SaaS Landing Page Theme for Astro 5

- **Content Collections**:
  - Blog with pagination, tag filtering, and reading time calculation
  - Documentation with auto-generated sidebar navigation
  - Changelog for version history
  - Testimonials collection

- **Core Pages**:
  - Landing page with Hero, Features, Testimonials, CTA sections
  - Features, Pricing, About, Contact, FAQ pages
  - Careers, Status, Roadmap pages
  - Legal pages (Privacy Policy, Terms of Service)
  - Error pages (403, 404, 500)

- **Components**:
  - Hero, FeatureGrid, PricingTable, CTA sections
  - Navbar with mobile menu and theme toggle
  - Footer with newsletter and social links
  - ContactForm with validation and multiple backend support (Netlify, Formspree, custom)
  - TestimonialCard, Pagination, AnnouncementBar
  - SEO component with meta tags, Open Graph, Twitter Cards, JSON-LD
  - OptimizedImage for smart image optimization

- **Layouts**:
  - MarketingLayout, BlogLayout, DocsLayout, ErrorLayout, BaseLayout

- **Features**:
  - Design tokens system with OKLCH colors for easy brand customization
  - Dark mode with localStorage persistence and system preference detection
  - SEO optimized with sitemap and RSS feed generation
  - Feature flags to enable/disable sections (blog, docs, changelog, testimonials, roadmap)
  - Accessibility features (focus states, reduced motion, semantic HTML)
  - 200,000+ icons via astro-icon (Lucide + Simple Icons)
  - Announcement bar with dismissible state

- **Documentation**:
  - Getting started guide
  - Configuration reference
  - Customization guide
  - Content management guide
  - Components documentation
  - Pages and routing guide
  - Deployment guide (Vercel, Netlify, Cloudflare)
