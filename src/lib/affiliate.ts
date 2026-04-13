export type Merchant = 'florium' | 'agromarket';

function baseUrl(merchant: Merchant): string {
	const fromEnv =
		merchant === 'florium'
			? import.meta.env.PUBLIC_FLORIUM_BASE_URL
			: import.meta.env.PUBLIC_AGROMARKET_BASE_URL;
	const fallback = merchant === 'florium' ? 'https://florium.ua' : 'https://agromarket.ua';
	const raw = (typeof fromEnv === 'string' && fromEnv.length > 0 ? fromEnv : fallback).trim();
	return raw.replace(/\/+$/, '');
}

/**
 * Пряме посилання на магазин (без query-параметрів).
 * Для майбутнього трекінгу використовуйте `data-subid` у розмітці кнопок.
 */
export function partnerUrl(merchant: Merchant): string {
	return `${baseUrl(merchant)}/`;
}

/**
 * @deprecated Використовуйте `partnerUrl`. Залишено для сумісності: `subid` ігнорується, URL завжди прямий.
 */
export function affiliateUrl(merchant: Merchant, _subid: string): string {
	return partnerUrl(merchant);
}
