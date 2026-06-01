'use client'

import Link from 'next/link'
import type { Invitation, RsvpStat } from '@/lib/types/invitation'
import { formatDate, categoryLabel, daysUntil } from '@/lib/utils/format'
import StatusBadge from '@/components/ui/StatusBadge'

interface UserDashboardProps {
  profile: { fullName: string | null; email: string } | null
  invitations: Invitation[]
  rsvpStats: RsvpStat[]
}

export default function UserDashboard({ profile, invitations, rsvpStats }: UserDashboardProps) {
  const totalViews = invitations.reduce((s, i) => s + (i.viewCount || 0), 0)
  const totalRsvpCount = rsvpStats.reduce((s, r) => s + (r._count.id || 0), 0)
  const totalHadirCount = rsvpStats
    .filter((r) => r.attendance === 'hadir')
    .reduce((s, r) => s + (Number(r._sum.guestCount) || 0), 0)
  const activeCount = invitations.filter((i) => i.status === 'active').length

  return (
    <div className="space-y-16 transition-all duration-700 ease-in-out animate-in fade-in slide-in-from-bottom-4">
      {/* Page header */}
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-text-dark font-serif tracking-tighter leading-none">
          Selamat datang,{' '}
          <span className="italic text-rosegold font-medium">
            {profile?.fullName?.split(' ')[0] || 'User'}
          </span>
          .
        </h1>
        <p className="text-text-muted font-semibold tracking-[0.1em] text-[12px] uppercase">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Undangan', value: invitations.length, sub: `${activeCount} Aktif`, accent: '#C4896A' },
          { label: 'Total Dilihat', value: totalViews.toLocaleString(), sub: 'Kunjungan', accent: '#DAB09C' },
          { label: 'Total RSVP', value: totalRsvpCount, sub: 'Responden', accent: '#b07f66' },
          { label: 'Tamu Hadir', value: totalHadirCount, sub: 'Konfirmasi', accent: '#966d58' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-white border border-rosegold/20 rounded-2xl relative overflow-hidden group hover:border-rosegold/50 transition-all shadow-sm"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] opacity-60" style={{ backgroundColor: stat.accent }} />
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <p className="text-3xl font-bold font-serif tracking-tight" style={{ color: stat.accent }}>
              {stat.value}
            </p>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Invitation cards */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-rosegold/10 pb-6">
          <h2 className="text-3xl font-bold text-text-dark font-serif tracking-tight">
            Undangan Saya
          </h2>
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">
            {invitations.length} Undangan
          </span>
        </div>

        {invitations.length === 0 ? (
          <div className="p-20 text-center bg-white border border-dashed border-rosegold/20 rounded-[2.5rem]">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-rosegold/10 border border-rosegold/20 flex items-center justify-center text-2xl shadow-sm">
              💌
            </div>
            <p className="text-text-muted text-sm font-medium mb-2">Belum ada undangan.</p>
            <p className="text-text-muted/60 text-xs">Hubungi admin untuk membuat undangan baru.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {invitations.map((inv) => {
              const invitationName = inv.content.groom_name
                ? `${inv.content.bride_name} & ${inv.content.groom_name}`
                : inv.content.bride_name
              const hadirStat = rsvpStats.find(
                (s) => s.invitationId === inv.id && s.attendance === 'hadir'
              )
              const totalTamuHadir = hadirStat?._sum.guestCount || 0
              const days = daysUntil(inv.eventDate)

              return (
                <div
                  key={inv.id}
                  className="p-8 md:p-10 bg-white border border-rosegold/20 rounded-[2.5rem] hover:border-rosegold transition-all group shadow-sm hover:shadow-lg hover:shadow-rosegold/10"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    {/* Info */}
                    <div className="space-y-5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 bg-rosegold/10 text-rosegold text-[10px] font-bold uppercase tracking-widest rounded-lg border border-rosegold/20">
                          {categoryLabel(inv.template.category)}
                        </span>
                        <StatusBadge status={inv.status} />
                        {inv.status === 'active' && days !== null && days >= 0 && (
                          <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                            days <= 7 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-ivory-dark text-rosegold border border-rosegold/20'
                          }`}>
                            {days === 0 ? 'Hari ini!' : `${days} hari lagi`}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-text-dark font-serif truncate tracking-tight leading-none">
                        {invitationName}
                      </h3>

                      <div className="flex flex-wrap gap-6 text-[11px] font-bold text-text-muted uppercase tracking-[0.15em]">
                        <span className="flex items-center gap-2">
                          📅 <span className="text-text-dark">{formatDate(inv.eventDate)}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          🎨 <span className="text-text-muted normal-case italic font-medium tracking-normal">{inv.template.name}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          🔗 <span className="text-rosegold normal-case font-medium tracking-normal italic lowercase">/{inv.slug}</span>
                        </span>
                      </div>

                      {/* Mini stats */}
                      <div className="flex gap-8 text-center pt-2">
                        {[
                          { label: 'Dilihat', value: (inv.viewCount || 0).toLocaleString() },
                          { label: 'RSVP', value: inv._count.rsvps },
                          { label: 'Tamu Hadir', value: totalTamuHadir },
                        ].map((stat) => (
                          <div key={stat.label}>
                            <p className="text-xl font-bold text-rosegold font-serif leading-none">{stat.value}</p>
                            <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 shrink-0">
                      <Link
                        href={`/dashboard/edit-undangan/${inv.id}`}
                        className="px-8 py-3.5 bg-gradient-to-r from-rosegold to-rosegold-light text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.15em] hover:shadow-lg hover:shadow-rosegold/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
                      >
                        Edit Undangan
                      </Link>
                      <Link
                        href={`/u/${inv.slug}`}
                        target="_blank"
                        className="px-8 py-3.5 border border-rosegold/20 rounded-2xl text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-rosegold/5 transition-all bg-white text-center text-text-dark hover:text-rosegold"
                      >
                        Lihat Undangan
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
