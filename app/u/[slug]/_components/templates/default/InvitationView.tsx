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

    // Tambah wish baru dari form ke list tanpa reload
    function onWishAdded(wish: Wish) {
        setWishes(prev => [wish, ...prev])
    }

    // Envelope opening animation
    if (!opened) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center
                   bg-[#1a1008] cursor-pointer select-none overflow-hidden relative"
                onClick={() => setOpened(true)}
                style={{
                    background: 'linear-gradient(160deg, #1a1008 0%, #2d1f0e 50%, #1a1008 100%)',
                }}
            >
                {/* Decorative background */}
                <div className="absolute inset-0 opacity-10"
                     style={{
                         backgroundImage: `radial-gradient(circle at 20% 50%, #c8972a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c8972a 0%, transparent 40%)`,
                     }} />

                <div className="text-center animate-pulse-slow relative z-10 flex flex-col items-center">
                    {/* Cover photo for front page */}
                    {content.cover_photo ? (
                        <div className="relative mb-6 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-amber-200/30 shadow-2xl">
                            <Image
                                src={content.cover_photo}
                                alt="Foto pasangan"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
                        </div>
                    ) : (
                        <div className="text-7xl mb-6">💌</div>
                    )}

                    <p className="font-serif text-amber-200/80 text-sm md:text-base tracking-widest uppercase mb-4">
                        Undangan Pernikahan
                    </p>
                    
                    <h1 className="text-amber-100 leading-tight mb-8"
                        style={{
                            fontFamily: '"Playfair Display", Georgia, serif',
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontStyle: 'italic',
                        }}>
                        {content.bride_nickname || content.bride_name} & {content.groom_nickname || content.groom_name}
                    </h1>

                    {guestName ? (
                        <div className="mb-8">
                            <p className="text-amber-200/60 text-xs tracking-widest uppercase mb-2">Kepada Yth.</p>
                            <p className="text-amber-100 font-semibold text-xl tracking-wide">{guestName}</p>
                        </div>
                    ) : (
                         <div className="mb-8">
                            <p className="text-amber-200/60 text-xs tracking-widest uppercase mb-2">Kepada Yth.</p>
                            <p className="text-amber-100 font-semibold text-xl tracking-wide">Tamu Undangan</p>
                        </div>
                    )}

                    <div className="mt-6 flex flex-col items-center gap-2">
                        <div className="w-px h-8 bg-gradient-to-b from-amber-200/30 to-transparent"/>
                        <p className="text-amber-200/60 text-[10px] tracking-[0.3em] uppercase mt-2">
                            Ketuk untuk membuka
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#faf8f5]">
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

            {/* Footer */}
            <footer className="text-center py-10 text-stone-400 text-xs
                         tracking-wider border-t border-stone-200">
                <p>Dibuat dengan ❤️ menggunakan Undangan Digital</p>
            </footer>
        </main>
    )
}