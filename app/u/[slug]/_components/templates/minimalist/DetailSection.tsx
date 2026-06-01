import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function DetailSection({ content }: Props) {
    const hasAkad = !!content.akad_time
    const hasReception = !!content.reception_time
    
    if (!hasAkad && !hasReception && !content.venue_name) return null

    return (
        <section className="py-24 px-6 bg-white">
            <div className="text-center mb-16 max-w-md mx-auto">
                <p className="text-neutral-400 text-[9px] tracking-[0.5em] uppercase mb-4">Acara</p>
                <div className="w-6 h-px bg-neutral-200 mx-auto" />
            </div>

            <div className="max-w-lg mx-auto space-y-12">
                
                {hasAkad && (
                    <div className="text-center py-8 border-t border-b border-neutral-100">
                        <p className="text-neutral-300 text-[9px] tracking-[0.4em] uppercase mb-3">Akad Nikah</p>
                        <p className="text-neutral-800 text-lg font-light">{content.akad_time}</p>
                    </div>
                )}

                {hasReception && (
                    <div className="text-center py-8 border-t border-b border-neutral-100">
                        <p className="text-neutral-300 text-[9px] tracking-[0.4em] uppercase mb-3">Resepsi</p>
                        <p className="text-neutral-800 text-lg font-light">{content.reception_time}</p>
                    </div>
                )}
            </div>

            {content.venue_name && (
                <div className="max-w-md mx-auto mt-16 text-center">
                    <p className="text-neutral-300 text-[9px] tracking-[0.4em] uppercase mb-4">Lokasi</p>
                    <h4 className="text-neutral-800 text-lg font-light mb-2">{content.venue_name}</h4>
                    <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">{content.venue_address}</p>
                    
                    {content.maps_url && (
                        <a href={content.maps_url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-neutral-500 hover:text-neutral-900 border-b border-neutral-300 hover:border-neutral-900 pb-1 transition-colors">
                            Buka Maps ↗
                        </a>
                    )}
                </div>
            )}
        </section>
    )
}
