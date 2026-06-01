'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/auth/LogoutButton'

interface SidebarProps {
  profile: { fullName: string | null; email: string; role?: string } | null
}

const ALL_NAV_ITEMS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    label: 'Dashboard',
    href: '/dashboard',
    adminOnly: true,
    userOnly: false,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7" />
        <path d="M12 17V3" />
        <path d="M8 7l4-4 4 4" />
        <rect x="2" y="12" width="20" height="2" rx="1" />
      </svg>
    ),
    label: 'Undangan Saya',
    href: '/dashboard',
    adminOnly: false,
    userOnly: true,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Undangan',
    href: '/dashboard/invitations',
    adminOnly: true,
    userOnly: false,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    label: 'Blog',
    href: '/dashboard/blog',
    adminOnly: true,
    userOnly: false,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: 'RSVP',
    href: '/dashboard/rsvp',
    adminOnly: false,
    userOnly: true,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    label: 'Buku Tamu',
    href: '/dashboard/guests',
    adminOnly: false,
    userOnly: true,
  },
]

export default function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isAdmin = profile?.role === 'admin'
  const visibleNavItems = ALL_NAV_ITEMS.filter(item => {
    if (item.adminOnly && !isAdmin) return false
    if (item.userOnly && isAdmin) return false
    return true
  })

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setMobileOpen(false)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [mobileOpen, handleKeyDown])

  function isActive(href: string) {
    if (href === '/dashboard' && pathname !== '/dashboard') return false
    return pathname.startsWith(href)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full dashboard-scroll overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-6">
        <Link href={isAdmin ? "/dashboard" : "/dashboard/rsvp"} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rosegold to-rosegold-light flex items-center justify-center text-white text-sm font-bold shadow-md shadow-rosegold/20 transition-transform group-hover:scale-105">
            K
          </div>
          <span className="font-serif text-[15px] font-bold text-text-dark tracking-tight">
            KeNikahan
          </span>
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-rosegold/10" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="px-3 py-2 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
          Menu
        </p>
        {visibleNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-[13px] font-medium ${
              isActive(item.href)
                ? 'bg-rosegold/10 text-rosegold shadow-sm'
                : 'text-text-muted hover:text-text-dark hover:bg-black/5'
            }`}
          >
            <span className={`shrink-0 ${isActive(item.href) ? 'text-rosegold' : ''}`}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User section */}
      <div className="px-3 pb-4 mt-auto">
        <div className="mx-1 h-px bg-rosegold/10 mb-4" />
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-black/5 border border-rosegold/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rosegold/20 to-rosegold-light/20 border border-rosegold/30 flex items-center justify-center text-xs font-bold text-rosegold shrink-0">
            {profile?.fullName?.charAt(0) || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-text-dark truncate">
              {profile?.fullName || 'User Account'}
            </p>
            <p className="text-[11px] text-text-muted truncate">
              {profile?.email}
            </p>
          </div>
        </div>
        <LogoutButton className="w-full mt-2 text-[12px] font-medium py-2 text-text-muted hover:text-red-600 transition-colors rounded-lg hover:bg-red-50" />
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-zinc-900/90 backdrop-blur border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-xl"
        aria-label="Open menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 w-64 h-screen bg-ivory border-r border-rosegold/10 transform transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 w-7 h-7 rounded-md bg-black/5 flex items-center justify-center text-text-muted hover:text-text-dark transition-colors text-xs"
          aria-label="Close menu"
        >
          ✕
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-[240px] md:shrink-0 md:h-screen md:sticky md:top-0 flex-col bg-ivory border-r border-rosegold/10 z-20">
        {sidebarContent}
      </aside>
    </>
  )
}
