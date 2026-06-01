'use client'

import { useState } from 'react'
import HeroSection from './HeroSection'
import ProfileSection from './ProfileSection'
import DetailSection from './DetailSection'
import GallerySection from './GallerySection'
import GiftSection from './GiftSection'
import RsvpSection from '../../RsvpSection'
import WishSection from '../../WishSection'
import AudioPlayer from '../../AudioPlayer'
import { Invitation, Wish } from '@/lib/types/invitation'

import Image from 'next/image'

type Props = {
    invitation: Invitation
    wishes: Wish[]
    guestName?: string | null
}

export function InvitationView({invitation, wishes: initialWishes, guestName}: Props) {
    const [wishes, setWishes] = useState<Wish[]>(initialWishes)
    const [opened, setOpened] = useState(false)
    const content = invitation.content

    function onWishAdded(wish: Wish) {
        setWishes(prev => [wish, ...prev])
    }

    if (!opened) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center cursor-pointer select-none relative overflow-hidden bg-emerald-950"
                onClick={() => setOpened(true)}
            >
                {/* Islamic Geometric Pattern Background Overlay */}
                <div className="absolute inset-0 z-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTIwIDBMMCAyMGwyMCAyMCAyMC0yMHptMCAxMkw4IDIwbDEyIDEyIDEyLTEyeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] bg-repeat" />

                {/* Elegant Border Frame */}
                <div className="absolute inset-4 border-2 border-amber-400/30 rounded-xl z-10 pointer-events-none" />
                <div className="absolute inset-5 border border-amber-400/20 rounded-lg z-10 pointer-events-none" />

                <div className="text-center relative z-20 flex flex-col items-center px-8">
                    {/* Bismillah Text or Icon */}
                    <p className="text-amber-400 font-arabic text-3xl mb-8 font-bold tracking-widest">
                        ﷽
                    </p>

                    <p className="text-emerald-200/60 text-[10px] tracking-[0.4em] uppercase mb-6">
                        Walimatul 'Ursy
                    </p>
                    
                    <h1 className="text-amber-400 leading-tight text-4xl md:text-5xl drop-shadow-lg"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        {content.bride_nickname || content.bride_name}
                    </h1>
                    
                    <div className="flex items-center gap-4 my-4">
                        <div className="w-12 h-px bg-amber-400/30" />
                        <span className="text-emerald-200/50 text-lg">&</span>
                        <div className="w-12 h-px bg-amber-400/30" />
                    </div>
                    
                    <h1 className="text-amber-400 leading-tight text-4xl md:text-5xl drop-shadow-lg"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        {content.groom_nickname || content.groom_name}
                    </h1>

                    <div className="mt-16 py-4 px-10 bg-emerald-900/50 border border-amber-400/20 rounded-full">
                        <p className="text-emerald-200/50 text-[10px] tracking-[0.3em] uppercase mb-1">Kepada Yth.</p>
                        <p className="text-amber-100 font-medium">{guestName || 'Bapak/Ibu/Saudara/i'}</p>
                    </div>

                    <div className="mt-12 animate-pulse text-amber-400/60 flex flex-col items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                        <p className="text-[9px] tracking-[0.3em] uppercase">Buka Undangan</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-emerald-50 text-emerald-950 selection:bg-amber-400/20 overflow-x-hidden">
            <AudioPlayer musicUrl={content.music_url} isOpened={opened} />
            <HeroSection content={content} eventDate={invitation.eventDate}/>
            <ProfileSection content={content} />
            <DetailSection content={content}/>
            {content.gallery && content.gallery.length > 0 && (
                <GallerySection photos={content.gallery}/>
            )}
            <GiftSection content={content} />
            <RsvpSection invitationId={invitation.id}/>
            <WishSection
                invitationId={invitation.id}
                wishes={wishes}
                onWishAdded={onWishAdded}
            />
            <footer className="text-center py-10 bg-emerald-950 text-amber-400/50 text-[10px] tracking-[0.3em] uppercase border-t border-amber-400/20">
                <p>Undangan Pernikahan Islami</p>
            </footer>
        </main>
    )
}
