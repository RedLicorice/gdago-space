<script lang="ts">
	import { onMount } from 'svelte';
	import T from './T.svelte';
	import { copy } from '#lib/content/copy.ts';
	import { startScrollTheme } from '#lib/scrollTheme.ts';

	let section: HTMLElement;

	// as this section rises it grows into a fixed wall, and its colours bleed into the page
	onMount(() => startScrollTheme(section));
</script>

<section id="vision" class="vision" bind:this={section}>
	<div class="vision-inner">
		<div class="section-head">
			<h2><T v={copy.vision.title} /></h2>
			<p><T v={copy.vision.desc} /></p>
		</div>
		<div class="case">
			<p class="field-note"><T v={copy.vision.quote} /></p>
			<p><T v={copy.vision.body} /></p>
		</div>
	</div>
</section>

<style>
	.vision {
		position: relative;
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
		padding-block: 132px 96px;
		color: #f5eeff;
	}
	.vision::before {
		content: '';
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background:
			radial-gradient(900px 500px at 12% 0%, rgba(255, 255, 255, 0.16), transparent 55%),
			radial-gradient(700px 500px at 92% 100%, rgba(255, 214, 90, 0.18), transparent 60%),
			linear-gradient(150deg, rgba(42, 17, 82, 0.82) 0%, rgba(113, 26, 82, 0.8) 55%, rgba(255, 77, 109, 0.78) 100%);
		clip-path: polygon(
			0 calc(var(--wall-top, 100vh) + var(--wall-tilt, 84px)),
			100% var(--wall-top, 100vh),
			100% 100%,
			0 100%
		);
	}
	.vision-inner {
		max-width: 1080px;
		margin-inline: auto;
		padding-inline: clamp(20px, 5vw, 64px);
	}
	.vision .section-head p {
		color: #ddc9f2;
	}
	.vision h2 {
		color: #fff;
	}
	.case {
		border: 1px solid rgba(255, 255, 255, 0.28);
		border-left: 3px solid #7df0da;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(18px) saturate(160%);
		box-shadow: 0 24px 70px rgba(20, 0, 30, 0.35);
		padding: clamp(20px, 4vw, 34px);
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.case .field-note {
		font-family: 'Unbounded', sans-serif;
		font-weight: 600;
		font-size: clamp(1.05rem, 2vw, 1.3rem);
		color: #fff;
		text-wrap: balance;
	}
	.case p {
		margin: 0;
		color: #e7defa;
	}
</style>
