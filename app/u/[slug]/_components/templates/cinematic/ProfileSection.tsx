import Image from 'next/image'
import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function ProfileSection({ content }: Props) {
    return (
        <section className="py-24 px-6 bg-neutral-950">
            <div className="text-center mb-20">
                <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase mb-4">The Bride & Groom</p>
                <div className="w-12 h-px bg-white/20 mx-auto" />
                
                {content.quote && (
                    <div className="max-w-xl mx-auto mt-12 relative">
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light italic"
                           style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                            "{content.quote}"
                        </p>
                        {content.quote_source && (
                            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-6">— {content.quote_source}</p>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-20 max-w-4xl mx-auto">
                
                {/* Mempelai Wanita */}
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        {content.bride_photo ? (
                            <div className="relative w-48 h-64 md:w-64 md:h-80 rounded-sm overflow-hidden shadow-2xl">
                                <Image src={content.bride_photo} alt={content.bride_name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" unoptimized />
                            </div>
                        ) : (
                            <div className="w-48 h-64 md:w-64 md:h-80 bg-neutral-900 border border-white/5 rounded-sm" />
                        )}
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h3 className="text-white text-3xl md:text-4xl mb-4 tracking-wide"
                            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 300 }}>
                            {content.bride_name}
                        </h3>
                        {(content.bride_father_name || content.bride_mother_name) && (
                            <div className="text-white/40 text-sm font-light leading-relaxed">
                                <p className="text-[10px] tracking-widest uppercase mb-2">Putri dari</p>
                                <p>Bpk. {content.bride_father_name || '...'} & Ibu {content.bride_mother_name || '...'}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Separator */}
                <div className="flex justify-center my-4">
                    <span className="text-4xl text-white/20 font-serif italic">&</span>
                </div>

                {/* Mempelai Pria */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
                    <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                        {content.groom_photo ? (
                            <div className="relative w-48 h-64 md:w-64 md:h-80 rounded-sm overflow-hidden shadow-2xl">
                                <Image src={content.groom_photo} alt={content.groom_name || 'Mempelai Pria'} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" unoptimized />
                            </div>
                        ) : (
                            <div className="w-48 h-64 md:w-64 md:h-80 bg-neutral-900 border border-white/5 rounded-sm" />
                        )}
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-right">
                        <h3 className="text-white text-3xl md:text-4xl mb-4 tracking-wide"
                            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 300 }}>
                            {content.groom_name}
                        </h3>
                        {(content.groom_father_name || content.groom_mother_name) && (
                            <div className="text-white/40 text-sm font-light leading-relaxed">
                                <p className="text-[10px] tracking-widest uppercase mb-2">Putra dari</p>
                                <p>Bpk. {content.groom_father_name || '...'} & Ibu {content.groom_mother_name || '...'}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
