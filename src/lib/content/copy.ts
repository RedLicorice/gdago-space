import type { Bi } from './types';

const bi = (en: string, it: string): Bi => ({ en, it });

/** Page copy outside the project cards. */
export const copy = {
	nav: {
		projects: bi('projects', 'progetti'),
		games: bi('play', 'gioca'),
		vision: bi('the vision', 'la visione'),
		hi: bi('say hi', 'scrivimi')
	},
	burgerAria: bi('Open menu', 'Apri il menu'),
	carouselPrevAria: bi('Scroll left', 'Scorri a sinistra'),
	carouselNextAria: bi('Scroll right', 'Scorri a destra'),
	/** shows the language you would switch TO */
	langToggle: bi('IT', 'EN'),
	langToggleAria: bi("Passa all'italiano", 'Switch to English'),
	hero: {
		location: bi('Rome, IT — full remote', 'Roma, IT — full remote'),
		year: bi('drawn 2026', 'disegnato nel 2026'),
		lede: bi(
			'Curious builder, pragmatic by choice. Every project here is a small experiment — staying close to the part I actually love: building things, and understanding how they work.',
			'Costruttore curioso, pragmatico per scelta. Ogni progetto qui è un piccolo esperimento — per restare vicino alla parte che amo davvero: costruire cose, e capire come funzionano.'
		)
	},
	builds: {
		title: bi('Built from scratch', 'Costruito da zero'),
		desc: bi(
			"Four systems built because the off-the-shelf version was too slow, too rigid, or didn't exist. Not demos — still running.",
			"Quattro sistemi nati perché la versione pronta all'uso era troppo lenta, troppo rigida, o non esisteva. Non demo — sono ancora in produzione."
		)
	},
	playgrounds: {
		title: bi('Playgrounds', 'Campi da gioco'),
		desc: bi(
			"Click through — they're live, not screenshots.",
			'Clicca ed entra — sono live, non screenshot.'
		)
	},
	vision: {
		title: bi('The Vision', 'La visione'),
		desc: bi(
			'Tech should adapt to people. Not the other way round.',
			'La tecnologia dovrebbe adattarsi alle persone. Non il contrario.'
		),
		quote: bi(
			'"Nobody wakes up wanting to learn a new interface."',
			'"Nessuno si sveglia la mattina con la voglia di imparare una nuova interfaccia."'
		),
		body: bi(
			"Model the system on the human who lives with it: their habits, their rhythm, what they actually care about. Not a cold, generic template. Apps, IoT devices, smart homes, business processes: the rule is the same everywhere, they're all part of the interface. Be quiet when they're busy, be there when they're not, and never ask them to read the manual first. Good technology augments a life in natural, organic ways. Think houseplant, not dashboard: it grows toward you.",
			"Modella il sistema sulla persona che ci vive insieme: le sue abitudini, il suo ritmo, ciò che le sta davvero a cuore. Non su un modello freddo e generico. App, dispositivi IoT, case smart, processi aziendali: la regola è la stessa ovunque, fanno tutti parte dell'interfaccia. Stai in silenzio quando sono occupati, fatti trovare quando non lo sono, e non chiedere mai di leggere prima il manuale. La buona tecnologia aumenta la vita in modo naturale e organico. Pensa a una pianta d'appartamento, non a una dashboard: cresce verso di te."
		)
	},
	footer: {
		title: bi('Say hello', 'Scrivimi'),
		play: bi('wanna play?', 'vuoi giocare?'),
		business: bi('mean business?', 'parliamo di lavoro?'),
		reveal: bi('click to reveal', 'clicca per vedere')
	}
};
