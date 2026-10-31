# María Cáceres — sitio oficial

Sitio estático (Astro) de la cantante María Cáceres, construido en torno a su single
**"In My Life"** (21 oct 2026). Publicado en GitHub Pages.

## Endpoints

| URL | Qué es | Rama |
| --- | --- | --- |
| https://acidobinario.github.io/mariacaceres/ | Sitio actual (versión inicial) | `main` |
| https://acidobinario.github.io/mariacaceres/poster/ | Diseño A — "Poster": portada a pantalla completa, título gigante | `design/poster` |
| https://acidobinario.github.io/mariacaceres/editorial/ | Diseño B — "Editorial": revista, portada y texto lado a lado | `design/editorial` |
| https://acidobinario.github.io/mariacaceres/artist/ | Diseño C — "Artist site": menú, "Nuevo single", discografía, secciones | `design/artist` |

Each `design/<name>` branch is published automatically at `/mariacaceres/<name>/`. Push a new
`design/<name>` branch to add another preview; delete the branch to remove it on the next deploy.

## Content and links

All text and links live in `src/data/site.ts` (on every branch). Where to get new links and the
rules for adding them (no invented facts, only confirmed accounts): see [`CLAUDE.md`](CLAUDE.md).

Current links: [Spotify](https://open.spotify.com/album/4E5Mh34jWwqqpw1MWLdMOW) ·
[Apple Music](https://music.apple.com/us/album/in-my-life-single/6826474948) ·
[HyperFollow](https://distrokid.com/hyperfollow/maracceres1/in-my-life) ·
[Instagram](https://www.instagram.com/maria_caceres_222/) ·
[YouTube](https://www.youtube.com/@mariacaceres188) ·
[Linktree](https://linktr.ee/MariaCacerescanta) ·
[Apóyame](https://fintoc.me/maria-caceres)

## Development

```bash
npm ci
npm run dev       # http://localhost:4321/mariacaceres/
npm test          # build + checks in tests/build.test.mjs (links, bio, base path, og:image)
```

Node 22. Astro is pinned to 7.4.1 because newer versions need Node ≥ 22.23.4.

## Deploy

`.github/workflows/deploy.yml` runs on every push to `main` or `design/**`: it tests and
builds `main` at the root, builds every `design/*` branch under its sub-path, and publishes it
all to GitHub Pages. The Pages environment allows deploys from `main` and `design/*`.

## Docs

- Design spec: `docs/superpowers/specs/2026-10-30-maria-caceres-site-design.md`
- Implementation plan: `docs/superpowers/plans/2026-10-30-maria-caceres-site.md`
- Agent guide (data sources, rules, custom domain switch): `CLAUDE.md`

## Custom domain

Planned. When it's ready: set `site` to the domain and `base` to `/` in `astro.config.mjs`,
add `public/CNAME`, update the `--base` in the preview step of the workflow (`/<name>`), and set
the domain in the repo's Settings → Pages. Full steps in `CLAUDE.md`.
