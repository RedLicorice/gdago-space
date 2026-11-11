<script lang="ts">
	import T from './T.svelte';
	import { copy } from '#lib/content/copy.ts';
	import type { Bi } from '#lib/content/types.ts';

	// the address never appears whole in the markup or the source: user and domain are
	// separate parts, joined only on click, then swapped for a real mailto: link.
	let { label, user, domain }: { label: Bi; user: string; domain: string } = $props();

	let address = $state<string | null>(null);
</script>

{#if address}
	<a class="contact" href={'mailto:' + address}>
		<span class="contact-label"><T v={label} /></span>
		<span class="contact-val">{address}</span>
	</a>
{:else}
	<button type="button" class="contact" onclick={() => (address = user + '@' + domain)}>
		<span class="contact-label"><T v={label} /></span>
		<span class="contact-val"><T v={copy.footer.reveal} /></span>
	</button>
{/if}

<style>
	.contact {
		display: inline-flex;
		flex-direction: column;
		gap: 4px;
		font-family: 'Spline Sans Mono', monospace;
		text-decoration: none;
		border: 1px solid #3c4a63;
		background: #11151c;
		padding: 11px 18px;
		color: #eef1ea;
	}
	button.contact {
		font-size: inherit;
		text-align: left;
		cursor: pointer;
	}
	.contact-label {
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #93a0b5;
	}
	.contact-val {
		color: #93a0b5;
	}
	a.contact .contact-val {
		color: inherit;
	}
	.contact:hover .contact-val {
		color: inherit;
	}
	.contact:hover {
		background: var(--accent);
		color: var(--accent-ink);
		border-color: var(--accent);
	}
	.contact:hover .contact-label {
		color: var(--accent-ink);
	}
</style>
