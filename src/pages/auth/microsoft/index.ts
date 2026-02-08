/**
 * Microsoft OAuth - Redirect to Microsoft login
 * GET /auth/microsoft - Redirects user to Microsoft Entra ID authorize URL.
 * Requires env: AZURE_CLIENT_ID, AZURE_TENANT_ID (or "common"), SITE_URL
 */
import type { APIRoute } from 'astro';
import { randomBytes } from 'node:crypto';

const AZURE_CLIENT_ID = import.meta.env.AZURE_CLIENT_ID;
const AZURE_TENANT_ID = import.meta.env.AZURE_TENANT_ID || 'common';
const SITE_URL = import.meta.env.SITE_URL || 'http://localhost:4321';
const REDIRECT_URI = `${SITE_URL.replace(/\/$/, '')}/auth/microsoft/callback`;
const SCOPES = 'openid profile email';
const STATE_COOKIE = 'oauth_state';
const STATE_MAX_AGE = 600; // 10 minutes

export const GET: APIRoute = async ({ redirect }) => {
  if (!AZURE_CLIENT_ID) {
    return redirect('/login?error=azure_not_configured');
  }
  const state = randomBytes(24).toString('base64url');
  const authorizeUrl = new URL(`https://login.microsoftonline.com/${AZURE_TENANT_ID}/oauth2/v2.0/authorize`);
  authorizeUrl.searchParams.set('client_id', AZURE_CLIENT_ID);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authorizeUrl.searchParams.set('scope', SCOPES);
  authorizeUrl.searchParams.set('response_mode', 'query');
  authorizeUrl.searchParams.set('state', state);

  const cookie = `${STATE_COOKIE}=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${STATE_MAX_AGE}`;
  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      'Set-Cookie': cookie,
    },
  });
};
