"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function BeroArtistSite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
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
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.013 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.057-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-all hover:scale-110">
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
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.013 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.057-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
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
                    src="/moody-portrait-of-hip-hop-artist-in-dark-purple-li.jpg"
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
                    src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp?utm_source=generator&theme=0"
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
            <h2 className="text-6xl md:text-7xl font-bold font-syne text-white mb-4">Discography</h2>
            <div className="w-24 h-1 bg-white" />
          </div>

          {/* Platform cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-gradient-to-br from-[#1DB954]/20 to-[#1DB954]/5 backdrop-blur-sm rounded-2xl p-8 border border-[#1DB954]/30 hover:border-[#1DB954]/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#1DB954]/20">
                <svg className="w-12 h-12 mb-4 text-[#1DB954] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <h3 className="text-2xl font-bold font-syne text-white mb-2">Spotify</h3>
                <p className="text-gray-400 font-montserrat">Stream now</p>
              </div>
            </a>

            <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-gradient-to-br from-[#FA243C]/20 to-[#FA243C]/5 backdrop-blur-sm rounded-2xl p-8 border border-[#FA243C]/30 hover:border-[#FA243C]/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#FA243C]/20">
                <svg className="w-12 h-12 mb-4 text-[#FA243C] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.28 5.28 0 0 0 1.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76 1.035-1.36 1.322-.63.302-1.29.455-1.99.468-.465.01-.915-.06-1.36-.21-.69-.232-1.24-.623-1.62-1.21-.26-.4-.39-.84-.43-1.31-.07-.94.18-1.79.81-2.5.48-.54 1.08-.92 1.77-1.13.45-.14.91-.21 1.38-.24.26-.02.52-.01.78-.03h.15c.08 0 .13-.05.13-.13v-5.23c0-.13-.05-.18-.18-.16l-5.77 1.02c-.11.02-.16.08-.16.19v8.88c0 .36-.05.71-.2 1.05-.27.59-.74 1.03-1.33 1.33-.63.31-1.29.47-1.99.48-.46.01-.91-.06-1.36-.21-.69-.23-1.24-.62-1.62-1.21-.26-.4-.39-.84-.43-1.31-.07-.94.18-1.79.81-2.5.48-.54 1.08-.92 1.77-1.13.45-.14.91-.21 1.38-.24.26-.02.52-.01.78-.03h.15c.08 0 .13-.05.13-.13V5.147c0-.1.05-.16.14-.17l7.38-1.3c.06-.01.12-.02.18-.02.1 0 .14.06.14.16v5.11z" />
                </svg>
                <h3 className="text-2xl font-bold font-syne text-white mb-2">Apple Music</h3>
                <p className="text-gray-400 font-montserrat">Listen now</p>
              </div>
            </a>

            <a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer" className="group">
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
              src="https://open.spotify.com/embed/artist/0TnOYISbd1XYRBk9myaseg?utm_source=generator&theme=0"
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
                    src="/moody-portrait-of-hip-hop-artist-in-dark-purple-li.jpg"
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

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <div className="text-center mb-12">
              <a
                href="mailto:info@juniberomusic.com"
                className="inline-flex items-center gap-3 text-2xl font-semibold text-white hover:text-gray-300 transition-colors font-montserrat group"
              >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@juniberomusic.com
              </a>
            </div>

            <form className="space-y-6 font-montserrat">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white/5 border-white/20 focus:border-white text-white placeholder:text-gray-500 h-14 rounded-xl transition-all duration-300"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/5 border-white/20 focus:border-white text-white placeholder:text-gray-500 h-14 rounded-xl transition-all duration-300"
                />
              </div>

              <Textarea
                placeholder="Your Message"
                rows={6}
                className="bg-white/5 border-white/20 focus:border-white text-white placeholder:text-gray-500 rounded-xl transition-all duration-300 resize-none"
              />

              <Button
                type="submit"
                className="w-full h-14 bg-white hover:bg-gray-100 text-black text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl font-montserrat"
              >
                Send Message
              </Button>
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
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-125">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.013 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.057-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-125">
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
