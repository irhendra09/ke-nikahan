import Image from 'next/image'

type Props = {
    photos: string[]
}

export default function GallerySection({ photos }: Props) {
    if (!photos || photos.length === 0) return null

    return (
        <section className="py-20 px-6 bg-white relative">
            <div className="text-center mb-14 max-w-lg mx-auto">
                <p className="text-emerald-800/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-semibold">Momen Bahagia</p>
                <h2 className="text-emerald-950 text-3xl"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 }}>
                    Galeri Kami
                </h2>
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-900/10">
                {photos.map((photo, i) => (
                    <div key={i} className={`relative overflow-hidden rounded-xl group border-2 border-white shadow-sm ${i === 0 ? 'col-span-2 md:col-span-1 row-span-2 aspect-[3/4]' : 'aspect-square'}`}>
                        <Image src={photo} alt={`Gallery ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                        <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
                    </div>
                ))}
            </div>
        </section>
    )
}
