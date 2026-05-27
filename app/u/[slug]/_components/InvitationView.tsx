'use client'

import { useState } from 'react'
import HeroSection from './HeroSection'
import DetailSection from './DetailSection'
import GallerySection from './GallerySection'
import RsvpSection from './RsvpSection'
import WishSection from './WishSection'
import { Invitation, Wish } from '@/lib/types/invitation'

type Props = {
    invitation: Invitation
    wishes: Wish[]
}

export function InvitationView({invitation, wishes: initialWishes}: Props) {
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
                   bg-[#1a1008] cursor-pointer select-none"
                onClick={() => setOpened(true)}
            >
                <div className="text-center animate-pulse-slow">
                    <div className="text-7xl mb-6">💌</div>
                    <p className="font-serif text-amber-200/80 text-lg tracking-widest
                        uppercase mb-2">
                        Undangan Pernikahan
                    </p>
                    <p className="text-amber-100/50 text-sm tracking-wider">
                        {content.bride_name} & {content.groom_name}
                    </p>
                    <div className="mt-10 flex flex-col items-center gap-2">
                        <div className="w-px h-8 bg-amber-200/30"/>
                        <p className="text-amber-200/60 text-xs tracking-[0.3em] uppercase">
                            Ketuk untuk membuka
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#faf8f5]">
            <HeroSection content={content} eventDate={invitation.event_date}/>
            <DetailSection content={content}/>
            {content.gallery?.length > 0 && (
                <GallerySection photos={content.gallery}/>
            )}
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