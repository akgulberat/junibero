"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { FALLBACK, type Track } from "@/lib/tracks";

type Ctx = {
  tracks: Track[]; listError: string | null;
  index: number; playing: boolean; ready: boolean; pos: number; dur: number;
  toggle: () => void; next: () => void; prev: () => void; pause: () => void; play: (i: number) => void;
};
const PlayerCtx = createContext<Ctx>(null as unknown as Ctx);
export const usePlayer = () => useContext(PlayerCtx);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const ctrl = useRef<any>(null);
  const started = useRef(false);
  const playingRef = useRef(false);
  const bufferingRef = useRef(false);
  const loading = useRef(false);
  const wantPlay = useRef(false);
  const playOnReady = useRef(false);
  const advancing = useRef(false);
  const indexRef = useRef(0);
  const tracksRef = useRef<Track[]>(FALLBACK);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadRef = useRef<(i: number) => void>(() => { });
  const [tracks, setTracks] = useState<Track[]>(FALLBACK);
  const [listError, setListError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [pos, setPos] = useState(0);
  const [dur, setDur] = useState(0);

  // Tüm şarkı listesini Spotify'dan al
  useEffect(() => {
    fetch("/api/tracks")
      .then(async (r) => {
        const d = await r.json().catch(() => null);
        if (r.ok && d?.tracks?.length) { tracksRef.current = d.tracks; setTracks(d.tracks); setListError(null); }
        else { const msg = d?.error ?? `HTTP ${r.status}`; console.error("[junibero] şarkı listesi alınamadı:", msg); setListError(msg); }
      })
      .catch((e) => { console.error("[junibero] şarkı listesi alınamadı:", e); setListError(String(e)); });
  }, []);

  useEffect(() => {
    const w = window as any;
    const init = (api: any) => {
      if (ctrl.current || !host.current) return;
      const el = document.createElement("div");
      host.current.appendChild(el);
      api.createController(el, { uri: tracksRef.current[0].uri, width: 300, height: 152 }, (c: any) => {
        ctrl.current = c;
        c.addListener("ready", () => {
          setReady(true);
          if (playOnReady.current && wantPlay.current) { playOnReady.current = false; c.play(); }
        });
        c.addListener("playback_update", (e: any) => {
          const d = e.data;
          const isPlaying = !d.isPaused;
          playingRef.current = isPlaying;
          bufferingRef.current = !!d.isBuffering;
          if (isPlaying) { loading.current = false; advancing.current = false; }
          setPlaying(isPlaying);
          setPos(d.position);
          setDur(d.duration);
          // Parça bitince listedeki sıradakine geç
          if (started.current && d.isPaused && d.duration > 0 && d.position >= d.duration - 500 && !advancing.current && wantPlay.current && tracksRef.current.length > 1) {
            advancing.current = true;
            loadRef.current(indexRef.current + 1);
          }
        });
      });
    };
    if (w.SpotifyIframeApi) init(w.SpotifyIframeApi);
    else {
      w.onSpotifyIframeApiReady = (api: any) => { w.SpotifyIframeApi = api; init(api); };
      if (!document.getElementById("spotify-iframe-api")) {
        const s = document.createElement("script");
        s.id = "spotify-iframe-api";
        s.src = "https://open.spotify.com/embed/iframe-api/v1";
        s.async = true;
        document.body.appendChild(s);
      }
    }
  }, []);

  const clearTimer = () => { if (timer.current) clearTimeout(timer.current); timer.current = null; };

  const load = useCallback((i: number) => {
    const list = tracksRef.current;
    const n = ((i % list.length) + list.length) % list.length;
    indexRef.current = n; setIndex(n);
    started.current = true; wantPlay.current = true; loading.current = true; advancing.current = true;
    clearTimer();
    const c = ctrl.current;
    // Spotify henüz hazır değilse "ready" olunca çal. Hazırsa SADECE bir kez play: loadUri sonrası
    // "ready" olayında ve zamanlayıcıda tekrar play çağırmak parçayı baştan başlatıp takılma yapıyordu.
    playOnReady.current = !c;
    if (!c) return;
    c.loadUri(list[n].uri);
    c.play();
    // Hâlâ başlamadıysa (ve yüklenmiyorsa) bir kez daha dene
    timer.current = setTimeout(() => {
      if (wantPlay.current && !playingRef.current && !bufferingRef.current) ctrl.current?.play();
    }, 2500);
  }, []);
  loadRef.current = load;

  const doPause = useCallback(() => {
    wantPlay.current = false; playOnReady.current = false; loading.current = false;
    clearTimer();
    ctrl.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (!started.current || !ctrl.current) { load(indexRef.current); return; }
    if (playingRef.current || loading.current) doPause();
    else { wantPlay.current = true; ctrl.current.play(); }
  }, [load, doPause]);

  const pause = useCallback(() => { if (playingRef.current || loading.current) doPause(); }, [doPause]);
  // Tek girdi varsa (liste alınamadıysa) ileri-geri yapacak başka parça yok
  const next = useCallback(() => { if (tracksRef.current.length > 1) load(indexRef.current + 1); }, [load]);
  const prev = useCallback(() => { if (tracksRef.current.length > 1) load(indexRef.current - 1); }, [load]);

  return (
    <PlayerCtx.Provider value={{ tracks, listError, index, playing, ready, pos, dur, toggle, pause, next, prev, play: load }}>
      {children}
      <div ref={host} aria-hidden style={{ position: "fixed", right: 0, bottom: 0, width: 300, height: 152, opacity: 0.01, pointerEvents: "none", zIndex: -1 }} />
    </PlayerCtx.Provider>
  );
}
