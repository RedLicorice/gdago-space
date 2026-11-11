<script lang="ts">
	import T from '../T.svelte';
	import type { Cta } from '#lib/content/types.ts';

	let { ctas }: { ctas: Cta[] } = $props();
</script>

<div class="cta-row">
	{#each ctas as cta, i (cta.href)}
		<a
			class="cta"
			class:primary={i === 0}
			href={cta.href}
			target={cta.external ? '_blank' : undefined}
			rel={cta.external ? 'noopener' : undefined}
		>
			<T v={cta.label} />
		</a>
	{/each}
</div>

<style>
	.cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
	.cta {
		font-family: 'Spline Sans Mono', monospace;
		font-size: 0.85rem;
		text-decoration: none;
		color: var(--text);
		border: 1px solid var(--line-strong);
		padding: 12px 20px;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		transition:
			background 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease;
	}
	.cta:hover {
		border-color: var(--accent-2);
		background: var(--surface-2);
	}
	.cta.primary {
		background: var(--accent);
		color: var(--accent-ink);
		border-color: var(--accent);
		font-weight: 600;
	}
	.cta.primary::after {
		content: '→';
	}
	.cta.primary:hover {
		background: var(--accent-2);
		border-color: var(--accent-2);
	}
</style>
