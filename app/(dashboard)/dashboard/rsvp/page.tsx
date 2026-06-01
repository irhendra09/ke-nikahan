import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const metadata = {
  title: 'Monitoring RSVP - KeNikahan',
}

export default async function RsvpPage() {
  const session = await requireAuth()

  // Ambil semua undangan milik user beserta RSVP-nya
  const invitations = await prisma.invitation.findMany({
    where: { userId: session.userId },
    include: {
      rsvps: {
        orderBy: { createdAt: 'desc' }
      },
      template: true,
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white font-heading mb-2">Monitoring RSVP</h1>
        <p className="text-zinc-400 text-sm">Pantau daftar kehadiran tamu dari semua undangan Anda.</p>
      </div>

      <div className="space-y-10">
        {invitations.map((invitation) => {
          const totalRsvp = invitation.rsvps.length
          const hadir = invitation.rsvps.filter(r => r.attendance === 'hadir').reduce((acc, curr) => acc + curr.guestCount, 0)
          const tidakHadir = invitation.rsvps.filter(r => r.attendance === 'tidak_hadir').length
          const mungkin = invitation.rsvps.filter(r => r.attendance === 'mungkin').reduce((acc, curr) => acc + curr.guestCount, 0)

          return (
            <div key={invitation.id} className="bg-[#141417] border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-lg font-bold text-white font-heading">{invitation.template.name}</h2>
                  <p className="text-xs text-amber-500 font-mono mt-1">/{invitation.slug}</p>
                </div>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                    <p className="text-xs text-green-500 font-bold mb-0.5">Hadir</p>
                    <p className="text-lg font-bold text-white leading-none">{hadir} <span className="text-xs font-normal text-zinc-500">orang</span></p>
                  </div>
                  <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                    <p className="text-xs text-red-500 font-bold mb-0.5">Tidak</p>
                    <p className="text-lg font-bold text-white leading-none">{tidakHadir}</p>
                  </div>
                  <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                    <p className="text-xs text-amber-500 font-bold mb-0.5">Mungkin</p>
                    <p className="text-lg font-bold text-white leading-none">{mungkin} <span className="text-xs font-normal text-zinc-500">orang</span></p>
                  </div>
                </div>
              </div>

              {totalRsvp === 0 ? (
                <div className="text-center py-10">
                  <p className="text-zinc-500 text-sm">Belum ada tamu yang mengisi RSVP untuk undangan ini.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-zinc-300">
                    <thead className="text-xs uppercase bg-white/[0.03] text-zinc-500 font-bold">
                      <tr>
                        <th className="px-6 py-4 rounded-tl-xl">Nama Tamu</th>
                        <th className="px-6 py-4">No. HP</th>
                        <th className="px-6 py-4">Kehadiran</th>
                        <th className="px-6 py-4">Jml Tamu</th>
                        <th className="px-6 py-4 rounded-tr-xl">Waktu Isi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {invitation.rsvps.map((rsvp) => (
                        <tr key={rsvp.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 font-medium text-white">{rsvp.name}</td>
                          <td className="px-6 py-4">{rsvp.phone || '-'}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              rsvp.attendance === 'hadir' ? 'bg-green-500/20 text-green-400' :
                              rsvp.attendance === 'tidak_hadir' ? 'bg-red-500/20 text-red-400' :
                              'bg-amber-500/20 text-amber-400'
                            }`}>
                              {rsvp.attendance.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono">{rsvp.guestCount}</td>
                          <td className="px-6 py-4 text-xs text-zinc-500">
                            {format(new Date(rsvp.createdAt), 'dd MMM yyyy, HH:mm', { locale: id })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}

        {invitations.length === 0 && (
          <div className="text-center py-20 bg-[#141417] border border-white/10 rounded-3xl">
            <p className="text-zinc-500">Anda belum memiliki undangan.</p>
          </div>
        )}
      </div>
    </div>
  )
}
