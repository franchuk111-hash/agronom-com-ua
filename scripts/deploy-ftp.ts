/**
 * Заливка зібраного dist/ на FTP/FTPS.
 *
 * Змінні середовища (обовʼязкові):
 *   FTP_HOST, FTP_USER, FTP_PASSWORD
 *
 * Опційно:
 *   FTP_PORT          (за замовчуванням 21)
 *   FTP_REMOTE_DIR    каталог на сервері, куди класти файли (за замовчуванням public_html)
 *   FTP_SECURE=1      явний FTPS (TLS); без зміни — звичайний FTP
 *   FTP_DEBUG=1       детальний лог протоколу
 *
 * Приклад:
 *   npm run build:hosting
 *   FTP_HOST=ftp.example.ua FTP_USER=u FTP_PASSWORD=p npm run deploy:ftp:upload
 *
 * Або одним кроком:
 *   FTP_HOST=... FTP_USER=... FTP_PASSWORD=... npm run deploy:ftp
 */

import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from 'basic-ftp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

function req(name: string): string {
	const v = process.env[name]?.trim();
	if (!v) {
		console.error(`[deploy:ftp] Не задано змінну ${name}`);
		process.exit(1);
	}
	return v;
}

async function main() {
	if (!existsSync(dist)) {
		console.error('[deploy:ftp] Немає папки dist/. Спочатку: npm run build:hosting');
		process.exit(1);
	}

	const host = req('FTP_HOST');
	const user = req('FTP_USER');
	const password = process.env.FTP_PASSWORD?.trim() || process.env.FTP_PASS?.trim();
	if (!password) {
		console.error('[deploy:ftp] Задай FTP_PASSWORD (або FTP_PASS)');
		process.exit(1);
	}

	const port = Number(process.env.FTP_PORT || '21') || 21;
	const remoteDir = (process.env.FTP_REMOTE_DIR ?? 'public_html').trim() || '.';
	const secure =
		process.env.FTP_SECURE === '1' ||
		process.env.FTP_SECURE === 'true' ||
		process.env.FTP_SECURE === 'explicit';
	const implicit = process.env.FTP_SECURE === 'implicit';

	const client = new Client(60_000);
	if (process.env.FTP_DEBUG === '1') client.ftp.verbose = true;

	console.log(`[deploy:ftp] Підключення до ${host}:${port} → ${remoteDir} …`);

	try {
		await client.access({
			host,
			port,
			user,
			password,
			secure: implicit ? 'implicit' : secure,
		});
		await client.uploadFromDir(dist, remoteDir);
		console.log('[deploy:ftp] Готово: вміст dist/ завантажено.');
	} catch (e) {
		console.error('[deploy:ftp] Помилка:', e);
		process.exit(1);
	} finally {
		client.close();
	}
}

main();
