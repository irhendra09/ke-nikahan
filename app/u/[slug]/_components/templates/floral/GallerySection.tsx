import Image from 'next/image'

type Props = {
    photos: string[]
}

export default function GallerySection({ photos }: Props) {
    if (!photos || photos.length === 0) return null

    return (
        <section className="py-24 px-6 bg-white">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                    Momen Indah
                </p>
                <h2 className="text-zinc-800 text-3xl md:text-4xl mb-6"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic' }}>
                    Galeri Cinta Kami
                </h2>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {photos.map((photo, i) => (
                        <div 
                            key={i} 
                            className={`relative overflow-hidden rounded-2xl group ${
                                i === 0 || i === 3 ? 'col-span-2 md:col-span-1 row-span-2 md:row-span-2 aspect-[3/4]' : 'aspect-square'
                            }`}
                        >
                            <Image
                                src={photo}
                                alt={`Gallery ${i + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-rose-900/0 group-hover:bg-rose-900/10 transition-colors duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
