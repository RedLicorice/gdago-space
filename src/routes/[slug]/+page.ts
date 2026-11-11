import { error } from '@sveltejs/kit';
import { allProjects } from '#lib/content/projects.ts';
import type { EntryGenerator, PageLoad } from './$types';

/** one prerendered page per project that has a product page */
export const entries: EntryGenerator = () =>
	allProjects.filter((p) => p.product).map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const project = allProjects.find((p) => p.slug === params.slug && p.product);
	if (!project) error(404, 'Not found');
	return { project };
};
