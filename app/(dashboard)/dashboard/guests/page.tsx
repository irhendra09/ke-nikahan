import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { InvitationContent } from '@/lib/types/invitation'
import GuestForm from './_components/GuestForm'
import CopyMessageButton from './_components/CopyMessageButton'

export const metadata = {
  title: 'Buku Tamu - KeNikahan',
}

export default async function GuestsPage() {
  const session = await requireAuth()

  // Ambil semua undangan milik user beserta Guest-nya
  const invitations = await prisma.invitation.findMany({
    where: { userId: session.userId },
    include: {
      guests: {
        orderBy: { createdAt: 'desc' }
      },
      template: true,
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white font-heading mb-2">Buku Tamu (Guestbook)</h1>
        <p className="text-zinc-400 text-sm">Tambahkan nama tamu undangan secara manual untuk mendata kehadiran.</p>
      </div>

      <div className="space-y-10">
        {invitations.map((invitation) => (
          <div key={invitation.id} className="bg-[#141417] border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-white/5 pb-6">
              <div>
                <h2 className="text-lg font-bold text-white font-heading">{invitation.template.name}</h2>
                <p className="text-xs text-amber-500 font-mono mt-1">Total: {invitation.guests.length} Tamu Terdaftar</p>
              </div>
              <div className="w-full md:w-auto">
                <GuestForm invitationId={invitation.id} />
              </div>
            </div>

            {invitation.guests.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-zinc-500 text-sm">Belum ada daftar tamu manual untuk undangan ini.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-300">
                  <thead className="text-xs uppercase bg-white/[0.03] text-zinc-500 font-bold">
                    <tr>
                      <th className="px-6 py-4 rounded-tl-xl">Nama Tamu</th>
                      <th className="px-6 py-4">No. HP / WA</th>
                      <th className="px-6 py-4">Status Check-in</th>
                      <th className="px-6 py-4">Ditambahkan</th>
                      <th className="px-6 py-4 rounded-tr-xl">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {invitation.guests.map((guest) => (
                      <tr key={guest.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{guest.name}</td>
                        <td className="px-6 py-4">{guest.phone || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            guest.isCheckedIn ? 'bg-green-500/20 text-green-400' : 'bg-zinc-500/20 text-zinc-400'
                          }`}>
                            {guest.isCheckedIn ? 'Checked-In' : 'Belum Hadir'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-zinc-500">
                          {format(new Date(guest.createdAt), 'dd MMM yyyy', { locale: localeId })}
                        </td>
                        <td className="px-6 py-4">
                          <CopyMessageButton 
                            guestName={guest.name} 
                            invitationSlug={invitation.slug} 
                            content={invitation.content as unknown as InvitationContent} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}

        {invitations.length === 0 && (
          <div className="text-center py-20 bg-[#141417] border border-white/10 rounded-3xl">
            <p className="text-zinc-500">Anda belum memiliki undangan.</p>
          </div>
        )}
      </div>
    </div>
  )
}
