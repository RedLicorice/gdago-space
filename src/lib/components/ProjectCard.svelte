<script lang="ts">
	import T from './T.svelte';
	import { flickerable } from '#lib/flicker.ts';
	import type { Project } from '#lib/content/types.ts';

	let { project }: { project: Project } = $props();
</script>

{#snippet body()}
	<span class="corner"></span>
	<h3>{project.name}</h3>
	<div class="tag-row">
		{#each project.tags as tag (tag)}
			<span class="tag">{tag}</span>
		{/each}
	</div>
	<p><T v={project.desc} /></p>
	<span class="play"><T v={project.status} /></span>
{/snippet}

{#if project.href}
	<a class="panel" href={project.href} target="_blank" rel="noopener" use:flickerable>
		{@render body()}
	</a>
{:else}
	<div class="panel private" use:flickerable>
		{@render body()}
	</div>
{/if}

<style>
	.panel {
		text-decoration: none;
		background: var(--surface);
		border: 1px solid var(--line);
		padding: 26px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		position: relative;
		overflow: hidden;
		flex: 0 0 380px;
		scroll-snap-align: start;
		transition:
			background 0.2s ease,
			box-shadow 0.3s ease,
			transform 0.3s ease;
	}
	.panel::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(115deg, transparent 42%, rgba(255, 255, 255, 0.14) 50%, transparent 58%);
		transform: translateX(-130%);
		transition: transform 0.7s ease;
		pointer-events: none;
	}
	.panel:hover {
		background: var(--surface-2);
		box-shadow:
			0 0 0 1px var(--accent-2) inset,
			0 16px 44px -16px var(--accent);
		transform: translateY(-2px);
	}
	.panel:hover::after {
		transform: translateX(130%);
	}
	@keyframes panel-flicker {
		0%,
		100% {
			box-shadow: none;
		}
		6% {
			box-shadow:
				0 0 0 1px var(--accent-2) inset,
				0 14px 34px -18px var(--accent);
		}
		9% {
			box-shadow: none;
		}
		13% {
			box-shadow:
				0 0 0 1px var(--accent-2) inset,
				0 14px 34px -18px var(--accent);
		}
		17% {
			box-shadow: none;
		}
		42% {
			box-shadow:
				0 0 0 1px var(--accent-2) inset,
				0 14px 34px -18px var(--accent);
		}
		58% {
			box-shadow: none;
		}
	}
	/* the class is added at runtime by the random-flicker loop */
	.panel:global(.flicker) {
		animation: panel-flicker 1.7s ease-in-out 1;
	}
	.corner {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 9px;
		height: 9px;
		border-top: 2px solid var(--line-strong);
		border-right: 2px solid var(--line-strong);
	}
	h3 {
		font-size: 1.4rem;
	}
	.tag-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
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
	p {
		margin: 0;
		color: var(--text-muted);
		font-size: 0.95rem;
	}
	.play {
		margin-top: auto;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: 'Spline Sans Mono', monospace;
		font-size: 0.82rem;
		text-decoration: none;
		color: var(--text);
		border-top: 1px solid var(--line);
		padding-top: 12px;
		width: fit-content;
	}
	.play::after {
		content: '→';
		transition: transform 0.15s ease;
	}
	.panel:hover .play::after {
		transform: translateX(4px);
	}
	.private .play {
		color: var(--text-muted);
		cursor: default;
	}
	.private .play::after {
		content: '●';
		font-size: 0.6rem;
	}
	@media (max-width: 900px) {
		.panel {
			flex-basis: 320px;
		}
	}
	@media (max-width: 560px) {
		.panel {
			flex-basis: 84%;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.panel {
			transition: background 0.2s ease;
		}
		.panel::after {
			display: none;
		}
		.panel:hover {
			transform: none;
		}
		.panel:global(.flicker) {
			animation: none;
		}
	}
</style>
