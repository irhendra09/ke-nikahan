'use client'

import { useState } from 'react'
import { InvitationContent } from '@/lib/types/invitation'

type Props = {
    content: InvitationContent
}

export default function GiftSection({ content }: Props) {
    const [copied, setCopied] = useState(false)

    if (!content.bank_name || !content.bank_account_number || !content.bank_account_name) {
        return null
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content.bank_account_number || '')
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy', err)
        }
    }

    return (
        <section className="py-20 px-6 bg-emerald-50 flex flex-col items-center">
            <div className="text-center mb-10 max-w-sm mx-auto">
                <p className="text-emerald-800/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-semibold">
                    Tanda Kasih
                </p>
                <h2 className="text-emerald-950 text-3xl mb-4"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 }}>
                    Amplop Digital
                </h2>
                <p className="text-emerald-900/70 text-sm leading-relaxed">
                    Doa restu Anda merupakan karunia yang sangat berarti. Bagi yang ingin memberikan tanda kasih, dapat melalui rekening di bawah ini:
                </p>
            </div>

            <div className="bg-white border-2 border-emerald-900/10 rounded-2xl p-8 w-full max-w-xs text-center shadow-md relative overflow-hidden">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-400 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-400 rounded-br-xl" />

                <p className="text-emerald-900 font-bold uppercase tracking-[0.2em] text-sm mb-4">
                    {content.bank_name}
                </p>
                
                <p className="text-emerald-950 text-xl font-mono tracking-wider mb-2 bg-emerald-50 py-2 rounded-lg border border-emerald-900/5">
                    {content.bank_account_number}
                </p>
                
                <p className="text-emerald-800/60 text-xs uppercase tracking-wider mb-8 font-medium">
                    A.n. {content.bank_account_name}
                </p>

                <button
                    onClick={handleCopy}
                    className={`w-full py-3 px-5 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 shadow-sm ${
                        copied 
                        ? 'bg-amber-400 text-emerald-950' 
                        : 'bg-emerald-900 text-amber-400 hover:bg-emerald-800'
                    }`}
                >
                    {copied ? '✓ Berhasil Disalin' : 'Salin No. Rekening'}
                </button>
            </div>
        </section>
    )
}
