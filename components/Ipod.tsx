"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlayer } from "./PlayerProvider";

// "#..." olanlar ana sayfa içinde scroll eder, "/..." olanlar rota açar
type Item = { label: string; view?: "now"; href?: string };
const MENU: Item[] = [
  { label: "Now Playing", view: "now" },
  { label: "Latest Drop", href: "/latest-drop" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const fmt = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, "0")}`;

export default function Ipod() {
  const router = useRouter();
  const { tracks, listError, index, playing, ready, pos, dur, toggle, next, prev } = usePlayer();
  const single = tracks.length < 2;
  const [debug, setDebug] = useState(false);
  useEffect(() => setDebug(new URLSearchParams(window.location.search).has("debug")), []);
  const cur = tracks[index];
  const label = !cur || cur.title === "junibero" ? "junibero" : `junibero - ${cur.title}`;
  const [sel, setSel] = useState(0);
  const [view, setView] = useState<"menu" | "now">("menu");
  const wheel = useRef<HTMLDivElement>(null);
  const last = useRef<number | null>(null);
  const acc = useRef(0);
  const captured = useRef(false);

  const step = (d: 1 | -1) => setSel((s) => (s + d + MENU.length) % MENU.length);
  const select = () => {
    const it = MENU[sel];
    if (it.view) { setView("now"); if (!playing) toggle(); }
    else if (it.href?.startsWith("#")) document.querySelector(it.href)?.scrollIntoView();
    else if (it.href) router.push(it.href);
  };

  const angle = (e: React.PointerEvent) => {
    const r = wheel.current!.getBoundingClientRect();
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
  };
  // Pointer capture'ı ancak gerçekten sürükleme başlayınca al: baştan alınca butonların click'i yutuluyordu
  const onDown = (e: React.PointerEvent) => { last.current = angle(e); captured.current = false; };
  const onMove = (e: React.PointerEvent) => {
    if (last.current === null) return;
    const a = angle(e);
    let d = a - last.current;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    last.current = a; acc.current += d;
    if (!captured.current && Math.abs(acc.current) > 6) { wheel.current!.setPointerCapture(e.pointerId); captured.current = true; }
    if (Math.abs(acc.current) >= 28) { if (view === "menu") step(acc.current > 0 ? 1 : -1); acc.current = 0; }
  };
  const onUp = () => { last.current = null; acc.current = 0; captured.current = false; };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") step(1);
      else if (e.key === "ArrowUp") step(-1);
      else if (e.key === "Enter") select();
      else if (e.key === "Escape") setView("menu");
      else if (e.key === " ") { e.preventDefault(); toggle(); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });

  return (
    <section id="home" className="grid min-h-dvh place-items-center p-4">
      <div className="ipod-body w-[min(340px,92vw)] rounded-[34px] p-5 pb-8">
        <div className="lcd relative aspect-[4/3.1] overflow-hidden rounded-md lcd-font text-[22px] leading-none">
          <div className="flex items-center justify-between border-b-2 border-[var(--lcd-ink)]/40 bg-gradient-to-b from-white/50 to-transparent px-2 py-1">
            <span>{view === "now" ? "Now Playing" : "junibero"}</span>
            <span className="flex items-center gap-2">
              <span className={playing ? "" : "opacity-40"}>▶</span>
              <span className="inline-block h-3 w-6 rounded-[2px] border-2 border-[var(--lcd-ink)] p-px"><i className="block h-full w-4/5 bg-[var(--lcd-ink)]" /></span>
            </span>
          </div>

          {view === "menu" ? (
            <ul>
              {MENU.map((m, i) => (
                <li key={m.label}>
                  <button
                    onClick={() => { if (i === sel) select(); else setSel(i); }}
                    className={`flex w-full items-center justify-between px-2 py-[5px] text-left ${i === sel ? "bg-[var(--lcd-hi)] text-white" : ""}`}
                  >
                    {m.label}<span>›</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-[calc(100%-32px)] flex-col justify-center gap-1.5 px-4 text-center">
              {cur?.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cur.cover} alt={`${label} kapak`} className="mx-auto h-24 w-24 rounded-sm border-2 border-[var(--lcd-ink)] object-cover" />
              ) : (
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-sm border-2 border-[var(--lcd-ink)] bg-[var(--lcd-hi)] text-4xl text-white">j</div>
              )}
              <div className="truncate text-[22px]" title={label}>{label}</div>
              <div className="h-3 border-2 border-[var(--lcd-ink)] p-px">
                <i className="block h-full bg-[var(--lcd-ink)]" style={{ width: dur ? `${(pos / dur) * 100}%` : "0%" }} />
              </div>
              <div className="flex justify-between text-lg"><span>{fmt(pos)}</span><span>{dur ? `-${fmt(dur - pos)}` : "--:--"}</span></div>
            </div>
          )}
        </div>

        <div
          ref={wheel}
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={() => { if (!captured.current) onUp(); }}
          className="wheel relative mx-auto mt-7 aspect-square w-[78%] rounded-full select-none"
        >
          <button className="wheel-btn absolute left-1/2 top-3 -translate-x-1/2" onClick={() => setView("menu")} aria-label="Menu">MENU</button>
          <button className={`wheel-btn absolute right-4 top-1/2 -translate-y-1/2 ${single ? "opacity-30" : ""}`} onClick={next} aria-label="Sonraki parça">⏭</button>
          <button className={`wheel-btn absolute left-4 top-1/2 -translate-y-1/2 ${single ? "opacity-30" : ""}`} onClick={prev} aria-label="Önceki parça">⏮</button>
          <button className="wheel-btn absolute bottom-3 left-1/2 -translate-x-1/2" onClick={toggle} aria-label={playing ? "Durdur" : "Çal"}>
            {playing ? "⏸" : "▶"}
          </button>
          <button className="wheel-center absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full" onClick={select} aria-label="Seç" />
        </div>
        <p className="mt-4 text-center text-[11px] text-[var(--wheel-ink)]">
          {debug && listError ? `Liste alınamadı: ${listError}` : ready ? "Tekerleği çevir, ▶ ile çal" : "Spotify yükleniyor…"}
        </p>
      </div>
    </section>
  );
}
