export const SITE = {
	name: 'Argonom',
	domain: 'argonom.com.ua',
	lang: 'uk',
	locale: 'uk-UA',
	contactEmail: 'editor@argonom.com.ua',
	tagline: 'Незалежний гід по саду, городу та догляду за рослинами в Україні.',
	defaultDescription:
		'Практичні гіди: як обрати саджанці, насіння та добрива, коли садити й що врахувати перед покупкою. Без зайвого шуму — лише користь.',
} as const;

export type NavItem = { readonly href: string; readonly label: string };

export const NAV_MAIN: readonly NavItem[] = [
	{ href: '/sadzhantsi/', label: 'Саджанці' },
	{ href: '/nasinnia/', label: 'Насіння' },
	{ href: '/dobryva/', label: 'Добрива' },
	{ href: '/instrumenty/', label: 'Інструменти' },
	{ href: '/kvity/', label: 'Квіти' },
	{ href: '/yahidni-kultury/', label: 'Ягоди' },
	{ href: '/sezonni-porady/', label: 'Сезон' },
	{ href: '/porivniannia/', label: 'Порівняння' },
	{ href: '/de-kupyty/', label: 'Де купити' },
	{ href: '/blog/', label: 'Матеріали' },
] as const;

export const NAV_FOOTER_TRUST: readonly NavItem[] = [
	{ href: '/pro-nas/', label: 'Про нас' },
	{ href: '/kontakty/', label: 'Контакти' },
	{ href: '/redaktsiina-polityka/', label: 'Редакційна політика' },
	{ href: '/polityka-konfidentsiinosti/', label: 'Політика конфіденційності' },
	{ href: '/umovy-korystuvannia/', label: 'Умови користування' },
	{ href: '/affiliate-disclaimer/', label: 'Affiliate Disclaimer' },
] as const;
