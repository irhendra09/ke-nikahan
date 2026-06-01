import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const invitationId = searchParams.get("id")

        if (!invitationId) {
            return NextResponse.json({ error: "Missing invitation ID" }, { status: 400 })
        }

        // Fetch user profile to check role
        const profile = await prisma.profile.findUnique({
            where: { id: session.userId },
            select: { role: true }
        })

        // Admin can see any invitation, regular users can only see their own
        const queryFilter = profile?.role === 'admin' 
            ? { id: invitationId }
            : { id: invitationId, userId: session.userId }

        // Verify ownership
        const invitation = await prisma.invitation.findUnique({
            where: queryFilter
        })

        if (!invitation) {
            return NextResponse.json({ error: "Not found" }, { status: 404 })
        }

        // Fetch RSVPs and Wishes
        const [rsvps, wishes] = await Promise.all([
            prisma.rsvp.findMany({
                where: { invitationId },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.wish.findMany({
                where: { invitationId },
                orderBy: { createdAt: 'desc' }
            })
        ])

        return NextResponse.json({
            rsvps: rsvps.map(r => ({ ...r, createdAt: r.createdAt.toISOString() })),
            wishes: wishes.map(w => ({ ...w, createdAt: w.createdAt.toISOString() }))
        })
    } catch (error) {
        console.error("Fetch details error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
