<script lang="ts">
	import { onMount } from 'svelte';
	import T from './T.svelte';
	import { copy } from '#lib/content/copy.ts';
	import { chrome } from '#lib/chrome.svelte.ts';

	let titleblock: HTMLElement;

	// the topbar logo only shows once this big wordmark has scrolled out from under it
	// (avoids two logos on screen); the topbar's glowing line picks up where the
	// hero's glowing border leaves off.
	onMount(() => {
		let ticking = false;
		const check = () => {
			chrome.heroGone = titleblock.getBoundingClientRect().bottom < 60;
			ticking = false;
		};
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(check);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		check();
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<header class="hero">
	<div class="titleblock" bind:this={titleblock}>
		<div class="wordmark"><em>g</em>dago</div>
		<div class="meta-row">
			<span><b>Giuseppe D'Agostino</b></span>
			<span><T v={copy.hero.location} /></span>
			<span><T v={copy.hero.year} /></span>
		</div>
	</div>
	<p class="lede"><T v={copy.hero.lede} /></p>
</header>

<style>
	.hero {
		padding-block: clamp(48px, 9vw, 96px) 40px;
		position: relative;
	}
	.titleblock {
		position: relative;
		border: 1px solid var(--line-strong);
		padding: 22px clamp(18px, 4vw, 34px);
		display: flex;
		flex-wrap: wrap;
		gap: 18px 40px;
		align-items: flex-end;
		justify-content: space-between;
		background: linear-gradient(180deg, var(--surface), var(--bg));
		animation:
			rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both,
			glow-breathe 4s ease-in-out 0.7s infinite;
	}
	.titleblock::before {
		content: '';
		position: absolute;
		inset: -28px;
		z-index: -1;
		background:
			radial-gradient(60% 60% at 25% 20%, var(--accent), transparent 70%),
			radial-gradient(50% 50% at 85% 90%, var(--accent-2), transparent 70%),
			radial-gradient(30% 30% at 70% 60%, var(--shift-echo), transparent 75%),
			radial-gradient(28% 28% at 40% 85%, var(--tag-green), transparent 75%);
		opacity: 0.35;
		filter: blur(44px);
		animation: glow-pulse 7s ease-in-out infinite;
		pointer-events: none;
	}
	@keyframes glow-breathe {
		0%,
		100% {
			box-shadow:
				0 0 0 1px var(--accent),
				0 0 34px -6px var(--accent);
		}
		25% {
			box-shadow:
				0 0 0 1px var(--accent-2),
				0 0 34px -6px var(--accent-2);
		}
		50% {
			box-shadow:
				0 0 0 1px var(--shift-echo),
				0 0 32px -7px var(--shift-echo);
		}
		75% {
			box-shadow:
				0 0 0 1px var(--tag-green),
				0 0 32px -7px var(--tag-green);
		}
	}
	.wordmark {
		font-family: 'Space Grotesk', sans-serif;
		font-size: clamp(2.6rem, 8vw, 4.8rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.15;
		padding-bottom: 0.08em;
		background: linear-gradient(
			100deg,
			var(--text) 20%,
			var(--accent-2) 35%,
			var(--accent) 42%,
			var(--tag-green) 49%,
			var(--text) 68%
		);
		background-size: 280% 100%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation: wordmark-shine 6s linear infinite;
	}
	@keyframes wordmark-shine {
		0% {
			background-position: 0% 0;
		}
		100% {
			background-position: 280% 0;
		}
	}
	.wordmark em {
		font-style: normal;
		color: var(--shift-echo);
		-webkit-text-fill-color: var(--shift-echo);
		animation: neon-flicker 6.5s linear infinite;
	}
	.meta-row {
		display: flex;
		flex-direction: column;
		gap: 6px;
		font-family: 'Spline Sans Mono', monospace;
		font-size: 0.78rem;
		color: var(--text-muted);
		text-align: right;
	}
	.meta-row b {
		color: var(--text);
		font-weight: 600;
	}
	@media (max-width: 560px) {
		.titleblock {
			padding-top: 68px;
			align-items: flex-start;
		}
		.meta-row {
			position: absolute;
			top: 16px;
			right: 16px;
			gap: 3px;
			font-size: 0.62rem;
		}
		.wordmark {
			font-size: 2.3rem;
			max-width: 72%;
		}
	}
	.lede {
		margin-top: 30px;
		max-width: 62ch;
		font-size: clamp(1.05rem, 1.6vw, 1.25rem);
		color: var(--text-muted);
		text-shadow: 0 2px 14px var(--bg);
		animation: rise 0.7s 0.1s cubic-bezier(0.2, 0.7, 0.2, 1) both;
	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.titleblock {
			animation: rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
		}
		.titleblock::before {
			animation: none;
			opacity: 0.32;
		}
		.wordmark {
			animation: none;
			background-position: 0 0;
		}
		.wordmark em {
			animation: none;
		}
		.lede {
			animation: none;
		}
	}
</style>
