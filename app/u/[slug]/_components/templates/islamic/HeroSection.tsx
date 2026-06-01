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
        <section className="relative py-24 px-6 flex flex-col items-center overflow-hidden bg-emerald-50">
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-900" />
            
            <div className="text-center relative z-10 max-w-lg w-full flex flex-col items-center">
                
                {/* Simple Arch Frame for Photo */}
                {content.cover_photo && (
                    <div className="relative mb-10 w-48 h-64 overflow-hidden rounded-t-[100px] border-4 border-emerald-900/10 shadow-lg p-2 bg-white">
                        <div className="relative w-full h-full rounded-t-[90px] overflow-hidden">
                            <Image
                                src={content.cover_photo}
                                alt="Foto"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </div>
                )}

                <p className="text-emerald-800/60 text-[10px] tracking-[0.4em] uppercase mb-6 font-medium">
                    Pernikahan
                </p>

                <h1 className="text-emerald-950 leading-tight mb-2"
                    style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                        fontWeight: 600,
                    }}>
                    {content.bride_nickname || content.bride_name}
                </h1>

                <p className="text-amber-500 text-lg font-serif my-2">&</p>

                <h1 className="text-emerald-950 leading-tight mb-8"
                    style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                        fontWeight: 600,
                    }}>
                    {content.groom_nickname || content.groom_name}
                </h1>

                <div className="flex items-center gap-4">
                    <div className="w-16 h-px bg-amber-500/40" />
                    <p className="text-emerald-900/80 text-xs tracking-[0.2em] uppercase font-semibold">
                        {eventDate ? new Date(eventDate).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        }) : '—'}
                    </p>
                    <div className="w-16 h-px bg-amber-500/40" />
                </div>
            </div>

            <div className="flex gap-4 md:gap-8 mt-16 relative z-10">
                {[
                    { label: 'Hari', value: countdown.days },
                    { label: 'Jam', value: countdown.hours },
                    { label: 'Menit', value: countdown.minutes },
                    { label: 'Detik', value: countdown.seconds },
                ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col items-center w-16 md:w-20">
                        <div className="w-full aspect-square rounded-t-full rounded-b-md flex items-center justify-center text-xl md:text-2xl text-emerald-950 bg-white border-2 border-emerald-900/10 shadow-sm"
                             style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 }}>
                            {String(value).padStart(2, '0')}
                        </div>
                        <p className="text-emerald-800/60 text-[9px] md:text-[10px] mt-3 tracking-[0.2em] uppercase font-bold">
                            {label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
