<script lang="ts">
	import { onMount } from 'svelte';
	import Spine from '#lib/components/Spine.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import Section from '#lib/components/Section.svelte';
	import Carousel from '#lib/components/Carousel.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import Vision from '#lib/components/Vision.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { copy } from '#lib/content/copy.ts';
	import { builds, playgrounds } from '#lib/content/projects.ts';
	import { startFlicker } from '#lib/flicker.ts';

	onMount(() => startFlicker());
</script>

<svelte:head>
	<title>gdago</title>
	<meta
		name="description"
		content="Giuseppe D'Agostino — curious builder, pragmatic by choice. Systems built from scratch, and playgrounds to click through."
	/>
</svelte:head>

<Spine />

<div class="wrap">
	<Hero />

	<Section id="builds" title={copy.builds.title} desc={copy.builds.desc}>
		<Carousel>
			{#each builds as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</Carousel>
	</Section>

	<Section id="games" title={copy.playgrounds.title} desc={copy.playgrounds.desc}>
		<Carousel>
			{#each playgrounds as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</Carousel>
	</Section>
</div>

<Vision />

<div class="wrap">
	<Footer />
</div>
