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

export function InvitationView({ invitation, wishes: initialWishes, guestName }: Props) {
    const [wishes, setWishes] = useState<Wish[]>(initialWishes)
    const [opened, setOpened] = useState(false)
    const content = invitation.content

    function onWishAdded(wish: Wish) {
        setWishes(prev => [wish, ...prev])
    }

    if (!opened) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center cursor-pointer select-none relative overflow-hidden"
                onClick={() => setOpened(true)}
            >
                {/* Full screen Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={content.cover_photo || 'https://rubykreator7.com/wp-content/uploads/2025/07/c-3-scaled.jpeg'}
                        alt="Background Sampul"
                        fill
                        className="object-cover object-center scale-105 animate-[slow-zoom_20s_ease-in-out_infinite_alternate]"
                        priority
                        unoptimized
                    />
                </div>

                {/* Dark Vignette/Gradient Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/80" />

                <div className="text-center relative z-20 flex flex-col items-center px-8 w-full max-w-lg">
                    <p className="text-white/60 text-[10px] tracking-[0.6em] uppercase mb-10 border-b border-white/20 pb-4 w-full">
                        Undangan Pernikahan
                    </p>

                    <h1 className="text-white leading-tight text-5xl md:text-6xl drop-shadow-2xl"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic', fontWeight: 300 }}>
                        {content.bride_nickname || content.bride_name}
                    </h1>

                    <p className="text-white/50 text-xl font-light italic my-4 drop-shadow-md">&</p>

                    <h1 className="text-white leading-tight text-5xl md:text-6xl drop-shadow-2xl"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic', fontWeight: 300 }}>
                        {content.groom_nickname || content.groom_name}
                    </h1>

                    <div className="mt-16 w-full p-6 backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl shadow-2xl">
                        <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-2">Kepada Yth.</p>
                        <p className="text-white font-medium text-lg tracking-wide">{guestName || 'Tamu Kehormatan'}</p>
                    </div>

                    <div className="mt-10 flex flex-col items-center gap-3">
                        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent animate-bounce" />
                        <p className="text-white/70 text-[9px] tracking-[0.4em] uppercase font-bold drop-shadow-md">
                            Buka Undangan
                        </p>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes slow-zoom {
                        0% { transform: scale(1); }
                        100% { transform: scale(1.15); }
                    }
                `}</style>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-neutral-950 text-white selection:bg-white/20 overflow-x-hidden">
            <AudioPlayer musicUrl={content.music_url} isOpened={opened} />
            <HeroSection content={content} eventDate={invitation.eventDate} />
            <ProfileSection content={content} />
            <DetailSection content={content} />
            {content.gallery && content.gallery.length > 0 && (
                <GallerySection photos={content.gallery} />
            )}
            <GiftSection content={content} />

            <div className="bg-neutral-900 border-t border-white/10">
                <RsvpSection invitationId={invitation.id} />
                <WishSection
                    invitationId={invitation.id}
                    wishes={wishes}
                    onWishAdded={onWishAdded}
                />
            </div>

            <footer className="text-center py-12 bg-neutral-950 text-neutral-500 text-[10px] tracking-[0.4em] uppercase border-t border-white/5">
                <p>Cinematic Wedding Experience</p>
            </footer>
        </main>
    )
}
