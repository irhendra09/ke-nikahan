import { InvitationContent } from '@/lib/types/invitation'

type Props = { content: InvitationContent }

export default function DetailSection({ content }: Props) {
    const googleMapsUrl = content.maps_url ||
        `https://maps.google.com?q=${encodeURIComponent(content.venue_address ?? '')}`

    return (
        <section className="py-20 px-6 bg-[#faf8f5]">
            <div className="max-w-2xl mx-auto">

                {/* Section header */}
                <div className="text-center mb-14">
                    <p className="text-amber-700/60 text-xs tracking-[0.4em] uppercase mb-3">
                        Informasi Acara
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-12 bg-stone-300" />
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z"
                                  stroke="#c8972a" strokeWidth="1" fill="none"/>
                        </svg>
                        <div className="h-px w-12 bg-stone-300" />
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    {/* Akad */}
                    {content.akad_time && (
                        <div className="bg-white rounded-2xl p-6 border border-stone-100
                            shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center
                              justify-center mb-4">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                     stroke="#c8972a" strokeWidth="1.5">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                    <circle cx="12" cy="9" r="2.5"/>
                                </svg>
                            </div>
                            <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">
                                Akad Nikah
                            </p>
                            <p className="font-semibold text-stone-800 text-lg mb-1"
                               style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                                {content.akad_time}
                            </p>
                            <p className="text-stone-500 text-sm">{content.venue_name}</p>
                            <p className="text-stone-400 text-xs mt-1 leading-relaxed">
                                {content.venue_address}
                            </p>
                        </div>
                    )}

                    {/* Resepsi */}
                    {content.reception_time && (
                        <div className="bg-white rounded-2xl p-6 border border-stone-100
                            shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center
                              justify-center mb-4">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                     stroke="#c8972a" strokeWidth="1.5">
                                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                                    <path d="M16 2v4M8 2v4M3 10h18"/>
                                </svg>
                            </div>
                            <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">
                                Resepsi
                            </p>
                            <p className="font-semibold text-stone-800 text-lg mb-1"
                               style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                                {content.reception_time}
                            </p>
                            <p className="text-stone-500 text-sm">{content.venue_name}</p>
                            <p className="text-stone-400 text-xs mt-1 leading-relaxed">
                                {content.venue_address}
                            </p>
                        </div>
                    )}
                </div>

                {/* Tombol Maps */}
                {content.venue_address && (
                    <div className="text-center mt-8">
                        <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-stone-900 text-amber-200
                            px-6 py-3 rounded-full text-sm tracking-wider
                            hover:bg-stone-800 transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                <circle cx="12" cy="9" r="2.5"/>
                            </svg>
                            Buka Google Maps
                        </a>
                    </div>
                )}

                {/* Quotes */}
                {content.quote && (
                    <blockquote className="mt-14 text-center">
                        <div className="text-amber-600/30 text-5xl leading-none mb-2
                            font-serif">&quot;</div>
                        <p className="text-stone-600 text-base leading-relaxed italic
                          max-w-md mx-auto"
                           style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                            {content.quote}
                        </p>
                        {content.quote_source && (
                            <p className="text-stone-400 text-xs mt-3 tracking-wider">
                                — {content.quote_source}
                            </p>
                        )}
                    </blockquote>
                )}
            </div>
        </section>
    )
}