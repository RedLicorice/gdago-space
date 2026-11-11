<script lang="ts">
	import { untrack } from 'svelte';
	import { i18n } from '#lib/i18n.svelte.ts';
	import { scramble } from '#lib/scramble.ts';
	import type { Bi } from '#lib/content/types.ts';

	/** Translatable inline text. Renders the current language; scrambles on a user-triggered swap. */
	let { v }: { v: Bi } = $props();

	let frame = $state<string | null>(null);
	const text = $derived(v[i18n.lang]);
	let prev: string | null = null;

	$effect(() => {
		const to = text;
		const from = prev;
		prev = to;
		if (from === null || from === to || !untrack(() => i18n.animating)) return;
		const cancel = scramble(
			from,
			to,
			(html) => (frame = html),
			() => (frame = null)
		);
		return () => {
			cancel();
			frame = null;
		};
	});
</script>

<span class:i18n-scrambling={frame !== null}>{@html frame ?? text}</span>
