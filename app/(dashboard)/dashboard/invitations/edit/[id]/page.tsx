import { notFound, redirect } from 'next/navigation'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import InvitationForm from '../../_components/InvitationForm'
import { updateInvitation } from '../../actions'
import Link from 'next/link'
import { InvitationContent } from '@/lib/types/invitation'

export const metadata = {
  title: 'Edit Undangan | KeNikahan',
}

type Props = { params: Promise<{ id: string }> }

export default async function EditInvitationPage({ params }: Props) {
  const session = await requireAuth()
  const { id } = await params

  // Ambil profile untuk cek role
  const profile = await prisma.profile.findUnique({
    where: { id: session.userId },
  })

  // RBAC: Hanya admin yang boleh mengedit
  if (profile?.role !== 'admin') {
    redirect('/dashboard/rsvp')
  }

  // Ambil data undangan
  const invitation = await prisma.invitation.findUnique({
    where: { id },
  })

  if (!invitation) {
    notFound()
  }

  // Ambil daftar template
  const templates = await prisma.template.findMany({
    where: { isActive: true },
    select: { id: true, name: true, category: true },
    orderBy: { name: 'asc' }
  })

  // Format data awal untuk form
  const initialData = {
    slug: invitation.slug,
    templateId: invitation.templateId,
    status: invitation.status,
    eventDate: invitation.eventDate?.toISOString() || null,
    content: invitation.content as unknown as InvitationContent,
  }

  // Bind ID ke action
  const updateInvitationWithId = updateInvitation.bind(null, id)

  return (
    <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
        <div className="space-y-4">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[11px] font-bold text-zinc-500 uppercase tracking-wider hover:text-amber-500 transition-colors"
          >
            ← Kembali ke Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight">
            Edit Undangan
          </h1>
          <p className="text-sm text-zinc-400">
            Perbarui informasi undangan Anda. Perubahan akan langsung terlihat di halaman publik.
          </p>
        </div>
        
        <Link
          href={`/u/${invitation.slug}`}
          target="_blank"
          className="px-6 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-[13px] font-bold text-white hover:bg-white/[0.06] transition-all"
        >
          Lihat Halaman Publik
        </Link>
      </div>

      <InvitationForm 
        action={updateInvitationWithId} 
        templates={templates} 
        initialData={initialData}
        isEditing={true}
      />
    </div>
  )
}
