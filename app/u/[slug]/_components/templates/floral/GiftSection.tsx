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
        <section className="py-20 px-6 bg-[#fdfbf7] flex flex-col items-center">
            <div className="text-center mb-10 max-w-sm mx-auto">
                <p className="text-rose-400/70 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">
                    Tanda Kasih
                </p>
                <h2 className="text-zinc-700 text-2xl mb-4"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic', fontWeight: 400 }}>
                    Amplop Digital
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
                </p>
            </div>

            <div className="bg-white border border-rose-100 rounded-2xl p-8 w-full max-w-xs text-center">
                <p className="text-rose-400 font-medium uppercase tracking-[0.2em] text-xs mb-4">
                    {content.bank_name}
                </p>
                
                <p className="text-zinc-700 text-xl font-mono tracking-wider mb-1">
                    {content.bank_account_number}
                </p>
                
                <p className="text-zinc-400 text-xs uppercase tracking-wider mb-6">
                    A.n. {content.bank_account_name}
                </p>

                <button
                    onClick={handleCopy}
                    className={`w-full py-2.5 px-5 rounded-xl text-xs font-medium tracking-wider transition-all duration-300 ${
                        copied 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                        : 'bg-rose-50 text-rose-500 border border-rose-200 hover:bg-rose-100'
                    }`}
                >
                    {copied ? '✓ Berhasil Disalin' : 'Salin No. Rekening'}
                </button>
            </div>
        </section>
    )
}
