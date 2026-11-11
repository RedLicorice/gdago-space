<script lang="ts">
	import T from '../T.svelte';
	import ProductHero from './ProductHero.svelte';
	import ProductSections from './ProductSections.svelte';
	import CtaRow from './CtaRow.svelte';
	import type { Project } from '#lib/content/types.ts';

	let { project }: { project: Project } = $props();
	const product = $derived(project.product!);
</script>

<ProductHero {project} />
<ProductSections sections={product.sections} />
<section class="closing">
	<div class="section-head"><h2><T v={product.closing.title} /></h2></div>
	<CtaRow ctas={product.closing.ctas} />
</section>
