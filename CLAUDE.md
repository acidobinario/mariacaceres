# María Cáceres — artist site

Astro static site for singer María Cáceres, deployed to GitHub Pages
(`https://acidobinario.github.io/mariacaceres/`, custom domain planned). Spanish only.
Design: `docs/superpowers/specs/2026-10-30-maria-caceres-site-design.md` — read it before
changing layout, sections or look.

## Where the data lives

All links and text are in **`src/data/site.ts`**: `releases` (array, newest first — title,
type, year, cover, Spotify album id and its `listen` links), `bio`, `youtube` and `socials`.
Adding or changing a link, release, bio or social means editing that file only; components
read from it (the hero and featured card use `releases[0]`). The cover is committed under
`src/assets/` (never hotlink DistroKid's CDN).

## Where to get new data

Check these sources, in this order, when asked to update links or add a release:

1. **HyperFollow** (DistroKid page per release, lists every store the song is on):
   `https://distrokid.com/hyperfollow/maracceres1/<release-slug>`
   Current: `https://distrokid.com/hyperfollow/maracceres1/in-my-life`
   Cover art URL is in the page's album image (`distrokid.imgix.net/...`): download and commit it.
2. **Linktree** — her own list of socials, shows and tips: `https://linktr.ee/MariaCacerescanta`
3. **Instagram** (confirmed by the site owner): `https://www.instagram.com/maria_caceres_222/`
4. **Spotify album**: `https://open.spotify.com/album/4E5Mh34jWwqqpw1MWLdMOW`
   Embed: `https://open.spotify.com/embed/album/<album-id>`
5. **Apple Music artist** (lists all releases with dates):
   `https://music.apple.com/us/artist/mar%C3%ADa-c%C3%A1ceres/1366961633`
6. **YouTube** "María Cáceres Canta conmigo": `https://www.youtube.com/@mariacaceres188`
7. **Tips / Colaboración** (Fintoc): `https://fintoc.me/maria-caceres`

## Rules

- Never invent facts about María (bio, location, history, quotes). Use only what the sources
  above or the site owner state. The bio in `site.ts` is owner-approved: change it only on
  request.
- Only link accounts that appear on her Linktree or that the owner confirms. Many unrelated
  "María Cáceres" accounts exist (e.g. `@mariacaceres.oficial` is NOT her).
  TikTok `@MariaCacerescanta` is named on Linktree without a URL: add it only once confirmed.
- Don't show past events (shows dated before today).
- Build every internal URL from `import.meta.env.BASE_URL`, so the custom-domain switch stays
  a config change.

## Commands

- `npm install`, `npm run dev`, `npm run build` (must pass before pushing).
- Deploy: push to `main`; `.github/workflows/deploy.yml` builds and publishes to Pages.

## Custom domain switch

In `astro.config.mjs` set `site` to the domain and `base` to `/`, add `public/CNAME`
containing the bare domain, push, then set the domain under the repo's Settings → Pages and
point DNS at GitHub Pages.
