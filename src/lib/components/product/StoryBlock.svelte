<script lang="ts">
	import T from '../T.svelte';
	import type { Bi } from '#lib/content/types.ts';

	let { title, body }: { title: Bi; body: Bi[] } = $props();
</script>

<section>
	<div class="section-head"><h2><T v={title} /></h2></div>
	<div class="story">
		{#each body as p, i (i)}
			<p><T v={p} /></p>
		{/each}
	</div>
</section>

<style>
	.story {
		max-width: 62ch;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	p {
		margin: 0;
		font-size: 1.05rem;
		color: var(--text-muted);
	}
	p:last-child {
		color: var(--text);
	}
</style>
