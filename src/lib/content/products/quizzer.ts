import type { Bi, Product } from '../types';

const bi = (en: string, it: string): Bi => ({ en, it });

const open = {
	label: bi('open it', 'aprila'),
	href: 'https://quizzer.gdago.space',
	external: true
};
// the address is only ever assembled on click in the footer, so the CTA points there
const request = { label: bi('request datasets', 'richiedi i dataset'), href: '/#hello' };

export const quizzer: Product = {
	headline: bi('Practice like it’s exam day.', 'Allenati come se fosse il giorno dell’esame.'),
	subtitle: bi(
		'I built it to teach myself. Now it teaches you.',
		'L’ho costruita per imparare da solo. Ora insegna anche a te.'
	),
	ctas: [open, request],
	sections: [
		{
			kind: 'story',
			title: bi('A list of questions isn’t a simulation', 'Un elenco di domande non è una simulazione'),
			body: [
				bi(
					'A spreadsheet of questions has no timer, no score, no review, and no way to tell you where you’re weak. You can read the answers all day and still not know if you’d pass.',
					'Un foglio di domande non ha timer, punteggio, ripasso, e non ti dice dove sei debole. Puoi leggere le risposte tutto il giorno e non sapere comunque se passeresti.'
				)
			]
		},
		{
			kind: 'features',
			title: bi('Three ways to study', 'Tre modi di studiare'),
			items: [
				{
					name: bi('Exam', 'Esame'),
					text: bi(
						'A timed simulation with a duration and passing score you set. Answers stay hidden until the end, and you can flag questions to come back to — like the real thing.',
						'Una simulazione a tempo, con durata e soglia di superamento a tua scelta. Le risposte restano nascoste fino alla fine e puoi segnare le domande da rivedere — come all’esame vero.'
					)
				},
				{
					name: bi('Practice', 'Pratica'),
					text: bi(
						'No clock. Instant feedback on every question, a live score, and your own Markdown notes next to each one.',
						'Niente orologio. Feedback immediato a ogni domanda, un punteggio in tempo reale e le tue note in Markdown accanto a ciascuna.'
					)
				},
				{
					name: bi('Flashcards', 'Flashcard'),
					text: bi(
						'A card that flips in 3D: options and the right answer on the back, your notes on the reverse. Arrow keys and space to move.',
						'Una carta che si gira in 3D: opzioni e risposta giusta sul retro, le tue note sul rovescio. Frecce e spazio per muoversi.'
					)
				}
			]
		},
		{
			kind: 'features',
			title: bi('Yours to keep', 'Resta tua'),
			items: [
				{
					name: bi('Offline, installable', 'Offline, installabile'),
					text: bi(
						'Install it on your phone or desktop. After the first load it works without a connection.',
						'Installala su telefono o desktop. Dopo il primo caricamento funziona senza connessione.'
					)
				},
				{
					name: bi('Progress stays on your device', 'I progressi restano sul tuo dispositivo'),
					text: bi(
						'Stats, notes and history are saved locally, per dataset. One click to back up, one to restore.',
						'Statistiche, note e cronologia sono salvate in locale, per dataset. Un click per il backup, uno per il ripristino.'
					)
				},
				{
					name: bi('Bring your own questions', 'Porta le tue domande'),
					text: bi(
						'Import free datasets in Directrev Markdown format. Private datasets (MuleSoft Developer 1, AWS DVA-C02) are available on request.',
						'Importa dataset gratuiti in formato Markdown Directrev. I dataset privati (MuleSoft Developer 1, AWS DVA-C02) sono disponibili su richiesta.'
					)
				}
			]
		},
		{
			kind: 'story',
			title: bi('Why I made it', 'Perché l’ho fatta'),
			body: [
				bi(
					'I was studying for certifications and the tool I wanted didn’t exist, so I built it. It’s the one app here that isn’t a tool for work: it’s how I teach myself, learn and get better.',
					'Studiavo per delle certificazioni e lo strumento che volevo non esisteva, così l’ho costruito. È l’unica app qui che non è uno strumento di lavoro: è il modo in cui imparo e miglioro.'
				),
				bi(
					'I made it to learn. I kept it because it works.',
					'L’ho fatta per imparare. L’ho tenuta perché funziona.'
				)
			]
		},
		{
			kind: 'gallery',
			title: bi('See it', 'Guardala'),
			shots: [
				{ caption: bi('Exam mode', 'Modalità esame'), shape: 'wide' },
				{ caption: bi('Flashcard', 'Flashcard'), shape: 'wide' },
				{ caption: bi('On your phone', 'Sul telefono'), shape: 'tall' }
			]
		}
	],
	closing: {
		title: bi('Ready when you are.', 'Quando vuoi.'),
		ctas: [open, request]
	}
};
