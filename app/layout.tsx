import type { Metadata } from "next";
import { VT323, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/components/PlayerProvider";

const lcd = VT323({ weight: "400", subsets: ["latin"], variable: "--font-lcd" });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "junibero - Turkish Rap Artist | Producer",
  description: "Official website of junibero - Turkish rap artist and producer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${lcd.variable} ${body.variable}`}>
      <body>
        {/* Provider layout seviyesinde: sayfa değişince müzik kesilmez */}
        <PlayerProvider>{children}</PlayerProvider>
      </body>
    </html>
  );
}
