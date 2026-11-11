<script lang="ts">
	import StoryBlock from './StoryBlock.svelte';
	import FeatureGrid from './FeatureGrid.svelte';
	import Gallery from './Gallery.svelte';
	import type { ProductSection } from '#lib/content/types.ts';

	/** Renders a product's sections in order; each `kind` maps to one component. */
	let { sections }: { sections: ProductSection[] } = $props();
</script>

{#each sections as s, i (i)}
	{#if s.kind === 'story'}
		<StoryBlock title={s.title} body={s.body} />
	{:else if s.kind === 'features'}
		<FeatureGrid title={s.title} items={s.items} />
	{:else if s.kind === 'gallery'}
		<Gallery title={s.title} shots={s.shots} />
	{/if}
{/each}
