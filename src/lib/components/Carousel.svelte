<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { copy } from '#lib/content/copy.ts';
	import { i18n } from '#lib/i18n.svelte.ts';

	let { children }: { children: Snippet } = $props();

	// horizontal scroll-snap carousel — swipe on touch, arrows where there's a real mouse
	let grid: HTMLDivElement;
	let canHover = $state(false);
	let atStart = $state(true);
	let atEnd = $state(false);

	const step = () => (grid.querySelector('.panel')?.getBoundingClientRect().width ?? 299) + 1;
	const update = () => {
		atStart = grid.scrollLeft <= 4;
		atEnd = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 4;
	};

	onMount(() => {
		canHover = window.matchMedia?.('(hover:hover) and (pointer:fine)').matches ?? false;
		update();
	});
</script>

<svelte:window onresize={update} />

<div class="carousel">
	<div class="panel-grid" bind:this={grid} onscroll={update}>
		{@render children()}
	</div>
	{#if canHover}
		<button
			type="button"
			class="carousel-btn prev"
			aria-label={copy.carouselPrevAria[i18n.lang]}
			disabled={atStart}
			onclick={() => grid.scrollBy({ left: -step(), behavior: 'smooth' })}>←</button
		>
		<button
			type="button"
			class="carousel-btn next"
			aria-label={copy.carouselNextAria[i18n.lang]}
			disabled={atEnd}
			onclick={() => grid.scrollBy({ left: step(), behavior: 'smooth' })}>→</button
		>
	{/if}
</div>

<style>
	.carousel {
		position: relative;
	}
	.panel-grid {
		display: flex;
		gap: 18px;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		padding-bottom: 2px;
		/* the carousel scrolls sideways itself, even though the page does not */
		touch-action: pan-x pan-y;
	}
	.panel-grid::-webkit-scrollbar {
		display: none;
	}
	.carousel-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 5;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px solid var(--line-strong);
		background: color-mix(in srgb, var(--surface) 82%, transparent);
		backdrop-filter: blur(6px);
		color: var(--text);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-family: 'Spline Sans Mono', monospace;
		font-size: 1rem;
		line-height: 1;
		transition:
			background 0.2s ease,
			color 0.2s ease,
			opacity 0.2s ease;
	}
	.carousel-btn:hover {
		background: var(--accent-2);
		color: var(--accent-ink);
	}
	.carousel-btn.prev {
		left: -16px;
	}
	.carousel-btn.next {
		right: -16px;
	}
	.carousel-btn:disabled {
		opacity: 0.25;
		cursor: default;
		pointer-events: none;
	}
	@media (max-width: 640px) {
		.carousel-btn {
			display: none;
		}
	}
</style>
