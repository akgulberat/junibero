import { LcdWindow } from "./Lcd";
import MiniPlayer from "./MiniPlayer";

// Ayrı rota sayfaları için (şu an sadece /latest-drop)
export default function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh place-items-start justify-center p-4 pb-28">
      <div className="mt-6"><LcdWindow title={title} back="/">{children}</LcdWindow></div>
      <MiniPlayer />
    </div>
  );
}
