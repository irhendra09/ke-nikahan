import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function DetailSection({ content }: Props) {
    const hasAkad = !!content.akad_time
    const hasReception = !!content.reception_time
    
    if (!hasAkad && !hasReception && !content.venue_name) return null

    return (
        <section className="py-20 px-6 bg-[#f5f0e6]">
            <div className="text-center mb-14 max-w-lg mx-auto">
                <p className="text-[#8a9a6c] text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">Rangkaian Acara</p>
                <h2 className="text-[#4a4035] text-3xl mb-4"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 400 }}>
                    Waktu & Tempat
                </h2>
                <p className="text-[#8a9a6c]/70 text-sm leading-relaxed">
                    Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk hadir dan memberikan doa restu.
                </p>
            </div>

            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {hasAkad && (
                    <div className="p-8 bg-white rounded-2xl text-center border border-[#8a9a6c]/10">
                        <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-[#8a9a6c]/10 flex items-center justify-center text-[#8a9a6c]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        </div>
                        <h3 className="text-lg text-[#4a4035] mb-3 font-serif">Akad Nikah</h3>
                        <p className="text-[#8a9a6c]/60 text-[10px] tracking-[0.2em] uppercase mb-1">Pukul</p>
                        <p className="text-[#6b6050] text-sm">{content.akad_time}</p>
                    </div>
                )}
                {hasReception && (
                    <div className="p-8 bg-white rounded-2xl text-center border border-[#8a9a6c]/10">
                        <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-[#8a9a6c]/10 flex items-center justify-center text-[#8a9a6c]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"></path><path d="M5 20V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path><path d="M9 20v-4h6v4"></path></svg>
                        </div>
                        <h3 className="text-lg text-[#4a4035] mb-3 font-serif">Resepsi</h3>
                        <p className="text-[#8a9a6c]/60 text-[10px] tracking-[0.2em] uppercase mb-1">Pukul</p>
                        <p className="text-[#6b6050] text-sm">{content.reception_time}</p>
                    </div>
                )}
            </div>

            {content.venue_name && (
                <div className="max-w-lg mx-auto mt-12 text-center">
                    <div className="w-12 h-px bg-[#8a9a6c]/20 mx-auto mb-8" />
                    <p className="text-[#8a9a6c]/60 text-[10px] tracking-[0.3em] uppercase mb-3">Lokasi Acara</p>
                    <h4 className="text-xl text-[#4a4035] font-serif mb-3">{content.venue_name}</h4>
                    <p className="text-[#8a9a6c]/70 text-sm mb-6 leading-relaxed">{content.venue_address}</p>
                    {content.maps_url && (
                        <a href={content.maps_url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-[#8a9a6c] border border-[#8a9a6c]/30 hover:bg-[#8a9a6c]/10 transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            Buka Maps
                        </a>
                    )}
                </div>
            )}
        </section>
    )
}
