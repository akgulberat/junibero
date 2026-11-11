"use client";
import { usePlayer } from "./PlayerProvider";

export default function MiniPlayer({ hidden = false }: { hidden?: boolean }) {
  const { tracks, index, playing, toggle, next, prev } = usePlayer();
  return (
    <div
      className={`ipod-body fixed bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 rounded-full px-5 py-2 text-[var(--wheel-ink)] transition-opacity ${hidden ? "pointer-events-none opacity-0" : "opacity-100"}`}
      aria-hidden={hidden}
    >
      <button onClick={prev} aria-label="Önceki" tabIndex={hidden ? -1 : 0}>⏮</button>
      <button onClick={toggle} aria-label={playing ? "Durdur" : "Çal"} tabIndex={hidden ? -1 : 0} className="text-[var(--lcd-hi)]">{playing ? "⏸" : "▶"}</button>
      <button onClick={next} aria-label="Sonraki" tabIndex={hidden ? -1 : 0}>⏭</button>
      <span className="lcd-font text-lg text-[var(--lcd-ink)]">{tracks[index]?.title}</span>
    </div>
  );
}
