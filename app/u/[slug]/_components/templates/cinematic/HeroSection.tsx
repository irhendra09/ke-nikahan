import { useEffect, useState } from 'react'
import Image from 'next/image'
import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
    eventDate: string | null
}

function useCountdown(targetDate: string) {
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        function calculate() {
            const diff = new Date(targetDate).getTime() - Date.now()
            if (diff <= 0) return setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            setTime({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
            })
        }
        calculate()
        const id = setInterval(calculate, 1000)
        return () => clearInterval(id)
    }, [targetDate])

    return time
}

export default function HeroSection({ content, eventDate }: Props) {
    const countdown = useCountdown(eventDate || '')

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-950">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={content.cover_photo || 'https://rubykreator7.com/wp-content/uploads/2025/07/c-3-scaled.jpeg'}
                    alt="Hero Background"
                    fill
                    className="object-cover object-center opacity-50"
                    unoptimized
                />
            </div>

            {/* Gradient Mask to blend with below sections */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-neutral-950/80 to-neutral-950" />

            {/* Content Layer */}
            <div className="relative z-20 text-center w-full max-w-2xl px-6 flex flex-col items-center">
                <div className="w-16 h-px bg-white/30 mb-8" />

                <h1 className="text-white text-4xl md:text-6xl mb-4 tracking-wider"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 300 }}>
                    {content.bride_name}
                </h1>

                <p className="text-white/40 text-xl md:text-2xl italic font-serif my-2">&</p>

                <h1 className="text-white text-4xl md:text-6xl mb-12 tracking-wider"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 300 }}>
                    {content.groom_name}
                </h1>

                <div className="w-16 h-px bg-white/30 mb-12" />

                <p className="text-white/80 text-sm md:text-base tracking-[0.3em] uppercase mb-16 font-light">
                    {eventDate ? new Date(eventDate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    }) : '—'}
                </p>

                {/* Countdown Grid */}
                <div className="grid grid-cols-4 gap-4 md:gap-8 w-full max-w-lg">
                    {[
                        { label: 'Days', value: countdown.days },
                        { label: 'Hours', value: countdown.hours },
                        { label: 'Mins', value: countdown.minutes },
                        { label: 'Secs', value: countdown.seconds },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                            <span className="text-2xl md:text-4xl text-white mb-2 tabular-nums font-light"
                                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                                {String(value).padStart(2, '0')}
                            </span>
                            <p className="text-white/40 text-[9px] tracking-[0.2em] uppercase">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
