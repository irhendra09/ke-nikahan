import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
    invitationId: z.string(),
    name: z.string().min(1),
    phone: z.string().optional(),
    guestCount: z.number().min(1).max(10),
    attendance: z.enum(['hadir', 'tidak_hadir', 'mungkin']),
})

export async function POST(req: NextRequest) {
    const parsed = schema.safeParse(await req.json())
    if (!parsed.success) {
        return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 })
    }

    const invitation = await prisma.invitation.findUnique({
        where: { id: parsed.data.invitationId, status: 'active' },
        select: { id: true },
    })

    if (!invitation) {
        return NextResponse.json({ error: 'Undangan tidak ditemukan' }, { status: 404 })
    }

    const rsvp = await prisma.rsvp.create({ data: parsed.data })
    return NextResponse.json(rsvp, { status: 201 })
}

// GET — ambil RSVP untuk dashboard (butuh auth)
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const invitationId = searchParams.get('invitationId')
    if (!invitationId) {
        return NextResponse.json({ error: 'invitationId required' }, { status: 400 })
    }

    const rsvps = await prisma.rsvp.findMany({
        where: { invitationId },
        orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(rsvps)
}