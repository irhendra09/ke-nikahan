import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function DetailSection({ content }: Props) {
    const hasAkad = !!content.akad_time
    const hasReception = !!content.reception_time
    
    if (!hasAkad && !hasReception && !content.venue_name) return null

    return (
        <section className="py-24 px-6 bg-orange-50 border-b-8 border-double border-amber-800/20 relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] bg-repeat" />

            <div className="text-center mb-16 max-w-lg mx-auto relative z-10">
                <p className="text-amber-800 text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Dudonan Karya</p>
                <h2 className="text-orange-950 text-3xl mb-6"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                    Waktu & Tempat
                </h2>
                <p className="text-orange-950/70 text-sm leading-relaxed border-t border-amber-800/20 pt-6">
                    Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
                </p>
            </div>

            <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 relative z-10">
                {hasAkad && (
                    <div className="flex-1 p-10 bg-white border border-amber-800/20 shadow-xl text-center relative group">
                        <div className="absolute top-2 left-2 right-2 bottom-2 border border-dashed border-amber-800/30 group-hover:border-amber-600 transition-colors" />
                        <h3 className="text-2xl text-orange-950 mb-4 font-serif relative z-10">Pawiwahan</h3>
                        <p className="text-amber-700 text-[10px] tracking-[0.2em] uppercase mb-2 font-bold relative z-10">Galah</p>
                        <p className="text-orange-950 text-lg relative z-10">{content.akad_time}</p>
                    </div>
                )}
                {hasReception && (
                    <div className="flex-1 p-10 bg-white border border-amber-800/20 shadow-xl text-center relative group">
                        <div className="absolute top-2 left-2 right-2 bottom-2 border border-dashed border-amber-800/30 group-hover:border-amber-600 transition-colors" />
                        <h3 className="text-2xl text-orange-950 mb-4 font-serif relative z-10">Resepsi</h3>
                        <p className="text-amber-700 text-[10px] tracking-[0.2em] uppercase mb-2 font-bold relative z-10">Galah</p>
                        <p className="text-orange-950 text-lg relative z-10">{content.reception_time}</p>
                    </div>
                )}
            </div>

            {content.venue_name && (
                <div className="max-w-2xl mx-auto mt-16 bg-orange-900 p-10 shadow-2xl text-center relative z-10">
                    <div className="absolute inset-2 border border-amber-500/30 pointer-events-none" />
                    
                    <p className="text-amber-500/80 text-[10px] tracking-[0.4em] uppercase mb-4 font-bold relative z-10">Genah Karya</p>
                    <h4 className="text-3xl text-amber-100 font-serif mb-4 relative z-10">{content.venue_name}</h4>
                    <p className="text-amber-100/70 text-sm mb-10 leading-relaxed relative z-10 max-w-lg mx-auto">{content.venue_address}</p>
                    
                    {content.maps_url && (
                        <a href={content.maps_url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-bold text-orange-950 bg-amber-500 hover:bg-amber-400 transition-colors relative z-10 shadow-lg">
                            Buka Peta Lokasi
                        </a>
                    )}
                </div>
            )}
        </section>
    )
}
