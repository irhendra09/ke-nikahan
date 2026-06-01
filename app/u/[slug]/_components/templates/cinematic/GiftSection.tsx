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
        <section className="py-24 px-6 bg-neutral-900 flex flex-col items-center border-t border-white/5">
            <div className="text-center mb-12 max-w-md mx-auto">
                <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase mb-4">
                    Tanda Kasih
                </p>
                <div className="w-12 h-px bg-white/20 mx-auto mb-8" />
                <p className="text-white/60 text-sm font-light leading-relaxed">
                    Bagi Anda yang ingin memberikan tanda kasih untuk mendukung perjalanan baru kami.
                </p>
            </div>

            <div className="bg-neutral-950 p-10 w-full max-w-sm text-center rounded-sm shadow-2xl border border-white/5">
                <p className="text-white/40 font-medium uppercase tracking-[0.3em] text-xs mb-6">
                    {content.bank_name}
                </p>
                
                <p className="text-white text-2xl font-mono tracking-wider mb-2 font-light">
                    {content.bank_account_number}
                </p>
                
                <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] mb-10">
                    A.n. {content.bank_account_name}
                </p>

                <button
                    onClick={handleCopy}
                    className={`w-full py-4 px-6 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 rounded-sm ${
                        copied 
                        ? 'bg-white/20 text-white border border-transparent' 
                        : 'bg-transparent text-white border border-white/30 hover:bg-white hover:text-black'
                    }`}
                >
                    {copied ? 'Berhasil Disalin' : 'Salin Nomor Rekening'}
                </button>
            </div>
        </section>
    )
}
