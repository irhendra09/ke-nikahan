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
        <section className="relative py-24 px-6 flex flex-col items-center bg-white overflow-hidden">
            {/* Subtle gradient blobs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-50 rounded-full blur-3xl opacity-50 -translate-y-1/3 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-50 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            {/* Cover photo */}
            {content.cover_photo && (
                <div className="relative mb-10 w-44 h-56 rounded-[2rem] overflow-hidden shadow-lg shadow-rose-900/5 z-10">
                    <Image
                        src={content.cover_photo}
                        alt="Foto pasangan"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            )}

            {/* Names */}
            <div className="text-center relative z-10 max-w-md w-full">
                <p className="text-rose-400/70 text-[10px] tracking-[0.4em] uppercase mb-6 font-medium">
                    Pernikahan
                </p>

                <h1 className="text-zinc-700 leading-snug mb-1"
                    style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                    }}>
                    {content.bride_nickname || content.bride_name}
                </h1>

                <div className="flex items-center justify-center gap-4 my-3">
                    <div className="h-px w-10 bg-rose-200" />
                    <span className="text-rose-300 text-sm italic font-serif">&</span>
                    <div className="h-px w-10 bg-rose-200" />
                </div>

                <h1 className="text-zinc-700 leading-snug"
                    style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                    }}>
                    {content.groom_nickname || content.groom_name}
                </h1>

                {/* Date */}
                <p className="text-zinc-400 text-xs tracking-[0.15em] mt-8 uppercase">
                    {eventDate ? new Date(eventDate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    }) : '—'}
                </p>
            </div>

            {/* Countdown */}
            <div className="flex gap-5 md:gap-8 mt-14 relative z-10">
                {[
                    { label: 'Hari', value: countdown.days },
                    { label: 'Jam', value: countdown.hours },
                    { label: 'Menit', value: countdown.minutes },
                    { label: 'Detik', value: countdown.seconds },
                ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col items-center">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-2xl text-zinc-600 bg-rose-50/80 border border-rose-100"
                             style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                            {String(value).padStart(2, '0')}
                        </div>
                        <p className="text-rose-400/70 text-[9px] md:text-[10px] mt-2 tracking-[0.2em] uppercase font-medium">
                            {label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
