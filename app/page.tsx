"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function BeroArtistSite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    nameSurname: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus("idle")

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      setStatus("success")
      setFormData({ email: "", nameSurname: "", message: "" })
    } else {
      setStatus("error")
    }

    setLoading(false)
  }
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black" />

        <div className="absolute top-20 left-10 w-32 h-32 rounded-full border-4 border-white/10 animate-spin-slow" />
        <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full border-4 border-white/5 animate-spin-slow" style={{ animationDuration: '30s' }} />

        <div className="absolute top-1/4 right-10 flex gap-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-white/20 to-white/10 animate-pulse"
              style={{
                height: `${Math.random() * 100 + 50}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-1/4 left-20 opacity-10">
          <svg className="w-24 h-24 animate-bounce" fill="currentColor" viewBox="0 0 24 24" style={{ animationDuration: '3s' }}>
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </div>

        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gray-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#home" className="text-2xl font-bold font-syne text-white">
              junibero
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="/latest-drop" className="text-sm uppercase tracking-wide text-gray-400 hover:text-white transition-colors relative group font-montserrat">
                Latest Drop
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
              <a href="#music" className="text-sm uppercase tracking-wide text-gray-400 hover:text-white transition-colors relative group font-montserrat">
                Music
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
              <a href="#about" className="text-sm uppercase tracking-wide text-gray-400 hover:text-white transition-colors relative group font-montserrat">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
              <a href="#contact" className="text-sm uppercase tracking-wide text-gray-400 hover:text-white transition-colors relative group font-montserrat">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </a>

              <div className="flex gap-4 ml-4 pl-4 border-l border-white/20">
                <a href="https://instagram.com/junibero" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.013 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.057-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://youtube.com/@junibero?si=XJ0Br2IyVYIUy2Nv" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-4">
              <a href="/latest-drop" onClick={() => setMobileMenuOpen(false)} className="block text-sm uppercase tracking-wide text-gray-400 hover:text-white transition-colors font-montserrat">
                Latest Drop
              </a>
              <a href="#music" onClick={() => setMobileMenuOpen(false)} className="block text-sm uppercase tracking-wide text-gray-400 hover:text-white transition-colors font-montserrat">
                Music
              </a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-sm uppercase tracking-wide text-gray-400 hover:text-white transition-colors font-montserrat">
                About
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-sm uppercase tracking-wide text-gray-400 hover:text-white transition-colors font-montserrat">
                Contact
              </a>

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <a href="https://instagram.com/junibero" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.013 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.057-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://youtube.com/@junibero?si=XJ0Br2IyVYIUy2Nv" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Artist image with overlay effect */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-gray-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <div className="relative overflow-hidden rounded-3xl border border-white/10">
                  <img
                    src="/images/mainpp.png"
                    alt="junibero"
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <h2 className="text-4xl md:text-5xl font-bold font-syne text-white mb-2">junibero</h2>
                    <p className="text-gray-300 text-lg font-montserrat">Turkish Rap Artist | Producer</p>
                  </div>
                </div>
              </div>

              {/* Right: Featured track card */}
              <div className="space-y-8">
                <div>
                  <div className="inline-block px-4 py-2 bg-white/10 rounded-full border border-white/30 mb-6">
                    <span className="text-sm uppercase tracking-widest text-gray-200 font-montserrat">Featured Track</span>
                  </div>
                  <h1 className="text-6xl md:text-7xl font-bold font-syne text-white mb-6 leading-tight">
                    Latest<br />Drop
                  </h1>
                </div>

                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10">
                  <iframe
                    src="https://open.spotify.com/embed/track/7hcuHhLrO0oLj1xeyZL0oi?utm_source=generator"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg mb-6"
                  />

                  <p className="text-gray-300 leading-relaxed font-montserrat text-lg">
                    Dive into the underground sound of Turkish hip-hop. Raw beats, authentic storytelling, and cinematic production that captures the essence of the streets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="music" className="py-32 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-6xl md:text-7xl font-bold font-syne text-white mb-4">Music</h2>
            <div className="w-24 h-1 bg-white" />
          </div>

          {/* Platform cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <a href="https://music.youtube.com/channel/UC9lsV9F80LSSNXXFKq0-Xkw" target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-gradient-to-br from-[#FA243C]/20 to-[#FA243C]/5 backdrop-blur-sm rounded-2xl p-8 border border-[#FA243C]/30 hover:border-[#FA243C]/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#FA243C]/20">
                <div className="w-12 h-12 mb-4 rounded-xl bg-[#FF0000] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold font-syne text-white mb-2">YouTube Music</h3>
                <p className="text-gray-400 font-montserrat">Listen now</p>
              </div>
            </a>
            <a href="https://open.spotify.com/intl-tr/artist/4NAAaT4GhP5kRzdOM5wXZY?si=Qb0owZ-iT0yxue0QmAc-sw" target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-gradient-to-br from-[#1DB954]/20 to-[#1DB954]/5 backdrop-blur-sm rounded-2xl p-8 border border-[#1DB954]/30 hover:border-[#1DB954]/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#1DB954]/20">
                <svg className="w-12 h-12 mb-4 text-[#1DB954] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <h3 className="text-2xl font-bold font-syne text-white mb-2">Spotify</h3>
                <p className="text-gray-400 font-montserrat">Stream now</p>
              </div>
            </a>
            <a href="https://www.youtube.com/@Junibero" target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-gradient-to-br from-[#FF0000]/20 to-[#FF0000]/5 backdrop-blur-sm rounded-2xl p-8 border border-[#FF0000]/30 hover:border-[#FF0000]/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#FF0000]/20">
                <svg className="w-12 h-12 mb-4 text-[#FF0000] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <h3 className="text-2xl font-bold font-syne text-white mb-2">YouTube</h3>
                <p className="text-gray-400 font-montserrat">Watch videos</p>
              </div>
            </a>
          </div>

          {/* Spotify embed */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <iframe
              src="https://open.spotify.com/embed/artist/4NAAaT4GhP5kRzdOM5wXZY?utm_source=generator"
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      <section id="about" className="py-32 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-6xl md:text-7xl font-bold font-syne text-white mb-4">The Artist</h2>
            <div className="w-24 h-1 bg-white" />
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-gray-500/10 rounded-2xl blur-2xl" />
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src="/images/mainpp.png"
                    alt="junibero"
                    className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-6 text-lg leading-relaxed text-gray-300 font-montserrat">
                <p>
                  <span className="text-2xl font-bold text-white font-syne">junibero</span> represents the next generation of Turkish hip-hop—unfiltered, authentic, and deeply rooted in the urban experience.
                </p>
                <p>
                  As both a rapper and producer, junibero crafts atmospheric soundscapes that blend dark, moody beats with raw lyrical storytelling. Each track is a cinematic journey through the streets, exploring themes of struggle, ambition, and truth.
                </p>
                <p>
                  The music transcends language barriers, speaking to anyone who's ever fought against the odds. This is more than rap—it's a movement, a voice for the underground.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-6">
                {['Producer', 'Rapper', 'Songwriter', 'Beat Maker'].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm font-montserrat text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="text-6xl md:text-7xl font-bold font-syne text-white mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-white mx-auto" />
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-10 border border-white/10">
            <div className="text-center mb-12">
              <a
                href="mailto:info@junibero.com"
                className="inline-flex items-center gap-3 text-2xl font-semibold text-white hover:text-gray-300 transition-colors font-montserrat group"
              >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@junibero.com
              </a>
            </div>

            <form className="space-y-6 font-montserrat" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  name="nameSurname"
                  value={formData.nameSurname}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Name"
                  className="bg-white/5 border-white/20 focus:border-white text-white placeholder:text-gray-500 h-14 rounded-xl transition-all duration-300"
                />
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/5 border-white/20 focus:border-white text-white placeholder:text-gray-500 h-14 rounded-xl transition-all duration-300"
                />
              </div>

              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                className="bg-white/5 border-white/20 focus:border-white text-white placeholder:text-gray-500 rounded-xl transition-all duration-300 resize-none"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-white hover:bg-gray-100 text-black text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl font-montserrat"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
              {/* ✅ Success / Error Messages */}
              {status === "success" && (
                <p className="text-green-600 text-center mt-4 font-medium">
                  ✅ Mesajınız gönderildi.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-center mt-4 font-medium">
                  ❌ Mesajınız gönderilemedi.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 border-t border-white/10 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-500 font-montserrat">© 2025 All rights reserved</p>
            </div>

            <div className="flex gap-6">
              <a href="https://instagram.com/junibero" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-125">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.013 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.057-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://youtube.com/@junibero?si=XJ0Br2IyVYIUy2Nv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-125">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
