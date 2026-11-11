<script lang="ts">
	import T from '../T.svelte';
	import { copy } from '#lib/content/copy.ts';
	import type { Bi, Shot } from '#lib/content/types.ts';

	let { title, shots }: { title: Bi; shots: Shot[] } = $props();
</script>

<section>
	<div class="section-head"><h2><T v={title} /></h2></div>
	<div class="shots">
		{#each shots as shot, i (i)}
			<figure class={shot.shape}>
				{#if shot.src}
					<img src={shot.src} alt="" loading="lazy" />
				{:else}
					<div class="placeholder"><span class="mono"><T v={copy.product.soon} /></span></div>
				{/if}
				<figcaption><T v={shot.caption} /></figcaption>
			</figure>
		{/each}
	</div>
</section>

<style>
	.shots {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: 18px;
	}
	figure {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	figure.wide {
		flex: 2 1 320px;
	}
	figure.tall {
		flex: 1 1 180px;
		max-width: 240px;
	}
	.placeholder,
	img {
		width: 100%;
		border: 1px solid var(--line-strong);
		background:
			repeating-linear-gradient(45deg, transparent 0 10px, var(--line) 10px 11px),
			var(--surface);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.wide .placeholder,
	.wide img {
		aspect-ratio: 16 / 10;
	}
	.tall .placeholder,
	.tall img {
		aspect-ratio: 9 / 19;
		border-radius: 18px;
	}
	.placeholder span {
		font-size: 0.72rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--text-muted);
	}
	figcaption {
		font-family: 'Spline Sans Mono', monospace;
		font-size: 0.74rem;
		color: var(--text-muted);
	}
</style>
