export type Track = { title: string; uri: string; cover?: string };

// Şarkı listesi /api/tracks üzerinden Spotify'dan gelir. Liste alınamazsa tek girdi kalır:
// sanatçının embed'i çalar, ⏮ ⏭ pasif olur (geçilecek başka şarkı yok).
export const FALLBACK: Track[] = [{ title: "junibero", uri: "spotify:artist:4NAAaT4GhP5kRzdOM5wXZY" }];
