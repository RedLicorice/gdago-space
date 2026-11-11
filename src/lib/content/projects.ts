import type { Bi, Project } from './types';

const bi = (en: string, it: string): Bi => ({ en, it });

const status = {
	runningNotPublic: bi('running, not public', 'attivo, non pubblico'),
	openIt: bi('open it', 'aprila'),
	playIt: bi('play it', 'gioca'),
	tryIt: bi('try it', 'provalo')
};

/** "Built from scratch" */
export const builds: Project[] = [
	{
		slug: 'quizzer',
		name: 'Quizzer',
		href: 'https://quizzer.gdago.space',
		tags: ['PWA', 'offline', 'exam sim', 'react'],
		desc: bi(
			'A study app I built to teach myself. Exam simulations, practice mode and flashcards, installable and fully offline. It imports Directrev-format <span class="mono">.md</span> datasets for free. Private datasets (MuleSoft Developer 1, AWS DVA-C02) are available on request. Made to learn, kept because it works.',
			"Un'app di studio che ho costruito per insegnare a me stesso. Simulazioni d'esame, modalità pratica e flashcard, installabile e completamente offline. Importa gratis dataset <span class=\"mono\">.md</span> in formato Directrev. I dataset privati (MuleSoft Developer 1, AWS DVA-C02) sono disponibili su richiesta. Nata per imparare, tenuta perché funziona."
		),
		status: status.openIt
	},
	{
		slug: 'gogitit',
		name: 'GoGitIt',
		tags: ['go', 'svelte', 'websocket', 'tailscale'],
		desc: bi(
			'The repo lived on a network share and Git over it was slow, so the computation moved to where the data already was. One working copy, many stations, near-local <span class="mono">git status</span> from anywhere.',
			'Il repo viveva su una share di rete e Git lì sopra era lento, così il calcolo si è spostato dove i dati già stavano. Una sola working copy, tante postazioni, <span class="mono">git status</span> quasi locale da qualsiasi punto.'
		),
		status: status.runningNotPublic
	},
	{
		slug: 'loghub',
		name: 'logHUB',
		tags: ['go', 'sse', 'svelte', 'mcp endpoint'],
		desc: bi(
			"Unifies server logs with the diagnostics a client agent collects on users' machines, in one timeline. Ships an MCP endpoint so a coding agent can read both live while it iterates — the thing that makes AI-assisted debugging verifiable instead of vibes.",
			"Unisce i log del server con la diagnostica che un agente client raccoglie sulle macchine degli utenti, in un'unica timeline. Espone un endpoint MCP così un coding agent può leggere entrambi in tempo reale mentre itera — la cosa che rende il debug assistito dall'AI verificabile, non a sensazione."
		),
		status: status.runningNotPublic
	},
	{
		slug: 'nexus-patch',
		name: 'Nexus Patch System',
		tags: ['python', 'fastapi', 'c#/.net'],
		desc: bi(
			'OAuth2 with proactive refresh behind a swappable interface, OpenAPI REST surface, a C# desktop client. In production it ships a 2 GB+ client update in about two and a half minutes.',
			"OAuth2 con refresh proattivo dietro un'interfaccia intercambiabile, superficie REST OpenAPI, un client desktop in C#. In produzione distribuisce un aggiornamento client di oltre 2 GB in circa due minuti e mezzo."
		),
		status: status.runningNotPublic
	}
];

/** "Playgrounds" */
export const playgrounds: Project[] = [
	{
		slug: 'il-porciotto',
		name: 'Il Porciotto',
		href: 'https://ilporciotto.gdago.space',
		tags: ['multiplayer', 'web', 'Aspromonte'],
		desc: bi(
			"A cooperative mushroom hunt in Calabria's Aspromonte forest. Learn your species from Luigi, cook for Memmo, dodge the wild boar — and the forest ranger. Three services sharing one set of rooms and accounts, live.",
			"Una caccia ai funghi cooperativa nei boschi dell'Aspromonte, in Calabria. Imparare le specie da Luigi, cucinare per Memmo, schivare il cinghiale — e la guardia forestale. Tre servizi che condividono le stesse stanze e gli stessi account, live."
		),
		status: status.playIt
	},
	{
		slug: 'crown-rush',
		name: 'Crown Rush',
		href: 'https://crownrush.gdago.space',
		tags: ['3D RTS', 'browser', 'bots 1–7'],
		desc: bi(
			"Build Fast, Kill Faster. An Age-of-Empires-shaped skirmish that runs entirely in the browser — Three.js for the battlefield, bots for when nobody's around to raid.",
			"Build Fast, Kill Faster. Uno skirmish in stile Age of Empires che corre interamente nel browser — Three.js per il campo di battaglia, bot per quando non c'è nessuno da razziare."
		),
		status: status.playIt
	},
	{
		slug: 'taperun',
		name: 'TAPE//RUN',
		href: 'https://taperun.gdago.space',
		tags: ['paper trading', 'learn by doing', 'agent-ready'],
		desc: bi(
			"Paper trading that behaves like the real thing. I built it to learn trading by doing: operations modelled on live markets, no real money at risk. As a pure game it's weak, and that's the point. It's a learning tool, which is also why AI agents can plug in and coach a round.",
			"Paper trading che si comporta come quello vero. L'ho costruito per imparare il trading facendo: operazioni modellate sui mercati reali, nessun rischio di denaro vero. Come gioco puro è debole, ed è proprio questo il punto. È uno strumento per imparare, ed è anche per questo che gli agenti AI possono collegarsi e fare da coach in un round."
		),
		status: status.tryIt
	}
];
