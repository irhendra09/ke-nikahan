import Image from 'next/image'

type Props = {
    photos: string[]
}

export default function GallerySection({ photos }: Props) {
    if (!photos || photos.length === 0) return null

    return (
        <section className="py-20 px-6 bg-white">
            <div className="text-center mb-14 max-w-lg mx-auto">
                <p className="text-[#8a9a6c] text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">Momen Indah</p>
                <h2 className="text-[#4a4035] text-3xl"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 400 }}>
                    Galeri Kami
                </h2>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {photos.map((photo, i) => (
                    <div key={i} className={`relative overflow-hidden rounded-xl group ${i === 0 ? 'col-span-2 md:col-span-1 row-span-2 aspect-[3/4]' : 'aspect-square'}`}>
                        <Image src={photo} alt={`Gallery ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                    </div>
                ))}
            </div>
        </section>
    )
}
