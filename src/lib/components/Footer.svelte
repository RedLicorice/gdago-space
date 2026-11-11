<script lang="ts">
	import T from './T.svelte';
	import ContactCard from './ContactCard.svelte';
	import { copy } from '#lib/content/copy.ts';
</script>

<footer>
	<div class="footer-head" id="hello">
		<h2><T v={copy.footer.title} /></h2>
	</div>
	<div class="contact-row">
		<ContactCard label={copy.footer.play} user="contact" domain="gdago.space" />
		<ContactCard label={copy.footer.business} user="recruiting" domain="gdago.space" />
		<noscript>
			<p class="mono">contact [at] gdago [dot] space<br />recruiting [at] gdago [dot] space</p>
		</noscript>
	</div>
</footer>

<style>
	footer {
		padding-block: clamp(40px, 7vw, 80px) 50px;
	}
	.footer-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		flex-wrap: wrap;
		gap: 20px;
	}
	.footer-head h2 {
		font-size: clamp(1.8rem, 4vw, 2.8rem);
	}
	.contact-row {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		margin-top: 18px;
	}
</style>
