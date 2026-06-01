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
        <section className="relative py-28 px-6 flex flex-col items-center bg-white overflow-hidden">
            {/* Top bar accent */}
            <div className="absolute top-0 left-0 w-full h-px bg-neutral-100" />

            {content.cover_photo && (
                <div className="relative mb-14 w-full max-w-md h-72 md:h-96 overflow-hidden grayscale">
                    <Image
                        src={content.cover_photo}
                        alt="Foto pasangan"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-white/10" />
                </div>
            )}

            <div className="text-center max-w-md w-full">
                <p className="text-neutral-400 text-[9px] tracking-[0.5em] uppercase mb-8">
                    The Wedding Of
                </p>

                <h1 className="text-neutral-900 leading-tight mb-1 tracking-tight"
                    style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                        fontWeight: 200,
                    }}>
                    {content.bride_nickname || content.bride_name}
                </h1>

                <p className="text-neutral-300 text-xs my-4">&</p>

                <h1 className="text-neutral-900 leading-tight tracking-tight"
                    style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                        fontWeight: 200,
                    }}>
                    {content.groom_nickname || content.groom_name}
                </h1>

                <div className="w-8 h-px bg-neutral-200 mx-auto my-10" />

                <p className="text-neutral-400 text-[11px] tracking-[0.2em] uppercase">
                    {eventDate ? new Date(eventDate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    }) : '—'}
                </p>
            </div>

            {/* Countdown */}
            <div className="flex gap-8 md:gap-12 mt-16">
                {[
                    { label: 'Hari', value: countdown.days },
                    { label: 'Jam', value: countdown.hours },
                    { label: 'Mnt', value: countdown.minutes },
                    { label: 'Dtk', value: countdown.seconds },
                ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col items-center">
                        <span className="text-2xl md:text-4xl text-neutral-800 tabular-nums"
                              style={{ fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 200 }}>
                            {String(value).padStart(2, '0')}
                        </span>
                        <p className="text-neutral-300 text-[8px] md:text-[9px] mt-2 tracking-[0.3em] uppercase">
                            {label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
