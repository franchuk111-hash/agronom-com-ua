import { CRUMB_LABELS, type PageDef } from '../data/registry';
import { SITE } from '../data/site';

export type Crumb = { name: string; href?: string };

export function breadcrumbsForPage(page: PageDef): readonly Crumb[] {
	const base = `https://${SITE.domain}`;
	const parts = page.slug.split('/');
	const out: Crumb[] = [{ name: 'Головна', href: `${base}/` }];

	for (let i = 0; i < parts.length; i++) {
		const prefix = parts.slice(0, i + 1).join('/');
		const isLast = i === parts.length - 1;
		const name = isLast ? (CRUMB_LABELS[prefix] ?? page.h1) : (CRUMB_LABELS[prefix] ?? parts[i]);
		if (isLast) {
			out.push({ name });
		} else {
			out.push({ name, href: `${base}/${prefix}/` });
		}
	}

	return out;
}

export function breadcrumbSchemaItems(page: PageDef): readonly { name: string; url: string }[] {
	const base = `https://${SITE.domain}`;
	const parts = page.slug.split('/');
	const out: { name: string; url: string }[] = [{ name: 'Головна', url: `${base}/` }];
	for (let i = 0; i < parts.length; i++) {
		const prefix = parts.slice(0, i + 1).join('/');
		const name = i === parts.length - 1 ? (CRUMB_LABELS[prefix] ?? page.h1) : (CRUMB_LABELS[prefix] ?? parts[i]);
		out.push({ name, url: `${base}/${prefix}/` });
	}
	return out;
}

export function pagePath(slug: string): string {
	return `/${slug}/`;
}
