# María Cáceres — artist site (design)

Date: 2026-10-30

## Intent

A static website for María Cáceres, a singer (likely based in Chile), built around her new
single **"In My Life"**, released 21 Oct 2026 via DistroKid. It's her first release on
streaming services. The site gives fans one place to listen to the song, learn who she is, and
follow or support her. It replaces handing out a bare Linktree/HyperFollow link.

Success: someone who opens the link on their phone can play the song within one tap, read who
she is, and reach her Instagram/YouTube/tips page.

## Goals

- Hero built on the single's cover art, with listen buttons for every platform the single is on.
- An embedded Spotify player so the song plays on the page.
- Bio, socials, a featured YouTube video, a "support me" (tips) link.
- Hosted free on GitHub Pages, deployed automatically on push to `main`.
- Easy for a non-developer to update the links and text later (one data file).

## Non-goals

- No blog, shop, mailing-list backend, analytics, CMS or contact form.
- No English/Spanish language switcher (Spanish only for now).
- No custom domain setup (can be added later through GitHub Pages settings).

## Anti-goals (a failure even if it works)

- Any invented biographical fact about a real person. The bio is limited to the facts below
  until María/the user supplies more.
- Linking any social account not confirmed by the user or her own Linktree.
- Hotlinking the cover from DistroKid's CDN (it can break); the image is stored in the repo.
- Slow or broken on mobile: most visitors will come from Instagram on a phone.

## Confirmed facts and links

Song: "In My Life" (Single), 1 track, ~3 min, genre "Vocal", ℗ 2026, released 2026-10-21.

| What | URL |
| --- | --- |
| Spotify (album) | https://open.spotify.com/album/4E5Mh34jWwqqpw1MWLdMOW |
| Apple Music | https://music.apple.com/us/album/in-my-life-single/6826474948 |
| Apple Music artist | https://music.apple.com/us/artist/mar%C3%ADa-c%C3%A1ceres/1366961633 |
| HyperFollow (all platforms) | https://distrokid.com/hyperfollow/maracceres1/in-my-life |
| Instagram (confirmed by user) | https://www.instagram.com/maria_caceres_222/ |
| YouTube "María Cáceres Canta conmigo" | https://www.youtube.com/@mariacaceres188 |
| Linktree | https://linktr.ee/MariaCacerescanta |
| Tips / Colaboración (Fintoc) | https://fintoc.me/maria-caceres |
| Cover art (download once, commit) | https://distrokid.imgix.net/http%3A%2F%2Fgather.fandalism.com%2F13997965--9F8338FC-9A44-4600-9BAB3C352163CBC7--0--481775--MonochromeMaraCceresAlbumPortrait.jpg?fm=jpg&q=75&w=800&s=e5a4bb691fcc2d3fa7a3b6b41ed7a6c2 |

TikTok (@MariaCacerescanta) is named on her Linktree without a URL: leave it out until confirmed.
The 1 Aug 2026 concert at La Mattina Café is past; not shown.

### Bio (approved by user 2026-10-30)

> María Cáceres es cantante. Después de grabar su primer disco, presenta "In My Life", su
> primer single, disponible desde el 21 de octubre de 2026 en todas las plataformas.

Use verbatim. Builder must not add to it.

## Constraints

- GitHub Pages, project site at `https://acidobinario.github.io/<repo>/` (GitHub account
  `acidobinario`, already authenticated with `gh`). Asset paths must respect the base path.
- Node 22 / npm 10 available locally.
- Creating the public GitHub repo and enabling Pages is outward-facing: the orchestrator asks
  the user before doing it. Workers do not push or create remote repos.
- Spotify embed needs no API key: `https://open.spotify.com/embed/album/4E5Mh34jWwqqpw1MWLdMOW`.
- Files under 500 lines (user rule).

## Approaches

1. **Single plain HTML page, no build.** Fastest and simplest; offered as the recommendation.
2. **Astro static site with a GitHub Actions deploy.** — **Chosen by the user.** Components,
   a content/data file for links and text, room to grow (more singles, shows, a gallery) later.
   Trade-off: a build pipeline to maintain.
3. Two workers building separate sections in parallel: rejected, same page means conflicts and
   an inconsistent look.

## Decided

- Framework: **Astro** (user chose "Astro or Vite"; Astro picked by the orchestrator because
  it outputs plain static HTML and is made for content sites).
- Deploy: official `withastro/action` + `actions/deploy-pages` workflow on push to `main`.
- Language: Spanish (`lang="es"`). Orchestrator's call.
- Look: dark, black-and-white editorial, matching the monochrome cover. Orchestrator's call.
- All links and text live in one data file (e.g. `src/data/site.ts`), so updates don't touch
  components.
- Repo name: **`mariacaceres`** (matches the local folder) → Astro `site:
  'https://acidobinario.github.io'`, `base: '/mariacaceres'`; OG image URL is absolute under
  that path. Approved by user. The user will buy a custom domain later: then `site` becomes
  the domain, `base` becomes `/`, and a `public/CNAME` file is added. Keep every internal URL
  built from `import.meta.env.BASE_URL` so that switch is a two-setting change.
- "Escúchala ahora" buttons: **Spotify**, **Apple Music**, and **"Más plataformas"** →
  HyperFollow. HyperFollow itself lists only Spotify and Apple Music/iTunes today, so no other
  platform buttons. Orchestrator's call, from checking HyperFollow.
- YouTube: a **channel link card only, no iframe** (no specific video identified). The data
  file can take an optional video ID later; if set, render a lazy-loaded embed.
- Page sections, in order: hero (cover, title, "Escúchala ahora" buttons) → Spotify player →
  bio → YouTube channel → socials + tips → footer.
- Open Graph/Twitter meta tags using the cover, so links shared on WhatsApp/Instagram show it.
- Workers: one **Codex** player builds on a feature branch; one **opencode (GLM)** player
  reviews the result (bugs, accessibility, mobile, Lighthouse). The orchestrator merges.

## Left to the builder

- Exact component split, CSS approach (plain CSS or scoped Astro styles; no Tailwind needed),
  fonts (one Google Font at most), button styling/platform icons (inline SVG, no icon library).
- Image optimization via Astro's `<Image>` or a pre-sized committed JPG/WebP.
- A minimal check: `npm run build` passes and the built HTML contains every link in the table.
