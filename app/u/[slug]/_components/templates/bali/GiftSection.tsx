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
        <section className="py-24 px-6 bg-orange-50 flex flex-col items-center">
            <div className="text-center mb-12 max-w-md mx-auto">
                <p className="text-amber-800 text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">
                    Dana Punia / Tanda Kasih
                </p>
                <div className="w-16 h-px bg-amber-800/30 mx-auto mb-6" />
                <p className="text-orange-950/70 text-sm leading-relaxed">
                    Bagi keluarga dan sahabat yang ingin memberikan tanda kasih untuk mendukung perjalanan baru kami.
                </p>
            </div>

            <div className="bg-orange-900 p-2 shadow-2xl w-full max-w-sm relative">
                <div className="absolute inset-2 border border-amber-500/30 pointer-events-none" />
                
                <div className="bg-orange-950 p-8 text-center h-full relative z-10">
                    <p className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-6">
                        {content.bank_name}
                    </p>
                    
                    <p className="text-amber-100 text-2xl font-mono tracking-wider mb-3">
                        {content.bank_account_number}
                    </p>
                    
                    <p className="text-amber-100/60 text-[10px] uppercase tracking-widest mb-10 font-bold">
                        A.n. {content.bank_account_name}
                    </p>

                    <button
                        onClick={handleCopy}
                        className={`w-full py-4 px-6 text-[10px] uppercase tracking-[0.3em] transition-all duration-300 font-bold ${
                            copied 
                            ? 'bg-amber-500 text-orange-950' 
                            : 'bg-transparent text-amber-500 border border-amber-500/50 hover:bg-amber-500/10'
                        }`}
                    >
                        {copied ? '✓ Berhasil Disalin' : 'Salin Nomor'}
                    </button>
                </div>
            </div>
        </section>
    )
}
