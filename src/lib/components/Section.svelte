<script lang="ts">
	import type { Snippet } from 'svelte';
	import T from './T.svelte';
	import type { Bi } from '#lib/content/types.ts';

	let { id, title, desc, children }: { id: string; title: Bi; desc: Bi; children: Snippet } =
		$props();
</script>

<section {id}>
	<div class="section-head glow">
		<h2><T v={title} /></h2>
		<p><T v={desc} /></p>
	</div>
	{@render children()}
</section>

<style>
	.glow {
		position: relative;
	}
	.glow::before {
		content: '';
		position: absolute;
		inset: -24px -24px -24px -12px;
		z-index: -1;
		background:
			radial-gradient(50% 70% at 15% 30%, var(--accent), transparent 70%),
			radial-gradient(45% 60% at 85% 70%, var(--accent-2), transparent 70%);
		opacity: 0.2;
		filter: blur(40px);
		animation: glow-pulse 8s ease-in-out infinite;
		pointer-events: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.glow::before {
			animation: none;
			opacity: 0.16;
		}
	}
</style>
