import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from './src/config';

// Detectamos si estamos en Cloudflare o en tu PC
const isCloudflare = !!process.env.CF_PAGES;

export default defineConfig({
  site: 'https://afinate.com',
  output: 'server',
  // Si es Cloudflare usa su adaptador, si es tu PC usa Node
  adapter: isCloudflare 
    ? cloudflare() 
    : node({ mode: 'standalone' }),
  integrations: [
    mdx(),
    icon(),
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