'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-rosegold/10 bg-ivory/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rosegold to-rosegold-light flex items-center justify-center text-white text-sm font-bold shadow-md shadow-rosegold/20">
            K
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-text-dark">KeNikahan</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          <a href="#beranda" className="hover:text-rosegold transition-colors">Beranda</a>
          <a href="#fitur" className="hover:text-rosegold transition-colors">Fitur</a>
          <a href="#desain" className="hover:text-rosegold transition-colors">Desain</a>
          <a href="#blog" className="hover:text-rosegold transition-colors">Blog</a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden md:block text-sm font-bold px-5 py-2.5 rounded-full border border-rosegold/20 text-text-dark hover:bg-rosegold/5 transition-all"
          >
            Masuk
          </Link>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2 text-text-muted hover:text-rosegold focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-ivory border-b border-rosegold/10 px-6 py-6 flex flex-col gap-6 shadow-2xl">
          <a href="#beranda" onClick={() => setIsOpen(false)} className="text-base font-medium text-text-dark hover:text-rosegold">Beranda</a>
          <a href="#fitur" onClick={() => setIsOpen(false)} className="text-base font-medium text-text-dark hover:text-rosegold">Fitur</a>
          <a href="#desain" onClick={() => setIsOpen(false)} className="text-base font-medium text-text-dark hover:text-rosegold">Desain</a>
          <a href="#blog" onClick={() => setIsOpen(false)} className="text-base font-medium text-text-dark hover:text-rosegold">Blog</a>
          <div className="h-[1px] w-full bg-rosegold/10 my-2" />
          <Link
            href="/login"
            className="text-center text-sm font-bold px-5 py-3 rounded-xl bg-rosegold text-white hover:bg-rosegold-light transition-all"
          >
            Masuk / Login Dashboard
          </Link>
        </div>
      )}
    </nav>
  )
}
