export interface InvitationContent {
    bride_name: string
    groom_name: string
    cover_photo?: string
    akad_time?: string
    reception_time?: string
    venue_name?: string
    venue_address?: string
    maps_url?: string
    quote?: string
    quote_source?: string
    gallery?: string[]
}

export interface Invitation {
    id: string
    slug: string
    content: InvitationContent
    event_date: string
    status: string
    templates?: {
        name: string
        category: string
    }
    view_count?: number
}

export interface Wish {
    id: string
    name: string
    message: string
    created_at: string
}
