<script lang="ts">
	import T from './T.svelte';
	import { copy } from '#lib/content/copy.ts';
	import { chrome } from '#lib/chrome.svelte.ts';
	import { i18n, toggleLang } from '#lib/i18n.svelte.ts';

	const links = [
		{ href: '/#builds', label: copy.nav.projects },
		{ href: '/#games', label: copy.nav.games },
		{ href: '/#vision', label: copy.nav.vision },
		{ href: '/#hello', label: copy.nav.hi }
	];

	let open = $state(false);
	let burger: HTMLButtonElement;
	let dropdown: HTMLDivElement;

	// mobile nav: burger toggles a dropdown; closes on link click, outside click, or Escape
	function onWindowClick(e: MouseEvent) {
		const target = e.target as Node;
		if (!dropdown.contains(target) && !burger.contains(target)) open = false;
	}
</script>

<svelte:window onclick={onWindowClick} onkeydown={(e) => e.key === 'Escape' && (open = false)} />

<nav class="topbar" class:handoff={chrome.heroGone}>
	<div class="topbar-inner">
		<a class="topbar-logo" class:visible={chrome.heroGone} href="/"><em>g</em>dago</a>
		<div class="topbar-links">
			{#each links as l (l.href)}
				<a href={l.href}><T v={l.label} /></a>
			{/each}
		</div>
		<button
			class="lang-toggle"
			type="button"
			aria-label={copy.langToggleAria[i18n.lang]}
			onclick={toggleLang}
		>
			<T v={copy.langToggle} />
		</button>
		<button
			bind:this={burger}
			class="topbar-burger"
			type="button"
			aria-label={copy.burgerAria[i18n.lang]}
			aria-expanded={open}
			aria-controls="topbar-dropdown"
			onclick={() => (open = !open)}
		>
			<span></span><span></span><span></span>
		</button>
		<div bind:this={dropdown} class="topbar-dropdown" class:open id="topbar-dropdown">
			{#each links as l (l.href)}
				<a href={l.href} onclick={() => (open = false)}><T v={l.label} /></a>
			{/each}
		</div>
	</div>
</nav>

<style>
	.topbar {
		position: sticky;
		top: 0;
		z-index: 50;
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
		background: rgba(10, 14, 22, 0.62);
		backdrop-filter: blur(14px) saturate(160%);
		border-bottom: 1px solid var(--line);
		transition: border-color 0.4s ease;
		padding-inline: clamp(20px, 5vw, 64px);
	}
	.topbar::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 2px;
		background: linear-gradient(
			90deg,
			var(--accent),
			var(--shift-echo),
			var(--tag-green),
			var(--accent-2),
			var(--accent)
		);
		background-size: 400% 100%;
		animation: topbar-shimmer 7s linear infinite;
		opacity: 0.5;
		transition:
			opacity 0.6s ease,
			height 0.4s ease;
	}
	.topbar.handoff::before {
		opacity: 1;
		height: 3px;
	}
	@keyframes topbar-shimmer {
		0% {
			background-position: 0% 0;
		}
		100% {
			background-position: 400% 0;
		}
	}
	.topbar-inner {
		position: relative;
		max-width: 1080px;
		margin-inline: auto;
		padding-block: 14px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}
	.topbar-logo {
		font-family: 'Space Grotesk', sans-serif;
		font-weight: 700;
		font-size: 1.15rem;
		line-height: 1;
		letter-spacing: -0.01em;
		text-decoration: none;
		color: var(--text);
		text-shadow: 0 0 18px color-mix(in srgb, var(--accent) 55%, transparent);
		opacity: 0;
		transform: translateY(-6px);
		pointer-events: none;
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}
	.topbar-logo.visible {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}
	.topbar-logo em {
		font-style: normal;
		color: var(--shift-echo);
		animation: neon-flicker 6.5s linear infinite;
	}
	.topbar-links {
		display: flex;
		gap: 2px;
		font-family: 'Spline Sans Mono', monospace;
		font-size: 0.76rem;
	}
	.topbar-links a {
		position: relative;
		text-decoration: none;
		color: var(--text-muted);
		padding: 6px 10px;
		transition: color 0.2s ease;
	}
	.topbar-links a::after {
		content: '';
		position: absolute;
		left: 10px;
		right: 10px;
		bottom: 2px;
		height: 1px;
		background: var(--accent-2);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.25s ease;
	}
	.topbar-links a:hover {
		color: var(--text);
	}
	.topbar-links a:hover::after {
		transform: scaleX(1);
	}
	@media (max-width: 620px) {
		.topbar-links {
			display: none;
		}
	}

	.lang-toggle {
		flex: none;
		font-family: 'Spline Sans Mono', monospace;
		font-size: 0.72rem;
		letter-spacing: 0.04em;
		color: var(--text-muted);
		background: transparent;
		border: 1px solid var(--line-strong);
		border-radius: 2px;
		padding: 5px 9px;
		cursor: pointer;
		transition:
			color 0.2s ease,
			border-color 0.2s ease;
	}
	.lang-toggle:hover {
		color: var(--text);
		border-color: var(--accent-2);
	}

	.topbar-burger {
		display: none;
		flex: none;
		width: 34px;
		height: 34px;
		border: 1px solid var(--line-strong);
		background: transparent;
		border-radius: 2px;
		cursor: pointer;
		position: relative;
		padding: 0;
	}
	.topbar-burger span {
		position: absolute;
		left: 8px;
		right: 8px;
		height: 1px;
		background: var(--text);
		transition:
			transform 0.2s ease,
			opacity 0.2s ease;
	}
	.topbar-burger span:nth-child(1) {
		top: 12px;
	}
	.topbar-burger span:nth-child(2) {
		top: 17px;
	}
	.topbar-burger span:nth-child(3) {
		top: 22px;
	}
	.topbar-burger[aria-expanded='true'] span:nth-child(1) {
		top: 17px;
		transform: rotate(45deg);
	}
	.topbar-burger[aria-expanded='true'] span:nth-child(2) {
		opacity: 0;
	}
	.topbar-burger[aria-expanded='true'] span:nth-child(3) {
		top: 17px;
		transform: rotate(-45deg);
	}

	.topbar-dropdown {
		display: none;
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 8px;
		flex-direction: column;
		min-width: 180px;
		background: var(--surface);
		border: 1px solid var(--line-strong);
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
		font-family: 'Spline Sans Mono', monospace;
		font-size: 0.85rem;
		overflow: hidden;
		opacity: 0;
		transform: translateY(-6px);
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}
	.topbar-dropdown.open {
		display: flex;
		opacity: 1;
		transform: translateY(0);
	}
	.topbar-dropdown a {
		padding: 12px 16px;
		text-decoration: none;
		color: var(--text-muted);
		border-top: 1px solid var(--line);
	}
	.topbar-dropdown a:first-child {
		border-top: none;
	}
	.topbar-dropdown a:hover {
		color: var(--text);
		background: var(--surface-2);
	}
	@media (max-width: 620px) {
		.topbar-burger {
			display: block;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.topbar::before {
			animation: none;
		}
		.topbar-logo {
			transition: opacity 0.3s ease;
		}
		.topbar-logo em {
			animation: none;
		}
	}
</style>
