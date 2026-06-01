'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
    musicUrl?: string
    isOpened: boolean
}

export default function AudioPlayer({ musicUrl, isOpened }: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    // Attempt to play when the envelope is opened
    useEffect(() => {
        if (isOpened && audioRef.current && musicUrl) {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(err => {
                    console.log('Autoplay prevented:', err)
                    setIsPlaying(false)
                })
        }
    }, [isOpened, musicUrl])

    const togglePlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(console.error)
        }
    }

    if (!musicUrl) return null

    return (
        <>
            <audio ref={audioRef} src={musicUrl} loop />
            
            <button
                onClick={togglePlay}
                className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-xl shadow-amber-900/10 flex items-center justify-center text-amber-600 hover:scale-110 active:scale-95 transition-all border border-amber-100 ${isPlaying ? 'animate-spin-slow' : ''}`}
                style={{ animationDuration: '4s' }}
                aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            >
                {isPlaying ? (
                    // Pause Icon
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                    </svg>
                ) : (
                    // Music Icon
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                    </svg>
                )}
            </button>
        </>
    )
}
