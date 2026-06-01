/**
 * Shared types for the KeNikahan platform.
 *
 * These mirror Prisma models but represent the *serialised*
 * shape sent from Server → Client components (dates as ISO strings).
 */

// ── Invitation ────────────────────────────────────────────────

export interface InvitationContent {
  bride_name: string
  bride_nickname?: string
  bride_father_name?: string
  bride_mother_name?: string
  bride_photo?: string
  groom_name?: string
  groom_nickname?: string
  groom_father_name?: string
  groom_mother_name?: string
  groom_photo?: string
  cover_photo?: string
  music_url?: string
  akad_time?: string
  reception_time?: string
  venue_name?: string
  venue_address?: string
  maps_url?: string
  quote?: string
  quote_source?: string
  gallery?: string[]
  bank_name?: string
  bank_account_name?: string
  bank_account_number?: string
}

export interface Invitation {
  id: string
  slug: string
  status: string
  eventDate: string | null
  viewCount: number
  createdAt: string
  expiresAt: string | null
  template: { name: string; category: string }
  content: InvitationContent
  _count: { rsvps: number; wishes: number }
}

// ── RSVP ──────────────────────────────────────────────────────

export interface Rsvp {
  id: string
  invitationId: string
  name: string
  phone: string | null
  guestCount: number
  attendance: string
  createdAt: string
  invitation?: { slug: string }
}

// ── Wish ──────────────────────────────────────────────────────

export interface Wish {
  id: string
  invitationId: string
  name: string
  message: string
  createdAt: string
}

// ── Aggregated stats returned by Prisma groupBy ───────────────

export interface RsvpStat {
  invitationId: string
  attendance: string
  _sum: { guestCount: number | null }
  _count: { id: number }
}

// ── Dashboard page props ──────────────────────────────────────

export interface DashboardProps {
  profile: { fullName: string | null; email: string } | null
  invitations: Invitation[]
  recentRsvps: Rsvp[]
  rsvpStats: RsvpStat[]
}
