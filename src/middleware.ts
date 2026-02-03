import { defineMiddleware } from 'astro:middleware';

// Basic authentication for Keystatic admin panel
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Only protect /keystatic routes
  if (pathname.startsWith('/keystatic')) {
    const authHeader = context.request.headers.get('Authorization');

    // Get credentials from environment variables
    const validUsername = import.meta.env.KEYSTATIC_USERNAME || 'admin';
    const validPassword = import.meta.env.KEYSTATIC_PASSWORD;

    // If no password is set in env, block access in production
    if (!validPassword && import.meta.env.PROD) {
      return new Response('Keystatic is disabled. Set KEYSTATIC_PASSWORD environment variable.', {
        status: 503,
      });
    }

    // In development without password, allow access
    if (!validPassword && import.meta.env.DEV) {
      console.warn('⚠️  WARNING: Keystatic is running without authentication. Set KEYSTATIC_PASSWORD in .env');
      return next();
    }

    // Check authentication
    if (!authHeader) {
      return new Response('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Keystatic Admin"',
        },
      });
    }

    // Verify credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials).split(':');
    const username = credentials[0];
    const password = credentials[1];

    if (username !== validUsername || password !== validPassword) {
      return new Response('Invalid credentials', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Keystatic Admin"',
        },
      });
    }
  }

  return next();
});
