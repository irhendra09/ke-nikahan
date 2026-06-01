import { notFound } from 'next/navigation'
import { InvitationView as DefaultTemplate } from './_components/templates/default/InvitationView'
import { InvitationView as FloralTemplate } from './_components/templates/floral/InvitationView'
import { InvitationView as FloralGardenTemplate } from './_components/templates/floral-garden/InvitationView'
import { InvitationView as MinimalistTemplate } from './_components/templates/minimalist/InvitationView'
import { InvitationView as CinematicTemplate } from './_components/templates/cinematic/InvitationView'
import { InvitationView as IslamicTemplate } from './_components/templates/islamic/InvitationView'
import { InvitationView as BaliTemplate } from './_components/templates/bali/InvitationView'
import { InvitationView as ModernBlackTemplate } from './_components/templates/modern-black/InvitationView'
import type { Metadata } from 'next'
import { InvitationContent, Invitation, Wish } from '@/lib/types/invitation'
import { prisma } from '@/lib/prisma'

type Props = { 
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Generate meta tag dinamis per undangan
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params

    const invitation = await prisma.invitation.findUnique({
        where: { 
            slug,
            status: 'active'
        },
        select: {
            content: true
        }
    })

    if (!invitation) return { title: 'Undangan Digital' }

    const content = invitation.content as unknown as InvitationContent
    return {
        title: `Undangan ${content.bride_name} & ${content.groom_name}`,
        description: `Kami mengundang kehadiran Anda`,
        openGraph: {
            images: content.cover_photo ? [content.cover_photo] : [],
        },
    }
}

export default async function InvitationPage({ params, searchParams }: Props) {
    const { slug } = await params
    const resolvedSearchParams = await searchParams
    const to = resolvedSearchParams.to
    const guestName = typeof to === 'string' ? to : (Array.isArray(to) ? to[0] : null)

    // Fetch undangan + relasi sekaligus
    const invitation = await prisma.invitation.findUnique({
        where: { 
            slug,
            status: 'active'
        },
        include: {
            template: {
                select: {
                    slug: true,
                    name: true,
                    category: true
                }
            },
            wishes: {
                where: {
                    isApproved: true
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 20
            }
        }
    })

    if (!invitation) notFound()

    // Increment view count (fire and forget pattern in Prisma)
    prisma.invitation.update({
        where: { id: invitation.id },
        data: { viewCount: { increment: 1 } }
    }).catch(err => console.error('Failed to increment view count:', err))

    // Map Prisma result to existing Invitation type if necessary
    const formattedInvitation: Invitation = {
        id: invitation.id,
        slug: invitation.slug,
        status: invitation.status,
        viewCount: invitation.viewCount,
        createdAt: invitation.createdAt.toISOString(),
        eventDate: invitation.eventDate?.toISOString() || null,
        expiresAt: invitation.expiresAt?.toISOString() || null,
        content: invitation.content as unknown as InvitationContent,
        template: { name: invitation.template.name, category: invitation.template.category },
        _count: { rsvps: 0, wishes: invitation.wishes.length },
    }

    const formattedWishes: Wish[] = invitation.wishes.map(w => ({
        id: w.id,
        invitationId: w.invitationId,
        name: w.name,
        message: w.message,
        createdAt: w.createdAt.toISOString(),
    }))

    const TemplateMap: Record<string, React.ElementType> = {
        'default': DefaultTemplate,
        'floral': FloralTemplate,
        'floral-garden': FloralGardenTemplate,
        'minimalist': MinimalistTemplate,
        'cinematic': CinematicTemplate,
        'islamic': IslamicTemplate,
        'bali': BaliTemplate,
        'modern-black': ModernBlackTemplate,
    }

    const SelectedTemplate = TemplateMap[invitation.template.slug] || DefaultTemplate

    return (
        <SelectedTemplate
            invitation={formattedInvitation}
            wishes={formattedWishes}
            guestName={guestName}
        />
    )
}