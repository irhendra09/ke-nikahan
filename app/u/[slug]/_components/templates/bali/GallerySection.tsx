import Image from 'next/image'

type Props = {
    photos: string[]
}

export default function GallerySection({ photos }: Props) {
    if (!photos || photos.length === 0) return null

    return (
        <section className="py-24 px-6 bg-white border-b-8 border-double border-amber-800/20">
            <div className="text-center mb-16">
                <p className="text-amber-800 text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Galeri</p>
                <h2 className="text-orange-950 text-3xl"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                    Momen Bahagia
                </h2>
            </div>
            
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row flex-wrap justify-center gap-4">
                {photos.map((photo, i) => (
                    <div key={i} className={`relative overflow-hidden bg-orange-900 p-2 shadow-xl group transition-all duration-500 hover:-translate-y-2 ${
                        i === 0 ? 'w-full md:w-[60%] aspect-[4/3]' : 'w-[48%] md:w-[28%] aspect-[3/4]'
                    }`}>
                        <div className="absolute inset-0 border border-amber-500/50 m-1 z-10 pointer-events-none" />
                        <div className="relative w-full h-full">
                            <Image src={photo} alt={`Gallery ${i + 1}`} fill className="object-cover sepia-[.3] group-hover:sepia-0 transition-all duration-700" unoptimized />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
