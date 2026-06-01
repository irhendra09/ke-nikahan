import { notFound } from 'next/navigation'
import { InvitationView as DefaultTemplate } from '@/app/u/[slug]/_components/templates/default/InvitationView'
import { InvitationView as FloralTemplate } from '@/app/u/[slug]/_components/templates/floral/InvitationView'
import { InvitationView as FloralGardenTemplate } from '@/app/u/[slug]/_components/templates/floral-garden/InvitationView'
import { InvitationView as MinimalistTemplate } from '@/app/u/[slug]/_components/templates/minimalist/InvitationView'
import { InvitationView as CinematicTemplate } from '@/app/u/[slug]/_components/templates/cinematic/InvitationView'
import { InvitationView as IslamicTemplate } from '@/app/u/[slug]/_components/templates/islamic/InvitationView'
import { InvitationView as BaliTemplate } from '@/app/u/[slug]/_components/templates/bali/InvitationView'
import { InvitationView as ModernBlackTemplate } from '@/app/u/[slug]/_components/templates/modern-black/InvitationView'
import type { Metadata } from 'next'
import { InvitationContent, Invitation, Wish } from '@/lib/types/invitation'
import { prisma } from '@/lib/prisma'

type Props = { 
    params: Promise<{ slug: string }>,
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    return {
        title: `Demo Template ${slug} - KeNikahan`,
        description: `Preview template undangan digital ${slug}`,
    }
}

export default async function DemoPage({ params }: Props) {
    const { slug } = await params

    // Cek apakah template dengan slug ini ada di database
    const template = await prisma.template.findUnique({
        where: { slug }
    })

    if (!template) notFound()

    // Generate Dummy Data yang elegan
    const dummyContent: InvitationContent = {
        bride_name: "Juliet Capulet",
        bride_nickname: "Juliet",
        bride_father_name: "Bpk. Capulet",
        bride_mother_name: "Ibu Capulet",
        groom_name: "Romeo Montague",
        groom_nickname: "Romeo",
        groom_father_name: "Bpk. Montague",
        groom_mother_name: "Ibu Montague",
        quote: "Cinta sejati tidak pernah berjalan mulus.",
        quote_source: "William Shakespeare",
        akad_time: "08:00 - 10:00 WIB",
        reception_time: "11:00 - Selesai",
        venue_name: "Grand Ballroom, Verona Hotel",
        venue_address: "Jl. Cinta Abadi No. 123, Verona City, Italy",
        maps_url: "https://maps.google.com",
        gallery: [
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
        ],
        bank_name: "BCA",
        bank_account_number: "1234567890",
        bank_account_name: "Romeo Montague",
        cover_photo: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
        bride_photo: "https://images.unsplash.com/photo-1546823901-57e0f669db75?q=80&w=1974&auto=format&fit=crop",
        groom_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    }

    // Tanggal acara: 1 bulan dari sekarang
    const eventDate = new Date()
    eventDate.setMonth(eventDate.getMonth() + 1)

    const formattedInvitation: Invitation = {
        id: "demo-invitation-id",
        slug: `demo-${slug}`,
        status: "active",
        viewCount: 99,
        createdAt: new Date().toISOString(),
        eventDate: eventDate.toISOString(),
        expiresAt: null,
        content: dummyContent,
        template: { name: template.name, category: template.category },
        _count: { rsvps: 150, wishes: 3 },
    }

    const dummyWishes: Wish[] = [
        {
            id: "1",
            invitationId: "demo-invitation-id",
            name: "Mercutio",
            message: "Selamat menempuh hidup baru sahabatku Romeo! Semoga selalu bahagia selamanya.",
            createdAt: new Date().toISOString()
        },
        {
            id: "2",
            invitationId: "demo-invitation-id",
            name: "Benvolio",
            message: "Akhirnya kalian bersatu juga. Doa terbaik untuk kalian berdua.",
            createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
            id: "3",
            invitationId: "demo-invitation-id",
            name: "Tybalt",
            message: "Meski dulunya kita bermusuhan, kini kita adalah keluarga. Happy wedding!",
            createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
        }
    ]

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

    const SelectedTemplate = TemplateMap[slug] || DefaultTemplate

    return (
        <SelectedTemplate
            invitation={formattedInvitation}
            wishes={dummyWishes}
            guestName="Tamu Undangan VIP"
        />
    )
}
