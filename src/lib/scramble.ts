// decrypt-style scramble: each char randomizes until its own reveal time comes up,
// left to right, then the real markup snaps back in — a cipher-breaking flourish on
// every language swap. One shared rAF loop drives all running jobs.

const CHARS = 'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*+=<>/\\|[]{}~^';
const ACCENTS = ['sc-a', 'sc-b', 'sc-c']; // cyan, green, coral — the site's accent trio

const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function plain(html: string): string {
	const el = document.createElement('div');
	el.innerHTML = html;
	return el.textContent ?? '';
}

interface Job {
	toText: string;
	len: number;
	revealAt: number[];
	accent: (string | null)[];
	start: number;
	render: (html: string) => void;
	done: () => void;
}

const jobs = new Set<Job>();
let raf = 0;

function tick(now: number) {
	for (const job of [...jobs]) {
		const elapsed = now - job.start;
		let html = '';
		let finished = true;
		for (let i = 0; i < job.len; i++) {
			if (elapsed >= job.revealAt[i]) {
				html += esc(job.toText[i] ?? '');
			} else {
				finished = false;
				const ch = esc(randChar());
				html += job.accent[i] ? `<span class="${job.accent[i]}">${ch}</span>` : ch;
			}
		}
		if (finished) {
			jobs.delete(job);
			job.done();
		} else {
			job.render(html);
		}
	}
	raf = jobs.size ? requestAnimationFrame(tick) : 0;
}

/** Scramble from `fromHtml` to `toHtml`. Returns a cancel function. */
export function scramble(
	fromHtml: string,
	toHtml: string,
	render: (html: string) => void,
	done: () => void
): () => void {
	const toText = plain(toHtml);
	const len = Math.max(plain(fromHtml).length, toText.length, 1);
	const duration = Math.max(380, Math.min(900, 300 + len * 3));
	// sparse, non-adjacent accent positions, picked once so the sparkle doesn't jitter
	const revealAt: number[] = [];
	const accent: (string | null)[] = [];
	let prevAccented = false;
	for (let i = 0; i < len; i++) {
		revealAt.push((i / len) * duration * 0.75 + Math.random() * 120);
		if (!prevAccented && Math.random() < 0.16) {
			accent.push(ACCENTS[Math.floor(Math.random() * ACCENTS.length)]);
			prevAccented = true;
		} else {
			accent.push(null);
			prevAccented = false;
		}
	}
	const job: Job = { toText, len, revealAt, accent, start: performance.now(), render, done };
	jobs.add(job);
	if (!raf) raf = requestAnimationFrame(tick);
	return () => {
		jobs.delete(job);
	};
}
