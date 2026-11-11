# gdago.space

Personal site: SvelteKit (Svelte 5) + `adapter-static`, deployed to GitHub Pages by GitHub Actions.

## Develop

```sh
npm install
npm run dev        # dev server
npm run check      # type + svelte checks
npm run build      # static site into build/
npm run preview    # serve build/ locally — test this before pushing
```

## Structure

- `src/routes/+page.svelte` — the home page, composed from components.
- `src/lib/components/` — one component per page block (`Topbar`, `Hero`, `Section`, `Carousel`, `ProjectCard`, `Vision`, `Footer`, …).
- `src/lib/content/` — all copy and project data, typed and bilingual (`{ en, it }`). Cards and, later, product pages read from here.
- `src/lib/i18n.svelte.ts` — language state: EN by default, IT if the browser asks, saved choice wins.
- `src/lib/{scrollTheme,scramble,flicker,faviconNeon}.ts` — the page's behaviours, kept out of the components.

## Deploy

Push to `main`. `.github/workflows/deploy.yml` runs `check` + `build` and publishes `build/` to GitHub Pages.
Pull requests run the same checks without deploying. The custom domain lives in `static/CNAME`.
