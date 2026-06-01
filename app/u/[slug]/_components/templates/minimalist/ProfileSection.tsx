import Image from 'next/image'
import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function ProfileSection({ content }: Props) {
    return (
        <section className="py-24 px-6 bg-neutral-50">
            <div className="text-center mb-16">
                <p className="text-neutral-400 text-[9px] tracking-[0.5em] uppercase mb-4">Mempelai</p>
                <div className="w-6 h-px bg-neutral-200 mx-auto" />
                
                {content.quote && (
                    <div className="max-w-md mx-auto mt-10">
                        <p className="text-neutral-500 text-sm leading-relaxed font-light italic">
                            "{content.quote}"
                        </p>
                        {content.quote_source && (
                            <p className="text-neutral-300 text-[10px] tracking-[0.2em] uppercase mt-4">— {content.quote_source}</p>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 max-w-3xl mx-auto">
                
                {/* Mempelai Wanita */}
                <div className="flex flex-col items-center text-center">
                    {content.bride_photo && (
                        <div className="relative w-32 h-32 md:w-44 md:h-44 mb-6 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                            <Image src={content.bride_photo} alt={content.bride_name} fill className="object-cover" unoptimized />
                        </div>
                    )}
                    <h3 className="text-neutral-800 text-lg md:text-xl mb-1 tracking-tight"
                        style={{ fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 300 }}>
                        {content.bride_name}
                    </h3>
                    {(content.bride_father_name || content.bride_mother_name) && (
                        <p className="text-neutral-400 text-xs font-light mt-1">
                            Putri dari Bpk. {content.bride_father_name || '...'} & Ibu {content.bride_mother_name || '...'}
                        </p>
                    )}
                </div>

                {/* Separator */}
                <div className="w-px h-16 bg-neutral-200 hidden md:block" />
                <div className="w-12 h-px bg-neutral-200 md:hidden" />

                {/* Mempelai Pria */}
                <div className="flex flex-col items-center text-center">
                    {content.groom_photo && (
                        <div className="relative w-32 h-32 md:w-44 md:h-44 mb-6 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                            <Image src={content.groom_photo} alt={content.groom_name || 'Mempelai Pria'} fill className="object-cover" unoptimized />
                        </div>
                    )}
                    <h3 className="text-neutral-800 text-lg md:text-xl mb-1 tracking-tight"
                        style={{ fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 300 }}>
                        {content.groom_name}
                    </h3>
                    {(content.groom_father_name || content.groom_mother_name) && (
                        <p className="text-neutral-400 text-xs font-light mt-1">
                            Putra dari Bpk. {content.groom_father_name || '...'} & Ibu {content.groom_mother_name || '...'}
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}
