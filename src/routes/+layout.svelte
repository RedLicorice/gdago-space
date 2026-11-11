<script lang="ts">
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import '../app.css';
	import MeshBackground from '#lib/components/MeshBackground.svelte';
	import Topbar from '#lib/components/Topbar.svelte';
	import { initLang } from '#lib/i18n.svelte.ts';
	import { startFaviconNeon } from '#lib/faviconNeon.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => {
		initLang();
		// registers the service worker (production build only); the page reloads itself on update
		import('virtual:pwa-register').then(({ registerSW }) => registerSW({ immediate: true }));
		return startFaviconNeon();
	});

	// cross-fade between pages with the View Transitions API where the browser has it
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="manifest" href="/manifest.webmanifest" />
	<link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
</svelte:head>

<MeshBackground />
<Topbar />

{@render children()}
