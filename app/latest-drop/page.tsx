import Link from "next/link";
import { LcdWindow } from "@/components/Lcd";
import PauseOnMount from "@/components/PauseOnMount";
import { LINKS } from "@/lib/links";

export const metadata = {
  title: "Latest Drop | junibero",
  description: "junibero - Latest Drop. Spotify, YouTube Music ve YouTube'da dinle.",
};

const PLATFORMS = [
  { name: "Spotify", href: LINKS.spotifyAlbum },
  { name: "YouTube Music", href: LINKS.ytMusic },
  { name: "YouTube", href: LINKS.youtube },
];

export default function LatestDrop() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 py-10">
      <PauseOnMount />
      <div className="grid w-full max-w-5xl items-stretch gap-6 lg:grid-cols-[1.1fr_1fr]">
        <LcdWindow title="Now Showing" back="/" className="w-full">
          <h1 className="text-6xl leading-none sm:text-7xl">Latest Drop</h1>
          <p className="max-w-[34ch] opacity-80">
            "KAOS" her platformda.
          </p>

          <p className="pt-2 opacity-70">Dinle</p>
          <ul className="-mx-4 border-t-2 border-[var(--lcd-ink)]/30">
            {PLATFORMS.map((p) => (
              <li key={p.name} className="border-b-2 border-[var(--lcd-ink)]/30">
                <a
                  href={p.href} target="_blank" rel="noreferrer"
                  className="flex items-center justify-between px-4 py-2 text-3xl hover:bg-[var(--lcd-hi)] hover:text-white focus-visible:bg-[var(--lcd-hi)] focus-visible:text-white focus-visible:outline-none"
                >
                  <span>▶ {p.name}</span><span>›</span>
                </a>
              </li>
            ))}
          </ul>

          <Link href="/" className="inline-block pt-2 hover:underline">‹ iPod'a dön</Link>
        </LcdWindow>

        <div className="ipod-body flex flex-col justify-center rounded-[28px] p-4">
          <iframe
            title="junibero - Latest Drop (Spotify)"
            className="w-full rounded-xl"
            height="352"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            src={LINKS.spotifyAlbumEmbed}
          />
          <p className="mt-3 text-center text-[11px] text-[var(--wheel-ink)]">Tam parçalar için Spotify'a giriş yap</p>
        </div>
      </div>
    </main>
  );
}
