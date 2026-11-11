// favicon: a "G" in the wordmark's face and coral, redrawn to the same irregular
// neon-flicker beats the hero's "g" uses. Favicons can't run CSS animation, so this
// swaps the icon's data URL on a timer instead.

// same beats as @keyframes neon-flicker, as [percent, opacity] of a 6.5s loop
const BEATS: [number, number][] = [
	[0, 1], [4, 0.3], [6, 1], [7, 0.12], [9, 1], [9.5, 0.5], [10, 1],
	[31, 1], [32, 0.4], [34, 1],
	[58, 1], [59, 0.18], [60, 0.7], [61, 0.1], [62, 1],
	[85, 1], [86, 0.35], [87, 1], [100, 1]
];
const CYCLE_MS = 6500;
const SIZE = 64;

/** Start the animated favicon. Returns a stop function. */
export function startFaviconNeon(): () => void {
	const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	if (!link || !ctx) return () => {};
	canvas.width = SIZE;
	canvas.height = SIZE;
	const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
	const timers: ReturnType<typeof setTimeout>[] = [];
	let stopped = false;

	function draw(alpha: number) {
		if (!ctx || !link) return;
		ctx.clearRect(0, 0, SIZE, SIZE);
		ctx.fillStyle = '#150f2a';
		const r = 14;
		ctx.beginPath();
		ctx.moveTo(r, 0);
		ctx.arcTo(SIZE, 0, SIZE, SIZE, r);
		ctx.arcTo(SIZE, SIZE, 0, SIZE, r);
		ctx.arcTo(0, SIZE, 0, 0, r);
		ctx.arcTo(0, 0, SIZE, 0, r);
		ctx.closePath();
		ctx.fill();
		ctx.font = "700 44px 'Space Grotesk', sans-serif";
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = `rgba(255,93,122,${alpha})`;
		ctx.fillText('G', SIZE / 2, SIZE / 2 + 3);
		link.type = 'image/png';
		link.href = canvas.toDataURL('image/png');
	}
	function scheduleCycle() {
		if (stopped) return;
		for (const [pct, alpha] of BEATS) timers.push(setTimeout(() => draw(alpha), (CYCLE_MS * pct) / 100));
		timers.push(setTimeout(scheduleCycle, CYCLE_MS));
	}
	function start() {
		if (stopped) return;
		draw(1);
		if (!reduceMotion) scheduleCycle();
	}
	if (document.fonts?.ready) document.fonts.ready.then(start);
	else start();

	return () => {
		stopped = true;
		timers.forEach(clearTimeout);
	};
}
