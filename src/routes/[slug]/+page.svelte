<script lang="ts">
	import { onMount } from 'svelte';
	import ProductPage from '#lib/components/product/ProductPage.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { chrome } from '#lib/chrome.svelte.ts';
	import { applyStaticTheme } from '#lib/scrollTheme.ts';
	import { i18n } from '#lib/i18n.svelte.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const project = $derived(data.project);

	// no hero wordmark here, so the topbar logo is always shown; the page keeps the calm palette
	onMount(() => {
		chrome.heroGone = true;
		applyStaticTheme();
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>{project.name} — gdago</title>
	<meta name="description" content={project.product?.subtitle[i18n.lang]} />
</svelte:head>

<div class="wrap">
	<ProductPage {project} />
	<Footer />
</div>
