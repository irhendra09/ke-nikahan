import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function DetailSection({ content }: Props) {
    const hasAkad = !!content.akad_time
    const hasReception = !!content.reception_time
    
    if (!hasAkad && !hasReception && !content.venue_name) return null

    return (
        <section className="py-20 px-6 bg-emerald-50">
            <div className="text-center mb-14 max-w-lg mx-auto">
                <p className="text-emerald-800/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-semibold">Rangkaian Acara</p>
                <h2 className="text-emerald-950 text-3xl mb-4"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 }}>
                    Waktu & Tempat
                </h2>
                <p className="text-emerald-900/70 text-sm leading-relaxed">
                    Dengan memohon rahmat dan ridho Allah SWT, kami mengharapkan kehadiran Bapak/Ibu/Saudara/i untuk memberikan doa restu.
                </p>
            </div>

            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {hasAkad && (
                    <div className="p-8 bg-white rounded-xl text-center border-t-4 border-amber-400 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/10 rounded-bl-full" />
                        <h3 className="text-xl text-emerald-950 mb-3 font-serif font-bold">Akad Nikah</h3>
                        <p className="text-emerald-800/50 text-[10px] tracking-[0.2em] uppercase mb-1">Pukul</p>
                        <p className="text-emerald-900 font-medium text-lg">{content.akad_time}</p>
                    </div>
                )}
                {hasReception && (
                    <div className="p-8 bg-white rounded-xl text-center border-t-4 border-emerald-900 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-900/10 rounded-bl-full" />
                        <h3 className="text-xl text-emerald-950 mb-3 font-serif font-bold">Resepsi</h3>
                        <p className="text-emerald-800/50 text-[10px] tracking-[0.2em] uppercase mb-1">Pukul</p>
                        <p className="text-emerald-900 font-medium text-lg">{content.reception_time}</p>
                    </div>
                )}
            </div>

            {content.venue_name && (
                <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-xl shadow-md border border-emerald-900/10 text-center relative">
                    <p className="text-emerald-800/60 text-[10px] tracking-[0.3em] uppercase mb-3 font-bold">Lokasi Acara</p>
                    <h4 className="text-2xl text-emerald-950 font-serif mb-3 font-bold">{content.venue_name}</h4>
                    <p className="text-emerald-900/70 text-sm mb-8 leading-relaxed">{content.venue_address}</p>
                    
                    {content.maps_url && (
                        <a href={content.maps_url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-800 transition-colors shadow-lg">
                            Buka Google Maps
                        </a>
                    )}
                </div>
            )}
        </section>
    )
}
