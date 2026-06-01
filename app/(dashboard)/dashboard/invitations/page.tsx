import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { InvitationContent } from '@/lib/types/invitation'

export const metadata = {
  title: 'Daftar Undangan | KeNikahan Admin',
}

export default async function InvitationsPage() {
  const session = await requireAuth()

  // Cek role admin
  const profile = await prisma.profile.findUnique({
    where: { id: session.userId },
    select: { role: true },
  })

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  // Fetch semua undangan
  const invitations = await prisma.invitation.findMany({
    include: {
      template: { select: { name: true, category: true } },
      user: { select: { fullName: true, email: true } },
      _count: { select: { rsvps: true, wishes: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const statusColor: Record<string, string> = {
    active: 'bg-green-500/15 text-green-400 border-green-500/20',
    draft: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20',
    expired: 'bg-red-500/15 text-red-400 border-red-500/20',
  }

  const categoryLabel: Record<string, string> = {
    nikah: 'Nikah',
    ulang_tahun: 'Ulang Tahun',
    khitanan: 'Khitanan',
    lainnya: 'Lainnya',
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[11px] font-bold text-zinc-500 uppercase tracking-wider hover:text-amber-500 transition-colors"
          >
            ← Kembali ke Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight">
            Semua Undangan
          </h1>
          <p className="text-sm text-zinc-400">
            {invitations.length} undangan terdaftar di sistem
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: invitations.length, accent: '#c8972a' },
          { label: 'Aktif', value: invitations.filter(i => i.status === 'active').length, accent: '#22c55e' },
          { label: 'Draft', value: invitations.filter(i => i.status === 'draft').length, accent: '#71717a' },
          { label: 'Expired', value: invitations.filter(i => i.status === 'expired').length, accent: '#ef4444' },
        ].map((stat) => (
          <div key={stat.label} className="p-5 bg-black/20 border border-white/5 rounded-2xl">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <p className="text-2xl font-bold font-serif tracking-tight" style={{ color: stat.accent }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      {invitations.length === 0 ? (
        <div className="p-20 text-center bg-black/20 border border-dashed border-white/[0.06] rounded-[2rem]">
          <p className="text-zinc-500 text-sm">Belum ada undangan yang dibuat.</p>
        </div>
      ) : (
        <div className="bg-black/20 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Mempelai</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Pemilik</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Template</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Slug</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest text-center">RSVP</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Tanggal Acara</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Berlaku</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-600 uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {invitations.map((inv) => {
                  const content = inv.content as unknown as InvitationContent
                  const invName = content.groom_name
                    ? `${content.bride_name} & ${content.groom_name}`
                    : content.bride_name || '-'

                  return (
                    <tr key={inv.id} className="hover:bg-white/[0.01] transition-colors group">
                      {/* Mempelai */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[11px] font-black text-amber-500 shrink-0">
                            {(content.bride_name || '?').charAt(0)}
                          </div>
                          <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors truncate max-w-[180px]">
                            {invName}
                          </span>
                        </div>
                      </td>

                      {/* Pemilik */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="text-sm text-zinc-300 font-medium truncate max-w-[140px]">{inv.user.fullName || '-'}</p>
                          <p className="text-[10px] text-zinc-600 truncate max-w-[140px]">{inv.user.email}</p>
                        </div>
                      </td>

                      {/* Template */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="text-sm text-zinc-300 font-medium">{inv.template.name}</p>
                          <p className="text-[10px] text-zinc-600">{categoryLabel[inv.template.category] || inv.template.category}</p>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-6 py-5">
                        <span className="text-sm text-amber-500/60 font-mono italic">/{inv.slug}</span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColor[inv.status] || statusColor.draft}`}>
                          {inv.status}
                        </span>
                      </td>

                      {/* RSVP */}
                      <td className="px-6 py-5 text-center">
                        <span className="text-sm font-bold text-zinc-400">{inv._count.rsvps}</span>
                      </td>

                      {/* Tanggal Acara */}
                      <td className="px-6 py-5">
                        <span className="text-sm text-zinc-400">
                          {inv.eventDate
                            ? new Date(inv.eventDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                            : '-'}
                        </span>
                      </td>

                      {/* Berlaku */}
                      <td className="px-6 py-5">
                        <span className="text-sm text-zinc-500">
                          {inv.expiresAt
                            ? new Date(inv.expiresAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                            : '-'}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/dashboard/invitations/edit/${inv.id}`}
                            className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold text-amber-400 hover:bg-amber-500/20 transition-all"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/u/${inv.slug}`}
                            target="_blank"
                            className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-bold text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all"
                          >
                            Lihat
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
