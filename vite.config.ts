import adapter from '@sveltejs/adapter-static';
import { withPwa } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		withPwa(
			{
				compilerOptions: {
					// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
					runes: ({ filename }) =>
						filename.split(/[/\\]/).includes('node_modules') ? undefined : true
				},
				adapter: adapter({ fallback: '404.html' })
			},
			{
				registerType: 'autoUpdate',
				// absolute, so the worker registers from /sw.js on every route (kit's default base is relative)
				base: '/',
				kit: { trailingSlash: 'always' },
				manifest: {
					name: 'gdago',
					short_name: 'gdago',
					description:
						"Giuseppe D'Agostino — systems built from scratch, and playgrounds to click through.",
					start_url: '/',
					scope: '/',
					display: 'standalone',
					orientation: 'portrait',
					background_color: '#0b0a0c',
					theme_color: '#0b0a0c',
					icons: [
						{ src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
						{ src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
						{ src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
						{
							src: 'maskable-icon-512x512.png',
							sizes: '512x512',
							type: 'image/png',
							purpose: 'maskable'
						}
					]
				},
				generateSW: {
					globPatterns: [
						'client/**/*.{js,css,ico,png,svg,webp,webmanifest}',
						'prerendered/**/*.html'
					],
					// the web fonts live on Google's CDN: keep them for offline use
					runtimeCaching: [
						{
							urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
							handler: 'StaleWhileRevalidate',
							options: { cacheName: 'google-fonts-css' }
						},
						{
							urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
							handler: 'CacheFirst',
							options: {
								cacheName: 'google-fonts-files',
								expiration: {
									maxEntries: 20,
									maxAgeSeconds: 60 * 60 * 24 * 365
								},
								cacheableResponse: { statuses: [0, 200] }
							}
						}
					]
				}
			}
		)
	]
});
