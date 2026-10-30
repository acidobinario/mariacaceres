# María Cáceres Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A one-page Spanish Astro site for María Cáceres around her single "In My Life", deployed to GitHub Pages.

**Architecture:** Astro static output. All links and copy in one data module (`src/data/site.ts`); `src/pages/index.astro` composes small section components that read from it. A `node:test` suite checks the built `dist/index.html` against the spec's exact URLs. GitHub Actions builds and deploys on push to `main`.

**Tech Stack:** Astro (latest, minimal template), TypeScript, plain scoped CSS, Node 22 `node:test`, `actions/upload-pages-artifact` + `actions/deploy-pages`.

**Spec:** `docs/superpowers/specs/2026-10-30-maria-caceres-site-design.md` (read it, and `CLAUDE.md`).

## Global Constraints

- `site: 'https://acidobinario.github.io'`, `base: '/mariacaceres'`; every internal URL built from `import.meta.env.BASE_URL`.
- `<html lang="es">`; all visible copy in Spanish.
- Bio, verbatim: `María Cáceres es cantante. Después de grabar su primer disco, presenta "In My Life", su primer single, disponible desde el 21 de octubre de 2026 en todas las plataformas.`
- Only links listed in the spec's "Confirmed facts and links" table. No TikTok. No past shows.
- Cover committed to `src/assets/cover.jpg`; never hotlinked.
- No Tailwind, no icon library, no UI framework; at most one Google Font. Files under 500 lines.
- Dark black-and-white look matching the monochrome cover.
- Workers do not push, create remote repos or enable Pages.

## Review Focus

1. Phone width (360px): no horizontal scroll, buttons tap-sized (≥44px), cover not cropped awkwardly.
2. Base path: built HTML must not contain root-relative asset URLs missing `/mariacaceres/` (cover, favicon, CSS).
3. Shared-link preview: `og:image` must be an absolute `https://acidobinario.github.io/mariacaceres/...` URL.
4. External links open in a new tab with `rel="noopener"` and have accessible names (icon-only buttons need text or `aria-label`).
5. Spotify iframe has a `title`, `loading="lazy"`, and the page still reads fine if the iframe is blocked.

---

### Task 1: Scaffold, data module and build check

**Files:**
- Create: Astro minimal project at repo root (`package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`), `.gitignore` (node_modules, dist, .astro)
- Create: `src/data/site.ts`, `src/assets/cover.jpg`
- Test: `tests/build.test.mjs`

**Interfaces:**
- Produces: `export const site` from `src/data/site.ts` with shape
  `{ artist: string; single: { title: string; releaseDate: string; cover: ImageMetadata; spotifyAlbumId: string }; bio: string; listen: { label: string; url: string; platform: 'spotify' | 'apple' | 'more' }[]; youtube: { label: string; url: string; videoId?: string }; socials: { label: string; url: string; kind: 'instagram' | 'linktree' | 'tips' }[] }`
  (`cover` imported from `../assets/cover.jpg`). npm script `test` = `npm run build && node --test tests/`.

- [ ] **Step 1:** `npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git --skip-houston`, then `npm install`. Set `site`/`base` in `astro.config.mjs`.
- [ ] **Step 2:** Download the cover from the spec's URL to `src/assets/cover.jpg` (`curl -L -o`); confirm `file` reports JPEG.
- [ ] **Step 3: Write the failing test** `tests/build.test.mjs` reading `dist/index.html`:
  - `test('has every confirmed link')`: asserts the HTML includes each of
    `https://open.spotify.com/album/4E5Mh34jWwqqpw1MWLdMOW`, `https://music.apple.com/us/album/in-my-life-single/6826474948`, `https://distrokid.com/hyperfollow/maracceres1/in-my-life`, `https://www.instagram.com/maria_caceres_222/`, `https://www.youtube.com/@mariacaceres188`, `https://linktr.ee/MariaCacerescanta`, `https://fintoc.me/maria-caceres`, `https://open.spotify.com/embed/album/4E5Mh34jWwqqpw1MWLdMOW`.
  - `test('bio is verbatim')`: includes the Global Constraints bio string (HTML may encode the quotes as `&quot;` — normalise before comparing).
  - `test('lang and base path')`: matches `<html lang="es"`; every `src="/` and `href="/` starts with `/mariacaceres/`.
  - `test('og image absolute')`: `og:image` content starts with `https://acidobinario.github.io/mariacaceres/`.
  - `test('no unconfirmed accounts')`: does not include `tiktok.com` or `mariacaceres.oficial`.
- [ ] **Step 4:** Write `src/data/site.ts` with the spec's values; render nothing yet beyond a placeholder. Run `npm test` → expect FAIL on links/og.
- [ ] **Step 5: Commit** `chore: scaffold Astro site, data module and build check`.

### Task 2: Page sections and styles

**Files:**
- Create: `src/layouts/Base.astro` (head: title `María Cáceres — In My Life`, description, OG/Twitter tags with absolute cover URL via `new URL(optimizedCover.src, Astro.site)`, favicon, font), `src/components/Hero.astro`, `Player.astro`, `Bio.astro`, `YouTube.astro`, `Socials.astro`, `Footer.astro`, `src/styles/global.css`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `site` from Task 1.
- Produces: nothing other tasks rely on.

- [ ] **Step 1:** Build sections in spec order: Hero (cover via `<Image>`, artist, single title, "Escúchala ahora" buttons from `site.listen`, inline SVG icons) → Player (Spotify iframe `https://open.spotify.com/embed/album/${spotifyAlbumId}`, `title="Reproductor de Spotify: In My Life"`, `loading="lazy"`, height 152) → Bio (`site.bio`) → YouTube (channel card; lazy iframe only if `videoId` set) → Socials (Instagram, Linktree, "Apóyame" → tips) → Footer (© 2026 María Cáceres).
- [ ] **Step 2:** Run `npm test` → expect PASS on all five tests.
- [ ] **Step 3:** `npm run preview`, check at 360px and desktop width against Review Focus 1, 4, 5.
- [ ] **Step 4: Commit** `feat: landing page for In My Life`.

### Task 3: GitHub Pages deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1:** Workflow on `push` to `main` and `workflow_dispatch`; permissions `contents: read, pages: write, id-token: write`; concurrency group `pages`. Job `build`: `actions/checkout@v4`, `actions/setup-node@v4` (node 22, npm cache), `npm ci`, `npm test`, `actions/upload-pages-artifact@v3` with `path: dist`. Job `deploy` (needs build, environment `github-pages`): `actions/deploy-pages@v4`.
- [ ] **Step 2:** `npx --yes yaml@2 valid < .github/workflows/deploy.yml` exits 0 (or parse with `node -e` + the `yaml` package); `npm test` still passes.
- [ ] **Step 3: Commit** `ci: deploy to GitHub Pages`.

## Execution

Orchestrated: one Codex player executes Tasks 1–3 on branch `feature/site` (worktree). Then an opencode (GLM) player reviews the branch against the spec, this plan's Review Focus and `CLAUDE.md`, reporting findings without editing. The orchestrator relays fixes to the Codex player, verifies `npm test`, and merges to `main` locally. Creating the GitHub repo and pushing waits for the user's OK.
