import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from './src/config';

// Detectamos el entorno
const isCloudflare = !!process.env.CF_PAGES;

// Importamos el adaptador de forma dinámica para evitar que tu ARM64 explote
const adapter = isCloudflare
  ? (await import('@astrojs/cloudflare')).default({
      imageService: 'compile', // sharp solo en build; Cloudflare no soporta sharp en runtime
    })
  : (await import('@astrojs/node')).default({ mode: 'standalone' });

export default defineConfig({
  site: 'https://afinate.com',
  output: 'server',
  adapter: adapter,
  integrations: [
    icon(), // Lo ponemos de primero para asegurar que se cargue
    mdx(),
    sitemap({
      filter: (page) => {
        const { features } = siteConfig;
        if (!features.blog && page.includes('/blog')) return false;
        if (!features.docs && page.includes('/docs')) return false;
        return true;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});