export type Lang = 'en' | 'it';

/** A string in every supported language. May contain trusted inline HTML. */
export type Bi = Record<Lang, string>;

export interface Project {
	/** stable id, also the future product-page route segment */
	slug: string;
	name: string;
	/** public link; absent = running but not public */
	href?: string;
	tags: string[];
	desc: Bi;
	status: Bi;
}
