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
                className="min-h-screen flex flex-col items-center justify-center bg-[#fdfbf7] cursor-pointer select-none overflow-hidden relative"
                onClick={() => setOpened(true)}
            >
                <div className="text-center relative z-10 flex flex-col items-center px-8">
                    {content.cover_photo ? (
                        <div className="relative mb-8 w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-rose-100 shadow-lg">
                            <Image
                                src={content.cover_photo}
                                alt="Foto pasangan"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    ) : (
                        <div className="mb-8 w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center">
                            <span className="text-rose-300 text-3xl">♥</span>
                        </div>
                    )}

                    <p className="text-rose-400/80 text-[10px] tracking-[0.4em] uppercase mb-4 font-medium">
                        The Wedding Of
                    </p>
                    
                    <h1 className="text-zinc-700 leading-tight mb-6"
                        style={{
                            fontFamily: '"Playfair Display", Georgia, serif',
                            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                            fontStyle: 'italic',
                            fontWeight: 400,
                        }}>
                        {content.bride_nickname || content.bride_name}
                        <span className="block text-rose-300 text-lg my-2 not-italic">&</span>
                        {content.groom_nickname || content.groom_name}
                    </h1>

                    <div className="w-12 h-px bg-rose-200 mb-6" />

                    <div className="mb-10">
                        <p className="text-zinc-400 text-[10px] tracking-[0.3em] uppercase mb-1.5">Kepada Yth.</p>
                        <p className="text-zinc-700 font-medium text-lg">{guestName || 'Tamu Undangan'}</p>
                    </div>

                    <p className="text-rose-400/60 text-[10px] tracking-[0.3em] uppercase animate-pulse">
                        Ketuk untuk membuka
                    </p>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#fdfbf7] text-zinc-800 selection:bg-rose-100 overflow-x-hidden">
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
            <footer className="text-center py-8 bg-[#fdfbf7] text-zinc-400 text-[11px] tracking-wider border-t border-rose-100/50">
                <p>Dibuat dengan ♥ menggunakan Undangan Digital</p>
            </footer>
        </main>
    )
}
