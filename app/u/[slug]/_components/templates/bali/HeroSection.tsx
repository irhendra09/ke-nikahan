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
        <section className="relative py-28 px-6 flex flex-col items-center overflow-hidden bg-orange-50 border-b-8 border-double border-amber-800/20">
            {/* Top Border Pattern */}
            <div className="absolute top-0 left-0 w-full h-4 bg-orange-950 flex gap-2 overflow-hidden px-4">
                {Array.from({length: 20}).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-amber-500 rotate-45 transform origin-top -mt-2" />
                ))}
            </div>
            
            <div className="text-center relative z-10 max-w-lg w-full flex flex-col items-center">
                
                {content.cover_photo && (
                    <div className="relative mb-12 w-56 h-72 overflow-hidden shadow-2xl bg-orange-950 p-2">
                        <div className="absolute inset-0 border border-amber-500/50 m-1" />
                        <div className="relative w-full h-full">
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

                <p className="text-amber-800 text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">
                    Om Swastiastu
                </p>

                <h1 className="text-orange-950 leading-tight mb-2"
                    style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                    }}>
                    {content.bride_nickname || content.bride_name}
                </h1>

                <p className="text-amber-600 text-xl font-serif my-3">&</p>

                <h1 className="text-orange-950 leading-tight mb-10"
                    style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                    }}>
                    {content.groom_nickname || content.groom_name}
                </h1>

                <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-px bg-amber-800/30" />
                    <p className="text-orange-950 text-sm tracking-[0.2em] uppercase font-bold bg-amber-100/50 px-6 py-2 border border-amber-800/10">
                        {eventDate ? new Date(eventDate).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        }) : '—'}
                    </p>
                    <div className="w-24 h-px bg-amber-800/30" />
                </div>
            </div>

            <div className="flex gap-4 md:gap-6 mt-16 relative z-10">
                {[
                    { label: 'Rahina', value: countdown.days },
                    { label: 'Jam', value: countdown.hours },
                    { label: 'Menit', value: countdown.minutes },
                    { label: 'Detik', value: countdown.seconds },
                ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col items-center w-16 md:w-20">
                        <div className="w-full aspect-square rotate-45 bg-orange-900 border border-amber-500/50 flex items-center justify-center shadow-lg">
                            <span className="text-xl md:text-2xl text-amber-500 -rotate-45"
                                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                                {String(value).padStart(2, '0')}
                            </span>
                        </div>
                        <p className="text-orange-950 text-[9px] md:text-[10px] mt-6 tracking-[0.2em] uppercase font-bold">
                            {label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
