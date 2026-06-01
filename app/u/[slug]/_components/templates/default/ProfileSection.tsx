import Image from 'next/image'
import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function ProfileSection({ content }: Props) {
    return (
        <section className="py-20 px-6 bg-white border-t border-stone-100">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-14">
                    <p className="text-amber-700/60 text-xs tracking-[0.4em] uppercase mb-3">
                        Mempelai
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

                <div className="grid gap-12 md:grid-cols-2 items-start text-center">
                    {/* Mempelai Wanita */}
                    <div className="flex flex-col items-center">
                        {content.bride_photo && (
                            <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden shadow-lg border border-stone-100">
                                <Image
                                    src={content.bride_photo}
                                    alt={`Foto ${content.bride_name}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        )}
                        <h3 className="font-semibold text-stone-800 text-2xl mb-2"
                            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                            {content.bride_name}
                        </h3>
                        <div className="text-sm text-stone-500 leading-relaxed">
                            <p className="italic mb-1">Putri dari Keluarga</p>
                            <p className="font-medium text-stone-700">
                                Bpk. {content.bride_father_name || '...'} <br /> & Ibu {content.bride_mother_name || '...'}
                            </p>
                        </div>
                    </div>

                    {/* Mempelai Pria */}
                    <div className="flex flex-col items-center">
                        {content.groom_photo && (
                            <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden shadow-lg border border-stone-100">
                                <Image
                                    src={content.groom_photo}
                                    alt={`Foto ${content.groom_name}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        )}
                        <h3 className="font-semibold text-stone-800 text-2xl mb-2"
                            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                            {content.groom_name}
                        </h3>
                        <div className="text-sm text-stone-500 leading-relaxed">
                            <p className="italic mb-1">Putra dari Keluarga</p>
                            <p className="font-medium text-stone-700">
                                Bpk. {content.groom_father_name || '...'} <br /> & Ibu {content.groom_mother_name || '...'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
