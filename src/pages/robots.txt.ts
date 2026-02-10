import type { APIRoute } from 'astro';
import { siteConfig } from '@/config';

export const GET: APIRoute = () => {
  const robotsTxt = `# robots.txt para ${siteConfig.name}
# https://www.robotstxt.org/

User-agent: *
Allow: /

# Evitamos que los robots pierdan tiempo en archivos internos de Astro
Disallow: /_astro/
Disallow: /api/

# Bloqueo estándar de bots de IA (Para proteger la propiedad intelectual de afínate)
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

# Ubicación del Sitemap - Crucial para el 100 de SEO
Sitemap: ${siteConfig.url}/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};