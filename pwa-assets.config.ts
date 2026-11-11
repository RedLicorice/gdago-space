import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config';

const background = '#150f2a';

export default defineConfig({
	preset: {
		...minimal2023Preset,
		transparent: { ...minimal2023Preset.transparent, resizeOptions: { background, fit: 'contain' } },
		maskable: { ...minimal2023Preset.maskable, resizeOptions: { background, fit: 'contain' } },
		apple: { ...minimal2023Preset.apple, resizeOptions: { background, fit: 'contain' } }
	},
	images: ['static/favicon.svg']
});
