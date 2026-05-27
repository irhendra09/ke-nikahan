'use client'

import { useState } from 'react'
import Image from 'next/image'

type Props = { photos: string[] }

export default function GallerySection({ photos }: Props) {
    const [lightbox, setLightbox] = useState<string | null>(null)

    return (
        <section className="py-20 px-6 bg-stone-100">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <p className="text-amber-700/60 text-xs tracking-[0.4em] uppercase mb-2">
                        Galeri
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {photos.map((url, i) => (
                        <div
                            key={i}
                            className="aspect-square relative rounded-xl overflow-hidden cursor-pointer
                         hover:scale-[1.02] transition-transform"
                            onClick={() => setLightbox(url)}
                        >
                            <Image
                                src={url}
                                alt={`Foto ${i + 1}`}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center
                     justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={lightbox}
                            alt="Preview"
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                    <button
                        className="absolute top-4 right-4 text-white/70 hover:text-white
                       text-2xl z-50"
                        onClick={() => setLightbox(null)}
                    >
                        ✕
                    </button>
                </div>
            )}
        </section>
    )
}