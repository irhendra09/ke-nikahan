import Image from 'next/image'

type Props = {
    photos: string[]
}

export default function GallerySection({ photos }: Props) {
    if (!photos || photos.length === 0) return null

    return (
        <section className="py-24 px-6 bg-neutral-950">
            <div className="text-center mb-16">
                <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase mb-4">Gallery</p>
                <div className="w-12 h-px bg-white/20 mx-auto" />
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                {photos.map((photo, i) => (
                    <div key={i} className={`relative overflow-hidden group ${
                        i % 4 === 0 ? 'aspect-[4/3] md:col-span-2 lg:col-span-2' : 'aspect-[3/4] md:aspect-square'
                    }`}>
                        <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
                        <Image
                            src={photo}
                            alt={`Gallery ${i + 1}`}
                            fill
                            className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                            unoptimized
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
