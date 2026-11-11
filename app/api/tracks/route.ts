import { NextResponse } from "next/server";

// Sanatçının tüm şarkılarını Spotify'daki sırayla döner: en yeni çıkıştan eskiye, albüm içi sırayla.
// Sadece sunucuda çalışır; client secret tarayıcıya gitmez.
export const dynamic = "force-dynamic"; // hata cevabı build'de cache'lenmesin

const ARTIST_ID = "4NAAaT4GhP5kRzdOM5wXZY";
const API = "https://api.spotify.com/v1";
const TTL = 60 * 60 * 1000;

type Out = { title: string; uri: string; cover?: string };
let cache: { at: number; tracks: Out[] } | null = null;

async function getToken() {
    const id = process.env.SPOTIFY_CLIENT_ID;
    const secret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!id || !secret) throw new Error("SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET tanımlı değil (env eklendikten sonra yeniden deploy et)");
    const r = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
        cache: "no-store",
    });
    if (!r.ok) throw new Error(`Token alınamadı (${r.status}): ${(await r.text()).slice(0, 200)}`);
    return (await r.json()).access_token as string;
}

// limit parametresi vermiyoruz: dev mode'da üst sınırlar değişmiş olabilir, "next" ile sayfaları takip ediyoruz
async function getAll(url: string, token: string) {
    const items: any[] = [];
    let nextUrl: string | null = url;
    while (nextUrl) {
        const r: Response = await fetch(nextUrl, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
        if (!r.ok) throw new Error(`Spotify ${r.status} (${nextUrl.replace(API, "")}): ${(await r.text()).slice(0, 200)}`);
        const j = await r.json();
        items.push(...j.items);
        nextUrl = j.next;
    }
    return items;
}

export async function GET() {
    try {
        if (cache && Date.now() - cache.at < TTL) return NextResponse.json({ tracks: cache.tracks });

        const token = await getToken();
        const albums = await getAll(`${API}/artists/${ARTIST_ID}/albums?include_groups=album,single`, token);
        albums.sort((a, b) => b.release_date.localeCompare(a.release_date)); // en yeni önce (eskiden yeniye için a/b yer değiştir)

        const seen = new Set<string>(); // aynı şarkı hem single hem albümde olabilir
        const tracks: Out[] = [];
        for (const al of albums) {
            const cover: string | undefined = (al.images?.[1] ?? al.images?.[0])?.url; // ~300px
            const items = await getAll(`${API}/albums/${al.id}/tracks`, token);
            for (const t of items) {
                if (!t.artists?.some((a: any) => a.id === ARTIST_ID)) continue;
                const key = t.name.toLowerCase().trim();
                if (seen.has(key)) continue;
                seen.add(key);
                tracks.push({ title: t.name, uri: t.uri, cover });
            }
        }
        if (!tracks.length) throw new Error("Spotify boş liste döndü");
        cache = { at: Date.now(), tracks };
        return NextResponse.json({ tracks });
    } catch (e: any) {
        return NextResponse.json({ tracks: [], error: String(e?.message ?? e) }, { status: 500 });
    }
}
