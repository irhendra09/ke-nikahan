import Image from 'next/image'
import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function ProfileSection({ content }: Props) {
    return (
        <section className="py-20 px-6 bg-[#fdfbf7]">
            <div className="text-center mb-14">
                <p className="text-rose-400/70 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">
                    Mempelai
                </p>
                <h2 className="text-zinc-700 text-3xl"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic', fontWeight: 400 }}>
                    Pasangan Berbahagia
                </h2>
                
                {content.quote && (
                    <div className="max-w-lg mx-auto mt-8">
                        <p className="text-zinc-500 italic text-sm leading-relaxed">
                            "{content.quote}"
                        </p>
                        {content.quote_source && (
                            <p className="text-rose-400/60 text-xs mt-3">
                                — {content.quote_source}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 max-w-3xl mx-auto">
                
                {/* Mempelai Wanita */}
                <div className="flex flex-col items-center text-center">
                    {content.bride_photo && (
                        <div className="relative w-36 h-36 md:w-48 md:h-48 mb-5 rounded-full overflow-hidden border-4 border-white shadow-md">
                            <Image
                                src={content.bride_photo}
                                alt={content.bride_name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    )}
                    <h3 className="text-zinc-700 text-xl md:text-2xl mb-1"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        {content.bride_name}
                    </h3>
                    {(content.bride_father_name || content.bride_mother_name) && (
                        <div className="text-zinc-400 text-sm leading-relaxed mt-1">
                            <p className="text-rose-400/60 text-xs mb-0.5">Putri dari</p>
                            <p>Bpk. {content.bride_father_name || '...'} & Ibu {content.bride_mother_name || '...'}</p>
                        </div>
                    )}
                </div>

                {/* Separator */}
                <div className="text-3xl text-rose-200 font-serif italic">&</div>

                {/* Mempelai Pria */}
                <div className="flex flex-col items-center text-center">
                    {content.groom_photo && (
                        <div className="relative w-36 h-36 md:w-48 md:h-48 mb-5 rounded-full overflow-hidden border-4 border-white shadow-md">
                            <Image
                                src={content.groom_photo}
                                alt={content.groom_name || 'Mempelai Pria'}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    )}
                    <h3 className="text-zinc-700 text-xl md:text-2xl mb-1"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        {content.groom_name}
                    </h3>
                    {(content.groom_father_name || content.groom_mother_name) && (
                        <div className="text-zinc-400 text-sm leading-relaxed mt-1">
                            <p className="text-rose-400/60 text-xs mb-0.5">Putra dari</p>
                            <p>Bpk. {content.groom_father_name || '...'} & Ibu {content.groom_mother_name || '...'}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
