import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function DetailSection({ content }: Props) {
    const hasAkad = !!content.akad_time
    const hasReception = !!content.reception_time
    
    if (!hasAkad && !hasReception && !content.venue_name) return null

    return (
        <section className="py-24 px-6 bg-neutral-900 border-t border-white/5">
            <div className="text-center mb-16 max-w-md mx-auto">
                <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase mb-4">Event Details</p>
                <div className="w-12 h-px bg-white/20 mx-auto" />
            </div>

            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 md:gap-0 justify-between items-center md:items-start text-center">
                
                {hasAkad && (
                    <div className="flex-1 px-8 border-b md:border-b-0 md:border-r border-white/10 pb-12 md:pb-0">
                        <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-6">Akad Nikah</p>
                        <p className="text-white text-2xl font-light mb-2" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                            {content.akad_time}
                        </p>
                    </div>
                )}

                {hasReception && (
                    <div className="flex-1 px-8">
                        <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-6">Resepsi</p>
                        <p className="text-white text-2xl font-light mb-2" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                            {content.reception_time}
                        </p>
                    </div>
                )}
            </div>

            {content.venue_name && (
                <div className="max-w-xl mx-auto mt-20 p-10 bg-neutral-950/50 backdrop-blur-sm border border-white/5 rounded-xl text-center shadow-2xl">
                    <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-6">Lokasi Acara</p>
                    <h4 className="text-white text-2xl font-light mb-4" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        {content.venue_name}
                    </h4>
                    <p className="text-white/50 text-sm font-light leading-relaxed mb-8">
                        {content.venue_address}
                    </p>
                    
                    {content.maps_url && (
                        <a href={content.maps_url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-3 text-[10px] tracking-[0.3em] uppercase text-white bg-white/10 hover:bg-white/20 transition-all rounded-sm">
                            Buka Google Maps
                        </a>
                    )}
                </div>
            )}
        </section>
    )
}
