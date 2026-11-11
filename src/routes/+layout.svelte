<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import MeshBackground from '#lib/components/MeshBackground.svelte';
	import { initLang } from '#lib/i18n.svelte.ts';
	import { startFaviconNeon } from '#lib/faviconNeon.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => {
		initLang();
		return startFaviconNeon();
	});
</script>

<MeshBackground />

{@render children()}
