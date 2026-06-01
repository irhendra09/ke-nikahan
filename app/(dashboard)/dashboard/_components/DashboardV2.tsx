'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import type { DashboardProps, Invitation, Rsvp, Wish, RsvpStat } from '@/lib/types/invitation'
import { timeAgo, formatDate, categoryLabel, daysUntil } from '@/lib/utils/format'
import StatusBadge from '@/components/ui/StatusBadge'
import AttendanceBadge from '@/components/ui/AttendanceBadge'
import StatCard from '@/components/ui/StatCard'

// ── Detail data fetched on demand ─────────────────────────────

interface DetailData {
  rsvps: Rsvp[]
  wishes: Wish[]
}

// ── Main Component ────────────────────────────────────────────

export default function DashboardV2({ profile, invitations, recentRsvps, rsvpStats }: DashboardProps) {
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null)
  const [detailData, setDetailData] = useState<DetailData | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)

  // ── Computed stats ────────────────────────────────────────

  const totalViews = invitations.reduce((s, i) => s + (i.viewCount || 0), 0)
  const totalRsvpCount = rsvpStats.reduce((s, r) => s + (r._count.id || 0), 0)
  const totalHadirCount = rsvpStats
    .filter((r) => r.attendance === 'hadir')
    .reduce((s, r) => s + (Number(r._sum.guestCount) || 0), 0)
  const activeCount = invitations.filter((i) => i.status === 'active').length

  // ── Handlers ──────────────────────────────────────────────

  function handleSelectInvitation(inv: Invitation | null) {
    setDetailData(null)
    setSelectedInvitation(inv)
  }

  // ── Fetch detail data when an invitation is selected ──────

  useEffect(() => {
    let cancelled = false

    if (!selectedInvitation) return

    async function fetchDetails() {
      setLoadingDetail(true)
      try {
        const res = await fetch(`/api/dashboard/invitation-details?id=${selectedInvitation!.id}`)
        const data = await res.json()
        if (!cancelled) setDetailData(data)
      } catch (err) {
        console.error('Error fetching details:', err)
      } finally {
        if (!cancelled) setLoadingDetail(false)
      }
    }

    fetchDetails()
    return () => { cancelled = true }
  }, [selectedInvitation])

  // ══════════════════════════════════════════════════════════
  //  DETAIL VIEW
  // ══════════════════════════════════════════════════════════

  if (selectedInvitation) {
    return (
      <div className="space-y-12 transition-all duration-500 ease-in-out">
        {/* Back button */}
        <button
          onClick={() => handleSelectInvitation(null)}
          className="flex items-center gap-3 text-text-muted hover:text-rosegold transition-all text-[11px] font-bold uppercase tracking-[0.2em] group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Kembali ke Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 border-b border-rosegold/10 pb-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-6">
              <h2 className="text-5xl md:text-6xl font-bold text-text-dark font-serif leading-[0.85] tracking-tighter">
                {selectedInvitation.content.bride_name}
                {selectedInvitation.content.groom_name && (
                  <span className="text-text-muted mx-2">/</span>
                )}
                <span className="text-rosegold italic">
                  {selectedInvitation.content.groom_name}
                </span>
              </h2>
              <StatusBadge status={selectedInvitation.status} />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[12px] font-bold text-text-muted uppercase tracking-widest">
              <span>{categoryLabel(selectedInvitation.template.category)}</span>
              <span className="w-1 h-1 rounded-full bg-rosegold/30" />
              <span>{formatDate(selectedInvitation.eventDate)}</span>
              <span className="w-1 h-1 rounded-full bg-rosegold/30" />
              <span className="text-rosegold/60 lowercase tracking-normal font-medium italic">
                /{selectedInvitation.slug}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href={`/u/${selectedInvitation.slug}`}
              target="_blank"
              className="px-8 py-3.5 border border-rosegold/20 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-rosegold/5 transition-all bg-white text-text-dark"
            >
              Live View
            </Link>
            <Link
              href={`/dashboard/invitations/edit/${selectedInvitation.id}`}
              className="px-8 py-3.5 bg-rosegold text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-rosegold-light transition-all shadow-lg shadow-rosegold/20"
            >
              Edit Konten
            </Link>
          </div>
        </div>

        {/* Detail stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Dilihat"
            value={selectedInvitation.viewCount.toLocaleString()}
            sub="Kunjungan Unik"
            accent="#C4896A"
          />
          <StatCard
            label="Hadir"
            value={detailData?.rsvps.filter((r) => r.attendance === 'hadir').length || 0}
            sub={`${detailData?.rsvps.filter((r) => r.attendance === 'hadir').reduce((s, r) => s + r.guestCount, 0) || 0} Total Tamu`}
            accent="#DAB09C"
          />
          <StatCard
            label="Mungkin"
            value={detailData?.rsvps.filter((r) => r.attendance === 'mungkin').length || 0}
            sub="Menunggu Konfirmasi"
            accent="#b07f66"
          />
          <StatCard
            label="Ucapan"
            value={detailData?.wishes.length || 0}
            sub="Pesan Masuk"
            accent="#966d58"
          />
        </div>

        {/* Interactive panels */}
        {loadingDetail ? (
          <div className="py-40 flex flex-col items-center justify-center bg-white border border-rosegold/10 rounded-[2.5rem]">
            <div className="w-12 h-12 border-[3px] border-ivory-dark border-t-rosegold rounded-full animate-spin mb-6" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted">
              Memuat Data Detail
            </span>
          </div>
        ) : detailData ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* RSVP table */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between border-b border-rosegold/10 pb-6">
                <h3 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em]">
                  Daftar Tamu
                </h3>
              </div>

              <div className="bg-white border border-rosegold/20 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-rosegold/10 bg-ivory/50">
                      <th className="px-8 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">Nama</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest text-center whitespace-nowrap">Jumlah Tamu</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03]">
                    {detailData.rsvps.map((r) => (
                      <tr key={r.id} className="hover:bg-white/[0.01] transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-[11px] font-black text-zinc-500 transition-colors group-hover:text-amber-500 group-hover:border-amber-500/30 shrink-0">
                              {r.name.charAt(0)}
                            </div>
                            <span className="text-sm font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors">
                              {r.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className="text-[11px] font-black text-zinc-500 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                            {r.guestCount}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <AttendanceBadge attendance={r.attendance} />
                        </td>
                      </tr>
                    ))}
                    {detailData.rsvps.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-8 py-24 text-center text-zinc-700 text-[10px] font-black uppercase tracking-[0.3em] italic">
                          Belum Ada Data RSVP
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Wishes panel */}
            <div className="lg:col-span-4 space-y-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em]">
                  Ucapan Terbaru
                </h3>
              </div>
              <div className="space-y-4">
                {detailData.wishes.map((w) => (
                  <div
                    key={w.id}
                    className="p-8 bg-black/20 border border-white/5 rounded-[2rem] space-y-4 hover:border-zinc-700 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                        {w.name}
                      </span>
                      <span className="text-[9px] text-zinc-800 font-black">
                        {timeAgo(w.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed font-medium italic">
                      &quot;{w.message}&quot;
                    </p>
                  </div>
                ))}
                {detailData.wishes.length === 0 && (
                  <div className="p-16 text-center border border-dashed border-white/5 rounded-[2rem] text-zinc-800 text-[10px] font-black uppercase tracking-[0.3em]">
                    Belum Ada Ucapan
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════
  //  OVERVIEW DASHBOARD
  // ══════════════════════════════════════════════════════════

  return (
    <div className="space-y-24 transition-all duration-700 ease-in-out">
      {/* Page header */}
      <div className="space-y-4">
        <h1 className="text-6xl md:text-7xl font-bold text-text-dark font-serif tracking-tighter leading-none">
          Selamat datang,{' '}
          <span className="italic text-rosegold font-medium">
            {profile?.fullName?.split(' ')[0]}
          </span>
          .
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-text-muted font-semibold tracking-[0.1em] text-[12px] uppercase">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <span className="w-1 h-1 rounded-full bg-rosegold/30" />
          <p className="text-rosegold/50 font-bold tracking-[0.2em] text-[10px] uppercase">
            Digital Suite v1.4
          </p>
        </div>
      </div>

      {/* Global stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Undangan" value={invitations.length} sub={`${activeCount} Aktif`} accent="#C4896A" />
        <StatCard label="Total Dilihat" value={totalViews.toLocaleString()} sub="Semua Undangan" accent="#DAB09C" />
        <StatCard label="Total RSVP" value={totalRsvpCount} sub="Semua Undangan" accent="#b07f66" />
        <StatCard label="Tamu Hadir" value={totalHadirCount} sub="Konfirmasi Hadir" accent="#966d58" />
      </div>

      {/* Activity & upcoming events */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
        {/* Recent RSVP stream */}
        <div className="xl:col-span-8 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em]">
              RSVP Terbaru
            </h3>
            <span className="text-[9px] font-black text-zinc-800 uppercase tracking-widest">
              Data Realtime
            </span>
          </div>

          <div className="bg-white border border-rosegold/20 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-white/[0.03]">
                  {recentRsvps.length > 0 ? (
                    recentRsvps.map((r) => (
                      <tr key={r.id} className="group hover:bg-white/[0.01] transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-5">
                            <div className="w-10 h-10 rounded-full bg-ivory-dark border border-rosegold/10 flex items-center justify-center text-[11px] font-bold text-rosegold group-hover:border-rosegold/30 transition-all shrink-0">
                              {r.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-[15px] font-bold text-text-dark group-hover:text-rosegold transition-colors">
                                {r.name}
                              </div>
                              <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">
                                /{r.invitation?.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <AttendanceBadge attendance={r.attendance} />
                        </td>
                        <td className="px-8 py-6 text-right text-[10px] font-black text-zinc-800 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">
                          {timeAgo(r.createdAt)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-24 text-center text-zinc-800 text-[10px] font-black uppercase tracking-[0.3em] italic">
                        Menunggu Data RSVP...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming event cards */}
        <div className="xl:col-span-4 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em]">
              Acara Mendatang
            </h3>
          </div>

          <div className="space-y-4">
            {invitations
              .filter((i) => i.status === 'active')
              .slice(0, 5)
              .map((inv) => {
                const days = daysUntil(inv.eventDate)
                return (
                  <div
                    key={inv.id}
                    onClick={() => handleSelectInvitation(inv)}
                    className="p-7 bg-white border border-rosegold/20 rounded-[1.8rem] cursor-pointer hover:border-rosegold transition-all group relative overflow-hidden shadow-sm hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-5">
                      <div className="min-w-0 flex-1">
                        <div className="text-[15px] font-bold text-zinc-300 truncate group-hover:text-amber-500 transition-colors tracking-tight">
                          {inv.content.bride_name}
                          {inv.content.groom_name && <span className="text-zinc-700 mx-1">&amp;</span>}
                          {inv.content.groom_name}
                        </div>
                        <div className="text-[10px] text-zinc-600 font-black mt-1 uppercase tracking-widest">
                          {formatDate(inv.eventDate)}
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter shrink-0 ${
                          days <= 7 ? 'bg-red-500/10 text-red-400' : 'bg-zinc-900 text-amber-500/80'
                        }`}
                      >
                        {days === 0 ? 'Hari ini!' : `${days}h`}
                      </div>
                    </div>

                    <div className="h-[2px] bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${days <= 7 ? 'bg-red-500/40' : 'bg-amber-500/40'}`}
                        style={{ width: `${Math.min(100, (inv._count.rsvps / 50) * 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}

            {invitations.length === 0 && (
              <div className="p-20 text-center text-zinc-800 text-[10px] font-black uppercase tracking-[0.3em] border border-dashed border-white/5 rounded-[2rem]">
                Belum Ada Acara
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invitation collection */}
      <div className="space-y-12">
        <div className="flex items-center justify-between border-b border-white/5 pb-8">
          <h2 className="text-4xl font-bold text-zinc-100 font-serif tracking-tight">
            Koleksi Undangan
          </h2>
          {/* Tombol Buat Undangan Dihapus: Hanya Admin/Sistem yang membuat undangan via Checkout */}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {invitations.map((inv) => {
            const invitationName = inv.content.groom_name
              ? `${inv.content.bride_name} & ${inv.content.groom_name}`
              : inv.content.bride_name
            const hadirStat = rsvpStats.find(
              (s) => s.invitationId === inv.id && s.attendance === 'hadir'
            )
            const totalTamuHadir = hadirStat?._sum.guestCount || 0

            return (
              <div
                key={inv.id}
                onClick={() => handleSelectInvitation(inv)}
                className="p-10 bg-white border border-rosegold/20 rounded-[2.5rem] cursor-pointer hover:border-rosegold transition-all hover:-translate-y-1 group shadow-sm hover:shadow-lg hover:shadow-rosegold/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                  <div className="space-y-6 flex-1 min-w-0">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-rosegold/10 text-rosegold text-[10px] font-bold uppercase tracking-widest rounded-lg border border-rosegold/20">
                        {categoryLabel(inv.template.category)}
                      </span>
                      <StatusBadge status={inv.status} />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-text-dark font-serif truncate group-hover:text-rosegold transition-colors tracking-tight leading-none">
                      {invitationName}
                    </h3>

                    <div className="flex flex-wrap gap-8 text-[11px] font-bold text-text-muted uppercase tracking-[0.2em]">
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
                  </div>

                  <div className="flex gap-12 lg:border-l border-rosegold/10 lg:pl-12">
                    {[
                      { label: 'Dilihat', value: (inv.viewCount || 0).toLocaleString() },
                      { label: 'RSVP', value: inv._count.rsvps },
                      { label: 'Tamu', value: totalTamuHadir },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center min-w-[70px]">
                        <div className="text-3xl font-bold text-rosegold font-serif leading-none tracking-tight">
                          {stat.value}
                        </div>
                        <div className="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-3">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
