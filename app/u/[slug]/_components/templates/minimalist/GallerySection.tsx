import Image from 'next/image'

type Props = {
    photos: string[]
}

export default function GallerySection({ photos }: Props) {
    if (!photos || photos.length === 0) return null

    return (
        <section className="py-24 px-6 bg-neutral-50">
            <div className="text-center mb-16">
                <p className="text-neutral-400 text-[9px] tracking-[0.5em] uppercase mb-4">Galeri</p>
                <div className="w-6 h-px bg-neutral-200 mx-auto" />
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-2">
                {photos.map((photo, i) => (
                    <div key={i} className={`relative overflow-hidden group ${
                        i === 0 ? 'col-span-2 md:col-span-1 row-span-2 aspect-[3/4]' : 'aspect-square'
                    }`}>
                        <Image
                            src={photo}
                            alt={`Gallery ${i + 1}`}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            unoptimized
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
