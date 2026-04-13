import { PAGES } from '../src/data/registry.ts';

/** Сегменти URL: латиниця, цифри, дефіс (наприклад pro-nas, de-kupyty/sadzhantsi). */
const slugRe = /^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/;

const slugs = new Set<string>();
let errors = 0;

for (const p of PAGES) {
	if (slugs.has(p.slug)) {
		console.error(`[registry] Дубль slug: ${p.slug}`);
		errors++;
	}
	slugs.add(p.slug);
	if (!slugRe.test(p.slug)) {
		console.error(`[registry] Некоректний slug: ${p.slug}`);
		errors++;
	}
}

for (const p of PAGES) {
	for (const r of p.related) {
		if (!slugs.has(r)) {
			console.error(`[registry] related не існує: "${p.slug}" -> "${r}"`);
			errors++;
		}
	}
}

if (errors > 0) {
	console.error(`[registry] Знайдено помилок: ${errors}`);
	process.exit(1);
}

console.log(`[registry] OK: ${PAGES.length} сторінок, перелінковка цілісна.`);
