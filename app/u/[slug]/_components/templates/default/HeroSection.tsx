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
        <section
            className="relative min-h-screen flex flex-col items-center
                 justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(160deg, #1a1008 0%, #2d1f0e 50%, #1a1008 100%)',
            }}
        >
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-10"
                 style={{
                     backgroundImage: `radial-gradient(circle at 20% 50%,
               #c8972a 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, #c8972a 0%, transparent 40%)`,
                 }} />

            {/* Ornament top */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-40">
                <svg width="120" height="40" viewBox="0 0 120 40">
                    <path d="M0,20 Q30,0 60,20 Q90,40 120,20"
                          fill="none" stroke="#c8972a" strokeWidth="0.8"/>
                    <circle cx="60" cy="20" r="3" fill="#c8972a"/>
                    <circle cx="10" cy="20" r="1.5" fill="#c8972a"/>
                    <circle cx="110" cy="20" r="1.5" fill="#c8972a"/>
                </svg>
            </div>

            {/* Cover photo */}
            {content.cover_photo && (
                <div className="relative mb-8 w-48 h-48 rounded-full overflow-hidden
                        border-4 border-amber-200/30 shadow-2xl">
                    <Image
                        src={content.cover_photo}
                        alt="Foto pasangan"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                    <div className="absolute inset-0 rounded-full ring-1
                          ring-inset ring-white/10" />
                </div>
            )}

            {/* Nama */}
            <div className="text-center px-6 relative z-10">
                <p className="text-amber-300/60 text-xs tracking-[0.4em] uppercase mb-4">
                    Pernikahan
                </p>

                <h1 className="text-amber-100 leading-tight mb-3"
                    style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                        fontStyle: 'italic',
                    }}>
                    {content.bride_nickname || content.bride_name}
                </h1>

                <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="h-px w-16 bg-amber-500/40" />
                    <span className="text-amber-400/80 text-lg">&</span>
                    <div className="h-px w-16 bg-amber-500/40" />
                </div>

                <h1 className="text-amber-100 leading-tight"
                    style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                        fontStyle: 'italic',
                    }}>
                    {content.groom_nickname || content.groom_name}
                </h1>

                {/* Tanggal */}
                <p className="text-amber-200/50 text-sm tracking-widest mt-6
                      uppercase">
                    {eventDate ? new Date(eventDate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    }) : '—'}
                </p>
            </div>

            {/* Countdown */}
            <div className="flex gap-6 mt-12 relative z-10">
                {[
                    { label: 'Hari', value: countdown.days },
                    { label: 'Jam', value: countdown.hours },
                    { label: 'Menit', value: countdown.minutes },
                    { label: 'Detik', value: countdown.seconds },
                ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center
                            text-2xl font-semibold text-amber-100"
                             style={{
                                 background: 'rgba(200,151,42,0.15)',
                                 border: '1px solid rgba(200,151,42,0.3)',
                                 fontFamily: '"Playfair Display", Georgia, serif',
                             }}>
                            {String(value).padStart(2, '0')}
                        </div>
                        <p className="text-amber-400/50 text-xs mt-1.5 tracking-widest uppercase">
                            {label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2
                      flex flex-col items-center gap-2 animate-bounce">
                <p className="text-amber-200/30 text-xs tracking-[0.3em] uppercase">
                    Gulir ke bawah
                </p>
                <div className="w-px h-8 bg-gradient-to-b from-amber-200/30
                        to-transparent" />
            </div>
        </section>
    )
}