import type React from "react"
import type { Metadata } from "next"
import { Syne, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "junibero - Turkish Rap Artist | Producer",
  description:
    "Official website of junibero - Turkish rap artist and producer pushing the boundaries of underground hip-hop",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${syne.variable} ${montserrat.variable} font-montserrat antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
