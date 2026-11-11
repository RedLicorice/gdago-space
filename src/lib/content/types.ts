export type Lang = 'en' | 'it';

/** A string in every supported language. May contain trusted inline HTML. */
export type Bi = Record<Lang, string>;

export interface Cta {
	label: Bi;
	href: string;
	/** opens in a new tab */
	external?: boolean;
}

export interface Feature {
	name: Bi;
	text: Bi;
}

/** A screenshot slot. Without `src` the gallery draws a placeholder frame. */
export interface Shot {
	caption: Bi;
	shape: 'wide' | 'tall';
	src?: string;
}

/** The blocks a product page is composed of, rendered in order. */
export type ProductSection =
	| { kind: 'story'; title: Bi; body: Bi[] }
	| { kind: 'features'; title: Bi; items: Feature[] }
	| { kind: 'gallery'; title: Bi; shots: Shot[] };

export interface Product {
	headline: Bi;
	subtitle: Bi;
	/** first is the primary button */
	ctas: Cta[];
	sections: ProductSection[];
	closing: { title: Bi; ctas: Cta[] };
}

export interface Project {
	/** stable id, also the future product-page route segment */
	slug: string;
	name: string;
	/** public link; absent = running but not public */
	href?: string;
	tags: string[];
	desc: Bi;
	status: Bi;
	/** when present the card links to the product page /<slug>/ instead of `href` */
	product?: Product;
}
