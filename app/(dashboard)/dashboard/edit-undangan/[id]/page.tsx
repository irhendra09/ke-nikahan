import { notFound, redirect } from 'next/navigation'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import InvitationForm from '../../invitations/_components/InvitationForm'
import { updateInvitationByUser } from '../../invitations/actions'
import Link from 'next/link'
import { InvitationContent } from '@/lib/types/invitation'

export const metadata = {
  title: 'Edit Undangan Saya | KeNikahan',
}

type Props = { params: Promise<{ id: string }> }

export default async function UserEditInvitationPage({ params }: Props) {
  const session = await requireAuth()
  const { id } = await params

  // Ambil data undangan — pastikan milik user ini
  const invitation = await prisma.invitation.findUnique({
    where: { id },
    include: { template: { select: { name: true, category: true } } },
  })

  if (!invitation) {
    notFound()
  }

  // RBAC: Pastikan undangan milik user yang login
  if (invitation.userId !== session.userId) {
    redirect('/dashboard')
  }

  // Format data awal untuk form
  const initialData = {
    slug: invitation.slug,
    templateId: invitation.templateId,
    status: invitation.status,
    eventDate: invitation.eventDate?.toISOString() || null,
    content: invitation.content as unknown as InvitationContent,
  }

  // Info read-only untuk ditampilkan di form
  const readOnlyInfo = {
    slug: invitation.slug,
    templateName: invitation.template.name,
    status: invitation.status,
    expiresAt: invitation.expiresAt?.toISOString() || null,
  }

  // Bind ID ke action
  const updateAction = updateInvitationByUser.bind(null, id)

  return (
    <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-rosegold/10 pb-8">
        <div className="space-y-4">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[11px] font-bold text-text-muted uppercase tracking-wider hover:text-rosegold transition-colors"
          >
            ← Kembali ke Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark font-serif tracking-tight">
            Edit Undangan
          </h1>
          <p className="text-sm text-text-muted">
            Perbarui informasi undangan Anda. Perubahan akan langsung terlihat di halaman publik.
          </p>
        </div>
        
        <Link
          href={`/u/${invitation.slug}`}
          target="_blank"
          className="px-6 py-3 rounded-xl border border-rosegold/20 bg-white text-[13px] font-bold text-text-dark hover:bg-rosegold/5 transition-all"
        >
          Lihat Halaman Publik
        </Link>
      </div>

      <InvitationForm 
        action={updateAction} 
        templates={[]} 
        initialData={initialData}
        isEditing={true}
        isUserMode={true}
        readOnlyInfo={readOnlyInfo}
      />
    </div>
  )
}
