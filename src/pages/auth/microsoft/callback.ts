/**
 * Microsoft OAuth - Callback after user signs in
 * GET /auth/microsoft/callback - Exchanges code for tokens and redirects to app.
 * Requires env: AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_TENANT_ID, SITE_URL
 */
import type { APIRoute } from 'astro';

const AZURE_CLIENT_ID = import.meta.env.AZURE_CLIENT_ID;
const AZURE_CLIENT_SECRET = import.meta.env.AZURE_CLIENT_SECRET;
const AZURE_TENANT_ID = import.meta.env.AZURE_TENANT_ID || 'common';
const SITE_URL = import.meta.env.SITE_URL || 'http://localhost:4321';
const REDIRECT_URI = `${SITE_URL.replace(/\/$/, '')}/auth/microsoft/callback`;
const STATE_COOKIE = 'oauth_state';
const TOKEN_URL = `https://login.microsoftonline.com/${AZURE_TENANT_ID}/oauth2/v2.0/token`;

export const GET: APIRoute = async ({ request, redirect, cookies }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error)}`);
  }
  if (!code || !state) {
    return redirect('/login?error=missing_code_or_state');
  }
  const savedState = cookies.get(STATE_COOKIE)?.value;
  if (!savedState || savedState !== state) {
    return redirect('/login?error=invalid_state');
  }

  if (!AZURE_CLIENT_ID || !AZURE_CLIENT_SECRET) {
    return redirect('/login?error=azure_not_configured');
  }

  const body = new URLSearchParams({
    client_id: AZURE_CLIENT_ID,
    client_secret: AZURE_CLIENT_SECRET,
    code,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  const tokenRes = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    console.error('Azure token error:', err);
    return redirect('/login?error=token_exchange_failed');
  }

  const data = (await tokenRes.json()) as {
    access_token?: string;
    id_token?: string;
    refresh_token?: string;
  };

  const redirectTo = url.searchParams.get('redirect_to') || '/dashboard';
  const headers = new Headers({ Location: redirectTo });
  headers.append('Set-Cookie', `${STATE_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  if (data.access_token) {
    headers.append('Set-Cookie', `azure_token=${data.access_token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`);
  }
  return new Response(null, { status: 302, headers });
};
