// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro'

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

const isDev = process.env.NODE_ENV !== 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://sehc.fr',
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 3000,
    },
  },
  integrations: [
    markdoc(),
    ...(isDev ? [keystatic()] : []),
    react(),
    sitemap({
      filter: (page) => !page.includes('/keystatic'),
    }),
  ],
  adapter: vercel(),
});