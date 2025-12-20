# Configuration

All configuration is centralized in `src/config/`. Import from `@/config` to access settings.

## Site Configuration

The easiest way to configure your site is via environment variables. Copy `.env.example` to `.env` and set:

```bash
SITE_URL=https://your-domain.com
SITE_NAME=Your Brand
SITE_DESCRIPTION=Your product description here
SITE_AUTHOR=Your Name
```

These values are used throughout the site for SEO, meta tags, sitemap, and RSS feeds.

For additional customization (logo, social links, etc.), edit `src/config/site.ts`:

```typescript
// Logo path (relative to /public), set to "" to show site name instead
export const logo = '/logo.svg';

// Open Graph image path
export const ogImage = '/images/og-image.png';

// Social media links
export const social = {
  twitter: 'https://twitter.com/yourhandle',
  github: 'https://github.com/yourrepo',
  discord: 'https://discord.gg/yourinvite',
};
```

## Contact Information

Configure contact details in `src/config/contact.ts`:

```typescript
export const contact = {
  email: 'hello@yoursite.com',
  supportEmail: 'support@yoursite.com',
  salesEmail: 'sales@yoursite.com',
  address: {
    street: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    country: 'United States',
  },
};

// Contact methods displayed on the contact page
export const contactMethods = [
  {
    icon: 'lucide:mail',
    label: 'Email',
    value: 'hello@yoursite.com',
    href: 'mailto:hello@yoursite.com',
  },
  {
    icon: 'simple-icons:discord',
    label: 'Discord',
    value: 'Join Discord',
    href: 'https://discord.gg/yourserver',
  },
  // Add more contact methods...
];

// FAQ items displayed on the contact page
export const contactFAQs = [
  {
    question: "What's your typical response time?",
    answer: 'We respond within 24 hours during business days.',
  },
  // Add more FAQs...
];
```

## Legal Configuration

For privacy policy and terms pages:

```typescript
export const legal = {
  privacyEmail: 'privacy@yoursite.com',
  legalEmail: 'legal@yoursite.com',
  lastUpdated: 'January 1, 2025',
};
```

## Navigation

Edit `src/config/navigation.ts` to customize the navbar:

```typescript
export const mainNavigation = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
```

## Feature Flags

Toggle features in `src/config/features.ts`:

```typescript
export const features = {
  blog: true,        // /blog routes
  docs: true,        // /docs routes
  changelog: true,   // /changelog page
  testimonials: true,// /testimonials page
  roadmap: true,     // /roadmap page
};
```

Feature flags control:
- **Navigation**: Disabled features are hidden from navbar and footer
- **Sitemap**: Disabled features are excluded from `sitemap.xml`
- **RSS**: Only enabled blog posts appear in the feed
- **Pages**: Pages remain accessible via direct URL (not deleted)

## Announcement Bar

Configure in `src/config/content.ts`:

```typescript
export const announcement = {
  enabled: true,
  id: 'launch-2025',        // Change ID to reset dismissal
  text: '🚀 Version 2.0 is here!',
  href: '/changelog',       // Optional link
  linkText: "See what's new",
  variant: 'primary',       // 'primary' | 'secondary' | 'gradient'
  dismissible: true,        // Allow users to close
};
```

When users dismiss the banner, their preference is saved in localStorage. Change the `id` to show a new announcement.

## Newsletter Strings

Customize newsletter section text in `src/config/content.ts`:

```typescript
export const content = {
  newsletter: {
    title: 'Stay in the loop',
    description: 'Get the latest updates delivered to your inbox.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    successMessage: 'Thanks for subscribing!',
    errorMessage: 'Something went wrong. Please try again.',
    privacyNote: 'We respect your privacy. Unsubscribe at any time.',
  },
};
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Required: Site identity
SITE_URL=https://your-domain.com
SITE_NAME=Your Brand
SITE_DESCRIPTION=Your product description here
SITE_AUTHOR=Your Name
```

| Variable | Required | Description |
|----------|----------|-------------|
| `SITE_URL` | Yes | Canonical URL for SEO, sitemap, and RSS |
| `SITE_NAME` | Yes | Site/brand name for header, footer, and meta tags |
| `SITE_DESCRIPTION` | Yes | Site description for SEO meta tags |
| `SITE_AUTHOR` | Yes | Author name for meta tags and copyright |

## Astro Configuration

The `astro.config.mjs` includes:
- MDX support for rich content
- Icon support via `astro-icon` (Lucide + Simple Icons)
- Sitemap generation with feature flag filtering
- Tailwind CSS v4 via Vite plugin

The `site` property automatically reads from `SITE_URL` environment variable:

```javascript
const siteUrl = process.env.SITE_URL || 'http://localhost:4321';

export default defineConfig({
  site: siteUrl,
  // ...
});
```

No need to edit `astro.config.mjs` directly — just set `SITE_URL` in your `.env` file.

## RSS Feed

The RSS feed is automatically generated at `/rss.xml` for blog posts. The feed respects the `draft` field - draft posts are excluded.

To customize the feed, edit `src/pages/rss.xml.ts`.

## Internationalization (i18n)

The theme currently uses `en-US` locale. To change the language:

1. Update the `lang` attribute in `src/layouts/BaseLayout.astro`:
   ```html
   <html lang="id">  <!-- Change to your locale -->
   ```

2. Update date formatting in `src/lib/utils.ts`:
   ```typescript
   return new Intl.DateTimeFormat('id-ID', options).format(date);
   ```
