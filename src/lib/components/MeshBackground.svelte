<script lang="ts">
	import { onMount } from 'svelte';

	// low-poly mesh behind the whole page — triangulated plane, fixed to the viewport,
	// each facet a flat tone-on-tone fill read from the --mesh-* tokens, so it follows
	// the theme and the scroll shift as quiet texture.
	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		let points: [number, number][] = [];
		let tris: { pts: [number, number, number]; tone: number }[] = [];
		let raf = 0;
		let lastW = 0;
		let lastH = 0;

		// reads both "#rrggbb" and the "rgb(r,g,b)" strings the scroll theme writes
		function parseColor(str: string): [number, number, number] {
			str = (str || '').trim();
			if (!str) return [0, 0, 0];
			if (str[0] === '#') {
				let hex = str.slice(1);
				if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
				const n = parseInt(hex, 16) || 0;
				return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
			}
			const m = str.match(/rgba?\(([^)]+)\)/);
			if (m) {
				const p = m[1].split(',').map((s) => parseFloat(s) || 0);
				return [p[0] || 0, p[1] || 0, p[2] || 0];
			}
			return [0, 0, 0];
		}

		function build(w: number, h: number) {
			const cols = Math.max(4, Math.round(w / 90));
			const rows = Math.max(3, Math.round(h / 90));
			const cw = w / cols;
			const ch = h / rows;
			points = [];
			for (let y = 0; y <= rows; y++) {
				for (let x = 0; x <= cols; x++) {
					const jx = x > 0 && x < cols ? (Math.random() - 0.5) * cw * 0.7 : 0;
					const jy = y > 0 && y < rows ? (Math.random() - 0.5) * ch * 0.7 : 0;
					points.push([x * cw + jx, y * ch + jy]);
				}
			}
			const idx = (x: number, y: number) => y * (cols + 1) + x;
			const raw: [number, number, number][] = [];
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const a = idx(x, y), b = idx(x + 1, y), c = idx(x, y + 1), d = idx(x + 1, y + 1);
					if (Math.random() < 0.5) raw.push([a, b, c], [b, d, c]);
					else raw.push([a, b, d], [a, d, c]);
				}
			}
			tris = raw.map((pts) => ({ pts, tone: Math.floor(Math.random() * 4) }));
		}

		function resize() {
			const w = window.innerWidth;
			const h = window.innerHeight;
			if (!w || !h) return;
			// mobile browsers fire resize when the address bar hides/shows — a height-only
			// blip. Rebuilding the jittered mesh then makes the background "jump" while
			// scrolling, so only rebuild on a real change.
			const widthChanged = Math.abs(w - lastW) > 2;
			const heightChanged = Math.abs(h - lastH) > 150;
			if (lastW && !widthChanged && !heightChanged) return;
			lastW = w;
			lastH = h;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = w + 'px';
			canvas.style.height = h + 'px';
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			build(w, h);
		}

		function draw() {
			if (!tris.length) return;
			const c = ctx!;
			const w = canvas.width / dpr;
			const h = canvas.height / dpr;
			c.clearRect(0, 0, w, h);
			const cs = getComputedStyle(document.documentElement);
			const tones = [1, 2, 3, 4].map((i) => parseColor(cs.getPropertyValue('--mesh-' + i)));
			for (const tri of tris) {
				const col = tones[tri.tone];
				const [p0, p1, p2] = tri.pts.map((i) => points[i]);
				c.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`;
				c.beginPath();
				c.moveTo(p0[0], p0[1]);
				c.lineTo(p1[0], p1[1]);
				c.lineTo(p2[0], p2[1]);
				c.closePath();
				c.fill();
			}
		}

		const loop = () => {
			draw();
			raf = requestAnimationFrame(loop);
		};

		resize();
		if (reduceMotion) draw();
		else raf = requestAnimationFrame(loop);

		// one coat of paint before fading in — avoids a flash of an empty layer
		requestAnimationFrame(() => requestAnimationFrame(() => (canvas.style.opacity = '.38')));

		let resizeTimer: ReturnType<typeof setTimeout>;
		const onResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				if (raf) cancelAnimationFrame(raf);
				resize();
				if (reduceMotion) draw();
				else raf = requestAnimationFrame(loop);
			}, 200);
		};
		window.addEventListener('resize', onResize);

		// slight, deliberate parallax on mobile — the mesh drifts at a fraction of scroll
		const isMobile = window.matchMedia?.('(max-width: 640px)').matches ?? false;
		let parallaxTicking = false;
		const onScroll = () => {
			if (parallaxTicking) return;
			parallaxTicking = true;
			requestAnimationFrame(() => {
				canvas.style.transform = `translateY(${Math.min(window.scrollY * 0.06, 50)}px)`;
				parallaxTicking = false;
			});
		};
		if (isMobile && !reduceMotion) {
			window.addEventListener('scroll', onScroll, { passive: true });
			onScroll();
		}

		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(resizeTimer);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
	canvas {
		position: fixed;
		inset: 0;
		z-index: -2;
		pointer-events: none;
		opacity: 0;
		transition: opacity 1.4s ease;
	}
</style>
