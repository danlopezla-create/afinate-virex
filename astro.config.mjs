import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from './src/config';

export default defineConfig(async () => {
  // 1. Detectamos si estamos en la nube de Cloudflare
  const isCloudflare = !!process.env.CF_PAGES;
  
  // 2. Cargamos el adaptador correcto solo cuando se necesita
  let adapter;
  if (isCloudflare) {
    const { default: cfAdapter } = await import('@astrojs/cloudflare');
    adapter = cfAdapter();
  } else {
    const { default: nodeAdapter } = await import('@astrojs/node');
    adapter = nodeAdapter({ mode: 'standalone' });
  }

  return {
    site: 'https://afinate.com',
    output: 'server',
    adapter: adapter, // Aquí se asigna el que elegimos arriba
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
  };
});