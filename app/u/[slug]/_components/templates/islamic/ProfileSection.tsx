import Image from 'next/image'
import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function ProfileSection({ content }: Props) {
    return (
        <section className="py-20 px-6 bg-white relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-emerald-900/5" />
            
            <div className="text-center mb-16">
                <p className="text-emerald-800/60 text-[10px] tracking-[0.4em] uppercase mb-4 font-semibold">
                    Mempelai
                </p>
                <h2 className="text-emerald-950 text-3xl md:text-4xl"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 }}>
                    Pasangan Berbahagia
                </h2>
                
                {content.quote && (
                    <div className="max-w-lg mx-auto mt-8 bg-emerald-50 p-6 rounded-2xl border border-emerald-900/10">
                        <p className="text-emerald-900/80 italic text-sm leading-relaxed">
                            "{content.quote}"
                        </p>
                        {content.quote_source && (
                            <p className="text-emerald-800/60 text-[10px] tracking-widest uppercase mt-4">— {content.quote_source}</p>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-4xl mx-auto">
                
                {/* Mempelai Wanita */}
                <div className="flex flex-col items-center text-center">
                    {content.bride_photo && (
                        <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6 rounded-full overflow-hidden p-1.5 bg-gradient-to-br from-amber-400 to-amber-200 shadow-xl">
                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white">
                                <Image src={content.bride_photo} alt={content.bride_name} fill className="object-cover" unoptimized />
                            </div>
                        </div>
                    )}
                    <h3 className="text-emerald-950 text-2xl mb-2"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 }}>
                        {content.bride_name}
                    </h3>
                    {(content.bride_father_name || content.bride_mother_name) && (
                        <div className="text-emerald-800/70 text-sm mt-1 bg-emerald-50 py-2 px-6 rounded-full border border-emerald-900/5">
                            <p className="text-[9px] tracking-wider uppercase mb-0.5 text-emerald-900/50">Putri dari</p>
                            <p className="font-medium">Bpk. {content.bride_father_name || '...'} & Ibu {content.bride_mother_name || '...'}</p>
                        </div>
                    )}
                </div>

                <div className="text-3xl text-amber-400 font-serif">&</div>

                {/* Mempelai Pria */}
                <div className="flex flex-col items-center text-center">
                    {content.groom_photo && (
                        <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6 rounded-full overflow-hidden p-1.5 bg-gradient-to-br from-amber-400 to-amber-200 shadow-xl">
                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white">
                                <Image src={content.groom_photo} alt={content.groom_name || 'Mempelai Pria'} fill className="object-cover" unoptimized />
                            </div>
                        </div>
                    )}
                    <h3 className="text-emerald-950 text-2xl mb-2"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 }}>
                        {content.groom_name}
                    </h3>
                    {(content.groom_father_name || content.groom_mother_name) && (
                        <div className="text-emerald-800/70 text-sm mt-1 bg-emerald-50 py-2 px-6 rounded-full border border-emerald-900/5">
                            <p className="text-[9px] tracking-wider uppercase mb-0.5 text-emerald-900/50">Putra dari</p>
                            <p className="font-medium">Bpk. {content.groom_father_name || '...'} & Ibu {content.groom_mother_name || '...'}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
