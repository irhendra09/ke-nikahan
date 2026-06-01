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
                className="min-h-screen flex flex-col items-center justify-center bg-white cursor-pointer select-none relative"
                onClick={() => setOpened(true)}
            >
                {/* Minimal geometric accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-neutral-900" />

                <div className="text-center flex flex-col items-center px-8 max-w-sm">
                    
                    {content.cover_photo ? (
                        <div className="relative mb-10 w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                            <Image
                                src={content.cover_photo}
                                alt="Foto pasangan"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    ) : (
                        <div className="mb-10 w-16 h-px bg-neutral-300" />
                    )}

                    <p className="text-neutral-400 text-[10px] tracking-[0.5em] uppercase mb-6">
                        Wedding
                    </p>
                    
                    <h1 className="text-neutral-900 leading-tight mb-2 text-3xl md:text-4xl tracking-tight"
                        style={{ fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 300 }}>
                        {content.bride_nickname || content.bride_name}
                    </h1>
                    <p className="text-neutral-300 text-xs my-3">&</p>
                    <h1 className="text-neutral-900 leading-tight text-3xl md:text-4xl tracking-tight"
                        style={{ fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 300 }}>
                        {content.groom_nickname || content.groom_name}
                    </h1>

                    <div className="w-8 h-px bg-neutral-200 my-10" />

                    <div className="mb-12">
                        <p className="text-neutral-400 text-[9px] tracking-[0.4em] uppercase mb-1">Kepada</p>
                        <p className="text-neutral-800 text-sm font-light">{guestName || 'Tamu Undangan'}</p>
                    </div>

                    <div className="flex items-center gap-3 text-neutral-400">
                        <div className="w-3 h-px bg-neutral-300" />
                        <p className="text-[9px] tracking-[0.4em] uppercase">Buka</p>
                        <div className="w-3 h-px bg-neutral-300" />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-900" />
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-white text-neutral-800 selection:bg-neutral-200 overflow-x-hidden">
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
            <footer className="text-center py-10 bg-white text-neutral-300 text-[10px] tracking-[0.3em] uppercase border-t border-neutral-100">
                <p>Undangan Digital</p>
            </footer>
        </main>
    )
}
