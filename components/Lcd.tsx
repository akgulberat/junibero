import Link from "next/link";

// Ortak LCD pencere: hem ana sayfa bölümlerinde hem /latest-drop'ta kullanılır
export function LcdWindow({ title, back, children, className = "w-[min(720px,94vw)]" }: { title: string; back: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`ipod-body rounded-[28px] p-4 ${className}`}>
      <div className="lcd relative overflow-hidden rounded-md lcd-font">
        <header className="flex items-center justify-between border-b-2 border-[var(--lcd-ink)]/40 bg-gradient-to-b from-white/50 to-transparent px-3 py-1 text-2xl">
          {back.startsWith("#") ? <a href={back} className="hover:underline">‹ Menu</a> : <Link href={back} className="hover:underline">‹ Menu</Link>}
          <span>{title}</span>
          <span aria-hidden>▶</span>
        </header>
        <div className="relative z-10 space-y-4 p-4 text-[22px] leading-snug">{children}</div>
      </div>
    </div>
  );
}

export const LcdLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
    className="block bg-[var(--lcd-hi)] px-3 py-1 text-white hover:brightness-110">{children} ›</a>
);
