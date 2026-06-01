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
        <section className="py-24 px-6 bg-white flex flex-col items-center">
            <div className="text-center mb-12 max-w-sm mx-auto">
                <p className="text-neutral-400 text-[9px] tracking-[0.5em] uppercase mb-4">
                    Amplop Digital
                </p>
                <div className="w-6 h-px bg-neutral-200 mx-auto mb-6" />
                <p className="text-neutral-500 text-sm font-light leading-relaxed">
                    Doa restu Anda merupakan karunia yang sangat berarti. 
                    Bagi yang ingin memberikan tanda kasih, dapat melalui rekening berikut:
                </p>
            </div>

            <div className="border border-neutral-200 p-8 w-full max-w-xs text-center">
                <p className="text-neutral-800 font-medium uppercase tracking-[0.2em] text-xs mb-4">
                    {content.bank_name}
                </p>
                
                <p className="text-neutral-900 text-xl font-mono tracking-wider mb-2 font-light">
                    {content.bank_account_number}
                </p>
                
                <p className="text-neutral-400 text-[10px] uppercase tracking-wider mb-8">
                    A.n. {content.bank_account_name}
                </p>

                <button
                    onClick={handleCopy}
                    className={`w-full py-3 px-5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                        copied 
                        ? 'bg-neutral-800 text-white' 
                        : 'bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50'
                    }`}
                >
                    {copied ? 'Berhasil Disalin' : 'Salin Nomor'}
                </button>
            </div>
        </section>
    )
}
