import { SITE } from '../data/site';

const SITE_ID = `https://${SITE.domain}/`;

export function jsonLd(data: unknown): string {
	return JSON.stringify(data);
}

export function organizationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${SITE_ID}#organization`,
		name: SITE.name,
		url: SITE_ID,
		email: SITE.contactEmail,
		logo: { '@type': 'ImageObject', url: `${SITE_ID}favicon.svg` },
	} as const;
}

export function websiteSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${SITE_ID}#website`,
		name: SITE.name,
		url: SITE_ID,
		inLanguage: SITE.locale,
		description: SITE.defaultDescription,
		publisher: { '@id': `${SITE_ID}#organization` },
	} as const;
}

export function breadcrumbSchema(items: readonly { name: string; url: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((it, idx) => ({
			'@type': 'ListItem',
			position: idx + 1,
			name: it.name,
			item: it.url,
		})),
	} as const;
}

export function webPageSchema(input: {
	id: string;
	url: string;
	name: string;
	description: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': input.id,
		url: input.url,
		name: input.name,
		description: input.description,
		inLanguage: SITE.locale,
		isPartOf: { '@id': `${SITE_ID}#website` },
		publisher: { '@id': `${SITE_ID}#organization` },
	} as const;
}

export function collectionPageSchema(input: {
	id: string;
	url: string;
	name: string;
	description: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		'@id': input.id,
		url: input.url,
		name: input.name,
		description: input.description,
		inLanguage: SITE.locale,
		isPartOf: { '@id': `${SITE_ID}#website` },
		publisher: { '@id': `${SITE_ID}#organization` },
	} as const;
}

export function articleSchema(input: {
	url: string;
	headline: string;
	description: string;
	datePublished: string;
	dateModified: string;
}) {
	const id = `${input.url}#article`;
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		'@id': id,
		mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
		headline: input.headline,
		description: input.description,
		inLanguage: SITE.locale,
		datePublished: input.datePublished,
		dateModified: input.dateModified,
		author: { '@type': 'Organization', name: `${SITE.name} — редакція` },
		publisher: { '@id': `${SITE_ID}#organization` },
	} as const;
}

export function faqPageSchema(items: readonly { question: string; answer: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((it) => ({
			'@type': 'Question',
			name: it.question,
			acceptedAnswer: { '@type': 'Answer', text: it.answer },
		})),
	} as const;
}
