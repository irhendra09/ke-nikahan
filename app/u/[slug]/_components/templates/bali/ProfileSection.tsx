import Image from 'next/image'
import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function ProfileSection({ content }: Props) {
    return (
        <section className="py-24 px-6 bg-white relative border-b-8 border-double border-amber-800/20">
            <div className="text-center mb-16 relative z-10">
                <p className="text-amber-700 text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">
                    Sang Yajamana
                </p>
                <h2 className="text-orange-950 text-3xl md:text-4xl"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                    Pasangan Pengantin
                </h2>
                
                {content.quote && (
                    <div className="max-w-xl mx-auto mt-10 p-8 border border-amber-800/20 relative">
                        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-amber-600" />
                        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-amber-600" />
                        <p className="text-orange-950/80 italic text-sm md:text-base leading-relaxed">
                            "{content.quote}"
                        </p>
                        {content.quote_source && (
                            <p className="text-amber-800/80 text-[10px] tracking-widest uppercase mt-6 font-bold">— {content.quote_source}</p>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 max-w-5xl mx-auto">
                
                {/* Mempelai Wanita */}
                <div className="flex flex-col items-center text-center">
                    {content.bride_photo && (
                        <div className="relative w-48 h-64 md:w-56 md:h-72 mb-8 bg-orange-900 p-2 shadow-xl">
                            <div className="absolute inset-0 border border-amber-500/50 m-1" />
                            <div className="relative w-full h-full">
                                <Image src={content.bride_photo} alt={content.bride_name} fill className="object-cover sepia-[.3]" unoptimized />
                            </div>
                        </div>
                    )}
                    <h3 className="text-orange-950 text-3xl mb-3"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        {content.bride_name}
                    </h3>
                    {(content.bride_father_name || content.bride_mother_name) && (
                        <div className="text-orange-950/70 text-sm mt-2 border-t border-b border-amber-800/20 py-3 px-8">
                            <p className="text-[10px] tracking-widest uppercase mb-1 text-amber-700 font-bold">Putri dari</p>
                            <p>Bpk. {content.bride_father_name || '...'} & Ibu {content.bride_mother_name || '...'}</p>
                        </div>
                    )}
                </div>

                <div className="text-4xl text-amber-600 font-serif">ॐ</div>

                {/* Mempelai Pria */}
                <div className="flex flex-col items-center text-center">
                    {content.groom_photo && (
                        <div className="relative w-48 h-64 md:w-56 md:h-72 mb-8 bg-orange-900 p-2 shadow-xl">
                            <div className="absolute inset-0 border border-amber-500/50 m-1" />
                            <div className="relative w-full h-full">
                                <Image src={content.groom_photo} alt={content.groom_name || 'Mempelai Pria'} fill className="object-cover sepia-[.3]" unoptimized />
                            </div>
                        </div>
                    )}
                    <h3 className="text-orange-950 text-3xl mb-3"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        {content.groom_name}
                    </h3>
                    {(content.groom_father_name || content.groom_mother_name) && (
                        <div className="text-orange-950/70 text-sm mt-2 border-t border-b border-amber-800/20 py-3 px-8">
                            <p className="text-[10px] tracking-widest uppercase mb-1 text-amber-700 font-bold">Putra dari</p>
                            <p>Bpk. {content.groom_father_name || '...'} & Ibu {content.groom_mother_name || '...'}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
