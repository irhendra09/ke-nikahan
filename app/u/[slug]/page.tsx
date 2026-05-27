import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import {InvitationView} from './_components/InvitationView'
import type { Metadata } from 'next'
import { Invitation, InvitationContent } from '@/lib/types/invitation'

type Props = { params: Promise<{ slug: string }> }

// Generate meta tag dinamis per undangan
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const supabase = await createClient()

    const { data } = await supabase
        .from('invitations')
        .select('content')
        .eq('slug', slug)
        .eq('status', 'active')
        .single()

    if (!data) return { title: 'Undangan Digital' }

    const content = data.content as unknown as InvitationContent
    return {
        title: `Undangan ${content.bride_name} & ${content.groom_name}`,
        description: `Kami mengundang kehadiran Anda`,
        openGraph: {
            images: content.cover_photo ? [content.cover_photo] : [],
        },
    }
}

export default async function InvitationPage({ params }: Props) {
    const { slug } = await params
    const supabase = await createClient()

    // Fetch undangan + relasi sekaligus
    const { data: invitationData } = await supabase
        .from('invitations')
        .select(`
      id,
      slug,
      content,
      event_date,
      status,
      view_count,
      templates ( name, category )
    `)
        .eq('slug', slug)
        .eq('status', 'active')
        .single()

    if (!invitationData) notFound()

    const invitation = invitationData as unknown as Invitation

    // Fetch wishes yang approved
    const { data: wishes } = await supabase
        .from('wishes')
        .select('id, name, message, created_at')
        .eq('invitation_id', invitation.id)
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .limit(20)

    // Increment view count (fire and forget)
    supabase
        .from('invitations')
        .update({ view_count: (invitation.view_count || 0) + 1 })
        .eq('id', invitation.id)
        .then(() => {})

    return (
        <InvitationView
            invitation={invitation}
            wishes={wishes ?? []}
        />
    )
}