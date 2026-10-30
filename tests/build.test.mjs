import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const normalized = html.replaceAll('&quot;', '"').replaceAll('&amp;', '&');

test('has every confirmed link', () => {
  const urls = [
    'https://open.spotify.com/album/4E5Mh34jWwqqpw1MWLdMOW',
    'https://music.apple.com/us/album/in-my-life-single/6826474948',
    'https://distrokid.com/hyperfollow/maracceres1/in-my-life',
    'https://www.instagram.com/maria_caceres_222/',
    'https://www.youtube.com/@mariacaceres188',
    'https://linktr.ee/MariaCacerescanta',
    'https://fintoc.me/maria-caceres',
    'https://open.spotify.com/embed/album/4E5Mh34jWwqqpw1MWLdMOW',
  ];
  for (const url of urls) {
    assert.ok(html.includes(url), `missing link: ${url}`);
  }
});

test('bio is verbatim', () => {
  const bio =
    'María Cáceres es cantante. Después de grabar su primer disco, presenta "In My Life", su primer single, disponible desde el 21 de octubre de 2026 en todas las plataformas.';
  assert.ok(normalized.includes(bio), 'bio text not found verbatim');
});

test('lang and base path', () => {
  assert.match(html, /<html lang="es"/);
  const rootRelative = [...html.matchAll(/(?:src|href)="(\/[^"]*)"/g)].map((m) => m[1]);
  for (const url of rootRelative) {
    assert.ok(
      url.startsWith('/mariacaceres/'),
      `root-relative URL missing base path: ${url}`,
    );
  }
});

test('og image absolute', () => {
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/);
  assert.ok(ogImage, 'og:image meta tag not found');
  assert.ok(
    ogImage[1].startsWith('https://acidobinario.github.io/mariacaceres/'),
    `og:image not absolute under the Pages URL: ${ogImage[1]}`,
  );
});

test('no unconfirmed accounts', () => {
  assert.ok(!html.toLowerCase().includes('tiktok.com'), 'tiktok.com must not appear');
  assert.ok(
    !html.toLowerCase().includes('mariacaceres.oficial'),
    'mariacaceres.oficial must not appear',
  );
});
