import cover from '../assets/cover.jpg';

export const site = {
  artist: 'María Cáceres',
  single: {
    title: 'In My Life',
    releaseDate: '2026-10-21',
    cover,
    spotifyAlbumId: '4E5Mh34jWwqqpw1MWLdMOW',
  },
  bio: 'María Cáceres es cantante. Después de grabar su primer disco, presenta "In My Life", su primer single, disponible desde el 21 de octubre de 2026 en todas las plataformas.',
  listen: [
    {
      label: 'Spotify',
      url: 'https://open.spotify.com/album/4E5Mh34jWwqqpw1MWLdMOW',
      platform: 'spotify',
    },
    {
      label: 'Apple Music',
      url: 'https://music.apple.com/us/album/in-my-life-single/6826474948',
      platform: 'apple',
    },
    {
      label: 'Más plataformas',
      url: 'https://distrokid.com/hyperfollow/maracceres1/in-my-life',
      platform: 'more',
    },
  ],
  youtube: {
    label: 'María Cáceres Canta conmigo',
    url: 'https://www.youtube.com/@mariacaceres188',
  },
  socials: [
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/maria_caceres_222/',
      kind: 'instagram',
    },
    {
      label: 'Linktree',
      url: 'https://linktr.ee/MariaCacerescanta',
      kind: 'linktree',
    },
    {
      label: 'Apóyame',
      url: 'https://fintoc.me/maria-caceres',
      kind: 'tips',
    },
  ],
} as const;

export type Site = typeof site;
export type ListenEntry = (typeof site.listen)[number];
export type SocialEntry = (typeof site.socials)[number];
