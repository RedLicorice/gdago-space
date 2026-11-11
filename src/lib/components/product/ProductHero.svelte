<script lang="ts">
	import T from '../T.svelte';
	import CtaRow from './CtaRow.svelte';
	import { copy } from '#lib/content/copy.ts';
	import type { Project } from '#lib/content/types.ts';

	let { project }: { project: Project } = $props();
	const product = $derived(project.product!);
</script>

<header class="hero">
	<a class="back" href="/#builds">← <T v={copy.product.back} /></a>
	<div class="tag-row">
		<span class="name">{project.name}</span>
		{#each project.tags as tag (tag)}
			<span class="tag">{tag}</span>
		{/each}
	</div>
	<h1><T v={product.headline} /></h1>
	<p class="subtitle"><T v={product.subtitle} /></p>
	<CtaRow ctas={product.ctas} />
</header>

<style>
	.hero {
		padding-block: clamp(36px, 7vw, 72px) 40px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 22px;
	}
	.back {
		font-family: 'Spline Sans Mono', monospace;
		font-size: 0.78rem;
		color: var(--text-muted);
		text-decoration: none;
	}
	.back:hover {
		color: var(--text);
	}
	.tag-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
	}
	.name {
		font-family: 'Space Grotesk', sans-serif;
		font-weight: 700;
		margin-right: 8px;
	}
	.tag {
		font-family: 'Spline Sans Mono', monospace;
		font-size: 0.66rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--tag-green);
		border: 1px solid var(--line-strong);
		padding: 3px 7px;
	}
	h1 {
		font-size: clamp(2.2rem, 7vw, 4.2rem);
		line-height: 1.08;
		letter-spacing: -0.02em;
		max-width: 16ch;
	}
	.subtitle {
		margin: 0;
		font-size: clamp(1.05rem, 2.4vw, 1.3rem);
		color: var(--text-muted);
		max-width: 38ch;
	}
</style>
