import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import type { Invitation, Rsvp, RsvpStat } from '@/lib/types/invitation'
import DashboardV2 from './_components/DashboardV2'
import UserDashboard from './_components/UserDashboard'

export default async function DashboardPage() {
  const session = await requireAuth()
  const userId = session.userId

  // Fetch user profile
  const profile = await prisma.profile.findUnique({
    where: { id: userId },
    select: { fullName: true, email: true, role: true },
  })

  const isAdmin = profile?.role === 'admin'

  // Filter: admin sees all, user sees own
  const queryFilter = isAdmin ? {} : { userId }

  // Fetch invitations with relations
  const invitations = await prisma.invitation.findMany({
    where: queryFilter,
    include: {
      template: true,
      _count: { select: { rsvps: true, wishes: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Fetch grouped RSVP stats per invitation
  const rsvpStats = await prisma.rsvp.groupBy({
    by: ['invitationId', 'attendance'],
    where: { invitation: queryFilter },
    _sum: { guestCount: true },
    _count: { id: true },
  })

  // Serialise dates
  const serializedInvitations: Invitation[] = invitations.map((inv) => ({
    id: inv.id,
    slug: inv.slug,
    status: inv.status,
    viewCount: inv.viewCount,
    createdAt: inv.createdAt.toISOString(),
    eventDate: inv.eventDate?.toISOString() || null,
    expiresAt: inv.expiresAt?.toISOString() || null,
    content: inv.content as unknown as Invitation['content'],
    template: { name: inv.template.name, category: inv.template.category },
    _count: inv._count,
  }))

  // ── User Dashboard ──────────────────────────────────────────
  if (!isAdmin) {
    return (
      <UserDashboard
        profile={profile}
        invitations={serializedInvitations}
        rsvpStats={rsvpStats as unknown as RsvpStat[]}
      />
    )
  }

  // ── Admin Dashboard ─────────────────────────────────────────

  // Fetch recent RSVPs (admin only)
  const recentRsvps = await prisma.rsvp.findMany({
    where: { invitation: queryFilter },
    include: {
      invitation: { select: { content: true, slug: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })

  const serializedRecentRsvps: Rsvp[] = recentRsvps.map((rsvp) => ({
    id: rsvp.id,
    invitationId: rsvp.invitationId,
    name: rsvp.name,
    phone: rsvp.phone,
    guestCount: rsvp.guestCount,
    attendance: rsvp.attendance,
    createdAt: rsvp.createdAt.toISOString(),
    invitation: rsvp.invitation ? { slug: rsvp.invitation.slug } : undefined,
  }))

  return (
    <DashboardV2
      profile={profile}
      invitations={serializedInvitations}
      recentRsvps={serializedRecentRsvps}
      rsvpStats={rsvpStats as unknown as RsvpStat[]}
    />
  )
}

