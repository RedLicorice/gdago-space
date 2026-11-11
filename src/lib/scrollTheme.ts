// as "the vision" rises up the page, its violet/magenta bleeds into every token on the
// page — footer included — in continuous proportion to scroll. Scrolling back up drains
// it out again. The wall itself (.vision's own background) stays fixed; this only
// repaints the shared tokens around it and drives the wall's seam.

type Rgb = [number, number, number];
type Palette = Record<string, Rgb>;

const TOKENS = [
	'--bg', '--surface', '--surface-2', '--text', '--text-muted',
	'--accent', '--accent-ink', '--accent-2', '--line', '--line-strong'
];
// three stops along the scroll, each darker than before: purple at the very top, blue
// once you're into the project content, then the vision's own deep coral/violet.
// bg is desaturated toward neutral charcoal so the saturated card tones pop against it.
const PURPLE: Palette = {
	'--bg': [11, 10, 12], '--surface': [18, 9, 32], '--surface-2': [25, 13, 43],
	'--text': [238, 241, 234], '--text-muted': [165, 152, 195],
	'--accent': [94, 234, 212], '--accent-ink': [6, 32, 28], '--accent-2': [47, 220, 201],
	'--line': [40, 22, 62], '--line-strong': [66, 40, 98]
};
const BLUE: Palette = {
	'--bg': [9, 10, 11], '--surface': [10, 14, 22], '--surface-2': [14, 19, 29],
	'--text': [238, 241, 234], '--text-muted': [147, 160, 181],
	'--accent': [94, 234, 212], '--accent-ink': [6, 32, 28], '--accent-2': [47, 220, 201],
	'--line': [24, 30, 42], '--line-strong': [36, 45, 60]
};
const VISION: Palette = {
	'--bg': [15, 14, 18], '--surface': [22, 11, 40], '--surface-2': [30, 15, 50],
	'--text': [246, 238, 255], '--text-muted': [217, 198, 239],
	'--accent': [255, 93, 122], '--accent-ink': [42, 15, 31], '--accent-2': [67, 230, 201],
	'--line': [42, 24, 62], '--line-strong': [70, 42, 96]
};

// the low-poly mesh canvas has its own dark, desaturated, tone-on-tone palette,
// deliberately NOT sourced from the tokens above (those stay bright so cards pop).
const MESH_TOKENS = ['--mesh-1', '--mesh-2', '--mesh-3', '--mesh-4'];
const MESH_PURPLE: Palette = { '--mesh-1': [6, 3, 11], '--mesh-2': [11, 6, 20], '--mesh-3': [16, 10, 29], '--mesh-4': [22, 15, 38] };
const MESH_BLUE: Palette = { '--mesh-1': [5, 6, 10], '--mesh-2': [9, 11, 18], '--mesh-3': [13, 16, 26], '--mesh-4': [18, 22, 34] };
const MESH_VISION: Palette = { '--mesh-1': [8, 4, 14], '--mesh-2': [14, 8, 24], '--mesh-3': [20, 12, 34], '--mesh-4': [27, 17, 44] };

const MAIN_FADE_PX = 900; // scroll distance over which purple settles to blue

const mixRgb = (a: Rgb, b: Rgb, p: number): Rgb => [
	a[0] + (b[0] - a[0]) * p,
	a[1] + (b[1] - a[1]) * p,
	a[2] + (b[2] - a[2]) * p
];
const css = (c: Rgb) => `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`;

/** Start driving the page tokens and the vision wall from scroll. Returns a stop function. */
export function startScrollTheme(vision: HTMLElement): () => void {
	const root = document.documentElement;
	const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
	let ticking = false;

	function update() {
		const pMain = reduceMotion ? 1 : Math.max(0, Math.min(1, window.scrollY / MAIN_FADE_PX));
		const r = vision.getBoundingClientRect();
		const p = reduceMotion
			? r.top <= window.innerHeight * 0.55 ? 1 : 0
			: Math.max(0, Math.min(1, 1 - r.top / window.innerHeight));
		for (const t of TOKENS) {
			root.style.setProperty(t, css(mixRgb(mixRgb(PURPLE[t], BLUE[t], pMain), VISION[t], p)));
		}
		for (const t of MESH_TOKENS) {
			root.style.setProperty(t, css(mixRgb(mixRgb(MESH_PURPLE[t], MESH_BLUE[t], pMain), MESH_VISION[t], p)));
		}
		// the wall's own diagonal seam, grown from "right at the section" (p=0) up
		// toward the top of the screen (p=1).
		const vh = window.innerHeight;
		const seamTop = vh * (1 - p);
		vision.style.setProperty('--wall-top', seamTop * (1 - p) + 'px');
		vision.style.setProperty('--wall-tilt', Math.min(84, vh * 0.08) + 'px');
		ticking = false;
	}
	function onScroll() {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(update);
	}
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
	update();
	return () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', onScroll);
	};
}

/** Pin the tokens to the calm "blue" stop, for pages without the scroll-driven theme. */
export function applyStaticTheme() {
	const root = document.documentElement;
	for (const t of TOKENS) root.style.setProperty(t, css(BLUE[t]));
	for (const t of MESH_TOKENS) root.style.setProperty(t, css(MESH_BLUE[t]));
}
