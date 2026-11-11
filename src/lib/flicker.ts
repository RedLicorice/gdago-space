// every so often, at no fixed rhythm, one random card's hover border flashes on its
// own — a sign of life rather than a loop to notice.

const cards = new Set<HTMLElement>();

/** Svelte action: make a card eligible for the random flicker. */
export function flickerable(node: HTMLElement) {
	cards.add(node);
	return { destroy: () => cards.delete(node) };
}

/** Start the random flicker loop. Returns a stop function. */
export function startFlicker(): () => void {
	if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return () => {};
	let timer: ReturnType<typeof setTimeout>;
	function schedule() {
		timer = setTimeout(
			() => {
				const list = [...cards];
				const card = list[Math.floor(Math.random() * list.length)];
				if (card && !card.matches(':hover')) {
					card.classList.add('flicker');
					card.addEventListener('animationend', () => card.classList.remove('flicker'), { once: true });
				}
				schedule();
			},
			7000 + Math.random() * 21000 // 7–28s, deliberately irregular
		);
	}
	schedule();
	return () => clearTimeout(timer);
}
