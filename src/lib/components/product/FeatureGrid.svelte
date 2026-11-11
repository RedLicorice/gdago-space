<script lang="ts">
	import T from '../T.svelte';
	import type { Bi, Feature } from '#lib/content/types.ts';

	let { title, items }: { title: Bi; items: Feature[] } = $props();
</script>

<section>
	<div class="section-head"><h2><T v={title} /></h2></div>
	<div class="grid">
		{#each items as item, i (i)}
			<article class="card">
				<h3><T v={item.name} /></h3>
				<p><T v={item.text} /></p>
			</article>
		{/each}
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 18px;
	}
	.card {
		background: var(--surface);
		border: 1px solid var(--line);
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	h3 {
		font-size: 1.2rem;
	}
	p {
		margin: 0;
		color: var(--text-muted);
		font-size: 0.95rem;
	}
</style>
