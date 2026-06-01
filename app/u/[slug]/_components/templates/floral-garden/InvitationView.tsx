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
                className="min-h-screen flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden relative"
                onClick={() => setOpened(true)}
                style={{ background: 'linear-gradient(180deg, #f5f0e6 0%, #e8e0d0 100%)' }}
            >
                {/* Leaf decorations */}
                <div className="absolute top-8 left-8 text-[#8a9a6c]/20 pointer-events-none">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"></path></svg>
                </div>
                <div className="absolute bottom-8 right-8 text-[#8a9a6c]/20 pointer-events-none rotate-180">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"></path></svg>
                </div>

                <div className="text-center relative z-10 flex flex-col items-center px-8">
                    {content.cover_photo ? (
                        <div className="relative mb-8 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/60 shadow-lg">
                            <Image
                                src={content.cover_photo}
                                alt="Foto pasangan"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    ) : (
                        <div className="mb-8 w-20 h-20 rounded-full bg-[#8a9a6c]/10 flex items-center justify-center">
                            <span className="text-[#8a9a6c] text-3xl">🌿</span>
                        </div>
                    )}

                    <p className="text-[#8a9a6c] text-[10px] tracking-[0.4em] uppercase mb-5 font-medium">
                        Wedding Invitation
                    </p>
                    
                    <h1 className="text-[#4a4035] leading-tight mb-6"
                        style={{
                            fontFamily: '"Playfair Display", Georgia, serif',
                            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                            fontWeight: 400,
                        }}>
                        {content.bride_nickname || content.bride_name}
                        <span className="block text-[#8a9a6c] text-base my-2">&</span>
                        {content.groom_nickname || content.groom_name}
                    </h1>

                    <div className="w-16 h-px bg-[#8a9a6c]/30 mb-6" />

                    <div className="mb-10">
                        <p className="text-[#8a9a6c]/60 text-[10px] tracking-[0.3em] uppercase mb-1.5">Kepada Yth.</p>
                        <p className="text-[#4a4035] font-medium text-lg">{guestName || 'Tamu Undangan'}</p>
                    </div>

                    <p className="text-[#8a9a6c]/50 text-[10px] tracking-[0.3em] uppercase animate-pulse">
                        Ketuk untuk membuka
                    </p>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#f5f0e6] text-[#4a4035] selection:bg-[#8a9a6c]/20 overflow-x-hidden">
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
            <footer className="text-center py-8 bg-[#f5f0e6] text-[#8a9a6c]/50 text-[11px] tracking-wider border-t border-[#8a9a6c]/10">
                <p>Dibuat dengan 🌿 menggunakan Undangan Digital</p>
            </footer>
        </main>
    )
}
