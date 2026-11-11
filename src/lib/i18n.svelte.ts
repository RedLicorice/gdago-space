import type { Lang } from '#lib/content/types.ts';

const LANG_KEY = 'gdago-lang';

/** Shared language state. `animating` is true only while a user-triggered swap is playing. */
export const i18n = $state({ lang: 'en' as Lang, animating: false });

function reducedMotion() {
	return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/** Default EN; a saved choice wins; otherwise follow the browser's preference. Client only. */
export function initLang() {
	let lang: Lang = 'en';
	try {
		const saved = localStorage.getItem(LANG_KEY);
		if (saved === 'en' || saved === 'it') lang = saved;
		else if ((navigator.language || '').toLowerCase().startsWith('it')) lang = 'it';
	} catch {
		/* storage blocked: keep default */
	}
	i18n.lang = lang;
	document.documentElement.lang = lang;
}

export function toggleLang() {
	const next: Lang = i18n.lang === 'it' ? 'en' : 'it';
	try {
		localStorage.setItem(LANG_KEY, next);
	} catch {
		/* ignore */
	}
	i18n.animating = !reducedMotion();
	i18n.lang = next;
	document.documentElement.lang = next;
	setTimeout(() => (i18n.animating = false), 1500);
}
