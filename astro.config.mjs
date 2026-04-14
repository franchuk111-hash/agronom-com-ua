// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Якщо сайт фізично в підпапці (URL виду /papka/...), додай: base: '/papka/',
export default defineConfig({
	site: 'https://argonom.com.ua',
	trailingSlash: 'always',
	integrations: [sitemap()],
	compressHTML: true,
});
