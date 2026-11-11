import Ipod from "@/components/Ipod";
import HomeMiniPlayer from "@/components/HomeMiniPlayer";
import { LcdWindow, LcdLink } from "@/components/Lcd";
import { LINKS } from "@/lib/links";

export default function Home() {
  return (
    <main>
      <Ipod />

      <div className="flex flex-col items-center gap-16 px-4 pb-32 pt-8">
        <section id="about">
          <LcdWindow title="About" back="#home">
            <p>
              Junibero, 1992 doğumlu Berat Akgül’ün müzik projesidir. Geleneksel rap anlayışını günümüzün sound ve teknikleriyle kendi müzikal çizgisinde buluşturur.
            </p>
          </LcdWindow>
        </section>

        <section id="contact">
          <LcdWindow title="Contact" back="#home">
            <p>İş birliği, beat ve booking için yaz.</p>
            <LcdLink href={`mailto:${LINKS.email}`}>{LINKS.email}</LcdLink>
            <LcdLink href={LINKS.instagram}>Instagram</LcdLink>
            <LcdLink href={LINKS.youtube}>YouTube</LcdLink>
          </LcdWindow>
        </section>
      </div>

      <HomeMiniPlayer />
    </main>
  );
}
