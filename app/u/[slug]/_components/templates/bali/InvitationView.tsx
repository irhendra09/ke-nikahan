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
                className="min-h-screen flex flex-col items-center justify-center cursor-pointer select-none relative overflow-hidden bg-orange-950"
                onClick={() => setOpened(true)}
            >
                {/* Balinese Pattern Overlay (Subtle) */}
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] bg-repeat" />

                {/* Ornate Frame */}
                <div className="absolute inset-4 border-4 border-double border-amber-600/40 rounded-sm z-10 pointer-events-none" />
                
                <div className="text-center relative z-20 flex flex-col items-center px-8">
                    
                    <div className="w-24 h-24 mb-8 bg-amber-600/20 rotate-45 border border-amber-500 flex items-center justify-center p-2">
                        <div className="w-full h-full border border-amber-500/50 flex items-center justify-center">
                            <span className="text-amber-500 -rotate-45 font-serif text-2xl">ॐ</span>
                        </div>
                    </div>

                    <p className="text-amber-500/80 text-[10px] tracking-[0.5em] uppercase mb-6 font-semibold">
                        Pawiwahan
                    </p>
                    
                    <h1 className="text-amber-500 leading-tight text-4xl md:text-5xl"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        {content.bride_nickname || content.bride_name}
                    </h1>
                    
                    <div className="flex items-center gap-4 my-6">
                        <div className="w-10 h-px bg-amber-600/50" />
                        <span className="text-amber-700 text-xl font-serif">&</span>
                        <div className="w-10 h-px bg-amber-600/50" />
                    </div>
                    
                    <h1 className="text-amber-500 leading-tight text-4xl md:text-5xl"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        {content.groom_nickname || content.groom_name}
                    </h1>

                    <div className="mt-16 py-5 px-10 bg-orange-900/80 border-t border-b border-amber-600/50 text-center w-full max-w-xs">
                        <p className="text-amber-500/60 text-[10px] tracking-[0.3em] uppercase mb-2">Matur Piuning</p>
                        <p className="text-amber-100 font-medium text-lg">{guestName || 'Tamu Undangan'}</p>
                    </div>

                    <div className="mt-12 animate-bounce text-amber-600 flex flex-col items-center gap-2">
                        <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-amber-500">Buka Undangan</p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-orange-50 text-orange-950 selection:bg-amber-600/20 overflow-x-hidden">
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
            <footer className="text-center py-10 bg-orange-950 text-amber-600/50 text-[10px] tracking-[0.4em] uppercase border-t border-amber-600/20">
                <p>Tradisi & Budaya</p>
            </footer>
        </main>
    )
}
